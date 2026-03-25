# Session Handoff: CSS iPhone Mockup + Flip-Text Fixes
**Date:** 2026-03-24
**Session Focus:** CSS iPhone mockup alongside App Store button; flip-text bug fixes and mobile-first rewrite.
**Preceded by:** `handoff-2026-03-24-mobile-radar.md`

---

## What Was Accomplished

### 1. Screenshot folder convention
- `ss/` added to `.gitignore` (session screenshots, not committed)
- Rule 12 added to `CLAUDE.md`: screenshots → `ss/`, deleted at session end

### 2. CSS iPhone mockup — `css/iphone.css` (new, 894 lines)
- Frame technique: "Photorealistic pure CSS mobile phone" by Grzegorz Witczak (Wujek_Greg)
  Source: https://codepen.io/Wujek_Greg/pen/LmrweG
- Adapted: upright (rotation/skew stripped); fluid via `transform: scale(calc(var(--iphone-w) / 430px))`
- `--iphone-w: clamp(100px, 30vw, 200px)` — scales from 100px (320px viewport) to 200px
- Screen content: That AI Guy "Victim Profile" mockup — dark theme (`#111020` bg, `#ff6b35` accent), status bar, header, name input "Mat", 7 fire-emoji traits, "Roast" tab active
- All selectors scoped under `.iphone-mockup` — no conflicts
- Attributed in code comments (CSS header + HTML inline)

### 3. Download section layout — `css/download-btn.css`
- `.promo-download`: added `gap: 2rem`, widened padding to `2rem` sides
- Button + iPhone mockup sit side-by-side, both vertically centred via `align-items: center`

### 4. HTML — `full.html`
- iPhone mockup HTML injected inside `.promo-download` after `.btn-appstore`
- `aria-hidden="true"` on wrapper; `tabindex="-1"` on decorative `<button>`
- Attribution comment block above the HTML

### 5. Flip-text — three fixes — `css/flip-text.css`
**Bug: squashed on load**
- Root cause: `animation-range: cover 45% cover 65%` — the `cover` range for a section at the top of the page starts at negative scroll. At scroll=0 the section is already ~40-50% through the cover range → animation was already mid-state → squashed look.
- Fix: changed to `exit` range. `exit 0%` fires precisely when the user begins scrolling and the section starts to leave the viewport. Element is always flat at scroll=0.
- New range: `.flip-front: exit 0% exit 30%` / `.taig-back: exit 18% exit 42%`

**Mobile-first**
- Removed `@media (width >= 76.8rem)` guard around all flip styles
- `view-timeline-name: --promo-intro` moved to base (no media query)
- `.flip-card` base styles now apply at all sizes (was `display: contents` on mobile)
- `.taig-back` base styles now visible on mobile (was `display: none`)

**Copy + spacing**
- Back face text: "Naturally." → "Be That Guy."
- `letter-spacing: -0.04em` added to `.taig-back` to tighten spacing

---

## Key Numbers

| Property | Value |
|---|---|
| iPhone `--iphone-w` | `clamp(100px, 30vw, 200px)` |
| iPhone aspect ratio | `1.707` (734/430) |
| iPhone inner size | `430 × 734px` (scaled via `transform`) |
| App bg | `#111020` |
| App accent | `#ff6b35` |
| flip-front range | `exit 0% exit 30%` |
| flip-back range | `exit 18% exit 42%` |
| taig-back letter-spacing | `-0.04em` |

---

## Files Modified

| File | Action | Description |
|---|---|---|
| `css/iphone.css` | Created | CSS iPhone frame + Victim Profile screen content |
| `css/theme.css` | Modified | `@import url("iphone.css")` added |
| `css/download-btn.css` | Modified | `.promo-download` gap + padding for side-by-side layout |
| `css/flip-text.css` | Rewritten | Mobile-first; exit range; "Be That Guy."; letter-spacing |
| `full.html` | Modified | iPhone mockup HTML in `.promo-download`; flip text copy |
| `.gitignore` | Modified | `ss/` added |
| `Claude.md` | Modified | Rule 12 — screenshots to `ss/`, delete at session end |
| `docs/context/summaries/phase-1-tasklist.md` | Modified | Session tasks logged |

---

## Open Questions

- [ ] **Copy sign-off** — final approval of all copy changes (open across sessions)
- [ ] **Badge typo "stike"** — intentional or fix? (open across sessions)
- [ ] **Visual check** — CSS iPhone at 320px and 390px viewports; flip timing on mobile

---

## What the NEXT Session Should Do

1. Read this handoff + `docs/context/summaries/phase-1-tasklist.md`
2. Visual check: iPhone mockup at narrow viewport widths + flip effect on mobile
3. Next task: TBD — ask Mat

---

## Files to Load Next Session

- `docs/context/summaries/handoff-2026-03-24-iphone-flip.md` — this file
- `docs/context/summaries/phase-1-tasklist.md` — task status
- `full.html` — primary working file
- `css/iphone.css` — if continuing iPhone work
- `css/flip-text.css` — if continuing flip work
