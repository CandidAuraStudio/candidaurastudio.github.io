/* HeartClear minimized Google Drive player regression — no network/media requests.
 * Run: node human-practice-prototype/tests/hc-drive-minimize-v282.cjs
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'hc-playback-one-tap-v174.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
new vm.Script(source,{filename:'hc-playback-one-tap-v174.js'});
assert.match(source,/hc-ot-collapsed iframe\{position:relative/);
assert.doesNotMatch(source,/hc-ot-collapsed iframe\{position:absolute!important;width:1px/);
assert.match(source,/hc-ot-resume/);
assert.match(source,/heartclearDriveLastOpenV1/);
assert.match(html,/hc-playback-one-tap-v174\.js\?v=284/);
assert.match(html,/register\('\.\/sw\.js\?v=287'\)/);
assert.match(sw,/const APP_CACHE='heartclear-v288'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-playback-one-tap-v174\.js\?v=284/);
const memory=new Map();
function launch(){
 const els=new Map();
 function element(id){
  const tokens=new Set(),attrs=new Map(),events={};
  const result={id,hidden:false,textContent:'',title:'',attrs,events,
   classList:{add:k=>tokens.add(k),remove:k=>tokens.delete(k),contains:k=>tokens.has(k),toggle:(k,b)=>{if(b===undefined)b=!tokens.has(k);b?tokens.add(k):tokens.delete(k)}},
   addEventListener:(k,fn)=>{(events[k]??=[]).push(fn)},click:()=>{for(const fn of events.click||[])fn()},
   setAttribute:(k,v)=>attrs.set(k,v),getAttribute:k=>attrs.get(k)||null,removeAttribute:k=>attrs.delete(k),
   appendChild:()=>{}
  };
  Object.defineProperty(result,'src',{get:()=>attrs.get('src')||'',set:v=>attrs.set('src',v)});
  els.set(id,result);return result;
 }
 const body=element('body');
 body.appendChild=()=>{for(const id of ['hcOtMinimize','hcOtClose','hcOtTitle','hcOtSource','hcOtFrame','hcOtRestoreNote'])element(id)};
 const document={body,head:{appendChild(){}},createElement:name=>element(name==='aside'?'hcOneTapDrive':name),getElementById:id=>els.get(id)||null,querySelectorAll:()=>[],addEventListener(){}};
 const window={show(){},addEventListener(){}};
 const sessionStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};
 const items=[{key:'islamDhir120',id:'1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C',name:'Islamic Dhikr · Extended Playlist',section:'islamic'}];
 vm.runInNewContext(source,{document,window,sessionStorage,HC_DRIVE_COLLECTIONS:items,HTMLMediaElement:class{},queueMicrotask:fn=>fn(),renderGlobalMini(){}});
 return {window,els};
}
const a=launch();
a.window.openHcDriveMedia('islamDhir120','hcListening');
assert.equal(a.els.get('hcOneTapDrive').hidden,false);
assert.match(a.els.get('hcOtFrame').src,/1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C/);
a.els.get('hcOtMinimize').click();
assert.equal(a.els.get('hcOtMinimize').textContent,'Resume');
assert.equal(a.els.get('hcOneTapDrive').classList.contains('hc-ot-collapsed'),true);
assert.equal(a.els.get('hcOneTapDrive').hidden,false);
a.els.get('hcOtMinimize').click();
assert.equal(a.els.get('hcOneTapDrive').classList.contains('hc-ot-collapsed'),false);
a.els.get('hcOtMinimize').click();
const b=launch(); // Same browser session after reload.
assert.equal(b.els.get('hcOneTapDrive').hidden,false);
assert.equal(b.els.get('hcOtMinimize').textContent,'Resume');
assert.equal(b.els.get('hcOtFrame').src,''); // No unsolicited autoplay.
b.els.get('hcOtMinimize').click();
assert.match(b.els.get('hcOtFrame').src,/preview\?autoplay=1/);
b.els.get('hcOtClose').click();
assert.equal(b.els.get('hcOneTapDrive').hidden,true);
assert.equal(memory.has('heartclearDriveLastOpenV1'),false);
console.log('PASS minimized Drive video remains accessible; explicit Resume; soft refresh; Close; cache contract');
