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
'#hcOneTapDrive .hc-ot-close,#hcOneTapDrive .hc-ot-minimize{width:38px;height:38px;border:1px solid #555;border-radius:9px;background:#222;color:#fff;font-size:20px;cursor:pointer}',
'#hcOneTapDrive.hc-ot-collapsed{display:grid;grid-template-columns:112px minmax(0,1fr);grid-template-rows:auto 1fr;gap:7px;padding:8px;width:min(360px,calc(100vw - 20px));min-height:104px;bottom:calc(104px + env(safe-area-inset-bottom,0px));z-index:1200}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-head{grid-column:2;grid-row:1;margin:0;display:grid;grid-template-columns:minmax(0,1fr) 72px 32px;gap:4px;align-items:center}',
'#hcOneTapDrive.hc-ot-collapsed iframe{position:relative!important;grid-column:1;grid-row:1/3;display:block!important;width:112px!important;height:81px!important;min-height:81px!important;opacity:1!important;pointer-events:auto!important;border-radius:9px;background:#000}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-foot{display:none}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-head strong{font-size:11px;line-height:1.3;white-space:normal;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}',
'#hcOneTapDrive .hc-ot-restore-note{display:none}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-restore-note{grid-column:2;grid-row:2;display:block;margin:0;color:#dedede;font:500 11px/1.4 system-ui}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-resume{width:72px;height:38px;min-height:38px;padding:0 4px;border-radius:9px;font:700 11px system-ui;background:#fff;color:#111;border:1px solid #fff;cursor:pointer}',
'#hcOneTapDrive.hc-ot-collapsed .hc-ot-close{width:32px;height:38px;font:700 18px system-ui}',
'@media(max-width:350px){#hcOneTapDrive.hc-ot-collapsed{grid-template-columns:84px minmax(0,1fr)}#hcOneTapDrive.hc-ot-collapsed iframe{width:84px!important;height:75px!important;min-height:75px!important}#hcOneTapDrive.hc-ot-collapsed .hc-ot-head{grid-template-columns:minmax(0,1fr) 60px 30px}#hcOneTapDrive.hc-ot-collapsed .hc-ot-resume{width:60px}}',
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
dock.innerHTML='<div class="hc-ot-head"><strong id="hcOtTitle"></strong><button type="button" class="hc-ot-minimize" id="hcOtMinimize" aria-label="Minimize Google Drive player">−</button><button type="button" class="hc-ot-close" id="hcOtClose" aria-label="Stop and close Google Drive player">×</button></div>'+
'<iframe id="hcOtFrame" title="Google Drive video" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>'+
'<p class="hc-ot-restore-note" id="hcOtRestoreNote">Video minimized. Tap Resume to open the original controls.</p>'+
'<div class="hc-ot-foot"><span>Drive video · tap inside if autoplay is blocked</span><a id="hcOtSource" target="_blank" rel="noopener noreferrer">Open source ↗</a></div>';
document.body.appendChild(dock);
const frame=document.getElementById('hcOtFrame');
let activeDriveKey='';
const minimizeButton=document.getElementById('hcOtMinimize');
const restoreNote=document.getElementById('hcOtRestoreNote');
const DRIVE_RESUME_KEY='heartclearDriveLastOpenV1';
function storeDriveSelection(key){
 try{if(key)sessionStorage.setItem(DRIVE_RESUME_KEY,key);else sessionStorage.removeItem(DRIVE_RESUME_KEY)}catch(e){}
}
function safeDriveItem(key){
 const items=typeof HC_DRIVE_COLLECTIONS==='undefined'?[]:HC_DRIVE_COLLECTIONS;
 return items.find(item=>item.key===key&&typeof item.id==='string'&&/^[A-Za-z0-9_-]+$/.test(item.id))||null;
}
function setDriveMinimized(collapsed){
 if(!activeDriveKey)return;
 const isMinimized=!!collapsed;
 dock.classList.toggle('hc-ot-collapsed',isMinimized);
 // A different class prevents legacy Listening CSS from shrinking "Resume"
 // into its old 34px icon-only minimize button.
 minimizeButton.classList.toggle('hc-ot-minimize',!isMinimized);
 minimizeButton.classList.toggle('hc-ot-resume',isMinimized);
 minimizeButton.textContent=isMinimized?'Resume':'−';
 minimizeButton.setAttribute('aria-label',isMinimized?'Expand video to continue playing or seek':'Minimize video without closing it');
 minimizeButton.title=isMinimized?'Resume / expand this video':'Minimize; video stays visible in a small preview';
 if(restoreNote)restoreNote.textContent=frame.getAttribute('src')
   ?'Minimized · tap Resume for playback controls.'
   :'Tap Resume to reload this video. Position may not be saved.';
 if(isMinimized)dock.hidden=false;
}
function expandDrive(){
 if(!activeDriveKey)return;
 // Chrome may discard Drive iframes when a tab or app was backgrounded.
 // Reload only following the user's explicit Resume tap, never on pageshow.
 if(!frame.getAttribute('src')){
  const item=safeDriveItem(activeDriveKey);
  if(!item){closeDrive();return}
  frame.src='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/preview?autoplay=1';
 }
 dock.hidden=false;
 setDriveMinimized(false);
}
minimizeButton.addEventListener('click',()=>{
 if(dock.classList.contains('hc-ot-collapsed'))expandDrive();
 else setDriveMinimized(true);
});
function closeDrive(){
 if(!activeDriveKey)return;
 activeDriveKey='';
 storeDriveSelection('');
 frame.removeAttribute('src');
 dock.hidden=true;
 dock.classList.remove('hc-ot-collapsed');
 minimizeButton.classList.add('hc-ot-minimize');
 minimizeButton.classList.remove('hc-ot-resume');
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
 // OM uses this same stable embedded player; redirecting to hcOpenOmVoice loops back here.
 if(typeof item.id!=='string'||!/^[-\w]+$/.test(item.id)){
  if(typeof originalDrive==='function')return originalDrive(key,sourceScreen);
  return;
 }
 closeDrive();
 pauseNative();
 try{if(typeof hcStopDriveVideo==='function')hcStopDriveVideo(true)}catch(e){}
 try{if(typeof hcStopCompactDriveAudio==='function')hcStopCompactDriveAudio()}catch(e){}
 activeDriveKey=key;
 storeDriveSelection(key);
 document.getElementById('hcOtTitle').textContent=item.name;
 document.getElementById('hcOtSource').href='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/view';
 dock.hidden=false;
 setDriveMinimized(false);
 document.body.classList.add('hc-one-tap-drive-open');
 frame.title=item.name+' (Google Drive video)';
 // No intermediate HeartClear screen, Begin button, or download-URL audio guess.
 frame.src='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/preview?autoplay=1';
};
// Preserve the compact recovery control if Android temporarily suspends the page.
function restoreDriveDockVisibility(){
 if(!activeDriveKey)return;
 if(dock.hidden)dock.hidden=false;
 if(!frame.getAttribute('src')&&restoreNote){
  restoreNote.textContent='Tap Resume to reload the video. Position may not be saved.';
 }
}
window.addEventListener('pageshow',restoreDriveDockVisibility);
document.addEventListener('visibilitychange',()=>{
 if(!document.hidden)restoreDriveDockVisibility();
});
// A soft refresh preserves only the selected Drive key, never auto-starts audio.
try{
 const savedKey=sessionStorage.getItem(DRIVE_RESUME_KEY);
 const item=safeDriveItem(savedKey);
 if(item){
  activeDriveKey=item.key;
  document.getElementById('hcOtTitle').textContent=item.name;
  document.getElementById('hcOtSource').href='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/view';
  dock.hidden=false;
  document.body.classList.add('hc-one-tap-drive-open');
  setDriveMinimized(true);
 }
}catch(e){}

// Preserve a non-wrapped entry point for every later Sacred Sound integration.
window.hcOpenDriveDock=window.openHcDriveMedia;
const originalShow=window.show;
if(typeof originalShow==='function')window.show=function(id){
 // Ordinary in-app navigation keeps the original iframe mounted, minimizing its view.
 // Google Drive controls its own playback; browser background policies still apply.
 if(id==='hcReels'){closeDrive();pauseNative();}
 else if(activeDriveKey)setDriveMinimized(true);
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
  // Opening from All Listening shows the controls without starting audio.
  const opts=arguments.length?arguments[arguments.length-1]:null;
  const openOnly=!!(opts&&typeof opts==='object'&&opts.autoplay===false);
  const result=original.apply(this,arguments);
  const button=document.getElementById('hcgPlay');
  if(!openOnly&&button&&!button.disabled)button.click();
  return result;
 };
}
wrapNativeVoice('hcOpenOmVoice');
wrapNativeVoice('hcOpenGitaVoice');
window.hcCloseOneTapDrive=closeDrive;
})();
