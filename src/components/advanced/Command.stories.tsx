import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../primitives/Button'
import { Command } from './Command'

const meta: Meta<typeof Command> = {
  title: 'Advanced/Command',
  component: Command,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Command>

const DefaultCommandContent = () => (
  <>
    <Command.Input placeholder="Search commands..." />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      <Command.Group heading="Suggestions">
        <Command.Item>Open Dashboard</Command.Item>
        <Command.Item>Create Project</Command.Item>
        <Command.Item>Invite Team Member</Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item>Profile</Command.Item>
        <Command.Item>Billing</Command.Item>
      </Command.Group>
    </Command.List>
  </>
)

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <Command>
        <DefaultCommandContent />
      </Command>
    </div>
  ),
}

export const AsPalette: Story = {
  render: () => {
    const PaletteExample = () => {
      const [open, setOpen] = React.useState(false)

      return (
        <div className="space-y-3">
          <Button onClick={() => setOpen(true)}>Open palette</Button>
          <p className="text-sm text-navi-neutral/70">Use Cmd+K or Ctrl+K to toggle the command palette.</p>
          <Command open={open} onOpenChange={setOpen}>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
              <Command.Empty>No command found.</Command.Empty>
              <Command.Group heading="Quick Actions">
                <Command.Item onSelect={() => setOpen(false)}>Go to Home</Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>Create Document</Command.Item>
                <Command.Item onSelect={() => setOpen(false)}>Open Settings</Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      )
    }

    return <PaletteExample />
  },
}

export const WithGroups: Story = {
  render: () => (
    <div className="max-w-xl">
      <Command>
        <Command.Input placeholder="Search people or actions..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Team">
            <Command.Item>Oscar Iván</Command.Item>
            <Command.Item>Product Team</Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Actions">
            <Command.Item>New Workspace</Command.Item>
            <Command.Item>Archive Project</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="max-w-xl">
      <Command>
        <Command.Input placeholder="Search with icons..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Navigation">
            <Command.Item>
              <svg className="size-4 text-navi-neutral/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M3 12h18M12 3v18" strokeWidth={2} strokeLinecap="round" />
              </svg>
              New Item
            </Command.Item>
            <Command.Item>
              <svg className="size-4 text-navi-neutral/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" />
              </svg>
              Open Menu
            </Command.Item>
            <Command.Item>
              <svg className="size-4 text-navi-neutral/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <path d="M5 12h14" strokeWidth={2} strokeLinecap="round" />
                <path d="m12 5 7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Continue Flow
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
}
