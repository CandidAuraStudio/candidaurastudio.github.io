# HeartClear — single-video intake

**Requested label:** Deep Hold (requested display: 17 min)
**Original filename from user screenshot:** `videoplayback (9).mp4` (about 44.95 MB according to the phone file picker).

## Verified in this intake
- The canonical master specification, latest `main` and open PRs were reviewed.
- The connected Drive search did not return a file named `videoplayback (9).mp4`. The HeartClear Breathwork folder visible in the connected account was empty.
- The only original `videoplayback` MP4 made available to this conversation by a connected Drive fetch was `videoplayback (8).mp4` (265,105,056 bytes; 2:00:05), the **existing Islamic Dhikr extended playlist**, which is unrelated to Deep Hold and MUST NOT be substituted for it.
- No binary or direct media URL for Deep Hold has been verified, so the JSON in this PR is deliberately nonplayable and is **not loaded by the app**.

## Preservation / release gate
- Do not alter source voice, background audio, tempo, fidelity, or video; no noise suppression or filtering is requested.
- Do not invent a Google Drive ID, public MP4 URL, MP3, or duration metadata; the name and 17-minute label are user-requested, not confirmed by video inspection.
- Confirm redistribution permission and review the recording's content suitability before publishing.
- Do not create a visible Play button until the exact, permitted source is present and verified.
- Release manager to coordinate any future integration; no changes to live app, offline media, existing player, or stored progress in this PR.

**This is a verified-intake PR, not a claim that a video has been uploaded or published.**


## Source identity / media checks added

The phone screenshots identify the source as `videoplayback (9).mp4` (displayed approximately 44.95 MB) and show the public creator **Breathe With Sandy** and a video described as **(Resilience) Psychedelic Breathwork — 5 Rounds**. This identifies what to look for, **not proof of its Drive ID, running time, or redistribution authorization**. The temporary HeartClear title remains the short **Deep Hold**.

Run from the repository root:

```bash
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect "/path/to/videoplayback (9).mp4"
node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --release "/path/to/videoplayback (9).mp4"
```

The first command checks that the intake is honest. The second **reads but does not edit** the actual file and reports SHA-256, video codec, audio codec, duration, and channel/sample-rate information. The release command blocks missing media, missing rights verification, missing release review, or a mismatched approved hash/duration.

**Sound fidelity:** Leave the original MP4 audio, soundtrack, ambient/background sound, and timing untouched. Do not apply noise cancellation, normalization, filters, or voice replacement. If an audio-only version is permitted, prefer stream-copying the existing compatible AAC track into M4A without re-encoding; any requested MP3 is a separate derived copy and must not replace the master. Do not label an MP3 lossless.

**Not yet complete:** No Deep Hold video is in the project; no exact file ID or direct streaming source is confirmed; a 17-minute runtime is only the user's requested label; the source-creator's redistribution authorization has not been verified. Do not add a visible/broken Play button. Integrate only after the authorized media and Android mobile playback checks pass.
