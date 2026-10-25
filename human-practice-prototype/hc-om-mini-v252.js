/* HeartClear v252 — the original long OM recording in a compact audio-first dock.
   Never substitutes Mantra Bed or a different track. Google Drive MP4 streams may
   reject native audio playback; disclose the error and preserve in-app video fallback.
   The animated bars are a playback indicator, not an analysed audio waveform. */
(function(){
'use strict';
if(document.getElementById('hcOmMiniV252'))return;
const ID='11ogtK6FopRz-g8o-gHLY6-TV4fTJ5GjN';
const STORE='hcOmListeningV252';
const safeGet=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'null')||{}}catch(e){return {}}};
const save=(active=true)=>{try{localStorage.setItem(STORE,JSON.stringify({active,time:Number.isFinite(media.currentTime)?media.currentTime:0,at:Date.now()}))}catch(e){}};
let preferred=safeGet(),lastSavedTime=Number(preferred.time)||0;
let mode='idle',attempt=0,watchdog=0,playWanted=false,sourceIndex=-1;
let minimized=true;
const style=document.createElement('style');style.id='hcOmMiniStyleV252';
style.textContent=`
#hcOmMiniV252[hidden]{display:none!important}
#hcOmMiniV252{box-sizing:border-box;position:fixed;z-index:520;bottom:calc(98px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);width:min(432px,calc(100vw - 18px));padding:12px 13px;border:1px solid #9fa8ac;border-radius:22px;background:#0b1218;color:#fff;box-shadow:0 8px 35px #000a;font:14px/1.35 system-ui,-apple-system,Arial,sans-serif}
#hcOmMiniV252 *{box-sizing:border-box;min-width:0}
#hcOmMiniV252 .hcom-top{display:flex;gap:10px;align-items:center}
#hcOmMiniV252 .hcom-identity{flex:1;min-width:0}
#hcOmMiniV252 .hcom-identity strong{display:block;font-size:15px;line-height:1.25;white-space:normal}
#hcOmMiniV252 .hcom-identity small{display:block;margin-top:4px;color:#ccd4d8;font-size:12px}
#hcOmMiniV252 button{appearance:none;flex:none;width:43px;height:43px;min-height:43px!important;padding:0!important;border:1px solid #778b96;border-radius:12px;background:#192c38;color:#fff;font:700 20px system-ui;cursor:pointer;touch-action:manipulation}
#hcOmMiniV252 button#hcomToggle{width:48px;height:48px;border-color:#eee;background:#eee;color:#10202a;font-size:22px}
#hcOmMiniV252 .hcom-wave{display:flex;align-items:center;justify-content:center;gap:4px;height:35px;padding:5px 12px;margin:7px 0 4px;background:#12242c;border-radius:12px;overflow:hidden}
#hcOmMiniV252 .hcom-wave i{display:block;width:4px;flex:none;height:40%;border-radius:5px;background:#ddd;transform-origin:center}
#hcOmMiniV252 .hcom-wave i:nth-child(5n+1){height:28%}
#hcOmMiniV252 .hcom-wave i:nth-child(5n+2){height:80%}
#hcOmMiniV252 .hcom-wave i:nth-child(5n+3){height:55%}
#hcOmMiniV252 .hcom-wave i:nth-child(5n+4){height:100%}
#hcOmMiniV252[data-mode=playing] .hcom-wave i{animation:hcomPulse .65s ease-in-out infinite alternate}
#hcOmMiniV252[data-mode=playing] .hcom-wave i:nth-child(3n){animation-delay:-.27s}
#hcOmMiniV252[data-mode=playing] .hcom-wave i:nth-child(4n){animation-delay:-.48s}
@keyframes hcomPulse{from{transform:scaleY(.38)}to{transform:scaleY(1)}}
#hcOmMiniV252 .hcom-progress{display:flex;align-items:center;gap:8px;font-size:11px;color:#dae1e3;font-variant-numeric:tabular-nums}
#hcOmMiniV252 #hcomSeek{flex:1;min-width:0;max-width:100%;height:20px;accent-color:#eee}
#hcOmMiniV252 #hcomStatus{font-size:11px;color:#c5d2d7;margin-top:4px;min-height:15px;overflow-wrap:anywhere}
#hcOmMiniV252 .hcom-fallback{margin-top:7px;display:flex;justify-content:space-between;gap:8px}
#hcOmMiniV252 .hcom-fallback[hidden]{display:none!important}
#hcOmMiniV252 .hcom-fallback button{width:auto;height:auto;min-height:38px!important;padding:7px 12px!important;font:600 12px system-ui;color:#fff;background:#223b47}
#hcOmMiniV252 button:focus-visible,#hcOmMiniV252 input:focus-visible{outline:3px solid #fff!important;outline-offset:2px!important}
body.hc-om-mini-open #globalMini{display:none!important}
@media(prefers-reduced-motion:reduce){#hcOmMiniV252 .hcom-wave i{animation:none!important}}
@media(max-width:360px){#hcOmMiniV252{bottom:calc(91px + env(safe-area-inset-bottom,0px));padding:10px}#hcOmMiniV252 .hcom-identity strong{font-size:13px}#hcOmMiniV252 .hcom-wave{gap:3px}}
`;
document.head.append(style);
const dock=document.createElement('aside');
dock.id='hcOmMiniV252';dock.hidden=true;dock.dataset.mode='paused';
dock.setAttribute('role','region');dock.setAttribute('aria-label','OM Chanting and Singing Bowls audio mini player');
dock.innerHTML='<div class="hcom-top">'+
 '<div class="hcom-identity"><strong>OM Chanting &amp; Singing Bowls</strong><small>Original recording · 3:33:33</small></div>'+
 '<button type="button" id="hcomToggle" aria-label="Play OM Chanting">▶</button>'+
 '<button type="button" id="hcomClose" aria-label="Close OM player">×</button></div>'+
 '<div class="hcom-wave" aria-label="Audio playback indicator"></div>'+
 '<div class="hcom-progress"><span id="hcomElapsed">0:00</span><input id="hcomSeek" aria-label="OM recording position" type="range" min="0" max="12813" step="1" value="0" disabled><span id="hcomTotal">3:33:33</span></div>'+
 '<div id="hcomStatus" role="status" aria-live="polite">Tap Play to listen.</div>'+
 '<div class="hcom-fallback" id="hcomFallback" hidden><button type="button" id="hcomOriginal">Open original video here</button></div>';
