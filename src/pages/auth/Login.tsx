import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { AuthLayout } from './AuthLayout'
import { SocialAuthButtons } from './SocialAuthButtons'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { authErrorMessage } from './authMessages'

/**
 * Only a path inside this app is an acceptable place to land after sign-in.
 * An absolute or protocol-relative `next` would let a link turn our own login
 * form into a redirector to somebody else's site.
 */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/app'
  return value
}

export function Login() {
  const navigate = useNavigate()
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
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    if (!supabase) {
      setError('Account sign-in is not available yet: this deployment is not connected to its account service.')
      return
    }
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(authErrorMessage(signInError, 'Sign-in could not be completed. Check your details and try again.'))
      setLoading(false)
      return
    }
    const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    const mfaPending = assurance?.nextLevel === 'aal2' && assurance.currentLevel !== 'aal2'
    // Carry the original destination through the second factor, so being asked
    // for a code does not quietly drop the page the student was heading to.
    navigate(mfaPending ? `/auth/mfa?next=${encodeURIComponent(next)}` : next)
  }

  return (
    <AuthLayout
      step="account"
      title="Welcome back"
      description="Sign in to continue your study plan. Your account identity and your private learning record stay deliberately separate."
      compact
      showProgress={false}
    >
      <form className="mx-auto max-w-md space-y-5" onSubmit={submit}>
        <div>
          <h2 className="text-[24px] text-ink">Sign in to your account</h2>
          <p className="mt-1.5 text-[13px] text-ink-2">Use the email address you verified at signup.</p>
        </div>
        {!isSupabaseConfigured && (
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
        <SocialAuthButtons mode="sign in" redirectTo={`${window.location.origin}${next}`} />
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
          <span className="h-px flex-1 bg-line" />
          Email
          <span className="h-px flex-1 bg-line" />
        </div>
        <Field label="Email address" htmlFor="login-email">
          <TextInput id="login-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu…" />
        </Field>
        <Field label="Password" htmlFor="login-password">
          <div className="relative">
            <TextInput id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="pe-12" />
            <button type="button" className="absolute end-1 top-1 grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon icon={showPassword ? EyeOff : Eye} size={16} />
            </button>
          </div>
        </Field>
        <div className="flex justify-end text-[12.5px]">
          <Link to="/auth/forgot-password" className="font-semibold text-primary-strong hover:text-primary">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={LogIn} loading={loading}>Sign in</Button>
        <p className="text-center text-[13px] text-ink-2">New to Maristana? <Link className="inline-flex items-center gap-1 font-semibold text-primary-strong hover:text-primary" to="/signup">Create an account <Icon icon={ArrowRight} size={13} /></Link></p>
      </form>
    </AuthLayout>
  )
}
