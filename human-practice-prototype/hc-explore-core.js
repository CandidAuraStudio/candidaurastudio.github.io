/* HeartClear Explore: finite questions, no remote inference, no stored answers. */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.HCExploreCore=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const questions=[
  ['person','Are you thinking of a person?'],['family','Is this person a member of your family?'],
  ['female','Is this person a woman or girl?'],['older','Is this relative from an older generation than yours?'],
  ['grand','Is this person one of your grandparents?'],['parent','Is this person one of your parents?'],
  ['sibling','Is this person your brother or sister?'],['child','Is this person your son or daughter?'],
  ['work','Do you mainly know this person through work?'],['teach','Is this person your teacher?'],
  ['partner','Is this person your romantic partner?'],['public','Is this a well-known public figure?'],
  ['science','Is this person mainly known for science?'],['football','Is this person known for football?'],
  ['film','Is this person known for films?'],['music','Is this person known for music, singing, or composing?'],
  ['tamil','Is this person known for Tamil cinema?'],['argentina','Is this footballer from Argentina?'],
  ['american','Is this public figure especially associated with the United States?'],
  ['british','Is this public figure from the United Kingdom?'],
  ['indian','Is this public figure from India?'],
  ['pop','Is this musician especially known for pop music?'],
  ['rock','Is this musician associated with rock music?'],
  ['rap','Is this musician associated with rap or hip-hop?'],
  ['dance','Is this performer particularly famous for dancing?'],
  ['band','Is this performer famous for a band or group?'],
  ['playback','Is this musician known for singing in Indian films?'],
  ['composer','Is this musician especially known for composing music?'],
  ['tamilmusic','Is this musician associated with Tamil-language music?'],
  ['hollywood','Is this actor primarily known for Hollywood films?'],
  ['cricket','Is this public figure well known for cricket?'],
  ['tennis','Is this public figure well known for tennis?'],
  ['portugal','Is this footballer from Portugal?'],
  ['brazil','Is this footballer from Brazil?'],
  ['relativity','Is this scientist associated with relativity?'],['silent','Is this actor famous for silent comedy?'],
  ['animal','Are you thinking of an animal?'],['pet','Is it commonly kept as a household pet?'],
  ['bird','Is it a bird?'],['water','Does it normally live in water?'],['insect','Is it an insect?'],
  ['farm','Is it commonly raised as a farm animal?'],['trunk','Does it have a trunk?'],
  ['stripes','Does it have stripes?'],['mane','Does the adult male usually have a mane?'],
  ['bark','Does it bark?'],['wool','Is it raised for wool?'],['honey','Does it make honey?'],
  ['plant','Are you thinking of a plant?'],['tree','Is it a tree?'],['flower','Is it mainly known as a flower?'],
  ['palm','Is it a palm?'],['mango','Does it grow mangoes?'],['fragrant','Is its flower especially known for fragrance?'],
  ['food','Are you thinking of something to eat or drink?'],['drink','Is it a drink?'],
  ['fruit','Is it a fruit?'],['grain','Is it a grain or mainly made from grain?'],
  ['hot','Is this drink usually served hot?'],['milk','Is milk its main ingredient?'],
  ['banana','Is this fruit normally long and curved?'],['bread','Is it baked bread?'],
  ['place','Are you thinking of a place or natural feature?'],['built','Is it made by people?'],
  ['learning','Is it a place for learning?'],['medical','Is it a place for medical care?'],
  ['worship','Is it a place of worship?'],['salt','Is it a large body of salt water?'],
  ['high','Is it a high natural landform?'],['trees','Is it an area with many trees?'],
  ['object','Are you thinking of a physical object made by people?'],['transport','Is it used for transport?'],
  ['electronic','Is it electronic?'],['wear','Is it something people wear?'],['kitchen','Is it a kitchen item?'],
  ['twoWheels','Does it have two wheels?'],['motor','Does it normally have a motor?'],
  ['flies','Does it travel through the air?'],['sea','Does it travel on water?'],
  ['pocket','Is it small enough to carry in a pocket?'],['photo','Is taking photographs its main purpose?'],
  ['read','Is it mainly something to read?'],['time','Is telling the time its main purpose?'],
  ['feet','Is it worn on the feet?'],['cut','Is it used for cutting?'],
  ['concept','Are you thinking of an idea, feeling or experience rather than an object?'],
  ['sleep','Does this experience happen during sleep?'],['emotion','Is it an emotion?'],
  ['affection','Is this feeling associated with affection and care?'],['future','Is it an aspiration for the future?']
 ].map(([id,text])=>({id,text}));
 const bank=[];
 function group(category,rows){for(const [id,name,tags] of rows)bank.push({id,name,tags:[category,...tags.split(' ').filter(Boolean)]});}
 group('person',[
  ['grandfather','your grandfather','family older grand'],['grandmother','your grandmother','family female older grand'],
  ['father','your father','family older parent'],['mother','your mother','family female older parent'],
  ['brother','your brother','family sibling'],['sister','your sister','family female sibling'],
  ['son','your son','family child'],['daughter','your daughter','family female child'],
  ['uncle','your uncle','family older'],['aunt','your aunt','family older female'],
  ['friend','a friend',''],['colleague','a colleague','work'],['teacher','your teacher','teach'],['partner','your partner','partner'],
  ['einstein','Albert Einstein','public science relativity'],['newton','Isaac Newton','public science'],
  ['curie','Marie Curie','public science female'],['messi','Lionel Messi','public football argentina'],
  ['ronaldo','Cristiano Ronaldo','public football portugal'],['chaplin','Charlie Chaplin','public film silent'],
  ['rajini','Rajinikanth','public film tamil indian'],
  ['vijay','Vijay (Tamil actor)','public film tamil indian'],
  ['kamal','Kamal Haasan','public film tamil indian'],
  ['suriya','Suriya','public film tamil indian'],
  ['srk','Shah Rukh Khan','public film indian'],
  ['tomcruise','Tom Cruise','public film hollywood american'],
  ['scarlett','Scarlett Johansson','public film hollywood american female'],
  ['chaplin2','Buster Keaton','public film hollywood silent'],
  ['jackson','Michael Jackson','public music pop dance american'],
  ['swift','Taylor Swift','public music pop female american'],
  ['beyonce','Beyoncé','public music pop female american dance'],
  ['adele','Adele','public music female british'],
  ['sheeran','Ed Sheeran','public music pop british'],
  ['billie','Billie Eilish','public music pop female american'],
  ['madonna','Madonna','public music pop female american dance'],
  ['freddie','Freddie Mercury','public music rock british band'],
  ['queen','Queen (music group)','public music rock british band'],
  ['eminem','Eminem','public music rap american'],
  ['weeknd','The Weeknd','public music pop'],
  ['rihanna','Rihanna','public music pop female'],
  ['celine','Céline Dion','public music female'],
  ['shreya','Shreya Ghoshal','public music playback indian female'],
  ['chithra','K. S. Chithra','public music playback tamilmusic indian female'],
  ['spb','S. P. Balasubrahmanyam','public music playback tamilmusic indian'],
  ['sidsriram','Sid Sriram','public music playback tamilmusic'],
  ['arrahman','A. R. Rahman','public music composer tamilmusic indian'],
  ['ilaiyaraaja','Ilaiyaraaja','public music composer tamilmusic indian'],
  ['anirudh','Anirudh Ravichander','public music composer tamilmusic indian'],
  ['sonu','Sonu Nigam','public music playback indian'],
  ['neymar','Neymar','public football brazil'],
  ['sachin','Sachin Tendulkar','public cricket indian'],
  ['kohli','Virat Kohli','public cricket indian'],
  ['dhoni','M. S. Dhoni','public cricket indian'],
  ['serena','Serena Williams','public tennis american female'],
  ['federer','Roger Federer','public tennis'],
  ['hawking','Stephen Hawking','public science british']
 ]);
 group('animal',[
  ['dog','a dog','pet bark'],['cat','a cat','pet'],['parrot','a parrot','pet bird'],['goldfish','a goldfish','pet water'],
  ['elephant','an elephant','trunk'],['tiger','a tiger','stripes'],['lion','a lion','mane'],
  ['cow','a cow','farm'],['sheep','a sheep','farm wool'],['hen','a hen','farm bird'],
  ['shark','a shark','water'],['eagle','an eagle','bird'],['bee','a bee','insect honey'],['butterfly','a butterfly','insect']
 ]);
 group('plant',[
  ['coconut','a coconut tree','tree palm'],['mangotree','a mango tree','tree mango'],['neem','a neem tree','tree'],
  ['jasmine','jasmine','flower fragrant'],['lotus','a lotus','flower'],['mint','a mint plant','']
 ]);
 group('food',[
  ['tea','tea','drink hot'],['coffee','coffee','drink hot'],['waterdrink','drinking water','drink'],['milkdrink','milk','drink milk'],
  ['bananafruit','a banana','fruit banana'],['apple','an apple','fruit'],['rice','rice','grain'],['breadfood','bread','grain bread'],
  ['egg','an egg',''],['potato','a potato','']
 ]);
 group('place',[
  ['school','a school','built learning'],['hospital','a hospital','built medical'],['home','a home','built'],
  ['mosque','a mosque','built worship'],['ocean','the ocean','water salt'],['river','a river','water'],
  ['mountain','a mountain','high'],['forest','a forest','trees'],['beach','a beach','']
 ]);
 group('object',[
  ['car','a car','transport motor'],['bike','a bicycle','transport twoWheels'],['motorbike','a motorbike','transport twoWheels motor'],
  ['plane','an aeroplane','transport motor flies'],['boat','a boat','transport sea'],
  ['phone','a mobile phone','electronic pocket'],['computer','a computer','electronic'],['camera','a camera','electronic photo'],
  ['watch','a watch','wear time'],['shoe','a shoe','wear feet'],['shirt','a shirt','wear'],
  ['knife','a kitchen knife','kitchen cut'],['spoon','a spoon','kitchen'],['book','a book','read'],['key','a key','pocket']
 ]);
 group('concept',[
  ['dream','a dream during sleep','sleep'],['ambition','a future ambition','future'],
  ['love','love','emotion affection'],['fear','fear','emotion'],['memory','a memory','']
 ]);
 // Generic roles do not imply a gender; avoid eliminating or asking about an unspecified trait.
 for(const item of bank)item.unknownTags=['friend','colleague','teacher','partner'].includes(item.id)?['female']:[];
 // Identity questions resolve subjects with the same broad attributes. They remain guesses, not claimed knowledge.
 for(const item of bank){const id='identity:'+item.id;item.tags.push(id);questions.push({id,text:'Are you thinking of '+item.name+'?'});}
 function gameStep(history){
  // A finite, clearly labelled collection. Never claim mind-reading or a diagnosis.
  const used=new Set(history.map(h=>h.id));
  const rejected=new Set(history.filter(h=>h.id.startsWith('identity:')&&h.answer==='no').map(h=>h.id.slice(9)));
  const confirmed=history.find(h=>h.id.startsWith('identity:')&&h.answer==='yes');
  if(confirmed){
   const item=bank.find(b=>b.id===confirmed.id.slice(9));
   return item?{kind:'guess',item,message:'Possible match: '+item.name+'. Is that right?'}:
    {kind:'unknown',message:'That person is not in this collection.'};
  }
  const candidates=bank.filter(item=>{
   if(rejected.has(item.id))return false;
   return history.every(h=>{
    if(h.answer==='unsure'||h.id.startsWith('identity:'))return true;
    if(item.unknownTags.includes(h.id))return true;
    return item.tags.includes(h.id)===(h.answer==='yes');
   });
  });
  if(!candidates.length)return {kind:'unknown',message:'I cannot match these answers to my current collection. The answer may be someone or something I do not know. I will not invent a result.'};
  if(history.length>=25)return {kind:'unknown',message:'I have asked 25 questions and still cannot identify a reliable match. You can change an earlier answer or start again.'};
  const factual=history.filter(h=>!h.id.startsWith('identity:')&&h.answer!=='unsure');
  const affirmed=factual.filter(h=>h.answer==='yes');
  if(candidates.length===1){
   const item=candidates[0];
   const remaining=questions.filter(q=>!q.id.startsWith('identity:')&&!used.has(q.id)&&item.tags.includes(q.id)&&!item.unknownTags.includes(q.id));
   // Require multiple independent clues, not merely the category "singer".
   if(factual.length>=4&&affirmed.length>=3 || (factual.length>=3&&affirmed.length>=2&&!remaining.length)){
    return {kind:'guess',item,message:'One possible match is '+item.name+'. Is that the answer? This is only a guess from the answers so far.'};
   }
   if(remaining.length){
    // Verify additional claims about this particular candidate rather than guessing immediately.
    return {kind:'question',...remaining[0]};
   }
   return {kind:'unknown',message:'Only one item remains in my limited collection, but your answers are not sufficient for a trustworthy guess.'};
  }
  // Ask meaningful category/feature questions first, delaying identity checks.
  let best=null,score=0;
  for(const q of questions){
   if(used.has(q.id)||q.id.startsWith('identity:')||candidates.some(x=>x.unknownTags.includes(q.id)))continue;
   const yes=candidates.filter(x=>x.tags.includes(q.id)).length;
   const split=Math.min(yes,candidates.length-yes);
   if(split>score){score=split;best=q;}
  }
  if(best)return {kind:'question',...best};
  // Subjects can share the same known attributes. A cautious direct candidate
  // confirmation is allowed only after several facts, and "No" excludes it.
  if(factual.length>=3&&affirmed.length>=2&&candidates.length<=5){
   const item=candidates[0];
   return {kind:'guess',item,message:'One possible match is '+item.name+'. Is that the answer? If not, I will remove this option.'};
  }
  return {kind:'unknown',message:'I cannot distinguish these possibilities with reliable questions. I do not know the answer yet.'};
 }
 function parseAnswer(text){
  const value=String(text??'').normalize('NFC').trim().toLowerCase().replace(/[.!?。]+$/u,'').trim();
  if(['yes','ஆம்','ஆமாம்'].includes(value))return 'yes';
  if(['no','இல்லை'].includes(value))return 'no';
  if(['unsure','not sure','i am not sure',"i'm not sure",'i don’t know',"i don't know",'தெரியவில்லை'].includes(value))return 'unsure';
  return null;
 }
 const healthQuestions={
  emergency:'Are you having severe trouble breathing right now?',
  emergencyChest:'Do you have chest pain with any of these warning signs?',
  emergencyStroke:'Have you suddenly developed any of these symptoms?',
  adult:'Are you aged 18 or older?',
  urinary:'Is your concern about passing urine, your penis, or your testicles?',
  retention:'Are you unable to pass urine at all, despite needing to?',
  testicle:'Do you have testicle pain that is sudden and severe, comes with sickness or tummy pain, lasts over an hour, or continues while resting?',
  testicleOther:'Do you have any other testicle pain, swelling, a lump, or a change in shape or feel?',
  fever:'Do you feel feverish, unusually cold, or shivery?',
  blood:'Have you noticed blood in your urine?',
  flank:'Do you have pain in your lower tummy, or in your back just under your ribs?',
  higherRisk:'Do any apply: male / assigned male at birth; pregnant; aged 65 or older; diabetes; a catheter; or a weakened immune system?',
  worsening:'Are your symptoms getting worse quickly, or not improving after 48 hours of treatment?',
  painful:'Is passing urine painful or burning, or are you needing to go more often or urgently?',
  generalWorse:'Are your symptoms severe, getting worse, or stopping you from normal daily activities?',
  persistent:'Have these symptoms persisted or kept coming back?',
  pain:'Are you experiencing pain or discomfort?'
 };
 const healthHelp={
  emergencyChest:'Pain that is sudden and does not go away; spreads to your arm, neck, jaw, stomach or back; or comes with sweating, sickness, light-headedness or breathlessness.',
  emergencyStroke:'Face drooping, weakness on one side, confusion or slurred speech. Answer Yes even if these signs have stopped within the past 24 hours.'
 };
 const sources=[
  {name:'NHS · Urinary symptoms',url:'https://www.nhs.uk/conditions/urinary-tract-infections-utis/'},
  {name:'NHS · Prostate symptoms',url:'https://www.nhs.uk/conditions/prostatitis/'},
  {name:'NHS · Testicle pain',url:'https://www.nhs.uk/symptoms/testicle-pain/'},
  {name:'NHS · Chest pain',url:'https://www.nhs.uk/symptoms/chest-pain/'},
  {name:'NHS · Stroke signs',url:'https://www.nhs.uk/conditions/stroke/symptoms/'}
 ];
 const result=(level,title,message)=>({kind:'result',level,title,message});
 function healthStep(history){
  const answers=Object.fromEntries(history.map(h=>[h.id,h.answer]));
  const ask=id=>({kind:'question',id,text:healthQuestions[id],help:healthHelp[id]||''});
  const emergencyIds=['emergency','emergencyChest','emergencyStroke'];
  if(emergencyIds.some(id=>answers[id]==='yes'))return result('emergency','Get emergency help now','Call your local emergency number or go to an emergency department. Do not drive yourself. Stop this check-in and get help.');
  if(emergencyIds.some(id=>answers[id]==='unsure'))return result('urgent','Get help assessing this now','HC cannot rule out an emergency. Contact an urgent medical service now; if an emergency symptom may be present, call your local emergency number.');
  for(const id of emergencyIds)if(!answers[id])return ask(id);
  if(!answers.adult)return ask('adult');
  if(answers.adult!=='yes')return result('advice','Ask a clinician or trusted adult','This check-in is for adults. A child or teenager needs age-appropriate advice from a clinician, with a trusted adult if possible. This short check cannot rule out serious illness.');
  if(!answers.urinary)return ask('urinary');
  if(answers.urinary==='unsure')return result('advice','Describe this to a clinician','It is okay not to know which body area is involved. A clinician can help you describe it privately. This limited check-in cannot assess the cause or rule out serious illness.');
  if(answers.urinary==='yes'){
   for(const id of ['retention','testicle','testicleOther','fever','blood','flank','higherRisk','worsening']){
    if(!answers[id])return ask(id);
    if(answers[id]!=='no'){
     if(id==='testicle'&&answers[id]==='yes')return result('emergency','Go to an emergency department now','These testicle symptoms need immediate hospital assessment. Do not wait for another question or drive yourself. Call your local emergency number if you need help getting there.');
     return result('urgent','Contact an urgent medical service now',id==='retention'?'Being unable to pass urine needs urgent assessment. Do not wait for this check-in to continue.':'Your answer needs prompt medical assessment. Contact a doctor or urgent care service today. If symptoms become severe or an emergency sign appears, get emergency help.');
    }
   }
   if(!answers.painful)return ask('painful');
   return result('advice','Get advice about these symptoms','Contact a clinician or pharmacist about urinary symptoms, or a doctor for penis or testicle concerns. Several causes can feel similar. This check-in does not identify the cause or rule out serious illness.');
  }
  if(!answers.generalWorse)return ask('generalWorse');
  if(answers.generalWorse!=='no')return result('urgent','Seek prompt medical advice','This check-in cannot assess severe or worsening symptoms. Contact a medical service now for individual advice. If emergency signs appear, get emergency help.');
  if(!answers.persistent)return ask('persistent');
  if(!answers.pain)return ask('pain');
  return result('advice','Your answers can help start a conversation','This limited check-in does not cover all symptoms or rule out illness. Contact a clinician if symptoms persist, recur, worry you or change. You can copy your answers to explain what is happening.');
 }
 return {bank,questions,gameStep,parseAnswer,healthQuestions,healthHelp,healthStep,sources,sourceChecked:'23 October 2026'};
});
