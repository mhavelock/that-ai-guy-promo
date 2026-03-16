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

---

## Pending — cleanup & code quality (do first)

- [ ] **CLAUDE.md** — update CSS architecture section to document glass modifier pattern + all current CSS files
- [ ] **CLAUDE.md** — reinforce mobile-first rule: no `max-width` breakpoints, `min-width`/`width >=` only
- [ ] `css/grid.css` — migrate `min-width` queries to `(width >= 768px)` range syntax
- [ ] **Mobile-first audit** — scan all CSS files for any remaining `@media (width < ...)` or `max-width` breakpoints; replace with mobile-first equivalents
- [ ] `css/reviews.css` — stub, not imported; populate or delete
- [ ] `css/components.css` — stub; populate or delete
- [ ] `css/custom.css` — legacy Phase 1, orphaned; delete or archive
- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently main → theme → logger). Confirm correct order
- [ ] **OPEN** — comma-separated name/place origin styles in `utilities.css` not working; investigate

---

## Pending — conventions (do second)

- [ ] **Glass modifier pattern** — separate structural styles from glassmorphism:
  - `.theme-toggle` → structure only; `.theme-toggle.glass` → blur/border/shadow
  - `.bottom-nav` → same split
  - Convention documented in `CLAUDE.md`
- [ ] **Accessibility + schema pass** — review Mat's recent changes; add missing ARIA, `schema.org` markup where appropriate

---

## Pending — foundational (do third)

### Font
- [ ] Replace `OmnesBold` / `@font-face` with **Fredoka** variable Google Font (300–700)
  - Add `<link rel="preconnect">` + stylesheet to `index.html` and `privacy.html`
  - Update `font-family` stack in `theme.css`; remove `@font-face` block

### Theme defaults
- [ ] **Default site to light mode** — update `theme.js` inline init script

### Typography
- [ ] Add `line-height` throughout (explicit values on all type rules)
- [ ] Set `max-width` on paragraphs
- [ ] **Fluid text** — `clamp()` / viewport-relative sizes for headings and body

### Asset tidy
- [ ] Move `assets/available-on-the-app store.png` → `assets/components/` (rename: remove space)
- [ ] Move `assets/privacy-policy.svg` → `assets/icons/`
- [ ] Move `assets/speech-bubbles/` → `assets/graphics/speech-bubbles/`
- [ ] Move `assets/iphones/` → `assets/graphics/iphones/`
- [ ] Update all `src` references in HTML/CSS after moves
- [ ] Convert `assets/iphones/iphone-ss-*.png` to WebP (1x + 2x)
- [ ] Convert `assets/graphics/dogg-award.png` to WebP; confirm 200×200 dimensions placeholder
- [ ] App Store badge — confirm approach (SVG overlay on button)

### Images → `<picture>`
- [ ] Convert all `<img>` to `<picture>` with `srcset` throughout
- [ ] **OPEN** — Mat asks: drawbacks to % widths for images? (Claude to advise before proceeding)
- [ ] **OPEN** — Mat asks: logic of `.promo-logo { height: calc(0.5rem * 1.5 * 10) }`? Explain intent

---

## Pending — styling features

### Reviews section *(done)*
- [x] Style using open-quote + blockquote pattern — reference `docs/discovery/workshop.css`
- [x] Add avatar images from `assets/avatars/`
- [x] Center star ratings (do not restyle them)
- [x] Fix layout — pushing outside main div on mobile (`overflow-x: clip`)
- [x] Slide 2 card taller due to longer text — fixed with `-webkit-line-clamp: 2` + `min-height: 4.5rem` on quote `<p>`

### Bottom nav
- [ ] Mobile: `bottom: calc(3.66rem + env(safe-area-inset-bottom, 0px))`, `gap: 20px`, all aspects 50% bigger
- [ ] Desktop: 50% the current height

### Theme toggle position
- [ ] Mobile: `right: 2.2rem; top: 1.6rem`

### Download button
- [ ] Cycle through 9 neumorphic keyframe styles (1s transition, 4s hold per style)
- [ ] Overlay App Store SVG (icon + text); match shape of existing PNG (oblong, black on white)

### Badges
- [ ] Squish/click → speech bubble `clip-path` shape (match 4 SVG speech bubble assets)
  - Reference: `clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)`

### Glassify
- [ ] Apply glass modifier to: badges, slider/reviews cards — **do not change stars**

### CSS parallax
- [ ] CSS-only parallax effect (see `docs/parallax.md` once available)

### Claude icon
- [ ] Position `assets/icons/claude-ai-icon.svg` at bottom-left
- [ ] Scroll-driven rotation: clockwise down, anticlockwise up

---

## Pending — content

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Confirm star ratings: Sheldon + Jeff corrected to `value="1"` to match "One star" copy — is this right?

---

## Pending — Phase 2

- [ ] **Speech bubble animation** (iterative, stop-test at each stage):
  jiggle → jiggle-pause loop → dart toward iPhone → desync → scroll-triggered → viewport-width triggered
- [ ] **Light effect** (dark mode):
  default light → dark on = 3s pause + `pull-chord-on.mp3` + overhead radial glow → dark off = `pull-chord-off.mp3` + glow removed
  Audio function isolated from toggle function
- [ ] Deploy to GitHub Pages + custom domain
- [ ] SEO: OG image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] Smart App Banner (enable `<meta name="apple-itunes-app">` once App Store ID known)
- [ ] Gate `logger.js` test block behind debug flag before production
