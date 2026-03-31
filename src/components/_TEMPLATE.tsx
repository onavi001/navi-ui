// TEMPLATE — copia y renombra para cada componente nuevo
import * as React from 'react'
import { cn } from '@/utils/cn'

export type ComponentNameProps = React.HTMLAttributes<HTMLDivElement>

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      />
    )
  }
)
ComponentName.displayName = 'ComponentName'

export { ComponentName }