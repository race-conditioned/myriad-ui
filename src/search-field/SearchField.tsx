"use client";

import * as React from "react";
import {
  SearchField as AriaSearchField,
  Label,
  Input,
  FieldError,
  Text,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { SearchFieldConfig, SearchFieldSize } from "../theme/types";
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

export const defaultSearchFieldConfig: SearchFieldConfig =
  defaultTheme.components.searchField;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SearchFieldProps = {
  config?: SearchFieldConfig;
  /** Label text rendered above the field. */
  label?: React.ReactNode;
  /** Hint text rendered below the label, above the input. */
  description?: React.ReactNode;
  /** Size variant. @default "md" */
  size?: SearchFieldSize;
  /**
   * Icon rendered before the input (inside the border).
   * Defaults to a magnifying glass icon. Pass `null` to hide it entirely.
   */
  prefix?: React.ReactNode;
  /**
   * Icon or short text rendered after the input.
   * Hidden when the field has a value (clear button takes priority).
   */
  suffix?: React.ReactNode;
  /** Native input placeholder. */
  placeholder?: string;
  /** Error message shown below the field when isInvalid is true. */
  errorMessage?: React.ReactNode;
  // --- FX props ---
  /** Enables the focus glow effect (FX-C). Requires `config.glow`. */
  glow?: boolean;
  /** Enables the animated gradient border (FX-D). Requires `config.gradientBorder`. */
  gradientBorder?: boolean;
  /** Enables the SVG stroke draw (FX-E). Requires `config.svgStroke`. */
  svgStroke?: boolean;
  /** Enables the ink-draw effect (FX-K). Requires `config.inkDraw`. */
  inkDraw?: boolean;
  /** Enables the ornamental corners / split-line (FX-F). Requires `config.corners`. */
  corners?: boolean;
  /**
   * Enables the character reveal effect (FX-J). Each newly typed character
   * animates in individually. Requires `config.characterReveal`.
   */
  characterReveal?: boolean;
  /** Enables the cursor spotlight (FX-I). Requires `config.cursorSpotlight`. */
  cursorSpotlight?: boolean;
  /** Enables the background colour reveal (FX-G). Requires `config.bgReveal`. */
  bgReveal?: boolean;
  /**
   * Enables the ripple / pulse effect (FX-H). Variant selected via
   * `config.ripple.variant`. Requires `config.ripple`.
   */
  ripple?: boolean;
  /**
   * Enables the morphing border-radius effect (FX-L). Requires `config.morphRadius`.
   */
  morphRadius?: boolean;
  /**
   * Enables the chroma border effect (FX-M). Requires `config.chromaBorder`.
   */
  chromaBorder?: boolean;
} & Omit<AriaSearchFieldProps, "className" | "style">;

// ---------------------------------------------------------------------------
// Internal icons
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 14, height: 14, display: "block" }}
    >
      <circle cx="6.5" cy="6.5" r="4" />
      <line x1="9.7" y1="9.7" x2="13.5" y2="13.5" />
    </svg>
  );
}

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
// Component
// ---------------------------------------------------------------------------

