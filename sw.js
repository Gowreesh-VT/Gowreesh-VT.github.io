/*----------------------------------------------------*/
/*	Service Worker for Portfolio PWA
------------------------------------------------------*/

// Cache version - increment this to force cache refresh
const CACHE_VERSION = 'v17-portfolio-optimized-' + Date.now();
const STATIC_CACHE = CACHE_VERSION + '-static';
const DYNAMIC_CACHE = CACHE_VERSION + '-dynamic';
const IMAGE_CACHE = CACHE_VERSION + '-images';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/main.css',
  '/css/vendor.css',
  '/css/fonts.css',
  '/css/typing-animation.css',
  '/css/auth.css',
  '/css/micons/micons.css',
  '/js/main.js',
  '/js/login.js',
  '/js/enhanced-ui.js',
  '/js/lazy-loading.js',
  '/js/particles-3d.js',
  '/js/typing-animation.js',
  '/js/firebase-config.js',
  '/js/auth.js',
  '/js/plugins.js',
  '/js/jquery-2.1.3.min.js',
  '/images/logo.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Service Worker: Cache failed', err))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle different request types with different strategies
  if (request.destination === 'document') {
    // Network first for HTML
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (request.destination === 'image') {
    // Cache first for images with size limit
    event.respondWith(cacheFirstWithLimit(request, IMAGE_CACHE, 50));
  } else {
    // Cache first for CSS, JS, fonts
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});

// Network first strategy
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

// Cache first strategy
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
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Cache first with size limit
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
      
      // Remove oldest if exceeding limit
      if (keys.length >= maxItems) {
        await cache.delete(keys[0]);
      }
      
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Image fetch failed:', error);
    throw error;
  }
}

self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  console.log('Service Worker: Syncing contact form submissions');
}