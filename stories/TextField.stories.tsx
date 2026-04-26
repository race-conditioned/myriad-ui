import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "../src/text-field/TextField";
import { darkTextFieldConfig, defaultTheme } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Underline variant configs
//
// The consumer adjusts inputWrapper to remove the full border and rounded
// corners — the underline bar provides the visual state indicator instead.
// ---------------------------------------------------------------------------

const underlineInputWrapper = [
  "relative flex items-center bg-transparent border-b border-neutral-300",
  "transition-colors",
  "group-data-[invalid]:border-red-400",
  "group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed",
].join(" ");

const underlineConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: underlineInputWrapper,
};

const darkUnderlineInputWrapper = [
  "relative flex items-center bg-transparent border-b border-white/10",
  "transition-colors",
  "group-data-[invalid]:border-red-400/50",
  "group-data-[disabled]:opacity-40 group-data-[disabled]:cursor-not-allowed",
].join(" ");

const darkUnderlineConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkUnderlineInputWrapper,
};

// ---------------------------------------------------------------------------
// Icons used as prefix/suffix adornments
// ---------------------------------------------------------------------------

function icon(path: React.ReactNode) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 16, height: 16, display: "block" }}
    >
      {path}
    </svg>
  );
}

const SearchIcon = icon(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);
const MailIcon   = icon(<><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>);
const LockIcon   = icon(<><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>);
const UserIcon   = icon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  decorators: [
    (Story, context) => {
      const dark = context.parameters.darkCanvas as boolean | undefined;
      return dark ? (
        // Dark stories supply their own background — no white wrapper.
        <div style={{ width: 360 }}>
          <Story />
        </div>
      ) : (
        // White background so label/description text passes WCAG contrast
        // checks against the canvas (text-neutral-700 on white = 10.7:1).
        <div style={{ width: 360, background: "#ffffff", padding: 24 }}>
          <Story />
        </div>
      );
    },
  ],
  args: {
    label: "Label",
    size:  "md",
  },
  argTypes: {
    size:        { control: "select", options: ["sm", "md", "lg"] },
    isDisabled:  { control: "boolean" },
    isRequired:  { control: "boolean" },
    isReadOnly:  { control: "boolean" },
    isClearable: { control: "boolean" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: { placeholder: "Placeholder…" },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField {...args} size="sm" label="Small" placeholder="sm" />
      <TextField {...args} size="md" label="Medium" placeholder="md" />
      <TextField {...args} size="lg" label="Large" placeholder="lg" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With description
// ---------------------------------------------------------------------------

export const WithDescription: Story = {
  args: { description: "We'll never share your email with anyone." },
  render: (args) => (
    <TextField {...args} label="Email" placeholder="you@example.com" />
  ),
};

// ---------------------------------------------------------------------------
// Required
// ---------------------------------------------------------------------------

export const Required: Story = {
  args: { isRequired: true },
  render: (args) => (
    <TextField {...args} label="Username" placeholder="johndoe" />
  ),
};

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

export const Invalid: Story = {
  args: { isInvalid: true },
  render: (args) => (
    <TextField
      {...args}
      label="Email"
      placeholder="you@example.com"
      defaultValue="not-an-email"
      errorMessage="Please enter a valid email address."
    />
  ),
};

export const InvalidWithDescription: Story = {
  args: { isInvalid: true },
  render: (args) => (
    <TextField
      {...args}
      label="Email"
      description="We'll send a confirmation to this address."
      placeholder="you@example.com"
      defaultValue="not-an-email"
      errorMessage="Please enter a valid email address."
    />
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => (
    <TextField {...args} label="Username" defaultValue="johndoe" />
  ),
};

// ---------------------------------------------------------------------------
// Read-only
// ---------------------------------------------------------------------------

export const ReadOnly: Story = {
  args: { isReadOnly: true },
  render: (args) => (
    <TextField {...args} label="Account ID" defaultValue="acc_8j3kx92m" />
  ),
};

// ---------------------------------------------------------------------------
// Prefix adornments
// ---------------------------------------------------------------------------

export const WithPrefix: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField {...args} label="Search" placeholder="Search…" prefix={SearchIcon} />
      <TextField {...args} label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField {...args} label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} label="Username" placeholder="johndoe" prefix={UserIcon} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Suffix adornments — text tokens
// ---------------------------------------------------------------------------

export const WithSuffix: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField
        {...args}
        label="Domain"
        placeholder="yoursite"
        suffix={<span style={{ fontSize: 13, color: "#6b7280", paddingRight: 2 }}>.com</span>}
      />
      <TextField
        {...args}
        label="Price"
        placeholder="0.00"
        prefix={<span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>$</span>}
        suffix={<span style={{ fontSize: 12, color: "#9ca3af" }}>USD</span>}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Clearable
// ---------------------------------------------------------------------------

export const Clearable: Story = {
  args: { isClearable: true },
  render: (args) => (
    <TextField
      {...args}
      label="Search"
      prefix={SearchIcon}
      placeholder="Type something…"
      defaultValue="initial value"
    />
  ),
};

export const ClearableControlled: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = React.useState("edit or clear me");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TextField
          {...args}
          label="Controlled clearable"
          isClearable
          prefix={SearchIcon}
          value={value}
          onChange={setValue}
          placeholder="Type something…"
        />
        <p style={{ fontSize: 12, color: "#6b7280" }}>
          Value: <code style={{ background: "#f3f4f6", padding: "1px 4px", borderRadius: 4 }}>{JSON.stringify(value)}</code>
        </p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// All states at a glance
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField {...args} label="Default" placeholder="Placeholder…" />
      <TextField {...args} label="With value" defaultValue="John Doe" />
      <TextField {...args} label="With description" description="Hint text shown below the label." placeholder="Placeholder…" />
      <TextField {...args} label="Required" isRequired placeholder="Required field" />
      <TextField {...args} label="Required with value" isRequired defaultValue="filled in" />
      <TextField {...args} label="With prefix" placeholder="Search…" prefix={SearchIcon} />
      <TextField {...args} label="With suffix" placeholder="yoursite" suffix={<span style={{ fontSize: 13, color: "#6b7280", paddingRight: 2 }}>.com</span>} />
      <TextField {...args} label="Clearable (has value)" isClearable prefix={SearchIcon} defaultValue="chess openings" />
      <TextField {...args} label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} label="Disabled" isDisabled defaultValue="Cannot edit" />
      <TextField {...args} label="Disabled with prefix" isDisabled prefix={MailIcon} defaultValue="locked@example.com" />
      <TextField {...args} label="Read-only" isReadOnly defaultValue="acc_8j3kx92m" />
      <TextField {...args} label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
      <TextField {...args} label="Invalid with prefix" isInvalid prefix={MailIcon} defaultValue="not-an-email" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

// Dark background matching the NeverChess app aesthetic.
const DARK_BG = "#0f1923";

export const DarkMode: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24 }}>
      <TextField
        {...args}
        config={darkTextFieldConfig}
        label="Email"
        placeholder="you@example.com"
        prefix={MailIcon}
        description="We'll send a confirmation to this address."
      />
    </div>
  ),
};

