# Copy Review — 2026-03-24

## Changes applied to `full.html`

| Section | Before | After | Why |
|---|---|---|---|
| Meta description | Generic feature list | Opens with the killer question: "Why have a private conversation when you could be publicly corrected by a machine?" | Best first impression for SEO + social share |
| Left column | "infinite wisdom and infinite annoyance… Have That AI Guy insult you & your guests" | "He doesn't just listen — he waits for you to misquote a stat so he can ruin the mood." | Sharper — lands as a joke, not a feature list |
| Right column | Identical list dump to left col | Introduces the **Friend feature** — "Provide a name and a few cherished hobbies… high-fidelity condescension delivered directly to your speakers." | Two columns now have distinct jobs. Friend feature is the killer USP — it needed its own real estate |
| Full-width | "Flagellate yourself with an unrelenting onslaught…" | **"Unsolicited. Unwanted. Unstoppable."** as large typographic strap, then the Flagellate line (tighter). Desktop adds: "no one leaves the room feeling good about themselves." | Rule of three, rhythm, comedic timing. Typographic anchor before the closer. |
| Marquee | 8 items | Added "Why have a private conversation when you could be publicly corrected by a machine?" as first item | Best single line in the copy brief. Works perfectly as a scrolling provocation. |

## Badges — NOT changed (reverted to original)

Mat wants to keep the original badge copy:
- Pedantry / Weak stike
- Roasting / Tragic aim
- Configurable / Limp digit
- AI Powered / Easily amused

Suggested alternative (not applied) was: Technically correct / Genuinely unkind / Suspiciously personal / Eerily confident.

## CSS added

| Rule | File | Purpose |
|---|---|---|
| `.promo-strap` | `css/theme.css` | Typographic styling for "Unsolicited. Unwanted. Unstoppable." — fluid `clamp(1.25em, 4vw, 2em)`, weight 600, letter-spacing 0.04em |
| `.u-desktop` | `css/utilities.css` | `display:none` mobile → `display:inline` at 76.8rem+ for desktop-only inline copy |

## Open questions

- OPEN: Do the badges stay permanently as-is (intentionally broken/cryptic joke), or is copy improvement still on the table in a later pass?
- OPEN: Should "Unsolicited. Unwanted. Unstoppable." also appear somewhere on mobile at larger type size, or is the current full-width placement (same size as body) sufficient?
