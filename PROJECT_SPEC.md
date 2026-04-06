# Navi-UI - Project Specification

Nombre del proyecto: Navi-UI  
Paquete npm: @onavi001/react  
Descripcion: Libreria de componentes React enterprise-grade con accesibilidad, theming y tipado estricto.

## Objetivo

Navi-UI busca proveer componentes listos para produccion con:

- Accesibilidad WCAG 2.2 AA
- TypeScript 5.8 strict con cero any
- Dark mode automatico con CSS variables
- API consistente basada en React.forwardRef
- Storybook como documentacion viva

## Stack Tecnico (2026)

- React 19
- TypeScript 5.8+
- Vite 6+
- Tailwind CSS v4
- Storybook 8.5+
- Radix UI
- TanStack Table v8
- Vitest + React Testing Library

## Reglas de Implementacion

- Nunca usar any en TypeScript.
- Nunca usar estilos inline.
- Nunca usar className sin pasar por cn() de @/utils/cn.
- Nunca export default en componentes.
- Siempre usar React.forwardRef.
- Siempre definir displayName despues de forwardRef.
- Siempre extender props desde el elemento HTML nativo correspondiente.

## Estructura del Proyecto

```
src/
  components/
    primitives/
    layout/
    forms/
    feedback/
    navigation/
    data-display/
    advanced/
    theme/
  hooks/
  tokens/
  utils/
  index.ts
```

## Fases de Entrega

### Fase 1 - Foundation

- Primitives: Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, IconButton, Badge, Spinner
- Layout: Card, Flex, Grid, Stack, Separator
- Feedback: Alert, Toast, Tooltip
- Theme: ThemeSwitcher

### Fase 2 - Expanded UI

- Data Display: Avatar, AvatarGroup, DataTable
- Forms: FormField, Select, Combobox, DatePicker
- Navigation: Tabs, DropdownMenu, Breadcrumb, Pagination, Sidebar

### Fase 3 - Advanced

- Progress
- Skeleton
- Accordion
- Dialog
- Drawer
- Command
- Stepper

## Estado Actual

- Componentes implementados: 38+
- Storybook stories por componente: habilitado
- Export central desde src/index.ts: habilitado

## DataTable - Especificacion

Ubicacion:

- src/components/data-display/DataTable.tsx
- src/components/data-display/DataTable.stories.tsx

Tecnologia:

- @tanstack/react-table v8

Props principales:

- data: TData[]
- columns: ColumnDef<TData>[]
- pagination?: boolean (default true)
- pageSize?: number (default 10)
- sorting?: boolean (default true)
- filtering?: boolean (default true)
- selection?: boolean (default false)
- loading?: boolean
- emptyMessage?: string (default "No results found")
- onRowClick?: (row: TData) => void
- caption?: string
- stickyHeader?: boolean
- exportCSV?: boolean
- resizableColumns?: boolean

Features requeridas:

- Sorting por columna
- Filtro global
- Paginacion con componente Pagination
- Seleccion por checkbox
- Loading state con Skeleton
- Empty state centrado
- Sticky header opcional
- Export CSV opcional

Accesibilidad:

- role="table"
- aria-sort en headers ordenables
- aria-label en checkboxes de seleccion
- caption asociado via aria-describedby

Tipos exportados:

- DataTableProps<TData>
- DataTableColumn<TData>

## Criterios de Calidad

- Compila sin errores de TypeScript.
- Build de libreria exitoso con npm run build.
- Sin regresiones en componentes existentes.
- Storybook renderiza estados clave por componente.

## Storybook Minimo por Componente

- Default
- Variantes principales
- Loading (si aplica)
- Disabled (si aplica)
- Empty/Error (si aplica)

Para DataTable especificamente:

- Default
- WithSelection
- WithLoading
- WithEmpty
- FullFeatured (50+ registros)

## Publicacion y Versionado

- Commits en formato Conventional Commits.
- Exportes centralizados en barrels por categoria.
- Exportes de libreria desde src/index.ts.

## Instruccion para Cursor/Copilot

Al generar nuevos componentes, seguir estrictamente este archivo y .github/copilot-instructions.md.

Orden recomendado:

1. Crear componente en su categoria.
2. Crear stories.
3. Actualizar index.ts de categoria.
4. Actualizar src/index.ts cuando aplique.
5. Ejecutar validacion de errores.
6. Ejecutar npm run build.
