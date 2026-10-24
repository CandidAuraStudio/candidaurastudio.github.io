/* Mobile regression for the universal native-audio mini-player.
   No external audio is downloaded or played; playback state is simulated. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:8765/human-practice-prototype/';
 try{
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>!!window.hcMiniTransport,{timeout:12000});
  const targets=['hcGenesisAudio','hcQuranMeaningAudio','soundLabAudio','bookAudioEl','fearAudio','adhkarAudio','audio'];
  await page.evaluate(targets=>{
   window.__activeTestTrack='hcGenesisAudio';
   window.__testTracks={};
   for(const id of targets){
    const el=document.getElementById(id);
    if(!el)throw Error('Native audio missing: '+id);
    const data={time:30,duration:240};
    window.__testTracks[id]=data;
    // Setting an MP3 URL is not required for this simulated transport test.
    el.setAttribute('src','./test-audio-transport-only.mp3');
    Object.defineProperty(el,'paused',{configurable:true,get:()=>window.__activeTestTrack!==id});
    Object.defineProperty(el,'currentTime',{configurable:true,get:()=>data.time,set:v=>{data.time=Number(v)}});
    Object.defineProperty(el,'duration',{configurable:true,get:()=>data.duration});
    Object.defineProperty(el,'error',{configurable:true,get:()=>null});
    Object.defineProperty(el,'fastSeek',{configurable:true,value:v=>{data.time=Number(v)}});
   }
   localStorage.setItem('heartclearActiveMedia','genesis');
   renderGlobalMini();
  },targets);
  assert.equal(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),true);
  assert.match(await page.locator('#hcMiniPrev').getAttribute('aria-label'),/Rewind 15 seconds/);
  assert.match(await page.locator('#hcMiniNext').getAttribute('aria-label'),/Fast forward 15 seconds/);
  const input=page.locator('#hcMiniSeekRange');
  for(const id of targets){
   await page.evaluate(id=>{
    window.__activeTestTrack=id;
    const x=window.__testTracks[id];x.time=30;
    renderGlobalMini();
   },id);
   assert.equal(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),true,'Mini hidden: '+id);
   const miniVisible=await page.locator('#hcMiniNext').isVisible();
   if(!miniVisible){const detail=await page.evaluate(()=>{const e=document.getElementById('globalMini'),button=document.getElementById('hcMiniNext');return {screen:document.querySelector('.screen.active')?.id,body:document.body.className,miniClass:e.className,miniDisplay:getComputedStyle(e).display,miniVisibility:getComputedStyle(e).visibility,buttonDisplay:getComputedStyle(button).display,parentRect:e.getBoundingClientRect().toJSON(),buttonRect:button.getBoundingClientRect().toJSON()}});throw Error('Mini next invisible for '+id+': '+JSON.stringify(detail))}
   await page.locator('#hcMiniNext').click();
   assert.equal(await page.evaluate(id=>window.__testTracks[id].time,id),45,'Forward failed: '+id);
   await page.locator('#hcMiniPrev').click();
   assert.equal(await page.evaluate(id=>window.__testTracks[id].time,id),30,'Backward failed: '+id);
   await input.evaluate(el=>{
    el.value='500';
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
   });
   assert.equal(await page.evaluate(id=>window.__testTracks[id].time,id),120,'Scrubber failed: '+id);
  }
  await page.locator('#hcMiniSpeed').click();
  assert.equal(await page.locator('#hcMiniSpeed').innerText(),'1.25×');
  // On Home, the bar remains fixed while the underlying page stays scrollable.
  await page.evaluate(()=>{
   window.__activeTestTrack='hcGenesisAudio';
   renderGlobalMini();window.scrollTo(0,0);
  });
  const bar=await page.locator('#globalMini').boundingBox();
  await page.mouse.move(bar.x+bar.width/2,bar.y+5);
  await page.mouse.wheel(0,675);
  await page.waitForTimeout(150);
  const scroll=await page.evaluate(()=>({y:window.scrollY,visible:document.getElementById('globalMini').classList.contains('show'),bodyClass:document.body.classList.contains('hc-mini-visible')}));
  assert.ok(scroll.y>90,'Page did not scroll under mini-player: '+JSON.stringify(scroll));
  assert.ok(scroll.visible&&scroll.bodyClass,'Mini-player disappeared while scrolling');
  assert.deepEqual(errors,[],'First-party page errors');
  console.log('PASS: all 7 native sources seek ±15 seconds, scrub, speed, and scroll with mini-player visible');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
