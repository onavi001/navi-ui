import * as React from 'react'
import { cn } from '@/utils/cn'

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type GridRows = 1 | 2 | 3 | 4 | 5 | 6

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  colsSm?: GridCols
  colsMd?: GridCols
  colsLg?: GridCols
  gap?: GridGap
  rows?: GridRows
}

const gapClass: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
}

const colsToClass: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

const rowsToClass: Record<GridRows, string> = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 1,
      colsSm,
      colsMd,
      colsLg,
      gap = 'md',
      rows,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'grid',
        colsToClass[cols],
        colsSm != null && `sm:${colsToClass[colsSm]}`,
        colsMd != null && `md:${colsToClass[colsMd]}`,
        colsLg != null && `lg:${colsToClass[colsLg]}`,
        rows != null && rowsToClass[rows],
        gapClass[gap],
        className
      )}
      {...props}
    />
  )
)
Grid.displayName = 'Grid'

export { Grid }
