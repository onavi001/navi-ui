import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/utils/cn'

export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>

export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>

export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>

export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>

export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>

const CommandRoot = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, children, open, onOpenChange, label = 'Command Menu', ...props }, ref) => {
  const isPalette = typeof open === 'boolean' && typeof onOpenChange === 'function'

  React.useEffect(() => {
    if (!isPalette) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPalette, onOpenChange, open])

  const command = (
    <CommandPrimitive
      ref={ref}
      label={label}
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-navi-lg border border-navi-border bg-navi-surface text-navi-ink shadow-navi-lg dark:border-navi-border-dark dark:bg-navi-surface-hover',
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive>
  )

  if (!isPalette) {
    return command
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="navi-dialog-overlay fixed inset-0 z-40 bg-black/50" />
        <DialogPrimitive.Content className="navi-dialog-content fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          {command}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
})
CommandRoot.displayName = 'Command'

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-navi-border px-3 dark:border-navi-border-dark">
    <svg
      className="mr-2 size-4 shrink-0 text-navi-neutral/60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" strokeWidth={2} />
      <path d="m20 20-3.5-3.5" strokeWidth={2} strokeLinecap="round" />
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-navi-md bg-transparent text-sm text-navi-ink outline-none placeholder:text-navi-neutral/60 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = 'Command.Input'

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-80 overflow-y-auto overflow-x-hidden p-2', className)}
    {...props}
  />
))
CommandList.displayName = 'Command.List'

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn('py-6 text-center text-sm text-navi-neutral/70', className)}
    {...props}
  />
))
CommandEmpty.displayName = 'Command.Empty'

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-navi-ink **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-navi-neutral/60',
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = 'Command.Group'

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-navi-md px-2 py-2 text-sm text-navi-ink outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-navi-primary/10 data-[selected=true]:text-navi-primary dark:data-[selected=true]:bg-navi-primary/15',
      className
    )}
    {...props}
  />
))
CommandItem.displayName = 'Command.Item'

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('mx-1 h-px bg-navi-border dark:bg-navi-border-dark', className)}
    {...props}
  />
))
CommandSeparator.displayName = 'Command.Separator'

const Command = Object.assign(CommandRoot, {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
})

export { Command }
