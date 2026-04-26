import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberField } from "../src/number-field/NumberField";
import { darkNumberFieldConfig, defaultTheme } from "../src/theme/defaults";

const DARK_BG = "#0f1923";
const lightConfig = defaultTheme.components.numberField;

const meta: Meta<typeof NumberField> = {
  title: "Components/NumberField",
  component: NumberField,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof NumberField>;

// ---------------------------------------------------------------------------
// Default — light
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Quantity" />
      <NumberField config={lightConfig} {...args} label="Amount" description="Enter a whole number." defaultValue={42} />
      <NumberField config={lightConfig} {...args} label="Required" isRequired />
      <NumberField config={lightConfig} {...args} label="Invalid" isInvalid defaultValue={-5} errorMessage="Value must be positive." />
      <NumberField config={lightConfig} {...args} label="Read-only" isReadOnly defaultValue={100} />
      <NumberField config={lightConfig} {...args} label="Disabled" isDisabled defaultValue={7} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} size="sm" label="Small" defaultValue={1} />
      <NumberField config={lightConfig} {...args} size="md" label="Medium (default)" defaultValue={1} />
      <NumberField config={lightConfig} {...args} size="lg" label="Large" defaultValue={1} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Constraints — min, max, step
// ---------------------------------------------------------------------------

export const Constraints: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField
        config={lightConfig} {...args}
        label="Min 0, max 10"
        description="Arrow keys and buttons clamp to [0, 10]."
        minValue={0}
        maxValue={10}
        defaultValue={5}
      />
      <NumberField
        config={lightConfig} {...args}
        label="Step 5"
        description="Increments in steps of 5."
        step={5}
        defaultValue={0}
      />
      <NumberField
        config={lightConfig} {...args}
        label="Step 0.1, min 0, max 1"
        description="Fine-grained decimal control."
        minValue={0}
        maxValue={1}
        step={0.1}
        defaultValue={0.5}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Formatting — locale-aware via Intl.NumberFormatOptions
// ---------------------------------------------------------------------------

export const Formatting: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField
        config={lightConfig} {...args}
        label="Currency (USD)"
        description="Formatted as dollars."
        defaultValue={1234.56}
        formatOptions={{ style: "currency", currency: "USD" }}
      />
      <NumberField
        config={lightConfig} {...args}
        label="Percentage"
        description="Formatted as a percentage."
        defaultValue={0.42}
        minValue={0}
        maxValue={1}
        step={0.01}
        formatOptions={{ style: "percent" }}
      />
      <NumberField
        config={lightConfig} {...args}
        label="Compact notation"
        description="Large numbers in compact form."
        defaultValue={1_500_000}
        formatOptions={{ notation: "compact" }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Default — dark
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Quantity" />
      <NumberField config={darkNumberFieldConfig} {...args} label="Amount" description="Enter a whole number." defaultValue={42} />
      <NumberField config={darkNumberFieldConfig} {...args} label="Required" isRequired />
      <NumberField config={darkNumberFieldConfig} {...args} label="Invalid" isInvalid defaultValue={-5} errorMessage="Value must be positive." />
      <NumberField config={darkNumberFieldConfig} {...args} label="Read-only" isReadOnly defaultValue={100} />
      <NumberField config={darkNumberFieldConfig} {...args} label="Disabled" isDisabled defaultValue={7} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Constraints — dark
// ---------------------------------------------------------------------------

export const ConstraintsDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField
        config={darkNumberFieldConfig} {...args}
        label="Min 0, max 10"
        description="Arrow keys and buttons clamp to [0, 10]."
        minValue={0}
        maxValue={10}
        defaultValue={5}
      />
      <NumberField
        config={darkNumberFieldConfig} {...args}
        label="Step 5"
        description="Increments in steps of 5."
        step={5}
        defaultValue={0}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Formatting — dark
// ---------------------------------------------------------------------------

export const FormattingDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField
        config={darkNumberFieldConfig} {...args}
        label="Currency (USD)"
        defaultValue={1234.56}
        formatOptions={{ style: "currency", currency: "USD" }}
      />
      <NumberField
        config={darkNumberFieldConfig} {...args}
        label="Percentage"
        defaultValue={0.42}
        minValue={0}
        maxValue={1}
        step={0.01}
        formatOptions={{ style: "percent" }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-C: Glow
// ---------------------------------------------------------------------------

export const Glow: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Static glow" description="Soft orange halo on focus." defaultValue={42} glow />
      <NumberField
        config={{ ...lightConfig, glow: { type: "rotating", color: ["#f97316", "#ec4899", "#a855f7", "#3b82f6"], blur: 10, spread: 6, radius: 10, opacity: 1 } }}
        {...args} label="Rotating glow" description="Conic gradient spins behind the border." defaultValue={42} glow
      />
    </div>
  ),
};

