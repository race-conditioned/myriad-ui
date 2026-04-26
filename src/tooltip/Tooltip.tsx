"use client";

import * as React from "react";
import {
  Tooltip as AriaTooltip,
  TooltipTrigger,
  OverlayArrow,
  type TooltipProps as AriaTooltipProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { TooltipConfig } from "../theme/types";

export const defaultTooltipConfig: TooltipConfig = defaultTheme.components.tooltip;

// ---------------------------------------------------------------------------
// Shared style injection
//
// Keyframe animations driven by React Aria's data-entering / data-exiting
// attributes. Transitions don't work here because React Aria adds the
// attribute on mount and removes it on the next frame — the element must
// already be in the DOM for a CSS transition to fire. Keyframes sidestep
// this entirely.
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes mrTooltipIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes mrTooltipOut {
    from { opacity: 1; transform: scale(1);    }
    to   { opacity: 0; transform: scale(0.94); }
  }
  .mr-tooltip[data-entering] { animation: mrTooltipIn  0.12s ease forwards; }
  .mr-tooltip[data-exiting]  { animation: mrTooltipOut 0.12s ease forwards; }

  /* Arrow rotation by placement — OverlayArrow positions the element,
     we just rotate the SVG to point toward the trigger. */
  .mr-tooltip[data-placement=bottom] .mr-tooltip-arrow { transform: rotate(180deg); }
  .mr-tooltip[data-placement=left]   .mr-tooltip-arrow { transform: rotate(-90deg); }
  .mr-tooltip[data-placement=right]  .mr-tooltip-arrow { transform: rotate(90deg);  }
`;

let stylesInjected = false;

function useTooltipStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-tooltip", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export type TooltipProps = {
  config?: TooltipConfig;
  /** Text or element shown inside the tooltip bubble. */
  content: React.ReactNode;
  /**
   * The trigger element — must be a focusable interactive element
   * (Button, Link, etc.) so the tooltip is reachable via keyboard.
   */
  children?: React.ReactNode;
  /** Preferred placement. Auto-flips if there is insufficient space. */
  placement?: AriaTooltipProps["placement"];
  /**
   * Delay in ms before the tooltip appears on hover.
   * Set to 0 for instant show (e.g. when the trigger already has a label).
   * @default 700
   */
  delay?: number;
  /** Delay in ms before hiding after the pointer leaves. @default 0 */
  closeDelay?: number;
  /** Prevents the tooltip from showing without removing it from the tree. */
  isDisabled?: boolean;
};

export function Tooltip({
  config = defaultTooltipConfig,
  content,
  children,
  placement = "top",
  delay = 700,
  closeDelay = 0,
  isDisabled = false,
}: TooltipProps) {
  useTooltipStyles();

  return (
    <TooltipTrigger delay={delay} closeDelay={closeDelay} isDisabled={isDisabled}>
      {children}
      <AriaTooltip
        placement={placement}
        offset={config.offset}
        className="mr-tooltip"
      >
        {/* Arrow — OverlayArrow handles absolute positioning; CSS handles rotation */}
        <OverlayArrow className="mr-tooltip-arrow">
          <svg
            aria-hidden="true"
            width={8}
            height={8}
            viewBox="0 0 8 8"
          >
            {/* V pointing down — correct for placement="top" (tooltip above trigger) */}
            <path d="M0 0 L4 4 L8 0Z" className={cn(config.arrow)} />
          </svg>
        </OverlayArrow>

        <div className={cn(config.container)}>
          {content}
        </div>
      </AriaTooltip>
    </TooltipTrigger>
  );
}
