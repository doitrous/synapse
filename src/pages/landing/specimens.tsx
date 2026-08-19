import type { CSSProperties } from 'react'
import { BookOpen, Check, Highlighter, PenLine, StickyNote, SquareDashed, X } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { formatPercent } from '@/lib/pricing'
import type { LandingContent, SpecimenKey } from './content'

/**
 * The product, rendered — not photographed.
 *
 * These are built out of the app's own tokens and components rather than
 * screenshots, and the reason is not purity. A screenshot is stale within a
 * release, carries whichever theme it was taken in, is soft on a retina screen,
 * has to be re-shot for Arabic, and is one asset pipeline nobody wants. These
 * stay correct, theme themselves, mirror themselves, and are crisp at any
 * pixel density.
 *
 * They are deliberately not the real components either: the real ones need
 * routing, state and a signed-in student. What they promise is what the screens
 * look like and how they behave, which is what somebody deciding is asking.
 */

type Specimen = LandingContent['specimen']
type Lang = LandingContent['lang']

/* A calibrated reference bar — the product's own instrument, mirrored for RTL. */
export function ReferenceBar({ value }: { value: number }) {
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

/** The mount used everywhere a specimen appears: ruled ground, raised panel. */
function Mount({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('grid-chart-major rounded-2xl border border-line bg-surface-2/60 p-5 shadow-panel sm:p-7', className)}>
      <Panel className="mx-auto max-w-sm shadow-raised">{children}</Panel>
    </div>
  )
}

function Head({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
      <h3 className="min-w-0 truncate font-sans text-[13px] font-semibold text-ink">{title}</h3>
      {meta && <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{meta}</span>}
    </div>
  )
}

export function TodaySpecimen({ c, lang }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <Head title={c.title} meta={c.date} />
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-3">
          <span className="tnum font-mono text-[15px] font-medium text-ink">{lang === 'ar' ? '٠٩:٠٠' : '09:00'}</span>
          <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#b52230' }} />
          <span className="flex-1 truncate text-[13.5px] text-ink">{c.session}</span>
          <Badge tone="primary">{c.lecture}</Badge>
        </div>
        <div className="border-t border-line pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[12.5px] font-medium text-ink-2">{c.readiness}</span>
            <span className="tnum font-mono text-[15px] font-semibold text-ink">{formatPercent(68, lang)}</span>
          </div>
          <ReferenceBar value={68} />
        </div>
        <div className="space-y-2 border-t border-line pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{c.attention}</p>
          <div className="flex items-center gap-2.5">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#b52230' }} />
            <span className="flex-1 truncate text-[13px] text-ink">{c.acs}</span>
            <Badge tone="danger">{c.overdue}</Badge>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: '#c14a2e' }} />
            <span className="flex-1 truncate text-[13px] text-ink">{c.diuretics}</span>
            <Badge tone="warning">{c.dueToday}</Badge>
          </div>
        </div>
      </div>
    </Mount>
  )
}

function LibrarySpecimen({ c }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-4 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: '#b52230' }} />
        <span className="font-mono text-[10.5px] font-semibold tracking-[0.06em] text-ink-2">CVS 04</span>
        <h3 className="min-w-0 flex-1 truncate font-serif text-[14px] font-semibold text-ink">{c.libraryTitle}</h3>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-[13.5px] leading-relaxed text-ink-2">{c.libraryFact}</p>
        <div className="rounded-lg border border-line bg-inset/60 p-3">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{c.librarySources}</p>
          <div className="flex items-start gap-2">
            <Icon icon={BookOpen} size={13} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-[12px] leading-snug text-ink-2">{c.librarySource}</span>
          </div>
        </div>
      </div>
    </Mount>
  )
}

function QuestionSpecimen({ c, lang }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <Head title={lang === 'ar' ? 'سؤال ١٤ / ٤٠' : 'Q 14 / 40'} meta={lang === 'ar' ? '٠٢:٤١' : '02:41'} />
      <div className="space-y-3 p-4">
        <p className="text-[13px] leading-relaxed text-ink-2">{c.questionStem}</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 rounded-lg border border-success/40 bg-success-tint/50 px-3 py-2">
            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-success text-paper"><Icon icon={Check} size={10} strokeWidth={3} /></span>
            <span className="text-[12.5px] font-medium text-ink">{c.questionChoice}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger-tint/40 px-3 py-2">
            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-danger text-paper"><Icon icon={X} size={10} strokeWidth={3} /></span>
            <span className="text-[12.5px] text-ink-2">{c.questionWrong}</span>
          </div>
        </div>
        <p className="border-t border-line pt-3 text-[12px] leading-relaxed text-ink-2">{c.questionWhy}</p>
      </div>
    </Mount>
  )
}

