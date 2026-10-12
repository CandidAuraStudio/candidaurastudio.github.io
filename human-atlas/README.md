# HUMAN ATLAS — Prototype 02

Independent, mobile-first archive, published at https://candidaurastudio.github.io/human-atlas/

## What's in version 02
- Three researched cultural overviews, each with visible source links:
  - Kolam in Tamil Nadu (UNESCO nomination was referred, **not inscribed**).
  - Palmyrah and traditional livelihoods in Sri Lanka.
  - Odiyal products from the palmyrah, using official Sri Lankan Palmyrah Development Board records.
- Twelve earlier editorial sample stories remain, clearly distinguished from researched articles.
- A device voice recorder available from each story reader. Permission is asked only when Record is tapped.
- Recordings are stored locally in IndexedDB, not sent to a server. Playback, individual export, deletion and five-minute maximum are provided.
- Existing text-to-speech voice narration remains an independent feature.
- Existing notes and bookmarks retain their original localStorage keys; **no migration**, reset or clearing of existing data.
- Original artwork, palette, homepage categories and responsive layout remain intact.
- The offline service worker precaches this directory's core scripts and assets.

## Known limitations
- No real human recordings are published with the curated notes: visitors must make their own recordings or use device text-to-speech.
- No verified firsthand oral testimonies or licensed original photography have been added.
- Recording support depends on browser MediaRecorder, microphone permission and available IndexedDB storage. Use current Chrome or Safari directly for best compatibility.
- Audio recordings are not part of the written My Notes JSON backup; export each track individually.
- Background playback may stop when the phone locks or when a browser is backgrounded. It is **not** claimed as guaranteed.
- No cloud sync. If you uninstall, clear storage or switch browsers, local recordings and notes may become inaccessible.
- Offline PWA behavior and real-device microphone permissions need testing on Android and iOS.

## Isolation / deployment
Only paths inside `human-atlas/` were created or edited.
The service worker registration, cache key and fetch handling are scoped to that directory.
HeartClear remains in `human-practice-prototype/`; no HeartClear files were edited for Human Atlas v02.

No paid AI or API calls.
