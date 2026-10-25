/* HeartClear v245 — whole-app language infrastructure.
   One user-facing language preference. Keep source books/scriptures and media untouched.
   Original English strings are preserved in WeakMaps; switching is reversible. */
(function(){
'use strict';
if(window.HCAppLanguage)return;
const KEY='hcAppLanguageV245';
const TRANSLATIONS={"Good morning":"காலை வணக்கம்","Good afternoon":"மதிய வணக்கம்","Good evening":"மாலை வணக்கம்","Good night":"இனிய இரவு","Welcome":"வரவேற்கிறோம்","Welcome to HeartClear":"HeartClear-க்கு வரவேற்கிறோம்","Home":"முகப்பு","Back":"பின்செல்","Back to Home":"முகப்பிற்குத் திரும்பு","Return to Home":"முகப்பிற்குத் திரும்பு","Settings":"அமைப்புகள்","Search":"தேடல்","Search HeartClear":"HeartClear-இல் தேடுங்கள்","Listen":"கேளுங்கள்","Library":"நூலகம்","Explore":"ஆராயுங்கள்","Explore · ஆராயுங்கள்":"ஆராயுங்கள்","One question. Go deeper. Return Home.":"ஒரு கேள்வி. ஆழமாக ஆராயுங்கள். முகப்பிற்குத் திரும்புங்கள்.","One thing at a time":"ஒரு நேரத்தில் ஒரு செயல்","ONE THING AT A TIME":"ஒரு நேரத்தில் ஒரு செயல்","LISTEN NOW":"இப்போது கேளுங்கள்","One tap. Just listen.":"ஒரு தொடுதல். கேட்டுப் பாருங்கள்.","Ocean":"கடல்","Natural waves":"இயற்கைக் கடல் அலைகள்","Organic Bansuri":"இயற்கை புல்லாங்குழல்","15 minutes · Flute":"15 நிமிடம் · புல்லாங்குழல்","Allahu Hu · Akmal":"அல்லாஹு ஹூ · அக்மல்","24:32 · Your recording":"24:32 · உங்கள் பதிவு","Your recording":"உங்கள் பதிவு","Meditation":"தியானம்","MEDITATION":"தியானம்","Yoga · Movement":"யோகா · உடல் இயக்கம்","Deep Wake Up":"ஆழ்ந்த காலை விழிப்பு","Noon Reset":"மதியப் புத்துணர்வு","Evening Release":"மாலை மனவிடுதலை","Deep Sleep":"ஆழ்ந்த உறக்கம்","Begin morning meditation":"காலைத் தியானத்தைத் தொடங்கு","Begin midday meditation":"மதியத் தியானத்தைத் தொடங்கு","Begin evening meditation":"மாலைத் தியானத்தைத் தொடங்கு","Begin night meditation":"இரவுத் தியானத்தைத் தொடங்கு","Begin meditation":"தியானத்தைத் தொடங்கு","Begin listening":"கேட்கத் தொடங்கு","A comfortable pause.":"சிறிது நேரம் அமைதியாக இருங்கள்.","Begin the day with gentle awareness.":"மென்மையான விழிப்புணர்வுடன் நாளைத் தொடங்குங்கள்.","A quiet pause in your afternoon.":"மதியத்தில் ஒரு அமைதியான இடைவெளி.","Settle after the day.":"நாள் முடிவில் அமைதி பெறுங்கள்.","A quiet moment before rest.":"உறக்கத்திற்கு முன் அமைதியான தருணம்.","Other meditation times":"பிற தியான நேரங்கள்","MORNING · MEDITATION & YOGA":"காலை · தியானமும் யோகாவும்","MIDDAY · MEDITATION & YOGA":"மதியம் · தியானமும் யோகாவும்","EVENING · MEDITATION & YOGA":"மாலை · தியானமும் யோகாவும்","NIGHT · MEDITATION & YOGA":"இரவு · தியானமும் யோகாவும்","Morning":"காலை","Midday":"மதியம்","Evening":"மாலை","Night":"இரவு","MORNING":"காலை","MIDDAY":"மதியம்","EVENING":"மாலை","NIGHT":"இரவு","Breakfast":"காலை உணவு","Lunch":"மதிய உணவு","Dinner":"இரவு உணவு","Today’s meals":"இன்றைய உணவுகள்","Today's meals":"இன்றைய உணவுகள்","Today’s home cooking":"இன்றைய வீட்டு சமையல்","KITCHEN · பாரம்பரிய சமையல்":"பாரம்பரிய சமையல்","KITCHEN":"சமையலறை","Kitchen":"சமையலறை","Recipes":"சமையல் முறைகள்","Find a recipe":"சமையல் முறையைத் தேடு","Choose a traditional recipe":"பாரம்பரிய சமையலைத் தேர்ந்தெடுங்கள்","Meal ideas":"உணவு யோசனைகள்","Save for tomorrow":"நாளைக்குச் சேமி","Tomorrow":"நாளை","Tradition":"சமையல் மரபு","All traditions":"அனைத்து மரபுகளும்","All":"அனைத்தும்","Food":"உணவு","Sounds":"ஒலிகள்","Sound Lab":"ஒலி ஆய்வகம்","Sound Familiarity":"ஒலிப் பழக்கம்","Sound familiarity":"ஒலிப் பழக்கம்","Sacred Sound":"புனித ஒலிகள்","Sacred listening":"புனித ஒலிகளைக் கேட்பது","Nature sounds":"இயற்கை ஒலிகள்","Nature":"இயற்கை","Ambient":"சுற்றுப்புற ஒலி","Flute":"புல்லாங்குழல்","Mixes":"ஒலிக் கலவைகள்","Start mix":"ஒலிக் கலவையைத் தொடங்கு","Stop mix":"ஒலிக் கலவையை நிறுத்து","Mix your own":"நீங்களே கலக்குங்கள்","Music Presence":"இசை உணர்வு","Ocean Familiarity":"கடல் ஒலிப் பழக்கம்","Human Practice":"மனிதப் பயிற்சி","Practice":"பயிற்சி","Practice again":"மீண்டும் பயிற்சி","Practices":"பயிற்சிகள்","Prayer, readings & other options":"பிரார்த்தனை, வாசிப்புகள் மற்றும் பிற விருப்பங்கள்","Read":"வாசிக்க","Reading":"வாசிப்பு","Books":"புத்தகங்கள்","English Audiobooks":"ஆங்கில ஒலிப் புத்தகங்கள்","Audiobooks":"ஒலிப் புத்தகங்கள்","Read English":"ஆங்கிலத்தில் வாசிக்க","Read Tamil":"தமிழில் வாசிக்க","Reading excerpts":"வாசிப்புப் பகுதிகள்","Continue":"தொடர்க","Continue reading":"வாசிப்பைத் தொடர்க","Continue listening":"தொடர்ந்து கேளுங்கள்","Continue where you left off":"நிறுத்திய இடத்திலிருந்து தொடருங்கள்","Continue at your saved position":"சேமித்த இடத்திலிருந்து தொடருங்கள்","Continue saved session":"சேமித்த அமர்வைத் தொடருங்கள்","Session restored. Tap Play to continue listening.":"அமர்வு மீட்டமைக்கப்பட்டது. தொடர்ந்து கேட்க இயக்கு என்பதைத் தொடுங்கள்.","Session restored. Tap Play to continue listening":"அமர்வு மீட்டமைக்கப்பட்டது. தொடர்ந்து கேட்க இயக்கு என்பதைத் தொடுங்கள்","Session restored.":"அமர்வு மீட்டமைக்கப்பட்டது.","Tap Play to continue listening.":"தொடர்ந்து கேட்க இயக்கு என்பதைத் தொடுங்கள்.","Reels":"குறும்படங்கள்","Video":"காணொளி","Videos":"காணொளிகள்","Watch":"பார்க்க","Watch again":"மீண்டும் பார்க்க","View all":"அனைத்தையும் காண்க","Refresh":"புதுப்பி","Open":"திற","Close":"மூடு","Close and continue":"மூடித் தொடர்க","Cancel":"ரத்து செய்","Save":"சேமி","Save note":"குறிப்பைச் சேமி","Save chapter offline":"அத்தியாயத்தை ஆஃப்லைனில் சேமி","Saved":"சேமிக்கப்பட்டது","Done":"முடிந்தது","Finish":"முடி","Finish practice":"பயிற்சியை முடி","Finish listening":"கேட்பதை முடி","Start":"தொடங்கு","Stop":"நிறுத்து","Play":"இயக்கு","Pause":"இடைநிறுத்து","Previous":"முந்தையது","Next":"அடுத்தது","Next sound":"அடுத்த ஒலி","Next track":"அடுத்த பதிவு","More":"மேலும்","More options":"மேலும் விருப்பங்கள்","Other collections":"பிற தொகுப்புகள்","All sounds":"அனைத்து ஒலிகளும்","Other sacred":"பிற புனித மரபுகள்","Favourite":"பிடித்தவை","Favourites":"பிடித்தவை","Search food, drinks or ingredients":"உணவு, பானம் அல்லது பொருளைத் தேடுங்கள்","Search all recipes":"அனைத்து சமையல் முறைகளிலும் தேடு","Choose time":"நேரத்தைத் தேர்ந்தெடு","Choose your time.":"உங்களுக்கான நேரத்தைத் தேர்ந்தெடுங்கள்.","Set time":"நேரத்தை அமை","Quiet Timer":"அமைதி நேரக்கணிப்பான்","Quiet":"அமைதி","Gentle pace":"மென்மையான வேகம்","Attention":"கவனம்","Awareness":"விழிப்புணர்வு","Stillness":"அசைவற்ற அமைதி","Reflection":"சிந்தனை","Calm":"அமைதி","Clear":"தெளிவு","Restless":"அமைதியின்மை","Tired":"சோர்வு","Unsure":"தெரியவில்லை","Not now":"இப்போது வேண்டாம்","Skip":"தவிர்","Skip preparation":"தயாரிப்பைத் தவிர்","Play introduction":"அறிமுகத்தை இயக்கு","Start timer":"நேரக்கணிப்பைத் தொடங்கு","Record voice":"குரலைப் பதிவு செய்","Stop recording":"பதிவை நிறுத்து","Play background sound":"பின்னணி ஒலியை இயக்கு","Minimize":"சிறிதாக்கு","Minimize to Home":"முகப்பிற்குச் சிறிதாக்கு","Downloads":"பதிவிறக்கங்கள்","Offline":"இணையமின்றி","Offline downloads":"இணையமின்றிப் பயன்படும் பதிவுகள்","Offline downloads →":"இணையமின்றிப் பயன்படும் பதிவுகள் →","My Offline":"எனது ஆஃப்லைன்","History":"வரலாறு","Your history":"உங்கள் வரலாறு","Profile":"சுயவிவரம்","Privacy & data":"தனியுரிமை மற்றும் தரவு","More settings":"கூடுதல் அமைப்புகள்","Install":"நிறுவு","Install app":"செயலியை நிறுவு","Install HeartClear":"HeartClear-ஐ நிறுவு","Copy installation link":"நிறுவல் இணைப்பை நகலெடு","Use guest":"விருந்தினராகப் பயன்படுத்து","Guest mode":"விருந்தினர் முறை","Language":"மொழி","English":"English","தமிழ்":"தமிழ்","English / Tamil":"English / தமிழ்","Qur’an":"குர்ஆன்","Qur'an":"குர்ஆன்","Qur’an audio":"குர்ஆன் ஒலி","Qur’an · 114":"குர்ஆன் · 114","Al-Fatiha":"அல்-ஃபாத்திஹா","Surah Al-Fatiha":"ஸூரத்துல் ஃபாத்திஹா","Three Qul":"மூன்று குல் ஸூராக்கள்","Morning Qur’an":"காலை குர்ஆன்","Morning Adhkar":"காலை திக்ர்","Surah for now":"இப்போது ஓர் ஸூரா","All 114 Surahs":"114 ஸூராக்களும்","Read · தமிழ் / English":"வாசிப்பு · தமிழ்","Arabic":"அரபி","Arabic recitation":"அரபி ஓதுதல்","Recite Along":"சேர்ந்து ஓதுங்கள்","Read and listen":"வாசித்துக் கேளுங்கள்","The Living Qur'an":"வாழ்வில் குர்ஆன்","Bible":"பைபிள்","Genesis":"ஆதியாகமம்","Open Genesis":"ஆதியாகமத்தைத் திற","Old Testament":"பழைய ஏற்பாடு","Hindu Scriptures":"இந்து சமய நூல்கள்","Bhagavad Gita":"பகவத் கீதை","Gita · Chapter 2":"கீதை · அத்தியாயம் 2","Gita listening language":"கீதை ஒலியின் மொழி","Original human voice · 18 chapters":"மனிதக் குரலில் அசல் பதிவு · 18 அத்தியாயங்கள்","Original human voice":"மனிதக் குரலில் அசல் பதிவு","Read or listen":"வாசிக்க அல்லது கேட்க","18 chapters":"18 அத்தியாயங்கள்","Explore Hindu scriptures":"இந்து சமய நூல்களை ஆராயுங்கள்","Dosa":"தோசை","Ingredients":"தேவையான பொருட்கள்","Cooking":"செய்முறை","Method":"செய்முறை","Instructions":"வழிமுறைகள்","Health":"உடல்நலம்","Daily Care":"தினசரி பராமரிப்பு","Human Knowledge":"மனித அறிவு","Mind Game":"மன விளையாட்டு","Guess my thought":"என் எண்ணத்தை ஊகியுங்கள்","Guess my thought?":"என் எண்ணத்தை ஊகிக்க முடியுமா?","Why this guess?":"ஏன் இந்த ஊகம்?","Yes":"ஆம்","No":"இல்லை","I don't know":"எனக்குத் தெரியாது","I’m not sure":"எனக்கு உறுதியாகத் தெரியவில்லை","Show more":"மேலும் காட்டு","Show less":"குறைவாகக் காட்டு","View details":"விவரங்களைப் பார்","Privacy":"தனியுரிமை","Export data":"தரவை ஏற்றுமதி செய்","Erase data":"தரவை அழி","Use location":"இருப்பிடத்தைப் பயன்படுத்து","Add to calendar":"நாள்காட்டியில் சேர்","Run test":"சோதனையை இயக்கு","Copy result":"முடிவை நகலெடு","Reset":"மீட்டமை","Repeat":"மீண்டும் செய்","Open practice":"பயிற்சியைத் திற","Open Qur’an":"குர்ஆனைத் திற","Shadows of Truth":"உண்மையின் நிழல்கள்","No results":"முடிவுகள் இல்லை","Loading…":"ஏற்றப்படுகிறது…","Searching…":"தேடுகிறது…","Search recipes":"சமையல் முறைகளைத் தேடுங்கள்","Choose a practice.":"பயிற்சியைத் தேர்ந்தெடுங்கள்.","Your sound, reading, privacy and preferences.":"ஒலி, வாசிப்பு, தனியுரிமை, உங்கள் விருப்பங்கள்.","Choose what matters to you.":"உங்களுக்கு முக்கியமானதைத் தேர்ந்தெடுங்கள்.","One touch opens your world.":"ஒரு தொடுதல் உங்கள் உலகைத் திறக்கிறது.","Morning, midday, evening and night.":"காலை, மதியம், மாலை, இரவு.","A calm moment for morning, midday, evening or night.":"காலை, மதியம், மாலை, இரவு என எந்த நேரத்திலும் அமைதியான தருணம்.","Read and listen. Arabic, English and Tamil.":"அரபி, ஆங்கிலம், தமிழில் வாசித்துக் கேளுங்கள்.","Genesis. Read or listen, one chapter at a time.":"ஆதியாகமத்தை ஒவ்வொரு அத்தியாயமாக வாசிக்கவும் கேட்கவும்.","Find everyday food from Tamil cooking and around the world.":"தமிழ் மற்றும் உலகச் சமையலைக் கண்டறியுங்கள்.","A few minutes of quiet.":"சில நிமிட அமைதி.","Your session continues as you move.":"நீங்கள் நகர்ந்தாலும் உங்கள் அமர்வு தொடரும்.","Save on this device":"இந்தக் கருவியில் சேமி","Saved on this device":"இந்தக் கருவியில் சேமிக்கப்பட்டது","Audio":"ஒலி","Now Playing":"இப்போது ஒலிக்கிறது","Play audio":"ஒலியை இயக்கு","Listen to Book":"ஒலிப் புத்தகத்தைக் கேளுங்கள்","Read Book":"புத்தகத்தை வாசிக்க","Start Chapter 1":"முதல் அத்தியாயத்தைத் தொடங்கு","Start again":"மீண்டும் தொடங்கு","A newer version is ready.":"புதிய பதிப்பு தயாராக உள்ளது.","This week":"இந்த வாரம்","Evening Quiet":"மாலை அமைதி","Morning Quiet":"காலை அமைதி","Midday Pause":"மதிய இடைவெளி","7-Day Starter":"ஏழு நாள் தொடக்கப் பயிற்சி","30-Day Return":"முப்பது நாள் மீள்பயிற்சி","Watch again · மீண்டும் பார்க்க":"மீண்டும் பார்க்க","Opening Qur'an study · குர்ஆன் வாசிப்பு":"குர்ஆன் வாசிப்பு","Back to Hindu Insight":"இந்து அறிவுப் பக்கத்திற்குத் திரும்பு"};
const words=new Map(Object.entries(TRANSLATIONS));
const textCache=new WeakMap(),attrCache=new WeakMap();
let lang='en',scheduled=false,busy=false;
try{lang=localStorage.getItem(KEY)==='ta'?'ta':'en'}catch(_){}
const skip='script,style,noscript,template,textarea,code,pre,svg,option,[contenteditable],#hcAppLanguageHome,#hcAppLanguageSettings,#hcKitchenLanguageBar,#hcHomeKitchenQuickV155,.hcqs-arabic,.hcqs-ta,.hcqs-en,.hcq-arabic,.hc-hindu-source,.hc-gen-text,.reader-page,.hcqs-source,.hc-vedic-original,.hc-hindu-meaning';
const tamil=/[\u0B80-\u0BFF]/;
function protectedNode(node){
 const parent=node?.nodeType===3?node.parentElement:node;
 return !parent||!!parent.closest(skip);
}
function renderValue(original,locale){
 const source=String(original||'');
 const match=/^(\s*)([\s\S]*?)(\s*)$/.exec(source);
 const value=match?.[2]||'';
 if(!value)return source;
 const dictionary=words.get(value);
 if(locale==='ta'){
  if(dictionary!=null)return match[1]+dictionary+match[3];
  const phrase=/^(.*?)(\s*[·/]\s*)([\u0B80-\u0BFF][\s\S]*)$/.exec(value);
  if(phrase&&phrase[1].trim()&&!tamil.test(phrase[1]))return match[1]+phrase[3]+match[3];
  const alias=/^(Morning|Midday|Evening|Night)\s*·\s*MEDITATION\s*&\s*YOGA$/i.exec(value);
  if(alias)return (words.get(alias[1].toUpperCase()+' · MEDITATION & YOGA')||value);
  return source;
 }
 // Default English: strip only clearly separate bilingual UI labels,
 // but never touch source material or personal writings.
 if(words.has(value))return source;
 const pair=/^(.*?)(\s*[·/]\s*)([\u0B80-\u0BFF][\s\S]*)$/.exec(value);
 if(pair&&pair[1].trim()&&!tamil.test(pair[1]))return match[1]+pair[1].trim()+match[3];
 return source;
}
function transform(node){
 if(!node||node.nodeType!==3||protectedNode(node))return;
 const current=node.nodeValue;
 let remembered=textCache.get(node);
 if(!remembered||current!==remembered.last){
  remembered={source:current,last:current};textCache.set(node,remembered);
 }
 const result=renderValue(remembered.source,lang);
 if(result!==current){remembered.last=result;node.nodeValue=result;}
}
const translateAttrs=['placeholder','aria-label','title'];
function updateAttrs(element){
 if(!(element instanceof HTMLElement)||protectedNode(element))return;
 let saved=attrCache.get(element);if(!saved){saved={};attrCache.set(element,saved);}
 for(const attr of translateAttrs){
  if(!element.hasAttribute(attr))continue;
  const current=element.getAttribute(attr);
  const before=saved[attr];
  if(!before||before.last!==current)saved[attr]={source:current,last:current};
  const result=renderValue(saved[attr].source,lang);
  if(current!==result){saved[attr].last=result;element.setAttribute(attr,result);}
 }
}
function visit(root){
 if(!root)return;
 if(root.nodeType===3){transform(root);return}
 if(root.nodeType!==1||protectedNode(root))return;
 updateAttrs(root);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
 let node;while((node=walker.nextNode())){
  if(node.nodeType===3)transform(node);else updateAttrs(node);
 }
}
const home=document.getElementById('home');
const oldBig=document.getElementById('hcBubbleClassic');
if(oldBig)oldBig.remove();
function makeSwitch(id){
 const box=document.createElement('div');box.id=id;
 box.className='hc-app-lang-switch';box.setAttribute('role','group');box.setAttribute('aria-label','App language');
 box.innerHTML='<button type="button" data-hc-app-lang="en" lang="en">English</button><button type="button" data-hc-app-lang="ta" lang="ta">தமிழ்</button>';
 box.addEventListener('click',e=>{
  const button=e.target.closest('[data-hc-app-lang]');if(button)setLanguage(button.dataset.hcAppLang);
 });
 return box;
}
if(home&&!document.getElementById('hcAppLanguageHome')){
 const control=makeSwitch('hcAppLanguageHome');home.prepend(control);
}
const settings=document.querySelector('#settings > .glass');
if(settings&&!document.getElementById('hcAppLanguageSettings')){
 const container=document.createElement('section');container.className='hc-app-language-settings';
 container.innerHTML='<strong id="hcAppLangSettingsCaption">Language</strong>';
 container.append(makeSwitch('hcAppLanguageSettings'));
 settings.prepend(container);
}
const observer=new MutationObserver(records=>{
 if(busy)return;
 for(const record of records){
  if(record.type==='characterData')dirty.add(record.target);
  else if(record.type==='childList')for(const node of record.addedNodes)dirty.add(node);
 }
 schedule();
});
const dirty=new Set();
function buttons(){
 document.documentElement.lang=lang;
 document.querySelectorAll('.hc-app-lang-switch [data-hc-app-lang]').forEach(button=>{
  const selected=button.dataset.hcAppLang===lang;
  button.setAttribute('aria-pressed',String(selected));
 });
}
function flush(){
 scheduled=false;if(busy)return;busy=true;
 try{
  const items=[...dirty];dirty.clear();
  if(!items.length){visit(document.body);}
  else{for(const item of items){if(item.isConnected)visit(item)}}
  // Translation inside Kitchen is handled by the verified recipe-specific layer.
  if(typeof window.HCKitchenLanguage?.get==='function'&&window.HCKitchenLanguage.get()!==lang)
   window.HCKitchenLanguage.set(lang);
  buttons();
 }finally{busy=false;}
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(flush)}}
function setLanguage(next){
 if(next!=='en'&&next!=='ta')return;
 lang=next;try{localStorage.setItem(KEY,lang)}catch(_){}
 dirty.clear();
 // Revisit all original DOM text nodes in either direction.
 schedule();window.dispatchEvent(new CustomEvent('hc:languagechange',{detail:{lang}}));
}
window.HCAppLanguage={get:()=>lang,set:setLanguage,translate:(str)=>renderValue(str,lang)};
window.hcSetLanguage=setLanguage;
buttons();
observer.observe(document.body,{subtree:true,childList:true,characterData:true});
schedule();
window.addEventListener('pageshow',()=>{dirty.clear();schedule()});
window.addEventListener('focus',schedule);
})();
