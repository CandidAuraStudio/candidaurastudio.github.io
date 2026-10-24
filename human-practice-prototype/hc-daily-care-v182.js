/* HeartClear Daily Care v183 — Read. Understand. Apply.
   Family traditions recorded accurately; no unverified treatment claims.
   Compact Tamil/English routines. No external APIs, speech synthesis, or tracking. */
(function(){
'use strict';
const home=document.getElementById('home'),kitchen=document.getElementById('hcHomeKitchenQuickV155');
if(!home||!kitchen||document.getElementById('hcEverydayCareV182'))return;
const LANG='hcEverydayCareLangV182',CHECKS='hcEverydayCareChecksV182';
const read=(k,def)=>{try{return JSON.parse(localStorage.getItem(k)||'null')||def}catch(_){return def}};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch(_){}};
let language='ta',tab='morning',checks=read(CHECKS,{});
try{if(localStorage.getItem(LANG)==='en')language='en'}catch(_){}
const say=(en,ta)=>language==='ta'?ta:en;
const tabs=[
 ['morning','Morning','காலை'],
 ['bath','Bathing','குளியல்'],
 ['food','Food','உணவு'],
 ['night','Night','இரவு'],
 ['week','Weekly','வாரம்']
];
const tasks={
 morning:[
  ['hands','Clean hands & face','கை, முகம் கழுவுதல்','Soap for hands before food and after toilet.','உணவுக்கு முன், கழிவறைக்குப் பின் சோப்பால் கை கழுவவும்.'],
  ['teeth-am','Brush teeth','பல் துலக்குதல்','Soft brush + fluoride toothpaste · 2 min.','மென்மையான பிரஷ் + ஃப்ளூரைடு பற்பசை · 2 நிமிடம்.'],
  ['breakfast','Breakfast','காலை உணவு','Choose a familiar, affordable meal when hungry.','பசி இருந்தால், வீட்டில் உள்ள சத்தான உணவைத் தேர்ந்தெடுக்கவும்.'],
  ['english','Learn English','ஆங்கிலம் கற்றல்','Say one useful sentence aloud.','பயனுள்ள ஒரு வாக்கியத்தைச் சொல்லிப் பழகவும்.']
 ],
 bath:[
  ['hair-before','Before shower','குளிப்பதற்கு முன்','Detangle hair. A little plain coconut oil on hair lengths is optional.','முடிச் சிக்கலை நீக்கவும்; விரும்பினால் முடி நீளத்தில் சிறிது தேங்காய் எண்ணெய்.'],
  ['hair-wash','During shower','குளிக்கும் போது','Wash scalp when needed; keep soap and oil out of eyes.','தேவைக்கேற்ப தலையைக் கழுவவும்; கண்களில் சோப்பு, எண்ணெய் விட வேண்டாம்.'],
  ['dry','After shower','குளித்த பின்','Dry gently, especially between toes; use clean clothes.','மெதுவாக உலர்த்தவும்; கால்விரல் இடைவெளி, சுத்தமான உடை கவனம்.']
 ],
 food:[
  ['seasonal','Buy seasonal','பருவ உணவு வாங்குதல்','Compare prices. Use rice, greens, lentils and other available foods.','விலை ஒப்பிடவும்; அரிசி, கீரை, பருப்பு, கிடைக்கும் உணவைப் பயன்படுத்தவும்.'],
  ['timing','Eat comfortably','வசதிக்கேற்பச் சாப்பிடுதல்','No universal food ban for morning or night.','காலை, இரவுக்கு எல்லோருக்கும் பொருந்தும் ஒரே உணவுத் தடை இல்லை.'],
  ['water','Drink water','நீர் குடித்தல்','Choose safe drinking water; follow individual medical advice.','சுத்தமான நீர் குடிக்கவும்; தனிப்பட்ட மருத்துவ அறிவுரையை மதிக்கவும்.'],
  ['storage','Keep food safe','உணவைப் பாதுகாத்தல்','Wash hands and chill perishable leftovers promptly.','கைகளை கழுவி எளிதில் கெடும் மீதி உணவை விரைவில் குளிரில் வைக்கவும்.']
 ],
 night:[
  ['teeth-pm','Brush teeth','பல் துலக்குதல்','Two minutes; clean between teeth daily.','இரண்டு நிமிடம்; பல் இடைவெளியும் தினமும் சுத்தம்.'],
  ['ears','Rest ears & eyes','காது, கண்களுக்கு ஓய்வு','Lower headphone sound; take screen breaks.','ஹெட்போன் சத்தம் குறை; திரையிலிருந்து ஓய்வு எடு.'],
  ['kitchen','Clean kitchen','சமையலறை சுத்தம்','Cover food, wipe surfaces, remove rubbish.','உணவை மூடி, இடத்தைத் துடைத்து, குப்பை அகற்றவும்.'],
  ['sleep','Prepare for sleep','தூக்கத்திற்குத் தயாராதல்','Keep a comfortable regular bedtime.','வசதியான, சீரான தூக்க நேரத்தைப் பின்பற்றவும்.']
 ],
 week:[
  ['nails','Check nails','நகங்களைப் பாருங்கள்','Clean nail clipper; cut toenails straight across.','சுத்தமான நகவெட்டி; கால்நகத்தை நேராக வெட்டவும்.'],
  ['hairtools','Wash hair tools','சீப்பு, துணி சுத்தம்','Clean combs and pillowcases as needed.','சீப்பும் தலையணை உறையும் தேவைக்கேற்ப கழுவவும்.'],
  ['home','Share home care','வீட்டு வேலை பகிர்வு','Towels, bathroom, kitchen and rubbish — share fairly.','துணி, குளியலறை, சமையல், குப்பை — நியாயமாகப் பகிரவும்.'],
  ['family','Keep a family memory','குடும்ப மரபை பதிவு','Ask how an elder learned one useful practice.','ஒரு பயனுள்ள வழக்கத்தை பெரியவர் எப்படி கற்றார் எனக் கேளுங்கள்.']
 ]
};
const body=[
 ['Hair & scalp','முடி · தலைத்தோல்','Before wash: optional small amount of coconut oil on hair. Wash when needed.','குளிக்கும் முன் சிறிது தேங்காய் எண்ணெய் விருப்பம். தேவைக்கேற்ப கழுவவும்.'],
 ['Eyes','கண்கள்','Clean hands. Take screen breaks. Never put household oils into eyes.','கைகள் சுத்தம். திரைக்கு ஓய்வு. கண்களில் வீட்டு எண்ணெய் விட வேண்டாம்.'],
 ['Ears','காதுகள்','Clean outside only. Keep headphones comfortable.','வெளிப்புறம் மட்டும் சுத்தம். ஹெட்போன் சத்தம் குறை.'],
 ['Nose & breathing','மூக்கு · சுவாசம்','Fresh air, natural breathing, avoid smoke.','காற்றோட்டம், இயல்பான மூச்சு, புகை தவிர்த்தல்.'],
 ['Teeth & tongue','பற்கள் · நாக்கு','Soft brush twice daily. Clean between teeth; gently clean tongue if desired.','மென்மையான பிரஷ் தினமும் இருமுறை. பல் இடைவெளி சுத்தம்; நாக்கை மெதுவாக சுத்தம் செய்யலாம்.'],
 ['Skin','தோல்','Gentle wash. Moisturise when dry. Avoid irritating oils.','மெதுவாகக் கழுவி, வறண்டால் ஈரப்பதம்; எரிச்சல் தரும் எண்ணெய் வேண்டாம்.'],
 ['Food & digestion','உணவு · செரிமானம்','Variety, safe food and comfortable timing.','பலவகை உணவு, உணவுப் பாதுகாப்பு, வசதியான நேரம்.'],
 ['Heart · liver · kidneys','இதயம் · கல்லீரல் · சிறுநீரகம்','Good food, rest and regular movement. No special “detox” needed.','சத்தான உணவு, ஓய்வு, இயல்பான இயக்கம். விசேஷ “சுத்திகரிப்பு” தேவையில்லை.'],
 ['Legs · feet · nails','கால்கள் · பாதம் · நகங்கள்','Dry between toes; use clean nail tools.','கால்விரல் இடைவெளி உலர்த்து; சுத்தமான நகவெட்டி பயன்படுத்து.'],
 ['Home','வீடு','Clean water, food surfaces and shared spaces.','சுத்தமான நீர், சமையல் மேடை, பொதுவிடங்கள்.']
];
const english=[
 ['I am learning English every day.','நான் தினமும் ஆங்கிலம் கற்கிறேன்.'],
 ['Can you teach me this word?','இந்தச் சொல்லைக் கற்றுத் தர முடியுமா?'],
 ['How much does this cost?','இதன் விலை எவ்வளவு?'],
 ['I will practise again tomorrow.','நாளை மீண்டும் பயிற்சி செய்வேன்.'],
 ['Please speak slowly.','தயவுசெய்து மெதுவாகப் பேசுங்கள்.'],
 ['I understand. Thank you.','புரிகிறது. நன்றி.'],
 ['I can learn one step at a time.','நான் ஒவ்வொரு படியாகக் கற்க முடியும்.']
];
const root=document.createElement('details');
root.id='hcEverydayCareV182';root.className='hc-everyday';
root.innerHTML='<summary><span><strong>Daily care · அன்றாடப் பராமரிப்பு</strong><small>Read · Understand · Apply / படி · புரிந்து கொள் · செய்</small></span><span class="care-chevron" aria-hidden="true">⌄</span></summary><div id="hcCareBody"></div>';
kitchen.insertAdjacentElement('afterend',root);
const css=document.createElement('style');css.id='hcCareStyleV182';css.textContent=[
'#home #hcEverydayCareV182{margin:9px 0;background:#0b1a23;color:#edf4f6;border:1px solid #405864;border-radius:15px;overflow:hidden}',
'#home #hcEverydayCareV182>summary{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px;cursor:pointer;list-style:none;min-height:48px}',
'#home #hcEverydayCareV182>summary::-webkit-details-marker{display:none}',
'#home #hcEverydayCareV182>summary strong{font-size:14px;display:block}',
'#home #hcEverydayCareV182>summary small{display:block;color:#bdccd2;font-size:11px;margin-top:2px}',
'#home #hcEverydayCareV182[open] .care-chevron{transform:rotate(180deg)}',
'#home #hcEverydayCareV182 #hcCareBody{border-top:1px solid #405864;padding:11px 12px}',
'#home #hcEverydayCareV182 button,#home #hcEverydayCareV182 select{font:inherit;background:#20333e;color:#f1f6f7;border:1px solid #647985;border-radius:8px;min-height:37px;padding:7px}',
'#home #hcEverydayCareV182 .care-head{display:flex;align-items:center;justify-content:space-between;gap:8px}',
'#home #hcEverydayCareV182 .care-head b{font-size:13px}',
'#home #hcEverydayCareV182 .care-tabs{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0}',
'#home #hcEverydayCareV182 .care-tabs button{flex:1 1 30%;font-size:12px;padding:6px 4px}',
'#home #hcEverydayCareV182 .care-tabs button[aria-pressed=true]{background:#edf4f6;color:#122831;font-weight:700}',
'#home #hcEverydayCareV182 .care-row{display:grid;grid-template-columns:20px minmax(0,1fr);gap:8px;border-bottom:1px solid #354b56;padding:9px 0;cursor:pointer}',
'#home #hcEverydayCareV182 .care-row input{margin:4px 0 0;width:17px;height:17px;accent-color:#e5eff2}',
'#home #hcEverydayCareV182 .care-row strong{display:block;font-size:13px;line-height:1.45}',
'#home #hcEverydayCareV182 .care-row small{display:block;font-size:12px;color:#ccdade;line-height:1.5;margin-top:2px}',
'#home #hcEverydayCareV182 .care-more{margin-top:8px;border-top:1px solid #445d68}',
'#home #hcEverydayCareV182 .care-more details{border-bottom:1px solid #314c58;padding:8px 0}',
'#home #hcEverydayCareV182 .care-more summary{font-size:13px;font-weight:650;cursor:pointer;line-height:1.45;min-height:29px}',
'#home #hcEverydayCareV182 .care-more p{font-size:12px;line-height:1.6;color:#d3e0e4;margin:6px 0}',
'#home #hcEverydayCareV182 .care-body-item{padding-left:9px}',
'#home #hcEverydayCareV182 .care-body-item summary{font-size:12px;font-weight:500}',
'#home #hcEverydayCareV182 .care-ref{color:#deeef8;text-decoration:underline}',
'#home #hcEverydayCareV182 .care-action{margin-top:10px;width:100%;font-size:12px}',
'#home #hcEverydayCareV182 :is(button,select,summary,input,a):focus-visible{outline:2px solid white;outline-offset:2px}'
].join('\n');document.head.append(css);
function render(){
 const panel=document.getElementById('hcCareBody');if(!panel)return;
 const words=english[Math.floor(Date.now()/86400000)%english.length];
 const day=checks[date()]||{};
 panel.innerHTML='<div class="care-head"><b>'+say('Simple daily habits','எளிய தினசரி வழக்கம்')+'</b><select aria-label="Language" id="hcCareLanguage"><option value="ta"'+(language==='ta'?' selected':'')+'>தமிழ்</option><option value="en"'+(language==='en'?' selected':'')+'>English</option></select></div>'+
 '<div class="care-tabs">'+tabs.map(t=>'<button type="button" data-tab="'+t[0]+'" aria-pressed="'+(t[0]===tab)+'">'+esc(say(t[1],t[2]))+'</button>').join('')+'</div>'+
 tasks[tab].map(a=>'<label class="care-row"><input type="checkbox" data-care="'+a[0]+'"'+(day[a[0]]?' checked':'')+'><span><strong>'+esc(say(a[1],a[2]))+'</strong><small>'+esc(say(a[3],a[4]))+'</small></span></label>').join('')+
 '<div class="care-more">'+
 '<details><summary>'+say('Body care','உடல் பராமரிப்பு')+' · 10</summary>'+body.map(x=>'<details class="care-body-item"><summary>'+esc(say(x[0],x[1]))+'</summary><p>'+esc(say(x[2],x[3]))+'</p></details>').join('')+'</details>'+
 '<details><summary>'+say('Traditional knowledge','மரபு அறிவு')+'</summary>'+
 '<p><b>'+say('Old:','பழைய வழக்கம்:')+'</b> '+say('Charcoal tooth powder was used historically. Miswak/chewing sticks were also used.','முன்பு பற்களைச் சுத்தம் செய்ய கரித்தூள், மிஸ்வாக் போன்ற குச்சிகள் பயன்படுத்தப்பட்டன.')+'</p>'+
 '<p><b>'+say('Today:','இன்று:')+'</b> '+say('Charcoal may wear enamel, even if used weekly. Correctly used fluoride toothpaste protects teeth.','கரித்தூள் வாரம் ஒருமுறை பயன்படுத்தினாலும் பல் மேல்பரப்பைத் தேய்க்கலாம். சரியாகப் பயன்படுத்தும் ஃப்ளூரைடு பற்பசை பற்களைப் பாதுகாக்க உதவும்.')+'</p>'+
 '<p><b>'+say('Wudu:','உளூ:')+'</b> '+say('Honour its spiritual purpose and careful washing.','அதன் ஆன்மிக அர்த்தத்தையும் தூய்மைப் பழக்கத்தையும் மதிப்போம்.')+'</p>'+
 '<p><b>'+say('Ayurveda & astrology:','ஆயுர்வேதம் · ஜோதிடம்:')+'</b> '+say('Preserve family traditions; distinguish cultural beliefs from tested health claims.','குடும்ப மரபுகளைப் பாதுகாப்போம்; நம்பிக்கையையும் உறுதிசெய்யப்பட்ட உடல்நலத் தகவலையும் தனியாகக் காட்டுவோம்.')+'</p></details>'+
 '<details><summary>'+say('One English sentence','ஒரு ஆங்கில வாக்கியம்')+'</summary><p lang="en"><b>'+esc(words[0])+'</b></p><p lang="ta">'+esc(words[1])+'</p></details>'+
 '<details><summary>'+say('Sources','ஆதாரங்கள்')+'</summary>'+
 '<p><a class="care-ref" href="https://www.ada.org/resources/ada-library/oral-health-topics/toothpastes" target="_blank" rel="noopener noreferrer">ADA · Toothpaste</a></p>'+
 '<p><a class="care-ref" href="https://www.ada.org/resources/ada-library/oral-health-topics/whitening" target="_blank" rel="noopener noreferrer">ADA · Charcoal & whitening</a></p>'+
 '<p><a class="care-ref" href="https://www.aad.org/public/everyday-care/hair-scalp-care/hair/gray-hair-causes" target="_blank" rel="noopener noreferrer">AAD · Hair</a></p></details></div>'+
 '<button class="care-action" id="hcCareGoKitchen" type="button">'+say('Open Kitchen ›','சமையலறை ›')+'</button>';
 panel.querySelector('#hcCareLanguage').addEventListener('change',ev=>{language=ev.target.value==='en'?'en':'ta';try{localStorage.setItem(LANG,language)}catch(_){}render()});
 panel.querySelectorAll('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{tab=btn.dataset.tab;render()}));
 panel.querySelectorAll('[data-care]').forEach(check=>check.addEventListener('change',()=>{
  const k=date();if(!checks[k])checks[k]={};checks[k][check.dataset.care]=check.checked;
  const dates=Object.keys(checks).sort();for(const x of dates.slice(0,Math.max(0,dates.length-7)))delete checks[x];
  save(CHECKS,checks);
 }));
 panel.querySelector('#hcCareGoKitchen').addEventListener('click',()=>{
  const target=document.getElementById('hcMonthlyKitchen')||document.getElementById('hcFamilyKitchen');
  if(target){target.hidden=false;target.closest('details')?.setAttribute('open','');target.scrollIntoView({block:'start',behavior:'smooth'});}
 });
}
render();
})();