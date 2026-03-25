# That AI Guy — Promo Site

Promotional website for the **That AI Guy** iOS app — a comedy entertainment app that listens to conversations via the iPhone microphone and interrupts with pedantic corrections and put-downs, powered by an external LLM.

## Stack

- HTML5 / CSS — zero JavaScript in production, no build tools, no frameworks
- Hosted on Cloudflare Pages (`npx wrangler pages deploy`)
- CSS-first: all animation, theming, and interactivity in CSS

## Structure

```
/
├── index.html              # Single-page promo (full site)
├── holding.html            # Holding / coming soon page (live at root via _redirects)
├── 404.html                # Custom 404 page (auto-served by Cloudflare Pages)
├── privacy.html            # Privacy policy
├── _redirects              # Cloudflare Pages redirect rules
├── wrangler.jsonc          # Cloudflare Pages deploy config
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap (root URL)
├── css/
│   ├── global.css          # Design system (tokens, reset, typography, layout)
│   ├── global-xtra.css     # Unused design system components (kept for reference)
│   ├── theme.css           # Promo layout + dark/light tokens + nav
│   ├── grid.css            # Badge grid layout
│   ├── utilities.css       # sr-only, blockquote comma separator
│   ├── slider.css          # CSS-only carousel (third-party — do not refactor)
│   ├── badges.css          # Circle badge + clip-path hover morph
│   ├── stars.css           # CSS star-rating via <input type="range"> + @property
│   ├── reviews.css         # Review card layout
│   └── speech-bubbles.css  # Phone + speech bubble positioning
└── assets/                 # Logos, screenshots, SVGs, audio, avatars
```

## Dev

```
npx live-server --port=8080
```

## Deploy

```
npx wrangler pages deploy
```

## Conventions

See `CLAUDE.md` for full coding conventions, design tokens, and session rules.

---

## Improvements log

### 2026-03-25 — Pre-launch audit

**Zero JS**
- All JavaScript removed from production pages — site runs on HTML + CSS only
- Stats gauge boxes use static HTML values; theme auto-detected from system preference via inline head script

**SEO**
- Open Graph domain corrected to `that-ai-guy.app`
- OG image wired to real asset (`assets/graphics/thataiguy_2100x630-ogbanner-banner.png`, 2100×630)
- Intro tagline promoted to `<h1>` (was `<ul><li>`)

**Code quality**
- `css/contect-form.css` renamed to `contact-form.css`
- Dark mode added to stats boxes (were hardcoded light-grey)
- Privacy nav icon corrected to white in dark mode
- `aria-describedby` added to sent confirmation alertdialog
- Bluesky link: `target="_blank" rel="noopener noreferrer"` added
- `css/matrix-rain.css` deleted (orphaned file)

---

### 2026-03-24 — Site audit

**Accessibility**
- All interactive elements have visible `:focus-visible` states — site is fully keyboard-navigable
- Slider bullets focusable via keyboard (`tabindex="0"`)
- Form inputs have `aria-label` and `autocomplete` — screen readers and autofill now work correctly
- Decorative emoji icons marked `aria-hidden`

**Animation / performance**
- Badge hover morph now respects `prefers-reduced-motion`
- Full animation audit — all scroll-driven and time-based animations confirmed compositor-safe or gated

**CSS architecture**
- Self-contained unused design system components (Tooltips, Modal, Icons, site-header, site-footer) extracted from `global.css` into `global-xtra.css`
