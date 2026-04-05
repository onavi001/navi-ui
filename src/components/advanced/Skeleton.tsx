import * as React from 'react'
import { cn } from '@/utils/cn'

export type SkeletonVariant = 'line' | 'circle' | 'rectangle'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
  variant?: SkeletonVariant
}

const variantStyles: Record<SkeletonVariant, string> = {
  line: 'h-4 w-full rounded-navi-sm',
  circle: 'size-10 rounded-full',
  rectangle: 'h-24 w-full rounded-navi-md',
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, variant = 'line', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'navi-skeleton-pulse bg-navi-neutral/10 dark:bg-navi-surface-hover',
        variantStyles[variant],
        width,
        height,
        className
      )}
      aria-hidden
      {...props}
    />
  )
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
