const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const deadline=setTimeout(()=>{console.error('Mind checks exceeded 120 seconds');process.exit(1)},120000);deadline.unref();
 try{
  const context=await browser.newContext({viewport:{width:360,height:800}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
  // Preserve the original evidence-engine interaction suite, separate from the
  // later broader-207 enhancement. The enhancement has its own assertions below.
  // One interceptor avoids a catch-all rule bypassing the specific route.
  await page.route('**/*',r=>{
    const url=r.request().url();
    if(url.includes('/hc-mind-broader-v207.js'))return r.abort();
    return url.startsWith('http://127.0.0.1:8765/')?r.continue():r.abort();
  });
  await page.addInitScript(()=>{window.__voices=[];window.SpeechRecognition=class{constructor(){window.__voices.push(this)}start(){this.saved=this.onresult}abort(){this.aborted=true}};});
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  assert.equal(await page.evaluate(()=>HCExploreCore.gameVersion),'evidence-1');
  const stats=await page.evaluate(()=>HCExploreCore.gameStats);assert.ok(stats.publicFigures>=100);
  const dialog=page.locator('#hcExploreDialog');
  async function start(){await page.locator('#hcExploreOpen').click();await dialog.locator('[data-mode="game"]').click();}
  async function finishThought(name){
   let count=0;while(await dialog.locator('[data-answer="yes"]').count()){
    const id=await dialog.locator('[data-question]').getAttribute('data-question');
    const value=await page.evaluate(({name,id})=>{const item=HCExploreCore.bank.find(x=>x.name===name);if(!item)throw Error('Missing target '+name);return HCExploreCore.gameTruth(item,id);},{name,id});
    await dialog.locator('[data-answer="'+(value===null?'unsure':value?'yes':'no')+'"]').click();assert.ok(++count<=20);
   }return count;
  }
  await start();await finishThought('your grandfather');assert.match(await dialog.textContent(),/your grandfather/);
  await dialog.locator('[data-action="correct"]').click();assert.match(await dialog.textContent(),/Found it/);
  await dialog.locator('[data-action="close"]').click();
  const epstein=await page.evaluate(()=>HCExploreCore.bank.find(x=>x.name==='Jeffrey Epstein'));
  assert.ok(epstein,'The user’s actual regression target must be in the sourced catalog');
  await start();await finishThought(epstein.name);
  assert.match(await dialog.textContent(),/possible match is Jeffrey Epstein/i);
  assert.doesNotMatch(await dialog.textContent(),/Michael Jackson/);
  await dialog.getByText('Why this guess?',{exact:true}).click();
  assert.equal(await dialog.locator('a[href="'+epstein.source+'"]').isVisible(),true);
  assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth));
  await page.screenshot({path:path.join(__dirname,'mind-evidence-mobile.png')});
  await dialog.locator('[data-action="incorrect"]').click();
  assert.doesNotMatch(await dialog.locator('#hcxTitle').innerText(),/Jeffrey Epstein/);
  await dialog.locator('[data-action="close"]').click();
  await start();await dialog.locator('[data-action="speak"]').click();
  await dialog.locator('[data-action="enable"]').click();
  await page.evaluate(()=>window.__voices.at(-1).saved({results:[[{transcript:'yes'}]]}));
  assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'person');
  await dialog.locator('[data-action="confirmVoice"]').click();
  assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'public');
  await dialog.locator('[data-action="speak"]').click();
  await page.evaluate(()=>window.__late=window.__voices.at(-1).saved);
  await dialog.locator('[data-action="close"]').click();
  await page.evaluate(()=>window.__late({results:[[{transcript:'yes'}]]}));
  await start();assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'person');
  await dialog.locator('[data-action="close"]').click();
  await page.evaluate(async()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>navigator.serviceWorker.controller);
  await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
  assert.equal(await page.evaluate(()=>HCExploreCore.gameStats.publicFigures),stats.publicFigures);
  await start();let unknowns=0;
  while(await dialog.locator('[data-answer="unsure"]').count()){await dialog.locator('[data-answer="unsure"]').click();assert.ok(++unknowns<=20);}
  assert.match(await dialog.locator('#hcxTitle').innerText(),/do not know|another clue/);
  await context.setOffline(false);
  assert.deepEqual(errors,[]);
  // Production uses broader-207; do not mislabel it as the evidence-1 engine.
  // The new stack extends the sourced catalog rather than replacing it.
  const broadContext=await browser.newContext({viewport:{width:360,height:800}});
  const broadPage=await broadContext.newPage();
  const broadErrors=[];
  broadPage.on('pageerror',e=>broadErrors.push(e.message));
  await broadPage.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
  await broadPage.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  const broad=await broadPage.evaluate(()=>{
    const core=window.HCExploreCore;
    const epstein=core.bank.find(x=>x.name==='Jeffrey Epstein');
    const first=core.gameStep([]);
    const afterPublic=core.gameStep([{id:'person',answer:'yes'},{id:'public',answer:'yes'}]);
    const allUnsure=[];let step=first;
    while(step.kind==='question'&&allUnsure.length<core.gameQuestionLimit){
      allUnsure.push({id:step.id,answer:'unsure'});
      step=core.gameStep(allUnsure);
    }
    return {version:core.gameVersion,limit:core.gameQuestionLimit,publicFigures:core.gameStats?.publicFigures,
      epsteinSource:epstein?.source,first:first.id,publicStepKind:afterPublic.kind,
      unknownKind:step.kind,answers:allUnsure.length};
  });
  assert.equal(broad.version,'broader-207');
  assert.equal(broad.limit,24);
  assert.ok(broad.publicFigures>=100);
  assert.match(broad.epsteinSource,/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/);
  assert.equal(broad.first,'person');
  assert.equal(broad.publicStepKind,'question');
  assert.ok(['unknown','ambiguous'].includes(broad.unknownKind));
  assert.ok(broad.answers<=broad.limit);
  assert.deepEqual(broadErrors,[]);
  await broadContext.close();
  console.log('PASS: evidence-1 sourced inference, mobile, voice, offline and honest uncertainty; production broader-207 catalog, question cap and source-backed public figures');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