export const DarkModeAllStates: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField config={darkTextFieldConfig} {...args} label="Default" placeholder="Placeholder…" />
      <TextField config={darkTextFieldConfig} {...args} label="With value" defaultValue="John Doe" />
      <TextField config={darkTextFieldConfig} {...args} label="With description" description="Hint text shown below the label." placeholder="Placeholder…" />
      <TextField config={darkTextFieldConfig} {...args} label="Required" isRequired placeholder="Required field" />
      <TextField config={darkTextFieldConfig} {...args} label="Required with value" isRequired defaultValue="filled in" />
      <TextField config={darkTextFieldConfig} {...args} label="With prefix" placeholder="Search…" prefix={SearchIcon} />
      <TextField config={darkTextFieldConfig} {...args} label="With suffix" placeholder="yoursite" suffix={<span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", paddingRight: 2 }}>.com</span>} />
      <TextField config={darkTextFieldConfig} {...args} label="Clearable (has value)" isClearable prefix={SearchIcon} defaultValue="chess openings" />
      <TextField config={darkTextFieldConfig} {...args} label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkTextFieldConfig} {...args} label="Disabled" isDisabled defaultValue="Cannot edit" />
      <TextField config={darkTextFieldConfig} {...args} label="Disabled with prefix" isDisabled prefix={MailIcon} defaultValue="locked@example.com" />
      <TextField config={darkTextFieldConfig} {...args} label="Read-only" isReadOnly defaultValue="acc_8j3kx92m" />
      <TextField config={darkTextFieldConfig} {...args} label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
      <TextField config={darkTextFieldConfig} {...args} label="Invalid with prefix" isInvalid prefix={MailIcon} defaultValue="not-an-email" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-A: Underline — static (no animation)
