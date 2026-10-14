# HeartClear v111 — User-uploaded Drive Reels source repair

Date: 2026-10-14

## Root cause
The original HeartClear Reels feature was explicitly hard-coded as a four-item silent visual preview of the existing meditation sessions (wake, noon, evening, sleep). It referenced `offlineMeditationCatalog[item.id]?.visual` and had no connection to the user's uploaded Reels Drive folder. Consequently, the user's screenshot displayed a black/silent meditation preview and a `2 / 4` counter. Those meditation videos were not the user's short-video collection.

## Correct source folder
- Reels: https://drive.google.com/drive/folders/1rBf05zVstCYf_f9GqQL_k7yDu3LL79q9
- Inventory (2026-10-14): 34 entries, all MP4.
- Included: 33 original MP4 files at least 1 MB each; stable IDs sorted by filename into a 1/33–33/33 playlist.
- Held for review: `VID-20260921-WA0000.mp4`, size 13,647 bytes. It might be incomplete; do not imply it is certainly corrupt.
- Do not mix in the older unrelated `Edit reels final` folder.
- Filenames are hashes, so this release uses neutral labels Video 01 through Video 33. Do not invent subject descriptions, voice credits or duration.

## v111 implementation
- Removed the four meditation-derived Reels items and all calls into meditation visual assets **from the Reels player only**.
- User-triggered Google Drive `file/d/<id>/preview` embedded player; original audio and Google Drive's own play/pause/seek/volume controls available when the source allows playback. A second tap within the embed may be needed.
- Explicit Load Video/Close Video button (no false promise of direct play/pause of a cross-origin iframe).
- Previous/Next buttons and vertical swipe navigation over the unloaded poster; touchscreen events over a cross-origin iframe are controlled by the iframe and may not support parent swipes.
- Open original in Drive fallback link updated for each clip.
- Switching reels or leaving the Reels screen clears the iframe source and stops any embedded playback.
- Player copy no longer describes Reels as silent previews of yoga/meditation.
- HeartClear shell cache bumped to `heartclear-v111`. Existing `heartclear-media-v1` cache namespace unchanged.
- No modifications to NIYYAH, HUMAN ATLAS, INNER VOICE or STORY ENGINE, and no deletion of existing meditation/audio/books/history features.

## Source access validation
- A small sample of files was checked via Google Drive metadata and had an **anyone/reader** permission.
- The Reels folder listed all 33 chosen videos as `shared:true`, but a full 33-file per-item permission audit was not completed because the connector reached its tool-call limit. Do not claim all files have verified anonymous access.
- Public mobile playback, codecs, Drive iframe embedding behaviour and possible Drive traffic limits require user-device verification. Google Drive may show a separate Play button and may throttle popular embedded videos.

## Passed simulated tests
- Playlist contains exactly 33 unique Drive file IDs and no practice-session records.
- Opens the Reels screen, shows `1 / 33`, does not autoplay or load media until selected.
- Loading a reel sets the chosen Drive preview URL; Next clears the old player and advances to `2 / 33`; Previous wraps from 1 to 33.
- Leaving the screen clears the iframe source.
- Per-item original file link points to the correct matching Drive file.
- JavaScript extracted from full HTML parses; static existing playback functions remain.
- Existing service-worker source parses and only the HeartClear app shell cache changes.

## Actual mobile acceptance tests (pending)
1. Refresh https://candidaurastudio.github.io/human-practice-prototype/ once; on installed PWA, close/reopen if the old `2 / 4` remains. **Do not clear site storage or uninstall before backing up personal data.**
2. Open Home → Reels; confirm counter `1 / 33` and "uploaded short", not four silent visual cards.
3. Tap Load video → play within the Drive embed, check sound, seek, pause and video motion.
4. Tap Next, Previous, Open original in Drive; confirm file IDs match.
5. Return Home; confirm no reels audio continues.
6. Confirm unrelated meditation session video/audio, mini-player, audiobooks, Sound Lab and offline features remain functional.
7. If a clip does not play embedded, test its Open in Drive link and note the corresponding Video NN for diagnosis.

## Future
Google Drive is the interim public video host. A reliable TikTok-like continuous swipe/feed/autoplay experience and automatic ingestion of newly uploaded Drive files would need an approved media delivery and catalog pipeline, not fake `<video>` URLs or bypassing Drive access controls.
