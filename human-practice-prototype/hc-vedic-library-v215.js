/* HeartClear Vedic Heritage Library v215.
   Source-led, original-language samples, new Tamil/English explanations.
   No re-created scriptures, scraped copyrighted translations or pseudo-chant audio.
   External references open their real custodial collections; the rest is an
   honestly labelled catalog, not a claim of full offline verses. */
(function(){
'use strict';
const shelf=document.getElementById('hcHinduScriptures'),map=document.getElementById('hcHinduTraditions');
if(!shelf||!map||document.getElementById('hcVedicLibraryV215'))return;
const SOURCES={
 vedas:'https://vedicheritage.gov.in/Samhitas/',
 rig:'https://vedicheritage.gov.in/samhitas/rigveda/shakala-samhita/',
 rig1:'https://vedicheritage.gov.in/samhitas/rigveda/shakala-samhita/mandal-01/',
 rigverse:'https://www.vedicsamhita.in/vedas/rigveda/1/1',
 sama:'https://vedicheritage.gov.in/Samhitas/',
 yajur:'https://vedicheritage.gov.in/Samhitas/',
 athar:'https://vedicheritage.gov.in/samhitas/atharvaveda-samhitas/shaunaka-samhita/',
 athar1:'https://vedicheritage.gov.in/hi/samhitas/atharvaveda-samhitas/shaunaka-samhita/kanda-01-sukta-001/',
 upa:'https://vedicheritage.gov.in/upanishads/',
 isha:'https://vedicheritage.gov.in/upanishads/ishavasyopanishad/',
 gita:'https://heritage.iitk.ac.in/SBG/2.47',
 charaka:'https://niimh.nic.in/ebooks/ecaraka/?con=pro&mod=home',
 sushruta:'https://niimh.nic.in/ebooks/esushruta/index.php/um/um/?con=pro&mod=home',
 vagbhata:'https://ayusoft.ayush.gov.in/introduction-to-ashtaanga-hridaya/',
 ayur:'https://nia.nic.in/pdf/TERMINOLOGIES.pdf',
 siddha:'https://ccrs.ayush.gov.in/Indexes/Siddha_Medicine',
 siddhaTamil:'https://www.tnmgrmu.ac.in/departments/siddha/about-us/',
 evidence:'https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth'
};
const passage=(ref,sa,en,ta,source,note)=>({ref,sa,en,ta,source,note});
const library=[
 {id:'vedas',name:'Four Vedas',ta:'நான்கு வேதங்கள்',detail:'Four transmitted Vedic traditions; each has its own textual divisions and recensions.',detailTa:'நான்கு வேத மரபுகளிலும் நூல் பிரிவுகளும் பல்வேறு பாடமுறைகளும் உள்ளன.',source:SOURCES.vedas,children:[
  {id:'rigveda',name:'Rigveda',ta:'ரிக் வேதம்',detail:'Śākala arrangement: 10 mandalas, 1,028 hymns. Hymns contain individual mantras.',detailTa:'சாகல மரபு: 10 மண்டலங்கள், 1,028 சூக்தங்கள். ஒவ்வொரு சூக்தத்திலும் மந்திரங்கள் உள்ளன.',source:SOURCES.rig,children:Array.from({length:10},(_,i)=>({id:'rig'+(i+1),name:'Mandala '+(i+1),ta:'மண்டலம் '+(i+1),detail:i===0?'Hymn 1 invokes Agni. Nine verses in this hymn.':'Browse the original collection to study hymns in this mandala.',detailTa:i===0?'முதல் சூக்தம் அக்னியைப் பற்றியது; அதில் ஒன்பது மந்திரங்கள் உள்ளன.':'இந்த மண்டலத்தின் பாடல்களை அசல் தொகுப்பில் படிக்கலாம்.',source:i===0?SOURCES.rig1:SOURCES.rig,
   passages:i===0?[passage('Rigveda 1.1.1','अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् । होता॑रं रत्न॒धात॑मम् ॥','The hymn praises Agni as the divine priest of the ritual, who brings offerings and is associated with valuable gifts.','இந்த மந்திரம் அக்னியை வேள்வியின் தெய்வீக புரோகிதராகவும் காணிக்கையை ஏந்துபவராகவும் சிறந்த அருள்களை அளிப்பவராகவும் போற்றுகிறது.',SOURCES.rigverse,'Vedic accented Sanskrit; English and Tamil are original explanatory renderings, not inherited translations.')]:[] }))},
  {id:'samaveda',name:'Samaveda',ta:'சாம வேதம்',detail:'Vedic melodies and recitation. The Kauthuma tradition includes Pūrvārcika and Uttarārcika; other living recensions also exist.',detailTa:'இசையோடு இணைந்த வேதப் பாடல் மரபு. கௌதும மரபில் பூர்வார்ச்சிகம், உத்தரார்ச்சிகம் உள்ளன.',source:SOURCES.sama,children:[
   {id:'sama-purva',name:'Pūrvārcika',ta:'பூர்வார்ச்சிகம்',detail:'Opening collection organised by chant themes. Text and melody should be distinguished.',detailTa:'பாடல்களின் தொடக்கத் தொகுப்பு; சொற்களையும் பாடும் ராக மரபையும் தனியே புரிந்துகொள்ள வேண்டும்.',source:SOURCES.sama},
   {id:'sama-uttara',name:'Uttarārcika',ta:'உத்தரார்ச்சிகம்',detail:'Later collection used in ceremonial singing traditions.',detailTa:'சடங்கு இசை மரபில் பயன்படுத்தப்படும் பின்னைய தொகுப்பு.',source:SOURCES.sama},
   {id:'sama-rec',name:'Recensions / Śākhās',ta:'சாகைகள்',detail:'Kauthuma, Jaiminīya and Rāṇāyanīya. These must not be silently merged into one uniform text.',detailTa:'கௌதுமம், ஜைமினீயம், ராணாயனீயம். வேறுபாடுகளை ஒன்றாகக் கலந்துவிடக் கூடாது.',source:SOURCES.sama}
  ]},
  {id:'yajurveda',name:'Yajurveda',ta:'யஜுர் வேதம்',detail:'Ritual prose and mantras. White and Black Yajurveda contain distinct textual traditions.',detailTa:'வேள்வி உரைகளும் மந்திரங்களும் உள்ள மரபு; சுக்லம், கிருஷ்ணம் ஆகிய இரு வேறுபட்ட தொகுப்புகள் உள்ளன.',source:SOURCES.yajur,children:[
   {id:'yaj-white',name:'Śukla / White Yajurveda',ta:'சுக்ல யஜுர் வேதம்',detail:'Vājasaneyī Madhyandina and Kāṇva recensions.',detailTa:'வாஜசனேயி மாத்யந்தினம், காண்வம் என்ற இரு பாடமரபுகள்.',source:SOURCES.yajur},
   {id:'yaj-black',name:'Kṛṣṇa / Black Yajurveda',ta:'கிருஷ்ண யஜுர் வேதம்',detail:'Taittirīya, Maitrāyaṇī, Kāṭhaka and Kapiṣṭhala-Kaṭha traditions.',detailTa:'தைத்திரீயம், மைத்ராயணி, காடகம், கபிஷ்டல-காடகம் ஆகிய மரபுகள்.',source:SOURCES.yajur}
  ]},
  {id:'atharvaveda',name:'Atharvaveda',ta:'அதர்வ வேதம்',detail:'Mantras concerning human life, well-being, household concerns and ritual. The Śaunaka and Paippalāda recensions differ.',detailTa:'வாழ்க்கை, குடும்பம், வாழ்வுநலம், சடங்குகள் பற்றிய மந்திரங்கள்; சௌனக, பைப்பலாத மரபுகள் வேறுபடுகின்றன.',source:SOURCES.athar,children:[
   {id:'athar-shaunaka',name:'Śaunaka — 20 Kāṇḍas',ta:'சௌனக மரபு — 20 காண்டங்கள்',detail:'A book-by-book pathway; the complete book texts remain at the custodial archive.',detailTa:'20 காண்டங்களுக்கான வழிகாட்டி; முழு நூல் அசல் காப்பகத்தில்தான் உள்ளது.',source:SOURCES.athar,children:Array.from({length:20},(_,i)=>({id:'athk'+(i+1),name:'Kāṇḍa '+String(i+1).padStart(2,'0'),ta:'காண்டம் '+(i+1),source:i===0?SOURCES.athar1:SOURCES.athar,detail:i===0?'The first hymn concerns speech and knowledge.':'Exact hymn passages need to be verified in this book before they can be shown inside HC.',detailTa:i===0?'முதல் சூக்தம் சொல், அறிவு சார்ந்த வேண்டுதலைக் கொண்டுள்ளது.':'அசல் சூக்தம் சரிபார்க்கப்படாததால் இங்கே புதிய உரை உருவாக்கப்படாது.',
    passages:i===0?[passage('Atharvaveda Śaunaka 1.1.1','ये॑ त्रिषप्ताः प॑रि॒य॑न्ति वि॑श्वा रू॒पाणि॒ बिभ्र॑तः । वा॒चस्प॒तिर्बला॒ तेषां॑ तन्वो॒ अ॒द्य द॑धातु मे ॥१॥','An opening prayer draws on the many forms of existence and calls upon Vācaspati, associated with speech, to grant strength.','உலகின் பல்வேறு வடிவங்களைச் சுட்டி, சொல் மற்றும் அறிவோடு தொடர்புடைய வாசஸ்பதியிடம் வலிமை வேண்டுகிறது.',SOURCES.athar1,'A thematic rendering for learning; consult the source for precise Vedic grammar.')]:[]}))},
   {id:'athar-paippalada',name:'Paippalāda recension',ta:'பைப்பலாத மரபு',detail:'A distinct transmitted version; its readings should be checked separately.',detailTa:'தனி பாடமரபு; இதன் மூல உரைகளை தனியாக சரிபார்க்க வேண்டும்.',source:SOURCES.athar}
  ]}
 ]},
 {id:'upanishads',name:'Upanishads',ta:'உபநிடதங்கள்',detail:'A family of philosophical texts, not one book with a single fixed chapter count. Ten are often treated as principal; larger traditional lists contain 108.',detailTa:'ஒரே புத்தகமல்ல; பல தத்துவ உரையாடல் நூல்கள். பத்து முக்கிய நூல்களாகப் போற்றப்படுகின்றன; சில மரபுப் பட்டியல்களில் 108 உள்ளன.',source:SOURCES.upa,children:[
  ...[['Isha','ஈசா'],['Kena','கேன'],['Katha','கட'],['Prashna','பிரச்ன'],['Mundaka','முண்டக'],['Mandukya','மாண்டூக்ய'],['Taittiriya','தைத்திரீய'],['Aitareya','ஐதரேய'],['Chandogya','சாந்தோக்ய'],['Brihadaranyaka','பிருஹதாரண்யக'],['Shvetashvatara','சுவேதாசுவதர'],['Kaushitaki','கௌஷீதகி'],['Maitrayani','மைத்ராயணி']].map(([en,ta],i)=>({id:'upa'+i,name:en+' Upanishad',ta:ta+' உபநிடதம்',source:i===0?SOURCES.isha:SOURCES.upa,
  detail:i===0?'The opening explores seeing all that moves within a larger whole.':'Read the specific recension and verse numbering at the source archive.',
  detailTa:i===0?'இயங்கும் உலகை ஒரு பெரிய முழுமையின் பின்னணியில் காணும் கருத்தைத் தொடங்குகிறது.':'மூலத்திலுள்ள பாடமரபையும் வசன எண்ணிக்கையையும் சரிபார்த்து படிக்கவும்.',
  passages:i===0?[passage('Isha Upanishad 1 (Kanva recension)','ॐ ई॒शा वा॒स्य॑मि॒द सर्वं॒ यत्किं च॒ जग॑त्यां॒ जग॑त् । तेन॑ त्य॒क्तेन॑ भुञ्जीथा॒ मा गृ॑धः॒ कस्य॑ स्वि॒द्धन॑म् ॥१॥','The verse speaks of a world permeated by the divine and cautions against possessive greed.','உலகமெங்கும் தெய்வீக இருப்பு பரவியுள்ளதாகக் கூறி, பேராசையின்றி வாழ்வதை உணர்த்துகிறது.',SOURCES.isha,'Interpretations differ across Vedānta schools. This is a brief HC explanation, not a definitive commentary.')]:[]} ))
 ]},
 {id:'gita',name:'Bhagavad Gita',ta:'பகவத் கீதை',detail:'18 chapters within the Mahabharata, not a fifth Veda. Existing HeartClear Gita passages and human-voiced recordings are kept separately.',detailTa:'மகாபாரதத்தில் உள்ள 18 அத்தியாயங்களைக் கொண்ட கீதை; ஐந்தாவது வேதம் அல்ல. HC-இல் உள்ள கீதை உரையும் மனிதக் குரல் பதிவுகளும் தனியாகவே இருக்கும்.',source:SOURCES.gita,children:[
  {id:'gita-act',name:'Chapter 2 · Action',ta:'அத்தியாயம் 2 · செயல்',detail:'One existing HC passage, 2.47; full sourced Gita reading is external.',detailTa:'2.47 வசனம் HC-இல் உள்ளது; முழுமையான மூலம் வெளிப்புற காப்பகத்தில் உள்ளது.',source:SOURCES.gita}
 ]},
 {id:'epics',name:'Epics',ta:'இதிகாசங்கள்',detail:'Mahabharata and Ramayana are separate epic literature; their many editions should not be conflated.',detailTa:'மகாபாரதமும் இராமாயணமும் தனி இதிகாசங்கள்; பல உரைப் பதிப்புகளை ஒன்றாகக் கலக்கக் கூடாது.',children:[
  {id:'mahabharata',name:'Mahabharata',ta:'மகாபாரதம்',detail:'Critical-edition and regional traditions require explicit attribution; full chapters are not imported.',detailTa:'மூல பதிப்பும் பிராந்திய மரபும் தனித்தனியாகக் குறிப்பிடப்பட வேண்டும்; முழு உரை சேர்க்கப்படவில்லை.'},
  {id:'ramayana',name:'Ramayana',ta:'இராமாயணம்',detail:'Vālmīki and later regional retellings are not the same text.',detailTa:'வால்மீகி உரையும் பின்னைய தமிழ் உள்ளிட்ட மரபுகளும் ஒரே உரை அல்ல.'}
 ]},
 {id:'puranas',name:'Puranas',ta:'புராணங்கள்',detail:'Multiple narrative and devotional works; the existing Bhagavata passage remains in the older HC scripture section.',detailTa:'பல கதை, பக்தி நூல்கள்; HC-இல் உள்ள பாகவதப் பகுதி பழைய நூலகத்திலேயே இருக்கும்.',children:[
  {id:'bhagavata',name:'Bhagavata Purana',ta:'பாகவத புராணம்',detail:'A sourced excerpt is already in the HeartClear Hindu Scriptures panel.',detailTa:'ஆதாரத்துடன் உள்ள ஒரு பகுதி HC நூலகத்தில் ஏற்கெனவே உள்ளது.'}
 ]},
 {id:'siddha',name:'Tamil Siddha heritage',ta:'தமிழ் சித்த மருத்துவ மரபு',detail:'A distinct Tamil-language knowledge and medical tradition. Study it alongside Ayurveda without claiming the two traditions are the same.',detailTa:'ஆயுர்வேதத்தோடு தொடர்புகள் இருந்தாலும் தனியான தமிழ் அறிவு, வைத்திய மரபு. இரண்டையும் ஒரே நூலாகக் காட்டக்கூடாது.',source:SOURCES.siddha,children:[
  {id:'siddha-vaatham',name:'Vātam · Historical alchemy',ta:'வாதம் · பழைய இரசவாதம்',detail:'Historical study only. No recipes or hazardous chemical/mineral processing.',detailTa:'வரலாற்று அறிவுப் பகுதி மட்டும்; ஆபத்தான ரசாயன தயாரிப்புகளுக்கான வழிமுறை இல்லை.',source:SOURCES.siddha},
  {id:'siddha-vaidhyam',name:'Vaidhyam · Medical tradition',ta:'வைத்தியம் · மருத்துவ மரபு',detail:'Preservation of manuscript knowledge, not directions for treating illnesses.',detailTa:'ஓலைச்சுவடி, நூல் மரபுகளைப் பாதுகாப்பது; நோய்க்கு சுய மருத்துவ அறிவுரை அல்ல.',source:SOURCES.siddhaTamil},
  {id:'siddha-yogam',name:'Yogam · Practice traditions',ta:'யோகம் · பயிற்சி மரபுகள்',detail:'Explore the historical philosophy, teachers and language of yoga. Avoid unverified therapeutic claims.',detailTa:'யோகத்தின் தத்துவம், ஆசிரியர்கள், மரபுச் சொற்கள் பற்றிப் படிக்கலாம்; உறுதியற்ற மருத்துவக் கூற்றுகள் சேர்க்கப்படாது.',source:SOURCES.siddha},
  {id:'siddha-gnanam',name:'Jñānam · Wisdom',ta:'ஞானம் · அறிவு',detail:'Reflections on knowledge, ethics and the inner life. Historical attribution is required before importing verses.',detailTa:'அறிவு, அறம், உள்வாழ்வு பற்றிய சிந்தனை; பாடல் சேர்க்க முன் மூல ஆசிரியர், நூல் சரிபார்க்கப்பட வேண்டும்.',source:SOURCES.siddha}
 ]},
 {id:'ayurveda',name:'Ayurveda · Historical texts',ta:'ஆயுர்வேதம் · பழைய நூல்கள்',detail:'Study classical Indian medical literature as history, language and philosophy. It is not a fifth Veda and is not personalised health advice.',detailTa:'பழைய இந்திய மருத்துவ இலக்கியத்தை வரலாறு, மொழி, தத்துவம் என்ற அடிப்படையில் படிக்கலாம்; இது ஐந்தாவது வேதமல்ல, தனிப்பட்ட மருத்துவ ஆலோசனையும் அல்ல.',source:SOURCES.charaka,children:[
  {id:'charaka',name:'Charaka Samhita',ta:'சரக சம்ஹிதை',detail:'Eight sthānas, 120 chapters in the NIIMH edition. Start with the Sūtra section and follow the verified edition.',detailTa:'NIIMH பதிப்பில் 8 ஸ்தானங்கள், 120 அத்தியாயங்கள். சூத்திர ஸ்தானத்திலிருந்து மூல நூலை வாசிக்கலாம்.',source:SOURCES.charaka,children:[
    ...[['Sūtrasthāna','சூத்திர ஸ்தானம்',30],['Nidānasthāna','நிதான ஸ்தானம்',8],['Vimānasthāna','விமான ஸ்தானம்',8],['Śārīrasthāna','சாரீர ஸ்தானம்',8],['Indriyasthāna','இந்திரிய ஸ்தானம்',12],['Cikitsāsthāna','சிகிச்சை ஸ்தானம்',30],['Kalpasthāna','கல்ப ஸ்தானம்',12],['Siddhisthāna','சித்தி ஸ்தானம்',12]].map(([name,ta,count],i)=>({id:'char'+i,name,ta,detail:count+' chapters. Sanskrit passages have not yet been checked line by line for HC.',detailTa:count+' அத்தியாயங்கள்; HC-க்காக ஒவ்வொரு மூல வரியும் இன்னும் சரிபார்க்கப்படவில்லை.',source:SOURCES.charaka}))
  ]},
  {id:'sushruta',name:'Sushruta Samhita',ta:'சுசுருத சம்ஹிதை',detail:'Classical text with extensive descriptions of anatomy and historical surgical practice. Not a practical treatment manual for untrained readers.',detailTa:'உடலமைப்பு, பழைய அறுவைமுறை பற்றிய நூல்; இதைத் தானாகச் சிகிச்சை செய்யும் வழிகாட்டியாகப் பயன்படுத்தக் கூடாது.',source:SOURCES.sushruta},
  {id:'ashtanga',name:'Ashtanga Hridaya',ta:'அஷ்டாங்க ஹிருதயம்',detail:'Six sthānas; includes Dinacaryā (daily routine) and Ṛtucaryā (seasonal routine) as historical concepts.',detailTa:'ஆறு ஸ்தானங்கள்; தினசர்யை (நாள்தோறும் ஒழுக்கம்), ருதுசர்யை (பருவ ஒழுக்கம்) பற்றிய கருத்துகள் உள்ளன.',source:SOURCES.vagbhata,children:[
    ...[['Sūtra','சூத்திரம்',30],['Śārīra','சாரீரம்',6],['Nidāna','நிதானம்',16],['Cikitsā','சிகிச்சை',22],['Kalpa','கல்பம்',6],['Uttara','உத்தரம்',40]].map(([name,ta,count],i)=>({id:'ashta'+i,name:name+' Sthāna',ta:ta+' ஸ்தானம்',detail:count+' chapters. Read the preserved source before making a translation.',detailTa:count+' அத்தியாயங்கள். மொழிபெயர்ப்புக்கு முன் மூல உரை சரிபார்க்கப்பட வேண்டும்.',source:SOURCES.vagbhata}))
  ]},
  {id:'ayur-life',name:'Daily life & seasons',ta:'தினசரி வாழ்வும் பருவங்களும்',detail:'Explore food rhythms, sleep, daily routines and seasonal observation as cultural history. Compare traditional ideas with current evidence.',detailTa:'உணவு, தூக்கம், அன்றாட ஒழுக்கம், பருவக் கவனிப்பு ஆகியவற்றைப் பண்பாட்டு வரலாறாகப் புரிந்து, இன்றைய ஆய்வுகளோடு ஒப்பிடலாம்.',source:SOURCES.vagbhata},
  {id:'ayur-herbs',name:'Plants and inherited knowledge',ta:'மூலிகைகளும் மரபு அறிவும்',detail:'Record local names, regional variations and botanical identification. Do not assume a traditional remedy is proven safe or effective.',detailTa:'உள்ளூர் பெயர், இன வேறுபாடு, தாவர அடையாளம் ஆகியவற்றை பதிவு செய்யலாம்; மரபு வைத்தியம் பாதுகாப்பானது என முன்கூட்டியே கருத முடியாது.',source:SOURCES.evidence},
  {id:'ayur-more',name:'Other surviving compendia',ta:'மற்ற பழைய மருத்துவ நூல்கள்',detail:'Kāśyapa Samhita, Aṣṭāṅga Saṅgraha, Bhāvaprakāśa and later works. Reliable public full texts and translated rights still need checking.',detailTa:'காச்யப சம்ஹிதை, அஷ்டாங்க சங்கிரகம், பாவபிரகாசம் மற்றும் பின்னைய நூல்கள். முழு பதிப்புகளும் உரிமைகளும் இன்னும் சரிபார்க்கப்பட வேண்டும்.',source:SOURCES.charaka}
 ]}
];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const find=(id,nodes=library,path=[])=>{for(const x of nodes){if(x.id===id)return {node:x,path:[...path,x]};const child=x.children&&find(id,x.children,[...path,x]);if(child)return child;}return null};
const flatten=(nodes=library,out=[])=>{nodes.forEach(n=>{out.push(n);if(n.children)flatten(n.children,out)});return out};
const all=flatten();
let selected=null,searchMode=false;
const root=document.createElement('section');root.id='hcVedicLibraryV215';root.hidden=true;
root.setAttribute('aria-label','Verified Vedic and Ayurveda study reader');
map.after(root);
const st=document.createElement('style');st.id='hcVedicStylesV215';
st.textContent=[
'#hcVedicLibraryV215{border:1px solid #536d79;border-radius:17px;margin:10px 0 18px;background:#091b24;color:#f5f8f7;padding:14px 12px}',
'#hcVedicLibraryV215[hidden]{display:none!important}',
'#hcVedicLibraryV215 *{box-sizing:border-box}',
'#hcVedicLibraryV215 .hcv-top{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:9px}',
'#hcVedicLibraryV215 .hcv-top button{font-size:14px;min-height:43px;padding:8px 14px;background:#1f3541;color:#fff;border:1px solid #718691;border-radius:12px}',
'#hcVedicLibraryV215 .hcv-top button:disabled{opacity:.35}',
'#hcVedicLibraryV215 .hcv-kicker{display:block;color:#b8c7cd;font-size:13px;margin:2px 0 8px}',
'#hcVedicLibraryV215 h3{font-size:23px;line-height:1.35;overflow-wrap:anywhere;margin:6px 0}',
'#hcVedicLibraryV215 h3 small{display:block;font-size:18px;color:#d8e6e8;font-weight:500}',
'#hcVedicLibraryV215 p{font-size:16px;line-height:1.65;color:#d9e6e8;margin:8px 0}',
'#hcVedicLibraryV215 .hcv-sub{color:#b9cad1}',
'#hcVedicLibraryV215 .hcv-list{display:grid;gap:8px;margin:14px 0}',
'#hcVedicLibraryV215 .hcv-item{background:#1a313d;border:1px solid #597786;border-radius:15px;padding:14px 12px;min-height:75px;color:#fff;text-align:left;width:100%;font:inherit;cursor:pointer}',
'#hcVedicLibraryV215 .hcv-item b{font-size:18px;display:block}',
'#hcVedicLibraryV215 .hcv-item span{font-size:15px;color:#cfdee3;display:block;margin-top:3px}',
'#hcVedicLibraryV215 .hcv-item small{font-size:12px;color:#aec0c7;display:block;margin-top:6px}',
'#hcVedicLibraryV215 .hcv-label{display:block;font-size:14px;color:#cbdbe1;margin:10px 0 5px}',
'#hcVedicLibraryV215 input[type=search]{font-size:18px;min-height:54px;background:#102a36;color:#fff;border:1px solid #758f9b;border-radius:12px;padding:10px 13px;width:100%}',
'#hcVedicLibraryV215 .hcv-passage{border-top:1px solid #4f6672;padding-top:15px;margin:17px 0}',
'#hcVedicLibraryV215 .hcv-passage b{display:block;font-size:16px}',
'#hcVedicLibraryV215 .hcv-original{white-space:pre-line;font-size:22px;line-height:1.85;color:#f6eacb;background:#17303a;border-radius:13px;padding:16px 12px;margin:8px 0;overflow-wrap:anywhere}',
'#hcVedicLibraryV215 .hcv-note{font-size:13px;color:#aebfc7}',
'#hcVedicLibraryV215 a{color:#d6ecff;font-size:15px;display:inline-block;margin:10px 0;overflow-wrap:anywhere;text-decoration:underline}',
'#hcVedicLibraryV215 .hcv-safety{border-top:1px solid #445965;padding-top:14px;color:#e1e7e7;margin-top:18px}',
'#hcVedicLibraryV215 :is(button,input,a):focus-visible{outline:3px solid #fff;outline-offset:2px}',
'#hcHinduTraditions .hcv-map-open{display:block;text-align:left;width:100%;min-height:42px;font:inherit;font-size:13px;padding:9px 12px;margin:8px 0 0;border:1px solid #77909c;border-radius:10px;background:#1e3c49;color:#fff}',
].join('\n');document.head.append(st);
const btn=document.createElement('button');btn.type='button';btn.className='hcv-map-open';
btn.textContent='Open Vedic & Ayurveda Library / வேதம் · ஆயுர்வேதம்';
map.append(btn);
function activate(id=null){
 root.hidden=false;selected=id;searchMode=false;draw();
 root.scrollIntoView({block:'start',behavior:'smooth'});
}
btn.addEventListener('click',()=>activate(null));
// The information rows in the existing tradition map become real, keyboard-friendly links.
const targets=['gita','vedas','upanishads','epics','puranas','ayurveda'];
[...map.children].filter(e=>e.tagName==='DIV').forEach((div,i)=>{
 const jump=document.createElement('button');jump.type='button';jump.className='hcv-map-open';
 jump.textContent='Explore / திறக்கவும் →';
 jump.setAttribute('aria-label','Explore '+(div.querySelector('b')?.textContent||targets[i]));
 jump.addEventListener('click',()=>activate(targets[i]||null));div.append(jump);
});
function card(item){
 const b=document.createElement('button');b.type='button';b.className='hcv-item';
 b.innerHTML='<b>'+esc(item.name)+'</b><span lang="ta">'+esc(item.ta||'')+'</span>'+
  (item.detail?'<small>'+esc(item.detail.slice(0,110))+'</small>':'');
 b.addEventListener('click',()=>activate(item.id));return b;
}
function sourceLink(parent,url,text){
 if(!url)return;const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text||'Read verified source ↗';parent.append(a);
}
function paragraph(parent,text,cls,lang){
 if(!text)return;const p=document.createElement('p');p.className=cls||'';if(lang)p.lang=lang;p.textContent=text;parent.append(p);
}
function draw(){
 root.replaceChildren();if(root.hidden)return;
 const state=selected?find(selected):null,node=state?.node,path=state?.path||[];
 const header=document.createElement('div');header.className='hcv-top';
 const back=document.createElement('button');back.type='button';back.textContent='← Back';back.disabled=!selected&&!searchMode;
 back.addEventListener('click',()=>{if(searchMode){searchMode=false;selected=null;}else selected=path.length>1?path[path.length-2].id:null;draw();});
 const home=document.createElement('button');home.type='button';home.textContent='⌂ Library home';home.addEventListener('click',()=>{selected=null;searchMode=false;draw();});
 header.append(back,home);root.append(header);
 const crumb=document.createElement('span');crumb.className='hcv-kicker';crumb.textContent=path.length?path.map(x=>x.name).join(' / '):'HERITAGE / மரபு';root.append(crumb);
 const heading=document.createElement('h3');heading.innerHTML=esc(node?.name||'Vedic Heritage & Ayurveda')+'<small lang="ta">'+esc(node?.ta||'வேத மரபும் ஆயுர்வேதமும்')+'</small>';root.append(heading);
 paragraph(root,node?.detail||'Choose one collection. Open one book at a time. Original Sanskrit is shown only when the referenced passage has been checked.');
 paragraph(root,node?.detailTa||'ஒரு தொகுப்பைத் தேர்ந்தெடுக்கவும். சரிபார்க்கப்பட்ட மூல சமஸ்கிருதம் மட்டுமே அசலாகக் காட்டப்படும்.','hcv-sub','ta');
 if(!node){
  const label=document.createElement('label');label.className='hcv-label';label.textContent='Search names / பெயர் தேடல்';label.htmlFor='hcVedicSearch';root.append(label);
  const input=document.createElement('input');input.id='hcVedicSearch';input.type='search';input.placeholder='Rigveda, Upanishad, தினசரி…';root.append(input);
  const result=document.createElement('div');result.className='hcv-list';root.append(result);
  function results(){
   const v=input.value.toLocaleLowerCase().trim();
   const shown=v?all.filter(x=>(x.name+' '+(x.ta||'')+' '+(x.detail||'')).toLocaleLowerCase().includes(v)).slice(0,30):library;
   result.replaceChildren();
   if(!shown.length)paragraph(result,'No matching title in the current catalog. The missing text has not been invented. / இப்போதைய தொகுப்பில் காணப்படவில்லை.');
   shown.forEach(x=>result.append(card(x)));
  }
  input.addEventListener('input',results);results();
 }else{
  if(node.children?.length){
   const list=document.createElement('div');list.className='hcv-list';node.children.forEach(x=>list.append(card(x)));root.append(list);
  }
  if(node.passages?.length){
   node.passages.forEach(p=>{
    const container=document.createElement('section');container.className='hcv-passage';
    const title=document.createElement('b');title.textContent=p.ref;container.append(title);
    const original=document.createElement('div');original.className='hcv-original';original.lang='sa';original.textContent=p.sa;container.append(original);
    paragraph(container,'English meaning · HC explanation','hcv-label');paragraph(container,p.en,'');
    paragraph(container,'தமிழ் விளக்கம் · HC உரை','hcv-label');paragraph(container,p.ta,'','ta');
    paragraph(container,p.note,'hcv-note');sourceLink(container,p.source,'Compare with original Sanskrit ↗');
    root.append(container);
   });
  }else if(!node.children?.length){
   paragraph(root,'Verified full Sanskrit and bilingual verse-by-verse interpretation have not yet been imported for this section. Follow the original archive; no text is invented here.','hcv-note');
   paragraph(root,'இப்பிரிவின் முழு சமஸ்கிருதமும் தமிழ்–ஆங்கில வசன விளக்கங்களும் இன்னும் இணைக்கப்படவில்லை. மூல ஆதாரத்தைப் பார்க்கவும்.','hcv-note','ta');
  }
  sourceLink(root,node.source,'Open source archive / மூல நூலைத் திறக்க ↗');
  if(['ayurveda','siddha'].includes(node.id)||path.some(x=>['ayurveda','siddha'].includes(x.id))){
   const safety=document.createElement('div');safety.className='hcv-safety';
   paragraph(safety,'Historical medical descriptions are not proof of modern effectiveness. Do not use old preparations, metal/mineral recipes or procedures as self-treatment.','hcv-note');
   paragraph(safety,'பழைய வைத்தியக் குறிப்புகள் இன்றைய சிகிச்சையாகச் சரிபார்க்கப்பட்டவை அல்ல; தானாக மருந்து அல்லது மருத்துவ நடைமுறைகளை முயற்சிக்க வேண்டாம்.','hcv-note','ta');
   sourceLink(safety,SOURCES.evidence,'Current evidence and safety — NIH ↗');root.append(safety);
  }
 }
 const foot=document.createElement('p');foot.className='hcv-note';foot.textContent='Study status: selected original excerpts verified; other entries are structured source pathways, not complete imported editions. No synthetic scripture recitation.';root.append(foot);
}
draw();
})();
