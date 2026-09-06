import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { NishanyMark } from '@/components/brand/Wordmark'
import { usePageMeta } from '@/lib/pageMeta'
import { MarketingShell } from './MarketingShell'
import { pricingFor } from './pricingContent'
import { nishanyCopy } from './nishanyContent'
import type { LandingContent } from './content'
import { TRIAL_PATH } from './sections/shared'
import { HeroSection } from './sections/HeroSection'
import { RoadmapSection } from './sections/RoadmapSection'
import { ConceptMasterySection } from './sections/ConceptMasterySection'
import { WeakConceptSection } from './sections/WeakConceptSection'
import { QuestionBankSection } from './sections/QuestionBankSection'
import { CohortSection } from './sections/CohortSection'
import { ToolkitSection } from './sections/ToolkitSection'
import { BringYourBookSection } from './sections/BringYourBookSection'
import { StudyTogetherSection } from './sections/StudyTogetherSection'
import { TrustBandSection } from './sections/TrustBandSection'
import { PricingTeaserSection } from './sections/PricingTeaserSection'
import { ClosingCtaSection } from './sections/ClosingCtaSection'

/**
 * The Noon Dot mark enlarged into an aiming target — the hero artwork.
 *
 * The word نيشاني means "my target", and the mark already carries the story:
 * the bowl of the ن with its dot come to rest at the bullseye. Here the
 * mark's own geometry (bowl, dot in the bowl's mouth) is shifted so the dot
 * lands dead-centre on the target rings. Colours read from tokens so the
 * artwork follows warm and dark themes like the mark itself does.
 *
 * Kept here (not imported from sections/HeroSection.tsx) because the Arabic
 * page still renders this exact hero, word/pronunciation/gloss line included
 * — that hero is untouched by the English rebuild.
 */
function TargetArtwork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      {/* The Nishany mark (nishany-mark.png): the two Noon arcs and the dot,
          grouped so the whole aiming sight rotates as one when it locks on.
          The arcs are 275° paths — the gap between their round caps is the
          mouth of the ن where the dot rests. */}
      <g className="hero-mark">
        <path className="hero-arc hero-arc-outer" d="M147.6 100 A47.6 47.6 0 1 1 104.15 52.58" pathLength="1" />
        <path className="hero-arc hero-arc-inner" d="M128 100 A28 28 0 1 1 102.44 72.11" pathLength="1" />
        <circle className="hero-mark-pulse" cx="131.8" cy="69.2" r="7" />
        <circle className="hero-mark-dot" cx="131.8" cy="69.2" r="7" />
      </g>
    </svg>
  )
}

