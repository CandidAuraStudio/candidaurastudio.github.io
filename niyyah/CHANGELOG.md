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
