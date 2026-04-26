import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GlowBorderButton } from "../src/glow-border-button/GlowBorderButton";
import { defaultTheme } from "../src/theme/defaults";
import type { GlowBorderButtonConfig } from "../src/theme/types";

const config = defaultTheme.components.glowBorderButton;

// ---------------------------------------------------------------------------
// Helpers — defined before meta so mappings can reference them directly
// ---------------------------------------------------------------------------

const ArrowRight = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeft = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 5 5 12 12 19" />
  </svg>
);

// Alias — most stories use the right arrow as iconEnd
const Arrow = ArrowRight;

const meta = {
  title: "myriad-ui/GlowBorderButton",
  component: GlowBorderButton,
  parameters: { layout: "centered" },
  args: {
    config,
    children:  "Get Started",
    loading:   false,
    fullWidth: false,
  },
  argTypes: {
    loading:       { control: "boolean" },
    fullWidth:     { control: "boolean" },
    rollToLoading: { control: "boolean" },
    outline:       { control: "boolean" },
    lift:          { control: "boolean" },
    contentRaise:  { control: "boolean" },
    rollingText:   { control: "boolean" },
    // Boolean toggles in the controls panel — mapped to real nodes at render time.
    iconEnd:       { control: "boolean", mapping: { true: ArrowRight, false: undefined } },
    iconStart:     { control: "boolean", mapping: { true: ArrowLeft,  false: undefined } },
  },
} satisfies Meta<typeof GlowBorderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Shallow-merge a palette into a copy of the default config. */
function palette(
  stops: string[],
  focusColor: string,
  surfaceOverrides: Partial<GlowBorderButtonConfig["surface"]> = {},
): GlowBorderButtonConfig {
  return {
    ...config,
    colors:  { stops },
    surface: { ...config.surface, ...surfaceOverrides },
    focus:   { ...config.focus, color: focusColor },
  };
}

// ---------------------------------------------------------------------------
// Pre-built palettes — import these in app stories for quick wins
// ---------------------------------------------------------------------------

export const PALETTES = {
  /** Burnt orange → hot pink → violet — the default */
  sunset: palette(
    ["#f97316", "#ec4899", "#8b5cf6"],
    "rgba(249, 115, 22, 0.8)",
    // Deep mauve — carries the warm orange-pink hue without washing out
    { bg: "rgba(22, 5, 14, 0.96)", washOpacity: 0.12 },
  ),

  /** Electric blue → cyan → sky */
  ocean: palette(
    ["#2563eb", "#06b6d4", "#7dd3fc"],
    "rgba(6, 182, 212, 0.8)",
    // Deep navy — unmistakably blue inside
    { bg: "rgba(3, 12, 28, 0.96)", washOpacity: 0.12 },
  ),

  /** Emerald → lime → amber */
  forest: palette(
    ["#059669", "#84cc16", "#f59e0b"],
    "rgba(16, 185, 129, 0.8)",
    // Deep forest — rich green cast with earthy depth
    { bg: "rgba(3, 16, 7, 0.96)", washOpacity: 0.12 },
  ),

  /** Deep violet → fuchsia → rose */
  dusk: palette(
    ["#6d28d9", "#d946ef", "#fb7185"],
    "rgba(109, 40, 217, 0.8)",
    // Deep violet — punchy purple hue inside
    { bg: "rgba(14, 3, 22, 0.96)", washOpacity: 0.12 },
  ),

  /** Warm gold → amber → peach */
  gold: palette(
    ["#d97706", "#f59e0b", "#fcd34d"],
    "rgba(217, 119, 6, 0.8)",
    // Deep amber — warm honey tone inside
    { bg: "rgba(22, 11, 2, 0.96)", washOpacity: 0.12 },
  ),

  /** Ruby → crimson → coral */
  ruby: palette(
    ["#dc2626", "#e11d48", "#fb923c"],
    "rgba(220, 38, 38, 0.8)",
    // Deep crimson — rich red warmth inside
    { bg: "rgba(20, 3, 5, 0.96)", washOpacity: 0.12 },
  ),

  /** Arctic — ice blue → white → pale cyan */
  arctic: palette(
    ["#38bdf8", "#e0f2fe", "#67e8f9"],
    "rgba(56, 189, 248, 0.8)",
    // Deep ice — cool midnight blue with a brighter highlight
    { bg: "rgba(2, 10, 24, 0.97)", washOpacity: 0.12, highlightOpacity: 0.22 },
  ),

  /** Silver — cool grey shimmer for minimal / monochrome UIs */
  silver: palette(
    ["#94a3b8", "#e2e8f0", "#94a3b8"],
    "rgba(148, 163, 184, 0.8)",
    // Near-black with the faintest cool tint — intentionally restrained
    { bg: "rgba(6, 8, 11, 0.97)", washOpacity: 0.05 },
  ),
} satisfies Record<string, GlowBorderButtonConfig>;

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

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------

