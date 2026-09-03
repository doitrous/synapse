import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, BookOpenText, CalendarDays, ChartNoAxesColumnIncreasing, Check, Circle, Eye, EyeOff, UserPlus } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { SocialAuthButtons } from './SocialAuthButtons'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Turnstile } from '@/components/forms/Turnstile'
import { API_MODE } from '@/lib/api'
import { AuthError, authMessage, rememberSignupDetails } from '@/lib/auth/client'
import { rememberPendingEmail } from './pendingEmail'
import { CONFLICT_MESSAGE, MIN_PASSWORD, normalisePhone, signInPathFor } from '@/data/accountIdentity'
import { identityConflict } from '@/lib/accountExists'

// src/lib/auth/client.ts's `signup()` posts a fixed `{ email, password, data }`
// body and its `call()` helper is module-private, so there is no way to add
// `turnstileToken` to that call without editing that file — out of this
// track's scope (src/lib/auth/* belongs to another track). This duplicates
// just enough of `call()`'s shape to stay wire-compatible with it (same
// `AuthError` on failure, same 429 handling), so `authMessage()` below still
// works unchanged.
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? ''
async function signupWithTurnstile(
  email: string,
  password: string,
  data: Record<string, string> | undefined,
  turnstileToken: string,
): Promise<{ ok: boolean; alreadyRegistered: boolean; session: boolean }> {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, data, turnstileToken: turnstileToken || undefined }),
  })
  const payload = res.status === 204 ? null : await res.json().catch(() => null)
  if (res.ok) return payload ?? { ok: true, alreadyRegistered: false, session: false }
  if (res.status === 429) {
    const seconds = Math.max(1, Math.ceil(Number(payload?.retryAfter ?? res.headers.get('Retry-After') ?? 60)))
    throw new AuthError(429, payload?.error ?? 'too_many_attempts', `Too many attempts. Try again in ${seconds} s.`)
  }
  throw new AuthError(res.status, payload?.error ?? 'request_failed', payload?.message ?? '')
}

const ownership = [
  { icon: BookOpenText, title: 'Notes and highlights', detail: 'Annotations, personal articles, tags, and reading state.' },
  { icon: CalendarDays, title: 'Study plan and calendar', detail: 'Your blocks, reminders, whiteboards, and notebooks.' },
  { icon: ChartNoAxesColumnIncreasing, title: 'Attempts and progress', detail: 'Question attempts, bookmarks, and performance history.' },
]

