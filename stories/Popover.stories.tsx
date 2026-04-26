import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger, Dialog } from "react-aria-components";
import { Popover } from "../src/popover/Popover";
import { Button } from "../src/button/Button";
import { defaultTheme, darkPopoverConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  decorators: [
    (Story, context) => {
      const dark = context.parameters.darkCanvas as boolean | undefined;
      return dark ? (
        <div style={{ width: 480, minHeight: 200, background: "#0f172a", padding: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 480, minHeight: 200, background: "#f8fafc", padding: 64, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonConfig = defaultTheme.components.button;
const popoverConfig = defaultTheme.components.popover;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function PopoverContent({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: "12px 16px", maxWidth: 240 }}>
      <p style={{ margin: "0 0 4px 0", fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>{title}</p>
      <p style={{ margin: 0, fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}

function DarkPopoverContent({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ padding: "12px 16px", maxWidth: 240 }}>
      <p style={{ margin: "0 0 4px 0", fontWeight: 600, fontSize: "0.875rem", color: "#f1f5f9" }}>{title}</p>
      <p style={{ margin: 0, fontSize: "0.8125rem", color: "#94a3b8", lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Placement
// ---------------------------------------------------------------------------

export const Top: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open (top)</Button>
      <Popover config={popoverConfig} placement="top">
        <Dialog>
          <PopoverContent title="Top popover" body="This popover is anchored above the trigger." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

export const Bottom: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open (bottom)</Button>
      <Popover config={popoverConfig} placement="bottom">
        <Dialog>
          <PopoverContent title="Bottom popover" body="This popover is anchored below the trigger." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

export const Left: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open (left)</Button>
      <Popover config={popoverConfig} placement="left">
        <Dialog>
          <PopoverContent title="Left popover" body="This popover is anchored to the left." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

export const Right: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open (right)</Button>
      <Popover config={popoverConfig} placement="right">
        <Dialog>
          <PopoverContent title="Right popover" body="This popover is anchored to the right." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// Arrow
// ---------------------------------------------------------------------------

export const WithArrowTop: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open with arrow</Button>
      <Popover config={popoverConfig} placement="top" showArrow>
        <Dialog>
          <PopoverContent title="With arrow" body="The arrow points toward the trigger element." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

export const WithArrowBottom: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open with arrow</Button>
      <Popover config={popoverConfig} placement="bottom" showArrow>
        <Dialog>
          <PopoverContent title="With arrow" body="The arrow points toward the trigger element." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// Rich content
// ---------------------------------------------------------------------------

export const RichContent: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="secondary">Account</Button>
      <Popover config={popoverConfig} placement="bottom start">
        <Dialog>
          <div style={{ padding: "8px 0", minWidth: 200 }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>hayden@example.com</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>Free plan</p>
            </div>
            {["Profile", "Settings", "Billing"].map((item) => (
              <button
                key={item}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", fontSize: "0.875rem", color: "#374151", background: "none", border: "none", cursor: "pointer" }}
              >
                {item}
              </button>
            ))}
            <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 4 }}>
              <button style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", fontSize: "0.875rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                Sign out
              </button>
            </div>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------

function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <DialogTrigger isOpen={open} onOpenChange={setOpen}>
        <Button config={buttonConfig} intent="primary">
          {open ? "Close popover" : "Open popover"}
        </Button>
        <Popover config={popoverConfig} placement="bottom">
          <Dialog>
            <PopoverContent title="Controlled" body="This popover is controlled externally." />
          </Dialog>
        </Popover>
      </DialogTrigger>
      <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
        State: <strong>{open ? "open" : "closed"}</strong>
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
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open popover</Button>
      <Popover config={darkPopoverConfig} placement="bottom">
        <Dialog>
          <DarkPopoverContent title="Dark popover" body="This popover uses the dark surface config." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};

export const WithArrowDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open with arrow</Button>
      <Popover config={darkPopoverConfig} placement="top" showArrow>
        <Dialog>
          <DarkPopoverContent title="Dark + arrow" body="Arrow color matches the dark container." />
        </Dialog>
      </Popover>
    </DialogTrigger>
  ),
};
