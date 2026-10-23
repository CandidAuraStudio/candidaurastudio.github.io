/* HeartClear Explore v156: expanded local knowledge and an adaptive question policy. */
(function(root){
'use strict';
var api=root.HCExploreCore;if(!api||!api.bank||api.gameVersion)return;
var people="Jeffrey Epstein|american deceased business financier legalcase\nBernie Madoff|american deceased business financier legalcase\nElizabeth Holmes|american female business technology legalcase\nSam Bankman-Fried|american business technology financier legalcase\nMartha Stewart|american female business television legalcase\nHarvey Weinstein|american film business legalcase\nO. J. Simpson|american deceased sport legalcase\nAl Capone|american deceased legalcase historic\nPablo Escobar|southamerican deceased legalcase historic\nEdward Snowden|american technology legalcase\nJulian Assange|australian technology legalcase\nDonald Trump|american politics business television legalcase\nJoe Biden|american politics\nBarack Obama|american politics\nKamala Harris|american female politics\nHillary Clinton|american female politics\nAbraham Lincoln|american deceased politics historic\nGeorge Washington|american deceased politics historic\nJohn F. Kennedy|american deceased politics historic\nRichard Nixon|american deceased politics legalcase\nMartin Luther King Jr.|american deceased activist politics\nRosa Parks|american deceased female activist\nNelson Mandela|african deceased politics activist\nMahatma Gandhi|indian deceased politics activist\nJawaharlal Nehru|indian deceased politics\nIndira Gandhi|indian deceased female politics\nNarendra Modi|indian politics\nA. P. J. Abdul Kalam|indian deceased science politics\nB. R. Ambedkar|indian deceased politics literature activist\nM. G. Ramachandran|indian deceased film tamil politics\nJ. Jayalalithaa|indian deceased female film tamil politics\nM. Karunanidhi|indian deceased tamil politics literature\nPeriyar|indian deceased tamil activist politics\nSirimavo Bandaranaike|srilankan deceased female politics\nMahinda Rajapaksa|srilankan politics\nRanil Wickremesinghe|srilankan politics\nAnura Kumara Dissanayake|srilankan politics\nVelupillai Prabhakaran|srilankan deceased politics legalcase\nQueen Elizabeth II|british deceased female royalty\nKing Charles III|british royalty\nWinston Churchill|british deceased politics\nMargaret Thatcher|british deceased female politics\nPrincess Diana|british deceased female royalty\nNapoleon Bonaparte|european deceased politics historic\nJulius Caesar|european deceased politics historic\nCleopatra|african deceased female royalty historic\nAdolf Hitler|european deceased politics historic\nJoseph Stalin|european deceased politics historic\nVladimir Putin|european politics\nVolodymyr Zelenskyy|european politics television\nXi Jinping|asian politics\nMao Zedong|asian deceased politics historic\nKim Jong Un|asian politics\nPope Francis|european deceased religion\nMother Teresa|indian deceased female religion activist\nThe Dalai Lama|asian religion\nGautama Buddha|asian deceased religion philosophy historic\nJesus of Nazareth|middleeast deceased religion historic\nProphet Muhammad|middleeast deceased religion historic\nSwami Vivekananda|indian deceased religion philosophy\nJiddu Krishnamurti|indian deceased philosophy religion\nSadhguru|indian religion philosophy\nThiruvalluvar|indian deceased tamil literature philosophy historic\nAvvaiyar|indian deceased female tamil literature historic\nSubramania Bharati|indian deceased tamil literature\nBharathidasan|indian deceased tamil literature\nR. K. Narayan|indian deceased literature\nRabindranath Tagore|indian deceased literature\nWilliam Shakespeare|british deceased literature historic\nCharles Dickens|british deceased literature\nJane Austen|british deceased female literature\nAgatha Christie|british deceased female literature\nJ. K. Rowling|british female literature\nGeorge Orwell|british deceased literature\nLeo Tolstoy|european deceased literature\nFyodor Dostoevsky|european deceased literature\nStephen King|american literature\nMaya Angelou|american deceased female literature activist\nSocrates|european deceased philosophy historic\nPlato|european deceased philosophy historic\nAristotle|european deceased philosophy science historic\nFriedrich Nietzsche|european deceased philosophy\nAlbert Camus|european deceased philosophy literature\nStephen Hawking|british deceased science\nCharles Darwin|british deceased science\nGalileo Galilei|european deceased science historic\nNikola Tesla|european deceased science technology\nAda Lovelace|british deceased female computing science\nAlan Turing|british deceased computing science\nKatherine Johnson|american deceased female science space\nNeil Armstrong|american deceased space science\nYuri Gagarin|european deceased space science\nKalpana Chawla|indian deceased female space science\nSrinivasa Ramanujan|indian deceased science\nC. V. Raman|indian deceased science\nTu Youyou|asian female science\nJane Goodall|british female science activist\nTim Berners-Lee|british computing technology\nLinus Torvalds|european computing technology\nGrace Hopper|american deceased female computing science\nSteve Jobs|american deceased business technology\nBill Gates|american business technology financier\nSteve Wozniak|american business technology\nElon Musk|american business technology space\nJeff Bezos|american business technology\nMark Zuckerberg|american business technology\nLarry Page|american business technology\nSundar Pichai|indian business technology\nSatya Nadella|indian business technology\nSam Altman|american business technology\nJack Ma|asian business technology\nMukesh Ambani|indian business financier\nRatan Tata|indian deceased business\nWarren Buffett|american business financier\nHenry Ford|american deceased business technology\nWalt Disney|american deceased business film\nOprah Winfrey|american female television business\nTaylor Swift|american female music business\nBeyoncé|american female music\nRihanna|american female music business\nMadonna|american female music\nLady Gaga|american female music film\nBillie Eilish|american female music\nWhitney Houston|american deceased female music\nElvis Presley|american deceased music film\nPrince|american deceased music\nBob Marley|african deceased music\nFreddie Mercury|british deceased music\nJohn Lennon|british deceased music\nPaul McCartney|british music\nAdele|british female music\nEd Sheeran|british music\nEminem|american music\nTupac Shakur|american deceased music\nKanye West|american music business\nJustin Bieber|american music\nA. R. Rahman|indian music tamil film\nIlaiyaraaja|indian music tamil film\nS. P. Balasubrahmanyam|indian deceased music tamil film\nK. J. Yesudas|indian music film\nLata Mangeshkar|indian deceased female music\nShreya Ghoshal|indian female music film\nAnirudh Ravichander|indian music tamil film\nYuvan Shankar Raja|indian music tamil film\nSid Sriram|indian music tamil film\nDhanush|indian film tamil music\nVijay|indian film tamil\nAjith Kumar|indian film tamil\nKamal Haasan|indian film tamil politics\nSivaji Ganesan|indian deceased film tamil\nNayanthara|indian female film tamil\nTrisha Krishnan|indian female film tamil\nSamantha Ruth Prabhu|indian female film tamil\nSuriya|indian film tamil\nVikram|indian film tamil\nVijay Sethupathi|indian film tamil\nS. J. Suryah|indian film tamil\nMani Ratnam|indian film tamil\nS. S. Rajamouli|indian film\nShah Rukh Khan|indian film\nSalman Khan|indian film\nAamir Khan|indian film\nAmitabh Bachchan|indian film television\nDeepika Padukone|indian female film\nPriyanka Chopra|indian female film\nMohanlal|indian film\nMammootty|indian film\nMarilyn Monroe|american deceased female film\nAudrey Hepburn|european deceased female film\nTom Cruise|american film\nLeonardo DiCaprio|american film\nBrad Pitt|american film\nAngelina Jolie|american female film activist\nWill Smith|american film music television\nDwayne Johnson|american film sport\nMorgan Freeman|american film\nKeanu Reeves|american film\nJackie Chan|asian film sport\nBruce Lee|asian deceased film sport\nArnold Schwarzenegger|american film politics sport\nChristopher Nolan|british film\nSteven Spielberg|american film\nJames Cameron|american film\nPelé|southamerican deceased sport football\nDiego Maradona|southamerican deceased sport football argentina\nKylian Mbappé|european sport football\nNeymar|southamerican sport football\nMohamed Salah|african sport football\nDavid Beckham|british sport football\nSachin Tendulkar|indian sport cricket\nVirat Kohli|indian sport cricket\nM. S. Dhoni|indian sport cricket\nRohit Sharma|indian sport cricket\nLasith Malinga|srilankan sport cricket\nKumar Sangakkara|srilankan sport cricket\nMuttiah Muralitharan|srilankan sport cricket\nSanath Jayasuriya|srilankan sport cricket\nMahela Jayawardene|srilankan sport cricket\nSerena Williams|american female sport tennis\nRoger Federer|european sport tennis\nRafael Nadal|european sport tennis\nNovak Djokovic|european sport tennis\nMichael Jordan|american sport basketball\nLeBron James|american sport basketball\nKobe Bryant|american deceased sport basketball\nStephen Curry|american sport basketball\nUsain Bolt|african sport\nSimone Biles|american female sport\nMuhammad Ali|american deceased sport\nMike Tyson|american sport\nManny Pacquiao|asian sport politics",others={"animal":"whale|water;dolphin|water;octopus|water;penguin|bird water;crocodile|water;turtle|water;rabbit|pet;horse|farm;goat|farm;duck|bird farm;peacock|bird;sparrow|bird;mosquito|insect;ant|insect;snake|;deer|;giraffe|;zebra|stripes;buffalo|farm;monkey|","plant":"banana plant|;rose|flower fragrant;sunflower|flower;tulip|flower;aloe vera|;basil|;coriander|;curry leaf tree|tree;moringa tree|tree;jackfruit tree|tree;papaya tree|tree;palmyra palm|tree palm;tea plant|;coffee plant|;banyan tree|tree;cactus|;fern|;tomato plant|;chilli plant|","food":"dosa|grain;idli|grain;pittu|grain;string hoppers|grain;appam|grain;sambar|;fish curry|;chicken curry|;fried rice|grain;biryani|grain;pizza|grain;pasta|grain;ice cream|milk;yogurt|milk;mango|fruit;jackfruit|fruit;papaya|fruit;coconut|fruit;orange|fruit;pineapple|fruit;watermelon|fruit","place":"Sri Lanka|;India|;Malta|;Jaffna|;Colombo|;Chennai|;Akkaraipattu|;London|;New York|;Paris|;Dubai|;Eiffel Tower|built;Taj Mahal|built;Pyramids of Giza|built;library|built learning;university|built learning;temple|built worship;church|built worship;railway station|built;airport|built;waterfall|water;island|water;desert|;volcano|high;cave|","object":"laptop|electronic;tablet|electronic;keyboard|electronic;microphone|electronic;speaker|electronic;headphones|electronic wear;television|electronic;printer|electronic;refrigerator|electronic kitchen;blender|electronic kitchen;sewing machine|electronic;fishing rod|;bicycle helmet|wear;skateboard|transport;train|transport motor;bus|transport motor;scooter|transport twoWheels;suitcase|;backpack|wear;chair|;bed|;mirror|;clock|time;toothbrush|;umbrella|;notebook|read;pen|;hammer|;scissors|cut;cooking pot|kitchen","concept":"friendship|emotion affection;sadness|emotion;happiness|emotion;anger|emotion;curiosity|emotion;nostalgia|emotion;trust|emotion;hope|emotion future;nightmare|sleep;lucid dream|sleep;life goal|future;creative idea|future;birthday memory|;song stuck in your head|;childhood memory|;journey|;secret|;question|;prediction|future;gratitude|emotion affection"};
var known=new Set(api.bank.map(function(e){return e.name.toLowerCase()}));
function add(group,n,tags){
 if(!n||known.has(n.toLowerCase()))return;
 var id='x156-'+group+'-'+n.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,60);
 api.bank.push({id:id,name:n,tags:[group].concat(tags.split(' ').filter(Boolean)),unknownTags:[]});
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
['legalcase','Is this person widely associated with a major court case or investigation?'],['technology','Are they connected with technology?'],
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
  if(h.answer==='yes')return same?3:-999;
  return same?-999:0.15;
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
 questions.forEach(function(q){
  if(used.has(q.id))return;
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
  if(!rejected&&positive>=2&&top.prob>=.45)return {kind:'guess',item:top.item,message:'A tentative guess: '+top.item.name+'. Is that right?'};
  return {kind:'unknown',message:'After '+MAX+' questions, I still do not have enough evidence. I will not pretend I know. You can correct an earlier answer or start another round.'};
 }
 var next=nextQuestion(answered,pool);
 if(next)return next;
 if(count>=11&&!rejected&&positive>=2&&top.prob>=.45)return {kind:'guess',item:top.item,message:'A tentative guess: '+top.item.name+'. Is that right?'};
 return {kind:'unknown',message:'The remaining possibilities look too similar. I cannot make a reliable guess from these questions.'};
}
api.gameStep=gameStep;api.gameVersion='156';api.gameQuestionLimit=MAX;
api.gameStats={people:api.bank.filter(function(x){return x.tags[0]==='person'}).length,subjects:api.bank.length};
})(typeof window!=='undefined'?window:globalThis);