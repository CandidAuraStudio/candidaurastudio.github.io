/* HeartClear HUMAN English Reader 1.6 — preservation/structure checks.
   Run: node human-practice-prototype/tests/hc-human-reader-review-1-6.cjs
   Content proofing and Android/manual review remain separate.
*/
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const file = path.resolve(__dirname, '../books/human-when-you-are-alone.html');
const html = fs.readFileSync(file, 'utf8');
assert.match(html, /HUMAN.{0,30}WHEN YOU ARE ALONE/, 'Book identity retained');
assert.match(html, /English Reader Review 1\.6 · 27 chapters/, 'Review label retained');
assert.match(html, /\.\/human-cover\.svg/, 'Original cover remains referenced');
assert.match(html, /const SAVEKEY='hc:human-reader1\.5'/, 'Preserve original reading history key');
assert.match(html, /localStorage\.getItem\(SAVEKEY/, 'Reading history is restored');
assert.match(html, /localStorage\.setItem\(SAVEKEY/, 'Reading progress is saved');

const marker = 'const DATA=';
const at = html.indexOf(marker);
const end = html.indexOf('];\nconst $=', at);
assert(at >= 0 && end > at, 'Reader data block must be present and recognizable');
const data = JSON.parse(html.slice(at + marker.length, end + 1));
assert.equal(data.length, 33, 'Keep 27 chapters plus the existing 6 framing/interlude sections');
assert.equal(data[0].title, 'BEFORE WE BEGIN');
assert.equal(data[data.length - 1].title, 'AFTER THE LAST PAGE');
const numbered = data.filter(ch => /^Chapter \d+: /.test(ch.title));
assert.equal(numbered.length, 27, 'All numbered chapters must survive');
assert.deepEqual(numbered.map(ch => Number(ch.title.match(/^Chapter (\d+): /)[1])),
  Array.from({length:27}, (_,i)=>i+1), 'Chapters are in original order');
assert(data.every(ch => Array.isArray(ch.paras) && ch.paras.every(p => typeof p === 'string')),
  'Every entry must contain a usable paragraph array');
assert(data.every(ch => ch.paras.length > 0), 'No empty reading section');

const text = data.flatMap(ch => ch.paras).join('\n');
assert(text.includes('I am not claiming that science or theology proves'),
  'Retain nuance separating consciousness, observer and soul');
assert(text.includes('A recent moment at work made this question physical'),
  'Retain the clearly labeled lived-work scene');
assert(!text.includes('not knowingness .'), 'Do not restore the punctuation error');
const script = html.match(/<script>([\s\S]*?)<\/script>/);
assert(script, 'Reader controller must be present');
new vm.Script(script[1], {filename:'human-when-you-are-alone.html inline JS'});
console.log('PASS: HUMAN Review 1.6 preserves 27 numbered chapters, all reader sections, cover, history and parseable JavaScript.');
