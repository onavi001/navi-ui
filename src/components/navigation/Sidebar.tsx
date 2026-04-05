import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/primitives/Badge'
import { Avatar } from '@/components/data-display/Avatar'

export interface SidebarChildItem {
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: string | number
}

export interface SidebarItem extends SidebarChildItem {
  children?: SidebarChildItem[]
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      items,
      collapsed,
      onCollapse,
      header,
      footer,
      ...props
    },
    ref
  ) => {
    const isControlled = collapsed !== undefined
    const [internalCollapsed, setInternalCollapsed] = React.useState(false)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})

    const isCollapsed = isControlled ? collapsed : internalCollapsed

    const handleCollapseChange = (nextValue: boolean) => {
      if (!isControlled) {
        setInternalCollapsed(nextValue)
      }
      onCollapse?.(nextValue)
    }

    const toggleItem = (itemKey: string) => {
      setExpandedItems((prev) => ({
        ...prev,
        [itemKey]: !prev[itemKey],
      }))
    }

    const renderChildItem = (child: SidebarChildItem, parentKey: string) => {
      const childKey = `${parentKey}-${child.label}`

      return (
        <li key={childKey}>
          <a
            href={child.href}
            className={cn(
              'flex items-center gap-2 rounded-navi-md px-3 py-2 text-sm text-navi-ink-muted transition-colors hover:bg-navi-neutral/10 hover:text-navi-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary dark:text-navi-ink-muted dark:hover:bg-navi-neutral/20 dark:hover:text-navi-ink'
            )}
          >
            {child.icon ? <span className="flex size-4 items-center justify-center">{child.icon}</span> : null}
            <span className="flex-1 truncate">{child.label}</span>
            {child.badge !== undefined ? <Badge size="sm">{child.badge}</Badge> : null}
          </a>
        </li>
      )
    }

    const renderItem = (item: SidebarItem, index: number) => {
      const itemKey = `${index}-${item.label}`
      const hasChildren = (item.children?.length ?? 0) > 0
      const isExpanded = expandedItems[itemKey] ?? false

      return (
        <li key={itemKey}>
          <a
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-navi-md px-3 py-2 text-sm font-medium text-navi-ink transition-colors hover:bg-navi-neutral/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary dark:text-navi-ink dark:hover:bg-navi-neutral/20',
              isCollapsed && 'justify-center px-2'
            )}
            onClick={(event) => {
              if (hasChildren) {
                event.preventDefault()
                toggleItem(itemKey)
              }
              if (!hasChildren && mobileOpen) {
                setMobileOpen(false)
              }
            }}
          >
            {item.icon ? <span className="flex size-5 shrink-0 items-center justify-center">{item.icon}</span> : null}
            {!isCollapsed ? (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge !== undefined ? <Badge size="sm">{item.badge}</Badge> : null}
                {hasChildren ? (
                  <svg
                    className={cn('size-4 transition-transform', isExpanded && 'rotate-180')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </>
            ) : null}
          </a>

          {!isCollapsed && hasChildren && isExpanded ? (
            <ul className="mt-1 space-y-1 pl-6">
              {item.children?.map((child) => renderChildItem(child, itemKey))}
            </ul>
          ) : null}
        </li>
      )
    }

    const defaultFooter = (
      <div className="flex items-center gap-2">
        <Avatar size="sm" fallback="NU" />
        {!isCollapsed ? <span className="text-sm text-navi-ink-muted">Navi User</span> : null}
      </div>
    )

    const navClasses = cn(
      'flex h-full flex-col border-r border-navi-border bg-navi-surface dark:border-navi-border-strong dark:bg-navi-surface-raised',
      isCollapsed ? 'w-16' : 'w-72',
      className
    )

    const renderNav = (withRef: boolean) => (
      <nav ref={withRef ? ref : undefined} className={navClasses} aria-label="sidebar" {...props}>
        <div className="flex items-center justify-between border-b border-navi-border p-3 dark:border-navi-border-strong">
          <div className={cn('min-w-0', isCollapsed && 'hidden')}>
            {header ?? <span className="text-sm font-semibold text-navi-ink">Navigation</span>}
          </div>
          <button
            type="button"
            onClick={() => handleCollapseChange(!isCollapsed)}
            className="rounded-navi-sm p-1.5 text-navi-ink-muted transition-colors hover:bg-navi-neutral/10 hover:text-navi-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary dark:hover:bg-navi-neutral/20"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden
            >
              <path
                d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">{items.map(renderItem)}</ul>
        </div>

        <div className="border-t border-navi-border p-3 dark:border-navi-border-strong">
          {footer ?? defaultFooter}
        </div>
      </nav>
    )

    return (
      <>
        <div className="hidden md:block">{renderNav(true)}</div>

        <div className="md:hidden">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="rounded-navi-md border border-navi-border bg-navi-surface p-2 text-navi-ink shadow-navi-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary dark:border-navi-border-strong dark:bg-navi-surface-raised"
                aria-label="Open sidebar"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M3 6h18M3 12h18M3 18h18" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
              <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] outline-none">
                {renderNav(false)}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export { Sidebar }
