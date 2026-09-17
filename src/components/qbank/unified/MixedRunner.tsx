import { useMemo, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import type { Question } from '@/data/qbank'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { QuestionView } from '@/components/qbank/QuestionView'
import { PracticalRunner } from '@/components/practical/PracticalRunner'
import { EssayRunner } from '@/components/essay/EssayRunner'
import { usePracticalCatalogue, type PracticalEntry } from './practicalCatalogue'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { useAttemptHistory, useRecordAttempt } from '@/lib/useAttemptLog'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { missedPracticalIds, practicalLastAt } from '@/data/practicalCollections'
import { currentMixedItem, type MixedItem, type MixedKind, type MixedSession } from '@/data/mixedSession'
import { useT } from '@/lib/i18n'

export interface MixedRunnerProps {
  session: MixedSession
  /** The MCQ pool, passed down rather than refetched — the page already holds it. */
  questions: Question[]
  /** Record the item on screen. Only an MCQ is marked against a key. */
  onMark: (correct: boolean) => void
  /** Leave this item for the next one, or for the summary. */
  onNext: () => void
  /** Abandon the sitting. */
  onEnd: () => void
}

/** Which bank the item on screen came from, in words. */
function kindLabel(kind: MixedKind, t: (value: string) => string): string {
  if (kind === 'mcq') return t('MCQ question')
  if (kind === 'practical') return t('Practical item')
  return t('Essay')
}

/**
 * Where the sitting is, above whichever runner is mounted below it.
 *
 * The three runners each own their whole screen and none of them knows it is
 * part of anything, so the only place the queue can be shown is here — and it
 * has to be shown, or a student four items into a mixed test has no way to know
 * how many are left or that the practical station is not the whole sitting.
 */
function Progress({ session, item, onEnd }: { session: MixedSession; item: MixedItem; onEnd: () => void }) {
  const t = useT()
  const position = session.cursor + 1
  return (
    <div className="mx-auto max-w-[1040px] px-4 pt-5 sm:px-6">
      <Panel className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-ink">{t('Mixed test')}</p>
          <p className="tnum mt-0.5 text-[12.5px] text-ink-2">
            {t('Item {n} of {total}').replace('{n}', String(position)).replace('{total}', String(session.items.length))}
          </p>
        </div>
        <Badge tone="outline">{kindLabel(item.kind, t)}</Badge>
        <Meter
          value={session.cursor}
          max={Math.max(session.items.length, 1)}
          size="sm"
          className="min-w-[8rem] flex-1"
        />
        <Button variant="ghost" size="sm" iconLeft={X} onClick={onEnd}>{t('End test')}</Button>
      </Panel>
    </div>
  )
}

/**
 * One MCQ inside a mixed sitting.
 *
 * `QuestionView` is the same component the question bank puts on screen, so
 * the question, its options and its explanation are identical here. What is
 * different is only what happens after an answer: a mixed sitting marks at
 * once and moves on, because the next item may not be an MCQ at all and there
 * is no end-of-block report to defer an explanation to.
 */
function McqStep({ question, onMark, onNext, last }: {
  question: Question
  onMark: (correct: boolean) => void
  onNext: () => void
  last: boolean
}) {
  const t = useT()
  const record = useRecordAttempt()
  const [chosen, setChosen] = useState<number | null>(null)
  const revealed = chosen !== null

  function choose(index: number) {
    if (revealed) return
    setChosen(index)
    const correctIndex = question.options.findIndex((option) => option.correct)
    const correct = Boolean(question.options[index]?.correct)
    onMark(correct)
    // Through the bank's own log, so a mixed sitting counts toward accuracy,
    // streaks and weakest topics exactly as a question-bank sitting does.
    record({
      surface: 'qbank',
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds: question.conceptIds ?? [],
      correct,
      seconds: null,
      selectedIndex: index,
      ...(correctIndex >= 0 ? { correctIndex } : {}),
      ...(question.libraryRefs[0]?.title ? { subtopic: question.libraryRefs[0].title } : {}),
      ...(question.source ? { source: question.source } : {}),
      sessionId: `mixed-${question.id}`,
    })
  }

  return (
    <div className="mx-auto max-w-[1040px] px-4 py-5 sm:px-6">
      <Panel className="p-5 sm:p-6">
        <QuestionView question={question} chosen={chosen} revealed={revealed} onChoose={choose} />
        {revealed && question.explanation && (
          <div className="mt-5 border-t border-line pt-4">
            <p className="text-[13px] font-semibold text-ink">{t('Explanation')}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{question.explanation}</p>
          </div>
        )}
      </Panel>
      <div className="mt-4 flex justify-end">
        <Button variant="primary" size="md" iconRight={ArrowRight} disabled={!revealed} onClick={onNext}>
          {last ? t('See results') : t('Next item')}
        </Button>
      </div>
    </div>
  )
}

/**
 * One practical item inside a mixed sitting, with its result reported back.
 *
 * `PracticalRunner` has no result callback — it writes what the student did to
 * `usePracticalProgress` and nothing else — so a mixed sitting used to end with
 * a practical line that could only say how many items had been touched. It can
 * say more than that without inventing a score: the sitting asks the *same*
 * question the "missed" lists ask of the same record — did this station make
 * half marks, was any decision in this case wrong, was this set left part-done
 * — and reports the answer as passed or not.
 *
 * An item the student left without recording anything is deliberately not
 * marked either way: nothing happened, and calling that a pass would put a tick
 * against work that was never done.
 */
function PracticalStep({ target, onMark, onNext, last }: {
  target: PracticalEntry
  onMark: (correct: boolean) => void
  onNext: () => void
  last: boolean
}) {
  const t = useT()
  const { progress } = usePracticalProgress()
  const history = useAttemptHistory()

  function finish() {
    if (practicalLastAt(progress, target.id)) {
      const missed = missedPracticalIds(progress, [{ id: target.id, kind: target.kind }], history.records)
      onMark(missed.length === 0)
    }
    onNext()
  }

  const nextLabel = last ? t('See results') : t('Next item')

  return (
    <>
      {/* The station runner's own exit is the queue's "next", and it now says
          so: inside a sitting, leaving a station is not going back to a list. */}
      <PracticalRunner target={target} onExit={finish} backLabel={nextLabel} />
      <div className="mx-auto flex max-w-[1040px] justify-end px-4 pb-8 sm:px-6">
        <Button variant="primary" size="md" iconRight={ArrowRight} onClick={finish}>
          {nextLabel}
        </Button>
      </div>
    </>
  )
}

/**
 * An item its bank cannot produce.
 *
 * Two different situations, and telling them apart matters: a bank that is
 * still empty is hydrating and the item is almost certainly fine, while a bank
 * that has content but not this id has had it withdrawn since the queue was
 * drawn. Reporting the first as the second would tell a student their test had
 * been withdrawn every time the catalogue was a beat slow.
 */
function Unavailable({ loading, onNext, last }: { loading: boolean; onNext: () => void; last: boolean }) {
  const t = useT()
  return (
    <div className="mx-auto max-w-[1040px] px-4 py-5 sm:px-6">
      <Panel className="p-6 text-center">
        <p className="text-[14px] font-semibold text-ink">
          {loading ? t('Loading this item…') : t('This item is no longer published')}
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-ink-2">
          {loading
            ? t('Its bank has not finished loading. Give it a moment, or skip ahead.')
            : t('It was withdrawn after this test was built. The rest of the sitting is unaffected.')}
        </p>
        <Button className="mt-4" variant="secondary" iconRight={ArrowRight} onClick={onNext}>
          {last ? t('See results') : t('Next item')}
        </Button>
      </Panel>
    </div>
  )
}

/**
 * The mixed sitting: one queue, three runners, in the order the queue was drawn.
 *
 * Nothing here re-implements a bank. The MCQ is `QuestionView`, the station is
 * `PracticalRunner` and the essay is `EssayRunner` — each mounted for one item,
 * each recording through its own hooks, each told that leaving means "next".
 */
export function MixedRunner({ session, questions, onMark, onNext, onEnd }: MixedRunnerProps) {
  const t = useT()
  const practicals = usePracticalCatalogue()
  const { items: essays } = useLiveEssays()
  const questionsById = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])
  const essaysById = useMemo(() => new Map(essays.map((essay) => [essay.id, essay])), [essays])

  const item = currentMixedItem(session)
  if (!item) return null
  const last = session.cursor === session.items.length - 1

  const question = item.kind === 'mcq' ? questionsById.get(item.id) : undefined
  const target = item.kind === 'practical' ? practicals.byId.get(item.id) : undefined
  const essay = item.kind === 'essay' ? essaysById.get(item.id) : undefined

  return (
    <div>
      <Progress session={session} item={item} onEnd={onEnd} />
      {item.kind === 'mcq' && question && (
        // Keyed on the item so the chosen option and the reveal reset between
        // questions rather than carrying the previous answer into the next one.
        <McqStep key={item.id} question={question} onMark={onMark} onNext={onNext} last={last} />
      )}
      {item.kind === 'practical' && target && (
        <PracticalStep key={item.id} target={target} onMark={onMark} onNext={onNext} last={last} />
      )}
      {item.kind === 'essay' && essay && (
        <>
          <EssayRunner key={item.id} essay={essay} onExit={onNext} backLabel={last ? t('See results') : t('Next item')} />
          <div className="mx-auto flex max-w-[1040px] justify-end px-4 pb-8 sm:px-6">
            <Button variant="primary" size="md" iconRight={ArrowRight} onClick={onNext}>
              {last ? t('See results') : t('Next item')}
            </Button>
          </div>
        </>
      )}
      {((item.kind === 'mcq' && !question) || (item.kind === 'practical' && !target) || (item.kind === 'essay' && !essay)) && (
        <Unavailable
          loading={item.kind === 'mcq' ? questions.length === 0
            : item.kind === 'practical' ? practicals.entries.length === 0
              : essays.length === 0}
          onNext={onNext}
          last={last}
        />
      )}
    </div>
  )
}
