/* HeartClear interactive explorer. Additive module: no changes to player, media or existing reading tools. */
(function(){
  'use strict';
  const STORE='heartclearExplorerV1';
  const tracks={
    fatiha:{
      name:'Al-Fatiha',meta:'7 steps · personal reflection',source:'Al-Fatiha (Qur’an 1:1–7)',target:'hcFatiha',targetLabel:'Read all seven verses',
      intro:'A guided way to explore the seven verses alongside Akmal’s questions about mercy, breath and everyday action. These are personal reflections, not Qur’an translation or authoritative tafsir.',
      steps:[
        {name:'Begin with mercy',ref:'1:1 · Opening',idea:'Beginning in God’s name can become a daily question: will I begin my next action with compassion rather than impatience?',practice:'Notice how you intend to speak to the next person.',question:'Where can I begin with greater mercy today?'},
        {name:'Life and gratitude',ref:'1:2 · Praise',idea:'Praise can invite gratitude for life and the wider world. Breath is a personal metaphor for interdependence here, not a literal definition of Allah.',practice:'Notice one easy, natural breath. Do not force or hold it.',question:'What ordinary thing am I grateful for today?'},
        {name:'Mercy returns',ref:'1:3 · Mercy',idea:'The theme of mercy returns. Repetition can serve as a reminder to practise care, not just repeat words. This is a reflective application, not a medical claim.',practice:'Think of one small, kind action that can be done today.',question:'Did I show mercy when I had a choice?'},
        {name:'Look at your actions',ref:'1:4 · Judgment',idea:'The verse concerns the Day of Judgment. A separate everyday exercise is to ask whether my actions reflect the values I say I hold.',practice:'Review one choice without trying to punish or judge yourself.',question:'What would I like to do differently next time?'},
        {name:'Help and belonging',ref:'1:5 · Worship and help',idea:'The prayer speaks in the plural: “we”. Alongside its theological meaning, that can prompt questions about dependence, relationships and responsibility.',practice:'Notice someone who has helped you or whom you could help.',question:'Where could I accept help or offer it?'},
        {name:'Ask for guidance',ref:'1:6 · Straight path',idea:'Asking for guidance can be reflected in daily choices about honesty, compassion and fairness. The full verse carries its own religious meaning.',practice:'Choose one value for the next decision in front of you.',question:'Which value will guide my next choice?'},
        {name:'Live what you learn',ref:'1:7 · The path',idea:'A closing reflection: understanding a value and living it are different things. A small repeated action can matter more than an impressive statement.',practice:'Make one achievable commitment without setting a streak or deadline.',question:'How will I express this in real life?'}
      ]
    },
    human:{
      name:'Human Practice',meta:'4 steps · mind and meaning',source:'HeartClear · HUMAN → ALONE → PARADOX → LOVE',target:'human',targetLabel:'Open Human Practice',
      intro:'Follow four connected questions from the HUMAN writing journey. No right answers, scores, or required beliefs.',
      steps:[
        {name:'Human',ref:'1 · Being here',idea:'Before defining yourself by a title, role or history, notice the simple experience of being present.',practice:'Look around and notice three ordinary details.',question:'Who am I when I put my labels aside?'},
        {name:'Alone',ref:'2 · Quiet company',idea:'Being alone may reveal both discomfort and freedom. This exercise does not require isolation; you can explore it while safely connected to others.',practice:'Sit or walk quietly for a comfortable moment.',question:'What appears when I stop filling every silence?'},
        {name:'Paradox',ref:'3 · Two perspectives',idea:'Sometimes two thoughts seem incompatible. Not every question needs an immediate conclusion; curiosity can be useful.',practice:'Notice an inner question without forcing an answer.',question:'Which two ideas am I holding at once?'},
        {name:'Love in action',ref:'4 · Compassion',idea:'Love becomes concrete through attention, respect, boundaries and kindness rather than a claim about how a person must feel.',practice:'Choose one respectful act of care, including care for yourself.',question:'What is one real action that expresses care?'}
      ]
    },
    awareness:{
      name:'Awareness',meta:'5 steps · gentle attention',source:'HeartClear · everyday noticing',target:'quietTimer',targetLabel:'Open quiet timer',
      intro:'A short, secular introduction to attention, natural breathing and ordinary awareness. Pause, skip or repeat any step.',
      steps:[
        {name:'Arrive',ref:'1 · Place',idea:'Awareness can begin with where you are, not with reaching a special state.',practice:'Feel where your feet or body meet a comfortable surface.',question:'What tells me I am here right now?'},
        {name:'Natural breath',ref:'2 · Rhythm',idea:'Breathing changes on its own. Let it stay comfortable; no holds or deep-breath targets are needed.',practice:'Observe one or two natural breaths and let them continue.',question:'What did I notice without trying to control it?'},
        {name:'Listen',ref:'3 · Sound',idea:'Sound arrives from different directions and distances. Listening gives attention a simple place to return.',practice:'Notice a nearby sound and a quieter background sound.',question:'Which sound had I been overlooking?'},
        {name:'Thoughts pass',ref:'4 · Mind',idea:'Thoughts and feelings can appear without becoming instructions. You may simply notice them, or return to surroundings.',practice:'Name the experience gently: thinking, listening, or resting.',question:'What happened when I did not chase the thought?'},
        {name:'Return to life',ref:'5 · Everyday action',idea:'Awareness is useful during everyday activities, not just while sitting in stillness.',practice:'Bring attention to the next simple task you already planned.',question:'Where can I practise a little more presence?'}
      ]
    }
  };
  let track='fatiha',step=0;
  const byId=id=>document.getElementById(id);
  const state=()=>{
    try{const s=JSON.parse(localStorage.getItem(STORE)||'{}');return s&&typeof s==='object'&&!Array.isArray(s)?s:{};}catch(e){return {};}
  };
  const save=s=>{try{localStorage.setItem(STORE,JSON.stringify(s));return true;}catch(e){return false;}};
  function record(){
    const s=state();
    s.track=track;s.positions=s.positions||{};s.positions[track]=step;
    return s;
  }
  function noteKey(){return track+':'+step;}
  function saveNote(){
    const s=record(),notes=(s.notes&&typeof s.notes==='object')?s.notes:{};
    notes[noteKey()]=String(byId('hcxeNote')?.value||'').slice(0,700);s.notes=notes;
    const ok=save(s);
    const label=byId('hcxeSaved');
    if(label)label.textContent=ok?'Saved only on this device.':'Could not save on this device. Check browser storage.';
    return ok;
  }
  function mount(){
    if(byId('hcExplorer'))return;
    const css=document.createElement('link');css.rel='stylesheet';css.href='./hc-explorer.css?v=126';document.head.appendChild(css);
    const homeButton=document.createElement('button');
    homeButton.type='button';homeButton.className='choice hcxe-entry';
    homeButton.innerHTML='<b>Explore · Interactive journeys</b><small>Step through Al-Fatiha, HUMAN, and awareness · personal notes</small>';
    homeButton.addEventListener('click',()=>open('fatiha'));
    const homeRef=byId('home')?.querySelector('.hc-home-secondary-resumes');
    if(homeRef)homeRef.before(homeButton);
    const libButton=document.createElement('button');libButton.type='button';libButton.className='hub-card';
    libButton.innerHTML='<span class="hub-icon" aria-hidden="true">◉</span><span><b>Interactive journeys</b><small>Explore one idea at a time and save private reflections.</small></span><span class="hub-arrow" aria-hidden="true">›</span>';
    libButton.addEventListener('click',()=>open());
    const libRef=byId('library')?.querySelector('.hub-grid');if(libRef)libRef.appendChild(libButton);
    const screen=document.createElement('section');screen.className='screen hcxe-screen';screen.id='hcExplorer';
    screen.setAttribute('aria-labelledby','hcxeHeading');
    screen.innerHTML=
    '<div class="hcxe-wrapper">'+
      '<button class="collection-back" type="button" id="hcxeBack">‹ Library</button>'+
      '<div class="kicker">HeartClear · Learn and reflect</div>'+
      '<h2 id="hcxeHeading">Explore one idea at a time.</h2>'+
      '<p class="hcxe-lead">Choose a journey, then step forward or jump to any chapter. Stay at your own pace.</p>'+
      '<div class="hcxe-tracks" role="group" aria-label="Choose journey">'+
        '<button type="button" data-hcxe-track="fatiha">Al-Fatiha</button>'+
        '<button type="button" data-hcxe-track="human">HUMAN</button>'+
        '<button type="button" data-hcxe-track="awareness">Awareness</button>'+
      '</div>'+
      '<div class="hcxe-panel">'+
        '<div class="hcxe-meta" id="hcxeMeta"></div>'+
        '<h3 id="hcxeTrackName"></h3><p id="hcxeTrackIntro"></p>'+
        '<div class="hcxe-steps" id="hcxeSteps" role="group" aria-label="Journey steps"></div>'+
        '<div class="hcxe-visual" aria-hidden="true"><span class="hcxe-ring hcxe-ring-a"></span><span class="hcxe-ring hcxe-ring-b"></span><span class="hcxe-core"></span><small id="hcxeVisualLabel">NOTICE · REFLECT · RETURN</small></div>'+
        '<div class="hcxe-reference" id="hcxeReference"></div>'+
        '<h3 class="hcxe-step-title" id="hcxeTitle"></h3>'+
        '<p class="hcxe-idea" id="hcxeIdea"></p>'+
        '<div class="hcxe-practice"><b>A gentle way to try this</b><p id="hcxePractice"></p></div>'+
        '<label class="hcxe-question" for="hcxeNote" id="hcxeQuestion"></label>'+
        '<textarea id="hcxeNote" maxlength="700" rows="3" placeholder="Optional private reflection…"></textarea>'+
        '<div class="hcxe-saved" id="hcxeSaved" role="status" aria-live="polite">Your notes stay on this device.</div>'+
        '<button class="hcxe-mark" type="button" id="hcxeMark">Mark step explored</button>'+
        '<div class="hcxe-actions"><button type="button" id="hcxePrev">‹ Previous</button><button type="button" id="hcxeNext">Next ›</button></div>'+
      '</div>'+
      '<button class="hcxe-related" type="button" id="hcxeRelated">Open related HeartClear practice</button>'+
      '<p class="hcxe-privacy">No account, scores or compulsory streak. Notes are kept in local browser storage and are included in HeartClear’s existing Export my data and Erase personal data tools.</p>'+
    '</div>';
    byId('bottomNav').before(screen);
    byId('hcxeBack').addEventListener('click',()=>show('library'));
    screen.querySelectorAll('[data-hcxe-track]').forEach(btn=>btn.addEventListener('click',()=>switchTrack(btn.dataset.hcxeTrack)));
    byId('hcxeNote').addEventListener('input',saveNote);
    byId('hcxeMark').addEventListener('click',()=>{
      saveNote();const s=record();s.done=s.done||{};
      const key=noteKey();s.done[key]=!s.done[key];
      save(s);render();
    });
    byId('hcxePrev').addEventListener('click',()=>changeStep(-1));
    byId('hcxeNext').addEventListener('click',()=>changeStep(1));
    byId('hcxeRelated').addEventListener('click',()=>{
      saveNote();
      if(track==='fatiha')show('hcFatiha');
      else if(track==='human')show('human');
      else if(typeof openQuietTimer==='function')openQuietTimer();
      else show('practices');
    });
    screen.addEventListener('keydown',event=>{
      if(event.target===byId('hcxeNote'))return;
      if(event.key==='ArrowRight'){event.preventDefault();changeStep(1);}
      if(event.key==='ArrowLeft'){event.preventDefault();changeStep(-1);}
    });
  }
  function open(which){
    mount();
    const s=state(),choice=tracks[which]?which:(tracks[s.track]?s.track:'fatiha');
    track=choice;
    const position=s.positions&&Number(s.positions[choice]);
    step=Number.isInteger(position)?Math.max(0,Math.min(tracks[choice].steps.length-1,position)):0;
    render();show('hcExplorer');
    const ctx=byId('topContext');if(ctx)ctx.textContent='Interactive Journey';
    document.querySelectorAll('.nav-item').forEach(btn=>btn.classList.toggle('active',btn.dataset.nav==='library'));
  }
  function switchTrack(which){
    if(!tracks[which]||which===track)return;
    saveNote();const s=state();track=which;
    const next=s.positions&&Number(s.positions[which]);
    step=Number.isInteger(next)?Math.max(0,Math.min(tracks[which].steps.length-1,next)):0;
    save(record());render();
  }
  function changeStep(delta){
    const next=Math.max(0,Math.min(tracks[track].steps.length-1,step+delta));
    if(next===step)return;
    saveNote();step=next;save(record());render();
    byId('hcxeReference')?.scrollIntoView({block:'nearest',behavior:'auto'});
  }
  function render(){
    const t=tracks[track],current=t.steps[step],s=state(),done=s.done||{};
    byId('hcxeMeta').textContent=t.meta;
    byId('hcxeTrackName').textContent=t.name;
    byId('hcxeTrackIntro').textContent=t.intro;
    byId('hcxeReference').textContent=current.ref;
    byId('hcxeTitle').textContent=current.name;
    byId('hcxeIdea').textContent=current.idea;
    byId('hcxePractice').textContent=current.practice;
    byId('hcxeQuestion').textContent='Reflect: '+current.question;
    byId('hcxeVisualLabel').textContent='STEP '+(step+1)+' OF '+t.steps.length;
    byId('hcxeNote').value=(s.notes&&s.notes[noteKey()])||'';
    byId('hcxeMark').textContent=done[noteKey()]?'✓ Explored · tap to undo':'Mark step explored';
    byId('hcxeMark').setAttribute('aria-pressed',String(!!done[noteKey()]));
    byId('hcxeRelated').textContent=t.targetLabel+' →';
    byId('hcxeSaved').textContent='Your note stays on this device.';
    byId('hcxePrev').disabled=step===0;
    byId('hcxeNext').disabled=step===t.steps.length-1;
    byId('hcxeNext').textContent=step===t.steps.length-1?'End of journey':'Next ›';
    byId('hcxeSteps').replaceChildren();
    t.steps.forEach((item,i)=>{
      const btn=document.createElement('button');btn.type='button';btn.textContent=String(i+1);
      btn.title=item.name;btn.setAttribute('aria-label','Step '+(i+1)+': '+item.name+(done[track+':'+i]?', explored':''));
      btn.setAttribute('aria-current',i===step?'step':'false');
      btn.classList.toggle('hcxe-done',!!done[track+':'+i]);
      btn.addEventListener('click',()=>{if(i!==step){saveNote();step=i;save(record());render();}});
      byId('hcxeSteps').appendChild(btn);
    });
    document.querySelectorAll('#hcExplorer [data-hcxe-track]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.hcxeTrack===track)));
    save(record());
  }
  window.hcExplorerOpen=open;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
