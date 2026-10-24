/* HeartClear Kitchen: concise home-style world cooking guides.
   Cultural labels describe common culinary influences, not certified heritage recipes.
   Fusion entries are modern adaptations, not claimed historic traditions.
   Measurements use ordinary cups, spoons, handfuls, and cooking cues. */
(function(){
'use strict';
const previous=window.HCKitchenWorldRecipes;
const items=[];
function add(cuisines,en,ta,aliases,ingredients,steps,note=''){
 items.push({en,ta,aliases,cuisines:cuisines.split(' '),ingredients,steps,source:'world',note});
}
// Tamil cooking, including everyday Tamil-speaking Sri Lankan traditions.
add('tamil','Vendakkai puli kuzhambu','வெண்டைக்காய் புளிக்குழம்பு','okra tamarind curry lady finger','2 handfuls okra, 1 small onion, 1 tomato, a walnut-sized piece of tamarind, 1 spoon curry powder, a pinch of turmeric, oil and water.',[
 'Soak tamarind in half a cup of warm water and strain; slice washed, dry okra.',
 'Saute onion, tomato and okra in a little oil; add curry powder and turmeric.',
 'Pour in tamarind water and simmer until the okra is tender and the gravy thickens.']);
add('tamil','Keerai masiyal','கீரை மசியல்','tamil mashed greens spinach','2 handfuls edible greens or spinach, 1 garlic clove, half a small onion, a pinch of salt and a little water.',[
 'Wash greens thoroughly and remove tough stems.',
 'Simmer greens with onion, garlic and a little water until fully softened.',
 'Mash with a spoon; season to taste and serve with rice.']);
add('tamil','Milagu rasam','மிளகு ரசம்','tamil pepper cumin soup','1 tomato, 1 small spoon crushed black pepper, 1 small spoon cumin, garlic, a little tamarind water, curry leaves and 2 cups water.',[
 'Crush pepper, cumin and garlic; crush or chop the tomato.',
 'Simmer with tamarind water, curry leaves and water until fragrant.',
 'Turn off heat once hot and aromatic; serve as soup or alongside rice.']);
add('srilankantamil tamil','Pittu with coconut dhal','தேங்காய் பிட்டும் பருப்புக் கறியும்','sri lankan tamil puttu puttu dal','1 cup rice flour, half a cup grated coconut, water, a pinch of salt; half a cup red lentils, turmeric and 1 small onion.',[
 'Sprinkle salted water into rice flour until it forms loose crumbs, not a dough. Layer with coconut in a suitable pittu steamer and steam until fully cooked.',
 'Rinse lentils; simmer with onion, turmeric and water until soft, topping up water as needed.',
 'Serve the hot pittu with dhal.']);
add('srilankantamil tamil','Jaffna-style fish curry','யாழ்ப்பாண முறை மீன் கறி','sri lankan tamil jaffna meen kulambu','2 cleaned fish portions, onion, tomato, 1 spoon roasted curry powder, turmeric, tamarind water, curry leaves and a little oil.',[
 'Soften onion, tomato and curry leaves in oil; stir in spices.',
 'Add diluted tamarind and simmer the sauce for 5 minutes.',
 'Add fish and gently cook until opaque and fully cooked throughout; avoid stirring hard so pieces stay intact.']);
add('srilankantamil tamil','Dry fish sambol','கருவாட்டுச் சம்பல்','sri lankan tamil karuvadu sambal dried fish','1 small handful dried salted fish, 1 onion, chilli to taste, lemon and a little oil.',[
 'Rinse dried fish and soak briefly if very salty; drain. Check for bones.',
 'Cook the fish thoroughly in a little oil, then add thinly sliced onion and chilli.',
 'Finish with lemon. Serve a small portion with rice and vegetables.']);
// Wider Indian cooking.
add('indian','Chana masala','கொண்டைக்கடலை மசாலா','chole chickpea curry','1 cup fully cooked chickpeas, 1 onion, 2 tomatoes, garlic, ginger, cumin and garam masala.',[
 'Saute chopped onion with ginger and garlic in a little oil.',
 'Cook chopped tomato and spices until the mixture thickens.',
 'Add cooked chickpeas and a splash of water; simmer 10 minutes.']);
add('indian','Aloo gobi','உருளைக்கிழங்கு காலிஃபிளவர்','potato cauliflower curry','1 potato, half a small cauliflower, onion, turmeric, cumin, chilli and oil.',[
 'Cut potatoes small and cauliflower into florets.',
 'Warm cumin and onion in a little oil; add turmeric, chilli and vegetables.',
 'Add a splash of water, cover and cook until potatoes are soft and cauliflower is tender.']);
add('indian','Vegetable biryani','காய்கறி பிரியாணி','veg biriyani spiced rice','1 cup basmati rice, 2 handfuls mixed vegetables, onion, ginger, garlic, yoghurt, turmeric, biryani spices and water.',[
 'Rinse and briefly soak rice. Saute onion, ginger, garlic and spices.',
 'Add vegetables and a spoon of yoghurt, then the drained rice and water appropriate for the rice.',
 'Cover and cook gently until rice and vegetables are fully tender; rest 5 minutes before serving.']);
// Chinese family-style dishes.
add('chinese','Chinese tomato and egg stir-fry','சீன தக்காளி முட்டை வதக்கல்','xihongshi chao jidan tomato eggs','2 eggs, 2 tomatoes, a small pinch of sugar, spring onion and a little oil.',[
 'Beat eggs; softly scramble in a hot pan with a little oil and set aside.',
 'Cook chopped tomatoes in the pan until juicy, adding a splash of water if needed.',
 'Return egg, heat through and finish with sliced spring onion.']);
add('chinese','Chinese vegetable fried rice','சீன காய்கறி வறுத்த சாதம்','fried rice soy sauce vegetables','2 cups promptly refrigerated cooked rice, 2 handfuls chopped vegetables, 1 egg optional, 1 spoon soy sauce and a little oil.',[
 'Use rice that was cooled promptly and stored refrigerated; do not use rice left out overnight.',
 'Stir-fry chopped vegetables until tender; cook optional egg fully.',
 'Add rice and soy sauce; toss until everything is thoroughly hot.']);
add('chinese','Ginger garlic noodles','இஞ்சி பூண்டு நூடுல்ஸ்','chinese soy noodles stir fried','2 portions noodles, 1 small spoon grated ginger, 2 garlic cloves, 1 handful greens, soy sauce and a little oil.',[
 'Cook noodles according to the packet, then drain.',
 'Briefly saute ginger and garlic; add greens and cook until tender.',
 'Toss with noodles and a little soy sauce; serve hot.']);
// Indonesia.
add('indonesian','Nasi goreng','நாசி கோரெங்','indonesian fried rice kecap manis','2 cups safely chilled cooked rice, 1 egg, shallot or onion, garlic, vegetables, a spoon of sweet soy sauce and optional chilli.',[
 'Use cooked rice cooled promptly and kept refrigerated. Cook beaten egg fully and put aside.',
 'Stir-fry chopped shallot, garlic and vegetables until tender.',
 'Add rice and sweet soy sauce, heat through, then return egg.']);
add('indonesian','Gado-gado','காடோ காடோ','indonesian peanut vegetable salad','2 handfuls mixed vegetables, 1 potato, tofu or 1 egg, 2 spoons unsweetened peanut butter, lime, soy sauce and warm water.',[
 'Boil potato until tender; steam vegetables and cook tofu or egg thoroughly.',
 'Whisk peanut butter, lime, soy sauce and warm water into a pourable sauce.',
 'Arrange vegetables and protein, then drizzle with the peanut sauce. Check for peanut allergies.']);
// Malaysia.
add('malaysian','Mee goreng','மீ கோரெங்','malaysian fried noodles','2 portions yellow noodles, 1 handful cabbage, 1 small carrot, garlic, 1 egg or tofu, a spoon each of soy sauce and chilli sauce.',[
 'Cook noodles if needed according to the packet and drain.',
 'Stir-fry garlic, cabbage and carrot until tender; cook egg or tofu fully.',
 'Add noodles and sauces and toss until piping hot.']);
add('malaysian','Nasi lemak home-style','நாசி லெமாக்','malaysian coconut rice sambal','1 cup rice, coconut milk plus water suited to the rice, pandan leaf if available, cucumber, egg, peanuts and a little prepared sambal.',[
 'Rinse rice and cook with a mixture of coconut milk and water as appropriate to its variety; add pandan if available.',
 'Boil egg until fully cooked and slice cucumber.',
 'Serve warm coconut rice with egg, cucumber, peanuts and a spoon of sambal. Check for peanut allergies.']);
// Nepal.
add('nepali','Vegetable momo','காய்கறி மோமோ','nepalese steamed dumplings','1 cup flour, water and salt for dough; 1 cup finely chopped cabbage, carrot, onion, ginger and a little oil.',[
 'Mix flour with water and salt into a soft dough; rest covered for 20 minutes.',
 'Finely chop filling, season and enclose small spoonfuls in thin dough circles; seal edges.',
 'Steam over actively boiling water until wrappers and filling are completely cooked.']);
add('nepali','Dal bhat tarkari','தால் பாத் தர்காரி','nepal lentil rice vegetable curry','1 cup rice, half a cup lentils, 2 handfuls seasonal vegetables, onion, turmeric, cumin and water.',[
 'Cook rice according to its variety.',
 'Simmer washed lentils with turmeric and water until very soft; season with sauteed cumin and onion.',
 'Cook vegetables with a little spice and water until tender. Serve the three components together.']);
// Bangladesh.
add('bangladeshi','Bhuna khichuri','புனா கிச்சுரி','bangladesh khichuri rice lentil','half a cup rice, half a cup moong dal, onion, ginger, garlic, turmeric, cumin, bay leaf and water.',[
 'Rinse rice and lentils; lightly toast lentils in a dry pan until fragrant.',
 'Saute onion and spices in a little oil; add rice and lentils and stir briefly.',
 'Add enough water to cook both until soft and fluffy, covering and checking so it does not burn.']);
add('bangladeshi','Begun bhorta','கத்திரிக்காய் பர்த்தா','bangladesh mashed eggplant aubergine','1 large aubergine, a small onion, green chilli, coriander, lemon and a small spoon mustard oil or another cooking oil.',[
 'Roast or bake aubergine until completely soft and let cool enough to handle.',
 'Remove skin and mash the flesh with a fork.',
 'Mix with finely chopped onion, chilli, coriander, lemon and a little oil.']);
add('bangladeshi','Shorshe fish','கடுகு மீன் கறி','bangladeshi mustard fish shorshe mach','2 fish portions, 1 spoon ground mustard or prepared mustard paste, turmeric, green chilli, a little oil and water.',[
 'Mix mustard, turmeric and a little water to a smooth sauce.',
 'Place cleaned fish in a shallow pan with the sauce and chilli.',
 'Cover and simmer gently until fish is fully cooked; serve with rice.']);
// Arabic and wider Middle Eastern home cooking.
add('middleeastern','Hummus','ஹம்முஸ்','arab levant chickpea dip','1 cup fully cooked chickpeas, 1 spoon tahini, lemon juice, 1 garlic clove, water and a little olive oil.',[
 'Blend or mash chickpeas, tahini, lemon juice and garlic.',
 'Add small splashes of water until creamy.',
 'Finish with a little olive oil; serve with vegetables or bread. Check for sesame allergies.']);
add('middleeastern','Mujaddara','முஜத்தரா','arabic lentils rice onions','half a cup brown lentils, half a cup rice, 2 onions, cumin, oil and water.',[
 'Simmer lentils until almost tender, then add rice and water appropriate to finish both.',
 'Slice onions thinly and cook in a little oil until deep golden, stirring often.',
 'Season rice and lentils with cumin and top with the onions.']);
add('middleeastern mediterranean','Shakshuka','ஷக்ஷூகா','eggs tomato pepper north africa middle east','2 eggs, 2 tomatoes or 1 cup chopped tomatoes, 1 pepper, onion, paprika, cumin and oil.',[
 'Soften onion and sliced pepper in a little oil; add tomatoes and spices.',
 'Simmer until saucy, then make two wells and crack in eggs.',
 'Cover and gently cook until eggs reach your preferred safe doneness; serve with bread.']);
// Mediterranean (distinct from any one nationality).
add('mediterranean','Greek-style village salad','கிரேக்க காய்கறி சாலட்','greek salad horiatiki','1 cucumber, 2 tomatoes, half a red onion, olives, a small handful feta, lemon or vinegar and olive oil.',[
 'Wash and chop cucumber and tomatoes; thinly slice onion.',
 'Toss with olives, a little olive oil and lemon or vinegar.',
 'Add crumbled feta just before serving.']);
add('mediterranean','Lemon herb baked fish','எலுமிச்சை மூலிகை மீன்','mediterranean fish lemon oregano','2 fish fillets, 1 lemon, garlic, 1 small spoon oregano or parsley, olive oil and vegetables.',[
 'Heat oven to 200°C. Put cleaned fish in a baking dish with sliced vegetables.',
 'Rub with oil, crushed garlic, herbs and lemon.',
 'Bake until fish is opaque and flakes easily, fully cooked throughout (63°C if using a thermometer).']);
add('mediterranean','Mediterranean lentil soup','மத்தியதரைக் கடல் பருப்பு சூப்','lentil carrot tomato soup','half a cup lentils, 1 carrot, 1 tomato, onion, garlic, olive oil, cumin and 3 cups water.',[
 'Soften onion, garlic and chopped carrot in a little oil.',
 'Add lentils, tomato, cumin and water.',
 'Simmer until lentils and carrot are tender; add water for your preferred soup thickness.']);
// Italy.
add('italian','Pasta al pomodoro','தக்காளி இத்தாலிய பாஸ்தா','italian tomato pasta spaghetti','2 handfuls pasta, 2 tomatoes or half a tin of crushed tomatoes, garlic, olive oil and basil.',[
 'Cook pasta in boiling water until tender; reserve a little cooking water.',
 'Gently cook garlic in oil, add tomato and simmer 10 minutes.',
 'Toss with drained pasta, a splash of cooking water and basil.']);
add('italian','Minestrone','மினெஸ்ட்ரோன்','italian vegetable bean soup','1 onion, 1 carrot, 1 celery stalk, 1 tomato, 1 handful beans already cooked, a little pasta, stock or water and herbs.',[
 'Soften finely chopped onion, carrot and celery in a little oil.',
 'Add tomato, stock or water and herbs; simmer until vegetables soften.',
 'Add pasta and cooked beans; continue until pasta is fully cooked.']);
add('italian','Mushroom risotto','காளான் ரிசோட்டோ','italian arborio rice','1 cup risotto rice, 1 handful mushrooms, onion, 3 cups warm stock, a small spoon butter and grated cheese optional.',[
 'Soften onion and sliced mushrooms in a pan; add dry risotto rice and stir.',
 'Add warm stock a ladle at a time, stirring and adding more as absorbed.',
 'Continue until rice is creamy and tender; finish with a little butter or cheese.']);
// Scandinavia.
add('scandinavian','Dill salmon with potatoes','டில் கீரை சால்மன் உருளை','nordic scandinavian baked fish','2 salmon portions, 2 potatoes, lemon, dill, a little oil and yoghurt optional.',[
 'Boil or steam cut potatoes until fully tender.',
 'Bake or pan-cook salmon with a little oil, dill and lemon until fully cooked throughout.',
 'Serve with potatoes and a spoon of yoghurt if desired.']);
add('scandinavian','Nordic rye open sandwich','வட ஐரோப்பிய ரை ரொட்டி','smorrebrod smørrebrød Scandinavian open faced sandwich','2 slices rye bread, cucumber, radish, fully cooked egg or chickpeas, yoghurt, fresh dill.',[
 'Toast rye bread lightly if preferred.',
 'Spread with yoghurt, add thin vegetables and fully cooked egg or chickpeas.',
 'Finish with dill; serve immediately.']);
add('scandinavian','Scandinavian oat porridge','ஸ்காண்டிநேவிய ஓட்ஸ் கஞ்சி','nordic oats breakfast oatmeal','half a cup rolled oats, 1 cup milk or water, 1 apple, cinnamon and a handful of berries if available.',[
 'Combine oats with milk or water and simmer, stirring, until soft.',
 'Grate or chop apple and add during the final minutes.',
 'Top with cinnamon and berries if available.']);
// Other European regional dishes.
add('european','Spanish potato tortilla','ஸ்பானிய உருளைக் கிழங்கு ஆம்லெட்','spain spanish omelette','2 potatoes, 3 eggs, 1 small onion and a little olive oil.',[
 'Thinly slice potatoes and onion; cook slowly in a covered pan with a little oil until soft.',
 'Mix with beaten eggs and return to a lightly oiled pan.',
 'Cook gently on both sides until the egg is fully set.']);
add('european','French ratatouille','ரடடூயி காய்கறி கறி','france french vegetable stew','1 aubergine, 1 courgette, 1 pepper, 2 tomatoes, garlic, onion and olive oil.',[
 'Cut washed vegetables into bite-size pieces.',
 'Soften onion and garlic in a little olive oil; add aubergine, courgette and pepper.',
 'Add tomatoes and simmer covered until all vegetables are tender.']);
add('european','British lentil cottage pie','பருப்பு காய்கறி பை','uk england lentil shepherd pie','1 cup cooked lentils, 1 carrot, 1 onion, 1 cup peas, 2 potatoes and a little stock.',[
 'Boil potatoes and mash with a little milk or water.',
 'Cook onion, carrot, peas, lentils and a splash of stock until vegetables are soft; put in a baking dish.',
 'Spread mashed potatoes over the top and bake at 200°C until bubbling and golden.']);
// Modern cross-cultural adaptations: never presented as inherited or historical recipes.
add('fusion tamil middleeastern','Tamil–Arab chickpea pepper rice','தமிழ்–அரபு கொண்டைக்கடலை மிளகு சாதம்','arab tamil fusion cumin rice chickpea','1 cup rice, 1 cup cooked chickpeas, onion, cumin, curry leaves, black pepper, lemon and a little oil.',[
 'Cook rice and keep hot. Warm onion, cumin and curry leaves in a little oil.',
 'Add fully cooked chickpeas and black pepper; heat through.',
 'Fold in rice, finish with lemon and serve hot.'],'Modern Tamil–Arab-inspired fusion; not claimed as an old traditional dish.');
add('fusion tamil mediterranean','Tamil–Mediterranean lemon curry-leaf fish','தமிழ்–மத்தியதரைக் கடல் எலுமிச்சை மீன்','fusion fish lemon curry leaves olive oil','2 fish fillets, lemon, curry leaves, garlic, turmeric, olive oil and a handful of vegetables.',[
 'Rub fish with lemon, crushed garlic, turmeric and a little oil.',
 'Place with curry leaves and vegetables in a baking dish.',
 'Bake at 200°C until fish is fully cooked throughout (63°C if using a thermometer).'],'Modern Tamil–Mediterranean fusion, not a documented historic recipe.');
add('fusion tamil chinese','Tamil–Chinese pepper vegetable noodles','தமிழ்–சீன மிளகு காய்கறி நூடுல்ஸ்','fusion curry leaves soy sauce stir fry','2 portions noodles, 2 handfuls vegetables, garlic, curry leaves, crushed pepper and 1 spoon soy sauce.',[
 'Cook noodles according to the packet and drain.',
 'Stir-fry garlic, curry leaves and vegetables until tender.',
 'Toss in noodles, crushed pepper and soy sauce; serve hot.'],'Modern Tamil–Chinese fusion; a household adaptation.');
add('fusion tamil malaysian','Tamil–Malaysian coconut vegetable curry','தமிழ்–மலேசிய தேங்காய் காய்கறிக் கறி','fusion curry coconut turmeric lemongrass','2 handfuls mixed vegetables, 1 cup coconut milk, garlic, onion, turmeric, curry leaves and lemongrass if available.',[
 'Soften onion, garlic, curry leaves and lemongrass in a little oil.',
 'Add turmeric, chopped vegetables, coconut milk and a splash of water.',
 'Simmer until all vegetables are completely tender; serve with rice.'],'Modern Tamil–Malaysian fusion rather than a certified traditional recipe.');
function detail(name){
 const x=items.find(r=>r.en.toLowerCase()===String(name||'').toLowerCase());
 if(!x)return previous?.detail?.(name)||null;
 const out=[x.en+' / '+x.ta,'Ingredients / தேவையானவை','• '+x.ingredients,
  'Cooking / சமைப்பது',...x.steps.map((step,i)=>(i+1)+'. '+step)];
 if(x.note)out.push(x.note);
 return {en:x.en,ta:x.ta,text:out.join('\n'),source:'home-style guide',references:[],cuisines:x.cuisines};
}
window.HCKitchenWorldRecipes={
 ...(previous||{}),
 catalog:()=>[...(previous?.catalog?.()||[]),...items],
 detail,
 recipes:(Number(previous?.recipes)||0)+items.length,
 categories:[...new Set([...(previous?.categories||[]),'Tamil','Sri Lankan Tamil','Indian','Chinese','Indonesian','Malaysian','Nepali','Bangladeshi','Middle Eastern / Arab','Mediterranean','Italian','Scandinavian','European','Tamil fusion'])]
};
})();