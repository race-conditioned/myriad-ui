import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ComboBox, ComboBoxItem, ComboBoxSection, ComboBoxSeparator } from "../src/combo-box/ComboBox";
import { darkComboBoxConfig, defaultTheme } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/ComboBox",
  component: ComboBox,
  parameters: { layout: "centered" },
  decorators: [
    (Story, context) => {
      const dark = context.parameters.darkCanvas as boolean | undefined;
      return dark ? (
        <div style={{ width: 360, background: "#0f172a", padding: 32, borderRadius: 12 }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 360, background: "#ffffff", padding: 32, borderRadius: 12 }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared item sets
// ---------------------------------------------------------------------------

function FruitItems() {
  return (
    <>
      <ComboBoxItem id="apple">Apple</ComboBoxItem>
      <ComboBoxItem id="apricot">Apricot</ComboBoxItem>
      <ComboBoxItem id="banana">Banana</ComboBoxItem>
      <ComboBoxItem id="blueberry">Blueberry</ComboBoxItem>
      <ComboBoxItem id="cherry">Cherry</ComboBoxItem>
      <ComboBoxItem id="durian" isDisabled>Durian (unavailable)</ComboBoxItem>
      <ComboBoxItem id="elderberry">Elderberry</ComboBoxItem>
      <ComboBoxItem id="fig">Fig</ComboBoxItem>
    </>
  );
}

function CountryItems() {
  return (
    <>
      <ComboBoxSection header="North America">
        <ComboBoxItem id="us">United States</ComboBoxItem>
        <ComboBoxItem id="ca">Canada</ComboBoxItem>
        <ComboBoxItem id="mx">Mexico</ComboBoxItem>
      </ComboBoxSection>
      <ComboBoxSeparator />
      <ComboBoxSection header="Europe">
        <ComboBoxItem id="gb">United Kingdom</ComboBoxItem>
        <ComboBoxItem id="de">Germany</ComboBoxItem>
        <ComboBoxItem id="fr">France</ComboBoxItem>
      </ComboBoxSection>
    </>
  );
}

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" placeholder="Type or select…">
      <FruitItems />
    </ComboBox>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <ComboBox aria-label="Fruit" placeholder="Type or select…">
      <FruitItems />
    </ComboBox>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" description="Type to filter, then press Enter." placeholder="Type or select…">
      <FruitItems />
    </ComboBox>
  ),
};

export const Sections: Story = {
  render: () => (
    <ComboBox label="Country" placeholder="Type or select…">
      <CountryItems />
    </ComboBox>
  ),
};

export const AllowsCustomValue: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" placeholder="Type or select…" allowsCustomValue>
      <FruitItems />
    </ComboBox>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ComboBox size="sm" aria-label="Small" placeholder="Small (sm)"><FruitItems /></ComboBox>
      <ComboBox size="md" aria-label="Medium" placeholder="Medium (md)"><FruitItems /></ComboBox>
      <ComboBox size="lg" aria-label="Large" placeholder="Large (lg)"><FruitItems /></ComboBox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Invalid: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" placeholder="Type or select…" isInvalid errorMessage="Please select a valid fruit.">
      <FruitItems />
    </ComboBox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" placeholder="Type or select…" isDisabled>
      <FruitItems />
    </ComboBox>
  ),
};

export const Required: Story = {
  render: () => (
    <ComboBox label="Favourite fruit" placeholder="Type or select…" isRequired>
      <FruitItems />
    </ComboBox>
  ),
};

// ---------------------------------------------------------------------------
// Dark — basic
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Favourite fruit" placeholder="Type or select…">
      <FruitItems />
    </ComboBox>
  ),
};

export const SectionsDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Country" placeholder="Type or select…">
      <CountryItems />
    </ComboBox>
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ComboBox config={darkComboBoxConfig} size="sm" aria-label="Small" placeholder="Small (sm)"><FruitItems /></ComboBox>
      <ComboBox config={darkComboBoxConfig} size="md" aria-label="Medium" placeholder="Medium (md)"><FruitItems /></ComboBox>
      <ComboBox config={darkComboBoxConfig} size="lg" aria-label="Large" placeholder="Large (lg)"><FruitItems /></ComboBox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX — light
