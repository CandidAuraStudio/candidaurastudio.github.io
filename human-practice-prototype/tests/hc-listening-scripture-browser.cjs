/* Real Browser gate: PR #43 scripture cards must open original HC controls.
   Uses local app and does not start network audio playback. */
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const width of [393,1280]){
   const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',e=>{if(e.message!=='writeEmbed is not defined')errors.push(e.message)});
   await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded',timeout:30000});
   await page.waitForSelector('#hcListening',{state:'attached',timeout:20000});
   await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'),{timeout:20000});
   await page.evaluate(()=>{
     window.hcPlaybackTriggered=[];
     const old=HTMLMediaElement.prototype.play;
     HTMLMediaElement.prototype.play=function(){
       window.hcPlaybackTriggered.push({id:this.id||this.tagName,src:this.currentSrc||this.src||'',stack:new Error('media.play() trace').stack});return Promise.reject(new DOMException('Browser test: intentional audio block','NotAllowedError'));
     };
     window.hcOriginalPlay=old;
   });
   await page.evaluate(()=>window.show('hcListening'));
   await page.locator('#hclTabs button[data-category="hindu"]').evaluate(b=>b.click());
   await page.waitForSelector('#hclResults [data-record="gita"]',{timeout:8000});
   await page.locator('#hclResults [data-record="gita"]').evaluate(b=>b.click());
   await page.waitForFunction(()=>!document.querySelector('#hcGitaOriginalPanel')?.hidden,{timeout:8000});
   assert.equal(await page.locator('#hcGitaOriginalPanel').isVisible(),true,'Gita native controls visible');
   assert.equal(await page.locator('#hcgChapter option').count(),18,'18 chapters preserved');
   const notice=await page.locator('#hclStatus').innerText();
   assert.match(notice,/Gita chapter controls opened/, 'No false playing claim');
   assert.deepEqual(await page.evaluate(()=>window.hcPlaybackTriggered),[],'Opening Gita must not autoplay');
   await page.evaluate(()=>window.show('hcListening'));
   await page.locator('#hclTabs button[data-category="bible"]').evaluate(b=>b.click());
   await page.waitForSelector('#hclResults [data-record="bible-genesis"]',{timeout:8000});
   await page.locator('#hclResults [data-record="bible-genesis"]').evaluate(b=>b.click());
   await page.waitForSelector('#home.active',{timeout:8000});
   await page.waitForFunction(()=>document.activeElement?.id==='hcGenPlay',{timeout:8000});
   assert.equal(await page.locator('#hcGenesisCard').count(),1,'Use the existing Genesis card');
   assert.deepEqual(await page.evaluate(()=>window.hcPlaybackTriggered),[],'Opening Genesis must not autoplay');
   assert.deepEqual(errors,[],'No first-party JS exceptions');
   console.log('PASS All Listening scripture routes',width);
   await context.close();
  }
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1});
