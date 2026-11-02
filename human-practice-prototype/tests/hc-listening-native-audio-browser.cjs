/* HeartClear v293: real-browser native playback of pre-existing saved audio.
 * Unavailable recordings must not show a false Play button or demand upload.
 * Test uses a silent WAV generated within a disposable test browser only.
 */
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
   const context=await browser.newContext({viewport:{width,height:860},serviceWorkers:'block',reducedMotion:'reduce'});
   const page=await context.newPage();
   page.setDefaultTimeout(15000);
   let filePickers=0;
   page.on('filechooser',()=>filePickers++);
   await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded',timeout:35000});
   await page.waitForSelector('#hcListening',{state:'attached'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio&&!window.hcLocalListeningAudio.isLoading());
   await page.evaluate(()=>show('hcListening'));
   await page.locator('#hclTabs button[data-category="islamic"]').click();
   const id='local-islamSufiDrum';
   assert.equal(await page.locator('#hclResults [data-record="'+id+'"]').count(),0,'Unavailable audio must be hidden');
   assert.equal(await page.locator('#hclResults').getByText('Add audio',{exact:true}).count(),0);
   assert.equal(filePickers,0);

   const bytes=Array.from(silentWav());
   await page.evaluate(async bytes=>{
     const db=await new Promise((resolve,reject)=>{
       const req=indexedDB.open('heartclear-local-listening-audio-v1',1);
       req.onupgradeneeded=()=>req.result.createObjectStore('audio');
       req.onsuccess=()=>resolve(req.result);
       req.onerror=()=>reject(req.error);
     });
     await new Promise((resolve,reject)=>{
       const tx=db.transaction('audio','readwrite');
       tx.objectStore('audio').put({blob:new Blob([new Uint8Array(bytes)],{type:'audio/wav'}),name:'sample.wav'},'islamSufiDrum');
       tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);
     });
     db.close();
   },bytes);

   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio&&!window.hcLocalListeningAudio.isLoading()&&window.hcLocalListeningAudio.has('islamSufiDrum'));
   await page.evaluate(()=>show('hcListening'));
   await page.locator('#hclTabs button[data-category="islamic"]').click();
   const row=page.locator('#hclResults [data-record="'+id+'"]');
   await row.waitFor();
   assert.equal(await row.locator('.hcl-record-action').innerText(),'Play');
   await row.click();
   await page.waitForFunction(()=>!document.getElementById('soundLabAudio')?.paused);
   const state=await page.evaluate(()=>{
     const a=document.getElementById('soundLabAudio');
     return {source:a.getAttribute('src'),playing:!a.paused,active:getActiveMediaState()?.key};
   });
   assert.match(state.source,/^blob:/);
   assert.equal(state.playing,true);
   assert.equal(state.active,'soundlab');
   assert.equal(filePickers,0,'No file picker ever opened');

   await page.evaluate(()=>show('home'));
   assert.equal(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),true);

   await page.evaluate(()=>{
     const a=document.getElementById('soundLabAudio');
     a.currentTime=6;a.dispatchEvent(new Event('timeupdate'));a.pause();
   });
   await page.waitForFunction(()=>Number(localStorage.getItem('heartclearLocalListeningPositionV1:islamSufiDrum'))>=5);
   await page.reload({waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio?.has('islamSufiDrum'));
   await page.evaluate(()=>show('hcListening'));
   await page.locator('#hclTabs button[data-category="islamic"]').click();
   await page.locator('#hclResults [data-record="'+id+'"]').click();
   await page.waitForFunction(()=>document.getElementById('soundLabAudio')?.currentTime>=5);
   assert.equal(filePickers,0);
   console.log('PASS unavailable recordings hidden; saved WAV native Play, mini, bookmark and reload at '+width);
   await context.close();
  }
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1;});
