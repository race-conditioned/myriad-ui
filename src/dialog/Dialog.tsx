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
import type { DialogConfig, DialogSize } from "../theme/types";

export const defaultDialogConfig: DialogConfig = defaultTheme.components.dialog;

// ---------------------------------------------------------------------------
// Animation
//
// Keyframes avoid the CSS-transition-on-mount problem (RAC adds data-entering
// on the same frame the element is inserted). See Tooltip/Popover for detail.
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes mrOverlayIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes mrOverlayOut { from { opacity: 1; } to { opacity: 0; } }
  @keyframes mrDialogIn   { from { opacity: 0; transform: scale(0.97) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes mrDialogOut  { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.97) translateY(-6px); } }

  .mr-dialog-overlay[data-entering] { animation: mrOverlayIn  0.2s ease forwards; }
  .mr-dialog-overlay[data-exiting]  { animation: mrOverlayOut 0.15s ease forwards; }
  .mr-dialog-panel[data-entering]   { animation: mrDialogIn   0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .mr-dialog-panel[data-exiting]    { animation: mrDialogOut  0.15s ease forwards; }
`;

let stylesInjected = false;

function useDialogStyles() {
  React.useInsertionEffect(() => {
    if (stylesInjected) return;
    stylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-dialog", "");
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
// Dialog
// ---------------------------------------------------------------------------

export type DialogProps = {
  config?: DialogConfig
  size?: DialogSize
  /** Dialog heading — rendered inside a <Heading slot="title"> for a11y. */
  title?: React.ReactNode
  /**
   * Whether clicking the backdrop or pressing Escape closes the dialog.
   * Set to false for AlertDialog patterns that require explicit user action.
   * Default: true.
   */
  isDismissable?: boolean
  /**
   * Content inside the scrollable body. Pass a function to receive the
   * close callback — useful for Close/Cancel buttons inside the body.
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

export function Dialog({
  config = defaultDialogConfig,
  size = "md",
  title,
  isDismissable = true,
  isOpen,
  onOpenChange,
  children,
  footer,
}: DialogProps) {
  useDialogStyles();

  // Only pass controlled props when explicitly provided so that DialogTrigger
  // context is not inadvertently overridden by undefined values.
  const controlledProps: Partial<ModalOverlayProps> = {};
  if (isOpen !== undefined)    controlledProps.isOpen       = isOpen;
  if (onOpenChange !== undefined) controlledProps.onOpenChange = onOpenChange;

  return (
    <ModalOverlay
      {...controlledProps}
      isDismissable={isDismissable}
      className={cn("mr-dialog-overlay", config.overlay)}
    >
      <Modal className={cn("mr-dialog-panel", config.panel, config.size[size])}>
        <AriaDialog style={{ outline: "none", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {({ close }) => (
            <>
              {title != null && (
                <div className={config.header}>
                  <Heading slot="title" className={config.title}>{title}</Heading>
                  {isDismissable && (
                    <button
                      aria-label="Close dialog"
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

// ---------------------------------------------------------------------------
// AlertDialog
//
// Convenience wrapper: overlay click and Escape do not close, no X button.
// Requires explicit user action (e.g. a Confirm/Cancel button in the footer).
// ---------------------------------------------------------------------------

export type AlertDialogProps = Omit<DialogProps, "isDismissable">

export function AlertDialog(props: AlertDialogProps) {
  return <Dialog {...props} isDismissable={false} />;
}
