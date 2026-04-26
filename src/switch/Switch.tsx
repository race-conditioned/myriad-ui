"use client";

import * as React from "react";
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { SwitchConfig, SwitchSize } from "../theme/types";

export const defaultSwitchConfig: SwitchConfig = defaultTheme.components.switch;

export type SwitchProps = Omit<AriaSwitchProps, "className" | "style" | "children"> & {
  config?: SwitchConfig
  size?: SwitchSize
  /** Whether the label appears before the track ("left") or after ("right", default). */
  labelPosition?: "left" | "right"
  children?: React.ReactNode
}

export function Switch({
  config = defaultSwitchConfig,
  size = "md",
  labelPosition = "right",
  children,
  ...rest
}: SwitchProps) {
  const s = config.size[size];

  return (
    <AriaSwitch
      {...rest}
      className={cn(config.root, s.gap)}
      style={(renderProps) =>
        renderProps.isDisabled ? { cursor: "not-allowed", opacity: 0.5 } : undefined
      }
    >
      {(renderProps) => {
        const track = (
          <div
            className={cn(
              config.track,
              s.track,
              renderProps.isSelected ? config.trackOn : config.trackOff,
              renderProps.isDisabled && config.trackDisabled,
              renderProps.isFocusVisible && config.trackFocusVisible,
            )}
          >
            <div
              className={cn(config.thumb, s.thumb)}
              style={{
                transform: renderProps.isSelected ? s.thumbTranslate : "translateX(0)",
              }}
            />
          </div>
        );

        const label = children != null && (
          <span className={cn(config.label, s.fontSize)}>{children}</span>
        );

        return labelPosition === "left" ? (
          <>
            {label}
            {track}
          </>
        ) : (
          <>
            {track}
            {label}
          </>
        );
      }}
    </AriaSwitch>
  );
}
