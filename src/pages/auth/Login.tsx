import { useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Eye, EyeOff, Fingerprint, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { AuthLayout } from './AuthLayout'
import { SocialAuthButtons } from './SocialAuthButtons'
import { API_MODE } from '@/lib/api'
import { authMessage, login as signIn } from '@/lib/auth/client'
import { useIdentity } from '@/lib/useIdentity'
import { portalHome } from '@/lib/portalHost'
import { loginWithPasskey, passkeysSupported, type PasskeyErrorReason } from '@/lib/passkeys'

/** Cancelling the OS prompt is not an error worth a red banner — the browser already showed its own UI for that. */
function passkeyErrorMessage(reason: PasskeyErrorReason): string {
  switch (reason) {
    case 'not_supported': return 'This browser or device does not support passkeys yet.'
    case 'server_refused': return 'That passkey could not be verified. Try again, or sign in with your password.'
    default: return 'Passkey sign-in could not be completed. Try again, or sign in with your password.'
  }
}

/**
 * Only a path inside this app is an acceptable place to land after sign-in.
 * An absolute or protocol-relative `next` would let a link turn our own login
 * form into a redirector to somebody else's site.
 *
 * The fallback asks which portal this origin serves. Hard-coding `/app` meant
 * signing in on the admin domain with no `next` — from the sign-out page, or a
 * bookmarked /login — threw the admin straight across to the student site,
 * because `/app` is not a page there but a hand-over to the other origin.
 */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return portalHome()
  return value
}

export function Login() {
  const navigate = useNavigate()
  const identity = useIdentity()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const location = useLocation()
  /**
   * Somebody sent here from sign-up already told us who they are.
   *
   * Their email arrives filled in. A phone cannot be signed in with, so it is
   * shown as a reminder of which account they are looking for rather than
   * dropped, which would leave them staring at an empty form wondering what
   * they were told.
   */
  const knownPhone = params.get('phone') ?? ''
  const notice = (location.state as { notice?: string } | null)?.notice ?? ''
  const [email, setEmail] = useState(() => params.get('email') ?? '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const submittingRef = useRef(false)
  const [error, setError] = useState('')
  const [passkeyLoading, setPasskeyLoading] = useState(false)

  /**
   * One screen, once.
   *
   * The server says whether a second factor is still owed (`mfaPending`), and
   * that is the only thing that puts a code screen in the way: a correct
   * password on an account with no verified authenticator goes straight to
   * `next`. An admin who has not set one up yet is not stopped here either —
   * RequireAuth shows them where to add one instead of trapping them in an
   * enrolment screen they cannot leave.
   *
   * The identity is re-read before navigating, so the guard at `next` sees the
   * session that was just created rather than the anonymous one that preceded it.
   */
  function afterSignedIn(mfaPending: boolean) {
    identity.reload()
    navigate(mfaPending ? `/auth/mfa?next=${encodeURIComponent(next)}` : next, { replace: true })
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    // A ref, not `loading`: two rapid Enter presses fire submit twice in the
    // same tick, before the state update that disables the button flushes.
    if (submittingRef.current) return
    setError('')
    if (!API_MODE) {
      setError('Account sign-in is not available yet: this deployment is not connected to its account service.')
      return
    }
    submittingRef.current = true
    setLoading(true)
    try {
      const { mfaPending } = await signIn(email, password)
      afterSignedIn(mfaPending)
    } catch (signInError) {
      setError(authMessage(signInError, 'Sign-in could not be completed. Check your details and try again.'))
      setLoading(false)
      submittingRef.current = false
    }
  }

  async function submitPasskey() {
    setError('')
    if (!email.trim()) {
      setError('Enter your email above, then choose "Sign in with a passkey".')
      return
    }
    setPasskeyLoading(true)
    const result = await loginWithPasskey(email.trim())
    setPasskeyLoading(false)
    if (!result.ok) {
      // A dismissed OS prompt is not a failure worth explaining — the student
      // already saw the browser cancel it, and probably meant to use their
      // password instead.
      if (result.error !== 'cancelled') setError(passkeyErrorMessage(result.error))
      return
    }
    // A passkey replaces the password, not the second factor. `/api/me` is what
    // knows whether one is still owed, so the reload above answers it.
    afterSignedIn(false)
  }

  const aside = (
    <div>
      <h2 className="text-[25px] text-(--auth-ink)">Learn medicine the way you&rsquo;ll practise it.</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-(--auth-ink-2)">Your question bank, spaced-repetition cards, and progress — one account, on every device.</p>
      <p dir="rtl" lang="ar" className="mt-5 text-[14px] font-medium text-(--auth-accent)">هدفك الأول للتفوّق في الطب.</p>
    </div>
  )

  // Already signed in — on this origin or, since the session is one cookie
  // shared by both portal hostnames, on the other one. Showing the form again
  // would be the second login this whole change exists to remove.
  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status === 'authenticated') return <Navigate to={next} replace />

  return (
    <AuthLayout
      step="account"
      title="Welcome back"
      description="Sign in to continue your study plan."
      showProgress={false}
      aside={aside}
    >
      <form className="space-y-5" onSubmit={submit}>
        {!API_MODE && (
          <div className="rounded-lg border border-warning/30 bg-warning-tint px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
            Sign-in is unavailable: this deployment is not connected to its account service yet.
          </div>
        )}
        {notice && (
          <div className="rounded-lg border border-primary-line bg-primary-tint px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
            {notice}
            {knownPhone && <span className="mt-1 block font-mono text-[12px] text-ink-3">{knownPhone}</span>}
          </div>
        )}
        {error && <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
        <SocialAuthButtons mode="sign in" next={next} />
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
          <span className="h-px flex-1 bg-line" />
          OR
          <span className="h-px flex-1 bg-line" />
        </div>
        <Field label="Email address" htmlFor="login-email">
          <TextInput id="login-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu…" className="border-(--auth-field-border)! bg-(--auth-field-bg)!" />
        </Field>
        <Field label="Password" htmlFor="login-password">
          <div className="relative">
            <TextInput id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="pe-12 border-(--auth-field-border)! bg-(--auth-field-bg)!" />
            <button type="button" className="absolute end-1 top-1 grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon icon={showPassword ? EyeOff : Eye} size={16} />
            </button>
          </div>
        </Field>
        <div className="flex justify-end text-[12.5px]">
          <Link to="/auth/forgot-password" className="font-semibold text-primary-strong hover:text-primary">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={LogIn} loading={loading}>Sign in</Button>
        {passkeysSupported && (
          <Button
            className="w-full"
            type="button"
            variant="secondary"
            size="lg"
            loading={passkeyLoading}
            onClick={() => void submitPasskey()}
          >
            {!passkeyLoading && <Icon icon={Fingerprint} size={18} className="text-primary-strong" />}
            Sign in with a passkey
          </Button>
        )}
        <p className="text-center text-[13px] text-ink-2">New to Nishany? <Link className="inline-flex items-center gap-1 font-semibold text-primary-strong hover:text-primary" to="/signup">Create an account <Icon icon={ArrowRight} size={13} /></Link></p>
      </form>
    </AuthLayout>
  )
}
