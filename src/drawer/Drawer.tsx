"use client";

import * as React from "react";
import {
  Dialog as AriaDialog,
  Modal,
  ModalOverlay,
  Heading,
  type ModalOverlayProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { DrawerConfig, DrawerSide, DrawerSize } from "../theme/types";

export const defaultDrawerConfig: DrawerConfig = defaultTheme.components.drawer;

// ---------------------------------------------------------------------------
// Animation
//
// Per-side slide keyframes — the panel class `mr-drawer-panel--{side}` is
// used as a hook so each direction gets independent enter/exit animations.
// Overlay fade reuses its own keyframes (independent from Dialog's).
// prefers-reduced-motion collapses all durations to near-zero.
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes mrDrawerOverlayIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes mrDrawerOverlayOut { from { opacity: 1; } to { opacity: 0; } }
  @keyframes mrDrawerInLeft    { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes mrDrawerOutLeft   { from { transform: translateX(0); }    to { transform: translateX(-100%); } }
  @keyframes mrDrawerInRight   { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes mrDrawerOutRight  { from { transform: translateX(0); }    to { transform: translateX(100%); } }
  @keyframes mrDrawerInTop     { from { transform: translateY(-100%); } to { transform: translateY(0); } }
  @keyframes mrDrawerOutTop    { from { transform: translateY(0); }     to { transform: translateY(-100%); } }
  @keyframes mrDrawerInBottom  { from { transform: translateY(100%); }  to { transform: translateY(0); } }
  @keyframes mrDrawerOutBottom { from { transform: translateY(0); }     to { transform: translateY(100%); } }

  .mr-drawer-overlay[data-entering] { animation: mrDrawerOverlayIn  0.25s ease forwards; }
  .mr-drawer-overlay[data-exiting]  { animation: mrDrawerOverlayOut 0.2s  ease forwards; }

  .mr-drawer-panel--left[data-entering]   { animation: mrDrawerInLeft    0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
  .mr-drawer-panel--left[data-exiting]    { animation: mrDrawerOutLeft   0.25s ease-in                  forwards; }
  .mr-drawer-panel--right[data-entering]  { animation: mrDrawerInRight   0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
  .mr-drawer-panel--right[data-exiting]   { animation: mrDrawerOutRight  0.25s ease-in                  forwards; }
  .mr-drawer-panel--top[data-entering]    { animation: mrDrawerInTop     0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
  .mr-drawer-panel--top[data-exiting]     { animation: mrDrawerOutTop    0.25s ease-in                  forwards; }
  .mr-drawer-panel--bottom[data-entering] { animation: mrDrawerInBottom  0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
  .mr-drawer-panel--bottom[data-exiting]  { animation: mrDrawerOutBottom 0.25s ease-in                  forwards; }

  @media (prefers-reduced-motion: reduce) {
    .mr-drawer-overlay[data-entering],
    .mr-drawer-overlay[data-exiting],
    .mr-drawer-panel--left[data-entering],   .mr-drawer-panel--left[data-exiting],
    .mr-drawer-panel--right[data-entering],  .mr-drawer-panel--right[data-exiting],
    .mr-drawer-panel--top[data-entering],    .mr-drawer-panel--top[data-exiting],
    .mr-drawer-panel--bottom[data-entering], .mr-drawer-panel--bottom[data-exiting] {
      animation-duration: 0.01ms !important;
    }
  }
`;

let stylesInjected = false;

function useDrawerStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-drawer", "");
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, []);
}

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Panel inline positioning — structural, not config-driven
// ---------------------------------------------------------------------------

const SIDE_STYLE: Record<DrawerSide, React.CSSProperties> = {
  left:   { position: "fixed", top: 0, left: 0,   bottom: 0 },
  right:  { position: "fixed", top: 0, right: 0,  bottom: 0 },
  top:    { position: "fixed", top: 0, left: 0,   right:  0 },
  bottom: { position: "fixed", bottom: 0, left: 0, right: 0 },
};

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

export type DrawerProps = {
  config?: DrawerConfig
  /** Which edge the drawer slides from. Default: "right". */
  side?: DrawerSide
  /** Width (left/right) or height (top/bottom) of the panel. Default: "md". */
  size?: DrawerSize
  /** Drawer heading — rendered inside a <Heading slot="title"> for a11y. */
  title?: React.ReactNode
  /**
   * Whether clicking the backdrop or pressing Escape closes the drawer.
   * Default: true.
   */
  isDismissable?: boolean
  /**
   * Body content. Pass a function to receive the close callback.
   */
  children?: React.ReactNode | ((close: () => void) => React.ReactNode)
  /**
   * Footer content (action buttons). Pass a function to receive close.
   */
  footer?: React.ReactNode | ((close: () => void) => React.ReactNode)
  /** Controlled open state. When omitted, must be used inside DialogTrigger. */
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function Drawer({
  config = defaultDrawerConfig,
  side = "right",
  size = "md",
  title,
  isDismissable = true,
  isOpen,
  onOpenChange,
  children,
  footer,
}: DrawerProps) {
  useDrawerStyles();

  const controlledProps: Partial<ModalOverlayProps> = {};
  if (isOpen !== undefined)       controlledProps.isOpen       = isOpen;
  if (onOpenChange !== undefined) controlledProps.onOpenChange = onOpenChange;

  const isHorizontal = side === "left" || side === "right";
  const sizeClass = isHorizontal
    ? config.horizontal[size]
    : config.vertical[size];

  return (
    <ModalOverlay
      {...controlledProps}
      isDismissable={isDismissable}
      className={cn("mr-drawer-overlay", config.overlay)}
    >
      <Modal
        className={cn("mr-drawer-panel", `mr-drawer-panel--${side}`, config.panel, sizeClass)}
        style={SIDE_STYLE[side]}
      >
        <AriaDialog style={{ outline: "none", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {({ close }) => (
            <>
              {title != null && (
                <div className={config.header}>
                  <Heading slot="title" className={config.title}>{title}</Heading>
                  {isDismissable && (
                    <button
                      aria-label="Close drawer"
                      onClick={close}
                      className={config.closeButton}
                    >
                      <CloseIcon />
                    </button>
                  )}
                </div>
              )}
              <div className={config.body}>
                {typeof children === "function" ? children(close) : children}
              </div>
              {footer != null && (
                <div className={config.footer}>
                  {typeof footer === "function" ? footer(close) : footer}
                </div>
              )}
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
