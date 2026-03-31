import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    cols: { control: { type: 'number', min: 1, max: 12, step: 1 } },
    colsSm: { control: { type: 'number', min: 1, max: 12, step: 1 } },
    colsMd: { control: { type: 'number', min: 1, max: 12, step: 1 } },
    colsLg: { control: { type: 'number', min: 1, max: 12, step: 1 } },
    rows: { control: { type: 'number', min: 1, max: 6, step: 1 } },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    className: { control: 'text' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Grid>

const Cell = ({ label }: { label: string }) => (
  <div className="rounded-navi-md bg-navi-primary/10 p-3 text-center text-sm text-navi-neutral">
    {label}
  </div>
)

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      <Cell label="1" />
      <Cell label="2" />
      <Cell label="3" />
      <Cell label="4" />
      <Cell label="5" />
      <Cell label="6" />
    </Grid>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Grid cols={2} gap="sm" className="max-w-lg">
        <Cell label="A1" />
        <Cell label="A2" />
      </Grid>
      <Grid cols={1} colsMd={2} colsLg={3} gap="md" className="w-full max-w-3xl">
        <Cell label="R1" />
        <Cell label="R2" />
        <Cell label="R3" />
      </Grid>
    </div>
  ),
}

export const Responsive: Story = {
  render: () => (
    <Grid cols={1} colsSm={2} colsMd={3} colsLg={4} gap="md" className="w-full max-w-4xl">
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i} label={`C ${i + 1}`} />
      ))}
    </Grid>
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
    <Grid cols={3} gap="md">
      <Cell label="X" />
      <Cell label="Y" />
      <Cell label="Z" />
    </Grid>
  ),
}
