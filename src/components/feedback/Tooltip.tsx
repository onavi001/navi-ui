import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/utils/cn'

export interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    'content' | 'children'
  > {
  /** Contenido mostrado en el tooltip. */
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  /** Elemento que activa el tooltip (debe ser un solo elemento React con ref). */
  children: React.ReactElement
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipProps
>(
  (
    {
      content,
      side = 'top',
      delayDuration = 300,
      children,
      className,
      sideOffset = 6,
      ...contentProps
    },
    ref
  ) => (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger ref={ref} asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className={cn(
              'z-50 max-w-xs rounded-navi-md bg-navi-overlay px-3 py-2 text-xs leading-snug text-navi-inverse shadow-navi-md animate-[navi-alert-in_0.15s_ease-out]',
              className
            )}
            {...contentProps}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-navi-overlay" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
)
Tooltip.displayName = 'Tooltip'

export { Tooltip }
