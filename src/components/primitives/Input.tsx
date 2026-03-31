import * as React from 'react'
import { cn } from '@/utils/cn'
import { Label } from './Label'

export type InputVariant = 'default' | 'error' | 'success'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Variante visual según validación. */
  variant?: InputVariant
  /** Texto del label asociado al campo. */
  label?: string
  /** Texto de ayuda bajo el campo. */
  helperText?: string
  /** Mensaje de error; prioriza la variante `error` y se muestra con `role="alert"`. */
  errorMessage?: string
  /** Contenido a la izquierda del input (p. ej. prefijo o ícono). */
  leftAddon?: React.ReactNode
  /** Contenido a la derecha del input (p. ej. sufijo o acción). */
  rightAddon?: React.ReactNode
}

const fieldShell =
  'flex w-full items-center gap-2 rounded-navi-md border bg-navi-surface px-3 transition-all duration-200 dark:bg-navi-surface-hover'

const variantShell: Record<InputVariant, string> = {
  default: 'border-navi-border dark:border-navi-border-dark focus-within:border-navi-primary focus-within:ring-2 focus-within:ring-navi-primary/30 dark:focus-within:ring-navi-primary/50',
  error:
    'border-navi-destructive focus-within:border-navi-destructive focus-within:ring-2 focus-within:ring-navi-destructive/30 dark:focus-within:ring-navi-destructive/50',
  success:
    'border-navi-success focus-within:border-navi-success focus-within:ring-2 focus-within:ring-navi-success/30 dark:focus-within:ring-navi-success/50',
}

const inputStyles =
  'min-h-10 w-full flex-1 border-0 bg-transparent py-2 text-sm text-navi-ink placeholder:text-navi-neutral/60 dark:text-navi-neutral-light dark:placeholder:text-navi-neutral/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id: idProp,
      variant: variantProp = 'default',
      label,
      helperText,
      errorMessage,
      leftAddon,
      rightAddon,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const genId = React.useId()
    const id = idProp ?? genId
    const variant = errorMessage ? 'error' : variantProp

    return (
      <div className={cn('w-full space-y-1.5', className)}>
        {label ? (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        ) : null}
        <div
          className={cn(
            fieldShell,
            variantShell[variant],
            disabled && 'pointer-events-none opacity-50'
          )}
        >
          {leftAddon ? (
            <span className="shrink-0 text-navi-neutral/70">{leftAddon}</span>
          ) : null}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={
              [helperText ? `${id}-helper` : '', errorMessage ? `${id}-error` : '']
                .filter(Boolean)
                .join(' ') || undefined
            }
            className={inputStyles}
            {...props}
          />
          {rightAddon ? (
            <span className="shrink-0 text-navi-neutral/70">{rightAddon}</span>
          ) : null}
        </div>
        {errorMessage ? (
          <p id={`${id}-error`} role="alert" className="text-sm text-navi-destructive">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={`${id}-helper`} className="text-sm text-navi-neutral/80">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
