# HeartClear 1.0.0 — Production Readiness Record

**Release branch:** `release/heartclear-v82-production-readiness`  
**Existing installed-app URL:** https://candidaurastudio.github.io/human-practice-prototype/  
**Release identifier:** HeartClear 1.0.0 (SW/app-shell cache v82)  
**Release approach:** Preserve the existing app route, PWA scope, user data and cached media. The folder name is a legacy implementation detail; migrating it without redirection and storage planning would break installed copies.

## Changes in this pass

- Public name and metadata: HeartClear, without “prototype” in UI.
- Remove unfinished-content notices from active sections; retain meaningful explanation and tradition-specific distinctions.
- Add legible privacy explanation with user-driven JSON export and double-confirmation local personal-data deletion.
- Keep cached offline audio untouched when personal data is cleared; separate Offline > Clear action.
- Improve navigation label legibility, visible keyboard focus, minimum player button sizes, and OS-level reduced-motion support.
- Keep sound playback, reflection, Sacred Sound, books, Fear, Sound Lab, voice notes, offline and universal mini-player working by preserving their original assets.
- Service worker: independent v82 app shell, preserve `heartclear-media-v1`, cache install assets opportunistically, ignore non-GET requests.

## Checks required before treating as fully production validated

1. Confirm no syntax exceptions on Android Chrome and iPhone Safari.
2. Install update from existing v81 **without clearing the media cache or bookmarks**.
3. Open meditation (10/40/60 min) and verify video + audio, prelude/aftercare, pause, seek, Finish, volume and sleep timer.
4. Minimize and lock screen for 5, 15 and 30 minutes while playing Sound Lab, a meditation, Islamic Adhkar and audiobooks. Verify actual OS behavior. Browser background service is not guaranteed by the web platform.
5. Check auto-next on short Sound Lab recordings while unlocked and while locked; confirm manual Pause and Stop do not auto-resume.
6. Save audio and audiobook chapters offline; airplane mode, restart, then test Range seeking from the middle. Confirm URL/CORS restrictions for externally hosted recordings.
7. Favourites / private notes / Mood / 7-Day Starter persist across app restart; export data; erase and verify correct reset, download retention.
8. Check private Sufi personal-file playback in browser. Third-party Drive files may not be publicly distributed without rights.
9. Verify icon/install prompts, browser Back, orientation, narrow 320px screens, floating mini-player, reduced motion and WCAG keyboard accessibility.
10. Run Lighthouse/audit and record startup time, audio first-byte time and compressions on live hosting and a slow 4G emulation; no verified performance score has been supplied yet.

## Audio status and rights gates

- The 7/10/15-minute rain + tree-wind + very soft recorded thunder MP3s are private, **review-only** files in Google Drive `HeartClear Headphone Auditions Round 2`.
- The 10- and 15-minute variants crossfade multiple segments of the original 7-minute CC0-source mix, so **do not** claim they are independent non-repeating field recordings.
- No unverified metal-roof rain or rocky-shore sounds are claimed in these files.
- Five new files in the user's Meditation folder require exact content identification and rights review before public inclusion, especially songs associated with third-party artists.
- Earlier app media must also have distribution rights reviewed before a commercial or broadly marketed release.

## Release decision

Code syntax/static checks alone do not establish phone compatibility, legal distribution rights, measured speed or zero-buffering guarantees. Do not claim “all tests passed” without real-device evidence. Preserve the previous release in Git history and rollback by reverting the release commit, **not by deleting user caches or migrating to an old app snapshot**.
