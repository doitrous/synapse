import { useMemo, useState, type ReactNode } from 'react'
import { Step } from '@/components/qbank/hub/TestBuilder'
import { BuilderSummary } from '@/components/qbank/hub/BuilderSummary'
import { CountPicker, DrawFromChips, SystemPicker } from './BankControls'
import { BankItemRow, BankItemRows, BankItemsEmpty } from './BankItemRow'
import { ItemFlagIconButton } from './ItemFlagButton'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useEssayPools } from './useBankPools'
import { subjects } from '@/data/subjects'
import { emptySplit, type MixedPools, type MixedSplit } from '@/data/mixedSession'
import { useT } from '@/lib/i18n'

/**
 * Which essays to draw from.
 *
 * `unwritten` predates the flagged and missed lists and is kept: "the ones I
 * have not done yet" is a different question from "the ones I got wrong", and
 * it is the one a student asks first.
 */
type EssayFilter = 'all' | 'unwritten' | 'flagged' | 'missed'

/**
 * The essay bank as a composer.
 *
 * The essay page lists every question and leaves the choosing to the student,
 * which is fine for browsing and useless the night before a written paper.
 * Here the sitting is specified — systems, how many, whether to skip what has
 * already been answered — and the same `EssayRunner` is mounted for each in turn.
 */
export function EssayBank({ onStart, stats }: {
  onStart: (pools: MixedPools, split: MixedSplit) => void
  /** The "Your progress" panel, under the summary in the end column. */
  stats?: ReactNode
}) {
  const t = useT()
  const { items: essays } = useLiveEssays()
  const { answers } = useEssayAnswers()
  const pools = useEssayPools()

  const [filter, setFilter] = useState<EssayFilter>('all')
  const [systems, setSystems] = useState<Set<string>>(new Set())
  const [count, setCount] = useState(3)

  const unwritten = useMemo(() => essays.filter((essay) => !answers[essay.id]?.text?.trim()), [essays, answers])
  // The pool first, then the systems and the length on top of it.
  const pool = filter === 'flagged' ? pools.flagged
    : filter === 'missed' ? pools.missed
      : filter === 'unwritten' ? unwritten : essays

  const matching = useMemo(
    () => pool.filter((essay) => systems.size === 0 || systems.has(essay.subjectId)),
    [pool, systems],
  )

  const systemIds = useMemo(() => {
    const present = new Set(pool.map((essay) => essay.subjectId))
    return subjects.map((subject) => subject.id).filter((id) => present.has(id))
  }, [pool])

  const countOf = (subjectId: string) => pool.filter((essay) => essay.subjectId === subjectId).length

  const filterLabel = filter === 'all' ? t('every essay')
    : filter === 'unwritten' ? t('essays you have not written yet')
      : filter === 'flagged' ? t('what you flagged') : t('what you missed')
  const systemLabel = systems.size === 0 ? t('every system')
    : systems.size === 1 ? t('1 system selected') : `${systems.size} ${t('systems selected')}`

  function start() {
    const serving = Math.min(count, matching.length)
    const split: MixedSplit = { ...emptySplit(), essay: serving }
    onStart({ mcq: [], practical: [], essay: matching.map((essay) => essay.id) }, split)
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-4">
          <Step
            number={1}
            label={t('Draw from')}
            note={t('Each essay is written, then revealed, then marked against its key points by you.')}
          >
            <DrawFromChips
              label={t('Draw from')}
              value={filter}
              onChange={(value) => setFilter(value as EssayFilter)}
              items={[
                { value: 'all', label: t('All essays'), count: essays.length },
                { value: 'unwritten', label: t('Not written yet'), count: unwritten.length },
                { value: 'flagged', label: t('Flagged'), count: pools.flagged.length },
                { value: 'missed', label: t('Missed'), count: pools.missed.length },
              ]}
            />
          </Step>

          <Step
            number={2}
            label={t('Systems')}
            note={systems.size === 0
              ? t('Nothing selected — essays are drawn from every system.')
              : t('Only the systems you picked are drawn from.')}
          >
            <SystemPicker ids={systemIds} value={systems} onChange={setSystems} countOf={countOf} />
          </Step>

          <Step number={3} label={t('Session')}>
            <CountPicker
              value={count}
              onChange={setCount}
              max={matching.length}
              lengths={[2, 3, 5]}
              label={t('Number of essays')}
            />
          </Step>

          {/* Not a numbered step: nothing here has to be decided. It is what
              the two above add up to, question by question — and the only
              place a student can flag an essay without first writing it. */}
          <section aria-labelledby="essay-draw-title">
            <h3 id="essay-draw-title" className="mb-2 text-[14px] font-semibold text-ink">
              {t('What it can draw from')}
            </h3>
            {matching.length === 0 ? (
              <BankItemsEmpty>
                {filter === 'flagged' ? t('Nothing flagged in the essay bank yet. Flag a question while writing it, or from this list.')
                  : filter === 'missed' ? t('Nothing has collected here yet. Mark an essay, and anything short of half the key points waits for you.')
                    : t('Nothing matches this yet. Widen the systems above, or draw from every essay.')}
              </BankItemsEmpty>
            ) : (
              <BankItemRows label={t('What it can draw from')}>
                {matching.map((essay) => (
                  <BankItemRow
                    key={essay.id}
                    title={essay.title}
                    subjectId={essay.subjectId}
                    action={<ItemFlagIconButton kind="essay" id={essay.id} title={essay.title} />}
                  />
                ))}
              </BankItemRows>
            )}
          </section>
        </div>

        <div className="min-w-0 space-y-4">
          <BuilderSummary
            matching={matching.length}
            pool={Math.max(essays.length, 1)}
            count={count}
            summary={`${filterLabel} · ${systemLabel}`}
            onStart={start}
          />
          {stats}
        </div>
      </div>
    </div>
  )
}
