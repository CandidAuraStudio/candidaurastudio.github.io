# Original 2-hour Islamic Dhikr — audio-only handoff

**PR review candidate, not a deployed audio release.**

## Source verified
- User-connected Google Drive item: `1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C`
- Original name: `videoplayback (8).mp4`
- Original format: 265,105,056-byte MP4 with H.264 video and AAC 48 kbps, stereo, 44.1 kHz audio.
- Exact audio extracted by stream copy (`ffmpeg -i input.mp4 -map 0:a:0 -vn -c:a copy`), with no audio re-encoding or replacement:
  - **Filename:** `HeartClear_Islamic_Dhikr_Extended_120min_audio.m4a`
  - **Size:** 43,853,474 bytes
  - **Duration:** 7,205.198367 seconds (2:00:05)
  - **SHA-256:** `cf21034cd8394d85117e8d9c922f86f720416594462423455e5e07d1dc9de92f`
- The extracted file was provided to the user in the ChatGPT conversation. **It is not yet committed to this branch**, and an expiring ChatGPT asset URL must not be hardcoded into the PWA.

## Publishing gate for release manager
1. Confirm the original uploader's **public redistribution rights** before making the derivative publicly downloadable. Do not replace the original video, alter its Drive permissions, or copy unrelated devotional recordings.
2. If approved, upload the exact M4A with the checksum above into `human-practice-prototype/media/voice/HeartClear_Islamic_Dhikr_Extended_120min_audio.m4a` through an authorized binary GitHub upload or approved static storage/CDN. GitHub Pages is a public host; a private-only recording must use an access-controlled service and an appropriate playback design instead.
3. Verify the live public file responds to an HTTP HEAD request with a successful status and `audio/mp4`/audio-compatible Content-Type, serves the full **original** audio bytes, supports Android Chrome range seeking, and has explicit permission to be served.
4. The dedicated `hc-dhikr-audio-v283.js` player adapter connects to the **existing** `soundLabAudio` native player only if this exact file can be verified. Until that point the Listening/Sacred cards clearly say **Audio pending**, not Video; they must not open Drive previews or silently substitute Akmal's separate 24:32 recording.
5. Keep `heartclear-media-v1`, all saved positions, Drive IDs, and the Akmal M4A unchanged. Do not precache the 43.85 MB recording in the app shell. Offline downloads are a separate user-controlled workflow.
6. Run the v283 regression, repository release contracts, 360px Android Chrome/PWA click → Play → minimize → Home/Listen → seek ±15s → app background/return, and test correct label and original content length.

## Scope
This resolves the **wrong video routing** for `islamDhir120` in both All Listening and Sacred Sound. Native playback becomes enabled when the exact audio asset is deployed. No file was deleted, renamed, replaced or published as part of this PR.

**Important:** A Google Drive video preview or drive download URL is **not** a reliable public HTML5 audio source and must not be substituted as `<audio src>`.
