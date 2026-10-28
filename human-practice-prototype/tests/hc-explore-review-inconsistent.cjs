/* HeartClear Explore: never guess from contradictory clues; show one reversible suggestion.
   Run: node --test human-practice-prototype/tests/hc-explore-review-inconsistent.cjs */
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const core=require('../hc-explore-core.js');
const {createEngine}=require('../hc-mind-game.js');
const catalog=require('../hc-mind-catalog.js');
const engine=createEngine({baseBank:core.bank,baseQuestions:core.questions,publicFigures:catalog.items,countryLabels:catalog.countryLabels});
test('a conflicting non-category answer suggests a reversible correction without inventing a guess',()=>{
 const answers=[{id:'animal',answer:'yes'},{id:'bark',answer:'yes'},{id:'water',answer:'yes'}];
 assert.equal(engine.candidates(answers).length,0);
 const step=engine.next(answers);
 assert.equal(step.kind,'unknown');
 assert.equal(step.reviewId,'water');
 assert.match(step.message,/nothing has been changed/);
 assert.deepEqual(answers.map(x=>x.answer),['yes','yes','yes']);
 assert.ok(engine.candidates([{id:'animal',answer:'yes'},{id:'bark',answer:'yes'},{id:'water',answer:'no'}]).length>0);
});
test('contradictory primary categories still refuse to guess',()=>{
 const step=engine.next([{id:'person',answer:'yes'},{id:'plant',answer:'yes'}]);
 assert.equal(step.kind,'unknown');
 assert.equal(step.reviewId,undefined);
});
test('a rejected candidate is never reintroduced by the suggestion',()=>{
 const h=[{id:'animal',answer:'yes'},{id:'bark',answer:'yes'},{id:'water',answer:'yes'},{id:'identity:dog',answer:'no'}];
 assert.equal(engine.next(h).kind,'unknown');
 assert.equal(engine.candidates(h.filter(x=>x.id!=='water')).some(x=>x.item.id==='dog'),false);
});
test('the existing review control exposes the suggested question without collecting new data',()=>{
 const ui=fs.readFileSync(path.resolve(__dirname,'../hc-explore-ui.js'),'utf8');
 new vm.Script(ui);
 assert.match(ui,/Review this answer:/);
 assert.match(ui,/Suggested correction/);
 assert.match(ui,/step\?\.reviewId\?' open':'/);
 assert.match(ui,/data-review-index/);
 assert.match(ui,/const gameLimit=core\.gameQuestionLimit\|\|20/);
 assert.doesNotMatch(ui,/localStorage|sessionStorage|indexedDB|fetch\(/);
});
test('sourced engine remains bounded at twenty questions',()=>{
 assert.equal(engine.maxQuestions,20);
});
