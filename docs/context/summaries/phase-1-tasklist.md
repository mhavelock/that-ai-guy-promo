# Phase 1 Tasklist — That AI Guy Promo Site

**Phase:** 1 — Foundation
**Created:** 2026-03-13
**Updated:** 2026-03-16
**Status:** In progress

---

## Completed

- [x] Write and structure `CLAUDE.md`
- [x] Create folder structure (`assets/`, `css/`, `js/`, `docs/`, `context/summaries/`)
- [x] `index.html` — single-page promo (intro, badges, features, roast, sign-off, download, reviews, awards, footer)
- [x] `privacy.html` — privacy policy page
- [x] `css/global.css` — full design system (tokens, reset, typography, layout, buttons, forms, tooltips, modals, alerts, icons, nav, footer, utilities)
- [x] `css/theme.css` — promo page layout, dark/light token system (`[data-theme]`), bottom-nav Liquid Glass, theme toggle
- [x] `css/grid.css` — `grid-4x4` badge grid layout
- [x] `css/utilities.css` — `sr-only`, `flex-center`, blockquote comma separator
- [x] `css/slider.css` — CSS-only carousel (4 slides)
- [x] `css/badges.css` — circle badge hover + squishy animation
- [x] `css/stars.css` — CSS star-rating via `<input type="range">` + `@property`
- [x] `js/main.js` — modal open/close with keyboard support
- [x] `js/theme.js` — light/dark toggle, localStorage persistence, system change listener
- [x] `js/logger.js` — isolated build activity logging system (localStorage + in-memory fallback)
- [x] `docs/test-program.md` — two-track test programme (Claude + Mat checklists)
- [x] Code review run 2026-03-16 — bugs fixed (see below)

### Fixes applied 2026-03-16
- [x] `CLAUDE.md` Rule 9 corrected (was Next.js `public/` rule — wrong project)
- [x] `CLAUDE.md` summary path fixed (`docs/summaries/` → `docs/context/summaries/`)
- [x] `CLAUDE.md` CSS architecture, file structure, and theme toggle UX goal updated
- [x] `global.css` — duplicate `slider.css` import removed
- [x] `global.css` — `.container` duplicate `width`/`margin` conflict removed
- [x] `global.css` — `@media (prefers-color-scheme: dark)` block removed; dark tokens now exclusively in `[data-theme="dark"]` in `theme.css`
- [x] `theme.css` — `[data-theme="light"]` and `[data-theme="dark"]` blocks expanded with all missing tokens (surface, border, buttons, alerts, shadows, stars)
- [x] `index.html` — duplicate `id="review01"` fixed → `review-01` through `review-04`
- [x] `index.html` — `<card>` replaced with `<div>` (not a valid HTML element)
- [x] `index.html` — orphan bullet #5 removed (no matching `#slide-5` radio input)
- [x] `index.html` — awards `srcset` with three identical entries replaced with single `<img>`
- [x] `index.html` — `loading="lazy"` added to awards image; corrected alt text typo
- [x] `slider.css` — removed `.labs-bar` boilerplate (external tutorial code)
- [x] `slider.css` — removed conflicting `.section`, `.button`, `.slider__item-content`, `.slider__item-text` (unused template stubs)
- [x] `slider.css` — hardcoded `#fff` in bullets and `.slider-card` replaced with tokens
- [x] `badges.css` — hardcoded `#000`, `#a5a8ae`, `white` colours replaced with tokens; non-standard `-moz-available`/`-webkit-fill-available` removed; properties alphabetised
- [x] `stars.css` — hardcoded star colours replaced with `--color-star-active`/`--color-star-inactive` tokens; focus outline uses `--color-focus`

### Fixes applied 2026-03-16 (session 2)
- [x] `stars.css` — `--s` reduced `50px → 30px`; star track was 250px, overflowing slider cards on mobile
- [x] `slider.css` — page-scroll-on-slide-change fixed: background cards were translateX'd up to -210px off-screen left; `overflow-x: clip` on `.promo-reviews` contains them within section bounds

---

## Pending — bugs / code quality

- [x] **`new-tasks.txt`** — digested 2026-03-16; tasks distributed below ✓
- [ ] `css/grid.css` — uses `min-width` syntax; migrate to range syntax `(width >= 768px)`
- [ ] `css/theme.css` — `body::after { rotateY(180deg) }` decorator: verify intent visually (ASSUMED: mirrors wave decoration)
- [ ] `css/reviews.css` — stub file not imported anywhere; either add content + import, or delete
- [ ] `css/components.css` — stub file; either populate or delete
- [ ] `css/custom.css` — legacy Phase 1 file, not loaded, classes don't appear in current HTML; delete or archive
- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently: main → theme → logger). `theme.js` handles FOUC-prevention inline in `<head>`, deferred order may not matter — confirm
- [ ] **OPEN** — `@media (width < 768px)` remaining anywhere? Run full audit; remove and replace with mobile-first `min-width` overrides. Clarify in `CLAUDE.md`
- [ ] **OPEN** — comma-separated name/place styles in `utilities.css` — not working; investigate
- [ ] Review slide 2 text size — "One star. The typeface wasn't properly capitalised." is longer and pushes the card taller; may need card min-height or font-size reduction in slider context

---

## Pending — assets

