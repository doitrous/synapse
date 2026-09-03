import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, ShieldCheck, Upload } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { useIdentity } from '@/lib/useIdentity'
import { useAvatar } from '@/lib/useAvatar'
import { supabase } from '@/lib/supabase'
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
 * Google and Facebook also hand back a profile photo (`user_metadata.avatar_url`
 * / `.picture`, a URL on the provider's own CDN) that a password sign-up never
 * has. It is offered here as a preview with an editable choice — use it,
 * upload a different photo, or skip and keep the glyph — never imported
 * silently, per the same "nothing is assumed on the student's behalf" stance
 * the rest of this screen takes.
 */
export function CompleteProfile() {
  const identity = useIdentity()
  const avatar = useAvatar()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))

  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState(identity.profile.nationality ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [providerPhotoUrl, setProviderPhotoUrl] = useState<string | null>(null)
  const [photoChoice, setPhotoChoice] = useState<'provider' | 'upload' | 'skip'>('skip')
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [customPreview, setCustomPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // A fresh object URL per chosen file, revoked on the next choice or on
  // unmount — building it inline in JSX would mint (and leak) a new one on
  // every render instead.
  useEffect(() => {
    if (!customFile) { setCustomPreview(null); return undefined }
    const url = URL.createObjectURL(customFile)
    setCustomPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [customFile])

  useEffect(() => {
    let active = true
    supabase?.auth.getSession().then(({ data }) => {
      if (!active) return
      const metadata = data.session?.user.user_metadata as { avatar_url?: string; picture?: string } | undefined
      const photo = metadata?.avatar_url || metadata?.picture || null
      if (photo) {
        setProviderPhotoUrl(photo)
        setPhotoChoice('provider')
      }
    })
    return () => { active = false }
  }, [])

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
      // Best-effort: the account is enrolled either way, and a photo that fails
      // to save (a slow connection, a provider CDN hiccup) is not worth
      // blocking the whole sign-up over. The Account page can always try again.
      try {
        if (photoChoice === 'provider' && providerPhotoUrl) await avatar.importFromUrl(providerPhotoUrl)
        else if (photoChoice === 'upload' && customFile) await avatar.upload(customFile)
      } catch { /* see above */ }
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

        <div className="flex items-center gap-3.5 rounded-xl border border-line bg-surface-2/50 p-3.5">
          {photoChoice === 'upload' && customPreview
            ? <img src={customPreview} alt="" className="size-12 shrink-0 rounded-full border border-primary-line object-cover" />
            : <Avatar name={identity.displayName} size="lg" src={photoChoice === 'provider' ? (providerPhotoUrl ?? undefined) : undefined} />}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-ink">Profile photo</p>
            <p className="mt-0.5 text-[11.5px] text-ink-3">
              {providerPhotoUrl ? 'Use your Google/Facebook photo, upload a different one, or keep the default.' : 'Upload a photo, or keep the default.'}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {providerPhotoUrl && (
                <button type="button" onClick={() => setPhotoChoice('provider')} className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${photoChoice === 'provider' ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset'}`}>
                  Use this photo
                </button>
              )}
              <button type="button" onClick={() => fileInputRef.current?.click()} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${photoChoice === 'upload' ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset'}`}>
                <Icon icon={Upload} size={12} />Upload a photo
              </button>
              <button type="button" onClick={() => { setPhotoChoice('skip'); setCustomFile(null) }} className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${photoChoice === 'skip' ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset'}`}>
                No photo
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                if (file) { setCustomFile(file); setPhotoChoice('upload') }
              }}
            />
            {avatar.error && <p role="alert" className="mt-1.5 text-[11.5px] text-danger">{avatar.error}</p>}
          </div>
        </div>

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
