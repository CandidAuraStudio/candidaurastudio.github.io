/* HeartClear current mobile-navigation regression.
 * Local browser checks only; no visitor data or remote accounts accessed.
 * Run from repository root after starting a server on port 8765:
 * node human-practice-prototype/tests/heartclear-navigation-qa.cjs
 */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>{
    if(e.message!=='writeEmbed is not defined')errors.push(e.message);
  });
  page.on('dialog',d=>d.dismiss());
  const url=process.env.HEARTCLEAR_QA_URL||'http://127.0.0.1:8765/human-practice-prototype/';
  const active=async id=>assert.equal(
    await page.locator('#'+id).evaluate(el=>el.classList.contains('active')),
    true,'Expected active screen: '+id
  );
  const navigate=async(nav,screen)=>{
    await page.locator('#bottomNav [data-nav="'+nav+'"]').click();
    await active(screen);
  };
  const header=()=>page.locator('#hcTopSettingsAction');

  try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
    await page.waitForSelector('#home.active',{timeout:30000});

    // Static and browser-generated UI both must have unique DOM IDs.
    const duplicateIds=await page.evaluate(()=>{
      const counts=new Map();
      for(const el of document.querySelectorAll('[id]'))counts.set(el.id,(counts.get(el.id)||0)+1);
      return [...counts.entries()].filter(([,n])=>n>1);
    });
    assert.deepEqual(duplicateIds,[],'Duplicate DOM IDs risk wrong controls being activated');
    console.log('PASS: unique DOM IDs');

    // Every direct inline callback must exist after scripts have loaded.
    const missingHandlers=await page.evaluate(()=>{
      const missing=[];
      for(const el of document.querySelectorAll('[onclick],[onchange]')){
        for(const attr of ['onclick','onchange']){
          const expr=el.getAttribute(attr)||'';
          const m=expr.match(/^\s*(?:return\s+)?([A-Za-z_$][\w$]*)\s*\(/);
          if(m && m[1]!=='if' && typeof window[m[1]]!=='function'){
            missing.push(attr+': '+m[1]+' ('+(el.id||el.tagName)+')');
          }
        }
      }
      return [...new Set(missing)];
    });
    assert.deepEqual(missingHandlers,[],'One or more visible controls refer to unavailable functions');
    console.log('PASS: inline button and change handlers exist');

    // Actual mobile-sized browser clicks, not direct calls to show().
    await active('home');
    assert.equal(await header().innerText(),'⋯');
    await header().click();await active('settings');
    assert.equal(await header().innerText(),'×');
    await header().click();await active('home');
    console.log('PASS: header opens and closes Settings from Home');

    for(const [nav,screen] of [
      ['practices','practices'],
      ['soundHub','soundLab'],
      ['library','library']
    ]){
      await navigate(nav,screen);
      await header().click();await active('settings');
      await header().click();await active(screen);
    }
    console.log('PASS: Settings returns to the correct Practice, Sounds or Library screen');

    await navigate('library','library');
    await navigate('settings','settings');
    await header().click();await active('library');
    console.log('PASS: bottom More can be closed with the top button');

    // Opening and closing Settings must never interrupt the native guided audio.
    await page.evaluate(()=>{
      const audio=document.getElementById('audio');
      const original=audio.pause.bind(audio);
      window.__hcPauseCount=0;
      audio.pause=function(){window.__hcPauseCount++;return original()};
    });
    await header().click();await active('settings');
    await header().click();await active('library');
    assert.equal(await page.evaluate(()=>window.__hcPauseCount),0);
    console.log('PASS: opening/closing Settings does not pause guided audio');

    await navigate('settings','settings');
    const profile=page.locator('#hcLocalProfileCard');
    await profile.locator('summary').click();
    assert.equal(await profile.evaluate(el=>el.open),true);
    await profile.locator('summary').click();
    assert.equal(await profile.evaluate(el=>el.open),false);
    console.log('PASS: Profile opens and closes');

    await page.locator('#settings .setting-row').filter({hasText:'Downloads'}).locator('button').first().click();
    await active('downloads');
    await navigate('settings','settings');
    await page.locator('#settings .setting-row').filter({hasText:'History'}).locator('button').first().click();
    await active('history');
    await page.locator('#history button').filter({hasText:'Back'}).click();
    await active('settings');
    console.log('PASS: Downloads and History destinations; History Back returns to Settings');

    assert.deepEqual(errors,[],'Unexpected uncaught JavaScript errors');
    console.log('PASS: no uncaught app errors');
    console.log('HeartClear navigation regression passed');
  }finally{
    await browser.close();
  }
})().catch(e=>{console.error(e.stack||e);process.exitCode=1});
