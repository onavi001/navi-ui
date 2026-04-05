import * as React from 'react'
import { cn } from '@/utils/cn'

export type StepperOrientation = 'horizontal' | 'vertical'
export type StepperVariant = 'default' | 'circles' | 'numbers'
export type StepperStepState = 'completed' | 'current' | 'upcoming' | 'error'

export interface StepperStep {
  label: string
  description?: string
  icon?: React.ReactNode
  state?: StepperStepState
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  currentStep: number
  orientation?: StepperOrientation
  variant?: StepperVariant
}

const markerBaseStyles =
  'flex shrink-0 items-center justify-center border font-semibold transition-all duration-300 ease-out'

const markerVariantStyles: Record<StepperVariant, string> = {
  default: 'size-9 rounded-navi-md text-sm shadow-navi-sm',
  circles: 'size-10 rounded-full text-sm shadow-navi-sm',
  numbers: 'size-10 rounded-full text-sm tabular-nums',
}

const markerStateStyles: Record<StepperStepState, string> = {
  completed:
    'border-navi-primary bg-navi-primary text-navi-inverse shadow-navi-sm dark:border-navi-primary-light dark:bg-navi-primary-light dark:text-navi-neutral-950',
  current:
    'border-navi-primary bg-navi-surface text-navi-primary shadow-navi-md ring-2 ring-navi-primary/20 dark:border-navi-primary-light dark:bg-navi-surface-hover dark:text-navi-primary-light dark:ring-navi-primary-light/25',
  upcoming:
    'border-navi-border bg-navi-surface text-navi-neutral/60 dark:border-navi-border-dark dark:bg-navi-surface dark:text-navi-neutral/60',
  error:
    'border-navi-destructive bg-navi-destructive-subtle text-navi-destructive shadow-navi-sm dark:border-navi-destructive-light dark:bg-navi-destructive/15 dark:text-navi-destructive-light',
}

const labelStateStyles: Record<StepperStepState, string> = {
  completed: 'text-navi-ink',
  current: 'text-navi-primary dark:text-navi-primary-light',
  upcoming: 'text-navi-neutral/65 dark:text-navi-neutral/60',
  error: 'text-navi-destructive dark:text-navi-destructive-light',
}

const descriptionStateStyles: Record<StepperStepState, string> = {
  completed: 'text-navi-neutral/70 dark:text-navi-neutral/60',
  current: 'text-navi-neutral/75 dark:text-navi-neutral/65',
  upcoming: 'text-navi-neutral/60 dark:text-navi-neutral/55',
  error: 'text-navi-destructive/80 dark:text-navi-destructive-light/80',
}

const connectorStateStyles: Record<StepperStepState, string> = {
  completed: 'bg-navi-primary dark:bg-navi-primary-light',
  current: 'bg-navi-primary/30 dark:bg-navi-primary-light/30',
  upcoming: 'bg-navi-border dark:bg-navi-border-dark',
  error: 'bg-navi-destructive dark:bg-navi-destructive-light',
}

const clampStep = (value: number, total: number) => {
  if (total <= 0) {
    return 0
  }

  return Math.min(total, Math.max(1, value))
}

const getComputedState = (
  step: StepperStep,
  index: number,
  safeCurrentStep: number
): StepperStepState => {
  if (step.state) {
    return step.state
  }

  const stepNumber = index + 1

  if (stepNumber < safeCurrentStep) {
    return 'completed'
  }

  if (stepNumber === safeCurrentStep) {
    return 'current'
  }

  return 'upcoming'
}

const CheckIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="m5 13 4 4L19 7" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ErrorIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
    <path d="M12 8v5" strokeWidth={2.25} strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    <path
      d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const getMarkerContent = (
  step: StepperStep,
  state: StepperStepState,
  variant: StepperVariant,
  stepNumber: number
) => {
  if (state === 'completed') {
    return <CheckIcon />
  }

  if (state === 'error') {
    return <ErrorIcon />
  }

  if (variant !== 'numbers' && step.icon) {
    return <span className="flex items-center justify-center">{step.icon}</span>
  }

  if (variant === 'default' && !step.icon && state === 'upcoming') {
    return <span className="size-2 rounded-full bg-current" aria-hidden />
  }

  return stepNumber
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      currentStep,
      orientation = 'horizontal',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const safeCurrentStep = clampStep(currentStep, steps.length)

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        aria-orientation={orientation}
        {...props}
      >
        <ol
          className={cn(
            orientation === 'horizontal'
              ? 'flex w-full gap-0'
              : 'flex w-full flex-col gap-0'
          )}
        >
          {steps.map((step, index) => {
            const state = getComputedState(step, index, safeCurrentStep)
            const markerContent = getMarkerContent(step, state, variant, index + 1)
            const isLast = index === steps.length - 1

            if (orientation === 'vertical') {
              return (
                <li
                  key={`${step.label}-${index}`}
                  className="flex gap-3"
                  aria-current={state === 'current' ? 'step' : undefined}
                  data-state={state}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        markerBaseStyles,
                        markerVariantStyles[variant],
                        markerStateStyles[state],
                        state === 'current' && 'scale-[1.03]'
                      )}
                    >
                      {markerContent}
                    </div>
                    {!isLast ? (
                      <div
                        aria-hidden
                        className={cn(
                          'my-2 w-px flex-1 rounded-full transition-colors duration-300',
                          connectorStateStyles[state],
                          state === 'upcoming' ? 'min-h-10' : 'min-h-12'
                        )}
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1 pb-6 pt-1 last:pb-0">
                    <div className={cn('text-sm font-semibold transition-colors duration-300', labelStateStyles[state])}>
                      {step.label}
                    </div>
                    {step.description ? (
                      <p
                        className={cn(
                          'mt-1 text-sm leading-6 transition-colors duration-300',
                          descriptionStateStyles[state]
                        )}
                      >
                        {step.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              )
            }

            return (
              <li
                key={`${step.label}-${index}`}
                className="min-w-0 flex-1"
                aria-current={state === 'current' ? 'step' : undefined}
                data-state={state}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      markerBaseStyles,
                      markerVariantStyles[variant],
                      markerStateStyles[state],
                      state === 'current' && 'scale-[1.03]'
                    )}
                  >
                    {markerContent}
                  </div>

                  {!isLast ? (
                    <div
                      aria-hidden
                      className={cn(
                        'h-px flex-1 rounded-full transition-colors duration-300',
                        connectorStateStyles[state]
                      )}
                    />
                  ) : null}
                </div>

                <div className="pr-3 pt-3">
                  <div className={cn('text-sm font-semibold transition-colors duration-300', labelStateStyles[state])}>
                    {step.label}
                  </div>
                  {step.description ? (
                    <p
                      className={cn(
                        'mt-1 text-sm leading-6 transition-colors duration-300',
                        descriptionStateStyles[state]
                      )}
                    >
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
)
Stepper.displayName = 'Stepper'

export { Stepper }