const APP_CACHE='heartclear-v182';
const MEDIA_CACHE='heartclear-media-v1';

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    // Preserve an app shell so installed HeartClear can reopen without a network.
    try{
      const cache=await caches.open(APP_CACHE);
      await cache.add(new Request('./index.html',{cache:'reload'}));
      // Optional install assets must never prevent the app shell from being cached.
      await Promise.allSettled(['./hc-explore.css?v=154','./hc-explore-core.js?v=161','./hc-explore-ui.js?v=161','./hc-health-talk-v156.js?v=160','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png', './quran-study-data.js?v=122','./quran-study-reflections.js?v=122','./quran-study-ui.js?v=135','./quran-study.css?v=135','./hc-explorer.js?v=126','./hc-explorer.css?v=126','./hc-inline-audio.js?v=156','./hc-home-one-tap-v139.js?v=145','./hc-family-kitchen-v144.js?v=154','./hc-monthly-kitchen-v145.js?v=165','./hc-kitchen-teaching-v149.js?v=150','./hc-sounds-direct-v149.js?v=152','./hc-quran-home-v153.js?v=168','./hc-home-routine-v155.js?v=155','./hc-daily-care-v182.js?v=182','./hc-genesis-v156.js?v=168','./hc-hindu-scriptures-v162.js?v=170','./hc-gita-original-audio-v163.js?v=172','./hc-kitchen-compact-v163.js?v=167','./hc-kitchen-recipes-v181.js?v=181','./hc-playback-one-tap-v174.js?v=178','./hc-accounts-preview-v176.js?v=177']
        .map(asset=>cache.add(new Request(asset,{cache:'reload'}))));
    }catch(e){}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    for(const key of keys){
      // Do not remove caches belonging to other apps on this GitHub Pages domain.
      if(key.startsWith('heartclear-v') && key!==APP_CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

async function cachedMediaResponse(request,cached){
  if(!cached)return null;

  const range=request.headers.get('range');
  if(!range || cached.type==='opaque') return cached;

  try{
    const match=/bytes=(\d+)-(\d*)/.exec(range);
    if(!match)return cached;

    const buffer=await cached.clone().arrayBuffer();
    const start=Number(match[1]);
    const end=match[2] ? Math.min(Number(match[2]),buffer.byteLength-1) : buffer.byteLength-1;

    if(start>=buffer.byteLength || end<start){
      return new Response(null,{status:416,statusText:'Range Not Satisfiable',
        headers:{'Content-Range':`bytes */${buffer.byteLength}`,'Accept-Ranges':'bytes'}});
    }

    const headers=new Headers(cached.headers);
    // Cached response bytes are decoded, so remove representation headers incompatible with a byte slice.
    headers.delete('Content-Encoding');
    headers.delete('Transfer-Encoding');
    headers.set('Content-Range',`bytes ${start}-${end}/${buffer.byteLength}`);
    headers.set('Accept-Ranges','bytes');
    headers.set('Content-Length',String(end-start+1));

    return new Response(buffer.slice(start,end+1),{
      status:206,
      statusText:'Partial Content',
      headers
    });
  }catch(e){
    return cached;
  }
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return; // Never intercept unrelated writes or POSTs.

  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const response=await fetch(request,{cache:'no-store'});
        if(response.ok){
          try{
            const cache=await caches.open(APP_CACHE);
            await cache.put('./index.html',response.clone());
          }catch(e){}
        }
        return response;
      }catch(e){
        let fallback=null;
        try{
          const cache=await caches.open(APP_CACHE);
          fallback=await cache.match('./index.html');
        }catch(e){}
        return fallback||new Response('HeartClear needs an internet connection the first time it is opened.',{
          status:503,
          headers:{'Content-Type':'text/plain; charset=utf-8'}
        });
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const mediaCache=await caches.open(MEDIA_CACHE);
    const saved=await mediaCache.match(request.url);

    if(saved){
      const mediaResponse=await cachedMediaResponse(request,saved);
      if(mediaResponse)return mediaResponse;
    }

    try{
      return await fetch(request,{cache:'no-store'});
    }catch(e){
      return (await caches.match(request)) || new Response('',{status:504});
    }
  })());
});
