/* HeartClear v174: one-tap native audio coordination and in-place Drive preview.
   A Google Drive iframe is video, not a reliable audio URL or an API-controlled player. */
(function(){
'use strict';
if(document.getElementById('hcOneTapDrive'))return;

const style=document.createElement('style');
style.textContent=[
'#hcOneTapDrive[hidden]{display:none!important}',
'#hcOneTapDrive{position:fixed;z-index:500;left:50%;bottom:calc(78px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(430px,calc(100vw - 20px));border:1px solid #777;border-radius:15px;padding:10px;background:#111;color:#fff;box-shadow:0 8px 40px rgba(0,0,0,.65);font:13px system-ui,-apple-system,Segoe UI,sans-serif}',
'#hcOneTapDrive *{box-sizing:border-box}',
'#hcOneTapDrive .hc-ot-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}',
'#hcOneTapDrive .hc-ot-head strong{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}',
'#hcOneTapDrive .hc-ot-close{width:38px;height:38px;border:1px solid #555;border-radius:9px;background:#222;color:#fff;font-size:22px;cursor:pointer}',
'#hcOneTapDrive iframe{display:block;width:100%;height:clamp(175px,45vw,225px);border:0;border-radius:9px;background:#000}',
'#hcOneTapDrive .hc-ot-foot{display:flex;align-items:center;gap:9px;justify-content:space-between;margin-top:7px;font-size:11px;color:#d0d0d0;line-height:1.3}',
'#hcOneTapDrive a{color:#fff;text-decoration:underline;white-space:nowrap}',
'#hcOneTapDrive :is(button,a):focus-visible{outline:2px solid white;outline-offset:2px}',
'body.hc-one-tap-drive-open #globalMini,body.hc-one-tap-drive-open #bookMini{display:none!important}',
'#bookMini{display:none!important}', /* Global mini is the one native audiobook controller. */
'@media(max-height:450px){#hcOneTapDrive{bottom:8px}#hcOneTapDrive iframe{height:140px}}'
].join('\n');
document.head.appendChild(style);

const dock=document.createElement('aside');
dock.id='hcOneTapDrive';
dock.hidden=true;
dock.setAttribute('role','region');
dock.setAttribute('aria-label','Google Drive video recording');
dock.innerHTML='<div class="hc-ot-head"><strong id="hcOtTitle"></strong><button type="button" class="hc-ot-close" id="hcOtClose" aria-label="Close Google Drive player">×</button></div>'+
'<iframe id="hcOtFrame" title="Google Drive video" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>'+
'<div class="hc-ot-foot"><span>Drive video · tap inside if autoplay is blocked</span><a id="hcOtSource" target="_blank" rel="noopener noreferrer">Open source ↗</a></div>';
document.body.appendChild(dock);
const frame=document.getElementById('hcOtFrame');
let activeDriveKey='';
function closeDrive(){
 if(!activeDriveKey)return;
 activeDriveKey='';
 frame.removeAttribute('src');
 dock.hidden=true;
 document.body.classList.remove('hc-one-tap-drive-open');
 if(typeof renderGlobalMini==='function')queueMicrotask(renderGlobalMini);
}
document.getElementById('hcOtClose').addEventListener('click',closeDrive);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&activeDriveKey){closeDrive();event.preventDefault();}});
function pauseNative(){
 try{if(typeof saveBookBookmark==='function')saveBookBookmark()}catch(e){}
 try{if(typeof hcStoreSoundLabPosition==='function')hcStoreSoundLabPosition()}catch(e){}
 try{if(typeof audio!=='undefined'&&audio?.currentTime>0&&typeof chosenUrl!=='undefined'&&chosenUrl&&typeof rememberLastSession==='function')rememberLastSession(audio.currentTime)}catch(e){}
 try{if(typeof hcMixStop==='function'&&typeof hcMixDecks!=='undefined'&&hcMixDecks.length)hcMixStop(false)}catch(e){}
 document.querySelectorAll('audio,video').forEach(el=>{if(!el.paused)try{el.pause()}catch(e){}});
}
const originalDrive=window.openHcDriveMedia;
window.openHcDriveMedia=function(key,sourceScreen){
 const items=typeof HC_DRIVE_COLLECTIONS==='undefined'?[]:HC_DRIVE_COLLECTIONS;
 const item=items.find(row=>row.key===key);
 if(!item)return;
 // Prefer the actual native recording: do not substitute an unrelated MP3.
 if(key==='islamHuAkmal'&&typeof hcQuickPlaySound==='function'){closeDrive();return hcQuickPlaySound('allahuAkmal');}
 if(key==='hinduOm'&&typeof window.hcOpenOmVoice==='function'){closeDrive();return window.hcOpenOmVoice();}
 if(typeof item.id!=='string'||!/^[-\w]+$/.test(item.id)){
  if(typeof originalDrive==='function')return originalDrive(key,sourceScreen);
  return;
 }
 closeDrive();
 pauseNative();
 try{if(typeof hcStopDriveVideo==='function')hcStopDriveVideo(true)}catch(e){}
 try{if(typeof hcStopCompactDriveAudio==='function')hcStopCompactDriveAudio()}catch(e){}
 activeDriveKey=key;
 document.getElementById('hcOtTitle').textContent=item.name;
 document.getElementById('hcOtSource').href='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/view';
 dock.hidden=false;
 document.body.classList.add('hc-one-tap-drive-open');
 frame.title=item.name+' (Google Drive video)';
 // No intermediate HeartClear screen, Begin button, or download-URL audio guess.
 frame.src='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/preview?autoplay=1';
};
const originalShow=window.show;
if(typeof originalShow==='function')window.show=function(id){
 closeDrive();
 if(id==='hcReels')pauseNative();
 return originalShow.apply(this,arguments);
};
const originalReels=window.hcOpenReels;
if(typeof originalReels==='function')window.hcOpenReels=function(){
 closeDrive();
 pauseNative();
 return originalReels.apply(this,arguments);
};

