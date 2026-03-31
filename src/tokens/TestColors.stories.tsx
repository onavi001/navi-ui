import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives'
import { ThemeSwitcher } from '@/components/primitives'
import { tokens } from './design-tokens'

const meta: Meta = {
  title: 'Tokens/Test Colors',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const semanticColors = [
  { name: 'Primary', key: 'primary' },
  { name: 'Success', key: 'success' },
  { name: 'Warning', key: 'warning' },
  { name: 'Destructive', key: 'destructive' },
  { name: 'Info', key: 'info' },
  { name: 'Neutral', key: 'neutral' },
] as const

const tailwindClasses = [
  { name: 'Primary', class: 'bg-navi-primary' },
  { name: 'Success', class: 'bg-navi-success' },
  { name: 'Warning', class: 'bg-navi-warning' },
  { name: 'Destructive', class: 'bg-navi-destructive' },
  { name: 'Info', class: 'bg-navi-info' },
  { name: 'Neutral', class: 'bg-navi-neutral' },
] as const

export const AllColors: Story = {
  render: () => (
    <div className="min-h-screen bg-navi-surface p-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-navi-ink">
            Test de Colores Navi-UI
          </h1>
          <ThemeSwitcher showLabel={true} />
        </div>

        {/* Colores Semánticos desde design-tokens */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-navi-ink">
            Colores Semánticos (Design Tokens)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {semanticColors.map(({ name, key }) => (
              <div
                key={key}
                style={{ 
                  backgroundColor: tokens.colors[key as keyof typeof tokens.colors],
                  color: 'rgb(var(--navi-color-inverse))'
                }}
                className="p-4 rounded-navi-md font-semibold"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        {/* Test con Tailwind Classes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-navi-ink">
            Colores con Tailwind Classes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tailwindClasses.map(({ class: className }) => (
              <div
                key={className}
                className={`p-4 ${className} text-navi-inverse rounded-navi-md font-semibold`}
              >
                {className}
              </div>
            ))}
          </div>
        </section>

        {/* Componentes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-navi-ink">
            Componentes en Acción
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>
      </div>
    </div>
  ),
}
