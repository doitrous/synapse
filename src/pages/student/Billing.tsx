import { useEffect, useState } from 'react'
import { CreditCard, BadgeCheck, LifeBuoy, TicketPercent, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/IconButton'
import { TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity, type Entitlement } from '@/lib/useIdentity'
import { API_MODE, apiDelete, apiGet, apiPost } from '@/lib/api'
import { useT } from '@/lib/i18n'
import { formatLongDate } from '@/lib/format'
import { initialPlans, PLANS_STORAGE_KEY, type PlanDef } from '@/data/plans'
import { voucherDiscount, voucherEligibility, initialVouchers, VOUCHER_STORAGE_KEY, type Voucher } from '@/data/vouchers'

/** Who to write to about a plan, since nobody can change one from this screen. */
const SUPPORT_ADDRESS = 'synapse@mail.doitrous.com'

const STATE_TONE: Record<Entitlement['state'], 'success' | 'primary' | 'warning' | 'neutral'> = {
  active: 'success',
  trialing: 'primary',
  expired: 'warning',
  cancelled: 'warning',
  none: 'neutral',
}

const STATE_LABEL: Record<Entitlement['state'], string> = {
  active: 'Active',
  trialing: 'Trial',
  expired: 'Expired',
  cancelled: 'Cancelled',
  none: 'No subscription',
}

interface Redemption { voucherId: string; code: string; redeemedAt: string }

/**
 * What the student is actually subscribed to.
 *
 * Previously: a hardcoded "Connect Cortex Student" plan at £69 renewing on a fixed
 * date, a VISA •••• 4242 that belonged to nobody, three fabricated paid
 * invoices, and four buttons — Change plan, Cancel subscription, Update payment
 * method, Download receipt — that had no `onClick` at all.
 *
 * There is no payment provider in Connect Cortex. So this shows the real subscription
 * an admin granted, priced from the real plan catalogue in EGP, and says
 * plainly who to contact. It does not offer to do things it cannot do.
 */
export function Billing() {
  const t = useT()
  const { audience, entitlement, subscription, profileMissing } = useIdentity()
  const [plans] = usePersistentState<PlanDef[]>(PLANS_STORAGE_KEY, initialPlans)
  const [vouchers] = usePersistentState<Voucher[]>(VOUCHER_STORAGE_KEY, initialVouchers)
  const [redemption, setRedemption] = useState<Redemption | null>(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!API_MODE) return
    apiGet<{ redemption: Redemption | null }>('/vouchers/mine')
      .then((result) => setRedemption(result.redemption))
      .catch(() => setRedemption(null))
  }, [])

  const plan = plans.find((item) => item.name === entitlement.plan)
  const appliedVoucher = vouchers.find((item) => item.id === redemption?.voucherId)
  const price = plan?.priceEGP ?? 0
  const discount = appliedVoucher ? voucherDiscount(appliedVoucher, price) : 0

  async function applyVoucher() {
    const wanted = code.trim()
    if (!wanted) return
    if (!API_MODE) {
      // Without a backend there is no redemption ledger to write to, so the
      // client only reports whether the code would be accepted.
      const voucher = vouchers.find((item) => item.code.toLowerCase() === wanted.toLowerCase())
      setMessage(voucher
        ? (voucherEligibility(voucher, audience) ?? t('This code is valid. Connect the backend to apply it.'))
        : t('That voucher code was not found. Check the spelling and try again.'))
      return
    }
    setBusy(true)
    setMessage('')
    try {
      // The server decides, against the roster row and the redemption table.
      const result = await apiPost<{ ok: boolean; message?: string; voucher?: Voucher }>('/vouchers/redeem', { code: wanted })
      if (!result.ok) {
        setMessage(result.message ?? t('That voucher could not be applied.'))
        return
      }
      setRedemption({ voucherId: result.voucher!.id, code: result.voucher!.code, redeemedAt: new Date().toISOString() })
      setCode('')
      setMessage(`${result.voucher!.code} ${t('has been applied to your next renewal.')}`)
    } catch {
      setMessage(t('That voucher could not be applied. Check your connection and try again.'))
    } finally {
      setBusy(false)
    }
  }

  async function removeVoucher() {
    if (!API_MODE) { setRedemption(null); return }
    setBusy(true)
    try {
      await apiDelete('/vouchers/redemption')
      setRedemption(null)
      setMessage(t('Voucher removed.'))
    } catch {
      setMessage(t('That voucher could not be removed. Try again.'))
    } finally {
      setBusy(false)
    }
  }

  const renewalPrice = Math.max(0, price - discount)
  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Connect Cortex plan enquiry')}`

  return (
    <PageContainer>
      <PageHeader title={t('Billing')} description={t('Your plan and any voucher applied to it.')} />

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]">
        <Panel>
          <PanelHeader title={t('Your plan')} icon={BadgeCheck} action={<Badge tone={STATE_TONE[entitlement.state]}>{t(STATE_LABEL[entitlement.state])}</Badge>} />
          <div className="p-5">
            {entitlement.state === 'none' ? (
              <EmptyState
                icon={BadgeCheck}
                title={t('No subscription yet')}
                description={profileMissing
                  ? t("Your university hasn't set up your student profile yet. Once it has, any plan granted to you appears here.")
                  : t('No plan has been granted to your account yet. Contact the Connect Cortex team to arrange one.')}
                action={<a href={supportLink}><Button variant="secondary" size="sm" iconLeft={LifeBuoy}>{t('Contact support')}</Button></a>}
              />
            ) : (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="font-serif text-[22px] font-semibold text-ink">{entitlement.plan}</p>
                    <p className="mt-1 text-[13px] text-ink-3">
                      {entitlement.expiresAt
                        ? `${t('Runs until')} ${formatLongDate(new Date(entitlement.expiresAt))}${entitlement.daysLeft !== null ? ` · ${entitlement.daysLeft} ${entitlement.daysLeft === 1 ? t('day left') : t('days left')}` : ''}`
                        : t('Open-ended · no expiry recorded')}
                    </p>
                  </div>
                  {plan && (
                    <p className="tnum font-mono text-[18px] font-semibold text-ink">{plan.priceLabel}</p>
                  )}
                </div>

                {!plan && (
                  <p className="mt-3 rounded-lg border border-line bg-surface-2/50 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-2">
                    {t('This plan is not in the current catalogue, so no price is shown for it.')}
                  </p>
                )}

                {subscription?.note && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink-2">{subscription.note}</p>
                )}

                <p className="mt-5 border-t border-line pt-4 text-[12.5px] leading-relaxed text-ink-3">
                  {t('Subscriptions are managed by the Connect Cortex team. To change or end your plan, get in touch and someone will action it on your account.')}
                </p>
                <a href={supportLink} className="mt-3 inline-block">
                  <Button variant="secondary" size="md" iconLeft={LifeBuoy}>{t('Contact support about your plan')}</Button>
                </a>
              </>
            )}
          </div>
        </Panel>

        <Panel className="h-fit">
          <PanelHeader title={t('Payments')} icon={CreditCard} />
          <div className="p-5">
            <p className="text-[13px] leading-relaxed text-ink-2">
              {t('Connect Cortex does not take card payments in the app, and stores no card details. Your plan is arranged with the Connect Cortex team directly.')}
            </p>
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title={t('Student voucher')} icon={TicketPercent} action={appliedVoucher ? <Badge tone="success">{t('Applied')}</Badge> : undefined} />
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:items-center">
          <div>
            <p className="text-[14px] font-semibold text-ink">{t('Apply a discount to your next renewal')}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">
              {t('Eligibility is checked on the server against your university, year, group, the voucher dates, and the remaining redemption limit.')}
            </p>
          </div>
          {redemption ? (
            <div className="flex items-center gap-3 rounded-lg border border-success/25 bg-success-tint p-3">
              <span className="min-w-0 flex-1">
                <strong className="block font-mono text-[13px] text-ink">{redemption.code}</strong>
                <span className="mt-0.5 block text-[12px] text-ink-2">
                  {appliedVoucher && price > 0
                    ? `${t('You save')} EGP ${discount.toFixed(0)} · ${t('renewal')} EGP ${renewalPrice.toFixed(0)}`
                    : t('Applied to your account')}
                </span>
              </span>
              <IconButton icon={X} label={t('Remove voucher')} size="sm" disabled={busy} onClick={() => void removeVoucher()} />
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <TextInput
                  value={code}
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  onKeyDown={(event) => { if (event.key === 'Enter') void applyVoucher() }}
                  placeholder={t('Enter voucher code')}
                  aria-label={t('Voucher code')}
                />
                <Button variant="primary" onClick={() => void applyVoucher()} disabled={!code.trim() || busy}>{t('Apply voucher')}</Button>
              </div>
              {message && <p role="status" className="mt-2 text-[12px] text-ink-2">{message}</p>}
            </div>
          )}
        </div>
      </Panel>
    </PageContainer>
  )
}
