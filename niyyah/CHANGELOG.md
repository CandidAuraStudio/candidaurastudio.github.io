# NIYYAH — Change log

## Version 1.0.0 — Phase 1 functional foundation

### Added
- Entirely separate mobile-first PWA under `/niyyah/` with no dependency on HeartClear, Human Atlas, Inner Voice or Story Engine.
- Midnight-blue, warm-light visual theme with abstract nonfigurative awareness imagery, responsive desktop sidebar/mobile navigation and reduced-motion CSS.
- Complete English / natural Sri Lankan Tamil / bilingual reading modes, including persistent language setting.
- Qur'anic study reader with **22 numbered verses**: Al-Fatiha (7), Al-Ikhlas (4), Al-Falaq (5) and An-Nas (6).
- Arabic text checked against **Quran.com**, with transliteration marked as a rough learning aid, and **original meaning-oriented English and Tamil renderings** clearly distinguished from Arabic scripture.
- Distinct personal reflection question for each chapter, plus cited Qur'an 50:16 and 42:11 teaching on divine nearness and incomparability.
- Niyyah and ego lesson cards and evidence-limited scientific explanations with external research links.
- Daily reflective question; optional 3-, 5-, 7- and 10-minute five-stage practice timer, including pause/reset and comfortable breathing instruction.
- Private journal (add, list, delete, JSON export, JSON import/merge), local by default and requiring no account.
- Optional completed-session count with opt-in OFF by default. Turning it off clears the stored count.
- Scoped offline service worker, manifest, NIYYAH-only cache, icon and NIYYAH-specific localStorage keys.

### Verified in code and simulated interactions
- The four chapter numbers and totals add to 22; all have Arabic text, references, transliteration and both study meanings.
- JavaScript syntax for the application, verse/lesson modules and service worker.
- Main navigation and pages, EN → தமிழ் → bilingual switching, and persistence of language preference.
- Journal create, export, merge on import without duplicating an existing ID, and delete.
- Practice timer starts, counts down, pauses, resets, and keeps completion history disabled until explicitly opted into.
- Service-worker scope and cache prefix are limited to `/niyyah/`.
- GitHub versions of all four existing app entry files were checked against the beginning-of-task baselines and unchanged.

### Not implemented — future phases
- In-app Arabic recitation, verified reciter credits/licence validation, offline licensed recordings, built-in audio player, seek/volume/restart/resume/background playback.
- Tamil/English recorded spoken lessons and personal voice recording.
- Optional named profiles, synchronization, advanced journeys, traditions beyond current Qur'anic focus and richer progress analytics.
- Actual physical Android/iPhone/desktop rendering and offline-install testing, expert Tamil editorial sign-off and qualified recitation/tajwid review.

### Privacy and editorial note
Source links to Quran.com open only when selected. No Arabic synthesis, copyrighted recordings, paid AI APIs, hidden audio playback, public journal sharing, compulsory tracking, restrictive food or fasting advice, medical claims or physical depictions of the divine.

The English and Tamil Qur'anic explanations are original educational paraphrases, not certified translations. Theatrical or introspective metaphors are never presented as literal definitions of Allah, or as neuroscientific proof of doctrine.

The future optional HeartClear link to NIYYAH has **not** been added. Waiting for user testing and review.


## 2026-10-14 — Version 1.1: parallel foundation

- Published all 37 Juz Amma chapters, **564 numbered Arabic verses**, with verified surah counts and unchanged Tanzil-attributed source text.
- Added fully bilingual chapter titles, a search field, exact verse-number display, initial English/Tamil meaning drafts for 15 new verses, and prominent review-pending labels where the meanings are not ready.
- Added a separate `#/baqarah` reading space with Arabic 2:1–20; explanatory drafts for 2:1–5; a cautious *Alif Lam Mim* linguistic note; and a clearly identified draft personal question for *muttaqin*. No invented reflections for 2:6–20.
- Kept Al-Fatiha and existing 112–114 meaning readers intact.
- Extended the isolated offline cache; preserved language, preferences and journal keys.
- Automated source checks: 37 surahs, 564 verses, expected verse counts, sequential references, 20 Baqarah opening verses, bilingual text availability, JavaScript syntax and simulated navigation/reader/search/journal/timer behavior.
- **Pending:** per-verse English/Tamil drafts for 549 remaining new Juz Amma verses, user reflection review, Arabic/Tamil editorial review, device QA, licensed in-app audio and phase-2 sound functions.
- **No HeartClear master-hub edit yet.** Independent-app link locations are planned for a later update, after user approval of the tested NIYYAH experience.

Source/permission: Tanzil Quran Text, Uthmani, CC BY 3.0, https://tanzil.net ; intermediate distribution https://github.com/semarketir/quranjson .


## 2026-10-14 — Version 1.2: Reading and reflection improvements

**New:** full 286-verse Arabic Al-Baqarah; modern original English/Tamil meanings for 2:1–20, 2:144 and 2:170; a 20-verse mobile reader with navigation and thematic shortcuts; dedicated separate provenance-labelled Akmal reflection sections for 2:2, 2:144 and 2:170; added lexical context and sensitive disability-metaphor interpretation warnings.

**Clearly incomplete:** 264 Baqarah verses still lack app-hosted English/Tamil explanatory drafts. Akmal's reflection on other verses is not inferred or attributed without his words. Reflections currently shown as summaries should be reviewed by Akmal before being treated as final public teaching.

**Unchanged:** HeartClear, HUMAN ATLAS, INNER VOICE, STORY ENGINE; NIYYAH language and journal keys; core practice timer; 37 Juz Amma chapters. No audio has been downloaded or synthesized.

**Source:** Tanzil Quran Text (Uthmani), CC BY 3.0, https://tanzil.net ; https://tanzil.net/docs/Text_License .
