# Phase 1 Tasklist — That AI Guy Promo Site

**Phase:** 1 — Foundation
**Created:** 2026-03-13
**Updated:** 2026-03-24
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

### Session 2026-03-22 — Codewall animations + phones layout

- [x] **Codewall syntax animations** — `background-clip: text` gradient sweeps on 6 syntax classes (`.cw-c/k/s/n/p/e`); comet streak (`cw-sweep`) + opacity breathing (`cw-breathe`) per class with staggered durations; `prefers-reduced-motion` fallbacks to flat colour
- [x] **Codewall wave animation** — font-size pulse (`cw-wave`) traveling top→bottom via `--wave-n` × 2s delay; 6 wave groups in HTML; inline-safe (font-size + letter-spacing only)
- [x] **Codewall full-width text** — removed padding from `.promo-codewall`; text runs edge-to-edge
- [x] **Phones-r 1.5× size increase** — width 50%→75% (mobile), 42%→63% (desktop)
- [x] **Victimsettings height match** — `flex: 1.685` on `picture:last-child` (derived: 1262/752 = 1.678); `align-self: initial`; all imgs `width: 100%`; height matches 600×1262 pair at any viewport
- [x] **Phones max-height cap** — `max-width: 40.5rem` on `.codewall-phones-r`; caps phone height at ~225px above ~560px viewport
- [x] **Inline flow fix** — `codewall-phones-r` changed from `<div>` → `<span>`; avoids anonymous block splitting that was breaking float wrapping
- [x] **`overflow-wrap: anywhere`** on `.promo-codewall` — prevents long tokens (e.g. `SpeechRecognitionCoordinator.swift`) from gapping below the float

### Session 2026-03-22 — Intro logo + shape-outside refinements

- [x] **Logo fluid scaling revised** — single continuous `clamp()` formula: 12rem (320px) → 22rem (768px), locked above; no stepped breakpoints; `height: auto` added to prevent HTML attr capping the size; HTML attrs updated to `220×220`
- [x] **Shape-outside fluid scaling** — `::before` pseudo height + width + circle radius all use same `clamp()` formula in lockstep with logo; no breakpoints needed
- [x] **Right column extra space** — right `::before` circle radius `2rem` wider than left (8rem→13rem vs 6rem→11rem); float width matches radius exactly to prevent browser clipping the shape (clipped shapes produce straight vertical text edges instead of curves)
- [x] **Screenshot workflow documented** — `docs/context/summaries/screenshot-workflow-investigation.md`; root cause: VS Code + Claude Code CLI fighting over same Playwright Chrome user-data-dir; fix: remove Playwright MCP from VS Code

### Session 2026-03-22 — Intro layout refinements + asset tidy

- [x] **Intro logo fluid scaling** — `clamp()` growth from 150px (450px vp) → 200px (768px+); shape-outside floats scale in sync
- [x] **Codewall text trimmed** — removed lower Swift/TTS/CoreML block; codewall ends at Russell circumplex line
- [x] **Asset tidy** — `assets/iphones/` + `assets/speech-bubbles/` moved to `assets/graphics/iphones/` + `assets/graphics/speech-bubbles/`; WebP 1x/2x pairs generated; all `src` paths updated

### Session 2026-03-23 — 404 page

- [x] **`404.html`** — custom 404 page based on `holding.html` design; pedantic comedy copy; `noindex, nofollow`; "back to homepage" link; Cloudflare Pages picks this up automatically for unmatched routes — no dashboard changes needed

### Session 2026-03-23 — Contact form + FormZero integration

