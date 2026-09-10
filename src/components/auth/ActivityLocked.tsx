import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { hasActiveAccess } from '@/lib/entitlement'

/**
 * Whether the viewer is a real student without an active subscription — the one
 * case a bank-drawing room/party activity must show `ActivityLocked` instead of
 * running. Staff previewing and the signed-out demo are never locked, matching
 * the server's content gate (`callerHasActiveAccess`).
 */
export function useActivityLocked(): boolean {
  const { status, role, entitlement } = useIdentity()
  return status === 'authenticated' && role === 'student' && !hasActiveAccess(entitlement)
}

/**
 * Shown in place of a room or party activity that draws on the question bank
 * when the viewer has no active subscription.
 *
 * Study rooms and social are free, so a lapsed student can be in the room — but
 * the bank content an activity needs is paid, and the server refuses it (402).
 * Rather than a broken, empty runner, they get a subscribe prompt: in effect a
 * shared test only works for the subscribers at the table. Callers render this
 * only for a real student without access (never for staff or the demo).
 */
export function ActivityLocked() {
  const t = useT()
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-xl border border-line bg-surface-2 px-6 py-8 text-center">
      <span className="grid size-11 place-items-center rounded-xl bg-primary-tint text-primary">
        <Icon icon={Lock} size={22} />
      </span>
      <p className="text-[14px] font-semibold text-ink">{t('This activity is part of your subscription')}</p>
      <p className="text-[13px] leading-relaxed text-ink-2">{t('The question bank behind shared tests and games needs an active plan. Subscribe to join in.')}</p>
      <Link
        to="/app/upgrade"
        className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-[13.5px] font-semibold text-on-primary hover:bg-primary-hover"
      >
        {t('See plans & subscribe')}
      </Link>
    </div>
  )
}
