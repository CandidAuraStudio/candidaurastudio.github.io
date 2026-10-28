/* HeartClear listening-resume contract: syntax, coordinated offline shell and no-autoplay return. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const script=read('hc-listening-resume-v252.js');
const html=read('index.html');
const sw=read('sw.js');
new vm.Script(script,{filename:'hc-listening-resume-v252.js'});
assert(html.includes('HeartClear · HC v289'),'Settings must show coordinated release version');
assert(html.includes("register('./sw.js?v=289')"),'Worker URL must match release version');
assert(sw.includes("const APP_CACHE='heartclear-v289'"),'App shell cache must match version');
assert(sw.includes("const MEDIA_CACHE='heartclear-media-v1'"),'Downloaded media cache must not be replaced');
assert(html.includes('<script src="./hc-listening-resume-v252.js?v=289"></script>'),'Resume script must load');
assert(sw.includes("'./hc-listening-resume-v252.js?v=289'"),'Resume script must be available in offline shell');
assert(html.indexOf('hc-home-visible-v268.js?v=289')>=0,'New main home module must be retained');
assert(html.indexOf('hc-listening-hub-v254.js?v=280')>=0,'New main listening hub must be retained');
assert(html.indexOf('hc-flow-v220.js?v=285')>=0,'Latest bottom navigation must be retained');
assert(read('hc-home-visible-v268.js').includes('HeartClear · HC v289'),'Dynamic Settings label must match shell version');
assert(html.lastIndexOf('hc-listening-resume-v252.js?v=289')>html.lastIndexOf('hc-home-visible-v268.js?v=289'),'Resume must register after current navigation and home scripts');
assert(script.includes("const KEY='heartclearLastListeningV1'"),'Do not alter saved-progress key');
assert(script.includes('event.stopImmediatePropagation()'),'Headphones return should avoid competing old navigation');
const storage=new Map(),listeners={};
class MockNativeAudio{
 constructor(src=''){this.src=src;this.currentTime=0;this.duration=7205.198367;this.paused=true;}
 getAttribute(name){return name==='src'?this.src:''}
}
const longAudio=new MockNativeAudio();
let playingMedia=null,openedLong=0,restoredLong=0;
const soundLabTracks={islamDhir120:{url:'./media/voice/HeartClear_Islamic_Dhikr_Extended_120min_audio.m4a',duration:7205.198367}};

let openCount=0,playCount=0,seekCount=0;
const dock={
 attrs:{},handlers:{},
 setAttribute(key,value){this.attrs[key]=value},
 addEventListener(type,handler){this.handlers[type]=handler}
};
const audio={currentTime:0,duration:1698,play(){playCount++;return Promise.resolve()},getAttribute(key){return key==='src'?'original-source':''}};
const context={
 Date,Number,Math,Set,Object,JSON,
 localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,val)=>storage.set(key,val)},
 document:{getElementById:id=>id==='hcFlowDockListen'?dock:id==='adhkarAudio'?audio:id==='soundLabAudio'?longAudio:null,
 addEventListener(type,handler){listeners[type]=handler}},
 window:{openAdhkar(){openCount++},
   openSoundTrack(key){openedLong++;longAudio.currentTime=0;longAudio.src=soundLabTracks[key].url},
   addEventListener(){}},
 HTMLMediaElement:MockNativeAudio,
 soundLabTracks,
 getActiveMediaState(){return playingMedia},
 hcGetAdhkarPosition(){return 0},
 hcSeekRestored(el,time){
   if(el===audio){assert.equal(time,82.5);seekCount++}
   else if(el===longAudio){assert.equal(time,3600);longAudio.currentTime=time;restoredLong++}
   else throw Error('Unknown audio element for restored seek');
 },
 renderGlobalMini(){},
 hcMiniPinnedKey:null,
};
context.openAdhkar=(...args)=>context.window.openAdhkar(...args);
vm.runInNewContext(script,context,{timeout:3000});
assert.equal(openCount,0,'App load must not reopen or autoplay any media');
assert.equal(playCount,0,'App load must never start playback');
assert.equal(dock.attrs['aria-label'],'Listen');
assert.equal(typeof dock.handlers.click,'function','Headphones return click handler should exist');
storage.set('heartclearLastListeningV1',JSON.stringify({kind:'adhkar',title:'Morning Adhkar',time:82.5,at:Date.now()}));
let prevented=0,stopped=0;
dock.handlers.click({preventDefault(){prevented++},stopImmediatePropagation(){stopped++}});
assert.equal(openCount,1,'One headphone tap must reopen the previous session');
assert.equal(seekCount,1,'Reopened session must seek to saved timestamp');
assert.equal(prevented,1,'Old dock navigation must not override resume');
assert.equal(stopped,1,'Old dock handler must not run after resume');
assert.equal(playCount,0,'Headphone resume must remain paused');

assert(script.includes("if(p<1||"),'A zero-second preload/reset must not erase an unfinished bookmark');
assert(script.includes("const originalOpenSoundTrack=window.openSoundTrack"),'Original Sounds player must be reused');
assert(script.includes("el.getAttribute('src')===track.url"),'Resume must not seek into a different recording');
storage.set('heartclearLastListeningV1',JSON.stringify({
 kind:'soundlab',title:'Islamic Dhikr · Extended Playlist',track:'islamDhir120',time:3600,at:Date.now()
}));
context.window.openSoundTrack('islamDhir120');
assert.equal(openedLong,1,'Open the existing original track once');
assert.equal(restoredLong,1,'A two-hour track must seek to 60:00 before user presses Play');
assert.equal(longAudio.currentTime,3600,'Reopened native audio must not restart at 0:00');
assert.equal(playCount,0,'Opening saved audio must not autoplay');
longAudio.currentTime=0; // Android may temporarily report 0 during source reload.
playingMedia={key:'soundlab',el:longAudio,title:'Islamic Dhikr · Extended Playlist'};
listeners.play({target:longAudio}); // media play event fired before metadata/seek.
assert.equal(JSON.parse(storage.get('heartclearLastListeningV1')).time,3600,
 'A 0:00 play event must not overwrite 60:00 with zero');
listeners.pause({target:longAudio});
assert.equal(JSON.parse(storage.get('heartclearLastListeningV1')).time,3600,
 'An OS-induced pause at zero must not erase saved progress');
console.log('PASS: resumed headphones at saved position; native 2-hour sound retains bookmark on reset; no autoplay; v289/offline/main preservation contracts intact');

