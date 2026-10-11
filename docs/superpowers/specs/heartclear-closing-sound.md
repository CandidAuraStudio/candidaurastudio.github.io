# HeartClear Closing Sound Spec

**Status:** Approved for planning by the user on 2026-10-11.

## Goal
Offer an optional, gentle nature/stillness track that begins after the guided practice, with reliable controls and a user gesture fallback.

## Constraints
- Use recordings the user owns or sources licensed for commercial use; keep a `CREDITS.md` entry for every delivered source.
- Do not synthesize or imitate natural recordings such as birds, fire, ocean, insects, wind, or animals.
- Keep the closing track separate from the guided-session duration and progress record.
- Reuse mobile-friendly playback and do not promise autoplay or background playback on devices that block it.

## Required behavior
1. A user can choose a closing sound (or Silence) and a 2-, 5-, or 10-minute duration; the user's selection is saved locally.
2. At the end of a guided practice, the selected closing sound starts automatically when the browser permits it.
3. If automatic continuation is blocked, show a clear one-tap “Continue with stillness” action.
4. Closing playback has play/pause, elapsed time, remaining time, stop, and loop-until-duration behavior.
5. Stopping the closing track returns the user to the completion screen without changing the recorded guided-session minutes.
6. The sound library only shows choices whose media assets are actually available; do not show placeholder bird/fire/ocean choices as playable.

## Acceptance
- Test Silence, each configured sound, and each duration.
- Test browser autoplay blocked and permitted paths.
- Confirm the end transition happens once, does not replay after Stop, and does not alter the guided-session completion record.
