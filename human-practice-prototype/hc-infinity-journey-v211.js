/* HeartClear Infinity Journey v211
 * One topic at a time. No artificial infinite scrolling, no auto-play, no tracking.
 * Keep originals (Practice, Library, Kitchen, Quran, Sound Lab) intact.
 */
(function(){
'use strict';
if(window.HCInfinityJourney)return;
const home=document.getElementById('home'),nav=document.getElementById('bottomNav');
if(!home||!nav)return;
const data=[{"id":"moon","en":"The Moon is never the same","ta":"நிலா தினமும் ஏன் மாறுகிறது?","cat":"Nature","tags":"moon night sky phases sun astronomy quran lunar நிலா சந்திரன்","question":["Why does the Moon look different each night?","நிலா ஒவ்வொரு இரவும் வேறுபட்ட வடிவில் ஏன் தெரிகிறது?"],"explain":["The Moon does not make its own light. Sunlight illuminates half of it; as it moves around Earth, we see different portions of that bright half. These are the Moon’s phases.","நிலா தானாக ஒளி உருவாக்குவதில்லை. சூரியன் அதன் ஒரு பாதியை ஒளிரச் செய்கிறான். நிலா பூமியைச் சுற்றும்போது ஒளிரும் பகுதியின் வெவ்வேறு அளவுகளைப் பார்க்கிறோம். இதுவே நிலாவின் பிறைகள்."],"reflect":["Qur’an 2:164 draws attention to the sky and the alternation of night and day as signs worth thinking about. The spiritual meaning is a reflection; the phases have an astronomical explanation.","குர்ஆன் 2:164 வானம், இரவு-பகல் மாற்றங்களைச் சிந்திக்க அழைக்கிறது. அதன் ஆன்மிக அர்த்தம் ஒரு சிந்தனை; நிலாவின் பிறைகளுக்கு வானியல் விளக்கம் உள்ளது."],"practice":["Look for the Moon on another evening. Note its position and shape. Compare the change without expecting it to look the same.","வேறொரு மாலை நிலாவைப் பாருங்கள். அதன் இடத்தையும் வடிவத்தையும் கவனியுங்கள். அடுத்த முறை எப்படி மாறியிருக்கிறது எனப் பாருங்கள்."],"source":[["NASA · Moon phases","https://science.nasa.gov/moon/moon-phases/"],["Qur’an 2:164 · source text","https://quran.com/2/164"]],"related":["sun","gratitude","cow"],"route":"quran"},{"id":"birds","en":"What birds teach us","ta":"பறவைகளைப் பார்த்தால் என்ன கற்கலாம்?","cat":"Scripture","tags":"bible birds matthew gospel nature faith gratitude பைபிள் பறவை","question":["Can watching a bird change how we think about daily worries?","ஒரு பறவையைக் கவனிப்பது நமது கவலையைப் பற்றிய சிந்தனையை மாற்றுமா?"],"explain":["Birds actively search for food, build shelter and respond to seasons. Their lives are not effortless. Observing them helps us notice a complex living world beyond ourselves.","பறவைகள் உணவைத் தேடுகின்றன; கூடு கட்டுகின்றன; பருவங்களுக்கு ஏற்ப வாழ்கின்றன. அவற்றின் வாழ்க்கை முயற்சியில்லாதது அல்ல. அவற்றைக் கவனிப்பது நம்மைத் தாண்டிய உயிர் உலகைப் புரிய உதவுகிறது."],"reflect":["In Matthew 6:26, Jesus uses birds while teaching about worry and trust. Read the passage as spiritual teaching, not as a scientific claim that people never need to plan or work.","மத்தேயு 6:26-ல் இயேசு கவலையும் நம்பிக்கையும் பற்றிப் பேசும்போது பறவைகளை எடுத்துக்காட்டுகிறார். இது ஆன்மிகப் போதனை; திட்டமிடவோ உழைக்கவோ தேவையில்லை என்ற அறிவியல் கூற்று அல்ல."],"practice":["Watch a bird briefly without feeding or disturbing it. Notice one real action it takes. Then name one task you can handle today.","பறவைக்கு உணவளிக்காமல், தொந்தரவு செய்யாமல் சிறிது நேரம் கவனியுங்கள். அது செய்யும் ஒரு செயலைப் பாருங்கள். இன்று நீங்கள் செய்யக்கூடிய ஒரு வேலையைத் தேர்ந்தெடுக்கவும்."],"source":[["Bible · Matthew 6:26 (KJV)","https://www.biblegateway.com/passage/?search=Matthew%206%3A26&version=KJV"]],"related":["action","gratitude","cow"],"route":"bible"},{"id":"action","en":"Action without obsession","ta":"செயலில் கவனம், பலனில் அல்ல","cat":"Scripture","tags":"gita bhagavad gita 2 47 karma action discipline hindu கடமை செயல் கீதை","question":["How do we work carefully without being consumed by the result?","பலனைப் பற்றிய அதீத கவலையின்றி எப்படிச் சிறப்பாகச் செயல்படலாம்?"],"explain":["A useful practical distinction is between what we do and what we cannot control. Preparation, attention and fair conduct are actions; other people’s responses and future outcomes are not fully ours.","நாம் செய்யக்கூடிய செயல்களுக்கும் நம் கட்டுப்பாட்டில் இல்லாத முடிவுகளுக்கும் வேறுபாடு உள்ளது. தயாரிப்பு, கவனம், நேர்மை நம் செயல்கள்; பிறரின் பதிலும் எதிர்கால முடிவும் முழுவதும் நம் கையில் இல்லை."],"reflect":["Bhagavad Gita 2:47 emphasizes engagement in action without attachment to its fruits. This is the passage’s philosophical teaching, not a clinical formula for every emotion.","பகவத் கீதை 2:47 பலன் மீது பற்றில்லாமல் கடமையைச் செய்வதை வலியுறுத்துகிறது. இது தத்துவப் போதனை; எல்லா உணர்ச்சிகளுக்கும் மருத்துவச் சூத்திரம் அல்ல."],"practice":["Pick one unfinished duty. Give it a clear next step that takes a few minutes. Judge the care of your effort before you judge the outcome.","நிலுவையில் உள்ள ஒரு கடமையைத் தேர்வுசெய்யுங்கள். சில நிமிடங்களில் செய்யக்கூடிய அடுத்த செயலை முடிக்கவும். முடிவுக்கு முன் உங்கள் முயற்சியின் தரத்தைப் பாருங்கள்."],"source":[["Bhagavad Gita 2:47 · IIT Kanpur","https://www.gitasupersite.iitk.ac.in/srimad?etadi=1&etradi=1&field_chapter_value=2&field_nsutra_value=47&language=dv&setgb=1"]],"related":["walking","gratitude","birds"],"route":"gita"},{"id":"walking","en":"Why walking matters","ta":"நடப்பதில் என்ன நடக்கிறது?","cat":"Body","tags":"walking feet shoes slippers barefoot balance steps joints walking meditation பாதம் நடை செருப்பு","question":["Why do feet, shoes and the ground matter so much?","நடக்கும்போது பாதங்களும் காலணியும் தரையும் ஏன் முக்கியம்?"],"explain":["Feet and ankles adapt to uneven ground while muscles, joints and nerves coordinate balance. Shoes help protect feet from heat, sharp objects and friction. Barefoot walking is not automatically healthier for everyone.","பாதங்களும் கணுக்கால்களும் தரைக்கு ஏற்ப மாறி சமநிலையைப் பராமரிக்கின்றன. தசை, மூட்டு, நரம்புகள் இணைந்து செயல்படுகின்றன. காலணி வெப்பம், கூர்மையான பொருட்கள், உராய்விலிருந்து பாதுகாக்கிறது. காலணியில்லாமல் நடப்பது அனைவருக்கும் சிறந்தது அல்ல."],"reflect":["Walking can be a simple moment of attention, not a competition. Notice what your feet do to keep you steady, and the places they have carried you.","நடப்பது போட்டி அல்ல; கவனிக்கும் ஒரு தருணமாக இருக்கலாம். உங்களை நிலையாக வைத்திருக்க பாதங்கள் செய்வதைவும் அவை அழைத்துச் சென்ற இடங்களையும் நினையுங்கள்."],"practice":["On a familiar safe path, walk at a comfortable pace and notice each step. Choose protective, comfortable footwear for the surface.","பாதுகாப்பான பழக்கமான பாதையில் வசதியான வேகத்தில் நடந்து ஒவ்வொரு அடியையும் கவனியுங்கள். தரைக்கு ஏற்ற பாதுகாப்பான காலணியைத் தேர்ந்தெடுக்கவும்."],"source":[["MedlinePlus · Exercise and physical fitness","https://medlineplus.gov/exerciseandphysicalfitness.html"],["MedlinePlus · Foot health","https://medlineplus.gov/foothealth.html"]],"related":["breath","sun","action"],"route":"practice"},{"id":"sun","en":"Sunlight and the body clock","ta":"சூரிய ஒளியும் உடற்கடிகாரமும்","cat":"Nature","tags":"sun sunlight light day sleep circadian vitamin d outdoors சூரியன் ஒளி","question":["Why can daylight change how awake we feel?","பகலொளி நம் விழிப்பு உணர்வை ஏன் மாற்றுகிறது?"],"explain":["Light reaching the eyes helps synchronize the body’s daily sleep–wake clock. Light and darkness affect melatonin timing. Sun exposure also brings UV radiation that can damage skin and eyes.","கண்களில் படும் ஒளி தூக்கம்-விழிப்பு நேரத்தை ஒழுங்குபடுத்த உதவுகிறது. ஒளியும் இருளும் மெலடோனின் நேரத்தை மாற்றுகின்றன. சூரியனின் புறஊதாக் கதிர்கள் தோலையும் கண்களையும் பாதிக்கலாம்."],"reflect":["Day and night are ordinary experiences with extraordinary mechanisms. A small moment outdoors can become a chance to notice them—without treating sunlight as a cure.","பகலும் இரவும் அன்றாட நிகழ்வுகளாக இருந்தாலும் அவற்றின் பின்னால் நுட்பமான இயங்குமுறை உள்ளது. வெளியில் ஒரு சிறிய தருணம் அவற்றைக் கவனிக்கும் வாய்ப்பாக அமையலாம்; சூரியஒளி எல்லா நோய்க்கும் மருந்தல்ல."],"practice":["Notice how the daylight changes over the day from a comfortable shaded place. Never look directly at the Sun; protect skin and eyes.","நிழலான வசதியான இடத்தில் இருந்து பகலொளி மாறுவதை கவனியுங்கள். சூரியனை நேரடியாகப் பார்க்காதீர்கள்; தோலையும் கண்களையும் பாதுகாக்கவும்."],"source":[["NIH · Healthy sleep","https://health.nih.gov/health-topics-a-z/healthy-sleep"],["NIH · Managing the body clock","https://www.nhlbi.nih.gov/health/circadian-rhythm-disorders/treatment"]],"related":["moon","sleep","walking"],"route":"practice"},{"id":"cow","en":"How a cow eats grass","ta":"மாடு புல்லை எப்படிச் செரிக்கிறது?","cat":"Nature","tags":"cow cattle buffalo milk grass digestion stomach ecology farming மாடு பசு","question":["How can a cow gain energy from grass that humans cannot digest?","மனிதர்களால் செரிக்க முடியாத புல்லிலிருந்து மாடு ஆற்றல் பெறுவது எப்படி?"],"explain":["Cattle have one stomach with four compartments. Microorganisms in the rumen ferment plant fibre, helping the animal use tough grass. This is a relationship between an animal and its microbes.","மாட்டிற்கு நான்கு பிரிவுகளைக் கொண்ட ஒரே இரைப்பை உள்ளது. ரூமன் எனும் பிரிவில் நுண்ணுயிர்கள் தாவர நாரை நொதிக்கச் செய்கின்றன. இதன் மூலம் மாடு புல்லிலுள்ள சத்துகளைப் பயன்படுத்துகிறது."],"reflect":["The animal we see every day depends on millions of unseen organisms. It is an example of how living systems are interconnected. Ethical treatment of animals is a separate human responsibility.","நாம் பார்க்கும் மாடு கண்ணுக்குத் தெரியாத கோடிக்கணக்கான நுண்ணுயிர்களின் உதவியுடன் வாழ்கிறது. உயிர்கள் எவ்வாறு இணைந்துள்ளன என்பதற்கு இது எடுத்துக்காட்டு. விலங்குகளை நன்றாக நடத்துவது மனிதப் பொறுப்பு."],"practice":["When you encounter an animal, give it space and observe quietly. Ask what food it actually needs rather than offering random human food.","விலங்கைக் கண்டால் இடமளித்து அமைதியாகக் கவனியுங்கள். மனித உணவைத் தராமல் அதற்கேற்ற உணவு எது என்று அறியுங்கள்."],"source":[["USDA · How rumens work","https://www.ars.usda.gov/ARSUserFiles/50901500/EducationalMaterialsMarch2012/rumens%20are%20special.pdf"]],"related":["banana","gratitude","moon"],"route":"animal"},{"id":"tea","en":"What is inside a cup of tea?","ta":"ஒரு கோப்பைத் தேநீரில் என்ன உள்ளது?","cat":"Food","tags":"tea chai ginger masala milk coffee caffeine ayurveda turmeric milk தேநீர் சாயா","question":["Does a warm drink heal the body, or is the story more complicated?","சூடான பானம் உடலைக் குணமாக்குமா, அல்லது உண்மை இன்னும் சிக்கலானதா?"],"explain":["Black, green, white and oolong tea come from the same tea plant. Preparation changes their character. Many teas contain caffeine, which can affect alertness and sleep. Herbal infusions are different plants.","கறுப்பு, பச்சை, வெள்ளை, ஊலோங் தேயிலைகள் ஒரே தேயிலைச் செடியிலிருந்து கிடைக்கின்றன. தயாரிப்பு முறை சுவையை மாற்றுகிறது. பல தேநீர்களில் உள்ள கஃபீன் விழிப்பு மற்றும் தூக்கத்தைப் பாதிக்கலாம். மூலிகைப் பானங்கள் வேறு தாவரங்களிலிருந்து வருகின்றன."],"reflect":["A family tea ritual can carry memory, welcome and care. Traditional use does not automatically prove a medical effect. Ordinary culinary ginger and turmeric are not magic medicines.","குடும்பத் தேநீர் பழக்கம் நினைவு, வரவேற்பு, அக்கறையைத் தாங்கலாம். பழமையான பயன்பாடு மட்டும் மருத்துவ பலனை நிரூபிக்காது. சமையலில் பயன்படுத்தும் இஞ்சி, மஞ்சள் அதிசய மருந்தல்ல."],"practice":["Prepare a familiar tea and notice its aroma and taste. If caffeine affects your sleep, choose timing and strength that suit you.","பழக்கமான தேநீரைத் தயாரித்து அதன் மணமும் சுவையும் கவனியுங்கள். கஃபீன் தூக்கத்தைப் பாதித்தால் உங்களுக்கேற்ற நேரமும் வலிமையும் தேர்வுசெய்யுங்கள்."],"source":[["NIH NCCIH · Tea and evidence","https://www.nccih.nih.gov/health/tea"],["NIH · Healthy sleep","https://health.nih.gov/health-topics-a-z/healthy-sleep"]],"related":["banana","sun","breath"],"route":"kitchen"},{"id":"banana","en":"Why a banana changes","ta":"வாழைப்பழம் ஏன் மாறுகிறது?","cat":"Food","tags":"banana fruit ripening food fibre potassium mango starch sugar dessert வாழைப்பழம் பழம்","question":["Why does a firm green banana become soft and sweet?","பச்சை வாழைப்பழம் ஏன் மென்மையாகவும் இனிப்பாகவும் மாறுகிறது?"],"explain":["During ripening, enzymes change some of the fruit’s starch into simpler sugars, and cell walls soften. Colour, aroma and texture change together. Different banana varieties behave differently.","பழுக்கும் போது நொதிகள் பழத்தில் உள்ள சில மாவுச்சத்துகளை எளிய சர்க்கரைகளாக மாற்றுகின்றன. செல்சுவர்கள் மென்மையாகின்றன. நிறம், மணம், தன்மை ஆகியவையும் மாறுகின்றன. வாழை வகைகளில் வேறுபாடுகள் உண்டு."],"reflect":["Ripening shows that change is not always decay. It can also be part of a useful natural process. This is a metaphor for reflection, not a prediction about people.","பழுத்தல் என்பது மாற்றம் எப்போதும் அழிவு அல்ல என்பதைக் காட்டுகிறது. அது இயற்கையான பயனுள்ள செயலாகவும் இருக்கலாம். இது ஒரு சிந்தனை உருவகம்; மனிதர்களைப் பற்றிய அறிவியல் முன்னறிவிப்பு அல்ல."],"practice":["Compare a green and ripe edible banana by sight and texture. Use food that is fresh and appropriately stored; discard spoiled fruit.","பச்சையும் பழுத்ததுமான உண்ணத்தக்க வாழைப்பழத்தின் நிறத்தையும் தன்மையையும் ஒப்பிடுங்கள். நல்ல நிலையில் உள்ள பழங்களையே உண்ணுங்கள்; கெட்ட பழத்தைத் தவிர்க்கவும்."],"source":[["USDA · FoodData Central","https://fdc.nal.usda.gov/"],["Encyclopaedia Britannica · Fruit ripening","https://www.britannica.com/science/fruit-processing"]],"related":["tea","cow","heart"],"route":"kitchen"},{"id":"hair","en":"Hair, roots and myths","ta":"முடியும் அதன் உண்மைகளும்","cat":"Body","tags":"hair scalp hair treatment coconut oil genes grey hair skin முடி தலை","question":["Why does hair change with age, stress and family history?","வயது, மனஅழுத்தம், குடும்ப மரபு ஆகியவற்றால் முடி ஏன் மாறுகிறது?"],"explain":["Hair grows from follicles in the skin. Genetics, hormones, health and life events can affect growth and shedding. No single oil can reverse every kind of hair loss.","முடி தோலில் உள்ள நுண் வேர் அமைப்புகளில் இருந்து வளர்கிறது. மரபணுக்கள், ஹார்மோன்கள், உடல்நிலை, வாழ்க்கை மாற்றங்கள் முடி வளர்ச்சியையும் உதிர்வையும் பாதிக்கலாம். ஒரு எண்ணெய் எல்லா வகை முடி உதிர்வையும் சரி செய்யாது."],"reflect":["Traditional hair-care habits are part of family knowledge. Value the memory, but distinguish what feels comfortable from treatment claims that need evidence.","முடி பராமரிப்பு மரபுகள் குடும்ப அறிவின் ஒரு பகுதி. அந்த நினைவுக்கு மதிப்பு தரலாம்; ஆனால் வசதியான பழக்கத்தையும் மருத்துவக் கூற்றையும் வேறுபடுத்த வேண்டும்."],"practice":["Notice whether your scalp feels comfortable, dry or irritated. Use gentle care, and ask a clinician about persistent or sudden hair changes.","தலைத்தோல் வசதியாக உள்ளதா, உலர்ந்ததா, எரிச்சலா கவனியுங்கள். மென்மையாகப் பராமரித்து, திடீர் அல்லது நீடித்த மாற்றத்திற்கு மருத்துவரை அணுகுங்கள்."],"source":[["MedlinePlus · Hair loss","https://medlineplus.gov/ency/article/003246.htm"]],"related":["sun","heart","walking"],"route":"science"},{"id":"heart","en":"The heart and the word ‘heart’","ta":"இதயமும் அதன் உருவக அர்த்தமும்","cat":"Body","tags":"heart blood circulation emotions love heartclear இதயம் இரத்தம்","question":["Why does ‘heart’ describe both an organ and our feelings?","‘இதயம்’ என்பது ஒரு உறுப்பையும் உணர்வுகளையும் ஏன் குறிக்கிறது?"],"explain":["The physical heart is a muscular pump that moves blood through lungs and the rest of the body. Feelings involve brain processes, hormones and bodily signals. An emotion is not stored in the heart muscle.","உண்மையான இதயம் நுரையீரலுக்கும் உடலுக்கும் இரத்தத்தைச் செலுத்தும் தசை உறுப்பு. உணர்வுகளில் மூளை, ஹார்மோன்கள், உடல் சைகைகள் பங்குபெறுகின்றன. உணர்ச்சி இதயத் தசையில் சேமிக்கப்படுவதில்லை."],"reflect":["Many traditions use the heart as a symbol for intention, care and moral character. That metaphor can be meaningful without replacing what medicine knows about anatomy.","பல மரபுகள் நோக்கம், அன்பு, ஒழுக்கம் போன்றவற்றின் உருவகமாக இதயத்தைப் பயன்படுத்துகின்றன. அந்த உருவகம் அர்த்தமுள்ளதாக இருக்கலாம்; மருத்துவ உடற்கூறை மாற்றாது."],"practice":["Notice one way your body responds to excitement or worry. Name the feeling in simple language without treating it as a diagnosis.","மகிழ்ச்சி அல்லது கவலை நேரத்தில் உடல் எப்படி மாறுகிறது எனக் கவனியுங்கள். மருத்துவ முடிவு எடுக்காமல் அந்த உணர்வை எளிய சொற்களில் பெயரிடுங்கள்."],"source":[["MedlinePlus · Anatomy","https://medlineplus.gov/anatomy.html"]],"related":["gratitude","breath","action"],"route":"science"},{"id":"breath","en":"Breathing is a living exchange","ta":"மூச்சு: உயிரின் பரிமாற்றம்","cat":"Practice","tags":"breath lungs oxygen carbon dioxide meditation pranayama breathing yoga மூச்சு தியானம்","question":["What happens inside us every time we breathe?","ஒவ்வொரு மூச்சின் போதும் நமக்குள் என்ன நடக்கிறது?"],"explain":["Air reaches tiny sacs in the lungs called alveoli. Oxygen passes into blood and carbon dioxide moves out. The brain adjusts breathing automatically. Normal comfortable breathing does not require extreme breath-holding.","காற்று நுரையீரலின் நுண்ணிய காற்றுப்பைகளை அடைகிறது. ஆக்சிஜன் இரத்தத்துக்குள் செல்கிறது; கார்பன் டைஆக்சைடு வெளியேறுகிறது. மூளை தானாக மூச்சை ஒழுங்குபடுத்துகிறது. இயல்பான மூச்சுக்கு வலுக்கட்டாயமாகப் பிடித்திருப்பது தேவையில்லை."],"reflect":["Many contemplative traditions notice breathing. Awareness may help someone feel grounded, but a breathing practice is not proof of a supernatural or medical result.","பல தியான மரபுகள் மூச்சைக் கவனிக்கின்றன. கவனம் மனதை ஒருமுகப்படுத்த உதவலாம்; மூச்சுப் பயிற்சி அற்புதம் அல்லது மருத்துவ பலன் உறுதியானதற்கான ஆதாரம் அல்ல."],"practice":["Sit or stand comfortably and notice a few natural breaths. Do not force deep breathing or holds. Stop if uncomfortable.","வசதியாக அமர்ந்து அல்லது நின்று சில இயல்பான மூச்சுகளை கவனியுங்கள். ஆழமாக வற்புறுத்தவோ மூச்சைப் பிடிக்கவோ வேண்டாம். அசௌகரியம் இருந்தால் நிறுத்துங்கள்."],"source":[["MedlinePlus · Lungs and breathing","https://medlineplus.gov/lungdiseases.html"]],"related":["walking","heart","gratitude"],"route":"practice"},{"id":"gratitude","en":"Gratitude becomes action","ta":"நன்றியைச் செயலாக்குவது","cat":"Practice","tags":"gratitude kindness discipline reflection emotion giving help scripture thanks நன்றி பண்பு","question":["Can gratitude be more than a sentence we repeat?","நன்றி என்பது சொல்லும் ஒரு வார்த்தையைவிட அதிகமாக இருக்க முடியுமா?"],"explain":["Gratitude is an emotion and a deliberate way of noticing what helped us. It does not remove unfairness or difficult feelings. A useful action is to make appreciation specific and proportionate.","நன்றி என்பது ஒரு உணர்வும் நமக்குப் பயனளித்ததை கவனிக்கும் முறையும் ஆகும். அது அநீதியையோ கடினமான உணர்வுகளையோ அழிக்காது. குறிப்பிட்ட உதவியை உணர்ந்து நியாயமாக நன்றி தெரிவிப்பது பயனுள்ளது."],"reflect":["Faith traditions often encourage thankfulness. In ordinary life, gratitude can coexist with honest questions, frustration and a wish to improve the world.","மத மரபுகள் நன்றியுணர்வை வலியுறுத்துகின்றன. அன்றாட வாழ்வில் நன்றி, நியாயமான கேள்வி, ஏமாற்றம், உலகை மேம்படுத்தும் விருப்பம் ஆகியவை ஒன்றாக இருக்கலாம்."],"practice":["Name one helpful action someone took. If appropriate, thank them or pass the care forward in a small practical way.","யாரோ உங்களுக்குச் செய்த ஒரு உதவியை நினையுங்கள். பொருத்தமாக இருந்தால் அவருக்கு நன்றி சொல்லுங்கள் அல்லது அக்கறையைச் சிறிய செயலில் தொடருங்கள்."],"source":[["NIH · Emotional wellness","https://www.nih.gov/health-information/emotional-wellness-toolkit"]],"related":["action","birds","heart"],"route":"books"},{"id":"sleep","en":"What the sleeping brain does","ta":"தூங்கும் மூளை என்ன செய்கிறது?","cat":"Body","tags":"sleep dream deep sleep night night meditation body clock தூக்கம் கனவு இரவு","question":["If we are resting, why is the brain still active?","நாம் ஓய்வெடுக்கும்போது மூளை ஏன் தொடர்ந்து செயல்படுகிறது?"],"explain":["Sleep is an active process with stages. Memory, hormones, immune function and repair are associated with healthy sleep. The internal clock responds to light and daily routines.","தூக்கம் பல நிலைகளைக் கொண்ட செயலில் இருக்கும் செயல்முறை. நினைவு, ஹார்மோன்கள், நோய் எதிர்ப்பு, திசு மீட்பு ஆகியவற்றுக்கு தூக்கம் முக்கியம். ஒளியும் அன்றாட வழக்கமும் உடற்கடிகாரத்தைப் பாதிக்கின்றன."],"reflect":["Rest is not wasted time. A discipline that never allows recovery is not the same as good care.","ஓய்வு என்பது நேரத்தை வீணாக்குவது அல்ல. மீளும் வாய்ப்பே இல்லாத கட்டுப்பாடு நல்ல பராமரிப்புக்கு சமமல்ல."],"practice":["Choose one realistic, comfortable habit that helps evening rest, such as dimmer light or a regular routine. Avoid treating meditation as a substitute for sleep.","மாலையில் ஓய்வுக்கு உதவும் ஒரு எளிய பழக்கத்தைத் தேர்ந்தெடுக்கவும்; மங்கிய ஒளி அல்லது சீரான நேரம் போன்றது. தியானத்தை தூக்கத்திற்கு மாற்றாகக் கருத வேண்டாம்."],"source":[["NIH · Healthy sleep","https://health.nih.gov/health-topics-a-z/healthy-sleep"]],"related":["sun","breath","gratitude"],"route":"practice"}];
const byId=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STORE='hcInfinityProgressV211',SETTINGS='hcInfinitySettingsV211';
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback}catch(_){return fallback}};
const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch(_){}};
let saved=read(STORE,{last:null,history:[],favourites:[],notes:{}});
if(!saved||typeof saved!=='object')saved={last:null,history:[],favourites:[],notes:{}};
if(!Array.isArray(saved.history))saved.history=[];
if(!Array.isArray(saved.favourites))saved.favourites=[];
if(!saved.notes||typeof saved.notes!=='object')saved.notes={};
const prefs=read(SETTINGS,{language:'en',largeText:true});
let language=prefs.language==='ta'?'ta':'en',largeText=prefs.largeText!==false;
const T=(en,ta)=>language==='ta'?ta:en;
const L=arr=>Array.isArray(arr)?arr[language==='ta'?1:0]:String(arr||'');
const get=id=>data.find(t=>t.id===id);
let id=null,step=0,stack=[],searchQuery='';
function persist(){save(STORE,saved)}
function goHome(){
 if(typeof show==='function')show('home');
 else{reader.classList.remove('active');home.classList.add('active')}
 document.querySelectorAll('#bottomNav .nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav==='home'));
 try{window.scrollTo(0,0)}catch(_){}
}
const reader=document.createElement('section');
reader.id='hcInfinityJourney';reader.className='screen hc-infinity-screen';
reader.setAttribute('aria-label','HeartClear Infinity Journey');
reader.innerHTML='<div class="hci-shell"><header class="hci-header"><button type="button" id="hciBack">← '+T('Back','பின்னால்')+'</button><span class="hci-mark" aria-hidden="true">∞</span><button type="button" id="hciHome">⌂ '+T('Home','முகப்பு')+'</button></header><main id="hciStage" tabindex="-1"></main></div>';
home.insertAdjacentElement('afterend',reader);
const css=document.createElement('style');css.id='hcInfinityStyleV211';
css.textContent=[
 '#hcInfinityJourney.screen{display:none;flex-direction:column;min-width:0;padding:0 0 calc(110px + env(safe-area-inset-bottom,0px));background:#07151e;color:#f9fcfd}',
 '#hcInfinityJourney.screen.active{display:flex}',
 '#hcInfinityJourney .hci-shell{width:min(100%,680px);margin:0 auto;padding:0 10px}',
 '#hcInfinityJourney .hci-header{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 0;background:#07151e;border-bottom:1px solid #45606c}',
 '#hcInfinityJourney .hci-header button{background:#152d3a;border:1px solid #7b949d;border-radius:12px;min-height:52px;padding:7px 14px;color:#fff;font:700 15px system-ui;cursor:pointer}',
 '#hcInfinityJourney .hci-mark{font:700 32px system-ui;line-height:1;color:#fff}',
 '#hcInfinityJourney #hciStage{padding:12px 0 20px;outline:none}',
 '#hcInfinityJourney h1{font-size:clamp(27px,6vw,34px);line-height:1.18;letter-spacing:-.03em;margin:9px 0 12px}',
 '#hcInfinityJourney h2{font-size:clamp(22px,5vw,27px);line-height:1.25;margin:7px 0 12px}',
 '#hcInfinityJourney p{font-size:16px;line-height:1.65;color:#edf3f5;margin:10px 0 16px}',
 '#hcInfinityJourney small,#hcInfinityJourney .hci-muted{font-size:13px;color:#c8d7dd;line-height:1.5}',
 '#hcInfinityJourney .hci-hero{border:1px solid #607a85;border-radius:26px;background:#102735;padding:20px 16px;margin:4px 0 13px;overflow:hidden}',
 '#hcInfinityJourney .hci-bubble{width:104px;height:104px;display:grid;place-items:center;border:2px solid #dceaf0;border-radius:50%;margin:8px auto 15px;box-shadow:0 0 0 10px #dceaf00c;font:600 67px system-ui}',
 '#hcInfinityJourney .hci-kicker{font-size:12px;font-weight:800;letter-spacing:.05em;color:#d6e6ee;text-transform:uppercase}',
 '#hcInfinityJourney .hci-hero .hci-kicker,#hcInfinityJourney .hci-hero h1,#hcInfinityJourney .hci-hero p{text-align:center}',
 '#hcInfinityJourney button,#hcInfinityJourney select,#hcInfinityJourney input,#hcInfinityJourney textarea{font-family:inherit}',
 '#hcInfinityJourney .hci-mainbtn,#hcInfinityJourney .hci-option{width:100%;min-height:58px;padding:14px 16px;font-size:17px;font-weight:700;line-height:1.35;border-radius:16px;cursor:pointer}',
 '#hcInfinityJourney .hci-mainbtn{background:#f4f8f7;color:#07151e;border:1px solid #f4f8f7}',
 '#hcInfinityJourney .hci-option{background:#152f3d;color:#fff;border:1px solid #6b8792;text-align:left}',
 '#hcInfinityJourney .hci-actions{display:grid;gap:9px;margin:13px 0}',
 '#hcInfinityJourney .hci-subactions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:9px 0}',
 '#hcInfinityJourney .hci-subactions button{min-height:49px;padding:10px;border-radius:13px;background:#193442;border:1px solid #587480;color:#fff;font-size:15px;cursor:pointer}',
 '#hcInfinityJourney .hci-fields{display:flex;gap:9px;align-items:center;margin:14px 0}',
 '#hcInfinityJourney .hci-fields input{width:100%;font-size:19px;min-height:56px;background:#112e3c;color:#fff;border:1px solid #849daa;border-radius:15px;padding:12px 14px}',
 '#hcInfinityJourney .hci-tile{width:100%;text-align:left;background:#102c39;color:#fff;border:1px solid #63808e;border-radius:20px;padding:17px;min-height:82px;cursor:pointer}',
 '#hcInfinityJourney .hci-tile strong{display:block;font-size:19px;margin-bottom:4px}',
 '#hcInfinityJourney .hci-tile small{display:block;font-size:13px}',
 '#hcInfinityJourney .hci-results{display:grid;gap:9px;margin:13px 0}',
 '#hcInfinityJourney .hci-paper{border:1px solid #4a6571;background:#0e2632;border-radius:21px;padding:18px 16px;animation:hciArrive .18s ease-out;scroll-margin-top:76px}',
 '#hcInfinityJourney .hci-paper .hci-note{border-left:3px solid #dceaf0;padding:5px 0 5px 13px;margin:12px 0;background:transparent}',
 '#hcInfinityJourney .hci-paper .hci-note strong{display:block;font-size:14px;margin:0 0 4px}',
 '#hcInfinityJourney .hci-ref{display:block;max-width:100%;padding:9px 0;color:#d8f1ff;text-decoration:underline;font-size:15px;overflow-wrap:anywhere}',
 '#hcInfinityJourney .hci-exit{margin-top:10px;border-top:1px solid #4a6571;padding-top:15px}',
 '#hcInfinityJourney textarea{width:100%;min-height:100px;resize:vertical;background:#102834;color:#fff;border:1px solid #8597a0;border-radius:14px;padding:13px;font-size:17px;line-height:1.5}',
 '#hcInfinityJourney .hci-select{color:#fff;border:1px solid #78919c;border-radius:12px;background:#15313e;font-size:15px;min-height:43px;padding:8px}',
 '#hcInfinityJourney .hci-row{display:flex;align-items:center;gap:8px;justify-content:space-between;flex-wrap:wrap}',
 '#hcInfinityJourney .hci-progress{display:flex;justify-content:center;gap:8px;margin:13px 0 17px}',
 '#hcInfinityJourney .hci-dot{width:10px;height:10px;border-radius:50%;border:1px solid #a8c1ca;background:transparent}',
 '#hcInfinityJourney .hci-dot.active{background:white}',
 'body[data-hc-cinema-route="hcInfinityJourney"] #hcCinemaHero{display:none!important}',
 '#hcInfinityJourney .hci-hero{padding:15px 17px;margin:0 0 9px}',
 '#hcInfinityJourney .hci-hero h1{font-size:clamp(25px,5.3vw,31px);margin:8px 0}',
 '#hcInfinityJourney .hci-hero p{font-size:17px;line-height:1.5;margin:8px 0}',
 '#hcInfinityJourney button.hci-dot{width:40px;height:36px;padding:0;position:relative;border:0;background:transparent;border-radius:18px;cursor:pointer}',
 '#hcInfinityJourney button.hci-dot::after{content:"";position:absolute;left:15px;top:13px;width:10px;height:10px;border:1px solid #a8c1ca;border-radius:50%;background:transparent}',
 '#hcInfinityJourney button.hci-dot.active::after{background:white}',
 '#hcInfinityJourney .hci-paper p{max-width:66ch}',
 '#hcInfinityJourney .hci-paper .hci-kicker + h2{margin-bottom:16px}',
 '#hcInfinityJourney .hci-swipehint{font-size:12px;color:#b8cad2;text-align:center;margin:12px 0}',
 '#hcInfinityJourney details.hci-paper>summary{font-size:18px;min-height:42px;font-weight:700;cursor:pointer}',
 '#hcInfinityJourney .hci-tag{font-size:12px;letter-spacing:.04em;font-weight:700;color:#d7e5eb}',
 '#hcInfinityJourney :is(button,select,input,textarea,a):focus-visible,#hciHomeEntry:focus-visible{outline:3px solid white;outline-offset:3px}',
 '#home #hciHomeEntry{width:100%;display:flex;align-items:center;gap:13px;border:1px solid #8299a2;border-radius:23px;background:#0e2530;color:#fff;padding:13px 16px;min-height:91px;text-align:left;font:inherit;cursor:pointer;margin:10px 0}',
 '#home #hciHomeEntry .hci-homeglyph{font-size:51px;line-height:1;flex:none;font-weight:600}',
 '#home #hciHomeEntry strong{display:block;font-size:22px;line-height:1.3}',
 '#home #hciHomeEntry small{display:block;color:#c9d9df;font-size:14px;line-height:1.45;margin-top:4px}',
 '#bottomNav:not(.hidden){grid-template-columns:repeat(3,minmax(0,1fr))!important;min-height:76px;max-width:520px}',
 '#bottomNav .nav-item[data-nav]:not([data-nav="home"]):not([data-nav="settings"]):not([data-nav="hcInfinityJourney"]){display:none!important}',
 '#bottomNav .nav-item{font-size:15px!important;min-height:62px!important;gap:5px!important}',
 '#bottomNav .nav-item svg{width:23px!important;height:23px!important}',
 '#bottomNav .nav-item span{font-size:15px!important}',
 '#home #hcHomeRoutineV155 h2{font-size:24px}',
 '@keyframes hciArrive{from{opacity:.4;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
 '@media(prefers-reduced-motion:reduce){#hcInfinityJourney *,#hcInfinityJourney *::before{animation:none!important;transition:none!important}}',
 'body.reduce-motion #hcInfinityJourney *{animation:none!important;transition:none!important}',
 'body.hci-large-type #hcInfinityJourney p{font-size:19px;line-height:1.7}',
 'body.hci-large-type #hcInfinityJourney .hci-paper{padding:21px 17px}',
 'body.hci-large-type #hcInfinityJourney .hci-paper h2{font-size:27px}',
 'body.hci-large-type #hcInfinityJourney .hci-ref{font-size:17px}',
 'body.hci-large-type #bottomNav .nav-item span{font-size:17px!important}',
 '@media(max-width:350px){#hcInfinityJourney .hci-shell{padding:0 6px}#hcInfinityJourney .hci-subactions{grid-template-columns:1fr}}'
].join('\n');
document.head.append(css);
document.body.classList.toggle('hci-large-type',largeText);
const head=home.querySelector('.hc-home-greeting-row')||home.firstElementChild;
const entry=document.createElement('button');entry.id='hciHomeEntry';entry.type='button';
entry.innerHTML='<span class="hci-homeglyph" aria-hidden="true">∞</span><span><strong>Explore · ஆராயுங்கள்</strong><small>One question. Go deeper. Return Home.</small></span>';
if(head)head.insertAdjacentElement('afterend',entry);else home.prepend(entry);
entry.addEventListener('click',()=>open());
const exploreBtn=document.createElement('button');
exploreBtn.className='nav-item';exploreBtn.dataset.nav='hcInfinityJourney';exploreBtn.type='button';exploreBtn.setAttribute('aria-label','Explore');
exploreBtn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" /></svg><span>Explore</span>';
const settingsNav=nav.querySelector('[data-nav="settings"]');
if(settingsNav)settingsNav.before(exploreBtn);else nav.append(exploreBtn);
const mixCard=byId('hcMixCard');
if(mixCard&&!byId('hciSaveSoundMix')){
 const actions=mixCard.querySelector('.hc-mix-actions');
 if(actions){
  const saveMix=document.createElement('button');saveMix.id='hciSaveSoundMix';saveMix.type='button';
  saveMix.textContent='Save mix settings';saveMix.style.cssText='min-height:46px;border:1px solid #90a6ad;border-radius:12px;background:#163440;color:white;padding:9px 13px;font:700 13px system-ui';
  saveMix.addEventListener('click',()=>{
   try{
    if(typeof hcMixSelected==='undefined'||typeof hcMixOptions==='undefined')throw Error('Mixer unavailable');
    const layers=Object.entries(hcMixSelected).filter(pair=>hcMixOptions.some(x=>x.id===pair[0])).slice(0,3).map(pair=>({id:pair[0],volume:Math.max(0,Math.min(1,Number(pair[1])||.4))}));
    if(!layers.length){if(typeof hcMixMessage==='function')hcMixMessage('Choose at least one sound first.');return}
    localStorage.setItem('heartclearRecentMixV1',JSON.stringify({layers,updatedAt:Date.now()}));
    if(typeof hcRenderMixer==='function')hcRenderMixer();
    if(typeof hcMixMessage==='function')hcMixMessage('Mix settings saved on this device. This does not export an audio file.');
   }catch(_){if(typeof hcMixMessage==='function')hcMixMessage('Saving is unavailable on this device.')}
  });
  actions.append(saveMix);
 }
}
const settingsScreen=byId('settings');
if(settingsScreen){
 const settingsBlock=document.createElement('div');settingsBlock.className='setting-row';
 settingsBlock.innerHTML='<div><strong>Large text in Explore</strong><small>Easy to read · தமிழ் / English</small></div><button class="offline-action" id="hciSizeBtn" type="button"></button>';
 const target=settingsScreen.querySelector('.hc-settings-stack');
 if(target){target.prepend(settingsBlock);const b=settingsBlock.querySelector('button');b.addEventListener('click',()=>{largeText=!largeText;document.body.classList.toggle('hci-large-type',largeText);prefs.largeText=largeText;save(SETTINGS,prefs);b.textContent=largeText?'On':'Off'});b.textContent=largeText?'On':'Off'}
}
function activeNav(){
 nav.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav==='hcInfinityJourney'));
}
function focusStage(){const stage=byId('hciStage');try{stage.focus({preventScroll:true})}catch(_){}try{window.scrollTo(0,0)}catch(_){}}
function focusReading(){
 // In-lesson navigation must keep readers at the article, not jump to the page banner.
 requestAnimationFrame(()=>{
  const panel=byId('hciReadingPanel');if(!panel)return;
  const header=reader.querySelector('.hci-header');
  const offset=(header?.getBoundingClientRect().height||0)+12;
  const top=window.scrollY+panel.getBoundingClientRect().top-offset;
  window.scrollTo({top:Math.max(0,top),left:0,behavior:'instant'});
 });
}
function changeStep(value){
 if(!id||value<0||value>2)return;
 step=value;render();focusReading();
}
function open(topic){
 if(typeof show==='function')show('hcInfinityJourney');
 else{document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));reader.classList.add('active')}
 activeNav();const topLabel=byId('topContext');if(topLabel)topLabel.textContent='Explore';stack=[];id=get(topic)?.id||null;step=0;
 if(id)remember(id);
 render();focusStage();
}
function remember(x){
 saved.last=x;
 saved.history=[x,...saved.history.filter(y=>y!==x)].slice(0,16);
 persist();
}
function choose(x){
 if(!get(x))return;
 if(id)stack.push({id,step});
 id=x;step=0;remember(x);render();focusReading();
}
function next(){
 if(!id)return;
 if(step<2){changeStep(step+1);return}
 const current=get(id);
 if(current?.related?.length)choose(current.related[0]);
 else open();
}
function back(){
 if(!id){goHome();return}
 if(step>0){changeStep(step-1);return}
 const p=stack.pop();
 if(p){id=p.id;step=p.step;render();focusReading()}
 else{id=null;render();focusStage()}
}
function route(name){
 if(name==='kitchen'){
  goHome();
  const element=byId('hcKitchenAskInput')||byId('hcHomeKitchenQuickV155');
  if(element)requestAnimationFrame(()=>element.scrollIntoView({block:'center',behavior:'auto'}));
 }else if(name==='quran'){
  if(typeof window.hcOpenQuranStudy==='function')window.hcOpenQuranStudy();
  else if(window.HCHeritageReader)window.HCHeritageReader.open('quran');
  else if(typeof show==='function')show('library');
 }else if(name==='bible')window.HCHeritageReader?window.HCHeritageReader.open('newtestament'):typeof show==='function'&&show('library');
 else if(name==='gita')window.HCHeritageReader?window.HCHeritageReader.open('gita'):typeof show==='function'&&show('library');
 else if(name==='science')window.HCHeritageReader?window.HCHeritageReader.open('medicine'):typeof show==='function'&&show('library');
 else if(name==='animal'){
  goHome();
  const animal=byId('hcAnimalsV192'),drawer=byId('hcKitchenDrawer'),kitchen=byId('hcMonthlyKitchen');
  if(drawer)drawer.open=true;
  if(kitchen)kitchen.hidden=false;
  if(animal){
   animal.open=true;
   requestAnimationFrame(()=>animal.scrollIntoView({block:'start',behavior:'auto'}));
  }else if(kitchen)requestAnimationFrame(()=>kitchen.scrollIntoView({block:'start',behavior:'auto'}));
 }
 else if(name==='books')typeof show==='function'&&show('library');
 else if(name==='reels'&&typeof show==='function')show('hcReels');
 else if(name==='sounds'&&typeof openSoundLab==='function')openSoundLab();
 else if(typeof show==='function')show('practices');
}
function mk(label,className,action){const b=document.createElement('button');b.type='button';b.className=className;b.textContent=label;b.addEventListener('click',action);return b}
const sections=['Understand','Reflect','Try today'];
const taSections=['புரிந்துகொள்','சிந்தி','இன்று செய்'];
function render(){
 const stage=byId('hciStage');if(!stage)return;
 byId('hciBack').textContent= id?'← '+T('Back','பின்னால்'):'← '+T('Home','முகப்பு');
 byId('hciHome').textContent='⌂ '+T('Home','முகப்பு');
 stage.replaceChildren();
 if(!id){
  const title=document.createElement('div');title.className='hci-hero';
  title.innerHTML='<div class="hci-bubble" aria-hidden="true">∞</div><span class="hci-kicker">HEARTCLEAR · INFINITY JOURNEY</span><h1>'+esc(T('Where shall we begin?','எதிலிருந்து தொடங்கலாம்?'))+'</h1><p>'+esc(T('A simple question can lead to science, scripture, daily life and practice. One subject at a time.','ஒரு எளிய கேள்வி அறிவியல், ஆன்மிகம், வாழ்க்கை, பயிற்சி என பல வழிகளில் அழைத்துச் செல்லலாம். ஒரே நேரத்தில் ஒரு தலைப்பு.'))+'</p>';
  stage.append(title);
  const bar=document.createElement('div');bar.className='hci-fields';
  const field=document.createElement('input');field.id='hciFind';field.type='search';field.autocomplete='off';field.maxLength=95;field.setAttribute('aria-label',T('Search subjects','தலைப்பைத் தேடு'));field.placeholder=T('Moon, feet, tea, Bible, breath…','நிலா, பாதம், தேநீர், மூச்சு…');field.value=searchQuery;
  bar.append(field);stage.append(bar);
  const results=document.createElement('div');results.className='hci-results';stage.append(results);
  function listing(){
   results.replaceChildren();
   const q=field.value.trim().toLocaleLowerCase();
   const norm=x=>String(x||'').toLocaleLowerCase().normalize('NFKC');
   const found=q?data.filter(x=>norm([x.en,x.ta,x.tags,x.question[0],x.question[1]].join(' ')).includes(norm(q))).slice(0,10):[];
   if(q&&!found.length){const m=document.createElement('p');m.textContent=T('No saved subject yet. Try Moon, tea, heart or action.','இந்தத் தலைப்பு இன்னும் இல்லை. நிலா, தேநீர், இதயம் அல்லது செயல் தேடுங்கள்.');results.append(m);return}
   const recommended=found.length?found:[data[new Date().getDate()%data.length]];
   const hint=document.createElement('small');hint.textContent=q?T('Search results','தேடல் முடிவுகள்'):T('A doorway for today','இன்றைய தொடக்கம்');results.append(hint);
   recommended.forEach(x=>{
    const b=mk(L([x.en,x.ta])+'  →','hci-tile',()=>choose(x.id));
    b.innerHTML='<strong>'+esc(L([x.en,x.ta]))+'</strong><small>'+esc(L(x.question))+'</small>';
    results.append(b);
   });
  }
  field.addEventListener('input',()=>{searchQuery=field.value;listing()});
  field.addEventListener('keydown',evt=>{if(evt.key==='Enter'){evt.preventDefault();const q=field.value.toLocaleLowerCase();const found=data.find(x=>(x.en+' '+x.ta+' '+x.tags).toLocaleLowerCase().includes(q));if(found)choose(found.id)}});
  listing();
  const row=document.createElement('div');row.className='hci-subactions';
  const continueButton=mk(T('Continue reading','தொடர்ந்து வாசி'),'hci-option',()=>choose(saved.last||'moon'));row.append(continueButton);
  const chooseButton=mk(T('Find a topic','தலைப்பைத் தேடு'),'hci-option',()=>field.focus());row.append(chooseButton);
  stage.append(row);
  if(saved.favourites.length){
   const favourites=document.createElement('details');favourites.className='hci-paper';
   const summary=document.createElement('summary');summary.textContent=T('Saved topics','சேமித்த தலைப்புகள்')+' · '+saved.favourites.length;favourites.append(summary);
   const picks=document.createElement('div');picks.className='hci-actions';
   saved.favourites.map(get).filter(Boolean).forEach(x=>picks.append(mk(L([x.en,x.ta])+' →','hci-option',()=>choose(x.id))));
   favourites.append(picks);stage.append(favourites);
  }
  const quickPaths=document.createElement('details');quickPaths.className='hci-paper';
  const quickSummary=document.createElement('summary');quickSummary.textContent=T('Practice, books and sound','பயிற்சி, புத்தகங்கள், ஒலி');quickPaths.append(quickSummary);
  const quickButtons=document.createElement('div');quickButtons.className='hci-actions';
  quickButtons.append(mk(T('Open Practice','பயிற்சி திற')+' →','hci-option',()=>route('practice')),mk(T('Watch Reels','ரீல்ஸ் பார்க்க')+' →','hci-option',()=>route('reels')),mk(T('Read books & scripture','நூல்கள், வேதம் வாசி')+' →','hci-option',()=>route('books')),mk(T('Create a nature sound mix','இயற்கை ஒலிக்கலவை')+' →','hci-option',()=>route('sounds')));
  quickPaths.append(quickButtons);stage.append(quickPaths);
  const title2=document.createElement('p');title2.className='hci-kicker';title2.textContent=T('Or choose a doorway','அல்லது ஒரு வழியைத் தேர்ந்தெடு');stage.append(title2);
  const cats=[['Nature','moon','Nature · இயற்கை'],['Scripture','birds','Scripture · வேதம்'],['Body','walking','Body · உடல்'],['Food','tea','Food · உணவு'],['Practice','breath','Practice · பயிற்சி']];
  const options=document.createElement('div');options.className='hci-actions';
  cats.forEach(row=>options.append(mk(row[2]+' →','hci-option',()=>choose(row[1]))));
  stage.append(options);
  const quick=document.createElement('p');quick.className='hci-muted';quick.textContent=T('Swipe sideways inside a lesson. Scroll up or down normally. Home is always one tap away.','பாடத்துக்குள் பக்கவாட்டில் ஸ்வைப் செய்யலாம். மேல்கீழ் வழக்கம்போல் நகர்த்தலாம். முகப்பு ஒரு தொடுதலில்.');stage.append(quick);
 }else{
  const item=get(id);if(!item){id=null;render();return}
  const heading=document.createElement('div');heading.className='hci-hero';
  heading.innerHTML='<div class="hci-row"><span class="hci-tag">'+esc(item.cat)+' · '+(step+1)+'/3</span><select class="hci-select" id="hciLang" aria-label="Language"><option value="en">English</option><option value="ta">தமிழ்</option></select></div><h1>'+esc(L([item.en,item.ta]))+'</h1><p>'+esc(L(item.question))+'</p>';
  stage.append(heading);
  const chooseLanguage=heading.querySelector('select');chooseLanguage.value=language;
  chooseLanguage.addEventListener('change',evt=>{language=evt.target.value==='ta'?'ta':'en';prefs.language=language;save(SETTINGS,prefs);render();focusReading()});
  const dots=document.createElement('div');dots.className='hci-progress';dots.setAttribute('aria-label','Lesson progress');
  for(let x=0;x<3;x++){
   const dot=document.createElement('button');dot.type='button';dot.className='hci-dot'+(x===step?' active':'');
   dot.setAttribute('aria-label',T(sections[x],taSections[x])+' · '+(x+1)+'/3');
   dot.setAttribute('aria-current',String(x===step?'step':'false'));
   dot.addEventListener('click',()=>changeStep(x));dots.append(dot);
  }stage.append(dots);
  const paper=document.createElement('article');paper.className='hci-paper';paper.id='hciReadingPanel';
  paper.innerHTML='<span class="hci-kicker">'+esc(T(sections[step],taSections[step]))+'</span><h2>'+esc(step===0?T('How it works','எப்படிச் செயல்படுகிறது'):step===1?T('What can it mean?','இதன் அர்த்தம் என்ன?'):T('Bring it into life','வாழ்வில் பயன்படுத்தலாம்'))+'</h2><p>'+esc(L(step===0?item.explain:step===1?item.reflect:item.practice))+'</p>';
  const additional=window.HCInfinityDepth?.[item.id]?.[language]?.[step]||'';
  additional.split(/\n\s*\n/).filter(Boolean).forEach(paragraph=>{
   const text=document.createElement('p');text.textContent=paragraph.trim();paper.append(text);
  });
  if(step===1){
   const note=document.createElement('div');note.className='hci-note';
   note.innerHTML='<strong>'+esc(T('Reading with care','தெளிவாக வாசிப்போம்'))+'</strong><p>'+esc(T('Scripture references are not science experiments. Personal reflections are not presented as quotations or proven medical facts.','வேத வசனங்கள் அறிவியல் சோதனைகள் அல்ல. தனிச் சிந்தனைகளை மூல மேற்கோளாகவோ மருத்துவ உண்மையாகவோ காட்டுவதில்லை.'))+'</p>';
   paper.append(note);
  }
  if(step===2){
   const label=document.createElement('label');label.htmlFor='hciNote';label.className='hci-kicker';label.textContent=T('My one thought (private on this device)','என் ஒரு சிந்தனை (இந்தச் சாதனத்தில் மட்டும்)');
   const area=document.createElement('textarea');area.id='hciNote';area.maxLength=700;area.placeholder=T('What did I notice?','நான் கவனித்தது என்ன?');area.value=String(saved.notes[item.id]||'');
   const saveButton=mk(T('Save this thought','இந்தச் சிந்தனையைச் சேமி'),'hci-option',()=>{
    saved.notes[item.id]=area.value.trim();persist();notice.textContent=T('Saved on this device.','இந்தச் சாதனத்தில் சேமிக்கப்பட்டது.');
   });
   const notice=document.createElement('small');notice.setAttribute('role','status');
   paper.append(label,area,saveButton,notice);
  }
  if(step===0||step===1){
   const label=document.createElement('div');label.className='hci-exit';
   const title=document.createElement('span');title.className='hci-kicker';title.textContent=T('Check the original information','மூல ஆதாரத்தைப் பாருங்கள்');label.append(title);
   item.source.forEach(pair=>{const a=document.createElement('a');a.className='hci-ref';a.href=pair[1];a.target='_blank';a.rel='noopener noreferrer';a.textContent=pair[0]+' ↗';label.append(a)});
   paper.append(label);
  }
  stage.append(paper);
  const main=mk(step<2?T('Next · '+sections[step+1],'அடுத்து · '+taSections[step+1]):T('Go deeper →','மேலும் ஆழமாக →'),'hci-mainbtn',next);
  stage.append(main);
  if(step===2){
   const openArea=document.createElement('div');openArea.className='hci-actions';
   const labels={quran:['Read Qur’an','குர்ஆன் வாசி'],bible:['Read Bible','பைபிள் வாசி'],gita:['Read Gita','கீதை வாசி'],science:['Explore medical science','மருத்துவ அறிவியல்'],kitchen:['Find recipes','செய்முறை தேடு'],animal:['Learn animal care','விலங்குகளை அறி'],practice:['Open Practice','பயிற்சி திற'],books:['Open books','புத்தகங்கள்']};
   const routeBtn=mk(T(...(labels[item.route]||labels.practice))+' →','hci-option',()=>route(item.route));
   openArea.append(routeBtn,mk(T('Make a sound mix','ஒலிக்கலவை உருவாக்கு')+' →','hci-option',()=>route('sounds')));
   stage.append(openArea);
   const related=document.createElement('div');related.className='hci-exit';
   const title=document.createElement('p');title.className='hci-kicker';title.textContent=T('The next connection','அடுத்த தொடர்பு');related.append(title);
   const buttons=document.createElement('div');buttons.className='hci-actions';
   item.related.slice(0,2).forEach(other=>{const x=get(other);if(x)buttons.append(mk(L([x.en,x.ta])+' →','hci-option',()=>choose(x.id)))});
   related.append(buttons);stage.append(related);
  }
  const bar=document.createElement('div');bar.className='hci-subactions';
  bar.append(mk(T('Back','பின்னால்'),'hci-option',back),mk(T(saved.favourites.includes(id)?'Saved ★':'Save topic ☆',saved.favourites.includes(id)?'சேமிக்கப்பட்டது ★':'தலைப்பைச் சேமி ☆'),'hci-option',()=>{
   if(saved.favourites.includes(id))saved.favourites=saved.favourites.filter(x=>x!==id);else saved.favourites=[id,...saved.favourites].slice(0,25);
   persist();render();focusReading()
  }));
  stage.append(bar);
  const swipe=document.createElement('p');swipe.className='hci-swipehint';swipe.textContent=T('Swipe left for Next, right for Back · Scroll vertically to read','இடப்பக்கம் அடுத்து, வலப்பக்கம் பின்னால் · வாசிக்க மேல்கீழ் நகர்த்தவும்');stage.append(swipe);
 }
}
let touch=null;
reader.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.target.closest('button,a,input,textarea,select')){touch=null;return}touch={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
reader.addEventListener('touchend',e=>{
 if(!touch||!id||!e.changedTouches.length)return;
 const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;
 if(Math.abs(dx)<85||Math.abs(dx)<Math.abs(dy)*1.55)return;
 if(dx<0)next();else back();
},{passive:true});
reader.querySelector('#hciBack').addEventListener('click',back);
reader.querySelector('#hciHome').addEventListener('click',goHome);
exploreBtn.addEventListener('click',()=>open());
window.HCInfinityJourney={open,choose,back,home:goHome,topics:()=>data.map(x=>({id:x.id,en:x.en,ta:x.ta})),getState:()=>({id,step,history:saved.history.length,favourites:saved.favourites.length})};
})();