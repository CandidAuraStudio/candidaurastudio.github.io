/* HeartClear: Hindu Scriptures · v162. Short source-backed learning, never labels TTS as chant. */
(function(){
'use strict';
const home=document.getElementById('home');
const listens=home?.querySelector('.hc-simple-audio-list');
const sacred=document.getElementById('sacredDetail');
const dest=sacred?.querySelector('.glass');
if(!home||!listens||!dest||document.getElementById('hcHinduScriptures'))return;
const works=[
 {id:'gita',en:'Bhagavad Gita',ta:'பகவத் கீதை',ne:'भगवद्गीता',kind:'The Mahabharata · teachings on action and the self',short:'Gita',
  lessons:[
   {id:'gita247',ref:'2.47',enTitle:'Action without attachment',taTitle:'பலனில் பற்றற்ற செயல்',neTitle:'फलको मोहबिनाको कर्म',
    sanskrit:'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।',
    en:'This verse teaches sincere action without claiming control over every result. It also warns against abandoning action. Reflection: choose one useful task, do it carefully, and remember that outcomes depend on more than your effort.',
    ta:'இந்தச் சுலோகம் செயலை நேர்மையாகச் செய்யவும், அதன் பலன் முழுவதும் நம் கட்டுப்பாட்டில் இல்லை என்பதை உணரவும் கூறுகிறது. செயலைக் கைவிடச் சொல்லவில்லை. இன்று ஒரு பயனுள்ள செயலை கவனமாகச் செய்து, அதன் பலனைப் பற்றி அளவுக்கு மீறிக் கவலைப்படாமல் இருங்கள்.',
    ne:'यो श्लोकले आफ्नो कर्म इमानदारीपूर्वक गर्न र सबै परिणाम हाम्रो नियन्त्रणमा हुँदैनन् भन्ने बुझ्न सिकाउँछ। यसले काम छोड्न भन्दैन। आज एउटा उपयोगी काम ध्यानपूर्वक गर्नुहोस् र परिणाममा मात्र नअड्किनुहोस्।',
    url:'https://www.gitasupersite.iitk.ac.in/srimad?choose=1&etgb=1&field_chapter_value=2&field_nsutra_value=47&language=dv&setgb=1'},
   {id:'gita65',ref:'6.5',enTitle:'The mind as a companion',taTitle:'மனதைத் துணையாக வளர்த்தல்',neTitle:'मनलाई साथी बनाउने',
    sanskrit:'उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।।',
    en:'This passage urges us to raise ourselves rather than pull ourselves down. It describes the self as capable of being a friend or an obstacle. Reflection: notice one habit that supports clear thinking, and one habit you can gradually change.',
    ta:'இந்தப் பகுதி நம்மை நாமே உயர்த்திக் கொள்ளவும், நம்மை நாமே தாழ்த்திக் கொள்ளாமல் இருக்கவும் நினைவூட்டுகிறது. நம் மனப்போக்கும் பழக்கங்களும் உதவியாகவும் தடையாகவும் அமையலாம். இன்று உங்களுக்கு உதவும் ஒரு பழக்கத்தையும் மாற்ற வேண்டிய ஒரு பழக்கத்தையும் கவனியுங்கள்.',
    ne:'यस पदले आफूलाई उकास्न र आफूलाई तल नझार्न सम्झाउँछ। आफ्नै मन र व्यवहार साथी पनि बन्न सक्छन्, बाधा पनि। आज आफूलाई सहयोग गर्ने एउटा बानी र बिस्तारै सुधार्न सकिने अर्को बानी सम्झनुहोस्।',
    url:'https://www.gitasupersite.iitk.ac.in/srimad?etsiva=1&field_chapter_value=6&field_nsutra_value=5&language=dv&setgb=1'}
  ]},
 {id:'veda',en:'Rigveda',ta:'ரிக் வேதம்',ne:'ऋग्वेद',kind:'Veda / Śruti · hymns',short:'Rigveda',
  lessons:[
   {id:'rig10129',ref:'10.129 · Nāsadīya Sūkta',enTitle:'Questions about creation',taTitle:'படைப்பைப் பற்றிய கேள்விகள்',neTitle:'सृष्टिबारे प्रश्न',
    sanskrit:'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत्।',
    en:'The Nāsadīya hymn asks what existed before creation and how anyone can know its beginnings. It allows space for wonder and uncertainty rather than pretending every mystery is settled. Reflection: what can careful inquiry tell us, and what remains unknown?',
    ta:'நாசதீய சூக்தம் படைப்புக்கு முன் என்ன இருந்தது, அதன் தொடக்கத்தை எப்படித் தெரிந்துகொள்வது என்று கேட்கிறது. எல்லா கேள்விகளுக்கும் உடனடி உறுதியான பதில் உண்டு என்று கூறாமல், வியப்புக்கும் ஐயத்துக்கும் இடம் தருகிறது. நாம் அறிந்ததும் அறியாததும் என்ன என்பதைச் சிந்தியுங்கள்.',
    ne:'नासदीय सूक्तले सृष्टिअघि के थियो र यसको आरम्भ कसरी थाहा पाउने भनेर प्रश्न गर्छ। यसले सबै रहस्यको उत्तर थाहा भएको दाबी गर्दैन; जिज्ञासा र विनम्रतालाई ठाउँ दिन्छ। हामीलाई के थाहा छ र के अझै अज्ञात छ भनेर सोच्नुहोस्।',
    url:'https://sanskritdocuments.org/doc_veda/naasadiiya.html?lang=sa'}
  ]},
 {id:'purana',en:'Bhagavata Purana',ta:'பாகவத புராணம்',ne:'भागवत पुराण',kind:'Purāṇa / Smṛti · devotional narrative and teachings',short:'Purana',
  lessons:[
   {id:'bhag126',ref:'1.2.6',enTitle:'Devotion without bargaining',taTitle:'எதிர்பார்ப்பற்ற பக்தி',neTitle:'निःस्वार्थ भक्ति',
    sanskrit:'स वै पुंसां परो धर्मो यतो भक्तिरधोक्षजे।\nअहैतुक्यप्रतिहता ययात्मा सुप्रसीदति।।',
    en:'In the Bhagavata Purana, this verse praises devotion to the Divine that is not driven by personal gain and is not easily interrupted. It connects sincere devotion with inner contentment. Reflection: can care or devotion be practised without asking for a reward?',
    ta:'பாகவத புராணத்தின் இந்தப் பாடல், தனிப்பட்ட பலனை எதிர்பார்க்காத, தடைகளால் எளிதில் கைவிடப்படாத இறைப் பக்தியைப் போற்றுகிறது. அத்தகைய பக்தியை மனநிறைவுடன் இணைக்கிறது. பலனை எதிர்பாராமல் அன்பையும் அக்கறையையும் வெளிப்படுத்த முடியுமா என்று சிந்தியுங்கள்.',
    ne:'भागवत पुराणको यस श्लोकले व्यक्तिगत लाभको अपेक्षाबिना गरिने र कठिनाइले सजिलै नरोकिने ईश्वरभक्तिको प्रशंसा गर्छ। यस्तो भक्तिलाई आन्तरिक सन्तोषसँग जोड्छ। कुनै पुरस्कारको आशा नगरी स्नेह र सेवा गर्न सकिन्छ कि भनेर सोच्नुहोस्।',
    url:'https://vedabase.io/en/library/sb/1/2/6/'}
  ]}
];
const all=works.flatMap(w=>w.lessons.map(l=>({...l,work:w})));
const names={en:'English',ta:'தமிழ்',ne:'नेपाली'};
 const gitaLanguages={en:'English',ta:'தமிழ்',hi:'हिन्दी',sa:'संस्कृत',ne:'नेपाली'};
 let homeLang='en',homeChapter=1,homePlaying=false;
 try{
  const savedAudio=localStorage.getItem('hcGitaVoiceLang');
  const global=localStorage.getItem('hcAppLanguageV245');
  homeLang=gitaLanguages[savedAudio]?savedAudio:(global==='ta'?'ta':'en');
  const n=Number(localStorage.getItem('hcGitaVoiceChapter'));
  if(n>=1&&n<=18)homeChapter=n;
 }catch(e){} 
const speechLocale={en:'en-GB',ta:'ta-IN',ne:'ne-NP'};
const speechTest={en:/^en([-_]|$)/i,ta:/^ta([-_]|$)/i,ne:/^ne([-_]|$)/i};
const PREF='hcHinduLanguageV1',LAST='hcHinduLastLessonV1';
let lang='en',active=null,playing=false,paused=false;
try{const l=localStorage.getItem(PREF);if(names[l])lang=l}catch(e){}
const styles=document.createElement('style');
styles.textContent=[
'#hcHinduHome{display:flex;flex-wrap:wrap;align-items:center;gap:7px;min-height:48px;margin-top:10px;padding:8px;border:1px solid rgba(203,224,233,.20);border-radius:12px;background:#0b2430;color:#fff;font:inherit}',
'#hcHinduHome .hc-hindu-info{flex:1;min-width:0;line-height:1.3;text-align:left}',
'#hcHinduHome .hc-hindu-info b{font-size:12px;display:block}',
'#hcHinduHome .hc-hindu-info small{font-size:10px;color:#bfd0d7;display:block}',
'#hcHinduHome select{max-width:112px;min-width:0;min-height:36px;font-size:12px;background:#183542;color:#fff;border:1px solid #506b79;border-radius:9px;padding:5px}',
 '#hcHinduHome .hc-hindu-info{flex:1 1 165px}',
 '#hcHinduHome .hc-gita-home-chapter{max-width:105px}',
 '#hcHinduHome .hc-hindu-play{min-width:45px}',
 '#hcHinduHome .hc-gita-home-lang{display:none!important}',
 '#hcHinduHome .hc-gita-language-chips{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px;order:3;flex:0 0 100%;width:100%}',
 '#hcHinduHome .hc-gita-language-chips button{min-width:0;min-height:37px;padding:5px 1px;border:1px solid #44616f;background:#173b4b;border-radius:9px;color:#e2eff2;font:600 clamp(9px,2.5vw,11px)/1.2 system-ui;overflow-wrap:anywhere}',
 '#hcHinduHome .hc-gita-language-chips button[aria-pressed=true]{background:#eff6f5;border-color:#eff6f5;color:#132f3a;font-weight:750}',
'#hcHinduHome button{height:36px;min-width:36px;border:1px solid #647b86;border-radius:10px;background:#203a47;color:#fff;font:600 14px system-ui}',
'#hcHinduHome .hc-hindu-play{background:#f1f2eb;color:#0d212d}',
'#hcHinduHome .hc-hindu-open{font-size:19px}',
'#hcHinduScriptures{border:1px solid rgba(205,230,237,.25);border-radius:16px;margin:13px 0;padding:12px;background:#102631}',
'#hcHinduScriptures h3{font-size:17px;margin:0 0 6px}',
'#hcHinduTraditions{margin:7px 0 10px;background:#0b1a21;border:1px solid #41535e;border-radius:12px;padding:10px 12px}',
'#hcHinduTraditions summary{cursor:pointer;font-size:12px;color:#dce6e9;font-weight:600}',
'#hcHinduTraditions div{display:grid;gap:2px;padding:9px 1px;border-top:1px solid #2d4450}',
'#hcHinduTraditions b{font-size:12px}',
'#hcHinduTraditions small{font-size:11px;color:#b4c1c8;line-height:1.5}',
'#hcHinduScriptures .hc-hindu-lead{font-size:12px;line-height:1.6;color:#c7d8de;margin:5px 0 12px}',
'#hcHinduScriptures .hc-hindu-row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}',
'#hcHinduScriptures select{min-height:37px;background:#1b3542;border:1px solid #6b8490;border-radius:9px;color:#fff;padding:7px;font:inherit;font-size:12px}',
'#hcHinduScriptures details{border:1px solid #476270;border-radius:11px;padding:0 10px;background:#112c39;margin:8px 0}',
'#hcHinduScriptures summary{cursor:pointer;list-style:none;min-height:46px;display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:650}',
'#hcHinduScriptures summary::-webkit-details-marker{display:none}',
'#hcHinduScriptures .hc-hindu-lesson{border-top:1px solid #42606c;padding:12px 1px}',
'#hcHinduScriptures .hc-hindu-lesson h4{font-size:13px;margin:4px 0}',
'#hcHinduScriptures .hc-hindu-source{white-space:pre-line;font-size:14px;line-height:1.8;color:#eee7d5;margin:9px 0}',
'#hcHinduScriptures .hc-hindu-meaning{line-height:1.8;font-size:13px;color:#e3edef;margin:7px 0;white-space:pre-line}',
'#hcHinduScriptures button{min-height:38px;border:1px solid #728996;border-radius:9px;background:#244351;color:#fff;padding:8px 12px;font:inherit;font-size:12px}',
'#hcHinduScriptures .hc-hindu-lesson-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}',
'#hcHinduScriptures a{color:#d5e7f0;font-size:11px;display:inline-block;overflow-wrap:anywhere}',
'.hc-hindu-status{font-size:11px;line-height:1.55;color:#d6e6ec;margin:7px 0 0}',
'#hcHinduHome :is(button,select):focus-visible,#hcHinduScriptures :is(button,summary,select,a):focus-visible{outline:2px solid #fff;outline-offset:2px}'
].join('\n');document.head.append(styles);
const homeBar=document.createElement('div');homeBar.id='hcHinduHome';homeBar.setAttribute('aria-label','Hindu wisdom one-tap listening');
homeBar.innerHTML='<span class="hc-hindu-info"><b>Bhagavad Gita · Chapter 1</b><small>Original voice · 18 chapters</small></span><select class="hc-gita-home-lang" aria-label="Gita audio language"></select><select class="hc-gita-home-chapter" aria-label="Gita chapter"></select><button class="hc-hindu-play" type="button" aria-label="Play or pause Gita on Home">▶</button><button class="hc-hindu-open" type="button" aria-label="Explore Hindu scriptures">›</button>';
listens.after(homeBar);
const shelf=document.createElement('section');shelf.id='hcHinduScriptures';shelf.hidden=true;shelf.setAttribute('aria-label','Hindu scripture learning library');
dest.querySelector('.hc-sacred-learn')?.before(shelf);
shelf.innerHTML='<div class="hc-hindu-row"><div><h3>Hindu Scriptures</h3><small>கீதை · வேதம் · புராணம் · गीता · वेद · पुराण</small></div><select class="hc-hindu-lang" aria-label="Scripture listening language"></select></div><p class="hc-hindu-lead">Sanskrit source passages with short original explanations in English, தமிழ் and नेपाली. Audio commentary is provided only where a human recording is verified. Gita chanting, translations, and personal reflections are distinct.</p><div class="hc-hindu-groups"></div><p class="hc-hindu-status" id="hcHinduShelfStatus" role="status" aria-live="polite"></p><p class="hc-hindu-lead">Primary-text citations accompany every lesson. Full sacred works and licensed professional recordings are not yet embedded.</p>';
const map=document.createElement('details');
map.id='hcHinduTraditions';
map.className='hc-hindu-map';
map.innerHTML='<summary>Explore Hindu traditions · கற்றல்</summary>'+
'<div><b>Bhagavad Gita</b><small>18 chapters, within the Mahabharata · Original chapter audio</small></div>'+
'<div><b>Four Vedas</b><small>Rigveda · Samaveda · Yajurveda · Atharvaveda · Text samples, not full audio</small></div>'+
'<div><b>Upanishads</b><small>Philosophical dialogues · Full audio collection not connected</small></div>'+
'<div><b>Epics</b><small>Mahabharata and Ramayana · Separate works, not Gita chapters</small></div>'+
'<div><b>Puranas</b><small>Many devotional and narrative works · Bhagavata passage available below</small></div>'+
'<div><b>Ayurveda</b><small>Traditional health literature, not a fifth Veda or medical instructions</small></div>';
shelf.querySelector('.hc-hindu-groups')?.before(map);
const status=document.createElement('p');status.className='hc-hindu-status';status.id='hcHinduHomeStatus';homeBar.after(status);
function saveLang(){try{localStorage.setItem(PREF,lang)}catch(e){}}
function populateSelect(select){
 for(const [key,value] of Object.entries(names)){const o=document.createElement('option');o.value=key;o.textContent=value;select.append(o)}
 select.value=lang;
 select.addEventListener('change',e=>{if(names[e.target.value]){stop();lang=e.target.value;saveLang();update();}})
}
const homeLanguageSelect=homeBar.querySelector('.hc-gita-home-lang');
 const homeChapterSelect=homeBar.querySelector('.hc-gita-home-chapter');
 for(const [key,label] of Object.entries(gitaLanguages)){
  const option=document.createElement('option');option.value=key;option.textContent=label;homeLanguageSelect.add(option);
 }
 for(let n=1;n<=18;n++){
  const option=document.createElement('option');option.value=String(n);option.textContent='Ch '+n;homeChapterSelect.add(option);
 }
 homeLanguageSelect.value=homeLang;homeChapterSelect.value=String(homeChapter);
 const languageChips=document.createElement('div');languageChips.className='hc-gita-language-chips';languageChips.setAttribute('role','group');languageChips.setAttribute('aria-label','Choose a Gita audio language');
 for(const [key,label] of Object.entries(gitaLanguages)){
  const btn=document.createElement('button');btn.type='button';btn.dataset.gitaLang=key;btn.textContent=label;btn.setAttribute('aria-pressed',String(key===homeLang));languageChips.append(btn);
 }
 homeBar.append(languageChips);
 shelf.querySelectorAll('.hc-hindu-lang').forEach(populateSelect);
const groupContainer=shelf.querySelector('.hc-hindu-groups');
for(const w of works){
 const details=document.createElement('details');
 details.dataset.scripture=w.id;details.open=false;
 const summary=document.createElement('summary');summary.textContent=w.en+' · '+w.ta+' · '+w.ne;
 details.append(summary);
 const kicker=document.createElement('p');kicker.className='hc-hindu-lead';kicker.textContent=w.kind;details.append(kicker);
 for(const l of w.lessons){
  const article=document.createElement('article');article.className='hc-hindu-lesson';article.dataset.lesson=l.id;
  const title=document.createElement('h4');title.textContent=l.ref+' · '+l.enTitle;article.append(title);
  const source=document.createElement('p');source.className='hc-hindu-source';source.lang='sa';source.textContent=l.sanskrit;article.append(source);
  const meaning=document.createElement('p');meaning.className='hc-hindu-meaning';meaning.textContent=l[lang];article.append(meaning);
  const action=document.createElement('div');action.className='hc-hindu-lesson-actions';
  const play=document.createElement('button');play.type='button';play.dataset.speak=l.id;play.textContent=l.id.startsWith('gita')?'▶ Human voice':'Read only';play.setAttribute('aria-label',l.id.startsWith('gita')?'Listen to human-voiced Gita chapter':'No approved human voice available');
  const original=document.createElement('a');original.href=l.url;original.target='_blank';original.rel='noopener noreferrer';original.textContent='Read source ↗';
  action.append(play,original);article.append(action);
  play.addEventListener('click',()=>toggle(l.id));
  details.append(article);
 }
 groupContainer.append(details);
}
function update(message=''){
 homeLanguageSelect.value=homeLang;
  homeChapterSelect.value=String(homeChapter);
  languageChips.querySelectorAll('button[data-gita-lang]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.gitaLang===homeLang)));
  homeBar.querySelector('.hc-hindu-info b').textContent='Bhagavad Gita · Chapter '+homeChapter;
  homeBar.querySelector('.hc-hindu-info small').textContent=(homeLang==='ne'?'Nepali audio pending · ':'Original recording · ')+gitaLanguages[homeLang];
 shelf.querySelector('.hc-hindu-lang').value=lang;
 homeBar.querySelector('.hc-hindu-play').textContent=homePlaying?'Ⅱ':'▶';
  homeBar.querySelector('.hc-hindu-play').setAttribute('aria-pressed',String(homePlaying));
 shelf.querySelectorAll('[data-speak]').forEach(b=>{b.textContent=active?.id===b.dataset.speak&&playing?(paused?'▶ Resume':'Ⅱ Pause'):'▶ Listen'});
 shelf.querySelectorAll('.hc-hindu-lesson').forEach(article=>{
  const l=all.find(x=>x.id===article.dataset.lesson);
  if(l){article.querySelector('.hc-hindu-meaning').textContent=l[lang];article.querySelector('.hc-hindu-meaning').lang=lang}
 });
 if(message){status.textContent=message;shelf.querySelector('#hcHinduShelfStatus').textContent=message;}
}
function voices(){try{return window.speechSynthesis?.getVoices?.()||[]}catch(e){return []}}
function suitableVoice(){
 const available=voices().filter(v=>speechTest[lang].test(v.lang||'')&&!/patrick/i.test(v.name||''));
 // Respect previous request for a calm lower male voice when discoverable,
 // otherwise use a correct-locale voice rather than an incorrect-language substitute.
 const preferred=available.find(v=>/\b(male|david|daniel|oliver|ryan|thomas|ravi|aaron|william)\b/i.test(v.name||''));
 return preferred||available.find(v=>/google|natural|premium|neural/i.test(v.name||''))||available[0]||null;
}
function stop(){
 try{window.speechSynthesis?.cancel()}catch(e){}
 active=null;playing=false;paused=false;update();
}
function pauseOtherPlayers(){
 document.querySelectorAll('audio, video').forEach(el=>{try{if(!el.paused&&!el.muted)el.pause()}catch(e){}});
 try{if(typeof renderGlobalMini==='function')renderGlobalMini()}catch(e){}
}
function toggle(id){
 const l=all.find(x=>x.id===id);if(!l)return;
 if(l.work.id==='gita'){
   const chapter=Number(l.ref.split('.')[0])||2;
   if(typeof window.hcGitaHomeToggle==='function')window.hcGitaHomeToggle(chapter,homeLang);
   else update('Human narration is not ready. Please refresh HeartClear.');
   return;
 }
 update('A verified human recording is not available for this lesson. The source text and reference remain available.');
 return;
 if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){update('This browser cannot read aloud. The lessons are available in text.');return}
 if(active?.id===id&&playing){
  if(paused){try{speechSynthesis.resume();paused=false;update('Resuming '+names[lang]+' teaching.')}catch(e){update('Could not resume audio.')}}else{speechSynthesis.pause();paused=true;update('Paused.')}
  return;
 }
 const voice=suitableVoice();
 if(!voice){stop();update('No '+names[lang]+' voice is installed or exposed by this browser. The text remains available. Add a '+names[lang]+' device voice to listen.');return}
 stop();pauseOtherPlayers();
 const u=new SpeechSynthesisUtterance(l[lang]);
 u.lang=speechLocale[lang];u.voice=voice;u.rate=.88;u.pitch=.93;u.volume=1;
 active=l;playing=true;paused=false;
 u.onend=()=>{if(active===l){playing=false;active=null;paused=false;update('Teaching ended.')}};u.onerror=()=>{if(active===l){playing=false;active=null;paused=false;update('Audio could not play. Read the teaching or try another installed voice.')}};
 try{speechSynthesis.speak(u);update('Playing '+l.work.en+' '+l.ref+' · '+names[lang]+' · device voice ('+voice.name+').')}catch(e){stop();update('Audio could not start.')}
 try{localStorage.setItem(LAST,l.id)}catch(e){}
}
function homePlay(){
 if(typeof window.hcGitaHomeToggle==='function')window.hcGitaHomeToggle(homeChapter,homeLang);
 else update('The Home Gita audio is still loading. Please refresh HeartClear.');
}
homeBar.querySelector('.hc-hindu-play').addEventListener('click',homePlay);
function homeChoose(){
 homeLang=homeLanguageSelect.value;
 homeChapter=Number(homeChapterSelect.value)||1;
 update();
 if((homeLang==='en'||homeLang==='ta')&&window.HCAppLanguage?.get?.()!==homeLang)window.HCAppLanguage?.set?.(homeLang);
 homePlay(); // Explicit selection starts native audio directly, never a new page.
}
languageChips.addEventListener('click',event=>{
 const btn=event.target.closest?.('button[data-gita-lang]');
 if(!btn)return;
 homeLanguageSelect.value=btn.dataset.gitaLang;
 homeChoose();
});
homeLanguageSelect.addEventListener('change',homeChoose);
homeChapterSelect.addEventListener('change',homeChoose);
window.addEventListener('hc:gita-state',event=>{
 const state=event.detail||{};
 if(state.mode!=='gita')return;
 if(gitaLanguages[state.lang])homeLang=state.lang;
 if(Number.isInteger(state.chapter))homeChapter=state.chapter;
 homePlaying=!!state.playing;
 update();
 status.textContent=state.message||'';
});
window.addEventListener('hc:languagechange',event=>{
 const next=event.detail?.lang;
 if(next!=='en'&&next!=='ta')return;
 lang=next;saveLang();homeLang=next;homePlaying=false;update();
 window.hcGitaHomeConfigure?.(homeChapter,next);
});
homeBar.querySelector('.hc-hindu-open').addEventListener('click',()=>{
 if(typeof openSacred==='function')openSacred('hindu');
 const group=shelf.querySelector('[data-scripture="gita"]');if(group)group.open=true;
 shelf.scrollIntoView({block:'nearest',behavior:'smooth'});
});
function sacredVisibility(){
 shelf.hidden=document.getElementById('sacredKicker')?.textContent?.trim()!=='Hindu';
}
if(typeof window.openSacred==='function'){
 const original=window.openSacred;
 window.openSacred=function(kind){const r=original.apply(this,arguments);sacredVisibility();return r};
}
sacredVisibility();
document.addEventListener('play',e=>{if(playing&&e.target instanceof HTMLMediaElement)stop()},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){/* browsers can pause speech in the background; do not promise continuous playback */}});
window.addEventListener('pagehide',stop);
if('speechSynthesis' in window&&typeof speechSynthesis.addEventListener==='function')speechSynthesis.addEventListener('voiceschanged',()=>{if(!playing&&status.textContent.includes('No '+names[lang]))update('Voice availability has changed. Try Play again.')});
update();
})();