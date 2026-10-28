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
'#home .hc-v139-quran .hc-v139-all-surahs{min-height:36px;padding:7px 12px;background:#0a1922;border-style:dashed}',
'#home .hc-v139-quran .hc-v139-all-surahs small{font-size:10px}',
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

// Keep existing Home sections where they were: do not reorder or expand them.
const recommended=home.querySelector('#homeRecommendedCard button');
if(recommended)recommended.onclick=()=>window.hcHomePlayGuidedByTitle(hcHomeRecommendedTitle);
const resumeMeditation=home.querySelector('#homeResumeCard button');
if(resumeMeditation)resumeMeditation.onclick=()=>window.hcHomeResumeMeditation();

const daily=document.createElement('section');daily.className='hc-v139-daily';
daily.setAttribute('aria-label','Morning, midday, evening and night meditation');
daily.innerHTML='<div class="hc-v139-label">Morning · Midday · Evening · Night</div><div class="hc-v139-daily-grid">'+
 '<button type="button" data-hc-daily="wake">Morning <span>▶</span></button>'+
 '<button type="button" data-hc-daily="noon">Midday <span>▶</span></button>'+
 '<button type="button" data-hc-daily="evening">Evening <span>▶</span></button>'+
 '<button type="button" data-hc-daily="sleep">Night <span>▶</span></button></div>';
start.querySelector('.hc-simple-audio-list').after(daily);
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
  // The explicit Begin tap should keep the chosen track accessible even if
  // browser autoplay rejects play(): preserve the paused track in the mini.
  if(typeof audio!=='undefined'&&audio.getAttribute('src'))rememberActiveMedia('meditation');
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

// Leave saved audiobook, Sounds, and Adhkar progress in the original expandable section.
// Reels is already visible in the bottom navigation and Explore row; do not duplicate a large card.

// Play real recited surahs as native MP3 audio using the existing universal mini-player.
// Shuffle only the recommended chapter on refresh; preserve canonical verse order.
const knownSurahs={1:'Al-Fatihah',2:'Al-Baqarah',3:'Ali Imran',18:'Al-Kahf',
 36:'Ya-Sin',55:'Ar-Rahman',67:'Al-Mulk',112:'Al-Ikhlas',113:'Al-Falaq',114:'An-Nas'};
// All 114 Surahs use the provider's whole-Surah files: genuine Arabic recitation,
// one consistent reciter, canonical chapter and verse order, with no synthetic effects.
const chapters=Array.from({length:114},(_,i)=>[i+1,knownSurahs[i+1]||String(i+1)]);
chapters.forEach(([n,label])=>{
 soundLabTracks['hcSurah'+n]={title:'Surah '+label,
  desc:'Arabic recitation · Mishary Rashid Alafasy · Al Quran Cloud · 128 kbps',duration:0,
  url:'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/'+n+'.mp3'};
});
// Load the official chapter names when online; audio remains available even if names fail.
fetch('https://api.alquran.cloud/v1/surah',{headers:{Accept:'application/json'}})
 .then(response=>{if(!response.ok)throw Error('Names unavailable');return response.json()})
 .then(result=>{
   const names=result?.data;if(!Array.isArray(names))return;
   names.forEach(ch=>{
     const n=Number(ch.number),name=String(ch.englishName||'').trim();
     if(n<1||n>114||!name||!soundLabTracks['hcSurah'+n])return;
     soundLabTracks['hcSurah'+n].title='Surah '+name;
     if(n===surahNumber){
       const caption=quran.querySelector('#hcV139ShuffledQuran small');
       if(caption)caption.textContent='Surah '+name+' · new on refresh';
     }
     if(currentSoundKey==='hcSurah'+n){
       const el=document.getElementById('soundLabTitle');if(el)el.textContent='Surah '+name;
     }
   });
   if(typeof hcRenderMiniLibrary==='function'&&!document.getElementById('hcMiniLibrary')?.hidden)hcRenderMiniLibrary();
   if(typeof renderGlobalMini==='function')renderGlobalMini();
   if(/^hcSurah\d+$/.test(currentSoundKey)&&typeof setSoundLabMediaSession==='function')setSoundLabMediaSession();
 }).catch(()=>{ /* Keep offline numeric names; audio is online-only. */ });
