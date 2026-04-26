"use client";

import * as React from "react";
import {
  Select,
  Label,
  Button,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Section,
  Header,
  FieldError,
  Text,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { SelectFieldConfig, SelectFieldSize } from "../theme/types";
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
  useListPopoverStyles,
  CHROMA_DEFAULTS,
} from "../utils/fx";

export const defaultSelectFieldConfig: SelectFieldConfig =
  defaultTheme.components.selectField;

// ---------------------------------------------------------------------------
// Config context — consumed by SelectItem / SelectSection
// ---------------------------------------------------------------------------

const SelectConfigContext = React.createContext<SelectFieldConfig>(
  defaultSelectFieldConfig,
);

// ---------------------------------------------------------------------------
// Internal icons
// ---------------------------------------------------------------------------

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 14, height: 14, display: "block" }}
    >
      <polyline points="4 6 8 10 12 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 12, height: 12, display: "block", flexShrink: 0 }}
    >
      <polyline points="2.5 8 6 11.5 13.5 4.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Public sub-components
// ---------------------------------------------------------------------------

export type SelectItemProps = Omit<ListBoxItemProps, "className" | "children"> & {
  children: React.ReactNode;
};

/** A styled option inside a <SelectField>. Uses config from context. */
export function SelectItem({ children, ...props }: SelectItemProps) {
  const config = React.useContext(SelectConfigContext);
  const text =
    props.textValue ?? (typeof children === "string" ? children : undefined);
  return (
    <ListBoxItem
      {...props}
      {...(text !== undefined ? { textValue: text } : {})}
      className={({ isFocused, isHovered, isSelected, isDisabled }) =>
        cn(
          config.item,
          (isFocused || isHovered) && config.itemFocused,
          isSelected && config.itemSelected,
          isDisabled && config.itemDisabled,
        )
      }
    >
      {({ isSelected }) => (
        <>
          <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {children}
          </span>
          {isSelected && <CheckIcon />}
        </>
      )}
    </ListBoxItem>
  );
}

export type SelectSectionProps = {
  /** Optional group label rendered above the items. */
  header?: React.ReactNode;
  children: React.ReactNode;
};

/** A labelled group of options inside a <SelectField>. */
export function SelectSection({ header, children }: SelectSectionProps) {
  const config = React.useContext(SelectConfigContext);
  return (
    <Section>
      {header != null && (
        <Header className={config.sectionHeader}>{header}</Header>
      )}
      {children}
    </Section>
  );
}

