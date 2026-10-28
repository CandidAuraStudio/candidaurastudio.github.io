/* HeartClear v289: private, device-only video shortcuts.
   Recordings are selected by their owner; no Drive links or video bytes are published. */
(function(){
  'use strict';
  const TRACKS=[
    {id:'deep-hold',title:'Deep Hold',duration:'17:11'},
    {id:'resilience',title:'Resilience · 5 Rounds',duration:'26:29'}
  ];
  const DB_NAME='heartclear-private-videos-v1';
  const STORE='recordings';
  const PROGRESS_PREFIX='heartclearPrivateVideoProgress:';
  const blobs=new Map();
  const urls=new Map();
  let db=null,active=null,pendingImport=null,lastSavedSecond=-1;
  let overlay,video,mini,miniPlay,status,title,miniTitle,fileInput,replaceButton;

  function track(id){return TRACKS.find(item=>item.id===id);}
  function notice(message){if(status)status.textContent=message;}
  function openDatabase(){
    return new Promise((resolve,reject)=>{
      if(!window.indexedDB){reject(new Error('Private device storage unavailable'));return;}
      const request=indexedDB.open(DB_NAME,1);
      request.onupgradeneeded=()=>{const database=request.result;if(!database.objectStoreNames.contains(STORE))database.createObjectStore(STORE);};
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(request.error||new Error('Private device storage unavailable'));
      request.onblocked=()=>reject(new Error('Private device storage blocked'));
    });
  }
  function storedGet(id){
    return new Promise((resolve,reject)=>{
      if(!db){resolve(null);return;}
      const request=db.transaction(STORE,'readonly').objectStore(STORE).get(id);
      request.onsuccess=()=>resolve(request.result||null);
      request.onerror=()=>reject(request.error);
    });
  }
  function storedPut(id,file){
    return new Promise((resolve,reject)=>{
      if(!db){reject(new Error('Local storage unavailable'));return;}
      const tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(file,id);
      tx.oncomplete=()=>resolve();
      tx.onabort=()=>reject(tx.error||new Error('Could not save this video'));
      tx.onerror=()=>reject(tx.error||new Error('Could not save this video'));
    });
  }
  function remember(){
    if(!active||!video)return;
    const position=Number.isFinite(video.currentTime)?video.currentTime:0;
    try{localStorage.setItem(PROGRESS_PREFIX+active,String(position));}catch(e){}
  }
  function savedPosition(id){
    try{const value=Number(localStorage.getItem(PROGRESS_PREFIX+id));return Number.isFinite(value)&&value>0?value:0;}catch(e){return 0;}
  }
  function pauseOtherMedia(){
    // Pause, NEVER reset other HeartClear sessions or their saved positions.
    document.querySelectorAll('audio,video').forEach(el=>{if(el!==video&&!el.paused)el.pause();});
  }
  function updateButtons(){
    document.querySelectorAll('[data-hc-private-video]').forEach(button=>{
      const info=track(button.dataset.hcPrivateVideo);
      if(!info)return;
      button.setAttribute('aria-label',(urls.has(info.id)?'Play or resume ':'Choose private video for ')+info.title);
      const indicator=button.querySelector('.hc-private-status');
      if(indicator)indicator.textContent=urls.has(info.id)?'Play':'Add once';
    });
  }
  function setSource(id){
    const src=urls.get(id);
    if(!src)return false;
    if(active!==id){
      remember();
      video.pause();
      active=id;
      video.src=src;
      video.load();
      title.textContent=track(id).title;
      miniTitle.textContent=track(id).title;
      lastSavedSecond=-1;
      const expected=id;
      video.addEventListener('loadedmetadata',function restore(){
        if(active!==expected)return;
        const position=savedPosition(expected);
        if(position>0&&Number.isFinite(video.duration)&&position<video.duration-5){
          try{video.currentTime=position;}catch(e){}
        }
      },{once:true});
    }
    return true;
  }
  function sync(){
    if(!video||!miniPlay)return;
    miniPlay.textContent=video.paused?'▶':'Ⅱ';
    miniPlay.setAttribute('aria-label',video.paused?'Resume private video':'Pause private video');
  }
  function showPlayer(){
    overlay.hidden=false;
    mini.hidden=true;
  }
  function playTrack(id){
    if(!track(id))return;
    if(!urls.has(id)){
      pendingImport=id;
      notice('Choose your saved video once. It stays on this device.');
      fileInput.click(); // Always inside the user's button click.
      return;
    }
    showPlayer();
    if(active===id&&!video.paused){sync();return;}
    if(!setSource(id))return;
    pauseOtherMedia();
    const playing=video.play();
    if(playing&&typeof playing.catch==='function')playing.catch(()=>{
      notice('Tap Play on the video to start.');
    });
    notice('Private listening · stored only in this browser on this device.');
    sync();
  }
  function minimize(){
    if(!active)return;
    remember();
    overlay.hidden=true;
    mini.hidden=false; // Keep the SAME media element alive; never restart playback.
    sync();
  }
  function closeAndPause(){
    remember();
    video.pause();
    overlay.hidden=true;
    mini.hidden=active===null;
    sync();
  }
  function button(tag,cls,text){
    const el=document.createElement(tag);
    el.className=cls;
    el.textContent=text;
    if(tag==='button')el.type='button';
    return el;
  }
  function makeInterface(){
    fileInput=document.createElement('input');
    fileInput.type='file';
    fileInput.accept='video/mp4,video/webm,video/quicktime,.mp4,.m4v,.mov,.webm';
    fileInput.hidden=true;
    fileInput.setAttribute('aria-label','Choose a private video stored on your device');
    document.body.append(fileInput);

    overlay=document.createElement('section');
    overlay.id='hcPrivateVideoOverlay';
    overlay.className='hc-private-overlay';
    overlay.hidden=true;
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-label','Private meditation video player');
    const panel=document.createElement('div');
    panel.className='hc-private-panel';
    const header=document.createElement('div');
    header.className='hc-private-heading';
    const labels=document.createElement('div');
    const caption=button('small','hc-private-eyebrow','AKMAL · PRIVATE LISTENING');
    title=button('h2','hc-private-title','Private video');
    labels.append(caption,title);
    const minimizeButton=button('button','hc-private-action','Minimize');
    minimizeButton.addEventListener('click',minimize);
    header.append(labels,minimizeButton);
    video=document.createElement('video');
    video.id='hcPrivateVideo';
    video.controls=true;
    video.playsInline=true;
    video.preload='metadata';
    video.setAttribute('aria-label','Private saved video');
    status=button('p','hc-private-message','Select a video from this device once.');
    status.setAttribute('role','status');
    const actions=document.createElement('div');
    actions.className='hc-private-actions';
    replaceButton=button('button','hc-private-action','Choose / replace file');
    replaceButton.addEventListener('click',()=>{
      if(!active)return;
      pendingImport=active;
      fileInput.click();
    });
    const pip=button('button','hc-private-action','Picture in picture');
    pip.addEventListener('click',async()=>{
      if(!document.pictureInPictureEnabled||!video.requestPictureInPicture){
        notice('Picture in picture is not supported by this browser.');return;
      }
      try{await video.requestPictureInPicture();minimize();}catch(e){notice('Picture in picture is unavailable here.');}
    });
    const exit=button('button','hc-private-action','Pause and close');
    exit.addEventListener('click',closeAndPause);
    actions.append(replaceButton,pip,exit);
    panel.append(header,video,status,actions);
    overlay.append(panel);
    document.body.append(overlay);

    mini=document.createElement('div');
    mini.id='hcPrivateVideoMini';
    mini.className='hc-private-mini';
    mini.hidden=true;
    miniTitle=button('button','hc-private-mini-title','Private video');
    miniTitle.addEventListener('click',showPlayer);
    miniPlay=button('button','hc-private-mini-play','▶');
    miniPlay.addEventListener('click',()=>{
      if(video.paused){pauseOtherMedia();video.play().catch(()=>{showPlayer();notice('Tap Play on the video.');});}
      else video.pause();
    });
    const expand=button('button','hc-private-mini-open','Open');
    expand.addEventListener('click',showPlayer);
    mini.append(miniTitle,miniPlay,expand);
    document.body.append(mini);

    fileInput.addEventListener('change',async()=>{
      const file=fileInput.files&&fileInput.files[0];
      const id=pendingImport;
      fileInput.value='';
      pendingImport=null;
      if(!file||!track(id))return;
      if(!file.type.startsWith('video/')&&!/\.(mp4|m4v|mov|webm)$/i.test(file.name)){
        notice('Please choose a video file.');return;
      }
      const old=urls.get(id);
      blobs.set(id,file);
      urls.set(id,URL.createObjectURL(file));
      if(old&&old!==urls.get(id))URL.revokeObjectURL(old);
      if(active===id){remember();active=null;}
      try{localStorage.removeItem(PROGRESS_PREFIX+id);}catch(e){}
      updateButtons();
      showPlayer();
      setSource(id);
      pauseOtherMedia();
      // This play request follows the file chooser gesture; user can also use native controls.
      video.play().catch(()=>notice('Video loaded. Tap Play to start.'));
      notice('Saving privately to this device…');
      try{
        await storedPut(id,file);
        notice('Saved on this device. Next time, one tap will play or resume it.');
      }catch(e){
        notice('Playing now, but this device could not save the file. You may need to choose it again after closing the app.');
      }
    });
    video.addEventListener('timeupdate',()=>{
      const sec=Math.floor(video.currentTime||0);
      if(sec!==lastSavedSecond&&sec%2===0){lastSavedSecond=sec;remember();}
    });
    video.addEventListener('pause',()=>{remember();sync();});
    video.addEventListener('play',()=>{pauseOtherMedia();sync();});
    video.addEventListener('ended',()=>{
      try{localStorage.setItem(PROGRESS_PREFIX+active,'0');}catch(e){}
      sync();
    });
    video.addEventListener('error',()=>notice('This video format could not be played on this device. Try MP4 (H.264/AAC).'));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)remember();});
    window.addEventListener('pagehide',remember);
    window.addEventListener('beforeunload',remember);
  }
  function addHome(){
    const hero=document.querySelector('#home .hc-path-hero');
    const home=document.getElementById('home');
    if(!home||document.getElementById('hcPrivateDeepHoldShortcut'))return;
    const card=button('button','hc-private-home-card','');
    card.id='hcPrivateDeepHoldShortcut';
    card.dataset.hcPrivateVideo='deep-hold';
    const mark=button('span','hc-private-home-icon','▶');
    const words=button('span','hc-private-home-words','');
    words.append(button('strong','','Deep Hold · Akmal special'),button('small','','17:11 · Private meditation'));
    const state=button('span','hc-private-status','Add once');
    card.append(mark,words,state);
    card.addEventListener('click',()=>playTrack('deep-hold'));
    if(hero)hero.after(card);
    else home.querySelector('.hc-simple-start')?.before(card);
  }
  function addMeditation(){
    const root=document.getElementById('practices');
    if(!root||document.getElementById('hcPrivateMeditationGroup'))return;
    const group=document.createElement('section');
    group.id='hcPrivateMeditationGroup';
    group.className='hc-practice-group';
    group.dataset.group='private';
    const heading=button('div','kicker hc-group-heading','YOUR PRIVATE VIDEOS · ON THIS DEVICE');
    const list=button('div','library-list','');
    TRACKS.forEach(info=>{
      const card=button('button','choice practice-card hc-shared-session','');
      card.dataset.hcPrivateVideo=info.id;
      card.dataset.kind='private';
      card.dataset.tags='deep breath human';
      const art=button('span','practice-art','');
      art.setAttribute('aria-hidden','true');
      art.append(button('span','hc-art-center','▶'));
      const copy=button('span','practice-copy','');
      copy.append(button('b','',info.title),button('small','','Private · add from device once'));
      const duration=button('span','duration',info.duration);
      const state=button('span','hc-private-status','Add once');
      card.append(art,copy,duration,state);
      card.addEventListener('click',()=>playTrack(info.id));
      list.append(card);
    });
    group.append(heading,list);
    const intro=root.querySelector('.hc-practice-intro');
    if(intro)intro.after(group);else root.prepend(group);
    if(typeof window.filterPractices==='function')window.filterPractices('all');
  }
  async function init(){
    makeInterface();
    addHome();
    addMeditation();
    try{
      db=await openDatabase();
      for(const info of TRACKS){
        try{
          const file=await storedGet(info.id);
          if(file instanceof Blob){
            blobs.set(info.id,file);
            urls.set(info.id,URL.createObjectURL(file));
          }
        }catch(e){}
      }
    }catch(e){notice('Device storage not available. You can still choose a video for this session.');}
    updateButtons();
  }
  // The Listening > Meditation rows call this same on-device player; no second media implementation.
  window.hcPrivatePlayTrack=playTrack;
  window.hcPrivateVideoReady=id=>urls.has(id);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();