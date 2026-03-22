# Session Handoff — 2026-03-22 — Intro Layout & Conventions

**Phase:** 1 — Foundation (carry-forward)
**Commit:** `bd17370`
**Status:** Session complete. Intro layout done. Priority 3 styling features remain.

---

## What was done this session

### CLAUDE.md conventions
Added a full Coding Conventions section: 2-space indentation, HTML/CSS only (JS pre-agreed), element specificity over classes, custom properties for all visual styles, em/rem/px unit rules, unitless line-height, flex for layout (grid for specific components only), mobile-first, glass modifier pattern, WebP images with retina srcset, accessibility where possible.

### Code audit + fixes
All CSS and HTML reviewed against conventions. Issues found and fixed:
- **Indentation**: 4-space → 2-space across all CSS files and `index.html`
- **Undefined variables**: `--font-size-xlg` → `--font-size-xl`; `--main-font-heading` → `--font-weight-heading`; `--color-white` → `var(--color-bg)`; `--min-width` added as `320px`; `--font-size-sm: 0.2rem` typo → `1.2rem`; `--font-weight-light: 300` added
- **`clamp()` missing comma** in h1 rule — fixed
- **`justify-items`** → `justify-content` on flex container in `speech-bubbles.css`
- **`img` attributes** — all `width="100%"` / `height="auto"` converted to integer pixel values

### SVG variable fix (`css/svg-variables.css`)
Replaced 131 KB corrupt data URI (base64 broken by `&#10;` HTML entity encoding) with direct file reference: `url('../assets/components/that-aiguy-logo.svg')`. File reduced to 551 bytes.

### Duo phone images (`index.html`, `css/theme.css`)
Fixed: `flex`/`width` was on `<img>` elements, but `<picture>` is the actual flex child. Corrected via element specificity CSS on `picture` and `img`. Added third screenshot `iphone-ss-04-victimsettings.png`.

### Speech bubble SVGs (`css/speech-bubbles.css`)
Fixed `max-width: 100%` reset capping SVGs at their `width="150"` HTML attribute. Added `width: 100%; height: auto` on `.promo-phone-wrap figure img` so CSS controls size through the container.

### Inline logo `em` elements (`css/theme.css`)
Fixed collapsed height on `display: inline-block; font-size: 0` (requires explicit height). Added `height: 3.5rem`, pull-up via `position: relative; top: -2.5rem; margin-bottom: -2.5rem`. `.taig-lg` variant: `height: 7rem; width: 15rem; top: -3.3rem; margin-bottom: -3.3rem`.

### Bottom nav + theme toggle (`css/theme.css`)
- Bottom nav: 50% bigger — `gap: 20px`, `padding: 0.6rem 0.9rem`, `font-size: 0.85rem`, icon `2.6rem`, nav items `padding: 0.75rem 1.65rem`. `body padding-bottom: 14rem`.
- Theme toggle: moved to `bottom: 1.6rem; right: 2.2rem` (was top-right).

### Intro two-column layout (`index.html`, `css/theme.css`)
Replaced single `.promo-text` div + floated logo with:
- `.promo-text-wrap` — flex row container
- `.promo-col-l` — paragraph 1 ("Bring…")
- `.promo-col-r` — paragraph 2 ("At the press…") + sign-off
- `.promo-full-width.promo-text` — paragraph 3 ("Flagellate…") + "Yours faithfully," + `.taig-lg`
- Logo: `position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 15rem; z-index: -1`
- `.promo-col-l::before`: `float: right; shape-outside: circle(7.5rem at 100% 50%); width: 7.5rem; height: 15rem`
- `.promo-col-r::before`: `float: left; shape-outside: circle(7.5rem at 0% 50%); width: 7.5rem; height: 15rem`
- `.promo-intro`: `isolation: isolate; overflow: hidden; position: relative`

### Drop-cap gradient pattern
Applied `<span><strong><span>X</span>word</strong> phrase</span>` to three paragraph openings:
- "Bring" (paragraph 1, left column)
- "At the press of a button" (paragraph 2, right column)
- "Flagellate yourself" (paragraph 3, full-width)
Styling driven by existing `.promo-text p span`, `.promo-text span > strong`, `.promo-text span > strong > span` rules. Required adding `promo-text` class to `.promo-full-width` div.

### Docs + README
- `README.md` — written from scratch with project description, stack, structure
- `docs/context/summaries/phase-1-tasklist.md` — full session record added; all completed items consolidated by date; open items cleaned up; backlog "text wrap" item closed

---

## Files changed this session

| File | Change |
|------|--------|
| `CLAUDE.md` | Coding conventions section added; 2-space indentation note |
| `index.html` | Intro restructured to two-column layout; third phone screenshot added; drop-cap markup on 3 paragraphs; `img` attributes fixed |
| `css/theme.css` | Intro section rewritten (logo absolute, two columns, pseudo-element shapes); bottom nav + toggle repositioned/resized; `em` inline logo fixed; variable fixes |
| `css/global.css` | Variable fixes + additions; 2-space indentation |
| `css/speech-bubbles.css` | SVG expansion fix; `justify-content` fix; 2-space indentation |
| `css/svg-variables.css` | 131 KB data URI → 551 B file reference |
| `css/badges.css` | 2-space indentation |
| `css/grid.css` | 2-space indentation |
| `css/utilities.css` | 2-space indentation |
| `css/reviews.css` | 2-space indentation |
| `css/stars.css` | 2-space indentation |
| `README.md` | Written from scratch |
| `docs/context/summaries/phase-1-tasklist.md` | Full session record; updated to 2026-03-22 |

---

## Current state of intro section

```
.promo-intro
  img.promo-logo          ← absolute, centred, top: 0, 15rem, z-index: -1
  .promo-text-wrap        ← flex row
    .promo-col-l.promo-text   ← paragraph 1 (drop-cap "Bring…")
      ::before            ← float:right, shape-outside circle, 7.5rem × 15rem
    .promo-col-r.promo-text   ← paragraph 2 (drop-cap "At…") + sign-off paragraphs
      ::before            ← float:left, shape-outside circle, 7.5rem × 15rem
  .promo-full-width.promo-text  ← paragraph 3 (drop-cap "Flagellate…") + "Yours faithfully," + taig-lg
```

---

## Open tasks (Priority 3)

- [ ] Glassify badges + slider/review cards (`.glass` modifier — do not touch stars)
- [ ] Download button — 9-style neumorphic keyframe cycle + App Store SVG overlay
- [ ] Badge click → speech bubble `clip-path` morph
- [ ] Claude icon fixed bottom-left + scroll-driven rotation

## Open questions

- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently: main → theme → logger)
- [ ] **Accessibility + schema pass**

## Content outstanding

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Privacy policy sign-off + contact email
- [ ] Star rating values confirmation (Sheldon + Jeff at `value="1"`)

---

## Key file paths

| What | Where |
|------|-------|
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Previous handoffs | `docs/archive/handoffs/` |
| Test programme | `docs/test-program.md` |
| Inline logo SVG | `assets/components/that-aiguy-logo.svg` |
| Logo (nav icon) | `assets/components/logo-tg.svg` |
| Phone screenshots | `assets/iphones/iphone-ss-01.png`, `iphone-ss-02-roastoptions.png`, `iphone-ss-03-settings.png`, `iphone-ss-04-victimsettings.png` |
