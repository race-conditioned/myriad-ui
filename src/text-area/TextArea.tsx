"use client";
import React from "react";
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
  Label,
  FieldError,
  Text,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { TextAreaConfig, TextAreaSize } from "../theme/types";
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

export const defaultTextAreaConfig = defaultTheme.components.textArea;

export type TextAreaProps = {
  config?: TextAreaConfig;
  /** Label rendered above the textarea. */
  label?: React.ReactNode;
  /** Hint text rendered below the textarea. */
  description?: React.ReactNode;
  /** Size variant. @default "md" */
  size?: TextAreaSize;
  /**
   * Initial visible row count.
   * @default config.size[size].rows (3 for sm/md, 4 for lg)
   */
  rows?: number;
  /**
   * Maximum rows before the textarea scrolls rather than growing.
   * Only applies when autoResize is true.
   */
  maxRows?: number;
  /**
   * Grow the textarea height as the user types.
   * @default true
   */
  autoResize?: boolean;
  /**
   * CSS resize handle. Forced to "none" when autoResize is true.
   * @default "none"
   */
  resize?: "none" | "vertical" | "both";
  /** Hard character limit. Enables the character counter when set. */
  maxLength?: number;
  /** Show character counter even without a maxLength. @default false */
  showCount?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  /** Error message shown below the field when isInvalid is true. */
  errorMessage?: React.ReactNode;
  /**
   * Enables the focus glow effect (FX-C). A blurred halo appears behind the
   * border on focus. Requires `config.glow` to be set.
   */
  glow?: boolean;
  /**
   * Enables the animated gradient border (FX-D). A flowing gradient ring
   * replaces the plain focus border. Requires `config.gradientBorder` to be set.
   */
  gradientBorder?: boolean;
  /**
   * Enables the SVG stroke draw (FX-E). An SVG rect traces itself around the
   * textarea perimeter on focus using stroke-dashoffset animation. The SVG
   * is measured via ResizeObserver so it tracks the textarea's dynamic height.
   * Requires `config.svgStroke` to be set.
   */
  svgStroke?: boolean;
  /**
   * Enables the morphing border-radius (FX-L). The wrapper's border-radius
   * transitions between `config.morphRadius.rest` and `config.morphRadius.focus`
   * on focus/blur. Accepts any valid CSS border-radius string.
   * Requires `config.morphRadius` to be set.
   */
  morphRadius?: boolean;
  /**
   * Enables the chroma border (FX-M). An animated gradient ring appears around
   * the wrapper on focus. Variant is selected via `config.chromaBorder.variant`:
   * `"hue-rotate"`, `"aurora"`, or `"iridescent"`.
   * Requires `config.chromaBorder` to be set.
   */
  chromaBorder?: boolean;
  /**
   * Enables the background colour reveal (FX-G). A translucent wash slides in
   * behind the textarea content on focus, expanding from the configured direction.
   * Requires `config.bgReveal` to be set.
   */
  bgReveal?: boolean;
  /**
   * Enables the ripple / pulse effect (FX-H). Only `pulse-rings` and `pulse-bg`
   * variants apply to TextArea — the click-ripple variant is omitted.
   * Variant is selected via `config.ripple.variant`.
   * Requires `config.ripple` to be set.
   */
  ripple?: boolean;
  /**
   * Enables the cursor spotlight (FX-I). A soft radial gradient follows the
   * pointer position inside the textarea. Updates are applied directly to the
   * DOM — no React re-renders on pointer movement.
   * Requires `config.cursorSpotlight` to be set.
   */
  cursorSpotlight?: boolean;
  /**
   * Enables the ornamental corners / split-line (FX-F). Four L-shaped corner
   * brackets close inward on focus, or a horizontal line splits from the centre.
   * Variant is selected via `config.corners.style`.
   * Requires `config.corners` to be set.
   */
  corners?: boolean;
  /**
   * Enables the ink-draw effect (FX-K). An SVG path traces a slightly
   * irregular rounded rect around the textarea on focus using a two-layer stroke.
   * Requires `config.inkDraw` to be set.
   */
  inkDraw?: boolean;
  /**
   * Enables the character reveal effect (FX-J). Each newly typed character
   * animates in individually. The real textarea's text is hidden via
   * `color: transparent` while an `aria-hidden` overlay renders the characters
   * using `white-space: pre-wrap` to match the textarea's line wrapping.
   * For fixed-height (autoResize=false) usage, scroll position is kept in sync.
   * Variant is selected via `config.characterReveal.variant`.
   * Automatically disabled when prefers-reduced-motion is set.
   * Requires `config.characterReveal` to be set.
   */
  characterReveal?: boolean;
} & Omit<AriaTextFieldProps, "className" | "style" | "children">;

