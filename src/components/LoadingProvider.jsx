'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loading/loading';

const LoadingContext = createContext({
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Handle internal link clicks
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');

      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        target !== '_blank' &&
        href !== pathname
      ) {
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, [pathname]);

  // Handle browser/mobile back & forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsLoading(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Automatically stop loading when destination route renders
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider
      value={{
        startLoading: () => setIsLoading(true),
        stopLoading: () => setIsLoading(false),
      }}
    >
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);