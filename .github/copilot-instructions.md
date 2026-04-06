# Navi-UI — GitHub Copilot Instructions

## Proyecto
Navi-UI es una librería de componentes React enterprise-grade.
Paquete: @onavi001/react
Stack: React 19 + TypeScript 5.8 strict + Tailwind v4 + Radix UI + Vite 6

## Reglas absolutas
- NUNCA uses `any` en TypeScript
- NUNCA uses estilos inline
- NUNCA uses `className` sin pasar por `cn()` de `@/utils/cn`
- NUNCA uses `export default` en componentes — siempre exportar nombrado
- SIEMPRE usa `React.forwardRef` en componentes
- SIEMPRE asigna `displayName` después de `forwardRef`
- SIEMPRE extiende props desde el elemento HTML nativo correspondiente

## Estructura de un componente
Ubicación: src/components/{categoria}/{Nombre}.tsx
Story:      src/components/{categoria}/{Nombre}.stories.tsx
Export:     src/components/{categoria}/index.ts

## Categorías válidas
- primitives/   → Button, Input, Label, Badge, Spinner
- layout/       → Card, Flex, Grid, Stack, Separator
- forms/        → FormField, Select, Combobox, DatePicker
- feedback/     → Alert, Toast, Modal, Tooltip
- navigation/   → Tabs, DropdownMenu, Breadcrumb, Pagination, Sidebar
- data-display/ → Avatar, DataTable, Progress
- advanced/     → Command, Accordion, Stepper, Calendar, Drawer

## Plantilla base de componente
```tsx
import * as React from 'react'
import { cn } from '@/utils/cn'

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default'
}

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      />
    )
  }
)
ComponentName.displayName = 'ComponentName'

export { ComponentName }
```

## Tailwind v4 — clases de Navi-UI disponibles
Colores primarios:  bg-navi-primary-{50-900}, text-navi-primary-{50-900}
Colores neutros:    bg-navi-neutral-{50-950}, text-navi-neutral-{50-950}
Feedback:           bg-navi-success, bg-navi-warning, bg-navi-destructive, bg-navi-info
Variantes sutiles:  bg-navi-success-subtle, bg-navi-warning-subtle, bg-navi-destructive-subtle
Superficies:        bg-navi-surface, bg-navi-surface-raised
Texto:              text-navi-ink, text-navi-ink-muted, text-navi-ink-subtle
Bordes:             border-navi-border, border-navi-border-strong
Radius:             rounded-navi-sm, rounded-navi-md, rounded-navi-lg, rounded-navi-xl, rounded-navi-full
Sombras:            shadow-navi-sm, shadow-navi-md, shadow-navi-lg

## Design tokens
Importar desde: @/tokens/design-tokens
CSS Variables definidas en: src/index.css bajo @theme {}

## Accesibilidad — obligatorio en cada componente
- role y aria-* correctos según el elemento
- Soporte completo de teclado
- Estados focus visibles (focus-visible:ring-2)
- aria-busy cuando loading=true
- aria-disabled cuando disabled=true
- Contraste WCAG 2.2 AA en todos los estados

## Testing
Framework: Vitest + React Testing Library
- Testear comportamiento, NO estilos
- Usar screen.getByRole() como primera opción
- Usar userEvent para interacciones
- Cubrir: render, variantes, estados, atributos ARIA

## Storybook 8.5
- Archivo: {Nombre}.stories.tsx
- Siempre incluir tags: ['autodocs']
- argTypes para TODOS los props
- Stories requeridas: Default, AllVariants, Loading, Disabled

## Commits
Formato Conventional Commits:
- feat: nuevo componente o feature
- fix: corrección de bug
- docs: cambios en documentación
- style: cambios de formato sin lógica
- refactor: refactoring sin cambio de comportamiento
- test: agregar o modificar tests
- chore: tareas de mantenimiento