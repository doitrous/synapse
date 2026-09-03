import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

const ROAD_MILESTONES = [
  { x: 40, y: 130, label: 'Day one' },
  { x: 360, y: 60, label: 'Years 1–3' },
  { x: 680, y: 110, label: 'Clinical years' },
  { x: 1000, y: 50, label: 'Residency & boards' },
] as const

/**
 * "One method, the whole road" — the road as a single SVG path built from
 * ROAD_MILESTONES, with each milestone <circle> placed at the exact (x, y)
 * from the same array element used to build that path segment. A cubic
 * Bézier always passes through its own start/end anchors, so the dots
 * cannot drift off the drawn line the way two independently-authored
 * coordinate sets could (the bug being fixed here).
 */
function RoadTimeline() {
  const d = ROAD_MILESTONES.slice(1).reduce((path, point, i) => {
    const prev = ROAD_MILESTONES[i]
    const half = (point.x - prev.x) / 2
    return `${path} C${prev.x + half},${prev.y} ${point.x - half},${point.y} ${point.x},${point.y}`
  }, `M${ROAD_MILESTONES[0].x},${ROAD_MILESTONES[0].y}`)

  return (
    <svg viewBox="0 0 1040 210" className="w-full" aria-hidden="true">
      <path d={d} fill="none" stroke="var(--color-primary-line)" strokeWidth="6" strokeLinecap="round" />
      <path d={d} fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" pathLength={100} strokeDasharray="58 100" />
      {ROAD_MILESTONES.map((p, i) => {
        const isLast = i === ROAD_MILESTONES.length - 1
        return (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isLast ? 11 : 9 - i * 1.5}
              fill={isLast ? 'var(--color-surface)' : 'var(--color-primary)'}
              stroke="var(--color-primary)"
              strokeWidth={isLast ? 4 : 0}
            />
            <text
              x={p.x}
              y={190}
              textAnchor={i === 0 ? 'start' : isLast ? 'end' : 'middle'}
              className="text-[11px] font-bold uppercase tracking-wide"
              fill={i === 0 || isLast ? 'var(--color-primary-strong)' : 'var(--color-ink-2)'}
            >
              {p.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function RoadmapSection({ className, id }: { className?: string; id?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section id={id} ref={ref} className={cn('grid scroll-mt-24 gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div>
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">
          <span className="h-px w-6 bg-primary-strong" aria-hidden />01 · Who we are
        </p>
        <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">
          A decade with the doctors <em className="text-primary-strong not-italic font-serif italic">above</em> you.
        </h2>
        <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Built by Connect,</strong> with more than ten years guiding postgraduate medical students. We have already taught the exams you are heading toward — now we teach you from day one.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">The international method, from your very first day.</strong> We bring the way the world&rsquo;s best doctors study to the Egyptian curriculum, so you learn it right the first time.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Don&rsquo;t study medicine twice.</strong> Most students relearn how to study halfway through. Nishany builds the postgraduate mindset from the second you step into medicine.</span></li>
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">The Connect pedigree</p>
            <span className="font-mono text-[10px] font-bold text-primary-strong">10+ years</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-primary text-[10px] font-bold text-primary-strong">10y</span>
            <div>
              <p className="text-[13.5px] font-semibold text-ink">Teaching postgraduate doctors since 2015</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">The exams at the end of your road are the ones we already teach. Nishany moves that method to day one.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">One method, the whole road</p>
            <span className="font-mono text-[10px] font-bold text-ink-3">No relearning</span>
          </div>
          <div className="mt-3">
            <RoadTimeline />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel">
          <p className="flex-1 font-serif text-[13.5px] italic leading-relaxed text-ink-2">
            &ldquo;Adapt to the international system early — by the time it matters, it is already how you think.&rdquo;
          </p>
          <span className="shrink-0 rounded-full bg-primary-tint px-3 py-1.5 text-[10.5px] font-semibold text-primary-strong">The Nishany promise</span>
        </div>

        <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Ten years of postgraduate teaching, folded back into year one.</p>
      </div>
    </section>
  )
}
