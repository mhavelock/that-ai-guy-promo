# Phase 1 Tasklist — That AI Guy Promo Site

**Phase:** 1 — Foundation
**Created:** 2026-03-13
**Updated:** 2026-03-22
**Status:** In progress

> **Working convention:** Stop and check between each task — show `git diff` when done.

---

## Completed

### Foundation (2026-03-13 → 2026-03-16)

- [x] Write and structure `CLAUDE.md`
- [x] Create folder structure (`assets/`, `css/`, `js/`, `docs/`, `context/summaries/`)
- [x] `index.html` — single-page promo
- [x] `privacy.html` — privacy policy page
- [x] `css/global.css` — full design system
- [x] `css/theme.css` — promo layout, dark/light tokens, bottom-nav Liquid Glass, theme toggle
- [x] `css/grid.css` — `grid-4x4` badge grid layout
- [x] `css/utilities.css` — `sr-only`, `flex-center`, blockquote comma separator
- [x] `css/slider.css` — CSS-only carousel (4 slides)
- [x] `css/badges.css` — circle badge hover + squishy animation
- [x] `css/stars.css` — CSS star-rating via `<input type="range">` + `@property`
- [x] `js/main.js` — modal open/close with keyboard support
- [x] `js/theme.js` — light/dark toggle, localStorage persistence, system change listener
- [x] `js/logger.js` — isolated build activity logging system
- [x] `docs/test-program.md` — two-track test programme

### Code review + bug fixes (2026-03-16)

- [x] `stars.css` — `--s` 50px → 30px; track was overflowing slider cards on mobile
- [x] `slider.css` — page-scroll-on-slide-change fixed via `overflow-x: clip` on `.promo-reviews`
- [x] `css/reviews.css` — styled: open-quote header, italic bold quote, centered stars, attribution row (rule + name/location + circular avatar)
- [x] `css/utilities.css` — comma separator scoped with `:not(.review-quote)` to prevent bleed into review cards
- [x] `css/slider.css` — active bullet dot changed to `var(--color-text)` (dark grey)
- [x] `css/slider.css` — slider card and bullet colours themed for dark mode

### Priority 1 — Mobile-first foundation (2026-03-16)

- [x] Audit all CSS files — only `grid.css` had `min-width` syntax; updated to `(width >= 768px)`
- [x] `custom.css` (orphaned) and `components.css` (empty stub) deleted
- [x] Replaced `OmnesBold` / `@font-face` with **Fredoka** variable Google Font (300–700)
- [x] `<link rel="preconnect">` + stylesheet added to `index.html` and `privacy.html`
- [x] `font-family` updated in `theme.css`; `@font-face` block removed
- [x] `.bottom-nav` split: structure on `.bottom-nav`, glassmorphism on `.bottom-nav.glass`
- [x] `.theme-toggle` split: structure on `.theme-toggle`, glassmorphism on `.theme-toggle.glass`
- [x] `.glass` class applied in HTML
- [x] All non-SVG `<img>` converted to `<picture>` with mobile + desktop `<source>`
- [x] `loading="lazy"` added to below-fold phone images
- [x] Mobile (< 768px) fixed font sizes: `p` = 1.2rem / lh 1.5; headings 1.25–1.5rem
- [x] Desktop (≥ 768px): `clamp()` fluid scaling; `p` max 2rem

### Session 2026-03-22 — Intro layout refinements + asset tidy

- [x] **Intro logo fluid scaling** — `clamp()` growth from 150px (450px vp) → 200px (768px+); shape-outside floats scale in sync
- [x] **Codewall text trimmed** — removed lower Swift/TTS/CoreML block; codewall ends at Russell circumplex line
- [x] **Asset tidy** — `assets/iphones/` + `assets/speech-bubbles/` moved to `assets/graphics/iphones/` + `assets/graphics/speech-bubbles/`; WebP 1x/2x pairs generated; all `src` paths updated

### Session 2026-03-22 — Conventions, audit, and intro layout

- [x] **CLAUDE.md** — added full Coding conventions section (HTML/CSS/JS rules, units, layout, glass modifier, images, accessibility)
- [x] **Indentation** — standardised 4-space → 2-space across all CSS files (`global.css`, `theme.css`, `speech-bubbles.css`, `badges.css`, `grid.css`, `utilities.css`, `reviews.css`, `stars.css`) and `index.html`
- [x] **CSS variable audit** — fixed undefined variables throughout:
  - `--font-size-xlg` → `--font-size-xl` (`theme.css`)
  - `--main-font-heading` → `--font-weight-heading` (`global.css`)
  - `--color-white` → `var(--color-bg)` (`theme.css`)
  - `--min-width` — added `320px` definition (`global.css`)
  - `--font-size-sm: 0.2rem` typo → `1.2rem` (`global.css`)
  - `--font-weight-light: 300` — added to tokens
