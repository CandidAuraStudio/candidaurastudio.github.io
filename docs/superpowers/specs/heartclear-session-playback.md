# HeartClear Session Playback Spec

**Status:** Approved for planning by the user on 2026-10-11.

## Goal
Make every current meditation card start reliably, and make the practice player present the corresponding video and sound as one session.

## Constraints
- Work only in `human-practice-prototype/`; do not touch the older Quiet Breath or reference prototype.
- Keep the current PWA at its existing shareable URL and preserve the four working 10-, 40-, and 60-minute practice choices, their audio URLs, and existing player controls.
- Keep the interface in English. Keep the current practice preparation and guidance.
- The app and any media hosted with it are publicly reachable.
- Keep an audio element as the playback clock for background playback and lock-screen controls where supported. The video is a synchronized, muted visual of the same source recording or edit.
- Do not put large audio/video files into the GitHub source tree.

## Required behavior
1. Tapping any current practice card opens its pre-session readiness screen.
2. Continue, skip, preparation, instructions, and the player all advance to the expected next screen.
3. A practice's visible video and audible track come from the same recording/edit. Their elapsed positions stay within one second while visible.
4. If a video cannot load or play, show a useful fallback and allow the audio practice to continue.
5. If the audio cannot load, keep the player usable and show a retryable error.
6. Existing play/pause, seek, elapsed/total time, ±10 seconds, restart, volume, sleep timer, offline-audio save, and session completion remain functional.

## Acceptance
- Verify all four cards through readiness, intro, preparation, instructions, player, and completion without waiting for a full session (use a test duration only in a non-production test fixture if available).
- Verify video time follows audio time, pauses with audio, and recovers after returning to the foreground.
- Verify missing video does not block audio; missing audio displays a clear error.
- Verify Android Chrome/PWA and iPhone Safari/PWA behavior before calling background video playback supported.
