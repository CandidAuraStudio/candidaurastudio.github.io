/* HeartClear v283 — exact two-hour dhikr audio routing.
 * Run: node human-practice-prototype/tests/hc-dhikr-audio-v283.cjs
 * Mock only; public media hosting/Android playback must be verified separately.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const audio=read('hc-dhikr-audio-v283.js');
const listening=read('hc-listening-hub-v254.js');
const index=read('index.html');
const sw=read('sw.js');
new vm.Script(audio);new vm.Script(listening);new vm.Script(sw);
for(const m of index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))
 if(m[1].trim())new vm.Script(m[1]);
assert.match(index,/item\.key==='islamDhir120'/);
assert.match(index,/window\.hcPlayExtendedDhikrAudio\?\.\(\)/);
assert.match(listening,/record\('dhikr-extended'.*'dhikr-audio','islamDhir120'/);
assert.match(listening,/item\.key==='islamDhir120'\)return/);
assert.match(listening,/item\.kind==='dhikr-audio'/);
assert.match(audio,/method:'HEAD'/);
assert.match(audio,/^|[\s\S]*^/); // Do not imply the M4A is already hosted.
assert.match(audio,/response\.ok/);
assert.match(audio,/hcQuickPlaySound\(key\)/);
assert.match(index,/hc-dhikr-audio-v283\.js\?v=283/);
assert.match(index,/hc-listening-hub-v254\.js\?v=283/);
assert.match(index,/register\('\.\/sw\.js\?v=283'\)/);
assert.match(sw,/heartclear-v283/);
assert.match(sw,/heartclear-media-v1/);
assert.match(sw,/hc-dhikr-audio-v283\.js\?v=283/);
assert.doesNotMatch(sw,/\.\/media\/voice\/HeartClear_Islamic_Dhikr_Extended_120min_audio\.m4a/);
const exactId='1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C';
assert.ok(index.includes(exactId));
async function probe(success){
 const tracks={},calls=[],events=[],message={textContent:'',hidden:false};
 const win={dispatchEvent:event=>events.push(event),addEventListener(){}};
 const ctx={
  soundLabTracks:tracks,
  hcQuickPlaySound:async key=>{calls.push(key)},
  window:win,
  soundLabAudio:{getAttribute:()=>null},
  currentSoundKey:'horizon',
  document:{getElementById:id=>id==='hclStatus'?message:id==='hcListening'?{classList:{contains:()=>true}}:null},
  CustomEvent:class {constructor(type,options){this.type=type;this.detail=options.detail}},
  fetch:async()=>({ok:success,headers:{get:()=>success?'audio/mp4':'text/html'}})
 };
 vm.runInNewContext(audio,ctx);
 for(let n=0;n<12;n++)await Promise.resolve();
 assert.equal(tracks.islamDhir120?.originalDriveId,exactId);
 const played=await win.hcPlayExtendedDhikrAudio();
 assert.equal(played,success);
 assert.deepEqual(calls,success?['islamDhir120']:[]);
 if(!success)assert.match(message.textContent,/not yet published/);
 return {available:win.hcExtendedDhikrAudioAvailable(),calls};
}
(async()=>{
 assert.equal((await probe(false)).available,false);
 assert.equal((await probe(true)).available,true);
 console.log('PASS exact original recording; no fallback video or substitute; native audio gated on real hosted M4A');
})().catch(e=>{console.error(e);process.exitCode=1});
