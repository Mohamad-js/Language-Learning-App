import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

self.skipWaiting();
clientsClaim();

// 🧹 Caching
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST || []);

// ✅ Cache API routes — expires after 30 entries or 7 days
registerRoute(
  /^\/api\/.*/i,
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// ✅ Cache images — expires after 60 images or 30 days
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// ✅ Cache static assets (CSS, JS, fonts) with Stale-While-Revalidate
registerRoute(
  ({ request }) =>
    ['script', 'style', 'font'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// ✅ Push Notifications
self.addEventListener('push', (event) => {
  console.log('📩 Push event received:', event);

  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    console.error('❌ Failed to parse push data:', err);
  }

  const title = data.title || 'Default Notification';
  const body = data.body || 'You got a new message!';
  const icon = data.icon || '/logo-192.png';
  const url = data.url || '/';

  console.log('🧠 Notification details:', { title, body, icon, url });

  const options = {
    body,
    icon,
    badge: '/logo-192.png',
    data: { url },
    vibrate: [100, 50, 100],
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
    requireInteraction: true,
  };

  console.log('🪄 Showing notification now...');
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ✅ Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🖱 Notification clicked:', event.notification);
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

