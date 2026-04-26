import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "../src/text-area/TextArea";
import { darkTextAreaConfig, defaultTheme } from "../src/theme/defaults";

const DARK_BG = "#0f1923";
const lightConfig = defaultTheme.components.textArea;

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// ---------------------------------------------------------------------------
// Default — light
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea config={lightConfig} {...args} label="Bio" placeholder="Tell us about yourself…" />
      <TextArea config={lightConfig} {...args} label="Notes" description="Visible only to you." placeholder="Add notes…" />
      <TextArea config={lightConfig} {...args} label="Required" isRequired placeholder="This field is required" />
      <TextArea config={lightConfig} {...args} label="Invalid" isInvalid defaultValue="bad content" errorMessage="This field contains invalid content." />
      <TextArea config={lightConfig} {...args} label="Read-only" isReadOnly defaultValue="You can read this but not edit it." />
      <TextArea config={lightConfig} {...args} label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea config={lightConfig} {...args} size="sm" label="Small" placeholder="size=sm, 3 rows" />
      <TextArea config={lightConfig} {...args} size="md" label="Medium (default)" placeholder="size=md, 3 rows" />
      <TextArea config={lightConfig} {...args} size="lg" label="Large" placeholder="size=lg, 4 rows" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Auto-resize — grows with content, optional max-rows cap
// ---------------------------------------------------------------------------

export const AutoResize: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Uncapped auto-resize"
        description="Grows indefinitely as you type."
        placeholder="Start typing to see it grow…"
        autoResize
      />
      <TextArea
        config={lightConfig} {...args}
        label="Capped at 6 rows"
        description="Grows up to 6 rows then scrolls."
        placeholder="Keep typing past 6 rows…"
        autoResize
        maxRows={6}
      />
      <TextArea
        config={lightConfig} {...args}
        label="Fixed height (autoResize off)"
        description="resize=vertical — drag the handle to resize."
        placeholder="Drag the bottom-right corner…"
        autoResize={false}
        resize="vertical"
        rows={4}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Character count
// ---------------------------------------------------------------------------

export const CharacterCount: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Counter only (no limit)"
        description="Shows how many characters you've typed."
        placeholder="Type something…"
        showCount
      />
      <TextArea
        config={lightConfig} {...args}
        label="With limit (200 chars)"
        description="Counter turns red when you reach 85% of the limit."
        placeholder="Type up to 200 characters…"
        maxLength={200}
      />
      <TextArea
        config={lightConfig} {...args}
        label="Tight limit (50 chars)"
        description="Try typing close to the limit."
        placeholder="50 chars max…"
        maxLength={50}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dark — default
// ---------------------------------------------------------------------------

export const DefaultDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea config={darkTextAreaConfig} {...args} label="Bio" placeholder="Tell us about yourself…" />
      <TextArea config={darkTextAreaConfig} {...args} label="Notes" description="Visible only to you." placeholder="Add notes…" />
      <TextArea config={darkTextAreaConfig} {...args} label="Required" isRequired placeholder="This field is required" />
      <TextArea config={darkTextAreaConfig} {...args} label="Invalid" isInvalid defaultValue="bad content" errorMessage="This field contains invalid content." />
      <TextArea config={darkTextAreaConfig} {...args} label="Read-only" isReadOnly defaultValue="You can read this but not edit it." />
      <TextArea config={darkTextAreaConfig} {...args} label="Disabled" isDisabled defaultValue="Cannot edit" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dark — character count
// ---------------------------------------------------------------------------

export const CharacterCountDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Counter only"
        placeholder="Type something…"
        showCount
      />
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="200-char limit"
        description="Counter turns red at 85%."
        placeholder="Type up to 200 characters…"
        maxLength={200}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-C: Glow
// ---------------------------------------------------------------------------

export const Glow: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Static glow (light)"
        description="Soft orange halo on focus."
        placeholder="Click to focus…"
        glow
      />
      <TextArea
        config={{
          ...lightConfig,
          glow: { type: "rotating", color: ["#f97316", "#ec4899", "#a855f7", "#3b82f6"], blur: 10, spread: 6, radius: 10, opacity: 1 },
        }} {...args}
        label="Rotating glow (light)"
        description="Conic gradient spins behind the border."
        placeholder="Click to focus…"
        glow
      />
    </div>
  ),
};

export const GlowDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Static glow (dark)"
        description="Soft orange halo on focus."
        placeholder="Click to focus…"
        glow
      />
      <TextArea
        config={{
          ...darkTextAreaConfig,
          glow: { type: "rotating", color: ["#f97316", "#ec4899", "#a855f7", "#3b82f6"], blur: 10, spread: 6, radius: 10, opacity: 1, maskBackground: "#0f1923" },
        }} {...args}
        label="Rotating glow (dark)"
        description="Conic gradient spins behind the border."
        placeholder="Click to focus…"
        glow
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-E: SVG stroke draw
// ---------------------------------------------------------------------------

