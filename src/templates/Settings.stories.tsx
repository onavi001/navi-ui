import type { Meta, StoryObj } from '@storybook/react-vite'
import { Settings } from './Settings'

const meta: Meta<typeof Settings> = {
  title: 'Templates/Settings',
  component: Settings,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    defaultTab: {
      control: 'select',
      options: ['profile', 'account', 'notifications', 'appearance', 'danger'],
      description: 'Tab shown on first render.',
      table: { defaultValue: { summary: 'profile' } },
    },
    className: {
      control: 'text',
      description: 'Extra CSS classes forwarded to the root div.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Settings>

// ---------------------------------------------------------------------------
// Default — Profile tab active
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default (Profile)',
  args: {
    defaultTab: 'profile',
  },
}

// ---------------------------------------------------------------------------
// ProfileTab — explicit alias used by the spec
// ---------------------------------------------------------------------------

export const ProfileTab: Story = {
  name: 'Profile tab',
  args: {
    defaultTab: 'profile',
  },
}

// ---------------------------------------------------------------------------
// AccountTab
// ---------------------------------------------------------------------------

export const AccountTab: Story = {
  name: 'Account tab',
  args: {
    defaultTab: 'account',
  },
}

// ---------------------------------------------------------------------------
// NotificationsTab
// ---------------------------------------------------------------------------

export const NotificationsTab: Story = {
  name: 'Notifications tab',
  args: {
    defaultTab: 'notifications',
  },
}

// ---------------------------------------------------------------------------
// AppearanceTab
// ---------------------------------------------------------------------------

export const AppearanceTab: Story = {
  name: 'Appearance tab',
  args: {
    defaultTab: 'appearance',
  },
}

// ---------------------------------------------------------------------------
// DangerZone — Danger Zone tab active
// ---------------------------------------------------------------------------

export const DangerZone: Story = {
  name: 'Danger Zone tab',
  args: {
    defaultTab: 'danger',
  },
}

// ---------------------------------------------------------------------------
// Dark mode decorator
// ---------------------------------------------------------------------------

export const DarkMode: Story = {
  name: 'Dark mode (Profile)',
  args: {
    defaultTab: 'profile',
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}
