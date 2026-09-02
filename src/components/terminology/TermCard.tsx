import { useState, type KeyboardEvent } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import type { MedicalTerm } from '@/data/glossary'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * One term as a card you turn over.
 *
 * The front shows only the term in both languages, so the student has to
 * recall the meaning before seeing it — the page used to print every
 * definition beside every term, which reads as a list and teaches nothing.
 * "Got it" is the one thing a student can say about a term, and it is what
 * fills the ring on the hub.
 */
export function TermCard({
  term,
  known,
  onToggleKnown,
  style,
}: {
  term: MedicalTerm
  known: boolean
  onToggleKnown: () => void
  style?: React.CSSProperties
}) {
  const t = useT()
  const [flipped, setFlipped] = useState(false)

  // Space turns the card, Enter answers it ("Got it") — the two questions a
  // card asks, on the two keys a student reaches for.
  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    if (event.key === ' ') { event.preventDefault(); setFlipped((current) => !current) }
    if (event.key === 'Enter') { event.preventDefault(); onToggleKnown() }
  }

  return (
    <div className="term-card group/term relative min-h-[11.5rem]" style={{ perspective: '1200px', ...style }}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${term.term} — ${flipped ? t('showing meaning') : t('tap to reveal the meaning')}. ${t('Space flips, Enter marks it known')}`}
        onClick={() => setFlipped((current) => !current)}
        onKeyDown={onKey}
        className="term-card-inner relative h-full min-h-[11.5rem] w-full cursor-pointer rounded-xl text-start outline-none focus-visible:[&>*]:outline-2 focus-visible:[&>*]:outline-offset-2 focus-visible:[&>*]:outline-[var(--color-primary)]"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 420ms var(--ease-out-quint)', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* front */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col rounded-xl border bg-surface p-4 shadow-panel transition-[border-color,box-shadow] duration-[var(--dur-base)]',
            known ? 'border-success/40' : 'border-line group-hover/term:border-line-2 group-hover/term:shadow-raised',
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-serif text-[21px] font-semibold leading-tight text-ink">{term.term}</p>
            {known && (
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success-tint text-success" aria-hidden>
                <Check size={13} strokeWidth={2.4} />
              </span>
            )}
          </div>
          <p lang="ar" dir="rtl" className="mt-1.5 text-[18px] font-semibold text-primary-strong">{term.ar}</p>
          <p className="mt-auto pt-4 text-[11.5px] text-ink-3">{t('Tap to reveal')}</p>
        </div>
        {/* back */}
        <div
          className="absolute inset-0 flex flex-col rounded-xl border border-mist-line bg-mist p-4 shadow-panel"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[13px] font-semibold text-on-mist">{term.term}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-ink-3"><Icon icon={RotateCcw} size={12} />{t('flip back')}</span>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-on-mist">{term.def}</p>
          <p lang="ar" dir="rtl" className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{term.defAr}</p>
          {term.example && (
            <p className="mt-2 text-[12px] italic text-ink-2"><span className="font-semibold not-italic">{t('e.g.')} </span>{term.example}</p>
          )}
        </div>
      </div>
      {/* known toggle lives outside the flipping surface so it stays put */}
      <button
        type="button"
        onClick={(event) => { event.stopPropagation(); onToggleKnown() }}
        aria-pressed={known}
        className={cn(
          'absolute bottom-3 end-3 inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-semibold transition-colors sm:h-9 sm:px-3',
          known
            ? 'border-success/30 bg-success-tint text-success hover:bg-success/10'
            : 'border-line bg-surface text-ink-2 hover:border-primary-line hover:text-primary-strong',
        )}
      >
        <Check size={13} strokeWidth={2.4} />
        {known ? t('Got it') : t('Mark as known')}
      </button>
    </div>
  )
}
