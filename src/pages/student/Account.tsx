import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Download, KeyRound, LifeBuoy, LogOut, Palette, ShieldCheck, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { MfaControl } from '@/components/auth/MfaControl'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { usePersistentState } from '@/lib/usePersistentState'
import { SELF_AUDIENCE_STORAGE_KEY, useIdentity, type SelfDeclaredAudience } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { universities as seededUniversities, YEARS } from '@/data/universities'
import { API_MODE, apiGet, apiPost } from '@/lib/api'
import { useT } from '@/lib/i18n'

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

const SUPPORT_ADDRESS = 'synapse@mail.doitrous.com'

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
  const { audience, profile, displayName, email } = useIdentity()
  const [configured] = useUniversityCatalogue()
  const [, setSaved] = usePersistentState<SelfDeclaredAudience | null>(SELF_AUDIENCE_STORAGE_KEY, null)

  const [universityId, setUniversityId] = useState(audience.universityId)
  const [year, setYear] = useState(audience.year)
  const [group, setGroup] = useState(audience.group)
  const [justSaved, setJustSaved] = useState(false)

  // The admin-configured catalogue is the real list; the seeded schools stand
  // in when none has been set up yet, so this is never an empty dropdown.
  const universities = configured.length ? configured : seededUniversities
  const rosterUniversity = universities.find((item) => item.id === profile.universityId)

  // A year an admin typed that is not in the standard list still has to be
  // choosable, or saving would quietly move the student to a different one.
  const years = [...new Set([...YEARS, audience.year, profile.year].filter((value): value is string => Boolean(value)))]

  const dirty = universityId !== audience.universityId || year !== audience.year || group !== audience.group

  function save(event: React.FormEvent) {
    event.preventDefault()
    setSaved({ universityId, year, group: group.trim() })
    setJustSaved(true)
  }

  return (
    <form className="grid gap-4 p-5 sm:grid-cols-2" onSubmit={save}>
      <ReadOnlyField label={t('Full name')} value={profile.name ?? displayName} />
      <ReadOnlyField label={t('Email address')} value={profile.email ?? email} />

      <div>
        <Field label={t('University')} htmlFor="account-university">
          <Select
            id="account-university"
            value={universityId}
            onChange={(event) => { setUniversityId(event.target.value); setJustSaved(false) }}
          >
            <option value="">{t('Choose your university')}</option>
            {universities.map((university) => (
              <option key={university.id} value={university.id}>{university.short} — {university.name}</option>
            ))}
          </Select>
        </Field>
        {rosterUniversity && rosterUniversity.id !== universityId && <RosterNote recorded={rosterUniversity.name} />}
      </div>

      <div>
        <Field label={t('Year of study')} htmlFor="account-year">
          <Select
            id="account-year"
            value={year}
            onChange={(event) => { setYear(event.target.value); setJustSaved(false) }}
          >
            <option value="">{t('Choose your year')}</option>
            {years.map((option) => <option key={option} value={option}>{t(option)}</option>)}
          </Select>
        </Field>
        {profile.year && profile.year !== year && <RosterNote recorded={profile.year} />}
      </div>

      <div>
        <Field label={t('Group')} htmlFor="account-group" hint={t('Used for targeted vouchers and notices')}>
          <TextInput
            id="account-group"
            value={group}
            maxLength={40}
            placeholder={t('e.g. Group 4')}
            onChange={(event) => { setGroup(event.target.value); setJustSaved(false) }}
          />
        </Field>
        {profile.group && profile.group !== group && <RosterNote recorded={profile.group} />}
      </div>

      <div className="sm:col-span-2">
        <p className="rounded-lg border border-line bg-surface-2/50 px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
          {t('Your university and year decide which timetable you see and which content is scoped to you. Change them here whenever they are wrong or out of date — your answer is the one the app uses.')}
          {' '}
          {t('Your name and email come from your sign-in and are changed with your account.')}
        </p>
      </div>

      <div className="flex justify-end sm:col-span-2">
        <Button type="submit" variant="primary" disabled={!dirty} iconLeft={justSaved && !dirty ? Check : undefined}>
          {justSaved && !dirty ? t('Saved') : t('Save study context')}
        </Button>
      </div>
    </form>
  )
}

export function Account() {
  const t = useT()
  const { email } = useIdentity()
  const [prefs, setPrefs] = usePersistentState<AccountPrefs>(ACCOUNT_PREFS_STORAGE_KEY, DEFAULTS)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')
  // Matches the column default (`students.discoverable` is `1`), so a student
  // who has never touched this setting — or has no roster row yet — sees the
  // same "on" the server would report, without waiting on a round trip first.
  const [discoverable, setDiscoverableState] = useState(true)

  const patch = (next: Partial<AccountPrefs>) => setPrefs((current) => ({ ...current, ...next }))
  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Connect Cortex profile change request')}`

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
      <PageHeader title={t('Manage your account')} description={t('Your profile, study preferences, security, and data.')} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <div className="space-y-4">
          <Panel>
            <PanelHeader title={t('Profile and study context')} icon={UserRound} />
            {/* Editable, and reading the same merged value the sidebar reads.
                This panel used to read the roster row alone, so it said "Not
                recorded" four times over to a student whose sidebar was showing
                "KAU · Year 1" two inches away. */}
            <StudyContext />
            <div className="border-t border-line p-5">
              <Field label={t('Timezone')} hint={t('Used for calendar blocks and reminders')} className="max-w-sm">
                <Select value={prefs.timezone} onChange={(event) => patch({ timezone: event.target.value })}>
                  {[prefs.timezone, 'Africa/Cairo', 'Europe/London', 'Asia/Dubai', 'America/New_York']
                    .filter((zone, index, all) => all.indexOf(zone) === index)
                    .map((zone) => <option key={zone} value={zone}>{zone}</option>)}
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
              {t('Email preferences are not configurable yet. Connect Cortex only emails you about your account.')}
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
                    {t('Students in your own university and year can find you by name and ask to be friends. Turning this off does not remove friends you already have.')}
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
              <a href={supportLink}><Button className="w-full justify-start" variant="ghost" iconLeft={LifeBuoy}>{t('Email the Connect Cortex team')}</Button></a>
            </div>
          </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
