const CACHE_NAME = 'ayar-static-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/gold-price/'
];

// 1. تنصيب الـ Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// 2. تفعيل وتنظيف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. اعتراض الطلبات (Fetch)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // أ. أسعار الذهب والأخبار: لازم نجيبها من الإنترنت دايماً (Network Only)
  if (url.pathname.includes('/api/') || url.hostname.includes('gold-api.com') || url.hostname.includes('workers.dev')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ب. ملفات الإعلانات: لا نتدخل فيها (No Cache)
  if (url.hostname.includes('n6wxm.com') || url.hostname.includes('ldrws.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ج. الصفحات (HTML): نجيبها من النت الأول، ولو النت قطع نعرض نسخة الكاش
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // د. الصور والخطوط (Static): نجيبها من الكاش الأول للسرعة
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
