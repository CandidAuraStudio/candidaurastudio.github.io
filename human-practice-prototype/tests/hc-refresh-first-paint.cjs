/* Refresh-theme first-paint contract: node human-practice-prototype/tests/hc-refresh-first-paint.cjs */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const home=fs.readFileSync(path.join(root,'hc-home-visible-v268.js'),'utf8');
assert.match(html,/<html[^>]*class="hc-booting"/);
assert.match(html,/id="hc-refresh-first-paint"/);
assert.match(html,/html\.hc-booting \.app[,\s]/);
assert.match(html,/class="hc-boot-screen"/);
const firstHead=html.indexOf('</head>');
const splash=html.indexOf('class="hc-boot-screen"');
const finalStyle=html.indexOf('<link rel="stylesheet" href="./hc-design-unified-v279.css?v=284"');
const loader=html.indexOf('id="hcBootSafety"');
assert.ok(firstHead>=0&&splash>firstHead&&loader<splash+1000&&finalStyle>splash,
 'Splash must precede late styles and older content');
assert.match(html,/hc-design-unified-v279\.css\?v=284" onload="document\.documentElement\.classList\.remove\('hc-booting'\)"/);
assert.match(html,/onerror="document\.documentElement\.classList\.remove\('hc-booting'\)"/);
assert.match(html,/navigator\.serviceWorker\.register\('\.\/sw\.js\?v=287'\)/);
assert.match(html,/hc-home-visible-v268\.js\?v=287/);
assert.match(sw,/const APP_CACHE='heartclear-v287'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-design-unified-v279\.css\?v=284/);
assert.match(sw,/hc-home-visible-v268\.js\?v=287/);
assert.match(home,/HeartClear · HC v287/);
assert.doesNotMatch(html,/hcReelsBottomTabGuard/,'Old nav owner must not reorder Reels after the third tab');
console.log('PASS: refresh theme gate and offline shell version alignment');
