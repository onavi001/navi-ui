import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    className: { control: 'text' },
    'aria-label': { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: { size: 'md' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-navi-neutral">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => <Spinner aria-label="Loading data" />,
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (StoryEl) => (
      <div className="dark rounded-navi-md bg-navi-surface p-8">
        <StoryEl />
      </div>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-6 text-navi-primary">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
}
