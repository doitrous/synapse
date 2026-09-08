import { LoadingRegion, SkeletonFields } from '@/components/loading/SkeletonParts'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ShieldOff } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { API_MODE } from '@/lib/api'
import { authMessage, mfa } from '@/lib/auth/client'
import { useIdentity } from '@/lib/useIdentity'
import { mfaEnforced } from '@/data/adminRoles'
import { useT } from '@/lib/i18n'

type Status =
  | { kind: 'loading' }
  | { kind: 'unavailable' }
  /** No verified factor: the account can add one. */
  | { kind: 'off' }
  /** A verified factor exists. `canRemove` is false until this session is aal2. */
  | { kind: 'on'; factorId: string; canRemove: boolean }

/**
 * Turning the second factor on and off, from the account page.
 *
 * Enrolment lives at /auth/mfa because it needs a QR code and a six-digit
 * round trip. Removal lives here because it is one confirmed action — but
 * Supabase will only unenroll a verified factor from a session that has already
 * cleared that factor. A student who signed in before enrolling is at aal1 and
 * genuinely cannot remove it yet, so the button says so instead of failing.
 */
export function MfaControl() {
  const t = useT()
  const identity = useIdentity()
  const [status, setStatus] = useState<Status>({ kind: 'loading' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [confirming, setConfirming] = useState(false)

  // The assurance level is the session's, and `/api/me` is the one place that
  // knows it — asking Supabase again from here would be a second answer to a
  // question the app has already settled.
  const aal = identity.aal

  const read = useCallback(async () => {
    if (!API_MODE) return setStatus({ kind: 'unavailable' })
    try {
      const { factors } = await mfa.factors()
      const verified = factors.find((factor) => factor.factorType === 'totp' && factor.status === 'verified')
      setStatus(verified ? { kind: 'on', factorId: verified.id, canRemove: aal === 'aal2' } : { kind: 'off' })
    } catch (factorsError) {
      setError(authMessage(factorsError, 'The second-factor setting could not be read.'))
      setStatus({ kind: 'unavailable' })
    }
  }, [aal])

  useEffect(() => { void read() }, [read])

  async function turnOff(factorId: string) {
    setBusy(true)
    setError('')
    try {
      await mfa.unenroll(factorId)
    } catch (unenrollError) {
      setBusy(false)
      setConfirming(false)
      setError(authMessage(unenrollError, 'The authenticator could not be removed. Try again.'))
      return
    }
    setBusy(false)
    setConfirming(false)
    // The session is no longer aal2-backed by anything; the rest of the app
    // still thinks a factor is enrolled.
    identity.reload()
    await read()
  }

  const on = status.kind === 'on'

  return (
    <div className="rounded-lg border border-line p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[13px] font-medium text-ink">{t('Two-factor authentication')}</p>
        {status.kind !== 'loading' && status.kind !== 'unavailable' && (
          <span className={on
            ? 'rounded-full bg-success-tint px-2 py-0.5 text-[11px] font-semibold text-success'
            : 'rounded-full bg-inset px-2 py-0.5 text-[11px] font-semibold text-ink-2'}>
            {on ? t('On') : t('Off')}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-3">
        {mfaEnforced(identity.role ?? '')
          ? t('Required for your role. A free authenticator app asks for a six-digit code when you sign in.')
          : t('Optional. A free authenticator app asks for a six-digit code when you sign in.')}
      </p>

      {error && <p role="alert" className="mt-2 rounded-md border border-danger/30 bg-danger-tint px-2.5 py-2 text-[11.5px] text-danger">{error}</p>}

      {status.kind === 'loading' && <LoadingRegion><SkeletonFields fields={2} /></LoadingRegion>}

      {status.kind === 'unavailable' && (
        <p className="mt-3 text-[12px] text-ink-3">{t('Unavailable until this deployment is connected to its account service.')}</p>
      )}

      {status.kind === 'off' && (
        <Link to="/auth/mfa" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink hover:bg-inset">
          <Icon icon={ShieldCheck} size={15} />{t('Turn on')}
        </Link>
      )}

      {status.kind === 'on' && !status.canRemove && (
        <p className="mt-3 text-[12px] leading-relaxed text-ink-3">
          {t('To turn this off, sign out and sign in again with your authenticator code, then come back here.')}
        </p>
      )}

      {status.kind === 'on' && status.canRemove && !confirming && (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink hover:bg-inset"
        >
          <Icon icon={ShieldOff} size={15} />{t('Turn off')}
        </button>
      )}

      {status.kind === 'on' && status.canRemove && confirming && (
        <div className="mt-3 rounded-md border border-warning/30 bg-warning-tint/40 p-2.5">
          <p className="text-[12px] leading-relaxed text-ink-2">
            {t('Your account will be protected by its password alone. You can turn this back on at any time.')}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void turnOff(status.factorId)}
              className="inline-flex min-h-9 items-center rounded-lg bg-danger px-3 text-[12.5px] font-semibold text-on-danger disabled:opacity-60"
            >
              {busy ? t('Removing…') : t('Turn it off')}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="inline-flex min-h-9 items-center rounded-lg px-3 text-[12.5px] font-semibold text-ink-2 hover:bg-inset"
            >
              {t('Keep it on')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
