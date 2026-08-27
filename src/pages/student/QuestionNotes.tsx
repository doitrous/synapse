import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, History, Info, NotebookPen, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput } from '@/components/ui/Field'
import { FilterChip } from '@/components/ui/FilterChip'
import { SubjectTag } from '@/components/ui/Subject'
import { QBANK_NOTES_STORAGE_KEY } from '@/components/qbank/StudyRail'
import { usePersistentState } from '@/lib/usePersistentState'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { useAttemptHistory } from '@/lib/useAttemptLog'
import { questionNoteStats } from '@/data/questionNotes'
import { formatRelativeTime } from '@/lib/format'
import { getSubject } from '@/data/subjects'
import type { Question } from '@/data/qbank'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

/** `62s`, `1m 05s` — the short form used beside a single question, not a whole sitting. */
function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return rest === 0 ? `${minutes}m` : `${minutes}m ${String(rest).padStart(2, '0')}s`
}

/** The verdict pill for a question's most recent marked attempt. */
function LastAttemptBadge({ correct }: { correct: boolean | null }) {
  const t = useT()
  if (correct === null) {
    return <Badge tone="neutral" dot>{t('Not marked')}</Badge>
  }
  return correct
    ? <Badge tone="success" dot>{t('Correct')}</Badge>
    : <Badge tone="danger" dot>{t('Incorrect')}</Badge>
}

/** Whether the two most recent marked attempts moved the right way. */
function TrendNote({ trend }: { trend: 'improved' | 'slipped' | 'steady' | null }) {
  const t = useT()
  if (trend === null) return null
  if (trend === 'improved') {
    return (
      <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-success">
        <Icon icon={TrendingUp} size={13} />
        {t('Got it right after missing it before')}
      </span>
    )
  }
  if (trend === 'slipped') {
    return (
      <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-danger">
        <Icon icon={TrendingDown} size={13} />
        {t('Missed it this time, after getting it right before')}
      </span>
    )
  }
  return null
}

