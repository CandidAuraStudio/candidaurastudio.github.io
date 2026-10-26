/* HeartClear v178: dedicated persistent-player browser regression.
   Uses a generated, silent local WAV. Never accesses user files or cloud accounts. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block'});
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForSelector('#home.active');
  assert.equal(await page.evaluate(()=>document.querySelectorAll('audio:not([paused])').length>0&&[...document.querySelectorAll('audio')].some(x=>!x.paused)),false,'Silent startup');
  const testAudio=await page.evaluate(async()=>{
   const el=document.getElementById('humanSoundAudio');
   if(!el)throw Error('Human Practice audio missing');
   const rate=8000,seconds=10,samples=rate*seconds;
   const buffer=new ArrayBuffer(44+samples*2),d=new DataView(buffer);
   const ascii=(o,v)=>[...v].forEach((ch,i)=>d.setUint8(o+i,ch.charCodeAt(0)));
   ascii(0,'RIFF');d.setUint32(4,36+samples*2,true);ascii(8,'WAVE');ascii(12,'fmt ');
   d.setUint32(16,16,true);d.setUint16(20,1,true);d.setUint16(22,1,true);
   d.setUint32(24,rate,true);d.setUint32(28,rate*2,true);d.setUint16(32,2,true);
   d.setUint16(34,16,true);ascii(36,'data');d.setUint32(40,samples*2,true);
   const url=URL.createObjectURL(new Blob([buffer],{type:'audio/wav'}));
   el.src=url;el.loop=true;el.load();await el.play();
   show('home');return {paused:el.paused,state:getActiveMediaState()?.key,
       mini:document.getElementById('globalMini')?.classList.contains('show')};
  });
  assert.equal(testAudio.paused,false,'Human Practice sound must continue after Home');
  assert.equal(testAudio.state,'human-sound','Global player owns the Human Practice track');
  assert.equal(testAudio.mini,true,'Mini controller must be visible on Home');
  await page.evaluate(()=>show('practices'));
  assert.equal(await page.evaluate(()=>document.getElementById('humanSoundAudio').paused),false,'Practice navigation cannot stop audio');
  await page.evaluate(()=>show('library'));
  assert.equal(await page.evaluate(()=>document.getElementById('humanSoundAudio').paused),false,'Library navigation cannot stop audio');

  // UNIFIED HEADPHONES QA: bottom headset always opens complete listening,
  // even when audio is playing or a sacred recording was previously open.
  await page.locator('#hcFlowDockListen').click();
  assert.equal(await page.locator('#hcListening.active').count(),1,'Headphones must open All Listening, not active media screen');
  assert.ok(await page.locator('#hclTabs [data-category="islamic"]').count(),'Islamic tab exists');
  await page.locator('#hclTabs [data-category="islamic"]').click();
  assert.ok(await page.locator('#hcListening [data-record="adhkar"]').count(),'Morning Adhkar listed');
  assert.ok(await page.locator('#hcListening [data-record="allahu"]').count(),'Allahu Hu listed');
  await page.locator('#hclTabs [data-category="hindu"]').click();
  assert.ok(await page.locator('#hcListening [data-record="drive-hinduOm"]').count(),'Original OM listed');
  assert.ok(await page.locator('#hcListening [data-record="mantra"]').count(),'Hindu mantra listed');
  await page.locator('#hclTabs [data-category="breathing"]').click();
  assert.ok(await page.locator('#hcListening [data-record="drive-hclBreath0"]').count(),'Uploaded breathwork listed');
  await page.locator('#hclTabs [data-category="books"]').click();
  assert.ok(await page.locator('#hcListening [data-record="book-en"]').count(),'Audiobooks listed');
  assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false,'Browsing must not open Drive popup');
  await page.evaluate(()=>show('sacredDetail'));
  await page.locator('#hcFlowDockListen').click();
  assert.equal(await page.locator('#hcListening.active').count(),1,'Headphones from Islamic/Hindu detail must open unified listening');
  assert.equal(await page.locator('#hclTabs [data-category="all"]').getAttribute('aria-pressed'),'true','Re-entering Listening resets All');
  assert.equal(await page.locator('#hclSearch').inputValue(),'','Re-entering Listening clears search');
  assert.equal(await page.evaluate(()=>document.getElementById('humanSoundAudio').paused),false,'Opening audio library must preserve already-playing media');

  // Regression: changing categories/search must not stick after leaving and returning.
  await page.locator('#hclTabs [data-category="books"]').click();
  await page.locator('#hclSearch').fill('Shadows');
  await page.evaluate(()=>show('home'));
  await page.locator('#hcFlowDockListen').click();
  assert.equal(await page.locator('#hclTabs [data-category="all"]').getAttribute('aria-pressed'),'true','Listening return selects All');
  assert.equal(await page.locator('#hclSearch').inputValue(),'','Listening return clears stale search');
  assert.ok(await page.locator('#hcListening [data-record="guided-wake"]').count(),'All Listening shows meditation again');
  assert.ok(await page.locator('#hcListening [data-record="book-en"]').count(),'All Listening still includes audiobooks');
  assert.equal(await page.locator('#hclStatus').innerText(),'','Old Selected recording status must not look like an active filter');
  assert.equal(await page.evaluate(()=>document.getElementById('humanSoundAudio').paused),false,'Reset does not pause audio');
  console.log('PASS: headphones always show one full Islamic/Hindu/meditation/breathwork/books library without interrupting audio');

  console.log('PASS: Human Practice continues through Home, Practice, Library with visible mini-player');
  await page.evaluate(()=>show('humanSession'));
  await page.locator('#humanSession .hc-minimize-audio').click();
  assert.equal(await page.locator('#home').evaluate(el=>el.classList.contains('active')),true,'Human Practice Minimize navigates to Home');
  assert.equal(await page.evaluate(()=>document.getElementById('humanSoundAudio').paused),false,'Human Practice Minimize does not pause');
  assert.equal(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),true,'Human Practice Minimize leaves mini visible');
  console.log('PASS: explicit Human Practice Minimize keeps audio alive');
  const dock=await page.evaluate(()=>{
   window.openHcDriveMedia(HC_DRIVE_COLLECTIONS[0].key);
   const frame=document.getElementById('hcOtFrame');
   const originalSrc=frame.getAttribute('src');
   show('home');
   return {mounted:frame.getAttribute('src')===originalSrc,collapsed:document.getElementById('hcOneTapDrive').classList.contains('hc-ot-collapsed'),hidden:document.getElementById('hcOneTapDrive').hidden};
  });
  assert.ok(dock.mounted&&!dock.hidden&&dock.collapsed,'Drive preview should remain mounted and minimized');
  await page.locator('#hcOtMinimize').click();
  assert.equal(await page.locator('#hcOneTapDrive').evaluate(x=>x.classList.contains('hc-ot-collapsed')),false,'Expand does not reload Drive');
  await page.locator('#hcOtClose').click();
  console.log('PASS: Drive preview keeps its iframe on page change and supports compact/expanded view');

  // v252: the exact OM buttons use a one-tap native audio dock, not a Drive iframe.
  // A local silent WAV mimics an accessible Drive audio response; live Google Drive
  // streaming still requires an Android/device check.
  const n=8000*6,wav=Buffer.alloc(44+n*2);
  wav.write('RIFF',0);wav.writeUInt32LE(36+n*2,4);wav.write('WAVE',8);
  wav.write('fmt ',12);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);
  wav.writeUInt16LE(1,22);wav.writeUInt32LE(8000,24);
  wav.writeUInt32LE(16000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);
  wav.write('data',36);wav.writeUInt32LE(n*2,40);
  await page.route(url=>url.href.startsWith('https://drive.usercontent.google.com/download?'),route=>route.fulfill({status:200,contentType:'audio/wav',body:wav}));
  await page.evaluate(()=>show('sacred'));
  await page.locator('#hcSacredInstantV149 [data-play="om"]').click();
  await page.waitForFunction(()=>document.getElementById('hcOmMiniV252')?.dataset.mode==='playing',{timeout:10000});
  assert.equal(await page.locator('#hcOmMiniV252').isVisible(),true,'OM waveform mini-player is open');
  assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false,'Original Drive popup must stay closed');
  assert.equal(await page.locator('#hcOmMiniV252 .hcom-wave i').count(),22,'Wave indicator exists');
  await page.locator('#hcomToggle').click();
  assert.equal(await page.locator('#hcOmMiniV252').getAttribute('data-mode'),'paused','Pause works');
  await page.locator('#hcomToggle').click();
  await page.waitForFunction(()=>document.getElementById('hcOmMiniV252')?.dataset.mode==='playing');
  await page.evaluate(()=>show('home'));
  assert.equal(await page.locator('#hcOmMiniV252').isVisible(),true,'OM mini survives Home navigation');
  await page.evaluate(()=>openSacred('hindu'));
  await page.locator('#hcSacredDriveCards .hc-drive-card').first().click();
  assert.equal(await page.locator('#hcOmMiniV252').isVisible(),true,'Hindu OM listing uses same mini');
  assert.equal(await page.locator('#hcOneTapDrive').isVisible(),false,'No duplicate Drive preview');
  await page.locator('#hcomClose').click();
  assert.equal(await page.locator('#hcOmMiniV252').isVisible(),false,'Close stops mini');
  const bansuri=page.locator('#hcHinduBansuriQuick');
  assert.equal(await bansuri.isVisible(),true,'Original Bansuri play card must be visible');
  const measured=await bansuri.evaluate(x=>({width:x.getBoundingClientRect().width,
    statusWidth:x.querySelector('.hc-sacred-quick-status')?.getBoundingClientRect().width||0}));
  assert.ok(measured.width>280&&measured.statusWidth>=55,'Sacred Play text is squeezed: '+JSON.stringify(measured));
  await bansuri.click();
  await page.waitForFunction(()=>soundLabAudio.getAttribute('src')?.includes('HeartClear_Nepal_Bansuri_Learnerktm_CC0.ogg'));
  assert.ok(await page.locator('#hcHinduBansuriQuick').getAttribute('data-inline-audio'),'Bansuri must report play state');
  console.log('PASS: both OM one-tap entrances, mini transport, original Bansuri, Sacred tap targets');

  // Write the stored state at document startup. The old document's real
  // pagehide handler would correctly supersede an artificial value set before reload.
  await page.addInitScript(()=>{
   localStorage.setItem('heartclearReturnStateV1',JSON.stringify({
    at:Date.now(),screen:'player',kind:'meditation',meditationTime:74,
    meditation:{url:'https://example.org/audio.mp3',seconds:600,
      introUrl:'',visualUrl:'',kicker:'Test guided practice',title:'Test practice'}
   }));
  });
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForSelector('#player.active',{timeout:10000});
  const restored=await page.evaluate(()=>({paused:document.getElementById('audio').paused,
    src:document.getElementById('audio').getAttribute('src'),
    notice:document.getElementById('hcReturnNotice').textContent,
    screen:document.querySelector('.screen.active')?.id}));
  assert.equal(restored.screen,'player');
  assert.equal(restored.paused,true,'Refresh restores without unwanted autoplay');
  assert.ok(restored.src.includes('example.org/audio.mp3'));
  assert.match(restored.notice,/Tap Play/);
  console.log('PASS: refresh reopens paused native player ready for one-tap resume');
  const humanPage=await context.newPage();
  humanPage.on('pageerror',e=>errors.push(e.message));
  await humanPage.addInitScript(()=>{
   localStorage.setItem('heartclearReturnStateV1',JSON.stringify({
    at:Date.now(),screen:'humanSession',kind:'human-sound',
    humanKind:'passion',humanIndex:0,humanChoice:'birds',humanTime:3,
    humanRemaining:480
   }));
  });
  await humanPage.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  await humanPage.waitForSelector('#humanSession.active',{timeout:10000});
  assert.equal(await humanPage.locator('#humanSessionTitle').innerText(),'Music Presence');
  assert.equal(await humanPage.locator('#humanSoundChoice').inputValue(),'birds');
  assert.equal(await humanPage.locator('#humanClock').innerText(),'08:00');
  assert.equal(await humanPage.locator('#humanSoundAudio').evaluate(el=>el.paused),true);
  console.log('PASS: Human Practice restore preserves activity, sound choice and remaining time');
  await humanPage.close();
  assert.deepEqual(errors,[],'Unexpected page JavaScript errors');
  console.log('HEARTCLEAR v178 PLAYBACK REGRESSION PASS');
 }finally{await browser.close()}
})().catch(e=>{console.error('PLAYBACK REGRESSION FAILED',e);process.exitCode=1});
