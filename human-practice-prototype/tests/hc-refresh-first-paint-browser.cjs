/* First-paint regression: deliberately delay the final design CSS.
   No real user data, localStorage, recorded media or other app sources are touched. */
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'allow',reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];let navigations=0,delayed=0;
  page.on('framenavigated',frame=>{if(frame===page.mainFrame())navigations++});
  page.on('pageerror',err=>errors.push(err.message));
  await page.route(/hc-design-unified-v279\.css\?v=284/,async route=>{
   delayed++;await sleep(1600);await route.continue();
  });
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'commit',timeout:30000});
  await page.waitForSelector('.hc-boot-screen',{state:'visible',timeout:15000});
  await page.waitForSelector('.app',{state:'attached',timeout:15000});
  const early=await page.evaluate(()=>{
   const splash=document.querySelector('.hc-boot-screen');
   const app=document.querySelector('.app');
   return {booting:document.documentElement.classList.contains('hc-booting'),
    splash:getComputedStyle(splash).display,
    app:getComputedStyle(app).visibility,
    background:getComputedStyle(document.body).backgroundColor};
  });
  assert.equal(early.booting,true,'Old layout must not paint while theme is loading');
  assert.equal(early.splash,'flex');
  assert.equal(early.app,'hidden');
  const rgb=(early.background.match(/\d+/g)||[]).map(Number);
  assert.equal(rgb.length,3,'First-paint background must be a solid dark colour');
  assert.ok(rgb.every(channel=>channel<=20),'First-paint colour must be black, not legacy blue: '+early.background);
  await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'),{timeout:20000});
  await page.waitForSelector('#home.active',{timeout:10000});
  assert.equal(await page.locator('.hc-boot-screen').isVisible(),false);
  assert.equal(await page.locator('.app').evaluate(el=>getComputedStyle(el).visibility),'visible');
  assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('hc-cinema')),true);
  assert.equal(await page.locator('#hcHomeWordmarkDesign').innerText(),'HeartClear');
  assert.ok(delayed>=1,'Design stylesheet request was not intercepted');
  await sleep(1000);
  assert.equal(navigations,1,'No unsolicited reload after initial app opening');
  await page.reload({waitUntil:'commit'});
  await page.waitForSelector('.hc-boot-screen',{state:'visible',timeout:12000});
  await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'),{timeout:20000});
  await page.waitForSelector('#home.active',{timeout:10000});
  await sleep(1000);
  assert.equal(navigations,2,'Refreshing once must not trigger a second unwanted refresh');
  // The active service worker may serve the refresh request without Playwright interception.
  // Verify the actual result rather than requiring a network request on every reload.
  assert.equal(await page.locator('.app').evaluate(el=>getComputedStyle(el).visibility),'visible');
  const firstParty=errors.filter(s=>s!=='writeEmbed is not defined');
  assert.deepEqual(firstParty,[],'Browser must have no first-party runtime exceptions');
  console.log('PASS: old palette hidden, approved theme shown, no automatic repeat refresh');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
