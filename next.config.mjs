import withPWAInit from 'next-pwa';

const isTurbo = process.argv.includes('--turbo');

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'service-worker/sw-custom.js',
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

// Only apply the PWA plugin if NOT using Turbo
export default isTurbo ? nextConfig : withPWA(nextConfig);