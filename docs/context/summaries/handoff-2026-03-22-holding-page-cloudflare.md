# Session Handoff — 2026-03-22 — Holding Page + Cloudflare Pages Deploy

**Phase:** 1 — Foundation (carry-forward)
**Status:** Holding page live at that-ai-guy.app. Cloudflare Pages deployment configured.

---

## What was done this session

### 1. Holding page (`holding.html`)

Self-contained branded splash page — no external CSS dependencies.

- Light/dark mode via `prefers-color-scheme`
- Brand tokens (Fredoka font, blue gradient headline, wavegrid bg texture at 5%/10%)
- `<picture>` for light/dark logo variants (`that-aiguy-logo.svg` / `that-aiguy-logo-dark.svg`)
- Logo dimensions: `width="264" height="122"` (264×122px SVG)
- `noindex, nofollow` — stays off search while holding
- Comedic copy in the app's voice — nothing feature-revealing
- `_redirects` file: `/ /holding.html 302`

### 2. index.html → full.html rename

Cloudflare Pages serves static files before checking `_redirects`. `index.html` at root was intercepting `/` before the redirect could fire. Renamed to `full.html`.

- Full site accessible at: `that-ai-guy.app/full.html`
- Holding page at: `that-ai-guy.app` (via redirect)

### 3. Cloudflare Pages deployment

- Project name: `that-ai-guy-promo`
- Deploy command: `npx wrangler pages deploy . --project-name=that-ai-guy-promo --commit-dirty=true`
- Manual deploys only — no CI/CD connected
- Custom domains connected: `that-ai-guy.app` + `www.that-ai-guy.app`
- SSL: Full mode, provisioned and working

### 4. Permissions config updated

`~/.claude/settings.json` — wrangler deploy commands added to `ask` array:
- `Bash(npx wrangler pages deploy*)`
- `Bash(npx wrangler deploy*)`

### 5. FormZero (planned)

User intends to use Cloudflare's FormZero (email form service) for a no-JS contact form. Not yet implemented.

---

## Next session — START HERE

1. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. Read this file
3. Check `docs/context/summaries/phase-1-tasklist.md` for remaining Priority 3 tasks

### Priority 3 remaining

- [ ] **Download button** — 9-style neumorphic keyframe cycle (1s transition, 4s hold) + App Store SVG overlay
- [ ] **Badge click** → `clip-path` morph to speech bubble shape
- [ ] **Claude icon** — fixed bottom-left, scroll-driven rotation (clockwise down, anticlockwise up)
- [ ] **Glassify** — `.glass` on badges + slider/review cards (not stars)
- [ ] **Contact form** — FormZero (Cloudflare email service), no-JS

---

## Open questions

- [ ] **OPEN** — App Store URL (update `href="#"` on `.btn-appstore`)
- [ ] **OPEN** — Star ratings: Sheldon + Jeff at `value="1"` — confirm with Mat
- [ ] **OPEN** — Accessibility + schema pass (low priority)

---

## Key file paths

| What | Where |
|------|-------|
| Holding page | `holding.html` |
| Full promo site | `full.html` (was index.html) |
| Redirects | `_redirects` |
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Previous handoff (logo/shape-outside) | `docs/context/summaries/handoff-2026-03-22-logo-shape-outside.md` |

---

## Live URLs

| URL | What |
|-----|------|
| `https://that-ai-guy.app` | Holding page (live) |
| `https://www.that-ai-guy.app` | Same |
| `https://that-ai-guy.app/full.html` | Full promo site (dev access) |
| `https://that-ai-guy-promo.pages.dev` | Cloudflare Pages production |
