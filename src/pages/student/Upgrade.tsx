import { Link } from 'react-router-dom'
import { Lock, BadgeCheck, ArrowRight, LifeBuoy } from 'lucide-react'
import { useIdentity } from '@/lib/useIdentity'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'
import { formatLongDate } from '@/lib/format'

/** Who to write to about a plan — there is no self-serve payment provider. */
const SUPPORT_ADDRESS = 'help@nishany.com'

/**
 * The paywall a subscription-gated page redirects a lapsed student to.
 *
 * There is no payment provider in the app (see BillingPanels): access is granted
 * by an admin or a voucher, and the Billing tab already hosts voucher redemption,
 * the student-ID discount and the support address. So this screen explains why a
 * page is locked and routes to Billing rather than reinventing checkout.
 */
export function Upgrade() {
  const t = useT()
  const { entitlement } = useIdentity()

  const headline = entitlement.state === 'expired'
    ? t('Your subscription has expired')
    : entitlement.state === 'cancelled'
      ? t('Your subscription was cancelled')
      : t('This is part of your subscription')

  const detail = entitlement.state === 'expired' && entitlement.expiresAt
    ? `${t('Access ended on')} ${formatLongDate(new Date(entitlement.expiresAt))}. ${t('Renew to open the question bank, library, flashcards and everything else.')}`
    : t('Subscribe to open the question bank, library, flashcards, adaptive study and everything else. The dashboard, Question of the Day and study rooms stay free.')

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center gap-5 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-tint text-primary">
        <Icon icon={Lock} size={26} />
      </span>
      <div className="space-y-2">
        <h1 className="font-serif text-[26px] font-semibold text-ink">{headline}</h1>
        <p className="text-[14px] leading-relaxed text-ink-2">{detail}</p>
      </div>

      <ul className="grid w-full gap-2 text-left text-[13.5px] text-ink-2">
        {[
          t('The full question bank with explanations'),
          t('The medical library and adaptive study'),
          t('Flashcards, essays, practical and skills'),
        ].map((line) => (
          <li key={line} className="flex items-center gap-2.5 rounded-lg bg-surface-2 px-3.5 py-2.5">
            <Icon icon={BadgeCheck} size={17} className="shrink-0 text-primary" />
            {line}
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-col gap-2.5">
        <Link
          to="/app/account?tab=billing"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-[14px] font-semibold text-on-primary hover:bg-primary-hover"
        >
          {entitlement.state === 'expired' || entitlement.state === 'cancelled' ? t('Renew your plan') : t('See plans & subscribe')}
          <Icon icon={ArrowRight} size={17} />
        </Link>
        <a
          href={`mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Subscription help')}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-5 text-[13.5px] font-medium text-ink-2 hover:bg-surface-2"
        >
          <Icon icon={LifeBuoy} size={16} />
          {t('Ask for help')}
        </a>
      </div>
    </div>
  )
}
