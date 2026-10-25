/* HeartClear current mobile navigation regression.
   Tests real visible six-tab dock, selected route and return to original content. */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block',reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>{if(e.message!=='writeEmbed is not defined')errors.push(e.message)});
  page.on('dialog',d=>d.dismiss());
  const url=process.env.HEARTCLEAR_QA_URL||'http://127.0.0.1:8765/human-practice-prototype/';
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'),{timeout:20000});
  await page.waitForSelector('#home.active',{timeout:30000});
  const ids=await page.evaluate(()=>{
   const counts=new Map();
   for(const el of document.querySelectorAll('[id]'))counts.set(el.id,(counts.get(el.id)||0)+1);
   return [...counts].filter(([,n])=>n>1);
  });
  assert.deepEqual(ids,[],'No duplicate DOM IDs');
  const missing=await page.evaluate(()=>{
   const found=[];
   for(const element of document.querySelectorAll('[onclick],[onchange]')){
    for(const key of ['onclick','onchange']){
     const expression=element.getAttribute(key)||'';
     const m=expression.match(/^\s*(?:return\s+)?([A-Za-z_$][\w$]*)\s*\(/);
     if(m&&m[1]!=='if'&&typeof window[m[1]]!=='function')found.push(key+': '+m[1]);
    }
   }
   return [...new Set(found)];
  });
  assert.deepEqual(missing,[],'No broken legacy inline handlers');
  const dock=page.locator('#hcFlowDock');
  const idsOrdered=['hcFlowDockHome','hcFlowDockListen','hcCinemaExplore','hcCinemaLibrary','hcCinemaReels','hcCinemaSettings'];
  for(const id of idsOrdered)assert.equal(await page.locator('#'+id).count(),1,'Dock action mounted '+id);
  assert.equal(await dock.locator('button').count(),6,'Exactly six navigational actions');
  assert.equal(await page.locator('#hcFlowDockSearch').count(),0,'Search must not replace Reels in dock');
  const check=async id=>assert.equal(await page.locator('#'+id).evaluate(el=>el.classList.contains('active')),true,'Active screen '+id);
  // The old upper "..." button is intentionally hidden in the v279 simplified layout.
  assert.equal(await page.locator('#hcTopSettingsAction').isVisible(),false,'Old top Settings control is not an active navigation affordance');
  await page.locator('#hcCinemaLibrary').click();await check('library');
  await page.locator('#hcCinemaSettings').click();await check('settings');
  await page.locator('#hcCinemaLibrary').click();await check('library');
  await page.locator('#hcFlowDockHome').click();await check('home');
  await page.locator('#hcCinemaExplore').click();
  assert.equal(await page.locator('#hcFlowExplore').isVisible(),true,'Explore opens as a real overlay');
  assert.ok(await page.locator('#hcFlowExploreGrid button').count()>=15,'Explore destinations reachable');
  await page.locator('#hcFlowExploreClose').click();
  await check('home');
  // Switching into Settings must not change saved listening positions.
  await page.evaluate(()=>{window.__hcTestHistory=localStorage.getItem('clearWithinHistory')});
  await page.locator('#hcCinemaSettings').click();await check('settings');
  await page.locator('#hcFlowDockHome').click();await check('home');
  assert.equal(await page.evaluate(()=>localStorage.getItem('clearWithinHistory')===window.__hcTestHistory),true,'History unchanged by navigating');
  assert.deepEqual(errors,[],'No first party JS errors during navigation');
  console.log('PASS: Home, Library, Settings, Explore, unique IDs, routes and preserved history');
 }finally{await browser.close();}
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
