/* HeartClear v139 — compact Home audio, Reels shortcut, daily Qur'an recitation. */
(function(){
'use strict';
const home=document.getElementById('home'),start=home?.querySelector('.hc-simple-start'),nav=document.getElementById('bottomNav');
if(!home||!start||!nav||typeof hcQuickPlaySound!=='function')return;
const css=[
'#home .hc-v139-daily{margin:0 0 15px}',
'#home .hc-v139-label{font-size:11px;color:#bccdd3;font-weight:650;margin:0 0 8px}',
'#home .hc-v139-daily-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
'#home .hc-v139-daily-grid button{min-height:54px;border:1px solid rgba(232,243,248,.19);background:#0b2331;color:#f3f7f8;border-radius:13px;font:inherit;font-size:13px;font-weight:650;text-align:left;padding:9px 11px;display:flex;justify-content:space-between;align-items:center;gap:5px}',
'#home .hc-v139-daily-grid button span{font-size:16px;color:#fff}',
'#home .hc-v139-daily-grid button[aria-pressed=true]{border-color:#f5f5f0;background:#183749}',
'#home .hc-v139-daily-grid button:focus-visible,#home .hc-v139-quran button:focus-visible,#home .hc-v139-reels:focus-visible{outline:2px solid white;outline-offset:2px}',
'#home .hc-v139-continue .hc-home-primary{margin:0 0 13px}',
'#home .hc-v139-continue .hc-recommended-card,#home .hc-v139-continue .hc-primary-resume{padding:12px 14px;border-radius:16px;box-shadow:none}',
'#home .hc-v139-continue .hc-home-primary-btn,#home .hc-v139-continue .hc-primary-resume button{min-height:40px}',
'#home .hc-v139-reels{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;border:1px solid rgba(232,243,248,.22);border-radius:15px;background:#122d3c;color:#fff;padding:13px 15px;margin:14px 0 0;text-align:left;font:inherit;font-size:15px;font-weight:700}',
'#home .hc-v139-reels span:last-child{border-radius:50%;width:38px;height:38px;flex:none;background:#f5f5f0;color:#0b1d29;display:grid;place-items:center;font-size:17px}',
'#home .hc-v139-quran{margin:15px 0 0;border-top:1px solid rgba(230,240,245,.13);padding-top:13px;display:grid;gap:7px}',
'#home .hc-v139-quran button{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;min-height:44px;border:1px solid rgba(230,240,245,.18);background:#0b2331;border-radius:12px;color:#fff;font:inherit;text-align:left;font-size:13px;padding:9px 12px}',
'#home .hc-v139-quran button small{display:block;color:#aec3cc;font-size:11px;line-height:1.3;margin-top:3px}',
'#home .hc-v139-quran button strong{font-size:18px}',
'#home .hc-v139-secondary .hc-home-secondary-resumes{margin:10px 0}',
'@media(max-width:355px){#home .hc-v139-daily-grid button{padding:9px 8px;font-size:12px}}'
].join('\n');
const style=document.createElement('style');style.textContent=css;document.head.append(style);

// Start Reels in its immersive fullscreen reader, always reshuffling, including already-seen clips.
// Native autoplay inside the cross-origin Drive embed is best effort.
window.hcOpenReels=function(){
 const replay=typeof hcReelUnseenCount==='function'&&hcReelUnseenCount()===0;
 hcReelShuffle(replay);hcReelAutoload=true;hcPauseOtherAudioForReels();show('hcReels');
};
if(!nav.querySelector('[data-nav="hcReels"]')){
 const button=document.createElement('button');button.className='nav-item';button.type='button';
 button.dataset.nav='hcReels';button.setAttribute('aria-label','Reels — play full-screen');
 button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="3"/><path d="m10 8 6 4-6 4z"/></svg><span>Reels</span>';
 button.addEventListener('click',()=>hcOpenReels());
 nav.insertBefore(button,nav.querySelector('[data-nav="library"]'));
}

// Move saved progress and the hourly recommendation above the fold without duplicating pages.
const continueBox=document.createElement('div');continueBox.className='hc-v139-continue';
const primary=home.querySelector('.hc-home-primary');if(primary)continueBox.append(primary);
start.insertBefore(continueBox,start.querySelector('.hc-simple-audio-list'));
const recommended=home.querySelector('#homeRecommendedCard button');
if(recommended)recommended.onclick=()=>window.hcHomePlayGuidedByTitle(hcHomeRecommendedTitle);
const resumeMeditation=home.querySelector('#homeResumeCard button');
if(resumeMeditation)resumeMeditation.onclick=()=>window.hcHomeResumeMeditation();

const daily=document.createElement('section');daily.className='hc-v139-daily';
daily.setAttribute('aria-label','Morning, midday, evening and night meditation');
daily.innerHTML='<div class="hc-v139-label">Daily listening · one tap</div><div class="hc-v139-daily-grid">'+
 '<button type="button" data-hc-daily="wake">Morning <span>▶</span></button>'+
 '<button type="button" data-hc-daily="noon">Midday <span>▶</span></button>'+
 '<button type="button" data-hc-daily="evening">Evening <span>▶</span></button>'+
 '<button type="button" data-hc-daily="sleep">Night <span>▶</span></button></div>';
start.insertBefore(daily,start.querySelector('.hc-simple-audio-list'));
const titles={wake:'Deep Wake Up',noon:'Noon Reset',evening:'Evening Release',sleep:'Deep Sleep'};
function updateDaily(){
 const active=typeof audio!=='undefined'&&!audio.paused?audio:null;
 daily.querySelectorAll('[data-hc-daily]').forEach(b=>{
  const selected=!!active&&chosenKicker===titles[b.dataset.hcDaily];
  b.setAttribute('aria-pressed',String(selected));b.querySelector('span').textContent=selected?'Ⅱ':'▶';
 });
}
window.hcHomePlayGuided=function(key){
 if(!titles[key])return;
 try{
  if(typeof audio!=='undefined'&&chosenKicker===titles[key]&&audio.getAttribute('src')){
   if(audio.paused)audio.play().then(()=>{rememberActiveMedia('meditation');renderGlobalMini()}).catch(()=>{});
   else audio.pause();
  }else{
   hcSetAudioOnly(true);
   let last=null;try{last=JSON.parse(localStorage.getItem('clearWithinLastSession')||'null')}catch(e){}
   if(last?.kicker===titles[key]&&Number(last.time)>8&&Number(last.time)<Number(last.seconds)-3)continueLastSession();
   else hcStartExistingGuidedSession(key);
   show('home');
  }
  hcMiniPinnedKey='meditation';renderGlobalMini();updateDaily();
 }catch(e){const status=document.getElementById('hcQuickAudioStatus');if(status)status.textContent='Audio unavailable. Check your connection.'}
};
window.hcHomePlayGuidedByTitle=function(title){
 const entry=Object.entries(titles).find(x=>x[1]===title);
 if(entry)window.hcHomePlayGuided(entry[0]);
};
window.hcHomeResumeMeditation=function(){
 hcSetAudioOnly(true);continueLastSession();show('home');
 hcMiniPinnedKey='meditation';renderGlobalMini();updateDaily();
};
daily.querySelectorAll('[data-hc-daily]').forEach(b=>b.addEventListener('click',()=>window.hcHomePlayGuided(b.dataset.hcDaily)));
if(typeof audio!=='undefined')for(const event of ['play','pause','ended'])audio.addEventListener(event,updateDaily);
updateDaily();

// All original audiobooks, Sacred Sound and sound progress controls are retained.
const secondary=document.createElement('div');secondary.className='hc-v139-secondary';
const resumes=home.querySelector('.hc-home-secondary-resumes');
if(resumes){secondary.append(resumes);start.insertBefore(secondary,start.querySelector('.hc-simple-paths'))}
const reels=document.createElement('button');reels.type='button';reels.className='hc-v139-reels';
reels.innerHTML='<span>Reels <small style="display:block;font-size:11px;color:#bccdd3;font-weight:450;margin-top:3px">Full-screen · swipe to next</small></span><span aria-hidden="true">▶</span>';
reels.addEventListener('click',()=>hcOpenReels());start.insertBefore(reels,secondary);

// Play real recited surahs as native MP3 audio using the existing universal mini-player.
// Shuffle only the recommended chapter on refresh; preserve canonical verse order.
const chapters=[[1,'Al-Fatihah'],[36,'Ya-Sin'],[55,'Ar-Rahman'],[67,'Al-Mulk'],
 [112,'Al-Ikhlas'],[113,'Al-Falaq'],[114,'An-Nas']];
chapters.forEach(([n,label])=>{
 soundLabTracks['hcSurah'+n]={title:'Surah '+label,
  desc:'Arabic recitation · Mishary Rashid Alafasy · Al Quran Cloud',duration:0,
  url:'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/'+n+'.mp3'};
});
let lastNumber=0;try{lastNumber=Number(localStorage.getItem('hcQuranShuffleLastV1'))||0}catch(e){}
const choices=chapters.filter(([n])=>n!==lastNumber);
const [surahNumber,surahName]=choices[Math.floor(Math.random()*choices.length)]||chapters[0];
try{localStorage.setItem('hcQuranShuffleLastV1',String(surahNumber))}catch(e){}
const quran=document.createElement('div');quran.className='hc-v139-quran';
quran.innerHTML='<div class="hc-v139-label">Qur’an listening · Arabic audio</div>'+
 '<button type="button" id="hcV139MorningQuran"><span>Morning Qur’an<small>Al-Fatihah · listen</small></span><strong>▶</strong></button>'+
 '<button type="button" id="hcV139ShuffledQuran"><span>Surah for now<small></small></span><strong>▶</strong></button>'+
 '<button type="button" id="hcV139Adhkar"><span>Morning Adhkar<small>Supplications · 28 min</small></span><strong>▶</strong></button>';
start.insertBefore(quran,start.querySelector('.hc-simple-paths'));
quran.querySelector('#hcV139ShuffledQuran small').textContent='Surah '+surahName+' · new on refresh';
quran.querySelector('#hcV139MorningQuran').addEventListener('click',()=>hcQuickPlaySound('hcSurah1'));
quran.querySelector('#hcV139ShuffledQuran').addEventListener('click',()=>hcQuickPlaySound('hcSurah'+surahNumber));
quran.querySelector('#hcV139Adhkar').addEventListener('click',()=>{
 try{
  const t=hcGetAdhkarPosition();
  if(t>0)hcResumeAdhkar();else hcPlayAdhkar('listen');
  show('home');hcMiniPinnedKey='adhkar';renderGlobalMini();
 }catch(e){const st=document.getElementById('hcQuickAudioStatus');if(st)st.textContent='Morning Adhkar could not play.'}
});
if(typeof hcRenderSoundResume==='function')hcRenderSoundResume();
if(typeof renderDashboard==='function')renderDashboard();
if(typeof renderGlobalMini==='function')renderGlobalMini();
})();