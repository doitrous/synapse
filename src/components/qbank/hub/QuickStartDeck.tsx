import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Button } from '@/components/ui/Button'
import type { TestBuilderPreset } from './TestBuilder'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * The quick starts, one at a time, beside the composer instead of above it.
 *
 * As a row of four chips across the top they cost the composer a whole band of
 * vertical space before the student had made a single decision — and the
 * decision they represent ("just give me something") is an alternative to the
 * composer, not a step of it. Paged in the end column they stay one press away
 * and take nothing from the column where the work happens.
 *
 * One card is on screen at a time, so the title is announced when it changes:
 * pressing an arrow otherwise changes something a screen-reader user has no
 * way to notice. The arrows and the counter live in the header row rather than
 * either side of the card, so the card has the whole column to put a title in.
 */
export function QuickStartDeck({ presets }: { presets: TestBuilderPreset[] }) {
  const t = useT()
  const [index, setIndex] = useState(0)

  if (!presets.length) return null
  // Guards a preset list that shortens under a filter while a later card is on
  // screen — the index would otherwise point past the end.
  const at = Math.min(index, presets.length - 1)
  const preset = presets[at]
  const empty = preset.count === 0

  const step = (delta: number) => setIndex((current) => {
    const next = (Math.min(current, presets.length - 1) + delta + presets.length) % presets.length
    return next
  })

  return (
    <section className="rounded-xl border border-line bg-surface p-4 shadow-panel" aria-labelledby="quick-start-title">
      {/* The paging control sits in the header rather than either side of the
          card. Two tall arrows flanking a 17 rem column left the card about
          13 rem wide, and the longest preset title was truncating in a panel
          whose whole job is to say what Start would open. */}
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <h2 id="quick-start-title" className="text-[14px] font-semibold text-ink">{t('Quick start')}</h2>
        <div className="flex shrink-0 items-center gap-0.5">
          <IconButton
            icon={ChevronLeft}
            size="sm"
            label={t('Previous preset')}
            className="rtl:-scale-x-100"
            onClick={() => step(-1)}
          />
          <span className="tnum font-mono text-[11.5px] text-ink-3">{at + 1} / {presets.length}</span>
          <IconButton
            icon={ChevronRight}
            size="sm"
            label={t('Next preset')}
            className="rtl:-scale-x-100"
            onClick={() => step(1)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-line bg-surface-2/40 p-3">
        <div className="flex items-center gap-2">
          <Icon icon={preset.icon} size={15} className={empty ? 'text-ink-3' : 'text-primary'} />
          {/* Announced on change: one card is on screen, and pressing an
              arrow is otherwise a silent change of what Start would open. */}
          <p aria-live="polite" className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">
            {preset.label}
          </p>
          <span className="tnum shrink-0 rounded-full bg-inset px-1.5 font-mono text-[11px] text-ink-2">{preset.count}</span>
        </div>
        <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-ink-3">{preset.description}</p>
        <Button
          variant="secondary"
          size="sm"
          className={cn('mt-2.5 w-full', empty && 'pointer-events-none opacity-55')}
          disabled={empty}
          title={empty ? t('No questions match this yet') : undefined}
          onClick={() => { if (!empty) preset.apply() }}
        >
          {t('Start this')}
        </Button>
      </div>
    </section>
  )
}
