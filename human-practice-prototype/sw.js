const CACHE='sufi-stage2-instructions-v22';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate') e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>new Response('Offline')));
  else e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
});