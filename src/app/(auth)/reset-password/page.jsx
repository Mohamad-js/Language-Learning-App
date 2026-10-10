'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import { useAuth } from '@/app/context/AuthProvider';

export default function ResetPasswordPage() {
    const { user, isLoadingAuth } = useAuth();
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const supabase = getSupabaseBrowserClient();
        if (!supabase) return;

        setIsSubmitting(true);
        const { error } = await supabase.auth.updateUser({ password });
        setIsSubmitting(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success('Password updated.');
        setDone(true);
    };

    if (isLoadingAuth) {
        return <div className="px-5 py-24 text-center text-foreground/60">Loading...</div>;
    }

    if (!user) {
        return (
            <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
                <p className="text-foreground/70">
                    Open this page from the link in your reset email.
                </p>
                <Link href="/sign-up" className="underline text-sm">Back to sign in</Link>
            </main>
        );
    }

    if (done) {
        return (
            <main className="absolute w-full top-0 left-0 flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
                <p>Your password was changed.</p>
                <Link href="/" className="primary-btn">Continue</Link>
            </main>
        );
    }

    return (
        <main className="absolute top-0 left-0 w-full min-h-dvh flex items-center justify-center px-5">
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
                <h1 className="text-center text-2xl font-semibold">Choose a new password</h1>
                <input
                    className="rounded-xl border border-foreground/15 bg-transparent px-3 py-2.5"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                    placeholder="New password"
                />
                <button className="primary-btn disabled:opacity-60" disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait…' : 'Update password'}
                </button>
            </form>
        </main>
    );
}