/* HeartClear Kitchen — worldwide discovery; own bilingual recipes stay first.
   Public recipe data is from TheMealDB API, attributed in the UI.
   Online recipes are community-submitted and cannot cover every food. */
(function(){
'use strict';
const section=document.getElementById('hcKitchenAskV163');
const input=document.getElementById('hcKitchenAskInput');
const localResults=document.getElementById('hcKitchenSearchResults');
const existingReply=document.getElementById('hcKitchenAskReply');
if(!section||!input||!localResults||document.getElementById('hcKitchenWorldV207'))return;

const rows=[
['Mango juice','மாம்பழச் சாறு','Ripe mango, clean water, lime (optional).','Peel and remove the mango stone. Blend the flesh with a little clean water. Add lime to taste; serve fresh.','juice mango fruit drink'],
['Pineapple juice','அன்னாசிச் சாறு','Ripe pineapple, clean water, lime (optional).','Peel pineapple and remove hard parts. Blend the chopped fruit with a little water; strain only if you prefer. Serve fresh.','juice pineapple fruit drink'],
['Orange juice','ஆரஞ்சுச் சாறு','Fresh oranges.','Wash the oranges, cut and squeeze them. Remove seeds, and serve the juice fresh.','fruit juice'],
['Lemonade','எலுமிச்சை பானம்','1 lemon, 1 cup drinking water, mint and a little sugar or honey if liked.','Squeeze the lemon into cool clean water. Add mint and sweeten to taste if preferred; stir and serve.','lime juice lemon drink'],
['Banana smoothie','வாழைப்பழ ஸ்மூத்தி','1 banana, 1 cup milk or unsweetened plant milk, a pinch of cinnamon (optional).','Peel banana, blend with chilled milk until smooth. Add cinnamon if you like; drink fresh.','shake smoothie drink fruit'],
['Mango lassi','மாம்பழ லஸ்ஸி','Half a ripe mango, half a cup plain yoghurt, water or milk, cardamom (optional).','Blend peeled mango with yoghurt and enough liquid to pour. Add cardamom if liked and serve chilled.','yoghurt yogurt drink'],
['Ginger tea','இஞ்சித் தேநீர்','1 thumb-sized piece of ginger, 1 cup water, tea leaves (optional), lemon (optional).','Wash and slice ginger. Simmer in water 5–8 minutes. Steep tea briefly if using it, strain and add lemon as liked.','tea herbal ayurvedic drink இஞ்சி'],
['Masala chai','மசாலா தேநீர்','1 cup water, black tea, milk, crushed cardamom, a little ginger and cinnamon.','Simmer water with crushed spices and ginger for 3–5 minutes. Add tea, steep, then add milk and heat through. Strain.','milk tea indian tea தேநீர்'],
['Black tea','கருப்புத் தேநீர்','1 cup clean water, black tea leaves or 1 tea bag.','Boil water, pour over black tea and steep about 3–5 minutes. Remove tea leaves or bag; serve.','tea drink'],
['Milk tea','பால் தேநீர்','1 cup water, tea leaves, a splash of milk.','Steep tea in hot water, strain and add warmed milk to taste.','tea drink sri lanka'],
['Mint tea','புதினா தேநீர்','A handful of edible mint leaves, 1 cup water.','Rinse mint leaves. Pour hot water over them, cover and steep 5 minutes. Strain and serve.','herbal tea drink'],
['Filter coffee','ஃபில்டர் காபி','Ground coffee suitable for filter, water and milk if desired.','Brew ground coffee in a clean coffee filter following the brewer instructions. Mix with warm milk if desired.','coffee south indian drink'],
['Iced coffee','குளிர்ந்த காபி','Brewed coffee, ice, milk (optional).','Brew coffee, allow it to cool safely, then pour over ice. Add milk if you like.','cold coffee drink'],
['Turmeric milk','மஞ்சள் பால்','1 cup milk or plant milk, a pinch of turmeric and a little ginger (optional).','Warm milk gently with turmeric and ginger, stirring until hot. Do not burn. Serve warm.','milk golden milk drink'],
['Fruit salad','பழச் சாலட்','Seasonal fruits such as mango, banana, apple and orange, a squeeze of lime.','Wash fruits; peel and remove seeds as needed. Cut into small pieces and toss with lime. Serve promptly.','dessert fruit snack'],
['Cucumber salad','வெள்ளரிச் சாலட்','Cucumber, tomato, lemon, mint and a little salt.','Wash cucumber and tomato. Chop, add mint and squeeze over lemon. Toss and serve.','salad snack vegetable'],
['Chickpea salad','கொண்டைக்கடலைச் சாலட்','1 cup thoroughly cooked chickpeas, cucumber, tomato, onion, lemon and herbs.','Drain cooked chickpeas. Wash and dice vegetables; combine with chickpeas, lemon and herbs.','beans vegetarian vegan salad protein'],
['Hummus','ஹம்மஸ்','1 cup fully cooked chickpeas, 1 spoon tahini (optional), lemon, garlic, water.','Blend drained cooked chickpeas with garlic, lemon and tahini; add clean water a little at a time until smooth.','dip chickpea vegetarian'],
['Roasted sweet potato','சுட்ட சர்க்கரைவள்ளிக் கிழங்கு','Sweet potato, a little cooking oil and pepper.','Wash and cut sweet potato into even wedges. Lightly coat with oil. Roast in a hot oven until tender all the way through, turning once.','sweet potato snack vegetable'],
['Baked potato','சுட்ட உருளைக்கிழங்கு','1 potato, a little oil, plain yoghurt and herbs (optional).','Scrub the potato, pierce the skin and bake until soft throughout. Split carefully and top with yoghurt and herbs.','potato vegetable snack'],
['Vegetable soup','காய்கறிச் சூப்','Mixed vegetables, onion, a little oil, water and spices.','Wash and chop vegetables. Soften onion in oil, add vegetables and water, simmer until tender; season and serve.','soup starter'],
['Lentil soup','பருப்பு சூப்','Half a cup red lentils, 2 cups water, tomato, onion and turmeric.','Rinse lentils. Soften onion, add lentils, tomato, turmeric and water; simmer until completely soft.','dal dhal soup lentil'],
['Oat porridge','ஓட்ஸ் கஞ்சி','Half a cup oats, 1 cup milk or water, banana or fruit if liked.','Simmer oats with the liquid, stirring until softened and creamy according to the oats package. Add fruit.','breakfast oatmeal'],
['Omelette','ஆம்லெட்','2 eggs, tomato, onion, leafy greens and a little oil.','Beat eggs, stir in finely cut vegetables. Pour into lightly oiled pan and cook until completely set, flipping or covering as needed.','egg breakfast omelet'],
['Scrambled eggs','கிளறிய முட்டை','2 eggs, a splash of milk (optional), pepper and a little oil.','Beat eggs; pour into a lightly oiled pan on moderate heat. Stir gently until completely set.','eggs breakfast'],
['Egg sandwich','முட்டை சாண்ட்விச்','2 slices bread, 1 egg, tomato, lettuce and yoghurt.','Cook egg completely. Wash and slice salad vegetables. Assemble bread with cooked egg, vegetables and yoghurt.','sandwich bread breakfast'],
['Chicken wrap','கோழி ரேப்','1 flatbread, cooked chicken, lettuce, tomato, plain yoghurt and pepper.','Use thoroughly cooked chicken (74°C if cooking raw). Add washed salad and yoghurt to flatbread. Roll tightly and serve.','wrap flatbread'],
['Fish wrap','மீன் ரேப்','1 flatbread, cooked boneless fish, lettuce, tomato and lemon yoghurt.','Cook fish thoroughly and remove all bones. Layer in flatbread with washed vegetables and lemon yoghurt; roll.','wrap seafood'],
['Vegetable wrap','காய்கறி ரேப்','1 flatbread, cooked beans or chickpeas, cucumber, lettuce, tomato and hummus.','Wash and cut vegetables. Spread hummus on flatbread; add thoroughly cooked beans and vegetables, then roll.','wrap vegetarian vegan'],
['Pancakes','பேன்கேக்','1 cup flour, 1 egg, 1 cup milk, 1 teaspoon baking powder and a little oil.','Mix flour and baking powder. Whisk in milk and egg into pourable batter. Cook small rounds on a lightly oiled pan until both sides are done.','breakfast'],
['Semolina halwa','ரவை அல்வா','Half a cup semolina, a little ghee, water, cardamom and sugar to taste.','Toast semolina lightly in ghee. Add hot water carefully, stirring until cooked and thick. Add cardamom and sweeten to taste.','dessert sweet rava kesari'],
['Yoghurt fruit bowl','தயிர் பழக்கலவை','Plain yoghurt, seasonal fruit and a handful of oats or nuts if suitable.','Wash and chop fruit. Spoon into a bowl with plain yoghurt and oats or nuts, then serve.','breakfast dessert snack'],
['Tomato soup','தக்காளி சூப்','2 tomatoes, a little onion, garlic, 1 cup water and pepper.','Wash and chop vegetables. Soften onion and garlic, simmer with tomato and water until soft. Blend carefully after cooling slightly and reheat if needed.','soup'],
['Sambar','சாம்பார்','Cooked toor dhal, mixed vegetables, tamarind, sambar spice mix and water.','Cook dhal until very soft. Simmer vegetables with tamarind water and sambar spices; combine with dhal and cook until vegetables are tender.','south indian tamil sri lanka curry lentil'],
['Coconut sambol','தேங்காய் சம்பல்','Fresh grated coconut, small onion, chilli (optional), lime and a pinch of salt.','Finely chop onion. Mix with clean freshly grated coconut, lime and chilli if preferred. Serve fresh; refrigerate leftovers.','pol sambol sri lanka side'],
['Garlic naan','பூண்டு நான்','1 cup flour, 2 spoons plain yoghurt, water, baking powder, garlic and a little oil.','Mix flour with yoghurt, baking powder and enough water for soft dough. Rest, roll flat and cook both sides on a hot pan. Brush lightly with garlic oil.','bread flatbread indian'],
['Potato curry','உருளைக்கிழங்கு கறி','2 potatoes, onion, tomato, turmeric, curry powder, oil and water.','Wash, peel if preferred and cube potatoes. Soften onion and tomato with spices; add potatoes and water, cover and simmer until tender.','aloo vegetable curry']
];
const fold=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu,' ').trim();
const local=rows.map((r,i)=>({en:r[0],ta:r[1],ingredients:r[2],method:r[3],aliases:r[4],source:'universal',order:i}));
window.HCKitchenUniversal={
 catalog:()=>local.map(({en,ta,aliases,source})=>({en,ta,aliases,source})),
 detail:(en)=>{
  const d=local.find(x=>fold(x.en)===fold(en));
  return d?{text:d.en+' / '+d.ta+'\nIngredients / தேவையானவை:\n'+d.ingredients+'\n\nCooking / சமைப்பது:\n'+d.method+'\n\nHousehold cooking guide · Original HC recipe. / வீட்டுச் சமையல் வழிகாட்டி.'}:null;
 }
};

const root=document.createElement('div');root.id='hcKitchenWorldV207';
root.style.cssText='margin-top:10px;border-top:1px solid #3a505b;padding-top:9px;font-size:12px;line-height:1.55;color:#e3edf1';
root.innerHTML='<div class="hc-world-title">Explore world food / உலக உணவுகள்</div><div class="hc-world-filters"><select id="hcWorldCategory" aria-label="Browse by food type"><option value="">Food type / உணவு வகை</option><option>Breakfast</option><option>Vegetarian</option><option>Vegan</option><option>Seafood</option><option>Chicken</option><option>Beef</option><option>Lamb</option><option>Pasta</option><option>Side</option><option>Starter</option><option>Dessert</option><option>Miscellaneous</option></select><select id="hcWorldArea" aria-label="Browse by cuisine"><option value="">Cuisine / நாட்டுச் சமையல்</option><option>Indian</option><option>Italian</option><option>Chinese</option><option>Japanese</option><option>Thai</option><option>Mexican</option><option>French</option><option>Greek</option><option>Turkish</option><option>Moroccan</option><option>Egyptian</option><option>American</option><option>British</option><option>Vietnamese</option><option>Malaysian</option><option>Filipino</option><option>Jamaican</option></select></div><div id="hcWorldStatus" role="status" aria-live="polite"></div><div id="hcWorldResults" class="hc-world-results"></div><div id="hcWorldRecipe" class="hc-world-recipe"></div><p class="hc-world-credit" hidden>Online recipes: community-contributed by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">TheMealDB</a>. Instructions are in the source language (usually English).</p>';
const style=document.createElement('style');
style.textContent=[
'#hcKitchenWorldV207 .hc-world-title{font-weight:650;font-size:13px;margin-bottom:7px}',
'#hcKitchenWorldV207 .hc-world-filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:8px;margin-bottom:8px;max-width:100%}',
'#hcKitchenWorldV207,.hc-world-discovery{min-width:0;max-width:100%;width:100%;box-sizing:border-box}',
'.hc-world-discovery{margin:10px 0 0;border:1px solid #536b76;border-radius:12px;padding:9px 11px}',
'.hc-world-discovery>summary{cursor:pointer;min-height:39px;display:flex;align-items:center;font-weight:650;font-size:13px;color:#e9eff2;list-style:inside}',
'#hcKitchenWorldV207 select{box-sizing:border-box;width:100%;min-width:0;max-width:100%;border:1px solid #71838b;border-radius:8px;background:#19313d;color:#f3f7f8;font-size:12px;padding:8px;min-height:40px}',
'#hcKitchenWorldV207 #hcWorldStatus{color:#c4d3d9;font-size:11px}',
'#hcKitchenWorldV207 .hc-world-results{display:grid;gap:5px}',
'#hcKitchenWorldV207 button{font:inherit;text-align:left;min-height:37px;padding:8px 10px;border:1px solid #6b818b;border-radius:8px;background:#19313d;color:#fff}',
'#hcKitchenWorldV207 button[aria-pressed=true]{background:#2b4c5a;border-color:#e3f0f5}',
'#hcKitchenWorldV207 .hc-world-recipe:not(:empty){margin-top:9px;border:1px solid #536b76;border-radius:10px;padding:11px;background:#102934}',
'#hcKitchenWorldV207 .hc-world-recipe h4{font-size:15px;margin:0 0 4px}',
'#hcKitchenWorldV207 .hc-world-recipe h5{font-size:13px;margin:10px 0 4px}',
'#hcKitchenWorldV207 .hc-world-recipe ul{padding-left:20px;margin:5px 0}',
'#hcKitchenWorldV207 .hc-world-recipe li{padding:3px 0}',
'#hcKitchenWorldV207 .hc-world-recipe p{white-space:pre-line;margin:6px 0}',
'#hcKitchenWorldV207 .hc-world-recipe a{color:#cfe8fc;text-decoration:underline}',
'#hcKitchenWorldV207 .hc-world-recipe details{border-top:1px solid #435b67;padding-top:8px;margin-top:10px}',
'#hcKitchenWorldV207 .hc-world-credit{margin:8px 0 0;color:#a8c0c9;font-size:10px}'
].join('\n');
document.head.append(style);
// The world-wide web directory is secondary to the main one-line Kitchen search.
const discovery=document.createElement('details');
discovery.className='hc-world-discovery';
const opener=document.createElement('summary');
opener.textContent='More world recipes online / மேலும் உலக உணவுகள்';
discovery.append(opener,root);
localResults.after(discovery);
const status=root.querySelector('#hcWorldStatus'),results=root.querySelector('#hcWorldResults'),recipe=root.querySelector('#hcWorldRecipe');
const credit=root.querySelector('.hc-world-credit');
const category=root.querySelector('#hcWorldCategory'),area=root.querySelector('#hcWorldArea');
const ENDPOINT='https://www.themealdb.com/api/json/v1/1/';
let token=0,timer=null,active=null,lastMeals=[],visible=8,currentQuery='';
const stop=new Set(['recipe','recipes','healthy','healthier','homemade','easy','quick','how','make','cook','cooking','please','a','the','with','for','my','give','me','i','have','has','got','some','what','can','using','and','or','want','need','from','dish','ingredients','ingredient']);
const replacements={mutton:'lamb',aubergine:'eggplant',brinjal:'eggplant',capsicum:'pepper',prawn:'shrimp',curd:'yoghurt',dal:'lentil',dhal:'lentil',saadam:'rice',sadham:'rice',mutta:'egg',kottu:'kothu'};
const ingredientAlias={eggs:'egg',tomatoes:'tomato',potatoes:'potato',chickpeas:'chickpeas',chicken:'chicken',fish:'salmon',rice:'rice',beef:'beef',lamb:'lamb',shrimp:'shrimp',prawns:'shrimp',mushrooms:'mushrooms',carrot:'carrots',apple:'apple',beans:'beans'};
const categoryAlias={fish:'Seafood',dessert:'Dessert',desserts:'Dessert',breakfast:'Breakfast',vegetarian:'Vegetarian',vegan:'Vegan',seafood:'Seafood',sides:'Side',starter:'Starter',starters:'Starter'};
const areaAlias={indian:'Indian',italian:'Italian',chinese:'Chinese',japanese:'Japanese',thai:'Thai',mexican:'Mexican',french:'French',greek:'Greek',turkish:'Turkish',moroccan:'Moroccan',egyptian:'Egyptian',american:'American',british:'British',vietnamese:'Vietnamese',malaysian:'Malaysian',filipino:'Filipino',jamaican:'Jamaican'};
function clearRemote(){
 if(active)active.abort();
 active=null;clearTimeout(timer);token++;
 status.textContent='';results.replaceChildren();recipe.replaceChildren();credit.hidden=true;lastMeals=[];visible=8;
}
function cleanQuery(q){
 return fold(q).split(' ').filter(x=>x&&!stop.has(x)).map(x=>replacements[x]||x).join(' ').slice(0,90);
}
async function api(endpoint,controller){
 const r=await fetch(ENDPOINT+endpoint,{signal:controller.signal,headers:{Accept:'application/json'},cache:'no-store'});
 if(!r.ok)throw Error('Recipe service HTTP '+r.status);
 const data=await r.json();return Array.isArray(data.meals)?data.meals:[];
}
function isAlcoholRecipe(m){
 return Array.from({length:20},(_,i)=>String(m['strIngredient'+(i+1)]||'').trim()).some(x=>/^(red wine|white wine|wine|beer|lager|ale|cider|rum|vodka|gin|whisk(?:e)?y|brandy|liqueur|sake)$/i.test(x));
}
function button(label,fn,cls=''){
 const b=document.createElement('button');b.type='button';b.textContent=label;
 if(cls)b.className=cls;b.addEventListener('click',fn);return b;
}
function text(tag,value){const e=document.createElement(tag);e.textContent=value;return e}
function showMeal(m){
 results.querySelectorAll('button[data-meal-id]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mealId===m.idMeal)));
 recipe.replaceChildren();
 const display=full=>{
  recipe.replaceChildren();
  recipe.append(text('h4',full.strMeal||'Recipe'));
  const origin=[full.strArea,full.strCategory].filter(Boolean).join(' · ');
  if(origin)recipe.append(text('small',origin));
  recipe.append(text('h5','Ingredients / தேவையானவை'));
  const ul=document.createElement('ul');
  for(let i=1;i<=20;i++){
   const ing=String(full['strIngredient'+i]||'').trim();
   if(!ing)continue;
   ul.append(text('li',String(full['strMeasure'+i]||'').trim()+' '+ing));
  }
  recipe.append(ul);
  recipe.append(text('h5','Cooking / சமைப்பது'));
  recipe.append(text('p',String(full.strInstructions||'No preparation steps supplied by this source.').trim()));
  const tip=document.createElement('details');
  const summary=text('summary','Optional balanced serving / விருப்பமான சமநிலை');
  tip.append(summary,text('p','Serve with vegetables or fruit where they fit the dish. Choose ingredients and amounts that suit your needs and taste. You do not need to avoid your favourite foods.'));
  recipe.append(tip);
  const url=typeof full.strSource==='string'&&/^https:\/\//i.test(full.strSource)?full.strSource:'https://www.themealdb.com/meal/'+encodeURIComponent(full.idMeal);
  const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Original recipe / மூலச் செய்முறை ↗';
  recipe.append(a);
  recipe.scrollIntoView({block:'nearest',behavior:'smooth'});
 };
 if(m.strInstructions){if(!isAlcoholRecipe(m))display(m);else recipe.replaceChildren(text('p','This recipe is not available in HeartClear.'));return}
 recipe.append(text('p','Loading the full recipe… / முழுச் செய்முறை ஏற்றப்படுகிறது…'));
 const when=token,controller=new AbortController();
 api('lookup.php?i='+encodeURIComponent(m.idMeal),controller).then(rows=>{
  if(when!==token)return;
  if(rows[0]&&!isAlcoholRecipe(rows[0]))display(rows[0]);else recipe.replaceChildren(text('p','This recipe is not available in HeartClear.'));
 }).catch(()=>{if(when===token)recipe.replaceChildren(text('p','Could not load this recipe. Try again online.'))});
}
function render(meals){
 lastMeals=meals;
 results.replaceChildren();recipe.replaceChildren();
 if(!meals.length)return;
 for(const m of meals.slice(0,visible)){
  const b=button(m.strMeal+(m.strArea?' · '+m.strArea:''),()=>showMeal(m));
  b.dataset.mealId=m.idMeal;b.setAttribute('aria-pressed','false');results.append(b);
 }
 if(meals.length>visible)results.append(button('More recipes / மேலும் செய்முறைகள் ('+(meals.length-visible)+')',()=>{visible+=8;render(lastMeals)}));
 credit.hidden=false;
}
function addWebLink(q){
 const label='Find more on the web ↗ / இணையத்தில் மேலும் தேடவும்';
 results.append(button(label,()=>window.open('https://www.google.com/search?q='+encodeURIComponent(q+' recipe ingredients steps'),'_blank','noopener,noreferrer')));
}
async function findOnline(q,mode=null){
 clearRemote();const thisToken=token;currentQuery=q;
 if(!q&& !mode)return;
 if(!navigator.onLine){status.textContent='Offline: use built-in recipes. / இணையம் இல்லை; உள்ளூர் செய்முறைகளைப் பயன்படுத்தவும்.';return}
 const query=cleanQuery(q);
 if(!query&&!mode)return;
 status.textContent='Searching worldwide recipes… / உலகச் செய்முறைகள் தேடப்படுகின்றன…';
 const controller=new AbortController();active=controller;
 try{
  let meals=[],label='Online recipes';
  const categoryMode=mode?.kind==='category'?mode.value:categoryAlias[query];
  const areaMode=mode?.kind==='area'?mode.value:areaAlias[query]||areaAlias[query.replace(/ cuisine$/,'')];
  if(categoryMode){meals=await api('filter.php?c='+encodeURIComponent(categoryMode),controller);label=categoryMode+' recipes'}
  else if(areaMode){meals=await api('filter.php?a='+encodeURIComponent(areaMode),controller);label=areaMode+' recipes'}
  else{
   meals=await api('search.php?s='+encodeURIComponent(query),controller);
   if(!meals.length){
    const terms=query.split(' ');
    const selected=terms.find(t=>ingredientAlias[t]);
    const ingredient=ingredientAlias[query]|| (selected?ingredientAlias[selected]:terms.length===1?query:'');
    if(ingredient){
      meals=await api('filter.php?i='+encodeURIComponent(ingredient.replace(/\s+/g,'_')),controller);
      if(terms.length>1)label='Ideas using '+ingredient+' (check other ingredients)';
    }
   }
  }
  if(thisToken!==token)return;
  const unique=new Map();for(const m of meals){if(m?.idMeal&&!isAlcoholRecipe(m))unique.set(m.idMeal,m)}
  const safe=[...unique.values()].slice(0,100);visible=8;
  const builtIn=localResults.querySelectorAll('.hc-recipe-match').length>0;
  if(safe.length){status.textContent=label+' · '+safe.length+' available / கிடைக்கும் செய்முறைகள்';render(safe)}
  else{status.textContent=builtIn?'':"No online match for this exact name. / இணையத்தில் இந்தப் பெயர் கிடைக்கவில்லை.";if(!builtIn)addWebLink(q)}
 }catch(err){
  if(controller.signal.aborted||thisToken!==token)return;
  status.textContent='World recipe service unavailable. Your built-in Kitchen still works. / இணைய சேவை கிடைக்கவில்லை.';
  addWebLink(q);
 }
}
function schedule(){
 category.value='';area.value='';
 clearRemote();
 const q=input.value.trim();if(!q){clearRemote();return}
 if(!discovery.open)return;
 timer=setTimeout(()=>findOnline(q),550);
}
input.addEventListener('input',schedule);
const searchBtn=document.getElementById('hcKitchenAskSend');
searchBtn?.addEventListener('click',()=>{if(discovery.open)findOnline(input.value.trim())});
input.addEventListener('keydown',e=>{if(e.key==='Enter'&&discovery.open)findOnline(input.value.trim())});
discovery.addEventListener('toggle',()=>{if(discovery.open&&input.value.trim())findOnline(input.value.trim());else if(!discovery.open)clearRemote()});
function browse(kind,value){
 if(!value)return;
 const q=value;
 input.value=value;
 input.dispatchEvent(new Event('input',{bubbles:true}));
 clearTimeout(timer);
 category.value=kind==='category'?value:'';
 area.value=kind==='area'?value:'';
 findOnline(q,{kind,value});
}
category.addEventListener('change',()=>{if(category.value)browse('category',category.value)});
area.addEventListener('change',()=>{if(area.value)browse('area',area.value)});
})();