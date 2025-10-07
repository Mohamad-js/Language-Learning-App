import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'public/sw-custom.js', // 👈 custom SW code
  buildExcludes: [
    /app-build-manifest\.json$/,
    /middleware-manifest\.json$/,
    /build-manifest\.json$/,
  ],
})({
  reactStrictMode: true,
  compiler: { emotion: true },
});

export default withPWAConfig;
