/* HeartClear: after-practice two-minute closing audio is opt-in (v288).
   Run: node human-practice-prototype/tests/hc-closing-stillness-optin.cjs */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
assert.equal((html.match(/id="hcClosingAutoplaySwitch"/g)||[]).length,1);
assert.equal((html.match(/id="hcClosingAudio"/g)||[]).length,1);
assert.match(html,/id="hcClosingAutoplaySwitch" role="switch" aria-checked="false"/);
assert.match(html,/id="hcClosingAudio"[^>]+src="\.\/media\/HeartClear_DeepSleep_Stillness_2min_PREVIEW\.mp3"/);
assert.match(html,/id="hcClosingSoundStatus" role="status" aria-live="polite"/);
assert.match(html,/sw\.js\?v=288/);
assert.match(html,/HeartClear · HC v288/);
const completeStart=html.indexOf('function completeSession(completed=false){');
const completeEnd=html.indexOf('function friendlyDuration(',completeStart);
assert(completeStart>0&&completeEnd>completeStart);
const complete=html.slice(completeStart,completeEnd);
assert.match(complete,/show\('completion'\);\s*if\(completed\)hcTryAutoplayClosingSound\(\);/);
const begin=html.indexOf('let hcClosingAutoplayFallback=false;'),end=html.indexOf('function toggleReduceMotion(){',begin);
assert(begin>0&&end>begin);
const fragment=html.slice(begin,end);
async function verify(){
 const data=new Map(),updates=[];
 let played=0;
 const player={currentTime:18,play(){played++;return Promise.resolve()}};
 const switcher={setAttribute:(k,v)=>updates.push([k,v]),classList:{toggle(){}}};
 const status={textContent:''};
 const objects={hcClosingAudio:player,hcClosingAutoplaySwitch:switcher,hcClosingSoundStatus:status};
 const context={
  localStorage:{getItem:key=>data.has(key)?data.get(key):null,setItem:(key,v)=>data.set(key,v)},
  document:{getElementById:key=>objects[key]||null}
 };
 vm.createContext(context);
 vm.runInContext(fragment,context);
 assert.equal(vm.runInContext('hcClosingAutoplayEnabled()',context),false,'Off by default');
 vm.runInContext('hcTryAutoplayClosingSound()',context);
 assert.equal(played,0,'Never automatically play without explicit opt-in');
 vm.runInContext('hcToggleClosingAutoplay()',context);
 assert.equal(data.get('heartclearClosingAutoplay'),'1');
 assert(updates.some(pair=>pair[0]==='aria-checked'&&pair[1]==='true'));
 vm.runInContext('hcTryAutoplayClosingSound()',context);
 await Promise.resolve();
 assert.equal(played,1);assert.equal(player.currentTime,0);
 vm.runInContext('hcToggleClosingAutoplay()',context);
 assert.equal(data.get('heartclearClosingAutoplay'),'0');
 vm.runInContext('hcTryAutoplayClosingSound()',context);
 assert.equal(played,1,'Playback stays opt-in');
}
verify().then(()=>console.log('PASS: Opt-in aftercare sound gating, storage, accessibility, and original MP3')).catch(e=>{console.error(e);process.exitCode=1});
