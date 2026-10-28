# HeartClear — two verified breathwork video uploads (October 25, 2026)

## Both originals found in Google Drive

The files are in the user's **main "Meditation "** folder (Drive ID `1pFPnugHcZ1l0OqiQpM4MBFMERMLs8xq4`), not the empty "HeartClear — Breathwork (10 New Uploads)" subfolder. Earlier filename searches missed media because the connector returned no video search results; retrieving the parent folder's actual contents revealed both files.

| Requested HeartClear label | Drive original | Drive ID | Uploaded (UTC) | Exact size | Verified playback duration |
| --- | --- | --- | --- | --- | --- |
| **Deep Hold** | `videoplayback (9).mp4` | `1I-DTKONkn-cbg0n-hst0iKldgnOJ6b-J` | 2026-10-25 17:50:50 | 44,947,258 bytes | **17:11** (1031.058866 s) |
| **Resilience · 5 Rounds** | `(Resilience) Psychedelic Breathwork I 5 Rounds Of Guided Rhythmic Breathing To Increase Breath Hold.mp4` | `1JJpsuYRe792yC5FpvPsx4zyQcig-YkMM` | 2026-10-25 17:54:22 | 62,747,290 bytes | **26:29** (1589.034376 s) |

The user's estimated "30-something minutes" was checked against the actual second file: the verified running time is **26 minutes 29 seconds**, not 30-plus minutes.

## Format, source integrity and preserved sound

Both original MP4s were retrieved from the connected Drive for **read-only inspection**. Both have H.264 640×360 video and AAC 44.1-kHz **two-channel stereo** audio. No video, audio or voice was altered. No denoising, noise gates, EQ, normalization, automatic processing, audio replacement or re-encoding was applied.

- Deep Hold SHA-256: `755969e2218fc511590bf37afdecec39a024a0124c08e5a9aff19fc9b46545b1`
- Resilience SHA-256: `53678fb188bac04ee33c0d1440e25c57bf296260f64c70adf5d36988befaed8d`

The second recording's title and the user's screenshot indicate the third-party instructor **Breathe With Sandy**. Neither recording is represented as an original HeartClear-produced meditation or as owned by HeartClear.

## PR integration and release decision

The two original Drive **IDs are now grounded** in the intake JSONs. This PR is intentionally **not a public-media upload, MP3 conversion or playable HeartClear release**. Permission to redistribute the third-party audiovisual materials via a public app remains unverified. Also review breath-holding instructions for content safety before exposing them as guided sessions, particularly to younger users.

A release manager can inspect the original files without changing them:

```sh
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect deep-hold "/path/to/videoplayback (9).mp4"
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect resilience-five-rounds "/path/to/resilience.mp4"
```

The separate `--release` mode rejects unapproved public distribution, source substitutions, invalid formats and mismatched fingerprints.

**Next release-manager steps:** confirm authorization from the creator/source license and content safety, then decide whether to embed an authorized source or publish licensed audio-only media. Preserve the master MP4s. For a permitted audio-only M4A derivative, stream-copy the original AAC sound where technically possible; any MP3 is a distinct lossy derivative and must never replace the original. Confirm mobile browser, headset, mini-player, persistent progress, Android PWA, and offline behavior before merging. Do not invent direct MP3 URLs or mislabel Google Drive videos as native audio.

## Files and live status

- `media-intake/deep-hold-20261025.json` — found 17:11 source, exact Drive ID, hash, original sound details.
- `media-intake/resilience-five-rounds-20261025.json` — found 26:29 source, exact Drive ID, hash, original sound details.
- `tests/hc-deep-hold-media-gate.cjs` — checks both originals and blocks premature release.
- This handoff file.

**No main-branch modification, public publication, public video player, media deletion, filename replacement, paid service, or audio processing occurred in this feature PR.**

## Release audit — 28 October 2026

**Decision: source intake verified; public playback and distribution remain blocked.**

- The creator's [published Terms of Service](https://breathewithsandy.com/terms-of-service/) (last updated 19 October 2026) describe access as **personal, non-commercial**, prohibit unauthorized copying, streaming outside the service or public redistribution, and state that the service is intended for adults. Those terms are not a grant of permission to HeartClear.
- No written authorization or appropriately licensed original media source is on file. Copying video into Drive does not create rehosting rights. Do not expose the Drive IDs as direct public playback URLs.
- The original videos are labelled as including guided breath-holding / intensive breathwork. A qualified safety and age-appropriateness review is not recorded. Do not enable these sessions for unreviewed public audiences.
- Android/installed-PWA video playback, offline caching, persistence and mini-player behavior were **not** tested for these videos, because public playback was not authorized.
- Both intake JSONs now explicitly record missing license evidence, incomplete safety/device reviews, and `playable: false` / `source_media_url: null`. The source creator field for `videoplayback (9).mp4` is qualified as user-attributed, not independently established by the filename.
- A separate PR-only workflow `.github/workflows/heartclear-sandy-intake-gate.yml` runs `tests/hc-deep-hold-media-gate.cjs` and prints the blocked release status. The `verified-intake-not-release` GitHub Actions job **passed** at commit `13f85f4455ddfae91f3a982c87a722cfb14e6431`. This test proves the intake metadata and holds, **not** media licensing, age safety or playback.
- At this audit the branch is **14 main commits behind**; GitHub reports no file conflicts, but final integration and full release regression review still require a future coordinated release.
- No media bytes, copyrighted video/audio, playback URLs, or unsafe guided practice were added to public GitHub Pages. No `main` files, books, voices, offline media or saved progress were modified.

**Next release action only after authorization:** independently verify distribution rights covering both named works and soundtrack, and obtain written safety/age clearance. If that is achieved, plan a separate licensed integration and device-validated release; do not simply flip the two JSON booleans.
