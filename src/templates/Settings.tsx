import * as React from 'react'
import { cn } from '@/utils/cn'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@/components/navigation'
import { Card, Separator } from '@/components/layout'
import {
  Button,
  Input,
  Label,
  RadioGroup,
  Switch,
  Textarea,
  Spinner,
} from '@/components/primitives'
import { FormField, Select } from '@/components/forms'
import { Avatar } from '@/components/data-display'
import { Alert } from '@/components/feedback'
import { Dialog } from '@/components/advanced'
import { ThemeSwitcher } from '@/components/theme'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial active tab. */
  defaultTab?: SettingsTab
}

export type SettingsTab =
  | 'profile'
  | 'account'
  | 'notifications'
  | 'appearance'
  | 'danger'

// ---------------------------------------------------------------------------
// Static option lists
// ---------------------------------------------------------------------------

const TIMEZONES = [
  { label: 'UTC−12:00 Baker Island', value: 'Etc/GMT+12' },
  { label: 'UTC−05:00 Eastern Time', value: 'America/New_York' },
  { label: 'UTC−06:00 Central Time', value: 'America/Chicago' },
  { label: 'UTC−07:00 Mountain Time', value: 'America/Denver' },
  { label: 'UTC−08:00 Pacific Time', value: 'America/Los_Angeles' },
  { label: 'UTC+00:00 London', value: 'Europe/London' },
  { label: 'UTC+01:00 Paris', value: 'Europe/Paris' },
  { label: 'UTC+03:00 Moscow', value: 'Europe/Moscow' },
  { label: 'UTC+05:30 Mumbai', value: 'Asia/Kolkata' },
  { label: 'UTC+08:00 Beijing', value: 'Asia/Shanghai' },
  { label: 'UTC+09:00 Tokyo', value: 'Asia/Tokyo' },
]

const LANGUAGES = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'Español', value: 'es' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Português', value: 'pt' },
  { label: 'Русский', value: 'ru' },
  { label: '中文', value: 'zh' },
  { label: '日本語', value: 'ja' },
]

const FONT_SIZES = [
  { label: 'Small (13 px)', value: 'sm' },
  { label: 'Default (14 px)', value: 'md' },
  { label: 'Large (16 px)', value: 'lg' },
  { label: 'Extra large (18 px)', value: 'xl' },
]

const DENSITY_OPTIONS = [
  { label: 'Compact', value: 'compact' },
  { label: 'Default', value: 'default' },
  { label: 'Comfortable', value: 'comfortable' },
]

// ---------------------------------------------------------------------------
// Profile tab
// ---------------------------------------------------------------------------

