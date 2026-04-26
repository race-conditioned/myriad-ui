"use client";
import React from "react";
import {
  NumberField as AriaNumberField,
  Group,
  Input,
  Button,
  Label,
  FieldError,
  Text,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { NumberFieldConfig, NumberFieldSize } from "../theme/types";
import {
  buildLinearGradient,
  buildConicGradient,
  buildInkPath,
  useGlowStyles,
  useGradientBorderStyles,
  useBgRevealStyles,
  useRippleStyles,
  useCursorSpotlightStyles,
  useChromaBorderStyles,
  CHROMA_DEFAULTS,
} from "../utils/fx";

export const defaultNumberFieldConfig = defaultTheme.components.numberField;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ChevronUpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 10, height: 10, display: "block" }}
    >
      <polyline points="4,10 8,6 12,10" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 10, height: 10, display: "block" }}
    >
      <polyline points="4,6 8,10 12,6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type NumberFieldProps = {
  config?: NumberFieldConfig;
  /** Label rendered above the input. */
  label?: React.ReactNode;
  /** Hint text rendered below the input. */
  description?: React.ReactNode;
  /** Size variant. @default "md" */
  size?: NumberFieldSize;
  isRequired?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  /** Error message shown below the field when isInvalid is true. */
  errorMessage?: React.ReactNode;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  /** Enables the focus glow (FX-C). Requires `config.glow`. */
  glow?: boolean;
  /** Enables the animated gradient border (FX-D). Requires `config.gradientBorder`. */
  gradientBorder?: boolean;
  /** Enables the SVG stroke draw (FX-E). Requires `config.svgStroke`. */
  svgStroke?: boolean;
  /** Enables the ornamental corners / split-line (FX-F). Requires `config.corners`. */
  corners?: boolean;
  /** Enables the background colour reveal (FX-G). Requires `config.bgReveal`. */
  bgReveal?: boolean;
  /** Enables the ripple / pulse effect (FX-H). Requires `config.ripple`. */
  ripple?: boolean;
  /** Enables the cursor spotlight (FX-I). Requires `config.cursorSpotlight`. */
  cursorSpotlight?: boolean;
  /** Enables the ink-draw effect (FX-K). Requires `config.inkDraw`. */
  inkDraw?: boolean;
  /** Enables the morphing border-radius (FX-L). Requires `config.morphRadius`. */
  morphRadius?: boolean;
  /** Enables the chroma border (FX-M). Requires `config.chromaBorder`. */
  chromaBorder?: boolean;
} & Omit<AriaNumberFieldProps, "className" | "style" | "children">;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NumberField({
  config = defaultNumberFieldConfig,
  label,
  description,
  size = "md",
  isRequired,
  isInvalid,
  isReadOnly,
  errorMessage,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  glow = false,
  gradientBorder = false,
  svgStroke = false,
  corners = false,
  bgReveal = false,
  ripple = false,
  cursorSpotlight = false,
  inkDraw = false,
  morphRadius = false,
  chromaBorder = false,
  ...props
}: NumberFieldProps) {
  const sizeConfig = config.size[size];

  useGlowStyles();
  useGradientBorderStyles();
  useBgRevealStyles();
  useRippleStyles();
  useCursorSpotlightStyles();
  useChromaBorderStyles();

  // ---------------------------------------------------------------------------
  // Focus tracking — stamp data-focused on the root for group-data-* selectors.
  // Focus can move between the Input and the two stepper Buttons; the contains()
  // check in onBlur prevents a spurious blur when focus moves between siblings.
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
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      setFocusWithin(false);
      onBlurProp?.(e as never);
    },
    [onBlurProp],
  );

  // ---------------------------------------------------------------------------
  // SVG size measurement — shared by FX-E (svgStroke) and FX-K (inkDraw).
  // Uses ResizeObserver on the outer wrapper div.
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

  // FX-E: manage strokeDashoffset via ref to guarantee the hidden state is
  // painted before any transition fires (same pattern as TextArea/TextField).
  const svgRectRef = React.useRef<SVGRectElement>(null);
  const svgRectInitializedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const rect = svgRectRef.current;
    if (!rect || svgSize.w === 0 || !config.svgStroke) return;
    const ccw = config.svgStroke.drawDirection === "counterclockwise";
    const hiddenOffset = String(ccw ? -svgSize.perimeter : svgSize.perimeter);
    if (!svgRectInitializedRef.current) {
      rect.style.strokeDashoffset = hiddenOffset;
      svgRectInitializedRef.current = true;
      if (focusWithin) {
        requestAnimationFrame(() => { rect.style.strokeDashoffset = "0"; });
      }
      return;
    }
    rect.style.strokeDashoffset = focusWithin ? "0" : hiddenOffset;
  }, [svgSize.perimeter, focusWithin, config.svgStroke]);

  // ---------------------------------------------------------------------------
  // FX-I: Cursor spotlight — imperative DOM updates, no React re-renders
  // ---------------------------------------------------------------------------

  const spotlightLayerRef = React.useRef<HTMLDivElement>(null);

  const handleSpotlightMove = (e: React.PointerEvent<HTMLElement>) => {
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

  const glowUncontained = glow && config.glow && config.glow.contained === false;

  const needsOuterWrapper =
    (svgStroke && !!config.svgStroke) ||
    !!glowUncontained ||
    (chromaBorder && !!config.chromaBorder) ||
    (corners && !!config.corners) ||
    (inkDraw && !!config.inkDraw) ||
    (ripple && config.ripple?.variant === "pulse-rings");

  // FX-L: morph border-radius applied to the Group element.
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
    <AriaNumberField
      {...props}
      {...(isRequired !== undefined ? { isRequired } : {})}
      {...(isInvalid  !== undefined ? { isInvalid  } : {})}
      {...(isReadOnly !== undefined ? { isReadOnly } : {})}
      className={cn(config.root)}
      data-focused={focusWithin || undefined}
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
        Outer wrapper — positioning context for SVG FX (stroke, ink), chroma
        border, ornamental corners, pulse rings, and the uncontained glow.
      */}
      <div
        ref={outerWrapperRef}
        style={needsOuterWrapper ? { position: "relative", isolation: "isolate" } : undefined}
      >
        {/* FX-M: Chroma border */}
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
          return (
            <svg
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 1, overflow: "visible",
              }}
            >
              <rect
                ref={svgRectRef}
                x={hw} y={hw}
                width={Math.max(0, w - strokeWidth)}
                height={Math.max(0, h - strokeWidth)}
                rx={ss.rx ?? 6}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={perimeter}
                style={{
                  transition: `stroke-dashoffset ${duration}ms ${easing}, stroke ${Math.round(duration * 0.4)}ms ease-out`,
                }}
              />
            </svg>
          );
        })()}

        {/* FX-K: Ink draw */}
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
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 1, overflow: "visible",
                transform: svgRotation, transformOrigin: "center",
              }}
            >
              <path d={pathD} fill="none" stroke={strokeColor}
                strokeWidth={strokeWidth * 2} strokeOpacity={0.22}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={perimeter} strokeDashoffset={dashOffset}
                style={{ transition }}
              />
              <path d={pathD} fill="none" stroke={strokeColor}
                strokeWidth={strokeWidth * 0.75}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={perimeter} strokeDashoffset={dashOffset}
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
              position: "absolute", pointerEvents: "none", zIndex: 2,
              width: length, height: length,
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

        {/* FX-H: Pulse rings */}
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

        {/* FX-C (uncontained): body glow bleeds outside the Group */}
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

        {/*
          Group — the visible field border. React Aria renders this as a div and
          forwards all standard HTML props, so style, onPointerMove, etc. work.
        */}
        <Group
          className={cn(
            config.group,
            sizeConfig.height,
            bgReveal && config.bgReveal && "mr-tf-bgr",
            corners && config.corners && "group-data-[focused]:!border-transparent group-data-[focused]:!ring-0 group-data-[focused]:!shadow-none",
          )}
          {...(morphRadiusStyle || (gradientBorder && config.gradientBorder) ? {
            style: morphRadiusStyle
              ? { ...morphRadiusStyle, ...((gradientBorder && config.gradientBorder) ? { isolation: "isolate" as const } : {}) }
              : { isolation: "isolate" as const },
          } : {})}
          {...(cursorSpotlight && config.cursorSpotlight ? {
            onPointerMove: handleSpotlightMove,
            onPointerLeave: handleSpotlightLeave,
          } : {})}
        >
          {/* FX-I: Cursor spotlight */}
          {cursorSpotlight && config.cursorSpotlight && (
            <div ref={spotlightLayerRef} aria-hidden="true" className="mr-tf-spotlight" />
          )}

          {/* FX-D: Gradient border ring */}
          {gradientBorder && config.gradientBorder && (() => {
            const gb = config.gradientBorder!;
            const stops = isInvalid && gb.invalidStops ? gb.invalidStops : gb.stops;
            return (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute", inset: 0,
                  border: `${gb.width ?? 2}px solid transparent`,
                  borderRadius: gb.radius ?? 6,
                  pointerEvents: "none", zIndex: 1,
                  backgroundImage: buildLinearGradient(stops),
                  backgroundSize: "400% 100%",
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

          {/* FX-C (contained): glow clipped to Group bounds */}
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

          {/* FX-H: Ripple wave — mounts fresh on focus so animation replays */}
          {ripple && config.ripple && config.ripple.variant === "ripple" && focusWithin && (
            <div aria-hidden="true" className="mr-tf-ripple-wave" />
          )}

          {/* FX-H: Pulse-bg — always in DOM, driven by group-data-[focused] */}
          {ripple && config.ripple && config.ripple.variant === "pulse-bg" && (
            <div aria-hidden="true" className="mr-tf-pulse-bg-layer" />
          )}

          <Input
            className={cn(config.input, sizeConfig.fontSize, sizeConfig.paddingLeft)}
          />

          <div className={cn(config.stepperColumn, sizeConfig.stepperWidth)}>
            <Button slot="increment" className={cn(config.stepperButton)}>
              <ChevronUpIcon />
            </Button>
            <Button slot="decrement" className={cn(config.stepperButton, config.stepperSeparator)}>
              <ChevronDownIcon />
            </Button>
          </div>
        </Group>
      </div>

      {description != null && (
        <Text slot="description" className={cn(config.description)}>
          {description}
        </Text>
      )}

      <FieldError className={cn(config.error)}>{errorMessage}</FieldError>
    </AriaNumberField>
  );
}
