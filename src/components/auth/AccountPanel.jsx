'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { useAuth } from '@/app/context/AuthProvider';
import { FcGoogle } from "react-icons/fc";

export default function AccountPanel({ compact = false }) {
    const [mode, setMode] = useState('signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [warning, setWarning] = useState(false)
    const [fullName, setFullName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, isLoadingAuth } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const userId = user?.id;

    useEffect(() => {
        if (!userId) {
            setProfile(null);
            return;
        }

        const supabase = getSupabaseBrowserClient();
        if (!supabase) return;

        let cancelled = false;
        setIsProfileLoading(true);

        (async () => {
            try {
                const { data } = await supabase
                    .from('profiles')
                    .select('username, full_name, email, profile_image_url, created_at')
                    .eq('id', userId)
                    .maybeSingle();

                if (!cancelled) setProfile(data ?? null);
            } finally {
                if (!cancelled) setIsProfileLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [userId]);



    if (compact) {
        return (
            <Link
                href="/sign-up"
                className="rounded-full bg-background/40 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
            >
                {
                    isLoadingAuth ? 'Loading…' : user ?
                        profile?.full_name || user.user_metadata?.full_name || "Complete Profile"

                        : 'Sign in / Sign up'
                }
            </Link>
        );
    }

    const getClient = () => {
        try {
            return getSupabaseBrowserClient();
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    };


    const handleEmailAuth = async (event) => {
        event.preventDefault();
        const supabase = getClient();
        if (!supabase) return;

        setIsSubmitting(true);

        if (mode === 'signup') {
            const { data: available, error: checkError } = await supabase.rpc('username_available', {
                name: username.trim(),
            });

            if (checkError || available === null) {
                setIsSubmitting(false);
                toast.error('Error. Please try again.');
                return;
            }

            if (!available) {
                setIsSubmitting(false);
                toast.error('This username is already taken.');
                return;
            }
        }

        const result = mode === 'signup'
            ? await supabase.auth.signUp({
                email,
                password,
                options: { data: { username, full_name: fullName } },
            })
            : await supabase.auth.signInWithPassword({ email, password });
        setIsSubmitting(false);

        if (result.error) {
            const code = result.error.code;
            const message = result.error.message?.toLowerCase() ?? '';

            if (mode === 'signup' && (code === 'user_already_exists' || message.includes('already registered'))) {
                toast.error('The email already exists.');
            } else if (mode === 'signin' && (code === 'invalid_credentials' || message.includes('invalid login credentials'))) {
                toast.error('Incorrect email or password.');
            } else if (code === 'email_not_confirmed') {
                toast.error('Please confirm your email first.');
            } else {
                toast.error(result.error.message);
            }
            return;
        }

        // Supabase hides "this email already exists" on sign up:
        // it returns a fake user with an empty identities list and sends no email.
        if (mode === 'signup' && result.data.user?.identities?.length === 0) {
            toast.error('This email is already registered. Sign in instead, or use Continue with Google.');
            return;
        }

        if (mode === 'signup' && !result.data.session) {
            toast.success('Check your email to confirm your new account.');
            return;
        }

        toast.success(
            mode === 'signup' ? 'Account created. One last step: complete your profile.' : 'Signed in.'
        );
    };


    const handleGoogleAuth = async () => {
        const supabase = getClient();
        if (!supabase) return;

        setIsSubmitting(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/sign-up` },
        });
        setIsSubmitting(false);
        if (error) toast.error(error.message);
    };

    const handleSignOut = async () => {
        const supabase = getClient();
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) toast.error(error.message);
        else toast.success('Signed out.');
    };

    if (user) {
        const displayName = profile?.full_name || user.user_metadata?.full_name || 'User';
        const displayUsername = profile?.username || user.user_metadata?.username;
        const displayEmail = profile?.email || user.email;
        const avatar = profile?.profile_image_url || user.user_metadata?.picture;
        const initials = displayName
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
        const memberSince = profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
            : null;
        const provider = user.app_metadata?.provider === 'google' ? 'Google' : 'Email';

        const cancelSignOut = () => {
            setWarning(false)
        }

        console.log('warning', warning)
        
        
        return (
            <section className="relative flex w-full min-h-dvh flex-col justify-between gap-10 rounded-3xl bg-background p-5 shadow-xl">
                <div className='w-full text-gray-500 font-semibold text-start'>Account Information</div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="h-28 w-28 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5">
                        {
                            avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={avatar}
                                alt={`${displayName}'s profile`}
                                className="h-40 w-40 object-cover"
                                referrerPolicy="no-referrer"
                            />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-foreground/50">
                                    {initials}
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <h1 className="break-all text-xl font-semibold">{displayName}</h1>
                        {displayUsername && (
                            <p className="mt-0.5 text-sm text-foreground/60">@{displayUsername}</p>
                        )}
                    </div>
                </div>

                <dl className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10 text-sm">
                    <div className="flex flex-col items-center justify-between gap-1 px-4 py-3">
                        <dt className="text-foreground/60">Email</dt>
                        <dd className="break-all text-right">{displayEmail}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3">
                        <dt className="text-foreground/60">Username</dt>
                        <dd>{isProfileLoading ? '…' : displayUsername ? `@${displayUsername}` : '—'}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3">
                        <dt className="text-foreground/60">Sign in Method</dt>
                        <dd>{provider}</dd>
                    </div>
                    {memberSince && (
                        <div className="flex items-center justify-between gap-4 px-4 py-3">
                            <dt className="text-foreground/60">Since</dt>
                            <dd>{memberSince}</dd>
                        </div>
                    )}
                </dl>

                <button className="bg-red-400 rounded-xl p-3 text-black" onClick={() => setWarning(true)}>Sign Out</button>

                {
                    warning &&
                    <div className='absolute top-0 p-7 left-0 w-full h-full bg-background/20 backdrop-blur-sm flex items-center justify-center' onClick={cancelSignOut}>
                        <div className='w-full px-6 py-10 text-center bg-background border rounded-2xl flex flex-col justify-between items-center gap-10'>
                            <div className='w-full flex gap-3 flex-col justify-center items-center'>
                                <div className='text-lg text-red-500'>All progress will be lost.</div>
                                <div className='text-sm'>Are you sure to sign out?</div>
                            </div>

                            <div className='w-full flex justify-center gap-5'>
                                <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={cancelSignOut}>No</button>

                                <button className='w-20 py-2 rounded-2xl bg-red-500 active:bg-black/10' onClick={handleSignOut}>Yes</button>
                            </div>
                        </div>
                    </div>
                }
            </section>
        );
    }
    return (
        <section className="relative w-full min-h-dvh flex flex-col justify-center bg-background p-7">
            <div className="mb-6 flex rounded-2xl bg-foreground/5 p-1">
                <button
                    className={`flex-1 rounded-xl px-3 py-2 text-sm ${mode === 'signup' ? 'bg-background shadow-sm' : 'text-foreground/60'}`}
                    onClick={() => setMode('signup')}
                    type="button"
                >
                    Sign up
                </button>
                <button
                    className={`flex-1 rounded-xl px-3 py-2 text-sm ${mode === 'signin' ? 'bg-background shadow-sm' : 'text-foreground/60'}`}
                    onClick={() => setMode('signin')}
                    type="button"
                >
                    Sign in
                </button>
            </div>

            <h1 className="text-center text-2xl font-semibold">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>

            <p className="text-center mt-2 text-sm text-foreground/60">{mode === 'signup' ? 'Track your progress.' : 'You need to sign in.'}</p>

            <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-foreground/15 px-4 py-3 font-medium active:bg-foreground/5 disabled:opacity-60"
                disabled={isSubmitting}
                onClick={handleGoogleAuth}
            >
                <FcGoogle size={20} />
                Continue with Google
            </button>

            <div className="my-5 flex items-center  gap-3 text-xs text-foreground/45"><span className="h-px flex-1 bg-foreground/10" />or<span className="h-px flex-1 bg-foreground/10" /></div>

            <form className="flex flex-col gap-3" onSubmit={handleEmailAuth}>
                {
                    mode === 'signup' && (
                        <>

                            <input className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} required placeholder={'Full name'} />


                            <input className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5" value={username} onChange={(event) => setUsername(event.target.value)} minLength={3} maxLength={30} required placeholder={'Username'} />
                        </>
                    )
                }

                <input className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder='Email' />

                <input className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required placeholder='Password' />

                <button className="primary-btn mt-2 disabled:opacity-60" disabled={isSubmitting}>
                    {
                        isSubmitting ? 'Please wait…'
                            :
                        mode === 'signup'
                            ?
                        'Create account'
                            :
                        'Sign in'
                    }
                </button>
            </form>
        </section>
    );
}