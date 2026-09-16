import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Scale } from 'lucide-react'
import type { Question } from '@/data/qbank'
import { Button } from '@/components/ui/Button'
import { Meter } from '@/components/ui/Meter'
import { Step } from '@/components/qbank/hub/TestBuilder'
import { BuilderSummary } from '@/components/qbank/hub/BuilderSummary'
import { CountPicker, DrawFromChips } from './BankControls'
import { unionPool, useEssayPools, usePracticalPools } from './useBankPools'
import {
  MAX_MIXED_ITEMS,
  MIXED_KINDS,
  balancedSplit,
  clampSplit,
  splitTotal,
  type MixedKind,
  type MixedPools,
  type MixedSplit,
} from '@/data/mixedSession'
import { useT } from '@/lib/i18n'

const TONE: Record<MixedKind, 'primary' | 'success' | 'warning'> = {
  mcq: 'primary',
  practical: 'success',
  essay: 'warning',
}

/**
 * A sitting drawn from all three banks at once.
 *
 * An exam is not one format, and revising each format on its own day is how a
 * student arrives fluent in stems and lost in front of a station. The editor is
 * three counts that have to add up to the length: the arithmetic is visible
 * because "twenty questions, mostly MCQ" is a judgement the student is making,
 * not one to be made for them.
 */
