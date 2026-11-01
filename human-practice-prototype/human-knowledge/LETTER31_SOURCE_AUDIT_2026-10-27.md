# HeartClear — Letter 31 historical Arabic source audit

## Recovery recheck — 1 November 2026, draft PR #72

This section supersedes the older PR #53 release gates below where the user's 1 November instructions allow a clearly identified external English source.

- Latest main used: `8cb42e322a08b2c8e50dbf9cf504b9d3363aff09` (v290). Recovery draft #72 was created from that commit. PR #53 remains closed and unmerged.
- Re-fetched the cited Arabic chapter through the GitHub connector. Last upstream file commit: `7f8a32204e467aa96da2a0b96c0b502de6ca9a63` ([pinned edition](https://github.com/libarabia/nahj-albalagha/blob/7f8a32204e467aa96da2a0b96c0b502de6ca9a63/abdu/ch006.md)). Isolated Letter 31, removed 20 marginal blocks and standalone footnote numerals; compared Arabic words in order without spelling normalization: **2,488/2,488 identical; zero differences**. The exact recovered text SHA-256 is `160ee653ee92acfb16e22cb9fa400ac0fec1dd04701a7cc687b5f39eb9d15192` and is now protected by the contract.
- This establishes fidelity to that digitized historical edition, not manuscript authenticity or agreement with every recension. Only the historical letter is reproduced; no modern translation or editorial apparatus is copied. No repository-wide license was found upstream; public-domain treatment applies to the historical wording, not arbitrary repository additions.
- English remains a clearly attributed **external** Al-Islam.org Letter 31 link. The English translation is credited to Sayyid Ali Reza; bibliographic attribution is corroborated by [Hujjat Bookshop's edition listing](https://hujjatbookshop.co.uk/products/nahjul-balagha-vol-1-2-html). [Al-Islam.org's own terms](https://al-islam.org/contact) do not establish HeartClear redistribution permission. No full English translation is embedded, cached, or described as licensed. Internet is required for the external English edition.
- HeartClear's introductory reflection is explicitly labelled; user notes stay in the existing dedicated `hcKnowledgeAli31PrivateNoteV1` key. Historical Arabic wording is unchanged.
- Local contract and service-worker harness tests passed. Local browser execution is unavailable because Chromium download produced an invalid archive. GitHub Chromium/mobile and navigation CI must be checked separately; no physical Android or installed-PWA sign-off has occurred.
- All 11 GitHub PR checks passed on recovery commit `97c111ddad9c5fc5e773b42373fa2b13530c043a`, including the Letter 31 real-browser offline/route test and current navigation QA. Screenshot artifacts were inspected. Independent review then identified the transient optional-Arabic-download recovery edge: the new regression failed with offline status 504; a scoped runtime-cache repair made it pass with 200. Check CI on the resulting new head before merge. Two legacy static tests fail identically on untouched main (removed nav guard assertion; missing pause() on a handoff test double).
- **Release status: BLOCKED, draft only.** Required physical Android/installed-PWA review remains open. No merge or publication, and no working deployed reader link is claimed. Draft audio PR #73 overlaps index.html/sw.js and must be reconciled against latest main before any later release.

**Date:** 2026-10-27  
**Scope:** PR #53, `human-knowledge/ali-letter-31-arabic.js` only. This is a source-text comparison, **not** a translation review, manuscript authentication, or Android device test.

## Sources

- PR Arabic text: `human-practice-prototype/human-knowledge/ali-letter-31-arabic.js`
- Historical digitized edition: [Nahj al-Balagha, Muhammad Abduh edition, volume 3, chapter 6](https://github.com/libarabia/nahj-albalagha/blob/main/abdu/ch006.md)
- Start boundary: `٣١ - ( ومن وصية له للحسن بن علي عليهما السلام )`
- End boundary: `والسلام`, immediately before the heading `٣٢ - ( ومن كلام له عليه السلام إلى معاوية )`.

## Reproducible comparison performed

1. Read the GitHub-hosted historical Arabic chapter and isolate the text between the Letter 31 and Letter 32 headings.
2. Remove the 20 printed marginal footnote/gloss blocks beginning with `\\* ( هامش ) \\*` and ending at the next `/ صفحة ... /` marker (20 page transitions).
3. Extract the remaining Unicode Arabic-script word sequences, ignoring punctuation, whitespace and standalone Arabic page/footnote-number tokens.
4. Extract the Arabic-script word sequences from `window.HC_ALI_LETTER31_AR.text` in the PR using the same rule.
5. Compare **every token in the same order**, without spelling normalization or substitutions (no Alef/Ya/Ta Marbuta substitutions).

**Observed result:** historical source = **2,488** words; PR local text = **2,488** words; word-for-word equality = **true**; first mismatch = **none**. Letter 31 includes the traditional introductory heading and closes with `والسلام`.

The source was fetched directly from the upstream repository's `main` branch on the audit date. If the upstream branch changes later, the comparison should be rerun. The local contract test now protects the observed word count and key internal passages, but its checks alone do not replace the external source comparison.

## Remaining release gates

- This comparison checks **transcription fidelity to the identified Muhammad Abduh printed edition**, not whether the traditional attribution is historically authenticated or whether manuscript variants exist.
- The complete English translation is **not embedded** in HeartClear. The published Sayyid Ali Reza translation is linked externally because redistribution rights are not established.
- A full, independently checked in-app English edition or written reproduction permission is needed before describing the feature as a complete bilingual reader.
- Required Android/installed-PWA testing (Arabic rendering and direction, keyboard tabs, notes persistence, offline/return navigation) remains incomplete.
- Latest-main integration, cross-feature regression and coordinated offline/cache/version checks are needed before merge.
- **Do not merge/publish PR #53 while these release gates remain open.**
