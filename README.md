# @race-conditioned/myriad-ui

A config-object-driven, Tailwind v4-first React component library built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html).

Every component is fully accessible out of the box. Styling is entirely controlled by a theme config object — no class overrides, no CSS variables to fight, no opinionated design baked in.

---

## How it works

Components accept a `config` prop that controls every class name, colour, and behaviour. You build a theme once with `createTheme()`, then pass the relevant config slice to each component.

```tsx
import { createTheme } from "@race-conditioned/myriad-ui";
import { Button } from "@race-conditioned/myriad-ui/button";

const theme = createTheme({
  components: {
    button: {
      intent: {
        primary: {
          default: { bg: "bg-violet-600", text: "text-white", border: "border-transparent", shadow: "shadow-sm" },
          hover:   { bg: "hover:bg-violet-700", text: "text-white", border: "border-transparent", shadow: "hover:shadow-md" },
          pressed: { bg: "active:bg-violet-800", scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
          disabled: { bg: "bg-violet-300", text: "text-white", opacity: "opacity-60", cursor: "cursor-not-allowed" },
          loading:  { bg: "bg-violet-600", spinnerColor: "text-white" },
        },
      },
    },
  },
});

<Button config={theme.components.button} intent="primary">
  Save changes
</Button>
```

`createTheme()` deep-merges your overrides on top of the built-in defaults — only specify what differs.

---

## Installation

```bash
npm install @race-conditioned/myriad-ui react-aria-components
# or
bun add @race-conditioned/myriad-ui react-aria-components
```

Requires React 19+ and Tailwind v4.

---

## Components

| Component | Import |
|---|---|
| Button | `@race-conditioned/myriad-ui/button` |
| GlowBorderButton | `@race-conditioned/myriad-ui/glow-border-button` |
| RollingText | `@race-conditioned/myriad-ui/rolling-text` |
| TextField | `@race-conditioned/myriad-ui/text-field` |
| TextArea | `@race-conditioned/myriad-ui/text-area` |
| NumberField | `@race-conditioned/myriad-ui/number-field` |
| SearchField | `@race-conditioned/myriad-ui/search-field` |
| SelectField | `@race-conditioned/myriad-ui/select-field` |
| ComboBox | `@race-conditioned/myriad-ui/combo-box` |
| Checkbox + CheckboxGroup | `@race-conditioned/myriad-ui/checkbox` |
| RadioGroup + Radio | `@race-conditioned/myriad-ui/radio-group` |
| Switch | `@race-conditioned/myriad-ui/switch` |
| Slider | `@race-conditioned/myriad-ui/slider` |
| Tooltip | `@race-conditioned/myriad-ui/tooltip` |
| Dialog | `@race-conditioned/myriad-ui/dialog` |
| Popover | `@race-conditioned/myriad-ui/popover` |

Everything is also re-exported from the root `@race-conditioned/myriad-ui` for convenience.

---

## Button FX props

Button ships with composable interaction effects:

| Prop | Effect |
|---|---|
| `lift` | Subtle translate-Y on hover |
| `contentRaise` | Content rises slightly on hover |
| `rollingText` | Slot-machine character animation on hover |
| `rollToLoading` | Rolls text out then fades to spinner |
| `loading` | Controlled loading state |

```tsx
// Full-combo pattern — lift + content raise + slot-machine → loading
<Button config={theme.components.button} intent="primary"
  lift contentRaise rollingText rollToLoading loading={isLoading}>
  Submit
</Button>
```

---

## Input FX props

TextField, TextArea, SearchField, ComboBox, and SelectField all support optional visual effects via config:

| Config key | Effect |
|---|---|
| `glow` | Focus glow behind the input |
| `gradientBorder` | Animated gradient border on focus |
| `svgStroke` | SVG border draw animation on focus |
| `inkDraw` | Hand-drawn ink border animation |
| `corners` | Corner bracket / split bracket decorations |
| `bgReveal` | Background colour reveals on focus |
| `ripple` | Ripple or pulse-rings on focus |
| `cursorSpotlight` | Radial spotlight that follows the cursor |
| `characterReveal` | Per-character entrance animation when typing (`char-fade`, `char-slide-up`, `char-blur`) |
| `morphRadius` | Border-radius morphs between rest and focus states |
| `chromaBorder` | Animated chroma border (`hue-rotate`, `aurora`, `iridescent`) |

Enable any effect by passing the prop with the matching name:

```tsx
<TextField config={theme.components.textField}
  glow gradientBorder characterReveal />
```

---

## Tailwind v4 setup

Add a `@source` directive so Tailwind scans the package for class names:

```css
/* your main CSS file */
@import "tailwindcss";
@source "../node_modules/@race-conditioned/myriad-ui/dist/**/*.js";
```

---

## Theme system

```ts
import { createTheme, defaultTheme } from "@race-conditioned/myriad-ui";

// Merge overrides on top of defaults
const theme = createTheme({ components: { ... } });

// Or start from scratch with the full default config
const base = defaultTheme;
```

Full TypeScript types are exported for every config shape — `ButtonConfig`, `TextFieldConfig`, `ThemeConfig`, etc.

---

## Development

```bash
bun install
bun run storybook   # component explorer on :6008
bun run build       # compile to dist/
bun run typecheck
```
