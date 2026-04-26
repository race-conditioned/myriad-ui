// -----------------------------------------------------------------------------
// Primitive token types
// -----------------------------------------------------------------------------

export type ColorScale = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export type TokenColors = {
  /** Full color scales — reference these in component configs */
  primary: ColorScale
  neutral: ColorScale
  danger: ColorScale
  success: ColorScale
  warning: ColorScale
}

export type TokenRadii = {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export type TokenShadows = {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
}

export type TokenAnimation = {
  duration: {
    fast: string   // e.g. "100ms"
    normal: string // e.g. "150ms"
    slow: string   // e.g. "300ms"
  }
  easing: {
    default: string // e.g. "ease-out"
    spring: string  // e.g. "cubic-bezier(0.34, 1.56, 0.64, 1)"
  }
}

export type Tokens = {
  colors: TokenColors
  radii: TokenRadii
  shadows: TokenShadows
  animation: TokenAnimation
}

// -----------------------------------------------------------------------------
// Component config types
// -----------------------------------------------------------------------------

// --- Button ------------------------------------------------------------------

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"
export type ButtonIntent = "primary" | "secondary" | "ghost" | "outline" | "danger" | "link"
export type ButtonShape = "rounded" | "pill" | "square"

export type ButtonSizeConfig = {
  height: string
  paddingX: string
  fontSize: string
  fontWeight: string
  letterSpacing: string
  borderRadius: string
  gap: string
  iconSize: string
  spinnerSize: string
}

export type ButtonIntentConfig = {
  default: {
    bg: string
    text: string
    border: string
    shadow: string
  }
  hover: {
    bg: string
    text: string
    border: string
    shadow: string
  }
  pressed: {
    bg: string
    scale: string
  }
  focusVisible: string
  disabled: {
    bg: string
    text: string
    opacity: string
    cursor: string
  }
  loading: {
    bg: string
    spinnerColor: string
  }
}

export type ButtonConfig = {
  base: string
  ripple: boolean
  pressScale: boolean
  size: Record<ButtonSize, ButtonSizeConfig>
  intent: Record<ButtonIntent, ButtonIntentConfig>
  shape: Record<ButtonShape, {
    borderRadius: string
    paddingX: string
    aspectRatio: string
  }>
}

// --- NumberField -------------------------------------------------------------

export type NumberFieldSize = "sm" | "md" | "lg"

export type NumberFieldSizeConfig = {
  /** Height of the group wrapper, e.g. "h-9" */
  height: string
  /** Font size for the input, e.g. "text-sm" */
  fontSize: string
  /** Left padding on the input, e.g. "pl-3" */
  paddingLeft: string
  /** Width of the stepper button column, e.g. "w-8" */
  stepperWidth: string
}

export type NumberFieldConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria group root — must include
   * "group" so child elements can read `group-data-[focused]:` etc.
   */
  root: string
  /** <Label> element classes */
  label: string
  /** Required star indicator (aria-hidden) */
  requiredIndicator: string
  /** Description text rendered below the label */
  description: string
  /** FieldError / errorMessage text */
  error: string
  /**
   * The React Aria <Group> element — the visible border/bg container.
   * Border, focus ring, and state styles live here via group-data-[*] selectors.
   */
  group: string
  /** The <input> element — fills available space, no border/bg of its own */
  input: string
  /** Div wrapping both stepper buttons, includes the left border divider */
  stepperColumn: string
  /** Applied to the decrement button to draw the separator between the two buttons */
  stepperSeparator: string
  /** Base classes shared by both increment and decrement buttons */
  stepperButton: string
  /** Size variants */
  size: Record<NumberFieldSize, NumberFieldSizeConfig>
  /** Config for the focus glow (FX-C). */
  glow?: TextFieldGlowConfig
  /** Config for the animated gradient border (FX-D). */
  gradientBorder?: TextFieldGradientBorderConfig
  /** Config for the SVG stroke draw (FX-E). */
  svgStroke?: TextFieldSvgStrokeConfig
  /** Config for the ornamental corners / split-line (FX-F). */
  corners?: TextFieldCornersConfig
  /** Config for the background reveal (FX-G). */
  bgReveal?: TextFieldBgRevealConfig
  /** Config for the ripple / pulse effects (FX-H). All three variants apply. */
  ripple?: TextFieldRippleConfig
  /** Config for the cursor spotlight (FX-I). */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /** Config for the ink-draw effect (FX-K). */
  inkDraw?: TextFieldInkDrawConfig
  /** Config for the morphing border-radius (FX-L). */
  morphRadius?: TextFieldMorphRadiusConfig
  /** Config for the chroma border (FX-M). */
  chromaBorder?: TextFieldChromaBorderConfig
}

// --- ComboBox ----------------------------------------------------------------

export type ComboBoxSize = "sm" | "md" | "lg"

export type ComboBoxSizeConfig = {
  /** Height of the inputWrapper, e.g. "h-10" */
  height: string
  /** Font size class, e.g. "text-sm" */
  fontSize: string
  /** Left padding of the input text (no prefix), e.g. "pl-3" */
  paddingLeft: string
  /** Left padding when a prefix adornment is present, e.g. "pl-9" */
  withPrefix: string
  /** Right padding of the input text — accounts for the toggle button, e.g. "pr-9" */
  paddingRight: string
  /** Width of the prefix adornment column, e.g. "w-9" */
  adornmentWidth: string
  /** Width of the chevron toggle button column, e.g. "w-9" */
  buttonWidth: string
}

