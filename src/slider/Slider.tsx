"use client";

import * as React from "react";
import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  type SliderProps as AriaSliderProps,
  Label,
  Text,
  FieldError,
} from "react-aria-components";
import { cn } from "../utils/cn";
import { defaultTheme } from "../theme/defaults";
import type { SliderConfig, SliderSize } from "../theme/types";

export const defaultSliderConfig: SliderConfig = defaultTheme.components.slider;

export type SliderProps = Omit<AriaSliderProps, "className" | "style" | "children"> & {
  config?: SliderConfig
  size?: SliderSize
  label?: string
  /** Show the current value alongside the label. Default: true. */
  showOutput?: boolean
  description?: string
  errorMessage?: string
}

export function Slider({
  config = defaultSliderConfig,
  size = "md",
  label,
  showOutput = true,
  description,
  errorMessage,
  ...rest
}: SliderProps) {
  const s = config.size[size];

  return (
    <AriaSlider {...rest} className={config.root}>
      {(label != null || showOutput) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {label != null && (
            <Label className={cn(config.label, s.fontSize)}>{label}</Label>
          )}
          {showOutput && (
            <SliderOutput className={cn(config.output, s.fontSize)}>
              {({ state }) =>
                state.values
                  .map((_, i) => state.getThumbValueLabel(i))
                  .join(" – ")
              }
            </SliderOutput>
          )}
        </div>
      )}
      <SliderTrack
        className={cn(config.track, config.trackUnfilled, s.trackHeight)}
      >
        {({ state }) => {
          const isRange = state.values.length > 1;
          const fillStart = isRange ? state.getThumbPercent(0) : 0;
          const fillEnd = isRange
            ? state.getThumbPercent(1)
            : state.getThumbPercent(0);

          return (
            <>
              {/* Filled portion */}
              <div
                className={config.trackFilled}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${fillStart * 100}%`,
                  right: `${(1 - fillEnd) * 100}%`,
                }}
              />
              {/* Thumb(s) — one for single, two for range */}
              {state.values.map((_, i) => (
                <SliderThumb
                  key={i}
                  index={i}
                  style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                  className={(renderProps) =>
                    cn(
                      config.thumb,
                      s.thumb,
                      renderProps.isFocusVisible && config.thumbFocusVisible,
                      renderProps.isDragging && config.thumbDragging,
                    )
                  }
                />
              ))}
            </>
          );
        }}
      </SliderTrack>
      {description != null && (
        <Text slot="description" className={config.description}>
          {description}
        </Text>
      )}
      <FieldError className={config.error}>{errorMessage}</FieldError>
    </AriaSlider>
  );
}
