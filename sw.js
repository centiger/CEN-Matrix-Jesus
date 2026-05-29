const CACHE_NAME='jesus-matrix-v1-20260529-cross';
const ASSETS=['./','./index.html','./manifest.json','./hubs/index.html','./hubs/assets/maps/incarnation-hub-map.png','./hubs/assets/maps/ministry-hub-map.png','./hubs/assets/maps/revelation-hub-map.png','./hubs/assets/maps/cross-hub-map.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
