import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    className: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {
    label: 'Notificaciones',
    helperText: 'Recibe alertas por correo.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Switch label="Pequeño" size="sm" defaultChecked />
      <Switch label="Mediano" size="md" defaultChecked />
      <Switch label="Grande" size="lg" defaultChecked />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Desactivado" disabled />
      <Switch label="Activo bloqueado" disabled defaultChecked />
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
  render: () => <Switch label="Modo oscuro" defaultChecked />,
}
