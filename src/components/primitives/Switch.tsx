import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/utils/cn'
import { Label } from './Label'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    'children'
  > {
  label?: string
  helperText?: string
  size?: SwitchSize
}

const rootSize: Record<SwitchSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-14',
}

const thumbSize: Record<SwitchSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, id: idProp, label, helperText, size = 'md', disabled, ...props }, ref) => {
  const genId = React.useId()
  const id = idProp ?? genId

  const control = (
    <SwitchPrimitive.Root
      ref={ref}
      id={id}
      disabled={disabled}
      className={cn(
        'navi-switch peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-navi-neutral/25 dark:bg-navi-neutral/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navi-surface focus-visible:ring-offset-navi-surface disabled:cursor-not-allowed disabled:opacity-50',
        rootSize[size],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block translate-x-0.5 rounded-full bg-navi-inverse shadow-navi-sm transition-transform',
          thumbSize[size],
          'navi-switch-thumb'
        )}
      />
    </SwitchPrimitive.Root>
  )

  if (!label && !helperText) return control

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-3">
        {control}
        <div className="min-w-0 flex-1 space-y-0.5">
          {label ? (
            <Label htmlFor={id} className="cursor-pointer leading-snug">
              {label}
            </Label>
          ) : null}
          {helperText ? (
            <p id={`${id}-helper`} className="text-sm text-navi-neutral/80">
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
})
Switch.displayName = 'Switch'

export { Switch }
