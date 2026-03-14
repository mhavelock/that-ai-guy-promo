# CSS Toggle Switch

## Checkbox to Slider

Starting with a basic checkbox input:

```html
<div class="checkbox-wrapper">
  <div class="checkbox__input">
    <input class="input-checkbox" type="checkbox" value="1" name="placeholder">
  </div>
</div>
```

To turn this into a toggle, add a `<label>` around the input and a `<span>` inside (based on [W3Schools toggle switch](https://www.w3schools.com/howto/howto_css_switch.asp)):

```html
<div class="checkbox-wrapper">
  <div class="checkbox__input">
    <label class="switch">
      <input class="input-checkbox" type="checkbox" value="1" name="placeholder">
      <span class="slider"></span>
    </label>
  </div>
</div>
```

### Step 1: Hide the Default Checkbox

```css
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
```

Setting `opacity: 0` makes it invisible; zeroing width and height prevents positioning issues.

### Step 2: Define the Slider Container

```css
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
```

`position: relative` keeps it responsive to surrounding elements. `inline-block` lets it sit alongside other elements while having its own dimensions.

### Step 3: Style the Slider Track

```css
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
```

- `cursor: pointer` — shows a hand on hover, indicating interactivity
- `transition: .4s` — animates the colour change over 0.4 seconds

### Step 4: Create the Toggle Indicator

```css
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
```

The `::before` pseudo-element creates a white square — this is the toggle knob.

### Step 5: Checked State

The checkmark inherits the 0.4s transition from `.slider:before`, so it animates smoothly with the knob.

```css
input:checked + .slider {
  background-color: #2196F3;
}
```

Uses the [`:checked` pseudo-selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked). Since the span shares a label with the hidden input, clicking it toggles between checked and unchecked. The background transitions from grey to blue over 0.4 seconds.

### Step 6: Focus State

```css
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}
```

Adds subtle depth with a sharp shadow (`0 0` = centred, `1px` = minimal blur).

### Step 7: Move the Knob

```css
input:checked + .slider:before {
  transform: translateX(26px);
}
```

Moves the white knob 26px right when checked. The 0.4s transition applies to both directions.

---

## Customising the Slider

### Round Toggle

Add `border-radius` to both the slider and the pseudo-element:

```css
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
```

[`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) introduces curves — the larger the value, the more dramatic the curve. Add the `round` class to the slider span.

### Black Background

Change the checked-state colours:

```css
input:checked + .slider {
  background-color: #000000;
}

input:focus + .slider {
  box-shadow: 0 0 1px #000000;
}
```

### Checkmark Inside Toggle When Checked

Use an inline SVG as the background image for the knob:

```css
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  transition: .4s;
  background-color: white;
  background-position: 50%;
}
```

The `background-position: 50%` is important — it centres the checkmark and prevents a positioning transition artefact.

Then apply the SVG checkmark only when checked:

```css
input:checked + .slider:before {
  background: no-repeat 50% url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='10' viewBox='8.9 0.3 10.3 8'%3E%3Cpath d='M12.6 8.1L8.9 4.3l1-1.1 2.7 2.7L18.1.5l1 1z'/%3E%3C/svg%3E");
  transform: translateX(26px);
  background-color: white;
}
```

> **Note:** `background-color: white` must appear after `background` to avoid being overridden — CSS cascade means the last declaration wins.
