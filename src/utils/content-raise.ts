"use client";

import * as React from "react";

// ---------------------------------------------------------------------------
// Content-raise — icons shift away from centre on hover.
//
// Works with any React Aria interactive element. The trigger is [data-hovered]
// which React Aria sets automatically on interactive components.
//
// Usage: call useContentRaiseStyles() in the component, then conditionally
// add "mr-raise-start" / "mr-raise-end" class names to icon wrappers.
// ---------------------------------------------------------------------------

const STYLES = `
  .mr-raise-start,
  .mr-raise-end {
    display: inline-flex;
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  [data-hovered]:not([data-disabled]) .mr-raise-start {
    transform: translateX(-4px);
  }
  [data-hovered]:not([data-disabled]) .mr-raise-end {
    transform: translateX(4px);
  }
`;

let stylesInjected = false;

export function useContentRaiseStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-content-raise", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}