export function TextArea({
  config = defaultTextAreaConfig,
  label,
  description,
  size = "md",
  rows: rowsProp,
  maxRows,
  autoResize = true,
  resize = "none",
  maxLength,
  showCount = false,
  isRequired,
  isInvalid,
  isReadOnly,
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  errorMessage,
  glow = false,
  gradientBorder = false,
  svgStroke = false,
  morphRadius = false,
  chromaBorder = false,
  bgReveal = false,
  ripple = false,
  cursorSpotlight = false,
  corners = false,
  inkDraw = false,
  characterReveal = false,
  ...props
}: TextAreaProps) {
  const sizeConfig = config.size[size];

  useGlowStyles();
  useGradientBorderStyles();
  useBgRevealStyles();
  useRippleStyles();
  useCursorSpotlightStyles();
  useCharacterRevealStyles();
  useChromaBorderStyles();

  // ---------------------------------------------------------------------------
  // Controlled / uncontrolled value
  // ---------------------------------------------------------------------------

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );

  // ---------------------------------------------------------------------------
  // Focus tracking — stamp data-focused on the root for group-data-* selectors
  // ---------------------------------------------------------------------------

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
      setFocusWithin(false);
      onBlurProp?.(e as never);
    },
    [onBlurProp],
  );

  // ---------------------------------------------------------------------------
  // Auto-resize — reset height to 0, then expand to scrollHeight
  // ---------------------------------------------------------------------------

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el || !autoResize) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [currentValue, autoResize]);

  // ---------------------------------------------------------------------------
  // Character count tiers: normal → warning (≥85%) → error (100%)
  // ---------------------------------------------------------------------------

  const charLen = currentValue.length;
  const isAtLimit   = maxLength != null && charLen >= maxLength;
  const isNearLimit = maxLength != null && !isAtLimit && charLen >= Math.floor(maxLength * 0.85);
  const showCharCount = showCount || maxLength != null;

  // ---------------------------------------------------------------------------
  // FX-J: Character reveal — track new characters and sync overlay scroll
  // ---------------------------------------------------------------------------

  // prevValueRef holds the committed value from the previous render. Comparing
  // against currentValue identifies which characters are "new" and get the
  // entrance animation class. Effect runs after every render to keep it current.
  const prevValueRef = React.useRef<string>(currentValue);
  const prevValue = prevValueRef.current;
  const newCharStart =
    currentValue.length > prevValue.length ? prevValue.length : currentValue.length;

  React.useEffect(() => {
    prevValueRef.current = currentValue;
  });

  // Overlay ref for scroll sync: when the textarea scrolls (fixed-height case),
  // we mirror its scrollTop onto the overlay so the two stay aligned.
  const charRevealOverlayRef = React.useRef<HTMLDivElement>(null);

  const handleCharRevealScroll = React.useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (charRevealOverlayRef.current) {
        charRevealOverlayRef.current.scrollTop = e.currentTarget.scrollTop;
      }
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Min / max height
  // ---------------------------------------------------------------------------

  const initialRows = rowsProp ?? sizeConfig.rows;
  const rowHeight = sizeConfig.lineHeight;
  const minHeightStyle: React.CSSProperties = {
    minHeight: `calc(${initialRows} * ${rowHeight} + ${sizeConfig.paddingYPx}px)`,
  };
  const maxHeightStyle: React.CSSProperties =
    maxRows != null
      ? {
          maxHeight: `calc(${maxRows} * ${rowHeight} + ${sizeConfig.paddingYPx}px)`,
          overflowY: "auto",
        }
      : {};

  // ---------------------------------------------------------------------------
  // SVG size measurement — shared by FX-E (svgStroke) and FX-K (inkDraw).
  // ResizeObserver tracks dynamic height as the textarea auto-resizes.
  // w === 0 means "not yet measured"; SVG overlays are withheld until after the
  // first callback to avoid a dashoffset flash on mount.
  // ---------------------------------------------------------------------------

  const outerWrapperRef = React.useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = React.useState({ w: 0, h: 0, perimeter: 0 });

  React.useEffect(() => {
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

  // FX-E: dashOffset is managed outside React's prop system via a ref so the
  // browser always sees the hidden state (dashOffset=perimeter) painted BEFORE
  // the first transition fires. React batching can collapse "SVG mount at P"
  // and "focus changes dashOffset to 0" into a single frame, leaving no "from"
  // value for the CSS transition. useLayoutEffect fires after DOM commit but
  // before paint, guaranteeing the initial write and subsequent updates both
  // happen at the right moment.
  const svgRectRef = React.useRef<SVGRectElement>(null);
  const svgRectInitializedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const rect = svgRectRef.current;
    if (!rect || svgSize.w === 0 || !config.svgStroke) return;
    const ccw = config.svgStroke.drawDirection === "counterclockwise";
    const hiddenOffset = String(ccw ? -svgSize.perimeter : svgSize.perimeter);

    if (!svgRectInitializedRef.current) {
      // First commit: force hidden state before paint, then enable transitions.
      rect.style.strokeDashoffset = hiddenOffset;
      svgRectInitializedRef.current = true;
      // If the field is already focused, animate in after the first paint.
      if (focusWithin) {
        requestAnimationFrame(() => { rect.style.strokeDashoffset = "0"; });
      }
      return;
    }

    // Subsequent updates — CSS transition is already in effect.
    rect.style.strokeDashoffset = focusWithin ? "0" : hiddenOffset;
  }, [svgSize.perimeter, focusWithin, config.svgStroke]);

  // ---------------------------------------------------------------------------
  // FX-I: Cursor spotlight — imperative DOM updates, no React re-renders
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Derived flags
  // ---------------------------------------------------------------------------

  // Whether the uncontained (body-bleed) glow variant is in use — it must sit
  // outside the wrapper's overflow:hidden to bleed into the surrounding page.
  const glowUncontained = glow && config.glow && config.glow.contained === false;

  // The outer wrapper needs positioning when any absolute FX overlays live there.
  const needsOuterWrapper =
    (svgStroke && !!config.svgStroke) ||
    !!glowUncontained ||
    (chromaBorder && !!config.chromaBorder) ||
    (corners && !!config.corners) ||
    (inkDraw && !!config.inkDraw) ||
    (ripple && config.ripple?.variant === "pulse-rings");

  // FX-L: morph border-radius. Inline style wins over Tailwind's rounded-* class.
  // The transition re-declares border-color and box-shadow so they keep animating
  // alongside the radius (inline transition overrides the Tailwind transition class).
  const morphRadiusStyle: React.CSSProperties | undefined =
    morphRadius && config.morphRadius
      ? {
          borderRadius: focusWithin ? config.morphRadius.focus : config.morphRadius.rest,
          transition: [
            "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            `border-radius ${config.morphRadius.duration ?? 250}ms ${config.morphRadius.easing ?? "ease-out"}`,
          ].join(", "),
        }
      : undefined;

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <AriaTextField
      {...props}
      value={currentValue}
      onChange={handleChange}
      {...(isRequired !== undefined ? { isRequired } : {})}
      {...(isInvalid !== undefined ? { isInvalid } : {})}
      {...(isReadOnly !== undefined ? { isReadOnly } : {})}
      className={cn(config.root)}
      data-focused={focusWithin || undefined}
      data-has-value={currentValue.length > 0 || undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        ...(glow && config.glow ? {
          "--tf-gw-spread":  `${config.glow.spread ?? 5}px`,
          "--tf-gw-radius":  `${config.glow.radius ?? 10}px`,
          "--tf-gw-blur":    `${config.glow.blur ?? 8}px`,
          "--tf-gw-dur":     `${config.glow.duration ?? 250}ms`,
          "--tf-gw-opacity": config.glow.opacity ?? 1,
          "--tf-gw-mask-bg": config.glow.maskBackground ?? "transparent",
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
        ...(cursorSpotlight && config.cursorSpotlight ? {
          "--tf-cs-color":  config.cursorSpotlight.color,
          "--tf-cs-radius": `${config.cursorSpotlight.radius ?? 80}px`,
          "--tf-cs-fade":   `${config.cursorSpotlight.fadeOut ?? 300}ms`,
        } : {}),
        ...(characterReveal && config.characterReveal ? {
          "--tf-cr-caret": config.characterReveal.caretColor ?? "#374151",
          "--tf-cr-dur":   `${config.characterReveal.duration ?? 120}ms`,
          "--tf-cr-ease":  config.characterReveal.easing ?? "ease-out",
        } : {}),
        ...(ripple && config.ripple ? {
          "--tf-rp-color":     config.ripple.color,
          "--tf-rp-max-scale": config.ripple.maxScale ?? (config.ripple.variant === "pulse-rings" ? 1.2 : 2.0),
          "--tf-rp-radius":    `${config.ripple.radius ?? 6}px`,
          "--tf-rp-dur":       `${config.ripple.duration ?? (
            config.ripple.variant === "pulse-rings" ? 1500 : 2000
          )}ms`,
        } : {}),
      } as React.CSSProperties}
    >
      {label != null && (
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
        Outer wrapper — positioning context for SVG-based FX (stroke, ink),
        chroma border, ornamental corners, pulse rings, and the uncontained glow
        variant. Only gets position:relative when those FX are active.
      */}
      <div
        ref={outerWrapperRef}
        style={needsOuterWrapper ? { position: "relative", isolation: "isolate" } : undefined}
      >
        {/* FX-M: Chroma border — animated gradient ring */}
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

        {/* FX-E: SVG stroke draw */}
        {svgStroke && config.svgStroke && svgSize.w > 0 && (() => {
          const ss = config.svgStroke!;
          const strokeColor = isInvalid ? ss.invalidColor : ss.color;
          const strokeWidth = ss.width ?? 1.5;
          const hw = strokeWidth / 2;
          const duration = ss.duration ?? 600;
          const easing = ss.easing ?? "ease-in-out";
          const ccw = ss.drawDirection === "counterclockwise";
          const { w, h, perimeter } = svgSize;
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
                ref={svgRectRef}
                x={hw}
                y={hw}
                width={Math.max(0, w - strokeWidth)}
                height={Math.max(0, h - strokeWidth)}
                rx={ss.rx ?? 6}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={perimeter}
                // strokeDashoffset is intentionally omitted — managed via
                // svgRectRef + useLayoutEffect to guarantee the hidden state
                // is painted before any CSS transition fires.
                style={{
                  transition: `stroke-dashoffset ${duration}ms ${easing}, stroke ${Math.round(duration * 0.4)}ms ease-out`,
                }}
              />
            </svg>
          );
        })()}

        {/* FX-K: Ink draw — wobbly dual-layer SVG path */}
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

        {/* FX-F: Ornamental corners */}
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

          // style === "split"
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
              <div aria-hidden="true" style={{ ...splitBase, left: 0, transformOrigin: "right center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
              <div aria-hidden="true" style={{ ...splitBase, right: 0, transformOrigin: "left center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
            </>
          );
        })()}

        {/* FX-H pulse-rings — looping aura rings outside the wrapper */}
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

        {/* FX-C (uncontained): body glow bleeds outside the wrapper */}
        {glowUncontained && config.glow && (
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
        )}

        {/* Inner wrapper — the visible textarea border */}
        <div
          className={cn(
            config.wrapper,
            bgReveal && config.bgReveal && "mr-tf-bgr",
            corners && config.corners && "group-data-[focused]:!border-transparent group-data-[focused]:!ring-0 group-data-[focused]:!shadow-none",
          )}
          style={
            morphRadiusStyle
              ? { ...morphRadiusStyle, ...((gradientBorder && config.gradientBorder) ? { isolation: "isolate" } : {}) }
              : (gradientBorder && config.gradientBorder) ? { isolation: "isolate" } : undefined
          }
          onPointerMove={cursorSpotlight && config.cursorSpotlight ? handleSpotlightMove : undefined}
          onPointerLeave={cursorSpotlight && config.cursorSpotlight ? handleSpotlightLeave : undefined}
        >
          {/* FX-I: cursor spotlight */}
          {cursorSpotlight && config.cursorSpotlight && (
            <div ref={spotlightLayerRef} aria-hidden="true" className="mr-tf-spotlight" />
          )}

          {/* FX-D: gradient border ring */}
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
                  backgroundImage: buildLinearGradient(stops),
                  backgroundSize:  "400% 100%",
                  opacity:    focusWithin ? (gb.opacity ?? 0.9) : 0,
                  transition: `opacity ${gb.fadeIn ?? 200}ms ease-out`,
                  animation:          `mr-tf-gb-flow ${gb.duration ?? 4}s linear infinite`,
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

          {/* FX-C (contained, default): glow clipped to wrapper bounds */}
          {glow && config.glow && config.glow.contained !== false && (
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
          )}

          {/* FX-H pulse-bg — breathes in/out while focused */}
          {ripple && config.ripple && config.ripple.variant === "pulse-bg" && (
            <div aria-hidden="true" className="mr-tf-pulse-bg-layer" />
          )}

          {/* FX-J: Character reveal overlay — aria-hidden, real textarea is transparent.
              Uses white-space: pre-wrap + word-break: break-word so the spans wrap in
              the same places as the underlying textarea text. scrollTop is synced from
              the textarea via handleCharRevealScroll for fixed-height usage. */}
          {characterReveal && config.characterReveal && (() => {
            const cr = config.characterReveal!;
            const variantSuffix = cr.variant.replace("char-", "");
            const animClass = `mr-tf-char-new-${variantSuffix}`;
            return (
              <div
                ref={charRevealOverlayRef}
                aria-hidden="true"
                className={cn(
                  config.textarea,
                  sizeConfig.fontSize,
                  sizeConfig.padding,
                )}
                style={{ position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none", overflow: "hidden", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
              >
                {Array.from(currentValue).map((char, i) => {
                  // Explicit newline — must be a <br> so it creates a line break
                  // in the outer flow. A \n inside an inline-block span would
                  // break within that span instead, breaking layout.
                  if (char === "\n") return <br key={i} />;
                  // Space — keep display:inline so it stays a soft-wrap
                  // opportunity between words, matching textarea line-breaking.
                  // The transform animation is invisible on a space anyway.
                  if (char === " ") {
                    return (
                      <span key={i} className={i >= newCharStart ? animClass : undefined}>
                        {" "}
                      </span>
                    );
                  }
                  // All other characters — inline-block so CSS transform applies
                  // correctly. display:inline suppresses translateY on most browsers
                  // because the transform is absorbed into the inline line box.
                  return (
                    <span
                      key={i}
                      style={{ display: "inline-block" }}
                      className={i >= newCharStart ? animClass : undefined}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            );
          })()}

          <AriaTextArea
            ref={textareaRef}
            placeholder={placeholder}
            rows={rowsProp ?? sizeConfig.rows}
            maxLength={maxLength}
            className={cn(
              config.textarea,
              sizeConfig.fontSize,
              sizeConfig.padding,
              characterReveal && config.characterReveal && "mr-tf-char-input",
            )}
            style={{
              resize: autoResize ? "none" : resize,
              ...minHeightStyle,
              ...maxHeightStyle,
            }}
            onScroll={characterReveal && config.characterReveal ? handleCharRevealScroll : undefined}
          />
        </div>
      </div>

      {/* Bottom row: description / error on left, char count on right */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {description != null && (
            <Text slot="description" className={cn(config.description)}>
              {description}
            </Text>
          )}
          <FieldError className={cn(config.error)}>{errorMessage}</FieldError>
        </div>
        {showCharCount && (
          <span
            aria-live={isNearLimit || isAtLimit ? "polite" : undefined}
            aria-atomic={isNearLimit || isAtLimit ? "true" : undefined}
            className={cn(
              isAtLimit   ? config.charCountError   :
              isNearLimit ? config.charCountWarning :
                            config.charCount,
            )}
          >
            {maxLength != null ? `${charLen} / ${maxLength}` : `${charLen}`}
          </span>
        )}
      </div>
    </AriaTextField>
  );
}