// ---------------------------------------------------------------------------

export const Underline: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" label="Username" placeholder="johndoe" isClearable defaultValue="hayden" />
      <TextField config={underlineConfig} {...args} variant="underline" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={underlineConfig} {...args} variant="underline" label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const UnderlineDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkUnderlineConfig} {...args} variant="underline" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-A: Underline animated variants
// ---------------------------------------------------------------------------

export const UnderlineAnimatedLeft: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="left" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="left" label="Username" placeholder="johndoe" isClearable defaultValue="hayden" />
      <TextField config={underlineConfig} {...args} variant="underline" animation="left" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={underlineConfig} {...args} variant="underline" animation="left" label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const UnderlineAnimatedRight: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="right" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="right" label="Username" placeholder="johndoe" isClearable defaultValue="hayden" />
      <TextField config={underlineConfig} {...args} variant="underline" animation="right" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={underlineConfig} {...args} variant="underline" animation="right" label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const UnderlineAnimatedCenter: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="center" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="center" label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="center" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
    </div>
  ),
};

export const UnderlineAnimatedDualLeft: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-left" label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-left" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-left" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
    </div>
  ),
};

export const UnderlineAnimatedDualRight: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-right" label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-right" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-right" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
    </div>
  ),
};

export const UnderlineAnimatedDualCenter: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-center" label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-center" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} variant="underline" animation="dual-center" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
    </div>
  ),
};

export const UnderlineAnimatedDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="left" label="Left" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="right" label="Right" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="center" label="Center" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="dual-left" label="Dual left" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="dual-right" label="Dual right" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="dual-center" label="Dual center" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="left" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
      <TextField config={darkUnderlineConfig} {...args} variant="underline" animation="left" label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-B: Floating label
// ---------------------------------------------------------------------------

export const FloatingLabel: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TextField {...args} floatingLabel label="Email" placeholder="you@example.com" />
      <TextField {...args} floatingLabel label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} floatingLabel label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField {...args} floatingLabel label="Username" isRequired placeholder="johndoe" />
      <TextField {...args} floatingLabel label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField {...args} floatingLabel label="Disabled" isDisabled defaultValue="Cannot edit" />
      <TextField {...args} floatingLabel label="Read-only" isReadOnly defaultValue="acc_8j3kx92m" />
    </div>
  ),
};

export const FloatingLabelSizes: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TextField {...args} floatingLabel size="sm" label="Small" placeholder="sm" />
      <TextField {...args} floatingLabel size="md" label="Medium" placeholder="md" />
      <TextField {...args} floatingLabel size="lg" label="Large" placeholder="lg" />
    </div>
  ),
};

export const FloatingLabelDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 28 }}>
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Username" isRequired placeholder="johndoe" />
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} floatingLabel label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-C: Glow border
// ---------------------------------------------------------------------------

const rotatingGlowConfig = {
  ...defaultTheme.components.textField,
  glow: {
    type:         "rotating" as const,
    color:        ["#f97316", "#ec4899", "#8b5cf6"],
    blur:         8,
    spread:       3,
    radius:       9,
    opacity:      0.75,
    duration:     300,
    spinDuration: 3,
  },
};

const darkRotatingGlowConfig = {
  ...darkTextFieldConfig,
  glow: {
    type:           "rotating" as const,
    color:          ["#fb923c", "#f472b6", "#a78bfa"],
    blur:           10,
    spread:         4,
    radius:         10,
    opacity:        0.7,
    duration:       300,
    spinDuration:   3,
    maskBackground: DARK_BG,
  },
};

