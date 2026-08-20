import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Kbd } from '@/components/ui/Kbd'
import { Meter } from '@/components/ui/Meter'
import { cn } from '@/lib/cn'
import { dayDiff } from '@/lib/format'
import { useT } from '@/lib/i18n'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import type { DailyDeckCounts } from '@/lib/useDecks'
import { grade as computeGrade, newCard, ANKI_DEFAULTS, type CardSchedule, type Grade } from '@/data/srs'
import { dueQueue, type DeckCard, type StudyCard } from '@/data/decks'

const GRADES: Grade[] = ['again', 'hard', 'good', 'easy']
const GRADE_LABEL: Record<Grade, string> = { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' }
// Tinted to read at a glance without inventing a fifth button variant: danger
// for "forgot", success for "knew it cold", and the two in between left quiet.
const GRADE_TONE: Record<Grade, string> = {
  again: 'border-danger/30 bg-danger-tint text-danger hover:brightness-95',
  hard: 'border-line-2 bg-surface text-ink hover:bg-surface-2',
  good: 'border-primary-strong/25 bg-primary text-on-primary shadow-action hover:bg-primary-hover',
  easy: 'border-success/30 bg-success-tint text-success hover:brightness-95',
}

/**
 * Compact, Anki-style interval text: "10m", "4d", "3mo", "1y".
 *
 * A learning or relearning card is scheduled in minutes off its `due`
 * timestamp; a review card carries its interval in whole days directly.
 * Reading the field that matches the state is what keeps a fresh "Good" from
 * reporting "0d" instead of the minutes it actually waits.
 */
function formatInterval(schedule: CardSchedule, from: Date): string {
  if (schedule.state === 'review') {
    const days = schedule.interval
    if (days < 30) return `${days}d`
    if (days < 365) return `${Math.max(1, Math.round(days / 30))}mo`
    return `${(days / 365).toFixed(days < 3650 ? 1 : 0)}y`
  }
  const minutes = Math.max(1, Math.round((Date.parse(schedule.due) - from.getTime()) / 60_000))
  if (minutes < 60) return `${minutes}m`
  return `${Math.round(minutes / 60)}h`
}

export interface CardRunnerProps {
  deckId: string
  title: string
  /** Empty for a self-authored deck: `StoredDeck` carries no subject of its own. */
  subjectId: string
  cards: DeckCard[]
  schedules: Record<string, CardSchedule>
  dailyCounts: DailyDeckCounts
  onGrade: (cardId: string, next: CardSchedule) => void
  onExit: () => void
}

/**
 * One card at a time: the front, a reveal, then four grades that each show the
 * interval they would produce. Every number on the buttons comes out of
 * `grade()` itself, so a change to `ANKI_DEFAULTS` can never leave a label
 * telling the student something the scheduler no longer does.
 */
export function CardRunner({ deckId, title, subjectId, cards, schedules, dailyCounts, onGrade, onExit }: CardRunnerProps) {
  const t = useT()
  const logAttempt = useRecordAttempt()
  const containerRef = useRef<HTMLDivElement>(null)
  const [sessionId] = useState(() => `card-${deckId}-${Date.now().toString(36)}`)

  const cardById = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards])

  // Snapshotted once, at mount: a session works through what was due when the
  // student sat down. A live re-derivation would let a card graded "Again"
  // with a one-minute step grow back into the list the moment that minute
  // passes, turning one pass through the deck into an open-ended loop.
  const [queue, setQueue] = useState<StudyCard[]>(() => {
    const now = new Date()
    const all = cards.map((card) => ({ id: card.id, schedule: schedules[card.id] ?? newCard(now) }))
    return dueQueue(all, now, ANKI_DEFAULTS, dailyCounts)
  })
  const [total] = useState(queue.length)
  const [showAnswer, setShowAnswer] = useState(false)
  const [studied, setStudied] = useState(0)
  const [graduated, setGraduated] = useState(0)

  useEffect(() => { containerRef.current?.focus() }, [])

  const current = queue[0]
  const currentCard = current ? cardById.get(current.id) : undefined

  function commit(answer: Grade) {
    if (!current || !currentCard) return
    const now = new Date()
    const next = computeGrade(current.schedule, answer, now, ANKI_DEFAULTS)
    onGrade(current.id, next)
    // No verdict is logged: the student is reporting how well they knew the
    // card, not confirming a keyed answer — see the comment on `correct` in
    // `src/data/attempts.ts` for why that is `null` rather than a guess.
    logAttempt({
      surface: 'card',
      itemId: `${deckId}:${current.id}`,
      subjectId,
      topic: title,
      difficulty: 'Moderate',
      conceptIds: [],
      correct: null,
      seconds: null,
      sessionId,
    })
    setStudied((n) => n + 1)
    if (dayDiff(new Date(next.due), now) > 0) setGraduated((n) => n + 1)
    setQueue((q) => q.slice(1))
    setShowAnswer(false)
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const target = event.target as HTMLElement
    // The deck screens this runner is opened from have a name field and card
    // fields of their own; stealing "1" out from under someone typing there
    // would be worse than not offering the shortcut at all.
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
    if (!currentCard) return
    if (event.key === ' ' && !showAnswer) {
      event.preventDefault()
      setShowAnswer(true)
      return
    }
    if (!showAnswer) return
    const index = { '1': 0, '2': 1, '3': 2, '4': 3 }[event.key]
    if (index === undefined) return
    event.preventDefault()
    commit(GRADES[index])
  }

  if (!currentCard) {
    return (
      <div className="mx-auto max-w-[42rem] px-4 py-6 sm:px-6">
        <BackLink onExit={onExit} title={title} />
        <Panel className="p-10 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full border border-line bg-surface-2 text-ink-3">
            <Icon icon={studied > 0 ? CheckCircle2 : RotateCcw} size={22} />
          </div>
          <h2 className="mt-3 font-serif text-[19px] font-semibold text-ink">
            {studied > 0 ? t('Session complete') : t('Nothing due right now')}
          </h2>
          {/* No score. A flashcard grade is a self-report, not a mark — showing
              a percentage here would imply an accuracy that was never measured. */}
          <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">
            {studied > 0 ? (
              <>
                {t('You studied')} <span className="tnum font-medium text-ink">{studied}</span>{' '}
                {studied === 1 ? t('card') : t('cards')}
                {graduated > 0 && (
                  <>
                    {' · '}
                    <span className="tnum font-medium text-ink">{graduated}</span>{' '}
                    {t('will come back tomorrow or later.')}
                  </>
                )}
              </>
            ) : (
              t('You are all caught up on this deck for today.')
            )}
          </p>
          <Button className="mt-5" variant="secondary" onClick={onExit}>{t('Back to Flashcards')}</Button>
        </Panel>
      </div>
    )
  }

  const position = total - queue.length + 1
  const now = new Date()

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="mx-auto max-w-[42rem] px-4 py-6 outline-none sm:px-6"
    >
      <BackLink onExit={onExit} title={title} />

      <div className="mb-4 flex items-center gap-3">
        <Meter value={position} max={total} className="flex-1" />
        <span className="tnum shrink-0 font-mono text-[12px] text-ink-3">{position} / {total}</span>
      </div>

      <Panel className="flex min-h-[16rem] flex-col justify-center p-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Front')}</p>
        <p className="mt-3 font-serif text-[20px] font-medium leading-snug text-ink">{currentCard.front}</p>

        {showAnswer ? (
          <div className="mt-6 border-t border-line pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Back')}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{currentCard.back}</p>
          </div>
        ) : (
          <>
            <Button className="mx-auto mt-6" variant="primary" onClick={() => setShowAnswer(true)}>
              {t('Show answer')}
            </Button>
            <p className="mt-2.5 text-[11.5px] text-ink-3">{t('Press')} <Kbd>Space</Kbd></p>
          </>
        )}
      </Panel>

      {showAnswer && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {GRADES.map((answer) => {
              const next = computeGrade(current.schedule, answer, now, ANKI_DEFAULTS)
              return (
                <button
                  key={answer}
                  type="button"
                  onClick={() => commit(answer)}
                  className={cn(
                    'rounded-lg border px-3 py-3 text-[13.5px] font-semibold transition-colors active:translate-y-px',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                    GRADE_TONE[answer],
                  )}
                >
                  {t(GRADE_LABEL[answer])} · {formatInterval(next, now)}
                </button>
              )
            })}
          </div>
          <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11.5px] text-ink-3">
            {GRADES.map((answer, index) => (
              <span key={answer} className="inline-flex items-center gap-1">
                <Kbd>{index + 1}</Kbd>{t(GRADE_LABEL[answer])}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  )
}

function BackLink({ onExit, title }: { onExit: () => void; title: string }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={onExit}
      className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
    >
      <Icon icon={ArrowLeft} size={15} />
      {t('Back to Flashcards')} · {title}
    </button>
  )
}
