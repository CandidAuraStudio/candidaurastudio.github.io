const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const width of [393,1280]){
  const page=await browser.newPage({viewport:{width,height:850},serviceWorkers:'block'});
  page.setDefaultTimeout(4500);
  const errors=[];
  page.on('pageerror',e=>{errors.push(e.stack||e.message);console.error('PAGE ERROR',e.stack||e.message)});
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8765/')?r.continue():r.abort());
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  await page.locator('#home.active').waitFor();
  const screens=await page.locator('.screen[id]').evaluateAll(nodes=>nodes.map(n=>n.id));
  assert.ok(screens.length>=35,'Expected all app screens to be registered');
  for(const id of screens.filter(id=>id!=='hcReels')){
   console.log('CHECK ROUTE',width,id);
   const status=await page.evaluate(id=>{try{show(id);return document.getElementById(id).classList.contains('active')}catch(e){return String(e)}},id);
   assert.equal(status,true,'Screen failed: '+id+'; '+status);
  }
  await page.evaluate(()=>show('home'));
  // v243: content must remain readable, not squeezed by global full-width
  // select/input styles. Test in both mobile and desktop browsers.
  console.log('CHECK HOME CONTENT WIDTH',width);
  const homeContent=await page.evaluate(()=>{
    const dom=id=>document.getElementById(id);
    const box=el=>el?.getBoundingClientRect();
    const listen=document.querySelector('#home .hc-simple-start');
    const bar=dom('hcHinduHome'),label=bar?.querySelector('.hc-hindu-info b');
    const choose=bar?.querySelector('select');
    const tracks=[...document.querySelectorAll('#home .hc-simple-audio-list>button')];
    return {
      greetingVisible:!!box(dom('timeGreeting'))?.width,
      originalListenVisible:!!box(listen)?.width,
      hinduBarWidth:box(bar)?.width||0,
      hinduTextWidth:box(label)?.width||0,
      hinduTextHeight:box(label)?.height||0,
      selectWidth:box(choose)?.width||0,
      trackHeights:tracks.map(x=>box(x).height),
      barRight:box(bar)?.right||0,
      listenRight:box(listen)?.right||0,
      viewport:document.documentElement.clientWidth
    };
  });
  assert.equal(homeContent.greetingVisible,true,'Local-time Home greeting is hidden');
  assert.equal(homeContent.originalListenVisible,true,'Original listening section missing');
  assert.ok(homeContent.hinduBarWidth>200,'Gita panel squeezed: '+JSON.stringify(homeContent));
  assert.ok(homeContent.hinduTextWidth>150&&homeContent.hinduTextHeight<85,'Gita text collapsed vertically: '+JSON.stringify(homeContent));
  assert.ok(homeContent.selectWidth>100,'Gita language picker squeezed: '+JSON.stringify(homeContent));
  assert.ok(homeContent.trackHeights.length>=3&&homeContent.trackHeights.every(h=>h<125),'Audio cards grew too tall: '+JSON.stringify(homeContent));
  assert.ok(homeContent.barRight<=homeContent.viewport+3&&homeContent.listenRight<=homeContent.viewport+3,'Home exceeds viewport: '+JSON.stringify(homeContent));
  console.log('CHECK SHARED ENGLISH / TAMIL',width);
  assert.equal(await page.locator('#hcBubbleClassic').count(),0,'Big view must be removed');
  assert.equal(await page.locator('#hcAppLanguageHome [data-hc-app-lang]').count(),2,'Both language buttons must be visible');
  assert.equal(await page.evaluate(()=>document.documentElement.lang),'en','First launch must default to English');
  assert.equal(await page.locator('#home .hc-simple-start h2').innerText(),'One tap. Just listen.');
  await page.locator('#hcAppLanguageHome [data-hc-app-lang="ta"]').click();
  await page.waitForFunction(()=>document.documentElement.lang==='ta'&&document.querySelector('#home .hc-simple-start h2')?.textContent==='ஒரு தொடுதல். கேட்டுப் பாருங்கள்.');
  assert.match(await page.locator('#timeGreeting').innerText(),/காலை|மதிய|மாலை|இனிய இரவு/,'Greeting must translate to Tamil');
  assert.equal(await page.locator('#hcAppLanguageHome [data-hc-app-lang="ta"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.evaluate(()=>HCKitchenLanguage.get()),'ta','Kitchen language must follow application');
  await page.reload({waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.documentElement.lang==='ta'&&document.querySelector('#home .hc-simple-start h2')?.textContent==='ஒரு தொடுதல். கேட்டுப் பாருங்கள்.');
  assert.equal(await page.locator('#hcAppLanguageHome [data-hc-app-lang="ta"]').getAttribute('aria-pressed'),'true','Tamil persists after refresh');
  await page.locator('#hcAppLanguageHome [data-hc-app-lang="en"]').click();
  await page.waitForFunction(()=>document.documentElement.lang==='en'&&document.querySelector('#home .hc-simple-start h2')?.textContent==='One tap. Just listen.');
  assert.match(await page.locator('#timeGreeting').innerText(),/^Good (morning|afternoon|evening|night)$/);
  assert.equal(await page.evaluate(()=>HCKitchenLanguage.get()),'en','Kitchen must follow English switch');
  await page.evaluate(()=>show('settings'));
  assert.equal(await page.locator('#hcAppLanguageSettings [data-hc-app-lang]').count(),2,'Language toggle must also exist in Settings');
  await page.evaluate(()=>show('home'));
  console.log('CHECK SEARCH',width);
  await page.locator('#hcFlowDockSearch').click();
  await page.locator('#hcBubbleSearchInput').fill('burger');
  assert.ok(await page.locator('#hcBubbleResults button').count(),'Search returned nothing');
  await page.locator('#hcBubbleSearchClose').click();
  await page.evaluate(()=>show('practices'));
  assert.ok(await page.locator('#practices .practice-card').count()>6,'Meditation entries missing');
  await page.locator('#practices [data-session="wake"]').first().click();
  await page.locator('#player.active').waitFor();
  await page.locator('#hcGuidedNext').click();
  assert.match(await page.locator('#sessionKicker').innerText(),/Noon Reset/i);
  await page.locator('#hcGuidedSettings').click();
  assert.equal(await page.locator('#optionsPanel').evaluate(x=>x.classList.contains('open')),true);
  console.log('CHECK SUBTABS',width);
  await page.evaluate(()=>show('practices'));
  const filters=page.locator('#practices [data-practice-filter]');
  const filterCount=await filters.count();
  assert.ok(filterCount>=5,'Meditation category tabs missing');
  for(let i=0;i<filterCount;i++){
   await filters.nth(i).click();
   assert.equal(await filters.nth(i).getAttribute('aria-pressed'),'true','Filter failed '+i);
  }
  await filters.first().click();
  await page.evaluate(()=>show('home'));
  await page.locator('#hcCinemaExplore').click();
  await page.locator('#hcFlowExplore:not([hidden])').waitFor();
  const oldChoice=await page.locator('#hcFlowExploreTitle').innerText();
  await page.locator('#hcFlowExploreNext').click();
  assert.notEqual(await page.locator('#hcFlowExploreTitle').innerText(),oldChoice,'Explore next failed');
  await page.locator('#hcFlowExploreClose').click();
  await page.evaluate(()=>show('settings'));
  const profile=page.locator('#hcLocalProfileCard');
  assert.ok(await profile.count(),'Local profile Settings tab missing');
  await profile.locator('summary').click();
  assert.equal(await profile.evaluate(x=>x.open),true,'Settings profile did not expand');
  await profile.locator('summary').click();
  assert.equal(await profile.evaluate(x=>x.open),false,'Settings profile did not collapse');
  assert.deepEqual(errors,[],width+' JavaScript exceptions');
  console.log('PASS',width,'screens',screens.length,'meditation, player, search, no exceptions');
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error('SITEWIDE AUDIT FAILURE',e.stack||e);process.exit(1)});
