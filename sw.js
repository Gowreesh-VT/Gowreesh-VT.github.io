/*----------------------------------------------------*/
/*	Service Worker for Portfolio PWA
------------------------------------------------------*/

// Cache version - increment this to force cache refresh
const CACHE_VERSION = 'v16-portfolio-clean-grid-' + Date.now();
const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/main.css',
  '/css/vendor.css',
  '/css/fonts.css',
  '/css/micons/micons.css',
  '/js/main.js',
  '/js/login.js',
  '/js/enhanced-ui.js',
  '/js/lazy-loading.js',
  '/js/particles-3d.js',
  '/js/firebase-config.js',
  '/js/auth.js',
  '/js/plugins.js',
  '/js/jquery-2.1.3.min.js',
  '/images/logo.png',
  '/images/intro-bg.jpg',
  '/images/bg.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Service Worker: Cache failed', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() => {
      return caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_VERSION) {
              return caches.delete(cacheName);
            }
          })
        );
      });
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_VERSION)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  console.log('Service Worker: Syncing contact form submissions');
}