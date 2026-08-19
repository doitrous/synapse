import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, KeyRound, LifeBuoy, LogOut, Palette, ShieldCheck, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { MfaControl } from '@/components/auth/MfaControl'
import { ThemeSwitch } from '@/components/shell/ThemeSwitch'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityName } from '@/lib/useUniversityCatalogue'
import { API_MODE, apiGet } from '@/lib/api'
import { useT } from '@/lib/i18n'

/**
 * Preferences the student owns.
 *
 * Name, email, university and year are not here any more. They are recorded by
 * the university, they gate entitlement and content scope, and the old form let
 * a student type over them into a JSON blob that nothing read — the account
 * email stayed unchanged in Supabase, and voucher eligibility went on using a
 * hardcoded profile regardless.
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
  return (
    <Field label={label} hint={hint}>
      <p className="flex min-h-11 items-center rounded-lg border border-line bg-surface-2/60 px-3 text-[13.5px] text-ink">
        {value || <span className="text-ink-3">Not recorded</span>}
      </p>
    </Field>
  )
}

export function Account() {
  const t = useT()
  const { email, displayName, profile, profileMissing } = useIdentity()
  const universityName = useUniversityName(profile.universityId)
  const [prefs, setPrefs] = usePersistentState<AccountPrefs>(ACCOUNT_PREFS_STORAGE_KEY, DEFAULTS)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')

  const patch = (next: Partial<AccountPrefs>) => setPrefs((current) => ({ ...current, ...next }))
  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Connect Cortex profile change request')}`

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
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <ReadOnlyField label={t('Full name')} value={profile.name ?? displayName} />
              <ReadOnlyField label={t('Email address')} value={profile.email ?? email} />
              {/* The catalogue name, not the `kau`-style key this is stored under. */}
              <ReadOnlyField label={t('University')} value={universityName || profile.universityId} />
              <ReadOnlyField label={t('Year of study')} value={profile.year} />
              <ReadOnlyField label={t('Group')} value={profile.group} hint={t('Used for targeted vouchers and notices')} />
              <Field label={t('Timezone')} hint={t('Used for calendar blocks and reminders')}>
                <Select value={prefs.timezone} onChange={(event) => patch({ timezone: event.target.value })}>
                  {[prefs.timezone, 'Africa/Cairo', 'Europe/London', 'Asia/Dubai', 'America/New_York']
                    .filter((zone, index, all) => all.indexOf(zone) === index)
                    .map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <p className="rounded-lg border border-line bg-surface-2/50 px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
                  {profileMissing
                    ? t("Your university hasn't set up your student profile yet. Until it does, your timetable and any content scoped to your year won't appear.")
                    : t('Your name, university, year and group are recorded by your university. They decide which content and offers apply to you, so they are changed by the Connect Cortex team rather than here.')}
                  {' '}
                  <a href={supportLink} className="font-semibold text-primary-strong hover:text-primary">{t('Request a change')}</a>
                </p>
              </div>
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
