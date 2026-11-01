# HeartClear — Letter 31 historical Arabic source audit

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
