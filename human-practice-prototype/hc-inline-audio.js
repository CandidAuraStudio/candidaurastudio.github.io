/* HeartClear · compact collection playback v137 */
(function(){
'use strict';
const css=[
'#hcCompactDock[hidden],#hcCompactFallback[hidden],#hcCompactTrack[hidden]{display:none!important}',
'#hcCompactDock{position:fixed;z-index:120;bottom:calc(87px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);width:min(450px,calc(100vw - 24px));padding:12px 14px;border-radius:19px;border:1px solid rgba(229,196,134,.38);background:linear-gradient(145deg,#102e40,#061923);color:#f3f5f6;box-shadow:0 15px 44px rgba(0,0,0,.6);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}',
'#hcCompactDock *{box-sizing:border-box}',
'#hcCompactDock .hc-small-row{display:flex;align-items:center;gap:10px}',
'#hcCompactDock .hc-small-name{flex:1;min-width:0}',
'#hcCompactDock strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:1.4}',
'#hcCompactDock small{display:block;font-size:11px;color:#bbc9cf;margin-top:3px}',
'#hcCompactDock .hc-small-btn{flex:0 0 40px;width:40px;height:40px;display:grid;place-items:center;padding:0;margin:0;border-radius:12px;border:1px solid rgba(230,185,107,.35);background:#19384b;color:#f4ca85;font:600 20px system-ui;box-shadow:none;cursor:pointer}',
'#hcCompactDock #hcCompactStop{background:transparent;color:#d6e1e6;font-size:25px}',
'#hcCompactDock .hc-small-btn:focus-visible{outline:2px solid #f4ca85;outline-offset:2px}',
'#hcCompactTrack{display:flex;align-items:center;gap:8px;margin-top:9px}',
'#hcCompactTrack span{font-size:10px;color:#c2cbd1;font-variant-numeric:tabular-nums}',
'#hcCompactSeek{flex:1;min-width:0;accent-color:#eabf7c;margin:0}',
'#hcCompactFallback{margin-top:8px}',
'#hcCompactFallback iframe{display:block;width:100%;height:146px;border:1px solid rgba(200,214,223,.2);border-radius:12px;background:#101b23;margin-top:7px}',
'body.hc-compact-open .app{padding-bottom:calc(190px + env(safe-area-inset-bottom,0px))}',
'@media(max-width:380px){#hcCompactDock{bottom:calc(78px + env(safe-area-inset-bottom,0px));padding:10px}#hcCompactDock .hc-small-btn{width:36px;height:36px;flex-basis:36px}}'
].join('\n');
const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
const dock=document.createElement('section');dock.id='hcCompactDock';dock.hidden=true;
dock.setAttribute('role','region');dock.setAttribute('aria-label','Small HeartClear audio player');
dock.innerHTML='<div class="hc-small-row"><div class="hc-small-name"><strong id="hcCompactTitle">Recording</strong><small id="hcCompactStatus" role="status" aria-live="polite">Loading…</small></div><button class="hc-small-btn" id="hcCompactToggle" type="button" aria-label="Pause recording">Ⅱ</button><button class="hc-small-btn" id="hcCompactStop" type="button" aria-label="Stop and close recording">×</button></div>'+
'<div id="hcCompactTrack"><span id="hcCompactElapsed">0:00</span><input id="hcCompactSeek" aria-label="Recording progress" type="range" min="0" max="1000" value="0" disabled><span id="hcCompactDuration">--:--</span></div>'+
'<div id="hcCompactFallback" hidden><small>Google Drive playback · tap Play below if needed.</small><iframe id="hcCompactFrame" title="Drive recording player" referrerpolicy="no-referrer" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe></div>';
document.body.appendChild(dock);
const get=id=>document.getElementById(id);
const status=get('hcCompactStatus'),toggle=get('hcCompactToggle'),track=get('hcCompactTrack'),seek=get('hcCompactSeek'),fallback=get('hcCompactFallback'),frame=get('hcCompactFrame');
const media=document.createElement('audio');media.preload='metadata';media.style.display='none';dock.appendChild(media);
let active=null,mode=null,ticket=0,timer=null;
function format(s){if(!Number.isFinite(s)||s<0)return '--:--';const n=Math.floor(s),m=Math.floor(n/60);return m>=60?Math.floor(m/60)+':'+String(m%60).padStart(2,'0')+':'+String(n%60).padStart(2,'0'):m+':'+String(n%60).padStart(2,'0')}
function progress(){const d=media.duration;get('hcCompactElapsed').textContent=format(media.currentTime||0);get('hcCompactDuration').textContent=format(d);seek.disabled=!(Number.isFinite(d)&&d>0);if(!seek.disabled)seek.value=String(Math.round(1000*(media.currentTime||0)/d))}
function state(playing){toggle.textContent=playing?'Ⅱ':'▶';toggle.setAttribute('aria-label',playing?'Pause recording':'Play recording');status.textContent=playing?'Playing':(media.ended?'Finished':'Paused')}
function cancelTimer(){if(timer!==null){clearTimeout(timer);timer=null}}
function stop(){ticket++;cancelTimer();media.pause();media.removeAttribute('src');media.load();frame.removeAttribute('src');active=null;mode=null;dock.hidden=true;fallback.hidden=true;track.hidden=false;toggle.hidden=false;document.body.classList.remove('hc-compact-open');if('mediaSession' in navigator)try{navigator.mediaSession.metadata=null}catch(e){}}
function drivePlayer(item,token){if(token!==ticket||!active||item.key!==active.key)return;cancelTimer();media.pause();media.removeAttribute('src');media.load();mode='drive';fallback.hidden=false;track.hidden=true;toggle.hidden=true;status.textContent='Drive player · controls below';frame.src='https://drive.google.com/file/d/'+encodeURIComponent(item.id)+'/preview?autoplay=1'}
function stopOtherAudio(){if(typeof hcStopDriveVideo==='function')hcStopDriveVideo(true);document.querySelectorAll('audio,video').forEach(el=>{if(el!==media&&!el.paused)el.pause()});if(typeof hcMixStop==='function'&&typeof hcMixRunning!=='undefined'&&hcMixRunning)hcMixStop(false)}
function mediaSession(item){if(!('mediaSession' in navigator)||typeof MediaMetadata==='undefined')return;try{navigator.mediaSession.metadata=new MediaMetadata({title:item.name,artist:'HeartClear · Sacred Sound'});navigator.mediaSession.setActionHandler('play',()=>{if(mode==='native')media.play().catch(()=>{})});navigator.mediaSession.setActionHandler('pause',()=>{if(mode==='native')media.pause()});navigator.mediaSession.setActionHandler('stop',stop);navigator.mediaSession.setActionHandler('seekto',e=>{if(mode==='native'&&Number.isFinite(media.duration))media.currentTime=e.seekTime})}catch(e){}}
function open(key){
 const item=(typeof HC_DRIVE_COLLECTIONS!=='undefined'?HC_DRIVE_COLLECTIONS:[]).find(x=>x.key===key);if(!item)return;
 if(active&&active.key===key){if(mode==='native'){if(media.paused)media.play().catch(()=>{});else media.pause()}return}
 stop();stopOtherAudio();active=item;mode='native';const token=++ticket;
 get('hcCompactTitle').textContent=item.name;status.textContent='Loading recording…';dock.hidden=false;document.body.classList.add('hc-compact-open');toggle.hidden=false;toggle.textContent='Ⅱ';toggle.setAttribute('aria-label','Pause recording');track.hidden=false;fallback.hidden=true;
 // Try native playback on the first tap; some Google Drive files do not expose a direct stream.
 media.src='https://drive.google.com/uc?export=download&id='+encodeURIComponent(item.id);media.load();mediaSession(item);
 media.play().catch(e=>{if(token!==ticket)return;if(e&&e.name==='NotAllowedError'){state(false);status.textContent='Tap Play to start'}else drivePlayer(item,token)});
 timer=setTimeout(()=>{if(token===ticket&&mode==='native'&&media.readyState<2&&!media.currentTime)drivePlayer(item,token)},10000);
}
media.addEventListener('playing',()=>{if(mode==='native'){cancelTimer();state(true)}});
media.addEventListener('pause',()=>{if(mode==='native')state(false)});
media.addEventListener('waiting',()=>{if(mode==='native')status.textContent='Buffering…'});
media.addEventListener('durationchange',progress);media.addEventListener('timeupdate',progress);
media.addEventListener('ended',()=>{if(mode==='native')state(false)});
media.addEventListener('error',()=>{if(active&&mode==='native')drivePlayer(active,ticket)});
toggle.addEventListener('click',()=>{if(mode!=='native'||!active)return;if(media.paused)media.play().catch(e=>{if(e&&e.name==='NotAllowedError')status.textContent='Tap Play again';else drivePlayer(active,ticket)});else media.pause()});
get('hcCompactStop').addEventListener('click',stop);
seek.addEventListener('input',()=>{if(mode==='native'&&Number.isFinite(media.duration)&&media.duration>0)media.currentTime=media.duration*Number(seek.value)/1000});
// Existing Sacred Sound and Practice buttons use this handler. Keep the current page.
window.openHcDriveMedia=function(key){open(key)};
window.hcStopCompactDriveAudio=stop;
})();
