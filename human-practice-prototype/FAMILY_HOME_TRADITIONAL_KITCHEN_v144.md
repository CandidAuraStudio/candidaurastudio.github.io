# HeartClear Family Home — Traditional Kitchen is priority 1
Date: 2026-10-23. User direction: traditional Tamil cooking comes before education catalogs, new meditation expansions, and physical movement.

## Current release v144
- Home starts with a Tamil-first Kitchen section, placed before the existing listening area.
- Monday–Sunday selector with 7 themes and 21 concise recipes (3/day: breakfast, lunch, dinner).
- Tamil by default; English toggle. Same-screen expandable ingredients and steps; optional device text-to-speech (not studio audio; Tamil voice availability varies by device).
- Existing meditation, Qur'an, personal recordings, downloads and saved progress remain present; listening is under an expandable Home summary.
- Other family rooms are presented as a small expandable directory, not fake operational modules.
- Reels keeps its bottom-navigation entry; duplicate Reels Home shortcut removed.
- Service worker v144 retains heartclear-media-v1 and caches new Kitchen script.
- This is only a starter release: the 21 methods are brief and require full recipe testing, measures, timings, and regional/family review before representing them as complete cooking lessons.

## Non-negotiable design direction
Treat HeartClear as a practical family HOME with rooms:
1. Kitchen: ancestral Tamil and Sri Lankan Tamil foods first; morning breakfast, lunch, dinner, daily weekdays.
2. Garden: balcony, terrace, herbs, plants, growing and food supply later.
3. Living room: family books, podcasts, discussion and useful knowledge.
4. Bedroom: rest and sleep resources.
5. Prayer room: Qur'an reader/recitation/reflections; keep religious text and personal reflections distinct.
6. Washroom: hygiene and practical household care (careful, respectful wording).
7. Physical movement: **second development priority after traditional cooking**, not in the current release.
Keep one clear Home experience; avoid duplicating on Home items already in bottom navigation. No blur/glassmorphism; straightforward monochrome layout. Do not delete existing working features, personal data, or offline files.

## Traditional food editorial priorities
- Primarily Tamil; standalone English rendition alongside.
- Sri Lankan Tamil: northern Jaffna, eastern Sri Lankan Tamil home variations, palmyra, rice and lentils, village preparations, oral family knowledge.
- Tamil Nadu: distinct regions, millets, legumes, greens, fermented batter foods, vegetable curries, temple and household food without confusing traditions.
- Record indigenous/local names, pronunciation, ingredients, family methods, geography, oral-history attributions and cultural context, with respectful language.
- Avoid claiming a modern home adaptation is the exact thousand-year-old preparation. Verify oral names with family or community practitioners.
- Childhood dish **Morokottan kanji** is a user-supplied family-memory name: plant identification, alternate spellings, and ingredients are UNCONFIRMED; do not assert it is mudakathan until verified.
- Include vegetable variations, responsible food handling, accessible ingredients, and regionally accurate food choices.
- Include rare traditional dishes only after relevant expertise and safe preparation review; avoid unsafely guessing historical food-processing techniques.

## Next content milestones
1. Collect and check ten Sri Lankan Tamil and ten Tamil Nadu home recipes with local attribution.
2. Write full recipes with verified amounts, realistic timings, substitutions, servings, safe food handling, and tested equipment requirements.
3. Make 3-5 minute Tamil-first audio guides with pause points and English counterparts; retain scripts and source provenance. Device speech synthesis is only a temporary accessible reading aid.
4. Add editable family-recipe memories and consent-aware community submissions, not automatic public publishing.
5. Add pantry-based selection and a weekly shopping list, with no account required.
6. Only then plan body movement lessons and other rooms' interactive features.

## Sources used for heritage orientation (not direct copied recipes)
- https://www.srilanka.travel/culinary-tourism/index.php
- https://www.srilanka.travel/culinary-tourism/food-range.php
- https://www.incredibleindia.gov.in/en/tamil-nadu/chennai/a-foodies-guide-to-trying-local
- https://exploresrilanka.lk/a-treat-from-jaffna/

## Release QA caveat
Syntax and source linkage can be checked by GitHub; actual device/runtime, screen appearance, speech voices and background playback must be verified separately. 
## October 23, 2026 — monthly family meal planner v148
- New additive file: hc-monthly-kitchen-v145.js, loaded after v144. Old seven-day Kitchen module stays as fallback; new planner hides it only after successful rendering.
- Date selector supports arbitrary days and months. Generates five **alternative** complete menus per breakfast, lunch and dinner (not five meals to eat per mealtime).
- Each menu displays a culturally inspired main, side, vegetable/greens and optional drink. Each day has 15 suggestions; October's 31 days have 465 suggestions.
- The planner uses 130 distinct base dish titles in Tamil and English, with grouped vegetarian, fish, egg and chicken choices. Recipe titles and pairings are proposals for further regional review, not historical proof or tested cooking instructions.
- Checked Oct–Dec 2026, Jan–Feb 2027: no identical **full plate** repeated within any tested month. Ingredients, base staples or main dishes may recur with different complementary food, which helps practical shopping.
- Saves individual menu choices by date in new localStorage key hcKitchenMenuChoicesV1; respects existing hcKitchenLangV1.
- Adds manual price notebook for Akkaraipattu, another Sri Lankan location, or Malta: salaya, hurulla, balaya and freshwater tilapia, comparable per-kilogram quote only, stamped at time entered and kept on this device in hcKitchenMarketV1. **Not live market pricing, not verified cheapest across stalls, not a weather-to-price forecast.**
- Links to Sri Lankan Ministry of Fisheries weekly prices and national Statistics price dashboard for context. Those sources do not guarantee locality-level current quotes.
- Optional drinks emphasize water and non-caffeinated alternatives. Tea/coffee are not daily nutrition requirements.
- Existing audio, books, Qur'an, and other features retained; no media data cache deletion. PWA app cache updated to v148.
- Next: family size and servings, pantry-driven swaps, substitution safety, food allergies, realistic preparation times, independently tested recipe quantities and local community/source attributions; receipts/market timestamps; draft shopping list; then well-sourced traditional oral-history archive.
- Device/browser runtime and actual Tamil text-to-speech availability remain unverified; only source syntax and module linking checks have been performed.
