import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Globe,
  BookOpen,
  ListChecks,
  Stethoscope,
  CalendarDays,
  LineChart,
  FolderOpen,
  PenTool,
  Users,
  Check,
} from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import type { Feature, LandingContent } from './content'

const FEATURE_ICON: Record<Feature['icon'], LucideIcon> = {
  library: BookOpen,
  qbank: ListChecks,
  practical: Stethoscope,
  calendar: CalendarDays,
  performance: LineChart,
  resources: FolderOpen,
  whiteboard: PenTool,
  together: Users,
}

/* A calibrated reference bar — the product's own instrument, mirrored for RTL. */
function ReferenceBar({ value }: { value: number }) {
  const at = { '--v': `${value}%` } as CSSProperties
  return (
    <div className="relative pt-2.5">
      <div className="absolute top-0 z-10 -translate-x-1/2 ltr:left-[var(--v)] rtl:right-[var(--v)] rtl:translate-x-1/2" style={at} aria-hidden>
        <svg width="9" height="6" viewBox="0 0 9 6" className="fill-ink"><path d="M4.5 6 0 0h9z" /></svg>
      </div>
      <div className="relative flex h-2.5 overflow-hidden rounded-full">
        <div className="bg-danger/20" style={{ width: '40%' }} />
        <div className="bg-warning/25" style={{ width: '30%' }} />
        <div className="bg-success/25" style={{ width: '30%' }} />
        <span className="absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-ink ltr:left-[var(--v)] rtl:right-[var(--v)] rtl:translate-x-1/2" style={at} aria-hidden />
      </div>
    </div>
  )
}

