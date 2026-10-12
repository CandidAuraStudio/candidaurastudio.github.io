# HeartClear v103 / 1.2.2 — Compact white playback controls
Baseline v102 commit: 41509cf018dd23b6165a2cd98b9dd1ff301ca173.
The already implemented Practice card Allahu Meditation · Hu Hu Allah reuses the existing islamHu Drive ID (also retained under Islamic Sacred Sound). No duplicate source or audio redistributed.
White, compact 44px-or-taller Play/Pause controls, maximum 154px for textual buttons, for meditation, Fear, Sacred Adhkar, Sounds, nature-only aftercare, audiobooks, two mini players, six-layer mix, quiet and human practice timers, introduction and Home entry sheets. Sound row play circles now 44x44; audiobook circular control 50x50. Previous late conflicting gold overrides fixed at end of stylesheet.
Google Drive video iframe contains provider-owned playback controls that cannot be restyled with the app CSS; Back/Minimize and related HeartClear buttons are compact.
The old audio/video library, licenses, installed app path, offline media cache, saved personal notes, bookmarks, playback handlers and no-autoplay behaviour are unchanged.
Source validation: 2 JS scripts parsed, 0 repeated DOM IDs; added real Chromium computed-style assertions to the existing navigation/offline regression test.
New meditation videos and sound mixes are intentionally deferred until supplied by the user.
