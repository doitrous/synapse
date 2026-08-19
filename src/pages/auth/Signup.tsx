import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, BookOpenText, CalendarDays, ChartNoAxesColumnIncreasing, Check, Circle, Eye, EyeOff, UserPlus } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { authErrorMessage } from './authMessages'
import { rememberPendingEmail } from './pendingEmail'
import { CONFLICT_MESSAGE, MIN_PASSWORD, normalisePhone, signInPathFor } from '@/data/accountIdentity'
import { identityConflict } from '@/lib/accountExists'

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
    if (!supabase) {
      setLoading(false)
      return setError('Account creation is prepared but Supabase is not connected yet. Temporary dashboard preview remains available.')
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { full_name: cleanName, phone: cleanPhone, nationality: nationality.trim() },
        emailRedirectTo: `${window.location.origin}/auth/verify-email`,
      },
    })
    setLoading(false)
    if (signUpError) return setError(authErrorMessage(signUpError, 'Account creation could not be completed. Review the form and try again.'))

    // Supabase answers a sign-up for an address that already exists with a
    // success and an obfuscated user carrying no identities, so that the form
    // cannot be used to enumerate who has an account. From this side of it that
    // is indistinguishable from a new registration, and the student is left
    // waiting for an email that describes a password they did not set. Sending
    // them to sign in is the only honest reading.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return navigate(signInPathFor({ field: 'email', value: cleanEmail }), { state: { notice: CONFLICT_MESSAGE.email } })
    }

    // The confirmation link opens a fresh page with no `?email=` on it, so the
    // address is stored as well as passed — otherwise resending is impossible
    // from the one page that needs to offer it.
    rememberPendingEmail(cleanEmail)
    // A session already in hand means this project does not require email
    // confirmation, so there is no email to wait for. Saying "check your inbox"
    // anyway is the cue that never arrives — the complaint that started this.
    // `sent=0` tells the next page which of the two happened.
    navigate(`/auth/verify-email?email=${encodeURIComponent(cleanEmail)}${data.session ? '&sent=0' : ''}`)
  }

  const aside = (
    <div>
      <h2 className="text-[25px] text-ink">What belongs to you</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-2">Your private learning record is stored under your verified account ID—not under an email typed into a form.</p>
      <ul className="mt-6 divide-y divide-line">
        {ownership.map((item) => <li key={item.title} className="flex gap-3 py-4 first:pt-0"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-inset text-primary-strong"><Icon icon={item.icon} size={17} /></span><span><span className="block text-[13.5px] font-semibold text-ink">{item.title}</span><span className="mt-0.5 block text-[12px] leading-relaxed text-ink-2">{item.detail}</span><span className="mt-1.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-success"><Icon icon={Check} size={12} /> Private to your account</span></span></li>)}
      </ul>
    </div>
  )

  return (
    <AuthLayout step="account" title="Create your Connect Cortex account" description="One account for your study record. Verify your email, then choose your university, year and plan. A second factor is optional and can be added later." aside={aside}>
      <form className="space-y-4" onSubmit={submit}>
        {!isSupabaseConfigured && <div className="rounded-lg border border-warning/30 bg-warning-tint px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">Account service awaiting Supabase project keys. The form is ready and dashboard preview stays open.</div>}
        {error && <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</div>}
        <Field label="Full name" htmlFor="signup-name"><TextInput id="signup-name" autoComplete="name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} /></Field>
        <Field label="University email" htmlFor="signup-email"><TextInput id="signup-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" htmlFor="signup-phone" hint="One account per number">
            <TextInput id="signup-phone" type="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0100 123 4567" />
          </Field>
          <Field label="Nationality" htmlFor="signup-nationality" hint="Optional">
            <TextInput id="signup-nationality" autoComplete="country-name" value={nationality} onChange={(event) => setNationality(event.target.value)} placeholder="Egyptian" />
          </Field>
        </div>
        <Field label="Password" htmlFor="signup-password" hint={`${MIN_PASSWORD} characters or more`}>
          <div className="relative"><TextInput id="signup-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={MIN_PASSWORD} value={password} onChange={(event) => setPassword(event.target.value)} className="pe-12" /><button type="button" className="absolute end-1 top-1 grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset hover:text-ink" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}><Icon icon={showPassword ? EyeOff : Eye} size={16} /></button></div>
        </Field>
        <Field label="Confirm password" htmlFor="signup-confirm"><TextInput id="signup-confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={confirm} onChange={(event) => setConfirm(event.target.value)} /></Field>
        <div className="rounded-lg border border-line bg-surface-2/55 p-3 text-[11.5px]">
          <p aria-label={`${MIN_PASSWORD} or more characters: ${longEnough ? 'met' : 'not yet met'}`} className={longEnough ? 'flex items-center gap-1.5 font-semibold text-success' : 'flex items-center gap-1.5 font-semibold text-ink-2'}>
            <Icon icon={longEnough ? Check : Circle} size={12} />{MIN_PASSWORD} or more characters
          </p>
          <ul className="mt-2 grid gap-1.5 border-t border-line pt-2 sm:grid-cols-3">
            {['A lower-case letter', 'An upper-case letter', 'A number or symbol'].map((label, index) => <li key={label} className={advice[index] ? 'flex items-center gap-1.5 text-success' : 'flex items-center gap-1.5 text-ink-3'}><Icon icon={advice[index] ? Check : Circle} size={12} />{label}</li>)}
          </ul>
          <p className="mt-1.5 text-[11px] text-ink-3">Optional, and only advice — a password with all three is harder to guess.</p>
        </div>
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={UserPlus} loading={loading}>Create account</Button>
        <p className="text-center text-[13px] text-ink-2">Already registered? <Link className="font-semibold text-primary-strong hover:text-primary" to="/login">Sign in</Link></p>
      </form>
    </AuthLayout>
  )
}