// Uncontained variants — blur bleeds beyond the field into the page body.
// Intentional ambient halo effect. Set contained: false + larger spread/blur.
// Semi-transparent inputWrapper so the body glow shows through the input surface,
// mirroring how dark mode uses bg-white/5. maskBackground must be transparent so
// the mask element doesn't block the gradient.
const rotatingGlowUncontainedLightConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: [
    "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white/50 backdrop-blur-sm",
    "transition-[border-color,box-shadow]",
    "group-data-[focused]:border-orange-400",
    "group-data-[invalid]:border-red-500",
    "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-50",
  ].join(" "),
  glow: {
    type:           "rotating" as const,
    color:          ["#ea580c", "#db2777", "#7c3aed"],
    blur:           18,
    spread:         8,
    radius:         14,
    opacity:        0.7,
    duration:       300,
    spinDuration:   4,
    contained:      false,
    maskBackground: "transparent",
  },
};

const rotatingGlowUncontainedConfig = {
  ...darkTextFieldConfig,
  glow: {
    type:           "rotating" as const,
    color:          ["#fb923c", "#f472b6", "#a78bfa"],
    blur:           22,
    spread:         6,
    radius:         12,
    opacity:        0.85,
    duration:       300,
    spinDuration:   4,
    contained:      false,
    maskBackground: DARK_BG,
  },
};

export const GlowStatic: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} glow label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField {...args} glow label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField {...args} glow label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const GlowRotating: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={rotatingGlowConfig} {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={rotatingGlowConfig} {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={rotatingGlowConfig} {...args} glow label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={rotatingGlowConfig} {...args} glow label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

export const GlowStaticDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkTextFieldConfig} {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkTextFieldConfig} {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkTextFieldConfig} {...args} glow label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} glow label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const GlowRotatingDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkRotatingGlowConfig} {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkRotatingGlowConfig} {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkRotatingGlowConfig} {...args} glow label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkRotatingGlowConfig} {...args} glow label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

export const GlowRotatingBodyLight: Story = {
  args: {},
  render: (args) => (
    <div style={{ background: "#f0f2f5", padding: 40, display: "flex", flexDirection: "column", gap: 32 }}>
      <TextField config={rotatingGlowUncontainedLightConfig} {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={rotatingGlowUncontainedLightConfig} {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={rotatingGlowUncontainedLightConfig} {...args} glow label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
    </div>
  ),
};

export const GlowRotatingBodyDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 40, display: "flex", flexDirection: "column", gap: 32 }}>
      <TextField config={rotatingGlowUncontainedConfig} {...args} glow label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={rotatingGlowUncontainedConfig} {...args} glow label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={rotatingGlowUncontainedConfig} {...args} glow label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
    </div>
  ),
};

export const GlowWithFloatingLabel: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TextField config={rotatingGlowConfig} {...args} glow floatingLabel label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={rotatingGlowConfig} {...args} glow floatingLabel label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={rotatingGlowConfig} {...args} glow floatingLabel label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-D: Gradient border
//
// The inputWrapper strips out the default focus ring / focused border colour —
// the gradient ring is the sole focus indicator.
// ---------------------------------------------------------------------------

const gradientBorderInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
  "transition-colors",
  "group-data-[invalid]:border-red-500",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
].join(" ");

const gradientBorderConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: gradientBorderInputWrapper,
};

const darkGradientBorderInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
  "transition-colors",
  "group-data-[invalid]:border-red-500/60",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:opacity-40",
].join(" ");

const darkGradientBorderConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkGradientBorderInputWrapper,
};

