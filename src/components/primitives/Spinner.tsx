import * as React from 'react'
import { cn } from '@/utils/cn'

/** Available sizes for the loading indicator. */
export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Escala visual del spinner. */
  size?: SpinnerSize
  /** Accessible text; defaults to "Loading". */
  'aria-label'?: string
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'size-3 border-2',
  md: 'size-5 border-2',
  lg: 'size-8 border-[3px]',
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size = 'md', 'aria-label': ariaLabel = 'Loading', ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      className={cn(
        'navi-spinner inline-block shrink-0 rounded-full border-navi-primary dark:border-navi-primary-light border-t-transparent',
        'animate-[navi-spinner-spin_0.7s_linear_infinite]',
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
)
Spinner.displayName = 'Spinner'

export { Spinner }
