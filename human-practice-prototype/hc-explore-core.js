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
  ['banana','Is this fruit normally long and curved?'],['bread','Is it baked bread?'],['animalfood','Does this food normally come from an animal?'],['rootveg','Is this food an underground-growing vegetable?'],
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
  ['egg','an egg','animalfood'],['potato','a potato','rootveg']
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
   if((factual.length>=4&&affirmed.length>=3) || (factual.length>=3&&affirmed.length>=2&&!remaining.length) || (factual.length>=5&&affirmed.length>=1&&!remaining.length)){
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

/* HeartClear Explore v156: expanded local knowledge and an adaptive question policy. */
(function(api){
'use strict';
if(!api||!api.bank||api.gameVersion)return;
var people="Jeffrey Epstein|american deceased business financier legalcase abusecase diedBefore2020\nBernie Madoff|american deceased business financier legalcase fraudcase\nElizabeth Holmes|american female business technology legalcase fraudcase\nSam Bankman-Fried|american business technology financier legalcase fraudcase\nMartha Stewart|american female business television legalcase\nHarvey Weinstein|american film business legalcase abusecase\nO. J. Simpson|american deceased sport legalcase\nAl Capone|american deceased legalcase historic diedBefore2020\nPablo Escobar|southamerican deceased legalcase historic diedBefore2020\nEdward Snowden|american technology legalcase\nJulian Assange|australian technology legalcase\nDonald Trump|american politics business television legalcase\nJoe Biden|american politics\nBarack Obama|american politics\nKamala Harris|american female politics\nHillary Clinton|american female politics\nAbraham Lincoln|american deceased politics historic\nGeorge Washington|american deceased politics historic\nJohn F. Kennedy|american deceased politics historic\nRichard Nixon|american deceased politics legalcase\nMartin Luther King Jr.|american deceased activist politics\nRosa Parks|american deceased female activist\nNelson Mandela|african deceased politics activist\nMahatma Gandhi|indian deceased politics activist\nJawaharlal Nehru|indian deceased politics\nIndira Gandhi|indian deceased female politics\nNarendra Modi|indian politics\nA. P. J. Abdul Kalam|indian deceased science politics\nB. R. Ambedkar|indian deceased politics literature activist\nM. G. Ramachandran|indian deceased film tamil politics\nJ. Jayalalithaa|indian deceased female film tamil politics\nM. Karunanidhi|indian deceased tamil politics literature\nPeriyar|indian deceased tamil activist politics\nSirimavo Bandaranaike|srilankan deceased female politics\nMahinda Rajapaksa|srilankan politics\nRanil Wickremesinghe|srilankan politics\nAnura Kumara Dissanayake|srilankan politics\nVelupillai Prabhakaran|srilankan deceased politics legalcase\nQueen Elizabeth II|british deceased female royalty\nKing Charles III|british royalty\nWinston Churchill|british deceased politics\nMargaret Thatcher|british deceased female politics\nPrincess Diana|british deceased female royalty\nNapoleon Bonaparte|european deceased politics historic\nJulius Caesar|european deceased politics historic\nCleopatra|african deceased female royalty historic\nAdolf Hitler|european deceased politics historic\nJoseph Stalin|european deceased politics historic\nVladimir Putin|european politics\nVolodymyr Zelenskyy|european politics television\nXi Jinping|asian politics\nMao Zedong|asian deceased politics historic\nKim Jong Un|asian politics\nPope Francis|european deceased religion\nMother Teresa|indian deceased female religion activist\nThe Dalai Lama|asian religion\nGautama Buddha|asian deceased religion philosophy historic\nJesus of Nazareth|middleeast deceased religion historic\nProphet Muhammad|middleeast deceased religion historic\nSwami Vivekananda|indian deceased religion philosophy\nJiddu Krishnamurti|indian deceased philosophy religion\nSadhguru|indian religion philosophy\nThiruvalluvar|indian deceased tamil literature philosophy historic\nAvvaiyar|indian deceased female tamil literature historic\nSubramania Bharati|indian deceased tamil literature\nBharathidasan|indian deceased tamil literature\nR. K. Narayan|indian deceased literature\nRabindranath Tagore|indian deceased literature\nWilliam Shakespeare|british deceased literature historic\nCharles Dickens|british deceased literature\nJane Austen|british deceased female literature\nAgatha Christie|british deceased female literature\nJ. K. Rowling|british female literature\nGeorge Orwell|british deceased literature\nLeo Tolstoy|european deceased literature\nFyodor Dostoevsky|european deceased literature\nStephen King|american literature\nMaya Angelou|american deceased female literature activist\nSocrates|european deceased philosophy historic\nPlato|european deceased philosophy historic\nAristotle|european deceased philosophy science historic\nFriedrich Nietzsche|european deceased philosophy\nAlbert Camus|european deceased philosophy literature\nStephen Hawking|british deceased science\nCharles Darwin|british deceased science\nGalileo Galilei|european deceased science historic\nNikola Tesla|european deceased science technology\nAda Lovelace|british deceased female computing science\nAlan Turing|british deceased computing science\nKatherine Johnson|american deceased female science space\nNeil Armstrong|american deceased space science\nYuri Gagarin|european deceased space science\nKalpana Chawla|indian deceased female space science\nSrinivasa Ramanujan|indian deceased science\nC. V. Raman|indian deceased science\nTu Youyou|asian female science\nJane Goodall|british female science activist\nTim Berners-Lee|british computing technology\nLinus Torvalds|european computing technology\nGrace Hopper|american deceased female computing science\nSteve Jobs|american deceased business technology\nBill Gates|american business technology financier\nSteve Wozniak|american business technology\nElon Musk|american business technology space\nJeff Bezos|american business technology\nMark Zuckerberg|american business technology\nLarry Page|american business technology\nSundar Pichai|indian business technology\nSatya Nadella|indian business technology\nSam Altman|american business technology\nJack Ma|asian business technology\nMukesh Ambani|indian business financier\nRatan Tata|indian deceased business\nWarren Buffett|american business financier\nHenry Ford|american deceased business technology\nWalt Disney|american deceased business film\nOprah Winfrey|american female television business\nTaylor Swift|american female music business\nBeyoncé|american female music\nRihanna|american female music business\nMadonna|american female music\nLady Gaga|american female music film\nBillie Eilish|american female music\nWhitney Houston|american deceased female music\nElvis Presley|american deceased music film\nPrince|american deceased music\nBob Marley|african deceased music\nFreddie Mercury|british deceased music\nJohn Lennon|british deceased music\nPaul McCartney|british music\nAdele|british female music\nEd Sheeran|british music\nEminem|american music\nTupac Shakur|american deceased music\nKanye West|american music business\nJustin Bieber|american music\nA. R. Rahman|indian music tamil film\nIlaiyaraaja|indian music tamil film\nS. P. Balasubrahmanyam|indian deceased music tamil film\nK. J. Yesudas|indian music film\nLata Mangeshkar|indian deceased female music\nShreya Ghoshal|indian female music film\nAnirudh Ravichander|indian music tamil film\nYuvan Shankar Raja|indian music tamil film\nSid Sriram|indian music tamil film\nDhanush|indian film tamil music\nVijay|indian film tamil\nAjith Kumar|indian film tamil\nKamal Haasan|indian film tamil politics\nSivaji Ganesan|indian deceased film tamil\nNayanthara|indian female film tamil\nTrisha Krishnan|indian female film tamil\nSamantha Ruth Prabhu|indian female film tamil\nSuriya|indian film tamil\nVikram|indian film tamil\nVijay Sethupathi|indian film tamil\nS. J. Suryah|indian film tamil\nMani Ratnam|indian film tamil\nS. S. Rajamouli|indian film\nShah Rukh Khan|indian film\nSalman Khan|indian film\nAamir Khan|indian film\nAmitabh Bachchan|indian film television\nDeepika Padukone|indian female film\nPriyanka Chopra|indian female film\nMohanlal|indian film\nMammootty|indian film\nMarilyn Monroe|american deceased female film\nAudrey Hepburn|european deceased female film\nTom Cruise|american film\nLeonardo DiCaprio|american film\nBrad Pitt|american film\nAngelina Jolie|american female film activist\nWill Smith|american film music television\nDwayne Johnson|american film sport\nMorgan Freeman|american film\nKeanu Reeves|american film\nJackie Chan|asian film sport\nBruce Lee|asian deceased film sport\nArnold Schwarzenegger|american film politics sport\nChristopher Nolan|british film\nSteven Spielberg|american film\nJames Cameron|american film\nPelé|southamerican deceased sport football\nDiego Maradona|southamerican deceased sport football argentina\nKylian Mbappé|european sport football\nNeymar|southamerican sport football\nMohamed Salah|african sport football\nDavid Beckham|british sport football\nSachin Tendulkar|indian sport cricket\nVirat Kohli|indian sport cricket\nM. S. Dhoni|indian sport cricket\nRohit Sharma|indian sport cricket\nLasith Malinga|srilankan sport cricket\nKumar Sangakkara|srilankan sport cricket\nMuttiah Muralitharan|srilankan sport cricket\nSanath Jayasuriya|srilankan sport cricket\nMahela Jayawardene|srilankan sport cricket\nSerena Williams|american female sport tennis\nRoger Federer|european sport tennis\nRafael Nadal|european sport tennis\nNovak Djokovic|european sport tennis\nMichael Jordan|american sport basketball\nLeBron James|american sport basketball\nKobe Bryant|american deceased sport basketball\nStephen Curry|american sport basketball\nUsain Bolt|african sport\nSimone Biles|american female sport\nMuhammad Ali|american deceased sport\nMike Tyson|american sport\nManny Pacquiao|asian sport politics",others={"animal":"whale|water;dolphin|water;octopus|water;penguin|bird water;crocodile|water;turtle|water;rabbit|pet;horse|farm;goat|farm;duck|bird farm;peacock|bird;sparrow|bird;mosquito|insect;ant|insect;snake|;deer|;giraffe|;zebra|stripes;buffalo|farm;monkey|","plant":"banana plant|;rose|flower fragrant;sunflower|flower;tulip|flower;aloe vera|;basil|;coriander|;curry leaf tree|tree;moringa tree|tree;jackfruit tree|tree;papaya tree|tree;palmyra palm|tree palm;tea plant|;coffee plant|;banyan tree|tree;cactus|;fern|;tomato plant|;chilli plant|","food":"dosa|grain;idli|grain;pittu|grain;string hoppers|grain;appam|grain;sambar|;fish curry|;chicken curry|;fried rice|grain;biryani|grain;pizza|grain;pasta|grain;ice cream|milk;yogurt|milk;mango|fruit;jackfruit|fruit;papaya|fruit;coconut|fruit;orange|fruit;pineapple|fruit;watermelon|fruit","place":"Sri Lanka|;India|;Malta|;Jaffna|;Colombo|;Chennai|;Akkaraipattu|;London|;New York|;Paris|;Dubai|;Eiffel Tower|built;Taj Mahal|built;Pyramids of Giza|built;library|built learning;university|built learning;temple|built worship;church|built worship;railway station|built;airport|built;waterfall|water;island|water;desert|;volcano|high;cave|","object":"laptop|electronic;tablet|electronic;keyboard|electronic;microphone|electronic;speaker|electronic;headphones|electronic wear;television|electronic;printer|electronic;refrigerator|electronic kitchen;blender|electronic kitchen;sewing machine|electronic;fishing rod|;bicycle helmet|wear;skateboard|transport;train|transport motor;bus|transport motor;scooter|transport twoWheels;suitcase|;backpack|wear;chair|;bed|;mirror|;clock|time;toothbrush|;umbrella|;notebook|read;pen|;hammer|;scissors|cut;cooking pot|kitchen","concept":"friendship|emotion affection;sadness|emotion;happiness|emotion;anger|emotion;curiosity|emotion;nostalgia|emotion;trust|emotion;hope|emotion future;nightmare|sleep;lucid dream|sleep;life goal|future;creative idea|future;birthday memory|;song stuck in your head|;childhood memory|;journey|;secret|;question|;prediction|future;gratitude|emotion affection"};
var known=new Set(api.bank.map(function(e){return e.name.toLowerCase()}));
function add(group,n,tags){
 if(!n||known.has(n.toLowerCase()))return;
 var id='x156-'+group+'-'+n.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,60);
 api.bank.push({id:id,name:n,tags:[group].concat(group==='person'?['public']:[],tags.split(' ').filter(Boolean)),unknownTags:[]});
 known.add(n.toLowerCase());
}
people.split('\n').forEach(function(s){var p=s.split('|');if(p.length>1)add('person',p[0],p[1])});
Object.keys(others).forEach(function(k){others[k].split(';').forEach(function(s){var p=s.split('|');if(p.length>1)add(k,p[0],p[1])})});
var enrich={einstein:'european deceased',newton:'british deceased',curie:'european deceased',messi:'southamerican sport',ronaldo:'european sport',chaplin:'british deceased',rajini:'indian',jackson:'american deceased'};
Object.keys(enrich).forEach(function(id){var x=api.bank.find(function(v){return v.id===id});if(x)enrich[id].split(' ').forEach(function(tag){if(!x.tags.includes(tag))x.tags.push(tag)})});
var personQuestions=[
['deceased','Has this person died?'],['american','Is this person strongly associated with the United States?'],['british','Is this person associated with the United Kingdom?'],
['indian','Is this person associated with India?'],['srilankan','Is this person associated with Sri Lanka?'],['european','Is this person associated with continental Europe?'],
['asian','Is this person associated with East or Southeast Asia?'],['african','Is this person associated with Africa?'],['southamerican','Is this person from South America?'],
['middleeast','Is this person associated with the Middle East?'],['business','Are they known for business or finance?'],['financier','Was finance or investing their work?'],
['legalcase','Is this person widely associated with a major court case or investigation?'],['fraudcase','Did the well-known case chiefly involve financial fraud?'],['abusecase','Did the case involve allegations of abuse rather than investment fraud?'],['diedBefore2020','Did this person die before the year 2020?'],['technology','Are they connected with technology?'],
['computing','Are computers or software central to their work?'],['politics','Are they connected with politics or government?'],
['activist','Are they known for activism or social change?'],['royalty','Are they from a royal family?'],
['religion','Are they known for religious or spiritual teaching?'],['philosophy','Are they known for philosophy?'],
['literature','Are they known as an author or poet?'],['space','Are they known for space exploration?'],
['television','Are they known for television?'],['sport','Are they known for sport?'],
['cricket','Are they known for cricket?'],['basketball','Are they known for basketball?'],
['tennis','Are they known for tennis?'],['historic','Did they live mostly in an earlier historical era?']];
var ids=new Set(api.questions.map(function(x){return x.id}));
personQuestions.forEach(function(q){if(!ids.has(q[0]))api.questions.push({id:q[0],text:q[1],category:'person'})});
var relative=['grandfather','grandmother','father','mother','brother','sister','son','daughter','uncle','aunt','friend','colleague','teacher','partner'];
var extra=personQuestions.map(function(x){return x[0]});
api.bank.filter(function(x){return relative.includes(x.id)}).forEach(function(x){x.unknownTags=[...new Set((x.unknownTags||[]).concat(extra))]});
var categories=['person','animal','plant','food','place','object','concept'];
var questions=api.questions.filter(function(x){return !x.id.startsWith('identity:')});
function score(x,h){
 if(h.id.startsWith('reject:'))return x.id===h.id.slice(7)?-999:0;
 if(h.answer==='unsure')return 0;
 if(categories.includes(h.id)){
  var same=x.tags[0]===h.id;
  if(h.answer==='yes')return same?3:-5;
  return same?-4:0.15;
 }
 if((x.unknownTags||[]).includes(h.id))return 0;
 var yes=x.tags.includes(h.id);
 return h.answer==='yes'?(yes?2.1:-2.5):(yes?-2.15:.38);
}
function ranked(history){
 var a=api.bank.map(function(x){return {item:x,score:history.reduce(function(n,h){return n+score(x,h)},0)}})
 .filter(function(x){return x.score>-900}).sort(function(a,b){return b.score-a.score});
 if(!a.length)return [];
 a=a.filter(function(x){return x.score>=a[0].score-10}).slice(0,90);
 var best=a[0].score,weights=a.map(function(x){return Math.exp((x.score-best)/1.5)}),total=weights.reduce(function(a,b){return a+b},0);
 return a.map(function(x,i){return {item:x.item,score:x.score,prob:weights[i]/total}});
}
function nextQuestion(history,pool){
 var used=new Set(history.map(function(x){return x.id}));var best=null,high=0;
 var selectedKind=history.find(function(h){return categories.includes(h.id)&&h.answer==='yes'})?.id;
 var relativeOnly=['older','grand','parent','sibling','child','work','teach','partner'];
 questions.forEach(function(q){
  if(used.has(q.id))return;
  if(categories.includes(q.id)&&selectedKind)return;
  if(relativeOnly.includes(q.id)&&!history.some(function(h){return h.id==='family'&&h.answer==='yes'}))return;
  if(q.id==='family'&&history.some(function(h){return h.id==='public'&&h.answer==='yes'}))return;
  var mass=0,yes=0;
  pool.forEach(function(x){
   var valid=!q.category||x.item.tags[0]===q.category;
   if(!valid)return;
   mass+=x.prob;
   yes+=x.prob*((x.item.unknownTags||[]).includes(q.id)?.5:x.item.tags.includes(q.id)?.9:.1);
  });
  if(mass<.35)return;
  // Balanced, pertinent questions discriminate better than obscure identity checks.
  var p=yes/mass,quality=4*p*(1-p)*mass*(categories.includes(q.id)?1.08:1);
  if(quality>high){high=quality;best=q}
 });
 return best&&high>.035?{kind:'question',id:best.id,text:best.text}:null;
}
var MAX=25;
function gameStep(history){
 var answered=history.filter(function(x){return !x.id.startsWith('reject:')});
 var pool=ranked(history),top=pool[0],count=answered.length;
 if(!top||top.score< -25)return {kind:'unknown',message:'Your answers are outside what this version can identify reliably. You can change a previous answer or try another round.'};
 var runner=pool[1],gap=runner?top.score-runner.score:99;
 var positive=answered.filter(function(h){return h.answer==='yes'&&top.item.tags.includes(h.id)}).length;
 var rejected=history.some(function(x){return x.id.startsWith('reject:')});
 var confident=count>=11&&positive>=3&&top.prob>=.82&&gap>=3.1;
 if(confident)return {kind:'guess',item:top.item,message:'Could you be thinking of '+top.item.name+'?'};
 if(count>=MAX){
  if(positive>=1)return {kind:'guess',item:top.item,message:'A tentative guess: '+top.item.name+'. Is that right?'};
  return {kind:'unknown',message:'After '+MAX+' questions, I still do not have enough evidence. I will not pretend I know. You can correct an earlier answer or start another round.'};
 }
 var next=nextQuestion(answered,pool);
 if(next)return next;
 if(count>=4&&positive>=1)return {kind:'guess',item:top.item,message:'A tentative guess: '+top.item.name+'. Is that right?'};
 return {kind:'unknown',message:'The remaining possibilities look too similar. I cannot make a reliable guess from these questions.'};
}
api.gameStep=gameStep;api.gameVersion='156';api.gameQuestionLimit=MAX;
api.gameStats={people:api.bank.filter(function(x){return x.tags[0]==='person'}).length,subjects:api.bank.length};
})(typeof module==='object'&&module.exports?module.exports:(typeof window!=='undefined'?window.HCExploreCore:globalThis.HCExploreCore));

