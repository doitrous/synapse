import { ContentSkeleton } from '@/components/loading/PageSkeleton'
import { useMemo, useState } from 'react'
import { Swords, Trophy, Hourglass } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { QuestionView } from '@/components/qbank/QuestionView'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useMastery } from '@/lib/useMastery'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { useChallenge, useChallengeActions } from '@/lib/useChallenges'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { ActivityLocked, useActivityLocked } from '@/components/auth/ActivityLocked'

/**
 * Sit a challenge, one question at a time.
 *
 * The same pattern as `RoomRunner` in Study Together, over the challenge
 * endpoints instead of the room ones: an answer is sent to the server, which
 * marks it against the published question and returns the verdict. The
 * head-to-head at the end is never assembled here — it only ever comes from
 * `challenge.result`, which stays null until both sides finish, so this
 * component has nothing to compute and nothing to leak early.
 */
export function ChallengeRunner({ challengeId, onExit }: { challengeId: string; onExit: () => void }) {
  const t = useT()
  const locked = useActivityLocked()
  const questions = usePublishedQuestions()
  const { challenge, reload } = useChallenge(challengeId)
  const { answer, finish } = useChallengeActions()
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const [chosen, setChosen] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<{ correct: boolean; correctIndex: number } | null>(null)
  const [busy, setBusy] = useState(false)
  // Questions this sitting has given up on. A question that was archived after
  // the challenge was frozen can never be answered — the server refuses it with
  // `question_gone` — so nothing would ever remove it from `remaining`, the
  // Finish panel would never appear, and the head-to-head would stay closed for
  // the *opponent* too, since it needs both sides finished. Skipping has to take
  // the question out of the paper, not just step past it.
  const [skippedIds, setSkippedIds] = useState<ReadonlySet<string>>(() => new Set())

  const byId = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])
  const answeredIds = useMemo(() => new Set(challenge?.myAnswers.map((entry) => entry.questionId) ?? []), [challenge])

  if (locked) return <ActivityLocked />
  if (!challenge) {
    return <ContentSkeleton shape="question" />
  }

  if (challenge.status === 'sent') {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[14px] font-medium text-ink">
          {challenge.iAmChallenger ? t('Waiting for your friend to accept.') : t('You have not responded to this challenge yet.')}
        </p>
        <Button className="mt-4" variant="secondary" onClick={onExit}>{t('Back to challenges')}</Button>
      </Panel>
    )
  }

  if (challenge.status === 'declined') {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[14px] font-medium text-ink">{t('This challenge was declined.')}</p>
        <Button className="mt-4" variant="secondary" onClick={onExit}>{t('Back to challenges')}</Button>
      </Panel>
    )
  }

  const myCorrect = challenge.myAnswers.filter((entry) => entry.correct).length

  /* ---- Result: both sides finished ------------------------------------ */
  if (challenge.result) {
    const { challenger, opponent, questions: rows } = challenge.result
    const mine = challenge.iAmChallenger ? challenger : opponent
    const theirs = challenge.iAmChallenger ? opponent : challenger
    const myPct = challenge.questionCount ? Math.round((mine.correct / challenge.questionCount) * 100) : 0
    const theirPct = challenge.questionCount ? Math.round((theirs.correct / challenge.questionCount) * 100) : 0
    return (
      <Panel>
        <PanelHeader title={t('Result')} icon={Trophy} hint={challenge.scopeLabel} />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[12px] text-ink-3">{t('You')}</p>
              <p className="tnum mt-1 font-mono text-[28px] font-semibold text-ink">{myPct}%</p>
              <p className="mt-1 text-[12.5px] text-ink-2">{mine.correct} / {challenge.questionCount}</p>
            </div>
            <div>
              <p className="text-[12px] text-ink-3">{t('Them')}</p>
              <p className="tnum mt-1 font-mono text-[28px] font-semibold text-ink">{theirPct}%</p>
              <p className="mt-1 text-[12.5px] text-ink-2">{theirs.correct} / {challenge.questionCount}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-1.5">
            {rows.map((row, index) => {
              const mineCorrect = challenge.iAmChallenger ? row.challengerCorrect : row.opponentCorrect
              const theirsCorrect = challenge.iAmChallenger ? row.opponentCorrect : row.challengerCorrect
              return (
                <li key={row.questionId} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-[12.5px]">
                  <span className="tnum w-5 shrink-0 text-ink-3">{index + 1}</span>
                  <span className="flex-1 text-ink-2">{t('Question')} {index + 1}</span>
                  <Badge tone={mineCorrect ? 'success' : 'danger'}>{t('You')}</Badge>
                  <Badge tone={theirsCorrect ? 'success' : 'danger'}>{t('Them')}</Badge>
                </li>
              )
            })}
          </ul>
          <Button className="mt-6" variant="secondary" onClick={onExit}>{t('Back to challenges')}</Button>
        </div>
      </Panel>
    )
  }

  /* ---- Finished my side, waiting on the opponent ----------------------- */
  if (challenge.myFinished) {
    const myPct = challenge.questionCount ? Math.round((myCorrect / challenge.questionCount) * 100) : 0
    return (
      <Panel>
        <PanelHeader title={t('Your result')} icon={Hourglass} hint={challenge.scopeLabel} />
        <div className="p-6 text-center">
          <p className="tnum font-mono text-[40px] font-semibold leading-none text-ink">{myPct}%</p>
          <p className="mt-2 text-[14px] text-ink-2">{myCorrect} {t('of')} {challenge.questionCount} {t('correct')}</p>
          <Meter value={myPct} tone={myPct >= 70 ? 'success' : myPct >= 50 ? 'primary' : 'warning'} className="mx-auto mt-4 max-w-sm" />
          <p className="mt-5 text-[12.5px] text-ink-3">
            {challenge.opponentFinished
              ? t('Your opponent has finished too. Comparing results…')
              : t('The comparison opens once your opponent finishes.')}
          </p>
          <Button className="mt-5" variant="secondary" onClick={onExit}>{t('Back to challenges')}</Button>
        </div>
      </Panel>
    )
  }

  /* ---- Running ------------------------------------------------------- */
  const remaining = challenge.questionIds.filter((id) => !answeredIds.has(id) && !skippedIds.has(id))
  const currentId = remaining[0]
  const question = currentId ? byId.get(currentId) : undefined

  if (!remaining.length) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[14px] font-medium text-ink">{t('You have answered every question.')}</p>
        <Button
          className="mt-4"
          variant="primary"
          loading={busy}
          onClick={async () => { setBusy(true); await finish(challenge.id); await reload(); setBusy(false) }}
        >
          {t('Finish')}
        </Button>
      </Panel>
    )
  }

  if (!question) {
    // The question was archived after the challenge was created; skipping it
    // is better than blocking the whole paper on content that no longer exists.
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{t('This question is no longer available.')}</p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => setSkippedIds((current) => new Set(current).add(currentId))}
        >
          {t('Skip it')}
        </Button>
      </Panel>
    )
  }

  async function commit() {
    if (chosen === null || !question) return
    setBusy(true)
    const result = await answer(challenge!.id, { questionId: question.id, chosenIndex: chosen, seconds: null })
    setBusy(false)
    if (!result.ok) return
    setVerdict({ correct: Boolean(result.correct), correctIndex: result.correctIndex ?? -1 })
    // A challenge counts toward mastery like any other marked work.
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
      seconds: null,
      sessionId: `challenge-${challenge!.id}`,
    })
  }

  const answeredCount = answeredIds.size

  return (
    <Panel>
      <PanelHeader title={challenge.scopeLabel} icon={Swords} hint={`${answeredCount + 1} / ${challenge.questionCount}`} />
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
              onClick={async () => { setVerdict(null); setChosen(null); await reload() }}
            >
              {remaining.length <= 1 ? t('See results') : t('Next question')}
            </Button>
          ) : (
            <Button variant="primary" disabled={chosen === null || busy} loading={busy} onClick={() => void commit()}>{t('Submit answer')}</Button>
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
  )
}
