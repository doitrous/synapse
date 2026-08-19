import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { BILLING_PERIODS, formatNumber, perMonth, priceFor } from '@/lib/pricing'
import { pricingFor } from './pricingContent'
import type { LandingContent, Plan } from './content'

/**
 * Pricing, in the space a landing page can afford to give it.
 *
 * The full table now lives at `/pricing`, where it can hold the comparison and
 * twelve answered objections. What the landing page still owes a reader is the
 * number — a marketing page that makes you click to find out whether it costs
 * 90 or 900 loses the people who would have been fine with the answer. So this
 * is the cheapest true price per tier and a link, not a second pricing table.
 */

/** The lowest monthly-equivalent a plan is sold at — its honest "from". */
function lowestPerMonth(plan: Plan): number | null {
  const candidates = BILLING_PERIODS
    .map((period) => priceFor(plan.prices, period))
    .filter((found): found is NonNullable<typeof found> => found !== null)
    .map((found) => perMonth(found.amount, found.period))
  return candidates.length ? Math.min(...candidates) : null
}

export function PricingTeaser({ c }: { c: LandingContent }) {
  const p = pricingFor(c.lang)
  const plans = c.plans

  return (
    <section className="mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
        <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{p.teaser.title}</h2>
        <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{p.teaser.sub}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.tiers.map((plan) => {
          const from = lowestPerMonth(plan)
          return (
            <Link
              key={plan.id}
              to={p.path}
              className={cn(
                'group flex flex-col rounded-xl border bg-surface p-4 shadow-panel transition-colors hover:bg-surface-2',
                plan.featured ? 'border-accent ring-1 ring-accent/25' : 'border-line',
              )}
            >
              <p className="text-[14px] font-semibold text-ink">{plan.name}</p>
              <p className="mt-1.5 flex items-baseline gap-1.5">
                {from === null || from === 0 ? (
                  <span className="font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">{plans.free}</span>
                ) : (
                  <>
                    <span className="text-[12px] text-ink-3">{p.teaser.from}</span>
                    <span className="tnum font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink">
                      {plans.currency} {formatNumber(from, c.lang)}
                    </span>
                    <span className="text-[12px] text-ink-3">{plans.perMonth}</span>
                  </>
                )}
              </p>
              <p className="mt-2.5 flex-1 text-[12.5px] leading-relaxed text-ink-2">{plan.entitlement}</p>
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
