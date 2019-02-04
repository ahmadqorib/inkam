const cacheVersion = 'pwa-InKaM-v1';

const filesToCache = [
  '/inkam/',
  '/inkam/asset/akakom.png',
  '/inkam/asset/ig.png',
  '/inkam/asset/info1.jpeg',
  '/inkam/asset/coba.jpg',
  '/inkam/app/main.js',
  '/inkam/data/info.json',
  '/inkam/data/kampus.json',
  '/inkam/not-found.html'
];

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache');
  event.waitUntil(
    caches.open(cacheVersion)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {

  const cacheWhitelist = [cacheVersion];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
      .then(response => {
        if (response.status === 404) {
          return caches.match('/inkam/not-found.html');
        }
        return caches.open(cacheVersion)
        .then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    }).catch(error => {
      console.log('Error, ', error);
      return caches.match('/inkam/not-found.html');
    })
  );
});
