import { useState } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Hook para manejar el tema (light/dark mode)
 * Detecta automáticamente la preferencia del sistema
 * y persiste la selección del usuario en localStorage
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Inicialización lazily
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
