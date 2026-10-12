/* INNER VOICE Prototype 01. No cloud, accounts, analytics or premium API. */
(function(){
'use strict';
const root=document.getElementById('app');
const toastEl=document.getElementById('toast');
const DB_NAME='inner-voice-private-v1',STORE='moments',DRAFT_KEY='inner-voice:draft-v1',MAX_RECORD_MS=7*60*1000,MAX_AUDIO_BYTES=16*1024*1024,MAX_ENTRIES=150;
const feelings=['Calm','Curious','Restless','Grateful','Thoughtful','Inspired'];
const prompts=[
 'What has been on your mind lately?',
 'What small moment stayed with you?',
 'What is something you want to understand?',
 'What are you learning about yourself?',
 'What do you want your future self to remember?',
 'What did you notice today that you usually miss?',
 'What are you ready to say out loud?',
 'Where did you find a moment of calm?'
];
let entries=[];
let view='home',search='',openedId=null;
let draft={title:'',body:'',tag:'',prompt:''};
try{const found=JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');if(found&&typeof found==='object')draft={title:String(found.title||'').slice(0,140),body:String(found.body||'').slice(0,10000),tag:feelings.includes(found.tag)?found.tag:'',prompt:String(found.prompt||'').slice(0,150)};}catch(_){}
let media=null,tracks=null,chunks=[],recording=false,recStarted=0,elapsed=0,clockId=0,cutoffId=0,draftAudio=null,draftAudioUrl=null,audioDuration=0;
let urls=[],noticeTimeout=0;
const $=id=>document.getElementById(id);
const esc=value=>String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=value=>String(value==null?'':value);
const dateFmt=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?'Unknown date':d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});};
const timeFmt=value=>{const d=new Date(value);return Number.isNaN(d.getTime())?'':d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});};
const minFmt=ms=>Math.floor(ms/60000).toString().padStart(2,'0')+':'+Math.floor(ms%60000/1000).toString().padStart(2,'0');
const words=s=>String(s||'').trim()?String(s).trim().split(/\s+/).length:0;
function notify(s){toastEl.textContent=s;toastEl.classList.add('show');clearTimeout(noticeTimeout);noticeTimeout=setTimeout(()=>toastEl.classList.remove('show'),3900);}
function persistDraft(){try{localStorage.setItem(DRAFT_KEY,JSON.stringify(draft));}catch(_){}}
function clearDraft(){draft={title:'',body:'',tag:'',prompt:''};persistDraft();}
function openDb(){return new Promise((resolve,reject)=>{
 if(!('indexedDB' in window))return reject(Error('Local database is not available in this browser.'));
 const req=indexedDB.open(DB_NAME,1);
 req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE,{keyPath:'id'});};
 req.onsuccess=()=>resolve(req.result);
 req.onerror=()=>reject(req.error||Error('Could not open local storage.'));
});}
async function allEntries(){const db=await openDb();return new Promise((resolve,reject)=>{
 const tx=db.transaction(STORE,'readonly'),req=tx.objectStore(STORE).getAll();
 req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error||Error('Could not read entries.'));
 tx.oncomplete=()=>db.close();tx.onerror=()=>db.close();
});}
async function writeEntry(entry){const db=await openDb();return new Promise((resolve,reject)=>{
 const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(entry);
 tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error||Error('Could not save entry.'));};tx.onabort=()=>{db.close();reject(tx.error||Error('Save cancelled.'));};
});}
async function removeEntry(id){const db=await openDb();return new Promise((resolve,reject)=>{
 const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).delete(id);
 tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>{db.close();reject(tx.error||Error('Could not delete entry.'));};
});}
async function reload(){entries=(await allEntries()).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));}
function memoAudio(e){return e&&e.audio instanceof Blob&&e.audio.size>0;}
function audioUrl(blob){const url=URL.createObjectURL(blob);urls.push(url);return url;}
function cleanUrls(){urls.forEach(url=>URL.revokeObjectURL(url));urls=[];}
function feelingTag(v){return feelings.includes(v)?v:'Unlabelled';}
function iconFor(e){return memoAudio(e)?'◉':'✎';}
function greet(){const hour=new Date().getHours();return hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';}
function privacyStrip(){return '<div class="privacy-strip"><i>◇</i><div><strong>Private means private.</strong><p>Everything here is stored locally on this device. Your thoughts and recordings are not automatically uploaded, synced or analyzed by AI. Export a backup before clearing browser data or changing phones.</p></div></div>';}
function linkMoment(e){return '<button class="moment-card" data-action="open" data-id="'+esc(e.id)+'"><div class="moment-top"><span>'+dateFmt(e.createdAt)+' · '+timeFmt(e.createdAt)+'</span><span class="feeling">'+esc(feelingTag(e.tag))+'</span></div><h3>'+esc(e.title||'Untitled moment')+'</h3><p>'+esc((e.body|| (memoAudio(e)?'A moment spoken in your own voice.':'A moment recorded.')).slice(0,122))+'</p><div class="moment-footer"><span>'+(memoAudio(e)?'<span class="has-audio">◉ Audio saved</span>':'✎ Written')+'</span><span>↗ Open</span></div></button>';}
function empty(title,body,button){return '<div class="empty"><div class="empty-star">✦</div><h3>'+esc(title)+'</h3><p>'+esc(body)+'</p><a class="button-primary" href="#/new">'+esc(button||'Create a moment')+' ↗</a></div>';}
function hero(){
 const count=entries.length,top=prompts.slice(new Date().getDate()%prompts.length).concat(prompts).slice(0,3);
 return '<section class="hero"><div class="hero-copy"><div class="eyebrow">'+esc(greet())+' · THIS IS YOUR SPACE</div><h1>Meet yourself<br><em>here.</em></h1><p>No perfect words. No pressure to explain. Just a place for the thoughts, questions and moments that deserve to be heard.</p><div class="hero-actions"><a class="button-primary" href="#/new">◉ Capture a moment</a><a class="button-secondary" href="#/library">Explore your thoughts ↗</a></div><div class="hero-facts"><span><b>'+count+'</b> saved moment'+(count===1?'':'s')+'</span><span><b>100%</b> on your device</span><span><b>0</b> accounts needed</span></div></div>'+
 '<div class="orb-stage" aria-hidden="true"><div class="orb-ring"></div><div class="orb-ring r2"></div><div class="orb-ring r3"></div><div class="orb-circle"><span class="orb-core">◡</span></div><span class="stage-spark">✧</span><span class="stage-spark s2">✦</span><div class="orbit-caption">Every thought has a place.</div></div></section>'+
 '<section class="section"><div class="section-top"><div><div class="eyebrow">A LITTLE INSPIRATION</div><h2>One question. Your answer.</h2><p class="section-subtitle">Choose a starting point—or simply begin recording.</p></div></div><div class="prompt-grid">'+top.map((p,i)=>'<button class="prompt-card" data-action="prompt" data-prompt="'+esc(p)+'"><span class="prompt-index">PROMPT 0'+(i+1)+'</span><strong>'+esc(p)+'</strong><span class="prompt-bottom">Answer in your own way <b>↗</b></span></button>').join('')+'</div></section>'+
 '<section class="section"><div class="section-top"><div><div class="eyebrow">BACK TO YOURSELF</div><h2>Recent moments.</h2></div><a class="text-button" href="#/library">Your collection ↗</a></div>'+
 (entries.length?'<div class="moment-grid">'+entries.slice(0,4).map(linkMoment).join('')+'</div>':empty('A fresh beginning','The first moment you save will appear here. It can be a recording, a few lines, or both.','Record your first moment'))+'</section>'+privacyStrip();
}
function newMoment(){
 const tagBtns=feelings.map(v=>'<button type="button" class="tag-btn" data-action="tag" data-tag="'+v+'" aria-pressed="'+(draft.tag===v)+'">'+v+'</button>').join('');
 return '<section class="page-head"><div class="eyebrow">THE RECORDING ROOM</div><h1>A moment, <em>just yours.</em></h1><p>Speak freely, write a little, or do both. Nothing is published. Your recorded audio is saved with the entry after you choose Save moment.</p></section>'+
 (draft.prompt?'<div class="privacy-strip" style="margin:0 0 22px"><i>✧</i><div><strong>A question to begin</strong><p>'+esc(draft.prompt)+'</p><button class="text-button" type="button" data-action="clear-prompt">Remove question</button></div></div>':'')+
 '<div class="composer"><section class="record-panel" aria-labelledby="record-heading"><div class="eyebrow">01 · SPEAK</div><h2 id="record-heading">Let it out.</h2><p>Your natural voice. No synthetic narrator.</p><div class="record-stage"><span class="bar"></span><button type="button" id="record-orb" class="record-orb'+(recording?' recording':'')+'" data-action="'+(recording?'stop':'record')+'" aria-label="'+(recording?'Stop recording':'Start recording')+'"><span>'+(recording?'■':'◉')+'</span></button><span class="bar b2"></span></div><div id="record-time" class="record-time">'+minFmt(recording?Date.now()-recStarted:elapsed)+'</div><div class="record-note">Maximum 7 minutes · Microphone permission required</div><div class="record-actions"><button id="record-btn" data-action="record" type="button" class="button-primary" '+(recording?'disabled':'')+'>◉ Record voice</button><button id="stop-btn" data-action="stop" type="button" class="button-secondary record-stop" '+(!recording?'disabled':'')+'>■ Stop</button></div><div id="record-status" role="status" aria-live="polite" class="record-status">'+(recording?'Recording on this device…':draftAudio?'Recording ready. Save the moment to keep it.':'Tap Record to begin whenever you are ready.')+'</div><audio id="audio-preview" class="audio-preview" controls preload="metadata" playsinline '+(!draftAudio?'hidden':'')+'></audio><div class="actions" style="justify-content:center"><button data-action="discard" id="discard-btn" type="button" class="text-button" '+(!draftAudio?'disabled':'')+'>Discard current recording</button></div></section>'+
 '<section class="editor-pane"><div class="eyebrow">02 · KEEP</div><h3>Give it a place to stay.</h3><form id="moment-form"><label for="moment-title">A TITLE (OPTIONAL)</label><input id="moment-title" name="title" maxlength="140" placeholder="Something to remember" value="'+esc(draft.title)+'"><label for="moment-body">YOUR WORDS (OPTIONAL)</label><textarea name="body" id="moment-body" maxlength="10000" placeholder="Write whatever is on your mind…">'+esc(draft.body)+'</textarea><div class="tag-label">WHAT DOES THIS MOMENT FEEL LIKE?</div><div class="tag-grid">'+tagBtns+'</div><div class="editor-bottom"><small>Your draft text stays on this device. Recordings are kept when you save the moment.</small><button class="button-primary save-btn" id="save-btn" type="submit">Save moment ↗</button></div></form></section></div>'+privacyStrip();
}
function filtered(){const q=search.trim().toLowerCase();return entries.filter(e=>!q||[e.title,e.body,e.tag,dateFmt(e.createdAt)].some(v=>String(v||'').toLowerCase().includes(q)));}
function libraryList(){const filteredEntries=filtered();return '<div class="entry-list">'+(filteredEntries.length?filteredEntries.map(e=>'<button class="entry-row" type="button" data-action="open" data-id="'+esc(e.id)+'"><span class="entry-mark">'+iconFor(e)+'</span><span class="entry-text"><strong>'+esc(e.title||'Untitled moment')+'</strong><p>'+esc(e.body|| (memoAudio(e)?'Your voice, saved privately.':''))+'</p></span><span class="entry-meta"><span>'+dateFmt(e.createdAt)+'</span><span>'+esc(feelingTag(e.tag))+'</span></span><span class="entry-arrow">↗</span></button>').join(''):'<div class="empty"><h3>No matching moments.</h3><p>Try another search, or record something new.</p><a class="button-primary" href="#/new">New moment ↗</a></div>')+'</div>';}
function library(){
 return '<section class="page-head"><div class="eyebrow">THE COLLECTION</div><h1>The things <em>you kept.</em></h1><p>Every moment lives in this browser. Search, replay and revisit them whenever you choose.</p></section>'+
 '<div class="library-tools"><label class="sr-only" for="library-search">Search your moments</label><input id="library-search" class="search-input" type="search" placeholder="Search thoughts, feelings, titles…" autocomplete="off" value="'+esc(search)+'"><div class="toolbar-actions"><button class="button-outline" type="button" data-action="export">↓ Full backup</button><button class="button-outline" type="button" data-action="import">↑ Restore backup</button><input class="sr-only" id="restore-file" type="file" accept=".json,application/json"></div></div><p class="small-note">Full backup includes written text and recorded audio. Keep this private file somewhere safe. Import merges entries without erasing existing ones.</p>'+
 '<div id="library-result">'+libraryList()+'</div>'+privacyStrip();
}
function detail(e){
 if(!e)return empty('Moment not found','This entry may have been deleted or stored in another browser.','Record a moment');
 const track=memoAudio(e)?'<div class="detail-label">◉ YOUR ORIGINAL VOICE</div><audio class="detail-player" controls playsinline preload="metadata" src="'+audioUrl(e.audio)+'"></audio>':'';
 return '<section class="page-head"><a href="#/library" class="text-button">← Back to moments</a></section><article class="detail-card"><div class="detail-date">'+dateFmt(e.createdAt)+' · '+timeFmt(e.createdAt)+' · '+esc(feelingTag(e.tag))+'</div><h1>'+esc(e.title||'Untitled moment')+'</h1>'+track+
 (e.body?'<div class="detail-body">'+esc(e.body)+'</div>':'<div class="small-note">This moment was recorded in your voice.</div>')+
 '<div class="detail-actions">'+(memoAudio(e)?'<button data-action="download-audio" data-id="'+esc(e.id)+'" class="button-secondary" type="button">↓ Save audio file</button>':'')+'<button data-action="delete" data-id="'+esc(e.id)+'" class="button-outline danger" type="button">Delete moment</button><a class="button-primary" href="#/new">＋ New moment</a></div></article>'+privacyStrip();
}
function patterns(){
 const week=Date.now()-7*86400000;
 const count7=entries.filter(e=>new Date(e.createdAt).getTime()>=week).length;
 const audioCount=entries.filter(memoAudio).length;
 const totalWords=entries.reduce((sum,e)=>sum+words(e.body),0);
 const freq=feelings.map(tag=>({tag,count:entries.filter(e=>e.tag===tag).length})).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);
 const max=freq.length?freq[0].count:1;
 const barMarkup=freq.length?'<div class="bar-list">'+freq.map(f=>'<div class="bar-row"><span>'+esc(f.tag)+'</span><span class="bar-track"><span class="bar-fill" style="display:block;width:'+Math.round(f.count/max*100)+'%"></span></span><b>'+f.count+'</b></div>').join('')+'</div>':'<p>Add a feeling to a saved moment to see a simple summary here.</p>';
 return '<section class="page-head"><div class="eyebrow">SMALL PATTERNS</div><h1>A view of <em>your days.</em></h1><p>These are simple counts from what you chose to save—not an interpretation of your emotions or a psychological assessment.</p></section>'+
 '<div class="stats"><div class="stat"><div class="stat-number">'+entries.length+'</div><div class="stat-label">Moments preserved</div></div><div class="stat"><div class="stat-number">'+count7+'</div><div class="stat-label">This past week</div></div><div class="stat"><div class="stat-number">'+audioCount+'</div><div class="stat-label">Voice recordings</div></div></div>'+
 '<div class="insight"><div class="eyebrow">A WINDOW INTO YOUR COLLECTION</div><h3>Feeling tags you chose.</h3>'+barMarkup+'</div>'+
 '<div class="insight"><div class="eyebrow">YOUR WORDS</div><h3>'+totalWords+' written words.</h3><p>Each entry is yours to keep or remove. There is no scoring, no streak requirement and no automatic sentiment analysis.</p></div>'+privacyStrip();
}
function setNav(page){document.querySelectorAll('[data-nav]').forEach(a=>{const active=a.dataset.nav===page;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
function draw(){
 cleanUrls();
 const parts=location.hash.replace(/^#\/?/,'').split('/');
 view=['home','new','library','patterns'].includes(parts[0])?parts[0]:parts[0]==='entry'?'entry':'home';
 openedId=view==='entry'?decodeURIComponent(parts[1]||''):null;
 const page=view==='home'?hero():view==='new'?newMoment():view==='library'?library():view==='patterns'?patterns():detail(entries.find(e=>e.id===openedId));
 root.innerHTML=page;
 setNav(view==='entry'?'library':view);
 if(view==='new')updateRecordingUI();
 window.scrollTo({top:0,behavior:'instant'});
}
function updateRecordingUI(){
 const orb=$('record-orb'),start=$('record-btn'),stop=$('stop-btn'),timer=$('record-time'),status=$('record-status'),discard=$('discard-btn'),audio=$('audio-preview');
 if(orb){orb.classList.toggle('recording',recording);orb.dataset.action=recording?'stop':'record';orb.setAttribute('aria-label',recording?'Stop recording':'Start recording');orb.querySelector('span').textContent=recording?'■':'◉';}
 if(start)start.disabled=recording;
 if(stop)stop.disabled=!recording;
 if(timer)timer.textContent=minFmt(recording?Date.now()-recStarted:elapsed);
 if(status)status.textContent=recording?'Recording on this device…':draftAudio?'Recording ready. Save the moment to keep it.':'Tap Record to begin whenever you are ready.';
 if(discard)discard.disabled=recording||!draftAudio;
 if(audio){if(draftAudioUrl){audio.src=draftAudioUrl;audio.hidden=false;}else{audio.pause();audio.removeAttribute('src');audio.hidden=true;}}
}
function captureStop(){if(!recording||!media)return;
 elapsed=Math.min(MAX_RECORD_MS,Date.now()-recStarted);
 recording=false;clearInterval(clockId);clearTimeout(cutoffId);
 try{if(media.state!=='inactive')media.stop();}catch(e){notify('Unable to stop this recording.');}
 if(tracks){tracks.getTracks().forEach(t=>t.stop());tracks=null;}
 updateRecordingUI();
}
async function captureStart(){
 if(recording)return;
 if(draftAudio && !confirm('Replace your unsaved recording? You can save this moment first.'))return;
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!window.MediaRecorder){notify('Microphone recording needs Chrome or Safari on HTTPS.');return;}
 try{
   const granted=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});
   if(view!=='new'){granted.getTracks().forEach(t=>t.stop());return;}
   tracks=granted;
   const candidates=['audio/webm;codecs=opus','audio/mp4','audio/webm','audio/ogg'];
   const mime=candidates.find(x=>MediaRecorder.isTypeSupported(x))||'';
   media=mime?new MediaRecorder(tracks,{mimeType:mime}):new MediaRecorder(tracks);
   chunks=[];elapsed=0;
   media.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
   media.onerror=()=>{notify('Recording failed. Please try again.');recording=false;if(tracks){tracks.getTracks().forEach(t=>t.stop());tracks=null;}clearInterval(clockId);clearTimeout(cutoffId);updateRecordingUI();};
   media.onstop=()=>{
     const blob=new Blob(chunks,{type:media&&media.mimeType?media.mimeType:(mime||'audio/webm')});
     if(blob.size>MAX_AUDIO_BYTES){notify('Recording exceeds the size limit. Please try a shorter one.');draftAudio=null;}
     else if(blob.size>200){if(draftAudioUrl)URL.revokeObjectURL(draftAudioUrl);draftAudio=blob;draftAudioUrl=URL.createObjectURL(blob);audioDuration=elapsed;notify('Voice ready. Tap Save moment to preserve it.');}
     else notify('Recording too short. Try again.');
     media=null;chunks=[];updateRecordingUI();
   };
   if(draftAudioUrl){URL.revokeObjectURL(draftAudioUrl);draftAudioUrl=null;draftAudio=null;}
   media.start(1000);recording=true;recStarted=Date.now();
   clockId=setInterval(updateRecordingUI,300);
   cutoffId=setTimeout(()=>{captureStop();notify('Seven-minute recording limit reached. Your clip is ready to save.');},MAX_RECORD_MS);
   updateRecordingUI();
 }catch(err){if(tracks){tracks.getTracks().forEach(t=>t.stop());tracks=null;}notify(err&&err.name==='NotAllowedError'?'Microphone permission was denied. Allow it in your browser settings.':'Cannot start the microphone on this device.');}
}
function discardAudio(){if(recording)return; if(draftAudioUrl)URL.revokeObjectURL(draftAudioUrl);draftAudioUrl=null;draftAudio=null;elapsed=0;audioDuration=0;updateRecordingUI();notify('Unsaved recording discarded.');}
async function saveMoment(){
 if(recording){notify('Stop recording before saving.');return;}
 const title=draft.title.trim(),body=draft.body.trim();
 if(!body&&!draftAudio){notify('Write a thought or record your voice first.');return;}
 if(entries.length>=MAX_ENTRIES){notify('Your collection has reached the 150-entry limit. Export a backup before removing anything.');return;}
 const id=crypto.randomUUID?crypto.randomUUID():'moment-'+Date.now()+'-'+Math.random().toString(36).slice(2);
 const entry={id,createdAt:new Date().toISOString(),title:(title||draft.prompt||'An untitled moment').slice(0,140),body:body.slice(0,10000),tag:draft.tag||'',audio:draftAudio||null,durationMs:draftAudio?audioDuration:0};
 try{
  await writeEntry(entry);await reload();clearDraft();
  if(draftAudioUrl)URL.revokeObjectURL(draftAudioUrl);
  draftAudio=null;draftAudioUrl=null;elapsed=0;audioDuration=0;
  location.hash='#/entry/'+encodeURIComponent(id);
  notify('Moment saved privately on this device.');
 }catch(err){notify('Could not save: '+(err.message||'Device storage may be full.'));}
}
function ext(type){return /mp4|m4a/.test(type)?'m4a':/ogg/.test(type)?'ogg':/wav/.test(type)?'wav':'webm';}
function download(name,blob){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),12000);}
function toDataURL(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('Could not read audio for backup.'));reader.readAsDataURL(blob);});}
async function exportAll(){
 if(!entries.length){notify('Nothing to back up yet.');return;}
 notify('Preparing your complete private backup…');
 try{
  let bytes=0;const data=[];
  for(const entry of entries){
   bytes+=entry.audio instanceof Blob?entry.audio.size:0;
   if(bytes>70*1024*1024)throw Error('Recordings exceed the 70 MB backup limit. Export audio files individually first.');
   data.push({id:entry.id,title:entry.title,body:entry.body,tag:entry.tag,createdAt:entry.createdAt,durationMs:entry.durationMs,audio:entry.audio instanceof Blob?await toDataURL(entry.audio):null});
  }
  download('inner-voice-full-backup-'+new Date().toISOString().slice(0,10)+'.json',new Blob([JSON.stringify({app:'Inner Voice',version:1,exportedAt:new Date().toISOString(),entries:data})],{type:'application/json'}));
  notify('Full backup requested, including your recordings. Check Downloads.');
 }catch(err){notify(err.message||'Could not export your backup.');}
}
function decodeAudio(data){
 if(data===null||data===undefined||data==='')return null;
 if(typeof data!=='string'||data.length>24*1024*1024)throw Error('Audio format or size invalid.');
 const match=data.match(/^data:(audio\/(?:webm|mp4|ogg|wav|mpeg|x-m4a))(?:;[^,]*)?;base64,([A-Za-z0-9+/=]+)$/i);
 if(!match)throw Error('Unsupported audio format in backup.');
 const raw=atob(match[2]);if(raw.length>MAX_AUDIO_BYTES)throw Error('Audio is too large for this entry.');
 const bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
 return new Blob([bytes],{type:match[1]});
}
async function importAll(file){
 if(!file)return;
 if(file.size>100*1024*1024){notify('Backup is too large. Maximum file size is 100 MB.');return;}
 try{
  const data=JSON.parse(await file.text());
  if(!data||data.app!=='Inner Voice'||!Array.isArray(data.entries))throw Error('That is not an Inner Voice backup.');
  if(data.entries.length>MAX_ENTRIES)throw Error('This backup contains too many entries.');
  if(!confirm('Restore moments from this backup? Existing moments will be kept. Duplicate IDs will be skipped.'))return;
  const known=new Set(entries.map(x=>x.id));let added=0;
  for(const record of data.entries){
   if(entries.length+added>=MAX_ENTRIES)break;
   if(!record||typeof record.id!=='string'||typeof record.title!=='string'||typeof record.body!=='string')continue;
   const id=record.id.slice(0,110).replace(/[^A-Za-z0-9-]/g,'');
   if(id.length<3||known.has(id))continue;
   const audio=decodeAudio(record.audio);
   const date=new Date(record.createdAt);
   const e={id,title:record.title.slice(0,140),body:record.body.slice(0,10000),tag:feelings.includes(record.tag)?record.tag:'',createdAt:Number.isFinite(date.getTime())?date.toISOString():new Date().toISOString(),audio:audio||null,durationMs:Number.isFinite(record.durationMs)?Math.max(0,Math.min(MAX_RECORD_MS,record.durationMs)):0};
   await writeEntry(e);known.add(id);added++;
  }
  await reload();draw();notify(added+' moment'+(added===1?'':'s')+' restored. Your existing entries were kept.');
 }catch(err){notify('Restore failed: '+(err.message||'Invalid backup.'));}
}
async function deleteMoment(id){
 const e=entries.find(x=>x.id===id);if(!e)return;
 if(!confirm('Delete “'+e.title+'” and its voice recording from this device? Export a backup first if needed.'))return;
 try{await removeEntry(id);await reload();location.hash='#/library';draw();notify('Moment deleted from this device.');}catch(err){notify('Could not delete this moment.');}
}
function audioDownload(id){const e=entries.find(x=>x.id===id);if(!e||!memoAudio(e))return notify('No audio attached.');download('inner-voice-'+e.id.slice(0,60)+'.'+ext(e.audio.type),e.audio);notify('Audio export requested. Check Downloads.');}
function actions(e){
 const btn=e.target.closest('[data-action]');if(!btn)return;
 const act=btn.dataset.action,id=btn.dataset.id;
 if(act==='open'){location.hash='#/entry/'+encodeURIComponent(id);return;}
 if(act==='prompt'){draft.prompt=btn.dataset.prompt||'';persistDraft();location.hash='#/new';return;}
 if(act==='clear-prompt'){draft.prompt='';persistDraft();draw();return;}
 if(act==='tag'){draft.tag=draft.tag===btn.dataset.tag?'':btn.dataset.tag;persistDraft();document.querySelectorAll('.tag-btn').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.tag===draft.tag)));return;}
 if(act==='record'){captureStart();return;}
 if(act==='stop'){captureStop();return;}
 if(act==='discard'){discardAudio();return;}
 if(act==='export'){exportAll();return;}
 if(act==='import'){$('restore-file')?.click();return;}
 if(act==='delete'){deleteMoment(id);return;}
 if(act==='download-audio'){audioDownload(id);return;}
}
root.addEventListener('click',actions);
root.addEventListener('input',e=>{
 if(e.target.id==='moment-title'){draft.title=e.target.value;persistDraft();}
 if(e.target.id==='moment-body'){draft.body=e.target.value;persistDraft();}
 if(e.target.id==='library-search'){search=e.target.value;const target=$('library-result');if(target)target.innerHTML=libraryList();}
});
root.addEventListener('submit',e=>{if(e.target.id==='moment-form'){e.preventDefault();draft.title=$('moment-title').value;draft.body=$('moment-body').value;persistDraft();saveMoment();}});
root.addEventListener('change',async e=>{if(e.target.id==='restore-file'){await importAll(e.target.files?.[0]);e.target.value='';}});
window.addEventListener('hashchange',()=>{if(recording&&location.hash!=='#/new'){captureStop();notify('Recording stopped. Your unsaved clip will be waiting in New moment.');}draw();});
window.addEventListener('beforeunload',e=>{if(recording){e.preventDefault();e.returnValue='';}});
(async function init(){try{await reload();draw();}catch(err){root.innerHTML='<section class="page-head"><h1>Your local storage is unavailable.</h1><p>'+esc(err.message)+'</p><p>Open this site directly in a current Chrome, Safari or Firefox browser, outside private browsing mode. INNER VOICE cannot safely operate without local storage.</p></section>';}})();
})();