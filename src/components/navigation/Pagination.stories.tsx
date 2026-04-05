import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination, type PaginationProps } from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    currentPage: { control: "number" },
    totalPages: { control: "number" },
    siblingCount: { control: "number" },
    showFirstLast: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
    showFirstLast: true,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    siblingCount: 1,
    showFirstLast: true,
  },
};

export const FewPages: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 2,
    totalPages: 5,
    siblingCount: 1,
    showFirstLast: false,
  },
};
