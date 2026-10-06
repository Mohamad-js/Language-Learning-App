'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { useAuth } from '@/app/context/AuthProvider';

const formatDate = (value) =>
    new Date(value).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

export default function ProgressPage() {
    const { user, isLoadingAuth } = useAuth();
    const userId = user?.id;

    const [results, setResults] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openAttemptId, setOpenAttemptId] = useState(null);

    useEffect(() => {
        if (isLoadingAuth) return;
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const supabase = getSupabaseBrowserClient();
        if (!supabase) {
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                setIsLoading(true);
                setError('');

                const [adminRes, resultsRes, profilesRes] = await Promise.all([
                    supabase.rpc('is_admin'),
                    supabase
                        .from('quiz_results')
                        .select('*')
                        .order('taken_at', { ascending: false })
                        .limit(1000),
                    supabase
                        .from('profiles')
                        .select('id, username, full_name, email, profile_image_url'),
                ]);

                if (resultsRes.error) throw resultsRes.error;

                if (cancelled) return;
                setIsAdmin(Boolean(adminRes.data));
                setResults(resultsRes.data ?? []);
                setProfiles(
                    Object.fromEntries((profilesRes.data ?? []).map((p) => [p.id, p]))
                );
            } catch (err) {
                if (!cancelled) setError(err.message || 'Could not load progress');
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [userId, isLoadingAuth]);

    // One summary row per user
    const users = useMemo(() => {
        const map = new Map();
        for (const r of results) {
            const s = map.get(r.user_id) ?? {
                userId: r.user_id,
                attempts: 0,
                sum: 0,
                best: 0,
                last: r.taken_at,
            };
            s.attempts += 1;
            s.sum += Number(r.score);
            s.best = Math.max(s.best, Number(r.score));
            if (r.taken_at > s.last) s.last = r.taken_at;
            map.set(r.user_id, s);
        }
        return [...map.values()]
            .map((s) => ({ ...s, avg: s.sum / s.attempts, profile: profiles[s.userId] }))
            .sort((a, b) => b.last.localeCompare(a.last));
    }, [results, profiles]);

    const visibleResults = selectedUserId
        ? results.filter((r) => r.user_id === selectedUserId)
        : results;

    const overallAvg = results.length
        ? (results.reduce((sum, r) => sum + Number(r.score), 0) / results.length).toFixed(2)
        : '—';

    const nameOf = (id) => {
        const p = profiles[id];
        return p?.username ? `@${p.username}` : 'Unknown user';
    };

    if (isLoadingAuth || isLoading) {
        return <div className="px-5 py-24 text-center text-foreground/60">Loading...</div>;
    }

    if (!user) {
        return (
            <main className="px-5 py-24 text-center">
                <p className="text-foreground/70">Sign in to see your progress.</p>
                <Link href="/sign-up" className="primary-btn mt-4 inline-block">Sign in</Link>
            </main>
        );
    }

    if (error) {
        return <div className="px-5 py-24 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-16">
            <header>
                <h1 className="text-2xl font-semibold">
                    {isAdmin ? 'All users progress' : 'My progress'}
                </h1>
                <p className="mt-1 text-sm text-foreground/60">
                    Scores are out of 20.
                </p>
            </header>

            {/* Overall stats for normal users */}
            <section className={`grid gap-3 text-center ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="text-2xl font-semibold">{results.length}</div>
                    <div className="text-xs text-foreground/60">Attempts</div>
                </div>
                <div className="rounded-2xl border border-foreground/10 p-4">
                    <div className="text-2xl font-semibold">{overallAvg}</div>
                    <div className="text-xs text-foreground/60">Average score</div>
                </div>
                {isAdmin && (
                    <div className="rounded-2xl border border-foreground/10 p-4">
                        <div className="text-2xl font-semibold">{users.length}</div>
                        <div className="text-xs text-foreground/60">Users</div>
                    </div>
                )}
            </section>

            {/* Admin only: per-user summary */}
            {isAdmin && (
                <section className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-foreground/70">Users</h2>

                    {selectedUserId && (
                        <button
                            type="button"
                            onClick={() => setSelectedUserId(null)}
                            className="self-start text-xs underline text-foreground/60"
                        >
                            Show all users
                        </button>
                    )}

                    <div className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10">
                        {users.length === 0 && (
                            <div className="p-4 text-sm text-foreground/60">No results yet.</div>
                        )}

                        {users.map((u) => (
                            <button
                                key={u.userId}
                                type="button"
                                onClick={() => setSelectedUserId(u.userId)}
                                className={`flex items-center gap-3 p-3 text-left ${
                                    selectedUserId === u.userId ? 'bg-foreground/5' : ''
                                }`}
                            >
                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5">
                                    {u.profile?.profile_image_url && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={u.profile.profile_image_url}
                                            alt=""
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">
                                        {u.profile?.full_name || nameOf(u.userId)}
                                    </div>
                                    <div className="truncate text-xs text-foreground/60">
                                        {nameOf(u.userId)} · {u.profile?.email ?? ''}
                                    </div>
                                </div>

                                <div className="text-right text-xs text-foreground/70">
                                    <div>{u.attempts} attempts</div>
                                    <div>avg {u.avg.toFixed(2)} · best {u.best}</div>
                                    <div className="text-foreground/50">{formatDate(u.last)}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Attempts */}
            <section className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-foreground/70">
                    Attempts{selectedUserId ? ` · ${nameOf(selectedUserId)}` : ''}
                </h2>

                {visibleResults.length === 0 && (
                    <div className="rounded-2xl border border-foreground/10 p-4 text-sm text-foreground/60">
                        No quiz results yet.
                    </div>
                )}

                {visibleResults.map((r) => {
                    const isOpen = openAttemptId === r.id;
                    const failed = Array.isArray(r.failed_questions) ? r.failed_questions : [];

                    return (
                        <div key={r.id} className="rounded-2xl border border-foreground/10">
                            <button
                                type="button"
                                onClick={() => setOpenAttemptId(isOpen ? null : r.id)}
                                className="flex w-full items-center justify-between gap-3 p-4 text-left"
                            >
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-medium">
                                        Quiz {r.quiz_number}
                                        {r.topic ? ` · ${r.topic}` : ''}
                                    </div>
                                    <div className="text-xs text-foreground/60">
                                        {isAdmin && !selectedUserId ? `${nameOf(r.user_id)} · ` : ''}
                                        {r.quiz_level ? `${r.quiz_level} · ` : ''}
                                        {formatDate(r.taken_at)}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-lg font-semibold">{Number(r.score)}</div>
                                    <div className="text-xs text-foreground/60">
                                        Grade {r.grade} · {r.correct}/{r.total}
                                    </div>
                                </div>
                            </button>

                            {isOpen && (
                                <div className="flex flex-col gap-3 border-t border-foreground/10 p-4 text-sm">
                                    {failed.length === 0 ? (
                                        <div className="text-green-500">No mistakes in this attempt.</div>
                                    ) : (
                                        failed.map((q) => (
                                            <div key={q.number}>
                                                <div>
                                                    <span className="text-foreground/30">{q.number}</span>{' '}
                                                    {q.question}
                                                </div>
                                                <div className="text-xs">
                                                    <span className="text-foreground/60">Answered: </span>
                                                    <span className="text-red-500">{q.given ?? 'No answer'}</span>
                                                </div>
                                                <div className="text-xs">
                                                    <span className="text-foreground/60">Correct: </span>
                                                    <span className="text-green-500">{q.correct}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {results.length >= 1000 && (
                    <p className="text-xs text-foreground/50">Showing the latest 1000 attempts.</p>
                )}
            </section>
        </main>
    );
}