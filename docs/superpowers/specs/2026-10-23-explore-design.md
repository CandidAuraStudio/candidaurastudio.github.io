# HeartClear Explore

User authorised both tap and voice answers and delegated which experience to start with. Implement directly in existing static HC; no paid API or credentials.

Add one small Explore shortcut after Home listening panel, opening a native accessible dialog with Guess my thought and Help me explain. One question at a time, Yes / No / Unsure, Back, restart and close. Keep media and existing HC sections intact.

Game: finite, clearly disclosed knowledge bank of people/relations, animals, plants, objects, food, places and concepts. Choose useful questions by splitting remaining candidates. Confirm guesses; cannot identify private names, read dreams or promise all-world coverage. No-match and ambiguity are honest outcomes. Cap at 20 questions.

Health: adult symptom organiser with early emergency/urgent exits, initial urinary/private-area support and general symptom summary. Display public NHS sources and source-check date. This is source-based guidance, not a clinically validated diagnostic tool. Never name a diagnosis, prescribe drugs, fasting, breathwork or clearance for work. No all-clear result. Unsure must not become No. Keep answers in memory only and clear on close; copying summary requires user action.

Voice: browser speech recognition, explicit disclosure before enabling because audio may go to browser-provider servers. Only recognised standalone Yes / No / Unsure (English or Tamil) are proposed, then user confirms. No automatic answer submission. Denial, unsupported, offline and unrecognised speech retain tap controls. Abort microphone on any navigation, close, hidden page or completed answer; ignore stale callbacks.

Online-first loading through HC service worker; small cached fallback. No AI or live web search in this release. Online does not imply inference by a remote model.

Approaches: hosted AI offers broad conversation but introduces cost/credentials and hallucination risk; a rules-and-questions module fits the current static app and predictable answers. Chosen implementation is the latter, with optional browser voice.
