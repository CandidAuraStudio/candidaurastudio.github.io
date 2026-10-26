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
 let mode='menu',history=[],step=null,recognition=null,generation=0,voiceAllowed=false,language='en-US',pending=null,finished=false,voiceTimer=null;
 const labels={yes:'Yes',no:'No',unsure:'Unsure'};
 const gameLimit=core.gameQuestionLimit||20;
 const gameCount=()=>history.filter(h=>!/^(identity:|reject:)/.test(h.id)).length;
 const questionText=id=>mode==='health'?core.healthQuestions[id]+(core.healthHelp[id]?' '+core.healthHelp[id]:''):core.questions.find(q=>q.id===id)?.text||id;
 function stopVoice(){
  generation++;clearTimeout(voiceTimer);voiceTimer=null;
  if(recognition){const old=recognition;recognition=null;old.onresult=old.onerror=old.onend=old.onstart=null;try{old.abort()}catch(e){}}
  pending=null;
 }
 function reset(){stopVoice();mode='menu';history=[];step=null;finished=false;voiceAllowed=false;dialog.innerHTML='';}
 function close(){dialog.close();reset();trigger.focus();}
 function onlineText(){return navigator.onLine?'Online · tap or speak':'Offline · tap answers available; voice may need internet';}
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
    '<button class="hcx-choice" data-mode="game">Guess my thought<small>People, nature &amp; everyday things · up to '+gameLimit+' questions</small></button>'+
    '<button class="hcx-choice" data-mode="health">Help me explain<small>Private symptom notes · adults · urinary &amp; general concerns</small></button>'+
    '<p>'+core.bank.length+' subjects'+(core.gameStats?.publicFigures?' · '+core.gameStats.publicFigures+' source-linked public figures':' · basic collection')+'. A match needs supporting clues and your confirmation. It cannot read minds or identify private names.</p>';
  }else{
   step=mode==='game'?core.gameStep(history):core.healthStep(history);
   html='<p class="hcx-meta">'+(mode==='game'?'Guess my thought · '+gameCount()+' / '+gameLimit:'Help me explain · not a diagnosis')+'</p>';
   if(finished){html+='<h2 id="hcxTitle" tabindex="-1">Found it.</h2><p>Your answers helped narrow it down.</p><button class="hcx-primary" data-action="restart">Play again</button>';}
   else if(step.kind==='question'){
    html+='<h2 id="hcxTitle" tabindex="-1" data-question="'+step.id+'">'+escape(step.text)+'</h2>'+(step.help?'<p>'+escape(step.help)+'</p>':'')+
     '<div class="hcx-answers">'+Object.entries(labels).map(([value,label])=>'<button data-answer="'+value+'">'+label+'</button>').join('')+'</div>'+
     '<div class="hcx-tools"><button data-action="speak" aria-label="Speak an answer">Speak</button><label>Voice <select aria-label="Voice language"><option value="en-US"'+(language==='en-US'?' selected':'')+'>English</option><option value="ta-IN"'+(language==='ta-IN'?' selected':'')+'>Tamil</option></select></label></div>'+
     '<div class="hcx-voice-panel" id="hcxVoicePanel" hidden></div><div class="hcx-status" id="hcxVoiceStatus" role="status" aria-live="polite"></div>';
   }else if(step.kind==='guess'){
    html+='<h2 id="hcxTitle" tabindex="-1">'+escape(step.message)+'</h2><div class="hcx-tools"><button data-action="correct">That is right</button><button data-action="incorrect">That is not it · try another</button></div><p class="hcx-meta">A wrong answer is removed from this round; no repeated guess.</p>';
    if(step.evidence?.length){
     html+='<details><summary>Why this guess?</summary><ul>'+step.evidence.slice(-8).map(e=>'<li>'+escape(e.question)+' — '+escape(labels[e.answer])+'</li>').join('')+'</ul>';
     if(/^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/.test(step.source||''))html+='<a href="'+step.source+'" target="_blank" rel="noopener noreferrer">Public-figure facts · Wikidata ↗</a><p>Missing facts are treated as unknown. Source data can contain errors; confirm the match yourself.</p>';
     html+='</details>';
    }
   }else if(step.kind==='ambiguous'){
    html+='<h2 id="hcxTitle" tabindex="-1">I need another clue.</h2><p>'+escape(step.message)+'</p>'+
     '<details><summary>Some possible matches</summary><ul>'+(step.items||[]).map(item=>'<li>'+escape(item.name)+'</li>').join('')+'</ul><p>These are possibilities, not identified answers.</p></details><button class="hcx-primary" data-action="restart">Start again</button>';
   }else if(step.kind==='unknown'){
    html+='<h2 id="hcxTitle" tabindex="-1">I do not know yet.</h2><p>'+escape(step.message)+'</p><button class="hcx-primary" data-action="restart">Start again</button>';
   }else{
    html+='<div class="hcx-warning"><h2 id="hcxTitle" tabindex="-1">'+escape(step.title)+'</h2><p>'+escape(step.message)+'</p></div>'+
     '<details><summary>Your answers</summary><div class="hcx-summary">'+escape(summary())+'</div></details>'+
     '<div class="hcx-tools"><button data-action="copy">Copy symptom notes</button><button data-action="restart">Start again</button></div><div class="hcx-status" id="hcxVoiceStatus" role="status" aria-live="polite"></div>';
   }
   if(mode==='game'&&history.some(h=>!/^(identity:|reject:)/.test(h.id))){
    html+='<details class="hcx-answer-review"><summary>Review or correct answers</summary><div class="hcx-review-list">'+
     history.map((h,i)=>({h,i})).filter(({h})=>!/^(identity:|reject:)/.test(h.id))
      .map(({h,i})=>'<label><span>'+escape(questionText(h.id))+'</span><select data-review-index="'+i+'">'+
       Object.entries(labels).map(([key,label])=>'<option value="'+key+'"'+(h.answer===key?' selected':'')+'>'+label+'</option>').join('')+
      '</select></label>').join('')+'</div></details>';
   }
   html+='<div class="hcx-tools">'+(history.length?'<button data-action="back">Back</button>':'')+'<button data-action="menu">Explore menu</button></div>';
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
  if(button.dataset.mode){mode=button.dataset.mode;history=[];finished=false;render();return;}
  if(button.dataset.answer){answer(button.dataset.answer);return;}
  switch(button.dataset.action){
   case 'close':close();break;
   case 'menu':stopVoice();mode='menu';history=[];finished=false;render();break;
   case 'restart':history=[];finished=false;render();break;
   case 'back':history.pop();finished=false;render();break;
   case 'correct':finished=true;render();break;
   case 'incorrect':{stopVoice();if(mode==='game'&&step?.kind==='guess'&&step.item?.id){history.push({id:'identity:'+step.item.id,answer:'no'});finished=false;render();}else{step={kind:'unknown'};render();}break;}
   case 'speak':speak();break;
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
 dialog.addEventListener('change',event=>{
   const target=event.target;
   if(target.matches('select[data-review-index]')&&mode==='game'){
    const index=Number(target.dataset.reviewIndex),value=target.value;
    if(!Number.isInteger(index)||index<0||index>=history.length||!labels[value])return;
    stopVoice();history[index]={...history[index],answer:value};
    history=history.filter(h=>!/^(identity:|reject:)/.test(h.id));
    finished=false;render();return;
   }
   if(target.matches('select')){language=target.value;stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Voice language changed. Tap Speak when ready.');}
  });
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 // A close event is dispatched asynchronously. If a new Explore session has
 // already been opened, do not let its old close event wipe the new questions.
 dialog.addEventListener('close',()=>{if(!dialog.open&&dialog.innerHTML)reset();});
 trigger.addEventListener('click',()=>{reset();render();dialog.showModal();dialog.querySelector('#hcxTitle')?.focus();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Microphone stopped. Tap Speak when ready.');}});
 window.addEventListener('pagehide',()=>{if(dialog.open)close();else reset();});
 for(const event of ['online','offline'])window.addEventListener(event,()=>{
  if(event==='offline'){stopVoice();const panel=dialog.querySelector('#hcxVoicePanel');if(panel)panel.hidden=true;status('Connection lost. Tap answers are still available.');}
  const label=dialog.querySelector('#hcxConnection');if(label)label.textContent=onlineText();
 });
})();
