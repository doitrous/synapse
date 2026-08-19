import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Minus } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { formatNumber, formatPercent } from '@/lib/pricing'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import {
  compareGroups, isPurchasable, perMonth, plansFor, priceAt, savingPercent, say,
  type BillingPeriodDef, type CatalogPlan, type Lang, type PlanCatalog,
} from '@/data/planCatalog'
import type { LandingContent } from './content'

/**
 * Plans, priced.
 *
 * Three tiers side by side with one promoted, everything else demoted to a
 * second row, a billing control that moves the headline price and states the
 * saving, and a full comparison below — because on a feature-heavy product the
 * table is what people scroll to.
 *
 * Every plan on this page now comes from the catalogue the admin console edits,
 * in the language the page is written in. It used to be a second hardcoded list
 * that nothing joined to the one Billing charged from, so a price change in the
 * console left this page advertising the old number.
 */

export function Pricing({ c }: { c: LandingContent }) {
  const [catalog] = usePlanCatalog()
  const lang = c.lang as Lang
  const plans = c.plans

  const periods = catalog.periods
  // Open on the longest period anyone can actually buy: the saving is the
  // argument this page is making, and defaulting to one marked coming soon
  // would lead with a button that does nothing.
  const [periodId, setPeriodId] = useState(() => {
    const buyable = periods.filter((period) => !period.comingSoon)
    return (buyable[buyable.length - 1] ?? periods[periods.length - 1])?.id ?? ''
  })

  const tiers = useMemo(() => plansFor(catalog, 'primary'), [catalog])
  const more = useMemo(() => plansFor(catalog, 'secondary'), [catalog])
  const period = periods.find((entry) => entry.id === periodId) ?? periods[0]

  if (!period) return null

  return (
    <section className="mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
        <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{plans.title}</h2>
        <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{plans.sub}</p>
      </div>

      {/* The billing control sits above the tiers, because it changes all of them. */}
      <div className="mt-6 flex justify-center">
        <div role="radiogroup" aria-label={plans.title} className="inline-flex rounded-xl border border-line bg-surface-2/60 p-1 shadow-panel">
          {periods.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={period.id === option.id}
              onClick={() => setPeriodId(option.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors sm:px-4',
                period.id === option.id ? 'bg-surface text-accent-strong shadow-panel' : 'text-ink-3 hover:text-ink',
              )}
            >
              {say(option.label, lang)}
              {option.comingSoon && (
                <span className="rounded-full bg-inset px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.05em] text-ink-3">
                  {plans.comingSoon}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {tiers.map((plan) => (
          <TierCard key={plan.id} plan={plan} period={period} catalog={catalog} c={c} />
        ))}
      </div>

      <p className="mt-4 text-[12px] text-ink-3">{plans.refund}</p>

      {/* The remaining offers, demoted so the primary decision stays at three. */}
      {more.length > 0 && (
        <>
          <h3 className="mt-14 border-b border-line pb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{plans.moreTitle}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {more.map((plan) => (
              <div key={plan.id} className="flex flex-col rounded-xl border border-line bg-surface p-4 shadow-panel">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                  {say(plan.name, lang)}
                  {plan.comingSoon && <ComingSoon label={plans.comingSoon} />}
                </p>
                <p className="mt-1.5 flex items-baseline gap-1.5">
                  <PlanPrice plan={plan} period={period} catalog={catalog} c={c} compact />
                </p>
                <p className="mt-2.5 flex-1 text-[12.5px] leading-relaxed text-ink-2">{say(plan.entitlement, lang)}</p>
                <PlanCta plan={plan} period={period} lang={lang} comingSoon={plans.comingSoon} />
              </div>
            ))}
          </div>
        </>
      )}

      <CompareTable catalog={catalog} c={c} tiers={tiers} />
    </section>
  )
}

function ComingSoon({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line-2 bg-inset px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-ink-3">
      {label}
    </span>
  )
}

/**
 * The button under a plan.
 *
 * A plan that cannot be bought yet says so and does not link anywhere: sending
 * somebody to sign up for a plan that is not on sale is the sort of thing a
 * "coming soon" flag exists to prevent.
 */