export type ComboBoxConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria ComboBox root — must include
   * "group" so child elements can read `group-data-[focused]:` and
   * `group-data-[open]:` selectors.
   */
  root: string
  /** <Label> element classes */
  label: string
  /** Required star indicator (aria-hidden) */
  requiredIndicator: string
  /** Description text rendered below the label */
  description: string
  /** FieldError / errorMessage text */
  error: string
  /**
   * Wrapper div holding the Input + toggle Button.
   * Border, focus ring, and state styles live here via group-data-[*] selectors.
   */
  inputWrapper: string
  /** The <Input> text element — fills available space, no border/bg of its own */
  input: string
  /**
   * The chevron toggle <Button> — fixed width, right-aligned inside the wrapper.
   * Include transition-transform + group-data-[open]:rotate-180 for open state.
   */
  button: string
  /** Prefix icon container (absolute-positioned) */
  adornment: string
  /** The floating popover panel */
  popover: string
  /** The <ListBox> element inside the popover */
  listBox: string
  /** Base classes for each <ListBoxItem> */
  item: string
  /** Additional classes applied when an item is focused or hovered */
  itemFocused: string
  /** Additional classes applied when an item is selected */
  itemSelected: string
  /** Additional classes applied when an item is disabled */
  itemDisabled: string
  /** <Header> inside a <Section> */
  sectionHeader: string
  /** Separator line between groups */
  separator: string
  /** Size variants */
  size: Record<ComboBoxSize, ComboBoxSizeConfig>
  /** Config for the focus glow (FX-C). */
  glow?: TextFieldGlowConfig
  /** Config for the animated gradient border (FX-D). */
  gradientBorder?: TextFieldGradientBorderConfig
  /** Config for the SVG stroke draw (FX-E). */
  svgStroke?: TextFieldSvgStrokeConfig
  /** Config for the ornamental corners / split-line (FX-F). */
  corners?: TextFieldCornersConfig
  /** Config for the background reveal (FX-G). */
  bgReveal?: TextFieldBgRevealConfig
  /** Config for the ripple / pulse effects (FX-H). */
  ripple?: TextFieldRippleConfig
  /** Config for the cursor spotlight (FX-I). */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /** Config for the ink-draw effect (FX-K). */
  inkDraw?: TextFieldInkDrawConfig
  /** Config for the morphing border-radius (FX-L). */
  morphRadius?: TextFieldMorphRadiusConfig
  /** Config for the chroma border (FX-M). */
  chromaBorder?: TextFieldChromaBorderConfig
}

// --- SelectField -------------------------------------------------------------

export type SelectFieldSize = "sm" | "md" | "lg"

export type SelectFieldSizeConfig = {
  /** Height of the trigger button, e.g. "h-10" */
  height: string
  /** Font size class, e.g. "text-sm" */
  fontSize: string
  /** Left padding of the value text in the trigger, e.g. "pl-3" */
  paddingLeft: string
  /** Width of the chevron column (also acts as right-side spacing), e.g. "w-9" */
  chevronWidth: string
}

export type SelectFieldConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria Select root — must include
   * "group" so child elements can read `group-data-[focused]:` and
   * `group-data-[open]:` selectors.
   */
  root: string
  /** <Label> element classes */
  label: string
  /** Required star indicator (aria-hidden) */
  requiredIndicator: string
  /** Description text rendered below the label */
  description: string
  /** FieldError / errorMessage text */
  error: string
  /**
   * The <Button> element that acts as the visible trigger.
   * Include focus + open state styles via group-data-[focused]: and group-data-[open]:
   */
  trigger: string
  /** Classes for the value text when an item is selected */
  valueText: string
  /** Classes for the placeholder text when nothing is selected */
  placeholder: string
  /**
   * Chevron icon container — fixed width, flex-centered.
   * Include group-data-[open]:rotate-180 for open-state rotation.
   */
  chevron: string
  /** The floating popover panel */
  popover: string
  /** The <ListBox> element inside the popover */
  listBox: string
  /** Base classes for each <ListBoxItem> */
  item: string
  /** Additional classes applied when an item is focused or hovered */
  itemFocused: string
  /** Additional classes applied when an item is selected */
  itemSelected: string
  /** Additional classes applied when an item is disabled */
  itemDisabled: string
  /** <Header> inside a <Section> (option group label) */
  sectionHeader: string
  /** Separator line between groups */
  separator: string
  /** Size variants */
  size: Record<SelectFieldSize, SelectFieldSizeConfig>
  /** Config for the focus glow (FX-C). */
  glow?: TextFieldGlowConfig
  /** Config for the animated gradient border (FX-D). */
  gradientBorder?: TextFieldGradientBorderConfig
  /** Config for the SVG stroke draw (FX-E). */
  svgStroke?: TextFieldSvgStrokeConfig
  /** Config for the ornamental corners / split-line (FX-F). */
  corners?: TextFieldCornersConfig
  /** Config for the background reveal (FX-G). */
  bgReveal?: TextFieldBgRevealConfig
  /** Config for the ripple / pulse effects (FX-H). */
  ripple?: TextFieldRippleConfig
  /** Config for the cursor spotlight (FX-I). */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /** Config for the ink-draw effect (FX-K). */
  inkDraw?: TextFieldInkDrawConfig
  /** Config for the morphing border-radius (FX-L). */
  morphRadius?: TextFieldMorphRadiusConfig
  /** Config for the chroma border (FX-M). */
  chromaBorder?: TextFieldChromaBorderConfig
}

// --- SearchField -------------------------------------------------------------

export type SearchFieldSize = "sm" | "md" | "lg"

export type SearchFieldSizeConfig = {
  /** Height of the input wrapper, e.g. "h-10" */
  height: string
  /** Font size for the input text, e.g. "text-sm" */
  fontSize: string
  /** Left padding when no prefix is present, e.g. "pl-3" */
  paddingLeft: string
  /** Right padding when no suffix/clear is present, e.g. "pr-3" */
  paddingRight: string
  /** Left padding override when a prefix adornment is present, e.g. "pl-9" */
  withPrefix: string
  /** Right padding override when a suffix/clear is present, e.g. "pr-9" */
  withSuffix: string
  /** Width of prefix/suffix adornment columns, e.g. "w-9" */
  adornmentWidth: string
}

