/* 變形機甲學園 service worker：離線可玩，有新版時通知使用者 */
const VERSION = 'mecha-academy-v2.2.1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  // 不自動接管：先等著，讓頁面跳出「有新版本」讓使用者自己決定何時更新
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)));
});
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== VERSION + '-fonts').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // QR 函式庫與字型：有網路就更新快取，沒網路就用快取
  if (url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('cdnjs.cloudflare.com')) {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      try { const r = await fetch(e.request); c.put(e.request, r.clone()); return r; }
      catch (err) { const hit = await c.match(e.request); return hit || Response.error(); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // 主文件：優先拿新的，拿不到才用快取，這樣更新才會被偵測到
  if (e.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(fetch(e.request)
      .then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  // 其他資源：先用快取，背景更新
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; }).catch(() => hit);
    return hit || net;
  }));
});