export const GradientBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={gradientBorderConfig} {...args} gradientBorder label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={gradientBorderConfig} {...args} gradientBorder label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={gradientBorderConfig} {...args} gradientBorder label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={gradientBorderConfig} {...args} gradientBorder label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={gradientBorderConfig} {...args} gradientBorder label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const GradientBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkGradientBorderConfig} {...args} gradientBorder label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkGradientBorderConfig} {...args} gradientBorder label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkGradientBorderConfig} {...args} gradientBorder label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkGradientBorderConfig} {...args} gradientBorder label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkGradientBorderConfig} {...args} gradientBorder label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-E: SVG stroke draw
//
// Remove the default focus border/ring — the SVG stroke is the focus indicator.
// ---------------------------------------------------------------------------

const svgStrokeInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
  "transition-colors",
  "group-data-[invalid]:border-red-400",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
].join(" ");

const svgStrokeConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: svgStrokeInputWrapper,
};

const darkSvgStrokeInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
  "transition-colors",
  "group-data-[invalid]:border-red-500/50",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:opacity-40",
].join(" ");

const darkSvgStrokeConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkSvgStrokeInputWrapper,
};

export const SvgStroke: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={svgStrokeConfig} {...args} svgStroke label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={svgStrokeConfig} {...args} svgStroke label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={svgStrokeConfig} {...args} svgStroke label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={svgStrokeConfig} {...args} svgStroke label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={svgStrokeConfig} {...args} svgStroke label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const SvgStrokeCounterclockwise: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={{ ...svgStrokeConfig, svgStroke: { ...svgStrokeConfig.svgStroke!, drawDirection: "counterclockwise" } }} {...args} svgStroke label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={{ ...svgStrokeConfig, svgStroke: { ...svgStrokeConfig.svgStroke!, drawDirection: "counterclockwise" } }} {...args} svgStroke label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
    </div>
  ),
};

export const SvgStrokeDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkSvgStrokeConfig} {...args} svgStroke label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkSvgStrokeConfig} {...args} svgStroke label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkSvgStrokeConfig} {...args} svgStroke label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkSvgStrokeConfig} {...args} svgStroke label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkSvgStrokeConfig} {...args} svgStroke label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-F: Ornamental corners / split-line
//
// inputWrapper strips the default focus ring — the brackets are the sole
// focus indicator (the static border stays to define the field shape).
// ---------------------------------------------------------------------------

const cornersInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
  "transition-colors",
  "group-data-[invalid]:border-red-400",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
].join(" ");

const cornersConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: cornersInputWrapper,
};

const darkCornersInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
  "transition-colors",
  "group-data-[invalid]:border-red-500/50",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:opacity-40",
].join(" ");

const darkCornersConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkCornersInputWrapper,
};

export const Corners: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={cornersConfig} {...args} corners label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={cornersConfig} {...args} corners label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={cornersConfig} {...args} corners label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={cornersConfig} {...args} corners label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={cornersConfig} {...args} corners label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const CornersDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkCornersConfig} {...args} corners label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkCornersConfig} {...args} corners label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkCornersConfig} {...args} corners label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkCornersConfig} {...args} corners label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkCornersConfig} {...args} corners label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const CornersSplit: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={{ ...cornersConfig, corners: { ...cornersConfig.corners!, style: "split" } }} {...args} corners label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={{ ...cornersConfig, corners: { ...cornersConfig.corners!, style: "split" } }} {...args} corners label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={{ ...cornersConfig, corners: { ...cornersConfig.corners!, style: "split" } }} {...args} corners label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

export const CornersSplitDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={{ ...darkCornersConfig, corners: { ...darkCornersConfig.corners!, style: "split" } }} {...args} corners label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={{ ...darkCornersConfig, corners: { ...darkCornersConfig.corners!, style: "split" } }} {...args} corners label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={{ ...darkCornersConfig, corners: { ...darkCornersConfig.corners!, style: "split" } }} {...args} corners label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-G: Background reveal
//
// A translucent wash slides in behind the input on focus.
// Works with any inputWrapper — no need to strip the focus ring.
// ---------------------------------------------------------------------------

