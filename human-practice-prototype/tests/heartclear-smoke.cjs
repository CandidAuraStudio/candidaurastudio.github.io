/* HeartClear v100 real Chromium smoke/regression checks.
   No voice files, notes, or external user data accessed. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({serviceWorkers:'allow',viewport:{width:393,height:852}});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>{
    // The third-party Google Drive preview sometimes evaluates its own optional
    // writeEmbed hook late, even after the iframe is minimized/removed.
    // No first-party HeartClear source refers to writeEmbed; isolate that known
    // provider exception, but keep all app errors fatal.
    if(e.message==='writeEmbed is not defined'){
      console.warn('WARN: external Drive preview script error:',e.message);
      return;
    }
    errors.push(e.message);
  });
  const url='http://127.0.0.1:8765/human-practice-prototype/';
  try{
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    await page.waitForSelector('#home.active',{timeout:20000});
    assert.match(await page.locator('body').innerText(),/HeartClear|Good morning|Good afternoon|Good evening/);
    assert.equal(await page.locator('#timeGreeting').isVisible(),true,'Original time-based Home greeting must be visible');
    assert.equal(await page.locator('.hc-simple-start').isVisible(),true,'Approved One tap. Just listen section must be visible');
    // The v279 Home intentionally places the daily guided session behind one primary button.
    // Preserve the original routine DOM without forcing the expanded old card to remain visible.
    assert.equal(await page.locator('#hcHomeRoutineV155').count(),1,'Daily guided sessions must remain mounted');
    assert.equal(await page.locator('#hcCorePathsClassic .hc-path-begin').count()>0,true,'One-tap daily guided action must remain available');
    assert.equal(await page.locator('#home').evaluate(el=>el.classList.contains('hc-bubble-mode')),false,'Home must not be replaced by the bubble carousel');
    let playing=await page.locator('audio').evaluateAll(els=>els.filter(x=>!x.paused).map(x=>x.id));
    assert.deepEqual(playing,[],'App must be silent on first open');
    console.log('PASS: launch stays silent');
    assert.equal((await page.locator('.hc-daily-family').innerText()).trim(),'Welcome to HeartClear');
    console.log('PASS: welcome subtitle is available under the changing daily greeting');

    // A phone app must not scale its document in response to accidental pinch/double-tap.
    const viewportContent=await page.locator('meta[name="viewport"]').getAttribute('content');
    assert.match(viewportContent,/width=device-width/);
    assert.match(viewportContent,/viewport-fit=cover/);
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).touchAction),'pan-x pan-y');
    console.log('PASS: responsive mobile viewport and one-finger scroll handling');

    // The live account feature remains a FREE, optional preview.
    // Verify there are no silent network uploads or account/consent writes.
    const backendRequests=[];
    page.on('request',req=>{
      if(req.url().includes('.supabase.co/'))backendRequests.push(req.url());
    });
    const initial=await page.evaluate(()=>({
      history:localStorage.getItem('clearWithinHistory'),
      localProfile:localStorage.getItem('heartclearLocalProfileV1'),
      privacy:localStorage.getItem('heartclearPrivacyPreferencesV1')
    }));
    await page.locator('[data-nav="settings"]').evaluate(el=>el.click());
    await page.waitForSelector('#settings.active',{timeout:10000});
    const accountButton=page.locator('#settings .setting-row').filter({hasText:'Account preview'}).locator('button');
    assert.equal(await accountButton.count(),1,'The optional account preview is reachable from Settings');
    await accountButton.click();
    const account=page.locator('#hcAccountDialog');
    assert.equal(await account.isVisible(),true);
    assert.match(await account.innerText(),/HeartClear remains free|No payment required/i);
    assert.equal(await account.locator('#hcAccountLogin').isVisible(),false,'Email and password are not required to listen');
    await account.locator('#hcAccountClose').click();
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>!document.documentElement.classList.contains('hc-booting'),{timeout:20000});
    const restored=await page.evaluate(()=>({
      history:localStorage.getItem('clearWithinHistory'),
      localProfile:localStorage.getItem('heartclearLocalProfileV1'),
      privacy:localStorage.getItem('heartclearPrivacyPreferencesV1')
    }));
    assert.deepEqual(restored,initial,'Account preview must not change private data during refresh');
    assert.deepEqual(backendRequests,[],'No background account backend or sharing');
    console.log('PASS: optional free account preview, local private history preserved, no backend uploads');

    const tabs=[['practices','practices'],['soundHub','soundLab'],['library','library'],['settings','settings'],['home','home']];
    for(const [nav,screen] of tabs){
      await page.locator('[data-nav="'+nav+'"]').evaluate(el=>el.click());
      await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('active'),screen,{timeout:10000});
    }
    console.log('PASS: five primary bottom navigation routes');

    // The approved Home 'Begin meditation' starts existing guided audio on Home
    // with the persistent mini-player. The legacy recommended-card Begin button
    // is no longer the primary entry and must not be used to assert navigation.
    await page.evaluate(()=>{
      window.hcObservedPlay=[];
      window.hcOldPlay=HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play=function(){
        window.hcObservedPlay.push(this.id);
        return Promise.reject(new DOMException('Test gesture stub','NotAllowedError'));
      };
    });
    await page.locator('#hcCorePathsClassic .hc-path-begin').evaluate(el=>el.click());
    assert.ok(await page.locator('#home').evaluate(el=>el.classList.contains('active')),
      'Begin should keep the simple Home visible while launching guided listening');
    assert.ok((await page.evaluate(()=>window.hcObservedPlay)).includes('audio'),
      'Begin must request existing guided audio immediately');
    assert.ok(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),
      'Home Begin must reveal the persistent mini-player');
    await page.evaluate(()=>{HTMLMediaElement.prototype.play=window.hcOldPlay});
    console.log('PASS: one-click Home Begin requests guided audio and shows mini-player');
    assert.equal((await page.locator('#globalMiniPlay').innerText()).trim(),'▶',
      'Blocked audio must show Play rather than a false playing state');
    await page.locator('#globalMini .global-mini-copy').evaluate(el=>el.click());
    assert.ok(await page.locator('#player').evaluate(el=>el.classList.contains('active')),
      'Mini title must open the existing original full player');
    await page.locator('#player .hc-minimize-audio').evaluate(el=>el.click());
    assert.ok(await page.locator('#home').evaluate(el=>el.classList.contains('active')),
      'Minimize must return Home without losing the guided session');
    assert.ok(await page.locator('#globalMini').evaluate(el=>el.classList.contains('show')),
      'Minimizing should leave mini-player visible');
    await page.locator('#globalMini .global-mini-copy').evaluate(el=>el.click());
    assert.ok(await page.locator('#player').evaluate(el=>el.classList.contains('active')),
      'Mini-title reopen must retain the original player');
    console.log('PASS: Home Begin, full-player expansion and minimize/reopen preserve controls');
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

    await page.evaluate(()=>hcOpenReels());
    const initialReel=await page.locator('#hcReelFrame').getAttribute('src');
    assert.ok(initialReel?.includes('drive.google.com/file/d/'),'Reel should load on opening');
    await page.evaluate(()=>hcReelNext());
    const nextReel=await page.locator('#hcReelFrame').getAttribute('src');
    assert.ok(nextReel?.includes('drive.google.com/file/d/'));
    assert.notEqual(nextReel,initialReel,'Next reel must automatically load a different video');
    await page.evaluate(()=>hcReelAllSeen());
    assert.equal(await page.locator('#hcReelAllSeen button').filter({hasText:'Watch again'}).count(),1);
    await page.evaluate(()=>hcReelReplayAll());
    assert.ok(await page.locator('#hcReelFrame').getAttribute('src'),'Replay must restore video');
    await page.evaluate(()=>hcCloseReels());
    console.log('PASS: auto-load on swipe and replay watched reels');

    // Intercept source APIs, validating the app's parsing and layouts without third-party outages.
    // Optional real-provider probe; the functional checks below still use local stubs.
    const sourceProbe=await page.evaluate(async()=>{
      const urls=['https://api.alquran.cloud/v1/surah/1/quran-uthmani','https://quranenc.com/api/v1/translation/sura/english_saheeh/1','https://quranenc.com/api/v1/translation/sura/tamil_omar/1'];
      return Promise.all(urls.map(async url=>{
        const ctrl=new AbortController();const stop=setTimeout(()=>ctrl.abort(),5000);
        try{const r=await fetch(url,{signal:ctrl.signal});return {url,status:r.status,ok:r.ok,sample:(await r.text()).slice(0,120)}}
        catch(e){return {url,error:e.name+': '+e.message}}finally{clearTimeout(stop)}
      }));
    });
    console.log('QURAN_LIVE_SOURCES',JSON.stringify(sourceProbe));
    // Stub fetch inside the page, before the installed PWA service worker intercepts requests.
    await page.evaluate(()=>{
      window.hcPreTestFetch=window.fetch;
      window.fetch=(input,opts)=>{
        const url=String(typeof input==='string'?input:input.url);
        if(url==='https://api.alquran.cloud/v1/surah'){
          const chapters=Array.from({length:114},(_,i)=>({number:i+1,englishName:'Surah '+(i+1),numberOfAyahs:i===4?2:7}));
          return Promise.resolve(new Response(JSON.stringify({data:chapters}),{status:200,headers:{'Content-Type':'application/json'}}));
        }
        if(url==='https://api.alquran.cloud/v1/surah/5/quran-uthmani'){
          return Promise.resolve(new Response(JSON.stringify({data:{ayahs:[{text:'بِسْمِ اللَّهِ'},{text:'الْحَمْدُ لِلَّهِ'}]}}),{status:200,headers:{'Content-Type':'application/json'}}));
        }
        if(url.startsWith('https://quranenc.com/api/v1/translation/sura/')){
          const tamil=url.includes('tamil_omar'),five=url.endsWith('/5');
          return Promise.resolve(new Response(JSON.stringify([{sura:five?5:41,aya:five?1:7,translation:tamil?'தமிழ் பொருள் சோதனை':'English source translation test'}]),{status:200,headers:{'Content-Type':'application/json'}}));
        }
        return window.hcPreTestFetch(input,opts);
      };
    });
    await page.evaluate(()=>hcOpenQuranStudy(41,7));
    await page.waitForFunction(()=>document.querySelector('#hcqs-verse-41-7 .hcqs-translation-columns')?.textContent.includes('English source translation test'),null,{timeout:15000});
    assert.equal(await page.locator('#hcqs-surah-select option').count(),114);
    assert.ok((await page.locator('#hcqs-verse-41-7 .hcqs-translation-columns').innerText()).includes('தமிழ் பொருள் சோதனை'));
    const cols=await page.locator('#hcqs-verse-41-7 .hcqs-translation-columns').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length);
    assert.equal(cols,2,'English and Tamil should be two columns on mobile');
    await page.locator('#hcqs-surah-select').selectOption('5');
    await page.waitForFunction(()=>!!document.querySelector('#hcqs-verse-5-1 .hcqs-arabic')?.textContent.includes('اللَّهِ'),null,{timeout:15000});
    assert.ok((await page.locator('#hcqs-verse-5-1 .hcqs-translation-columns').innerText()).includes('English source translation test'));
    await page.evaluate(()=>{window.fetch=window.hcPreTestFetch});
    console.log('PASS: 114 surahs, QuranEnc English/Tamil, Arabic source and two-column layout');

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
