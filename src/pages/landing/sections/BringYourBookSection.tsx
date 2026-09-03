import { Check } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

export function BringYourBookSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-2 lg:gap-16', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div>
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong"><span className="h-px w-6 bg-primary-strong" aria-hidden />07 · Bring your own book</p>
        <h2 className="mt-3 max-w-lg font-serif text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[36px]">Your material, <em className="font-serif italic text-primary-strong">our tools</em>.</h2>
        <ul className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-2">
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Upload any book and study on it freely</strong> in our advanced PDF editor — your material, our tools.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Write like it&rsquo;s paper.</strong> Natural handwritten ink, highlighters, shapes, and typed notes over any page — the fluid, tactile feel of Notability and GoodNotes.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Nothing gets lost.</strong> Every annotation is searchable and organised, so a marked-up book becomes a study asset, not a pile of PDFs.</span></li>
          <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /><span><strong className="font-semibold text-ink">Truly cross-platform, instantly synced</strong> — web, tablet, and phone, iOS and Android. Your ink follows you everywhere in real time.</span></li>
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-surface-2/60 p-4 sm:p-5">
        <div className="rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Guyton &amp; Hall · Chapter 22</p><span className="text-[10px] font-bold text-primary-strong">Your upload</span></div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-4/5 rounded-full bg-warning-tint" />
            <div className="h-2 w-full rounded-full bg-primary-line" />
            <div className="h-2 w-3/5 rounded-full bg-warning-tint" />
            <div className="h-2 w-2/3 rounded-full bg-line" />
          </div>
          <p className="mt-3 font-serif text-[12.5px] italic text-primary-strong">↴ the four pillars — this exact figure came in the 2025 paper ★</p>
        </div>

        <div className="mt-4 rounded-xl border border-line bg-surface p-5 shadow-panel">
          <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink-3">Synced in real time</p><span className="text-[10px] font-bold text-ink-3">Web · iOS · Android</span></div>
          <div className="mt-4 flex items-center justify-center gap-4">
            {['Web', 'iOS', 'Android'].map((platform) => (
              <div key={platform} className="relative flex h-16 w-11 items-center justify-center rounded-md border-2 border-line-2 bg-paper">
                <span className="h-0.5 w-5 rounded-full bg-primary" />
                <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-success text-on-primary"><Icon icon={Check} size={10} /></span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center font-serif text-[12.5px] italic text-ink-3">Ink, highlights, and typed notes over any page — searchable forever, synced everywhere.</p>
      </div>
    </section>
  )
}
