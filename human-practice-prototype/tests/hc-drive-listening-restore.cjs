/* Owner-authorized Drive restoration. Provider responses are stubbed: this tests
 * HeartClear routing and preservation, not Google permissions or real audio. */
'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const width of [393,1280]){
   const context=await browser.newContext({viewport:{width,height:860},serviceWorkers:'block',reducedMotion:'reduce'});
   await context.route('https://drive.google.com/**',route=>route.fulfill({contentType:'text/html',body:'<button>Original Drive controls</button>'}));
   const page=await context.newPage();
   page.setDefaultTimeout(15000);
   let pickerCount=0;page.on('filechooser',()=>pickerCount++);
   await page.goto('http://127.0.0.1:8765/human-practice-prototype/',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.hcLocalListeningAudio&&!window.hcLocalListeningAudio.isLoading());
   assert.equal(await page.locator('#hcOtFrame').getAttribute('src'),null,'No Drive autoplay on launch');
   await page.evaluate(()=>show('hcListening'));
   const entries=await page.evaluate(()=>HC_DRIVE_COLLECTIONS.filter(x=>!['islamHuAkmal','generalDuduk'].includes(x.key)).map(x=>({key:x.key,id:x.id})));
   assert(entries.length>10,'Exercise the complete original Drive catalogue');
   for(const item of entries){
    await page.locator('#hclSearch').fill('');
    const row=page.locator('[data-record="local-'+item.key+'"]');
    // Category view exposes every entry, including items beyond the All preview.
    await page.evaluate(key=>{const x=HC_DRIVE_COLLECTIONS.find(x=>x.key===key);const cat=x.section==='islamic'?'islamic':x.section==='hindu'?'hindu':x.section==='meditation'?'breathing':'nature';document.querySelector('#hclTabs [data-category="'+cat+'"]').click()},item.key);
    assert.equal(await row.locator('.hcl-record-action').innerText(),'Play','Original source must remain playable: '+item.key);
    await row.click();
    assert.equal(await page.locator('#hcOneTapDrive').isVisible(),true);
    assert.equal(await page.locator('#hcOtFrame').getAttribute('src'),'https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/preview?autoplay=1');
    await page.locator('#hcOtClose').click();
   }
   assert.equal(pickerCount,0,'Drive rows must never force re-upload');
   const item=entries.find(x=>x.key==='generalRaga')||entries.find(x=>x.key.startsWith('general'));
   await page.evaluate(()=>{show('home');hcToggleMiniLibrary()});
   const mini=page.locator('#hcMiniTrackList .hc-mini-library-item').filter({hasText:await page.evaluate(key=>HC_DRIVE_COLLECTIONS.find(x=>x.key===key).name,item.key)}).first();
   await mini.click();
   assert.equal(await page.locator('#hcOtFrame').getAttribute('src'),'https://drive.google.com/file/d/'+item.id+'/preview?autoplay=1','Mini library restores original Drive route');
   await page.evaluate(()=>show('home'));
   assert.equal(await page.locator('#hcOneTapDrive').isVisible(),true,'Navigation preserves visible minimized player');
   await page.locator('#hcOtClose').click();
   console.log('PASS original Drive catalogue and mini-library at '+width+'px ('+entries.length+' entries)');
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
