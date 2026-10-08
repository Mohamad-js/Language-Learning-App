'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

/* ---------- Small building blocks ---------- */

// The pop-up window. Closes on outside click or the Escape key.
function Modal({ onClose, children }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden'; // stop the page behind from scrolling

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-5"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-foreground/10 bg-background shadow-xl sm:rounded-3xl"
            >
                {children}
            </div>
        </div>
    );
}

// The top bar of the window (title, optional Back button, Close button)
function ModalBar({ title, onBack, onClose }) {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-5 py-4">
            <div className="flex min-w-0 items-center gap-2">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="shrink-0 rounded-full border border-foreground/15 px-3 py-1 text-xs"
                    >
                        ←
                    </button>
                )}
                <div className="truncate text-sm font-semibold">{title}</div>
            </div>

            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full border border-foreground/15 px-3 py-1 text-xs"
            >
                ✕
            </button>
        </div>
    );
}

function Row({ label, children }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="text-foreground/60">{label}</dt>
            <dd className="text-right">{children}</dd>
        </div>
    );
}

// List of finished quizzes. Clicking one calls onOpen(attemptId).
function AttemptsList({ attempts, onOpen }) {
    if (attempts.length === 0) {
        return (
            <div className="rounded-2xl border border-foreground/10 p-4 text-sm text-foreground/60">
                No quizzes finished yet.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {attempts.map((r) => (
                <button
                    key={r.id}
                    type="button"
                    onClick={() => onOpen(r.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-foreground/10 p-4 text-left active:bg-foreground/5"
                >
                    <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                            Quiz {r.quiz_number}
                            {r.topic ? ` · ${r.topic}` : ''}
                        </div>
                        <div className="text-xs text-foreground/60">
                            {r.quiz_level ? `${r.quiz_level} · ` : ''}
                            {formatDate(r.taken_at)}
                        </div>
                        {r.wrong > 0 ? (
                            <div className="mt-1 text-xs text-red-500">{r.wrong} wrong</div>
                        ) : (
                            <div className="mt-1 text-xs text-green-500">No mistakes</div>
                        )}
                    </div>

                    <div className="text-right">
                        <div className="text-lg font-semibold">{Number(r.score)}</div>
                        <div className="text-xs text-foreground/60">
                            Grade {r.grade} · {r.correct}/{r.total}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}

// Everything saved about one finished quiz, including the wrong questions
function AttemptDetail({ attempt }) {
    const failed = Array.isArray(attempt.failed_questions) ? attempt.failed_questions : [];

    return (
        <div className="flex flex-col gap-5">
            <div>
                <div className="text-lg font-semibold">Quiz {attempt.quiz_number}</div>
                {attempt.topic && <div className="text-sm text-foreground/60">{attempt.topic}</div>}
            </div>

            <dl className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10 text-sm">
                <Row label="Date">{formatDate(attempt.taken_at)}</Row>
                {attempt.quiz_level && <Row label="Level">{attempt.quiz_level}</Row>}
                <Row label="Score">{Number(attempt.score)} / 20</Row>
                <Row label="Grade">{attempt.grade}</Row>
                <Row label="Correct">
                    <span className="text-green-500">{attempt.correct}</span>
                </Row>
                <Row label="Wrong">
                    <span className="text-red-500">{attempt.wrong}</span>
                </Row>
                <Row label="Total questions">{attempt.total}</Row>
            </dl>

            <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground/70">
                    Wrong answers ({failed.length})
                </h3>

                {failed.length === 0 ? (
                    <div className="rounded-2xl border border-foreground/10 p-4 text-sm text-green-500">
                        No mistakes in this quiz.
                    </div>
                ) : (
                    failed.map((q, index) => (
                        <div
                            key={`${q.number}-${index}`}
                            className="rounded-2xl border border-foreground/10 p-4"
                        >
                            <div className="flex gap-3 text-sm">
                                <span className="text-foreground/30">{q.number}</span>
                                <span className="font-medium">{q.question}</span>
                            </div>

                            {Array.isArray(q.options) && (
                                <div className="mt-3 flex flex-col gap-1.5">
                                    {q.options.map((option, i) => {
                                        const isCorrect = option === q.correct;
                                        const isGiven = option === q.given;

                                        return (
                                            <div
                                                key={i}
                                                className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs ${
                                                    isCorrect
                                                        ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400'
                                                        : isGiven
                                                            ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
                                                            : 'border-foreground/10 text-foreground/70'
                                                }`}
                                            >
                                                <span>{option}</span>
                                                {isCorrect && (
                                                    <span className="shrink-0 font-semibold">Correct</span>
                                                )}
                                                {isGiven && !isCorrect && (
                                                    <span className="shrink-0 font-semibold">Given</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

/* ---------- The page ---------- */

export default function ProgressPage() {
    const { user, isLoadingAuth } = useAuth();
    const userId = user?.id;

    const [results, setResults] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null); // which user's window is open
    const [openAttemptId, setOpenAttemptId] = useState(null);   // which quiz's details are open

    const closeModal = useCallback(() => {
        setSelectedUserId(null);
        setOpenAttemptId(null);
    }, []);

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
                        .select('id, username, full_name, email, profile_image_url, created_at'),
                ]);

                if (resultsRes.error) throw resultsRes.error;

                const admin = Boolean(adminRes.data);
                let directory = profilesRes.data ?? [];

// Admin: also include people who signed in but never completed their profile
                if (admin) {
                    const { data: everyone, error: everyoneError } = await supabase.rpc('admin_users');
                    if (everyoneError) throw everyoneError;
                    directory = everyone ?? [];
                }

                if (cancelled) return;
                setIsAdmin(admin);
                setResults(resultsRes.data ?? []);
                setProfiles(Object.fromEntries(directory.map((p) => [p.id, p])));

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

    // One row per user
    const users = useMemo(() => {
        // Quiz stats per user (only users with attempts have an entry)
        const stats = new Map();
        for (const r of results) {
            const s = stats.get(r.user_id) ?? { attempts: 0, sum: 0, best: 0, last: r.taken_at };
            s.attempts += 1;
            s.sum += Number(r.score);
            s.best = Math.max(s.best, Number(r.score));
            if (r.taken_at > s.last) s.last = r.taken_at;
            stats.set(r.user_id, s);
        }

        // Admin: list every profile, even with zero attempts
        const ids = new Set(stats.keys());
        if (isAdmin) Object.keys(profiles).forEach((id) => ids.add(id));

        return [...ids]
            .map((id) => {
                const s = stats.get(id);
                const profile = profiles[id];
                return {
                    userId: id,
                    profile,
                    attempts: s?.attempts ?? 0,
                    avg: s ? s.sum / s.attempts : null,
                    best: s?.best ?? null,
                    last: s?.last ?? null,
                    sortKey: s?.last ?? profile?.created_at ?? '',
                };
            })
            .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
    }, [results, profiles, isAdmin]);

    const overallAvg = results.length
        ? (results.reduce((sum, r) => sum + Number(r.score), 0) / results.length).toFixed(2)
        : '—';

    const nameOf = (id) => {
        const p = profiles[id];
        if (p?.username) return `@${p.username}`;
        if (p?.email) return p.email;
        return 'Unknown User';
    };

    // Data for the windows
    const selectedUser = users.find((u) => u.userId === selectedUserId);
    const selectedAttempts = results.filter((r) => r.user_id === selectedUserId);
    const openAttempt = results.find((r) => r.id === openAttemptId);

    if (isLoadingAuth || isLoading) {
        return <div className="px-5 py-24 text-center text-foreground/60">Loading...</div>;
    }

    if (!user) {
        return (
            <main className="absolute w-full min-h-dvh flex flex-col gap-5 items-center justify-center">
                <p className="text-foreground/70">Sign in to see your progress.</p>
                <Link href="/sign-up">
                    <button className='primary-btn'>Sign in</button>
                </Link>
            </main>
        );
    }

    if (error) {
        return <div className="px-5 py-24 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="fixed inset-0 mx-auto flex h-dvh w-full max-w-3xl flex-col gap-6 overflow-hidden px-5 py-7">
            <header>
                <h1 className="text-2xl font-semibold">
                    {isAdmin ? 'All users progress' : 'My progress'}
                </h1>
                <p className="mt-1 text-sm text-foreground/60">Scores are out of 20.</p>
            </header>

            {/* Overall stats */}
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

            {/* ADMIN: only the list of users */}
            {isAdmin && (
                <section className="flex min-h-0 flex-1 flex-col gap-2">
                    <h2 className="shrink-0 text-sm font-semibold text-foreground/70">
                        Users
                    </h2>

                    <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-foreground/10">
                        <div className="flex flex-col divide-y divide-foreground/10">
                            {users.length === 0 && (
                                <div className="p-4 text-sm text-foreground/60">
                                    No users yet.
                                </div>
                            )}

                            {
                                users.map((u) => (
                                <div
                                    key={u.userId}
                                    className="flex h-20 w-full cursor-pointer items-center gap-3 p-3 text-left"
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
                                        <div className="truncate text-sm">
                                            {u.profile?.full_name || nameOf(u.userId)}
                                        </div>

                                        <div className="truncate text-xs text-foreground/60">
                                            {nameOf(u.userId)}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedUserId(u.userId);
                                        }}
                                        className="secondary-btn shrink-0 text-xs"
                                    >
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* REGULAR USER: their own quizzes */}
            {!isAdmin && (
                <section className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-foreground/70">My quizzes</h2>
                    <AttemptsList attempts={results} onOpen={setOpenAttemptId} />
                </section>
            )}

            {results.length >= 1000 && (
                <p className="text-xs text-foreground/50">Showing the latest 1000 attempts.</p>
            )}

            {/* ADMIN window: one user's quizzes, then one quiz's details */}
            {
                isAdmin && selectedUserId && (
                <Modal onClose={closeModal}>
                    {
                        openAttempt ? (
                        <>
                            <ModalBar
                                title={selectedUser?.profile?.full_name || nameOf(selectedUserId)}
                                onBack={() => setOpenAttemptId(null)}
                                onClose={closeModal}
                            />
                            <div className="overflow-y-auto p-5">
                                <AttemptDetail attempt={openAttempt} />
                            </div>
                        </>
                    ) : (
                        <>
                            <ModalBar title="User Progress" onClose={closeModal} />
                            {
                                selectedUser?.profile?.has_profile === false && (
                                    <div className="pl-5 text-xs text-amber-500">Profile not completed</div>
                                )
                            }

                            <div className="flex flex-col gap-5 overflow-y-auto p-5">
                                <div className="flex h-20 items-center gap-3">
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5">
                                        {selectedUser?.profile?.profile_image_url && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={selectedUser.profile.profile_image_url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0 min-h-full flex flex-col justify-between">
                                        <div className="truncate font-semibold">
                                            {selectedUser?.profile?.full_name || nameOf(selectedUserId)}
                                        </div>
                                        <div className=''>
                                            <div className="truncate text-xs text-foreground/60">
                                                {nameOf(selectedUserId)}
                                            </div>
                                            <div className="truncate text-xs text-foreground/60">
                                                {selectedUser?.profile?.email ?? ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="rounded-2xl border border-foreground/10 p-3">
                                        <div className="text-lg font-semibold">{selectedUser?.attempts ?? 0}</div>
                                        <div className="text-xs text-foreground/60">Attempts</div>
                                    </div>
                                    <div className="rounded-2xl border border-foreground/10 p-3">
                                        <div className="text-lg font-semibold">
                                            {selectedUser?.avg != null ? selectedUser.avg.toFixed(2) : '—'}
                                        </div>
                                        <div className="text-xs text-foreground/60">Average</div>
                                    </div>
                                    <div className="rounded-2xl border border-foreground/10 p-3">
                                        <div className="text-lg font-semibold">{selectedUser?.best ?? '—'}</div>
                                        <div className="text-xs text-foreground/60">Best</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-sm font-semibold text-foreground/70">Quizzes done</h3>
                                    <AttemptsList attempts={selectedAttempts} onOpen={setOpenAttemptId} />
                                </div>
                            </div>
                        </>
                    )}
                </Modal>
            )}

            {/* REGULAR USER window: one quiz's details */}
            {!isAdmin && openAttempt && (
                <Modal onClose={closeModal}>
                    <ModalBar title="Quiz details" onClose={closeModal} />
                    <div className="overflow-y-auto p-5">
                        <AttemptDetail attempt={openAttempt} />
                    </div>
                </Modal>
            )}
        </main>
    );
}