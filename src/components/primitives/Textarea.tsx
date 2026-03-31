import * as React from 'react'
import { cn } from '@/utils/cn'
import { Label } from './Label'

export type TextareaVariant = 'default' | 'error' | 'success'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant
  label?: string
  helperText?: string
  errorMessage?: string
  /** Automatically adjusts height to fit content. */
  autoResize?: boolean
}

const fieldShell =
  'flex w-full rounded-navi-md border bg-navi-surface p-3 transition-colors'

const variantShell: Record<TextareaVariant, string> = {
  default: 'border-navi-neutral/20 focus-within:border-navi-primary focus-within:ring-2 focus-within:ring-navi-primary/20',
  error:
    'border-navi-destructive focus-within:border-navi-destructive focus-within:ring-2 focus-within:ring-navi-destructive/25',
  success:
    'border-navi-success focus-within:border-navi-success focus-within:ring-2 focus-within:ring-navi-success/25',
}

const textareaStyles =
  'block min-h-24 w-full resize-y border-0 bg-transparent text-sm text-navi-neutral placeholder:text-navi-neutral/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      id: idProp,
      variant: variantProp = 'default',
      label,
      helperText,
      errorMessage,
      autoResize = false,
      required,
      disabled,
      onChange,
      style,
      ...props
    },
    ref
  ) => {
    const genId = React.useId()
    const id = idProp ?? genId
    const variant = errorMessage ? 'error' : variantProp
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        innerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      },
      [ref]
    )

    const resize = React.useCallback(() => {
      const el = innerRef.current
      if (!el || !autoResize) return
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }, [autoResize])

    React.useLayoutEffect(() => {
      resize()
    }, [resize, props.value, props.defaultValue])

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
            disabled && 'pointer-events-none opacity-50',
            autoResize && '[&_textarea]:resize-none'
          )}
        >
          <textarea
            ref={setRefs}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={
              [helperText ? `${id}-helper` : '', errorMessage ? `${id}-error` : '']
                .filter(Boolean)
                .join(' ') || undefined
            }
            className={textareaStyles}
            onChange={(e) => {
              onChange?.(e)
              resize()
            }}
            style={style}
            {...props}
          />
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
Textarea.displayName = 'Textarea'

export { Textarea }
