/* HeartClear v237: restore original meditation selection, Next, timing and guided steps. */
(function(){
'use strict';
var player=document.getElementById('player');
var heading=player&&player.querySelector('.player-top');
if(!heading||document.getElementById('hcGuidedNavigation'))return;
var sessions=[
 {key:'wake',title:'Deep Wake Up',duration:'10 min'},
 {key:'noon',title:'Noon Reset',duration:'40 min'},
 {key:'evening',title:'Evening Release',duration:'60 min'},
 {key:'sleep',title:'Deep Sleep',duration:'60 min'}
];
var area=document.createElement('section');area.id='hcGuidedNavigation';
area.setAttribute('aria-label','Meditation recording and playback choices');
area.innerHTML='<div class="hc-guided-head"><strong>Choose meditation</strong><span id="hcGuidedProgress">0:00 / 10:00</span></div>'+
 '<div class="hc-guided-list" role="group" aria-label="Choose recording duration">'+
 sessions.map(function(s){return '<button type="button" data-hc-guided="'+s.key+'"><b>'+s.title+'</b><small>'+s.duration+'</small></button>'}).join('')+
 '</div><div class="hc-guided-switch"><button type="button" id="hcGuidedPrev">‹ Previous</button><button type="button" id="hcGuidedNext">Next ›</button></div>'+
 '<div class="hc-guided-extras"><button type="button" id="hcGuidedSettings">Time &amp; sound</button><button type="button" id="hcGuidedTimer">Quiet timer</button><button type="button" id="hcGuidedSteps">Guided steps</button></div>';
heading.after(area);
var audio=document.getElementById('audio');
var id=function(x){return document.getElementById(x)};
function current(){var title=id('sessionKicker');return sessions.findIndex(function(s){return s.title===(title?title.textContent.trim():'')})}
function clock(sec){sec=Math.max(0,Math.floor(Number(sec)||0));return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')}
function sync(){
 var index=current();
 area.querySelectorAll('[data-hc-guided]').forEach(function(btn,i){btn.setAttribute('aria-pressed',String(i===index))});
 var total=audio&&Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:0;
 if(!total){var duration=id('total');var text=duration?duration.textContent.trim():'10:00';id('hcGuidedProgress').textContent=clock(audio?audio.currentTime:0)+' / '+text}
 else id('hcGuidedProgress').textContent=clock(audio.currentTime)+' / '+clock(total);
}
function choose(i){var item=sessions[(i+sessions.length)%sessions.length];if(typeof hcStartExistingGuidedSession==='function'){hcStartExistingGuidedSession(item.key);sync()}}
area.querySelectorAll('[data-hc-guided]').forEach(function(btn,i){btn.addEventListener('click',function(){choose(i)})});
id('hcGuidedPrev').addEventListener('click',function(){choose((current()<0?0:current())-1)});
id('hcGuidedNext').addEventListener('click',function(){choose((current()<0?-1:current())+1)});
id('hcGuidedSettings').addEventListener('click',function(){var panel=id('optionsPanel');if(panel){panel.classList.add('open');panel.scrollIntoView({block:'nearest',behavior:'auto'})}});
id('hcGuidedTimer').addEventListener('click',function(){if(typeof openQuietTimer==='function')openQuietTimer();else if(typeof show==='function')show('quietTimer')});
id('hcGuidedSteps').addEventListener('click',function(){if(audio)audio.pause();if(typeof stepIndex!=='undefined')stepIndex=0;if(typeof renderStep==='function')renderStep();if(typeof show==='function')show('instructions')});
if(audio){audio.addEventListener('timeupdate',sync);audio.addEventListener('loadedmetadata',sync);audio.addEventListener('durationchange',sync)}
if(id('sessionKicker'))new MutationObserver(sync).observe(id('sessionKicker'),{childList:true,characterData:true,subtree:true});
sync();
})();
