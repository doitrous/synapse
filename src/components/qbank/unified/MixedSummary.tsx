import { useEffect, useMemo, useRef } from 'react'
import { ListChecks, PenLine, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useLiveEssays } from '@/lib/useLiveEssays'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { coveredCount } from '@/data/essay'
import { itemKey, summariseMixed, type MixedKind, type MixedSession } from '@/data/mixedSession'
import { kindOfItems } from '@/data/sittings'
import { useSittings } from '@/lib/useSittings'
import { useT } from '@/lib/i18n'

const ICON: Record<MixedKind, LucideIcon> = {
  mcq: ListChecks,
  practical: Stethoscope,
  essay: PenLine,
}

/** Whole minutes, or seconds while a sitting was under a minute. */
function duration(ms: number, t: (value: string) => string): string {
  const seconds = Math.max(0, Math.round(ms / 1000))
  if (seconds < 60) return t('{n} sec').replace('{n}', String(seconds))
  return t('{n} min').replace('{n}', String(Math.round(seconds / 60)))
}

/**
 * One report for a sitting that ran through three runners.
 *
 * The three banks do not measure the same thing and pretending otherwise would
 * be the easiest mistake to make here: an MCQ is marked against a key, a
 * station is ticked by the student against a mark scheme, and an essay is
 * self-marked. So there is no single score. Each bank reports in its own terms,
 * and only the MCQ line carries an accuracy.
 */
