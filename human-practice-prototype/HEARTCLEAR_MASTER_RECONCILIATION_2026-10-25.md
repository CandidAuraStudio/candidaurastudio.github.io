# HeartClear — Master reconciliation and recovery specification
Date: 25 October 2026
Source: user-approved HeartClear discussions (23–25 October 2026) cross-checked with repository source.
Release candidate: HC v275. Status is **source verified**, not live mobile verified.
Official name: HeartClear (HC). Official logo: black-and-white infinity (∞). HUMAN ATLAS and Human Practice are sections or independent projects, not replacements for the HeartClear name.

## Canonical six-tab bottom navigation

1. Home — black-and-white infinity.
2. Listening — headphones and unified audio.
3. Explore — compass.
4. Library — open book.
5. Reels — clapperboard; replaces the magnifying-glass Search icon. One tap opens the existing full-screen Reel experience.
6. Settings — sliders.

Do **not** reintroduce Search as a bottom tab, duplicate a Reels tab, reorder Reels to third, or change another application's tab bar. Global search remains accessible from Home/Explore where appropriate. On mobile, the persistent dock must be visible on Home and other normal screens; Reels is intentionally immersive. Inspect both `hc-flow-v220.js` and `hc-cinema-v239.js` before changing the bar. There is a defensive compatibility guard in `index.html` (`hcReelsBottomTabGuard`), but it must not replace proper source consistency.

## Homepage acceptance criteria

- Above the local-time greeting: original infinity logo and one compact global English/தமிழ் switch. No duplicated language selectors below.
- Greeting changes morning / afternoon / evening / night using **device-local time**.
- One prominent context-aware meditation start action. Use the existing morning wake-up, noon reset, evening release and sleep audio; do not create a second player or force a yoga label.
- Immediately below: clearly named Qur’an, Bible and Bhagavad Gita access, with their existing in-app source players; do not force a separate web site or add religious ranking.
- Keep the main Home simple, dark, readable and quick to tap; no large explanatory blocks, repeated cards or giant headings. Apply neutral black/white infinity branding with subtle natural imagery, not bright blue or heavy blur.
- Additional activities live in Explore/expanded More instead of competing with the main action. Resume/progress stays usable without blocking Home.
- Preserve the original functional nodes; move them rather than duplicating audio or iframe elements.

Relevant source: `hc-home-core-paths-v259.js`, `hc-home-layout-v256.js`, `hc-home-visible-v268.js`, `hc-global-language-v245.js`, `hc-unified-visual-v259.css`.

## Media/player requirements

- Universal **native audio** mini-player across native recordings, audiobook and recitation: Play/Pause, elapsed/total, ±15-second seek, adjustable speed, resume and persistent background capability where browsers permit.
- Do not restart or automatically play a paused recording when Home reopens; playback starts only from a genuine user action. Resume last position without forced playback on refresh.
- Keep page scrolling functional when floating mini-player is visible. Audio and video must be one tap wherever media origin/browser permits; show an honest Play fallback when it does not.
- When opening Reels, pause other app audio. Reel feed is full screen, vertically swipable and starts at the selected/first reel. Google Drive embeds may require native Play; do not claim impossible cross-origin autoplay.
- **User request still open:** video-only recordings should have audio-first playback without a second video player. An MP4 iframe is not an independently seekable audio track; only use separately available or permission-cleared original audio files. Do not fake conversion, native seek, offline availability or licences.
- Keep sacred sound, Sound Lab, acoustic recordings, meditation, resume, offline downloads and saved progress. Keep distinct original and third-party content labels.

Relevant source: `hc-mini-transport-v185.js`, `hc-listening-hub-v254.js`, `hc-playback-one-tap-v174.js`, `index.html`.

## Scriptures and language

- Qur’an: full 114-surah chapter selector; Arabic recitation is distinct from sourced English/Tamil meanings and from clearly labelled personal reflections. Do not shuffle verse order. Keep next/previous listening where supported.
- Bible: in-app English/Tamil Genesis currently evidenced. The request for broader Bible coverage and a matching next/previous player is not evidence that all books have been imported. Verify before marking complete.
- Bhagavad Gita: present the 18 chapters with one in-app audio and text experience; English, Tamil, Hindi and additional requested languages (including Nepali) should only appear where accurate text/audio is actually provided. Avoid a separate unstyled media player.
- The single global language preference should persist between sections. Source scripture languages and actual recording languages must remain clearly attributed; don't silently translate source audio.
- Preserve Hindu, Bible, Qur'an and Human Knowledge screens rather than removing them.

## Library / reading

