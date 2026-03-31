import * as React from 'react'
import { cn } from '@/utils/cn'
import { useTheme } from '@/hooks/useTheme'

export interface ThemeSwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean
}

const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
  ({ className, showLabel = true, ...props }, ref) => {
    const { theme, toggleTheme } = useTheme()

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        aria-label={`Cambiar a ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Cambiar a ${theme === 'light' ? 'oscuro' : 'claro'}`}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-navi-md px-3 py-2',
          'transition-all duration-200',
          'bg-navi-primary/10 hover:bg-navi-primary/15 active:bg-navi-primary/20',
          'text-navi-primary dark:text-navi-primary-light',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary/50 focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {theme === 'light' ? (
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
        {showLabel && <span className="text-sm font-medium">{theme === 'light' ? 'Oscuro' : 'Claro'}</span>}
      </button>
    )
  }
)
ThemeSwitcher.displayName = 'ThemeSwitcher'

export { ThemeSwitcher }
