import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/primitives/Button'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'bordered', 'elevated'] },
    className: { control: 'text' },
    children: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <Card.Header>
        <Card.Title>Title</Card.Title>
        <Card.Description>Brief description of the card block.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-navi-neutral/90">Contenido principal.</p>
      </Card.Content>
      <Card.Footer>
        <Button size="sm">Action</Button>
      </Card.Footer>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 md:flex-row md:flex-wrap">
      <Card variant="default" className="max-w-xs flex-1">
        <Card.Header>
          <Card.Title>Default</Card.Title>
          <Card.Description>Sin borde ni sombra.</Card.Description>
        </Card.Header>
        <Card.Content className="text-sm">Contenido.</Card.Content>
      </Card>
      <Card variant="bordered" className="max-w-xs flex-1">
        <Card.Header>
          <Card.Title>Bordered</Card.Title>
          <Card.Description>Borde sutil.</Card.Description>
        </Card.Header>
        <Card.Content className="text-sm">Contenido.</Card.Content>
      </Card>
      <Card variant="elevated" className="max-w-xs flex-1">
        <Card.Header>
          <Card.Title>Elevated</Card.Title>
          <Card.Description>Sombra suave.</Card.Description>
        </Card.Header>
        <Card.Content className="text-sm">Contenido.</Card.Content>
      </Card>
    </div>
  ),
}

export const LoadingDisabled: Story = {
  name: 'FooterActions',
  render: () => (
    <Card className="max-w-md">
      <Card.Header>
        <Card.Title>Confirmation</Card.Title>
      </Card.Header>
      <Card.Footer className="gap-2">
        <Button variant="outline" size="sm" disabled>
          Cancelar
        </Button>
        <Button size="sm" loading>
          Guardar
        </Button>
      </Card.Footer>
    </Card>
  ),
}

export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (StoryEl) => (
      <div className="dark rounded-navi-md bg-neutral-900 p-8">
        <StoryEl />
      </div>
    ),
  ],
  render: () => (
    <Card variant="bordered" className="max-w-md">
      <Card.Header>
        <Card.Title>Tarjeta oscura</Card.Title>
        <Card.Description>Theme variables.</Card.Description>
      </Card.Header>
      <Card.Content className="text-sm text-navi-neutral/90">Contenido.</Card.Content>
    </Card>
  ),
}
