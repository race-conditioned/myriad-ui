"use client";

import * as React from "react";
import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  OverlayArrow,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { PopoverConfig } from "../theme/types";

export const defaultPopoverConfig: PopoverConfig = defaultTheme.components.popover;

// ---------------------------------------------------------------------------
// Animation — injected once via useInsertionEffect.
//
// CSS transitions don't work on RAC overlays because the element is inserted
// and data-entering/data-exiting are applied on the same frame. Keyframes
// sidestep this: they run immediately on mount/unmount regardless of when the
// attribute is added.
//
// Arrow rotation is driven by RAC's data-placement attribute on the popover.
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes mrPopoverIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes mrPopoverOut {
    from { opacity: 1; transform: scale(1);    }
    to   { opacity: 0; transform: scale(0.96); }
  }
  .mr-popover[data-entering] { animation: mrPopoverIn  0.15s ease forwards; }
  .mr-popover[data-exiting]  { animation: mrPopoverOut 0.12s ease forwards; }

  /* Arrow points toward the trigger — rotate based on popover placement */
  .mr-popover[data-placement=bottom] .mr-popover-arrow { transform: rotate(180deg); }
  .mr-popover[data-placement=left]   .mr-popover-arrow { transform: rotate(-90deg); }
  .mr-popover[data-placement=right]  .mr-popover-arrow { transform: rotate(90deg);  }
`;

let stylesInjected = false;

function usePopoverStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-popover", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------

export type PopoverProps = Omit<AriaPopoverProps, "className" | "style" | "children"> & {
  config?: PopoverConfig
  /** Render a directional arrow pointing at the trigger. Default: false. */
  showArrow?: boolean
  children?: React.ReactNode
}

export function Popover({
  config = defaultPopoverConfig,
  showArrow = false,
  children,
  ...rest
}: PopoverProps) {
  usePopoverStyles();

  // Allow per-instance offset override; fall back to config value.
  const { offset, ...restWithoutOffset } = rest;

  return (
    <AriaPopover
      {...restWithoutOffset}
      offset={offset ?? config.offset}
      className={cn("mr-popover", config.container)}
    >
      {showArrow && (
        <OverlayArrow className="mr-popover-arrow">
          <svg
            aria-hidden="true"
            width={8}
            height={8}
            viewBox="0 0 8 8"
          >
            {/* V pointing down — correct for placement="top" (popover above trigger) */}
            <path d="M0 0 L4 4 L8 0Z" className={config.arrow} />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </AriaPopover>
  );
}
