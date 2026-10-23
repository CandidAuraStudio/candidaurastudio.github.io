/* HeartClear: human-voiced Gita (18 chapters) and compact audio-first OM fallback.
No remixed/AI scripture voices. Credit and stream from original hosts only. */
(function(){
'use strict';
if(document.getElementById('hcGitaOriginalPanel'))return;
const sacred=document.getElementById('sacredDetail');
const root=sacred&&sacred.querySelector('.glass');
if(!root)return;
const labels={sa:'Sanskrit · संस्कृत',en:'English',hi:'Hindi · हिन्दी',ta:'Tamil · தமிழ்',ne:'Nepali · नेपाली',
te:'Telugu · తెలుగు',kn:'Kannada · ಕನ್ನಡ',ml:'Malayalam · മലയാളം',bn:'Bengali · বাংলা',
gu:'Gujarati · ગુજરાતી',mr:'Marathi · मराठी',de:'German',pa:'Punjabi',ur:'Urdu'};
const srcPages={
sa:'https://www.rkmathharipad.org/audio/bhajans/bhagvad-gita-chanting-mp3/',
en:'https://bhagavadgitaclass.com/bhagavad-gita-narration-in-english-by-his-holiness-purnachandra-goswami/',
hi:'https://bhagavadgitaclass.com/bhagavad-gita-narration-in-hindi-by-his-grace-savyasachi-prabhu/',
ta:'https://bhagavadgitaclass.com/bhagavad-gita-recitation-in-sanskrit-with-tamil-translations/'
};
const otherSource='https://yatharthgeeta.com/yatharth-geeta-audio/';
const nepaliSource='https://www.gitab.com.np/2019/04/the-bhagavad-gita-audio-book.html';
const names={sa:'Swami Devrupananda',en:'Purnachandra Goswami',hi:'Savyasachi Prabhu',ta:'Human-voiced Sanskrit with Tamil translations'};
const pad=n=>String(n).padStart(2,'0');
function url(lang,n){
 if(lang==='sa')return 'https://ramakrishnamath.in/Gita/BhagvadGitaChantingSwamiDevrupananda/'+pad(n)+'%20GITA%20CHAPTER%20%20'+n+'.mp3';
 if(lang==='en')return 'https://bhagavadgitaclass.com/wp-content/audio/Bhagavad-Gita-Narration/Bhagavad_Gita_Narration_in_English_by_HH_Purnachandra_Goswami/Bhagavad_Gita_Narration_Chapter-'+pad(n)+'_in_English_by_HH_Purnachandra_Goswami.mp3';
 if(lang==='hi')return 'https://bhagavadgitaclass.com/wp-content/audio/Bhagavad-Gita-Narration/Bhagavad_Gita_Narration_in_Hindi_by_HG_Savyasachi_Prabhu/Bhagavad_Gita_Narration_Chapter-'+pad(n)+'_in_Hindi_by_HG_Savyasachi_Prabhu.mp3';
 if(lang==='ta')return 'https://bhagavadgitaclass.com/wp-content/audio/Bhagavad-Gita-Recitation/Bhagavad_Gita_Recitation_in_Sanskrit_with_Tamil_Translations/Bhagavad_Gita_Recitation_Chapter-'+pad(n)+'_in_Sanskrit_with_Tamil_Translations.mp3';
 return '';
}
const omUrl='https://upload.wikimedia.org/wikipedia/commons/3/31/Om.ogg';
const omSource='https://commons.wikimedia.org/wiki/File:Om.ogg';
const omDrive='https://drive.google.com/file/d/11ogtK6FopRz-g8o-gHLY6-TV4fTJ5GjN/view';
const css=[
'#hcGitaOriginalPanel{max-width:100%;box-shadow:none!important}',
'#hcGitaOriginalPanel h3{font-size:16px}',
'#hcGitaOriginalPanel .hcg-caption{font-size:10px}',
'#hcGitaOriginalPanel #hcgNow{font-size:12px}',
'#hcGitaOriginalPanel .hcg-buttons button{min-height:39px}',
'#hcGitaOriginalPanel details.hcg-extras{border-top:1px solid #34424b;padding-top:8px;font-size:11px}',
'#hcGitaOriginalPanel .hcg-extras summary{cursor:pointer;color:#c8d7dd}',
'#hcGitaOriginalPanel[hidden]{display:none!important}',
'#hcGitaOriginalPanel{background:#0a0e11;border:1px solid #536069;border-radius:17px;color:#fff;padding:14px;margin:14px 0;display:grid;gap:10px}',
'#hcGitaOriginalPanel .hcg-row{display:flex;justify-content:space-between;align-items:center;gap:9px}',
'#hcGitaOriginalPanel h3{font-size:19px;margin:0}',
'#hcGitaOriginalPanel select{font:inherit;font-size:12px;max-width:70%;border:1px solid #53636d;border-radius:9px;background:#1c2931;color:white;padding:9px}',
'#hcGitaOriginalPanel button{font:inherit;border:1px solid #586971;border-radius:10px;background:#18252b;color:#fff;min-height:43px;padding:9px}',
'#hcGitaOriginalPanel .hcg-buttons{display:grid;grid-template-columns:1fr 1.35fr 1fr;gap:8px}',
'#hcGitaOriginalPanel .hcg-buttons button{font-weight:650;white-space:nowrap}',
'#hcGitaOriginalPanel .hcg-chapters{display:flex;justify-content:space-between;gap:8px;align-items:center}',
'#hcGitaOriginalPanel .hcg-chapters button{flex:1;min-width:0;font-size:12px}',
'#hcGitaOriginalPanel .hcg-seek-row{display:flex;align-items:center;gap:7px;font-size:11px;color:#cedbe0;font-variant-numeric:tabular-nums}',
'#hcGitaOriginalPanel .hcg-seek-row input{flex:1;min-width:0;width:100%;accent-color:#e1e9ee;cursor:pointer}',
'#hcGitaOriginalPanel .hcg-seek-row input:disabled{opacity:.45;cursor:default}',
'#hcGitaOriginalPanel button:disabled{opacity:.45;cursor:not-allowed}',
'#hcGitaOriginalPanel #hcgPlay{background:white;color:#101519;font-size:20px;font-weight:650}',
'#hcGitaOriginalPanel a{font-size:12px;color:#dceaf0;text-decoration:underline;text-underline-offset:3px}',
'#hcGitaOriginalPanel .hcg-caption{font-size:11px;line-height:1.5;color:#becbd0;margin:0}',
'#hcGitaOriginalPanel .hcg-internal{font-size:13px;font-weight:600}'
].join('\n');
const style=document.createElement('style');style.textContent=css;document.head.append(style);
const panel=document.createElement('section');panel.id='hcGitaOriginalPanel';panel.hidden=true;
panel.innerHTML='<div class="hcg-row"><h3 id="hcgHeader">Bhagavad Gita</h3><button type="button" id="hcgClose" aria-label="Close audio">×</button></div>'+
'<div class="hcg-row" id="hcgLangRow"><label for="hcgLang">Audio language</label><select id="hcgLang"></select></div>'+
'<div class="hcg-row" id="hcgChapterRow"><label for="hcgChapter">Chapter</label><select id="hcgChapter"></select></div>'+
'<div id="hcgNow" class="hcg-internal">Original human voice</div>'+
'<div class="hcg-buttons"><button id="hcgRewind" type="button" aria-label="Rewind 15 seconds">↶ 15s</button><button id="hcgPlay" type="button" aria-label="Play or pause">▶</button><button id="hcgForward" type="button" aria-label="Fast forward 15 seconds">15s ↷</button></div>'+ 
'<div class="hcg-seek-row"><span id="hcgElapsed">00:00</span><input id="hcgSeek" type="range" min="0" max="100" step="1" value="0" disabled aria-label="Seek to a different time in the chapter"><span id="hcgTotal">--:--</span></div>'+
'<div class="hcg-chapters"><button id="hcgPrev" type="button" aria-label="Previous chapter">‹ Previous chapter</button><button id="hcgNext" type="button" aria-label="Next chapter">Next chapter ›</button></div>'+
'<p id="hcgStatus" class="hcg-caption" role="status" aria-live="polite">Choose a recording</p>'+
'<details class="hcg-extras"><summary>Sources & details</summary><div style="display:grid;gap:8px;margin:9px 0"><a id="hcgSource" target="_blank" rel="noopener noreferrer">Original recording & credit ↗</a>'+
'<a id="hcgLongOm" target="_blank" rel="noopener noreferrer" href="'+omDrive+'" hidden>OM Chanting & Singing Bowls · Open original Drive recording ↗</a>'+
'<p id="hcgNotice" class="hcg-caption"></p></div></details>';
const shelf=document.getElementById('hcHinduScriptures');
if(shelf)shelf.insertAdjacentElement('beforebegin',panel);
else root.append(panel);
const el=id=>document.getElementById(id);
for(const [k,v] of Object.entries(labels)){const o=document.createElement('option');o.value=k;o.textContent=v;el('hcgLang').add(o)}
for(let n=1;n<=18;n++){const o=document.createElement('option');o.value=String(n);o.textContent='Chapter '+n;el('hcgChapter').add(o)}
let mode='gita',lang='sa',chapter=1,playing=false,src='',playToken=0;
try{const l=localStorage.getItem('hcGitaVoiceLang');if(labels[l])lang=l;const n=Number(localStorage.getItem('hcGitaVoiceChapter'));if(n>=1&&n<=18)chapter=n}catch(e){}
const audio=new Audio();audio.preload='none';audio.hidden=true;audio.playsInline=true;panel.append(audio);
function notice(txt){el('hcgStatus').textContent=txt}
function timeLabel(value){if(!Number.isFinite(value)||value<0)return '--:--';const t=Math.floor(value);return (t>=3600?String(Math.floor(t/3600))+':':'')+String(Math.floor(t/60)%60).padStart(2,'0')+':'+String(t%60).padStart(2,'0')}
function syncSeek(){
 const seek=el('hcgSeek'),length=Number(audio.duration),current=Number(audio.currentTime)||0;
 const ready=Number.isFinite(length)&&length>0&&mode!=='om';
 seek.disabled=!ready;
 seek.max=ready?String(Math.floor(length)):'100';
 seek.value=ready?String(Math.min(Math.floor(length),Math.max(0,Math.floor(current)))):'0';
 el('hcgElapsed').textContent=timeLabel(current);
 el('hcgTotal').textContent=ready?timeLabel(length):'--:--';
 el('hcgRewind').disabled=!ready;
 el('hcgForward').disabled=!ready;
}
function save(){try{localStorage.setItem('hcGitaVoiceLang',lang);localStorage.setItem('hcGitaVoiceChapter',String(chapter))}catch(e){}}
function stop(){++playToken;audio.pause();audio.removeAttribute('src');audio.load();src='';playing=false;el('hcgPlay').textContent='▶';syncSeek();if(typeof renderGlobalMini==='function')renderGlobalMini()}
function update(){
 el('hcgHeader').textContent=mode==='om'?'OM · Original voice':'Bhagavad Gita · Original voice';
 el('hcgLangRow').hidden=mode==='om';el('hcgChapterRow').hidden=mode==='om';
 el('hcgLang').value=lang;el('hcgChapter').value=String(chapter);
 el('hcgNow').textContent=mode==='om'?'OM pronunciation · 1.3 seconds':
  'Chapter '+chapter+' / 18 · '+labels[lang]+' · '+(names[lang]||'official audio provider');
 const isPlayable=mode==='om'||!!url(lang,chapter);
 el('hcgPrev').disabled=!isPlayable||mode==='om'||chapter===1;
 el('hcgNext').disabled=!isPlayable||mode==='om'||chapter===18;
 el('hcgPlay').setAttribute('aria-label',isPlayable?'Play or pause original recording':'Open human-voiced recording at publisher');
 el('hcgSource').href=mode==='om'?omSource:(lang==='ne'?nepaliSource:(srcPages[lang]||otherSource));
 el('hcgSource').textContent=mode==='om'?'Source & CC0 licence ↗':(isPlayable?'Original source & credit ↗':'Listen in '+labels[lang]+' at source ↗');
 el('hcgLongOm').hidden=mode!=='om';
 el('hcgNotice').textContent=mode==='om'?'The licensed pronunciation is short; it is not the long singing-bowls session. The original long recording opens in Google Drive.':
  (isPlayable?'Next automatically follows the 18 Gita chapters. Streams original human recordings.':
  'This language has no verified direct MP3 playlist yet, so playback is unavailable.');
 el('hcgPlay').textContent=playing?'Ⅱ':'▶';
 syncSeek();
 if(!isPlayable)notice('Tap the source link for '+labels[lang]+' voice recordings.');
}
function exclusivity(){
 try{window.speechSynthesis?.cancel()}catch(e){}
 try{if(typeof hcMixStop==='function'&&(hcMixRunning||hcMixStarting||hcMixDecks.length))hcMixStop(false)}catch(e){}
 document.querySelectorAll('audio,video').forEach(a=>{if(!a.paused)try{a.pause()}catch(e){}});
}
async function play(){
 if(!panel.hidden&&mode!=='om'&&!url(lang,chapter)){notice(labels[lang]+' audio is not connected yet. Choose Tamil, Sanskrit, English or Hindi to listen here.');return}
 const wanted=mode==='om'?omUrl:url(lang,chapter);
 if(!wanted)return;
 if(!audio.paused&&src===wanted){audio.pause();return}
 if(src!==wanted){stop();exclusivity();src=wanted;audio.src=wanted;audio.load()}
 const ticket=++playToken;notice('Opening original human recording…');
 try{await audio.play();if(ticket===playToken){playing=true;el('hcgPlay').textContent='Ⅱ';notice('Playing original recording');try{localStorage.setItem('heartclearActiveMedia','gita')}catch(e){};if(typeof renderGlobalMini==='function')renderGlobalMini();}}
 catch(e){if(ticket===playToken){playing=false;el('hcgPlay').textContent='▶';notice('Source unavailable inside HC. Open the original recording using the link below.');}}
}
function jump(seconds){
 if(!audio.getAttribute('src')){notice('Start the recording to seek within a chapter.');return false}
 const secondsLong=Number(audio.duration);
 if(!Number.isFinite(secondsLong)||secondsLong<=0){notice('Waiting for the chapter duration.');return false}
 try{
  const target=Math.max(0,Math.min(secondsLong,Number(audio.currentTime||0)+Number(seconds)));
  audio.currentTime=target;
  syncSeek();if(typeof renderGlobalMini==='function')renderGlobalMini();
  return true;
 }catch(e){notice('This recording does not support seeking at the moment.');return false}
}
function next(direction){
 if(mode!=='gita'||!url(lang,chapter))return;
 const newChapter=Math.max(1,Math.min(18,chapter+direction));
 if(newChapter===chapter){stop();notice('End of the collection.');return}
 chapter=newChapter;save();stop();update();play();
}
function open(which='gita',n){
 stop();if(typeof openSacred==='function')openSacred('hindu');
 mode=which==='om'?'om':'gita';
 if(Number.isInteger(n)&&n>0&&n<=18)chapter=n;
 panel.hidden=false;update();notice(mode==='om'?'Tap Play for the OM syllable. The full original is linked below.':'Tap Play or choose a chapter.');
 panel.scrollIntoView({behavior:'smooth',block:'center'});
}
el('hcgLang').addEventListener('change',()=>{stop();lang=el('hcgLang').value;save();update()});
el('hcgChapter').addEventListener('change',()=>{stop();chapter=Number(el('hcgChapter').value)||1;save();update()});
el('hcgRewind').addEventListener('click',()=>jump(-15));
el('hcgForward').addEventListener('click',()=>jump(15));
el('hcgSeek').addEventListener('input',event=>{
 const to=Number(event.target.value);if(Number.isFinite(to)&&audio.getAttribute('src')&&Number.isFinite(audio.duration)){
  try{audio.currentTime=Math.min(Math.max(0,to),audio.duration);syncSeek()}catch(e){notice('Seeking is not available yet.')}
 }
});
el('hcgPrev').addEventListener('click',()=>next(-1));
el('hcgNext').addEventListener('click',()=>next(1));
el('hcgPlay').addEventListener('click',play);
el('hcgClose').addEventListener('click',()=>{stop();panel.hidden=true});
audio.addEventListener('pause',()=>{playing=false;el('hcgPlay').textContent='▶';if(typeof renderGlobalMini==='function')renderGlobalMini()});
audio.addEventListener('play',()=>{playing=true;el('hcgPlay').textContent='Ⅱ';try{localStorage.setItem('heartclearActiveMedia','gita')}catch(e){};if(typeof renderGlobalMini==='function')renderGlobalMini()});
audio.addEventListener('ended',()=>{playing=false;if(mode==='gita'&&chapter<18&&url(lang,chapter))next(1);else{stop();notice('Finished.')}});
audio.addEventListener('loadedmetadata',syncSeek);
audio.addEventListener('durationchange',syncSeek);
audio.addEventListener('seeked',syncSeek);
audio.addEventListener('timeupdate',()=>{syncSeek();if(typeof renderGlobalMini==='function')renderGlobalMini()});
audio.addEventListener('error',()=>{playing=false;el('hcgPlay').textContent='▶';notice('Cannot play this audio stream. Use the original source link.');});
document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement&&event.target!==audio&&!audio.paused)audio.pause()},true);
window.hcGitaPlayerState=()=>{
 if(!audio.getAttribute('src'))return null;
 return {key:'gita',el:audio,title:mode==='om'?'OM · Voice':'Bhagavad Gita · '+labels[lang]+' · Chapter '+chapter,
 meta:mode==='om'?'OM · audio':'Gita · '+chapter+' / 18 · '+(typeof fmt==='function'?fmt(audio.currentTime||0):''),
 screen:'sacredDetail'};
};
window.hcGitaStep=direction=>next(direction);
window.hcGitaJump=seconds=>jump(seconds);
window.hcGitaStop=()=>{stop();try{localStorage.removeItem('heartclearActiveMedia')}catch(e){};if(typeof renderGlobalMini==='function')renderGlobalMini()};
window.hcOpenGitaVoice=(chapterNum,language)=>{if(language&&labels[language])lang=language;open('gita',chapterNum)};
window.hcOpenOmVoice=()=>open('om');
const previous=window.openHcDriveMedia;
if(typeof previous==='function')window.openHcDriveMedia=function(key,from){if(key==='hinduOm'){open('om');return}return previous.call(this,key,from)};
window.addEventListener('pagehide',stop);
update();
})();