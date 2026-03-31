import * as React from 'react'
import { cn } from '@/utils/cn'
import { Button, type ButtonProps, type ButtonSize } from './Button'

export interface IconButtonProps
  extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children' | 'aria-label'>,
    Required<Pick<ButtonProps, 'aria-label'>> {
  /** Single icon displayed in the button. */
  children: React.ReactNode
}

const iconSizePadding: Record<ButtonSize, string> = {
  sm: 'size-8 p-0',
  md: 'size-10 p-0',
  lg: 'size-11 p-0',
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      size = 'md',
      variant = 'ghost',
      loading,
      children,
      ...props
    },
    ref
  ) => (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      loading={loading}
      className={cn(iconSizePadding[size], className)}
      {...props}
    >
      {loading ? null : (
        <span className="inline-flex size-[1.125rem] shrink-0 items-center justify-center [&_svg]:size-full">
          {children}
        </span>
      )}
    </Button>
  )
)
IconButton.displayName = 'IconButton'

export { IconButton }
