'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const vm=require('node:vm');

const appDir=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(appDir,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(appDir,'sw.js'),'utf8');

function match1(re,text,label){
  const match=text.match(re);
  assert.ok(match,'Missing '+label);
  return match[1];
}

const registered=match1(/serviceWorker\.register\(['"]\.\/sw\.js\?v=(\d+)['"]\)/,html,'registered SW version');
const cache=match1(/const APP_CACHE=['"]heartclear-v(\d+)['"]/,sw,'application cache version');
assert.equal(registered,cache,'SW registration and cache version must agree');
assert.match(html,/Version 1\.3\.12/,'Visible app version must match this proposed review release');
assert.match(sw,/const MEDIA_CACHE=['"]heartclear-media-v1['"]/,
  'Never invalidate saved audio when updating the app shell');

const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
const nav=[...html.matchAll(/<button\s+class="nav-item[^"]*"[^>]*data-nav="([^"]+)"\s+onclick="navTo\('([^']+)'/g)];
assert.equal(nav.length,5,'The five primary tabs must remain available');
for(const [,tab,target] of nav){
  assert.ok(ids.has(target),tab+' destination #'+target+' must exist');
}
assert.ok(html.includes("function navTo(id,btn)"),'Primary tab handler is present');

let checked=0;
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)){
  if(!match[1].trim())continue;
  new vm.Script(match[1],{filename:'index.html:inline-'+(++checked)});
}
assert.ok(checked>=2,'Inline scripts should parse');

assert.match(html,/id="soundLabAudio"/,'Sounds player preserved');
assert.match(html,/id="sacredDetail"/,'Sacred Sound preserved');
assert.match(html,/id="bookAudio"/,'Audiobook preserved');
assert.match(html,/id="home"/,'Home preserved');
assert.doesNotMatch(html,/<audio\s+id="soundLabAudio"[^>]*autoplay/i,
  'Do not autoplay Sounds on app launch');
console.log('HeartClear release navigation check passed: SW v'+cache+', '+nav.length+' tabs, '+checked+' inline scripts.');