window.hcPlayQuranSurah=function(n){
 const number=Number(n),key='hcSurah'+number;
 if(!Number.isInteger(number)||number<1||number>114||!soundLabTracks[key])return;
 // Recitations form a continuous listening collection, independent of nature sound loops.
 if(!soundLabAutoNext){
   soundLabAutoNext=true;
   try{localStorage.setItem('heartclearAutoNext','1')}catch(e){}
   updateSoundLabQueueStatus();
 }
 hcQuickPlaySound(key);
};
let lastNumber=0;try{lastNumber=Number(localStorage.getItem('hcQuranShuffleLastV1'))||0}catch(e){}
const choices=chapters.filter(([n])=>n!==lastNumber);
const [surahNumber,surahName]=choices[Math.floor(Math.random()*choices.length)]||chapters[0];
try{localStorage.setItem('hcQuranShuffleLastV1',String(surahNumber))}catch(e){}
const quran=document.createElement('details');quran.className='hc-v139-quran';
quran.innerHTML='<summary>Qur’an audio · Morning &amp; Surah <span aria-hidden="true">⌄</span></summary>'+
 '<button type="button" id="hcV139MorningQuran"><span>Morning Qur’an<small>Al-Fatihah · listen</small></span><strong>▶</strong></button>'+
 '<button type="button" id="hcV139ShuffledQuran"><span>Surah for now<small></small></span><strong>▶</strong></button>'+
 '<button type="button" id="hcV139Adhkar"><span>Morning Adhkar<small>Supplications · 28 min</small></span><strong>▶</strong></button>'+
 '<button type="button" class="hc-v139-all-surahs" id="hcV139AllSurahs"><span>All 114 Surahs<small>Browse or continue to next chapter</small></span><strong>›</strong></button>';
(home.querySelector('.hc-home-more-content')||home).appendChild(quran);
quran.querySelector('#hcV139ShuffledQuran small').textContent='Surah '+surahName+' · new on refresh';
quran.querySelector('#hcV139MorningQuran').addEventListener('click',()=>hcPlayQuranSurah(1));
quran.querySelector('#hcV139ShuffledQuran').addEventListener('click',()=>hcPlayQuranSurah(surahNumber));
quran.querySelector('#hcV139AllSurahs').addEventListener('click',()=>{
 hcSetMiniCategory('quran');
 const field=document.getElementById('hcMiniSearch');if(field)field.value='';
 const drawer=document.getElementById('hcMiniLibrary');
 if(drawer?.hidden)hcToggleMiniLibrary();
 else hcRenderMiniLibrary();
});
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

// v145: user requested the original simple Home to remain visible.
// The four quick meditations form one small row underneath the three main tracks.
const compactStyle=document.createElement('style');
compactStyle.textContent=[
 '#home .hc-v139-daily{margin:12px 0 0}',
 '#home .hc-v139-daily .hc-v139-label{font-size:10px;margin:0 0 6px;color:#aabfc8}',
 '#home .hc-v139-daily-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}',
 '#home .hc-v139-daily-grid button{min-height:41px;padding:5px 3px;border-radius:10px;justify-content:center;text-align:center;font-size:10px;flex-direction:column;gap:2px}',
 '#home .hc-v139-daily-grid button span{font-size:12px}',
 '#home .hc-v139-quran{margin:12px 0;border-top:1px solid rgba(230,240,245,.17);padding-top:8px}',
 '#home .hc-v139-quran summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;min-height:42px;padding:8px 11px;background:#0b2331;border:1px solid rgba(230,240,245,.17);border-radius:12px;font-size:13px;font-weight:600}',
 '#home .hc-v139-quran:not([open])>button{display:none}',
 '#home .hc-v139-quran[open]>button{margin-top:7px}',
 '#home .hc-v139-quran summary::-webkit-details-marker{display:none}'
].join('\n');
document.head.append(compactStyle);
})();