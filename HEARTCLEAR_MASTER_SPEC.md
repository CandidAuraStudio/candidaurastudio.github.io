# HeartClear — master project specification and change control

**Status:** canonical coordination document for everyone editing HeartClear. Last reviewed 2026-10-25.
**Repository:** `CandidAuraStudio/candidaurastudio.github.io`.
**App location:** `human-practice-prototype/`.
**Public app:** https://candidaurastudio.github.io/human-practice-prototype/

This document records user-approved direction and coordination rules. It does NOT certify that every feature is currently implemented or working. Always inspect the **latest main branch** and any active PRs before work.

## 1. Rules for every chatbot/developer

1. **One release manager owns `main`.** Other bots: do not write to or deploy from `main`. Create a uniquely named feature branch from the *latest* main commit and open a PR for review. Never force-push main.
2. **Read before edit:** read this file, the relevant source files, `human-practice-prototype/HEARTCLEAR_RELEASE_AUDIT_2026-10-25.md` if present, and open PRs. Inspect the latest commits and the active file SHA; another bot might have changed them.
3. **Preserve all originals:** never delete, rename, reset or substitute user books, book covers, audio, voice, meditation sessions, Quran reflections, Gita chapters, video IDs, localStorage/history, or offline media without explicit permission. Keep HeartClear as the app name and black/white infinity logo.
4. **One feature per branch/PR.** Describe exactly which files changed, what behavior should change, what was left unchanged, tests run, and limitations. Never silently combine an unrelated layout overhaul with a player bug fix.
5. **No duplicated fixes:** do not add another global CSS `!important` overlay, navigation guard, monkeypatch or new media player if the existing module can be corrected. Look for rules/scripts that undo the change later in load order.
6. **Before merging:** update/rebase onto the newest main, resolve conflicts by integrating BOTH sets of changes, run contract/smoke/mobile checks, review screenshots and versions. Do not merge while conflicts exist.
7. **Deploy ONE coordinated build:** sync `index.html` script URLs, `sw.js` precache URLs, service-worker registration, offline shell cache version and Settings version label. Keep the separate offline-media cache untouched. Check installed-PWA updating versus a fresh browser visit.
8. **Be accurate:** a committed source change is not proof the GitHub Pages site has published it or that playback works on Android. Describe separately: requested, implemented in source, published, manually tested, and not yet supported.
9. **Protect the user's creative method:** template designs may inspire appearance, but do not import a third party's meditation/practices as replacements. Do not add paid dependencies, accounts or services without approval.

## Owner clarification — 29 October 2026: restore uploaded recordings

The owner confirms that they have permission and supporting documentation to use their uploaded videos and music, and explicitly requests restoration of their existing Drive playback. Do not remove or disable these recordings or force a new local upload without their permission. Prefer a saved native MP3/WAV when present; otherwise preserve the original, visibly labelled Drive player and source identifier. Do not claim that a Drive MP4 is native audio or promise native background/resume controls for its iframe.

This latest instruction supersedes PR #70's blanket blocking of the original Drive recordings. PR #70 must be reconciled before release so it cannot silently disable them again. Keep its unrelated recovery fixes and the separate search/recipe work subject to their existing review and release gates. Do not publish failing work.

## 2. Locked user-approved experience

### Branding, palette, fonts
- Name: **HeartClear** (HC). Original black-and-white **infinity** logo, not a gold heart or renamed product.
- Preferred visual system: black / charcoal surfaces, white text, restrained gold only as accent. No dominant dark-blue cards; no distracting blur. Light floating nature imagery only where already approved.
- Responsive typography: headings readable, secondary text compact, buttons fit their labels on ONE line when practical. Never let “Stop” split into two lines or enlarge every control indiscriminately. Reading text can be larger than UI labels.

### Bottom navigation — exact order
**Home | Listen | Reels | Explore | Library | Settings** (six buttons).
- Reels is third, taking the position next to Listen.
- Explore fourth, Library fifth immediately beside Settings sixth.
- Do not put Search in the bottom dock; keep Search within Home/Explore.
- Reels opens the first vertical fullscreen reel directly (no redundant intermediary). Vertical swipes load another reel as supported by the media source.
- There must be ONE nav owner. Inspect `hc-flow-v220.js`, `hc-cinema-v239.js`, and any inline code in `index.html`. An old `hcReelsBottomTabGuard` forcibly moved Reels to the fifth slot: **remove/reconcile this competing guard**, not add another.

### Home — content order
1. Infinity brand mark and a compact global English/Tamil language selector.
2. Local-time Good morning / Good afternoon / Good evening / Good night greeting.
3. **One large “Begin meditation”** control, automatically choosing relevant morning (Deep Wake Up), noon (Noon Reset), evening (Evening Release), or night (Deep Sleep) audio. Do not force four oversized choices above it.
4. Clear **Qur'an, Bible and Bhagavad Gita** access near the top, with **existing in-app player controls** retained. Quran full surah browse, Bible chapter, Gita 18 chapters with language choices.
5. Other journeys, Kitchen, Sounds, books, personal writing and explore sections below, progressively disclosed rather than a giant front-page paragraph.