export type SearchFieldConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria group root — must include
   * "group" so child elements can read `group-data-[focused]:` etc.
   */
  root: string
  /** <Label> element classes */
  label: string
  /** Required star indicator (aria-hidden) */
  requiredIndicator: string
  /** Description text rendered below the label */
  description: string
  /** FieldError / errorMessage text */
  error: string
  /**
   * Relative container holding prefix + Input + suffix.
   * Border, focus ring, and state styles live here via group-data-[*] selectors.
   */
  inputWrapper: string
  /** The <input> element — fills the wrapper, no border/bg of its own */
  input: string
  /** Prefix/suffix icon or text container (absolute-positioned) */
  adornment: string
  /** The × clear button (absolute-positioned, right side) */
  clearButton: string
  /** Size variants */
  size: Record<SearchFieldSize, SearchFieldSizeConfig>
  /** Config for the focus glow (FX-C). */
  glow?: TextFieldGlowConfig
  /** Config for the animated gradient border (FX-D). */
  gradientBorder?: TextFieldGradientBorderConfig
  /** Config for the SVG stroke draw (FX-E). */
  svgStroke?: TextFieldSvgStrokeConfig
  /** Config for the ornamental corners / split-line (FX-F). */
  corners?: TextFieldCornersConfig
  /** Config for the background reveal (FX-G). */
  bgReveal?: TextFieldBgRevealConfig
  /** Config for the ripple / pulse effects (FX-H). */
  ripple?: TextFieldRippleConfig
  /** Config for the cursor spotlight (FX-I). */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /** Config for the character reveal (FX-J). */
  characterReveal?: TextFieldCharacterRevealConfig
  /** Config for the ink-draw effect (FX-K). */
  inkDraw?: TextFieldInkDrawConfig
  /** Config for the morphing border-radius (FX-L). */
  morphRadius?: TextFieldMorphRadiusConfig
  /** Config for the chroma border (FX-M). */
  chromaBorder?: TextFieldChromaBorderConfig
}

// --- TextField ---------------------------------------------------------------

export type TextFieldSize = "sm" | "md" | "lg"

export type TextFieldSizeConfig = {
  /** Height of the input wrapper, e.g. "h-8" */
  height: string
  /** Font size for the input text, e.g. "text-sm" */
  fontSize: string
  /** Left padding when no prefix is present, e.g. "pl-3" */
  paddingLeft: string
  /** Right padding when no suffix/clear is present, e.g. "pr-3" */
  paddingRight: string
  /** Left padding override when a prefix adornment is present, e.g. "pl-9" */
  withPrefix: string
  /** Right padding override when a suffix/clear is present, e.g. "pr-9" */
  withSuffix: string
  /** Width of prefix/suffix adornment columns, e.g. "w-9" */
  adornmentWidth: string
  /**
   * Left offset of the floating label when no prefix is present. Must be a
   * CSS length (not a Tailwind class) so it can be set as a CSS custom
   * property. Should match the pixel equivalent of `paddingLeft`.
   * e.g. "12px"
   */
  floatingLabelX: string
  /**
   * Left offset of the floating label when a prefix adornment is present.
   * Should match the pixel equivalent of `withPrefix`. e.g. "36px"
   */
  floatingLabelXWithPrefix: string
}

export type TextFieldConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria group root — must include
   * "group" so child elements can read `group-data-[focused]:` etc.
   */
  root: string
  /** <Label> element classes */
  label: string
  /** Required star indicator (aria-hidden) */
  requiredIndicator: string
  /** Description text rendered below the label */
  description: string
  /** FieldError / errorMessage text */
  error: string
  /**
   * Relative container holding prefix + Input + suffix.
   * Border, focus ring, and state styles live here via group-data-[*] selectors.
   */
  inputWrapper: string
  /** The <input> element — fills the wrapper, no border/bg of its own */
  input: string
  /** Prefix/suffix icon or text container (absolute-positioned) */
  adornment: string
  /** The × clear button (absolute-positioned, right side) */
  clearButton: string
  /** Size variants */
  size: Record<TextFieldSize, TextFieldSizeConfig>
  /**
   * Config for the underline bar (FX-A). Optional — omit if not using
   * `variant="underline"`.
   */
  underline?: TextFieldUnderlineConfig
  /**
   * Config for the floating label (FX-B). Optional — omit if not using the
   * `floatingLabel` prop. When present, consumers can still opt out per-field
   * by not passing the `floatingLabel` prop.
   */
  floatingLabel?: TextFieldFloatingLabelConfig
  /**
   * Config for the focus glow (FX-C). Optional — omit if not using the
   * `glow` prop. Additive — works alongside any border style.
   */
  glow?: TextFieldGlowConfig
  /**
   * Config for the animated gradient border (FX-D). Optional — omit if not
   * using the `gradientBorder` prop.
   */
  gradientBorder?: TextFieldGradientBorderConfig
  /**
   * Config for the SVG stroke draw (FX-E). Optional — omit if not using the
   * `svgStroke` prop.
   */
  svgStroke?: TextFieldSvgStrokeConfig
  /**
   * Config for the ink-draw effect (FX-K). Optional — omit if not using the
   * `inkDraw` prop.
   */
  inkDraw?: TextFieldInkDrawConfig
  /**
   * Config for the ornamental corners / split-line (FX-F). Optional — omit if
   * not using the `corners` prop.
   */
  corners?: TextFieldCornersConfig
  /**
   * Config for the character reveal (FX-J). Optional — omit if not using the
   * `characterReveal` prop.
   */
  characterReveal?: TextFieldCharacterRevealConfig
  /**
   * Config for the cursor spotlight (FX-I). Optional — omit if not using the
   * `cursorSpotlight` prop.
   */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /**
   * Config for the background reveal (FX-G). Optional — omit if not using the
   * `bgReveal` prop.
   */
  bgReveal?: TextFieldBgRevealConfig
  /**
   * Config for the ripple / pulse effects (FX-H). Optional — omit if not using
   * the `ripple` prop.
   */
  ripple?: TextFieldRippleConfig
  /**
   * Config for the morphing border-radius (FX-L). Optional — omit if not using
   * the `morphRadius` prop.
   */
  morphRadius?: TextFieldMorphRadiusConfig
  /**
   * Config for the chroma border (FX-M). Optional — omit if not using
   * the `chromaBorder` prop.
   */
  chromaBorder?: TextFieldChromaBorderConfig
}

