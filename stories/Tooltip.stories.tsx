import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../src/tooltip/Tooltip";
import { Button } from "../src/button/Button";
import { defaultTheme } from "../src/theme/defaults";

const buttonConfig = defaultTheme.components.button;

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function icon(path: React.ReactNode) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}>
      {path}
    </svg>
  );
}

const Trash    = icon(<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>);
const Settings = icon(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>);
const Plus     = icon(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>);
const Pencil   = icon(<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  args: {
    content:   "Tooltip label",
    placement: "top",
    delay:     700,
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    delay:      { control: "number" },
    closeDelay: { control: "number" },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default — hover to see the tooltip
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  render: (args) => (
    <Tooltip {...args}>
      <Button config={buttonConfig}>Hover me</Button>
    </Tooltip>
  ),
};

// ---------------------------------------------------------------------------
// Placements
// ---------------------------------------------------------------------------

export const Placements: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} {...args} content={placement} placement={placement}>
          <Button config={buttonConfig} intent="secondary">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Icon-only buttons — the primary use case
// ---------------------------------------------------------------------------

export const IconButtons: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Tooltip {...args} content="Add item">
        <Button config={buttonConfig} shape="square" intent="primary" aria-label="Add item">{Plus}</Button>
      </Tooltip>
      <Tooltip {...args} content="Edit">
        <Button config={buttonConfig} shape="square" intent="secondary" aria-label="Edit">{Pencil}</Button>
      </Tooltip>
      <Tooltip {...args} content="Settings">
        <Button config={buttonConfig} shape="square" intent="ghost" aria-label="Settings">{Settings}</Button>
      </Tooltip>
      <Tooltip {...args} content="Delete — this cannot be undone" placement="bottom">
        <Button config={buttonConfig} shape="square" intent="danger" aria-label="Delete">{Trash}</Button>
      </Tooltip>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Instant show (delay=0) — useful when moving between multiple icon buttons
// ---------------------------------------------------------------------------

export const Instant: Story = {
  args: { delay: 0 },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {[
        { label: "Add",      ic: Plus,     intent: "primary"   },
        { label: "Edit",     ic: Pencil,   intent: "secondary" },
        { label: "Settings", ic: Settings, intent: "ghost"     },
        { label: "Delete",   ic: Trash,    intent: "danger"    },
      ].map(({ label, ic, intent }) => (
        <Tooltip key={label} {...args} content={label} delay={0}>
          <Button
            config={buttonConfig}
            shape="square"
            intent={intent as "primary" | "secondary" | "ghost" | "danger"}
            aria-label={label}
          >
            {ic}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — tooltip suppressed
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  args: {},
  render: (args) => (
    <Tooltip {...args} isDisabled>
      <Button config={buttonConfig} intent="ghost" shape="square" aria-label="Settings">{Settings}</Button>
    </Tooltip>
  ),
};

// ---------------------------------------------------------------------------
// Rich content — tooltip can contain more than plain text
// ---------------------------------------------------------------------------

export const RichContent: Story = {
  args: {},
  render: (args) => (
    <Tooltip
      {...args}
      content={
        <span>
          <strong>Delete</strong> — this action cannot be undone
        </span>
      }
      placement="bottom"
    >
      <Button config={buttonConfig} shape="square" intent="danger" aria-label="Delete">{Trash}</Button>
    </Tooltip>
  ),
};
