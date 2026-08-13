import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, KeyRound, MessageSquareText, ShieldCheck } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { supabase } from '@/lib/supabase'
import { authErrorMessage } from './authMessages'

type Enrollment = { factorId: string; qrCode: string; secret: string }

export function MfaSetup() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // Only an in-app path, for the same reason as on the sign-in form.
  const nextParam = params.get('next')
  const next = nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/app'
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)

  useEffect(() => {
    let active = true
    async function begin() {
      if (!supabase) {
        if (active) { setError('Supabase is not connected yet. MFA becomes active after the project keys are added.'); setLoading(false) }
        return
      }
      const { data: account, error: accountError } = await supabase.auth.getUser()
      if (accountError || !account.user) {
        navigate('/login', { replace: true })
        return
      }
      if (!account.user.email_confirmed_at) {
        navigate(`/auth/verify-email?email=${encodeURIComponent(account.user.email || '')}`, { replace: true })
        return
      }
      if (active) setEmailVerified(true)
      const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (assurance?.currentLevel === 'aal2') { navigate(next, { replace: true }); return }
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()
      if (factorsError) { if (active) { setError(authErrorMessage(factorsError, 'Authenticator setup could not be opened. Sign in again and retry.')); setLoading(false) }; return }
      const existing = factors.totp.find((factor) => factor.status === 'verified')
      if (existing) {
        // No challenge is raised here. It is raised when the code is submitted,
        // because one issued now would have expired by then.
        if (active) {
          setEnrollment({ factorId: existing.id, qrCode: '', secret: '' })
          setLoading(false)
        }
        return
      }
      const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Synapse authenticator' })
      if (active) {
        if (enrollError) setError(authErrorMessage(enrollError, 'Authenticator enrollment could not be started. Try again.'))
        else setEnrollment({ factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret })
        setLoading(false)
      }
    }
    void begin()
    return () => { active = false }
  }, [navigate, next])

  async function verify(event: React.FormEvent) {
    event.preventDefault()
    if (!supabase || !enrollment) return
    setError('')
    setVerifying(true)
    // A challenge is always created here, never reused from mount. Supabase
    // expires a challenge a few minutes after it is issued, so the one made when
    // the page loaded is usually dead by the time anyone has opened their
    // authenticator and typed six digits. Reusing it failed every attempt with
    // an error that blamed the code, so retyping the code could never help.
    const { data, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: enrollment.factorId })
    if (challengeError) { setError(authErrorMessage(challengeError, 'A fresh authenticator challenge could not be created. Try again.')); setVerifying(false); return }
    const { error: verifyError } = await supabase.auth.mfa.verify({ factorId: enrollment.factorId, challengeId: data.id, code })
    setVerifying(false)
    if (verifyError) return setError(authErrorMessage(verifyError, 'That code was not accepted. Wait for a fresh six-digit code and try again.'))
    navigate(next)
  }

  return (
    <AuthLayout step="protect" completedSteps={emailVerified ? ['account', 'verify'] : []} title="Add a second factor" description="An authenticator app is an optional extra lock on your account. You can turn it on now, later from your account page, or not at all." compact>
      <div className="grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <div className="space-y-3 border-b border-line pb-5 lg:border-b-0 lg:border-e lg:pb-0 lg:pe-5">
          {([['Sign in', emailVerified, true], ['Email verified', emailVerified, true], ['Second factor', false, false]] as const).map(([label, complete, required]) => <div key={label} className="flex items-center gap-2.5"><span className={complete ? 'grid size-7 place-items-center rounded-full bg-success-tint text-success' : 'grid size-7 place-items-center rounded-full bg-inset text-ink-2'}><Icon icon={complete ? CheckCircle2 : ShieldCheck} size={14} /></span><span className="text-[12.5px] font-semibold text-ink">{label}{!complete && required ? ' required' : ''}{!required ? ' · optional' : ''}</span></div>)}
        </div>
        <form className="min-w-0" onSubmit={verify}>
          <div className="flex flex-wrap items-start gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-inset text-accent-strong"><Icon icon={KeyRound} size={19} /></span>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-[22px]">Authenticator app</h2><Badge tone="accent">Recommended · free</Badge></div><p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">Works offline with 1Password, Google Authenticator, Microsoft Authenticator, Authy, and compatible apps.</p></div>
          </div>
          {error && <div role="alert" className="mt-5 flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
          {loading && <p className="mt-6 text-[13px] text-ink-2">Preparing secure enrollment…</p>}
          {!loading && enrollment && (
            <div className="mt-6 grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)]">
              {enrollment.qrCode ? <img src={enrollment.qrCode} alt="Authenticator QR code" className="size-36 rounded-lg border border-line bg-white p-2" /> : <div className="grid size-36 place-items-center rounded-lg border border-success/30 bg-success-tint text-center text-[12px] font-semibold text-success">Factor enrolled<br />Enter a fresh code</div>}
              <div className="space-y-4">
                {enrollment.secret && <div><p className="text-[12px] font-semibold text-ink">Cannot scan?</p><p className="mt-1 break-all rounded-md border border-line bg-inset px-2.5 py-2 font-mono text-[11px] text-ink-2">{enrollment.secret}</p></div>}
                <Field label="Six-digit verification code" htmlFor="mfa-code"><TextInput id="mfa-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="font-mono tracking-[0.25em]" /></Field>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" variant="primary" iconLeft={ShieldCheck} loading={verifying} disabled={code.length !== 6}>Verify authenticator</Button>
                  <button type="button" onClick={() => navigate(next)} className="inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold text-ink-2 transition-colors hover:bg-inset hover:text-ink">
                    Not now
                  </button>
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
