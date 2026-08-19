import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/pricing'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { monthlyEquivalent, plansFor, say, type Lang } from '@/data/planCatalog'
import { pricingFor } from './pricingContent'
import type { LandingContent } from './content'

/**
 * Pricing, in the space a landing page can afford to give it.
 *
 * The full table lives at `/pricing`, where it can hold the comparison and
 * twelve answered objections. What the landing page still owes a reader is the
 * number — a marketing page that makes you click to find out whether it costs
 * 90 or 900 loses the people who would have been fine with the answer. So this
 * is the cheapest true price per tier and a link, not a second pricing table.
 *
 * Prices come from the catalogue the admin console edits, like every other
 * price on the site, so this cannot advertise a number Billing no longer
 * charges.
 */
export function PricingTeaser({ c }: { c: LandingContent }) {
  const [catalog] = usePlanCatalog()
  const lang = c.lang as Lang
  const p = pricingFor(c.lang)
  const plans = c.plans

  const tiers = useMemo(() => plansFor(catalog, 'primary'), [catalog])

  return (
    <section className="mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
        <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{p.teaser.title}</h2>
        <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{p.teaser.sub}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {tiers.map((plan) => {
          // The lowest monthly-equivalent this plan is sold at — its honest
          // "from". A quoted plan has no list price to reduce.
          const from = plan.quoted ? null : monthlyEquivalent(plan, catalog.periods)
          return (
            <Link
              key={plan.id}
              to={p.path}
              className={cn(
                'group flex flex-col rounded-xl border bg-surface p-4 shadow-panel transition-colors hover:bg-surface-2',
                plan.featured ? 'border-accent ring-1 ring-accent/25' : 'border-line',
              )}
            >
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold text-ink">{say(plan.name, lang)}</p>
                {plan.comingSoon && (
                  <span className="rounded-full border border-warning/30 bg-warning-tint px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-warning">
                    {plans.comingSoon}
                  </span>
                )}
              </div>

              <p className="mt-1.5 flex items-baseline gap-1.5">
                {plan.quoted ? (
                  <span className="font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">{say(plan.quoted, lang)}</span>
                ) : from ? (
                  <>
                    <span className="text-[12px] text-ink-3">{p.teaser.from}</span>
                    <span className="tnum font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">
                      {plans.currency} {formatNumber(from, lang)}
                    </span>
                    <span className="text-[12px] text-ink-3">{plans.perMonth}</span>
                  </>
                ) : (
                  <span className="font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">{plans.free}</span>
                )}
              </p>

              <p className="mt-2.5 flex-1 text-[12.5px] leading-relaxed text-ink-2">{say(plan.entitlement, lang)}</p>
            </Link>
          )
        })}
      </div>

      <Link
        to={p.path}
        className="group mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-accent-strong hover:underline"
      >
        {p.teaser.link}
        <Icon icon={ArrowRight} size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </section>
  )
}
