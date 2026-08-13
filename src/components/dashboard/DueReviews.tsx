import { useMemo, useState } from 'react'
import { Flag, Play, ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dueReviewItems, type ReviewItem } from '@/data/reviewQueue'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { useMastery } from '@/lib/useMastery'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

const VISIBLE = 3

/** How many concepts one review session covers. */
const REVIEW_BATCH = 12

function accuracyTone(pct: number): 'danger' | 'warning' | 'success' {
  if (pct < 50) return 'danger'
  if (pct < 80) return 'warning'
  return 'success'
}

function DueBadge({ dueInDays }: { dueInDays: number }) {
  const t = useT()
  if (dueInDays < 0) return <Badge tone="danger">{t('Overdue')} {Math.abs(dueInDays)}{t('d')}</Badge>
  return <Badge tone="warning">{t('Due today')}</Badge>
}

/** A queue row, named and placed by the concept it refers to. */
interface DisplayItem extends ReviewItem {
  title: string
  subjectId: string
}

function ReviewRow({ item, index, onNavigate }: { item: DisplayItem; index: number; onNavigate?: () => void }) {
  const t = useT()
  return (
    <li>
      <Link
        to={`/app/qbank?concepts=${encodeURIComponent(item.conceptId)}`}
        onClick={onNavigate}
        className="group flex w-full items-start gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-inset"
      >
        <ChapterMark subjectId={item.subjectId} index={index + 1} compact className="mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">{item.title}</span>
            <DueBadge dueInDays={item.dueInDays} />
          </div>
          <div className="mt-1.5 flex items-center gap-2.5">
            <span className="shrink-0 text-[12px] text-ink-3">
              {item.attempts
                ? `${item.attempts} ${item.attempts === 1 ? t('answer') : t('answers')}`
                : t('practised only')}
            </span>
            {item.accuracyPct === null ? (
              // Nothing marked this concept, so there is no accuracy to draw.
              <span className="flex-1 text-[11.5px] text-ink-3">{t('No marked answers yet')}</span>
            ) : (
              <>
                <Meter value={item.accuracyPct} tone={accuracyTone(item.accuracyPct)} size="sm" className="max-w-[120px] flex-1" />
                <span className="tnum shrink-0 font-mono text-[11.5px] text-ink-2">{item.accuracyPct}%</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}

/**
 * The concepts this student should revisit today.
 *
 * Every row is a concept their own answers put here — the interval comes from
 * how well they did on it, and the accuracy shown is the accuracy recorded.
 * When there is nothing due, the panel says so rather than filling itself.
 */
export function DueReviews() {
  const t = useT()
  const [showAll, setShowAll] = useState(false)
  const { ledger } = useMastery()
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  const items = useMemo<DisplayItem[]>(() => {
    const byId = new Map(graph.concepts.map((concept) => [concept.id, concept]))
    return dueReviewItems(ledger).map((item) => {
      const concept = byId.get(item.conceptId)
      return {
        ...item,
        title: concept?.label ?? item.conceptId,
        subjectId: concept?.subjectId ?? '',
      }
    })
  }, [graph.concepts, ledger])

  const overdue = items.filter((item) => item.dueInDays < 0).length
  const visible = items.slice(0, VISIBLE)
  const hidden = items.length - visible.length
  const batch = items.slice(0, REVIEW_BATCH).map((item) => item.conceptId).join(',')

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={t('What deserves attention')}
        icon={Flag}
        action={overdue > 0 ? <Badge tone="danger">{overdue} {t('overdue')}</Badge> : undefined}
      />
      <p className="border-b border-line px-4 py-2 text-[12px] text-ink-3">{t('Concepts your answers put back in the queue.')}</p>

      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState
            icon={Flag}
            title={t('Nothing due')}
            description={t('Answer some questions and the concepts worth revisiting will collect here.')}
            action={<Link to="/app/qbank"><Button variant="primary" size="sm" iconLeft={Play}>{t('Open the question bank')}</Button></Link>}
          />
        </div>
      ) : (
        <>
          <div className="flex-1 p-2">
            <ul>
              {visible.map((item, index) => <ReviewRow key={item.conceptId} item={item} index={index} />)}
            </ul>
            {hidden > 0 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[12.5px] font-medium text-accent transition-colors hover:bg-accent-tint/40 hover:text-accent-strong"
              >
                {t('Show all')} · {items.length}
                <Icon icon={ArrowRight} size={14} className="rtl:-scale-x-100" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
            <span className="text-[12.5px] text-ink-2">
              <span className="tnum font-mono font-medium text-ink">{items.length}</span> {items.length === 1 ? t('concept') : t('concepts')}
            </span>
            <Link to={`/app/qbank?concepts=${encodeURIComponent(batch)}`}>
              <Button variant="primary" size="sm" iconLeft={Play}>{t('Start review')}</Button>
            </Link>
          </div>
        </>
      )}

      {showAll && (
        <div
          className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t('What deserves attention')}
          onMouseDown={() => setShowAll(false)}
        >
          <Panel
            className="animate-pop flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-md sm:rounded-xl sm:pb-0"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <PanelHeader
              title={t('What deserves attention')}
              icon={Flag}
              action={<IconButton icon={X} label={t('Close')} size="sm" onClick={() => setShowAll(false)} />}
            />
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              <ul>
                {items.map((item, index) => (
                  <ReviewRow key={item.conceptId} item={item} index={index} onNavigate={() => setShowAll(false)} />
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <span className="text-[12.5px] text-ink-2">
                <span className="tnum font-mono font-medium text-ink">{items.length}</span> {items.length === 1 ? t('concept') : t('concepts')}
              </span>
              <Link to={`/app/qbank?concepts=${encodeURIComponent(batch)}`} onClick={() => setShowAll(false)}>
                <Button variant="primary" size="sm" iconLeft={Play}>{t('Start review')}</Button>
              </Link>
            </div>
          </Panel>
        </div>
      )}
    </Panel>
  )
}
