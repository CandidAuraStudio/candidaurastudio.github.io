/* HeartClear v100 real Chromium smoke/regression checks.
   No voice files, notes, or external user data accessed. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({serviceWorkers:'allow',viewport:{width:393,height:852}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:8765/human-practice-prototype/';
  try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForSelector('#home.active',{timeout:20000});
    assert.match(await page.locator('body').innerText(),/HeartClear|Good morning|Good afternoon|Good evening/);
    let playing=await page.locator('audio').evaluateAll(els=>els.filter(x=>!x.paused).map(x=>x.id));
    assert.deepEqual(playing,[],'App must be silent on first open');
    console.log('PASS: launch stays silent');

    const tabs=[['practices','practices'],['soundHub','soundLab'],['library','library'],['settings','settings'],['home','home']];
    for(const [nav,screen] of tabs){
      await page.locator('[data-nav="'+nav+'"]').evaluate(el=>el.click());
      await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('active'),screen,{timeout:10000});
    }
    console.log('PASS: five primary bottom navigation routes');

    await page.locator('[data-nav="soundHub"]').evaluate(el=>el.click());
    await page.locator('button[data-filter="flute"]').evaluate(el=>el.click());
    const fluteRows=await page.locator('#hcSoundTrackList .hc-sound-row').count();
    assert.ok(fluteRows>=4,'Expected original and 7/10/15 minute acoustic flute');
    console.log('PASS: flute catalog and live filtering ('+fluteRows+' rows)');
    await page.locator('[data-nav="library"]').evaluate(el=>el.click());
    await page.locator('button[onclick="openCollection(\\'books\\')"]').evaluate(el=>el.click());
    await page.locator('#collectionList button').filter({hasText:'Read English'}).evaluate(el=>el.click());
    assert.ok(await page.locator('#bookReader').evaluate(el=>el.classList.contains('active')),'English reading route inactive');
    assert.ok((await page.locator('#readerPage').innerText()).length>150,'Reader has no content');
    console.log('PASS: Library Reading opens real book content');

    await page.locator('[data-nav="settings"]').evaluate(el=>el.click());
    await page.locator('#hcPlaybackChecks').evaluate(el=>el.open=true);
    await page.locator('#hcRunPlaybackCheckBtn').evaluate(el=>el.click());
    await page.waitForFunction(()=>/checks passed|did not finish/.test(document.getElementById('hcPlaybackCheckStatus')?.textContent||''),null,{timeout:40000});
    const checkText=await page.locator('#hcPlaybackCheckResults').innerText();
    assert.match(checkText,/Rain hosted audio/);
    assert.match(checkText,/Frogs hosted audio/);
    assert.match(checkText,/Flute · 10 min hosted audio/);
    assert.ok(await page.locator('#hcCopyPlaybackCheckBtn').isEnabled());
    console.log('PASS: on-device playback diagnostics');

    await page.locator('button[onclick="show(\\'human\\')"]').first().evaluate(el=>el.click());
    await page.locator('button[onclick="openFearPractice()"]').first().evaluate(el=>el.click());
    assert.ok(await page.locator('#fearPractice').evaluate(el=>el.classList.contains('active')));
    await page.locator('button[onclick="openFearTrack(\\'frog\\')"]').evaluate(el=>el.click());
    assert.ok(await page.locator('#fearPlayer').evaluate(el=>el.classList.contains('active')));
    assert.equal(await page.locator('#fearVolume').inputValue(),'15');
    assert.deepEqual(await page.locator('#fearBeforeRating button').allTextContents(),['Comfortable','Unsure','Too much']);
    assert.equal(await page.locator('#fearAudio').evaluate(el=>el.paused),true);
    console.log('PASS: frogs sound available, silent until Play, gentle comfort check-in');

    const saved=await page.evaluate(async()=>{
      await navigator.serviceWorker.ready;
      const url='./media/cc0-nature/fire_original.mp3';
      await saveOfflineUrl(url);
      return await cacheHas(url);
    });
    assert.ok(saved,'Offline-save cache missing');
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:15000});
    await context.setOffline(true);
    const partial=await page.evaluate(async()=>{
      const r=await fetch('./media/cc0-nature/fire_original.mp3',{headers:{Range:'bytes=100-999'}});
      return {status:r.status,count:(await r.arrayBuffer()).byteLength,range:r.headers.get('Content-Range')};
    });
    assert.equal(partial.status,206,'Saved audio should answer byte range while offline');
    assert.equal(partial.count,900,'Byte slice wrong');
    assert.match(partial.range,/bytes 100-999\\//);
    console.log('PASS: offline cached audio returns seekable HTTP 206 range');
    assert.deepEqual(errors,[],'Uncaught browser errors: '+errors.join('; '));
    console.log('PASS: no uncaught JavaScript page errors');
    console.log('HEARTCLEAR CHROMIUM SMOKE PASSED');
  } catch(e){
    console.error('HEARTCLEAR CHROMIUM SMOKE FAILED: ',e);
    console.error('Uncaught page errors: ',errors);
    await page.screenshot({path:'/tmp/heartclear-regression-failed.png',fullPage:true}).catch(()=>{});
    process.exitCode=1;
  }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1;});
