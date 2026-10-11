# HeartClear Session Playback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix meditation entry and make its video visual and audible source match while preserving the current player.

**Architecture:** Keep the existing PWA and audio-first player. Fix the transition from a library card into the session flow, then harden intro/practice video loading and synchronization with visible fallbacks.

**Tech Stack:** HTML, CSS, browser JavaScript, Service Worker, GitHub Pages.

**Spec:** `docs/superpowers/specs/heartclear-session-playback.md`

## Global Constraints
- Edit only `human-practice-prototype/index.html` and `human-practice-prototype/sw.js`.
- Preserve the current practice audio URLs, durations, player controls, and preparation flow.
- Keep video visual-only and muted; pair it with audio from the same recording/edit.
- Preserve background audio and Media Session controls where the browser supports them.
- Do not add large media files to the repository.

## Review Focus
- Practice-card tap reaches readiness instead of silently leaving the library; verify all four cards.
- Intro video rejected or missing; verify skip and fallback both advance.
- Practice visual rejected or missing; verify audio controls remain usable.
- Audio network error; verify the player shows a retry path.
- App background/foreground transition; verify visual resynchronizes without restarting audio.

---

### Task 1: Reproduce and fix practice selection

**Files:**
- Modify: `human-practice-prototype/index.html`
- Test: live browser acceptance steps below

**Interfaces:**
- Consumes: current inline `choosePractice(seconds, url, kicker, title, introUrl, visualUrl)`.
- Produces: each library card reaches `sessionReady` and populates the expected session metadata.

- [ ] **Step 1: Capture the failing interaction** — open the Meditation list and tap each of the four practice cards; record whether `sessionReady` opens.
- [ ] **Step 2: Trace the failing call path** — inspect browser console errors and the `choosePractice → preparePlayer → showSessionReady` path; identify the first thrown error.
- [ ] **Step 3: Add the smallest regression guard** — add a browser-level smoke check for card activation and expected session title/duration.
- [ ] **Step 4: Fix the identified failure** — preserve the current practice records and fix only the failing event/path.
- [ ] **Step 5: Verify all four cards** — each reaches readiness and the correct session metadata is shown.

### Task 2: Make video loading resilient

**Files:**
- Modify: `human-practice-prototype/index.html`
- Test: mobile browser acceptance

**Interfaces:**
- Consumes: `chosenIntroUrl`, `chosenVisualUrl`, `audio.currentTime`.
- Produces: `startIntro()`, `finishIntro()`, and `syncPracticeVisual(force)` with explicit load/error state.

- [ ] **Step 1: Test intro success and failure** — confirm successful intro advances on end and failed intro exposes a working Continue action.
- [ ] **Step 2: Test practice visual synchronization** — confirm pause, seek, restart, and foreground return stay within one second of audio.
- [ ] **Step 3: Implement visible video fallback** — report loading/error state and preserve audio-only playback.
- [ ] **Step 4: Verify on Android Chrome/PWA and iPhone Safari/PWA** — test controls and foreground behavior; document any OS limitation.

### Task 3: Final regression pass

**Files:**
- Verify: `human-practice-prototype/index.html`, `human-practice-prototype/sw.js`

- [ ] Verify current audio URLs and player controls remain unchanged.
- [ ] Increment the app cache version only when the app-shell code changes.
- [ ] Verify the live update banner and refresh behavior for the installed PWA.
