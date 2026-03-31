import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'success'] },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    className: { control: 'text' },
    id: { control: 'text' },
    type: { control: 'text' },
    leftAddon: { control: false },
    rightAddon: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Correo',
    placeholder: 'user@company.com',
    helperText: 'We will send you the confirmation here.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Input label="Default" placeholder="Texto" />
      <Input label="Success" variant="success" placeholder="Validated" />
      <Input
        label="Error"
        variant="error"
        errorMessage="Este campo es obligatorio."
        placeholder="Empty"
      />
    </div>
  ),
}

export const WithAddons: Story = {
  render: () => (
    <div className="max-w-md">
      <Input
        label="Monto"
        leftAddon={<span className="text-xs">USD</span>}
        rightAddon={<span className="text-xs">.00</span>}
        placeholder="0"
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Solo lectura',
    disabled: true,
    placeholder: 'Disabled input',
  },
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
    <div className="max-w-md">
      <Input label="Campo" placeholder="Escribe algo" />
    </div>
  ),
}
