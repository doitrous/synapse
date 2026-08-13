import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, Eye, EyeOff, KeyRound, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { AuthLayout } from './AuthLayout'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { apiGet, clearOwnerAccessToken, setOwnerAccessToken } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'
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
  const { reload } = useIdentity()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ownerKey, setOwnerKey] = useState('')
  const [ownerLoading, setOwnerLoading] = useState(false)
  const [ownerError, setOwnerError] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    if (!supabase) {
      setError('Account sign-in is prepared but Supabase is not connected yet. Use Preview dashboards for temporary access.')
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

  async function openOwnerPreview(event: React.FormEvent) {
    event.preventDefault()
    const clean = ownerKey.trim()
    if (!clean) return setOwnerError('Enter the temporary owner access key from the server environment.')
    setOwnerLoading(true)
    setOwnerError('')
    setOwnerAccessToken(clean)
    try {
      const session = await apiGet<{ user: { role: string; bypass: boolean } | null }>('/session')
      if (!session.user?.bypass || session.user.role !== 'admin') throw new Error('not owner')
      // The identity provider sits above the router, so navigating alone would
      // not make it notice the key that was just accepted.
      reload()
      navigate('/admin')
    } catch {
      clearOwnerAccessToken()
      setOwnerError('That owner access key was not accepted. Check API_BEARER in Coolify and try again.')
    } finally {
      setOwnerLoading(false)
    }
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
            Account service awaiting Supabase project keys. Temporary dashboard preview remains available above.
          </div>
        )}
        {error && <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
        <Field label="Email address" htmlFor="login-email">
          <TextInput id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" />
        </Field>
        <Field label="Password" htmlFor="login-password">
          <div className="relative">
            <TextInput id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="pe-12" />
            <button type="button" className="absolute end-1 top-1 grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon icon={showPassword ? EyeOff : Eye} size={16} />
            </button>
          </div>
        </Field>
        <div className="flex justify-end text-[12.5px]">
          <Link to="/auth/forgot-password" className="font-semibold text-accent-strong hover:text-accent">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={LogIn} loading={loading}>Sign in</Button>
        <p className="text-center text-[13px] text-ink-2">New to Synapse? <Link className="inline-flex items-center gap-1 font-semibold text-accent-strong hover:text-accent" to="/signup">Create an account <Icon icon={ArrowRight} size={13} /></Link></p>
      </form>
      <div className="mx-auto my-7 flex max-w-md items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-2" aria-hidden><span className="h-px flex-1 bg-line" />Temporary owner access<span className="h-px flex-1 bg-line" /></div>
      <form className="mx-auto max-w-md space-y-3" onSubmit={openOwnerPreview}>
        <p className="text-[12.5px] leading-relaxed text-ink-2">The Student/Admin preview links remain open. To change live data, enter the server-only owner key; it stays only in this browser tab and is never built into the site.</p>
        {ownerError && <p role="alert" className="rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">{ownerError}</p>}
        <Field label="Owner access key" htmlFor="owner-key">
          <TextInput id="owner-key" type="password" autoComplete="off" required value={ownerKey} onChange={(event) => setOwnerKey(event.target.value)} />
        </Field>
        <Button className="w-full" type="submit" variant="secondary" size="lg" iconLeft={KeyRound} loading={ownerLoading}>Open editable admin preview</Button>
      </form>
    </AuthLayout>
  )
}
