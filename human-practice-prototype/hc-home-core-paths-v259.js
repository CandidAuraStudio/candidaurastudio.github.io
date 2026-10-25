/* HeartClear Home: inclusive daily paths; original screens/audio/history remain. */
(function(){
 'use strict';
 const home=document.getElementById('home'),bubble=document.getElementById('hcBubbleHome');
 if(!home||!bubble||document.getElementById('hcCorePathsClassic'))return;
 const faith=[['islam','Qur’an',''],['bible','Bible',''],['hindu','Hindu','']];
 const paths=[['books','Books','All reading and audiobooks'],['audio','Audio Journeys','Meditation and listening'],['kitchen','Kitchen','Cooking and heritage recipes'],['human','Human Journey','Daily care and attention'],['nature','Nature Sounds','Forest, flute and rain'],['explore','More','All HeartClear experiences']];
 function go(key){
  try{switch(key){
   case 'islam':{
    // Open the complete Qur'an listening controls on Home. Adhkar stays separate.
    window.show?.('home');
    const player=document.getElementById('hcQuranFirst');
    const directory=document.getElementById('hcqBrowse');
    if(directory)directory.open=true;
    player?.scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('hcqPlay')?.focus({preventScroll:true});
    break;
   }
   case 'bible':{
    window.show?.('home');
    const card=document.getElementById('hcGenesisCard');
    const chapterMenu=document.getElementById('hcGenSelect')?.closest('details');
    if(chapterMenu)chapterMenu.open=true;
    card?.scrollIntoView({behavior:'smooth',block:'start'});
    document.getElementById('hcGenPlay')?.focus({preventScroll:true});
    break;
   }
   case 'hindu':{
    window.show?.('home');
    document.getElementById('hcHinduHome')?.scrollIntoView({behavior:'smooth',block:'center'});
    document.querySelector('#hcHinduHome .hc-hindu-play')?.focus({preventScroll:true});
    break;
   }
   case 'books':window.show?.('library');break;
   case 'audio':if(typeof window.hcOpenAllListening==='function')window.hcOpenAllListening();else window.openSoundLab?.();break;
   case 'kitchen':if(typeof window.hcBubbleHome?.recipe==='function')window.hcBubbleHome.recipe('');else window.hcFlow?.openExplore?.();break;
   case 'human':window.show?.('human');break;
   case 'nature':window.openSoundLab?.();break;
   case 'explore':window.hcFlow?.openExplore?.();break;
  }}catch(e){const m=document.getElementById('hcCorePathStatus');if(m)m.textContent='This section did not open. Try Search.'}
 }
 function make(id){
  const s=document.createElement('section');s.id=id;s.className='hc-core-paths';s.setAttribute('aria-label','Main HeartClear choices');
  const cap=document.createElement('div');cap.textContent='YOUR DAY · YOUR CHOICE';cap.className='hc-path-cap';
  const hero=document.createElement('div');hero.className='hc-path-hero';
  hero.innerHTML='<div class="hc-path-head"><strong>Meditation</strong><span class="hc-path-day">Morning</span></div>'+
   '<h2 class="hc-path-period">Deep Wake Up</h2>'+
   '<button type="button" class="hc-path-begin">Begin meditation <span aria-hidden="true">▶</span></button>';
  hero.querySelector('button').addEventListener('click',()=>{
   const key=hcPathPeriod();
   if(typeof window.hcHomePlayGuided==='function')window.hcHomePlayGuided(key);
   else if(typeof window.hcStartExistingGuidedSession==='function')window.hcStartExistingGuidedSession(key);
  });
  const b=document.createElement('h2');b.textContent='Explore your journeys';
  const f=document.createElement('div');f.className='hc-path-faith';
  const g=document.createElement('div');g.className='hc-path-main';
  for(const [rows,holder] of [[faith,f],[paths,g]])for(const [key,title,desc] of rows){
   const button=document.createElement('button');button.type='button';button.dataset.path=key;
   const text=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small'),arrow=document.createElement('span');
   strong.textContent=title;small.textContent=desc;arrow.textContent='›';arrow.setAttribute('aria-hidden','true');text.append(strong,small);button.append(text,arrow);holder.append(button);
  }
  s.append(hero,f,b,g);
  s.addEventListener('click',e=>{const btn=e.target.closest?.('button[data-path]');if(btn&&s.contains(btn))go(btn.dataset.path)});
  return s;
 }
 // Official HeartClear infinity, aligned with the single Home language switch.
 const appLanguage=document.getElementById('hcAppLanguageHome');
 if(appLanguage&&!document.getElementById('hcHomeBrandBar')){
  const bar=document.createElement('div');bar.id='hcHomeBrandBar';
  const symbol=document.createElementNS('http://www.w3.org/2000/svg','svg');
  symbol.id='hcHomeInfinity';symbol.setAttribute('viewBox','0 0 512 512');
  symbol.setAttribute('role','img');symbol.setAttribute('aria-label','HeartClear infinity logo');
  const curve=document.createElementNS('http://www.w3.org/2000/svg','path');
  curve.setAttribute('d','M128 341.333c106.667 0 149.333-170.666 256-170.666a85.333 85.333 0 0 1 0 170.666c-106.667 0-149.333-170.666-256-170.666a85.333 85.333 0 1 0 0 170.666');
  curve.setAttribute('fill','none');curve.setAttribute('stroke','currentColor');curve.setAttribute('stroke-width','32');
  curve.setAttribute('stroke-linecap','round');curve.setAttribute('stroke-linejoin','round');
  symbol.append(curve);bar.append(symbol);
  appLanguage.before(bar);bar.append(appLanguage);
 }
 const normal=make('hcCorePathsClassic'),daily=home.querySelector('.hc-v139-daily')||home.querySelector('.hc-home-greeting-row');
 if(daily)daily.before(normal);else home.prepend(normal);
 const compact=make('hcCorePathsLarge'),search=document.getElementById('hcBubbleSearch');
 if(search)search.after(compact);else bubble.prepend(compact);
 const status=document.createElement('p');status.id='hcCorePathStatus';status.setAttribute('role','status');normal.append(status);
 const style=document.createElement('style');style.id='hcCorePathsCss';
 style.textContent=[
 '#home #hcHomeBrandBar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:4px 0 10px;min-height:52px;width:100%;box-sizing:border-box}',
 '#home #hcHomeInfinity{display:block;flex:none;color:#fff;width:54px;height:54px;max-width:18vw}',
 '#home #hcHomeBrandBar #hcAppLanguageHome{display:flex!important;align-items:center!important;max-width:calc(100% - 70px)!important;width:max-content!important;margin:0 0 0 auto!important;padding:2px!important;border:1px solid #83949e;border-radius:16px!important;background:#111b22}',
 '#home #hcHomeBrandBar #hcAppLanguageHome button{min-width:65px!important;min-height:42px!important;padding:7px 10px!important;font-size:13px!important;border-radius:12px!important}',
 '#home .hc-core-paths{display:grid;gap:12px;width:100%;max-width:680px;box-sizing:border-box;margin:8px auto 16px;padding:17px;border:1px solid rgba(210,231,241,.17);border-radius:20px;background:linear-gradient(145deg,#12303e,#091d29)}',
 '#home .hc-core-paths *{box-sizing:border-box}',
 '#home .hc-path-cap{letter-spacing:.13em;color:#d9bb89;font:700 10px system-ui}',
 '#home .hc-core-paths h2{font:720 20px/1.2 system-ui!important;color:#fff!important;margin:0!important}',
 '#home .hc-core-paths p{font:450 13px/1.5 system-ui;color:#cad7dd;margin:0}',
 '#home .hc-path-faith{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}',
 '#home .hc-path-main{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
 '#home .hc-core-paths button{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:70px;min-width:0;width:100%;padding:11px;border:1px solid rgba(220,237,245,.18);border-radius:14px;text-align:left;background:#153544;color:white;font:inherit}',
 '#home .hc-core-paths button>span:first-child{display:grid;gap:5px;min-width:0}',
 '#home .hc-core-paths button strong{font:700 13px/1.3 system-ui;color:#fff;overflow-wrap:anywhere}',
 '#home .hc-core-paths button small{font:450 11px/1.4 system-ui;color:#c5d4db;overflow-wrap:anywhere}',
 '#home .hc-core-paths button>span:last-child{font:700 23px system-ui;color:#e6c58b}',
 '#home .hc-core-paths button:focus-visible{outline:3px solid #fff;outline-offset:2px}',
 '#home.hc-bubble-mode #hcCorePathsLarge{display:grid!important}',
 '#home.hc-bubble-detail #hcCorePathsClassic,#home.hc-bubble-detail #hcCorePathsLarge{display:none!important}',
 '@media(max-width:380px){#home .hc-path-faith{grid-template-columns:1fr}}',
 '@media(prefers-reduced-motion:reduce){#home .hc-core-paths *{animation:none!important;transition:none!important}}'
 ].join('\n');document.head.appendChild(style);

 const periods={wake:['Morning','Deep Wake Up'],noon:['Midday','Noon Reset'],evening:['Evening','Evening Release'],sleep:['Night','Deep Sleep']};
 function hcPathPeriod(){const h=new Date().getHours();return h>=5&&h<12?'wake':h>=12&&h<17?'noon':h>=17&&h<21?'evening':'sleep'}
 function refreshHcPeriods(){
  const key=hcPathPeriod(),p=periods[key];
  document.querySelectorAll('#home .hc-path-hero').forEach(hero=>{
   if(hero.dataset.period===key)return;
   hero.dataset.period=key;
   hero.querySelector('.hc-path-day').textContent=p[0];
   hero.querySelector('.hc-path-period').textContent=p[1];
   hero.querySelector('.hc-path-begin').setAttribute('aria-label','Begin '+p[0].toLowerCase()+' meditation');
  });
 }
 refreshHcPeriods();
 setInterval(refreshHcPeriods,60000);
 window.addEventListener('focus',refreshHcPeriods);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshHcPeriods()});
 const newer=document.createElement('style');newer.id='hcPathLayoutUpdate';
 newer.textContent=[
 '#home>.hc-v139-daily{display:none!important}',
 '#home .hc-core-paths{background:#11171b!important;border-color:rgba(255,255,255,.16)!important;padding:14px!important;gap:12px!important}',
 '#home .hc-core-paths .hc-path-hero{display:grid;gap:12px;background:#191f23;padding:16px;border:1px solid #3c464c;border-radius:16px}',
 '#home .hc-core-paths .hc-path-head{display:flex;justify-content:space-between;align-items:center;gap:10px;font:700 12px system-ui;color:#f2f2f0}',
 '#home .hc-core-paths .hc-path-day{color:#d7bc8c}',
 '#home .hc-core-paths .hc-path-period{margin:0!important;font:750 26px/1.2 system-ui!important;color:#fff!important}',
 '#home .hc-core-paths .hc-path-begin{width:100%;min-height:54px;background:#f3f3ef!important;color:#111519!important;border:0!important;border-radius:12px!important;display:flex;align-items:center;justify-content:space-between;padding:12px 16px!important;font:750 15px system-ui!important}',
 '#home .hc-path-faith{grid-template-columns:1fr!important;gap:7px!important}',
 '#home .hc-path-faith button{width:100%;min-height:49px!important;padding:11px 14px!important;border-radius:12px!important;background:#1a2226!important;gap:12px!important}',
 '#home .hc-path-faith button strong{font:700 15px/1.3 system-ui!important}',
 '#home .hc-path-faith button small{display:none!important}',
 '#home .hc-core-paths h2:not(.hc-path-period){font:700 17px/1.3 system-ui!important;margin:13px 0 0!important}',
 '#home .hc-path-main button{background:#1a2226!important;min-height:62px!important}',
 '#home:not(.hc-bubble-mode) #hcCorePathsLarge,#home.hc-bubble-mode #hcCorePathsClassic{display:none!important}',
 '#home.hc-bubble-mode #hcCorePathsLarge{display:grid!important}',
 '#home.hc-bubble-detail #hcCorePathsClassic,#home.hc-bubble-detail #hcCorePathsLarge{display:none!important}',
 'body.hc-flow-enabled .global-mini.show{bottom:calc(112px + env(safe-area-inset-bottom,0px))!important}',
 'body.hc-mini-visible:not(.hc-reels-active) .app{padding-bottom:calc(var(--nav-h,68px) + var(--safe-bottom,0px) + 175px)!important}'
 ].join(String.fromCharCode(10));document.head.appendChild(newer);
 })();