# Desktop Redesign Plan — That AI Guy Promo
**Art Director:** Claude
**Scope:** Desktop only — `@media (width >= 76.8rem)`. Mobile untouched.
**Status:** Planning → Implementation (task by task, client review after each)

---

## Design Brief

**Goal:** A cohesive, impressive desktop experience that entertains, sells the app, and showcases advanced CSS. Homogeneous — one connected visual language, not a scatter of unrelated effects.

**Connecting theme:** **Liquid glass control panel**
Think: a high-tech iOS instrument panel — frosted glass frames grouping content into "panels", blue accent glow (`--color-tg: #045ada`), subtle motion, symmetric layout, techie personality.

**Palette:** Site tokens unchanged. Blue accent `#045ada` (light) / `#3a7abf` (dark). Glass surfaces as defined in `glass.css`.

---

## Current Page Sections (top → bottom)

| # | Element | Class | Notes |
|---|---------|-------|-------|
| 1 | Intro text columns | `.promo-intro` | Logo behind two columns |
| 2 | Badges | `.promo-badges` | 4 badge grid |
| 3 | Codewall | `.promo-codewall` | Phone screenshots + code |
| 4 | Download CTA | `.promo-download` | App Store button |
| 5 | Reviews + Awards | `.grid-1x2` | Slider + award images |
| 6 | Footer / Contact | `footer` | Contact form |
| — | Bottom nav | `.bottom-nav` | Fixed nav |
| — | Theme toggle | `.theme-toggle` | Fixed button |

---

## Desktop Layout Vision

### Glass Panel System
Group related elements into **inset glass frames** — frosted containers with:
- `backdrop-filter: blur(24px) saturate(200%)`
- `background: rgba(255,255,255,0.08)` (light) / `rgba(255,255,255,0.04)` (dark)
- `border: 1px solid rgba(255,255,255,0.18)`
- `border-radius: 2rem`
- `box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.12)`
- New token: `--glass-panel-*` added to `glass.css`

### Proposed Desktop Panels
1. **Hero panel** — wraps intro text + badges in one unified glass frame (2-column: text left, badges right)
2. **Stats panel** — NEW section: 3 animated counters + % bars between codewall and download
3. **Marquee strip** — NEW: scrolling text ticker between intro and codewall
4. **Download panel** — existing glass treatment, enhanced with star-orbit around logo
5. **Social proof panel** — reviews + awards reframed as one coherent glass panel
6. **Footer panel** — contact form + radar widget side by side in glass frame

---

## Techniques to Implement

### T1 — Coloured Scrollbar
**Source:** https://codepen.io/villepreux/pen/yyYyPLd
**Scheme:** Blue (`--color-tg`)
**Placement:** Global — `html` / `::-webkit-scrollbar` rules
**File:** `css/desktop.css`
**Status:** ✅ Done

### T2 — Radar Widget
**Source:** https://codepen.io/Cyril-Bosselut/pen/MYwGpQa
**Scheme:** Blue
**Placement:** Footer area — alongside contact form inside the footer glass panel. Decorative background element, positioned absolute within panel.
**File:** `css/radar.css`
**HTML:** `<div class="radar" aria-hidden="true">` inside footer section
**Status:** ✅ Done

### T3 — Star Orbit
**Source:** https://codepen.io/metamezzo/pen/NPWvqQp
**Adaptation:** Star orbits the **TG blue button logo** in the bottom nav. Use CSS `@keyframes` orbit around `.bottom-nav-icon` in the home nav item.
**File:** `css/desktop.css` (orbit rules)
**HTML:** Add `<span class="orbit-star" aria-hidden="true"></span>` inside the home nav `.bottom-nav-item`
**Status:** ✅ Done

### T4 — AI Is Thinking
**Source:** https://codepen.io/deepak_kharah/pen/xxobRPM
**Placement:** Inside the codewall section — floats as a small pill/badge near the speech bubbles phone, suggesting the AI is processing. Hidden on mobile.
**File:** `css/desktop.css`
**HTML:** `<div class="ai-thinking" aria-hidden="true">` added to codewall section
**Status:** ✅ Done

### T5 — Scrolling Text Marquee
**Source:** https://codepen.io/freeplayg/pen/dyEeevX
**Content:** Comedy one-liners / app feature callouts cycling left. E.g.: `"Technically, it's not eavesdropping if you consented"  ·  "Rated 5 stars by people who enjoy being corrected"  ·  "Powered by condescension and 44.1kHz audio"  ·  "Warning: may cause self-doubt and dinner party tension"`
**Placement:** Between `.promo-intro` and the badges divider. Full-width strip.
**File:** `css/marquee.css`
**HTML:** New `<div class="marquee-strip">` after intro section, desktop-only (hidden on mobile via `display: none` → `display: block` at 76.8rem)
**Status:** ✅ Done

### T6 — Animated Blob Badge
**Source:** https://codepen.io/starrifyx/pen/yLrWVVq
**Adaptation:** `.badges.glass dl dt` becomes the animated morphing blob. Apply `border-radius` keyframe animation directly to the `dt` element in `badges.css` (desktop-only media query).
**File:** `css/badges.css` (desktop @media block)
**Status:** ✅ Done

