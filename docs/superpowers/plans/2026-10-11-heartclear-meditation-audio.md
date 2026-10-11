# HeartClear Meditation Audio Repair Implementation Plan

> **For agentic workers:** Execute inline with superpowers:executing-plans. The user's request authorizes repair and verification in this session.

**Goal:** Repair meditation playback issues on the current source while preserving every existing player, saved position, navigation flow and design.

**Architecture:** Keep the existing single meditation audio element and synchronized muted video. Add explicit intro retry and visible quiet-volume recovery; correct picture-in-picture synchronization without altering source media.

**Tech Stack:** Static HTML/CSS/JavaScript, Service Worker, Playwright, ffmpeg/ffprobe.

**Spec:** User's current request and supplied HeartClear final UX/audio blueprint. The audio-production batch is outside this playback-repair task.

## Global Constraints

- Base: main commit 3d183b8a68d38cc7d4cf93d635309027211178b6, displayed v76.
- Target v77 or newer only after verification; never restore earlier app versions.
- Keep original meditation, narration, books, all feature screens and dark floating design.
- Preserve heartclear-media-v1, history and all existing progress storage keys.
- Keep Play/Finish white, dedicated Offline access, separate Home continuation cards, exact audiobook bookmarks.

## Review Focus

- Autoplay denial must leave a working user gesture to start the intro or meditation.
- Zero saved volume must be visible and recoverable without silently changing user preference.
- Starting another meditation after a faded ambience must restore the selected volume.
- PiP must remain synchronized while navigating or hiding the page; ordinary video must pause while hidden.
- Audiobook chapter switches, reload and backgrounding must preserve fractional positions.

### Task 1: Meditation playback recovery

Files: human-practice-prototype/index.html; tests/heartclear-playback.cjs.

- [x] Reproduce the existing intro retry, volume and PiP failures using the current source.
- [x] Add failing browser tests for the confirmed behaviors.
- [x] Add explicit intro Play retry, accurate silent-intro copy, zero-volume recovery and configured-volume restoration.
- [x] Correct hidden/off-player synchronization with PiP awareness.
- [x] Run browser tests for all four meditation sources and player controls.

### Task 2: Regressions and release

Files: tests/heartclear-playback.cjs; human-practice-prototype/sw.js; docs/heartclear-v77-verification.md.

- [x] Verify audiobook exact resume/chapter switching, Home continuation, white controls, Offline download and range seeking, feature navigation and Reduce Motion.
- [x] Verify preserved media/source URLs and history keys; report actual browser/device limits.
- [x] Recheck remote main for concurrent changes and integrate safely if necessary.
- [x] Bump display/cache/worker registration together only after checks pass; rerun tests.
- [ ] Publish the verified repair and inspect deployment status and live version.
