# HeartClear Library and Settings Spec

**Status:** Approved for planning by the user on 2026-10-11.

## Goal
Evolve the existing HeartClear PWA into an extensible, personal-use library that stays shareable and can accept future sessions and songs without rebuilding the screen flow.

## Constraints
- The public install URL remains `https://candidaurastudio.github.io/human-practice-prototype/`; anyone can reach the application and publicly hosted media.
- No login is required. Favorites, preferences, history, and progress remain local to the device.
- Keep English UI and no language selector.
- Preserve existing working sessions, player behavior, categories, and separate sound traditions; do not revive the older bilingual prototype.
- New media is represented by metadata and hosted URLs; large media files stay outside the GitHub source tree.
- Do not claim private media storage or private app access while using the public GitHub Pages URL.

## Required behavior
1. Library entries use one reusable record shape for title, category, duration, media kind, audio URL, optional visual URL, optional closing sound, and favorite state.
2. Existing entries retain their current URLs and labels. Future 60-minute sessions or songs can be added by adding catalog data.
3. Settings opens from a clear, accessible control and exposes working independent switches for Reduced motion and Frosted blur, plus existing screen-awake, offline-media and local-context controls.
4. Frosted blur off removes backdrop blur throughout the app; switching it back on restores the current visual treatment. Reduced motion does not change blur.
5. Add a default closing-sound preference and local data export/clear controls with clear consequences.
6. Switches expose accessible names and their enabled state to screen readers; preferences persist across reload.
7. Keep the current warm blue and sunlight look, with a visually minimal active practice player.

## Acceptance
- Add several catalog entries without adding new per-card rendering code.
- Verify existing entries still map to the same media URLs and durations.
- Toggle blur and reduced motion independently, reload, and confirm both choices persist.
- Verify Settings and all controls on narrow iPhone and Android-sized screens.
- Confirm visible app copy does not claim that the public library or hosted media are private.
