# HeartClear v86 — Drive media audit and background playback
Date: 2026-10-11
Base: HeartClear v85, GitHub head 47035f076cc495f6edeaeb3be74f2ffe12898162

## Inspected unnamed MP4 videos
- videoplayback (4).mp4 — Drive 15bNBXKo8Jirf1v4thoA4vc7Dfqirm3bD. 25:08. Visuals show guided breathing, Round 1/2 and Round 2/2. Still under review; not added to the app because the breathing instructions haven't been checked.
- videoplayback (5).mp4 — Drive 13HiHCfsS2EH5muCrp9-v-veKOEUraHdp. 52:19. Devotional music with frame drum visual; linked under Islamic as Sufi-style music, NOT Quran.
- second videoplayback (5).mp4 — Drive 1yuimemFo27VAEkyFFlmZd8HbhX1jwWBi. Same size (122750308 bytes); possible duplicate. Duplicate identity not cryptographically verified and not listed twice.
- videoplayback (6).mp4 — Drive 1jyI0O3Tib36sKTdhohU4iQ2CbUuSJLCc. 65:38. Image states "Cortisol Reset" with Krishna playing flute. Listed Hindu instrumental; no endorsement of health claims.
- videoplayback (7).mp4 — Drive 1Ec2jsCaK-7arZZBshGMjT0BCtcMNDyZW. 451822064 bytes. Download blocked by 256 MiB connector limit. CONTENT UNKNOWN, not catalogued.
- videoplayback (8).mp4 — Drive 1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C. 120:05, visual labeled DHIKR with 12 devotional phrases. Listed under Islamic Dhikr.
  
## Background audio
- v85 Sound Lab already runs HTML audio with MediaSession, so no intentional pause-on-hidden fix was needed.
- v86 exposes a local MP4 audio-only route in Drive video viewer and Sound Lab. It uses the existing browser-native Sound Lab audio element and mini-player without uploading the file.
- Source can fail to play if Android cannot decode that particular audio stream. A locally saved MP3 or M4A is preferable.
- v86 adds a background interruption diagnostic on return to the app. It never force-plays audio after a pause or bypasses Android battery management.
- Embedded Drive iframe itself remains limited by Google's and Android's background behavior.
- Cached sources may be used offline when available; this is not a promise of unconditional offline support.

## Rights and originals
- Video files are stored already in Drive; not copied to public GitHub.
- Ownership of files in a Drive account does not establish publication or remix rights.
- Master audio synthesis and licensed flute source archive still pending separately.
