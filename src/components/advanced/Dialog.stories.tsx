import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";

const meta: Meta<typeof Dialog> = {
  title: "Advanced/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you are done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="py-4 text-sm text-navi-neutral/70">
          This dialog traps focus automatically and can be dismissed with
          Escape.
        </div>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button>Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Edit account</Button>
      </Dialog.Trigger>
      <Dialog.Content size="lg">
        <Dialog.Header>
          <Dialog.Title>Account settings</Dialog.Title>
          <Dialog.Description>
            Update your personal information and save the changes.
          </Dialog.Description>
        </Dialog.Header>
        <div className="space-y-4 py-4">
          <Input label="Full name" placeholder="Oscar Iván" />
          <Input label="Email" type="email" placeholder="oscar@example.com" />
        </div>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button>Update profile</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="destructive">Delete project</Button>
      </Dialog.Trigger>
      <Dialog.Content size="sm">
        <Dialog.Header>
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. All related records will be
            permanently removed.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer className="pt-4">
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Button variant="destructive">Confirm delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open fullscreen</Button>
      </Dialog.Trigger>
      <Dialog.Content size="fullscreen">
        <Dialog.Header className="border-b border-navi-border pb-4 dark:border-navi-border-dark">
          <Dialog.Title>Workspace editor</Dialog.Title>
          <Dialog.Description>
            A fullscreen dialog for focused editing workflows.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid h-[calc(100vh-10rem)] grid-cols-1 gap-4 py-4 md:grid-cols-3">
          <div className="rounded-navi-md border border-navi-border p-4 dark:border-navi-border-dark">
            Navigation panel
          </div>
          <div className="rounded-navi-md border border-navi-border p-4 dark:border-navi-border-dark md:col-span-2">
            Main content area
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Close</Button>
          </Dialog.Close>
          <Button>Save workspace</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
