import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { getAllQuizzes, resetQuizProgress, restoreQuizResult, queueQuizResult } from '@/lib/db';
import { syncPendingQuizResults } from '@/lib/quizResults';

const OWNER_KEY = 'quizDataOwner';
let ownershipChange = Promise.resolve();

// Serialize account changes so an old request cannot refill another user's cache.
export function ensureQuizOwner(userId) {
    const request = ownershipChange.catch(() => {}).then(() => restoreQuizzes(userId));
    ownershipChange = request;
    return request;
}

async function restoreQuizzes(userId) {
    const owner = userId ?? 'guest';
    const savedOwner = localStorage.getItem(OWNER_KEY);
    let quizzes = await getAllQuizzes();

    if (savedOwner !== owner) {
        // Unowned data cannot be attributed to a signed-in account safely.
        if (savedOwner !== null || userId) {
            for (const quiz of quizzes) {
                if (quiz.userAnswers || quiz.draftAnswers) {
                    await resetQuizProgress(quiz.quizNumber);
                }
            }
            quizzes = await getAllQuizzes();
        }
        // Record the owner even offline; every visit still retries restoration.
        localStorage.setItem(OWNER_KEY, owner);
    }

    if (!userId) return;

    // A failed upload must not prevent downloading results already in Supabase.
    let uploadError;
    try {
        await syncPendingQuizResults(userId);
    } catch (error) {
        uploadError = error;
    }

    const supabase = getSupabaseBrowserClient();
    const latest = new Map();
    const pageSize = 500;
    for (let start = 0; ; start += pageSize) {
        const { data, error } = await supabase
            .from('quiz_results')
            .select('id, quiz_number, quiz_label, quiz_level, topic, total, correct, wrong, score, grade, failed_questions, taken_at')
            .eq('user_id', userId)
            .order('taken_at', { ascending: false })
            .order('id', { ascending: false })
            .range(start, start + pageSize - 1);

        if (error) throw error;
        for (const row of data ?? []) {
            const number = String(row.quiz_number);
            if (!latest.has(number)) latest.set(number, row);
        }
        if ((data?.length ?? 0) < pageSize) break;
    }

    // A quiz may have been finished or restarted while the download was running.
    quizzes = await getAllQuizzes();
    let recovered = false;
    for (const quiz of quizzes) {
        const row = latest.get(String(quiz.quizNumber));
        const localIsNewer = quiz.userAnswers && row &&
            new Date(quiz.userAnswers.date) > new Date(row.taken_at);

        // Recover results left on this account's device by the old, one-shot
        // uploader. Never assign guest results or another account's results.
        if ((!row || localIsNewer) && quiz.userAnswers && savedOwner === userId && !uploadError) {
            await queueQuizResult(quiz.quizNumber, quiz.userAnswers, userId);
            recovered = true;
        }
        if (!row || quiz.draftAnswers) continue;

        // An unsent, newer attempt should survive restoration of an older one.
        if (localIsNewer) continue;

        await restoreQuizResult(quiz.quizNumber, {
            date: row.taken_at,
            topic: row.topic,
            quizLabel: row.quiz_label,
            quizLevel: row.quiz_level,
            total: row.total,
            correct: row.correct,
            wrong: row.wrong,
            score: Number(row.score),
            grade: row.grade,
            failedQuestions: row.failed_questions ?? [],
        });
    }

    if (recovered) await syncPendingQuizResults(userId);
    if (uploadError) throw uploadError;
}
