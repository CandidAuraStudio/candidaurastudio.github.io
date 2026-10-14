/* NIYYAH 1.1 — bilingual sacred library and Al-Baqarah opening study.
   Arabic text in external, unchanged scripts; these interface strings are not Qur'anic text.
   No user data collected; requires the existing NIYYAH app context to render. */
window.NIYYAH_LIBRARY_UI=(function(){
"use strict";
const getCollections=ctx=>{
 const originals=ctx.chapters||[];
 const added=ctx.juz||[];
 const juz=added.map(raw=>{
  const prior=originals.find(v=>v.number===raw.number);
  return prior?{...raw,...prior,bismillah:raw.bismillah}:raw;
 }).sort((a,b)=>a.number-b.number);
 const fatiha=originals.find(c=>c.number===1);
 return {juz,all:[...(fatiha?[fatiha]:[]),...juz],fatiha};
};
function chapterCard(ch,c){
 const {E,B,line}=c;
 const done=ch.verses.filter(v=>v.meaning?.en&&v.meaning?.ta).length;
 const pct=done===ch.verses.length
  ?line("Meanings available for every verse","எல்லா வசனங்களுக்கும் பொருள் உள்ளது")
  :line(done+" meanings ready · "+(ch.verses.length-done)+" pending",done+" பொருள்கள் தயாராக உள்ளன · "+(ch.verses.length-done)+" பின்னர்");
 const sub=ch.theme?B(ch.theme):line("Complete Arabic reading","முழு அரபு வசனங்களை வாசிக்கலாம்");
 return '<a href="#/chapter/'+E(ch.id)+'" class="chapter-card" data-surah-entry data-search="'+E((ch.name.en+" "+ch.name.ta+" "+ch.number).toLowerCase())+'"><div class="number">'+ch.number+' / QUR’AN</div><h3>'+B(ch.name)+'</h3><p>'+sub+'</p><div class="verse-count">'+ch.verses.length+" "+line("verses","வசனங்கள்")+" · "+pct+' ↗</div></a>';
}
function library(c){
 const {juz,fatiha}=getCollections(c);
 const {B,line,header,nearness}=c;
 if(!fatiha||juz.length!==37) return '<section class="note">The library is still loading. Please refresh the app.</section>';
 return header({en:"SACRED WISDOM · THE EXPANDING LIBRARY",ta:"இறை ஞானம் · விரிவடையும் நூலகம்"},
 {en:"Words. Meaning. Self-examination.",ta:"வசனங்கள். பொருள். சுய ஆராய்ச்சி."},
 {en:"Read Al-Fatiha, the complete Arabic text of Juz Amma (37 chapters), and the opening of Al-Baqarah. Meaning-based English and Tamil explanations are being added in reviewed stages.",ta:"அல்-ஃபாத்திஹா, ஜுஸ் அம்மாவின் 37 அத்தியாயங்களின் முழு அரபு வசனங்கள், அல்-பகராவின் தொடக்கம் ஆகியவற்றை வாசிக்கலாம். ஆங்கில, தமிழ் பொருள் விளக்கங்கள் சரிபார்க்கப்பட்டு படிப்படியாகச் சேர்க்கப்படுகின்றன."})+
 '<div class="library-feature-grid">'+
 '<a class="library-feature" href="#/chapter/'+fatiha.id+'"><span class="eyebrow">01 · '+line("THE OPENING","தொடக்கம்")+'</span><h2>'+B(fatiha.name)+'</h2><p>'+line("Seven verses, English and Tamil meaning, and personal reflection.","ஏழு வசனங்கள், ஆங்கில-தமிழ் பொருள் மற்றும் சிந்தனை.")+'</p><span>↗</span></a>'+
 '<a class="library-feature" href="#/baqarah"><span class="eyebrow">02 · '+line("DEEP STUDY IN PREPARATION","ஆழமான ஆய்வுப் பாடம் தயாராகிறது")+'</span><h2>'+line("Al-Baqarah · 2:1–20","அல்-பகரா · 2:1–20")+'</h2><p>'+line("Alif Lam Mim and muttaqin: a question of guidance and how we live.","அலிஃப் லாம் மீம், முத்தகீன்: வழிகாட்டலும் நம் வாழ்க்கையும்.")+'</p><span>↗</span></a></div>'+
 '<section class="section" id="juz-amma"><div class="section-head"><div><div class="eyebrow">JUZ 30 · 78–114</div><h2>'+line("Juz Amma · all 37 chapters","ஜுஸ் அம்மா · 37 அத்தியாயங்கள்")+'</h2></div></div>'+
 '<div class="library-search-wrap"><label for="surah-search">'+line("Search by surah name or number","அத்தியாயத்தின் பெயர் அல்லது எண் மூலம் தேடுங்கள்")+'</label><input id="surah-search" type="search" autocomplete="off" placeholder="'+(c.lang==="ta"?"அத்தியாயம் அல்லது எண்…":"Surah name or number…")+'"><small id="chapter-result-count">'+juz.length+" "+line("chapters","அத்தியாயங்கள்")+'</small></div>'+
 '<div id="juz-chapter-grid" class="chapter-grid">'+juz.map(v=>chapterCard(v,c)).join("")+'</div></section>'+
 '<div class="note"><div class="eyebrow">'+line("TEXT AND TRANSLATION STATUS","மூல உரையும் பொருள் விளக்க நிலையும்")+'</div><h3>'+line("Never confuse the scripture with our explanation.","வசனத்தையும் மனித விளக்கத்தையும் ஒன்றாகக் கருதாதீர்கள்.")+'</h3><p>'+line("The complete Arabic Juz Amma text is included without altering the source. Only prepared English/Tamil meanings appear; remaining verses are openly marked as awaiting review. Personal reflections and word studies are separate from scripture.","ஜுஸ் அம்மாவின் முழு அரபு வசனங்கள் மாற்றமின்றிச் சேர்க்கப்பட்டுள்ளன. தயாரிக்கப்பட்ட இடங்களில் மட்டும் ஆங்கில, தமிழ் பொருள்கள் காட்டப்படும்; மீதமுள்ளவை சரிபார்ப்புக்காகக் காத்திருக்கின்றன. தனிப்பட்ட சிந்தனைகளும் சொல் ஆராய்ச்சியும் வசனத்திலிருந்து தனியாகக் காட்டப்படும்.")+'</p>'+
 '<small>'+line("Arabic: Tanzil Quran Text (Uthmani), CC BY 3.0, distributed via semarketir/quranjson. No Arabic text has been edited.","அரபு: தன்ஸீல் குர்ஆன் உரை (உஸ்மானி), CC BY 3.0; semarketir/quranjson வழியாகப் பெறப்பட்டது. அரபு உரை மாற்றப்படவில்லை.")+
 ' <a href="https://tanzil.net" target="_blank" rel="noopener noreferrer">Tanzil ↗</a> · <a href="https://tanzil.net/docs/Text_License" target="_blank" rel="noopener noreferrer">Licence ↗</a></small></div>'+nearness();
}
function meaningCard(v,c){
 const {line,B}=c;
 if(v.meaning?.en&&v.meaning?.ta)return '<div class="verse-meaning"><div class="sub-label">'+line("ORIGINAL MEANING-BASED EXPLANATION · NOT CERTIFIED TRANSLATION","சொந்த கருத்து விளக்கம் · அதிகாரப்பூர்வ மொழிபெயர்ப்பு அல்ல")+'</div>'+B(v.meaning)+'</div>';
 const link="https://quran.com/"+v.ref.replace(":","/");
 return '<div class="verse-meaning meaning-pending"><div class="sub-label">'+line("ENGLISH/TAMIL MEANING NOT YET REVIEWED","ஆங்கில/தமிழ் பொருள் இன்னும் சரிபார்க்கப்படவில்லை")+'</div><p>'+line("Read the Arabic now. A careful meaning-based explanation will be added later.","இப்போது அரபு வசனத்தை வாசிக்கலாம். கவனமாக ஆராய்ந்த பொருள் விளக்கம் பின்னர் சேர்க்கப்படும்.")+'</p><a target="_blank" rel="noopener noreferrer" href="'+link+'">'+line("Check explanations at Quran.com","Quran.com இல் விளக்கங்களைப் படிக்கவும்")+' ↗</a></div>';
}
function verseCard(v,c){
 const {E,line,B,prefs}=c;
 return '<article class="verse"><div class="verse-head"><span class="verse-ref">'+E(v.ref)+'</span><span class="script-label">'+line("QUR’ANIC ARABIC","குர்ஆன் அரபு")+'</span></div>'+
 '<p class="arabic" dir="rtl" lang="ar">'+E(v.arabic)+'</p>'+
 (prefs.showLatin&&v.transliteration?'<p class="translit">'+line("Approximate transliteration:","தோராயமான ஒலிபெயர்ப்பு:")+' '+E(v.transliteration)+'</p>':"")+
 meaningCard(v,c)+'</article>';
}
function chapter(id,c){
 const {all}=getCollections(c);
 const ch=all.find(x=>x.id===id);if(!ch)return library(c);
 const {E,B,line,button}=c;
 const count=ch.verses.filter(v=>v.meaning?.en&&v.meaning?.ta).length;
 return '<div class="chapter-top"><a href="#/wisdom" class="small-link">← '+line("Sacred Wisdom","இறை ஞானம்")+'</a><div class="eyebrow" style="margin-top:19px">'+line("QUR’AN · CHAPTER","குர்ஆன் · அத்தியாயம்")+' '+ch.number+'</div><h1>'+B(ch.name)+'</h1><p>'+(ch.theme?B(ch.theme):line("Read the complete Arabic chapter.","முழு அரபு அத்தியாயத்தையும் வாசியுங்கள்."))+'</p></div>'+
 '<div class="source-strip"><p>'+ch.verses.length+' '+line("numbered verses","வசனங்கள்")+' · '+count+' '+line("English/Tamil meanings prepared","ஆங்கில/தமிழ் பொருள்கள் தயாராக உள்ளன")+'</p><a href="'+ch.source+'" target="_blank" rel="noopener noreferrer">'+line("External source / recitation","வெளி மூலம் / ஓதல்")+' ↗</a></div>'+
 '<label class="switch-row"><input type="checkbox" id="latin-switch" '+(c.prefs.showLatin?"checked":"")+'><span>'+line("Show transliteration when available","கிடைக்கும் இடங்களில் ஒலிபெயர்ப்பைக் காட்டுங்கள்")+'</span></label>'+
 (ch.bismillah?'<div class="basmala-panel"><p class="arabic" dir="rtl" lang="ar">'+E(ch.bismillah)+'</p><small>'+line("Opening invocation, not a numbered verse of this surah.","தொடக்க இறைநினைவு; இந்த அத்தியாயத்தின் எண்ணப்பட்ட வசனம் அல்ல.")+'</small></div>':"")+
 '<section class="verse-list" style="margin-top:21px" aria-label="Qur’anic verses">'+ch.verses.map(v=>verseCard(v,c)).join("")+'</section>'+
 '<div class="note"><div class="eyebrow">'+line("CONTEMPLATION · NOT SCRIPTURE","சிந்தனை · வசனம் அல்ல")+'</div><h3>'+line("Consider the meaning before responding","பதிலளிக்கும் முன் பொருளைச் சிந்தியுங்கள்")+'</h3><p>'+(ch.reflection?B(ch.reflection):line("We have not authored a personal reflection for this chapter yet. Its meaning deserves careful discussion.","இந்த அத்தியாயத்திற்கான தனிப்பட்ட சிந்தனை இன்னும் எழுதப்படவில்லை. அதன் பொருளை கவனமாகக் கலந்துரையாடுவோம்."))+'</p><div class="actions" style="margin-top:17px">'+button("#/journal","Write privately","தனியாக எழுதுங்கள்",true)+button("#/wisdom","Other surahs","மற்ற அத்தியாயங்கள்")+'</div>'+
 '<small>'+line("Arabic is reproduced verbatim under source terms. Educational meanings are labelled separately. Verified recitation audio has not been copied into NIYYAH.","அரபு வசனங்கள் உரிம விதிகளுக்கு உட்பட்டு மாற்றமின்றிக் காட்டப்படுகின்றன. கல்விக்கான பொருள் விளக்கங்கள் தனியாகக் காட்டப்படுகின்றன. சரிபார்க்கப்பட்ட ஓதல் ஒலி NIYYAH-இல் இன்னும் சேர்க்கப்படவில்லை.")+'</small></div>';
}
function baqarah(c){
 const p=c.baqarah;if(!p)return library(c);
 const {header,line,B,E,button}=c;
 const intro=header({en:"AL-BAQARAH · THE OPENING",ta:"அல்-பகரா · தொடக்கம்"},
 {en:"Alif Lam Mim. Guidance and self-examination.",ta:"அலிஃப் லாம் மீம். வழிகாட்டலும் சுய ஆராய்ச்சியும்."},
 {en:"The first 20 Arabic verses of a 286-verse chapter are ready for reading. Study meanings for 2:1–5 are introductory drafts. Your longer reflections will be discussed and reviewed, not invented.",ta:"286 வசனங்கள் கொண்ட அத்தியாயத்தின் முதல் 20 அரபு வசனங்கள் வாசிப்புக்குத் தயாராக உள்ளன. 2:1–5 கருத்துப் பொருள் தொடக்க வரைவு மட்டுமே. உங்கள் ஆழமான சிந்தனைகள் கலந்துரையாடப்பட்ட பின்னரே சேர்க்கப்படும்."});
 const groups='<div class="baqarah-sections">'+p.sections.map(item=>'<div class="study-section"><div class="eyebrow">'+E(item.range)+'</div><h3>'+line(item.en,item.ta)+'</h3><p>'+line("Reflections under discussion","சிந்தனை விளக்கங்கள் கலந்துரையாடலுக்காக உள்ளன")+'</p></div>').join("")+'</div>';
 const notes='<div class="lesson-list baqarah-notes">'+p.panels.map(item=>
 '<article class="lesson-card"><div class="eyebrow">'+E(item.ref)+' · '+line(item.type==="linguistic note"?"LINGUISTIC NOTE":"PERSONAL REFLECTION DRAFT","மொழிக் குறிப்பு / தனிப்பட்ட சிந்தனை வரைவு")+'</div><p class="term-arabic" dir="rtl" lang="ar">'+E(item.ar)+'</p><h3>'+line(item.en,item.ta)+'</h3><p>'+B(item.note)+'</p></article>').join("")+'</div>';
 return intro+'<div class="source-strip"><p>'+line("20 / 286 Arabic verses · explanatory drafts for 1–5","286 இல் 20 அரபு வசனங்கள் · 1–5 கருத்துப் பொருள் வரைவு")+'</p><a href="'+p.source+'" target="_blank" rel="noopener noreferrer">Quran.com · 2 ↗</a></div>'+groups+notes+
 '<div class="note"><p>'+line("Readers may ask how the word muttaqin challenges their own actions. That personal question does not claim the Arabic word literally means 'you' or erase its established relationship to taqwa.","'முத்தகீன்' என்ற சொல் தன் செயல்களுடன் எப்படித் தொடர்புபடுகிறது என வாசகர் கேட்கலாம். அதனால் அந்த அரபுச் சொல்லுக்கு நேரடியாக 'நீ' என்று பொருள் கூறப்படவில்லை; தக்வாவுடனான தொடர்பும் மாற்றப்படவில்லை.")+'</p></div>'+
 '<section class="section"><h2>'+line("The first twenty verses","முதல் இருபது வசனங்கள்")+'</h2><div class="verse-list">'+p.verses.map(v=>verseCard(v,c)).join("")+'</div></section>'+
 '<div class="note"><p>'+line("The 286-verse chapter is not yet fully integrated. We will study more carefully with linguistic context, classical views, English/Tamil lessons and your approved personal reflections.","286 வசனங்களும் இன்னும் சேர்க்கப்படவில்லை. அரபுச் சொற்கள், பாரம்பரிய விளக்கங்கள், ஆங்கில/தமிழ் பாடங்கள், நீங்கள் ஏற்றுக்கொண்ட தனிப்பட்ட சிந்தனைகள் ஆகியவற்றை பின்னர் கவனமாக ஆராய்வோம்.")+'</p>'+button("#/journal","Write a private thought","தனியாகக் குறிப்பெழுதுங்கள்",true)+'</div>';
}
function filter(q,c){
 const search=String(q||"").trim().toLowerCase();
 let shown=0;
 document.querySelectorAll("[data-surah-entry]").forEach(item=>{const ok=(item.dataset.search||"").includes(search);item.hidden=!ok;if(ok)shown++;});
 const el=document.getElementById("chapter-result-count");
 if(el)el.textContent=shown+" "+(c.lang==="ta"?"அத்தியாயங்கள்":"chapters");
}
return {library,chapter,baqarah,filter};
})();
