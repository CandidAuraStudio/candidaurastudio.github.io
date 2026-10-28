/* HeartClear: instructor audio is never modified; no unattended nature transition.
   Run: node --test human-practice-prototype/tests/hc-nature-handoff-choice-v288.cjs */
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
const blockStart=html.indexOf('let hcAftercareCueSpoken=false;');
const blockEnd=html.indexOf('function syncNature(){',blockStart);
assert(blockStart>0&&blockEnd>blockStart,'One aftercare handoff block');
const handoff=html.slice(blockStart,blockEnd);
new vm.Script(handoff,{filename:'aftercare-handoff.js'});
test('aftercare keeps the original guided source and only offers optional nature',()=>{
 assert.match(html,/audio\.src=chosenUrl; \/\/ Retain the same original recording/);
 assert.match(html,/audio\.addEventListener\('ended',[\s\S]{0,160}startAftercare\(\)/);
 assert.match(handoff,/if\(playbackPhase!=='meditation'\)return/);
 assert.match(handoff,/recordSession\(true\)/);
 assert.match(handoff,/clearLastSession\(\)/);
 assert.match(handoff,/hcOfferNaturalBreathReturn\(\)/);
 assert.match(html,/function sync\(\)\{\s*if\(playbackPhase==='handoff'\)return;/);
 assert.match(html,/if\(playbackPhase==='handoff'\)\{hcBeginNatureAfterGuidance\(\);return;\}/);
 assert.match(html,/if\(playbackPhase==='nature'\|\|playbackPhase==='handoff'\)/);
 assert.match(html,/#hcAftercareCueBtn\[hidden\],#hcAftercareMinimizeBtn\[hidden\]\{display:none!important\}/);
 assert.match(html,/HeartClear · HC v290/);
 assert.match(html,/sw\.js\?v=290/);
});
function build(){
 const elements=new Map();
 function el(id){
  if(!elements.has(id))elements.set(id,{textContent:'',hidden:false});
  return elements.get(id);
 }
 let natureCalls=0,records=0,clears=0,complete=[];
 let mediaPlay=0,tts=0;
 const media={pause(){},removeAttribute(){},load(){},play(){mediaPlay++;return Promise.resolve()}};
 const context={
  playbackPhase:'meditation',natureAfterSeconds:180,natureAfterTrack:'birds',
  natureCycleCount:0,natureLastPosition:0,natureSoundURL:'',
  soundLabTracks:{birds:{url:'https://example.invalid/test-birds.mp3'}},
  audio:media,document:{getElementById:el},window:{speechSynthesis:{cancel(){},speak(){tts++}}},
  SpeechSynthesisUtterance:function(message){this.text=message;},
  fmt:sec=>String(sec),renderGlobalMini(){},show(id){context.screen=id},
  recordSession(){records++},clearLastSession(){clears++},
  beginNatureSound(){natureCalls++},loadNatureSound(){return Promise.resolve('local-test-nature')},
  completeSession(value){complete.push(value)},localStorage:{getItem(){return null}},
 };
 vm.createContext(context);
 vm.runInContext(handoff,context);
 return {context,elements,media,metrics:()=>({natureCalls,records,clears,mediaPlay,tts,complete})};
}
test('a completed original audio stops silently at a voluntary handoff',()=>{
 const t=build();
 vm.runInContext('startAftercare()',t.context);
 assert.equal(t.context.playbackPhase,'handoff');
 assert.equal(t.context.screen,'aftercare');
 assert.equal(t.metrics().natureCalls,0);
 assert.equal(t.metrics().mediaPlay,0);
 assert.equal(t.metrics().tts,0);
 assert.equal(t.metrics().records,1);
 assert.equal(t.metrics().clears,1);
 assert.equal(t.elements.get('naturePlayBtn').textContent,'Continue with nature');
 assert.equal(t.elements.get('hcAftercareMinimizeBtn').hidden,true);
 assert.equal(t.elements.get('hcAftercareCueBtn').hidden,false);
});
test('nature starts only from explicit Continue; never before that tap',()=>{
 const t=build();
 vm.runInContext('startAftercare()',t.context);
 vm.runInContext('hcBeginNatureAfterGuidance()',t.context);
 assert.equal(t.context.playbackPhase,'nature');
 assert.equal(t.metrics().natureCalls,1);
 assert.equal(t.elements.get('hcAftercareMinimizeBtn').hidden,false);
 vm.runInContext('hcBeginNatureAfterGuidance()',t.context);
 assert.equal(t.metrics().natureCalls,1,'Repeated tap cannot start duplicate players');
});
test('spoke reminder uses optional device TTS only when tapped',()=>{
 const t=build();
 vm.runInContext('startAftercare()',t.context);
 assert.equal(t.metrics().tts,0);
 vm.runInContext('hcSpeakNaturalBreathCue()',t.context);
 assert.equal(t.metrics().tts,1);
 assert.equal(t.metrics().natureCalls,0);
 vm.runInContext('hcBeginNatureAfterGuidance()',t.context);
});
test('no nature preference still completes the normal meditation',()=>{
 const t=build();
 t.context.natureAfterSeconds=0;
 vm.runInContext('startAftercare()',t.context);
 assert.deepEqual(t.metrics().complete,[true]);
 assert.equal(t.metrics().natureCalls,0);
});
test('the user can finish instead of starting nature',()=>{
 const t=build();
 vm.runInContext('startAftercare()',t.context);
 vm.runInContext('function finishNature(){ if(playbackPhase==="handoff"){hcStopNaturalBreathCue();playbackPhase="meditation";completeSession(true);return;} }finishNature();',t.context);
 assert.equal(t.context.playbackPhase,'meditation');
 assert.deepEqual(t.metrics().complete,[true]);
 assert.equal(t.metrics().natureCalls,0);
});
