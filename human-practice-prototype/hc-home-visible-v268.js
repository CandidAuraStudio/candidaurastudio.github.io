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
   const stamp=document.createElement('small');stamp.id='hcHomeVersion268';
   stamp.textContent='HeartClear interface · v276';
   stamp.style.cssText='display:block;margin:12px 0 18px;text-align:center;font:500 11px/1.4 system-ui;color:#b6b2aa';
   settings.append(stamp);
 }else{
   const stamp=document.createElement('span');stamp.id='hcHomeVersion268';stamp.hidden=true;home.append(stamp);
 }
 home.classList.add('hc-home-layout-268');
})();