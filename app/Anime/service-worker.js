const CACHE_NAME = 'pwa-cache-v1'; // Change this to update the cache
const cacheUrls = [
    '/',
    '/app/Anime/index.html', // Add any other HTML files you have
    '/app/Anime/styles.css',
    '/app/Anime/app.js',
    '/app/Anime/pwa.png',
    // Add other assets and resources you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheUrls);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});
