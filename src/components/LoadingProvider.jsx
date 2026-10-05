'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loading/loading';

const LoadingContext = createContext({
  startLoading: () => {},
  stopLoading: () => {},
});

const MAX_LOADING_MS = 8000; // safety net

const normalize = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef(null);

  const stopLoading = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsLoading(false);
  }, []);

  const startLoading = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsLoading(true);
    timerRef.current = setTimeout(() => setIsLoading(false), MAX_LOADING_MS);
  }, []);

  // Internal link clicks that will really navigate to a different path
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest('a');
      if (!anchor || anchor.hasAttribute('download')) return;
      if (anchor.getAttribute('target') === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('/#')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (normalize(url.pathname) === normalize(pathname)) return;

      startLoading();
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [pathname, startLoading]);

  // Back / forward navigation
  useEffect(() => {
    window.addEventListener('popstate', startLoading);
    return () => window.removeEventListener('popstate', startLoading);
  }, [startLoading]);

  // Stop when the destination route renders
  useEffect(() => {
    stopLoading();
  }, [pathname, stopLoading]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const value = useMemo(() => ({ startLoading, stopLoading }), [startLoading, stopLoading]);

  return (
      <LoadingContext.Provider value={value}>
        {children}
        {isLoading && <Loader />}
      </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);