export type TextFieldFloatingLabelConfig = {
  /** Label colour at rest (inside the input). */
  color: string
  /** Label colour when focused or field has a value. */
  activeColor: string
  /**
   * Background painted behind the label text so it "punches through" the
   * input border when floating above it. Should match the page/surface
   * background behind the field. Use `"transparent"` for underline variant
   * (no border to cover). @default "transparent"
   */
  background?: string
  /**
   * Horizontal padding added each side of the background swatch so it
   * extends a few pixels beyond the label text. CSS length. @default "0"
   */
  backgroundPaddingX?: string
  /** Scale applied to the label in the floated position. @default 0.78 */
  scale?: number
  /** Transition duration in ms. @default 150 */
  duration?: number
}

export type TextFieldGlowConfig = {
  /**
   * `"static"` — a solid-colour blurred halo fades in on focus.
   * `"rotating"` — a conic gradient spins continuously behind the border on focus.
   */
  type: "static" | "rotating"
  /**
   * Static: a single CSS colour, e.g. `"rgba(249, 115, 22, 0.45)"`.
   * Rotating: an array of CSS colour stops for the conic gradient,
   * e.g. `["#f97316", "#ec4899", "#8b5cf6"]`. At least two stops required.
   * The first stop is repeated at the end automatically to form a seamless loop.
   */
  color: string | string[]
  /** Blur radius in px. @default 8 */
  blur?: number
  /** How far the glow extends beyond the inputWrapper on every side, in px. @default 5 */
  spread?: number
  /**
   * Border-radius of the glow layer in px. Should be roughly the
   * inputWrapper's border-radius + spread so the glow rounds to the
   * same shape. @default 10
   */
  radius?: number
  /** Peak opacity of the glow when the field is focused. @default 1 */
  opacity?: number
  /** Fade-in/-out duration in ms. @default 250 */
  duration?: number
  /** Time for one full rotation in seconds (rotating only). @default 4 */
  spinDuration?: number
  /**
   * When `true` (default) the blur is applied to the inner layer and clipped
   * to the glow div — the halo stays tight around the field.
   * When `false` the blur is applied to the glow div itself after clipping,
   * so it bleeds into the surrounding area creating a larger ambient halo.
   * @default true
   */
  contained?: boolean
  /**
   * Background colour painted over the centre of the glow div to prevent the
   * gradient from showing through a semi-transparent inputWrapper (common in
   * dark themes where `bg-white/5` lets the conic gradient bleed through).
   * Should match the page/surface background behind the field.
   * e.g. `"#ffffff"` for light, `"#0f1923"` for NeverChess dark.
   * @default "transparent"
   */
  maskBackground?: string
}

export type TextFieldUnderlineConfig = {
  /** CSS colour for the bar at rest and on focus. e.g. "#f97316" */
  color: string
  /** CSS colour when the field is invalid. e.g. "#ef4444" */
  invalidColor: string
  /** Bar height. e.g. "2px". @default "2px" */
  height?: string
  /** Transition duration in ms. @default 200 */
  duration?: number
}

// --- Tooltip -----------------------------------------------------------------

export type TooltipConfig = {
  /** Tailwind classes for the tooltip bubble: bg, text, padding, radius, shadow. */
  container: string
  /** Tailwind fill class for the arrow SVG — should match the container bg. */
  arrow: string
  /** Pixel gap between the tooltip and its trigger. */
  offset: number
}

// --- Table -------------------------------------------------------------------

export type TableDensity = "compact" | "default" | "comfortable"
export type TableCellType = "text" | "numeric" | "date" | "code" | "action" | "checkbox"

export type TableConfig = {
  container: {
    base: string
    maxHeight: string
    paddingRight: string
  }
  header: {
    base: string
    cell: {
      base: string
      sortable: string
      sorted: string
      padding: string
    }
    sortIcon: {
      unsorted: string
      ascending: string
      descending: string
    }
    resizer: {
      base: string
      handle: string
      hover: string
      dragging: string
      focused: string
    }
  }
  row: {
    base: string
    hover: string
    selected: string
    striped: string
    expanded: string
    disabled: string
  }
  cell: {
    base: string
    focusRing: string
    focusBg: string
    types: Record<TableCellType, string>
  }
  density: Record<TableDensity, {
    paddingX: string
    paddingY: string
    fontSize: string
    rowHeight: string
  }>
  emptyState: string
  skeleton: {
    row: string
    cell: string
  }
  pagination: {
    container: string
    info: string
    controls: string
  }
}

// --- SvgStroke (TextField FX-E) ----------------------------------------------

export type TextFieldSvgStrokeConfig = {
  /** Stroke colour on focus. */
  color: string
  /** Stroke colour when the field is invalid. */
  invalidColor: string
  /** Stroke width in px. @default 1.5 */
  width?: number
  /**
   * Corner radius of the SVG rect in px — should match the inputWrapper's
   * border-radius so the stroke follows the same curve. @default 6
   */
  rx?: number
  /** Duration of the full draw in ms. @default 400 */
  duration?: number
  /** CSS easing for the draw animation. @default "ease-out" */
  easing?: string
  /** Direction the stroke draws itself. @default "clockwise" */
  drawDirection?: "clockwise" | "counterclockwise"
}

// --- CharacterReveal (TextField FX-J) ----------------------------------------

export type TextFieldCharacterRevealConfig = {
  /**
   * Entrance animation applied to each newly typed character.
   * - `"char-fade"`     — opacity 0 → 1
   * - `"char-slide-up"` — slides up 4 px while fading in
   * - `"char-blur"`     — un-blurs while fading in
   */
  variant: "char-fade" | "char-slide-up" | "char-blur"
  /**
   * Colour of the text cursor on the real (transparent) input.
   * Set this to match the visible text colour on the surface.
   * @default "#374151"
   */
  caretColor?: string
  /** Duration of the entrance animation per character in ms. @default 120 */
  duration?: number
  /** CSS easing for the entrance animation. @default "ease-out" */
  easing?: string
}

// --- CursorSpotlight (TextField FX-I) ----------------------------------------