function glowIcon(path: React.ReactNode, size = 18) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, display: "block", flexShrink: 0 }}>
      {path}
    </svg>
  );
}

const Plus     = glowIcon(<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>);
const Trash    = glowIcon(<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></>);
const Settings = glowIcon(<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>);
const Search   = glowIcon(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);

/** Square padding config for icon-only glow buttons. */
const iconOnlyConfig = {
  ...config,
  content: { ...config.content, padding: "14px" },
};

// ---------------------------------------------------------------------------
// Default — no icon; use the controls panel to toggle iconStart / iconEnd
// ---------------------------------------------------------------------------

export const Default: Story = {};

// ---------------------------------------------------------------------------
// Icon placement
// ---------------------------------------------------------------------------

export const WithIconEnd:   Story = { args: { iconEnd:   ArrowRight } };
export const WithIconStart: Story = { args: { iconStart: ArrowLeft  } };
export const WithBothIcons: Story = { args: { iconStart: ArrowLeft, iconEnd: ArrowRight } };

// ---------------------------------------------------------------------------
// Animation states
// ---------------------------------------------------------------------------

export const Rolling: Story = {
  args: { rollingText: true, iconEnd: ArrowRight },
  parameters: rollingA11y,
};

export const ContentRaise: Story = {
  args: { contentRaise: true, iconEnd: ArrowRight },
};

export const RollingAndRaise: Story = {
  args: { rollingText: true, contentRaise: true, iconEnd: ArrowRight },
  parameters: rollingA11y,
};

export const Lift: Story = {
  args: { lift: true, iconEnd: Arrow },
};

export const FullCombo: Story = {
  args: { rollingText: true, contentRaise: true, lift: true, iconEnd: Arrow },
  parameters: rollingA11y,
};

// ---------------------------------------------------------------------------
// Icon-only
// ---------------------------------------------------------------------------

export const IconOnly: Story = {
  args: { config: iconOnlyConfig, "aria-label": "Add" },
  render: (args) => <GlowBorderButton {...args}>{Plus}</GlowBorderButton>,
};

