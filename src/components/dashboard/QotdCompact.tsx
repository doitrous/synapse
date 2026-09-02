import { ButtonLink } from '@/components/ui/Button'
import { NishanyLoader } from '@/components/ui/NishanyLoader'
import { useT } from '@/lib/i18n'
import { useQotd } from '@/lib/useQotd'
import { cn } from '@/lib/cn'

/**
 * The daily question, sized to sit *inside* the Study rhythm panel.
 *
 * It used to be a panel of its own on the dashboard, which made the same
 * point twice: the heatmap is the record of the habit and the daily question
 * is the smallest way to keep it going today. As a tile on the panel's mist
 * ground it reads as part of the same statement, and it costs a card of
 * vertical space instead of a whole slot.
 *
 * State is never carried by the dot alone — the line under the count says
 * "Answer today's question" or "Answered" in words, and the button's label
 * changes with it.
 */
export function QotdCompact({ className }: { className?: string }) {
  const t = useT()
  const qotd = useQotd()

  const state = qotd.loading
    ? null
    : qotd.answered
      ? `${t('Answered')} · ${qotd.current} ${t('day streak')}`
      : t('Answer today’s question')

  return (
    <div className={cn('flex min-w-0 flex-col rounded-lg border border-line bg-mist p-3', className)}>
      <div className="flex items-center gap-1.5">
        {!qotd.loading && !qotd.answered && (
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary" />
        )}
        <p className="truncate text-[12.5px] font-medium text-on-mist">{t('Question of the Day')}</p>
      </div>

      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="tnum font-mono text-[27px] font-semibold leading-none tracking-tight text-on-mist">
          {qotd.current}
        </span>
        <span className="text-[14px] text-ink-3">{t('day streak')}</span>
      </div>

      <p className="mt-1.5 flex min-h-[1.25rem] items-center gap-1.5 text-[11.5px] leading-snug text-ink-3">
        {qotd.loading ? <NishanyLoader mini label={t('Loading')} /> : state}
      </p>

      <div className="mt-auto pt-3">
        <ButtonLink to="/app/qotd" size="sm" variant={qotd.answered ? 'secondary' : 'primary'}>
          {qotd.answered ? t('Review') : t('Answer now')}
        </ButtonLink>
      </div>
    </div>
  )
}
