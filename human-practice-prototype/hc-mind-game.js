/* HC mind game: evidence from a finite catalog, never thought-reading or medical inference. */
(function(root,factory){
 'use strict';
 const lib=factory();
 if(typeof module==='object'&&module.exports)module.exports=lib;
 else{
  const core=root.HCExploreCore;if(!core)return;
  const catalog=root.HCMindCatalog;
  const engine=lib.createEngine({baseBank:core.bank,baseQuestions:core.questions,publicFigures:catalog?.items||[],countryLabels:catalog?.countryLabels});
  core.gameStep=engine.next;core.gameTruth=engine.truth;core.gameCandidates=engine.candidates;
  core.bank=engine.bank;core.questions=engine.questions;core.gameQuestionLimit=20;core.gameVersion='evidence-1';
  core.gameStats={subjects:engine.bank.length,publicFigures:catalog?.items?.length||0,source:'Wikidata',builtAt:catalog?.builtAt||null};
 }
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const KINDS=['person','animal','plant','food','place','object','concept'];
 const BIRTH_ERAS=Array.from({length:25},(_,i)=>1890+i*5),DEATH_ERAS=[1950,1980,2000,2010,2020];
 const COUNTRIES={Q30:'United States',Q145:'United Kingdom',Q668:'India',Q854:'Sri Lanka',Q16:'Canada',Q408:'Australia',Q155:'Brazil',Q414:'Argentina',Q142:'France',Q183:'Germany',Q38:'Italy',Q159:'Russia',Q148:'China',Q17:'Japan',Q258:'South Africa',Q766:'Jamaica'};
 const ROLES=[
  ['music','Have they worked in music, singing or composing?',/singer|musician|composer|rapper|recording artist|songwriter|conductor/i],
  ['film','Have they worked in acting, film directing or film production?',/\bactor\b|\bactress\b|film director|film producer/i],
  ['science','Have they worked in science, mathematics or engineering?',/scientist|physicist|chemist|mathematician|biologist|astronomer|engineer|zoologist|primatologist/i],
  ['politics','Have they worked in politics or government?',/politician|president|prime minister|diplomat|statesman|stateswoman/i],
  ['business','Have they worked in business or finance?',/business|entrepreneur|financier|investor|banker|stockbroker|executive/i],
  ['finance','Have they worked in finance or investing?',/financier|investor|banker|stockbroker|fund manager/i],
  ['football','Have they played association football?',/association football player/i],
  ['cricket','Have they played cricket?',/cricketer/i],
  ['tennis','Have they played tennis?',/tennis player/i],
  ['sport','Have they taken part in sport or competitive games?',/association football|american football|basketball|baseball|tennis player|chess player|cricketer|athlete|gymnast|boxer|wrestler|sprinter|swimmer|martial artist/i],
  ['writing','Have they worked as an author or poet?',/writer|author|poet|novelist|playwright/i],
  ['computing','Have they worked in computing or software?',/computer|programmer|software|web developer/i],
  ['philosophy','Have they worked as a philosopher?',/philosopher/i]
 ];
 const TOPICS={
  animal:['pet','bird','water','insect','farm','trunk','stripes','mane','bark','wool','honey'],
  plant:['tree','flower','palm','mango','fragrant'],food:['drink','fruit','grain','hot','milk','banana','bread','animalfood','rootveg'],
  place:['built','learning','medical','worship','salt','high','trees','water'],
  object:['transport','electronic','wear','kitchen','twoWheels','motor','flies','sea','pocket','photo','read','time','feet','cut'],
  concept:['sleep','emotion','affection','future'],person:['family','older','grand','parent','sibling','child','work','teach','partner','female']
 };
 function fromFigure(record){
  const facts={person:true,public:true,family:false};
  facts.female=record.sex==='female'?true:record.sex==='male'?false:null;
  for(const year of BIRTH_ERAS)facts['bornBefore:'+year]=Number.isInteger(record.birthYear)?record.birthYear<year:null;
  // No recorded death is missing information, not proof that a person is alive.
  facts.deceased=Number.isInteger(record.deathYear)?true:null;
  for(const year of DEATH_ERAS)facts['diedBefore:'+year]=Number.isInteger(record.deathYear)?record.deathYear<year:null;
  const jobs=(record.occupations||[]).map(x=>x.label||'').join(' | ');
  for(const [id,,pattern] of ROLES)facts['occupation:'+id]=jobs&&pattern.test(jobs)?true:null;
  return {id:record.id,name:record.name,tags:['person','public'],facts,source:record.source,revision:record.revision,record};
 }
 function createEngine({baseBank=[],baseQuestions=[],publicFigures=[],countryLabels={}}={}){
  const verified=publicFigures.map(fromFigure);
  // Unsourced public-figure guesses are not used when the sourced catalog is absent.
  const basic=baseBank.filter(x=>!x.tags.includes('public')).map(x=>({...x,tags:[...x.tags],unknownTags:[...(x.unknownTags||[])]}));
  const bank=[...basic,...verified],countries={...COUNTRIES,...countryLabels};
  const definitions=new Map(baseQuestions.filter(q=>!q.id.startsWith('identity:')).map(q=>[q.id,{...q,group:q.id}]));
  for(const kind of KINDS)if(!definitions.has(kind))definitions.set(kind,{id:kind,text:'Are you thinking of '+kind+'?',group:'kind'});
  for(const kind of KINDS)definitions.get(kind).group='kind';
  definitions.set('public',{id:'public',text:'Is this a well-known public figure?',group:'public'});
  definitions.set('female',{id:'female',text:'Is this person a woman or girl?',group:'gender'});
  for(const year of BIRTH_ERAS)definitions.set('bornBefore:'+year,{id:'bornBefore:'+year,text:'Was this person born before '+year+'?',group:'birth'});
  definitions.set('deceased',{id:'deceased',text:'Has this person died?',group:'death'});
  for(const year of DEATH_ERAS)definitions.set('diedBefore:'+year,{id:'diedBefore:'+year,text:'Did this person die before '+year+'?',group:'death'});
  const presentCountries=new Set(verified.flatMap(x=>x.record.citizenships||[]));
  for(const [id,label] of Object.entries(countries))if(presentCountries.has(id))definitions.set('citizenship:'+id,{id:'citizenship:'+id,text:'Do they have, or did they have, citizenship of '+label+'?',group:'citizenship'});
  for(const [id,text] of ROLES)definitions.set('occupation:'+id,{id:'occupation:'+id,text,group:'occupation'});
  const questions=[...definitions.values()];
  function truth(item,id){
   if(KINDS.includes(id))return item.tags[0]===id;
   if(item.facts){
    if(id.startsWith('citizenship:')){const values=item.record.citizenships||[];return values.includes(id.slice(12))?true:null;}
    return Object.hasOwn(item.facts,id)?item.facts[id]:null;
   }
   if(id==='public')return false;
   if(id.startsWith('bornBefore:')||id.startsWith('diedBefore:')||id==='deceased'||id.startsWith('citizenship:')||id.startsWith('occupation:'))return null;
   if((item.unknownTags||[]).includes(id))return null;
   return item.tags.includes(id);
  }
  function candidates(history){
   const rejected=new Set(history.filter(h=>h.answer==='no'&&/^(identity:|reject:)/.test(h.id)).map(h=>h.id.replace(/^(identity:|reject:)/,'')));
   return bank.filter(item=>!rejected.has(item.id)).map(item=>{
    const evidence=[],groups=new Map(),positiveGroups=new Set();let incompatible=false;
    for(const h of history){
     if(h.answer==='unsure'||/^(identity:|reject:)/.test(h.id))continue;
     const q=definitions.get(h.id);if(!q)continue;
     const value=truth(item,h.id);if(value===null)continue;
     if(value!==(h.answer==='yes')){incompatible=true;break;}
     evidence.push({id:h.id,question:q.text,answer:h.answer});
     if(!['kind','public'].includes(q.group)){
      groups.set(q.group,Math.max(groups.get(q.group)||0,h.answer==='yes'?2:1));
      if(h.answer==='yes')positiveGroups.add(q.group);
     }
    }
    return {item,evidence,groups:[...groups.keys()],score:[...groups.values()].reduce((a,b)=>a+b,0),positive:positiveGroups.size,incompatible};
   }).filter(x=>!x.incompatible).sort((a,b)=>b.score-a.score||a.item.name.localeCompare(b.item.name));
  }
  function next(history){
   const answered=history.filter(h=>!/^(identity:|reject:)/.test(h.id));
   const knownKinds=KINDS.filter(id=>answered.some(h=>h.id===id&&h.answer==='yes'));
   if(knownKinds.length>1)return {kind:'unknown',message:'These answers point to different categories. Use Back to correct an answer; I will not invent a match.'};
   const kind=knownKinds[0];
   const used=new Set(answered.map(h=>h.id));
   const pool=candidates(history);
   if(!pool.length)return {kind:'unknown',message:'I do not have a subject that fits these answers. It may be outside this collection, or an earlier answer may need changing.'};
   const ask=id=>({kind:'question',...definitions.get(id)});
   if(!kind){
    if(answered.length>=20)return {kind:'unknown',message:'I could not establish a clear category from these answers.'};
    const nextKind=KINDS.find(id=>!used.has(id));
    return nextKind?ask(nextKind):{kind:'unknown',message:'I could not establish a clear category. It is okay to choose Unsure; I do not know the answer yet.'};
   }
   if(kind==='person'&&!used.has('public')&&answered.length<20)return ask('public');
   const publicAnswer=answered.find(h=>h.id==='public')?.answer;
   const isPublic=kind==='person'&&publicAnswer==='yes';
   const top=pool[0],runner=pool[1];
   const minimum=isPublic?6:4;
   const strong=answered.length>=minimum&&top.groups.length>=(isPublic?3:2)&&top.positive>=(isPublic?2:1);
   // Distinguish evidence from unknown entries. Scores are support, never a probability.
   const uniqueEvidence=!runner||top.score>=runner.score+2;
   if(strong&&uniqueEvidence){
    return {kind:'guess',item:top.item,message:'A possible match is '+top.item.name+'. Is that right?',evidence:top.evidence,source:top.item.source||null};
   }
   if(answered.length<20){
    let best=null,bestGain=0;
    const roleIds=new Set(TOPICS.person);
    for(const q of questions){
     if(used.has(q.id)||KINDS.includes(q.id)||q.id==='public')continue;
     const era=/^(bornBefore|diedBefore):(\d+)$/.exec(q.id);
     if(era&&answered.some(h=>{
      const old=new RegExp('^'+era[1]+':(\\d+)$').exec(h.id);
      return old&&((h.answer==='yes'&&Number(era[2])>=Number(old[1]))||(h.answer==='no'&&Number(era[2])<=Number(old[1])));
     }))continue;
     if(q.id==='deceased'&&answered.some(h=>h.id.startsWith('diedBefore:')&&h.answer==='yes'))continue;
     if(q.id.startsWith('diedBefore:')&&answered.some(h=>(h.id==='deceased'&&h.answer!=='yes')||(h.id.startsWith('diedBefore:')&&h.answer==='unsure')))continue;
     if(kind==='person'){
      if(isPublic&&roleIds.has(q.id)&&q.id!=='female')continue;
      if(!isPublic&&!roleIds.has(q.id))continue;
     }else if(!(TOPICS[kind]||[]).includes(q.id))continue;
     let yes=0,no=0,unknown=0;
     // Prioritise distinguishing the best-supported possibilities without discarding sparse records.
     for(const row of pool){const weight=Math.pow(2,row.score-top.score),v=truth(row.item,q.id);if(v===null)unknown+=weight;else if(v)yes+=weight;else no+=weight;}
     if(!yes&&!no)continue;
     const split=Math.min(yes,no)+.35*Math.min(yes,unknown);
     const verification=truth(top.item,q.id)!==null&&!top.groups.includes(q.group)&&!['kind','public'].includes(q.group)?.15:0;
     const gain=split+verification;
     if(gain>bestGain){best=q;bestGain=gain;}
    }
    if(best)return ask(best.id);
   }
   if(pool.length>1){
    return {kind:'ambiguous',message:'Several subjects still fit. I need more distinguishing facts to identify one; I will not choose a name at random.',items:pool.slice(0,5).map(x=>x.item),remaining:pool.length};
   }
   return {kind:'unknown',message:'There is not enough confirmed evidence for a reliable guess. I do not know yet. You can change an earlier answer or start again.'};
  }
  return {bank,questions,truth,candidates,next,maxQuestions:20};
 }
 return {createEngine,fromFigure};
});
