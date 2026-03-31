import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeSwitcher } from './ThemeSwitcher'

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Primitives/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'Mostrar etiqueta de texto junto al ícono',
    },
  },
}
export default meta
type Story = StoryObj<typeof ThemeSwitcher>

export const Default: Story = {
  args: {
    showLabel: true,
  },
}

export const IconOnly: Story = {
  args: {
    showLabel: false,
  },
}

export const InCard: Story = {
  render: () => (
    <div className="rounded-navi-lg border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-navi-ink dark:text-navi-neutral-light mb-3">
          Tema
        </h2>
        <p className="text-sm text-navi-neutral dark:text-navi-neutral-light mb-4">
          Haz clic para cambiar entre modo claro y oscuro
        </p>
        <ThemeSwitcher />
      </div>
    </div>
  ),
}

export const WithOtherElements: Story = {
  render: () => (
    <div className="rounded-navi-lg border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navi-ink dark:text-navi-neutral-light">
          Configuración de Apariencia
        </h2>
        <ThemeSwitcher showLabel={false} />
      </div>
      <hr className="border-navi-border dark:border-navi-border-dark" />
      <div className="space-y-2 text-sm text-navi-neutral dark:text-navi-neutral-light">
        <p>• Tema automático: detecta preferencia del sistema</p>
        <p>• Tema guardado: persiste en localStorage</p>
        <p>• Cambio instantáneo: sin recarga de página</p>
      </div>
    </div>
  ),
}
