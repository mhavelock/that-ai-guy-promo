# Handoff — 2026-04-08 — Housekeeping session

## Session type
Housekeeping / minor asset work

## Status
Clean. Working tree empty. All changes committed.

---

## What happened this session

### 1. Archived stale handoff files
- Moved all 19 files from `docs/context/summaries/` into `docs/context/summaries/archive/`
- Summaries root is now clear for new handoffs

### 2. scissors.css — halved all em values
- File: `css/scissors.css`
- All `em` values divided by 50% (halved)
- `deg`, `%`, and colour values left untouched
- Status: committed in `9f55cd9`

### 3. QR code asset added (by Mat)
- `assets/components/qr-code.svg` — links to https://that-ai-guy.app/
- Committed in `9f55cd9 marketing - (me): Adding QR code`
- Also committed in that commit: `css/theme.css`, `full.html`, `privacy.html`
- Noted in memory: `project_qr_code.md`

---

## Open questions
- OPEN: Where is the QR code used in the HTML (if anywhere yet)?
- ASSUMED: scissors.css is used somewhere in the page — halving was a sizing adjustment request

---

## Files to load next session
- `full.html` — main promo page
- `css/theme.css` — layout + tokens
- `css/scissors.css` — if continuing scissors work
