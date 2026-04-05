import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    fallback: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', undefined],
    },
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    fallback: 'NU',
    alt: 'Navi User',
    size: 'md',
    shape: 'circle',
  },
}
