/**
 * Shared FX utilities for @myriad-ui/core components.
 *
 * CSS injection hooks use module-level boolean guards so keyframes are inserted
 * at most once per app regardless of how many component instances call them.
 * Helper functions are pure and have no component coupling.
 */

import * as React from "react";

// ---------------------------------------------------------------------------
// Gradient helpers
// ---------------------------------------------------------------------------

/** Builds a looping linear gradient string from an array of colour stops. */
export function buildLinearGradient(stops: string[]): string {
  const looped = [...stops, stops[0]];
  return `linear-gradient(90deg, ${looped.join(", ")})`;
}

/** Builds a looping conic gradient string from an array of colour stops. */
export function buildConicGradient(stops: string[]): string {
  const looped = [...stops, stops[0]];
  return `conic-gradient(from 0deg, ${looped.join(", ")})`;
}

// ---------------------------------------------------------------------------
// SVG path helpers
// ---------------------------------------------------------------------------

/**
 * Builds the SVG path for FX-K (ink draw). Traces a clockwise rounded rect
 * starting at the top-left corner. Each corner's quadratic bezier control
 * point is nudged outward by `wobble` px for a hand-drawn feel.
 */
export function buildInkPath(
  w: number,
  h: number,
  rx: number,
  wobble: number,
): string {
  const o = wobble;
  return [
    `M ${rx} 0`,
    `L ${w - rx} 0`,
    `Q ${w + o} ${-o * 0.6} ${w} ${rx}`,
    `L ${w} ${h - rx}`,
    `Q ${w + o * 0.6} ${h + o} ${w - rx} ${h}`,
    `L ${rx} ${h}`,
    `Q ${-o} ${h + o * 0.6} ${0} ${h - rx}`,
    `L 0 ${rx}`,
    `Q ${-o * 0.6} ${-o} ${rx} 0`,
  ].join(" ");
}

// ---------------------------------------------------------------------------
// FX-C: Glow
// ---------------------------------------------------------------------------

const GLOW_STYLES = `
  .mr-tf-glow {
    position: absolute;
    inset: calc(-1 * var(--tf-gw-spread, 5px));
    border-radius: var(--tf-gw-radius, 10px);
    overflow: hidden;
    opacity: 0;
    transition: opacity var(--tf-gw-dur, 250ms) ease-out;
    pointer-events: none;
    z-index: -1;
  }
  .group[data-focused] .mr-tf-glow {
    opacity: var(--tf-gw-opacity, 1);
  }
  .mr-tf-glow-layer {
    position: absolute;
    inset: 0;
    background: var(--tf-gw-color, rgba(249, 115, 22, 0.35));
    filter: blur(var(--tf-gw-blur, 8px));
  }
  .mr-tf-glow-layer-rotating {
    position: absolute;
    inset: -150%;
    animation: mr-tf-glow-spin var(--tf-gw-spin-dur, 4s) linear infinite;
    animation-play-state: paused;
    filter: blur(var(--tf-gw-blur, 8px));
  }
  .group[data-focused] .mr-tf-glow-layer-rotating {
    animation-play-state: running;
  }
  .mr-tf-glow-mask {
    position: absolute;
    inset: var(--tf-gw-spread, 5px);
    border-radius: max(0px, calc(var(--tf-gw-radius, 10px) - var(--tf-gw-spread, 5px)));
    background: var(--tf-gw-mask-bg, transparent);
    z-index: 1;
  }
  .mr-tf-glow-body-wrapper {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--tf-gw-dur, 250ms) ease-out;
    filter: blur(var(--tf-gw-blur, 8px));
  }
  .group[data-focused] .mr-tf-glow-body-wrapper {
    opacity: var(--tf-gw-opacity, 1);
  }
  .mr-tf-glow-body-clip {
    position: absolute;
    inset: calc(-1 * var(--tf-gw-spread, 5px));
    border-radius: var(--tf-gw-radius, 10px);
    overflow: hidden;
  }
  .mr-tf-glow-body-clip .mr-tf-glow-layer,
  .mr-tf-glow-body-clip .mr-tf-glow-layer-rotating {
    filter: none;
  }
  @keyframes mr-tf-glow-spin {
    to { transform: rotate(1turn); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-glow-layer-rotating { animation: none; }
  }
`;

