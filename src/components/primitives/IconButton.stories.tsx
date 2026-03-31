import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'

const BookmarkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
)

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    className: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    children: { control: false },
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    'aria-label': 'Guardar en favoritos',
    children: <BookmarkIcon />,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 text-navi-neutral">
      <IconButton variant="primary" aria-label="Primary">
        <BookmarkIcon />
      </IconButton>
      <IconButton variant="secondary" aria-label="Secondary">
        <BookmarkIcon />
      </IconButton>
      <IconButton variant="ghost" aria-label="Ghost">
        <BookmarkIcon />
      </IconButton>
      <IconButton variant="destructive" aria-label="Destructive">
        <BookmarkIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Outline">
        <BookmarkIcon />
      </IconButton>
    </div>
  ),
}

export const LoadingDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <IconButton loading aria-label="Cargando">
        <BookmarkIcon />
      </IconButton>
      <IconButton disabled aria-label="Deshabilitado">
        <BookmarkIcon />
      </IconButton>
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
    <IconButton variant="outline" aria-label="Marcador">
      <BookmarkIcon />
    </IconButton>
  ),
}
