import * as React from 'react'
import { cn } from '@/utils/cn'
import { Flex } from './Flex'

export type CardVariant = 'default' | 'bordered' | 'elevated'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

const cardVariant: Record<CardVariant, string> = {
  default: 'bg-navi-surface dark:bg-navi-surface-hover',
  bordered:
    'border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover',
  elevated: 'bg-navi-surface dark:bg-navi-surface-hover shadow-navi-md dark:shadow-navi-lg',
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-navi-lg text-navi-neutral',
        cardVariant[variant],
        className
      )}
      {...props}
    />
  )
)
CardRoot.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Flex
    ref={ref}
    direction="column"
    gap="xs"
    className={cn('p-6 pb-0', className)}
    {...props}
  />
))
CardHeader.displayName = 'Card.Header'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-tight tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'Card.Title'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-navi-neutral/80', className)}
    {...props}
  />
))
CardDescription.displayName = 'Card.Description'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-4', className)} {...props} />
))
CardContent.displayName = 'Card.Content'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center gap-2 border-t border-navi-neutral/10 p-6 dark:border-navi-neutral/20',
      className
    )}
    {...props}
  />
))
CardFooter.displayName = 'Card.Footer'

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export { Card }
