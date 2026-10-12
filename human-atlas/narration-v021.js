/* HUMAN ATLAS v02.1 — Choose locally installed voices, prefer your own recording.
   No external audio service and no synthesized voice is played without a user action. */
(function () {
  "use strict";
  const dialog = document.getElementById("story-dialog");
  const body = document.getElementById("dialog-body");
  if (!dialog || !body) return;
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  const PREF_KEY = "human-atlas:narrator-voice:v021";
  const SAMPLE = "Welcome to Human Atlas. Every life holds a world.";
  const MALE_LABEL = /\bmale\b|\b(daniel|alex|david|ryan|matthew|thomas|oliver|george|arthur|brian|james|guy|john|rishi|fred|william)\b/i;
  let voiceList = [], utterance = null, loadingTimer = null;
  const el = id => document.getElementById(id);
  const getPref = () => { try { return localStorage.getItem(PREF_KEY); } catch (_) { return null; } };
  const putPref = value => { try { localStorage.setItem(PREF_KEY, value); } catch (_) { /* unavailable storage */ } };
  function status(text) { const n=el("narration-status"); if(n) n.textContent=text; }
  function key(v) { return [v.voiceURI,v.lang,v.name].join("||"); }
  function currentAudio() { return el("voice-player"); }
  function hasRecording() { const audio = currentAudio(); return !!(audio && !audio.hidden && audio.getAttribute("src")); }
  function updateToolbar() {
    const button=el("listen-btn");if(!button || !dialog.open)return;
    const audio=currentAudio();
    if(audio && hasRecording()) button.textContent=audio.paused ? "▷ My recording" : "Ⅱ Pause audio";
    else if(utterance) button.textContent="■ Stop narration";
    else button.textContent="▷ Listen";
  }
  function stopSpeech() {
    utterance=null;
    if(synth) try { synth.cancel(); } catch (_) { /* ignore unavailable engine */ }
    updateToolbar();
  }
  function stopRecordingPlayback() {const audio=currentAudio();if(audio && !audio.paused)audio.pause();}
  function voices() {
    if (!synth || !synth.getVoices) return [];
    const all = synth.getVoices();
    return all.filter(v=>/^en(?:$|[-_])/i.test(v.lang)).sort((a,b) => a.name.localeCompare(b.name));
  }
  function refreshVoices() {
    const picker=el("narration-voice");
    if(!picker)return;
    voiceList=voices();
    const pref=getPref();
    const current=picker.value;
    const suggestion=voiceList.find(v=>MALE_LABEL.test(v.name) && !/\bfemale\b/i.test(v.name));
    const selectValue=pref!==null ? pref : (suggestion ? key(suggestion) : "off");
    const desired=current && current!=="off" && voiceList.some(v=>key(v)===current) ? current : selectValue;
    const frag=document.createDocumentFragment();
    const off=document.createElement("option");off.value="off";off.textContent="Off — use my own recording";frag.appendChild(off);
    for(const v of voiceList){const option=document.createElement("option");option.value=key(v);option.textContent=v.name+" ("+v.lang+")";frag.appendChild(option);}
    picker.replaceChildren(frag);
    picker.value=voiceList.some(v=>key(v)===desired)?desired:"off";
    if(!synth)status("Your browser has no built-in voice reader. You can use your own recordings.");
    else if(!voiceList.length)status("No English device voices available yet. Try Chrome, or use your recording.");
    else if(picker.value==="off")status("No voice will be generated automatically. Choose a device voice and tap Sample to hear it.");
    else if(pref===null && suggestion && picker.value===key(suggestion))status("A lower-sounding voice appears available. Tap Sample to judge it before listening.");
    else status("Selected device voice: "+picker.options[picker.selectedIndex].text+". Tap Sample first.");
  }
  function chosenVoice() {
    const picker=el("narration-voice");
    if(!picker || picker.value==="off")return null;
    return voiceList.find(v=>key(v)===picker.value) || null;
  }
  function speak(text, preview) {
    const voice=chosenVoice();
    if(!synth||!window.SpeechSynthesisUtterance||!voice){status("Choose an available device voice or listen to your own recording.");return;}
    stopRecordingPlayback();
    stopSpeech();
    const u=new SpeechSynthesisUtterance(text);
    u.voice=voice;u.lang=voice.lang;
    u.rate=.88;u.pitch=MALE_LABEL.test(voice.name)&&!/\bfemale\b/i.test(voice.name)? .94 : .86;
    u.volume=1;
    utterance=u;
    u.onend=()=>{if(utterance===u){utterance=null;status(preview?"Sample finished.":"Narration finished.");updateToolbar();}};
    u.onerror=event=>{if(utterance===u){utterance=null;if(event.error!=="interrupted"&&event.error!=="canceled")status("This device voice could not play. Choose another voice or use your recording.");updateToolbar();}};
    try {synth.speak(u);status(preview?"Playing a short voice sample.":"Reading the story with your selected device voice.");updateToolbar();}
    catch(_){utterance=null;status("Could not start the voice. Try a different device voice.");updateToolbar();}
  }
  function storyText() {
    const parts=[el("story-title")?.textContent || ""];
    body.querySelectorAll(".modal-intro,.paragraph").forEach(node=>parts.push(node.textContent||""));
    return parts.filter(Boolean).join(". ");
  }
  function jumpToRecording() {
    const section=body.querySelector(".voice-section");
    if(section){section.scrollIntoView({behavior:"smooth",block:"start"});status("Record or play your own narration in the section below.");}
  }
  function toggle() {
    if(!dialog.open)return;
    const audio=currentAudio();
    if(hasRecording()) {
      stopSpeech();
      if(audio.paused) {
        const p=audio.play();
        if(p&&p.catch)p.catch(()=>status("Could not play this saved recording. Try using its player below."));
        status("Playing your own recorded narration.");
      } else {audio.pause();status("Your recording is paused.");}
      updateToolbar();return;
    }
    if(utterance){stopSpeech();status("Synthetic narration stopped.");return;}
    const chosen=chosenVoice();
    if(!chosen){
      status("The previous default female voice is disabled. Choose a voice above, or record your own narration below.");
      jumpToRecording();return;
    }
    speak(storyText(),false);
  }
  function mount() {
    if(!dialog.open)return;
    const article=body.querySelector(".modal-body-inner");
    if(!article)return;
    if(!el("narration-settings")){
      const panel=document.createElement("section");
      panel.id="narration-settings";panel.className="narration-settings";
      panel.setAttribute("aria-label","Narration voice settings");
      const title=document.createElement("h3");title.textContent="Choose how to listen";
      const copy=document.createElement("p");copy.textContent="Your own recording plays first. Otherwise choose an English voice available on this phone. No paid AI voice is connected.";
      const label=document.createElement("label");label.htmlFor="narration-voice";label.textContent="Device reading voice";
      const picker=document.createElement("select");picker.id="narration-voice";picker.setAttribute("aria-label","Select text-to-speech voice");
      const actions=document.createElement("div");actions.className="narration-actions";
      const sample=document.createElement("button");sample.type="button";sample.dataset.narration="sample";sample.textContent="▷ Hear sample";
      const own=document.createElement("button");own.type="button";own.dataset.narration="own";own.textContent="↓ My recording";
      actions.append(sample,own);
      const info=document.createElement("p");info.id="narration-status";info.className="narration-status";info.setAttribute("role","status");info.setAttribute("aria-live","polite");
      panel.append(title,copy,label,picker,actions,info);
      const controls=article.querySelector(".modal-controls");
      if(controls)controls.insertAdjacentElement("afterend",panel);
      else article.insertBefore(panel,article.firstChild);
      refreshVoices();
    }
    const audio=currentAudio();
    if(audio && audio.dataset.narrationObserved!=="yes"){
      audio.dataset.narrationObserved="yes";
      const obs=new MutationObserver(updateToolbar);
      obs.observe(audio,{attributes:true,attributeFilter:["src","hidden"]});
      for (const event of ["play","pause","ended"])audio.addEventListener(event,()=>{if(event==="play")stopSpeech();updateToolbar();});
    }
    updateToolbar();
  }
  dialog.addEventListener("click",event=>{
    const btn=event.target.closest("[data-narration]");
    if(!btn || !dialog.contains(btn))return;
    event.preventDefault();
    if(btn.dataset.narration==="sample"){if(!chosenVoice())status("Choose an English device voice from the list, then tap Sample.");else speak(SAMPLE,true);}
    if(btn.dataset.narration==="own")jumpToRecording();
  });
  dialog.addEventListener("change",event=>{
    if(event.target.id!=="narration-voice")return;
    stopSpeech();putPref(event.target.value);
    status(event.target.value==="off"?"Synthetic narration disabled. Your own recordings take priority.":"Voice selected. Tap Hear sample to audition it.");
  });
  dialog.addEventListener("click",event=>{
    const btn=event.target.closest("[data-voice-action='start']");
    if(btn){stopSpeech();stopRecordingPlayback();}
  },true);
  dialog.addEventListener("close",()=>{stopSpeech();if(loadingTimer)clearTimeout(loadingTimer);});
  if(synth){if(synth.addEventListener)synth.addEventListener("voiceschanged",refreshVoices);else synth.onvoiceschanged=refreshVoices;}
  const observer=new MutationObserver(()=>{if(dialog.open)mount();});
  observer.observe(body,{childList:true});
  window.HumanAtlasNarration={toggle,mount,refreshVoices,sync:updateToolbar,stop:stopSpeech};
  if(dialog.open)mount();
  loadingTimer=setTimeout(refreshVoices,700);
  setTimeout(refreshVoices,1700);
})();