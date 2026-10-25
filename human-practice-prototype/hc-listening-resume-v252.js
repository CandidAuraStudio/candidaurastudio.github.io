/* HeartClear: restore the last native listening session from the headphones tab.
 * Local-only bookmarks. Never autoplay on page launch and never alter original media.
 * The operating system can close a web audio session; this restores its position.
 */
(function(){
'use strict';
const KEY='heartclearLastListeningV1';
const supported=new Set(['adhkar','soundlab','meditation','book','fear','human-sound']);
const byId=id=>document.getElementById(id);
const read=key=>{try{return JSON.parse(localStorage.getItem(key)||'null')}catch(_){return null}};
const put=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch(_){}};
const tnum=x=>Number.isFinite(Number(x))?Math.max(0,Number(x)):0;
let lastWriteAt=0;

// The existing opening method always seeks Adhkar to 0:00. Keep any genuine
// saved progress instead, including when opening again from another page.
const originalOpenAdhkar=window.openAdhkar;
if(typeof originalOpenAdhkar==='function'){
  window.openAdhkar=function(mode){
    const el=byId('adhkarAudio');
    const live=tnum(el?.currentTime);
    const stored=typeof hcGetAdhkarPosition==='function'?hcGetAdhkarPosition():0;
    const position=live>1&&live<1695?live:stored;
    const result=originalOpenAdhkar.apply(this,arguments);
    if(position>1&&position<1695&&el&&typeof hcSeekRestored==='function'){
      hcSeekRestored(el,position,typeof syncAdhkar==='function'?syncAdhkar:null);
    }
    return result;
  };
}

function currentSnapshot(allowZero=false){
  const s=typeof getActiveMediaState==='function'?getActiveMediaState():null;
  if(!s||!supported.has(s.key)||!s.el?.getAttribute('src'))return null;
  const p=tnum(s.el.currentTime);
  const d=Number(s.el.duration);
  if((p<1&&!allowZero)||(Number.isFinite(d)&&d>2&&p>=d-2))return null;
  const out={kind:s.key,time:p,title:s.title||'Listening',at:Date.now()};
  if(s.key==='soundlab')out.track=typeof currentSoundKey==='string'?currentSoundKey:'';
  if(s.key==='book'){
    out.lang=typeof currentBookAudioLang==='string'?currentBookAudioLang:'en';
    out.chapter=typeof currentBookChapter==='number'?currentBookChapter:1;
  }
  if(s.key==='fear')out.track=typeof currentFearKey==='string'?currentFearKey:'ocean';
  if(s.key==='human-sound'){
    out.category=typeof currentHumanCategory==='string'?currentHumanCategory:'passion';
    out.index=typeof currentHumanPractice==='object'&&currentHumanPractice
      ?(humanPracticeData[out.category]?.items||[]).findIndex(x=>x.title===currentHumanPractice.title):-1;
    out.choice=typeof humanSoundChoice==='string'?humanSoundChoice:'nature';
  }
  if(s.key==='meditation'){
    const p=read('clearWithinLastSession');
    // Save enough to restore even before the older 20-second bookmark threshold.
    out.session=p?.url?p:{
      url:typeof chosenUrl==='string'?chosenUrl:'',
      introUrl:typeof chosenIntroUrl==='string'?chosenIntroUrl:'',
      visualUrl:typeof chosenVisualUrl==='string'?chosenVisualUrl:'',
      seconds:typeof chosenSeconds==='number'?chosenSeconds:600,
      kicker:typeof chosenKicker==='string'?chosenKicker:'Practice',
      title:typeof chosenTitle==='string'?chosenTitle:'Practice'
    };
  }
  return out;
}
function capture(force=false,allowZero=false){
  if(!force&&Date.now()-lastWriteAt<4000)return;
  const s=currentSnapshot(allowZero);
  if(!s)return;
  lastWriteAt=Date.now();
  put(KEY,s);
  updateDockLabel();
}
function getSaved(){
  const s=read(KEY);
  if(s&&supported.has(s.kind)&&Number.isFinite(Number(s.time))&&
      s.at>Date.now()-180*86400000&&s.at<Date.now()+60000)return s;
  // Compatibility with existing HeartClear bookmarks, including people who
  // were listening before this release was installed.
  let key='';try{key=localStorage.getItem('heartclearActiveMedia')||''}catch(_){}
  if(key==='adhkar'){
    const v=read('heartclearAdhkarProgressV1');
    if(tnum(v?.time)>1)return{kind:'adhkar',title:'Morning Adhkar',time:tnum(v.time),at:tnum(v.updatedAt)};
  }
  if(key==='soundlab'){
    const v=read('heartclearLastSoundV1');
    if(v?.key&&tnum(v.position)>1)return{kind:'soundlab',title:'Last sound',track:v.key,time:tnum(v.position),at:tnum(v.updatedAt)};
  }
  if(key==='meditation'){
    const v=read('clearWithinLastSession');
    if(v?.url&&tnum(v.time)>1)return{kind:'meditation',title:v.kicker||'Meditation',time:tnum(v.time),session:v,at:tnum(v.savedAt)};
  }
  if(key==='book'){
    const v=read('heartclearLastBook');
    if(v?.chapter)return{kind:'book',title:'Last audiobook',lang:v.lang||'en',chapter:v.chapter,time:tnum(v.time),at:tnum(v.updatedAt)||Date.now()};
  }
  return null;
}
function updateDockLabel(){
  const b=byId('hcFlowDockListen');
  if(!b)return;
  const s=getSaved();
  b.setAttribute('aria-label',s?'Listen — return to '+s.title:'Listen');
  b.title=s?'Return to '+s.title:'Listen';
}
function seek(el,time,sync){
  if(!el||time<=0||typeof hcSeekRestored!=='function')return;
  hcSeekRestored(el,time,sync);
}
function openSaved(s){
  if(!s)return false;
  try{
    if(s.kind==='adhkar'){
      openAdhkar('listen');
      // The current version's Adhkar bookmark remains the canonical position.
      const t=Math.max(tnum(s.time),typeof hcGetAdhkarPosition==='function'?hcGetAdhkarPosition():0);
      seek(byId('adhkarAudio'),t,typeof syncAdhkar==='function'?syncAdhkar:null);
    }else if(s.kind==='soundlab'){
      if(!s.track||typeof soundLabTracks==='undefined'||!soundLabTracks[s.track])return false;
      openSoundTrack(s.track);
      const bookmark=read('heartclearLastSoundV1');
      const t=bookmark?.key===s.track?Math.max(tnum(s.time),tnum(bookmark.position)):tnum(s.time);
      seek(byId('soundLabAudio'),t,typeof syncSoundLab==='function'?syncSoundLab:null);
    }else if(s.kind==='book'){
      openBookAudio(s.lang||'en',s.chapter||1);
      seek(byId('bookAudio'),tnum(s.time),typeof syncBookAudio==='function'?syncBookAudio:null);
    }else if(s.kind==='fear'){
      if(typeof fearTracks==='undefined'||!fearTracks[s.track])return false;
      openFearTrack(s.track);
      seek(byId('fearAudio'),tnum(s.time),typeof syncFear==='function'?syncFear:null);
    }else if(s.kind==='meditation'){
      // A saved meditation contains the original media and practice metadata.
      // Restore paused; the listener explicitly presses Play when ready.
      const p=s.session||read('clearWithinLastSession');
      if(!p?.url)return false;
      chosenSeconds=tnum(p.seconds)||600;
      chosenUrl=p.url;chosenIntroUrl=p.introUrl||'';chosenVisualUrl=p.visualUrl||'';
      chosenKicker=p.kicker||'Practice';chosenTitle=p.title||'Practice';
      preparePlayer();show('player');
      seek(byId('practiceAudio')||byId('audio'),tnum(s.time),typeof sync==='function'?sync:null);
    }else if(s.kind==='human-sound'){
      if(s.index<0||!humanPracticeData?.[s.category]?.items?.[s.index])return false;
      openHumanPractice(s.category,s.index);
      if(s.choice&&s.choice!=='nature'&&typeof prepareHumanSound==='function'){
        prepareHumanSound(s.choice).then(()=>seek(byId('humanSoundAudio'),tnum(s.time)));
      }else seek(byId('humanSoundAudio'),tnum(s.time));
    }else return false;
    if(typeof hcMiniPinnedKey!=='undefined')hcMiniPinnedKey=s.kind;
    if(typeof renderGlobalMini==='function')renderGlobalMini();
    return true;
  }catch(_){return false}
}

// Capture on a real HTML media event, not on unplayed preloaded sources.
for(const type of ['play','pause','seeked','timeupdate']){
  document.addEventListener(type,event=>{
    if(!(event.target instanceof HTMLMediaElement))return;
    const current=typeof getActiveMediaState==='function'?getActiveMediaState():null;
    if(current?.el!==event.target)return;
    capture(type!=='timeupdate',type==='play');
    if(current.key==='adhkar'&&(type==='pause'||type==='play')){
      if(typeof hcRememberAdhkarPosition==='function'&&type==='pause')hcRememberAdhkarPosition();
      if(typeof setAdhkarMediaSession==='function')setAdhkarMediaSession();
    }
  },true);
}
window.addEventListener('pagehide',()=>capture(true));
document.addEventListener('visibilitychange',()=>{
  if(document.hidden)capture(true);
  else updateDockLabel();
});
window.addEventListener('pageshow',updateDockLabel);

// The visible headphones button should open the last player, not an empty
// general Sounds list. Capturing the click precedes older bubble/dock handlers.
const headphones=byId('hcFlowDockListen');
if(headphones){
  headphones.addEventListener('click',event=>{
    const active=typeof getActiveMediaState==='function'?getActiveMediaState():null;
    if(active?.el&&!active.el.paused)return; // the playing track always wins
    const last=getSaved();
    if(!last)return;
    const same=active?.key===last.kind && tnum(active.el?.currentTime)>1 &&
       (last.kind!=='soundlab'||(typeof currentSoundKey==='string'&&currentSoundKey===last.track));
    if(same)return; // existing player already has correct paused position
    event.preventDefault();event.stopImmediatePropagation();
    if(!openSaved(last)&&typeof openSoundLab==='function')openSoundLab();
  },true);
}
updateDockLabel();
})();