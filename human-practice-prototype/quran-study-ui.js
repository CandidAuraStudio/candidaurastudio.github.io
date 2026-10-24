/* HeartClear independent Quran study UI. Arabic is provided separately. All private verse notes stay local. */
(function hcQuranStudyBootstrap(){
"use strict";
const data=window.HC_QURAN_STUDY_DATA;
const annotations=window.HC_QURAN_REFLECTIONS||{};
const root=document.getElementById("hcQuranStudyRoot");
if(!root||!data||!Array.isArray(data.chapters))return;
const KEY="heartclearQuranPrivateReflectionsV1",LANG_KEY="heartclearQuranStudyLanguageV1",POSITION_KEY="heartclearQuranReadingPositionV1";
// The original offline four-chapter Arabic corpus remains unchanged.
const offlineChapters=new Map(data.chapters.map(c=>[c.number,c]));
const liveTranslations=new Map();
let chapterLoading=false,requestSequence=0,directoryRequested=false;
const SOURCE_NAME="QuranEnc · English: Noor International Center v1.1.2; Tamil: Omar Sharif v1.0.3";
const QURANENC_API="https://quranenc.com/api/v1/";
data.chapters=Array.from({length:114},(_,i)=>offlineChapters.get(i+1)||{
 number:i+1,name:{en:"Surah "+(i+1),ta:""},verseCount:0,bismillah:"",verses:[]
});
async function quranSourceJson(url){
 const res=await fetch(url,{headers:{Accept:"application/json"}});
 if(!res.ok)throw Error("Source unavailable "+res.status);
 return res.json();
}
async function hcLoadQuranDirectory(){
 if(directoryRequested)return;
 directoryRequested=true;
 try{
  const result=await quranSourceJson("https://api.alquran.cloud/v1/surah");
  for(const item of result.data||[]){
   const number=Number(item.number),ch=data.chapters[number-1];
   if(!ch||ch.number!==number)continue;
   ch.name.en=String(item.englishName||ch.name.en);
   ch.name.ar=String(item.name||"");
   ch.verseCount=Number(item.numberOfAyahs)||ch.verses.length;
  }
  render();
 }catch(e){ /* Offline: keep the existing four surahs and source links for all others. */ }
}
async function hcLoadQuranChapter(n){
 const seq=++requestSequence,ch=data.chapters[n-1];if(!ch)return;
 chapterLoading=true;render();
 const tasks=[];
 if(!ch.verses.length)tasks.push(quranSourceJson("https://api.alquran.cloud/v1/surah/"+n+"/quran-uthmani").then(json=>{
  if(seq!==requestSequence)return;
  const ayahs=json?.data?.ayahs;
  if(!Array.isArray(ayahs)||!ayahs.length)throw Error("No Arabic verses");
  ch.verses=ayahs.map((a,i)=>({ref:n+":"+(i+1),arabic:String(a.text||"")}));
  ch.verseCount=ch.verses.length;
 }));
 for(const [lang,edition] of [["en","english_saheeh"],["ta","tamil_omar"]]){
  if(liveTranslations.has(n+":"+lang))continue;
  tasks.push(quranSourceJson(QURANENC_API+"translation/sura/"+edition+"/"+n).then(response=>{
   const items=Array.isArray(response)?response:(Array.isArray(response?.result)?response.result:response?.data);
   if(!Array.isArray(items))throw Error("Unknown translation response");
   const values=new Map();
   for(const entry of items){
    const verse=Number(entry.aya||entry.ayah||entry.verse_number);
    if(verse>0&&typeof entry.translation==="string")values.set(n+":"+verse,entry.translation);
   }
   if(!values.size)throw Error("Empty translation");
   liveTranslations.set(n+":"+lang,values);
  }));
 }
 if(tasks.length)await Promise.allSettled(tasks);
 if(seq!==requestSequence)return;
 chapterLoading=false;render();
}

const fetchLocal=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||"null")||fallback}catch(e){return fallback}};
const saved=fetchLocal(POSITION_KEY,{});
const state={chapter:Number(saved.chapter)||1,start:Number(saved.start)||1,activeRef:"",language:fetchLocal(LANG_KEY,"both"),audioLanguage:fetchLocal("hcQuranReaderAudioLang","ar"),notes:fetchLocal(KEY,{})};
if(!["en","ta","both"].includes(state.language))state.language="both";
if(!["ar","en","ta"].includes(state.audioLanguage))state.audioLanguage="ar";
const clean=str=>String(str??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const bilingual=(en,ta)=>`<span class="hcqs-en">${clean(en)}</span><span class="hcqs-ta" lang="ta">${clean(ta)}</span>`;
const chunkSize=3;
const getChapter=()=>data.chapters.find(x=>x.number===state.chapter)||data.chapters[0];
const updatePosition=()=>{try{localStorage.setItem(POSITION_KEY,JSON.stringify({chapter:state.chapter,start:state.start}))}catch(e){}};
const qsName=ch=>clean(ch.name.en)+(ch.name.ta?" · "+clean(ch.name.ta):"");
const statusLabel=status=>({
"direct-conversation-review":"From your discussion · review wording",
"prior-discussion-review":"Earlier discussion · approval pending",
"book-inspired-review":"Book-inspired interpretation · approval pending",
"editorial-prompt":"Editorial question · not your confirmed reflection"
})[status]||"Reflection draft";
function saveNotes(){
 try{localStorage.setItem(KEY,JSON.stringify(state.notes));return true}catch(e){return false}
}
function getMeaning(ref){
 const ch=Number(ref.split(":")[0]);
 const liveEn=liveTranslations.get(ch+":en")?.get(ref),liveTa=liveTranslations.get(ch+":ta")?.get(ref);
 const local=data.meaning?.[ref];
 const en=liveEn||local?.en||"Translation unavailable. See source link.";
 const ta=liveTa||local?.ta||"மொழிபெயர்ப்பு கிடைக்கவில்லை. மூல இணைப்பைப் பார்க்கவும்.";
 const enCaption=liveEn?"English · QuranEnc 1.1.2":local?.en?"English · local meaning draft":"English · unavailable";
 const taCaption=liveTa?"தமிழ் · QuranEnc 1.0.3":local?.ta?"தமிழ் · உள்ளூர் பொருள் வரைவு":"தமிழ் · கிடைக்கவில்லை";
 return '<div class="hcqs-translation-columns">'+
 '<section class="hcqs-en hcqs-translation-col" lang="en"><strong>'+clean(enCaption)+'</strong><p>'+clean(en)+'</p></section>'+
 '<section class="hcqs-ta hcqs-translation-col" lang="ta"><strong>'+clean(taCaption)+'</strong><p>'+clean(ta)+'</p></section></div>';
}
function verseCard(v){
 const note=annotations.notes?.[v.ref],n=state.notes?.[v.ref],active=state.activeRef===v.ref;
 const start=Number(v.ref.split(":")[1]);
 return `<article class="hcqs-verse" id="hcqs-verse-${v.ref.replace(":","-")}">
  <div class="hcqs-verse-head"><strong>${clean(v.ref)}</strong><button type="button" class="hcqs-verse-play" data-qs-action="verse-play" data-qs-verse="${start}">▶ ${state.language==="ta"?"பொருள் கேள்":"Hear meaning"}</button></div>
  <p class="hcqs-arabic" dir="rtl" lang="ar">${clean(v.arabic)}</p>
  <div class="hcqs-subhead">${bilingual("Meaning","பொருள்")}</div>
  <div class="hcqs-meaning">${getMeaning(v.ref)}</div>
  ${note?`<div class="hcqs-editorial"><div class="hcqs-source-label">Author's reflection · ${clean(statusLabel(note.status))} · not Qur'anic verse</div><strong>${bilingual(note.headline.en,note.headline.ta)}</strong><div>${bilingual(note.text.en,note.text.ta)}</div><small>${clean(note.source||"")}</small><small>Separate personal application — not Qur'anic text or certified tafsir.</small></div>`:""}
  ${n?.text?`<div class="hcqs-private-note"><strong>${bilingual("Your private reflection","உங்கள் தனிப்பட்ட சிந்தனை")}</strong><p>${clean(n.text)}</p><small>Saved only in this browser · ${clean(n.updated||"")}</small></div>`:""}
  <button type="button" class="hcqs-edit" data-qs-action="edit" data-qs-ref="${clean(v.ref)}">${bilingual(n?.text?"Edit reflection":"Reflect",n?.text?"சிந்தனையைத் திருத்து":"சிந்தனை எழுது")}</button>
  ${active?`<div class="hcqs-editor" data-ref="${clean(v.ref)}"><label for="hcqs-my-note">${bilingual("My reflection · private on this device","என் சிந்தனை · இந்தச் சாதனத்தில் மட்டும்")}</label><textarea id="hcqs-my-note" rows="5" maxlength="3500" placeholder="What does this verse make you question about awareness, habit, society or intention? / இந்த வசனம் உங்களை என்ன சிந்திக்கச் செய்கிறது?">${clean(n?.text||"")}</textarea><div class="hcqs-editor-actions"><button type="button" data-qs-action="save" data-qs-ref="${clean(v.ref)}">Save locally / சேமி</button><button type="button" class="hcqs-cancel" data-qs-action="cancel">Cancel</button></div></div>`:""}
 </article>`;
}
function render(){
 const ch=getChapter(),total=ch.verses.length||ch.verseCount||1;
 state.start=Math.max(1,Math.min(total,Math.floor((state.start-1)/chunkSize)*chunkSize+1));
 updatePosition();
 const min=state.start,max=Math.min(total,min+chunkSize-1);
 const ready=ch.verses.filter(v=>liveTranslations.get(ch.number+":en")?.has(v.ref)&&liveTranslations.get(ch.number+":ta")?.has(v.ref)).length;
 const draftCount=ch.verses.filter(v=>annotations.notes?.[v.ref]).length;
 const savedCount=ch.verses.filter(v=>state.notes?.[v.ref]?.text).length;
 const highlights={2:[1,2,144,156,170],4:[1,135],41:[20,34,53],114:[4,5,6]}[ch.number]||[];
 const links=highlights.map(n=>`<button type="button" data-qs-action="jump" data-qs-num="${n}">${ch.number}:${n}${state.notes[`${ch.number}:${n}`]?.text?" ★":""}</button>`).join("");
 root.innerHTML=`<div class="hcqs-header">
  <div class="kicker">Qur’an · Read</div>
  <h2>${bilingual("Read & reflect","ஓதுதல் · சிந்தித்தல்")}</h2>
  <p>${bilingual("Arabic · English · Tamil","அரபு · ஆங்கிலம் · தமிழ்")}</p>
  <div class="hcqs-language" role="group" aria-label="Meaning language">
   <button data-qs-action="lang" data-qs-lang="both" aria-pressed="${state.language==="both"}">Both / இரண்டும்</button>
   <button data-qs-action="lang" data-qs-lang="ta" aria-pressed="${state.language==="ta"}">தமிழ்</button>
   <button data-qs-action="lang" data-qs-lang="en" aria-pressed="${state.language==="en"}">English</button>
  </div>
  <div class="hcqs-picker"><label for="hcqs-surah-select">Choose from all 114 surahs · 114 ஸூராக்கள்</label><select id="hcqs-surah-select" aria-label="Select surah">${data.chapters.map(x=>`<option value="${x.number}" ${state.chapter===x.number?"selected":""}>${x.number} · ${qsName(x)}</option>`).join("")}</select></div>
  <details class="hcqs-guide-details"><summary>About this reader</summary><p class="hcqs-caution">${bilingual("114 surahs are selectable. Arabic and licensed translations load online. Some passages may be unavailable offline. Author reflections are separately labelled.","114 ஸூராக்கள். அரபு, மொழிபெயர்ப்புகள் இணையத்திலிருந்து ஏற்றப்படும். ஆசிரியர் சிந்தனைகள் தனியே காட்டப்படும்.")}</p></details>
 </div>
 <div class="hcqs-summary"><h3>${qsName(ch)}</h3><p>${ch.verseCount||ch.verses.length||"—"} ${state.language==="ta"?"வசனங்கள்":"verses"}${savedCount?" · "+savedCount+" saved reflections":""}</p>
 <p class="hcqs-bismillah" lang="ar" dir="rtl">${clean(ch.bismillah)}</p></div>
 <section class="hcqs-audio-player" role="region" aria-label="Qur'an audio">
  <div class="hcqs-audio-top"><strong>Qur’an audio · குர்ஆன் ஒலி</strong><span id="hcqs-audio-status" role="status">Ready</span></div>
  <div class="hcqs-audio-langs" role="group" aria-label="Listening language">
   <button data-qs-action="audio-lang" data-qs-lang="ar" aria-pressed="${state.audioLanguage==="ar"}">العربية</button>
   <button data-qs-action="audio-lang" data-qs-lang="en" aria-pressed="${state.audioLanguage==="en"}">English</button>
   <button data-qs-action="audio-lang" data-qs-lang="ta" aria-pressed="${state.audioLanguage==="ta"}">தமிழ்</button>
  </div>
  <div class="hcqs-audio-controls">
   <button id="hcqs-audio-toggle" data-qs-action="audio-toggle">▶ Play</button>
   <button id="hcqs-audio-prev" data-qs-action="audio-prev">‹ Verse</button>
   <span id="hcqs-audio-verse">Surah</span>
   <button id="hcqs-audio-next" data-qs-action="audio-next">Verse ›</button>
  </div>
  <input id="hcqs-audio-progress" type="range" min="0" max="1000" value="0" disabled aria-label="Audio progress">
  <div class="hcqs-audio-foot"><span id="hcqs-audio-time">0:00 / 0:00</span><span>Arabic recitation · English / Tamil spoken meanings</span></div>
 </section>
 ${links?`<details class="hcqs-guide-details hcqs-highlights"><summary>${bilingual("Earlier reflections","முந்தைய சிந்தனைகள்")}</summary><div>${links}</div></details>`:""}
 <div class="hcqs-pager"><button data-qs-action="prev" ${min===1?"disabled":""}>‹ ${state.language==="ta"?"முந்தையவை":"Previous"}</button><span>${min}–${max} / ${total}</span><button data-qs-action="next" ${max===total?"disabled":""}>${state.language==="ta"?"அடுத்தவை":"Next"} ›</button></div>
 <div class="hcqs-verses">${chapterLoading?'<p class="hcqs-load-status" role="status">Loading Qur’an sources… · அரபு, தமிழ், ஆங்கிலம் ஏற்றப்படுகிறது…</p>':""}${ch.verses.length?ch.verses.slice(min-1,max).map(verseCard).join(""):'<div class="hcqs-load-status">Arabic source is not currently available. <a href="https://quran.com/'+ch.number+'" target="_blank" rel="noopener noreferrer">Read the chapter at Quran.com ↗</a></div>'}</div>
 <div class="hcqs-pager"><button data-qs-action="prev" ${min===1?"disabled":""}>‹ Previous</button><span>${min}–${max} / ${total}</span><button data-qs-action="next" ${max===total?"disabled":""}>Next ›</button></div>
 <div class="hcqs-jump"><label for="hcqs-verse-number">${bilingual("Go directly to verse number","நேரடியாக வசன எண்ணுக்குச் செல்லவும்")}</label><input id="hcqs-verse-number" inputmode="numeric" type="number" min="1" max="${total}" value="${min}" aria-label="Verse number"><button data-qs-action="jumpinput">Go / செல்</button></div>
 <details class="hcqs-guide-details hcqs-private-tools"><summary>${bilingual("Backup & sources","காப்பு மற்றும் ஆதாரங்கள்")}</summary><h3>${bilingual("Private notes","தனிப்பட்ட குறிப்புகள்")}</h3><p>${bilingual("Personal notes stay in this browser only. They are not uploaded, shared, or automatically added to the public lesson. Export a backup before clearing app data or changing phones.","தனிப்பட்ட குறிப்புகள் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். அவை பகிரப்படவோ பொதுப் பாடத்தில் தானாகச் சேர்க்கப்படவோ மாட்டாது. சாதனத்தை மாற்றுவதற்கு முன் காப்புப் பிரதி சேமிக்கவும்.")}</p>
 <button data-qs-action="export">Export private notes / குறிப்புகளை ஏற்றுமதி செய்</button>
 <label class="hcqs-import-label" for="hcqs-import">Import your saved notes / குறிப்புகளை இறக்குமதி செய்</label><input type="file" id="hcqs-import" accept="application/json,.json">
 <div class="hcqs-license">${clean(data.arabicAttribution)}. English/Tamil translation provider: ${clean(SOURCE_NAME)}. QuranEnc translations are displayed without editorial rewriting; updates, versions and corrections belong to that source. Separate author reflections are not Qur'anic verses or certified tafsir. <a href="https://quran.com" target="_blank" rel="noopener noreferrer">Verify Qur'anic text and translations at Quran.com ↗</a></div>
 </details>`;
 const section=document.getElementById("hcQuranStudy");if(section)section.dataset.qsLanguage=state.language;
 syncReaderAudio();
}

function qsClock(t){const s=Math.max(0,Math.floor(Number(t)||0)),m=Math.floor(s/60);return (m>=60?Math.floor(m/60)+":"+String(m%60).padStart(2,"0"):m)+":"+String(s%60).padStart(2,"0");}
function syncReaderAudio(){
 const p=root.querySelector(".hcqs-audio-player");if(!p)return;
 const current=window.hcQuranReaderState?.();
 const a=current?.chapter===state.chapter&&current.language===state.audioLanguage?current:null;
 const playing=!!a?.playing,isMeaning=state.audioLanguage!=="ar";
 p.querySelectorAll("[data-qs-action=audio-lang]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.qsLang===state.audioLanguage)));
 p.querySelector("#hcqs-audio-status").textContent=a?.error?"Unavailable · check internet":playing?"Playing":a?"Paused":"Ready";
 const btn=p.querySelector("#hcqs-audio-toggle");btn.textContent=playing?"Ⅱ Pause":a?"▶ Resume":"▶ Play";btn.setAttribute("aria-pressed",String(playing));
 const verse=a?.verse||1,total=getChapter().verseCount||getChapter().verses.length;
 p.querySelector("#hcqs-audio-verse").textContent=isMeaning?verse+" / "+(total||"—"):"Surah";
 const prev=p.querySelector("#hcqs-audio-prev"),next=p.querySelector("#hcqs-audio-next");
 prev.hidden=next.hidden=!isMeaning;prev.disabled=!a||verse<=1;next.disabled=!a||!total||verse>=total;
 const dur=Number(a?.duration)||0,sec=Number(a?.seconds)||0,slider=p.querySelector("#hcqs-audio-progress");
 slider.disabled=!a||!(dur>0);if(!slider.matches(":active"))slider.value=dur>0?Math.round(1000*Math.min(1,sec/dur)):0;
 p.querySelector("#hcqs-audio-time").textContent=qsClock(sec)+" / "+qsClock(dur);
}
function qsPlay(verse=0){
 if(!window.hcQuranReaderPlay){root.querySelector("#hcqs-audio-status").textContent="Player loading · try again";return;}
 const a=window.hcQuranReaderState?.(),same=a?.chapter===state.chapter&&a.language===state.audioLanguage;
 window.hcQuranReaderPlay(state.chapter,state.audioLanguage,verse||(same?a.verse:state.start)||1);
 syncReaderAudio();
}
window.addEventListener("hcQuranAudioChange",syncReaderAudio);
window.addEventListener("pageshow",syncReaderAudio);
function goToChapter(n){if(!data.chapters.some(x=>x.number===n))return;state.chapter=n;state.start=1;state.activeRef="";render();hcLoadQuranChapter(n);root.scrollIntoView({behavior:"auto",block:"start"})}
function jumpToVerse(n){const max=getChapter().verses.length;const num=Number(n);if(!Number.isInteger(num)||num<1||num>max){alert(`Select a verse between 1 and ${max}.`);return}state.start=Math.floor((num-1)/chunkSize)*chunkSize+1;state.activeRef="";render();const item=document.getElementById(`hcqs-verse-${state.chapter}-${num}`);item?.scrollIntoView({block:"start",behavior:"auto"})}
function exportNotes(){
 const dataToExport={format:"HeartClear private Qur'an reflections",version:1,exportedAt:new Date().toISOString(),notes:state.notes};
 const blob=new Blob([JSON.stringify(dataToExport,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="HeartClear_Quran_Private_Reflections.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function importNotes(file){
 if(!file||file.size>250000) {alert("Choose a private-reflections JSON file smaller than 250 KB.");return}
 const reader=new FileReader();reader.onload=()=>{
  try{
   const backup=JSON.parse(String(reader.result));
   if(backup.format!=="HeartClear private Qur'an reflections"||!backup.notes||typeof backup.notes!=="object"||Array.isArray(backup.notes))throw Error("Unknown or invalid backup");
   const valid={};
   for(const [ref,item] of Object.entries(backup.notes)){
    if(!/^([1-9]|[1-9]\d|10\d|11[0-4]):\d{1,3}$/.test(ref)||typeof item!=="object"||typeof item.text!=="string"||item.text.length>3500)continue;
    const [ch,verse]=ref.split(":").map(Number),found=data.chapters.find(c=>c.number===ch);
    if(!found||verse<1||verse>found.verses.length)continue;
    valid[ref]={text:item.text,updated:String(item.updated||"").slice(0,60)};
   }
   const count=Object.keys(valid).length;
   if(!count){alert("There are no valid verse notes in this backup.");return}
   if(!confirm(`Import ${count} private notes? Matching verse notes on this device will be replaced.`))return;
   const prior=state.notes;state.notes={...prior,...valid};if(!saveNotes()){state.notes=prior;alert("Unable to save imported notes.");return}
   render();alert(`${count} notes restored on this device.`);
  }catch(e){alert("This is not a valid HeartClear Qur'an reflection backup.")}
 };
 reader.readAsText(file);
}
root.addEventListener("click",ev=>{
 const b=ev.target.closest("[data-qs-action]");if(!b)return;const action=b.dataset.qsAction;
 if(action==="chapter")return goToChapter(Number(b.dataset.qsChapter));
 if(action==="audio-toggle"){qsPlay();return}
 if(action==="audio-lang"){state.audioLanguage=b.dataset.qsLang;try{localStorage.setItem("hcQuranReaderAudioLang",JSON.stringify(state.audioLanguage))}catch(e){}qsPlay();return}
 if(action==="audio-prev"||action==="audio-next"){window.hcQuranReaderStep?.(action==="audio-next"?1:-1);syncReaderAudio();return}
 if(action==="verse-play"){state.audioLanguage=state.audioLanguage==="ta"?"ta":"en";qsPlay(Number(b.dataset.qsVerse));return}
 if(action==="lang"){state.language=b.dataset.qsLang;try{localStorage.setItem(LANG_KEY,JSON.stringify(state.language))}catch(e){}render();return}
 if(action==="next"||action==="prev"){state.start+=(action==="next"?chunkSize:-chunkSize);state.activeRef="";render();root.scrollIntoView({behavior:"auto",block:"start"});return}
 if(action==="jump")return jumpToVerse(Number(b.dataset.qsNum));
 if(action==="jumpinput")return jumpToVerse(Number(root.querySelector("#hcqs-verse-number")?.value));
 if(action==="edit"){state.activeRef=b.dataset.qsRef;render();document.getElementById("hcqs-my-note")?.focus();return}
 if(action==="cancel"){state.activeRef="";render();return}
 if(action==="save"){
  const ref=b.dataset.qsRef,value=root.querySelector("#hcqs-my-note")?.value?.trim()||"";
  if(value.length>3500){alert("Please shorten the note.");return}
  const old=state.notes[ref];
  if(value)state.notes[ref]={text:value,updated:new Date().toISOString().slice(0,10)};
  else delete state.notes[ref];
  if(!saveNotes()){if(old)state.notes[ref]=old;else delete state.notes[ref];alert("Unable to save this note. Try exporting a backup or clearing storage space.");return}
  state.activeRef="";render();document.getElementById(`hcqs-verse-${ref.replace(":","-")}`)?.scrollIntoView({block:"nearest"});return;
 }
 if(action==="export")return exportNotes();
});
root.addEventListener("input",ev=>{if(ev.target.id==="hcqs-audio-progress")window.hcQuranReaderSeek?.(Number(ev.target.value)/1000)});
root.addEventListener("change",ev=>{
 if(ev.target.id==="hcqs-import"){importNotes(ev.target.files?.[0]);ev.target.value=""}
 if(ev.target.id==="hcqs-surah-select")goToChapter(Number(ev.target.value));
});
window.hcOpenQuranStudy=function(chapter=0,verse=0){
 if(data.chapters.some(c=>c.number===Number(chapter))){state.chapter=Number(chapter);if(verse)state.start=Math.floor((Number(verse)-1)/chunkSize)*chunkSize+1}
 render();
 if(typeof window.show==="function")window.show("hcQuranStudy");else if(typeof show==="function")show("hcQuranStudy");
 hcLoadQuranDirectory();
 hcLoadQuranChapter(state.chapter);
};
window.hcQuranStudyRender=render;
})();