- [ ] **Tidy assets folder** (from new-tasks.txt):
  - Move `assets/available-on-the-app store.png` → `assets/components/` (also rename: remove space)
  - Move `assets/privacy-policy.svg` → `assets/icons/`
  - Move `assets/speech-bubbles/` → `assets/graphics/speech-bubbles/`
  - Move `assets/iphones/` → `assets/graphics/iphones/`
  - Update all `src` references in HTML/CSS after moves
- [ ] Convert `assets/iphones/iphone-ss-*.png` to WebP (1x + 2x per image strategy)
- [ ] Convert `assets/graphics/dogg-award.png` to WebP
- [ ] `assets/graphics/dogg-award.png` — confirm dimensions (currently `width="200" height="200"` set as placeholder)
- [ ] App Store badge — confirm approach (inline SVG, CDN, or local asset)

---

## Pending — styling (Phase 1, next tasks)

### Font
- [ ] Replace `OmnesBold` / `@font-face` with **Fredoka** variable Google Font (300–700 weight range)
  - Add `<link rel="preconnect">` hints + stylesheet link to `index.html` and `privacy.html`
  - Update `font-family` stack in `theme.css`

### Glass modifier pattern
- [ ] Separate glass effect from core functionality — convention: `.element` for structure, `.element.glass` for glassmorphism styles
- [ ] Apply to: `.theme-toggle`, `.bottom-nav`
- [ ] Glassify: badges, slider/reviews cards — **do not change star rating styles**

### Theme toggle
- [ ] Position: `right: 2.2rem; top: 1.6rem` (mobile)
- [ ] **Default to light mode** — update `theme.js` and inline init script

### Bottom nav (mobile)
- [ ] `bottom: calc(3.66rem + env(safe-area-inset-bottom, 0px))`
- [ ] `gap: 20px`
- [ ] Make all aspects 50% bigger (icon, text, padding)
- [ ] Desktop: make nav 50% the current height

### Reviews section *(next task)*
- [ ] Style using `<article><blockquote>` pattern — see `docs/discovery/workshop.css` for reference styles
- [ ] Add avatar images from `assets/avatars/`
- [ ] Center the star ratings (do not restyle them)
- [ ] Fix layout — currently pushes outside main div on mobile
- [ ] **OPEN** — Mat notes the requested styling "may not work" — try and stop to review

### Download button
- [ ] Cycle through 9 neumorphic keyframe styles (1s transition, 4s hold per style)
- [ ] Overlay an App Store SVG (from assets) for icon + text
- [ ] Match shape of `assets/available-on-the-app store.png` (oblong, black text on white)

### Badges
- [ ] Squish/click → speech bubble `clip-path` shape (match 4 SVG speech bubble shapes in assets)
  - Reference: `clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)`

### Typography
- [ ] Add `line-height` throughout (mobile fixed values; desktop fluid)
- [ ] Set `max-width` on paragraphs
- [ ] **Fluid text** — `clamp()` / viewport-relative sizes for headings and body

### Images
- [ ] Convert `<img>` to `<picture>` elements throughout
- [ ] **OPEN** — Mat asks: any drawbacks to % width for images? (Claude to advise)
- [ ] **OPEN** — Mat asks: what is the logic of `.promo-logo { height: calc(0.5rem * 1.5 * 10) }`? Explain intent

### CSS parallax
- [ ] CSS-only parallax effect (see `docs/parallax.md` once available)

### Claude icon
- [ ] Position `assets/icons/claude-ai-icon.svg` at bottom-left of screen
- [ ] Scroll-driven rotation: clockwise scrolling down, anticlockwise scrolling up

---

## Pending — content

- [ ] App Store URL (update `href="#"` on `.btn-appstore` in `index.html`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Review star ratings for Sheldon and Jeff — both say "One star" but corrected to `value="1"` — confirm this is correct

---

## Pending — Phase 2

- [ ] **Speech bubble animation** (iterative — stop and test at each stage):
  1. Jiggle (hover around central position)
  2. Jiggle → pause 2s → jiggle loop
  3. Add dart toward iPhone, return, continue loop
  4. Desync timings, add randomness
  5. Trigger on scroll only (see `docs/parallax.md`)
  6. Trigger on viewport width change (media query keyframe transitions)
- [ ] **Light effect** (dark mode):
  1. Default site to light mode
  2. Dark mode on → 3s pause → play `pull-chord-on.mp3` (high-perf load)
  3. Add radial gradient overhead glow (fixed position, light source off-screen above)
  4. Dark mode off → play `pull-chord-off.mp3`, remove glow
  5. Audio function isolated from toggle function
- [ ] Deploy to GitHub Pages
- [ ] Custom domain setup
- [ ] SEO: Open Graph image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] App Store deep link / Smart App Banner (enable commented `<meta name="apple-itunes-app">` once App Store ID known)
- [ ] Remove or gate `logger.js` test block behind a debug flag before production

---

## Working conventions (from Mat's new-tasks.txt)

- **Stop & check** between each task — show `git diff` when task is finished
- **Glass modifier pattern** — separate structural styles (`.element`) from glass effect (`.element.glass`)
- **CSS sheet specificity** — keep stylesheets specific; separate common utilities from element-specific styles
- **Mobile first** — base styles for mobile, `min-width` overrides only (never `max-width` for breakpoints)
- **`<picture>` for images** — use `<picture>` with `srcset` throughout
- **Line height** — always set explicitly
