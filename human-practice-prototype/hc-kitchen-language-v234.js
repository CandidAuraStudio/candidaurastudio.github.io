/* HeartClear v234 — calm Kitchen palette, single-language controls and top-level language choice.
   This is an additive UI layer: it never replaces cooking data or search handlers. */
(function(){
'use strict';
const kitchen=document.getElementById('hcHomeKitchenQuickV155');
const section=document.getElementById('hcKitchenAskV163');
if(!kitchen||!section||document.getElementById('hcKitchenLanguageBar'))return;
const KEY='hcKitchenLanguageV234';
let lang='en';
try{
 const saved=localStorage.getItem(KEY);
 if(saved==='ta'||saved==='en')lang=saved;
 else if(JSON.parse(localStorage.getItem('hcKitchenRecipeSettingsV181')||'null')?.language==='ta')lang='ta';
}catch(_){}
const tamil=/[\u0B80-\u0BFF]/u;
const bar=document.createElement('div');
bar.id='hcKitchenLanguageBar';
bar.setAttribute('role','group');
bar.setAttribute('aria-label','Recipe language');
bar.innerHTML='<span id="hcKitchenLanguageCaption">Language</span><div class="hc-kitchen-lang-options"><button type="button" data-kitchen-lang="en">English</button><button type="button" data-kitchen-lang="ta" lang="ta">தமிழ்</button></div>';
kitchen.insertBefore(bar,kitchen.firstChild);
const style=document.createElement('style');
style.id='hcKitchenLanguageStyleV234';
style.textContent=[
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155{background:#101e27!important;color:#edf3f5!important;border-color:#516675!important;max-width:100%;box-sizing:border-box;overflow:visible}',
'#hcKitchenLanguageBar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 22px;padding:0 0 15px;border-bottom:1px solid #475d69;box-sizing:border-box}',
'#hcKitchenLanguageCaption{color:#eef2f3;font:650 clamp(17px,4.5vw,21px) system-ui}',
'#hcKitchenLanguageBar .hc-kitchen-lang-options{display:flex;align-items:center;gap:7px;flex-wrap:wrap}',
'body.hc-flow-enabled #home.active #hcKitchenLanguageBar button{min-height:50px!important;width:auto!important;flex:none!important;padding:10px 15px!important;background:#1c313c!important;color:#f2f6f7!important;border:1.5px solid #637987!important;border-radius:16px!important;font:700 clamp(17px,4.5vw,21px) system-ui!important}',
'body.hc-flow-enabled #home.active #hcKitchenLanguageBar button[aria-pressed="true"]{background:#dae9ed!important;color:#12232c!important;border-color:#dae9ed!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163{max-width:100%;min-width:0;box-sizing:border-box}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 > label{font-size:clamp(20px,5.1vw,27px)!important;line-height:1.45!important;color:#e9f0f3!important;margin:0 0 15px!important;overflow-wrap:anywhere;letter-spacing:0!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 .hc-search-line{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:10px!important;width:100%;box-sizing:border-box}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 :is(input[type="search"],select),body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenWorldV207 select{background:#1d3340!important;color:#f6f8f9!important;border:1.5px solid #8396a1!important;border-radius:17px!important;box-shadow:none!important;min-width:0!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:12px 16px!important;font-size:clamp(18px,4.7vw,22px)!important;min-height:58px!important;-webkit-text-fill-color:#f6f8f9!important;color-scheme:dark}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskInput::placeholder{color:#c0cdd3!important;opacity:1!important;-webkit-text-fill-color:#c0cdd3!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 .hc-cuisine-line{display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:9px!important;margin:18px 0 15px!important;max-width:100%}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 .hc-cuisine-line label{white-space:normal!important;color:#d5e1e6!important;font-size:clamp(17px,4.5vw,21px)!important;line-height:1.45!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskSend{display:block;width:100%!important;max-width:100%!important;min-height:54px!important;flex:none!important;background:#294452!important;color:#f9fbfc!important;border:1.5px solid #8299a5!important;font-size:clamp(18px,4.5vw,22px)!important;text-align:center!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenTomorrow{width:100%!important;max-width:100%!important;background:#294452!important;color:#fff!important;border:1.5px solid #8299a5!important}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 :is(button,summary){overflow-wrap:anywhere}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskV163 .hc-kitchen-search-results button,body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenWorldV207 button{background:#213743!important;color:#f5f9fa!important;border-color:#718894!important;white-space:normal!important;text-align:left}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 #hcKitchenAskReply{background:#132733!important;color:#f4f7f8!important;white-space:pre-line!important;overflow-wrap:anywhere}',
'body.hc-flow-enabled #home.active #hcHomeKitchenQuickV155 :is(input,select,button):focus-visible{outline:3px solid #e7eeef!important;outline-offset:3px!important}',
'@media(max-width:390px){#hcKitchenLanguageBar{align-items:stretch;gap:8px}#hcKitchenLanguageBar .hc-kitchen-lang-options{width:100%;display:grid;grid-template-columns:1fr 1fr}body.hc-flow-enabled #home.active #hcKitchenLanguageBar button{width:100%!important;padding-inline:8px!important}}'
].join('\n');
document.head.appendChild(style);
const $=id=>document.getElementById(id);
const locale={
 en:{caption:'Language',title:'What can we cook?',searchLabel:'Search food, drinks or ingredients',placeholder:'Any food, drink or ingredient…',search:'Search',tradition:'Tradition',tomorrow:'Tomorrow',save:'Save for tomorrow',world:'More recipes online',worldTitle:'Explore world food',type:'Food type',area:'Cuisine',meals:'Meal ideas',dosa:'Dosa',learn:'KITCHEN',science:'Food science & sources'},
 ta:{caption:'மொழி',title:'என்ன சமைக்கலாம்?',searchLabel:'உணவு, பானம் அல்லது பொருள் தேடுங்கள்',placeholder:'உணவு, பானம் அல்லது பொருள்…',search:'தேடு',tradition:'சமையல் மரபு',tomorrow:'நாளை',save:'நாளைக்குச் சேமி',world:'மேலும் உலக உணவுகள்',worldTitle:'உலக உணவுகள்',type:'உணவு வகை',area:'நாட்டுச் சமையல்',meals:'உணவு யோசனைகள்',dosa:'தோசை',learn:'சமையல்',science:'உணவு அறிவியல் மற்றும் ஆதாரங்கள்'}
};
const traditions={
 all:['All traditions','அனைத்து மரபுகளும்'],tamil:['Tamil','தமிழ்'],srilankantamil:['Sri Lankan Tamil','இலங்கைத் தமிழ்'],indian:['Indian','இந்திய'],chinese:['Chinese','சீன'],indonesian:['Indonesian','இந்தோனேசிய'],malaysian:['Malaysian','மலேசிய'],nepali:['Nepali','நேபாள'],bangladeshi:['Bangladeshi','வங்கதேச'],middleeastern:['Middle Eastern / Arab','மத்திய கிழக்கு / அரபு'],mediterranean:['Mediterranean','மத்திய தரைக்கடல்'],italian:['Italian','இத்தாலிய'],scandinavian:['Scandinavian','வட ஐரோப்பிய'],european:['Other European','பிற ஐரோப்பிய'],fusion:['Tamil + world fusion','தமிழ் கலவை']
};
const categories={Breakfast:'காலை உணவு',Vegetarian:'சைவம்',Vegan:'தாவர உணவு',Seafood:'கடல் உணவு',Chicken:'கோழி',Beef:'மாட்டிறைச்சி',Lamb:'ஆட்டிறைச்சி',Pasta:'பாஸ்தா',Side:'தொட்டுக்கறி',Starter:'முன் உணவு',Dessert:'இனிப்பு',Miscellaneous:'பல்வகை'};
const areas={Indian:'இந்திய',Italian:'இத்தாலிய',Chinese:'சீன',Japanese:'ஜப்பானிய',Thai:'தாய்',Mexican:'மெக்சிகன்',French:'பிரெஞ்சு',Greek:'கிரேக்க',Turkish:'துருக்கிய',Moroccan:'மொராக்கோ',Egyptian:'எகிப்திய',American:'அமெரிக்க',British:'பிரிட்டிஷ்',Vietnamese:'வியட்நாம்',Malaysian:'மலேசிய',Filipino:'பிலிப்பைன்ஸ்',Jamaican:'ஜமைக்கா'};
function write(n,v){if(n&&v!=null&&n.textContent!==v)n.textContent=v}
function bilingual(line){
 if(!line.includes(' / '))return line;
 const ix=line.indexOf(' / '),en=line.slice(0,ix).trim(),ta=line.slice(ix+3).trim();
 if(!tamil.test(ta))return line;
 if(/^Tomorrow\s*·\s*\d{4}-\d\d-\d\d/.test(en)&&lang==='ta')return 'நாளை · '+en.match(/\d{4}-\d\d-\d\d/)[0];
 // Keep leading quantities that precede bilingual count labels.
 const number=/^\s*(\d+)\s+(?:recipes|results)\s*$/i.exec(en);
 return number ? (lang==='ta'?number[1]+' '+ta:en):(lang==='ta'?ta:en);
}
const recipeRaw=new WeakMap();
function replyText(){
 const root=$('hcKitchenAskReply');if(!root||root.hidden)return;
 const node=root.firstChild;
 if(!node||node.nodeType!==3)return;
 if(!recipeRaw.has(node))recipeRaw.set(node,node.textContent);
 const raw=recipeRaw.get(node);
 const rows=raw.split('\n');
 const hasTamilMethod=rows.some(s=>tamil.test(s)&&!/[A-Za-z]/.test(s)&&s.length>38);
 const lines=[];
 for(let i=0;i<rows.length;i++){
  const s=rows[i],prev=rows[i-1]||'',next=rows[i+1]||'';
  const pairAfter=!tamil.test(s)&&tamil.test(next)&&!/[A-Za-z]/.test(next)&&next.length>12;
  const pairBefore=tamil.test(s)&&!tamil.test(prev)&&/[A-Za-z]/.test(prev)&&s.length>12;
  if(hasTamilMethod&&lang==='ta'&&pairAfter)continue;
  if(hasTamilMethod&&lang==='en'&&pairBefore)continue;
  if(lang==='en'&&tamil.test(s)&&!/[A-Za-z]/.test(s)&&s.length>12)continue;
  lines.push(bilingual(s));
 }
 let updated=lines.join('\n').replace(/\n{3,}/g,'\n\n').trim();
 if(lang==='ta'&&!hasTamilMethod&&/[A-Za-z]{15}/.test(updated)){
  updated='இந்தச் செய்முறையின் முழுத் தமிழ் மொழிபெயர்ப்பு இன்னும் இல்லை. அசல் ஆங்கில வழிமுறை கீழே உள்ளது.\n\n'+updated;
 }
 if(node.textContent!==updated)node.textContent=updated;
 const science=root.querySelector('.hc-kitchen-science > summary');
 write(science,locale[lang].science);
}
const buttonRaw=new WeakMap();
function resultNames(){
 const r=$('hcKitchenSearchResults');
 if(!r)return;
 r.querySelectorAll('button.hc-recipe-match').forEach(b=>{
  if(!buttonRaw.has(b)){
   const original=b.textContent;
   const cut=original.indexOf(' · ');
   buttonRaw.set(b,[cut>=0?original.slice(0,cut):original,cut>=0?original.slice(cut+3):'']);
  }
  const pair=buttonRaw.get(b);
  write(b,lang==='ta'?(pair[1]||pair[0]):pair[0]);
 });
 r.querySelectorAll('.hc-kitchen-count').forEach(n=>{
  const count=(n.textContent.match(/\d+/)||[])[0];
  if(count)write(n,count+' '+(lang==='ta'?'செய்முறைகள்':'recipes'));
 });
 r.querySelectorAll('button.hc-kitchen-more').forEach(n=>{
  const count=(n.textContent.match(/\d+/)||[])[0];
  write(n,(lang==='ta'?'மேலும் காண்க':'Show more')+(count?' ('+count+')':''));
 });
 r.querySelectorAll('p:not(.hc-kitchen-count)').forEach(n=>{
  const s=n.textContent;
  if(s.includes('Not saved here yet')||s.includes('இங்கு இல்லை'))write(n,lang==='ta'?'இங்கு பொருத்தமான செய்முறை இல்லை. இணையத்தில் பார்க்கலாம்.':'No matching built-in recipe. You can search online.');
 });
 r.querySelectorAll('button:not(.hc-recipe-match):not(.hc-kitchen-more)').forEach(n=>{
  const s=n.textContent;
  if(s.includes('Search more recipes')||s.includes('இணையத்தில் மேலும்'))write(n,lang==='ta'?'இணையத்தில் மேலும் தேடு ↗':'Search more recipes online ↗');
 });
}
function worldLabels(){
 const discovery=section.querySelector('.hc-world-discovery');
 write(discovery?.querySelector(':scope > summary'),locale[lang].world);
 write($('hcKitchenWorldV207')?.querySelector('.hc-world-title'),locale[lang].worldTitle);
 const type=$('hcWorldCategory'),area=$('hcWorldArea');
 if(type?.options.length){write(type.options[0],locale[lang].type);for(const o of [...type.options].slice(1))write(o,lang==='ta'?(categories[o.value]||o.value):o.value)}
 if(area?.options.length){write(area.options[0],locale[lang].area);for(const o of [...area.options].slice(1))write(o,lang==='ta'?(areas[o.value]||o.value):o.value)}
 const status=$('hcWorldStatus');
 if(status){
  const s=status.textContent;
  if(s.includes('Searching worldwide')||s.includes('தேடப்படுகின்றன'))write(status,lang==='ta'?'உலக உணவுகள் தேடப்படுகின்றன…':'Searching worldwide recipes…');
  else if(s.includes('service unavailable')||s.includes('சேவை கிடைக்கவில்லை'))write(status,lang==='ta'?'இணையச் சேவை கிடைக்கவில்லை. உள்ளூர் செய்முறைகள் உள்ளன.':'Online recipes unavailable. Built-in recipes still work.');
  else if(s.includes('No online match')||s.includes('பெயர் கிடைக்கவில்லை'))write(status,lang==='ta'?'இந்தப் பெயரில் இணையச் செய்முறை கிடைக்கவில்லை.':'No online match for this name.');
  else if(s.includes('Offline:')||s.includes('இணையம் இல்லை'))write(status,lang==='ta'?'இணையம் இல்லை. உள்ளூர் செய்முறைகளைப் பயன்படுத்தலாம்.':'Offline. Use built-in recipes.');
  else if(/available\s*\/\s*கிடைக்கும்|^\d+\s*(?:recipes available|செய்முறைகள்)/.test(s)){
   const count=(s.match(/\d+/)||[])[0]||'';
   write(status,lang==='ta'?count+' செய்முறைகள்':count+' recipes available');
  }
 }
 const world=$('hcWorldResults');
 world?.querySelectorAll('button').forEach(b=>{
  if(b.dataset.mealId)return;
  if(b.textContent.includes('More recipes')||b.textContent.includes('மேலும் செய்முறைகள்')){
   const count=(b.textContent.match(/\d+/)||[])[0]||'';
   write(b,(lang==='ta'?'மேலும் செய்முறைகள்':'More recipes')+(count?' ('+count+')':''));
  }else if(b.textContent.includes('Find more on the web')||b.textContent.includes('இணையத்தில் மேலும் தேடவும்'))write(b,lang==='ta'?'இணையத்தில் மேலும் தேடு ↗':'Find more online ↗');
 });
 const recipe=$('hcWorldRecipe');
 if(recipe){
  recipe.querySelectorAll('h5').forEach(n=>{
   if(n.textContent.includes('Ingredients')||n.textContent.includes('தேவையானவை'))write(n,lang==='ta'?'தேவையானவை':'Ingredients');
   if(n.textContent.includes('Cooking')||n.textContent.includes('சமைப்பது'))write(n,lang==='ta'?'செய்முறை':'Cooking');
  });
  const link=recipe.querySelector('a');
  if(link)write(link,lang==='ta'?'அசல் செய்முறை ↗':'Original recipe ↗');
  // TheMealDB supplies most recipe methods in English; do not pretend they are translated.
  const p=recipe.querySelector('p');
  if(p&&!tamil.test(p.textContent)&&lang==='ta'&&!recipe.querySelector('.hc-translation-note')){
   const note=document.createElement('small');note.className='hc-translation-note';
   note.textContent='அசல் சமையல் வழிமுறை ஆங்கிலத்தில் உள்ளது.';
   p.before(note);
  }else if(lang==='en')recipe.querySelector('.hc-translation-note')?.remove();
 }
}
function sync(){
 const t=locale[lang];
 kitchen.lang=lang==='ta'?'ta':'en';
 write($('hcKitchenLanguageCaption'),t.caption);
 bar.querySelectorAll('button[data-kitchen-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kitchenLang===lang)));
 write(section.querySelector('label[for="hcKitchenAskInput"]'),t.searchLabel);
 const input=$('hcKitchenAskInput');if(input)input.placeholder=t.placeholder;
 write($('hcKitchenAskSend'),t.search);
 write(section.querySelector('label[for="hcKitchenTradition"]'),t.tradition);
 const tr=$('hcKitchenTradition');
 if(tr)for(const o of tr.options){const labels=traditions[o.value];if(labels)write(o,labels[lang==='ta'?1:0])}
 write($('hcKitchenTomorrow'),t.tomorrow);
 write($('hcKitchenSavePlan'),t.save);
 write(kitchen.querySelector(':scope > strong'),t.title);
 write(kitchen.querySelector(':scope > .hcr-small'),t.learn);
 write($('hcrMeals'),t.meals);
 write($('hcrDosa'),t.dosa);
 resultNames();replyText();worldLabels();
}
let scheduled=false;
function schedule(){
 if(scheduled)return;
 scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;sync()});
}
bar.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
 lang=b.dataset.kitchenLang;
 try{localStorage.setItem(KEY,lang)}catch(_){}
 sync();
}));
const observer=new MutationObserver(schedule);
observer.observe(section,{subtree:true,childList:true,characterData:true});
sync();
window.HCKitchenLanguage={get:()=>lang,set:(value)=>{if(value!=='en'&&value!=='ta')return;lang=value;try{localStorage.setItem(KEY,lang)}catch(_){}sync()}};
})();