import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'
import { cn } from '@/utils/cn'
import 'sonner/dist/styles.css'

export type { ToasterProps }

function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className={cn('group toaster', className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn(
            'rounded-navi-md border border-navi-border dark:border-navi-border-dark bg-navi-surface dark:bg-navi-surface-hover text-navi-ink dark:text-navi-neutral-light shadow-navi-md dark:shadow-navi-lg',
            toastOptions?.classNames?.toast
          ),
          error: cn('border-navi-destructive/30 dark:border-navi-destructive/40', toastOptions?.classNames?.error),
          success: cn('border-navi-success/30 dark:border-navi-success/40', toastOptions?.classNames?.success),
          warning: cn('border-navi-warning/30 dark:border-navi-warning/40', toastOptions?.classNames?.warning),
          info: cn('border-navi-primary/30 dark:border-navi-primary/40', toastOptions?.classNames?.info),
        },
      }}
      {...props}
    />
  )
}

Toaster.displayName = 'Toaster'

export { Toaster }
