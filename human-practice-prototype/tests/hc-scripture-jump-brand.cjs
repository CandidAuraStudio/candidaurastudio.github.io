/* HeartClear screenshot regression: Home scripture quick-jump and shared identity.
   Run: node human-practice-prototype/tests/hc-scripture-jump-brand.cjs
*/
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const source=fs.readFileSync(path.resolve(__dirname,'../hc-home-core-paths-v259.js'),'utf8');
const begin=source.indexOf(' function scriptureStatus(');
const end=source.indexOf('\n function make(',begin);
assert(begin>=0&&end>begin,'Scripture router functions must exist');
const fragment=source.slice(begin,end);
function run(key,{available=true,visible=true}={}){
 const calls={classic:0,show:0,scroll:0,focus:0,play:0,quranFallback:0,gitaFallback:0};
 const queue=[];
 const status={textContent:''};
 const home={classList:{contains:s=>s==='active'}};
 const focus={focus:({preventScroll})=>{assert.equal(preventScroll,true);calls.focus++}};
 const map={islam:['hcQuranFirst','hcqPlay'],bible:['hcGenesisCard','hcGenPlay'],hindu:['hcHinduHome',null]};
 const [id,control]=map[key];
 const target=available?{isConnected:true,getClientRects:()=>visible?[{}]:[],scrollIntoView:opts=>{assert.equal(opts.behavior,'auto');assert.equal(opts.block,'start');calls.scroll++},querySelector:()=>focus,contains:()=>true}:null;
 const document={getElementById:uid=>uid==='hcCorePathStatus'?status:uid===id?target:uid===control?focus:null};
 const window={hcBubbleHome:{classic:()=>calls.classic++},show:()=>calls.show++,
  hcOpenQuranStudy:()=>calls.quranFallback++,hcOpenGitaVoice:()=>calls.gitaFallback++};
 const context={window,document,home,requestAnimationFrame:fn=>queue.push(fn)};
 vm.runInNewContext(fragment+'\n go('+JSON.stringify(key)+');',context);
 assert.equal(calls.classic,1,'Must reset hidden Home mode once');
 assert.equal(calls.scroll,0,'Must not scroll while show() has not laid out');
 while(queue.length)queue.shift()();
 return {calls,status:status.textContent};
}
for(const key of ['islam','bible','hindu']){
 const {calls,status}=run(key);
 assert.equal(calls.scroll,1,key+' must visibly scroll to existing card');
 assert.equal(calls.focus,1,key+' must focus its original player control');
 assert.equal(calls.play,0,'Tap must never autoplay');
 assert.equal(calls.quranFallback+calls.gitaFallback,0);
 assert.match(status,/player ready/);
}
for(const key of ['islam','hindu']){
 const {calls}=run(key,{available:false});
 assert.equal(calls.scroll,0);
 assert.equal(key==='islam'?calls.quranFallback:calls.gitaFallback,1,'Fallback must open existing dedicated player');
}
assert.match(run('bible',{available:false}).status,/unavailable/);
assert.match(run('islam',{visible:false}).status,/study/);
assert(source.includes("const existingInfinity=document.getElementById('hcHomeInfinity')"),'Reuses original icon, not alternate image');
assert(source.includes("const eyebrow=document.getElementById('hcCinemaEyebrow')"),'Must brand existing hero, not add a competing header');
assert(source.includes("shared.id='hcScriptureSharedBrandCss'"),'Header design scoped and idempotent');
assert(!fragment.includes('.play('),'Quick jumps must not silently start playback');
console.log('PASS: 3 quick jumps, 3 fallbacks, no autoplay, shared infinity header');
