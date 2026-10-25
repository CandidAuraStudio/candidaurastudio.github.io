/* HeartClear v283 — original two-hour dhikr, native audio when the
 * verified extracted M4A has been approved and deployed at this path.
 * NEVER use the 265 MB Drive MP4 or replace it with another recording.
 * Reuse HeartClear's existing soundLabAudio and universal mini-player. */
(function(){
 'use strict';
 const key='islamDhir120';
 const url='./media/voice/HeartClear_Islamic_Dhikr_Extended_120min_audio.m4a';
 const originalDriveId='1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C';
 if(typeof soundLabTracks==='undefined'||typeof hcQuickPlaySound!=='function')return;
 soundLabTracks[key]={
   title:'Islamic Dhikr · Extended Playlist',
   duration:7205.198367,
   url,
   originalDriveId,
   desc:'2:00:05 · original recording · audio-only AAC'
 };
 let ready=false,checking=null;
 const notify=()=>{
   try{window.dispatchEvent(new CustomEvent('hc:dhikr-audio-availability',{detail:{available:ready}}))}catch(e){}
 };
 function report(message){
   const visible=document.getElementById('hcListening')?.classList.contains('active');
   const el=document.getElementById(visible?'hclStatus':'hcSacredPlaybackStatus')||document.getElementById('soundLabStatus');
   if(el){el.textContent=message;el.hidden=false}
 }
 async function verify(force=false){
   if(checking&&!force)return checking;
   checking=(async()=>{
     try{
       // HEAD validates that the intended, user-derived audio is really present.
       // Never point <audio> at a Drive preview, a 404 HTML page or a signed URL.
       const response=await fetch(url,{method:'HEAD',cache:'no-store'});
       const mime=response.headers?.get('content-type')||'';
       ready=!!response.ok && (/^audio\//i.test(mime)||/application\/octet-stream/i.test(mime));
     }catch(e){ready=false}
     notify();return ready;
   })();
   try{return await checking}finally{checking=null}
 }
 window.hcExtendedDhikrAudioAvailable=()=>ready;
 window.hcCheckExtendedDhikrAudio=verify;
 window.hcPlayExtendedDhikrAudio=async function(){
   // If already loaded, allow pause/resume without a second network request.
   if(typeof currentSoundKey!=='undefined'&&typeof soundLabAudio!=='undefined'&&
      currentSoundKey===key&&!!soundLabAudio?.getAttribute('src')){
     await hcQuickPlaySound(key);return true;
   }
   if(!(await verify(true))){
     report('The original 2-hour audio is prepared but not yet published in HeartClear. No video player will open.');
     return false;
   }
   await hcQuickPlaySound(key);return true;
 };
 // A probe is lightweight; no audio is downloaded or played during page load.
 verify();
})();
