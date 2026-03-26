# Session Handoff: Horizontal Scroll Fix + Deploy Workflow
**Date:** 2026-03-26
**Session Duration:** Medium
**Session Focus:** Diagnosing and fixing horizontal scroll on mobile; establishing Cloudflare deploy workflow.
**Context Usage at Handoff:** Low

---

## What Was Accomplished

1. **Horizontal scroll diagnosed and fixed** — root cause was `.promo-ksps` (word carousel section) with no overflow containment. `white-space: nowrap` on `position: absolute` carousel items bled past the viewport. Fix: `overflow-x: clip` on `.promo-ksps` in `theme.css` + load-bearing clips on `body` and `main` in `global.css`.

2. **Horizontal scroll debug method added to test plan** — browser console one-liner added to `docs/test-program.md` under the "No horizontal scroll" check.

3. **`overflow-x: clip` audit across codebase** — redundant clips removed from `.promo-reviews` and `.promo-codewall`. `.promo-stats` clip restored (gauge shadows need it independently).

4. **Cache-busting query string added** — `?v=20260326` on `global.css` link in `full.html`. Comment added: increment on each deploy to bust phone browser cache.

5. **Cloudflare deploy workflow established** — `purge-cache.sh` created at project root (gitignored). Full deploy sequence documented in `Claude.md`.

6. **`CF_API_TOKEN` / Wrangler conflict resolved** — renamed env var to `CF_PURGE_TOKEN` in `.zshrc` and `purge-cache.sh` to prevent Wrangler picking up the cache-purge token as its auth token.

7. **live-server reinstalled** — `npm install -g live-server` on Node v22.22.2.

---

## Exact State of Work in Progress

Nothing in progress. Site is live and working correctly.

---

## Decisions Made This Session

- **`overflow-x: clip` preferred over `overflow: hidden`** — doesn't create a BFC/scroll container, no z-index side-effects, iOS-safe. CONFIRMED.
- **`body` + `main` clips are load-bearing, not just catch-alls** — `overflow-x: clip` on a section alone does not reliably clip `position: absolute` descendants without a BFC. CONFIRMED by testing.
- **`CF_API_TOKEN` renamed to `CF_PURGE_TOKEN`** — avoids Wrangler picking it up as its auth token. CONFIRMED.
- **Cache busting via `?v=` query string** — simplest approach for zero-build-tool static site. CONFIRMED.

---

## Key Numbers Generated or Discovered This Session

- **Body width at 375px viewport before fix:** 575px (200px overflow) — discovered via Chrome DevTools device simulation
- **Word carousel translateX overflow:** `white-space: nowrap` + `overflow: visible` + `position: absolute` items = text bleeds past right edge
- **Node version:** v22.22.2 (live-server must be reinstalled per Node version via nvm)

---

## Conditional Logic Established

- IF deploying CSS changes, THEN bump `?v=` on the `global.css` link in `full.html` to bust visitor browser cache.
- IF running `npx wrangler pages deploy`, THEN first run `unset CF_API_TOKEN CLOUDFLARE_API_TOKEN` to prevent Wrangler picking up the purge token.
- IF horizontal scroll reappears, THEN run console sweep: `document.querySelectorAll('*').forEach(el => { if (el.scrollWidth > document.documentElement.clientWidth) console.log(el) })` to identify overflowing element.
- IF `overflow-x: clip` on a section is not containing overflow, THEN the clips on `body` and `main` in `global.css` are the actual fix — section-level clip alone doesn't contain `position: absolute` descendants without a BFC. OPEN: worth testing `overflow: clip` (both axes) on the section to see if that's sufficient.

---

## Files Created or Modified

| File Path | Action | Description |
|-----------|--------|-------------|
| `css/global.css` | Modified | `overflow-x: clip` on `body` (catch-all) and `main` (load-bearing); comment clarified |
| `css/theme.css` | Modified | `overflow-x: clip` added to `.promo-ksps` (root cause fix); removed from `.promo-reviews` |
| `css/codewall.css` | Modified | `overflow-x: clip` removed (covered by `main`) |
| `css/stats.css` | Modified | `overflow-x: clip` + `overflow-clip-margin` restored (gauge shadows need it independently) |
| `full.html` | Modified | `?v=20260326` added to `global.css` link with cache-bust comment |
| `docs/test-program.md` | Modified | Horizontal scroll debug console snippet added |
| `Claude.md` | Modified | Full deploy sequence added to rules |
| `purge-cache.sh` | Created | Cloudflare cache purge script (gitignored); uses `CF_PURGE_TOKEN` env var |
| `.gitignore` | Modified | `purge-cache.sh` added |

---

## What the NEXT Session Should Do

1. **Read this handoff** — nothing urgent, site is stable and live
2. **Pick up any new feature or polish work** Mat brings to the session
3. **Optional investigation** — test whether `overflow: clip` (both axes) on `.promo-ksps` alone is sufficient without the `body`/`main` catches. Currently OPEN.

---

## Open Questions Requiring User Input

- [ ] App Store ID for `<meta name="apple-itunes-app">` Smart App Banner — impacts SEO/Smart App Banner feature

---

## Assumptions That Need Validation

- ASSUMED: `overflow-x: clip` on a single axis without BFC doesn't reliably clip `position: absolute` descendants — observed in practice, not verified against spec. The `body` + `main` clips are the working fix.
- ASSUMED: Cloudflare Pages edge cache auto-invalidates on wrangler deploy — local Safari cache still requires manual clear or `./purge-cache.sh` for edge.

---

## What NOT to Re-Read

- All handoffs before 2026-03-26 — fully superseded by this one for current state

---

## Files to Load Next Session

- This handoff only — site is stable, no active work items