let glowStylesInjected = false;

export function useGlowStyles() {
  React.useInsertionEffect(() => {
    if (glowStylesInjected) return;
    glowStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-glow", "");
    el.textContent = GLOW_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-D: Gradient border
// ---------------------------------------------------------------------------

const GRADIENT_BORDER_STYLES = `
  @keyframes mr-tf-gb-flow {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
`;

let gradientBorderStylesInjected = false;

export function useGradientBorderStyles() {
  React.useInsertionEffect(() => {
    if (gradientBorderStylesInjected) return;
    gradientBorderStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-gb", "");
    el.textContent = GRADIENT_BORDER_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-G: Background reveal
// ---------------------------------------------------------------------------

const BG_REVEAL_STYLES = `
  .mr-tf-bgr {
    background-image: linear-gradient(var(--tf-bgr-color, rgba(249,115,22,0.07)) 0 0);
    background-repeat: no-repeat;
    background-size: 0% 100%;
    background-position: var(--tf-bgr-x, left) center;
    transition: background-size var(--tf-bgr-dur, 300ms) ease-out;
  }
  .group[data-focused] .mr-tf-bgr {
    background-size: 100% 100%;
  }
  .group[data-invalid] .mr-tf-bgr {
    background-image: linear-gradient(var(--tf-bgr-invalid-color, rgba(239,68,68,0.07)) 0 0);
  }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-bgr { transition: none; }
  }
`;

let bgRevealStylesInjected = false;

export function useBgRevealStyles() {
  React.useInsertionEffect(() => {
    if (bgRevealStylesInjected) return;
    bgRevealStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-bgr", "");
    el.textContent = BG_REVEAL_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-H: Ripple / pulse
// ---------------------------------------------------------------------------

const RIPPLE_STYLES = `
  @keyframes mr-tf-ripple {
    0%   { transform: scale(0); opacity: 1; }
    100% { transform: scale(var(--tf-rp-max-scale, 2)); opacity: 0; }
  }
  .mr-tf-ripple-wave {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--tf-rp-color, rgba(249, 115, 22, 0.2));
    pointer-events: none;
    user-select: none;
    animation: mr-tf-ripple var(--tf-rp-dur, 600ms) ease-out forwards;
  }
  @keyframes mr-tf-pulse-ring {
    0%   { transform: scale(1); opacity: 1; }
    100% { transform: scale(var(--tf-rp-max-scale, 1.2)); opacity: 0; }
  }
  .mr-tf-pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: var(--tf-rp-radius, 6px);
    border: 1.5px solid var(--tf-rp-color, rgba(249, 115, 22, 0.45));
    pointer-events: none;
    user-select: none;
    opacity: 0;
  }
  .group[data-focused] .mr-tf-pulse-ring {
    animation: mr-tf-pulse-ring var(--tf-rp-dur, 1500ms) ease-out infinite;
  }
  @keyframes mr-tf-pulse-bg {
    0%, 100% { opacity: 0; }
    50%       { opacity: 1; }
  }
  .mr-tf-pulse-bg-layer {
    position: absolute;
    inset: 0;
    background: var(--tf-rp-color, rgba(249, 115, 22, 0.08));
    pointer-events: none;
    user-select: none;
    opacity: 0;
  }
  .group[data-focused] .mr-tf-pulse-bg-layer {
    animation: mr-tf-pulse-bg var(--tf-rp-dur, 2000ms) ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-ripple-wave,
    .mr-tf-pulse-ring,
    .mr-tf-pulse-bg-layer { animation: none !important; opacity: 0 !important; }
  }
`;

let rippleStylesInjected = false;

export function useRippleStyles() {
  React.useInsertionEffect(() => {
    if (rippleStylesInjected) return;
    rippleStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-rp", "");
    el.textContent = RIPPLE_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-I: Cursor spotlight
// ---------------------------------------------------------------------------

const CURSOR_SPOTLIGHT_STYLES = `
  .mr-tf-spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    user-select: none;
    background: radial-gradient(
      circle var(--tf-cs-radius, 80px) at var(--tf-cs-x, 50%) var(--tf-cs-y, 50%),
      var(--tf-cs-color, rgba(249, 115, 22, 0.12)),
      transparent
    );
    opacity: 0;
    transition: opacity var(--tf-cs-fade, 300ms) ease-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-spotlight { display: none; }
  }
`;

let cursorSpotlightStylesInjected = false;

export function useCursorSpotlightStyles() {
  React.useInsertionEffect(() => {
    if (cursorSpotlightStylesInjected) return;
    cursorSpotlightStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-cs", "");
    el.textContent = CURSOR_SPOTLIGHT_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-J: Character reveal (TextField-specific)
// ---------------------------------------------------------------------------

const CHARACTER_REVEAL_STYLES = `
  .mr-tf-char-input {
    color: transparent !important;
    caret-color: var(--tf-cr-caret, #374151) !important;
  }
  @keyframes mr-tf-char-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes mr-tf-char-slide-up {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes mr-tf-char-blur {
    from { opacity: 0; filter: blur(4px); }
    to   { opacity: 1; filter: blur(0); }
  }
  .mr-tf-char-new-fade     { animation: mr-tf-char-fade     var(--tf-cr-dur, 120ms) var(--tf-cr-ease, ease-out) both; }
  .mr-tf-char-new-slide-up { animation: mr-tf-char-slide-up var(--tf-cr-dur, 120ms) var(--tf-cr-ease, ease-out) both; }
  .mr-tf-char-new-blur     { animation: mr-tf-char-blur     var(--tf-cr-dur, 120ms) var(--tf-cr-ease, ease-out) both; }
  @media (prefers-reduced-motion: reduce) {
    .mr-tf-char-new-fade,
    .mr-tf-char-new-slide-up,
    .mr-tf-char-new-blur { animation: none; }
  }
`;

let characterRevealStylesInjected = false;

export function useCharacterRevealStyles() {
  React.useInsertionEffect(() => {
    if (characterRevealStylesInjected) return;
    characterRevealStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-cr", "");
    el.textContent = CHARACTER_REVEAL_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// FX-M: Chroma border
// ---------------------------------------------------------------------------

const CHROMA_BORDER_STYLES = `
@keyframes mr-tf-cb-hue{to{filter:hue-rotate(360deg)}}
@keyframes mr-tf-cb-flow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
`.trim();

let chromaBorderStylesInjected = false;

export function useChromaBorderStyles() {
  React.useInsertionEffect(() => {
    if (chromaBorderStylesInjected) return;
    chromaBorderStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tf-cb", "");
    el.textContent = CHROMA_BORDER_STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// List popover animation (shared by SelectField + ComboBox)
//
// The popover panel gets the "mr-sf-popover" class and data-entering /
// data-exiting attributes from React Aria. The keyframes below animate
// opacity + slight scale-Y so the dropdown feels snappy.
// ---------------------------------------------------------------------------

const LIST_POPOVER_STYLES = `
  @keyframes mr-sf-in {
    from { opacity: 0; transform: scaleY(0.95) translateY(-4px); }
    to   { opacity: 1; transform: scaleY(1)    translateY(0);    }
  }
  @keyframes mr-sf-out {
    from { opacity: 1; transform: scaleY(1)    translateY(0);    }
    to   { opacity: 0; transform: scaleY(0.95) translateY(-4px); }
  }
  .mr-sf-popover { transform-origin: top; }
  .mr-sf-popover[data-entering] { animation: mr-sf-in  150ms ease; }
  .mr-sf-popover[data-exiting]  { animation: mr-sf-out 120ms ease; }
`;

let listPopoverStylesInjected = false;

export function useListPopoverStyles() {
  React.useInsertionEffect(() => {
    if (listPopoverStylesInjected) return;
    listPopoverStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-sf-popover", "");
    el.textContent = LIST_POPOVER_STYLES;
    document.head.appendChild(el);
  }, []);
}

/** Per-variant default colour palettes for FX-M chroma border. */
export const CHROMA_DEFAULTS: Record<string, string[]> = {
  "hue-rotate": ["#f97316", "#ec4899", "#a855f7", "#3b82f6", "#22d3ee"],
  aurora:       ["#34d399", "#60a5fa", "#c084fc", "#f472b6"],
  iridescent:   ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"],
};
