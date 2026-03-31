import * as React from 'react'
import { cn } from '@/utils/cn'

/** Valores permitidos para `flex-direction`. */
export type FlexDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'

/** Valores permitidos para `align-items`. */
export type FlexAlign =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'start'
  | 'end'

/** Allowed values for `justify-content`. */
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'

/** Allowed values for `flex-wrap`. */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/** Uniform spacing between items (mapped to Tailwind's `gap`). */
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection
  align?: FlexAlign
  justify?: FlexJustify
  wrap?: FlexWrap
  gap?: FlexGap
}

const directionClass: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}

const alignClass: Record<FlexAlign, string> = {
  stretch: 'items-stretch',
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  start: 'items-start',
  end: 'items-end',
}

const justifyClass: Record<FlexJustify, string> = {
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
  start: 'justify-start',
  end: 'justify-end',
}

const wrapClass: Record<FlexWrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

const gapClass: Record<FlexGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = 'row',
      align = 'stretch',
      justify = 'flex-start',
      wrap = 'nowrap',
      gap = 'none',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        directionClass[direction],
        alignClass[align],
        justifyClass[justify],
        wrapClass[wrap],
        gapClass[gap],
        className
      )}
      {...props}
    />
  )
)
Flex.displayName = 'Flex'

export { Flex }
