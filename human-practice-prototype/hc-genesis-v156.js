/* HeartClear Genesis · original English and Tamil story summaries, separate from Bible scripture.
   English chapter audio: World English Bible Updated, Basil Sands (public domain).
   English verse text: World English Bible Classic from bible-api.com, public domain.
   Tamil story summaries are original editorial retellings, NOT Bible translation. */
(function(){
'use strict';
const home=document.getElementById('home');
const greeting=home?.querySelector('.hc-home-greeting-row');
if(!home||!greeting||document.getElementById('hcGenesisCard'))return;
const stories=[["Creation","God creates light, sky, land, living things and people. The opening describes a world coming into order.","கடவுள் ஒளி, வானம், நிலம், உயிரினங்கள், மனிதர்கள் என உலகை உருவாக்குகிறார். எல்லாவற்றுக்கும் ஒரு தொடக்கம் இருக்கிறது என்பதிலிருந்து கதை ஆரம்பிக்கிறது."],["The Garden","God places the first human in a garden and gives a clear boundary. Another human joins him.","முதல் மனிதனை கடவுள் ஒரு தோட்டத்தில் வாழ வைக்கிறார். ஒரு எல்லையையும் சொல்கிறார். அவருடன் இன்னொரு மனிதரும் வாழத் தொடங்குகிறார்."],["A Choice and Its Result","The man and woman cross the boundary set for them. Their choices change their lives, and they leave the garden.","அவர்கள் சொல்லப்பட்ட எல்லையை மீறுகிறார்கள். அந்த முடிவு வாழ்க்கையை மாற்றுகிறது. இறுதியில் தோட்டத்தை விட்டு வெளியேறுகிறார்கள்."],["Cain and Abel","Jealousy grows between two brothers. Cain harms Abel, and the family faces loss and separation.","இரு சகோதரர்களுக்குள் பொறாமை வளர்கிறது. ஆபேலுக்கு கேடு நேர்கிறது. ஒரு குடும்பம் இழப்பையும் பிரிவையும் சந்திக்கிறது."],["Families and Generations","The story traces generations from Adam to Noah, connecting people across many years.","ஆதாமிலிருந்து நோவா வரை பல தலைமுறைகள் வருகின்றன. காலம் கடந்து குடும்பக் கதை தொடர்கிறது."],["Noah Builds the Ark","Human wrongdoing increases. Noah receives a warning and prepares an ark for his family and living creatures.","மனிதர்களின் தவறுகள் அதிகரிக்கின்றன. நோவாவுக்கு ஒரு எச்சரிக்கை வருகிறது. குடும்பத்தையும் உயிரினங்களையும் காக்க அவர் ஒரு பெரிய படகைத் தயார் செய்கிறார்."],["The Flood","Noah's family enters the ark. A great flood covers the land, and life outside the ark is lost.","நோவாவின் குடும்பம் படகுக்குள் செல்கிறது. பெருவெள்ளம் நிலத்தை மூடுகிறது. படகுக்கு வெளியே இருந்த உயிர்கள் அழிகின்றன என்று கதை சொல்கிறது."],["A New Beginning","The waters go down. Noah's family leaves the ark and begins again.","வெள்ளம் மெதுவாக வற்றுகிறது. நோவாவின் குடும்பம் வெளியே வந்து மீண்டும் வாழ்க்கையைத் தொடங்குகிறது."],["The Rainbow Promise","God makes a covenant with Noah and his descendants. The rainbow becomes its sign.","நோவாவுக்கும் அவருக்குப் பின் வரும் மக்களுக்கும் கடவுள் ஒரு வாக்குறுதி அளிக்கிறார். வானவில் அதன் அடையாளமாக வருகிறது."],["Nations and Families","The descendants of Noah become many families and peoples.","நோவாவின் சந்ததியினர் பல குடும்பங்களாகவும் மக்கள் கூட்டங்களாகவும் பரவுகிறார்கள்."],["Babel and Abram's Family","People try to build a great city and tower. Their languages are confused; the story then moves toward Abram's family.","மக்கள் ஒரு பெரிய நகரத்தையும் கோபுரத்தையும் கட்ட நினைக்கிறார்கள். மொழிகள் மாறி மக்கள் பிரிகிறார்கள். அடுத்து ஆபிராமின் குடும்பம் அறிமுகமாகிறது."],["Abram's Journey","Abram leaves his homeland after God's call and travels toward Canaan. A famine later takes him to Egypt.","கடவுளின் அழைப்பை ஏற்று ஆபிராம் சொந்த ஊரை விட்டு கானான் நோக்கிப் பயணம் செய்கிறார். பஞ்சம் வந்தபோது எகிப்துக்குச் செல்கிறார்."],["Abram and Lot Separate","Abram and Lot choose different places to live when their households become too large to stay together.","குடும்பங்களும் கால்நடைகளும் பெருகியதால் ஆபிராமும் லோத்தும் வெவ்வேறு இடங்களில் வாழ முடிவு செய்கிறார்கள்."],["Lot Is Rescued","After conflict between kings, Lot is taken away. Abram gathers help and brings him back.","அரசர்களுக்கிடையே சண்டை நடக்கும்போது லோத்து பிடித்துச் செல்லப்படுகிறார். ஆபிராம் உதவி திரட்டி அவரை மீட்டு வருகிறார்."],["A Promise of Descendants","Abram worries about having no child. God promises a future family and land.","தனக்குக் குழந்தை இல்லையே என்று ஆபிராம் கவலைப்படுகிறார். அவருக்கு எதிர்கால சந்ததியும் நிலமும் கிடைக்கும் என்று கடவுள் வாக்குறுதி தருகிறார்."],["Hagar and Ishmael","Sarai's servant Hagar has a son, Ishmael. The chapter shows pain and tension within the family.","சாராயின் பணிப்பெண் ஆகார் இஸ்மவேலைப் பெற்றெடுக்கிறார். வீட்டுக்குள் மனக்கசப்பும் சிக்கலும் உருவாகின்றன."],["Abraham and Sarah","Abram and Sarai receive the names Abraham and Sarah. The promise of a son, Isaac, is renewed.","ஆபிராம் ஆபிரகாம் என்றும் சாராய் சாராள் என்றும் அழைக்கப்படுகிறார்கள். ஈசாக்கு என்ற மகன் பிறப்பான் என்ற வாக்குறுதி மீண்டும் சொல்லப்படுகிறது."],["Visitors and a Promise","Abraham welcomes visitors. Sarah hears that she will have a son, and Abraham asks for mercy for a city.","ஆபிரகாம் வந்த விருந்தினர்களை வரவேற்கிறார். சாராளுக்கு மகன் பிறக்கும் செய்தி வருகிறது. ஒரு நகருக்காக ஆபிரகாம் கருணை கேட்கிறார்."],["Lot Escapes","Lot and part of his family escape as Sodom is destroyed. The family faces a difficult aftermath.","சோதோம் அழியும் போது லோத்தும் குடும்பத்தில் சிலரும் தப்புகிறார்கள். அதற்குப் பின்பும் குடும்பம் கடினமான நிலையைச் சந்திக்கிறது."],["Abraham and Abimelech","Abraham and Sarah meet King Abimelech. A misunderstanding puts Sarah at risk before being resolved.","ஆபிரகாமும் சாராளும் அபிமெலேக்கு அரசரைச் சந்திக்கிறார்கள். சாராளைப் பற்றிய தவறான புரிதல் ஒரு பிரச்சினையாகி பின்னர் தீர்கிறது."],["Isaac Is Born","Sarah gives birth to Isaac. Hagar and Ishmael leave Abraham's household, and God cares for them in the wilderness.","சாராளுக்கு ஈசாக்கு பிறக்கிறார். ஆகாரும் இஸ்மவேலும் வீட்டை விட்டு செல்கிறார்கள். வனாந்தரத்தில் அவர்களுக்கு உதவி கிடைக்கிறது."],["Abraham Is Tested","Abraham faces a difficult test involving Isaac. The story ends with Isaac spared and a substitute provided.","ஈசாக்கைப் பற்றிய ஒரு கடினமான சோதனையை ஆபிரகாம் சந்திக்கிறார். இறுதியில் ஈசாக்கு காப்பாற்றப்படுகிறார்."],["Sarah's Farewell","Sarah dies. Abraham buys land for a burial place, securing a family resting place.","சாராள் இறக்கிறார். அவரை அடக்கம் செய்ய ஆபிரகாம் ஒரு நிலத்தை வாங்குகிறார்."],["Isaac Meets Rebekah","Abraham's servant travels to find Isaac a wife. Rebekah agrees to join the family.","ஈசாக்குக்கு மனைவி தேடி ஆபிரகாமின் பணியாளர் பயணம் செய்கிறார். ரெபெக்காள் அந்தக் குடும்பத்துடன் செல்ல ஒப்புக்கொள்கிறார்."],["Esau and Jacob","Abraham dies. Isaac and Rebekah have twin sons, Esau and Jacob, whose choices affect their future.","ஆபிரகாம் இறக்கிறார். ஈசாக்குக்கும் ரெபெக்காளுக்கும் ஏசாவும் யாக்கோபும் என்ற இரட்டைப் பிள்ளைகள் பிறக்கிறார்கள். அவர்களின் முடிவுகள் வாழ்க்கையை மாற்றுகின்றன."],["Isaac's Wells","Isaac faces tension over land and water wells. He keeps moving until there is room for peace.","நிலமும் கிணறுகளும் காரணமாக ஈசாக்கு சிக்கல்களைச் சந்திக்கிறார். சண்டையைத் தவிர்த்து அமைதியாக வாழ இடம் தேடுகிறார்."],["The Blessing","Jacob receives the blessing intended for Esau through deception. The brothers are separated by anger.","ஏசாவுக்குக் கிடைக்க வேண்டிய ஆசீர்வாதத்தை யாக்கோபு ஏமாற்றி பெறுகிறார். கோபம் காரணமாக சகோதரர்கள் பிரிகிறார்கள்."],["Jacob's Dream","While travelling, Jacob dreams of a stairway between earth and heaven and receives a promise.","பயணத்தில் யாக்கோபு பூமியையும் வானத்தையும் இணைக்கும் படிக்கட்டைப் போல ஒரு கனவு காண்கிறார். அவருக்கு ஒரு வாக்குறுதி கிடைக்கிறது."],["Leah and Rachel","Jacob works for Laban and marries Leah and Rachel after complicated family arrangements.","யாக்கோபு லாபானிடம் வேலை செய்கிறார். குடும்ப ஏற்பாடுகளில் ஏற்பட்ட சிக்கல்களுக்குப் பிறகு லேயாளையும் ராகேலையும் மணக்கிறார்."],["Jacob's Growing Family","Children are born in Jacob's household. His flocks and wealth increase amid family disagreements.","யாக்கோபின் வீட்டில் குழந்தைகள் பிறக்கிறார்கள். கருத்து வேறுபாடுகள் இருந்தாலும் குடும்பமும் கால்நடைகளும் செல்வமும் பெருகுகின்றன."],["Jacob Leaves Laban","Jacob takes his family and leaves Laban. They meet again and agree to separate peacefully.","யாக்கோபு குடும்பத்துடன் லாபானை விட்டு செல்கிறார். பின்னர் இருவரும் சந்தித்து அமைதியாகப் பிரிய ஒப்புக்கொள்கிறார்கள்."],["A New Name","Jacob prepares to meet Esau, struggles through a remarkable night, and receives the name Israel.","ஏசாவை மீண்டும் சந்திக்க யாக்கோபு தயாராகிறார். ஒரு விசித்திரமான இரவுப் போராட்டத்துக்குப் பின் அவருக்கு இஸ்ரவேல் என்ற பெயர் கிடைக்கிறது."],["Brothers Meet Again","Jacob and Esau reunite after years apart. Fear gives way to a peaceful meeting.","பல ஆண்டுகளுக்குப் பிறகு யாக்கோபும் ஏசாவும் சந்திக்கிறார்கள். பயத்துடன் தொடங்கிய சந்திப்பு அமைதியாக முடிகிறது."],["Dinah and Her Brothers","Dinah is mistreated, and her brothers respond in a way that brings more harm to the community.","தீனாளுக்கு அநீதி நடக்கிறது. அதற்கு சகோதரர்கள் எடுத்த முடிவு மற்றவர்களுக்கும் பெரிய பாதிப்பை ஏற்படுத்துகிறது."],["Back to Bethel","Jacob returns to Bethel. Benjamin is born, Rachel dies, and later Isaac dies.","யாக்கோபு பெத்தேலுக்குத் திரும்புகிறார். பென்யமீன் பிறக்கிறார். ராகேல் இறக்கிறார். பின்னர் ஈசாக்கும் இறக்கிறார்."],["Esau's Descendants","The families descended from Esau are listed, showing another branch of the family tree.","ஏசாவின் சந்ததியினரை இந்த அத்தியாயம் அறிமுகப்படுத்துகிறது. குடும்ப மரத்தில் இன்னொரு கிளை வளர்கிறது."],["Joseph's Dreams","Joseph shares dreams about his future. His brothers become jealous and sell him away from home.","யோசேப்பு தன் கனவுகளைச் சொல்கிறார். சகோதரர்களின் பொறாமை அதிகரித்து, அவரை வீட்டிலிருந்து பிரித்துவிடுகிறார்கள்."],["Judah and Tamar","Judah's family story raises questions about fairness, promises and responsibility.","யூதாவும் தாமாரும் பற்றிய குடும்பக் கதை வருகிறது. வாக்குறுதி, நியாயம், பொறுப்பு ஆகியவை இதில் முக்கியமானவை."],["Joseph in Egypt","Joseph works responsibly in an Egyptian household. After an unjust accusation, he is sent to prison.","எகிப்தில் யோசேப்பு பொறுப்புடன் வேலை செய்கிறார். பொய்யான குற்றச்சாட்டால் சிறைக்குச் செல்ல நேர்கிறது."],["Dreams in Prison","Joseph interprets two fellow prisoners' dreams. One is restored to his position but initially forgets Joseph.","சிறையில் இருவரின் கனவுகளுக்கு யோசேப்பு விளக்கம் தருகிறார். ஒருவர் மீண்டும் பதவிக்கு வருகிறார்; ஆனால் யோசேப்பை முதலில் நினைவில் கொள்ளவில்லை."],["Joseph Before Pharaoh","Joseph explains Pharaoh's dreams and prepares Egypt for years of plenty followed by famine.","பார்வோனின் கனவுகளை யோசேப்பு விளக்குகிறார். நல்ல விளைச்சலுக்குப் பிறகு வரும் பஞ்சத்துக்கு எகிப்தைத் தயார் செய்கிறார்."],["The Brothers Arrive","Joseph's brothers come to Egypt looking for food. Joseph recognises them, but they do not recognise him.","உணவு தேடி யோசேப்பின் சகோதரர்கள் எகிப்துக்கு வருகிறார்கள். அவர்களை யோசேப்பு அடையாளம் காண்கிறார்; ஆனால் அவர்கள் அவரை அறியவில்லை."],["Benjamin Comes to Egypt","The brothers return with Benjamin. Joseph welcomes them while still keeping his identity hidden.","பென்யமீனை அழைத்துக்கொண்டு சகோதரர்கள் மீண்டும் வருகிறார்கள். யோசேப்பு அவர்களை வரவேற்கிறார்; தன் அடையாளத்தை இன்னும் சொல்லவில்லை."],["Judah Speaks for Benjamin","A test involving a silver cup leaves Benjamin in danger. Judah offers himself rather than abandoning his brother.","ஒரு வெள்ளிக் கிண்ணம் தொடர்பான சோதனையில் பென்யமீனுக்கு ஆபத்து வருகிறது. தம்பியை விட்டுவிடாமல் யூதா தானே பொறுப்பேற்க முன்வருகிறார்."],["Joseph Reveals Himself","Joseph tells his brothers who he is. He chooses reconciliation and asks them to bring their father.","தான் யோசேப்பு என்பதை அவர் சகோதரர்களிடம் சொல்கிறார். பழிவாங்காமல் உறவை மீண்டும் இணைக்கிறார்; தந்தையையும் அழைத்து வரச் சொல்கிறார்."],["Father and Son Reunite","Jacob travels to Egypt with his family and meets Joseph again after many years.","யாக்கோபு குடும்பத்துடன் எகிப்துக்குப் பயணம் செய்கிறார். பல ஆண்டுகளுக்குப் பிறகு மகன் யோசேப்பை மீண்டும் சந்திக்கிறார்."],["Life in Egypt","Joseph manages Egypt's food during famine. Jacob's family settles there.","பஞ்ச காலத்தில் எகிப்தின் உணவு விநியோகத்தை யோசேப்பு கவனிக்கிறார். யாக்கோபின் குடும்பம் அங்கே குடியேறுகிறது."],["Jacob Blesses Two Grandsons","Jacob blesses Joseph's sons, Ephraim and Manasseh, and remembers God's guidance.","யோசேப்பின் மகன்களான எபிராயீமையும் மனாசேயையும் யாக்கோபு ஆசீர்வதிக்கிறார். தன் வாழ்க்கைப் பயணத்தையும் நினைவுகூர்கிறார்."],["Words to the Sons","Jacob gathers his sons and speaks to each about the future. His life comes to an end.","யாக்கோபு மகன்களை அழைத்து ஒவ்வொருவரிடமும் எதிர்காலத்தைப் பற்றிப் பேசுகிறார். அவரது வாழ்க்கை முடிவுக்கு வருகிறது."],["Joseph's Final Words","Jacob is buried in his family's land. Joseph reassures his brothers and later dies in Egypt.","யாக்கோபு குடும்பத்தின் நிலத்தில் அடக்கம் செய்யப்படுகிறார். யோசேப்பு சகோதரர்களுக்கு நம்பிக்கை தருகிறார். பின்னர் எகிப்தில் அவரும் இறக்கிறார்."]];
let chapter=1,language='en',mode='story',isLoaded=false,requestId=0,autonext=true;
let tamilSpeaking=false,tamilPaused=false,tamilVersion=0,tamilUtterance=null,tamilVoice=null;
try{
 const value=JSON.parse(localStorage.getItem('hcGenesisProgressV1')||'null');
 if(value&&Number.isInteger(value.chapter)&&value.chapter>=1&&value.chapter<=50)chapter=value.chapter;
 if(value?.language==='ta')language='ta';
}catch(e){}
const audio=document.createElement('audio');audio.id='hcGenesisAudio';audio.preload='metadata';audio.playsInline=true;audio.hidden=true;document.body.appendChild(audio);
const root=document.createElement('section');
root.id='hcGenesisCard';root.setAttribute('aria-label','Genesis · Old Testament story');
root.innerHTML='<div class="hc-gen-top"><span>OLD TESTAMENT · GENESIS</span><b id="hcGenChapter">1 / 50</b></div>'+
 '<div class="hc-gen-now"><button type="button" id="hcGenPrevious" aria-label="Previous chapter">‹</button><div><strong id="hcGenTitle">Creation</strong><small id="hcGenChapterMeta">Chapter 1 · The beginning</small></div><button type="button" id="hcGenNext" aria-label="Next chapter">›</button></div>'+
 '<div class="hc-gen-language hc-gen-langtop"><button type="button" data-genlang="en">English</button><button type="button" data-genlang="ta">தமிழ்</button></div>'+
 '<div class="hc-gen-actions"><button id="hcGenPlay" type="button"><span id="hcGenIcon">▶</span><span id="hcGenPlayLabel">Listen to Genesis</span></button><button id="hcGenRead" type="button" aria-expanded="false">Read</button></div>'+
 '<button id="hcGenShortTamil" type="button" hidden>எளிய தமிழ்க் கதை · குரலில் கேளுங்கள்</button>'+
 '<div id="hcGenReading" hidden>'+
 '<div class="hc-gen-read-heading"><b id="hcGenReadMode">Story in everyday language</b><button id="hcGenOriginal" type="button">Full English verses</button></div>'+
 '<div id="hcGenReadText" class="hc-gen-text"></div><p id="hcGenReadNote"></p>'+
 '</div><div class="hc-gen-bottom"><button id="hcGenJoseph" type="button">Joseph’s story · Ch. 37</button><details><summary>50 chapters</summary><select id="hcGenSelect" aria-label="Choose Genesis chapter"></select></details></div>'+
 '<p id="hcGenStatus" role="status" aria-live="polite"></p>'+
 '<details class="hc-gen-sources"><summary>Audio credits</summary><small>English: World English Bible Updated, narrated by Basil Sands; public domain, eBible.org. Tamil: independent complete Genesis narration from Sermon-Online, distributed free for sharing. The optional simple Tamil story is an original short retelling spoken by the device; quality depends on its installed Tamil voice. Streaming requires internet. No music is mixed into the audio.</small></details>';
const target=document.getElementById('hcQuranFirst')||greeting;
target.insertAdjacentElement('afterend',root);
const css=[
 '#hcGenesisCard .hc-gen-langtop{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:9px 0}',
 '#hcGenesisCard .hc-gen-langtop button{width:100%;min-height:42px;display:grid;place-items:center}',
 '#hcGenesisCard .hc-gen-langtop button[aria-pressed=true]{background:#f5f6f2;color:#071e28;border-color:white;font-weight:750}',
 '#hcGenesisCard #hcGenStatus{max-width:100%;line-height:1.4}',
 '#hcGenesisCard #hcGenShortTamil{width:100%;min-height:40px;border:1px solid #496373;background:#173643;color:#edf4f5;border-radius:10px;margin:7px 0 0;font-size:12px}',
 '#hcGenesisCard #hcGenShortTamil[hidden]{display:none!important}',
 '#hcTamilMini[hidden]{display:none!important}',
 '#hcTamilMini{position:fixed;bottom:calc(88px + env(safe-area-inset-bottom,0px));z-index:113;left:50%;transform:translateX(-50%);max-width:430px;width:calc(100% - 28px);background:#0b2533;color:white;border:1px solid #718088;box-shadow:0 7px 24px rgba(0,0,0,.45);border-radius:17px;padding:10px 12px;display:flex;align-items:center;gap:9px}',
 '#hcTamilMini strong{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '#hcTamilMini button{height:42px;width:42px;flex:none;border-radius:12px;border:1px solid #5d717a;background:#1b3949;color:white;font-size:20px}',
 '#home #hcGenesisCard{margin:8px 0 14px;padding:12px 13px;border:1px solid rgba(214,232,239,.24);background:#0c2230;color:#f2f6f7;border-radius:18px}',
 '#hcGenesisCard button,#hcGenesisCard select{font:inherit;cursor:pointer}',
 '#hcGenesisCard .hc-gen-top,.hc-gen-now,.hc-gen-actions,.hc-gen-bottom,.hc-gen-language,.hc-gen-read-heading{display:flex;align-items:center;justify-content:space-between;gap:9px}',
 '#hcGenesisCard .hc-gen-top{font-size:10px;letter-spacing:.1em;color:#dec28f;font-weight:700}',
 '#hcGenesisCard #hcGenChapter{color:#b6cad2;font-size:11px;letter-spacing:0;font-weight:500}',
 '#hcGenesisCard .hc-gen-now{margin:13px 0 10px}',
 '#hcGenesisCard .hc-gen-now>button{width:40px;height:40px;flex:none;border:1px solid #496171;background:#143440;border-radius:12px;color:#fff;font-size:25px}',
 '#hcGenesisCard .hc-gen-now>div{flex:1;min-width:0;text-align:center}',
 '#hcGenesisCard #hcGenTitle{display:block;font-size:17px;line-height:1.3}',
 '#hcGenesisCard #hcGenChapterMeta{display:block;font-size:11px;color:#b4cad2;margin-top:4px}',
 '#hcGenesisCard .hc-gen-actions>button{min-height:46px;border-radius:12px}',
 '#hcGenesisCard #hcGenPlay{flex:1;border:0;background:#f4f5f2;color:#091c26;display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px;font-weight:700}',
 '#hcGenesisCard #hcGenIcon{font-size:19px}',
 '#hcGenesisCard #hcGenRead{width:76px;border:1px solid #59717b;background:#163340;color:#f2f4f5;font-size:13px}',
 '#hcGenesisCard #hcGenReading[hidden]{display:none!important}',
 '#hcGenesisCard #hcGenReading{border:1px solid #2d4c5b;margin-top:12px;padding:10px;border-radius:12px;background:#091b25}',
 '#hcGenesisCard .hc-gen-language{gap:7px;justify-content:flex-start}',
 '#hcGenesisCard .hc-gen-language button{min-height:37px;border-radius:9px;border:1px solid #536d76;color:#fff;background:#1b3a48;padding:5px 12px;font-size:12px}',
 '#hcGenesisCard .hc-gen-language button[aria-pressed=true]{background:#f5f6f2;color:#09222d;font-weight:700}',
 '#hcGenesisCard .hc-gen-read-heading{margin-top:12px;font-size:11px;gap:7px}',
 '#hcGenesisCard #hcGenOriginal{font-size:11px;color:#efdeb3;border:0;background:transparent;text-decoration:underline}',
 '#hcGenesisCard .hc-gen-text{font-size:15px;line-height:1.8;white-space:pre-wrap;max-height:250px;overflow-y:auto;margin-top:9px;color:#f0f4f5}',
 '#hcGenesisCard #hcGenReadNote{font-size:11px;color:#afc3c9;line-height:1.45;margin:9px 0 0}',
 '#hcGenesisCard .hc-gen-bottom{align-items:center;margin:10px 0 0}',
 '#hcGenesisCard #hcGenJoseph{border:1px solid #415b67;border-radius:10px;color:#deeff1;background:#132e3c;min-height:39px;padding:7px 11px;font-size:12px}',
 '#hcGenesisCard .hc-gen-bottom details{font-size:11px;color:#bdccd4;text-align:right}',
 '#hcGenesisCard .hc-gen-bottom summary{padding:10px 0;cursor:pointer}',
 '#hcGenesisCard #hcGenSelect{width:100%;min-width:150px;min-height:44px;border:1px solid #5a707e;border-radius:10px;background:#1d3a47;color:#fff;font-size:12px;padding:7px}',
 '#hcGenesisCard #hcGenStatus{font-size:11px;color:#b5c9d0;margin:9px 0 0}',
 '#hcGenesisCard #hcGenStatus:empty{display:none}',
 '#hcGenesisCard .hc-gen-sources{margin-top:6px;color:#9cb3be;font-size:11px;line-height:1.45}',
 '#hcGenesisCard .hc-gen-sources summary{cursor:pointer;font-size:11px;padding:6px 0}',
 '#hcGenesisCard .hc-gen-sources small{display:block;font-size:10px;line-height:1.5}'
].join('\n');
const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
const $=id=>document.getElementById(id);
const tamilMini=document.createElement('section');
tamilMini.id='hcTamilMini';tamilMini.hidden=true;tamilMini.setAttribute('aria-label','Genesis Tamil voice controls');
tamilMini.innerHTML='<strong id="hcTamilMiniTitle">Genesis · தமிழ் கதை</strong><button id="hcTamilMiniToggle" type="button" aria-label="Pause Tamil narration">Ⅱ</button><button id="hcTamilMiniClose" type="button" aria-label="Stop Tamil narration">×</button>';
document.body.appendChild(tamilMini);
const synth=('speechSynthesis' in window)?window.speechSynthesis:null;
function pickTamilVoice(){
 if(!synth)return null;
 const voices=synth.getVoices().filter(v=>/^ta(?:-|$)/i.test(v.lang||''));
 voices.sort((a,b)=>{const score=v=>(/natural|neural|google|premium|enhanced/i.test(v.name)?6:0)+(v.localService?1:0)+(/ta-(IN|LK)/i.test(v.lang)?2:0);return score(b)-score(a)});
 return voices[0]||null;
}
function updateTamilMini(){
 tamilMini.hidden=!tamilSpeaking;
 $('hcTamilMiniTitle').textContent='Genesis '+chapter+' · தமிழ் கதை';
 $('hcTamilMiniToggle').textContent=tamilPaused?'▶':'Ⅱ';
 $('hcTamilMiniToggle').setAttribute('aria-label',tamilPaused?'Resume Tamil narration':'Pause Tamil narration');
}
function stopTamil(){
 tamilVersion++;
 if(synth)try{synth.cancel()}catch(e){}
 tamilSpeaking=false;tamilPaused=false;tamilUtterance=null;
 updateTamilMini();
}
function startTamil(){
 if(!synth||typeof SpeechSynthesisUtterance!=='function'){
  $('hcGenStatus').textContent='Tamil voice is unavailable in this browser.';return;
 }
 tamilVoice=pickTamilVoice();
 if(!tamilVoice){
  $('hcGenStatus').textContent='Tamil voice not installed. Android Settings → Text-to-speech → install a Tamil voice. No charge.';
  return;
 }
 stopTamil();
 focusAudio();
 const ticket=++tamilVersion;
 const utterance=new SpeechSynthesisUtterance(stories[chapter-1][2]);
 tamilUtterance=utterance;
 utterance.lang=tamilVoice.lang;utterance.voice=tamilVoice;
 utterance.rate=0.9;utterance.pitch=1;utterance.volume=0.95;
 utterance.onstart=()=>{
  if(ticket!==tamilVersion)return;
  tamilSpeaking=true;tamilPaused=false;
  $('hcGenStatus').textContent='தமிழில் எளிய கதை · '+tamilVoice.name+' · இலவசம்';
  updateTamilMini();sync();
 };
 utterance.onerror=e=>{
  if(ticket!==tamilVersion||e.error==='canceled'||e.error==='interrupted')return;
  tamilSpeaking=false;updateTamilMini();
  $('hcGenStatus').textContent='Tamil voice could not play. Try another installed Tamil voice.';
  sync();
 };
 utterance.onend=()=>{
  if(ticket!==tamilVersion)return;
  tamilSpeaking=false;updateTamilMini();
  if(autonext&&chapter<50&&language==='ta'){
   chapter++;remember();sync();drawText();
   startTamil();
  }else {$('hcGenStatus').textContent='Tamil story finished.';sync();}
 };
 tamilSpeaking=true;tamilPaused=false;updateTamilMini();
 $('hcGenStatus').textContent='Tamil story narration · device voice (free)';
 synth.speak(utterance);sync();
}
function toggleTamil(){
 if(!synth){$('hcGenStatus').textContent='Tamil speech is unavailable on this device.';return;}
 if(tamilSpeaking){
  if(tamilPaused){try{synth.resume();tamilPaused=false}catch(e){}}
  else{try{synth.pause();tamilPaused=true}catch(e){}}
  updateTamilMini();sync();
 }else startTamil();
}
$('hcTamilMiniToggle').addEventListener('click',toggleTamil);
$('hcTamilMiniClose').addEventListener('click',()=>{stopTamil();sync();});
if(synth)synth.addEventListener?.('voiceschanged',()=>{tamilVoice=pickTamilVoice();});
for(let n=1;n<=50;n++){
 const opt=document.createElement('option');opt.value=String(n);opt.textContent=String(n).padStart(2,'0')+' · '+stories[n-1][0];$('hcGenSelect').appendChild(opt);
}
function remember(){try{localStorage.setItem('hcGenesisProgressV1',JSON.stringify({chapter,language}))}catch(e){}}
function url(n){
 if(language==='ta'){
  const code=String(n).padStart(3,'0');
  return 'https://info2.sermon-online.com/tamil/Bible/Tamil-Audio_Bible_Complete_OT_NT_MP3/01'+code+'-The_Book_Of_Genesis_Chapter-'+code+'.mp3';
 }
 return 'https://ebible.org/engwebu/mp3/02_GEN_'+String(n).padStart(2,'0')+'.mp3';
}
function sync(){
 $('hcGenChapter').textContent=chapter+' / 50';
 $('hcGenTitle').textContent=stories[chapter-1][0];
 $('hcGenChapterMeta').textContent='Chapter '+chapter+' · '+(chapter>=37?'Joseph and his family':'Genesis');
 $('hcGenSelect').value=String(chapter);
 const isActive=!audio.paused||(tamilSpeaking&&!tamilPaused);
 $('hcGenIcon').textContent=isActive?'Ⅱ':'▶';
 $('hcGenPlayLabel').textContent=!audio.paused?'Pause':audio.getAttribute('src')?'Resume':(language==='ta'?'தமிழில் முழு அதிகாரம் கேளுங்கள்':'Listen in English');
 $('hcGenPlay').setAttribute('aria-pressed',String(isActive));
 $('hcGenShortTamil').hidden=language!=='ta';
 $('hcGenShortTamil').textContent=tamilSpeaking?(tamilPaused?'எளிய தமிழ்க் கதை · தொடரவும்':'எளிய தமிழ்க் கதை · நிறுத்து'):'எளிய தமிழ்க் கதை · குரலில் கேளுங்கள்';
 root.querySelectorAll('[data-genlang]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.genlang===language)));
}
function stop(clear=false){
 stopTamil();requestId++;audio.pause();
 if(clear){audio.removeAttribute('src');audio.load();}
 sync();if(typeof renderGlobalMini==='function')renderGlobalMini();
}
window.hcStopGenesis=()=>{stop(true);$('hcGenStatus').textContent='Stopped.'};

/* Restore an interrupted chapter paused. No audio automatically starts. */
window.hcGenesisPlaybackSnapshot=()=>{
 if(!isLoaded||!audio.getAttribute('src'))return null;
 return {chapter,language,seconds:Math.max(0,Number(audio.currentTime)||0)};
};
window.hcGenesisRestorePaused=saved=>{
 const n=Number(saved?.chapter),l=saved?.language;
 if(!Number.isInteger(n)||n<1||n>50||!['en','ta'].includes(l))return false;
 const t=Math.max(0,Number(saved.seconds)||0);
 stop(true);chapter=n;language=l;mode='story';isLoaded=true;
 audio.src=url(chapter);audio.preload='metadata';audio.load();
 audio.volume=1;audio.playbackRate=.97;
 if(typeof hcSeekRestored==='function')hcSeekRestored(audio,t,sync);
 remember();sync();drawText();mediaSession();
 $('hcGenStatus').textContent='Chapter restored. Tap Play to continue.';
 if(typeof hcMiniPinnedKey!=='undefined')hcMiniPinnedKey='genesis';
 try{localStorage.setItem('heartclearActiveMedia','genesis')}catch(e){}
 if(typeof renderGlobalMini==='function')renderGlobalMini();
 return true;
};

function focusAudio(){
 if(typeof hcStopQuranMeaning==='function')hcStopQuranMeaning();
 if(typeof hcStopCompactDriveAudio==='function')hcStopCompactDriveAudio();
 if(typeof hcStopDriveVideo==='function')hcStopDriveVideo(true);
 if(typeof hcMixRunning!=='undefined'&&hcMixRunning&&typeof hcMixStop==='function')hcMixStop(false);
 document.querySelectorAll('audio,video').forEach(el=>{if(el!==audio&&!el.paused)el.pause()});
}
function mediaSession(){
 if(!('mediaSession' in navigator)||typeof MediaMetadata==='undefined')return;
 try{
 navigator.mediaSession.metadata=new MediaMetadata({title:'Genesis '+chapter+' · '+stories[chapter-1][0],artist:language==='ta'?'Sermon-Online · Tamil Audio Bible':'Basil Sands · Public-domain recording',album:language==='ta'?'ஆதியாகமம் · முழு அதிகாரம்':'Old Testament · Genesis'});
 navigator.mediaSession.setActionHandler('play',()=>audio.play().catch(()=>{}));
 navigator.mediaSession.setActionHandler('pause',()=>audio.pause());
 navigator.mediaSession.setActionHandler('nexttrack',()=>window.hcGenesisStep(1));
 navigator.mediaSession.setActionHandler('previoustrack',()=>window.hcGenesisStep(-1));
 }catch(e){}
}
function loadChapterAndPlay(){
 stopTamil();focusAudio();requestId++;
 audio.src=url(chapter);audio.load();audio.volume=1;audio.playbackRate=0.97;isLoaded=true;
 remember();mediaSession();$('hcGenStatus').textContent='Loading Genesis '+chapter+'…';
 const token=requestId;
 audio.play().then(()=>{if(token===requestId){$('hcGenStatus').textContent=language==='ta'?'தமிழ் வேதாகமம் · முழு அதிகாரம் · Sermon-Online':'English Bible · Basil Sands';hcMiniPinnedKey='genesis';renderGlobalMini();sync();}})
 .catch(()=>{if(token===requestId){$('hcGenStatus').textContent='Could not play. Check connection or tap Play again.';sync();}});
}
function toggle(){
 if(tamilSpeaking)stopTamil();
 if(audio.getAttribute('src')&&isLoaded){
  if(audio.paused){focusAudio();audio.play().catch(()=>{$('hcGenStatus').textContent='Audio unavailable. Check internet.'});}
  else audio.pause();
 }else loadChapterAndPlay();
 sync();
}
window.hcGenesisStep=delta=>{
 const next=chapter+Number(delta);if(next<1||next>50)return;
 const wasPlaying=!audio.paused||tamilSpeaking&&!tamilPaused;
 const oldSimple=tamilSpeaking;
 stop(true);chapter=next;isLoaded=false;remember();sync();drawText();
 if(wasPlaying){if(oldSimple)startTamil();else loadChapterAndPlay();}
};
async function loadEnglishVerses(n,token){
 const box=$('hcGenReadText');box.textContent='Loading original English verses…';
 try{
  const response=await fetch('https://bible-api.com/genesis+'+n+'?translation=web',{headers:{Accept:'application/json'}});
  if(!response.ok)throw Error('Source unavailable');
  const result=await response.json();
  if(token!==requestId||mode!=='verses'||chapter!==n)return;
  const verses=Array.isArray(result.verses)?result.verses:[];
  if(!verses.length)throw Error('No verses returned');
  box.textContent=verses.map(v=>String(v.verse)+'  '+String(v.text||'').trim()).join('\n\n');
  $('hcGenReadNote').textContent='Original English verses: World English Bible Classic, public domain. Audio uses the Updated edition; wording can differ slightly. This is Bible text, not our retelling.';
 }catch(e){if(token===requestId&&mode==='verses'&&chapter===n){box.textContent='Original verses could not load. You can still listen or read the story.';$('hcGenReadNote').textContent='Source: bible-api.com (World English Bible).';}}
}
function drawText(){
 if($('hcGenReading').hidden)return;
 $('hcGenReadMode').textContent=mode==='story'?'The story · simple '+(language==='ta'?'Tamil':'English'):'Original English verses';
 $('hcGenOriginal').textContent=mode==='story'?'Full English verses':'Simple story';
 if(mode==='verses'){const token=requestId;loadEnglishVerses(chapter,token);return;}
 $('hcGenReadText').textContent=stories[chapter-1][language==='ta'?2:1];
 $('hcGenReadNote').textContent=language==='ta'?'இது அத்தியாயத்தின் சுருக்கமான, எளிய தமிழ்க் கதை. நேரடி பைபிள் வசன மொழிபெயர்ப்பு அல்ல. முழு தமிழ் அதிகாரத்தின் குரல் தனியாகக் கேட்கலாம்.':'Original short story summary. This is an editorial retelling, not the biblical text. Choose Full English verses for the original source.';
}
audio.addEventListener('playing',()=>{$('hcGenStatus').textContent='Playing · '+(language==='ta'?'Tamil full chapter':'English original');hcMiniPinnedKey='genesis';sync();renderGlobalMini()});
audio.addEventListener('pause',()=>{if(isLoaded&&audio.getAttribute('src')&&!audio.ended)$('hcGenStatus').textContent='Paused · '+(language==='ta'?'Tamil full chapter':'English original');sync();renderGlobalMini()});
audio.addEventListener('ended',()=>{if(autonext&&chapter<50){stop(true);chapter++;isLoaded=false;remember();sync();drawText();loadChapterAndPlay();}else {$('hcGenStatus').textContent='Chapter complete.';sync()}});
audio.addEventListener('error',()=>{$('hcGenStatus').textContent=language==='ta'?'Tamil recording unavailable. Try the simple Tamil story voice.':'English chapter audio unavailable. Check internet.'});
audio.addEventListener('waiting',()=>{$('hcGenStatus').textContent='Buffering…'});
audio.addEventListener('timeupdate',()=>{if(Math.floor(audio.currentTime)%10===0)remember()});
if(typeof attachGlobalMiniEvents==='function')attachGlobalMiniEvents(audio,'genesis');
document.addEventListener('play',e=>{
 if(e.target!==audio&&e.target instanceof HTMLMediaElement){
  if(!audio.paused)audio.pause();
  if(tamilSpeaking)stopTamil();
 }
},true);
$('hcGenPlay').addEventListener('click',toggle);
$('hcGenShortTamil').addEventListener('click',()=>{
 if(!audio.paused)audio.pause();
 toggleTamil();
});
$('hcGenRead').addEventListener('click',()=>{
 const opened=$('hcGenReading').hidden;$('hcGenReading').hidden=!opened;
 $('hcGenRead').setAttribute('aria-expanded',String(opened));
 if(opened)drawText();
});
root.querySelectorAll('[data-genlang]').forEach(btn=>btn.addEventListener('click',()=>{
 if(language!==btn.dataset.genlang){
  stop(true);isLoaded=false;
  language=btn.dataset.genlang;mode='story';remember();
  $('hcGenStatus').textContent=language==='ta'?'தமிழ் · மனிதர் வாசித்த முழு அதிகாரம். கீழே எளிய கதையும் உண்டு.':'English · Human narration by Basil Sands.';
 }
 sync();drawText();
}));
$('hcGenOriginal').addEventListener('click',()=>{mode=mode==='story'?'verses':'story';drawText();});
$('hcGenPrevious').addEventListener('click',()=>window.hcGenesisStep(-1));
$('hcGenNext').addEventListener('click',()=>window.hcGenesisStep(1));
$('hcGenJoseph').addEventListener('click',()=>{stop(true);chapter=37;isLoaded=false;remember();sync();$('hcGenReading').hidden=false;$('hcGenRead').setAttribute('aria-expanded','true');mode='story';drawText();});
$('hcGenSelect').addEventListener('change',()=>{const v=Number($('hcGenSelect').value);if(v>=1&&v<=50){stop(true);chapter=v;isLoaded=false;remember();sync();drawText();$('hcGenSelect').closest('details').open=false;}});
sync();
// The Home shell restores before these deferred scripts have created their players.
// Run the same paused-state restoration once both Qur'an and Genesis are ready.
queueMicrotask(()=>{
 try{
  const saved=JSON.parse(localStorage.getItem('heartclearReturnStateV1')||'null');
  if(saved?.screen==='home'&&['genesis','quran-meaning'].includes(saved.kind)
    &&typeof window.hcRestorePreviousScreen==='function')
    window.hcRestorePreviousScreen();
 }catch(e){}
});
})();