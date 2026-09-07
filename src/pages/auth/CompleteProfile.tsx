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
 * The fallback that catches a social account still missing its details.
 *
 * New Google/Facebook sign-ups now collect these inside onboarding, prefilled,
 * right after login (StudentOnboarding's "Your details" step). This screen is
 * where an account that already has a university and year but no phone lands —
 * a returning social account, or one that finished onboarding before that step
 * existed. It offers the same prefilled experience: the provider's name
 * (editable) and email (fixed), their photo pre-selected, and the phone the
 * account still owes. Those provider fields ride on a fresh `/api/me`
 * (`metadataName` / `avatarUrl`); an hour later they are null and the student
 * simply fills the phone.
 */
export function CompleteProfile() {
  const identity = useIdentity()
  const avatar = useAvatar()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))

  const [name, setName] = useState('')
  const namePrefilled = useRef(false)
  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState(identity.profile.nationality ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // null = not chosen yet, so a provider photo arriving just after mount still
  // becomes the default; an explicit click pins the choice.
  const [photoChoice, setPhotoChoice] = useState<'provider' | 'upload' | 'none' | null>(null)
  const effectivePhoto = photoChoice ?? (identity.avatarUrl ? 'provider' : 'none')
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [customPreview, setCustomPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // The provider's name lands with a fresh /api/me, sometimes a beat after
  // mount; seed the editable field once, then leave it to the student.
  useEffect(() => {
    if (namePrefilled.current) return
    const provided = identity.metadataName?.trim()
    if (provided) { setName(provided); namePrefilled.current = true }
  }, [identity.metadataName])

  // A fresh object URL per chosen file, revoked on the next choice or on
  // unmount — building it inline in JSX would mint (and leak) a new one on
  // every render instead.
  useEffect(() => {
    if (!customFile) { setCustomPreview(null); return undefined }
    const url = URL.createObjectURL(customFile)
    setCustomPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [customFile])

  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status !== 'authenticated') return <Navigate to="/login" replace />
  // Nothing to do without a university and year yet — that is the onboarding
  // overlay's job, not this screen's. Into the app, where it can open.
  if (identity.audienceUnknown) return <Navigate to="/app" replace />
  // Reachable directly (a bookmarked link, a second tab) after the gap is
  // already closed. Send them on rather than show a form with nothing left to
  // fill in.
  if (identity.profileComplete) return <Navigate to={next} replace />

  const photoPill = (active: boolean) =>
    `inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-medium ${active ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset'}`

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
        name: name.trim() || identity.metadataName?.trim() || undefined,
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
        if (effectivePhoto === 'upload' && customFile) await avatar.upload(customFile)
        else if (effectivePhoto === 'provider' && identity.avatarUrl) await avatar.importFromUrl(identity.avatarUrl)
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
          <p className="mt-1.5 text-[13px] text-ink-2">Your details from Google or Facebook, prefilled — add a phone number to finish.</p>
        </div>
        {error && (
          <div role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">
            <Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex items-center gap-3.5 rounded-xl border border-line bg-surface-2/50 p-3.5">
          {effectivePhoto === 'upload' && customPreview
            ? <img src={customPreview} alt="" className="size-12 shrink-0 rounded-full border border-primary-line object-cover" />
            : effectivePhoto === 'provider' && identity.avatarUrl
              ? <img src={identity.avatarUrl} alt="" referrerPolicy="no-referrer" className="size-12 shrink-0 rounded-full border border-primary-line object-cover" />
              : <Avatar name={identity.displayName} size="lg" />}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-ink">Profile photo</p>
            <p className="mt-0.5 text-[11.5px] text-ink-3">
              {identity.avatarUrl ? 'Your Google or Facebook photo, another you upload, or the default.' : 'Upload a photo, or keep the default.'}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {identity.avatarUrl && (
                <button type="button" onClick={() => { setPhotoChoice('provider'); setCustomFile(null) }} className={photoPill(effectivePhoto === 'provider')}>
                  Use my photo
                </button>
              )}
              <button type="button" onClick={() => fileInputRef.current?.click()} className={photoPill(effectivePhoto === 'upload')}>
                <Icon icon={Upload} size={12} />Upload a photo
              </button>
              <button type="button" onClick={() => { setPhotoChoice('none'); setCustomFile(null) }} className={photoPill(effectivePhoto === 'none')}>
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
          <Field label="Name" htmlFor="complete-profile-name" hint="From your Google or Facebook account — edit if it is not quite right.">
            <TextInput id="complete-profile-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" />
          </Field>
          <Field label="Email" htmlFor="complete-profile-email" hint="The account you signed in with">
            <TextInput id="complete-profile-email" name="email" type="email" value={identity.email ?? ''} readOnly aria-readonly="true" className="bg-surface-2 text-ink-2" />
          </Field>
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
