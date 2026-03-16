# Phase 1 Tasklist — That AI Guy Promo Site

**Phase:** 1 — Foundation
**Created:** 2026-03-13
**Updated:** 2026-03-16
**Status:** In progress

> **Working convention:** Stop and check between each task — show `git diff` when done.

---

## Completed

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
- [x] Code review + bug fixes — 2026-03-16 (see handoff)
- [x] `stars.css` — `--s` 50px → 30px; track was overflowing slider cards on mobile
- [x] `slider.css` — page-scroll-on-slide-change fixed via `overflow-x: clip` on `.promo-reviews`
- [x] `css/reviews.css` — styled: open-quote header (large `"` + horizontal rule), italic bold quote, centered stars, attribution row (short rule + name/location + circular avatar)
- [x] `css/utilities.css` — comma separator scoped with `:not(.review-quote)` to prevent bleed into review cards
- [x] `css/slider.css` — active bullet dot changed to `var(--color-text)` (dark grey)
- [x] `css/slider.css` — slider card and bullet colours themed for dark mode (`--color-surface`, `--color-border`, `--color-text-muted`)

---

## Priority 1 — Mobile-first foundation *(do next)*

> Focus: mobile only. Desktop overrides come later.

### Mobile-first CSS audit
- [ ] **CLAUDE.md** — reinforce mobile-first rule: base styles = mobile, `min-width`/`width >=` only; document exception for `.slider__holder`
- [ ] Audit all CSS files — remove all `@media (width < ...)` and `@media (max-width: ...)` breakpoints; rewrite as mobile-first equivalents
  - **Exception (leave as-is):** `@media (max-width: 900px) { .slider__holder { max-width: 300px; } }` — third-party slider, too fragile to refactor

### Font
- [ ] Replace `OmnesBold` / `@font-face` with **Fredoka** variable Google Font
  - Add `<link rel="preconnect">` + stylesheet to `index.html` and `privacy.html`
  - Update `font-family` stack in `theme.css`; remove `@font-face` block
  - **OPEN** — weight range: 300–700 as originally noted, or different?

### Glass modifier pattern
- [ ] Separate structural styles from glassmorphism in `theme.css`:
  - `.theme-toggle` → structure only; `.theme-toggle.glass` → blur/border/shadow
  - `.bottom-nav` → same split
  - Document convention in `CLAUDE.md`
  - Apply glass modifier class in HTML

### Images → `<picture>` with srcset
- [ ] Convert all non-SVG `<img>` to `<picture>` with mobile + desktop `srcset`
  - Use same image file for both sizes for now (revisit when final dimensions are known)
  - Breakpoint for mobile/desktop switch: **OPEN** — assume `768px`?
  - SVGs: leave as `<img>` — no change needed

### Fluid text
- [ ] Implement viewport-relative fluid typography using `clamp()`
  - Mobile: fixed line-heights — **OPEN** — confirm values (see clarifications below)
  - Desktop: `calc(30px + (90 - 30) * (100vw - 320px) / (1500 - 320))` for headings
  - Body text scale: **OPEN** — confirm min/max px values

### Text wrap around logo *(stop & test after this)*
- [ ] Remove current `shape-outside` implementation (broken)
- [ ] Rewrite: logo scaled to ~12 lines of text height, text wraps around it with `shape-outside`
  - Stop and test before proceeding — layout will shift

---

## Priority 2 — Asset tidy

- [ ] Move `assets/available-on-the-app store.png` → `assets/components/available-on-the-app-store.png` (remove space)
- [ ] Move `assets/privacy-policy.svg` → `assets/icons/privacy-policy.svg`
- [ ] Move `assets/speech-bubbles/` → `assets/graphics/speech-bubbles/`
- [ ] Move `assets/iphones/` → `assets/graphics/iphones/`
- [ ] Update all `src` references in HTML/CSS after moves
- [ ] Convert `assets/iphones/iphone-ss-*.png` to WebP (1x + 2x)
- [ ] Convert `assets/graphics/dogg-award.png` to WebP

---

## Priority 3 — Styling features *(mobile only)*

### Reviews section *(done)*
- [x] Style using open-quote + blockquote pattern
- [x] Add avatar images; center star ratings; fix layout; clamp quote text

### Glassify
- [ ] Apply `.glass` modifier to: badges, slider/review cards — **do not change stars**

### Bottom nav *(mobile only for now)*
- [ ] Reposition + resize: `bottom: calc(3.66rem + env(safe-area-inset-bottom, 0px))`, `gap: 20px`, all aspects 50% bigger

### Theme toggle
- [ ] Mobile: `position: fixed; right: 2.2rem; top: 1.6rem`

### Download button
- [ ] Cycle through 9 neumorphic keyframe styles (1s transition, 4s hold per style)
- [ ] Overlay App Store SVG; match oblong shape of existing PNG

### Badges
- [ ] Click → morph to speech bubble `clip-path` shape (match 4 SVG speech bubble assets)
  - Reference: `clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)`

### Claude icon
- [ ] Position `assets/icons/claude-ai-icon.svg` at bottom-left, fixed
- [ ] Scroll-driven rotation: clockwise scrolling down, anticlockwise scrolling up

---

## Cleanup & housekeeping *(alongside, as we go)*

- [ ] **CLAUDE.md** — update CSS architecture section to list all current CSS files
- [ ] `css/components.css` — stub; populate or delete
- [ ] `css/custom.css` — legacy Phase 1, orphaned; delete
- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently main → theme → logger)
- [ ] **Accessibility + schema pass** — add missing ARIA, `schema.org` markup

---

## Content *(whenever)*

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Confirm star ratings: Sheldon + Jeff corrected to `value="1"` — is this right?

---

## Phase 2 *(later)*

- [ ] **Speech bubble animation** (iterative):
  jiggle → jiggle-pause loop → dart toward iPhone → desync → scroll-triggered → viewport-width triggered
- [ ] **Light effect** (dark mode):
  default light → dark on = 3s pause + `pull-chord-on.mp3` + overhead radial glow → dark off = `pull-chord-off.mp3` + glow removed
- [ ] Desktop layout pass (bottom nav, typography, spacing)
- [ ] Deploy to GitHub Pages + custom domain
- [ ] SEO: OG image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] Smart App Banner (enable once App Store ID known)
- [ ] Gate `logger.js` test block behind debug flag before production
