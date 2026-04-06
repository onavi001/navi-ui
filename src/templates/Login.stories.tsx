import type { Meta, StoryObj } from '@storybook/react-vite'
import { Login } from './Login'

const meta: Meta<typeof Login> = {
  title: 'Templates/Login',
  component: Login,
  tags: ['autodocs'],
  args: {
    appName: 'Navi UI',
    appTagline: 'Build beautiful products faster',
  },
  argTypes: {
    appName: { control: 'text' },
    appTagline: { control: 'text' },
    onFormSubmit: { action: 'submit' },
    onForgotPasswordClick: { action: 'forgot-password' },
    onSignUpClick: { action: 'sign-up' },
    onOAuthSignIn: { action: 'oauth' },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Login>

export const Default: Story = {}

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-navi-neutral-950">
        <Story />
      </div>
    ),
  ],
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
