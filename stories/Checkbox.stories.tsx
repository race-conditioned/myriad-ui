import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "../src/checkbox/Checkbox";
import { defaultTheme, darkCheckboxConfig, darkCheckboxGroupConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Checkbox",
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const cbConfig = defaultTheme.components.checkbox;
const cbgConfig = defaultTheme.components.checkboxGroup;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <Checkbox config={cbConfig}>Subscribe to newsletter</Checkbox>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Checkbox config={cbConfig} description="We'll send you at most one email per week.">
      Subscribe to newsletter
    </Checkbox>
  ),
};

export const DefaultSelected: Story = {
  render: () => (
    <Checkbox config={cbConfig} defaultSelected>
      I agree to the terms
    </Checkbox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Checkbox config={cbConfig} isDisabled>
      Disabled option
    </Checkbox>
  ),
};

export const DisabledSelected: Story = {
  render: () => (
    <Checkbox config={cbConfig} isDisabled defaultSelected>
      Disabled and checked
    </Checkbox>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Checkbox config={cbConfig} isInvalid>
      Accept terms and conditions
    </Checkbox>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Checkbox config={cbConfig} isReadOnly defaultSelected>
      Read-only option
    </Checkbox>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <Checkbox config={cbConfig} isIndeterminate>
      Select all
    </Checkbox>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox config={cbConfig} size="sm">Small (sm)</Checkbox>
      <Checkbox config={cbConfig} size="md">Medium (md)</Checkbox>
      <Checkbox config={cbConfig} size="lg">Large (lg)</Checkbox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Group
// ---------------------------------------------------------------------------

export const Group: Story = {
  render: () => (
    <CheckboxGroup config={cbgConfig} label="Notifications">
      <Checkbox config={cbConfig}>Email</Checkbox>
      <Checkbox config={cbConfig}>SMS</Checkbox>
      <Checkbox config={cbConfig}>Push notifications</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupWithDescription: Story = {
  render: () => (
    <CheckboxGroup config={cbgConfig} label="Notifications" description="Choose how you'd like to be notified.">
      <Checkbox config={cbConfig}>Email</Checkbox>
      <Checkbox config={cbConfig}>SMS</Checkbox>
      <Checkbox config={cbConfig}>Push notifications</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupRequired: Story = {
  render: () => (
    <CheckboxGroup config={cbgConfig} label="Notifications" isRequired>
      <Checkbox config={cbConfig}>Email</Checkbox>
      <Checkbox config={cbConfig}>SMS</Checkbox>
      <Checkbox config={cbConfig}>Push notifications</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup config={cbgConfig} label="Notifications" isDisabled>
      <Checkbox config={cbConfig}>Email</Checkbox>
      <Checkbox config={cbConfig}>SMS</Checkbox>
      <Checkbox config={cbConfig}>Push notifications</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupInvalid: Story = {
  render: () => (
    <CheckboxGroup config={cbgConfig} label="Terms" isInvalid errorMessage="You must accept at least one.">
      <Checkbox config={cbConfig}>Terms of service</Checkbox>
      <Checkbox config={cbConfig}>Privacy policy</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup config={{ ...cbgConfig, items: "flex flex-row gap-4" }} label="Toppings">
      <Checkbox config={cbConfig}>Cheese</Checkbox>
      <Checkbox config={cbConfig}>Pepperoni</Checkbox>
      <Checkbox config={cbConfig}>Mushrooms</Checkbox>
    </CheckboxGroup>
  ),
};

// ---------------------------------------------------------------------------
// Indeterminate "select all" pattern
// ---------------------------------------------------------------------------

function SelectAllExample() {
  const [selected, setSelected] = React.useState<string[]>(["email"]);
  const allValues = ["email", "sms", "push"];
  const allSelected = allValues.every((v) => selected.includes(v));
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox
        config={cbConfig}
        isSelected={allSelected}
        isIndeterminate={someSelected}
        onChange={(checked) => setSelected(checked ? allValues : [])}
      >
        Select all
      </Checkbox>
      <div style={{ marginLeft: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        <CheckboxGroup config={cbgConfig} value={selected} onChange={setSelected}>
          <Checkbox config={cbConfig} value="email">Email</Checkbox>
          <Checkbox config={cbConfig} value="sms">SMS</Checkbox>
          <Checkbox config={cbConfig} value="push">Push notifications</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export const SelectAll: Story = {
  render: () => <SelectAllExample />,
};

// ---------------------------------------------------------------------------
// Dark
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Checkbox config={darkCheckboxConfig}>Subscribe to newsletter</Checkbox>
  ),
};

export const WithDescriptionDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Checkbox config={darkCheckboxConfig} description="We'll send you at most one email per week.">
      Subscribe to newsletter
    </Checkbox>
  ),
};

export const IndeterminateDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <Checkbox config={darkCheckboxConfig} isIndeterminate>
      Select all
    </Checkbox>
  ),
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox config={darkCheckboxConfig} size="sm">Small (sm)</Checkbox>
      <Checkbox config={darkCheckboxConfig} size="md">Medium (md)</Checkbox>
      <Checkbox config={darkCheckboxConfig} size="lg">Large (lg)</Checkbox>
    </div>
  ),
};

export const GroupDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <CheckboxGroup config={darkCheckboxGroupConfig} label="Notifications">
      <Checkbox config={darkCheckboxConfig}>Email</Checkbox>
      <Checkbox config={darkCheckboxConfig}>SMS</Checkbox>
      <Checkbox config={darkCheckboxConfig}>Push notifications</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupInvalidDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <CheckboxGroup config={darkCheckboxGroupConfig} label="Terms" isInvalid errorMessage="You must accept at least one.">
      <Checkbox config={darkCheckboxConfig}>Terms of service</Checkbox>
      <Checkbox config={darkCheckboxConfig}>Privacy policy</Checkbox>
    </CheckboxGroup>
  ),
};
