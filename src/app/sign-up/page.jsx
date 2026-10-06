'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthProvider';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';
import AccountPanel from '@/components/auth/AccountPanel';
import CompleteProfile from '@/components/auth/CompleteProfile';

export default function SignUpPage() {
    const { user, isLoadingAuth } = useAuth();
    const [profileComplete, setProfileComplete] = useState(null);
    const [isChecking, setIsChecking] = useState(true);

    const userId = user?.id;

    useEffect(() => {
        if (isLoadingAuth) return;

        if (!userId) {
            setProfileComplete(null);
            setIsChecking(false);
            return;
        }

        const supabase = getSupabaseBrowserClient();
        if (!supabase) {
            setIsChecking(false);
            return;
        }

        let cancelled = false;
        setIsChecking(true);

        (async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('id', userId)
                    .maybeSingle();

                if (cancelled) return;
                setProfileComplete(error ? null : !!data);
            } catch {
                if (!cancelled) setProfileComplete(null);
            } finally {
                if (!cancelled) setIsChecking(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [userId, isLoadingAuth]);

    if (isLoadingAuth || isChecking) {
        return (
            <main className="min-h-dvh bg-foreground/5 px-5 py-24">
                <div className="flex items-center justify-center">
                    <p className="text-foreground/60">Loading...</p>
                </div>
            </main>
        );
    }

    // If user logged in but profile incomplete → show CompleteProfile
    if (user && profileComplete === false) {
        return (
            <main className="min-h-dvh bg-foreground/5 px-5 py-24">
                <CompleteProfile />
            </main>
        );
    }

    // Default: show AccountPanel (sign up / sign in form)
    return (
        <main className="w-full min-h-dvh bg-foreground/5 flex items-center">
            <AccountPanel />
        </main>
    );
}