export function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  /**
   * Six characters is the whole requirement.
   *
   * The other three lines are still shown, because a password that meets them
   * is a better password — but they are advice, not a gate. Requiring a
   * capital, a lower-case letter and a digit on top of a six-character minimum
   * is a ten-character rule wearing a shorter number.
   */
  const longEnough = password.length >= MIN_PASSWORD
  const advice = useMemo(() => [/[a-z]/.test(password), /[A-Z]/.test(password), /\d|[^\w\s]/.test(password)], [password])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    if (cleanName.length < 2) return setError('Enter your full name before continuing.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return setError('Enter a complete email address, such as you@university.edu.')
    const cleanPhone = normalisePhone(phone)
    if (!cleanPhone) return setError('Enter your phone number, including the country code if you are outside Egypt.')
    if (!longEnough) return setError(`Use at least ${MIN_PASSWORD} characters for your password.`)
    if (password !== confirm) return setError('Passwords do not match. Re-enter the same password in both fields.')

    setLoading(true)

    // Asked before anything is created. A person who already has an account is
    // sent to sign in with the field they used filled in, rather than being
    // handed an error after Supabase has made an auth user with no roster row.
    let conflict = null
    try {
      conflict = await identityConflict({ email: cleanEmail, phone: cleanPhone })
    } catch {
      // The check is a courtesy; the unique index is the guarantee. A server
      // that cannot answer must not stop somebody registering.
    }
    if (conflict) {
      setLoading(false)
      return navigate(signInPathFor(conflict), { state: { notice: CONFLICT_MESSAGE[conflict.field] } })
    }

    // Checked after the duplicate, not before it: telling somebody they already
    // have an account is worth doing whether or not sign-up itself is wired up.
    if (!API_MODE) {
      setLoading(false)
      return setError('Account creation is prepared but this deployment is not connected to its account service yet. Temporary dashboard preview remains available.')
    }

    let created: { alreadyRegistered: boolean; session: boolean }
    try {
      created = await signupWithTurnstile(cleanEmail, password, { full_name: cleanName, phone: cleanPhone, nationality: nationality.trim() }, turnstileToken)
    } catch (signUpError) {
      setLoading(false)
      return setError(authMessage(signUpError, 'Account creation could not be completed. Review the form and try again.'))
    }
    setLoading(false)

    // Supabase answers a sign-up for an address that already exists with a
    // success and an obfuscated user carrying no identities, so that the form
    // cannot be used to enumerate who has an account. The server preserves that
    // discriminator verbatim (`alreadyRegistered`): from this side it is
    // otherwise indistinguishable from a new registration, and the student is
    // left waiting for an email that describes a password they did not set.
    // Sending them to sign in is the only honest reading.
    if (created.alreadyRegistered) {
      return navigate(signInPathFor({ field: 'email', value: cleanEmail }), { state: { notice: CONFLICT_MESSAGE.email } })
    }

    // The confirmation link opens a fresh page with no `?email=` on it, so the
    // address is stored as well as passed — otherwise resending is impossible
    // from the one page that needs to offer it.
    rememberPendingEmail(cleanEmail)
    // Nothing on the server can hold these until the account picks a university
    // and a roster row exists; onboarding is what finally stores them.
    rememberSignupDetails({ name: cleanName, phone: cleanPhone, nationality: nationality.trim() })
    // A session already in hand means this project does not require email
    // confirmation, so there is no email to wait for. Saying "check your inbox"
    // anyway is the cue that never arrives — the complaint that started this.
    // `sent=0` tells the next page which of the two happened.
    navigate(`/auth/verify-email?email=${encodeURIComponent(cleanEmail)}${created.session ? '&sent=0' : ''}`)
  }

  const aside = (
    <div>
      <h2 className="text-[25px] text-[#2b211c]">What belongs to you</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-[#6e6157]">Your private learning record is stored under your verified account ID—not under an email typed into a form.</p>
      <ul className="mt-6 divide-y divide-[#e4d5bc]">
        {ownership.map((item) => <li key={item.title} className="flex gap-3 py-4 first:pt-0"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/60 text-[#a81d40]"><Icon icon={item.icon} size={17} /></span><span><span className="block text-[13.5px] font-semibold text-[#2b211c]">{item.title}</span><span className="mt-0.5 block text-[12px] leading-relaxed text-[#6e6157]">{item.detail}</span><span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#a81d40]/10 px-2 py-0.5 text-[11px] font-semibold text-[#a81d40]"><Icon icon={Check} size={11} /> Private to your account</span></span></li>)}
      </ul>
    </div>
  )

  return (
    <AuthLayout step="account" title="Create your Nishany account" description="One account for your study record. Verify your email, then choose your university, year and plan. A second factor is optional and can be added later." aside={aside}>
      <form className="space-y-4" onSubmit={submit}>
        {!API_MODE && <div className="rounded-lg border border-warning/30 bg-warning-tint px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">Account service awaiting its backend connection. The form is ready and dashboard preview stays open.</div>}
        {error && <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
        <SocialAuthButtons mode="sign up" next="/app" />
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
          <span className="h-px flex-1 bg-line" />
          OR
          <span className="h-px flex-1 bg-line" />
        </div>
        <Field label="Full name" htmlFor="signup-name"><TextInput id="signup-name" name="name" autoComplete="name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} className="border-[#dccfba]! bg-[#fffdfa]!" /></Field>
        <Field label="University email" htmlFor="signup-email"><TextInput id="signup-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu…" className="border-[#dccfba]! bg-[#fffdfa]!" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" htmlFor="signup-phone" hint="One account per number">
            <TextInput id="signup-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0100 123 4567…" className="border-[#dccfba]! bg-[#fffdfa]!" />
          </Field>
          <Field label="Nationality" htmlFor="signup-nationality" hint="Optional">
            <TextInput id="signup-nationality" name="nationality" autoComplete="country-name" value={nationality} onChange={(event) => setNationality(event.target.value)} placeholder="Egyptian…" className="border-[#dccfba]! bg-[#fffdfa]!" />
          </Field>
        </div>
        <Field label="Password" htmlFor="signup-password" hint={`${MIN_PASSWORD} characters or more`}>
          <div className="relative"><TextInput id="signup-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={MIN_PASSWORD} value={password} onChange={(event) => setPassword(event.target.value)} className="pe-12 border-[#dccfba]! bg-[#fffdfa]!" /><button type="button" className="absolute end-1 top-1 grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}><Icon icon={showPassword ? EyeOff : Eye} size={16} /></button></div>
        </Field>
        <Field label="Confirm password" htmlFor="signup-confirm"><TextInput id="signup-confirm" name="password-confirmation" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={confirm} onChange={(event) => setConfirm(event.target.value)} className="border-[#dccfba]! bg-[#fffdfa]!" /></Field>
        <div className="rounded-lg border border-line bg-surface-2/55 p-3 text-[11.5px]">
          <p aria-label={`${MIN_PASSWORD} or more characters: ${longEnough ? 'met' : 'not yet met'}`} className={longEnough ? 'flex items-center gap-1.5 font-semibold text-success' : 'flex items-center gap-1.5 font-semibold text-ink-2'}>
            <Icon icon={longEnough ? Check : Circle} size={12} />{MIN_PASSWORD} or more characters
          </p>
          <ul className="mt-2 grid gap-1.5 border-t border-line pt-2 sm:grid-cols-3">
            {['A lower-case letter', 'An upper-case letter', 'A number or symbol'].map((label, index) => <li key={label} className={advice[index] ? 'flex items-center gap-1.5 text-success' : 'flex items-center gap-1.5 text-ink-3'}><Icon icon={advice[index] ? Check : Circle} size={12} />{label}</li>)}
          </ul>
          <p className="mt-1.5 text-[11px] text-ink-3">Optional, and only advice — a password with all three is harder to guess.</p>
        </div>
        <Turnstile onToken={setTurnstileToken} />
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={UserPlus} loading={loading}>Create account</Button>
        <p className="text-center text-[13px] text-ink-2">Already registered? <Link className="font-semibold text-primary-strong hover:text-primary" to="/login">Sign in</Link></p>
      </form>
    </AuthLayout>
  )
}
