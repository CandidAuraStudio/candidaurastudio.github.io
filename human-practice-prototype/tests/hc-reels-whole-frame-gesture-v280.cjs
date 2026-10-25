/* HeartClear Reels whole-frame gesture source contract.
 * From repo root: node human-practice-prototype/tests/hc-reels-whole-frame-gesture-v280.cjs
 * Device test still required: Google Drive's iframe owns native media controls.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'hc-reels-minimal-v248.css'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const once=(needle,text)=>assert.equal(text.split(needle).length-1,1,needle+' must occur once');
for(const id of ['hcReelFrame','hcReelSwipeRail','hcReelSwipeSurface','hcReelModeToggle'])
 once('id="'+id+'"',index);
assert.match(index,/function hcReelSyncSwipeMode\(/);
assert.match(index,/function hcReelToggleSwipeMode\(/);
assert.match(index,/surface\.addEventListener\('touchstart'/);
assert.match(index,/surface\.addEventListener\('touchend'/);
assert.match(index,/surface\.addEventListener\('wheel'/);
assert.match(index,/surface\.addEventListener\('click'/);
assert.match(index,/hcReelSetSwipeMode\(false\)/);
assert.match(index,/hcReelFrameLoaded=true;\s*hcReelSyncSwipeMode\(\)/);
assert.match(index,/hcReelFrameLoaded=false;[\s\S]*?hcReelSyncSwipeMode\(\)/);
assert.match(css,/#hcReels\.active #hcReelSwipeSurface\[hidden\]/);
assert.match(css,/#hcReels\.active\.hc-reels-swipe-mode #hcReelSwipeRail/);
assert.match(index,/drive\.google\.com\/file\/d\//);
assert.match(index,/heartclearReelsSeenV1/);
assert.match(index,/heartclearLastReelV1/);
assert.match(index,/hc-reels-minimal-v248\.css\?v=280/);
assert.match(index,/register\('\.\/sw\.js\?v=280'\)/);
assert.match(sw,/const APP_CACHE='heartclear-v280'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-reels-minimal-v248\.css\?v=280/);
// Validate inline scripts without executing any UI handlers or media.
const vm=require('node:vm');
let checked=0;
for(const match of index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
 if(!match[1].trim())continue;
 new vm.Script(match[1]);checked++;
}
assert.ok(checked>=3,'Expected HeartClear inline application scripts');
console.log('PASS Reels gesture contracts; '+checked+' inline scripts parsed.');
console.log('NOTE: Android cross-origin Drive gesture/audio integration requires device QA.');