/* Locally taught game subjects. Never collect health answers or transmit names. */
(function(api){
 'use strict';
 if(!api||!api.bank)return;
 const KEY='hcExploreTaughtV1';
 const categories=['person','animal','plant','food','place','object','concept'];
 function read(){
  try{
   const data=JSON.parse(localStorage.getItem(KEY)||'[]');
   return Array.isArray(data)?data.slice(-30).filter(x=>x&&/^local-[a-z0-9-]+$/.test(x.id)&&typeof x.name==='string'&&x.name.length<=60&&categories.includes(x.category)&&Array.isArray(x.yes)&&Array.isArray(x.no)):[];
  }catch(e){return []}
 }
 function insert(entry){
  if(api.bank.some(x=>x.id===entry.id||x.name.toLowerCase()===entry.name.toLowerCase()))return false;
  const yes=entry.yes.filter(x=>api.questions.some(q=>q.id===x&&!q.id.startsWith('identity:')));
  const no=entry.no.filter(x=>api.questions.some(q=>q.id===x&&!q.id.startsWith('identity:')));
  const answered=new Set([...yes,...no]);
  const item={id:entry.id,name:entry.name,tags:[entry.category,...yes.filter(x=>x!==entry.category&&!categories.includes(x))],
   unknownTags:api.questions.filter(q=>!q.id.startsWith('identity:')&&!categories.includes(q.id)&&!answered.has(q.id)).map(q=>q.id)};
  api.bank.push(item);
  return true;
 }
 let saved=read();saved.forEach(insert);
 api.localCount=()=>saved.length;
 api.teachLocal=(name,category,history)=>{
  name=String(name||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,60);
  if(name.length<2||!categories.includes(category)||api.bank.some(x=>x.name.toLowerCase()===name.toLowerCase()))return {ok:false,message:'Please choose a different, short name.'};
  const good=Array.isArray(history)?history.filter(x=>x&&api.questions.some(q=>q.id===x.id)&&!x.id.startsWith('identity:')):[];
  const yes=[...new Set(good.filter(x=>x.answer==='yes').map(x=>x.id))];
  const no=[...new Set(good.filter(x=>x.answer==='no').map(x=>x.id))];
  const entry={id:'local-'+Date.now().toString(36)+'-'+Math.floor(Math.random()*1000).toString(36),name,category,yes,no};
  const next=[...saved,entry].slice(-30);
  try{localStorage.setItem(KEY,JSON.stringify(next));saved=next;insert(entry);return {ok:true,message:'Saved on this device only. You can erase learned items here.'}}
  catch(e){return {ok:false,message:'Device storage is unavailable; the item was not saved.'}}
 };
 api.forgetLocal=()=>{
  try{localStorage.removeItem(KEY);const ids=new Set(saved.map(x=>x.id));for(let i=api.bank.length-1;i>=0;i--)if(ids.has(api.bank[i].id))api.bank.splice(i,1);saved=[];return true}catch(e){return false}
 };
})(typeof module==='object'&&module.exports?module.exports:(typeof window!=='undefined'?window.HCExploreCore:globalThis.HCExploreCore));
