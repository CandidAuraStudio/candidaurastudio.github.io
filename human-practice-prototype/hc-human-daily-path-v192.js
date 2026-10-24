/* HeartClear v192 | Contextual Do / Understand / Explore + Animal Care.
   Read the existing HCKitchenMenu.preview; never generate a second meal.
   No AI, account, external requests or tracking. */
(function(){
'use strict';
const root=document.getElementById('hcMonthlyKitchen'),drawer=document.getElementById('hcKitchenDrawer');
if(!root||!drawer||document.getElementById('hcHumanDailyPathV192'))return;
const localDate=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const currentDate=()=>root.querySelector('#hcmDate')?.value||localDate();
const actualTime=()=>{const h=new Date().getHours();return h>=5&&h<11?0:h>=11&&h<17?1:2};
const language=()=>{try{return localStorage.getItem('hcKitchenLangV1')==='en'?'en':'ta'}catch(_){return 'ta'}};
const tr=(en,ta)=>language()==='ta'?ta:en;
const mealNames=[['Breakfast','காலை'],['Lunch','மதியம்'],['Dinner','இரவு']];
const lesson=document.createElement('section');lesson.id='hcHumanDailyPathV192';
lesson.innerHTML='<small class="hcd-kicker">HUMAN · DAILY LIFE / மனித வாழ்க்கை</small>'+
 '<strong id="hcdTitle">Today’s chosen meal</strong><small id="hcdDate"></small>'+
 '<nav aria-label="Choose daily meal" class="hcd-tabs">'+
 '<button type="button" data-meal="0">காலை · Morning</button><button type="button" data-meal="1">மதியம் · Midday</button><button type="button" data-meal="2">இரவு · Evening</button></nav>'+
 '<nav aria-label="Learning depth" class="hcd-tabs">'+
 '<button type="button" data-depth="do">Do · செய்</button><button type="button" data-depth="understand">Understand · அறி</button><button type="button" data-depth="explore">Explore · ஆராய்</button></nav>'+
 '<p class="hcd-info" id="hcdInfo"></p><button type="button" id="hcdRecipe">Open selected recipe · செய்முறை ›</button>'+
 '<small class="hcd-small">Uses the selected breakfast, lunch or dinner and its existing sides. No new menu is created.</small>'+
 '<p class="hcd-small" id="hcdMessage" role="status" aria-live="polite"></p>';
root.before(lesson);
const style=document.createElement('style');style.textContent=[
 '#hcHumanDailyPathV192,#hcAnimalsV192{background:#101b21;border:1px solid #425461;border-radius:13px;color:#f3f6f7;padding:12px;margin:9px 0;box-sizing:border-box}',
 '#hcHumanDailyPathV192>strong{display:block;font-size:15px;line-height:1.5;margin:8px 0 2px}',
 '#hcHumanDailyPathV192>small,#hcAnimalsV192 small{color:#c0cdd2;font-size:11px;line-height:1.5;display:block}',
 '#hcHumanDailyPathV192 .hcd-kicker{font-size:10px;letter-spacing:.05em;font-weight:700}',
 '.hcd-tabs{display:flex;gap:5px;margin:9px 0}',
 '#hcHumanDailyPathV192 button,#hcAnimalsV192 button,#hcAnimalsV192 select{background:#263b46;border:1px solid #677f8c;color:#fff;border-radius:9px;min-height:40px;padding:8px;font:inherit;cursor:pointer;box-sizing:border-box}',
 '.hcd-tabs button{flex:1;min-width:0;font-size:11px!important;line-height:1.3}',
 '#hcHumanDailyPathV192 button[aria-pressed=true],#hcAnimalsV192 button[aria-pressed=true]{color:#14242b;background:#f1f5f5;font-weight:700}',
 '#hcHumanDailyPathV192 .hcd-info,#hcAnimalsV192 .hcd-info{white-space:pre-line;color:#dce9eb;font-size:13px;line-height:1.7;margin:11px 0}',
 '#hcHumanDailyPathV192 #hcdRecipe{width:100%;background:#f1f5f5;color:#14242b;font-size:12px;font-weight:700}',
 '#hcHumanDailyPathV192 button:focus-visible,#hcAnimalsV192 :is(button,summary,select,a):focus-visible{outline:2px solid white;outline-offset:2px}',
 '#hcAnimalsV192{padding:0;overflow:hidden}',
 '#hcAnimalsV192>summary{font-size:14px;font-weight:700;padding:13px;cursor:pointer;min-height:46px}',
 '#hcAnimalsV192 .hcd-animal-content{border-top:1px solid #425461;padding:12px}',
 '#hcAnimalsV192 label{display:block;font-size:12px;margin:0 0 6px}',
 '#hcAnimalsV192 select{width:100%;margin:0 0 8px}',
 '#hcAnimalsV192 a{color:#e3f2f9;text-decoration:underline}'
].join('\n');document.head.append(style);
let selectedMeal=null,depth='do',last='',loading=false;
const title=lesson.querySelector('#hcdTitle'),dateLabel=lesson.querySelector('#hcdDate'),info=lesson.querySelector('#hcdInfo'),message=lesson.querySelector('#hcdMessage');
const types=[
 [/pittu|பிட்டு/i,'Pittu flour needs damp, loose crumbs before steaming; do not turn it into sticky dough.','பிட்டு மாவை நீர் தெளித்து உதிரியாக வைத்துப் பிறகு ஆவியில் வேகவைக்க வேண்டும்; பிசைந்த மாவாக மாற்ற வேண்டாம்.'],
 [/dosa|idli|appam|தோசை|இட்லி|ஆப்பம்/i,'Prepared fermented batter takes advance planning. Use the full recipe for the exact grain and cooking method.','புளித்த மாவுக்கு முன்தயாரிப்பு தேவை. சரியான தானியம், சமைக்கும் முறையை முழுச் செய்முறையில் பாருங்கள்.'],
 [/dal|dhal|lentil|பருப்பு|பயறு/i,'Split lentils and whole legumes need different soaking and cooking times; cook them until thoroughly tender.','உடைத்த பருப்புக்கும் முழுப் பயறுக்கும் ஊறல், வேகும் நேரம் மாறும். நன்கு மென்மையாகும் வரை வேகவையுங்கள்.'],
 [/rice|சோறு|சாதம்|அரிசி/i,'Choose water by rice variety, measure rice and water with the same cup and check tenderness.','அரிசி வகைக்கேற்ப நீர் அளவைத் தேர்வு செய்யவும்; ஒரே கப்பால் அரிசி, நீர் அளந்து பதத்தைப் பாருங்கள்.'],
 [/fish|மீன்/i,'Keep fish chilled before use and cook fully. Cooking time depends on the thickness of each piece.','மீனைக் குளிராக வைத்து, துண்டின் தடிமனுக்கேற்ப முழுவதும் வேகவைக்கவும்.'],
 [/roti|ரொட்டி/i,'Add water to flour little by little until the dough feels manageable.','மாவுடன் நீரைச் சிறிதுசிறிதாகச் சேர்த்து பிசைய ஏற்ற பதம் பெறுங்கள்.']
];
function plan(){let a=window.HCKitchenMenu?.preview?.(currentDate());return Array.isArray(a)&&a.length===3?a:null}
function render(force=false){
 const m=selectedMeal===null?actualTime():selectedMeal,p=plan()?.[m],key=[currentDate(),m,depth,language(),p?.base?.join('/'),p?.side?.join('/'),p?.veg?.join('/')].join('|');
 if(key===last&&!force)return;last=key;
 lesson.querySelectorAll('[data-meal]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.meal===m)));
 lesson.querySelectorAll('[data-depth]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.depth===depth)));
 dateLabel.textContent=currentDate()===localDate()?tr('Today','இன்று'):currentDate();
 if(!p){title.textContent=tr('Open the Kitchen menu','சமையல் பட்டியலைத் திறக்கவும்');info.textContent='';return}
 const name=language()==='ta'?p.base[0]:p.base[1],side=language()==='ta'?p.side[0]:p.side[1],veg=language()==='ta'?p.veg[0]:p.veg[1],label=mealNames[m][language()==='ta'?1:0];
 title.textContent=label+' · '+name;
 if(depth==='do'){
  info.textContent=tr('Your selected '+label.toLowerCase()+' is '+name+'. Side: '+side+'. Vegetable: '+veg+'. Open its existing recipe for cups, handfuls and spoons.','நீங்கள் தேர்ந்தெடுத்த '+label+' உணவு: '+name+'. துணை: '+side+'. காய்கறி: '+veg+'. கப், கைப்பிடி, கரண்டி அளவுகளுடன் உள்ள செய்முறையைத் திறக்கவும்.');
 }else if(depth==='understand'){
  const tip=types.find(x=>x[0].test(p.base.join(' ')));
  info.textContent=(tip?tip[language()==='ta'?2:1]:tr('Cook ingredients according to their variety and check the result as you go.','பொருட்களின் வகைக்கேற்பச் சமைத்து, பதத்தைப் பார்த்துச் சரிசெய்யவும்.'))+'\n'+tr('This explanation belongs to your chosen '+name+' with '+side+' and '+veg+'.','இது நீங்கள் தேர்ந்தெடுத்த '+name+' · '+side+' · '+veg+' உணவுக்கான விளக்கம்.');
 }else{
  info.textContent=tr(name+' is part of a living food tradition. Household methods in Sri Lanka and Tamil Nadu differ. Compare regional names, family memories, documented evidence and modern adaptations without calling them all the same ancient method. Your planned side is '+side+' and vegetable is '+veg+'.',name+' என்பது வாழும் உணவு மரபின் ஒரு பகுதி. இலங்கையிலும் தமிழ்நாட்டிலும் வீட்டுமுறைகள் மாறுகின்றன. வட்டாரப் பெயர், குடும்ப நினைவு, வரலாற்று ஆதாரம், இன்றைய மாற்றம் ஆகியவற்றைத் தனியே அறிக. உங்கள் துணை: '+side+'; காய்கறி: '+veg+'.');
 }
}
lesson.querySelectorAll('[data-meal]').forEach(b=>b.addEventListener('click',()=>{selectedMeal=+b.dataset.meal;message.textContent='';render(true)}));
lesson.querySelectorAll('[data-depth]').forEach(b=>b.addEventListener('click',()=>{depth=b.dataset.depth;message.textContent='';render(true)}));
function openExactRecipe(){
 const m=selectedMeal===null?actualTime():selectedMeal,card=root.querySelectorAll('#hcmMeals > .meal')[m];
 if(!card)return false;
 const details=card.querySelector('.hc-full-recipe');
 if(!details)return false;
 details.open=true;details.scrollIntoView({block:'start',behavior:'smooth'});message.textContent='';return true;
}
lesson.querySelector('#hcdRecipe').addEventListener('click',()=>{
 drawer.open=true;
 if(openExactRecipe()||loading)return;
 loading=true;let attempts=0;
 message.textContent=tr('Opening the full recipe for this exact meal…','இந்த உணவுக்கான முழுச் செய்முறை திறக்கப்படுகிறது…');
 const retry=()=>{if(openExactRecipe()){loading=false;return}if(++attempts>=25){loading=false;message.textContent=tr('The detailed renderer is unavailable. Look under this meal in Kitchen.','முழுச் செய்முறை கிடைக்கவில்லை. சமையல் பட்டியலில் இந்த உணவின் கீழ் பாருங்கள்.');return}setTimeout(retry,120)};
 setTimeout(retry,120);
});
let scheduled=false;
new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;render()})}).observe(root,{childList:true,subtree:true});
window.addEventListener('focus',()=>{if(selectedMeal===null)render(true)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&selectedMeal===null)render(true)});
setInterval(()=>{if(selectedMeal===null)render()},60000);
render(true);

