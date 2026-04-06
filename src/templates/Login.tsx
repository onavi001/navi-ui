import * as React from 'react'
import { Alert } from '@/components/feedback'
import { Card, Grid, Separator } from '@/components/layout'
import { FormField } from '@/components/forms'
import { Button, Checkbox, Input } from '@/components/primitives'
import { cn } from '@/utils/cn'

export interface LoginFormValues {
  email: string
  password: string
  rememberMe: boolean
}

export type OAuthProvider = 'google' | 'github'

export interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {
  appName?: string
  appTagline?: string
  onFormSubmit?: (values: LoginFormValues) => void | Promise<void>
  onForgotPasswordClick?: () => void
  onSignUpClick?: () => void
  onOAuthSignIn?: (provider: OAuthProvider) => void
  loadingText?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4">
    <path
      fill="#EA4335"
      d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.4l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.2-3.9 9.2-9.3 0-.6-.1-1.1-.2-1.5H12Z"
    />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12.2c0 5.2 3.4 9.6 8 11.2.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6a11.5 11.5 0 0 0 8-11.2A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

const Login = React.forwardRef<HTMLDivElement, LoginProps>(
  (
    {
      className,
      appName = 'Navi UI',
      appTagline = 'Build beautiful products faster',
      onFormSubmit,
      onForgotPasswordClick,
      onSignUpClick,
      onOAuthSignIn,
      loadingText = 'Signing in...',
      ...props
    },
    ref
  ) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [rememberMe, setRememberMe] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const validateForm = () => {
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.'
      }

      if (password.trim().length < 6) {
        return 'Password must be at least 6 characters long.'
      }

      return null
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrorMessage(null)

      const validationError = validateForm()
      if (validationError) {
        setErrorMessage(validationError)
        return
      }

      setIsSubmitting(true)

      try {
        const values: LoginFormValues = {
          email,
          password,
          rememberMe,
        }

        if (onFormSubmit) {
          await onFormSubmit(values)
        } else {
          await new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), 900)
          })
        }
      } catch {
        setErrorMessage('Unable to sign in. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-navi-surface dark:bg-navi-surface', className)}
        {...props}
      >
        <Grid cols={1} colsLg={2} gap="none" className="min-h-screen">
          <aside className="hidden lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:bg-linear-to-br lg:from-navi-primary lg:via-navi-primary-dark lg:to-navi-primary-light lg:p-10 lg:text-navi-inverse">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-navi-md bg-navi-inverse/15 font-semibold">
                  N
                </span>
                <span className="text-xl font-semibold tracking-wide">{appName}</span>
              </div>
              <h2 className="max-w-md text-4xl font-semibold leading-tight">
                Welcome to your secure workspace.
              </h2>
              <p className="max-w-md text-base text-navi-inverse/80">{appTagline}</p>
            </div>

            <p className="text-sm text-navi-inverse/75">Trusted by teams building scalable enterprise interfaces.</p>
          </aside>

          <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
            <Card variant="elevated" className="w-full max-w-md border border-navi-border dark:border-navi-border-dark">
              <Card.Header className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm text-navi-neutral/70 dark:text-navi-neutral/60">
                  <span className="inline-flex size-7 items-center justify-center rounded-navi-md bg-navi-primary/15 text-xs font-semibold text-navi-primary dark:text-navi-primary-light">
                    N
                  </span>
                  <span className="font-medium">{appName}</span>
                </div>
                <Card.Title className="text-2xl text-navi-ink dark:text-navi-neutral-light">Welcome back</Card.Title>
                <Card.Description>
                  Sign in to continue managing your projects and team access.
                </Card.Description>
              </Card.Header>

              <Card.Content>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  {errorMessage ? (
                    <Alert variant="destructive" title="Sign in error" description={errorMessage} />
                  ) : null}

                  <FormField label="Email" required>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-invalid={!emailRegex.test(email) && email.length > 0 ? true : undefined}
                    />
                  </FormField>

                  <FormField label="Password" required>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      rightAddon={
                        <button
                          type="button"
                          onClick={() => setShowPassword((state) => !state)}
                          className="text-xs font-medium text-navi-primary transition-colors hover:text-navi-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      }
                    />
                  </FormField>

                  <div className="flex items-center justify-between gap-3">
                    <Checkbox
                      label="Remember me"
                      checked={rememberMe}
                      onCheckedChange={(value) => setRememberMe(Boolean(value))}
                    />
                    <a
                      href="#"
                      className="text-sm font-medium text-navi-primary transition-colors hover:text-navi-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary"
                      onClick={(event) => {
                        event.preventDefault()
                        onForgotPasswordClick?.()
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>
                    {isSubmitting ? loadingText : 'Sign in'}
                  </Button>

                  <div className="flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs font-medium uppercase tracking-wide text-navi-neutral/60">
                      Or continue with
                    </span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      leftIcon={<GoogleIcon />}
                      onClick={() => onOAuthSignIn?.('google')}
                    >
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      leftIcon={<GitHubIcon />}
                      onClick={() => onOAuthSignIn?.('github')}
                    >
                      GitHub
                    </Button>
                  </div>

                  <p className="text-center text-sm text-navi-neutral/70 dark:text-navi-neutral/60">
                    Don't have an account?{' '}
                    <a
                      href="#"
                      className="font-medium text-navi-primary transition-colors hover:text-navi-primary-dark"
                      onClick={(event) => {
                        event.preventDefault()
                        onSignUpClick?.()
                      }}
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </Card.Content>
            </Card>
          </section>
        </Grid>
      </div>
    )
  }
)
Login.displayName = 'Login'

export { Login }
