import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar, type SidebarItem } from './Sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    items: { control: 'object' },
    collapsed: { control: 'boolean' },
    onCollapse: { action: 'onCollapse' },
    header: { control: false },
    footer: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof Sidebar>

const baseItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '#dashboard',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="M3 7h18M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2M6 7v12a2 2 0 002 2h8a2 2 0 002-2V7" strokeWidth={2} />
      </svg>
    ),
    badge: 3,
  },
  {
    label: 'Settings',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" strokeWidth={2} />
        <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 01-4 0v-.2a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 010-4h.2a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3h.1a1.7 1.7 0 001-1.6V3a2 2 0 014 0v.2a1.7 1.7 0 001 1.6h.1a1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9v.1a1.7 1.7 0 001.6 1H21a2 2 0 010 4h-.2a1.7 1.7 0 00-1.6 1z" strokeWidth={1.5} />
      </svg>
    ),
    children: [
      { label: 'General', href: '#general' },
      { label: 'Security', href: '#security', badge: 'New' },
    ],
  },
]

const sharedHeader = <span className="text-sm font-semibold text-navi-ink">Navi Workspace</span>
const sharedFooter = <span className="text-xs text-navi-ink-muted">v1.0.0</span>

export const Default: Story = {
  args: {
    items: baseItems,
    header: sharedHeader,
    footer: sharedFooter,
  },
}

export const Collapsed: Story = {
  args: {
    items: baseItems,
    collapsed: true,
    header: sharedHeader,
    footer: sharedFooter,
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      { ...baseItems[0], badge: 1 },
      { ...baseItems[1], badge: 12 },
      { ...baseItems[2] },
    ],
    header: sharedHeader,
    footer: sharedFooter,
  },
}

export const WithNestedItems: Story = {
  args: {
    items: baseItems,
    header: sharedHeader,
    footer: sharedFooter,
  },
}
