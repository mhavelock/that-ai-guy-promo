# Session Handoff — 2026-03-22 — Dark Mode Audit

**Phase:** 1 — Foundation (carry-forward)
**Status:** Dark mode audit complete and committed. Pre-launch checklist created.

---

## What was done this session

### 1. Evaluated CSS-only theme switcher (no code changes)
- Reviewed Alexander Sandberg's checkbox/sibling-combinator approach
- Decided against: still requires JS for localStorage + FOUC prevention, structural HTML change needed, `<picture>` logo swap breaks
- Decision: keep current `[data-theme]` + `theme.js` approach; remove toggle entirely before launch

### 2. Dark mode audit — three bugs fixed in `css/theme.css`

**Fix 1 — `--color-tg` missing from dark theme**
- Token only existed in `:root[data-theme="light"]`
- Used by `css/badges.css` L80: `background-color: var(--color-tg)` on `.badges dd`
- Added `--color-tg: #3a7abf` to dark tokens block

**Fix 2 — Wavegrid background images**
- `body::before` / `body::after` in `css/theme.css` L278–291 use light-coloured WebPs
- Added after `body::after` rule:
  ```css
  [data-theme="dark"] body::before,
  [data-theme="dark"] body::after {
    filter: invert(1);
  }
  ```

**Fix 3 — Codewall base text colour**
- `css/codewall.css` L28: `color: #1e2460` (dark navy) — invisible on `#111318` dark bg
- Not touching codewall.css (intentional light-mode palette)
- Added dark override in `css/theme.css` before section 4:
  ```css
  [data-theme="dark"] .promo-codewall { color: #8090b8; }
  ```

### 3. `--text-gradient` dark mode — two bugs fixed

**Bug A — Trailing comma** (L139): last gradient layer ended with `,` before `}` — invalid CSS, caused `background: var(--text-gradient)` to fail silently → text invisible / rendered black via `mix-blend-mode: plus-lighter`

**Bug B — Dark layer values**: `rgba(22, 5, 119, 0.87)` near-black purple, `rgba(25, 36, 111, 0.5)` dark navy — unusable on dark background

**Fix**: Replaced entire dark `--text-gradient` with bright luminous values (same layer geometry as light mode):
```css
--text-gradient: radial-gradient(circle at 100% 30%, rgba(100, 150, 255, 0.95), rgba(150, 190, 255, 0.40) 80%),
                 radial-gradient(circle at 100% 40%, rgba(80, 180, 255, 0.90), rgba(140, 220, 255, 0.30) 50%),
                 radial-gradient(circle at 55% 300%, rgba(90, 120, 255, 0.90), rgba(120, 180, 255, 0.50) 80%),
                 radial-gradient(circle at 50% 50%, rgba(140, 80, 255, 0.85), rgba(170, 140, 255, 0.50) 80%),
                 radial-gradient(circle at 20% 100%, rgba(100, 210, 255, 0.95), rgba(200, 235, 255, 0.80) 90%);
```

### 4. Dark background colour updated
- `--color-bg` in dark theme changed from `#111318` → `#0b0d10` (matched to wavegrid image edge)

### 5. Pre-launch checklist created
- `docs/pre-launch-checklist.md` — covers: device check, code quality, PageSpeed, JS toggle removal, agentic workers check
- Includes exact steps for toggle removal (what to delete vs what to keep)

---

## Current codebase state

Everything uncommitted. Clean working tree on `main` — commit this session's work before next session.

Last committed: `4523745` — `feat(intro): fluid logo + shape-outside scaling, right column spacing fix`

---

## Start next session

1. Commit this session's changes
2. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
3. Read this file

---

## Outstanding (dark mode)

- [ ] **OPEN — Dark mode mini-logo** — Mat to supply alternative `that-aiguy-logo.svg` with hands for dark mode. Wire via `[data-theme="dark"]` override on `--thataiguySVG` in `css/svg-variables.css`

## Priority 3 remaining

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
