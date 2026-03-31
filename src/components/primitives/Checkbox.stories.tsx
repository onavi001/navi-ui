import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    className: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'I accept the terms',
    helperText: 'Debes marcar esta casilla para continuar.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Checkbox label="Sin error" defaultChecked />
      <Checkbox label="With error message" errorMessage="Selection is required." />
      <Checkbox label="Deshabilitado" disabled defaultChecked />
    </div>
  ),
}

export const Indeterminate: Story = {
  render: function IndeterminateStory() {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate')
    return (
      <Checkbox
        label="Seleccionar todo"
        checked={checked}
        onCheckedChange={(v) => setChecked(v === 'indeterminate' ? false : !!v)}
      />
    )
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
  render: () => <Checkbox label="Option" defaultChecked />,
}