export type TextFieldCursorSpotlightConfig = {
  /**
   * Colour of the radial spotlight gradient.
   * Include alpha — it controls the peak intensity at the cursor position.
   * e.g. `"rgba(249, 115, 22, 0.12)"`.
   */
  color: string
  /**
   * Radius of the gradient circle in px.
   * Controls how far the spotlight spreads from the cursor. @default 80
   */
  radius?: number
  /**
   * Fade-out duration in ms after the pointer leaves the input. @default 300
   */
  fadeOut?: number
}

// --- Ripple / Pulse (TextField FX-H) -----------------------------------------

export type TextFieldRippleConfig = {
  /**
   * Visual style of the effect.
   * - `"ripple"`      — a single elliptical wave expands and fades on each focus. Plays once per focus event.
   * - `"pulse-rings"` — two or more ring outlines expand as a looping aura around the field while it is focused.
   * - `"pulse-bg"`    — the input background colour gently breathes in and out while focused.
   */
  variant: "ripple" | "pulse-rings" | "pulse-bg"
  /**
   * Colour for the ripple wave, ring outline, or background wash.
   * Include alpha — it controls the peak intensity.
   * e.g. `"rgba(249, 115, 22, 0.22)"`.
   */
  color: string
  /**
   * `pulse-rings` only — number of concentric rings to render. @default 2
   */
  ringCount?: number
  /**
   * Duration of one full animation cycle in ms.
   * Defaults: 600 (ripple) | 1500 (pulse-rings) | 2000 (pulse-bg).
   */
  duration?: number
  /**
   * `ripple` and `pulse-rings` only — how far the effect expands as a scale
   * factor relative to the inputWrapper size. @default 2.0 (ripple) | 1.6 (pulse-rings)
   */
  maxScale?: number
  /**
   * Border-radius of the ripple / ring elements in px.
   * Should match the inputWrapper's border-radius. @default 6
   */
  radius?: number
}

// --- ChromaBorder (TextField FX-M) -------------------------------------------

export type TextFieldChromaBorderConfig = {
  /**
   * Animation style:
   * - `"hue-rotate"`  — a gradient border continuously cycles through the colour spectrum via CSS filter.
   * - `"aurora"`      — a northern-lights palette slowly sweeps across the border.
   * - `"iridescent"`  — a tight rainbow gradient flows like holographic foil.
   */
  variant: "hue-rotate" | "aurora" | "iridescent"
  /**
   * Gradient colour stops. When omitted a palette tuned for the variant is used.
   * The first stop is appended at the end automatically to ensure a seamless loop.
   */
  colors?: string[]
  /** Border opacity on focus. @default 0.9 */
  opacity?: number
  /** Border width in px. @default 2 */
  width?: number
  /**
   * Border-radius in px — should match the inputWrapper's computed radius so the
   * chroma ring sits flush with the field edge. @default 6
   */
  radius?: number
  /**
   * Full animation cycle duration in ms.
   * Defaults: `hue-rotate` → 3000, `aurora` → 6000, `iridescent` → 4000.
   */
  duration?: number
  /** Opacity fade-in / fade-out duration in ms. @default 300 */
  fadeIn?: number
}

// --- MorphRadius (TextField FX-L) --------------------------------------------

export type TextFieldMorphRadiusConfig = {
  /**
   * Border-radius applied at rest. Any valid CSS border-radius value.
   * Should match the `rounded-*` class on your inputWrapper so the element
   * doesn't jump on mount. @example "6px"
   */
  rest: string
  /**
   * Border-radius applied on focus. @example "16px" | "9999px" | "2px 16px 16px 2px"
   */
  focus: string
  /** Transition duration in ms. @default 250 */
  duration?: number
  /** CSS easing for the radius transition. @default "ease-out" */
  easing?: string
}

// --- InkDraw (TextField FX-K) ------------------------------------------------

export type TextFieldInkDrawConfig = {
  /** Stroke colour on focus. */
  color: string
  /** Stroke colour when the field is invalid. */
  invalidColor: string
  /** Base stroke width in px — the edge path uses 0.75×, the body path 2×. @default 1.5 */
  strokeWidth?: number
  /**
   * Corner-irregularity in px. The quadratic bezier control points at each
   * corner are nudged outward by this amount, giving the stroke a slightly
   * hand-drawn feel. 0 = perfect rounded rect. @default 2
   */
  wobble?: number
  /**
   * Border-radius in px — should match the inputWrapper's computed
   * border-radius so the path follows the same curve. @default 6
   */
  rx?: number
  /** Draw duration in ms. @default 350 */
  duration?: number
  /**
   * CSS easing — asymmetric by default so the stroke starts fast (the "pen
   * flick") and decelerates as it completes the loop.
   * @default "cubic-bezier(0.2, 0, 0, 1)"
   */
  easing?: string
}

// --- BgReveal (TextField FX-G) -----------------------------------------------

export type TextFieldBgRevealConfig = {
  /**
   * Color of the wash. Must carry its own alpha so the field background and
   * text remain visible beneath it, e.g. `"rgba(249, 115, 22, 0.07)"`.
   */
  color: string
  /**
   * Alternative wash color when the field is invalid. Falls back to `color`
   * if omitted.
   */
  invalidColor?: string
  /**
   * Edge the wash expands from on focus.
   * - `"left"` — slides in from the left (default)
   * - `"right"` — slides in from the right
   * - `"center"` — expands symmetrically outward from the centre
   * @default "left"
   */
  direction?: "left" | "right" | "center"
  /** Transition duration in ms. @default 300 */
  duration?: number
  /** CSS easing function. @default "ease-out" */
  easing?: string
}

// --- Corners (TextField FX-F) ------------------------------------------------

