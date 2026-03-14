# CSS-Only Parallax with Scroll-Driven Animations

Parallax is a pattern in which different elements of a webpage move at varying speeds as the user scrolls, creating a three-dimensional, layered appearance. Scroll-driven animations have a CSS-only solution.

> **Browser support:** Scroll-driven animations are available on Chrome, Edge, Opera, and Firefox (behind a feature flag) at the time of writing.

## Starting Code

In this example, we apply parallax animations to the background and icons within three "hero" sections of a universe-themed webpage — alternating hero and text sections with space-related placeholder content.

## Adding Initial Animations

Add an animation to the background pattern within each hero section to modify the background position:

```css
@keyframes parallax {
  from {
    background-position: bottom 0px center;
  }
  to {
    background-position: bottom -400px center;
  }
}

section.hero {
  animation: parallax 3s linear;
}
```

By default, CSS animations are duration-based and run when the specified selector is loaded in the DOM. The animation runs for three seconds as soon as the page loads.

## Scroll Progress Timeline

We don't want our animation triggered immediately — instead, use the page's scroll position as a reference to calculate animation progress.

Scroll-driven animations provide two new CSS functions: `view()` and `scroll()`. The **scroll progress timeline** couples animation progression to the user's scroll position within a scroll container.

```css
section.hero {
  animation: parallax linear;
  animation-timeline: scroll();
}
```

As you scroll, the background position changes. Scrolling back up reverses the animation. This CSS animation runs off the main thread and isn't blocked by JavaScript.

## View Progress Timeline

Add a new parallax layer by animating header text and icons within each hero section, so background patterns, headers, and main content all scroll at different speeds.

```css
@keyframes float {
  from { top: 25%; }
  to   { top: 50%; }
}

.hero-content {
  position: absolute;
  top: 25%;
  animation: float linear;
  animation-timeline: scroll();
}
```

**Problem:** Animations further down the page are nearly done by the time they come into view.

**Solution:** Use `view()` — animation progresses based on the subject's position within the scrollport:

```css
.hero-content {
  animation-timeline: view();
}
```

### Fixing the Flash on Scroll-Up

Use `@supports` to include styles only on supported browsers, keeping the main thread clear on unsupported ones.
The view timeline is calculated based on pre-animation positioning. Fix this by adding a negative inset to `view()`, making the container larger than the window:

```css
.hero-content {
  animation-timeline: view(-100px);
}
```

## Animation Ranges

The `animation-range` property adjusts where along the timeline an animation starts and ends.

### Spaceship — Extended Range

```css
@keyframes launch {
  from { transform: translate(-100px, 200px); }
  to   { transform: translate(100px, -100px); }
}

#spaceship {
  animation: launch;
  animation-timeline: view();
  animation-range: 0% 120%;
}
```

The animation continues until 20% beyond the normal endpoint.

### Comet — Delayed Start

```css
@keyframes rotate {
  from { transform: rotate(0deg) translateX(100px); }
  to   { transform: rotate(-70deg) translateX(0px); }
}

#comet {
  animation: rotate linear;
  transform-origin: center 125px;
  animation-timeline: view();
  animation-range: 4rem 120%;
}
```

### Satellite — Combined Animations

Run completely different animations at different points within the same timeline:

```css
@keyframes orbit-in {
  0%   { transform: rotate(200deg); }
  100% { transform: rotate(0deg); }
}

@keyframes orbit-out {
  0%   { transform: translate(0px, 0px); }
  100% { transform: translate(-50px, -15px); }
}

#satellite {
  animation: orbit-in linear, orbit-out ease;
  animation-timeline: view();
  animation-range: 0% 80%, 80% 110%;
}
```

The first animation runs until 80% of the scrollport, then the second takes over.

## Fallbacks and Accessibility

### Reduced Motion

Use `prefers-reduced-motion` for users with motion sensitivities:

```css
/* Option 1: Opt-in animations (disabled by default) */
@media (prefers-reduced-motion: no-preference) {
  .my-selector {
    position: relative;
    top: 25%;
    animation: cool-animation linear;
    animation-timeline: scroll();
  }
}

/* Option 2: Blanket disable (if content is visible without animations) */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
```

### Unsupported Browsers


## Full Example

### HTML

```html
<script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
<main>
  <section class="hero">
    <div class="hero-content">
      <span class="emoji" id="satellite">🛰️</span>
      <h1>The Universe</h1>
    </div>
  </section>
  <section>
    <p>Cosmic ipsum Sputnik meteorite full moon zodiac...</p>
  </section>
  <section class="hero">
    <div class="hero-content">
      <span class="emoji" id="spaceship">🚀</span>
      <h2>Naturally Occurring Magnetic Fields</h2>
    </div>
  </section>
  <section>
    <p>Asterism probe Drake equation opposition ionosphere...</p>
  </section>
  <section class="hero">
    <div class="hero-content">
      <span class="emoji" id="comet">☄️</span>
      <h2>Near Earth Asteroids and Impacts</h2>
    </div>
  </section>
  <section>
    <p>Neptune apastron coriolis force cluster inferior planets...</p>
  </section>
</main>
```

### CSS

```css
body {
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  line-height: 1.75rem;
}

h1 { font-size: 2.25rem; }
h2 { font-size: 1.75rem; }
p  { font-size: 1.25rem; }

main {
  background-color: slategray;
  display: flex;
  flex-direction: column;
  color: white;
}

section {
  padding: 2rem;
  height: 50vh;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

section > * { max-width: 600px; }

.emoji {
  z-index: 0;
  display: inline-block;
  font-size: 50px;
}

/* Hero sections with star pattern background */
section.hero {
  position: relative;
  background-color: #272727;
  background-size: auto 5rem;
  background-image: url("data:image/svg+xml,..."); /* star pattern SVG */
  animation: parallax linear;
  animation-timeline: scroll();
}

.hero-content {
  text-align: center;
  position: absolute;
  top: 25%;
  animation: float linear;
  animation-timeline: view(-100px);
}

.hero-content > * { position: relative; }

/* Element animations */
#satellite {
  animation: orbit-in linear, orbit-out ease;
  animation-timeline: view();
  animation-range: 0% 80%, 80% 110%;
}

#spaceship {
  animation: launch;
  animation-timeline: view();
  animation-range: 0% 120%;
}

#comet {
  transform: translateX(100px);
  animation: rotate linear;
  transform-origin: center 125px;
  animation-timeline: view();
  animation-range: 4rem 120%;
}

/* Keyframes */
@keyframes parallax {
  from { background-position: bottom 0px center; }
  to   { background-position: bottom -400px center; }
}

@keyframes float {
  from { top: 25%; }
  to   { top: 50%; }
}

@keyframes orbit-in {
  0%   { transform: rotate(200deg); }
  100% { transform: rotate(0deg); }
}

@keyframes orbit-out {
  0%   { transform: translate(0px, 0px); }
  100% { transform: translate(-50px, -15px); }
}

@keyframes launch {
  from { transform: translate(-100px, 200px); }
  to   { transform: translate(100px, -100px); }
}

@keyframes rotate {
  from { transform: rotate(0deg) translateX(100px); }
  to   { transform: rotate(-70deg) translateX(0px); }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```
