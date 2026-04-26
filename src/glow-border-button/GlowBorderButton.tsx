"use client";

import * as React from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { defaultTheme } from "../theme/defaults";
import { RollingText } from "../rolling-text/RollingText";
import { useContentRaiseStyles } from "../utils/content-raise";
import { useLiftStyles } from "../utils/lift";
import type { GlowBorderButtonConfig } from "../theme/types";

/** Ready-to-use default config — spread and override individual keys for one-off variants. */
export const defaultGlowBorderButtonConfig: GlowBorderButtonConfig =
  defaultTheme.components.glowBorderButton;

// ---------------------------------------------------------------------------
// Shared style injection
//
// One <style> block for the entire app lifetime. Keyframes are universal —
// per-instance config flows through CSS custom properties set on the button
// element itself and computed inline styles on each child layer div.
// ---------------------------------------------------------------------------

const SHARED_STYLES = `
  @keyframes gfBorderFlow {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  @keyframes gfGlowPulse {
    0%,  100% { opacity: calc(var(--gf-glow-opacity) * 0.6); transform: scale(1);    }
    50%        { opacity: var(--gf-glow-opacity);             transform: scale(1.05); }
  }
  @keyframes gfSpin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  [data-gf-btn] {
    -webkit-tap-highlight-color: transparent;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    transition: opacity 0.3s ease, transform 0.1s ease;
  }
  [data-gf-btn][data-pressed]:not([disabled]) {
    transform: scale(0.97);
  }
  [data-gf-btn][data-focus-visible] {
    outline: var(--gf-focus-width) solid var(--gf-focus-color);
    outline-offset: var(--gf-focus-offset);
    border-radius: var(--gf-border-radius);
  }
`;

let globalStylesInjected = false;

