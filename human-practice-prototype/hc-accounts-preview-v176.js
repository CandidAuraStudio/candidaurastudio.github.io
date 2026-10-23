/* HeartClear v177 — optional one-time lifetime supporter and private invitations.
   Safe rollout: signup remains DISABLED until a dedicated secure backend and
   approved payment method are connected. No old local progress is uploaded. */
(function(){
'use strict';
if(document.getElementById('hcAccountDialog'))return;
// Configure only after security review of the chosen Supabase project.
const CONFIG={enabled:false,url:'',publishableKey:'',functionName:'hc-access',priceEUR:'€2.99',billing:'one_time_lifetime'};
let client=null,account=null,entitlement=null;
const css=document.createElement('style');
css.textContent=[
'#hcAccountDialog{background:#101010;color:#f5f5f5;border:1px solid #555;border-radius:15px;width:min(440px,calc(100vw - 20px));max-height:88vh;overflow:auto;padding:18px;font:14px system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 10px 55px #0008}',
'#hcAccountDialog::backdrop{background:#000b}',
'#hcAccountDialog *{box-sizing:border-box}',
'#hcAccountDialog h2{font-size:21px;margin:0 0 7px;color:white}',
'#hcAccountDialog h3{font-size:15px;margin:14px 0 6px;color:white}',
'#hcAccountDialog p,#hcAccountDialog small{color:#ddd;line-height:1.5}',
'#hcAccountDialog .hc-account-row{display:flex;align-items:center;justify-content:space-between;gap:9px}',
'#hcAccountDialog input{display:block;width:100%;min-height:42px;border:1px solid #777;background:#202020;color:#fff;border-radius:9px;margin:7px 0;padding:9px;font:inherit}',
'#hcAccountDialog button{min-height:41px;padding:8px 12px;border:1px solid #666;background:#fff;color:#111;font:inherit;border-radius:9px;cursor:pointer}',
'#hcAccountDialog button:disabled{opacity:.48;cursor:not-allowed}',
'#hcAccountDialog button.hc-quiet{background:#1e1e1e;color:#fff}',
'#hcAccountDialog button:focus-visible,#hcAccountDialog input:focus-visible{outline:2px solid white;outline-offset:2px}',
'#hcAccountDialog .hc-account-actions{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}',
'#hcAccountDialog .hc-account-summary{border:1px solid #555;border-radius:9px;padding:12px;margin:10px 0}',
'#hcAccountDialog #hcAccountMessage{margin:12px 0;font-size:13px;min-height:18px}',
'#hcAccountDialog [hidden]{display:none!important}',
'#hcAccountDialog .hc-account-check{display:flex;gap:8px;align-items:start;font-size:12px}',
'#hcAccountDialog .hc-account-check input{width:17px;min-height:17px;margin:2px 0;flex:none}',
'#hcAccountDialog .hc-account-code{overflow-wrap:anywhere;border:1px dashed #777;padding:9px;margin:6px 0;font-size:12px}'
].join('\n');document.head.append(css);
const modal=document.createElement('dialog');modal.id='hcAccountDialog';modal.setAttribute('aria-labelledby','hcAccTitle');
modal.innerHTML='<div class="hc-account-row"><h2 id="hcAccTitle">HeartClear account</h2><button type="button" class="hc-quiet" id="hcAccountClose" aria-label="Close">×</button></div>'+
'<p id="hcAccountIntro">Continue listening free. An account is optional. Private invitations and lifetime supporter access are being prepared.</p>'+
'<div id="hcAccountMessage" role="status" aria-live="polite"></div>'+
'<div class="hc-account-summary" id="hcAccountState">Account sign-in is being prepared. Your existing HeartClear remains usable.</div>'+
'<div id="hcAccountLogin" hidden><label>Email<input id="hcAccountEmail" type="email" autocomplete="email" inputmode="email" maxlength="200"></label>'+
'<label>Password<input id="hcAccountPassword" type="password" autocomplete="current-password" minlength="12" maxlength="128"></label>'+
'<label class="hc-account-check"><input type="checkbox" id="hcAccountNotice">I understand that my email and account activity dates will be stored for sign-in and access management. My private HeartClear notes remain on this device.</label>'+
'<div class="hc-account-actions"><button type="button" id="hcAccountSignIn">Sign in</button><button type="button" class="hc-quiet" id="hcAccountSignUp">Create account</button></div></div>'+
'<div id="hcAccountSigned" hidden><div class="hc-account-actions"><button type="button" class="hc-quiet" id="hcAccountSignOut">Sign out</button></div></div>'+
'<h3>Private invitation</h3><p>Private invite links give free member access after sign-in launches. Codes are checked on the server, not stored in the public app source.</p>'+
'<label>Invitation code<input id="hcAccountCode" autocomplete="off" inputmode="text" placeholder="HC-XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX" maxlength="40"></label>'+
'<button type="button" id="hcAccountRedeem" disabled>Redeem invitation</button>'+
'<h3>Optional lifetime supporter</h3><div class="hc-account-summary"><b>€2.99 once · no subscription</b><p>One payment for lifetime member access while HeartClear operates. Existing users remain free. Checkout is not live, so no payment is collected.</p></div>'+
'<div id="hcAccountAdmin" hidden><h3>Owner dashboard</h3><div class="hc-account-summary" id="hcAccountStats">Loading counts…</div>'+
'<div class="hc-account-actions"><button id="hcAccountRefresh" type="button">Refresh counts</button><button id="hcAccountCreateCodes" type="button">Create 10 codes</button></div>'+
'<p>Each invite link is single use. Copy the newly generated links now; only hashed codes are stored on the server.</p><div id="hcAccountNewCodes"></div></div>'+
'<p><small>Registration counts are available to the owner after activation. Personal reflections, reading history and symptom answers are not uploaded by signing in.</small></p>';
document.body.append(modal);
const $=id=>document.getElementById(id);
const message=s=>{$('hcAccountMessage').textContent=String(s||'')};
const set=(id,show)=>{$(id).hidden=!show};
function render(){
 const enabled=!!(CONFIG.enabled&&CONFIG.url&&CONFIG.publishableKey);
 set('hcAccountLogin',enabled&&!account);
 set('hcAccountSigned',enabled&&!!account);
 set('hcAccountAdmin',enabled&&!!entitlement?.owner);
 $('hcAccountRedeem').disabled=!enabled||!account;
 if(!enabled){
  $('hcAccountState').textContent='Guest listening is free. Sign-in will be enabled after backend security checks. Existing listening and notes stay unchanged.';
  message('€2.99 is a planned one-time lifetime payment, not a subscription. Checkout is not available yet.');
 }else if(account){
  $('hcAccountState').textContent='Signed in: '+account.email+' · '+(entitlement?.allowed?'Access active ('+(entitlement?.access||'owner')+')':'Access pending: redeem an invitation or use paid access when available');
  message('');
 }else{
  $('hcAccountState').textContent='Sign in or create an account to claim private invitation access. Guest listening stays free.';
  message('');
 }
}
async function startClient(){
 if(!CONFIG.enabled||!CONFIG.url||!CONFIG.publishableKey)return null;
 if(client)return client;
 const module=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.95.0/+esm');
 client=module.createClient(CONFIG.url,CONFIG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
 const session=await client.auth.getSession();
 account=session?.data?.session?.user||null;
 if(account)await refreshAccess();
 return client;
}
async function call(action,extras={}){
 if(!client)return{ok:false,error:'Backend unavailable'};
 const {data}=await client.auth.getSession();
 const accessToken=data?.session?.access_token;
 if(!accessToken)return{ok:false,error:'Please sign in again'};
 const response=await fetch(CONFIG.url+'/functions/v1/'+CONFIG.functionName,{
  method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+accessToken,'apikey':CONFIG.publishableKey},
  body:JSON.stringify({action,...extras})
 });
 const result=await response.json().catch(()=>({ok:false,error:'Response unavailable'}));
 return result;
}
async function refreshAccess(){
 if(!account)return;
 const result=await call('status');
 entitlement=result.ok?result:null;
 render();
 if(result.ok&&result.owner)await refreshStats();
}
async function open(){
 if(!modal.open)modal.showModal();
 render();
 if(CONFIG.enabled){try{await startClient();render()}catch{message('Account service is temporarily unavailable. Your listening stays unchanged.')}}
}
$('hcAccountClose').addEventListener('click',()=>modal.close());
$('hcAccountSignUp').addEventListener('click',async()=>{
 const email=$('hcAccountEmail').value.trim(),password=$('hcAccountPassword').value;
 if(!$('hcAccountNotice').checked){message('Please read and accept the account notice.');return}
 if(!email||password.length<12){message('Enter an email and a password with at least 12 characters.');return}
 message('Creating account…');
 try{
  const c=await startClient(),{data,error}=await c.auth.signUp({email,password});
  if(error)throw error;
  account=data.session?.user||null;
  message(account?'Signed up. Enter your invitation code.':'Check your email to confirm your account, then sign in.');
  render();
 }catch(e){message(e.message||'Unable to create account')}
});
$('hcAccountSignIn').addEventListener('click',async()=>{
 const email=$('hcAccountEmail').value.trim(),password=$('hcAccountPassword').value;
 if(!email||!password){message('Enter your email and password');return}
 message('Signing in…');
 try{
  const c=await startClient(),{data,error}=await c.auth.signInWithPassword({email,password});
  if(error)throw error;account=data.user;await refreshAccess();message('Signed in.');
 }catch(e){message(e.message||'Unable to sign in')}
});
$('hcAccountSignOut').addEventListener('click',async()=>{
 try{await client?.auth.signOut()}catch{}
 account=null;entitlement=null;render();
});
$('hcAccountRedeem').addEventListener('click',async()=>{
 const code=$('hcAccountCode').value.trim().toUpperCase();
 if(!code){message('Enter your invitation code.');return}
 $('hcAccountRedeem').disabled=true;message('Checking invitation…');
 try{
  const result=await call('redeem',{code});
  if(!result.ok)message(result.error||'Invitation not accepted');
  else{entitlement=result;message('Free member access activated.');render();$('hcAccountCode').value=''}
 }catch{message('Cannot reach invitation service')}
 finally{$('hcAccountRedeem').disabled=!account}
});
async function refreshStats(){
 const stats=await call('admin_stats');
 $('hcAccountStats').textContent=stats.ok?'Registered: '+stats.registered+' · Active last 7 days: '+stats.active7d+' · Free invited: '+stats.freeInvites+' · Paid: '+stats.paid+' · Codes issued: '+stats.issuedCodes:'Owner statistics unavailable';
}
$('hcAccountRefresh').addEventListener('click',refreshStats);
$('hcAccountCreateCodes').addEventListener('click',async()=>{
 const r=await call('create_invites',{count:10,maxUses:1,label:'HeartClear private beta'});
 if(!r.ok){message(r.error||'Unable to create codes');return}
 const node=$('hcAccountNewCodes');node.replaceChildren();
 r.codes.forEach(code=>{
  const row=document.createElement('div');row.className='hc-account-code';
  const link=location.origin+location.pathname+'#hc-invite='+encodeURIComponent(code);
  const span=document.createElement('span');span.textContent=link;
  const btn=document.createElement('button');btn.type='button';btn.className='hc-quiet';btn.textContent='Copy';
  btn.addEventListener('click',()=>navigator.clipboard?.writeText(link).then(()=>{btn.textContent='Copied'}).catch(()=>{btn.textContent='Select link to copy'}));
  row.append(span,document.createElement('br'),btn);node.append(row);
 });
 message('Generated codes shown once. Share privately, not in public posts.');
});
function handleHash(){
 const hash=location.hash;
 if(hash==='#hc-account'){open();return}
 if(hash.startsWith('#hc-invite=')){
  let code='';try{code=decodeURIComponent(hash.slice('#hc-invite='.length))}catch{}
  if(/^HC-[0-9A-F-]{35}$/.test(code))$('hcAccountCode').value=code;
  // Tokens should not remain in browser history or link-referrer fields.
  history.replaceState(null,'',location.pathname+location.search);
  open();
 }
}
const settings=document.querySelector('#settings .hc-settings-stack');
if(settings){
 const row=document.createElement('div');row.className='setting-row';
 const info=document.createElement('div');info.innerHTML='<strong>Account & invitations</strong><small>Continue free · €2.99 lifetime (one-time, planned)</small>';
 const button=document.createElement('button');button.className='offline-action';button.textContent='Open account';button.type='button';
 button.addEventListener('click',open);row.append(info,button);settings.prepend(row);
}
const more=document.querySelector('#home .hc-home-more-content');
if(more){
 const btn=document.createElement('button');btn.type='button';btn.className='choice';
 btn.textContent='Account & invitation code →';btn.addEventListener('click',open);more.append(btn);
}
// Small, optional offer; no popup or forced sign-in on launch.
const home=document.getElementById('home');
if(home&&!document.getElementById('hcLifetimeHomeNote')){
 const slot=document.createElement('div');slot.id='hcLifetimeHomeNote';
 slot.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:5px 2px 10px;padding:5px 2px;color:inherit;font:12px system-ui,-apple-system,Segoe UI,sans-serif';
 const caption=document.createElement('span');caption.textContent='Listening stays free · Lifetime supporter €2.99 once (coming soon)';
 caption.style.cssText='opacity:.85;line-height:1.4;flex:1;min-width:165px';
 const details=document.createElement('button');details.type='button';details.textContent='Details ›';
 details.style.cssText='font:inherit;color:inherit;background:transparent;border:0;padding:8px;cursor:pointer;text-decoration:underline;text-underline-offset:3px';
 details.setAttribute('aria-label','Read about optional lifetime support and private invitations');
 details.addEventListener('click',open);slot.append(caption,details);
 const start=home.querySelector('.hc-simple-start');
 if(start)start.insertAdjacentElement('afterend',slot);
}
window.addEventListener('hashchange',handleHash);
handleHash();
})();