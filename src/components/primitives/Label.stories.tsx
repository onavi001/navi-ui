import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
    htmlFor: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: { children: 'Correo electrónico', htmlFor: 'email' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label htmlFor="a">Opcional</Label>
      <Label htmlFor="b" required>
        Obligatorio
      </Label>
    </div>
  ),
}

export const Required: Story = {
  args: { children: 'Nombre', required: true, htmlFor: 'name' },
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
    <Label htmlFor="dark-field" required>
      Campo en modo oscuro
    </Label>
  ),
}
