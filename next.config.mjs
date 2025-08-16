// next.config.mjs
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
   dest: 'public', // Output directory for service worker
   register: true, // Automatically register service worker
   skipWaiting: true, // Force new service worker to activate immediately
   disable: process.env.NODE_ENV === 'development', // Disable PWA in development
   runtimeCaching: [
   {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
      cacheName: 'static-assets',
         expiration: {
            maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
            maxEntries: 100,
         },
      },
   },
   {
      urlPattern: /^\/(?!api|_next|favicon\.ico).*/i,
      handler: 'StaleWhileRevalidate',
      options: {
         cacheName: 'pages',
         expiration: {
            maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
         },
      },
   },
   {
      urlPattern: /^\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
         cacheName: 'api',
         expiration: {
            maxAgeSeconds: 24 * 60 * 60, // 1 day
         },
      },
   },
],

compiler: {
   emotion: true, // Enable Emotion compiler
},
});

export default pwaConfig({
  reactStrictMode: true,
  // Add other Next.js configurations here if needed
});