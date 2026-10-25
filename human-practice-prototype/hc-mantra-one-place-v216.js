/* HeartClear v216 — one Mantra & Chanting entrance, honest source labels.
   Does not turn a Drive MP4 into audio, imitate it with a shorter track,
   upload private files, or change the original Google Drive recording. */
(function(){
'use strict';
const screen=document.getElementById('soundLab');
const header=screen&&screen.querySelector('.hc-sounds-header');
if(!screen||!header||document.getElementById('hcMantraEntranceV216'))return;
const style=document.createElement('style');
style.textContent=[
 '#hcMantraEntranceV216{width:100%;min-height:66px;margin:14px 0 8px;padding:13px 16px;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid #aebcc5;border-radius:20px;background:#15222a;color:#fff;font:inherit;cursor:pointer}',
 '#hcMantraEntranceV216 strong{display:block;font-size:20px;line-height:1.2}',
 '#hcMantraEntranceV216 small{display:block;font-size:14px;color:#d2dce0;margin-top:4px}',
 '#hcMantraEntranceV216 .hc-mantra-arrow{font-size:27px}',
 '#hcMantraHubV216[hidden]{display:none!important}',
 '#hcMantraHubV216{display:grid;gap:12px;padding:4px 0 15px}',
 '#hcMantraHubV216 .hc-mantra-head{display:flex;align-items:center;gap:8px;justify-content:space-between}',
 '#hcMantraHubV216 h3{font-size:25px;line-height:1.2;margin:0}',
 '#hcMantraHubV216 .hc-mantra-back{border:1px solid #9aa6af;border-radius:12px;background:#17242c;color:#fff;font:inherit;padding:12px 14px;min-height:46px}',
 '#hcMantraHubV216 .hc-mantra-item{border:1px solid #637883;border-radius:18px;padding:14px 15px;background:#101e27;display:grid;gap:8px}',
 '#hcMantraHubV216 .hc-mantra-item h4{font-size:17px;line-height:1.3;margin:0;color:#fff}',
 '#hcMantraHubV216 .hc-mantra-item p{font-size:13px;line-height:1.4;margin:0;color:#cdd7dc}',
 '#hcMantraHubV216 .hc-mantra-item button,#hcMantraHubV216 .hc-mantra-item a{display:inline-flex;justify-content:center;align-items:center;min-height:48px;border:1px solid #fff;border-radius:15px;background:#fff;color:#101820;font:inherit;font-size:15px;font-weight:700;padding:9px 12px;text-decoration:none;text-align:center}',
 '#hcMantraHubV216 .hc-mantra-original button{background:#142630;color:#fff;border-color:#70828b;font-size:15px}',
 '#hcMantraHubV216 .hc-mantra-note{font-size:13px;color:#cdd8de;line-height:1.45;margin:0}',
 '#soundLab.hc-mantra-open > :not(.hc-sounds-header):not(#hcMantraEntranceV216):not(#hcMantraHubV216){display:none!important}',
 '#soundLab.hc-mantra-open #hcMantraEntranceV216{display:none}',
 '#hcMantraEntranceV216:focus-visible,#hcMantraHubV216 :is(button,a):focus-visible{outline:3px solid #fff;outline-offset:3px}',
  '#hcDriveMedia.hc-mantra-original-preview #hcDriveOpenSource{display:none!important}',
 '#hcDriveMedia.hc-mantra-original-preview .hc-drive-caution{display:none!important}',
 'body.hc-flow-enabled #soundLab.active.hc-mantra-open #hcMantraHubV216{gap:9px;padding:0 0 14px}',
 'body.hc-flow-enabled #soundLab.active.hc-mantra-open #hcMantraHubV216 .hc-mantra-item{min-height:0!important;padding:12px!important;border-radius:18px!important}',
 'body.hc-flow-enabled #soundLab.active.hc-mantra-open #hcMantraHubV216 .hc-mantra-item h4{font-size:17px!important;line-height:1.3!important}',
 'body.hc-flow-enabled #soundLab.active.hc-mantra-open #hcMantraHubV216 .hc-mantra-item p{font-size:14px!important;line-height:1.4!important;margin:0!important}',
 'body.hc-flow-enabled #soundLab.active.hc-mantra-open #hcMantraHubV216 .hc-mantra-item button{font-size:15px!important;min-height:48px!important;padding:9px 12px!important}',

'@media(prefers-reduced-motion:reduce){#hcMantraHubV216 *{scroll-behavior:auto!important;transition:none!important}}'
].join('\n');
document.head.appendChild(style);
const entrance=document.createElement('button');
entrance.type='button';entrance.id='hcMantraEntranceV216';
entrance.setAttribute('aria-controls','hcMantraHubV216');
entrance.setAttribute('aria-expanded','false');
entrance.innerHTML='<span><strong>Mantra &amp; Chanting</strong><small>All recordings in one place</small></span><span class="hc-mantra-arrow" aria-hidden="true">›</span>';
const hub=document.createElement('section');
hub.id='hcMantraHubV216';hub.hidden=true;
hub.setAttribute('aria-label','Mantra and chanting recordings');
hub.innerHTML=
 '<div class="hc-mantra-head"><h3>Mantra &amp; Chanting</h3><button type="button" class="hc-mantra-back" id="hcMantraBackV216">← Sounds</button></div>'+
 '<div class="hc-mantra-item hc-mantra-original"><h4>OM Chanting &amp; Singing Bowls · 3:33:33</h4><p>Full original recording · play inside HeartClear.</p><button type="button" data-mantra-drive="hinduOm">▶ Listen · 3h 33m</button></div>'+
 '<div class="hc-mantra-item"><h4>Mantra Bed · 8 min</h4><p>Separate short audio.</p><button type="button" data-mantra-play="mantra">▶ Play audio</button></div>'+
 '<div class="hc-mantra-item"><h4>Acoustic Bansuri · flute</h4><p>Instrumental audio.</p><button type="button" data-mantra-play="organicBansuri">▶ Play audio</button></div>'+
 '<div class="hc-mantra-item hc-mantra-original"><h4>Krishna Flute · 66 min</h4><p>Original video · play inside HeartClear.</p><button type="button" data-mantra-drive="hinduKrishnaFlute">▶ Listen here</button></div>'+
 '<p class="hc-mantra-note" role="status" id="hcMantraStatusV216">The full OM file is an MP4 with audio. A separate WAV or MP3 has not been published.</p>';
header.insertAdjacentElement('afterend',entrance);
entrance.insertAdjacentElement('afterend',hub);
function setOpen(on){
 const yes=!!on;
 screen.classList.toggle('hc-mantra-open',yes);
 hub.hidden=!yes;
 entrance.setAttribute('aria-expanded',String(yes));
}
function openHub(){
 // Never leave the 8-minute Gita/Mantra modal behind a second player.
 const gita=document.getElementById('hcGitaOriginalPanel');
 if(gita&&!gita.hidden){const close=document.getElementById('hcgClose');if(close)close.click();else gita.hidden=true;}
 if(typeof window.hcCloseOneTapDrive==='function')window.hcCloseOneTapDrive();
 if(typeof show==='function')show('soundLab');
 setOpen(true);
 window.scrollTo(0,0);
 return true;
}
entrance.addEventListener('click',openHub);
document.getElementById('hcMantraBackV216').addEventListener('click',()=>setOpen(false));
hub.querySelectorAll('[data-mantra-play]').forEach(button=>{
 button.addEventListener('click',()=>{
  const key=button.getAttribute('data-mantra-play');
  if(typeof hcQuickPlaySound!=='function'){
   document.getElementById('hcMantraStatusV216').textContent='Audio player unavailable. Try opening Sounds again.';
   return;
  }
  try{
   hcQuickPlaySound(key);
   document.getElementById('hcMantraStatusV216').textContent='Audio selected · use the mini-player below to pause or seek.';
  }catch(e){
   document.getElementById('hcMantraStatusV216').textContent='The recording could not start. Check the connection.';
  }
 });
});
const drive=window.openHcDriveMedia;
function hcPlayOriginalMantraVideo(key){
 if(typeof drive!=='function')return;
 const status=document.getElementById('hcMantraStatusV216');
 try{
  drive(key,'soundLab'); // HeartClear's EXISTING in-app player, not a new Drive tab.
  if(typeof hcDriveBackScreen!=='undefined')hcDriveBackScreen='soundLab';
  const panel=document.getElementById('hcDriveMedia');
  if(panel){
   panel.classList.toggle('hc-long-om-original',key==='hinduOm');
   panel.classList.add('hc-mantra-original-preview');
   const title=document.getElementById('hcDriveVideoTitle');
   if(title && key==='hinduOm')title.textContent='OM Chanting & Singing Bowls · 3:33:33';
   const meta=document.getElementById('hcDriveVideoCategory');
   if(meta)meta.textContent=key==='hinduOm'?'Full original recording · audio in MP4':'Original recording · audio in video';
   const state=document.getElementById('hcDriveVideoStatus');
   if(state)state.textContent='Listen inside HeartClear. Tap Play once if your browser requires it.';
  }
 }catch(e){
  if(status)status.textContent='Could not open the recording. Check your connection.';
 }
}
hub.querySelectorAll('[data-mantra-drive]').forEach(button=>{
 button.addEventListener('click',()=>hcPlayOriginalMantraVideo(button.getAttribute('data-mantra-drive')));
});
if(typeof drive==='function')window.openHcDriveMedia=function(key,from){
 if(key==='hinduOm'||key==='hinduKrishnaFlute')return hcPlayOriginalMantraVideo(key);
 const panel=document.getElementById('hcDriveMedia');
 if(panel)panel.classList.remove('hc-long-om-original','hc-mantra-original-preview');
 return drive.apply(this,arguments);
};
window.hcOpenOmVoice=()=>hcPlayOriginalMantraVideo('hinduOm');
window.hcOpenMantraHub=openHub;
})();