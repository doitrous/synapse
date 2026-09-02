import { useMemo, useState } from 'react'
import { ListChecks } from 'lucide-react'
import type { Question } from '@/data/qbank'
import { useSubjectName } from '@/lib/useSubjectName'
import {
  bankDailyCounts, bankSummary, weakestSubjects,
  type BankKind, type BankSources,
} from '@/data/bankStats'
import type { AttemptHistory } from '@/lib/useAttemptLog'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { usePracticalCatalogue } from '@/components/qbank/unified/practicalCatalogue'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Segmented } from '@/components/ui/Tabs'
import { Meter } from '@/components/ui/Meter'
import { TargetRing } from '@/components/ui/TargetRing'
import { SubjectDot } from '@/components/ui/Subject'
import { useT } from '@/lib/i18n'

/** Which bank the hub is on. `mixed` has no figures of its own — it is all of them. */
export type ProgressBank = 'mcq' | 'practical' | 'essay' | 'mixed'

/** Sunday first, matching `Date.getDay()`. Single letters, translated. */
const WEEKDAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/** How many systems the list shows before it stops being a summary. */
const SUBJECT_ROWS = 6

function kindOfBank(bank: ProgressBank): BankKind {
  return bank === 'mixed' ? 'all' : bank
}

/**
 * The student's own standing in whichever bank they are looking at.
 *
 * This panel used to be "Your Qbank" and it meant it literally: every figure
 * came from the MCQ attempt log, so a student who had spent a fortnight on
 * stations and written papers opened the hub to a panel saying they had done
 * nothing. It now reports on all four filters, and the filter follows the bank
 * chosen above it — with the student free to override it, because "how am I
 * doing overall" is a question worth asking from inside any one bank.
 *
 * Every figure below is a fold over `bankEvents`, so the filter cannot leave
 * one of them behind: see `src/data/bankStats.ts` for what a marked unit means
 * in each bank, and why the three cannot share one definition.
 */