### T7 — Flip Text
**Source:** https://codepen.io/cbolson/pen/bNGjarJ
**Placement:** The intro section sign-off — `"That AI Guy"` SVG (front) spins on Y-axis to reveal "Naturally." (back) as user scrolls past the intro section.
**File:** `css/flip-text.css`
**HTML:** `.flip-card` wrapper around `em.taig-lg.flip-front` + `span.taig-back`
**Status:** ✅ Done
**Key decisions:**
- Y-axis (`rotateY`) not X — coin-flip / spin feel
- `perspective: 1200px` + `transform-style: preserve-3d` on `.flip-card`
- Named timeline `--promo-intro` on `.promo-intro` section — avoids cover-range-at-negative-scroll bug that occurs when element is already in viewport at page load
- Back face: `color: var(--color-tg)` solid blue — gradient text dropped (unreliable with `backface-visibility` + 3D transforms)
- Hover fallback for browsers without scroll-driven animation support

### T8 — Stats Counters + Progress Bars
**Source:** https://codepen.io/cbolson/pen/PwqBVqB + https://codepen.io/educationalworks88/pen/oNQvWNJ
**Content:** 3 tech-flavoured marketing stats about the app:
- **Pedantry Index:** `847` corrections delivered (with bar: 84%)
- **Annoyance Rating:** `99.7`% effective (bar: 100%)
- **Response Time:** `0.3`s interruption latency (bar: 33% — inverted: faster = better)

**Approach:** CSS counter animation on scroll using `@keyframes` + `animation-timeline: view()`. No JS. Combined with a growing progress bar.
**Placement:** New `<section class="promo-stats">` between codewall and download. Desktop-only.
**File:** `css/stats.css`
**HTML:** 3 `.stat-card` elements, each with a counter number + label + progress bar
**Status:** ✅ Done

---

## File Plan

| File | Purpose |
|------|---------|
| `css/desktop.css` | Master desktop file — imports all desktop sub-files, wraps everything in `@media (width >= 76.8rem)` |
| `css/radar.css` | Radar widget — pure CSS |
| `css/marquee.css` | Scrolling text strip |
| `css/stats.css` | Stats section layout + counter animation |
| `css/glass-panels.css` | Glass panel system tokens + `.glass-panel` modifier |

**Import in `theme.css`:**
```css
@import url("desktop.css");  /* ← new, at bottom of imports */
```

**Or link in HTML** (preferred — easier to toggle off):
```html
<link rel="stylesheet" href="css/desktop.css">
```

---

## Implementation Order

Tasks are ordered to maximise early visual impact with minimum breakage risk.

| # | Task | Technique | Complexity | Priority | Status |
|---|------|-----------|------------|----------|--------|
| 1 | Blue scrollbar | T1 | Low | P1 — immediate wow | ✅ Done |
| 2 | Scrolling text marquee | T5 | Low | P1 — sets page tone | ✅ Done |
| 3 | Glass panel system tokens | — | Medium | P1 — foundation for all panels | ✅ Done |
| 4 | Stats counters section | T8 | Medium | P1 — core new content | ✅ Done |
| 5 | Animated blob badge `dt` | T6 | Low | P2 | ✅ Done |
| 6 | Flip text (sign-off) | T7 | Low | P2 | ✅ Done — Y-axis scroll-driven spin via `--promo-intro` named timeline; `color: var(--color-tg)` back face; `transform-style: preserve-3d` |
| 7 | Star orbit (nav logo) | T3 | Medium | P2 | ✅ Done |
| 8 | AI thinking widget | T4 | Medium | P2 | ✅ Done |
| 9 | Radar widget | T2 | High | P3 | ✅ Done |
| 10 | Hero panel (intro + badges in glass frame) | — | Medium | P3 | ⬜ TODO |
| 11 | Footer panel (contact + radar) | — | Medium | P3 | ⬜ TODO |
| 12 | Desktop layout pass (padding, spacing, typography) | — | Medium | P3 | ⬜ TODO |

---

## Rules

- **Mobile-first preserved**: all new CSS lives inside `@media (width >= 76.8rem)` or in files that are never loaded on mobile (or are empty outside the breakpoint)
- **Glass modifier pattern**: `.glass-panel` is an additional modifier class, never baked into structural classes
- **No JS** for purely decorative effects (CSS-only techniques preferred)
- **aria-hidden="true"** on all decorative FX elements
- **Reduced motion**: all animations wrapped in `@media (prefers-reduced-motion: no-preference)` check
- **Client review** after each numbered step above before proceeding

---

## Open Questions

- OPEN: Star orbit — nav logo or intro logo? (nav is always visible — probably better)
- OPEN: Stats copy — confirm 3 metrics and their comedy framing with Mat
- OPEN: Flip text — confirm second line copy ("Your Intellectual Superior"?) with Mat
- OPEN: Radar placement — standalone panel or embedded in footer glass frame?
