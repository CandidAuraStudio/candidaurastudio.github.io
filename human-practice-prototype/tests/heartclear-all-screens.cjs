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
  for(const id of ['home','practices','library','soundLab','hcQuranStudy','settings']){
   console.log('CHECK ROUTE',width,id);
   const status=await page.evaluate(id=>{try{show(id);return document.getElementById(id).classList.contains('active')}catch(e){return String(e)}},id);
   assert.equal(status,true,'Screen failed: '+id+'; '+status);
  }
  await page.evaluate(()=>show('home'));
  console.log('CHECK SEARCH',width);
  await page.locator('#hcBubbleSearch').click();
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
  await page.locator('#hcBubbleSwitch').click();
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