// ---------------------------------------------------------------------------

export const Glow: Story = {
  render: () => (
    <ComboBox label="Fruit" placeholder="Focus to glow…" glow>
      <FruitItems />
    </ComboBox>
  ),
};

export const GradientBorder: Story = {
  render: () => (
    <ComboBox
      config={{
        ...defaultTheme.components.comboBox,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white",
          "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for gradient border…"
      gradientBorder
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const SvgStroke: Story = {
  render: () => (
    <ComboBox
      config={{
        ...defaultTheme.components.comboBox,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
          "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus to draw stroke…"
      svgStroke
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const Corners: Story = {
  render: () => (
    <ComboBox label="Fruit" placeholder="Focus for corner brackets…" corners>
      <FruitItems />
    </ComboBox>
  ),
};

export const BgReveal: Story = {
  render: () => (
    <ComboBox label="Fruit" placeholder="Focus to reveal background…" bgReveal>
      <FruitItems />
    </ComboBox>
  ),
};

export const Pulse: Story = {
  render: () => (
    <ComboBox
      config={{
        ...defaultTheme.components.comboBox,
        ripple: { variant: "pulse-rings", color: "rgba(249, 115, 22, 0.30)", duration: 1500, radius: 6 },
      }}
      label="Fruit"
      placeholder="Focus for pulse rings…"
      ripple
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const CursorSpotlight: Story = {
  render: () => (
    <ComboBox label="Fruit" placeholder="Hover for spotlight…" cursorSpotlight>
      <FruitItems />
    </ComboBox>
  ),
};

export const InkDraw: Story = {
  render: () => (
    <ComboBox
      config={{
        ...defaultTheme.components.comboBox,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
          "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for ink draw…"
      inkDraw
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const MorphRadius: Story = {
  render: () => (
    <ComboBox label="Fruit" placeholder="Focus to morph radius…" morphRadius>
      <FruitItems />
    </ComboBox>
  ),
};

export const ChromaBorder: Story = {
  render: () => (
    <ComboBox
      config={{
        ...defaultTheme.components.comboBox,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white",
          "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for chroma border…"
      chromaBorder
    >
      <FruitItems />
    </ComboBox>
  ),
};

// ---------------------------------------------------------------------------
// FX — dark
// ---------------------------------------------------------------------------

export const GlowDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Focus to glow…" glow>
      <FruitItems />
    </ComboBox>
  ),
};

export const GradientBorderDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox
      config={{
        ...darkComboBoxConfig,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white/5",
          "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for gradient border…"
      gradientBorder
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const SvgStrokeDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox
      config={{
        ...darkComboBoxConfig,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
          "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus to draw stroke…"
      svgStroke
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const CornersDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Focus for corner brackets…" corners>
      <FruitItems />
    </ComboBox>
  ),
};

export const BgRevealDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Focus to reveal background…" bgReveal>
      <FruitItems />
    </ComboBox>
  ),
};

export const PulseDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Focus for pulse rings…" ripple>
      <FruitItems />
    </ComboBox>
  ),
};

export const CursorSpotlightDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Hover for spotlight…" cursorSpotlight>
      <FruitItems />
    </ComboBox>
  ),
};

export const InkDrawDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox
      config={{
        ...darkComboBoxConfig,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
          "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for ink draw…"
      inkDraw
    >
      <FruitItems />
    </ComboBox>
  ),
};

export const MorphRadiusDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox config={darkComboBoxConfig} label="Fruit" placeholder="Focus to morph radius…" morphRadius>
      <FruitItems />
    </ComboBox>
  ),
};

export const ChromaBorderDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <ComboBox
      config={{
        ...darkComboBoxConfig,
        inputWrapper: [
          "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white/5",
          "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
        ].join(" "),
      }}
      label="Fruit"
      placeholder="Focus for chroma border…"
      chromaBorder
    >
      <FruitItems />
    </ComboBox>
  ),
};
