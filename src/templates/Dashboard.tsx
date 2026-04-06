import * as React from 'react'
import type { DataTableColumn } from '@/components/data-display'
import { Avatar, DataTable } from '@/components/data-display'
import { Alert } from '@/components/feedback'
import { Card, Grid, Separator } from '@/components/layout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  type SidebarItem,
} from '@/components/navigation'
import { Badge, Button, Input } from '@/components/primitives'
import { cn } from '@/utils/cn'

interface Transaction {
  id: string
  customer: string
  amount: number
  status: 'Paid' | 'Pending' | 'Failed'
  date: string
}

export interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarCollapsed?: boolean
}

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" strokeWidth={1.8} />
  </svg>
)

const AnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <path d="M4 20V10M10 20V4M16 20v-6M22 20V8" strokeWidth={2} strokeLinecap="round" />
  </svg>
)

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 20a7 7 0 0 1 14 0" strokeWidth={1.8} />
    <path d="M20 8a3 3 0 0 1-2 2.83M23 20a5.5 5.5 0 0 0-4.5-5.4" strokeWidth={1.8} />
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <path d="M10 3h4l.7 2.6 2.5 1.4 2.5-1 2 3.5-1.8 2 .3 3 2 1-2 3.5-2.6-.9-2.4 1.4L14 21h-4l-.7-2.6-2.5-1.4-2.6.9-2-3.5 2-1 .2-3-1.7-2 2-3.5 2.5 1 2.5-1.4L10 3Z" strokeWidth={1.2} />
    <circle cx="12" cy="12" r="3" strokeWidth={1.8} />
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
    <path d="M9.5 9a2.5 2.5 0 1 1 3.9 2l-.8.6c-.5.4-.8 1-.8 1.6V14" strokeWidth={1.8} strokeLinecap="round" />
    <circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" />
  </svg>
)

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth={1.8} />
    <path d="M16 17l5-5-5-5M21 12H9" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" aria-hidden>
    <path d="M6 9a6 6 0 0 1 12 0v5l2 2H4l2-2V9Z" strokeWidth={1.8} />
    <path d="M10 19a2 2 0 0 0 4 0" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
)

const kpiCards = [
  {
    label: 'Total Users',
    value: '14,892',
    change: '+8.4%',
    positive: true,
    icon: <UsersIcon />,
  },
  {
    label: 'Revenue',
    value: '$98,430',
    change: '+12.1%',
    positive: true,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
        <path d="M3 17h4l3-5 4 3 7-8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Conversion',
    value: '4.73%',
    change: '-0.8%',
    positive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
        <path d="M20 7h-7M20 7l-3-3M20 7l-3 3M4 17h7M4 17l3-3M4 17l3 3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Open Tickets',
    value: '27',
    change: '-3.2%',
    positive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" aria-hidden>
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z" strokeWidth={1.8} />
      </svg>
    ),
  },
] as const

const transactions: Transaction[] = Array.from({ length: 20 }).map((_, index) => {
  const id = index + 1
  const status: Transaction['status'][] = ['Paid', 'Pending', 'Failed']

  return {
    id: `TX-${1000 + id}`,
    customer: `Customer ${id}`,
    amount: Math.round((Math.random() * 1200 + 60) * 100) / 100,
    status: status[index % status.length],
    date: `2026-04-${String((id % 30) + 1).padStart(2, '0')}`,
  }
})

const transactionColumns: DataTableColumn<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction',
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
    csvValue: (row) => row.amount.toFixed(2),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const variant =
        status === 'Paid'
          ? 'success'
          : status === 'Pending'
            ? 'warning'
            : 'destructive'

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
]

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: '#',
    badge: 'Active',
  },
  {
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    href: '#',
  },
  {
    label: 'Users',
    icon: <UsersIcon />,
    href: '#',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '#',
  },
  {
    label: '',
    icon: <span className="block h-px w-full bg-navi-border dark:bg-navi-border-dark" />,
    href: '#',
  },
  {
    label: 'Help',
    icon: <HelpIcon />,
    href: '#',
  },
  {
    label: 'Logout',
    icon: <LogoutIcon />,
    href: '#',
  },
]

