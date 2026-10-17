/* ================================================================
   Self-Managed Intelligent Cache Service Worker (v2)
   - Pre-caches core application shell & self-hosted Inter fonts
   - Cache-First for local fingerprinted assets (/_astro/*), thumbnails, fonts
   - Network-First with Cache Fallback for HTML documents
   - Bounded LRU Cache for Cloudflare R2 media (max 50 items to avoid quota bloat)
   - Clean handling for video range streaming
   ================================================================ */

const CACHE_NAME = 'hmt-cache-v2';
const MEDIA_CACHE_NAME = 'hmt-r2-media-v2';
const MEDIA_HOST = 'pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';
const MAX_MEDIA_ENTRIES = 50;

const PRECACHE_ASSETS = [
  '/',
  '/vn/',
  '/avatar.webp',
  '/fonts/inter/inter-latin.woff2',
  '/fonts/inter/inter-vietnamese.woff2',
  '/fonts/inter/inter-latin-ext.woff2',
  '/thumbnails/chroma.webp',
  '/thumbnails/mana.webp',
  '/thumbnails/green-summer.webp',
  '/thumbnails/regretful-colors.webp',
  '/thumbnails/definitely-not-late.webp',
  '/thumbnails/puss-in-boots.webp',
  '/thumbnails/illustration-works.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, MEDIA_CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => !currentCaches.includes(k)).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// LRU cache trimmer to prevent mobile quota crashes on opaque assets
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
      const deleteCount = keys.length - maxItems;
      for (let i = 0; i < deleteCount; i++) {
        await cache.delete(keys[i]);
      }
    }
  } catch (e) {}
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  // Allow video streaming range requests to pass to network untouched
  if (req.headers.has('range')) return;

  const isNavigation = req.mode === 'navigate';
  const isSameOrigin = url.origin === self.location.origin;
  const isR2Media = url.hostname === MEDIA_HOST;

  // 1. HTML Navigation (Network-first with cache fallback)
  if (isNavigation && isSameOrigin) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return networkRes;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return caches.match('/');
        })
    );
    return;
  }

  // 2. Local static assets: fingerprinted /_astro/*, /fonts/*, /thumbnails/*, avatar.webp
  if (isSameOrigin && (
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.startsWith('/thumbnails/') ||
    url.pathname === '/avatar.webp'
  )) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        const res = await fetch(req);
        if (res && res.status === 200) {
          cache.put(req, res.clone());
        }
        return res;
      })
    );
    return;
  }

  // 3. Remote Cloudflare R2 Media (Cache-first with bounded LRU trimming)
  if (isR2Media) {
    event.respondWith(
      caches.open(MEDIA_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        const res = await fetch(req);
        if (res && (res.ok || res.type === 'opaque')) {
          cache.put(req, res.clone());
          trimCache(MEDIA_CACHE_NAME, MAX_MEDIA_ENTRIES);
        }
        return res;
      })
    );
    return;
  }
});
