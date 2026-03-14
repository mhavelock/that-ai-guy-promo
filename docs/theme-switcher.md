# Theme Switcher

## Approach

Set a `data-theme` attribute on the `html` element using the `dataset` property. This acts as a top-level selector for all theme-dependent styles.

We can listen for system theme changes because `matchMedia` returns a [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList), which extends the `EventTarget` interface.

> **Important:** This code should be **global** and **executed only once** when the website (or Electron app) loads — before any framework components mount. Running this on a "mount event" will probably be too late and may cause a flash of incorrect colours/properties.

> This code can be wrapped in an `if-else` that uses `localStorage` to save the user's last preference. Implementation is left to the reader, as it may require toggling logic when the saved setting was `dark` but the system has since changed to `light` mode.

## JavaScript — Detect System Theme

```javascript
// Set data-theme based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
document.documentElement.dataset.theme = prefersDark.matches ? 'dark' : 'light';

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
  document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
});
```

## JavaScript — Toggle Button

Function to execute on button `click`:

```javascript
function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = current === 'dark' ? 'light' : 'dark';
}
```

## CSS — Theme Variables

Use `:root` for shared properties, then scope theme-specific values to `[data-theme]`:

```css
:root {
  /* Shared properties */
  --font-family: system-ui, sans-serif;
}

:root[data-theme="light"] {
  --bg: #ffffff;
  --text: #1d1f24;
  --primary: #a1b1ca;
}

:root[data-theme="dark"] {
  --bg: #1d1f24;
  --text: #a1b1ca;
  --primary: #1d1f24;
}
```

> **Note:** Using `@media (prefers-color-scheme: dark | light)` in CSS is **completely optional** — you can use exclusively the `[data-theme]` attribute. If you still want to use the media query, be prepared to handle all four cases: `system:light + setting:light`, `system:light + setting:dark`, `system:dark + setting:dark`, `system:dark + setting:light`.

## Usage

Create an HTML button to toggle the theme:

```html
<button onclick="toggleTheme()">Toggle Theme</button>
```

All themed elements simply reference the CSS custom properties:

```css
body {
  background-color: var(--bg);
  color: var(--text);
}
```
