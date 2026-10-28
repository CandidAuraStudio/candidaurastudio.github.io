/* HeartClear cinematic v239 regression: actual mobile/desktop tap targets and all screens. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const BASE='http://127.0.0.1:8765/human-practice-prototype/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  for(const width of [360,393,1280]){
   const page=await browser.newPage({viewport:{width,height:850},isMobile:width<700,hasTouch:width<700,serviceWorkers:'block'});
   page.setDefaultTimeout(6000);
   const errors=[];page.on('pageerror',e=>errors.push(e.stack||e.message));
   await page.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:8765/')?route.continue():route.abort());
   await page.goto(BASE,{waitUntil:'domcontentloaded'});
   await page.locator('#home.active').waitFor();
   assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('hc-cinema')),true,'Shared theme did not initialize');
   assert.equal(await page.locator('#hcFlowDock button').count(),6,'Exactly six universal navigation controls');
   assert.equal(await page.locator('#hcFlowDockHome img').getAttribute('src'),'./icon.svg');
   const nav=['hcFlowDockHome','hcFlowDockListen','hcCinemaExplore','hcCinemaLibrary','hcCinemaReels','hcCinemaSettings'];
   for(const id of nav)assert.equal(await page.locator('#'+id).isVisible(),true,id+' hidden');
   const geometry=await page.locator('#hcFlowDock').evaluate(el=>{
    const r=el.getBoundingClientRect();
    return {left:r.left,right:r.right,bottom:r.bottom,width:r.width};
   });
   assert.ok(geometry.left>=-1 && geometry.right<=width+1,'Floating dock outside viewport '+JSON.stringify(geometry));
   await page.locator('#hcCinemaSettings').click();
   await page.locator('#settings.active').waitFor();
   assert.equal(await page.locator('#hcCinemaTitle').innerText(),'Settings');
   assert.equal(await page.locator('#hcCinemaHero').isVisible(),true,'Settings poster missing');
   await page.locator('#hcLocalProfileCard summary').click();
   assert.equal(await page.locator('#hcLocalProfileCard').evaluate(el=>el.open),true);
   await page.locator('#hcLocalProfileCard summary').click();
   await page.locator('#hcCinemaLibrary').click();
   await page.locator('#library.active').waitFor();
   assert.equal(await page.locator('#hcCinemaTitle').innerText(),'Library');
   await page.locator('#hcCinemaExplore').click();
   assert.equal(await page.locator('#hcFlowExplore').evaluate(el=>el.hidden),false);
   await page.locator('#hcFlowExploreClose').click();
   // Reels now occupies the bottom destination; preserve Search engine separately.
   await page.locator('#hcBubbleSearch').evaluate(button=>button.click());
   await page.locator('#hcBubbleSearchPanel:not([hidden])').waitFor();
   await page.locator('#hcBubbleSearchInput').fill('burger');
   assert.ok(await page.locator('#hcBubbleResults button').count()>0);
   await page.locator('#hcBubbleSearchClose').click();
   await page.locator('#hcFlowDockHome').click();
   await page.locator('#home.active').waitFor();
   assert.equal(await page.locator('#hcFlowDockHome').getAttribute('aria-current'),'page');
   const ids=await page.locator('.screen[id]').evaluateAll(els=>els.map(el=>el.id));
   const defects=[];
   for(const id of ids){
    if(id==='hcReels'||id==='home')continue; // Home already has its full-screen cinematic launcher.
    const got=await page.evaluate(id=>{
     show(id);
     const hero=document.getElementById('hcCinemaHero');
     const box=hero.getBoundingClientRect();
     const screen=document.querySelector('.screen.active');
     return {screen:screen?.id,heroParent:hero.parentElement?.id,hidden:hero.hidden,
       title:document.getElementById('hcCinemaTitle').textContent,
       display:getComputedStyle(hero).display,height:box.height,scene:document.body.dataset.hcCinemaScene,
       ownHeaderHeight:screen?.querySelector('.hci-header')?.getBoundingClientRect().height||0,
       // Explorer and Human Knowledge deliberately replace the shared cinematic
       // masthead with their own compact title. Require visible real content,
       // not merely a hidden poster that could leave an empty screen.
       ownContentHeight:(
         id==='hcExplorer'?screen?.querySelector('#hcxeHeading'):
         id==='hcHeritageReader'?screen?.querySelector('#hcHeritageMain h1'):
         null
       )?.getBoundingClientRect().height||0,
       dockCount:document.querySelectorAll('#hcFlowDock button').length};
    },id);
    // Infinity Journey has its own functional, full-screen navigation header.
    // Explorer and Human Knowledge show their own compact headings instead
    // of duplicated blue mastheads; require meaningful content to be visible.
    const dedicated=id==='hcInfinityJourney';
    const compact=id==='hcExplorer'||id==='hcHeritageReader';
    const posterOk=compact
      ?got.display==='none'&&got.ownContentHeight>=20
      :dedicated?got.ownHeaderHeight>=40:(got.display!=='none'&&got.height>=80);
    if(got.screen!==id||got.heroParent!==id||got.hidden||!got.title||got.dockCount!==6||!posterOk){
     defects.push({id,got});
    }
   }
   assert.deepEqual(defects,[],'Incomplete scene coverage: '+JSON.stringify(defects));
   await page.evaluate(()=>show('practices'));
   await page.locator('#practices [data-session="wake"]').first().click();
   await page.locator('#player.active').waitFor();
   await page.locator('#hcGuidedNext').click();
   assert.match(await page.locator('#sessionKicker').innerText(),/Noon Reset/i);
   await page.locator('#hcGuidedSettings').click();
   assert.equal(await page.locator('#optionsPanel').evaluate(el=>el.classList.contains('open')),true);
   assert.deepEqual(errors,[],'Unexpected JavaScript errors');
   console.log('PASS: cinematic '+width+'px — 6-icon dock, Settings, Explore, Reels, Search engine, '+(ids.length-1)+' screens, playback controls');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error('CINEMATIC SITEWIDE FAIL',e.stack||e);process.exit(1)});
