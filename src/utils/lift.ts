"use client";

import * as React from "react";

// ---------------------------------------------------------------------------
// Lift — button subtly scales up on hover, like it's rising to meet the user.
//
// The pressed rule comes after the hovered rule in source order so it wins
// when both [data-hovered] and [data-pressed] are set simultaneously (i.e.
// the cursor is still over the button while pressing).
//
// Usage: call useLiftStyles() in the component, then add "mr-lift" to the
// button element's className when the lift prop is true.
// ---------------------------------------------------------------------------

const STYLES = `
  .mr-lift {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .mr-lift[data-hovered]:not([data-disabled]) {
    transform: scale(1.04);
  }
  .mr-lift[data-pressed]:not([data-disabled]) {
    transform: scale(0.97);
    transition-duration: 0.1s;
  }
`;

let stylesInjected = false;

export function useLiftStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-lift", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}