function ReaderSpecimen({ c, lang }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <Head title={c.readerTitle} meta={formatPercent(160, lang)} />
      <div className="relative p-4">
        {/* The toolbar, as it sits over the page. */}
        <div className="absolute start-4 top-4 flex flex-col gap-0.5 rounded-lg border border-line bg-surface p-1 shadow-panel">
          {[PenLine, Highlighter, StickyNote, SquareDashed].map((icon, index) => (
            <span
              key={index}
              className={cn('grid size-6 place-items-center rounded', index === 0 ? 'bg-primary-tint text-primary-strong' : 'text-ink-3')}
            >
              <Icon icon={icon} size={12} />
            </span>
          ))}
        </div>
        <div className="ms-11 space-y-2">
          {[0, 1, 2, 3, 4].map((line) => (
            <div key={line} className="relative">
              <span className="block h-2 rounded-full bg-inset" style={{ width: `${[96, 88, 100, 72, 92][line]}%` }} />
              {line === 1 && <span className="absolute inset-y-0 start-0 w-3/5 rounded-full bg-[#c2691c]/35" />}
              {line === 3 && <span className="absolute -inset-y-0.5 start-0 w-2/5 rounded-[3px] bg-[#c2691c]" title={c.readerTape} />}
            </div>
          ))}
          <svg viewBox="0 0 200 24" className="mt-1 h-6 w-full" aria-hidden>
            <path d="M6 18 C 40 4, 70 22, 104 10 S 168 6, 194 14" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="w-40 rounded-lg border border-[color-mix(in_srgb,#c2691c_34%,var(--color-line))] bg-[color-mix(in_srgb,#c2691c_16%,var(--color-surface))] p-2">
            <p className="text-[11px] leading-snug text-ink">{c.readerNote}</p>
          </div>
        </div>
      </div>
    </Mount>
  )
}

function PracticalSpecimen({ c, lang }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <Head title={c.practicalTitle} meta={lang === 'ar' ? '٠٦:٠٠' : '06:00'} />
      <div className="p-4">
        <div className="flex gap-1 rounded-lg bg-inset/70 p-1">
          <span className="flex-1 rounded-md bg-surface px-2 py-1.5 text-center text-[11.5px] font-semibold text-primary-strong shadow-panel">{c.practicalCandidate}</span>
          <span className="flex-1 px-2 py-1.5 text-center text-[11.5px] font-medium text-ink-3">{c.practicalExaminer}</span>
        </div>
        <div className="mt-3 space-y-2">
          {[100, 84, 92].map((width, index) => (
            <span key={index} className="block h-2 rounded-full bg-inset" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="mt-3 border-t border-line pt-3">
          <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{c.practicalMark}</p>
          <div className="space-y-1.5">
            {[true, true, false].map((done, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className={cn('grid size-4 shrink-0 place-items-center rounded border', done ? 'border-success/40 bg-success/15 text-success' : 'border-line-2 text-transparent')}>
                  <Icon icon={Check} size={10} strokeWidth={3} />
                </span>
                <span className="h-1.5 flex-1 rounded-full bg-inset" style={{ width: `${[70, 88, 60][index]}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Mount>
  )
}

function PerformanceSpecimen({ c, lang }: { c: Specimen; lang: Lang }) {
  return (
    <Mount>
      <Head title={c.performanceTitle} />
      <div className="space-y-3 p-4">
        {c.performanceSubjects.map((subject) => (
          <div key={subject.name}>
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] text-ink-2">{subject.name}</span>
              <span className="tnum font-mono text-[12.5px] font-semibold text-ink">{formatPercent(subject.value, lang)}</span>
            </div>
            <ReferenceBar value={subject.value} />
          </div>
        ))}
      </div>
    </Mount>
  )
}

const SPECIMENS: Record<SpecimenKey, (props: { c: Specimen; lang: Lang }) => React.JSX.Element> = {
  today: TodaySpecimen,
  library: LibrarySpecimen,
  question: QuestionSpecimen,
  reader: ReaderSpecimen,
  practical: PracticalSpecimen,
  performance: PerformanceSpecimen,
}

export function SpecimenFor({ which, c, lang }: { which: SpecimenKey; c: Specimen; lang: Lang }) {
  const Component = SPECIMENS[which]
  return <Component c={c} lang={lang} />
}
