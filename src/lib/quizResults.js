import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

export async function syncQuizResult(quizNumber, result) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return { synced: false };

    const { data } = await supabase.auth.getSession();
    const user = data?.session?.user;
    if (!user) return { synced: false }; // logged out: keep it local only

    const { error } = await supabase.from('quiz_results').insert({
        user_id: user.id,
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
    });

    if (error) throw error;
    return { synced: true };
}