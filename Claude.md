# CLAUDE.md — That AI Guy — Promo Site

## Session Start

Read the latest handoff in `docs/context/summaries/` if one exists. Load only the files that handoff references. If no handoff exists, state: what you understand the project state to be, what you plan to do this session, and any open questions.

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
├── favicon.svg / favicon.ico / favicon-96x96.png / apple-touch-icon.png / site.webmanifest
├── assets/          # Logo, favicon, images, SVG icons, audio
│   ├── components/  # SVG logos and button assets
│   ├── iphones/     # App screenshots (PNG — to be converted to WebP)
│   ├── speech-bubbles/ # SVG speech bubble assets
│   ├── bgs/         # Background WebP images
│   ├── graphics/    # Award/promo graphics
│   ├── avatars/     # Reviewer avatar images
│   ├── icons/       # UI icons (SVG)
│   └── audio/       # pull-chord MP3 sounds (Phase 2)
├── css/
│   ├── global.css   # Design system (tokens, reset, typography, layout, components, utilities)
│   │                # Imports: grid.css, utilities.css, badges.css
│   ├── theme.css    # Promo page layout, dark/light tokens ([data-theme]), bottom-nav, toggle
│   │                # Imports: stars.css, slider.css, reviews.css
│   ├── grid.css     # Grid layout utilities (grid-4x4)
│   ├── utilities.css # sr-only, blockquote comma-separator
│   ├── slider.css   # CSS-only carousel — third-party component (fragile, do not refactor)
│   ├── badges.css   # Circle badge + clip-path morph on hover
│   ├── stars.css    # CSS star-rating via <input type="range"> + @property + view-timeline
│   └── reviews.css  # Review card layout (open-quote, quote text, stars, attribution)
├── js/
│   ├── main.js      # App behaviour (modal)
│   ├── theme.js     # Light/dark toggle — reads/writes localStorage + listens to system changes
│   └── logger.js    # Build activity logging — isolated, load after theme.js
├── _archive/        # Archived prototypes (do not use)
└── docs/
    ├── test-program.md
    ├── context/
    │   └── summaries/ # Tasklist & handoff summaries
    └── discovery/   # Research docs and assets
```

---

## Technical development approach

- **Static site**: pure HTML5 / CSS / vanilla JS — no build tools, no package managers, no frameworks
- **CSS-first**: use JS only where CSS cannot achieve the goal
- **Multi-file CSS architecture**: `global.css` (design system; imports `grid.css`, `utilities.css`, `badges.css`) + `theme.css` (promo layout + nav + dark/light tokens; imports `stars.css`, `slider.css`, `reviews.css`)
- **Mobile-first CSS** *(critical rule)*: base styles must target the smallest screen — no media queries needed for mobile. Layer desktop overrides upward using `@media (width >= Npx)` only. **Never use `max-width` breakpoints.** Exception: `slider.css` is a third-party component — do not refactor its media queries.
- **Modern CSS**: custom properties for all tokens, `clamp()` for fluid type, `@media (width >=)` range syntax, logical properties
- **Glass modifier pattern**: glassmorphism (`backdrop-filter`, `background: rgba()`, `border: 1px solid rgba()`, `box-shadow`) lives on a `.glass` modifier class — never baked into the structural component class. Apply both in HTML: `class="bottom-nav glass"`. This keeps structure and appearance independently reusable.
- **JS pattern**: deferred, wrapped in IIFE, event delegation — no global scope pollution
- **`<dialog>` for modals**: native, accessible, keyboard-dismissible with no extra JS complexity
- **Logging**: `js/logger.js` is isolated from `main.js` — stores structured entries in `localStorage` (key: `thaiaiguy:buildlog`) with in-memory fallback. Load before `main.js`. Remove/gate test block before production. Inspect via `Logger.print()` in the browser console.
- **Git workflow**: feature development on `main`; deploy via GitHub Pages

---

## UX goals

- **Tone**: fun and comedic — copy and layout should reflect the app's personality
- **Clarity**: single, clear call-to-action — download the app. Every element should support this goal
- **Minimal friction**: large touch targets (≥ 44×44px), large text, large buttons, no clutter
- **Light/dark mode**: `prefers-color-scheme` auto + manual toggle (`theme-toggle-btn`) saves preference to `localStorage`
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

**Font**
- **Fredoka** variable (300–700), loaded from Google Fonts via `<link rel="preconnect">` + stylesheet in `<head>`. Applied via `font-family: 'Fredoka', Verdana, Arial, sans-serif` in `theme.css`.

---

## CSS conventions

- CSS custom properties for all colours, spacing, and type scales.
- Properties alphabetised within each rule.
- Clean modern CSS — no vendor prefixes for supported properties.
- `cursor: pointer` on all buttons and button-styled links.
- **Mobile-first**: base rules are for mobile. Desktop overrides use `@media (width >= 768px)`. Never use `max-width` breakpoints (exception: `slider.css`).
- **Glass modifier**: glassmorphism on `.glass` modifier only — never on the structural class. See *Technical development approach* above.
- **Fluid typography**: mobile sizes are fixed (`p` = 1.2rem, `h1` = 1.5rem, etc.). Desktop scales via `clamp()` from 768px to 1248px. Badges, reviews, and stars are exceptions — their font sizes are pinned in their own files.

---

## Image Strategy

- **Format:** Always WebP. 
- **Responsive:** Separate 1x and 2x WebP variants, served via `srcSet` in native `<picture>` for hero/banner images to allow manual preload hints.
- **Retina rule:** `72dpi` files = 1x, `144dpi` files = 2x in srcSet.
- **LCP images:** Always add `<link rel="preload" fetchPriority="high">`

---

## Rules

1. Do not mix unrelated project contexts in one session.
2. Write state to disk after meaningful work. Summary to `docs/context/summaries/` using templates.
3. Before session end or context compaction: write every decision, number, file path, open question to disk.
4. When switching work types (research → build → review), write a handoff and suggest a new session.
5. Do not silently resolve open questions. Mark OPEN or ASSUMED.
6. Do not bulk-read documents. Process one at a time: read, summarise to disk, release from context.
7. Sub-agent returns must be structured. Use output contracts from `templates/claude-templates.md`.
8. NEVER commit `.env.local`. NEVER hardcode API keys or secrets in source files.
9. Images live in `assets/` — this is a static HTML site, not Next.js. No `public/` directory.
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
| Active session state | `docs/context/summaries/` (latest handoff) |
| Domain knowledge | `docs/context/` (load only when relevant) |
| Performance audit | `docs/context/performance-audit.md` |
| Archived raw files | `docs/archive/` (do not read unless told) |
| Claude ops | `.claude/agents/`, `.claude/commands/` |

---

## Error Recovery

If context degrades: write current state to `docs/summaries/recovery-[date].md`, tell the user what may have been lost, suggest a fresh session.

---

## Before Delivering Output

Verify: open questions marked OPEN, output matches what was requested, no secrets in committed code, images in `assets/` (static site — no `public/` directory), summary written to disk.