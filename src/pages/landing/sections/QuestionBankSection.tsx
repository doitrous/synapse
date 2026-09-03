import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

export function QuestionBankSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />04 · The question bank</p>
          <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Every format your exams throw at you, in <em className="font-serif italic text-primary-strong">one bank</em>.</h2>
        </div>
        <ul className="space-y-4 self-center text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">MCQs, OSCE stations, clinical cases, and written questions</strong> — one bank, mapped to your university&rsquo;s own curriculum.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Key words made obvious.</strong> Each written question states its key words clearly, so students know exactly what earns the mark and what examiners look for.</span></li>
        </ul>
      </div>

      <div className="mt-10 grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">MCQ</p><span className="rounded-md bg-primary-tint px-1.5 py-0.5 text-[9px] font-bold text-primary-strong">Timed</span></div>
          <div className="mt-3 space-y-1">
            <div className="h-1.5 w-4/5 rounded-full bg-line" /><div className="h-1.5 w-3/5 rounded-full bg-line" />
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] text-ink-2">A · Thiazides</div>
            <div className="rounded-lg border border-success/25 bg-success-tint px-2.5 py-1.5 text-[11.5px] font-medium text-success">B · Loop diuretics</div>
            <div className="rounded-lg border border-line px-2.5 py-1.5 text-[11.5px] text-ink-2">C · Acetazolamide</div>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">OSCE station</p><span className="rounded-md bg-accent-tint px-1.5 py-0.5 text-[9px] font-bold text-accent-strong">Checklist</span></div>
          <ul className="mt-3 space-y-1.5 text-[11.5px] text-ink-2">
            <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Introduces self, confirms patient</li>
            <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Inspects JVP at 45°</li>
            <li className="flex items-center gap-1.5"><span className="text-success">✓</span>Auscultates the four areas</li>
            <li className="flex items-center gap-1.5 text-ink-3"><span>○</span>Offers to examine the ankles</li>
          </ul>
          <span className="mt-3 inline-block rounded-md bg-success-tint px-2 py-1 text-[10.5px] font-bold text-success">7 / 9 marks</span>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Clinical case</p><span className="rounded-md bg-primary-tint px-1.5 py-0.5 text-[9px] font-bold text-primary-strong">Stepwise</span></div>
          <div className="mt-3 space-y-1"><div className="h-1.5 w-full rounded-full bg-line" /><div className="h-1.5 w-2/5 rounded-full bg-line" /></div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-2">History</span>
            <span className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-2">Examination</span>
            <span className="rounded-full bg-primary-tint px-2.5 py-1 text-[10.5px] font-semibold text-primary-strong">Investigations</span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-3">The case unfolds as you commit — like the ward, not like a quiz.</p>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-3">Written question</p><span className="rounded-md bg-accent-tint px-1.5 py-0.5 text-[9px] font-bold text-accent-strong">Key words</span></div>
          <p className="mt-2.5 text-[12.5px] font-semibold text-ink">Explain neurohormonal compensation in HFrEF.</p>
          <p className="mt-2 text-[10.5px] font-semibold uppercase tracking-wide text-ink-3">What earns the mark:</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['RAAS activation', 'sympathetic drive', 'adverse remodelling', 'four pillars'].map((w) => (
              <span key={w} className="rounded-full bg-primary-tint px-2.5 py-1 text-[10.5px] font-semibold text-primary-strong">{w}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">One bank, four formats — each graded the way your faculty grades it.</p>
    </section>
  )
}