export const BgReveal: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField {...args} bgReveal label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField {...args} bgReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} bgReveal label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField {...args} bgReveal label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField {...args} bgReveal label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const BgRevealDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkTextFieldConfig} {...args} bgReveal label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkTextFieldConfig} {...args} bgReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkTextFieldConfig} {...args} bgReveal label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkTextFieldConfig} {...args} bgReveal label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} bgReveal label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const BgRevealDirections: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        {...args}
        bgReveal
        label="Left (default)"
        placeholder="Slides in from the left…"
        prefix={MailIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, bgReveal: { color: "rgba(249, 115, 22, 0.07)", direction: "right" } }}
        {...args}
        bgReveal
        label="Right"
        placeholder="Slides in from the right…"
        prefix={MailIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, bgReveal: { color: "rgba(249, 115, 22, 0.07)", direction: "center" } }}
        {...args}
        bgReveal
        label="Center"
        placeholder="Expands from the centre…"
        prefix={MailIcon}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-K: Ink-draw
//
// Strip the default focus ring — the ink stroke is the sole focus indicator.
// ---------------------------------------------------------------------------

const inkDrawInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
  "transition-colors",
  "group-data-[invalid]:border-red-400",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
].join(" ");

const inkDrawConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: inkDrawInputWrapper,
};

const darkInkDrawInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
  "transition-colors",
  "group-data-[invalid]:border-red-500/50",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:opacity-40",
].join(" ");

const darkInkDrawConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkInkDrawInputWrapper,
};

export const InkDraw: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={inkDrawConfig} {...args} inkDraw label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={inkDrawConfig} {...args} inkDraw label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={inkDrawConfig} {...args} inkDraw label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={inkDrawConfig} {...args} inkDraw label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={inkDrawConfig} {...args} inkDraw label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const InkDrawDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkInkDrawConfig} {...args} inkDraw label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkInkDrawConfig} {...args} inkDraw label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkInkDrawConfig} {...args} inkDraw label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkInkDrawConfig} {...args} inkDraw label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkInkDrawConfig} {...args} inkDraw label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-J: Character reveal
// ---------------------------------------------------------------------------

export const CharacterRevealFade: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField {...args} characterReveal label="Username" placeholder="johndoe" prefix={UserIcon} />
      <TextField {...args} characterReveal label="Email" type="email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField {...args} characterReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
    </div>
  ),
};

export const CharacterRevealSlideUp: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...defaultTheme.components.textField, characterReveal: { ...defaultTheme.components.textField.characterReveal!, variant: "char-slide-up" } }}
        {...args} characterReveal label="Username" placeholder="johndoe" prefix={UserIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, characterReveal: { ...defaultTheme.components.textField.characterReveal!, variant: "char-slide-up" } }}
        {...args} characterReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon}
      />
    </div>
  ),
};

export const CharacterRevealBlur: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...defaultTheme.components.textField, characterReveal: { ...defaultTheme.components.textField.characterReveal!, variant: "char-blur" } }}
        {...args} characterReveal label="Username" placeholder="johndoe" prefix={UserIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, characterReveal: { ...defaultTheme.components.textField.characterReveal!, variant: "char-blur" } }}
        {...args} characterReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon}
      />
    </div>
  ),
};

export const CharacterRevealDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkTextFieldConfig} {...args} characterReveal label="Username" placeholder="johndoe" prefix={UserIcon} />
      <TextField config={darkTextFieldConfig} {...args} characterReveal label="Email" type="email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkTextFieldConfig} {...args} characterReveal label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField
        config={{ ...darkTextFieldConfig, characterReveal: { ...darkTextFieldConfig.characterReveal!, variant: "char-slide-up" } }}
        {...args} characterReveal label="Slide up" placeholder="johndoe" prefix={UserIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, characterReveal: { ...darkTextFieldConfig.characterReveal!, variant: "char-blur" } }}
        {...args} characterReveal label="Blur" placeholder="johndoe" prefix={UserIcon}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-I: Cursor spotlight
// ---------------------------------------------------------------------------

export const CursorSpotlight: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField {...args} cursorSpotlight label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField {...args} cursorSpotlight label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField {...args} cursorSpotlight label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField {...args} cursorSpotlight label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField {...args} cursorSpotlight label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const CursorSpotlightDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkTextFieldConfig} {...args} cursorSpotlight label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkTextFieldConfig} {...args} cursorSpotlight label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkTextFieldConfig} {...args} cursorSpotlight label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkTextFieldConfig} {...args} cursorSpotlight label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} cursorSpotlight label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-H: Ripple and pulse effects
// ---------------------------------------------------------------------------

