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
    assert.equal((await page.locator('.hc-daily-family').innerText()).trim(),'Welcome to Mastar Alim family');
    console.log('PASS: welcome subtitle is available under the changing daily greeting');

    // A phone app must not scale its document in response to accidental pinch/double-tap.
    const viewportContent=await page.locator('meta[name="viewport"]').getAttribute('content');
    assert.match(viewportContent,/maximum-scale=1/);
    assert.match(viewportContent,/user-scalable=no/);
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).touchAction),'pan-x pan-y');
    console.log('PASS: mobile page zoom disabled without blocking scrolling');

    // Phase 1: Guest mode remains the default; every optional sharing preference starts OFF.
    const backendRequests=[];
    page.on('request',req=>{
      if(req.url().includes('.supabase.co/'))backendRequests.push(req.url());
    });
    await page.locator('[data-nav="settings"]').evaluate(el=>el.click());
    const initialProfile=await page.evaluate(()=>({
      label:document.getElementById('hcLocalProfileIdentity').textContent,
      choices:['hcPrefAnonymous','hcPrefSync','hcPrefAdmin'].map(id=>document.getElementById(id).checked),
      hasLocalProfile:localStorage.getItem('heartclearLocalProfileV1')!==null,
      hasPrivacySettings:localStorage.getItem('heartclearPrivacyPreferencesV1')!==null
    }));
    assert.match(initialProfile.label,/Guest mode/);
    assert.deepEqual(initialProfile.choices,[false,false,false]);
    assert.equal(initialProfile.hasLocalProfile,false,'Guest use must not require account creation');
    assert.equal(initialProfile.hasPrivacySettings,false,'No consent records should be created silently');
    // Preserve existing history and bookmarks when changing the optional local name.
    const originalHistory=await page.evaluate(()=>localStorage.getItem('clearWithinHistory'));
    await page.evaluate(()=>localStorage.setItem('clearWithinHistory','[{"practice":"Existing practice","listenedSeconds":180}]'));
    await page.locator('#hcLocalProfileName').fill('Alex   River');
    await page.locator('#hcLocalProfileSaveBtn').click();
    assert.match(await page.locator('#hcLocalProfileIdentity').innerText(),/Alex River/);
    assert.equal(await page.evaluate(()=>hcLocalProfile().displayName),'Alex River');
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('clearWithinHistory')).length),1);
    await page.locator('#hcPrefAnonymous').check();
    await page.locator('#hcPrefSync').check();
    await page.locator('#hcPrefAdmin').check();
    const savedPrefs=await page.evaluate(()=>JSON.parse(localStorage.getItem('heartclearPrivacyPreferencesV1')));
    assert.equal(savedPrefs.draftOnly,true);
    assert.equal(savedPrefs.anonymous,true);
    assert.equal(savedPrefs.sync,true);
    assert.equal(savedPrefs.admin,true);
    assert.equal(await page.evaluate(()=>Boolean(hcPersonalDataSnapshot().heartclearLocalProfileV1)),true,
      'Local profile should be exportable with the original data export');
    assert.equal(await page.evaluate(()=>Boolean(hcPersonalDataSnapshot().heartclearPrivacyPreferencesV1)),true,
      'Sharing preferences should be exportable');
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForSelector('#home.active,#settings.active',{timeout:20000});
    await page.locator('[data-nav="settings"]').evaluate(el=>el.click());
    assert.match(await page.locator('#hcLocalProfileIdentity').innerText(),/Alex River/);
    assert.deepEqual(await page.evaluate(()=>
      ['hcPrefAnonymous','hcPrefSync','hcPrefAdmin'].map(id=>document.getElementById(id).checked)
    ),[true,true,true], 'Independent privacy preferences must survive reload');
    await page.locator('#hcLocalProfileGuestBtn').click();
    assert.match(await page.locator('#hcLocalProfileIdentity').innerText(),/Guest mode/);
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('clearWithinHistory')).length),1,
      'Switching to guest must preserve practice history');
    assert.deepEqual(await page.evaluate(()=>
      ['hcPrefAnonymous','hcPrefSync','hcPrefAdmin'].map(id=>document.getElementById(id).checked)
    ),[true,true,true], 'Switching to guest must not silently alter independent sharing preferences');
    await page.locator('#hcPrefAnonymous').uncheck();
    await page.locator('#hcPrefSync').uncheck();
    await page.locator('#hcPrefAdmin').uncheck();
    await page.evaluate(previous=>{
      if(previous===null)localStorage.removeItem('clearWithinHistory');
      else localStorage.setItem('clearWithinHistory',previous);
    },originalHistory);
    assert.deepEqual(backendRequests,[], 'Phase 1 must not connect to Supabase or upload user data');
    console.log('PASS: guest default, optional name, three separate OFF-by-default preferences, persistence, private export and no cloud sharing');


    const tabs=[['practices','practices'],['soundHub','soundLab'],['library','library'],['settings','settings'],['home','home']];
    for(const [nav,screen] of tabs){
      await page.locator('[data-nav="'+nav+'"]').evaluate(el=>el.click());
      await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('active'),screen,{timeout:10000});
    }
    console.log('PASS: five primary bottom navigation routes');

    // An actual Begin click must reach the audio player and request playback once,
    // without opening additional preparation/intro/instruction steps.
    await page.evaluate(()=>{
      window.hcObservedPlay=[];
      window.hcOldPlay=HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play=function(){
        window.hcObservedPlay.push(this.id);
        return Promise.reject(new DOMException('Test gesture stub','NotAllowedError'));
      };
    });
    await page.locator('#homeRecommendedCard .hc-home-primary-btn').evaluate(el=>el.click());
    assert.ok(await page.locator('#player').evaluate(el=>el.classList.contains('active')),
      'Begin should open the full player directly');
    assert.ok((await page.evaluate(()=>window.hcObservedPlay)).includes('audio'),
      'Begin must request guided audio immediately');
    await page.evaluate(()=>{HTMLMediaElement.prototype.play=window.hcOldPlay});
    console.log('PASS: one-click Begin calls the existing guided audio');
    await page.locator('#player .hc-minimize-audio').evaluate(el=>el.click());
    assert.ok(await page.locator('#home').evaluate(el=>el.classList.contains('active')),
      'Minimize must return directly Home without stopping the guided session');
    assert.ok(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),
      'Paused/loading guided audio must leave a visible mini controller on Home');
    assert.equal((await page.locator('#globalMiniPlay').innerText()).trim(),'▶',
      'Stopped/blocked audio must show Play, not a false playing state');
    await page.locator('#globalMini .global-mini-copy').evaluate(el=>el.click());
    assert.ok(await page.locator('#player').evaluate(el=>el.classList.contains('active')),
      'Mini title should expand same original player');
    console.log('PASS: minimized Deep Sleep/meditation returns Home and retains native play/back/forward controls');
    await page.locator('#finishBtn').evaluate(el=>el.click());
    assert.ok(await page.locator('#home').evaluate(el=>el.classList.contains('active')),
      'Finish should go straight to Home, not another Done screen');
    assert.equal(await page.evaluate(()=>localStorage.getItem('heartclearOptInReportingV1')),null,
      'Visitor activity must remain unshared until explicitly consented');
    console.log('PASS: Finish returns Home; reporting remains off by default');
    await page.evaluate(()=>hcQuickStartTimer('quiet',3));
    assert.ok(await page.locator('#quietTimer').evaluate(el=>el.classList.contains('active')));
    assert.equal(await page.evaluate(()=>hcTimerActive),true);
    assert.equal((await page.locator('#hcTimerStart').innerText()).trim(),'Pause');
    await page.evaluate(()=>show('home'));
    console.log('PASS: quick timer starts immediately and exposes Pause');

    await page.locator('[data-nav="practices"]').evaluate(el=>el.click());
    await page.locator('#practices [data-practice-filter="sacred"]').evaluate(el=>el.click());
    assert.ok(await page.locator('#practices [data-group="sacred"] .practice-card').count()>=3,
      'Sacred practice catalog now includes Adhkar, Fatiha, and Allahu; do not treat growth as a regression');
    assert.equal(await page.locator('#practices [data-group="guided"]').evaluate(el=>el.hidden),true);
    await page.locator('#practices [data-session="islamHu"]').evaluate(el=>el.click());
    assert.ok(await page.locator('#hcDriveMedia').evaluate(el=>el.classList.contains('active')));
    assert.match(await page.locator('#hcDriveVideoTitle').innerText(),/Allahu Meditation/);
    assert.ok(await page.locator('#hcDriveMedia').evaluate(el=>el.classList.contains('hc-drive-audio-view')),
      'Drive listening should start in compact audio-focused view');
    assert.equal(await page.locator('#hcDriveVideoFrame').getAttribute('src'),'https://drive.google.com/file/d/11Sgca-PXcd4-5DRaPQPslynyc7QtkVYx/preview?autoplay=1','Allahu video starts only after its card is tapped');
    assert.equal(await page.locator('#hcDriveOpenSource').getAttribute('href'),'https://drive.google.com/file/d/11Sgca-PXcd4-5DRaPQPslynyc7QtkVYx/view');
    const beforeDock=await page.locator('#hcDriveVideoFrame').getAttribute('src');
    await page.locator('#hcDriveMedia .hc-drive-minimize').evaluate(el=>el.click());
    const dock=await page.locator('#hcDriveMedia').evaluate(el=>{
      const rect=el.getBoundingClientRect();
      return {width:rect.width,height:rect.height,docked:el.classList.contains('hc-drive-docked'),
        iframeStillMounted:!!document.getElementById('hcDriveVideoFrame')?.getAttribute('src'),
        visibleLabel:getComputedStyle(el.querySelector('.hc-drive-mini-label')).display};
    });
    assert.ok(dock.docked && dock.height<=75 && dock.width<=292,
      'Google Drive floating view should be a short, narrow audio-focused strip');
    assert.notEqual(dock.visibleLabel,'none');
    assert.equal(await page.locator('#hcDriveVideoFrame').getAttribute('src'),beforeDock,
      'Minimizing must not restart or replace original Google Drive frame');
    await page.locator('#hcDriveMedia .hc-drive-expand').evaluate(el=>el.click());
    assert.ok(await page.locator('#hcDriveMedia').evaluate(el=>el.classList.contains('active')),
      'Expand returns to full controls without changing the iframe');
    console.log('PASS: minimized Drive playback no longer covers Home and stays mounted');
    await page.locator('#hcDriveMedia button').first().evaluate(el=>el.click());
    assert.ok(await page.locator('#practices').evaluate(el=>el.classList.contains('active')),'Return from devotional video should go to Practice');
    await page.evaluate(()=>{show('sacred');openSacred('islamic')});
    const sacredDrive=await page.locator('#hcSacredDriveCards').innerText();
    assert.match(sacredDrive,/Hu Hu Hu Allah/,'Original Islamic video entry must remain');
    console.log('PASS: Allahu one-tap playback, Sacred filter, return and original Islamic entry');

    await page.locator('[data-nav="soundHub"]').evaluate(el=>el.click());
    await page.locator('button[data-filter="flute"]').evaluate(el=>el.click());
    const fluteRows=await page.locator('#hcSoundTrackList .hc-sound-row').count();
    assert.ok(fluteRows>=4,'Expected original and 7/10/15 minute acoustic flute');
    console.log('PASS: flute catalog and live filtering ('+fluteRows+' rows)');

    // Ensure every HeartClear Play/Pause button is compact, accessible, and white.
    const playerStyle=await page.evaluate(()=>{
      const ids=['playBtn','soundLabPlayBtn','fearPlayBtn','adhkarPlayBtn','bookPlayBtn',
        'naturePlayBtn','bookMiniPlay','globalMiniPlay','hcMixPlayBtn',
        'humanStartBtn','humanSoundBtn','hcTimerStart','introPlayBtn'];
      return ids.map(id=>{
        const el=document.getElementById(id);
        if(!el)return{id,missing:true};
        const s=getComputedStyle(el);
        return {id,color:s.backgroundColor,minHeight:parseFloat(s.minHeight),maxWidth:parseFloat(s.maxWidth)};
      });
    });
    for(const b of playerStyle){
      assert.ok(!b.missing,'Missing player control: '+b.id);
      assert.equal(b.color,'rgb(255, 255, 255)','Not white: '+b.id);
      assert.ok(b.minHeight>=44,'Tap target too small: '+b.id);
      assert.ok(b.maxWidth<=154,'Control too wide: '+b.id);
    }
    const rowStyle=await page.locator('#soundLab .hc-sound-icon-btn').first().evaluate(el=>{
      const s=getComputedStyle(el);
      return {color:s.backgroundColor,width:parseFloat(s.width),height:parseFloat(s.height)};
    });
    assert.equal(rowStyle.color,'rgb(255, 255, 255)');
    assert.equal(rowStyle.width,44);
    assert.equal(rowStyle.height,44);
    console.log('PASS: all compact white playback controls and Sound row circles');
    await page.locator('[data-nav="library"]').evaluate(el=>el.click());
    await page.locator('#library button[onclick*="books"]').evaluate(el=>el.click());
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

    await page.locator('#settings .hc-more-shortcuts button').first().evaluate(el=>el.click());
    await page.locator('button[onclick="openFearPractice()"]').first().evaluate(el=>el.click());
    assert.ok(await page.locator('#fearPractice').evaluate(el=>el.classList.contains('active')));
    await page.locator('#fearPractice button').filter({hasText:'Frogs & Waterfall'}).evaluate(el=>el.click());
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
    assert.ok(String(partial.range).startsWith('bytes 100-999/'));
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
