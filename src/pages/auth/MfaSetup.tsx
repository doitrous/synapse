import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, KeyRound, MessageSquareText, ShieldCheck } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { API_MODE } from '@/lib/api'
import { authMessage, mfa } from '@/lib/auth/client'
import { useIdentity } from '@/lib/useIdentity'
import { mfaEnforced } from '@/data/adminRoles'
import { portalHome } from '@/lib/portalHost'

type Enrollment = { factorId: string; qrCode: string; secret: string; uri: string }

/**
 * Supabase hands back the QR as raw SVG markup, not as a URL.
 *
 * `<img src="<svg …>">` is not an image source, so the panel rendered a broken
 * image and the page offered nothing to scan — which is exactly what a student
 * reported. The library's own note says to prepend the data-URL prefix; the
 * value is percent-encoded first because raw SVG contains `#`, which ends a URL.
 * An empty string means there is no new factor to show, and a value that
 * already arrives as a data URL is left alone.
 */
function qrSource(qrCode: string): string {
  if (!qrCode) return ''
  if (qrCode.startsWith('data:')) return qrCode
  return `data:image/svg+xml;utf-8,${encodeURIComponent(qrCode)}`
}

export function MfaSetup() {
  const navigate = useNavigate()
  const identity = useIdentity()
  const [params] = useSearchParams()
  // Only an in-app path, and only this origin's home as the fallback, for the
  // same two reasons as on the sign-in form.
  const nextParam = params.get('next')
  const next = nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : portalHome()
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')

  // Who this account is, and what it already has, both come from `/api/me` —
  // one answer the whole app shares rather than three calls this page makes.
  const emailVerified = identity.emailVerified
  // Required when the role demands a factor, and equally when one is already
  // enrolled and this session has not presented it: "Skip" must never bypass a
  // lock the account holder set.
  const enforced = identity.status !== 'demo' && (mfaEnforced(identity.role ?? '') || identity.mfaPending)

  useEffect(() => {
    if (identity.status === 'loading') return undefined
    let active = true
    async function begin() {
      if (!API_MODE) {
        if (active) { setError('This deployment is not connected to its account service yet, so a second factor cannot be added.'); setLoading(false) }
        return
      }
      if (identity.status === 'anonymous') { navigate('/login', { replace: true }); return }
      if (!identity.emailVerified) {
        navigate(`/auth/verify-email?email=${encodeURIComponent(identity.email || '')}`, { replace: true })
        return
      }
      if (identity.aal === 'aal2') { navigate(next, { replace: true }); return }
      try {
        const { factors } = await mfa.factors()
        const existing = factors.find((factor) => factor.factorType === 'totp' && factor.status === 'verified')
        if (existing) {
          // No challenge is raised here. It is raised when the code is
          // submitted, because one issued now would have expired by then.
          if (active) {
            setEnrollment({ factorId: existing.id, qrCode: '', secret: '', uri: '' })
            setLoading(false)
          }
          return
        }
        const enrolled = await mfa.enroll('Nishany authenticator')
        if (active) {
          setEnrollment({ factorId: enrolled.id, qrCode: enrolled.totp?.qr_code ?? '', secret: enrolled.totp?.secret ?? '', uri: enrolled.totp?.uri ?? '' })
          setLoading(false)
        }
      } catch (setupError) {
        if (active) { setError(authMessage(setupError, 'Authenticator setup could not be opened. Sign in again and retry.')); setLoading(false) }
      }
    }
    void begin()
    return () => { active = false }
  }, [identity.aal, identity.email, identity.emailVerified, identity.status, navigate, next])

  async function verify(event: React.FormEvent) {
    event.preventDefault()
    if (!enrollment) return
    setError('')
    setVerifying(true)
    // A challenge is always created here, never reused from mount. Supabase
    // expires a challenge a few minutes after it is issued, so the one made when
    // the page loaded is usually dead by the time anyone has opened their
    // authenticator and typed six digits. Reusing it failed every attempt with
    // an error that blamed the code, so retyping the code could never help.
    try {
      const challenge = await mfa.challenge(enrollment.factorId)
      await mfa.verify(enrollment.factorId, challenge.id, code)
    } catch (verifyError) {
      setVerifying(false)
      return setError(authMessage(verifyError, 'That code was not accepted. Wait for a fresh six-digit code and try again.'))
    }
    setVerifying(false)
    // The session is aal2 now and the cookie has been rotated; the rest of the
    // app is still holding the assurance level it had a moment ago.
    identity.reload()
    navigate(next, { replace: true })
  }

  // No progress rail: this is not a step in signing up. Drawing one here was
  // what made an optional lock look like the last thing standing between a
  // student and the app.
  return (
    <AuthLayout step="verify" showProgress={false} title="Add a second factor" description={identity.mfaPending ? 'Enter the six-digit code from your authenticator app to finish signing in.' : enforced ? 'Your role requires an authenticator app. Set one up to continue.' : 'An authenticator app is an optional extra lock on your account. You can turn it on now, later from your account page, or not at all.'} compact>
      <div className="grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <div className="space-y-3 border-b border-line pb-5 lg:border-b-0 lg:border-e lg:pb-0 lg:pe-5">
          {([['Sign in', emailVerified, true], ['Email verified', emailVerified, true], ['Second factor', false, enforced]] as const).map(([label, complete, required]) => <div key={label} className="flex items-center gap-2.5"><span className={complete ? 'grid size-7 place-items-center rounded-full bg-success-tint text-success' : 'grid size-7 place-items-center rounded-full bg-inset text-ink-2'}><Icon icon={complete ? CheckCircle2 : ShieldCheck} size={14} /></span><span className="text-[12.5px] font-semibold text-ink">{label}{!complete && required ? ' required' : ''}{!required ? ' · optional' : ''}</span></div>)}
        </div>
        <form className="min-w-0" onSubmit={verify}>
          <div className="flex flex-wrap items-start gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-inset text-primary-strong"><Icon icon={KeyRound} size={19} /></span>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-[22px]">Authenticator app</h2><Badge tone="primary">Recommended · free</Badge></div><p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">Works offline with 1Password, Google Authenticator, Microsoft Authenticator, Authy, and compatible apps.</p></div>
          </div>
          {error && <div role="alert" className="mt-5 flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
          {loading && <p className="mt-6 text-[13px] text-ink-2">Preparing secure enrollment…</p>}
          {/* The way past this screen is not inside the enrollment panel.
              Enrollment can fail — a network fault, a provider that is not
              configured — and when it did, the only control on the page was
              gone with it and a student who had just created an account was
              stranded on a step they were never required to complete. */}
          {/* A role that is required to hold a second factor has nowhere to
              skip to: "Skip" would land them on a page that sends them back
              here, which is the loop this screen used to be. Signing out is
              the one thing that is genuinely available to them. */}
          {!loading && (enforced
            ? (
              <p className="mt-4">
                <Link to="/logout" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-inset">
                  Sign out
                </Link>
              </p>
            )
            : (
              <p className="mt-4">
                <button type="button" onClick={() => navigate(next, { replace: true })} className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line-2 bg-surface px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-inset">
                  Skip — take me to Nishany
                </button>
              </p>
            ))}
          {!loading && enrollment && (
            <div className="mt-6 grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)]">
              {enrollment.qrCode ? <img src={qrSource(enrollment.qrCode)} alt="Authenticator QR code" width={144} height={144} className="size-36 rounded-lg border border-line bg-white p-2" /> : <div className="grid size-36 place-items-center rounded-lg border border-success/30 bg-success-tint text-center text-[12px] font-semibold text-success">Factor enrolled<br />Enter a fresh code</div>}
              <div className="space-y-4">
                {enrollment.secret && (
                  <div>
                    <p className="text-[12px] font-semibold text-ink">Cannot scan? Type this into your authenticator instead.</p>
                    <p className="mt-1 break-all rounded-md border border-line bg-inset px-2.5 py-2 font-mono text-[11px] text-ink-2">{enrollment.secret}</p>
                    {/* On the phone that is reading this page, tapping the link
                        opens the authenticator with the account already filled
                        in — there is no second screen to point a camera at. */}
                    {enrollment.uri && <a href={enrollment.uri} className="mt-1.5 inline-block text-[12px] font-semibold text-primary-strong hover:text-primary">Open in my authenticator app</a>}
                  </div>
                )}
                <Field label="Six-digit verification code" htmlFor="mfa-code"><TextInput id="mfa-code" name="one-time-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000…" className="font-mono tracking-[0.25em]" /></Field>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" variant="primary" iconLeft={ShieldCheck} loading={verifying} disabled={code.length !== 6}>Verify authenticator</Button>
                  {!enforced && (
                    <button type="button" onClick={() => navigate(next)} className="inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold text-ink-2 transition-colors hover:bg-inset hover:text-ink">
                      Not now
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mt-7 flex gap-3 rounded-lg border border-line bg-surface-2/55 p-4 opacity-80" aria-disabled="true"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-inset text-ink-2"><Icon icon={MessageSquareText} size={17} /></span><div><div className="flex flex-wrap items-center gap-2"><p className="text-[13px] font-semibold text-ink">Text message (SMS)</p><Badge tone="neutral">Provider required</Badge></div><p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">Prepared for a later paid phase. Supabase Advanced Phone MFA and the SMS provider both add charges, so this is intentionally not enabled.</p></div></div>
        </form>
      </div>
    </AuthLayout>
  )
}
