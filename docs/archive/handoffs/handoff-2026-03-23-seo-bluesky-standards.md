# Session Handoff: SEO, Bluesky & Standards Pass
**Date:** 2026-03-23
**Session Focus:** Holding page polish — Bluesky link, HTML standards pass, full SEO strategy
**Context Usage at Handoff:** ~70%

---

## What Was Accomplished

1. **DNS apex timeout resolved** — `that-ai-guy.app` was timing out; root cause was propagation delay (config was already correct). Both domains now Active + SSL ✓
2. **Bluesky flutter link added** → `holding.html` (inline `<style>` + `<nav>` bottom-right fixed)
3. **Full HTML/CSS standards pass** → `holding.html` — 11 issues fixed (see Files below)
4. **SEO strategy implemented** → `holding.html`, `full.html`, `robots.txt` (created), `sitemap.xml` (created)
5. **Self-aware SEO copy written** → `holding.html` — new `<section class="holding-seo">` with pedantic-voice keyword section
6. **Wrangler config fixed** → `wrangler.jsonc` — `pages_build_output_dir` added, suppresses deploy warning
7. **Templates installed** → `templates/claude-templates.md` copied from next-project

---

## Exact State of Work in Progress

- **Download button**: spec recovered from git `18c3a0e`, no styles coded yet. Mat will provide 9 neumorphic `box-shadow` styles next session. Build has not started.

---

## Decisions Made This Session

- DECISION: `<aside>` → `<nav aria-label="Social links">` for Bluesky link — BECAUSE `<nav>` is semantically correct for navigation links, not `<aside>`
- DECISION: Use `filter: invert(1)` on App Store SVG for dark mode — BECAUSE badge is black-on-white; invert gives official white-on-black dark variant with no second file needed
- DECISION: `robots.txt` allows `/holding.html` — BECAUSE bots follow the `_redirects` 302 and land there; disallowing it would kill SEO traction
- DECISION: `sitemap.xml` contains root URL only — BECAUSE including `full.html` while it's `noindex` sends conflicting signals

---

## Key Numbers Generated or Discovered This Session

- Title tag: 39 chars (`That AI Guy — AI Comedy App for iPhone`)
- Meta description: 142 chars
- Download button animation cycle: 9 styles × 5s (1s transition + 4s hold) = 45s total loop
- Git commit with original button spec: `18c3a0e`

---

## Conditional Logic Established

- IF dark mode THEN `filter: invert(1)` on App Store SVG AND separate neumorphic shadow keyframes for dark bg
- IF `holding.html` is disallowed in `robots.txt` THEN SEO traction is killed (bots follow the 302 redirect to it)
- IF button styles "may not work" (Mat's own git note) THEN stop and review before committing

---

## Files Created or Modified

| File Path | Action | Description |
|-----------|--------|-------------|
| `holding.html` | Modified | Bluesky nav, standards pass (11 fixes), SEO meta + copy |
| `full.html` | Modified | `noindex, nofollow` added (was missing) |
| `robots.txt` | Created | Allows root, disallows `/full.html` |
| `sitemap.xml` | Created | Root URL only, priority 1.0 |
| `wrangler.jsonc` | Modified | `pages_build_output_dir: "."` added |
| `templates/claude-templates.md` | Created | Copied from next-project |
| `docs/context/summaries/handoff-2026-03-23-seo-bluesky-standards.md` | Created | This file |

---

## What the NEXT Session Should Do

1. **First**: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. **Read**: this handoff only
3. **Receive**: Mat's 9 neumorphic `box-shadow` styles
4. **Copy SVG asset**: `/Users/mat/Downloads/_Assets/that-aiguy-promo/components/app-store-button/available-on-the-app-store-logo-svg-vector.svg` → `assets/components/app-store-button.svg`
5. **Build**: neumorphic cycling download button in `full.html` — spec below

### Download button full spec
- **Element**: new `<a class="btn-appstore">` in `.promo-download` section of `full.html`
- **Shape**: oblong / pill (`border-radius: 50px`)
- **Base**: white background, black text — matches App Store badge aesthetic
- **Animation**: `@keyframes` cycling 9 states — 1s ease transition + 4s hold = 45s loop
- **Only morphing**: `box-shadow` (optionally `background` / `border-radius`) — shape stays fixed
- **SVG overlay**: `assets/components/app-store-button.svg` — `position: absolute`, `pointer-events: none`
- **Dark mode shadows**: separate `@keyframes` inside `@media (prefers-color-scheme: dark)`
- **Dark mode SVG**: `filter: invert(1)` — flips black-on-white to white-on-black
- **Mat's own note (from git `18c3a0e`)**: "requested styling may not work — try and stop to review"

---

## Open Questions Requiring User Input

- [ ] App Store URL — update `href="#"` on `.btn-appstore` once live

---

## Assumptions That Need Validation

- ASSUMED: Sheldon star rating `value="1"` — **CONFIRMED this session (comedy)** ✓
- ASSUMED: Jeff star rating `value="1"` — **CONFIRMED this session (comedy)** ✓

---

## What NOT to Re-Read

- `docs/context/summaries/handoff-2026-03-22-holding-page-cloudflare.md` — previous session, already actioned
- `docs/context/summaries/phase-1-tasklist.md` — read only if planning next phase; not needed for button build

## Files to Load Next Session

- This handoff only — enough context to start the button build