// Ripple configs strip the default focus ring — the wave is the sole indicator.
const rippleInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
  "transition-colors",
  "group-data-[invalid]:border-red-400",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
].join(" ");

const rippleConfig = {
  ...defaultTheme.components.textField,
  inputWrapper: rippleInputWrapper,
};

const darkRippleInputWrapper = [
  "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
  "transition-colors",
  "group-data-[invalid]:border-red-500/50",
  "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:opacity-40",
].join(" ");

const darkRippleConfig = {
  ...darkTextFieldConfig,
  inputWrapper: darkRippleInputWrapper,
};

export const Ripple: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={rippleConfig} {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={rippleConfig} {...args} ripple label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={rippleConfig} {...args} ripple label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={rippleConfig} {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={rippleConfig} {...args} ripple label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const RippleDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkRippleConfig} {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={darkRippleConfig} {...args} ripple label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={darkRippleConfig} {...args} ripple label="Search" placeholder="Search openings…" prefix={SearchIcon} isClearable />
      <TextField config={darkRippleConfig} {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkRippleConfig} {...args} ripple label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const PulseRings: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...rippleConfig, ripple: { ...rippleConfig.ripple!, variant: "pulse-rings" } }}
        {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...rippleConfig, ripple: { ...rippleConfig.ripple!, variant: "pulse-rings", ringCount: 3, duration: 2000 } }}
        {...args} ripple label="Three rings (slower)" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...rippleConfig, ripple: { ...rippleConfig.ripple!, variant: "pulse-rings" } }}
        {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address."
      />
    </div>
  ),
};

export const PulseRingsDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...darkRippleConfig, ripple: { ...darkRippleConfig.ripple!, variant: "pulse-rings" } }}
        {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...darkRippleConfig, ripple: { ...darkRippleConfig.ripple!, variant: "pulse-rings", ringCount: 3, duration: 2000 } }}
        {...args} ripple label="Three rings (slower)" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...darkRippleConfig, ripple: { ...darkRippleConfig.ripple!, variant: "pulse-rings" } }}
        {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address."
      />
    </div>
  ),
};

export const PulseBg: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...defaultTheme.components.textField, ripple: { ...defaultTheme.components.textField.ripple!, variant: "pulse-bg", color: "rgba(249, 115, 22, 0.09)", duration: 2000 } }}
        {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, ripple: { ...defaultTheme.components.textField.ripple!, variant: "pulse-bg", color: "rgba(249, 115, 22, 0.09)", duration: 2000 } }}
        {...args} ripple label="Password" type="password" placeholder="••••••••" prefix={LockIcon}
      />
      <TextField
        config={{ ...defaultTheme.components.textField, ripple: { ...defaultTheme.components.textField.ripple!, variant: "pulse-bg", color: "rgba(249, 115, 22, 0.09)", duration: 2000 } }}
        {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address."
      />
    </div>
  ),
};

export const PulseBgDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={{ ...darkTextFieldConfig, ripple: { ...darkTextFieldConfig.ripple!, variant: "pulse-bg", duration: 2000 } }}
        {...args} ripple label="Email" placeholder="you@example.com" prefix={MailIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, ripple: { ...darkTextFieldConfig.ripple!, variant: "pulse-bg", duration: 2000 } }}
        {...args} ripple label="Password" type="password" placeholder="••••••••" prefix={LockIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, ripple: { ...darkTextFieldConfig.ripple!, variant: "pulse-bg", duration: 2000 } }}
        {...args} ripple label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address."
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-L: Morphing border radius
// ---------------------------------------------------------------------------

