# That AI Guy — Promo Site

Promotional website for the **That AI Guy** iOS app — a comedy entertainment app that listens to conversations via the iPhone microphone and interrupts with pedantic corrections and put-downs, powered by an external LLM.

Started: 13 March 2026
Launch-ready: 26 March 2026

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
│   │   # — Loaded unconditionally (all screen sizes) —
│   ├── global.css          # Design system (tokens, reset, typography, layout)
│   ├── global-xtra.css     # Unused design system components (kept for reference)
│   ├── theme.css           # Promo layout + dark/light tokens + nav
│   │                       #   imports: stars.css, slider.css, reviews.css,
│   │                       #            speech-bubbles.css, codewall.css,
│   │                       #            top-bg-fx.css, iphone.css
│   ├── glass.css           # .glass modifier — glassmorphism tokens + rules
│   ├── contact-form.css    # Neumorphic contact form
│   ├── download-btn.css    # Animated App Store button
│   ├── word-carousel.css   # CSS-only vertical word carousel
│   ├── ai-thinking.css     # Spinning scan-line border on codewall phone
│   ├── flip-text.css       # Scroll-driven 3D flip on logo (all screen sizes)
│   ├── stats.css           # Neumorphic 3D gauge cards (all screen sizes)
│   ├── radar.css           # Animated radar widget (all screen sizes)
│   │
│   │   # — Loaded only at (min-width: 768px) via <link media=""> —
│   └── desktop.css         # Desktop enhancements master file
│                           #   imports: marquee.css (ticker strip),
│                           #            orbit.css (star orbit on nav)
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

## Claude Review

I helped build this. That feels worth saying plainly.

The site is pure HTML and CSS — no JavaScript, no frameworks, no build step. Every animation, every dark mode transition, every layout effect: CSS only. We tokenised the hex values, converted the px to rem, removed the last `<script>` tag, and didn't put it back. It was the right call every time.

The thing it's promoting is an app that listens to your conversations and interrupts with pedantic corrections. Which means the site needed to be, above all else, correct. Correct markup, correct tokens, correct conventions, correct accessibility. If the app ever reviews its own promotional website, I want it to have nothing to complain about.

I'm proud of what we made. It's small, fast, and honest about what it is.

— Claude Sonnet 4.6

---

## Gemini Review

🔹 Summary Report
Here is a review of your promotional website for "That AI Guy".

First of all, building a high-fidelity, interactive promotional site with zero JavaScript is an impressive feat. In an era where many developers instinctively reach for heavy JavaScript frameworks just to render static content and simple toggles, your approach is incredibly refreshing. By stripping out the build tools and relying entirely on HTML5 and CSS, you have guaranteed a site that is blazingly fast, lightweight, and resilient.

Here is a breakdown of the design choices and the specific modern browser-based functionalities you’ve utilized to make this CSS-only architecture work so seamlessly.

1. Performance & Loading Architecture
Your CSS architecture is incredibly well-thought-out. Separating out the global.css, theme.css, and specific components is standard, but the way you load them is excellent.

Media Attributes on <link> tags: By using <link media="(min-width: 768px)"> for your desktop.css, you are leveraging the browser's native parser to conditionally load and parse stylesheets. Mobile browsers will skip parsing the desktop files entirely, which speeds up the critical rendering path.

2. Theming & Dark Mode
You successfully removed the flash of unstyled content (FOUC) that plagues JS-based theme togglers by handing the responsibility back to the browser.

prefers-color-scheme Media Query: By using @media (prefers-color-scheme: dark), your site natively hooks into the user's operating system settings to render the dark mode tokens.

CSS Custom Properties (var(--...)): By tokenizing hex values into native CSS variables, you allow the browser to repaint the entire layout efficiently when the OS theme switches, without needing a script to swap out classes.

3. Layout, Spacing, & Bounding
You've utilized some of the most powerful modern CSS layout features to create a polished UI that doesn't break out of the viewport.

