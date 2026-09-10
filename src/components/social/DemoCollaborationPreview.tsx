import { DiscoverabilityControl } from '@/components/rooms/DiscoverabilityControl'
import { useState } from 'react'
import { Bell, CalendarClock, Check, Copy, Hash, Link2, LogIn, Play, Plus, Users } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Segmented } from '@/components/ui/Tabs'
import { useT } from '@/lib/i18n'

export function DemoSharedTestsPreview() {
  const t = useT()
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      <Panel>
        <PanelHeader title={t('Create a shared test')} icon={Plus} action={<Badge tone="primary" dot>{t('Demo preview')}</Badge>} />
        <div className="space-y-5 p-5">
          <Field label={t('Name it')}><TextInput value="Cardiology evening sprint" readOnly /></Field>
          <div><p className="mb-2 text-[12.5px] font-medium text-ink-2">{t('Which topics?')}</p><div className="flex flex-wrap gap-2"><Badge tone="primary">Cardiovascular</Badge><Badge tone="outline">Heart failure</Badge><Badge tone="outline">Acute coronary syndromes</Badge></div></div>
          <div className="flex flex-wrap items-center gap-3"><Segmented value="10" onChange={() => undefined} items={[{ value: '5', label: '5' }, { value: '10', label: '10' }, { value: '20', label: '20' }]} /><Badge tone="neutral">{t('Timed · pace recorded')}</Badge></div>
          <Button variant="primary" iconLeft={Plus} disabled>{t('Create and get a code')}</Button>
          <p className="text-[11.5px] text-ink-3">{t('Preview only — creating a multi-student room requires the connected server.')}</p>
        </div>
      </Panel>
      <div className="space-y-4">
        <Panel><PanelHeader title={t('Join with a code')} icon={LogIn} /><div className="space-y-3 p-5"><TextInput value="K7PQR2" readOnly className="font-mono tracking-[0.2em]" /><Button className="w-full" variant="secondary" disabled>{t('Join')}</Button></div></Panel>
        <Panel><PanelHeader title={t('Your shared tests')} icon={Users} hint="1 open" /><div className="flex items-center gap-3 px-4 py-3"><span className="min-w-0 flex-1"><span className="block truncate text-[13.5px] font-medium text-ink">Cardiology evening sprint</span><span className="mt-0.5 block text-[12px] text-ink-3"><span className="font-mono">K7PQR2</span> · 4 people · 10 questions</span></span><Badge tone="primary">Waiting</Badge></div></Panel>
      </div>
    </div>
  )
}

export function DemoPartiesPreview() {
  const t = useT()
  const [copied, setCopied] = useState<'code' | 'link' | null>(null)
  const [game, setGame] = useState<string | null>(null)
  function copy(value: string, kind: 'code' | 'link') {
    void navigator.clipboard?.writeText(value)
    setCopied(kind)
    window.setTimeout(() => setCopied(null), 1400)
  }
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      <div className="space-y-4">
        <Panel>
          <PanelHeader title="CVS evening party" icon={Hash} action={<div className="flex gap-2"><Badge tone="primary">{t('Demo')}</Badge><Badge tone="success">{t('You host')}</Badge></div>} />
          <div className="space-y-5 p-5">
            <div><p className="text-[12px] text-ink-3">{t('Party code')}</p><div className="mt-2 flex flex-wrap items-center gap-2"><span className="tnum rounded-lg border border-line bg-surface-2 px-4 py-2 font-mono text-[23px] font-semibold tracking-[0.18em] text-ink">C7P9QK</span><Button size="sm" variant="secondary" iconLeft={copied === 'code' ? Check : Copy} onClick={() => copy('C7P9QK', 'code')}>{copied === 'code' ? 'Copied' : 'Copy code'}</Button><Button size="sm" variant="ghost" iconLeft={copied === 'link' ? Check : Link2} onClick={() => copy(`${window.location.origin}/app/study-together?party=C7P9QK`, 'link')}>{copied === 'link' ? 'Copied' : 'Copy link'}</Button></div></div>
            <div><p className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-ink-2"><CalendarClock size={14} />{t('Party schedule')}</p><div className="grid grid-cols-1 gap-2 sm:grid-cols-2"><DemoSchedule when="TUE · 7:00 PM" title="Heart failure question block" detail="25 minutes · added to calendar" /><DemoSchedule when="THU · 6:30 PM" title="Term Match round" detail="15 minutes · party only" /></div><Button className="mt-2" size="sm" variant="secondary" iconLeft={Plus}>{t('Add party activity')}</Button></div>
          </div>
        </Panel>
        <Panel><PanelHeader title={t('Start a party game')} icon={Play} hint={t('Creates one synchronized game instance')} /><div className="flex flex-wrap gap-2 p-4">{['Term Grid', 'Term Match', 'Red Flag Sort'].map((label) => <Button key={label} size="sm" variant={game === label ? 'primary' : 'secondary'} onClick={() => setGame(label)}>{label}</Button>)}</div>{game && <p role="status" className="border-t border-line px-4 py-3 text-[12.5px] text-success">{game} instance ready · waiting for the host to begin this demo round.</p>}</Panel>
      </div>
      <Panel><PanelHeader title={t('Party members')} icon={Users} hint="4 people" /><ul className="divide-y divide-line">{[['Student', 'Host'], ['Nora', 'Ready'], ['Karim', 'Ready'], ['Hana', 'Away']].map(([name, state], index) => <li key={name} className="flex items-center gap-3 px-4 py-3"><Avatar name={name} size="sm" /><span className="min-w-0 flex-1 text-[13px] font-medium text-ink">{name}</span><Badge tone={index === 0 ? 'primary' : state === 'Ready' ? 'success' : 'outline'}>{state}</Badge></li>)}</ul></Panel>
    </div>
  )
}

function DemoSchedule({ when, title, detail }: { when: string; title: string; detail: string }) {
  return <div className="rounded-lg border border-line bg-surface-2 p-3"><p className="font-mono text-[11px] text-primary-strong">{when}</p><p className="mt-1 text-[13px] font-semibold text-ink">{title}</p><p className="mt-1 text-[11.5px] text-ink-3">{detail}</p></div>
}

export function DemoFriendsPreview() {
  const t = useT()
  return (
    <div className="grid grid-cols-1 items-start gap-4">
      <Panel><PanelHeader title={t('Classmates in your year')} icon={Users} action={<Badge tone="primary" dot>{t('Demo preview')}</Badge>} /><ul className="divide-y divide-line">{[['Nora Hassan', '@neuro-nora'], ['Karim Adel', '@cardio-karim'], ['Hana Samir', '@hema-hana']].map(([name, username]) => <li key={username} className="flex items-center gap-3 px-4 py-3"><Avatar name={name} size="sm" /><span className="min-w-0 flex-1"><span className="block text-[13.5px] font-medium text-ink">{name}</span><span className="text-[12px] text-ink-3">{username} · ASU Year 1</span></span><Button size="sm" variant="secondary" disabled>Add</Button></li>)}</ul></Panel>
      <Panel><PanelHeader title={t('Discoverability')} icon={Bell} /><div className="p-5"><Badge tone="outline">{t('Off by default')}</Badge><p className="mt-3 text-[13px] leading-relaxed text-ink-2">{t('Students opt in before they can appear here or browse classmates in the same university and year.')}</p><DiscoverabilityControl/></div></Panel>
    </div>
  )
}
