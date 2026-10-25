/* Run from repository root: node human-practice-prototype/tests/hc-reels-native-v281.cjs
 * Pure source contract: no third-party content, browser network or device claims.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(base,n),'utf8');
const index=read('index.html');
const player=read('hc-reels-native-v281.js');
const css=read('hc-reels-native-v281.css');
const worker=read('sw.js');
const manifest=JSON.parse(read('hc-reels-direct-sources-v1.json'));
assert.equal(manifest.schema,1);
assert.deepEqual(manifest.items,[],'Never fabricate original video URLs');
assert.match(index,/const hcReelItems=\[/);
assert.match(index,/heartclearReelsSeenV1/);
assert.match(index,/heartclearLastReelV1/);
assert.match(index,/HCNativeReels\?\.start\(item,nextItem/);
assert.match(index,/HCNativeReels\?\.stop\(\)/);
assert.match(index,/window\.hcReelItemsForNative=\(\)=>hcReelItems/);
assert.match(index,/window\.hcReelNativeNext=\(\)=>hcReelNext\(\)/);
assert.match(index,/window\.hcReelNativePrevious=\(\)=>hcReelPrevious\(\)/);
assert.match(player,/video\.addEventListener\('ended'/);
assert.match(player,/video\.addEventListener\('error'/);
assert.match(player,/touchstart/);
assert.match(player,/touchend/);
assert.match(player,/preloadNext/);
assert.match(player,/new URL\(row\.url,location\.href\)/);
assert.match(player,/return false/);
assert.match(player,/stage\.classList\.add\('hc-native-reel-mode'\)/);
assert.match(css,/#hcReelNativeVideo/);
assert.match(css,/#hcReelNativeControls/);
assert.match(index,/hc-reels-native-v281\.css\?v=281/);
assert.match(index,/hc-reels-native-v281\.js\?v=281/);
assert.match(index,/register\('\.\/sw\.js\?v=281'\)/);
assert.match(worker,/heartclear-v281/);
assert.match(worker,/heartclear-media-v1/);
for(const n of ['hc-reels-native-v281.css','hc-reels-native-v281.js','hc-reels-direct-sources-v1.json']){
 assert.ok(worker.includes('./'+n+'?v=281'),n+' needs pre-cache');
}
new vm.Script(player,{filename:'hc-reels-native-v281.js'});
new vm.Script(worker,{filename:'sw.js'});
let scriptCount=0;
for(const m of index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
 if(m[1].trim()){new vm.Script(m[1]);scriptCount++}
}
assert.ok(scriptCount>=3);
let braces=0;
for(const ch of css){if(ch==='{')braces++;if(ch==='}')braces--}
assert.equal(braces,0);
console.log('PASS native Reels v281 source contract, '+scriptCount+' inline scripts, existing history & catalog intact.');
console.log('PENDING direct video sources, Android touch QA, playback & media permissions.');
