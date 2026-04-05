import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroup } from "./AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "Data Display/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  argTypes: {
    avatars: { control: "object" },
    max: { control: "number" },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    overlap: { control: "boolean" },
    className: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const sampleAvatars = [
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    alt: "User 1",
    fallback: "U1",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    alt: "User 2",
    fallback: "U2",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    alt: "User 3",
    fallback: "U3",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    alt: "User 4",
    fallback: "U4",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    alt: "User 5",
    fallback: "U5",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face",
    alt: "User 6",
    fallback: "U6",
  },
];

export const Default: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
    max: 4,
  },
};

export const WithOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
  },
};

export const NoOverlap: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 4),
    max: 4,
    overlap: false,
  },
};
