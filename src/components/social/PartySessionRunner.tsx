import { useMemo, useState } from 'react'
import { Users, Hash, Trophy, Eye, Check, Clock } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Textarea } from '@/components/ui/Field'
import { SubjectTag } from '@/components/ui/Subject'
import { QuestionView } from '@/components/qbank/QuestionView'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem, type PracticalAuthoringData } from '@/data/contentControl'
import type { EssayQuestion } from '@/data/essay'
import type { AttemptSurface } from '@/data/attempts'
import { useMastery } from '@/lib/useMastery'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { PARTY_REFUSALS, usePartySession, usePartyActions, type PartySessionAnswer, type PartySessionItemRef } from '@/lib/useParties'
import { formatDateTime } from '@/lib/format'
import { useT } from '@/lib/i18n'

function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

const PRACTICAL_SURFACE: Record<PracticalAuthoringData['format'], AttemptSurface> = {
  osce: 'station',
  case: 'case',
  lab: 'lab',
}

const PRACTICAL_KIND_LABEL: Record<PracticalAuthoringData['format'], string> = {
  osce: 'OSCE station',
  case: 'Clinical case',
  lab: 'Lab & imaging',
}

function itemKey(ref: { kind: string; id: string }): string {
  return `${ref.kind}:${ref.id}`
}

/**
 * Marked apart from practised, exactly as the server's own `tally` does —
 * duplicated here in miniature rather than exposed from the server so the
 * two numbers a student sees on their own answers can never drift from what
 * `PartySessionMemberTally` already reports for everyone else in the room.
 */
function tallyOf(answers: PartySessionAnswer[]): { marked: { correct: number; of: number } | null; practised: number } {
  const marked = answers.filter((answer) => answer.kind === 'question')
  const practised = answers.filter((answer) => answer.kind !== 'question').length
  if (!marked.length) return { marked: null, practised }
  return { marked: { correct: marked.filter((answer) => answer.correct === true).length, of: marked.length }, practised }
}

/**
 * What a practical item actually asks, read only — no options to pick, no
 * mark scheme to tick. The full station/case/lab runners already do that;
 * this is the reading a party member does before pressing "I've done this".
 */
