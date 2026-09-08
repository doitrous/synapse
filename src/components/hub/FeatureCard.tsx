import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { TargetRing } from '@/components/ui/TargetRing'
import { ComingSoonDialog } from './ComingSoonDialog'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/** The progress device a card carries, if it has one worth carrying. */
export interface FeatureProgress {
  kind: 'ring' | 'bar'
  value: number
  max: number
  /** Names what is being measured — a ring showing 62% has to say 62% of what. */
  label: string
  tone?: 'primary' | 'accent'
}

/** A figure in the card's footer. Two at most: a third turns a card into a table. */
export interface FeatureStat {
  label: string
  /** Already formatted. */
  value: string
}

export interface FeatureCardProps {
  to: string
  icon: LucideIcon
  title: string
  description: string
  progress?: FeatureProgress
  /** Up to two. Anything beyond the second is dropped rather than wrapped. */
  stats?: FeatureStat[]
  status?: 'live' | 'coming-soon'
  /** Required when `status === 'coming-soon'` — a card with nothing to say
   *  about why it is not ready is worse than no card. */
  comingSoon?: {
    body: string
    previewHref?: string
    previewLabel?: string
    /** Shows the preview as a direct action on the card instead of hiding it in the dialog. */
    showPreviewOnCard?: boolean
  }
  /** Handles the activation itself instead of navigating — how a hub selects
   *  a tab on a page it is already on (Practical's stations, say). */
  onClick?: () => void
}

/**
 * One destination on a hub: what it is, what it is for, and how far in you are.
 *
 * The whole card is the control — a title link with a card around it makes the
 * other 90% of the target dead, which on a phone is most of what a thumb lands
 * on. So it renders as a `Link`, or as a `button` when it has its own handler
 * or is not finished yet, and never nests an interactive element inside itself.
 *
 * The progress device is the point of the card. A hub of six links is a menu;
 * a hub of six links that each say where you are in them is a place to decide
 * what to do next.
 */
export function FeatureCard({
  to,
  icon,
  title,
  description,
  progress,
  stats,
  status = 'live',
  comingSoon,
  onClick,
}: FeatureCardProps) {
  const t = useT()
  const [dialogOpen, setDialogOpen] = useState(false)
  const soon = status === 'coming-soon'
  const shown = stats?.slice(0, 2) ?? []
  const previewOnCard = soon && comingSoon?.showPreviewOnCard && comingSoon.previewHref

  const surface = cn(
    'group/card relative flex min-w-0 flex-col rounded-xl border border-line bg-surface p-5 text-start shadow-panel',
    'transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-quint)]',
    'hover:-translate-y-0.5 hover:shadow-raised motion-reduce:transform-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
  )

  const body = (
    <>
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-lg border',
            // An unfinished surface loses the warm tile and the crimson glyph:
            // the card is still legible, but it no longer looks like a door.
            soon ? 'border-line bg-surface-2 text-ink-3' : 'border-mist-line bg-mist text-primary-strong',
          )}
        >
          <Icon icon={icon} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug tracking-[-0.012em] text-ink">{t(title)}</p>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-2">{t(description)}</p>
        </div>
        {soon ? (
          <Badge tone="outline">{t('Coming soon')}</Badge>
        ) : (
          <Icon
            icon={ArrowUpRight}
            size={16}
            className="mt-0.5 text-ink-3 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quint)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:transform-none rtl:-scale-x-100"
          />
        )}
      </div>

      {(progress || shown.length > 0) && (
        <div className="mt-4 flex items-end justify-between gap-4 pt-4 border-t border-line">
          {progress?.kind === 'ring' && (
            <TargetRing
              size={44}
              thickness={5}
              value={progress.value}
              max={progress.max}
              tone={progress.tone ?? 'primary'}
              aria-label={t(progress.label)}
            />
          )}
          {progress?.kind === 'bar' && (
            <div className="min-w-0 flex-1">
              <p className="mb-1.5 text-[11.5px] text-ink-3">{t(progress.label)}</p>
              {/* `tone` is a ring distinction (crimson for what you act on,
                  blue for a long-horizon reading). The bar has no blue in its
                  vocabulary, so it stays crimson either way. */}
              <Meter target size="sm" value={progress.value} max={progress.max} />
            </div>
          )}
          {shown.length > 0 && (
            <dl className="flex shrink-0 gap-5">
              {shown.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="text-[11px] text-ink-3">{t(stat.label)}</dt>
                  <dd className="tnum mt-0.5 font-mono text-[14px] font-semibold text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </>
  )

  if (previewOnCard) {
    return (
      <article className={surface}>
        {body}
        <div className="mt-auto flex justify-end pt-4">
          <Link
            to={previewOnCard}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {t(comingSoon.previewLabel ?? 'Open the preview')}
            <Icon icon={ArrowUpRight} size={14} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </article>
    )
  }

  if (soon || onClick) {
    return (
      <>
        <button
          type="button"
          className={surface}
          onClick={() => (soon ? setDialogOpen(true) : onClick?.())}
        >
          {body}
        </button>
        {dialogOpen && (
          <ComingSoonDialog
            title={title}
            body={comingSoon?.body ?? ''}
            icon={icon}
            previewHref={comingSoon?.previewHref}
            previewLabel={comingSoon?.previewLabel}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <Link to={to} className={surface}>
      {body}
    </Link>
  )
}
