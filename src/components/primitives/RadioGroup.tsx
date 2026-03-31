import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/utils/cn'
import { Label } from './Label'

export interface RadioOption {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    'children'
  > {
  options: RadioOption[]
  /** Disposición de las opciones. */
  orientation?: 'horizontal' | 'vertical'
}

const itemStyles =
  'aspect-square size-4 rounded-full border border-navi-neutral/30 bg-navi-surface text-navi-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navi-surface disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-navi-primary data-[state=checked]:bg-navi-primary'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, options, orientation = 'vertical', name, ...props }, ref) => {
  const uid = React.useId().replace(/:/g, '')
  return (
  <RadioGroupPrimitive.Root
    ref={ref}
    name={name}
    className={cn(
      'grid gap-3',
      orientation === 'horizontal' && 'auto-cols-fr grid-flow-col',
      className
    )}
    orientation={orientation}
    {...props}
  >
    {options.map((opt) => {
      const itemId = `navi-radio-${uid}-${opt.value}`
      return (
        <div key={opt.value} className="flex items-center gap-2">
          <RadioGroupPrimitive.Item
            id={itemId}
            value={opt.value}
            disabled={opt.disabled}
            className={itemStyles}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <span className="block size-1.5 rounded-full bg-navi-inverse" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <Label htmlFor={itemId} className="cursor-pointer font-normal">
            {opt.label}
          </Label>
        </div>
      )
    })}
  </RadioGroupPrimitive.Root>
  )
})
RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
