import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DialogTrigger } from "react-aria-components";
import { Dialog, AlertDialog } from "../src/dialog/Dialog";
import { Button } from "../src/button/Button";
import { defaultTheme, darkDialogConfig } from "../src/theme/defaults";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: "myriad-ui/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  decorators: [
    (Story, context) => {
      const dark = context.parameters.darkCanvas as boolean | undefined;
      return dark ? (
        <div style={{ background: "#0f172a", padding: 32, borderRadius: 12, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Story />
        </div>
      ) : (
        <div style={{ background: "#f8fafc", padding: 32, borderRadius: 12, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonConfig = defaultTheme.components.button;
const dialogConfig = defaultTheme.components.dialog;

// ---------------------------------------------------------------------------
// Basic
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open dialog</Button>
      <Dialog config={dialogConfig} title="Dialog title">
        <p style={{ margin: 0, color: "#374151" }}>
          This is the dialog body. It can contain any content — forms, descriptions, media.
        </p>
      </Dialog>
    </DialogTrigger>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open dialog</Button>
      <Dialog
        config={dialogConfig}
        title="Save changes"
        footer={(close) => (
          <>
            <Button config={buttonConfig} intent="secondary" onPress={close}>Cancel</Button>
            <Button config={buttonConfig} intent="primary" onPress={close}>Save</Button>
          </>
        )}
      >
        <p style={{ margin: 0, color: "#374151" }}>
          You have unsaved changes. Would you like to save before continuing?
        </p>
      </Dialog>
    </DialogTrigger>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open dialog</Button>
      <Dialog config={dialogConfig} aria-label="Confirmation">
        <p style={{ margin: 0, color: "#374151" }}>
          Dialog without a visible title — aria-label provides the accessible name.
        </p>
      </Dialog>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Small: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Small (sm)</Button>
      <Dialog config={dialogConfig} size="sm" title="Small dialog">
        <p style={{ margin: 0, color: "#374151" }}>Compact dialog for quick confirmations.</p>
      </Dialog>
    </DialogTrigger>
  ),
};

export const Medium: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Medium (md)</Button>
      <Dialog config={dialogConfig} size="md" title="Medium dialog">
        <p style={{ margin: 0, color: "#374151" }}>Standard dialog for forms and detail views.</p>
      </Dialog>
    </DialogTrigger>
  ),
};

export const Large: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Large (lg)</Button>
      <Dialog config={dialogConfig} size="lg" title="Large dialog">
        <p style={{ margin: 0, color: "#374151" }}>Large dialog for complex content, tables, or multi-step flows.</p>
      </Dialog>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// Scrollable body
// ---------------------------------------------------------------------------

export const ScrollableBody: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="primary">Open scrollable dialog</Button>
      <Dialog
        config={dialogConfig}
        title="Terms of Service"
        footer={(close) => (
          <>
            <Button config={buttonConfig} intent="secondary" onPress={close}>Decline</Button>
            <Button config={buttonConfig} intent="primary" onPress={close}>Accept</Button>
          </>
        )}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} style={{ margin: 0, color: "#374151", lineHeight: 1.6 }}>
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </Dialog>
    </DialogTrigger>
  ),
};

// ---------------------------------------------------------------------------
// AlertDialog
// ---------------------------------------------------------------------------

export const Alert: Story = {
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="danger">Delete item</Button>
      <AlertDialog
        config={dialogConfig}
        title="Delete permanently?"
        footer={(close) => (
          <>
            <Button config={buttonConfig} intent="secondary" onPress={close}>Cancel</Button>
            <Button config={buttonConfig} intent="danger" onPress={close}>Delete</Button>
          </>
        )}
      >
        <p style={{ margin: 0, color: "#374151" }}>
          This action cannot be undone. The item will be permanently deleted from your account.
        </p>
      </AlertDialog>
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
      <Button config={buttonConfig} intent="primary" onPress={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        config={dialogConfig}
        title="Controlled dialog"
        isOpen={open}
        onOpenChange={setOpen}
        footer={(close) => (
          <Button config={buttonConfig} intent="primary" onPress={close}>Done</Button>
        )}
      >
        <p style={{ margin: 0, color: "#374151" }}>
          This dialog is controlled programmatically — no DialogTrigger needed.
        </p>
      </Dialog>
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
      <Button config={buttonConfig} intent="primary">Open dialog</Button>
      <Dialog
        config={darkDialogConfig}
        title="Dialog title"
        footer={(close) => (
          <>
            <Button config={buttonConfig} intent="secondary" onPress={close}>Cancel</Button>
            <Button config={buttonConfig} intent="primary" onPress={close}>Confirm</Button>
          </>
        )}
      >
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
          This is the dialog body on a dark surface.
        </p>
      </Dialog>
    </DialogTrigger>
  ),
};

export const AlertDark: Story = {
  parameters: { darkCanvas: true },
  render: () => (
    <DialogTrigger>
      <Button config={buttonConfig} intent="danger">Delete item</Button>
      <AlertDialog
        config={darkDialogConfig}
        title="Delete permanently?"
        footer={(close) => (
          <>
            <Button config={buttonConfig} intent="secondary" onPress={close}>Cancel</Button>
            <Button config={buttonConfig} intent="danger" onPress={close}>Delete</Button>
          </>
        )}
      >
        <p style={{ margin: 0, color: "#cbd5e1" }}>
          This action cannot be undone.
        </p>
      </AlertDialog>
    </DialogTrigger>
  ),
};
