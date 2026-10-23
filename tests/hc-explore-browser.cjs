const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const assert=require('node:assert/strict');
const path=require('node:path');
const base='http://127.0.0.1:8765/human-practice-prototype/';
(async()=>{
 const browser=await chromium.launch({headless:true});
 process.on('unhandledRejection',async error=>{console.error(error);await browser.close();process.exit(1)});
 const deadline=setTimeout(()=>{console.error('Browser checks exceeded 120 seconds');process.exit(1)},120000);
 deadline.unref();
 const context=await browser.newContext({viewport:{width:360,height:800}});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8765/')?route.continue():route.abort());
 await page.addInitScript(()=>{
  localStorage.setItem('heartclearConsentV1','1');
  window.__voice=[];
  window.SpeechRecognition=class{
   constructor(){window.__voice.push(this)}
   start(){this.savedResult=this.onresult;this.onstart?.()}
   abort(){this.aborted=true}
  };
 });
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.locator('#hcExploreOpen').waitFor();
 assert.ok(await page.locator('#hcHealthOpen').count(),'Health must have its own entry');
 await page.locator('#hcExploreOpen').click();
 const dialog=page.locator('#hcExploreDialog');
 assert.ok(await dialog.isVisible());
 assert.equal(await dialog.locator('[data-mode="health"]').count(),0,'Symptom checker must not be game choice');
 await page.screenshot({path:path.join(__dirname,'explore-menu.png')});
 await dialog.locator('[data-mode="game"]').click();
 assert.match(await dialog.textContent(),/25/);
 const target=await page.evaluate(()=>window.HCExploreCore.bank.find(x=>x.id==='grandfather'));
 let questions=0,guesses=0,found=false;
 for(let attempt=0;attempt<75;attempt++){
  if(await dialog.locator('[data-question]').count()){
   const id=await dialog.locator('[data-question]').getAttribute('data-question');
   const answer=target.unknownTags?.includes(id)?'unsure':target.tags.includes(id)?'yes':'no';
   await dialog.locator('[data-answer="'+answer+'"]').click();questions++;
   assert.ok(questions<=25,'Question cap exceeded');
  }else if(await dialog.locator('[data-action="correct"]').count()){
   if((await dialog.textContent()).includes('your grandfather')){
    await dialog.locator('[data-action="correct"]').click();found=true;break;
   }
   await dialog.locator('[data-action="incorrect"]').click();guesses++;
  }else throw Error('Guess became unreachable');
 }
 assert.ok(found,'Grandfather was not identified');
 assert.match(await dialog.textContent(),/Found it/);
 assert.ok(await dialog.locator('[data-action="route"]').count(),'Confirmed family result should offer a route');
 await dialog.locator('[data-action="close"]').click();
 // Health is a separate, labelled symptom organiser.
 await page.locator('#hcHealthOpen').evaluate(el=>el.click());
 const health=page.locator('#hcHealthTalk');
 assert.ok(await health.isVisible());
 assert.match(await health.textContent(),/no diagnosis is guessed|not a validated triage/i);
 await health.locator('#hchtComplaint').fill('My eye is red and painful');
 await health.locator('[data-act="continue"]').click();
 assert.ok(await health.locator('[data-property="red"]').count());
 await health.locator('[data-property="red"][data-answer="yes"]').click();
 assert.match(await health.textContent(),/Who can help/);
 await health.locator('[data-act="close"]').click();
 assert.ok(!(await health.isVisible()));
 // Speech requires consent, confirmation and a fresh, live question.
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="game"]').click();
 await dialog.getByRole('button',{name:'Speak an answer',exact:true}).click();
 assert.match(await dialog.textContent(),/browser provider/);
 await dialog.locator('[data-action="enable"]').click();
 await page.evaluate(()=>window.__voice.at(-1).savedResult({results:[[{transcript:'yes'}]]}));
 assert.match(await dialog.textContent(),/Use “Yes”/);
 await dialog.locator('[data-action="confirmVoice"]').click();
 assert.ok(await dialog.locator('[data-question]').count());
 await dialog.locator('[data-action="close"]').click();
 // A game subject and its answers can be taught only with an explicit save.
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="game"]').click();
 await page.evaluate(()=>window.HCExploreCore.teachLocal('Kothu roti','food',[{id:'food',answer:'yes'}]));
 assert.ok(await page.evaluate(()=>localStorage.getItem('hcExploreTaughtV1')?.includes('Kothu roti')));
 await dialog.locator('[data-action="menu"]').click();
 await dialog.locator('[data-mode="game"]').click();
 await dialog.locator('[data-action="forgetTeach"]').click();
 assert.equal(await page.evaluate(()=>localStorage.getItem('hcExploreTaughtV1')),null);
 await dialog.locator('[data-action="close"]').click();
 await page.evaluate(()=>{delete window.SpeechRecognition;delete window.webkitSpeechRecognition});
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="game"]').click();
 assert.match(await dialog.textContent(),/Voice is unavailable/);
 await dialog.locator('[data-action="close"]').click();
 await page.evaluate(async()=>{await navigator.serviceWorker.ready});
 await page.waitForFunction(()=>navigator.serviceWorker.controller);
 const offlineFile='./media/cc0-nature/fire_original.mp3';
 const cached=await page.evaluate(async url=>{
  await saveOfflineUrl(url);
  return await cacheHas(url);
 },offlineFile);
 assert.ok(cached,'The sample audio must be cached before offline playback');
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 const offlineSeek=await page.evaluate(async url=>{
  const response=await fetch(url,{headers:{Range:'bytes=100-999'}});
  return {status:response.status,range:response.headers.get('Content-Range'),
   length:(await response.arrayBuffer()).byteLength};
 },offlineFile);
 assert.equal(offlineSeek.status,206,'Offline audio seeks must return HTTP 206');
 assert.equal(offlineSeek.length,900,'Seek response must contain only the requested bytes');
 assert.match(offlineSeek.range||'',/^bytes 100-999\/\d+$/,'Byte-range header must be exact');
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="game"]').click();
 assert.match(await dialog.textContent(),/Offline/);
 await dialog.locator('[data-answer="no"]').click();
 assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth),'Mobile dialog overflow');
 await page.screenshot({path:path.join(__dirname,'explore-mobile.png')});
 await context.setOffline(false);
 assert.deepEqual(errors,[]);
 console.log('PASS: 25-question scoring, route offer, separate Health, voice, local teaching, offline HTTP 206 Range, reload and mobile width');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
