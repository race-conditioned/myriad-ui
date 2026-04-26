"use client";

import * as React from "react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxProps as AriaCheckboxProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { CheckboxConfig, CheckboxGroupConfig, CheckboxSize } from "../theme/types";

export const defaultCheckboxConfig: CheckboxConfig = defaultTheme.components.checkbox;
export const defaultCheckboxGroupConfig: CheckboxGroupConfig = defaultTheme.components.checkboxGroup;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="3 7.5 6 10.5 11 4" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={className}
    >
      <line x1="3" y1="7" x2="11" y2="7" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

export type CheckboxProps = Omit<AriaCheckboxProps, "className" | "style" | "children"> & {
  config?: CheckboxConfig
  size?: CheckboxSize
  description?: string
  children?: React.ReactNode
}

export function Checkbox({
  config = defaultCheckboxConfig,
  size = "md",
  description,
  children,
  ...rest
}: CheckboxProps) {
  const s = config.size[size];

  return (
    <AriaCheckbox
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
              config.box,
              s.box,
              renderProps.isIndeterminate
                ? config.boxIndeterminate
                : renderProps.isSelected
                  ? config.boxChecked
                  : config.boxUnchecked,
              renderProps.isDisabled && config.boxDisabled,
              renderProps.isInvalid && config.boxInvalid,
              renderProps.isFocusVisible && config.boxFocusVisible,
            )}
          >
            {renderProps.isIndeterminate ? (
              <MinusIcon className={cn(config.icon, s.iconSize)} />
            ) : (
              <CheckIcon
                className={cn(config.icon, s.iconSize)}
                {...(!renderProps.isSelected ? { style: { opacity: 0 } } : {})}
              />
            )}
          </div>
          {(children != null || description != null) && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {children != null && (
                <span className={cn(config.label, s.fontSize)}>{children}</span>
              )}
              {description != null && (
                <span className={config.description} style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>{description}</span>
              )}
            </div>
          )}
        </>
      )}
    </AriaCheckbox>
  );
}

// ---------------------------------------------------------------------------
// CheckboxGroup
// ---------------------------------------------------------------------------

export type CheckboxGroupProps = Omit<AriaCheckboxGroupProps, "className" | "style" | "children"> & {
  config?: CheckboxGroupConfig
  label?: string
  description?: string
  errorMessage?: string
  children?: React.ReactNode
}

export function CheckboxGroup({
  config = defaultCheckboxGroupConfig,
  label,
  description,
  errorMessage,
  children,
  ...rest
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...rest} className={config.root}>
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
      <div className={config.items}>{children}</div>
      <FieldError className={config.error}>{errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}
