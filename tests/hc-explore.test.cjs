const {test}=require('node:test');
const assert=require('node:assert/strict');
const core=require('../human-practice-prototype/hc-explore-core.js');
test('every supported thought is reachable within twenty questions',()=>{
 for(const item of core.bank){
  const history=[];let step=core.gameStep(history);
  while(step.kind==='question'){
   history.push({id:step.id,answer:item.tags.includes(step.id)?'yes':'no'});
   step=core.gameStep(history);
   assert.ok(history.length<=20,item.name);
  }
  assert.equal(step.kind,'guess',item.name);
  assert.equal(step.item.id,item.id);
 }
});
test('unsure does not eliminate candidates and stops at twenty',()=>{
 const history=[];let step;
 do {step=core.gameStep(history);if(step.kind==='question')history.push({id:step.id,answer:'unsure'});}while(step.kind==='question');
 assert.equal(step.kind,'unknown');assert.equal(history.length,20);
});
test('contradictory answers cannot return a certain guess',()=>{
 assert.equal(core.gameStep([{id:'person',answer:'yes'},{id:'plant',answer:'yes'}]).kind,'unknown');
});
test('a generic friend can be a woman without being eliminated',()=>{
 const h=[{id:'person',answer:'yes'},{id:'female',answer:'yes'},{id:'family',answer:'no'},{id:'public',answer:'no'},{id:'teach',answer:'no'},{id:'work',answer:'no'},{id:'partner',answer:'no'}];
 assert.equal(core.gameStep(h).kind,'guess');assert.equal(core.gameStep(h).item.id,'friend');
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
test('sensitive answers are not persisted by the core',()=>{
 const fs=require('node:fs');const source=fs.readFileSync(require.resolve('../human-practice-prototype/hc-explore-core.js'),'utf8');
 assert.ok(!/localStorage|sessionStorage|fetch\(|indexedDB/.test(source));
});