export const GlowDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Static glow (dark)" defaultValue={42} glow />
      <NumberField
        config={{ ...darkNumberFieldConfig, glow: { type: "rotating", color: ["#f97316", "#ec4899", "#a855f7", "#3b82f6"], blur: 10, spread: 6, radius: 10, opacity: 1, maskBackground: "#0f1923" } }}
        {...args} label="Rotating glow (dark)" defaultValue={42} glow
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-D: Gradient border
// ---------------------------------------------------------------------------

export const GradientBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Gradient border" description="Flowing gradient ring on focus." defaultValue={42} gradientBorder />
    </div>
  ),
};

export const GradientBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Gradient border (dark)" defaultValue={42} gradientBorder />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-E: SVG stroke
// ---------------------------------------------------------------------------

export const SvgStroke: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="SVG stroke" description="Stroke traces the perimeter on focus." defaultValue={42} svgStroke />
      <NumberField config={lightConfig} {...args} label="Invalid state" description="Stroke colour switches to red." defaultValue={-1} svgStroke isInvalid errorMessage="Must be positive." />
    </div>
  ),
};

export const SvgStrokeDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="SVG stroke (dark)" defaultValue={42} svgStroke />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-F: Ornamental corners
// ---------------------------------------------------------------------------

export const Corners: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Corner brackets" description="L-brackets close inward on focus." defaultValue={42} corners />
      <NumberField config={{ ...lightConfig, corners: { style: "split", color: "#f97316", invalidColor: "#ef4444", width: 2, duration: 300, easing: "ease-out" } }} {...args} label="Split line" description="Line splits from centre." defaultValue={42} corners />
    </div>
  ),
};

export const CornersDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Corner brackets (dark)" defaultValue={42} corners />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-G: Background reveal
// ---------------------------------------------------------------------------

export const BgReveal: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Bg reveal" description="Translucent wash slides in on focus." defaultValue={42} bgReveal />
    </div>
  ),
};

export const BgRevealDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Bg reveal (dark)" defaultValue={42} bgReveal />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-H: Pulse
// ---------------------------------------------------------------------------

export const Pulse: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Pulse rings" description="Looping aura rings while focused." defaultValue={42} ripple />
      <NumberField config={{ ...lightConfig, ripple: { variant: "pulse-bg", color: "rgba(249, 115, 22, 0.08)", duration: 2000, radius: 6 } }} {...args} label="Pulse background" description="Background breathes softly." defaultValue={42} ripple />
      <NumberField config={{ ...lightConfig, ripple: { variant: "ripple", color: "rgba(249, 115, 22, 0.22)", duration: 600, radius: 6 } }} {...args} label="Ripple wave" description="Wave expands once per focus." defaultValue={42} ripple />
    </div>
  ),
};

export const PulseDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Pulse rings (dark)" defaultValue={42} ripple />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-I: Cursor spotlight
// ---------------------------------------------------------------------------

export const CursorSpotlight: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Cursor spotlight" description="Radial gradient follows your cursor." defaultValue={42} cursorSpotlight />
    </div>
  ),
};

export const CursorSpotlightDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Cursor spotlight (dark)" defaultValue={42} cursorSpotlight />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-K: Ink draw
// ---------------------------------------------------------------------------

export const InkDraw: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Ink draw" description="Wobbly path traces the perimeter." defaultValue={42} inkDraw />
    </div>
  ),
};

export const InkDrawDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Ink draw (dark)" defaultValue={42} inkDraw />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-L: Morph radius
// ---------------------------------------------------------------------------

export const MorphRadius: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Morph radius" description="Border-radius expands on focus." defaultValue={42} morphRadius />
      <NumberField config={{ ...lightConfig, morphRadius: { rest: "0.375rem", focus: "9999px", duration: 300, easing: "ease-in-out" } }} {...args} label="Pill on focus" description="Morphs to fully rounded on focus." defaultValue={42} morphRadius />
    </div>
  ),
};

export const MorphRadiusDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Morph radius (dark)" defaultValue={42} morphRadius />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-M: Chroma border
// ---------------------------------------------------------------------------

export const ChromaBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={lightConfig} {...args} label="Hue-rotate" description="Gradient cycles through the spectrum." defaultValue={42} chromaBorder />
      <NumberField config={{ ...lightConfig, chromaBorder: { variant: "aurora", opacity: 0.9, width: 2, radius: 6 } }} {...args} label="Aurora" description="Northern-lights palette." defaultValue={42} chromaBorder />
      <NumberField config={{ ...lightConfig, chromaBorder: { variant: "iridescent", opacity: 0.9, width: 2, radius: 6 } }} {...args} label="Iridescent" description="Holographic foil effect." defaultValue={42} chromaBorder />
    </div>
  ),
};

export const ChromaBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 320 }}>
      <NumberField config={darkNumberFieldConfig} {...args} label="Hue-rotate (dark)" defaultValue={42} chromaBorder />
    </div>
  ),
};