function useSharedStyles() {
  React.useInsertionEffect(() => {
    if (globalStylesInjected) return;
    globalStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-myriad-gf", "");
    el.textContent = SHARED_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export type GlowBorderButtonProps = Omit<AriaButtonProps, "className" | "style"> & {
  /**
   * Visual config. Defaults to the library's built-in sunset palette.
   * Pass a value from your app theme or spread + override for one-off variants.
   */
  config?: GlowBorderButtonConfig;
  /** Icon rendered before the label. */
  iconStart?: React.ReactNode;
  /** Icon rendered after the label. */
  iconEnd?: React.ReactNode;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
  /** Stretches the button to fill its container. */
  fullWidth?: boolean;
  /**
   * Animates each character with a slot-machine roll on hover.
   * Only applies when children is a plain string.
   */
  rollingText?: boolean;
  /**
   * On hover, iconStart shifts left and iconEnd shifts right — spreading
   * away from the label to signal interactivity.
   */
  contentRaise?: boolean;
  /**
   * On hover, the button scales up slightly — as if rising to meet the user.
   * Snaps back down on press.
   */
  lift?: boolean;
  /**
   * When loading becomes true, content rolls up and the spinner rolls in
   * from below — slot-machine style. When loading returns to false, the
   * content rolls back in. Button width is always determined by the content.
   */
  rollToLoading?: boolean;
  /**
   * Transparent-surface mode — only the glowing border ring is rendered,
   * with no filled interior. Equivalent to setting surface.transparent: true
   * and border.opacity: 1 in the config.
   */
  outline?: boolean;
  children?: React.ReactNode;
};

export function GlowBorderButton({
  config = defaultGlowBorderButtonConfig,
  iconStart,
  iconEnd,
  loading = false,
  fullWidth = false,
  rollingText = false,
  contentRaise = false,
  lift = false,
  rollToLoading = false,
  outline = false,
  children,
  isDisabled,
  ...ariaProps
}: GlowBorderButtonProps) {
  useSharedStyles();
  useContentRaiseStyles();
  useLiftStyles();

  const [hovered, setHovered] = React.useState(false);

  const { colors, border, glow, surface, content, focus } = config;
  const isInert = isDisabled === true || loading;

  // Gradient strings — first stop repeated at the end for a seamless loop.
  const gradientStops  = [...colors.stops, colors.stops[0]].join(", ");
  const flowingGradient = `linear-gradient(90deg, ${gradientStops})`;
  const glowGradient    = `linear-gradient(135deg, ${colors.stops.join(", ")})`;

  // Concentric border radii.
  //
  // outerRadius  — border strip outer edge (extends border.width outside button)
  // border.radius — dark cutout sits at the button's edge (inset cancels), so
  //                 it must match the button radius exactly to avoid corner bleed
  // surfaceRadius — inner surface is border.width inside the button, so the
  //                 parallel-offset curve is R - W
  const outerRadius  = border.radius + border.width;
  const surfaceRadius = Math.max(0, border.radius - border.width);

  // Hover intensifies the glow and border opacity, then eases back.
  const baseBorderOpacity   = outline ? 1 : border.opacity;
  const activeBorderOpacity = hovered && !isInert ? Math.min(1, baseBorderOpacity * 1.2) : baseBorderOpacity;
  const activeGlowOpacity   = hovered && !isInert ? Math.min(1, glow.opacity * 1.6)   : glow.opacity;

  const isTransparent = outline || surface.transparent === true;

  return (
    <AriaButton
      data-gf-btn=""
      {...ariaProps}
      {...(lift && !isInert ? { className: "mr-lift" } : {})}
      isDisabled={isInert}
      aria-busy={loading || undefined}
      onHoverChange={(h) => setHovered(h)}
      style={{
        // CSS custom properties — referenced by shared CSS rules and keyframes.
        "--gf-glow-opacity":  String(activeGlowOpacity),
        "--gf-focus-color":   focus.color,
        "--gf-focus-width":   `${focus.width}px`,
        "--gf-focus-offset":  `${focus.offset}px`,
        "--gf-border-radius": `${border.radius}px`,
        // Layout
        position:    "relative",
        display:     fullWidth ? "flex" : "inline-flex",
        alignItems:  "center",
        justifyContent: "center",
        width:       fullWidth ? "100%" : undefined,
        cursor:      isInert ? "not-allowed" : "pointer",
        borderRadius: border.radius,
        overflow:    "visible",
        isolation:   "isolate",
        zIndex:      0,
        opacity:     isInert ? 0.55 : 1,
      } as React.CSSProperties}
    >
      {/* ── Layer 1: Blurred glow halo ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          inset:        glow.inset,
          borderRadius: border.radius + glow.inset,
          pointerEvents: "none",
          zIndex:       -3,
          filter:       `blur(${glow.blur}px)`,
          background:   glowGradient,
          animation:    `gfGlowPulse ${glow.duration}s ease-in-out infinite`,
          transition:   "opacity 0.5s ease",
        }}
      />

      {/* ── Layer 2: Animated gradient border strip ────────────────────────── */}
      {isTransparent ? (
        // Transparent/outline mode — CSS mask clips the gradient to just the
        // border ring. The element sits at inset:0 with a real CSS border of
        // border.width px, which establishes the border-box vs padding-box
        // boundary used by the mask. No child hole-puncher needed.
        <div
          aria-hidden="true"
          style={{
            position:            "absolute",
            inset:               0,
            borderRadius:        outerRadius,
            border:              `${border.width}px solid transparent`,
            pointerEvents:       "none",
            zIndex:              -1,
            background:          flowingGradient,
            backgroundSize:      "400% 100%",
            animation:           `gfBorderFlow ${border.duration}s linear infinite`,
            opacity:             activeBorderOpacity,
            transition:          "opacity 0.4s ease",
            // Mask: border-box (full outer area) minus padding-box (interior)
            // = only the border ring. Works in all modern engines.
            WebkitMaskImage:     "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            WebkitMaskClip:      "border-box, padding-box",
            WebkitMaskComposite: "destination-out",
            maskImage:           "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
            maskClip:            "border-box, padding-box",
            maskComposite:       "exclude",
          } as React.CSSProperties}
        />
      ) : (
        // Normal mode — full gradient div with an opaque child that paints
        // over the interior, leaving only the border ring visible.
        <div
          aria-hidden="true"
          style={{
            position:       "absolute",
            inset:          -border.width,
            borderRadius:   outerRadius,
            pointerEvents:  "none",
            zIndex:         -1,
            background:     flowingGradient,
            backgroundSize: "400% 100%",
            animation:      `gfBorderFlow ${border.duration}s linear infinite`,
            opacity:        activeBorderOpacity,
            transition:     "opacity 0.4s ease",
          }}
        >
          {/* Dark fill — punches a hole through the gradient strip, leaving only the ring.
              Uses border.radius (not surfaceRadius) because inset: border.width inside
              the strip cancels out to sit exactly at the button's edge. */}
          <div
            style={{
              position:     "absolute",
              inset:        border.width,
              borderRadius: border.radius,
              background:   surface.bg,
            }}
          />
        </div>
      )}

      {/* ── Layer 3: Inner surface — skipped in transparent mode ───────────── */}
      {!isTransparent && (
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         border.width,
            borderRadius:  surfaceRadius,
            overflow:      "hidden",
            pointerEvents: "none",
            zIndex:        0,
          }}
        >
          {/* Dark base with backdrop blur — the "glass" effect. */}
          <div
            style={{
              position:       "absolute",
              inset:          0,
              background:     surface.bg,
              backdropFilter: `blur(${surface.backdropBlur}px)`,
            }}
          />
          {/* Animated color wash — gradient at low opacity drifts over the surface. */}
          <div
            style={{
              position:       "absolute",
              inset:          0,
              background:     flowingGradient,
              backgroundSize: "400% 100%",
              animation:      `gfBorderFlow ${surface.washDuration}s linear infinite`,
              opacity:        surface.washOpacity,
              transition:     "opacity 0.5s ease",
            }}
          />
          {/* Top edge highlight — subtle light streak along the top rim. */}
          <div
            style={{
              position:   "absolute",
              top:        0,
              left:       "8%",
              right:      "8%",
              height:     1,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${surface.highlightOpacity}), transparent)`,
              transition: "background 0.4s ease",
            }}
          />
        </div>
      )}

      {/* ── Layer 4: Content ──────────────────────────────────────────────── */}
      <div
        style={{
          position:      "relative",
          zIndex:        3,
          display:       "flex",
          alignItems:    "center",
          gap:           content.gap,
          padding:       content.padding,
          fontFamily:    content.fontFamily,
          fontWeight:    content.fontWeight,
          fontSize:      content.fontSize,
          letterSpacing: content.letterSpacing,
          lineHeight:    1,
          whiteSpace:    "nowrap",
          userSelect:    "none",
          color:         content.color,
          willChange:    "transform",
        }}
      >
        {rollToLoading ? (
          // Slot-machine: content rolls up, spinner rolls in from below.
          // Both slots always in DOM so button width = content width always.
          //
          // The clip is display:block (not flex) so the slide column is a plain
          // block child with its natural 2em height. A flex clip would stretch or
          // shrink the column to 1em, making each slot 0.5em and the animation
          // stall exactly halfway.
          <div style={{ overflow: "hidden", height: "1em" }}>
            <div
              style={{
                display:       "flex",
                flexDirection: "column",
                transition:    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                transform:     loading ? "translateY(-1em)" : "translateY(0)",
              }}
            >
              {/* Content slot */}
              <div style={{ height: "1em", flexShrink: 0, display: "flex", alignItems: "center", gap: content.gap }}>
                {iconStart && (
                  <span aria-hidden="true" className={contentRaise ? "mr-raise-start" : undefined}>
                    {iconStart}
                  </span>
                )}
                {rollingText && typeof children === "string"
                  ? <RollingText>{children}</RollingText>
                  : children}
                {iconEnd && (
                  <span aria-hidden="true" className={contentRaise ? "mr-raise-end" : undefined}>
                    {iconEnd}
                  </span>
                )}
              </div>
              {/* Spinner slot — paused until loading so it doesn't spin needlessly */}
              <div
                aria-hidden="true"
                style={{ height: "1em", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <GlowSpinner size={content.fontSize} color={content.color} playing={loading} />
              </div>
            </div>
          </div>
        ) : (
          // Normal loading: spinner overlaid absolutely so button width is
          // always determined by content (no layout shift on loading).
          <>
            {loading && (
              <div
                aria-hidden="true"
                style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  pointerEvents:  "none",
                }}
              >
                <GlowSpinner size={content.fontSize} color={content.color} />
              </div>
            )}
            <span
              style={loading ? {
                display:       "flex",
                alignItems:    "center",
                gap:           content.gap,
                opacity:       0,
                pointerEvents: "none",
              } : CONTENTS_STYLE}
            >
              {iconStart && (
                <span aria-hidden="true" className={contentRaise ? "mr-raise-start" : undefined}>
                  {iconStart}
                </span>
              )}
              {rollingText && typeof children === "string"
                ? <RollingText>{children}</RollingText>
                : children}
              {iconEnd && (
                <span aria-hidden="true" className={contentRaise ? "mr-raise-end" : undefined}>
                  {iconEnd}
                </span>
              )}
            </span>
          </>
        )}
      </div>
    </AriaButton>
  );
}

// ---------------------------------------------------------------------------
// Spinner — internal only
// ---------------------------------------------------------------------------

const CONTENTS_STYLE: React.CSSProperties = {
  display: "contents",
};

function GlowSpinner({ size, color, playing = true }: { size: number; color: string; playing?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{
        width:       size,
        height:      size,
        flexShrink:  0,
        animation:          "gfSpin 1s linear infinite",
        animationPlayState: playing ? "running" : "paused",
      }}
    >
      <circle
        style={{ opacity: 0.25 }}
        cx="12" cy="12" r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        style={{ opacity: 0.75 }}
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
