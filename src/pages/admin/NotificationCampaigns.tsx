import { useMemo, useState } from 'react'
import { BellRing, CalendarClock, CircleCheck, Pencil, Plus, Send, Trash2, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { IconButton } from '@/components/ui/IconButton'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { API_MODE } from '@/lib/api'
import { formatDateTime } from '@/lib/format'
import { YEARS } from '@/data/universities'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import {
  initialNotificationCampaigns,
  NOTIFICATION_STORAGE_KEY,
  type NotificationAutomation,
  type NotificationCampaign,
  type NotificationDelivery,
} from '@/data/notifications'

const automations: NotificationAutomation[] = ['None', 'Before calendar event', 'Review becomes due', 'New content published', 'Weekly progress summary']

function emptyCampaign(): NotificationCampaign {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 30)
  return { id: `notification-${Date.now()}`, title: '', message: '', to: '/app', active: true, delivery: 'Immediate', scheduledAt: now.toISOString(), automation: 'None', leadMinutes: 30, universityIds: [], years: [], groups: [], createdAt: new Date().toISOString() }
}

function localDateTime(value: string) {
  const date = new Date(value)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

/** `YYYY-MM-DD` and `HH:MM` in the admin's own timezone, back to an instant. */
function scheduledParts(value: string) {
  const local = localDateTime(value)
  return { day: local.slice(0, 10), time: local.slice(11, 16) }
}
function scheduledFrom(day: string, time: string) {
  return new Date(`${day}T${time}:00`).toISOString()
}

export function NotificationCampaigns() {
  const [universityCatalogue] = useUniversityCatalogue()
  const [campaigns, setCampaigns] = usePersistentState<NotificationCampaign[]>(NOTIFICATION_STORAGE_KEY, API_MODE ? [] : initialNotificationCampaigns)
  const [editing, setEditing] = useState<NotificationCampaign | null>(null)
  const [notice, setNotice] = useState('')
  const active = useMemo(() => campaigns.filter((campaign) => campaign.active).length, [campaigns])

  function save(sendNow = false) {
    if (!editing || !editing.title.trim() || !editing.message.trim()) return
    const next: NotificationCampaign = { ...editing, title: editing.title.trim(), message: editing.message.trim(), delivery: sendNow ? 'Immediate' : editing.delivery, scheduledAt: sendNow ? new Date().toISOString() : editing.scheduledAt, sentAt: sendNow ? new Date().toISOString() : editing.sentAt }
    setCampaigns((current) => current.some((campaign) => campaign.id === next.id) ? current.map((campaign) => campaign.id === next.id ? next : campaign) : [next, ...current])
    setEditing(null)
    setNotice(sendNow ? 'Notification is now available to the selected students.' : 'Notification campaign saved.')
  }

  function toggleList(field: 'universityIds' | 'years', value: string) {
    setEditing((current) => current ? { ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] } : current)
  }

  return (
    <PageContainer>
      <PageHeader title="Student notifications" description="Send in-app popups to a university, year, group, or any combination. Schedule a one-off message or tie it to a study event." actions={<Button variant="primary" iconLeft={Plus} onClick={() => setEditing(emptyCampaign())}>New notification</Button>} />
      {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint px-4 py-2.5 text-[13px] text-ink"><CircleCheck size={15} className="text-success" />{notice}<button className="ml-auto text-[12px] text-ink-3" onClick={() => setNotice('')}>Dismiss</button></div>}
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <Panel className="overflow-hidden">
          <PanelHeader title="Campaigns" icon={BellRing} hint={`${active} active`} />
          <Table>
            <thead><tr><Th className="pl-4">Notification</Th><Th>Delivery</Th><Th>Audience</Th><Th>When</Th><Th>Status</Th><Th align="end" className="pr-4">Actions</Th></tr></thead>
            <tbody>{campaigns.map((campaign) => {
              const audienceRules = campaign.universityIds.length + campaign.years.length + campaign.groups.length
              return <Tr key={campaign.id} hover><Td className="max-w-sm pl-4"><p className="line-clamp-1 font-semibold text-ink">{campaign.title}</p><p className="mt-0.5 line-clamp-1 text-[11.5px] text-ink-3">{campaign.message}</p></Td><Td><Badge tone={campaign.delivery === 'Automated' ? 'primary' : campaign.delivery === 'Scheduled' ? 'warning' : 'neutral'}>{campaign.delivery}</Badge></Td><Td className="text-[12px] text-ink-2">{audienceRules ? `${audienceRules} targeting rules` : 'All students'}</Td><Td className="whitespace-nowrap text-[12px] text-ink-2">{campaign.delivery === 'Automated' ? campaign.automation : formatDateTime(new Date(campaign.scheduledAt))}</Td><Td><Badge tone={campaign.active ? 'success' : 'neutral'}>{campaign.active ? 'Active' : 'Paused'}</Badge></Td><Td align="end" className="pr-4"><div className="inline-flex gap-1"><IconButton icon={Pencil} label={`Edit ${campaign.title}`} size="sm" onClick={() => setEditing({ ...campaign })} /><IconButton icon={Trash2} label={`Delete ${campaign.title}`} size="sm" className="text-danger" onClick={() => setCampaigns((current) => current.filter((item) => item.id !== campaign.id))} /></div></Td></Tr>
            })}</tbody>
          </Table>
        </Panel>

        <Panel className="overflow-hidden xl:sticky xl:top-20">
          <PanelHeader title={editing ? 'Notification editor' : 'Delivery preview'} icon={CalendarClock} action={editing && <IconButton icon={X} label="Close notification editor" size="sm" onClick={() => setEditing(null)} />} />
          {editing ? <div className="space-y-4 p-4">
            <Field label="Title" htmlFor="notification-title"><TextInput id="notification-title" value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} placeholder="Review window opens today" /></Field>
            <Field label="Message" htmlFor="notification-message" hint="Keep the main instruction visible without opening another page."><Textarea id="notification-message" value={editing.message} onChange={(event) => setEditing({ ...editing, message: event.target.value })} className="min-h-24" /></Field>
            <Field label="Destination" htmlFor="notification-link"><TextInput id="notification-link" value={editing.to} onChange={(event) => setEditing({ ...editing, to: event.target.value })} placeholder="/app/qbank?topics=cvs" /></Field>
            <div className="grid grid-cols-2 gap-3"><Field label="Delivery"><Select value={editing.delivery} onChange={(event) => setEditing({ ...editing, delivery: event.target.value as NotificationDelivery, automation: event.target.value === 'Automated' ? 'Before calendar event' : 'None' })}><option>Immediate</option><option>Scheduled</option><option>Automated</option></Select></Field>{editing.delivery === 'Scheduled' ? <Field label="Send at"><div className="grid grid-cols-2 gap-2"><DateField value={scheduledParts(editing.scheduledAt).day} onChange={(day) => setEditing({ ...editing, scheduledAt: scheduledFrom(day, scheduledParts(editing.scheduledAt).time) })} /><TimeField value={scheduledParts(editing.scheduledAt).time} onChange={(time) => setEditing({ ...editing, scheduledAt: scheduledFrom(scheduledParts(editing.scheduledAt).day, time) })} /></div></Field> : editing.delivery === 'Automated' ? <Field label="Trigger"><Select value={editing.automation} onChange={(event) => setEditing({ ...editing, automation: event.target.value as NotificationAutomation })}>{automations.filter((option) => option !== 'None').map((option) => <option key={option}>{option}</option>)}</Select></Field> : <div className="rounded-lg border border-line bg-surface-2 p-3 text-[12px] leading-relaxed text-ink-2">Available as a popup as soon as you save.</div>}</div>
            {editing.delivery === 'Automated' && editing.automation === 'Before calendar event' && <Field label="Minutes before event"><TextInput type="number" min="0" value={editing.leadMinutes} onChange={(event) => setEditing({ ...editing, leadMinutes: Number(event.target.value) })} /></Field>}
            <fieldset><legend className="text-[12.5px] font-medium text-ink-2">Universities</legend><div className="mt-2 grid gap-2">{universityCatalogue.map((university) => <label key={university.id} className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-line px-3 text-[12px] transition-colors hover:bg-inset"><input type="checkbox" checked={editing.universityIds.includes(university.id)} onChange={() => toggleList('universityIds', university.id)} /><strong className="shrink-0 font-mono text-[11px] text-primary-strong">{university.short}</strong><span className="min-w-0 truncate text-ink-2">{university.name}</span></label>)}</div></fieldset>
            <fieldset><legend className="text-[12.5px] font-medium text-ink-2">Years</legend><div className="mt-2 flex flex-wrap gap-2">{YEARS.map((year) => <label key={year} className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-line px-2.5 text-[12px]"><input type="checkbox" checked={editing.years.includes(year)} onChange={() => toggleList('years', year)} />{year.replace('Year ', 'Y')}</label>)}</div></fieldset>
            <Field label="Groups" hint="Comma-separated. Leave blank for all groups."><TextInput value={editing.groups.join(', ')} onChange={(event) => setEditing({ ...editing, groups: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} placeholder="Cardiovascular block, Cohort B" /></Field>
            <label className="flex min-h-11 items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 text-[13px]"><input type="checkbox" checked={editing.active} onChange={(event) => setEditing({ ...editing, active: event.target.checked })} /><span><strong className="font-semibold">Campaign active</strong><span className="block text-[11.5px] text-ink-3">Paused campaigns never appear in the student popup.</span></span></label>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1"><Button variant="secondary" onClick={() => save(false)} disabled={!editing.title.trim() || !editing.message.trim()}>Save campaign</Button><Button variant="primary" iconLeft={Send} onClick={() => save(true)} disabled={!editing.title.trim() || !editing.message.trim()}>Send now</Button></div>
          </div> : <div className="px-5 py-12 text-center"><BellRing className="mx-auto text-ink-3" size={24} /><p className="mt-2 text-[13px] font-semibold text-ink">Targeted, not noisy</p><p className="mt-1 text-[12px] leading-relaxed text-ink-3">Only students matching every selected audience dimension will see the popup.</p></div>}
        </Panel>
      </div>
    </PageContainer>
  )
}
