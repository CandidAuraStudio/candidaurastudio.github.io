/* HeartClear v189: dedicated three-level Heritage Reader, not nested Home dropdowns.
   Source-linked chapters are inherited unchanged from the prior heritage catalog.
   Browser back + on-screen back preserve topic / article progression. */
(function(){
'use strict';
const catalog=window.HCHeritageCatalogV189,home=document.getElementById('home');
if(!catalog||!home||document.getElementById('hcHeritageReader'))return;
const data=catalog.data,verses=catalog.verses,oldSources=catalog.sources;
const E=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ORIGIN='hcHeritageReadingProgressV189';
let lang='ta',origin='home',originY=0,route={level:'index',topic:null,item:null},sessionNumber=0;
try{const x=JSON.parse(localStorage.getItem(ORIGIN)||'null');if(x?.language==='en')lang='en'}catch(_){}
const tr=(en,ta)=>lang==='ta'?ta:en;
const topics=[['teeth','Teeth','பற்கள்'],['water','Water & wudu','நீர் · உளூ'],['food','Food & farming','உணவு · விவசாயம்'],['hair','Hair & family stories','முடி · குடும்பம்'],['whole','Body & everyday life','உடலும் அன்றாட வாழ்வும்'],['quran','Qur’an in context','குர்ஆன் · விளக்கம்']];
const bodyRows=[
['eyes','Eyes & vision','கண்கள் · பார்வை','Why blinking matters','இமைப்பதன் முக்கியம்','Blinking supports the eye’s tear film. Long periods looking at a screen can make eyes uncomfortable. Traditional preparations placed directly in eyes are not automatically safe.','இமைத்தல் கண்ணீர்ப் படலத்திற்கு உதவுகிறது. அதிக நேரம் திரையைப் பார்த்தால் கண்களுக்கு அசௌகரியம் வரலாம். பழைய முறையில் பயன்படுத்திய எல்லா கலவைகளும் கண்களுக்குப் பாதுகாப்பானவை அல்ல.','Rest your eyes, use clean hands, and seek examination for pain or changes in vision.','கண்களுக்கு ஓய்வு, சுத்தமான கைகள்; வலி அல்லது பார்வை மாற்றம் இருந்தால் பரிசோதிக்கவும்.'],
['ears','Ears & hearing','காதுகள் · கேள்வி','How ears protect themselves','காது இயற்கையாகப் பாதுகாக்கும் முறை','The ear canal usually moves wax outward. Putting sticks or oils deep inside can interfere. Ear-care customs should be traced to real communities, not assumed to be universal.','காது மெழுகு பொதுவாகத் தானே வெளியே நகரும். உள்ளே குச்சி அல்லது எண்ணெய் வைப்பது பிரச்சினை தரலாம். மரபு முறைகள் எல்லா இடங்களுக்கும் பொதுவானவை என்று கருத வேண்டாம்.','Clean the outer ear only. Keep headphones at a comfortable volume.','காதின் வெளிப்புறத்தை மட்டும் சுத்தம் செய்து ஹெட்போன் சத்தத்தைக் குறைக்கவும்.'],
['breath','Nose · breath · lungs','மூக்கு · மூச்சு · நுரையீரல்','Breathing without forcing','வற்புறுத்தாத மூச்சு','Breathing supplies oxygen and removes carbon dioxide. Meditation traditions can help people attend to breath, but they do not replace care for breathing problems.','மூச்சு ஆக்சிஜனை வழங்கி கார்பன் டைஆக்சைடை வெளியேற்றுகிறது. தியான மரபுகள் மூச்சைக் கவனிக்க உதவலாம்; மூச்சுப் பிரச்சினைக்கு மருத்துவ உதவியை மாற்றாது.','Keep living spaces ventilated. Breathe naturally; do not force breath-holds.','வீட்டில் காற்றோட்டம் வைத்துக் கொள்ளவும்; மூச்சை வலுக்கட்டாயமாக அடக்க வேண்டாம்.'],
['mouth','Teeth · tongue · taste','பற்கள் · நாக்கு · சுவை','More than a toothbrush','பிரஷைத் தாண்டி','Teeth cut and grind food; the tongue helps move it, sense tastes and form speech. Historically, dental tools differed greatly across places. The Teeth timeline records documented examples of charcoal, siwak and bristle brushes.','பற்கள் உணவை மென்று சிறிதாக்கும்; நாக்கு சுவை, உணவை நகர்த்துதல், பேசுதல் ஆகியவற்றில் உதவுகிறது. பழைய பல் சுத்தக் கருவிகள் இடத்திற்கேற்ப மாறின. கரி, மிஸ்வாக், பிரஷ் வரலாறு பற்கள் பகுதியில் உள்ளது.','Read the Teeth timeline, then care gently for your mouth with established methods.','பற்கள் வரலாற்றைப் படித்து, பாதுகாப்பான முறையில் வாயைப் பராமரிக்கவும்.'],
['skin','Skin & bathing','தோல் · குளியல்','The skin as a barrier','தோல் ஒரு பாதுகாப்பு','Very hot water and harsh scrubbing may irritate skin. Ancient bathing places also had social and religious roles; not every historical bath was used by every household.','மிகச் சூடான நீர், கடுமையான தேய்த்தல் தோலுக்கு எரிச்சல் தரலாம். பழைய குளியலறைகளுக்கு சமூக, மதப் பங்கும் இருந்தது; எல்லா வீடுகளும் ஒரே முறையைக் கடைப்பிடிக்கவில்லை.','Wash comfortably, dry gently, and use moisturiser if needed.','வசதியான நீரில் குளித்து மெதுவாக உலர்த்தி தேவைக்கேற்ப ஈரப்பதம் அளிக்கவும்.'],
['heart','Heart & circulation','இதயம் · இரத்த ஓட்டம்','Daily care, not miracle cleansing','அதிசயச் சுத்திகரிப்பு அல்ல','The heart moves blood through the body. Different cultures used the heart as a spiritual metaphor, but this should be separated from what anatomy and medicine can establish.','இதயம் உடலில் இரத்தத்தைச் செலுத்துகிறது. பல மரபுகள் இதயத்தை ஆன்மிக உருவகமாகப் பயன்படுத்தின; அது உடற்கூறியல், மருத்துவ ஆதாரத்திலிருந்து வேறுபடும்.','Rest, eat varied meals, avoid tobacco, and move comfortably.','ஓய்வு, பலவகை உணவு, புகை தவிர்த்தல், இயல்பான இயக்கம்.'],
['organs','Liver · kidney · digestion','கல்லீரல் · சிறுநீரகம் · செரிமானம்','What organs already do','உறுப்புகள் இயல்பாகச் செய்வது','The liver processes substances; kidneys filter waste and balance fluids; digestion breaks down food and absorbs nutrients. “Ancient detox” claims need evidence: natural herbs can affect health and medications.','கல்லீரல் பல பொருட்களைச் செயல்படுத்தும்; சிறுநீரகம் கழிவை வடிகட்டி நீரை ஒழுங்குபடுத்தும்; செரிமானம் உணவைச் சிதைத்து சத்தை உறிஞ்சும். “பழைய நச்சுநீக்கம்” கூற்றுக்கு ஆதாரம் தேவை. மூலிகைகளாலும் பாதிப்பு வரலாம்.','Use ordinary food and water, not unverified cleansing mixtures.','வழக்கமான உணவு, நீரைப் பயன்படுத்தி சோதிக்காத சுத்திகரிப்புக் கலவைகளைத் தவிர்க்கவும்.'],
['feet','Legs · feet · nails','கால்கள் · பாதம் · நகங்கள்','Care from the ground up','பாதத்திலிருந்து தொடங்கும் பராமரிப்பு','Feet carry the body’s weight, while toes support balance. Household grooming customs vary. Trim toenails straight across with clean tools and keep skin between toes dry.','பாதங்கள் உடல் எடையைத் தாங்குகின்றன; விரல்கள் சமநிலைக்கு உதவுகின்றன. நகப் பராமரிப்பு மரபுகள் மாறுபடும். சுத்தமான கருவியால் கால்நகங்களை நேராக வெட்டிப் பாதவிரல் இடைவெளியை உலர்த்தவும்.','Keep footwear comfortable; ask for help with pain or lasting inflammation.','வசதியான காலணி; வலி அல்லது நீடிக்கும் வீக்கம் இருந்தால் உதவி பெறவும்.'],
['house','A clean, shared home','சுத்தமான பகிர்ந்த வீடு','Cleanliness without blame','குற்றம் சொல்லாத சுத்தம்','Clean water, storing food safely, a dry bathroom, fresh towels and shared chores are all part of care. Ritual purity, including wudu, has spiritual dimensions beyond household cleaning.','சுத்தமான நீர், பாதுகாப்பான உணவுச் சேமிப்பு, உலர் குளியலறை, துணிகள், வேலை பகிர்வு அனைத்தும் பராமரிப்பு. உளூ போன்ற வழிபாட்டுத் தூய்மைக்கு வீட்டுச் சுத்தத்தைத் தாண்டிய ஆன்மிகப் பொருள் உண்டு.','Share small, practical chores fairly.','சிறிய வீட்டு வேலைகளை நியாயமாகப் பகிரவும்.'],
['learning','Lifelong learning','வாழ்நாள் கல்வி','Auntie’s English wish matters','அத்தையின் ஆங்கிலக் கனவும் முக்கியம்','Knowledge is not only about care of the body. Learning to speak, read and participate at any age is part of everyday dignity. Ask what someone actually wants to learn; preserve their own voice.','அறிவு என்பது உடல் பராமரிப்பு மட்டும் அல்ல. எந்த வயதிலும் வாசித்தல், பேசுதல், சமூகத்தில் பங்கேற்றல் முக்கியம். ஒருவர் எதைப் படிக்க விரும்புகிறார் என்று கேட்டு அவர் சொற்களை மதிக்கவும்.','One practical sentence a day is a reasonable start.','தினமும் பயனுள்ள ஒரு வாக்கியம் கற்பது நல்ல தொடக்கம்.']
];
const bodyChapter=x=>({id:x[0],era:'Everyday learning',place:'Family home',title:[x[1],x[2]],summary:[x[3],x[4]],details:[x[5],x[6]],meaning:[x[5],x[6]],apply:[x[7],x[8]],refs:[]});
const rows=topic=>topic==='whole'?bodyRows.map(bodyChapter):topic==='quran'?verses:data[topic]?.rows||[];
const topicLabel=id=>{const x=topics.find(y=>y[0]===id);return x?tr(x[1],x[2]):''};
const chTitle=x=>tr(x.title?.[0]||x.label?.[0],x.title?.[1]||x.label?.[1]);
const chShort=x=>tr(x.summary?.[0]||x.detail?.[0],x.summary?.[1]||x.detail?.[1]);
const allowedHosts=new Set(['ada.org','www.ada.org','loc.gov','www.loc.gov','americanhistory.si.edu','www.americanhistory.si.edu','metmuseum.org','www.metmuseum.org','quran.com','legacy.quran.com','sunnah.com','pmc.ncbi.nlm.nih.gov','pubmed.ncbi.nlm.nih.gov','aad.org','www.aad.org','cdc.gov','www.cdc.gov','cambridge.org','www.cambridge.org']);
function href(s){
 if(!s||typeof s.url!=='string')return '';
 try{const u=new URL(s.url);if(u.protocol!=='https:'||!allowedHosts.has(u.hostname.toLowerCase()))return '';
 return '<a class="hc-heritage-source" target="_blank" rel="noopener noreferrer" href="'+E(s.url)+'">'+E(s.label)+' ↗</a>';
 }catch(_){return ''}
}
const el=document.createElement('section');el.id='hcHeritageReader';el.className='screen hc-heritage-screen';
el.innerHTML='<header class="hc-heritage-header"><button type="button" id="hcHeritageBack" aria-label="Back">← <span>Back</span></button><div><strong id="hcHeritageHeaderTitle">Knowledge</strong><small id="hcHeritageTrail">HeartClear</small></div><button type="button" id="hcHeritageAll">All</button></header><main id="hcHeritageMain"></main><footer id="hcHeritageFooter"></footer>';
home.insertAdjacentElement('afterend',el);
const main=el.querySelector('#hcHeritageMain'),back=el.querySelector('#hcHeritageBack'),all=el.querySelector('#hcHeritageAll'),trail=el.querySelector('#hcHeritageTrail'),head=el.querySelector('#hcHeritageHeaderTitle'),footer=el.querySelector('#hcHeritageFooter');
const css=document.createElement('style');css.id='hcHeritageReaderCssV189';
css.textContent=[
'#hcHeritageReader.screen{display:none;flex:1;justify-content:flex-start;align-items:stretch;min-width:0;width:100%;padding:0 0 calc(120px + env(safe-area-inset-bottom,0px));color:#eef4f6}',
'#hcHeritageReader.screen.active{display:flex}',
'#hcHeritageReader *{box-sizing:border-box;min-width:0}',
'#hcHeritageReader button{font:inherit;color:inherit;cursor:pointer}',
'#hcHeritageReader .hc-heritage-header{position:sticky;top:0;z-index:6;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:center;min-height:65px;padding:8px 0;background:#07141e;border-bottom:1px solid #506777}',
'#hcHeritageReader .hc-heritage-header button{min-height:43px;padding:9px 11px;background:#152b37;border:1px solid #748b96;border-radius:8px;font-size:12px}',
'#hcHeritageReader .hc-heritage-header strong{font-size:13px;line-height:1.5;display:block;overflow-wrap:anywhere}',
'#hcHeritageReader .hc-heritage-header small{font-size:10px;color:#b9ccd5;line-height:1.4;display:block}',
'#hcHeritageReader #hcHeritageMain{padding:16px 0;flex:1}',
'#hcHeritageReader .hc-heritage-kicker{font-size:11px;letter-spacing:.08em;color:#c5d5dc;font-weight:700}',
'#hcHeritageReader h1{font-size:clamp(23px,6vw,30px);line-height:1.3;margin:7px 0 13px;overflow-wrap:anywhere}',
'#hcHeritageReader h2{font-size:16px;margin:21px 0 8px;line-height:1.45;overflow-wrap:anywhere}',
'#hcHeritageReader p{font-size:14px;line-height:1.82;color:#d8e5e9;margin:8px 0 16px;overflow-wrap:anywhere}',
'#hcHeritageReader .hc-heritage-list{display:grid;gap:8px;margin:14px 0}',
'#hcHeritageReader .hc-heritage-tile{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 12px;min-height:63px;text-align:left;border:1px solid #4e6875;background:#102734;border-radius:11px}',
'#hcHeritageReader .hc-heritage-tile strong{display:block;font-size:14px;line-height:1.5}',
'#hcHeritageReader .hc-heritage-tile small{display:block;font-size:11px;color:#bed0d7;line-height:1.6;margin-top:5px}',
'#hcHeritageReader .hc-heritage-tile .chev{font-size:19px;color:#c0d0d9}',
'#hcHeritageReader .hc-heritage-when{font-size:11px;color:#bdd0d8;line-height:1.5;display:block;margin-bottom:3px}',
'#hcHeritageReader .hc-heritage-note{border:1px solid #536e7d;background:#152d39;border-radius:9px;padding:13px;margin:13px 0}',
'#hcHeritageReader .hc-heritage-note p{margin:7px 0;color:#f1f4f5}',
'#hcHeritageReader .hc-heritage-sources{display:flex;gap:7px;flex-wrap:wrap;margin:9px 0 19px}',
'#hcHeritageReader a.hc-heritage-source{color:#f2f7f8;border:1px solid #819ba6;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;min-height:40px;padding:9px 10px;font-size:12px;line-height:1.45}',
'#hcHeritageReader #hcHeritageFooter{display:flex;gap:8px;margin:0 0 24px}',
'#hcHeritageReader #hcHeritageFooter button{flex:1;background:#203743;border:1px solid #718995;border-radius:9px;min-height:44px;font-size:12px;padding:9px}',
'#hcHeritageReader #hcHeritageFooter button:disabled{opacity:.36;cursor:default}',
'#hcHeritageReader :is(button,a):focus-visible{outline:2px solid #fff;outline-offset:2px}',
'@media(max-width:370px){#hcHeritageReader .hc-heritage-header{gap:5px}#hcHeritageReader .hc-heritage-header button{font-size:11px;padding:8px}}'
].join('\n');document.head.append(css);
function activeScreen(){return document.querySelector('.screen.active')?.id||'home'}
function showReader(){
 if(typeof show==='function')show('hcHeritageReader');
 else {document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));el.classList.add('active')}
 const context=document.getElementById('topContext');if(context)context.textContent='Knowledge · அறிவு';
}
function hideReader(){
 const dest=document.getElementById(origin)?origin:'home';
 if(typeof show==='function')show(dest);else{el.classList.remove('active');document.getElementById(dest)?.classList.add('active')}
 if(dest==='home'){try{window.scrollTo(0,originY)}catch(_){}}
}
function navigate(level,topic=null,item=null,push=true){
 route={level,topic,item};
 if(push&&typeof history!=='undefined'&&history.pushState){
  try{history.pushState({hcHeritage189:true,sessionNumber,...route},'',location.href)}catch(_){}
 }
 render();
 try{window.scrollTo({top:0,behavior:'instant'})}catch(_){try{window.scrollTo(0,0)}catch(__){}}
}
function open(topic=null,item=null){
 if(activeScreen()!=='hcHeritageReader'){origin=activeScreen();originY=window.scrollY||0;sessionNumber++}
 const valid=topics.some(t=>t[0]===topic);
 showReader();
 navigate(valid?(item?'article':'topic'):'index',valid?topic:null,valid?item:null,true);
}
function backLocal(){
 if(route.level==='article')navigate('topic',route.topic,null,false);
 else if(route.level==='topic')navigate('index',null,null,false);
 else hideReader();
}
function goBack(){
 if(history.state?.hcHeritage189&&history.back)history.back();
 else backLocal();
}
window.addEventListener('popstate',evt=>{
 if(evt.state?.hcHeritage189&&evt.state.sessionNumber===sessionNumber){route={level:evt.state.level||'index',topic:evt.state.topic||null,item:evt.state.item||null};showReader();render();try{window.scrollTo(0,0)}catch(_){}}
 else if(el.classList.contains('active'))hideReader();
});
function render(){
 const group=route.topic,chapter=rows(group),subject=topicLabel(group);
 head.textContent=route.level==='index'?tr('Knowledge Library','அறிவுக் களஞ்சியம்'):subject;
 trail.textContent=route.level==='index'?'HeartClear':route.level==='topic'?tr('All subjects › Subject','அனைத்தும் › தலைப்பு'):tr('Subject › Article','தலைப்பு › கட்டுரை');
 back.querySelector('span').textContent=route.level==='index'?tr('Close','மூடு'):tr('Back','பின்னால்');
 all.hidden=route.level==='index';
 footer.innerHTML='';
 if(route.level==='index'){
  main.innerHTML='<span class="hc-heritage-kicker">HEARTCLEAR · READ</span><h1>'+tr('Human knowledge, across time','மனித அறிவு · காலங்களின் வழியே')+'</h1>'+
  '<p>'+tr('Not only Qur’an. Explore tools, traditions, bodies, families and verified history. Choose a subject to begin.','குர்ஆன் மட்டும் அல்ல. கருவிகள், மரபுகள், உடல், குடும்பம், ஆதாரமுள்ள வரலாறு — ஒரு தலைப்பைத் தேர்ந்தெடுக்கவும்.')+'</p>'+
  '<div class="hc-heritage-list">'+topics.map(t=>'<button type="button" class="hc-heritage-tile" data-topic="'+t[0]+'"><span><strong>'+E(tr(t[1],t[2]))+'</strong><small>'+rows(t[0]).length+' '+tr('articles','கட்டுரைகள்')+'</small></span><span class="chev" aria-hidden="true">›</span></button>').join('')+'</div>'+
  '<p>'+tr('Centuries are shown only when evidence exists. Gaps are not filled with invented history.','ஆதாரம் இருந்தால் மட்டுமே நூற்றாண்டுகள் குறிப்பிடப்படும். தெரியாத இடங்களில் கற்பனைக் கதை இல்லை.')+'</p>';
 }else if(route.level==='topic'){
  if(!chapter.length){navigate('index');return}
  const intro=data[group]?.lead;
  main.innerHTML='<span class="hc-heritage-kicker">'+tr('SUBJECT','தலைப்பு')+'</span><h1>'+E(subject)+'</h1>'+
   (intro?'<p>'+E(tr(intro[0],intro[1]))+'</p>':'<p>'+tr('Read the original text, then consider the reflection separately.','மூல வசனத்தை வாசித்துப் பின்னர் சிந்தனையைத் தனியாகப் பாருங்கள்.')+'</p>')+
   '<div class="hc-heritage-list">'+chapter.map((c,i)=>'<button type="button" class="hc-heritage-tile" data-article="'+E(c.id)+'"><span><span class="hc-heritage-when">'+E(c.era||('Qur’an '+c.ref))+'</span><strong>'+E(chTitle(c))+'</strong><small>'+E(chShort(c))+'</small></span><span class="chev" aria-hidden="true">›</span></button>').join('')+'</div>';
 }else{
  const selected=chapter.find(c=>c.id===route.item);
  if(!selected){navigate('topic',group);return}
  const idx=chapter.indexOf(selected);
  if(group==='quran'){
   main.innerHTML='<span class="hc-heritage-kicker">QUR’AN · '+E(selected.ref)+'</span><h1>'+E(chTitle(selected))+'</h1>'+
    '<h2>'+tr('What the verse discusses','வசனம் கூறுவது')+'</h2><p>'+E(tr(...selected.detail))+'</p>'+
    '<div class="hc-heritage-note"><strong>'+tr('Personal reflection (not Qur’an translation)','தனிச் சிந்தனை (குர்ஆன் மொழிபெயர்ப்பு அல்ல)')+'</strong><p>'+E(tr(...selected.reflection))+'</p></div>'+
    '<h2>'+tr('Original source','மூல ஆதாரம்')+'</h2><div class="hc-heritage-sources">'+href(selected.source)+'</div>';
  }else{
   main.innerHTML='<span class="hc-heritage-kicker">'+E(selected.era)+' · '+E(selected.place)+'</span><h1>'+E(chTitle(selected))+'</h1>'+
    '<p>'+E(chShort(selected))+'</p><h2>'+tr('History and context','வரலாறும் பின்னணியும்')+'</h2><p>'+E(tr(...selected.details))+'</p>'+
    '<h2>'+tr('Why it matters','ஏன் இது முக்கியம்')+'</h2><p>'+E(tr(...selected.meaning))+'</p>'+
    '<div class="hc-heritage-note"><strong>'+tr('Think or apply','சிந்தித்து செயல்படுத்து')+'</strong><p>'+E(tr(...selected.apply))+'</p></div>'+
    '<h2>'+tr('Sources · further reading','ஆதாரம் · மேலதிக வாசிப்பு')+'</h2><div class="hc-heritage-sources">'+(selected.refs?.length?selected.refs.map(href).join(''):'<p>'+tr('Family/practical account; no independent century claim.','குடும்ப/நடைமுறை அறிவு; ஆதாரமின்றி நூற்றாண்டு குறிப்பிடப்படவில்லை.')+'</p>')+'</div>';
  }
  footer.innerHTML='<button type="button" id="hcArticlePrev"'+(idx===0?' disabled':'')+'>'+tr('← Previous','← முந்தையது')+'</button><button type="button" id="hcArticleNext"'+(idx===chapter.length-1?' disabled':'')+'>'+tr('Next →','அடுத்து →')+'</button>';
  footer.querySelector('#hcArticlePrev').addEventListener('click',()=>{if(idx>0)navigate('article',group,chapter[idx-1].id)});
  footer.querySelector('#hcArticleNext').addEventListener('click',()=>{if(idx<chapter.length-1)navigate('article',group,chapter[idx+1].id)});
 }
 main.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>navigate('topic',b.dataset.topic)));
 main.querySelectorAll('[data-article]').forEach(b=>b.addEventListener('click',()=>navigate('article',group,b.dataset.article)));
}
back.addEventListener('click',goBack);
all.addEventListener('click',()=>navigate('index'));
const launcher=document.getElementById('hcDeepHeritageV185');
launcher?.addEventListener('click',()=>open());
const grid=document.querySelector('#library .hub-grid');
if(grid&&!document.getElementById('hcHeritageLibraryEntry')){
 const item=document.createElement('button');item.type='button';item.className='hub-card';item.id='hcHeritageLibraryEntry';
 item.innerHTML='<span class="hub-icon">⌛</span><span><b>Human Knowledge · மரபு அறிவு</b><small>History · body · Qur’an · Tamil and English</small></span><span class="hub-arrow">›</span>';
 item.addEventListener('click',()=>open());grid.append(item);
}
window.HCHeritageReader={open,back:goBack};
render();
})();