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
1. Verify 22 verse numbers, Arabic diacritics and Bengali? No—Sri Lankan Tamil language presentation on an Android phone with a qualified Arabic reader for pronunciation.
2. Change EN → தமிழ் → both, reload, verify chosen language persists.
3. Read every chapter in all three modes and inspect font wrapping.
4. Start/pause/restart each 3/5/7/10 minute practice; verify optional history remains off unless enabled.
5. Create journal entry, refresh, export a backup, restore a copy without duplicates, delete an entry.
6. Install on supported Android and iOS browsers; test cached offline app pages and prompt accessibility.
7. Verify each external source link leads to the intended passage.
