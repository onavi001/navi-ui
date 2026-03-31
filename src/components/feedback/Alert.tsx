import * as React from 'react'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/primitives/Badge'

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  dismissible?: boolean
  /** Called when closing when `dismissible` is active. */
  onDismiss?: () => void
}

const variantStyles: Record<
  AlertVariant,
  { shell: string; icon: string; badge: React.ComponentProps<typeof Badge>['variant'] }
> = {
  info: {
    shell: 'border-navi-primary/25 dark:border-navi-primary/40 bg-navi-primary/5 dark:bg-navi-primary/15',
    icon: 'text-navi-primary dark:text-navi-primary-light',
    badge: 'info',
  },
  success: {
    shell: 'border-navi-success/25 dark:border-navi-success/40 bg-navi-success/5 dark:bg-navi-success/15',
    icon: 'text-navi-success dark:text-navi-success-light',
    badge: 'success',
  },
  warning: {
    shell: 'border-navi-warning/30 dark:border-navi-warning/40 bg-navi-warning/8 dark:bg-navi-warning/15',
    icon: 'text-navi-warning dark:text-navi-warning-light',
    badge: 'warning',
  },
  destructive: {
    shell: 'border-navi-destructive/25 dark:border-navi-destructive/40 bg-navi-destructive/5 dark:bg-navi-destructive/15',
    icon: 'text-navi-destructive dark:text-navi-destructive-light',
    badge: 'destructive',
  },
}

const roleForVariant = (v: AlertVariant): 'alert' | 'status' =>
  v === 'destructive' || v === 'warning' ? 'alert' : 'status'

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  success: (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  ),
  warning: (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  destructive: (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      description,
      icon,
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(true)
    if (!open) return null

    const styles = variantStyles[variant]
    const graphic = icon ?? defaultIcons[variant]

    const handleDismiss = () => {
      setOpen(false)
      onDismiss?.()
    }

    return (
      <div
        ref={ref}
        role={roleForVariant(variant)}
        className={cn(
          'relative flex gap-3 rounded-navi-lg border p-4 animate-[navi-alert-in_0.2s_ease-out]',
          styles.shell,
          className
        )}
        {...props}
      >
        <span className={cn('mt-0.5', styles.icon)}>{graphic}</span>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={styles.badge} size="sm">
              {variant}
            </Badge>
            {title ? (
              <p className="font-semibold leading-tight text-navi-neutral">{title}</p>
            ) : null}
          </div>
          {description ? (
            <p className="text-sm text-navi-neutral/85">{description}</p>
          ) : null}
        </div>
        {dismissible ? (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'absolute end-2 top-2 rounded-navi-sm p-1 text-navi-neutral/70 transition-colors hover:bg-navi-neutral/10 hover:text-navi-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary'
            )}
            aria-label="Cerrar alerta"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert }
