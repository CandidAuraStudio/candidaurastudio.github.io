# INNER VOICE — Prototype 01

Free, standalone mobile-first thinking companion. Independent from both HeartClear and HUMAN ATLAS.

Live address (after GitHub Pages updates): https://candidaurastudio.github.io/inner-voice/

## Features
- Voice-first capture: microphone recording, seven-minute limit, preview, discard, private save, and replay.
- Write an optional title or private text alongside the recording, or create a text-only entry.
- Choose a feeling tag (or leave it unlabelled). This is a manual label, not an AI interpretation.
- Home page offers prompts, a calm animated recording orb and recent moments.
- Searchable chronological entry collection, entry detail, individual audio export and deletion.
- Reflections use local counts and user-selected feeling tags; no diagnosis or automatic sentiment analysis.
- One-click **full JSON backup includes the audio itself** as base64 data URLs and written entries.
- Import merges valid entries from a backup. It never removes existing entries.
- Auto-saved text drafts in this browser while composing.
- Offline cache is scoped only to `/inner-voice/`; no cross-app caching.
- Responsive desktop/mobile, dark plum/coral design, reduced-motion support.
- No accounts, analytics, cloud database, subscriptions or external JS libraries.

## Data, privacy, limits
- Records are kept in an IndexedDB database named `inner-voice-private-v1`; unfinished text drafts use localStorage key `inner-voice:draft-v1`.
- Your recordings and text are never uploaded automatically. The app can only access microphone input after the user chooses Record and grants browser permission.
- Recording max 7 minutes, max 16 MB per recording, up to 150 stored entries. Full backup max 70 MB audio and backup restore file max 100 MB.
- **Backup exports contain sensitive notes and the actual voice audio**, so handle the downloaded JSON file privately.
- Unsaved audio is temporarily held in memory. Save before refreshing or closing the tab.
- Browser data clearing, changing devices or uninstalling may destroy unexported recordings. No sync.
- Background playback and recording while the browser is closed are not guaranteed.
- Voice recording depends on browser MediaRecorder support; test on Android Chrome and iPhone Safari.
- The SVG icon is used by supporting browsers; full PWA install and offline behavior need device testing.

## Repository isolation
This release only adds new files under `inner-voice/`. All HeartClear files under `human-practice-prototype/` and all HUMAN ATLAS files under `human-atlas/` are unchanged.

## Manual acceptance checks
1. Open the website on Android Chrome, tap Record, grant the microphone, speak for 5 seconds, Stop, preview audio, add text, Save moment.
2. Open your moment and play it; download the audio file.
3. Type a text-only moment, select a feeling, save, and search the library.
4. Export full backup. After saving it somewhere safe, import the same backup to ensure duplicates are skipped.
5. Test navigation on small screens and retry after closing/reopening the app.
6. Test the offline app after its service worker has installed, and confirm HeartClear/HUMAN ATLAS still load as before.