// Only one native programme at a time, except the intentional multi-layer nature mixer.
document.addEventListener('play',event=>{
 const target=event.target;
 if(!(target instanceof HTMLMediaElement))return;
 if(typeof hcMixDecks!=='undefined'&&hcMixDecks.some(deck=>deck.audio===target))return;
 closeDrive();
 try{if(typeof hcMixStop==='function'&&typeof hcMixDecks!=='undefined'&&hcMixDecks.length)hcMixStop(false)}catch(e){}
 document.querySelectorAll('audio,video').forEach(el=>{if(el!==target&&!el.paused)try{el.pause()}catch(e){}});
 queueMicrotask(()=>{
  if(target.paused)return;
  if(typeof getActiveMediaState==='function'){
   const selected=getActiveMediaState();
   if(selected&&selected.el===target){
    if(typeof hcMiniPinnedKey!=='undefined')hcMiniPinnedKey=selected.key;
    if(typeof rememberActiveMedia==='function')rememberActiveMedia(selected.key);
   }
  }
  if(typeof renderGlobalMini==='function')renderGlobalMini();
 });
},true);
for(const type of ['pause','ended']){
 document.addEventListener(type,event=>{
  if(!(event.target instanceof HTMLMediaElement))return;
  if(typeof renderGlobalMini==='function')queueMicrotask(renderGlobalMini);
 },true);
}

// OM and Gita already have real external audio players, but their open() step
// previously required a second tap on Play. Activate playback in the source tap.
function wrapNativeVoice(name){
 const original=window[name];
 if(typeof original!=='function')return;
 window[name]=function(){
  const result=original.apply(this,arguments);
  const button=document.getElementById('hcgPlay');
  if(button&&!button.disabled)button.click();
  return result;
 };
}
wrapNativeVoice('hcOpenOmVoice');
wrapNativeVoice('hcOpenGitaVoice');
window.hcCloseOneTapDrive=closeDrive;
})();
