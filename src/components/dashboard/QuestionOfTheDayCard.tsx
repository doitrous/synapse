import { Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { useT } from '@/lib/i18n'
import { useQotd } from '@/lib/useQotd'
import { cn } from '@/lib/cn'

/**
 * A compact nudge for the daily question — mirrors `QuestionBankCard`'s
 * markup so it sits in the dashboard's card rhythm, but reports state instead
 * of a ring: there is exactly one item to answer, so a percentage would say
 * less than "done" or "not yet" does.
 */
export function QuestionOfTheDayCard({ compact = false }: { compact?: boolean }) {
  const t = useT()
  const qotd = useQotd()

  return (
    <Link to="/app/qotd" className="flex h-full min-w-0">
      <Panel className={cn('flex h-full min-w-0 flex-1 flex-col transition-colors hover:border-ink-3/45', compact ? 'p-3' : 'p-4')}>
        <div className="flex items-start justify-between gap-2">
          <p className="text-[12.5px] font-medium text-ink-2">{t('Question of the Day')}</p>
          <Icon icon={Flame} size={15} className={qotd.current > 0 ? 'text-primary' : 'text-ink-3'} />
        </div>
        <div className={cn('flex items-baseline gap-1', compact ? 'mt-1' : 'mt-1.5')}>
          <span className={cn('tnum font-mono font-semibold leading-none tracking-tight text-ink', compact ? 'text-[27px]' : 'text-[32px]')}>
            {qotd.current}
          </span>
          <span className={cn('text-ink-3', compact ? 'text-[14px]' : 'text-[16px]')}>{t('day streak')}</span>
        </div>
        <p className={cn('text-ink-3', compact ? 'mt-0.5 text-[11px]' : 'mt-1.5 text-[12px]')}>
          {qotd.loading
            ? t('Loading…')
            : qotd.answered
              ? t('Answered today')
              : t('Answer today’s question')}
        </p>
        {!qotd.loading && !qotd.answered && (
          <Badge tone="primary" dot className="mt-auto w-fit">{t('New')}</Badge>
        )}
      </Panel>
    </Link>
  )
}
