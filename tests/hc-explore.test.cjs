const {test}=require('node:test');
const assert=require('node:assert/strict');
const core=require('../human-practice-prototype/hc-explore-core.js');
test('adaptive game includes community subjects and a 25-question ceiling',()=>{
 assert.equal(core.gameQuestionLimit,25);
 assert.equal(core.gameVersion,'156');
 assert.ok(core.bank.length>=400);
});
test('representative supported thoughts can be reached even after tentative wrong guesses',()=>{
 const ids=['grandfather','jackson','dog','lotus','tea','rice','ocean','forest','book','fear','memory','neem',
  'x156-person-jeffrey-epstein','x156-food-dosa','x156-place-malta'];
 for(const id of ids){
  const item=core.bank.find(x=>x.id===id);assert.ok(item,id);
  const history=[];let found=false,questions=0;
  for(let n=0;n<85;n++){
   const step=core.gameStep(history);
   if(step.kind==='question'){
    questions++;assert.ok(questions<=25,id);
    history.push({id:step.id,answer:item.unknownTags?.includes(step.id)?'unsure':item.tags.includes(step.id)?'yes':'no'});
   }else if(step.kind==='guess'){
    if(step.item.id===id){found=true;break;}
    history.push({id:'reject:'+step.item.id,answer:'no'});
   }else break;
  }
  assert.ok(found,'Game cannot reach '+item.name);
 }
});
test('unsure does not exclude all choices and stops at 25 questions',()=>{
 const history=[];let step;
 do{step=core.gameStep(history);if(step.kind==='question')history.push({id:step.id,answer:'unsure'});}while(step.kind==='question');
 assert.equal(step.kind,'unknown');
 assert.equal(history.length,25);
});
test('one incorrect category answer is not an irreversible elimination',()=>{
 const step=core.gameStep([{id:'person',answer:'no'}]);
 assert.notEqual(step.kind,'unknown');
});
test('learning is opt-in, device-only and erasable',()=>{
 const data=new Map(),previous=global.localStorage;
 global.localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
 try{
  const saved=core.teachLocal('Kothu roti','food',[{id:'food',answer:'yes'},{id:'grain',answer:'yes'}]);
  assert.ok(saved.ok);
  assert.ok(core.bank.some(x=>x.name==='Kothu roti'));
  assert.equal(core.teachLocal('Kothu roti','food',[]).ok,false);
  assert.ok(data.has('hcExploreTaughtV1'));
  assert.ok(core.forgetLocal());
  assert.ok(!core.bank.some(x=>x.name==='Kothu roti'));
  assert.ok(!data.has('hcExploreTaughtV1'));
 }finally{if(previous===undefined)delete global.localStorage;else global.localStorage=previous}
});
test('voice accepts only unambiguous complete answers',()=>{
 for(const [value,expected] of [['Yes.','yes'],['no','no'],["I am not sure",'unsure'],['ஆம்','yes'],['இல்லை','no'],['தெரியவில்லை','unsure']])assert.equal(core.parseAnswer(value),expected);
 for(const value of ['yes no','yesterday','no pain but yes fever','not yes','yes I cannot pee','',null])assert.equal(core.parseAnswer(value),null);
});
test('health checks emergency symptoms before age and stops for yes or unsure',()=>{
 assert.equal(core.healthStep([]).id,'emergency');
 assert.equal(core.healthStep([{id:'emergency',answer:'yes'}]).level,'emergency');
 assert.equal(core.healthStep([{id:'emergency',answer:'unsure'}]).level,'urgent');
});
test('emergency signs are asked as three short questions before other screening',()=>{
 const h=[{id:'emergency',answer:'no'}];
 assert.equal(core.healthStep(h).id,'emergencyChest');
 h.push({id:'emergencyChest',answer:'no'});
 assert.equal(core.healthStep(h).id,'emergencyStroke');
 h.push({id:'emergencyStroke',answer:'no'});
 assert.equal(core.healthStep(h).id,'adult');
 for(const id of ['emergencyChest','emergencyStroke']){
  assert.equal(core.healthStep([{id:'emergency',answer:'no'},{id,answer:'yes'}]).level,'emergency');
  assert.equal(core.healthStep([{id:'emergency',answer:'no'},{id,answer:'unsure'}]).level,'urgent');
 }
});
test('urinary retention and sudden severe testicular pain exit immediately',()=>{
 for(const id of ['retention','testicle']){
  const h=[{id:'emergency',answer:'no'},{id:'emergencyChest',answer:'no'},{id:'emergencyStroke',answer:'no'},{id:'adult',answer:'yes'},{id:'urinary',answer:'yes'}];
  if(id==='testicle')h.push({id:'retention',answer:'no'});
  h.push({id,answer:'yes'});
  assert.equal(core.healthStep(h).level,id==='testicle'?'emergency':'urgent');
 }
});
test('no completed route gives an all-clear or diagnosis',()=>{
 let paths=0;
 function walk(history){
  const s=core.healthStep(history);
  if(s.kind==='result'){assert.ok(['emergency','urgent','advice'].includes(s.level));assert.ok(!/you have (a |an )|safe to work|you are fine/i.test(s.message));paths++;return;}
  assert.ok(history.length<15);
  for(const answer of ['yes','no','unsure'])walk([...history,{id:s.id,answer}]);
 }
 walk([]);assert.ok(paths>20);
});
test('health answers stay separate from locally taught game items',()=>{
 const source=require('node:fs').readFileSync(require.resolve('../human-practice-prototype/hc-explore-core.js'),'utf8');
 assert.match(source,/hcExploreTaughtV1/);
 assert.doesNotMatch(source,/hcHealthHistory|hcHealthAnswers/);
});
