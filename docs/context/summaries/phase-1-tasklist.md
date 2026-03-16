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

### Mobile-first CSS audit *(done)*
- [x] Audit all CSS files — only `grid.css` had `min-width` syntax; updated to `(width >= 768px)`
- [x] `custom.css` (orphaned) and `components.css` (empty stub) deleted
- [x] **Exception (leave as-is):** `slider.css` — third-party component, too fragile to refactor; `.slider__holder` max-width at 900px is an intentional exception
- [ ] **CLAUDE.md** — update to document mobile-first convention and `.glass` modifier pattern

### Font *(done)*
- [x] Replaced `OmnesBold` / `@font-face` with **Fredoka** variable Google Font (300–700)
- [x] `<link rel="preconnect">` + stylesheet added to `index.html` and `privacy.html`
- [x] `font-family` updated in `theme.css`; `@font-face` block removed

### Glass modifier pattern *(done)*
- [x] `.bottom-nav` split: structure on `.bottom-nav`, glassmorphism on `.bottom-nav.glass`
- [x] `.theme-toggle` split: structure on `.theme-toggle`, glassmorphism on `.theme-toggle.glass`
- [x] `.glass` class applied in HTML
- [ ] **CLAUDE.md** — document `.glass` modifier convention

### Images → `<picture>` with srcset *(done)*
- [x] All non-SVG `<img>` converted to `<picture>` with mobile + desktop `<source>`
- [x] Same image file used for both sizes — swap in separate files when final dimensions known
- [x] `loading="lazy"` added to below-fold phone images

### Fluid text *(done)*
- [x] Mobile (< 768px) fixed: `p` = 1.2rem / lh 1.5; `h1` = 1.5rem; `h2–h4` = 1.333rem; `h5–h6` = 1.25rem; all lh 1.66
- [x] Desktop (≥ 768px): `clamp()` fluid scaling from mobile base → proportional max at 1248px; `p` max 2rem
- [x] Badges pinned at `font-size: 1rem` (exception); reviews + stars already have explicit sizes

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

- [x] **CLAUDE.md** — updated: file structure, CSS architecture, mobile-first + glass modifier conventions, Fredoka font, fixed stale references
- [x] **CSS audit** — completed 2026-03-16:
  - Removed dead h1/h2 desktop clamp overrides from `global.css` (overridden by `theme.css`)
  - Added `.promo-text p { max-width: none }` to prevent global 65ch cap bleeding into promo page
  - Removed ~150 lines of unused third-party demo code from `slider.css` (labs-bar, section, button, entry classes)
  - Fixed `theme.css` section numbering (was: 9→11→12→11→12; now sequential)
  - **Known issue**: `badges.css .badges dd` uses hardcoded dark gradient — not theme tokens, dark mode appearance untested
  - **Known issue**: Badge hover interaction (clip-path morph) is hover-only — needs click/active state for mobile touch
- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently main → theme → logger)
- [ ] **Accessibility + schema pass** — add missing ARIA, `schema.org` markup

---

## Content *(whenever)*

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Confirm star ratings: Sheldon + Jeff corrected to `value="1"` — is this right?

---

## Backlog — revisit when layout settles

- [ ] **Text wrap around logo** — remove current broken `shape-outside`; rewrite with logo ~12 lines tall, text wrapping around with `shape-outside: circle(50%)`

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