export type TextFieldCornersConfig = {
  /**
   * Visual style of the effect.
   * - `"corners"` — four L-shaped corner brackets that fade in and slide inward on focus.
   * - `"split"`   — a horizontal line that starts overlapping at the centre and
   *                  splits outward to the left/right edges on focus.
   * @default "corners"
   */
  style?: "corners" | "split"
  /** Bracket / line color when focused. */
  color: string
  /** Bracket / line color when the field is invalid. */
  invalidColor: string
  /** Line thickness in px. @default 2 */
  width?: number
  /**
   * `"corners"` only — arm length of each L-bracket in px. @default 10
   */
  length?: number
  /**
   * `"corners"` only — how far each bracket is pushed outward from its corner
   * while unfocused. On focus it slides back inward to `inset`. @default 6
   */
  offset?: number
  /**
   * `"corners"` only — distance the bracket corners sit from the inputWrapper
   * edge (positive = inside the border). @default 4
   */
  inset?: number
  /** Transition duration in ms. @default 300 */
  duration?: number
  /** CSS easing function. @default "ease-out" */
  easing?: string
}

// --- GradientBorder (TextField FX-D) -----------------------------------------

export type TextFieldGradientBorderConfig = {
  /** Colour stops for the flowing gradient. First stop is repeated at the end for a seamless loop. */
  stops: string[]
  /** Alternative stops shown when the field is invalid. Falls back to `stops` if omitted. */
  invalidStops?: string[]
  /** Border width in px. @default 2 */
  width?: number
  /**
   * Border-radius in px. Should match the inputWrapper's computed border-radius so
   * the gradient ring follows the same curve. @default 6
   */
  radius?: number
  /** Duration of one full gradient cycle in seconds. @default 4 */
  duration?: number
  /** Peak opacity when the field is focused (0–1). @default 0.9 */
  opacity?: number
  /** Fade-in / fade-out duration in ms. @default 200 */
  fadeIn?: number
}

// --- GlowBorderButton --------------------------------------------------------

/**
 * Gradient color stops for the animated border and glow.
 * At least two stops required. The first stop is automatically repeated at the
 * end to create a seamless loop.
 *
 * @example ["#f97316", "#ec4899", "#8b5cf6"]
 */
export type GlowBorderButtonColors = {
  stops: string[]
}

/** The animated gradient border ring. */
export type GlowBorderButtonBorder = {
  /** Border thickness in px. Default: 1.5 */
  width: number
  /** Corner radius of the button in px. Default: 12 */
  radius: number
  /** Time for one full gradient cycle, in seconds. Default: 5 */
  duration: number
  /** Overall opacity of the gradient ring (0–1). Default: 0.85 */
  opacity: number
}

/** Blurred halo that sits behind the button and pulses softly. */
export type GlowBorderButtonGlow = {
  /** Blur radius in px. Default: 18 */
  blur: number
  /** Peak opacity reached at the mid-point of the pulse (0–1). Default: 0.175 */
  opacity: number
  /** Pulse cycle duration in seconds. Default: 7.5 */
  duration: number
  /**
   * How far the glow extends behind the button edges in px.
   * Positive = shrinks inward (stays within button bounds).
   * Negative = bleeds outward beyond the button.
   * Default: 4
   */
  inset: number
}

/** Inner surface: the dark area inside the gradient ring. */
export type GlowBorderButtonSurface = {
  /**
   * Background color of the inner surface.
   * Use rgba to keep it translucent for glassmorphism.
   * Default: "rgba(28, 10, 18, 0.92)"
   */
  bg: string
  /** Backdrop-filter blur amount in px. Default: 24 */
  backdropBlur: number
  /** Opacity of the animated color wash over the surface (0–1). Default: 0.4 */
  washOpacity: number
  /** Opacity of the 1px highlight line at the top edge (0–1). Default: 0.12 */
  highlightOpacity: number
  /** Color wash animation duration in seconds. Default: 6 */
  washDuration: number
  /**
   * When true, the inner surface is fully transparent — only the glowing
   * border ring is visible. Uses CSS mask to clip the gradient; `bg`,
   * `backdropBlur`, `washOpacity`, and `highlightOpacity` are ignored.
   * Default: false
   */
  transparent?: boolean
}

/** Typography and spacing for the button label area. */
export type GlowBorderButtonContent = {
  /**
   * Inner padding using CSS shorthand.
   * @example "14px 28px"
   */
  padding: string
  /** Font size in px. Default: 15 */
  fontSize: number
  /** CSS font-weight. Default: 500 */
  fontWeight: number
  /** CSS letter-spacing value. Default: "0.02em" */
  letterSpacing: string
  /** Text and icon color. Default: "#ffffff" */
  color: string
  /** Font stack. Falls back to system fonts if the preferred face is unavailable. */
  fontFamily: string
  /** Gap between icon and label in px. Default: 8 */
  gap: number
}

/** Keyboard focus ring rendered outside the gradient border. */
export type GlowBorderButtonFocus = {
  /** CSS color for the focus outline. Default: "rgba(249, 115, 22, 0.8)" */
  color: string
  /** Outline width in px. Default: 2 */
  width: number
  /** Outline offset from the button edge in px. Default: 3 */
  offset: number
}

export type GlowBorderButtonConfig = {
  colors:  GlowBorderButtonColors
  border:  GlowBorderButtonBorder
  glow:    GlowBorderButtonGlow
  surface: GlowBorderButtonSurface
  content: GlowBorderButtonContent
  focus:   GlowBorderButtonFocus
}

// --- Checkbox ----------------------------------------------------------------

export type CheckboxSize = "sm" | "md" | "lg"

export type CheckboxSizeConfig = {
  /** Size of the checkbox indicator box, e.g. "h-4 w-4" */
  box: string
  /** Font size for the label text, e.g. "text-sm" */
  fontSize: string
  /** Gap between the checkbox and its label, e.g. "gap-2" */
  gap: string
  /** Size of the check / indeterminate icon, e.g. "h-3 w-3" */
  iconSize: string
}

export type CheckboxConfig = {
  /** Root <label> element — flex row container */
  root: string
  /** The visual indicator box — structural classes only (flex, rounded, transition).
   *  Do NOT include bg/border colours here — use boxUnchecked/boxChecked instead,
   *  because cn() is a simple join and conflicting utility classes won't merge. */
  box: string
  /** Appearance when unchecked (border + bg colours) */
  boxUnchecked: string
  /** Appearance when checked (border + bg colours) */
  boxChecked: string
  /** Appearance when indeterminate (border + bg colours) */
  boxIndeterminate: string
  /** Additional classes applied when disabled */
  boxDisabled: string
  /** Additional classes applied when invalid */
  boxInvalid: string
  /** Additional classes applied when keyboard-focused */
  boxFocusVisible: string
  /** The check / minus icon inside the box */
  icon: string
  /** Label text next to the checkbox */
  label: string
  /** Description text below the label */
  description: string
  /** Size variants */
  size: Record<CheckboxSize, CheckboxSizeConfig>
}

