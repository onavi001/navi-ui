import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack } from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    dividers: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Stack>

const Row = ({ label }: { label: string }) => (
  <div className="rounded-navi-md bg-navi-neutral/10 px-3 py-2 text-sm text-navi-neutral">
    {label}
  </div>
)

export const Default: Story = {
  render: () => (
    <Stack gap="md">
      <Row label="Primera fila" />
      <Row label="Segunda fila" />
      <Row label="Tercera fila" />
    </Stack>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Stack direction="vertical" gap="lg">
        <Row label="Vertical" />
        <Row label="Con gap uniforme" />
      </Stack>
      <Stack direction="horizontal" gap="md">
        <Row label="H1" />
        <Row label="H2" />
        <Row label="H3" />
      </Stack>
      <Stack direction="vertical" dividers>
        <Row label="Con divisores" />
        <Row label="Entre ítems" />
        <Row label="Último" />
      </Stack>
    </div>
  ),
}

export const HorizontalDividers: Story = {
  render: () => (
    <Stack direction="horizontal" dividers gap="none">
      <Row label="A" />
      <Row label="B" />
      <Row label="C" />
    </Stack>
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
    <Stack gap="sm">
      <Row label="Uno" />
      <Row label="Dos" />
    </Stack>
  ),
}
