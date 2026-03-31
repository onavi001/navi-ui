import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { Flex } from './Flex'

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: [
        'stretch',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'start',
        'end',
      ],
    },
    justify: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
        'start',
        'end',
      ],
    },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    className: { control: 'text' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Flex>

const Box = ({ children }: { children: ReactNode }) => (
  <div className="rounded-navi-md bg-navi-primary/10 px-3 py-2 text-sm text-navi-neutral">
    {children}
  </div>
)

export const Default: Story = {
  render: () => (
    <Flex gap="md">
      <Box>A</Box>
      <Box>B</Box>
      <Box>C</Box>
    </Flex>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Flex direction="row" gap="sm" className="min-h-[4rem] rounded-navi-md border border-dashed border-navi-neutral/20 p-2">
        <Box>row</Box>
        <Box>items</Box>
      </Flex>
      <Flex direction="column" gap="sm" className="min-h-[6rem] rounded-navi-md border border-dashed border-navi-neutral/20 p-2">
        <Box>column</Box>
        <Box>stack</Box>
      </Flex>
      <Flex justify="space-between" align="center" className="w-full max-w-md rounded-navi-md border border-dashed border-navi-neutral/20 p-2">
        <Box>Izquierda</Box>
        <Box>Derecha</Box>
      </Flex>
    </div>
  ),
}

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap="sm" className="max-w-xs rounded-navi-md border border-navi-neutral/15 p-2">
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>Item {i + 1}</Box>
      ))}
    </Flex>
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
    <Flex gap="md">
      <Box>Uno</Box>
      <Box>Dos</Box>
    </Flex>
  ),
}
