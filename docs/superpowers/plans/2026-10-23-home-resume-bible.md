# Home resume and Bible visibility

Goal: promote unfinished meditation into the existing top Home routine card. Keep the current time-of-day session as a compact alternative, and make the existing Bible / Genesis area recognisable.

Implementation: update hc-home-routine-v155.js to read the same clearWithinLastSession progress as More and listen to meditation playback events. Display Continue/Pause with position, using the existing inline resume and global mini-player. Do not start sound on page load. Keep Yoga and all four time choices. Hide only the duplicate legacy resume card while promoted. Show the current time session as a small button when it differs from the resumed one.

Bible: preserve the existing Genesis text, English chapter audio and English/Tamil editorial story summaries. Name the card and Home shortcut Bible · Genesis. Start a fresh user at Joseph (Genesis 37), retaining existing saved chapter choices. Do not label Tamil summaries as scripture translation.

- [ ] Add browser tests for a saved Deep Wake Up at 00:34, direct resume, current-time alternative, pause, no saved session, corrupted progress, refresh and Bible discoverability.
- [ ] Implement small module edits and matching index/service-worker revisions.
- [ ] Run existing Explore tests plus new mobile regression checks and inspect screenshots.
- [ ] Publish with a checked main-branch lease, preserving concurrent changes, and verify deployment.
