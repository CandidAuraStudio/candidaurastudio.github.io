/* HeartClear v185 — Centuries, Qur'an and family wisdom.
 * The historical index contains documented milestones, NOT a complete uninterrupted timeline.
 * Original English and Tamil summaries; preserve each text and distinguish health claims.
 * No fake narration, no external API, no login, and no medical treatment instructions.
 */
(function(){
'use strict';
const home=document.getElementById('home'),care=document.getElementById('hcEverydayCareV182');
if(!home||!care||document.getElementById('hcDeepHeritageV185'))return;
const KEY='hcDeepHeritageV185',LINK_ALLOWED=/^https:\/\/(?:www\.)?(?:ada\.org|www\.ada\.org|loc\.gov|www\.loc\.gov|americanhistory\.si\.edu|www\.americanhistory\.si\.edu|metmuseum\.org|www\.metmuseum\.org|quran\.com|legacy\.quran\.com|sunnah\.com|pmc\.ncbi\.nlm\.nih\.gov|pubmed\.ncbi\.nlm\.nih\.gov|aad\.org|www\.aad\.org|cdc\.gov|www\.cdc\.gov|corpus\.quran\.com|cambridge\.org|www\.cambridge\.org)\//;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state={topic:'teeth',selected:'teeth-600',lang:'ta'};
try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x&&typeof x==='object'){if(['teeth','water','food','hair','quran'].includes(x.topic))state.topic=x.topic;if(x.lang==='en')state.lang='en';if(typeof x.selected==='string')state.selected=x.selected}}catch(_){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(_){}};
const T=(en,ta)=>state.lang==='ta'?ta:en;
const S=(label,url)=>({label,url});
const sources={
 adaHistory:S('American Dental Association · dental history','https://www.ada.org/resources/ada-library/dental-history'),
 loc:S('Library of Congress · toothbrush history','https://www.loc.gov/everyday-mysteries/browse-all-questions/item/who-invented-the-toothbrush-and-when-was-it-invented/'),
 museum:S('Smithsonian · brush with history','https://www.americanhistory.si.edu/explore/stories/brush-history'),
 museumNylon:S('Smithsonian · oral care collection','https://www.americanhistory.si.edu/collections/object-groups/health-hygiene-and-beauty/oral-care'),
 charcoal:S('Gudalur field research · PMC','https://pmc.ncbi.nlm.nih.gov/articles/PMC7617662/'),
 whitening:S('ADA · charcoal research','https://www.ada.org/resources/ada-library/oral-health-topics/whitening'),
 paste:S('ADA · toothpaste science','https://www.ada.org/resources/ada-library/oral-health-topics/toothpastes'),
 qWudu:S("Qur'an · 5:6",'https://quran.com/5/6'),
 qFood:S("Qur'an · 7:31",'https://quran.com/7/31'),
 qLook:S("Qur'an · 80:24",'https://quran.com/80/24'),
 qHoney:S("Qur'an · 16:69",'https://quran.com/16/69'),
 islamicStudy:S('History of oral hygiene in Islamic law · PubMed','https://pubmed.ncbi.nlm.nih.gov/23409533/'),
 siwakStudy:S('Medieval siwak history · Cambridge','https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/abs/siwak-a-medieval-islamic-contributionto-dental-care/1429960CE3B005E027DC30A630F5988A'),
 baths:S('Metropolitan Museum · history of hammams','https://www.metmuseum.org/ja/essays/baths-and-bathing-culture-in-the-middle-east-the-hammam'),
 fluoride:S('CDC · 1945 water-fluoridation history','https://www.cdc.gov/fluoridation/timeline-for-community-water-fluoridation/index.html'),
 hair:S('American Academy of Dermatology · grey hair','https://www.aad.org/public/everyday-care/hair-scalp-care/hair/gray-hair-causes')
};
const row=(id,era,place,title,summary,details,meaning,apply,refs)=>({id,era,place,title,summary,details,meaning,apply,refs});
const data={
 teeth:{
  name:['Teeth · materials & beliefs','பற்கள் · மரபும் மாற்றமும்'],
  lead:['A cleaning habit travelled across cultures. Each record is a dated clue, not proof that every community used the same method.','பல் சுத்தம் பல பண்பாடுகளில் மாறி வந்தது. ஒவ்வொரு பதிவும் காலத்தின் சான்று; எல்லோரும் ஒரே முறையைப் பின்பற்றினர் என்பதல்ல.'],
  rows:[
   row('teeth-ancient','Before 1000 BCE','Ancient communities / பண்டைய உலகம்',
    ['A twig before the toothbrush','பிரஷுக்கு முன் மரக்குச்சி'],
    ['Chewed, frayed sticks were used for cleaning teeth long before modern brushes.','நவீன பிரஷுக்கு மிக முன்பே முனை நாராகிய மரக்குச்சிகள் பல் சுத்தம் செய்யப் பயன்படுத்தப்பட்டன.'],
    ['Archaeological and historical accounts describe early chew sticks. The exact plants, dates and methods differed by place; they were not one invention by one people.','பண்டைய மரக்குச்சிகள் பற்றிய வரலாற்று சான்றுகள் உள்ளன. மரம், காலம், பயன்பாடு இடத்திற்கேற்ப மாறியது; ஒருவரின் ஒரே கண்டுபிடிப்பு அல்ல.'],
    ['A simple tool may carry knowledge, but its age alone does not prove it works better.','ஒரு எளிய கருவியில் மரபு அறிவு இருக்கலாம்; பழமையானது என்பதால் சிறந்தது என்று நிரூபிக்கப்படாது.'],
    ['Ask an elder which plant they actually used, where it grew and how they learned. Record it as family testimony.','பெரியவரிடம் எந்த மரக்குச்சி, எங்கு வளர்ந்தது, யார் கற்றுத் தந்தார் எனக் கேட்டு குடும்ப நினைவாகப் பதிவு செய்யவும்.'],[sources.loc,sources.adaHistory]),
   row('teeth-600','600s CE','Arabia / அரேபியா',
    ['Siwak and Qur’anic purification: separate histories','மிஸ்வாக் மற்றும் குர்ஆனின் தூய்மை: தனி மரபுகள்'],
    ['Siwak is a historical tooth-cleaning twig. Qur’an 5:6 concerns purification for prayer; it does not name siwak.','மிஸ்வாக் பழமையான பல் சுத்தக் குச்சி. குர்ஆன் 5:6 தொழுகைக்கு முன் தூய்மையைப் பற்றியது; மிஸ்வாக் என்ற பெயர் இல்லை.'],
    ['Different oral-care tools existed in several cultures. Keep the documented history of siwak separate from what the Qur’anic verse actually says. No extra religious report is presented as a Qur’anic explanation.','பல்வேறு பண்பாடுகளில் பல பல் சுத்தக் கருவிகள் இருந்தன. மிஸ்வாக் வரலாற்றையும் குர்ஆன் வசனம் உண்மையில் சொல்வதையும் தனித்தனியாகக் காட்டுவோம்.'],
    ['Respect sacred text without attributing other sources to it.','வேறு மூலத்தை குர்ஆனின் சொற்களாக மாற்றாமல் மதிப்போம்.'],
    ['Read Qur’an 5:6 for its own meaning; study the twig’s history separately.','குர்ஆன் 5:6 இன் பொருளை வாசித்து மரக்குச்சியின் வரலாற்றைத் தனியாக அறியவும்.'],[sources.qWudu,sources.siwakStudy]),
   row('teeth-1400','1400s CE','China / சீனா',
    ['A different tool: bristles on a handle','வேறொரு கருவி: கைப்பிடியுடன் முட்கள்'],
    ['A Chinese source describes an early bristle toothbrush associated with 1498.','1498 ஆம் ஆண்டுடன் தொடர்புடைய முட்கள் கொண்ட பல் பிரஷை சீன வரலாற்று ஆதாரம் குறிப்பிடுகிறது.'],
    ['The historic brush used stiff animal hair attached to a handle. This was different from frayed twig traditions. Later travellers, trade and manufacturers spread different brush designs.','பழைய பிரஷில் கைப்பிடியில் விலங்கு முட்கள் பொருத்தப்பட்டிருந்தன; இது மரக்குச்சி முறையிலிருந்து வேறுபட்டது. பின்னர் வணிகம், பயணம், உற்பத்தி மூலம் வடிவங்கள் பரவின.'],
    ['“First toothbrush” depends on whether we mean a twig or a bristle brush.','“முதல் பிரஷ்” என்பது மரக்குச்சியையா, முட்கள் கொண்ட பிரஷையா குறிக்கிறோம் என்பதில் மாறும்.'],
    ['Compare illustrations from a museum rather than assuming all historic tools were identical.','அனைத்தும் ஒரே கருவி என்று நினைக்காமல் அருங்காட்சியகப் படங்களை ஒப்பிடுங்கள்.'],[sources.adaHistory,sources.loc]),
   row('teeth-1700','1700s CE','Britain / பிரிட்டன்',
    ['The brush becomes a manufactured object','பிரஷ் வணிகப் பொருளாக மாறியது'],
    ['William Addis is linked with toothbrush production in the late eighteenth century.','18ஆம் நூற்றாண்டின் இறுதியில் வில்லியம் அடிஸ் பல் பிரஷ் தயாரிப்புடன் தொடர்புபடுத்தப்படுகிறார்.'],
    ['The history here is not that people suddenly discovered clean teeth. It is about producing a repeatable object for more buyers instead of relying only on local handmade materials.','இங்கு மக்கள் திடீரென பல் சுத்தத்தைக் கண்டுபிடித்தார்கள் என்பதல்ல. உள்ளூர் கைவேலை கருவிகளைத் தாண்டி பலருக்கும் ஒரே மாதிரியான பொருளை உற்பத்தி செய்த மாற்றம்.'],
    ['Manufacturing changed availability; it did not erase older knowledge.','தொழிற்துறை கிடைப்பை மாற்றியது; பழைய அறிவை முழுமையாக அழிக்கவில்லை.'],
    ['Ask what was locally available before modern shops.','நவீன கடைகளுக்கு முன் உள்ளூரில் என்ன இருந்தது எனக் கேளுங்கள்.'],[sources.loc]),
   row('teeth-1800','1800s CE','Europe & North America / ஐரோப்பா, வட அமெரிக்கா',
    ['Tooth powder, paste and commercial supply','பற்பொடி, பற்பசை, வணிக உற்பத்தி'],
    ['Dental mixtures began moving from local preparation to wider commercial sale.','உள்ளூரில் தயாரித்த பல் சுத்தப் பொருட்கள் வணிக விற்பனைக்கு மாறத் தொடங்கின.'],
    ['Earlier dental powders varied greatly. During the nineteenth century, prepared dentifrices became more commonly sold and promoted. A familiar brand today does not establish that every old recipe was ineffective, or safe.','முன்னைய பற்பொடிகள் பல வகை. 19ஆம் நூற்றாண்டில் தயாரான பல் சுத்தப் பொருட்கள் அதிகமாக விற்கப்பட்டன. இன்று பிரபலமான பொருள் இருப்பதால் பழையவை அனைத்தும் பயனற்றவை அல்லது பாதுகாப்பானவை என்று சொல்ல முடியாது.'],
    ['Learn to separate advertising claims from the material history.','விளம்பரக் கூற்றுகளையும் பொருட்களின் வரலாற்றையும் பிரித்தறியலாம்.'],
    ['Examine a museum label and a family memory side by side.','அருங்காட்சியகக் குறிப்பையும் குடும்ப நினைவையும் ஒப்பிடுங்கள்.'],[sources.adaHistory,sources.museum]),
   row('teeth-1900','1900s CE','International / உலகளவில்',
    ['1938 nylon bristles; 1945 fluoridated water','1938 நைலான் முட்கள்; 1945 ஃப்ளூரைடு நீர்'],
    ['In 1938, nylon toothbrush bristles appeared. Grand Rapids began a major water-fluoridation project in 1945.','1938 இல் நைலான் முட்கள் கொண்ட பிரஷ் வந்தது; 1945 இல் கிராண்ட் ரேபிட்ஸ் நகரில் நீரில் ஃப்ளூரைடு சேர்க்கும் திட்டம் தொடங்கியது.'],
    ['Nylon changed brush materials, while public-health studies investigated fluoride and tooth decay. These were separate developments. Water fluoridation levels and evidence should not be confused with rumours that ordinary fluoride toothpaste “dissolves” teeth.','நைலான் பிரஷின் பொருளை மாற்றியது; ஃப்ளூரைடு பற்சிதைவை எப்படி பாதிக்கிறது எனப் பொதுச் சுகாதார ஆய்வுகள் பார்த்தன. இரண்டும் தனித்த முன்னேற்றங்கள். சாதாரண ஃப்ளூரைடு பற்பசை பற்களை “கரைக்கும்” என்ற கூற்றுடன் இவற்றை குழப்ப வேண்டாம்.'],
    ['A modern practice can be evaluated with research, not only popularity.','நவீன வழக்கத்தையும் பிரபலத்தால் மட்டும் அல்லாமல் ஆய்வுகளால் மதிப்பிடலாம்.'],
    ['Use a soft brush and suitable fluoride toothpaste; see linked evidence.','மென்மையான பிரஷும் ஏற்ற ஃப்ளூரைடு பற்பசையும் பயன்படுத்துங்கள்; ஆதாரத்தை வாசிக்கலாம்.'],[sources.museumNylon,sources.fluoride,sources.paste]),
   row('teeth-2020','2000s–2020s','Gudalur, South India / கூடலூர், தென்னிந்தியா',
    ['A living memory: eucalyptus and teak charcoal','இன்றும் பதிவாகிய நினைவு: யூகலிப்டஸ், தேக்கு கரி'],
    ['Researchers recorded earlier charcoal tooth-powder use among specific Adivasi communities.','சில ஆதிவாசி சமூகங்களில் முன்பு கரித்தூள் பற்பொடி வழக்கம் இருந்ததாக ஆய்வாளர்கள் பதிவு செய்துள்ளனர்.'],
    ['The field study names Nilagiri (eucalyptus) and Thega (teak) firewood as historic charcoal sources. It describes changing habits in recent decades. It does not prove that all Tamil households used those woods, or that recreating the powder is safe.','கூடலூர் ஆய்வில் நிலகிரி (யூகலிப்டஸ்), தேகா (தேக்கு) விறகு கரித்தூள் பற்றி பதிவு உள்ளது. சில தசாப்தங்களில் வழக்கம் மாறியதையும் சொல்கிறது. எல்லா தமிழர் வீடுகளும் இதையே செய்தன என்றோ, அந்தப் பொடியை மீண்டும் தயாரிப்பது பாதுகாப்பானது என்றோ நிரூபிக்கவில்லை.'],
    ['Oral testimony matters — but traditional use is not evidence of safety.','வாய்மொழி வரலாறு முக்கியம்; பாரம்பரிய பயன்பாடு பாதுகாப்புக்கு ஆதாரம் அல்ல.'],
    ['Document the story, not a homemade charcoal-burning or tooth-scrubbing tutorial.','வரலாற்றைப் பதிவு செய்யுங்கள்; வீட்டில் கரி தயாரித்து பற்களைத் தேய்க்கும் வழிமுறையாக அல்ல.'],[sources.charcoal,sources.whitening])
  ]
 },
 water:{
  name:['Water, wudu & community','நீர், உளூ, சமூக வாழ்வு'],
  lead:['Water has practical and spiritual histories. Qur’anic ritual washing is not identical to soap-based infection prevention.','நீருக்கு நடைமுறை மற்றும் ஆன்மிக வரலாறு உண்டு. குர்ஆன் கூறும் வழிபாட்டுத் தூய்மை சோப்பால் கிருமி நீக்குவதற்கு ஒப்பானது அல்ல.'],
  rows:[
   row('water-ancient','Before 600 CE','Mediterranean / மத்தியதரைக் கடல்',
    ['Public baths before the hammam','ஹம்மாமுக்கு முன் பொதுக் குளியலறைகள்'],
    ['Roman and Byzantine bath cultures preceded later Islamic bathhouses.','ரோமர், பைசந்தியர் குளியல் மரபுகள் பிற்கால இஸ்லாமியக் குளியலறைகளுக்கு முன்பிருந்தன.'],
    ['Bathhouses had rooms of differing temperatures and were also social places. Their purpose, architecture and access varied; they were not modern hospitals.','வெவ்வேறு வெப்பநிலை அறைகளும் மக்கள் சந்திக்கும் இடமும் குளியலறைகளில் இருந்தன. கட்டிடம், பயன்பாடு, அணுகல் மாறுபட்டன; அவை நவீன மருத்துவமனைகள் அல்ல.'],
    ['Bathing is also about community, technology and dignity.','குளியல் என்பது சமூகமும் தொழில்நுட்பமும் மனித மரியாதையும் தொடர்புடையது.'],
    ['Explore the museum’s bathhouse history.','அருங்காட்சியகக் குளியல் வரலாற்றைப் பாருங்கள்.'],[sources.baths]),
   row('water-600','600s CE','Qur’an / குர்ஆன்',
    ['Al-Ma’idah 5:6: water and worship','அல் மாயிதா 5:6: நீரும் தொழுகையும்'],
    ['The verse describes ritual preparation for prayer, including water-based cleansing and an alternative when water is unavailable.','தொழுகைக்கு முன் நீரால் தூய்மை செய்வதையும் நீர் கிடைக்காதபோது மாற்று முறையையும் வசனம் குறிப்பிடுகிறது.'],
    ['Read the verse in its full context. It concerns intention, worship and purification; details of practice vary across Islamic schools. This should not be rewritten as a claim that ritual washing alone replaces soap where hygiene requires it.','வசனத்தின் முழுச் சூழலையும் வாசிக்கவும். நோக்கம், வழிபாடு, தூய்மை பற்றியது; செயல்முறை விளக்கங்கள் இஸ்லாமிய மரபுகளிடையே மாறுகின்றன. சோப்பு தேவைப்படும் சுகாதார இடங்களில் உளூ மட்டும் போதும் என்று மாற்றிக் கூற வேண்டாம்.'],
    ['The Qur’an is the source; any personal life lesson must be labelled a reflection.','வசனமே மூல ஆதாரம்; தனிப்பட்ட வாழ்க்கைப் பாடம் “சிந்தனை” என்று குறிப்பிட வேண்டும்.'],
    ['Open 5:6 in the authentic Qur’an reader.','குர்ஆன் 5:6 வசனத்தை முழுமையாக வாசிக்கவும்.'],[sources.qWudu]),
   row('water-700','700s CE','Umayyad world / உமய்யத் காலம்',
    ['A painted bathhouse in Qasr Amra','கஸ்ர் அம்ரா ஓவியக் குளியலறை'],
    ['Eighth-century Qasr Amra is a surviving example of elite Umayyad bathing architecture.','8ஆம் நூற்றாண்டின் கஸ்ர் அம்ரா உமய்யத் கால உயர்வினர் குளியல் கட்டிடத்தின் எடுத்துக்காட்டு.'],
    ['Its surviving layout and paintings show how architecture and social life developed. It would be inaccurate to say every family then had such a bathhouse.','அங்குள்ள கட்டிட வடிவமும் ஓவியங்களும் சமூக வாழ்வையும் கட்டிட வளர்ச்சியையும் காட்டுகின்றன. அக்கால எல்லா வீடுகளிலும் இத்தகைய குளியலறை இருந்தது என்று சொல்ல முடியாது.'],
    ['A surviving building tells us who could commission it — not how every household lived.','மீதமிருக்கும் கட்டிடம் அதை யார் கட்ட முடிந்தது என்பதைக் காட்டும்; ஒவ்வொரு வீட்டின் வாழ்வையும் அல்ல.'],
    ['Read the museum account and compare with family washing traditions.','அருங்காட்சியக ஆதாரத்தையும் குடும்பக் குளியல் வழக்கத்தையும் ஒப்பிடுங்கள்.'],[sources.baths]),
   row('water-1000','900s–1000s CE','Medieval cities / நடுக்கால நகரங்கள்',
    ['Hammams as places of community','சமூக இடங்களாக ஹம்மாம்'],
    ['Medieval writers described public baths among key facilities of prosperous cities.','நடுக்கால எழுத்தாளர்கள் செழித்த நகரங்களின் முக்கிய இடங்களில் பொதுக் குளியலறைகளைக் குறிப்பிட்டனர்.'],
    ['Bathhouses were places for washing, social connection and local customs. Numbers reported for medieval Baghdad may be exaggerated, so the significance is the institution rather than an exact unsupported count.','குளியலறைகள் தூய்மை, மக்கள் சந்திப்பு, உள்ளூர் வழக்குகளுக்கான இடங்கள். நடுக்கால பக்தாத் எண்ணிக்கைகள் மிகைப்படுத்தப்பட்டிருக்கலாம்; உறுதியற்ற எண்ணிக்கையை விட அதன் சமூகப் பங்கு முக்கியம்.'],
    ['History is stronger when we distinguish descriptions from verified counts.','வரலாற்றில் விளக்கத்தையும் உறுதியான எண்ணிக்கையையும் பிரித்தறிய வேண்டும்.'],
    ['Explore bathhouse architecture and water use.','குளியலறை கட்டிடமும் நீர் பயன்பாடும் பற்றி அறியுங்கள்.'],[sources.baths]),
   row('water-now','2000s–today','Daily life / அன்றாட வாழ்க்கை',
    ['Two truths can coexist','இரண்டு உண்மைகளும் இணைந்து இருக்கலாம்'],
    ['Ritual cleanliness carries religious meaning; hygiene practices reduce everyday exposure to germs.','வழிபாட்டுத் தூய்மைக்கு மத அர்த்தம் உண்டு; அன்றாட சுகாதாரப் பழக்கங்கள் கிருமி பரவலைக் குறைக்க உதவும்.'],
    ['A home can honour wudu while also using soap after the toilet and before food preparation. Neither needs to be misrepresented as a replacement for the other.','ஒரு வீடு உளூவின் ஆன்மிக அர்த்தத்தை மதிக்கவும், கழிவறைக்குப் பின்பும் சமையலுக்கு முன்பும் சோப்பைப் பயன்படுத்தவும் முடியும். ஒன்றை மற்றொன்றுக்கு மாற்றாகச் சொல்லத் தேவையில்லை.'],
    ['Religious practice and measured hygiene serve overlapping but different purposes.','மத வழக்கமும் சுகாதார முறையும் சில இடங்களில் ஒத்திருந்தாலும் நோக்கம் வேறுபடும்.'],
    ['Wash hands with soap when needed; keep spiritual practices meaningful.','தேவையானபோது சோப்பால் கைகளைக் கழுவி ஆன்மிக வழக்கத்தையும் மதிக்கவும்.'],[sources.qWudu])
  ]
 },
 food:{
  name:['Food, attention & the Qur’an','உணவு, கவனம், குர்ஆன்'],
  lead:['Study what each verse actually says before turning it into advice about modern eating habits.','இன்றைய உணவு வழக்கிற்கு அறிவுரை சொல்லும் முன் ஒவ்வொரு வசனமும் என்ன சொல்கிறது எனப் பார்ப்போம்.'],
  rows:[
   row('food-631','600s CE · Qur’an 7:31','Al-A’raf / அல் அஃராஃப்',
    ['Eat, drink — avoid excess','உண்ணுங்கள், பருகுங்கள் — அளவுமீற வேண்டாம்'],
    ['The verse joins dignity in worship with moderation in eating and drinking.','வழிபாட்டில் மரியாதையையும் உணவு, குடிப்பில் அளவையும் வசனம் இணைக்கிறது.'],
    ['The verse speaks about moderation in food and drink in its worship context. A separate personal reflection may consider waste, hospitality and sharing.','வழிபாட்டின் சூழலில் உணவு, பானத்தில் அளவை வசனம் நினைவூட்டுகிறது. உணவு வீணாக்கம், விருந்தோம்பல், பகிர்வு குறித்து தனியாகச் சிந்திக்கலாம்.'],
    ['Respect the original religious context; reflection is separate.','மூல மதச் சூழலை மதிக்கவும்; தனிச் சிந்தனையைத் தனியே காட்டவும்.'],
    ['Read the full verse and examine your real household food waste.','முழு வசனத்தை வாசித்து உங்கள் வீட்டில் உணவு எங்கு வீணாகிறது என்று பாருங்கள்.'],[sources.qFood]),
   row('food-624','600s CE · Qur’an 80:24','Abasa / அபஸ',
    ['Look closely at your food','உங்கள் உணவை கவனியுங்கள்'],
    ['This verse draws attention to food and its origin.','உணவையும் அது வரும் வழியையும் கவனிக்க வசனம் நினைவூட்டுகிறது.'],
    ['Read the surrounding verses, which refer to water and plants. One modern reflection is to ask who grew the food, what is seasonal and how it reaches our table. That reflection is ours, not a new Qur’anic translation.','அருகிலுள்ள வசனங்களில் நீரும் தாவரங்களும் வருவதைப் பாருங்கள். இன்று விவசாயி யார், பருவ உணவு எது, எப்படிப் நம் மேசைக்கு வருகிறது என்று கேட்கலாம். இது நமது சிந்தனை; குர்ஆன் மொழிபெயர்ப்பு அல்ல.'],
    ['Attention begins before the first bite — at soil, water and human effort.','முதல் கவளத்துக்கு முன்பே கவனம் தொடங்குகிறது — நிலம், நீர், மனித உழைப்பு.'],
    ['Trace one familiar ingredient from farm or market to kitchen.','ஒரு வழக்கமான பொருள் வயல் அல்லது சந்தையிலிருந்து வீட்டிற்கு வரும் பாதையை அறியுங்கள்.'],[sources.qLook]),
   row('food-669','600s CE · Qur’an 16:69','An-Nahl / அன் நஹ்ல்',
    ['The bee and the meaning of healing','தேனீயும் “குணம்” என்ற கருத்தும்'],
    ['The verse mentions the bees’ drink and its significance as a sign for reflection.','தேனீயின் பானத்தையும் சிந்திப்போருக்கான அடையாளமாக அதன் அர்த்தத்தையும் வசனம் குறிப்பிடுகிறது.'],
    ['The Qur’anic reference to healing is part of its sacred context. Any practical medical use of honey has to be assessed separately.','குணப்படுத்துதல் பற்றிய குர்ஆன் வசனம் அதன் புனிதச் சூழலில் உள்ளது. தேனை மருத்துவப் பயன்பாட்டிற்கு பயன்படுத்துவது தனியாக மதிப்பிடப்பட வேண்டும்.'],
    ['Appreciation of nature is meaningful without inventing miracle remedies.','இயற்கையின் வியப்பை மதிப்பதற்கு அதிசய வைத்தியம் கற்பிக்கத் தேவையில்லை.'],
    ['Read the original verse and distinguish reflection from practical treatment claims.','மூல வசனத்தை வாசித்து சிந்தனையையும் மருத்துவக் கூற்றையும் பிரிக்கவும்.'],[sources.qHoney]),
   row('food-now','Today / இன்று','Family Kitchen / குடும்ப சமையல்',
    ['From reflection to a practical plate','சிந்தனையிலிருந்து நடைமுறை உணவிற்கு'],
    ['Plan with household ingredients, the season and the number of people eating.','வீட்டில் உள்ள பொருட்கள், பருவம், உண்போர் எண்ணிக்கை பார்த்துத் திட்டமிடவும்.'],
    ['Affordable food is not a competition between modern and ancient labels. A real family can combine familiar grains, legumes and locally available vegetables, then adapt quantities to its needs. The Kitchen section has measured recipe starting points.','மலிவான உணவு என்பது “பழையதா புதியதா” என்ற போட்டியல்ல. குடும்பம் பழக்கமான தானியம், பருப்பு, உள்ளூர் காய்கறியைச் சேர்த்து தேவைக்கேற்ப அளவை மாற்றலாம். Kitchen பகுதியில் அளவுகளுடன் ஆரம்பச் செய்முறைகள் உள்ளன.'],
    ['Do not turn a spiritual verse into a compulsory meal prescription.','ஆன்மிக வசனத்தை கட்டாய உணவுக் கட்டளையாக மாற்ற வேண்டாம்.'],
    ['Open Kitchen; choose one meal and its 1–5 serving quantities.','Kitchen திறந்து 1–5 பேருக்கான ஒரு உணவின் அளவைப் பாருங்கள்.'],[sources.qFood,sources.qLook])
  ]
 },
 hair:{
  name:['Hair, ageing & family knowledge','முடி, வயது, குடும்ப அறிவு'],
  lead:['No invented “1000-year recipe”. Start with a living family memory, document the ingredients, then compare with what can be verified.','கற்பனையான “1000 ஆண்டு செய்முறை” வேண்டாம். குடும்ப நினைவில் தொடங்கி பொருட்களைப் பதிவு செய்து ஆதாரத்துடன் ஒப்பிடுவோம்.'],
  rows:[
   row('hair-family','Family memory · date unknown','Tamil households / தமிழ் வீடுகள்',
    ['What did an aunt or grandmother actually do?','அத்தை அல்லது பாட்டி உண்மையில் என்ன செய்தார்?'],
    ['A remembered practice is valuable even before its date is established.','காலம் உறுதி செய்யப்படாத குடும்ப வழக்கும் பதிவாகத் தகுதியானது.'],
    ['Write down the local name, plant identification if known, where it came from, the preparation, how often it was used and who taught it. Distinguish what a relative witnessed from what later people claimed. Never assign a century without evidence.','உள்ளூர் பெயர், தெரிந்தால் செடி வகை, எங்கிருந்து வந்தது, தயாரிப்பு, பயன்பாட்டு அடிக்கடி, யார் கற்றுத் தந்தார் என்று பதிவு செய்யுங்கள். உறவினர் நேரில் பார்த்ததையும் பிற்காலக் கூற்றையும் பிரிக்கவும். ஆதாரம் இல்லாமல் நூற்றாண்டு சொல்ல வேண்டாம்.'],
    ['Respect the person rather than judge whether they followed modern advice.','நவீன அறிவுரை பயன்படுத்தினாரா என மதிப்பிடாமல் அந்த மனிதரை மதிக்க வேண்டும்.'],
    ['Ask one question: “Who taught you this, and what did you notice?”','“இதை யார் கற்றுத் தந்தார்கள், என்ன மாற்றம் கவனித்தீர்கள்?” என்று கேளுங்கள்.'],[]),
   row('hair-today','2000s–today','Dermatology / தோல் மருத்துவம்',
    ['What makes hair turn grey?','முடி ஏன் நரைக்கிறது?'],
    ['Hair pigment changes with age and inherited factors; nutrition is important for general health but oils cannot reliably reverse greying.','வயதும் மரபணுக்களும் முடியின் நிறமியை மாற்றுகின்றன; உணவு பொது உடல்நலத்துக்கு முக்கியம், எண்ணெயால் நரைமுடியை உறுதியாக மாற்ற முடியாது.'],
    ['Hair colour depends on melanin made in follicles. Age, genes, and sometimes health conditions affect change. Coconut oil may suit some hair-care routines but does not change the biological cause of greying. This makes family oil rituals cultural knowledge, not medical promises.','முடிக்குழியில் உருவாகும் மெலனின் முடி நிறத்துடன் தொடர்புடையது. வயது, மரபணு, சில உடல்நிலைகள் மாற்றத்தைப் பாதிக்கலாம். தேங்காய் எண்ணெய் சிலருக்குப் பராமரிப்பில் பயன்படலாம்; நரையின் உயிரியல் காரணத்தை மாற்றாது.'],
    ['An ingredient and its claimed result are two separate questions.','ஒரு பொருளும் அதன் பலன் பற்றிய கூற்றும் தனித்தனி கேள்விகள்.'],
    ['Choose gentle care and balanced meals; stop a product if it irritates the scalp.','மென்மையான பராமரிப்பு, பலவகை உணவு; தலையில் எரிச்சல் தரும் பொருளை நிறுத்துங்கள்.'],[sources.hair]),
   row('hair-archive','Future archive / அடுத்த கட்டம்','Eastern Sri Lanka / கிழக்கு இலங்கை',
    ['Preserve stories before declaring history','வரலாறு என்று கூறும் முன் நினைவுகளைப் பாதுகாப்போம்'],
    ['Regional ingredients and names should come from relatives and practitioners, not generic internet recipes.','பிராந்தியப் பொருட்கள், பெயர்கள் உறவினர் மற்றும் பாரம்பரியக் கலைஞர்களிடமிருந்து வர வேண்டும்; பொதுவான இணையத் தகவலில் இருந்து அல்ல.'],
    ['For an Akkaraipattu or Eastern Sri Lankan account, record the person’s exact words, consent and the approximate decade. Compare names across families. If a plant cannot be identified reliably, leave it unidentified rather than guessing.','அக்கரைப்பற்று அல்லது கிழக்கிலங்கை வழக்குகளைப் பதிவு செய்யும்போது, சொன்னவரின் சொற்கள், சம்மதம், தோராயமான தசாப்தம் சேர்க்கவும். பல குடும்பப் பெயர்களை ஒப்பிடவும். செடியை உறுதியாக அடையாளம் காண முடியாவிட்டால் ஊகம் வேண்டாம்.'],
    ['The archive becomes trustworthy because it admits what it does not know.','தெரியாததை நேர்மையாகக் குறிப்பிடுவதுதான் நம்பகமான காப்பகம்.'],
    ['Record one family practice privately; publish only with permission.','ஒரு குடும்ப வழக்கைத் தனிப்பட்ட முறையில் பதிவு செய்யவும்; அனுமதியுடன் மட்டும் வெளியிடவும்.'],[])
  ]
 }
};
const verses=[
 {id:'v5',ref:'5:6',label:['Cleanliness before prayer','தொழுகைக்கு முன் தூய்மை'],
  detail:['The verse gives instructions for ritual purification in preparation for prayer, alongside a provision for circumstances where water is unavailable.','தொழுகைக்கு முன் வழிபாட்டுத் தூய்மையை விளக்கும் வசனம்; நீர் கிடைக்காத சூழலுக்கான வழியும் குறிப்பிடப்படுகிறது.'],
  reflection:['Reflection: cleanliness may also invite mindful preparation. This is a modern reflection, not the wording of the Qur’an.','சிந்தனை: தூய்மை மனதையும் தயார்படுத்த உதவலாம். இது இன்றைய தனிச் சிந்தனை; குர்ஆனின் அசல் சொற்கள் அல்ல.'],source:sources.qWudu},
 {id:'v7',ref:'7:31',label:['Moderation when eating and drinking','உணவு, குடிப்பில் அளவு'],
  detail:['The verse connects appropriate conduct at worship with eating and drinking without excess. It gives no precise grams, fasting timetable or banned nighttime food list.','வழிபாட்டின் ஒழுக்கத்தையும் உணவு, பானத்தில் அளவையும் வசனம் இணைக்கிறது. கிராம் அளவோ இரவு உணவுத் தடையோ சொல்லவில்லை.'],
  reflection:['Reflection: think about buying only what a household can use, without shaming anyone.','சிந்தனை: குடும்பம் பயன்படுத்துமளவு வாங்குவதையும் பிறரை அவமானப்படுத்தாமல் இருப்பதையும் நினைக்கலாம்.'],source:sources.qFood},
 {id:'v80',ref:'80:24',label:['Consider where your food comes from','உணவின் வருகையைச் சிந்தியுங்கள்'],
  detail:['The verse invites attention to food, and the nearby passage describes water and growing plants.','உணவை கவனிக்க வசனம் அழைக்கிறது; அடுத்த வசனங்கள் நீரும் தாவர வளர்ச்சியும் பற்றிக் கூறுகின்றன.'],
  reflection:['Reflection: follow one ingredient from grower to kitchen and notice the people involved.','சிந்தனை: ஒரு உணவுப் பொருள் வயலிலிருந்து சமையலறை வரும்வரை யார் உழைத்தனர் எனக் கவனிக்கலாம்.'],source:sources.qLook},
 {id:'v16',ref:'16:69',label:['Bees, honey and reflection','தேனீ, தேன், சிந்தனை'],
  detail:['The verse refers to bees, honey and healing within its sacred context.','தேனீ, தேன், குணப்படுத்துதல் பற்றிய வசனத்தை அதன் ஆன்மிகச் சூழலில் வாசிப்போம்.'],
  reflection:['Reflection: nature invites curiosity; practical health claims still need appropriate evidence.','சிந்தனை: இயற்கை ஆர்வத்தைத் தூண்டும்; மருத்துவப் பலன் பற்றிய கூற்றுக்கு தனி ஆதாரம் தேவை.'],source:sources.qHoney}
];
const topics=[['teeth','Teeth','பற்கள்'],['water','Water & wudu','நீர் · உளூ'],['food','Food','உணவு'],['hair','Hair','முடி'],['quran','Qur’an','குர்ஆன்']];
/* Compact Home entry; full reading navigation belongs to the Reader screen. */

