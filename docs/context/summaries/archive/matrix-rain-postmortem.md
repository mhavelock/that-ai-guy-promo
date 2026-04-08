# Matrix Rain — Post-Mortem

**Session:** 2026-03-22
**Status:** Reverted — did not render correctly
**CSS file kept:** `css/matrix-rain.css` (preserved for next attempt)

---

## What was built

Horizontal CSS-only matrix rain (`promo-matrix` section). 20 `.rain-stream` divs with:
- `background-clip: text` + gradient = coloured glyph fills
- `mask-image: linear-gradient` = comet tail fade
- `transform: translateX(-100vw → 200vw)` = movement
- `@property --brightness` + `filter: brightness()` = glow pulse
- `color-mix(in oklch)` for lead-edge colours
- `text-shadow` for terminal glow
- `@layer matrix` for cascade containment

---

## Actual render (screenshot: `/docs/context/tmp/Screenshot 2026-03-22 at 08.53.28.png`)

The dark matrix section IS rendering. The animation IS running — coloured horizontal lines stream left to right. But text characters are completely invisible. Only the `text-shadow` glow shows, as thin solid-coloured bars (blue, crimson, teal).

**Root cause confirmed**: `background-clip: text` is not clipping the gradient to the glyphs. `color: transparent` hides the glyph fill. `text-shadow` still renders (it's independent of fill colour) — hence thin glowing lines, no text.

The effect is 80% there structurally. The only missing piece is making text characters visible.

---

## Failure causes

### 1. `-webkit-background-clip: text` missing (confirmed root cause)
`background-clip: text` still requires the `-webkit-` prefix in Chrome and Safari in practice, despite spec support. Without it, the clip doesn't apply. The result: `color: transparent` with no clip = **completely invisible text**. Streams render as blank lines. The whole section looks empty.

CLAUDE.md says "no vendor prefixes for well-supported properties" — but `background-clip: text` is a documented exception that still needs the prefix in Chrome/Safari.

Fix: add `-webkit-background-clip: text` alongside `background-clip: text`.

### 2. `-webkit-mask-image` missing
`mask-image` also needs `-webkit-mask-image` in Safari. Without it on Safari, the comet tail mask doesn't apply, meaning streams show as a flat solid block rather than a fading comet shape.

Fix: add `-webkit-mask-image` alongside `mask-image`.

### 3. `filter: brightness()` breaks `background-clip: text`
Applying `filter` to an element that uses `background-clip: text` is known to break the clip in some browser/OS combinations. The browser must create a compositing layer for `filter`, and the `background-clip: text` rendering can fail on that layer — resulting in either an invisible element or the background showing without clip.

Fix: move `filter` to a wrapper element and keep `background-clip: text` on the inner element. Or replace `filter: brightness()` with `opacity` animation — less impressive but reliable.

### 4. `@layer` cascade suppression
Styles inside `@layer` have lower cascade priority than unlayered styles. If any un-layered styles (from `global.css`, `theme.css`) happen to target `.rain-stream` or `.promo-matrix` with generic selectors, they could override the layered rules. Less likely to cause complete failure, but could explain layout/colour anomalies.

Fix: check for cascade conflicts, or move critical rules outside the layer.

### 5. `color-mix(in oklch)` not supported
`color-mix(in oklch)` has good 2024 support but may fail in older Chrome/Safari. When it fails, the gradient stop is invalid — the browser skips it, potentially collapsing the gradient.

Fix: provide a plain hex fallback before each `color-mix()` stop.

---

## Handover assets

- Screenshot: `/docs/context/tmp/Screenshot 2026-03-22 at 08.53.28.png`
- `/docs/context/tmp/` — path for all session screenshot assets

---

## What to do next session

1. Use the visualiser tool to see the actual render before/during iteration
2. Add `-webkit-background-clip: text` and `-webkit-mask-image` prefixes
3. Separate `filter` from the `background-clip: text` element (wrapper div approach)
4. Add hex fallbacks before `color-mix()` stops
5. Test in DevTools with layers panel to confirm compositor promotion

---

## Reference

The CSS file `css/matrix-rain.css` has been preserved as the starting point.
The HTML section was reverted from `index.html`.
The `@import` was reverted from `theme.css`.
