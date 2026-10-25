# HeartClear — Acoustic Earth review (25 October 2026)

## Intent
Build an opt-in collection for **real, recorded acoustic instruments** that evokes the space and emotional restraint of live performances without imitating or redistributing the copyrighted *Interstellar* score.

## Review-only implementation
- New **Acoustic Earth** section inside **Sounds**, compatible with the existing Home visual design: subtle gold label, direct-play row controls, concise copy, and an Acoustic filter.
- **Six existing acoustic recording entries** selectable under Acoustic: original Nepali bansuri, 7/10/15 min edits, and two separately credited Armenian duduk recordings.
- Original **Nature**, **Flute**, **Ambient**, **Mixes** and **Favourites** filters remain intact. No catalogue entries, Drive files, recordings or personal history entries removed.
- Two real Play controls operate through HeartClear's existing single-audio player; the page is silent until the person presses Play.
- Existing MediaSession, resume, history, offline-cache code and service worker remain unchanged.
- **Pipe organ, acoustic piano and cello** are clearly *planned*, not represented as available audio. No synthetic approximations and no copyrighted film score are added.

## Recording candidates; not imported yet
- Historic Romanian pipe organ recorded at Cisnădioara, performed by Anna Arhire and recorded by Cristian Văraru. Source https://commons.wikimedia.org/wiki/File:Pipe-organ-cisnadioara.ogg ; CC BY-SA 3.0; credit and ShareAlike obligations apply if edited.
- David Schrader pipe-organ improvisation: https://commons.wikimedia.org/wiki/File:Organ_improvisation_by_David_Schrader.ogg ; CC BY-SA 2.0. Verify musical fit before selecting.
- For original HeartClear compositions, arrange and record unique melodies with licensed performers or user-owned instruments; do not reuse Zimmer's melody, stems or master recordings.

## Source-level QA
- 3 inline JavaScript script blocks parsed successfully.
- No duplicate HTML IDs after patch.
- 26 original sound catalogue keys preserved.
- Navigation has Home, Practice, Sounds, Library, More plus Reels and subsidiary screens. Nonempty source handlers and screen references are present; this is **not** a phone/browser runtime test.
- Qur'an study handler resides in quran-study-ui.js and remains untouched.
- Optional comfort-based Fear controls already exist in the baseline; not replaced by numeric scores.
- Source baseline main commit 293b457d502ae155b3bdcfb5077c977214d1cad5; live main must not be updated without user's review.

## Review and next build steps
1. Review Acoustic Earth copy and layout.
2. Acquire and verify authentic organ/piano/cello recordings and licensing, then assess musical suitability.
3. Mix an original, quietly dynamic arrangement using the legally reusable masters and retain full source credits.
4. Verify Android playback, small screens, loading, foreground/background, and progress persistence before release.

No auto-merge, no public deployment, no user-history mutation, no new audio delivered by this branch.
