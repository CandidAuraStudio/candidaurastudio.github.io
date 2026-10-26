/* HeartClear visual regression contract: dynamically loaded deep pages, v284.
 * Run: node human-practice-prototype/tests/hc-deep-pages-theme-v284.cjs
 * No browser/network, no changes to user's personal data or media.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const css=read('hc-explorer.css');
const explorer=read('hc-explorer.js');
const reader=read('hc-heritage-reader-v189.js');
const launcher=read('hc-deep-heritage-v185.js');
const daily=read('hc-daily-care-v182.js');
const flow=read('hc-flow-v220.js');
const homeRoutine=read('hc-home-routine-v155.js');
const index=read('index.html');
const sw=read('sw.js');
let checked=0;
const check=(label,condition)=>{assert.ok(condition,label);checked++};
for(const [name,content] of [
 ['hc-explorer.js',explorer],['hc-heritage-reader-v189.js',reader],
 ['hc-deep-heritage-v185.js',launcher],['hc-daily-care-v182.js',daily],
 ['hc-flow-v220.js',flow],['hc-home-routine-v155.js',homeRoutine],
 ['sw.js',sw]])new vm.Script(content,{filename:name});
for(const m of index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))
 if(m[1].trim())new vm.Script(m[1]);
check('Explorer now uses charcoal panel',css.includes('#hcExplorer .hcxe-panel{background:#1b1b1b'));
check('Explorer old blue removed',!css.includes('rgba(24,61,81')&&!css.includes('#13354a'));
check('Explorer avoids duplicate route masthead',css.includes('body.hc-cinema #hcExplorer.active > #hcCinemaHero{display:none!important}'));
check('Explore track labels retained',explorer.includes('data-hcxe-track="fatiha"')&&explorer.includes('data-hcxe-track="human"')&&explorer.includes('data-hcxe-track="awareness"'));
check('Explore notes/progress retained',explorer.includes('hcxeNote')&&explorer.includes('hcxeMark'));
check('Reader still has complete topics',reader.includes('topics.map(t=>')&&reader.includes('window.HCHeritageReader={open,back:goBack}'));
check('Reader charcoal tiles and notes',reader.includes('background:#202020')&&reader.includes('background:#242424'));
check('Reader index controls are compact',reader.includes('data-hc-heritage-level="index"')&&reader.includes("el.setAttribute('data-hc-heritage-level',route.level)"));
check('Reader does not duplicate cinematic hero',reader.includes('body.hc-cinema #hcHeritageReader.active > #hcCinemaHero{display:none!important}'));
check('Reader progress key remains',reader.includes('hcHeritageReadingProgressV189'));
check('Existing global bottom tab nav unchanged',index.includes('id="hcReelsBottomTabGuard"'));
check('Explorer loader uses current version',explorer.includes('./hc-explorer.css?v=284')&&index.includes('./hc-explorer.js?v=284'));
check('Knowledge loader chain uses current version',flow.includes('./hc-daily-care-v182.js?v=284')&&homeRoutine.includes('./hc-daily-care-v182.js?v=284')&&daily.includes('./hc-deep-heritage-v185.js?v=284')&&launcher.includes('./hc-heritage-reader-v189.js?v=284'));
check('PWA shell version aligned',index.includes("register('./sw.js?v=287')")&&sw.includes("const APP_CACHE='heartclear-v287'"));
check('Existing offline media untouched',sw.includes("const MEDIA_CACHE='heartclear-media-v1'"));
check('No new global theme override module',!index.includes('hc-deep-pages-overlay'));
let depth=0;
for(const c of css){if(c==='{')depth++;if(c==='}')depth--}
check('Explorer CSS structure balanced',depth===0);
console.log('PASS '+checked+' visual and preservation contracts for Explorer + Human Knowledge.');
console.log('PENDING real narrow Android screen and installed-PWA visual review before merge.');
