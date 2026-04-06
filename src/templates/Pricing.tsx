import * as React from 'react'
import { cn } from '@/utils/cn'

import { Grid, Stack, Separator } from '@/components/layout'
import { Card } from '@/components/layout'
import { Button, Badge, Switch, Label } from '@/components/primitives'
import { Accordion } from '@/components/advanced'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PricingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Start with the annual billing toggle on. */
  defaultAnnual?: boolean
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  id: 'starter' | 'pro' | 'enterprise'
  name: string
  badge: string
  badgeVariant: 'outline' | 'default' | 'info'
  monthlyPrice: string | null
  annualPrice: string | null
  priceNote: string
  description: string
  features: PlanFeature[]
  ctaLabel: string
  ctaVariant: 'outline' | 'primary' | 'secondary'
  highlighted: boolean
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Free forever',
    badgeVariant: 'outline',
    monthlyPrice: '$0',
    annualPrice: '$0',
    priceNote: 'No credit card required',
    description: 'Everything you need to get started and explore the platform.',
    ctaLabel: 'Get started free',
    ctaVariant: 'outline',
    highlighted: false,
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: '1 team member', included: true },
      { text: '5 GB storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced integrations', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom domain', included: false },
      { text: 'SSO / SAML', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Most popular',
    badgeVariant: 'default',
    monthlyPrice: '$29',
    annualPrice: '$23',
    priceNote: 'per seat / month',
    description: 'For growing teams that need more power and collaboration.',
    ctaLabel: 'Start free trial',
    ctaVariant: 'primary',
    highlighted: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Up to 20 team members', included: true },
      { text: '100 GB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Advanced integrations', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom domain', included: false },
      { text: 'SSO / SAML', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Custom',
    badgeVariant: 'info',
    monthlyPrice: null,
    annualPrice: null,
    priceNote: 'Tailored to your needs',
    description: 'Dedicated infrastructure, compliance, and white-glove support.',
    ctaLabel: 'Contact sales',
    ctaVariant: 'secondary',
    highlighted: false,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Advanced analytics + exports', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Advanced integrations', included: true },
      { text: 'Priority support SLA', included: true },
      { text: 'Custom domain', included: true },
      { text: 'SSO / SAML', included: true },
    ],
  },
]

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes — you can upgrade or downgrade your plan at any time from the Billing settings. Upgrades take effect immediately and you are charged a prorated amount. Downgrades take effect at the start of the next billing cycle.',
  },
  {
    q: 'What happens after my free trial ends?',
    a: 'When your 14-day trial ends your workspace is automatically moved to the Starter (free) plan. No charges are made unless you actively select a paid plan and enter payment details.',
  },
  {
    q: 'Is annual billing locked in for the whole year?',
    a: 'Yes, annual plans are billed upfront for 12 months. If you cancel before the year is up we will issue a prorated refund for the remaining full months.',
  },
  {
    q: 'Do you offer discounts for non-profits or education?',
    a: 'Absolutely. We offer 50 % off our Pro plan for verified non-profits and academic institutions. Reach out to support@navi-ui.com with proof of eligibility.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) as well as ACH bank transfers for annual Enterprise plans. All transactions are processed securely via Stripe.',
  },
]

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-navi-success dark:text-navi-success"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-navi-neutral/30 dark:text-navi-neutral/40"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// PriceCard
// ---------------------------------------------------------------------------

interface PriceCardProps {
  plan: Plan
  annual: boolean
}

