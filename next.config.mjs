import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'service-worker/sw-custom.js', // ✅ this points to your custom source file
  buildExcludes: [
    /app-build-manifest\.json$/,
    /middleware-manifest\.json$/,
    /build-manifest\.json$/,
  ],
});

const nextConfig = {
  reactStrictMode: true,
  compiler: { emotion: true },
};

export default withPWA(nextConfig);
