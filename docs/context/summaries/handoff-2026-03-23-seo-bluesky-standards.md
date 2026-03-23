# Session Handoff — 2026-03-23 — SEO, Bluesky, Standards Pass

**Phase:** 1 — Foundation (carry-forward)
**Status:** Holding page complete and live. SEO strategy implemented. Next: neumorphic download button.

---

## What was done this session

### 1. DNS fix — apex domain timeout
- `that-ai-guy.app` was timing out; `www.that-ai-guy.app` was working
- Root cause: DNS propagation delay (not a config error — everything was already correct)
- Both domains now Active + SSL enabled in Cloudflare Pages Custom Domains
- Confirmed working via `curl -I https://that-ai-guy.app` → `HTTP/2 302` ✓

### 2. Bluesky link added to holding page (`holding.html`)
- Animated flutter butterfly SVG (MIT — philhawksworth/bluesky-flutterby)
- Fixed bottom-right, `position: fixed; bottom: 1.25rem; right: 1.25rem`
- Wings animate on hover via `@keyframes bsky-flutter` with `--flip` CSS custom property
- Profile URL: `https://bsky.app/profile/that-ai-guy1.bsky.social`
- CSS added inline in `holding.html` `<style>` block

### 3. Holding page — full standards pass

All issues found and fixed:

| Fix | Detail |
|-----|--------|
| `<meta name="color-scheme" content="light dark">` | Added — browser renders native UI in correct mode before CSS loads |
| `fetchpriority="high"` on logo `<img>` | LCP element — signals browser to prioritise |
| `rel="shortcut icon"` → `rel="icon"` | Deprecated, non-standard |
| `<aside>` → `<nav aria-label="Social links">` | Correct semantic element for nav links |
| `aria-label` removed from `<ul>` | Redundant once `<nav>` carries the label |
| Link `aria-label` → "Follow That AI Guy on Bluesky" | More descriptive |
| `<br><br>` → two `<p>` elements in signoff | Correct paragraph separation |
| `<br>` removed from subhead | Layout via markup — let text reflow |
| `font-style: normal` removed from `strong` | `<strong>` is not italic — was a no-op |
| `li { display: block }` removed | Redundant on a flex child |
| Duplicate `animation: none` removed from reduced-motion | Covered by universal rule above it |
| `.holding-signoff + .holding-signoff { margin-top: 1.2em }` | Spacing between split paragraphs |

### 4. SEO strategy — holding page

Implemented per Gemini recommendations:

| File | Change |
|------|--------|
| `holding.html` | `noindex,nofollow` → `index,follow` + `<link rel="canonical" href="https://that-ai-guy.app/">` |
| `full.html` | `noindex,nofollow` added (was missing entirely) |
| `robots.txt` | Created — allows root, disallows `/full.html` |
| `sitemap.xml` | Created — root URL only, `priority 1.0` |
| `wrangler.jsonc` | `pages_build_output_dir: "."` added (suppresses Wrangler warning) |

### 5. SEO copy — holding page

- **Title** (39 chars): `That AI Guy — AI Comedy App for iPhone`
- **Meta description** (142 chars): `An AI comedy app for iPhone. It listens to your conversations and interrupts — with corrections — at exactly the wrong moment. Pedantic by design. Coming soon.`
- **New `<section class="holding-seo">`** added inside `.holding-inner`:
  - `<h2>` with keyword-rich heading
  - 3 paragraphs in the app's own pedantic voice
  - Self-aware keyword dump: *"The algorithm is now, presumably, satisfied."*
  - Low-friction CTA pointing to Bluesky
  - Left-aligned, muted styling — visually secondary to main content
- CSS added: `.holding-seo`, `.holding-seo-title`, `.holding-seo-body`, `.holding-seo-body em`

### 6. Jeff star rating confirmed
- `value="1"` on Jeff's review — confirmed intentional (comedy 1-star)
- Sheldon's rating still OPEN (not confirmed this session)

### 7. Download button — research
- Original spec recovered from git commit `18c3a0e`
- Spec: 9 neumorphic styles cycling (1s transition, 4s hold), App Store SVG overlay, oblong shape
- Asset confirmed at `assets/components/available-on-the-app-store.png` (PNG)
- Better SVG available at `/Users/mat/Downloads/_Assets/that-aiguy-promo/components/app-store-button/available-on-the-app-store-logo-svg-vector.svg`
- Dark mode: `filter: invert(1)` on the SVG
- Mat will provide the 9 neumorphic `box-shadow` styles next session

---

## Next session — START HERE

1. Serve locally: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx live-server --port=8080`
2. Read this file
3. Mat provides 9 neumorphic `box-shadow` styles
4. Build the download button

### Download button — full spec

- **Element**: new `<a class="btn-appstore">` replacing existing in `full.html` download section
- **Shape**: oblong / pill (`border-radius: 50px`)
- **Base**: white background, black text — matches App Store badge
- **Animation**: `@keyframes` cycling 9 states — each holds 4s, transitions 1s (total = 45s loop)
- **Only morphing**: `box-shadow` (+ optionally `background`, `border-radius`) — shape stays fixed
- **SVG overlay**: `available-on-the-app-store-logo-svg-vector.svg` from Downloads, copy to `assets/components/`; sits on top as `position: absolute` layer, `pointer-events: none`
- **Dark mode**: `filter: invert(1)` on SVG; separate shadow keyframes for dark bg
- **Mat's own note (from git)**: "requested styling may not work — try and stop to review"

---

## Commits this session

| Hash | Message |
|------|---------|
| `883ff6f` | feat(holding): add Bluesky link + standards pass |
| `802fa3b` | feat(seo): holding page SEO strategy + self-aware copy |
| `17ddc99` | fix(config): add pages_build_output_dir to wrangler.jsonc |

---

## Open questions

- [ ] **OPEN** — Sheldon star rating — confirm `value="1"` or different?
- [ ] **OPEN** — App Store URL (update `href="#"` once live)
- [ ] **OPEN** — FormZero contact form (Cloudflare email, no-JS) — planned but not started

---

## Key file paths

| What | Where |
|------|-------|
| Holding page | `holding.html` |
| Full promo site | `full.html` |
| Redirects | `_redirects` |
| Robots | `robots.txt` |
| Sitemap | `sitemap.xml` |
| App Store SVG (source) | `/Users/mat/Downloads/_Assets/that-aiguy-promo/components/app-store-button/available-on-the-app-store-logo-svg-vector.svg` |
| App Store PNG (in project) | `assets/components/available-on-the-app-store.png` |
| Task list | `docs/context/summaries/phase-1-tasklist.md` |
| Previous handoff (holding + Cloudflare) | `docs/context/summaries/handoff-2026-03-22-holding-page-cloudflare.md` |

---

## Live URLs

| URL | What |
|-----|------|
| `https://that-ai-guy.app` | Holding page (live) |
| `https://www.that-ai-guy.app` | Same |
| `https://that-ai-guy.app/full.html` | Full promo site (dev access) |
| `https://that-ai-guy-promo.pages.dev` | Cloudflare Pages production |
| `https://bsky.app/profile/that-ai-guy1.bsky.social` | Bluesky profile |
