/*----------------------------------------------------*/
/*	Service Worker for Portfolio PWA
------------------------------------------------------*/
const CACHE_VERSION = 'v20-minified-nov2025';
const STATIC_CACHE = CACHE_VERSION + '-static';
const DYNAMIC_CACHE = CACHE_VERSION + '-dynamic';
const IMAGE_CACHE = CACHE_VERSION + '-images';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.min.css',
  '/css/main.min.css',
  '/css/vendor.min.css',
  '/css/fonts.css',
  '/css/typing-animation.css',
  '/css/micons/micons.css',
  '/js/main.min.js',
  '/js/enhanced-ui.min.js',
  '/js/lazy-loading.min.js',
  '/js/particles-3d.js',
  '/js/typing-animation.min.js',
  '/js/plugins.min.js',
  '/js/jquery-2.1.3.min.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Service Worker: Cache failed', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  if (request.destination === 'document') {

    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (request.destination === 'image') {

    event.respondWith(cacheFirstWithLimit(request, IMAGE_CACHE, 50));
  } else {

    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || caches.match('/index.html');
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

async function cacheFirstWithLimit(request, cacheName, maxItems) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      if (keys.length >= maxItems) {
        await cache.delete(keys[0]);
      }
      
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
}