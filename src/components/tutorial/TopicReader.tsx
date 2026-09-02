import type { Ref } from 'react'
import { ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { TutorialVideo } from './TutorialVideo'
import { tutorialHubLabel, type TutorialTopic } from '@/data/tutorials'

/**
 * One topic, read: where it sits, what it is for, its video if there is one,
 * the two or three moves it takes, and the way out to the feature itself.
 *
 * The article takes focus (`tabIndex={-1}`) because below `lg` the reader is
 * under the index rather than beside it: choosing a topic there has to move the
 * reader to you, or the page looks like nothing happened.
 */
export function TopicReader({
  ref,
  topic,
  videoUrl,
  isRead,
  onToggleRead,
  previous,
  next,
  onNavigate,
}: {
  ref?: Ref<HTMLElement>
  topic: TutorialTopic
  videoUrl: string | undefined
  isRead: boolean
  onToggleRead: () => void
  previous?: TutorialTopic
  next?: TutorialTopic
  onNavigate: (topicId: string) => void
}) {
  const t = useT()

  return (
    <Panel className="min-w-0 px-4 py-5 sm:px-7 sm:py-6">
      <article
        ref={ref}
        tabIndex={-1}
        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
      >
        <p className="flex items-center gap-1.5 text-[12px] text-ink-3">
          <span className="font-medium text-ink-2">{t(tutorialHubLabel(topic.hub))}</span>
          <Icon icon={ChevronRight} size={13} className="rtl:-scale-x-100" />
          <span>{t(topic.label)}</span>
        </p>

        <h2 className="mt-1.5 font-serif text-[21px] font-semibold tracking-[-0.02em] text-ink sm:text-[26px]">
          {t(topic.label)}
        </h2>

        <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.65] text-ink-2">{t(topic.instructions)}</p>

        <TutorialVideo topic={topic} url={videoUrl} />

        {topic.steps && topic.steps.length > 0 && (
          <ol className="mt-5 grid max-w-[45rem] gap-2.5 sm:grid-cols-3">
            {topic.steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line bg-surface-2 px-3.5 py-3">
                <p className="tnum text-[11px] font-semibold text-ink-3">{index + 1}</p>
                <p className="mt-0.5 text-[13px] font-semibold text-ink">{t(step.title)}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{t(step.detail)}</p>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {topic.route && (
            <ButtonLink to={topic.route} variant="primary" iconLeft={ArrowUpRight}>
              {t('Open {page}').replace('{page}', t(topic.label))}
            </ButtonLink>
          )}
          <Button
            variant="secondary"
            aria-pressed={isRead}
            iconLeft={isRead ? Check : undefined}
            onClick={onToggleRead}
            className={cn(isRead && 'border-primary-line bg-primary-tint text-primary-strong')}
          >
            {isRead ? t('Marked as read') : t('Mark as read')}
          </Button>
        </div>

        {(previous || next) && (
          <nav className="mt-6 flex items-start justify-between gap-3 border-t border-line pt-4">
            {previous ? (
              <button
                type="button"
                onClick={() => onNavigate(previous.id)}
                className="min-h-11 rounded-lg px-1 text-start text-[13px] font-semibold text-ink transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="block text-[11.5px] font-medium text-ink-3">{t('Previous')}</span>
                {t(previous.label)}
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button
                type="button"
                onClick={() => onNavigate(next.id)}
                className="min-h-11 rounded-lg px-1 text-end text-[13px] font-semibold text-ink transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <span className="block text-[11.5px] font-medium text-ink-3">{t('Next')}</span>
                {t(next.label)}
              </button>
            )}
          </nav>
        )}
      </article>
    </Panel>
  )
}
