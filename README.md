# That AI Guy — Promo Site

Promotional website for the **That AI Guy** iOS app — a comedy entertainment app that listens to conversations via the iPhone microphone and interrupts with pedantic corrections and put-downs, powered by an external LLM.

## Stack

- Vanilla HTML5 / CSS / JavaScript — no build tools, no frameworks
- Hosted on Cloudflare Pages (`npx wrangler pages deploy`)
- CSS-first: JS only where CSS cannot achieve the goal

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
├── js/
│   ├── main.js             # Modal behaviour
│   ├── theme.js            # Light/dark toggle, localStorage
│   └── logger.js           # Build activity logging (localStorage)
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
