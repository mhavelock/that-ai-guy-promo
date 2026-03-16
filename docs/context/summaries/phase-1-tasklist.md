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
- [x] `index.html` — duplicate `id="review01"` fixed → `review-01` through `review-04`
- [x] `index.html` — `<card>` replaced with `<div>` (not a valid HTML element)
- [x] `index.html` — orphan bullet #5 removed (no matching `#slide-5` radio input)
- [x] `index.html` — awards `srcset` with three identical entries replaced with single `<img>`
- [x] `index.html` — `loading="lazy"` added to awards image; corrected alt text typo

---

## Pending — bugs / code quality

- [ ] **OPEN: `new-tasks.txt` not found** — user referenced `docs/discovery/new-tasks.txt` but file does not exist; create and re-run review once available
- [ ] `css/slider.css` — uses `max-width` media queries throughout (violates mobile-first rule); refactor to range syntax `(width < Xpx)` or restructure mobile-first
- [ ] `css/slider.css` — contains irrelevant `.labs-bar` boilerplate (lines ~427–511) from tutorial source; delete
- [ ] `css/slider.css` — redefines `.section` (conflicts with `global.css`); rename or scope
- [ ] `css/slider.css` — hardcoded `#fff` colours won't respond to dark mode; replace with tokens
- [ ] `css/slider.css` — currently imported by BOTH `global.css` (removed) and `theme.css` — confirm single load via `theme.css` only
- [ ] `css/badges.css` — hardcoded `#000`, `white`, `#a5a8ae` colours; replace with tokens
- [ ] `css/badges.css` — uses non-standard `-moz-available` / `-webkit-fill-available`; replace with `stretch` (or `min-content`)
- [ ] `css/stars.css` — hardcoded `#b2aa8e`, `#7b7b7b` colours; replace with tokens
- [ ] `css/grid.css` — uses `min-width` syntax; migrate to range syntax `(width >= 768px)`
- [ ] `css/theme.css` — mobile overrides use `@media (width < 768px)` (desktop-first); refactor to mobile-first `min-width` pattern
- [ ] `css/theme.css` — `body::before` and `body::after` background decorators are identical (same positions); verify intent of `rotateY(180deg)` on second pseudo-element
- [ ] **Two dark mode systems** — `global.css` uses `@media (prefers-color-scheme: dark)` for component colours; `theme.css` uses `[data-theme]` for page colours. Consolidate onto `[data-theme]` only (or ensure both are consistent)
- [ ] `css/reviews.css` — stub file not imported anywhere; either add content + import, or delete
- [ ] `css/components.css` — stub file; either populate or delete
- [ ] `css/custom.css` — legacy Phase 1 file, not loaded, classes don't appear in current HTML; delete or archive

---

## Pending — assets

- [ ] Convert `assets/iphones/iphone-ss-*.png` to WebP (1x + 2x per image strategy)
- [ ] Convert `assets/graphics/dogg-award.png` to WebP
- [ ] `assets/graphics/dogg-award.png` — confirm dimensions (currently `width="200" height="200"` set as placeholder)
- [ ] `assets/available-on-the-app store.png` — filename has a space; rename to `available-on-the-app-store.png`
- [ ] App Store badge — confirm approach (inline SVG, CDN, or local asset)
- [ ] `assets/OmnesBold.otf` — referenced in `theme.css` `@font-face` but file not present in `assets/`; add font file or update font stack

---

## Pending — content

- [ ] App Store URL (update `href="#"` on `.btn-appstore` in `index.html`)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Review star ratings for Sheldon and Jeff — both say "One star" but `value="4.5"` was set; corrected to `value="1"` — confirm this is correct
- [ ] `docs/discovery/new-tasks.txt` — file was referenced but does not exist; create and add items to this list

---

## Pending — Phase 2 (next)

- [ ] Deploy to GitHub Pages
- [ ] Custom domain setup
- [ ] SEO: Open Graph image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] App Store deep link / Smart App Banner (enable commented `<meta name="apple-itunes-app">` once App Store ID known)
- [ ] Remove or gate `logger.js` test block behind a debug flag before production
