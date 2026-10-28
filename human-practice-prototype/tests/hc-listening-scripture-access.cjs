'use strict';
// HeartClear — All Listening scripture routing regression.
// Run: node human-practice-prototype/tests/hc-listening-scripture-access.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const filename=path.join(__dirname,'..','hc-listening-hub-v254.js');
const source=fs.readFileSync(filename,'utf8');
new vm.Script(source,{filename});
const start=source.indexOf('function play(item){');
const end=source.indexOf('function synchronize(){',start);
assert(start>=0&&end>start,'Existing All Listening player handler found');
const playSource=source.slice(start,end);
assert(!playSource.includes("window.hcGitaHomeToggle?.(1)"),'No silent no-op Gita playback');
assert(playSource.includes("window.hcOpenGitaVoice(undefined,undefined,{autoplay:false});"),'Gita opens player with explicit no-autoplay');
assert(playSource.includes("if(!card||!playButton)throw Error"),'Genesis panel must exist before reporting it opened');
assert(!playSource.includes("Gita is playing in the HeartClear mini-player."),'Never claim Gita auto-start');
assert(source.includes("hcQuickPlaySound(item.key)"),'Existing native audio route preserved');
assert(source.includes("openBookAudio(lang,chapter)"),'Audiobook resume route preserved');
function run(item,{gita=true,genesis=true}={}){
 const events=[],messages=[];
 const targets={
  hcListening:{classList:{contains:()=>true}},
  hcGenesisCard:genesis?{scrollIntoView(x){events.push('scroll:'+x.block)}}:null,
  hcGenPlay:genesis?{focus(x){events.push('focus:'+x.preventScroll)}}:null
 };
 const window={show(x){events.push('show:'+x)}};
 if(gita)window.hcOpenGitaVoice=(...args)=>events.push('gita:'+args.length+':'+String(args[2]?.autoplay));
 const context={
  item,
  $:id=>targets[id]||null,
  window,
  requestAnimationFrame:cb=>cb(),
  say:msg=>messages.push(msg),
  renderGlobalMini:()=>events.push('mini')
 };
 // Compile handler as a declaration in this controlled mock environment.
 vm.runInNewContext(playSource+';play(item)',context,{timeout:1000});
 return {events,messages};
}
const gitaOk=run({kind:'gita',name:'Gita'});
assert(gitaOk.events.includes('gita:3:false'),'Gita opens saved chapter controls and does not autoplay');
assert(!gitaOk.messages.join(' ').includes('is playing'),'No invented playback state');
const gitaMissing=run({kind:'gita'},{gita:false});
assert.match(gitaMissing.messages.join(' '),/Unable to open/,'Missing Gita interface has honest fallback');
const genesisOk=run({kind:'bible',name:'Genesis'});
assert(genesisOk.events.includes('show:home'),'Bible card opens Home reader');
assert(genesisOk.events.includes('scroll:start')&&genesisOk.events.includes('focus:true'),'Genesis Listen control is made reachable');
const genesisMissing=run({kind:'bible'},{genesis:false});
assert.match(genesisMissing.messages.join(' '),/Unable to open/,'Missing Genesis player is not described as opened');
console.log('All Listening scripture access: PASS (Gita, Genesis, absent-player fallback, media contracts)');
