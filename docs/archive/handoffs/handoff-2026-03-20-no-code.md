# Session Handoff — 2026-03-20 — No code session

**Phase:** 1 — Foundation (carry-forward)
**Status:** No code written this session. Informational Q&A only.

---

## What was done this session

Single question answered: Mat asked what the VSCode **"Claude Process Wrapper"** (`claudeProcessWrapper`) extension setting does.

**Answer given:** It specifies an intermediary executable path used to launch the Claude process instead of running `claude` directly. Use cases: wrapper scripts that set up env vars, running Claude inside a container/sandbox, tools like `direnv`, or any program that needs setup before handing off to the real Claude process. Leave blank for normal usage.

No files modified, no commits made.

---

## Carry-forward from previous session (2026-03-16)

### Priority 2 — Asset tidy
- Move `assets/iphones/` → `assets/graphics/iphones/` (update src refs)
- Move `assets/speech-bubbles/` → `assets/graphics/speech-bubbles/` (update src refs)
- Move `assets/privacy-policy.svg` → `assets/icons/`
- Rename `assets/available-on-the-app store.png` (remove space)
- Convert PNG screenshots to WebP

### Priority 3 — Styling features (mobile only)
- Glassify badges + slider cards (`.glass` modifier)
- Bottom nav reposition + resize (mobile)
- Theme toggle reposition (`right: 2.2rem; top: 1.6rem`)
- Download button: 9-style neumorphic keyframe cycle + App Store SVG overlay
- Badge click → speech bubble clip-path morph
- Claude icon at bottom-left with scroll-driven rotation

### Backlog
- Text wrap around logo — remove broken `shape-outside`, rewrite once layout settles

---

## Known issues (carry-forward)

| Issue | File | Notes |
|-------|------|-------|
| `.badges dd` hardcoded dark gradient | `css/badges.css:47` | Won't adapt to dark mode |
| Badge hover-only interaction | `css/badges.css` | No click/active state for mobile touch |
| `iphone-ss-01.png` has no `loading="lazy"` | `index.html` | Intentional — LCP candidate |

---

## Key files (no changes this session)

See `handoff-2026-03-16-foundation.md` in `docs/archive/handoffs/` for full file inventory from the last working session.
