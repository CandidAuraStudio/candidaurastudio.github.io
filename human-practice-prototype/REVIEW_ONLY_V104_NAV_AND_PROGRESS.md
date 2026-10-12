# HeartClear v104 — safe review before any live update
Checked: 2026-10-12. Baseline main: f35a686da8f49016d92b2b5bc071fb9723090af8.

## Changes prepared on review branch only
1. Update the service-worker registration query from v103 to v104, matching the existing v104 worker cache. No cache deletion or forced activation.
2. Expand More > Playback & offline check. The **Test playback setup** button can check all five bottom-tab DOM targets and the Human/Fear/History activity screen targets, without navigating away, playing sound, or resetting a session.
3. Stop checking the obsolete 'heartclear-v100' cache. Read the latest existing HeartClear app-shell cache without creating a stale diagnostic cache. Fix the copied diagnostic report's stale v100 heading to use the actual displayed app version.
4. No localStorage key changes, erase calls, personal note reads, history resets, media URL changes, account changes or audio autoplay.

## Source audit
- Five bottom tabs exist: Home, Practice, Sounds, Library, More. Their onclick callback functions resolve. Runtime transitions on the user's actual phone still need testing.
- Human Practice includes Passion, Movement, Observation, Attention and Sound Familiarity. History, 30-day Return and activity routes exist.
- Fear/Familiarity already uses optional *Comfortable / Unsure / Too much* words and default 15% audio level rather than a 1-10 rating. Preserve this change.
- Natural Frog recording is hosted in the existing CC0 nature media library. No sound files deleted.
- Library chapters are functional for those audio files currently mapped; other chapters remain missing, do not invent or rename them.
- Buddhist chant screen explains it has no verified chant audio; a quiet-session alternative is available. Media licensing required before publishing a new chant.
- Some ambient and Drive-backed music remain external or private with incomplete redistribution provenance. Preserve; do not copy or delete without licensing verification.
- User's private voice preview remains in private Drive, not published to public GitHub.

## Before live merge
- User must review this draft PR and explicitly approve a release.
- Run More > Playback & offline check in the review build when possible. GitHub Pages deploys only main, so this draft is not yet a live-phone preview. Do not claim real runtime tests.
- Back up existing app activity data via **More > Export my data** on the current live app. It makes a JSON copy from HeartClear localStorage; it does NOT transmit private records to GitHub/ChatGPT.
- Test Android navigation, session continuity, offline flute and frog playback, favourites, Fear optional check-in and Mini Player. Do not erase personal data or clear offline downloads.
- If main advances while this review is open, rebase/recheck the changed files against the newest main before merging.

## Automated static checks passed
- All inline JavaScript blocks parse.
- No duplicate HTML ids.
- Bottom and activity navigation target markers exist.
- No recorded media or storage key changes within this PR.