- [x] **`clamp()` syntax** — fixed missing comma in h1 rule (`theme.css`)
- [x] **`justify-items`** → `justify-content` on flex container (`speech-bubbles.css`)
- [x] **`svg-variables.css`** — replaced 131 KB corrupt data URI with direct `url('../assets/components/that-aiguy-logo.svg')` reference
- [x] **Duo phone images** — fixed: `flex`/`width` was on `<img>`, not `<picture>` (the actual flex child); corrected via element specificity CSS
- [x] **Third phone screenshot** — added `iphone-ss-04-victimsettings.png` to duo wrap in `index.html`
- [x] **Speech bubble SVGs** — fixed `max-width: 100%` reset capping SVGs at 150px; added `width: 100%; height: auto` on `.promo-phone-wrap figure img`
- [x] **`img` width/height attributes** — all converted from `%`/`"auto"` to integer pixel values (CLS prevention)
- [x] **Inline logo `em`** — fixed collapsed height on `display: inline-block; font-size: 0`; added explicit `height: 3.5rem`; pull-up via `position: relative; top: -2.5rem; margin-bottom: -2.5rem`
- [x] **`.taig-lg` variant** — larger inline logo: `height: 7rem; width: 15rem`
- [x] **Bottom nav** — resized 50% bigger (`gap: 20px`, larger padding, `font-size: 0.85rem`, icon `2.6rem`); `body padding-bottom` increased to accommodate
- [x] **Theme toggle** — repositioned to `bottom: 1.6rem; right: 2.2rem` (was top-right)
- [x] **Intro two-column layout** — replaced single-column float with two flex columns (`promo-col-l`, `promo-col-r`); logo `position: absolute`, centred, `z-index: -1`; `::before` pseudo-elements with `shape-outside: circle()` curve text away from logo on each side
- [x] **Logo size** — 15rem, anchored `top: 0` (near top of intro section)
- [x] **"Flagellate yourself"** paragraph — separated to full-width `promo-full-width` div below columns
- [x] **Drop-cap gradient pattern** applied to paragraph openings: "Bring", "At the press of a button", "Flagellate yourself" — `<span><strong><span>X</span>word</strong> phrase</span>`

---

## Priority 2 — Asset tidy ✅ Complete

- [x] Move `assets/available-on-the-app store.png` → `assets/components/available-on-the-app-store.png` (remove space)
- [x] Move `assets/privacy-policy.svg` → `assets/icons/privacy-policy.svg`
- [x] Move `assets/speech-bubbles/` → `assets/graphics/speech-bubbles/`
- [x] Move `assets/iphones/` → `assets/graphics/iphones/`
- [x] Update all `src` references in HTML/CSS after moves
- [x] Convert `assets/iphones/iphone-ss-*.png` to WebP (1x + 2x) — `_72dpi.webp` + `_144dpi.webp` pairs
- [x] Convert `assets/graphics/dogg-award*.png` to WebP — 1x (`72dpi_200x200`) + 2x (`144dpi_400x400`) pairs

---

## Priority 3 — Styling features *(mobile only)*

- [ ] **Download button** — cycle through 9 neumorphic keyframe styles (1s transition, 4s hold); overlay App Store SVG
- [ ] **Badge click** → morph to speech bubble `clip-path` shape (match 4 SVG assets)
  - Reference: `clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)`
- [ ] **Claude icon** — `assets/icons/claude-ai-icon.svg` fixed bottom-left; scroll-driven rotation (clockwise down, anticlockwise up)
- [ ] **Glassify** — apply `.glass` modifier to: badges, slider/review cards (do not touch stars)

---

## Known issues

| Issue | File | Notes |
|-------|------|-------|
| `.badges dd` hardcoded dark gradient | `css/badges.css:47` | Not theme tokens — dark mode appearance untested |
| Badge hover-only interaction | `css/badges.css` | No click/active state for mobile touch |

---

## Open questions

- [x] **RESOLVED** — `main.js` loads before `theme.js` (order: main → theme → logger)
- [ ] **Accessibility + schema pass** — ARIA audit, `schema.org` markup *(moved to end — low priority)*

---

## Content *(whenever)*

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Confirm star ratings: Sheldon + Jeff corrected to `value="1"` — is this right?

---

## Phase 2 *(later)*

- [ ] Desktop layout pass (bottom nav, typography, spacing)
- [ ] **Speech bubble animation** (iterative): jiggle → jiggle-pause loop → dart toward iPhone → desync → scroll-triggered → viewport-width triggered
- [ ] **Light effect** (dark mode): default light → dark on = 3s pause + `pull-chord-on.mp3` + overhead radial glow → dark off = `pull-chord-off.mp3` + glow removed
- [ ] Deploy to GitHub Pages + custom domain
- [ ] SEO: OG image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] Smart App Banner (enable once App Store ID known)
- [ ] Gate `logger.js` test block behind debug flag before production
