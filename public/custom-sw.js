// public/sw-custom.js
// This will be your custom service worker that handles push notifications
// while preserving all the Workbox functionality

// Push notification handlers
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  
  const options = {
    body: data.body || 'New notification',
    icon: data.icon || '/logo-192.png',
    badge: data.badge || '/logo-192.png',
    data: data.data || {}
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.openWindow(url)
  );
});

// The actual Workbox service worker code will be injected here automatically
// by the next-pwa plugin