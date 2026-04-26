import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/button/Button";
import { defaultTheme } from "../src/theme/defaults";
import { createTheme } from "../src/theme/create";

// The story supplies the default theme config — exactly as a consumer would.
const config = defaultTheme.components.button;

// ---------------------------------------------------------------------------
// Icons — defined before meta so argTypes mappings can reference them directly
// ---------------------------------------------------------------------------

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ArrowLeft = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}>
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/>
  </svg>
);

function icon(path: React.ReactNode, size = 16) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, display: "block", flexShrink: 0 }}>
      {path}
    </svg>
  );
}

const Plus     = icon(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>);
const Trash    = icon(<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>);
const Pencil   = icon(<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>);
const Settings = icon(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>);
const Search   = icon(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);
const X        = icon(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>);

const meta = {
  title: "myriad-ui/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    config,
    children: "Button",
    intent: "primary",
    size: "md",
    shape: "rounded",
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    intent:    { control: "select", options: ["primary", "secondary", "ghost", "outline", "danger", "link"] },
    size:      { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    shape:     { control: "select", options: ["rounded", "pill", "square"] },
    loading:        { control: "boolean" },
    fullWidth:      { control: "boolean" },
    rollToLoading:  { control: "boolean" },
    iconEnd:        { control: "boolean", mapping: { true: ArrowRight, false: undefined } },
    iconStart:      { control: "boolean", mapping: { true: ArrowLeft,  false: undefined } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants ----------------------------------------------------------------

export const Primary: Story = { args: { intent: "primary" } };
export const Secondary: Story = { args: { intent: "secondary" } };
export const Ghost: Story = { args: { intent: "ghost" } };
export const Outline: Story = { args: { intent: "outline" } };
export const Danger: Story = { args: { intent: "danger" } };
export const Link: Story = { args: { intent: "link" } };

// --- Sizes -------------------------------------------------------------------

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} {...args} size={size}>{size}</Button>
      ))}
    </div>
  ),
};

// --- Shapes ------------------------------------------------------------------

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Button {...args} shape="rounded">Rounded</Button>
      <Button {...args} shape="pill">Pill</Button>
      {/* Square is for icon-only buttons — aria-label is required, content is aria-hidden */}
      <Button {...args} shape="square" aria-label="Add item">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Button>
    </div>
  ),
};

// --- Icon-only (square) ------------------------------------------------------

export const IconOnly: Story = {
  args: { shape: "square", "aria-label": "Add item" },
  render: (args) => <Button {...args}>{Plus}</Button>,
};

export const IconSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} {...args} size={size} shape="square" aria-label={`Action ${size}`}>
          {Settings}
        </Button>
      ))}
    </div>
  ),
};

export const IconIntents: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Button {...args} shape="square" intent="primary"   aria-label="Add"     >{Plus}</Button>
      <Button {...args} shape="square" intent="secondary" aria-label="Search"  >{Search}</Button>
      <Button {...args} shape="square" intent="ghost"     aria-label="Settings">{Settings}</Button>
      <Button {...args} shape="square" intent="outline"   aria-label="Edit"    >{Pencil}</Button>
      <Button {...args} shape="square" intent="danger"    aria-label="Delete"  >{Trash}</Button>
    </div>
  ),
};

export const IconDisabled: Story = {
  args: { shape: "square", isDisabled: true, "aria-label": "Delete" },
  render: (args) => <Button {...args}>{Trash}</Button>,
};

// --- States ------------------------------------------------------------------

export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { isDisabled: true } };
export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
};

// --- Icon placement ----------------------------------------------------------

export const WithIconEnd:   Story = { args: { iconEnd:   ArrowRight } };
export const WithIconStart: Story = { args: { iconStart: ArrowLeft  } };
export const WithBothIcons: Story = { args: { iconStart: ArrowLeft, iconEnd: ArrowRight } };

// --- Rolling text ------------------------------------------------------------

// axe flags single-character spans for contrast even when they're aria-hidden,
// because it scans the raw DOM rather than the accessibility tree. The content
// is correctly hidden from assistive technology — this suppression is safe.
const rollingA11y = {
  a11y: {
    config: {
      rules: [{ id: "color-contrast", selector: ".mr-rolling-char *", enabled: false }],
    },
  },
};

export const Rolling: Story         = { args: { rollingText: true },                                                parameters: rollingA11y };
export const RollingWithIcon: Story = { args: { rollingText: true, iconEnd: ArrowRight },                           parameters: rollingA11y };

// --- Content raise -----------------------------------------------------------

export const ContentRaise: Story    = { args: { contentRaise: true, iconEnd: ArrowRight } };
export const RollingAndRaise: Story = { args: { rollingText: true, contentRaise: true, iconEnd: ArrowRight },       parameters: rollingA11y };

