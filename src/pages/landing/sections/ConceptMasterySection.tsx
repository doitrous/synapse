import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

const RINGS: { label: string; value: number; status: string; tone: 'success' | 'warning' | 'primary' }[] = [
  { label: 'Heart failure', value: 92, status: 'Secure', tone: 'success' },
  { label: 'Arrhythmias', value: 61, status: 'Developing', tone: 'warning' },
  { label: 'Valve disease', value: 28, status: 'Shaky', tone: 'primary' },
]

const TONE_STROKE: Record<(typeof RINGS)[number]['tone'], string> = {
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  primary: 'var(--color-primary)',
}
const TONE_PILL: Record<(typeof RINGS)[number]['tone'], string> = {
  success: 'bg-success-tint text-success',
  warning: 'bg-warning-tint text-warning',
  primary: 'bg-primary-tint text-primary-strong',
}

function ConceptRing({ label, value, status, tone }: (typeof RINGS)[number]) {
  const r = 24
  const c = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 60 60" className="size-12 shrink-0 -rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
        <circle cx="30" cy="30" r={r} fill="none" stroke={TONE_STROKE[tone]} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} />
      </svg>
      <div>
        <p className="text-[13px] font-semibold text-ink">{value} — {label}</p>
        <span className={cn('mt-0.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', TONE_PILL[tone])}>{status}</span>
      </div>
    </div>
  )
}

const NEXT_BLOCK = [
  { label: 'Confirmed weak concepts', pct: 45, className: 'bg-primary' },
  { label: 'Exam-blueprint coverage', pct: 25, className: 'bg-primary-soft' },
  { label: 'Spaced review', pct: 20, className: 'bg-primary-line' },
  { label: 'Unmeasured concepts', pct: 10, className: 'bg-line-2' },
]

export function ConceptMasterySection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div>
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />02 · Concepts, not question counts</p>
        <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">We grade <em className="font-serif italic text-primary-strong">understanding</em>, not just accuracy.</h2>
        <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built on the concepts you must understand to pass</strong> — not on how many questions we can pile up. Questions are a tool; understanding is the goal.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Mastery of the exact concepts on your exam paper.</strong> Progress reflects concept digestion as well as percentage correct — the number that actually predicts your exam.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">An adaptive engine that knows what you&rsquo;ve learned and what you haven&rsquo;t.</strong> Every new block is a genuine step forward — never wasted repetition.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built for full digestion</strong> of a topic, a module, a year — and ultimately, of medicine itself.</span></li>
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Concept digestion · Cardiovascular</p>
            <span className="font-mono text-[10px] font-bold text-success">Exam-ready</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {RINGS.map((ring) => <ConceptRing key={ring.label} {...ring} />)}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">What your next block will contain</p>
            <span className="font-mono text-[10px] font-bold text-ink-3">Decided per student</span>
          </div>
          <div className="mt-4 flex h-8 overflow-hidden rounded-lg" role="img" aria-label="45% confirmed weak concepts, 25% exam-blueprint coverage, 20% spaced review, 10% unmeasured concepts">
            {NEXT_BLOCK.map((seg) => (
              <div key={seg.label} className={cn('flex items-center justify-center text-[10.5px] font-bold text-on-primary', seg.className)} style={{ width: `${seg.pct}%` }}>{seg.pct}%</div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink-2">
            {NEXT_BLOCK.map((seg) => (
              <span key={seg.label} className="inline-flex items-center gap-1.5"><span className={cn('size-2 rounded-full', seg.className)} aria-hidden />{seg.label}</span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel">
          <span className="shrink-0 rounded-full bg-success-tint px-3 py-1.5 text-[10.5px] font-semibold text-success">Never wasted repetition</span>
          <p className="flex-1 text-[12.5px] leading-relaxed text-ink-2">The engine weighs what you have digested, what the blueprint demands, and what is due for review — then builds the one block that moves you forward.</p>
        </div>

        <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Mastery is measured on the concepts your exam paper actually tests.</p>
      </div>
    </section>
  )
}
