import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@/utils/cn'
import { Label } from './Label'

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'children'
  > {
  label?: string
  helperText?: string
  errorMessage?: string
}

const CheckIcon = () => (
  <svg viewBox="0 0 15 15" fill="none" className="size-3" aria-hidden>
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.6479 4.59198L7.39791 11.092C7.29783 11.2452 7.13562 11.3467 6.95402 11.3699C6.77243 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const IndeterminateIcon = () => (
  <svg viewBox="0 0 15 15" fill="none" className="size-3" aria-hidden>
    <path
      d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, id: idProp, label, helperText, errorMessage, disabled, ...props }, ref) => {
  const genId = React.useId()
  const id = idProp ?? genId

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            'group mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-navi-sm border border-navi-border transition-all duration-200 bg-navi-surface text-navi-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 navi-checkbox',
            'dark:border-navi-border-dark dark:bg-navi-surface-hover dark:focus-visible:ring-offset-navi-surface'
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
            <span className="hidden group-data-[state=checked]:block">
              <CheckIcon />
            </span>
            <span className="hidden group-data-[state=indeterminate]:block">
              <IndeterminateIcon />
            </span>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label ? (
          <div className="min-w-0 flex-1 space-y-0.5">
            <Label htmlFor={id} className="cursor-pointer leading-snug">
              {label}
            </Label>
            {helperText ? (
              <p id={`${id}-helper`} className="text-sm text-navi-neutral/80">
                {helperText}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
      {errorMessage ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-navi-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})
Checkbox.displayName = 'Checkbox'

export { Checkbox }
