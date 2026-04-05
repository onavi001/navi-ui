import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../primitives/Button'
import { Stepper } from './Stepper'

const steps = [
  {
    label: 'Workspace',
    description: 'Set up the base configuration for your team workspace.',
  },
  {
    label: 'Members',
    description: 'Invite teammates and assign their initial roles.',
  },
  {
    label: 'Permissions',
    description: 'Review permissions before publishing the environment.',
  },
  {
    label: 'Launch',
    description: 'Complete the flow and activate the workspace.',
  },
] satisfies React.ComponentProps<typeof Stepper>['steps']

const iconSteps = [
  {
    label: 'Details',
    description: 'Capture the basic information for the rollout.',
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="M8 7h8M8 12h8M8 17h5" strokeWidth={2} strokeLinecap="round" />
        <path d="M5 7h.01M5 12h.01M5 17h.01" strokeWidth={3} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Review',
    description: 'Validate content, owners and launch criteria.',
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="m9 12 2 2 4-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="8" strokeWidth={2} />
      </svg>
    ),
  },
  {
    label: 'Publish',
    description: 'Release the new experience to production.',
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
        <path d="M12 4v10" strokeWidth={2} strokeLinecap="round" />
        <path d="m8 8 4-4 4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 20h14" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
  },
] satisfies React.ComponentProps<typeof Stepper>['steps']

const meta: Meta<typeof Stepper> = {
  title: 'Advanced/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    steps,
    currentStep: 2,
    orientation: 'horizontal',
    variant: 'default',
  },
  argTypes: {
    steps: { control: false },
    currentStep: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'circles', 'numbers'],
    },
    className: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Stepper>

export const Default: Story = {}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'circles',
    currentStep: 3,
  },
}

export const WithDescription: Story = {
  args: {
    steps,
    variant: 'default',
    currentStep: 2,
  },
}

export const WithError: Story = {
  args: {
    steps: [
      steps[0],
      { ...steps[1], state: 'completed' },
      {
        ...steps[2],
        state: 'error',
        description: 'A policy conflict needs attention before continuing.',
      },
      { ...steps[3], state: 'upcoming' },
    ],
    currentStep: 3,
    variant: 'numbers',
  },
}

export const Interactive: Story = {
  render: () => {
    const InteractiveStepper = () => {
      const [currentStep, setCurrentStep] = React.useState(1)

      return (
        <div className="space-y-5">
          <Stepper steps={iconSteps} currentStep={currentStep} variant="circles" />

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            <Button
              onClick={() => setCurrentStep((step) => Math.min(iconSteps.length, step + 1))}
              disabled={currentStep === iconSteps.length}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )
    }

    return <InteractiveStepper />
  },
}