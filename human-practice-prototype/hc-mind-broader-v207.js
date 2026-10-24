/* HeartClear Explore: broader, source-constrained public-figure questions.
   Uses the existing local verified catalog. No network access or saved guesses. */
(function(root){
 'use strict';
 const core=root.HCExploreCore,catalog=root.HCMindCatalog;
 if(!core||!catalog?.items?.length||core.gameVersion==='broader-207')return;
 const oldNext=core.gameStep,oldTruth=core.gameTruth;
 const MAX=24;
 const TOPICS=[
  ['leader','Have they served as a country’s president, prime minister or ruler?',/president|prime minister|king of|queen of|monarch|dictator|head of state/i],
  ['screen','Are they especially famous for films, acting or television?',/film|actor|actress|cinema|television|filmmaker|movie/i],
  ['music','Is making or performing music a main reason they are famous?',/musician|singer|songwriter|composer|rapper|music/i],
  ['sport','Are they especially famous for sport or athletics?',/football|tennis|cricket|basketball|athlete|wrestler|sport|martial artist|racer/i],
  ['business','Are they especially famous for business, entrepreneurship or investing?',/business|investor|entrepreneur|magnate|financier|banker|company founder|executive/i],
  ['science','Are they especially famous for scientific discoveries or mathematics?',/scientist|physicist|mathematician|biologist|astronomer|naturalist|researcher/i],
  ['writing','Are books, poetry or philosophical writing a main reason for their fame?',/novelist|writer|poet|author|philosopher|essayist/i],
  ['religion','Are they especially known for religious or spiritual teaching?',/religious leader|spiritual|founder of religion|monk|theologian|saint/i],
  ['technology','Are they especially famous for computing or software?',/computer|programmer|software|technolog|cryptographer/i],
  ['activism','Are they especially famous for social reform or civil-rights activism?',/social reform|civil rights|activist/i]
 ];
 const CAREERS=[
  ['law','Have they worked as a lawyer, judge or legal scholar?',/lawyer|judge|jurist|barrister|attorney/i],
  ['education','Have they taught as a teacher, lecturer or professor?',/teacher|professor|lecturer|educator/i],
  ['television','Have they worked as a TV host or television producer?',/television presenter|game show host|television host|television producer/i],
  ['property','Have they worked in real estate or property development?',/real estate|property developer/i],
  ['philosophy','Have they worked as a philosopher?',/philosopher/i],
  ['spiritual','Have they held a religious or spiritual teaching role?',/monk|religious leader|spiritual teacher|priest|imam|theologian|guru/i],
  ['art','Have they worked as a painter, sculptor or visual artist?',/painter|sculptor|visual artist/i],
  ['social','Have they worked as a civil-rights activist or reformer?',/civil rights|activist|social reformer/i]
 ];
 const extra=[
  ...TOPICS.map(([key,text])=>({id:'fame:'+key,text,group:'fame'})),
  ...CAREERS.map(([key,text])=>({id:'career:'+key,text,group:'career'}))
 ];
 const defs=new Map([...core.questions,...extra].map(q=>[q.id,q]));
 const people=core.bank.filter(x=>x.tags.includes('public')&&x.record);
 const KINDS=['person','animal','plant','food','place','object','concept'];
 const fact=(item,id)=>{
  if(id.startsWith('fame:')){
   if(!item.record)return null;
   const desc=String(item.record.description||''),informative=TOPICS.some(t=>t[2].test(desc));
   if(!informative)return null;
   const topic=TOPICS.find(t=>'fame:'+t[0]===id);
   return topic?topic[2].test(desc):null;
  }
  if(id.startsWith('career:')){
   if(!item.record)return null;
   const career=CAREERS.find(t=>'career:'+t[0]===id);
   const jobs=(item.record.occupations||[]).map(x=>x.label).filter(Boolean).join('|');
   return career&&career[2].test(jobs)?true:null;
  }
  return oldTruth(item,id);
 };
 const count=hs=>hs.filter(x=>!x.id.startsWith('identity:')&&!x.id.startsWith('reject:')).length;
 function rank(hs){
  const eliminated=new Set(hs.filter(x=>x.answer==='no'&&x.id.startsWith('identity:')).map(x=>x.id.slice(9)));
  const pool=[];
  for(const item of people){
   if(eliminated.has(item.id))continue;
   let score=0,conflicts=0,confirmed=0;
   const groups=new Set(),positive=new Set(),evidence=[];
   for(const h of hs){
    if(h.answer==='unsure'||h.id.startsWith('identity:')||h.id.startsWith('reject:'))continue;
    if(!defs.has(h.id))continue;
    const v=fact(item,h.id);if(v===null)continue;
    if(v!==(h.answer==='yes')){conflicts++;continue;}
    const group=defs.get(h.id)?.group||h.id;
    groups.add(group);confirmed++;
    if(h.answer==='yes')positive.add(group);
    score+=h.answer==='yes'?(group==='fame'?3.5:group==='occupation'||group==='career'?2.2:2):(group==='fame'?1.2:.65);
    evidence.push({id:h.id,question:defs.get(h.id)?.text||h.id,answer:h.answer});
   }
   pool.push({item,score,conflicts,confirmed,groups,positive,evidence});
  }
  const strict=pool.filter(x=>x.conflicts===0);
  const allowed=strict.length?strict:pool.filter(x=>x.conflicts===1);
  return {strict:Boolean(strict.length),items:allowed.sort((a,b)=>a.conflicts-b.conflicts||b.score-a.score||b.positive.size-a.positive.size||a.item.name.localeCompare(b.item.name))};
 }
 function next(history){
  const responses=history.filter(x=>!x.id.startsWith('identity:')&&!x.id.startsWith('reject:'));
  const kindYes=KINDS.filter(id=>responses.some(h=>h.id===id&&h.answer==='yes'));
  if(kindYes.length!==1||kindYes[0]!=='person')return oldNext(history);
  const publicAns=responses.find(h=>h.id==='public')?.answer;
  if(publicAns!=='yes')return oldNext(history);
  const used=new Set(responses.map(x=>x.id));
  const state=rank(history),pool=state.items;
  if(!pool.length)return {kind:'unknown',message:'I cannot reconcile the answers with the saved collection. Review answers below; choosing Unsure is fine when a detail is uncertain.'};
  const top=pool[0],runner=pool[1],n=count(history);
  const enough=n>=8&&top.confirmed>=5&&top.positive.size>=2&&top.groups.size>=3;
  const lead=runner?top.score-runner.score:99;
  if(state.strict&&enough&&lead>=4){
   return {kind:'guess',item:top.item,message:'A possible match is '+top.item.name+'. Is that right?',evidence:top.evidence,source:top.item.source||null};
  }
  if(n>=MAX){
   return {kind:'ambiguous',message:state.strict?
    'Several people still fit. Too many details were unknown to make a reliable guess. Review an answer or play again.':
    'Some answers conflict with the available biographies. Review earlier answers and change any uncertain detail to Unsure.',
    items:pool.slice(0,5).map(x=>x.item),remaining:pool.length};
  }
  const available=[...core.questions,...extra].filter(q=>{
   if(used.has(q.id)||KINDS.includes(q.id)||q.id==='public'||q.id.startsWith('identity:'))return false;
   const dated=/^(bornBefore|diedBefore):/.test(q.id);
   if(dated&&responses.some(h=>/^(bornBefore|diedBefore):/.test(h.id)))return false;
   if(q.id.startsWith('diedBefore:'))return false; // no serial historical date questions
   if(q.id.startsWith('fame:')&&responses.filter(h=>h.id.startsWith('fame:')).length>=5)return false;
   if(q.id.startsWith('occupation:')&&responses.filter(h=>h.id.startsWith('occupation:')).length>=7)return false;
   if(q.id.startsWith('career:')&&responses.filter(h=>h.id.startsWith('career:')).length>=4)return false;
   if(q.id.startsWith('citizenship:')&&responses.filter(h=>h.id.startsWith('citizenship:')).length>=3)return false;
   if(!(/^(fame:|career:|occupation:|citizenship:|bornBefore:|deceased$|female$)/.test(q.id)))return false;
   return true;
  });
  let best=null,value=-Infinity;
  for(const q of available){
   let yes=0,no=0,unk=0;const max=Math.min(160,pool.length);
   for(let i=0;i<max;i++){
    const row=pool[i],v=fact(row.item,q.id),weight=Math.pow(1.35,Math.min(7,row.score-top.score));
    if(v===null)unk+=weight;else if(v)yes+=weight;else no+=weight;
   }
   const total=yes+no+unk,known=(yes+no)/(total||1);
   if(known<.14)continue;
   const balanced=2*Math.min(yes,no)/(yes+no+1e-9);
   const group=defs.get(q.id)?.group||q.id,previous=responses.filter(h=>(defs.get(h.id)?.group||h.id)===group).length;
   let gain=balanced*.85+known*.20;
   if(group==='fame')gain+=.5;
   if(group==='occupation'||group==='career')gain+=.16;
   if(group==='citizenship'||group==='gender')gain+=.10;
   if(group==='birth')gain-=.55;
   gain-=previous*.12;
   if(responses.length&&(defs.get(responses.at(-1).id)?.group||responses.at(-1).id)===group)gain-=.17;
   // Ask about an as-yet-unchecked trait of leading candidates.
   if(fact(top.item,q.id)===true&&!top.groups.has(group))gain+=.10;
   if(gain>value){best=q;value=gain;}
  }
  if(best)return {kind:'question',...best};
  return {kind:'ambiguous',message:'I have run out of reliable distinguishing questions for these answers. You can review any earlier response.',items:pool.slice(0,5).map(x=>x.item),remaining:pool.length};
 }
 core.questions=[...core.questions,...extra];
 core.gameStep=next;
 core.gameTruth=fact;
 core.gameCandidates=h=>rank(h).items;
 core.gameQuestionLimit=MAX;
 core.gameVersion='broader-207';
})(typeof globalThis!=='undefined'?globalThis:this);
