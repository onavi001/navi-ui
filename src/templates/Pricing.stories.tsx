import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pricing } from './Pricing'

const meta: Meta<typeof Pricing> = {
  title: 'Templates/Pricing',
  component: Pricing,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    defaultAnnual: {
      control: 'boolean',
      description: 'Start with the annual billing toggle on.',
      table: { defaultValue: { summary: 'false' } },
    },
    className: {
      control: 'text',
      description: 'Extra CSS classes forwarded to the root div.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pricing>

// ---------------------------------------------------------------------------
// Default — monthly billing
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default (Monthly)',
  args: {
    defaultAnnual: false,
  },
}

// ---------------------------------------------------------------------------
// Annual — toggle pre-set to annual
// ---------------------------------------------------------------------------

export const Annual: Story = {
  name: 'Annual billing',
  args: {
    defaultAnnual: true,
  },
}

// ---------------------------------------------------------------------------
// Dark mode
// ---------------------------------------------------------------------------

export const DarkMode: Story = {
  name: 'Dark mode',
  args: {
    defaultAnnual: false,
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}
