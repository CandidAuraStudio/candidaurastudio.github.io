/* HeartClear v290 native Listening regression: no video popup or false Play label.
   Checks actual click-to-select then native audio playback with mocked browser primitives. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const hub=read('hc-listening-hub-v254.js');
const local=read('hc-listening-local-audio-v290.js');
const html=read('index.html');
const sw=read('sw.js');
const home=read('hc-home-visible-v268.js');
assert.doesNotThrow(()=>new vm.Script(hub));
assert.doesNotThrow(()=>new vm.Script(local));
assert.match(hub,/kind==='local-audio'/);
assert.match(hub,/hcLocalListeningAudio\.chooseOrPlay\(item\.key\)/);
assert.match(hub,/Add audio/);
assert.doesNotMatch(hub,/item\.kind==='drive'/);
assert.doesNotMatch(hub,/fn\(item\.key,'hcListening'\)/);
assert.doesNotMatch(hub,/openHcDriveMedia\(item\.key/);
assert.match(local,/hcQuickPlaySound\(nativeKey\)/);
assert.match(local,/indexedDB\.open\(DB_NAME,1\)/);
assert.match(local,/URL\.createObjectURL\(blob\)/);
assert.match(local,/window\.hcLocalListeningAudio=/);
assert.match(local,/soundLabAudio\.addEventListener\('timeupdate'/);
assert.doesNotMatch(local,/https?:\/\/|drive\.google|<iframe|window\.open\(/);
assert.doesNotMatch(local,/localStorage\.clear\(|caches\.delete\(/);
assert.match(html,/const HC_DRIVE_COLLECTIONS=/,'Original video identifiers remain in source archive');
assert.match(html,/kind:'local-audio'/,'Mini audio browser must use local audio, not Drive iframe');
assert.doesNotMatch(html,/else openHcDriveMedia\(item\.key\);/,'Mini listening must never open Drive video');
assert.match(html,/hc-listening-local-audio-v290\.js\?v=290/);
assert.match(html,/hc-listening-hub-v254\.js\?v=290/);
assert.match(html,/register\('\.\/sw\.js\?v=290'\)/);
assert.match(sw,/const APP_CACHE='heartclear-v291'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-listening-local-audio-v290\.js\?v=290/);
assert.match(home,/HeartClear · HC v290/);

async function checkClick(){
  const listeners={};
  const input={
    type:'',accept:'',hidden:false,value:'',files:[],
    setAttribute(){},
    addEventListener(type,fn){listeners[type]=fn;},
    click(){this.pickerClicks=(this.pickerClicks||0)+1;}
  };
  const document={
    body:{appendChild(element){assert.equal(element,input);}},
    createElement(tag){assert.equal(tag,'input');return input;},
    addEventListener(){},
    dispatchEvent(){}
  };
  const storage=new Map();
  const localStorage={
    getItem:key=>storage.get(key)||null,
    setItem:(key,value)=>storage.set(key,value),
    removeItem:key=>storage.delete(key)
  };
  const audioEvents={};
  const soundLabAudio={
    paused:true,currentTime:0,duration:150,
    getAttribute:()=>null,
    addEventListener:(name,fn)=>{(audioEvents[name]??=[]).push(fn);}
  };
  const soundLabTracks={};
  const played=[];
  const url={createObjectURL:()=>('blob:private-audio-only'),revokeObjectURL:()=>{}};
  const window={indexedDB:null,addEventListener(){},hcListeningSay:()=>{}};
  const context={
    document,window,localStorage,URL:url,Blob,Event,
    HC_DRIVE_COLLECTIONS:[{key:'islamSufiDrum',name:'Sufi Devotional Music · Frame Drum'}],
    soundLabTracks,soundLabAudio,
    currentSoundKey:'horizon',
    hcDriveActiveKey:null,
    hcMixRunning:false,hcMixDecks:[],
    hcQuickPlaySound:key=>{played.push(key);context.currentSoundKey=key;return Promise.resolve();},
    hcStopDriveVideo:()=>{throw Error('Should not open Drive video');},
    hcMixStop:()=>{},
    indexedDB:undefined,
    console
  };
  vm.runInNewContext(local,context);
  await new Promise(resolve=>setImmediate(resolve)); // IndexedDB unavailable -> session audio mode.
  const api=window.hcLocalListeningAudio;
  assert.equal(api.isLoading(),false);
  assert.equal(api.has('islamSufiDrum'),false);
  assert.equal(api.chooseOrPlay('islamSufiDrum'),true);
  assert.equal(input.pickerClicks,1,'First tap must request a real user file, not open Drive');

  const audioFile=new Blob([Buffer.from([0x49,0x44,0x33,0x00])],{type:'audio/mpeg'});
  audioFile.name='own.mp3';
  input.files=[audioFile];
  await listeners.change();
  assert.equal(api.has('islamSufiDrum'),true);
  assert.equal(played[0],'hcLocalListening-islamSufiDrum','Original sound player is called with actual local audio');
  assert.equal(soundLabTracks['hcLocalListening-islamSufiDrum'].url,'blob:private-audio-only');
  assert.equal(api.chooseOrPlay('islamSufiDrum'),true);
  assert.equal(played.length,2,'Second tap goes straight to existing player');
  assert.equal(input.pickerClicks,1,'Second tap must not re-open file picker');
}
checkClick().then(()=>console.log('PASS one-time private MP3 import, next-tap native playback, no Drive video, PWA contracts'))
.catch(error=>{console.error(error);process.exitCode=1;});