clamp() Function: Used across your site to create fluid typography, spacing, and component dimensions that natively scale between a minimum and maximum bound without requiring complex breakpoints.

overflow-x: clip and overflow-clip-margin: This is a brilliant use of a relatively new browser feature. Using clip instead of hidden alongside overflow-clip-margin: 2rem prevents the page from having an annoying horizontal scroll on mobile, while still allowing your neumorphic drop-shadows and glowing elements to "breathe" and bleed outside their container bounds.

4. Interactive & Scroll Animations
Achieving complex interactivity without JavaScript event listeners is where this site really shines.

CSS Scroll-Driven Animations: Utilized for your "scroll-driven 3D flip on logo". This taps into modern browser APIs that map animation timelines directly to the scroll position rather than the clock, entirely bypassing the need for JS scroll event listeners (which often cause performance jank).

prefers-reduced-motion Media Query: Your hover morphs and interactive states respect this accessibility feature, ensuring that users who have disabled animations at the OS level are protected from dizzying motion.

5. Accessibility (a11y)
The audit of your accessibility features proves that you don't need JS to make a site screen-reader and keyboard-friendly.

:focus-visible Pseudo-class: By natively utilizing :focus-visible, you allow the browser to intelligently determine when to show focus rings (e.g., when the user is tabbing through the slider bullets or form using a keyboard) without showing ugly outlines when they simply click with a mouse.

Native form functionalities (like autocomplete and aria-labels) ensure that your neumorphic contact form handles screen readers and browser-autofill seamlessly.

Summary
You (and Claude!) should be incredibly proud of this codebase. It perfectly matches the ethos of the app it is promoting: it is pedantically correct. It leans into the platform, respects the user's OS settings, minimizes data transfer, and utilizes the raw power of the modern browser's CSS engine. Excellent job!


## Improvements log

### 2026-03-31

- Patent notice added to footer: "US Patent Application Pending · No. 64/019,879 [Procurable: Sept 2027]" (`.patent-notice` in `global.css`)
- Matching notice added to iOS app Settings footer (see `~/Claudette/Cowork/projects/that-guy/components/SettingsModal.tsx`)

---

### 2026-03-26 — CSS loading split

**Performance architecture**
- `desktop.css` now loads conditionally via `<link media="(min-width: 768px)">` — mobile browsers skip parsing it entirely
- Four all-screen files (`ai-thinking.css`, `flip-text.css`, `stats.css`, `radar.css`) moved from `desktop.css @import` chain to direct `<link>` tags in `<head>` — they apply at all screen sizes and must load unconditionally
- `desktop.css` now imports only `marquee.css` and `orbit.css` — both genuinely desktop-only (hidden at mobile via `display: none` base rule)
- Result: clean separation between "loads everywhere" and "loads at desktop width only"

---

### 2026-03-25 — Pre-launch audit

**Zero JS**
- All JavaScript removed from production pages — site runs on HTML + CSS only
- Stats gauge boxes use static HTML values
- Dark mode via `@media (prefers-color-scheme: dark)` — no script, no flash, tracks OS preference natively

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

### 2026-03-25 — CSS audit (session 2)

**Dark mode**
- Inline theme-init `<script>` removed from all pages
- All `[data-theme="dark"]` selectors converted to `@media (prefers-color-scheme: dark)` across 8 CSS files
- Contact form dark mode: highlight shadow updated to white (`rgba(255,255,255,0.12)`) for visible depth

**CSS conventions**
- Hex values with variable equivalents replaced: `#333`/`#111` → `var(--color-text)`, `#444` → `var(--stat-indicator-color)`
- Download button: 9 neumorphic grey shades extracted to `--btn-neomorph-*` local tokens
- `px` → `rem` across `contact-form.css`, `stats.css`, `utilities.css` (spacing, dimensions, clamp bounds)
- `overflow-x: clip` + `overflow-clip-margin: 2rem` on `.promo-stats` — prevents mobile horizontal scroll while allowing shadows to breathe

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
