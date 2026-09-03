import { useCallback, useEffect, useState } from 'react'
import { Fingerprint, Trash2 } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { enrollPasskey, listMyPasskeys, passkeysSupported, removeMyPasskey, type PasskeyCredential, type PasskeyErrorReason } from '@/lib/passkeys'
import { useT } from '@/lib/i18n'

function enrollErrorMessage(reason: PasskeyErrorReason): string {
  switch (reason) {
    case 'not_supported': return 'This browser or device does not support passkeys yet.'
    case 'already_registered': return 'This device already holds a passkey for your account.'
    case 'server_refused': return 'That could not be registered as a passkey. Try again.'
    default: return 'Adding a passkey could not be completed. Try again.'
  }
}

function formatWhen(value: string | null): string {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Enrol and manage passkeys, from the account page.
 *
 * A sibling to `MfaControl` — same shape, same place — but a passkey is not a
 * second factor: it is a passwordless *first* factor (see webauthn.js), so a
 * student can hold several (phone, laptop, security key) rather than one.
 */
export function PasskeyControl() {
  const t = useT()
  const [credentials, setCredentials] = useState<PasskeyCredential[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const read = useCallback(async () => {
    try {
      setCredentials(await listMyPasskeys())
    } catch {
      setError(t('Your passkeys could not be loaded.'))
      setCredentials([])
    }
  }, [t])

  useEffect(() => { void read() }, [read])

  async function add() {
    setBusy(true)
    setError('')
    const result = await enrollPasskey()
    setBusy(false)
    if (!result.ok) {
      if (result.error !== 'cancelled') setError(enrollErrorMessage(result.error))
      return
    }
    await read()
  }

  async function remove(id: string) {
    setRemovingId(id)
    setError('')
    try {
      await removeMyPasskey(id)
      await read()
    } catch {
      setError(t('That passkey could not be removed. Try again.'))
    } finally {
      setRemovingId(null)
    }
  }

  if (!passkeysSupported) return null

  return (
    <div className="rounded-lg border border-line p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[13px] font-medium text-ink">{t('Passkeys')}</p>
        {credentials && credentials.length > 0 && (
          <span className="rounded-full bg-success-tint px-2 py-0.5 text-[11px] font-semibold text-success">
            {credentials.length} {t('added')}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-3">
        {t('Sign in with your fingerprint, face, or device PIN instead of a password. Add one per device.')}
      </p>

      {error && <p role="alert" className="mt-2 rounded-md border border-danger/30 bg-danger-tint px-2.5 py-2 text-[11.5px] text-danger">{error}</p>}

      {credentials && credentials.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {credentials.map((credential) => (
            <li key={credential.id} className="flex items-center justify-between gap-2 rounded-md border border-line-2 bg-surface px-2.5 py-2">
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-ink">{credential.deviceLabel || t('Passkey')}</p>
                <p className="mt-0.5 text-[11px] text-ink-3">
                  {credential.lastUsedAt
                    ? `${t('Last used')} ${formatWhen(credential.lastUsedAt)}`
                    : `${t('Added')} ${formatWhen(credential.createdAt)}`}
                </p>
              </div>
              <button
                type="button"
                disabled={removingId === credential.id}
                onClick={() => void remove(credential.id)}
                aria-label={t('Remove this passkey')}
                className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-danger-tint hover:text-danger disabled:opacity-60"
              >
                <Icon icon={Trash2} size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={() => void add()}
        className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[12.5px] font-semibold text-ink hover:bg-inset disabled:opacity-60"
      >
        <Icon icon={Fingerprint} size={15} />{busy ? t('Adding…') : t('Add a passkey')}
      </button>
    </div>
  )
}
