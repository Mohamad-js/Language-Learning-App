// app/components/ServiceWorkerRegistrar.js
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    console.log('🔍 ServiceWorkerRegistrar: useEffect triggered');
    
    if ('serviceWorker' in navigator) {
      console.log('🔍 ServiceWorkerRegistrar: serviceWorker API available');
      
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('✅ Service worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('❌ Service worker registration failed:', error);
        });
    } else {
      console.log('❌ ServiceWorkerRegistrar: serviceWorker API NOT available');
    }
  }, []);

  return null;
}