import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives/Button'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    delayDuration: { control: 'number' },
    className: { control: 'text' },
    children: { control: false },
    sideOffset: { control: 'number' },
    align: { control: 'text' },
    alignOffset: { control: 'number' },
    avoidCollisions: { control: 'boolean' },
    collisionPadding: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Pasa el foco o el puntero</Button>
    </Tooltip>
  ),
  args: {
    content: 'Texto de ayuda contextual',
    side: 'top',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Tooltip content="Arriba" side="top">
        <Button variant="secondary" size="sm">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Derecha" side="right">
        <Button variant="secondary" size="sm">
          Right
        </Button>
      </Tooltip>
      <Tooltip content="Abajo" side="bottom">
        <Button variant="secondary" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Izquierda" side="left">
        <Button variant="secondary" size="sm">
          Left
        </Button>
      </Tooltip>
    </div>
  ),
}

export const KeyboardAccessible: Story = {
  name: 'KeyboardFocus',
  render: () => (
    <Tooltip content="Disponible con teclado (focus)">
      <Button variant="ghost">Enfoca con Tab</Button>
    </Tooltip>
  ),
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (StoryEl) => (
      <div className="dark rounded-navi-md bg-navi-surface p-10">
        <StoryEl />
      </div>
    ),
  ],
  render: () => (
    <Tooltip content="Tooltip in dark theme">
      <Button variant="outline">Hover</Button>
    </Tooltip>
  ),
}
