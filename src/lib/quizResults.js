import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { getPendingQuizResults, removePendingQuizResult } from '@/lib/db';

const uploads = new Map();

// Retry only attempts belonging to the signed-in account. Keep failed uploads
// on the device, including attempts whose insert succeeded but response was lost.
export function syncPendingQuizResults(userId) {
    if (!userId) return Promise.resolve({ synced: false });
    if (uploads.has(userId)) return uploads.get(userId);

    const upload = (async () => {
        const supabase = getSupabaseBrowserClient();
        while (true) {
            const attempts = await getPendingQuizResults(userId);
            if (!attempts.length) return { synced: true };

            for (const attempt of attempts) {
                const { data, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;
                if (data?.session?.user?.id !== userId) return { synced: false };

                const { quizNumber, result } = attempt;
                const takenAt = new Date(result.date).toISOString();

                // Use the original completion time on every retry, without requiring
                // a change to the existing Supabase table or its primary key.
                const { data: existing, error: lookupError } = await supabase
                    .from('quiz_results')
                    .select('quiz_number')
                    .eq('user_id', userId)
                    .eq('quiz_number', String(quizNumber))
                    .eq('taken_at', takenAt)
                    .limit(1);

                if (lookupError) throw lookupError;
                if (!existing?.length) {
                    const { error } = await supabase.from('quiz_results').insert({
                        user_id: userId,
                        quiz_number: String(quizNumber),
                        quiz_label: result.quizLabel ?? null,
                        quiz_level: result.quizLevel ?? null,
                        topic: result.topic ?? null,
                        total: result.total,
                        correct: result.correct,
                        wrong: result.wrong,
                        score: result.score,
                        grade: result.grade,
                        failed_questions: result.failedQuestions ?? [],
                        taken_at: takenAt,
                    });
                    if (error) throw error;
                }

                await removePendingQuizResult(attempt.attemptId);
            }
        }
    })().finally(() => uploads.delete(userId));

    uploads.set(userId, upload);
    return upload;
}