export const IconOnlyPalettes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {(["sunset", "ocean", "forest", "dusk", "gold", "ruby", "arctic", "silver"] as const).map((key) => (
        <GlowBorderButton
          key={key}
          {...args}
          config={{ ...PALETTES[key], content: { ...PALETTES[key].content, padding: "14px" } }}
          aria-label={key}
          lift
        >
          {Settings}
        </GlowBorderButton>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

export const IconOnlyOutline: Story = {
  render: (args) => {
    const items = [
      { ic: Plus,     label: "Add"      },
      { ic: Search,   label: "Search"   },
      { ic: Settings, label: "Settings" },
      { ic: Trash,    label: "Delete"   },
    ] as const;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {items.map(({ ic, label }) => (
          <GlowBorderButton
            key={label}
            {...args}
            config={{ ...config, content: { ...config.content, padding: "14px" } }}
            aria-label={label}
            outline
            lift
          >
            {ic}
          </GlowBorderButton>
        ))}
      </div>
    );
  },
};

// Roll to loading — toggle "loading" in the controls panel to see the animation.

export const RollToLoading: Story = {
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <GlowBorderButton
        {...args}
        loading={loading}
        onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      />
    );
  },
  args: { rollToLoading: true, iconEnd: Arrow },
};
export const RollToLoadingCombo: Story = {
  render: (args) => {
    const [loading, setLoading] = React.useState(false);
    return (
      <GlowBorderButton
        {...args}
        loading={loading}
        onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
      />
    );
  },
  args: { rollToLoading: true, rollingText: true, contentRaise: true, lift: true, iconEnd: Arrow },
  parameters: rollingA11y,
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Loading: Story = {
  args: { loading: true, children: "Loading…" },
};

export const Disabled: Story = {
  args: { isDisabled: true, iconEnd: Arrow },
};

export const FullWidth: Story = {
  args: { fullWidth: true, iconEnd: Arrow },
  parameters: { layout: "padded" },
};

// ---------------------------------------------------------------------------
// Individual palettes
// ---------------------------------------------------------------------------

export const Ocean: Story  = { args: { config: PALETTES.ocean,  children: "Explore",    iconEnd: Arrow } };
export const Forest: Story = { args: { config: PALETTES.forest, children: "Learn More", iconEnd: Arrow } };
export const Dusk: Story   = { args: { config: PALETTES.dusk,   children: "Sign Up",    iconEnd: Arrow } };
export const Gold: Story   = { args: { config: PALETTES.gold,   children: "Upgrade",    iconEnd: Arrow } };
export const Ruby: Story   = { args: { config: PALETTES.ruby,   children: "Delete",     iconEnd: Arrow } };
export const Arctic: Story = { args: { config: PALETTES.arctic, children: "Connect",    iconEnd: Arrow } };
export const Silver: Story = { args: { config: PALETTES.silver, children: "Continue",   iconEnd: Arrow } };

// ---------------------------------------------------------------------------
// All palettes at a glance
// ---------------------------------------------------------------------------

const PALETTE_ROWS: Array<{ key: keyof typeof PALETTES; label: string; cta: string }> = [
  { key: "sunset", label: "Sunset (default)",      cta: "Get Started" },
  { key: "ocean",  label: "Ocean",                 cta: "Explore"     },
  { key: "forest", label: "Forest",                cta: "Learn More"  },
  { key: "dusk",   label: "Dusk",                  cta: "Sign Up"     },
  { key: "gold",   label: "Gold",                  cta: "Upgrade"     },
  { key: "ruby",   label: "Ruby",                  cta: "Delete"      },
  { key: "arctic", label: "Arctic",                cta: "Connect"     },
  { key: "silver", label: "Silver",                cta: "Continue"    },
];

export const AllPalettes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {PALETTE_ROWS.map(({ key, label, cta }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{
            width: 150,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4a7090",
            fontFamily: "monospace",
          }}>
            {label}
          </span>
          <GlowBorderButton {...args} config={PALETTES[key]} iconEnd={Arrow}>
            {cta}
          </GlowBorderButton>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

// ---------------------------------------------------------------------------
// Thick-border variants — border.width: 4 (2× default)
// ---------------------------------------------------------------------------

/** Applies 2× border width to any palette config. */
function thick(cfg: GlowBorderButtonConfig): GlowBorderButtonConfig {
  return { ...cfg, border: { ...cfg.border, width: 4 } };
}

export const ThickSunset: Story = { args: { config: thick(PALETTES.sunset), children: "Get Started", iconEnd: Arrow } };
export const ThickOcean: Story  = { args: { config: thick(PALETTES.ocean),  children: "Explore",    iconEnd: Arrow } };
export const ThickForest: Story = { args: { config: thick(PALETTES.forest), children: "Learn More", iconEnd: Arrow } };
export const ThickDusk: Story   = { args: { config: thick(PALETTES.dusk),   children: "Sign Up",    iconEnd: Arrow } };
export const ThickGold: Story   = { args: { config: thick(PALETTES.gold),   children: "Upgrade",    iconEnd: Arrow } };
export const ThickRuby: Story   = { args: { config: thick(PALETTES.ruby),   children: "Delete",     iconEnd: Arrow } };
export const ThickArctic: Story = { args: { config: thick(PALETTES.arctic), children: "Connect",    iconEnd: Arrow } };
export const ThickSilver: Story = { args: { config: thick(PALETTES.silver), children: "Continue",   iconEnd: Arrow } };

export const AllThickPalettes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {PALETTE_ROWS.map(({ key, label, cta }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{
            width: 150,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4a7090",
            fontFamily: "monospace",
          }}>
            {label}
          </span>
          <GlowBorderButton {...args} config={thick(PALETTES[key])} iconEnd={Arrow}>
            {cta}
          </GlowBorderButton>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

// ---------------------------------------------------------------------------
// Full-combo — rollingText + contentRaise + lift on every palette
// ---------------------------------------------------------------------------

export const ComboSunset: Story = { args: { config: PALETTES.sunset, children: "Get Started", iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboOcean: Story  = { args: { config: PALETTES.ocean,  children: "Explore",    iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboForest: Story = { args: { config: PALETTES.forest, children: "Learn More", iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboDusk: Story   = { args: { config: PALETTES.dusk,   children: "Sign Up",    iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboGold: Story   = { args: { config: PALETTES.gold,   children: "Upgrade",    iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboRuby: Story   = { args: { config: PALETTES.ruby,   children: "Delete",     iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboArctic: Story = { args: { config: PALETTES.arctic, children: "Connect",    iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };
export const ComboSilver: Story = { args: { config: PALETTES.silver, children: "Continue",   iconEnd: Arrow, rollingText: true, contentRaise: true, lift: true }, parameters: rollingA11y };

export const AllFullCombo: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {PALETTE_ROWS.map(({ key, label, cta }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{
            width: 150,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4a7090",
            fontFamily: "monospace",
          }}>
            {label}
          </span>
          <GlowBorderButton
            {...args}
            config={PALETTES[key]}
            iconEnd={Arrow}
            rollingText
            contentRaise
            lift
          >
            {cta}
          </GlowBorderButton>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded", ...rollingA11y },
};

// ---------------------------------------------------------------------------
// Outline / transparent-surface variant
//
// Surface bg is fully transparent — the glowing border ring floats in space
// with no filled interior. Works best over a dark or image backdrop.
// ---------------------------------------------------------------------------

export const Outline: Story = {
  args: { outline: true, iconEnd: Arrow, lift: true },
};

export const OutlineAllPalettes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {PALETTE_ROWS.map(({ key, label, cta }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{
            width: 150,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#4a7090",
            fontFamily: "monospace",
          }}>
            {label}
          </span>
          <GlowBorderButton {...args} config={PALETTES[key]} outline iconEnd={Arrow}>
            {cta}
          </GlowBorderButton>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

// ---------------------------------------------------------------------------
// Light-surface variant — works on light-mode backgrounds
// ---------------------------------------------------------------------------

export const LightSurface: Story = {
  args: {
    config: {
      ...config,
      surface: {
        ...config.surface,
        bg:           "rgba(255, 255, 255, 0.88)",
        backdropBlur: 16,
        washOpacity:  0.04,
      },
      content: { ...config.content, color: "#0f0a14" },
    },
    children: "Get Started",
    iconEnd:  Arrow,
  },
  parameters: { backgrounds: { default: "light" } },
};

