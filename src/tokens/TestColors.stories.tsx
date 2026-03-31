import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives'
import { ThemeSwitcher } from '@/components/primitives'

const meta: Meta = {
  title: 'Tokens/Test Colors',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const semanticColors = [
  { name: 'Primary', class: 'bg-navi-primary' },
  { name: 'Success', class: 'bg-navi-success' },
  { name: 'Warning', class: 'bg-navi-warning' },
  { name: 'Destructive', class: 'bg-navi-destructive' },
  { name: 'Info', class: 'bg-navi-info' },
  { name: 'Neutral', class: 'bg-navi-neutral' },
] as const

const tailwindClasses = [
  { name: 'Primary Light', class: 'bg-navi-primary-light' },
  { name: 'Primary Dark', class: 'bg-navi-primary-dark' },
  { name: 'Success Light', class: 'bg-navi-success-light' },
  { name: 'Warning Light', class: 'bg-navi-warning-light' },
  { name: 'Destructive Dark', class: 'bg-navi-destructive-dark' },
  { name: 'Destructive Light', class: 'bg-navi-destructive-light' },
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

        {/* Semantic Colors from design-tokens */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-navi-ink">
            Semantic Colors (Design Tokens)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {semanticColors.map(({ name, class: className }) => (
              <div
                key={className}
                className={`p-4 ${className} text-navi-inverse rounded-navi-md font-semibold`}
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
            Components in Action
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
