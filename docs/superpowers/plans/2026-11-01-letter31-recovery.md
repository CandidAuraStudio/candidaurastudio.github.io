# Letter 31 recovery plan and release ledger

**Spec:** User's Safe Recovery and Release Instructions, 1 November 2026; HEARTCLEAR_MASTER_SPEC.md.
**Goal:** Recover the complete transmitted Arabic Letter 31, a single responsive reader, three entry points, attribution, and truthful English access without changing existing content.
**Architecture:** Retain the reader/data recovered from closed PR #53 in draft #72 (created from main 8cb42e3). Apply the three small navigation additions to current main files. Precache the reader and text and add its exact offline navigation fallback. Keep English external; no established redistribution permission.
**Tech:** Existing static HTML/JavaScript, service worker, Node contracts, Playwright Chromium.

## Constraints
- One focused PR; no force-push, main overwrite, obsolete PR reopening, or unverified publication.
- Preserve books, recordings, translations, saved progress, existing design and heartclear-media-v1.
- Device review is a merge gate. Desktop Chromium mobile emulation is not physical Android review.
- PR #73 overlaps index.html/sw.js; keep it separate and refresh comparison before merge.

## Tasks
- [x] Recover source contract, demonstrate missing navigation failure, add three canonical links, rerun contract.
- [x] Compare all Arabic tokens with pinned upstream Letter 31; check English attribution and source reuse terms.
- [x] Add browser tests for all paths, RTL/narrow layout, English link, separate notes, history preservation, and offline navigation. Demonstrate offline failure before fixing service worker.
- [x] Coordinate app label, changed script URL, service worker precache/registration/cache version without changing media cache.
- [x] Run current navigation, scoped contracts and reader browser tests; inspect screenshots, final diff and GitHub checks. All 11 PR checks passed on 97c111d; rerun/check after the recovery-edge fix below.
- [ ] Hold draft for physical Android/installed-PWA review. Merge and verify Pages only after all gates pass.

## Review focus
Direct offline reader navigation must not serve the home page; English external source needs internet; note persistence must survive reload without touching existing keys; missing optional network assets must not block the app shell; all three paths must share one canonical reader.

## Decisions
- Continue the already-open focused recovery #72 rather than duplicate it. It descends from the latest main and preserves the user's one-focused-PR rule.
- Use v292 for the coordinated recovery shell because separate draft #73 proposes v291. Neither number denotes a release until merged and verified.

## Verification and review ledger
- Contract RED: missing Human Knowledge link. GREEN: three canonical paths restored; exact Arabic hash/count protected.
- Offline RED: reader absent from cache. GREEN: reader + text precached and reader-specific fallback implemented.
- Local static suite: 14 pass; 2 failures reproduced on untouched main: deep-pages-theme-v284 expects the removed hcReelsBottomTabGuard, and nature-handoff-choice-v287 uses a test double without practiceVisual.pause(). Preserve these baseline failures in reporting; no unrelated runtime repair.
- Final independent read-only review: no critical findings; one important transient-download recovery defect. Added regression: fail optional Arabic install, succeed online retry, retry offline → 504 (RED). Exact local data URL now writes a successful online response to the app cache; retry offline → 200 (GREEN). Full local static result remains 14 pass / 2 disclosed baseline failures.
- Reviewed GitHub Chromium screenshots; adjusted captures to show actual Arabic paragraphs and the English panel, rather than just the long introduction. Physical Android/installed-PWA update review remains incomplete.
- Review rulings: historical authenticity is limited to agreement with cited recension, explicitly labelled; English translation quality is not certified or reproduced, external source is accessible and credited; redistribution permission is unestablished and no English copy is stored; physical-device and installed-PWA review remain release blockers.
- No deferred minor findings. No merge, no deployment, no published reader claimed.
