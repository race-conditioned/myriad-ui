import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../src/slider/Slider";
import { defaultTheme, darkSliderConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Slider",
  component: Slider,
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
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const sliderConfig = defaultTheme.components.slider;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Volume" defaultValue={40} />
  ),
};

export const NoLabel: Story = {
  render: () => (
    <Slider config={sliderConfig} aria-label="Volume" defaultValue={40} />
  ),
};

export const NoOutput: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Volume" defaultValue={40} showOutput={false} />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Slider
      config={sliderConfig}
      label="Volume"
      defaultValue={60}
      description="Adjust the playback volume."
    />
  ),
};

// ---------------------------------------------------------------------------
// Min / max / step
// ---------------------------------------------------------------------------

export const MinMax: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Price" minValue={100} maxValue={1000} defaultValue={400} />
  ),
};

export const WithStep: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Rating" minValue={0} maxValue={10} step={1} defaultValue={7} />
  ),
};

export const Percentage: Story = {
  render: () => (
    <Slider
      config={sliderConfig}
      label="Opacity"
      minValue={0}
      maxValue={100}
      step={5}
      defaultValue={75}
      formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
    />
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Slider config={sliderConfig} size="sm" label="Small (sm)" defaultValue={30} />
      <Slider config={sliderConfig} size="md" label="Medium (md)" defaultValue={60} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Range (two thumbs)
// ---------------------------------------------------------------------------

export const Range: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Price range" defaultValue={[20, 80]} />
  ),
};

export const RangeWithStep: Story = {
  render: () => (
    <Slider
      config={sliderConfig}
      label="Year range"
      minValue={1990}
      maxValue={2025}
      step={1}
      defaultValue={[2000, 2020]}
    />
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <Slider config={sliderConfig} label="Volume" defaultValue={40} isDisabled />
  ),
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

function ControlledDemo() {
  const [value, setValue] = React.useState(50);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Slider
        config={sliderConfig}
        label="Volume"
        value={value}
        onChange={(v) => setValue(v as number)}
      />
      <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
        Value: <strong>{value}</strong>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

// ---------------------------------------------------------------------------
// Dark
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Slider config={darkSliderConfig} label="Volume" defaultValue={40} />
  ),
};

export const RangeDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Slider config={darkSliderConfig} label="Price range" defaultValue={[20, 80]} />
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Slider config={darkSliderConfig} size="sm" label="Small (sm)" defaultValue={30} />
      <Slider config={darkSliderConfig} size="md" label="Medium (md)" defaultValue={60} />
    </div>
  ),
};

export const DisabledDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Slider config={darkSliderConfig} label="Volume" defaultValue={40} isDisabled />
  ),
};
