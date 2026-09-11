import { Link } from 'react-router-dom'
import { Sparkles, Users, Gamepad2, ArrowRight, Lock, type LucideIcon } from 'lucide-react'
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'
import { Icon } from '@/components/ui/Icon'
import { hasActiveAccess } from '@/lib/entitlement'

interface FreeDestination {
  to: string
  icon: LucideIcon
  label: string
  detail: string
}

/**
 * What a student without a subscription can open right now.
 *
 * Shown on the dashboard only when access has lapsed (or never started): the
 * rest of the dashboard already renders, and the sidebar's paid links all bounce
 * to the paywall, so this is the one place that points a lapsed student at the
 * pages that actually work — plus the way to unlock the rest. Active and trialing
 * students, staff previewing the app and the demo never see it.
 */
export function AvailableNow() {
  const t = useT()
  const { status, role, entitlement } = useIdentity()

  const gated = status === 'authenticated' && role === 'student'
  if (!gated || hasActiveAccess(entitlement)) return null

  const destinations: FreeDestination[] = [
    { to: '/app/qotd', icon: Sparkles, label: t('Question of the Day'), detail: t('A fresh question every day') },
    { to: '/app/study-rooms', icon: Users, label: t('Study Rooms'), detail: t('Study live with friends') },
    { to: '/app/minigames', icon: Gamepad2, label: t('Minigames'), detail: t('Quick practice games') },
  ]

  const headline = entitlement.state === 'expired'
    ? t('Your subscription has expired')
    : entitlement.state === 'cancelled'
      ? t('Your subscription was cancelled')
      : t('You’re on the free plan')

  return (
    <section className="w-full max-w-[60rem] min-w-0 rounded-xl border border-line bg-surface-2 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary">
            <Icon icon={Lock} size={18} />
          </span>
          <div>
            <h2 className="text-[15px] font-semibold text-ink">{headline}</h2>
            <p className="text-[12.5px] text-ink-2">{t('Here’s what you can use right now.')}</p>
          </div>
        </div>
        <Link
          to="/app/account?tab=billing"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-[13px] font-semibold text-on-primary hover:bg-primary-hover"
        >
          {entitlement.state === 'expired' || entitlement.state === 'cancelled' ? t('Renew') : t('Subscribe')}
          <Icon icon={ArrowRight} size={16} />
        </Link>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {destinations.map(({ to, icon, label, detail }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-3 hover:border-primary/40 hover:bg-primary-tint/40"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
              <Icon icon={icon} size={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13.5px] font-semibold text-ink">{label}</span>
              <span className="block truncate text-[12px] text-ink-2">{detail}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
