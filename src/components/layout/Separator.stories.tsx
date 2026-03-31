import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './Separator'

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    decorative: { control: 'boolean' },
    className: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p className="text-sm text-navi-neutral">Bloque superior</p>
      <Separator />
      <p className="text-sm text-navi-neutral">Bloque inferior</p>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-stretch gap-4">
      <div className="w-48 space-y-2">
        <span className="text-sm">Horizontal</span>
        <Separator />
      </div>
      <div className="flex h-24 gap-2">
        <span className="text-sm">Vertical</span>
        <Separator orientation="vertical" />
        <span className="text-sm">Fin</span>
      </div>
    </div>
  ),
}

export const Semantic: Story = {
  args: {
    decorative: false,
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-64">
      <Separator {...args} />
      <p className="mt-4 text-xs text-navi-neutral/80">decorative=false expone el separador a SR</p>
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
    <div className="w-64 space-y-4 text-navi-neutral">
      <p className="text-sm">Contenido</p>
      <Separator />
      <p className="text-sm">More content</p>
    </div>
  ),
}
