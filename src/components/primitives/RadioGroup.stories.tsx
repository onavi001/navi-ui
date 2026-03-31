import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './RadioGroup'

const options = [
  { label: 'Opción A', value: 'a' },
  { label: 'Opción B', value: 'b' },
  { label: 'Opción C (deshabilitada)', value: 'c', disabled: true },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    defaultValue: { control: 'text' },
    dir: { control: 'text' },
    loop: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: {
    options,
    defaultValue: 'a',
    name: 'demo-radio',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-8">
      <RadioGroup options={options} defaultValue="a" name="v1" />
      <RadioGroup
        options={options}
        defaultValue="b"
        orientation="horizontal"
        name="v2"
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Uno', value: '1' },
      { label: 'Dos', value: '2' },
    ],
    defaultValue: '1',
    disabled: true,
    name: 'disabled-radio',
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
    <RadioGroup options={options} defaultValue="a" name="dark-radio" />
  ),
}
