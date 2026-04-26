import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "../src/radio-group/RadioGroup";
import { defaultTheme, darkRadioConfig, darkRadioGroupConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/RadioGroup",
  component: Radio,
  parameters: { layout: "centered" },
  args: { value: "option" },
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const radioConfig = defaultTheme.components.radio;
const rgConfig = defaultTheme.components.radioGroup;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Radio config={radioConfig} value="option">Option A</Radio>
  ),
};

export const Selected: Story = {
  render: () => (
    <RadioGroup config={rgConfig} defaultValue="email">
      <Radio config={radioConfig} value="email">Email</Radio>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Radio config={radioConfig} value="option" description="This is a helpful description.">
      Option with description
    </Radio>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup config={rgConfig} defaultValue="email">
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms" isDisabled>SMS (unavailable)</Radio>
    </RadioGroup>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <RadioGroup config={rgConfig}>
      <Radio config={radioConfig} size="sm" value="sm">Small (sm)</Radio>
      <Radio config={radioConfig} size="md" value="md">Medium (md)</Radio>
      <Radio config={radioConfig} size="lg" value="lg">Large (lg)</Radio>
    </RadioGroup>
  ),
};

// ---------------------------------------------------------------------------
// Group — vertical (default)
// ---------------------------------------------------------------------------

export const Group: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Notification method">
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupWithDescription: Story = {
  render: () => (
    <RadioGroup
      config={rgConfig}
      label="Notification method"
      description="Choose how you'd like to receive updates."
    >
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupRequired: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Notification method" isRequired>
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Notification method" isDisabled>
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupInvalid: Story = {
  render: () => (
    <RadioGroup
      config={rgConfig}
      label="Notification method"
      isInvalid
      errorMessage="Please select a notification method."
    >
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupDefaultSelected: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Notification method" defaultValue="sms">
      <Radio config={radioConfig} value="email">Email</Radio>
      <Radio config={radioConfig} value="sms">SMS</Radio>
      <Radio config={radioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

// ---------------------------------------------------------------------------
// Group — horizontal orientation
// ---------------------------------------------------------------------------

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Size" orientation="horizontal">
      <Radio config={radioConfig} value="xs">XS</Radio>
      <Radio config={radioConfig} value="sm">SM</Radio>
      <Radio config={radioConfig} value="md">MD</Radio>
      <Radio config={radioConfig} value="lg">LG</Radio>
      <Radio config={radioConfig} value="xl">XL</Radio>
    </RadioGroup>
  ),
};

export const GroupHorizontalWithDescription: Story = {
  render: () => (
    <RadioGroup
      config={rgConfig}
      label="Payment plan"
      description="All plans include a 14-day free trial."
      orientation="horizontal"
    >
      <Radio config={radioConfig} value="monthly">Monthly</Radio>
      <Radio config={radioConfig} value="annual">Annual</Radio>
    </RadioGroup>
  ),
};

// ---------------------------------------------------------------------------
// Radio with description in a group
// ---------------------------------------------------------------------------

export const GroupWithItemDescriptions: Story = {
  render: () => (
    <RadioGroup config={rgConfig} label="Notification method">
      <Radio config={radioConfig} value="email" description="Sent to your registered email address.">Email</Radio>
      <Radio config={radioConfig} value="sms" description="Standard messaging rates apply.">SMS</Radio>
      <Radio config={radioConfig} value="push" description="Requires the mobile app.">Push notification</Radio>
    </RadioGroup>
  ),
};

// ---------------------------------------------------------------------------
// Dark
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <RadioGroup config={darkRadioGroupConfig} label="Notification method">
      <Radio config={darkRadioConfig} value="email">Email</Radio>
      <Radio config={darkRadioConfig} value="sms">SMS</Radio>
      <Radio config={darkRadioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupDefaultSelectedDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <RadioGroup config={darkRadioGroupConfig} label="Notification method" defaultValue="email">
      <Radio config={darkRadioConfig} value="email">Email</Radio>
      <Radio config={darkRadioConfig} value="sms">SMS</Radio>
      <Radio config={darkRadioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const GroupHorizontalDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <RadioGroup config={darkRadioGroupConfig} label="Size" orientation="horizontal" defaultValue="md">
      <Radio config={darkRadioConfig} value="xs">XS</Radio>
      <Radio config={darkRadioConfig} value="sm">SM</Radio>
      <Radio config={darkRadioConfig} value="md">MD</Radio>
      <Radio config={darkRadioConfig} value="lg">LG</Radio>
      <Radio config={darkRadioConfig} value="xl">XL</Radio>
    </RadioGroup>
  ),
};

export const GroupInvalidDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <RadioGroup
      config={darkRadioGroupConfig}
      label="Notification method"
      isInvalid
      errorMessage="Please select a notification method."
    >
      <Radio config={darkRadioConfig} value="email">Email</Radio>
      <Radio config={darkRadioConfig} value="sms">SMS</Radio>
      <Radio config={darkRadioConfig} value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <RadioGroup config={darkRadioGroupConfig}>
      <Radio config={darkRadioConfig} size="sm" value="sm">Small (sm)</Radio>
      <Radio config={darkRadioConfig} size="md" value="md">Medium (md)</Radio>
      <Radio config={darkRadioConfig} size="lg" value="lg">Large (lg)</Radio>
    </RadioGroup>
  ),
};