### Player and listening behavior
- One-tap playback where browser rules permit. No unsolicited autoplay merely because the user entered another screen or resumed chatting.
- Persistent universal mini-player: Play/Pause, seek or back/forward and route back to full player; resume from saved position after app close/reopen or earbud pause where technically possible.
- Background/lock-screen controls and offline downloads should be verified on Android, not claimed just because event handlers exist.
- All Listening and Sounds preserve media source and user progress. Mixer displays six options (Rain, Wind, Ocean, Birds, Fire, Thunder) with **up to three simultaneous layers**, individual volume sliders, timer and saved mix.
- Third-party Google Drive video iframes do not automatically provide native audio-only control; use authorized direct audio sources before promising seamless native playback.

### Scripture and languages
- Qur'an: original Arabic recitations, full **114-surah** browsing, English and Tamil meanings; keep personal reflections clearly differentiated from the scripture itself. Morning Adhkar separately available.
- Bible: in-app chapter reading/listening; keep existing Genesis material, without claiming a complete Bible recording until it is verified.
- Bhagavad Gita: **18 chapter** structure, in-app player, Sanskrit/Hindi/English/Tamil/Nepali language choices as available. If Nepali native audio source is still pending, label it honestly—do not fake content or route users unnecessarily to external players.

### Books, Reels, podcast, Kitchen and other existing modules
- **Library:** distinguish **Audiobooks** (English, Tamil) from **Reading Books** (English, Tamil, Sinhala as genuinely available). Preserve both books' original text, genuine covers including Book One English cover, progress and source files. Do not fabricate translations or declare incomplete books complete.
- Original HeartClear podcast series begins with **001 — Nature**, in the user's spontaneous voice. Preserve original voice recordings; do not replace with generated reread or pretend transcription is raw audio.
- Reels: original uploaded clips; keep full-screen browsing, item history and existing media IDs. Verify actual Drive media availability.
- HeartClear Kitchen: broad everyday and world recipes, practical measurements, ingredients and steps, the user's own known dishes, and no oversized repetitive guidance. Do not invent the user's personal cooking methods.
- Keep the existing Sacred Sound, Human Practice, Fear, Sound Lab, offline, history, settings, access and other sections instead of pruning features to simplify the menu.

## 3. Known open issues — NOT certified fixed

- Home styles and content are defined by multiple generations of scripts/CSS. A newer sheet can hide an earlier control.
- On 2026-10-25, `main` reported **app-shell v277** and still included an inline `hcReelsBottomTabGuard` which can force Reels back to fifth position. Confirm current main again before editing; **do not assume v277 remains latest**.
- A previous v276 audit PR/branch became behind concurrently edited book and homepage files. **Never overwrite newer book reader changes to apply older navigation fixes.**
- Real playback, PWA refresh, Bluetooth controls, resume after restart, Google Drive permissions, Gita language audio, Reels swipe, Sinhala text quality, and offline mode need targeted device validation.
- Preserve the contents of `books/`, the separate media cache and all saved listening positions.

## 4. Release checklist (must be reported)

- [ ] Compare the feature branch with current main; resolve file conflicts carefully.
- [ ] Verify bottom tab DOM order Home, Listen, Reels, Explore, Library, Settings.
- [ ] Ensure exactly one navigation source of truth; old guards cannot reorder tabs.
- [ ] Verify homepage logo, local-time greeting, time-of-day meditation and three scripture players.
- [ ] Confirm black/white/gold palette and responsive non-wrapping control labels.
- [ ] Verify six mixer options, max three active, all volumes and Stop.
- [ ] Keep reader books, covers, audiobook files, scripture data and personal content intact.
- [ ] Synchronize script versions in HTML, service worker precache, registration and Settings version.
- [ ] Run `node tests/hc-release-contract.cjs` if available; review older smoke tests for outdated assertions.
- [ ] Test on a narrow Android screen, refresh after service-worker update; check mini-player, reels, all three scripture players, offline/return behavior.
- [ ] Only after those checks, report **merged**, **published**, and **device-tested** as distinct states.

## 5. Message for any parallel chatbot

> You are a feature contributor, not the release manager. Read `HEARTCLEAR_MASTER_SPEC.md` from the current GitHub `main` branch before doing anything. Do not commit directly to main or modify unrelated components. Create your own branch from the newest main, make the smallest targeted change, test it, and open a PR. State affected files and possible conflicts. Do not merge or deploy. Preserve every existing audiobook, book, media file, personal meditation method and saved-progress key. If your branch is behind main, reconcile rather than overwrite. One designated release manager alone integrates reviewed PRs into a tested version.

