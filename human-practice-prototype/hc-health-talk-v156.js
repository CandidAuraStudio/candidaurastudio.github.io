/* HeartClear · symptom conversation v156
   Educational symptom organiser, NOT a diagnostic model or emergency service.
   No answers saved, no network diagnostic API, no medicine prescriptions.
*/
(function(){
'use strict';
const parent=document.getElementById('hcExploreDialog');
if(!parent||document.getElementById('hcHealthTalk'))return;
const label=(en,ta)=>({en,ta});
const kinds={
 headache:{name:label('Head / headache','தலை / தலைவலி'),pattern:/headache|migraine|head pain|throbbing head|தலை.?வலி|thalai\s*vali|thala\s*vali|thalaivali/i,
  professional:label('Start with a GP or primary-care doctor. They may refer you to a neurologist or eye specialist if needed.','முதலில் பொதுமருத்துவரை அணுகவும். தேவைப்பட்டால் நரம்பியல் அல்லது கண் நிபுணரிடம் பரிந்துரைப்பார்.'),
  urgent:label('Is the headache worsening, recurring, accompanied by repeated vomiting, or causing changes in vision?','தலைவலி அதிகரிக்கிறதா, மீண்டும் மீண்டும் வருகிறதா, அடிக்கடி வாந்தி வருகிறதா அல்லது பார்வை மாறுகிறதா?'),
  emergency:label('Did the headache start suddenly at extreme intensity, or come with new weakness, difficulty speaking, loss of sight, seizures, or fever with a stiff neck?','தலைவலி திடீரென மிகக் கடுமையாகத் தொடங்கியதா? புதிய பலவீனம், பேச்சுச் சிரமம், பார்வை இழப்பு, வலிப்பு, அல்லது காய்ச்சலுடன் கழுத்து இறுக்கம் உள்ளதா?'),
  care:label('Keep normal meals and fluids, take breaks from screens and rest. Record when the headache starts and any associated symptoms. Ask a clinician or pharmacist before taking medicines.','வழக்கமான உணவு, தண்ணீர், ஓய்வு ஆகியவற்றைக் கவனிக்கவும். திரையைப் பார்ப்பதில் இடைவெளி எடுக்கவும். தலைவலி தொடங்கும் நேரமும் உடன் வரும் அறிகுறிகளையும் குறித்துக் கொள்ளவும். மருந்துக்கு முன் மருத்துவர் அல்லது மருந்தாளரிடம் கேளுங்கள்.'),
  link:['NHS · Headaches','https://www.nhs.uk/symptoms/headaches/']},
 eye:{name:label('Eye / vision','கண் / பார்வை'),pattern:/\beye\b|eyelid|eyes|eyesight|vision|blurred|conjunctiv|கண்|பார்வை|kan\s*vali|kannu\s*vali/i,
  professional:label('Ask for a prompt examination by an optometrist or doctor. Significant eye symptoms may need an ophthalmologist (eye specialist).','கண் பரிசோதனைக்காக கண் பரிசோதகர் அல்லது மருத்துவரை விரைவில் அணுகவும். முக்கியமான பிரச்சனைகளுக்கு கண் நிபுணர் தேவைப்படலாம்.'),
  urgent:label('Is the eye very red, painful, sensitive to light, swollen, or has vision changed?','கண் மிகவும் சிவந்துள்ளதா, வலிக்கிறதா, வெளிச்சம் எரிச்சலாக உள்ளதா, வீக்கம் உள்ளதா அல்லது பார்வை மாறியுள்ளதா?'),
  emergency:label('Have you suddenly lost vision, developed very severe eye pain, or had an eye injury? Or a very red eye with a severe headache and nausea?','திடீரென பார்வை இழப்பு, மிகக் கடுமையான கண் வலி, கண் காயம் ஏற்பட்டதா? அல்லது கடுமையான தலைவலி, குமட்டலுடன் கண் மிகவும் சிவந்துள்ளதா?'),
  care:label('Do not rub the eye. Avoid contact lenses if the eye is painful or red and seek prompt assessment. Do not use old prescription eye drops without advice.','கண்ணைத் தேய்க்க வேண்டாம். கண் வலி அல்லது சிவப்பு இருந்தால் கான்டாக்ட் லென்ஸ் தவிர்த்து பரிசோதனை பெறவும். பழைய மருந்துக் கண் சொட்டுகளை அறிவுரையின்றிப் பயன்படுத்த வேண்டாம்.'),
  link:['NHS · Eye pain','https://www.nhs.uk/symptoms/eye-pain/']},
 tummy:{name:label('Stomach / abdomen','வயிறு'),pattern:/stomach|belly|tummy|abdom|nausea|vomit|diarrh|constipat|gastric|gastritis|vayiru|vayitru|வயிறு|வாந்தி|மலச்சிக்கல்/i,
  professional:label('A GP or primary-care clinician is a sensible starting point; persistent digestive symptoms may require a gastroenterology referral.','முதலில் பொதுமருத்துவரை அணுகலாம். தொடரும் செரிமானப் பிரச்சனைகளுக்கு குடலியல் நிபுணர் பரிந்துரை தேவைப்படலாம்.'),
  urgent:label('Is the pain getting much worse, repeatedly returning, associated with persistent vomiting, fever, or abnormal bleeding?','வலி அதிகரிக்கிறதா, மீண்டும் வருகிறதா, தொடர்ந்து வாந்தி, காய்ச்சல் அல்லது அசாதாரண இரத்தப்போக்கு உள்ளதா?'),
  emergency:label('Is the abdominal pain sudden and severe, very tender to touch, or accompanied by vomiting blood, black sticky stools, or inability to pass urine or stool/gas?','வயிற்று வலி திடீரென மிகக் கடுமையாக உள்ளதா? தொட்டால் மிகவும் வலிக்கிறதா? இரத்த வாந்தி, கருப்பு ஒட்டும் மலம், சிறுநீர் அல்லது மலம்/வாயு வெளியேறாமை உள்ளதா?'),
  care:label('If you can eat and drink comfortably, keep fluids and ordinary balanced meals. Avoid forcing food during severe pain or vomiting; seek assessment. Do not self-start antibiotics.','உணவும் தண்ணீரும் எடுத்துக்கொள்ள முடிந்தால் வழக்கமான சமநிலை உணவையும் நீரையும் தொடரவும். கடுமையான வலி அல்லது வாந்தி இருந்தால் உணவை வற்புறுத்த வேண்டாம்; பரிசோதனை பெறவும். நுண்ணுயிர் எதிர்ப்பு மருந்தைத் தானாகத் தொடங்க வேண்டாம்.'),
  link:['NHS · Stomach ache','https://www.nhs.uk/symptoms/stomach-ache/']},
 urinary:{name:label('Urine / bladder / genital pain','சிறுநீர் / சிறுநீர்ப்பை / பிறப்புறுப்பு வலி'),pattern:/urin|urinary|pee\b|peeing|painful pee|burning pee|bladder|testicle|penis|prostate|kidney|சிறுநீர்|மூத்திரம்|ஆணுறுப்பு|விதைப்பை|moothiram|siru\s*neer/i,
  professional:label('Contact a GP, especially for painful urination or fever. The GP may arrange a urine test or refer to a urologist.','சிறுநீர் வலி அல்லது காய்ச்சல் இருந்தால் பொதுமருத்துவரை அணுகவும். சிறுநீர் பரிசோதனை அல்லது சிறுநீரியல் நிபுணர் பரிந்துரை தேவைப்படலாம்.'),
  urgent:label('Is there fever or shivering, blood in the urine, pain below the ribs, or are urinary symptoms getting worse?','காய்ச்சல் அல்லது நடுக்கம், சிறுநீரில் இரத்தம், விலா எலும்பின் கீழ் வலி அல்லது சிறுநீர் அறிகுறிகள் அதிகரித்துள்ளனவா?'),
  emergency:label('Are you completely unable to pass urine even though you need to, or is there sudden severe testicle pain?','சிறுநீர் கழிக்க வேண்டியிருந்தும் முற்றிலும் கழிக்க முடியவில்லையா? அல்லது விதைப்பையில் திடீர் கடுமையான வலி உள்ளதா?'),
  care:label('Do not delay getting checked for painful urination. Drink according to normal thirst unless a clinician has restricted fluids. A clinician decides if tests or antibiotics are appropriate.','சிறுநீர் வலியை அலட்சியம் செய்ய வேண்டாம். மருத்துவர் நீரைக் கட்டுப்படுத்தச் சொல்லாவிட்டால் இயல்பான தாகத்திற்கேற்ப குடிக்கவும். பரிசோதனை அல்லது நுண்ணுயிர் எதிர்ப்பு மருந்து தேவையா என்பதை மருத்துவர் தீர்மானிப்பார்.'),
  link:['NHS · UTIs','https://www.nhs.uk/conditions/urinary-tract-infections-utis/']},
 chest:{name:label('Chest / breathing','மார்பு / மூச்சு'),pattern:/chest|heart pain|breath|breathing|shortness of breath|lungs|palpit|நெஞ்சு|மார்பு|மூச்சு|moochu/i,
  professional:label('New chest pain or breathing symptoms should be assessed promptly by a medical service. A GP may arrange heart or lung investigations or referral.','புதிய மார்பு வலி அல்லது மூச்சுச் சிரமத்திற்கு விரைவான மருத்துவ மதிப்பீடு தேவை. பொதுமருத்துவர் இதயம்/நுரையீரல் பரிசோதனை அல்லது நிபுணர் பரிந்துரை செய்யலாம்.'),
  urgent:label('Do you have shortness of breath, palpitations, coughing up blood, or chest discomfort that is new or worsening?','மூச்சுத்திணறல், இதயத் துடிப்பு மாறுதல், இரத்தம் கலந்த இருமல் அல்லது புதிய/அதிகரிக்கும் மார்பு வலி உள்ளதா?'),
  emergency:label('Is there chest tightness or heaviness, pain spreading to the arm/jaw/back, severe difficulty breathing, or fainting?','மார்பு இறுக்கம் அல்லது அழுத்தம், கை/தாடை/முதுகுக்குப் பரவும் வலி, கடுமையான மூச்சுச் சிரமம் அல்லது மயக்கம் உள்ளதா?'),
  care:label('Stop strenuous activity until assessed. For severe or worsening symptoms, do not continue this check-in: seek urgent medical help. Do not attempt to treat chest pain with diet changes alone.','மருத்துவ மதிப்பீடு கிடைக்கும் வரை கடின உடற்பயிற்சியைத் தவிர்க்கவும். கடுமையான அல்லது அதிகரிக்கும் அறிகுறிகள் இருந்தால் உடனடி உதவி பெறவும். உணவுமாற்றம் மட்டுமே மார்பு வலிக்கான சிகிச்சை அல்ல.'),
  link:['NHS · Shortness of breath','https://www.nhs.uk/symptoms/shortness-of-breath/']},
 back:{name:label('Back / joints / muscles','முதுகு / மூட்டு / தசைகள்'),pattern:/\bback\b|spine|shoulder|knee|joint|thigh|leg pain|hip|muscle|neck pain|முதுகு|மூட்டு|தொடை|கால்|இடுப்பு|கழுத்து/i,
  professional:label('Start with a GP or musculoskeletal clinician. They may suggest physiotherapy or specialist review if appropriate.','முதலில் பொதுமருத்துவர் அல்லது தசை-மூட்டு பரிசோதகர் உதவலாம். தேவைக்கேற்ப உடற்பயிற்சி சிகிச்சை அல்லது நிபுணர் பரிசோதனை பரிந்துரைக்கலாம்.'),
  urgent:label('Is pain suddenly severe or rapidly worsening, or accompanied by fever, marked swelling or new weakness?','வலி திடீரென மிகக் கடுமையானதா, விரைவில் அதிகரிக்கிறதா, காய்ச்சல், குறிப்பிடத்தக்க வீக்கம் அல்லது புதிய பலவீனம் உள்ளதா?'),
  emergency:label('With back pain, is there new loss of bladder/bowel control, numbness around the groin, or weakness/numbness in both legs?','முதுகுவலியுடன் புதிய சிறுநீர்/மலக் கட்டுப்பாட்டு இழப்பு, பிறப்புறுப்பு சுற்றி உணர்வின்மை, அல்லது இரு கால்களிலும் பலவீனம்/உணர்வின்மை உள்ளதா?'),
  care:label('Avoid movements that strongly worsen the pain. Comfortable gentle movement is often better than prolonged bed rest for ordinary back pain. Seek medical advice if it persists or changes.','வலியை மிகவும் அதிகரிக்கும் அசைவுகளைத் தவிர்க்கவும். சாதாரண முதுகுவலிக்கு நீண்ட படுக்கை ஓய்வைவிட மென்மையான இயல்பான அசைவு உதவலாம். வலி தொடர்ந்தால் அல்லது மாறினால் மருத்துவ ஆலோசனை பெறவும்.'),
  link:['NHS · Back pain','https://www.nhs.uk/conditions/back-pain/']},
 tooth:{name:label('Teeth / mouth','பல் / வாய்'),pattern:/tooth|teeth|dent|gums|jaw pain|பல்|ஈறு|பற்கள்|pal\s*vali/i,
  professional:label('A dentist is the correct first professional for tooth or gum pain.','பல் அல்லது ஈறு வலிக்கு முதலில் பல் மருத்துவரை அணுகவும்.'),
  urgent:label('Is there growing face or gum swelling, fever, severe pain disturbing sleep, or a mouth wound that does not heal?','முகம்/ஈறு வீக்கம் அதிகரிக்கிறதா, காய்ச்சல், தூக்கத்தைப் பாதிக்கும் கடுமையான வலி, அல்லது ஆறாத வாய்ப்புண் உள்ளதா?'),
  emergency:label('Is swelling making it hard to breathe, swallow or speak, or spreading around the eye or neck?','வீக்கத்தால் மூச்சு விட, விழுங்க அல்லது பேசச் சிரமமா? வீக்கம் கண் அல்லது கழுத்தைச் சுற்றிப் பரவுகிறதா?'),
  care:label('Choose comfortable foods and avoid chewing on the sore side. Ask a dentist or pharmacist about suitable pain relief; antibiotics are not a substitute for dental treatment.','எளிதாகச் சாப்பிடக்கூடிய உணவைத் தேர்ந்தெடுத்து வலிக்கும் பக்கத்தில் கடிப்பதைத் தவிர்க்கவும். வலி மருந்து பற்றி பல் மருத்துவர் அல்லது மருந்தாளரிடம் கேளுங்கள். நுண்ணுயிர் எதிர்ப்பு மருந்து மட்டும் பல் சிகிச்சைக்கு மாற்றல்ல.'),
  link:['NHS · Toothache','https://www.nhs.uk/symptoms/toothache/']},
 skin:{name:label('Skin / rash','தோல் / அரிப்பு / தடிப்பு'),pattern:/skin|rash|itch|hives|allerg|swelling|தோல்|அரிப்பு|சொறி/i,
  professional:label('A GP or pharmacist can help with many skin concerns; some need dermatology or allergy assessment.','பல தோல் பிரச்சனைகளுக்கு பொதுமருத்துவர் அல்லது மருந்தாளர் உதவலாம். சிலவற்றிற்கு தோல் அல்லது ஒவ்வாமை நிபுணர் தேவைப்படலாம்.'),
  urgent:label('Is the rash spreading quickly, painful, associated with fever, or are you feeling very unwell?','தடிப்பு விரைவாகப் பரவுகிறதா, வலிக்கிறதா, காய்ச்சல் அல்லது அதிக உடல்நலக்குறைவு உள்ளதா?'),
  emergency:label('Is there sudden tongue, lip or throat swelling, or difficulty breathing after a possible allergic reaction?','ஒவ்வாமைக்குப் பிறகு நாக்கு, உதடு அல்லது தொண்டை திடீரென வீங்கியுள்ளதா, அல்லது மூச்சுச் சிரமமா?'),
  care:label('Avoid scratching and note possible new soaps, foods or exposures. Seek advice rather than applying unknown medicated creams to a worsening rash.','சொறிவதைத் தவிர்த்து புதிய சோப்பு, உணவு அல்லது தொடர்புகள் இருந்ததா கவனிக்கவும். அதிகரிக்கும் தடிப்பில் தெரியாத மருந்துக் கிரீம்களைப் பயன்படுத்தாமல் ஆலோசனை பெறவும்.'),
  link:['NHS · Allergies','https://www.nhs.uk/conditions/allergies/']},
 cough:{name:label('Cough / throat / fever','இருமல் / தொண்டை / காய்ச்சல்'),pattern:/cough|throat|sore throat|fever|cold|flu|temperature|இருமல்|தொண்டை|காய்ச்சல்|சளி/i,
  professional:label('A GP or pharmacist can assess common coughs and sore throats. Persistent fever, breathing difficulty or worsening illness warrants clinical assessment.','சாதாரண இருமல், தொண்டை வலிக்கு பொதுமருத்துவர் அல்லது மருந்தாளர் உதவலாம். நீடிக்கும் காய்ச்சல், மூச்சுச் சிரமம் அல்லது அதிகரிக்கும் நோய்க்கு மருத்துவப் பரிசோதனை தேவை.'),
  urgent:label('Is the fever persisting, are you getting much worse, unable to keep fluids down, or feeling breathless?','காய்ச்சல் நீடிக்கிறதா, உடல்நலம் மோசமடைகிறதா, நீர் குடித்தாலும் தங்கவில்லையா, அல்லது மூச்சுச் சிரமம் உள்ளதா?'),
  emergency:label('Is breathing severely difficult, are you very confused, or is there sudden swelling in the throat?','மிகக் கடுமையான மூச்சுச் சிரமம், அதிக குழப்பம் அல்லது தொண்டையில் திடீர் வீக்கம் உள்ளதா?'),
  care:label('Rest and drink according to thirst. A pharmacist or doctor can check whether symptom relief is suitable. Antibiotics are not routinely useful for viral colds.','ஓய்வு எடுத்து தாகத்திற்கேற்ப தண்ணீர் குடிக்கவும். அறிகுறி நிவாரணத்திற்கு ஏற்ற மருந்து பற்றி மருந்தாளர் அல்லது மருத்துவர் ஆலோசனை தரலாம். வைரஸ் சளிக்கு நுண்ணுயிர் எதிர்ப்பு மருந்துகள் வழக்கமாகப் பயன்படாது.'),
  link:['NHS · Shortness of breath','https://www.nhs.uk/symptoms/shortness-of-breath/']},
 other:{name:label('Other / not sure','வேறு பிரச்சனை / தெரியவில்லை'),pattern:/$^/,
  professional:label('Start with a GP or general clinician, who can decide if a specialist is appropriate.','முதலில் பொதுமருத்துவரை அணுகவும்; நிபுணர் தேவையா என்பதை அவர் முடிவு செய்வார்.'),
  urgent:label('Are symptoms quickly worsening, accompanied by fever, new weakness, unusual bleeding, or difficulty doing normal activities?','அறிகுறிகள் விரைவாக அதிகரிக்கிறதா, காய்ச்சல், புதிய பலவீனம், அசாதாரண இரத்தப்போக்கு அல்லது வழக்கமான செயல்களில் சிரமமா?'),
  emergency:label('Is there any sudden severe pain, collapse, serious trouble breathing, or new confusion or weakness?','திடீர் கடுமையான வலி, மயக்கம், கடுமையான மூச்சுச் சிரமம், புதிய குழப்பம் அல்லது பலவீனம் உள்ளதா?'),
  care:label('Write down when symptoms began, what makes them better or worse, and any medicines already taken. Do not try to diagnose yourself from a checklist.','அறிகுறிகள் தொடங்கிய நேரம், அதிகரிக்கும்/குறையும் சூழல், ஏற்கனவே எடுத்த மருந்து ஆகியவற்றைக் குறித்துக் கொள்ளவும். கேள்விப் பட்டியலிலிருந்து தானாக நோய் கண்டறிய வேண்டாம்.'),
  link:['NHS · Headaches','https://www.nhs.uk/symptoms/headaches/']}
};
function detect(text){
 const matches=Object.entries(kinds).filter(([key,k])=>key!=='other'&&k.pattern.test(text)).map(([key])=>key);
 return matches.length===1?matches[0]:null;
}
const labels={yes:label('Yes','ஆம்'),no:label('No','இல்லை'),unsure:label('Not sure','தெரியவில்லை')};
const universal=label(
 'Are any of these happening NOW: severe breathing trouble, heavy chest pain, sudden weakness or speech trouble, collapse, sudden loss of sight, severe sudden pain, or rapid swelling of the tongue or throat?',
 'இப்போது இவற்றில் ஏதேனும் உள்ளதா: கடுமையான மூச்சுச் சிரமம், மார்பு அழுத்த வலி, திடீர் பலவீனம்/பேச்சுச் சிரமம், மயக்கம், திடீர் பார்வை இழப்பு, திடீர் மிகக் கடுமையான வலி, நாக்கு அல்லது தொண்டையில் விரைவான வீக்கம்?'
);
const extraUrgent=label('Is any of this associated with your symptoms?','உங்கள் அறிகுறிகளுடன் இதுவும் உள்ளதா?');
const ages=[['child',label('Child / teen','குழந்தை / இளைஞர்')],['adult',label('Adult','பெரியவர்')],['older',label('Older adult','முதியவர்')],['unknown',label('Not sure','தெரியவில்லை')]];
const durations=[['today',label('Started today','இன்று தொடங்கியது')],['few',label('2–3 days','2–3 நாட்கள்')],['long',label('Longer / keeps coming back','நீண்ட நாட்கள் / மீண்டும் மீண்டும்')],['unknown',label('Not sure','தெரியவில்லை')]];
const severities=[['mild',label('Mild','லேசானது')],['moderate',label('Moderate','மிதமானது')],['severe',label('Severe / limits daily activities','கடுமையானது / வழக்கமான செயல்களைப் பாதிக்கும்')],['unknown',label('Not sure','தெரியவில்லை')]];
let data={complaint:'',kind:null,age:null,duration:null,severity:null,urgent:null,red:null,specific:null};
let stage='describe',lang='both',recognition=null,consented=false,sourceDialog=null,token=0;
try{const v=localStorage.getItem('hcHealthTalkLanguage');if(['both','en','ta'].includes(v))lang=v}catch(e){}
function tr(v){if(typeof v==='string')return v;return lang==='en'?v.en:lang==='ta'?v.ta:v.en+'\n'+v.ta}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function html(v){return esc(tr(v)).replace(/\n/g,'<span class="hc-health-ta-break"></span>')}
function stopMic(){token++;if(recognition){const r=recognition;recognition=null;r.onresult=r.onerror=r.onend=null;try{r.abort()}catch(e){}}}
const dlg=document.createElement('dialog');dlg.id='hcHealthTalk';dlg.setAttribute('aria-label','HeartClear · Describe a health concern');document.body.append(dlg);
const style=document.createElement('style');style.textContent=[
'#hcHealthTalk{box-sizing:border-box;width:min(95vw,520px);max-height:90dvh;margin:auto;padding:0;border:1px solid #677078;border-radius:19px;background:#111519;color:#f5f7f7;font:inherit;color-scheme:dark;overflow:auto;overscroll-behavior:contain}',
'#hcHealthTalk::backdrop{background:rgba(0,0,0,.79)}',
'#hcHealthTalk *{box-sizing:border-box}',
'#hcHealthTalk .head{position:sticky;top:0;background:#111519;border-bottom:1px solid #333a40;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;z-index:2}',
'#hcHealthTalk .head b{font-size:15px}',
'#hcHealthTalk .body{padding:17px 17px 26px}',
'#hcHealthTalk h2{font-size:22px;line-height:1.3;margin:7px 0 13px;letter-spacing:-.03em}',
'#hcHealthTalk h3{font-size:15px;margin:15px 0 5px}',
'#hcHealthTalk .help{font-size:12px;line-height:1.65;color:#c4ced3;white-space:pre-line}',
'#hcHealthTalk .trans{display:block;margin:5px 0 9px;color:#e5e9eb;line-height:1.7;white-space:pre-line;font-size:13px}',
'#hcHealthTalk .hc-health-ta-break{display:block;height:5px}',
'#hcHealthTalk textarea{width:100%;min-height:110px;border:1px solid #73808a;background:#202a31;color:#fff;border-radius:11px;padding:12px;font:inherit;font-size:16px;line-height:1.5;resize:vertical}',
'#hcHealthTalk :is(button,select){font:inherit;cursor:pointer;color:#fff}',
'#hcHealthTalk .close{border:1px solid #606970;background:transparent;min-width:40px;height:40px;border-radius:50%;font-size:22px}',
'#hcHealthTalk .languages{display:flex;align-items:center;gap:9px;font-size:11px;color:#b8c9ce}',
'#hcHealthTalk select{background:#222d34;border:1px solid #687880;border-radius:9px;min-height:40px;padding:7px 9px;font-size:12px}',
'#hcHealthTalk .choices{display:grid;gap:9px;margin:15px 0}',
'#hcHealthTalk .choices button{width:100%;text-align:left;min-height:46px;padding:11px 13px;border:1px solid #727d82;border-radius:10px;background:#212b31;font-size:13px;line-height:1.6;white-space:pre-line}',
'#hcHealthTalk .choices.three{grid-template-columns:repeat(3,minmax(0,1fr))}',
'#hcHealthTalk .choices.three button{text-align:center;padding:9px 5px;font-size:12px}',
'#hcHealthTalk .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:15px}',
'#hcHealthTalk .actions button{padding:10px 12px;min-height:43px;background:#1d2a31;border:1px solid #65737c;border-radius:10px;font-size:12px}',
'#hcHealthTalk .primary{background:#f1f3ed!important;color:#0e1b23!important;border:1px solid #f1f3ed!important;font-weight:700!important}',
'#hcHealthTalk .example-row{display:flex;gap:7px;flex-wrap:wrap;margin:11px 0}',
'#hcHealthTalk .example-row button{background:#1b2b34;border:1px solid #536772;border-radius:999px;padding:7px 10px;font-size:11px}',
'#hcHealthTalk .warning{border-left:3px solid #f5f2ec;padding-left:12px;margin:10px 0}',
'#hcHealthTalk .warning p{color:#fff}',
'#hcHealthTalk .result{font-size:13px;line-height:1.7;color:#d5e0e3}',
'#hcHealthTalk .result div{margin:12px 0}',
'#hcHealthTalk .result strong{display:block;margin-bottom:4px;color:#fff}',
'#hcHealthTalk a{color:#d3e5ed;display:block;font-size:12px;margin:10px 0;overflow-wrap:anywhere}',
'#hcHealthTalk details{border-top:1px solid #404b51;margin-top:17px;padding-top:9px}',
'#hcHealthTalk summary{cursor:pointer;font-size:12px}',
'#hcHealthTalk .status{min-height:17px;margin:11px 0 0;font-size:12px;color:#c5d4da}',
'#hcHealthTalk :focus-visible{outline:2px solid white;outline-offset:3px}',
'@media(max-width:360px){#hcHealthTalk .choices.three{grid-template-columns:1fr 1fr 1fr}#hcHealthTalk .body{padding:14px}}'
].join('\n');document.head.append(style);
function readStatus(){return dlg.querySelector('#hchtStatus')}
function status(msg){const s=readStatus();if(s)s.textContent=msg}
function reset(){stopMic();data={complaint:'',kind:null,age:null,duration:null,severity:null,urgent:null,red:null,specific:null};stage='describe';consented=false}
function exit(){stopMic();dlg.close();reset();if(sourceDialog?.open)sourceDialog.querySelector('[data-mode="health"]')?.focus();sourceDialog=null}
function intro(){
 return '<div class="languages"><label for="hchtLang">Language / மொழி</label><select id="hchtLang"><option value="both"'+(lang==='both'?' selected':'')+'>English + தமிழ்</option><option value="en"'+(lang==='en'?' selected':'')+'>English</option><option value="ta"'+(lang==='ta'?' selected':'')+'>தமிழ்</option></select></div>';
}
function choiceButtons(arr,property){return '<div class="choices '+(arr.length===3?'three':'')+'">'+arr.map(([value,caption])=>'<button type="button" data-answer="'+esc(value)+'" data-property="'+property+'">'+html(caption)+'</button>').join('')+'</div>'}
function navigation(){return '<div class="actions"><button type="button" data-act="back">'+html(label('Back','பின்செல்'))+'</button><button type="button" data-act="restart">'+html(label('Start again','மீண்டும் தொடங்கு'))+'</button></div>'}
function outcome(){
 const k=kinds[data.kind]||kinds.other;
 let level='routine';
 if(data.red==='yes'||data.specific==='yes')level='emergency';
 else if(data.red==='unsure'||data.specific==='unsure')level='urgent';
 else if(data.urgent!=='no'||data.severity==='severe'||data.kind==='chest'||data.kind==='urinary'||data.kind==='eye')level='urgent';
 else if(data.duration==='long'||data.age==='older'||data.age==='child'||data.age==='unknown')level='soon';
 const head=level==='emergency'?label('Emergency medical help now','உடனடி அவசர மருத்துவ உதவி'):level==='urgent'?label('Seek medical advice today','இன்றே மருத்துவ ஆலோசனை பெறவும்'):label('Arrange a healthcare review','மருத்துவ ஆலோசனையை ஏற்பாடு செய்யவும்');
 const rationale=level==='emergency'?label('These answers may indicate an emergency. Stop the check-in. Call your local emergency number or go to emergency care. Do not drive yourself.','இந்த பதில்கள் அவசரப் பிரச்சனையைக் குறிக்கலாம். உடனே இந்தச் சரிபார்ப்பை நிறுத்தி உள்ளூர் அவசர எண்ணை அழைக்கவும் அல்லது அவசர சிகிச்சைக்குச் செல்லவும். நீங்களே வாகனம் ஓட்ட வேண்டாம்.'):
 level==='urgent'?label('The answers need timely assessment. If any severe emergency warning signs develop, seek emergency help immediately.','இந்த பதில்களுக்கு விரைவான மதிப்பீடு தேவை. ஆபத்தான அறிகுறிகள் தோன்றினால் உடனடியாக அவசர உதவி பெறவும்.'):
 label('This short guide cannot rule out a serious condition. Contact a clinician if symptoms concern you, persist, recur or change.','இந்தச் சிறிய வழிகாட்டி தீவிர நோயை நிராகரிக்க முடியாது. அறிகுறிகள் கவலை அளித்தாலோ, தொடர்ந்தாலோ, மீண்டும் வந்தாலோ, மாறினாலோ மருத்துவரை அணுகவும்.');
 return {level,head,rationale,k};
}
function summary(){
 const k=kinds[data.kind]||kinds.other,opts=v=>({
 yes:'Yes / ஆம்',no:'No / இல்லை',unsure:'Not sure / தெரியவில்லை',
 child:'Child / teen',adult:'Adult',older:'Older adult',unknown:'Not sure',
 today:'Today',few:'2–3 days',long:'Longer / repeated',mild:'Mild',moderate:'Moderate',severe:'Severe'
 }[v]||'Not recorded');
 return 'HeartClear · Symptom conversation (not a diagnosis)\n'+new Date().toLocaleDateString()+
 '\nComplaint / கூறியது: '+data.complaint+
 '\nArea / பகுதி: '+k.name.en+' / '+k.name.ta+
 '\nEmergency signs: '+opts(data.red)+
 '\nArea warning signs: '+opts(data.specific)+
 '\nAge group: '+opts(data.age)+
 '\nDuration: '+opts(data.duration)+
 '\nSeverity: '+opts(data.severity)+
 '\nOther warning signs: '+opts(data.urgent)+
 '\nNext step: '+outcome().head.en+'\n'+outcome().rationale.en+
 '\nQuestions to ask: What examination or tests are appropriate? What medicines are safe for this person? Are follow-up or specialist review needed?';
}
function render(){
 stopMic();
 let s='';
 if(stage==='describe'){
  s='<h2>'+html(label('What is bothering you?','உங்களுக்கு என்ன பிரச்சனை?'))+'</h2>'+
  '<p class="help">'+html(label('Tell us in your own words. For example: “My sister has had a headache for two days.” You can type English, தமிழ், or both. No diagnosis is guessed from one sentence.','உங்கள் சொந்த வார்த்தைகளில் கூறுங்கள். உதாரணம்: “என் சகோதரிக்கு இரண்டு நாட்களாக தலைவலி.” ஆங்கிலம், தமிழ் அல்லது இரண்டையும் எழுதலாம். ஒரு வாக்கியத்தை வைத்து நோய் முடிவு செய்யாது.'))+'</p>'+
  '<textarea id="hchtComplaint" maxlength="1200" autocomplete="off" placeholder="I have pain behind my eye… / எனக்கு கண்ணுக்குப் பின்னால் வலி இருக்கிறது…">'+esc(data.complaint)+'</textarea>'+
  '<div class="example-row"><button type="button" data-example="I have a headache / எனக்கு தலைவலி">Headache · தலைவலி</button><button type="button" data-example="I have stomach pain / வயிற்று வலி">Stomach · வயிறு</button><button type="button" data-example="It hurts when I urinate / சிறுநீர் கழிக்க வலி">Urine · சிறுநீர்</button><button type="button" data-example="My eye is red and painful / என் கண் சிவந்து வலிக்கிறது">Eye · கண்</button></div>'+
  '<div class="actions"><button type="button" class="primary" data-act="continue">'+html(label('Continue','தொடரவும்'))+'</button><button type="button" data-act="voice">'+html(label('Speak instead','பேசிக் கூறவும்'))+'</button></div>';
 }else if(stage==='choose'){
  s='<h2>'+html(label('Which area is most affected?','உடலின் எந்தப் பகுதி அதிகமாகப் பாதிக்கப்பட்டுள்ளது?'))+'</h2>'+
   '<p class="help">'+html(label('Your description may include several symptoms, so choose one area to discuss first. You can restart for other symptoms.','உங்கள் விளக்கத்தில் பல அறிகுறிகள் இருக்கலாம். முதலில் ஒரு பகுதியைத் தேர்ந்தெடுக்கவும். மற்ற பிரச்சனைக்காக மீண்டும் தொடங்கலாம்.'))+'</p>'+
   choiceButtons(Object.entries(kinds).map(([id,k])=>[id,k.name]),'kind')+navigation();
 }else if(['red','specific','urgent'].includes(stage)){
  const k=kinds[data.kind]||kinds.other;
  const q=stage==='red'?universal:stage==='specific'?k.emergency:k.urgent;
  s='<p class="help">'+html(label('Safety check · not a diagnosis','பாதுகாப்புக் கேள்வி · நோயறிதல் அல்ல'))+'</p>'+
   '<h2>'+html(q)+'</h2>'+choiceButtons(Object.entries(labels).map(([id,text])=>[id,text]),stage)+navigation();
 }else if(stage==='age'){
  s='<h2>'+html(label('Who is this about?','இது யாரைப் பற்றியது?'))+'</h2>'+choiceButtons(ages,'age')+navigation();
 }else if(stage==='duration'){
  s='<h2>'+html(label('How long has this been happening?','எவ்வளவு நாட்களாக இது நடக்கிறது?'))+'</h2>'+choiceButtons(durations,'duration')+navigation();
 }else if(stage==='severity'){
  s='<h2>'+html(label('How much does it affect them?','அது அவரை எவ்வளவு பாதிக்கிறது?'))+'</h2>'+choiceButtons(severities,'severity')+navigation();
 }else if(stage==='result'){
  const r=outcome();
  s='<p class="help">'+html(label('Educational next steps, not a medical diagnosis','கல்விக்கான அடுத்த படிகள்; நோயறிதல் அல்ல'))+'</p>'+
    '<div class="warning"><h2>'+html(r.head)+'</h2><p class="trans">'+html(r.rationale)+'</p></div>'+
    '<div class="result"><div><strong>'+html(label('Who can help','யாரை அணுகலாம்?'))+'</strong>'+html(r.k.professional)+'</div>'+
    (r.level==='emergency'?'':'<div><strong>'+html(label('General care while arranging help','மருத்துவ உதவிக்காகக் காத்திருக்கும்போது'))+'</strong>'+html(r.k.care)+'</div>')+
    '<div><strong>'+html(label('Medicines and tests','மருந்துகள் மற்றும் பரிசோதனைகள்'))+'</strong>'+html(label('Only a qualified clinician or pharmacist can assess which medicine, dose, investigations or diet changes are appropriate. Do not stop prescribed medicine or start antibiotics based on this tool.','ஏற்ற மருந்து, அளவு, பரிசோதனை, உணவு மாற்றம் ஆகியவற்றை மருத்துவர் அல்லது மருந்தாளர் மட்டுமே மதிப்பிட வேண்டும். இந்தக் கருவியின் அடிப்படையில் மருத்துவர் கொடுத்த மருந்தை நிறுத்தவோ, நுண்ணுயிர் எதிர்ப்பு மருந்தைத் தொடங்கவோ வேண்டாம்.'))+'</div>'+
    (data.age==='child'?'<div>'+html(label('For a child or teenager, involve a trusted adult and get age-appropriate professional advice.','குழந்தை அல்லது இளைஞருக்கு நம்பகமான பெரியவரின் உதவியுடன் வயதுக்கேற்ற மருத்துவ ஆலோசனை பெறவும்.'))+'</div>':'')+
    '</div><a href="'+esc(r.k.link[1])+'" target="_blank" rel="noopener noreferrer">'+esc(r.k.link[0])+' ↗</a>'+
    '<details><summary>'+html(label('Review the answers','பதில்களைப் பார்க்க'))+'</summary><pre style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px">'+esc(summary())+'</pre></details>'+
    '<div class="actions"><button type="button" class="primary" data-act="copy">'+html(label('Copy notes for a doctor','மருத்துவருக்குக் குறிப்புகளை நகலெடு'))+'</button><button type="button" data-act="restart">'+html(label('Another concern','மற்றொரு பிரச்சனை'))+'</button></div>';
 }
 const footer='<p class="status" id="hchtStatus" role="status" aria-live="polite"></p>'+
 '<details><summary>'+html(label('Privacy and limitations','தனியுரிமை மற்றும் வரம்புகள்'))+'</summary>'+
 '<p class="help">'+html(label('Your text and answers remain in this open dialog and clear when you close or reload. No medical question is sent from HeartClear to an AI service. Optional browser speech recognition may transmit microphone audio to your browser provider after permission. This symptom guide is not a validated triage tool or a substitute for a clinician.','உங்கள் உரையும் பதில்களும் இந்தத் திறந்த சாளரத்தில் மட்டுமே இருக்கும்; மூடியதும் அல்லது புதுப்பித்ததும் நீங்கும். HeartClear இந்த மருத்துவ உரையை AI சேவைக்கு அனுப்பாது. நீங்கள் அனுமதித்தால் குரல் அறிதலுக்காக உலாவி நிறுவனம் ஒலியைப் பெறலாம். இது மருத்துவர்களுக்குப் பதிலான உறுதிப்படுத்தப்பட்ட நோய் வகைப்பாட்டு கருவி அல்ல.'))+'</p></details>';
 dlg.innerHTML='<div class="head"><b>Health · உடல்நலம்</b><button type="button" class="close" data-act="close" aria-label="Close">×</button></div><div class="body">'+intro()+s+footer+'</div>';
 dlg.scrollTop=0;
}
function next(property,value){
 data[property]=value;
 if(property==='kind')stage='red';
 else if(property==='red')stage=value==='no'?'specific':'result';
 else if(property==='specific')stage=value==='no'?'age':'result';
 else if(property==='age')stage='duration';
 else if(property==='duration')stage='severity';
 else if(property==='severity')stage='urgent';
 else if(property==='urgent')stage='result';
 render();
}
function back(){
 if(stage==='choose')stage='describe';
 else if(stage==='red')stage='choose';
 else if(stage==='specific')stage='red';
 else if(stage==='age')stage='specific';
 else if(stage==='duration')stage='age';
 else if(stage==='severity')stage='duration';
 else if(stage==='urgent')stage='severity';
 else if(stage==='result'){
  stage=data.red!=='no'?'red':data.specific!=='no'?'specific':'urgent';
 }
 render();
}
function captureComplaint(){
 const input=dlg.querySelector('#hchtComplaint');
 const text=String(input?.value||'').trim();
 if(text.length<5){status(tr(label('Please describe the concern in a few words.','சில வார்த்தைகளில் பிரச்சனையை எழுதுங்கள்.')));return;}
 data.complaint=text;
 const kind=detect(text);
 data.kind=kind;
 stage=kind?'red':'choose';render();
}
function getSpeech(){return window.SpeechRecognition||window.webkitSpeechRecognition}
function startVoice(){
 const Input=dlg.querySelector('#hchtComplaint');
 if(!Input)return;
 if(!getSpeech()){status(tr(label('Voice input is not available in this browser. You can type instead.','இந்த உலாவியில் குரல் உள்ளீடு இல்லை. தயவுசெய்து எழுதவும்.')));return;}
 if(!consented){status(tr(label('Speech recognition may send voice audio to the browser provider. Tap Speak again to consent, or type privately.','குரல் அறிதலுக்காக உலாவி நிறுவனத்திற்குக் குரல் ஒலி அனுப்பப்படலாம். ஒப்புக்கொண்டால் மீண்டும் Speak அழுத்தவும்; இல்லையெனில் எழுதவும்.')));consented=true;return;}
 stopMic();const Rec=getSpeech(),current=new Rec(),check=++token;recognition=current;
 current.lang=lang==='ta'?'ta-IN':lang==='en'?'en-GB':'en-IN';
 current.continuous=false;current.interimResults=false;current.maxAlternatives=1;
 current.onresult=e=>{if(recognition!==current||check!==token||!dlg.open)return;const result=e.results?.[0]?.[0]?.transcript||'';Input.value=(Input.value.trim()+' '+result).trim().slice(0,1200);stopMic();status(tr(label('Review the text, then tap Continue.','உரையைச் சரிபார்த்து Continue அழுத்தவும்.')));Input.focus();};
 current.onerror=()=>{if(recognition!==current)return;stopMic();status(tr(label('Voice unavailable. Type your concern instead.','குரல் கிடைக்கவில்லை. தயவுசெய்து எழுதவும்.')));};
 current.onend=()=>{if(recognition===current)stopMic()};
 try{current.start();status(tr(label('Listening once…','கேட்கிறேன்…')))}catch(e){stopMic();status(tr(label('Microphone unavailable. Please type.','ஒலிவாங்கி கிடைக்கவில்லை. எழுதவும்.')))}
}
dlg.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.example){const input=dlg.querySelector('#hchtComplaint');input.value=b.dataset.example;input.focus();return;}
 if(b.dataset.property){next(b.dataset.property,b.dataset.answer);return;}
 switch(b.dataset.act){
  case 'close':exit();break;
  case 'continue':captureComplaint();break;
  case 'voice':startVoice();break;
  case 'back':back();break;
  case 'restart':reset();render();break;
  case 'copy':{
   const text=summary();navigator.clipboard?.writeText(text).then(()=>status(tr(label('Notes copied. Share only with someone you choose.','குறிப்புகள் நகலெடுக்கப்பட்டன. நீங்கள் விரும்பும் நபருடன் மட்டும் பகிரவும்.')))).catch(()=>status(tr(label('Copy unavailable. Open Review the answers to select the text.','நகலெடுக்க முடியவில்லை. பதில்களைத் திறந்து உரையைத் தேர்ந்தெடுக்கவும்.'))));break;
  }
 }
});
dlg.addEventListener('change',e=>{if(e.target.id==='hchtLang'){lang=e.target.value;try{localStorage.setItem('hcHealthTalkLanguage',lang)}catch(_e){}let value=dlg.querySelector('#hchtComplaint')?.value;if(value)data.complaint=value;render();}});
dlg.addEventListener('cancel',e=>{e.preventDefault();exit()});
dlg.addEventListener('close',()=>{stopMic();reset()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMic()});
document.addEventListener('click',e=>{
 const b=e.target.closest('#hcExploreDialog [data-mode="health"]');if(!b)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 sourceDialog=parent;
 parent.close();
 reset();render();dlg.showModal();
},{capture:true});
function relabel(){
 const b=parent.querySelector('[data-mode="health"]');
 if(b)b.innerHTML='Tell me what hurts · உங்கள் பிரச்சனையைச் சொல்லுங்கள்<small>Type or speak · English / தமிழ் · relevant follow-up questions</small>';
}
const mo=new MutationObserver(relabel);mo.observe(parent,{childList:true,subtree:false});
relabel();
})();