/** A visual divider between groups of items. */
export function SelectSeparator() {
  const config = React.useContext(SelectConfigContext);
  return <div role="separator" aria-hidden="true" className={config.separator} />;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SelectFieldProps = {
  config?: SelectFieldConfig;
  /** Label text rendered above the trigger. */
  label?: React.ReactNode;
  /** Hint text rendered below the label. */
  description?: React.ReactNode;
  /** Size variant. @default "md" */
  size?: SelectFieldSize;
  /**
   * Option items. Pass <SelectItem> children for static lists, or pass
   * `items` + a render function for dynamic lists.
   */
  children?: React.ReactNode;
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
  /** Enables the cursor spotlight (FX-I). Requires `config.cursorSpotlight`. */
  cursorSpotlight?: boolean;
  /** Enables the background colour reveal (FX-G). Requires `config.bgReveal`. */
  bgReveal?: boolean;
  /**
   * Enables the ripple / pulse effect (FX-H). Variant selected via
   * `config.ripple.variant`. Requires `config.ripple`.
   */
  ripple?: boolean;
  /** Enables the morphing border-radius effect (FX-L). Requires `config.morphRadius`. */
  morphRadius?: boolean;
  /** Enables the chroma border effect (FX-M). Requires `config.chromaBorder`. */
  chromaBorder?: boolean;
} & Omit<
  AriaSelectProps<object>,
  "className" | "style" | "children" | "placeholder"
> & {
  /** Placeholder text shown when nothing is selected. */
  placeholder?: string;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SelectField({
  config = defaultSelectFieldConfig,
  label,
  description,
  size = "md",
  children,
  glow = false,
  gradientBorder = false,
  svgStroke = false,
  inkDraw = false,
  corners = false,
  cursorSpotlight = false,
  bgReveal = false,
  ripple = false,
  morphRadius = false,
  chromaBorder = false,
  isRequired,
  isInvalid,
  placeholder,
  errorMessage,
  onOpenChange: onOpenChangeProp,
  ...props
}: SelectFieldProps) {
  const sizeConfig = config.size[size];

  useListPopoverStyles();
  useGlowStyles();
  useGradientBorderStyles();
  useCursorSpotlightStyles();
  useBgRevealStyles();
  useRippleStyles();
  useChromaBorderStyles();

  // Track open state for FX effects — when the popover is open the FX should
  // remain active even though the trigger button no longer has DOM focus.
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChangeProp?.(open);
    },
    [onOpenChangeProp],
  );

  // Track trigger-button focus separately so FX also show when keyboard-
  // navigating to the trigger without opening the dropdown.
  const [triggerFocused, setTriggerFocused] = React.useState(false);

  // effectiveFocus drives all FX opacity/animation: true when the trigger is
  // focused OR when the popover is open.
  const effectiveFocus = triggerFocused || isOpen;

  // FX-E / FX-K: measure the outer wrapper for SVG path sizing.
  const outerWrapperRef = React.useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = React.useState({ w: 0, h: 0, perimeter: 0 });

  // FX-I: cursor spotlight — update DOM directly, zero re-renders.
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

  // FX-L: morph border-radius on focus/open.
  const morphRadiusStyle: React.CSSProperties | undefined =
    morphRadius && config.morphRadius
      ? {
          borderRadius: effectiveFocus
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

  // Corners suppress the CSS-driven focus border/ring so only brackets show.
  const cornersSuppressClasses =
    corners && config.corners
      ? "group-data-[focused]:!border-transparent group-data-[focused]:!ring-0 group-data-[open]:!border-transparent group-data-[open]:!ring-0"
      : "";

  return (
    <SelectConfigContext.Provider value={config}>
      <Select
        {...props}
        {...(isRequired !== undefined ? { isRequired } : {})}
        {...(isInvalid !== undefined ? { isInvalid } : {})}
        className={cn(config.root)}
        onOpenChange={handleOpenChange}
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

        {/* Outer wrapper — positioning context for FX overlays */}
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
                  opacity:    effectiveFocus ? (gb.opacity ?? 0.9) : 0,
                  transition: `opacity ${gb.fadeIn ?? 200}ms ease-out`,
                  animation:          `mr-tf-gb-flow ${gb.duration ?? 4}s linear infinite`,
                  animationPlayState: effectiveFocus ? "running" : "paused",
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
                  opacity:    effectiveFocus ? opacity : 0,
                  transition: `opacity ${fadeIn}ms ease-out`,
                  animation:  isFlow
                    ? `mr-tf-cb-flow ${duration}ms ease-in-out infinite`
                    : `mr-tf-cb-hue ${duration}ms linear infinite`,
                  animationPlayState: effectiveFocus ? "running" : "paused",
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
            const dashOffset = effectiveFocus ? 0 : ccw ? -perimeter : perimeter;
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
            const dashOffset = effectiveFocus ? 0 : perimeter;
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

          {/* FX-F: ornamental corners */}
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
                  <div aria-hidden="true" style={{ ...base, top: inset, left: inset, borderTop: border, borderLeft: border, transformOrigin: "top left", transform: effectiveFocus ? focused : `translate(${-offset}px, ${-offset}px) scale(0)` }} />
                  <div aria-hidden="true" style={{ ...base, top: inset, right: inset, borderTop: border, borderRight: border, transformOrigin: "top right", transform: effectiveFocus ? focused : `translate(${offset}px, ${-offset}px) scale(0)` }} />
                  <div aria-hidden="true" style={{ ...base, bottom: inset, left: inset, borderBottom: border, borderLeft: border, transformOrigin: "bottom left", transform: effectiveFocus ? focused : `translate(${-offset}px, ${offset}px) scale(0)` }} />
                  <div aria-hidden="true" style={{ ...base, bottom: inset, right: inset, borderBottom: border, borderRight: border, transformOrigin: "bottom right", transform: effectiveFocus ? focused : `translate(${offset}px, ${offset}px) scale(0)` }} />
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
                <div aria-hidden="true" style={{ ...splitBase, left: 0, transformOrigin: "right center", transform: effectiveFocus ? "scaleX(1)" : "scaleX(0)" }} />
                <div aria-hidden="true" style={{ ...splitBase, right: 0, transformOrigin: "left center", transform: effectiveFocus ? "scaleX(1)" : "scaleX(0)" }} />
              </>
            );
          })()}

          {/* FX-H: pulse rings (outside trigger) */}
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

          {/* ----------------------------------------------------------------
              Trigger button
          ---------------------------------------------------------------- */}
          <Button
            className={cn(
              config.trigger,
              sizeConfig.height,
              bgReveal && config.bgReveal && "mr-tf-bgr",
              cornersSuppressClasses,
            )}
            {...(morphRadiusStyle ? { style: morphRadiusStyle } : {})}
            onFocus={() => setTriggerFocused(true)}
            onBlur={() => setTriggerFocused(false)}
            onPointerMove={cursorSpotlight && config.cursorSpotlight ? handleSpotlightMove : undefined}
            onPointerLeave={cursorSpotlight && config.cursorSpotlight ? handleSpotlightLeave : undefined}
          >
            {/* FX-I: cursor spotlight */}
            {cursorSpotlight && config.cursorSpotlight && (
              <div ref={spotlightLayerRef} aria-hidden="true" className="mr-tf-spotlight" />
            )}

            {/* FX-H: ripple wave (plays once per focus / press) */}
            {ripple && config.ripple && config.ripple.variant === "ripple" && effectiveFocus && (
              <div aria-hidden="true" className="mr-tf-ripple-wave" />
            )}
            {/* FX-H: pulse-bg */}
            {ripple && config.ripple && config.ripple.variant === "pulse-bg" && (
              <div aria-hidden="true" className="mr-tf-pulse-bg-layer" />
            )}

            {/* Selected value / placeholder */}
            <SelectValue style={{ display: "contents" }}>
              {({ isPlaceholder, defaultChildren }) => (
                <span
                  className={cn(
                    sizeConfig.fontSize,
                    sizeConfig.paddingLeft,
                    isPlaceholder ? config.placeholder : config.valueText,
                  )}
                  style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}
                >
                  {isPlaceholder ? (placeholder ?? "Select…") : defaultChildren}
                </span>
              )}
            </SelectValue>

            {/* Chevron */}
            <span className={cn(config.chevron, sizeConfig.chevronWidth)} aria-hidden="true">
              <ChevronDownIcon />
            </span>
          </Button>
        </div>

        {description != null && (
          <Text slot="description" className={cn(config.description)}>
            {description}
          </Text>
        )}

        <FieldError className={cn(config.error)}>
          {errorMessage}
        </FieldError>

        {/* Dropdown popover */}
        <Popover className={config.popover}>
          <ListBox className={config.listBox}>
            {children}
          </ListBox>
        </Popover>
      </Select>
    </SelectConfigContext.Provider>
  );
}
