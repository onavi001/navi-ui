import * as React from 'react'
import { cn } from '@/utils/cn'

/** Visual variants of the badge. */
export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'outline'

/** Badge sizes. */
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-navi-primary/15 dark:bg-navi-primary/25 text-navi-primary dark:text-navi-primary-light',
  success: 'bg-navi-success/15 dark:bg-navi-success/25 text-navi-success dark:text-navi-success-light',
  warning: 'bg-navi-warning/15 dark:bg-navi-warning/25 text-navi-warning dark:text-navi-warning-light',
  destructive: 'bg-navi-destructive/15 dark:bg-navi-destructive/25 text-navi-destructive dark:text-navi-destructive-light',
  info: 'bg-navi-info/15 dark:bg-navi-info/25 text-navi-info dark:text-navi-info-light',
  outline:
    'border border-navi-border dark:border-navi-border-dark bg-transparent text-navi-neutral dark:text-navi-neutral-light',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-sm',
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-navi-sm font-medium leading-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge }
