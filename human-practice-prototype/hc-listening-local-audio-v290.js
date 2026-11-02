/* HeartClear v290 — All Listening private native audio.
 * Only already-saved, authorized native MP3/WAV play in Listening.
 * Never prompt to upload a missing recording. Existing IndexedDB files use the EXISTING Sound Lab
 * HTMLAudioElement + universal mini-player (no second player or server upload).
 * Original HC_DRIVE_COLLECTIONS identifiers and dedicated archive stay intact.
 */
(function(){
  'use strict';
  const TRACK_PREFIX='hcLocalListening-';
  const DB_NAME='heartclear-local-listening-audio-v1';
  const STORE='audio';
  const POSITION_PREFIX='heartclearLocalListeningPositionV1:';
  const sources=new Map();
  let db=null;
  let loading=true;
  let lastSavedAt=0;

  function say(message){
    if(typeof window.hcListeningSay==='function')window.hcListeningSay(message);
  }
  function changed(){
    document.dispatchEvent(new Event('hc-local-listening-audio-changed'));
  }
  function itemFor(key){
    return typeof HC_DRIVE_COLLECTIONS!=='undefined'
      ?HC_DRIVE_COLLECTIONS.find(item=>item.key===key):null;
  }
  function keyFor(key){return TRACK_PREFIX+key;}
  function isPrivateKey(key){return typeof key==='string'&&key.startsWith(TRACK_PREFIX);}
  function has(key){return sources.has(key);}
  function isLoading(){return loading;}
  function playing(key){
    return currentSoundKey===keyFor(key)&&!soundLabAudio.paused;
  }
  function positionKey(key){return POSITION_PREFIX+key;}
  function getPosition(key){
    try{
      const saved=Number(localStorage.getItem(positionKey(key)));
      return Number.isFinite(saved)&&saved>=5?saved:0;
    }catch(e){return 0;}
  }
  function savePosition(force=false){
    if(!isPrivateKey(currentSoundKey)||!soundLabAudio||!soundLabTracks[currentSoundKey])return;
    if(soundLabAudio.getAttribute('src')!==soundLabTracks[currentSoundKey].url)return;
    const now=Date.now();
    if(!force&&now-lastSavedAt<4000)return;
    lastSavedAt=now;
    const key=currentSoundKey.slice(TRACK_PREFIX.length);
    const duration=Number(soundLabAudio.duration);
    const position=Number(soundLabAudio.currentTime)||0;
    if(position<5)return;
    if(Number.isFinite(duration)&&duration-position<4)return;
    try{localStorage.setItem(positionKey(key),String(position));}catch(e){}
  }
  function register(key,blob){
    const item=itemFor(key);
    if(!item||!(blob instanceof Blob))return false;
    const previous=sources.get(key);
    if(previous){
      if(currentSoundKey===keyFor(key)&&soundLabAudio.getAttribute('src')===previous){
        soundLabAudio.pause();
        soundLabAudio.removeAttribute('src');
        soundLabAudio.load();
      }
      URL.revokeObjectURL(previous);
    }
    const url=URL.createObjectURL(blob);
    sources.set(key,url);
    soundLabTracks[keyFor(key)]={
      title:item.name,
      desc:'Private MP3/WAV · this device only',
      url,
      duration:0
    };
    changed();
    return true;
  }
  function openDb(){
    return new Promise((resolve,reject)=>{
      if(!window.indexedDB)return reject(new Error('Local storage unavailable'));
      const request=indexedDB.open(DB_NAME,1);
      request.onupgradeneeded=()=>{
        if(!request.result.objectStoreNames.contains(STORE))
          request.result.createObjectStore(STORE);
      };
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error||new Error('Local storage unavailable'));
      request.onblocked=()=>reject(new Error('Local storage busy'));
    });
  }
  function read(key){
    return new Promise((resolve,reject)=>{
      const request=db.transaction(STORE,'readonly').objectStore(STORE).get(key);
      request.onsuccess=()=>resolve(request.result||null);
      request.onerror=()=>reject(request.error);
    });
  }
  function play(key){
    if(!sources.has(key)||!soundLabTracks[keyFor(key)])return false;
    if(hcDriveActiveKey)hcStopDriveVideo(true); // Close stale Drive iframe once.
    if(hcMixRunning||hcMixDecks.length)hcMixStop(false);
    const nativeKey=keyFor(key);
    const same=currentSoundKey===nativeKey&&
      soundLabAudio.getAttribute('src')===soundLabTracks[nativeKey].url;
    if(!same){
      const seek=getPosition(key);
      if(seek){
        const target=nativeKey;
        soundLabAudio.addEventListener('loadedmetadata',function restore(){
          if(currentSoundKey!==target)return;
          const duration=Number(soundLabAudio.duration);
          if(Number.isFinite(duration)&&seek<duration-4){
            try{soundLabAudio.currentTime=seek;}catch(e){}
          }
        },{once:true});
      }
    }
    // This is the existing full Sound Lab audio player, not an iframe or new player.
    const result=hcQuickPlaySound(nativeKey);
    if(result&&typeof result.catch==='function'){
      result.catch(()=>say('Audio could not start. Tap Play again.'));
    }
    say('Private audio · '+soundLabTracks[nativeKey].title+' · use the mini-player to pause or seek.');
    return true;
  }
  function chooseOrPlay(key){
    if(!itemFor(key))return false;
    if(loading){say('Restoring saved recordings.');return false;}
    // No file-picker or upload prompt: hide unavailable recordings until a verified
    // authorized native source is integrated in a separate scoped release.
    if(!has(key)){say('This recording is not available as audio yet.');return false;}
    return play(key);
  }
  soundLabAudio.addEventListener('timeupdate',()=>savePosition());
  soundLabAudio.addEventListener('pause',()=>{savePosition(true);changed();});
  soundLabAudio.addEventListener('play',changed);
  soundLabAudio.addEventListener('ended',()=>{
    if(!isPrivateKey(currentSoundKey))return;
    try{localStorage.setItem(positionKey(currentSoundKey.slice(TRACK_PREFIX.length)),'0');}catch(e){}
    changed();
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)savePosition(true);});
  window.addEventListener('pagehide',()=>savePosition(true));

  window.hcLocalListeningAudio={chooseOrPlay,has,isLoading,playing};
  (async()=>{
    try{
      db=await openDb();
      const entries=typeof HC_DRIVE_COLLECTIONS!=='undefined'?HC_DRIVE_COLLECTIONS:[];
      for(const item of entries){
        try{
          const saved=await read(item.key);
          if(saved?.blob instanceof Blob)register(item.key,saved.blob);
        }catch(e){}
      }
    }catch(e){
      // No IndexedDB: one-off audio selection still works during this page session.
    }finally{
      loading=false;
      changed();
    }
  })();
})();