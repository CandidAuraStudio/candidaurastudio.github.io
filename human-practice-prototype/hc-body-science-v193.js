/* HeartClear v193 — Body science inside Daily Care.
   Educational anatomy, not diagnosis. English and Sri Lankan Tamil.
   One topic at a time; reference-based; no tracking or external APIs. */
(function(){
'use strict';
const care=document.getElementById('hcEverydayCareV182');
const panel=document.getElementById('hcCareBody');
if(!care||!panel||document.getElementById('hcBodyScienceV193'))return;
const reference='https://medlineplus.gov/anatomy.html';
const healthTopics='https://medlineplus.gov/healthtopics.html';
const systemGuide='https://www.merckmanuals.com/home/multimedia/table/major-organ-systems';
const digestionGuide='https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works';
const sleepGuide='https://medlineplus.gov/healthysleep.html';
const safeLink=/^https:\/\/(?:medlineplus\.gov|www\.merckmanuals\.com|www\.niddk\.nih\.gov)\//;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const entries=[
 {id:'brain',en:'Brain & nervous system',ta:'மூளை · நரம்பு மண்டலம்',
 what:['Neurons transmit electrical and chemical signals. The brain and spinal cord coordinate movement, memory, senses and many automatic functions.','நரம்புச் செல்கள் மின்சார மற்றும் வேதியியல் சைகைகளைப் பரிமாறுகின்றன. மூளையும் தண்டுவடமும் இயக்கம், நினைவு, புலன்கள், தானியங்கி உடல் செயல்களை ஒருங்கிணைக்கின்றன.'],
 daily:['Sleep helps memory. Stress can change attention, heart rate and digestion; these systems communicate with one another.','தூக்கம் நினைவுக்கு உதவுகிறது. மனஅழுத்தம் கவனம், இதயத்துடிப்பு, செரிமானத்தை மாற்றலாம்; இந்த மண்டலங்கள் ஒன்றோடொன்று தொடர்புடையவை.'],
 notice:['Sudden weakness on one side, facial drooping or difficulty speaking: seek emergency care.','திடீரென உடலின் ஒரு பக்கம் பலவீனம், முகம் ஒரு பக்கம் சாய்தல் அல்லது பேசுவதில் சிரமம் ஏற்பட்டால் அவசர மருத்துவ உதவி பெறுங்கள்.'],link:reference},
 {id:'heart',en:'Heart, blood & vessels',ta:'இதயம் · இரத்தம் · இரத்த நாளங்கள்',
 what:['The heart has four chambers. Its right side sends blood to the lungs for oxygen; its left side pumps oxygen-rich blood around the body. Arteries, veins and capillaries form the circulation network.','இதயத்தில் நான்கு அறைகள் உள்ளன. வலப்பக்கம் இரத்தத்தை ஆக்சிஜன் பெற நுரையீரலுக்கு அனுப்புகிறது; இடப்பக்கம் ஆக்சிஜன் நிறைந்த இரத்தத்தை உடலுக்கு அனுப்புகிறது. தமனிகள், சிரைகள், நுண்ணிய இரத்த நாளங்கள் இணைந்து செயல்படுகின்றன.'],
 daily:['Movement, sleep, food choices and tobacco exposure affect cardiovascular health over time; one meal cannot cleanse an artery.','இயக்கம், தூக்கம், உணவுப் பழக்கம், புகையிலைப் புகை ஆகியவை காலப்போக்கில் இதய ஆரோக்கியத்தைப் பாதிக்கின்றன. ஒரு உணவு மட்டும் இரத்த நாளங்களைச் சுத்தம் செய்யாது.'],
 notice:['Chest pressure that does not go away, especially with sweating or breathlessness, needs emergency care.','நீங்காத நெஞ்சு அழுத்தம், குறிப்பாக வியர்வை அல்லது மூச்சுத்திணறலுடன் இருந்தால் அவசர மருத்துவ உதவி தேவை.'],link:systemGuide},
 {id:'lungs',en:'Lungs & oxygen exchange',ta:'நுரையீரல் · ஆக்சிஜன் பரிமாற்றம்',
 what:['Air travels through the windpipe and branching airways to tiny air sacs called alveoli. Oxygen enters the blood and carbon dioxide leaves it there.','காற்று மூச்சுக்குழாய் வழியாகச் சிறிய காற்றுப்பைகளான ஆல்வியோலை வரை செல்கிறது. அங்கே ஆக்சிஜன் இரத்தத்தில் சேர்கிறது; கார்பன் டைஆக்சைடு வெளியேறுகிறது.'],
 daily:['Breathing normally is enough at rest. Cleaner air, avoiding smoke and suitable movement support respiratory health; there is no need to force long breath holds.','ஓய்வில் இயல்பாகச் சுவாசிப்பதே போதும். சுத்தமான காற்று, புகையைத் தவிர்த்தல், பொருத்தமான இயக்கம் உதவும்; நீண்ட நேரம் மூச்சைப் பிடிக்க வேண்டியதில்லை.'],
 notice:['Severe difficulty breathing, blue-grey lips or sudden confusion require emergency help.','கடுமையான மூச்சுத்திணறல், உதடுகள் நீலம் அல்லது சாம்பல் நிறமாக மாறுதல், திடீர் குழப்பம் ஏற்பட்டால் அவசர உதவி தேவை.'],link:systemGuide},
 {id:'digestion',en:'Stomach, intestines & digestion',ta:'வயிறு · குடல் · செரிமானம்',
 what:['The stomach mixes food with acid. Most nutrients enter the blood through the small intestine; the large intestine absorbs water and helps form stool. Gut nerves and hormones communicate with the brain.','இரைப்பை உணவை அமிலத்துடன் கலக்குகிறது. சிறுகுடலில் பெரும்பாலான சத்துகள் உறிஞ்சப்படுகின்றன. பெருங்குடல் நீரை உறிஞ்சி மலத்தை உருவாக்க உதவுகிறது. குடலின் நரம்புகளும் ஹார்மோன்களும் மூளையுடன் தொடர்பு கொள்கின்றன.'],
 daily:['A familiar rice, lentil or vegetable meal moves through the same digestive system. Variety, safe preparation and enough fibre matter more than rigid food-time rules.','அரிசி, பருப்பு, காய்கறி போன்ற பழக்கமான உணவுகளும் இதே செரிமானப் பாதையில் செல்கின்றன. பலவகை உணவு, பாதுகாப்பான சமையல், போதிய நார்ச்சத்து ஆகியவை கடுமையான நேர விதிகளைவிட முக்கியம்.'],
 notice:['Blood in stool, persistent vomiting, severe abdominal pain or persistent changes in bowel habits need medical assessment.','மலத்தில் இரத்தம், தொடர்ந்த வாந்தி, கடுமையான வயிற்றுவலி அல்லது நீடித்த மலம் கழிக்கும் பழக்க மாற்றம் இருந்தால் மருத்துவரிடம் பரிசோதிக்க வேண்டும்.'],link:digestionGuide},
 {id:'liver',en:'Liver, bile & gallbladder',ta:'கல்லீரல் · பித்தநீர் · பித்தப்பை',
 what:['The liver processes absorbed nutrients, helps manage blood chemicals and makes bile for fat digestion. The gallbladder stores and releases bile.','கல்லீரல் உறிஞ்சப்பட்ட சத்துகளைச் செயலாக்கி, இரத்தத்தில் உள்ள பல வேதிப்பொருட்களை ஒழுங்குபடுத்தி, கொழுப்பைச் செரிக்க பித்தநீரை உருவாக்குகிறது. பித்தப்பை அதைப் சேமித்து வெளியிடுகிறது.'],
 daily:['The liver already performs these jobs continuously. Cleansing drinks and untested herbal mixtures cannot replace its work and may cause harm.','கல்லீரல் இந்த வேலைகளைத் தொடர்ந்து செய்கிறது. ‘டிடாக்ஸ்’ பானங்களும் சரிபார்க்காத மூலிகைக் கலவைகளும் அதன் வேலையை மாற்ற முடியாது; தீங்கும் ஏற்படலாம்.'],
 notice:['Yellowing of the skin or eyes, dark urine with illness, or significant persistent upper-abdominal pain should be checked.','கண்கள் அல்லது தோல் மஞ்சள் நிறமாதல், உடல்நலக் குறைவுடன் அடர்ந்த சிறுநீர், நீடிக்கும் கடுமையான மேல்வயிற்று வலி இருந்தால் பரிசோதிக்க வேண்டும்.'],link:digestionGuide},
 {id:'pancreas',en:'Pancreas, insulin & energy',ta:'கணையம் · இன்சுலின் · உடல் ஆற்றல்',
 what:['The pancreas releases enzymes into the intestine to help digest food. It also makes hormones including insulin, which helps regulate blood glucose.','கணையம் உணவைச் செரிக்க உதவும் நொதிகளை குடலுக்குள் விடுகிறது. இரத்தத்தில் உள்ள குளுக்கோஸ் அளவை ஒழுங்குபடுத்த உதவும் இன்சுலின் உள்ளிட்ட ஹார்மோன்களையும் உருவாக்குகிறது.'],
 daily:['Rice and other carbohydrate foods are digested into sugars the body uses for energy. Meals work with hormones and activity; no single staple is automatically good or bad.','அரிசி உள்ளிட்ட மாவுச்சத்து உணவுகள் செரிந்து உடலுக்கு ஆற்றல் தரும் சர்க்கரையாக மாறுகின்றன. உணவு, ஹார்மோன்கள், இயக்கம் இணைந்து செயல்படுகின்றன; ஒரு அடிப்படை உணவு தனியாக நல்லதோ கெட்டதோ அல்ல.'],
 notice:['Unusual ongoing thirst, frequent urination or unexplained changes in energy deserve medical evaluation.','வழக்கத்திற்கு மாறான தொடர்ந்த தாகம், அடிக்கடி சிறுநீர் கழித்தல், காரணமற்ற ஆற்றல் மாற்றங்கள் இருந்தால் மருத்துவ ஆலோசனை பெறுங்கள்.'],link:reference},
 {id:'kidneys',en:'Kidneys & urinary system',ta:'சிறுநீரகம் · சிறுநீர்ப் பாதை',
 what:['Tiny filtering units in the kidneys remove wastes while regulating water and salts. The bladder stores urine until it leaves the body. Kidneys also help regulate blood pressure.','சிறுநீரகத்தில் உள்ள மிகச் சிறிய வடிகட்டிகள் கழிவுகளை நீக்கி நீர், உப்புச் சமநிலையைப் பராமரிக்கின்றன. சிறுநீர்ப்பை வெளியேற்றும் வரை சிறுநீரைச் சேமிக்கிறது. இரத்த அழுத்தக் கட்டுப்பாட்டிலும் சிறுநீரகம் பங்கேற்கிறது.'],
 daily:['Safe water and ordinary varied food support health. Water needs vary with heat, activity and medical conditions; more is not always better.','பாதுகாப்பான குடிநீரும் பலவகை உணவும் உதவும். வெப்பநிலை, செயல்பாடு, உடல்நிலை ஆகியவற்றைப் பொறுத்து நீர்த் தேவை மாறும்; அதிகம் குடிப்பதே எப்போதும் சிறந்ததல்ல.'],
 notice:['Blood in urine, fever with urinary pain or markedly reduced urine output require prompt assessment.','சிறுநீரில் இரத்தம், சிறுநீர் கழிக்கும்போது வலியுடன் காய்ச்சல், சிறுநீர் மிகக் குறைவாக வருதல் ஆகியவற்றுக்கு விரைவான மருத்துவ ஆலோசனை தேவை.'],link:reference},
 {id:'hormones',en:'Hormones & thyroid',ta:'ஹார்மோன்கள் · தைராய்டு',
 what:['Hormones carry messages through the blood. The thyroid helps regulate metabolism and temperature; other glands influence growth, stress responses and reproduction.','ஹார்மோன்கள் இரத்தம் வழியாகச் செய்திகளை எடுத்துச் செல்கின்றன. தைராய்டு சுரப்பி உடலின் ஆற்றல் பயன்பாடு மற்றும் வெப்பக் கட்டுப்பாட்டில் பங்கேற்கிறது. மற்ற சுரப்பிகள் வளர்ச்சி, மனஅழுத்தப் பதில், இனப்பெருக்கத்தைப் பாதிக்கின்றன.'],
 daily:['Sleep, meals, illness and life stages can affect hormonal rhythms. Tiredness alone does not identify a hormone condition.','தூக்கம், உணவு, நோய், வாழ்க்கையின் பல கட்டங்கள் ஹார்மோன் சுழற்சிகளைப் பாதிக்கலாம். சோர்வு மட்டும் ஹார்மோன் கோளாறைக் காட்டாது.'],
 notice:['Persistent unexplained changes in energy, temperature tolerance, thirst or menstrual patterns merit assessment rather than self-diagnosis.','நீடித்த காரணமற்ற சோர்வு, குளிர் அல்லது வெப்பம் தாங்குவதில் மாற்றம், தாகம் அல்லது மாதவிடாய் மாற்றம் இருந்தால் தானாக முடிவு செய்யாமல் பரிசோதிக்க வேண்டும்.'],link:reference},
 {id:'immune',en:'Immune & lymphatic systems',ta:'நோய் எதிர்ப்பு · நிணநீர் மண்டலம்',
 what:['Skin and mucous membranes form barriers. White blood cells identify and respond to threats; lymph nodes help organize immune responses. Vaccines train immune memory.','தோலும் சளிச்சவ்வுகளும் பாதுகாப்புத் தடைகளாக உள்ளன. வெள்ளை இரத்த அணுக்கள் தொற்றுகளை எதிர்கொள்ள உதவுகின்றன. நிணநீர் முடிச்சுகள் எதிர்ப்புச் செயல்களை ஒருங்கிணைக்கின்றன. தடுப்பூசிகள் நோய் எதிர்ப்பு நினைவாற்றலைப் பயிற்றுவிக்கின்றன.'],
 daily:['Adequate sleep, varied food, ordinary activity and recommended vaccines matter; no one spice or supplement “boosts” every part of immunity.','போதிய தூக்கம், பலவகை உணவு, இயல்பான இயக்கம், பரிந்துரைக்கப்பட்ட தடுப்பூசிகள் முக்கியம். ஒரு மசாலா அல்லது துணை மருந்து மட்டும் எல்லா நோய் எதிர்ப்பையும் அதிகரிக்காது.'],
 notice:['Persistent high fever, unexplained continuing swelling or repeated serious infections need professional advice.','தொடர்ந்த அதிக காய்ச்சல், காரணமற்ற நீடித்த வீக்கம் அல்லது மீண்டும் மீண்டும் கடுமையான தொற்று இருந்தால் மருத்துவ ஆலோசனை பெறுங்கள்.'],link:systemGuide},
 {id:'skin',en:'Skin, hair & temperature',ta:'தோல் · முடி · உடல் வெப்பம்',
 what:['Skin is a protective barrier, senses touch and helps control temperature through blood flow and sweating. Hair and nails grow from specialised tissues.','தோல் உடலைப் பாதுகாக்கும் தடையாகவும் தொடு உணர்வை அளிப்பதாகவும் உள்ளது. வியர்வை, இரத்த ஓட்டம் மூலம் வெப்பத்தைக் கட்டுப்படுத்த உதவுகிறது. முடியும் நகங்களும் தனித்திசுக்களில் இருந்து வளர்கின்றன.'],
 daily:['Gentle cleansing is usually enough. Irritating oils, harsh scrubs and unnecessary products can disrupt the skin barrier.','மென்மையான சுத்தம் பெரும்பாலும் போதுமானது. எரிச்சல் தரும் எண்ணெய், கடுமையான தேய்த்தல், தேவையற்ற பொருட்கள் தோலின் பாதுகாப்பைப் பாதிக்கலாம்.'],
 notice:['Rapidly spreading painful redness, serious allergic reactions or a changing skin lesion should be medically assessed.','வேகமாகப் பரவும் வலியுள்ள சிவப்பு, கடுமையான ஒவ்வாமை அல்லது மாறிக்கொண்டிருக்கும் தோல் புள்ளி இருந்தால் மருத்துவ ஆலோசனை பெறுங்கள்.'],link:reference},
 {id:'movement',en:'Bones, muscles & joints',ta:'எலும்புகள் · தசைகள் · மூட்டுகள்',
 what:['Bones support and protect organs. Muscles create movement by pulling on bones through tendons; ligaments connect and stabilise bones at joints.','எலும்புகள் உடலைத் தாங்கி உறுப்புகளைப் பாதுகாக்கின்றன. தசைகள் தசைநாண்கள் வழியாக எலும்புகளை இழுத்து இயக்கம் ஏற்படுத்துகின்றன; இணைப்புநார்கள் மூட்டுகளுக்கு நிலைத்தன்மை தருகின்றன.'],
 daily:['Gentle everyday movement, rest and varied nutrition support these tissues. Pain is not a signal to force through a stretch.','மென்மையான தினசரி இயக்கம், ஓய்வு, பலவகை உணவு இத்திசுக்களைப் பராமரிக்க உதவும். வலி இருந்தால் வலுக்கட்டாயமாக நீட்ட வேண்டாம்.'],
 notice:['A new injury with deformity, inability to bear weight or marked swelling needs medical care.','புதிய காயத்துடன் உருவ மாற்றம், நிற்க முடியாமை அல்லது மிகுந்த வீக்கம் இருந்தால் மருத்துவ உதவி தேவை.'],link:systemGuide},
 {id:'eyes',en:'Eyes & vision',ta:'கண்கள் · பார்வை',
 what:['The cornea and lens focus light onto the retina. Light-sensitive cells turn it into nerve signals that reach the brain through the optic nerve.','கருவிழி மேற்படலமும் லென்ஸும் ஒளியை விழித்திரையில் குவிக்கின்றன. அங்குள்ள செல்கள் ஒளியை நரம்புச் செய்திகளாக மாற்றி பார்வை நரம்பு வழியாக மூளைக்கு அனுப்புகின்றன.'],
 daily:['Blinking spreads tears over the eye surface. Screen breaks may improve comfort, but severe eye pain is not simply screen tiredness.','இமைத்தல் கண்ணீரை கண் மேற்பரப்பில் பரப்புகிறது. திரை ஓய்வு சௌகரியத்தை அதிகரிக்கலாம்; ஆனால் கடுமையான கண்வலியை சாதாரண திரைச் சோர்வு என்று கருத வேண்டாம்.'],
 notice:['Eye pain with reduced vision, marked light sensitivity or severe redness needs urgent medical assessment.','பார்வைக் குறைவுடன் கண்வலி, ஒளியைத் தாங்க முடியாமை அல்லது கடுமையான சிவப்பு இருந்தால் அவசரமாகப் பரிசோதிக்க வேண்டும்.'],link:reference},
 {id:'ears',en:'Ears, hearing & balance',ta:'காதுகள் · கேள்வி · சமநிலை',
 what:['Sound vibrates the eardrum and tiny middle-ear bones. The inner-ear cochlea converts movement into nerve signals; another inner-ear system helps balance.','ஒலி செவிப்பறையையும் நடுக்காதின் சிறிய எலும்புகளையும் அதிரச் செய்கிறது. உள்காதின் காக்ளியா அதை நரம்புச் செய்தியாக மாற்றுகிறது; உள்காதின் மற்றொரு பகுதி சமநிலைக்கு உதவுகிறது.'],
 daily:['Comfortable headphone volume protects delicate hearing cells. Earwax usually moves outward naturally; avoid inserting objects into the ear canal.','ஹெட்போன் சத்தத்தைச் சௌகரியமான அளவில் வைப்பது கேள்வி செல்களைப் பாதுகாக்கும். காதுமெழுகு பெரும்பாலும் இயல்பாக வெளியேறும்; காதுக்குள் பொருள் நுழைக்க வேண்டாம்.'],
 notice:['Sudden hearing loss or severe dizziness with neurological symptoms needs urgent evaluation.','திடீர் கேள்வித்திறன் இழப்பு அல்லது நரம்பு அறிகுறிகளுடன் கடுமையான மயக்கம் ஏற்பட்டால் அவசர மருத்துவ ஆலோசனை தேவை.'],link:reference},
 {id:'mouth',en:'Mouth, teeth & gums',ta:'வாய் · பற்கள் · ஈறுகள்',
 what:['Teeth break up food; saliva moistens it and begins digestion. Plaque bacteria make acids that can damage enamel; gums support and protect the teeth.','பற்கள் உணவைச் சிறு துண்டுகளாக்குகின்றன; உமிழ்நீர் ஈரமாக்கி செரிமானத்தைத் தொடங்க உதவுகிறது. பற்காரை கிருமிகள் உண்டாக்கும் அமிலம் பற்களின் மேலடுக்கைப் பாதிக்கலாம். ஈறுகள் பற்களுக்கு ஆதரவு தருகின்றன.'],
 daily:['Fluoride toothpaste and gentle brushing help protect enamel. Traditional tooth-cleaning history is interesting, but abrasive charcoal does not replace modern dental care.','ஃப்ளூரைடு பற்பசையும் மென்மையான பல் துலக்கலும் பற்களின் மேலடுக்கைப் பாதுகாக்க உதவும். பழைய பல் சுத்த வழக்குகளின் வரலாறு முக்கியமானது; கடின கரித்தூள் நவீன பல் பராமரிப்புக்கு மாற்றல்ல.'],
 notice:['Persistent gum bleeding, swelling or tooth pain should be checked by a dentist.','தொடர்ந்து ஈறுகளில் இரத்தம், வீக்கம் அல்லது பல்வலி இருந்தால் பல் மருத்துவரிடம் பரிசோதிக்க வேண்டும்.'],link:healthTopics},
 {id:'sleep',en:'Sleep, clocks & repair',ta:'தூக்கம் · உடற்கடிகாரம் · மீட்பு',
 what:['The brain cycles between non-REM and REM sleep. Sleep supports memory, immune responses, hormone regulation and tissue repair; it is not simply the body turning off.','மூளை REM மற்றும் REM அல்லாத தூக்க நிலைகளுக்கிடையே மாறுகிறது. தூக்கம் நினைவு, நோய் எதிர்ப்பு, ஹார்மோன் கட்டுப்பாடு, திசுப் பழுது சரிசெய்தலை ஆதரிக்கிறது; உடல் முற்றிலும் அணைவதல்ல.'],
 daily:['Light, regular sleep timing and a comfortable environment help the body clock. Sleep needs vary by age and health.','ஒளி, சீரான தூக்க நேரம், வசதியான சூழல் ஆகியவை உடற்கடிகாரத்திற்கு உதவும். வயதும் உடல்நிலையும் பொறுத்து தூக்கத் தேவை மாறும்.'],
 notice:['Ongoing sleep problems, loud snoring with breathing pauses or severe daytime sleepiness merit assessment.','தொடரும் தூக்கச் சிக்கல், மூச்சு நின்று மீளும் கடுமையான குறட்டை அல்லது பகலில் மிகுந்த தூக்கக்கலக்கம் இருந்தால் ஆலோசனை பெறுங்கள்.'],link:sleepGuide},
 {id:'reproductive',en:'Reproductive health & life stages',ta:'இனப்பெருக்க ஆரோக்கியம் · வாழ்க்கைக் கட்டங்கள்',
 what:['Reproductive organs have different structures and functions. Sex hormones contribute to puberty, menstrual cycles, sperm production and many changes across life. Normal patterns differ among people.','இனப்பெருக்க உறுப்புகளின் அமைப்பும் செயல்களும் மாறுபடும். பாலின ஹார்மோன்கள் பருவமடைதல், மாதவிடாய் சுழற்சி, விந்தணு உற்பத்தி மற்றும் வாழ்க்கைக் கட்ட மாற்றங்களில் பங்கேற்கின்றன. இயல்பான வேறுபாடுகள் உண்டு.'],
 daily:['Accurate anatomy and respectful health education are more useful than shame, myths or assumptions about what everybody should experience.','வெட்கம், தவறான நம்பிக்கை, எல்லோருக்கும் ஒரே அனுபவம் என்ற கருத்தை விட உடற்கூறைத் துல்லியமாக அறிதலும் மரியாதையான உடல்நலக் கல்வியும் பயனுள்ளவை.'],
 notice:['Sudden severe pelvic or testicular pain, unusual heavy bleeding or persistent new symptoms need timely medical assessment.','திடீர் கடுமையான இடுப்புப் பகுதி அல்லது விதைப்பை வலி, வழக்கத்திற்கு மாறான மிகுந்த இரத்தப்போக்கு அல்லது நீடிக்கும் புதிய அறிகுறிகளுக்கு உடனடி மருத்துவ ஆலோசனை தேவை.'],link:healthTopics},
 {id:'stress',en:'Stress, emotions & the body',ta:'மனஅழுத்தம் · உணர்வுகள் · உடல்',
 what:['The nervous and endocrine systems respond to challenges using signals including adrenaline and cortisol. These responses can change attention, pulse, digestion and sleep.','நரம்பு மற்றும் ஹார்மோன் மண்டலங்கள் அட்ரினலின், கார்டிசோல் போன்ற சைகைகள் மூலம் சவால்களுக்கு பதிலளிக்கின்றன. இதனால் கவனம், இதயத்துடிப்பு, செரிமானம், தூக்கம் மாறலாம்.'],
 daily:['Feelings are not automatically illnesses. Gentle movement, rest, trusted support and natural breathing can be useful, but meditation is not a replacement for healthcare.','எல்லா உணர்வுகளும் நோயல்ல. மென்மையான இயக்கம், ஓய்வு, நம்பிக்கையான ஆதரவு, இயல்பான சுவாசம் உதவலாம்; தியானம் மருத்துவ சிகிச்சைக்கு மாற்றல்ல.'],
 notice:['If distress persists or interferes with school, work, sleep or daily life, speak to a qualified health professional or trusted adult.','மனச்சிரமம் நீடித்தால் அல்லது படிப்பு, வேலை, தூக்கம், அன்றாட வாழ்க்கையைப் பாதித்தால் தகுதியான நிபுணர் அல்லது நம்பகமான பெரியவரிடம் பேசுங்கள்.'],link:healthTopics}
]; 
window.HCBodyScienceCatalogV193=entries;
try{window.dispatchEvent(new Event('hc:body-science-ready'))}catch(_){}
const lang=()=>{try{return localStorage.getItem('hcEverydayCareLangV182')==='en'?'en':'ta'}catch(_){return 'ta'}};
const choose=(en,ta)=>lang()==='ta'?ta:en;
const defaultByTime=()=>{const h=new Date().getHours();return h>=5&&h<11?'brain':h>=11&&h<17?'digestion':h>=17&&h<21?'heart':'sleep'};
let chosen=defaultByTime();
let userSelected=false;
try{const saved=localStorage.getItem('hcBodyScienceTopicV193');if(entries.some(e=>e.id===saved)){chosen=saved;userSelected=true}}catch(_){}
const host=document.createElement('section');
host.id='hcBodyScienceV193';
host.setAttribute('aria-label','Human body medical science');
panel.insertAdjacentElement('beforebegin',host);
const css=document.createElement('style');css.id='hcBodyScienceCssV193';
css.textContent=[
 '#home #hcBodyScienceV193{padding:12px;border-top:1px solid #405864;border-bottom:1px solid #405864;background:#0c222d;color:#eaf2f5}',
 '#home #hcBodyScienceV193 strong{font-size:15px}',
 '#home #hcBodyScienceV193 .hcs-sub{display:block;font-size:11px;color:#bdd0d6;margin:3px 0 10px}',
 '#home #hcBodyScienceV193 .hcs-tools{display:flex;gap:7px;align-items:center}',
 '#home #hcBodyScienceV193 .hcs-tools select{flex:1;min-width:0;font-size:12px;min-height:39px;max-width:100%}',
 '#home #hcBodyScienceV193 .hcs-tools button{min-width:62px;font-size:12px;min-height:39px}',
 '#home #hcBodyScienceV193 article{margin-top:9px;padding:10px;border:1px solid #506b77;border-radius:10px;background:#102b37}',
 '#home #hcBodyScienceV193 h3{font-size:14px;margin:0 0 7px;line-height:1.5}',
 '#home #hcBodyScienceV193 p{font-size:12px;line-height:1.6;margin:6px 0;color:#e2ecf0}',
 '#home #hcBodyScienceV193 p b{color:#fff}',
 '#home #hcBodyScienceV193 a{color:#d8f1ff;text-decoration:underline;font-size:12px}',
 '#home #hcBodyScienceV193 .hcs-attention{border-left:2px solid #b4c8d3;padding-left:8px}',
 '#home #hcBodyScienceV193 .hcs-connection{font-size:11px;color:#d1dee3;padding-top:7px}',
 '#home #hcBodyScienceV193 .hcs-foot{font-size:10px;color:#b7cbd2;margin-top:8px}'
].join('\n');document.head.append(css);
function draw(){
 const item=entries.find(e=>e.id===chosen)||entries[0],idx=lang()==='ta'?1:0;
 host.innerHTML='<div><strong>'+esc(choose('Inside the human body','மனித உடலுக்குள்'))+'</strong><small class="hcs-sub">'+esc(choose('17 topics · Understand the science, not only the habit','17 தலைப்புகள் · வழக்கம் மட்டுமல்ல, அதன் அறிவியலும்'))+'</small></div>'+
 '<div class="hcs-tools"><select id="hcsTopic" aria-label="'+esc(choose('Choose a body system','உடல் மண்டலத்தைத் தேர்ந்தெடு'))+'">'+entries.map(e=>'<option value="'+e.id+'"'+(chosen===e.id?' selected':'')+'>'+esc(idx?e.ta:e.en)+'</option>').join('')+'</select>'+
 '<button id="hcsNext" type="button">'+esc(choose('Next ›','அடுத்து ›'))+'</button></div>'+
 '<article><h3>'+esc(idx?item.ta:item.en)+'</h3>'+
 '<p><b>'+esc(choose('How it works:','எப்படிச் செயல்படுகிறது:'))+'</b> '+esc(item.what[idx])+'</p>'+
 '<p><b>'+esc(choose('Everyday connection:','அன்றாடத் தொடர்பு:'))+'</b> '+esc(item.daily[idx])+'</p>'+
 '<p class="hcs-attention"><b>'+esc(choose('When to get help:','எப்போது உதவி பெற வேண்டும்:'))+'</b> '+esc(item.notice[idx])+'</p>'+
 '<a href="'+(safeLink.test(item.link)?item.link:reference)+'" target="_blank" rel="noopener noreferrer">'+esc(choose('Read medical reference ↗','மருத்துவ ஆதாரம் வாசிக்க ↗'))+'</a></article>'+
 '<div class="hcs-connection">'+esc(choose('Connected systems: food → gut → blood → liver → cells; pancreas supplies digestive enzymes and insulin. Breathing → lungs → blood → brain. Organs never work alone.','இணைந்த மண்டலங்கள்: உணவு → குடல் → இரத்தம் → கல்லீரல் → செல்கள்; கணையம் செரிமான நொதிகளையும் இன்சுலினையும் வழங்குகிறது. சுவாசம் → நுரையீரல் → இரத்தம் → மூளை. உறுப்புகள் தனித்தனியாகச் செயல்படுவதில்லை.'))+'</div>'+
 '<p class="hcs-foot">'+esc(choose('Medical education, not personal diagnosis. Evidence-based science and family traditions are different kinds of knowledge.','இது மருத்துவக் கல்வி; தனிப்பட்ட நோயறிதல் அல்ல. அறிவியல் ஆதாரமும் குடும்ப மரபும் வெவ்வேறு வகை அறிவுகள்.'))+'</p>';
 host.querySelector('#hcsTopic').addEventListener('change',ev=>select(ev.target.value));
 host.querySelector('#hcsNext').addEventListener('click',()=>select(entries[(entries.findIndex(e=>e.id===chosen)+1)%entries.length].id));
}
function select(id){
 if(!entries.some(e=>e.id===id))return;
 chosen=id;userSelected=true;
 try{localStorage.setItem('hcBodyScienceTopicV193',id)}catch(_){}
 draw();
}
care.addEventListener('change',ev=>{if(ev.target.id==='hcCareLanguage')draw()});
care.addEventListener('click',ev=>{
 const button=ev.target.closest&&ev.target.closest('[data-tab]');
 if(!button)return;
 const topics={morning:'brain',bath:'skin',food:'digestion',night:'sleep',week:'immune'};
 if(topics[button.dataset.tab]&&!userSelected){chosen=topics[button.dataset.tab];draw()}
});
draw();
})();