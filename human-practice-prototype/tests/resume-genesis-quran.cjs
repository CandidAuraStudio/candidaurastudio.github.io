/* HeartClear Android/PWA cold-reload resume regression: no outside audio playback. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const BASE='http://127.0.0.1:8765/human-practice-prototype/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const test=async(kind,snapshot,expected)=>{
  const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  // The external audio/verse servers must not affect an offline-safe resume test.
  await page.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8765/')?route.continue():route.abort());
  await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:30000});
  const keys=kind==='genesis'?['hcGenesisRestorePaused','hcGenesisPlaybackSnapshot']:['hcQuranMeaningRestorePaused','hcQuranMeaningPlaybackSnapshot'];
  await page.waitForFunction(([restore,get])=>typeof window[restore]==='function'&&typeof window[get]==='function',keys);
  const before=await page.evaluate(({keys,snapshot})=>{
   const success=window[keys[0]](snapshot);
   const id=keys[0].includes('Genesis')?'hcGenesisAudio':'hcQuranMeaningAudio';
   const el=document.getElementById(id);
   Object.defineProperty(el,'paused',{configurable:true,get:()=>false});
   Object.defineProperty(el,'currentTime',{configurable:true,get:()=>snapshot.seconds});
   hcCaptureReturnState(true);
   const stored=JSON.parse(localStorage.getItem('heartclearReturnStateV1')||'null');
   return {success,stored,snapshot:window[keys[1]]()};
  },{keys,snapshot});
  assert.equal(before.success,true,kind+' initial setup');
  assert.equal(before.stored.kind,kind,kind+' state kind');
  assert.equal(before.stored.screen,'home',kind+' should restore on Home');
  assert.equal(before.snapshot.seconds,snapshot.seconds,kind+' listening position');
  await page.reload({waitUntil:'domcontentloaded'});
  const after=await page.evaluate(kind=>{
   const el=document.getElementById(kind==='genesis'?'hcGenesisAudio':'hcQuranMeaningAudio');
   return {
    src:el.getAttribute('src'),paused:el.paused,chapter:document.getElementById('hcGenChapter')?.textContent,
    surah:document.getElementById('hcqName')?.textContent,
    verse:document.getElementById('hcqVerseNumber')?.textContent,
    cardAction:document.getElementById(kind==='genesis'?'hcGenPlayLabel':'hcqAction')?.textContent,
    home:document.getElementById('home')?.classList.contains('active'),
    mini:document.getElementById('globalMini')?.classList.contains('show')
   };
  },kind);
  assert.equal(after.paused,true,kind+' must never autoplay on reload');
  assert.equal(after.home,true,'Home should remain available');
  assert.ok(after.mini,kind+' resumed track should have a mini-player');
  assert.match(after.src||'',expected.src);
  assert.match(after.cardAction||'',/Resume/i);
  if(kind==='genesis')assert.equal(after.chapter,'37 / 50');
  else assert.match(after.verse||'',/Verse 7 \/ 109/);
  assert.deepEqual(errors,[],'JavaScript errors: '+errors.join('; '));
  console.log('PASS: '+kind+' restored exact chapter/verse and paused mini-player');
  await context.close();
 };
 try{
  await test('genesis',{chapter:37,language:'en',seconds:43},{src:/02_GEN_37\.mp3/});
  await test('quran-meaning',{surah:10,language:'ta',verse:7,seconds:15},{src:/010007\.mp3/});
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
