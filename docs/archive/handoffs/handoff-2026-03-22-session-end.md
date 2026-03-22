# Session Handoff — 2026-03-22 — Session End

**Phase:** 1 — Foundation (carry-forward)
**Status:** Logo fluid scaling complete and committed. New task queued.

---

## Next session task

**CSS-only theme switcher** — replace or augment the current JS-based light/dark toggle (`js/theme.js`) with a CSS-only solution. Details TBD at session start.

Current toggle: `theme-toggle-btn` button in HTML, `js/theme.js` reads/writes `localStorage` and sets `[data-theme]` on `<html>`. Bottom-right, `position: fixed`.

---

## Current codebase state

Everything committed. Clean working tree on `main`.

Last commit: `4523745` — `feat(intro): fluid logo + shape-outside scaling, right column spacing fix`

---

## Start next session

1. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. Read this file
3. Discuss CSS-only theme switcher approach before touching code

## Screenshot workflow (pending fix)

Remove Playwright MCP from VS Code so Claude Code CLI Playwright works.
Until then: `osascript -e 'tell application "Google Chrome" to activate' && sleep 0.5 && python3 ~/.claude/scripts/snap.py`

Full details: `docs/context/summaries/screenshot-workflow-investigation.md`

---

## Priority 3 remaining (after theme switcher)

- [ ] **Download button** — 9-style neumorphic keyframe cycle (1s transition, 4s hold) + App Store SVG overlay
- [ ] **Badge click** → `clip-path` morph to speech bubble shape
- [ ] **Claude icon** — fixed bottom-left, scroll-driven rotation (clockwise down, anticlockwise up)
- [ ] **Glassify** — `.glass` on badges + slider/review cards (not stars)

## Open questions

- [ ] **OPEN** — Star ratings: Sheldon + Jeff at `value="1"` — confirm with Mat
- [ ] **OPEN** — Accessibility + schema pass (low priority)

## Content outstanding

- [ ] App Store URL
- [ ] Privacy policy sign-off + contact email
