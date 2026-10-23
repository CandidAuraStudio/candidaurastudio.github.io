/* HeartClear: one active foreground media source, without interrupting muted visuals. */
(function(){
 'use strict';
 const keyFor={audio:'meditation',adhkarAudio:'adhkar',soundLabAudio:'soundlab',
  fearAudio:'fear',bookAudioEl:'book',hcGenesisAudio:'genesis',hcQuranMeaningAudio:'quran-meaning',
  hcIslamPrivateAudio:'private-islam'};
 document.addEventListener('play',function(event){
  const playing=event.target;
  if(!(playing instanceof HTMLMediaElement))return;
  if(playing.tagName==='VIDEO'&&(playing.muted||playing.volume===0))return;
  // Preserve mute-only meditation visuals, but avoid two unrelated spoken tracks.
  document.querySelectorAll('audio,video').forEach(function(other){
   if(other===playing||other.paused)return;
   if(other.tagName==='VIDEO'&&(other.muted||other.volume===0))return;
   try{other.pause()}catch(e){}
  });
  if(typeof hcMixRunning!=='undefined'&&hcMixRunning&&typeof hcMixStop==='function')hcMixStop(false);
  const key=keyFor[playing.id]||(playing.closest('#hcGitaOriginalPanel')?'gita':null);
  if(key)try{localStorage.setItem('heartclearActiveMedia',key)}catch(e){}
  if(typeof renderGlobalMini==='function')requestAnimationFrame(function(){renderGlobalMini()});
 },true);
 document.addEventListener('pause',function(event){
  if(!(event.target instanceof HTMLMediaElement))return;
  if(typeof renderGlobalMini==='function')requestAnimationFrame(function(){renderGlobalMini()});
 },true);
})();
