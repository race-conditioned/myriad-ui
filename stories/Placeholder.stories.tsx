import type { Meta, StoryObj } from "@storybook/react";

// Placeholder — confirms @myriad-ui/core Storybook is wired up.
// Replace with real component stories as Phase 1 components are built.

function PlaceholderComponent() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "24px", color: "#1e293b" }}>
      <strong>@myriad-ui/core</strong>
      <p style={{ marginTop: "8px", color: "#64748b", fontSize: "14px" }}>
        Component stories will appear here as components are built.
      </p>
    </div>
  );
}

const meta = {
  title: "myriad-ui/Placeholder",
  component: PlaceholderComponent,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PlaceholderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
