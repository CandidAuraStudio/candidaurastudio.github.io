/* HeartClear: featured surah, nonrepeating four-a-day shuffle, QuranEnc spoken meanings. */
(function(){
'use strict';
const home=document.getElementById('home'),greeting=home?.querySelector('.hc-home-greeting-row');
if(!home||!greeting||document.getElementById('hcQuranFirst'))return;
const counts=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
if(counts.length!==114)return;
const audioKeys={en:'english_rwwad',ta:'tamil_omar_brief'};
const spoken={en:'English meaning',ta:'தமிழ் பொருள்',ar:'Arabic recitation'};
let lang='en';try{const x=localStorage.getItem('hcQuranHomeLanguageV1');if(['en','ta','ar'].includes(x))lang=x;}catch(e){}
const order=Array.from({length:114},(_,i)=>i+1);let rand=20261023;
for(let i=113;i>0;i--){rand=(Math.imul(rand,1664525)+1013904223)>>>0;const j=rand%(i+1);[order[i],order[j]]=[order[j],order[i]];}
let manual=null,period='',active=null,serial=0;
const versesText=new Map(),versions=new Map();
const audio=document.createElement('audio');audio.id='hcQuranMeaningAudio';audio.preload='metadata';audio.playsInline=true;audio.hidden=true;document.body.appendChild(audio);
const panel=document.createElement('section');panel.id='hcQuranFirst';panel.setAttribute('aria-label','Featured Surah');
panel.innerHTML='<header class="hcq-head"><div><span class="hcq-kicker">SURAH FOR NOW</span><small id="hcqSlot">Changes during the day</small></div><span id="hcqCounter">1 / 114</span></header>'+
 '<div class="hcq-current"><button type="button" id="hcqPrevious" aria-label="Previous recommended chapter">‹</button><div><b id="hcqName">Surah Al-Fatihah</b><small id="hcqMeta">Listen in English</small></div><button type="button" id="hcqNext" aria-label="Next recommended chapter">›</button></div>'+
 '<div class="hcq-langs" role="group" aria-label="Listening language"><button type="button" data-hcq="en">English</button><button type="button" data-hcq="ta">தமிழ்</button><button type="button" data-hcq="ar">العربية</button></div>'+
 '<div class="hcq-actions"><button type="button" id="hcqPlay"><span id="hcqIcon">▶</span><span id="hcqAction">Listen in English</span></button><button type="button" id="hcqRead">Read</button></div>'+
 '<div id="hcqLive" class="hcq-live" hidden><div class="hcq-livehead"><b id="hcqVerseNumber">Verse 1</b><small id="hcqStatus" role="status">Ready</small></div><p id="hcqVerse">Translation appears while listening.</p></div>'+
 '<div class="hcq-bottom"><details id="hcqBrowse"><summary>All 114 surahs</summary><select id="hcqSelect" aria-label="Choose one of the 114 surahs"></select></details>'+
 '<details><summary>Audio sources</summary><p>English-only spoken meaning: Rowwad Translation Center. Tamil-only spoken meaning: Omar Brief. QuranEnc. Arabic recitation: Mishary Alafasy via Al Quran Cloud. Translators’ meanings are separate from the original Arabic Qur’an.</p><p id="hcqVersion"></p><a href="https://quranenc.com/en/home/api/" target="_blank" rel="noopener noreferrer">QuranEnc source</a></details></div>';
greeting.insertAdjacentElement('afterend',panel);
const old=home.querySelector('.hc-v139-quran');if(old)old.remove();
const style=document.createElement('style');style.textContent=[
 '#home #hcQuranFirst{margin:9px 0 13px;padding:13px;border:1px solid rgba(218,236,242,.25);border-radius:18px;background:#0c2230;color:#f4f6f7}',
 '#hcQuranFirst button,#hcQuranFirst select{font:inherit;cursor:pointer}',
 '#hcQuranFirst .hcq-head,.hcq-current,.hcq-livehead,.hcq-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px}',
 '#hcQuranFirst .hcq-head>div{display:grid;gap:3px}#hcQuranFirst .hcq-head small,#hcQuranFirst #hcqCounter{font-size:11px;color:#aec2cd}',
 '#hcQuranFirst .hcq-kicker{font-size:11px;font-weight:750;letter-spacing:.12em;color:#e2c28b}',
 '#hcQuranFirst .hcq-current{margin:10px 0}',
 '#hcQuranFirst .hcq-current>button{width:39px;height:39px;border:1px solid #365564;background:#143240;color:#fff;border-radius:11px;font-size:25px}',
 '#hcQuranFirst .hcq-current>div{min-width:0;flex:1;text-align:center}',
 '#hcQuranFirst #hcqName{display:block;font-size:19px;line-height:1.35}',
 '#hcQuranFirst #hcqMeta{display:block;font-size:11px;color:#aec4cb;margin-top:3px}',
 '#hcQuranFirst .hcq-langs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}',
 '#hcQuranFirst .hcq-langs button{border:1px solid #496270;border-radius:10px;min-height:38px;background:#153543;color:#fff;font-size:12px}',
 '#hcQuranFirst .hcq-langs button[aria-pressed=true]{background:#f5f6f2;color:#0a202c;border-color:#fff;font-weight:750}',
 '#hcQuranFirst .hcq-actions{display:flex;gap:8px;margin:10px 0}',
 '#hcQuranFirst #hcqPlay{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;border-radius:12px;min-height:48px;border:0;background:#f4f5f1;color:#09212a;font-size:14px;font-weight:750}',
 '#hcQuranFirst #hcqRead{width:67px;border-radius:12px;min-height:48px;border:1px solid #4d6771;color:#f4f7f8;background:#153240;font-size:13px}',
 '#hcQuranFirst .hcq-live[hidden]{display:none!important}',
 '#hcQuranFirst .hcq-live{margin-top:8px;padding:10px;border-radius:12px;border:1px solid #2d4551;background:#081b26}',
 '#hcQuranFirst .hcq-livehead{font-size:11px;color:#bcd0d7}',
 '#hcQuranFirst #hcqVerse{margin:7px 0 0;max-height:118px;overflow:auto;font-size:14px;line-height:1.65;white-space:pre-line}',
 '#hcQuranFirst .hcq-bottom{align-items:flex-start;gap:12px}',
 '#hcQuranFirst .hcq-bottom details{flex:1;min-width:110px;font-size:11px;color:#baccd3}',
 '#hcQuranFirst .hcq-bottom summary{padding:5px 0;cursor:pointer}',
 '#hcQuranFirst #hcqSelect{width:100%;min-height:44px;background:#122f3f;color:#fff;border:1px solid #536873;border-radius:10px;padding:7px}',
 '#hcQuranFirst .hcq-bottom p{font-size:11px;line-height:1.5}',
 '#hcQuranFirst .hcq-bottom a{color:#e8cb9a}',
 '@media(max-width:350px){#hcQuranFirst #hcqName{font-size:16px}#hcQuranFirst #hcqPlay{font-size:12px}}'
].join('\n');document.head.appendChild(style);
const $=id=>document.getElementById(id);
const slot=d=>{const h=d.getHours();return h>=5&&h<11?0:h>=11&&h<17?1:h>=17&&h<22?2:3;};
const recommendedIndex=()=>{const d=new Date(),day=Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5),start=Math.round(Date.UTC(2026,9,23)/864e5);return (((day-start)*4+slot(d))%114+114)%114;};
const index=()=>manual===null?recommendedIndex():manual;
const number=()=>order[index()];
const title=n=>typeof soundLabTracks!=='undefined'&&soundLabTracks['hcSurah'+n]?.title||'Surah '+n;
const arabicSelected=n=>currentSoundKey==='hcSurah'+n&&!!soundLabAudio.getAttribute('src');
const nowPlaying=()=>lang==='ar'?(arabicSelected(number())&&!soundLabAudio.paused):(active?.n===number()&&active.lang===lang&&!audio.paused);
function render(){
 const n=number(),d=new Date(),time=['Morning','Afternoon','Evening','Night'][slot(d)];
 $('hcqName').textContent=title(n);$('hcqMeta').textContent=(spoken[lang]||spoken.en)+' · '+counts[n-1]+' verses';
 $('hcqCounter').textContent=n+' / 114';$('hcqSlot').textContent=time+' · changes 4 times a day';
 $('hcqSelect').value=String(n);
 panel.querySelectorAll('[data-hcq]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hcq===lang)));
 $('hcqIcon').textContent=nowPlaying()?'Ⅱ':'▶';
 $('hcqAction').textContent=nowPlaying()?'Pause':lang==='ar'?(arabicSelected(n)?'Resume':'Listen in Arabic'):lang==='ta'?'தமிழில் கேளுங்கள்':'Listen in English';
 $('hcqPlay').setAttribute('aria-pressed',String(nowPlaying()));
}
for(let i=1;i<=114;i++){const opt=document.createElement('option');opt.value=String(i);opt.textContent=String(i).padStart(3,'0')+' · '+title(i);$('hcqSelect').appendChild(opt);}
function clearMeaning(){
 serial++;audio.pause();audio.removeAttribute('src');audio.load();
 if(active?.lang!=='ar')active=null;
 try{if(localStorage.getItem('heartclearActiveMedia')==='quran-meaning')localStorage.removeItem('heartclearActiveMedia')}catch(e){}
 if(typeof renderGlobalMini==='function')renderGlobalMini();
}
window.hcStopQuranMeaning=()=>{clearMeaning();active=null;render();};
function verseURL(n,v,l){return 'https://d.quranenc.com/data/audio/'+audioKeys[l]+'/'+String(n).padStart(3,'0')+String(v).padStart(3,'0')+'.mp3';}
function displayVerse(){
 if(!active||active.lang==='ar')return;
 $('hcqLive').hidden=false;
 $('hcqVerseNumber').textContent='Verse '+active.verse+' / '+counts[active.n-1];
 const text=versesText.get(active.lang+':'+active.n)?.get(active.verse)||'Loading translation…';
 $('hcqVerse').textContent=text;$('hcqVerse').scrollTop=0;
}
async function fetchText(n,l,token){
 try{
  const r=await fetch('https://quranenc.com/api/v1/translation/sura/'+audioKeys[l]+'/'+n,{headers:{Accept:'application/json'}});
  if(!r.ok)throw Error('Source temporarily unavailable');
  const data=await r.json();
  const rows=Array.isArray(data?.result)?data.result:Array.isArray(data)?data:[];
  if(!rows.length)throw Error('No translation returned');
  const map=new Map();
  for(const item of rows){const v=Number(item.aya);if(Number.isInteger(v)&&v>0&&v<=counts[n-1])map.set(v,String(item.translation||''));}
  if(map.size)versesText.set(l+':'+n,map);
  if(token===serial&&active?.n===n&&active.lang===l)displayVerse();
 }catch(e){if(token===serial&&active?.n===n&&active.lang===l)$('hcqVerse').textContent='Translation text unavailable. Audio may still play; use Read for the full reader.';}
}
async function fetchVersion(l){
 if(versions.has(l))return;
 try{
  const r=await fetch('https://quranenc.com/api/v1/translations/list/'+l);if(!r.ok)return;
  const data=await r.json();const arr=Array.isArray(data?.result)?data.result:Array.isArray(data)?data:[];
  const row=arr.find(x=>x.key===audioKeys[l]);
  if(row){versions.set(l,row.version||'source');$('hcqVersion').textContent='Translation version: '+String(row.version||'see source');}
 }catch(e){}
}
function focus(){
 if(typeof hcMixRunning!=='undefined'&&hcMixRunning&&typeof hcMixStop==='function')hcMixStop(false);
 if(typeof hcStopCompactDriveAudio==='function')hcStopCompactDriveAudio();
 if(typeof hcStopDriveVideo==='function')hcStopDriveVideo(true);
 document.querySelectorAll('audio,video').forEach(el=>{if(el!==audio&&!el.paused)el.pause();});
}
function setupSession(){
 if(!active||!('mediaSession' in navigator)||typeof MediaMetadata==='undefined')return;
 try{
  navigator.mediaSession.metadata=new MediaMetadata({title:title(active.n),album:'Spoken meanings · '+spoken[active.lang],artist:active.lang==='ta'?'QuranEnc · Omar Brief':'QuranEnc · Rowwad Translation Center'});
  navigator.mediaSession.setActionHandler('play',()=>audio.play().catch(()=>{}));
  navigator.mediaSession.setActionHandler('pause',()=>audio.pause());
  navigator.mediaSession.setActionHandler('nexttrack',()=>window.hcMeaningStepVerse(1));
  navigator.mediaSession.setActionHandler('previoustrack',()=>window.hcMeaningStepVerse(-1));
 }catch(e){}
}
function playVerse(v){
 if(!active||active.lang==='ar'||v<1||v>counts[active.n-1])return;
 active.verse=v;
 audio.src=verseURL(active.n,v,active.lang);
 displayVerse();setupSession();
 const current=serial;
 audio.play().catch(()=>{if(serial===current)$('hcqStatus').textContent='Tap Play again or check your connection';});
}
function start(n,l){
 clearMeaning();focus();active={n,lang:l,verse:1};
 window.hcQuranMeaningNowTitle=title(n)+' · '+spoken[l];
 $('hcqLive').hidden=false;$('hcqStatus').textContent='Loading…';
 const current=serial;
 fetchText(n,l,current);fetchVersion(l);playVerse(1);
 hcMiniPinnedKey='quran-meaning';render();renderGlobalMini();
}
function toggle(){
 const n=number();
 if(lang==='ar'){
  if(arabicSelected(n)){
   if(soundLabAudio.paused){
    focus();active={n,lang:'ar',verse:1};
    if(typeof setSoundLabMediaSession==='function')setSoundLabMediaSession();
    soundLabAudio.play().catch(()=>{$('hcqAction').textContent='Tap Play again';});
    hcMiniPinnedKey='soundlab';renderGlobalMini();
   }else soundLabAudio.pause();
   render();return;
  }
  clearMeaning();focus();active={n,lang:'ar',verse:1};$('hcqLive').hidden=true;
  if(typeof hcPlayQuranSurah==='function')hcPlayQuranSurah(n);
  render();return;
 }
 if(active?.n===n&&active.lang===lang&&audio.getAttribute('src')){
  if(audio.paused){focus();setupSession();audio.play().catch(()=>{$('hcqStatus').textContent='Cannot play audio';});}
  else audio.pause();
  render();return;
 }
 start(n,lang);
}
window.hcMeaningStepVerse=delta=>{
 if(!active||active.lang==='ar')return;
 const v=active.verse+Number(delta);
 if(v>=1&&v<=counts[active.n-1]){audio.pause();playVerse(v);}
};
audio.addEventListener('play',()=>{$('hcqStatus').textContent='Playing';render();});
audio.addEventListener('pause',()=>{if(active?.lang!=='ar'&&audio.getAttribute('src'))$('hcqStatus').textContent='Paused';render();});
audio.addEventListener('waiting',()=>{$('hcqStatus').textContent='Buffering…';});
audio.addEventListener('error',()=>{$('hcqStatus').textContent='Audio unavailable · check internet';});
audio.addEventListener('ended',()=>{
 if(!active)return;
 if(active.verse>=counts[active.n-1]){$('hcqStatus').textContent='Surah complete';render();return;}
 playVerse(active.verse+1);
});
if(typeof attachGlobalMiniEvents==='function')attachGlobalMiniEvents(audio,'quran-meaning');
// Arabic surahs use the shared Sounds player. Synchronize this card on all playback changes.
for(const event of ['play','pause','ended','emptied','loadedmetadata'])soundLabAudio.addEventListener(event,render);
document.addEventListener('play',e=>{
 if(e.target!==audio&&e.target instanceof HTMLMediaElement&&!audio.paused)audio.pause();
},true);
$('hcqPlay').addEventListener('click',toggle);
$('hcqRead').addEventListener('click',()=>{if(typeof hcOpenQuranStudy==='function')hcOpenQuranStudy(number());});
panel.querySelectorAll('[data-hcq]').forEach(b=>b.addEventListener('click',()=>{
 if(lang===b.dataset.hcq)return;
 if(active?.lang!=='ar')clearMeaning();
 if(active?.lang==='ar'&&/^hcSurah\d+$/.test(currentSoundKey))soundLabAudio.pause();
 active=null;lang=b.dataset.hcq;try{localStorage.setItem('hcQuranHomeLanguageV1',lang)}catch(e){}
 $('hcqLive').hidden=true;render();
}));
$('hcqPrevious').addEventListener('click',()=>{manual=(index()+113)%114;render();});
$('hcqNext').addEventListener('click',()=>{manual=(index()+1)%114;render();});
$('hcqSelect').addEventListener('change',()=>{const i=order.indexOf(Number($('hcqSelect').value));if(i>=0){manual=i;render();$('hcqBrowse').open=false;}});
let lastStamp='';
function refresh(){const d=new Date(),stamp=[d.getFullYear(),d.getMonth(),d.getDate(),slot(d)].join('-');if(lastStamp===stamp)return;lastStamp=stamp;if(!active||audio.paused){manual=null;render();}}
refresh();render();setInterval(refresh,60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
window.addEventListener('focus',refresh);
})();