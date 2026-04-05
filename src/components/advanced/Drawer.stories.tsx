import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from './Drawer'
import { Button } from '../primitives/Button'
import { Input } from '../primitives/Input'

const meta: Meta<typeof Drawer> = {
  title: 'Advanced/Drawer',
  component: Drawer,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Right: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open right drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content side="right" size="md">
        <div className="flex h-full flex-col gap-4">
          <Drawer.Header>
            <Drawer.Title>Right drawer</Drawer.Title>
          </Drawer.Header>
          <p className="text-sm text-navi-neutral/70">Contextual actions and details can live here.</p>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="outline">Close</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}

export const Left: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open left drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content side="left" size="md" backdropBlur>
        <div className="flex h-full flex-col gap-4">
          <Drawer.Header>
            <Drawer.Title>Navigation panel</Drawer.Title>
          </Drawer.Header>
          <p className="text-sm text-navi-neutral/70">Useful for side navigation and filters.</p>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="outline">Done</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}

export const Top: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open top drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content side="top" size="sm">
        <div className="flex h-full flex-col gap-4">
          <Drawer.Header>
            <Drawer.Title>Top drawer</Drawer.Title>
          </Drawer.Header>
          <p className="text-sm text-navi-neutral/70">Great for quick global notifications or command surfaces.</p>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Open bottom drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content side="bottom" size="md">
        <div className="flex h-full flex-col gap-4">
          <Drawer.Header>
            <Drawer.Title>Bottom drawer</Drawer.Title>
          </Drawer.Header>
          <p className="text-sm text-navi-neutral/70">Suitable for mobile-friendly detail panels and action sheets.</p>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="outline">Close</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button>Edit profile</Button>
      </Drawer.Trigger>
      <Drawer.Content side="right" size="lg" backdropBlur>
        <div className="flex h-full flex-col gap-4">
          <Drawer.Header>
            <Drawer.Title>Profile settings</Drawer.Title>
          </Drawer.Header>
          <div className="space-y-4">
            <Input label="Full name" placeholder="Oscar Iván" />
            <Input label="Email" type="email" placeholder="oscar@example.com" />
          </div>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Drawer.Close>
            <Button>Save</Button>
          </Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer>
  ),
}