/** Unchanged from the previous build: the pre-rebuild Arabic product surface. */
function TodaySurface({ c }: { c: ReturnType<typeof nishanyCopy> }) {
  return (
    <div className="relative">
      <div className="absolute -inset-x-3 top-8 bottom-8 -z-10 border-y border-line bg-surface-2/45" aria-hidden />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-raised">
        <div className="grid-chart-major flex items-start justify-between gap-5 border-b border-line px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.today.title}</p>
            <h3 className="mt-1.5 font-serif text-[20px] font-semibold text-ink">{c.today.university}</h3>
            <p className="mt-1 text-[11px] text-ink-3">{c.today.date}</p>
          </div>
          <span className="grid size-10 place-items-center rounded-xl border border-accent-line bg-accent-tint text-accent-strong"><Icon icon={CalendarDays} size={19} /></span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="border-s-2 border-accent px-3 py-2.5">
            <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-accent-strong">{c.today.institution}</p><span className="font-mono text-[10px] text-ink-3">{c.today.institutionTime}</span></div>
            <p className="mt-1.5 text-[13px] font-semibold text-ink">{c.today.module}</p>
          </div>
          <div className="my-3 ms-4 h-4 border-s border-dashed border-line-2" aria-hidden />
          <div className="border-s-2 border-line-2 px-3 py-2.5">
            <div className="flex items-center justify-between gap-4"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-ink-3">{c.today.personal}</p><span className="font-mono text-[10px] text-ink-3">{c.today.personalTime}</span></div>
            <p className="mt-1.5 text-[13px] font-semibold text-ink">{c.lang === 'ar' ? 'مراجعة شرائح الباثولوجي' : 'Review pathology slides'}</p>
          </div>
          <div className="mt-4 rounded-xl border border-primary-line bg-primary-tint p-4">
            <div className="flex items-center justify-between gap-3"><p className="text-[10px] font-bold uppercase tracking-[0.07em] text-primary-strong">{c.today.next}</p><span className="rounded-md bg-surface px-2 py-1 font-mono text-[9.5px] font-semibold text-primary-strong">{c.today.nextTime}</span></div>
            <p className="mt-2 text-[13px] font-semibold text-ink">{c.lang === 'ar' ? 'اختبر فهمك: الاحتقان الوريدي' : 'Check your understanding: venous congestion'}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary-line"><div className="h-full w-[62%] rounded-full bg-primary" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LandingShell({ content }: { content: LandingContent }) {
  const c = nishanyCopy(content.lang)
  const pricing = pricingFor(c.lang)
  const location = useLocation()

  usePageMeta({
    title: c.lang === 'ar' ? 'Nishany · مذاكرة الطب، في قلب الهدف' : 'Nishany · Medical school, right on target',
    description: c.lang === 'ar' ? c.hero.body : 'Nishany is built around each university’s own curriculum — clinical questions, OSCE stations, and a study engine that points at exactly what to learn next.',
    canonical: c.lang === 'ar' ? '/ar' : location.pathname === '/en' ? '/en' : '/',
    alternates: { en: '/en', ar: '/ar', 'x-default': '/' },
    ogImage: c.lang === 'ar' ? '/og-image-ar.png' : '/og-image.png',
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'Nishany by Connect', foundingDate: '2011', url: 'https://nishany.com' }],
  })

  if (content.lang === 'ar') {
    return (
      <MarketingShell c={content}>
        {/* Hero: the meaning of the word, as artwork */}
        <section className="flex flex-col items-center pb-20 pt-10 text-center sm:pt-14 lg:pb-24">
          <TargetArtwork className="h-auto w-[256px] sm:w-[340px]" />
          <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1">
            <span dir="rtl" lang="ar" className="font-brand text-[30px] font-bold leading-none text-ink sm:text-[34px]">{c.hero.word}</span>
            <span dir="ltr" className="font-mono text-[13px] text-ink-2">{c.hero.pron}</span>
            <span className="font-serif text-[15px] italic text-ink-2 sm:text-[16px]">{c.hero.gloss}</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-[40px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[60px]">{c.hero.title}</h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-2 sm:text-[16.5px]">{c.hero.body}</p>
          <Link to={TRIAL_PATH} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
            {c.hero.primary}
            <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
          <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-2"><Icon icon={Check} size={14} className="text-success" />{c.hero.trust}</p>
        </section>

        {/* Three steps */}
        <section id="why-nishany" className="grid scroll-mt-24 gap-10 border-t border-line py-16 sm:py-20 md:grid-cols-3 md:gap-14">
          {c.steps.map((step) => (
            <div key={step.k}>
              <p className="font-mono text-[13px] font-semibold text-primary-strong">{step.k}</p>
              <h2 className="mt-3 font-serif text-[22px] font-semibold text-ink">{step.title}</h2>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-2">{step.line}</p>
            </div>
          ))}
        </section>

        {/* One product surface as proof */}
        <section className="grid items-center gap-12 border-t border-line py-16 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-strong">{c.proof.eyebrow}</p>
            <h2 className="mt-3 max-w-xl font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">{c.proof.title}</h2>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{c.proof.body}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-2">{c.proof.university}</span>
              <span className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-2">{c.proof.year}</span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success-tint px-2.5 py-1.5 text-[10.5px] font-semibold text-success"><Icon icon={Check} size={12} />{c.proof.ready}</span>
            </div>
          </div>
          <TodaySurface c={c} />
        </section>

        {/* Pricing, in one line */}
        <section className="flex flex-col items-start justify-between gap-5 border-t border-line py-12 sm:flex-row sm:items-center sm:py-14">
          <div>
            <h2 className="font-serif text-[24px] font-semibold text-ink">{c.pricing.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{c.pricing.sub}</p>
          </div>
          <Link to={pricing.path} className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-line-2 bg-surface px-5 text-[14px] font-semibold text-ink shadow-control transition-colors hover:bg-surface-2">
            {c.pricing.cta}
            <Icon icon={ArrowRight} size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </section>

        {/* Close */}
        <section className="flex flex-col items-center border-t border-line py-20 text-center sm:py-24">
          <NishanyMark size={44} />
          <h2 className="mt-6 font-serif text-[32px] font-semibold tracking-[-0.02em] text-ink sm:text-[42px]">{c.close.title}</h2>
          <p className="mt-3 text-[14.5px] text-ink-2">{c.close.sub}</p>
          <Link to={TRIAL_PATH} className="group mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-[15px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">
            {c.close.button}
            <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </section>
      </MarketingShell>
    )
  }

  return (
    <MarketingShell c={content}>
      <HeroSection />
      <RoadmapSection id="why-nishany" />
      <ConceptMasterySection />
      <WeakConceptSection />
      <QuestionBankSection />
      <CohortSection />
      <ToolkitSection />
      <BringYourBookSection />
      <StudyTogetherSection />
      <TrustBandSection />
      <PricingTeaserSection />
      <ClosingCtaSection />
    </MarketingShell>
  )
}