export function SearchField({
  config = defaultSearchFieldConfig,
  label,
  description,
  size = "md",
  prefix,
  suffix,
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
  errorMessage,
  value,
  defaultValue,
  onChange,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}: SearchFieldProps) {
  const sizeConfig = config.size[size];

  useGlowStyles();
  useGradientBorderStyles();
  useCharacterRevealStyles();
  useCursorSpotlightStyles();
  useBgRevealStyles();
  useRippleStyles();
  useChromaBorderStyles();

  // Manual focus tracking — React Aria sets data-focused on <Input>, not the
  // root element. We stamp it on the root so group-data-[focused]: selectors work.
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
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      setFocusWithin(false);
      onBlurProp?.(e as never);
    },
    [onBlurProp],
  );

  // Track value internally for controlled + uncontrolled usage.
  const [internalValue, setInternalValue] = React.useState<string>(
    value ?? defaultValue ?? "",
  );

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

  // Prefix handling: undefined → default search icon, null → hidden, else → custom
  const hasPrefix = prefix !== null;
  const effectivePrefix = prefix === undefined ? <SearchIcon /> : prefix;

  const showClear = internalValue.length > 0;
  const showSuffix = suffix != null && !showClear;
  const hasRightAdornment = showClear || showSuffix;

  // FX-E / FX-K: measure outer wrapper for SVG path sizing.
  const outerWrapperRef = React.useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = React.useState({ w: 0, h: 0, perimeter: 0 });

  // FX-J: character reveal — track newly typed chars by comparing prev/current value.
  const prevValueRef = React.useRef<string>(internalValue);
  const prevValue = prevValueRef.current;
  const newCharStart =
    internalValue.length > prevValue.length
      ? prevValue.length
      : internalValue.length;

  React.useEffect(() => {
    prevValueRef.current = internalValue;
  });

  // FX-I: cursor spotlight — update DOM directly to skip re-renders.
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

  // FX-L: morph border-radius on focus.
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

  const needsOuterWrapper =
    (glow && config.glow) ||
    (gradientBorder && config.gradientBorder) ||
    (svgStroke && config.svgStroke) ||
    (inkDraw && config.inkDraw) ||
    (corners && config.corners) ||
    (ripple && config.ripple) ||
    (chromaBorder && config.chromaBorder);

  return (
    <AriaSearchField
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
        ...(glow && config.glow
          ? {
              "--tf-gw-spread":   `${config.glow.spread ?? 5}px`,
              "--tf-gw-radius":   `${config.glow.radius ?? 10}px`,
              "--tf-gw-blur":     `${config.glow.blur ?? 8}px`,
              "--tf-gw-dur":      `${config.glow.duration ?? 250}ms`,
              "--tf-gw-opacity":  config.glow.opacity ?? 1,
              "--tf-gw-mask-bg":  config.glow.maskBackground ?? "transparent",
              ...(config.glow.type === "static"
                ? { "--tf-gw-color": config.glow.color as string }
                : { "--tf-gw-spin-dur": `${config.glow.spinDuration ?? 4}s` }),
            }
          : {}),
        ...(bgReveal && config.bgReveal
          ? {
              "--tf-bgr-color":
                config.bgReveal.color,
              "--tf-bgr-invalid-color":
                config.bgReveal.invalidColor ?? config.bgReveal.color,
              "--tf-bgr-x":
                config.bgReveal.direction === "right"
                  ? "right"
                  : config.bgReveal.direction === "center"
                    ? "center"
                    : "left",
              "--tf-bgr-dur": `${config.bgReveal.duration ?? 300}ms`,
            }
          : {}),
        ...(characterReveal && config.characterReveal
          ? {
              "--tf-cr-caret": config.characterReveal.caretColor ?? "#374151",
              "--tf-cr-dur":   `${config.characterReveal.duration ?? 120}ms`,
              "--tf-cr-ease":  config.characterReveal.easing ?? "ease-out",
            }
          : {}),
        ...(cursorSpotlight && config.cursorSpotlight
          ? {
              "--tf-cs-color":  config.cursorSpotlight.color,
              "--tf-cs-radius": `${config.cursorSpotlight.radius ?? 80}px`,
              "--tf-cs-fade":   `${config.cursorSpotlight.fadeOut ?? 300}ms`,
            }
          : {}),
        ...(ripple && config.ripple
          ? {
              "--tf-rp-color":     config.ripple.color,
              "--tf-rp-max-scale": config.ripple.maxScale ?? (config.ripple.variant === "pulse-rings" ? 1.2 : 2.0),
              "--tf-rp-radius":    `${config.ripple.radius ?? 6}px`,
              "--tf-rp-dur":       `${config.ripple.duration ?? (
                config.ripple.variant === "pulse-rings" ? 1500 :
                config.ripple.variant === "pulse-bg"    ? 2000 : 600
              )}ms`,
            }
          : {}),
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

      <div
        ref={outerWrapperRef}
        style={needsOuterWrapper ? { position: "relative", isolation: "isolate" } : undefined}
      >
        {/* FX-D: animated gradient border ring */}
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

        {/* FX-M: chroma border */}
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
          const duration = ss.duration ?? 400;
          const easing = ss.easing ?? "ease-out";
          const ccw = ss.drawDirection === "counterclockwise";
          const { w, h, perimeter } = svgSize;
          const dashOffset = focusWithin ? 0 : ccw ? -perimeter : perimeter;
          return (
            <svg
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 1, overflow: "visible",
              }}
            >
              <rect
                x={hw} y={hw}
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

        {/* FX-K: ink-draw */}
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
                position: "absolute", inset: 0, width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 1, overflow: "visible",
                transform: svgRotation, transformOrigin: "center",
              }}
            >
              <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 2}
                strokeOpacity={0.22} strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={perimeter} strokeDashoffset={dashOffset}
                style={{ transition }}
              />
              <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={strokeWidth * 0.75}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={perimeter} strokeDashoffset={dashOffset}
                style={{ transition }}
              />
            </svg>
          );
        })()}

        {/* FX-F: ornamental corners / split-line */}
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
              width: length, height: length,
              pointerEvents: "none", zIndex: 2,
              transition: `transform ${duration}ms ${easing}, border-color ${colorDur}ms ease-out`,
            };
            const focused = "translate(0, 0) scale(1)";
            return (
              <>
                <div aria-hidden="true" style={{ ...base, top: inset, left: inset, borderTop: border, borderLeft: border, transformOrigin: "top left", transform: focusWithin ? focused : `translate(${-offset}px, ${-offset}px) scale(0)` }} />
                <div aria-hidden="true" style={{ ...base, top: inset, right: inset, borderTop: border, borderRight: border, transformOrigin: "top right", transform: focusWithin ? focused : `translate(${offset}px, ${-offset}px) scale(0)` }} />
                <div aria-hidden="true" style={{ ...base, bottom: inset, left: inset, borderBottom: border, borderLeft: border, transformOrigin: "bottom left", transform: focusWithin ? focused : `translate(${-offset}px, ${offset}px) scale(0)` }} />
                <div aria-hidden="true" style={{ ...base, bottom: inset, right: inset, borderBottom: border, borderRight: border, transformOrigin: "bottom right", transform: focusWithin ? focused : `translate(${offset}px, ${offset}px) scale(0)` }} />
              </>
            );
          }

          const splitBase: React.CSSProperties = {
            position: "absolute", bottom: 0, width: "50%", height: lineWidth,
            background: strokeColor, pointerEvents: "none", zIndex: 2,
            transition: `transform ${duration}ms ${easing}, background-color ${colorDur}ms ease-out`,
          };
          return (
            <>
              <div aria-hidden="true" style={{ ...splitBase, left: 0, transformOrigin: "right center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
              <div aria-hidden="true" style={{ ...splitBase, right: 0, transformOrigin: "left center", transform: focusWithin ? "scaleX(1)" : "scaleX(0)" }} />
            </>
          );
        })()}

        {/* FX-H: pulse rings */}
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

        {/* FX-C: glow */}
        {glow && config.glow && (
          config.glow.contained === false ? (
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

        {/* Input row */}
        <div
          className={cn(
            config.inputWrapper,
            sizeConfig.height,
            bgReveal && config.bgReveal && "mr-tf-bgr",
            corners && config.corners &&
              "group-data-[focused]:!border-transparent group-data-[focused]:!ring-0 group-data-[focused]:!shadow-none",
          )}
          style={morphRadiusStyle}
          onPointerMove={cursorSpotlight && config.cursorSpotlight ? handleSpotlightMove : undefined}
          onPointerLeave={cursorSpotlight && config.cursorSpotlight ? handleSpotlightLeave : undefined}
        >
          {/* FX-I: cursor spotlight */}
          {cursorSpotlight && config.cursorSpotlight && (
            <div ref={spotlightLayerRef} aria-hidden="true" className="mr-tf-spotlight" />
          )}

          {/* FX-J: character reveal overlay */}
          {characterReveal && config.characterReveal && (() => {
            const cr = config.characterReveal!;
            const variantSuffix = cr.variant.replace("char-", "");
            const animClass = `mr-tf-char-new-${variantSuffix}`;
            const chars = Array.from(internalValue);
            return (
              <div
                aria-hidden="true"
                className={cn(
                  config.input,
                  sizeConfig.fontSize,
                  hasPrefix ? sizeConfig.withPrefix : sizeConfig.paddingLeft,
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

          {/* FX-H: ripple wave */}
          {ripple && config.ripple && config.ripple.variant === "ripple" && focusWithin && (
            <div aria-hidden="true" className="mr-tf-ripple-wave" />
          )}
          {/* FX-H: pulse-bg */}
          {ripple && config.ripple && config.ripple.variant === "pulse-bg" && (
            <div aria-hidden="true" className="mr-tf-pulse-bg-layer" />
          )}

          {/* Search icon / custom prefix */}
          {hasPrefix && (
            <span
              className={cn(config.adornment, sizeConfig.adornmentWidth)}
              style={{ left: 0 }}
            >
              {effectivePrefix}
            </span>
          )}

          <Input
            {...(placeholder !== undefined ? { placeholder } : {})}
            className={cn(
              config.input,
              sizeConfig.fontSize,
              hasPrefix ? sizeConfig.withPrefix : sizeConfig.paddingLeft,
              hasRightAdornment ? sizeConfig.withSuffix : sizeConfig.paddingRight,
              characterReveal && config.characterReveal && "mr-tf-char-input",
            )}
          />

          {/* Clear button */}
          {showClear && (
            <button
              type="button"
              aria-label="Clear search"
              tabIndex={-1}
              onClick={handleClear}
              className={cn(config.clearButton, sizeConfig.adornmentWidth)}
              style={{ right: 0 }}
            >
              <XIcon />
            </button>
          )}

          {/* Suffix (hidden while clear is visible) */}
          {showSuffix && (
            <span
              className={cn(config.adornment, sizeConfig.adornmentWidth)}
              style={{ right: 0 }}
            >
              {suffix}
            </span>
          )}
        </div>
      </div>

      {description != null && (
        <Text slot="description" className={cn(config.description)}>
          {description}
        </Text>
      )}

      <FieldError className={cn(config.error)}>
        {errorMessage}
      </FieldError>
    </AriaSearchField>
  );
}
