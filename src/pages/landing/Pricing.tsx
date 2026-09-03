import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/pricing'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import type { Lang } from '@/data/planCatalog'
import type { LandingContent } from './content'
import { offerAmounts, pricingFor } from './pricingContent'

type PeriodId = 'month' | 'term' | 'year'

/**
 * One complete membership, with duration as the only decision.
 *
 * The public button starts a no-card trial. It carries the period through
 * signup, but does not invent a payment session before hosted checkout exists.
 */
export function Pricing({ c }: { c: LandingContent }) {
  const [catalog] = usePlanCatalog()
  const p = pricingFor(c.lang)
  const lang = c.lang as Lang
  const [periodId, setPeriodId] = useState<PeriodId>('term')

  const amounts = useMemo(() => offerAmounts(catalog), [catalog])
  const savings = amounts.savings
  const termMonthly = amounts.termMonthly
  const selectedAmount = periodId === 'month' ? amounts.month : periodId === 'term' ? amounts.term : null
  const signupHref = periodId === 'year' ? null : `/signup?plan=maristana&period=${periodId}`

  const options: { id: PeriodId; label: string; detail: string }[] = [
    { id: 'month', label: p.offer.month, detail: p.offer.monthDetail },
    { id: 'term', label: p.offer.term, detail: p.offer.termDetail },
    { id: 'year', label: p.offer.year, detail: p.offer.yearDetail },
  ]

  return (
    <>
      <section id="membership" className="mt-20 scroll-mt-24 sm:mt-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex min-h-full flex-col rounded-2xl border border-primary/45 bg-surface p-5 shadow-panel sm:p-7">
            <div className="border-b border-line pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary-strong">{p.offer.eyebrow}</p>
              <h2 className="mt-2 font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">{p.offer.title}</h2>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-2">{p.offer.description}</p>
            </div>

            <div role="radiogroup" aria-label={p.h1} className="mt-5 grid gap-2 sm:grid-cols-3">
              {options.map((option) => {
                const selected = option.id === periodId
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPeriodId(option.id)}
                    className={cn(
                      'min-h-16 rounded-xl border px-3 py-3 text-start outline-none transition-[border-color,background-color] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                      selected ? 'border-primary bg-primary-tint' : 'border-line bg-surface hover:border-line-2 hover:bg-surface-2',
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 text-[13px] font-semibold text-ink">
                      {option.label}
                      {option.id === 'year' && (
                        <span className="rounded-full border border-line-2 bg-inset px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-ink-3">
                          {p.offer.comingSoon}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[11.5px] leading-snug text-ink-3">{option.detail}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-1 flex-col justify-end pt-8" aria-live="polite">
              {selectedAmount === null ? (
                <>
                  <p className="font-serif text-[34px] font-semibold tracking-[-0.025em] text-ink sm:text-[40px]">{p.offer.comingSoon}</p>
                  <p className="mt-2 text-[13.5px] text-ink-2">{p.offer.unavailable}</p>
                </>
              ) : (
                <>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-mono text-[13px] font-semibold text-ink-3">{p.offer.currency}</span>
                    <span className="tnum font-serif text-[46px] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[54px]">
                      {formatNumber(selectedAmount, lang)}
                    </span>
                    <span className="text-[13px] text-ink-3">/ {periodId === 'month' ? p.offer.month : p.offer.term}</span>
                  </p>
                  {periodId === 'term' && (
                    <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[12.5px] font-semibold text-success">
                      <span>{p.offer.save} {p.offer.currency} {formatNumber(savings, lang)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.offer.currency} {formatNumber(termMonthly, lang)} {p.offer.equivalent}</span>
                    </p>
                  )}
                  <p className="mt-3 flex items-center gap-2 text-[13.5px] text-ink-2">
                    <Icon icon={Check} size={15} className="text-success" />
                    {p.offer.fullAccess}
                  </p>
                </>
              )}

              {signupHref ? (
                <Link
                  to={signupHref}
                  className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-semibold text-on-primary shadow-panel transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {p.offer.cta}
                  <Icon icon={ArrowRight} size={16} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
              ) : (
                <span className="mt-6 inline-flex min-h-11 cursor-default items-center justify-center rounded-xl border border-line bg-inset px-5 py-3 text-[14px] font-semibold text-ink-3" aria-disabled="true">
                  {p.offer.comingSoon}
                </span>
              )}
            </div>
          </div>

          <aside id="scholarships" className="flex min-h-full flex-col rounded-2xl border border-line-2 bg-surface p-5 shadow-panel sm:p-7">
            <div className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary-tint text-primary-strong">
              <Icon icon={ShieldCheck} size={20} />
            </div>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.08em] text-primary-strong">{p.scholarship.eyebrow}</p>
            <h2 className="mt-2 max-w-md font-serif text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[34px]">
              {p.scholarship.title}
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink-2">{p.scholarship.sub}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {p.scholarship.facts.map((fact) => (
                <li key={fact} className="flex gap-3 py-3.5 text-[13.5px] leading-relaxed text-ink-2">
                  <Icon icon={Check} size={15} className="mt-0.5 text-success" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-6 text-[11.5px] leading-relaxed text-ink-3">{p.scholarship.note}</p>
          </aside>
        </div>
      </section>

      <section className="mt-24">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[34px]">{p.includedTitle}</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{p.includedSub}</p>
        </div>

        <div className="mt-7 grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
          {p.included.map((group, index) => (
            <div
              key={group.title}
              className={cn(
                'py-6 sm:px-6',
                index > 0 && 'border-t border-line sm:border-t-0',
                index % 2 === 1 && 'sm:border-s sm:border-line',
                index >= 2 && 'sm:border-t sm:border-line',
                index % 3 !== 0 && 'lg:border-s lg:border-line',
                index >= 3 && 'lg:border-t lg:border-line',
                index % 3 === 0 && 'lg:border-s-0',
              )}
            >
              <h3 className="text-[14px] font-semibold text-ink">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink-2">
                    <Icon icon={Check} size={14} className="mt-0.5 text-primary-strong" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
          <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{p.next.title}</h2>
          <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{p.next.sub}</p>
        </div>
        <ol className="grid md:grid-cols-3">
          {p.next.steps.map((step, index) => (
            <li key={step.number} className={cn('py-6 md:px-6', index > 0 && 'border-t border-line md:border-s md:border-t-0')}>
              <span className="font-mono text-[11px] font-semibold tracking-[0.05em] text-primary-strong">{step.number}</span>
              <h3 className="mt-2 text-[14.5px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{step.line}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