function Specimen({ c }: { c: LandingContent['specimen'] }) {
  return (
    <div className="grid-chart-major rounded-2xl border border-line bg-surface-2/60 p-5 shadow-panel sm:p-8">
      <Panel className="mx-auto max-w-sm shadow-raised">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="font-sans text-[13px] font-semibold text-ink">{c.title}</h3>
          <span className="tnum font-mono text-[12px] text-ink-3">{c.date}</span>
        </div>
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <span className="tnum font-mono text-[15px] font-medium text-ink">09:00</span>
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#a8462f' }} />
            <span className="flex-1 truncate text-[13.5px] text-ink">{c.session}</span>
            <Badge tone="accent">{c.lecture}</Badge>
          </div>
          <div className="border-t border-line pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-ink-2">{c.readiness}</span>
              <span className="tnum font-mono text-[15px] font-semibold text-ink">68%</span>
            </div>
            <ReferenceBar value={68} />
          </div>
          <div className="space-y-2 border-t border-line pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{c.attention}</p>
            <div className="flex items-center gap-2.5">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#a8462f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">{c.acs}</span>
              <Badge tone="danger">{c.overdue}</Badge>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#c06a3f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">{c.diuretics}</span>
              <Badge tone="warning">{c.dueToday}</Badge>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

export function LandingShell({ content }: { content: LandingContent }) {
  const c = content
  useEffect(() => {
    const el = document.documentElement
    el.dir = c.dir
    el.lang = c.lang
    const previousTitle = document.title
    document.title = c.documentTitle
    return () => {
      el.dir = 'ltr'
      el.lang = 'en'
      document.title = previousTitle
    }
  }, [c.dir, c.lang, c.documentTitle])

  return (
    <div className="min-h-dvh overflow-x-clip" dir={c.dir} lang={c.lang}>
      {/* ---- Nav (solid ground, hairline rule — no glass) ---- */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-3.5 sm:px-8">
          <Wordmark />
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to={c.otherHref}
              lang={c.lang === 'ar' ? 'en' : 'ar'}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              <Icon icon={Globe} size={15} />
              {c.otherLabel}
            </Link>
            <Link to="/app" className="hidden text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink sm:inline">
              {c.signIn}
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[13.5px] font-semibold text-on-accent shadow-panel transition-colors hover:bg-accent-strong"
            >
              {c.nav.start}
              <Icon icon={ArrowRight} size={15} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1160px] px-5 sm:px-8">
        {/* ---- Hero: the heading leads, no kicker ---- */}
        <section className="grid items-center gap-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-24">
          <div>
            <h1 className="max-w-xl text-balance font-serif text-[42px] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[58px]">
              {c.hero.h1}
            </h1>
            <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-ink-2">{c.hero.sub}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-on-accent shadow-raised transition-colors hover:bg-accent-strong"
              >
                <Icon icon={GraduationCap} size={19} />
                {c.hero.primary}
                <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-line-2 bg-surface px-5 py-3 text-[15px] font-semibold text-ink shadow-panel transition-colors hover:border-ink-3/45 hover:bg-surface-2"
              >
                <Icon icon={ShieldCheck} size={18} className="text-ink-2" />
                {c.hero.secondary}
              </Link>
            </div>
            <p className="mt-6 text-[13px] text-ink-3">{c.hero.trust}</p>
          </div>

          <div className="lg:ps-4">
            <Specimen c={c.specimen} />
          </div>
        </section>

        {/* ---- Reference values: a ruled formulary strip, not tiles ---- */}
        <section className="mt-16 overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
          <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse [&>div]:border-b [&>div]:border-line md:[&>div]:border-b-0">
            {c.stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-3 px-5 py-4">
                <dt className="text-[12.5px] leading-tight text-ink-2">{s.label}</dt>
                <dd className="tnum shrink-0 font-mono text-[19px] font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- Everything in one place: a chart-index (ruled), not a card grid ---- */}
        <section className="mt-24">
          <div className="flex items-end justify-between gap-6 border-b-2 border-ink/85 pb-3">
            <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{c.featuresTitle}</h2>
            <p className="hidden max-w-xs text-[13.5px] leading-snug text-ink-2 sm:block">{c.featuresSub}</p>
          </div>
          <dl className="grid sm:grid-cols-2 sm:gap-x-12">
            {c.features.map((f) => (
              <div key={f.label} className="group flex items-baseline gap-4 border-b border-line py-4">
                <Icon icon={FEATURE_ICON[f.icon]} size={17} className="mt-0.5 shrink-0 self-start text-accent" strokeWidth={2} />
                <dt className="w-32 shrink-0 text-[14.5px] font-semibold text-ink">{f.label}</dt>
                <dd className="flex-1 text-[13.5px] leading-snug text-ink-2">{f.line}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---- How Synapse decides: a numbered clinical protocol (sequence carries meaning) ---- */}
        <section className="mt-24 overflow-hidden rounded-2xl border border-line">
          <div className="grid-chart-major border-b border-line bg-surface-2/50 px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="max-w-2xl font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{c.how.title}</h2>
            <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-ink-2">{c.how.sub}</p>
          </div>
          <ol className="grid divide-y divide-line bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            {c.how.steps.map((step) => (
              <li key={step.k} className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="tnum grid size-8 place-items-center rounded-lg border border-accent-line bg-accent-tint font-mono text-[14px] font-semibold text-accent-strong">{step.k}</span>
                  <span className="h-px flex-1 bg-line" aria-hidden />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{step.line}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- Arabic-first, bilingual: honest mirrored specimens ---- */}
        <section className="mt-24 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="max-w-xl font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{c.bilingual.title}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-2">{c.bilingual.sub}</p>
            <ul className="mt-6 space-y-2.5">
              {c.bilingual.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success/15 text-success"><Icon icon={Check} size={13} strokeWidth={2.6} /></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* The same real reading, mirrored: RTL and LTR side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="w-[10.5rem] rounded-xl border border-line bg-surface p-3.5 shadow-panel" dir="rtl" lang="ar">
              <div className="flex items-baseline justify-between">
                <span className="text-[11.5px] font-medium text-ink-2">الجاهزية</span>
                <span className="tnum font-mono text-[12.5px] font-semibold text-ink">68%</span>
              </div>
              <div className="mt-2"><ReferenceBar value={68} /></div>
            </div>
            <div className="w-[10.5rem] rounded-xl border border-line bg-surface p-3.5 shadow-panel" dir="ltr" lang="en">
              <div className="flex items-baseline justify-between">
                <span className="text-[11.5px] font-medium text-ink-2">Readiness</span>
                <span className="tnum font-mono text-[12.5px] font-semibold text-ink">68%</span>
              </div>
              <div className="mt-2"><ReferenceBar value={68} /></div>
            </div>
          </div>
        </section>

        {/* ---- Plans & pricing ---- */}
        <section className="mt-24">
          <div className="flex items-end justify-between gap-4 border-b-2 border-ink/85 pb-3">
            <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{c.plans.title}</h2>
            <p className="hidden max-w-sm text-[13.5px] leading-snug text-ink-3 sm:block">{c.plans.sub}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.plans.items.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-surface p-5 shadow-panel',
                  plan.featured ? 'border-accent shadow-raised ring-1 ring-accent/25' : 'border-line',
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 start-5 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-on-accent">{plan.badge}</span>
                )}
                <p className="text-[15px] font-semibold text-ink">{plan.name}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-serif text-[26px] font-semibold tracking-[-0.01em] text-ink">{plan.price}</span>
                  {plan.period && <span className="text-[13px] text-ink-3">{plan.period}</span>}
                </div>
                {plan.alt && <p className="mt-1 text-[12px] text-ink-3">{plan.alt}</p>}
                <p className="mt-3 flex-1 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-2">{plan.entitlement}</p>
                <Link
                  to="/app"
                  className={cn(
                    'mt-4 inline-flex h-10 items-center justify-center rounded-lg text-[13.5px] font-semibold transition-colors',
                    plan.featured ? 'bg-accent text-on-accent hover:bg-accent-strong' : 'border border-line-2 bg-surface text-ink hover:bg-surface-2',
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-ink-3">{c.plans.refund}</p>
        </section>

        {/* ---- Close ---- */}
        <section className="mt-24 overflow-hidden rounded-2xl border border-accent-strong/25 bg-accent px-6 py-14 text-center text-on-accent sm:px-10 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[38px]">{c.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-on-accent/85">{c.cta.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/app" className="group inline-flex items-center gap-2 rounded-xl bg-on-accent px-5 py-3 text-[15px] font-semibold text-accent-strong shadow-raised transition-transform hover:-translate-y-0.5">
              {c.cta.button}
              <Icon icon={ArrowRight} size={17} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link to="/admin" className="inline-flex items-center gap-2 rounded-xl border border-on-accent/30 px-5 py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-white/10">
              {c.cta.secondary}
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-line">
        <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-3 px-5 py-7 text-[12.5px] text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <Wordmark />
          <p className="max-w-md text-start sm:text-end">{c.footer}</p>
        </div>
      </footer>
    </div>
  )
}
