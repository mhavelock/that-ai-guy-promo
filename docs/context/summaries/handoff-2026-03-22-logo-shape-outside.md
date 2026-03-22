# Session Handoff — 2026-03-22 — Logo fluid scaling + shape-outside

**Phase:** 1 — Foundation (carry-forward)
**Status:** Intro logo and shape-outside fully fluid. Screenshot workflow documented.

---

## What was done this session

### 1. Logo fluid scaling (`css/theme.css`)

Single continuous `clamp()` formula — no stepped breakpoints:

```css
.promo-logo {
  height: auto;
  width: clamp(12rem, calc(12rem + 10rem * (100vw - 32rem) / 44.8rem), 22rem);
}
```

- 12rem (120px) at 320px viewport → 22rem (220px) at 768px → locked above
- `height: auto` was critical — without it the HTML `height="220"` attr capped the image at 220px even when CSS scaled the width up
- HTML attrs updated to `width="220" height="220"` (intrinsic size hint for CLS)

### 2. Shape-outside fluid scaling (`css/theme.css`)

Both `::before` pseudo-elements use the same clamp formula for height, width, and circle radius:

**Left column** (float right, pushes text left of logo):
```css
.promo-col-l::before {
  height: clamp(12rem, calc(12rem + 10rem * (100vw - 32rem) / 44.8rem), 22rem);
  shape-outside: circle(clamp(6rem, calc(6rem + 5rem * (100vw - 32rem) / 44.8rem), 11rem) at 100% 50%);
  width: clamp(6rem, calc(6rem + 5rem * (100vw - 32rem) / 44.8rem), 11rem);
}
```

**Right column** (float left, 2rem wider to push text further right):
```css
.promo-col-r::before {
  height: clamp(12rem, calc(12rem + 10rem * (100vw - 32rem) / 44.8rem), 22rem);
  shape-outside: circle(clamp(8rem, calc(8rem + 5rem * (100vw - 32rem) / 44.8rem), 13rem) at 0% 50%);
  width: clamp(8rem, calc(8rem + 5rem * (100vw - 32rem) / 44.8rem), 13rem);
}
```

**Key lesson:** Float `width` must equal the circle radius. If radius > float width, the browser clips the shape to the float's margin box at the widest points, producing straight vertical text edges instead of a curve. Always keep `width === radius`.

### 3. Screenshot workflow investigation

Root cause: VS Code and Claude Code CLI both configured with Playwright MCP, sharing the same Chrome user-data-dir (`~/Library/Caches/ms-playwright/mcp-chrome-ecc4bf3/`). VS Code holds the lock; Claude Code CLI's Playwright fails to launch.

**Fix:** Remove Playwright MCP from VS Code. Claude Code CLI then has exclusive access.

Full doc: `docs/context/summaries/screenshot-workflow-investigation.md`

**Working screenshot workflow (in the meantime):**
```bash
osascript -e 'tell application "Google Chrome" to activate' && sleep 0.5 && python3 ~/.claude/scripts/snap.py
```

---

## Next session — START HERE

1. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. Read this file
3. Check `docs/context/summaries/phase-1-tasklist.md` for Priority 3 tasks

### Action items (Mat)

- [ ] Remove Playwright MCP from VS Code
- [ ] Verify Playwright works in Claude Code CLI after removal
- [ ] Test viewport-resize → screenshot workflow at 375px, 450px, 768px

### Priority 3 remaining

- [ ] **Download button** — 9-style neumorphic keyframe cycle (1s transition, 4s hold) + App Store SVG overlay
- [ ] **Badge click** → `clip-path` morph to speech bubble shape
- [ ] **Claude icon** — fixed bottom-left, scroll-driven rotation (clockwise down, anticlockwise up)
- [ ] **Glassify** — `.glass` on badges + slider/review cards (not stars)

---

## Open questions

- [ ] **OPEN** — Accessibility + schema pass (low priority)
- [ ] **OPEN** — Star ratings: Sheldon + Jeff at `value="1"` — confirm with Mat

## Content outstanding

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Privacy policy sign-off + contact email (`hello@thataiguy.app` — placeholder)

---

## Key file paths

| What | Where |
|------|-------|
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Intro CSS | `css/theme.css` — `.promo-logo`, `.promo-col-l::before`, `.promo-col-r::before` (~lines 336–378) |
| Main HTML | `index.html` — intro section lines ~57–79 |
| Screenshot workflow | `docs/context/summaries/screenshot-workflow-investigation.md` |
| Previous handoff (codewall) | `docs/context/summaries/handoff-2026-03-22-codewall-animations-phones.md` |
