/* HeartClear Reels v247 — distraction-free shell over Google Drive's native player.
 * Cross-origin Drive media chrome cannot be controlled by HeartClear.
 * Never put a touch shield over the video: playback, captions and sound stay usable.
 */
(function(){
  'use strict';
  const root=document.getElementById('hcReels');
  const frame=document.getElementById('hcReelFrame');
  const rail=document.getElementById('hcReelSwipeRail');
  if(!root||!frame||!rail||document.getElementById('hcReelChromeToggle'))return;
  const toggle=document.createElement('button');
  toggle.id='hcReelChromeToggle';
  toggle.className='hc-reel-chrome-toggle';
  toggle.type='button';
  toggle.textContent='Hide UI';
  toggle.setAttribute('aria-label','Hide HeartClear Reels controls');
  toggle.setAttribute('aria-pressed','false');
  toggle.title='Show or hide HeartClear controls';
  root.appendChild(toggle);
  const delay=3000;
  let timer=null, previousReady=false, previousSrc='';
  const ready=()=>root.classList.contains('active')&&!frame.hidden&&!!frame.getAttribute('src');
  function clearTimer(){if(timer!==null){clearTimeout(timer);timer=null}}
  function setQuiet(quiet){
    root.classList.toggle('hc-reels-quiet',quiet);
    toggle.textContent=quiet?'·':'Hide UI';
    toggle.setAttribute('aria-label',quiet?'Show HeartClear Reels controls':'Hide HeartClear Reels controls');
    toggle.setAttribute('aria-pressed',String(quiet));
  }
  function reveal(){
    clearTimer();setQuiet(false);
    if(ready()&&!document.hidden){
      timer=setTimeout(()=>{timer=null;if(ready())setQuiet(true)},delay);
    }
  }
  function toggleChrome(){
    if(!ready())return;
    if(root.classList.contains('hc-reels-quiet'))reveal();
    else{clearTimer();setQuiet(true)}
  }
  toggle.addEventListener('click',event=>{
    event.preventDefault();event.stopPropagation();toggleChrome();
  });
  // A quick tap on the existing swipe rail or Reels title toggles UI.
  // Existing up/down rail buttons and swipe gestures keep their original handlers.
  rail.addEventListener('click',event=>{
    if(event.target.closest('button'))return;
    toggleChrome();
  });
  const header=root.querySelector('.hc-reels-head');
  if(header)header.addEventListener('click',event=>{
    if(event.target.closest('button'))return;
    toggleChrome();
  });
  function sync(){
    const src=frame.getAttribute('src')||'';
    const active=ready();
    if(active!==previousReady||(active&&src!==previousSrc)){
      previousReady=active;previousSrc=src;
      if(active)reveal();
      else{clearTimer();setQuiet(false)}
    }
  }
  const observer=new MutationObserver(sync);
  observer.observe(root,{attributes:true,attributeFilter:['class']});
  observer.observe(frame,{attributes:true,attributeFilter:['src','hidden']});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)clearTimer();
    else if(ready())reveal();
  });
  sync();
})();
