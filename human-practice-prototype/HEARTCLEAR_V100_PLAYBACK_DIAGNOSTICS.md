# HeartClear v100 / 1.1.9 — optional playback system check

Baseline commit: 78e5451faaba38ef8b0f21a789569cddb4faaa6f.
Added a compact, collapsed "Playback & offline check" in Settings / More. Runs only on button tap, with no audio or microphone activity, no personal-data uploads or account permissions. Reports client MP3/AAC decoder availability, Media Session support, existence of eight core routes, no-autoplay on Sounds audio, number of offline media cache entries, cached app shell and three same-origin audio HEAD probes (Rain, Frogs and Bansuri 10 min).
Clear wording distinguishes server responding from playback sound quality; a separate phone lock-screen test is still needed. User may copy non-sensitive summary.
No user data cleared, no existing nature/sacred/book/repository media removed, no changes to source URLs, offline cache 'heartclear-media-v1' preserved.
Build checks: 2 inline JavaScript scripts compiled, 0 duplicate IDs.
Pending: end-to-end test on Android/iOS, rights on ambient recordings, public guided voice requires permission, Buddhist source/extra reading, long offline/background test.