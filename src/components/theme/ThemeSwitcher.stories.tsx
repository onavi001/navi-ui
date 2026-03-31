import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitcher } from "./ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Theme/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  argTypes: {
    showLabel: {
      control: "boolean",
      description: "Show text label next to the icon",
    },
  },
};
export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {
    showLabel: true,
  },
};

export const IconOnly: Story = {
  args: {
    showLabel: false,
  },
};

export const InCard: Story = {
  render: () => (
    <div className="rounded-navi-lg border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-navi-ink dark:text-navi-neutral-light mb-3">
          Theme
        </h2>
        <p className="text-sm text-navi-neutral dark:text-navi-neutral-light mb-4">
          Click to toggle between light and dark mode
        </p>
        <ThemeSwitcher />
      </div>
    </div>
  ),
};

export const WithOtherElements: Story = {
  render: () => (
    <div className="rounded-navi-lg border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-navi-ink dark:text-navi-neutral-light">
          Appearance Configuration
        </h2>
        <ThemeSwitcher showLabel={false} />
      </div>
      <hr className="border-navi-border dark:border-navi-border-dark" />
      <div className="space-y-2 text-sm text-navi-neutral dark:text-navi-neutral-light">
        <p>• Automatic theme: detects system preference</p>
        <p>• Saved theme: persists in localStorage</p>
        <p>• Instant switch: no page reload</p>
      </div>
    </div>
  ),
};
