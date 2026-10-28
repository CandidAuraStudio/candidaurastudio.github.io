/* HeartClear v254: the headphones button always opens All Listening.
   Keep the original recordings; never pretend a Drive MP4 is native audio. */
(function(){
'use strict';
if(document.getElementById('hcListening'))return;
const $=id=>document.getElementById(id);
if(!$('soundHub')||!$('hcFlowDockListen')||typeof window.show!=='function')return;
const view=document.createElement('section');view.className='screen';view.id='hcListening';
view.setAttribute('aria-label','All HeartClear listening');
view.innerHTML='<div class="hcl-page"><div class="hcl-heading"><span>HEARTCLEAR · ∞</span><h2>All Listening</h2><p>All your recordings, in one place.</p></div><input id="hclSearch" type="search" placeholder="Search recordings…" aria-label="Search audio and meditation"><nav id="hclTabs" aria-label="Listening categories"></nav><p id="hclStatus" role="status" aria-live="polite">Choose something to listen to.</p><div id="hclResults"></div></div>';
$('soundHub').parentNode.insertBefore(view,$('soundHub'));
const tabs=$('hclTabs'),results=$('hclResults'),search=$('hclSearch'),status=$('hclStatus');
const groups=[['all','All'],['meditation','Meditation'],['breathing','Breathing'],['islamic','Islamic'],['hindu','Hindu'],['bible','Bible'],['buddhist','Buddhist'],['quran','Qur’an'],['nature','Nature & Sounds'],['books','Audiobooks']];
let current='all';
const guided=[
 ['wake','Deep Wake Up','10 min · guided audio','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/f4d262f6-56fe-40e3-84ea-930c11fe7c54.mp3',600],
 ['noon','Noon Reset','40 min · guided audio','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/b7f691a0-16a1-4449-b143-38e7b3be74df.mp3',2400],
 ['evening','Evening Release','60 min · guided audio','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/93c0e1fe-0e8b-4e7e-9277-47edf8dd0b63.mp3',3600],
 ['sleep','Deep Sleep','60 min · guided audio','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/74f43c24-d734-4ace-b1d0-f1c3263cb299.mp3',3600]
];
const breath=[
 ['Energy Breathwork','10 min · original video','17te3Zv0HblXhmSBWuBknyf4Lp8DsjfKl'],
 ['Daily Breathwork','15 min · original video','1Sk1zzpCcNvJ9tS7YgoLzIzENQ-J7yPk8'],
 ['Guided Breathwork','About 25 min · original video','15bNBXKo8Jirf1v4thoA4vc7Dfqirm3bD'],
 ['Breathwork Journey','40 min · original video','1Nii8-WXhiUfUU8T4yQtPrxL1ZSLnHITb'],
 ['Transformational Breathwork','60 min · original video','1pZ0q75WOiPkOxNSoNQVqqFj9Ehkk2hYV'],
 ['Guided Deep Sleep','60 min · original video','1fPW6jZcgOcZFi0ZnDIfvCzIUepydS5V7']
];
if(typeof soundLabTracks!=='undefined')guided.forEach(([key,name,detail,url,duration])=>{
 if(!soundLabTracks['hcl-'+key])soundLabTracks['hcl-'+key]={title:name,desc:detail,url,duration};
});
if(typeof HC_DRIVE_COLLECTIONS!=='undefined')breath.forEach(([name,type,id],i)=>{
 const key='hclBreath'+i;
 if(!HC_DRIVE_COLLECTIONS.some(x=>x.key===key))HC_DRIVE_COLLECTIONS.push({key,name,type,id,section:'meditation',note:'Original user-uploaded video; no separate native audio stream.'});
});
const record=(id,name,detail,category,kind,key,ref=null)=>({id,name,detail,category,kind,key,ref});
function list(){
 const all=[];const add=x=>{if(!all.some(y=>y.id===x.id))all.push(x)};
 add(record('private-deep-hold','Deep Hold · Akmal special','17:11 · your private recording','meditation','private','deep-hold'));
 add(record('private-resilience','Resilience · 5 Rounds','26:29 · your private recording','meditation','private','resilience'));
 guided.forEach(([key,name,detail])=>add(record('guided-'+key,name,detail,'meditation','audio','hcl-'+key)));
 add(record('hindu-library','Hindu Scriptures · Gita and Vedas','Read original teachings · English / Tamil','hindu','hindu-library','hindu'));
 add(record('bible-genesis','Bible · Genesis','Read and listen · English / Tamil','bible','bible','genesis'));
 add(record('adhkar','Morning Adhkar','28:18 · native audio','islamic','adhkar','adhkar'));
 add(record('allahu','Allahu Hu · Akmal','24:32 · native audio','islamic','audio','allahuAkmal'));
 add(record('mantra','Mantra Bed','8 min · separate native audio','hindu','audio','mantra'));
 add(record('flute','Acoustic Bansuri · Original audio','7:54 · original recording','nature','audio','organicBansuri'));
 add(record('gita','Bhagavad Gita · Human voice','18 chapters · original readings','hindu','gita','gita'));
 if(typeof HC_DRIVE_COLLECTIONS!=='undefined')HC_DRIVE_COLLECTIONS.forEach(item=>{
  if(item.key==='islamHuAkmal'||item.key==='generalDuduk')return;
  const category=item.section==='islamic'?'islamic':item.section==='hindu'?'hindu':item.section==='meditation'?'breathing':'nature';
  if(category==='breathing'&&!item.key.startsWith('hclBreath'))return;
  const meta=item.key==='hinduOm'?'3:33:33 · Drive player · no native audio stream':String(item.type||'Original recording').replace(/\s*·\s*(?:original )?video\b/gi,'')+' · Drive player';
  add(record('drive-'+item.key,item.name,meta,category,'drive',item.key));
 });
 if(typeof hcMiniBrowseItems==='function')hcMiniBrowseItems().forEach(item=>{
  if(item.category==='quran')add(record('quran-'+item.key,item.name,item.detail,'quran','audio',item.key));
  else if(item.category==='sounds'&&item.kind==='audio'){
   const flute=/bansuri|flute|duduk/i.test(item.name+' '+item.key);
   add(record('sound-'+item.key,item.name,item.detail,/mantra/i.test(item.key)?'hindu':/allahu|dhikr/i.test(item.key+' '+item.name)?'islamic':'nature','audio',item.key));
  }else if(item.kind==='practice'&&item.el&&!/adhkar/i.test(item.name)&&!guided.some(row=>row[1]===item.name))
   add(record('extra-'+item.name,item.name,item.detail,'meditation','practice',null,item.el));
 });
 add(record('book-en','Shadows of Truth · English audiobook','Resume saved chapter · native audio','books','book','en'));
 add(record('book-ta','Shadows of Truth · Tamil audiobook','Resume saved chapter · native audio','books','book','ta'));
 return all;
}
function choose(cat){
 current=cat;
 search.value='';
 tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===cat)));
 say('');
 render();
}
groups.forEach(([category,title])=>{
 const b=document.createElement('button');b.type='button';b.dataset.category=category;b.textContent=title;b.setAttribute('aria-pressed',String(category==='all'));b.addEventListener('click',()=>choose(category));tabs.appendChild(b);
});
function itemButton(item){
 const b=document.createElement('button');b.type='button';b.className='hcl-record';b.dataset.record=item.id;
 const icon=document.createElement('span');icon.className='hcl-record-icon';icon.textContent='▶';
 const info=document.createElement('span');info.className='hcl-record-info';
 const title=document.createElement('strong');title.textContent=item.name;
 const desc=document.createElement('small');desc.textContent=item.detail;
 info.append(title,desc);
 const action=document.createElement('span');action.className='hcl-record-action';action.textContent=item.kind==='private'&&!window.hcPrivateVideoReady?.(item.key)?'Add once':item.kind==='drive'?'Play':['book','bible','hindu-library','gita','practice'].includes(item.kind)?'Open':'Play';
 b.append(icon,info,action);b.setAttribute('aria-label',(item.kind==='private'?'Play private recording ':['drive','book','bible','hindu-library','gita','practice'].includes(item.kind)?'Open ':'Play ')+item.name);
 b.addEventListener('click',()=>play(item));return b;
}
function section(cat,items,limit=0){
 const group=document.createElement('section');group.className='hcl-group';
 const header=document.createElement('div');header.className='hcl-group-title';
 const title=document.createElement('h3');title.textContent=groups.find(g=>g[0]===cat)?.[1]||'Results';header.appendChild(title);
 if(limit&&items.length>limit){const more=document.createElement('button');more.type='button';more.textContent='See all';more.addEventListener('click',()=>choose(cat));header.append(more)}
 group.append(header);
 if(!items.length){const p=document.createElement('p');p.className='hcl-empty';p.textContent=cat==='buddhist'?'Buddhist audio has not been uploaded yet.':'No recordings found.';group.append(p)}
 else items.slice(0,limit||items.length).forEach(item=>group.append(itemButton(item)));
 return group;
}
function render(){
 const q=search.value.trim().toLocaleLowerCase();results.replaceChildren();const all=list();
 if(q){results.append(section('search',all.filter(item=>(item.name+' '+item.detail+' '+item.category).toLowerCase().includes(q))));return}
 if(current==='all'){['meditation','breathing','islamic','hindu','bible','quran','nature','books','buddhist'].forEach(cat=>results.append(section(cat,all.filter(x=>x.category===cat),3)))}
 else results.append(section(current,all.filter(x=>x.category===current)));
}
function say(text){status.textContent=text;status.hidden=!text}
function play(item){
 try{
  if(item.kind==='audio'){
   if(typeof hcQuickPlaySound!=='function')throw Error('Audio player missing');
   const p=hcQuickPlaySound(item.key);if(p?.catch)p.catch(()=>say('Unable to play this audio. Check your connection.'));
   say('Selected · '+item.name);
  }else if(item.kind==='private'){
   if(typeof window.hcPrivatePlayTrack!=='function')throw Error('Private video player unavailable');
   window.hcPrivatePlayTrack(item.key);
   say('Private recording selected · your first play lets you choose the saved file on this device.');
  }else if(item.kind==='adhkar'){
   const p=hcInlineToggleAdhkar();if(p?.catch)p.catch(()=>say('Unable to play Morning Adhkar.'));
   say('Morning Adhkar selected · pause from the mini-player.');
  }else if(item.kind==='drive'){
   // Keep the headphones page active BEFORE opening the floating Drive player.
   // Previously, show('hcListening') ran AFTER opening and immediately minimized
   // the new iframe, making the Play tap appear to do nothing on mobile.
   if(!$('hcListening').classList.contains('active'))window.show('hcListening');
   const fn=window.hcOpenDriveDock||window.openHcDriveMedia;
   if(typeof fn!=='function')throw Error('Video player unavailable');
   fn(item.key,'hcListening');
   const drive=$('hcOneTapDrive');
   if(drive&&!drive.hidden&&drive.classList.contains('hc-ot-collapsed'))$('hcOtMinimize')?.click();
   say('Recording opened · some Google Drive previews may require one extra Play tap.');
  }else if(item.kind==='hindu-library'){
   if(typeof openSacred!=='function')throw Error('Hindu library unavailable');
   openSacred('hindu');
   const shelf=$('hcHinduScriptures');
   if(shelf){shelf.hidden=false;requestAnimationFrame(()=>shelf.scrollIntoView({block:'start'}));}
   say('Hindu Scriptures opened.');
  }else if(item.kind==='bible'){
   // Use the already mounted Genesis reader/player. Do not claim it opened if the module failed to load.
   const card=$('hcGenesisCard'),playButton=$('hcGenPlay');
   if(!card||!playButton)throw Error('Genesis reader/player is unavailable');
   window.show('home');
   requestAnimationFrame(()=>{
    card.scrollIntoView({block:'start',behavior:'auto'});
    playButton.focus({preventScroll:true});
   });
   say('Genesis player opened. Tap Listen to begin.');
  }else if(item.kind==='gita'){
   // Open the real chapter controls at the saved chapter/language; never report playback without a Play gesture.
   if(typeof window.hcOpenGitaVoice!=='function')throw Error('Gita chapter player is unavailable');
   window.hcOpenGitaVoice(undefined,undefined,{autoplay:false});
   say('Gita chapter controls opened. Tap Play when ready.');
  }else if(item.kind==='practice'){
   item.ref.click();say('Guided practice selected.');
  }else if(item.kind==='book'){
   const lang=item.key;
   if(typeof openBookAudio!=='function')throw Error('Audiobook unavailable');
   const chapter=typeof currentBookAudioLang!=='undefined'&&currentBookAudioLang===lang?Number(currentBookChapter)||1:1;
   openBookAudio(lang,chapter);
   if(typeof bookAudioEl!=='undefined'&&bookAudioEl?.src){
    const p=bookAudioEl.play();if(p?.catch)p.catch(()=>say('Audiobook ready; tap Play to resume.'));
   }
   say('Audiobook selected · saved chapter '+chapter);
  }
  // All Listening remains the destination, even when a legacy player opens a screen.
  if(!$('hcListening').classList.contains('active')&&['audio','adhkar'].includes(item.kind))window.show('hcListening');
  if(typeof renderGlobalMini==='function')renderGlobalMini();
 }catch(e){say('Unable to open the selected recording.')}
}
function synchronize(){
 const active=$('hcListening').classList.contains('active');
 document.body.classList.toggle('hc-listening-visible',active);
 if(active){
  $('hcFlowDockListen')?.setAttribute('aria-current','page');
  const om=$('hcOmMiniV252');
  if(om&&!om.hidden&&om.dataset.mode==='failed')$('hcomClose')?.click();
 }
}
const originalShow=window.show;
window.show=function(){
 const entering=arguments[0]==='hcListening'&&!$('hcListening').classList.contains('active');
 const out=originalShow.apply(this,arguments);
 if(entering){choose('all');window.scrollTo(0,0)}
 synchronize();
 return out;
};
window.hcOpenAllListening=function(){
 if(typeof hcCloseMiniLibrary==='function')hcCloseMiniLibrary();
 if(!$('hcListening').classList.contains('active'))window.show('hcListening');
 else{choose('all');synchronize()}
 window.scrollTo(0,0);
};
const headphone=$('hcFlowDockListen');
headphone.setAttribute('aria-label','All listening');headphone.title='All Listening';
document.addEventListener('click',event=>{
 if(!event.target.closest?.('#hcFlowDockListen'))return;
 event.preventDefault();event.stopImmediatePropagation();window.hcOpenAllListening();
},true);
search.addEventListener('input',render);
window.addEventListener('pageshow',()=>{
 if($('hcListening').classList.contains('active'))choose('all');
 synchronize();
});
render();say('');synchronize();
})();