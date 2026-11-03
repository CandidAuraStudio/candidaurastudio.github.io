/* HeartClear v293: unavailable recordings must not appear as Add Audio.
 * Existing native MP3/WAV in IndexedDB remain playable through Sound Lab.
 * The original Drive media archive and saved progress remain unchanged.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const hub=read('hc-listening-hub-v254.js');
const local=read('hc-listening-local-audio-v290.js');
const html=read('index.html');
const sw=read('sw.js');
const home=read('hc-home-visible-v268.js');

assert.doesNotThrow(()=>new vm.Script(hub));
assert.doesNotThrow(()=>new vm.Script(local));
assert.match(hub,/if\(!saved\)return;/,'Unplayable catalogue items must be suppressed');
assert.doesNotMatch(hub,/Add audio|Add private MP3\/WAV|add private MP3\/WAV once/,'No upload prompts in Listening');
assert.match(hub,/hcLocalListeningAudio\.chooseOrPlay\(item\.key\)/,'Saved recordings retain one tap');
assert.match(local,/hcQuickPlaySound\(nativeKey\)/,'Existing Sound Lab player retained');
assert.match(local,/indexedDB\.open\(DB_NAME,1\)/,'Device-saved audio is still restored');
assert.match(local,/window\.hcLocalListeningAudio=/,'Local saved audio API retained');
assert.doesNotMatch(local,/input\.click\(|document\.createElement\('input'\)|input\.addEventListener/,'No file picker from Listening');
assert.match(local,/if\(!has\(key\)\)\{say\('This recording is not available as audio yet\.'\);return false;\}/);
assert.doesNotMatch(local,/localStorage\.clear\(|caches\.delete\(|indexedDB\.deleteDatabase/);
assert.match(html,/const HC_DRIVE_COLLECTIONS=/,'Archive of original media identifiers unchanged');
assert.match(html,/if\(!window\.hcLocalListeningAudio\?\.has\(item\.key\)\)return;/,'Mini library hides unplayable items');
assert.doesNotMatch(html,/Add your MP3\/WAV once/,'No mini-library upload prompt');
assert.doesNotMatch(html,/else openHcDriveMedia\(item\.key\);/,'No misleading video substitution');
assert.match(html,/hc-listening-local-audio-v290\.js\?v=293/);
assert.match(html,/hc-listening-hub-v254\.js\?v=293/);
assert.match(html,/register\('\.\/sw\.js\?v=295'\)/);
assert.match(sw,/const APP_CACHE='heartclear-v295'/);
assert.match(sw,/const MEDIA_CACHE='heartclear-media-v1'/);
assert.match(sw,/hc-listening-local-audio-v290\.js\?v=293/);
assert.match(html,/HeartClear · HC v295/);
console.log('PASS unavailable Listening tiles hidden, no audio picker, saved audio retained, PWA cache aligned');
