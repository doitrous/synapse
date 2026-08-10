import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, KeyRound, LogOut, Save, ShieldCheck, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatDateTime } from '@/lib/format'
import { useT } from '@/lib/i18n'

interface AccountSettings {
  name: string
  email: string
  university: string
  year: string
  timezone: string
  reviewReminders: boolean
  calendarReminders: boolean
  productUpdates: boolean
  weeklyDigest: boolean
}

const DEFAULTS: AccountSettings = {
  name: 'Maya Adeyemi',
  email: 'maya.adeyemi@example.edu',
  university: 'University of Manchester',
  year: 'Year 3',
  timezone: 'Africa/Cairo',
  reviewReminders: true,
  calendarReminders: true,
  productUpdates: false,
  weeklyDigest: true,
}

export function Account() {
  const t = useT()
  const [settings, setSettings] = usePersistentState<AccountSettings>('synapse.account.settings', DEFAULTS)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  const patch = (next: Partial<AccountSettings>) => setSettings((current) => ({ ...current, ...next }))

  return (
    <PageContainer>
      <PageHeader title={t('Manage your account')} description={t('Profile, study preferences, security, notifications, privacy, and active sessions.')} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Profile and study context" icon={UserRound} action={savedAt ? <Badge tone="success">Saved {formatDateTime(savedAt)}</Badge> : undefined} />
            <form className="grid gap-4 p-5 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setSavedAt(new Date()) }}>
              <Field label="Full name"><TextInput value={settings.name} onChange={(event) => patch({ name: event.target.value })} /></Field>
              <Field label="Email address"><TextInput type="email" value={settings.email} onChange={(event) => patch({ email: event.target.value })} /></Field>
              <Field label="University"><TextInput value={settings.university} onChange={(event) => patch({ university: event.target.value })} /></Field>
              <Field label="Year of study"><Select value={settings.year} onChange={(event) => patch({ year: event.target.value })}>{['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'].map((year) => <option key={year}>{year}</option>)}</Select></Field>
              <Field label="Timezone" hint="Used for calendar blocks and reminders"><Select value={settings.timezone} onChange={(event) => patch({ timezone: event.target.value })}><option value="Africa/Cairo">Cairo (GMT+3)</option><option value="Europe/London">London</option><option value="Asia/Dubai">Dubai</option><option value="America/New_York">New York</option></Select></Field>
              <div className="flex items-end"><Button type="submit" variant="primary" iconLeft={Save}>Save changes</Button></div>
            </form>
          </Panel>

          <Panel>
            <PanelHeader title="Notifications" />
            <div className="divide-y divide-line px-5">
              {[
                ['Review reminders', 'When an article or question set deserves attention.', 'reviewReminders'],
                ['Calendar reminders', 'Before personal blocks and curriculum sessions.', 'calendarReminders'],
                ['Weekly study digest', 'A concise summary of accuracy and time used.', 'weeklyDigest'],
                ['Product updates', 'Changes to Synapse and new study tools.', 'productUpdates'],
              ].map(([title, description, key]) => <label key={key} className="flex cursor-pointer items-center justify-between gap-4 py-3.5"><span><span className="block text-[13.5px] font-medium text-ink">{title}</span><span className="mt-0.5 block text-[12px] text-ink-3">{description}</span></span><Toggle checked={settings[key as keyof AccountSettings] as boolean} onChange={(value) => patch({ [key]: value })} label={title} /></label>)}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Security" icon={ShieldCheck} />
            <div className="space-y-3 p-4">
              <div className="rounded-lg border border-line bg-surface-2 p-3"><p className="text-[13px] font-medium text-ink">Password</p><p className="mt-0.5 text-[11.5px] text-ink-3">Reset through a time-limited email link.</p><Link to="/auth/forgot-password" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3 text-[13px] font-semibold text-ink hover:bg-inset"><KeyRound size={15} />Change password</Link></div>
              <div className="rounded-lg border border-line p-3"><div className="flex items-center justify-between gap-3"><div><p className="text-[13px] font-medium text-ink">Two-factor authentication</p><p className="mt-0.5 text-[11.5px] text-ink-3">Free authenticator app · mandatory for admins</p></div><Badge tone="accent">TOTP</Badge></div><Link to="/auth/mfa" className="mt-3 inline-flex min-h-9 items-center rounded-lg px-3 text-[12.5px] font-semibold text-accent-strong hover:bg-accent-tint">Set up or verify MFA</Link></div>
            </div>
          </Panel>
          <Panel>
            <PanelHeader title="Privacy and data" />
            <div className="space-y-2 p-4"><Button className="w-full justify-start" variant="secondary" iconLeft={Download} onClick={() => { const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'synapse-account-data.json'; anchor.click(); URL.revokeObjectURL(url) }}>Download profile settings</Button><p className="text-[11.5px] leading-relaxed text-ink-3">Live notes, highlights, plans, and progress are stored in user-owned MariaDB records and included in database recovery snapshots.</p></div>
          </Panel>
          <Panel>
            <PanelHeader title="Active sessions" />
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[13px] font-medium text-ink">This browser</p><p className="mt-0.5 text-[11.5px] text-ink-3">Authenticated session or temporary owner preview</p></div><Badge tone="success">Open</Badge></div><Link to="/logout" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[12.5px] font-semibold text-ink-2 hover:bg-inset hover:text-ink"><LogOut size={15} />Open sign-out screen</Link></div>
          </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
