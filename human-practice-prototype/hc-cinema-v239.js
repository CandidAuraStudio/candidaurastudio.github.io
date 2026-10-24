/* HeartClear v239: cinematic presentation on every route. Retain original feature handlers. */
(function(){
'use strict';
if(document.getElementById('hcCinemaBackdrop'))return;
const byId=id=>document.getElementById(id);
const dock=byId('hcFlowDock'),top=byId('hcFlowTop'),home=byId('home');
if(!dock||!top||!home)return;
document.body.classList.add('hc-cinema');
const artwork=document.createElement('div');artwork.id='hcCinemaBackdrop';artwork.setAttribute('aria-hidden','true');
document.body.prepend(artwork);
const hero=document.createElement('header');
hero.id='hcCinemaHero';hero.setAttribute('aria-label','Current section');
hero.innerHTML='<span id="hcCinemaEyebrow">HEARTCLEAR · ∞</span><h1 id="hcCinemaTitle">Meditation</h1><p id="hcCinemaSubtitle">Choose what matters to you.</p>';
const paths={
 home:{title:'Home',desc:'One touch opens your world.',scene:'practice'},
 practices:{title:'Meditation',desc:'Morning, midday, evening and night.',scene:'practice'},
 starterPath:{title:'Begin',desc:'Your first steps into practice.',scene:'practice'},
 quietTimer:{title:'Quiet Timer',desc:'Choose your time and begin.',scene:'practice'},
 sessionReady:{title:'Ready',desc:'Prepare for listening.',scene:'practice'},
 intro:{title:'Introduction',desc:'Start at your own pace.',scene:'practice'},
 prep:{title:'Preparation',desc:'Be comfortable and begin.',scene:'practice'},
 instructions:{title:'Guided Steps',desc:'Follow the session in your way.',scene:'practice'},
 player:{title:'Now Playing',desc:'Time, next session and full playback controls.',scene:'practice'},
 human:{title:'Human Practice',desc:'Awareness in everyday life.',scene:'practice'},
 humanCategory:{title:'Human Practice',desc:'Choose a practice.',scene:'practice'},
 humanSession:{title:'Listen & Practice',desc:'Your session continues as you move.',scene:'practice'},
 fearPractice:{title:'Sound Familiarity',desc:'Explore sounds at your pace.',scene:'practice'},
 fearPlayer:{title:'Sound Listening',desc:'Playback and controls.',scene:'practice'},
 returnJourney:{title:'Reflection',desc:'The next moment begins here.',scene:'practice'},
 completion:{title:'Completed',desc:'Return or explore further.',scene:'practice'},
 aftercare:{title:'After Listening',desc:'A moment to reflect.',scene:'practice'},
 library:{title:'Library',desc:'Books, stories and recordings.',scene:'library'},
 collection:{title:'Audiobooks',desc:'Choose a recording.',scene:'library'},
 bookReader:{title:'Reading',desc:'Continue from your saved place.',scene:'library'},
 bookAudio:{title:'Listen to Book',desc:'Chapters and listening progress.',scene:'library'},
 hcQuranStudy:{title:'Qur’an',desc:'114 surahs · original text and translation.',scene:'sacred'},
 hcFatiha:{title:'Al-Fatiha',desc:'Read, listen and reflect.',scene:'sacred'},
 hcLivingQuran:{title:'Living Qur’an',desc:'Reading and reflection.',scene:'sacred'},
 sacred:{title:'Sacred Sound',desc:'Traditions, recordings and sources.',scene:'sacred'},
 sacredDetail:{title:'Sacred Traditions',desc:'Read and listen in one place.',scene:'sacred'},
 sacredSession:{title:'Sacred Listening',desc:'Original voices and sound.',scene:'sacred'},
 chakraGuide:{title:'Practice Guide',desc:'Explore practices and explanations.',scene:'sacred'},
 soundHub:{title:'Sounds',desc:'Natural sound and quiet listening.',scene:'practice'},
 soundLab:{title:'Sound Lab',desc:'Choose or combine sounds.',scene:'practice'},
 soundLabPlayer:{title:'Now Playing',desc:'Every control stays within reach.',scene:'practice'},
 hcDriveMedia:{title:'Videos',desc:'Play, minimize and return.',scene:'practice'},
 omVideo:{title:'Video Listening',desc:'Return without losing your place.',scene:'practice'},
 downloads:{title:'Downloads',desc:'Available listening offline.',scene:'library'},
 history:{title:'History',desc:'Continue where you stopped.',scene:'library'},
 settings:{title:'Settings',desc:'Your sound, reading, privacy and preferences.',scene:'library'},
 hcReels:{title:'Reels',desc:'Swipe to the next video.',scene:'reels'},
 hcHeritageReader:{title:'Human Knowledge',desc:'Preserved traditions and explanations.',scene:'sacred'}
};
const svg=(body)=>'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+body+'</svg>';
const symbols={
 back:svg('<path d="m14 5-7 7 7 7"/>'),
 home:svg('<path d="m3.5 10 8.5-7 8.5 7v10H4z"/><path d="M9 20v-7h6v7"/>'),
 listen:svg('<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="12" width="4" height="8" rx="2"/><rect x="17.5" y="12" width="4" height="8" rx="2"/>'),
 explore:svg('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.4 4.6-4.6 2.4 2.4-4.6z"/>'),
 library:svg('<path d="M3 5.5Q8 3.5 12 6v14Q8 17.5 3 19z"/><path d="M12 6q4-2.5 9-.5V19q-5-1.5-9 1z"/>'),
 search:svg('<circle cx="10.7" cy="10.7" r="7.4"/><path d="m16 16 5 5"/>'),
 settings:svg('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="#111013"/><circle cx="16" cy="12" r="2" fill="#111013"/><circle cx="8" cy="18" r="2" fill="#111013"/>')
};
function skin(button,icon,label){
 if(!button)return;
 button.innerHTML=icon==='infinity'?'<img src="./icon.svg" alt="" aria-hidden="true" draggable="false">':symbols[icon];
 button.setAttribute('aria-label',label);button.title=label;
 button.setAttribute('type','button');
}
skin(byId('hcFlowBack'),'back','Back to previous screen');
skin(byId('hcFlowHome'),'home','Return to Home');
skin(byId('hcFlowDockHome'),'infinity','Home');
skin(byId('hcFlowDockListen'),'listen','Listen or return to player');
skin(byId('hcFlowDockSearch'),'search','Search HeartClear');
function newAction(id,label,icon,handler){
 let b=byId(id);
 if(!b){b=document.createElement('button');b.id=id;b.type='button';b.addEventListener('click',handler)}
 skin(b,icon,label);
 return b;
}
const explore=newAction('hcCinemaExplore','Explore', 'explore',()=>{
 if(window.hcFlow&&typeof window.hcFlow.openExplore==='function')window.hcFlow.openExplore();
});
const library=newAction('hcCinemaLibrary','Library','library',()=>window.show?.('library'));
const settings=newAction('hcCinemaSettings','Settings','settings',()=>window.show?.('settings'));
dock.append(byId('hcFlowDockHome'),byId('hcFlowDockListen'),explore,library,byId('hcFlowDockSearch'),settings);
function chooseScene(id){
 if(id==='home'&&home.classList.contains('hc-bubble-detail')){
  const type=home.dataset.hcbDetail;
  if(type==='recipes')return {title:'Kitchen',desc:'Food, shopping lists and practical recipes.',scene:'kitchen'};
  if(type==='bible')return {title:'Bible',desc:'Read and listen without leaving HeartClear.',scene:'sacred'};
  return {title:home.dataset.hcbTitle||'Explore',desc:'Explore knowledge and everyday life.',scene:'sacred'};
 }
 return paths[id]||{title:id.replace(/^hc/,'').replace(/([a-z])([A-Z])/g,'$1 $2'),desc:'Explore HeartClear.',scene:'practice'};
}
function sync(){
 const screen=document.querySelector('.screen.active');
 if(!screen)return;
 const id=screen.id;
 const detail=id==='home'&&home.classList.contains('hc-bubble-detail');
 const view=chooseScene(id);
 document.body.dataset.hcCinemaScene=view.scene;
 document.body.dataset.hcCinemaRoute=id;
 const shouldShow=(id!=='home'||detail)&&id!=='hcReels';
 if(shouldShow){
  const anchor=screen.querySelector(':scope > #hcFlowTop');
  if(anchor&&anchor.nextElementSibling!==hero)anchor.insertAdjacentElement('afterend',hero);
  else if(!anchor&&hero.parentElement!==screen)screen.prepend(hero);
  hero.hidden=false;
  byId('hcCinemaTitle').textContent=view.title;
  byId('hcCinemaSubtitle').textContent=view.desc;
 }else{hero.hidden=true}
 const active=id==='home'&&!detail?'hcFlowDockHome':
  ['player','soundLabPlayer','bookAudio','humanSession','sacredSession','fearPlayer'].includes(id)?'hcFlowDockListen':
  ['library','collection','bookReader','history','downloads'].includes(id)?'hcCinemaLibrary':
  ['settings'].includes(id)?'hcCinemaSettings':
  id==='home'&&detail?'hcCinemaExplore':
  ['practices','human','humanCategory','sacred','sacredDetail','hcQuranStudy','hcFatiha','hcLivingQuran','chakraGuide'].includes(id)?'hcCinemaExplore':null;
 dock.querySelectorAll('button').forEach(b=>{if(b.id===active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
}
const showBefore=window.show;
if(typeof showBefore==='function'){
 window.show=function(){const output=showBefore.apply(this,arguments);sync();return output;};
}
new MutationObserver(()=>sync()).observe(home,{attributes:true,attributeFilter:['class','data-hcb-detail','data-hcb-title']});
window.addEventListener('pageshow',sync);
sync();
// Wheel motion over the fixed mini-player scrolls the page rather than getting lost on the overlay.
document.addEventListener('wheel',function(event){
 const mini=byId('globalMini');
 if(!mini||!mini.classList.contains('show')||document.body.classList.contains('hc-reels-active')||event.defaultPrevented)return;
 const rect=mini.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)return;
 if(!Number.isFinite(event.deltaY)||Math.abs(event.deltaY)<1)return;
 const scroller=document.scrollingElement;
 if(!scroller||scroller.scrollHeight<=window.innerHeight+10)return;
 event.preventDefault();
 window.scrollBy({top:event.deltaY,left:0,behavior:'instant'});
},{capture:true,passive:false});
window.hcCinema={sync,goTo:id=>window.show?.(id)};
})();