/* Each sacred tradition stands on its own; all prose below is editorial
   explanation, not an attributed quotation or an invented ancient instruction. */
sources.qPeoples=S("Qur’an 49:13 · peoples and tribes",'https://quran.com/49/13');
sources.qLanguages=S("Qur’an 30:22 · languages",'https://quran.com/30/22');
sources.qJustice=S("Qur’an 16:90 · justice",'https://quran.com/16/90');
verses.push(
 {id:'v49',ref:'49:13',label:['Different peoples, knowing one another','பல மக்கள் · ஒருவரை ஒருவர் அறிதல்'],
  detail:['The verse addresses humankind, describing different peoples and tribes so that they may know one another, and places honour in God-consciousness.','இந்த வசனம் மனிதகுலத்தையும் பல சமூகங்களையும் குறிப்பிடுகிறது; ஒருவரை ஒருவர் அறிதலையும் இறையுணர்வின் மதிப்பையும் விளக்குகிறது.'],
  reflection:['Personal reflection: learn someone’s language or family story respectfully without deciding their worth by birthplace.','தனிச் சிந்தனை: பிறந்த இடத்தை வைத்து மதிப்பிடாமல் ஒருவரின் மொழியையும் குடும்பக் கதையையும் மரியாதையுடன் அறியலாம்.'],source:sources.qPeoples},
 {id:'v30',ref:'30:22',label:['Different languages as signs','மொழி வேறுபாடுகள் · அடையாளங்கள்'],
  detail:['The verse mentions the creation of the heavens and earth and the variety of languages and colours among people as signs.','வானம், பூமியின் படைப்போடு மனிதர்களின் மொழி, நிற வேறுபாடுகளையும் அடையாளங்களாக வசனம் குறிப்பிடுகிறது.'],
  reflection:['Personal reflection: help a person learn English while honouring their Tamil and other mother tongues.','தனிச் சிந்தனை: ஒருவருக்கு ஆங்கிலம் கற்றுத் தரும்போது அவருடைய தமிழ் மற்றும் தாய்மொழியையும் மதிக்கலாம்.'],source:sources.qLanguages},
 {id:'v1690',ref:'16:90',label:['Justice, kindness and family','நீதி · நன்மை · உறவுகள்'],
  detail:['The verse speaks of justice, doing good and giving to relatives, while warning against wrongdoing and oppression.','நீதி, நன்மை செய்தல், உறவினருக்கு வழங்குதல் ஆகியவற்றைக் கூறி தீமை, அநீதியைத் தவிர்க்கச் சொல்கிறது.'],
  reflection:['Personal reflection: when sharing housework or food, choose fairness rather than blame.','தனிச் சிந்தனை: உணவு, வீட்டு வேலை பகிரும்போது குற்றச்சாட்டைவிட நியாயத்தைத் தேர்ந்தெடுக்கலாம்.'],source:sources.qJustice}
);
const L=(label,url)=>({label,url});
const scripture=(id,place,en,ta,shortEn,shortTa,contextEn,contextTa,focusEn,focusTa,actionEn,actionTa,links)=>
 row(id,'Source reading',place,[en,ta],[shortEn,shortTa],[contextEn,contextTa],[focusEn,focusTa],[actionEn,actionTa],links);
