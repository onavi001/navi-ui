import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Advanced/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'bordered', 'flush'] },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" variant="default">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is Navi UI?</Accordion.Trigger>
        <Accordion.Content>
          Navi UI is an enterprise-ready React component library with strong accessibility and TypeScript support.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is dark mode included?</Accordion.Trigger>
        <Accordion.Content>
          Yes, all components support automatic dark mode using CSS variables and semantic tokens.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" variant="default" defaultValue={['item-1']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>First section</Accordion.Trigger>
        <Accordion.Content>Multiple mode allows opening more than one item at once.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Second section</Accordion.Trigger>
        <Accordion.Content>Use this for FAQs or grouped settings.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Third section</Accordion.Trigger>
        <Accordion.Content>Each item is keyboard-accessible out of the box.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="bordered" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Bordered style</Accordion.Trigger>
        <Accordion.Content>This variant emphasizes section boundaries with stronger borders.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Use case</Accordion.Trigger>
        <Accordion.Content>Great for settings pages and admin interfaces.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Flush: Story = {
  render: () => (
    <Accordion type="single" collapsible variant="flush" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Flush style</Accordion.Trigger>
        <Accordion.Content>Flush keeps spacing minimal and works well in constrained layouts.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Visual density</Accordion.Trigger>
        <Accordion.Content>Use flush variant when you need compact stacked content.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const FAQ: Story = {
  render: () => (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold text-navi-ink">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible variant="default" defaultValue="q1">
        <Accordion.Item value="q1">
          <Accordion.Trigger>How do I install Navi UI?</Accordion.Trigger>
          <Accordion.Content>
            Install the package with npm and ensure Tailwind CSS v4 is configured in your project.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="q2">
          <Accordion.Trigger>Does it support accessibility standards?</Accordion.Trigger>
          <Accordion.Content>
            Yes, components are designed with WCAG 2.2 AA goals and include keyboard and screen reader support.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="q3">
          <Accordion.Trigger>Can I customize visual styles?</Accordion.Trigger>
          <Accordion.Content>
            Yes, all visuals are token-driven and can be themed via CSS variables and utility classes.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}
