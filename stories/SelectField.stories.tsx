import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectField, SelectItem, SelectSection, SelectSeparator } from "../src/select-field/SelectField";
import { darkSelectFieldConfig, defaultTheme } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/SelectField",
  component: SelectField,
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
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Shared item sets
// ---------------------------------------------------------------------------

function FruitItems() {
  return (
    <>
      <SelectItem id="apple">Apple</SelectItem>
      <SelectItem id="banana">Banana</SelectItem>
      <SelectItem id="cherry">Cherry</SelectItem>
      <SelectItem id="durian" isDisabled>Durian (unavailable)</SelectItem>
      <SelectItem id="elderberry">Elderberry</SelectItem>
    </>
  );
}

function CountryItems() {
  return (
    <>
      <SelectSection header="North America">
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="ca">Canada</SelectItem>
        <SelectItem id="mx">Mexico</SelectItem>
      </SelectSection>
      <SelectSeparator />
      <SelectSection header="Europe">
        <SelectItem id="gb">United Kingdom</SelectItem>
        <SelectItem id="de">Germany</SelectItem>
        <SelectItem id="fr">France</SelectItem>
      </SelectSection>
    </>
  );
}

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { label: "Favourite fruit", placeholder: "Pick a fruit…" },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const NoLabel: Story = {
  args: { "aria-label": "Fruit", placeholder: "Pick a fruit…" },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const WithDescription: Story = {
  args: { label: "Favourite fruit", description: "We'll personalise your experience.", placeholder: "Pick a fruit…" },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const Sections: Story = {
  args: { label: "Country", placeholder: "Select your country…" },
  render: (args) => (
    <SelectField {...args}>
      <CountryItems />
    </SelectField>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SelectField size="sm" aria-label="Small" placeholder="Small (sm)">
        <FruitItems />
      </SelectField>
      <SelectField size="md" aria-label="Medium" placeholder="Medium (md)">
        <FruitItems />
      </SelectField>
      <SelectField size="lg" aria-label="Large" placeholder="Large (lg)">
        <FruitItems />
      </SelectField>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Invalid: Story = {
  args: { label: "Favourite fruit", placeholder: "Pick a fruit…", isInvalid: true, errorMessage: "Please select a fruit." },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const Disabled: Story = {
  args: { label: "Favourite fruit", placeholder: "Pick a fruit…", isDisabled: true },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const Required: Story = {
  args: { label: "Favourite fruit", placeholder: "Pick a fruit…", isRequired: true },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

// ---------------------------------------------------------------------------
// Dark — basic
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Favourite fruit", placeholder: "Pick a fruit…" },
  render: (args) => (
    <SelectField {...args}>
      <FruitItems />
    </SelectField>
  ),
};

export const SectionsDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Country", placeholder: "Select your country…" },
  render: (args) => (
    <SelectField {...args}>
      <CountryItems />
    </SelectField>
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SelectField config={darkSelectFieldConfig} size="sm" aria-label="Small" placeholder="Small (sm)">
        <FruitItems />
      </SelectField>
      <SelectField config={darkSelectFieldConfig} size="md" aria-label="Medium" placeholder="Medium (md)">
        <FruitItems />
      </SelectField>
      <SelectField config={darkSelectFieldConfig} size="lg" aria-label="Large" placeholder="Large (lg)">
        <FruitItems />
      </SelectField>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX — light
// ---------------------------------------------------------------------------

export const Glow: Story = {
  args: { label: "Fruit", placeholder: "Focus to glow…", glow: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const GradientBorder: Story = {
  args: {
    config: {
      ...defaultTheme.components.selectField,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-transparent bg-white cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for gradient border…",
    gradientBorder: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const SvgStroke: Story = {
  args: {
    config: {
      ...defaultTheme.components.selectField,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-neutral-200 bg-white cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus to draw stroke…",
    svgStroke: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const Corners: Story = {
  args: { label: "Fruit", placeholder: "Focus for corner brackets…", corners: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const BgReveal: Story = {
  args: { label: "Fruit", placeholder: "Focus to reveal background…", bgReveal: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const Pulse: Story = {
  args: {
    config: {
      ...defaultTheme.components.selectField,
      ripple: { variant: "pulse-rings", color: "rgba(249, 115, 22, 0.30)", duration: 1500, radius: 6 },
    },
    label: "Fruit",
    placeholder: "Focus for pulse rings…",
    ripple: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const CursorSpotlight: Story = {
  args: { label: "Fruit", placeholder: "Hover for spotlight…", cursorSpotlight: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const InkDraw: Story = {
  args: {
    config: {
      ...defaultTheme.components.selectField,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-neutral-200 bg-white cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for ink draw…",
    inkDraw: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const MorphRadius: Story = {
  args: { label: "Fruit", placeholder: "Focus to morph radius…", morphRadius: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const ChromaBorder: Story = {
  args: {
    config: {
      ...defaultTheme.components.selectField,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-transparent bg-white cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for chroma border…",
    chromaBorder: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

// ---------------------------------------------------------------------------
// FX — dark
// ---------------------------------------------------------------------------

export const GlowDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Focus to glow…", glow: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const GradientBorderDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSelectFieldConfig,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-transparent bg-white/5 cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for gradient border…",
    gradientBorder: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const SvgStrokeDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSelectFieldConfig,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-white/10 bg-white/5 cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus to draw stroke…",
    svgStroke: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const CornersDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Focus for corner brackets…", corners: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const BgRevealDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Focus to reveal background…", bgReveal: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const PulseDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Focus for pulse rings…", ripple: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const CursorSpotlightDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Hover for spotlight…", cursorSpotlight: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const InkDrawDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSelectFieldConfig,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-white/10 bg-white/5 cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for ink draw…",
    inkDraw: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const MorphRadiusDark: Story = {
  parameters: { darkCanvas: true },
  args: { config: darkSelectFieldConfig, label: "Fruit", placeholder: "Focus to morph radius…", morphRadius: true },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};

export const ChromaBorderDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSelectFieldConfig,
      trigger: [
        "relative flex items-center w-full overflow-hidden rounded-md border border-transparent bg-white/5 cursor-pointer",
        "outline-none data-[focus-visible]:outline-none",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Fruit",
    placeholder: "Focus for chroma border…",
    chromaBorder: true,
  },
  render: (args) => <SelectField {...args}><FruitItems /></SelectField>,
};