data.newtestament={
 name:['Bible · New Testament','பைபிள் · புதிய ஏற்பாடு'],
 lead:['Short New Testament readings in their Christian setting. Other traditions are not inserted as explanations.','கிறிஸ்தவச் சூழலில் புதிய ஏற்பாட்டிலிருந்து சிறிய வாசிப்புகள். வேறு மரபுகள் இதன் விளக்கமாகக் கலக்கப்படாது.'],
 rows:[
  scripture('nt-matt6','Matthew 6:26 / மத்தேயு 6:26','Birds, provision and concern','பறவைகள் · வாழ்வாதாரம் · கவலை',
   'Jesus points listeners toward birds when teaching about anxiety and trust.','கவலை, நம்பிக்கை பற்றி போதிக்கும்போது இயேசு பறவைகளைச் சுட்டிக்காட்டுகிறார்.',
   'This teaching appears within the Sermon on the Mount. The passage uses an example from nature to speak about concern for life; it is not a claim that people should stop working or caring for animals.','மலைப்பிரசங்கத்தில் இயற்கையை எடுத்துக்காட்டாகக் கொண்டு வாழ்க்கைக் கவலைகள் பற்றிப் பேசுகிறார். மனிதர்கள் வேலை செய்ய வேண்டாம் அல்லது விலங்குகளைப் பராமரிக்க வேண்டாம் என்று கூறுவதல்ல.',
   'Christian teaching about trust is preserved as Christian teaching.','நம்பிக்கை பற்றிய கிறிஸ்தவப் போதனையை அதன் சொந்த சூழலில் அறியலாம்.',
   'Notice a bird outside and consider what helps it find food or shelter.','வெளியில் ஒரு பறவையைப் பார்த்து அதன் உணவு, இருப்பிடம் பற்றி அறியலாம்.',
   [L('Bible Gateway · Matthew 6:26','https://www.biblegateway.com/verse/en/Matthew%206%3A26')]),
  scripture('nt-mark12','Mark 12:31 / மாற்கு 12:31','Care for your neighbour','அயலவரை அன்புடன் அணுகுதல்',
   'Jesus teaches love of neighbour in the context of the commandments.','கட்டளைகள் பற்றிய உரையில் இயேசு அயலவரிடம் அன்பு காட்டுவதைப் போதிக்கிறார்.',
   'This verse belongs to a larger conversation about the greatest commandments. Read it with the preceding verse and do not turn it into a slogan against people from other faiths.','மிக முக்கிய கட்டளைகள் பற்றிய பெரிய உரையாடலின் பகுதி இது. முன்வசனத்துடன் வாசித்து வேறு மதத்தவரை விமர்சிக்கும் வாசகமாக மாற்ற வேண்டாம்.',
   'The focus here is the neighbour as a person deserving care.','அயலவர் பராமரிப்பும் மரியாதையும் பெறவேண்டிய மனிதர்.',
   'Offer practical help without demanding that the other person share your beliefs.','மற்றவர் உங்கள் நம்பிக்கையை ஏற்க வேண்டும் என வற்புறுத்தாமல் உதவுங்கள்.',
   [L('Bible Gateway · Mark 12:31','https://www.biblegateway.com/verse/en/Mark%2012%3A31')])
 ]
};
data.oldtestament={
 name:['Old Testament · Hebrew Bible','பழைய ஏற்பாடு · எபிரேய வேதாகமம்'],
 lead:['Read passages in their biblical setting. Jewish and Christian canons and ways of reading are not identical.','வசனங்களை அவற்றின் வேதாகமச் சூழலில் வாசிப்போம். யூத, கிறிஸ்தவ நூல் ஒழுங்கும் விளக்கங்களும் முழுமையாக ஒரே மாதிரி அல்ல.'],
 rows:[
  scripture('ot-genesis','Genesis 2:15 / ஆதியாகமம் 2:15','The garden and human responsibility','தோட்டமும் மனிதப் பொறுப்பும்',
   'The human is placed in the garden with a responsibility to tend and watch over it.','தோட்டத்தைக் கவனித்துப் பராமரிக்க மனிதனுக்குப் பொறுப்பு கொடுக்கப்படுவதாகப் பகுதி சொல்கிறது.',
   'The story is in Genesis’ creation narrative. Caring for the garden is part of the passage, but it is not a modern environmental science textbook.','ஆதியாகமத்தின் படைப்புக் கதையில் வரும் பகுதி. தோட்டத்தைப் பராமரிப்பது இதில் இடம் பெறுகிறது; இது நவீன சுற்றுச்சூழல் அறிவியல் நூல் அல்ல.',
   'Work and care appear together within the story.','கதைச் சூழலில் உழைப்பும் பராமரிப்பும் இணைகின்றன.',
   'Care for one small plant or shared living space.','ஒரு செடி அல்லது பகிர்ந்த வாழ்விடத்தைப் பராமரிக்கலாம்.',
   [L('Bible Gateway · Genesis 2:15','https://www.biblegateway.com/verse/en/Genesis%202%3A15')]),
  scripture('ot-psalm','Psalm 104:14 / சங்கீதம் 104:14','Plants, animals and food','செடிகள் · விலங்குகள் · உணவு',
   'The psalm describes plant life, livestock and cultivated food within praise of the Creator.','படைப்பவரைப் புகழும் சங்கீதத்தில் தாவரங்கள், கால்நடைகள், பயிரிட்ட உணவு பற்றி வருகிறது.',
   'The verse belongs to a song about the natural world and its provision. It expresses religious praise, not a claim that all food crops grow without labour.','இயற்கை உலகைப் பற்றிய புகழ்ப்பாடலின் பகுதி. மனித உழைப்பு இல்லாமல் எல்லா உணவும் வளர்கிறது என்ற கூற்று அல்ல.',
   'Food, cultivation and care for living things are worth noticing.','உணவு, விவசாயம், உயிரினப் பராமரிப்பை கவனிக்கலாம்.',
   'Ask where one vegetable in today’s meal was grown.','இன்றைய உணவில் ஒரு காய்கறி எங்கு விளைந்தது என்று அறியுங்கள்.',
   [L('Bible Gateway · Psalm 104:14','https://www.biblegateway.com/verse/en/Psalm%20104%3A14')])
 ]
};
data.gita={
 name:['Bhagavad Gita · Hindu teaching','பகவத் கீதை · இந்து போதனை'],
 lead:['Gita is a Hindu text within the Mahabharata, distinct from the four Vedas.','பகவத் கீதை மகாபாரதத்தில் இடம்பெறும் இந்து நூல்; நான்கு வேதங்களிலிருந்து வேறுபட்டது.'],
 rows:[
  scripture('gita-617','Bhagavad Gita 6.17 / பகவத் கீதை 6.17','Moderation in daily activity','அன்றாடச் செயல்களில் அளவு',
   'The verse discusses moderated eating, recreation, activity, sleep and waking in a yogic setting.','யோகப் பயிற்சியின் சூழலில் உணவு, ஓய்வு, செயல், உறக்கம், விழிப்பில் அளவை விவரிக்கிறது.',
   'Krishna speaks to Arjuna in the Bhagavad Gita. Translations differ slightly in wording; this is a short summary, not a Sanskrit quotation.','பகவத் கீதையில் கிருஷ்ணர் அர்ஜுனனிடம் பேசும் பகுதி. மொழிபெயர்ப்பில் சொற்கள் சிறிது மாறலாம்; இது விளக்கம், சமஸ்கிருத மேற்கோள் அல்ல.',
   'Moderation is discussed as part of yoga, not as a universal medical prescription.','யோகத்தின் ஒரு பகுதியாக அளவு பேசப்படுகிறது; அனைவருக்கும் ஒரே மருத்துவக் கட்டளை அல்ல.',
   'Notice whether everyday routines make space for rest and regular meals.','அன்றாட வழக்கில் ஓய்வுக்கும் உணவுக்கும் இடம் உள்ளதா கவனிக்கலாம்.',
   [L('IIT Kanpur · Gita 6.17','https://www.gitasupersite.iitk.ac.in/srimad?etadi=1&etgb=1&etpurohit=1&etsiva=1&etssa=1&field_chapter_value=6&field_nsutra_value=17&language=dv')]),
  scripture('gita-247','Bhagavad Gita 2.47 / பகவத் கீதை 2.47','Action and attachment to outcomes','செயலும் பலன் பற்றிய பற்றும்',
   'The verse distinguishes doing one’s work from attachment to the result.','செயலை ஆற்றுவதையும் அதன் பலனில் பற்றுடன் இருப்பதையும் வேறுபடுத்திப் பேசுகிறது.',
   'This teaching belongs to the Gita’s dialogue on duty and action. It does not mean that consequences or other people can be ignored.','கடமை, செயல் பற்றிய கீதையின் உரையாடலின் பகுதி. விளைவுகளையோ மற்றவர்களையோ புறக்கணிக்கலாம் என்று பொருளல்ல.',
   'The verse concerns action with attention, without reducing people to success or failure.','வெற்றி, தோல்வி மட்டும் வைத்து மனிதனை மதிப்பிடாமல் செயலில் கவனம் வைப்பது பற்றியது.',
   'Learn a language or practise a useful skill for its own value.','மொழியையோ பயனுள்ள திறனையோ அதன் மதிப்புக்காகக் கற்கலாம்.',
   [L('IIT Kanpur · Gita 2.47','https://heritage.iitk.ac.in/SBG/2.47')])
 ]
};
data.vedas={
 name:['Vedic texts · Rigveda','வேதங்கள் · ரிக்வேதம்'],
 lead:['The Vedas have their own historical, ritual and linguistic contexts. The Gita is catalogued separately.','வேதங்களுக்கு தனித்த வரலாறு, சடங்கு, மொழிச் சூழல் உண்டு. கீதை வேறு பகுதியில் உள்ளது.'],
 rows:[
  scripture('rig-101912','Rigveda 10.191.2 / ரிக்வேதம் 10.191.2','Gathering and speaking together','ஒன்றுகூடி உரையாடுதல்',
   'The hymn calls for people to gather, speak together and bring their minds into shared understanding.','மக்கள் ஒன்றுகூடி உரையாடி ஒருமித்த புரிதலுடன் இருக்கப் பாடல் அழைக்கிறது.',
   'This is part of a Vedic hymn with a ritual context. It can inspire reflection on dialogue, but should not be flattened into a modern slogan that everyone must agree on everything.','சடங்கு பின்னணி உள்ள வேதப் பாடலின் பகுதி. உரையாடலைச் சிந்திக்க உதவும்; அனைவரும் எல்லாவற்றிலும் ஒப்புக்கொள்ள வேண்டும் என்ற நவீன முழக்கமாக மாற்றக் கூடாது.',
   'The text concerns coming together and speech, in its own sacred setting.','இந்தப் பாடல் அதன் புனிதச் சூழலில் ஒன்றுகூடலும் உரையாடலும் பற்றியது.',
   'Invite people to exchange a family memory without arguing about whose heritage is better.','யாருடைய மரபு உயர்ந்தது என விவாதிக்காமல் குடும்ப நினைவுகளைப் பகிரலாம்.',
   [L('Rigveda 10.191.2 · Sanskrit and translation','https://www.wisdomlib.org/hinduism/book/rig-veda-english-translation/d/doc840451.html')])
 ]
};
data.ayurveda={
 name:['Ayurveda · classical medical history','ஆயுர்வேதம் · பழைய மருத்துவ வரலாறு'],
 lead:['Ayurveda is a traditional medical system and textual history, not a collection of Vedic verses or a substitute for medical care.','ஆயுர்வேதம் பாரம்பரிய மருத்துவ மரபும் நூல்களின் வரலாறும் ஆகும்; வேத வசனங்களின் தொகுப்பு அல்ல, மருத்துவச் சிகிச்சைக்கான மாற்றும் அல்ல.'],
 rows:[
  scripture('ayur-caraka5','Charaka Samhita · Sutra Sthana 5 / சரக சம்ஹிதை · சூத்திர ஸ்தானம் 5','Daily routine in a classical text','பழைய நூலில் தினசரி வழக்கம்',
   'This chapter discusses food quantity and daily regimen in the classical Ayurvedic tradition.','பாரம்பரிய ஆயுர்வேதத்தில் உணவளவும் தினசரி வழக்கமும் இந்த அத்தியாயத்தில் விவாதிக்கப்படுகின்றன.',
   'Classical Ayurveda combined observations, theories and practices from its time. The chapter is a valuable historical source. Individual procedures and medical claims require separate safety and evidence review.','பழைய காலக் கவனிப்பு, கோட்பாடு, வழக்குகள் இந்நூலில் சேர்கின்றன. வரலாற்றுக்கு இது உதவும்; குறிப்பிட்ட சிகிச்சை, பலன், பாதுகாப்பு தனியாகச் சரிபார்க்கப்பட வேண்டும்.',
   'Preserve the original text and its setting without promising a cure.','மூல நூலையும் காலச் சூழலையும் மதித்து குணமடையும் வாக்குறுதி கூற வேண்டாம்.',
   'Choose ordinary affordable hygiene and food practices, not unverified treatments.','மலிவான அன்றாடச் சுத்தம், உணவுப் பழக்கங்களைத் தேர்ந்து சோதிக்காத சிகிச்சையைத் தவிர்க்கவும்.',
   [L('Charaka Samhita · Sutra Sthana 5','https://www.carakasamhitaonline.com/index.php/Matrashiteeya_Adhyaya')])
 ]
};
window.HCHeritageCatalogV189={data,verses,sources};
const launcher=document.createElement('button');
launcher.type='button';launcher.id='hcDeepHeritageV185';
launcher.className='hc-heritage-launch';
launcher.innerHTML='<span><strong>Human Knowledge · மனித அறிவு</strong><small>Faiths · traditions · daily living · படி · புரிந்து கொள்</small></span><span aria-hidden="true">›</span>';
care.insertAdjacentElement('beforebegin',launcher);
const style=document.createElement('style');style.id='hcHeritageLauncherCssV189';
style.textContent=[
 '#home #hcDeepHeritageV185{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;margin:10px 0;min-height:55px;padding:11px 13px;background:#1d1d1d;color:#f6f6f4;border:1px solid #515151;border-radius:12px;text-align:left;font:inherit;cursor:pointer}',
 '#home #hcDeepHeritageV185 strong{display:block;font-size:14px;line-height:1.5;font-weight:750}',
 '#home #hcDeepHeritageV185 small{display:block;font-size:11px;color:#c7c6c3;margin-top:3px;line-height:1.4}',
 '#home #hcDeepHeritageV185>span:last-child{font-size:19px}',
 '#home #hcDeepHeritageV185:focus-visible{outline:2px solid #fff;outline-offset:3px}'
].join('\n');document.head.append(style);
const reader=document.createElement('script');reader.id='hcHeritageReaderScriptV189';
reader.src='./hc-heritage-reader-v189.js?v=284';reader.async=true;document.body.append(reader);
})();