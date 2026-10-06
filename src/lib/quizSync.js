import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { getAllQuizzes, resetQuizProgress, saveQuizResult } from '@/lib/db';

const OWNER_KEY = 'quizDataOwner';

// Makes the quiz data stored on this device belong to the current user.
// Returns true if the local data was changed.
export async function ensureQuizOwner(userId) {
    const owner = userId ?? 'guest';
    const savedOwner = localStorage.getItem(OWNER_KEY);

    // First run after this update: keep what is already on the device
    // and assign it to whoever is using the app now.
    if (savedOwner === null) {
        localStorage.setItem(OWNER_KEY, owner);
        return false;
    }

    // Same owner as before: nothing to do
    if (savedOwner === owner) return false;

    const quizzes = await getAllQuizzes();

    // 1. Erase whatever the previous owner left on this device
    for (const quiz of quizzes) {
        if (quiz.userAnswers || quiz.draftAnswers) {
            await resetQuizProgress(quiz.quizNumber);
        }
    }

    // 2. Refill with this user's finished quizzes from Supabase
    if (userId) {
        const supabase = getSupabaseBrowserClient();
        if (!supabase) throw new Error('Supabase is not available');

        const { data, error } = await supabase
            .from('quiz_results')
            .select('quiz_number, quiz_label, quiz_level, topic, total, correct, wrong, score, grade, failed_questions, taken_at')
            .eq('user_id', userId)
            .order('taken_at', { ascending: false })
            .limit(500);

        if (error) throw error;

        // Keep only the newest attempt of each quiz
        const latest = new Map();
        for (const row of data ?? []) {
            if (!latest.has(row.quiz_number)) latest.set(row.quiz_number, row);
        }

        for (const quiz of quizzes) {
            const row = latest.get(String(quiz.quizNumber));
            if (!row) continue;

            await saveQuizResult(quiz.quizNumber, {
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
    }

    // Write the new owner's name on the cover only after everything succeeded.
    // If something failed (for example, no internet), we simply try again next time.
    localStorage.setItem(OWNER_KEY, owner);
    return true;
}