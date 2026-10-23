/* HeartClear v149 — compact mixer and clear, direct Sacred listening.
   Additive layout-only integration; does not alter music sources, mixer gain, stored progress or unrelated screens. */
(function(){
'use strict';
const screen=document.getElementById('soundLab');
const mix=document.getElementById('hcMixCard');
const layers=document.getElementById('hcMixLayers');
const routes=screen&&screen.querySelector('.hc-sound-routes');
if(!screen||!mix||!layers||!routes||document.getElementById('hcMixEditV149'))return;
const style=document.createElement('style');
style.textContent=[
'#soundLab .hc-sounds-header{padding:4px 1px 0}',
'#soundLab .hc-sounds-header .kicker{font-size:10px}',
'#soundLab .hc-sounds-header h2{font-size:25px;margin:2px 0}',
'#soundLab .hc-sounds-header p{font-size:12px;line-height:1.3}',
'#soundLab .hc-sound-routes{display:grid;grid-template-columns:1fr;gap:7px;margin:10px 0 2px}',
'#soundLab .hc-sound-routes button{border-radius:13px;padding:8px 11px;gap:11px;min-height:46px;position:relative;box-shadow:none;cursor:pointer}',
'#soundLab .hc-sound-routes button:first-child{min-height:59px;border:1px solid rgba(245,245,245,.7);background:#24333a;color:#fff}',
'#soundLab .hc-sound-routes button:first-child b{font-size:16px;line-height:1.3}',
'#soundLab .hc-sound-routes button:first-child small{font-size:12px;color:#e1e6e8}',
'#soundLab .hc-sound-routes button:first-child:after{content:"›";font-size:26px;color:white;margin-left:auto}',
'#soundLab .hc-sound-routes button:nth-child(2) b{font-size:13px}',
'#soundLab .hc-sound-routes button:nth-child(2) small{font-size:11px}',
'#soundLab .hc-route-icon{height:35px;width:35px;flex:none}',
'#soundLab .hc-sound-filters{padding:8px 0 7px;gap:5px}',
'#soundLab .hc-sound-filters button{min-height:36px;padding:7px 13px}',
'#hcMixCard{padding:12px!important;margin:2px 0 12px!important;border-radius:16px!important;box-shadow:none!important}',
'#hcMixCard>.kicker{display:none}',
'#hcMixCard .hc-mix-heading h3{font-size:18px;margin:0 0 3px}',
'#hcMixCard .hc-mix-heading p{font-size:11px;line-height:1.3}',
'#hcMixCard .hc-mix-symbol{height:31px;width:31px}',
'#hcMixCard .hc-mix-symbol svg{width:19px;height:19px}',
'#hcMixCard .hc-mix-layers{gap:5px;margin:8px 0 5px}',
'#hcMixCard .hc-mix-layer{min-height:39px;padding:5px 9px;gap:8px;grid-template-columns:minmax(94px,1fr) 1.2fr;border-radius:10px}',
'#hcMixCard .hc-mix-layer label{font-size:13px;gap:8px}',
'#hcMixCard .hc-mix-layer input[type=checkbox]{height:20px;width:20px}',
'#hcMixCard .hc-mix-layer input[type=range]{min-height:29px}',
'#hcMixCard:not(.hc-mix-expanded) .hc-mix-layer:not(:has(input[type=checkbox]:checked)){display:none!important}',
'#hcMixCard .hc-mix-status{font-size:11px;line-height:1.25;min-height:0;margin:5px 0 8px}',
'#hcMixCard #hcMixTimerChips{display:flex;gap:5px;flex-wrap:nowrap;margin:7px 0}',
'#hcMixCard #hcMixTimerChips button{min-height:36px;min-width:0;padding:6px 3px;font-size:11px}',
'#hcMixCard .hc-mix-actions{gap:7px}',
'#hcMixCard .hc-mix-actions button{min-height:42px;border-radius:10px;padding:8px 11px;font-size:13px}',
'#hcMixCard .hc-mix-recent{margin-top:6px}',
'#hcMixCard .hc-mix-recent button{padding:6px 9px;min-height:33px}',
'#hcMixCard .hc-mix-edit{border:1px solid rgba(230,238,240,.38);background:#1c323c;color:white;border-radius:9px;min-height:38px;padding:6px 12px;font:inherit;font-size:12px;font-weight:600;display:flex;gap:8px;justify-content:space-between;align-items:center;width:100%;cursor:pointer}',
'#soundLab #hcSacredQuickV149{border:1px solid #54616a;border-radius:14px;padding:11px;margin:5px 0 9px;background:#14252c}',
'#soundLab #hcSacredQuickV149[hidden]{display:none!important}',
'#soundLab #hcSacredQuickV149 .hc-short-title{font-size:12px;color:#d8e1e4;margin-bottom:8px}',
'#soundLab #hcSacredQuickV149 .hc-direct-list{display:grid;gap:6px}',
'#soundLab #hcSacredQuickV149 button{background:#223842;color:#fff;border:1px solid #5c707a;border-radius:11px;min-height:44px;padding:9px 10px;text-align:left;display:flex;justify-content:space-between;align-items:center;gap:8px;font:inherit;font-size:13px;cursor:pointer}',
'#soundLab #hcSacredQuickV149 button small{font-size:11px;color:#d7e0e3}',
'#soundLab #hcSacredQuickV149 button:focus-visible,#hcMixCard .hc-mix-edit:focus-visible{outline:2px solid white;outline-offset:3px}',
'#sacred .hc-sacred-instant{margin:11px 0 14px;display:grid;gap:7px}',
'#sacred .hc-sacred-instant button{width:100%;min-height:48px;border:1px solid rgba(230,240,245,.37);border-radius:12px;background:#132c39;color:white;padding:10px 12px;text-align:left;font:inherit;font-size:14px;display:flex;align-items:center;justify-content:space-between}',
'#sacred .hc-sacred-instant small{display:block;color:#bdcbd2;font-size:11px;margin-top:4px}',
'#sacred .hub-hero{padding-bottom:4px}',
'#sacred .hub-hero h2{font-size:25px}',
'#hcDriveMedia.hc-om-compact .hc-drive-shell{padding:12px 13px}',
'#hcDriveMedia.hc-om-compact .hc-drive-description{display:none}',
'#hcDriveMedia.hc-om-compact .hc-drive-long-info h2{font-size:22px;margin:5px 0}',
'#hcDriveMedia.hc-om-compact .hc-drive-type{font-size:11px;margin:3px 0}',
'#hcDriveMedia.hc-om-compact .hc-drive-actions{min-height:35px}',
'#hcDriveMedia.hc-om-compact .hc-drive-actions .hc-drive-mini-label{display:none}',
'#hcDriveMedia.hc-om-compact .hc-drive-video-wrap{max-width:100%;max-height:235px;margin:8px 0 5px}',
'#hcDriveMedia.hc-om-compact .hc-drive-video-wrap iframe{width:100%;height:100%}',
'#hcDriveMedia.hc-om-compact #hcDriveVideoStatus{font-size:12px}',
'#hcDriveMedia.hc-om-compact .hc-drive-source-details{font-size:11px}',
'#hcDriveMedia.hc-om-compact .hc-om-wave{display:flex;gap:5px;height:43px;align-items:center;justify-content:center;margin:8px 0 6px;background:#102731;border-radius:12px;border:1px solid #3e5966}',
'#hcDriveMedia.hc-om-compact .hc-om-wave i{width:3px;background:#dfb875;border-radius:6px;height:40%;display:block}',
'#hcDriveMedia.hc-om-compact .hc-om-wave i:nth-child(3n){height:78%}',
'#hcDriveMedia.hc-om-compact .hc-om-wave i:nth-child(4n){height:60%}',
'@media(max-width:355px){#hcMixCard .hc-mix-layer{grid-template-columns:minmax(82px,1fr) 1fr}#hcMixCard #hcMixTimerChips button{font-size:10px}#soundLab .hc-sound-routes button:first-child b{font-size:15px}}',
'@media(prefers-reduced-motion:reduce){#hcDriveMedia.hc-om-compact .hc-om-wave i{transition:none!important;animation:none!important}}'
].join('\n');
document.head.appendChild(style);
// Keep only chosen mixer layers visible; editing reveals all six without destroying sliders.
const edit=document.createElement('button');edit.type='button';edit.id='hcMixEditV149';edit.className='hc-mix-edit';
edit.setAttribute('aria-controls','hcMixLayers');
let editing=false;
function setEditing(v){editing=!!v;mix.classList.toggle('hc-mix-expanded',editing);edit.setAttribute('aria-expanded',String(editing));edit.textContent=editing?'Done · show selected layers':'＋ Add or change sounds';}
edit.addEventListener('click',()=>setEditing(!editing));
mix.insertBefore(edit,layers);
setEditing(false);
const mixHeading=mix.querySelector('.hc-mix-heading p');
if(mixHeading)mixHeading.textContent='Up to 3 sounds · separate volume';
const oldMixStatus=document.getElementById('hcMixStatus');
if(oldMixStatus&&oldMixStatus.textContent.includes('Choose 1'))oldMixStatus.textContent='Select sounds, then Start mix.';
// Make Sacred Listening visibly clickable, and open play buttons inline (not another screen).
const sacredButton=routes.querySelector('button:first-child');
const direct=document.createElement('section');direct.id='hcSacredQuickV149';direct.hidden=true;direct.setAttribute('aria-label','Sacred audio choices');
direct.innerHTML='<div class="hc-short-title">Choose and listen here · no extra menu</div><div class="hc-direct-list">'+
 '<button data-direct="mantra" type="button"><span>▶ Mantra Bed <small>8 min · real audio</small></span><span>Play</span></button>'+
 '<button data-direct="adhkar" type="button"><span>▶ Morning Adhkar <small>28 min · real audio</small></span><span>Play</span></button>'+
 '<button data-direct="allahu" type="button"><span>▶ Allahu Hu · Akmal <small>24 min · real audio</small></span><span>Play</span></button>'+
 '<button data-direct="om" type="button"><span>▷ OM Chanting <small>Drive video source · audio file needed</small></span><span>Open</span></button>'+
 '<button data-direct="library" type="button"><span>Sacred traditions & readings</span><span>›</span></button>'+
 '</div>';
routes.insertAdjacentElement('afterend',direct);
sacredButton.removeAttribute('onclick');
sacredButton.setAttribute('aria-expanded','false');sacredButton.setAttribute('aria-controls','hcSacredQuickV149');
sacredButton.setAttribute('aria-label','Sacred listening — show direct sound choices');
sacredButton.addEventListener('click',()=>{direct.hidden=!direct.hidden;sacredButton.setAttribute('aria-expanded',String(!direct.hidden));});
function playChoice(key){
 if(key==='mantra'){if(typeof hcMixStop==='function'&&(hcMixRunning||hcMixDecks.length))hcMixStop(false);hcQuickPlaySound('mantra');return;}
 if(key==='adhkar'){hcInlineToggleAdhkar();return;}
 if(key==='allahu'){if(typeof hcMixStop==='function'&&(hcMixRunning||hcMixDecks.length))hcMixStop(false);hcQuickPlaySound('allahuAkmal');return;}
 if(key==='om'){openHcDriveMedia('hinduOm');return;}
 if(key==='library'){show('sacred');return;}
}
direct.querySelectorAll('[data-direct]').forEach(b=>b.addEventListener('click',()=>playChoice(b.dataset.direct)));
// From the Sacred hub, provide playable recordings before deep tradition descriptions.
const sacred=document.getElementById('sacred'),hero=sacred&&sacred.querySelector('.hub-hero');
if(hero&&!document.getElementById('hcSacredInstantV149')){
 const quick=document.createElement('div');quick.id='hcSacredInstantV149';quick.className='hc-sacred-instant';
 quick.innerHTML='<button data-play="mantra"><span>▶ Mantra Bed <small>Native audio · 8 min</small></span>›</button>'+
 '<button data-play="adhkar"><span>▶ Morning Adhkar <small>Native audio · 28 min</small></span>›</button>'+
 '<button data-play="allahu"><span>▶ Allahu Hu · Akmal <small>Native audio · 24 min</small></span>›</button>'+
 '<button data-play="om"><span>▷ OM Chanting <small>Drive video recording · audio-only file not available</small></span>›</button>';
 hero.insertAdjacentElement('afterend',quick);
 quick.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>playChoice(b.dataset.play)));
 const grid=sacred.querySelector('.sacred-grid');
 if(grid)grid.setAttribute('aria-label','Explore traditions and readings');
}
// Existing OM is MP4; do not impersonate it as MP3. Open its existing preview directly and compactly.
const oldDrive=window.openHcDriveMedia;
if(typeof oldDrive==='function')window.openHcDriveMedia=function(key,from){
 const out=oldDrive(key,from),panel=document.getElementById('hcDriveMedia');
 if(panel){
  panel.classList.toggle('hc-om-compact',key==='hinduOm');
  if(key==='hinduOm'){
   const category=document.getElementById('hcDriveVideoCategory');
   if(category)category.textContent='OM · Listen from Drive video source';
   const status=document.getElementById('hcDriveVideoStatus');
   if(status)status.textContent='Tap Play inside the compact Drive preview if autoplay is blocked. Audio-only streaming needs an authorized MP3.';
   const target=panel.querySelector('.hc-drive-long-info');
   if(target&&!panel.querySelector('.hc-om-wave')){
    const waves=document.createElement('div');waves.className='hc-om-wave';waves.setAttribute('aria-hidden','true');
    for(let i=0;i<21;i++)waves.appendChild(document.createElement('i'));
    const video=panel.querySelector('.hc-drive-video-wrap');if(video)video.insertAdjacentElement('beforebegin',waves);
   }
  }
 }
 return out;
};
})();
