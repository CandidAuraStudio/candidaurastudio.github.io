/* HeartClear v256 — restore the small, functional Home. Keep media and source content unchanged. */
(function(){
'use strict';
const home=document.getElementById('home');
const greeting=home?.querySelector('.hc-home-greeting-row');
const daily=home?.querySelector('.hc-v139-daily');
const start=home?.querySelector('.hc-simple-start');
if(!home||!greeting||!daily||!start||document.getElementById('hcHomeLayoutV256'))return;

// One visible set of meditation shortcuts: all four existing buttons keep
// their v139 one-tap player handlers and saved resume behavior.
greeting.insertAdjacentElement('afterend',daily);
const routine=document.getElementById('hcHomeRoutineV155');
if(routine){routine.hidden=true;routine.setAttribute('aria-hidden','true');}

// Keep the original listening, Gita, Qur'an and Genesis nodes and listeners;
// only arrange their containers. Do not rebuild or clone any media controls.
const quran=document.getElementById('hcQuranFirst');
const genesis=document.getElementById('hcGenesisCard');
const kitchen=document.getElementById('hcHomeKitchenQuickV155');
if(quran)start.insertAdjacentElement('afterend',quran);
if(genesis)(quran||start).insertAdjacentElement('afterend',genesis);
if(kitchen)(genesis||quran||start).insertAdjacentElement('afterend',kitchen);

// The Kitchen already follows the single global language preference. Its
// extra, oversized language selector is redundant; leave its data model live.
const redundantLanguage=document.getElementById('hcKitchenLanguageBar');
if(redundantLanguage){redundantLanguage.hidden=true;redundantLanguage.setAttribute('aria-hidden','true');}

// Switching the *global* language also selects the matching existing spoken
// meaning/narration controls. Arabic Qur'an recitation remains separately
// selectable: changing the page language never alters the original Arabic.
function syncScriptureLanguage(){
 const lang=window.HCAppLanguage?.get?.();
 if(lang!=='en'&&lang!=='ta')return;
 for(const selector of [
  '#hcGenesisCard [data-genlang="'+lang+'"]',
  '#hcQuranFirst [data-hcq="'+lang+'"]'
 ]){
  const control=home.querySelector(selector);
  if(control&&control.getAttribute('aria-pressed')!=='true')control.click();
 }
}
window.addEventListener('hc:languagechange',syncScriptureLanguage);

const styles=document.createElement('style');
styles.id='hcHomeLayoutV256';
styles.textContent=[
 '#home #hcHomeRoutineV155,#home #hcKitchenLanguageBar{display:none!important}',
 // One clear set of four choices directly below the personal greeting.
 '#home>.hc-v139-daily{display:block!important;width:100%;box-sizing:border-box;margin:8px 0 14px!important}',
 '#home>.hc-v139-daily>.hc-v139-label{display:none!important}',
 '#home>.hc-v139-daily .hc-v139-daily-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important}',
 '#home>.hc-v139-daily .hc-v139-daily-grid>button{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;gap:3px!important;min-width:0!important;width:100%!important;min-height:52px!important;height:auto!important;margin:0!important;padding:7px 2px!important;border-radius:13px!important;font:650 clamp(11px,2.9vw,13px)/1.25 system-ui!important;white-space:normal!important;word-break:normal!important}',
 '#home>.hc-v139-daily .hc-v139-daily-grid>button span{font-size:14px!important}',
 // The top app-wide language control is modest in size. Settings retains its switch.
 '#home>#hcAppLanguageHome{width:max-content!important;max-width:100%!important;margin:3px 0 8px auto!important;padding:2px!important;gap:2px!important;border-radius:16px!important}',
 '#home>#hcAppLanguageHome button{min-width:65px!important;min-height:42px!important;padding:7px 10px!important;font-size:13px!important;border-radius:12px!important}',
 // Do not remove the Qur\'an controls: Arabic is the original recitation.
 '#home #hcQuranFirst,#home #hcGenesisCard{width:100%;box-sizing:border-box;min-width:0}',
 '#home #hcHomeKitchenQuickV155{margin-top:12px!important}',
 '#home #hcGenesisCard .hc-gen-langtop{display:none!important}',
 '@media(max-width:350px){#home>.hc-v139-daily .hc-v139-daily-grid{gap:4px!important}#home>.hc-v139-daily .hc-v139-daily-grid>button{font-size:10.5px!important;padding-inline:1px!important}}'
].join('\n');
document.head.appendChild(styles);
})();
