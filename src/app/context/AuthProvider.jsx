'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

const AuthContext = createContext({
  user: null,
  username: null,
  isLoadingAuth: true,
});

function getUsername(user) {
  if (!user) return null;

  return (
    user.user_metadata?.username ||
    user.user_metadata?.preferred_username ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    null
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let subscription;

    try {
      const supabase = getSupabaseBrowserClient();

      supabase.auth.getUser().then(({ data }) => {
        if (isMounted) {
          setUser(data.user ?? null);
          setIsLoadingAuth(false);
        }
      });

      ({ data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
          setIsLoadingAuth(false);
        }
      }));
    } catch {
      if (isMounted) setIsLoadingAuth(false);
    }

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user, username: getUsername(user), isLoadingAuth }),
    [user, isLoadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
