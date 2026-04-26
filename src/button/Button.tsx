"use client";

import * as React from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cn } from "../utils/cn";
import { RollingText } from "../rolling-text/RollingText";
import { useContentRaiseStyles } from "../utils/content-raise";
import { useLiftStyles } from "../utils/lift";
import type { ButtonConfig, ButtonIntent, ButtonShape, ButtonSize } from "../theme/types";

export type ButtonProps = Omit<AriaButtonProps, "className" | "style"> & {
  /** Visual config — consumed from the app's theme. */
  config: ButtonConfig
  intent?: ButtonIntent
  size?: ButtonSize
  shape?: ButtonShape
  /** Shows a spinner and disables interaction. */
  loading?: boolean
  /** Icon rendered before the label. */
  iconStart?: React.ReactNode
  /** Icon rendered after the label. */
  iconEnd?: React.ReactNode
  /** Stretches the button to fill its container. */
  fullWidth?: boolean
  /**
   * Animates each character with a slot-machine roll on hover.
   * Only applies when children is a plain string.
   */
  rollingText?: boolean
  /**
   * On hover, iconStart shifts left and iconEnd shifts right — spreading
   * away from the label to signal interactivity.
   */
  contentRaise?: boolean
  /**
   * On hover, the button scales up slightly — as if rising to meet the user.
   * Snaps back down on press.
   */
  lift?: boolean
  /**
   * When loading becomes true, content rolls up and the spinner rolls in
   * from below — slot-machine style. When loading returns to false, the
   * content rolls back in. Button width is always determined by the content.
   */
  rollToLoading?: boolean
  children?: React.ReactNode
}

export function Button({
  config,
  intent = "primary",
  size = "md",
  shape = "rounded",
  loading = false,
  iconStart,
  iconEnd,
  fullWidth = false,
  rollingText = false,
  contentRaise = false,
  lift = false,
  rollToLoading = false,
  children,
  isDisabled,
  ...ariaProps
}: ButtonProps) {
  useContentRaiseStyles();
  useLiftStyles();

  const sizeConfig   = config.size[size];
  const intentConfig = config.intent[intent];
  const shapeConfig  = config.shape[shape];

  const isInert = isDisabled === true || loading;

  // Shared icon/content render — used in both normal and roll-to-loading paths.
  const iconStartEl = iconStart && (
    <span aria-hidden="true" className={cn(sizeConfig.iconSize, contentRaise && "mr-raise-start")}>
      {iconStart}
    </span>
  );
  const iconEndEl = iconEnd && (
    <span aria-hidden="true" className={cn(sizeConfig.iconSize, contentRaise && "mr-raise-end")}>
      {iconEnd}
    </span>
  );
  const labelEl = rollingText && typeof children === "string"
    ? <RollingText>{children}</RollingText>
    : children;

  return (
    <AriaButton
      {...ariaProps}
      isDisabled={isInert}
      aria-busy={loading || undefined}
      className={cn(
        // Base — always on
        config.base,
        // Size
        sizeConfig.height,
        shapeConfig.paddingX || sizeConfig.paddingX,
        sizeConfig.fontSize,
        sizeConfig.fontWeight,
        sizeConfig.letterSpacing,
        shapeConfig.borderRadius || sizeConfig.borderRadius,
        shapeConfig.aspectRatio,
        // Gap only applied when NOT using rollToLoading — the slot handles its own internal gap
        !rollToLoading && sizeConfig.gap,
        // Intent — default state
        intentConfig.default.bg,
        intentConfig.default.text,
        intentConfig.default.border,
        intentConfig.default.shadow,
        // Intent — hover
        !isInert && intentConfig.hover.bg,
        !isInert && intentConfig.hover.text,
        !isInert && intentConfig.hover.shadow,
        // Intent — pressed
        !isInert && config.pressScale && intentConfig.pressed.scale,
        !isInert && intentConfig.pressed.bg,
        // Intent — focus visible
        intentConfig.focusVisible,
        // Intent — disabled / loading
        isInert && intentConfig.disabled.bg,
        isInert && intentConfig.disabled.text,
        isInert && intentConfig.disabled.opacity,
        // Cursor — mutually exclusive so there's no CSS source-order conflict
        isInert ? intentConfig.disabled.cursor : undefined,
        // Animations
        lift && !isInert && "mr-lift",
      )}
      style={{
        cursor: isInert ? undefined : "pointer",
        width: fullWidth ? "100%" : undefined,
        position: loading && !rollToLoading ? "relative" : undefined,
      }}
    >
      {rollToLoading ? (
        // Slot-machine: content rolls up, spinner rolls in from below.
        // Both slots always in DOM so button width = content width always.
        //
        // The clip is display:block so the slide column is a plain block child
        // with its natural 2em height. A flex clip would stretch/shrink the
        // column to 1em, making each slot 0.5em and the animation stall halfway.
        <span style={{ overflow: "hidden", height: "1em", display: "block" }}>
          <span
            style={{
              display:       "flex",
              flexDirection: "column",
              transition:    "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              transform:     loading ? "translateY(-1em)" : "translateY(0)",
            }}
          >
            {/* Content slot */}
            <span className={sizeConfig.gap} style={{ display: "flex", alignItems: "center", height: "1em", flexShrink: 0 }}>
              {iconStartEl}
              {labelEl}
              {iconEndEl}
            </span>
            {/* Spinner slot — aria-hidden, paused until loading */}
            <span
              aria-hidden="true"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "1em", flexShrink: 0 }}
            >
              <Spinner
                className={cn(sizeConfig.spinnerSize, intentConfig.loading.spinnerColor)}
                playing={loading}
              />
            </span>
          </span>
        </span>
      ) : (
        // Normal loading: spinner overlaid absolutely so button width is
        // always determined by content (no layout shift on loading).
        <>
          {loading && (
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Spinner className={cn(sizeConfig.spinnerSize, intentConfig.loading.spinnerColor)} />
            </div>
          )}
          {/* visibility:hidden keeps layout width intact; sr-only removed from flow */}
          <span style={{ display: "contents", visibility: loading ? "hidden" : undefined }}>
            {iconStartEl}
            {labelEl}
            {iconEndEl}
          </span>
        </>
      )}
    </AriaButton>
  );
}

// ---------------------------------------------------------------------------
// Spinner — internal only, not exported
// ---------------------------------------------------------------------------

let spinnerStylesInjected = false;
function useSpinnerStyles() {
  React.useInsertionEffect(() => {
    if (spinnerStylesInjected) return;
    spinnerStylesInjected = true;
    const el = document.createElement("style");
    el.setAttribute("data-mr-spinner", "");
    el.textContent = "@keyframes mr-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}";
    document.head.appendChild(el);
  }, []);
}

function Spinner({ className, playing = true }: { className?: string; playing?: boolean }) {
  useSpinnerStyles();
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={{ animation: "mr-spin 1s linear infinite", animationPlayState: playing ? undefined : "paused" }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        style={{ opacity: 0.25 }}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
