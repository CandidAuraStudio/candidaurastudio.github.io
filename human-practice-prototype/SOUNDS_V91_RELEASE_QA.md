# HeartClear 1.1.0 / v91 — Sounds Redesign and Release Review

## Scope / what changed

- Sounds tab and Home “View all” lead directly to the single **Sounds** page. Sacred Listening and Sound Familiarity remain as direct shortcuts.
- Removed the Sounds-only “My Nature Recordings” device file picker, generic Google Drive instrumental-video grid, and three bottom developer/licence/medical notes. Other existing meditation, Sacred and audiobook source links remain unchanged.
- Replaced double-glass/nested cards with Home-aligned floating-dark surfaces, compact track rows, consistent SVG icons, white play controls and a gold Start Mix button.
- Added All / Nature / Ambient / Flute / Mixes / Favourites filters, with correct 17 catalogue tracks: 12 Nature, 3 Ambient, 1 Flute, 1 Mixes. Favourites stay device-local.
- Standardised visible name “Sounds” for the page, main navigation, Home Continue card and mini metadata.
- Source/creator/licence details are opened by a track-level “i” control. About > Credits in Settings contains longer source and medical-context disclosures.
- Fixed catalogued Ocean 2:46, Storm 2:37 and Distant Thunder 0:42 presentation; sound lengths update from audio metadata when successfully loaded.
- Short sounds loop by default (<5min) with small fade envelopes around the seam. Listener can toggle loop on/off; preference stored locally.
- Implemented a browser-native 1–3 layer mixer with independently controllable Rain, Fire, Birds, Ocean, Wind and Thunder tracks; **recent layer selection and volumes saved locally**, never remote uploads. Other audio players pause when mix starts, and the mix stops when a different player starts.
- Added Endless/15/30/60 minute timer chips plus 10-second ending fade to track and multi-layer mixer playback.
- Global mini-player hides the paused-at-zero “ghost” source, gains a real progress bar for single recordings, and omits irrelevant seek controls for multi-layer mixes.

## Verification performed

- Both inline JavaScript sections parse in the tool runtime; duplicate ID and HTML handler checks prior to merging.
- Mixer behaviour mocked with controlled media elements: max-three selection, start, independent gain, pause, resume and stop: 7/7 passed.
- Audio catalogue/UI mocked: 17 total, Nature 12, Ambient 3, Flute 1, Mixes 1, Favourites 1; creator/source/CC0 metadata details: passed.
- All previously linked URLs must remain in source and `heartclear-media-v1` cached downloads retained.
- The visible v91 script and `heartclear-v91` app-shell cache should agree.

## Explicitly **not** verified / do not claim complete

- **External sources are still used.** CDN copies / public MP4 source ownership / CC0 provenance and redistribution readiness are not verified. No new third-party audio is republished; self-hosting, two bitrate encodes, full HTTP Range hosting test and removals of remote dependencies are separate gated steps.
- Mixer uses separate native HTMLAudio elements and a very short gain envelope on native loops. **This is not overlapping dual-deck crossfade**. Do not advertise gapless sample-perfect mixing or zero-buffering until independently tested.
- No live Android tablet/iPhone/Safari/Chrome screen-off test, browser runtime DOM/E2E test, Lighthouse result, measured Layout Shift or 4G throttled stream test.
- No measured JS gzip transfer size; the requested <150KB JavaScript gzipped budget remains an acceptance test, not a confirmed fact.
- The older Drive video collections on OTHER pages were preserved, not uploaded to Sounds. They require individual source rights review before distributing through HeartClear.

## Hands-on acceptance checklist

1. Open the Sounds tab from Home or bottom navigation, ensure one consistent heading and no file picker, Drive video section or footer notes.
2. Switch All/Nature/Ambient/Flute/Mixes/Favourites and confirm filtering and 44px+ controls.
3. Open each recording “i” sheet, verify credit/creator/licence/source and close via backdrop, × or Escape.
4. Check Ocean shows 2:46, Storm 2:37 and Thunder 0:42 before listening; confirm track duration is updated by metadata if different.
5. Play short tracks for longer than one cycle; toggle loop on/off; verify gain fades are not jarring with headphones.
6. Mix Rain + Wind + Thunder. Confirm fourth source rejected. Adjust each slider; start, pause, resume, stop, navigate elsewhere and return.
7. Choose 15/30/60 minutes, verify time limit and final 10s fade (a short test configuration is helpful).
8. Check ghost Adhkar mini remains hidden at 00:00; after actually playing a single track the mini appears on other screens with correct title, progress and pause/resume.
9. Confirm Meditation original video/audio, sacred content, audiobooks, resume, favourites, offline downloads and PWA upgrade still work.
10. Test installed Android/iPhone app background audio and media controls, network buffering under slow 4G, CSS layout shift and actual compressed JS bundle size.

No paid service/subscription was added. Keep the existing PWA scope; do not delete existing offline caches or personal history.
