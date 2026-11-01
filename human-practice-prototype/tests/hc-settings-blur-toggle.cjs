/* HeartClear v288: background blur preference, without touching player or saved progress.
   Run: node human-practice-prototype/tests/hc-settings-blur-toggle.cjs */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
assert.equal((html.match(/id="hcBlurSwitch"/g)||[]).length,1,'Exactly one blur switch');
assert.match(html,/role="switch" aria-checked="true" aria-label="Toggle background blur"/);
assert.match(html,/body\.hc-no-blur \*,body\.hc-no-blur \*::before,body\.hc-no-blur \*::after/);
assert.match(html,/backdrop-filter:none!important/);
assert.match(html,/hcApplyBlurPreference\(\);\s*updateOfflineStorageText\(\)/,'Restores preference when settings render');
assert.match(html,/sw\.js\?v=292/,'Preserve service-worker wiring for release-manager integration');
const from=html.indexOf('function hcApplyBlurPreference(){');
const to=html.indexOf('async function toggleWakeLock(){',from);
assert(from>0&&to>from,'Blur behavior must be kept as one isolated function block');
const js=html.slice(from,to);
function exercise(value){
  const present=new Set(),data=new Map();
  if(value!==null)data.set('heartclearBlur',value);
  const css={contains:key=>present.has(key),toggle:(key,active)=>{if(active)present.add(key);else present.delete(key)}};
  const control={classList:{toggle:()=>{}},setAttribute:(k,v)=>{if(k==='aria-checked')control.checked=v}};
  const context={document:{body:{classList:css},getElementById:key=>key==='hcBlurSwitch'?control:null},
    localStorage:{getItem:key=>data.has(key)?data.get(key):null,setItem:(key,v)=>data.set(key,v)}};
  vm.runInNewContext(js+';hcApplyBlurPreference();',context);
  return {context,control,data,present};
}
for(const [pref,isBlurred] of [[null,true],['1',true],['0',false]]){
  const caseData=exercise(pref);
  assert.equal(caseData.present.has('hc-no-blur'),!isBlurred);
  assert.equal(caseData.control.checked,String(isBlurred));
  vm.runInNewContext('hcToggleBlurEffects();',caseData.context);
  assert.equal(caseData.present.has('hc-no-blur'),isBlurred,'Toggle reverses preference');
  assert.equal(caseData.data.get('heartclearBlur'),isBlurred?'0':'1','Preference persists');
}
console.log('PASS: HeartClear background blur preference retains legacy key and switches accessibly.');
