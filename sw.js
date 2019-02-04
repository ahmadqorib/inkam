const cacheVersion = 'pwa-InKaM-v1';

const filesToCache = [
  '/inkam/',
  '/inkam/asset/akakom.png',
  '/inkam/asset/ig.png',
  '/inkam/asset/info1.jpeg',
  '/inkam/asset/coba.jpg',
  '/inkam/css/all.css',
  '/inkam/css/bootstrap.min.css',
  '/inkam/js/bootstrap.min.js',
  '/inkam/js/bootstrap.min.js',
  '/inkam/js/jquery.min.js',
  '/inkam/js/popper.min.js',
  '/inkam/app/main.js',
  '/inkam/data/info.json',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheVersion)
      .then(function(cache) {
        return cache.addAll(filesToCache)
      })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) return res;

        return fetch(event.request);
      })
  );
});
