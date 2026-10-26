/* HeartClear v268 — single visible Home order; reuses all existing players and controls. */
(function(){
 'use strict';
 const home=document.getElementById('home');
 const greeting=home?.querySelector('.hc-home-greeting-row');
 const brand=document.getElementById('hcHomeBrandBar');
 const paths=document.getElementById('hcCorePathsClassic');
 if(!home||!greeting||!brand||!paths||document.getElementById('hcHomeVersion268'))return;

 // Infinity sits above the local-time greeting. Never duplicate the language switch.
 greeting.before(brand);
 greeting.after(paths);
 const hero=paths.querySelector('.hc-path-hero');
 const faith=paths.querySelector('.hc-path-faith');
 const main=paths.querySelector('.hc-path-main');
 const otherHeading=[...paths.children].find(el=>el.tagName==='H2'&&!el.classList.contains('hc-path-period'));
 const caption=paths.querySelector('.hc-path-cap');
 const status=document.getElementById('hcCorePathStatus');
 if(hero&&faith){
   // Keep one context-aware meditation Play, then three equal scripture entries.
   paths.prepend(hero);
   hero.after(faith);
   for(const group of document.querySelectorAll('#home .hc-path-faith')){
     for(const btn of group.querySelectorAll('button[data-path]')){
       const labels={islam:'Qur’an',bible:'Bible',hindu:'Bhagavad Gita'};
       if(labels[btn.dataset.path]){
         const title=btn.querySelector('strong');if(title)title.textContent=labels[btn.dataset.path];
         btn.setAttribute('aria-label','Open '+labels[btn.dataset.path]+' player on this page');
       }
     }
   }
 }
 // Additional journeys are still here, but do not precede the requested players.
 if(main){
   const extras=document.createElement('details');extras.id='hcHomeMorePaths268';
   const summary=document.createElement('summary');summary.textContent='Explore more';
   extras.append(summary);
   if(otherHeading)extras.append(otherHeading);
   extras.append(main);
   if(status)extras.append(status);
   paths.append(extras);
 }
 if(caption)caption.remove();

 // Small, original HeartClear Home view. No media handlers or sources replaced.
 if(brand&&!document.getElementById('hcHomeWordmarkDesign')){
   const word=document.createElement('strong');
   word.id='hcHomeWordmarkDesign';
   word.textContent='HeartClear';
   const selector=document.getElementById('hcAppLanguageHome');
   brand.insertBefore(word,selector&&selector.parentElement===brand?selector:null);
 }
 const copy=greeting.querySelector('.hc-home-greeting-copy');
 if(copy&&!document.getElementById('hcHomeIntroDesign')){
   const intro=document.createElement('p');
   intro.id='hcHomeIntroDesign';
   intro.textContent='A moment for yourself.';
   copy.append(intro);
 }
 if(hero&&!document.getElementById('hcHomeWorldsDesign')){
   const period=hero.querySelector('.hc-path-period');
   if(period&&!hero.querySelector('.hc-path-subtitle')){
     const subtitle=document.createElement('small');
     subtitle.className='hc-path-subtitle';
     subtitle.textContent='One tap. Just listen.';
     period.after(subtitle);
   }
   const worlds=document.createElement('div');
   worlds.id='hcHomeWorldsDesign';
   worlds.className='hc-home-worlds';
   worlds.setAttribute('role','group');
   worlds.setAttribute('aria-label','Explore HeartClear');
   const cards=[
     ['books','Bookshelf','<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'],
     ['nature','Nature','<path d="m12 22 0-8"/><path d="m6 14 6-12 6 12z"/><path d="M3 22h18"/>'],
     ['kitchen','Kitchen','<path d="M4 9h14v5a7 7 0 0 1-14 0z"/><path d="M18 9h1a3 3 0 0 1 0 6h-1"/><path d="M4 22h14"/>'],
     ['audio','Listening','<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="2" y="13" width="4" height="8" rx="2"/><rect x="18" y="13" width="4" height="8" rx="2"/>']
   ];
   for(const [key,label,shape] of cards){
     const button=document.createElement('button');
     button.type='button';
     button.className='hc-world-card';
     button.dataset.path=key;
     button.setAttribute('aria-label','Open '+label);
     button.innerHTML='<svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+shape+'</svg>';
     const name=document.createElement('strong');
     name.textContent=label;
     button.append(name);
     worlds.append(button);
   }
   if(faith&&faith.parentElement===paths)faith.after(worlds);else hero.after(worlds); // Scripture choices remain directly below meditation.
 }


 // Move the ORIGINAL elements — never clone a control, iframe, or audio player.
 const quran=document.getElementById('hcQuranFirst');
 const bible=document.getElementById('hcGenesisCard');
 const gita=document.getElementById('hcHinduHome');
 const gitaStatus=document.getElementById('hcHinduHomeStatus');
 let cursor=paths;
 for(const item of [quran,bible,gita,gitaStatus]){
   if(item){cursor.insertAdjacentElement('afterend',item);cursor=item;}
 }
 // A tiny Settings-only stamp makes it possible to distinguish a new PWA
 // shell from an old cached build without covering the Home design.
 const settings=document.getElementById('settings');
 if(settings){
   // Keep one authoritative, visible version. The older secondary v269 stamp
   // conflicted with the v192 label and actual offline build number.
   const label=settings.querySelector('.app-version');
   if(label)label.textContent='HeartClear · HC v285 (review candidate)';
   const stamp=document.createElement('span');
   stamp.id='hcHomeVersion268';stamp.hidden=true;settings.append(stamp);
 }else{
   const stamp=document.createElement('span');stamp.id='hcHomeVersion268';stamp.hidden=true;home.append(stamp);
 }
 home.classList.add('hc-home-layout-268');
})();