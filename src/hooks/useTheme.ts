import { useState } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Hook to handle theme (light/dark mode)
 * Automatically detects system preference
 * and persists user selection in localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Lazy initialization
    if (typeof window === 'undefined') return 'light'
    const htmlElement = document.documentElement
    return htmlElement.className === 'dark' ? 'dark' : 'light'
  })

  const switchTheme = (newTheme: Theme) => {
    const htmlElement = document.documentElement
    htmlElement.className = newTheme
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    switchTheme(theme === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    switchTheme,
    toggleTheme,
  }
}
