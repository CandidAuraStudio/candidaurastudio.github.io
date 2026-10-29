'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const hub=fs.readFileSync(path.join(root,'hc-listening-hub-v254.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const handler=hub.slice(hub.indexOf('function play(item){'),hub.indexOf('function synchronize(){'));
function run(saved){
 const events=[],messages=[];
 const window={hcLocalListeningAudio:{has:()=>saved,chooseOrPlay:key=>events.push('local:'+key)},hcOpenDriveDock:key=>events.push('drive:'+key)};
 const context={window,item:{kind:'local-audio',key:'generalIndianRaga',name:'Indian Classical Raga'},$:()=>({classList:{contains:()=>true}}),say:m=>messages.push(m),renderGlobalMini(){}};
 vm.runInNewContext(handler+';play(item)',context);
 return {events,messages};
}
assert.deepEqual(run(false).events,['drive:generalIndianRaga'],'Missing local audio must open its original Drive source, never force a re-upload');
assert.deepEqual(run(true).events,['local:generalIndianRaga'],'An existing local recording must retain native playback');
// Exercise real mini-library listing and click handlers with a minimal DOM.
function element(){return {children:[],hidden:false,append(...items){this.children.push(...items)},appendChild(item){this.children.push(item)},replaceChildren(){this.children=[]},addEventListener(type,fn){this[type]=fn}}}
const rootElement=element(),events=[];
const nodes={hcMiniTrackList:rootElement,hcMiniSearch:{value:''}};
const context={
 document:{getElementById:id=>nodes[id],querySelectorAll:()=>[],createElement:element},
 window:{hcLocalListeningAudio:{has:()=>false,chooseOrPlay:key=>events.push('local:'+key)},hcOpenDriveDock:key=>events.push('drive:'+key)},
 HC_DRIVE_COLLECTIONS:[{key:'generalIndianRaga',name:'Indian Classical Raga',section:'general'}],
 hcSoundListKeys:[],soundLabTracks:{},hcMiniCategory:'raga',hcCloseMiniLibrary(){},renderGlobalMini(){}
};
const mini=html.slice(html.indexOf('function hcMiniBrowseItems(){'),html.indexOf('function hcMiniMove(direction){'));
vm.runInNewContext(mini+';hcRenderMiniLibrary()',context);
assert.equal(rootElement.children.length,1);
const row=rootElement.children[0];
assert.equal(row.children[1].textContent,'▶','Original Drive entry must show Play, not an upload icon');
assert.match(row.children[0].children[1].textContent,/Drive/,'Original source type must be explicit');
row.click();
assert.deepEqual(events,['drive:generalIndianRaga']);
console.log('PASS Drive fallback, saved native audio preference, mini-library label and routing');