/** One note, its question, and how that question has gone for this student. */
function NoteCard({ question, note, stats }: {
  question: Question | undefined
  note: string
  stats: ReturnType<typeof questionNoteStats>
}) {
  const t = useT()
  const subject = question ? getSubject(question.subjectId) : null

  return (
    <Panel className="flex flex-col gap-3.5 p-4">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-primary-tint text-primary-strong">
          <Icon icon={NotebookPen} size={14} />
        </span>
        <p className="min-w-0 flex-1 whitespace-pre-wrap text-[13px] leading-relaxed text-ink">{note}</p>
      </div>

      <div className="border-t border-line pt-3">
        {question ? (
          <Link
            to="/app/qbank"
            className="group block rounded-lg border border-line bg-surface-2/40 px-3 py-2.5 transition-colors hover:border-primary-line hover:bg-primary-tint/20"
          >
            <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink group-hover:text-primary-strong">
              {question.stem}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              {subject && <SubjectTag id={question.subjectId} className="text-[11.5px]" />}
              <span className="text-[11.5px] text-ink-3">{question.topic}</span>
            </div>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-line px-3 py-2.5">
            <p className="text-[12.5px] text-ink-3">{t('This question is no longer published.')}</p>
          </div>
        )}
      </div>

      {question && (
        <div className="border-t border-line pt-3">
          {stats.attempts === 0 ? (
            <p className="inline-flex items-center gap-1.5 text-[12px] text-ink-3">
              <Icon icon={Info} size={13} />
              {t('Not yet answered')}
            </p>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <LastAttemptBadge correct={stats.lastCorrect} />
                {stats.lastSeconds != null && (
                  <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-2">
                    <Icon icon={Clock} size={12} className="text-ink-3" />
                    {formatDuration(stats.lastSeconds)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-2">
                  <Icon icon={History} size={12} className="text-ink-3" />
                  {stats.attempts} {stats.attempts === 1 ? t('attempt') : t('attempts')}
                </span>
              </div>
              <p className="text-[11px] text-ink-3">
                {t('Last attempted')} {stats.lastAt ? formatRelativeTime(stats.lastAt) : ''}
              </p>
              <TrendNote trend={stats.trend} />
            </div>
          )}
        </div>
      )}
    </Panel>
  )
}

/**
 * Every note a student has written while answering Question Bank items, each
 * beside the question it belongs to and how that question has gone for them.
 *
 * Notes and questions live in separate stores that know nothing of each
 * other — see `QBANK_NOTES_STORAGE_KEY` and `usePublishedQuestions` — so this
 * page is purely a join: nothing here is written, only read and laid out.
 */
export function QuestionNotes() {
  const t = useT()
  const [notes] = usePersistentState<Record<string, string>>(QBANK_NOTES_STORAGE_KEY, {})
  const questions = usePublishedQuestions()
  const history = useAttemptHistory()
  const [query, setQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)

  const questionsById = useMemo(() => new Map(questions.map((question) => [question.id, question])), [questions])

  const entries = useMemo(() => {
    return Object.entries(notes)
      .filter(([, text]) => text.trim().length > 0)
      .map(([questionId, text]) => ({
        questionId,
        note: text,
        question: questionsById.get(questionId),
        stats: questionNoteStats(history.records, questionId),
      }))
      // Most recently attempted first; a note whose question was never
      // attempted sorts after everything that has a date to sort by.
      .sort((a, b) => (b.stats.lastAt ?? '').localeCompare(a.stats.lastAt ?? ''))
  }, [notes, questionsById, history.records])

  const subjectOptions = useMemo(() => {
    const ids = new Set(entries.map((entry) => entry.question?.subjectId).filter((id): id is string => Boolean(id)))
    return [...ids].map((id) => getSubject(id)).sort((a, b) => a.name.localeCompare(b.name))
  }, [entries])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return entries.filter((entry) => {
      if (subjectFilter && entry.question?.subjectId !== subjectFilter) return false
      if (!needle) return true
      const haystack = [
        entry.note,
        entry.question?.stem ?? '',
        entry.question?.topic ?? '',
        entry.question ? getSubject(entry.question.subjectId).name : '',
      ].join(' ').toLowerCase()
      return haystack.includes(needle)
    })
  }, [entries, query, subjectFilter])

  return (
    <PageContainer>
      <PageHeader
        title={t('Question Notes')}
        description={t('Everything you have written while answering Question Bank items, next to how each question has gone for you.')}
      />

      {entries.length === 0 ? (
        <Panel>
          <EmptyState
            icon={NotebookPen}
            title={t('No notes yet')}
            description={t('Open a question in the Question Bank and use the notes field beside it — anything you write there collects here.')}
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Search your notes, or a question, subject or topic')}
              aria-label={t('Search question notes')}
              className="sm:max-w-sm"
            />
            {subjectOptions.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                <FilterChip active={subjectFilter === null} onClick={() => setSubjectFilter(null)}>
                  {t('All subjects')}
                </FilterChip>
                {subjectOptions.map((subject) => (
                  <FilterChip
                    key={subject.id}
                    active={subjectFilter === subject.id}
                    onClick={() => setSubjectFilter(subject.id === subjectFilter ? null : subject.id)}
                    color={subject.color}
                  >
                    {subject.name}
                  </FilterChip>
                ))}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <Panel>
              <EmptyState
                icon={Search}
                title={t('No notes match')}
                description={t('Try a different search term or clear the subject filter.')}
              />
            </Panel>
          ) : (
            <div className={cn('grid gap-4', 'sm:grid-cols-2 xl:grid-cols-3')}>
              {filtered.map((entry) => (
                <NoteCard key={entry.questionId} question={entry.question} note={entry.note} stats={entry.stats} />
              ))}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  )
}
