# Session Handoff — 2026-03-22 — Codewall Animations & Phones Layout

**Phase:** 1 — Foundation (carry-forward)
**Status:** Codewall section complete for mobile. Desktop layout overlap issue logged for Phase 2.

---

## What was done this session

### 1. Codewall syntax animations (`css/codewall.css`)

Six syntax colour classes painted via `background-clip: text` + `color: transparent`:

| Class | Colour | Sweep duration | Breathe duration |
|---|---|---|---|
| `.cw-c` | Rich purple `#6a1aaa` / `#cc88ff` | 7s | 9s |
| `.cw-k` | Vivid navy `#1a4aaa` / `#6699ff` | 6s, -2s delay | 11s |
| `.cw-s` | Crimson `#aa1a30` / `#ff6680` | 8s, -4s delay | 7s |
| `.cw-n` | Deep magenta `#8a1a70` / `#ee55cc` | 5s, -1s delay | 13s |
| `.cw-p` | Teal `#1a7a7a` / `#44dddd` | 9s, -3s delay | 10s |
| `.cw-e` | Forest green `#3a7a1a` / `#88ee44` | 6.5s, -5s delay | 8s |

Each uses a comet gradient: `transparent → base → bright → bright → base → transparent` at `background-size: 300% 100%` with `background-position` sweep from 200% → -200%.

`prefers-reduced-motion`: all animations removed; flat single-colour gradients preserved so text remains coloured.

### 2. Wave animation (`css/codewall.css` + `index.html`)

- `@keyframes cw-wave`: font-size `0.9375rem → 0.975rem`, letter-spacing `0.01em → 0.013em` — inline-safe only
- Class `.cw-wave` with `animation-delay: calc(var(--wave-n) * 2s)` — staggered per group
- 6 wave groups in HTML: `--wave-n: 0` through `5`, top→bottom
- `prefers-reduced-motion`: wave animation removed

### 3. Phones layout fixes (`css/codewall.css`)

**Height matching (victimsettings 600×752 vs others 600×1262):**
- Formula: `1262/752 = 1.678` → `flex: 1.685` on `picture:last-child`
- `align-self: initial` on `.codewall-phones-r__angled`
- All imgs `width: 100%; height: auto` — no special overrides needed

**1.5× size increase:**
- Mobile: `width: 75%` (was 50%)
- Desktop: `width: 63%` (was 42%)

**Max-height cap at ~225px:**
- `max-width: 40.5rem` on `.codewall-phones-r`
- Derivation: `225px × (600/1262) × 3.685 flex-units + 10px gaps = 403.9px ≈ 40.5rem`
- Kicks in above ~560px viewport width

### 4. Inline flow fix (`index.html`)

- `<div class="codewall-phones-r">` → `<span class="codewall-phones-r">`
- A `<div>` mid-inline content causes browser to split text into two anonymous blocks; the float only affected the second block (text after phones). A `<span>` keeps everything in one inline flow.
- Phones remain mid-text between wave 2 and wave 3 — text above sits naturally above, text below wraps around the float

### 5. Overflow wrap (`css/codewall.css`)

- `overflow-wrap: anywhere` on `.promo-codewall`
- Without it, long unbreakable tokens like `SpeechRecognitionCoordinator.swift` (34 chars) would gap below the float instead of wrapping in the narrow column

### 6. Full-width codewall text

- `padding: 0` on `.promo-codewall` — text runs edge-to-edge, no side gutters

---

## Known issue — Desktop codewall overlap (logged in tasklist)

At `width >= 76.8rem`: `.codewall-phone-l` floats left at `42%` and `.codewall-phones-r` floats right at `63%` — total 105%, they overlap. Fix deferred to Phase 2 desktop layout pass.

---

## Next session — START HERE

1. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. Read this file
3. Check `docs/context/summaries/phase-1-tasklist.md` for Priority 3 tasks

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
|---|---|
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Codewall CSS | `css/codewall.css` |
| Main HTML | `index.html` — codewall section lines ~104–225 |
| Test programme | `docs/test-program.md` |
| Previous handoff (visualisation tools) | `docs/archive/handoffs/handoff-2026-03-22-visualisation-setup.md` |
