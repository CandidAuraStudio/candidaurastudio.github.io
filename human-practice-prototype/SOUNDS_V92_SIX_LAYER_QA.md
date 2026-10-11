# HeartClear 1.1.1 / v92 — six-layer mixer
Baseline v91 commit: 407b7a04b22f73b896440e815908c81f8c3c58bc
Supports up to 6 simultaneous nature sources: Rain, Fire, Birds, Ocean, Wind and Thunder.
1–3 layers remain recommended for reliable phone performance; the previous 3-layer default and volumes are unchanged.
For >3 layers, per-deck output gain uses 0.48*(3/N). Six layers use 0.24 per deck before user volume slider and fade.
Saved recent mixes can restore up to six layers. Existing sound loop, background audio and timer implementation preserved.
No self-hosted new audio, true-peak limiter or overlapping sample-accurate crossfades were added. Network streams may fail independently.
JavaScript inline parse checks passed: 2. Duplicate DOM IDs: 0.
Browser/Android six-stream playback and 15/30/60-minute fade need a new phone test.
No other media source, app section, data storage or MEDIA_CACHE was changed.