- [x] **FormZero deployed** — self-hosted form backend on Cloudflare Workers at `formzero.mat-havelock.workers.dev`; D1 database bound as `DB`; free plan (note: signup/login hit CPU limit 1102 — manage via D1 console only)
- [x] **FormZero user + form seeded via D1 SQL** — bypassed bcrypt signup; user `mat@that-ai-guy.app` + form `Contact` inserted directly; form ID: `a1f3c2e8-4b7d-4e9a-8c6f-1d2e3f4a5b6c`
- [x] **Gmail SMTP configured** — `settings` table in FormZero D1 seeded with Gmail App Password; `smtp.gmail.com:587` STARTTLS; notifications to `m.j.havelock@gmail.com` confirmed working
- [x] **Contact form wired** — `full.html` form action → FormZero endpoint with `?redirect=https://that-ai-guy.app/full.html%23sent`; `method="POST"`; `name` attrs on all inputs
- [x] **Message textarea added** — 2-line height, hidden scrollbar (all browsers), 📩 icon, `name="message"`
- [x] **`css/contect-form.css` created + linked** — neumorphic contact form styles; linked in `full.html`
- [x] **Sent confirmation modal** — CSS-only `:target` on `#sent` hash; fades in on FormZero redirect, auto-fades out after 5s; `×` close link; `full.html#sent` shows it directly for testing
- [x] **`wrangler.jsonc` fixed** — removed unsupported `assets` field that was blocking Pages deploys
- [x] **Deploy workflow established** — Claude commits → Mat pushes to git → Mat deploys; `protect-commands.sh` hard-blocks `git push` and `--branch=main` deploys from Claude

---

### Session 2026-03-24 — Site audit: interactive states, accessibility, clean code, animation performance

- [x] **Interactive states** — hover/active/focus-visible/visited added across all interactive elements: `a` (global), `.bottom-nav-item`, `.theme-toggle`, `.btn-appstore`, `.contact-form .btn`, `.contact-form input`, `.sent-close`, `.badges dl`, `.bullets__item`, `.slider__item`
- [x] **Focus = active** — `:focus-visible` uses same visual language as active/pressed state; `outline: none` with explicit visual replacement throughout
- [x] **Visited state** — `a:visited { opacity: 0.9 }` in global.css; `.bottom-nav-item.is-active { opacity: 1 }` prevents visited dim overriding current-page indicator
- [x] **Keyboard accessibility** — `tabindex="0"` on `.bullets__item` labels (slider); `aria-hidden="true"` on `<i>` emoji elements; `aria-label` + `autocomplete` on all 3 form inputs
- [x] **CSS clean code** — dead CSS removed from `theme.css` (`.promo-features`, `.promo-logo2`, `.promo-roast`, `.promo-phone-wrap--duo`, `.promo-sign`, `.promo-logo3`); `contect-form.css` double-load (`@import` + `<link>`) fixed; `px` → `rem` fixes; `gap: 20px` → `2rem`; media query `768px` → `76.8rem`
- [x] **`privacy.html` bugs** — `.glass` modifier missing from `.bottom-nav` and `.theme-toggle`; broken logo + privacy icon paths fixed; script load order corrected
- [x] **Script load order** — both HTML files: `logger.js` → `theme.js` → `main.js`
- [x] **Animation performance audit** — all animations reviewed; compositor-safe confirmed for top-bg-fx, speech-bubbles, parallax, stars; `cw-sweep` already gated; `btn-appstore-cycle` intentional design; `slider.css transition: all` noted (fragile third-party)
- [x] **`badges.css` prefers-reduced-motion** — `transition: clip-path 0.7s var(--spring)` moved inside `@media (prefers-reduced-motion: no-preference)` gate (was missing)
- [x] **`global.css` / `global-xtra.css`** — self-contained unused sections (Tooltips, Modal/Dialog, Icons, site-header Navigation, site-footer) moved to new `global-xtra.css`; imported by `global.css`; scheme-based components (Buttons, Forms, Alerts) kept in `global.css`; index renumbered 1–9

### Session 2026-03-24 — Contact form responsive layout