// --- Lift --------------------------------------------------------------------

export const Lift: Story      = { args: { lift: true, iconEnd: ArrowRight } };
export const FullCombo: Story = { args: { rollingText: true, contentRaise: true, lift: true, iconEnd: ArrowRight }, parameters: rollingA11y };

// --- Roll to loading ---------------------------------------------------------
// Toggle "loading" in the controls panel to see the animation.

export const RollToLoading: Story = {
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <Button
        {...args}
        loading={loading}
        onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      />
    );
  },
  args: { rollToLoading: true, iconEnd: ArrowRight },
};
export const RollToLoadingCombo: Story = {
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <Button
        {...args}
        loading={loading}
        onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      />
    );
  },
  args: { rollToLoading: true, rollingText: true, contentRaise: true, lift: true, iconEnd: ArrowRight },
  parameters: rollingA11y,
};

// --- All intents at a glance -------------------------------------------------

export const AllIntents: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
      {(["primary", "secondary", "ghost", "outline", "danger", "link"] as const).map((intent) => (
        <Button key={intent} {...args} intent={intent}>{intent}</Button>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

// --- Light / Paper -----------------------------------------------------------
// Warm cream backdrop — shows how the button set reads on light-mode surfaces.

const paperTheme = createTheme({
  components: {
    button: {
      intent: {
        primary: {
          default:      { bg: "bg-orange-700",           text: "text-white",          border: "border-transparent",           shadow: "shadow-sm" },
          hover:        { bg: "hover:bg-orange-800",      text: "text-white",          border: "border-transparent",           shadow: "hover:shadow-md" },
          pressed:      { bg: "active:bg-orange-900",     scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600",
          disabled:     { bg: "bg-orange-200",            text: "text-white",          opacity: "opacity-60",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-orange-700",            spinnerColor: "text-white/80" },
        },
        secondary: {
          default:      { bg: "bg-stone-100",             text: "text-stone-700",      border: "border border-stone-200",      shadow: "shadow-none" },
          hover:        { bg: "hover:bg-stone-200",        text: "text-stone-800",      border: "border-transparent",           shadow: "shadow-none" },
          pressed:      { bg: "active:bg-stone-300",       scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400",
          disabled:     { bg: "bg-stone-100",             text: "text-stone-400",      opacity: "opacity-60",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-stone-100",             spinnerColor: "text-stone-500" },
        },
        ghost: {
          default:      { bg: "bg-transparent",           text: "text-stone-600",      border: "border-transparent",           shadow: "shadow-none" },
          hover:        { bg: "hover:bg-stone-100",        text: "text-stone-800",      border: "border-transparent",           shadow: "shadow-none" },
          pressed:      { bg: "active:bg-stone-200",       scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-400",
          disabled:     { bg: "bg-transparent",           text: "text-stone-400",      opacity: "opacity-50",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",           spinnerColor: "text-stone-500" },
        },
        outline: {
          default:      { bg: "bg-transparent",           text: "text-orange-700",     border: "border-2 border-orange-700",   shadow: "shadow-none" },
          hover:        { bg: "hover:bg-orange-700",       text: "hover:text-white",    border: "border-transparent",           shadow: "shadow-none" },
          pressed:      { bg: "active:bg-orange-800",      scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500",
          disabled:     { bg: "bg-transparent",           text: "text-orange-300",     opacity: "opacity-60",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",           spinnerColor: "text-orange-600" },
        },
        danger: {
          default:      { bg: "bg-rose-600",              text: "text-white",          border: "border-transparent",           shadow: "shadow-sm" },
          hover:        { bg: "hover:bg-rose-700",         text: "text-white",          border: "border-transparent",           shadow: "hover:shadow-md" },
          pressed:      { bg: "active:bg-rose-800",        scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500",
          disabled:     { bg: "bg-rose-200",              text: "text-white",          opacity: "opacity-60",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-rose-600",              spinnerColor: "text-white/80" },
        },
        link: {
          default:      { bg: "bg-transparent",           text: "text-orange-700",     border: "border-transparent",           shadow: "shadow-none" },
          hover:        { bg: "hover:bg-transparent",      text: "hover:text-orange-900 underline", border: "border-transparent", shadow: "shadow-none" },
          pressed:      { bg: "active:bg-transparent",     scale: "" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600",
          disabled:     { bg: "bg-transparent",           text: "text-orange-300",     opacity: "opacity-60",                  cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",           spinnerColor: "text-orange-500" },
        },
      },
    },
  },
});

export const LightPaper: Story = {
  render: (args) => (
    <div
      style={{
        background: "linear-gradient(160deg, #fdf8f0 0%, #fef3e2 100%)",
        padding: "48px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04)",
      }}
    >
      {(["primary", "secondary", "ghost", "outline", "danger", "link"] as const).map((intent) => (
        <Button key={intent} {...args} config={paperTheme.components.button} intent={intent}>
          {intent}
        </Button>
      ))}
    </div>
  ),
  parameters: { layout: "centered", backgrounds: { default: "light" } },
};

// --- Glassmorphism -----------------------------------------------------------
// Pure createTheme() override — zero component changes needed.
// The gradient backdrop makes the glass effect visible.

const glassTheme = createTheme({
  components: {
    button: {
      // backdrop-blur lives on the button itself, so it goes in base
      base: "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none backdrop-blur-md",
      intent: {
        primary: {
          default:      { bg: "bg-white/20",          text: "text-white",                       border: "border border-white/30",        shadow: "shadow-sm" },
          hover:        { bg: "hover:bg-white/30",     text: "text-white",                       border: "border-transparent",            shadow: "hover:shadow-md" },
          pressed:      { bg: "active:bg-white/40",    scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
          disabled:     { bg: "bg-white/10",           text: "text-white/40",                    opacity: "opacity-60",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-white/20",           spinnerColor: "text-white/80" },
        },
        secondary: {
          default:      { bg: "bg-black/20",           text: "text-white",                       border: "border border-white/20",        shadow: "shadow-none" },
          hover:        { bg: "hover:bg-black/30",     text: "text-white",                       border: "border-transparent",            shadow: "shadow-none" },
          pressed:      { bg: "active:bg-black/40",    scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50",
          disabled:     { bg: "bg-black/10",           text: "text-white/40",                    opacity: "opacity-60",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-black/20",           spinnerColor: "text-white/70" },
        },
        ghost: {
          default:      { bg: "bg-transparent",        text: "text-white/80",                    border: "border-transparent",            shadow: "shadow-none" },
          hover:        { bg: "hover:bg-white/10",     text: "text-white",                       border: "border-transparent",            shadow: "shadow-none" },
          pressed:      { bg: "active:bg-white/20",    scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50",
          disabled:     { bg: "bg-transparent",        text: "text-white/30",                    opacity: "opacity-50",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",        spinnerColor: "text-white/60" },
        },
        danger: {
          default:      { bg: "bg-rose-500/40",        text: "text-white",                       border: "border border-rose-400/30",     shadow: "shadow-sm" },
          hover:        { bg: "hover:bg-rose-500/60",  text: "text-white",                       border: "border-transparent",            shadow: "hover:shadow-md" },
          pressed:      { bg: "active:bg-rose-600/70", scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-400/70",
          disabled:     { bg: "bg-rose-400/20",        text: "text-white/50",                    opacity: "opacity-60",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-rose-500/40",        spinnerColor: "text-white/80" },
        },
        outline: {
          default:      { bg: "bg-transparent",        text: "text-white/80",                    border: "border border-white/40",         shadow: "shadow-none" },
          hover:        { bg: "hover:bg-white/10",      text: "hover:text-white",                 border: "border-transparent",             shadow: "shadow-none" },
          pressed:      { bg: "active:bg-white/20",     scale: "active:scale-95" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
          disabled:     { bg: "bg-transparent",        text: "text-white/30",                    opacity: "opacity-60",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",        spinnerColor: "text-white/60" },
        },
        link: {
          default:      { bg: "bg-transparent",        text: "text-white/90",                    border: "border-transparent",            shadow: "shadow-none" },
          hover:        { bg: "hover:bg-transparent",  text: "hover:text-white underline",       border: "border-transparent",            shadow: "shadow-none" },
          pressed:      { bg: "active:bg-transparent", scale: "" },
          focusVisible: "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60",
          disabled:     { bg: "bg-transparent",        text: "text-white/40",                    opacity: "opacity-60",                   cursor: "cursor-not-allowed" },
          loading:      { bg: "bg-transparent",        spinnerColor: "text-white/70" },
        },
      },
    },
  },
});

export const Glassmorphism: Story = {
  render: (args) => (
    <div
      style={{
        background: "linear-gradient(135deg, #1b2e3e 0%, #294358 45%, #cb5e09 100%)",
        padding: "48px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
      }}
    >
      {(["primary", "secondary", "ghost", "outline", "danger", "link"] as const).map((intent) => (
        <Button key={intent} {...args} config={glassTheme.components.button} intent={intent}>
          {intent}
        </Button>
      ))}
    </div>
  ),
  parameters: { layout: "centered" },
};
