/* HeartClear v207 — bubble-first, elder-readable navigation without replacing any media engines. */
(function(){
'use strict';
if(document.getElementById('hcBubbleHome'))return;
const home=document.getElementById('home');
if(!home)return;
const categories=[
 {key:'meditation',title:'Meditation',desc:'A calm moment for morning, midday, evening or night.',label:'Begin listening',orb:'#a8cecc',glow:'rgba(126,183,189,.38)'},
 {key:'quran',title:'Qur’an',desc:'Read and listen. Arabic, English and Tamil.',label:'Open Qur’an',orb:'#d0bb90',glow:'rgba(222,185,101,.28)'},
 {key:'bible',title:'Bible',desc:'Genesis. Read or listen, one chapter at a time.',label:'Open Genesis',orb:'#a6addd',glow:'rgba(134,142,207,.3)'},
 {key:'recipes',title:'Recipes',desc:'Find everyday food from Tamil cooking and around the world.',label:'Find a recipe',orb:'#dda97f',glow:'rgba(206,149,93,.32)'},
 {key:'books',title:'Books',desc:'Return to a story, listen or read at your pace.',label:'Open books',orb:'#bcb3d4',glow:'rgba(175,147,207,.31)'},
 {key:'sounds',title:'Sounds',desc:'Ocean, flute, sacred listening and soundscapes.',label:'Open sounds',orb:'#95c9c2',glow:'rgba(133,189,181,.28)'},
 {key:'reels',title:'Reels',desc:'One video at a time. Swipe up to see the next.',label:'Watch reels',orb:'#d5a7aa',glow:'rgba(191,110,130,.28)'},
 {key:'explore',title:'Explore',desc:'All the other HeartClear features remain available.',label:'See all sections',orb:'#b6c4cb',glow:'rgba(156,175,188,.28)'}
];
const launcher=document.createElement('div');
launcher.id='hcBubbleHome';
launcher.setAttribute('aria-label','HeartClear large easy navigation');
launcher.innerHTML='<div class="hcb-small">ONE THING AT A TIME</div>'+
 '<h1>HeartClear</h1>'+
 '<button id="hcBubbleSearch" type="button" aria-label="Search HeartClear"><svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="10.7" cy="10.7" r="7"></circle><path d="m16 16 5 5"></path></svg><span>What are you looking for?</span></button>'+
 '<button id="hcBubbleCard" type="button" aria-label="Open selected activity"><span class="hcb-orb" aria-hidden="true"></span><span class="hcb-title" id="hcBubbleTitle">Meditation</span><span class="hcb-description" id="hcBubbleDescription"></span><span class="hcb-action" id="hcBubbleAction">Begin listening ↑</span></button>'+
 '<div class="hcb-navigation"><button type="button" id="hcBubblePrev" aria-label="Previous activity">‹</button><div class="hcb-count" id="hcBubbleCount" aria-live="polite"></div><button type="button" id="hcBubbleNext" aria-label="Next activity">›</button></div>'+
 '<p class="hcb-hint">Swipe left or right to browse · Swipe up to open</p>'+
 '<button type="button" class="hcb-switch" id="hcBubbleSwitch">All sections · classic layout</button>';
home.prepend(launcher);
const search=document.createElement('section');
search.id='hcBubbleSearchPanel';search.hidden=true;search.setAttribute('role','dialog');search.setAttribute('aria-modal','true');search.setAttribute('aria-label','Search HeartClear');
search.innerHTML='<div class="hcb-search-body"><div class="hcb-search-top"><strong>Search</strong><button type="button" id="hcBubbleSearchClose" aria-label="Close search">×</button></div>'+
 '<label for="hcBubbleSearchInput">What would you like?</label><input type="search" id="hcBubbleSearchInput" placeholder="Food, Qur’an, Bible, sounds…" enterkeyhint="search" autocomplete="off" maxlength="120">'+
 '<div class="hcb-results" id="hcBubbleResults" aria-live="polite"></div><p class="hcb-search-caption">Choose one result to open it.</p></div>';
document.body.append(search);
const back=document.createElement('button');back.id='hcBubbleReturn';back.type='button';back.textContent='← Big view';back.hidden=true;document.body.append(back);
const classic=document.createElement('button');classic.id='hcBubbleClassic';classic.type='button';classic.textContent='Big view';classic.hidden=true;document.body.append(classic);
const $=id=>document.getElementById(id);
let index=0;
try{const previous=localStorage.getItem('hcBubbleCategoryV207');const found=categories.findIndex(x=>x.key===previous);if(found>=0)index=found;}catch(_){}
function isHome(){return home.classList.contains('active')}
function syncButtons(){
 const detail=home.classList.contains('hc-bubble-detail');
 back.hidden=!(isHome()&&detail);
 classic.hidden=!(isHome()&&!detail&&!home.classList.contains('hc-bubble-mode'));
}
function setMode(mode,persist){
 home.classList.toggle('hc-bubble-mode',mode==='big');
 home.classList.toggle('hc-bubble-detail',mode==='detail');
 document.body.classList.toggle('hc-bubble-on',mode!=='classic');
 document.body.classList.toggle('hc-bubble-detail-on',mode==='detail');
 if(persist){try{localStorage.setItem('hcBubbleLayoutV207',mode==='classic'?'classic':'big')}catch(_){}}
 syncButtons();
}
function big(){
 if(typeof window.show==='function'&&!isHome())window.show('home');
 setMode('big',true);
 window.scrollTo({top:0,behavior:'auto'});
}
function legacy(){setMode('classic',true);window.scrollTo({top:0,behavior:'auto'})}
try{setMode(localStorage.getItem('hcBubbleLayoutV207')==='classic'?'classic':'big',false)}catch(_){setMode('big',false)}
function draw(){
 const c=categories[index];
 $('hcBubbleTitle').textContent=c.title;
 $('hcBubbleDescription').textContent=c.desc;
 $('hcBubbleAction').textContent=c.label+' ↑';
 $('hcBubbleCount').textContent=(index+1)+' / '+categories.length;
 const card=$('hcBubbleCard');card.style.setProperty('--hcb-orb',c.orb);card.style.setProperty('--hcb-glow',c.glow);
 card.setAttribute('aria-label',c.label+' — '+c.title+'. Swipe left or right for more.');
 card.classList.remove('hcb-enter');void card.offsetWidth;card.classList.add('hcb-enter');
 try{localStorage.setItem('hcBubbleCategoryV207',c.key)}catch(_){}
}
function move(delta){index=(index+delta+categories.length)%categories.length;draw()}
function recipe(query){
 home.dataset.hcbDetail='recipes';
 setMode('detail',false);
 const more=$('hcHomeMore');if(more)more.open=true;
 requestAnimationFrame(function(){
   const target=$('hcKitchenAskV163')||$('hcHomeKitchenQuickV155')||$('hcMonthlyKitchen');
   const input=$('hcKitchenAskInput');
   if(input&&query){input.value=query;input.dispatchEvent(new Event('input',{bubbles:true}));$('hcKitchenAskSend')?.click()}
   else if(!query){$('hcKitchenBrowse')?.click()}
   if(target)target.scrollIntoView({block:'start',behavior:'auto'});
 });
}
function genesis(){
 home.dataset.hcbDetail='bible';
 setMode('detail',false);
 requestAnimationFrame(function(){
  const target=$('hcGenesisCard');
  if(!target){setMode('big',false);return}
  const reading=$('hcGenReading'),toggle=$('hcGenRead');
  if(reading&&reading.hidden&&toggle)toggle.click();
  target.scrollIntoView({block:'start',behavior:'auto'});
 });
}
function guided(){
 const hour=new Date().getHours();
 const key=hour>=5&&hour<11?'wake':hour>=11&&hour<17?'noon':hour>=17&&hour<21?'evening':'sleep';
 if(typeof window.hcHomePlayGuided==='function')window.hcHomePlayGuided(key);
 else if(typeof window.show==='function')window.show('practices');
}
function choose(key,arg){
 if(key==='recipes'){recipe(arg||'');return}
 if(key==='bible'){genesis();return}
 if(key==='meditation'){
   try{
    const active=typeof window.getActiveMediaState==='function'?window.getActiveMediaState():null;
    if(active&&active.key==='meditation'&&!active.el?.paused&&typeof window.openActiveMediaPlayer==='function'){window.openActiveMediaPlayer();return}
   }catch(_){}
   guided();return;
 }
 if(key==='quran'){
   if(typeof window.hcOpenQuranStudy==='function')window.hcOpenQuranStudy();
   else if(typeof window.show==='function')window.show('hcQuranStudy');return;
 }
 if(key==='books'){window.show?.('library');return}
 if(key==='sounds'){if(typeof window.openSoundLab==='function')window.openSoundLab();else window.show?.('soundLab');return}
 if(key==='reels'){if(typeof window.hcOpenReels==='function')window.hcOpenReels();else window.show?.('hcReels');return}
 if(key==='explore'){legacy();return}
}
let ignoreClickUntil=0,touchStart=null;
$('hcBubbleCard').addEventListener('touchstart',function(e){const t=e.touches[0];if(t)touchStart={x:t.clientX,y:t.clientY}},{passive:true});
$('hcBubbleCard').addEventListener('touchend',function(e){
 if(!touchStart)return;
 const t=e.changedTouches[0];if(!t)return;
 const dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;touchStart=null;
 if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.2){ignoreClickUntil=Date.now()+450;move(dx<0?1:-1)}
 else if(dy<-75&&Math.abs(dy)>Math.abs(dx)*1.2){ignoreClickUntil=Date.now()+450;choose(categories[index].key)}
},{passive:true});
$('hcBubbleCard').addEventListener('click',function(){if(Date.now()>ignoreClickUntil)choose(categories[index].key)});
$('hcBubblePrev').addEventListener('click',()=>move(-1));
$('hcBubbleNext').addEventListener('click',()=>move(1));
$('hcBubbleSwitch').addEventListener('click',legacy);
classic.addEventListener('click',big);back.addEventListener('click',big);
const searchInput=$('hcBubbleSearchInput'),results=$('hcBubbleResults');
let searchReturn=null;
function closeSearch(){
 search.hidden=true;document.body.style.overflow='';
 if(searchReturn?.isConnected)searchReturn.focus({preventScroll:true});
}
function openSearch(){
 searchReturn=document.activeElement;search.hidden=false;document.body.style.overflow='hidden';searchInput.value='';renderSearch();requestAnimationFrame(()=>searchInput.focus({preventScroll:true}));
}
$('hcBubbleSearch').addEventListener('click',openSearch);
$('hcBubbleSearchClose').addEventListener('click',closeSearch);
search.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();closeSearch();return}
 if(e.key==='Tab'){
   const eligible=[...search.querySelectorAll('button:not([hidden]),input:not([hidden])')].filter(n=>n.getClientRects().length);
   const first=eligible[0],last=eligible[eligible.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
function norm(s){return String(s||'').toLocaleLowerCase().normalize('NFKC').trim()}
function getRecipes(){
 const list=[],seen=new Set();
 const add=(r)=>{
  if(!r?.en)return;
  const n=norm(r.en);
  if(seen.has(n))return;
  seen.add(n);list.push(r);
 };
 (window.HCKitchenSearchGuide?.personal||[]).forEach(add);
 (window.HCKitchenWorldRecipes?.catalog?.()||[]).forEach(add);
 (window.HCKitchenMenu?.catalog?.()||[]).forEach(add);
 return list;
}
function result(title,sub,fn){
 const b=document.createElement('button');b.type='button';b.className='hcb-result';
 const wrap=document.createElement('span');const t=document.createElement('span');t.textContent=title;wrap.append(t);
 if(sub){const s=document.createElement('small');s.textContent=sub;wrap.append(s)}
 const arrow=document.createElement('span');arrow.textContent='›';arrow.setAttribute('aria-hidden','true');
 b.append(wrap,arrow);b.addEventListener('click',function(){closeSearch();fn()});results.append(b);
}
function renderSearch(){
 const q=norm(searchInput.value);results.replaceChildren();
 if(!q){
  categories.slice(0,6).forEach(c=>result(c.title,c.desc,()=>choose(c.key)));
  return;
 }
 const words=q.split(/\s+/).filter(Boolean);
 const common=[
  ['quran','Qur’an','qur an surah ayat islam koran recitation arabic tamil', 'Read Qur’an'],
  ['bible','Bible','genesis old testament scripture chapter tamil english','Read Bible'],
  ['meditation','Meditation','yoga breath calm morning midday noon evening sleep','Begin meditation'],
  ['sounds','Sounds','ocean flute music sacred raga listening allahu','Listen'],
  ['books','Books','human book audiobook read library','Open books'],
  ['reels','Reels','video shorts reels clips','Watch reels']
 ];
 common.forEach(entry=>{if(words.every(w=>norm(entry[1]+' '+entry[2]).includes(w)))result(entry[1],entry[3],()=>choose(entry[0]))});
 const recipes=getRecipes().map(r=>{
    const name=norm(r.en+' '+r.ta),extra=norm((r.aliases||'')+' '+(r.ingredients||'')+' '+(r.category||''));
    const matched=words.filter(w=>name.includes(w)||extra.includes(w)).length;
    return {r,score:matched*15+(name.includes(q)?90:0)+(norm(r.en)===q?110:0)};
  }).filter(x=>x.score>0&&x.score>=words.length*12).sort((a,b)=>b.score-a.score).slice(0,9);
 recipes.forEach(x=>result(x.r.en,x.r.ta||'Recipe',()=>recipe(x.r.en)));
 result('Search all recipes for “‘'+q+'”','Use the full Kitchen recipe search',()=>recipe(searchInput.value.trim()));
}
searchInput.addEventListener('input',renderSearch);
searchInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();const b=results.querySelector('button');if(b)b.click()}});
const observer=new MutationObserver(syncButtons);
observer.observe(home,{attributes:true,attributeFilter:['class']});
draw();syncButtons();
window.hcBubbleHome={open:big,classic:legacy,search:openSearch,recipe:recipe};
})();