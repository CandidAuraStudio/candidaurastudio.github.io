# HeartClear Library and Settings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing public PWA's library extensible and make its visual and data settings work as clear, persistent controls.

**Architecture:** Introduce a data-driven catalog within the existing app structure, preserving current IDs and URLs. Extend Settings with independent blur and motion preferences, an end-sound default, and local-data controls.

**Tech Stack:** HTML, CSS, browser JavaScript, localStorage, Service Worker.

**Spec:** `docs/superpowers/specs/heartclear-library-settings.md`

## Global Constraints
- Edit only `human-practice-prototype/index.html`, `human-practice-prototype/manifest.webmanifest`, and `human-practice-prototype/sw.js`.
- Keep the existing install URL and public access.
- Preserve current practice records and all working controls.
- Keep English UI text and no language selector.
- Keep user preferences, favorites, and history on-device.
- Do not claim public media or the public app is private.

## Review Focus
- Older localStorage values missing; use defaults without breaking the app.
- User has reduced motion enabled; preserve it independently from blur.
- User turns blur off; all frosted UI surfaces lose blur consistently.
- Browser storage unavailable; settings still render and show a clear limitation.
- Narrow mobile display with dynamic text; controls remain reachable and labeled.

---

### Task 1: Define reusable library records

**Files:**
- Modify: `human-practice-prototype/index.html`
- Test: library rendering and media URL acceptance

**Interfaces:**
- Produces: `PRACTICES` array records with `id, title, subtitle, category, durationSeconds, audioUrl, introUrl, visualUrl, closingSoundId`.

- [ ] **Step 1: Record current catalog** — preserve the four current durations, titles, and exact URLs.
- [ ] **Step 2: Render catalog from data** — remove per-card hardcoded media arguments while preserving visible card labels and behavior.
- [ ] **Step 3: Verify extensibility** — add a temporary fixture record in a test build and confirm it renders through the same card flow.
- [ ] **Step 4: Verify current choices** — confirm all existing entries preserve their exact media mappings.

### Task 2: Add explicit blur and motion controls

**Files:**
- Modify: `human-practice-prototype/index.html`

- [ ] **Step 1: Add independent settings controls** — use accessible switch labels and expose checked state.
- [ ] **Step 2: Bind blur preference** — disabled blur removes backdrop filtering app-wide; enabled blur restores the current setting.
- [ ] **Step 3: Preserve reduced-motion behavior** — keep animation/transition changes separate from blur.
- [ ] **Step 4: Verify persistence** — toggle both controls independently, reload, and verify both states.

### Task 3: Round out settings and update PWA cache

**Files:**
- Modify: `human-practice-prototype/index.html`, `human-practice-prototype/sw.js`

- [ ] **Step 1: Add local-data controls** — export history/preferences and clear selected data with an explicit summary before clearing.
- [ ] **Step 2: Add closing-sound default** — connect Settings to the closing-sound preference from `heartclear-closing-sound.md`.
- [ ] **Step 3: Verify install metadata** — preserve app name and short name; confirm icon and standalone display remain valid.
- [ ] **Step 4: Bump service-worker cache version** — use a new `heartclear-v57` cache only with app-shell changes.
- [ ] **Step 5: Verify install update** — live PWA reports update and the installed app receives the new shell without losing the separate media cache.
