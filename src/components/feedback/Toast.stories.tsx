import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives/Button'
import { useToast } from '@/hooks/useToast'
import { Toaster } from './Toast'

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    theme: { control: 'select', options: ['light', 'dark', 'system'] },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center',
      ],
    },
    richColors: { control: 'boolean' },
    expand: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    duration: { control: 'number' },
    className: { control: 'text' },
  },
  decorators: [
    (StoryEl) => (
      <>
        <Toaster position="top-center" richColors />
        <div className="p-8">
          <StoryEl />
        </div>
      </>
    ),
  ],
}
export default meta
type Story = StoryObj

function ToastDemoPanel() {
  const { success, error, warning, info, loading, promise, dismiss, toast } = useToast()

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => success('Guardado correctamente')}>
          Success
        </Button>
        <Button size="sm" variant="destructive" onClick={() => error('Algo falló')}>
          Error
        </Button>
        <Button size="sm" variant="secondary" onClick={() => warning('Revisa el formulario')}>
          Warning
        </Button>
        <Button size="sm" variant="outline" onClick={() => info('Tip útil')}>
          Info
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const id = loading('Procesando…')
            setTimeout(() => {
              dismiss(id)
              success('Completado')
            }, 1600)
          }}
        >
          Loading → ok
        </Button>
        <Button
          size="sm"
          onClick={() =>
            promise(
              new Promise<string>((resolve) => setTimeout(() => resolve('Datos'), 1200)),
              {
                loading: 'Cargando…',
                success: (d: string) => `Listo: ${d}`,
                error: 'Falló la promesa',
              }
            )
          }
        >
          Promise
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast('Toast genérico')}>
          Generic
        </Button>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemoPanel />,
}

export const AllVariants: Story = {
  render: () => <ToastDemoPanel />,
}

export const LoadingDisabled: Story = {
  name: 'States',
  render: () => <ToastDemoPanel />,
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (StoryEl) => (
      <div className="dark min-h-[200px] rounded-navi-md bg-navi-surface">
        <Toaster theme="dark" position="top-center" />
        <div className="p-8">
          <StoryEl />
        </div>
      </div>
    ),
  ],
  render: () => <ToastDemoPanel />,
}
