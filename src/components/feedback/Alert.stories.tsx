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
    description: 'There is a new version available.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Alert variant="info" title="Info" description="Mensaje informativo." />
      <Alert variant="success" title="Done" description="Operation completed successfully." />
      <Alert variant="warning" title="Attention" description="Check the data." />
      <Alert variant="destructive" title="Error" description="No se pudo guardar." />
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Close me',
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
    <Alert variant="success" title="Dark mode" description="Contrast via CSS variables." />
  ),
}
