import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Download, KeyRound, LifeBuoy, LogOut, Palette, ShieldCheck, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { MfaControl } from '@/components/auth/MfaControl'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as seededUniversities, YEARS } from '@/data/universities'
import { API_MODE, apiGet, apiPost, apiPut } from '@/lib/api'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { ProfileIconGlyph } from '@/components/ui/ProfileIconGlyph'
import { DEFAULT_PROFILE_ICON, PROFILE_ICONS, normaliseUsername, usernameProblem } from '@/data/profileIcons'

/**
 * Preferences the student owns.
 *
 * Name and email are not here: they are the sign-in identity, and a form that
 * appeared to change them would change nothing in Supabase. University, year
 * and group are here, and they are real — they write to the same user-owned
 * document onboarding writes, which every scoping surface reads.
 */
interface AccountPrefs {
  timezone: string
  reviewReminders: boolean
  calendarReminders: boolean
}

const DEFAULTS: AccountPrefs = {
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Cairo',
  reviewReminders: true,
  calendarReminders: true,
}

const ACCOUNT_PREFS_STORAGE_KEY = 'synapse.account.prefs.v1'
const PROFILE_STORAGE_KEY = 'synapse.account.profile.v1'

const SUPPORT_ADDRESS = 'synapse@mail.doitrous.com'

interface StudentProfilePrefs {
  username: string
  iconId: string
}

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
      }
      setRequestSent(true)
      setReason('')
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : ''
      setRequestError(message || t('Your request could not be sent. Try again, or contact support if it keeps happening.'))
    } finally {
      setRequesting(false)
    }
  }

  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2">
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

function ProfileIdentity() {
  const t = useT()
  const [profile, setProfile] = usePersistentState<StudentProfilePrefs>(PROFILE_STORAGE_KEY, { username: '', iconId: DEFAULT_PROFILE_ICON })
  const [username, setUsername] = useState(profile.username)
  const [iconId, setIconId] = useState(profile.iconId || DEFAULT_PROFILE_ICON)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const cleanUsername = normaliseUsername(username)
  const problem = usernameProblem(username)
  const dirty = cleanUsername !== profile.username || iconId !== profile.iconId

  async function save() {
    if (problem) return
    setError('')
    setSaving(true)
    const payload = { username: cleanUsername, iconId }
    try {
      if (API_MODE) await apiPut('/me/profile', payload)
      setProfile(payload)
      setSaved(true)
    } catch {
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
          <Button type="button" variant="secondary" loading={saving} disabled={!dirty || Boolean(problem) || saving} iconLeft={saved && !dirty ? Check : undefined} onClick={() => void save()}>
            {saved && !dirty ? t('Saved') : t('Save profile')}
          </Button>
        </div>
      </div>
      <p className="mt-2 text-[12px] text-ink-3">{t('Preview')}: <span className="font-mono font-semibold text-ink">@{cleanUsername || t('username')}</span></p>
      {problem && <p role="alert" className="mt-1 text-[12px] text-danger">{t(problem)}</p>}

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
      {error && <p role="alert" className="mt-3 text-[12.5px] text-danger">{error}</p>}
    </div>
  )
}

export function Account() {
  const t = useT()
  const { email } = useIdentity()
  const [prefs, setPrefs] = usePersistentState<AccountPrefs>(ACCOUNT_PREFS_STORAGE_KEY, DEFAULTS)
  const timezone = prefs.timezone || DEFAULTS.timezone
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
      download('synapse-account-preferences.json', { preferences: prefs })
      return
    }
    setExporting(true)
    try {
      download('synapse-account-data.json', await apiGet<unknown>('/me/export'))
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
      <PageHeader title={t('Manage your account')} description={t('Your profile, study preferences, security, and data.')} back={{ fallback: '/app' }} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <div className="space-y-4">
          <Panel>
            <PanelHeader title={t('Profile and study context')} icon={UserRound} />
            {/* Editable, and reading the same merged value the sidebar reads.
                This panel used to read the roster row alone, so it said "Not
                recorded" four times over to a student whose sidebar was showing
                "KAU · Year 1" two inches away. */}
            <StudyContext />
            <ProfileIdentity />
            <div className="border-t border-line p-5">
              <Field label={t('Timezone')} hint={t('Used for calendar blocks and reminders')} className="max-w-sm">
                <Select aria-label={t('Timezone')} value={timezone} onChange={(event) => patch({ timezone: event.target.value })}>
                  {[timezone, 'Africa/Cairo', 'Europe/London', 'Asia/Dubai', 'America/New_York']
                    .filter((zone, index, all) => all.indexOf(zone) === index)
                    .map((zone) => <option key={zone || 'timezone-default'} value={zone}>{zone}</option>)}
                </Select>
              </Field>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Notifications')} hint={t('In-app only')} />
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
        </div>

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
            <PanelHeader title={t('Security')} icon={ShieldCheck} />
            <div className="space-y-3 p-4">
              <div className="rounded-lg border border-line bg-surface-2 p-3">
                <p className="text-[13px] font-medium text-ink">{t('Password')}</p>
                <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Reset through a time-limited email link.')}</p>
                <Link to="/auth/forgot-password" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[13px] font-semibold text-ink hover:bg-inset"><KeyRound size={15} />{t('Change password')}</Link>
              </div>
              <MfaControl />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Privacy and data')} />
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
            <div className="space-y-2 border-t border-line p-4">
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
                {t('Other devices are not listed. Signing out here clears this browser only.')}
              </p>
              <Link to="/logout" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[12.5px] font-semibold text-ink-2 hover:bg-inset hover:text-ink"><LogOut size={15} />{t('Sign out')}</Link>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Support')} icon={LifeBuoy} />
            <div className="p-4">
              <ButtonAnchor href={supportLink} className="w-full justify-start" variant="ghost" iconLeft={LifeBuoy}>{t('Email the Maristana team')}</ButtonAnchor>
            </div>
          </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
