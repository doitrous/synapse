import { LogOut, Pause, Trophy } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'

/**
 * The two ways out of a running test.
 *
 * There used to be one button and it did neither cleanly: it left the sitting
 * paused but was called "End session", so a student who wanted to be finished
 * had no way to say so, and one who wanted a break could not tell whether
 * pressing it would throw the work away.
 */
export function EndSessionDialog({
  answered,
  total,
  onLeave,
  onSubmit,
  onClose,
}: {
  answered: number
  total: number
  onLeave: () => void
  onSubmit: () => void
  onClose: () => void
}) {
  const t = useT()
  const unanswered = Math.max(0, total - answered)

  return (
    <Dialog onClose={onClose} label={t('End this test')} size="sm">
      <PanelHeader title={t('End this test?')} icon={LogOut} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {answered} {t('of')} {total} {t('answered')}
          {unanswered > 0 && <> · {unanswered} {t('not yet answered')}</>}
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="secondary" size="md" iconLeft={Pause} onClick={onLeave}>
            {t('Leave for now')}
          </Button>
          <p className="-mt-1 text-[12px] leading-relaxed text-ink-3">
            {t('The test stays where it is. Pick it up from the Question Bank whenever you like.')}
          </p>
          <Button variant="primary" size="md" iconLeft={Trophy} onClick={onSubmit}>
            {t('End and submit')}
          </Button>
          <p className="-mt-1 text-[12px] leading-relaxed text-ink-3">
            {unanswered > 0
              ? t('Marks what you answered and opens your results. Anything left is counted as omitted.')
              : t('Marks your answers and opens your results.')}
          </p>
        </div>
        <div className="border-t border-line pt-3">
          <Button variant="ghost" size="md" className="w-full" onClick={onClose}>
            {t('Cancel')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
