/* Source contract for the HeartClear Human Knowledge / Letter 31 feature.
   Run: node human-practice-prototype/tests/hc-letter31-contract.cjs
*/
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const dataFile=read('human-knowledge/ali-letter-31-arabic.js');
const context={window:{}};
vm.runInNewContext(dataFile,context,{timeout:1000});
const letter=context.window.HC_ALI_LETTER31_AR;
assert.equal(crypto.createHash('sha256').update(letter.text).digest('hex'),'160ee653ee92acfb16e22cb9fa400ac0fec1dd04701a7cc687b5f39eb9d15192','Exact complete recovered text must survive; a word count alone cannot detect substitutions');
assert.equal(letter.lang,'ar');
assert.equal(letter.source,'https://github.com/libarabia/nahj-albalagha/blob/main/abdu/ch006.md','Arabic edition link must resolve to upstream main branch');
assert(letter.text.length>12500,'Letter must not be abridged or only an extract');
const arabicWords=(letter.text.match(/\p{Script=Arabic}+/gu)||[]).filter(token=>!/^\p{Decimal_Number}+$/u.test(token));
assert.equal(arabicWords.length,2488,'Preserved Arabic Letter 31 must retain all 2,488 original-edition words; review source before updating this count');
for(const anchor of [
'من الوالد الفان','ووجدتك بعضي','أحي قلبك','اجعل نفسك ميزانا',
'ولا تكن عبد غيرك','وإياك ومشاورة النساء','وأكرم عشيرتك','والسلام'
])assert(letter.text.includes(anchor),'Missing original Arabic anchor: '+anchor);
assert(letter.text.endsWith('والسلام'),'End of letter must survive');
assert(!letter.text.includes('هامش'),'Modern Arabic footnotes must not enter the original letter');
assert(!letter.text.includes('صفحة ٥٦'),'Printer page labels must not enter the letter');
const html=read('human-knowledge/ali-letter-31.html');
assert(html.includes('ali-letter-31-arabic.js'),'Local Arabic source must be readable');
assert(html.includes('sectionEnglish'),'English source panel must exist');
assert(html.includes('sectionNotes'),'Blank independent note panel must exist');
assert(html.includes("event.key==='ArrowRight'") && html.includes("event.key==='ArrowLeft'"),'Reader tabs need keyboard navigation');
assert(html.includes('control.tabIndex=active?0:-1'),'Only the selected tab belongs in the normal tab order');
assert(!html.includes('window.scrollTo(0,0)'),'Switching Letter 31 tabs must not forcibly reset scroll');
assert(html.includes('Sayyid Ali Reza'),'English translation attribution required');
assert(html.includes('al-islam.org/nahjul-balagha'),'Complete English source must be linked');
assert(html.includes('not a surviving manuscript'),'Historical attribution must remain explicit');
assert(!html.includes('<audio autoplay'),'No unsolicited audio playback');
const reader=read('hc-heritage-reader-v189.js');
assert(reader.includes('human-knowledge/ali-letter-31.html'),'Must be directly discoverable inside Human Knowledge');
assert(reader.includes('Knowledge Library'),'Existing heritage reader must be preserved');
const app=read('index.html');
const letterRoute='./human-knowledge/ali-letter-31.html';
const occurrences=app.split('href="'+letterRoute+'"').length-1;
assert.equal(occurrences,2,'Stories & Letters and English Reading Books must route to the same preserved text');
assert(app.includes('Stories &amp; Letters'),'Library story shelf must list the historical letter');
assert(app.includes('HISTORICAL LETTER · NAHJ AL-BALAGHA'),'English Reading Books must label it a historical letter');
assert(app.includes('2 books · 1 historical letter'),'Keep HeartClear-authored Book One and Book Two count truthful');
assert(app.includes("language==='en'"),'Do not fabricate Tamil or Sinhala Letter 31 translations');
assert(app.includes('Book One and Book Two'),'Retain original authored-books collection');
assert(!app.includes('Book Three · Imam Ali'),'Do not misrepresent Imam Ali as author of a HeartClear original book');
assert(html.includes('External source · internet required.'),'Offline English limitation must be explicit');
assert(html.includes('HeartClear reflection · Before you read'),'Editorial introduction must be labelled');
assert(app.includes('HC v292')&&app.includes('./sw.js?v=292'),'App label and SW registration must agree');
for(const [file,asset] of [['index.html','hc-flow-v220.js'],['hc-flow-v220.js','hc-daily-care-v182.js'],['hc-daily-care-v182.js','hc-deep-heritage-v185.js'],['hc-deep-heritage-v185.js','hc-heritage-reader-v189.js']]){
 assert(read(file).includes('./'+asset+'?v=292'),'Changed loader must use coordinated reader version: '+file);
 assert(read('sw.js').includes('./'+asset+'?v=292'),'Precache must match loader: '+asset);
}
console.log('HeartClear Letter 31: source, Library and navigation checks passed (not a mobile playback test).');

