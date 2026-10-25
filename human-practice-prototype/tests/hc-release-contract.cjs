/* HeartClear release contract — node tests/hc-release-contract.cjs
   Static verification only. This cannot prove Android or Google Drive playback. */
'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=read('index.html');
const worker=read('sw.js');
const flow=read('hc-flow-v220.js');
const cinema=read('hc-cinema-v239.js');
const home=read('hc-home-visible-v268.js');
const mixer=read('hc-sounds-direct-v149.js');
const source=read('hc-home-core-paths-v259.js');

test('PWA cache, worker registration, and Settings label match',()=>{
 const cache=worker.match(/const APP_CACHE='heartclear-v(\d+)'/);
 const registered=html.match(/serviceWorker\.register\('\.\/sw\.js\?v=(\d+)'/);
 const display=home.match(/HeartClear interface · v(\d+)/);
 assert.ok(cache&&registered&&display);
 assert.equal(registered[1],cache[1]);
 assert.equal(display[1],cache[1]);
});
test('App and PWA cache request identical versions of critical scripts',()=>{
 for(const file of ['hc-flow-v220.js','hc-cinema-v239.js','hc-home-visible-v268.js']){
  const part=html.split('src="./'+file+'?v=')[1];
  assert.ok(part,'Page missing '+file);
  const version=part.split('"')[0];
  assert.match(version,/^\d+$/);
  assert.ok(worker.includes("'./"+file+"?v="+version+"'"),'Not precached: '+file+' v'+version);
 }
 assert.match(worker,/const MEDIA_CACHE='heartclear-media-v1'/);
});
test('Reels is third, Library fifth, and old competing scripts are absent',()=>{
 const start=flow.indexOf('dock.innerHTML=');
 const end=flow.indexOf('document.body.append(dock)',start);
 assert.ok(start>=0&&end>start);
 const ids=[...flow.slice(start,end).matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
 assert.deepEqual(ids,[
  'hcFlowDockHome','hcFlowDockListen','hcCinemaReels',
  'hcCinemaExplore','hcCinemaLibrary','hcCinemaSettings'
 ]);
 assert.ok(cinema.includes("dock.append(byId('hcFlowDockHome'),byId('hcFlowDockListen'),reels,explore,library,settings)"));
 assert.ok(!flow.includes('hcFlowDockSearch'));
 assert.ok(!html.includes('hcReelsBottomTabGuard'));
 assert.ok(read('hc-bubble-v207.js').includes('hcBubbleSearch'));
 assert.ok(flow.includes("hcCinemaReels').addEventListener('click'"));
});
test('Time-based meditation and all three original scripture players remain',()=>{
 for(const id of ["hcHomeBrandBar","hcCorePathsClassic","hcQuranFirst","hcGenesisCard","hcHinduHome"])
  assert.ok(home.includes(id),'Home missing '+id);
 assert.ok(source.includes("h>=5&&h<12?'wake':h>=12&&h<17?'noon'"));
 for(const title of ['Deep Wake Up','Noon Reset','Evening Release','Deep Sleep'])
  assert.ok(source.includes(title),'Missing meditation: '+title);
 for(const file of ['hc-quran-home-v153.js','hc-genesis-v156.js','hc-hindu-scriptures-v162.js'])
  assert.ok(fs.existsSync(path.join(root,file)),'Missing '+file);
});
test('Sound mixer offers six recordings and keeps three active maximum',()=>{
 assert.match(html,/const hcMixMaxLayers=3/);
 assert.match(mixer,/setEditing\(true\)/);
 for(const name of ['Rain','Wind','Ocean','Birds','Fire','Thunder'])
  assert.ok(html.includes("name:'"+name+"'"),'Missing '+name);
});
