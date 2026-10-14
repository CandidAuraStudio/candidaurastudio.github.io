/* NIYYAH phase 1 isolated service worker. Controls only /niyyah/ URLs and caches NIYYAH assets. */
const CACHE='niyyah-shell-v1-2-0';
const SHELL=['./','./index.html','./styles.css','./app.js','./verses.js','./lessons.js','./juz78-89.js','./juz90-101.js','./juz102-114.js','./baqarah-opening.js','./baqarah-full-v12.js','./baqarah-editorial-v12.js','./library-ui.js','./manifest.webmanifest','./assets/icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('niyyah-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const u=new URL(event.request.url);
 if(u.origin!==self.location.origin||!u.pathname.startsWith(new URL('./',self.registration.scope).pathname))return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});