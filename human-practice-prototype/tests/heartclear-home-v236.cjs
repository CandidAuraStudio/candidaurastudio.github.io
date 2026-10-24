/* Run with a local HTTP server on port 8765: node human-practice-prototype/tests/heartclear-home-v236.cjs */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:393,height:852},serviceWorkers:'block',hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
   await page.goto(process.env.HEARTCLEAR_QA_URL||'http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
   await page.locator('#hcBubbleCard').waitFor();
   assert.equal(await page.locator('#hcBubbleCount').innerText(),'1 / 8');
   assert.equal(await page.locator('#hcBubbleTitle').innerText(),'Meditation');
   assert.ok(await page.locator('#hcBubbleHome .hcb-logo').isVisible());
   await page.locator('#hcBubblePrev').click();
   assert.equal(await page.locator('#hcBubbleTitle').innerText(),'Explore');
   await page.locator('#hcBubbleCard').click();
   await page.locator('#hcFlowExplore:not([hidden])').waitFor();
   await page.locator('#hcFlowExploreClose').click();
   await page.locator('#hcFlowDockHome').click();
   assert.equal(await page.locator('#hcBubbleCount').innerText(),'1 / 8');
   await page.locator('#hcBubbleSearch').click();
   await page.locator('#hcBubbleSearchPanel:not([hidden])').waitFor();
   await page.locator('#hcBubbleSearchInput').fill('burger');
   await page.getByText('Search all recipes for').waitFor();
   await page.locator('#hcBubbleSearchClose').click();
   await page.locator('#hcFlowDockSearch').click();
   await page.locator('#hcBubbleSearchPanel:not([hidden])').waitFor();
   await page.locator('#hcBubbleSearchClose').click();
   await page.locator('#hcBubblePrev').click();
   await page.locator('#hcBubbleCard').click();
   await page.locator('#hcFlowExplore:not([hidden])').waitFor();
   await page.locator('#hcFlowExploreOpen').click();
   await page.locator('#practices.active').waitFor();
   await page.locator('#hcFlowDockHome').click();
   assert.equal(await page.locator('#hcBubbleTitle').innerText(),'Meditation');
   assert.deepEqual(errors.filter(x=>x!=='writeEmbed is not defined'),[]);
   console.log('PASS: Home, Search, Explore, logo and navigation');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
