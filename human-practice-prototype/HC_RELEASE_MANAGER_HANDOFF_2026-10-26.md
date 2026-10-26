# HeartClear — release manager handoff and owner action list
**As checked:** 2026-10-26. **Authoritative spec:** `HEARTCLEAR_MASTER_SPEC.md`.
**Current main after CI fix:** `f9689b4bfdb54cd1c6874c8f0e1bfb96b2826a3e`, HeartClear v285.
**Publishing status:** GitHub Pages previously published v285 in run `40276524768`. A new Pages deployment for the PR #56 merge was started (run `40279170088`); verify completion before calling that particular deployment published.
**Policy:** One release manager integrates; this document creates **no runtime or deployment changes**.

## PR identity and release status
- **PR #57 — merged:** compact Explorer / Human Knowledge cinematic test update. Its Pages deployment succeeded; do not reopen or deploy an older duplicate.
- **PR #54 — merged:** original charcoal Explorer and Human Knowledge source-level styles.
- **PR #56 — MERGED:** Mind Game CI fix merged at `f9689b4bfdb54cd1c6874c8f0e1bfb96b2826a3e`. Mind Game Actions run `40279170080` **passed** on `main`; no owner action required for #56.
- **PR #59:** GitHub returns **404** for PR #59 and issue #59 at the time of this handoff; do not describe it as open or merged. This handoff PR has its own actual GitHub number.

## Currently open feature PRs: review order
| Priority | PR | Content | What is actually pending |
|---|---|---|---|
| 2 | #55 | Qur'an/Bible jump targets and infinity visual consistency | Rebase onto v285; check in-app links and Android first paint, no second CSS/nav owner |
| 3 | #47 | 2-hour Islamic Dhikr original soundtrack | Approved permanent media hosting for the exact extracted M4A; rights verification and Android native seek/resume test. Do **not** rename the Drive MP4 as MP3 |
| 4 | #49 | Deep Hold 17:11 and Resilience 26:29 | Both Drive IDs and original hashes verified. Public redistribution permission and guided-content safety review remain unverified; don't insert broken/unauthorized public Play buttons |
| 5 | #42 and #44 | Reels swiping + optional native HTML5 media | Overlapping `index.html`/`sw.js`. Integrate carefully; approved direct streaming URLs still missing for native mode; test swipe and Drive player mode on Android |
| 6 | #38 | Headphone resume | Very old branch; compare to v285 mini-player before cherry-picking any unique work. Android headset/background test |
| 7 | #53 | Ali Letter 31 in Human Knowledge | Confirm full transmitted Arabic and translation attribution/copyright; owner approves reflection separation; verify English not blank |
| 8 | #52 | Book HUMAN English 1.6 | Author proofreading/source comparison and do not overwrite latest book text |
| 9 | #39 and #37 | Acoustic Earth and guided meditation creative assets | Confirm source license, preserve original performer voice/music and ambient sound; no generated substitutes |
| 10 | #35, #33, #32, #2 | Legacy Fear/audio/settings/offline changes | Hundreds of commits behind; do **not** merge whole branches. First audit whether current v285 already fixes each issue; migrate only independently confirmed missing work |

**Open PR total after #56 merge:** 15, including this handoff PR, as checked immediately after the merge. Most branches diverge from the current v285 source; the release manager must not merge old `index.html`, `sw.js` or books en masse.

## Owner (your side) — smallest necessary actions
1. **Android functional sign-off (required):** Open fresh Chrome and installed PWA on your phone after release manager stages a build. Check Home infinity/logo + English/Tamil, Home→Qur'an 114 surahs, Bible Genesis, Gita, Explore Human Practice and Human Knowledge, Listen mini-player/±15s, Reels swipe, background audio, and one offline-return case. Share screenshots or clear failure descriptions only for defects you actually see.
2. **Third-party media permissions (required before public copying):** The two `Breathe With Sandy` MP4s already exist in your connected Drive; **you do not need to upload them again**. Confirm what public embedding/sharing license or creator permission you have. Without permission, keep them private or use an authorized original player/link; don't publish copies/audio extractions on public GitHub Pages.
3. **Dhikr audio delivery decision:** The exact extended recording has an extracted original-sound M4A (2:00:05); approve an authorized permanent audio destination after rights check. The app's native audio adapter must not claim playback until the asset is present.
4. **Content approvals:** Approve the final Human/Letter 31 and book text after reviewing copyright/translation attribution and the separation of original scripture from HeartClear reflections. Third-party guided breath-hold recordings require safety/content review before public guidance.
5. **No extra uploads or purchases required now:** The two breathwork originals were already located in Drive; do not buy hosting or submit payment merely to finish this audit.

## Release manager — tasks that should NOT be assigned to the owner
- Inspect each PR diff against the **latest main** and audit replaced functionality; resolve overlapping player, HTML, CSS and service worker files by integrating both sides.
- Do not create or publish a PR #59 by assumption. Use the number GitHub actually assigns.
- PR #56 is complete. Next rebase and test #55, #47, #49, #42/#44, etc., according to verified dependencies and rights.
- Maintain **one** bottom nav owner and stable ordering: Home | Listen | Reels | Explore | Library | Settings.
- Preserve master books/covers/audio, original video IDs, language content, localStorage progress, raw recordings and `heartclear-media-v1` offline cache.
- Run relevant contracts: `node tests/hc-release-contract.cjs` (when present), Mind Game QA, browser/nav/playback/offline tests, and Android/PWA screenshot checks. Report exact checked status rather than assuming a GitHub commit proves Android playback.
- Update only coordinated Settings label, script query versions, `sw.js` precache and registration; deploy **one** release after green checks and explicit approval.

## CI snapshot for v285 after Mind Game hotfix
- Pages deployment, navigation, mini transport, playback, Explorer, sacred audio, and browser/offline checks **passed** on `main` at `787b4ee67c...`.
- On v285 commit `787b4ee67c...`, the old Sourced Mind Game test failed. PR #56 was subsequently merged and the **new main** Sourced Mind Game Actions run `40279170080` **passed**. Pages deployment from that merge was still in progress at the time of this handoff update.

## What this handoff PR changes
This single Markdown audit file. **It changes no application runtime, audio, books, translations, media, branches other than its own, or deployment.** The listed tasks are handoff, not certification that all HeartClear features are completed.