function PracticalItemBody({ item, t }: { item: ManagedContentItem; t: (s: string) => string }) {
  const data = item.practicalData
  if (!data) return <p className="text-[13px] text-ink-3">{t('This item has no content authored yet.')}</p>

  if (data.format === 'osce') {
    return <p className="text-[14px] leading-relaxed text-ink-2">{data.candidateInstructions || t('No instructions authored yet.')}</p>
  }
  if (data.format === 'case') {
    return (
      <div className="space-y-4">
        {data.decisions.map((decision) => (
          <div key={decision.id} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
            <p className="text-[13px] font-medium text-ink">{decision.title}</p>
            {decision.context && <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{decision.context}</p>}
            <p className="mt-1 text-[13.5px] text-ink">{decision.question}</p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {data.questions.map((question) => (
        <div key={question.id} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
          {question.context && <p className="text-[13px] leading-relaxed text-ink-2">{question.context}</p>}
          <p className="mt-1 text-[13.5px] text-ink">{question.question}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * Write, then check yourself against the key points and model answer —
 * the same idea `EssayRunner` follows, thinned to what a party sitting
 * needs. Nothing here is saved to the essay-answers store; a party session
 * has its own record, the attempt ledger, written once "Mark as done" is
 * pressed.
 */
function EssayItemBody({ essay, busy, onDone, t }: { essay: EssayQuestion; busy: boolean; onDone: () => void; t: (s: string) => string }) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  return (
    <div>
      <p className="text-[15px] font-medium leading-relaxed text-ink">{essay.prompt}</p>
      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={6}
        placeholder={t('Write your answer…')}
        aria-label={t('Your answer')}
        className="mt-3"
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button variant="secondary" iconLeft={Eye} disabled={revealed} onClick={() => setRevealed(true)}>
          {t('Reveal key points')}
        </Button>
        <Button variant="primary" iconLeft={Check} loading={busy} onClick={onDone}>
          {t('Mark as done')}
        </Button>
      </div>
      {revealed && (
        <div className="mt-4 space-y-3 border-t border-line pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Key points')}</p>
            <ul className="mt-1.5 list-disc ps-5 text-[13px] leading-relaxed text-ink-2">
              {essay.keyPoints.map((point) => <li key={point.id}>{point.text}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Model answer')}</p>
            <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-ink-2">{essay.modelAnswer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Sit a party session, one item at a time.
 *
 * A question goes through `QuestionView` and is marked by the server, exactly
 * as `RoomRunner` does — the answer submitted here is never trusted back as
 * the verdict. A practical or essay item is self-checked: there is no verdict
 * to wait for, only a member's own word that they worked through it, which is
 * why the server stores `correct: null` for both. That is also why the end of
 * a session never folds the two into one figure — see `tallyOf` and the
 * results panel below.
 */
export function PartySessionRunner({ sessionId, onExit }: { sessionId: string; onExit: () => void }) {
  const t = useT()
  const { session, error, reload } = usePartySession(sessionId)
  const { answer } = usePartyActions()
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()

  const questions = usePublishedQuestions()
  const essays = useLiveEssays()
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  const questionsById = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])
  const essaysById = useMemo(() => new Map(essays.map((essay) => [essay.id, essay])), [essays])
  const practicalById = useMemo(
    () => new Map(ledger.filter((item) => item.kind === 'practical').map((item) => [item.id, item])),
    [ledger],
  )

  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [verdict, setVerdict] = useState<{ correct: boolean; correctIndex: number } | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  if (error) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{error}</p>
        <Button className="mt-4" variant="secondary" onClick={onExit}>{t('Back')}</Button>
      </Panel>
    )
  }

  if (!session) {
    return <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the session…')}</Panel>
  }

  const roster = (
    <Panel className="h-fit">
      <PanelHeader title={t('Who is in')} icon={Users} hint={`${session.members.length} ${session.members.length === 1 ? t('person') : t('people')}`} />
      <ul className="divide-y divide-line">
        {session.members.map((member) => (
          <li key={member.userId} className="flex items-center gap-3 px-4 py-2.5">
            <Avatar name={member.displayName} size="sm" />
            <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{member.displayName}</span>
            <span className="shrink-0 text-end">
              <span className="block text-[12px] font-medium text-ink">
                {member.tally.marked ? `${member.tally.marked.correct} / ${member.tally.marked.of}` : t('Not marked yet')}
              </span>
              {member.tally.practised > 0 && (
                <span className="block text-[10.5px] text-ink-3">{member.tally.practised} {t('self-checked')}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )

  /* ---- Scheduled ------------------------------------------------------- */
  if (session.state === 'scheduled') {
    return (
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={session.name} icon={Hash} action={<Badge tone="primary">{t('Not started yet')}</Badge>} />
          <div className="p-5">
            <p className="flex items-center gap-1.5 text-[13px] text-ink-2">
              <Clock className="size-4 text-ink-3" />
              {session.startsAt ? `${t('Opens')} ${formatDateTime(new Date(session.startsAt))}` : t('This session has not started yet.')}
            </p>
            <Button className="mt-4" variant="ghost" onClick={onExit}>{t('Back')}</Button>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  const answeredKeys = new Set(session.myAnswers.map(itemKey))
  const remaining = session.itemRefs.filter((ref) => !answeredKeys.has(itemKey(ref)))
  const allDone = session.itemRefs.length > 0 && remaining.length === 0

  /* ---- Results ----------------------------------------------------------
   * Shown once every item is answered, or the session has been closed —
   * whichever comes first. A party session has no per-member "finish"
   * action the way a shared test does; completion is just every item having
   * an answer. */
  if (session.state === 'closed' || allDone) {
    const mine = tallyOf(session.myAnswers)
    return (
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={t('Your result')} icon={Trophy} hint={session.name} />
          <div className="p-6 text-center">
            {mine.marked ? (
              <p className="text-[15px] text-ink-2">
                <span className="text-[24px] font-semibold text-ink">{mine.marked.correct} {t('of')} {mine.marked.of}</span>
                {' '}{t('correct')}
              </p>
            ) : (
              <p className="text-[13px] text-ink-3">{t('No questions were marked in this session.')}</p>
            )}
            {mine.practised > 0 && (
              <p className="mt-3 text-[14px] text-ink-2">
                {mine.practised} {mine.practised === 1 ? t('item self-checked') : t('items self-checked')}
              </p>
            )}
            <p className="mt-4 text-[12px] text-ink-3">{t('Self-checked items are marked by the person who did them, not the server — they are not scored.')}</p>
            <Button className="mt-5" variant="secondary" onClick={onExit}>{t('Back to party')}</Button>
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Running ----------------------------------------------------------- */
  const current = remaining[Math.min(idx, Math.max(0, remaining.length - 1))]
  const answeredCount = session.myAnswers.length

  async function commitQuestion() {
    if (chosen === null || !current) return
    const question = questionsById.get(current.id)
    if (!question) return
    setBusy(true)
    setMessage('')
    const result = await answer(sessionId, { kind: 'question', id: question.id, chosenIndex: chosen, seconds: null })
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    setVerdict({ correct: Boolean(result.correct), correctIndex: result.correctIndex ?? -1 })
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
      sessionId: `party-${sessionId}`,
    })
  }

  async function commitSelfChecked(ref: PartySessionItemRef, surface: AttemptSurface, subjectId: string, topic: string, conceptIds: string[]) {
    setBusy(true)
    setMessage('')
    const result = await answer(sessionId, { kind: ref.kind, id: ref.id, chosenIndex: null, seconds: null })
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    logAttempt({
      surface,
      itemId: ref.id,
      subjectId,
      topic,
      difficulty: 'Moderate',
      conceptIds,
      correct: null,
      seconds: null,
      sessionId: `party-${sessionId}`,
    })
    setIdx(0)
    await reload()
  }

  if (!current) {
    return <Panel className="p-10 text-center text-[13px] text-ink-3">{t('Loading the session…')}</Panel>
  }

  if (current.kind === 'question') {
    const question = questionsById.get(current.id)
    if (!question) {
      // Unpublished after the session was frozen. Skipping it is better than
      // blocking the whole session on content that no longer exists.
      return (
        <Panel className="p-8 text-center">
          <p className="text-[13.5px] text-ink-2">{t('This question is no longer available.')}</p>
          <Button className="mt-4" variant="secondary" onClick={() => setIdx((i) => i + 1)}>{t('Skip it')}</Button>
        </Panel>
      )
    }
    return (
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={session.name} icon={Hash} hint={`${answeredCount + 1} / ${session.itemRefs.length}`} />
          <div className="p-5">
            <Badge tone="outline">{t('Question')}</Badge>
            <div className="mt-3">
              <QuestionView question={question} chosen={chosen} revealed={Boolean(verdict)} correctIndex={verdict?.correctIndex} onChoose={setChosen} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {verdict ? (
                <Button variant="primary" onClick={async () => { setVerdict(null); setChosen(null); setIdx(0); await reload() }}>
                  {remaining.length <= 1 ? t('See results') : t('Next item')}
                </Button>
              ) : (
                <Button variant="primary" disabled={chosen === null || busy} loading={busy} onClick={() => void commitQuestion()}>{t('Submit answer')}</Button>
              )}
              <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
            </div>
            {verdict && (
              <p className={verdict.correct ? 'mt-3 text-[13px] font-medium text-success' : 'mt-3 text-[13px] font-medium text-danger'}>
                {verdict.correct ? t('Correct.') : t('Not this time.')}
              </p>
            )}
            {message && <p role="status" className="mt-3 text-[12.5px] text-danger">{message}</p>}
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  if (current.kind === 'practical') {
    const item = practicalById.get(current.id)
    if (!item) {
      return (
        <Panel className="p-8 text-center">
          <p className="text-[13.5px] text-ink-2">{t('This item is no longer available.')}</p>
          <Button className="mt-4" variant="secondary" onClick={() => setIdx((i) => i + 1)}>{t('Skip it')}</Button>
        </Panel>
      )
    }
    const data = item.practicalData
    const kindLabel = data ? PRACTICAL_KIND_LABEL[data.format] : t('Practical item')
    const surface = data ? PRACTICAL_SURFACE[data.format] : 'station'
    const conceptIds = data ? [...data.conceptTags.mainConceptIds, ...data.conceptTags.conceptIds] : []
    return (
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
        <Panel>
          <PanelHeader title={session.name} icon={Hash} hint={`${answeredCount + 1} / ${session.itemRefs.length}`} />
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="outline">{t(kindLabel)}</Badge>
              <SubjectTag id={item.subjectId} />
            </div>
            <h2 className="mt-3 font-serif text-[18px] font-semibold text-ink">{item.title}</h2>
            <div className="mt-3">
              <PracticalItemBody item={item} t={t} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                variant="primary"
                iconLeft={Check}
                loading={busy}
                onClick={() => void commitSelfChecked(current, surface, item.subjectId, item.title, conceptIds)}
              >
                {t("I've done this")}
              </Button>
              <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
            </div>
            {message && <p role="status" className="mt-3 text-[12.5px] text-danger">{message}</p>}
          </div>
        </Panel>
        {roster}
      </div>
    )
  }

  /* ---- Essay --------------------------------------------------------- */
  const essay = essaysById.get(current.id)
  if (!essay) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-[13.5px] text-ink-2">{t('This essay question is no longer available.')}</p>
        <Button className="mt-4" variant="secondary" onClick={() => setIdx((i) => i + 1)}>{t('Skip it')}</Button>
      </Panel>
    )
  }
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
      <Panel>
        <PanelHeader title={session.name} icon={Hash} hint={`${answeredCount + 1} / ${session.itemRefs.length}`} />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">{t('Essay question')}</Badge>
            <SubjectTag id={essay.subjectId} />
          </div>
          <div className="mt-3">
            <EssayItemBody
              essay={essay}
              busy={busy}
              onDone={() => void commitSelfChecked(current, 'essay', essay.subjectId, essay.title, [])}
              t={t}
            />
          </div>
          <div className="mt-4">
            <Button variant="ghost" onClick={onExit}>{t('Leave')}</Button>
          </div>
          {message && <p role="status" className="mt-3 text-[12.5px] text-danger">{message}</p>}
        </div>
      </Panel>
      {roster}
    </div>
  )
}
