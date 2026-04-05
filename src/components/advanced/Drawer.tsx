import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/utils/cn'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg'

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: DrawerSide
  size?: DrawerSize
  backdropBlur?: boolean
}

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>

export type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>

export type DrawerCloseProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>

const Drawer = DialogPrimitive.Root

const horizontalSizeStyles: Record<DrawerSize, string> = {
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[32rem]',
}

const verticalSizeStyles: Record<DrawerSize, string> = {
  sm: 'h-56',
  md: 'h-72',
  lg: 'h-96',
}

const sidePositionStyles: Record<DrawerSide, string> = {
  right: 'right-0 top-0 h-full',
  left: 'left-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full',
}

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DrawerTriggerProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} className={className} {...props} />
))
DrawerTrigger.displayName = 'Drawer.Trigger'

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(
  (
    { className, children, side = 'right', size = 'md', backdropBlur = false, ...props },
    ref
  ) => {
    const sizeClass =
      side === 'left' || side === 'right'
        ? horizontalSizeStyles[size]
        : verticalSizeStyles[size]

    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'navi-drawer-overlay fixed inset-0 z-40 bg-black/50',
            backdropBlur && 'backdrop-blur-sm'
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          data-side={side}
          className={cn(
            'navi-drawer-content fixed z-50 border border-navi-border bg-navi-surface p-6 shadow-navi-lg focus:outline-none dark:border-navi-border-dark dark:bg-navi-surface-hover',
            sidePositionStyles[side],
            sizeClass,
            className
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    )
  }
)
DrawerContent.displayName = 'Drawer.Content'

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-left', className)}
      {...props}
    />
  )
)
DrawerHeader.displayName = 'Drawer.Header'

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
)
DrawerFooter.displayName = 'Drawer.Footer'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-navi-ink', className)}
    {...props}
  />
))
DrawerTitle.displayName = 'Drawer.Title'

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  DrawerCloseProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} className={className} {...props} />
))
DrawerClose.displayName = 'Drawer.Close'

const DrawerCompound = Object.assign(Drawer, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Close: DrawerClose,
})

export { DrawerCompound as Drawer }