function PriceCard({ plan, annual }: PriceCardProps) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice
  const period = annual ? '/ mo, billed annually' : '/ month'

  return (
    <Card
      variant={plan.highlighted ? 'elevated' : 'bordered'}
      className={cn(
        'relative flex flex-col',
        plan.highlighted &&
          'ring-2 ring-navi-primary dark:ring-navi-primary',
      )}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-lg font-semibold text-navi-ink dark:text-navi-ink">
            {plan.name}
          </span>
          <Badge variant={plan.badgeVariant} size="sm">
            {plan.badge}
          </Badge>
        </div>

        <p className="mt-1 text-sm text-navi-ink-muted dark:text-navi-ink-muted">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mt-5 flex items-end gap-1">
          {price !== null ? (
            <>
              <span className="text-4xl font-bold tracking-tight text-navi-ink dark:text-navi-ink">
                {price}
              </span>
              <span className="mb-1 text-sm text-navi-ink-muted dark:text-navi-ink-muted">
                {period}
              </span>
            </>
          ) : (
            <span className="text-4xl font-bold tracking-tight text-navi-ink dark:text-navi-ink">
              Custom
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-navi-ink-subtle dark:text-navi-ink-subtle">
          {plan.priceNote}
        </p>
      </div>

      <Separator />

      {/* Feature list */}
      <ul className="flex-1 space-y-2.5 p-6 py-5" aria-label={`${plan.name} features`}>
        {plan.features.map((feat) => (
          <li key={feat.text} className="flex items-center gap-2.5">
            {feat.included ? <CheckIcon /> : <XIcon />}
            <span
              className={cn(
                'text-sm',
                feat.included
                  ? 'text-navi-ink dark:text-navi-ink'
                  : 'text-navi-ink-subtle line-through decoration-navi-neutral/30 dark:text-navi-ink-subtle',
              )}
            >
              {feat.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="p-6 pt-0">
        <Button variant={plan.ctaVariant} size="lg" className="w-full">
          {plan.ctaLabel}
        </Button>
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Pricing (root)
// ---------------------------------------------------------------------------

const Pricing = React.forwardRef<HTMLDivElement, PricingProps>(
  ({ className, defaultAnnual = false, ...props }, ref) => {
    const [annual, setAnnual] = React.useState(defaultAnnual)
    const switchId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen bg-navi-surface dark:bg-navi-surface',
          className,
        )}
        {...props}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Hero header                                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-6 pb-10 pt-16 text-center">
          <Badge variant="info" size="sm" className="mb-4">
            Simple, transparent pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-navi-ink dark:text-navi-ink sm:text-5xl">
            Plans for teams of all sizes
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navi-ink-muted dark:text-navi-ink-muted">
            Start for free, scale as you grow. No hidden fees, no surprises —
            cancel or change plans at any time.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-navi-border bg-navi-surface-raised px-5 py-2.5 shadow-navi-sm dark:border-navi-border-strong dark:bg-navi-surface">
            <Label
              htmlFor={switchId}
              className={cn(
                'cursor-pointer select-none text-sm font-medium transition-colors',
                !annual
                  ? 'text-navi-ink dark:text-navi-ink'
                  : 'text-navi-ink-muted dark:text-navi-ink-muted',
              )}
            >
              Monthly
            </Label>
            <Switch
              id={switchId}
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label="Toggle annual billing"
            />
            <div className="flex items-center gap-1.5">
              <Label
                htmlFor={switchId}
                className={cn(
                  'cursor-pointer select-none text-sm font-medium transition-colors',
                  annual
                    ? 'text-navi-ink dark:text-navi-ink'
                    : 'text-navi-ink-muted dark:text-navi-ink-muted',
                )}
              >
                Annual
              </Label>
              <Badge variant="success" size="sm">
                Save 20%
              </Badge>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Pricing cards                                                     */}
        {/* ---------------------------------------------------------------- */}
        <section
          aria-label="Pricing plans"
          className="mx-auto max-w-6xl px-6 pb-16"
        >
          <Grid cols={1} colsMd={3} gap="lg">
            {PLANS.map((plan) => (
              <PriceCard key={plan.id} plan={plan} annual={annual} />
            ))}
          </Grid>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                               */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <Stack gap="md" className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-navi-ink dark:text-navi-ink">
              Frequently asked questions
            </h2>
            <p className="text-navi-ink-muted dark:text-navi-ink-muted">
              Can't find what you're looking for?{' '}
              <a
                href="mailto:support@navi-ui.com"
                className="text-navi-primary underline underline-offset-2 hover:text-navi-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2"
              >
                Contact our support team
              </a>
              .
            </p>
          </Stack>

          <Accordion type="single" collapsible variant="flush">
            {FAQ_ITEMS.map((item, idx) => (
              <Accordion.Item key={idx} value={`faq-${idx}`}>
                <Accordion.Trigger className="text-base font-medium">
                  {item.q}
                </Accordion.Trigger>
                <Accordion.Content className="text-base leading-relaxed text-navi-ink-muted dark:text-navi-ink-muted">
                  {item.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>
      </div>
    )
  },
)
Pricing.displayName = 'Pricing'

export { Pricing }
