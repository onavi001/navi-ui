import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dashboard } from './Dashboard'

const meta: Meta<typeof Dashboard> = {
  title: 'Templates/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
  args: {
    sidebarCollapsed: false,
  },
  argTypes: {
    sidebarCollapsed: { control: 'boolean' },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Dashboard>

export const Default: Story = {}

export const Collapsed: Story = {
  args: {
    sidebarCollapsed: true,
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
