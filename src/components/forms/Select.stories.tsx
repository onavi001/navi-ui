import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    value: { control: "text" },
    onValueChange: { action: "onValueChange" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3", disabled: true },
  { label: "Option 4", value: "4" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    error: true,
    errorMessage: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select options={sampleOptions} placeholder="Small" size="sm" />
      <Select options={sampleOptions} placeholder="Medium" size="md" />
      <Select options={sampleOptions} placeholder="Large" size="lg" />
    </div>
  ),
};
