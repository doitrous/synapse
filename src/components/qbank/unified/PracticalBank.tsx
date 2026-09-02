import { useMemo, useState, type ReactNode } from 'react'
import { Segmented } from '@/components/ui/Tabs'
import { Step } from '@/components/qbank/hub/TestBuilder'
import { BuilderSummary } from '@/components/qbank/hub/BuilderSummary'
import { CountPicker, DrawFromChips, SystemPicker } from './BankControls'
import { BankItemRow, BankItemRows, BankItemsEmpty } from './BankItemRow'
import { ItemFlagIconButton } from './ItemFlagButton'
import { usePracticalCatalogue, type PracticalEntry } from './practicalCatalogue'
import { usePracticalPools } from './useBankPools'
import { subjects } from '@/data/subjects'
import { emptySplit, type MixedPools, type MixedSplit } from '@/data/mixedSession'
import { useT } from '@/lib/i18n'

/** Which kind of practical item the sitting draws from. */
type PracticalFilter = 'all' | 'osce' | 'case' | 'lab'

/** Which of the student's own lists the sitting is drawn out of. */
type PracticalDraw = 'all' | 'flagged' | 'missed'

/** What one item is, on its own row. Shared with the flagged-and-missed lists. */
const KIND_LABEL: Record<PracticalEntry['kind'], string> = {
  osce: 'OSCE station',
  case: 'Clinical case',
  lab: 'Lab & imaging set',
}

/**
 * The practical bank as a composer.
 *
 * Practical used to be four tabbed lists a student scrolled and clicked one row
 * of. Composed here it answers the question the page is actually for — "give me
 * five stations from the systems I am weakest in" — and hands the queue to the
 * same runner the Practical page mounts, item by item.
 */
export function PracticalBank({ onStart, stats }: {
  onStart: (pools: MixedPools, split: MixedSplit) => void
  /** The "Your progress" panel, under the summary in the end column. */
  stats?: ReactNode
}) {
  const t = useT()
  const catalogue = usePracticalCatalogue()
  const pools = usePracticalPools()

  const [draw, setDraw] = useState<PracticalDraw>('all')
  const [filter, setFilter] = useState<PracticalFilter>('all')
  const [systems, setSystems] = useState<Set<string>>(new Set())
  const [count, setCount] = useState(5)

  // The pool first, then the kind and the systems on top of it — so "the
  // cardiology stations I flagged" is three presses rather than a list you can
  // only look at.
  const pool = draw === 'flagged' ? pools.flagged : draw === 'missed' ? pools.missed : pools.all

  const matching = useMemo(() => pool.filter((entry) => (
    (filter === 'all' || entry.kind === filter) && (systems.size === 0 || systems.has(entry.subjectId))
  )), [pool, filter, systems])

  const systemIds = useMemo(() => {
    const present = new Set(pool.map((entry) => entry.subjectId))
    return subjects.map((subject) => subject.id).filter((id) => present.has(id))
  }, [pool])

  const countOf = (subjectId: string) => pool.filter((entry) => entry.subjectId === subjectId).length
  const serving = Math.min(count, matching.length)

  const drawLabel = draw === 'flagged' ? t('what you flagged')
    : draw === 'missed' ? t('what you missed') : t('the whole practical bank')
  const kindLabel = filter === 'all' ? t('every practical item')
    : filter === 'osce' ? t('OSCE stations and checklists')
      : filter === 'case' ? t('clinical cases')
        : t('lab and imaging sets')
  const systemLabel = systems.size === 0 ? t('every system')
    : systems.size === 1 ? t('1 system selected') : `${systems.size} ${t('systems selected')}`
  const minutes = matching.slice(0, serving).reduce((sum: number, entry: PracticalEntry) => sum + (entry.minutes ?? 0), 0)
  const timing = minutes > 0 ? ` · ${t('about {n} minutes').replace('{n}', String(minutes))}` : ''

  function start() {
    const split: MixedSplit = { ...emptySplit(), practical: serving }
    onStart({ mcq: [], practical: matching.map((entry) => entry.id), essay: [] }, split)
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-4">
          <Step
            number={1}
            label={t('Draw from')}
            note={draw === 'all'
              ? t('Every practical item published for you.')
              : t('Narrowed to one of your own lists — the systems and length below still apply.')}
          >
            <DrawFromChips
              label={t('Draw from')}
              value={draw}
              onChange={(value) => setDraw(value as PracticalDraw)}
              items={[
                { value: 'all', label: t('All items'), count: pools.all.length },
                { value: 'flagged', label: t('Flagged'), count: pools.flagged.length },
                { value: 'missed', label: t('Missed'), count: pools.missed.length },
              ]}
            />
          </Step>

          <Step
            number={2}
            label={t('Kind of item')}
            note={t('Stations are timed against a mark scheme; cases and interpretation sets run step by step.')}
          >
            <Segmented
              value={filter}
              onChange={(value) => setFilter(value as PracticalFilter)}
              items={[
                { value: 'all', label: t('Everything') },
                { value: 'osce', label: t('OSCE stations') },
                { value: 'case', label: t('Clinical cases') },
                { value: 'lab', label: t('Lab & imaging') },
              ]}
            />
          </Step>

          <Step
            number={3}
            label={t('Systems')}
            note={systems.size === 0
              ? t('Nothing selected — items are drawn from every system.')
              : t('Only the systems you picked are drawn from.')}
          >
            <SystemPicker ids={systemIds} value={systems} onChange={setSystems} countOf={countOf} />
          </Step>

          <Step number={4} label={t('Session')}>
            <CountPicker
              value={count}
              onChange={setCount}
              max={matching.length}
              label={t('Number of items')}
            />
          </Step>

          {/* Not a numbered step: nothing here has to be decided. It is what
              the steps above add up to, item by item — and the only place a
              student can flag a station without first sitting it. */}
          <section aria-labelledby="practical-draw-title">
            <h3 id="practical-draw-title" className="mb-2 text-[14px] font-semibold text-ink">
              {t('What it can draw from')}
            </h3>
            {matching.length === 0 ? (
              <BankItemsEmpty>
                {draw === 'flagged' ? t('Nothing flagged in the practical bank yet. Flag an item while sitting it, or from this list.')
                  : draw === 'missed' ? t('Nothing has collected here yet. Sit a practical item and whatever did not go well waits for you.')
                    : t('Nothing matches this yet. Widen the kind or the systems above.')}
              </BankItemsEmpty>
            ) : (
              <BankItemRows label={t('What it can draw from')}>
                {matching.map((entry) => (
                  <BankItemRow
                    key={entry.id}
                    title={entry.title}
                    subjectId={entry.subjectId}
                    kindLabel={t(KIND_LABEL[entry.kind])}
                    action={<ItemFlagIconButton kind="practical" id={entry.id} title={entry.title} />}
                  />
                ))}
              </BankItemRows>
            )}
          </section>
        </div>

        <div className="min-w-0 space-y-4">
          <BuilderSummary
            matching={matching.length}
            pool={Math.max(catalogue.entries.length, 1)}
            count={count}
            summary={`${drawLabel} · ${kindLabel} · ${systemLabel}${timing}`}
            onStart={start}
          />
          {stats}
        </div>
      </div>
    </div>
  )
}
