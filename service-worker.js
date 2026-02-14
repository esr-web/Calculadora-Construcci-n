const CACHE_NAME = 'calculadora-construccion-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/muros.js',
  './js/ladrillos.js',
  './js/hormigon.js',
  './js/pladur.js',
  './manifest.json'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