// --- CheckboxGroup -----------------------------------------------------------

export type CheckboxGroupConfig = {
  /** Outer group wrapper (flex-col) */
  root: string
  /** Group label */
  label: string
  /** Required star indicator */
  requiredIndicator: string
  /** Description text below the label */
  description: string
  /** Error message text */
  error: string
  /** Container for the checkbox items — controls orientation + spacing */
  items: string
}

// --- RadioGroup --------------------------------------------------------------

export type RadioSize = "sm" | "md" | "lg"

export type RadioSizeConfig = {
  /** Outer circle size, e.g. "h-4 w-4" */
  indicator: string
  /** Inner dot size, e.g. "h-2 w-2" */
  dot: string
  /** Font size for the label text, e.g. "text-sm" */
  fontSize: string
  /** Gap between the indicator and its label, e.g. "gap-2" */
  gap: string
}

export type RadioConfig = {
  /** Root <label> element — flex row container */
  root: string
  /** The visual indicator circle — structural classes only (flex, rounded-full, border, transition).
   *  Do NOT include bg/border colours here — use indicatorUnselected/indicatorSelected instead. */
  indicator: string
  /** Appearance when unselected (border + bg colours) */
  indicatorUnselected: string
  /** Appearance when selected (border + bg colours) */
  indicatorSelected: string
  /** Additional classes applied when disabled */
  indicatorDisabled: string
  /** Additional classes applied when invalid */
  indicatorInvalid: string
  /** Additional classes applied when keyboard-focused */
  indicatorFocusVisible: string
  /** Inner dot — always in DOM, hidden via opacity when unselected */
  dot: string
  /** Label text next to the radio */
  label: string
  /** Description text below the label */
  description: string
  /** Size variants */
  size: Record<RadioSize, RadioSizeConfig>
}

export type RadioGroupConfig = {
  /** Outer group wrapper */
  root: string
  /** Group label */
  label: string
  /** Required star indicator */
  requiredIndicator: string
  /** Description text below the label */
  description: string
  /** Error message text */
  error: string
  /** Container for radio items — vertical orientation */
  items: string
  /** Container for radio items — horizontal orientation */
  itemsHorizontal: string
}

// --- Drawer ------------------------------------------------------------------

export type DrawerSide = "left" | "right" | "top" | "bottom"
export type DrawerSize = "sm" | "md" | "lg" | "full"

export type DrawerConfig = {
  /** Backdrop overlay — full-screen, no centering (panel self-positions) */
  overlay: string
  /** Panel visual — bg, shadow, z-index, outline. No position/inset (applied inline per side). */
  panel: string
  /** Width constraint for left/right drawers */
  horizontal: Record<DrawerSize, string>
  /** Height constraint for top/bottom drawers */
  vertical: Record<DrawerSize, string>
  /** Header row (padding, bottom border) */
  header: string
  /** Drawer title text */
  title: string
  /** X close button */
  closeButton: string
  /** Body section — scrollable content */
  body: string
  /** Footer row (padding, top border, flex) */
  footer: string
}

// --- Dialog ------------------------------------------------------------------

export type DialogSize = "sm" | "md" | "lg" | "full"

export type DialogConfig = {
  /** Backdrop overlay — covers the viewport and centers the panel */
  overlay: string
  /** Modal panel — bg, shadow, flex-col structure.
   *  No radius or max-w here — those live in size so they don't conflict via cn(). */
  panel: string
  /** Per-size max-w, max-h, and border-radius */
  size: Record<DialogSize, string>
  /** Header row (padding, bottom border) */
  header: string
  /** Dialog title text */
  title: string
  /** X close button in the header */
  closeButton: string
  /** Body section — scrollable content */
  body: string
  /** Footer row (padding, top border, flex) */
  footer: string
}

// --- Popover -----------------------------------------------------------------

export type PopoverConfig = {
  /** Popover panel — bg, border, shadow, radius, outline. No padding here —
   *  consumers set content padding via their child element or a wrapper. */
  container: string
  /** Fill + stroke classes for the arrow SVG — should match the container bg
   *  and border respectively. */
  arrow: string
  /** Pixel gap between the popover and its trigger anchor. */
  offset: number
}

// --- Slider ------------------------------------------------------------------

export type SliderSize = "sm" | "md"

export type SliderSizeConfig = {
  /** Track height, e.g. "h-1" */
  trackHeight: string
  /** Thumb dimensions, e.g. "h-4 w-4" */
  thumb: string
  /** Font size for label and output */
  fontSize: string
}

export type SliderConfig = {
  /** Outer flex-col container */
  root: string
  /** Label text */
  label: string
  /** Current value output */
  output: string
  /** Track — structural (rounded-full, cursor-pointer, relative, overflow-visible).
   *  Does NOT include bg colour — use trackUnfilled for that. */
  track: string
  /** Track background when unfilled (full track bg) */
  trackUnfilled: string
  /** Filled portion of the track */
  trackFilled: string
  /** Thumb — includes position helpers (absolute, top-1/2, -translate-y-1/2),
   *  visual (rounded-full, bg-white, border, shadow), and transition. */
  thumb: string
  /** Additional classes when keyboard-focused */
  thumbFocusVisible: string
  /** Additional classes while dragging */
  thumbDragging: string
  /** Description text */
  description: string
  /** Error message text */
  error: string
  /** Size variants */
  size: Record<SliderSize, SliderSizeConfig>
}

// --- Switch ------------------------------------------------------------------

export type SwitchSize = "sm" | "md"

