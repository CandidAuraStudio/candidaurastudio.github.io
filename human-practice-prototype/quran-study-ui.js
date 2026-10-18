/* HeartClear independent Quran study UI. Arabic is provided separately. All private verse notes stay local. */
(function hcQuranStudyBootstrap(){
"use strict";
const data=window.HC_QURAN_STUDY_DATA;
const annotations=window.HC_QURAN_REFLECTIONS||{};
const root=document.getElementById("hcQuranStudyRoot");
if(!root||!data||!Array.isArray(data.chapters))return;
const KEY="heartclearQuranPrivateReflectionsV1",LANG_KEY="heartclearQuranStudyLanguageV1",POSITION_KEY="heartclearQuranReadingPositionV1";
const fetchLocal=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||"null")||fallback}catch(e){return fallback}};
const saved=fetchLocal(POSITION_KEY,{});
const state={chapter:Number(saved.chapter)||2,start:Number(saved.start)||1,activeRef:"",language:fetchLocal(LANG_KEY,"both"),notes:fetchLocal(KEY,{})};
if(!["en","ta","both"].includes(state.language))state.language="both";
const clean=str=>String(str??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
const bilingual=(en,ta)=>`<span class="hcqs-en">${clean(en)}</span><span class="hcqs-ta" lang="ta">${clean(ta)}</span>`;
const chunkSize=10;
const getChapter=()=>data.chapters.find(x=>x.number===state.chapter)||data.chapters[0];
const updatePosition=()=>{try{localStorage.setItem(POSITION_KEY,JSON.stringify({chapter:state.chapter,start:state.start}))}catch(e){}};
const qsName=ch=>`${clean(ch.name.en)} · ${clean(ch.name.ta)}`;
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
 const val=data.meaning?.[ref];if(!val)return bilingual("A local translation draft has not been reviewed for this verse. Use the source link below for translation and tafsir.","இந்த வசனத்துக்கான உள்ளூர் மொழிபெயர்ப்பு இன்னும் சரிபார்க்கப்படவில்லை. பொருள் மற்றும் தஃப்ஸீரை கீழுள்ள மூலத்தில் காணுங்கள்.");
 return bilingual(val.en||"English meaning pending",val.ta||"தமிழ்ப் பொருள் பின்னர்");
}
function verseCard(v){
 const note=annotations.notes?.[v.ref],n=state.notes?.[v.ref],active=state.activeRef===v.ref;
 const verseLink=`https://quran.com/${v.ref.replace(":","/")}`;
 const start=Number(v.ref.split(":")[1]);
 return `<article class="hcqs-verse" id="hcqs-verse-${v.ref.replace(":","-")}">
  <div class="hcqs-verse-head"><strong>${clean(v.ref)}</strong><a href="${verseLink}" target="_blank" rel="noopener noreferrer">Quran.com · meaning and audio ↗</a></div>
  <p class="hcqs-arabic" dir="rtl" lang="ar">${clean(v.arabic)}</p>
  <div class="hcqs-subhead">${bilingual("Meaning · English / Tamil draft","பொருள் · தமிழ் / ஆங்கில வரைவு")}</div>
  <div class="hcqs-meaning">${getMeaning(v.ref)}</div>
  ${note?`<div class="hcqs-editorial"><div class="hcqs-source-label">${clean(statusLabel(note.status))}</div><strong>${bilingual(note.headline.en,note.headline.ta)}</strong><div>${bilingual(note.text.en,note.text.ta)}</div><small>${clean(note.source||"")}</small><small>Separate personal application — not Qur'anic text or certified tafsir.</small></div>`:`<p class="hcqs-unwritten">${bilingual("Personal commentary is not yet written for this verse.","இந்த வசனத்திற்கான தனிப்பட்ட சிந்தனை இன்னும் எழுதப்படவில்லை.")}</p>`}
  ${n?.text?`<div class="hcqs-private-note"><strong>${bilingual("Your private reflection","உங்கள் தனிப்பட்ட சிந்தனை")}</strong><p>${clean(n.text)}</p><small>Saved only in this browser · ${clean(n.updated||"")}</small></div>`:""}
  <button type="button" class="hcqs-edit" data-qs-action="edit" data-qs-ref="${clean(v.ref)}">${bilingual(n?.text?"Edit your reflection":"Write your reflection",n?.text?"உங்கள் சிந்தனையைத் திருத்துங்கள்":"உங்கள் சிந்தனையை எழுதுங்கள்")}</button>
  ${active?`<div class="hcqs-editor" data-ref="${clean(v.ref)}"><label for="hcqs-my-note">${bilingual("My reflection · private on this device","என் சிந்தனை · இந்தச் சாதனத்தில் மட்டும்")}</label><textarea id="hcqs-my-note" rows="5" maxlength="3500" placeholder="What does this verse make you question about awareness, habit, society or intention? / இந்த வசனம் உங்களை என்ன சிந்திக்கச் செய்கிறது?">${clean(n?.text||"")}</textarea><div class="hcqs-editor-actions"><button type="button" data-qs-action="save" data-qs-ref="${clean(v.ref)}">Save locally / சேமி</button><button type="button" class="hcqs-cancel" data-qs-action="cancel">Cancel</button></div></div>`:""}
 </article>`;
}
function render(){
 const ch=getChapter(),total=ch.verses.length;
 state.start=Math.max(1,Math.min(total,Math.floor((state.start-1)/chunkSize)*chunkSize+1));
 updatePosition();
 const min=state.start,max=Math.min(total,min+chunkSize-1);
 const ready=ch.verses.filter(v=>data.meaning?.[v.ref]?.en&&data.meaning?.[v.ref]?.ta).length;
 const draftCount=ch.verses.filter(v=>annotations.notes?.[v.ref]).length;
 const savedCount=ch.verses.filter(v=>state.notes?.[v.ref]?.text).length;
 const highlights={2:[1,2,144,156,170],4:[1,135],41:[20,34,53],114:[4,5,6]}[ch.number]||[];
 const links=highlights.map(n=>`<button type="button" data-qs-action="jump" data-qs-num="${n}">${ch.number}:${n}${state.notes[`${ch.number}:${n}`]?.text?" ★":""}</button>`).join("");
 root.innerHTML=`<div class="hcqs-header">
  <div class="kicker">Qur'an · complete Arabic reading · personal reflections</div>
  <h2>${bilingual("The Qur'an and the Inner Journey","குர்ஆனும் உள்ளார்ந்த பயணமும்")}</h2>
  <p>${bilingual("Original verses, carefully separated meanings, and your developing reflections. No generic interpretations are presented as yours.","மூல வசனங்கள், தனித்த பொருள் விளக்கங்கள், நீங்கள் எழுதும் சிந்தனைகள். பொதுவான விளக்கங்கள் உங்கள் பெயரில் வெளியிடப்படுவதில்லை.")}</p>
  <div class="hcqs-language" role="group" aria-label="Meaning language">
   <button data-qs-action="lang" data-qs-lang="both" aria-pressed="${state.language==="both"}">Both / இரண்டும்</button>
   <button data-qs-action="lang" data-qs-lang="ta" aria-pressed="${state.language==="ta"}">தமிழ்</button>
   <button data-qs-action="lang" data-qs-lang="en" aria-pressed="${state.language==="en"}">English</button>
  </div>
  <div class="hcqs-picker">${data.chapters.map(x=>`<button type="button" data-qs-action="chapter" data-qs-chapter="${x.number}" aria-pressed="${state.chapter===x.number}"><span>${x.number} · ${qsName(x)}</span><small>${x.verses.length} ${state.language==="ta"?"வசனங்கள்":"verses"}</small></button>`).join("")}</div>
  <p class="hcqs-caution">${bilingual("Every Arabic verse is included. English/Tamil drafts are available for selected verses only; all others link to source translations and commentaries. Some book-related notes await your review.","அனைத்து அரபு வசனங்களும் சேர்க்கப்பட்டுள்ளன. தேர்ந்தெடுக்கப்பட்ட வசனங்களுக்கு மட்டுமே தமிழ்/ஆங்கிலப் பொருள் வரைவு உள்ளது; மற்றவற்றுக்கு மூல மொழிபெயர்ப்பு இணைப்பு உண்டு. சில நூல் சார்ந்த குறிப்புகள் உங்கள் சரிபார்ப்புக்காக உள்ளன.")}</p>
 </div>
 <div class="hcqs-summary"><h3>${qsName(ch)}</h3><p>${total} ${state.language==="ta"?"வசனங்கள்":"verses"} · ${ready} bilingual meaning drafts · ${draftCount} attributed reflections · ${savedCount} private notes</p>
 <p class="hcqs-bismillah" lang="ar" dir="rtl">${clean(ch.bismillah)}</p></div>
 <div class="hcqs-highlights"><div class="hcqs-subhead">${bilingual("Verses connected to your earlier discussions","முந்தைய சிந்தனைகளுடன் இணைந்த வசனங்கள்")}</div>${links}</div>
 <div class="hcqs-pager"><button data-qs-action="prev" ${min===1?"disabled":""}>‹ ${state.language==="ta"?"முந்தையவை":"Previous"}</button><span>${min}–${max} / ${total}</span><button data-qs-action="next" ${max===total?"disabled":""}>${state.language==="ta"?"அடுத்தவை":"Next"} ›</button></div>
 <div class="hcqs-verses">${ch.verses.slice(min-1,max).map(verseCard).join("")}</div>
 <div class="hcqs-pager"><button data-qs-action="prev" ${min===1?"disabled":""}>‹ Previous</button><span>${min}–${max} / ${total}</span><button data-qs-action="next" ${max===total?"disabled":""}>Next ›</button></div>
 <div class="hcqs-jump"><label for="hcqs-verse-number">${bilingual("Go directly to verse number","நேரடியாக வசன எண்ணுக்குச் செல்லவும்")}</label><input id="hcqs-verse-number" inputmode="numeric" type="number" min="1" max="${total}" value="${min}" aria-label="Verse number"><button data-qs-action="jumpinput">Go / செல்</button></div>
 <div class="hcqs-private-tools"><h3>${bilingual("Protect your reflections","உங்கள் சிந்தனைகளைப் பாதுகாக்கவும்")}</h3><p>${bilingual("Personal notes stay in this browser only. They are not uploaded, shared, or automatically added to the public lesson. Export a backup before clearing app data or changing phones.","தனிப்பட்ட குறிப்புகள் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். அவை பகிரப்படவோ பொதுப் பாடத்தில் தானாகச் சேர்க்கப்படவோ மாட்டாது. சாதனத்தை மாற்றுவதற்கு முன் காப்புப் பிரதி சேமிக்கவும்.")}</p>
 <button data-qs-action="export">Export private notes / குறிப்புகளை ஏற்றுமதி செய்</button>
 <label class="hcqs-import-label" for="hcqs-import">Import your saved notes / குறிப்புகளை இறக்குமதி செய்</label><input type="file" id="hcqs-import" accept="application/json,.json">
 <div class="hcqs-license">${clean(data.arabicAttribution)}. Meanings and commentary are editorial learning materials, not certified tafsir. <a href="https://quran.com" target="_blank" rel="noopener noreferrer">Verify Qur'anic text and translations at Quran.com ↗</a></div>
 </div>`;
 const section=document.getElementById("hcQuranStudy");if(section)section.dataset.qsLanguage=state.language;
}
function goToChapter(n){if(!data.chapters.some(x=>x.number===n))return;state.chapter=n;state.start=1;state.activeRef="";render();root.scrollIntoView({behavior:"auto",block:"start"})}
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
    if(!/^(2|4|41|114):\d{1,3}$/.test(ref)||typeof item!=="object"||typeof item.text!=="string"||item.text.length>3500)continue;
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
root.addEventListener("change",ev=>{if(ev.target.id==="hcqs-import"){importNotes(ev.target.files?.[0]);ev.target.value=""}});
window.hcOpenQuranStudy=function(chapter=0,verse=0){if(data.chapters.some(c=>c.number===Number(chapter))){state.chapter=Number(chapter);if(verse)state.start=Math.floor((Number(verse)-1)/chunkSize)*chunkSize+1}render();if(typeof window.show==="function")window.show("hcQuranStudy");else if(typeof show==="function")show("hcQuranStudy");};
window.hcQuranStudyRender=render;
})();
