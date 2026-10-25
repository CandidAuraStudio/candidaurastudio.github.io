/* HeartClear native Reels progressive enhancement, review candidate v281.
 * Only verified MP4/WebM entries from the explicit manifest use HTML5.
 * Original Drive embeds and existing shuffle/history/navigation remain authoritative.
 */
(function(){
'use strict';
if(window.HCNativeReels)return;
const stage=document.getElementById('hcReelsStage'),frame=document.getElementById('hcReelFrame');
if(!stage||!frame)return;
const sources=new Map(),rejected=new Set();
let active=null,lastSwipe=0,lastWheel=0,touchStart=null,lastSavedAt=0;
const PROGRESS_KEY='heartclearReelsNativePositionsV1';
const MUTE_KEY='heartclearReelsNativeMutedV1';
const video=document.createElement('video');
video.id='hcReelNativeVideo';video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');
video.setAttribute('aria-label','HeartClear video reel');video.preload='metadata';video.hidden=true;
const preload=document.createElement('video');
preload.id='hcReelNativePreload';preload.preload='metadata';preload.muted=true;preload.hidden=true;
preload.setAttribute('playsinline','');preload.setAttribute('aria-hidden','true');
const controls=document.createElement('div');
controls.id='hcReelNativeControls';controls.className='hc-native-reel-controls';controls.hidden=true;
controls.setAttribute('role','group');controls.setAttribute('aria-label','Reel playback');
controls.innerHTML=
 '<div class="hc-native-reel-seek"><input id="hcReelNativeSeek" type="range" min="0" max="100" step=".1" value="0" aria-label="Seek within current reel"><output id="hcReelNativeTime">0:00 / 0:00</output></div>'+
 '<div class="hc-native-reel-actions"><button type="button" data-hcr="back" aria-label="Go back 10 seconds">−10</button><button type="button" data-hcr="play" aria-label="Play video">▶</button><button type="button" data-hcr="forward" aria-label="Go forward 10 seconds">+10</button><button type="button" data-hcr="mute" aria-label="Mute">♫</button><button type="button" data-hcr="fullscreen" aria-label="Fullscreen">⛶</button></div>'+
 '<span id="hcReelNativeMessage" class="hc-native-reel-message" role="status"></span>';
stage.append(video,preload,controls);
const $=id=>document.getElementById(id);
const playButton=controls.querySelector('[data-hcr=play]'),muteButton=controls.querySelector('[data-hcr=mute]');
const seek=$('hcReelNativeSeek'),label=$('hcReelNativeTime'),message=$('hcReelNativeMessage');
let muted=false;
try{muted=localStorage.getItem(MUTE_KEY)==='1'}catch(e){}
function format(t){const s=Math.max(0,Math.floor(Number(t)||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function positions(){
 try{const data=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}');return data&&typeof data==='object'&&!Array.isArray(data)?data:{}}catch(e){return {}}
}
function remember(done=false){
 if(!active)return;
 const time=Number(video.currentTime),items=positions();
 if(done)delete items[active.id];
 else if(Number.isFinite(time)&&time>=1)items[active.id]=Math.floor(time);
 try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(items))}catch(e){}
}
function status(text){message.textContent=text||''}
function update(){
 if(!active)return;
 playButton.textContent=video.paused?'▶':'Ⅱ';
 playButton.setAttribute('aria-label',video.paused?'Play video':'Pause video');
 muteButton.textContent=video.muted?'♫̸':'♫';
 muteButton.setAttribute('aria-label',video.muted?'Unmute video':'Mute video');
 const duration=Number.isFinite(video.duration)?video.duration:0;
 seek.value=duration>0?String(Math.min(100,100*(video.currentTime||0)/duration)):'0';
 label.textContent=format(video.currentTime)+' / '+format(duration);
}
function play(){
 if(!active)return;
 video.play().then(()=>{status('');update()}).catch(()=>{status('Tap Play to start video.');update()});
}
function pause(){if(active)video.pause()}
function toggle(){if(!active)return;if(video.paused)play();else pause()}
function advanceTime(delta){
 if(!active||!Number.isFinite(video.duration)||video.duration<=0)return;
 video.currentTime=Math.max(0,Math.min(video.duration,(video.currentTime||0)+delta));
 remember();update();
}
function fullscreen(){
 if(!active)return;
 if(document.fullscreenElement){document.exitFullscreen?.().catch(()=>{});return}
 stage.requestFullscreen?.().catch(()=>status('Fullscreen is unavailable here.'));
}
controls.addEventListener('click',event=>{
 const button=event.target.closest('button[data-hcr]');
 if(!button)return;
 switch(button.dataset.hcr){
  case 'back':advanceTime(-10);break;
  case 'forward':advanceTime(10);break;
  case 'play':toggle();break;
  case 'mute':
   video.muted=!video.muted;muted=video.muted;
   try{localStorage.setItem(MUTE_KEY,muted?'1':'0')}catch(e){}
   update();break;
  case 'fullscreen':fullscreen();break;
 }
});
seek.addEventListener('input',()=>{
 if(!active||!Number.isFinite(video.duration)||video.duration<=0)return;
 video.currentTime=Math.max(0,Math.min(video.duration,Number(seek.value)*video.duration/100));
 remember();update();
});
video.addEventListener('click',toggle);
video.addEventListener('play',update);
video.addEventListener('pause',()=>{remember();update()});
video.addEventListener('loadedmetadata',()=>{
 if(!active)return;
 const s=Number(positions()[active.id])||0;
 if(s>0&&Number.isFinite(video.duration)&&s<video.duration-2){
  try{video.currentTime=s}catch(e){}
 }
 update();
});
video.addEventListener('timeupdate',()=>{
 update();
 if(!active)return;
 const now=Date.now();if(now-lastSavedAt<5000)return;
 lastSavedAt=now;remember();
});
video.addEventListener('ended',()=>{
 if(!active)return;
 const cb=active.onEnded;
 remember(true);
 if(typeof cb==='function')cb();
});
video.addEventListener('error',()=>{
 if(!active)return;
 const {id,onError}=active;
 rejected.add(id);
 stop();
 if(typeof onError==='function')onError();
});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden&&active&&!video.paused)video.pause();
});
window.addEventListener('pagehide',()=>{if(active)remember()});
function validate(row,approvedIds){
 if(!row||!approvedIds.has(row.driveId)||!['video/mp4','video/webm'].includes(row.type))return null;
 try{
  const url=new URL(row.url,location.href);
  if(!['https:','http:'].includes(url.protocol))return null;
  if(url.protocol==='http:'&&!['localhost','127.0.0.1'].includes(url.hostname))return null;
  if(/(^|\.)drive\.google\.com$|(^|\.)drive\.usercontent\.google\.com$/i.test(url.hostname))return null;
  if(!/\.(mp4|webm)$/i.test(url.pathname))return null;
  if(row.type==='video/mp4'&&!/\.mp4$/i.test(url.pathname))return null;
  if(row.type==='video/webm'&&!/\.webm$/i.test(url.pathname))return null;
  return {url:url.href,type:row.type};
 }catch(e){return null}
}
let ready=false;
fetch('./hc-reels-direct-sources-v1.json?v=281',{cache:'no-store'})
 .then(r=>{if(!r.ok)throw Error('Manifest missing');return r.json()})
 .then(data=>{
  if(data?.schema!==1||!Array.isArray(data.items))return;
  const idSet=new Set((window.hcReelItemsForNative?.()||[]).map(x=>x.id));
  for(const row of data.items){
   const value=validate(row,idSet);
   if(value)sources.set(row.driveId,value);
  }
 }).catch(()=>{/* Failed catalogue must not replace working Drive clips. */})
 .finally(()=>{ready=true});
