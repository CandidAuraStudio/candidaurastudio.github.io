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
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
 await page.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8765/')?route.continue():route.abort());
 await page.addInitScript(()=>{
  localStorage.setItem('heartclearConsentV1','1');
  window.__voice=[];
  window.SpeechRecognition=class{
   constructor(){window.__voice.push(this);}
   start(){this.savedResult=this.onresult;this.onstart?.();}
   abort(){this.aborted=true;}
  };
 });
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.locator('#hcExploreOpen').waitFor();
 await page.screenshot({path:path.join(__dirname,'explore-home.png')});
 await page.locator('#hcExploreOpen').click();
 const dialog=page.locator('#hcExploreDialog');await assert.equal(await dialog.isVisible(),true);
 await page.screenshot({path:path.join(__dirname,'explore-menu.png')});
 await dialog.locator('[data-mode="game"]').click();
 const target=await page.evaluate(()=>window.HCExploreCore.bank.find(x=>x.id==='grandfather'));
 // A larger, honest knowledge bank may reach an evidence-based guess OR explicitly
 // report uncertainty. Both are valid; inventing a match is not.
 let steps=0,gameResolved=false;
 while(steps<26){
  if(await dialog.locator('[data-answer="yes"]').count()){
   const id=await dialog.locator('[data-question]').getAttribute('data-question');
   await dialog.locator('[data-answer="'+(target.tags.includes(id)?'yes':'no')+'"]').click();
   steps++;continue;
  }
  const content=await dialog.textContent();
  if(await dialog.getByRole('button',{name:'That is right',exact:true}).count()){
   if(/your grandfather/i.test(content)){
    await dialog.getByRole('button',{name:'That is right',exact:true}).click();
    assert.match(await dialog.textContent(),/Found it/);
    gameResolved=true;break;
   }
   await dialog.getByRole('button',{name:/That is not it/}).click();
   steps++;continue;
  }
  assert.match(content,/cannot match|cannot distinguish|do not know|not sufficient|still cannot identify/i,
   'The collection must acknowledge insufficient evidence rather than invent a result');
  gameResolved=true;break;
 }
 assert.ok(gameResolved,'Game must either guess from evidence or acknowledge uncertainty within 26 steps');
 // Current Explore routes health check-ins to the independent Health Talk dialog.
 // Verify that handoff without expecting obsolete health-question buttons in Explore.
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="health"]').click();
 const health=page.locator('#hcHealthTalk');
 await health.waitFor({state:'visible',timeout:10000});
 assert.equal(await dialog.evaluate(el=>el.open),false,'Explore closes when handing off to Health Talk');
 assert.ok(await health.locator('#hchtComplaint').isVisible(),'Private free-text entry is available');
 await health.locator('#hchtComplaint').fill('I have had a mild headache for two days');
 await health.locator('button[data-act="continue"]').click();
 assert.ok(await health.locator('[data-property="red"][data-answer="no"]').count(),'Relevant safety check follows user description');
 await health.locator('[data-property="red"][data-answer="no"]').click();
 assert.ok(await health.locator('[data-property="specific"][data-answer="no"]').count(),'Follow-up safety question appears');
 await health.locator('[data-property="specific"][data-answer="no"]').click();
 assert.ok(await health.locator('[data-property="age"]').count(),'Age-appropriate pathway is available');
 await health.locator('button[data-act="close"]').click();
 assert.equal(await health.evaluate(el=>el.open),false,'Health Talk can close');
 await page.locator('#hcExploreOpen').click();
 assert.match(await dialog.textContent(),/Guess my thought/,'Explore can reopen after Health Talk without stale questions');
 assert.doesNotMatch(await dialog.textContent(),/I have had a mild headache/,'Health Talk text is not exposed in Explore');
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
 await page.screenshot({path:path.join(__dirname,'explore-mobile.png')});
 await page.evaluate(()=>{delete window.SpeechRecognition;delete window.webkitSpeechRecognition;});
 await page.locator('#hcExploreOpen').click();await dialog.locator('[data-mode="game"]').click();
 assert.match(await dialog.textContent(),/Voice is unavailable/);
 await dialog.locator('[data-answer="unsure"]').click();
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
 assert.ok(await page.locator('.hc-simple-audio-list').first().isVisible());
 assert.ok(await page.locator('[data-nav="hcReels"]').count());
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload({waitUntil:'domcontentloaded'});
 await page.locator('#hcExploreOpen').click();await dialog.locator('[data-mode="game"]').click();
 assert.match(await dialog.textContent(),/Offline/);
 await dialog.locator('[data-answer="no"]').click();
 await context.setOffline(false);
 assert.deepEqual(errors,[]);
 console.log('PASS: mobile Explore game, safe Health Talk handoff, private closure, unsupported voice, offline reload, no page errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
