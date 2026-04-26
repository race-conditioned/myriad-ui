"use client";

import * as React from "react";

// ---------------------------------------------------------------------------
// Shared style injection — one block for the entire app lifetime.
//
// Three-level structure per character:
//   .mr-rolling-word  — inline-flex word container (layout, position:relative
//                       so the sr-only span is contained)
//   .mr-rolling-clip  — per-char overflow:hidden clip window (clipping)
//   .mr-rolling-char  — flex column that translates on hover (animation)
//
// Accessibility: the full string lives in a single sr-only span so axe and
// screen readers see one coherent text node instead of per-character spans.
// All animated character spans are wrapped in aria-hidden="true".
// ---------------------------------------------------------------------------

const STYLES = `
  .mr-rolling-word {
    position: relative;
    display: inline-flex;
    height: 1em;
    line-height: 1em;
    vertical-align: bottom;
  }
  .mr-rolling-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  .mr-rolling-clip {
    display: block;
    overflow: hidden;
    height: 1em;
  }
  .mr-rolling-char {
    display: flex;
    flex-direction: column;
    gap: var(--mr-char-gap, 1em);
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }
  .mr-rolling-char > span {
    display: block;
    height: 1em;
    line-height: 1em;
  }
  [data-hovered]:not([disabled]):not([data-disabled]) .mr-rolling-char {
    transform: translateY(calc(-1em - var(--mr-char-gap, 1em)));
  }
`;

let stylesInjected = false;

function useRollingTextStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-rolling-text", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface RollingTextProps {
  children: string;
  /**
   * Stagger delay between each character in milliseconds.
   * Lower values feel snappier; higher values feel more theatrical.
   * @default 25
   */
  charDelay?: number;
  /**
   * Gap between the outgoing and incoming character copy, in em units.
   * Creates a visible pause mid-animation — the first character exits,
   * blank space shows, then the second enters.
   * @default 1
   */
  charGap?: number;
}

/**
 * Splits a string into characters and rolls each one on hover via a
 * slot-machine translateY animation with a staggered per-character delay.
 *
 * Works with any React Aria interactive element — the trigger is the
 * `data-hovered` attribute that React Aria sets automatically.
 *
 * Spaces are preserved as non-breaking spaces to maintain correct width
 * while the layout is animating.
 *
 * Accessibility: the full label is in a single sr-only span; all animated
 * character nodes are aria-hidden so axe evaluates one coherent text node
 * rather than per-character spans it can't assess for contrast.
 */
export function RollingText({ children, charDelay = 25, charGap = 1 }: RollingTextProps) {
  useRollingTextStyles();

  return (
    <span
      className="mr-rolling-word"
      style={{ "--mr-char-gap": `${charGap}em` } as React.CSSProperties}
    >
      {/* Single text node for screen readers and axe — visually hidden */}
      <span className="mr-rolling-sr">{children}</span>

      {/* Animated characters — fully removed from the accessibility tree.
          Must use display:inline-flex, not display:contents — Chromium leaks
          aria-hidden children back into the a11y tree when display:contents
          is set on the hiding element. */}
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        {children.split("").map((char, i) => {
          const display = char === " " ? "\u00a0" : char;
          return (
            <span key={i} className="mr-rolling-clip">
              <span
                className="mr-rolling-char"
                style={{ transitionDelay: `${i * charDelay}ms` }}
              >
                <span>{display}</span>
                <span>{display}</span>
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
