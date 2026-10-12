# HeartClear 1.2.4 REVIEW — Navigation and Sound Familiarity history integrity

Do NOT merge into main or deploy before owner checks.

## Baseline
Base commit: 25386114a1c4d7c57e58a9142f3afaa003c53ef9
Baseline release: v104 / 1.2.3. No audio was removed or relocated in this review branch.

## Changes staged for review
- A missing destination no longer leaves a blank page; `show(id)` now refuses unknown routes and preserves current screen/playback.
- Fear/Sound Familiarity now counts actual time playing (pauses excluded) instead of `currentTime`, which can be changed by seeking.
- A preview shorter than five seconds does not create or increment a history session; a simple notice appears instead.
- New activity history reflections use optional 'Comfortable', 'Unsure' and 'Too much' words instead of numbers.
- Existing localStorage keys, earlier histories and previous optional ratings are not migrated or deleted.
- Optional before/after rating buttons clear aria-pressed status correctly when choosing another sound.
- Candidate shell version 105 staged only on review branch, media cache unchanged; not live.

## QA (source-level)
Existing screen count: 33. Inline JS script blocks compiled: 2.
- PASS: No duplicate DOM IDs
- PASS: All target screens present
- PASS: No missing inline click handlers
- PASS: Inline JS syntax clean
- PASS: 33 existing screens retained
- PASS: Actual play time rather than seek position
- PASS: Unplayed trials not counted
- PASS: Optional feeling recorded as words
- PASS: Historic stats localStorage key untouched
- PASS: User practice history schema retained
- PASS: Audio and six-layer mixer retained
- PASS: Sacred/Library/offline retained
- PASS: Worker media cache name preserved
- PASS: No autoplay addition

## Remaining work — not represented as completed
- Actual Android regression tests of native media playback and background audio.
- Public-facing secure optional accounts/individual consent and administrator visibility (not wired, do not collect identifiers without permission).
- Independent content rights review for remaining ambient tracks and archived Drive videos.
- Verified Buddhist chanting recording and context; no invented track.
- HTML accessibility/function tests in a real mobile browser, slow-network and true offline sessions.
- Visual parity of Human Practice, Meditation, Library and More with Home.
- Voice-mixed nature recordings remain in private Drive; no public publishing without user approval.

Review in Github compare view. This branch changes only index.html, sw.js and this report.