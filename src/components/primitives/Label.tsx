import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils/cn'

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Si es obligatorio, muestra un asterisco en color destructivo. */
  required?: boolean
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none text-navi-neutral dark:text-navi-neutral-light peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  >
    {children}
    {required ? (
      <span className="ms-0.5 text-navi-destructive" aria-hidden>
        *
      </span>
    ) : null}
  </LabelPrimitive.Root>
))
Label.displayName = 'Label'

export { Label }
