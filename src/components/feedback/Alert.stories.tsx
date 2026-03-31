import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'destructive'] },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
    className: { control: 'text' },
    icon: { control: false },
    onDismiss: { action: 'dismiss' },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Novedades',
    description: 'Hay una nueva versión disponible.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Alert variant="info" title="Info" description="Mensaje informativo." />
      <Alert variant="success" title="Listo" description="Operación correcta." />
      <Alert variant="warning" title="Atención" description="Revisa los datos." />
      <Alert variant="destructive" title="Error" description="No se pudo guardar." />
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Ciérrame',
    description: 'Este aviso se puede descartar.',
    dismissible: true,
  },
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (StoryEl) => (
      <div className="dark rounded-navi-md bg-navi-surface p-6">
        <StoryEl />
      </div>
    ),
  ],
  render: () => (
    <Alert variant="success" title="Modo oscuro" description="Contraste vía variables." />
  ),
}