- [x] **Sent modal** — CSS-only `:target` fade; dark mode via `[data-theme]` tokens; glass modifier applied; complete
- [x] **Contact form desktop layout** — `@media (width >= 768px)` horizontal pill bar: logo → name → email → message (flex-grow) → Contact button; h2/p hidden at desktop, shown mobile; dark mode neumorphic shadows via `[data-theme="dark"]`; message field `<input type="text">` (single-line horizontal scroll); max-width `90rem`, width `100%`; specificity bug fixed (`.input-field input.input-message` override)

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

- [x] **Download button** — 9 neumorphic keyframe styles (4s hold + 1s transition, 45s cycle) in `css/download-btn.css`; App Store SVG overlay (`fill:#1d1f24`, transparent bg); dark mode: animation off, dark neumorphic surface + `filter:invert(1)` for white logo; `prefers-reduced-motion` fallback; URL placeholder — update when App Store ID known
- [x] **Badge hover** → springy `clip-path` morph circle → speech bubble per badge; unique shape derived from bulle1–4 SVGs; spring easing via `linear()` token (`--spring`); `display:none` → `opacity:0` so fade transition works; per-badge circle default polygon (r=58%) ensures `dt` border never clipped
- [x] **Custom cursors** — `.cur` files replaced with PNG assets (`thumbsup-01–04.png`); extracted from SVG wrappers (browsers block embedded resources in cursor context); badge 2–4 resized to 100px wide; cursor definitions in `badges.css` lines 50–53
- [x] **Glassify** — `css/glass.css` created; `.glass` modifier applied to: `.badges` (frosted surface, gradient preserved on `dt`, morph untouched), `.contact-form` (frosted glass + neumorphic dual-shadow), `.promo-reviews` (slider-card only — transforms untouched), `.promo-download` / `.btn-appstore` (animation stopped, static glass surface + neumorphic depth); tokens in `:root` + `[data-theme="dark"]`
- [ ] **Claude icon** — `assets/icons/claude-ai-icon.svg` fixed bottom-left; scroll-driven rotation (clockwise down, anticlockwise up)

---

## Known issues

| Issue | File | Notes |
|-------|------|-------|

---

## Open questions

- [x] **RESOLVED** — `main.js` loads before `theme.js` (order: main → theme → logger)
- [ ] **Accessibility + schema pass** — ARIA audit, `schema.org` markup *(moved to end — low priority)*

---

## Content *(whenever)*

- [ ] App Store URL — update `href` on `.btn-appstore` in `full.html` (currently `https://www.apple.com/app-store/` placeholder)
- [ ] Review and sign off privacy policy content
- [ ] Contact email in privacy policy (`hello@thataiguy.app` — placeholder)
- [ ] Confirm star ratings: Sheldon + Jeff corrected to `value="1"` — is this right?

---

## Desktop *(audit after mobile is complete)*

- [ ] **Codewall `padding-top`** — at 1228px the speech bubble overlaps the section above. Current `padding-top: 9rem` at `76.8rem+` may need increasing or a fluid `clamp()` between breakpoints
- [ ] **Codewall `min-height`** — mobile value `clamp(70rem, 300vw, 80rem)` set to prevent CLS from `cw-wave` animation. Desktop breakpoint should override with a lower value (layout is different at 76.8rem+)
- [ ] **Codewall phone overlap** — at 76.8rem+ the left phone (42%) + phones-r (63%) = 105%, they overlap. Fix: reduce phones-r desktop width, or rethink layout at that breakpoint
- [ ] Desktop layout pass (bottom nav, typography, spacing)

---

## Phase 2 *(later)*

- [ ] **Speech bubble animation** (iterative): jiggle → jiggle-pause loop → dart toward iPhone → desync → scroll-triggered → viewport-width triggered
- [ ] Deploy to GitHub Pages + custom domain
- [ ] SEO: OG image, sitemap, robots.txt, canonical URL
- [ ] Analytics (if required)
- [ ] Smart App Banner (enable once App Store ID known)
- [ ] Gate `logger.js` test block behind debug flag before production