function sourceFor(item){return item&&!rejected.has(item.id)?sources.get(item.id):null}
function preloadNext(item){
 preload.pause();preload.removeAttribute('src');preload.load();
 if(navigator.connection?.saveData)return;
 const next=sourceFor(item);
 if(next){preload.src=next.url;preload.preload='metadata';preload.load()}
}
function start(item,nextItem,onEnded,onError){
 const source=sourceFor(item);
 if(!ready||!source)return false;
 stop();
 active={id:item.id,onEnded,onError};
 video.hidden=false;controls.hidden=false;stage.classList.add('hc-native-reel-mode');
 video.muted=muted;video.preload='auto';video.src=source.url;video.load();
 preloadNext(nextItem);
 status('');update();play();
 return true;
}
function stop(){
 if(active)remember();
 active=null;
 video.pause();video.removeAttribute('src');video.load();video.hidden=true;
 preload.pause();preload.removeAttribute('src');preload.load();
 controls.hidden=true;stage.classList.remove('hc-native-reel-mode');
 touchStart=null;
}
function handleSwipe(direction){
 if(!active)return;
 const now=Date.now();if(now-lastSwipe<440)return;lastSwipe=now;
 if(direction>0)window.hcReelNativeNext?.();
 else window.hcReelNativePrevious?.();
}
function gestureExcluded(target){return !!target?.closest?.('#hcReelNativeControls, #hcReelSwipeRail, button, input')}
stage.addEventListener('touchstart',event=>{
 if(!active||event.touches.length!==1||gestureExcluded(event.target)){touchStart=null;return}
 const t=event.touches[0];touchStart={x:t.clientX,y:t.clientY,at:Date.now()};
},{passive:true,capture:true});
stage.addEventListener('touchend',event=>{
 if(!active||!touchStart||!event.changedTouches.length)return;
 const t=event.changedTouches[0],dy=t.clientY-touchStart.y,dx=t.clientX-touchStart.x;
 const elapsed=Date.now()-touchStart.at;touchStart=null;
 if(elapsed>1600||Math.abs(dy)<62||Math.abs(dy)<Math.abs(dx)*1.25)return;
 handleSwipe(dy<0?1:-1);
},{passive:true,capture:true});
stage.addEventListener('touchcancel',()=>{touchStart=null},{passive:true});
stage.addEventListener('wheel',event=>{
 if(!active||gestureExcluded(event.target)||Math.abs(event.deltaY)<25)return;
 event.preventDefault();const now=Date.now();if(now-lastWheel<630)return;
 lastWheel=now;handleSwipe(event.deltaY>0?1:-1);
},{passive:false});
window.HCNativeReels={start,stop,isActive:()=>!!active,sourceFor,getStatus:()=>({ready,mapped:sources.size})};
})();