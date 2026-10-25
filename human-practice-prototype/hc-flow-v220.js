/* HeartClear v220 — unified large-screen navigation. Existing media and book engines stay intact. */
(function(){
'use strict';
if(document.getElementById('hcFlowDock'))return;
const $=id=>document.getElementById(id);
const home=$('home');if(!home)return;
document.body.classList.add('hc-flow-enabled');
// Start with readable book text while preserving the existing A+/A− adjustments.
try{if(typeof readerFontSize!=='undefined')readerFontSize=Math.max(22,Number(readerFontSize)||22)}catch(_){}
const names={home:'Home',practices:'Meditation',human:'Human Practice',humanCategory:'Human Practice',humanSession:'Human Practice',fearPractice:'Sound Familiarity',fearPlayer:'Listening',returnJourney:'Reflection',starterPath:'Starter Practice',quietTimer:'Quiet Timer',library:'Books & Reading',collection:'Audiobooks',bookReader:'Read Book',bookAudio:'Listen to Book',hcQuranStudy:'Qur’an',hcFatiha:'Al-Fatiha',hcLivingQuran:'The Living Qur’an',sacred:'Sacred Sound',sacredDetail:'Sacred Tradition',sacredSession:'Sacred Listening',soundHub:'Sounds',soundLab:'Sounds',soundLabPlayer:'Now Playing',player:'Now Playing',intro:'Introduction',prep:'Preparation',instructions:'Guidance',completion:'Completed',aftercare:'After Listening',hcDriveMedia:'Video Listening',omVideo:'Video',hcReels:'Reels',hcHeritageReader:'Human Knowledge',history:'History',downloads:'Offline',settings:'Settings',chakraGuide:'Practice Guide'};
const top=document.createElement('div');top.id='hcFlowTop';
top.innerHTML='<button id="hcFlowBack" type="button">‹ Back</button><span class="hc-flow-name" id="hcFlowName">HeartClear</span><button id="hcFlowHome" type="button">Home ⌂</button>';
// Header controls must be connected before getElementById binds their listeners.
document.body.append(top);
const dock=document.createElement('nav');dock.id='hcFlowDock';dock.setAttribute('aria-label','HeartClear main navigation');
// All six final bottom destinations exist from the start. Search stays in Home.
dock.innerHTML='<button id="hcFlowDockHome" type="button"><span aria-hidden="true">∞</span>Home</button>'+
 '<button id="hcFlowDockListen" type="button"><span aria-hidden="true">♫</span>Listen</button>'+
 '<button id="hcCinemaExplore" type="button"><span aria-hidden="true">◇</span>Explore</button>'+
 '<button id="hcCinemaLibrary" type="button"><span aria-hidden="true">▤</span>Library</button>'+
 '<button id="hcCinemaReels" type="button" aria-label="Reels"><span aria-hidden="true">▣</span>Reels</button>'+
 '<button id="hcCinemaSettings" type="button"><span aria-hidden="true">☷</span>Settings</button>';
document.body.append(dock);
const experiences=[
 ['Meditation','Easy listening, morning to night',()=>window.show?.('practices')],
 ['Qur’an','114 surahs, Arabic, English and Tamil',()=>typeof window.hcOpenQuranStudy==='function'?window.hcOpenQuranStudy():window.show?.('hcQuranStudy')],
 ['Bible','Genesis chapters, reading and audio',()=>window.hcBubbleHome?.bible?.()],
 ['Recipes','Food, ingredients and clear cooking steps',()=>window.hcBubbleHome?.recipe?.('')],
 ['Human Practice','Daily awareness, movement and observation',()=>window.show?.('human')],
 ['Books','Read and listen at your own pace',()=>window.show?.('library')],
 ['Sounds','Choose a sound or create your own mix',()=>typeof window.openSoundLab==='function'?window.openSoundLab():window.show?.('soundLab')],
 ['Sacred Sound','Listen across clearly identified traditions',()=>window.show?.('sacred')],
 ['Reels','Full-screen videos, one at a time',()=>typeof window.hcOpenReels==='function'?window.hcOpenReels():window.show?.('hcReels')],
 ['Daily Care','Everyday family care and body science',()=>openKnowledgeFeature('daily')],
 ['Human Knowledge','Traditions, history and preserved texts',()=>openKnowledgeFeature('knowledge')],
 ['Mind Game','Play questions and explore ideas',()=>{const b=$('hcExploreOpen');if(b)b.click();else focusHomeFeature('hcHomeMore','Explore')}],
 ['Traditional Kitchen','Meals, kitchen plans and heritage foods',()=>focusHomeFeature('hcMonthlyKitchen','Traditional Kitchen')],
 ['Starter Practice','Follow the seven-day introduction',()=>window.show?.('starterPath')],
 ['History','See saved activity and progress',()=>window.show?.('history')],
 ['Offline','Access downloaded recordings',()=>window.show?.('downloads')],
 ['Settings','Display, sound, privacy and preferences',()=>window.show?.('settings')]
];
/* Load the optional legacy catalog only when requested, not during Home paint. */
let knowledgePromise=null;
function ensureKnowledge(){
 if(window.HCHeritageReader && $('hcEverydayCareV182'))return Promise.resolve(true);
 if(knowledgePromise)return knowledgePromise;
 knowledgePromise=new Promise(resolve=>{
  let attempts=0;
  const check=()=>{
   if(window.HCHeritageReader && $('hcEverydayCareV182')){resolve(true);return}
   if(++attempts>120){resolve(false);return}
   setTimeout(check,100);
  };
  if($('hcEverydayCareV182')){check();return}
  const script=document.createElement('script');
  script.src='./hc-daily-care-v182.js?v=284';
  script.async=true;
  script.onload=check;
  script.onerror=()=>resolve(false);
  document.body.append(script);
 }).then(ok=>{if(!ok)knowledgePromise=null;return ok});
 return knowledgePromise;
}
function openKnowledgeFeature(which){
 ensureKnowledge().then(ok=>{
  if(!ok){
   const fallback=$('hcFlowExploreTitle');
   if(fallback)fallback.textContent='Unable to open the reading library. Please check your connection and try again.';
   return;
  }
  if(which==='knowledge')window.HCHeritageReader.open();
  else focusHomeFeature('hcEverydayCareV182','Daily Care');
 });
}
function focusHomeFeature(id,title){
 const target=$(id);if(!target){window.hcBubbleHome?.recipe?.('');return}
 home.querySelectorAll('.hc-flow-feature-path,.hc-flow-feature-target').forEach(node=>node.classList.remove('hc-flow-feature-path','hc-flow-feature-target'));
 let node=target;
 while(node&&node!==home){
  node.classList.add(node===target?'hc-flow-feature-target':'hc-flow-feature-path');
  node.hidden=false;
  if(node.tagName==='DETAILS')node.open=true;
  node=node.parentElement;
 }
 if(node!==home){window.show?.('library');return}
 home.dataset.hcbDetail='feature';home.dataset.hcbTitle=title;
 home.classList.remove('hc-bubble-mode');home.classList.add('hc-bubble-detail');
 document.body.classList.add('hc-bubble-on','hc-bubble-detail-on');
 sync();
 requestAnimationFrame(()=>{window.scrollTo(0,0);target.scrollIntoView({block:'nearest',behavior:'auto'})});
}
const explore=document.createElement('section');explore.id='hcFlowExplore';explore.hidden=true;explore.setAttribute('role','dialog');explore.setAttribute('aria-modal','true');explore.setAttribute('aria-label','All HeartClear experiences');
explore.innerHTML='<div class="hc-flow-explore-inner"><header><strong>All experiences</strong><button id="hcFlowExploreClose" type="button" aria-label="Close">×</button></header>'+
 '<div class="hc-flow-explore-card" id="hcFlowExploreCard"><span class="hc-flow-explore-orb" aria-hidden="true"></span><h2 id="hcFlowExploreTitle"></h2><p id="hcFlowExploreDesc"></p><button id="hcFlowExploreOpen" type="button">Open ›</button></div>'+
 '<div class="hc-flow-explore-pager"><button id="hcFlowExplorePrev" type="button" aria-label="Previous activity">‹</button><span id="hcFlowExploreCount"></span><button id="hcFlowExploreNext" type="button" aria-label="Next activity">›</button></div><p class="hc-flow-explore-help">Swipe left or right to browse.</p></div>';
document.body.append(explore);

/* v279: visible index of all original HeartClear experiences, no replacement routes. */
const exploreGrid=document.createElement('nav');
exploreGrid.id='hcFlowExploreGrid';
exploreGrid.setAttribute('aria-label','Explore all HeartClear sections');
for(const [title,description,action] of experiences){
 const button=document.createElement('button');button.type='button';
 const name=document.createElement('strong');name.textContent=title;
 const sub=document.createElement('small');sub.textContent=description;
 button.append(name,sub);button.setAttribute('aria-label','Open '+title);
 button.addEventListener('click',()=>{closeExplore();action()});
 exploreGrid.append(button);
}
$('hcFlowExploreCard').after(exploreGrid);

let exIndex=0,exFocus=null,exX=0,exY=0;
function current(){return document.querySelector('.screen.active')?.id||'home'}
function bigHome(){
 if(!explore.hidden)closeExplore();
 if(!$('hcBubbleSearchPanel')?.hidden)$('hcBubbleSearchClose')?.click();
 if(typeof window.hcBubbleHome?.classic==='function')window.hcBubbleHome.classic();
 else window.show?.('home');
 window.scrollTo(0,0);
}
function exDraw(){const v=experiences[exIndex];$('hcFlowExploreTitle').textContent=v[0];$('hcFlowExploreDesc').textContent=v[1];$('hcFlowExploreCount').textContent=(exIndex+1)+' / '+experiences.length}
function exMove(n){exIndex=(exIndex+n+experiences.length)%experiences.length;exDraw()}
function openExplore(){
 exFocus=document.activeElement;exIndex=0;exDraw();
 explore.hidden=false;document.body.classList.add('hc-flow-modal-open');
 $('hcFlowExploreClose').focus({preventScroll:true});
}
function closeExplore(){explore.hidden=true;document.body.classList.remove('hc-flow-modal-open');if(exFocus?.isConnected)exFocus.focus({preventScroll:true})}
function exOpen(){const action=experiences[exIndex][2];closeExplore();action()}
$('hcFlowExploreClose').addEventListener('click',closeExplore);
$('hcFlowExplorePrev').addEventListener('click',()=>exMove(-1));
$('hcFlowExploreNext').addEventListener('click',()=>exMove(1));
$('hcFlowExploreOpen').addEventListener('click',exOpen);
explore.addEventListener('keydown',e=>{
 if(e.key==='Escape'){e.preventDefault();closeExplore()}
 if(e.key==='ArrowLeft'){e.preventDefault();exMove(-1)}
 if(e.key==='ArrowRight'){e.preventDefault();exMove(1)}
 if(e.key==='Tab'){const nodes=[...explore.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===nodes[0]){e.preventDefault();nodes.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0].focus()}}
});
$('hcFlowExploreCard').addEventListener('touchstart',e=>{const t=e.touches[0];if(t){exX=t.clientX;exY=t.clientY}},{passive:true});
$('hcFlowExploreCard').addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-exX,dy=t.clientY-exY;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.2)exMove(dx<0?1:-1)},{passive:true});
const more=$('hcBubbleSwitch');
if(more){more.textContent='Explore all experiences';more.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openExplore()},true)}
const history=[];let goingBack=false;
function goBack(){
 if(current()==='home'){bigHome();return}
 let next='home';while(history.length){const id=history.pop();if(id!==current()&&$(id)?.classList.contains('screen')){next=id;break}}
 goingBack=true;try{window.show?.(next)}finally{goingBack=false}
}
$('hcFlowBack').addEventListener('click',goBack);
$('hcFlowHome').addEventListener('click',bigHome);
$('hcFlowDockHome').addEventListener('click',bigHome);
$('hcCinemaExplore').addEventListener('click',openExplore);
$('hcCinemaLibrary').addEventListener('click',()=>window.show?.('library'));
$('hcCinemaSettings').addEventListener('click',()=>window.show?.('settings'));
$('hcCinemaReels').addEventListener('click',()=>{
 // Open the first full-screen Reel, not a Search sheet.
 if(typeof window.hcOpenReels==='function')window.hcOpenReels();
 else window.show?.('hcReels');
});
$('hcFlowDockListen').addEventListener('click',()=>{
 try{const m=typeof window.getActiveMediaState==='function'?window.getActiveMediaState():null;if(m&&typeof window.openActiveMediaPlayer==='function'){window.openActiveMediaPlayer();return}}catch(_){}
 if(typeof window.openSoundLab==='function')window.openSoundLab();else window.show?.('soundLab');
});
const stages=[
 ['#human .human-grid','Human Practice'],['#library .hub-grid','Library'],['#sacred .sacred-grid','Traditions'],
 ['#fearPractice #fearLevels','Sounds'],['#soundHub .hc-hub-quick','Recordings'],['#soundLab #hcSoundTrackList','Sounds'],
 ['#soundLab #hcGeneralDriveCards','Drive recordings'],['#humanCategory #humanPracticeList','Activities'],['#collection #collectionList','Books']
];
function stage(selector,label){
 const root=document.querySelector(selector);if(!root||root.dataset.hcFlowReady)return;
 root.dataset.hcFlowReady='1';root.classList.add('hc-flow-stage');
 const pager=document.createElement('div');pager.className='hc-flow-pager';
 pager.innerHTML='<button type="button" aria-label="Previous">‹</button><span aria-live="polite"></span><button type="button" aria-label="Next">›</button>';
 root.after(pager);const prev=pager.children[0],count=pager.children[1],next=pager.children[2];let index=0;
 function candidates(){return [...root.children].filter(x=>x instanceof HTMLElement&&!x.hidden&&!x.classList.contains('is-hidden')&&x.style.display!=='none')}
 function refresh(){
  const visible=candidates();
  if(index>=visible.length)index=Math.max(0,visible.length-1);
  [...root.children].forEach(x=>{if(!(x instanceof HTMLElement))return;x.classList.add('hc-flow-choice');x.classList.remove('hc-flow-selected')});
  if(visible[index])visible[index].classList.add('hc-flow-selected');
  count.textContent=visible.length?(label+' · '+(index+1)+' / '+visible.length):'No items yet';
  pager.hidden=visible.length<=1;
 }
 function move(n){const list=candidates();if(!list.length)return;index=(index+n+list.length)%list.length;refresh();root.scrollIntoView({block:'nearest',behavior:'auto'})}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 let sx=0,sy=0;
 root.addEventListener('touchstart',e=>{const t=e.touches[0];if(t){sx=t.clientX;sy=t.clientY}},{passive:true});
 root.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.25)move(dx<0?1:-1)},{passive:true});
 new MutationObserver(()=>queueMicrotask(refresh)).observe(root,{childList:true});refresh();root.hcFlowRefresh=refresh;
}
function practices(){
 const screen=$('practices');if(!screen||$('hcFlowPracticeDeck'))return;
 const deck=document.createElement('div');deck.id='hcFlowPracticeDeck';
 deck.innerHTML='<button id="hcFlowPracticeChoice" type="button" class="hc-flow-practice-choice"><span class="hc-flow-practice-mark">◌</span><strong id="hcFlowPracticeTitle"></strong><span id="hcFlowPracticeDescription"></span><em>Open practice ›</em></button>'+
 '<div class="hc-flow-pager"><button id="hcFlowPracticePrev" type="button" aria-label="Previous practice">‹</button><span id="hcFlowPracticeCount" aria-live="polite"></span><button id="hcFlowPracticeNext" type="button" aria-label="Next practice">›</button></div>';
 screen.querySelector('.library-intro')?.after(deck);let index=0,options=[];
 function refresh(){
  options=[...screen.querySelectorAll('.practice-card')].filter(b=>!b.hidden&&!b.classList.contains('is-hidden'));
  if(index>=options.length)index=0;const item=options[index];
  $('hcFlowPracticeTitle').textContent=item?.querySelector('.practice-copy b')?.textContent||item?.querySelector('b')?.textContent||'Choose a practice';
  $('hcFlowPracticeDescription').textContent=item?.querySelector('small')?.textContent||'Choose an activity';
  $('hcFlowPracticeCount').textContent=options.length?((index+1)+' / '+options.length):'No matching practice';
  $('hcFlowPracticeChoice').disabled=!item;
 }
 function move(n){if(options.length){index=(index+n+options.length)%options.length;refresh()}}
 $('hcFlowPracticePrev').addEventListener('click',()=>move(-1));
 $('hcFlowPracticeNext').addEventListener('click',()=>move(1));
 $('hcFlowPracticeChoice').addEventListener('click',()=>options[index]?.click());
 screen.querySelector('.category-tabs')?.addEventListener('click',()=>{index=0;queueMicrotask(refresh)});
 screen.hcFlowRefreshPractices=refresh;refresh();
}
function simplifySounds(){
 const hub=$('soundHub');
 if(hub&&!$('hcFlowSoundExtras')){
  const links=hub.querySelector('.hc-simple-paths'),more=hub.querySelector('.hc-sounds-more');
  if(links){const detail=document.createElement('details');detail.id='hcFlowSoundExtras';const sum=document.createElement('summary');sum.textContent='Explore more listening';detail.append(sum,links);if(more)detail.append(more);hub.querySelector('.glass')?.append(detail)}
 }
 const lab=$('soundLab');
 if(lab&&!$('hcFlowMixerDetails')){
  const mix=$('hcMixCard');if(mix){const detail=document.createElement('details');detail.id='hcFlowMixerDetails';const sum=document.createElement('summary');sum.textContent='Create a sound mix · Advanced';detail.append(sum,mix);lab.append(detail)}
 }
}
function sync(){
 const screen=document.querySelector('.screen.active');if(!screen)return;const route=screen.id;
 document.body.dataset.hcFlowRoute=route;
 if(route==='home'){
  if(home.classList.contains('hc-bubble-detail')){screen.prepend(top);$('hcFlowName').textContent=home.dataset.hcbDetail==='bible'?'Bible':home.dataset.hcbDetail==='feature'?(home.dataset.hcbTitle||'Explore'):'Recipes'}
 }else if(route!=='hcReels'){screen.prepend(top);$('hcFlowName').textContent=names[route]||'HeartClear'}
 /* v237: original galleries stay visible; avoid hiding choices behind single-card pagers. */
 if(route==='practices')screen.hcFlowRefreshPractices?.();
 if(route==='soundLab'){$('hcSoundTrackList')?.hcFlowRefresh?.();$('hcGeneralDriveCards')?.hcFlowRefresh?.()}
 dock.querySelectorAll('button').forEach(b=>b.removeAttribute('aria-current'));
 const navId=route==='home'?'hcFlowDockHome':route==='hcReels'?'hcCinemaReels':
   ['soundLabPlayer','player','bookAudio','soundLab'].includes(route)?'hcFlowDockListen':
   ['library','collection','bookReader'].includes(route)?'hcCinemaLibrary':
   route==='settings'?'hcCinemaSettings':null;
 if(navId)$(navId)?.setAttribute('aria-current','page');
}
/* v237: retain original meditation catalogue and advanced Sounds controls. */
/* v237: original galleries stay visible; avoid hiding choices behind single-card pagers. */
const oldShow=window.show;
if(typeof oldShow==='function')window.show=function(id){
 const before=current(),output=oldShow.apply(this,arguments);
 if(!goingBack&&before&&before!==id&&before!=='hcReels'&&history.at(-1)!==before)history.push(before);
 sync();return output;
};
new MutationObserver(()=>{if(current()==='home'&&home.classList.contains('hc-bubble-detail'))sync()}).observe(home,{attributes:true,attributeFilter:['class','data-hcb-detail']});
window.addEventListener('pageshow',sync);
sync();window.hcFlow={home:bigHome,openExplore,closeExplore,sync};
})();