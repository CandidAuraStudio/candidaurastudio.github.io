'use strict';
/* Source-level regression checks for HeartClear's optional Fear listening.
 * Run: node human-practice-prototype/tests/hc-fear-session-integrity.cjs
 * No user data, service workers, audio files or browser storage are touched. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const start=source.indexOf('function finishFearPractice(){');
const end=source.indexOf("\nfearAudio.addEventListener('timeupdate'",start);
assert(start>=0&&end>start,'Fear completion function must exist');
const finish=source.slice(start,end);
assert(finish.includes('const heardSeconds=Math.max(0,Number(fearAudio.currentTime)||0);'),'Measure actual playback position');
const guard=finish.indexOf('if(heardSeconds<1){');
const writes=finish.indexOf('localStorage.setItem');
assert(guard>=0&&writes>guard,'Reject empty listening before mutating progress');
assert(finish.includes("if(status)status.textContent='Press Play and listen before saving your session.'"),'Explain why progress was not saved');
assert(finish.includes('listenedSeconds:Math.round(heardSeconds),'),'History uses measured seconds');
assert(finish.includes('saveHistory(history);'),'Keep existing history persistence');
const openStart=source.indexOf('function openFearTrack(key){');
const openEnd=source.indexOf('function setFearRating(',openStart);
const open=source.slice(openStart,openEnd);
assert(open.includes("b.setAttribute('aria-pressed','false');"),'Reset prior optional comfort choices');
assert(open.includes("b.classList.remove('active');"),'Reset prior visual choices');
assert(source.includes('Optional · How comfortable does this sound feel?'),'Rating stays optional and low-pressure');
assert(source.includes('id="fearVolume" type="range" min="0" max="40" value="15"'),'Low default volume preserved');
const match=source.match(/const fearTracks=(\{[^\n]+\});/);
assert(match,'Fear audio catalog exists');
const tracks=JSON.parse(match[1]);
for(const key of ['ocean','storm','thunder','rain','wind','frog']){
  assert(tracks[key],'Preserve '+key+' track');
  assert(tracks[key].url.startsWith('./media/cc0-nature/'),'Hosted source for '+key);
}
assert(source.includes('heartclearFearStats'),'Existing progress key retained');
console.log('Fear session integrity: PASS (guard, reset, local sources, history unchanged).');