export const SvgStroke: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="SVG stroke (clockwise)"
        description="Orange stroke traces the perimeter on focus, tracking height as you type."
        placeholder="Click to focus, then type to see it grow…"
        svgStroke
      />
      <TextArea
        {...args}
        config={{ ...lightConfig, svgStroke: { color: "#a855f7", invalidColor: "#ef4444", width: 1.5, rx: 6, duration: 500, drawDirection: "counterclockwise" } }}
        label="SVG stroke (counterclockwise)"
        description="Same effect, opposite draw direction."
        placeholder="Click to focus…"
        svgStroke
      />
      <TextArea
        config={lightConfig} {...args}
        label="Invalid state"
        description="Stroke colour switches to red when invalid."
        placeholder="Click to focus…"
        svgStroke
        isInvalid
        errorMessage="This field is invalid."
      />
    </div>
  ),
};

export const SvgStrokeDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="SVG stroke (dark)"
        description="Stroke tracks textarea height as you type."
        placeholder="Click to focus, then type…"
        svgStroke
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-D: Gradient border
// ---------------------------------------------------------------------------

export const GradientBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Gradient border (light)"
        description="Flowing gradient ring appears on focus."
        placeholder="Click to focus…"
        gradientBorder
      />
      <TextArea
        config={lightConfig} {...args}
        label="Invalid state"
        description="Gradient switches to red stops when invalid."
        placeholder="Click to focus…"
        gradientBorder
        isInvalid
        errorMessage="This field is invalid."
      />
    </div>
  ),
};

export const GradientBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Gradient border (dark)"
        description="Flowing gradient ring appears on focus."
        placeholder="Click to focus…"
        gradientBorder
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-L: Morph radius
// ---------------------------------------------------------------------------

export const MorphRadius: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Morph radius (light)"
        description="Border-radius expands on focus."
        placeholder="Click to focus…"
        morphRadius
      />
      <TextArea
        config={{
          ...lightConfig,
          morphRadius: { rest: "0.375rem", focus: "9999px", duration: 300, easing: "ease-in-out" },
        }} {...args}
        label="Pill on focus"
        description="Morphs to fully rounded on focus."
        placeholder="Click to focus…"
        morphRadius
      />
    </div>
  ),
};

export const MorphRadiusDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Morph radius (dark)"
        description="Border-radius expands on focus."
        placeholder="Click to focus…"
        morphRadius
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-M: Chroma border
// ---------------------------------------------------------------------------

export const ChromaBorder: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Hue-rotate (light)"
        description="Gradient cycles through the spectrum on focus."
        placeholder="Click to focus…"
        chromaBorder
      />
      <TextArea
        config={{ ...lightConfig, chromaBorder: { variant: "aurora", opacity: 0.9, width: 2, radius: 6 } }} {...args}
        label="Aurora (light)"
        description="Northern-lights palette sweeps slowly."
        placeholder="Click to focus…"
        chromaBorder
      />
      <TextArea
        config={{ ...lightConfig, chromaBorder: { variant: "iridescent", opacity: 0.9, width: 2, radius: 6 } }} {...args}
        label="Iridescent (light)"
        description="Tight rainbow flows like holographic foil."
        placeholder="Click to focus…"
        chromaBorder
      />
    </div>
  ),
};

export const ChromaBorderDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Hue-rotate (dark)"
        description="Gradient cycles through the spectrum on focus."
        placeholder="Click to focus…"
        chromaBorder
      />
      <TextArea
        config={{ ...darkTextAreaConfig, chromaBorder: { variant: "aurora", opacity: 0.9, width: 2, radius: 6 } }} {...args}
        label="Aurora (dark)"
        description="Northern-lights palette sweeps slowly."
        placeholder="Click to focus…"
        chromaBorder
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-G: Background reveal
// ---------------------------------------------------------------------------

export const BgReveal: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Reveal from left (light)"
        description="Translucent wash slides in on focus."
        placeholder="Click to focus…"
        bgReveal
      />
      <TextArea
        config={{ ...lightConfig, bgReveal: { color: "rgba(249, 115, 22, 0.07)", direction: "center", duration: 300 } }} {...args}
        label="Reveal from center (light)"
        description="Expands symmetrically outward."
        placeholder="Click to focus…"
        bgReveal
      />
    </div>
  ),
};

export const BgRevealDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Reveal from left (dark)"
        description="Translucent wash slides in on focus."
        placeholder="Click to focus…"
        bgReveal
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-H: Pulse (rings + bg variants)
// ---------------------------------------------------------------------------

export const Pulse: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Pulse rings (light)"
        description="Ring outlines expand as a looping aura while focused."
        placeholder="Click to focus…"
        ripple
      />
      <TextArea
        config={{ ...lightConfig, ripple: { variant: "pulse-bg", color: "rgba(249, 115, 22, 0.08)", duration: 2000, radius: 6 } }} {...args}
        label="Pulse background (light)"
        description="Background colour breathes softly while focused."
        placeholder="Click to focus…"
        ripple
      />
    </div>
  ),
};