export function YourProgress({
  bank,
  questions,
  history,
}: {
  bank: ProgressBank
  questions: Question[]
  history: AttemptHistory
}) {
  const t = useT()
  const subjectName = useSubjectName()
  const catalogue = usePracticalCatalogue()
  const { progress } = usePracticalProgress()
  const { answers } = useEssayAnswers()
  const essays = useLiveEssays()

  // The filter follows the bank, and the student can still override it. Derived
  // during render rather than in an effect: an effect would paint one frame of
  // the old bank's figures every time the hub's bank tab changed.
  const [kind, setKind] = useState<BankKind>(() => kindOfBank(bank))
  const [seenBank, setSeenBank] = useState<ProgressBank>(bank)
  if (seenBank !== bank) {
    setSeenBank(bank)
    setKind(kindOfBank(bank))
  }

  const sources: BankSources = useMemo(() => ({
    mcq: { records: history.records, total: questions.length },
    practical: {
      progress,
      catalogue: catalogue.entries.map((entry) => ({ id: entry.id, kind: entry.kind, subjectId: entry.subjectId })),
      records: history.records,
    },
    essay: { answers, essays },
  }), [history.records, questions.length, progress, catalogue.entries, answers, essays])

  const summary = useMemo(() => bankSummary(kind, sources), [kind, sources])
  const week = useMemo(() => bankDailyCounts(kind, sources, 7), [kind, sources])
  const subjectRows = useMemo(() => weakestSubjects(kind, sources, SUBJECT_ROWS), [kind, sources])

  const peak = Math.max(1, ...week.map((day) => day.attempts))
  const weekTotal = week.reduce((sum, day) => sum + day.attempts, 0)
  const remaining = Math.max(0, summary.total - summary.seen)

  const ringLabel = kind === 'mcq' ? t('Bank completed')
    : kind === 'practical' ? t('Practical items covered')
      : kind === 'essay' ? t('Essays covered')
        : t('Everything covered')

  const emptySubjects = kind === 'practical' ? t('No practical items attempted yet.')
    : kind === 'essay' ? t('No essays marked yet.')
      : kind === 'mcq' ? t('Answer a few questions in a subject and its accuracy appears here.')
        : t('Nothing recorded in any bank yet. Sit anything and its accuracy appears here.')

  // Said once, under the heading, because "accuracy" is three different
  // measurements and a bar that does not say which is a bar nobody can trust.
  const accuracyNote = kind === 'practical' ? t('Items passed, by the same rule your missed list uses.')
    : kind === 'essay' ? t('Key points you ticked, out of the key points the answer carries.')
      : kind === 'all' ? t('Every marked answer, passed item and ticked key point, counted once each.')
        : null

  return (
    <Panel className="h-fit">
      <PanelHeader title={t('Your progress')} icon={ListChecks} />
      <div className="space-y-5 p-5">
        {/* Which bank these figures cover. Preselected to the bank chosen in
            the hub, and overridable — the panel is also how a student asks
            "how am I doing overall" without leaving the composer. */}
        <div role="group" aria-label={t('Which bank these figures cover')}>
          <Segmented
            value={kind}
            onChange={(value) => setKind(value as BankKind)}
            // Full width so the four read as one control in a 20 rem column,
            // and 44 px tall below `sm` — the primitive's own `h-10` is a
            // desktop height, and `min-height` is what wins over it.
            className="w-full [&>button]:min-h-11 [&>button]:flex-1 sm:[&>button]:min-h-0"
            items={[
              { value: 'all', label: t('All') },
              { value: 'mcq', label: t('MCQ') },
              { value: 'practical', label: t('Practical') },
              { value: 'essay', label: t('Essay') },
            ]}
          />
        </div>

        <div className="flex items-center gap-4">
          <TargetRing
            value={Math.min(summary.seen, summary.total)}
            max={Math.max(summary.total, 1)}
            size={76}
            thickness={6}
            aria-label={ringLabel}
          />
          <div className="min-w-0">
            <p className="text-[12px] text-ink-3">{ringLabel}</p>
            <p className="tnum font-mono text-[17px] font-semibold text-ink">
              {summary.seen.toLocaleString()} / {summary.total.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[11.5px] text-ink-3">{remaining.toLocaleString()} {t('remaining')}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-line pt-4">
          {[
            {
              key: 'accuracy',
              value: summary.accuracy === null ? '—' : `${Math.round(summary.accuracy * 100)}%`,
              label: t('Accuracy'),
              tone: 'text-success',
            },
            { key: 'week', value: String(weekTotal), label: t('This week'), tone: 'text-ink' },
            { key: 'streak', value: String(summary.streakDays), label: t('Day streak'), tone: 'text-primary' },
          ].map((stat) => (
            <div key={stat.key} className="rounded-lg border border-line bg-surface-2/40 p-2.5 text-center">
              <p className={`tnum font-mono text-[19px] font-semibold ${stat.tone}`}>{stat.value}</p>
              <p className="mt-0.5 text-[10.5px] leading-tight text-ink-3">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-4">
          <h3 className="mb-2 text-[12.5px] font-semibold text-ink">{t('Last 7 days')}</h3>
          <div className="flex items-end justify-between gap-1.5" aria-hidden>
            {week.map((day) => (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-1" title={`${day.attempts} · ${day.date}`}>
                <div className="flex h-16 w-full items-end rounded-sm bg-inset/60">
                  <div className="w-full rounded-sm bg-primary-soft" style={{ height: `${(day.attempts / peak) * 100}%` }} />
                </div>
                <span className="text-[9px] text-ink-3">{t(WEEKDAY_INITIALS[new Date(`${day.date}T00:00:00`).getDay()])}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">{weekTotal} {t('This week')}</p>
        </div>

        <div className="border-t border-line pt-4">
          <h3 className="mb-1 text-[12.5px] font-semibold text-ink">{t('Accuracy by subject')}</h3>
          {accuracyNote && <p className="mb-2 text-[11px] leading-relaxed text-ink-3">{accuracyNote}</p>}
          {subjectRows.length === 0 ? (
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-3">{emptySubjects}</p>
          ) : (
            <ul className="mt-2 space-y-2.5">
              {subjectRows.map((row) => {
                const pct = Math.round((row.accuracy ?? 0) * 100)
                return (
                  <li key={row.subjectId} className="flex items-center gap-2">
                    <span className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-[11.5px] text-ink-2">
                      <SubjectDot id={row.subjectId} />
                      <span className="truncate">{subjectName(row.subjectId)}</span>
                    </span>
                    {/* Wrapped rather than sized through `className`: `cn` is a
                        plain joiner, so `w-16` beside the track's own `w-full`
                        would be a coin toss decided by stylesheet order. */}
                    <span className="w-16 shrink-0">
                      <Meter value={pct} size="sm" tone={pct >= 75 ? 'success' : pct >= 60 ? 'primary' : 'warning'} />
                    </span>
                    <span className="tnum shrink-0 font-mono text-[11px] text-ink-2">
                      {row.correct}/{row.marked} · {pct}%
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </Panel>
  )
}
