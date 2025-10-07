import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

self.skipWaiting();
clientsClaim();

// --- Caching ---
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache pages
registerRoute(
  /^\/(?!api|_next|favicon\.ico|version\.json).*/i,
  new StaleWhileRevalidate({
    cacheName: 'pages',
    plugins: [new ExpirationPlugin({ maxAgeSeconds: 14 * 24 * 60 * 60 })],
  }),
  'GET'
);

// Cache static Next.js assets
registerRoute(
  /^\/_next\/static\/.*/i,
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [new ExpirationPlugin({ maxAgeSeconds: 14 * 24 * 60 * 60, maxEntries: 100 })],
  }),
  'GET'
);

// Cache API responses
registerRoute(
  /^\/api\/.*/i,
  new NetworkFirst({
    cacheName: 'api',
    plugins: [new ExpirationPlugin({ maxAgeSeconds: 24 * 60 * 60 })],
  }),
  'GET'
);

// Handle version.json (for update checking)
registerRoute(
  /^\/version\.json/i,
  new NetworkOnly({ cacheName: 'version' }),
  'GET'
);

// --- Push Notifications ---
self.addEventListener('push', event => {
  console.log('Push event received:', event);
  const data = event.data ? event.data.json() : { title: 'Default Title', body: 'Default Body' };
  console.log('Push data:', data);

  event.waitUntil(
    self.registration.showNotification(data.title || 'Default Title', {
      body: data.body || 'Default Body',
      icon: data.icon || '/logo-192.png',
      badge: data.badge || '/logo-192.png',
      data: { url: data.url || '/' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event.notification);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === event.notification.data.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(event.notification.data.url);
    })
  );
});
