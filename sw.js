const CACHE_NAME = 'savannah-goode-v1';

// Cache website assets on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/main.css',
          '/js/main.js',
          '/images/icon-72x72.png',
          '/images/icon-96x96.png',
          '/images/icon-128x128.png',
          '/images/icon-144x144.png',
          '/images/icon-152x152.png',
          '/images/icon-192x192.png',
          '/images/icon-384x384.png',
          '/images/icon-512x512.png',
        ]);
      })
      .then(() => {
        console.log('Assets cached');
      })
  );
});

// Serve cached assets if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Remove outdated caches on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('savannah-goode-') && cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
  );
});
