# HeartClear v77 playback repair and verification

Date: 2026-10-11. Base: main commit `3d183b8a68d38cc7d4cf93d635309027211178b6` (v76). App: `human-practice-prototype/`.

## What changed

1. Added a visible **Sound is off / Restore sound** action when the meditation element is muted or its app volume is zero. Restoring sound unmutes the element and uses the selected volume, or 85% when the selected volume is zero. User preference stays unchanged until the action is pressed.
2. A new meditation restores the selected slider volume instead of inheriting the temporary attenuation from a closing ambience fade. Finishing ambience also preserves an intentional zero-volume selection.
3. Volume adjustments during a closing fade save the selected level, not the temporarily attenuated playback level. The reproduced failure saved 0.3 when the user selected 0.6; the repaired test saves 0.6.
4. Added an explicit white **Play introduction** retry button for browser autoplay denial. A successful click or scroll/touch recovery dismisses the retry state.
5. Intro copy now states that the short video is a visual introduction and guided audio starts afterward. All four existing eight-second intro MP4 files contain H.264 video and **no audio stream**; no narration was invented or original content altered.
6. Centralized meditation visual synchronization so PiP keeps moving while navigating or hiding the page. Ordinary video pauses outside the player/in the background, while the separate audio continues.
7. Aligned the displayed version, service-worker registration query and shell cache to v77 only after the pre-version regression gate passed. The persistent `heartclear-media-v1` cache remains unchanged.

## Existing behavior preserved and checked

- White Play/Finish controls in meditation, audiobook, Sacred, Fear, Sound Lab and aftercare.
- Player Download offline/My Offline actions and the Home Offline access point.
- Separate Home Continue Meditation and Continue Audiobook/Library cards.
- Exact fractional audiobook positions across pause, chapter switches and reload; checks included 37.625 and 7.125 seconds.
- Universal mini-player navigation, play/pause and seeking.
- Saved offline media, byte-range seeking, app shell reopening and the preparation flow.
- Sacred Sound, Human Practice, Fear, Sound Lab, Library, History and Settings navigation.
- History retention, Reduce Motion persistence and browser/iPhone install instructions.
- All **35 existing remote audio/video URLs** and all **26 feature screen IDs** match the v76 source. No source media, audiobook content, narration or working feature was removed. The dark floating design was retained.

## Automated evidence

`node tests/heartclear-playback.cjs`: **14 test groups passed**, zero failures, before and after the version bump. The suite uses Playwright Chromium, the existing stillness MP3 as deterministic audio, and a generated test-only WebM visual; production assets are never replaced.

The original source failed four new reproductions: zero-volume recovery absent; faded volume leaked into meditation; intro retry action absent; regular timer paused hidden PiP. The closing-fade preference test also failed before its repair, and the intro recovery-state test failed before its repair. All pass on v77.

A separate live-source run with the service worker active verified that each actual meditation MP3 decoded, advanced playback, stayed unmuted at 85%, paused, and sought beyond 30 seconds without a media error:

| Session | Reported duration | Result |
| --- | ---: | --- |
| Deep Wake Up | 600 seconds | PASS |
| Noon Reset | 2400 seconds | PASS |
| Evening Release | 3600 seconds | PASS |
| Deep Sleep | 3600 seconds | PASS |

The source endpoint checks returned audio/mpeg or video/mp4 and supported HTTP 206 ranges. A request with an Origin header received `Access-Control-Allow-Origin: *`. FFprobe confirmed MP3 audio streams; opening audio samples had nonzero measured sound. Four intro files were confirmed to contain video only.

App and service-worker JavaScript parse successfully. `git diff --check` passed. An independent review found no remaining Critical/Important issue; its volume-persistence finding and minor intro recovery-state finding were fixed with failing-then-passing tests.

## Limits of verification

- Automated hidden-page and PiP tests simulate the browser state. Physical screen locking, background suspension and actual PiP on Akmal's Android device or an iPhone were **NOT TESTED**.
- iPhone installation guidance was checked with a Safari user-agent fixture; installation on a physical iPhone was **NOT TESTED**.
- The attempted Linux WebKit run could not reliably decode the test media in this environment; it is **NOT a passing Safari certification**.
- Live stream checks are playback/seek samples, not a full uninterrupted 40/60-minute listening test.
- The new multi-theme audio-production/Drive batch in the attached blueprint is outside this playback-repair request and was not created, uploaded or claimed complete.

## Repeating the tests

Requires Node.js, Playwright with Chromium installed, and ffmpeg. With the usual Playwright browser installation:

```bash
node tests/heartclear-playback.cjs
HEARTCLEAR_LIVE=1 HEARTCLEAR_LIVE_WITH_SW=1 node tests/heartclear-playback.cjs
```

Set `HEARTCLEAR_BROWSER` to a Chromium executable when using a custom browser installation. The test server is local and ephemeral. A network proxy in the development environment may require the test-only certificate override already included in the Chromium launch arguments.
