/* =====================================================
   Service Worker — ayar-tawny
   الإصدار: v3 (لتجاوز الكاش القديم)
===================================================== */

const CACHE_NAME = 'ayar-v3';

/* الملفات التي سيتم تخزينها مسبقًا */
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

/* =====================================================
   التثبيت: تخزين الملفات الأساسية
===================================================== */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS).catch((err) => {
          console.warn('Precache warning:', err);
        });
      })
      .then(() => self.skipWaiting()) // تنشيط فوري دون انتظار
  );
});

/* =====================================================
   التنشيط: حذف الكاش القديم
===================================================== */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim()) // السيطرة على الصفحات المفتوحة
  );
});

/* =====================================================
   الجلب: استراتيجية Network First
   (نحاول الشبكة أولًا، ثم الكاش عند الفشل)
===================================================== */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  /* تجاهل الطلبات غير GET */
  if (request.method !== 'GET') return;

  /* تجاهل طلبات الـ API (دائماً من الشبكة) */
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  /* تجاهل الطلبات من نطاقات أخرى */
  if (url.origin !== self.location.origin) return;

  /* Network First */
  event.respondWith(
    fetch(request)
      .then((response) => {
        /* إذا كانت الاستجابة سليمة، خزّن نسخة */
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone).catch(() => {});
          });
        }
        return response;
      })
      .catch(() => {
        /* عند فشل الشبكة، ارجع للكاش */
        return caches.match(request).then((cached) => {
          if (cached) return cached;

          /* إذا كان الطلب لصفحة HTML، أرجع index.html */
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }

          return new Response('Offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
  );
});

/* =====================================================
   رسائل من الصفحة (لتحديث SW عند الحاجة)
===================================================== */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
