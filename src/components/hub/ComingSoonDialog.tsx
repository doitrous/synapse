import type { LucideIcon } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'

/**
 * What a hub says about a surface that is not finished yet.
 *
 * The alternative — hiding the card — loses the fact that the feature is
 * coming, and the other alternative — linking to a half-built page — makes the
 * product look broken. So the card stays, says what the surface will do and
 * when it makes sense to expect it, and offers the existing partial interface
 * as an explicitly-labelled preview when there is one. That is how University,
 * Library and Adaptive Study stay reachable without being advertised as done.
 */
export function ComingSoonDialog({
  title,
  body,
  icon,
  previewHref,
  previewLabel,
  onClose,
}: {
  title: string
  /** Two sentences: what it will do, and when to expect it. */
  body: string
  icon: LucideIcon
  previewHref?: string
  previewLabel?: string
  onClose: () => void
}) {
  const t = useT()

  return (
    <Dialog size="sm" label={t(title)} onClose={onClose}>
      <div className="flex items-start gap-3 border-b border-mist-line bg-mist px-5 py-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-mist-line bg-surface text-primary-strong">
          <Icon icon={icon} size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-[12.5px] font-medium text-primary-strong">{t('Coming soon')}</p>
          <h2 className="mt-1 font-serif text-[19px] font-semibold tracking-[-0.015em] text-on-mist">{t(title)}</h2>
        </div>
      </div>
      <div className="px-5 py-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">{t(body)}</p>
      </div>
      <div className="flex flex-col-reverse gap-2 border-t border-line px-5 py-3.5 sm:flex-row sm:justify-end">
        {previewHref && (
          <ButtonLink to={previewHref} variant="secondary" onClick={onClose}>
            {t(previewLabel ?? 'Open the preview')}
          </ButtonLink>
        )}
        <Button variant="primary" onClick={onClose}>{t('Got it')}</Button>
      </div>
    </Dialog>
  )
}
