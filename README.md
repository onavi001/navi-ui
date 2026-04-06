# Navi-UI

<div align="center">

```
███╗   ██╗ █████╗ ██╗   ██╗██╗      ██╗   ██╗██╗
████╗  ██║██╔══██╗██║   ██║██║      ██║   ██║██║
██╔██╗ ██║███████║██║   ██║██║█████╗██║   ██║██║
██║╚██╗██║██╔══██║╚██╗ ██╔╝██║╚════╝██║   ██║██║
██║ ╚████║██║  ██║ ╚████╔╝ ██║      ╚██████╔╝██║
╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ╚═╝       ╚═════╝ ╚═╝
```

**Enterprise-grade accessible React components**  
_Built with React 19, TypeScript strict, Tailwind v4, and Radix UI primitives_

<br/>

[![npm version](https://img.shields.io/npm/v/@navi-ui/react?style=flat-square&color=0ea5e9&label=npm)](https://www.npmjs.com/package/@navi-ui/react)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](./LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-8.5-ff4785?style=flat-square&logo=storybook&logoColor=white)](http://localhost:6006)
[![a11y](https://img.shields.io/badge/WCAG-2.2%20AA-16a34a?style=flat-square)](https://www.w3.org/WAI/WCAG22/quickref/)

<br/>

[**GitHub**](https://github.com/onavi001/navi-ui) · [**npm**](https://www.npmjs.com/package/@navi-ui/react)

</div>

---

## What is Navi-UI?

A production-ready component library built for teams who care about:

- ✅ **Accessibility** — WCAG 2.2 AA compliant, full keyboard navigation, screen reader support
- ✅ **Type Safety** — 100% TypeScript strict mode, zero `any` types
- ✅ **Performance** — ~35.86 KB CSS (gzip), tree-shakeable, minimal dependencies
- ✅ **Developer Experience** — Storybook documentation, dark mode built-in, CSS variables theming
- ✅ **Global Ready** — Fully internationalized (English ready, Spanish coming)

```
┌─────────────────────────────────────────────────────────────────┐
│  38+ components  ·  React 19  ·  WCAG 2.2 AA  ·  CSS Variables  │
│  Dark mode automatic  ·  Tailwind v4  ·  Radix UI primitives    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Installation

```bash
# Install the package
npm install @navi-ui/react

# Tailwind CSS is a required peer dependency
npm install -D tailwindcss@^4
```

**Peer dependencies:** `react >= 19`, `tailwindcss >= 4`

---

## Quick Start

```tsx
import { Button, Card, Badge } from "@navi-ui/react";

export default function Example() {
  return (
    <Card>
      <Card.Header>
        <Badge variant="success">New</Badge>
        <Card.Title>Welcome to Navi-UI</Card.Title>
      </Card.Header>
      <Card.Content>
        <p>Production-ready components in seconds.</p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary">Get Started</Button>
      </Card.Footer>
    </Card>
  );
}
```

---

## Components (38)

## Delivery Phases

### Phase 1 (Foundation)

- **Primitives:** Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, IconButton, Badge, Spinner
- **Layout:** Card, Flex, Grid, Stack, Separator
- **Feedback:** Alert, Toast, Tooltip
- **Theme:** ThemeSwitcher

### Phase 2 (Expanded UI)

- **Data Display:** Avatar, AvatarGroup, DataTable
- **Forms:** FormField, Select, Combobox, DatePicker
- **Navigation:** Tabs, DropdownMenu, Breadcrumb, Pagination, Sidebar

### Phase 3 (Advanced)

- **Advanced:** Progress, Skeleton, Accordion, Dialog, Drawer, Command, Stepper

### Primitives (10)

Form controls and basic building blocks

| Component      | Features                                                               | Status |
| -------------- | ---------------------------------------------------------------------- | ------ |
| **Button**     | 5 variants (primary, secondary, ghost, destructive, outline) + loading | ✅     |
| **Input**      | Error/success variants, helper text, left/right addons                 | ✅     |
| **Label**      | Associated with form controls, required marker                         | ✅     |
| **Textarea**   | Auto-resize option, variants, helper text                              | ✅     |
| **Checkbox**   | Indeterminate state, error handling, accessible                        | ✅     |
| **RadioGroup** | Grouped radios with Radix UI, vertical/horizontal                      | ✅     |
| **Switch**     | Toggle with 3 size variants (sm, md, lg)                               | ✅     |
| **IconButton** | Icon-only button with required aria-label                              | ✅     |
| **Badge**      | 6 variants (default, success, warning, destructive, info, outline)     | ✅     |
| **Spinner**    | Loading indicator, 3 sizes                                             | ✅     |

### Layout (5)

Structural and composition components

| Component     | Features                                               | Status |
| ------------- | ------------------------------------------------------ | ------ |
| **Card**      | Composable (Header/Content/Footer/Title/Description)   | ✅     |
| **Flex**      | Flexbox utility (direction, align, justify, wrap, gap) | ✅     |
| **Grid**      | CSS Grid utility (auto columns, flow)                  | ✅     |
| **Stack**     | Stack (vertical/horizontal with gap)                   | ✅     |
| **Separator** | Semantic divider (horizontal/vertical)                 | ✅     |

### Feedback (3)

User notifications and feedback

| Component   | Features                                                      | Status |
| ----------- | ------------------------------------------------------------- | ------ |
| **Alert**   | 4 variants (info, success, warning, destructive), dismissible | ✅     |
| **Toast**   | Toast notifications powered by sonner                         | ✅     |
| **Tooltip** | Hover/focus triggered tooltips                                | ✅     |

### Theme (1)

Theme management and appearance

| Component         | Features                                   | Status |
| ----------------- | ------------------------------------------ | ------ |
| **ThemeSwitcher** | Light/dark mode toggle with auto-detection | ✅     |

### Data Display (3)

Data visualization and tabular presentation

| Component       | Features                                                                        | Status |
| --------------- | ------------------------------------------------------------------------------- | ------ |
| **Avatar**      | Image/fallback avatar, size/shape/status variants                               | ✅     |
| **AvatarGroup** | Grouped avatars with overlap and overflow (`+N`)                                | ✅     |
| **DataTable**   | TanStack Table v8, sorting, filtering, pagination, selection, CSV export, sticky header | ✅     |

### Advanced (7)

Interaction patterns and complex flows

| Component     | Features                                                     | Status |
| ------------- | ------------------------------------------------------------ | ------ |
| **Progress**  | Determinate/indeterminate, variants, labels                 | ✅     |
| **Skeleton**  | Loading placeholders with multiple variants                 | ✅     |
| **Accordion** | Single/multiple mode, variants, animated content            | ✅     |
| **Dialog**    | Accessible modal primitives with composable API             | ✅     |
| **Drawer**    | Side panel overlays with direction and size variants        | ✅     |
| **Command**   | Command palette / searchable action list with keyboard flow | ✅     |
| **Stepper**   | Multi-step indicator, orientation + variants + step states  | ✅     |

---

## Design System

### Color Palette with CSS Variables

Navi-UI uses **CSS Variables + Tailwind v4** for a theming system that's both powerful and simple:

```css
/* Light mode (default) */
:root {
  --navi-color-primary: 79 70 229; /* indigo */
  --navi-color-success: 34 197 94; /* green */
  --navi-color-warning: 234 179 8; /* amber */
  --navi-color-destructive: 239 68 68; /* red */
  --navi-color-neutral: 113 113 122; /* zinc */
  /* ... more colors ... */
}

/* Dark mode auto-switches these variables */
.dark {
  --navi-color-primary: 129 140 248;
  --navi-color-success: 74 222 128;
  /* ... and so on ... */
}
```

### Using Colors in Components

```tsx
// Use semantic color classes
<Button className="bg-navi-primary text-navi-inverse">
  Save
</Button>

// Opacity variants work automatically
<div className="bg-navi-primary/10">Subtle background</div>

// Dark mode is automatic
<div className="dark:bg-navi-surface-hover">
  Adapts to dark theme
</div>
```

### Available Color Classes

- **Primary colors:** `bg-navi-primary`, `text-navi-primary`, `border-navi-primary`
- **Semantic colors:** success, warning, destructive, info
- **Neutral shades:** neutral, neutral-light, neutral-dark
- **Surface colors:** surface, surface-hover, surface-active
- **Opacity variants:** `/5`, `/10`, `/15`, `/20`, `/25`, `/30`, `/40`, `/50`, `/60`, `/70`, `/80`
- **Dark mode:** Automatic via `.dark` class

---

## Accessibility (WCAG 2.2 AA)

Every component includes:

- ✅ Correct semantic HTML and ARIA attributes
- ✅ Full keyboard navigation support
- ✅ Focus visible indicators (`focus-visible:ring-2`)
- ✅ Screen reader announcements for dynamic content
- ✅ `aria-busy` for loading states
- ✅ `aria-disabled` for disabled states
- ✅ Contrast ratios meeting WCAG AA standards
- ✅ Respects `prefers-reduced-motion`

```tsx
// Accessibility is built-in, not an afterthought
<Button loading aria-label="Saving changes...">
  Save
</Button>
// Automatically includes:
// - role="button"
// - aria-busy="true"
// - aria-disabled="true"
// - Focus management
```

---

## Dark Mode

Dark mode is **automatic**. No configuration needed.

```tsx
// The ThemeProvider handles everything
import { ThemeProvider } from "@navi-ui/react";

export default function App() {
  return (
    <ThemeProvider>
      {/* Automatically detects system preference (prefers-color-scheme) */}
      {/* And respects user's manual theme selection */}
      <YourApp />
    </ThemeProvider>
  );
}
```

All colors automatically switch when user prefers dark mode or when `.dark` class is added to `<html>`.

---

## TypeScript

100% typed with TypeScript 5.8 strict mode:

```tsx
import { Button, ButtonProps } from "@navi-ui/react";

// Intellisense for all props
<Button
  variant="primary" // ✅ 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size="md" // ✅ 'sm' | 'md' | 'lg'
  loading={true} // ✅ boolean
  onClick={handleClick} // ✅ () => void
>
  Click me
</Button>;
```

---

## Tech Stack

| Technology   | Version    | Why                                      |
| ------------ | ---------- | ---------------------------------------- |
| React        | 19         | Latest features, concurrent rendering    |
| TypeScript   | 5.8 strict | Type safety, `satisfies`, advanced types |
| Vite         | 6.x        | Ultra-fast builds for libraries          |
| Tailwind CSS | 4.x        | CSS variables + utilities, no overhead   |
| Radix UI     | Latest     | Headless, accessible primitives          |
| Storybook    | 8.5+       | Component documentation & visual testing |
| Vitest       | Latest     | Fast, modern testing framework           |

**Zero additional runtime dependencies** (beyond React and Tailwind).

---

## Project Structure

```
navi-ui/
├── src/
│   ├── components/
│   │   ├── primitives/      # Button, Input, Label, Badge, Spinner…
│   │   ├── layout/          # Card, Flex, Grid, Stack, Separator
│   │   ├── feedback/        # Alert, Toast, Tooltip
│   │   ├── data-display/    # Avatar, AvatarGroup
│   │   ├── forms/           # FormField, Select, Combobox, DatePicker
│   │   ├── navigation/      # Tabs, DropdownMenu, Breadcrumb, Pagination, Sidebar
│   │   ├── advanced/        # Progress, Skeleton, Accordion, Dialog, Drawer, Command, Stepper
│   │   ├── theme/           # ThemeSwitcher
│   │   └── index.ts         # Barrel exports
│   ├── hooks/               # useToast, useTheme, etc.
│   ├── tokens/              # Design tokens, color definitions
│   ├── theme/               # ThemeProvider, CSS variables
│   ├── utils/               # cn() helper for class composition
│   ├── index.css            # Global styles + Tailwind directives
│   └── index.ts             # Package exports
├── .storybook/              # Storybook configuration
├── vitest.config.ts         # Test configuration
├── tailwind.config.ts       # Tailwind theme + custom plugins
├── tsconfig.json            # TypeScript strict mode
└── package.json
```

---

## Contributing

We welcome contributions! Here's how to get started:

```bash
# 1. Clone the repository
git clone https://github.com/onavi001/navi-ui.git
cd navi-ui

# 2. Install dependencies
npm install

# 3. Start Storybook for development
npm run storybook

# 4. Create a branch for your changes
git checkout -b feat/my-component

# 5. Develop your component
# src/components/category/MyComponent.tsx
# src/components/category/MyComponent.stories.tsx

# 6. Run tests and type checking
npm run test
npm run typecheck

# 7. Submit a Pull Request
```

**PR Checklist:**

- [ ] Component is 100% TypeScript typed
- [ ] Storybook stories cover all states
- [ ] Tests pass (85%+ coverage)
- [ ] Accessible (keyboard, ARIA, contrast)
- [ ] Dark mode works
- [ ] JSDoc comments for public APIs

---

## License

MIT © 2026 Oscar Iván

You're free to use, modify, and distribute this library. A ⭐ on the repo is appreciated!

---

<div align="center">

**Built with ☕ and strict TypeScript — for developers who care about quality.**

[GitHub](https://github.com/onavi001/navi-ui) · [npm](https://www.npmjs.com/package/@navi-ui/react) · [Storybook](http://localhost:6006)

</div>
