# Session Handoff — 2026-03-22 — Visualisation Tools & Path Guards

**Phase:** 1 — Foundation (carry-forward)
**Last commit:** `bd17370` — no new project code this session
**Status:** Global Claude tooling set up. Visualisation tools (Playwright + Python snap) and file path protection hooks installed. Ready to retry matrix rain next session using the new tools.

---

## What was done this session

### 1. Global FE Visualisation tools installed

Three skills created in `~/.claude/skills/`:

| Skill | File | Trigger |
|---|---|---|
| Auto-pick (Playwright or Python) | `~/.claude/skills/fe-visualisation.md` | `/fe-visualisation` |
| Force Playwright browser screenshot | `~/.claude/skills/run-playwright.md` | `/run-playwright` |
| Force Python full-screen screenshot | `~/.claude/skills/run-python-screenshot.md` | `/run-python-screenshot` |

Python snap script: `~/.claude/scripts/snap.py` — saves to `~/.claude/screenshots/`
Dependencies: `pyautogui` + `pillow` — installed this session via `pip3 install`.

Playwright MCP added by Mat in a separate terminal:
```
claude mcp add playwright npx @playwright/mcp@latest
```
**NOTE:** Was added scoped to `/Users/mat/AI/mcp-servers` (local config). To make it global, run in a separate terminal at session start:
```bash
claude mcp remove playwright
claude mcp add --scope user playwright npx @playwright/mcp@latest
```

`~/Claudette/Cowork/CLAUDE.md` updated with visualisation section — ambient awareness so Claude reaches for it automatically when debugging visual issues.

### 2. File path protection hook installed globally

`~/.claude/hooks/guard-paths.sh` — PreToolUse hook covering `Write`, `Edit`, `Bash` tools:

| Path | Behaviour |
|---|---|
| Within `/Users/mat/Claudette/Cowork` or `/Users/mat/AI` | Allow |
| `.claude` dirs, `CLAUDE.md`, `settings.json`, `settings.local.json` (anywhere) | Ask — confirmation dialog |
| Anywhere else | Deny — hard block with explanation |

Wired in `~/.claude/settings.json` → `hooks.PreToolUse`.

**Known limitation:** Bash path extraction is a heuristic (grabs first `/Users/...` path). Won't catch `>` redirections with relative paths.

---

## No project code changed this session

All work was global tooling setup. Project state is identical to the previous session handoff (2026-03-22-codewall-matrix, now in `docs/archive/handoffs/`). Refer to that file for full codewall layout detail and matrix rain context.

---

## Next session — START HERE

### Step 1: Fix Playwright MCP scope (if not already done)
```bash
claude mcp remove playwright
claude mcp add --scope user playwright npx @playwright/mcp@latest
```
Confirm with `claude mcp list` — should show `playwright` with scope `user`.

### Step 2: Serve the promo site locally
```bash
cd ~/Claudette/Cowork/projects/that-guy-promo
python3 -m http.server 8080
```
Then use `/run-playwright` with `http://localhost:8080` to screenshot the current state.

### Step 3: Retry matrix rain
Open `css/matrix-rain.css` and apply these fixes:
1. Add `-webkit-background-clip: text` alongside `background-clip: text` in `.rain-stream`
2. Add `-webkit-mask-image: [same gradient]` alongside `mask-image` in `.rain-stream`
3. Add plain hex fallbacks before each `color-mix(in oklch, ...)` stop in `.rs-a/.rs-b/.rs-c/.rs-d`
4. Consider wrapping each stream in `<div class="rain-stream-outer">` with `filter: brightness()` on the outer, `background-clip: text` on the inner (avoids filter + background-clip compositing conflict)
5. Re-import in `css/theme.css` and add HTML section back to `index.html`
6. Use `/run-playwright` to verify before committing

---

## Open tasks (Priority 3)

- [ ] **Matrix rain** — retry with webkit prefix fixes (see postmortem: `docs/context/summaries/matrix-rain-postmortem.md`)
- [ ] Download button — 9-style neumorphic keyframe cycle + App Store SVG overlay
- [ ] Badge click → speech bubble `clip-path` morph
- [ ] Claude icon fixed bottom-left + scroll-driven rotation
- [ ] Glassify badges + slider/review cards (`.glass` modifier — do not touch stars)

## Priority 2 — Asset tidy

- [ ] Move + rename image assets (remove spaces, reorganise folders)
- [ ] Update `src` references after moves
- [ ] Convert phone screenshots to WebP (1x + 2x)

## Open questions

- [ ] **OPEN** — should `main.js` load before `theme.js`? (currently: main → theme → logger)
- [ ] **OPEN** — Playwright MCP scope fix confirmed? (see Step 1 above)
- [ ] **OPEN** — Accessibility + schema pass (low priority)

## Content outstanding

- [ ] App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] Privacy policy sign-off + contact email (`hello@thataiguy.app` — placeholder)
- [ ] Star rating values confirmation (Sheldon + Jeff at `value="1"` — is this correct?)

---

## Key file paths

| What | Where |
|---|---|
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Matrix rain CSS (preserved, not imported) | `css/matrix-rain.css` |
| Matrix rain post-mortem | `docs/context/summaries/matrix-rain-postmortem.md` |
| Previous session handoff (codewall detail) | `docs/archive/handoffs/handoff-2026-03-22-codewall-matrix.md` |
| Test programme | `docs/test-program.md` |
| Visualisation skill | `~/.claude/skills/fe-visualisation.md` |
| Python snap script | `~/.claude/scripts/snap.py` |
| Path guard hook | `~/.claude/hooks/guard-paths.sh` |
| Global settings (hook wired here) | `~/.claude/settings.json` |
| Cowork CLAUDE.md (visualisation docs) | `~/Claudette/Cowork/CLAUDE.md` |