document.body.append(dock);
const el=id=>document.getElementById(id);
const status=el('hcomStatus'),toggle=el('hcomToggle'),seek=el('hcomSeek'),fallback=el('hcomFallback');
const bars=dock.querySelector('.hcom-wave');
for(let i=0;i<22;i++)bars.append(document.createElement('i'));
const media=document.createElement('audio');media.id='hcOmNativeAudio';media.preload='none';media.playsInline=true;media.style.display='none';dock.append(media);
const sources=[
 'https://drive.usercontent.google.com/download?id='+encodeURIComponent(ID)+'&export=download&confirm=t',
 'https://drive.google.com/uc?export=download&id='+encodeURIComponent(ID)
];
const fmt=seconds=>{seconds=Math.max(0,Math.floor(Number(seconds)||0));let h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),s=seconds%60;return h?h+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'):m+':'+String(s).padStart(2,'0')};
function render(){
 dock.dataset.mode=mode;
 toggle.textContent=mode==='playing'?'Ⅱ':mode==='loading'?'…':'▶';
 toggle.disabled=mode==='loading';
 toggle.setAttribute('aria-label',mode==='playing'?'Pause OM Chanting':'Play OM Chanting');
 const total=Number.isFinite(media.duration)&&media.duration>0?media.duration:12813;
 seek.disabled=mode!=='playing'&&mode!=='paused';
 if(mode==='failed')seek.disabled=true;
 seek.max=String(Math.ceil(total));
 let sec=Number.isFinite(media.currentTime)&&media.currentTime>0?media.currentTime:lastSavedTime;
 seek.value=String(Math.min(Math.ceil(total),Math.floor(sec)));
 el('hcomElapsed').textContent=fmt(sec);
 el('hcomTotal').textContent=fmt(total);
 fallback.hidden=mode!=='failed';
}
function showDock(){
 dock.hidden=false;document.body.classList.add('hc-om-mini-open');render();
}
function preserve(){if(!dock.hidden)save(true)}
function stop(clear=true){
 playWanted=false;attempt++;clearTimeout(watchdog);media.pause();
 if(clear){media.removeAttribute('src');media.load();lastSavedTime=0}
 dock.hidden=true;document.body.classList.remove('hc-om-mini-open');
 if(clear){try{localStorage.removeItem(STORE)}catch(e){}}
 if(typeof renderGlobalMini==='function')try{renderGlobalMini()}catch(e){}
}
function setStatus(message,newMode){if(newMode)mode=newMode;status.textContent=message;render()}
function setSession(){
 if(!('mediaSession' in navigator)||typeof MediaMetadata==='undefined')return;
 try{
  navigator.mediaSession.metadata=new MediaMetadata({title:'OM Chanting & Singing Bowls',artist:'Original Drive recording · HeartClear'});
  navigator.mediaSession.setActionHandler('play',()=>{media.play().catch(()=>{})});
  navigator.mediaSession.setActionHandler('pause',()=>media.pause());
  navigator.mediaSession.setActionHandler('seekto',event=>{if(Number.isFinite(event.seekTime))media.currentTime=event.seekTime});
  navigator.mediaSession.setActionHandler('stop',()=>stop());
 }catch(e){}
}
function trySource(index,token){
 if(attempt!==token||!playWanted)return;
 if(index>=sources.length){
   playWanted=false;
   media.pause();media.removeAttribute('src');media.load();
   setStatus('Drive does not provide a playable audio stream for this recording. The original video is still available below.','failed');
   return;
 }
 let responded=false;
 clearTimeout(watchdog);
 media.pause();sourceIndex=index;media.src=sources[index];media.load();
 setStatus('Opening original audio…','loading');
 // Audio autoplay is attempted directly in the user gesture. Never claim it played unless "playing" fires.
 try{const p=media.play();if(p&&typeof p.catch==='function')p.catch(e=>{
   if(attempt!==token||responded)return;
   if(e?.name==='NotAllowedError'){playWanted=false;setStatus('Tap Play to allow audio on this device.','paused');return;}
   responded=true;trySource(index+1,token);
 });}catch(e){trySource(index+1,token);return}
 watchdog=setTimeout(()=>{
   if(attempt===token&&!responded&&mode==='loading'){responded=true;trySource(index+1,token)}
 },11000);
}
function start(){
 if(mode==='loading')return;
 if(mode==='playing'){
  media.pause();lastSavedTime=media.currentTime;save(true);
  setStatus('Paused · tap Play to continue.','paused');return;
 }
 if(mode==='paused'&&media.getAttribute('src')&&media.readyState>0){
  media.play().catch(()=>{attempt++;playWanted=true;trySource(0,attempt)});return;
 }
 if(mode==='failed'||!media.getAttribute('src')){attempt++;playWanted=true;setSession();showDock();trySource(0,attempt);return}
 playWanted=true;media.play().catch(()=>{attempt++;trySource(0,attempt)});
}
function openOm(){
 // Keep the exact original source; never substitute the 8-minute Mantra Bed.
 if(!dock.hidden){start();return}
 const old=safeGet();
 lastSavedTime=Math.max(0,Number(old.time)||lastSavedTime||0);
 showDock();start();
}
media.addEventListener('playing',()=>{
 clearTimeout(watchdog);
 if(lastSavedTime>3&&media.currentTime<2&&Number.isFinite(media.duration)&&lastSavedTime<media.duration-5){
   try{media.currentTime=lastSavedTime}catch(e){}
 }
 playWanted=true;setStatus('Playing · audio continues while you explore HeartClear.','playing');
 save(true);
});
media.addEventListener('pause',()=>{if(mode==='playing'){lastSavedTime=media.currentTime;save(true);setStatus('Paused · tap Play to continue.','paused')}});
media.addEventListener('timeupdate',()=>{if(media.currentTime>0)lastSavedTime=media.currentTime;render();if(Math.floor(media.currentTime)%4===0)preserve()});
media.addEventListener('loadedmetadata',render);
media.addEventListener('ended',()=>{playWanted=false;lastSavedTime=0;setStatus('Finished · replay when ready.','paused');save(true)});
media.addEventListener('error',()=>{if(mode==='loading'&&playWanted){const next=sourceIndex+1;attempt++;trySource(next,attempt)}});
toggle.addEventListener('click',start);
seek.addEventListener('input',()=>{if(Number.isFinite(media.duration)&&media.duration>0){media.currentTime=Number(seek.value);lastSavedTime=media.currentTime;preserve();render()}});
el('hcomClose').addEventListener('click',()=>stop(true));
el('hcomOriginal').addEventListener('click',()=>{stop(false);if(typeof window.hcOpenDriveDock==='function')window.hcOpenDriveDock('hinduOm','sacredDetail')});
document.addEventListener('play',e=>{if(e.target instanceof HTMLMediaElement&&e.target!==media&&!dock.hidden)stop(false)},true);
window.addEventListener('pagehide',preserve);
document.addEventListener('visibilitychange',()=>{if(document.hidden)preserve()});
const originalOm=window.hcOpenOmVoice;
window.hcOpenOmVoice=openOm;
window.hcOpenOmAudioMini=openOm;
// Capture the multiple existing controls, including the earlier non-window-scoped
// openHcDriveMedia() in the Sacred quick list, before legacy click handlers run.
document.addEventListener('click',event=>{
 const btn=event.target.closest?.('button');if(!btn)return;
 const direct=btn.matches('#hcSacredInstantV149 [data-play="om"],#hcSacredQuickV149 [data-direct="om"],#hcMantraHubV216 [data-mantra-drive="hinduOm"]');
 const card=btn.matches('#hcSacredDriveCards .hc-drive-card')&&btn.textContent.includes('OM Chanting');
 if(!direct&&!card)return;
 event.preventDefault();event.stopImmediatePropagation();openOm();
},true);
if(preferred.active&&lastSavedTime>2){
  showDock();setStatus('Saved position · tap Play to resume.','paused');
}
})();
