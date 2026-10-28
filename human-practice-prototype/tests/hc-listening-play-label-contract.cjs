/* All Listening Drive recordings: user-facing label and existing one-click action contract. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const hub=fs.readFileSync(path.join(root,'hc-listening-hub-v254.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.doesNotThrow(()=>new vm.Script(hub,{filename:'hc-listening-hub-v254.js'}));
assert.match(hub,/item\.kind==='drive'\?'Play'/,'Drive cards must say Play instead of Video');
assert.doesNotMatch(hub,/item\.kind==='drive'\?'Video'/);
assert.match(hub,/Google Drive player/,'Provenance remains clear without repetitive video badges');
assert.match(hub,/b\.addEventListener\('click',\(\)=>play\(item\)\)/);
assert.match(hub,/fn\(item\.key,'hcListening'\)/,'Preserve existing one-click player handoff');
assert.match(hub,/autoplay is blocked/,'Must explain Google Drive browser restriction');
assert.match(html,/const HC_DRIVE_COLLECTIONS=/,'Keep all original media IDs and archive');
assert.match(html,/hc-listening-hub-v254\.js\?v=280/,'Keep existing v288 app shell and scripts unchanged');
console.log('PASS All Listening cards have Play label, existing Drive handoff and provenance preserved');
