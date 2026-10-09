'use strict';
(()=>{const $=id=>document.getElementById(id),key='quiet-breath-history-v1';let total=120,remaining=120,end=0,timer=null,running=false,records=[];
try{let raw=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(raw))records=raw.filter(x=>x&&typeof x.at==='string'&&Number.isFinite(x.seconds)&&x.seconds>=60&&x.seconds<=600).slice(0,2000)}catch(e){}
const label=()=>{let n=Math.ceil(Math.max(0,remaining));$('time').textContent=Math.floor(n/60)+':'+String(n%60).padStart(2,'0')};
const history=()=>{$('history').textContent=records.length+' completed sessions · '+Math.round(records.reduce((s,r)=>s+r.seconds,0)/60)+' minutes total';};
const save=()=>{try{localStorage.setItem(key,JSON.stringify(records))}catch(e){$('phase').textContent='Could not save local history';}};
function done(){clearInterval(timer);timer=null;running=false;remaining=0;records.unshift({at:new Date().toISOString(),seconds:total});records=records.slice(0,2000);save();history();label();$('phase').textContent='Session complete';$('start').textContent='Start again';}
function tick(){remaining=Math.max(0,(end-performance.now())/1000);if(remaining<=0){done();return}label();$('phase').textContent=(Math.floor((total-remaining)%10)<4)?'Breathe in gently':'Breathe out gently';}
function reset(){clearInterval(timer);timer=null;running=false;total=Number($('duration').value);remaining=total;label();$('phase').textContent='Ready when you are';$('start').textContent='Start';}
$('start').onclick=()=>{if(running){tick();if(!running)return;clearInterval(timer);timer=null;running=false;$('phase').textContent='Paused';$('start').textContent='Resume';return;}if(remaining<=0)remaining=total;end=performance.now()+remaining*1000;running=true;$('start').textContent='Pause';tick();timer=setInterval(tick,200)};
$('reset').onclick=reset;$('duration').onchange=reset;
$('export').onclick=()=>{const blob=new Blob([JSON.stringify({app:'quiet-breath',records},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='quiet-breath-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),500)};
$('importbutton').onclick=()=>$('import').click();
$('import').onchange=async e=>{let f=e.target.files[0];if(!f||f.size>500000)return;try{let d=JSON.parse(await f.text());if(d.app!=='quiet-breath'||!Array.isArray(d.records)||d.records.length>2000)throw Error();const x=d.records.filter(r=>r&&typeof r.at==='string'&&Number.isFinite(Date.parse(r.at))&&[60,120,180,300,600].includes(r.seconds));if(!confirm('Import '+x.length+' records?'))return;let m=new Map(records.map(r=>[r.at+'|'+r.seconds,r]));x.forEach(r=>m.set(r.at+'|'+r.seconds,r));records=[...m.values()].slice(0,2000);save();history()}catch(err){$('phase').textContent='Invalid backup file'}};
document.addEventListener('visibilitychange',()=>{if(running&&!document.hidden)tick()});
if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
reset();history()})();