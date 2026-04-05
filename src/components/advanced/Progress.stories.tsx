import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Advanced/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLabel: { control: 'boolean' },
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {
    value: 42,
    showLabel: true,
    label: 'Upload',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={45} variant="default" showLabel label="Default" />
      <Progress value={62} variant="success" showLabel label="Success" />
      <Progress value={78} variant="warning" showLabel label="Warning" />
      <Progress value={33} variant="destructive" showLabel label="Destructive" />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={40} size="sm" showLabel label="Small" />
      <Progress value={55} size="md" showLabel label="Medium" />
      <Progress value={70} size="lg" showLabel label="Large" />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    showLabel: true,
    label: 'Processing',
  },
}

export const WithLabel: Story = {
  args: {
    value: 88,
    showLabel: true,
    label: 'Deployment Progress',
    variant: 'success',
  },
}
