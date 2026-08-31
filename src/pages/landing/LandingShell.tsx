import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, CircleDot, GraduationCap, Plus, ShieldCheck, Sparkles } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { usePageMeta } from '@/lib/pageMeta'
import { MarketingShell } from './MarketingShell'
import { PricingTeaser } from './PricingTeaser'
import { FeatureSuites } from './FeatureSuites'
import { NishanyShowcase } from './NishanyShowcase'
import { nishanyCopy } from './nishanyContent'
import type { LandingContent } from './content'

const TRIAL_PATH = '/signup?plan=maristana&period=term'

function TodaySurface({ c }: { c: ReturnType<typeof nishanyCopy> }) {
  return (
    <div className="relative">
      <div className="absolute -inset-x-3 top-8 bottom-8 -z-10 border-y border-line bg-surface-2/45" aria-hidden />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-raised">
        <div className="grid-chart-major flex items-start justify-between gap-5 border-b border-line px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.today.title}</p>
            <h2 className="mt-1.5 font-serif text-[20px] font-semibold text-ink">{c.today.university}</h2>
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

function Provenance({ c }: { c: ReturnType<typeof nishanyCopy> }) {
  return (
    <section id="why-nishany" className="scroll-mt-24 py-24 sm:py-28">
      <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.provenance.eyebrow}</p>
      <div className="mt-3 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <h2 className="max-w-2xl font-serif text-[31px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">{c.provenance.title}</h2>
        <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-2 lg:justify-self-end">{c.provenance.body}</p>
      </div>

      <div className="relative mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
        <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-line-2 md:block" aria-hidden />
        <article className="relative border-t border-line pt-8 md:border-t-0">
          <span className="absolute top-[-1px] size-9 rounded-full border border-accent bg-surface md:top-0" aria-hidden><span className="absolute inset-[11px] rounded-full bg-accent" /></span>
          <p className="mt-6 font-mono text-[28px] font-semibold text-accent-strong">2011</p>
          <h3 className="mt-3 font-serif text-[22px] font-semibold text-ink">{c.provenance.startTitle}</h3>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-2">{c.provenance.startBody}</p>
        </article>
        <article className="relative border-t border-line pt-8 md:border-t-0">
          <span className="absolute top-[-1px] size-9 rounded-full border border-primary bg-surface md:top-0" aria-hidden><span className="absolute inset-[11px] rounded-full bg-primary" /></span>
          <p className="mt-6 font-brand text-[19px] font-semibold tracking-[0.1em] text-primary-strong">NISHANY</p>
          <h3 className="mt-3 font-serif text-[22px] font-semibold text-ink">{c.provenance.nowTitle}</h3>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-2">{c.provenance.nowBody}</p>
        </article>
      </div>
    </section>
  )
}

function Curriculum({ c }: { c: ReturnType<typeof nishanyCopy> }) {
  return (
    <section className="grid items-center gap-10 border-y border-line py-20 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-strong">{c.curriculum.eyebrow}</p>
        <h2 className="mt-3 max-w-xl font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">{c.curriculum.title}</h2>
        <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{c.curriculum.body}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {[c.curriculum.university, c.curriculum.year, c.curriculum.ready].map((label, index) => (
            <span key={label} className={index === 2 ? 'inline-flex items-center gap-1.5 rounded-md border border-success/25 bg-success-tint px-2.5 py-1.5 text-[10.5px] font-semibold text-success' : 'rounded-md border border-line bg-surface px-2.5 py-1.5 text-[10.5px] font-semibold text-ink-2'}>{index === 2 && <Icon icon={Check} size={12} />}{label}</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        <div className="grid-chart-major flex items-center justify-between border-b border-line px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">{c.curriculum.plan}</p><p className="mt-1 text-[14px] font-semibold text-ink">{c.curriculum.module}</p></div><span className="rounded-md border border-warning/25 bg-warning-tint px-2 py-1 text-[9.5px] font-semibold text-warning">{c.curriculum.exam}</span></div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-7 border-b border-line pb-2 text-center font-mono text-[9px] text-ink-3">{(c.lang === 'ar' ? ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'] : ['S', 'S', 'M', 'T', 'W', 'T', 'F']).map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}</div>
          <div className="mt-3 grid grid-cols-7 gap-2">{Array.from({ length: 14 }, (_, i) => <div key={i} className={i === 8 ? 'aspect-square rounded-md border border-primary bg-primary text-on-primary' : i === 10 ? 'aspect-square rounded-md border border-accent-line bg-accent-tint text-accent-strong' : 'aspect-square rounded-md border border-line bg-surface-2 text-ink-3'}><span className="grid size-full place-items-center font-mono text-[9.5px]">{i + 14}</span></div>)}</div>
          <div className="mt-5 space-y-2.5"><div className="flex items-center gap-3 border-s-2 border-accent bg-accent-tint px-3 py-2.5"><Icon icon={GraduationCap} size={15} className="text-accent-strong" /><span className="flex-1 text-[11.5px] font-semibold text-ink">{c.lang === 'ar' ? 'جلسة جامعية · فشل القلب' : 'University session · Heart failure'}</span><span className="font-mono text-[9.5px] text-ink-3">10:00</span></div><button type="button" className="flex min-h-11 w-full items-center gap-3 border-s-2 border-dashed border-line-2 px-3 text-start text-[11.5px] font-semibold text-ink-2"><Icon icon={Plus} size={14} />{c.curriculum.personal}</button></div>
        </div>
      </div>
    </section>
  )
}

function ValueClose({ c, legacyContent }: { c: ReturnType<typeof nishanyCopy>; legacyContent: LandingContent }) {
  const pricingHref = c.lang === 'ar' ? '/ar/pricing' : '/pricing'
  return (
    <>
      <PricingTeaser c={legacyContent} />
      <section id="study-together" className="scroll-mt-24 py-24 sm:py-28">
        <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.close.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[38px]">{c.close.title}</h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{c.close.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={TRIAL_PATH} className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-[14px] font-semibold text-on-primary shadow-action hover:bg-primary-hover">{c.close.primary}<Icon icon={ArrowRight} size={16} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></Link>
              <Link to={pricingHref} className="inline-flex min-h-11 items-center rounded-lg border border-line-2 bg-surface px-5 text-[14px] font-semibold text-ink hover:bg-surface-2">{c.close.pricing}</Link>
            </div>
          </div>
          <aside className="grid-chart-major border-t border-line bg-surface-2/60 p-6 sm:p-10 lg:border-s lg:border-t-0 lg:p-12">
            <span className="grid size-11 place-items-center rounded-xl border border-primary-line bg-primary-tint text-primary-strong"><Icon icon={ShieldCheck} size={21} /></span>
            <h3 className="mt-6 font-serif text-[24px] font-semibold text-ink">{c.close.scholarshipTitle}</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{c.close.scholarshipBody}</p>
            <div className="mt-8 border-t border-line pt-5"><p className="font-mono text-[25px] font-semibold text-ink">{c.close.price}</p><p className="mt-1 text-[11px] text-ink-3">{c.close.priceNote}</p></div>
          </aside>
        </div>
      </section>
    </>
  )
}

export function LandingShell({ content }: { content: LandingContent }) {
  const c = nishanyCopy(content.lang)
  const location = useLocation()

  usePageMeta({
    title: c.lang === 'ar' ? 'Nishany · تعلّم الطب بالطريقة التي ستمارسه بها' : 'Nishany · Learn medicine the way you’ll practise it',
    description: c.hero.body,
    canonical: c.lang === 'ar' ? '/ar' : location.pathname === '/en' ? '/en' : '/',
    alternates: { en: '/en', ar: '/ar', 'x-default': '/' },
    ogImage: c.lang === 'ar' ? '/og-image-ar.png' : '/og-image.png',
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'Nishany by Connect', foundingDate: '2011', url: 'https://synapse.doitrous.com' }],
  })

  return (
    <MarketingShell c={content}>
      <section className="grid items-center gap-12 pb-20 pt-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 border-b border-line pb-2 text-[10.5px] font-semibold text-ink-2"><Icon icon={Sparkles} size={14} className="text-accent-strong" />{c.lang === 'ar' ? 'من Connect Academy · منذ ٢٠١١' : 'From Connect Academy · since 2011'}</div>
          <h1 className="max-w-2xl text-balance font-serif text-[43px] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[60px]">{c.hero.title}</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-7 text-ink-2 sm:text-[17px]">{c.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={TRIAL_PATH} className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 text-[14.5px] font-semibold text-on-primary shadow-action transition-colors hover:bg-primary-hover">{c.hero.primary}<Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></Link>
            <a href="#showcase" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-line-2 bg-surface px-5 text-[14.5px] font-semibold text-ink shadow-control transition-colors hover:bg-surface-2"><Icon icon={CircleDot} size={16} className="text-primary" />{c.hero.secondary}</a>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-ink-3"><Icon icon={Check} size={14} className="text-success" />{c.hero.trust}</p>
        </div>
        <TodaySurface c={c} />
      </section>

      <Provenance c={c} />
      <Curriculum c={c} />
      <NishanyShowcase c={c} />
      <FeatureSuites c={c} />
      <ValueClose c={c} legacyContent={content} />
    </MarketingShell>
  )
}
