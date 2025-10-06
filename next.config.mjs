import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'src/sw-custom.js',
  buildExcludes: [/app-build-manifest\.json$/, /middleware-manifest\.json$/, /build-manifest\.json$/],  // Add this
  runtimeCaching: [
    {
      urlPattern: /^\/version\.json/i,
      handler: 'NetworkOnly',
      options: { cacheName: 'version' },
    },
    {
      urlPattern: /^\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: { maxAgeSeconds: 14 * 24 * 60 * 60, maxEntries: 100 },
      },
    },
    {
      urlPattern: /^\/(?!api|_next|favicon\.ico|version\.json).*/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'pages', expiration: { maxAgeSeconds: 14 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /^\/api\/.*/i,
      handler: 'NetworkFirst',
      options: { cacheName: 'api', expiration: { maxAgeSeconds: 24 * 60 * 60 } },
    },
  ],
})({
  reactStrictMode: true,
  compiler: { emotion: true },
});

export default withPWAConfig;
