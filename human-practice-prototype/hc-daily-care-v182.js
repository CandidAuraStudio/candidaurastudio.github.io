/* HeartClear Family Home v182 · Everyday Care / அன்றாடப் பராமரிப்பு.
   Original educational routine: affordable, non-medical, bilingual, non-judgemental.
   Traditional wisdom is clearly distinguished from established health guidance.
   No artificial text-to-speech; no account or uploads; entries remain on this device. */
(function(){
'use strict';
const kitchen=document.getElementById('hcHomeKitchenQuickV155');
const home=document.getElementById('home');
if(!home||!kitchen||document.getElementById('hcEverydayCareV182'))return;
const LANG_KEY='hcEverydayCareLangV182',CHECK_KEY='hcEverydayCareChecksV182';
const tr=(en,ta)=>lang==='ta'?ta:en;
const escapeText=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const load=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch(e){return fallback}};
const save=(key,data)=>{try{localStorage.setItem(key,JSON.stringify(data))}catch(e){}};
let lang='ta',period='morning',checks=load(CHECK_KEY,{});
try{if(localStorage.getItem(LANG_KEY)==='en')lang='en'}catch(e){}
const morning=[
 ['hands','Clean hands and face','கைகளையும் முகத்தையும் சுத்தமாகக் கழுவவும்',
 'Use clean water; use soap for hands before food and after the toilet. Pat the face gently rather than scrubbing.','சுத்தமான நீரால் கழுவவும். சாப்பிடுவதற்கு முன்பும் கழிவறைக்குப் பின்பும் சோப்பால் கைகளைக் கழுவவும். முகத்தைத் தேய்க்காமல் மெதுவாகத் துடைக்கவும்.'],
 ['brush-am','Brush teeth','பற்களைத் துலக்கவும்',
 'Brush gently for two minutes with fluoride toothpaste.','ஃப்ளூரைடு உள்ள பற்பசையால் இரண்டு நிமிடம் மெதுவாகப் பற்களைத் துலக்கவும்.'],
 ['food-am','Have a nourishing breakfast when hungry','பசி இருந்தால் சத்தான காலை உணவு சாப்பிடவும்',
 'Use what you have: idli with dhal, eggs, fruit, or another familiar balanced meal. No single food is required at an exact hour.','வீட்டில் இருப்பதைப் பயன்படுத்துங்கள்: பருப்புடன் இட்லி, முட்டை, பழம் அல்லது பழக்கமான சத்தான உணவு. குறிப்பிட்ட நேரத்தில் ஒரே உணவு கட்டாயம் இல்லை.'],
 ['learn','Learn a little English','சிறிது ஆங்கிலம் கற்கவும்',
 'Read one useful sentence aloud, then use it naturally today.','பயனுள்ள ஓர் ஆங்கில வாக்கியத்தைச் சத்தமாகப் படித்து இன்று பயன்படுத்திப் பாருங்கள்.']
];
const wash=[
 ['wash-before','Before bathing: choose what your hair needs','குளிப்பதற்கு முன்: தலைமுடியின் தேவையைப் பாருங்கள்',
 'Detangle gently. If plain coconut oil suits your hair, a small amount on the lengths before washing is optional; no oil is essential, and it will not reliably prevent grey hair.','முடியை மெதுவாகச் சிக்கெடுக்கவும். சாதாரண தேங்காய் எண்ணெய் ஒத்துக்கொண்டால், குளிப்பதற்கு முன் முடி நீளத்தில் சிறிது தடவலாம்; எண்ணெய் கட்டாயமில்லை, நரைமுடியைத் தடுக்கவும் உறுதி இல்லை.'],
 ['wash-scalp','During bathing: clean scalp and body','குளிக்கும் போது: தலைமுடித் தோலையும் உடலையும் சுத்தம் செய்யவும்',
 'Use comfortably warm water. Shampoo the scalp when it needs cleaning; frequency varies by hair and scalp. Keep soaps and oils out of eyes and ears.','மிதமான வெதுவெதுப்பான நீரைப் பயன்படுத்தவும். தேவையானபோது தலைமுடித் தோலை ஷாம்புவால் சுத்தம் செய்யவும்; அடிக்கடி கழுவ வேண்டுமா என்பது ஒவ்வொருவருக்கும் மாறும். கண்களிலும் காதுகளிலும் சோப்பு, எண்ணெய் போகாமல் கவனிக்கவும்.'],
 ['wash-after','After bathing: dry gently','குளித்த பின்: மெதுவாக உலர்த்தவும்',
 'Pat skin dry, including between toes. Moisturise dry skin if needed and put on clean clothes. Do not rub wet hair roughly.','தோலையும் கால்விரல்களுக்கு இடையையும் மெதுவாக உலர்த்தவும். வறண்ட தோலுக்குத் தேவையெனில் ஈரப்பதக் கிரீம் பயன்படுத்தி சுத்தமான உடை அணியவும். ஈர முடியை பலமாகத் தேய்க்க வேண்டாம்.']
];
const meals=[
 ['meal-choice','Choose affordable seasonal ingredients','பருவத்திற்கேற்ற மலிவான பொருட்களைத் தேர்ந்தெடுக்கவும்',
 'Build meals from familiar grains, vegetables and protein foods such as lentils, beans, eggs or fish when available. Use pantry ingredients first.','வழக்கமான தானியங்கள், காய்கறிகள், பருப்பு, பயறு, முட்டை அல்லது கிடைக்கும் மீனுடன் உணவு தயார் செய்யவும். முதலில் வீட்டில் உள்ள பொருட்களைப் பயன்படுத்தவும்.'],
 ['meal-times','Eat for comfort, not strict myths','கட்டுக்கதைக்காக அல்ல, உடல் வசதிக்கேற்பச் சாப்பிடவும்',
 'There is no universal rule that a particular normal food must never be eaten at night or in the morning. Adjust portions and timing for comfort, sleep and personal needs.','குறிப்பிட்ட சாதாரண உணவை இரவில் அல்லது காலையில் சாப்பிடவே கூடாது என்ற பொதுவான விதி இல்லை. பசி, தூக்கம், உடல் வசதிக்கேற்ப நேரத்தையும் அளவையும் மாற்றுங்கள்.'],
 ['meal-water','Drink water regularly','நீரைத் தேவைக்கேற்ப குடிக்கவும்',
 'Have safe drinking water available and drink according to thirst and conditions; individual medical fluid restrictions take priority.','சுத்தமான குடிநீரை அருகில் வைத்துத் தாகம் மற்றும் சூழலுக்கேற்பக் குடிக்கவும்; மருத்துவர் கூறிய நீர் கட்டுப்பாடு இருந்தால் அதையே பின்பற்றவும்.'],
 ['meal-clean','Wash hands and store food safely','கைகளைக் கழுவி உணவைப் பாதுகாப்பாக வைக்கவும்',
 'Wash hands before preparing food; refrigerate perishable leftovers promptly.','உணவு செய்வதற்கு முன் கைகளைக் கழுவவும்; எளிதில் கெடும் மீதி உணவை விரைவில் குளிர்சாதனத்தில் வைக்கவும்.']
];
const night=[
 ['night-mouth','Brush teeth and clean between them','பற்களையும் பல் இடைவெளிகளையும் சுத்தம் செய்யவும்',
 'Brush with fluoride toothpaste; floss or use an appropriate interdental cleaner once daily. A gentle tongue clean is optional.','ஃப்ளூரைடு பற்பசையால் துலக்கவும். நாளுக்கு ஒருமுறை பல் இடைவெளியை ஃப்ளாஸ் அல்லது ஏற்ற கருவியால் சுத்தம் செய்யவும். நாக்கை மெதுவாகச் சுத்தம் செய்வது விருப்பம்.'],
 ['night-sense','Rest your eyes and ears','கண்களுக்கும் காதுகளுக்கும் ஓய்வு கொடுக்கவும்',
 'Reduce loud headphone volume and take comfortable breaks from screens. Do not put oils or objects into eyes or ear canals.','ஹெட்போன் சத்தத்தைக் குறைத்து திரையிலிருந்து இடைவெளி எடுக்கவும். கண்களுக்குள்ளோ காதுக் குழாய்களுக்குள்ளோ எண்ணெய் அல்லது பொருட்களை வைக்க வேண்டாம்.'],
 ['night-home','Leave the kitchen and home clean','சமையலறையையும் வீட்டையும் சுத்தமாக வைக்கவும்',
 'Cover food, wipe preparation areas, and dispose of rubbish responsibly.','உணவை மூடி வைத்து, சமையல் இடத்தைத் துடைத்து, குப்பையை முறையாக அகற்றவும்.'],
 ['night-rest','Make room for sleep','தூக்கத்திற்கு நேரம் ஒதுக்கவும்',
 'Keep a comfortable, consistent sleep routine. A large meal late at night may feel uncomfortable for some people, but specific foods are not universally forbidden.','வசதியான ஒழுங்கான தூக்க வழக்கத்தைப் பின்பற்றவும். தூங்குவதற்கு முன் மிக அதிகமாகச் சாப்பிட்டால் சிலருக்கு அசௌகரியம் இருக்கலாம்; எல்லோருக்கும் ஒரே உணவுத் தடை இல்லை.']
];
const weekly=[
 ['week-nails','Check fingernails and toenails','கைவிரல், கால்விரல் நகங்களைப் பாருங்கள்',
 'Keep tools clean. Trim fingernails as needed; cut toenails straight across and smooth sharp corners. Do not cut cuticles.','நக வெட்டியைச் சுத்தமாக வைத்துக் கொள்ளவும். கைவிரல் நகங்களைத் தேவைக்கேற்ப வெட்டவும்; கால்விரல் நகங்களை நேராக வெட்டி கூர்மையான ஓரங்களை மெதுவாகச் சீர்செய்யவும். நகத்தைச் சுற்றிய தோலை வெட்ட வேண்டாம்.'],
 ['week-hair','Check scalp and hair tools','தலைமுடித் தோலையும் சீப்பையும் கவனிக்கவும்',
 'Wash combs and pillowcases when dirty. If an oil irritates your skin or scalp, stop using it.','சீப்பும் தலையணை உறையும் அழுக்கானால் கழுவவும். எண்ணெயால் எரிச்சல் வந்தால் பயன்படுத்துவதை நிறுத்தவும்.'],
 ['week-home','Clean shared surfaces and cloths','பொது இடங்களையும் துணிகளையும் சுத்தம் செய்யவும்',
 'Wash towels and bed linen as needed; clean bathroom and cooking surfaces, and remove waste. Share household jobs fairly.','துவாலையும் படுக்கைத் துணியையும் தேவைக்கேற்ப கழுவி, குளியலறை, சமையல் இடம் சுத்தம் செய்து, குப்பையை அகற்றவும். வீட்டு வேலைகளை நியாயமாகப் பகிரவும்.'],
 ['week-reflect','Remember one family practice','ஒரு குடும்ப வழக்கத்தை நினைவில் வைத்துக் கொள்ளவும்',
 'Ask an older relative how they learned a practice. Keep their story, the exact ingredients and any uncertainty separate.','ஒரு பெரியவரிடம் அந்த வழக்கத்தை எப்படிக் கற்றார் என்று கேளுங்கள். அவருடைய கதை, பொருட்கள், உறுதி இல்லாத விவரங்கள் ஆகியவற்றைத் தனித்தனியாகப் பதிவு செய்யுங்கள்.']
];
const routines={morning,wash,meals,night,weekly};
const tabs=[['morning','Morning','காலை'],['wash','Bathing','குளியல்'],['meals','Food','உணவு'],['night','Night','இரவு'],['weekly','Weekly','வாரம்']];
const guides=[
 {id:'hair',en:'Hair & scalp',ta:'முடி · தலைமுடித் தோல்',
 good:['Wash the scalp when dirty, treat wet hair gently, and choose affordable products that suit your hair. Coconut oil is optional before a wash, not a daily obligation.','தலையில் அழுக்கு இருந்தால் கழுவுங்கள்; ஈர முடியை மெதுவாகக் கையாளுங்கள். ஒத்துக்கொண்டால் குளிப்பதற்கு முன் தேங்காய் எண்ணெய் பயன்படுத்தலாம்; தினமும் கட்டாயம் இல்லை.'],
 avoid:['No oil, herb or food is proven to restore grey hair to its original colour. Persistent patchy loss, irritation or sudden change deserves assessment.','நரைமுடியின் இயல்பான நிறத்தை எண்ணெய், மூலிகை அல்லது உணவு உறுதியாக மீட்டுத் தராது. திடீர் முடி உதிர்வு அல்லது தொடர்ந்து அரிப்பு இருந்தால் மருத்துவ ஆலோசனை பெறவும்.']},
 {id:'eyes',en:'Eyes & vision',ta:'கண்கள் · பார்வை',
 good:['Use clean hands and take breaks from screens. Protect eyes from strong sunlight when outdoors.','சுத்தமான கைகளைப் பயன்படுத்தி திரையிலிருந்து இடைவெளி எடுக்கவும். வெளியில் கடும் வெயிலிலிருந்து கண்களைப் பாதுகாக்கவும்.'],
 avoid:['Do not put oils, herbal mixtures or household remedies into eyes. Pain, new discharge or vision changes need medical attention.','கண்களில் எண்ணெய், மூலிகைக் கலவை அல்லது வீட்டு வைத்தியம் விட வேண்டாம். வலி, புதிய சீழ்/கசிவு அல்லது பார்வை மாற்றம் இருந்தால் மருத்துவ ஆலோசனை தேவை.']},
 {id:'ears',en:'Ears & hearing',ta:'காதுகள் · கேள்வி',
 good:['Gently wipe the outside of each ear. Keep headphone volume comfortable and take listening breaks.','காதின் வெளிப்பகுதியை மெதுவாகத் துடைக்கவும். ஹெட்போன் சத்தத்தைக் குறைத்து இடைவெளி எடுக்கவும்.'],
 avoid:['Ear canals clean themselves. Do not insert cotton buds, oils or objects; new hearing loss, ear pain or discharge needs assessment.','காதுக் குழாய் இயற்கையாகச் சுத்தமாகும். பஞ்சுக் குச்சி, எண்ணெய், வேறு பொருள் உள்ளே விட வேண்டாம். கேட்கும் திறன் குறைவு, வலி, கசிவு இருந்தால் பரிசோதனை தேவை.']},
 {id:'nose',en:'Nose, breathing & lungs',ta:'மூக்கு · மூச்சு · நுரையீரல்',
 good:['Breathe comfortably through the nose when possible. Take breaks, keep living spaces ventilated and avoid smoke. Gentle mindful breathing is optional.','இயன்ற அளவு இயல்பாக மூச்சு விடுங்கள். இடைவெளி எடுத்து வீட்டில் காற்றோட்டம் வைத்துப் புகையைத் தவிர்க்கவும். மென்மையான மூச்சுக் கவனம் விருப்பம்.'],
 avoid:['Do not force long breath holds or ignore breathlessness. Persistent breathing difficulty needs clinical advice.','மூச்சை வலுக்கட்டாயமாக நீண்ட நேரம் அடக்க வேண்டாம். தொடர்ந்து மூச்சுத்திணறல் இருந்தால் மருத்துவ உதவி தேவை.']},
 {id:'mouth',en:'Mouth, teeth & tongue',ta:'வாய் · பற்கள் · நாக்கு',
 good:['Brush with fluoride toothpaste twice daily and clean between teeth daily. Wash hands before preparing food; enjoy varied tastes without harsh scrubbing of the tongue.','நாளுக்கு இருமுறை ஃப்ளூரைடு பற்பசையால் துலக்கி, பல் இடைவெளிகளை தினமும் சுத்தம் செய்யவும். நாக்கை பலமாகத் தேய்க்க வேண்டாம்.'],
 avoid:['Avoid abrasive home treatments on teeth or gums; persistent pain, bleeding or sores need dental advice.','பற்கள், ஈறுகளில் கடுமையாகத் தேய்க்கும் வீட்டு முறைகளைத் தவிர்க்கவும். தொடர்ந்து வலி, இரத்தம் அல்லது புண் இருந்தால் பல் மருத்துவரை அணுகவும்.']},
 {id:'skin',en:'Skin & bathing',ta:'தோல் · குளியல்',
 good:['Wash gently with comfortably warm water, moisturise when skin is dry, and use suitable sun protection outdoors.','மிதமான வெதுவெதுப்பான நீரில் மெதுவாகக் கழுவி, தோல் வறண்டால் ஈரப்பதக் கிரீம் பயன்படுத்தி வெளியில் வெயில் பாதுகாப்பு ஏற்படுத்தவும்.'],
 avoid:['Natural products can irritate skin too. Avoid applying undiluted essential oils or unfamiliar preparations, especially near eyes.','இயற்கைப் பொருட்களாலும் தோலில் எரிச்சல் வரலாம். செறிவான நறுமண எண்ணெய்களையும் தெரியாத கலவைகளையும் குறிப்பாகக் கண் அருகே தவிர்க்கவும்.']},
 {id:'food',en:'Eating & digestion',ta:'உணவு · செரிமானம்',
 good:['Choose varied, affordable food. Eating times can match hunger, work and sleep; there is no universal morning/night food ban.','பலவகை மலிவான உணவைத் தேர்ந்தெடுக்கவும். பசி, வேலை, தூக்கத்திற்கேற்ப உணவு நேரம் மாறலாம்; காலை/இரவுக்கான பொதுவான உணவுத் தடை இல்லை.'],
 avoid:['Avoid spoiled food and unsupported “detox” claims. Ongoing digestive problems deserve individual medical advice.','கெட்ட உணவையும் ஆதாரமில்லாத “நச்சு நீக்கும்” கூற்றுகளையும் தவிர்க்கவும். தொடர்ந்து செரிமானப் பிரச்சினை இருந்தால் ஆலோசனை பெறவும்.']},
 {id:'organs',en:'Heart, liver & kidneys',ta:'இதயம் · கல்லீரல் · சிறுநீரகம்',
 good:['Regular meals, safe water, rest, comfortable movement and avoiding smoke support general health. These organs do not need special daily cleanses.','ஒழுங்கான உணவு, சுத்தமான நீர், ஓய்வு, இயல்பான இயக்கம், புகையைத் தவிர்ப்பது உடல் நலத்துக்கு உதவும். இந்த உறுப்புகளுக்கு விசேஷ தினசரி “சுத்திகரிப்பு” தேவையில்லை.'],
 avoid:['Herbal mixtures cannot be assumed safe for the liver or kidneys. Follow any advice specific to a diagnosed condition.','மூலிகைக் கலவைகள் கல்லீரல் அல்லது சிறுநீரகத்துக்கு எப்போதும் பாதுகாப்பானவை என்று கருத முடியாது. குறிப்பிட்ட உடல்நிலைக்கு மருத்துவர் கூறியதைப் பின்பற்றவும்.']},
 {id:'limbs',en:'Hands, legs, feet & nails',ta:'கைகள் · கால்கள் · பாதம் · நகங்கள்',
 good:['Wash hands with soap at key times; keep feet dry between toes. Check nails and trim toenails straight across with clean tools.','தேவையான நேரங்களில் சோப்பால் கைகளைக் கழுவவும்; கால்விரல்களுக்கு இடையே ஈரமில்லாமல் வைக்கவும். சுத்தமான கருவியால் கால்நகங்களை நேராக வெட்டவும்.'],
 avoid:['Do not dig into nail corners or cut cuticles. Redness, swelling or persistent foot problems need attention.','நக மூலைகளைத் தோண்டவோ நகத்தைச் சுற்றிய தோலை வெட்டவோ வேண்டாம். சிவத்தல், வீக்கம் அல்லது தொடர்ந்து பாதப் பிரச்சினை இருந்தால் பரிசோதிக்கவும்.']},
 {id:'house',en:'Home & shared spaces',ta:'வீடும் பொதுவான இடங்களும்',
 good:['Care includes clean drinking water, tidy food storage, shared rubbish duties, fresh bedding and clean washrooms. Make duties fair.','சுத்தமான குடிநீர், பாதுகாப்பான உணவுச் சேமிப்பு, குப்பை பொறுப்பு, சுத்தமான படுக்கை, குளியலறை எல்லாமே பராமரிப்பு. வேலையை நியாயமாகப் பகிரவும்.'],
 avoid:['Cleanliness should not become a reason to blame or shame another person.','சுத்தம் என்ற பெயரில் பிறரைக் குற்றம் சொல்லவோ அவமானப்படுத்தவோ வேண்டாம்.']}
];
const ENGLISH=[
 ['I am learning English every day.','நான் ஒவ்வொரு நாளும் ஆங்கிலம் கற்கிறேன்.'],
 ['Please show me how to do this.','இதை எப்படிச் செய்வது என்று காட்டுங்கள்.'],
 ['I need a little more time.','எனக்கு இன்னும் கொஞ்சம் நேரம் வேண்டும்.'],
 ['How much does this cost?','இதன் விலை எவ்வளவு?'],
 ['I will try again tomorrow.','நாளை மீண்டும் முயற்சி செய்வேன்.'],
 ['May I ask you a question?','நான் ஒரு கேள்வி கேட்கலாமா?'],
 ['I understand. Thank you.','எனக்குப் புரிகிறது. நன்றி.']
];
const box=document.createElement('details');
box.id='hcEverydayCareV182';box.className='hc-everyday';
box.innerHTML='<summary><span><strong>Daily care · அன்றாடப் பராமரிப்பு</strong><small>One small habit at a time · எளிய தினசரி வழக்கம்</small></span><span class="hc-care-arrow" aria-hidden="true">⌄</span></summary><div class="hc-care-body" id="hcCareBody"></div>';
kitchen.insertAdjacentElement('afterend',box);
const css=document.createElement('style');css.id='hcCareStyleV182';css.textContent=[
'#home #hcEverydayCareV182{margin:9px 0;padding:0;color:#f1f4f5;border:1px solid #405c69;background:#0b1b24;border-radius:15px;overflow:hidden}',
'#home #hcEverydayCareV182>summary{display:flex;align-items:center;justify-content:space-between;min-height:53px;gap:10px;padding:10px 13px;cursor:pointer;list-style:none}',
'#home #hcEverydayCareV182>summary::-webkit-details-marker{display:none}',
'#home #hcEverydayCareV182>summary strong{display:block;font-size:14px;line-height:1.4}',
'#home #hcEverydayCareV182>summary small{display:block;font-size:11px;color:#bcced5;line-height:1.5;margin-top:2px}',
'#home #hcEverydayCareV182 .hc-care-arrow{color:#d4e3e8;transition:transform .2s}',
'#home #hcEverydayCareV182[open] .hc-care-arrow{transform:rotate(180deg)}',
'#home #hcEverydayCareV182 .hc-care-body{padding:12px 13px 15px;border-top:1px solid #405c69}',
'#home #hcEverydayCareV182 .hc-care-top{display:flex;align-items:center;justify-content:space-between;gap:9px}',
'#home #hcEverydayCareV182 p{font-size:12px;line-height:1.7;color:#dbe6ea;margin:8px 0}',
'#home #hcEverydayCareV182 .hc-care-small{font-size:11px;color:#b8cbd2}',
'#home #hcEverydayCareV182 :is(button,select){font:inherit;color:#f2f5f7;background:#20343f;border:1px solid #6e8792;border-radius:8px;min-height:39px;padding:7px 9px}',
'#home #hcEverydayCareV182 .hc-care-tabs{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0}',
'#home #hcEverydayCareV182 .hc-care-tabs button{flex:1 1 29%;min-width:75px;font-size:12px;padding:7px 5px}',
'#home #hcEverydayCareV182 .hc-care-tabs button[aria-pressed=true]{background:#edf4f6;color:#102632;border-color:#edf4f6;font-weight:700}',
'#home #hcEverydayCareV182 .hc-care-item{display:grid;grid-template-columns:23px minmax(0,1fr);gap:8px;border-bottom:1px solid #354e5a;padding:10px 0;align-items:start;cursor:pointer}',
'#home #hcEverydayCareV182 .hc-care-item input{margin:4px 0;width:18px;height:18px;accent-color:#e0edf0}',
'#home #hcEverydayCareV182 .hc-care-item b{display:block;font-size:13px;line-height:1.5}',
'#home #hcEverydayCareV182 .hc-care-item em{font-style:normal;display:block;color:#cad9df;font-size:12px;line-height:1.65;margin-top:3px}',
'#home #hcEverydayCareV182 .hc-care-sections{margin-top:12px}',
'#home #hcEverydayCareV182 .hc-care-sections details{border-top:1px solid #405d69;padding:9px 0}',
'#home #hcEverydayCareV182 .hc-care-sections summary{cursor:pointer;min-height:35px;font-size:13px;font-weight:650;line-height:1.6}',
'#home #hcEverydayCareV182 .hc-care-guide{padding:8px 0 2px}',
'#home #hcEverydayCareV182 .hc-care-guide details{padding:7px 0;border-top:1px solid #304956}',
'#home #hcEverydayCareV182 .hc-care-guide summary{font-weight:550;font-size:12px}',
'#home #hcEverydayCareV182 .hc-care-source a{color:#daeefa;text-decoration:underline}',
'#home #hcEverydayCareV182 .hc-care-info{padding:8px 10px;border-radius:8px;background:#142a36;border:1px solid #456170}',
'#home #hcEverydayCareV182 :is(button,select,summary,input,a):focus-visible{outline:2px solid white;outline-offset:3px}',
'@media(max-width:345px){#home #hcEverydayCareV182 .hc-care-tabs button{flex-basis:30%;min-width:68px}}'
].join('\n');document.head.append(css);
function render(){
 const markDate=today();
 const savedDay=checks[markDate]||{};
 const todayTasks=routines[period]||morning;
 const dayNum=Math.floor(Date.now()/86400000),sentence=ENGLISH[dayNum%ENGLISH.length];
 const content=document.getElementById('hcCareBody');
 const header='<div class="hc-care-top"><b style="font-size:13px">'+tr('Small daily care','சிறிய தினசரி பராமரிப்பு')+'</b><select id="hcCareLanguage" aria-label="Daily care language"><option value="ta"'+(lang==='ta'?' selected':'')+'>தமிழ்</option><option value="en"'+(lang==='en'?' selected':'')+'>English</option></select></div>'+
 '<p class="hc-care-small">'+tr('A family routine, not a treatment. Choose what fits your day. No streaks or judgement.','இது குடும்பத்தின் தினசரி வழக்கம்; மருத்துவச் சிகிச்சையல்ல. உங்கள் நாளுக்கேற்பத் தேர்ந்தெடுக்கவும்; கட்டாயம் இல்லை.')+'</p>';
 const buttons='<div class="hc-care-tabs" role="group" aria-label="Time of day">'+tabs.map(x=>'<button type="button" data-care-tab="'+x[0]+'" aria-pressed="'+String(x[0]===period)+'">'+escapeText(tr(x[1],x[2]))+'</button>').join('')+'</div>';
 const tasks='<div class="hc-care-tasks">'+todayTasks.map(item=>'<label class="hc-care-item"><input type="checkbox" data-care-check="'+item[0]+'"'+(savedDay[item[0]]?' checked':'')+'><span><b>'+escapeText(tr(item[1],item[2]))+'</b><em>'+escapeText(tr(item[3],item[4]))+'</em></span></label>').join('')+'</div>';
 const bodyGuide='<details id="hcCareGuide"><summary>'+tr('Body-by-body care','உறுப்புகளின் பராமரிப்பு')+' · '+guides.length+'</summary><div class="hc-care-guide">'+guides.map(g=>'<details><summary>'+escapeText(tr(g.en,g.ta))+'</summary><p>'+escapeText(tr(g.good[0],g.good[1]))+'</p><p>'+escapeText(tr(g.avoid[0],g.avoid[1]))+'</p></details>').join('')+'</div></details>';
 const learning='<details id="hcCareLearn"><summary>'+tr('Auntie’s dream: learn English','அத்தையின் ஆசை: ஆங்கிலம் கற்கலாம்')+'</summary><p class="hc-care-info" lang="en"><strong>'+escapeText(sentence[0])+'</strong></p><p lang="ta">'+escapeText(sentence[1])+'</p><p>'+tr('Practise one sentence. Speak slowly. No exam.','ஒரு வாக்கியம் மட்டும் பயிற்சி செய்யுங்கள். மெதுவாகப் பேசுங்கள். தேர்வு இல்லை.')+'</p></details>';
 const heritage='<details id="hcCareHeritage"><summary>'+tr('Family traditions · Wudu · Ayurveda','குடும்ப மரபுகள் · உளூ · ஆயுர்வேதம்')+'</summary>'+
 '<p>'+tr('Wudu is an Islamic act of worship and intentional cleanliness. Respect its religious meaning and individual practice. Ordinary handwashing with soap is still important for food safety and after the toilet.','உளூ என்பது இஸ்லாமிய வழிபாட்டுடனும் தூய்மையுடனும் தொடர்புடையது. அதன் ஆன்மிக அர்த்தத்தையும் ஒவ்வொருவரின் வழக்கத்தையும் மதிப்போம். உணவுப் பாதுகாப்புக்கும் கழிவறைக்குப் பிறகும் சோப்பால் கைகளைக் கழுவுவது அவசியம்.')+'</p>'+
 '<p>'+tr('Tamil family knowledge and Ayurveda can be studied as traditions, with ingredients and origins recorded accurately. Traditional does not automatically mean safe or medically proven.','தமிழர் குடும்ப அறிவையும் ஆயுர்வேதத்தையும் மரபுகளாகக் கற்றுக் கொள்ளலாம்; பொருட்களையும் மூலத்தையும் சரியாகப் பதிவு செய்வோம். மரபானது என்பதால் மட்டும் பாதுகாப்பானது அல்லது அறிவியலால் நிரூபிக்கப்பட்டது என்று அர்த்தமில்லை.')+'</p>'+
 '<p>'+tr('Astrological calendars may be meaningful culturally or spiritually, but there is no reliable evidence that a particular planetary day prevents grey hair or cures an organ.','ஜோதிடக் காலண்டர் பண்பாட்டு அல்லது ஆன்மிக அர்த்தம் கொண்டிருக்கலாம். ஆனால் ஒரு கிரக நாள் நரைமுடியைத் தடுக்கும் அல்லது உறுப்பைக் குணப்படுத்தும் என்பதற்கு நம்பகமான அறிவியல் ஆதாரம் இல்லை.')+'</p></details>';
 const resources='<details id="hcCareEvidence"><summary>'+tr('Evidence & safety references','ஆதாரம் · பாதுகாப்பு')+'</summary><p class="hc-care-source"><a target="_blank" rel="noopener noreferrer" href="https://www.aad.org/public/everyday-care/hair-scalp-care/hair/gray-hair-causes">American Academy of Dermatology — grey hair</a></p><p class="hc-care-source"><a target="_blank" rel="noopener noreferrer" href="https://www.mouthhealthy.org/oral-health-recommendations">American Dental Association — oral care</a></p><p class="hc-care-source"><a target="_blank" rel="noopener noreferrer" href="https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-ear-care/">WHO — ear care</a></p><p class="hc-care-source"><a target="_blank" rel="noopener noreferrer" href="https://www.cdc.gov/hygiene/about/nail-hygiene.html">CDC — nail hygiene</a></p></details>';
 const kitchenLink='<button type="button" id="hcCareGoKitchen" style="width:100%;margin:9px 0 0">'+tr('Open affordable family meals ›','மலிவான குடும்ப உணவுகளைத் திறக்க ›')+'</button>';
 content.innerHTML=header+buttons+tasks+'<div class="hc-care-sections">'+bodyGuide+learning+heritage+resources+'</div>'+kitchenLink;
 content.querySelector('#hcCareLanguage').addEventListener('change',ev=>{lang=ev.target.value==='en'?'en':'ta';try{localStorage.setItem(LANG_KEY,lang)}catch(e){}render()});
 content.querySelectorAll('[data-care-tab]').forEach(button=>button.addEventListener('click',()=>{period=button.dataset.careTab;render()}));
 content.querySelectorAll('[data-care-check]').forEach(check=>check.addEventListener('change',()=>{
    // Per-day settings, not a streak, reminder, clinical measurement or account record.
    const day=today();checks[day]||={};checks[day][check.dataset.careCheck]=check.checked;
    // Retain at most 7 days of on-device checkmarks, without a pressured progress score.
    const keys=Object.keys(checks).sort();for(const k of keys.slice(0,Math.max(0,keys.length-7)))delete checks[k];
    save(CHECK_KEY,checks);
 }));
 content.querySelector('#hcCareGoKitchen').addEventListener('click',()=>{
    const dst=document.getElementById('hcMonthlyKitchen')||document.getElementById('hcFamilyKitchen');
    if(dst){dst.hidden=false;dst.closest('details')?.setAttribute('open','');dst.scrollIntoView({block:'start',behavior:'smooth'});}
 });
}
render();
})();