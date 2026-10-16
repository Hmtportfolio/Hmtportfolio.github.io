/* ================================================================
   Cache-first service worker for R2-hosted media (images, video).
   Goal: once an asset has been downloaded, never fetch it again —
   full original quality is kept, only the network round-trip is
   skipped on repeat views.

   If you replace a file in the R2 bucket under the SAME url (like
   swapping a poster image), bump CACHE_NAME below (v1 -> v2) so
   returning visitors don't keep getting the stale cached bytes.
   This mirrors the ?v= convention used for styles.css/app.js.
   ================================================================ */
const CACHE_NAME = 'hmt-media-cache-v1';
const MEDIA_HOST = 'pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  const isR2Media = url.hostname === MEDIA_HOST;
  const isLocalMedia = url.origin === self.location.origin && (
    url.pathname.startsWith('/thumbnails/') ||
    url.pathname === '/avatar.webp'
  );

  if (!isR2Media && !isLocalMedia) return;

  // Let range requests (video seeking/scrubbing) go straight to the network —
  // avoids exceeding browser cache storage quotas on large video chunks.
  if (req.headers.has('range')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);
      if (cached) return cached;
      const res = await fetch(req);
      // Cross-origin, no-CORS responses come back "opaque" (status 0, unreadable) —
      // still safe and correct to cache/replay for <img>/<video>, so cache those too.
      if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
      return res;
    })
  );
});
