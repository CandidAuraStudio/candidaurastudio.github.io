/* HeartClear v163 · compact universal kitchen helper and accessible minimize.
  No remote AI call. No speculative meal price or automatic push reminder. */
(function(){
'use strict';
const home=document.getElementById('home'),kitchen=document.getElementById('hcHomeKitchenQuickV155');
if(!home||!kitchen||document.getElementById('hcKitchenAskV163'))return;
const savedKey='hcKitchenNextPlanV163';
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n}
function save(key,object){try{localStorage.setItem(key,JSON.stringify(object))}catch(_){}}
function load(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(_){return null}}
const localDay=(date)=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
function tomorrow(){const d=new Date();d.setDate(d.getDate()+1);return localDay(d)}
const dishes=[
 {name:"Burger",ta:"பர்கர்",aliases:"burgers hamburger hamburgers cheeseburger beef burger healthy burger",ingredients:"For two: 2 whole-grain buns, 2 palm-sized lean minced beef patties, 1 handful lettuce, 1 tomato, half an onion, 2 spoons plain yoghurt or mustard, a little oil; cheese optional.",ingredientsTa:"இருவருக்கு: 2 முழுத் தானிய பன்கள், உள்ளங்கை அளவுள்ள 2 குறைந்த கொழுப்புள்ள அரைத்த மாட்டிறைச்சி துண்டுகள், ஒரு கைப்பிடி லெட்டூஸ் கீரை, 1 தக்காளி, அரை வெங்காயம், 2 கரண்டி தயிர் அல்லது கடுகுச் சாஸ், சிறிது எண்ணெய்; சீஸ் விருப்பம்.",ahead:"Refrigerate minced meat and keep it separate from salad vegetables.",aheadTa:"அரைத்த இறைச்சியை குளிராக வைத்து சாலட் காய்கறிகளிலிருந்து தனியாக வைக்கவும்.",method:"1. Wash lettuce; slice tomato and onion. 2. Season lean minced beef with pepper and a pinch of salt; form two even patties. 3. Cook in a lightly oiled pan until the centre reaches 71°C. 4. Toast buns and layer lettuce, patty, vegetables and yoghurt-mustard sauce. Serve with more vegetables if you like.",methodTa:"1. கீரையைக் கழுவி தக்காளி, வெங்காயத்தை நறுக்கவும். 2. அரைத்த மாட்டிறைச்சியில் மிளகு, சிட்டிகை உப்பு சேர்த்து இரு துண்டுகளாகத் தட்டவும். 3. சிறிது எண்ணெயில் நடுப்பகுதி 71°C அடையும் வரை சமைக்கவும். 4. பன்களைச் சூடாக்கிக் கீரை, இறைச்சி, காய்கறிகள், தயிர்-கடுகுச் சாஸ் அடுக்கவும். விருப்பப்படி கூடுதல் காய்கறியுடன் பரிமாறவும்.",match:/burgers?|hamburgers?|cheeseburgers?/i},
 {name:"Chicken burger",ta:"கோழி பர்கர்",aliases:"healthy chicken burger grilled chicken burger",ingredients:"For two: 2 buns, 2 palm-sized minced chicken patties, 1 handful lettuce, 1 tomato, garlic, pepper, 1 spoon yoghurt and a little oil.",ingredientsTa:"இருவருக்கு: 2 பன்கள், உள்ளங்கை அளவுள்ள 2 அரைத்த கோழி இறைச்சித் துண்டுகள், ஒரு கைப்பிடி கீரை, ஒரு தக்காளி, பூண்டு, மிளகு, ஒரு கரண்டி தயிர், சிறிது எண்ணெய்.",ahead:"Keep chicken refrigerated and separate from ready-to-eat toppings.",aheadTa:"கோழி இறைச்சியைக் குளிராக வைத்து உடனே சாப்பிடும் காய்கறிகளிலிருந்து தனியாக வைக்கவும்.",method:"1. Mix minced chicken with crushed garlic and pepper, then shape into two patties. 2. Pan-cook with a little oil until the centre reaches 74°C. 3. Wash and cut the vegetables. 4. Toast buns; add lettuce, cooked chicken, tomato and yoghurt sauce.",methodTa:"1. அரைத்த கோழியுடன் நசுக்கிய பூண்டு, மிளகு கலந்து இரு துண்டுகளாகத் தட்டவும். 2. சிறிது எண்ணெயில் நடுப்பகுதி 74°C அடையும் வரை சமைக்கவும். 3. காய்கறிகளைக் கழுவி நறுக்கவும். 4. பன்களைச் சூடாக்கி கீரை, வெந்த கோழி, தக்காளி, தயிர் சாஸ் சேர்க்கவும்.",match:/chicken\s*burgers?/i},
 {name:"Veggie burger",ta:"காய்கறி பயறு பர்கர்",aliases:"bean burger chickpea burger vegetarian burger vegan burger healthy veggie burger",ingredients:"For two: 2 buns, 1 cup fully cooked and drained chickpeas or beans, 2 spoons oats, 1 small onion, pepper or cumin, 1 handful lettuce, 1 tomato and a little oil.",ingredientsTa:"இருவருக்கு: 2 பன்கள், 1 கோப்பை முழுவதும் வெந்த வடிகட்டிய கொண்டைக்கடலை அல்லது பயறு, 2 கரண்டி ஓட்ஸ், ஒரு சிறு வெங்காயம், மிளகு அல்லது சீரகம், ஒரு கைப்பிடி கீரை, ஒரு தக்காளி, சிறிது எண்ணெய்.",ahead:"Cook dried beans fully ahead of time, or use prepared canned beans.",aheadTa:"உலர் பயறை முன்பே முழுமையாக வேகவைக்கவும்; அல்லது தயாரிக்கப்பட்ட டின் பயறு பயன்படுத்தவும்.",method:"1. Mash the cooked drained beans with oats, chopped onion and spices. 2. Press firmly into two patties; add a teaspoon of water if too crumbly. 3. Pan-cook in a little oil until browned and hot throughout. 4. Put into buns with washed lettuce and tomato.",methodTa:"1. வெந்த வடிகட்டிய பயறுடன் ஓட்ஸ், நறுக்கிய வெங்காயம், மசாலா சேர்த்து மசிக்கவும். 2. இரு பர்கர் துண்டுகளாக அழுத்திப் பிடிக்கவும்; அதிகம் உதிர்ந்தால் ஒரு தேக்கரண்டி நீர் சேர்க்கவும். 3. சிறிது எண்ணெயில் இருபுறமும் பொன்னிறமாகி உள்ளே சூடாகும் வரை சமைக்கவும். 4. பன்களில் கழுவிய கீரை, தக்காளியுடன் வைக்கவும்.",match:/veggie\s*burgers?|vegetarian\s*burgers?|bean\s*burgers?/i},
 {name:"Vegetable pizza",ta:"காய்கறி பீட்சா",aliases:"pizza pizzas healthy pizza homemade pizza",ingredients:"One whole-grain pizza base or flatbread, 2 spoons tomato sauce, 1 handful sliced vegetables, 1 small handful mozzarella and oregano.",ingredientsTa:"ஒரு முழுத் தானிய பீட்சா பேஸ் அல்லது தட்டையான ரொட்டி, 2 கரண்டி தக்காளி சாஸ், ஒரு கைப்பிடி நறுக்கிய காய்கறிகள், ஒரு சிறு கைப்பிடி மொசரெல்லா சீஸ், ஓரிகானோ.",ahead:"Wash and slice toppings; preheat the oven according to the base package.",aheadTa:"காய்கறிகளைக் கழுவி நறுக்கி பேஸ் பொதியின் வழிமுறைக்கு ஏற்ப ஓவனைச் சூடாக்கவும்.",method:"1. Spread tomato sauce on the base. 2. Top with vegetables, mozzarella and oregano. 3. Bake according to the base package until the crust is cooked and cheese is melted. 4. Slice and serve.",methodTa:"1. பீட்சா பேஸில் தக்காளி சாஸ் தடவவும். 2. காய்கறிகள், மொசரெல்லா சீஸ், ஓரிகானோ சேர்க்கவும். 3. பொதியின் வழிமுறைக்கு ஏற்ப அடிப்பகுதி வெந்து சீஸ் உருகும் வரை சுடவும். 4. துண்டுகளாக வெட்டிப் பரிமாறவும்.",match:/pizzas?/i},
 {name:"Vegetable pasta",ta:"காய்கறி பாஸ்தா",aliases:"pasta spaghetti tomato pasta healthy pasta",ingredients:"For two: 1 cup dry pasta, 2 tomatoes, garlic, 1 handful spinach or vegetables, 1 spoon olive oil and optional cooked beans.",ingredientsTa:"இருவருக்கு: 1 கோப்பை உலர் பாஸ்தா, 2 தக்காளி, பூண்டு, ஒரு கைப்பிடி கீரை அல்லது காய்கறிகள், ஒரு கரண்டி ஆலிவ் எண்ணெய், விருப்பப்படி வெந்த பயறு.",ahead:"Wash and chop vegetables; keep cooked beans chilled until needed.",aheadTa:"காய்கறிகளைக் கழுவி நறுக்கி, வெந்த பயறைத் தேவைப்படும் வரை குளிராக வைக்கவும்.",method:"1. Boil pasta according to its packet; save a splash of cooking water. 2. Soften garlic and chopped tomato in a little oil. 3. Add vegetables and cooked beans, heating until cooked. 4. Toss with pasta, adding reserved water as needed.",methodTa:"1. பொதியின் வழிமுறைக்கு ஏற்ப பாஸ்தாவை வேகவைத்து சிறிது நீர் வைத்துக்கொள்ளவும். 2. சிறிது எண்ணெயில் பூண்டு, நறுக்கிய தக்காளியை வதக்கவும். 3. காய்கறிகள், வெந்த பயறு சேர்த்து சமைக்கவும். 4. பாஸ்தாவுடன் கலந்து, தேவையெனில் வைத்த நீர் சேர்க்கவும்.",match:/pastas?|spaghetti/i},
 // Specific dish names are ranked ahead of generic ingredients.
 {name:"Butter chicken",ta:"பட்டர் சிக்கன்",ingredients:"For two: 2 handfuls boneless chicken, 1 onion, 2 tomatoes, 2 spoons yoghurt, 1 spoon butter, ginger-garlic, chilli and garam masala; a little cream if available.",ingredientsTa:"இருவருக்கு: 2 கைப்பிடி கோழி, 1 வெங்காயம், 2 தக்காளி, 2 கரண்டி தயிர், 1 கரண்டி வெண்ணெய், இஞ்சி-பூண்டு, மிளகாய், கரம் மசாலா; விருப்பப்படி சிறிது கிரீம்.",ahead:"Keep the chicken chilled. Mix it with yoghurt and spices before cooking.",aheadTa:"கோழியை குளிராக வைத்து, சமைக்கும் முன் தயிர், மசாலாவுடன் கலக்கவும்.",method:"1. Soften onion and ginger-garlic in butter. 2. Cook tomatoes and spices until saucy. 3. Add chicken and a splash of water; cook completely (74°C inside). 4. Finish with a little cream and butter.",methodTa:"1. வெங்காயம், இஞ்சி-பூண்டை வெண்ணெயில் வதக்கவும். 2. தக்காளி, மசாலாவைச் சாஸ் போலச் சமைக்கவும். 3. கோழி, சிறிது நீர் சேர்த்து முற்றிலும் வேகவைக்கவும் (74°C). 4. கிரீம், வெண்ணெய் சேர்த்துப் பரிமாறவும்.",alt:"Chicken curry",match:new RegExp("butter[\\s-]*chicken|murgh\\s*makhani|பட்டர்\\s*சிக்கன்|வெண்ணெய்\\s*கோழி",'i')},
 {name:"Pepper chicken curry",ta:"மிளகு கோழிக் கறி",ingredients:"Chicken, onion, tomato, ginger, garlic, curry leaves, 1–2 spoons crushed black pepper, curry powder, turmeric and a little water. No coconut milk.",ingredientsTa:"கோழி, வெங்காயம், தக்காளி, இஞ்சி, பூண்டு, கறிவேப்பிலை, 1–2 கரண்டி நசுக்கிய மிளகு, கறித்தூள், மஞ்சள், சிறிது நீர். தேங்காய்ப்பால் வேண்டாம்.",ahead:"Keep the chicken chilled and crush black pepper freshly.",aheadTa:"கோழியை குளிராக வைத்து மிளகை புதிதாக நசுக்கவும்.",method:"1. Fry onion, garlic, ginger and curry leaves. 2. Add tomato, spices and chicken. 3. Add a little water and cover until chicken is cooked (74°C inside). 4. Reduce uncovered to a thick dark gravy; finish with pepper.",methodTa:"1. வெங்காயம், பூண்டு, இஞ்சி, கறிவேப்பிலை வதக்கவும். 2. தக்காளி, மசாலா, கோழி சேர்க்கவும். 3. சிறிது நீர் சேர்த்து மூடி முழுவதும் வேகவைக்கவும் (74°C). 4. கெட்டியான கருமை கறியாகச் சுண்டவிட்டு மிளகு சேர்க்கவும்.",alt:"Chicken curry",match:new RegExp("pepper[\\s-]*chicken|chicken[\\s-]*pepper|மிளகு\\s*கோழி|கோழி\\s*மிளகு",'i')},
 {name:"Chicken curry",ta:"கோழிக் கறி",ingredients:"Chicken pieces, 1 onion, 2 tomatoes, ginger, garlic, curry powder, chilli, turmeric, salt and a little water; coconut milk optional.",ingredientsTa:"கோழித்துண்டுகள், 1 வெங்காயம், 2 தக்காளி, இஞ்சி, பூண்டு, கறித்தூள், மிளகாய், மஞ்சள், உப்பு, சிறிது நீர்; தேங்காய்ப்பால் விருப்பம்.",ahead:"Keep raw chicken away from ready-to-eat food and refrigerate until cooking.",aheadTa:"பச்சைக் கோழியைச் சாப்பிடத் தயாரான உணவிலிருந்து தனியே குளிராக வைக்கவும்.",method:"1. Fry onion, ginger and garlic. 2. Add tomato, spices and chicken. 3. Add a little water and simmer covered until fully cooked (74°C inside). 4. Reduce to the gravy thickness you like; add lemon if preferred.",methodTa:"1. வெங்காயம், இஞ்சி, பூண்டு வதக்கவும். 2. தக்காளி, மசாலா, கோழி சேர்க்கவும். 3. சிறிது நீர் சேர்த்து மூடி முழுவதும் வேகவைக்கவும் (74°C). 4. விருப்பமான பதத்திற்கு சுண்டவிட்டு எலுமிச்சை சேர்க்கலாம்.",alt:"Pepper chicken curry",match:new RegExp("\\bchicken\\b|கோழி|kozhi",'i')},
 {name:"Appam",ta:"ஆப்பம்",ingredients:"Ready fermented appam batter, a little oil, and an appam pan.",ingredientsTa:"தயார் புளித்த ஆப்ப மாவு, சிறிது எண்ணெய், அப்பச்சட்டி.",ahead:"Use ready fermented batter; a fresh batch takes advance preparation.",aheadTa:"முன்பே புளித்த மாவைப் பயன்படுத்தவும்; புதிதாகச் செய்ய முன் தயாரிப்பு தேவை.",method:"Lightly oil a warm pan. Pour one ladle of batter, swirl to thin the edges, cover and cook until the centre sets.",methodTa:"சூடான அப்பச்சட்டியில் எண்ணெய் தடவி மாவை ஊற்றிச் சுழற்றி, மூடி வைத்து நடுப்பகுதி வேகும் வரை சுடவும்.",alt:"Dosa",match:new RegExp("\\bappam\\b|ஆப்பம்|aappam",'i')},
 {name:"Naan",ta:"நான் ரொட்டி",ingredients:"1 cup wheat flour, 2 spoons plain yoghurt, a pinch of salt and baking powder, water as needed and a little oil or butter.",ingredientsTa:"1 கோப்பை கோதுமை மாவு, 2 கரண்டி தயிர், சிட்டிகை உப்பு, சிறிது பேக்கிங் பவுடர், தேவையான நீர், வெண்ணெய்.",ahead:"Mix a soft dough and rest it covered.",aheadTa:"மென்மையான மாவைப் பிசைந்து மூடி ஓய்வெடுக்க விடவும்.",method:"Knead flour, yoghurt and water into a soft dough. Rest, flatten portions and cook on a hot pan until both sides are done. Brush with butter.",methodTa:"மாவு, தயிர், நீர் பிசைந்து ஓய்வெடுக்க விடவும். தட்டையாகத் தட்டி சூடான தவாவில் இருபுறமும் சுட்டு வெண்ணெய் தடவவும்.",alt:"Roti",match:new RegExp("\\bnaan\\b|நான்\\s*ரொட்டி",'i')},
 {name:"Sambal kangkong",ta:"சம்பல் கங்கோங் கீரை",ingredients:"A handful of edible water spinach, 1 small onion, garlic, a spoon of sambal or chilli paste, a little oil.",ingredientsTa:"ஒரு கைப்பிடி உணவுக்கேற்ற கங்கோங் கீரை, சிறு வெங்காயம், பூண்டு, ஒரு கரண்டி சம்பல் அல்லது மிளகாய் விழுது, சிறிது எண்ணெய்.",ahead:"Use only correctly identified edible greens and wash well.",aheadTa:"உணவுக்கேற்ற கீரை என்று உறுதிப்படுத்தி நன்றாகக் கழுவவும்.",method:"Fry onion and garlic. Stir in sambal, add washed greens and cook until wilted and tender. Serve fresh.",methodTa:"வெங்காயம், பூண்டு வதக்கிச் சம்பல் சேர்க்கவும். கழுவிய கீரையைச் சேர்த்து மென்மையாகும் வரை வதக்கவும்.",alt:"Greens poriyal",match:new RegExp("sambal\\s*kangkong|sambal\\s*kangkung|கங்கோங்|kangkung|kangkong",'i')},
 {name:'Dosa',ta:'தோசை',match:/dosa|தோசை|dosai/i,ingredients:'Rice, urad dal, clean water; fermented batter, chutney or sambar',ingredientsTa:'அரிசி, உளுந்து, சுத்தமான நீர்; புளித்த மாவு, சட்னி அல்லது சாம்பார்',
 ahead:'Check for ready fermented batter and keep it chilled. Starting from dry grains requires soaking, grinding and controlled fermentation; it may not be ready by morning.',aheadTa:'தயார் புளித்த மாவு உள்ளதா இன்று பார்க்கவும்; குளிர்சாதனத்தில் வைக்கவும். புதிய மாவுக்கு ஊறவைத்தல், அரைத்தல், பாதுகாப்பாகப் புளிக்கவைத்தல் ஆகியவற்றுக்கு நேரம் தேவை.',
 method:'Spread on a warm pan and cook fully. Serve with vegetables, dhal or sambar.',methodTa:'சூடான கல்லில் மாவைப் பரப்பி முழுவதும் சுடவும். காய்கறி, பருப்பு அல்லது சாம்பாருடன் வழங்கவும்.',alt:'Idli or freshly made vegetable upma'},
 {name:'Idli',ta:'இட்லி',match:/idli|இட்லி/i,ingredients:'Fermented rice and urad batter; idli steamer; sambar or chutney',ingredientsTa:'புளித்த அரிசி-உளுந்து மாவு; இட்லித் தட்டு; சாம்பார் அல்லது சட்னி',
 ahead:'Check ready batter, chill it and wash the steamer. Without fermented batter, choose a different breakfast.',aheadTa:'தயார் மாவைக் குளிராக வைத்து, இட்லித் தட்டைச் சுத்தம் செய்யவும். புளித்த மாவு இல்லையெனில் வேறு காலை உணவைத் தேர்வு செய்யவும்.',
 method:'Steam until cooked through; serve with sambar or chutney.',methodTa:'முழுவதும் வேகும் வரை ஆவியில் வேகவைத்து சாம்பார் அல்லது சட்னியுடன் வழங்கவும்.',alt:'Dosa or vegetable upma'},
 {name:'Rice and vegetables',ta:'சோறும் காய்கறியும்',generic:true,match:/rice|arisi|saadam|sadham|சோறு|சாதம்|அரிசி/i,ingredients:'Rice, a seasonal vegetable, dhal or another protein-rich side',ingredientsTa:'அரிசி, பருவகாலக் காய்கறி, பருப்பு அல்லது புரதத் துணை உணவு',
 ahead:'Check rice, vegetables and dhal. Wash produce when preparing it and refrigerate perishable items. Prefer freshly cooked rice tomorrow.',aheadTa:'அரிசி, காய்கறி, பருப்பு உள்ளதா பார்க்கவும். கெடக்கூடிய பொருட்களைக் குளிராக வைக்கவும். முடிந்தால் நாளைச் சாதத்தைப் புதிதாகச் சமைக்கவும்.',
 method:'Cook rice appropriately; pair with vegetables and protein. White rice does not lower blood sugar. Less-polished red or brown varieties often provide more fibre, but no rice guarantees a lower glucose response.',methodTa:'அரிசியை வகைக்கேற்ப வேகவைத்து காய்கறி, பருப்புடன் சேர்க்கவும். வெள்ளை அரிசி தானாக இரத்தச் சர்க்கரையைக் குறைக்காது. குறைவாகத் தீட்டிய சிவப்பு அல்லது பழுப்பு அரிசியில் பொதுவாக நார் அதிகம் இருக்கும்; எந்த அரிசியும் சர்க்கரையைக் குறைக்கும் என உறுதியில்லை.',alt:'Brown/red rice, vegetables with dhal or millet'},
 {name:'Egg and vegetables',ta:'முட்டையும் காய்கறியும்',match:/eggs?|முட்டை|muttai/i,ingredients:'Eggs, tomato or greens; rice, bread or another staple',ingredientsTa:'முட்டை, தக்காளி அல்லது கீரை; சோறு, ரொட்டி அல்லது வேறு தானியம்',
 ahead:'Check eggs and vegetables; refrigerate as recommended on the package.',aheadTa:'முட்டை, காய்கறி உள்ளதா சரிபார்த்து, பொதியில் உள்ள அறிவுரைப்படி குளிராக வைக்கவும்.',
 method:'Cook eggs completely, add vegetables, and serve with a suitable staple.',methodTa:'முட்டையை முழுவதும் வேகவைத்து காய்கறி, ஏற்ற பிரதான உணவுடன் வழங்கவும்.',alt:'Dhal with vegetables if eggs are unavailable'},
 {name:'Pittu',ta:'பிட்டு',match:/pittu|பிட்டு/i,ingredients:'Rice flour, coconut, clean water; a pittu steamer',ingredientsTa:'அரிசி மாவு, தேங்காய், சுத்தமான நீர்; பிட்டுக் குழல்',
 ahead:'Check flour and steamer; refrigerate freshly grated coconut.',aheadTa:'மாவு, பிட்டுக் குழல் இருக்கிறதா பார்க்கவும்; துருவிய தேங்காயைக் குளிராக வைக்கவும்.',
 method:'Moisten flour into loose crumbs, layer with coconut and steam fully.',methodTa:'மாவை உதிரியாக ஈரமாக்கித் தேங்காயுடன் அடுக்கி முழுவதும் ஆவியில் வேகவைக்கவும்.',alt:'String hoppers or vegetable upma'},
 {name:'String hoppers',ta:'இடியாப்பம்',match:/string hopper|இடியாப்பம்|idiyappam/i,ingredients:'String-hopper rice flour, clean water, press and steamer',ingredientsTa:'இடியாப்ப அரிசி மாவு, சுத்தமான நீர், அச்சு, ஆவிப்பாத்திரம்',
 ahead:'Check flour and equipment; plan sothi or vegetable curry.',aheadTa:'மாவும் உபகரணங்களும் உள்ளனவா பார்க்கவும்; சொதி அல்லது காய்கறிக் கறிக்கு முன்திட்டமிடவும்.',
 method:'Make dough carefully with hot water, press strands and steam until fully cooked.',methodTa:'வெந்நீருடன் கவனமாக மாவைப் பிசைந்து நூல்களாகப் பிழிந்து முழுவதும் ஆவியில் வேகவைக்கவும்.',alt:'Pittu or a grain porridge'},
 {name:'Vegetable upma',ta:'காய்கறி உப்புமா',match:/upma|உப்புமா|rava/i,ingredients:'Semolina or flattened rice, seasonal vegetables, water',ingredientsTa:'ரவை அல்லது அவல், பருவகாலக் காய்கறி, நீர்',
 ahead:'Check grain and vegetables; this is often a practical breakfast when fermented batter is not ready.',aheadTa:'ரவை/அவல், காய்கறி உள்ளதா பார்க்கவும்; புளித்த மாவு தயாராக இல்லாதபோது இது ஒரு மாற்று.',
 method:'Cook vegetables, add grain with appropriate liquid and stir until fully cooked.',methodTa:'காய்கறியை வேகவைத்து தானியம், ஏற்ற நீர் சேர்த்துக் கிளறியபடி முழுவதும் வேகவைக்கவும்.',alt:'Idli, roti or porridge'},
 {name:'Dhal',ta:'பருப்பு',match:/dhal|dal|lentil|பருப்பு/i,ingredients:'Lentils, water, turmeric or spices; vegetables',ingredientsTa:'பருப்பு, நீர், மஞ்சள் அல்லது மசாலா; காய்கறிகள்',
 ahead:'Check lentils and vegetables. Whole dried beans may need advance soaking in the fridge; split dhal often only needs rinsing.',aheadTa:'பருப்பும் காய்கறிகளும் உள்ளனவா பார்க்கவும். முழு உலர் பயறை குளிர்சாதனத்தில் ஊறவைக்க வேண்டியிருக்கலாம்; உடைத்த பருப்பை அலசினாலே போதும்.',
 method:'Cook until fully soft according to the legume. Pair with rice, vegetables or roti.',methodTa:'பருப்பை அதன் வகைக்கேற்ப நன்றாக மென்மையாக வேகவைத்து சோறு, காய்கறி அல்லது ரொட்டியுடன் வழங்கவும்.',alt:'Beans, chickpeas or egg'},
 {name:'Fish curry',ta:'மீன் குழம்பு',match:/fish|salaya|மீன்|சாளை/i,ingredients:'Fresh or safely thawed fish, tomato, spices, vegetables',ingredientsTa:'புதிய அல்லது குளிர்சாதனத்தில் உருகிய மீன், தக்காளி, மசாலா, காய்கறி',
 ahead:'Keep fish refrigerated; thaw frozen fish in the fridge, not on the counter. Keep away from ready-to-eat ingredients.',aheadTa:'மீனைக் குளிராக வைக்கவும்; உறைந்த மீனை குளிர்சாதனத்தில் உருகவைக்கவும், வெளியே அல்ல. சாப்பிடத் தயாரான பொருட்களிலிருந்து தனியாக வைக்கவும்.',
 method:'Cook curry until fish is completely cooked. Serve with vegetables.',methodTa:'மீன் முழுவதும் வேகும் வரை கறியைச் சமைத்துக் காய்கறியுடன் வழங்கவும்.',alt:'Egg, dhal or bean curry'},
 {name:'Roti',ta:'ரொட்டி',match:/roti|chapati|சப்பாத்தி|ரொட்டி/i,ingredients:'Suitable flour, water and a vegetable or dhal side',ingredientsTa:'ஏற்ற மாவு, நீர், காய்கறி அல்லது பருப்பு கறி',
 ahead:'Check flour and vegetables today. Make wet dough fresh when practical.',aheadTa:'மாவும் காய்கறிகளும் உள்ளனவா இன்று பார்க்கவும். ஈர மாவை முடிந்தவரை புதிதாகப் பிசையவும்.',
 method:'Mix dough, shape rounds, and cook both sides thoroughly.',methodTa:'மாவைப் பிசைந்து வட்டமாகத் தட்டி இருபுறமும் முழுவதும் வேகவைக்கவும்.',alt:'Rice, idli or pittu'}
];
const css=document.createElement('style');
css.textContent=[
':root{--gold:#c9d4da;--gold2:#a7b9c2}',
'body{background:linear-gradient(180deg,#08141d,#050a10)!important}',
'body:before,body:after{display:none!important}',
'.kicker,.eyebrow{color:#cedce2!important}',
'#home #hcHomeKitchenQuickV155{gap:5px!important;padding:10px 12px!important}',
'#home #hcHomeKitchenQuickV155 .hcr-small{color:#c8d9df!important}',
'#home #hcHomeKitchenQuickV155 #hcrMealName,#home #hcHomeKitchenQuickV155 #hcrDosa,#home #hcHomeKitchenQuickV155 #hcrDosaSteps{display:none!important}',
'#home #hcHomeKitchenQuickV155 .hcr-food-actions{gap:7px}',
'#home #hcHomeKitchenQuickV155 .hcr-food-actions button{flex:1}',
'#home #hcKitchenAskV163{margin:6px 0 0;border-top:1px solid #415764;padding-top:10px}',
'#home #hcKitchenAskV163[hidden]{display:none!important}',
'#home #hcKitchenAskV163 label{display:block;font-size:12px;color:#d2e1e7;margin-bottom:6px}',
'#home #hcKitchenAskV163 input[type=search]{box-sizing:border-box;flex:1;min-width:0;min-height:43px;border:1px solid #627783;border-radius:9px;padding:10px;background:#162e3b;color:#fff;font:inherit;font-size:13px;line-height:1.4}',
'#home #hcKitchenAskV163 .hc-ask-buttons{display:flex;gap:7px;margin:7px 0;flex-wrap:wrap}',
'#home #hcKitchenAskV163 button{background:#213a47;border:1px solid #71838b;color:#fff;border-radius:9px;padding:8px 10px;min-height:39px;font:inherit;font-size:12px}',
'#home #hcKitchenAskV163 .hc-ask-reply{font-size:12px;line-height:1.65;white-space:pre-line;color:#e2eef0;border:1px solid #435f69;border-radius:10px;padding:10px;background:#102733}',
'#home #hcKitchenAskV163 .hc-search-line{display:flex;gap:7px;align-items:stretch}',
'#home #hcKitchenAskV163 .hc-cuisine-line{display:flex;align-items:center;gap:8px;margin:7px 0 6px}',
'#home #hcKitchenAskV163 .hc-cuisine-line label{white-space:nowrap;flex-shrink:0;font-size:11px;margin:0}',
'#home #hcKitchenAskV163 .hc-cuisine-line select{min-width:0;flex:1;min-height:39px;font:inherit;font-size:12px;padding:6px 9px;color:#fff;background:#162e3b;border:1px solid #627783;border-radius:9px}',
'#home #hcKitchenBrowse{display:none!important}',
'#home #hcKitchenAskV163 .hc-kitchen-search-results{display:grid;gap:4px;margin:6px 0 4px;max-height:315px;overflow:auto}',
'#home #hcKitchenAskV163 .hc-kitchen-search-results[hidden]{display:none}',
'#home #hcKitchenAskV163 .hc-kitchen-search-results button{width:100%;text-align:left;font-size:12px;min-height:37px;background:#142a35}',
'#home #hcKitchenAskV163 .hc-kitchen-search-results button[aria-pressed=true]{border-color:#e1edf2;background:#294552}',
'#home #hcKitchenAskV163 .hc-kitchen-search-results p{font-size:12px;margin:6px 0}',
'#home #hcKitchenAskV163 .hc-ask-caption{color:#adbec5;font-size:10px;line-height:1.6}',
'#home #hcKitchenAskV163 .hc-kitchen-science{margin-top:10px;border-top:1px solid #4d6570;padding-top:9px;white-space:normal}',
'#home #hcKitchenAskV163 .hc-kitchen-science summary{cursor:pointer;font-weight:650}',
'#home #hcKitchenAskV163 .hc-kitchen-science a{display:inline-block;font-size:12px;color:#d7efff;text-decoration:underline;margin:4px 8px 0 0}',
'#home #hcKitchenAskV163 .hc-ask-reply[hidden]{display:none}',
'.bottom-nav .nav-item.active{color:#edf4f6!important}',
'.bottom-nav .nav-item.active span{color:#edf4f6!important}',
'.bottom-nav .nav-item.active:after{background:#d4e0e5!important}',
'.bottom-nav .nav-item.active svg{stroke:#ecf3f6!important}',
'.global-mini .hc-global-mini-progress span{background:#d1dfe5!important}',
'#home .hc-simple-start .kicker,#home .hc-simple-paths button span{color:#d3dfe3!important}',
'#home .hc-home-greeting-row .kicker{color:#d2dfe5!important}',
'#home .hc-simple-paths button span{color:#cdd9de!important}',
'#home .hcr-small,#home .hcq-kicker,#home .eyebrow{color:#c4d5dc!important}',
'.global-mini-btn.primary{background:#f3f4f0!important;color:#0c2633!important}',
'#player.active .hc-minimize-audio,#sacredSession.active .hc-minimize-audio,#fearPlayer.active .hc-minimize-audio,#bookAudio.active .hc-minimize-audio,#soundLabPlayer.active .hc-minimize-audio{position:fixed!important;right:13px!important;bottom:calc(20px + env(safe-area-inset-bottom,0px))!important;top:auto!important;z-index:105!important;box-shadow:0 4px 20px #000a!important;background:#f3f5f4!important;color:#09202a!important;border:1px solid #9baab2!important;border-radius:25px!important;min-height:45px!important;padding:8px 15px!important}',
'#player.active{padding-bottom:65px}'
].join('\n');document.head.append(css);
kitchen.querySelector('.hcr-small')?.replaceChildren('FOOD · LEARN / உணவும் கற்றலும்');
const title=kitchen.querySelector('strong');if(title)title.textContent='What can we cook? / என்ன சமைக்கலாம்?';
const buttons=kitchen.querySelector('.hcr-food-actions'),mealButton=document.getElementById('hcrMeals');
if(mealButton)mealButton.textContent='Meal ideas · உணவுகள்';
// Search first; the optional tradition picker filters without changing any meal plan.
const traditions=[
 ['all','All traditions · அனைத்தும்'],
 ['tamil','Tamil · தமிழ்'],['srilankantamil','Sri Lankan Tamil · ஈழத் தமிழ்'],
 ['indian','Indian · இந்திய'],['chinese','Chinese · சீன'],
 ['indonesian','Indonesian · இந்தோனேசிய'],['malaysian','Malaysian · மலேசிய'],
 ['nepali','Nepali · நேபாள'],['bangladeshi','Bangladeshi · வங்கதேச'],
 ['middleeastern','Middle East / Arab · அரபு'],['mediterranean','Mediterranean'],
 ['italian','Italian · இத்தாலிய'],['scandinavian','Scandinavian · வட ஐரோப்பிய'],
 ['european','Other European · ஐரோப்பிய'],['fusion','Tamil + world fusion · கலவை']
];
const traditionWords={
 tamil:'tamil தமிழ் south indian',srilankantamil:'sri lanka sri lankan tamil eelam jaffna இலங்கை யாழ்ப்பாணம்',
 indian:'indian india இந்திய',chinese:'chinese china சீன',
 indonesian:'indonesian indonesia',malaysian:'malaysian malaysia',
 nepali:'nepali nepal',bangladeshi:'bangladeshi bangladesh',
 middleeastern:'arab arabic middle east middle eastern levant அரபு',
 mediterranean:'mediterranean greek',italian:'italian italy',
 scandinavian:'scandinavian nordic danish norwegian swedish',
 european:'europe european spanish french british',fusion:'fusion mixed கலவை'
};
function traditionTags(d){
 if(Array.isArray(d.cuisines))return d.cuisines;
 const n=String(d.en||'').toLowerCase();
 if(/burger/.test(n))return [];
 if(/pizza|pasta|spaghetti|risotto/.test(n))return ['italian'];
 if(/butter chicken|naan|chana masala|aloo gobi|biryani/.test(n))return ['indian'];
 if(/sambal kangkong|mee goreng|nasi lemak/.test(n))return ['indonesian','malaysian'];
 if(/pittu|puttu|appam|hopper|sothi|jaffna|dry fish/.test(n))return ['tamil','srilankantamil'];
 if(/dosa|idli|poriyal|sambar|rasam|upma|adai|pongal|kuzhambu|chutney|kootu|keerai|roti|curry|dhal/.test(n))return ['tamil'];
 if(d.source==='menu'||d.source==='side')return ['tamil'];
 return [];
}
// One visible search field: results are drawn from the meal index and cooking guides.
const section=el('div');section.id='hcKitchenAskV163';section.hidden=false;
section.innerHTML='<label for="hcKitchenAskInput">Search food, drinks or ingredients / உணவு, பானம், பொருட்கள் தேடல்</label>'+
 '<div class="hc-search-line"><input type="search" id="hcKitchenAskInput" maxlength="150" autocomplete="off" placeholder="Any food, drink or ingredient…">'+
 '<button type="button" id="hcKitchenAskSend">Search / தேடு</button></div>'+
 '<div class="hc-cuisine-line"><label for="hcKitchenTradition">Tradition / மரபு</label><select id="hcKitchenTradition" aria-label="Filter recipes by cuisine">'+traditions.map(([id,label])=>'<option value="'+id+'">'+label+'</option>').join('')+'</select></div>'+ 
 '<div id="hcKitchenSearchResults" class="hc-kitchen-search-results" hidden></div>'+
 '<div class="hc-ask-buttons"><button type="button" id="hcKitchenTomorrow">Tomorrow / நாளை</button><button type="button" id="hcKitchenSavePlan" hidden>Remember / நினைவில் வை</button></div>'+
 '<div id="hcKitchenAskReply" class="hc-ask-reply" role="status" aria-live="polite" hidden></div>';
kitchen.append(section);
const reply=section.querySelector('#hcKitchenAskReply'),input=section.querySelector('#hcKitchenAskInput'),
      traditionSelect=section.querySelector('#hcKitchenTradition'),searchResults=section.querySelector('#hcKitchenSearchResults'),saveBtn=section.querySelector('#hcKitchenSavePlan');
let lastPlan=null, currentSearch=[],visibleCount=10;
const output=(txt,plan=null)=>{reply.hidden=false;reply.textContent=txt;lastPlan=plan;saveBtn.hidden=!plan};
function foldText(v){return String(v||'').normalize('NFKC').toLocaleLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu,' ').trim()}
function words(s){return foldText(s).split(/\s+/).filter(x=>x&&!['and','with','the','for','a','my','own','recipe','recipes','please','how','make','cook','of','to','or','healthy','healthier','balanced','homemade','easy','simple','quick','என்','செய்முறை'].includes(x))}
function getCatalog(){
 const items=[],seen=new Set();
 const push=x=>{
  if(!x||!x.en)return;
  const key=foldText(x.en);
  if(seen.has(key))return;
  seen.add(key);items.push(x);
 };
 // Personal methods, general named guides and rotating family menu all appear.
 (window.HCKitchenSearchGuide?.personal||[]).forEach(push);
 dishes.forEach(d=>push({en:d.name,ta:d.ta,aliases:d.aliases||'',source:'quick'}));
 (window.HCKitchenWorldRecipes?.catalog?.()||[]).forEach(push);
 (window.HCKitchenUniversal?.catalog?.()||[]).forEach(push);
 (window.HCKitchenMenu?.catalog?.()||[]).forEach(push);
 return items;
}
function rank(d,q){
 const name=foldText(d.en+' '+d.ta),aliases=foldText(d.aliases),ingredients=foldText(d.ingredients),category=foldText(d.category),culture=foldText(traditionTags(d).map(id=>traditionWords[id]||'').join(' ')),en=foldText(d.en),query=foldText(q),t=words(q);
 if(!t.length)return 0;
 const found=t.filter(w=>name.includes(w)||aliases.includes(w)||ingredients.includes(w)||category.includes(w)||culture.includes(w)), coverage=found.length/t.length;
 const cultureTerms=t.filter(w=>['arab','tamil','chinese','indonesian','malaysian','nepali','bangladeshi','italian','mediterranean','scandinavian','indian'].includes(w));
 if(cultureTerms.length>1&&cultureTerms.some(w=>![name,aliases,culture].some(part=>part.includes(w))))return 0;
 const named=t.filter(w=>name.includes(w)).length,aliased=t.filter(w=>aliases.includes(w)).length;
 if(!found.length||coverage<Math.min(0.65,1/t.length))return 0;
 let score=coverage*35+named*85+aliased*47+(found.length-named)*8;
 if(en===query||foldText(d.ta)===query)score+=220;
 if(query.length>3&&en.includes(query))score+=65;
 if(en.length>3&&query.includes(en))score+=75;
 // Prefer a named dish over rice-only matches in "rice and butter chicken".
 if(t.length>1&&found.length===1&&t.length>2)score-=35;
 if(d.source==='personal')score+=8;
 // Tamil searches should rank traditional dishes above modern cross-cultural fusion.
 if(t.length===1&&t[0]==='tamil'&&traditionSelect.value!=='fusion'&&traditionTags(d).includes('fusion'))return 0;
 return score;
}
function getMatches(q){
 const chosen=traditionSelect.value;
 const catalog=getCatalog().filter(d=>chosen==='all'||traditionTags(d).includes(chosen));
 if(!q.trim())return chosen==='all'?[]:catalog.slice(0,120);
 return catalog.map((d,i)=>({...d,score:rank(d,q),order:i}))
  .filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.order-b.order).slice(0,120);
}
function showItem(item){
 if(item?.source==='universal'){
  const u=window.HCKitchenUniversal?.detail?.(item.en);
  if(u){output(u.text);return}
 }
 if(!item)return;
 searchResults.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.recipe===item.en)));
 if(item.source==='world'||(item.source==='personal'&&!window.HCKitchenSearchGuide?.detail?.(item.en,item.ta))){
  const guide=window.HCKitchenWorldRecipes?.detail?.(item.en);
  if(guide){
   output(guide.text);
   const box=document.createElement('details');box.className='hc-kitchen-science';
   const heading=document.createElement('summary');heading.textContent='Food science & sources / அறிவியல் · ஆதாரம்';box.append(heading);
   const fact=document.createElement('p');
   fact.textContent=/ginger tea|lemon ginger|ginger coriander/i.test(item.en)?'Ginger is a culinary ingredient; a cup of ginger tea does not replace medical care.':
   /turmeric milk/i.test(item.en)?'Culinary turmeric adds flavour. Concentrated turmeric supplements have different risks.':
   /idli|dosa|batter/i.test(item.en)?'Natural microorganisms ferment rice-and-urad batter. Use safe water and clean equipment. Chill ready batter.':
   /mutton|beef|chicken|egg|fish|prawn|burger|tuna|maasi|sprat|mayonnaise/i.test(item.en)?'Keep raw and ready-to-eat food separate, cook to safe temperatures, and refrigerate perishables.':
   'Fresh ingredients, clean utensils and safe storage matter more than unsupported health claims.';
   box.append(fact);
   (guide.references||[]).forEach(ref=>{
     const link=document.createElement('a');link.href=ref.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=ref.name+' ↗';box.append(link);
   });
   reply.append(box);return;
  }
 }
 const guide=window.HCKitchenSearchGuide?.detail?.(item.en,item.ta);
 // Original cooking notes override general methods if recorded.
 if(item.source==='personal'&&guide){output(guide.en+' / '+guide.ta+'\n\n'+guide.text);return}
 if(item.source!=='quick'&&guide){output(guide.text);return}
 const quick=dishes.find(d=>foldText(d.name)===foldText(item.en));
 if(quick){
  const riceSide=/rice|arisi|saadam|sadham|சோறு|சாதம்|அரிசி/i.test(input.value)&&!quick.generic?
   '\n\nRice / சாதம்: Rinse 1 cup rice. Use water suited to its variety; cook covered until tender.\nசாதம்: 1 கோப்பை அரிசியைக் கழுவி, அதன் வகைக்கு ஏற்ற நீரில் மூடி வேகவைக்கவும்.':'';
  const heading=quick.name+' / '+quick.ta;
  output(heading+'\n\nIngredients / தேவையானவை:\n'+quick.ingredients+'\n'+quick.ingredientsTa+
   '\n\nCooking / சமைப்பது:\n'+quick.method+'\n'+quick.methodTa+riceSide);
 }else if(item.source==='personal'){
  output(item.en+' / '+item.ta+'\n\nYour personal method is not recorded yet. / உங்கள் சொந்த செய்முறை இன்னும் பதிவு செய்யப்படவில்லை.');
 }else{
  output('The cooking guide is still loading. Try this recipe again shortly. / சமையல் வழிகாட்டி ஏற்றப்படுகிறது.');
 }
}
function searchRecipes(openFirst){
 const q=input.value.trim();
 if(!q&&traditionSelect.value==='all'){searchResults.hidden=true;reply.hidden=true;return}
 currentSearch=getMatches(q);
 searchResults.replaceChildren();
 searchResults.hidden=false;
 if(!currentSearch.length){
  const empty=el('p',null,'Not saved here yet. Checking worldwide recipes below… / இங்கு இல்லை; கீழே உலகச் செய்முறைகளைத் தேடுகிறோம்…');
  const more=el('button',null,'Search more recipes on the web ↗ / இணையத்தில் மேலும் தேடவும்');
   more.type='button';more.addEventListener('click',()=>window.open('https://www.google.com/search?q='+encodeURIComponent(q+' recipe ingredients cooking steps healthier option'),'_blank','noopener,noreferrer'));
   searchResults.append(empty,more);reply.hidden=true;return;
 }
 searchResults.append(el('p','hc-kitchen-count',currentSearch.length+' recipes / செய்முறைகள்'));
 currentSearch.slice(0,visibleCount).forEach((d,i)=>{
  const b=el('button','hc-recipe-match',d.en+' · '+d.ta);
  b.type='button';b.dataset.recipe=d.en;b.setAttribute('aria-pressed','false');
  b.addEventListener('click',()=>showItem(d));
  searchResults.append(b);
 });
 if(currentSearch.length>visibleCount){
  const more=el('button','hc-kitchen-more','Show more / மேலும் · '+(currentSearch.length-visibleCount));
  more.type='button';more.addEventListener('click',()=>{
   visibleCount=Math.min(currentSearch.length,visibleCount+12);
   searchRecipes(false);
  });searchResults.append(more);
 }
 if(openFirst)showItem(currentSearch[0]);
 else reply.hidden=true;
}
function tomorrowPlan(){
 const date=new Date();date.setDate(date.getDate()+1);
 const dateStr=localDay(date);
 const list=window.HCKitchenMenu?.preview?.(dateStr);
 const lines=['Tomorrow · '+dateStr+' / நாளை','These are menu ideas, not compulsory meals. / இவை விருப்பங்கள் மட்டுமே.'];
 if(Array.isArray(list)&&list.length){
  list.forEach((meal,i)=>{
   const name=meal.base[1]||'',ta=meal.base[0]||'';
   lines.push('\n'+['Breakfast','Lunch','Dinner'][i]+' / '+['காலை','மதியம்','இரவு'][i]+': '+name+' / '+ta);
   const known=dishes.find(d=>d.match.test(name+' '+ta));
   if(known)lines.push('Tonight / இன்று: '+known.ahead+'\n'+known.aheadTa);
   else lines.push('Tonight / இன்று: Check the staple and vegetables; refrigerate perishables. / தேவையான தானியம், காய்கறிகளைச் சரிபார்த்து கெடக்கூடியவற்றைக் குளிராக வைக்கவும்.');
  });
 }else lines.push('Open Meal ideas to choose tomorrow’s menu. / நாளைய உணவுக்கு Meal ideas திறக்கவும்.');
 lines.push('\nFood safety: Avoid leaving cooked rice, fish, meat or prepared batter unrefrigerated overnight.\nஉணவுப் பாதுகாப்பு: வேகவைத்த சோறு, மீன், இறைச்சி, தயார் மாவை இரவு முழுவதும் வெளியே வைக்க வேண்டாம்.');
 const plan={date:dateStr,text:lines.join('\n')};
 output(plan.text,plan);
}
traditionSelect.addEventListener('change',()=>{visibleCount=10;searchRecipes(false)});
section.querySelector('#hcKitchenAskSend').addEventListener('click',()=>searchRecipes(true));
input.addEventListener('input',()=>{visibleCount=10;searchRecipes(false)});
input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();searchRecipes(true)}});
section.querySelector('#hcKitchenTomorrow').addEventListener('click',tomorrowPlan);
saveBtn.addEventListener('click',()=>{if(!lastPlan)return;save(savedKey,lastPlan);output(lastPlan.text+'\n\nSaved on this device / இந்தச் சாதனத்தில் சேமிக்கப்பட்டது.',lastPlan)});
mealButton?.addEventListener('click',()=>{const drawer=document.getElementById('hcKitchenDrawer');if(drawer)drawer.open=true;const target=document.getElementById('hcMonthlyKitchen');if(target){target.hidden=false;requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'smooth'}));}},true);
})();

/* Household-measure, bilingual cooking guides — loaded after the existing Kitchen. */
(function(){
  if(document.getElementById('hcKitchenRecipesScriptV181'))return;
  const s=document.createElement('script');
  s.id='hcKitchenRecipesScriptV181';
  s.src='./hc-kitchen-recipes-v181.js?v=226';
  s.async=true;
  document.body.append(s);
})();
