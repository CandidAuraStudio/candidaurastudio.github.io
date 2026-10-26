const APP_CACHE='heartclear-v285';
const MEDIA_CACHE='heartclear-media-v1';

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    // Preserve an app shell so installed HeartClear can reopen without a network.
    try{
      const cache=await caches.open(APP_CACHE);
      await cache.add(new Request('./index.html',{cache:'reload'}));
      // Optional install assets must never prevent the app shell from being cached.
      await Promise.allSettled(['./books/human-when-you-are-alone.html','./books/human-when-you-are-alone-tamil.html','./books/shadows-of-truth-tamil-pages.js','./books/shadows-of-truth-english-pages.js','./books/shadows-of-truth-reader.html','./books/shadows-of-truth-cover.jpg','./books/human-cover.svg','./books/shadows-of-truth-sinhala.html','./books/shadows-of-truth-sinhala-data.js','./hc-explore.css?v=212','./hc-explore-core.js?v=161','./hc-explore-ui.js?v=280','./hc-mind-catalog.js?v=190','./hc-mind-game.js?v=190','./hc-mind-broader-v207.js?v=212','./hc-health-talk-v156.js?v=160','./manifest.webmanifest?v=284','./icon.svg?v=284','./icon-192.png?v=284','./icon-512.png?v=284', './quran-study-data.js?v=122','./quran-study-reflections.js?v=122','./quran-study-ui.js?v=233','./quran-study.css?v=232','./hc-explorer.js?v=284','./hc-explorer.css?v=284','./hc-inline-audio.js?v=156','./hc-home-one-tap-v139.js?v=284','./hc-family-kitchen-v144.js?v=154','./hc-monthly-kitchen-v145.js?v=202','./hc-kitchen-teaching-v149.js?v=150','./hc-sounds-direct-v149.js?v=264','./hc-quran-home-v153.js?v=263','./hc-home-routine-v155.js?v=284','./hc-daily-care-v182.js?v=284','./hc-body-science-v193.js?v=193','./hc-deep-heritage-v185.js?v=284','./hc-heritage-reader-v189.js?v=284','./hc-genesis-v156.js?v=188','./hc-hindu-scriptures-v162.js?v=262','./hc-vedic-library-v215.js?v=226','./hc-gita-original-audio-v163.js?v=261','./hc-kitchen-world-v205.js?v=206','./hc-kitchen-world-v207.js?v=210','./hc-kitchen-compact-v163.js?v=240','./hc-kitchen-worldwide-v207.js?v=222','./hc-kitchen-recipes-v181.js?v=240','./hc-playback-one-tap-v174.js?v=284','./hc-accounts-preview-v176.js?v=177','./hc-mini-transport-v185.js?v=187','./hc-bubble-v207.css?v=236','./hc-bubble-v207.js?v=242','./hc-flow-v220.css?v=269','./hc-flow-v220.js?v=285','./hc-cinema-scene-v239.svg','./hc-cinema-v239.css?v=270','./hc-cinema-v239.js?v=284','./hc-content-stability-v243.css?v=251','./hc-reels-minimal-v248.css?v=284','./hc-global-language-v245.css?v=245','./hc-global-language-v245.js?v=263','./hc-meditation-navigation-v237.js?v=237','./hc-kitchen-language-v234.js?v=234','./hc-human-daily-path-v192.js?v=196','./hc-mantra-one-place-v216.js?v=251','./hc-om-mini-v252.js?v=252','./hc-unified-visual-v259.css?v=267','./hc-home-visible-v268.css?v=277','./hc-design-unified-v279.css?v=284','./hc-home-visible-v268.js?v=284', './hc-listening-hub-v254.css?v=258','./hc-listening-hub-v254.js?v=280','./hc-home-layout-v256.js?v=257','./hc-home-core-paths-v259.js?v=268', './hc-infinity-depth-v258.js?v=265','./hc-infinity-journey-v211.js?v=265']
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
            // Cache the book at its own URL, not as the offline home page.
            const scope=new URL(self.registration.scope);
            const page=new URL(request.url);
            if(page.origin===scope.origin && page.pathname.startsWith(scope.pathname)){
              const key=(page.pathname===scope.pathname||page.pathname===scope.pathname+'index.html')?'./index.html':request;
              await cache.put(key,response.clone());
            }
          }catch(e){}
        }
        return response;
      }catch(e){
        let fallback=null;
        try{
          const cache=await caches.open(APP_CACHE);
          const page=new URL(request.url);
          const scope=new URL(self.registration.scope);
          if(page.origin===scope.origin && page.pathname.startsWith(scope.pathname) && /\/books\/(?:human-when-you-are-alone(?:-tamil)?|shadows-of-truth-sinhala|shadows-of-truth-reader)\.html$/.test(page.pathname)){
            fallback=await cache.match(request);
          }
          if(!fallback)fallback=await cache.match('./index.html');
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
