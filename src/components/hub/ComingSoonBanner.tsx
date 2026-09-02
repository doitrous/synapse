import type { LucideIcon } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * What a page says about itself when the hub card that leads here is marked
 * coming soon.
 *
 * The hub's dialog explains the feature before you arrive; this renders the
 * *same string* on arrival — one key per surface, passed to both the card's
 * `comingSoon.body` and to this — so a student who followed "Open the preview"
 * is never left guessing whether what they are looking at is finished, and the
 * two never drift apart in translation. It sits above the real content rather
 * than in place of it: the preview is the point, and hiding it would make the
 * link pointless.
 *
 * `role="note"` with a label, because a screen-reader user otherwise hears an
 * unannounced paragraph between the page title and the real page, with nothing
 * marking where the notice ends.
 */
export function ComingSoonBanner({
  icon,
  body,
  className,
}: {
  icon?: LucideIcon
  /** One or two sentences: what it will do, and what this page is meanwhile. */
  body: string
  className?: string
}) {
  const t = useT()
  return (
    <Panel
      role="note"
      aria-label={t('Coming soon')}
      className={cn('mb-5 flex items-start gap-3 border-mist-line bg-mist p-4', className)}
    >
      {icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-mist-line bg-surface text-primary-strong">
          <Icon icon={icon} size={17} />
        </span>
      )}
      <div className="min-w-0">
        <Badge tone="outline">{t('Coming soon')}</Badge>
        <p className="mt-1.5 text-[13px] leading-relaxed text-on-mist">{t(body)}</p>
      </div>
    </Panel>
  )
}
