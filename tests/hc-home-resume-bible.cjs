const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const deadline=setTimeout(()=>process.exit(1),120000);deadline.unref();
 try{
  const ctx=await browser.newContext({viewport:{width:393,height:852}});
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
  await page.addInitScript(()=>{
   window.__plays=[];
   HTMLMediaElement.prototype.play=function(){window.__plays.push(this.id);return Promise.reject(new DOMException('Blocked for the test','NotAllowedError'));};
   localStorage.setItem('clearWithinLastSession',JSON.stringify({kicker:'Deep Wake Up',title:'Morning · guided breath',seconds:600,time:34,url:'https://example.com/wake.mp3'}));
  });
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  await page.locator('#hcHomeRoutineV155').waitFor();
  assert.equal((await page.locator('#hcrTitle').innerText()).trim(),'Deep Wake Up');
  assert.match(await page.locator('#hcrSubtitle').innerText(),/00:34/);
  assert.equal((await page.locator('#hcrBeginText').innerText()).trim(),'Continue');
  assert.deepEqual(await page.evaluate(()=>window.__plays),[],'page opening must stay silent');
  const current=await page.evaluate(()=>{const h=new Date().getHours();return h>=5&&h<11?'Deep Wake Up':h>=11&&h<17?'Noon Reset':h>=17&&h<21?'Evening Release':'Deep Sleep';});
  if(current!=='Deep Wake Up'){assert.equal(await page.locator('#hcrForNow').isVisible(),true);assert.match(await page.locator('#hcrForNow').innerText(),new RegExp(current));}
  assert.equal(await page.locator('#homeResumeCard').isVisible(),false,'do not duplicate the promoted resume under More');
  assert.equal(await page.locator('#hcrYoga').isVisible(),true);
  await page.locator('#hcrBegin').click();
  assert.ok((await page.evaluate(()=>window.__plays)).includes('audio'),'Continue must request playback in the first click');
  assert.equal(await page.locator('#home').evaluate(el=>el.classList.contains('active')),true,'resume stays on Home');
  await page.locator('#hcHomeRoutineV155 .hcr-extra summary').click();
  assert.equal(await page.locator('[data-time="noon"]').isVisible(),true,'Noon Reset remains available');
  assert.match(await page.locator('#hcGenesisCard .hc-gen-top').innerText(),/BIBLE.*GENESIS/);
  assert.equal(await page.locator('#hcGenSelect option').count(),50);
  assert.equal(await page.locator('#hcGenSelect').inputValue(),'37','a fresh Bible user starts with Joseph');
  await page.getByRole('button',{name:'Bible · Genesis ›',exact:true}).click();
  assert.equal(await page.locator('#hcGenesisCard').isVisible(),true);
  assert.equal(await page.locator('#hcGenRead').isVisible(),true);
  await page.locator('#hcGenRead').click();
  await page.locator('[data-genlang="ta"]').click();
  assert.match(await page.locator('#hcGenReadNote').innerText(),/நேரடி பைபிள் வசன மொழிபெயர்ப்பு அல்ல/);
  await page.screenshot({path:path.join(__dirname,'home-resume-bible.png')});
  const plain=await ctx.newPage();
  await plain.addInitScript(()=>{localStorage.removeItem('clearWithinLastSession');});
  await plain.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  assert.equal((await plain.locator('#hcrTitle').innerText()).trim(),current);
  assert.equal(await plain.locator('#hcrForNow').isVisible(),false);
  await plain.evaluate(()=>localStorage.setItem('clearWithinLastSession','broken-json'));
  await plain.reload({waitUntil:'domcontentloaded'});
  assert.equal((await plain.locator('#hcrTitle').innerText()).trim(),current);
  assert.deepEqual(errors,[]);
  console.log('PASS: saved meditation promoted, one-tap resume, current-time alternative, no auto-start, Noon/Yoga preserved, corrupt progress, Bible label, Joseph, Tamil attribution');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
