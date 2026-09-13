import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Check, Download, ImagePlus, KeyRound, Languages, LifeBuoy, LockKeyhole, LogOut, Palette, ShieldCheck, Target, TriangleAlert, Trash2, Upload, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Collapse } from '@/components/ui/Collapse'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { MfaControl } from '@/components/auth/MfaControl'
import { PasskeyControl } from '@/components/auth/PasskeyControl'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useAvatar } from '@/lib/useAvatar'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as seededUniversities, YEARS } from '@/data/universities'
import { API_MODE, apiGet, apiPost, apiPut, apiDelete } from '@/lib/api'
import { useT, useI18n, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { ProfileIconGlyph } from '@/components/ui/ProfileIconGlyph'
import { DEFAULT_PROFILE_ICON, PROFILE_ICONS, normaliseUsername, usernameProblem } from '@/data/profileIcons'
import { PRESET_AVATARS } from '@/data/presetAvatars'
import { AccountTabs } from '@/components/account/AccountTabs'
import { useAccountTab, type AccountTab } from '@/components/account/useAccountTab'
import { BillingPanels } from '@/components/account/BillingPanels'
import { useUsernameAvailability } from '@/lib/useUsernameAvailability'

/** The browser's own IANA zone name, or Cairo if the runtime cannot say. */
function detectTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo'
}

/**
 * Preferences the student owns.
 *
 * Name, email and timezone are not here: name and email are the sign-in
 * identity, and a form that appeared to change them would change nothing in
 * Supabase; timezone is detected, not chosen (see `detectTimezone` and the
 * sync effect in `Account`). University, year and group are here, and they
 * are real — they write to the same user-owned document onboarding writes,
 * which every scoping surface reads.
 */
interface AccountPrefs {
  reviewReminders: boolean
  calendarReminders: boolean
  /** Study preferences — kept on this device until a server field exists. */
  dailyGoalQuestions: number
  reminderTime: string
}

const DEFAULTS: AccountPrefs = {
  reviewReminders: true,
  calendarReminders: true,
  dailyGoalQuestions: 30,
  reminderTime: '19:00',
}

const ACCOUNT_PREFS_STORAGE_KEY = 'nishany.account.prefs.v1'

const SUPPORT_ADDRESS = 'help@nishany.com'

function ReadOnlyField({ label, value, hint }: { label: string; value: string | null; hint?: string }) {
  const t = useT()
  return (
    <Field label={label} hint={hint}>
      <p className="flex min-h-11 items-center rounded-lg border border-line bg-surface-2/60 px-3 text-[13.5px] text-ink">
        {value || <span className="text-ink-3">{t('Not recorded')}</span>}
      </p>
    </Field>
  )
}

/**
 * What the university has on record, when it disagrees with the student.
 *
 * Shown rather than enforced. The student's own answer is what the app uses —
 * see `useIdentity` — and saying so beside the field is the difference between
 * an override and a value that silently went missing.
 */
function RosterNote({ recorded }: { recorded: string }) {
  const t = useT()
  return (
    <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">
      {t('Your university has you recorded as')} <span className="font-medium text-ink-2">{recorded}</span>.
    </p>
  )
}

/**
 * Where the student studies, and editable by them.
 *
 * These three fields decide which timetable, which curriculum mapping and which
 * scoped content applies, and this page previously showed all three as
 * uneditable text — usually reading "Not recorded", because it read the roster
 * row that most accounts do not have, while the sidebar two inches away read
 * the merged value and said "KAU · Year 1". One source now, the one the rest of
 * the app reads.
 */