export const MorphRadius: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Gentle rounding — default (6px → 14px) */}
      <TextField config={defaultTheme.components.textField} {...args} morphRadius label="Gentle" placeholder="6px → 14px on focus" prefix={MailIcon} />
      {/* Pill — goes fully round on focus */}
      <TextField
        config={{ ...defaultTheme.components.textField, morphRadius: { rest: "6px", focus: "9999px" } }}
        {...args} morphRadius label="Pill" placeholder="6px → pill on focus" prefix={SearchIcon}
      />
      {/* Asymmetric — one corner stays sharp */}
      <TextField
        config={{ ...defaultTheme.components.textField, morphRadius: { rest: "6px", focus: "2px 20px 20px 2px", duration: 300 } }}
        {...args} morphRadius label="Asymmetric" placeholder="corner morph on focus" prefix={LockIcon}
      />
      <TextField config={defaultTheme.components.textField} {...args} morphRadius label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={defaultTheme.components.textField} {...args} morphRadius label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const MorphRadiusDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField config={darkTextFieldConfig} {...args} morphRadius label="Gentle" placeholder="6px → 14px on focus" prefix={MailIcon} />
      <TextField
        config={{ ...darkTextFieldConfig, morphRadius: { rest: "6px", focus: "9999px" } }}
        {...args} morphRadius label="Pill" placeholder="6px → pill on focus" prefix={SearchIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, morphRadius: { rest: "6px", focus: "2px 20px 20px 2px", duration: 300 } }}
        {...args} morphRadius label="Asymmetric" placeholder="corner morph on focus" prefix={LockIcon}
      />
      <TextField config={darkTextFieldConfig} {...args} morphRadius label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} morphRadius label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-M: Chroma border — hue-rotate / aurora / iridescent
// ---------------------------------------------------------------------------

export const ChromaBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* hue-rotate: default palette, continuously cycles through spectrum */}
      <TextField
        config={defaultTheme.components.textField}
        {...args} chromaBorder label="Hue Rotate" description="Cycles through the full colour spectrum" placeholder="Click to focus" prefix={MailIcon}
      />
      {/* aurora: slow northern-lights sweep */}
      <TextField
        config={{ ...defaultTheme.components.textField, chromaBorder: { variant: "aurora" } }}
        {...args} chromaBorder label="Aurora" description="Northern-lights palette, 6s sweep" placeholder="Click to focus" prefix={SearchIcon}
      />
      {/* iridescent: tight rainbow foil */}
      <TextField
        config={{ ...defaultTheme.components.textField, chromaBorder: { variant: "iridescent" } }}
        {...args} chromaBorder label="Iridescent" description="Holographic rainbow foil, 4s loop" placeholder="Click to focus" prefix={LockIcon}
      />
      <TextField config={defaultTheme.components.textField} {...args} chromaBorder label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={defaultTheme.components.textField} {...args} chromaBorder label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const ChromaBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <TextField
        config={darkTextFieldConfig}
        {...args} chromaBorder label="Hue Rotate" description="Cycles through the full colour spectrum" placeholder="Click to focus" prefix={MailIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, chromaBorder: { variant: "aurora" } }}
        {...args} chromaBorder label="Aurora" description="Northern-lights palette, 6s sweep" placeholder="Click to focus" prefix={SearchIcon}
      />
      <TextField
        config={{ ...darkTextFieldConfig, chromaBorder: { variant: "iridescent" } }}
        {...args} chromaBorder label="Iridescent" description="Holographic rainbow foil, 4s loop" placeholder="Click to focus" prefix={LockIcon}
      />
      <TextField config={darkTextFieldConfig} {...args} chromaBorder label="Invalid" isInvalid defaultValue="bad-value" errorMessage="Please enter a valid email address." />
      <TextField config={darkTextFieldConfig} {...args} chromaBorder label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const FloatingLabelUnderline: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <TextField config={underlineConfig} {...args} floatingLabel variant="underline" animation="left" label="Email" placeholder="you@example.com" prefix={MailIcon} />
      <TextField config={underlineConfig} {...args} floatingLabel variant="underline" animation="center" label="Password" type="password" placeholder="••••••••" prefix={LockIcon} />
      <TextField config={underlineConfig} {...args} floatingLabel variant="underline" animation="left" label="Invalid" isInvalid defaultValue="bad-value" errorMessage="This value is not valid." />
    </div>
  ),
};
