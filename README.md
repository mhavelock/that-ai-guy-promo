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
