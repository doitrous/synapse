import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Mail, Zap, Inbox, Info, KeyRound, ChevronRight, Send, RotateCcw } from 'lucide-react'
import { campaigns } from '@/data/admin'
import {
  EMAIL_AUTOMATIONS_STORAGE_KEY,
  automationCategories,
  fillTemplate,
  initialAutomations,
  PLACEHOLDERS,
  type Automation,
} from '@/data/emailAutomations'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Toggle } from '@/components/ui/Toggle'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import { emailConfigured, emailTransport, sendEmail } from '@/lib/email'
import { cn } from '@/lib/cn'

/** Editing panel for one automation's subject and body. */
function TemplateEditor({
  automation,
  onPatch,
  onReset,
}: {
  automation: Automation
  onPatch: (patch: Partial<Automation>) => void
  onReset: () => void
}) {
  const [testTo, setTestTo] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const seed = initialAutomations.find((entry) => entry.id === automation.id)
  const edited = Boolean(seed) && (seed!.subject !== automation.subject || seed!.body !== automation.body)

  async function sendTest() {
    if (!testTo.trim()) return
    setSending(true)
    setResult(null)
    const outcome = await sendEmail({
      to: testTo.trim(),
      subject: `[Test] ${fillTemplate(automation.subject)}`,
      html: fillTemplate(automation.body),
    })
    setSending(false)
    setResult(outcome.ok ? `${outcome.status} to ${testTo.trim()}` : `Failed — ${outcome.error ?? 'unknown error'}`)
  }

  return (
    <div className="border-t border-line bg-surface-2/40 px-4 py-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-3">
          <Field label="Subject">
            <TextInput value={automation.subject} onChange={(event) => onPatch({ subject: event.target.value })} />
          </Field>
          <Field label="Body" hint="Simple HTML. Placeholders are replaced when the email is sent.">
            <Textarea rows={7} value={automation.body} onChange={(event) => onPatch({ body: event.target.value })} className="font-mono text-[12px]" />
          </Field>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Preview</p>
            <div className="mt-2 rounded-lg border border-line bg-surface p-3">
              <p className="text-[12.5px] font-semibold text-ink">{fillTemplate(automation.subject)}</p>
              <div
                className="prose-email mt-2 text-[12px] leading-relaxed text-ink-2 [&_a]:text-accent-strong [&_a]:underline [&_p]:mt-1.5"
                // Preview only — this is the admin's own template, rendered for them.
                dangerouslySetInnerHTML={{ __html: fillTemplate(automation.body) }}
              />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Placeholders</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {Object.keys(PLACEHOLDERS).map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => onPatch({ body: `${automation.body}${token}` })}
                  className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-2 hover:border-accent-line hover:text-accent-strong"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
          <Field label="Send a test to">
            <div className="flex gap-2">
              <TextInput type="email" value={testTo} onChange={(event) => setTestTo(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1" />
              <Button variant="secondary" size="sm" iconLeft={Send} onClick={() => void sendTest()} disabled={sending || !testTo.trim()}>
                {sending ? 'Sending…' : 'Test'}
              </Button>
            </div>
          </Field>
          {result && <p className="text-[12px] text-ink-2">{result}</p>}
          {edited && (
            <Button variant="ghost" size="sm" iconLeft={RotateCcw} onClick={onReset}>Reset to default</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function EmailAutomations() {
  const [automations, setAutomations] = usePersistentState<Automation[]>(EMAIL_AUTOMATIONS_STORAGE_KEY, initialAutomations)
  const [openId, setOpenId] = useState<string | null>(null)
  const configured = emailConfigured()
  const transport = emailTransport()

  const activeCount = useMemo(() => automations.filter((a) => a.enabled).length, [automations])

  const patch = (id: string, next: Partial<Automation>) =>
    setAutomations((current) => current.map((a) => (a.id === id ? { ...a, ...next } : a)))

  const reset = (id: string) => {
    const seed = initialAutomations.find((entry) => entry.id === id)
    if (seed) patch(id, { subject: seed.subject, body: seed.body })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Email & Automations"
        description="Automated messages, their templates, and announcements to students."
        actions={
          <div className="flex gap-2">
            <Link to="/admin/mailbox"><Button variant="secondary" size="md" iconLeft={Inbox}>Mail Box</Button></Link>
            <Button variant="primary" size="md" iconLeft={Plus}>New campaign</Button>
          </div>
        }
      />

      {/* Sending configuration status */}
      <div className={cn('mb-4 flex flex-wrap items-center gap-2.5 rounded-lg border px-4 py-3 text-[13px]', configured ? 'border-success/25 bg-success-tint/60' : 'border-warning/30 bg-warning-tint/50')}>
        <Icon icon={configured ? KeyRound : Info} size={16} className={configured ? 'text-success' : 'text-warning'} />
        <span className="flex-1 text-ink">
          {transport === 'backend'
            ? 'Live sending is on. Mail goes through the Synapse backend to Resend, and every message is recorded in Mail Box.'
            : transport === 'endpoint'
              ? 'Live sending is on via the configured email function.'
              : 'Demo mode — emails are recorded but not sent. This build has no backend; set RESEND_API_KEY on the server, or VITE_EMAIL_ENDPOINT for a static demo.'}
        </span>
        <span className="font-mono text-[11px] text-ink-3">
          {transport === 'backend' ? 'RESEND_API_KEY → server' : transport === 'endpoint' ? 'VITE_EMAIL_ENDPOINT' : 'not configured'}
        </span>
      </div>

      <Panel className="mb-4">
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
                  {rows.map((a) => {
                    const open = openId === a.id
                    return (
                      <li key={a.id}>
                        <div className="flex items-center gap-3 px-4 py-3.5">
                          <button
                            type="button"
                            onClick={() => setOpenId(open ? null : a.id)}
                            aria-expanded={open}
                            className="grid size-7 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink"
                          >
                            <Icon icon={ChevronRight} size={15} className={cn('transition-transform', open && 'rotate-90')} />
                          </button>
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2 text-[13.5px] font-medium text-ink">
                              {a.name}
                              {a.audience === 'admin' && <Badge tone="neutral">Admins</Badge>}
                            </p>
                            <p className="mt-0.5 text-[12.5px] text-ink-2">{a.description}</p>
                          </div>
                          <span className="hidden shrink-0 rounded bg-inset px-2 py-1 text-[11.5px] text-ink-2 sm:inline">{a.trigger}</span>
                          <Toggle checked={a.enabled} onChange={() => patch(a.id, { enabled: !a.enabled })} label={a.name} />
                        </div>
                        {open && <TemplateEditor automation={a} onPatch={(next) => patch(a.id, next)} onReset={() => reset(a.id)} />}
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Campaigns" icon={Mail} hint={`${campaigns.length} campaigns`} />
        {campaigns.length === 0 ? (
          <p className="px-4 py-8 text-center text-[13px] text-ink-3">No campaigns yet. Announcements you send to students will appear here.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Subject</Th>
                <Th>Status</Th>
                <Th align="right">Recipients</Th>
                <Th align="right">Open rate</Th>
                <Th align="right" className="pr-4">When</Th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <Tr key={c.id} hover>
                  <Td className="pl-4 font-medium">{c.subject}</Td>
                  <Td><StatusBadge status={c.status} /></Td>
                  <Td align="right" className="tnum font-mono text-ink-2">{c.recipients.toLocaleString()}</Td>
                  <Td align="right" className="tnum font-mono text-ink-2">{c.openRate > 0 ? `${c.openRate}%` : '—'}</Td>
                  <Td align="right" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">{c.when}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </PageContainer>
  )
}