function PlanCta({ plan, period, lang, comingSoon, featured }: {
  plan: CatalogPlan
  period: BillingPeriodDef
  lang: Lang
  comingSoon: string
  featured?: boolean
}) {
  const base = featured
    ? 'mt-4 inline-flex h-10 items-center justify-center rounded-lg text-[13.5px] font-semibold transition-colors'
    : 'mt-3 inline-flex h-9 items-center justify-center rounded-lg border border-line-2 bg-surface text-[13px] font-semibold text-ink transition-colors'

  if (!isPurchasable(plan, period)) {
    return (
      <span className={cn(base, 'cursor-default border border-line bg-inset text-ink-3')} aria-disabled="true">
        {comingSoon}
      </span>
    )
  }

  return (
    <Link
      to="/signup"
      className={cn(base, featured ? 'bg-accent text-on-accent hover:bg-accent-strong' : 'hover:bg-surface-2')}
    >
      {say(plan.cta, lang)}
    </Link>
  )
}

function TierCard({ plan, period, catalog, c }: {
  plan: CatalogPlan
  period: BillingPeriodDef
  catalog: PlanCatalog
  c: LandingContent
}) {
  const lang = c.lang as Lang
  const plans = c.plans
  const saving = savingPercent(plan, period.id, catalog.periods)
  const chosen = priceAt(plan, period.id, catalog.periods)

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-surface p-5 shadow-panel',
        plan.featured ? 'border-accent shadow-raised ring-1 ring-accent/25' : 'border-line',
      )}
    >
      {plan.badge && (
        <span className="absolute -top-2.5 start-5 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-on-accent">{say(plan.badge, lang)}</span>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[15px] font-semibold text-ink">{say(plan.name, lang)}</p>
        {plan.comingSoon && <ComingSoon label={plans.comingSoon} />}
        {saving !== null && saving > 0 && (
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10.5px] font-bold text-success">{plans.save} {formatPercent(saving, lang)}</span>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-1.5">
        <PlanPrice plan={plan} period={period} catalog={catalog} c={c} />
      </div>

      {/* What is actually charged, and when — the number above is the comparison. */}
      {chosen && chosen.amount > 0 && (
        <p className="tnum mt-1 font-mono text-[11.5px] text-ink-3">
          {plans.currency} {formatNumber(chosen.amount, lang)} · {say(chosen.period.billedAs, lang)}
        </p>
      )}

      <p className="mt-3 flex-1 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-2">{say(plan.entitlement, lang)}</p>
      <PlanCta plan={plan} period={period} lang={lang} comingSoon={plans.comingSoon} featured />
    </div>
  )
}

function PlanPrice({ plan, period, catalog, c, compact }: {
  plan: CatalogPlan
  period: BillingPeriodDef
  catalog: PlanCatalog
  c: LandingContent
  compact?: boolean
}) {
  const lang = c.lang as Lang
  const plans = c.plans
  const size = compact ? 'text-[19px]' : 'text-[30px]'

  if (plan.quoted) return <span className={cn('font-serif font-semibold tracking-[-0.01em] text-ink', size)}>{say(plan.quoted, lang)}</span>

  const chosen = priceAt(plan, period.id, catalog.periods)
  if (!chosen) return null
  if (chosen.amount === 0) return <span className={cn('font-serif font-semibold tracking-[-0.01em] text-ink', size)}>{plans.free}</span>

  // A fixed-scope offer is not billed per month, so saying "a month" would be
  // an invented comparison rather than a helpful one.
  if (plan.fixedPeriod) {
    return (
      <>
        <span className={cn('font-serif font-semibold tracking-[-0.01em] text-ink', size)}>
          {plans.currency} {formatNumber(chosen.amount, lang)}
        </span>
        <span className="text-[12.5px] text-ink-3">{say(plan.fixedPeriod, lang)}</span>
      </>
    )
  }

  return (
    <>
      <span className={cn('tnum font-serif font-semibold tracking-[-0.01em] text-ink', size)}>
        {plans.currency} {formatNumber(perMonth(chosen.amount, chosen.period), lang)}
      </span>
      <span className="text-[12.5px] text-ink-3">{plans.perMonth}</span>
    </>
  )
}

/**
 * The comparison, in full.
 *
 * A table on a wide screen, and a per-tier collapsible list below it — a table
 * that scrolls sideways on a phone is a table nobody reads, and phones are most
 * of the traffic a pricing page gets.
 *
 * Its rows are the union of what the plans above say they include, so a feature
 * edited on a plan moves the table with it. It used to be written by hand, next
 * to the plans it described and free to disagree with them.
 */
function CompareTable({ catalog, c, tiers }: { catalog: PlanCatalog; c: LandingContent; tiers: CatalogPlan[] }) {
  const lang = c.lang as Lang
  const plans = c.plans
  const columns = tiers.map((plan) => say(plan.name, lang))
  const groups = useMemo(() => compareGroups(catalog, lang), [catalog, lang])
  const [openTier, setOpenTier] = useState<number | null>(columns.length - 1)

  if (groups.length === 0) return null

  return (
    <div className="mt-14">
      <h3 className="border-b-2 border-ink/85 pb-3 font-serif text-[22px] font-semibold tracking-[-0.015em] text-ink sm:text-[26px]">{plans.compareTitle}</h3>

      {/* Wide: one table, its tier columns sticky as the rows scroll past. */}
      <div className="mt-5 hidden md:block">
        <table className="w-full border-collapse text-start">
          <thead className="sticky top-14 z-10 bg-paper">
            <tr>
              <th className="w-[46%] border-b border-line py-3 text-start text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3" />
              {columns.map((column, index) => (
                <th
                  key={column}
                  className={cn(
                    'border-b border-line py-3 text-center text-[13.5px] font-semibold text-ink',
                    index === columns.length - 1 && 'text-accent-strong',
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.title}>
              {group.title && (
                <tr>
                  <th colSpan={columns.length + 1} className="border-b border-line bg-surface-2/50 px-3 py-2 text-start text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">
                    {group.title}
                  </th>
                </tr>
              )}
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-line py-2.5 pe-3 text-[13.5px] text-ink-2">{row.label}</td>
                  {row.values.map((value, index) => (
                    <td key={index} className="border-b border-line py-2.5 text-center">
                      <Value value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Narrow: one collapsible list per tier, so nothing scrolls sideways. */}
      <div className="mt-5 space-y-2 md:hidden">
        {columns.map((column, tier) => (
          <div key={column} className="overflow-hidden rounded-xl border border-line bg-surface">
            <button
              type="button"
              onClick={() => setOpenTier((current) => (current === tier ? null : tier))}
              aria-expanded={openTier === tier}
              className="flex w-full items-center gap-2 px-4 py-3 text-start"
            >
              <span className={cn('flex-1 text-[14px] font-semibold', tier === columns.length - 1 ? 'text-accent-strong' : 'text-ink')}>{column}</span>
              <Icon icon={ChevronDown} size={16} className={cn('text-ink-3 transition-transform', openTier === tier && 'rotate-180')} />
            </button>
            {openTier === tier && (
              <div className="border-t border-line">
                {groups.map((group) => (
                  <div key={group.title}>
                    {group.title && <p className="bg-surface-2/50 px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">{group.title}</p>}
                    <ul className="divide-y divide-line">
                      {group.rows.map((row) => (
                        <li key={row.label} className="flex items-center gap-3 px-4 py-2.5">
                          <span className="flex-1 text-[13px] text-ink-2">{row.label}</span>
                          <Value value={row.values[tier]} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Value({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="mx-auto grid size-5 place-items-center rounded-full bg-success/15 text-success">
        <Icon icon={Check} size={12} strokeWidth={2.8} />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="mx-auto grid size-5 place-items-center text-ink-3/60">
        <Icon icon={Minus} size={13} />
      </span>
    )
  }
  return <span className="text-[12.5px] font-medium text-ink-2">{value}</span>
}
