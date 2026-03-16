# CLAUDE.md — That AI Guy — Promo Site

## Session Start

Read the latest handoff in `docs/summaries/` if one exists. Load only the files that handoff references. If no handoff exists, state: what you understand the project state to be, what you plan to do this session, and any open questions.

---

## Identity

You are working with Mat. See `~/Claudette/Cowork/CLAUDE.md` for further details.

---

## Project

A single-page promotional website encouraging visitors to download the **That AI Guy** iOS app from the App Store.

**That AI Guy** is a comedy entertainment app that listens to conversations via the iPhone microphone and interrupts with pedantic corrections and put-downs, powered by an external LLM.

---

## Project Location

| Item | Value |
|------|-------|
| **Working Directory** | `~/Claudette/Cowork/projects/that-guy-promo` |
| **Repository** | https://github.com/mhavelock/that-ai-guy-promo | (matalab)
| **Live Site** | https://that-ai-guy.app/ | (not currently working)

---

## Tech Stack

- HTML5, CSS (single critical stylesheet), vanilla JS (CSS-first — use JS only when CSS cannot achieve the goal)
- No build tools, no frameworks
- Hosted on GitHub Pages

---

## File structure

```
/
├── index.html
├── privacy.html
├── assets/          # Logo, favicon, images, SVG icons
├── css/
│   ├── global.css   # All styles — treated as critical (inlined or preloaded)
│   └── custom.css   # Component overrides that extend global.css
├── js/
│   ├── logger.js    # Build activity logging — isolated from app code
│   └── main.js      # App behaviour (modal, etc.)
├── docs/            # Project documentation and test programme
└── context/
    └── summaries/   # Tasklist & handoff summaries
```

---

## Technical development approach

- **Static site**: pure HTML5 / CSS / vanilla JS — no build tools, no package managers, no frameworks
- **CSS-first**: use JS only where CSS cannot achieve the goal
- **Two-file CSS architecture**: `global.css` (design system, components, utilities) + `custom.css` (page-specific overrides that extend the global system)
- **Mobile-first responsive CSS**: base styles target smallest screen; `min-width` queries only (never `max-width` for breakpoints)
- **Modern CSS**: custom properties for all tokens, `clamp()`, `min()`, `max()`, logical properties, `@media (width >=)` range syntax
- **JS pattern**: deferred, wrapped in IIFE, event delegation — no global scope pollution
- **`<dialog>` for modals**: native, accessible, keyboard-dismissible with no extra JS complexity
- **Logging**: `js/logger.js` is isolated from `main.js` — stores structured entries in `localStorage` (key: `thaiaiguy:buildlog`) with in-memory fallback. Load before `main.js`. Remove/gate test block before production. Inspect via `Logger.print()` in the browser console.
- **Git workflow**: feature development on `main`; deploy via GitHub Pages

---

## UX goals

- **Tone**: fun and comedic — copy and layout should reflect the app's personality
- **Clarity**: single, clear call-to-action — download the app. Every element should support this goal
- **Minimal friction**: large touch targets (≥ 44×44px), large text, large buttons, no clutter
- **Light/dark mode**: automatic via `prefers-color-scheme` — no toggle required
- **No motion surprises**: animations and transforms respect `prefers-reduced-motion`
- **Accessible by default**: keyboard navigation, visible focus states, skip link, ARIA where needed

---

## SEO features

| Feature | Status |
|---|---|
| `<meta name="description">` | ✓ All pages |
| Open Graph title + description + type | ✓ index.html |
| Open Graph image | Placeholder — needs real asset |
| Open Graph URL | Placeholder — needs final domain |
| `noindex` on privacy page | ✓ |
| Semantic HTML (`main`, `section`, `article`, `nav`) | ✓ |
| `<meta name="apple-itunes-app">` Smart App Banner | Placeholder — needs App Store ID |
| `sitemap.xml` | Phase 2 |
| `robots.txt` | Phase 2 |
| Canonical URL | Phase 2 |

---

## Performance features

- **PageSpeed target**: 100 (mobile + desktop)
- **Fonts**: Google Fonts loaded asynchronously (non-render-blocking `preload` + `onload` swap); `font-display: swap`; `<link rel="preconnect">` hints
- **JS**: deferred, minimal (<5 KB), no third-party scripts
- **CSS**: two small files, no render-blocking after font fix
- **Images**: `width` + `height` on all `<img>` for CLS prevention; retina via `<picture>` / `srcset`; `loading="lazy"` on below-fold images
- **SVG icons**: inline in HTML — zero additional requests
- **Logo dark mode**: `<picture>` element with `prefers-color-scheme: dark` source — no JS

