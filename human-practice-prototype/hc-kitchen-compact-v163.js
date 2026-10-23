/* HeartClear v163 · compact universal kitchen helper and accessible minimize.
  No remote AI call. No speculative meal price or automatic push reminder. */
(function(){
'use strict';
const home=document.getElementById('home'),kitchen=document.getElementById('hcHomeKitchenQuickV155');
if(!home||!kitchen||document.getElementById('hcKitchenAskV163'))return;
const savedKey='hcKitchenNextPlanV163';
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n}
function save(key,object){try{localStorage.setItem(key,JSON.stringify(object))}catch(_){}}
function load(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(_){return null}}
const localDay=(date)=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
function tomorrow(){const d=new Date();d.setDate(d.getDate()+1);return localDay(d)}
const dishes=[
 {name:'Dosa',ta:'தோசை',match:/dosa|தோசை|dosai/i,ingredients:'Rice, urad dal, clean water; fermented batter, chutney or sambar',ingredientsTa:'அரிசி, உளுந்து, சுத்தமான நீர்; புளித்த மாவு, சட்னி அல்லது சாம்பார்',
 ahead:'Check for ready fermented batter and keep it chilled. Starting from dry grains requires soaking, grinding and controlled fermentation; it may not be ready by morning.',aheadTa:'தயார் புளித்த மாவு உள்ளதா இன்று பார்க்கவும்; குளிர்சாதனத்தில் வைக்கவும். புதிய மாவுக்கு ஊறவைத்தல், அரைத்தல், பாதுகாப்பாகப் புளிக்கவைத்தல் ஆகியவற்றுக்கு நேரம் தேவை.',
 method:'Spread on a warm pan and cook fully. Serve with vegetables, dhal or sambar.',methodTa:'சூடான கல்லில் மாவைப் பரப்பி முழுவதும் சுடவும். காய்கறி, பருப்பு அல்லது சாம்பாருடன் வழங்கவும்.',alt:'Idli or freshly made vegetable upma'},
 {name:'Idli',ta:'இட்லி',match:/idli|இட்லி/i,ingredients:'Fermented rice and urad batter; idli steamer; sambar or chutney',ingredientsTa:'புளித்த அரிசி-உளுந்து மாவு; இட்லித் தட்டு; சாம்பார் அல்லது சட்னி',
 ahead:'Check ready batter, chill it and wash the steamer. Without fermented batter, choose a different breakfast.',aheadTa:'தயார் மாவைக் குளிராக வைத்து, இட்லித் தட்டைச் சுத்தம் செய்யவும். புளித்த மாவு இல்லையெனில் வேறு காலை உணவைத் தேர்வு செய்யவும்.',
 method:'Steam until cooked through; serve with sambar or chutney.',methodTa:'முழுவதும் வேகும் வரை ஆவியில் வேகவைத்து சாம்பார் அல்லது சட்னியுடன் வழங்கவும்.',alt:'Dosa or vegetable upma'},
 {name:'Rice and vegetables',ta:'சோறும் காய்கறியும்',match:/rice|arisi|saadam|sadham|சோறு|சாதம்|அரிசி/i,ingredients:'Rice, a seasonal vegetable, dhal or another protein-rich side',ingredientsTa:'அரிசி, பருவகாலக் காய்கறி, பருப்பு அல்லது புரதத் துணை உணவு',
 ahead:'Check rice, vegetables and dhal. Wash produce when preparing it and refrigerate perishable items. Prefer freshly cooked rice tomorrow.',aheadTa:'அரிசி, காய்கறி, பருப்பு உள்ளதா பார்க்கவும். கெடக்கூடிய பொருட்களைக் குளிராக வைக்கவும். முடிந்தால் நாளைச் சாதத்தைப் புதிதாகச் சமைக்கவும்.',
 method:'Cook rice appropriately; pair with vegetables and protein. White rice does not lower blood sugar. Less-polished red or brown varieties often provide more fibre, but no rice guarantees a lower glucose response.',methodTa:'அரிசியை வகைக்கேற்ப வேகவைத்து காய்கறி, பருப்புடன் சேர்க்கவும். வெள்ளை அரிசி தானாக இரத்தச் சர்க்கரையைக் குறைக்காது. குறைவாகத் தீட்டிய சிவப்பு அல்லது பழுப்பு அரிசியில் பொதுவாக நார் அதிகம் இருக்கும்; எந்த அரிசியும் சர்க்கரையைக் குறைக்கும் என உறுதியில்லை.',alt:'Brown/red rice, vegetables with dhal or millet'},
 {name:'Egg and vegetables',ta:'முட்டையும் காய்கறியும்',match:/eggs?|முட்டை|muttai/i,ingredients:'Eggs, tomato or greens; rice, bread or another staple',ingredientsTa:'முட்டை, தக்காளி அல்லது கீரை; சோறு, ரொட்டி அல்லது வேறு தானியம்',
 ahead:'Check eggs and vegetables; refrigerate as recommended on the package.',aheadTa:'முட்டை, காய்கறி உள்ளதா சரிபார்த்து, பொதியில் உள்ள அறிவுரைப்படி குளிராக வைக்கவும்.',
 method:'Cook eggs completely, add vegetables, and serve with a suitable staple.',methodTa:'முட்டையை முழுவதும் வேகவைத்து காய்கறி, ஏற்ற பிரதான உணவுடன் வழங்கவும்.',alt:'Dhal with vegetables if eggs are unavailable'},
 {name:'Pittu',ta:'பிட்டு',match:/pittu|பிட்டு/i,ingredients:'Rice flour, coconut, clean water; a pittu steamer',ingredientsTa:'அரிசி மாவு, தேங்காய், சுத்தமான நீர்; பிட்டுக் குழல்',
 ahead:'Check flour and steamer; refrigerate freshly grated coconut.',aheadTa:'மாவு, பிட்டுக் குழல் இருக்கிறதா பார்க்கவும்; துருவிய தேங்காயைக் குளிராக வைக்கவும்.',
 method:'Moisten flour into loose crumbs, layer with coconut and steam fully.',methodTa:'மாவை உதிரியாக ஈரமாக்கித் தேங்காயுடன் அடுக்கி முழுவதும் ஆவியில் வேகவைக்கவும்.',alt:'String hoppers or vegetable upma'},
 {name:'String hoppers',ta:'இடியாப்பம்',match:/string hopper|இடியாப்பம்|idiyappam/i,ingredients:'String-hopper rice flour, clean water, press and steamer',ingredientsTa:'இடியாப்ப அரிசி மாவு, சுத்தமான நீர், அச்சு, ஆவிப்பாத்திரம்',
 ahead:'Check flour and equipment; plan sothi or vegetable curry.',aheadTa:'மாவும் உபகரணங்களும் உள்ளனவா பார்க்கவும்; சொதி அல்லது காய்கறிக் கறிக்கு முன்திட்டமிடவும்.',
 method:'Make dough carefully with hot water, press strands and steam until fully cooked.',methodTa:'வெந்நீருடன் கவனமாக மாவைப் பிசைந்து நூல்களாகப் பிழிந்து முழுவதும் ஆவியில் வேகவைக்கவும்.',alt:'Pittu or a grain porridge'},
 {name:'Vegetable upma',ta:'காய்கறி உப்புமா',match:/upma|உப்புமா|rava/i,ingredients:'Semolina or flattened rice, seasonal vegetables, water',ingredientsTa:'ரவை அல்லது அவல், பருவகாலக் காய்கறி, நீர்',
 ahead:'Check grain and vegetables; this is often a practical breakfast when fermented batter is not ready.',aheadTa:'ரவை/அவல், காய்கறி உள்ளதா பார்க்கவும்; புளித்த மாவு தயாராக இல்லாதபோது இது ஒரு மாற்று.',
 method:'Cook vegetables, add grain with appropriate liquid and stir until fully cooked.',methodTa:'காய்கறியை வேகவைத்து தானியம், ஏற்ற நீர் சேர்த்துக் கிளறியபடி முழுவதும் வேகவைக்கவும்.',alt:'Idli, roti or porridge'},
 {name:'Dhal',ta:'பருப்பு',match:/dhal|dal|lentil|பருப்பு/i,ingredients:'Lentils, water, turmeric or spices; vegetables',ingredientsTa:'பருப்பு, நீர், மஞ்சள் அல்லது மசாலா; காய்கறிகள்',
 ahead:'Check lentils and vegetables. Whole dried beans may need advance soaking in the fridge; split dhal often only needs rinsing.',aheadTa:'பருப்பும் காய்கறிகளும் உள்ளனவா பார்க்கவும். முழு உலர் பயறை குளிர்சாதனத்தில் ஊறவைக்க வேண்டியிருக்கலாம்; உடைத்த பருப்பை அலசினாலே போதும்.',
 method:'Cook until fully soft according to the legume. Pair with rice, vegetables or roti.',methodTa:'பருப்பை அதன் வகைக்கேற்ப நன்றாக மென்மையாக வேகவைத்து சோறு, காய்கறி அல்லது ரொட்டியுடன் வழங்கவும்.',alt:'Beans, chickpeas or egg'},
 {name:'Fish curry',ta:'மீன் குழம்பு',match:/fish|salaya|மீன்|சாளை/i,ingredients:'Fresh or safely thawed fish, tomato, spices, vegetables',ingredientsTa:'புதிய அல்லது குளிர்சாதனத்தில் உருகிய மீன், தக்காளி, மசாலா, காய்கறி',
 ahead:'Keep fish refrigerated; thaw frozen fish in the fridge, not on the counter. Keep away from ready-to-eat ingredients.',aheadTa:'மீனைக் குளிராக வைக்கவும்; உறைந்த மீனை குளிர்சாதனத்தில் உருகவைக்கவும், வெளியே அல்ல. சாப்பிடத் தயாரான பொருட்களிலிருந்து தனியாக வைக்கவும்.',
 method:'Cook curry until fish is completely cooked. Serve with vegetables.',methodTa:'மீன் முழுவதும் வேகும் வரை கறியைச் சமைத்துக் காய்கறியுடன் வழங்கவும்.',alt:'Egg, dhal or bean curry'},
 {name:'Roti',ta:'ரொட்டி',match:/roti|chapati|சப்பாத்தி|ரொட்டி/i,ingredients:'Suitable flour, water and a vegetable or dhal side',ingredientsTa:'ஏற்ற மாவு, நீர், காய்கறி அல்லது பருப்பு கறி',
 ahead:'Check flour and vegetables today. Make wet dough fresh when practical.',aheadTa:'மாவும் காய்கறிகளும் உள்ளனவா இன்று பார்க்கவும். ஈர மாவை முடிந்தவரை புதிதாகப் பிசையவும்.',
 method:'Mix dough, shape rounds, and cook both sides thoroughly.',methodTa:'மாவைப் பிசைந்து வட்டமாகத் தட்டி இருபுறமும் முழுவதும் வேகவைக்கவும்.',alt:'Rice, idli or pittu'}
];
const css=document.createElement('style');
css.textContent=[
':root{--gold:#c9d4da;--gold2:#a7b9c2}',
'body:before{opacity:.05!important}',
'#home #hcHomeKitchenQuickV155{gap:5px!important;padding:10px 12px!important}',
'#home #hcHomeKitchenQuickV155 .hcr-small{color:#c8d9df!important}',
'#home #hcHomeKitchenQuickV155 #hcrMealName,#home #hcHomeKitchenQuickV155 #hcrDosa,#home #hcHomeKitchenQuickV155 #hcrDosaSteps{display:none!important}',
'#home #hcHomeKitchenQuickV155 .hcr-food-actions{gap:7px}',
'#home #hcHomeKitchenQuickV155 .hcr-food-actions button{flex:1}',
'#home #hcKitchenAskV163{margin:6px 0 0;border-top:1px solid #415764;padding-top:10px}',
'#home #hcKitchenAskV163[hidden]{display:none!important}',
'#home #hcKitchenAskV163 label{display:block;font-size:12px;color:#d2e1e7;margin-bottom:6px}',
'#home #hcKitchenAskV163 textarea{box-sizing:border-box;width:100%;min-height:56px;border:1px solid #627783;border-radius:9px;padding:10px;background:#162e3b;color:#fff;font:inherit;font-size:13px;line-height:1.5;resize:vertical}',
'#home #hcKitchenAskV163 .hc-ask-buttons{display:flex;gap:7px;margin:7px 0;flex-wrap:wrap}',
'#home #hcKitchenAskV163 button{background:#213a47;border:1px solid #71838b;color:#fff;border-radius:9px;padding:8px 10px;min-height:39px;font:inherit;font-size:12px}',
'#home #hcKitchenAskV163 .hc-ask-reply{font-size:12px;line-height:1.65;white-space:pre-line;color:#e2eef0;border:1px solid #435f69;border-radius:10px;padding:10px;background:#102733}',
'#home #hcKitchenAskV163 .hc-ask-caption{color:#adbec5;font-size:10px;line-height:1.6}',
'#home #hcKitchenAskV163 .hc-ask-reply[hidden]{display:none}',
'.bottom-nav .nav-item.active{color:#edf4f6!important}',
'.bottom-nav .nav-item.active span{color:#edf4f6!important}',
'.bottom-nav .nav-item.active:after{background:#d4e0e5!important}',
'.bottom-nav .nav-item.active svg{stroke:#ecf3f6!important}',
'.global-mini .hc-global-mini-progress span{background:#d1dfe5!important}',
'#home .hc-simple-start .kicker,#home .hc-simple-paths button span{color:#d3dfe3!important}',
'#home .hc-home-greeting-row .kicker{color:#d2dfe5!important}',
'#home .hc-simple-paths button span{color:#cdd9de!important}',
'#home .hcr-small,#home .hcq-kicker,#home .eyebrow{color:#c4d5dc!important}',
'.global-mini-btn.primary{background:#f3f4f0!important;color:#0c2633!important}',
'#player.active .hc-minimize-audio,#sacredSession.active .hc-minimize-audio,#fearPlayer.active .hc-minimize-audio,#bookAudio.active .hc-minimize-audio,#soundLabPlayer.active .hc-minimize-audio{position:fixed!important;right:13px!important;bottom:calc(20px + env(safe-area-inset-bottom,0px))!important;top:auto!important;z-index:105!important;box-shadow:0 4px 20px #000a!important;background:#f3f5f4!important;color:#09202a!important;border:1px solid #9baab2!important;border-radius:25px!important;min-height:45px!important;padding:8px 15px!important}',
'#player.active{padding-bottom:65px}'
].join('\n');document.head.append(css);
kitchen.querySelector('.hcr-small')?.replaceChildren('FOOD · LEARN / உணவும் கற்றலும்');
const title=kitchen.querySelector('strong');if(title)title.textContent='What can we cook? / என்ன சமைக்கலாம்?';
const buttons=kitchen.querySelector('.hcr-food-actions'),mealButton=document.getElementById('hcrMeals');
if(mealButton)mealButton.textContent='Meal ideas · உணவுகள்';
const button=el('button',null,'Ask Kitchen · கேளுங்கள்');button.type='button';button.id='hcKitchenAskToggle';button.setAttribute('aria-expanded','false');
buttons?.append(button);
const section=el('div');section.id='hcKitchenAskV163';section.hidden=true;
section.innerHTML='<label for="hcKitchenAskInput">Ask about a dish, ingredients, or tomorrow’s preparation. / உணவு அல்லது நாளைய தயாரிப்பு பற்றி கேளுங்கள்.</label>'+
 '<textarea id="hcKitchenAskInput" maxlength="350" placeholder="I have eggs and rice… / முட்டையும் அரிசியும் இருக்கிறது…"></textarea>'+
 '<div class="hc-ask-buttons"><button type="button" id="hcKitchenAskSend">Find ideas / யோசனை</button><button type="button" id="hcKitchenTomorrow">Tomorrow / நாளை</button><button type="button" id="hcKitchenSavePlan" hidden>Remember / நினைவில் வை</button></div>'+
 '<div id="hcKitchenAskReply" class="hc-ask-reply" role="status" aria-live="polite" hidden></div>'+
 '<div class="hc-ask-caption">Basic on-device suggestions, not live AI chat. Nothing typed here is uploaded. Saved plans appear when you reopen HC; push notifications are not enabled.</div>';
kitchen.append(section);
const reply=section.querySelector('#hcKitchenAskReply'),input=section.querySelector('#hcKitchenAskInput'),saveBtn=section.querySelector('#hcKitchenSavePlan');
let lastPlan=null;
const output=(txt,plan=null)=>{reply.hidden=false;reply.textContent=txt;lastPlan=plan;saveBtn.hidden=!plan};
const brief=d=>'• '+d.name+' / '+d.ta;
function help(){
 const ask=input.value.trim();if(!ask){output('Tell me a dish or an ingredient first. / முதலில் உணவு அல்லது பொருளைக் குறிப்பிடவும்.');return}
 const found=dishes.filter(d=>d.match.test(ask));
 const wantsHelp=/tomorrow|நாளை|prep|prepare|soak|ஊற|tonight|இன்று|before/i.test(ask);
 if(!found.length){
  const matched=/chicken|கோழி/i.test(ask)?'Chicken curry / கோழிக் கறி':/potato|உருளை/i.test(ask)?'Vegetable curry / காய்கறிக் கறி':'';
  output((matched?'Try: '+matched+'\n':'')+'I do not have a verified recipe for that exact request yet. Try “dosa”, “rice”, “eggs”, “fish”, “dhal” or “roti”, or open Meal ideas.\nஅந்த உணவுக்கான முழு செய்முறை இன்னும் இல்லை. தோசை, அரிசி, முட்டை, மீன், பருப்பு அல்லது ரொட்டி என்று கேளுங்கள்.');
  return;
 }
 const d=found[0];
 output(d.name+' · '+d.ta+'\n\nIngredients / தேவையானவை:\n'+d.ingredients+'\n'+d.ingredientsTa+
  '\n\n'+(wantsHelp?'Prepare ahead / முன்தயாரிப்பு:\n'+d.ahead+'\n'+d.aheadTa+'\n\n':'')+
  'Cooking / சமைப்பது:\n'+d.method+'\n'+d.methodTa+'\n\nAlternative / மாற்று: '+d.alt);
}
function tomorrowPlan(){
 const date=new Date();date.setDate(date.getDate()+1);
 const dateStr=localDay(date);
 const list=window.HCKitchenMenu?.preview?.(dateStr);
 const lines=['Tomorrow · '+dateStr+' / நாளை','These are menu ideas, not compulsory meals. / இவை விருப்பங்கள் மட்டுமே.'];
 if(Array.isArray(list)&&list.length){
  list.forEach((meal,i)=>{
   const name=meal.base[1]||'',ta=meal.base[0]||'';
   lines.push('\n'+['Breakfast','Lunch','Dinner'][i]+' / '+['காலை','மதியம்','இரவு'][i]+': '+name+' / '+ta);
   const known=dishes.find(d=>d.match.test(name+' '+ta));
   if(known)lines.push('Tonight / இன்று: '+known.ahead+'\n'+known.aheadTa);
   else lines.push('Tonight / இன்று: Check the staple and vegetables; refrigerate perishables. / தேவையான தானியம், காய்கறிகளைச் சரிபார்த்து கெடக்கூடியவற்றைக் குளிராக வைக்கவும்.');
  });
 }else lines.push('Open Meal ideas to choose tomorrow’s menu. / நாளைய உணவுக்கு Meal ideas திறக்கவும்.');
 lines.push('\nFood safety: Avoid leaving cooked rice, fish, meat or prepared batter unrefrigerated overnight.\nஉணவுப் பாதுகாப்பு: வேகவைத்த சோறு, மீன், இறைச்சி, தயார் மாவை இரவு முழுவதும் வெளியே வைக்க வேண்டாம்.');
 const plan={date:dateStr,text:lines.join('\n')};
 output(plan.text,plan);
}
section.querySelector('#hcKitchenAskSend').addEventListener('click',help);
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();help()}});
section.querySelector('#hcKitchenTomorrow').addEventListener('click',tomorrowPlan);
saveBtn.addEventListener('click',()=>{if(!lastPlan)return;save(savedKey,lastPlan);output(lastPlan.text+'\n\nSaved on this device / இந்தச் சாதனத்தில் சேமிக்கப்பட்டது.',lastPlan)});
button.addEventListener('click',()=>{section.hidden=!section.hidden;button.setAttribute('aria-expanded',String(!section.hidden));if(!section.hidden){const p=load(savedKey);if(p?.date===tomorrow()&&!input.value.trim())output(p.text+'\n\nRemembered here / இங்கே சேமிக்கப்பட்டுள்ளது.',p);input.focus();}});
mealButton?.addEventListener('click',()=>{const drawer=document.getElementById('hcKitchenDrawer');if(drawer)drawer.open=true;const target=document.getElementById('hcMonthlyKitchen');if(target){target.hidden=false;requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'smooth'}));}},true);
})();