const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createEngine,fromFigure}=require('../human-practice-prototype/hc-mind-game.js');
const core=require('../human-practice-prototype/hc-explore-core.js');
const fixture=(id,name,changes={})=>({id,name,source:'https://example.test/'+id,sex:'male',birthYear:1953,deathYear:2019,citizenships:['Q30'],occupations:[{id:'test-financier',label:'financier'}],...changes});
const figures=[fixture('alpha','Person Alpha'),fixture('beta','Person Beta',{birthYear:1938,deathYear:2021}),fixture('singer','Singer Example',{birthYear:1958,deathYear:2009,occupations:[{id:'test-singer',label:'singer'}]})];
const make=records=>createEngine({baseBank:core.bank,baseQuestions:core.questions,publicFigures:records||figures,countryLabels:{Q30:'United States'}});
test('missing occupation or citizenship is unknown, not a factual negative',()=>{
 const e=make([fixture('sparse','Sparse Person',{occupations:[],citizenships:[]})]);
 assert.equal(e.truth(e.bank.find(x=>x.id==='sparse'),'occupation:music'),null);
 assert.equal(e.truth(e.bank.find(x=>x.id==='sparse'),'citizenship:Q30'),null);
});
test('an unlisted citizenship remains unknown even when another citizenship is recorded',()=>{
 const e=make();const person=e.bank.find(x=>x.id==='alpha');
 assert.equal(e.truth(person,'citizenship:Q30'),true);
 assert.equal(e.truth(person,'citizenship:Q145'),null);
});
test('role questions do not claim professional sport or classify musicians as sport',()=>{
 const e=make([fixture('piano','Piano Player',{occupations:[{label:'piano player'}]})]);
 assert.equal(e.truth(e.bank.find(x=>x.id==='piano'),'occupation:sport'),null);
 for(const id of ['sport','football','cricket','tennis'])assert.ok(!/professionally|professional or Olympic/i.test(e.questions.find(q=>q.id==='occupation:'+id).text));
 assert.match(e.questions.find(q=>q.id==='occupation:film').text,/produc/i);
});
test('date follow-ups distinguish eras without repeating logically settled thresholds',()=>{
 const e=make();assert.ok(e.questions.some(q=>q.id==='diedBefore:2010'));
 const h=[{id:'person',answer:'yes'},{id:'public',answer:'yes'},{id:'bornBefore:1960',answer:'yes'}];
 const forbidden=new Set(['bornBefore:1980','bornBefore:2000']);let s=e.next(h);
 while(s.kind==='question'){assert.ok(!forbidden.has(s.id));h.push({id:s.id,answer:'unsure'});s=e.next(h);}
});
test('no guess contradicts any definite answered fact',()=>{
 const e=make();
 for(const target of e.bank){
  let history=[],step=e.next(history);
  while(step.kind==='question'){
   const value=e.truth(target,step.id);history.push({id:step.id,answer:value===null?'unsure':value?'yes':'no'});
   step=e.next(history);assert.ok(history.length<=20);
  }
  if(step.kind==='guess')for(const h of history){const v=e.truth(step.item,h.id);if(v!==null&&h.answer!=='unsure')assert.equal(v,h.answer==='yes',target.name+' / '+h.id);}
 }
});
test('identical factual records are ambiguous, never arbitrarily the first name',()=>{
 const e=make([fixture('one','One'),fixture('two','Two')]);let h=[],s=e.next(h);
 while(s.kind==='question'){let v=e.truth(e.bank.find(x=>x.id==='one'),s.id);h.push({id:s.id,answer:v===null?'unsure':v?'yes':'no'});s=e.next(h);}
 assert.notEqual(s.kind,'guess');assert.ok(['ambiguous','unknown'].includes(s.kind));
});
test('a rejected identity never reappears using the UI identity prefix',()=>{
 const e=make();const h=[{id:'person',answer:'yes'},{id:'public',answer:'yes'},{id:'identity:alpha',answer:'no'}];
 assert.ok(!e.candidates(h).some(x=>x.item.id==='alpha'));
});
test('rejection prefix from old drafts is also respected',()=>{
 assert.ok(!make().candidates([{id:'reject:alpha',answer:'no'}]).some(x=>x.item.id==='alpha'));
});
test('no personal-role questions are asked about a public figure',()=>{
 const e=make();let h=[{id:'person',answer:'yes'},{id:'public',answer:'yes'}],s=e.next(h);
 const forbidden=['family','older','grand','parent','sibling','child','partner','work','teach'];
 while(s.kind==='question'){assert.ok(!forbidden.includes(s.id));h.push({id:s.id,answer:'unsure'});s=e.next(h);}
 assert.ok(h.length<=20);
});
test('unsure and contradictory categories do not produce a confident name',()=>{
 const e=make();let h=[],s=e.next(h);
 while(s.kind==='question'){h.push({id:s.id,answer:'unsure'});s=e.next(h);assert.ok(h.length<=20);}
 assert.equal(s.kind,'unknown');
 assert.equal(e.next([{id:'person',answer:'yes'},{id:'animal',answer:'yes'}]).kind,'unknown');
});
test('named guesses include supporting facts and provenance, no percentage claim',()=>{
 const e=make(),target=e.bank.find(x=>x.id==='alpha');let h=[],s=e.next(h);
 while(s.kind==='question'){const v=e.truth(target,s.id);h.push({id:s.id,answer:v===null?'unsure':v?'yes':'no'});s=e.next(h);}
 assert.equal(s.kind,'guess');assert.equal(s.item.id,'alpha');assert.ok(s.evidence.length>=3);assert.equal(s.source,target.source);assert.ok(!/%/.test(s.message));
});
test('sourced real regressions distinguish Jeffrey Epstein from Michael Jackson',()=>{
 const catalog=require('../human-practice-prototype/hc-mind-catalog.js');
 const e=createEngine({baseBank:core.bank,baseQuestions:core.questions,publicFigures:catalog.items,countryLabels:catalog.countryLabels});
 assert.ok(catalog.items.length>=100);
 for(const item of catalog.items){assert.ok(Number.isInteger(item.revision));assert.match(item.source,/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/);}
 for(const name of ['Jeffrey Epstein','Michael Jackson']){
  const target=e.bank.find(x=>x.name===name);assert.ok(target,name);let h=[],s=e.next(h);
  while(s.kind==='question'){const value=e.truth(target,s.id);h.push({id:s.id,answer:value===null?'unsure':value?'yes':'no'});s=e.next(h);assert.ok(h.length<=20);}
  assert.equal(s.kind,'guess',name);assert.equal(s.item.id,target.id,name);
 }
});