function ProfileTab() {
  const [name, setName] = React.useState('Alex Johnson')
  const [email, setEmail] = React.useState('alex.johnson@company.com')
  const [bio, setBio] = React.useState(
    'Senior Product Designer • Building the future of digital experiences.',
  )
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSave = () => {
    setSaving(true)
    setSaved(false)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Profile photo</Card.Title>
          <Card.Description>
            Click the avatar to upload a new photo (JPG, PNG — max 2 MB).
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Change profile photo"
              className={cn(
                'relative rounded-full focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-navi-primary focus-visible:ring-offset-2',
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar
                size="xl"
                fallback="AJ"
                alt="Alex Johnson"
                className="cursor-pointer opacity-90 transition-opacity hover:opacity-70"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100',
                )}
              >
                <svg
                  className="size-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              aria-label="Upload profile photo"
              tabIndex={-1}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium text-navi-ink dark:text-navi-ink">
                Alex Johnson
              </p>
              <p className="text-xs text-navi-ink-muted dark:text-navi-ink-muted">
                Senior Product Designer
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Personal info */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Personal information</Card.Title>
          <Card.Description>
            Update your name, email address, and short bio.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <FormField label="Full name" required>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </FormField>
          <FormField label="Email address" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormField>
          <FormField
            label="Bio"
            helperText="Up to 160 characters shown on your public profile."
          >
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little about yourself…"
              maxLength={160}
              rows={3}
            />
          </FormField>
        </Card.Content>
        <Card.Footer className="justify-between">
          {saved && (
            <Alert variant="success" className="flex-1 py-2 text-sm">
              Profile saved successfully.
            </Alert>
          )}
          <Button
            variant="primary"
            disabled={saving}
            aria-busy={saving}
            onClick={handleSave}
            className="ml-auto"
          >
            {saving ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Saving…
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Account tab
// ---------------------------------------------------------------------------

function AccountTab() {
  const [timezone, setTimezone] = React.useState('America/New_York')
  const [language, setLanguage] = React.useState('en-US')
  const [currentPw, setCurrentPw] = React.useState('')
  const [newPw, setNewPw] = React.useState('')
  const [confirmPw, setConfirmPw] = React.useState('')
  const [pwError, setPwError] = React.useState('')

  const handleUpdate = () => {
    setPwError('')
    if (newPw && newPw !== confirmPw) {
      setPwError('New passwords do not match.')
      return
    }
    // would call API here
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
  }

  return (
    <div className="space-y-6">
      {/* Change password */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Password</Card.Title>
          <Card.Description>
            Use a strong password that you don't use elsewhere.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          {pwError && (
            <Alert variant="destructive" className="text-sm">
              {pwError}
            </Alert>
          )}
          <FormField label="Current password">
            <Input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </FormField>
          <FormField label="New password" helperText="Minimum 8 characters.">
            <Input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </FormField>
          <FormField label="Confirm new password">
            <Input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </FormField>
        </Card.Content>
      </Card>

      {/* Locale */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Locale &amp; language</Card.Title>
          <Card.Description>
            Set your preferred time zone and interface language.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          <FormField label="Time zone">
            <Select
              options={TIMEZONES}
              value={timezone}
              onValueChange={setTimezone}
              placeholder="Select time zone…"
            />
          </FormField>
          <FormField label="Language">
            <Select
              options={LANGUAGES}
              value={language}
              onValueChange={setLanguage}
              placeholder="Select language…"
            />
          </FormField>
        </Card.Content>
        <Card.Footer className="justify-end">
          <Button variant="primary" onClick={handleUpdate}>
            Update account
          </Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Notifications tab
// ---------------------------------------------------------------------------

interface NotifState {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

function NotificationsTab() {
  const [notifs, setNotifs] = React.useState<NotifState>({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  const toggle = (key: keyof NotifState) =>
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))

  const rows: { key: keyof NotifState; label: string; helper: string }[] = [
    {
      key: 'email',
      label: 'Email notifications',
      helper: 'Receive updates about activity via email.',
    },
    {
      key: 'push',
      label: 'Push notifications',
      helper: 'Browser and mobile push alerts.',
    },
    {
      key: 'sms',
      label: 'SMS notifications',
      helper: 'Text message alerts for critical events.',
    },
    {
      key: 'marketing',
      label: 'Marketing emails',
      helper: 'Product news, tips, and promotional offers.',
    },
  ]

  return (
    <Card variant="bordered">
      <Card.Header>
        <Card.Title>Notification preferences</Card.Title>
        <Card.Description>
          Choose how and when you'd like to be notified.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-1">
        {rows.map((row, idx) => (
          <React.Fragment key={row.key}>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label
                  htmlFor={`notif-${row.key}`}
                  className="cursor-pointer font-medium"
                >
                  {row.label}
                </Label>
                <p className="text-sm text-navi-ink-muted dark:text-navi-ink-muted">
                  {row.helper}
                </p>
              </div>
              <Switch
                id={`notif-${row.key}`}
                checked={notifs[row.key]}
                onCheckedChange={() => toggle(row.key)}
                aria-label={row.label}
              />
            </div>
            {idx < rows.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Card.Content>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Appearance tab
// ---------------------------------------------------------------------------

function AppearanceTab() {
  const [density, setDensity] = React.useState('default')
  const [fontSize, setFontSize] = React.useState('md')

  return (
    <div className="space-y-6">
      {/* Color mode */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Color mode</Card.Title>
          <Card.Description>
            Toggle between light and dark themes.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <ThemeSwitcher showLabel />
        </Card.Content>
      </Card>

      {/* Density */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Interface density</Card.Title>
          <Card.Description>
            Control the spacing and padding of UI elements.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <RadioGroup
            options={DENSITY_OPTIONS}
            value={density}
            onValueChange={setDensity}
            orientation="horizontal"
          />
        </Card.Content>
      </Card>

      {/* Font size */}
      <Card variant="bordered">
        <Card.Header>
          <Card.Title>Font size</Card.Title>
          <Card.Description>
            Adjust the base font size of the interface.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="max-w-xs">
            <Select
              options={FONT_SIZES}
              value={fontSize}
              onValueChange={setFontSize}
              placeholder="Select font size…"
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Danger Zone tab
// ---------------------------------------------------------------------------

function DangerZoneTab() {
  const [open, setOpen] = React.useState(false)
  const [confirming, setConfirming] = React.useState(false)
  const [confirmText, setConfirmText] = React.useState('')

  const CONFIRM_PHRASE = 'delete my account'

  const handleDelete = () => {
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      setOpen(false)
      setConfirmText('')
    }, 1500)
  }

  return (
    <Card
      variant="bordered"
      className="border-navi-destructive dark:border-navi-destructive"
    >
      <Card.Header>
        <Card.Title className="text-navi-destructive dark:text-navi-destructive">
          Danger zone
        </Card.Title>
        <Card.Description>
          Irreversible and destructive actions. Proceed with caution.
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="rounded-navi-md border border-navi-destructive/30 bg-navi-destructive-subtle p-4 dark:bg-navi-destructive/10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="font-medium text-navi-ink dark:text-navi-ink">
                Delete account
              </p>
              <p className="text-sm text-navi-ink-muted dark:text-navi-ink-muted">
                Permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <Button variant="destructive" size="sm">
                  Delete account
                </Button>
              </Dialog.Trigger>
              <Dialog.Content size="sm">
                <Dialog.Header>
                  <Dialog.Title>Delete account?</Dialog.Title>
                  <Dialog.Description>
                    This will permanently delete your account and all your
                    data. This action is irreversible.
                  </Dialog.Description>
                </Dialog.Header>

                <div className="my-4 space-y-3">
                  <Alert variant="destructive" className="text-sm">
                    All your projects, settings, and billing information will
                    be erased.
                  </Alert>
                  <FormField
                    label={
                      <>
                        Type{' '}
                        <span className="font-mono font-semibold">
                          {CONFIRM_PHRASE}
                        </span>{' '}
                        to confirm
                      </>
                    }
                  >
                    <Input
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder={CONFIRM_PHRASE}
                      aria-label="Confirm deletion phrase"
                    />
                  </FormField>
                </div>

                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button variant="ghost" disabled={confirming}>
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button
                    variant="destructive"
                    disabled={
                      confirmText.toLowerCase() !== CONFIRM_PHRASE ||
                      confirming
                    }
                    aria-busy={confirming}
                    onClick={handleDelete}
                  >
                    {confirming ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Deleting…
                      </>
                    ) : (
                      'Yes, delete my account'
                    )}
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Settings (root)
// ---------------------------------------------------------------------------

const Settings = React.forwardRef<HTMLDivElement, SettingsProps>(
  ({ className, defaultTab = 'profile', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen bg-navi-surface dark:bg-navi-surface',
          className,
        )}
        {...props}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-navi-border bg-navi-surface dark:border-navi-border-strong dark:bg-navi-surface">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <Breadcrumb className="mb-1" separator="/">
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-sm text-navi-ink-muted hover:text-navi-ink">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <span className="text-sm font-medium text-navi-ink dark:text-navi-ink">
                  Settings
                </span>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-2xl font-semibold tracking-tight text-navi-ink dark:text-navi-ink">
              Settings
            </h1>
          </div>
        </header>

        {/* Body */}
        <main className="mx-auto max-w-4xl px-6 py-8">
          <Tabs defaultValue={defaultTab}>
            <TabsList
              variant="underline"
              className="mb-8 w-full justify-start overflow-x-auto"
            >
              {(
                [
                  { value: 'profile', label: 'Profile' },
                  { value: 'account', label: 'Account' },
                  { value: 'notifications', label: 'Notifications' },
                  { value: 'appearance', label: 'Appearance' },
                  { value: 'danger', label: 'Danger Zone' },
                ] as { value: SettingsTab; label: string }[]
              ).map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  variant="underline"
                  className={cn(
                    tab.value === 'danger' &&
                      'text-navi-destructive data-[state=active]:border-navi-destructive data-[state=active]:text-navi-destructive',
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="account">
              <AccountTab />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceTab />
            </TabsContent>
            <TabsContent value="danger">
              <DangerZoneTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  },
)
Settings.displayName = 'Settings'

export { Settings }
