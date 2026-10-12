# HeartClear v97 — Navigation Hotfix and Release Audit

Based on v96 commit 6c0882f3aa91ff1a0eda8788e6b924d0427fef9d. Fixed five newly introduced inline HTML onclick handlers that had literal escaped quote characters and would fail at runtime: Buddhist 5-minute timer, More → Human Practice, Sacred Sound, History, Offline. Previous HTML event handler static audit now has zero malformed single-quote escapes.

All other v96 changes retained: Sound Familiarity 6 local CC0 recordings including Frogs & Waterfall, lower volume, optional three-way comfort checks, existing saved progress and numeric history untouched; Reading opens existing English/Tamil in-app reader excerpts. No music or content deleted, no autoplay added, no personal preview published.

Automated syntax validation: 2 JavaScript blocks compile; 0 duplicate element IDs. App-shell worker cache v97, media download cache remains heartclear-media-v1. Actual phone interactions still require device testing.

Still pending: licensed Buddhist audio, additional reading works, rights verification and self-hosting remaining ambient content, explicit approval of private user's voice before app publication, offline/device/lock-screen regression tests.