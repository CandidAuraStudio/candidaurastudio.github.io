# HeartClear v109 — Navigation, Fear, Progress and Service Worker Review
Review date: 2026-10-14
Baseline live main: ce5e98191829ef2f209cf2c1955fa6dce8550538
Review branch: review/heartclear-v109-audit-20261014

## Findings verified from latest GitHub source (not a real-device test)
- Live release: HeartClear 1.2.8, application-shell cache heartclear-v109, GitHub Pages workflow deployment successful for live main.
- Application source has 35 screen containers and 5 bottom-navigation destinations: Home, Practice, Sounds, Library, More.
- All literal show()/navTo() destinations exist; on-click functions referenced in static HTML are defined. Both inline JS blocks pass syntax compilation. No duplicate HTML IDs found.
- Previously noted service-worker query was stale: app cached v109 but registered ./sw.js?v=107. This review branch changes **only** the registration query to ./sw.js?v=109. Live main is left unchanged.
- Fear assessment was already reduced in latest main to an OPTIONAL disclosure. Choices are "Comfortable", "Unsure", "Too much" (0/2/4 stored for backwards compatibility). Sound intensity starts at 15% and slider range is 0–40%. Existing heartclearFearStats history is preserved.
- Activity and listening data remain in device localStorage. Verified storage keys and paths: clearWithinHistory, heartclearFearStats, heartclearReturnJourney, heartclearRecentMixV1, book position and favourites. No migration or erase code added in this review branch.
- App currently recommends and allows up to three simultaneous nature mixer layers. This is the latest main state and was not altered. Older v92 temporarily supported six layers; do not overwrite newer stability changes automatically.
- Free Books currently links to existing English/Tamil reading excerpts. A larger verified free-book catalogue is not complete.
- Buddhist page currently has meaning/context and a 5-minute quiet practice, but a licensed chant recording is still not in the audio collection.
- Three flute editions and the archived nature tracks were previously hosted in media. The owner's private voice demos remain in Drive and were not published in this update.

## Pending for an actual sign-off
1. Real Android and iPhone end-to-end playback, foreground/background, lock-screen, downloads and offline transitions.
2. Tap-through QA of all 35 screens, especially feature access when coming back from immersive players; check visual design and accessibility at narrow widths.
3. Test history, 30-Day Return, Fear stats, audiobook positions and favourites across app restart and upgrade using a device with existing progress.
4. Verify external Google Drive video permissions and playback and preserve owner-held media rights. Do not auto-copy non-CC0 music into public storage.
5. Review the separate guest/profile consent feature branch and any project-specific Supabase setup before applying it to public main.
6. Buddhist chant media rights; extended audio library and private narration consent for public release.

## Non-destructive constraints
No media files removed. No cache key rename. No history/progress deletion. No public app update performed by this review. Require user review before merging to main.
