/* Real Chromium mobile navigation + service worker offline recovery.
   Run against python3 -m http.server 8765 from repository root. */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.HEARTCLEAR_QA_URL||'http://127.0.0.1:8765/human-practice-prototype/';
const canonical=new URL('human-knowledge/ali-letter-31.html',base).href;
const output=process.env.HC_LETTER31_ARTIFACTS||'/tmp/hc-letter31-review';
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,serviceWorkers:'block',reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('dialog',d=>d.dismiss());
  const home=async()=>{
   await page.goto(base,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'));
   await page.locator('#hcCinemaLibrary').waitFor({state:'visible'});
  };
  const checkReader=async()=>{
   await page.waitForURL(canonical);
   await page.waitForFunction(()=>document.querySelectorAll('#arabicLetter p').length>5);
   assert.equal(await page.locator('#arabicLetter').getAttribute('lang'),'ar');
   assert.equal(await page.locator('#arabicLetter').evaluate(e=>getComputedStyle(e).direction),'rtl');
   assert((await page.locator('#arabicLetter').innerText()).trim().endsWith('والسلام'));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No mobile horizontal overflow');
  };
  await home();
  await page.locator('#hcCinemaLibrary').click();
  await page.locator('#library a[href="./human-knowledge/ali-letter-31.html"]').click();
  await checkReader();
  await page.screenshot({path:output+'/letter31-arabic-mobile.png',fullPage:false});
  // Arabic retains direction and fits the narrowest review viewport too.
  await page.setViewportSize({width:320,height:720});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.setViewportSize({width:393,height:852});
  await page.locator('#tabEnglish').click();
  assert(await page.locator('#sectionEnglish').isVisible());
  assert((await page.locator('#sectionEnglish').innerText()).includes('internet required'));
  const english=page.locator('#sectionEnglish a');
  assert((await english.getAttribute('href')).startsWith('https://al-islam.org/nahjul-balagha-part-2-letters-and-sayings/letter-31-'));
  assert.equal(await english.getAttribute('target'),'_blank');
  await page.screenshot({path:output+'/letter31-english-source-mobile.png',fullPage:false});
  await page.evaluate(()=>localStorage.setItem('clearWithinHistory','{"letter31PreservationProbe":true}'));
  await page.locator('#tabNotes').click();
  assert.equal(await page.locator('#myNote').inputValue(),'');
  await page.locator('#myNote').fill('My separate reflection · سكينة');
  await page.locator('#saveNote').click();
  await page.reload({waitUntil:'domcontentloaded'});
  await checkReader();
  await page.locator('#tabNotes').click();
  assert.equal(await page.locator('#myNote').inputValue(),'My separate reflection · سكينة');
  assert.equal(await page.evaluate(()=>localStorage.getItem('clearWithinHistory')),'{"letter31PreservationProbe":true}');
  assert(!(await page.locator('#arabicLetter').textContent()).includes('My separate reflection'));
  await page.locator('#tabArabic').focus();await page.keyboard.press('End');
  assert.equal(await page.locator('#tabNotes').getAttribute('aria-selected'),'true');
  // Reading Books -> English links to the same canonical URL; original two books remain.
  await home();await page.locator('#hcCinemaLibrary').click();
  await page.locator('#library button[onclick="openCollection(\'readingLanguages\')"]').click();
  await page.locator('#collection button[onclick="openCollection(\'reading-en\')"]').click();
  assert.equal(await page.locator('#collectionList .hc-reading-book-list > .hc-human-reading-entry').count(),3);
  await page.locator('#collection a[href="./human-knowledge/ali-letter-31.html"]').click();
  await checkReader();
  // Explore -> Human Knowledge uses the existing owner and existing reader hierarchy.
  await home();await page.locator('#hcCinemaExplore').click();
  await page.locator('#hcFlowExploreGrid button').filter({hasText:'Human Knowledge'}).click();
  await page.locator('#hcHeritageMain a[href="./human-knowledge/ali-letter-31.html"]').click();
  await checkReader();
  await context.close();
  // Separate real-SW context: install online, seed existing downloaded media, then reopen offline.
  const offline=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
  const reader=await offline.newPage();
  await reader.goto(base,{waitUntil:'domcontentloaded'});
  await reader.evaluate(async()=>{
   await navigator.serviceWorker.ready;
   if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));
   const saved=await caches.open('heartclear-media-v1');
   await saved.put(new URL('./letter31-preservation-probe.mp3',location.href),new Response('saved-original'));
  });
  await reader.waitForFunction(async()=>{
   const names=await caches.keys();const name=names.find(n=>n==='heartclear-v292');if(!name)return false;
   const cache=await caches.open(name);
   return !!(await cache.match('./human-knowledge/ali-letter-31.html'))&&!!(await cache.match('./human-knowledge/ali-letter-31-arabic.js'));
  });
  await offline.setOffline(true);
  await reader.goto(canonical,{waitUntil:'domcontentloaded'});
  await reader.waitForFunction(()=>document.querySelectorAll('#arabicLetter p').length>5);
  await reader.locator('#tabNotes').click();await reader.locator('#myNote').fill('Offline note');await reader.locator('#saveNote').click();
  await reader.reload({waitUntil:'domcontentloaded'});
  await reader.locator('#tabNotes').click();assert.equal(await reader.locator('#myNote').inputValue(),'Offline note');
  assert.equal(await reader.evaluate(async()=>{const c=await caches.open('heartclear-media-v1');return(await c.match(new URL('../letter31-preservation-probe.mp3',location.href))).text()}),'saved-original');
  await reader.locator('#tabEnglish').click();assert(await reader.locator('#sectionEnglish').isVisible());
  await reader.screenshot({path:output+'/letter31-offline-mobile.png',fullPage:false});
  await offline.close();
  console.log('PASS: all 3 canonical routes, mobile RTL/layout, English external source, separate persistent notes, keyboard tabs, real offline reader and preserved media');
 }finally{await browser.close()}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
