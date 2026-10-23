/* HeartClear v149 — extra bilingual kitchen lessons; progressive disclosure only. */
(function(){
'use strict';
const root=document.getElementById('hcMonthlyKitchen');
if(!root || !document.getElementById('hcKitchenDrawer'))return;
const KEY='hcKitchenRiceTypeV149',SWAP='hcKitchenDosaIdliV149';
function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}}
function save(k,data){try{localStorage.setItem(k,JSON.stringify(data))}catch(e){}}
let rice=read(KEY),swaps=read(SWAP);
const riceTypes=[
 {id:'white',en:'White rice',ta:'வெள்ளை அரிசி',
  enInfo:'Wash and cook according to the rice packet. White rice is fine as part of a varied meal; add vegetable kootu, dhal, eggs or fish. It does not itself lower blood sugar.',
  taInfo:'அரிசியை கழுவி அதன் வகைக்கு ஏற்ற நீர், நேரத்தில் வேகவைக்கவும். வெள்ளை அரிசியை காய்கறிக் கூட்டு, பருப்பு, முட்டை அல்லது மீனுடன் சேர்க்கலாம். இது தானாக இரத்தச் சர்க்கரையைக் குறைக்காது.'},
 {id:'red',en:'Red rice (prefer less-polished)',ta:'சிவப்பு அரிசி (குறைவாகத் தீட்டியது)',
  enInfo:'Less-polished red rice often provides more fibre than refined white rice. Cooking time varies. Try with greens, beans, pumpkin kootu or dhal. The red colour alone does not guarantee a lower blood-sugar response.',
  taInfo:'குறைவாகத் தீட்டப்பட்ட சிவப்பு அரிசியில் பொதுவாக நார்ச்சத்து அதிகம் இருக்கும். வேகும் நேரம் வகையைப் பொறுத்து மாறும். கீரை, பீன்ஸ், பூசணிக்காய் கூட்டு அல்லது பருப்புடன் சேர்க்கலாம். சிவப்பு நிறம் மட்டும் சர்க்கரை உயர்வைக் குறைக்கும் என உறுதியில்லை.'},
 {id:'brown',en:'Brown rice',ta:'பழுப்பு அரிசி',
  enInfo:'Brown rice retains more of the grain’s bran and fibre. Some varieties need longer cooking. Combine with vegetables and a protein-rich food for a satisfying meal.',
  taInfo:'பழுப்பு அரிசியில் தானியத்தின் வெளித்தோலும் நார்ச்சத்தும் அதிகமாகத் தங்கியிருக்கும். சில வகைகள் வேக அதிக நேரம் எடுக்கும். காய்கறி, பருப்பு அல்லது புரதம் தரும் துணை உணவுடன் சேர்க்கவும்.'},
 {id:'basmati',en:'Basmati rice',ta:'பாஸ்மதி அரிசி',
  enInfo:'Basmati is a rice variety, not a medicine. Different white and brown basmati products can affect blood glucose differently. Follow cooking instructions; combine with dhal or a vegetable curry.',
  taInfo:'பாஸ்மதி ஓர் அரிசி வகை; மருந்து அல்ல. வெள்ளை மற்றும் பழுப்பு பாஸ்மதியின் சர்க்கரை விளைவுகள் மாறலாம். சரியான முறையில் வேகவைத்து பருப்பு அல்லது காய்கறிக் கறியுடன் சேர்க்கவும்.'}
];
const lessons=[
 {test:/\bdosa\b|தோசை/i,
  howEn:'Soak and grind rice and urad dal, ferment the batter until ready, and spread thinly on a preheated dosa pan. Cook until the centre sets and edges are lightly crisp. Serve with sambar and chutney.',
  howTa:'அரிசி, உளுந்தை ஊறவைத்து அரைத்த மாவை புளிக்கவிடவும். சூடான தோசைக்கல்லில் மெல்லியதாகப் பரப்பி நடுப்பகுதி வேகும் வரை சுடவும். சாம்பார், சட்னியுடன் பரிமாறவும்.',
  whyEn:'The thin layer makes dosa crisp; a thicker layer stays softer. If you have suitable batter and an idli steamer, idli is another useful option.',
  whyTa:'மெல்லிய தோசை மொறுமொறுப்பாகும்; தடிமனான தோசை மென்மையாக இருக்கும். இட்லித் தட்டும் ஏற்ற மாவும் இருந்தால் இட்லியாக மாற்றலாம்.'},
 {test:/\bidli\b|இட்லி/i,
  howEn:'Use fermented rice-and-urad batter, fill idli moulds, and steam until fully cooked. Serve with vegetable sambar or chutney.',
  howTa:'புளித்த அரிசி-உளுந்து மாவை இட்லித் தட்டில் ஊற்றி முழுவதும் ஆவியில் வேகவைக்கவும். காய்கறிச் சாம்பார் அல்லது சட்னியுடன் சேர்க்கவும்.',
  whyEn:'Idli is steamed rather than pan-cooked. If there is no steamer, the same suitable batter can often become dosa instead.',
  whyTa:'இட்லி ஆவியில் வேகும்; தோசை கல்லில் சுடப்படும். இட்லித் தட்டு இல்லையெனில் ஏற்ற மாவைத் தோசையாகச் செய்யலாம்.'},
 {test:/\bpittu\b|பிட்டு/i,
  howEn:'Moisten rice flour until it forms loose crumbs. Layer it with coconut in a pittu mould and steam thoroughly. Try with sothi, dhal or a vegetable curry.',
  howTa:'அரிசிமாவைச் சிறிது நீரில் உதிரியாக்கி தேங்காயுடன் பிட்டுக் குழலில் அடுக்கவும். முழுவதும் ஆவியில் வேகவைத்து சொதி, பருப்பு அல்லது காய்கறிக் கறியுடன் வழங்கவும்.',
  whyEn:'Loose flour crumbs allow steam to pass through. Do not knead it into a heavy dough.',
  whyTa:'உதிரியான மாவுக்குள் ஆவி எளிதாகச் செல்கிறது. மிகவும் கெட்டியான மாவாகப் பிசைய வேண்டாம்.'},
 {test:/string hoppers|இடியாப்பம்/i,
  howEn:'Mix string-hopper rice flour with hot water carefully, knead into a smooth dough, press into fine strands, and steam until cooked. Serve with sothi and vegetables.',
  howTa:'இடியாப்ப அரிசிமாவை வெந்நீருடன் கவனமாகப் பிசைந்து நூல்களாகப் பிழிந்து ஆவியில் வேகவைக்கவும். சொதி, காய்கறியுடன் பரிமாறவும்.',
  whyEn:'The flour’s water balance helps the strands hold their shape. Add cooked egg, dhal or vegetables for more variety.',
  whyTa:'மாவிலுள்ள நீரின் அளவு நூல்கள் உடையாமல் இருக்க உதவும். வேகவைத்த முட்டை, பருப்பு அல்லது காய்கறியுடன் பல்வகையாகச் சாப்பிடலாம்.'},
 {test:/\bappam\b|ஆப்பம்/i,
  howEn:'Swirl prepared appam batter around a warm appam pan so the rim is thin and the centre is thicker. Cover and cook until the middle sets; serve with a gentle curry.',
  howTa:'ஆப்ப மாவைச் சூடான அப்பச்சட்டியில் சுழற்றி ஓரம் மெல்லியதாகவும் நடு சற்றுத் தடிமனாகவும் பரப்பவும். மூடி நடு வேகும் வரை சுடவும். கறியுடன் வழங்கவும்.',
  whyEn:'Covering traps steam, helping the thicker centre cook. Choose an egg, vegetable or coconut-milk topping depending on what you have.',
  whyTa:'மூடி வைத்தால் ஆவி நடுப்பகுதியை வேகவைக்கும். வீட்டில் கிடைப்பதற்கேற்ப முட்டை, காய்கறி அல்லது தேங்காய்ப்பால் சேர்க்கலாம்.'},
 {test:/\bporridge\b|கஞ்சி|கூழ்/i,
  howEn:'Mix flour with cool water first to avoid lumps, then cook gently while stirring until smooth and thoroughly cooked. Serve with a suitable side.',
  howTa:'மாவை முதலில் குளிர்ந்த நீரில் கரைத்து, பின்னர் மிதமான தீயில் கிளறியபடி கட்டியில்லாமல் முழுவதும் வேகவைக்கவும். துணை உணவுடன் வழங்கவும்.',
  whyEn:'Millet, red rice and other grains provide different flavours and textures. No single grain needs to be eaten every morning.',
  whyTa:'சிறுதானியங்கள், சிவப்பரிசி போன்றவை வெவ்வேறு சுவையும் பதமும் தருகின்றன. தினமும் ஒரே தானியக் கஞ்சி தேவையில்லை.'},
 {test:/\broti\b|ரொட்டி/i,
  howEn:'Add water to flour little by little, knead a pliable dough, shape flat rounds, and cook both sides well. Add a vegetable curry, lentils or an egg side.',
  howTa:'மாவுடன் நீரைச் சிறிது சிறிதாகச் சேர்த்து மென்மையாகப் பிசைந்து வட்டமாகத் தட்டி இருபுறமும் நன்கு வேகவைக்கவும். காய்கறிக் கறி, பருப்பு அல்லது முட்டையுடன் வழங்கவும்.',
  whyEn:'A little resting time can make dough easier to shape. Whole-grain flour provides a different texture and fibre content.',
  whyTa:'மாவைச் சிறிது நேரம் ஓய்வெடுக்க வைத்தால் தட்டுவது எளிதாகும். முழுத்தானிய மாவின் பதமும் நார்ச்சத்தும் வேறுபடும்.'},
 {test:/\bfish\b|மீன்/i,
  howEn:'Keep fish fresh and chilled until cooking. Simmer with tomatoes, tamarind and spices or a coconut-based gravy; cook the fish thoroughly and serve with vegetables.',
  howTa:'மீனைச் சமைக்கும் வரை குளிராகப் பாதுகாக்கவும். தக்காளி, புளி, மசாலா அல்லது தேங்காய்ப்பால் கறியில் முழுவதும் வேகவைத்து காய்கறியுடன் வழங்கவும்.',
  whyEn:'Fish contributes protein. If fresh fish is unavailable, use eggs, dhal or a vegetable-and-bean curry as the meal’s alternative.',
  whyTa:'மீன் புரதம் தரும். புதிய மீன் கிடைக்கவில்லை என்றால் முட்டை, பருப்பு அல்லது பயறு-காய்கறிக் கறி நல்ல மாற்றுகள்.'},
 {test:/\bchicken\b|கோழி/i,
  howEn:'Keep raw chicken separate from ready-to-eat foods. Cook the pieces fully in onion, tomato and spice gravy; add greens or another cooked vegetable side.',
  howTa:'பச்சைக் கோழியை மற்ற உணவிலிருந்து தனியாகக் கையாளவும். வெங்காயம், தக்காளி, மசாலாவில் முழுவதும் வேகவைத்து கீரை அல்லது வேறு காய்கறியுடன் வழங்கவும்.',
  whyEn:'Protein-rich chicken can be swapped for lentils, eggs or beans if those are what the family has available.',
  whyTa:'கோழி இல்லையெனில் பருப்பு, முட்டை, பயறு போன்ற புரத உணவுகளை மாற்றாகப் பயன்படுத்தலாம்.'},
 {test:/\begg\b|முட்டை/i,
  howEn:'Cook eggs thoroughly. Add to a mild tomato curry or prepare separately, then serve with vegetable curry, rice or roti.',
  howTa:'முட்டைகளை முழுவதும் வேகவைத்து மிதமான தக்காளிக் கறியில் சேர்க்கலாம். காய்கறி, சோறு அல்லது ரொட்டியுடன் வழங்கவும்.',
  whyEn:'Eggs provide protein, while vegetables add fibre, colour and flavour. You may substitute cooked beans or dhal.',
  whyTa:'முட்டை புரதம் தரும்; காய்கறி நார்ச்சத்து, நிறம், சுவை தரும். வேகவைத்த பயறு அல்லது பருப்பை மாற்றாகச் சேர்க்கலாம்.'},
 {test:/\brace\b|rice\b|சாதம்|சோறு|அரிசி|கிச்சடி/i,
  howEn:'Cook the selected rice until fully done, then prepare a separate vegetable curry, greens or dhal. Serve them together rather than relying on rice alone.',
  howTa:'தேர்ந்தெடுத்த அரிசியை முழுவதும் வேகவைத்து, காய்கறிக் கறி, கீரை அல்லது பருப்பைத் தனியாகச் செய்து சேர்த்துப் பரிமாறவும்.',
  whyEn:'Rice supplies carbohydrates. Vegetables, legumes, fish or eggs add different nutrients. If one rice variety is unavailable, choose a locally available type.',
  whyTa:'அரிசி மாவுச்சத்து தரும். காய்கறி, பருப்பு, மீன் அல்லது முட்டை பலவகைச் சத்து தருகின்றன. ஒரு அரிசி வகை இல்லையெனில் உள்ளூரில் கிடைக்கும் வகையைத் தேர்வு செய்யலாம்.'}
];
const fallback={
 howEn:'Prepare the staple or grain according to its type, cook thoroughly and serve with the listed vegetable and side dish. Adjust spices to family preference.',
 howTa:'தானியம் அல்லது மாவை அதன் வகைக்கேற்ப தயார் செய்து முழுவதும் வேகவைக்கவும். கூறிய காய்கறி மற்றும் துணை உணவுடன் சேர்த்து, குடும்பத்தின் சுவைக்கு ஏற்ற மசாலாவைப் பயன்படுத்தவும்.',
 whyEn:'A rotating main course with vegetables, legumes and other foods provides variety and reduces repetition throughout the month.',
 whyTa:'காய்கறி, பருப்பு, பலவகை உணவுகளுடன் பிரதான உணவை மாற்றி மாற்றிச் செய்தால் மாதம் முழுவதும் ஒரே உணவு திரும்பத் திரும்ப வராது.'
};
function sentence(tag,txt){const p=document.createElement('p');p.lang=tag;p.textContent=txt;return p}
function heading(txt){const h=document.createElement('strong');h.textContent=txt;return h}
function today(){return root.querySelector('#hcmDate')?.value||new Date().toISOString().slice(0,10)}
function overrideName(i,original){
 const x=swaps[today()+'|'+i];return x?x:original;
}
function addLesson(card,i){
 if(card.dataset.hcKitchenTeaching)return;
 card.dataset.hcKitchenTeaching='1';
 const nameNode=card.querySelector('.r small');if(!nameNode)return;
 const original=nameNode.textContent||'';
 const override=overrideName(i,original);
 if(override!==original)nameNode.textContent=override;
 const names=[original,override].join(' ');
 const guide=lessons.find(x=>x.test.test(names===original+' '+original?original:override))||fallback;
 const outer=document.createElement('details');outer.className='hc-kitchen-lesson';
 const summary=document.createElement('summary');summary.textContent='Cooking, swaps & rice / செய்முறை, மாற்று, அரிசி';
 outer.append(summary);
 const body=document.createElement('div');body.className='hc-kitchen-lesson-inner';
 body.append(heading('How to prepare / எப்படி சமைப்பது?'),sentence('en',guide.howEn),sentence('ta',guide.howTa),
             heading('Why it works / ஏன் இப்படிச் செய்கிறோம்?'),sentence('en',guide.whyEn),sentence('ta',guide.whyTa));
 const pair=document.createElement('p');pair.className='hc-kitchen-tip';pair.textContent='Pairing / துணை உணவு: '+(card.querySelector(':scope > .sub')?.textContent||'Vegetables · காய்கறி');body.append(pair);
 const isRice=i>0&&(/rice|khichdi|சாதம்|சோறு|அரிசி|கிச்சடி/i).test(override);
 if(isRice){
  const label=document.createElement('label');label.textContent='Which rice? / எந்த அரிசி?';
  const sel=document.createElement('select');sel.setAttribute('aria-label','Rice variety / அரிசி வகை');
  const key=today()+'|'+i;
  riceTypes.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.en+' / '+x.ta;sel.append(o)});
  sel.value=riceTypes.some(x=>x.id===rice[key])?rice[key]:'red';
  const info=document.createElement('div');info.className='hc-kitchen-rice-info';
  function update(){const x=riceTypes.find(x=>x.id===sel.value)||riceTypes[0];info.replaceChildren(sentence('en',x.enInfo),sentence('ta',x.taInfo))}
  sel.addEventListener('change',()=>{rice[key]=sel.value;save(KEY,rice);update()});update();body.append(label,sel,info);
  body.append(sentence('en','The blood-sugar effect depends on the rice variety, how it is prepared and the rest of the meal. No rice guarantees lower blood sugar.'));
  body.append(sentence('ta','இரத்தச் சர்க்கரையின் மாற்றம் அரிசி வகை, சமைக்கும் முறை, மற்ற உணவுகள் ஆகியவற்றைப் பொறுத்தது. எந்த அரிசியும் சர்க்கரையைக் குறைக்கும் என்று உறுதியில்லை.'));
 }
 const isDosa=/dosa|தோசை/i.test(override),isIdli=/idli|இட்லி/i.test(override);
 if(i===0&&(isDosa||isIdli)){
  const b=document.createElement('button');b.type='button';b.className='hc-kitchen-swap';
  b.textContent=isDosa?'Try idli instead / இட்லியாக மாற்று':'Try dosa instead / தோசையாக மாற்று';
  b.addEventListener('click',()=>{
   const text=isDosa?'Idli / இட்லி':'Dosa / தோசை';
   swaps[today()+'|'+i]=text;save(SWAP,swaps);
   nameNode.textContent=text;
   const next=lessons.find(x=>x.test.test(text))||fallback;
   body.querySelectorAll('[lang]').forEach(()=>{});
   const paragraphs=Array.from(body.children).filter(x=>x.tagName==='P'&&!x.classList.contains('hc-kitchen-tip'));
   if(paragraphs.length>=4){paragraphs[0].textContent=next.howEn;paragraphs[1].textContent=next.howTa;paragraphs[2].textContent=next.whyEn;paragraphs[3].textContent=next.whyTa}
   b.textContent=isDosa?'Dosa again / தோசை மீண்டும்':'Idli again / இட்லி மீண்டும்';
   b.onclick=()=>{swaps[today()+'|'+i]=original;save(SWAP,swaps);nameNode.textContent=original;outer.open=false;outer.remove();card.dataset.hcKitchenTeaching='';addLesson(card,i)};
  });
  body.append(b);
 }
 const note=document.createElement('p');note.className='hc-kitchen-hint';note.textContent='Ingredient unavailable? Tap “5 choices” above to change this meal. Menu suggestions rotate by date. / பொருள் இல்லையா? மேலே உள்ள “5 choices” மூலம் வேறு உணவைத் தேர்வு செய்யலாம். தேதிக்கேற்ப உணவுகள் மாறும்.';
 body.append(note);outer.append(body);card.append(outer);
}
const css=document.createElement('style');css.textContent=[
'#hcMonthlyKitchen .hc-kitchen-lesson{border:1px solid #4c5b62;border-radius:10px;padding:0;margin-top:9px;background:#14222a}',
'#hcMonthlyKitchen .hc-kitchen-lesson>summary{min-height:43px;padding:11px;color:#fff;font-size:12px;font-weight:600;list-style:none}',
'#hcMonthlyKitchen .hc-kitchen-lesson summary::-webkit-details-marker{display:none}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner{border-top:1px solid #46545b;padding:12px}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner strong{display:block;font-size:13px;margin:8px 0}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner p{font-size:12px;color:#dbe6eb;line-height:1.7;margin:5px 0 11px}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner p[lang=ta]{line-height:1.95}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner label{display:block;margin:10px 0 6px;font-weight:650}',
'#hcMonthlyKitchen .hc-kitchen-lesson-inner select{display:block;width:100%;max-width:100%;white-space:normal}',
'#hcMonthlyKitchen .hc-kitchen-swap{min-height:43px;background:#213a48;color:#fff;padding:10px;border:1px solid #91aab4;border-radius:9px;font-size:12px}',
'#hcMonthlyKitchen .hc-kitchen-hint{border-top:1px solid #4d626b;padding-top:9px}',
'#hcMonthlyKitchen .hc-kitchen-tip{color:#f0dcc1!important}'
].join('\n');document.head.append(css);
function refresh(){
 const cards=[...root.querySelectorAll('#hcmMeals > .meal')];
 cards.forEach((card,i)=>addLesson(card,i));
}
root.addEventListener('click',e=>{
 const btn=e.target.closest('.option');if(!btn)return;
 const card=btn.closest('.meal'),idx=[...root.querySelectorAll('#hcmMeals > .meal')].indexOf(card);
 if(idx<0)return;
 delete swaps[today()+'|'+idx];save(SWAP,swaps);
},true);
const observer=new MutationObserver(()=>refresh());
observer.observe(root,{childList:true,subtree:true});
refresh();
})();