import { MonitorPlay, Play } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

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
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-surface p-5 shadow-panel">
      <span className="grid size-10 place-items-center rounded-lg border border-mist-line bg-mist text-primary-strong">
        <Icon icon={MonitorPlay} size={18} />
      </span>
      <h2 className="mt-3 text-[15px] font-semibold text-ink">{t('Learn how Nishany works')}</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-2">
        {t('Short videos for every part of the app — what each page is for and how to use it.')}
      </p>
      <div className="mt-4 lg:mt-auto lg:pt-4">
        <ButtonLink to="/app/tutorial" variant="secondary" size="sm" iconLeft={Play}>
          {t('Watch the tutorial')}
        </ButtonLink>
      </div>
    </div>
  )
}
