import { TutorialCardSkeleton } from '@/components/loading/DashboardSkeletons'
import { LoadingError } from '@/components/loading/LoadingError'
import { MonitorPlay, Play } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'
import { usePersistentState } from '@/lib/usePersistentState'
import { firstTutorialVideoTopic, TUTORIAL_VIDEOS_STATE_KEY, type TutorialVideoMap } from '@/data/tutorials'

/**
 * The tutorial's place on the dashboard, beside the next-step card.
 *
 * It used to be a sidebar destination, which put a one-time orientation video
 * on the same footing as the study surfaces a student opens every day. Here it
 * sits where a new student looks first, says what it is in one line, and gets
 * out of the way once they know the app.
 */
export function TutorialCard() {
  const t = useT()
  const [videos, , status] = usePersistentState<TutorialVideoMap>(TUTORIAL_VIDEOS_STATE_KEY, {})
  if (status.error) return <LoadingError />
  if (!status.hydrated) return <TutorialCardSkeleton />
  const firstVideo = firstTutorialVideoTopic(videos)
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 shadow-panel">
      <span className="grid size-10 place-items-center rounded-lg border border-mist-line bg-mist text-primary-strong">
        <Icon icon={MonitorPlay} size={18} />
      </span>
      <h2 className="mt-3 text-[17px] font-semibold text-ink">{t('Learn how Nishany works')}</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
        {t('Video walkthroughs of Plan, Tools, Bank, Practice, and the rest of Nishany.')}
      </p>
      <div className="mt-4 lg:mt-auto lg:pt-4">
        {firstVideo ? (
          <ButtonLink to={`/app/tutorial?topic=${firstVideo.id}`} variant="primary" size="lg" className="w-full" iconLeft={Play}>
            {t('Watch the tutorial')}
          </ButtonLink>
        ) : (
          <Button disabled variant="secondary" size="lg" className="w-full" iconLeft={Play}>
            {t('Coming soon')}
          </Button>
        )}
      </div>
    </div>
  )
}
