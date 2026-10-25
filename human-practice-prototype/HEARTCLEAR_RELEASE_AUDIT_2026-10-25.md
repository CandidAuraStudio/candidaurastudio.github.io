# HeartClear — release audit (2026-10-25)

Official identity: **HeartClear (HC)**. Preserve the black/white infinity mark, personal writing and audio, all existing media references, local history and offline media. Do not replace HC with another app or another person's meditation methodology.

## Verified in current repository source

- **Navigation:** six destinations in exact order **Home, Listen, Reels, Explore, Library, Settings**. Reels opens the existing full-screen player; Search remains accessible from Home. v275 removes the competing inline guard that repeatedly moved Reels into the wrong position.
- **Home:** official infinity logo, English/Tamil global language buttons, local-time greeting, one context-aware daily meditation button, and Quran/Bible/Bhagavad Gita shortcuts with the original panels retained.
- **Dayparts:** morning Deep Wake Up, midday Noon Reset, evening Evening Release, night Deep Sleep. Morning/daypart boundary made consistent with greeting.
- **Sounds:** six mixing choices (Rain, Wind, Ocean, Birds, Fire, Thunder), maximum three simultaneously, separate sliders, preset durations and saved last mix.
- **Scripture:** the Quran module exposes the 114-surah selection with Arabic original plus translations/reflections; a Genesis/Bible player is implemented; the Gita offers 18-chapter audio modules and language selection.
- **Books:** English/Tamil reader paths, English/Tamil audiobook interfaces and an existing Sinhala Shadows of Truth reader source are represented in the app.
- **App shell:** v275 aligns Settings version text, worker registration and app-shell cache ID. Existing media cache is unchanged.
- **Regression coverage:** run `node tests/hc-release-contract.cjs` in `human-practice-prototype/` to check build version, scripts, navigation, sources and mixer invariants.

## Still partial or requires device / source verification

1. **Native playback and headphone continuity:** app logic for the mini-player, seek and skip exists. Verify Bluetooth pause/resume, reopening the installed PWA, background playback, duration persistence, and exclusive playback on Android.
2. **Drive video audio-only:** some Drive-hosted videos use third-party iframes, so native one-tap audio and seek/Next cannot be guaranteed without authorized direct audio files. Do not replace a full recording with a short loop or invent an MP3 URL.
3. **Gita Nepali:** the listed Nepali direct audio source is still marked pending. Do not represent it as an embedded working native voice. Validate chapter playback/Next across languages.
4. **Bible:** Genesis listening and reading are implemented; do not describe this as a verified full-Bible audio library.
5. **Reels:** actual Drive permissions, count, swipe behavior within iframe and automatic loading require in-app testing. Preserve original Drive files and avoid re-adding duplicates.
6. **Books:** audit actual file completeness and translation accuracy before claiming two fully published books in both English and Tamil. The Sinhala reader source exists but still requires native-language proofreading.
7. **Daily media rotation:** confirm morning/noon/evening/night video or audio catalog and links against real uploaded Drive assets before setting automated rotations.
8. **Offline support:** the worker keeps a separate media cache, but airplane-mode playback and update prompts require device testing.
9. **Legacy smoke suite:** `tests/heartclear-smoke.cjs` contains expectations for older homepage visibility; review before using it as the sole release gate.
10. **Live website:** the published GitHub Pages URL was not accessible from this environment. Source/code verification is not visual Android testing.

## Safe change process

- Backup branch: `hc-backup-2026-10-25-before-audit`.
- Review branch: `hc-audit-2026-10-25`.
- Keep updates incremental; do not overwrite original media, books, reflections, translations or saved progress.
- Every release should pass the static regression check, then mobile visual, player, language, navigation, resume and offline checks before being marked fully verified.
