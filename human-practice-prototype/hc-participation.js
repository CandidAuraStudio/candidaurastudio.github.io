/* HeartClear · optional public participation, no SMS/login, no device fingerprint.
 * The public key is publishable; all tables use insert-only RLS.
 * Private labels and activity can be read only from the owner's Supabase dashboard.
 */
(function(){
'use strict';
const URL='https://aogimhztdbqzaozlrdmm.supabase.co/rest/v1/';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZ2ltaHp0ZGJxemFvemxyZG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzM0NjUsImV4cCI6MjA3NDMwOTQ2NX0.PTswqfU4cq3r4RyLnfiBfeHyufkvdMCHHMV9XS3q4l0';
const OPT='heartclearOptInReportingV1';
function saved(){try{return JSON.parse(localStorage.getItem(OPT)||'null')}catch(e){return null}}
function status(t){const el=document.getElementById('hcParticipationStatus');if(el)el.textContent=t}
function render(){
 const info=saved();const name=document.getElementById('hcParticipationName');
 const intro=document.getElementById('hcParticipationIntro');
 const signup=document.getElementById('hcParticipationSignup');
 const stop=document.getElementById('hcParticipationStop');
 if(name&&info)name.value=info.name||'';
 if(intro)intro.textContent=info?'Sharing broad practice totals as '+info.name+'. You can stop and request removal anytime.':'No public activity sharing is active. An optional display name is enough.';
 if(signup)signup.hidden=!!info;
 if(stop)stop.hidden=!info;
 if(!info)status('Not joined · no activity sent');
 else status('Joined by choice · no notes, prayer choices, IP addresses or phone numbers are sent by HeartClear');
}
async function post(table,data){
 const res=await fetch(URL+table,{method:'POST',headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(data),cache:'no-store'});
 if(!res.ok)throw new Error('Service returned '+res.status);
}
async function join(){
 const name=(document.getElementById('hcParticipationName')?.value||'').trim().slice(0,40);
 const checked=document.getElementById('hcParticipationConsent')?.checked;
 if(!name){status('Enter a name or nickname to join.');return}
 if(!checked){status('Please choose whether you agree to share broad activity totals.');return}
 const button=document.getElementById('hcParticipationSignup');if(button)button.disabled=true;
 try{
  const id=crypto.randomUUID();
  await post('hc_optin_people',{id,display_name:name,consent_version:'2026-10'});
  localStorage.setItem(OPT,JSON.stringify({id,name,joinedAt:Date.now()}));
  render();status('Joined successfully. Your broad practice totals will be counted from now on.');
 }catch(e){status('Could not join. Check internet connection and try again. Nothing will be sent without your choice.')}
 finally{if(button)button.disabled=false}
}
async function stop(){
 const info=saved();if(!info)return;
 if(!confirm('Stop participation and request removal of your stored name and activity from HeartClear reporting?'))return;
 // Stop sharing immediately even if the removal request cannot be delivered.
 try{localStorage.removeItem(OPT)}catch(e){}
 render();
 try{
  await post('hc_optin_removal_requests',{id:crypto.randomUUID(),person_id:info.id});
  status('Sharing stopped. Removal requested; the owner must process the request.');
 }catch(e){status('Sharing stopped. Removal request could not be sent: contact the HeartClear administrator for removal.')}
}
function log(kind,seconds){
 const info=saved();if(!info||!['meditation','quiet_timer','human_practice'].includes(kind))return;
 const minutes=Math.floor(Math.max(0,Number(seconds)||0)/60);
 if(minutes<1)return;
 // One event per completed/listener-finished activity, never every seek/play.
 post('hc_optin_activity',{id:crypto.randomUUID(),person_id:info.id,kind,minutes:Math.min(1440,minutes)})
 .catch(()=>{}); // Never interrupt a meditation due to an offline service.
}
document.addEventListener('DOMContentLoaded',render);
window.hcParticipationJoin=join;
window.hcParticipationStop=stop;
window.hcParticipationLog=log;
})();
