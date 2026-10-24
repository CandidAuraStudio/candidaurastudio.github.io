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
  console.log('PASS: Human Practice continues through Home, Practice, Library with visible mini-player');
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
  await page.evaluate(()=>{
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
  assert.deepEqual(errors,[],'Unexpected page JavaScript errors');
  console.log('HEARTCLEAR v178 PLAYBACK REGRESSION PASS');
 }finally{await browser.close()}
})().catch(e=>{console.error('PLAYBACK REGRESSION FAILED',e);process.exitCode=1});
