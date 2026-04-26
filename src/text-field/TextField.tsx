"use client";

import * as React from "react";
import {
  TextField as AriaTextField,
  Label,
  Input,
  FieldError,
  Text,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { TextFieldConfig, TextFieldSize } from "../theme/types";
import {
  buildLinearGradient,
  buildConicGradient,
  buildInkPath,
  useGlowStyles,
  useGradientBorderStyles,
  useBgRevealStyles,
  useRippleStyles,
  useCursorSpotlightStyles,
  useCharacterRevealStyles,
  useChromaBorderStyles,
  CHROMA_DEFAULTS,
} from "../utils/fx";

export const defaultTextFieldConfig: TextFieldConfig = defaultTheme.components.textField;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TextFieldProps = {
  config?: TextFieldConfig;
  /** Label text. Omitting it hides the label but it should still be provided
   *  for screen readers via aria-label on the underlying input if omitted. */
  label?: React.ReactNode;
  /** Hint text rendered below the label, above the input. */
  description?: React.ReactNode;
  /** Size variant. @default "md" */
  size?: TextFieldSize;
  /** Icon or short text rendered before the input (inside the border). */
  prefix?: React.ReactNode;
  /** Icon or short text rendered after the input (inside the border).
   *  Hidden when isClearable is true and the field has a value. */
  suffix?: React.ReactNode;
  /** Shows a × button to clear the field when it has a value. */
  isClearable?: boolean;
  /**
   * Border / frame variant. Mutually exclusive — pick one per field.
   * - `"underline"` — replaces the box border with an animated bottom bar
   *
   * When using `"underline"`, set `inputWrapper` in config to use only a
   * bottom border (e.g. `border-b border-neutral-300`) and remove `rounded-*`.
   *
   * Future variants (glow, gradient-border, svg-stroke, …) will be added here.
   */
  variant?: "underline";
  /**
   * Expand direction for the `"underline"` variant.
   * - `"left"` — bar grows left → right
   * - `"right"` — bar grows right → left
   * - `"center"` — bar grows outward from the centre
   * - `"dual-left"` — top and bottom bars both grow left → right
   * - `"dual-right"` — top and bottom bars both grow right → left
   * - `"dual-center"` — top and bottom bars both grow outward from centre
   *
   * Omit (or don't set) for a static bar with no animation.
   * Ignored when `variant` is not `"underline"`.
   */
  animation?: "left" | "right" | "center" | "dual-left" | "dual-right" | "dual-center";
  /**
   * Native input placeholder. Passed to the inner <Input> element because
   * React Aria's TextFieldProps does not include input-level HTML attributes.
   */
  placeholder?: string;
  /**
   * Native input type (text, email, password, search, url, tel…).
   * @default "text"
   */
  type?: React.HTMLInputTypeAttribute;
  /**
   * Error message shown below the field when isInvalid is true.
   * Passed through to React Aria's FieldError component.
   */
  errorMessage?: React.ReactNode;
  /**
   * Enables the floating label pattern (FX-B). The label starts inside the
   * input at rest and lifts above the border on focus or when the field has
   * a value. Requires `config.floatingLabel` to be set for colours and scale.
   */
  floatingLabel?: boolean;
  /**
   * Enables the focus glow effect (FX-C). A blurred halo appears behind the
   * border on focus. Additive — works with any `variant` and `floatingLabel`.
   * Requires `config.glow` to be set for colour, blur, and spin options.
   */
  glow?: boolean;
  /**
   * Enables the animated gradient border (FX-D). A flowing conic-gradient ring
   * replaces the plain focus border, fading in on focus and out on blur.
   * Requires `config.gradientBorder` to be set for colours and timing.
   * Tip: remove the default `group-data-[focused]:border-*` and `ring-*` classes
   * from `config.inputWrapper` so the gradient ring is the sole focus indicator.
   */
  gradientBorder?: boolean;
  /**
   * Enables the SVG stroke draw (FX-E). An SVG rect traces itself around the
   * input perimeter on focus using stroke-dashoffset animation.
   * Requires `config.svgStroke` to be set for colour and timing.
   * Tip: remove the default focus border classes from `config.inputWrapper`.
   */
  svgStroke?: boolean;
  /**
   * Enables the ink-draw effect (FX-K). An SVG path traces a slightly
   * irregular rounded rect around the input on focus using a two-layer stroke
   * (thick body at low opacity + thin edge at full opacity) and asymmetric
   * easing for a calligraphic "pen flick" feel.
   * Requires `config.inkDraw` to be set.
   */
  inkDraw?: boolean;
  /**
   * Enables the ornamental corners / split-line (FX-F). Four L-shaped corner
   * brackets close inward on focus (`config.corners.style = "corners"`), or a
   * horizontal line splits outward from the centre (`style = "split"`).
   * Requires `config.corners` to be set. Works alongside any variant.
   */
  corners?: boolean;
  /**
   * Enables the character reveal effect (FX-J). Each newly typed character
   * animates in individually. The real input's text is hidden via
   * `color: transparent` while an `aria-hidden` overlay renders the characters.
   * Variant is selected via `config.characterReveal.variant`.
   * Requires `config.characterReveal` to be set.
   * Passwords render as `•` characters in the overlay.
   * Automatically disabled when prefers-reduced-motion is set.
   */
  characterReveal?: boolean;
  /**
   * Enables the cursor spotlight (FX-I). A soft radial gradient follows the
   * pointer position inside the input in real-time. Updates are applied directly
   * to the DOM — no React re-renders on pointer movement.
   * Requires `config.cursorSpotlight` to be set for colour and radius.
   * Automatically disabled on touch devices and when prefers-reduced-motion is set.
   */
  cursorSpotlight?: boolean;
  /**
   * Enables the background colour reveal (FX-G). A translucent wash slides in
   * behind the input content on focus, expanding from the configured direction.
   * Requires `config.bgReveal` to be set for colour and timing.
   */
  bgReveal?: boolean;
  /**
   * Enables the ripple / pulse effect (FX-H). The active variant is selected
   * via `config.ripple.variant`:
   * - `"ripple"`      — a wave expands once per focus event (clipped to the input boundary).
   * - `"pulse-rings"` — ring outlines expand as a looping aura around the field.
   * - `"pulse-bg"`    — the input background colour breathes softly while focused.
   * Requires `config.ripple` to be set.
   */
  ripple?: boolean;
  /**
   * Enables the morphing border-radius effect (FX-L). The inputWrapper's
   * border-radius transitions between `config.morphRadius.rest` and
   * `config.morphRadius.focus` on focus/blur. Accepts any valid CSS
   * border-radius string — use "9999px" for pill, or asymmetric values like
   * "2px 16px 16px 2px" for creative shapes.
   * Requires `config.morphRadius` to be set.
   */
  morphRadius?: boolean;
  /**
   * Enables the chroma border effect (FX-M). An animated gradient ring appears
   * around the field on focus. Variant is selected via `config.chromaBorder.variant`:
   * - `"hue-rotate"`  — gradient cycles through the full colour spectrum.
   * - `"aurora"`      — northern-lights palette sweeps slowly across the border.
   * - `"iridescent"`  — tight rainbow flows like holographic foil.
   * Requires `config.chromaBorder` to be set.
   */
  chromaBorder?: boolean;
} & Omit<AriaTextFieldProps, "className" | "style">;

// ---------------------------------------------------------------------------
// Underline animation styles (injected once per app)
//
// CSS custom properties on the root element drive per-instance values:
//   --tf-ul-color         bar colour
//   --tf-ul-invalid-color bar colour when field is invalid
//   --tf-ul-height        bar thickness
//   --tf-ul-dur           transition duration
// ---------------------------------------------------------------------------

const UNDERLINE_STYLES = `
  .mr-tf-underline {
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--tf-ul-height, 1px);
    background: var(--tf-ul-color, #94a3b8);
    transform: scaleX(0);
    transition: transform var(--tf-ul-dur, 200ms) ease-out;
  }
  .mr-tf-ul-left   { transform-origin: left;   }
  .mr-tf-ul-right  { transform-origin: right;  }
  .mr-tf-ul-center { transform-origin: center; }
  .mr-tf-ul-static { transform: scaleX(1); transition: none; }
  .group[data-focused]  .mr-tf-underline { transform: scaleX(1); }
  .group[data-invalid]  .mr-tf-underline { background: var(--tf-ul-invalid-color, #f87171); }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-underline { transition: none; }
  }
`;

let underlineStylesInjected = false;

function useUnderlineStyles() {
  React.useInsertionEffect(() => {
    if (underlineStylesInjected) return;
    underlineStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-underline", "");
    el.textContent = UNDERLINE_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Floating label styles (injected once per app)
//
// CSS custom properties on the root element drive per-instance values:
//   --tf-fl-color         label colour at rest
//   --tf-fl-active-color  label colour when focused / has value
//   --tf-fl-bg            background swatch colour (covers border when floating)
//   --tf-fl-bg-px         horizontal padding on the background swatch
//   --tf-fl-scale         scale factor in the floated position
//   --tf-fl-dur           transition duration
//   --tf-fl-x             left offset (set per-render based on size + prefix)
// ---------------------------------------------------------------------------

const FLOATING_LABEL_STYLES = `
  .mr-tf-fl {
    position: absolute;
    pointer-events: none;
    left: var(--tf-fl-x, 12px);
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
    color: var(--tf-fl-color, #9ca3af);
    line-height: 1;
    white-space: nowrap;
    background: transparent;
    padding: 0 var(--tf-fl-bg-px, 0);
    z-index: 1;
    transition: top var(--tf-fl-dur, 150ms) ease-out,
                transform var(--tf-fl-dur, 150ms) ease-out,
                color var(--tf-fl-dur, 150ms) ease-out,
                background-color var(--tf-fl-dur, 150ms) ease-out;
  }
  .group[data-focused] .mr-tf-fl,
  .group[data-has-value] .mr-tf-fl {
    top: 0;
    transform: translateY(calc(-100% - 2px)) scale(var(--tf-fl-scale, 0.78));
    color: var(--tf-fl-active-color, #f97316);
    background: var(--tf-fl-bg, transparent);
  }
  .mr-tf-fl-input::placeholder {
    opacity: 0;
    transition: opacity var(--tf-fl-dur, 150ms) ease-out;
  }
  .group[data-focused] .mr-tf-fl-input::placeholder,
  .group[data-has-value] .mr-tf-fl-input::placeholder {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-fl { transition: color var(--tf-fl-dur, 150ms) ease-out; }
    .mr-tf-fl-input::placeholder { transition: none; }
  }
`;

let floatingLabelStylesInjected = false;

function useFloatingLabelStyles() {
  React.useInsertionEffect(() => {
    if (floatingLabelStylesInjected) return;
    floatingLabelStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-fl", "");
    el.textContent = FLOATING_LABEL_STYLES;
    document.head.appendChild(el);
  }, []);
}

// (FX-C through FX-M helpers imported from ../utils/fx)
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Internal icon
// ---------------------------------------------------------------------------

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ width: 12, height: 12, display: "block" }}
    >
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function UnderlineBar({
  origin,
  top,
  isStatic,
}: {
  origin: "left" | "right" | "center";
  top?: boolean;
  isStatic?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`mr-tf-underline mr-tf-ul-${origin}${isStatic ? " mr-tf-ul-static" : ""}`}
      style={top ? { top: 0 } : { bottom: 0 }}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TextField({
  config = defaultTextFieldConfig,
  label,
  description,
  size = "md",
  prefix,
  suffix,
  isClearable = false,
  variant,
  animation,
  floatingLabel = false,
  glow = false,
  gradientBorder = false,
  svgStroke = false,
  inkDraw = false,
  corners = false,
  characterReveal = false,
  cursorSpotlight = false,
  bgReveal = false,
  ripple = false,
  morphRadius = false,
  chromaBorder = false,
  isRequired,
  isInvalid,
  placeholder,
  type,
  errorMessage,
  value,
  defaultValue,
  onChange,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}: TextFieldProps) {
  const sizeConfig = config.size[size];

  useUnderlineStyles();
  useFloatingLabelStyles();
  useGlowStyles();
  useGradientBorderStyles();
  useCharacterRevealStyles();
  useCursorSpotlightStyles();
  useBgRevealStyles();
  useRippleStyles();
  useChromaBorderStyles();

  // Track focus-within ourselves so we can stamp data-focused on the root.
  // React Aria only sets data-focused on the <Input>, not the wrapping div.
  // The existing Tailwind group-data-[focused]: selectors depend on the root
  // having this attribute.
  const [focusWithin, setFocusWithin] = React.useState(false);

  const handleFocus = React.useCallback(
    (e: React.FocusEvent) => {
      setFocusWithin(true);
      onFocusProp?.(e as never);
    },
    [onFocusProp],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent) => {
      // Keep focused state if focus is moving to another element inside the
      // root (e.g., input → clear button).
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      setFocusWithin(false);
      onBlurProp?.(e as never);
    },
    [onBlurProp],
  );

  // Track value internally so we can show/hide the clear button in both
  // controlled and uncontrolled usage.
  const [internalValue, setInternalValue] = React.useState<string>(
    value ?? defaultValue ?? ""
  );

  // Sync with controlled `value` prop when it changes externally.
  React.useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
  };

  // Show clear button only when clearable and there is something to clear.
  const showClear = isClearable && internalValue.length > 0;
  // Suffix slot is visible when there is a suffix AND we are not showing clear.
  const showSuffix = suffix != null && !showClear;
  const hasRightAdornment = showClear || showSuffix;

  const isUnderline = variant === "underline";

  // SVG stroke (FX-E) — measure the outer wrapper so the rect can use pixel
  // coordinates. ResizeObserver keeps it accurate when the container resizes.
  const outerWrapperRef = React.useRef<HTMLDivElement>(null);
  // w === 0 means "not yet measured". The SVG rect is withheld until after the
  // first ResizeObserver callback (guarded by svgSize.w > 0 below) so the rect
  // is inserted with a correct dashoffset from the start and has no previous
  // value to transition from — preventing the mount flash caused by an arbitrary
  // initial perimeter cycling through visible stroke positions.
  const [svgSize, setSvgSize] = React.useState({ w: 0, h: 0, perimeter: 0 });

  // Character reveal (FX-J) — track previous value to identify newly typed chars.
  // prevValueRef holds the value from the last render. newCharStart is the index
  // at which newly typed characters begin; chars at indices >= newCharStart get
  // the entrance animation class. The ref is updated after every render via
  // useEffect so the comparison is always against the prior committed value.
  const prevValueRef = React.useRef<string>(internalValue);
  const prevValue = prevValueRef.current;
  const newCharStart = internalValue.length > prevValue.length
    ? prevValue.length
    : internalValue.length; // no new chars when value shrank (deletion / replace)

  React.useEffect(() => {
    prevValueRef.current = internalValue;
  });

  // Cursor spotlight (FX-I) — ref to the layer div so pointer handlers can
  // update its CSS custom properties and opacity directly, skipping React renders.
  const spotlightLayerRef = React.useRef<HTMLDivElement>(null);

  const handleSpotlightMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const layer = spotlightLayerRef.current;
    if (!layer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    layer.style.setProperty("--tf-cs-x", `${Math.round(e.clientX - rect.left)}px`);
    layer.style.setProperty("--tf-cs-y", `${Math.round(e.clientY - rect.top)}px`);
    layer.style.opacity = "1";
  };

  const handleSpotlightLeave = () => {
    const layer = spotlightLayerRef.current;
    if (!layer) return;
    layer.style.opacity = "0";
  };

  // FX-L: morph border-radius on focus. Inline style wins over Tailwind's
  // rounded-* class. The transition also re-declares border-color and
  // box-shadow so those keep animating (same values Tailwind uses by default).
  const morphRadiusStyle: React.CSSProperties | undefined =
    morphRadius && config.morphRadius
      ? {
          borderRadius: focusWithin
            ? config.morphRadius.focus
            : config.morphRadius.rest,
          transition: [
            "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            `border-radius ${config.morphRadius.duration ?? 250}ms ${config.morphRadius.easing ?? "ease-out"}`,
          ].join(", "),
        }
      : undefined;

  React.useEffect(() => {
    // Both FX-E (svgStroke) and FX-K (inkDraw) share this size measurement.
    if ((!svgStroke || !config.svgStroke) && (!inkDraw || !config.inkDraw)) return;
    if (typeof ResizeObserver === "undefined") return;
    const el = outerWrapperRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setSvgSize({ w: width, h: height, perimeter: 2 * (width + height) });
      }
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [svgStroke, config.svgStroke, inkDraw, config.inkDraw]);

  return (
    <AriaTextField
      {...props}
      value={internalValue}
      onChange={handleChange}
      {...(isRequired !== undefined ? { isRequired } : {})}
      {...(isInvalid !== undefined ? { isInvalid } : {})}
      className={cn(config.root)}
      data-focused={focusWithin || undefined}
      data-has-value={internalValue.length > 0 || undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        ...(isUnderline && config.underline ? {
          "--tf-ul-color":         config.underline.color,
          "--tf-ul-invalid-color": config.underline.invalidColor,
          "--tf-ul-dur":           `${config.underline.duration ?? 200}ms`,
          "--tf-ul-height":        config.underline.height ?? "1px",
        } : {}),
        ...(floatingLabel && config.floatingLabel ? {
          "--tf-fl-color":        config.floatingLabel.color,
          "--tf-fl-active-color": config.floatingLabel.activeColor,
          "--tf-fl-bg":           config.floatingLabel.background ?? "transparent",
          "--tf-fl-bg-px":        config.floatingLabel.backgroundPaddingX ?? "0",
          "--tf-fl-scale":        config.floatingLabel.scale ?? 0.78,
          "--tf-fl-dur":          `${config.floatingLabel.duration ?? 150}ms`,
          "--tf-fl-x":            prefix != null
                                    ? sizeConfig.floatingLabelXWithPrefix
                                    : sizeConfig.floatingLabelX,
        } : {}),
        ...(glow && config.glow ? {
          "--tf-gw-spread":   `${config.glow.spread ?? 5}px`,
          "--tf-gw-radius":   `${config.glow.radius ?? 10}px`,
          "--tf-gw-blur":     `${config.glow.blur ?? 8}px`,
          "--tf-gw-dur":      `${config.glow.duration ?? 250}ms`,
          "--tf-gw-opacity":  config.glow.opacity ?? 1,
          "--tf-gw-mask-bg":  config.glow.maskBackground ?? "transparent",
          ...(config.glow.type === "static"
            ? { "--tf-gw-color": config.glow.color as string }
            : { "--tf-gw-spin-dur": `${config.glow.spinDuration ?? 4}s` }),
        } : {}),
        ...(bgReveal && config.bgReveal ? {
          "--tf-bgr-color":         config.bgReveal.color,
          "--tf-bgr-invalid-color": config.bgReveal.invalidColor ?? config.bgReveal.color,
          "--tf-bgr-x":             config.bgReveal.direction === "right"  ? "right"
                                  : config.bgReveal.direction === "center" ? "center"
                                  : "left",
          "--tf-bgr-dur":           `${config.bgReveal.duration ?? 300}ms`,
        } : {}),
        ...(characterReveal && config.characterReveal ? {
          "--tf-cr-caret": config.characterReveal.caretColor ?? "#374151",
          "--tf-cr-dur":   `${config.characterReveal.duration ?? 120}ms`,
          "--tf-cr-ease":  config.characterReveal.easing ?? "ease-out",
        } : {}),
        ...(cursorSpotlight && config.cursorSpotlight ? {
          "--tf-cs-color":  config.cursorSpotlight.color,
          "--tf-cs-radius": `${config.cursorSpotlight.radius ?? 80}px`,
          "--tf-cs-fade":   `${config.cursorSpotlight.fadeOut ?? 300}ms`,
        } : {}),
        ...(ripple && config.ripple ? {
          "--tf-rp-color":     config.ripple.color,
          "--tf-rp-max-scale": config.ripple.maxScale ?? (config.ripple.variant === "pulse-rings" ? 1.2 : 2.0),
          "--tf-rp-radius":    `${config.ripple.radius ?? 6}px`,
          "--tf-rp-dur":       `${config.ripple.duration ?? (
            config.ripple.variant === "pulse-rings" ? 1500 :
            config.ripple.variant === "pulse-bg"    ? 2000 : 600
          )}ms`,
        } : {}),
      } as React.CSSProperties}
    >
      {/* Standard label — rendered above the input when not using floatingLabel */}
      {label != null && !floatingLabel && (
        <Label className={cn(config.label)}>
          {label}
          {isRequired && (
            <span aria-hidden="true" className={config.requiredIndicator}>
              {" *"}
            </span>
          )}
        </Label>
      )}

      {/*
        Input row wrapper.
        When floatingLabel is true we wrap in an extra relative div so the
        Label can be positioned relative to the outer div rather than the
        inputWrapper — this lets it escape the inputWrapper's overflow-hidden.
      */}
      <div
        ref={outerWrapperRef}
        style={(floatingLabel || (glow && config.glow) || (gradientBorder && config.gradientBorder) || (svgStroke && config.svgStroke) || (inkDraw && config.inkDraw) || (corners && config.corners) || (ripple && config.ripple) || (chromaBorder && config.chromaBorder)) ? { position: "relative", isolation: "isolate" } : undefined}
      >
        {gradientBorder && config.gradientBorder && (() => {
          const gb = config.gradientBorder!;
          const stops = isInvalid && gb.invalidStops ? gb.invalidStops : gb.stops;
          return (
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                border:        `${gb.width ?? 2}px solid transparent`,
                borderRadius:  gb.radius ?? 6,
                pointerEvents: "none",
                zIndex:        1,
                // Gradient
                backgroundImage: buildLinearGradient(stops),
                backgroundSize:  "400% 100%",
                // Opacity fades in/out with focus
                opacity:    focusWithin ? (gb.opacity ?? 0.9) : 0,
                transition: `opacity ${gb.fadeIn ?? 200}ms ease-out`,
                // Animation only runs while focused
                animation:          `mr-tf-gb-flow ${gb.duration ?? 4}s linear infinite`,
                animationPlayState: focusWithin ? "running" : "paused",
                // Annulus mask: border-box minus padding-box = just the ring
                WebkitMaskImage:     "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                WebkitMaskClip:      "border-box, padding-box",
                WebkitMaskComposite: "destination-out",
                maskImage:           "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                maskClip:            "border-box, padding-box",
                maskComposite:       "exclude",
              } as React.CSSProperties}
            />
          );
        })()}

        {chromaBorder && config.chromaBorder && (() => {
          const cb = config.chromaBorder!;
          const variant  = cb.variant;
          const width    = cb.width   ?? 2;
          const radius   = cb.radius  ?? 6;
          const opacity  = cb.opacity ?? 0.9;
          const fadeIn   = cb.fadeIn  ?? 300;
          const duration = cb.duration ?? (
            variant === "hue-rotate" ? 3000 : variant === "aurora" ? 6000 : 4000
          );
          const colors  = cb.colors ?? CHROMA_DEFAULTS[variant] ?? CHROMA_DEFAULTS["hue-rotate"]!;
          const bgImage = buildLinearGradient(colors);
          const isFlow  = variant !== "hue-rotate";
          return (
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                border:        `${width}px solid transparent`,
                borderRadius:  radius,
                pointerEvents: "none",
                zIndex:        1,
                backgroundImage: bgImage,
                backgroundSize:  isFlow ? "300% 100%" : "100% 100%",
                opacity:    focusWithin ? opacity : 0,
                transition: `opacity ${fadeIn}ms ease-out`,
                animation:  isFlow
                  ? `mr-tf-cb-flow ${duration}ms ease-in-out infinite`
                  : `mr-tf-cb-hue ${duration}ms linear infinite`,
                animationPlayState: focusWithin ? "running" : "paused",
                WebkitMaskImage:     "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                WebkitMaskClip:      "border-box, padding-box",
                WebkitMaskComposite: "destination-out",
                maskImage:           "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
                maskClip:            "border-box, padding-box",
                maskComposite:       "exclude",
              } as React.CSSProperties}
            />
          );
        })()}

        {svgStroke && config.svgStroke && svgSize.w > 0 && (() => {
          const ss = config.svgStroke!;
          const strokeColor = isInvalid ? ss.invalidColor : ss.color;
          const strokeWidth = ss.width ?? 1.5;
          const hw = strokeWidth / 2;
          const duration = ss.duration ?? 400;
          const easing = ss.easing ?? "ease-out";
          const ccw = ss.drawDirection === "counterclockwise";
          const { w, h, perimeter } = svgSize;
          // dashoffset at rest = ±perimeter (stroke fully hidden)
          // dashoffset on focus = 0 (stroke fully drawn)
          const dashOffset = focusWithin ? 0 : ccw ? -perimeter : perimeter;
          return (
            <svg
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                width:         "100%",
                height:        "100%",
                pointerEvents: "none",
                zIndex:        1,
                overflow:      "visible",
              }}
            >
              <rect
                x={hw}
                y={hw}
                width={Math.max(0, w - strokeWidth)}
                height={Math.max(0, h - strokeWidth)}
                rx={ss.rx ?? 6}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={perimeter}
                strokeDashoffset={dashOffset}
                style={{
                  transition: `stroke-dashoffset ${duration}ms ${easing}, stroke ${Math.round(duration * 0.4)}ms ease-out`,
                }}
              />
            </svg>
          );
        })()}

        {inkDraw && config.inkDraw && svgSize.w > 0 && (() => {
          const id = config.inkDraw!;
          const strokeColor = isInvalid ? id.invalidColor : id.color;
          const strokeWidth = id.strokeWidth ?? 1.5;
          const wobble = id.wobble ?? 2;
          const rx = id.rx ?? 6;
          const duration = id.duration ?? 350;
          const easing = id.easing ?? "cubic-bezier(0.2, 0, 0, 1)";
          const { w, h, perimeter } = svgSize;
          const pathD = buildInkPath(w, h, rx, wobble);
          const dashOffset = focusWithin ? 0 : perimeter;
          const colorDur = Math.round(duration * 0.3);
          const transition = `stroke-dashoffset ${duration}ms ${easing}, stroke ${colorDur}ms ease-out`;
          const svgRotation = `rotate(${(wobble * 0.15).toFixed(2)}deg)`;
          return (
            <svg
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
                overflow: "visible",
                transform: svgRotation,
                transformOrigin: "center",
              }}
            >
              {/* Body: thicker, lower opacity — simulates ink spread/bleed */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth * 2}
                strokeOpacity={0.22}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={perimeter}
                strokeDashoffset={dashOffset}
                style={{ transition }}
              />
              {/* Edge: thinner, full opacity — the sharp ink line */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth * 0.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={perimeter}
                strokeDashoffset={dashOffset}
                style={{ transition }}
              />
            </svg>
          );
        })()}

        {corners && config.corners && (() => {
          const cc = config.corners!;
          const style = cc.style ?? "corners";
          const strokeColor = isInvalid ? cc.invalidColor : cc.color;
          const lineWidth = cc.width ?? 2;
          const duration = cc.duration ?? 300;
          const easing = cc.easing ?? "ease-out";
          const colorDur = Math.round(duration * 0.4);

          if (style === "corners") {
            const length = cc.length ?? 10;
            const offset = cc.offset ?? 6;
            const inset = cc.inset ?? 4;
            const border = `${lineWidth}px solid ${strokeColor}`;
            // At rest: scale(0) makes the bracket pixel-invisible without using
            // opacity, avoiding the browser's initial-mount transition artifact
            // where a new element briefly flashes from opacity:1 → 0.
            // The translate slides the bracket outward so it "closes inward" on
            // focus as it scales up — matching the spec description.
            const base: React.CSSProperties = {
              position: "absolute",
              width: length,
              height: length,
              pointerEvents: "none",
              zIndex: 2,
              transition: `transform ${duration}ms ${easing}, border-color ${colorDur}ms ease-out`,
            };
            const focused = "translate(0, 0) scale(1)";
            return (
              <>
                {/* Top-left */}
                <div aria-hidden="true" style={{ ...base, top: inset, left: inset, borderTop: border, borderLeft: border, transformOrigin: "top left", transform: focusWithin ? focused : `translate(${-offset}px, ${-offset}px) scale(0)` }} />
                {/* Top-right */}
                <div aria-hidden="true" style={{ ...base, top: inset, right: inset, borderTop: border, borderRight: border, transformOrigin: "top right", transform: focusWithin ? focused : `translate(${offset}px, ${-offset}px) scale(0)` }} />
                {/* Bottom-left */}
                <div aria-hidden="true" style={{ ...base, bottom: inset, left: inset, borderBottom: border, borderLeft: border, transformOrigin: "bottom left", transform: focusWithin ? focused : `translate(${-offset}px, ${offset}px) scale(0)` }} />
                {/* Bottom-right */}
                <div aria-hidden="true" style={{ ...base, bottom: inset, right: inset, borderBottom: border, borderRight: border, transformOrigin: "bottom right", transform: focusWithin ? focused : `translate(${offset}px, ${offset}px) scale(0)` }} />
              </>
            );
          }

          // style === "split": two halves grow outward from center along the bottom edge.
          // scaleX(0) hides both halves without opacity, avoiding the initial-mount
          // transition flash that opacity:0 can trigger on some browsers.
          const splitBase: React.CSSProperties = {
            position: "absolute",
            bottom: 0,
            width: "50%",
            height: lineWidth,
            background: strokeColor,
            pointerEvents: "none",
            zIndex: 2,
            transition: `transform ${duration}ms ${easing}, background-color ${colorDur}ms ease-out`,
          };
          return (
            <>
              {/* Left half — grows from center toward left */}
              <div aria-hidden="true" style={{ ...splitBase, left: 0, transformOrigin: "right center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
              {/* Right half — grows from center toward right */}
              <div aria-hidden="true" style={{ ...splitBase, right: 0, transformOrigin: "left center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
            </>
          );
        })()}

        {ripple && config.ripple && config.ripple.variant === "pulse-rings" && (() => {
          const rc = config.ripple!;
          const ringCount = rc.ringCount ?? 2;
          const duration = rc.duration ?? 1500;
          return Array.from({ length: ringCount }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="mr-tf-pulse-ring"
              style={{ animationDelay: `${Math.round(duration * (i / ringCount))}ms` }}
            />
          ));
        })()}

        {glow && config.glow && (
          config.glow.contained === false ? (
            // Body glow: outer wrapper carries the filter (bleeds into page),
            // inner clip box carries overflow:hidden (tames the rotating layer).
            <div className="mr-tf-glow-body-wrapper">
              <div className="mr-tf-glow-body-clip">
                {config.glow.type === "rotating" ? (
                  <div
                    className="mr-tf-glow-layer mr-tf-glow-layer-rotating"
                    style={{ background: buildConicGradient(config.glow.color as string[]) }}
                  />
                ) : (
                  <div className="mr-tf-glow-layer" />
                )}
                <div className="mr-tf-glow-mask" />
              </div>
            </div>
          ) : (
            // Contained glow: single div, blur clipped to the glow div bounds.
            <div className="mr-tf-glow">
              {config.glow.type === "rotating" ? (
                <div
                  className="mr-tf-glow-layer mr-tf-glow-layer-rotating"
                  style={{ background: buildConicGradient(config.glow.color as string[]) }}
                />
              ) : (
                <div className="mr-tf-glow-layer" />
              )}
              <div className="mr-tf-glow-mask" />
            </div>
          )
        )}

        {floatingLabel && label != null && (
          <Label className={cn("mr-tf-fl", config.label)}>
            {label}
            {isRequired && (
              <span aria-hidden="true" className={config.requiredIndicator}>
                {" *"}
              </span>
            )}
          </Label>
        )}

        {/* Input row: prefix | input | suffix / clear */}
        <div
          className={cn(
            config.inputWrapper,
            sizeConfig.height,
            bgReveal && config.bgReveal && "mr-tf-bgr",
            corners && config.corners && "group-data-[focused]:!border-transparent group-data-[focused]:!ring-0 group-data-[focused]:!shadow-none",
          )}
          style={morphRadiusStyle}
          onPointerMove={cursorSpotlight && config.cursorSpotlight ? handleSpotlightMove : undefined}
          onPointerLeave={cursorSpotlight && config.cursorSpotlight ? handleSpotlightLeave : undefined}
        >
          {/* FX-I cursor spotlight — position updated imperatively, zero re-renders */}
          {cursorSpotlight && config.cursorSpotlight && (
            <div ref={spotlightLayerRef} aria-hidden="true" className="mr-tf-spotlight" />
          )}

          {/* FX-J character reveal overlay — aria-hidden, real input is transparent */}
          {characterReveal && config.characterReveal && (() => {
            const cr = config.characterReveal!;
            const variantSuffix = cr.variant.replace("char-", ""); // "fade" | "slide-up" | "blur"
            const animClass = `mr-tf-char-new-${variantSuffix}`;
            // Password fields render bullet chars; other types render actual characters.
            const chars = type === "password"
              ? Array.from({ length: internalValue.length }, () => "\u2022")
              : Array.from(internalValue);
            return (
              <div
                aria-hidden="true"
                className={cn(
                  config.input,
                  sizeConfig.fontSize,
                  prefix != null ? sizeConfig.withPrefix : sizeConfig.paddingLeft,
                  hasRightAdornment ? sizeConfig.withSuffix : sizeConfig.paddingRight,
                )}
                style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", overflow: "hidden", pointerEvents: "none", userSelect: "none", whiteSpace: "pre" }}
              >
                {chars.map((char, i) => (
                  <span key={i} className={i >= newCharStart ? animClass : undefined}>
                    {char}
                  </span>
                ))}
              </div>
            );
          })()}

          {/* FX-H ripple — mounts fresh on each focus so the animation replays */}
          {ripple && config.ripple && config.ripple.variant === "ripple" && focusWithin && (
            <div aria-hidden="true" className="mr-tf-ripple-wave" />
          )}
          {/* FX-H pulse-bg — always in DOM, animated by group-data-[focused] */}
          {ripple && config.ripple && config.ripple.variant === "pulse-bg" && (
            <div aria-hidden="true" className="mr-tf-pulse-bg-layer" />
          )}

          {prefix != null && (
            <span
              className={cn(config.adornment, sizeConfig.adornmentWidth)}
              style={{ left: 0 }}
            >
              {prefix}
            </span>
          )}

          <Input
            {...(placeholder !== undefined ? { placeholder } : {})}
            {...(type !== undefined ? { type } : {})}
            className={cn(
              config.input,
              sizeConfig.fontSize,
              prefix != null ? sizeConfig.withPrefix : sizeConfig.paddingLeft,
              hasRightAdornment ? sizeConfig.withSuffix : sizeConfig.paddingRight,
              floatingLabel && "mr-tf-fl-input",
              characterReveal && config.characterReveal && "mr-tf-char-input",
            )}
          />

          {showClear && (
            <button
              type="button"
              aria-label="Clear"
              tabIndex={-1}
              onClick={handleClear}
              className={cn(config.clearButton, sizeConfig.adornmentWidth)}
              style={{ right: 0 }}
            >
              <XIcon />
            </button>
          )}

          {showSuffix && (
            <span
              className={cn(config.adornment, sizeConfig.adornmentWidth)}
              style={{ right: 0 }}
            >
              {suffix}
            </span>
          )}

          {/* Underline bars — rendered last so they sit above the wrapper border */}
          {isUnderline && config.underline && (
            <UnderlineBar
              origin={
                animation === "center" || animation === "dual-center" ? "center" :
                animation === "right"  || animation === "dual-right"  ? "right"  : "left"
              }
              isStatic={animation === undefined}
            />
          )}
          {isUnderline && (animation === "dual-left" || animation === "dual-right" || animation === "dual-center") && config.underline && (
            <UnderlineBar
              origin={animation === "dual-right" ? "right" : animation === "dual-center" ? "center" : "left"}
              top
            />
          )}
        </div>
      </div>

      {description != null && (
        <Text slot="description" className={cn(config.description)}>
          {description}
        </Text>
      )}

      {/* FieldError renders when isInvalid is true. Children override the
          default (browser validation errors). */}
      <FieldError className={cn(config.error)}>
        {errorMessage}
      </FieldError>
    </AriaTextField>
  );
}
