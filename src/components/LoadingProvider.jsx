'use client';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loading/loading';


const LoadingContext = createContext({
   startLoading: () => {},
   stopLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();


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
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ 
      startLoading: () => setIsLoading(true),
      stopLoading: () => setIsLoading(false),
    }}>
      {children}
      {isLoading && (
        <Loader />
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);