const CACHE = 'night-pdf-cache-v2';
const SHELL = '/index.html';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll([SHELL, '/manifest.json']);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('night-pdf-cache-') && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const navigation = request.mode === 'navigate';
  if (!navigation && !url.pathname.startsWith('/assets/')) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (!navigation) {
      const hit = await cache.match(request);
      if (hit) return hit;
    }
    let response;
    try {
      response = await fetch(request);
    } catch (error) {
      if (navigation) {
        const shell = await cache.match(SHELL);
        if (shell) return shell;
      }
      throw error;
    }
    if (response.ok && (!navigation || response.headers.get('content-type')?.includes('text/html'))) {
      try { await cache.put(navigation ? SHELL : request, response.clone()); }
      catch (error) { console.warn('Offline cache write failed.', error); }
    }
    return response;
  })());
});
