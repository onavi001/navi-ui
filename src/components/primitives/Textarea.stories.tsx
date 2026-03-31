import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'success'] },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    autoResize: { control: 'boolean' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    className: { control: 'text' },
    id: { control: 'text' },
    rows: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Comentario',
    placeholder: 'Escribe un comentario breve.',
    helperText: 'Máximo 500 caracteres.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Textarea label="Default" placeholder="Texto" />
      <Textarea label="Éxito" variant="success" placeholder="OK" />
      <Textarea
        label="Error"
        errorMessage="No puede estar vacío."
        placeholder="Requerido"
      />
    </div>
  ),
}

export const AutoResize: Story = {
  args: {
    label: 'Nota auto-ajustable',
    autoResize: true,
    defaultValue: 'Línea 1\nLínea 2\nLínea 3',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Bloqueado',
    disabled: true,
    defaultValue: 'Contenido fijo',
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
      <Textarea label="Descripción" placeholder="Detalle" />
    </div>
  ),
}
