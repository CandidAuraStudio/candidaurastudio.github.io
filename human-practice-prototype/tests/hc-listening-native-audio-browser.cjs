/* Headless mobile browser acceptance: import local WAV once, play in existing
 * Sound Lab player, mini survives Home, bookmark and IndexedDB survive reload.
 * Generated silent WAV only; no third-party media, Drive access or uploads. */
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

function silentWav(seconds=12){
 const rate=8000,samples=seconds*rate,bytes=44+samples*2;
 const buffer=Buffer.alloc(bytes);
 buffer.write('RIFF',0);buffer.writeUInt32LE(bytes-8,4);
 buffer.write('WAVE',8);buffer.write('fmt ',12);
 buffer.writeUInt32LE(16,16);buffer.writeUInt16LE(1,20);
 buffer.writeUInt16LE(1,22);buffer.writeUInt32LE(rate,24);
 buffer.writeUInt32LE(rate*2,28);buffer.writeUInt16LE(2,32);
 buffer.writeUInt16LE(16,34);buffer.write('data',36);
 buffer.writeUInt32LE(samples*2,40);
 return buffer;
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  for(const width of [393,1280]){
   const context=await browser.newContext({
    viewport:{width,height:860},serviceWorkers:'block',reducedMotion:'reduce'
   });
   const page=await context.newPage();
   page.setDefaultTimeout(15000);
   await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded',timeout:35000});
   await page.waitForSelector('#hcListening',{state:'attached'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio&&!window.hcLocalListeningAudio.isLoading());
   await page.evaluate(()=>show('hcListening'));
   await page.locator('#hclTabs button[data-category="islamic"]').click();
   const row=page.locator('#hclResults [data-record="local-islamSufiDrum"]');
   await row.waitFor();
   assert.equal(await row.locator('.hcl-record-action').innerText(),'Add MP3/WAV');
   assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false);

   const pickerEvent=page.waitForEvent('filechooser');
   await row.click();
   const picker=await pickerEvent;
   await picker.setFiles({name:'sample.wav',mimeType:'audio/wav',buffer:silentWav()});
   await page.waitForFunction(()=>window.hcLocalListeningAudio.has('islamSufiDrum'));
   await page.waitForFunction(()=>document.querySelector('#hclResults [data-record="local-islamSufiDrum"] .hcl-record-action')?.textContent==='Pause');
   const first=await page.evaluate(()=>{
     const a=document.getElementById('soundLabAudio');
     return {source:a.getAttribute('src'),playing:!a.paused,active:getActiveMediaState()?.key};
   });
   assert.match(first.source,/^blob:/);
   assert.equal(first.playing,true);
   assert.equal(first.active,'soundlab');
   assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false,'No Drive iframe popup when importing audio');
   await page.evaluate(()=>show('home'));
   assert.equal(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),true,'Existing mini player must stay visible on Home');

   await page.evaluate(()=>{
     const a=document.getElementById('soundLabAudio');
     a.currentTime=6;
     a.dispatchEvent(new Event('timeupdate'));
     a.pause();
   });
   await page.waitForFunction(()=>Number(localStorage.getItem('heartclearLocalListeningPositionV1:islamSufiDrum'))>=5);
   await page.waitForFunction(async()=>{
     const db=await new Promise((resolve,reject)=>{
       const req=indexedDB.open('heartclear-local-listening-audio-v1');
       req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
     });
     return await new Promise(resolve=>{
       const req=db.transaction('audio','readonly').objectStore('audio').get('islamSufiDrum');
       req.onsuccess=()=>{const ok=req.result?.blob instanceof Blob;db.close();resolve(ok)};
       req.onerror=()=>{db.close();resolve(false)};
     });
   });
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio&&!window.hcLocalListeningAudio.isLoading()&&window.hcLocalListeningAudio.has('islamSufiDrum'));
   await page.evaluate(()=>show('hcListening'));
   await page.locator('#hclTabs button[data-category="islamic"]').click();
   const ready=page.locator('#hclResults [data-record="local-islamSufiDrum"]');
   assert.equal(await ready.locator('.hcl-record-action').innerText(),'Play','Saved file must be ready after reload');
   await ready.click();
   await page.waitForFunction(()=>document.getElementById('soundLabAudio')?.currentTime>=5);
   assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false,'Reloaded private audio must not open Drive');
   console.log('PASS native Listening MP3/WAV import, Play, mini, saved resume at viewport '+width);
   await context.close();
  }
 }finally{await browser.close()}
})().catch(err=>{console.error(err);process.exitCode=1;});
