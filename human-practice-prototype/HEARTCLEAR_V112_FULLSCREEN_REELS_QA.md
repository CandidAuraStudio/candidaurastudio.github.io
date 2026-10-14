# HeartClear v112 — Full-screen vertical Reels
Date: 2026-10-14

## User request
Provide Reels directly in the bottom navigation, open the selected Reels collection full-screen, and allow vertical next/previous gestures like a short-form video feed.

## Implementation
- Added a Reels tab as the **sixth entry in the existing six-column bottom navigation**, keeping Home, Practice, Sounds, Library, More.
- Reels now opens in a **full-viewport overlay** `#hcReels.active` with the HeartClear top bar and bottom nav hidden while viewing; explicit Close returns to Home.
- Embedded video uses the **33 actual user-uploaded short MP4 files** from the correct shared Google Drive Reels folder, not the four meditation preview sources.
- Opening Reels loads the selected Google Drive player immediately and **requests autoplay** (`?autoplay=1`), without claiming cross-origin audio autoplay works.
- Next/Previous buttons and swipe gestures switch to another clip, unload the former iframe, and request playback again.
- Google Drive's embedded iframe swallows touch events, so **vertical swipe works along a narrow right-hand swipe rail**; it does not reliably work over the central iframe. The rail is visible as ↑ SWIPE ↓ and doesn't cover the central Drive play/seek/volume area.
- Keyboard Up/Down and mouse-wheel scrolling on the rail also switch reels, with wheel throttling.
- Original video source is available through `Open original in Drive`; no uploads and no new paid services.
- Exiting Reels removes iframe `src` to stop video playback.
- Scoped CSS uses `100dvh`, safe-area insets and mobile viewport; larger viewports center the reel player.
- Service worker bumped app-shell cache from `heartclear-v111` to `heartclear-v112`, retaining existing `heartclear-media-v1`.

## Simulated tests passed
- 33 Drive clip records retained, without old meditation visual references.
- Bottom navigation Reels tab exists, other five buttons retained.
- `hcOpenReels` opens Reels and loads the correct Drive preview with best-effort autoplay.
- A swipe up on the rail goes to video 2 of 33; swipe down returns to video 1; Previous from 1 wraps to 33.
- Closing the screen clears iframe source.
- Keydown events installed, and compiled inline JavaScript blocks contain no syntax errors.
- Reels is part of immersive screens, hiding regular app navigation while open.
- The service worker retains its separate app cache and existing media cache.

## Device acceptance tests still required
- In Android Chrome, refresh once, open Reels through bottom navigation. Confirm the screen fills available browser viewport and video counter is 1 / 33.
- Playback may require a separate tap inside Google's embed; check whether sound and seek work.
- Swipe **near the right edge** ↑ / ↓ and confirm Next/Previous; swipe over the middle of the Drive iframe may not work.
- Close and verify playback stops; confirm older meditation videos, Sounds, offline playback, audiobooks, Library and Settings function.
- Repeat in installed Android PWA and iPhone Safari.
- For clips that fail to load in the embedded player, use Open original in Drive and report clip number.

## Remaining technical limitation
Google Drive's embedded player is cross-origin. HeartClear cannot directly seek/pause the video, guarantee sound autoplay or observe completion and automatically advance to the next reel. A TikTok-like smooth **whole-screen swipe and uninterrupted next-video autoplay** requires source files served from an approved streaming host or compatible video delivery API, rather than a Google Drive iframe. No workaround claiming those features works is provided.

## Privacy
This change introduces no profile, analytics, recorder, account creation, sharing of journal content, or modifications to other apps.
