import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, type ComboboxProps } from "./Combobox";
import { useState } from "react";

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object" },
    value: { control: "text" },
    onChange: { action: "onChange" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const sampleOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
];

const ComboboxWithState = (args: Partial<ComboboxProps>) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <Combobox
      {...(args as ComboboxProps)}
      options={args.options || []}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    options: sampleOptions,
    placeholder: "Select a fruit...",
  },
};

export const WithManyOptions: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
    placeholder: "Search from 50 options...",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Disabled combobox",
    disabled: true,
  },
};

export const EmptyState: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    options: [],
    placeholder: "No options available",
    emptyMessage: "No fruits available",
  },
};
