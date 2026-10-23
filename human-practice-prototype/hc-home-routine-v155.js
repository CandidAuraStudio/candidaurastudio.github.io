/* HeartClear v155 — keep meditation and yoga above a compact Quran and full Kitchen. */
(function(){
'use strict';
const home=document.getElementById('home'),greeting=home&&home.querySelector('.hc-home-greeting-row'),quran=document.getElementById('hcQuranFirst');
if(!home||!greeting||!quran||document.getElementById('hcHomeRoutineV155'))return;
const byId=id=>document.getElementById(id);
const style=document.createElement('style');style.id='hcHomeRoutineStyleV155';
style.textContent=[
'#home .hc-home-greeting-row{margin-bottom:8px}',
'#home #hcHomeRoutineV155,#home #hcHomeKitchenQuickV155{background:#0b202c;color:#f5f7f7;border:1px solid rgba(221,235,240,.24);border-radius:17px;padding:13px;margin:9px 0}',
'#home #hcHomeRoutineV155 .hcr-small,#home #hcHomeKitchenQuickV155 .hcr-small{font-size:11px;letter-spacing:.04em;color:#dcbf87;font-weight:700}',
'#home #hcHomeRoutineV155 h2{font-size:21px;margin:6px 0 3px;line-height:1.25}',
'#home #hcHomeRoutineV155 .hcr-sub{font-size:12px;line-height:1.45;color:#b7c9d1;margin:0 0 10px}',
'#home .hcr-actions{display:grid;grid-template-columns:1.45fr 1fr;gap:7px}',
'#home .hcr-actions button,#home #hcHomeKitchenQuickV155 button{font:inherit;cursor:pointer;min-height:44px;border-radius:10px;padding:9px;font-size:13px}',
'#home #hcrBegin{background:#f6f6f2;color:#0b2431;border:0;font-weight:750}',
'#home #hcrYoga{background:#193541;color:white;border:1px solid #587482;font-weight:650}',
'#home #hcrYogaSteps[hidden],#home #hcrDosaSteps[hidden]{display:none!important}',
'#home #hcrYogaSteps,#home #hcrDosaSteps{border:1px solid #49636f;background:#132f3c;border-radius:10px;padding:9px 11px;margin-top:9px;font-size:12px;line-height:1.65;color:#e3edf0}',
'#home #hcrYogaSteps p,#home #hcrDosaSteps p{margin:6px 0}',
'#home .hcr-extra{margin-top:9px;border-top:1px solid #455762;padding-top:6px}',
'#home .hcr-extra summary{cursor:pointer;color:#c7d5db;font-size:12px;min-height:30px;padding:7px 0}',
'#home .hcr-extra-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}',
'#home .hcr-extra-row button{min-width:0;border:1px solid #4e6c7b;border-radius:8px;color:white;background:#14303e;font:inherit;min-height:35px;font-size:11px;padding:5px 1px}',
'#home #hcHomeKitchenQuickV155{background:#111f27;padding:10px 13px;display:grid;gap:6px}',
'#home #hcHomeKitchenQuickV155 strong{font-size:15px}',
'#home #hcHomeKitchenQuickV155 .hcr-sub{font-size:12px;color:#c8d5db;line-height:1.4}',
'#home .hcr-food-actions{display:flex;gap:7px}',
'#home #hcHomeKitchenQuickV155 button{flex:1;min-width:0;min-height:39px;font-size:12px;border:1px solid #647780;background:#213a46;color:white;padding:7px}',
'#home #hcHomeKitchenQuickV155 #hcrDosa{background:#303438}',
'#home #hcQuranFirst{margin:10px 0;padding:10px 11px;border-radius:15px}',
'#home #hcQuranFirst .hcq-kicker{font-size:10px}',
'#home #hcQuranFirst .hcq-head small,#home #hcQuranFirst #hcqCounter{font-size:10px}',
'#home #hcQuranFirst .hcq-current{margin:5px 0 8px}',
'#home #hcQuranFirst .hcq-current>button{width:32px;height:32px;border-radius:8px;font-size:20px}',
'#home #hcQuranFirst #hcqName{font-size:16px}',
'#home #hcQuranFirst #hcqMeta{font-size:10px;margin-top:2px}',
'#home #hcQuranFirst .hcq-langs{gap:5px}',
'#home #hcQuranFirst .hcq-langs button{min-height:33px;border-radius:8px;font-size:11px}',
'#home #hcQuranFirst .hcq-actions{gap:6px;margin:7px 0}',
'#home #hcQuranFirst #hcqPlay,#home #hcQuranFirst #hcqRead{min-height:40px;border-radius:9px;font-size:12px}',
'#home #hcQuranFirst #hcqRead{width:58px}',
'#home #hcQuranFirst .hcq-bottom summary{padding:5px 0;min-height:29px;font-size:11px}',
'#home #hcQuranFirst .hcq-live{margin:5px 0;padding:8px}',
'#home #hcQuranFirst .hcq-live:not(.hcq-verse-open) #hcqVerse{display:none}',
'#home #hcQuranFirst #hcqVerse{font-size:13px;line-height:1.65;max-height:210px}',
'#home #hcQuranFirst .hcq-livehead{gap:5px;flex-wrap:wrap}',
'#home #hcQuranFirst .hcr-verse-btn{margin-left:auto;min-height:30px;border-radius:7px;border:1px solid #566f79;background:#173946;color:white;font-size:11px;padding:5px 8px}',
'#home :is(#hcrBegin,#hcrYoga,#hcrMeals,#hcrDosa,.hcr-verse-btn):focus-visible{outline:2px solid white;outline-offset:3px}',
'@media(max-width:349px){#home .hcr-actions{grid-template-columns:1.4fr 1fr}#home #hcHomeRoutineV155 h2{font-size:19px}}'
].join('\n');document.head.appendChild(style);
const focus=document.createElement('section');focus.id='hcHomeRoutineV155';focus.setAttribute('aria-label','Meditation and gentle yoga');
focus.innerHTML='<span id="hcrPeriod" class="hcr-small">YOUR DAY · MEDITATION</span><h2 id="hcrTitle">Evening Release</h2><p id="hcrSubtitle" class="hcr-sub">A comfortable pause.</p>'+
 '<div class="hcr-actions"><button id="hcrBegin" type="button">▶ <span id="hcrBeginText">Begin meditation</span></button><button id="hcrYoga" type="button" aria-expanded="false">Yoga · Movement</button></div>'+
 '<div id="hcrYogaSteps" hidden><b>Gentle yoga · a few minutes</b><p>From a comfortable seated or standing position, gently move your shoulders, wrists and arms. Avoid forcing a stretch. Keep breathing naturally and stop if it hurts.</p><p>This is an original written guide. A Sandy Yoga audio recording has not been connected yet.</p></div>'+
 '<details class="hcr-extra"><summary>Other meditation times</summary><div class="hcr-extra-row"><button type="button" data-time="wake">Morning</button><button type="button" data-time="noon">Midday</button><button type="button" data-time="evening">Evening</button><button type="button" data-time="sleep">Night</button></div></details>';
greeting.insertAdjacentElement('afterend',focus);
const kitchen=document.createElement('section');kitchen.id='hcHomeKitchenQuickV155';kitchen.setAttribute('aria-label','Tamil family cooking');
kitchen.innerHTML='<span class="hcr-small">KITCHEN · பாரம்பரிய சமையல்</span><strong>Today’s home cooking</strong><div id="hcrMealName" class="hcr-sub">Breakfast · Lunch · Dinner</div>'+
 '<div class="hcr-food-actions"><button type="button" id="hcrMeals">Today’s meals ›</button><button id="hcrDosa" type="button" aria-expanded="false">தோசை · Dosa ›</button></div>'+
 '<div id="hcrDosaSteps" hidden><b>தோசை · Dosa</b><p>புளித்த தோசை மாவை சூடான தோசைக்கல்லில் மெல்லியதாகப் பரப்பி முழுவதும் வேகவைத்து சட்னி அல்லது சாம்பாருடன் பரிமாறவும்.</p><p>Spread prepared fermented dosa batter on a warm pan. Cook thoroughly and serve with chutney or sambar. Regional variations differ.</p></div>';
focus.insertAdjacentElement('afterend',kitchen);
kitchen.insertAdjacentElement('afterend',quran);
const periods={
 wake:['MORNING','Deep Wake Up','Begin morning meditation','Begin the day with gentle awareness.'],
 noon:['MIDDAY','Noon Reset','Begin midday meditation','A quiet pause in your afternoon.'],
 evening:['EVENING','Evening Release','Begin evening meditation','Settle after the day.'],
 sleep:['NIGHT','Deep Sleep','Begin night meditation','A quiet moment before rest.']
};
function timeKey(){const h=new Date().getHours();return h>=5&&h<11?'wake':h>=11&&h<17?'noon':h>=17&&h<21?'evening':'sleep';}
let activeKey=timeKey();
function update(){
 activeKey=timeKey();const p=periods[activeKey];
 byId('hcrPeriod').textContent=p[0]+' · MEDITATION & YOGA';
 byId('hcrTitle').textContent=p[1];byId('hcrBeginText').textContent=p[2];byId('hcrSubtitle').textContent=p[3];
 const m=activeKey==='wake'?0:activeKey==='noon'?1:2;
 const label=['Breakfast','Lunch','Dinner'][m];
 const available=byId('hcMonthlyKitchen')?.querySelectorAll('#hcmMeals > .meal')[m]?.querySelector('small')?.textContent;
 byId('hcrMealName').textContent=label+' · '+(available||'Choose a traditional recipe');
}
function play(key){
 if(typeof window.hcHomePlayGuided==='function')window.hcHomePlayGuided(key);
 else if(typeof hcStartExistingGuidedSession==='function')hcStartExistingGuidedSession(key);
}
byId('hcrBegin').addEventListener('click',()=>play(activeKey));
focus.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>play(b.dataset.time)));
byId('hcrYoga').addEventListener('click',()=>{
 const p=byId('hcrYogaSteps'),v=p.hidden;p.hidden=!v;byId('hcrYoga').setAttribute('aria-expanded',String(v));
});
byId('hcrMeals').addEventListener('click',()=>{
 const target=byId('hcMonthlyKitchen')||byId('hcFamilyKitchen');
 if(target){target.hidden=false;target.scrollIntoView({behavior:'auto',block:'start'});}
});
byId('hcrDosa').addEventListener('click',()=>{
 const p=byId('hcrDosaSteps'),v=p.hidden;p.hidden=!v;byId('hcrDosa').setAttribute('aria-expanded',String(v));
});
const live=byId('hcqLive');
if(live){
 const b=document.createElement('button');b.id='hcrVerseToggle';b.type='button';b.className='hcr-verse-btn';
 b.textContent='Show verse';b.setAttribute('aria-controls','hcqVerse');b.setAttribute('aria-expanded','false');
 live.querySelector('.hcq-livehead')?.appendChild(b);
 b.addEventListener('click',()=>{const v=live.classList.toggle('hcq-verse-open');b.textContent=v?'Hide verse':'Show verse';b.setAttribute('aria-expanded',String(v));});
}
update();window.addEventListener('focus',update);document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
setInterval(update,120000);
})();