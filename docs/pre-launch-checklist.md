# Pre-Launch Checklist — That AI Guy Promo

## Outstanding before launch

- [ ] **Dark mode mini-logo** — supply alternative `that-aiguy-logo.svg` with hands variant for dark mode. Wire into `<picture>` with `[data-theme="dark"]` CSS swap (or `prefers-color-scheme: dark` source). Used as inline `<em>` background-image in `.promo-text`.

---

## 1. Device check

- [ ] iPhone SE (375px) — smallest supported viewport
- [ ] iPhone 14 / 15 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad (768px) — breakpoint boundary
- [ ] Desktop 1280px
- [ ] Desktop 1440px
- [ ] Test both light and dark mode on each device

## 2. Code quality

Run `docs/test-program.md` automated checklist first, then:

- [ ] W3C HTML validator — no errors
- [ ] W3C CSS validator — no errors (flag intentional exceptions)
- [ ] No console errors or warnings in browser DevTools
- [ ] All images have `alt`, `width`, `height` attributes
- [ ] All links resolve (no 404s)
- [ ] Favicon renders correctly on tab + bookmark
- [ ] Open Graph meta tags populated (title, description, image, URL)
- [ ] `<meta name="apple-itunes-app">` populated with App Store ID
- [ ] Privacy policy contact email filled in
- [ ] App Store URL live in download button

## 3. PageSpeed

- [ ] Run Lighthouse mobile audit — target 100 performance
- [ ] Run Lighthouse desktop audit — target 100 performance
- [ ] LCP image has `<link rel="preload" fetchPriority="high">`
- [ ] No render-blocking resources
- [ ] All images WebP, correct `width`/`height` to prevent CLS
- [ ] Fonts loaded via `preconnect` + async stylesheet swap

## 4. Remove JS toggle

- [ ] Remove `<button class="theme-toggle glass" id="theme-toggle-btn">` from `index.html`
- [ ] Keep the inline `<script>` in `<head>` — it handles FOUC prevention and system preference on page load
- [ ] Confirm dark/light mode still switches correctly via system settings after removal

## 5. Agentic workers check

- [ ] Review any Claude-generated code for hallucinated attributes or invalid HTML
- [ ] Check all CSS custom properties resolve (no `var(--undefined)`)
- [ ] Confirm no leftover placeholder copy (lorem ipsum, TBD, TODO)
- [ ] Confirm no hardcoded colours outside `codewall.css` (intentional exception)
- [ ] Check `localStorage` keys are correct: `thaiaiguy:theme`
