import { useState } from 'react'
import { Plus, Mail, Zap, Inbox, Send, Info, KeyRound } from 'lucide-react'
import { campaigns, automations, automationCategories } from '@/data/admin'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatDateTime } from '@/lib/format'
import { emailConfigured } from '@/lib/email'
import { initialEmailLog, EMAIL_LOG_STORAGE_KEY, type EmailMessage, type MessageStatus } from '@/data/emailLog'

function msgTone(s: MessageStatus): 'success' | 'accent' | 'warning' | 'danger' | 'neutral' {
  if (s === 'Delivered' || s === 'Opened') return 'success'
  if (s === 'Sent' || s === 'Received') return 'accent'
  if (s === 'Queued') return 'neutral'
  if (s === 'Bounced') return 'warning'
  return 'danger'
}

export function EmailAutomations() {
  const [log] = usePersistentState<EmailMessage[]>(EMAIL_LOG_STORAGE_KEY, initialEmailLog)
  const [logView, setLogView] = useState<'history' | 'inbox'>('history')
  const configured = emailConfigured()
  const [enabled, setEnabled] = useState<Set<string>>(
    () => new Set(automations.filter((a) => a.enabled).map((a) => a.id)),
  )
  function toggle(id: string) {
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const activeCount = automations.filter((a) => enabled.has(a.id)).length

  return (
    <PageContainer>
      <PageHeader
        title="Email & Automations"
        description="Announcements to students and automated communications."
        actions={
          <Button variant="primary" size="md" iconLeft={Plus}>
            New campaign
          </Button>
        }
      />

      {/* Sending configuration status */}
      <div className={`mb-4 flex flex-wrap items-center gap-2.5 rounded-lg border px-4 py-3 text-[13px] ${configured ? 'border-success/25 bg-success-tint/60' : 'border-warning/30 bg-warning-tint/50'}`}>
        <Icon icon={configured ? KeyRound : Info} size={16} className={configured ? 'text-success' : 'text-warning'} />
        <span className="flex-1 text-ink">
          {configured
            ? 'Live sending is configured via Resend.'
            : 'Demo mode — emails are logged but not sent. Add a Resend key on your server and set VITE_EMAIL_ENDPOINT to go live.'}
        </span>
        <span className="font-mono text-[11px] text-ink-3">RESEND_API_KEY → server · VITE_EMAIL_ENDPOINT → .env</span>
      </div>

      {/* Message log — history, inbox, and per-message status */}
      <Panel className="mb-4">
        <PanelHeader
          title="Message log"
          icon={logView === 'inbox' ? Inbox : Send}
          hint={`${log.filter((m) => m.direction === (logView === 'inbox' ? 'inbound' : 'outbound')).length} messages`}
          action={<Segmented value={logView} onChange={(v) => setLogView(v as 'history' | 'inbox')} items={[{ value: 'history', label: 'History' }, { value: 'inbox', label: 'Inbox' }]} />}
        />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">{logView === 'inbox' ? 'From' : 'To'}</Th>
              <Th>Subject</Th>
              {logView === 'history' && <Th>Automation</Th>}
              <Th>Status</Th>
              <Th align="right" className="pr-4">When</Th>
            </tr>
          </thead>
          <tbody>
            {log.filter((m) => m.direction === (logView === 'inbox' ? 'inbound' : 'outbound')).map((m) => (
              <Tr key={m.id} hover>
                <Td className="pl-4 font-mono text-[12px] text-ink-2">{logView === 'inbox' ? m.from : m.to}</Td>
                <Td className="max-w-md"><span className="line-clamp-1 font-medium text-ink">{m.subject}</span></Td>
                {logView === 'history' && <Td className="text-[12px] text-ink-3">{m.automation ?? '—'}</Td>}
                <Td><Badge tone={msgTone(m.status)}>{m.status}</Badge></Td>
                <Td align="right" className="whitespace-nowrap pr-4 text-[12px] text-ink-3">{formatDateTime(new Date(m.at))}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title="Campaigns" icon={Mail} />
        <Table>
          <thead>
            <tr>
              <Th className="pl-4">Subject</Th>
              <Th>Status</Th>
              <Th align="right">Recipients</Th>
              <Th align="right">Open rate</Th>
              <Th align="right" className="pr-4">
                When
              </Th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <Tr key={c.id} hover>
                <Td className="pl-4 font-medium">{c.subject}</Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {c.recipients.toLocaleString()}
                </Td>
                <Td align="right" className="tnum font-mono text-ink-2">
                  {c.openRate > 0 ? `${c.openRate}%` : '—'}
                </Td>
                <Td align="right" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">
                  {c.when}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Panel>

      <Panel>
        <PanelHeader
          title="Automated emails"
          icon={Zap}
          hint={`${activeCount} of ${automations.length} active`}
        />
        <div className="divide-y divide-line">
          {automationCategories.map((category) => {
            const rows = automations.filter((a) => a.category === category)
            if (rows.length === 0) return null
            return (
              <section key={category}>
                <div className="flex items-center gap-2 bg-surface-2/50 px-4 py-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{category}</span>
                  <span className="tnum font-mono text-[10.5px] text-ink-3">{rows.length}</span>
                </div>
                <ul className="divide-y divide-line">
                  {rows.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 px-4 py-3.5">
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-ink">
                          {a.name}
                          {a.audience === 'admin' && <Badge tone="neutral">Admins</Badge>}
                        </p>
                        <p className="mt-0.5 text-[12.5px] text-ink-2">{a.description}</p>
                      </div>
                      <span className="hidden shrink-0 rounded bg-inset px-2 py-1 text-[11.5px] text-ink-2 sm:inline">
                        {a.trigger}
                      </span>
                      <Toggle checked={enabled.has(a.id)} onChange={() => toggle(a.id)} label={a.name} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </Panel>
    </PageContainer>
  )
}