export const PulseDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Pulse rings (dark)"
        description="Ring outlines expand as a looping aura while focused."
        placeholder="Click to focus…"
        ripple
      />
      <TextArea
        config={{ ...darkTextAreaConfig, ripple: { variant: "pulse-bg", color: "rgba(251, 146, 60, 0.10)", duration: 2000, radius: 6 } }} {...args}
        label="Pulse background (dark)"
        description="Background colour breathes softly while focused."
        placeholder="Click to focus…"
        ripple
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
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Cursor spotlight (light)"
        description="Soft radial gradient follows your cursor inside the textarea."
        placeholder="Move your cursor around inside…"
        cursorSpotlight
      />
    </div>
  ),
};

export const CursorSpotlightDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Cursor spotlight (dark)"
        description="Soft radial gradient follows your cursor inside the textarea."
        placeholder="Move your cursor around inside…"
        cursorSpotlight
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-F: Ornamental corners
// ---------------------------------------------------------------------------

export const Corners: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Corner brackets (light)"
        description="L-shaped brackets close inward on focus."
        placeholder="Click to focus…"
        corners
      />
      <TextArea
        config={{ ...lightConfig, corners: { style: "split", color: "#f97316", invalidColor: "#ef4444", width: 2, duration: 300, easing: "ease-out" } }} {...args}
        label="Split line (light)"
        description="Horizontal line splits outward from the centre."
        placeholder="Click to focus…"
        corners
      />
    </div>
  ),
};

export const CornersDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Corner brackets (dark)"
        description="L-shaped brackets close inward on focus."
        placeholder="Click to focus…"
        corners
      />
      <TextArea
        config={{ ...darkTextAreaConfig, corners: { style: "split", color: "#fb923c", invalidColor: "#f87171", width: 2, duration: 300, easing: "ease-out" } }} {...args}
        label="Split line (dark)"
        description="Horizontal line splits outward from the centre."
        placeholder="Click to focus…"
        corners
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-K: Ink draw
// ---------------------------------------------------------------------------

export const InkDraw: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Ink draw (light)"
        description="Wobbly path traces the perimeter with a calligraphic feel. Tracks height as you type."
        placeholder="Click to focus, then type to see it grow…"
        inkDraw
      />
      <TextArea
        config={{ ...lightConfig, inkDraw: { color: "#a855f7", invalidColor: "#ef4444", strokeWidth: 1.5, wobble: 4, rx: 6, duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" } }} {...args}
        label="Ink draw — high wobble (light)"
        description="More pronounced hand-drawn irregularity."
        placeholder="Click to focus…"
        inkDraw
      />
    </div>
  ),
};

export const InkDrawDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Ink draw (dark)"
        description="Wobbly path traces the perimeter with a calligraphic feel."
        placeholder="Click to focus, then type…"
        inkDraw
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FX-J: Character reveal
// ---------------------------------------------------------------------------

export const CharacterReveal: Story = {
  args: {},
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={lightConfig} {...args}
        label="Fade (light)"
        description="Each character fades in as you type."
        placeholder="Start typing…"
        characterReveal
      />
      <TextArea
        config={{ ...lightConfig, characterReveal: { variant: "char-slide-up", caretColor: "#374151", duration: 120, easing: "ease-out" } }} {...args}
        label="Slide up (light)"
        description="Each character slides up 4 px while fading in."
        placeholder="Start typing…"
        characterReveal
      />
      <TextArea
        config={{ ...lightConfig, characterReveal: { variant: "char-blur", caretColor: "#374151", duration: 150, easing: "ease-out" } }} {...args}
        label="Blur (light)"
        description="Each character un-blurs while fading in."
        placeholder="Start typing…"
        characterReveal
      />
    </div>
  ),
};

export const CharacterRevealDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Fade (dark)"
        description="Each character fades in as you type."
        placeholder="Start typing…"
        characterReveal
      />
      <TextArea
        config={{ ...darkTextAreaConfig, characterReveal: { variant: "char-slide-up", caretColor: "rgba(255,255,255,0.9)", duration: 120, easing: "ease-out" } }} {...args}
        label="Slide up (dark)"
        placeholder="Start typing…"
        characterReveal
      />
      <TextArea
        config={{ ...darkTextAreaConfig, characterReveal: { variant: "char-blur", caretColor: "rgba(255,255,255,0.9)", duration: 150, easing: "ease-out" } }} {...args}
        label="Blur (dark)"
        placeholder="Start typing…"
        characterReveal
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dark — auto-resize
// ---------------------------------------------------------------------------

export const AutoResizeDark: Story = {
  args: {},
  parameters: { darkCanvas: true },
  render: (args) => (
    <div style={{ background: DARK_BG, padding: 24, display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Uncapped"
        placeholder="Start typing to see it grow…"
        autoResize
      />
      <TextArea
        config={darkTextAreaConfig} {...args}
        label="Capped at 6 rows"
        description="Scrolls after 6 rows."
        placeholder="Keep typing past 6 rows…"
        autoResize
        maxRows={6}
      />
    </div>
  ),
};
