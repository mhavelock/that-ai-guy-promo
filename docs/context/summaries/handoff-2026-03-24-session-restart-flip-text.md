# Session Handoff — 2026-03-24 (session restart after crash)
**Topic:** Orientation, housekeeping, flip-text fix, privacy email, tasklist cleanup

---

## Context

Previous session crashed (matrix rain / terminal). This session was a clean restart:
orientate from handoffs, tidy up stale state, then fix the outstanding flip-text bug.

---

## Work done this session

### Orientation + housekeeping
- Read all handoffs from previous sessions — confirmed desktop steps 1–9 all committed before crash
- Deleted 49 stale screenshots from `~/.claude/screenshots/` + 1 from `docs/context/tmp/`
- Marked desktop steps 1–9 complete in `desktop-redesign-plan.md` and `phase-1-tasklist.md`

### Flip-text fix (`css/flip-text.css`)
Two bugs fixed:

**Bug 1 — gradient rectangle visible during 3D rotation:**
`.taig-back` used `background-clip: text + color: transparent + mix-blend-mode: plus-lighter`.
Without `-webkit-background-clip`, gradient rendered as a full rectangle during the 3D rotate.
`mix-blend-mode` also conflicts with `backface-visibility` on compositor layers.
Fix: `color: var(--color-tg)` solid brand blue — guaranteed in 3D.

**Bug 2 — no visible animation (cover range bug):**
`animation-timeline: view()` on the child elements starts `cover 0%` at negative scroll
(element already in viewport at page load). At scroll=0, animation was already 40–50%
through — logo partially rotated away before user scrolled.
Fix: `view-timeline-name: --promo-intro` on `.promo-intro` section; children reference
`--promo-intro`. Ranges `cover 45%→65%` / `60%→80%` fire as section scrolls out — clean parallax.

**Also:**
- Switched `rotateX` → `rotateY` (coin-flip/spin feel)
- `perspective: 600px` → `1200px` (gentler 3D depth)
- Added `transform-style: preserve-3d` on `.flip-card`
- Hover fallback updated to `rotateY`

### Privacy email
- `privacy.html` line 97: `hello@thataiguy.app` → `mat@that-ai-guy.app`

### Tasklist cleanup
- Claude icon task: marked parked / not doing
- Star ratings (Sheldon + Jeff): confirmed correct, marked done
- Privacy email: marked done

---

## Commits this session

| Hash | Description |
|---|---|
| `85e5150` | fix(flip-text): replace gradient text with solid color on back face |
| `9d0ba18` | fix(privacy): update contact email to mat@that-ai-guy.app |
| `265f217` | feat(flip-text): scroll-driven Y-axis spin with parallax pacing |
| `4760277` | fix(flip-text): use named timeline on promo-intro to fix scroll trigger |
| This session's doc commit | docs: session handoff + tasklist/plan updates |

---

## Outstanding tasks

### Desktop layout pass (deferred)
- [ ] Codewall `padding-top` — speech bubble overlaps section above at 1228px
- [ ] Codewall `min-height` — mobile clamp needs desktop override
- [ ] Codewall phone overlap — at 76.8rem+ left phone + phones-r = 105%
- [ ] Desktop layout pass (bottom nav, typography, spacing)
- [ ] Hero panel (intro + badges in glass frame)
- [ ] Footer panel (contact + radar)

### Content (whenever)
- [ ] App Store URL on `.btn-appstore`
- [ ] Privacy policy sign-off

### SEO / schema (deferred)
- [ ] OG image, sitemap, canonical URL, schema.org

---

## Key files

| File | Role |
|---|---|
| `css/flip-text.css` | Scroll-driven Y-axis spin — `--promo-intro` named timeline |
| `css/desktop.css` | Master desktop file — imports all desktop sub-files |
| `privacy.html` | Contact email: `mat@that-ai-guy.app` (line 97) |
| `docs/context/summaries/desktop-redesign-plan.md` | Desktop plan — all 9 steps marked complete |
| `docs/context/summaries/phase-1-tasklist.md` | Master tasklist |
