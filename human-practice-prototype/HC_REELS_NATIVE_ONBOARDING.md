# HeartClear Reels — native video source onboarding

**Review candidate:** v281. This feature is not enabled for any original Reel until a verified direct media URL is approved in `hc-reels-direct-sources-v1.json`.

## How it works

- The existing `hcReelItems` catalogue of original Google Drive IDs remains authoritative and is never reconstructed or replaced.
- Only items that have an approved `driveId`, a direct `url` ending in `.mp4` or `.webm`, and matching `type` (`video/mp4` or `video/webm`) use the native `<video>` player.
- Unknown IDs, fake URLs, Google Drive preview/download links, inaccessible formats, and failed media are rejected. The existing Google Drive iframe remains the fallback.
- Native videos support vertical swipe gestures over the video, Play/Pause, back/forward ten seconds, seek, mute, fullscreen, remembered position, and best-effort automatic next playback. The following direct video is only preloaded to **metadata**, and not when Data Saver is enabled.
- Progress uses a **new** `heartclearReelsNativePositionsV1` key and does not overwrite `heartclearReelsSeenV1` or `heartclearLastReelV1`.
- New native playback never plays upon merely returning to the app from background. It pauses when the document becomes hidden.

## Registering a verified source (release manager only)

1. Retain every original in the existing Drive folder; do not rename, delete or alter the recorded originals.
2. Prepare a browser-streamable, permission-cleared MP4 (H.264/AAC is widely compatible) or supported WebM derivative without modifying the original. Confirm the hosting policy, file licensing/ownership and cost; no paid service or automatic migration is authorized here.
3. Confirm the actual media URL returns video bytes to an anonymous browser without a login, HTML download landing page or expiring Google Drive token. Verify range requests, codec compatibility and network behavior using Android Chrome.
4. Add an item with the original Drive ID under `items` in `hc-reels-direct-sources-v1.json`, using fields `driveId`, `url` and `type`. Do not insert placeholders or GitHub Pages links for files that are not present.
5. Test playing, swiping, seeking, mute, returning from background, slow network fallback, autoplay restriction, next Reel, separate audiobook audio, and installed-PWA cache version. Run the source contract and main release test.
6. Ask the release manager to integrate both this PR and the distinct Google Drive swipe enhancement PR #42 carefully. They modify `index.html` and `sw.js` and may conflict. Do not silently overwrite either patch.

## Scope and limitations

No native videos are activated while the manifest is empty. Google Drive iframe clips still have cross-origin limitations; this change does **not** make direct videos magically available. Android playback, PWA refresh and performance require real-device QA before release.

## Changed surfaces

`index.html` (two integration points and candidate version references), `sw.js` (app-shell only), new `hc-reels-native-v281.js`, new `hc-reels-native-v281.css`, the explicitly empty source JSON, smoke tests and this guide. Other pages, books, original Reel IDs and offline-media cache stay unchanged.