/* Animal Care: welfare first; anatomy/behavior and qualified wellbeing evidence. */
const animals=[
 {id:'dog',en:'Dog',ta:'நாய்',care:['Provide water, appropriate food, safe exercise, rest and regular veterinary care. Respect an animal that wants space.','நீர், ஏற்ற உணவு, பாதுகாப்பான இயக்கம், ஓய்வு, கால்நடை மருத்துவர் பராமரிப்பு தேவை. விலங்கு தனிமை விரும்பினால் மதியுங்கள்.'],understand:['A dog’s nose has specialised structures for detecting scent; body language helps communicate discomfort.','மணத்தை உணர நாயின் மூக்கில் சிறப்பு அமைப்புகள் உள்ளன; உடல்மொழி அசௌகரியத்தை வெளிப்படுத்தும்.'],explore:['Dogs may offer companionship and encourage walking. Research on health effects is mixed; dogs are not medical treatments.','நாயின் தோழமை, நடைப்பயிற்சி நலனுக்கு உதவலாம். ஆய்வு முடிவுகள் மாறுபடுகின்றன; நாய் மருத்துவச் சிகிச்சையல்ல.']},
 {id:'cat',en:'Cat',ta:'பூனை',care:['Provide clean water, cat-appropriate food, a safe hiding place, clean litter and veterinary checks. Do not force handling.','சுத்தமான நீர், பூனைக்கேற்ற உணவு, ஒளிவிடம், கழிவிடச் சுத்தம், கால்நடை பராமரிப்பு தேவை. வலுக்கட்டாயமாகத் தூக்க வேண்டாம்.'],understand:['Whiskers are sensitive touch structures that help cats sense nearby spaces.','பூனையின் மீசை முடிகள் அருகிலுள்ள இடத்தை உணர உதவும் உணர்வுக் கட்டமைப்புகள்.'],explore:['A cat’s company may feel calming, but purring is not evidence that it cures human illness.','பூனையின் தோழமை அமைதியைத் தரலாம்; அதன் குறுகுறுப்பு மனித நோயைக் குணமாக்கும் ஆதாரம் அல்ல.']},
 {id:'bird',en:'Bird',ta:'பறவை',care:['For pet birds, obtain species-specific guidance on food, safe space and care. Do not capture wild birds or disturb nests.','வீட்டுப் பறவைக்கு இனத்துக்கேற்ற உணவு, பாதுகாப்பான இடம், பராமரிப்பு தேவை. காட்டுப் பறவைகளைப் பிடிக்கவோ கூட்டைத் தொந்தரவு செய்யவோ வேண்டாம்.'],understand:['Feathers serve different roles, including flight and temperature regulation; species vary.','இறகுகள் பறப்புக்கும் உடல் வெப்பக் கட்டுப்பாட்டுக்கும் உதவலாம்; இனத்துக்கேற்ப மாறும்.'],explore:['Birdsong can accompany quiet listening; it is not medicine. Observe birds without disturbing them.','பறவை ஒலி அமைதியான கவனிப்புக்கு உதவலாம்; அது மருந்தல்ல. பறவைகளைத் தொந்தரவு செய்யாமல் கவனியுங்கள்.']},
 {id:'cow',en:'Cow',ta:'பசு',care:['Cattle need suitable feed, clean water, shelter and trained livestock/veterinary care. Keep safe distance from unfamiliar cattle.','மாட்டிற்கு ஏற்ற தீவனம், நீர், நிழல், பயிற்சி பெற்ற பராமரிப்பும் கால்நடை மருத்துவரும் தேவை. தெரியாத மாட்டை நெருங்காதீர்கள்.'],understand:['Cattle are ruminants with a four-compartment stomach adapted for digesting plant food.','மாடு அசைபோடும் விலங்கு; தாவர உணவைச் செரிக்க நான்கு பகுதிகள் கொண்ட வயிற்று அமைப்பு உள்ளது.'],explore:['Cattle carry different cultural meanings. Respect symbolism while separating spiritual traditions from clinical evidence.','மாட்டிற்குப் பல பண்பாட்டு அர்த்தங்கள் உள்ளன. மரபை மதித்தாலும் மருத்துவ ஆதாரத்திலிருந்து குறியீட்டு நம்பிக்கையைப் பிரித்தறிய வேண்டும்.']},
 {id:'fish',en:'Fish',ta:'மீன்',care:['Aquatic animals need species-appropriate water quality, feeding and space. Ask a qualified specialist when a fish is ill.','மீனுக்கு இனத்துக்கேற்ற நீர்தரம், உணவு, இடம் தேவை. நோயுற்றால் தகுதியான நிபுணரை அணுகுங்கள்.'],understand:['Fish use gills for gas exchange with water; habitats and oxygen requirements differ.','மீன் செவுள்களால் நீரில் வாயுப் பரிமாற்றம் செய்கிறது; வாழிடம், ஆக்சிஜன் தேவை மாறும்.'],explore:['Watching fish may be calming for some people, but it is not a proven disease treatment.','மீன்களைப் பார்ப்பது சிலருக்கு அமைதியைத் தரலாம்; அது நிரூபிக்கப்பட்ட நோய்ச் சிகிச்சையல்ல.']},
 {id:'bee',en:'Bee',ta:'தேனீ',care:['Grow suitable flowering plants for pollinators. Observe bees from a distance; do not touch swarms or hives.','மகரந்தச் சேர்க்கைக்கு ஏற்ற பூச்செடிகளை வளர்க்கவும். தேனீக் கூட்டங்களைத் தொடாமல் தொலைவிலிருந்து பாருங்கள்.'],understand:['Bees are six-legged insects with structures that help some species collect and carry pollen.','தேனீக்கள் ஆறு கால்களுடைய பூச்சிகள்; சில இனங்கள் மகரந்தம் சேகரிக்க ஏற்ற அமைப்புகள் கொண்டவை.'],explore:['Honey and bees have cultural and religious meaning. Such meaning does not prove a bee product cures illness.','தேனுக்கும் தேனீக்கும் பண்பாட்டு, ஆன்மிக அர்த்தங்கள் உள்ளன. அதனால் தேனீப் பொருள் நோய் தீர்க்கும் என்று நிரூபிக்கப்படாது.']}
];
const panel=document.createElement('details');panel.id='hcAnimalsV192';
panel.innerHTML='<summary>5 · Animal Care / விலங்குகள் பராமரிப்பு <span aria-hidden="true">⌄</span></summary>'+
 '<div class="hcd-animal-content"><label for="hcdAnimal">Choose an animal / விலங்கு</label><select id="hcdAnimal"></select>'+
 '<nav class="hcd-tabs" aria-label="Animal knowledge depth"><button type="button" data-animal-depth="care">Care · பராமரி</button><button type="button" data-animal-depth="understand">Understand · அறி</button><button type="button" data-animal-depth="explore">Explore · ஆராய்</button></nav>'+
 '<p id="hcdAnimalInfo" class="hcd-info"></p><small>For sick animals, ask a veterinarian. Animal companionship is not a substitute for medical treatment.</small>'+
 '<small><a href="https://www.cdc.gov/healthy-pets/about/" target="_blank" rel="noopener noreferrer">CDC · safe pet care</a> · <a href="https://newsinhealth.nih.gov/2018/02/power-pets" target="_blank" rel="noopener noreferrer">NIH · the evidence on pets and wellbeing</a></small></div>';
drawer.after(panel);
const animalSelect=panel.querySelector('#hcdAnimal'),animalInfo=panel.querySelector('#hcdAnimalInfo');
animals.forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=a.ta+' · '+a.en;animalSelect.append(o)});
let animalDepth='care';
function renderAnimal(){
 const a=animals.find(x=>x.id===animalSelect.value)||animals[0];
 panel.querySelectorAll('[data-animal-depth]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.animalDepth===animalDepth)));
 animalInfo.textContent=a[animalDepth][language()==='ta'?1:0];
}
panel.querySelectorAll('[data-animal-depth]').forEach(b=>b.addEventListener('click',()=>{animalDepth=b.dataset.animalDepth;renderAnimal()}));
animalSelect.addEventListener('change',renderAnimal);
window.addEventListener('focus',renderAnimal);
renderAnimal();
})();