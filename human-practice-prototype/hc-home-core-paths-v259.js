/* HeartClear Home: inclusive daily paths; original screens/audio/history remain. */
(function(){
 'use strict';
 const home=document.getElementById('home'),bubble=document.getElementById('hcBubbleHome');
 if(!home||!bubble||document.getElementById('hcCorePathsClassic'))return;
 const faith=[['islam','Islam','Play Morning Adhkar'],['bible','Bible','Open Genesis reader'],['hindu','Hindu','Play Mantra']];
 const paths=[['books','Books','All reading and audiobooks'],['audio','Audio Journeys','Meditation and listening'],['kitchen','Kitchen','Cooking and heritage recipes'],['human','Human Journey','Daily care and attention'],['nature','Nature Sounds','Forest, flute and rain'],['explore','More','All HeartClear experiences']];
 function go(key){
  try{switch(key){
   case 'islam':if(typeof window.hcPlayAdhkar==='function')window.hcPlayAdhkar('listen');else window.openSacred?.('islamic');break;
   case 'bible':if(typeof window.hcBubbleHome?.bible==='function')window.hcBubbleHome.bible();else window.show?.('library');break;
   case 'hindu':if(typeof window.hcQuickPlaySound==='function')window.hcQuickPlaySound('mantra');else window.openSacred?.('hindu');break;
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
  const a=document.createElement('h2');a.textContent='Prayer & reflection';
  const p=document.createElement('p');p.textContent='Choose a tradition or simply listen to nature. Nothing plays automatically.';
  const b=document.createElement('h2');b.textContent='Explore your journeys';
  const f=document.createElement('div');f.className='hc-path-faith';
  const g=document.createElement('div');g.className='hc-path-main';
  for(const [rows,holder] of [[faith,f],[paths,g]])for(const [key,title,desc] of rows){
   const button=document.createElement('button');button.type='button';button.dataset.path=key;
   const text=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small'),arrow=document.createElement('span');
   strong.textContent=title;small.textContent=desc;arrow.textContent='›';arrow.setAttribute('aria-hidden','true');text.append(strong,small);button.append(text,arrow);holder.append(button);
  }
  s.append(cap,a,p,f,b,g);
  s.addEventListener('click',e=>{const btn=e.target.closest?.('button[data-path]');if(btn&&s.contains(btn))go(btn.dataset.path)});
  return s;
 }
 const normal=make('hcCorePathsClassic'),daily=home.querySelector('.hc-v139-daily')||home.querySelector('.hc-home-greeting-row');
 if(daily)daily.after(normal);else home.prepend(normal);
 const compact=make('hcCorePathsLarge'),search=document.getElementById('hcBubbleSearch');
 if(search)search.after(compact);else bubble.prepend(compact);
 const status=document.createElement('p');status.id='hcCorePathStatus';status.setAttribute('role','status');normal.append(status);
 const style=document.createElement('style');style.id='hcCorePathsCss';
 style.textContent=[
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
})();