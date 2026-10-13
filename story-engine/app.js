/* STORY ENGINE Prototype 01 — local-only cinematic writing. No analytics, AI APIs or cloud writes. */
(()=>{
'use strict';
const KEY='story-engine:projects-v01',MAX_PROJECTS=30,MAX_SCENES=40,MAX_SHOTS=24;
const $=id=>document.getElementById(id);
const root=$('app'),toastElement=$('toast');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateLabel=s=>{const t=new Date(s);return Number.isFinite(t.getTime())?'—':t.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});};
const clip=(v,n)=>String(v??'').slice(0,n);
const id=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'local-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const templateList=[{value:'short',name:'Short Film',desc:'A character, a choice, and a cinematic moment',symbol:'◈'},{value:'documentary',name:'Cultural Documentary',desc:'An observed place, tradition or human voice',symbol:'◎'},{value:'reflection',name:'Visual Reflection',desc:'A thought explored through image and sound',symbol:'✦'}];
const sizes=['Wide','Medium','Close-up','Extreme close-up','Overhead','POV','Detail'];
const moves=['Static','Pan','Tilt','Push in','Pull back','Tracking','Handheld'];
const times=['Day','Night','Dawn','Dusk','Golden hour'];
const feelings=['Quiet','Hopeful','Curious','Intimate','Mysterious','Warm','Reflective','Energetic'];
let projects=[],activeScene='',filter='',noticeTimer=0;
function toast(msg){if(!toastElement)return;toastElement.textContent=msg;toastElement.classList.add('on');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>toastElement.classList.remove('on'),3500);}
function safeStore(){try{localStorage.setItem(KEY,JSON.stringify(projects));return true;}catch(e){toast('Device storage is full or blocked. Export a backup before continuing.');return false;}}
const normalShot=s=>({id:clip(s?.id||id(),90),size:sizes.includes(s?.size)?s.size:'Wide',move:moves.includes(s?.move)?s.move:'Static',visual:clip(s?.visual,700),sound:clip(s?.sound,350),duration:Math.max(1,Math.min(300,Number(s?.duration)||8))});
const normalScene=s=>({id:clip(s?.id||id(),90),heading:clip(s?.heading||'New scene',120),place:clip(s?.place||'Location',100),time:times.includes(s?.time)?s.time:'Day',action:clip(s?.action,2200),dialogue:clip(s?.dialogue,1600),voiceover:clip(s?.voiceover,1600),shots:Array.isArray(s?.shots)?s.shots.slice(0,MAX_SHOTS).map(normalShot):[]});
function normalProject(p){
 const p0=p&&typeof p==='object'?p:{};
 return {id:clip(p0.id||id(),90),title:clip(p0.title||'Untitled story',120),type:templateList.some(t=>t.value===p0.type)?p0.type:'short',logline:clip(p0.logline,500),genre:clip(p0.genre,70),feeling:feelings.includes(p0.feeling)?p0.feeling:'Reflective',createdAt:Number.isFinite(Date.parse(p0.createdAt))?p0.createdAt:new Date().toISOString(),updatedAt:Number.isFinite(Date.parse(p0.updatedAt))?p0.updatedAt:new Date().toISOString(),scenes:Array.isArray(p0.scenes)?p0.scenes.slice(0,MAX_SCENES).map(normalScene):[]};
}
try{const raw=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(raw))projects=raw.slice(0,MAX_PROJECTS).map(normalProject);}catch(_){}
function projectById(pid){return projects.find(p=>p.id===pid);}
function sceneById(p,sid){return p?.scenes.find(s=>s.id===sid);}
function mark(p){p.updatedAt=new Date().toISOString();safeStore();const st=$('save-state');if(st)st.textContent='Saved privately on this device';}
function newShot(){return normalShot({id:id(),size:'Wide',move:'Static',visual:'',sound:'',duration:8});}
function newScene(i){return normalScene({id:id(),heading:'Scene '+i,place:'Location',time:'Day',action:'',dialogue:'',voiceover:'',shots:[newShot()]});}
function createProject(type,title,logline){return normalProject({id:id(),type,title,logline,feeling:'Reflective',genre:'',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),scenes:[newScene(1)]});}
function sample(){
 const p=createProject('short','When the harbour becomes quiet','A young sound recordist rediscovers a familiar harbour through the sounds everyone else ignores.');
 p.genre='Contemplative short';p.feeling='Quiet';p.scenes=[
 normalScene({id:id(),heading:'The first sound',place:'Harbour steps',time:'Dawn',action:'Soft daylight finds the empty stone steps. A small recorder rests in a hand. Beyond the frame, ropes tap against a moored boat.',dialogue:'',voiceover:'Some places introduce themselves without speaking.',shots:[{id:id(),size:'Wide',move:'Static',visual:'A still harbour at first light; distant boats separated by mist.',sound:'Water touching stone, light rope taps',duration:12},{id:id(),size:'Detail',move:'Push in',visual:'A finger gently presses the REC button.',sound:'A quiet click; ambience continues',duration:5}]}),
 normalScene({id:id(),heading:'What was always here',place:'Old walkway',time:'Day',action:'The recordist walks slowly, noticing the rhythm of footsteps and wind through railings. Nothing extraordinary happens.',dialogue:'RECORDIST: I used to come here every day.',voiceover:'Listening was the part I had forgotten.',shots:[{id:id(),size:'Medium',move:'Tracking',visual:'Follow the recordist along the sea wall.',sound:'Footsteps, wind, gulls',duration:10},{id:id(),size:'Close-up',move:'Static',visual:'The recordist pauses and listens, eyes closed.',sound:'A brief space of silence',duration:7}]}),
 normalScene({id:id(),heading:'The sound remains',place:'Harbour steps',time:'Dusk',action:'The recorder is switched off. Evening light reflects on the harbour, unchanged and somehow newly familiar.',dialogue:'',voiceover:'It was never silent. I was simply elsewhere.',shots:[{id:id(),size:'Wide',move:'Pull back',visual:'The sea slowly fills the frame as the person becomes small.',sound:'Natural harbour ambience, fade out',duration:14}]})
 ];return p;
}
const intro=(kicker,title,desc)=>'<div class="page-intro"><div class="eyebrow">'+esc(kicker)+'</div><h1>'+title+'</h1><p>'+esc(desc)+'</p></div>';
function buttonNav(page){document.querySelectorAll('[data-nav]').forEach(node=>{let a=node.dataset.nav===page;node.classList.toggle('active',a);if(a)node.setAttribute('aria-current','page');else node.removeAttribute('aria-current');});}
function projectCard(p){
 const shots=p.scenes.reduce((n,s)=>n+s.shots.length,0);
 return '<a class="project-card" href="#/project/'+encodeURIComponent(p.id)+'/workshop"><div class="project-overline"><span>'+esc(templateList.find(t=>t.value===p.type)?.name||'Film')+'</span><span>↗</span></div><span class="film-symbol" aria-hidden="true">▣</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.logline||'An idea waiting to become a film.')+'</p><div class="project-meta"><span>'+p.scenes.length+' scene'+(p.scenes.length===1?'':'s')+'</span><span>'+shots+' shots</span><span>'+dateLabel(p.updatedAt)+'</span></div></a>';
}
function home(){
 const recent=[...projects].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).slice(0,3);
 return '<section class="hero"><div class="hero-content"><div class="eyebrow">THE CREATIVE WORKSPACE · PROTOTYPE 01</div><h1>Make the story<br><em>visible.</em></h1><p>Take one thought. Shape it into scenes, discover your camera angles, and build a storyboard. Start small. See the film before you shoot.</p><div class="actions"><a class="primary" href="#/new">✦ Start a new story</a><button class="secondary" data-action="sample">▷ Explore sample film</button></div><div class="hero-meta"><span>SCREENPLAY</span><span>SHOT LIST</span><span>STORYBOARD</span><span>100% FREE</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-halo"></div><div class="frame outer"><div class="frame middle"><div class="frame inner"><div class="moon"></div><div class="ridge r1"></div><div class="ridge r2"></div></div></div></div><div class="frame-note">FRAME 01 / IMAGINED WORLD</div></div></section>'+
 '<section class="section"><div class="section-top"><div><div class="eyebrow">PICK A STARTING POINT</div><h2>Three ways to begin.</h2></div><p>Choose a format. Everything can be changed later.</p></div><div class="template-grid">'+templateList.map((t,i)=>'<a class="template-card" href="#/new/'+t.value+'"><span class="template-top"><span class="template-id">0'+(i+1)+' / FORM</span><span>↗</span></span><span class="template-symbol">'+t.symbol+'</span><h3>'+esc(t.name)+'</h3><p>'+esc(t.desc)+'</p></a>').join('')+'</div></section>'+
 '<section class="section"><div class="section-top"><div><div class="eyebrow">YOUR WORK</div><h2>Recently on the desk.</h2></div><a href="#/projects" class="text-link">All projects ↗</a></div>'+(recent.length?'<div class="project-grid">'+recent.map(projectCard).join('')+'</div>':empty('Your next story starts here.','Create your first project or open the original sample film.'))+'</section>'+privacy();
}
function empty(title,description){return '<div class="empty"><div class="empty-glyph">▣</div><h3>'+esc(title)+'</h3><p>'+esc(description)+'</p><a class="primary" href="#/new">＋ Create a story</a></div>';}
function privacy(){return '<div class="privacy-strip"><span>◇</span><div><b>Private creative drafts.</b><p>Projects are saved in this browser only. There is no cloud backup or AI video generation. Export JSON backups regularly, especially before clearing browser storage.</p></div></div>';}
function newPage(which){
 const selected=templateList.find(t=>t.value===which)||templateList[0];
 return intro('START SOMETHING ORIGINAL','An idea becomes <em>a scene.</em>','No perfect outline needed. Give your story a working name and a direction, then start shaping scenes.')+
 '<form id="new-form" class="new-form"><div class="field"><label for="project-title">WORKING TITLE *</label><input id="project-title" maxlength="120" required placeholder="The story I want to tell" autocomplete="off"></div><div class="field"><label for="project-type">STORY FORMAT</label><select id="project-type">'+templateList.map(t=>'<option value="'+t.value+'" '+(selected.value===t.value?'selected':'')+'>'+esc(t.name)+'</option>').join('')+'</select></div><div class="field"><label for="project-logline">ONE SENTENCE ABOUT IT (OPTIONAL)</label><textarea id="project-logline" maxlength="500" rows="3" placeholder="Someone wants something, but something changes…"></textarea></div><div class="form-actions"><button class="primary" type="submit">Create story & open studio ↗</button><a class="secondary" href="#/home">Maybe later</a></div><div class="form-foot">No subscription · No automatic publishing · Saved locally on your phone</div></form>'+privacy();
}
function projectsPage(){
 return intro('THE PROJECT LIBRARY','Your stories, <em>in progress.</em>','Each project contains its scenes and shot plans. Everything stays in your browser until you choose to export a backup.')+
 '<div class="library-actions"><a href="#/new" class="primary">＋ New story</a><button data-action="export-all" class="secondary">↓ Back up all projects</button><button data-action="import" class="secondary">↑ Restore backup</button><input id="import-file" class="sr-only" type="file" accept=".json,application/json"></div>'+
 (projects.length?'<div class="project-grid">'+[...projects].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).map(projectCard).join('')+'</div>':empty('An empty film shelf.','Your stories will appear here.'))+privacy();
}
function tabs(p,active){return '<nav class="project-tabs" aria-label="Project sections">'+[['workshop','✎ Workshop'],['screenplay','▤ Screenplay'],['shots','◈ Shot list'],['board','▦ Storyboard']].map(([path,title])=>'<a class="'+(active===path?'active':'')+'" href="#/project/'+encodeURIComponent(p.id)+'/'+path+'">'+title+'</a>').join('')+'</nav>';}
function projectHeader(p,tab){return '<div class="project-top"><a href="#/projects" class="text-link">← All projects</a><span class="storage-label" id="save-state">Saved privately on this device</span></div><div class="project-utility"><button class="secondary" data-action="export-project">↓ Back up this story</button><button class="secondary destructive" data-action="delete-project">Delete story</button></div><div class="project-header"><span class="eyebrow">'+esc(templateList.find(t=>t.value===p.type)?.name||'Film')+' · '+esc(p.feeling.toUpperCase())+'</span><h1>'+esc(p.title)+'</h1><p>'+esc(p.logline||'This story is still taking shape.')+'</p></div>'+tabs(p,tab);}
function optionSet(list,current){return list.map(v=>'<option '+(current===v?'selected':'')+'>'+esc(v)+'</option>').join('');}
function scenesList(p,sid){return '<div class="scene-list"><div class="sidebar-heading">SCENES <span>'+p.scenes.length+'</span></div>'+p.scenes.map((s,i)=>'<button class="scene-item '+(s.id===sid?'current':'')+'" type="button" data-action="choose-scene" data-scene="'+esc(s.id)+'"><span class="scene-number">'+String(i+1).padStart(2,'0')+'</span><span class="scene-caption"><strong>'+esc(s.heading||'New scene')+'</strong><small>'+esc(s.place)+' · '+esc(s.time)+'</small></span><span>›</span></button>').join('')+'<button type="button" class="add-scene" data-action="add-scene">＋ Add scene</button></div>';}
function sceneEditor(p,s){
 if(!s)return '<div class="scene-edit empty"><h3>Begin with a scene.</h3><p>Add the first scene to this story.</p><button class="primary" data-action="add-scene">＋ Add scene</button></div>';
 const idx=p.scenes.findIndex(t=>t.id===s.id);
 return '<div class="scene-edit"><div class="editor-header"><span class="eyebrow">SCENE '+String(idx+1).padStart(2,'0')+' / '+String(p.scenes.length).padStart(2,'0')+'</span><div class="icon-actions"><button class="icon-btn" type="button" data-action="move-scene" data-direction="-1" title="Move scene earlier" '+(idx===0?'disabled':'')+'>↑</button><button class="icon-btn" type="button" data-action="move-scene" data-direction="1" title="Move scene later" '+(idx===p.scenes.length-1?'disabled':'')+'>↓</button><button class="icon-btn danger" type="button" data-action="delete-scene" title="Delete scene">×</button></div></div>'+
 '<div class="field"><label for="scene-heading">SCENE NAME</label><input id="scene-heading" data-scene-field="heading" maxlength="120" value="'+esc(s.heading)+'" placeholder="A new beginning"></div>'+
 '<div class="field-row"><div class="field"><label for="scene-place">LOCATION</label><input id="scene-place" data-scene-field="place" maxlength="100" value="'+esc(s.place)+'" placeholder="Seaside road"></div><div class="field"><label for="scene-time">TIME</label><select id="scene-time" data-scene-field="time">'+optionSet(times,s.time)+'</select></div></div>'+
 '<div class="field"><label for="scene-action">WHAT HAPPENS ON SCREEN?</label><textarea id="scene-action" data-scene-field="action" maxlength="2200" rows="5" placeholder="Describe only what the audience can see or hear.">'+esc(s.action)+'</textarea></div>'+
 '<div class="field"><label for="scene-dialogue">DIALOGUE (OPTIONAL)</label><textarea id="scene-dialogue" data-scene-field="dialogue" maxlength="1600" rows="3" placeholder="CHARACTER: What they say.">'+esc(s.dialogue)+'</textarea></div>'+
 '<div class="field"><label for="scene-voiceover">VOICEOVER / NARRATION (OPTIONAL)</label><textarea id="scene-voiceover" data-scene-field="voiceover" maxlength="1600" rows="3" placeholder="A calm thought in the background…">'+esc(s.voiceover)+'</textarea></div>'+
 '<div class="editor-actions"><span class="small-note">Your edits are saved as you type.</span><a href="#/project/'+encodeURIComponent(p.id)+'/board" class="secondary">See storyboard ↗</a></div>'+
 '<div class="shots-head"><div><div class="eyebrow">PLAN THE CAMERA</div><h3>Shots for this scene</h3><p>Add camera ideas, sound cues and approximate seconds.</p></div><button class="secondary" data-action="add-shot">＋ New shot</button></div>'+
 '<div class="shot-edit-list">'+s.shots.map((shot,i)=>shotEditor(shot,i,s.shots.length)).join('')+'</div></div>';
}
function shotEditor(shot,i,total){return '<div class="shot-edit" data-shot-id="'+esc(shot.id)+'"><div class="shot-edit-head"><strong>SHOT '+String(i+1).padStart(2,'0')+'</strong><div class="icon-actions"><button class="icon-btn" data-action="move-shot" data-shot="'+esc(shot.id)+'" data-direction="-1" '+(i===0?'disabled':'')+'>↑</button><button class="icon-btn" data-action="move-shot" data-shot="'+esc(shot.id)+'" data-direction="1" '+(i===total-1?'disabled':'')+'>↓</button><button class="icon-btn danger" data-action="delete-shot" data-shot="'+esc(shot.id)+'">×</button></div></div><div class="field-row"><div class="field"><label>FRAME</label><select data-shot-field="size" data-shot="'+esc(shot.id)+'">'+optionSet(sizes,shot.size)+'</select></div><div class="field"><label>CAMERA</label><select data-shot-field="move" data-shot="'+esc(shot.id)+'">'+optionSet(moves,shot.move)+'</select></div></div><div class="field"><label>WHAT THE CAMERA SHOWS</label><textarea rows="2" maxlength="700" data-shot-field="visual" data-shot="'+esc(shot.id)+'" placeholder="The face fills the frame…">'+esc(shot.visual)+'</textarea></div><div class="field-row"><div class="field"><label>SOUND / AMBIENCE</label><input maxlength="350" data-shot-field="sound" data-shot="'+esc(shot.id)+'" value="'+esc(shot.sound)+'" placeholder="Wind, footsteps…"></div><div class="field compact"><label>SECONDS</label><input type="number" min="1" max="300" data-shot-field="duration" data-shot="'+esc(shot.id)+'" value="'+shot.duration+'"></div></div></div>';}
function workshop(p){
 if(!p.scenes.some(s=>s.id===activeScene))activeScene=p.scenes[0]?.id||'';
 const s=sceneById(p,activeScene);
 return projectHeader(p,'workshop')+'<div class="workspace-grid"><div class="work-sidebar"><div class="workspace-title">STORY DETAILS</div><div class="field"><label>WORKING TITLE</label><input data-project-field="title" maxlength="120" value="'+esc(p.title)+'"></div><div class="field"><label>ONE-SENTENCE LOGLINE</label><textarea rows="3" data-project-field="logline" maxlength="500">'+esc(p.logline)+'</textarea></div><div class="field-row"><div class="field"><label>GENRE</label><input data-project-field="genre" maxlength="70" value="'+esc(p.genre)+'" placeholder="e.g. Documentary"></div><div class="field"><label>MOOD</label><select data-project-field="feeling">'+optionSet(feelings,p.feeling)+'</select></div></div>'+scenesList(p,activeScene)+'</div>'+sceneEditor(p,s)+'</div>'+privacy();
}
function screenplayText(p){
 let lines=[p.title.toUpperCase(),'STORY ENGINE — WORKING SCREENPLAY','',p.logline,'','---',''];
 p.scenes.forEach((s,i)=>{
  lines.push('SCENE '+(i+1)+' — '+s.heading.toUpperCase(),'EXT./INT. '+s.place.toUpperCase()+' — '+s.time.toUpperCase(),'');
  if(s.action)lines.push(s.action,'');
  if(s.dialogue)lines.push(s.dialogue,'');
  if(s.voiceover)lines.push('VOICEOVER',s.voiceover,'');
  lines.push('---','');
 });return lines.join('\n').trim()+'\n';
}
function screenplay(p){return projectHeader(p,'screenplay')+'<div class="output-top"><div><h2>The written film.</h2><p>Readable working screenplay. Edit scenes in Workshop; print or export the script.</p></div><div class="actions"><button class="secondary" data-action="export-script">↓ Export text</button><button class="primary" data-action="print">▤ Print / PDF</button></div></div><pre class="screenplay-output" id="print-script">'+esc(screenplayText(p))+'</pre>'+privacy();}
function csvQ(v){return '"'+String(v??'').replace(/"/g,'""').replace(/[\r\n]+/g,' ')+'"';}
function shotsCsv(p){return [['Scene','Scene title','Location','Time','Shot','Frame','Camera','Visual','Sound','Seconds'].map(csvQ).join(','),...p.scenes.flatMap((s,i)=>s.shots.map((h,j)=>[i+1,s.heading,s.place,s.time,j+1,h.size,h.move,h.visual,h.sound,h.duration].map(csvQ).join(',')))].join('\r\n');}
function shotList(p){const total=p.scenes.reduce((a,s)=>a+s.shots.length,0),seconds=p.scenes.reduce((a,s)=>a+s.shots.reduce((x,t)=>x+t.duration,0),0);
 return projectHeader(p,'shots')+'<div class="output-top"><div><h2>Every shot has a purpose.</h2><p>'+total+' shots · approximately '+Math.ceil(seconds/60)+' minutes of planned footage. Durations are estimates, not travel or filming time.</p></div><button class="primary" data-action="export-csv">↓ Download shot list</button></div><div class="table-scroll"><table class="shot-table"><thead><tr><th>SCENE</th><th>SHOT</th><th>FRAME</th><th>CAMERA</th><th>IMAGE</th><th>SOUND</th><th>TIME</th></tr></thead><tbody>'+p.scenes.flatMap((s,i)=>s.shots.map((h,j)=>'<tr><td>'+String(i+1).padStart(2,'0')+' · '+esc(s.heading)+'</td><td>'+String(j+1).padStart(2,'0')+'</td><td>'+esc(h.size)+'</td><td>'+esc(h.move)+'</td><td>'+esc(h.visual||'Not described yet')+'</td><td>'+esc(h.sound||'—')+'</td><td>'+h.duration+'s</td></tr>')).join('')+'</tbody></table></div>'+privacy();
}
const palettes=[['#eab9a0','#465770','#151d2f'],['#d6d2c6','#6a6e8b','#21273b'],['#d9aa81','#647c7b','#1a3038'],['#b9a6c8','#4a5b75','#1a1930']];
function frame(shot,i,j){const p=palettes[(i+j)%palettes.length];return '<div class="frame-art" style="--sky:'+p[0]+';--mid:'+p[1]+';--deep:'+p[2]+'"><div class="frame-horizon"></div><div class="frame-land m1"></div><div class="frame-land m2"></div><div class="frame-center"></div><div class="frame-overlay"><span>SHOT '+String(j+1).padStart(2,'0')+'</span><span>'+esc(shot.size.toUpperCase())+'</span></div></div>';}
function storyboard(p){
 let count=0;
 return projectHeader(p,'board')+'<div class="output-top"><div><h2>See the sequence.</h2><p>Schematic frames to plan pacing—not AI images or actual shots. Write what the camera should capture.</p></div><a class="primary" href="#/project/'+encodeURIComponent(p.id)+'/workshop">✎ Edit frames</a></div>'+
 (p.scenes.length?p.scenes.map((s,i)=>'<section class="board-section"><div class="board-head"><span class="eyebrow">SCENE '+String(i+1).padStart(2,'0')+' · '+esc(s.time.toUpperCase())+'</span><h3>'+esc(s.heading)+'</h3><p>'+esc(s.place)+' · '+esc(s.action||'Scene action not described yet.')+'</p></div><div class="board-grid">'+(s.shots.length?s.shots.map((h,j)=>{count++;return '<article class="frame-card">'+frame(h,i,j)+'<div class="frame-copy"><div class="frame-topline">'+esc(h.move)+' · '+h.duration+' sec</div><p>'+esc(h.visual||'Add a visual description in Workshop.')+'</p><small>♪ '+esc(h.sound||'Sound not planned yet')+'</small></div></article>';}).join(''):'<div class="empty">Add a shot in Workshop to build this scene.</div>')+'</div></section>').join(''):empty('Your storyboard is waiting.','Start by adding a scene in Workshop.'))+
 '<p class="board-disclaimer">Storyboard artwork is abstract placeholder illustration. It does not depict real locations, people, copyrighted footage or generated film.</p>'+privacy();
}
function guide(){return intro('THE FILMMAKER’S FIELD GUIDE','From a thought <em>to a film.</em>','A practical starting point for people who want to direct, shoot and edit without needing expensive tools.')+
 '<div class="guide-grid">'+[
 ['01','Find one clear idea','Ask what the film is really about. A logline helps you keep the story focused.'],
 ['02','Build a sequence','Separate the film into scenes. Each scene needs a location, time and something that changes.'],
 ['03','Write for the camera','Describe things the audience can see or hear. Keep descriptions playable, not abstract.'],
 ['04','Plan each shot','Choose framing, camera movement, sound and approximate duration. Combine wide shots with details.'],
 ['05','Watch the storyboard','Check the order of frames and whether the story makes sense visually. Abstract cards are placeholders.'],
 ['06','Create the real film','Record original video and sound with permission. Export the screenplay and shot list for your shoot and editor.']
 ].map(([num,title,desc])=>'<article class="guide-card"><span>'+num+'</span><h3>'+title+'</h3><p>'+desc+'</p></article>').join('')+'</div><div class="guide-note"><div class="eyebrow">IMPORTANT</div><h3>What this prototype does not do</h3><p>It does not generate real videos or claim that abstract storyboard frames are footage. All screenplay and visual descriptions are authored by you. Future AI-assisted visual generation would require explicit approval of any external provider or cost.</p></div>'+privacy();}
function route(){
 const pth=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/');
 const pid=pth[0]==='project'?pth[1]:null;
 const p=pid?projectById(pid):null;
 let view=pth[0]||'home';
 if(view==='project'&&!p){root.innerHTML=empty('Project not on this device.','Restore your backup, or start a new project.');buttonNav('projects');return;}
 const page=view==='home'?home():view==='new'?newPage(pth[1]):view==='projects'?projectsPage():view==='guide'?guide():view==='project'?({workshop:workshop,screenplay,shots:shotList,board:storyboard}[pth[2]]||workshop)(p):home();
 root.innerHTML=page;buttonNav(view==='project'?'projects':view);window.scrollTo({top:0,behavior:'instant'});
}
function currentProject(){const p=location.hash.replace(/^#\/?/,'').split('/');return p[0]==='project'?projectById(p[1]):null;}
function currentScene(p){return sceneById(p,activeScene);}
function download(name,text,type){const u=URL.createObjectURL(new Blob([text],{type})),link=document.createElement('a');link.href=u;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(u),10000);}
function filename(p){return (p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,45)||'story');}
function exportAll(){if(!projects.length){toast('There are no projects to back up.');return;}download('story-engine-all-projects-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({app:'Story Engine',version:1,exportedAt:new Date().toISOString(),projects},null,2),'application/json');toast('Backup requested. Check your Downloads folder.');}
function exportOne(p){download(filename(p)+'.json',JSON.stringify({app:'Story Engine',version:1,exportedAt:new Date().toISOString(),projects:[p]},null,2),'application/json');toast('Project backup requested.');}
async function restore(file){
 if(!file)return;
 if(file.size>3*1024*1024){toast('That file is too large. Maximum 3 MB.');return;}
 try{
  const data=JSON.parse(await file.text());
  if(data?.app!=='Story Engine'||!Array.isArray(data.projects))throw Error('Not a Story Engine backup.');
  if(data.projects.length>MAX_PROJECTS)throw Error('Too many projects in backup.');
  const restored=data.projects.map(normalProject),existing=new Set(projects.map(p=>p.id)),fresh=[];for(const item of restored){if(existing.has(item.id)||fresh.length>=MAX_PROJECTS-projects.length)continue;existing.add(item.id);fresh.push(item);}
  if(!fresh.length){toast('No new projects to restore. Existing IDs are kept.');return;}
  if(!confirm('Import '+fresh.length+' project(s)? Existing work will not be overwritten.'))return;
  const before=projects;projects=[...projects,...fresh];if(!safeStore()){projects=before;return;}route();toast(fresh.length+' project(s) restored privately.');
 }catch(err){toast('Import failed: '+(err.message||'Invalid backup.'));}
}
function targetField(e){
 const t=e.target,p=currentProject();if(!p)return;
 if(t.dataset.projectField){const field=t.dataset.projectField;if(['title','logline','genre','feeling'].includes(field)){p[field]=clip(t.value,field==='title'?120:field==='logline'?500:70);mark(p);}return;}
 const scene=currentScene(p);
 if(!scene)return;
 if(t.dataset.sceneField){const field=t.dataset.sceneField;if(['heading','place','time','action','dialogue','voiceover'].includes(field)){const limit={heading:120,place:100,time:40,action:2200,dialogue:1600,voiceover:1600};scene[field]=clip(t.value,limit[field]);mark(p);}return;}
 if(t.dataset.shotField){const shot=scene.shots.find(q=>q.id===t.dataset.shot);if(!shot)return;const f=t.dataset.shotField;if(f==='duration')shot.duration=Math.max(1,Math.min(300,Number(t.value)||8));else if(['size','move','visual','sound'].includes(f))shot[f]=clip(t.value,{size:40,move:50,visual:700,sound:350}[f]);mark(p);}
}
function moveItem(items,from,to){if(from<0||to<0||to>=items.length)return false;[items[from],items[to]]=[items[to],items[from]];return true;}
root.addEventListener('submit',ev=>{
 if(ev.target.id!=='new-form')return;ev.preventDefault();
 const title=$('project-title').value.trim(),type=$('project-type').value,logline=$('project-logline').value.trim();
 if(!title){toast('A working title is required.');return;}
 if(projects.length>=MAX_PROJECTS){toast('Maximum 30 projects. Export a backup before clearing old work.');return;}
 const p=createProject(type,title,logline);projects.unshift(p);if(!safeStore()){projects.shift();return;}activeScene=p.scenes[0].id;location.hash='#/project/'+encodeURIComponent(p.id)+'/workshop';toast('Story created. Your studio is ready.');
});
root.addEventListener('input',ev=>{targetField(ev);});
root.addEventListener('change',ev=>{targetField(ev);if(ev.target.id==='import-file'){restore(ev.target.files?.[0]);ev.target.value='';}});
root.addEventListener('click',ev=>{
 const t=ev.target.closest('[data-action]');if(!t)return;
 const act=t.dataset.action,p=currentProject(),s=currentScene(p);
 if(act==='sample'){
   if(projects.length>=MAX_PROJECTS){toast('Project limit reached. Back up existing work first.');return;}
   const item=sample();projects.unshift(item);if(!safeStore()){projects.shift();return;}activeScene=item.scenes[0].id;location.hash='#/project/'+encodeURIComponent(item.id)+'/workshop';return;
 }
 if(act==='import'){$('import-file')?.click();return;}
 if(act==='export-all'){exportAll();return;}
 if(!p)return;
 if(act==='export-project'){exportOne(p);return;}
 if(act==='delete-project'){if(!confirm('Delete this entire story, its scenes and shot plans from this device? Export a backup first if needed.'))return;const old=projects;projects=projects.filter(q=>q.id!==p.id);if(!safeStore()){projects=old;return;}activeScene='';location.hash='#/projects';route();toast('Story deleted from this device.');return;}
 if(act==='export-script'){download(filename(p)+'-screenplay.txt',screenplayText(p),'text/plain;charset=utf-8');toast('Screenplay text requested.');return;}
 if(act==='export-csv'){download(filename(p)+'-shot-list.csv',shotsCsv(p),'text/csv;charset=utf-8');toast('Shot list requested.');return;}
 if(act==='print'){window.print();return;}
 if(act==='choose-scene'){activeScene=t.dataset.scene;route();return;}
 if(act==='add-scene'){if(p.scenes.length>=MAX_SCENES){toast('Maximum 40 scenes per project.');return;}const newS=newScene(p.scenes.length+1);p.scenes.push(newS);activeScene=newS.id;mark(p);route();return;}
 if(act==='move-scene'){const i=p.scenes.findIndex(k=>k.id===activeScene);if(moveItem(p.scenes,i,i+Number(t.dataset.direction))){mark(p);route();}return;}
 if(act==='delete-scene'){
   if(!s||!confirm('Delete this scene and all of its shot plans? This cannot be undone.'))return;
   const i=p.scenes.indexOf(s);p.scenes.splice(i,1);activeScene=p.scenes[Math.min(i,p.scenes.length-1)]?.id||'';mark(p);route();return;
 }
 if(!s)return;
 if(act==='add-shot'){if(s.shots.length>=MAX_SHOTS){toast('Maximum 24 shots per scene.');return;}s.shots.push(newShot());mark(p);route();return;}
 if(act==='move-shot'){const i=s.shots.findIndex(h=>h.id===t.dataset.shot);if(moveItem(s.shots,i,i+Number(t.dataset.direction))){mark(p);route();}return;}
 if(act==='delete-shot'){const i=s.shots.findIndex(h=>h.id===t.dataset.shot);if(i<0||!confirm('Remove this shot from the plan?'))return;s.shots.splice(i,1);mark(p);route();return;}
});
window.addEventListener('hashchange',()=>route());
window.addEventListener('beforeunload',()=>{});
if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{}));}
route();
})();