---

## Content summary

| Page | Sections |
|---|---|
| `index.html` | Header nav · Hero (headline + phone mockup) · How it works (3 steps) · Features (4 cards) · Download CTA · Footer |
| `privacy.html` | Header nav · Privacy policy (9 sections) · Footer |

**Copy tone**: comedy — pedantic, self-aware, slightly annoying (matching the app character)

---

## Layout

| Property | Value |
|---|---|
| Grid | 12-column, `1rem` gutter |
| Max width | `1440px` |
| Min element width | `288px` |
| Base font size | Browser default (`16px`) |
| Font units | `em` for fonts, `rem` for dimensions/spacing |

---

## Brand & colours

| Token | Light mode | Dark mode |
|---|---|---|
| `--color-text` | `#1d1f24` | `#a1b1ca` |
| `--color-bg` | `#ffffff` | `#111318` |
| `--color-surface` | `#f2f4f7` | `#1a1d28` |
| `--color-btn-primary-bg` | `#a1b1ca` | `#1d1f24` |
| `--color-btn-primary-text` | `#1d1f24` | `#a1b1ca` |
| `--color-btn-secondary-bg` | `#3e3b1b` | `#ebe6b7` |
| `--color-btn-secondary-text` | `#a1b1ca` | `#1d1f24` |

> **Note**: the original brief listed LM primary button text as `#a1b1ca` (same as bg — invisible). Interpreted as `#1d1f24` (dark on light button).

**Fonts**
- Body: Arial Bold
- Headings: Open Sans 700/800 (async-loaded from Google Fonts)

---

## CSS conventions

- All styles in `global.css` (critical). Page-specific overrides in `custom.css`.
- CSS custom properties for all colours, spacing, and type scales.
- Properties alphabetised within each rule.
- Clean modern CSS — no vendor prefixes for supported properties.
- `cursor: pointer` on all buttons and button-styled links.
- Standard component patterns: typography, forms, buttons, tooltips, modals, alerts, SVG icons.

---

## Image Strategy

- **Format:** Always WebP. 
- **Responsive:** Separate 1x and 2x WebP variants, served via `srcSet` in native `<picture>` for hero/banner images to allow manual preload hints.
- **Retina rule:** `72dpi` files = 1x, `144dpi` files = 2x in srcSet.
- **LCP images:** Always add `<link rel="preload" fetchPriority="high">`

---

## Rules

1. Do not mix unrelated project contexts in one session.
2. Write state to disk after meaningful work. Summary to `docs/summaries/` using templates.
3. Before session end or context compaction: write every decision, number, file path, open question to disk.
4. When switching work types (research → build → review), write a handoff and suggest a new session.
5. Do not silently resolve open questions. Mark OPEN or ASSUMED.
6. Do not bulk-read documents. Process one at a time: read, summarise to disk, release from context.
7. Sub-agent returns must be structured. Use output contracts from `templates/claude-templates.md`.
8. NEVER commit `.env.local`. NEVER hardcode API keys or secrets in source files.
9. Images must be in `public/` to be served by Next.js — not `assets/`.
10. For responsive images, create separate 1x and 2x WebP variants and serve via `srcSet` in a `<picture>` element.

---

## Standards & compliance

- Valid HTML5 (W3C)
- `lang="en"` on `<html>`
- `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Separate concerns: content (HTML) / presentation (CSS) / behaviour (JS)

---

## Skills

- Use **frontend-standards** skill when writing or reviewing front-end code
- Use **git-commit-messaging** skill when committing to Git

---

## Test programme

Run `docs/test-program.md` at the end of each phase. Claude runs the automated checklist and fixes issues; Mat runs the manual browser checklist and signs off.

---

## Where Things Live

| What | Where |
|------|-------|
| Templates | `templates/claude-templates.md` |
| Active session state | `docs/summaries/` (latest handoff) |
| Domain knowledge | `docs/context/` (load only when relevant) |
| Performance audit | `docs/context/performance-audit.md` |
| Archived raw files | `docs/archive/` (do not read unless told) |
| Claude ops | `.claude/agents/`, `.claude/commands/` |

---

## Error Recovery

If context degrades: write current state to `docs/summaries/recovery-[date].md`, tell the user what may have been lost, suggest a fresh session.

---

## Before Delivering Output

Verify: open questions marked OPEN, output matches what was requested, no secrets in committed code, images in `public/` not `assets/`, summary written to disk.