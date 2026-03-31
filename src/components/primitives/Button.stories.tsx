import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    className: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Continuar' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const LoadingDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button loading>Guardando</Button>
      <Button disabled>Deshabilitado</Button>
    </div>
  ),
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
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
}
