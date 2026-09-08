import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Copy, Eye, Hash, Play, Trophy, Users } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Meter } from '@/components/ui/Meter'
import { QuestionView } from '@/components/qbank/QuestionView'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import type { Question } from '@/data/qbank'
import { useMastery } from '@/lib/useMastery'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { attemptSeconds } from '@/data/attempts'
import { useRoom, useStudyRoomActions } from '@/lib/useStudyRooms'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Sit a shared test, one question at a time.
 *
 * This is the runner that used to live inside the Study Together page, moved
 * here whole when that page became a redirect to Study Rooms and was deleted.
 * It is the same contract it always had: the answer goes to the server, which marks it
 * against the published question and returns the verdict. Nothing about the
 * score is decided in the browser — other people see it, so self-reporting
 * was never an option.
 */
export function SharedTestRunner({ roomId, onExit }: { roomId: string; onExit: () => void }) {
  const t = useT()
  const questions = usePublishedQuestions()
  const { room, reload } = useRoom(roomId)
  const { start, answer, finish } = useStudyRoomActions()
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<{ correct: boolean; correctIndex: number } | null>(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)

  const byId = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])
  const answeredIds = useMemo(() => new Set(room?.myAnswers.map((entry) => entry.questionId) ?? []), [room])
  const remaining = useMemo(
    () => (room?.questionIds ?? []).filter((id) => !answeredIds.has(id)),
    [room, answeredIds],
  )
  const currentId = remaining[Math.min(idx, Math.max(0, remaining.length - 1))]

  /*
   * When the question on screen appeared. Keyed on the question rather than
   * reset from the Next handler, because Next is not the only thing that
   * changes it: skipping an archived question does, and so does the poll
   * bringing back a room this student has answered more of elsewhere.
   */
  const questionShownAt = useRef(Date.now())
  useEffect(() => { questionShownAt.current = Date.now() }, [currentId])

  if (!room) {
    return <ContentSkeleton shape="question" />
  }

  const roster = (
    <Panel className="h-fit">
      <PanelHeader title={t('Who is in')} icon={Users} hint={`${room.members.length} ${room.members.length === 1 ? t('person') : t('people')}`} />
      <ul className="divide-y divide-line">
        {room.members.map((member) => (
          <li key={member.userId} className="flex items-center gap-3 px-4 py-2.5">
            <Avatar name={member.displayName ?? 'Student'} size="sm" />
            <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{member.displayName ?? t('Student')}</span>
            {member.finished
              ? <Badge tone="success">{member.correct !== null ? `${member.correct} / ${room.questionCount}` : t('Finished')}</Badge>
              : <span className="tnum font-mono text-[11.5px] text-ink-3">{member.answered} / {room.questionCount}</span>}
          </li>
        ))}
      </ul>
    </Panel>
  )

  /* ---- Lobby --------------------------------------------------------- */
  if (room.status === 'lobby') {
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={room.name} icon={Hash} action={<Badge tone="primary">{t('Waiting to start')}</Badge>} />
          <div className="p-5">
            <p className="text-[12.5px] text-ink-3">{t('Share this code so others can join')}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="tnum rounded-lg border border-line bg-surface-2 px-4 py-2 font-mono text-[24px] font-semibold tracking-[0.2em] text-ink">{room.code}</span>
              <Button
                variant="secondary"
                iconLeft={copied ? Check : Copy}
                onClick={() => { void navigator.clipboard?.writeText(room.code); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
              >
                {copied ? t('Copied') : t('Copy code')}
              </Button>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
              {room.questionCount} {t('questions')} · {room.timed ? t('timed') : t('untimed')}. {t('Everyone answers the same set at their own pace, and results open once you finish.')}
            </p>
            <div className="mt-5 flex gap-2">
              {room.isHost ? (
                <Button variant="primary" iconLeft={Play} loading={busy} onClick={async () => { setBusy(true); await start(room.id); await reload(); setBusy(false) }}>
                  {t('Start the test')}
                </Button>
              ) : (
                <p className="text-[13px] text-ink-3">{t('Waiting for the host to start.')}</p>
              )}
              <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
            </div>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Review -------------------------------------------------------- */
  if (room.myFinished && reviewing) {
    const answered = room.questionIds
      .map((id) => ({ question: byId.get(id), entry: room.myAnswers.find((item) => item.questionId === id) }))
      .filter((row): row is { question: Question; entry: NonNullable<typeof row.entry> } => Boolean(row.question && row.entry))
    const current = answered[Math.min(reviewIdx, answered.length - 1)]
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader
            title={t('Review answers')}
            icon={Eye}
            hint={answered.length ? `${Math.min(reviewIdx + 1, answered.length)} / ${answered.length}` : undefined}
            action={<Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={() => setReviewing(false)}>{t('Back to your result')}</Button>}
          />
          {current ? (
            <div className="p-5">
              <QuestionView
                question={current.question}
                chosen={current.entry.chosenIndex}
                correctIndex={current.question.options.findIndex((option: Question['options'][number]) => option.correct)}
                revealed
                onChoose={() => undefined}
              />
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <Button variant="ghost" iconLeft={ArrowLeft} disabled={reviewIdx === 0} onClick={() => setReviewIdx((index) => Math.max(0, index - 1))}>
                  {t('Previous')}
                </Button>
                <Button
                  variant="secondary"
                  iconRight={ArrowRight}
                  disabled={reviewIdx >= answered.length - 1}
                  onClick={() => setReviewIdx((index) => Math.min(answered.length - 1, index + 1))}
                >
                  {t('Next')}
                </Button>
              </div>
            </div>
          ) : (
            <p className="px-5 py-10 text-center text-[13px] text-ink-3">{t('These questions are no longer published, so they cannot be reopened.')}</p>
          )}
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (room.myFinished) {
    const myCorrect = room.myAnswers.filter((entry) => entry.correct).length
    const pct = room.questionCount ? Math.round((myCorrect / room.questionCount) * 100) : 0
    const stillWorking = room.members.filter((member) => !member.finished).length
    const reviewable = room.questionIds.some((id) => byId.has(id))
    return (
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={t('Your result')} icon={Trophy} hint={room.name} />
          <div className="p-6 text-center">
            <p className="tnum font-mono text-[40px] font-semibold leading-none text-ink">{pct}%</p>
            <p className="mt-2 text-[14px] text-ink-2">{myCorrect} {t('of')} {room.questionCount} {t('correct')}</p>
            <Meter value={pct} tone={pct >= 70 ? 'success' : pct >= 50 ? 'primary' : 'warning'} className="mx-auto mt-4 max-w-sm" />
            <p className="mt-5 text-[12.5px] text-ink-3">
              {stillWorking > 0
                ? `${stillWorking} ${stillWorking === 1 ? t('person is') : t('people are')} ${t('still working. Their scores appear as they finish.')}`
                : t('Everyone has finished.')}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {reviewable && (
                <Button variant="primary" iconLeft={Eye} onClick={() => { setReviewIdx(0); setReviewing(true) }}>
                  {t('Review answers')}
                </Button>
              )}
              <Button variant="secondary" onClick={onExit}>{t('Back to shared tests')}</Button>
            </div>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Running ------------------------------------------------------- */
  const question = currentId ? byId.get(currentId) : undefined

  if (!remaining.length) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[14px] font-medium text-ink">{t('You have answered every question.')}</p>
        <Button className="mt-4" variant="primary" loading={busy} onClick={async () => { setBusy(true); await finish(room.id); await reload(); setBusy(false) }}>
          {t('Finish and see results')}
        </Button>
      </Panel>
    )
  }

  if (!question) {
    // The question was archived after the room was created; skipping it is
    // better than blocking the whole test on content that no longer exists.
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{t('This question is no longer available.')}</p>
        <Button className="mt-4" variant="secondary" onClick={() => setIdx((current) => current + 1)}>{t('Skip it')}</Button>
      </Panel>
    )
  }

  async function commit() {
    if (chosen === null || !question) return
    // Read before the request, not after it: the student stopped thinking when
    // they pressed Submit, and how long the server took to mark it is not time
    // they spent on the question.
    const seconds = attemptSeconds(room!.timed, questionShownAt.current, Date.now())
    setBusy(true)
    const result = await answer(room!.id, { questionId: question.id, chosenIndex: chosen, seconds })
    setBusy(false)
    if (!result.ok) return
    setVerdict({ correct: Boolean(result.correct), correctIndex: result.correctIndex ?? -1 })
    // Shared work counts toward the same record as solo work.
    const conceptIds = question.conceptIds ?? []
    if (conceptIds.length) record({ conceptIds, source: 'question', correct: Boolean(result.correct) })
    logAttempt({
      surface: 'room',
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds,
      correct: Boolean(result.correct),
      seconds,
      sessionId: `room-${room!.id}`,
    })
  }

  const answeredCount = answeredIds.size

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
      <Panel>
        <PanelHeader title={room.name} icon={Hash} hint={`${answeredCount + 1} / ${room.questionCount}`} />
        <div className="p-5">
          <QuestionView
            question={question}
            chosen={chosen}
            revealed={Boolean(verdict)}
            correctIndex={verdict?.correctIndex}
            onChoose={setChosen}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {verdict ? (
              <Button
                variant="primary"
                iconRight={ArrowRight}
                onClick={async () => { setVerdict(null); setChosen(null); setIdx(0); await reload() }}
              >
                {remaining.length <= 1 ? t('See results') : t('Next question')}
              </Button>
            ) : (
              <Button variant="primary" disabled={chosen === null || busy} loading={busy} onClick={() => void commit()}>
                {t('Submit answer')}
              </Button>
            )}
            <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
          </div>
          {verdict && (
            <p className={cn('mt-3 text-[13px] font-medium', verdict.correct ? 'text-success' : 'text-danger')}>
              {verdict.correct ? t('Correct.') : t('Not this time.')}
            </p>
          )}
        </div>
      </Panel>
      {roster}
    </div>
  )
}
