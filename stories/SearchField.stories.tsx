import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "../src/search-field/SearchField";
import { darkSearchFieldConfig, defaultTheme } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Shared icon helper (for suffix badge stories)
// ---------------------------------------------------------------------------

function KbdBadge({ text }: { text: string }) {
  return (
    <kbd
      style={{
        fontSize: 11,
        fontFamily: "inherit",
        padding: "1px 5px",
        borderRadius: 4,
        border: "1px solid #d1d5db",
        background: "#f9fafb",
        color: "#6b7280",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </kbd>
  );
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/SearchField",
  component: SearchField,
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
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
  },
};

export const NoLabel: Story = {
  args: {
    "aria-label": "Search",
    placeholder: "Search…",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Search",
    description: "Results update as you type.",
    placeholder: "Search…",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Quick search",
    placeholder: "Search…",
    suffix: <KbdBadge text="⌘K" />,
  },
};

export const NoSearchIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search…",
    prefix: null,
  },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SearchField size="sm" aria-label="Small" placeholder="Small (sm)" />
      <SearchField size="md" aria-label="Medium" placeholder="Medium (md)" />
      <SearchField size="lg" aria-label="Large" placeholder="Large (lg)" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// States
// ---------------------------------------------------------------------------

export const Invalid: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    isInvalid: true,
    errorMessage: "Something went wrong.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    isDisabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Search",
    placeholder: "Search…",
    isRequired: true,
  },
};

// ---------------------------------------------------------------------------
// Dark — basic
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Search…",
  },
};

export const SizesDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SearchField config={darkSearchFieldConfig} size="sm" aria-label="Small" placeholder="Small (sm)" />
      <SearchField config={darkSearchFieldConfig} size="md" aria-label="Medium" placeholder="Medium (md)" />
      <SearchField config={darkSearchFieldConfig} size="lg" aria-label="Large" placeholder="Large (lg)" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX — light
// ---------------------------------------------------------------------------

export const Glow: Story = {
  args: {
    label: "Search",
    placeholder: "Focus to glow…",
    glow: true,
  },
};

export const GradientBorder: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white",
        "transition-[border-color,box-shadow]",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for gradient border…",
    gradientBorder: true,
  },
};

export const SvgStroke: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus to draw stroke…",
    svgStroke: true,
  },
};

export const Corners: Story = {
  args: {
    label: "Search",
    placeholder: "Focus for corner brackets…",
    corners: true,
  },
};

export const BgReveal: Story = {
  args: {
    label: "Search",
    placeholder: "Focus to reveal background…",
    bgReveal: true,
  },
};

export const Pulse: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      ripple: {
        variant: "pulse-rings",
        color:   "rgba(249, 115, 22, 0.30)",
        duration: 1500,
        radius:   6,
      },
    },
    label: "Search",
    placeholder: "Focus for pulse rings…",
    ripple: true,
  },
};

export const CursorSpotlight: Story = {
  args: {
    label: "Search",
    placeholder: "Hover for spotlight…",
    cursorSpotlight: true,
  },
};

export const CharacterReveal: Story = {
  args: {
    label: "Search",
    placeholder: "Type to reveal…",
    characterReveal: true,
  },
};

export const CharacterRevealSlideUp: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      characterReveal: {
        variant:    "char-slide-up",
        caretColor: "#374151",
        duration:   150,
        easing:     "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
    label: "Search",
    placeholder: "Type to slide up…",
    characterReveal: true,
  },
};

export const CharacterRevealBlur: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      characterReveal: {
        variant:    "char-blur",
        caretColor: "#374151",
        duration:   200,
        easing:     "ease-out",
      },
    },
    label: "Search",
    placeholder: "Type to unblur…",
    characterReveal: true,
  },
};

export const InkDraw: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-neutral-200 bg-white",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for ink draw…",
    inkDraw: true,
  },
};

export const MorphRadius: Story = {
  args: {
    label: "Search",
    placeholder: "Focus to morph radius…",
    morphRadius: true,
  },
};

export const ChromaBorder: Story = {
  args: {
    config: {
      ...defaultTheme.components.searchField,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white",
        "transition-[border-color,box-shadow]",
        "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:bg-neutral-50 group-data-[disabled]:opacity-50",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for chroma border…",
    chromaBorder: true,
  },
};

// ---------------------------------------------------------------------------
// FX — dark
// ---------------------------------------------------------------------------

export const GlowDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Focus to glow…",
    glow: true,
  },
};

export const GradientBorderDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSearchFieldConfig,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white/5",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for gradient border…",
    gradientBorder: true,
  },
};

export const SvgStrokeDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSearchFieldConfig,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus to draw stroke…",
    svgStroke: true,
  },
};

export const CornersDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Focus for corner brackets…",
    corners: true,
  },
};

export const BgRevealDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Focus to reveal background…",
    bgReveal: true,
  },
};

export const PulseDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Focus for pulse rings…",
    ripple: true,
  },
};

export const CursorSpotlightDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Hover for spotlight…",
    cursorSpotlight: true,
  },
};

export const CharacterRevealDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Type to reveal…",
    characterReveal: true,
  },
};

export const InkDrawDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSearchFieldConfig,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-white/10 bg-white/5",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for ink draw…",
    inkDraw: true,
  },
};

export const MorphRadiusDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: darkSearchFieldConfig,
    label: "Search",
    placeholder: "Focus to morph radius…",
    morphRadius: true,
  },
};

export const ChromaBorderDark: Story = {
  parameters: { darkCanvas: true },
  args: {
    config: {
      ...darkSearchFieldConfig,
      inputWrapper: [
        "relative flex items-center overflow-hidden rounded-md border border-transparent bg-white/5",
        "group-data-[disabled]:bg-white/[0.02] group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40",
      ].join(" "),
    },
    label: "Search",
    placeholder: "Focus for chroma border…",
    chromaBorder: true,
  },
};