export type SwitchSizeConfig = {
  /** Track pill dimensions, e.g. "w-9 h-5" */
  track: string
  /** Thumb circle dimensions, e.g. "h-4 w-4" */
  thumb: string
  /** CSS transform applied to the thumb when selected, e.g. "translateX(16px)" */
  thumbTranslate: string
  /** Font size for the label text, e.g. "text-sm" */
  fontSize: string
  /** Gap between the track and its label, e.g. "gap-2" */
  gap: string
}

export type SwitchConfig = {
  /** Root <label> element — flex row container */
  root: string
  /** The track pill — structural classes only (rounded-full, flex, items-center, padding, transition).
   *  Do NOT include bg colour here — use trackOff/trackOn instead. */
  track: string
  /** Track background when off */
  trackOff: string
  /** Track background when on */
  trackOn: string
  /** Additional classes applied when disabled */
  trackDisabled: string
  /** Focus ring when keyboard-focused */
  trackFocusVisible: string
  /** The thumb circle — always rendered; structural (rounded-full, bg-white, shadow, transition-transform) */
  thumb: string
  /** Label text */
  label: string
  /** Size variants */
  size: Record<SwitchSize, SwitchSizeConfig>
}

// --- Top-level theme ---------------------------------------------------------

export type ComponentConfigs = {
  button:           ButtonConfig
  checkbox:         CheckboxConfig
  checkboxGroup:    CheckboxGroupConfig
  comboBox:         ComboBoxConfig
  dialog:           DialogConfig
  drawer:           DrawerConfig
  numberField:      NumberFieldConfig
  popover:          PopoverConfig
  radio:            RadioConfig
  radioGroup:       RadioGroupConfig
  searchField:      SearchFieldConfig
  selectField:      SelectFieldConfig
  slider:           SliderConfig
  switch:           SwitchConfig
  textField:        TextFieldConfig
  textArea:         TextAreaConfig
  tooltip:          TooltipConfig
  table:            TableConfig
  glowBorderButton: GlowBorderButtonConfig
}



export type ThemeConfig = {
  tokens: Tokens
  components: ComponentConfigs
}

// DeepPartial — used for override objects so consumers only specify what differs
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? DeepPartial<T[K]>
    : T[K]
}

export type ThemeOverrides = DeepPartial<ThemeConfig>

// =============================================================================
// TextArea
// =============================================================================

export type TextAreaSize = "sm" | "md" | "lg"

export type TextAreaSizeConfig = {
  /** Font-size class (e.g. "text-sm"). */
  fontSize: string
  /**
   * CSS line-height value matching the font-size class.
   * Used for min-height (rows) and max-height (maxRows) calculations.
   * Tailwind text-sm → "1.25rem", text-base → "1.5rem".
   */
  lineHeight: string
  /** Padding classes applied to the <textarea> element itself. */
  padding: string
  /**
   * Numeric vertical padding in px (top + bottom combined). Used to compute
   * min-height and max-height. Should match the CSS value of `padding`.
   * e.g. py-2 = 8px top + 8px bottom → 16
   */
  paddingYPx: number
  /** Default row count when no `rows` prop is supplied. */
  rows: number
}

export type TextAreaConfig = {
  /**
   * Outer flex-col wrapper. Also the React Aria group root — must include
   * `"group"` so child `group-data-*` selectors work.
   */
  root: string
  label: string
  requiredIndicator: string
  description: string
  error: string
  /**
   * Wrapper div that provides the visible border, background, and focus ring.
   * Must include `"relative"` if you plan to add overlay FX in future.
   */
  wrapper: string
  /** The <textarea> element. Should NOT include resize or height classes. */
  textarea: string
  /** Character count when within safe range. */
  charCount: string
  /** Character count when approaching the limit (≥ 85%, < 100%). */
  charCountWarning: string
  /** Character count when at the limit (100%). */
  charCountError: string
  size: Record<TextAreaSize, TextAreaSizeConfig>
  /**
   * Config for the focus glow (FX-C). Optional — omit if not using the
   * `glow` prop. Additive — works alongside any border style.
   */
  glow?: TextFieldGlowConfig
  /**
   * Config for the animated gradient border (FX-D). Optional — omit if not
   * using the `gradientBorder` prop.
   */
  gradientBorder?: TextFieldGradientBorderConfig
  /**
   * Config for the SVG stroke draw (FX-E). Optional — omit if not using the
   * `svgStroke` prop.
   */
  svgStroke?: TextFieldSvgStrokeConfig
  /**
   * Config for the morphing border-radius (FX-L). Optional — omit if not
   * using the `morphRadius` prop.
   */
  morphRadius?: TextFieldMorphRadiusConfig
  /**
   * Config for the chroma border (FX-M). Optional — omit if not using the
   * `chromaBorder` prop.
   */
  chromaBorder?: TextFieldChromaBorderConfig
  /**
   * Config for the background reveal (FX-G). Optional — omit if not using the
   * `bgReveal` prop.
   */
  bgReveal?: TextFieldBgRevealConfig
  /**
   * Config for the ripple / pulse effects (FX-H). Only `pulse-rings` and
   * `pulse-bg` variants apply — `ripple` (click wave) is omitted as it has no
   * natural analogue on a textarea. Optional.
   */
  ripple?: TextFieldRippleConfig
  /**
   * Config for the cursor spotlight (FX-I). Optional — omit if not using the
   * `cursorSpotlight` prop.
   */
  cursorSpotlight?: TextFieldCursorSpotlightConfig
  /**
   * Config for the character reveal (FX-J). Each newly typed character animates
   * in individually. The real textarea's text is hidden via `color: transparent`
   * while an `aria-hidden` overlay renders the characters using `white-space:
   * pre-wrap` to match the textarea's line wrapping. Scroll position is synced
   * from the textarea to the overlay for fixed-height (non-autoResize) usage.
   * Optional — omit if not using the `characterReveal` prop.
   */
  characterReveal?: TextFieldCharacterRevealConfig
  /**
   * Config for the ornamental corners / split-line (FX-F). Optional — omit if
   * not using the `corners` prop.
   */
  corners?: TextFieldCornersConfig
  /**
   * Config for the ink-draw effect (FX-K). Optional — omit if not using the
   * `inkDraw` prop.
   */
  inkDraw?: TextFieldInkDrawConfig
}
