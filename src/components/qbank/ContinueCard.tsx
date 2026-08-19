import { Play, Trash2 } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Meter } from '@/components/ui/Meter'
import { useT } from '@/lib/i18n'

/**
 * The sitting that is still open.
 *
 * Coming back to the Question Bank used to drop the student straight into it,
 * mid-question, with no view of where they were or chance to do something else
 * first. The sitting is still restored — it is just offered rather than
 * resumed.
 */
export function ContinueCard({
  name,
  answered,
  total,
  onContinue,
  onDiscard,
}: {
  name: string
  answered: number
  total: number
  onContinue: () => void
  onDiscard: () => void
}) {
  const t = useT()
  return (
    <Panel className="mb-4 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent">{t('Still open')}</p>
          <p className="mt-0.5 truncate text-[15px] font-semibold text-ink">{name}</p>
          <div className="mt-2 flex items-center gap-2.5">
            <Meter value={total ? (answered / total) * 100 : 0} tone="accent" className="w-32" />
            <span className="tnum font-mono text-[12px] text-ink-2">
              {answered} {t('of')} {total} {t('answered')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" iconLeft={Trash2} onClick={onDiscard}>{t('Discard')}</Button>
          <Button variant="primary" size="md" iconLeft={Play} onClick={onContinue}>{t('Continue')}</Button>
        </div>
      </div>
    </Panel>
  )
}
