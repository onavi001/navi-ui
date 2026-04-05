import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";
import { Input } from "../primitives";

const meta: Meta<typeof FormField> = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email Address",
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Email Address",
    errorMessage: "Please enter a valid email address",
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Password",
    helperText: "Must be at least 8 characters long",
    children: <Input type="password" placeholder="Enter your password" />,
  },
};

export const Required: Story = {
  args: {
    label: "Username",
    required: true,
    helperText: "Choose a unique username",
    children: <Input placeholder="Enter your username" />,
  },
};
