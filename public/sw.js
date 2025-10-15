self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  clients.claim();
});

// ✅ Cache metadata responses (like /api/videos) for offline preview
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache metadata API, not video streams
  if (url.pathname.startsWith("/api/videos")) {
    event.respondWith(
      caches.open("videos-cache").then(async (cache) => {
        try {
          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cachedResponse = await cache.match(event.request);
          return cachedResponse || Response.redirect("/offline.html");
        }
      })
    );
  }
});
