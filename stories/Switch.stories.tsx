import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src/switch/Switch";
import { defaultTheme, darkSwitchConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Switch",
  component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const switchConfig = defaultTheme.components.switch;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Switch config={switchConfig}>Enable notifications</Switch>
  ),
};

export const DefaultOn: Story = {
  render: () => (
    <Switch config={switchConfig} defaultSelected>Enable notifications</Switch>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <Switch config={switchConfig} aria-label="Enable notifications" />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch config={switchConfig} isDisabled>Enable notifications</Switch>
  ),
};

export const DisabledOn: Story = {
  render: () => (
    <Switch config={switchConfig} isDisabled defaultSelected>Enable notifications</Switch>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Switch config={switchConfig} isReadOnly defaultSelected>Enable notifications</Switch>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch config={switchConfig} size="sm" defaultSelected>Small (sm)</Switch>
      <Switch config={switchConfig} size="md" defaultSelected>Medium (md)</Switch>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Label position
// ---------------------------------------------------------------------------

export const LabelLeft: Story = {
  render: () => (
    <Switch config={switchConfig} labelPosition="left">Dark mode</Switch>
  ),
};

export const LabelRight: Story = {
  render: () => (
    <Switch config={switchConfig} labelPosition="right">Dark mode</Switch>
  ),
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

function ControlledDemo() {
  const [on, setOn] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Switch config={switchConfig} isSelected={on} onChange={setOn}>
        {on ? "On" : "Off"}
      </Switch>
      <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
        State: <strong>{on ? "enabled" : "disabled"}</strong>
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
    <Switch config={darkSwitchConfig}>Enable notifications</Switch>
  ),
};

export const DefaultOnDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Switch config={darkSwitchConfig} defaultSelected>Enable notifications</Switch>
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch config={darkSwitchConfig} size="sm" defaultSelected>Small (sm)</Switch>
      <Switch config={darkSwitchConfig} size="md" defaultSelected>Medium (md)</Switch>
    </div>
  ),
};

export const DisabledDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Switch config={darkSwitchConfig} isDisabled defaultSelected>Enable notifications</Switch>
  ),
};

export const LabelLeftDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Switch config={darkSwitchConfig} defaultSelected labelPosition="left">Dark mode</Switch>
  ),
};
