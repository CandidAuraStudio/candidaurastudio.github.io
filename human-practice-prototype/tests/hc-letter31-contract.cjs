/* Source contract for the HeartClear Human Knowledge / Letter 31 feature.
   Run: node human-practice-prototype/tests/hc-letter31-contract.cjs
*/
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const dataFile=read('human-knowledge/ali-letter-31-arabic.js');
const context={window:{}};
vm.runInNewContext(dataFile,context,{timeout:1000});
const letter=context.window.HC_ALI_LETTER31_AR;
assert.equal(letter.lang,'ar');
assert(letter.text.length>12500,'Letter must not be abridged or only an extract');
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
assert(html.includes('Sayyid Ali Reza'),'English translation attribution required');
assert(html.includes('al-islam.org/nahjul-balagha'),'Complete English source must be linked');
assert(html.includes('not a surviving manuscript'),'Historical attribution must remain explicit');
assert(!html.includes('<audio autoplay'),'No unsolicited audio playback');
const reader=read('hc-heritage-reader-v189.js');
assert(reader.includes('human-knowledge/ali-letter-31.html'),'Must be directly discoverable inside Human Knowledge');
assert(reader.includes('Knowledge Library'),'Existing heritage reader must be preserved');
console.log('HeartClear Letter 31: source and navigation checks passed (not a mobile playback test).');