const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({ className, sidebarCollapsed = false, ...props }, ref) => {
    const [collapsed, setCollapsed] = React.useState(sidebarCollapsed)

    React.useEffect(() => {
      setCollapsed(sidebarCollapsed)
    }, [sidebarCollapsed])

    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-navi-surface text-navi-ink dark:bg-navi-surface dark:text-navi-neutral-light', className)}
        {...props}
      >
        <div className="flex min-h-screen">
          <Sidebar
            items={sidebarItems}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            header={<span className="text-sm font-semibold">Navi Admin</span>}
            className="shrink-0"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 border-b border-navi-border bg-navi-surface/95 px-4 py-3 backdrop-blur dark:border-navi-border-dark dark:bg-navi-surface-hover/90 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="max-w-md flex-1">
                  <Input placeholder="Search dashboard..." aria-label="Search dashboard" />
                </div>

                <div className="relative">
                  <Button variant="ghost" size="sm" aria-label="Notifications" className="px-2">
                    <BellIcon />
                  </Button>
                  <Badge className="absolute -right-1 -top-1 px-1.5 py-0 text-[10px]">3</Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-navi-md border border-navi-border bg-navi-surface px-2 py-1.5 transition-colors hover:bg-navi-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary dark:border-navi-border-dark dark:bg-navi-surface-hover"
                      aria-label="Open user menu"
                    >
                      <Avatar size="sm" fallback="NU" />
                      <span className="hidden text-sm font-medium sm:inline">Navi User</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 space-y-6 p-4 sm:p-6">
              <Grid cols={1} colsMd={2} colsLg={4} gap="md">
                {kpiCards.map((kpi) => (
                  <Card key={kpi.label} variant="elevated" className="border border-navi-border dark:border-navi-border-dark">
                    <Card.Content className="space-y-3 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wide text-navi-neutral/60">
                          {kpi.label}
                        </span>
                        <span className="inline-flex size-8 items-center justify-center rounded-navi-md bg-navi-primary/10 text-navi-primary dark:text-navi-primary-light">
                          {kpi.icon}
                        </span>
                      </div>
                      <p className="text-3xl font-semibold leading-none">{kpi.value}</p>
                      <p
                        className={cn(
                          'text-sm font-medium',
                          kpi.positive
                            ? 'text-navi-success dark:text-navi-success-light'
                            : 'text-navi-destructive dark:text-navi-destructive-light'
                        )}
                      >
                        {kpi.change}
                      </p>
                    </Card.Content>
                  </Card>
                ))}
              </Grid>

              <Card variant="bordered" className="overflow-hidden">
                <Card.Header>
                  <Card.Title>Recent Activity</Card.Title>
                  <Card.Description>Latest transactions across your workspace.</Card.Description>
                </Card.Header>
                <Card.Content className="pt-0">
                  <DataTable
                    data={transactions}
                    columns={transactionColumns}
                    sorting
                    filtering
                    pagination
                    pageSize={8}
                    caption="Recent transactions"
                    emptyMessage="No transactions available"
                    stickyHeader
                  />
                </Card.Content>
              </Card>

              <Grid cols={1} colsMd={3} gap="md">
                <Card variant="bordered" className="md:col-span-2">
                  <Card.Header>
                    <Card.Title>Quick Actions</Card.Title>
                    <Card.Description>Run common actions in one click.</Card.Description>
                  </Card.Header>
                  <Card.Content className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">Create User</Button>
                      <Button variant="outline">Export Report</Button>
                      <Button variant="outline">Open Tickets</Button>
                      <Button variant="ghost">View Audit Log</Button>
                    </div>
                    <Separator />
                    <Alert
                      variant="info"
                      title="Tip"
                      description="Use the transaction table filters to quickly inspect customer issues."
                    />
                  </Card.Content>
                </Card>

                <Card variant="bordered">
                  <Card.Header>
                    <Card.Title>System Status</Card.Title>
                  </Card.Header>
                  <Card.Content className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navi-neutral/70">API</span>
                      <Badge variant="success">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navi-neutral/70">Auth</span>
                      <Badge variant="success">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-navi-neutral/70">Queue</span>
                      <Badge variant="warning">Delayed</Badge>
                    </div>
                  </Card.Content>
                </Card>
              </Grid>
            </main>
          </div>
        </div>
      </div>
    )
  }
)
Dashboard.displayName = 'Dashboard'

export { Dashboard }