export function MixedBank({
  questions,
  collections,
  onStart,
  stats,
}: {
  /** The MCQs available to this student — the bank's own published pool. */
  questions: Question[]
  /** The MCQs this student flagged, got wrong or left — the bank's own lists. */
  collections: Question[]
  onStart: (pools: MixedPools, split: MixedSplit) => void
  /** The "Your progress" panel, under the summary in the end column. */
  stats?: ReactNode
}) {
  const t = useT()
  const practicalPools = usePracticalPools()
  const essayPools = useEssayPools()

  /** Which pool each bank draws from: everything, or only what is waiting. */
  const [draw, setDraw] = useState<'all' | 'collections'>('all')

  const practicalCollected = useMemo(() => unionPool(practicalPools), [practicalPools])
  const essayCollected = useMemo(() => unionPool(essayPools), [essayPools])

  const pools: MixedPools = useMemo(() => (draw === 'collections'
    ? {
        mcq: collections.map((question) => question.id),
        practical: practicalCollected.map((entry) => entry.id),
        essay: essayCollected.map((essay) => essay.id),
      }
    : {
        mcq: questions.map((question) => question.id),
        practical: practicalPools.all.map((entry) => entry.id),
        essay: essayPools.all.map((essay) => essay.id),
      }), [draw, collections, questions, practicalCollected, essayCollected, practicalPools.all, essayPools.all])

  const collectedTotal = collections.length + practicalCollected.length + essayCollected.length

  const available: MixedSplit = useMemo(() => ({
    mcq: pools.mcq.length,
    practical: pools.practical.length,
    essay: pools.essay.length,
  }), [pools])

  const ceiling = Math.min(MAX_MIXED_ITEMS, splitTotal(available))
  const [total, setTotal] = useState(() => Math.min(6, Math.max(1, ceiling)))
  const [split, setSplit] = useState<MixedSplit>(() => balancedSplit(Math.min(6, Math.max(1, ceiling)), available))

  /**
   * Switching pool re-deals the split.
   *
   * "Flagged & missed" is a much smaller bank than "everything", so a split
   * chosen against the whole bank is usually unfillable the moment the pool
   * narrows — and leaving it there would present a Start button that stays
   * disabled with no obvious reason. Guarded on the draw actually changing, so
   * this never overwrites a split the student is in the middle of typing.
   */
  const lastDraw = useRef(draw)
  useEffect(() => {
    if (lastDraw.current === draw) return
    lastDraw.current = draw
    const next = Math.max(1, Math.min(total, ceiling))
    setTotal(next)
    setSplit(balancedSplit(next, available))
  }, [draw, total, ceiling, available])

  // The banks are read from live content, so a publish while the page is open
  // can shrink one of them under a share the student already chose. Clamping
  // here means the composer can never ask for an item that is no longer there.
  useEffect(() => {
    setSplit((current) => {
      const clamped = clampSplit(current, available)
      return MIXED_KINDS.every((kind) => clamped[kind] === current[kind]) ? current : clamped
    })
  }, [available])

  const chosen = splitTotal(split)
  const balanced = chosen === total
  const labels: Record<MixedKind, string> = {
    mcq: t('MCQ questions'),
    practical: t('Practical items'),
    essay: t('Essays'),
  }

  function setShare(kind: MixedKind, value: number) {
    setSplit((current) => clampSplit({ ...current, [kind]: value }, available))
  }

  function start() {
    onStart(pools, split)
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-4">
          <Step
            number={1}
            label={t('Draw from')}
            note={draw === 'all'
              ? t('Every bank, everything published in it.')
              : t('Each bank contributes only what you flagged or missed in it.')}
          >
            <DrawFromChips
              label={t('Draw from')}
              value={draw}
              onChange={(value) => { setDraw(value as 'all' | 'collections') }}
              items={[
                { value: 'all', label: t('All banks'), count: questions.length + practicalPools.all.length + essayPools.all.length },
                { value: 'collections', label: t('Flagged & missed'), count: collectedTotal },
              ]}
            />
          </Step>

          <Step
            number={2}
            label={t('How long')}
            note={t('One queue, run in order. Each item opens in the runner its own bank uses.')}
          >
            <CountPicker
              value={total}
              onChange={(next) => { setTotal(next); setSplit(balancedSplit(next, available)) }}
              max={ceiling}
              lengths={[6, 12, 20]}
              label={t('Number of items')}
            />
          </Step>

          <Step
            number={3}
            label={t('Split between the banks')}
            badge={(
              <Button variant="secondary" size="sm" iconLeft={Scale} onClick={() => setSplit(balancedSplit(total, available))}>
                {t('Balance')}
              </Button>
            )}
            note={balanced
              ? undefined
              : t('The three add up to {chosen} — the sitting is {total}.')
                .replace('{chosen}', String(chosen))
                .replace('{total}', String(total))}
          >
            <div className="space-y-3">
              {MIXED_KINDS.map((kind) => (
                <div key={kind} className="flex items-center gap-3">
                  <label htmlFor={`mixed-share-${kind}`} className="w-32 shrink-0 text-[12.5px] font-medium text-ink-2">
                    {labels[kind]}
                  </label>
                  <input
                    id={`mixed-share-${kind}`}
                    type="number"
                    min={0}
                    max={available[kind]}
                    value={split[kind]}
                    onChange={(event) => setShare(kind, Math.max(0, Number(event.target.value) || 0))}
                    className="h-9 w-20 shrink-0 rounded-md border border-line bg-surface px-2.5 text-[13.5px] text-ink focus:border-primary focus:outline-none"
                  />
                  <Meter
                    value={split[kind]}
                    max={Math.max(total, 1)}
                    tone={TONE[kind]}
                    size="lg"
                    className="min-w-0 flex-1"
                  />
                  <span className="tnum w-24 shrink-0 text-end text-[11.5px] text-ink-3">
                    {t('of {n} available').replace('{n}', String(available[kind]))}
                  </span>
                </div>
              ))}
            </div>
            {/* The meters read as a share of the sitting; this reads as the sum,
                which is the number that has to be right before Start unlocks. */}
            <p className="mt-3 border-t border-line pt-3 text-[12.5px] text-ink-2">
              <span className="tnum font-mono text-[15px] font-semibold text-ink">{chosen}</span>
              {' / '}
              <span className="tnum font-mono text-[13px] text-ink-2">{total}</span>
              {' '}
              {balanced ? t('items chosen') : t('items chosen — adjust or press Balance')}
            </p>
          </Step>
        </div>

        <div className="min-w-0 space-y-4">
          <BuilderSummary
            matching={chosen}
            pool={Math.max(splitTotal(available), 1)}
            count={chosen}
            disabled={!balanced || chosen === 0}
            summary={MIXED_KINDS
              .filter((kind) => split[kind] > 0)
              .map((kind) => `${split[kind]} ${labels[kind].toLowerCase()}`)
              .join(' · ') || t('Nothing chosen yet')}
            onStart={start}
          />
          {stats}
        </div>
      </div>
    </div>
  )
}
