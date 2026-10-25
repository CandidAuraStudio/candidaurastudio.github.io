/* HeartClear Reels: source contract for one-swipe video-side navigation.
   Run: node human-practice-prototype/tests/hc-reels-wide-one-swipe-v282.cjs
   This does not replace Android Chrome/PWA gesture and Drive playback QA. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=read('index.html'),css=read('hc-reels-minimal-v248.css');
const sw=read('sw.js'),home=read('hc-home-visible-v268.js');
assert.match(html,/id="hcReelSwipeLeft"/);
assert.match(html,/id="hcReelSwipeRail"/);
assert.match(html,/id="hcReelFrame"/);
assert.match(html,/Drive iframe is cross-origin: it cannot deliver swipes|Google Drive owns touch inside its cross-origin iframe/);
assert.match(html,/\[document\.getElementById\('hcReelSwipeLeft'\),document\.getElementById\('hcReelSwipeRail'\)\]/);
assert.match(html,/Math\.abs\(dy\)<35/);
assert.match(html,/Math\.abs\(dy\)<Math\.abs\(dx\)\*1\.2/);
assert.match(html,/now-hcReelLastSwipeAt<340/);
assert.match(html,/if\(dy<0\)hcReelNext\(\);else hcReelPrevious\(\)/);
assert.match(html,/touchcancel/);
assert.match(html,/key==='ArrowDown'/);
assert.match(html,/key==='ArrowUp'/);
assert.match(html,/function hcReelPreviewUrl\(item\)/);
assert.match(html,/HC_REELS_SEEN_KEY='heartclearReelsSeenV1'/);
assert.match(html,/serviceWorker\.register\('\.\/sw\.js\?v=282'\)/);
assert.match(html,/hc-reels-minimal-v248\.css\?v=282/);
assert.match(html,/hc-home-visible-v268\.js\?v=282/);
assert.match(css,/#hcReels\.active #hcReelSwipeLeft/);
assert.match(css,/width:30%!important/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/hcReelSoftArrival/);
assert.match(sw,/const APP_CACHE='heartclear-v282'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-reels-minimal-v248\.css\?v=282/);
assert.match(home,/HeartClear · HC v282/);
console.log('HEARTCLEAR REELS WIDE ONE-SWIPE CONTRACT PASS (25 checks).');
