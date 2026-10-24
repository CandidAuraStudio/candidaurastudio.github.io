const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const deadline=setTimeout(()=>{console.error('Mind checks exceeded 120 seconds');process.exit(1)},120000);deadline.unref();
 try{
  const context=await browser.newContext({viewport:{width:360,height:800}}),page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
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
  console.log('PASS: sourced public-figure stack, grandfather, Epstein not Jackson, visible evidence/source, reject, confirmed voice, stale mic, mobile layout, cached catalog offline and honest uncertainty');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
