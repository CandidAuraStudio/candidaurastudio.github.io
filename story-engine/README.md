# STORY ENGINE — Prototype 01

Standalone filmmaking/storyboard PWA at https://candidaurastudio.github.io/story-engine/.

## Scope
This is the third independent creative project after HUMAN ATLAS and INNER VOICE. HeartClear is a separate meditation app. **Only files in /story-engine/ were created for this release.**

## Included
- Starter templates: short film, cultural documentary, visual reflection.
- Film idea + working title, logline, mood and genre.
- Scene workshop: locations, time of day, action, dialogue and voiceover.
- Multi-shot planning: shot size, camera movement, visual description, sound and estimated duration; reorder/delete shots and scenes.
- Free abstract, schematic **storyboard frames** for shot-order planning. **These are not AI-generated images, actual photographs or video.**
- Working screenplay preview with text download and browser Print/Save PDF.
- Shot list preview and CSV export.
- Full editable JSON backup and import. A built-in original, fictional sample with three scenes.
- No subscriptions, account, analytics, server uploads, stock footage or AI provider keys.
- Responsive mobile-first navigation; offline app cache strictly scoped to /story-engine/.

## Privacy
Projects live in localStorage key `story-engine:projects-v01` on the current browser/device. There is no synchronization or remote backup. Import merges distinct IDs; existing IDs are not overwritten. Browser storage clearing can delete projects. Back up before resetting your phone or switching browsers.

## Limits and further work
Maximum 30 projects, 40 scenes per project and 24 shots per scene. Source export is plain text, CSV or JSON. Storyboards use original CSS shapes rather than editable images; actual camera footage or AI-generated film is out of scope. The prototype does not automatically import existing Inner Voice or HUMAN ATLAS recordings; users should keep those projects independent and decide what to transfer later.

## Testing
GitHub source and JavaScript validation; user device test required for PWA install, offline use, layout and printing.

1. Open sample film and verify scenes, screenplay, shot list and storyboard.
2. Make a new project, add a scene and shot; type an action; refresh and confirm data persists.
3. Export JSON, CSV and screenplay text. Import JSON and confirm duplicates are not overwritten.
4. Confirm HeartClear, HUMAN ATLAS and INNER VOICE load unchanged from their own paths.
