import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ChevronLeft, Check, Lock, ShieldCheck, Download, Languages, type LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { usePageMeta, SITE_ORIGIN } from '@/lib/pageMeta'
import { MarketingShell } from './MarketingShell'
import { Pricing } from './Pricing'
import type { LandingContent } from './content'
import type { PricingContent, TrustPoint } from './pricingContent'

/**
 * Pricing, as its own page.
 *
 * It was a section on the landing page, which meant it could not be found by
 * somebody searching for it, could not be titled, and had no room for the
 * answers people actually want before paying. A pricing section can show the
 * numbers; a pricing page has to close the decision, and closing it is mostly
 * objection handling — which is why two thirds of this page is questions.
 *
 * The tiers, the billing control and the comparison table are the same
 * component the landing teaser prices from, so the numbers here cannot drift
 * from the numbers there: there is one source, `content.ts`.
 */

const TRUST_ICON: Record<TrustPoint['icon'], LucideIcon> = {
  lock: Lock,
  shield: ShieldCheck,
  export: Download,
  globe: Languages,
}

export function PricingPage({ content, pricing }: { content: LandingContent; pricing: PricingContent }) {
  const c = content
  const p = pricing
  const home = c.lang === 'ar' ? '/ar' : '/'

  usePageMeta({
    title: p.documentTitle,
    description: p.metaDescription,
    canonical: p.path,
    alternates: { en: '/pricing', ar: '/ar/pricing', 'x-default': '/pricing' },
    jsonLd: [
      // The answers are the point of this page for an answer engine — a model
      // asked "can you cancel Synapse any time?" should find the sentence
      // rather than infer it from a table.
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: p.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: p.breadcrumb, item: `${SITE_ORIGIN}${home}` },
          { '@type': 'ListItem', position: 2, name: p.navLabel },
        ],
      },
    ],
  })

  return (
    <MarketingShell c={c} otherHref={p.otherPath} homeHref={home}>
      {/* ---- Heading: the outcome, then the risk-reducers, then the prices ---- */}
      <section className="pt-10 sm:pt-14">
        <Link to={home} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink">
          <Icon icon={ChevronLeft} size={15} className="rtl:-scale-x-100" />
          {p.breadcrumb}
        </Link>

        <h1 className="mt-4 max-w-3xl text-balance font-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[50px]">
          {p.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-2">{p.sub}</p>

        {/* Risk sits above the price, because it is what makes the price
            readable. Somebody who knows they can leave reads a number
            differently from somebody who thinks they are committing. */}
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          {p.assurances.map((line) => (
            <li key={line} className="flex items-center gap-2 text-[13.5px] font-medium text-ink-2">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Icon icon={Check} size={12} strokeWidth={2.8} />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <Pricing c={c} />

      {/* ---- Objections ---- */}
      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
          <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{p.faqTitle}</h2>
          <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{p.faqSub}</p>
        </div>

        {/* `details` rather than a state-driven accordion: the answers stay in
            the document when collapsed, so they are findable by search, by an
            answer engine, and by the browser's own find. */}
        <div className="mt-5 grid gap-x-10 md:grid-cols-2">
          {p.faq.map((item) => (
            <details key={item.q} className="group border-b border-line py-1">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-3 text-start">
                <h3 className="flex-1 text-[14.5px] font-semibold leading-snug text-ink">{item.q}</h3>
                <Icon icon={ChevronDown} size={16} className="shrink-0 text-ink-3 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 pe-7 text-[13.5px] leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---- Procurement reassurance ---- */}
      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
          <h2 className="font-serif text-[22px] font-semibold tracking-[-0.015em] text-ink sm:text-[26px]">{p.trustTitle}</h2>
          <p className="text-[13px] text-ink-3">{p.trustSub}</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.trust.map((point) => (
            <div key={point.label} className="rounded-xl border border-line bg-surface p-4 shadow-panel">
              <Icon icon={TRUST_ICON[point.icon]} size={17} className="text-accent-strong" />
              <p className="mt-2.5 text-[13.5px] font-semibold text-ink">{point.label}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{point.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Close ---- */}
      <section className="mt-20 overflow-hidden rounded-2xl border border-accent-strong/25 bg-accent px-6 py-14 text-center text-on-accent sm:px-10 sm:py-16">
        <h2 className="mx-auto max-w-2xl text-balance font-serif text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[36px]">{p.closingTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-on-accent/85">{p.closingSub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-on-accent px-5 py-3 text-[15px] font-semibold text-accent-strong shadow-raised transition-transform hover:-translate-y-0.5">
            {p.closingPrimary}
            <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-on-accent/30 px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-on-accent/10">
            {p.closingSecondary}
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}
