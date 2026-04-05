import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    defaultValue: { control: "text" },
    value: { control: "text" },
    onValueChange: { action: "onValueChange" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Tab 1 Content</h3>
          <p>
            This is the content for the first tab. It can contain any React
            elements.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Tab 2 Content</h3>
          <p>
            This is the content for the second tab. You can put forms, images,
            or anything here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Tab 3 Content</h3>
          <p>
            This is the content for the third tab. Tabs are great for organizing
            content.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="pills">
        <TabsTrigger value="tab1" variant="pills">
          Home
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="pills">
          Profile
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="pills">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Home</h3>
          <p>Welcome to the home tab with pill-style navigation.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Profile</h3>
          <p>Your profile information goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p>Configure your preferences in this tab.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList variant="underline">
        <TabsTrigger value="tab1" variant="underline">
          Overview
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="underline">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="tab3" variant="underline">
          Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p>Get a quick overview of your data.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p>Detailed analytics and insights.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Reports</h3>
          <p>Generate and view reports.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab1" orientation="vertical">
      <div className="flex">
        <TabsList className="flex-col h-auto w-48">
          <TabsTrigger value="tab1" className="w-full justify-start">
            Account
          </TabsTrigger>
          <TabsTrigger value="tab2" className="w-full justify-start">
            Security
          </TabsTrigger>
          <TabsTrigger value="tab3" className="w-full justify-start">
            Notifications
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 ml-4">
          <TabsContent value="tab1">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <p>Manage your account details and preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <p>Configure password, two-factor authentication, etc.</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4">
              <h3 className="text-lg font-semibold">Notification Settings</h3>
              <p>Control how and when you receive notifications.</p>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  ),
};
