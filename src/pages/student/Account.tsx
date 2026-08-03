import { useState } from 'react'
import { Download, KeyRound, LogOut, Save, ShieldCheck, UserRound } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Badge } from '@/components/ui/Badge'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatDateTime } from '@/lib/format'

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
  const [settings, setSettings] = usePersistentState<AccountSettings>('osler.account.settings', DEFAULTS)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [signedOut, setSignedOut] = useState(false)

  const patch = (next: Partial<AccountSettings>) => setSettings((current) => ({ ...current, ...next }))

  return (
    <PageContainer>
      <PageHeader title="Manage your account" description="Profile, study preferences, security, notifications, privacy, and active sessions." />
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
                ['Product updates', 'Changes to Osler and new study tools.', 'productUpdates'],
              ].map(([title, description, key]) => <label key={key} className="flex cursor-pointer items-center justify-between gap-4 py-3.5"><span><span className="block text-[13.5px] font-medium text-ink">{title}</span><span className="mt-0.5 block text-[12px] text-ink-3">{description}</span></span><Toggle checked={settings[key as keyof AccountSettings] as boolean} onChange={(value) => patch({ [key]: value })} label={title} /></label>)}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Security" icon={ShieldCheck} />
            <div className="space-y-3 p-4">
              <div className="rounded-lg border border-line bg-surface-2 p-3"><p className="text-[13px] font-medium text-ink">Password</p><p className="mt-0.5 text-[11.5px] text-ink-3">Last changed 42 days ago</p><Button className="mt-3" size="sm" variant="secondary" iconLeft={KeyRound} onClick={() => setPasswordChanged(true)}>{passwordChanged ? 'Reset email sent' : 'Change password'}</Button></div>
              <div className="rounded-lg border border-line p-3"><div className="flex items-center justify-between"><div><p className="text-[13px] font-medium text-ink">Two-factor authentication</p><p className="mt-0.5 text-[11.5px] text-ink-3">Authenticator app</p></div><Badge tone="success">Enabled</Badge></div></div>
            </div>
          </Panel>
          <Panel>
            <PanelHeader title="Privacy and data" />
            <div className="space-y-2 p-4"><Button className="w-full justify-start" variant="secondary" iconLeft={Download} onClick={() => { const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'osler-account-data.json'; anchor.click(); URL.revokeObjectURL(url) }}>Download your data</Button><p className="text-[11.5px] leading-relaxed text-ink-3">Includes profile settings stored by this prototype. Study activity remains on this device.</p></div>
          </Panel>
          <Panel>
            <PanelHeader title="Active sessions" />
            <div className="p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[13px] font-medium text-ink">This Mac · Cairo</p><p className="mt-0.5 text-[11.5px] text-ink-3">Current session</p></div><Badge tone={signedOut ? 'neutral' : 'success'}>{signedOut ? 'Signed out' : 'Active'}</Badge></div><Button className="mt-3" size="sm" variant="ghost" iconLeft={LogOut} onClick={() => setSignedOut(true)} disabled={signedOut}>Sign out other sessions</Button></div>
          </Panel>
        </div>
      </div>
    </PageContainer>
  )
}
