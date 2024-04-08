const CACHE_NAME = 'TakamiyaApp';
const urlsToCache = [
    '/',
    '/app/Takamiyanime/index.html',
    '/app/Takamiyanime/styles.css',
    '/app/Takamiyanime/app.js',
    '/app/Takamiyanime/manifest.json',
    '/app/Takamiyanime/icon.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));

                        return response;
                    });
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('TakamiyaApp') && cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
                       
