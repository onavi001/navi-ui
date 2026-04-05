import * as React from 'react'
import { cn } from '@/utils/cn'
import { Spinner } from './Spinner'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'outline'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-navi-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navi-surface focus-visible:ring-offset-navi-surface disabled:pointer-events-none disabled:opacity-50'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-navi-primary text-navi-inverse hover:bg-navi-primary-dark active:bg-navi-primary-dark shadow-navi-sm hover:shadow-navi-md transition-all dark:bg-navi-primary dark:hover:bg-navi-primary-light',
  secondary:
    'bg-navi-neutral/10 text-navi-neutral hover:bg-navi-neutral/20 active:bg-navi-neutral/25 dark:bg-navi-neutral/20 dark:hover:bg-navi-neutral/30 dark:text-navi-neutral-light',
  ghost:
    'bg-transparent text-navi-neutral hover:bg-navi-neutral/10 active:bg-navi-neutral/10 dark:text-navi-neutral-light dark:hover:bg-navi-neutral/25',
  destructive:
    'bg-navi-destructive text-navi-inverse hover:bg-navi-destructive-dark active:bg-navi-destructive-dark shadow-navi-sm hover:shadow-navi-md dark:bg-navi-destructive dark:hover:bg-navi-destructive-light',
  outline:
    'border border-navi-border bg-transparent text-navi-neutral hover:bg-navi-surface-hover active:bg-navi-surface-active dark:border-navi-border dark:text-navi-neutral-light dark:hover:bg-navi-surface-hover',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

const spinSize: Record<ButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled ?? loading}
      aria-busy={loading ? true : undefined}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {loading ? (
        <Spinner
          size={spinSize[size]}
          className={cn(
            variant === 'primary' || variant === 'destructive'
              ? 'border-navi-inverse border-t-transparent'
              : undefined
          )}
          aria-hidden
        />
      ) : (
        leftIcon
      )}
      {children}
      {!loading ? rightIcon : null}
    </button>
  )
)
Button.displayName = 'Button'

export { Button }
