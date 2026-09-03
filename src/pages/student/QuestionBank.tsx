import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker, useLocation, useSearchParams } from 'react-router-dom'
import {
  ListChecks,
  Clock,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  RotateCcw,
  Trophy,
  Siren,
  Flame,
  Shuffle,
  History,
  TrendingDown,
  MoreHorizontal,
  Square,
  Eye,
  PenLine,
  Trash2,
  Columns2,
  Sparkles,
} from 'lucide-react'
import { DEMANDING_DIFFICULTIES, type Question } from '@/data/qbank'
import type { AttemptRecord } from '@/data/attempts'
import { bySession, sessionDetail, type SessionDetail, type SessionSummary } from '@/data/attemptStats'
import { formatLongDate } from '@/lib/format'
import { useSubjectName } from '@/lib/useSubjectName'
import { bySubject as accuracyBySubject, weakest } from '@/data/attemptStats'
import { useMastery } from '@/lib/useMastery'
import {
  incorrectIds, omittedIds, pruneManifests, questionsById,
  type SessionManifests,
} from '@/data/qbankCollections'
import {
  clearsStoredSitting, finishedManifests, liveSittingId, pendingAttempts, persistsSitting,
  restorableQuestions, selectClearsStrike, timedClock, type Phase,
} from '@/data/qbankSession'
import { QbankHub, type QbankBank, type QbankHubTab } from '@/components/qbank/hub/QbankHub'
import { YourProgress } from '@/components/qbank/hub/YourProgress'
import { TestBuilder, type TestBuilderPreset } from '@/components/qbank/hub/TestBuilder'
import { UnifiedBuilder } from '@/components/qbank/unified/UnifiedBuilder'
import { MixedRunner } from '@/components/qbank/unified/MixedRunner'
import { MixedSummary } from '@/components/qbank/unified/MixedSummary'
import { useMixedSession } from '@/lib/useMixedSession'
import { mixedClosed, mixedFinished } from '@/data/mixedSession'
import { PreviousTestsTab, type PreviousFilter } from '@/components/qbank/hub/PreviousTestsTab'
import { SittingKindBadge, SittingRows } from '@/components/qbank/unified/SittingRows'
import { useSittings } from '@/lib/useSittings'
import { sittingsOfKind, type SittingKind } from '@/data/sittings'
import { useAttemptHistory, useDeleteAttemptSession, useRecordAttempt, useRecordAttempts } from '@/lib/useAttemptLog'
import { usePersistentState } from '@/lib/usePersistentState'
import { EndSessionDialog } from '@/components/qbank/EndSessionDialog'
import { ContinueCard } from '@/components/qbank/ContinueCard'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { TextInput } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { Dialog } from '@/components/ui/Dialog'
import { SubjectDot } from '@/components/ui/Subject'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { cn } from '@/lib/cn'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { useScopedPublishedQuestions } from '@/lib/usePublishedQuestions'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { MediaAttachmentView, ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { QuestionNavigator, type QuestionState } from '@/components/qbank/QuestionNavigator'
import { StudyRail } from '@/components/qbank/StudyRail'
import { HighlightSelectionPopover, HighlightableText, useQuestionHighlights } from '@/components/qbank/QuestionHighlights'
import { QuickAddFlashcardDialog } from '@/components/flashcards/QuickAddFlashcardDialog'
import { chooserTopics, questionsInScope, questionsInSources, type Scope } from '@/data/qbankScope'
import { useT } from '@/lib/i18n'
import { useImmersion } from '@/components/shell/ImmersionContext'
import { useAnswerDistribution } from '@/lib/useAnswerDistribution'
import { answerPercentages } from '@/data/answerDistribution'
import { AnswerStatBar } from '@/components/qbank/AnswerStatBar'
import { sourceOptions } from '@/data/sourceCoverage'
import { QUESTION_SOURCES, QUESTION_SOURCE_LABEL, UNSPECIFIED_SOURCE, UNSPECIFIED_SOURCE_LABEL, type SourceBucket } from '@/data/questionSource'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
type Mode = 'tutor' | 'timed'
type Source = 'all' | 'flagged' | 'incorrect' | 'omitted'

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function diffTone(d: Question['difficulty']): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

type PresetKind = 'weak' | 'emergency' | 'demanding' | 'everything'

/** How many marked answers a subject needs before it can be called a weakness. */
const WEAKNESS_EVIDENCE = 3

/** A review opened from a link is a short set, not a full sitting. */
const REVIEW_SESSION_SIZE = 5

/** Dotted, so `isUserOwnedState` routes these marks to the student's own record. */
const QBANK_MARKED_STORAGE_KEY = 'nishany.qbank.marked.v1'

function newSessionId(): string {
  return `qb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/** Everything needed to put a half-finished sitting back on screen. */
interface LiveSession {
  questionIds: string[]
  idx: number
  answers: Record<string, number>
  checked: Record<string, boolean>
  mode: Mode
  sessionId: string
  elapsed: number
  /** Closed question-clock segments, preserved when the sitting is paused. */
  questionSeconds?: Record<string, number>
  visited: number[]
  /** Options the student has ruled out, per question. Scratch marks, not a record. */
  struck: Record<string, number[]>
  reviewing: boolean
  name: string
  phase: Exclude<Phase, 'setup'>
  /** A submitted sitting is finished with — it is never offered to resume. */
  submitted: boolean
  startedAt: string
}

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
const ACTIVE_SESSION_STORAGE_KEY = 'nishany.qbank.activeSession.v1'
const SESSION_NAMES_STORAGE_KEY = 'nishany.qbank.sessionNames.v1'

/**
 * The bank and tab named in the URL, or the defaults.
 *
 * Read through a guard rather than cast: `?bank=osce` is a link someone will
 * eventually write, and it must land on the MCQ bank rather than on a hub with
 * no content under any branch.
 */
function readBank(value: string | null): QbankBank {
  return value === 'practical' || value === 'essay' || value === 'mixed' ? value : 'mcq'
}

function readTab(value: string | null): QbankHubTab {
  return value === 'previous' ? 'previous' : 'new'
}

/** One number with its name under it, for the row of figures on a sitting. */
function DetailStat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  return (
    <div>
      <p className={cn(
        'tnum font-mono text-[17px] font-semibold leading-none',
        tone === 'good' ? 'text-success' : tone === 'bad' ? 'text-danger' : 'text-ink',
      )}>{value}</p>
      <p className="mt-1 text-[11.5px] text-ink-3">{label}</p>
    </div>
  )
}

/**
 * Which questions each sitting contained.
 *
 * The attempt log only receives a question once its answer is checked, so a
 * skipped one left no trace anywhere the moment its sitting ended. This is the
 * other half of the pair: with both, "served but never attempted" is a fact
 * rather than a guess.
 */
const SESSION_QUESTIONS_STORAGE_KEY = 'nishany.qbank.sessionQuestions.v1'

/**
 * Everything one sitting can say about itself.
 *
 * All of it derived from the records that sitting produced — see
 * `sessionDetail`. Nothing here is stored a second time, so deleting a test
 * changes these figures the same way it changes every other number in the app.
 */
function SessionDetailPanel({
  detail,
  questions,
  total,
  t,
}: {
  detail: SessionDetail
  questions: Question[]
  total?: number
  t: (key: string) => string
}) {
  const subjectName = useSubjectName()
  const minutes = Math.round(detail.durationSeconds / 60)
  const omitted = Math.max(0, (total ?? detail.answered) - detail.answered)
  const pace = [
    { key: 'good' as const, label: t('Good · 45s or less'), color: 'bg-success' },
    { key: 'target' as const, label: t('Target · 46–60s'), color: 'bg-primary' },
    { key: 'slower' as const, label: t('Slower · 61–90s'), color: 'bg-warning' },
    { key: 'overtime' as const, label: t('Overtime · over 90s'), color: 'bg-danger' },
  ]
  const paced = Object.values(detail.pace).reduce((sum, value) => sum + value, 0)
  const nextAction = detail.repeatedWeaknesses.length
    ? `${t('Revisit')} ${detail.repeatedWeaknesses.slice(0, 2).join(', ')} ${t('before your next block; these topics have cost marks more than once.')}`
    : detail.weakestTopic
      ? `${t('Review')} ${detail.weakestTopic.key} ${t('and retest it while the reasoning is still fresh.')}`
      : detail.averageSeconds != null && detail.averageSeconds > 60
        ? t('Your next gain is pace: use a short timed block and aim to commit each answer by 60 seconds.')
        : detail.wrong > 0
          ? t('Review the missed answers below, then retake the same scope with fresh questions.')
          : t('This block is secure. Keep the spacing effect by revisiting it later rather than repeating it immediately.')
  return (
    <div className="border-t border-line bg-surface-2/40 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <DetailStat label={t('Right')} value={String(detail.correct)} tone={detail.correct > 0 ? 'good' : undefined} />
        <DetailStat label={t('Wrong')} value={String(detail.wrong)} tone={detail.wrong > 0 ? 'bad' : undefined} />
        {/* Only shown when there is one. A nought here would invite the student
            to wonder what they had failed to have marked. */}
        {detail.unmarked > 0 && <DetailStat label={t('Unmarked')} value={String(detail.unmarked)} />}
        {omitted > 0 && <DetailStat label={t('Omitted')} value={String(omitted)} />}
        <DetailStat label={t('Accuracy')} value={detail.accuracy == null ? '—' : `${Math.round(detail.accuracy * 100)}%`} />
        {detail.durationSeconds > 0 && <DetailStat label={t('Total time')} value={minutes >= 1 ? `${minutes}m` : `${detail.durationSeconds}s`} />}
        {detail.overtimeSeconds > 0 && <DetailStat label={t('Overtime')} value={`+${clock(detail.overtimeSeconds)}`} tone="bad" />}
        {detail.averageSeconds != null && <DetailStat label={t('Average / question')} value={`${detail.averageSeconds}s`} />}
        {detail.medianSeconds != null && <DetailStat label={t('Median / question')} value={`${detail.medianSeconds}s`} />}
      </div>

      {paced > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Pace distribution')}</p>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-inset" aria-hidden>
            {pace.map((band) => detail.pace[band.key] > 0 && (
              <span key={band.key} className={band.color} style={{ width: `${(detail.pace[band.key] / paced) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {pace.map((band) => (
              <li key={band.key} className="flex items-center gap-2 text-[11.5px] text-ink-2">
                <span className={cn('size-2 rounded-full', band.color)} aria-hidden />
                <span className="flex-1">{band.label}</span>
                <span className="tnum font-mono text-ink">{detail.pace[band.key]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.subjects.length > 1 && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('By subject')}</p>
          <ul className="space-y-1.5">
            {detail.subjects.map((subject) => (
              <li key={subject.key} className="flex items-center gap-2.5 text-[12px]">
                <span className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-ink-2">
                  <SubjectDot id={subject.key} />
                  <span className="truncate">{subjectName(subject.key)}</span>
                </span>
                <Meter value={subject.accuracy == null ? 0 : Math.round(subject.accuracy * 100)} className="w-24 shrink-0" />
                <span className="tnum w-16 shrink-0 text-end font-mono text-ink-3">
                  {subject.accuracy == null ? '—' : `${subject.correct}/${subject.marked}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.missed.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Where you lost marks')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {detail.missed.map((topic) => (
              <li
                key={topic.key}
                className="inline-flex items-center gap-1.5 rounded-full border border-danger/25 bg-danger-tint/60 px-2.5 py-0.5 text-[11.5px] text-ink-2"
              >
                {topic.key}
                <span className="tnum font-mono text-[10.5px] text-danger">{topic.marked - topic.correct}</span>
              </li>
            ))}
          </ul>
          {/* Named separately from the list above, because "you got one wrong"
              and "you do not know this" are different claims. */}
          {detail.weakestTopic && (
            <p className="mt-2 text-[11.5px] text-ink-3">
              {t('Weakest here')}: <span className="font-medium text-ink-2">{detail.weakestTopic.key}</span>
              {' '}({detail.weakestTopic.correct}/{detail.weakestTopic.marked})
            </p>
          )}
        </div>
      )}

      {detail.subtopics.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {detail.subtopics.slice(0, 8).map((subtopic) => {
            const pct = subtopic.accuracy == null ? 0 : Math.round(subtopic.accuracy * 100)
            return (
              <div key={subtopic.key} className="rounded-lg border border-line bg-surface px-3 py-2.5">
                <div className="flex items-start justify-between gap-3 text-[11.5px]">
                  <span className="min-w-0 truncate text-ink-2" title={subtopic.key}>{subtopic.key}</span>
                  <span className="tnum shrink-0 font-mono text-ink">{subtopic.accuracy == null ? '—' : `${pct}%`}</span>
                </div>
                <Meter value={pct} tone={pct >= 80 ? 'success' : pct >= 60 ? 'primary' : 'warning'} className="mt-2" />
              </div>
            )
          })}
        </div>
      )}

      {detail.answers.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Answer review')}</p>
          <ol className="space-y-2">
            {detail.answers.map((answer, index) => {
              const question = questions.find((item) => item.id === answer.itemId)
              const picked = typeof answer.selectedIndex === 'number' ? question?.options[answer.selectedIndex] : undefined
              const keyed = typeof answer.correctIndex === 'number' ? question?.options[answer.correctIndex] : undefined
              return (
                <li key={answer.itemId} className="rounded-lg border border-line bg-surface px-3 py-3">
                  <div className="flex items-start gap-2">
                    <span className="tnum grid size-6 shrink-0 place-items-center rounded-full bg-inset font-mono text-[10.5px] text-ink-2">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink">{question?.stem ?? answer.topic}</p>
                      {answer.correct === true ? (
                        <p className="mt-1 text-[11.5px] text-success">{t('Correct')} {picked ? `· ${LETTERS[answer.selectedIndex!]} · ${picked.text}` : ''}</p>
                      ) : answer.correct === false ? (
                        <div className="mt-1 space-y-0.5 text-[11.5px] leading-snug">
                          {/* "Correct" alone, right under the option this student
                              picked, reads as being told they got it right. Naming
                              both sides — whose pick this is, and which one the key
                              names — leaves no room to misread it either way. */}
                          <p className="text-danger">{t('Your answer')}: {picked ? `${LETTERS[answer.selectedIndex!]} · ${picked.text}` : t('Not retained for this legacy attempt')}</p>
                          <p className="text-success">{t('Correct answer')}: {keyed ? `${LETTERS[answer.correctIndex!]} · ${keyed.text}` : t('Review the question explanation')}</p>
                        </div>
                      ) : (
                        <p className="mt-1 text-[11.5px] text-ink-3">{t('This activity was not marked against a key.')}</p>
                      )}
                    </div>
                    {answer.seconds != null && <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{answer.seconds}s</span>}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      <div className="mt-5 rounded-lg border border-primary-line bg-primary-tint/35 px-3.5 py-3">
        <p className="text-[12.5px] font-medium text-primary-strong">{t('Next action')}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{nextAction}</p>
      </div>
    </div>
  )
}

/**
 * Tests already taken, and what to do about them.
 *
 * Reconstructed from the attempt log rather than stored twice: every record has
 * always carried the sessionId of the sitting that produced it, and nothing ever
 * read it back, so a student had no way to see what they had done.
 *
 * A row used to carry a name, a date, a count and one accuracy figure, with
 * every action buried behind a "…" menu — so the most useful thing a finished
 * test can offer, which is sitting it again, was three interactions deep and
 * did not exist. It opens onto its own numbers, and the two ways of taking it
 * again are one press each.
 */
function PreviousTests({
  sessions,
  names,
  liveSessionId,
  records,
  questions,
  onRename,
  onResume,
  onTerminate,
  onReview,
  onRetakeSame,
  onRetakeScope,
  onDelete,
  canReview,
  canRetakeSame,
  t,
}: {
  sessions: SessionSummary[]
  names: Record<string, string>
  /** The sitting still in progress, if there is one. */
  liveSessionId: string | null
  /** The whole log; each row reads only its own sitting out of it. */
  records: AttemptRecord[]
  questions: Question[]
  onRename: (sessionId: string, name: string) => void
  onResume: () => void
  onTerminate: () => void
  onReview: (sessionId: string) => void
  onRetakeSame: (sessionId: string) => void
  onRetakeScope: (entry: SessionSummary) => void
  onDelete: (sessionId: string) => void
  canReview: (sessionId: string) => boolean
  canRetakeSame: (sessionId: string) => boolean
  t: (key: string) => string
}) {
  const subjectName = useSubjectName()
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [menu, setMenu] = useState<{ sessionId: string; x: number; y: number } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  if (!sessions.length) {
    return (
      <Panel>
        <div className="px-5 py-12 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-xl bg-inset text-ink-3"><Icon icon={History} size={20} /></span>
          <p className="mt-3 text-[14px] font-semibold text-ink">{t('No tests yet')}</p>
          <p className="mx-auto mt-1 max-w-sm text-[12.5px] leading-relaxed text-ink-3">{t('Start a session and it will be kept here, with what you scored.')}</p>
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <ul className="divide-y divide-line">
        {sessions.map((entry) => {
          const name = names[entry.sessionId]?.trim() || t('Untitled test')
          const isEditing = editing === entry.sessionId
          const isOpen = expanded === entry.sessionId
          const live = entry.sessionId === liveSessionId
          return (
            <li key={entry.sessionId}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : entry.sessionId)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? t('Hide') : t('Show')} ${name}`}
                  className="grid size-11 shrink-0 place-items-center rounded-md text-ink-3 transition-colors hover:bg-inset hover:text-ink sm:size-7"
                >
                  <Icon icon={ChevronDown} size={15} className={cn('transition-transform duration-150', !isOpen && '-rotate-90 rtl:rotate-90')} />
                </button>
                <div className="min-w-0 flex-1">
                  {isEditing ? (
                    <form
                      onSubmit={(event) => { event.preventDefault(); onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                      className="flex items-center gap-2"
                    >
                      <TextInput
                        value={draft}
                        autoFocus
                        maxLength={60}
                        onChange={(event) => setDraft(event.target.value)}
                        onBlur={() => { onRename(entry.sessionId, draft.trim()); setEditing(null) }}
                        aria-label={t('Test name')}
                      />
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setDraft(names[entry.sessionId] ?? ''); setEditing(entry.sessionId) }}
                      className="flex min-h-11 max-w-full items-center text-start text-[13.5px] font-semibold text-ink hover:text-primary-strong sm:min-h-0"
                      title={t('Rename')}
                    >
                      <span className="min-w-0 truncate">{name}</span>
                    </button>
                  )}
                  {/* `min-w-0` and a truncating subject: wrapping alone cannot
                      save a line whose single longest item is wider than a
                      phone, and "Cardiovascular" beside a date and a count is
                      exactly that. */}
                  <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 text-[11.5px] text-ink-3">
                    <span>{formatLongDate(new Date(entry.startedAt))}</span>
                    <span aria-hidden>·</span>
                    <span>{entry.answered} {entry.answered === 1 ? t('question') : t('questions')}</span>
                    {entry.subjectIds.slice(0, 2).map((subjectId) => (
                      <span key={subjectId} className="inline-flex min-w-0 max-w-full items-center gap-1">
                        <SubjectDot id={subjectId} />
                        <span className="truncate">{subjectName(subjectId)}</span>
                      </span>
                    ))}
                  </p>
                </div>
                {/* Every row in this list says what kind of test it was, because
                    the list now holds four kinds and "11 questions" and "11
                    items" are not the same sitting. */}
                <SittingKindBadge kind="mcq" />
                {live && <Badge tone="warning">{t('In progress')}</Badge>}
                {/* An unmarked sitting shows a dash, not a nought: nobody scored it. */}
                <span className="tnum shrink-0 font-mono text-[15px] font-semibold text-ink">
                  {entry.accuracy == null ? '—' : `${Math.round(entry.accuracy * 100)}%`}
                </span>
                <IconButton
                  icon={MoreHorizontal}
                  label={`${t('Actions for')} ${name}`}
                  size="sm"
                  onClick={(event) => {
                    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
                    setMenu({ sessionId: entry.sessionId, x: rect.left, y: rect.bottom + 4 })
                  }}
                />
              </div>

              {isOpen && (
                <>
                  <SessionDetailPanel detail={sessionDetail(records, entry.sessionId)} questions={questions} t={t} />
                  {/* Out of the menu and onto the surface. Sitting a test again
                      is the most useful thing a finished test offers, and it
                      was not offered at all. */}
                  <div className="flex flex-wrap gap-2 border-t border-line bg-surface-2/40 px-4 pb-4 sm:px-5">
                    <Button
                      size="sm"
                      variant="primary"
                      iconLeft={RotateCcw}
                      disabled={!canRetakeSame(entry.sessionId)}
                      title={canRetakeSame(entry.sessionId) ? undefined : t('None of these questions are published any more')}
                      onClick={() => onRetakeSame(entry.sessionId)}
                    >
                      {t('Retake these questions')}
                    </Button>
                    <Button size="sm" variant="secondary" iconLeft={Shuffle} onClick={() => onRetakeScope(entry)}>
                      {t('New test, same scope')}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      iconLeft={Eye}
                      disabled={!canReview(entry.sessionId)}
                      onClick={() => onReview(entry.sessionId)}
                    >
                      {t('Review answers')}
                    </Button>
                    {live && (
                      <Button size="sm" variant="ghost" iconLeft={Play} onClick={onResume}>{t('Resume this test')}</Button>
                    )}
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            ...(menu.sessionId === liveSessionId ? [
              { id: 'resume', label: t('Resume this test'), icon: Play, onSelect: onResume },
              { id: 'terminate', label: t('End this test'), icon: Square, onSelect: onTerminate },
            ] : []),
            {
              id: 'retake',
              label: t('Retake these questions'),
              icon: RotateCcw,
              disabled: !canRetakeSame(menu.sessionId),
              onSelect: () => onRetakeSame(menu.sessionId),
            },
            {
              id: 'review',
              label: t('Review answers'),
              icon: Eye,
              disabled: !canReview(menu.sessionId),
              onSelect: () => onReview(menu.sessionId),
            },
            {
              id: 'rename',
              label: t('Rename'),
              icon: PenLine,
              onSelect: () => { setDraft(names[menu.sessionId] ?? ''); setEditing(menu.sessionId) },
            },
            {
              id: 'delete',
              label: t('Delete this test'),
              icon: Trash2,
              tone: 'danger' as const,
              separated: true,
              onSelect: () => setConfirmDelete(menu.sessionId),
            },
          ]}
        />
      )}

      {confirmDelete && (
        <Dialog onClose={() => setConfirmDelete(null)} label={t('Delete this test')} size="sm">
          <PanelHeader title={t('Delete this test')} icon={Trash2} />
          <div className="space-y-4 p-5">
            {/* Said plainly, because it is not only a row disappearing: these
                answers are part of the accuracy every other screen reports. */}
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('This removes every answer from that sitting. Your overall accuracy and progress will be recalculated without them, and it cannot be undone.')}
            </p>
            <div className="flex justify-end gap-2 border-t border-line pt-4">
              <Button variant="ghost" onClick={() => setConfirmDelete(null)}>{t('Cancel')}</Button>
              <Button
                variant="danger"
                iconLeft={Trash2}
                onClick={() => { onDelete(confirmDelete); setConfirmDelete(null) }}
              >
                {t('Delete')}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </Panel>
  )
}

export function QuestionBank() {
  const t = useT()
  const subjectName = useSubjectName()
  const location = useLocation()
  const questions = useScopedPublishedQuestions()
  const availability = useCatalogueAvailability(questions.length)
  const [params, setParams] = useSearchParams()
  const articleFilter = params.get('article')
  const [phase, setPhase] = useState<Phase>('setup')
  const [scope, setScope] = useState<Scope>(() => new Set())
  const [mode, setMode] = useState<Mode>('tutor')
  const [source, setSource] = useState<Source>('all')
  // Read-only for now: the composer renders the source cards inert until the
  // next content release, and this stays wired so `available` and the chapter
  // tree keep computing exactly as they did.
  const [sourceSel] = useState<Set<SourceBucket>>(() => new Set())
  const [count, setCount] = useState(5)

  const [session, setSession] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  // Called unconditionally, ahead of the phase branches below, like every
  // other hook in this component — `session[idx]` is simply undefined outside
  // the running phase, which the hook treats as just another (empty) key.
  const highlights = useQuestionHighlights(session[idx]?.id ?? '')
  const questionCardRef = useRef<HTMLDivElement>(null)
  const [flashcardSeed, setFlashcardSeed] = useState<{ front: string; back: string } | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [struck, setStruck] = useState<Record<string, number[]>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [reviewing, setReviewing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  // Peer answer breakdown for whatever question is currently on screen. Same
  // unconditional-hook reasoning as `highlights` above: outside the running
  // phase this resolves to a null id and the hook simply returns null.
  const distribution = useAnswerDistribution(
    session[idx]?.id ?? null,
    reviewing || (mode === 'tutor' && Boolean(checked[session[idx]?.id ?? ''])),
  )
  /**
   * Direction 2's sitting: one queue drawn from the MCQ, practical and essay
   * banks. It is deliberately separate from the MCQ session state above — the
   * runner below the hub, its timer, its navigator and its report are
   * untouched, and a mixed sitting is a different thing that happens to start
   * from the same tab.
   *
   * Declared here, above the immersion and navigation guards, because a mixed
   * sitting is a sitting: it takes the screen and it warns before it is left,
   * exactly as an MCQ paper does.
   */
  const mixed = useMixedSession()
  // Stamped when the queue runs out rather than read at render, so the report's
  // "Time" is the time the sitting took and not the time the page has been open.
  const [mixedEndedAt, setMixedEndedAt] = useState<number | null>(null)
  /** A mixed queue is open and not yet finished — the runner is on screen. */
  const mixedRunning = Boolean(mixed.session) && !mixedFinished(mixed.session!)
  /** The student is being asked whether to leave a mixed sitting. */
  const [mixedLeaveOpen, setMixedLeaveOpen] = useState(false)

  /**
   * Clear a mixed sitting that is already over.
   *
   * This is the one thing standing between a student and a Question Bank they
   * cannot open. The document is written on a debounce, so a tab closed on the
   * report — or a render that throws before the write flushes — leaves a
   * finished sitting in `nishany.qbank.mixedSession.v1`; every later visit then
   * rendered that sitting's report instead of the hub, and the only control on
   * that screen was the one whose write had already failed to land. Sweeping it
   * here means the key is cleared on the next persisted write however the
   * previous visit ended, so nothing has to be deleted by hand.
   *
   * `mixedEndedAt` is component state and is null on every fresh mount, so this
   * can never fire on a report the student is actually reading.
   */
  const endMixed = mixed.end
  const mixedSession = mixed.session
  useEffect(() => {
    if (!mixedSession || mixedEndedAt != null) return
    if (mixedClosed(mixedSession) || mixedFinished(mixedSession)) endMixed()
  }, [mixedSession, endMixed, mixedEndedAt])

  // Sitting a test is the one thing here that wants the width, and the one
  // thing a student should not have to tidy the screen for first. A mixed
  // sitting is one too: it used to leave the sidebar up while an OSCE station
  // ran, which is the one screen that needs the width most.
  const { setImmersive } = useImmersion()
  useEffect(() => {
    setImmersive(phase === 'running' || (phase === 'setup' && mixedRunning))
    return () => setImmersive(false)
  }, [phase, mixedRunning, setImmersive])
  const { record } = useMastery()
  const logAttempt = useRecordAttempt()
  const logAttempts = useRecordAttempts()
  const history = useAttemptHistory()
  /** Groups this sitting's records, so a later attempt at the same item is distinct. */
  const [sessionId, setSessionId] = useState(() => newSessionId())
  const [elapsed, setElapsed] = useState(0)
  /** Elapsed seconds when the current question was first shown. */
  const questionStartedAt = useRef(0)
  /**
   * How long has been spent on each question, and which one the clock is on.
   *
   * A timed block only ever knew the total. Per-question time was measured
   * exclusively inside `checkAnswer`, which Tutor is the only mode that
   * reaches — so the mode built around a clock recorded no times at all.
   */
  const elapsedRef = useRef(0)
  elapsedRef.current = elapsed
  const timeSpent = useRef<Record<string, number>>({})
  const timingId = useRef<string | null>(null)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const [endOpen, setEndOpen] = useState(false)
  /** A hidden timed test stays paused until the student explicitly decides. */
  const [visibilityPaused, setVisibilityPaused] = useState(false)
  /** Indexes the student has actually landed on — what separates "omitted" from "unseen". */
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]))
  /**
   * Questions flagged for another look.
   *
   * Persisted per student rather than held in component state: a mark whose
   * whole purpose is "come back to this" was previously discarded the moment
   * the session ended.
   */
  const [markedIds, setMarkedIds] = usePersistentState<string[]>(QBANK_MARKED_STORAGE_KEY, [])
  const marked = useMemo(() => new Set(markedIds), [markedIds])
  const setMarked = useCallback((update: (current: Set<string>) => Set<string>) => {
    setMarkedIds((current) => [...update(new Set(current))])
  }, [setMarkedIds])
  /**
   * Desktop-only layout preference: once an answer is revealed, split the
   * question (stem/vignette/options) from the answer area (explanations and
   * per-option rationale) into two columns instead of stacking them.
   * Persisted so a student who likes it does not re-toggle every sitting.
   */
  const [splitView, setSplitView] = usePersistentState<boolean>('nishany.qbank.splitView.v1', false)
  /** Mirrors the `lg` breakpoint — split view never applies below it. */
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  /** What the student called this sitting, if anything. */
  const [sessionName, setSessionName] = useState('')
  /**
   * Which bank the page is about, and what is being done with it.
   *
   * Both are mirrored into the URL, so a link to `?bank=practical&tab=previous`
   * opens on the practical bank's ledger rather than on the MCQ composer — and
   * a reload does not silently move a student back to a different bank than
   * the one they were reading.
   */
  const [bank, setBankState] = useState<QbankBank>(() => readBank(params.get('bank')))
  const [hubTab, setHubTabState] = useState<QbankHubTab>(() => readTab(params.get('tab')))
  /** Which kinds of sitting the Previous tests list is showing. */
  const [previousFilter, setPreviousFilter] = useState<PreviousFilter>(() => readBank(params.get('bank')))
  const setBank = useCallback((next: QbankBank) => {
    setBankState(next)
    // The filter follows the bank on a switch, because "Previous tests" under
    // the practical tab meaning "all tests" is the confusion this package is
    // fixing. It is still a filter: the chips can widen it again.
    setPreviousFilter(next)
    setParams((current) => {
      const draft = new URLSearchParams(current)
      draft.set('bank', next)
      return draft
    }, { replace: true })
  }, [setParams])
  const setHubTab = useCallback((next: QbankHubTab) => {
    setHubTabState(next)
    setParams((current) => {
      const draft = new URLSearchParams(current)
      draft.set('tab', next)
      return draft
    }, { replace: true })
  }, [setParams])
  /**
   * What each finished sitting is called.
   *
   * The records themselves carry no name — only a sessionId — so the names live
   * beside them, keyed by that id. A sitting with no entry falls back to what it
   * covered, so nothing is ever nameless.
   */
  const [savedNames, setSavedNames] = usePersistentState<Record<string, string>>(SESSION_NAMES_STORAGE_KEY, {})
  /**
   * The ledger of every test sat, of every kind.
   *
   * The MCQ ledger above is names keyed by session id; this one is the sitting
   * itself — what kind it was, what it held, what it came to. MCQ sittings are
   * filed here under the *same* id, so the two never disagree about which test
   * a name belongs to.
   */
  const sittingsLedger = useSittings()
  const [sessionQuestions, setSessionQuestions] = usePersistentState<SessionManifests>(SESSION_QUESTIONS_STORAGE_KEY, {})

  /**
   * The sitting in progress, kept where a route change cannot take it.
   *
   * All of the above is component state, and this page is a route element — so
   * following a link to the library or a resource unmounted it and threw the
   * session away. Coming back landed on an empty setup form with no way to
   * reach the questions again. Only ids are stored; the questions themselves
   * are rebuilt from the published bank, which is already cached.
   */
  const [saved, setSaved, savedStatus] = usePersistentState<LiveSession | null>(ACTIVE_SESSION_STORAGE_KEY, null)
  const restored = useRef(false)
  // Held in a ref, not read back from `saved`: the mirror effect below writes
  // `saved`, so depending on it there would make the write retrigger the effect
  // that performed it — which is exactly the render loop this avoids.
  const startedAt = useRef<string | null>(null)
  /**
   * Which sitting the mirror below is allowed to write.
   *
   * The runner's state is one slot serving three things: a live sitting, a past
   * test, and a collection. Leaving a past test lands on its results screen with
   * `reviewing` already cleared, and the mirror would then write that finished
   * test straight over the sitting the student still has paused. Only the
   * sitting that was actually started or resumed here may be mirrored.
   */
  const mirroredSittingId = useRef<string | null>(null)

  /**
   * A start that is waiting on the student's answer about the open sitting.
   *
   * Every way of starting a test funnels through `beginSession`, which replaces
   * the stored sitting outright. Once the hub could show a paused test and a
   * Start button at the same time, that replacement became silent loss of work
   * — and for a timed sitting, total loss, since nothing reaches the attempt
   * log until it is committed at the end.
   */
  const [pendingStart, setPendingStart] = useState<{ picked: Question[]; name?: string } | null>(null)

  /**
   * Put a stored sitting back into the runner's state.
   *
   * Shared by the restore below and by `resumeSaved`, because restoring once on
   * mount is not enough: viewing a collection or a past test overwrites the same
   * state slot the sitting lives in, and nothing put it back. Continue then
   * dropped the student into whatever they had just looked at, read-only, with
   * their own paused sitting unreachable until a reload.
   */
  const restoreFrom = useCallback((sitting: LiveSession) => {
    const rebuilt = sitting.questionIds
      .map((id) => questions.find((question) => question.id === id))
      .filter((question): question is Question => Boolean(question))
    startedAt.current = sitting.startedAt
    mirroredSittingId.current = sitting.sessionId
    setSession(rebuilt)
    setIdx(Math.min(sitting.idx, rebuilt.length - 1))
    setAnswers(sitting.answers)
    setStruck(sitting.struck ?? {})
    setChecked(sitting.checked)
    setMode(sitting.mode)
    setSessionId(sitting.sessionId)
    setElapsed(sitting.elapsed)
    timeSpent.current = sitting.questionSeconds ?? {}
    timingId.current = null
    questionStartedAt.current = sitting.elapsed
    setVisited(new Set(sitting.visited))
    // Not `sitting.reviewing`. The mirror below refuses to write while a review
    // is on screen, so a stored sitting is never a review; reading the field
    // back was the only way a stale `true` could outlive the review it belonged
    // to. The field stays on `LiveSession` for documents already persisted.
    setReviewing(false)
    setSubmitted(sitting.submitted ?? false)
    setSessionName(sitting.name)
  }, [questions])

  useEffect(() => {
    if (restored.current || !savedStatus.hydrated || !saved || !questions.length) return
    // Reconciled: main guarded this effect against overwriting a live sitting
    // (the stored document arrives asynchronously, and it used to arrive *after*
    // the student had picked Timed and pressed Start — restoring the old sitting
    // straight over the new one, mode, answers and `checked` map included); the
    // incoming branch replaced the inline rebuild with `restorableQuestions` +
    // `restoreFrom` and stopped it forcing the phase. Both are kept. The guard
    // costs the Continue card nothing, because the card reads `saved` directly
    // and `resumeSaved` restores from it on demand — so refusing here only ever
    // protects what is on screen. Whatever is on screen wins.
    if (session.length || phase !== 'setup') { restored.current = true; return }
    // Null when a question has since been unpublished — see `restorableQuestions`.
    if (!restorableQuestions(saved, questions)) { setSaved(null); restored.current = true; return }
    restored.current = true
    restoreFrom(saved)
    // Deliberately not `setPhase(saved.phase)`. Everything about the sitting is
    // back — questions, answers, timer, strikes — but the student lands on the
    // hub and chooses to go back in, rather than arriving mid-question with no
    // idea where they are.
    // `session.length` and `phase` are read above to decide whether restoring is
    // still the right thing to do, so they belong here: reading a stale pair is
    // what the guard exists to prevent. `restored.current` stops this repeating.
  }, [questions, saved, savedStatus.hydrated, setSaved, restoreFrom, session.length, phase])

  // Mirror the sitting outward. Debounced by the state store, so this is one
  // write per pause rather than one per answer.
  useEffect(() => {
    if (!savedStatus.hydrated) return
    // Being at the hub no longer means the sitting is over. Leaving a session
    // used to discard it outright, so "End session" was the only way out of a
    // test and it destroyed the test — there was nothing left to resume. The
    // stored sitting is now cleared only where it is genuinely finished with:
    // `discardSession`, called from Terminate, from "Start another", and from
    // the guards that find themselves with no questions.
    // A review is not work in progress either — see `persistsSitting`.
    if (!persistsSitting(phase, reviewing)) return
    // And never write a session that is not the live sitting. Leaving a past
    // test clears `reviewing` but stays on that test's results screen, which was
    // enough for the mirror to file it as the open sitting — over the paused one.
    if (mirroredSittingId.current !== sessionId) return
    if (!startedAt.current) startedAt.current = new Date().toISOString()
    setSaved({
      questionIds: session.map((question) => question.id),
      idx, answers, checked, mode, sessionId, elapsed,
      questionSeconds: timeSpent.current,
      visited: [...visited],
      struck,
      reviewing,
      submitted,
      name: sessionName,
      phase,
      startedAt: startedAt.current,
    })
    // `saved` is deliberately not a dependency — see startedAt above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session, idx, answers, checked, mode, sessionId, elapsed, visited, struck, reviewing, submitted, sessionName, savedStatus.hydrated, setSaved])

  /**
   * Something is open that should not be walked out of by accident.
   *
   * A mixed sitting counts. It persists, so nothing is lost by leaving — but a
   * student halfway through a station has not decided to leave, and the MCQ
   * paper has warned them for as long as it has existed. One blocker, not two:
   * the router supports exactly one, and which dialog it opens is decided here.
   */
  const mixedGuardActive = phase === 'setup' && mixedRunning
  const guardActive = (phase === 'running' && !reviewing && !submitted) || mixedGuardActive
  const blocker = useBlocker(useCallback(({ currentLocation, nextLocation }) => (
    guardActive && `${currentLocation.pathname}${currentLocation.search}` !== `${nextLocation.pathname}${nextLocation.search}`
  ), [guardActive]))

  /** Internal links use the same deliberate exit choice as the End control. */
  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (mixedGuardActive) setMixedLeaveOpen(true)
    else setEndOpen(true)
  }, [blocker.state, mixedGuardActive])

  /** Browser close, reload, and external navigation can only use the native warning. */
  useEffect(() => {
    if (!guardActive) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [guardActive])

  /**
   * Browsers cannot cancel an operating-system tab switch. Pause immediately
   * while hidden, then require the same choice before the clock can resume.
   */
  useEffect(() => {
    // `mode` belongs to the MCQ composer, and a mixed sitting has no timer of
    // its own — pausing one against a setting it does not use would open the
    // MCQ end dialog over a station.
    if (!guardActive || mode !== 'timed' || mixedGuardActive) return
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setVisibilityPaused(true)
        return
      }
      setEndOpen(true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [guardActive, mode, mixedGuardActive])

  const articleQuestions = useMemo(
    () => (articleFilter ? questions.filter((question) => question.libraryRefs.some((ref) => ref.id === articleFilter)) : questions),
    [articleFilter, questions],
  )
  // The live chapter tree, so a whole-chapter selection matches real content.
  const { topics: publishedTopics } = useLiveLibrary()
  // The same merged tree the chooser offers, or a chapter picked there — one
  // the library has no article for — would resolve to no questions at all.
  const libraryTopics = useMemo(() => chooserTopics(questions, publishedTopics), [questions, publishedTopics])

  const flaggedQuestions = useMemo(() => questionsById(questions, marked), [questions, marked])
  const incorrectQuestions = useMemo(
    () => questionsById(questions, incorrectIds(history.records)),
    [questions, history.records],
  )
  const omittedQuestions = useMemo(() => {
    // Without the sitting still open — see `finishedManifests`.
    const finished = finishedManifests(sessionQuestions, saved)
    return questionsById(questions, omittedIds(finished, history.records))
  }, [questions, sessionQuestions, history.records, saved])

  const sourcePool = useMemo(() => {
    if (source === 'flagged') return flaggedQuestions
    if (source === 'incorrect') return incorrectQuestions
    if (source === 'omitted') return omittedQuestions
    return articleQuestions
  }, [source, articleQuestions, flaggedQuestions, incorrectQuestions, omittedQuestions])

  const scoped = useMemo(
    () => questionsInScope(sourcePool, scope, libraryTopics),
    [sourcePool, libraryTopics, scope],
  )
  const sourceOpts = useMemo(() => sourceOptions(scoped), [scoped])
  // The picker always renders: every canonical source is offered as a card,
  // and one with nothing in it is disabled rather than hidden — the option
  // stays discoverable even while the bank is still being tagged. Untagged
  // questions get their own "Unspecified" card only once tagged ones exist;
  // alone it would just be the whole bank wearing a confusing name.
  const sourceCards = useMemo(() => {
    const counts = new Map(sourceOpts.map((o) => [o.bucket, o.count]))
    const cards = QUESTION_SOURCES.map((s) => ({
      bucket: s as SourceBucket, label: QUESTION_SOURCE_LABEL[s], count: counts.get(s) ?? 0,
    }))
    const untagged = counts.get(UNSPECIFIED_SOURCE) ?? 0
    if (untagged > 0 && cards.some((c) => c.count > 0)) {
      cards.push({ bucket: UNSPECIFIED_SOURCE, label: UNSPECIFIED_SOURCE_LABEL, count: untagged })
    }
    return cards
  }, [sourceOpts])
  // Drop any selected bucket no longer present under the current scope/pool, so a
  // stale selection can't silently empty the pool.
  const effectiveSources = useMemo(() => {
    const present = new Set(sourceOpts.map((o) => o.bucket))
    return new Set([...sourceSel].filter((b) => present.has(b)))
  }, [sourceSel, sourceOpts])
  // An empty selection means "all sources", so the unfiltered case is unchanged.
  const available = useMemo(
    () => questionsInSources(scoped, effectiveSources),
    [scoped, effectiveSources],
  )

  // The chapter tree's per-topic counts must reflect the same source filter as
  // `available`, so a filtered session's totals match the tree. When no source
  // filter is active (the shipping all-Unspecified state) this is exactly the
  // previous `sourcePool`, so behaviour there is unchanged.
  const treeCountPool = useMemo(
    () => questionsInSources(sourcePool, effectiveSources),
    [sourcePool, effectiveSources],
  )

  /**
   * The MCQs this student has singled out, each of them once.
   *
   * These three lists used to be a tab of their own. They are the composer's
   * first step now — and, together, the pool a mixed sitting draws its MCQ
   * share from when it is asked for "flagged and missed".
   */
  const collectionQuestions = useMemo(() => {
    const seen = new Set<string>()
    return [...flaggedQuestions, ...incorrectQuestions, ...omittedQuestions].filter((question) => {
      if (seen.has(question.id)) return false
      seen.add(question.id)
      return true
    })
  }, [flaggedQuestions, incorrectQuestions, omittedQuestions])

  /** What each chip in the composer's first step stands for. */
  const sourceCounts = useMemo(() => ({
    all: articleQuestions.length,
    flagged: flaggedQuestions.length,
    incorrect: incorrectQuestions.length,
    omitted: omittedQuestions.length,
  }), [articleQuestions.length, flaggedQuestions.length, incorrectQuestions.length, omittedQuestions.length])

  /**
   * The subjects this student is actually weakest in.
   *
   * Was the literal `['renal', 'pharm', 'endo']` — the same three subjects for
   * everyone, including a student who had never answered a question. Empty
   * until there is enough marked work to name one.
   */
  const weakestSubjects = useMemo(
    () => weakest(accuracyBySubject(history.records), WEAKNESS_EVIDENCE, 3).map((entry) => entry.key),
    [history.records],
  )

  /**
   * The four quick-start pools, defined once.
   *
   * The counts on the buttons and the questions a button actually opens have to
   * come from the same expression, or a button can advertise a number and then
   * serve a different set — which is what happened when an empty pool silently
   * fell back to the whole bank.
   */
  const presetPool = useCallback((kind: PresetKind): Question[] => {
    if (kind === 'weak') {
      const weakSubjects = new Set(weakestSubjects)
      return questions.filter((question) => weakSubjects.has(question.subjectId))
    }
    if (kind === 'emergency') return questions.filter((question) => /acute|STEMI|acidosis|hypox/i.test(`${question.topic} ${question.vignette} ${question.stem}`))
    if (kind === 'demanding') return questions.filter((question) => DEMANDING_DIFFICULTIES.includes(question.difficulty))
    return questions
  }, [questions, weakestSubjects])

  const presetCounts = useMemo(() => ({
    weak: presetPool('weak').length,
    emergency: presetPool('emergency').length,
    demanding: presetPool('demanding').length,
    everything: questions.length,
  }), [presetPool, questions])

  /**
   * A review session opened from elsewhere in the app.
   *
   * `?concepts=` is what the dashboard's due-review list sends: the concepts the
   * mastery ledger says are shaky. `?subject=` is the broader entry point used
   * by notifications. Neither can open an empty session — `beginSession`
   * refuses one, so a stale link lands on the setup screen instead of a crash.
   */
  const reviewConcepts = params.get('concepts')
  const reviewSubject = params.get('subject')
  const openedReview = useRef(false)
  useEffect(() => {
    if (openedReview.current || (!reviewConcepts && !reviewSubject)) return
    if (!questions.length) return
    const wanted = new Set((reviewConcepts ?? '').split(',').map((id) => id.trim()).filter(Boolean))
    const pool = questions.filter((question) => {
      if (reviewSubject && question.subjectId !== reviewSubject) return false
      if (!wanted.size) return true
      return (question.conceptIds ?? []).some((id) => wanted.has(id))
    })
    if (!pool.length) return
    openedReview.current = true
    // Unnamed, as it has always been: a link arrives with no name to give it,
    // and `autoSessionName` describes the setup form's scope, not this one's.
    requestSession(shuffle(pool).slice(0, Math.min(REVIEW_SESSION_SIZE, pool.length)))
    // beginSession is redefined every render; the ref above is what makes this
    // run once, so re-running on its identity would defeat the guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, reviewConcepts, reviewSubject])

  /**
   * A single question opened by id — e.g. from a Question Notes card. `?q=<id>`
   * begins a one-question tutor sitting on exactly that question, so a note
   * links back to the thing it was written about.
   */
  const singleQuestion = params.get('q')
  const openedSingle = useRef(false)
  useEffect(() => {
    if (openedSingle.current || !singleQuestion || !questions.length) return
    const question = questions.find((entry) => entry.id === singleQuestion)
    if (!question) return
    openedSingle.current = true
    requestSession([question])
    // requestSession is redefined every render; the ref above makes this run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, singleQuestion])

  // Every live test has an elapsed clock. Timed mode interprets it against the
  // sitting allowance; Tutor mode presents the same value as a calm count-up.
  useEffect(() => {
    if (phase !== 'running' || reviewing || visibilityPaused) return
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [phase, reviewing, visibilityPaused])

  /** Close the clock on whichever question was showing, and open it on this one. */
  const switchTiming = useCallback((nextId: string | null) => {
    const previous = timingId.current
    if (previous && previous !== nextId) {
      timeSpent.current[previous] = (timeSpent.current[previous] ?? 0) + Math.max(0, elapsedRef.current - questionStartedAt.current)
    }
    if (previous !== nextId) {
      timingId.current = nextId
      questionStartedAt.current = elapsedRef.current
    }
  }, [])

  // Landing on a question is what makes it "seen", however the student got here —
  // Next, Previous, or a jump from the navigator.
  useEffect(() => {
    setVisited((current) => (current.has(idx) ? current : new Set(current).add(idx)))
    switchTiming(session[idx]?.id ?? null)
  }, [idx, session, switchTiming])

  /**
   * Open a session on a chosen set of questions.
   *
   * An empty set is refused rather than entered. The runner indexes straight
   * into `session[idx]`, so starting with nothing to ask crashed the page —
   * which is what every quick-start button did on a bank with no published
   * questions in it.
   */
  function beginSession(picked: Question[], name?: string) {
    if (!picked.length) return
    // Three things hang off one id, and all three are minted here.
    //
    // The name, because callers used to write it against whatever `sessionId`
    // happened to hold and then this replaced it — so every test a student
    // named was filed under the previous id and read as "Untitled test".
    //
    // The manifest, because the other cure for that bug was to mint the id at
    // the caller and pass it down, which each caller then had to get right.
    // Minting once here is the same fix without the obligation, and the
    // manifest has to travel with it: "omitted" is a sitting's served questions
    // minus its attempt records, and those records are written against
    // `sessionId`, so a manifest under any other id subtracts nothing and every
    // question served looks omitted.
    const id = newSessionId()
    // Starting is also a decision about the stored sitting: it is superseded,
    // so a read still in flight must not be allowed to land on top of this one.
    restored.current = true
    startedAt.current = new Date().toISOString()
    timeSpent.current = {}
    timingId.current = null
    if (name?.trim()) setSavedNames((current) => ({ ...current, [id]: name.trim() }))
    // Filed at the start, not at the end: a test abandoned halfway still served
    // its questions, and the ones never reached are still omitted.
    setSessionQuestions((current) => pruneManifests({ ...current, [id]: picked.map((question) => question.id) }))
    mirroredSittingId.current = id
    setSession(picked)
    setSessionId(id)
    setIdx(0)
    setAnswers({})
    setStruck({})
    setChecked({})
    setReviewing(false)
    setReviewReturn('results')
    setSubmitted(false)
    setElapsed(0)
    setVisibilityPaused(false)
    questionStartedAt.current = 0
    setVisited(new Set([0]))
    setPhase('running')
  }

  /**
   * Start a sitting, asking first if it would throw an open one away.
   *
   * Carries the name rather than an id: the id is `beginSession`'s to mint, and
   * a start the student may yet cancel should not have minted one.
   */
  function requestSession(picked: Question[], name?: string) {
    if (!picked.length) return
    if (saved && !saved.submitted && saved.questionIds.length > 0) {
      setPendingStart({ picked, name })
      return
    }
    beginSession(picked, name)
  }

  /**
   * Names the student's own tests per subject: "Cardiovascular · Test 3".
   *
   * Counting only sittings whose name shares the stem means renaming one does
   * not renumber the rest, and a session spanning subjects is simply "Mixed".
   */
  const sessionSummaries = useMemo(() => bySession(history.records), [history.records])

  /**
   * Sittings that are not MCQ papers, under whichever filter is on.
   *
   * MCQ rows still come from the attempt log rather than from the ledger: that
   * grouping is what every MCQ sitting a student has ever sat is recorded as,
   * including the ones from before this ledger existed. Reading them out of the
   * ledger instead would have quietly emptied the list for everyone already
   * using the app.
   */
  const otherSittings = useMemo(() => {
    const others = sittingsLedger.sittings.filter((sitting) => sitting.kind !== 'mcq')
    return previousFilter === 'all' ? others : others.filter((sitting) => sitting.kind === previousFilter)
  }, [sittingsLedger.sittings, previousFilter])

  /** What each filter chip stands for, and what the hub's tab counts. */
  const previousCounts = useMemo(() => {
    const doc = { version: 1 as const, sittings: sittingsLedger.sittings }
    const counts: Record<SittingKind, number> = {
      mcq: sessionSummaries.length,
      practical: sittingsOfKind(doc, 'practical').length,
      essay: sittingsOfKind(doc, 'essay').length,
      mixed: sittingsOfKind(doc, 'mixed').length,
    }
    return { ...counts, all: counts.mcq + counts.practical + counts.essay + counts.mixed }
  }, [sittingsLedger.sittings, sessionSummaries.length])

  /**
   * The questions a finished sitting can be reopened with.
   *
   * Rebuilt from the attempt log, which has always recorded which item each
   * answer belonged to. A question since unpublished simply is not in the list,
   * and a sitting with none left cannot be reviewed — said by disabling the
   * action rather than by opening an empty runner.
   */
  const reviewableQuestions = useCallback((sessionId: string) => {
    const itemIds = history.records
      .filter((record) => record.sessionId === sessionId && record.surface === 'qbank')
      .map((record) => record.itemId)
    return itemIds
      .map((itemId) => questions.find((question) => question.id === itemId))
      .filter((question): question is Question => Boolean(question))
  }, [history.records, questions])

  /**
   * Where a read-only view goes when it is done.
   *
   * A past test has results to go back to; a collection does not — it was never
   * sat as a sitting — so it returns to the hub instead.
   */
  const [reviewReturn, setReviewReturn] = useState<'setup' | 'results'>('results')

  /**
   * Sit the same questions again, as a new test.
   *
   * A new session id, so this is a second sitting rather than an edit of the
   * first: both stay in the history and the comparison between them is the
   * whole point. Reshuffled, because remembering that the answer to number four
   * was B is not the same as knowing it.
   */
  function retakeSameQuestions(previousId: string) {
    const rebuilt = reviewableQuestions(previousId)
    if (!rebuilt.length) return
    // Through `requestSession`, not straight into `beginSession`: a retake is
    // another way of starting a test, and starting one over a sitting the
    // student still has paused would throw that sitting away without asking.
    requestSession(shuffle(rebuilt), `${savedNames[previousId]?.trim() || t('Untitled test')} · ${t('retake')}`)
  }

  /**
   * A fresh test over the same ground.
   *
   * The subjects that sitting covered, drawn from everything published in them
   * — including the questions it asked, since a bank rarely holds enough to
   * exclude them and silently returning four questions for a twenty-question
   * retake would be worse than repeating some.
   */
  function retakeSameScope(entry: SessionSummary) {
    const wanted = new Set(entry.subjectIds)
    const pool = questions.filter((question) => wanted.has(question.subjectId))
    if (!pool.length) return
    const scopeName = entry.subjectIds.length === 1 ? subjectName(entry.subjectIds[0]) : t('Mixed')
    requestSession(
      shuffle(pool).slice(0, Math.min(Math.max(entry.answered, 1), pool.length)),
      `${scopeName} · ${t('Test')} ${sessionSummaries.length + 1}`,
    )
  }

  /** Put a finished sitting back on screen, read-only, with its answers. */
  function reviewSession(sessionId: string) {
    const rebuilt = reviewableQuestions(sessionId)
    if (!rebuilt.length) return
    const answered: Record<string, number> = {}
    const marked: Record<string, boolean> = {}
    for (const record of history.records) {
      if (record.sessionId !== sessionId || record.surface !== 'qbank') continue
      marked[record.itemId] = true
      const question = rebuilt.find((item) => item.id === record.itemId)
      if (!question) continue
      const correctIndex = question.options.findIndex((option) => option.correct)
      if (typeof record.selectedIndex === 'number') answered[record.itemId] = record.selectedIndex
      // Legacy attempts predate selected-option storage. A correct answer can
      // still be reconstructed honestly; a wrong one remains unselected.
      else if (record.correct === true && correctIndex >= 0) answered[record.itemId] = correctIndex
    }
    mirroredSittingId.current = null
    setSession(rebuilt)
    setAnswers(answered)
    setChecked(marked)
    setVisited(new Set(rebuilt.map((_, index) => index)))
    setSessionId(sessionId)
    setSessionName(savedNames[sessionId] ?? t('Untitled test'))
    setIdx(0)
    setReviewing(true)
    setReviewReturn('results')
    setPhase('running')
  }

  /**
   * Pick a paused sitting back up exactly where it was left.
   *
   * The state it needs is restored here, not assumed: a collection or a past
   * test viewed since the last restore is sitting in the same slot, and the
   * stored document is the only durable copy of the real sitting.
   */
  function resumeSaved() {
    if (!saved) return
    // The same drop the mount effect performs, because that effect runs once and
    // never again: `usePublishedQuestions` can retire a question long after
    // `restored` is set, and `restoreFrom` filters tolerantly rather than
    // refusing. Without this, Continue opened a paper shorter than the one the
    // student started, still answering to their original answers, and the mirror
    // then wrote the shortened `questionIds` back over the stored sitting — the
    // full paper gone with no way back. See `restorableQuestions`.
    if (!restorableQuestions(saved, questions)) { setSaved(null); setPhase('setup'); return }
    restoreFrom(saved)
    setPhase(saved.phase)
  }

  /** The sitting is finished with — stop offering to resume it. */
  function discardSession() {
    startedAt.current = null
    mirroredSittingId.current = null
    // Only the sitting actually on screen — see `clearsStoredSitting`.
    if (clearsStoredSitting(saved, sessionId)) setSaved(null)
    setPhase('setup')
  }

  /**
   * Throw the stored sitting away, whatever the runner happens to be holding.
   *
   * The hub's two controls — Discard on the Continue card, End this test on the
   * live row of Previous tests — name the *stored* sitting; it is the only thing
   * either of them is describing. The runner's state slot is not it: viewing a
   * collection or a past test reassigns `sessionId`, so guarding these with
   * `clearsStoredSitting` the way the in-runner exits are guarded left them
   * silently doing nothing after any such detour, with the card still sitting
   * there. The in-runner exits keep that guard, because there "end this" really
   * does mean the sitting on screen — which may be a past test's results, and
   * must not take a separately paused sitting down with it.
   */
  function discardSaved() {
    startedAt.current = null
    mirroredSittingId.current = null
    setSaved(null)
  }

  /** Step out, keep the sitting. */
  function leaveSession() {
    switchTiming(null)
    setEndOpen(false)
    setVisibilityPaused(false)
    setPhase('setup')
    if (blocker.state === 'blocked') blocker.proceed()
  }

  /** Finish for good: mark what was answered, then show the paper. */
  function submitSession() {
    commitAnswers()
    setSubmitted(true)
    setEndOpen(false)
    setVisibilityPaused(false)
    setPhase('results')
    // Filed here, where the sitting actually ends, and under the same id its
    // records and its name already carry — so "Previous tests" can show an MCQ
    // paper beside a practical and a mixed sitting without three lists.
    recordMcqSitting()
    if (blocker.state === 'blocked') blocker.proceed()
  }

  /** File the MCQ sitting on screen into the unified ledger. */
  function recordMcqSitting() {
    if (!session.length) return
    const answered = session.filter((question) => answers[question.id] != null).length
    sittingsLedger.record({
      id: sessionId,
      kind: 'mcq',
      startedAt: startedAt.current ?? new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      name: savedNames[sessionId]?.trim() || sessionName.trim() || undefined,
      itemCount: session.length,
      result: {
        total: session.length,
        covered: answered,
        correct: session.filter((question) => question.options[answers[question.id]]?.correct).length,
      },
      itemIds: session.map((question) => question.id),
    })
  }

  function closeEndDialog() {
    setEndOpen(false)
    setVisibilityPaused(false)
    if (blocker.state === 'blocked') blocker.reset()
  }

  const removeAttemptSession = useDeleteAttemptSession()
  function deleteSession(sessionId: string) {
    removeAttemptSession(sessionId)
    setSavedNames((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
    setSessionQuestions((current) => {
      const next = { ...current }
      delete next[sessionId]
      return next
    })
    if (clearsStoredSitting(saved, sessionId)) setSaved(null)
    // Both ledgers, or a deleted test would keep its row under Previous tests
    // with nothing behind it.
    sittingsLedger.forget(sessionId)
  }

  const scopeSubjectName = useMemo(() => {
    const subjectIds = new Set(available.map((question) => question.subjectId))
    return subjectIds.size === 1 ? subjectName([...subjectIds][0]) : t('Mixed')
  }, [available, t, subjectName])
  const autoSessionName = useMemo(() => {
    const used = sessionSummaries.filter((summary: SessionSummary) => (savedNames[summary.sessionId] ?? '').startsWith(scopeSubjectName)).length
    return `${scopeSubjectName} · ${t('Test')} ${used + 1}`
  }, [scopeSubjectName, sessionSummaries, savedNames, t])

  function start() {
    // Named now rather than when it ends: a sitting abandoned halfway still
    // produced records, and those should not appear as an unnamed row. The name
    // travels with the questions instead of being filed here, because only
    // `beginSession` knows the id it will be filed under.
    requestSession(shuffle(available).slice(0, Math.min(count, available.length)), sessionName.trim() || autoSessionName)
  }

  function startPreset(kind: 'weak' | 'emergency' | 'demanding' | 'everything') {
    const labels = {
      weak: t('Your weakest topics'),
      emergency: t('Emergencies only'),
      demanding: t('Demanding questions'),
      everything: t('Everything, shuffled'),
    }
    // A quick start produced records under a name nobody had written, so every
    // one of them arrived in the history as "Untitled test".
    requestSession(shuffle(presetPool(kind)).slice(0, count), labels[kind])
  }

  // The composer renders the chips; the pools, counts and names stay here with
  // the rest of the session state, exactly as `startPreset` needs them.
  const builderPresets: TestBuilderPreset[] = [
    { id: 'weak', label: t('Your weakest topics'), icon: TrendingDown, count: presetCounts.weak, description: t('Questions from subjects where your marked answers show the lowest accuracy, once there is enough evidence.'), apply: () => startPreset('weak') },
    { id: 'emergency', label: t('Emergencies only'), icon: Siren, count: presetCounts.emergency, description: t('Acute and emergency-care questions selected from their authored topics and tags.'), apply: () => startPreset('emergency') },
    { id: 'demanding', label: t('Demanding questions'), icon: Flame, count: presetCounts.demanding, description: t('Questions authored as moderate, hard, or challenging for focused reasoning practice.'), apply: () => startPreset('demanding') },
    { id: 'everything', label: t('Everything, shuffled'), icon: Shuffle, count: presetCounts.everything, description: t('Every question available to your university and year, mixed into a new random order.'), apply: () => startPreset('everything') },
  ]

  const stats = useMemo(() => {
    const correct = session.filter((q) => q.options[answers[q.id]]?.correct).length
    return { correct }
  }, [session, answers])

  /* ---- Mixed sitting (direction 2) ------------------------------------ */
  // Ahead of the catalogue guard below: a mixed sitting can be all essays and
  // all practicals, and an empty MCQ catalogue must not swallow it.
  if (phase === 'setup' && mixed.session && !mixedFinished(mixed.session)) {
    return (
      <>
        <MixedRunner
          session={mixed.session}
          questions={questions}
          onMark={mixed.mark}
          onNext={() => {
            if (mixed.session && mixed.session.cursor >= mixed.session.items.length - 1) setMixedEndedAt(Date.now())
            mixed.next()
          }}
          onEnd={() => { setMixedEndedAt(Date.now()); mixed.finish() }}
        />
        {mixedLeaveOpen && (
          <Dialog onClose={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.reset() }} label={t('Leave this test?')} size="sm">
            <PanelHeader title={t('Leave this test?')} icon={AlertTriangle} />
            <div className="space-y-4 p-5">
              <p className="text-[13.5px] leading-relaxed text-ink-2">
                {t('The sitting is kept where it is — everything you have already done is recorded, and coming back opens the same item.')}
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="md" onClick={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.reset() }}>
                  {t('Stay in the test')}
                </Button>
                <Button variant="primary" size="md" onClick={() => { setMixedLeaveOpen(false); if (blocker.state === 'blocked') blocker.proceed() }}>
                  {t('Leave, and keep it')}
                </Button>
                <Button variant="ghost" size="md" onClick={() => { setMixedLeaveOpen(false); setMixedEndedAt(Date.now()); mixed.finish(); if (blocker.state === 'blocked') blocker.reset() }}>
                  {t('End the test and see the report')}
                </Button>
              </div>
            </div>
          </Dialog>
        )}
      </>
    )
  }

  // Only the sitting that ended *in this visit* shows its report. A finished
  // document found in storage belongs to a visit that is over — the tab was
  // closed on the report, or the write that cleared it never flushed — and
  // rendering it again put the student in front of a screen whose only exit was
  // the button they had already pressed. The sweep effect clears it instead;
  // the sitting itself is still in Previous tests. See `mixedClosed`.
  if (phase === 'setup' && mixed.session && mixedEndedAt != null) {
    return (
      <MixedSummary
        session={mixed.session}
        endedAt={mixedEndedAt}
        onDone={() => { setMixedEndedAt(null); mixed.end() }}
      />
    )
  }

  /* ---- Setup --------------------------------------------------------- */
  if (phase === 'setup' && availability.kind !== 'ready') {
    return (
      <PageContainer>
        <PageHeader title={t('Question Bank')} />
        <CatalogueUnavailable
          availability={availability}
          empty={{
            title: t('No questions have been published yet'),
            description: t('Questions appear here once they are published. Nothing is lost — your progress and saved sessions are kept.'),
          }}
        />
      </PageContainer>
    )
  }

  if (phase === 'setup') {
    return (
      <PageContainer>
        {pendingStart && (
          <Dialog onClose={() => setPendingStart(null)} label={t('Replace the open test?')} size="sm">
            <PanelHeader title={t('Replace the open test?')} icon={AlertTriangle} />
            <div className="space-y-4 p-5">
              <p className="text-[13.5px] leading-relaxed text-ink-2">
                {t('You have a test still open. Starting a new one replaces it, and anything you have not had marked is lost.')}
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="md" iconLeft={Play} onClick={() => { setPendingStart(null); resumeSaved() }}>
                  {t('Go back to the open test')}
                </Button>
                <Button variant="primary" size="md" onClick={() => { const next = pendingStart; setPendingStart(null); beginSession(next.picked, next.name) }}>
                  {t('Replace it and start')}
                </Button>
                <Button variant="ghost" size="md" onClick={() => setPendingStart(null)}>{t('Cancel')}</Button>
              </div>
            </div>
          </Dialog>
        )}

        <QbankHub
          bank={bank}
          onBankChange={setBank}
          tab={hubTab}
          onTabChange={setHubTab}
          previousCount={previousCounts[bank]}
          banner={saved && !saved.submitted && saved.questionIds.length > 0 ? (
            <div className="mb-5">
              <ContinueCard
                name={savedNames[saved.sessionId]?.trim() || t('Untitled test')}
                answered={Object.keys(saved.answers).length}
                total={saved.questionIds.length}
                onContinue={resumeSaved}
                onDiscard={discardSaved}
              />
            </div>
          ) : undefined}
        >
          {hubTab === 'previous' ? (
            <PreviousTestsTab
              filter={previousFilter}
              onFilterChange={setPreviousFilter}
              counts={previousCounts}
              showMcq={previousFilter === 'all' || previousFilter === 'mcq'}
              showOthers={previousFilter !== 'mcq'}
              others={<SittingRows sittings={otherSittings} onDelete={sittingsLedger.forget} />}
              mcq={(
                <PreviousTests
                  sessions={sessionSummaries}
                  names={savedNames}
                  // `liveSittingId`, not `saved?.sessionId`: a submitted sitting is
                  // still stored, and calling that one "in progress" put Resume on a
                  // test that was already finished.
                  liveSessionId={liveSittingId(saved)}
                  records={history.records}
                  questions={questions}
                  onRename={(sessionId, name) => setSavedNames((current) => ({ ...current, [sessionId]: name }))}
                  onResume={resumeSaved}
                  onTerminate={discardSaved}
                  onReview={reviewSession}
                  onRetakeSame={retakeSameQuestions}
                  onRetakeScope={retakeSameScope}
                  onDelete={deleteSession}
                  canReview={(sessionId) => reviewableQuestions(sessionId).length > 0}
                  canRetakeSame={(sessionId) => reviewableQuestions(sessionId).length > 0}
                  t={t}
                />
              )}
            />
          ) : (
            <UnifiedBuilder
              bank={bank}
              questions={questions}
              collections={collectionQuestions}
              onStart={(pools, split) => mixed.start(pools, split)}
              // One node, handed to the MCQ composer and to the other three
              // banks, so "Your progress" sits in the same place whichever
              // bank is open. Its filter preselects to `bank`.
              stats={<YourProgress bank={bank} questions={questions} history={history} />}
              mcq={(
                <TestBuilder
                  source={source}
                  setSource={setSource}
                  sourceCounts={sourceCounts}
                  sourceSel={sourceSel}
                  sourceCards={sourceCards}
                  scope={scope}
                  setScope={setScope}
                  scopePool={articleQuestions}
                  scopeCountPool={treeCountPool}
                  count={count}
                  setCount={setCount}
                  mode={mode}
                  setMode={setMode}
                  sessionName={sessionName}
                  setSessionName={setSessionName}
                  autoSessionName={autoSessionName}
                  matching={available.length}
                  pool={articleQuestions.length}
                  onStart={start}
                  presets={builderPresets}
                  stats={<YourProgress bank={bank} questions={questions} history={history} />}
                />
              )}
            />
          )}
        </QbankHub>
      </PageContainer>
    )
  }

  /* ---- Results ------------------------------------------------------- */
  if (phase === 'results') {
    // `beginSession` refuses an empty set, so this can only be reached by a
    // stale state. Dividing by zero would print "NaN%" as a score.
    if (!session.length) { discardSession(); return null }
    const pct = Math.round((stats.correct / session.length) * 100)
    const recorded = history.records.filter((record) => record.sessionId === sessionId && record.surface === 'qbank')
    const reportRecords = recorded.length
      ? history.records
      : [
          ...history.records,
          ...session.flatMap((question) => {
            const selectedIndex = answers[question.id]
            if (selectedIndex == null) return []
            const correctIndex = question.options.findIndex((option) => option.correct)
            const timing = timedClock(session.length, elapsed)
            return [{
              id: `${sessionId}:qbank:${question.id}`,
              at: new Date().toISOString(),
              surface: 'qbank' as const,
              itemId: question.id,
              subjectId: question.subjectId,
              topic: question.topic,
              difficulty: question.difficulty,
              conceptIds: question.conceptIds ?? [],
              correct: Boolean(question.options[selectedIndex]?.correct),
              seconds: mode === 'timed' ? timeSpent.current[question.id] ?? null : null,
              selectedIndex,
              ...(correctIndex >= 0 ? { correctIndex } : {}),
              ...(question.libraryRefs[0]?.title ? { subtopic: question.libraryRefs[0].title } : {}),
              ...(question.source ? { source: question.source } : {}),
              ...(mode === 'timed' ? {
                sessionDurationSeconds: elapsed,
                sessionOvertimeSeconds: timing.overtime,
              } : {}),
              sessionId,
            }]
          }),
        ]
    const report = sessionDetail(reportRecords, sessionId)
    const resultClock = timedClock(session.length, elapsed)
    return (
      <PageContainer className="max-w-[900px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary-tint text-primary">
            <Icon icon={Trophy} size={24} />
          </div>
          <h1 className="font-serif text-[28px] font-semibold tracking-[-0.02em] text-ink">
            {t('Session complete')}
          </h1>
          <p className="mt-1 text-[14px] text-ink-2">
            {t('You scored')}{' '}
            <span className="font-medium text-ink">
              {stats.correct} {t('of')} {session.length}
            </span>{' '}
            ({pct}%){mode === 'timed' && <>{' '}{t('in')} {clock(elapsed)}{resultClock.overtime > 0 ? ` · +${clock(resultClock.overtime)} ${t('overtime')}` : ''}</>}.
          </p>
        </div>

        <Panel className="mb-4">
          <PanelHeader title={t('Full test report')} icon={ListChecks} hint={t('Accuracy, pace, weak areas, and every marked answer')} />
          <SessionDetailPanel detail={report} questions={session} total={session.length} t={t} />
        </Panel>

        <div className="flex justify-center gap-2">
          <Button
            variant="secondary"
            size="md"
            iconLeft={BookOpen}
            onClick={() => {
              // Every opener of a review has to state its own exit, because
              // `reviewReturn` outlives the review that last set it. A collection
              // viewed earlier in the same mount leaves it at 'setup', and this
              // button — pressed from the results screen the student is standing
              // on — then offered "Done" back to the hub instead of "Back to
              // results". The other two openers already declare it.
              setReviewReturn('results')
              setReviewing(true)
              setIdx(0)
              setPhase('running')
            }}
          >
            {t('Review answers')}
          </Button>
          <Button variant="primary" size="md" iconLeft={RotateCcw} onClick={discardSession}>
            {t('New session')}
          </Button>
        </div>
      </PageContainer>
    )
  }

  /* ---- Running ------------------------------------------------------- */
  const q = session[idx]
  // The runner indexes straight into the session, so a missing question is a
  // crash rather than a blank screen. Falling back to setup is the only safe
  // reading of "running with nothing to ask".
  if (!q) { discardSession(); return null }
  // Reviewing always reveals. Otherwise only Tutor does, and only for a
  // question whose answer the student asked to check. Reading `checked` alone
  // meant anything that put a value in that map — a restored sitting, the
  // grading pass at the end of a timed block — turned the marking on underneath
  // a student who was still working.
  const revealed = reviewing || (mode === 'tutor' && Boolean(checked[q.id]))
  const chosen = answers[q.id]
  // `distribution` was fetched above for `session[idx]?.id`, which is this
  // same `q` by construction — see the unconditional hook call near the top.
  const showStats = revealed && Boolean(distribution?.eligible) && Boolean(distribution?.counts)
  const percentages = showStats ? answerPercentages(distribution!.counts!, distribution!.total) : null
  const last = idx === session.length - 1
  const correctRationale = q.options.find((option) => option.correct)?.rationale.trim() ?? ''
  // The importer copies the correct option's explanation into `Explanation`, so on
  // an imported question the panel below would repeat the rationale already sitting
  // under the right answer. Only show it when it genuinely says something else.
  const hasSeparateExplanation = Boolean(q.explanation.trim()) && q.explanation.trim() !== correctRationale
  // Split view only ever changes anything once there is an answer to show —
  // and only at the breakpoint the toggle itself is offered at.
  const splitActive = revealed && splitView && isDesktop

  /**
   * The record one answer produces, and the mastery evidence that goes with it.
   *
   * Shared by the two writers so they cannot drift: one commits a single answer
   * as it is checked, the other commits a whole sitting at the end, and a
   * question must not be worth different things depending on which ran.
   */
  function attemptFor(question: Question, chosenIndex: number, seconds: number | null) {
    const correct = Boolean(question.options[chosenIndex]?.correct)
    const correctIndex = question.options.findIndex((option) => option.correct)
    const conceptIds = question.conceptIds ?? []
    const timing = timedClock(session.length, elapsedRef.current)
    // The mastery ledger only takes concept-tagged evidence, but the attempt
    // log takes every answer: an untagged question still happened.
    if (conceptIds.length) record({ conceptIds, source: 'question', correct })
    return {
      surface: 'qbank' as const,
      itemId: question.id,
      subjectId: question.subjectId,
      topic: question.topic,
      difficulty: question.difficulty,
      conceptIds,
      correct,
      seconds,
      selectedIndex: chosenIndex,
      ...(correctIndex >= 0 ? { correctIndex } : {}),
      ...(question.libraryRefs[0]?.title ? { subtopic: question.libraryRefs[0].title } : {}),
      ...(question.source ? { source: question.source } : {}),
      ...(mode === 'timed' ? {
        sessionDurationSeconds: elapsedRef.current,
        sessionOvertimeSeconds: timing.overtime,
      } : {}),
      sessionId,
    }
  }

  function checkAnswer() {
    // Nothing is revealed until there is an answer to reveal. Marking the
    // question checked first meant pressing Check with no option selected
    // exposed the right answer and recorded nothing.
    if (checked[q.id] || chosen == null) return
    // Reconciled: main moved this `setChecked` below the guard above, so
    // pressing Check with nothing selected can no longer expose the right
    // answer; the incoming branch factored the record out into `attemptFor`, so
    // one answer and a whole sitting cannot value a question differently. Both.
    setChecked((c) => ({ ...c, [q.id]: true }))
    // Tutor's visible clock measures the sitting, not the speed of a single
    // answer. Keep its attempt untimed so time spent reading feedback is never
    // mistaken for answer latency. A timed sitting is measured by
    // `switchTiming`, which owns `questionStartedAt`, and committed by
    // `commitAnswers`.
    logAttempt(attemptFor(q, chosen, null))
  }

  /*
   * Reconciled here. Main added `gradeTimedBlock` — write the missing records
   * for a timed block when the student leaves it, carrying the per-question
   * time its `switchTiming` clock measures — plus a `showResults` that ran it on
   * the way to the paper. The incoming branch added `commitAnswers`, built on
   * the tested `pendingAttempts`, run from "End and submit" and from "See
   * results".
   *
   * They are the same fix for the same defect, so one survives: the tested one.
   * But `commitAnswers` wrote `seconds: null` because at the time nothing had
   * measured a timed question, and main's clock now has — so the measurement is
   * carried across rather than thrown away with the function that took it.
   *
   * Main's other call site is not carried across. It graded on *any* exit from
   * the runner, which was right when End was the only way out; the incoming
   * branch splits that into "Leave for now" and "End and submit", and grading a
   * sitting the student has explicitly kept open would freeze their answers —
   * `addAttempt` refuses a second record for the same id, so an answer changed
   * after resuming would never reach the log. Committing is what submitting
   * means.
   */

  /**
   * Rule an option in or out.
   *
   * Ruling out the option that is currently selected clears the selection:
   * leaving a pick on something the student has just crossed off would submit
   * an answer they have visibly stopped believing.
   */
  function toggleStrike(index: number) {
    const ruledOut = !(struck[q.id] ?? []).includes(index)
    setStruck((current) => {
      const next = new Set(current[q.id] ?? [])
      if (!next.delete(index)) next.add(index)
      return { ...current, [q.id]: [...next] }
    })
    if (ruledOut && answers[q.id] === index) {
      setAnswers((current) => {
        const next = { ...current }
        delete next[q.id]
        return next
      })
    }
  }

  /**
   * Write a record for every answered question that does not have one.
   *
   * What a timed sitting owes the log at the end — see `pendingAttempts`.
   *
   * `seconds` comes from the per-question clock in timed mode. Tutor's count-up
   * is session context only, so it deliberately files no answer-latency value.
   */
  function commitAnswers() {
    const pending = pendingAttempts(session, answers, checked)
    if (!pending.length) return
    // Close the clock on the question still showing, or its time is lost.
    switchTiming(null)
    logAttempts(pending.map((question) => attemptFor(
      question,
      answers[question.id],
      mode === 'timed' ? timeSpent.current[question.id] ?? null : null,
    )))
    setChecked((current) => {
      const next = { ...current }
      for (const question of pending) next[question.id] = true
      return next
    })
  }

  function stateFor(i: number): QuestionState {
    const item = session[i]
    const picked = answers[item.id]
    if (picked == null) return visited.has(i) && i !== idx ? 'omitted' : 'unseen'
    if (reviewing || checked[item.id]) return item.options[picked]?.correct ? 'correct' : 'incorrect'
    return 'answered'
  }

  function optionClasses(i: number): string {
    if (!revealed)
      return chosen === i
        ? 'border-primary bg-primary-tint/50'
        : 'border-line bg-surface hover:border-line-2'
    if (q.options[i].correct) return 'border-success bg-success-tint'
    if (chosen === i) return 'border-danger bg-danger-tint'
    return 'border-line bg-surface opacity-70'
  }

  const sessionClock = timedClock(session.length, elapsed)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6">
      {/* Runner header */}
      <div className="mb-4">
        {/* The position is stated once, by the navigator below. This line used
            to repeat it as "Question 1 of 5" directly above "QUESTIONS 1/5". */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {reviewing && <span className="text-[13px] font-medium text-primary">{t('Reviewing')}</span>}
          <div className="flex items-center gap-2 sm:ms-auto">
            {/* Rearranging the question into two columns only makes sense
                once there is an answer to look at, and only where there is
                room for two columns side by side. */}
            {revealed && (
              <IconButton
                icon={Columns2}
                label={splitView ? t('Single column') : t('Split view')}
                active={splitView}
                variant="surface"
                className="hidden lg:inline-flex"
                onClick={() => setSplitView((value) => !value)}
              />
            )}
            {/* The clock is the whole point of this mode, so it is a fixture
                rather than a caption: same place, same width, legible across
                the room. It was previously grey mono text among four other
                grey controls, which is close to not being there. */}
            {!reviewing && (
              <span
                className={cn(
                  'tnum inline-flex items-center gap-1.5 rounded-lg border bg-surface px-2.5 py-1.5 font-mono text-[14px] font-semibold shadow-panel',
                  mode === 'timed' && sessionClock.overtime > 0 ? 'border-danger/40 text-danger' : 'border-line-2 text-ink',
                )}
                aria-label={mode === 'tutor'
                  ? `${t('Elapsed time')} ${clock(elapsed)}`
                  : sessionClock.overtime > 0
                    ? `${t('Overtime')} ${clock(sessionClock.overtime)}`
                    : `${t('Time remaining')} ${clock(sessionClock.remaining)}`}
              >
                <Icon icon={Clock} size={15} className="text-primary" />
                {mode === 'tutor'
                  ? clock(elapsed)
                  : sessionClock.overtime > 0
                    ? `+${clock(sessionClock.overtime)}`
                    : clock(sessionClock.remaining)}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-inset">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((idx + 1) / session.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-5">
        <div className="min-w-0">
      <QuestionNavigator
        className="mb-4"
        count={session.length}
        current={idx}
        stateFor={stateFor}
        isFlagged={(i) => marked.has(session[i].id)}
        onJump={setIdx}
        graded={reviewing || mode === 'tutor'}
      />

      <Panel ref={questionCardRef} className="p-5 sm:p-6">
        {/* Select any of the stem, an option, or an explanation to highlight
            it — one colour, no toolbar. Scoped to this card so a selection
            made anywhere else on the page (the navigator, the study rail)
            never opens it. */}
        <HighlightSelectionPopover container={questionCardRef} highlights={highlights} />
        {/* In split view the question stays in this column and the answer
            area (explanations, per-option rationale, the explicit
            `Explanation` text) moves into a second column alongside it. Below
            `lg`, or with the toggle off, or before the answer is revealed,
            this is just one column and the two `lg:grid-cols-2` cells stack
            in source order — question, then answer area. */}
        <div className={cn(splitActive && 'lg:grid lg:grid-cols-2 lg:items-start lg:gap-6')}>
          <div className={cn(splitActive && 'lg:border-e lg:border-line lg:pe-6')}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
                <SubjectDot id={q.subjectId} />
                {subjectName(q.subjectId)}
              </span>
              <span className="text-ink-3">·</span>
              <span className="text-[12.5px] text-ink-3">{q.topic}</span>
              <Badge tone={diffTone(q.difficulty)} className="ml-auto">
                {q.difficulty}
              </Badge>
            </div>

            <p className="mt-4 text-[15px] leading-[1.65] text-ink/90"><HighlightableText text={q.vignette} enabled={revealed} blockId="vignette" highlights={highlights} /></p>
            <p className="mt-3 text-[15.5px] font-semibold leading-snug text-ink"><HighlightableText text={q.stem} enabled={revealed} blockId="stem" highlights={highlights} /></p>

            {q.attachedImage && (
              <div className="mt-4 overflow-hidden rounded-xl border border-line bg-inset p-2">
                <ZoomableImage src={q.attachedImage} alt={t('Question attachment')} className="max-h-80 w-full rounded-lg object-contain" />
              </div>
            )}
            {q.attachments && q.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {q.attachments.map((attachment) => <MediaAttachmentView key={attachment.id} attachment={attachment} />)}
              </div>
            )}

            {/* Once the answer is revealed an option stops being a control and
                becomes prose. It used to stay a `<button disabled>`, which swallows
                pointer events for everything inside it — so the concept links in
                the answers went live and dead at the same instant, and the one
                place they matter most was the one place they never worked. */}
            <div className="mt-5 space-y-2.5">
              {q.options.map((opt, i) => {
                const ruledOut = (struck[q.id] ?? []).includes(i)
                // What made this option right or wrong, read directly under
                // it once revealed — not collected separately at the bottom
                // of the page, or (in split view) in the answer-area column.
                const rationaleText = opt.rationale.trim()
                const badge = (
                  <span
                    className={cn(
                      'grid size-6 shrink-0 place-items-center rounded-full border text-[12px] font-semibold',
                      revealed && opt.correct
                        ? 'border-success bg-success text-on-success'
                        : revealed && chosen === i
                          ? 'border-danger bg-danger text-on-danger'
                          : chosen === i
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-line-2 text-ink-2',
                    )}
                  >
                    {revealed && opt.correct ? (
                      <Icon icon={Check} size={14} strokeWidth={2.6} />
                    ) : revealed && chosen === i ? (
                      <Icon icon={X} size={14} strokeWidth={2.6} />
                    ) : (
                      LETTERS[i]
                    )}
                  </span>
                )
                const text = (
                  <span className={cn('flex-1 pt-0.5 text-[14px] text-ink', ruledOut && 'line-through decoration-ink-3')}>
                    <HighlightableText text={opt.text} enabled={revealed} blockId={`option-${i}`} highlights={highlights} />
                  </span>
                )
                // main kept the badge and the option text as one inseparable
                // `body`, because on its side the whole row was a single control.
                // Here they are two: the badge answers and the text rules out, so
                // each needs to be placed on its own.
                const shape = cn(
                  'flex w-full items-start gap-3 rounded-lg border p-3 text-start transition-colors',
                  optionClasses(i),
                  ruledOut && !revealed && 'opacity-55',
                )
                const statTone = opt.correct ? 'correct' as const : chosen === i ? 'wrong' as const : 'neutral' as const
                return (
                  <div key={i}>
                    {revealed ? (
                      <div className={cn(shape, 'relative overflow-hidden')}>
                        {badge}
                        <div className="min-w-0 flex-1">
                          <span className="flex items-start gap-2">
                            {text}
                            {percentages && (
                              <span className="tnum shrink-0 self-start pt-0.5 font-mono text-[12px] font-semibold text-ink-2">
                                {percentages[i] ?? 0}%
                              </span>
                            )}
                          </span>
                          {/* Split view carries this same rationale in the
                              answer-area column instead, so it is not shown
                              twice. */}
                          {!splitActive && rationaleText && (
                            <p
                              className={cn(
                                'mt-2 rounded-lg border px-3 py-2 text-[12.5px] leading-relaxed',
                                opt.correct
                                  ? 'border-success/20 bg-success-tint/40 text-ink-2'
                                  : chosen === i
                                    ? 'border-danger/20 bg-danger-tint/40 text-ink-2'
                                    : 'border-line bg-surface-2 text-ink-3',
                              )}
                            >
                              <HighlightableText text={rationaleText} enabled blockId={`rationale-${i}`} highlights={highlights} />
                            </p>
                          )}
                        </div>
                        {percentages && <AnswerStatBar pct={percentages[i] ?? 0} tone={statTone} />}
                      </div>
                    ) : (
                      <div className={cn(shape, 'relative p-0')}>
                        <button
                          type="button"
                          onClick={() => {
                            // A drag that ends inside this button still fires a
                            // click. Without this guard, dragging across an
                            // option's text to highlight it would also select
                            // that option as the answer.
                            if (window.getSelection()?.isCollapsed === false) return
                            setAnswers((a) => ({ ...a, [q.id]: i }))
                            // Symmetric with `toggleStrike`, which drops the
                            // selection when it strikes the selected option — see
                            // `selectClearsStrike`.
                            setStruck((current) => selectClearsStrike(current, q.id, i))
                          }}
                          aria-pressed={chosen === i}
                          aria-label={`${t('Choose answer')} ${LETTERS[i]}: ${opt.text}`}
                          className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg p-3 pe-12 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                        >
                          {badge}
                          {text}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStrike(i)}
                          aria-pressed={ruledOut}
                          aria-label={`${ruledOut ? t('Rule back in') : t('Rule out')}: ${opt.text}`}
                          title={ruledOut ? t('Include this answer again') : t('Exclude this answer')}
                          className={cn(
                            'absolute end-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md border transition-colors sm:size-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                            ruledOut
                              ? 'border-danger/30 bg-danger-tint text-danger'
                              : 'border-transparent text-ink-3 hover:border-line hover:bg-inset hover:text-ink',
                          )}
                        >
                          <Icon icon={X} size={16} strokeWidth={2.3} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {revealed && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => { const correct = q.options.find((option) => option.correct); setFlashcardSeed({ front: q.stem, back: correct ? correct.text : q.explanation }) }}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink sm:min-h-0"
                >
                  <Icon icon={Sparkles} size={14} /> {t('Create flashcard')}
                </button>
              </div>
            )}

            {/* The explicit `Explanation` text (see `hasSeparateExplanation`)
                stays with the question in single column. In split view it
                moves to the answer-area column below instead of appearing
                twice. */}
            {revealed && !splitActive && hasSeparateExplanation && (
              <div className="mt-6 rounded-xl border border-line bg-surface-2 p-4">
                <p className="mb-1.5 text-[13px] font-semibold text-ink">{t('Explanation')}</p>
                <p className="text-[14px] leading-relaxed text-ink"><HighlightableText text={q.explanation} enabled blockId="explanation" highlights={highlights} /></p>
              </div>
            )}
          </div>

          {/* The answer area: every option's rationale gathered in one place,
              plus the explicit `Explanation` text — only ever shown here
              instead of under each option, never in addition to it. */}
          {revealed && splitActive && (
            <div className="mt-6 space-y-2.5 lg:mt-0">
              <p className="text-[13px] font-semibold text-ink">{t('Answer explanations')}</p>
              {q.options.map((opt, i) => {
                const rationaleText = opt.rationale.trim()
                if (!rationaleText) return null
                return (
                  <div
                    key={i}
                    className={cn(
                      'rounded-lg border px-3 py-2.5',
                      opt.correct
                        ? 'border-success/20 bg-success-tint/40'
                        : chosen === i
                          ? 'border-danger/20 bg-danger-tint/40'
                          : 'border-line bg-surface-2',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'grid size-5 shrink-0 place-items-center rounded-full border text-[11px] font-semibold',
                          opt.correct ? 'border-success bg-success text-on-success' : 'border-line-2 bg-surface text-ink-2',
                        )}
                      >
                        {opt.correct ? <Icon icon={Check} size={12} strokeWidth={2.6} /> : LETTERS[i]}
                      </span>
                      <span className="text-[12px] font-semibold text-ink">
                        {opt.correct ? t('Why the right answer is right') : t('Why this is wrong')}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
                      <HighlightableText text={rationaleText} enabled blockId={`rationale-${i}`} highlights={highlights} />
                    </p>
                  </div>
                )
              })}
              {hasSeparateExplanation && (
                <div className="rounded-xl border border-line bg-surface-2 p-4">
                  <p className="mb-1.5 text-[13px] font-semibold text-ink">{t('Explanation')}</p>
                  <p className="text-[14px] leading-relaxed text-ink"><HighlightableText text={q.explanation} enabled blockId="explanation" highlights={highlights} /></p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <Button
            variant="ghost"
            size="md"
            iconLeft={ArrowLeft}
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            {t('Previous')}
          </Button>

          {!reviewing && mode === 'tutor' && !checked[q.id] ? (
            <Button
              variant="primary"
              size="md"
              disabled={chosen == null}
              onClick={checkAnswer}
            >
              {t('Check answer')}
            </Button>
          ) : last ? (
            <Button
              variant="primary"
              size="md"
              iconRight={reviewing ? undefined : Trophy}
              // Reconciled: main's `showResults` graded a timed block on the
              // way to the paper — `commitAnswers` is the same commit, tested,
              // and the incoming branch also marks the sitting submitted and
              // clears `reviewing` on the other exit from a review.
              onClick={() => {
                if (!reviewing) { commitAnswers(); setSubmitted(true) }
                // The other way out of a review, and the same reason it has to
                // clear the flag as it goes.
                else setReviewing(false)
                setPhase(reviewing ? reviewReturn : 'results')
              }}
            >
              {reviewing ? t('Finish review') : t('See results')}
            </Button>
          ) : (
            <Button variant="primary" size="md" iconRight={ArrowRight} onClick={() => setIdx((i) => i + 1)}>
              {t('Next')}
            </Button>
          )}
        </div>
      </Panel>
        </div>

        <StudyRail
          question={q}
          revealed={revealed}
          location={location}
          flagged={marked.has(q.id)}
          onFlag={() => setMarked((current) => {
            const next = new Set(current)
            if (!next.delete(q.id)) next.add(q.id)
            return next
          })}
          onReport={() => setReportTarget({ kind: 'question', id: q.id, title: q.stem })}
          onEnd={() => {
            if (!reviewing) { setEndOpen(true); return }
            setReviewing(false)
            setPhase(reviewReturn)
          }}
          endLabel={reviewing ? (reviewReturn === 'results' ? t('Back') : t('Done')) : t('End')}
          className="lg:sticky lg:top-6"
        />
      </div>
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
      {flashcardSeed && (
        <QuickAddFlashcardDialog initialFront={flashcardSeed.front} initialBack={flashcardSeed.back} onClose={() => setFlashcardSeed(null)} />
      )}
      {endOpen && (
        <EndSessionDialog
          answered={session.filter((question) => answers[question.id] != null).length}
          total={session.length}
          onLeave={leaveSession}
          onSubmit={submitSession}
          onClose={closeEndDialog}
          interrupted={visibilityPaused || blocker.state === 'blocked'}
        />
      )}
    </div>
  )
}
