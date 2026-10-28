# HeartClear v284 — Deep pages theme audit

**Review only:** never merge or publish without the release manager and Android/PWA screenshots.

## What the owner reported
On October 25, the owner captured mobile screenshots showing:
- **Interactive Explorer:** old dark blue card, bright blue orb/illustration and large repeated title beneath a cinematic Explorer header.
- **Human Knowledge Library:** duplicated Human Knowledge / Knowledge Library mastheads, blue header panel, blue knowledge tiles and inconsistent controls.

The project's canonical `HEARTCLEAR_MASTER_SPEC.md` mandates charcoal/black backgrounds, white text, restrained gold accents, compact controls and preservation of all writing and media.

## Root causes confirmed
- `hc-explorer.js` dynamically inserts `hc-explorer.css` after app startup; its own panel styles had blue gradients and thus were not fully governed by the later static `hc-design-unified-v279.css`.
- `hc-heritage-reader-v189.js` dynamically injects **two sets of inline styles**, including blue tiles, header, fixed subnavigation and status panels. These load after startup too.
- The global cinematic masthead repeats the heading already inside each of these two focused screens.

## This PR fixes at original modules
- **Explorer:** same Al-Fatiha / HUMAN / Awareness journeys and note/save functions, now charcoal, white selected tabs, accessible 44px steps, smaller grayscale orb and no redundant cinematic heading.
- **Knowledge:** original subject/article browsing, multilingual reading and `hcHeritageReadingProgressV189` unchanged; original reader inline styles converted to charcoal; index has a single visible heading with Close/language controls. Deeper topic and article breadcrumbs remain.
- **Home Knowledge entry:** dynamic launcher card also uses charcoal rather than blue.
- All dynamic loader query versions aligned at `v284` via `hc-home-routine-v155.js`, `hc-flow-v220.js`, `hc-daily-care-v182.js`, `hc-deep-heritage-v185.js`, `hc-explorer.js`, `index.html`, and `sw.js`.
- Offline media cache and user progress/history remain unchanged. No added global `!important` overlay or new navigation/player.

## Broader review, *not* claims of completed fixes
A static scan of other existing modules found legacy dark-blue color tokens in CSS or dynamically constructed style strings:
- `hc-quran-home-v153.js`
- `hc-genesis-v156.js`
- `hc-hindu-scriptures-v162.js`, `hc-vedic-library-v215.js`
- `hc-gita-original-audio-v163.js`
- `hc-infinity-journey-v211.js`
- `hc-kitchen-worldwide-v207.js`
- `hc-flow-v220.css` and `hc-listening-hub-v254.css`

**This is an audit candidate list, not proof of live defects.** Some rules are intentionally superseded by the unified design. Validate each screen's computed styles and Android screenshots before creating isolated source-level corrections. Avoid broad global CSS fixes; they risk changing scripture typography, mini-players and book reader font-size preferences.

## Test / release checks
- All changed JavaScript modules and nonempty inline HTML scripts parsed.
- Original page and reading APIs, knowledge topics and saved-note identifiers retained.
- v284 service-worker precache, dynamic stylesheets and script loader URLs aligned.
- Interactive Explorer stylesheet braces balanced and main old-blue background literals removed.
- Targeted regression contract file: `tests/hc-deep-pages-theme-v284.cjs` (must be executed in Node by release manager).
- Not yet tested in Android Chrome or the installed PWA; no automated screenshot comparison or accessibility audit on device.
- PR #48 changes `index.html` and `sw.js`: the release manager must resolve both sets of changes carefully, rather than overwrite one.

**Status:** feature branch only; no merge, publication, book/audio change or progress reset.
