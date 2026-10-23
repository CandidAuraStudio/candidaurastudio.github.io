/* Additive Explore dialog. Answers are ephemeral; only explicit copy sends text to the clipboard. */
(function(){
 'use strict';
 const core=window.HCExploreCore,home=document.getElementById('home'),anchor=home?.querySelector('.hc-simple-start');
 if(!core||!anchor||document.getElementById('hcExploreOpen'))return;
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const trigger=document.createElement('button');trigger.id='hcExploreOpen';trigger.type='button';
 trigger.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4z"/></svg><span>Explore · Play &amp; check in</span>';
 trigger.setAttribute('aria-haspopup','dialog');anchor.after(trigger);
 const dialog=document.createElement('dialog');dialog.id='hcExploreDialog';dialog.setAttribute('aria-labelledby','hcxTitle');
 document.body.append(dialog);
 let mode='menu',history=[],step=null,recognition=null,generation=0,voiceAllowed=false,language='en-US',pending=null,finished=false,voiceTimer=null,teaching=false,learnOffer=false,learnedMessage='',confirmedItem=null,routes={};
 const labels={yes:'Yes',no:'No',unsure:'Unsure'};
 const questionText=id=>mode==='health'?core.healthQuestions[id]+(core.healthHelp[id]?' '+core.healthHelp[id]:''):core.questions.find(q=>q.id===id)?.text||id;
 function stopVoice(){
  generation++;clearTimeout(voiceTimer);voiceTimer=null;
  if(recognition){const old=recognition;recognition=null;old.onresult=old.onerror=old.onend=old.onstart=null;try{old.abort()}catch(e){}}
  pending=null;
 }
 function reset(){stopVoice();mode='menu';history=[];step=null;finished=false;teaching=false;learnOffer=false;learnedMessage='';confirmedItem=null;voiceAllowed=false;dialog.innerHTML='';}
 function close(){dialog.close();reset();trigger.focus();}
 function onlineText(){return navigator.onLine?'Online · tap answers':'Offline · tap answers available; voice may need internet';}
  async function loadRoutes(){try{const res=await fetch('./hc-explore-routes.json');if(res.ok){const data=await res.json();if(data&&typeof data==='object')routes=data;}}catch(e){routes={};}}
 function summary(){
  const intro='HeartClear symptom notes — not a diagnosis.\n'+new Date().toLocaleDateString()+'\n';
  const rows=history.map(h=>questionText(h.id)+'\nAnswer: '+labels[h.answer]).join('\n\n');
  return intro+'\n'+rows+(step?.kind==='result'?'\n\nSuggested next step: '+step.title+'\n'+step.message:'');
 }
 function privacy(){return '<details><summary>Privacy &amp; limits</summary><p>Tap answers stay in this page’s memory and clear when you close Explore or reload. HC does not save or upload them. Copying puts your notes on your device’s clipboard.</p><p>Optional voice may send microphone audio to your browser provider for speech recognition. Voice and language availability depend on your browser and connection. Review each recognised answer before using it.</p><p>This is a limited symptom organiser, not a diagnosis or a complete medical assessment. It cannot rule out illness, prescribe medicine or fasting, or decide whether you are fit for work. The question pathways have not been independently clinically validated.</p></details>';}
 function sources(){return '<details><summary>Health information sources</summary><p>Public NHS guidance · source pages checked '+core.sourceChecked+'. UK service numbers are not used here; contact medical services where you are.</p>'+core.sources.map(s=>'<a href="'+s.url+'" target="_blank" rel="noopener noreferrer">'+s.name+' ↗</a>').join('')+'</details>';}
 function render(){
  stopVoice();
  let html='';
  if(mode==='menu'){
   html='<h2 id="hcxTitle" tabindex="-1">A little discovery.</h2>'+
    '<button class="hcx-choice" data-mode="game">Guess my thought<small>People, nature &amp; everyday things · up to '+(core.gameQuestionLimit||25)+' questions</small></button>'+
    '<p>Optional speech recognition can send microphone audio to your browser provider. Tap answers are always available.</p>'+
    '<p>The game includes '+core.bank.length+' subjects, including '+core.bank.filter(x=>x.tags.includes('music')).length+' musicians. Each guess is tentative. Choose “That is not it” to exclude a wrong candidate; some answers may be outside the collection.</p>';
  }else{
   step=mode==='game'?core.gameStep(history):core.healthStep(history);
   html='<p class="hcx-meta">'+(mode==='game'?'Guess my thought · '+history.filter(x=>!x.id.startsWith('reject:')).length+' / '+(core.gameQuestionLimit||25):'Help me explain · not a diagnosis')+'</p>';
   if(finished){const offer=routes[confirmedItem?.id];html+='<h2 id="hcxTitle" tabindex="-1">Found it.</h2><p>Your answers helped narrow it down.</p>'+(offer&&offer.screen?'<p>Would you like to…</p><button class="hcx-primary" data-action="route">'+escape(offer.label)+'</button>':'')+'<button class="hcx-primary" data-action="restart">Play again</button>';}
    else if(teaching){html+='<h2 id="hcxTitle" tabindex="-1">What were you thinking of?</h2><p>Save this item and your yes/no answers on this device only. Avoid entering private names.</p><label>Name <input id="hcxTeachName" maxlength="60" autocomplete="off" placeholder="Item name"></label><label>Type <select id="hcxTeachCategory"><option value="person">Person</option><option value="animal">Animal</option><option value="plant">Plant</option><option value="food">Food</option><option value="place">Place</option><option value="object">Object</option><option value="concept">Idea or feeling</option></select></label><div class="hcx-tools"><button data-action="saveTeach">Save on this device</button><button data-action="cancelTeach">Cancel</button></div><p class="hcx-status" id="hcxTeachStatus" role="status"></p>';}
   else if(step.kind==='question'){
    html+='<h2 id="hcxTitle" tabindex="-1" data-question="'+step.id+'">'+escape(step.text)+'</h2>'+(step.help?'<p>'+escape(step.help)+'</p>':'')+
     '<div class="hcx-answers">'+Object.entries(labels).map(([value,label])=>'<button data-answer="'+value+'">'+label+'</button>').join('')+'</div>'+
     '<div class="hcx-tools"><button data-action="speak" aria-label="Speak an answer">Speak</button><label>Voice <select aria-label="Voice language"><option value="en-US"'+(language==='en-US'?' selected':'')+'>English</option><option value="ta-IN"'+(language==='ta-IN'?' selected':'')+'>Tamil</option></select></label></div>'+
     '<div class="hcx-voice-panel" id="hcxVoicePanel" hidden></div><div class="hcx-status" id="hcxVoiceStatus" role="status" aria-live="polite"></div>';
   }else if(step.kind==='guess'){
    html+='<h2 id="hcxTitle" tabindex="-1">'+escape(step.message)+'</h2><div class="hcx-tools"><button data-action="correct">That is right</button><button data-action="incorrect">That is not it · try another</button></div><p class="hcx-meta">A wrong answer is removed from this round; no repeated guess.</p>';
   }else if(step.kind==='unknown'){
    html+='<h2 id="hcxTitle" tabindex="-1">I do not know yet.</h2><p>'+escape(step.message)+'</p><button class="hcx-primary" data-action="teach">Teach me</button><button data-action="restart">Start again</button>';
   }else{
    html+='<div class="hcx-warning"><h2 id="hcxTitle" tabindex="-1">'+escape(step.title)+'</h2><p>'+escape(step.message)+'</p></div>'+
     '<details><summary>Your answers</summary><div class="hcx-summary">'+escape(summary())+'</div></details>'+
     '<div class="hcx-tools"><button data-action="copy">Copy symptom notes</button><button data-action="restart">Start again</button></div><div class="hcx-status" id="hcxVoiceStatus" role="status" aria-live="polite"></div>';
   }
   html+='<div class="hcx-tools">'+(history.length?'<button data-action="back">Back</button>':'')+(mode==='game'&&learnOffer&&!teaching&&!finished?'<button data-action="teach">Teach me</button>':'')+'<button data-action="menu">Explore menu</button>'+(mode==='game'&&core.localCount?.()?'<button data-action="forgetTeach">Erase learned items ('+core.localCount()+')</button>':'')+'</div>'+(learnedMessage?'<p class="hcx-status" role="status">'+escape(learnedMessage)+'</p>':'');
  }
  html+='<p class="hcx-meta" id="hcxConnection">'+onlineText()+'</p>'+(mode==='health'?sources()+privacy():'');
  dialog.innerHTML='<div class="hcx-top"><b>Explore</b><button class="hcx-close" data-action="close" aria-label="Close Explore">×</button></div><div class="hcx-body">'+html+'</div>';
  if(mode!=='menu'&&step?.kind==='question'&&!getRecognition()){
   dialog.querySelector('[data-action="speak"]').disabled=true;
   status('Voice is unavailable in this browser. Tap an answer.');
  }
  dialog.querySelector('#hcxTitle')?.focus({preventScroll:true});dialog.scrollTop=0;
 }
 function status(text){const el=dialog.querySelector('#hcxVoiceStatus');if(el)el.textContent=text;}
 function answer(value){
  if(!dialog.open||step?.kind!=='question'||!labels[value])return;
  history.push({id:step.id,answer:value});render();
 }
 function getRecognition(){return window.SpeechRecognition||window.webkitSpeechRecognition;}
 function speak(){
  if(!dialog.open||step?.kind!=='question')return;
  stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');
  if(!voiceAllowed){
   panel.hidden=false;panel.innerHTML='<p>Voice may send your microphone audio to your browser provider. HC does not save recordings. You can always use the tap buttons instead. Speak only “Yes”, “No” or “Unsure”, or the Tamil equivalent, then confirm the result.</p><div class="hcx-tools"><button data-action="enable">Enable voice</button><button data-action="cancelVoice">Use tap answers</button></div>';return;
  }
  const Recognition=getRecognition();if(!Recognition){status('Voice is unavailable in this browser. Tap an answer.');return;}
  if(!navigator.onLine){status('Voice may need internet. Tap an answer while offline.');return;}
  const token=generation,id=step.id;
  let current;
  try{current=new Recognition();recognition=current;current.lang=language;current.continuous=false;current.interimResults=false;current.maxAlternatives=1;}
  catch(e){status('Voice could not start. Tap an answer.');return;}
  const valid=()=>dialog.open&&recognition===current&&token===generation&&step?.kind==='question'&&step.id===id;
  panel.hidden=false;panel.innerHTML='<p>Listening for one answer…</p><button class="hcx-secondary" data-action="cancelVoice">Stop microphone</button>';
  status('Listening…');
  current.onresult=event=>{
   if(!valid())return;
   const transcript=event.results?.[0]?.[0]?.transcript||'';
   const value=core.parseAnswer(transcript);stopVoice();
   if(!value){panel.hidden=true;status('I could not identify one clear answer. Say only Yes, No or Unsure, or tap a button.');return;}
   pending={value,id};panel.hidden=false;
   panel.innerHTML='<p>I heard “'+escape(transcript)+'”. Please confirm.</p><div class="hcx-tools"><button data-action="confirmVoice">Use “'+labels[value]+'”</button><button data-action="cancelVoice">Discard</button></div>';
   status('Your answer has not been submitted.');
  };
  current.onerror=event=>{
   if(!valid())return;stopVoice();panel.hidden=true;
   status(event.error==='not-allowed'||event.error==='service-not-allowed'?'Microphone access was not granted. Tap an answer.':'Voice was unavailable or unclear. Tap an answer or try again.');
  };
  current.onend=()=>{if(!valid())return;stopVoice();panel.hidden=true;status('No answer received. Tap an answer or try again.');};
  try{current.start();voiceTimer=setTimeout(()=>{if(!valid())return;stopVoice();panel.hidden=true;status('Listening stopped. Tap an answer or try again.');},12000);}
  catch(e){stopVoice();panel.hidden=true;status('Voice could not start. Tap an answer.');}
 }
 dialog.addEventListener('click',async event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.mode){mode=button.dataset.mode;history=[];finished=false;teaching=false;learnOffer=false;learnedMessage='';render();return;}
  if(button.dataset.answer){answer(button.dataset.answer);return;}
  switch(button.dataset.action){
   case 'close':close();break;
   case 'menu':stopVoice();mode='menu';history=[];finished=false;teaching=false;learnOffer=false;render();break;
   case 'restart':history=[];finished=false;teaching=false;learnOffer=false;confirmedItem=null;render();break;
   case 'back':history.pop();finished=false;teaching=false;learnOffer=false;render();break;
   case 'correct':confirmedItem=step?.item;finished=true;render();break;
   case 'incorrect':{stopVoice();if(mode==='game'&&step?.kind==='guess'&&step.item?.id){history.push({id:'reject:'+step.item.id,answer:'no'});learnOffer=true;finished=false;render();}break;}
   case 'speak':speak();break;
    case 'teach':teaching=true;render();break;
    case 'cancelTeach':teaching=false;render();break;
    case 'saveTeach':{
     const name=dialog.querySelector('#hcxTeachName')?.value||'';
     const category=dialog.querySelector('#hcxTeachCategory')?.value||'concept';
     const response=core.teachLocal?.(name,category,history)||{ok:false,message:'Learning unavailable.'};
     if(!response.ok){const target=dialog.querySelector('#hcxTeachStatus');if(target)target.textContent=response.message;break;}
     history=[];teaching=false;learnOffer=false;learnedMessage=response.message;render();break;
    }
    case 'forgetTeach':{
     const ok=core.forgetLocal?.();if(ok){history=[];teaching=false;learnOffer=false;learnedMessage='Learned items erased from this device.';render();}break;
    }
    case 'route':{
     const offer=routes[confirmedItem?.id];if(!offer||!offer.screen)break;
     close();if(typeof window.show==='function')window.show(offer.screen);
     if(offer.target){const el=document.querySelector(offer.target);if(el)el.scrollIntoView({block:'start',behavior:'smooth'});}
     break;
    }
   case 'enable':voiceAllowed=true;speak();break;
   case 'confirmVoice':{const proposal=pending;if(proposal&&proposal.id===step?.id)answer(proposal.value);break;}
   case 'cancelVoice':stopVoice();dialog.querySelector('#hcxVoicePanel').hidden=true;status('Tap an answer, or choose Speak when ready.');break;
   case 'copy':{
    const notes=summary(),token=generation;
    try{await navigator.clipboard.writeText(notes);if(dialog.open&&token===generation)status('Symptom notes copied. Share them only with someone you choose.');}
    catch(e){if(dialog.open&&token===generation)status('Copy was unavailable. Open Your answers to select the notes manually.');}break;
   }
  }
 });
 dialog.addEventListener('change',event=>{if(event.target.matches('select')){language=event.target.value;stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Voice language changed. Tap Speak when ready.');}});
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 dialog.addEventListener('close',()=>{if(dialog.innerHTML)reset();});
 trigger.addEventListener('click',()=>{reset();loadRoutes();render();dialog.showModal();dialog.querySelector('#hcxTitle')?.focus();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Microphone stopped. Tap Speak when ready.');}});
 window.addEventListener('pagehide',()=>{if(dialog.open)close();else reset();});
 for(const event of ['online','offline'])window.addEventListener(event,()=>{
  if(event==='offline'){stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Connection lost. Tap answers are still available.');}
  const label=dialog.querySelector('#hcxConnection');if(label)label.textContent=onlineText();
 });
})();
