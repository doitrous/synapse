import { useMemo } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { TargetSeed } from './TargetSeed'
import { dailyCounts } from '@/data/attemptStats'
import { usePracticeProgress } from '@/lib/usePracticeProgress'
import { useT } from '@/lib/i18n'

/**
 * No per-student setting for this exists yet, so every student is held to the
 * same daily mark until Account grows a real "daily goal" field.
 * ponytail: hardcoded goal; make it configurable if that's asked for.
 */
const DAILY_GOAL = 40

/**
 * The dashboard's hero: the Midnight Seed ring filling toward today's mark,
 * with the one action that keeps it moving. `done` is real — the same
 * distinct-bank-attempts-today figure Practice's own "Answered today" stat
 * reads — only the goal is a fixed constant.
 */
export function TodaysTargetHero() {
  const t = useT()
  const { qbankRecords } = usePracticeProgress()
  const done = useMemo(
    () => dailyCounts(qbankRecords, 1).reduce((sum, day) => sum + day.attempts, 0),
    [qbankRecords],
  )
  const remaining = Math.max(0, DAILY_GOAL - done)

  return (
    <Panel className="flex w-full max-w-[60rem] flex-col items-center gap-5 p-5 shadow-pop sm:flex-row sm:gap-7 sm:p-6">
      <TargetSeed done={done} goal={DAILY_GOAL} />
      <div className="min-w-0 flex-1 text-center sm:text-start">
        <p className="text-[15px] leading-relaxed text-ink-2">
          <span className="font-bold text-ink">{done} {t('of')} {DAILY_GOAL}</span>{' '}
          {t('questions done')}
          {remaining > 0
            ? <> — {remaining} {t('more to hit your mark.')}</>
            : <> — {t('You hit your mark today.')}</>}
        </p>
        <div className="mt-3.5 flex justify-center sm:justify-start">
          <ButtonLink to="/app/qbank" variant="primary" size="md">{t('Continue session')}</ButtonLink>
        </div>
      </div>
    </Panel>
  )
}
