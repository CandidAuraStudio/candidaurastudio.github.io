/* HeartClear Clean Body · Clear Heart: verifiable content and scoped PWA contract.
   Run: node human-practice-prototype/tests/hc-clean-body-heart-contract.cjs
*/
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const data=JSON.parse(read('human-knowledge/clean-body-clear-heart-data.json'));
const html=read('human-knowledge/clean-body-clear-heart.html');
const index=read('index.html'),sw=read('sw.js'),home=read('hc-home-visible-v268.js');
const deep=read('hc-deep-heritage-v185.js'),reader=read('hc-heritage-reader-v189.js');
assert.equal(data.records.length,16,'This is an accurately numbered initial collection, not 1,000 invented lessons');
assert.equal(data.count,16);
assert.equal(new Set(data.records.map(x=>x.id)).size,16,'Every lesson must have a distinct ID');
for(const kind of ['Scripture','Daily care','Inner life'])assert(data.records.some(x=>x.kind===kind),kind+' lessons required');
for(const item of data.records){
 for(const key of ['id','kind','title','ta','source','meaning','context','practice'])assert(item[key]&&String(item[key]).length>12,key+' missing in '+item.id);
 assert(item.context.length>95,'Detailed contextual explanation needed: '+item.id);
 assert(item.practice.length>40,'Separate practical reflection needed: '+item.id);
 if(item.kind==='Scripture'){
  assert(item.original&&item.original.length>20,'Original text required: '+item.id);
  assert(['ar','en','sa'].includes(item.language),'Original language not declared: '+item.id);
 }else assert(!item.original,'Practical lesson must not invent a scriptural original: '+item.id);
}
const scriptural=data.records.filter(x=>x.kind==='Scripture');
assert.equal(scriptural.length,7,'7 source-identified full cited scripture passages required');
for(const ref of ['5:6','74:4','91:9','James 4:8','Psalm 51:10','17.14','17.16'])assert(scriptural.some(x=>x.source.includes(ref)),'Missing text for '+ref);
assert(data.records.find(x=>x.id==='q-56').original.includes('فَتَيَمَّمُوا۟'),'Full 5:6 includes dry ablution concession');
assert(data.records.find(x=>x.id==='q-56').original.includes('لَعَلَّكُمْ تَشْكُرُونَ'),'Qur’an 5:6 end must not be omitted');
assert(data.records.find(x=>x.id==='q-744').original.includes('فَطَهِّرْ'));
assert(data.records.find(x=>x.id==='q-919').original.includes('زَكَّىٰهَا'));
assert(data.records.find(x=>x.id==='g-1714').original.includes('शौच'));
assert(data.records.find(x=>x.id==='g-1716').original.includes('भावसंशुद्धि'));
assert(data.licenseNotes.includes('Tanzil')&&data.licenseNotes.includes('CC BY 3.0'),'Source license/attribution must stay visible');
assert(html.includes('Clean Body · Clear Heart')&&html.includes('Original scripture · full cited verse'));
assert(html.includes('not a word-for-word translation'),'Separate exact original from original editorial meaning');
assert(html.includes("fetch('./clean-body-clear-heart-data.json'"),'All lessons must load entirely from the local app');
assert(html.includes('setInterval')&&html.includes('clearInterval'),'Preview must be pausable and rotate');
assert(html.includes("if(!document.hidden)preview(false)"),'Do not rotate active preview while app is hidden');
assert(!html.includes('<audio')&&!html.includes('autoplay'),'No unsolicited playback');
assert(!/<a\b[^>]+href=["']https?:/i.test(html),'No off-site links from the in-app reading screen');
assert(html.includes('aria-live="polite"')&&html.includes('reader[hidden]'),'Reader must remain accessible without being changed by preview');
for(const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script[1],{filename:'clean-body-clear-heart.html'});
assert(reader.includes('human-knowledge/clean-body-clear-heart.html'),'Open new collection from Human Knowledge');
assert(deep.includes("reader.src='./hc-heritage-reader-v189.js?v=290'"),'Lazy-load latest reader');
assert(index.includes('HeartClear · HC v290')&&index.includes("register('./sw.js?v=290')"),'Visible build number and worker registration aligned');
assert(index.includes('hc-home-visible-v268.js?v=290')&&home.includes('HeartClear · HC v290'),'Home override must show correct candidate version');
assert(sw.includes("const APP_CACHE='heartclear-v290'")&&sw.includes("const MEDIA_CACHE='heartclear-media-v1'"),'Preserve distinct offline media cache');
for(const asset of ['hc-heritage-reader-v189.js?v=290','human-knowledge/clean-body-clear-heart.html','human-knowledge/clean-body-clear-heart-data.json'])assert(sw.includes(asset),'Missing offline shell asset: '+asset);
assert(sw.includes("human-knowledge\\/clean-body-clear-heart"),'Offline navigation must serve exact study page');
for(const preserve of ['books/shadows-of-truth-reader.html','books/human-when-you-are-alone.html','hc-listening-hub-v254.js?v=280','hc-flow-v220.js?v=285'])assert(sw.includes(preserve),'Latest main asset lost: '+preserve);
console.log('PASS 16 original lessons; 7 complete scripture texts; no external reading; safe shuffle; v290 offline preservation');
