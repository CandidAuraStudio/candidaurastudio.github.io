/* HeartClear: human-voiced Gita (18 chapters) and compact audio-first OM fallback.
No remixed/AI scripture voices. Credit and stream from original hosts only. */
(function(){
'use strict';
if(document.getElementById('hcGitaOriginalPanel'))return;
const sacred=document.getElementById('sacredDetail');
const root=sacred&&sacred.querySelector('.glass');
if(!root)return;
const labels={sa:'Sanskrit · संस्कृत',en:'English',hi:'Hindi · हिन्दी',ta:'Tamil · தமிழ்',
te:'Telugu · తెలుగు',kn:'Kannada · ಕನ್ನಡ',ml:'Malayalam · മലയാളം',bn:'Bengali · বাংলা',
gu:'Gujarati · ગુજરાતી',mr:'Marathi · मराठी',de:'German',pa:'Punjabi',ur:'Urdu'};
const srcPages={
sa:'https://www.rkmathharipad.org/audio/bhajans/bhagvad-gita-chanting-mp3/',
en:'https://bhagavadgitaclass.com/bhagavad-gita-narration-in-english-by-his-holiness-purnachandra-goswami/',
hi:'https://bhagavadgitaclass.com/bhagavad-gita-narration-in-hindi-by-his-grace-savyasachi-prabhu/',
ta:'https://yatharthgeeta.com/yatharth-geeta-audio/yatharth-geeta-audio-tamil/'
};
const otherSource='https://yatharthgeeta.com/yatharth-geeta-audio/';
const names={sa:'Swami Devrupananda',en:'Purnachandra Goswami',hi:'Savyasachi Prabhu'};
const pad=n=>String(n).padStart(2,'0');
function url(lang,n){
 if(lang==='sa')return 'https://ramakrishnamath.in/Gita/BhagvadGitaChantingSwamiDevrupananda/'+pad(n)+'%20GITA%20CHAPTER%20%20'+n+'.mp3';
 if(lang==='en')return 'https://bhagavadgitaclass.com/wp-content/audio/Bhagavad-Gita-Narration/Bhagavad_Gita_Narration_in_English_by_HH_Purnachandra_Goswami/Bhagavad_Gita_Narration_Chapter-'+pad(n)+'_in_English_by_HH_Purnachandra_Goswami.mp3';
 if(lang==='hi')return 'https://bhagavadgitaclass.com/wp-content/audio/Bhagavad-Gita-Narration/Bhagavad_Gita_Narration_in_Hindi_by_HG_Savyasachi_Prabhu/Bhagavad_Gita_Narration_Chapter-'+pad(n)+'_in_Hindi_by_HG_Savyasachi_Prabhu.mp3';
 return '';
}
const omUrl='https://upload.wikimedia.org/wikipedia/commons/3/31/Om.ogg';
const omSource='https://commons.wikimedia.org/wiki/File:Om.ogg';
const omDrive='https://drive.google.com/file/d/11ogtK6FopRz-g8o-gHLY6-TV4fTJ5GjN/view';
const css=[
'#hcGitaOriginalPanel[hidden]{display:none!important}',
'#hcGitaOriginalPanel{background:#0a0e11;border:1px solid #536069;border-radius:17px;color:#fff;padding:14px;margin:14px 0;display:grid;gap:10px}',
'#hcGitaOriginalPanel .hcg-row{display:flex;justify-content:space-between;align-items:center;gap:9px}',
'#hcGitaOriginalPanel h3{font-size:19px;margin:0}',
'#hcGitaOriginalPanel select{font:inherit;font-size:12px;max-width:70%;border:1px solid #53636d;border-radius:9px;background:#1c2931;color:white;padding:9px}',
'#hcGitaOriginalPanel button{font:inherit;border:1px solid #586971;border-radius:10px;background:#18252b;color:#fff;min-height:43px;padding:9px}',
'#hcGitaOriginalPanel .hcg-buttons{display:grid;grid-template-columns:1fr 2fr 1fr;gap:8px}',
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
'<div class="hcg-buttons"><button id="hcgPrev" aria-label="Previous chapter">⏮</button><button id="hcgPlay" aria-label="Play or pause">▶</button><button id="hcgNext" aria-label="Next chapter">⏭</button></div>'+
'<p id="hcgStatus" class="hcg-caption" role="status" aria-live="polite">Choose a recording</p>'+
'<a id="hcgSource" target="_blank" rel="noopener noreferrer">Original recording & credit ↗</a>'+
'<a id="hcgLongOm" target="_blank" rel="noopener noreferrer" href="'+omDrive+'" hidden>OM Chanting & Singing Bowls · Open original Drive recording ↗</a>'+
'<p id="hcgNotice" class="hcg-caption"></p>';
const shelf=document.getElementById('hcHinduScriptures');
if(shelf)shelf.insertAdjacentElement('beforebegin',panel);
else root.append(panel);
const el=id=>document.getElementById(id);
for(const [k,v] of Object.entries(labels)){const o=document.createElement('option');o.value=k;o.textContent=v;el('hcgLang').add(o)}
for(let n=1;n<=18;n++){const o=document.createElement('option');o.value=String(n);o.textContent='Chapter '+n;el('hcgChapter').add(o)}
let mode='gita',lang='sa',chapter=1,playing=false,src='',playToken=0;
try{const l=localStorage.getItem('hcGitaVoiceLang');if(labels[l])lang=l;const n=Number(localStorage.getItem('hcGitaVoiceChapter'));if(n>=1&&n<=18)chapter=n}catch(e){}
const audio=new Audio();audio.preload='none';
function notice(txt){el('hcgStatus').textContent=txt}
function save(){try{localStorage.setItem('hcGitaVoiceLang',lang);localStorage.setItem('hcGitaVoiceChapter',String(chapter))}catch(e){}}
function stop(){++playToken;audio.pause();audio.removeAttribute('src');audio.load();src='';playing=false;el('hcgPlay').textContent='▶'}
function update(){
 el('hcgHeader').textContent=mode==='om'?'OM · Original voice':'Bhagavad Gita · Original voice';
 el('hcgLangRow').hidden=mode==='om';el('hcgChapterRow').hidden=mode==='om';
 el('hcgLang').value=lang;el('hcgChapter').value=String(chapter);
 el('hcgNow').textContent=mode==='om'?'OM pronunciation · 1.3 seconds':
  'Chapter '+chapter+' / 18 · '+labels[lang]+' · '+(names[lang]||'official audio provider');
 const isPlayable=mode==='om'||!!url(lang,chapter);
 el('hcgPrev').disabled=!isPlayable;
 el('hcgNext').disabled=!isPlayable;
 el('hcgSource').href=mode==='om'?omSource:(srcPages[lang]||otherSource);
 el('hcgSource').textContent=mode==='om'?'Source & CC0 licence ↗':(isPlayable?'Original source & credit ↗':'Listen in '+labels[lang]+' at source ↗');
 el('hcgLongOm').hidden=mode!=='om';
 el('hcgNotice').textContent=mode==='om'?'The licensed pronunciation is short; it is not the long singing-bowls session. The original long recording opens in Google Drive.':
  (isPlayable?'At the end of each chapter, the next starts automatically when the source permits. These human recordings are streamed, not copied.':
  'Authentic spoken audio is available on the provider website. Direct MP3s are not verified here, so automatic Next is not available in this language yet.');
 el('hcgPlay').textContent=playing?'Ⅱ':'▶';
 if(!isPlayable)notice('Tap the source link for '+labels[lang]+' voice recordings.');
}
function exclusivity(){
 try{window.speechSynthesis?.cancel()}catch(e){}
 try{if(typeof hcMixStop==='function'&&(hcMixRunning||hcMixStarting||hcMixDecks.length))hcMixStop(false)}catch(e){}
 document.querySelectorAll('audio,video').forEach(a=>{if(!a.paused)try{a.pause()}catch(e){}});
}
async function play(){
 if(!panel.hidden&&mode!=='om'&&!url(lang,chapter)){notice('Choose “Listen at source” for this language.');return}
 const wanted=mode==='om'?omUrl:url(lang,chapter);
 if(!wanted)return;
 if(!audio.paused&&src===wanted){audio.pause();return}
 if(src!==wanted){stop();exclusivity();src=wanted;audio.src=wanted;audio.load()}
 const ticket=++playToken;notice('Opening original human recording…');
 try{await audio.play();if(ticket===playToken){playing=true;el('hcgPlay').textContent='Ⅱ';notice('Playing original recording');}}
 catch(e){if(ticket===playToken){playing=false;el('hcgPlay').textContent='▶';notice('Source unavailable inside HC. Open the original recording using the link below.');}}
}
function next(direction){
 if(mode!=='gita'||!url(lang,chapter))return;
 const newChapter=Math.max(1,Math.min(18,chapter+direction));
 if(newChapter===chapter){stop();notice('End of the collection.');return}
 chapter=newChapter;save();stop();update();play();
}
function open(which='gita',n){
 stop();mode=which==='om'?'om':'gita';
 if(Number.isInteger(n)&&n>0&&n<=18)chapter=n;
 panel.hidden=false;update();notice(mode==='om'?'Tap Play for the OM syllable. The full original is linked below.':'Tap Play or choose a chapter.');
 panel.scrollIntoView({behavior:'smooth',block:'center'});
}
el('hcgLang').addEventListener('change',()=>{stop();lang=el('hcgLang').value;save();update()});
el('hcgChapter').addEventListener('change',()=>{stop();chapter=Number(el('hcgChapter').value)||1;save();update()});
el('hcgPrev').addEventListener('click',()=>next(-1));
el('hcgNext').addEventListener('click',()=>next(1));
el('hcgPlay').addEventListener('click',play);
el('hcgClose').addEventListener('click',()=>{stop();panel.hidden=true});
audio.addEventListener('pause',()=>{playing=false;el('hcgPlay').textContent='▶'});
audio.addEventListener('ended',()=>{playing=false;if(mode==='gita'&&chapter<18&&url(lang,chapter))next(1);else{stop();notice('Finished.')}});
audio.addEventListener('error',()=>{playing=false;el('hcgPlay').textContent='▶';notice('Cannot play this audio stream. Use the original source link.');});
document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement&&event.target!==audio&&!audio.paused)audio.pause()},true);
window.hcOpenGitaVoice=chapterNum=>open('gita',chapterNum);
window.hcOpenOmVoice=()=>open('om');
const previous=window.openHcDriveMedia;
if(typeof previous==='function')window.openHcDriveMedia=function(key,from){if(key==='hinduOm'){open('om');return}return previous.call(this,key,from)};
window.addEventListener('pagehide',stop);
update();
})();