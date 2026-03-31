import * as React from 'react'
import { cn } from '@/utils/cn'
import { Separator } from './Separator'

export type StackDirection = 'vertical' | 'horizontal'

export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection
  gap?: StackGap
  /** Muestra un separador entre hijos directos. */
  dividers?: boolean
}

const gapClass: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'vertical',
      gap = 'md',
      dividers = false,
      children,
      ...props
    },
    ref
  ) => {
    const items = React.Children.toArray(children).filter(
      (c): c is React.ReactElement => React.isValidElement(c)
    )

    const separated = dividers
      ? items.flatMap((child, i) => {
          if (i === 0) return [child]
          return [
            <Separator
              key={`navi-stack-sep-${i}`}
              orientation={direction === 'vertical' ? 'horizontal' : 'vertical'}
              className={cn(
                direction === 'vertical' ? 'my-2 shrink-0' : 'mx-2 shrink-0'
              )}
            />,
            child,
          ]
        })
      : null

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          direction === 'vertical' ? 'flex-col' : 'flex-row',
          !dividers && gapClass[gap],
          className
        )}
        {...props}
      >
        {dividers ? separated : children}
      </div>
    )
  }
)
Stack.displayName = 'Stack'

export { Stack }
