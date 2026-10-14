/* NIYYAH Phase 1 — private bilingual contemplative PWA; no external APIs or analytics. */
(()=>{
'use strict';
const chapters=window.NIYYAH_CHAPTERS||[],learning=window.NIYYAH_LESSONS||{};
const root=document.getElementById('app'),toastEl=document.getElementById('toast');
const LANG_KEY='niyyah:language:v1',JOURNAL_KEY='niyyah:journal:v1',PREFS_KEY='niyyah:preferences:v1';
const levels=[3,5,7,10],stages=[
{en:'Arrive naturally',ta:'இயல்பாக அமைதியடையுங்கள்',detail:{en:'Sit comfortably. Let your breath move naturally.',ta:'வசதியாக அமருங்கள். மூச்சை இயல்பாக விடுங்கள்.'}},
{en:'Listen or remember',ta:'கேளுங்கள் அல்லது நினைவுகூருங்கள்',detail:{en:'Recall a meaningful phrase, or simply listen to the sounds around you.',ta:'பொருளுள்ள ஒரு சொற்றொடரை நினைவில் கொள்ளுங்கள்; இல்லையெனில் சுற்றியுள்ள ஒலிகளைக் கேளுங்கள்.'}},
{en:'Notice intention',ta:'நோக்கத்தைக் கவனியுங்கள்',detail:{en:'What thought or intention is present? You need not act on it.',ta:'இப்போது எந்த எண்ணம் அல்லது நோக்கம் உள்ளது? அதன்படி உடனே செயல்பட வேண்டியதில்லை.'}},
{en:'Rest quietly',ta:'சிறிது அமைதியாக இருங்கள்',detail:{en:'No need to remove thoughts. Notice, allow, and return to the present.',ta:'எண்ணங்களை நீக்க வேண்டியதில்லை. அவற்றைக் கவனித்து, நிகழ்காலத்திற்குத் திரும்புங்கள்.'}},
{en:'Choose compassion',ta:'அன்பான செயலைத் தேர்ந்தெடுங்கள்',detail:{en:'Choose one kind, practical action for today.',ta:'இன்று செய்யக்கூடிய அன்பான ஒரு நடைமுறைச் செயலைத் தேர்ந்தெடுங்கள்.'}}
];
const U={
journey:['THE INNER JOURNEY','உள் பயணம்'],home:['Home','முகப்பு'],intention:['Intention','நோக்கம்'],ego:['Ego / Nafs','நஃப்ஸ் / அகந்தை'],wisdom:['Sacred Wisdom','இறை ஞானம்'],wisdomShort:['Wisdom','ஞானம்'],voice:['Voice & Silence','ஒலியும் அமைதியும்'],science:['Science','அறிவியல்'],practice:['Daily Practice','தினப் பயிற்சி'],practiceShort:['Practice','பயிற்சி'],journal:['Private Journal','தனிப்பட்ட குறிப்பேடு'],journalShort:['Journal','குறிப்பேடு'],language:['Language','மொழி'],begin:['Begin practice','பயிற்சியைத் தொடங்கு'],more:['More','மேலும்']
};
const E=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const get=(key,def)=>{try{const r=localStorage.getItem(key);return r===null?def:JSON.parse(r);}catch(_){return def;}};
const put=(key,val)=>{try{localStorage.setItem(key,JSON.stringify(val));return true;}catch(_){toast('Device storage is unavailable. Export your notes first.');return false;}};
let lang=localStorage.getItem(LANG_KEY)||'en';if(!['en','ta','both'].includes(lang))lang='en';
let notesRaw=get(JOURNAL_KEY,[]),notes=Array.isArray(notesRaw)?notesRaw.filter(n=>n&&typeof n.id==='string'&&typeof n.text==='string').slice(0,100).map(n=>({id:n.id.slice(0,90),title:String(n.title||'').slice(0,110),text:n.text.slice(0,8000),date:String(n.date||'')})):[];
let prefs0=get(PREFS_KEY,{}),prefs={
minutes:levels.includes(prefs0.minutes)?prefs0.minutes:5,
showLatin:prefs0.showLatin!==false,
history:prefs0.history===true,
completed:Number.isInteger(prefs0.completed)&&prefs0.completed>=0?Math.min(prefs0.completed,10000):0
};
let timer={remaining:prefs.minutes*60,minutes:prefs.minutes,active:false,expires:0,tick:null,finished:false};
let currentRoute='home',toastHandle=null;
const use=k=>(lang==='ta'?k.ta:k.en);
const t=(en,ta)=>lang==='ta'?E(ta):lang==='both'?'<div class="bilingual"><span>'+E(en)+'</span><span lang="ta" class="tamil second">'+E(ta)+'</span></div>':E(en);
const line=(en,ta)=>lang==='both'?'<div class="bilingual"><span lang="en">'+E(en)+'</span><span class="tamil second" lang="ta">'+E(ta)+'</span></div>':lang==='ta'?'<span class="tamil" lang="ta">'+E(ta)+'</span>':'<span lang="en">'+E(en)+'</span>';
const B=b=>line(b.en,b.ta);
const phrase=(key)=>{const u=U[key];return u?lang==='ta'?u[1]:lang==='both'?u[0]+' · '+u[1]:u[0]:key;};
const uri=s=>encodeURIComponent(s);
const ids=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'local-'+Date.now()+'-'+Math.random().toString(36).slice(2);
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastHandle);toastHandle=setTimeout(()=>toastEl.classList.remove('show'),3400);}
function chrome(){document.documentElement.lang=lang==='ta'?'ta':'en';const select=document.getElementById('lang-select');if(select)select.value=lang;document.querySelectorAll('[data-ui]').forEach(el=>{const key=el.dataset.ui;if(U[key])el.textContent=phrase(key);});document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===currentRoute;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});}
function header(kicker,title,desc){return '<section class="page-head"><div class="eyebrow">'+B(kicker)+'</div><h1>'+B(title)+'</h1><p>'+B(desc)+'</p></section>';}
function button(url,en,ta,primary=false){return '<a class="'+(primary?'btn-primary':'btn-outline')+'" href="'+url+'">'+line(en,ta)+' ↗</a>';}
function sectionTitle(en,ta){return '<div class="section-head"><div><div class="eyebrow">'+line('EXPLORE','ஆராயுங்கள்')+'</div><h2>'+line(en,ta)+'</h2></div></div>';}
const path=[
{page:'intention',en:'INTENTION',ta:'நோக்கம்',glyph:'◎'},
{page:'ego',en:'EGO',ta:'நஃப்ஸ்',glyph:'◇'},
{page:'wisdom',en:'UNDERSTANDING',ta:'புரிதல்',glyph:'✧'},
{page:'voice',en:'STILLNESS',ta:'அமைதி',glyph:'〰'},
{page:'practice',en:'ACTION',ta:'செயல்',glyph:'◷'},
{page:'science',en:'AWARENESS',ta:'விழிப்புணர்வு',glyph:'⌁'}
];
function home(){
 const day=Math.floor(new Date().setHours(0,0,0,0)/86400000),reflect=learning.daily[(day%7+7)%7]||learning.daily[0];
 const routeLabels={intention:['Why we act','நாம் ஏன் செயல்படுகிறோம்?'],ego:['Recognising reaction','எதிர்வினையை உணர்தல்'],wisdom:['The four chapters','நான்கு அத்தியாயங்கள்'],voice:['Listen and pause','கேட்டுப் நிதானித்தல்'],practice:['A few minutes','சில நிமிடங்கள்'],science:['What research finds','ஆய்வு கூறுவது']};
 return '<div class="hero"><div><div class="eyebrow">'+line('THE INNER SCIENCE OF INTENTION','நோக்கத்தின் அக அறிவியல்')+'</div><h1>'+line('Before you act,<br>notice within.','செயலுக்கு முன்<br>உள்ளே கவனியுங்கள்.').replace(/&lt;br&gt;/g,'<br>')+'</h1><p>'+line('Do not merely repeat words. Understand what you are saying. Notice the intention behind each action.','வார்த்தைகளை வெறுமனே திரும்பச் சொல்லாதீர்கள். நீங்கள் சொல்வதன் பொருளை உணருங்கள். உங்கள் செயலுக்குப் பின்னால் உள்ள நோக்கத்தைக் கவனியுங்கள்.')+'</p><div class="actions">'+button('#/practice','Continue practice','பயிற்சியைத் தொடருங்கள்',true)+button('#/wisdom','Explore sacred wisdom','இறை ஞானத்தை ஆராயுங்கள்')+'</div></div>'+
 '<div class="hero-visual" aria-hidden="true"><div class="halo"></div><div class="halo two"></div><div class="halo three"></div><div class="light-core"><span>◌</span></div><div class="hero-caption">INTENTION · AWARENESS · ACTION</div></div></div>'+
 '<div class="hero-motto"><span><b>01</b> '+line('NOTICE','கவனியுங்கள்')+'</span><span><b>02</b> '+line('UNDERSTAND','புரிந்துகொள்ளுங்கள்')+'</span><span><b>03</b> '+line('ACT WITH CARE','அக்கறையுடன் செயல்படுங்கள்')+'</span></div>'+
 '<section class="section"><div class="daily-card"><div><div class="eyebrow">'+line('TODAY’S INVITATION','இன்றைய சிந்தனை')+'</div><h2>'+line('One question to carry.','சிந்திக்க ஒரு கேள்வி.')+'</h2><p>'+B(reflect)+'</p></div>'+button('#/journal','Reflect privately','தனிப்பட்ட குறிப்பில் எழுதுங்கள்')+'</div></section>'+
 '<section class="section">'+sectionTitle('The journey is yours.','இந்தப் பயணம் உங்களுடையது.')+'<div class="journey-path">'+path.map((x,i)=>'<a class="path-card" href="#/'+x.page+'"><span class="path-num">0'+(i+1)+' / 06</span><span class="path-glyph">'+x.glyph+'</span><h3>'+line(x.en,x.ta)+'</h3><p>'+line(routeLabels[x.page][0],routeLabels[x.page][1])+'</p><span class="arrow">↗</span></a>').join('')+'</div></section>'+
 '<section class="section"><div class="note"><div class="eyebrow">'+line('NOT A RELIGIOUS TEST','மதத் தேர்வு அல்ல')+'</div><h3>'+line('Space for sincere inquiry','நேர்மையான சிந்தனைக்கு ஓர் இடம்')+'</h3><p>'+line('Qur’anic verses are distinguished from human reflections. No belief is required to explore attention, compassion, and responsibility.','குர்ஆன் வசனங்களும் மனித விளக்கங்களும் தனித்தனியாகக் காட்டப்படுகின்றன. கவனம், இரக்கம், பொறுப்பு ஆகியவற்றை ஆராய எந்த நம்பிக்கையும் கட்டாயமல்ல.')+'</p></div></section>';
}
function lessonsView(kind){
 const ego=kind==='ego',list=learning[kind]||[];
 return header({en:ego?'UNDERSTANDING THE NAFS':'WHY DO WE ACT?',ta:ego?'நஃப்ஸை அறிதல்':'நாம் ஏன் செயல்படுகிறோம்?'},{en:ego?'Observe the ego.':'The intention beneath action.',ta:ego?'அகந்தையைக் கவனியுங்கள்.':'செயலின் பின்னால் இருக்கும் நோக்கம்.'},{en:ego?'Notice pride, fear, attachment and judgment as experiences, not identities.':'One small pause may help you examine what is driving a choice.',ta:ego?'பெருமை, பயம், பற்றுதல், தீர்ப்பு ஆகியவற்றை நிலையான அடையாளங்களாக அல்ல; கவனிக்கக்கூடிய அனுபவங்களாகப் பாருங்கள்.':'ஒரு சிறிய இடைவெளி உங்கள் தேர்வை வழிநடத்தும் நோக்கத்தைப் புரிந்துகொள்ள உதவலாம்.'})+
 '<div class="lesson-list">'+list.map((v,i)=>'<article class="lesson-card"><div class="eyebrow">0'+(i+1)+'</div><h3>'+B(v.title)+'</h3><p>'+B(v.body)+'</p><div class="question">'+B(v.question)+'</div><div class="practice-note">'+B(v.step)+'</div></article>').join('')+'</div>'+
 '<div class="note"><div class="eyebrow">'+line('GENTLE EXPERIMENT','மென்மையான பயிற்சி')+'</div><h3>'+line('Observe without accusation.','குற்றம் சாட்டாமல் கவனியுங்கள்.')+'</h3><p>'+line('A passing thought is not a verdict about your worth. Choose your next response with curiosity and kindness.','கடந்து செல்லும் எண்ணம் உங்கள் மதிப்பைப் பற்றிய தீர்ப்பு அல்ல. அடுத்த பதிலை ஆர்வத்துடனும் அன்புடனும் தேர்ந்தெடுங்கள்.')+'</p><div class="actions" style="margin-top:16px">'+button('#/practice','Try a short practice','சிறிய பயிற்சியை முயற்சிக்கவும்',true)+button('#/journal','Write a reflection','குறிப்பெழுதுங்கள்')+'</div></div>';
}
function wisdom(){
 return header({en:'SACRED WISDOM',ta:'இறை ஞானம்'},{en:'Words. Meaning. Reflection.',ta:'வசனம். பொருள். சிந்தனை.'},{en:'Study the original Arabic alongside independent meaning-based English and Tamil explanations. Nothing here claims to replace scholarship or a qualified reciter.',ta:'மூல அரபு வசனங்களுடன் கருத்தை விளக்கும் ஆங்கில, தமிழ் உரைகளைப் படியுங்கள். இவை அறிஞர்களின் விளக்கத்திற்கும் சரியான ஓதலைக் கற்பிக்கும் ஆசிரியருக்கும் மாற்றல்ல.'})+
 '<div class="chapter-grid">'+chapters.map(ch=>'<a class="chapter-card" href="#/chapter/'+ch.id+'"><div class="number">'+ch.number+' / QUR’AN</div><h3>'+B(ch.name)+'</h3><p>'+B(ch.theme)+'</p><div class="verse-count">'+ch.verses.length+' '+line('verses','வசனங்கள்')+' ↗</div></a>').join('')+'</div>'+
 '<div class="note"><div class="eyebrow">'+line('SOURCE SEPARATION','மூலமும் விளக்கமும் வேறுபடும்')+'</div><h3>'+line('What is scripture, and what is reflection?','எது வசனம்? எது மனிதச் சிந்தனை?')+'</h3><p>'+line('Arabic verses are the Qur’anic text. English/Tamil meanings are original explanatory renderings, not certified translations. Transliteration is approximate. Personal reflection is clearly outside the verse text. No hadith or classical tafsir is quoted as if it were part of the Qur’an.','அரபு வசனங்களே குர்ஆனின் மூல உரை. ஆங்கில, தமிழ் பொருள்கள் புரிதலுக்கான சொந்த விளக்கங்கள்; அதிகாரப்பூர்வ மொழிபெயர்ப்புகள் அல்ல. ஒலிபெயர்ப்பு தோராயமானது. தனிப்பட்ட சிந்தனை வசனத்திற்கு வெளியே தெளிவாகக் காட்டப்படுகிறது. ஹதீஸோ பாரம்பரியத் தஃப்ஸீரோ குர்ஆன் வசனமாகக் காட்டப்படவில்லை.')+'</p><small>'+line('Verse numbering: Al-Fatiha includes Bismillah as verse 1; chapters 112–114 do not count the opening Bismillah as a numbered verse.','வசன எண்கள்: அல்ஃபாத்திஹாவில் பிஸ்மில்லாஹ் வசனம் 1; 112–114 அத்தியாயங்களில் தொடக்க பிஸ்மில்லாஹ் வசன எண்ணில் சேராது.')+'</small></div>'+nearness();
}
function nearness(){
 const v=learning.nearness;
 return '<section class="note"><div class="eyebrow">'+line('QUR’AN 50:16 & 42:11','குர்ஆன் 50:16 மற்றும் 42:11')+'</div><h3>'+B(v.title)+'</h3><p>'+B(v.body)+'</p><div class="tool-row" style="margin-top:14px">'+v.urls.map((url,i)=>'<a target="_blank" rel="noopener noreferrer" href="'+url+'" class="small-link">'+(i?'42:11':'50:16')+' ↗</a>').join('')+'</div></section>';
}
function chapterView(id){
 const ch=chapters.find(x=>x.id===id);if(!ch)return wisdom();
 const reference=ch.verses[0]?.ref||'';
 return '<div class="chapter-top"><a href="#/wisdom" class="small-link">← '+line('All chapters','அனைத்து அத்தியாயங்கள்')+'</a><div class="eyebrow" style="margin-top:18px">'+line('QUR’AN · CHAPTER','குர்ஆன் · அத்தியாயம்')+' '+ch.number+'</div><h1>'+B(ch.name)+'</h1><p>'+B(ch.theme)+'</p></div>'+
 '<div class="source-strip"><p>'+line('Original Arabic · meaning-based renderings · separate reflection.','மூல அரபு · கருத்துப் பொருள் · தனியான சிந்தனை.')+'</p><a href="'+ch.source+'" target="_blank" rel="noopener noreferrer">'+line('Verify / listen at Quran.com','Quran.com இல் சரிபார்க்க / கேட்க')+' ↗</a></div>'+
 '<label class="switch-row"><input type="checkbox" id="latin-switch" '+(prefs.showLatin?'checked':'')+'><span>'+line('Show transliteration (approximate)','ஒலிபெயர்ப்பைக் காட்டுங்கள் (தோராயம்)')+'</span></label>'+
 '<section class="verse-list" aria-label="Chapter verses" style="margin-top:22px">'+ch.verses.map(v=>'<article class="verse"><div class="verse-head"><span class="verse-ref">'+v.ref+'</span><span class="script-label">'+line('QUR’ANIC ARABIC','குர்ஆன் அரபு')+'</span></div><p class="arabic" dir="rtl" lang="ar">'+E(v.arabic)+'</p>'+(prefs.showLatin?'<p class="translit">'+line('Transliteration:','ஒலிபெயர்ப்பு:')+' '+E(v.transliteration)+'</p>':'')+'<div class="verse-meaning"><div class="sub-label">'+line('Meaning-focused explanation, not a formal translation','கருத்தைப் புரிய வைக்கும் விளக்கம்; அதிகாரப்பூர்வ மொழிபெயர்ப்பு அல்ல')+'</div>'+B(v.meaning)+'</div></article>').join('')+'</section>'+
 '<div class="note"><div class="eyebrow">'+line('PERSONAL CONTEMPLATION — NOT THE VERSE','தனிப்பட்ட சிந்தனை — வசனம் அல்ல')+'</div><h3>'+line('Carry one question.','ஒரு கேள்வியை எடுத்துச் செல்லுங்கள்.')+'</h3><p>'+B(ch.reflection)+'</p><div class="actions" style="margin-top:18px">'+button('#/journal','Write privately','தனியாக எழுதுங்கள்',true)+button('#/voice','Explore listening','கேட்பதை ஆராயுங்கள்')+'</div><small>'+line('Arabic verse text was cross-checked against the linked Qur’an chapter. This app does not host recordings or synthesize Qur’anic recitation.','இணைக்கப்பட்ட குர்ஆன் அத்தியாயத்துடன் அரபு வசனங்கள் ஒப்பிடப்பட்டுள்ளன. இந்தச் செயலி ஓதல் ஒலிப்பதிவுகளை வைத்திருக்கவோ இயந்திர ஓதலை உருவாக்கவோ இல்லை.')+'</small></div>';
}
function voice(){
 const steps=[
['01','Listen','கேளுங்கள்','Open a verified recitation source when you choose.','நீங்கள் விரும்பும்போது சரிபார்க்கப்பட்ட ஓதல் மூலத்தைத் திறக்குங்கள்.'],
['02','Speak gently','மெதுவாகச் சொல்லுங்கள்','Repeat aloud at a comfortable volume; do not shout.','இயல்பான குரலில் சொல்லுங்கள்; கத்த வேண்டாம்.'],
['03','Pause','சற்று அமைதியாகுங்கள்','Let breathing remain natural; do not force silence.','மூச்சை இயல்பாக விடுங்கள்; அமைதியை வற்புறுத்த வேண்டாம்.'],
['04','Consider meaning','பொருளைச் சிந்தியுங்கள்','Ask what the words invite you to change in action.','இந்த வார்த்தைகள் உங்கள் செயலை எவ்வாறு மாற்ற அழைக்கின்றன என்று சிந்தியுங்கள்.']
 ];
 return header({en:'VOICE & SILENCE',ta:'ஒலியும் அமைதியும்'},{en:'Listen. Speak. Be still.',ta:'கேளுங்கள். சொல்லுங்கள். அமைதியிருங்கள்.'},{en:'Sound is a way to engage attention, not proof of a medical effect. Recitation is optional and begins only when you open a trusted source.',ta:'ஒலி கவனத்தை ஈர்க்கும் ஒரு வழி; அது மருத்துவப் பலனுக்கான ஆதாரம் அல்ல. ஓதல் விருப்பத்திற்குரியது; நம்பகமான மூலத்தை நீங்கள் திறக்கும்போதுதான் தொடங்கும்.'})+
 '<div class="voice-steps">'+steps.map(s=>'<article class="voice-step"><strong>'+s[0]+'</strong><h3>'+line(s[1],s[2])+'</h3><p>'+line(s[3],s[4])+'</p></article>').join('')+'</div>'+
 '<div class="note"><h3>'+line('A gentle remembrance','மென்மையான நினைவுகூரல்')+'</h3><p>'+B(learning.voice)+'</p></div>'+
 '<section class="section">'+sectionTitle('Listen from an attributed source.','மூலம் குறிப்பிடப்பட்ட ஓதலைக் கேளுங்கள்.')+'<div class="chapter-grid">'+chapters.map(ch=>'<a class="chapter-card" target="_blank" rel="noopener noreferrer" href="'+ch.source+'"><span class="eyebrow">'+ch.number+'</span><h3>'+B(ch.name)+'</h3><p>'+line('Opens Quran.com; audio is not stored in NIYYAH.','Quran.com திறக்கும்; ஒலி NIYYAH செயலியில் சேமிக்கப்படாது.')+'</p><div class="verse-count">'+line('Open source / recitation','மூலம் / ஓதலைத் திறக்கவும்')+' ↗</div></a>').join('')+'</div></section>'+
 '<div class="note"><div class="eyebrow">'+line('PHASE 2 PENDING','இரண்டாம் கட்டத்தில்')+'</div><h3>'+line('Embedded audio is not ready yet.','செயலிக்குள் ஒலி இன்னும் சேர்க்கப்படவில்லை.')+'</h3><p>'+line('Verified reuse permissions, reciter attribution, background playback, resume, offline downloads, personal voice recording and Tamil/English narration will be developed after testing. No recitation is synthesized.','மீண்டும் பயன்படுத்தும் உரிமை, ஓதியவர் பெயர், பின்னணி இயக்கம், தொடர்ச்சி, இணையமில்லா ஒலி, தனிப்பட்ட குரல் பதிவு, தமிழ்/ஆங்கில விளக்கம் ஆகியவை அடுத்த கட்டத்தில் சோதிக்கப்படும். குர்ஆன் ஓதல் செயற்கையாக உருவாக்கப்படவில்லை.')+'</p></div>';
}
function science(){
 return header({en:'SCIENCE OF AWARENESS',ta:'விழிப்புணர்வின் அறிவியல்'},{en:'What evidence can—and cannot—say.',ta:'ஆய்வு என்ன சொல்ல முடியும்? என்ன முடியாது?'},{en:'Psychology and neuroscience can study attention and behaviour. They cannot settle theological or metaphysical questions.',ta:'உளவியல், நரம்பியல் ஆய்வுகள் கவனத்தையும் நடத்தையையும் ஆராயலாம். ஆனால் இறையியல் அல்லது தத்துவக் கேள்விகளுக்கு இறுதி முடிவு வழங்க முடியாது.'})+
 '<div class="science-grid">'+(learning.science||[]).map((x,i)=>'<article class="science-card"><div class="eyebrow">RESEARCH NOTE 0'+(i+1)+'</div><h3>'+B(x.title)+'</h3><p>'+B(x.body)+'</p><div class="limit">'+B(x.limit)+'</div><a href="'+x.url+'" target="_blank" rel="noopener noreferrer">'+line('Read source & limitations','ஆதாரமும் வரம்புகளும்')+' ↗</a></article>').join('')+'</div>'+
 '<div class="note"><h3>'+line('Spiritual meaning is not a laboratory result.','ஆன்மீகப் பொருள் ஆய்வக முடிவு அல்ல.')+'</h3><p>'+line('Subjective experiences may be meaningful. Scientific studies ask measurable questions, with limitations. Neither type of account should be misrepresented as the other.','தனிப்பட்ட ஆன்மீக அனுபவங்கள் அர்த்தமுள்ளதாக இருக்கலாம். அறிவியல் ஆய்வுகள் அளவிடக்கூடிய கேள்விகளைக் கேட்கின்றன; அவற்றுக்கும் வரம்புகள் உண்டு. ஒன்றை மற்றொன்றாகக் காட்டக் கூடாது.')+'</p></div>';
}
function fmt(sec){const n=Math.max(0,Math.ceil(sec));return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function stageAt(){const spent=timer.minutes*60-timer.remaining;return Math.min(stages.length-1,Math.floor(Math.max(0,spent)/(timer.minutes*60/stages.length)));}
function practice(){
 return header({en:'DAILY PRACTICE',ta:'தினப் பயிற்சி'},{en:'A few minutes are enough to begin.',ta:'தொடங்கச் சில நிமிடங்களே போதும்.'},{en:'Choose a comfortable length. Follow natural breathing. You can stop at any time; there is no streak requirement.',ta:'உங்களுக்கு ஏற்ற நேரத்தைத் தேர்ந்தெடுங்கள். இயல்பான மூச்சோடு இருங்கள். எப்போது வேண்டுமானாலும் நிறுத்தலாம்; நாட்களைத் தொடர்ந்து எண்ணும் கட்டாயம் இல்லை.'})+
 '<div class="practice-layout"><section class="timer-card"><div class="eyebrow">'+line('CHOOSE YOUR TIME','நேரத்தைத் தேர்ந்தெடுங்கள்')+'</div><div class="duration-group">'+levels.map(n=>'<button class="duration" data-action="duration" data-minutes="'+n+'" type="button" aria-pressed="'+(timer.minutes===n)+'" '+(timer.active?'disabled':'')+'>'+n+' '+line('min','நிமி')+'</button>').join('')+'</div>'+
 '<div class="timer-circle"><div class="time" id="time-left" aria-live="off">'+fmt(timer.remaining)+'</div><div class="time-caption">'+line('NATURAL BREATH · NO RUSH','இயல்பான மூச்சு · அவசரமில்லை')+'</div></div>'+
 '<div id="timer-step" class="timer-step">'+line(stages[stageAt()].en,stages[stageAt()].ta)+'</div><div id="timer-detail" class="small-note" style="text-align:center;min-height:42px;margin-bottom:12px">'+B(stages[stageAt()].detail)+'</div>'+
 '<div class="actions timer-actions"><button class="btn-primary" data-action="toggle-timer" id="timer-toggle">'+line(timer.active?'Pause':'Start',timer.active?'இடைநிறுத்து':'தொடங்கு')+'</button><button class="btn-subtle" data-action="reset-timer">'+line('Restart','மீண்டும் தொடங்கு')+'</button></div><p class="practice-footer" id="timer-status" style="text-align:center;margin-top:14px">'+(timer.finished?line('Session finished. Carry one kind action into today.','பயிற்சி முடிந்தது. இன்று ஒரு அன்பான செயலைச் செய்யுங்கள்.'):line('Optional, quiet and completely private.','விருப்பமான, அமைதியான, தனிப்பட்ட பயிற்சி.'))+'</p></section>'+
 '<aside class="practice-guide"><div class="eyebrow">'+line('FIVE GENTLE STAGES','ஐந்து மென்மையான நிலைகள்')+'</div><ol>'+stages.map((s,i)=>'<li><span class="step-num">0'+(i+1)+'</span><div><b>'+line(s.en,s.ta)+'</b><p>'+B(s.detail)+'</p></div></li>').join('')+'</ol><label class="switch-row"><input type="checkbox" id="history-opt" '+(prefs.history?'checked':'')+'><span>'+line('Keep an optional local completed-session count','முடித்த பயிற்சிகளின் எண்ணிக்கையை விருப்பப்படி சேமிக்கவும்')+'</span></label><p class="practice-footer">'+line(prefs.history?'Recorded completions on this device: '+prefs.completed:'No practice completion history is being stored.','பயிற்சி முடித்த எண்ணிக்கை சேமிக்கப்பட்டால் மட்டுமே இங்கு தெரியும். சேமிப்பது கட்டாயமல்ல.')+'</p><div class="actions" style="margin-top:17px">'+button('#/journal','Reflect after practice','பயிற்சிக்குப் பின் எழுதுங்கள்')+'</div></aside></div>';
}
function journal(){
 return header({en:'PRIVATE REFLECTIONS',ta:'தனிப்பட்ட சிந்தனைகள்'},{en:'A place for honest words.',ta:'நேர்மையான வார்த்தைகளுக்கான ஓர் இடம்.'},{en:'Write a thought, question, or compassionate intention. Entries never leave this browser unless you explicitly export them.',ta:'ஒரு எண்ணம், கேள்வி அல்லது அன்பான நோக்கத்தை எழுதுங்கள். நீங்கள் ஏற்றுமதி செய்யாவிட்டால் குறிப்புகள் இந்த உலாவியிலேயே இருக்கும்.'})+
 '<div class="journal-layout"><section class="journal-box"><div class="eyebrow">'+line('NEW REFLECTION','புதிய சிந்தனை')+'</div><form id="journal-form"><div class="field"><label for="note-title">'+line('Title (optional)','தலைப்பு (விருப்பம்)')+'</label><input name="title" id="note-title" maxlength="110" placeholder="'+(lang==='ta'?'இன்று நான் கவனித்தது':'What I noticed today')+'"></div><div class="field"><label for="note-text">'+line('Your own words','உங்கள் வார்த்தைகள்')+'</label><textarea id="note-text" name="text" maxlength="8000" minlength="5" required placeholder="'+(lang==='ta'?'எந்த நோக்கம் இன்று என்னை வழிநடத்துகிறது?':'What intention is guiding me today?')+'"></textarea></div><button type="submit" class="btn-primary">'+line('Save privately','தனியாகச் சேமிக்கவும்')+' ↗</button></form><p class="practice-footer" style="margin-top:17px">'+line('No login. No public sharing. Export an encrypted-device-safe backup location you control; the JSON itself is not encrypted.','உள்நுழைவு தேவையில்லை. பொதுப் பகிர்வு இல்லை. ஏற்றுமதி செய்யும் JSON கோப்பு குறியாக்கம் செய்யப்பட்டதல்ல; பாதுகாப்பான இடத்தில் வைத்திருங்கள்.')+'</p></section>'+
 '<section><div class="section-head"><div><div class="eyebrow">'+line('YOUR JOURNAL','உங்கள் குறிப்பேடு')+'</div><h2>'+notes.length+' '+line('entries','குறிப்புகள்')+'</h2></div></div><div class="tool-row"><button type="button" class="btn-outline" data-action="export-journal">'+line('Export backup','காப்புப்பிரதி எடு')+'</button><button type="button" class="btn-subtle" data-action="import-journal">'+line('Import backup','காப்புப்பிரதியைத் திற')+'</button><input class="sr-only" style="display:none" id="journal-file" type="file" accept=".json,application/json"></div><div class="journal-list" style="margin-top:20px">'+(notes.length?notes.map(n=>'<article class="journal-item"><div class="journal-date">'+E(n.date?new Date(n.date).toLocaleDateString(): '')+'</div><h3>'+E(n.title||'Untitled reflection')+'</h3><p>'+E(n.text)+'</p><button type="button" class="btn-outline" data-action="delete-note" data-id="'+E(n.id)+'">'+line('Delete','நீக்கு')+'</button></article>').join(''):'<div class="empty">'+line('Your first private reflection will appear here.','முதல் தனிப்பட்ட குறிப்பு இங்கே தெரியும்.')+'</div>')+'</div></section></div>';
}
function download(filename,contents){const url=URL.createObjectURL(new Blob([contents],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),7000);}
function exportJournal(){if(!notes.length){toast('No notes to export yet.');return;}download('niyyah-private-journal-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({app:'NIYYAH',format:1,exportedAt:new Date().toISOString(),entries:notes},null,2));toast('Backup requested. Check Downloads.');}
async function importJournal(file){if(!file)return;if(file.size>2*1024*1024){toast('Backup is too large.');return;}
 try{const obj=JSON.parse(await file.text());if(obj?.app!=='NIYYAH'||!Array.isArray(obj.entries))throw Error('Not a NIYYAH journal backup.');
 const added=[],known=new Set(notes.map(n=>n.id));
 for(const n of obj.entries.slice(0,100)){if(!n||typeof n.id!=='string'||typeof n.text!=='string')continue;const nid=n.id.slice(0,90).replace(/[^a-zA-Z0-9-]/g,'');if(nid.length<3||known.has(nid)||n.text.length<5||n.text.length>8000)continue;known.add(nid);added.push({id:nid,title:String(n.title||'').slice(0,110),text:n.text,date:Number.isFinite(Date.parse(n.date))?n.date:new Date().toISOString()});if(notes.length+added.length>=100)break;}
 if(!added.length){toast('No new valid notes found.');return;}
 if(!confirm('Import '+added.length+' private notes? Existing notes will be kept.'))return;
 const previous=notes;notes=[...added,...notes].slice(0,100);if(!put(JOURNAL_KEY,notes)){notes=previous;return;}render();toast(added.length+' notes imported.');}
 catch(err){toast('Import failed: '+(err.message||'Invalid backup.'));}
}
function timerPause(){if(timer.tick){clearInterval(timer.tick);timer.tick=null;}if(timer.active){timer.remaining=Math.max(0,Math.ceil((timer.expires-Date.now())/1000));timer.active=false;}}
function setTimerMinutes(minutes){if(timer.active)return;timer.minutes=minutes;timer.remaining=minutes*60;timer.finished=false;prefs.minutes=minutes;put(PREFS_KEY,prefs);render();}
function updateTimerDOM(){const time=document.getElementById('time-left'),name=document.getElementById('timer-step'),detail=document.getElementById('timer-detail'),button=document.getElementById('timer-toggle');
 if(!time)return;time.textContent=fmt(timer.remaining);if(name)name.innerHTML=line(stages[stageAt()].en,stages[stageAt()].ta);if(detail)detail.innerHTML=B(stages[stageAt()].detail);if(button)button.innerHTML=line(timer.active?'Pause':'Start',timer.active?'இடைநிறுத்து':'தொடங்கு');
 document.querySelectorAll('.duration').forEach(b=>b.disabled=timer.active);
 if(timer.finished){const status=document.getElementById('timer-status');if(status)status.innerHTML=line('Complete. Choose one compassionate action for today.','முடிந்தது. இன்று ஒரு அன்பான செயலைத் தேர்ந்தெடுங்கள்.');}
}
function timerToggle(){if(timer.active){timerPause();updateTimerDOM();return;}if(timer.remaining<=0){timer.remaining=timer.minutes*60;timer.finished=false;}
 timer.active=true;timer.expires=Date.now()+timer.remaining*1000;timer.tick=setInterval(()=>{
 timer.remaining=Math.max(0,Math.ceil((timer.expires-Date.now())/1000));
 if(timer.remaining<=0){timerPause();timer.remaining=0;timer.finished=true;if(prefs.history){prefs.completed+=1;put(PREFS_KEY,prefs);}toast(lang==='ta'?'பயிற்சி முடிந்தது.':'Practice complete.');}
 updateTimerDOM();
 },300);updateTimerDOM();}
function timerReset(){timerPause();timer.remaining=timer.minutes*60;timer.finished=false;updateTimerDOM();const status=document.getElementById('timer-status');if(status)status.innerHTML=line('Ready when you are.','நீங்கள் தயாராக இருக்கும்போது தொடங்குங்கள்.');}
function render(){
 const pth=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/'),page=pth[0]||'home';
 if(currentRoute==='practice'&&page!=='practice')timerPause();
 currentRoute=['home','intention','ego','wisdom','voice','science','practice','journal'].includes(page)?page:page==='chapter'?'wisdom':'home';
 root.innerHTML=page==='home'?home():page==='intention'||page==='ego'?lessonsView(page):page==='wisdom'?wisdom():page==='chapter'?chapterView(pth[1]):page==='voice'?voice():page==='science'?science():page==='practice'?practice():page==='journal'?journal():home();
 chrome();
 if(page==='practice'&&timer.active)updateTimerDOM();
 window.scrollTo({top:0,behavior:'instant'});
 const menu=document.getElementById('more-menu');if(menu)menu.hidden=true;const more=document.getElementById('more-nav');if(more)more.setAttribute('aria-expanded','false');
}
const langSelect=document.getElementById('lang-select');
if(langSelect)langSelect.addEventListener('change',e=>{lang=e.target.value;if(!['en','ta','both'].includes(lang))lang='en';try{localStorage.setItem(LANG_KEY,lang);}catch(_){};render();});
const more=document.getElementById('more-nav'),menu=document.getElementById('more-menu');
if(more)more.addEventListener('click',()=>{menu.hidden=!menu.hidden;more.setAttribute('aria-expanded',String(!menu.hidden));});
root.addEventListener('change',e=>{
 if(e.target.id==='latin-switch'){prefs.showLatin=e.target.checked;put(PREFS_KEY,prefs);render();}
 if(e.target.id==='history-opt'){prefs.history=e.target.checked;if(!prefs.history)prefs.completed=0;put(PREFS_KEY,prefs);render();}
 if(e.target.id==='journal-file'){importJournal(e.target.files?.[0]);e.target.value='';}
});
root.addEventListener('submit',e=>{
 if(e.target.id!=='journal-form')return;e.preventDefault();
 const title=document.getElementById('note-title').value.trim(),text=document.getElementById('note-text').value.trim();
 if(text.length<5){toast('Write at least a few words first.');return;}
 if(notes.length>=100){toast('100 notes reached. Export and remove older notes first.');return;}
 const entry={id:ids(),title:title.slice(0,110),text:text.slice(0,8000),date:new Date().toISOString()},before=notes;
 notes=[entry,...notes];if(!put(JOURNAL_KEY,notes)){notes=before;return;}render();toast(lang==='ta'?'தனிப்பட்ட குறிப்பு சேமிக்கப்பட்டது.':'Saved privately on this device.');
});
root.addEventListener('click',e=>{
 const button=e.target.closest('[data-action]');if(!button)return;
 const a=button.dataset.action;
 if(a==='duration'){const n=Number(button.dataset.minutes);if(levels.includes(n))setTimerMinutes(n);}
 if(a==='toggle-timer')timerToggle();
 if(a==='reset-timer')timerReset();
 if(a==='export-journal')exportJournal();
 if(a==='import-journal')document.getElementById('journal-file')?.click();
 if(a==='delete-note'){const id=button.dataset.id,n=notes.find(x=>x.id===id);if(!n)return;if(!confirm(lang==='ta'?'இந்தக் குறிப்பை நீக்க வேண்டுமா?':'Delete this private note? This cannot be undone.'))return;const before=notes;notes=notes.filter(x=>x.id!==id);if(!put(JOURNAL_KEY,notes)){notes=before;return;}render();toast('Note deleted.');}
});
window.addEventListener('hashchange',render);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&timer.active){timerPause();updateTimerDOM();}});
window.addEventListener('beforeunload',timerPause);
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}));}
render();
})();