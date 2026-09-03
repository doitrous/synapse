import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, ChevronLeft } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { usePageMeta, SITE_ORIGIN } from '@/lib/pageMeta'
import { MarketingShell } from './MarketingShell'
import { Pricing } from './Pricing'
import type { LandingContent } from './content'
import { offerAmounts, type PricingContent } from './pricingContent'

export function PricingPage({ content, pricing }: { content: LandingContent; pricing: PricingContent }) {
  const c = content
  const p = pricing
  const home = c.lang === 'ar' ? '/ar' : '/'
  const [catalog] = usePlanCatalog()
  const amounts = offerAmounts(catalog)

  usePageMeta({
    title: p.documentTitle,
    description: p.metaDescription,
    canonical: p.path,
    alternates: { en: '/pricing', ar: '/ar/pricing', 'x-default': '/pricing' },
    ogImage: c.lang === 'ar' ? '/og-image-ar.png' : '/og-image.png',
    jsonLd: [
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
        '@type': 'Product',
        name: 'Nishany complete membership',
        brand: { '@type': 'Brand', name: 'Nishany by Connect' },
        offers: [
          { '@type': 'Offer', priceCurrency: 'EGP', price: amounts.month, url: `${SITE_ORIGIN}/signup?plan=maristana&period=month` },
          { '@type': 'Offer', priceCurrency: 'EGP', price: amounts.term, url: `${SITE_ORIGIN}/signup?plan=maristana&period=term` },
        ],
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
      <section className="pt-10 sm:pt-14">
        <Link
          to={home}
          className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-ink-3 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Icon icon={ChevronLeft} size={15} className="rtl:-scale-x-100" />
          {p.breadcrumb}
        </Link>

        <h1 className="mt-4 max-w-4xl text-balance font-serif text-[39px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[58px]">
          {p.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">{p.sub}</p>

        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
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

      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
          <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{p.faqTitle}</h2>
          <p className="max-w-sm text-[13.5px] leading-snug text-ink-3">{p.faqSub}</p>
        </div>

        <div className="mt-5 grid gap-x-10 md:grid-cols-2">
          {p.faq.map((item) => (
            <details key={item.q} className="group border-b border-line py-1">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 py-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <h3 className="flex-1 text-[14.5px] font-semibold leading-snug text-ink">{item.q}</h3>
                <Icon icon={ChevronDown} size={16} className="shrink-0 text-ink-3 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 pe-7 text-[13.5px] leading-relaxed text-ink-2">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-24 border-y border-line bg-surface px-5 py-14 text-center sm:px-10 sm:py-16">
        <h2 className="mx-auto max-w-2xl text-balance font-serif text-[29px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[38px]">{p.closingTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">{p.closingSub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/signup?plan=maristana&period=term"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14.5px] font-semibold text-on-primary shadow-panel transition-colors hover:bg-primary-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            {p.closingPrimary}
            <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </Link>
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center rounded-xl border border-line-2 bg-surface px-5 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {p.closingSecondary}
          </Link>
        </div>
      </section>
    </MarketingShell>
  )
}
