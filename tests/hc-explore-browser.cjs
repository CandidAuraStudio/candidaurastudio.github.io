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
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
 await page.locator('#hcExploreOpen').click();
 await dialog.locator('[data-mode="health"]').click();
 const healthStart=await dialog.evaluate(el=>({text:el.innerText.slice(0,800),question:el.querySelector('[data-question]')?.getAttribute('data-question'),answers:el.querySelectorAll('[data-answer]').length}));
 console.log('EXPLORE HEALTH START',JSON.stringify(healthStart));
 assert.equal(healthStart.question,'emergency','Health check-in must start with its actual emergency question');
 await dialog.locator('[data-answer="yes"]').click();
 assert.match(await dialog.textContent(),/Get emergency help now/);
 await dialog.getByRole('button',{name:'Start again',exact:true}).click();
 await dialog.locator('[data-answer="no"]').click(); // emergency
 await dialog.locator('[data-answer="no"]').click(); // emergency chest
 await dialog.locator('[data-answer="no"]').click(); // emergency stroke
 await dialog.locator('[data-answer="yes"]').click(); // adult
 await dialog.locator('[data-answer="yes"]').click(); // urinary
 await dialog.locator('[data-answer="yes"]').click(); // retention
 assert.match(await dialog.textContent(),/urgent medical service now/);
 await dialog.getByRole('button',{name:'Start again',exact:true}).click();
 await dialog.getByRole('button',{name:'Speak an answer',exact:true}).click();
 assert.match(await dialog.textContent(),/browser provider/);
 await dialog.getByRole('button',{name:'Enable voice',exact:true}).click();
 await page.evaluate(()=>window.__voice.at(-1).savedResult({results:[[{transcript:'yes'}]]}));
 assert.match(await dialog.textContent(),/Use “Yes”/);
 assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'emergency');
 await dialog.getByRole('button',{name:'Use “Yes”',exact:true}).click();
 assert.match(await dialog.textContent(),/Get emergency help now/);
 await dialog.getByRole('button',{name:'Start again',exact:true}).click();
 await dialog.getByRole('button',{name:'Speak an answer',exact:true}).click();
 await page.evaluate(()=>{window.__late=window.__voice.at(-1).savedResult;});
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
 await page.evaluate(()=>window.__late({results:[[{transcript:'yes'}]]}));
 await page.locator('#hcExploreOpen').click();
 assert.match(await dialog.textContent(),/Guess my thought/);
 assert.doesNotMatch(await dialog.textContent(),/Use “Yes”/);
 await dialog.locator('[data-mode="health"]').click();
 await dialog.getByRole('button',{name:'Speak an answer',exact:true}).click();
 await dialog.getByRole('button',{name:'Enable voice',exact:true}).click();
 await page.evaluate(()=>window.__voice.at(-1).onerror({error:'not-allowed'}));
 assert.match(await dialog.textContent(),/Microphone access was not granted/);
 await dialog.locator('[data-answer="no"]').click();
 assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'emergencyChest');
 await dialog.getByRole('button',{name:'Back',exact:true}).click();
 assert.equal(await dialog.locator('[data-question]').getAttribute('data-question'),'emergency');
 assert.ok(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth),'mobile dialog overflow');
 await page.screenshot({path:path.join(__dirname,'explore-mobile.png')});
 await dialog.getByRole('button',{name:'Close Explore',exact:true}).click();
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
 console.log('PASS: mobile Home integration, grandfather game, health exits, voice confirmation/denial/stale callbacks, back, unsupported voice, offline reload, no page errors');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
