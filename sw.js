/* 變形機甲學園 service worker：安裝後離線也能玩 */
const VERSION = 'mecha-academy-v2.0.0';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // 字型：有網路就更新快取，沒網路就用快取（沒快取就退回系統字型，不影響遊玩）
  if (url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')) {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      try { const r = await fetch(e.request); c.put(e.request, r.clone()); return r; }
      catch (err) { const hit = await c.match(e.request); return hit || Response.error(); }
    }));
    return;
  }
  // 遊戲本體：先用快取，背景更新
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { caches.open(VERSION).then(c => c.put(e.request, r.clone())); return r; }).catch(() => hit);
    return hit || net;
  }));
});
