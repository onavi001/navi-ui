import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/utils/cn'

export type AccordionType = 'single' | 'multiple'
export type AccordionVariant = 'default' | 'bordered' | 'flush'

type AccordionBaseRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'collapsible'
>

type AccordionSingleRootProps = AccordionBaseRootProps & {
  type?: 'single'
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type AccordionMultipleRootProps = AccordionBaseRootProps & {
  type: 'multiple'
  collapsible?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

interface AccordionContextValue {
  variant: AccordionVariant
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: 'default',
})

export type AccordionProps = (AccordionSingleRootProps | AccordionMultipleRootProps) & {
  variant?: AccordionVariant
}

export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>

export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>

const itemVariantStyles: Record<AccordionVariant, string> = {
  default:
    'rounded-navi-md border border-navi-border bg-navi-surface dark:border-navi-border-dark dark:bg-navi-surface-hover',
  bordered:
    'rounded-navi-md border border-navi-border-dark bg-navi-surface dark:border-navi-border dark:bg-navi-surface-hover',
  flush: 'border-b border-navi-border dark:border-navi-border-dark last:border-b-0',
}

const triggerVariantStyles: Record<AccordionVariant, string> = {
  default: 'px-4 py-3',
  bordered: 'px-4 py-3',
  flush: 'px-1 py-3',
}

const contentVariantStyles: Record<AccordionVariant, string> = {
  default: 'px-4 pb-3',
  bordered: 'px-4 pb-3',
  flush: 'px-1 pb-3',
}

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(
  (
    {
      className,
      type = 'single',
      collapsible = true,
      variant = 'default',
      children,
      ...restProps
    },
    ref
  ) => {
    const rootClassName = cn('w-full space-y-2', className)

    return (
      <AccordionContext.Provider value={{ variant }}>
        {type === 'multiple' ? (
          <AccordionPrimitive.Root
            ref={ref}
            type="multiple"
            className={rootClassName}
            {...(restProps as Omit<AccordionMultipleRootProps, 'type'>)}
          >
            {children}
          </AccordionPrimitive.Root>
        ) : (
          <AccordionPrimitive.Root
            ref={ref}
            type="single"
            collapsible={collapsible}
            className={rootClassName}
            {...(restProps as Omit<AccordionSingleRootProps, 'type' | 'collapsible'>)}
          >
            {children}
          </AccordionPrimitive.Root>
        )}
      </AccordionContext.Provider>
    )
  }
)
AccordionRoot.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(itemVariantStyles[variant], className)}
      {...props}
    />
  )
})
AccordionItem.displayName = 'Accordion.Item'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between text-left text-sm font-medium text-navi-ink transition-colors hover:text-navi-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary [&[data-state=open]>svg]:rotate-180',
          triggerVariantStyles[variant],
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <svg
          className="size-4 shrink-0 transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = 'Accordion.Trigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'navi-accordion-content overflow-hidden text-sm text-navi-neutral/70',
        contentVariantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = 'Accordion.Content'

const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export { Accordion }
