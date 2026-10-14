# NIYYAH — The Inner Science of Intention
Phase 1 v1.0.0 · Independent Progressive Web App

URL: https://candidaurastudio.github.io/niyyah/

## Intent
Contemplative exploration of intention, observing thoughts, the nafs, compassion, Qur'anic reflection, attention and compassionate everyday actions. Not a standard Qur'an reader or prayer scheduling app, and not a copy of HeartClear.

## Phase 1 implementation
- Fully original midnight-blue and warm-light mobile-first design, with desktop sidebar, accessible bottom nav, reduced-motion CSS and 3 reading modes: English, natural Sri Lankan Tamil, and English + Tamil.
- Language choice persists only in this app, under localStorage key `niyyah:language:v1`.
- Four short study chapters: Al-Fatiha 1 (7 verses), Al-Ikhlas 112 (4), Al-Falaq 113 (5), An-Nas 114 (6). **22 numbered Arabic verses** displayed, with approximate transliteration, independently authored English and Tamil meaning-based explanations, and separate contemplative questions.
- Arabic text matched against Quran.com 2026-10-14 canonical verse pages; this app does **not** reproduce Quran.com's modern copyrighted translations.
- Distinguishes Arabic scripture, explanatory rendering, personal reflection and external scientific evidence. Surah 1 basmala is verse 1; surahs 112–114 opening basmala is not counted among numbered verses.
- Other verse references: Qur'an 50:16 (nearness/inner whispers) and 42:11 (nothing is like God); **'closer than breath' is a metaphor, never a literal statement about Allah being breath/air or an identification with human awareness**.
- Separate sections with three intention lessons, three nafs lessons and four evidence-limited attention/meditation science notes, each with its source link.
- Daily reflection question, selected by date; 3-, 5-, 7-, 10-minute optional practice timer with five descriptive stages. No forced breathing and no fasting or food restriction.
- Completion history is **off by default**, optional to activate, local only; turning it off resets the count.
- Private reflection journal: localStorage `niyyah:journal:v1`, up to 100 notes, import/export JSON, delete individual notes. Export is **not encrypted**. No cloud sync, public share or analytics.
- Practice and reader preferences under `niyyah:preferences:v1`.
- Scriptural sources link out to Quran.com **on user request**, without copying unverified recitation audio or synthesizing Arabic.
- Independent HTML/CSS/JS, manifest, icon, service worker `niyyah-shell-v1-0-0`, directory scope `/niyyah/`.

## Reference sources
- https://quran.com/al-fatihah
- https://quran.com/al-ikhlas
- https://quran.com/al-falaq
- https://quran.com/an-nas
- https://quran.com/50/16
- https://quran.com/42/11
- https://pmc.ncbi.nlm.nih.gov/articles/PMC2693206/
- https://www.nature.com/articles/nrn3916
- https://pubmed.ncbi.nlm.nih.gov/33593124/
- https://pubmed.ncbi.nlm.nih.gov/29578742/

## Explicitly not implemented in Phase 1
- In-app Arabic recitation audio and offline download: only linked source pages until recording redistribution permissions and reciter attribution are confirmed.
- In-app Tamil/English voiced narration, personal audio recording and persistent audio-player controls (play/pause/seek/volume/resume/background playback). These are Phase 2; no fake audio controls are displayed.
- Profiles, sign-in, synchronization, optional progress tracking beyond a local completion count, guided learning journeys and other traditions are future phases.
- Human review of Tamil nuance, transliteration/tajwid by an expert teacher, physical Android/iOS device testing, full screen-reader and installed offline PWA testing are still required.
- External sources and recitation websites require the internet even if NIYYAH itself is cached offline.
- No fasting/dieting requirement, medical promises, metaphysical claims framed as proven science, forced breathing or compulsive streaks.

## Privacy and isolation
NIYYAH operates on this device with no network actions beyond loading its own published assets and user-clicked external source links. Journal content and practice settings are never submitted to a server. Clearing browser data may permanently delete unexported journal entries.
No files in `human-practice-prototype/`, `human-atlas/`, `inner-voice/` or `story-engine/` are edited. The later optional HeartClear-to-NIYYAH navigation link requires user review after NIYYAH testing.

## Quality checks to complete on devices
1. Review the 22 Arabic verses, diacritics, transliteration and Sri Lankan Tamil phrasing with qualified Arabic and Tamil readers.
2. Change EN → தமிழ் → both, reload, verify chosen language persists.
3. Read every chapter in all three modes and inspect font wrapping.
4. Start/pause/restart each 3/5/7/10 minute practice; verify optional history remains off unless enabled.
5. Create journal entry, refresh, export a backup, restore a copy without duplicates, delete an entry.
6. Install on supported Android and iOS browsers; test cached offline app pages and prompt accessibility.
7. Verify each external source link leads to the intended passage.


## Version 1.1 — Juz Amma library and Al-Baqarah foundation (2026-10-14)

- All **37 Juz Amma surahs (78–114), 564 numbered verses**, included in three separate, precached Arabic modules, with opening basmala shown separately and not misnumbered. Search by chapter name or number works in the existing Sacred Wisdom section.
- Arabic text sourced from the semarketir/quranjson distribution, attributed to Tanzil Quran Text (Uthmani) under CC BY 3.0. No Arabic verses were modified. See https://tanzil.net/docs/Text_License and https://github.com/semarketir/quranjson .
- Existing Al-Fatiha and the fully explained short chapters Al-Ikhlas, Al-Falaq and An-Nas remain available in the same independent NIYYAH app.
- Initial **original, meaning-based English/Tamil draft explanations** are provided for Al-Asr (103), Al-Kawthar (108), Al-Kafirun (109) and An-Nasr (110), total 15 verses. For other new verses, the reader clearly states that translations are still being reviewed, with direct links to external explanations. No invented or unlicensed translations.
- Separate opening **Al-Baqarah 2:1–20** study with source-checked Arabic. Original English/Tamil draft meanings for 2:1–5 and separate linguistic/personal notes for *Alif Lam Mim* and *al-muttaqin*; the personal reflection is explicitly **not an approved final tafsir** and must be reviewed with the author before publication as teaching. The rest of the surah (through 2:286) is not imported.
- Language switching, local journal and its saved entries, practice timer, and optional history controls retain the Phase 1 storage keys and behavior.
- The independent NIYYAH service-worker cache is now `niyyah-shell-v1-1-0`, precaching the new scripts.
- **Human review still required:** Arabic reader/tajwid expert, Sri Lankan Tamil editorial quality of original meaning drafts, live Android/iPhone/desktop layouts and offline behavior.

### HeartClear and the other apps

No existing HeartClear, HUMAN ATLAS, INNER VOICE or STORY ENGINE files were edited. A future optional HeartClear **Explore More** hub is only a design plan until this NIYYAH release is tested. It can eventually link to the independent apps, culinary cultural content and the later video/reels section without merging storage or disturbing the existing meditation/player system.
