/* HeartClear Infinity Journey: deep reading and swipe/navigation regression.
   Run against a local server with Playwright installed in the project. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!!window.HCInfinityJourney&&!!window.HCInfinityDepth);
  const coverage=await page.evaluate(()=>{
   const topics=window.HCInfinityJourney.topics();
   return topics.map(x=>({id:x.id,en:window.HCInfinityDepth[x.id]?.en?.length,
     ta:window.HCInfinityDepth[x.id]?.ta?.length}));
  });
  assert.equal(coverage.length,13,'All original topics retained');
  assert(coverage.every(x=>x.en===3&&x.ta===3),'Every topic has 3 expanded bilingual sections');
  await page.evaluate(()=>window.HCInfinityJourney.open('heart'));
  await page.waitForSelector('#hcInfinityJourney.active #hciReadingPanel p');
  assert(await page.locator('#hciReadingPanel p').count()>=3,'Opening lesson shows substantial reading');
  assert.equal(await page.locator('#hcInfinityJourney .hci-progress button').count(),3,'All progress dots are tappable');
  const banner=await page.locator('#hcCinemaHero').evaluate(el=>getComputedStyle(el).display);
  assert.equal(banner,'none','Duplicate cinematic banner hidden on Infinity reading');
  await page.locator('#hcInfinityJourney .hci-progress button').nth(2).click();
  await page.waitForTimeout(100);
  assert.equal(await page.evaluate(()=>window.HCInfinityJourney.getState().step),2,'Third dot opens practice');
  assert(await page.locator('#hciReadingPanel p').count()>=3,'Third step has more than a question');
  const top=await page.locator('#hciReadingPanel').evaluate(el=>el.getBoundingClientRect().top);
  assert(top<180&&top>=-10,'After selecting dot, reading panel stays visible, top='+top);
  await page.locator('#hciLang').selectOption('ta');
  assert(await page.locator('#hciReadingPanel p').nth(1).innerText().then(v=>/[\u0B80-\u0BFF]/.test(v)),'Tamil expanded paragraphs show');
  await page.locator('#hcInfinityJourney .hci-progress button').nth(0).click();
  assert.equal(await page.evaluate(()=>window.HCInfinityJourney.getState().step),0,'Can return to first dot');
  assert.deepEqual(errors,[],'No unexpected JavaScript errors');
  console.log('PASS Infinity Journey: 13 bilingual topics, scroll-preserving step changes and deep content');
 }finally{await browser.close()}
})().catch(e=>{console.error('FAIL Infinity Journey',e);process.exitCode=1});
