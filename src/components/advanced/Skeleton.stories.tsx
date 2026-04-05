import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Advanced/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    variant: { control: 'select', options: ['line', 'circle', 'rectangle'] },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    variant: 'line',
    width: 'w-64',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="line" width="w-72" />
      <Skeleton variant="circle" />
      <Skeleton variant="rectangle" width="w-72" height="h-28" />
    </div>
  ),
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-navi-lg border border-navi-border bg-navi-surface p-4 shadow-navi-md dark:border-navi-border-dark dark:bg-navi-surface-hover">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton variant="circle" width="size-10" height="size-10" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="line" width="w-40" />
          <Skeleton variant="line" width="w-24" height="h-3" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="line" width="w-full" />
        <Skeleton variant="line" width="w-[92%]" />
        <Skeleton variant="line" width="w-[80%]" />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton variant="rectangle" width="w-24" height="h-8" className="rounded-navi-md" />
        <Skeleton variant="rectangle" width="w-16" height="h-8" className="rounded-navi-md" />
      </div>
    </div>
  ),
}

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-3xl overflow-hidden rounded-navi-lg border border-navi-border bg-navi-surface shadow-navi-md dark:border-navi-border-dark dark:bg-navi-surface-hover">
      <div className="grid grid-cols-4 gap-4 border-b border-navi-border px-4 py-3 dark:border-navi-border-dark">
        <Skeleton variant="line" width="w-20" />
        <Skeleton variant="line" width="w-24" />
        <Skeleton variant="line" width="w-16" />
        <Skeleton variant="line" width="w-12" />
      </div>
      <div className="space-y-0">
        {[...Array(5)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-4 gap-4 border-b border-navi-neutral/20 px-4 py-3 last:border-b-0 dark:border-navi-neutral/20"
          >
            <Skeleton variant="line" width="w-28" />
            <Skeleton variant="line" width="w-36" />
            <Skeleton variant="line" width="w-20" />
            <Skeleton variant="line" width="w-10" />
          </div>
        ))}
      </div>
    </div>
  ),
}
