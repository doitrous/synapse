import { Link } from 'react-router-dom'
import { AlarmClock, BookOpenText, FileQuestion, PenLine, Stethoscope } from 'lucide-react'
import { EXAM_KIND_LABEL, type StudyKind } from '@/data/examProgramme'
import { useNextExam } from '@/lib/useExamProgramme'
import { useT } from '@/lib/i18n'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const KIND_ICON: Record<StudyKind, typeof FileQuestion> = {
  reading: BookOpenText,
  questions: FileQuestion,
  written: PenLine,
  practical: Stethoscope,
}

const KIND_LABEL: Record<StudyKind, string> = {
  reading: 'Read',
  questions: 'Questions',
  written: 'Written',
  practical: 'Practical',
}

/**
 * The next exam, and what to do about it today.
 *
 * Renders nothing when there is no exam ahead, which is most of the year. A
 * countdown to nothing is worse than no countdown: it trains a student to
 * ignore the panel, and then it is ignored in the week that matters.
 *
 * The day shown is today's, not the whole plan. A student three weeks out who
 * is handed twenty-one days of work at once reads it as an amount rather than a
 * sequence, and an amount that size is a reason to start tomorrow.
 */
export function ExamCountdown() {
  const t = useT()
  const next = useNextExam()
  if (!next?.programme) return null

  const { exam, programme } = next
  const today = programme.days[0]
  if (!today?.items.length) return null

  return (
    <Panel className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon icon={AlarmClock} size={15} className="text-primary" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">
              {EXAM_KIND_LABEL[exam.examKind ?? 'other']}
            </p>
          </div>
          <h2 className="mt-1 font-serif text-[19px] font-semibold text-ink">{programme.examTitle}</h2>
        </div>
        <p className="tnum shrink-0 text-end">
          <span className="block font-mono text-[26px] font-semibold leading-none text-ink">{programme.daysAway}</span>
          <span className="mt-0.5 block text-[11px] text-ink-3">
            {programme.daysAway === 1 ? t('day left') : t('days left')}
          </span>
        </p>
      </div>

      <p className="mt-3 text-[12px] text-ink-3">
        {today.isConsolidation
          ? t('Going back over everything — no new material this close to the paper.')
          : t('Today, weighted the way this paper is marked.')}
      </p>

      <ul className="mt-3 space-y-2">
        {today.items.map((item) => (
          <li key={item.kind} className="flex items-center gap-3 rounded-lg border border-line bg-surface-2/50 px-3 py-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-surface text-ink-2">
              <Icon icon={KIND_ICON[item.kind]} size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-ink">{t(KIND_LABEL[item.kind])}</span>
              <span className="tnum mt-0.5 block text-[11.5px] text-ink-3">
                {t('{count} items · about {minutes} min')
                  .replace('{count}', String(item.itemIds.length))
                  .replace('{minutes}', String(item.minutes))}
              </span>
            </span>
            <Link
              to={item.kind === 'questions' ? '/app/qbank'
                : item.kind === 'practical' ? '/app/practical'
                : item.kind === 'reading' ? '/app/library'
                : '/app/essays'}
              className={cn('shrink-0 rounded-lg border border-line bg-surface px-2.5 py-1.5',
                'text-[12px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink')}
            >
              {t('Open')}
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
