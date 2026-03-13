# Test Programme — That AI Guy

Run at the end of each development phase before sign-off.

**How to use:**
1. Claude runs the **Claude checklist** and fixes any issues found, then marks items complete
2. Mat runs the **Mat checklist** manually in the browser and marks items complete
3. Both checklists must be fully checked before a phase is signed off
4. Log the result in the **Phase sign-off log** at the bottom

---

## Claude's Checklist

*Claude runs this automatically. Reference: frontend-standards skill + Claude.md.*

### Code organisation
- [ ] HTML files are well-structured with clear semantic sections
- [ ] CSS follows global → custom architecture with no leakage between files
- [ ] JS is minimal, non-blocking, wrapped in IIFE
- [ ] File/folder structure matches the spec in Claude.md
- [ ] No orphaned or unused files

### Clean code — HTML
- [ ] `<!doctype html>` and `<html lang="en">` on all pages
- [ ] `<meta charset="UTF-8">` and `<meta name="viewport">` on all pages
- [ ] One `<h1>` per page; heading levels sequential (no skipped levels)
- [ ] All `<img>` have `alt`, `width`, and `height` attributes
- [ ] All form inputs have associated `<label>` elements
- [ ] No `href="javascript:void(0)"` — real URLs or `#section-id` anchors only
- [ ] No inline `style` attributes in HTML
- [ ] No inline event handlers (`onclick=`, `onchange=`, etc.) — exception: font-load `onload` swap (documented)
- [ ] All closing tags present; consistent 4-space indentation

### Clean code — CSS
- [ ] Properties alphabetised within each rule
- [ ] No `!important` in component code
- [ ] No unused CSS classes or rules
- [ ] `box-sizing: border-box` set globally at top of stylesheet
- [ ] CSS custom properties used for all colours, spacing, and type tokens
- [ ] Class names follow component-element naming pattern (`.card`, `.card-title`)
- [ ] Responsive breakpoints use `min-width` or `width >=` only (no `max-width`)
- [ ] `@media (prefers-color-scheme: dark)` rules present for all colour tokens
- [ ] `@media (prefers-reduced-motion: reduce)` applied to transitions and transforms

### Clean code — JS
- [ ] No `console.log` statements
- [ ] `const`/`let` only (no `var`)
- [ ] `===` not `==`
- [ ] Semicolons on all statements
- [ ] Event listeners use delegation where possible
- [ ] No memory leaks from uncleaned listeners or large objects in global scope

### Performance
- [ ] Web fonts loaded non-render-blocking (async `preload` + `onload` swap + `<noscript>` fallback)
- [ ] `<link rel="preconnect">` for external font domains
- [ ] JS loaded with `defer` or placed before `</body>`
- [ ] `loading="lazy"` on all below-fold `<img>` elements
- [ ] `width` and `height` on all `<img>` elements (CLS prevention)
- [ ] No unnecessary third-party scripts

### Browser memory
- [ ] Event listeners use delegation on stable parent elements
- [ ] No event listeners added in loops without cleanup
- [ ] No large data structures held in global scope
- [ ] `<dialog>` used for modals (native — no custom open/close state management needed)

### Security
- [ ] No user-controlled HTML rendered directly to the DOM (XSS)
- [ ] No sensitive data (keys, tokens) in client-side JS or HTML
- [ ] External links include `rel="noopener noreferrer"` where appropriate
- [ ] No mixed content (HTTP resources on an HTTPS page)
- [ ] `<form>` actions point to real endpoints or are clearly marked TODO/placeholder

### Accessibility
- [ ] Skip link present on all pages and functional
- [ ] Visible focus styles on all interactive elements (`:focus-visible`)
- [ ] ARIA attributes correct: `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-controls`
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Interactive elements keyboard-reachable (Tab, Enter, Space, Escape)
- [ ] Colour contrast meets WCAG AA (4.5:1 text, 3:1 UI)

### SEO & meta
- [ ] `<title>` on all pages
- [ ] `<meta name="description">` on all pages
- [ ] Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- [ ] Privacy page has `<meta name="robots" content="noindex">`
- [ ] `<link rel="apple-touch-icon">` present
- [ ] `<meta name="theme-color">` present (light + dark variants)

---

## Mat's Checklist

*Manual browser testing. Run in Safari first (primary audience is iOS users).*

### Visual — light mode
- [ ] Page renders correctly at 375px (mobile)
- [ ] Page renders correctly at 768px (tablet)
- [ ] Page renders correctly at 1280px+ (desktop)
- [ ] Logo is clear and visible
- [ ] Phone mockup looks good in hero
- [ ] All text is readable; no clipping or overflow

### Visual — dark mode
- [ ] Switch system to dark mode (`System Preferences → Appearance → Dark`)
- [ ] Colours switch correctly; all text remains readable
- [ ] Logo is visible in dark mode
- [ ] No elements are invisible (light on light or dark on dark)
- [ ] Mockup chat bubbles look correct

### Responsive
- [ ] No horizontal scroll at any viewport width
- [ ] Min element width (288px) respected — no elements narrower than this
- [ ] Max width (1440px) respected — content doesn't stretch beyond this
- [ ] Landscape mobile: no layout breaks, content accessible

### Interactions
- [ ] Skip link appears on first Tab keypress and scrolls to main content
- [ ] Nav links scroll to correct sections
- [ ] Buttons show hover state (desktop)
- [ ] Buttons show active/pressed state on tap (mobile)
- [ ] Focus ring visible when tabbing through all interactive elements
- [ ] Escape key closes any open modals

### Performance
- [ ] Run Lighthouse in Chrome DevTools — target: 100 across all categories
- [ ] No 404s in the browser network tab
- [ ] No console errors
- [ ] Fonts load cleanly (no visible FOUT)

### Cross-browser
- [ ] Safari (macOS) — primary
- [ ] Safari (iOS) — primary target
- [ ] Chrome
- [ ] Firefox

### Content & copy
- [ ] All copy proofread
- [ ] No placeholder text visible to real users
- [ ] App Store link works (once URL is set)
- [ ] Privacy policy link in footer and download CTA works
- [ ] Privacy policy content reviewed and signed off

---

## Phase sign-off log

| Phase | Date | Claude | Mat | Notes |
|---|---|---|---|---|
| Phase 1 — Foundation | 2026-03-13 | In progress | Pending | Initial build + code review |
