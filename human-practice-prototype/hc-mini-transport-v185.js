/* HeartClear v185 — one compact transport for every native audio source.
   The cross-origin Google Drive and Reels iframe players are not seekable here. */
(function(){
 'use strict';
 const mini=document.getElementById('globalMini');
 const previous=document.getElementById('hcMiniPrev');
 const next=document.getElementById('hcMiniNext');
 if(!mini||!previous||!next||document.getElementById('hcMiniSeek'))return;
 const style=document.createElement('style');
 style.textContent=`
 /* Allow the document to scroll through unused space around the fixed mini-player. */
 #globalMini{touch-action:pan-y;pointer-events:none;max-width:520px;margin:0 auto;flex-wrap:wrap;align-content:center}
 #globalMini :is(button,input){pointer-events:auto;touch-action:manipulation}
 #globalMini .global-mini-copy{touch-action:pan-y}
 #globalMini .hc-global-mini-progress{display:none!important}
 #globalMini .hc-mini-scrubber{display:flex;flex:0 0 100%;order:9;align-items:center;gap:8px;min-width:0;padding:2px 3px 1px}
 #globalMini .hc-mini-scrubber[hidden]{display:none!important}
 #globalMini .hc-mini-scrubber input[type=range]{width:100%;min-width:0;flex:1;height:23px;accent-color:#f1f1ec;cursor:pointer;touch-action:pan-x}
 #globalMini .hc-mini-scrubber time{flex:none;color:#b8c3c8;font-size:10px;font-variant-numeric:tabular-nums;min-width:32px;text-align:center}
 #globalMini #hcMiniSpeed{min-width:36px;min-height:30px;height:30px;padding:0 5px;border:1px solid #3d484e;border-radius:9px;background:#161d20;color:#fff;font:600 11px system-ui}
 #globalMini .hc-mini-track{font-size:12px!important;font-weight:650;font-variant-numeric:tabular-nums}
 #globalMini .global-mini-btn{min-height:38px}
 body.hc-mini-visible:not(.hc-reels-active) .app{padding-bottom:calc(var(--nav-h,68px) + var(--safe-bottom,0px) + 154px)}
 @media(max-width:360px){
  #globalMini .hc-mini-scrubber{gap:5px}
  #globalMini .hc-mini-scrubber time{font-size:9px;min-width:28px}
  #globalMini .hc-mini-track{min-width:32px}
  #globalMini .hc-mini-expand,#globalMini .global-mini-stop{min-width:29px}
 }
 `;
 document.head.appendChild(style);
 const row=document.createElement('div');
 row.className='hc-mini-scrubber';
 row.id='hcMiniSeek';
 const elapsed=document.createElement('time');elapsed.id='hcMiniElapsed';elapsed.textContent='0:00';
 const slider=document.createElement('input');
 slider.type='range';slider.min='0';slider.max='1000';slider.step='1';slider.value='0';
 slider.id='hcMiniSeekRange';slider.setAttribute('aria-label','Seek within this audio recording');
 const total=document.createElement('time');total.id='hcMiniTotal';total.textContent='0:00';
 const speed=document.createElement('button');speed.id='hcMiniSpeed';speed.type='button';speed.textContent='1×';
 speed.title='Playback speed';speed.setAttribute('aria-label','Playback speed 1 times');
 row.append(elapsed,slider,total,speed);
 mini.appendChild(row);
 let scrubbing=false;
 function state(){
  return typeof getActiveMediaState==='function'?getActiveMediaState():null;
 }
 function format(seconds){
  if(!Number.isFinite(seconds)||seconds<0)return '--:--';
  const value=Math.floor(seconds),m=Math.floor(value/60),s=value%60;
  return m+':'+String(s).padStart(2,'0');
 }
 function limit(media){
  const duration=Number(media?.duration);
  if(Number.isFinite(duration)&&duration>0)return duration;
  try{
   const seekable=media?.seekable;
   if(seekable?.length){
    const end=seekable.end(seekable.length-1);
    if(Number.isFinite(end)&&end>0)return end;
   }
  }catch(e){}
  return null;
 }
 function available(s){return !!s?.el && s.key!=='mix' && !s.el.error;}
 function seek(seconds){
  const s=state();if(!available(s))return false;
  const el=s.el,cap=limit(el);
  const current=Number(el.currentTime)||0;
  const target=Math.max(0,cap===null?seconds:Math.min(seconds,cap));
  if(!Number.isFinite(target))return false;
  try{
   // Native audio supports seeking; for unseekable streams browsers may ignore it.
   if(typeof el.fastSeek==='function'&&Math.abs(target-current)>1)el.fastSeek(target);
   else el.currentTime=target;
   if(s.key==='meditation'&&typeof sync==='function')sync();
   else if(s.key==='adhkar'&&typeof syncAdhkar==='function')syncAdhkar();
   else if(s.key==='soundlab'&&typeof syncSoundLab==='function')syncSoundLab();
   else if(s.key==='fear'&&typeof syncFear==='function')syncFear();
   else if(s.key==='book'&&typeof syncBookAudio==='function')syncBookAudio();
   if(typeof hcCaptureReturnState==='function')hcCaptureReturnState(true);
   update();return true;
  }catch(e){return false;}
 }
 function jump(seconds){
  const s=state();if(!available(s))return;
  seek((Number(s.el.currentTime)||0)+seconds);
 }
 previous.setAttribute('onclick','');
 next.setAttribute('onclick','');
 previous.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();jump(-15)},true);
 next.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();jump(15)},true);
 previous.textContent='−15';next.textContent='+15';
 for(const [el,label] of [[previous,'Rewind 15 seconds'],[next,'Fast forward 15 seconds']]){
  el.title=label;el.setAttribute('aria-label',label);
 }
 slider.addEventListener('input',()=>{
  scrubbing=true;
  const s=state(),duration=limit(s?.el);
  if(duration!==null)elapsed.textContent=format(duration*Number(slider.value)/1000);
 });
 slider.addEventListener('change',()=>{
  const s=state(),duration=limit(s?.el);
  if(duration!==null)seek(duration*Number(slider.value)/1000);
  scrubbing=false;update();
 });
 slider.addEventListener('blur',()=>{scrubbing=false;update()});
 const speeds=[1,1.25,1.5,2];
 speed.addEventListener('click',()=>{
  const s=state();if(!available(s))return;
  const rate=Number(s.el.playbackRate)||1;
  const nextRate=speeds[(speeds.findIndex(x=>x>=rate-.01)+1)%speeds.length]||1;
  try{s.el.playbackRate=nextRate}catch(e){return}
  update();
 });
 function update(){
  const s=state(),active=mini.classList.contains('show');
  document.body.classList.toggle('hc-mini-visible',active&&document.body.classList.contains('hc-reels-active')===false);
  if(!active)return;
  const enabled=available(s),duration=enabled?limit(s.el):null;
  const seekable=enabled&&duration!==null&&Number.isFinite(duration)&&duration>0;
  // 15-second relative skips can also work before duration metadata arrives.
  previous.disabled=next.disabled=!enabled;
  previous.textContent='−15';next.textContent='+15';
  previous.title='Rewind 15 seconds';next.title='Fast forward 15 seconds';
  previous.setAttribute('aria-label',previous.title);
  next.setAttribute('aria-label',next.title);
  row.hidden=!enabled;
  if(!enabled)return;
  slider.disabled=!seekable;
  const pos=Math.max(0,Number(s.el.currentTime)||0);
  total.textContent=format(duration);
  if(!scrubbing){
   elapsed.textContent=format(pos);
   slider.value=seekable?String(Math.max(0,Math.min(1000,Math.round(pos/duration*1000)))):'0';
  }
  const rate=Number(s.el.playbackRate)||1;
  speed.textContent=String(Number(rate.toFixed(2)))+'×';
  speed.setAttribute('aria-label','Playback speed '+rate+' times');
  speed.title='Playback speed '+rate+'×';
 }
 const oldRender=window.renderGlobalMini;
 if(typeof oldRender==='function')window.renderGlobalMini=function(){
  const result=oldRender.apply(this,arguments);
  update();return result;
 };
 // Text-only duration updates do not need to re-render all audio controls.
 document.addEventListener('timeupdate',e=>{if(e.target===state()?.el)update()},true);
 document.addEventListener('durationchange',e=>{if(e.target===state()?.el)update()},true);
 document.addEventListener('ratechange',e=>{if(e.target===state()?.el)update()},true);
 document.addEventListener('ended',e=>{if(e.target===state()?.el)update()},true);
 window.addEventListener('pageshow',update);
 window.addEventListener('scroll',update,{passive:true});
 window.hcMiniTransport={jump,seek,update};
 update();
})();