- Audiobooks → English and Tamil, with original recordings and chapter resume.
- Reading Books → English (2 books), Tamil (2 books), Sinhala (1 book).
- Book One: `Shadows of Truth — A Memoir of Mind vs Body`, English and Tamil full-text reader; Sinhala reader.
- Book Two: `HUMAN — WHEN YOU ARE ALONE`, English and Tamil reading editions. Keep its title/subtitle unchanged; do not claim draft translation is final. Reader text size, chapter navigation and resume should be retained.
- Readers confirmed in source: `books/shadows-of-truth-reader.html`, `books/shadows-of-truth-english-pages.js`, `books/shadows-of-truth-tamil-pages.js`, `books/human-when-you-are-alone.html`, `books/human-when-you-are-alone-tamil.html`, `books/shadows-of-truth-sinhala.html`. **Content completeness, translation fidelity and on-device font rendering remain to be proofread/tested.**
- Do not clutter the listening screen with reading-book links, or the reader with duplicate audiobook choices.

## Explore and other protected areas

- Preserve: Human Practice / HUMAN ATLAS, Fear/sound familiarity, Sacred Sound, Sound Lab, nature, 33+ existing Reels as actually present in the current media inventory (do **not** assume a count without checking Drive), offline downloads, saved history and progress, podcast entries, daily care, animal care, interactive journey and the global Kitchen.
- Kitchen: practical recipes across world cuisines including burgers, pizza, traditional Tamil/Sri Lankan dishes, household-cup measures, compact ingredients and steps; do not exclude foods categorically or invent the user's personal recipes.
- HeartClear Podcast: numbered original spontaneous episodes beginning **001 — Nature / இயற்கை**. Keep genuine voice takes separate from transcriptions/scripts; never pretend chat transcription contains retrievable raw audio. No replacement narration without creator consent.
- Maintain guest/private-by-default use, no mandatory login and no new paid infrastructure without approval.

## Verified implementation and outstanding issues (as of this document)

| Requested behaviour | Evidence in repository | Remaining verification |
| --- | --- | --- |
| Correct bottom tabs and Reels fifth | `hc-flow-v220.js`, `hc-cinema-v239.js` and inline guard | **Live Android Chrome/PWA still unverified**; user repeatedly saw old Search icon |
| Local-time Home meditation and 3 scriptures | `hc-home-core-paths-v259.js`, `hc-home-visible-v268.js` | Check small-screen order and one-tap playback |
| One global EN/TA switch | `hc-global-language-v245.js` | Check route transitions, source-specific languages |
| Native mini-player seek and speed | `hc-mini-transport-v185.js` | Verify all native audio types, lock screen and scrolling |
| English/Tamil audiobooks and 2/2/1 reading shelves | `index.html`, book files | Open each link; verify text integrity and saved page |
| Full 114 surah source structure | `hc-quran-home-v153.js` and Quran reader | Verify translations, controls and playback on phone |
| In-app Gita, Bible and original audio | Hindu, Gita, Genesis modules | Full requested languages/coverage and consistent controls unverified |
| Reels from user Drive | `index.html`, Reels module | Verify actual inventory, first-item playback and vertical swipe |
| Video → audio-only listening | Existing Drive preview is cross-origin video | **Not complete** without actual native audio media |
| Rebuild master prompt / complete external backups | This specification + backup Git branch | Git branch **does not back up Drive media**, original recordings or local user data |
| Version label | v275 in current app shell and Home script | Live published deployment and installed PWA update unverified |

## Release/version rules

- App shell release label in `index.html` Settings: `HeartClear · HC v275`.
- Settings layout script must display **the same** release; no v192/v269 legacy labels.
- Service worker `APP_CACHE` uses `heartclear-v275`, while `MEDIA_CACHE` is kept unchanged as `heartclear-media-v1` to avoid deleting saved audio.
- Update file query versions for changed scripts, preserve manifest/saved data compatibility.
- Old clients can still be held by browser caches, service workers, a pending reload, or GitHub Pages deployment. A source commit is **not** evidence that the user's phone has updated.

## QA before calling a feature fixed

1. Open the newly published page in **ordinary Chrome** and in installed PWA (not only local GitHub source). Read version in Settings.
2. Confirm exact six bottom icons/order, with no Search icon and one clapperboard Reels button. Test Reels from Home and from Library.
3. Home: verify current greeting, single top language switch, single context meditation action, Qur’an/Bible/Gita placements, font readability and scroll.
4. Test native ±15s seek/Play/Pause/speed/background on meditation, Surah, Genesis, Gita and audiobook **where native sources exist**. Verify no unwanted autoplay after refresh.
5. Open English 2/Tamil 2/Sinhala 1 reading books and restore chapter/page after refresh.
6. Test Reels vertical navigation; verify no other audio overlaps; don't assume Drive embeds can autoplay or be seeked.
7. Verify kitchen, downloads, history, settings and offline PWA without deleting the media cache.
8. Record passed/failed device tests and only then mark the mobile release complete.

## Recovery

Pre-audit source snapshot branch: `backup/heartclear-before-v275-audit-20261025`.
Repository: `CandidAuraStudio/candidaurastudio.github.io`, folder `human-practice-prototype/`.
This branch is source-level recovery only. Original creator recordings and Drive archives are separate backups and must be independently inventoried and verified. Do not overwrite personal media or saved browser progress to force a UI update.
