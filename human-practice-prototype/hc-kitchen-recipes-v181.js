/* HeartClear Family Kitchen v182: household-measure, bilingual practical home guides.
   Cup, handful and spoon measures are approximate; NOT tested historical recipes.
   No simulated market prices or synthetic 'narrated' audio. */
(function(){
'use strict';
const root=document.getElementById('hcMonthlyKitchen');
if(!root||!window.HCKitchenMenu||window.HCKitchenRecipesV181)return;
window.HCKitchenRecipesV181=true;
const STORE='hcKitchenRecipeSettingsV181';
let settings={servings:2,language:'both'};
try{const x=JSON.parse(localStorage.getItem(STORE)||'null');if(x){settings.servings=Math.max(1,Math.min(5,Number(x.servings)||2));if(['both','ta','en'].includes(x.language))settings.language=x.language}}catch(_){}
const keep=()=>{try{localStorage.setItem(STORE,JSON.stringify(settings))}catch(_){}};
const e=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const I=(id,en,ta,n,unit='g')=>({id,en,ta,n,unit});
const M=(id,en,ta,time,prep,ings,steps)=>({id,en,ta,time,prep,ings,steps});
const P=(en,ta)=>[en,ta];
function rice(){
 return M('rice','Cooked rice','வேக வைத்த சோறு',25,
 P('Rinse the rice; follow the cooking-water directions for the variety you have.','அரிசியைக் கழுவி, அதன் வகைக்கேற்ற நீரளவைப் பயன்படுத்தவும்.'),
 [I('rice','Dry rice','உலர் அரிசி',75),I('ricewater','Cooking water (approx.)','சமைக்கும் நீர் (தோராயம்)',150,'ml')],
 [P('Rinse the rice. Add the suggested water, bring to a simmer, cover and cook until tender; check the package for your rice variety.','அரிசியைக் கழுவி நீர் சேர்த்துக் கொதிக்கவிட்டு மூடி மென்மையாகும் வரை வேகவைக்கவும்; அரிசி வகைக்கேற்ப நீரை மாற்றவும்.'),
 P('Turn off the heat, rest covered for 5 minutes, then fluff with a clean spoon.','அடுப்பை அணைத்து 5 நிமிடம் மூடி வைத்து, சுத்தமான கரண்டியால் கிளறவும்.')]);
}
function veg(name='Seasonal vegetable',ta='பருவக் காய்கறி'){
 const greens=/greens|leaves|keerai|முருங்கை/i.test(name);
 return M('vegetable',name+' poriyal',ta+' பொரியல்',greens?12:20,
 P('Choose a fresh, locally affordable edible vegetable; wash, peel or trim as needed.','கிடைக்கும் விலையில் புதிய, உணவுக்கேற்ற காய்கறியைத் தேர்வு செய்து கழுவி, தேவையானவற்றை நீக்கவும்.'),
 [I('veg:'+name,name,ta,110),I('veg-onion','Onion','வெங்காயம்',20),I('veg-oil','Cooking oil','சமையல் எண்ணெய்',5,'ml'),I('mustard','Mustard seeds (optional)','கடுகு (விருப்பம்)',0.5),I('veg-water','Water','தண்ணீர்',25,'ml')],
 [P('Cut the vegetable into even pieces. Heat oil; briefly sizzle mustard, then soften chopped onion.','காய்கறியை ஒரே அளவில் நறுக்கவும். எண்ணெயில் கடுகைத் தாளித்து நறுக்கிய வெங்காயத்தை வதக்கவும்.'),
 P('Add the vegetable and a little water. Cover and cook until fully tender, stirring and adding water only if needed.','காய்கறியையும் சிறிது நீரையும் சேர்த்து மூடி நன்றாக வேகும் வரை சமைக்கவும்; தேவைப்பட்டால் மட்டும் நீர் சேர்க்கவும்.')]);
}
function dhal(){
 return M('dhal','Simple lentil dhal','எளிய பருப்புக் கறி',25,
 P('Rinse the lentils and check for small stones.','பருப்பை அலசி சிறுகற்கள் உள்ளனவா பார்க்கவும்.'),
 [I('dal','Split red lentils','சிவப்பு மசூர் பருப்பு',65),I('dal-water','Water','நீர்',220,'ml'),I('dal-onion','Onion','வெங்காயம்',20),I('dal-tomato','Tomato','தக்காளி',40),I('dal-turmeric','Turmeric','மஞ்சள்',0.5),I('dal-oil','Oil','எண்ணெய்',4,'ml')],
 [P('Simmer lentils in water with turmeric for about 15–20 minutes until fully soft; top up water as needed.','பருப்பை நீர், மஞ்சளுடன் 15–20 நிமிடம் முற்றிலும் மென்மையாகும் வரை வேகவைக்கவும்.'),
 P('Soften finely chopped onion and tomato in a little oil. Stir into dhal and simmer 3 more minutes.','நறுக்கிய வெங்காயம், தக்காளியைச் சிறிது எண்ணெயில் வதக்கிப் பருப்பில் சேர்த்து மேலும் 3 நிமிடம் கொதிக்க விடவும்.')]);
}
function fish(n){
 const coconut=/coconut|sothi|milk/i.test(n),pepper=/pepper/i.test(n);
 return M('fish','Home-style fish '+(coconut?'sothi':pepper?'pepper curry':'curry'),'வீட்டுமுறை மீன் '+(coconut?'சொதி':'கறி'),25,
 P('Keep fish chilled until cooking. Remove bones carefully before serving children.','சமைக்கும் வரை மீனைக் குளிராக வைத்துக் கொள்ளவும்; குழந்தைகளுக்குப் பரிமாறும் முன் முட்களைச் சரிபார்க்கவும்.'),
 [I('fish','Cleaned fish','சுத்தம் செய்த மீன்',140),I('fish-onion','Onion','வெங்காயம்',35),I('fish-tomato','Tomato','தக்காளி',55),I('fish-oil','Oil','எண்ணெய்',6,'ml'),I('fish-spice',pepper?'Ground pepper':'Curry powder',pepper?'மிளகுத்தூள்':'கறித்தூள்',3),I('fish-turmeric','Turmeric','மஞ்சள்',0.5),I('fish-water','Water','நீர்',80,'ml'),...(coconut?[I('coconutmilk','Coconut milk','தேங்காய்ப்பால்',80,'ml')]:[I('tamarind','Tamarind pulp','புளி',5)])],
 [P('Soften chopped onion and tomato in oil with turmeric and spice.','எண்ணெயில் நறுக்கிய வெங்காயம், தக்காளி, மஞ்சள், மசாலாவை வதக்கவும்.'),
 P(coconut?'Pour in water and coconut milk and gently simmer for 4 minutes.':'Add water and tamarind; simmer 5 minutes and taste the gravy.','நீர் மற்றும் '+(coconut?'தேங்காய்ப்பால்':'புளி')+' சேர்த்து 4–5 நிமிடம் மெதுவாகக் கொதிக்க விடவும்.'),
 P('Add fish; simmer gently until completely cooked (about 8–12 minutes depending on thickness; 63°C if using a thermometer).','மீனைச் சேர்த்து அதன் தடிமனுக்கேற்ப 8–12 நிமிடம் முழுவதும் வேகவைக்கவும் (வெப்பமானி இருந்தால் 63°C).')]);
}
function chicken(n){
 const coconut=/coconut|sothi|milk/i.test(n);
 return M('chicken','Home-style chicken curry','வீட்டுமுறை கோழிக் கறி',40,
 P('Keep raw chicken separate from ready-to-eat food; wash hands, utensils and surfaces afterward.','பச்சைக் கோழியைச் சமைத்த உணவிலிருந்து தனியாகக் கையாளவும்; கைகளையும் பாத்திரங்களையும் சுத்தம் செய்யவும்.'),
 [I('chicken','Boneless chicken','எலும்பில்லா கோழி',150),I('ch-onion','Onion','வெங்காயம்',45),I('ch-tomato','Tomato','தக்காளி',60),I('ch-oil','Oil','எண்ணெய்',6,'ml'),I('ch-spice','Curry powder','கறித்தூள்',4),I('ch-water','Water','நீர்',110,'ml'),...(coconut?[I('ch-coco','Coconut milk','தேங்காய்ப்பால்',60,'ml')]:[])],
 [P('Soften sliced onion and tomato in oil, then add curry powder and chicken. Stir with a clean cooking spoon.','எண்ணெயில் வெங்காயம், தக்காளி வதக்கி, கறித்தூள், கோழியைச் சேர்த்துக் கிளறவும்.'),
 P('Add water, cover and simmer until chicken reaches 74°C in the thickest piece; often 20–30 minutes depending on cut.','நீர் சேர்த்து மூடி, தடிமனான கோழித் துண்டு 74°C அடையும் வரை வேகவைக்கவும்; துண்டின் அளவைப் பொறுத்து 20–30 நிமிடம் ஆகலாம்.'),
 ...(coconut?[P('Add coconut milk near the end and heat gently before serving.','இறுதியில் தேங்காய்ப்பால் சேர்த்து மெதுவாகச் சூடாக்கிப் பரிமாறவும்.')]:[])]);
}
function egg(n){
 return M('egg','Egg and tomato curry','முட்டைத் தக்காளிக் கறி',22,
 P('Use fresh eggs and clean utensils.','புதிய முட்டையையும் சுத்தமான பாத்திரங்களையும் பயன்படுத்தவும்.'),
 [I('egg','Egg','முட்டை',1,'pc'),I('egg-onion','Onion','வெங்காயம்',35),I('egg-tomato','Tomato','தக்காளி',70),I('egg-oil','Oil','எண்ணெய்',5,'ml'),I('egg-spice','Curry powder','கறித்தூள்',3),I('egg-water','Water','நீர்',60,'ml')],
 [P('Boil eggs until the whites and yolks are firm; cool enough to peel.','முட்டையின் வெள்ளையும் மஞ்சளும் முழுவதும் வேகும்வரை அவித்து, ஆறியதும் ஓடு நீக்கவும்.'),
 P('Cook onion and tomato in oil with spices. Add water and simmer 5–7 minutes.','எண்ணெயில் வெங்காயம், தக்காளி, மசாலாவை வதக்கி நீர் சேர்த்து 5–7 நிமிடம் கொதிக்கவிடவும்.'),
 P('Add the cooked eggs, warm through and serve with the chosen staple.','வேகவைத்த முட்டைகளைச் சேர்த்து சூடாக்கி, தேர்ந்தெடுத்த பிரதான உணவுடன் வழங்கவும்.')]);
}
function dosa(n){
 const withEgg=/egg/i.test(n),withGreens=/greens|moringa/i.test(n);
 return M('dosa','Dosa from prepared batter','தயார் மாவில் தோசை',12,
 P('Use ready fermented dosa batter, kept refrigerated. Making batter from dry grains needs earlier soaking and fermentation.','முன்பே புளிக்கவைத்து குளிராக வைத்த தோசை மாவைப் பயன்படுத்தவும்; புதிதாக அரைக்க பல மணி நேரம் தேவை.'),
 [I('batter','Ready dosa batter','தயார் தோசை மாவு',170),I('dosa-oil','Oil','எண்ணெய்',5,'ml'),...(withEgg?[I('dosa-egg','Egg','முட்டை',1,'pc')]:[]),...(withGreens?[I('dosa-greens','Chopped greens','நறுக்கிய கீரை',30)]:[])],
 [P('Heat a clean flat pan over medium heat. Stir the batter and add chopped greens if using.','சுத்தமான தோசைக்கல்லை மிதமான தீயில் சூடாக்கி மாவைக் கலக்கவும்; கீரை இருந்தால் சேர்க்கவும்.'),
 P('Spread one ladle thinly on the pan and drizzle a little oil.','ஒரு கரண்டி மாவை மெல்லியதாகப் பரப்பி சிறிது எண்ணெய் விடவும்.'),
 ...(withEgg?[P('Add the egg to the dosa surface and cook until the egg is fully set.','தோசையின் மேல் முட்டை சேர்த்து முழுவதும் வேகும் வரை சுடவும்.')]:[]),
 P('Cook until the centre is set and edges lift. Flip if necessary and serve immediately.','நடுப்பகுதி வெந்து ஓரம் பிரியும் வரை சுடவும்; தேவைப்பட்டால் திருப்பிப் போட்டு பரிமாறவும்.')]);
}
function idli(){return M('idli','Steamed idli','ஆவியில் வேக வைத்த இட்லி',20,
 P('Have properly fermented idli batter and a clean steamer ready.','புளித்த இட்லி மாவும் சுத்தமான ஆவிப்பாத்திரமும் தயார் செய்யவும்.'),
 [I('idl-bat','Prepared idli batter','தயார் இட்லி மாவு',190),I('idl-oil','Oil for moulds','தட்டில் தடவ எண்ணெய்',2,'ml'),I('idl-water','Steamer water','ஆவிப்பாத்திர நீர்',250,'ml')],
 [P('Bring water to a simmer in the steamer; grease the idli moulds lightly.','ஆவிப்பாத்திரத்தில் நீர் கொதிக்கவிட்டு இட்லித் தட்டில் எண்ணெய் தடவவும்.'),
 P('Pour batter into moulds and steam about 10–15 minutes until set and cooked through.','மாவை ஊற்றி 10–15 நிமிடம் முழுவதும் வேகும் வரை ஆவியில் வேகவைக்கவும்.'),
 P('Rest a minute, remove gently and serve hot.','ஒரு நிமிடம் ஆறவிட்டு இட்லியை எடுத்துப் பரிமாறவும்.')]);}
function pittu(){return M('pittu','Rice flour pittu','அரிசி மாவுப் பிட்டு',25,
 P('Use pittu flour or appropriately roasted rice flour and a safe steamer.','பிட்டு மாவு அல்லது ஏற்ற வறுத்த அரிசி மாவும் பாதுகாப்பான ஆவிப்பாத்திரமும் தேவை.'),
 [I('pittu-flour','Pittu rice flour','பிட்டு அரிசி மாவு',90),I('pittu-coco','Grated coconut','துருவிய தேங்காய்',35),I('pittu-water','Water (add gradually)','நீர் (சிறிது சிறிதாக)',65,'ml')],
 [P('Sprinkle water gradually into flour and rub until you have loose damp crumbs, not a kneaded dough.','மாவில் சிறிது சிறிதாக நீர் தெளித்து உதிரியான ஈரப் பொடியாக்கவும்; பிசைந்த மாவாக்க வேண்டாம்.'),
 P('Layer damp crumbs with coconut in the pittu mould; steam until fully cooked, about 10–15 minutes.','பிட்டுக் குழலில் உதிரி மாவையும் தேங்காயையும் அடுக்கி 10–15 நிமிடம் நன்றாக ஆவியில் வேகவைக்கவும்.'),
 P('Release carefully, away from steam, and serve with curry or sothi.','ஆவியில் கவனமாகக் குழலைத் திறந்து கறி அல்லது சொதியுடன் வழங்கவும்.')]);}
function stringHoppers(){return M('stringhoppers','String hoppers','இடியாப்பம்',28,
 P('Use flour sold for string hoppers, a press and a steamer. Hot water needs care.','இடியாப்ப மாவு, அச்சு, ஆவிப்பாத்திரம் தேவை; வெந்நீரில் கவனம்.'),
 [I('sh-flour','String-hopper rice flour','இடியாப்ப அரிசி மாவு',95),I('sh-water','Hot water (approx.)','வெந்நீர் (தோராயம்)',100,'ml')],
 [P('Add hot water gradually to flour and mix to a smooth pressable dough. Follow the flour packet if its ratio differs.','மாவில் வெந்நீரைச் சிறிதுசிறிதாக ஊற்றி அச்சில் பிழியக்கூடிய மாவாக்கவும்; பொதியின் நீரளவு மாறலாம்.'),
 P('Press thin circles onto oiled steamer plates.','எண்ணெய் தடவிய தட்டில் நூல்களாக வட்டமாகப் பிழியவும்.'),
 P('Steam approximately 8–12 minutes until cooked throughout; serve warm.','8–12 நிமிடம் முழுவதும் வேகும் வரை ஆவியில் வேகவைத்துச் சூடாக வழங்கவும்.')]);}
function roti(n){
 const coconut=/coconut/i.test(n),kurakkan=/kurakkan|finger millet/i.test(n);
 return M('roti',coconut?'Coconut roti':'Simple flatbread',coconut?'தேங்காய் ரொட்டி':'ரொட்டி',25,
 P('Have a mixing bowl, rolling surface and flat pan ready.','மாவு பிசையப் பாத்திரம், தட்டும் இடம், தோசைக்கல் தயார் செய்யவும்.'),
 [I('roti-flour',kurakkan?'Kurakkan flour mixed with wheat flour':'Wheat flour',kurakkan?'குரக்கன்-கோதுமை கலவை மாவு':'கோதுமை மாவு',90),I('roti-water','Water (approx.)','நீர் (தோராயம்)',55,'ml'),I('roti-oil','Oil','எண்ணெய்',4,'ml'),...(coconut?[I('roti-coco','Grated coconut','துருவிய தேங்காய்',35)]:[])],
 [P('Mix flour'+(coconut?' and coconut':'')+' with water gradually to make a soft, manageable dough. Rest covered for 10 minutes.','மாவில்'+(coconut?' தேங்காயும்':'')+' சிறிது சிறிதாக நீர் சேர்த்து மென்மையாகப் பிசைந்து 10 நிமிடம் மூடி வைக்கவும்.'),
 P('Divide and press into even flat rounds. Cook on a medium-hot pan with a little oil.','சம பங்குகளாகப் பிரித்து ரொட்டியாகத் தட்டி மிதமான சூட்டில் சிறிது எண்ணெயுடன் சுடவும்.'),
 P('Turn and cook both sides until fully done.','திருப்பிப் போட்டு இருபுறமும் நன்றாக வேகவைக்கவும்.')]);
}
function appam(){return M('appam','Appam from fermented batter','புளித்த ஆப்பம்',15,
 P('Use ready appam batter and an appam pan with lid. Fermentation requires advance preparation.','தயார் புளித்த ஆப்ப மாவும் மூடியுள்ள அப்பச்சட்டியும் தேவை.'),
 [I('appam-batter','Ready fermented appam batter','தயார் புளித்த ஆப்ப மாவு',175),I('appam-oil','Oil','எண்ணெய்',4,'ml')],
 [P('Warm the pan and lightly grease it. Pour in batter and swirl to make thin edges and a thicker centre.','அப்பச்சட்டியைச் சூடாக்கி எண்ணெய் தடவி மாவை ஊற்றி ஓரங்களில் மெல்லியதாகச் சுழற்றவும்.'),
 P('Cover and cook until the middle is fully set and the edges lift. Serve with a cooked side.','மூடி வைத்து நடுப்பகுதி முழுவதும் வெந்ததும் ஓரம் பிரியும் போது எடுத்துக் கறியுடன் வழங்கவும்.')]);}
function upma(n){
 const aval=/aval|flattened/i.test(n),vermicelli=/vermicelli/i.test(n);
 const grain=aval?'Flattened rice (aval)':vermicelli?'Vermicelli':'Semolina (rava)';
 return M('upma','Vegetable '+(aval?'aval':vermicelli?'vermicelli':'upma'),'காய்கறி உப்புமா',25,
 P('Wash and chop vegetables; rinse or roast the grain following its packaging.','காய்கறிகளைக் கழுவி நறுக்கி, தானியத்தை அதன் பொதியின் குறிப்புப்படி தயார் செய்யவும்.'),
 [I('up-grain',grain,aval?'அவல்':vermicelli?'சேமியா':'ரவை',75),I('up-veg','Chopped seasonal vegetables','நறுக்கிய பருவக் காய்கறி',90),I('up-onion','Onion','வெங்காயம்',25),I('up-oil','Oil','எண்ணெய்',5,'ml'),I('up-water','Water','நீர்',aval?55:vermicelli?150:180,'ml')],
 [P('Heat oil; soften chopped onion and vegetables.','எண்ணெயில் நறுக்கிய வெங்காயத்தையும் காய்கறிகளையும் வதக்கவும்.'),
 P(aval?'Moisten flattened rice briefly and fold in; keep heat low.':vermicelli?'Add vermicelli and water, cover and simmer until tender.':'Toast semolina separately until fragrant. Add hot water a little at a time, then fold in semolina while stirring.','தானியத்தை வகைக்கேற்ப நீர் சேர்த்துக் கிளறி, முழுவதும் வேகும் வரை சமைக்கவும்.'),
 P('Check the texture and cook until no hard grains remain. Serve warm.','கட்டிகள் அல்லது வேகாத தானியம் இல்லாததைச் சரிபார்த்துச் சூடாக வழங்கவும்.')]);
}
function porridge(n){return M('porridge','Grain porridge','தானியக் கஞ்சி',30,
 P('Whole grains take longer than flour; soak if the grain packet recommends it.','முழுத் தானியத்திற்கு மாவை விட அதிக நேரம் தேவை; பொதியின் படி ஊறவைக்கவும்.'),
 [I('por-grain',/ragi|finger millet/i.test(n)?'Finger millet flour':'Rice or millet grain/flour',/ragi|finger millet/i.test(n)?'கேழ்வரகு மாவு':'அரிசி அல்லது சிறுதானியம்/மாவு',65),I('por-water','Water','நீர்',290,'ml')],
 [P('If using flour, mix it with some cool water into a lump-free paste. If using whole grain, rinse well.','மாவானால் முதலில் குளிர்ந்த நீரில் கட்டியில்லாமல் கரைக்கவும்; முழுத் தானியமானால் அலசவும்.'),
 P('Bring remaining water to a simmer and stir in the paste; or cook whole grains until tender.','மீதமுள்ள நீரைச் சூடாக்கி மாவைக் கலக்கவும்; முழுத் தானியமாக இருந்தால் மென்மையாகும் வரை வேகவைக்கவும்.'),
 P('Stir and simmer until thoroughly cooked and thickened; thin with water if needed.','நன்கு வெந்து பதம் வரும் வரை கிளறிச் சமைக்கவும்; தேவையெனில் நீர் சேர்க்கவும்.')]);}
function pongal(){return M('pongal','Rice and moong pongal','அரிசி பாசிப்பருப்பு பொங்கல்',35,
 P('Rinse rice and split moong dhal.','அரிசியையும் பாசிப்பருப்பையும் அலசவும்.'),
 [I('pongal-rice','Rice or suitable millet','அரிசி அல்லது சிறுதானியம்',65),I('pongal-moong','Split moong dhal','பாசிப்பருப்பு',35),I('pongal-water','Water','நீர்',320,'ml'),I('pongal-pepper','Pepper / cumin','மிளகு / சீரகம்',1),I('pongal-oil','Oil or ghee','எண்ணெய் அல்லது நெய்',5,'ml')],
 [P('Cook washed rice and moong with water until very soft and mashable.','அரிசி, பாசிப்பருப்பை நீரில் மிக மென்மையாகும் வரை வேகவைக்கவும்.'),
 P('Briefly warm pepper and cumin in a little oil or ghee; stir into cooked pongal.','மிளகு, சீரகத்தை எண்ணெய் அல்லது நெய்யில் தாளித்துப் பொங்கலில் கலக்கவும்.')]);}
function khichdi(){return M('khichdi','Vegetable khichdi','காய்கறிக் கிச்சடி',35,
 P('Wash rice and dhal; cut seasonal vegetables small.','அரிசி, பருப்பை அலசி பருவக் காய்கறியைச் சிறிதாக நறுக்கவும்.'),
 [I('k-rice','Dry rice','உலர் அரிசி',55),I('k-dal','Split moong dhal','பாசிப்பருப்பு',45),I('k-veg','Mixed vegetables','கலவை காய்கறி',90),I('k-water','Water','நீர்',300,'ml'),I('k-oil','Oil','எண்ணெய்',5,'ml')],
 [P('Warm the vegetables briefly in oil; stir in washed rice and dhal.','காய்கறிகளை எண்ணெயில் சிறிது வதக்கி அரிசி, பருப்பைச் சேர்க்கவும்.'),
 P('Add water and simmer covered until grains, dhal and vegetables are fully soft; add water as needed.','நீர் சேர்த்து மூடி அரிசி, பருப்பு, காய்கறி மென்மையாகும் வரை வேகவைக்கவும்.')]);}
function lemonRice(n){
 const lemon=/lemon/i.test(n),tomato=/tomato/i.test(n),curd=/curd/i.test(n),coconut=/coconut/i.test(n),tamarind=/tamarind/i.test(n);
 const addon=lemon?I('lr-lemon','Lemon juice','எலுமிச்சைச் சாறு',13,'ml'):tomato?I('lr-tom','Chopped tomatoes','நறுக்கிய தக்காளி',95):curd?I('lr-curd','Plain yoghurt','தயிர்',100):coconut?I('lr-coco','Grated coconut','துருவிய தேங்காய்',40):I('lr-tamarind','Tamarind pulp','புளி',12);
 return M('seasonedrice',n,/rice/i.test(n)?'கலந்த சாதம்':'சாதம்',30,
 P('Cook and cool rice safely. For curd rice, use cooled freshly cooked rice.','அரிசியைச் சமைத்துப் பாதுகாப்பாக ஆறவைக்கவும்; தயிர்சாதத்திற்கு ஆறிய சோறு பயன்படுத்தவும்.'),
 [I('lr-rice','Dry rice','உலர் அரிசி',75),I('lr-water','Water for rice (approx.)','சோறுக்கான நீர் (தோராயம்)',150,'ml'),addon,I('lr-oil','Oil','எண்ணெய்',5,'ml'),I('lr-mustard','Mustard seeds','கடுகு',0.5)],
 [P('Cook rice according to its package; let it cool slightly so grains stay separate.','அரிசியை அதன் வகைக்கேற்ப சமைத்துச் சிறிது ஆற விடவும்.'),
 P(curd?'Stir plain yoghurt into cooled rice. Keep refrigerated if not serving straight away.':'Warm oil and mustard, then cook or gently heat the chosen flavouring (except lemon juice, which goes in at the end).','எண்ணெயில் கடுகு தாளித்து, தேர்ந்த சுவைப்பொருளைச் சேர்க்கவும்; எலுமிச்சைச் சாற்றை இறுதியில் சேர்க்கவும்.'),
 P('Fold the flavouring through the rice. Serve freshly with a cooked vegetable or dhal side.','சோற்றுடன் கலந்து காய்கறி அல்லது பருப்புடன் புதிதாகப் பரிமாறவும்.')]);
}
function curryVeg(n){
 let match=[['pumpkin','Pumpkin','பூசணி'],['brinjal','Brinjal','கத்திரிக்காய்'],['okra','Okra','வெண்டைக்காய்'],['banana','Green cooking banana','வாழைக்காய்'],['bean','Beans','பயறு'],['beetroot','Beetroot','பீட்ரூட்'],['greens','Greens','கீரை'],['bottle gourd','Bottle gourd','சுரைக்காய்'],['drumstick','Drumstick vegetable','முருங்கைக்காய்'],['chayote','Chayote','சௌசௌ'],['yam','Edible elephant yam','சேனைக்கிழங்கு'],['mushroom','Edible mushrooms','காளான்'],['gourd','Gourd','பீர்க்கங்காய்']].find(a=>n.includes(a[0]));
 return M('vegcurry','Vegetable curry','காய்கறிக் கறி',30,
 P('Use only a positively identified edible vegetable; wash and prepare it correctly.','உணவுக்கேற்ற காய்கறியைத் தேர்ந்து, நன்றாகக் கழுவித் தயாரிக்கவும்.'),
 [I('vc-veg',match?match[1]:'Seasonal vegetable',match?match[2]:'பருவக் காய்கறி',140),I('vc-onion','Onion','வெங்காயம்',35),I('vc-tomato','Tomato','தக்காளி',55),I('vc-oil','Oil','எண்ணெய்',5,'ml'),I('vc-powder','Curry powder','கறித்தூள்',3),I('vc-water','Water','நீர்',110,'ml')],
 [P('Chop the vegetable into even pieces. Soften onion and tomato in oil with curry powder.','காய்கறியை ஒரே அளவில் நறுக்கி வெங்காயம், தக்காளி, கறித்தூளை எண்ணெயில் வதக்கவும்.'),
 P('Add vegetables and water; cover and simmer until completely tender (about 12–25 minutes according to the vegetable).','காய்கறி, நீர் சேர்த்து மூடி அதன் வகைக்கேற்ப 12–25 நிமிடம் நன்றாக வேகவைக்கவும்.')]);
}
function otherStaple(n){
 if(/string hopper/.test(n))return stringHoppers();
 if(/pittu/.test(n))return pittu();
 if(/appam/.test(n))return appam();
 if(/roti|chapati/.test(n))return roti(n);
 if(/dosa/.test(n))return dosa(n);
 if(/idli/.test(n))return idli();
 if(/rice|samba/.test(n))return rice();
 return null;
}
function boiledEggSide(){return M('boiled-egg','Boiled egg','அவித்த முட்டை',13,P('Use fresh eggs and a clean saucepan.','புதிய முட்டைகளும் சுத்தமான பாத்திரமும் பயன்படுத்தவும்.'),
[I('boil-egg','Egg','முட்டை',1,'pc'),I('boil-water','Water for boiling','அவிக்க நீர்',160,'ml')],
[P('Cover eggs with water and bring to a gentle boil.','முட்டைகள் மூழ்கும் அளவுக்கு நீர் சேர்த்து கொதிக்க வைக்கவும்.'),
P('Cook until the white and yolk are fully firm; cool slightly and peel before serving.','வெள்ளையும் மஞ்சளும் முழுவதும் வேகியதும் சிறிது ஆறவிட்டு ஓடு நீக்கவும்.')]);}
function beanCurry(n){const horse=/horse gram/.test(n),field=/field bean|mochai/.test(n);return M('bean-curry',horse?'Horse gram curry':field?'Field bean curry':'Green gram curry',horse?'கொள்ளு கறி':field?'மொச்சைக் கறி':'பச்சைப்பயறு கறி',horse?65:50,
P('Rinse and sort the dry beans. Soak overnight in the refrigerator if needed; cooking time depends on the bean, with horse gram often taking longer.','உலர் பயறைக் கழுவி, தேவையெனில் குளிர்சாதனத்தில் இரவு முழுவதும் ஊறவைக்கவும்; கொள்ளு வேகவைக்க அதிக நேரம் எடுக்கலாம்.'),
[I('bean-dry',horse?'Dry horse gram':field?'Dry field beans':'Dry green gram',horse?'கொள்ளு':field?'மொச்சை':'பச்சைப்பயறு',75),I('bean-onion','Onion','வெங்காயம்',35),I('bean-tomato','Tomato','தக்காளி',55),I('bean-oil','Oil','எண்ணெய்',5,'ml'),I('bean-water','Water (add more as needed)','நீர் (தேவைக்கேற்ப)',300,'ml')],
[P('Cook drained beans in fresh water until completely soft, adding more water as needed; do not eat undercooked dried beans.','ஊறிய பயறை புதிய நீரில் முற்றிலும் மென்மையாகும் வரை வேகவைக்கவும்; வேகாத உலர் பயறைச் சாப்பிட வேண்டாம்.'),
P('In another pan soften onion and tomato in oil; mix with cooked beans and simmer 5–10 minutes.','வேறு பாத்திரத்தில் வெங்காயம், தக்காளி வதக்கி வெந்த பயறுடன் கலந்து 5–10 நிமிடம் கொதிக்கவிடவும்.')]);}
function chickenSoup(){return M('chicken-soup','Chicken and vegetable soup','கோழி காய்கறிச் சூப்',40,
P('Separate raw chicken from washed vegetables and ready-to-eat food.','பச்சைக் கோழியை கழுவிய காய்கறிகளிலிருந்தும் சாப்பிடும் உணவிலிருந்தும் தனியாக வைக்கவும்.'),
[I('cs-chicken','Boneless chicken','எலும்பில்லா கோழி',110),I('cs-veg','Chopped seasonal vegetables','நறுக்கிய பருவக் காய்கறி',140),I('cs-onion','Onion','வெங்காயம்',30),I('cs-water','Clean water','சுத்தமான நீர்',340,'ml')],
[P('Place chopped onion, vegetables and chicken in a pot with water; bring to a safe simmer.','பாத்திரத்தில் வெங்காயம், காய்கறி, கோழி, நீர் சேர்த்துக் கொதிக்கவிடவும்.'),
P('Simmer until vegetables are tender and chicken reaches 74°C at its thickest point; serve hot.','காய்கறி மென்மையாகவும் கோழியின் தடிமனான பகுதி 74°C அடையும் வரையும் வேகவைத்துச் சூடாகப் பரிமாறவும்.')]);}
function baseModules(name){
 const n=name.toLowerCase();let primary,secondary=null;
 if(/chicken vegetable soup/.test(n)){primary=chickenSoup();secondary=otherStaple(n)}
 else if(/field bean|horse gram|green gram curry|mochai/.test(n)){primary=beanCurry(n);secondary=otherStaple(n)}
 else if(/fish/.test(n)){primary=fish(n);secondary=otherStaple(n.replace(/fish|curry|pepper|sothi|tamarind|coconut|tomato/g,'').trim())}
 else if(/chicken/.test(n)){primary=chicken(n);secondary=otherStaple(n.replace(/chicken|curry|pepper|sothi|turmeric|coconut|tomato/g,'').trim())}
 else if(/egg curry|egg masala|egg and greens|egg sothi|boiled egg|pepper egg/.test(n)){primary=egg(n);secondary=otherStaple(n.replace(/egg|curry|masala|pepper|boiled|greens|sothi/g,'').trim())}
 else if(/khichdi/.test(n))primary=khichdi();
 else if(/pongal/.test(n))primary=pongal();
 else if(/lemon rice|tomato rice|tamarind rice|coconut rice|curd rice/.test(n))primary=lemonRice(n);
 else if(/pittu/.test(n))primary=pittu();
 else if(/string hopper/.test(n))primary=stringHoppers();
 else if(/appam/.test(n))primary=appam();
 else if(/idli/.test(n))primary=idli();
 else if(/dosa/.test(n))primary=dosa(n);
 else if(/adai/.test(n)){
  primary=M('adai','Lentil adai','பருப்பு அடை',35,P('Soak washed lentils and rice for 2–3 hours first.','பருப்பையும் அரிசியையும் 2–3 மணி நேரம் ஊறவைக்கவும்.'),
  [I('adai-lentil','Mixed lentils','கலவைப் பருப்பு',70),I('adai-rice','Rice','அரிசி',35),I('adai-oil','Oil','எண்ணெய்',6,'ml')],
  [P('Drain soaked grains and grind with a little clean water into a pourable batter.','ஊறிய தானியத்தை வடித்துச் சிறிது நீருடன் அரைக்கவும்.'),
  P('Spread thicker than dosa on a heated pan; cook each side until the centre is fully cooked.','சூடான கல்லில் தோசையை விடச் சற்றுத் தடிமனாக ஊற்றி, இருபுறமும் முழுவதும் சுடவும்.')]);}
 else if(/kozhukattai/.test(n)){primary=M('kozhukattai','Steamed rice dumplings','கொழுக்கட்டை',30,P('Prepare a steamer and handle hot water carefully.','ஆவிப்பாத்திரம் தயார் செய்து வெந்நீரில் கவனமாக இருக்கவும்.'),
 [I('ko-flour','Rice flour','அரிசி மாவு',95),I('ko-coconut','Grated coconut','துருவிய தேங்காய்',25),I('ko-water','Hot water, gradually','வெந்நீர், சிறிது சிறிதாக',100,'ml')],
 [P('Mix flour with hot water carefully to form a pliable dough.','மாவில் வெந்நீரை கவனமாகச் சேர்த்து மென்மையான மாவாக்கவும்.'),P('Shape small dumplings with coconut filling and steam 10–15 minutes until fully cooked.','தேங்காய் நிரப்பிச் சிறிய கொழுக்கட்டைகளாகப் பிடித்து 10–15 நிமிடம் ஆவியில் வேகவைக்கவும்.')]);}
 else if(/upma|aval|vermicelli/.test(n))primary=upma(n);
 else if(/porridge|kanji|gruel/.test(n))primary=porridge(n);
 else if(/roti/.test(n))primary=roti(n);
 else if(/dhal|lentil|green gram|sundal|bean/.test(n)){primary=dhal();secondary=/rice/.test(n)?rice():null}
 else if(/rasam/.test(n)){primary=M('rasam','Pepper rasam','மிளகு ரசம்',20,P('Have ripe tomato and clean drinking water.','தக்காளி, சுத்தமான குடிநீர் தயார் செய்யவும்.'),
 [I('ra-tomato','Tomato','தக்காளி',80),I('ra-water','Water','நீர்',220,'ml'),I('ra-pepper','Crushed pepper and cumin','மிளகு, சீரகம்',2),I('ra-tamarind','Tamarind','புளி',6)],
 [P('Simmer tomato and tamarind in water about 10 minutes.','தக்காளி, புளியை நீரில் 10 நிமிடம் கொதிக்கவிடவும்.'),P('Add crushed pepper and cumin; simmer 3–5 minutes and serve hot.','நசுக்கிய மிளகு, சீரகம் சேர்த்து 3–5 நிமிடம் சமைத்துச் சூடாக வழங்கவும்.')]);secondary=/rice/.test(n)?rice():null;}
 else if(/rice|samba/.test(n)){primary=/curry|kootu|poriyal|greens|pumpkin|okra|brinjal|banana|bean|gourd|yam|mushroom/i.test(n)?curryVeg(n):rice();secondary=primary.id==='vegcurry'?rice():null}
 else if(/curry|kootu/.test(n)){primary=curryVeg(n);secondary=otherStaple(n)}
 else primary=curryVeg(n);
 const result=[primary,...(secondary&&secondary.id!==primary.id?[secondary]:[])];
 if(/(?:with |,\s*)sothi/.test(n)&&!result.some(x=>x.id==='sothi')&&!/fish|chicken/.test(n))result.push(sideRecipe('Light sothi','சொதி'));
 if(/egg/.test(n)&&!result.some(x=>x.id==='egg'||x.id==='boiled-egg')&&!/dosa/.test(n))result.push(boiledEggSide());
 if(/with (?:vegetable )?curry|roti, pumpkin|roti with pumpkin/.test(n)&&!result.some(x=>x.id==='vegcurry')&&!/fish|chicken|egg/.test(n))result.push(curryVeg(n));
 if(/with coconut chutney/.test(n))result.push(sideRecipe('Coconut chutney','தேங்காய்ச் சட்னி'));
 return result;
}
function sideRecipe(n,ta){
 const originalName=n;
 n=n.toLowerCase();
 if(/pickle/.test(n))return M('pickle','Ready-made lemon pickle','எலுமிச்சை ஊறுகாய்',0,P('Choose a properly stored prepared pickle.','பாதுகாப்பாகச் சேமித்த ஊறுகாயைப் பயன்படுத்தவும்.'),
 [I('pick','Prepared lemon pickle','தயார் எலுமிச்சை ஊறுகாய்',15)],
 [P('Serve a small spoonful on the side; homemade preserving requires a separately tested method.','ஒரு சிறிய கரண்டி அளவு துணையாக வழங்கவும்; ஊறுகாய் பதப்படுத்த தனி முறையான செய்முறை தேவை.')]);
 if(/appalam|papad/.test(n))return M('papad','Roasted appalam','சுட்ட அப்பளம்',4,P('Use a clean flat pan.','சுத்தமான தவா பயன்படுத்தவும்.'),
 [I('papad','Appalam','அப்பளம்',1,'pc')],[P('Toast on a medium pan, turning frequently, until crisp; do not let it burn.','மிதமான சூட்டில் அடிக்கடி திருப்பி மொறுமொறுப்பாகச் சுடவும்.')]);
 if(/curd|yoghurt/.test(n))return M('raita','Cucumber curd','வெள்ளரிக்காய் தயிர்',6,P('Rinse cucumber; keep dairy chilled.','வெள்ளரியைக் கழுவி தயிரைக் குளிராக வைக்கவும்.'),
 [I('rai-cucumber','Cucumber','வெள்ளரிக்காய்',65),I('rai-yoghurt','Plain yoghurt','தயிர்',75)],
 [P('Finely chop cucumber, mix with yoghurt and serve chilled.','வெள்ளரியை நறுக்கித் தயிருடன் கலந்து குளிராகப் பரிமாறவும்.')]);
 if(/sothi/.test(n))return M('sothi','Light coconut sothi','மெல்லிய தேங்காய்ச் சொதி',15,P('Use safe drinking water and coconut milk.','சுத்தமான குடிநீரும் தேங்காய்ப்பாலும் பயன்படுத்தவும்.'),
 [I('so-coco','Coconut milk','தேங்காய்ப்பால்',85,'ml'),I('so-water','Water','நீர்',70,'ml'),I('so-onion','Onion','வெங்காயம்',25),I('so-tur','Turmeric','மஞ்சள்',0.5)],
 [P('Simmer onion and turmeric in water until softened.','வெங்காயம், மஞ்சளை நீரில் மென்மையாகும் வரை வேகவைக்கவும்.'),P('Add coconut milk and heat gently for a few minutes; serve warm.','தேங்காய்ப்பால் சேர்த்துச் சில நிமிடங்கள் மெதுவாகச் சூடாக்கிப் பரிமாறவும்.')]);
 if(/sambol/.test(n))return M('sambol','Fresh coconut sambol','தேங்காய்ச் சம்பல்',10,P('Wash the lime and prepare fresh coconut safely.','எலுமிச்சையைக் கழுவிப் புதிய தேங்காயைத் தயாரிக்கவும்.'),
 [I('sam-coco','Grated coconut','துருவிய தேங்காய்',40),I('sam-onion','Onion','வெங்காயம்',20),I('sam-lemon','Lime/lemon juice','எலுமிச்சைச் சாறு',8,'ml')],
 [P('Finely chop onion and mix with coconut and lime juice. Add chilli only if preferred.','வெங்காயத்தை நறுக்கித் தேங்காய், எலுமிச்சைச் சாறுடன் கலக்கவும்; விருப்பப்படி மிளகாய் சேர்க்கலாம்.')]);
 const tomato=/tomato/.test(n),coconut=/coconut/.test(n);
 const leaf=/mint/.test(n)?['Mint','புதினா']:/coriander/.test(n)?['Coriander leaves','கொத்தமல்லி']:/curry leaf/.test(n)?['Curry leaves','கறிவேப்பிலை']:/ginger/.test(n)?['Ginger','இஞ்சி']:['Fresh herbs','புதிய இலைகள்'];
 return M('chutney',originalName,ta,12,
 P('Wash fresh herbs and use clean utensils.','இலைகளைக் கழுவிச் சுத்தமான பாத்திரங்களைப் பயன்படுத்தவும்.'),
 [tomato?I('chut-tom','Tomato','தக்காளி',90):coconut?I('chut-coconut','Grated coconut','துருவிய தேங்காய்',50):I('chut-herb',leaf[0],leaf[1],/ginger/.test(n)?8:25),I('chut-water','Clean water','சுத்தமான நீர்',20,'ml'),I('chut-lemon','Lemon juice','எலுமிச்சைச் சாறு',6,'ml')],
 [P(tomato?'Cook chopped tomato until soft; let cool.':'Use freshly prepared coconut or washed herbs.','தக்காளியானால் மென்மையாக வேகவைக்கவும்; இல்லையெனில் புதிய தேங்காய் அல்லது கழுவிய இலைகளைப் பயன்படுத்தவும்.'),
 P('Grind with water and lemon. Serve promptly; refrigerate leftovers.','நீர், எலுமிச்சை சேர்த்து அரைத்து உடனே பரிமாறவும்; மீதியை குளிராக வைக்கவும்.')]);
}
// Everyday kitchen measures: quantities are approximate, not exact conversions.
// Use one familiar household cup/tumbler consistently for dry grains and water.
function kitchenFraction(value){
 const whole=Math.floor(value),rest=value-whole;
 const parts=[[0,''],[0.25,'¼'],[1/3,'⅓'],[0.5,'½'],[2/3,'⅔'],[0.75,'¾'],[1,'']];
 let closest=parts[0];
 for(const part of parts)if(Math.abs(part[0]-rest)<Math.abs(closest[0]-rest))closest=part;
 if(closest[0]===1)return String(whole+1);
 if(!whole)return closest[1]||'¼';
 return String(whole)+(closest[1]?' '+closest[1]:'');
}
function kitchenHalfSpoon(value){
 const v=Math.max(0.5,Math.round(value*2)/2);
 return (Math.floor(v)?String(Math.floor(v)):'')+(v%1?'½':'');
}
function amount(x,num,lang){
 const raw=x.n*num,id=x.id.toLowerCase(),name=x.en.toLowerCase();
 const say=(en,ta)=>lang==='ta'?ta:lang==='en'?en:en+' / '+ta;
 const cups=(v)=>{const n=kitchenFraction(Math.max(0.2,v));return say(n+' cup'+(v>1.2?'s':''),n+' கப்')};
 const spoons=(v)=>{const n=kitchenHalfSpoon(v);return say(n+' teaspoon'+(v>1.25?'s':''),n+' தேக்கரண்டி')};
 const handfuls=(v)=>{const n=kitchenFraction(Math.max(0.25,v));return say(n+' handful'+(v>1.2?'s':''),n+' கைப்பிடி')};
 const pieces=(v,en,ta)=>{const n=kitchenFraction(Math.max(0.25,v));return say(n+' '+en,n+' '+ta)};
 if(x.unit==='pc')return pieces(raw,name==='egg'?'egg':name==='appalam'?'appalam':'piece',name==='egg'?'முட்டை':name==='appalam'?'அப்பளம்':'துண்டு');
 if(id==='boil-water')return say('Enough to cover the eggs','முட்டை மூழ்கும் அளவு');
 if(id==='idl-water')return say('Enough for the steamer, below the tray','ஆவிப்பாத்திரத்தில் தட்டிற்குக் கீழே போதிய நீர்');
 if(/water|நீர்/i.test(name)||x.unit==='ml'&&/water/.test(id))return cups(raw/200);
 if(/oil|ghee/.test(name))return spoons(raw/5);
 if(/lemon juice|lime\/lemon juice/.test(name))return spoons(raw/5);
 if(/coconut milk/.test(name))return cups(raw/200);
 if(/yoghurt|curd/.test(name))return cups(raw/200);
 if(/dosa batter|idli batter|appam batter/.test(name))return cups(raw/200);
 if(/onion/.test(name))return pieces(raw/80,'small onion','சிறிய வெங்காயம்');
 if(/tomato/.test(name))return pieces(raw/100,'medium tomato','நடுத்தர தக்காளி');
 if(/cucumber/.test(name))return pieces(raw/160,'medium cucumber','நடுத்தர வெள்ளரிக்காய்');
 if(/chicken|cleaned fish/.test(name))return pieces(raw/125,'palm-sized portion','உள்ளங்கை அளவு துண்டு');
 if(/turmeric|mustard seeds/.test(name)){
  if(raw>=2)return spoons(raw/3);
  const n=Math.max(1,Math.round(raw/0.5));
  return say(n===1?'a pinch':n+' pinches',n===1?'ஒரு சிட்டிகை':n+' சிட்டிகை');
 }
 if(/tamarind/.test(name))return pieces(raw/6,'small marble-sized piece','சிறிய உருண்டை அளவு புளி');
 if(/ginger/.test(name))return pieces(raw/10,'thumb-sized piece','பெருவிரல் அளவு துண்டு');
 if(/pickle/.test(name))return pieces(raw/15,'small spoonful','சிறிய கரண்டி');
 if(/pepper|cumin|curry powder|spice/.test(name))return spoons(raw/3);
 if(/grated coconut/.test(name))return handfuls(raw/35);
 if(/flour/.test(name))return cups(raw/120);
 if(/lentil|dhal|moong|gram|bean|rice|millet|kurakkan|semolina|rava|vermicelli|aval|flattened/.test(name)){
  const perCup=/semolina|rava|vermicelli|flattened|aval/.test(name)?130:160;
  return cups(raw/perCup);
 }
 if(/greens|leaves|herbs|mint|coriander/.test(name))return handfuls(raw/35);
 if(/vegetable|pumpkin|okra|brinjal|banana|beetroot|mushroom|gourd|yam|drumstick/.test(name))return handfuls(raw/70);
 // General solid ingredients: prefer a handful to a displayed weight.
 return handfuls(raw/70);
}
function combined(mods){
 const out=new Map();
 mods.forEach(mod=>mod.ings.forEach(x=>{
  const key=x.en.toLowerCase().replace(/^cooking /,'').replace(/ for moulds$/,'')+'|'+x.unit;
  if(out.has(key))out.get(key).n+=x.n;else out.set(key,{...x});
 }));
 return [...out.values()];
}
function txt(en,ta,lang){return lang==='en'?'<span lang="en">'+e(en)+'</span>':lang==='ta'?'<span lang="ta">'+e(ta)+'</span>':'<span lang="en">'+e(en)+'</span><span lang="ta">'+e(ta)+'</span>'}
function date(){return root.querySelector('#hcmDate')?.value||''}
let reopen=-1;
function renderCard(card,meal,plan,force=false){
 const signature=[date(),settings.servings,settings.language,plan.base.join('/'),plan.side.join('/'),plan.veg.join('/')].join('|');
 if(!force&&card.dataset.hcRecipeSignature===signature)return;
 const was=card.querySelector('.hc-full-recipe')?.open||false;
 card.querySelector('.hc-full-recipe')?.remove();
 card.dataset.hcRecipeSignature=signature;
 const modules=baseModules(plan.base[1]);
 if(plan.side[1])modules.push(sideRecipe(plan.side[1],plan.side[0]));
 if(plan.veg[1])modules.push(veg(plan.veg[1],plan.veg[0]));
 const items=combined(modules),d=document.createElement('details');d.className='hc-full-recipe';
 d.open=was||reopen===meal;
 const summary=document.createElement('summary');
 summary.textContent=(settings.language==='ta'?'முழுச் செய்முறை · ':'Full recipe · ')+settings.servings+(settings.language==='ta'?' பேர்':' people')+' ›';
 d.append(summary);
 const container=document.createElement('div');container.className='hc-full-body';
 container.innerHTML='<div class="hc-full-head"><b>'+txt(plan.base[1],plan.base[0],settings.language)+'</b><small>Practical home adaptation · வீட்டுச் சமையல் முறை</small></div>'+
 '<div class="hc-full-controls"><label>Servings / நபர்கள் <select class="hc-full-servings" aria-label="Servings">'+[1,2,3,4,5].map(n=>'<option value="'+n+'"'+(n===settings.servings?' selected':'')+'>'+n+'</option>').join('')+'</select></label>'+
 '<label>Language / மொழி <select class="hc-full-lang" aria-label="Recipe language"><option value="both"'+(settings.language==='both'?' selected':'')+'>English + தமிழ்</option><option value="ta"'+(settings.language==='ta'?' selected':'')+'>தமிழ்</option><option value="en"'+(settings.language==='en'?' selected':'')+'>English</option></select></label></div>'+
 '<p class="hc-full-measures">'+txt('Cup · handful · spoon · pinch','கப் · கைப்பிடி · கரண்டி · சிட்டிகை',settings.language)+'</p>'+ 
  '<h4>Shopping list / வாங்க வேண்டியவை</h4>'+
 '<div class="hc-full-ingredients">'+items.map(x=>'<label><input type="checkbox" aria-label="'+e(x.en)+'"><span>'+txt(x.en,x.ta,settings.language)+'</span><strong>'+amount(x,settings.servings,settings.language)+'</strong></label>').join('')+'</div>'+
 modules.map(m=>'<section class="hc-full-module"><h4>'+txt(m.en,m.ta,settings.language)+' <small>~'+m.time+' min</small></h4>'+
 '<ol>'+m.steps.map(s=>'<li>'+txt(s[0],s[1],settings.language)+'</li>').join('')+'</ol></section>').join('')+
 '';
 d.append(container);
 const old=card.querySelector('.hc-kitchen-lesson');
 if(old)card.insertBefore(d,old);else card.append(d);
}

/* Personal cooking index: requested dish names only; never invent unrecorded methods. */
const personalDishes=[
 {en:'Rice dishes',ta:'சாத வகைகள்',notes:[
 P('Earlier stock-rice note: 1 cup Chinigura rice, 1⅓–1½ cups chicken stock and a spoon of butter or ghee. Soak 10 minutes; cook covered 10–12 minutes; rest 10 minutes. Different rice needs different water.','முன்பு பேசிய கோழி ரசச் சாதம்: 1 கப் சினிகுரா அரிசி, 1⅓–1½ கப் கோழி ரசம், 1 கரண்டி வெண்ணெய் அல்லது நெய். 10 நிமிடம் ஊறவைத்து 10–12 நிமிடம் மூடி வேகவைத்து 10 நிமிடம் ஓய்வெடுக்க விடவும். அரிசி வகைக்கேற்ப நீர் மாறும்.'),
 P('Butter-jeera rice and kiribath were also discussed; your own final methods are not recorded.','வெண்ணெய் சீரகச் சாதம், பாற்சோறு பற்றியும் பேசினோம்; உங்கள் இறுதி சொந்த முறைகள் இன்னும் பதிவு செய்யப்படவில்லை.')
 ]},
 {en:'Chicken curry',ta:'கோழிக் கறி',notes:[
 P('Earlier guide: soften onion and tomato in oil; add curry powder and chicken, then water. Cover and simmer until fully cooked (74°C in the thickest part). Your own version is not yet confirmed.','முன்பு பேசிய முறை: எண்ணெயில் வெங்காயம், தக்காளி வதக்கி, கறித்தூள், கோழி, நீர் சேர்த்து மூடி முழுவதும் வேகவைக்கவும் (தடிமனான பகுதி 74°C). உங்கள் சொந்த முறை இன்னும் உறுதியாகவில்லை.')
 ]},
 {en:'Butter chicken',ta:'பட்டர் சிக்கன்',notes:[]},
 {en:'Pepper chicken',ta:'மிளகுக் கோழி',notes:[
 P('Earlier no-milk version: half a chicken, onion, tomato, ginger, garlic, curry leaves, chilli, turmeric, cumin and 1½ teaspoons pepper. Fry aromatics with chicken, add water and cook through; finish with pepper.','முன்பு பேசிய பால் சேர்க்காத முறை: அரைக் கோழி, வெங்காயம், தக்காளி, இஞ்சி, பூண்டு, கறிவேப்பிலை, மிளகாய், மஞ்சள், சீரகம், 1½ தேக்கரண்டி மிளகு. கோழியுடன் வதக்கி நீர் சேர்த்து முழுவதும் வேகவைத்து இறுதியில் மிளகு சேர்க்கவும்.')
 ]},
 {en:'Naan',ta:'நான்',notes:[]},
 {en:'Appam',ta:'ஆப்பம்',notes:[
 P('Earlier quick appam for two: rice flour 1¼ cups, wheat flour about ¾ cup, coconut milk 1 cup, 2 spoons yoghurt, 1 teaspoon each yeast and sugar, ¼ teaspoon baking soda, ½ teaspoon salt, and a little butter. Add milk or water for pourable batter.','முன்பு பேசிய இருவருக்கான விரைவு ஆப்பம்: 1¼ கப் அரிசி மாவு, சுமார் ¾ கப் கோதுமை மாவு, 1 கப் தேங்காய்ப்பால், 2 கரண்டி தயிர், தலா 1 தேக்கரண்டி ஈஸ்ட், சர்க்கரை, ¼ தேக்கரண்டி சோடா, ½ தேக்கரண்டி உப்பு, சிறிது வெண்ணெய். பால் அல்லது நீர் சேர்த்து ஊற்றும் பதத்திற்கு கலக்கவும்.'),
 P('Ferment until ready (the earlier quick method allowed around 1½–2 hours), then cook covered in an appam pan until the centre sets.','மாவு புளிக்கும் வரை வைக்கவும் (முன்பு பேசிய விரைவு முறை சுமார் 1½–2 மணி நேரம்). அப்பச்சட்டியில் மூடி நடுப்பகுதி வெந்ததும் எடுக்கவும்.')
 ]},
 {en:'Sambal kangkong',ta:'காங்கோங் சம்பல்',notes:[]}
];
function showPersonalKitchen(){
 if(root.querySelector('#hcPersonalKitchen'))return;
 const anchor=root.querySelector('#hcmMeals');if(!anchor)return;
 const lang=(()=>{try{return localStorage.getItem('hcKitchenLangV1')==='en'?'en':'ta'}catch(_){return 'ta'}})();
 const t=(en,ta)=>lang==='en'?en:ta;
 const section=document.createElement('details');section.id='hcPersonalKitchen';
 section.innerHTML='<summary>'+e(t('My recipes','என் சமையல்'))+' <small>'+e(t('7 dishes','7 உணவுகள்'))+'</small></summary>'+
 '<p class="hc-my-intro">'+e(t('Earlier cooking notes only. Missing methods are not guessed.','முன்பு பேசிய குறிப்புகள் மட்டும். தெரியாத செய்முறைகள் சேர்க்கப்படவில்லை.'))+'</p>'+
 personalDishes.map(d=>'<details class="hc-my-dish"><summary>'+e(t(d.en,d.ta))+'</summary>'+
 (d.notes.length?'<ol>'+d.notes.map(n=>'<li>'+e(t(n[0],n[1]))+'</li>').join('')+'</ol>':'<p>'+e(t('Your method is not recorded yet.','உங்கள் செய்முறை இன்னும் பதிவு செய்யப்படவில்லை.'))+'</p>')+'</details>').join('');
 anchor.before(section);
}

function refresh(force=false){
 showPersonalKitchen();
 const plans=window.HCKitchenMenu.preview(date());
 if(!Array.isArray(plans)||plans.length!==3)return;
 root.querySelectorAll('#hcmMeals > .meal').forEach((card,i)=>{if(plans[i])renderCard(card,i,plans[i],force)});
 reopen=-1;
}
root.addEventListener('click',ev=>{
 if(ev.target.closest('.option')){const card=ev.target.closest('.meal');reopen=[...root.querySelectorAll('#hcmMeals > .meal')].indexOf(card)}
},true);
root.addEventListener('change',ev=>{
 if(ev.target.matches('.hc-full-servings')){settings.servings=Math.max(1,Math.min(5,Number(ev.target.value)||2));keep();refresh(true)}
 if(ev.target.matches('.hc-full-lang')){settings.language=ev.target.value;keep();refresh(true)}
});
const style=document.createElement('style');style.id='hcFullRecipeStyleV181';
style.textContent=[
'#hcMonthlyKitchen .hc-full-recipe{margin:10px 0;border:1px solid #71828a;border-radius:11px;background:#122029;color:#fff;overflow:hidden}',
'#hcMonthlyKitchen .hc-full-recipe>summary{list-style:none;cursor:pointer;min-height:44px;padding:12px;background:#20333e;font-size:14px;font-weight:750}',
'#hcMonthlyKitchen .hc-full-recipe>summary::-webkit-details-marker{display:none}',
'#hcMonthlyKitchen .hc-full-body{padding:12px;font-size:13px;line-height:1.6}',
'#hcMonthlyKitchen .hc-full-head>b{display:grid;font-size:17px;margin-bottom:4px}',
'#hcMonthlyKitchen .hc-full-head>small{display:block;color:#c7d1d8;font-size:11px}',
'#hcMonthlyKitchen .hc-full-controls{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:11px 0}',
'#hcMonthlyKitchen .hc-full-controls label{font-size:12px;color:white}',
'#hcMonthlyKitchen .hc-full-controls select{width:100%;margin:4px 0 0;background:#263943;color:#fff;border:1px solid #9aafb9;border-radius:8px;padding:8px;min-height:40px;font:inherit}',
'#hcMonthlyKitchen .hc-full-body h4{font-size:15px;margin:15px 0 7px;line-height:1.4}',
'#hcMonthlyKitchen .hc-full-ingredients{display:grid;gap:5px}',
'#hcMonthlyKitchen .hc-full-ingredients label{display:grid;grid-template-columns:21px minmax(0,1fr) auto;align-items:start;gap:7px;border-bottom:1px solid #364c57;padding:8px 0;font-size:12px}',
'#hcMonthlyKitchen .hc-full-ingredients label>strong{font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}',
'#hcMonthlyKitchen .hc-full-ingredients input{width:17px;height:17px;margin:2px 0 0;accent-color:#e8f0f4}',
'#hcMonthlyKitchen .hc-full-module{border-top:1px solid #46606b;padding-top:5px;margin-top:12px}',
'#hcMonthlyKitchen .hc-full-module h4 small{font-size:11px;color:#bbcbd2;margin-left:6px;font-weight:400}',
'#hcMonthlyKitchen .hc-full-module ol{padding-left:22px;margin:8px 0}',
'#hcMonthlyKitchen .hc-full-module li{padding:3px 0 10px}',
'#hcMonthlyKitchen .hc-full-body span[lang]{display:block;line-height:1.75}',
'#hcMonthlyKitchen .hc-full-body span[lang=ta]{color:#e3eced;line-height:1.95}',
'#hcMonthlyKitchen .hc-full-note,#hcMonthlyKitchen .hc-full-prep,#hcMonthlyKitchen .hc-full-budget{border:1px solid #364c56;border-radius:7px;background:#192b34;padding:9px;font-size:12px;margin:10px 0;color:#e1e8eb}',
'#hcMonthlyKitchen .hc-full-budget{border-color:#71828a}',
'#hcMonthlyKitchen .hc-full-recipe :is(select,input,summary):focus-visible{outline:2px solid #fff;outline-offset:2px}'
].join('\n');document.head.append(style);
const mo=new MutationObserver(()=>refresh());
mo.observe(root,{subtree:true,childList:true});
refresh();
})();