export function MixedSummary({
  session,
  onDone,
  endedAt,
}: {
  session: MixedSession
  onDone: () => void
  /** Epoch milliseconds the sitting stopped. Passed in so this stays pure to render. */
  endedAt: number
}) {
  const t = useT()
  const tally = useMemo(() => summariseMixed(session), [session])
  const { answers } = useEssayAnswers()
  const { items: essays } = useLiveEssays()
  const { progress } = usePracticalProgress()

  const essayIds = session.items.filter((item) => item.kind === 'essay').map((item) => item.id)
  const essayCovered = essayIds.reduce((total, id) => {
    const essay = essays.find((candidate) => candidate.id === id)
    if (!essay) return total
    const covered = coveredCount(answers[id]?.ticked ?? null, essay.keyPoints.map((point) => point.id))
    return { covered: total.covered + (covered?.covered ?? 0), total: total.total + essay.keyPoints.length }
  }, { covered: 0, total: 0 })

  const practicalIds = session.items.filter((item) => item.kind === 'practical').map((item) => item.id)
  const practicalRecorded = practicalIds.filter((id) => (
    Boolean(progress.stations[id]) || Boolean(progress.cases[id]) || Boolean(progress.labs[id])
  )).length

  /**
   * File the sitting the moment its report is on screen.
   *
   * Here rather than in the page above, because this is the one place that
   * already knows what the sitting came to — the per-bank tally, the key points
   * ticked, the practicals recorded. The id is built from the sitting's own
   * seed and start, so re-rendering this screen files the same row rather than
   * a second one; `recordSitting` dedupes by it.
   */
  const { record } = useSittings()
  const id = `mixed-${session.startedAt}-${session.seed}`
  const kind = kindOfItems(session.items)
  // Not `practicalRecorded`: that counts every item in the queue the student
  // has *ever* recorded anything against, including from a sitting last week,
  // and a row reading "3 of 3" for a sitting stopped on item one is a lie about
  // what happened. What this sitting reached is what this sitting reports.
  const covered = kind === 'essay' ? essayCovered.covered : tally.visited
  const outOf = kind === 'essay' ? essayCovered.total : tally.total
  // Read through a ref, never as a dependency: the page passes
  // `mixedEndedAt ?? Date.now()`, so a live clock would be a new value on every
  // render — and an effect that writes state would then re-run for ever.
  const endedAtRef = useRef(endedAt)
  endedAtRef.current = endedAt
  useEffect(() => {
    if (!session.items.length) return
    record({
      id,
      kind,
      startedAt: new Date(session.startedAt).toISOString(),
      finishedAt: new Date(endedAtRef.current).toISOString(),
      itemCount: session.items.length,
      result: {
        total: outOf,
        covered,
        ...(tally.marked > 0 ? { correct: tally.correct } : {}),
      },
      bankCounts: {
        mcq: tally.banks.find((bank) => bank.kind === 'mcq')?.total ?? 0,
        practical: tally.banks.find((bank) => bank.kind === 'practical')?.total ?? 0,
        essay: tally.banks.find((bank) => bank.kind === 'essay')?.total ?? 0,
      },
      itemIds: session.items.map(itemKey),
    })
  }, [id, kind, covered, outOf, record, session.items, session.startedAt, tally])

  const labels: Record<MixedKind, string> = {
    mcq: t('MCQ questions'),
    practical: t('Practical items'),
    essay: t('Essays'),
  }

  function detail(kind: MixedKind, marked: number, correct: number): string {
    if (kind === 'mcq') {
      return marked === 0
        ? t('none answered')
        : t('{correct} of {marked} correct').replace('{correct}', String(correct)).replace('{marked}', String(marked))
    }
    if (kind === 'practical') {
      // Passed, not correct: a station is ticked by the student against its own
      // mark scheme, and "passed" is the judgement that record can support —
      // half marks on a station, no wrong decision in a case, a set finished.
      if (marked > 0) {
        return t('{correct} of {marked} passed').replace('{correct}', String(correct)).replace('{marked}', String(marked))
      }
      return practicalRecorded === 0
        ? t('nothing recorded — practical items are ticked against their own mark scheme')
        : t('{n} recorded against their mark scheme').replace('{n}', String(practicalRecorded))
    }
    return essayCovered.total === 0
      ? t('self-marked — no key points ticked')
      : t('{covered} of {total} key points ticked')
        .replace('{covered}', String(essayCovered.covered))
        .replace('{total}', String(essayCovered.total))
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Mixed test report')}
        description={t('One sitting, three banks. Each is reported in the terms it is actually marked in — an accuracy for MCQs, a pass for practicals, key points for essays.')}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Panel className="min-w-0">
          <PanelHeader title={t('What you worked through')} />
          <ul className="divide-y divide-line">
            {tally.banks.filter((bank) => bank.total > 0).map((bank) => (
              <li key={bank.kind} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                  <Icon icon={ICON[bank.kind]} size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-ink">{labels[bank.kind]}</p>
                  <p className="mt-0.5 text-[12px] text-ink-2">{detail(bank.kind, bank.marked, bank.correct)}</p>
                </div>
                <p className="tnum shrink-0 font-mono text-[15px] font-semibold text-ink">
                  {bank.visited}
                  <span className="text-[12px] font-medium text-ink-2"> / {bank.total}</span>
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="min-w-0 space-y-4">
          <div className="rounded-xl border border-mist-line bg-mist p-5 shadow-panel">
            <p className="text-[14px] font-semibold text-ink">{t('This sitting')}</p>
            <p className="tnum mt-3 font-mono text-[24px] font-semibold leading-none text-on-mist">
              {tally.visited}
              <span className="text-[14px] font-medium text-ink-2"> / {tally.total}</span>
            </p>
            <p className="mt-1.5 text-[11.5px] text-ink-2">{t('items reached')}</p>
            <Meter value={tally.visited} max={Math.max(tally.total, 1)} className="mt-3" />
            <dl className="mt-4 space-y-1.5 border-t border-mist-line pt-4 text-[12.5px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-2">{t('Items with a result')}</dt>
                <dd className="tnum font-mono font-semibold text-ink">{tally.marked}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-2">{t('Correct or passed')}</dt>
                <dd className="tnum font-mono font-semibold text-ink">{tally.correct}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-2">{t('Time')}</dt>
                <dd className="tnum font-mono font-semibold text-ink">{duration(endedAt - session.startedAt, t)}</dd>
              </div>
            </dl>
            <Button variant="primary" size="md" onClick={onDone} className="mt-4 w-full">
              {t('Back to the bank')}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
