# HeartClear Closing Sound Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a selected nature/stillness sound continue after a guided session with a graceful autoplay fallback.

**Architecture:** Extend the completion flow with a local closing-sound preference and a bounded-duration player. Use only real, credited media assets; keep the guided session's completion and minutes independent.

**Tech Stack:** HTML, CSS, browser JavaScript, Web Audio/HTML media, localStorage, Service Worker.

**Spec:** `docs/superpowers/specs/heartclear-closing-sound.md`

## Global Constraints
- Edit only `human-practice-prototype/index.html`, `human-practice-prototype/sw.js`, and source credits for audio assets.
- Do not fabricate natural recordings; list source and license in `CREDITS.md`.
- Closing sound does not add to guided-session minutes.
- Keep manual one-tap fallback for blocked autoplay.

## Review Focus
- Autoplay blocked on iPhone; show the continuation button.
- Session end fires twice; start the closing track only once.
- User chooses Silence; completion remains silent.
- Closing track exceeds selected duration; stop at the chosen boundary with a fade.
- Closing track is unavailable offline; explain that and retain online playback/retry.

---

### Task 1: Add closing-sound catalog and preference

**Files:**
- Modify: `human-practice-prototype/index.html`
- Test: settings/completion browser acceptance

**Interfaces:**
- Produces: `CLOSING_SOUNDS` records with `id, title, src, credits, loopable`; local preference `heartclearClosingSound` and duration `heartclearClosingMinutes`.

- [ ] **Step 1: Define available playable assets** — include only supplied/cleared audio with known URLs and matching source/license credits.
- [ ] **Step 2: Verify Silence and selected-sound choices** — confirm the preference persists after reload.
- [ ] **Step 3: Render available choices** — do not render missing-asset placeholders.

### Task 2: Add completion transition and bounded player

**Files:**
- Modify: `human-practice-prototype/index.html`
- Test: autoplay-permitted and autoplay-blocked browser acceptance

**Interfaces:**
- Consumes: the catalog and local preference from Task 1.
- Produces: `startClosingSound()`, `stopClosingSound()`, and an idempotent completion transition.

- [ ] **Step 1: Verify current manual completion audio** — retain existing 2-minute stillness asset as a selectable sound.
- [ ] **Step 2: Implement automatic continuation** — use the same audio playback chain after guided audio ends; show one-tap fallback if play is rejected.
- [ ] **Step 3: Implement bounded loop and fade** — support 2/5/10 minutes, loop smoothly, and fade down before stop.
- [ ] **Step 4: Verify minutes/history** — ending ambience never changes guided duration or completion history.

### Task 3: Credits, offline, and mobile verification

**Files:**
- Modify: `human-practice-prototype/CREDITS.md` (create if absent)
- Modify: `human-practice-prototype/sw.js` only if caching behavior changes

- [ ] Verify attribution and license for each selectable sound.
- [ ] Verify online playback, saved playback where supported, and unavailable-media message.
- [ ] Verify iPhone/Android autoplay transition and fallback.
