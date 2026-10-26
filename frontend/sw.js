const CACHE_NAME = 'smart-gallery-v2.1.0';
const urlsToCache = [
    '/',
    '/dashboard',
    '/styles/premium-theme.css',
    '/styles/premium-ui.css',
    '/styles/dashboard.css',
    '/scripts/dashboard.js',
    '/assets/logo.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    // Skip caching for unsupported schemes (chrome-extension, chrome, etc.)
    const url = new URL(event.request.url);
    if (url.protocol === 'chrome-extension:' || url.protocol === 'chrome:' || url.protocol === 'moz-extension:') {
        return; // Let browser handle these requests
    }
    
    // Skip caching for non-HTTP(S) requests
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return;
    }
    
    // Live data must never come from the cache, otherwise screens keep showing old content
    // even after the server announces a change over the WebSocket.
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/ws')) {
        return;
    }

    // Network first, cache as fallback: screens always get the latest UI when the server is up,
    // and can still render the last known UI if it is briefly unreachable.
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache)).catch(() => {});
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


