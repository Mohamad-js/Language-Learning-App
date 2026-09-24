import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    swSrc: 'service-worker/sw-custom.js',
    publicExcludes: [
        "!images/a1/What's up.jpg",
        "!sounds/A1/What's up-*.mp3",
    ],
    buildExcludes: [
        /app-build-manifest\.json$/,
        /middleware-manifest\.json$/,
        /build-manifest\.json$/,
    ],
});

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        emotion: true,
    },
    turbopack: {},
};

export default nextConfig;