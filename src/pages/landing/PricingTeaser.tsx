import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { findPlan, type Lang } from '@/data/planCatalog'
import { formatNumber } from '@/lib/pricing'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { pricingFor } from './pricingContent'
import type { LandingContent } from './content'

/** A compact statement of the complete offer; the full objections live on pricing. */
export function PricingTeaser({ c }: { c: LandingContent }) {
  const [catalog] = usePlanCatalog()
  const p = pricingFor(c.lang)
  const lang = c.lang as Lang

  const amounts = useMemo(() => {
    const plan = findPlan(catalog, 'maristana')
    return {
      month: plan?.prices.month ?? 400,
      term: plan?.prices.term ?? 1000,
    }
  }, [catalog])

  const savings = Math.max(0, (amounts.month * 3) - amounts.term)
  const equivalent = Math.round(amounts.term / 3)
  const currency = p.offer.currency

  return (
    <section id="pricing" className="mt-24 scroll-mt-24 border-y border-line py-10 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary-strong">{p.teaser.eyebrow}</p>
          <h2 className="mt-2 max-w-xl text-balance font-serif text-[29px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[38px]">
            {p.teaser.title}
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{p.teaser.sub}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/signup?plan=maristana&period=term"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-semibold text-on-primary shadow-panel transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {p.teaser.cta}
              <Icon icon={ArrowRight} size={16} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link
              to={p.path}
              className="inline-flex min-h-11 items-center rounded-xl border border-line-2 bg-surface px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {p.teaser.link}
            </Link>
          </div>
        </div>

        <div className="border-s-0 border-line lg:border-s lg:ps-10">
          <p className="text-[12px] font-semibold text-ink-3">{p.teaser.termLabel}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
            <span className="font-mono text-[12px] font-semibold text-ink-3">{currency}</span>
            <span className="tnum font-serif text-[46px] font-semibold leading-none tracking-[-0.035em] text-ink">
              {formatNumber(amounts.term, lang)}
            </span>
          </p>
          <p className="mt-3 flex flex-wrap gap-x-2 text-[12.5px] font-semibold text-success">
            <span>{p.offer.save} {currency} {formatNumber(savings, lang)}</span>
            <span aria-hidden="true">·</span>
            <span>{currency} {formatNumber(equivalent, lang)} {p.offer.equivalent}</span>
          </p>
          <p className="mt-5 flex gap-2.5 border-t border-line pt-5 text-[12.5px] leading-relaxed text-ink-2">
            <Icon icon={ShieldCheck} size={16} className="mt-0.5 text-primary-strong" />
            <span>{p.teaser.scholarship}</span>
          </p>
          <p className="mt-3 flex gap-2.5 text-[12.5px] text-ink-2">
            <Icon icon={Check} size={15} className="text-success" />
            <span>{p.offer.fullAccess}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
