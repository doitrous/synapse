import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, Download, KeyRound, LifeBuoy, LockKeyhole, LogOut, Palette, ShieldCheck, Trash2, Upload, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
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
import { API_MODE, apiGet, apiPost, apiPut } from '@/lib/api'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { ProfileIconGlyph } from '@/components/ui/ProfileIconGlyph'
import { DEFAULT_PROFILE_ICON, PROFILE_ICONS, normaliseUsername, usernameProblem } from '@/data/profileIcons'
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
}

const DEFAULTS: AccountPrefs = {
  reviewReminders: true,
  calendarReminders: true,
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
        <div className="flex items-end">
          <Button type="submit" variant="primary" loading={saving} disabled={!dirty || saving} iconLeft={justSaved && !dirty ? Check : undefined}>
            {justSaved && !dirty ? t('Saved') : t('Save group')}
          </Button>
        </div>
        {error && <p role="alert" className="text-[12.5px] text-danger sm:col-span-2">{error}</p>}
      </form>

      <div className="sm:col-span-2 rounded-xl border border-line bg-surface-2/50 p-4">
        <p className="text-[13px] font-semibold text-ink">{t('Request a university or year change')}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
          {t('University and year changes need administrator approval and notes. If your university changes, the admin also rechecks that your username is still unique there.')}
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

  return (
    <div className="flex items-center gap-3.5 p-5">
      <Avatar name={identity.displayName} size="lg" src={avatar.src} />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-ink">{t('Profile photo')}</p>
        <p className="mt-0.5 text-[11.5px] text-ink-3">{t('PNG, JPEG, GIF or WebP, up to 2 MB.')}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button type="button" variant="secondary" size="sm" iconLeft={Upload} loading={avatar.busy} onClick={() => fileInputRef.current?.click()}>
            {avatar.hasPhoto ? t('Change photo') : t('Upload photo')}
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
        <Field label={t('Username')} htmlFor="account-username" hint={t('Unique inside your university, compared case-insensitively by the server.')}>
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
  const { email, profile, reload } = useIdentity()
  const [tab, setTab] = useAccountTab(initialTab)
  const [prefs, setPrefs] = usePersistentState<AccountPrefs>(ACCOUNT_PREFS_STORAGE_KEY, DEFAULTS)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  // New and existing students are private until they explicitly opt in.
  const [discoverable, setDiscoverableState] = useState(false)

  const patch = (next: Partial<AccountPrefs>) => setPrefs((current) => ({ ...current, ...next }))
  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Maristana profile change request')}`

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
      <PageHeader title={t('Account')} description={t('Your profile, study preferences, billing, security, and data.')} back={{ fallback: '/app' }} />
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
              {/* The two email toggles that used to sit here — weekly digest and
                  product updates — were read by nothing at all. They return when
                  email delivery actually consults a preference. */}
              <p className="border-t border-line px-5 py-3 text-[11.5px] leading-relaxed text-ink-3">
                {t('Email preferences are not configurable yet. Maristana only emails you about your account.')}
              </p>
            </Panel>

            <div className="space-y-4">
              <Panel>
                <PanelHeader title={t('Appearance')} icon={Palette} />
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink">{t('Theme')}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Light, warm, or dark. Kept on this device.')}</p>
                  </div>
                  <ThemeSwitch />
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
                  <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Reset through a time-limited email link.')}</p>
                  <Link to="/auth/forgot-password" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[13px] font-semibold text-ink hover:bg-inset"><KeyRound size={15} />{t('Change password')}</Link>
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
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
