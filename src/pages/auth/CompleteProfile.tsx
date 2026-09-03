import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ShieldCheck } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { useIdentity } from '@/lib/useIdentity'
import { normalisePhone } from '@/data/accountIdentity'
import { portalHome } from '@/lib/portalHost'

/**
 * Only a path inside this app is an acceptable landing spot — see the same
 * check on Login.tsx. Duplicated rather than shared: the two forms already
 * disagree slightly (Login also accepts a bare `next=`), and this is three
 * lines either way.
 */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return portalHome()
  return value
}

/**
 * The screen a social sign-up never got.
 *
 * Password sign-up collects phone and nationality on the form itself
 * (Signup.tsx). Google and Facebook OAuth hand `signInWithOAuth` a name and an
 * email and nothing else, so those two `students` columns come back null and
 * nothing ever asked again — RequireAuth sends a student here once that gap
 * is the only thing left.
 *
 * University, year, plan and username are deliberately not repeated here:
 * they are the onboarding overlay's job (AppShell → StudentOnboarding), which
 * already runs for a social sign-up exactly as it does for a password one.
 * RequireAuth waits for that overlay to close (`!audienceUnknown`) before
 * ever sending someone here, so by the time this page renders that part of
 * the account is already settled — asking again would be a second, competing
 * enrolment screen. Name is not repeated either: onboarding already carried
 * the OAuth name across on its first save, and `saveOwnEnrolment` treats a
 * name as fixed the moment it stops looking like a placeholder, so an
 * editable field here would silently do nothing for the accounts that reach
 * this screen.
 *
 * ponytail: no profile-photo import from `avatar_url`/`picture`. The app's
 * profile picture is one of a fixed glyph set (`data/profileIcons.ts`), not an
 * uploaded image — there is no avatar-storage path to receive one — and that
 * glyph is already chosen in the same onboarding overlay. Add real avatar
 * import if Omar wants uploaded photos generally, not as a one-off here.
 */
export function CompleteProfile() {
  const identity = useIdentity()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))

  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState(identity.profile.nationality ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status !== 'authenticated') return <Navigate to="/login" replace />
  // Nothing to do without a university and year yet — that is the onboarding
  // overlay's job, not this screen's. Into the app, where it can open.
  if (identity.audienceUnknown) return <Navigate to="/app" replace />
  // Reachable directly (a bookmarked link, a second tab) after the gap is
  // already closed. Send them on rather than show a form with nothing left to
  // fill in.
  if (identity.profileComplete) return <Navigate to={next} replace />

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    const cleanPhone = normalisePhone(phone)
    if (!cleanPhone) return setError('Enter your phone number, including the country code if you are outside Egypt.')
    setLoading(true)
    try {
      const { phoneConflict } = await identity.saveEnrolment({
        universityId: identity.audience.universityId,
        year: identity.audience.year,
        phone: cleanPhone,
        nationality: nationality.trim(),
      })
      if (phoneConflict) {
        setLoading(false)
        setError('That phone number is already registered to another account. Use a different number, or sign in with the account that already has it.')
        return
      }
      navigate(next, { replace: true })
    } catch {
      setLoading(false)
      setError('That could not be saved. Check your connection and try again.')
    }
  }

  return (
    <AuthLayout
      step="setup"
      title="Finish setting up your account"
      description="Google and Facebook only hand over your name and email. A couple more details, and your account is complete."
      compact
      showProgress={false}
    >
      <form className="mx-auto max-w-md space-y-5" onSubmit={submit}>
        <div>
          <h2 className="text-[24px] text-ink">Complete your profile</h2>
          <p className="mt-1.5 text-[13px] text-ink-2">Signed in as {identity.displayName} · {identity.email}.</p>
        </div>
        {error && (
          <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">
            <Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" htmlFor="complete-profile-phone" hint="One account per number">
            <TextInput id="complete-profile-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0100 123 4567…" />
          </Field>
          <Field label="Nationality" htmlFor="complete-profile-nationality" hint="Optional">
            <TextInput id="complete-profile-nationality" name="nationality" autoComplete="country-name" value={nationality} onChange={(event) => setNationality(event.target.value)} placeholder="Egyptian…" />
          </Field>
        </div>
        <Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={ShieldCheck} loading={loading}>Save and continue</Button>
      </form>
    </AuthLayout>
  )
}
