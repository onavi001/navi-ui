import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker, type DatePickerProps } from "./DatePicker";
import { useState } from "react";
import { addDays } from "date-fns";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "object" },
    onChange: { action: "onChange" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    minDate: { control: "object" },
    maxDate: { control: "object" },
    locale: { control: "select", options: ["es", "en"] },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

const DatePickerWithState = (args: Partial<DatePickerProps>) => {
  const [date, setDate] = useState<Date | undefined>(args.value);
  return (
    <DatePicker
      {...(args as DatePickerProps)}
      value={date}
      onChange={setDate}
    />
  );
};

export const Default: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date",
    locale: "es",
  },
};

export const WithMinMax: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date (next 30 days)",
    minDate: new Date(),
    maxDate: addDays(new Date(), 30),
    locale: "es",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled date picker",
    disabled: true,
    locale: "es",
  },
};

export const EnLocale: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date",
    locale: "en",
  },
};
