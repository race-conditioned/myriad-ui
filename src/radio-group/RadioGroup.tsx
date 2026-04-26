"use client";

import * as React from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioProps as AriaRadioProps,
  type RadioGroupProps as AriaRadioGroupProps,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { RadioConfig, RadioGroupConfig, RadioSize } from "../theme/types";

export const defaultRadioConfig: RadioConfig = defaultTheme.components.radio;
export const defaultRadioGroupConfig: RadioGroupConfig = defaultTheme.components.radioGroup;

// ---------------------------------------------------------------------------
// Radio
// ---------------------------------------------------------------------------

export type RadioProps = Omit<AriaRadioProps, "className" | "style" | "children"> & {
  config?: RadioConfig
  size?: RadioSize
  description?: string
  children?: React.ReactNode
}

export function Radio({
  config = defaultRadioConfig,
  size = "md",
  description,
  children,
  ...rest
}: RadioProps) {
  const s = config.size[size];

  return (
    <AriaRadio
      {...rest}
      className={cn(config.root, s.gap)}
      style={(renderProps) =>
        renderProps.isDisabled ? { cursor: "not-allowed", opacity: 0.5 } : undefined
      }
    >
      {(renderProps) => (
        <>
          <div
            className={cn(
              config.indicator,
              s.indicator,
              renderProps.isSelected
                ? config.indicatorSelected
                : config.indicatorUnselected,
              renderProps.isDisabled && config.indicatorDisabled,
              renderProps.isInvalid && config.indicatorInvalid,
              renderProps.isFocusVisible && config.indicatorFocusVisible,
            )}
          >
            {/* Inner dot — always in DOM, hidden via opacity to avoid layout shift */}
            <div
              className={cn(config.dot, s.dot)}
              {...(!renderProps.isSelected ? { style: { opacity: 0 } } : {})}
            />
          </div>
          {(children != null || description != null) && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {children != null && (
                <span className={cn(config.label, s.fontSize)}>{children}</span>
              )}
              {description != null && (
                <span
                  className={config.description}
                  style={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </AriaRadio>
  );
}

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

export type RadioGroupProps = Omit<AriaRadioGroupProps, "className" | "style" | "children"> & {
  config?: RadioGroupConfig
  label?: string
  description?: string
  errorMessage?: string
  children?: React.ReactNode
}

export function RadioGroup({
  config = defaultRadioGroupConfig,
  label,
  description,
  errorMessage,
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...rest} className={config.root}>
      {label != null && (
        <Label className={config.label}>
          {label}
          {rest.isRequired && (
            <span aria-hidden="true" className={config.requiredIndicator}>
              *
            </span>
          )}
        </Label>
      )}
      {description != null && (
        <Text slot="description" className={config.description}>
          {description}
        </Text>
      )}
      <div
        className={
          rest.orientation === "horizontal"
            ? config.itemsHorizontal
            : config.items
        }
      >
        {children}
      </div>
      <FieldError className={config.error}>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}
