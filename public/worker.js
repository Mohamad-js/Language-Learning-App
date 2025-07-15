// public/worker.js
self.__WB_MANIFEST = [
  "/",
  "/index.html",
  "/_next/static/css/app.css", // Adjust based on your build output
  "/_next/static/js/app.js",
  "/logo.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("precache-v1").then((cache) => {
      return cache.addAll(self.__WB_MANIFEST);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Let next-pwa handle runtime caching as configured
});