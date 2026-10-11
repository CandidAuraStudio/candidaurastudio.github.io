// Browser behavior tests use deterministic local audio/video fixtures, never replace production assets.
// Run: HEARTCLEAR_BROWSER=/path/to/chrome node tests/heartclear-playback.cjs
const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'heartclear-test-'));
execFileSync('ffmpeg',['-v','error','-f','lavfi','-i','color=c=0x07131d:s=160x90:r=10','-t','20','-c:v','libvpx-vp9','-an',path.join(temp,'visual.webm')]);
const audioFixture=fs.readFileSync(path.join(root,'human-practice-prototype/media/HeartClear_DeepSleep_Stillness_2min_PREVIEW.mp3'));
const videoFixture=fs.readFileSync(path.join(temp,'visual.webm'));
function sendMedia(req,res,data,type){
 const match=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
 const start=match?Number(match[1]):0,end=match&&match[2]?Math.min(Number(match[2]),data.length-1):data.length-1;
 if(start> end){res.writeHead(416,{'Content-Range':`bytes */${data.length}`});res.end();return;}
 const headers={'Content-Type':type,'Content-Length':end-start+1,'Accept-Ranges':'bytes','Access-Control-Allow-Origin':'*'};
 if(match)headers['Content-Range']=`bytes ${start}-${end}/${data.length}`;
 res.writeHead(match?206:200,headers);res.end(data.subarray(start,end+1));
}
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/__fixture.mp3')return sendMedia(req,res,audioFixture,'audio/mpeg');
 if(url.pathname==='/__fixture.webm')return sendMedia(req,res,videoFixture,'video/webm');
 let file=path.join(root,decodeURIComponent(url.pathname));
 if(url.pathname.endsWith('/'))file=path.join(file,'index.html');
 try{const data=fs.readFileSync(file);sendMedia(req,res,data,file.endsWith('.html')?'text/html':file.endsWith('.js')?'text/javascript':file.endsWith('.webmanifest')?'application/manifest+json':file.endsWith('.svg')?'image/svg+xml':'application/octet-stream');}catch(e){res.writeHead(404);res.end();}
});
let browser,origin,failures=0,passes=0;
async function newPage({volume,live=false,ios=false}={}){
 const context=await browser.newContext({...(live&&process.env.HEARTCLEAR_LIVE_WITH_SW!=='1'?{serviceWorkers:'block'}:{}),viewport:{width:390,height:844},ignoreHTTPSErrors:true,...(ios?{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'}:{})});
 await context.addInitScript(v=>{sessionStorage.setItem('heartclearInstallSeen','1');if(v!==undefined)localStorage.setItem('sufiVolume',String(v))},volume);
 if(!live)await context.route(/https:\/\/(?:d2ol7oe51mr4n9.cloudfront.net|bigsoundbank.com)\//,async route=>{
  const video=/\.mp4(?:\?|$)/.test(route.request().url());
  const data=video?videoFixture:audioFixture;
  const match=/bytes=(\d+)-(\d*)/.exec(route.request().headers().range||'');
  const start=match?Number(match[1]):0,end=match&&match[2]?Math.min(Number(match[2]),data.length-1):data.length-1;
  const headers={'Access-Control-Allow-Origin':'*','Accept-Ranges':'bytes'};
  if(match)headers['Content-Range']=`bytes ${start}-${end}/${data.length}`;
  await route.fulfill({status:match?206:200,contentType:video?'video/webm':'audio/mpeg',body:data.subarray(start,end+1),headers});
 });
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));if(live){page.on('requestfailed',r=>console.log('LIVE request failure',r.url().slice(-45),r.failure().errorText));page.on('response',r=>{if(r.url().endsWith('.mp3'))console.log('LIVE response',r.status(),r.url().slice(-45),r.headers()['content-type'],r.headers()['content-range'])})}
 await page.goto(origin+'/human-practice-prototype/');
 await page.evaluate(()=>dismissInstallSheet());
 await page.locator('#installSheet').evaluate(el=>el.classList.remove('show')).catch(()=>{});
 return {page,context,errors};
}
async function test(name,fn){if(process.env.HEARTCLEAR_TEST_FILTER&&!name.includes(process.env.HEARTCLEAR_TEST_FILTER))return;try{await fn();passes++;console.log('PASS',name)}catch(e){failures++;console.log('FAIL',name,':',e.message)}}
async function waitAudio(page,id='audio'){await page.waitForFunction(id=>document.getElementById(id).readyState>=2,id,{timeout:30000}).catch(async()=>{throw new Error(JSON.stringify(await page.evaluate(id=>{const e=document.getElementById(id);return {id,ready:e.readyState,network:e.networkState,error:e.error?.message,src:e.currentSrc}},id)))})}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));origin='http://127.0.0.1:'+server.address().port;
 const engine=process.env.HEARTCLEAR_ENGINE==='webkit'?webkit:chromium;
 browser=await engine.launch({executablePath:process.env.HEARTCLEAR_BROWSER,...(engine===chromium?{args:['--no-sandbox','--ignore-certificate-errors']}:{}),proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined});
 await test('saved zero volume is visible and can be restored',async()=>{
  const {page,context}=await newPage({volume:0});try{
   await page.evaluate(()=>{startSettleQuick();show('player')});await waitAudio(page);
   const visible=await page.locator('#practiceSoundNotice').isVisible();assert.equal(visible,true,'zero volume has no visible recovery');
   await page.locator('#restorePracticeSoundBtn').click();assert.equal(await page.evaluate(()=>audio.volume),.85);assert.equal(await page.evaluate(()=>audio.muted),false);
   assert.equal(await page.locator('#practiceSoundNotice').isVisible(),false);
  }finally{await context.close()}
 });
 await test('new meditation restores chosen volume after an ambience fade',async()=>{
  const {page,context}=await newPage({volume:.65});try{
   await page.evaluate(()=>{audio.volume=.001;startSettleQuick()});
   assert.equal(await page.evaluate(()=>audio.volume),.65,'faded volume leaked into meditation');
  }finally{await context.close()}
 });

 await test('changing volume during the closing fade preserves the selected preference',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();show('player')});await waitAudio(page);
   await page.evaluate(()=>audio.currentTime=117);await page.waitForFunction(()=>!audio.seeking&&audio.currentTime>116);
   await page.evaluate(()=>{playbackPhase='nature';natureAfterSeconds=120;natureCycleCount=0;natureLastPosition=117;volume.value='.6';volume.dispatchEvent(new Event('input'))});
   assert.equal(await page.evaluate(()=>Number(localStorage.getItem('sufiVolume'))),.6,'fade attenuation was saved instead of chosen volume');
  }finally{await context.close()}
 });
 await test('blocked intro has a working explicit Play button',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();const el=document.getElementById('introVideo');el.play=()=>Promise.reject(new DOMException('User gesture required','NotAllowedError'));startIntro()});
   await page.waitForTimeout(100);
   assert.equal(await page.locator('#introPlayBtn').isVisible(),true,'intro retry action missing');
   await page.evaluate(()=>{delete document.getElementById('introVideo').play;resumeIntroAfterScroll()});
   await page.waitForFunction(()=>!document.getElementById('introVideo').paused);
   assert.equal(await page.locator('#introPlayBtn').isVisible(),false,'successful intro recovery must dismiss the retry button');
   await page.evaluate(()=>{const el=document.getElementById('introVideo');el.play=()=>Promise.reject(new DOMException('User gesture required','NotAllowedError'));startIntro()});
   await page.waitForTimeout(100);await page.evaluate(()=>delete document.getElementById('introVideo').play);
   await page.locator('#introPlayBtn').click();
   await page.waitForFunction(()=>!document.getElementById('introVideo').paused,{timeout:5000});
  }finally{await context.close()}
 });

 await test('denied guided autoplay remains recoverable from the player Play button',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();audio.play=()=>Promise.reject(new DOMException('User gesture required','NotAllowedError'))});
   await page.evaluate(()=>finishIntro());assert.match(await page.locator('#playerNote').textContent(),/Tap Play/);
   await page.evaluate(()=>delete audio.play);await waitAudio(page);await page.locator('#playBtn').click();
   await page.waitForFunction(()=>audio.currentTime>.1&&!audio.paused);assert.equal(await page.locator('#playerNote').textContent(),'Playing');
  }finally{await context.close()}
 });
 await test('PiP remains moving when the page is hidden',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();show('player')});await waitAudio(page);await page.locator('#playBtn').click();
   await page.waitForFunction(()=>!audio.paused&&!document.getElementById('practiceVisual').paused);
   await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});Object.defineProperty(document,'pictureInPictureElement',{configurable:true,value:document.getElementById('practiceVisual')});sync()});
   assert.equal(await page.evaluate(()=>document.getElementById('practiceVisual').paused),false,'regular timer paused PiP');
   assert.equal(await page.evaluate(()=>audio.paused),false);
   await page.evaluate(()=>{show('home');sync()});assert.equal(await page.evaluate(()=>document.getElementById('practiceVisual').paused),false);
   await page.evaluate(()=>{audio.pause();sync()});assert.equal(await page.evaluate(()=>document.getElementById('practiceVisual').paused),true);
   await page.evaluate(()=>{Object.defineProperty(document,'pictureInPictureElement',{configurable:true,value:null});document.getElementById('practiceVisual').dispatchEvent(new Event('leavepictureinpicture'))});
   assert.equal(await page.evaluate(()=>document.getElementById('practiceVisual').paused),true);
  }finally{await context.close()}
 });
 await test('ordinary hidden video pauses while audio continues',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();show('player')});await waitAudio(page);await page.locator('#playBtn').click();
   await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});sync()});
   assert.equal(await page.evaluate(()=>document.getElementById('practiceVisual').paused),true);assert.equal(await page.evaluate(()=>audio.paused),false);
  }finally{await context.close()}
 });

 await test('all four meditation choices play, seek and keep a mini-player across Home',async()=>{
  const {page,context,errors}=await newPage();try{
   for(const key of ['wake','noon','evening','sleep']){
    await page.evaluate(key=>{const x=offlineMeditationCatalog[key];choosePractice(x.seconds,x.url,x.kicker,x.subtitle,x.intro,x.visual);show('player')},key);
    await waitAudio(page);await page.locator('#playBtn').click();
    await page.waitForFunction(()=>audio.currentTime>.15&&!audio.paused);
    assert.ok(await page.evaluate(()=>!audio.muted&&audio.volume>0));
    await page.evaluate(()=>{jump(10);show('home')});
    await page.waitForFunction(()=>audio.currentTime>9&&!audio.paused,null,{timeout:5000}).catch(async ()=>{
     const state=await page.evaluate(()=>({t:audio.currentTime,paused:audio.paused,seeking:audio.seeking,ready:audio.readyState,error:audio.error?.code,duration:audio.duration,phase:playbackPhase,screen:currentScreenId,note:document.getElementById('playerNote').textContent}));
     throw new Error(JSON.stringify(state));
    });
    assert.equal(await page.locator('#globalMini').isVisible(),true);
    await page.locator('#globalMiniPlay').click();assert.equal(await page.evaluate(()=>audio.paused),true);
   }
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 await test('audiobook chapter switches and reload preserve fractional bookmarks',async()=>{
  const {page,context,errors}=await newPage();try{
   await page.evaluate(()=>openBookAudio('en',1));await waitAudio(page,'bookAudioEl');
   await page.evaluate(()=>{bookAudioEl.currentTime=37.625});await page.waitForFunction(()=>!bookAudioEl.seeking&&bookAudioEl.currentTime>37);await page.evaluate(()=>{syncBookAudio();openBookAudio('en',2)});
   await waitAudio(page,'bookAudioEl');
   assert.equal(await page.evaluate(()=>Number(localStorage.getItem('heartclearBookPos:en:1'))),37.625);
   await page.evaluate(()=>{bookAudioEl.currentTime=7.125});await page.waitForFunction(()=>!bookAudioEl.seeking&&bookAudioEl.currentTime>7);await page.evaluate(()=>{syncBookAudio();openBookAudio('en',1)});
   await page.waitForFunction(()=>!bookRestoringMetadata);
   assert.ok(Math.abs(await page.evaluate(()=>bookAudioEl.currentTime)-37.625)<.002);
   assert.equal(await page.evaluate(()=>Number(localStorage.getItem('heartclearBookPos:en:2'))),7.125);
   await page.reload();await page.evaluate(()=>continueLastBook());await page.waitForFunction(()=>!bookRestoringMetadata);
   assert.ok(Math.abs(await page.evaluate(()=>bookAudioEl.currentTime)-37.625)<.002);
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 await test('Home separates meditation and audiobook continuation',async()=>{
  const {page,context}=await newPage();try{
   await page.evaluate(()=>{startSettleQuick();rememberLastSession(25.375);openBookAudio('en',1)});await waitAudio(page,'bookAudioEl');
   await page.evaluate(()=>bookAudioEl.currentTime=6.75);await page.waitForFunction(()=>!bookAudioEl.seeking&&bookAudioEl.currentTime>6);await page.evaluate(()=>{syncBookAudio();show('home')});
   assert.equal(await page.locator('#homeResumeCard').isVisible(),true);
   assert.equal(await page.locator('#homeLibraryResumeCard').isVisible(),true);
   assert.match(await page.locator('#homeResumeCard').textContent(),/Continue Meditation/);
   assert.match(await page.locator('#homeLibraryResumeCard').textContent(),/Continue Audiobook/);
  }finally{await context.close()}
 });
 await test('Play and Finish controls stay white and Offline is reachable from Home/player',async()=>{
  const {page,context}=await newPage();try{
   for(const id of ['playBtn','finishBtn','bookPlayBtn','adhkarPlayBtn','soundLabPlayBtn','fearPlayBtn','naturePlayBtn']){
    assert.equal(await page.locator('#'+id).evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)',id+' is not white');
   }
   await page.locator('.home-offline-shortcut').click();assert.equal(await page.evaluate(()=>currentScreenId),'downloads');
   await page.evaluate(()=>{startSettleQuick();show('player')});
   assert.equal(await page.locator('#offlinePracticeBtn').isVisible(),true);
   await page.getByRole('button',{name:'Open Offline downloads library',exact:true}).last().click();assert.equal(await page.evaluate(()=>currentScreenId),'downloads');
  }finally{await context.close()}
 });
 await test('offline save, range seek and reopening preserve the preparation flow',async()=>{
  const {page,context,errors}=await newPage();try{
   await page.evaluate(async()=>{await navigator.serviceWorker.ready});
   await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
   await page.evaluate(url=>{offlineMeditationCatalog.wake.url=url;chosenUrl=url;startSettleQuick();chosenUrl=url;preparePlayer();show('player')},origin+'/__fixture.mp3');
   await page.locator('#offlinePracticeBtn').click();await page.waitForFunction(()=>document.getElementById('offlinePracticeBtn').textContent==='Remove download');
   await context.setOffline(true);
   const range=await page.evaluate(async url=>{const r=await fetch(url,{headers:{Range:'bytes=1000-1999'}});return {status:r.status,range:r.headers.get('Content-Range'),size:(await r.arrayBuffer()).byteLength}},origin+'/__fixture.mp3');
   assert.equal(range.status,206);assert.equal(range.size,1000);assert.match(range.range,/bytes 1000-1999/);
   await page.reload();await page.evaluate(url=>{offlineMeditationCatalog.wake.url=url;launchDownloadedMeditation('wake')},origin+'/__fixture.mp3');
   assert.equal(await page.evaluate(()=>currentScreenId),'sessionReady');
   await page.evaluate(()=>show('player'));await waitAudio(page);await page.locator('#playBtn').click();
   await page.waitForFunction(()=>audio.currentTime>.1&&!audio.paused);
   await page.evaluate(()=>jump(10));await page.waitForFunction(()=>audio.currentTime>9.5&&!audio.paused);
   assert.deepEqual(errors,[]);
  }finally{await context.setOffline(false);await context.close()}
 });
 await test('Sacred, Fear, Sound Lab, Human, history and Reduce Motion remain usable',async()=>{
  const {page,context,errors}=await newPage();try{
   for(const id of ['sacred','human','fearPractice','soundLab','history','settings','library']){
    await page.evaluate(id=>show(id),id);assert.equal(await page.locator('#'+id).isVisible(),true);
   }
   await page.evaluate(()=>openSoundTrack('birds'));await waitAudio(page,'soundLabAudio');await page.locator('#soundLabPlayBtn').click();await page.waitForFunction(()=>!soundLabAudio.paused);await page.locator('#soundLabPlayBtn').click();
   await page.evaluate(()=>openFearTrack('ocean'));await waitAudio(page,'fearAudio');await page.locator('#fearPlayBtn').click();await page.waitForFunction(()=>!fearAudio.paused);await page.locator('#fearPlayBtn').click();
   await page.evaluate(()=>openAdhkar('listen'));await waitAudio(page,'adhkarAudio');await page.locator('#adhkarPlayBtn').click();await page.waitForFunction(()=>!adhkarAudio.paused);await page.locator('#adhkarPlayBtn').click();
   await page.evaluate(()=>{startSettleQuick();show('player')});await waitAudio(page);await page.evaluate(()=>{audio.currentTime=31;finish()});
   assert.ok(await page.evaluate(()=>getHistory().some(x=>x.listenedSeconds===31)));
   await page.evaluate(()=>{show('settings');toggleReduceMotion()});assert.equal(await page.evaluate(()=>document.body.classList.contains('reduce-motion')),true);
   await page.reload();assert.equal(await page.evaluate(()=>document.body.classList.contains('reduce-motion')),true);
   assert.ok(await page.evaluate(()=>getHistory().some(x=>x.listenedSeconds===31)));assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });


 await test('install sheet retains Android/browser and iPhone guidance',async()=>{
  for(const ios of [false,true]){
   const {page,context}=await newPage({ios});try{
    await page.evaluate(()=>showInstallSheet(true));assert.equal(await page.locator('#installSheet').isVisible(),true);
    assert.equal(await page.locator('#iosInstallSteps').isVisible(),ios);
    if(ios){await page.locator('#installPrimaryBtn').click();assert.match(await page.locator('#installPrimaryBtn').textContent(),/Add to Home Screen/)}
    await page.evaluate(()=>dismissInstallSheet());assert.equal(await page.locator('#installSheet').isVisible(),false);
   }finally{await context.close()}
  }
 });
 if(process.env.HEARTCLEAR_LIVE==='1')await test('live meditation MP3s decode, play and seek for all four sessions',async()=>{
  const {page,context,errors}=await newPage({live:true});try{
   for(const key of ['wake','noon','evening','sleep']){
    await page.evaluate(key=>{const x=offlineMeditationCatalog[key];choosePractice(x.seconds,x.url,x.kicker,x.subtitle,x.intro,x.visual);show('player')},key);
    console.log('LIVE loading',key);await waitAudio(page);console.log('LIVE metadata',await page.evaluate(()=>({ready:audio.readyState,duration:audio.duration})));await page.locator('#playBtn').click();await page.waitForFunction(()=>audio.currentTime>.25&&!audio.paused,null,{timeout:15000});
    assert.ok(await page.evaluate(()=>!audio.muted&&audio.volume>0));
    await page.evaluate(()=>jump(30));await page.waitForFunction(()=>audio.currentTime>29&&!audio.paused,null,{timeout:15000}).catch(async()=>{throw new Error(JSON.stringify(await page.evaluate(()=>({time:audio.currentTime,seeking:audio.seeking,ready:audio.readyState,paused:audio.paused,error:audio.error?.code,note:document.getElementById('playerNote').textContent}))))});
    console.log('LIVE',key,await page.evaluate(()=>({time:audio.currentTime,duration:audio.duration,volume:audio.volume,decoded:audio.webkitAudioDecodedByteCount||null,error:audio.error?.code||null})));
    await page.locator('#playBtn').click();assert.equal(await page.evaluate(()=>audio.paused),true);
   }
   assert.deepEqual(errors,[]);
  }finally{await context.close()}
 });
 console.log(JSON.stringify({passes,failures}));
 await browser.close();server.close();fs.rmSync(temp,{recursive:true,force:true});process.exitCode=failures?1:0;
})().catch(async e=>{console.error(e);if(browser)await browser.close();server.close();process.exitCode=1});