function StudyContext() {
  const [changeOpen, setChangeOpen] = useState(false)
  const t = useT()
  const { audience, profile, displayName, email, saveEnrolment } = useIdentity()
  const [configured] = useUniversityCatalogue()

  const [group, setGroup] = useState(audience.group)
  const [targetUniversityId, setTargetUniversityId] = useState(audience.universityId)
  const [targetYear, setTargetYear] = useState(audience.year)
  const [reason, setReason] = useState('')
  const [justSaved, setJustSaved] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [error, setError] = useState('')
  const [requestError, setRequestError] = useState('')

  const universities = configured.length ? configured : seededUniversities
  const currentUniversity = universities.find((item) => item.id === audience.universityId)
  const rosterUniversity = universities.find((item) => item.id === profile.universityId)
  const selectedTargetUniversity = universities.find((item) => item.id === targetUniversityId)
  const targetYears = selectedTargetUniversity
    ? [...new Set([...selectedTargetUniversity.years.map((entry) => entry.year), ...YEARS])]
    : [...new Set([...YEARS, audience.year, profile.year].filter((value): value is string => Boolean(value)))]
  const dirty = group !== audience.group
  const requestDirty = targetUniversityId !== audience.universityId || targetYear !== audience.year
  const canRequest = requestDirty && reason.trim().length >= 12

  async function saveGroup(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setSaving(true)
    try {
      await saveEnrolment({ universityId: audience.universityId, year: audience.year, group: group.trim() })
      setJustSaved(true)
    } catch {
      setError(t('That could not be saved. Check your connection and try again.'))
    } finally {
      setSaving(false)
    }
  }

  async function requestChange() {
    setRequestError('')
    setRequesting(true)
    try {
      if (API_MODE) {
        // The server models one field per request (university OR year), so a
        // student changing both files both — each lands as its own row the admin
        // can approve or reject independently. Endpoint spelling matters: it is
        // `/enrollment-change-requests`, not the `/enrolment` the locked-profile
        // save uses; an earlier mismatch here 404'd every request.
        const changes: Array<{ field: 'university' | 'year'; requestedValue: string }> = []
        if (targetUniversityId && targetUniversityId !== audience.universityId) {
          changes.push({ field: 'university', requestedValue: targetUniversityId })
        }
        if (targetYear && targetYear !== audience.year) {
          changes.push({ field: 'year', requestedValue: targetYear })
        }
        if (!changes.length) { setRequesting(false); return }
        // Optimistic: the request reads as sent immediately, and reverts below
        // only if every field-change actually failed — a partial failure still
        // means the request went in, just not all of it.
        setRequestSent(true)
        const results = await Promise.allSettled(
          changes.map((change) => apiPost('/me/enrollment-change-requests', { ...change, reason: reason.trim() })),
        )
        const failures = results.filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        if (failures.length === changes.length) {
          const reason = failures[0].reason
          throw reason instanceof Error ? reason : new Error(String(reason))
        }
        if (failures.length) {
          const message = failures[0].reason instanceof Error ? failures[0].reason.message : ''
          setRequestError(message || t('One of your requests could not be sent, but the other was received.'))
        }
      } else {
        setRequestSent(true)
      }
      setReason('')
    } catch (submitError) {
      setRequestSent(false)
      const message = submitError instanceof Error ? submitError.message : ''
      setRequestError(message || t('Your request could not be sent. Try again, or contact support if it keeps happening.'))
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="grid gap-4 border-t border-line p-5 sm:grid-cols-2">
      <ReadOnlyField label={t('Full name')} value={profile.name ?? displayName} />
      <ReadOnlyField label={t('Email address')} value={profile.email ?? email} />
      <div>
        <ReadOnlyField label={t('University')} value={currentUniversity ? `${currentUniversity.short} — ${currentUniversity.name}` : audience.universityId} hint={t('Locked after onboarding')} />
        {rosterUniversity && rosterUniversity.id !== audience.universityId && <RosterNote recorded={rosterUniversity.name} />}
      </div>
      <div>
        <ReadOnlyField label={t('Year of study')} value={audience.year} hint={t('Locked after onboarding')} />
        {profile.year && profile.year !== audience.year && <RosterNote recorded={profile.year} />}
      </div>

      <form className="grid gap-4 sm:col-span-2 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(event) => void saveGroup(event)}>
        <Field label={t('Group')} htmlFor="account-group" hint={t('Used for targeted vouchers and notices')}>
          <TextInput
            id="account-group"
            value={group}
            maxLength={40}
            placeholder={t('e.g. Group 4')}
            onChange={(event) => { setGroup(event.target.value); setJustSaved(false) }}
          />
        </Field>
        <div className="flex flex-col items-start justify-end gap-1.5 sm:items-end">
          <Button type="submit" variant="primary" loading={saving} disabled={!dirty || saving} iconLeft={justSaved && !dirty ? Check : undefined}>
            {justSaved && !dirty ? t('Saved') : t('Save group')}
          </Button>
          {/* A small text link, not a second button competing with Save: the
              change flow is a rare, admin-approved errand that belongs quietly
              under the primary action. */}
          <button
            type="button"
            aria-expanded={changeOpen}
            aria-controls="account-university-change"
            onClick={() => setChangeOpen((open) => !open)}
            className="text-[12px] font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary-strong hover:decoration-primary"
          >
            {t('Request a university or year change')}
          </button>
        </div>
        {error && <p role="alert" className="text-[12.5px] text-danger sm:col-span-2">{error}</p>}
      </form>

      <div className="sm:col-span-2">
        <Collapse id="account-university-change" open={changeOpen}>
          <div className="mt-3 rounded-xl border border-line bg-surface-2/50 p-4">
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
              {t('University and year changes need administrator approval and notes.')}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label={t('Target university')} htmlFor="account-target-university">
                <Select id="account-target-university" value={targetUniversityId} onChange={(event) => { setTargetUniversityId(event.target.value); setRequestSent(false) }}>
                  <option value="">{t('Choose your university')}</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.id}>{university.short} — {university.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label={t('Target year')} htmlFor="account-target-year">
                <Select id="account-target-year" value={targetYear} onChange={(event) => { setTargetYear(event.target.value); setRequestSent(false) }}>
                  <option value="">{t('Choose your year')}</option>
                  {targetYears.map((option) => <option key={option} value={option}>{t(option)}</option>)}
                </Select>
              </Field>
              <Field label={t('Reason')} htmlFor="account-change-reason" hint={t('Required for the admin audit trail')} className="sm:col-span-2">
                <TextInput id="account-change-reason" value={reason} onChange={(event) => { setReason(event.target.value); setRequestSent(false) }} placeholder={t('e.g. I transferred to another university this term.')} maxLength={160} />
              </Field>
            </div>
            {requestError && <p role="alert" className="mt-3 text-[12.5px] text-danger">{requestError}</p>}
            {requestSent && <p className="mt-3 rounded-lg border border-success/25 bg-success-tint px-3 py-2 text-[12.5px] text-success">{t('Request sent for admin review.')}</p>}
            <div className="mt-4 flex justify-end">
              <Button type="button" variant="secondary" loading={requesting} disabled={!canRequest || requesting} onClick={() => void requestChange()}>
                {t('Submit change request')}
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}

/**
 * The photo shown wherever the sidebar and top bar render this student —
 * upload one, replace it, or remove it back to the glyph. `useAvatar` is the
 * one place that talks to the server; this is just the control around it.
 */
function AvatarControl() {
  const t = useT()
  const identity = useIdentity()
  const avatar = useAvatar()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)

  async function handleFile(file: File | undefined) {
    if (!file) return
    try {
      await avatar.upload(file)
    } catch {
      // avatar.error already holds a message; nothing further to do here.
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // A preset is just a picture we ship. Fetch its bytes and send them through
  // the same upload path an uploaded photo takes, so the server, the preview
  // and the removal all behave identically — no second code path to keep right.
  async function pickPreset(src: string, label: string) {
    try {
      const response = await fetch(src)
      if (!response.ok) throw new Error('fetch failed')
      const blob = await response.blob()
      await avatar.upload(new File([blob], `${label}.png`, { type: blob.type || 'image/png' }))
      setGalleryOpen(false)
    } catch {
      // avatar.error already carries a message when the upload itself fails.
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-center gap-3.5">
        <Avatar name={identity.displayName} size="lg" src={avatar.src} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-ink">{t('Profile photo')}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Pick a ready-made avatar, or upload your own — PNG, JPEG, GIF or WebP, up to 2 MB.')}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" size="sm" iconLeft={ImagePlus} loading={avatar.busy} onClick={() => setGalleryOpen((open) => !open)} aria-expanded={galleryOpen}>
              {t('Choose an avatar')}
            </Button>
            <Button type="button" variant="ghost" size="sm" iconLeft={Upload} loading={avatar.busy} onClick={() => fileInputRef.current?.click()}>
              {avatar.hasPhoto ? t('Upload your own') : t('Upload photo')}
            </Button>
            {avatar.hasPhoto && (
              <Button type="button" variant="ghost" size="sm" iconLeft={Trash2} loading={avatar.busy} onClick={() => void avatar.remove()}>
                {t('Remove')}
              </Button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="hidden"
            onChange={(event) => void handleFile(event.target.files?.[0])}
          />
          {avatar.error && <p role="alert" className="mt-2 text-[11.5px] text-danger">{avatar.error}</p>}
        </div>
      </div>

      <Collapse id="account-avatar-gallery" open={galleryOpen}>
        <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-8" role="listbox" aria-label={t('Choose an avatar')}>
          {PRESET_AVATARS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              role="option"
              aria-selected={false}
              title={t(preset.label)}
              disabled={avatar.busy}
              onClick={() => void pickPreset(preset.src, preset.label)}
              className="aspect-square overflow-hidden rounded-full border border-line bg-surface-2 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            >
              <img src={preset.src} alt={t(preset.label)} loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      </Collapse>
    </div>
  )
}

/**
 * Username, icon and status message — the caller's own row in `students`,
 * read from and written straight through `useIdentity`, so this and the
 * sidebar can never show two different usernames the way the old
 * browser-local echo of this form once could.
 */
function ProfileIdentity() {
  const t = useT()
  const { profile, reload } = useIdentity()
  const [username, setUsername] = useState(profile.username ?? '')
  const [iconId, setIconId] = useState(profile.profileIcon || DEFAULT_PROFILE_ICON)
  const [statusMessage, setStatusMessage] = useState(profile.statusMessage ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const cleanUsername = normaliseUsername(username)
  const problem = usernameProblem(username)
  // Checks the server only once the username actually changed from what is
  // on record — the account's own current username never needs asking about.
  const availability = useUsernameAvailability(username, profile.username ?? '')
  const checking = availability === 'checking'
  const taken = availability === 'taken'
  const dirty = cleanUsername !== (profile.username ?? '')
    || iconId !== (profile.profileIcon || DEFAULT_PROFILE_ICON)
    || statusMessage.trim() !== (profile.statusMessage ?? '')

  async function save() {
    if (problem || checking || taken) return
    setError('')
    // Optimistic: Save reads as done immediately; a failure rolls the three
    // fields back to what the server still holds and says so inline.
    const previous = { username: profile.username ?? '', iconId: profile.profileIcon || DEFAULT_PROFILE_ICON, statusMessage: profile.statusMessage ?? '' }
    setSaving(true)
    setSaved(true)
    try {
      if (API_MODE) {
        await apiPut('/me/profile', { username: cleanUsername, profileIcon: iconId, statusMessage: statusMessage.trim(), timezone: detectTimezone() })
        reload()
      }
    } catch {
      setSaved(false)
      setUsername(previous.username)
      setIconId(previous.iconId)
      setStatusMessage(previous.statusMessage)
      setError(t('That profile could not be saved. The server may have refused the username or be temporarily unavailable.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="border-t border-line p-5">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Field label={t('Username')} htmlFor="account-username" hint={t('Unique across all universities, compared case-insensitively by the server.')}>
          <TextInput id="account-username" value={username} onChange={(event) => { setUsername(event.target.value); setSaved(false) }} maxLength={24} autoComplete="username" />
        </Field>
        <div className="flex items-end">
          <Button type="button" variant="secondary" loading={saving} disabled={!dirty || Boolean(problem) || checking || taken || saving} iconLeft={saved && !dirty ? Check : undefined} onClick={() => void save()}>
            {saved && !dirty ? t('Saved') : t('Save profile')}
          </Button>
        </div>
      </div>
      <p className="mt-2 text-[12px] text-ink-3">{t('Preview')}: <span className="font-mono font-semibold text-ink">@{cleanUsername || t('username')}</span></p>
      {problem && <p role="alert" className="mt-1 text-[12px] text-danger">{t(problem)}</p>}
      {!problem && checking && <p className="mt-1 text-[12px] text-ink-3">{t('Checking…')}</p>}
      {!problem && availability === 'available' && <p className="mt-1 text-[12px] text-success">{t('Available')}</p>}
      {!problem && taken && <p role="alert" className="mt-1 text-[12px] text-danger">{t('Already taken')}</p>}

      <div className="mt-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Profile icon')}</p>
        <ul className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PROFILE_ICONS.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => { setIconId(entry.id); setSaved(false) }}
                aria-pressed={iconId === entry.id}
                className={cn(
                  'flex w-full flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors',
                  iconId === entry.id ? 'border-primary bg-primary-tint/50 text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
                )}
              >
                <ProfileIconGlyph id={entry.id} className="size-7" />
                <span className="text-[10.5px] font-medium">{t(entry.label)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Field label={t('Status')} htmlFor="account-status" hint={t('Shown next to your name to friends and study-party members.')}>
          <TextInput
            id="account-status"
            value={statusMessage}
            onChange={(event) => { setStatusMessage(event.target.value.replace(/[\r\n]+/g, ' ')); setSaved(false) }}
            maxLength={120}
            placeholder={t('e.g. Cramming for finals')}
          />
        </Field>
      </div>

      {error && <p role="alert" className="mt-3 text-[12.5px] text-danger">{error}</p>}
    </div>
  )
}

interface EmailPref { key: string; label: string; description: string; subscribed: boolean }

/** Shown in demo, where there is no server to read a real suppression list from. */
const DEMO_EMAIL_PREFS: EmailPref[] = [
  { key: 'Question of the Day', label: 'Daily study reminders', description: 'A nudge to keep your streak and answer the day’s question.', subscribed: true },
  { key: 'announcement', label: 'News and announcements', description: 'New features, and the occasional important update.', subscribed: true },
]

/**
 * Which emails a student wants. Reads and writes `/me/email-preferences`, which
 * is backed by the same suppression list the mailer already checks before it
 * sends — so turning one off here actually stops that mail. Account and billing
 * email (receipts, password resets) is never listed: it is not a choice.
 */
function EmailPreferences() {
  const t = useT()
  const [prefs, setPrefs] = useState<EmailPref[] | null>(API_MODE ? null : DEMO_EMAIL_PREFS)

  useEffect(() => {
    if (!API_MODE) return
    let alive = true
    apiGet<{ categories: EmailPref[] }>('/me/email-preferences')
      .then((r) => { if (alive) setPrefs(r.categories) })
      .catch(() => { if (alive) setPrefs([]) })
    return () => { alive = false }
  }, [])

  const toggle = async (key: string, subscribed: boolean) => {
    if (!API_MODE) { setPrefs((p) => (p ?? []).map((x) => (x.key === key ? { ...x, subscribed } : x))); return }
    // Optimistic: flip now, reconcile with the server's authoritative list.
    setPrefs((p) => (p ?? []).map((x) => (x.key === key ? { ...x, subscribed } : x)))
    try {
      const r = await apiPut<{ categories: EmailPref[] }>('/me/email-preferences', { category: key, subscribed })
      setPrefs(r.categories)
    } catch {
      setPrefs((p) => (p ?? []).map((x) => (x.key === key ? { ...x, subscribed: !subscribed } : x)))
    }
  }

  return (
    <div className="border-t border-line px-5 py-1">
      <p className="pt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Email')}</p>
      {prefs === null ? (
        <p className="py-3.5 text-[12px] text-ink-3">{t('Loading…')}</p>
      ) : prefs.length === 0 ? (
        <p className="py-3.5 text-[12px] text-ink-3">{t('Nishany only emails you about your account.')}</p>
      ) : (
        <div className="divide-y divide-line">
          {prefs.map((p) => (
            <label key={p.key} className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
              <span>
                <span className="block text-[13.5px] font-medium text-ink">{t(p.label)}</span>
                <span className="mt-0.5 block text-[12px] text-ink-3">{t(p.description)}</span>
              </span>
              <Toggle checked={p.subscribed} onChange={(value) => void toggle(p.key, value)} label={t(p.label)} />
            </label>
          ))}
        </div>
      )}
      <p className="pb-3 pt-1 text-[11.5px] leading-relaxed text-ink-3">
        {t('Account and billing email — receipts, password resets — is always sent and cannot be turned off.')}
      </p>
    </div>
  )
}

/**
 * Everything a student manages about their own account, on four tabs.
 *
 * Profile, Preferences, Billing and Security were three separate destinations
 * and a sidebar of loose panels; they are one page now because a student
 * looking for "my account" should not have to know which of them holds the
 * thing they want. The tab lives in `?tab=`, so `/app/billing` can redirect
 * straight onto the Billing tab and a link to a tab still opens on it.
 */
export function Account({ initialTab = 'profile' }: { initialTab?: AccountTab } = {}) {
  const t = useT()
  const { lang, setLang } = useI18n()
  const navigate = useNavigate()
  const { email, profile, reload } = useIdentity()
  const [tab, setTab] = useAccountTab(initialTab)
  const [prefs, setPrefs] = usePersistentState<AccountPrefs>(ACCOUNT_PREFS_STORAGE_KEY, DEFAULTS)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  // New and existing students are private until they explicitly opt in.
  const [discoverable, setDiscoverableState] = useState(false)

  // In-place password change (server rotates this session, evicts the others).
  const [pwNew, setPwNew] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [pwBusy, setPwBusy] = useState(false)
  const [pwNotice, setPwNotice] = useState<{ text: string; ok: boolean } | null>(null)

  // Account deletion, gated behind two barriers before the irreversible call.
  const [deleteAck, setDeleteAck] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteBusy, setDeleteBusy] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const patch = (next: Partial<AccountPrefs>) => setPrefs((current) => ({ ...current, ...next }))
  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Nishany profile change request')}`

  async function changePassword() {
    setPwNotice(null)
    if (pwNew.length < 8) { setPwNotice({ text: t('Use at least 8 characters.'), ok: false }); return }
    if (pwNew !== pwConfirm) { setPwNotice({ text: t('The two passwords do not match.'), ok: false }); return }
    if (!API_MODE) { setPwNotice({ text: t('Connect a backend to change your password.'), ok: false }); return }
    setPwBusy(true)
    try {
      await apiPut('/auth/password', { password: pwNew })
      setPwNew(''); setPwConfirm('')
      setPwNotice({ text: t('Password changed. Other devices have been signed out.'), ok: true })
    } catch {
      setPwNotice({ text: t('Could not change your password. Try again in a moment.'), ok: false })
    } finally {
      setPwBusy(false)
    }
  }

  async function deleteAccount() {
    setDeleteError('')
    if (!API_MODE) { setDeleteError(t('Connect a backend to delete your account.')); return }
    setDeleteBusy(true)
    try {
      await apiDelete('/account')
      navigate('/logout')
    } catch {
      setDeleteError(t('Could not delete your account. Try again or email support.'))
      setDeleteBusy(false)
    }
  }

  useEffect(() => {
    if (!API_MODE) return
    apiGet<{ discoverable: boolean }>('/account/discoverable')
      .then((result) => setDiscoverableState(result.discoverable))
      .catch(() => {})
  }, [])

  /**
   * There is no timezone picker any more — the browser already knows, and a
   * manual choice just goes stale after a trip or a clock change. This syncs
   * it once: silently, and only when the server's answer actually disagrees
   * with what `Intl` reports right now, which is also what stops it from
   * firing more than once a session — the second render after a successful
   * sync already sees them agree.
   */
  useEffect(() => {
    if (!API_MODE || !profile.studentId) return
    const detected = detectTimezone()
    if (!detected || detected === profile.timezone) return
    apiPut('/me/profile', { timezone: detected }).then(reload).catch(() => {})
  }, [profile.studentId, profile.timezone, reload])

  /**
   * Flip the toggle immediately and tell the server. Without a backend this is
   * the whole story — there is no directory to disappear from — so nothing is
   * sent. If the write fails, the toggle reverts rather than showing a choice
   * that was never actually saved.
   */
  async function toggleDiscoverable(next: boolean) {
    setDiscoverableState(next)
    if (!API_MODE) return
    try {
      await apiPost('/account/discoverable', { discoverable: next })
    } catch {
      setDiscoverableState(!next)
    }
  }

  /**
   * Everything this account has stored, not just what this page happens to hold.
   *
   * The old export wrote out the settings object while the copy beside it
   * promised "notes, highlights, plans, and progress" — none of which were in
   * it. This asks the server for every document the account owns.
   */
  async function exportData() {
    setExportError('')
    if (!API_MODE) {
      download('nishany-account-preferences.json', { preferences: prefs })
      return
    }
    setExporting(true)
    try {
      download('nishany-account-data.json', await apiGet<unknown>('/me/export'))
    } catch {
      setExportError(t('Your data could not be exported right now. Try again in a moment.'))
    } finally {
      setExporting(false)
    }
  }

  function download(filename: string, payload: unknown) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageContainer>
      <PageHeader title={t('Account')} back={{ fallback: '/app' }} />
      <AccountTabs value={tab} onChange={setTab} />

      <div className="mt-4">
        {tab === 'profile' && (
          <Panel>
            <PanelHeader title={t('Profile and study context')} icon={UserRound} />
            {/* Editable, and reading the same merged value the sidebar reads.
                This panel used to read the roster row alone, so it said "Not
                recorded" four times over to a student whose sidebar was showing
                "KAU · Year 1" two inches away. */}
            <AvatarControl />
            <StudyContext />
            <ProfileIdentity />
          </Panel>
        )}

        {tab === 'preferences' && (
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <Panel>
              <PanelHeader title={t('Notifications')} icon={Bell} hint={t('In-app only')} />
              <div className="divide-y divide-line px-5">
                {([
                  ['Review reminders', 'Show notices when concepts are due for review.', 'reviewReminders'],
                  ['Calendar reminders', 'Show notices before your blocks and sessions.', 'calendarReminders'],
                ] as const).map(([title, description, key]) => (
                  <label key={key} className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
                    <span>
                      <span className="block text-[13.5px] font-medium text-ink">{t(title)}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">{t(description)}</span>
                    </span>
                    <Toggle checked={prefs[key]} onChange={(value) => patch({ [key]: value })} label={t(title)} />
                  </label>
                ))}
              </div>
              {/* Email toggles, backed by the suppression list the mailer checks
                  before sending — so turning one off actually stops that mail. */}
              <EmailPreferences />
            </Panel>

            <div className="space-y-4">
              <Panel>
                <PanelHeader title={t('Appearance')} icon={Palette} />
                <div className="divide-y divide-line px-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-ink">{t('Theme')}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Light, warm, or dark. Kept on this device.')}</p>
                    </div>
                    <ThemeSwitch />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[13px] font-medium text-ink"><Languages size={14} className="text-ink-3" />{t('Language')}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-3">{t('The interface language. Kept on this device.')}</p>
                    </div>
                    <Select aria-label={t('Language')} value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="w-40">
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </Select>
                  </div>
                </div>
              </Panel>

              <Panel>
                <PanelHeader title={t('Study preferences')} icon={Target} hint={t('On this device')} />
                <div className="divide-y divide-line px-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-ink">{t('Daily question goal')}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-3">{t('How many questions you aim to answer each day.')}</p>
                    </div>
                    <TextInput
                      type="number"
                      min={0}
                      step={5}
                      aria-label={t('Daily question goal')}
                      value={String(prefs.dailyGoalQuestions ?? DEFAULTS.dailyGoalQuestions)}
                      onChange={(e) => patch({ dailyGoalQuestions: Math.max(0, Number(e.target.value) || 0) })}
                      className="w-24"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-ink">{t('Reminder time')}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-3">{t('When to nudge you about due reviews.')}</p>
                    </div>
                    <TextInput
                      type="time"
                      aria-label={t('Reminder time')}
                      value={prefs.reminderTime ?? DEFAULTS.reminderTime}
                      onChange={(e) => patch({ reminderTime: e.target.value })}
                      className="w-32"
                    />
                  </div>
                </div>
              </Panel>

              <Panel>
                <PanelHeader title={t('Privacy and data')} icon={LockKeyhole} />
                <div className="divide-y divide-line px-5">
                  <label className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
                    <span>
                      <span className="block text-[13.5px] font-medium text-ink">{t('Let classmates find me')}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">
                        {t('Off by default. Turn this on only if you want to appear in and browse the same-university-and-year classmate directory. Turning it off does not remove friends you already have.')}
                      </span>
                    </span>
                    <Toggle checked={discoverable} onChange={(value) => void toggleDiscoverable(value)} label={t('Let classmates find me')} />
                  </label>
                </div>
              </Panel>
            </div>
          </div>
        )}

        {tab === 'billing' && <BillingPanels />}

        {tab === 'security' && (
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <Panel>
              <PanelHeader title={t('Security')} icon={ShieldCheck} />
              <div className="space-y-3 p-4">
                <div className="rounded-lg border border-line bg-surface-2 p-3">
                  <p className="text-[13px] font-medium text-ink">{t('Password')}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Set a new password here — no email link needed. Signs you out of other devices.')}</p>
                  <div className="mt-3 space-y-2">
                    <Field label={t('New password')} htmlFor="account-new-password">
                      <TextInput id="account-new-password" type="password" autoComplete="new-password" value={pwNew} onChange={(e) => setPwNew(e.target.value)} placeholder={t('At least 8 characters')} />
                    </Field>
                    <Field label={t('Confirm new password')} htmlFor="account-confirm-password">
                      <TextInput id="account-confirm-password" type="password" autoComplete="new-password" value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} />
                    </Field>
                    {pwNotice && <p role="alert" className={cn('text-[11.5px]', pwNotice.ok ? 'text-success' : 'text-danger')}>{pwNotice.text}</p>}
                    <div className="flex items-center gap-3">
                      <Button variant="secondary" iconLeft={KeyRound} loading={pwBusy} disabled={!pwNew || !pwConfirm} onClick={() => void changePassword()}>{t('Change password')}</Button>
                      <Link to="/auth/forgot-password" className="text-[12px] font-semibold text-ink-3 hover:text-ink">{t('Forgot it? Reset by email')}</Link>
                    </div>
                  </div>
                </div>
                <PasskeyControl />
                <MfaControl />
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel>
                <PanelHeader title={t('This session')} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-medium text-ink">{t('This browser')}</p>
                      <p className="mt-0.5 text-[11.5px] text-ink-3">
                        {email ?? t('Signed in')}
                      </p>
                    </div>
                    <Badge tone="success">{t('Open')}</Badge>
                  </div>
                  {/* Only this session is described. Enumerating and revoking other
                      sessions needs a server-side session list that does not exist. */}
                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">
                    {t('Signing out here ends your session on every device where you are signed in.')}
                  </p>
                  <Link to="/logout" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[12.5px] font-semibold text-ink-2 hover:bg-inset hover:text-ink"><LogOut size={15} />{t('Sign out')}</Link>
                </div>
              </Panel>

              <Panel>
                <PanelHeader title={t('Your data')} icon={Download} />
                <div className="space-y-2 p-4">
                  <Button className="w-full justify-start" variant="secondary" iconLeft={Download} loading={exporting} onClick={() => void exportData()}>
                    {t('Download my data')}
                  </Button>
                  {exportError && <p role="alert" className="text-[11.5px] text-danger">{exportError}</p>}
                  <p className="text-[11.5px] leading-relaxed text-ink-3">
                    {API_MODE
                      ? t('Includes every document your account owns — notes, whiteboards, bookmarks, calendar blocks and progress.')
                      : t('Without a backend connected this exports your preferences only; the rest of your work is in this browser.')}
                  </p>
                </div>
              </Panel>

              <Panel>
                <PanelHeader title={t('Support')} icon={LifeBuoy} />
                <div className="p-4">
                  <ButtonAnchor href={supportLink} className="w-full justify-start" variant="ghost" iconLeft={LifeBuoy}>{t('Email the Nishany team')}</ButtonAnchor>
                </div>
              </Panel>

              {/* Two barriers guard the irreversible call: an explicit
                  acknowledgement, then a type-to-confirm. The server delete is
                  a real hard delete scoped to the caller's own token. */}
              <Panel className="border-danger/40">
                <PanelHeader title={t('Delete account')} icon={TriangleAlert} />
                <div className="space-y-3 p-4">
                  <p className="text-[12px] leading-relaxed text-ink-2">
                    {t('This permanently deletes your account and everything it owns — progress, notes, whiteboards, bookmarks and calendar. It cannot be undone.')}
                  </p>
                  <label className="flex items-start gap-2.5 text-[12.5px] text-ink-2">
                    <input type="checkbox" checked={deleteAck} onChange={(e) => setDeleteAck(e.target.checked)} className="mt-0.5 size-4 accent-[var(--danger)]" />
                    <span>{t('I understand this is permanent and cannot be undone.')}</span>
                  </label>
                  {deleteAck && (
                    <Field label={t('Type DELETE to confirm')} htmlFor="account-delete-confirm">
                      <TextInput id="account-delete-confirm" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="DELETE" autoComplete="off" />
                    </Field>
                  )}
                  {deleteError && <p role="alert" className="text-[11.5px] text-danger">{deleteError}</p>}
                  <Button
                    variant="danger"
                    iconLeft={Trash2}
                    loading={deleteBusy}
                    disabled={!deleteAck || deleteConfirm.trim().toUpperCase() !== 'DELETE'}
                    onClick={() => void deleteAccount()}
                    className="w-full justify-center"
                  >
                    {t('Permanently delete my account')}
                  </Button>
                </div>
              </Panel>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
