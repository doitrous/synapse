import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Mail, Zap, Inbox, Info, KeyRound, ChevronRight, Send, RotateCcw, Trash2 } from 'lucide-react'
import { campaigns } from '@/data/admin'
import {
  EMAIL_AUTOMATIONS_STORAGE_KEY,
  automationCategories,
  fillTemplate,
  initialAutomations,
  normaliseAutomations,
  PLACEHOLDERS,
  renderAutomation,
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
import type { EmailDetail } from '@/data/emailTemplate'
import { cn } from '@/lib/cn'

/** The fields an admin may edit. Everything else about an automation is wiring. */
const CONTENT_FIELDS = ['subject', 'preheader', 'title', 'body', 'action', 'details', 'note'] as const

const sameContent = (a: Automation, b: Automation) =>
  CONTENT_FIELDS.every((field) => JSON.stringify(a[field] ?? null) === JSON.stringify(b[field] ?? null))

/** The label/value rows of the detail panel, which is absent when it is empty. */
function DetailRows({ details, onChange }: { details: EmailDetail[]; onChange: (next: EmailDetail[] | undefined) => void }) {
  const patch = (index: number, next: Partial<EmailDetail>) =>
    onChange(details.map((row, i) => (i === index ? { ...row, ...next } : row)))

  return (
    <div className="space-y-1.5">
      {details.map((row, index) => (
        <div key={index} className="flex gap-1.5">
          <TextInput
            value={row.label}
            onChange={(event) => patch(index, { label: event.target.value })}
            placeholder="Label"
            aria-label={`Fact ${index + 1} label`}
            className="h-8 min-w-0 flex-1 text-[12.5px]"
          />
          <TextInput
            value={row.value}
            onChange={(event) => patch(index, { value: event.target.value })}
            placeholder="Value"
            aria-label={`Fact ${index + 1} value`}
            className="h-8 min-w-0 flex-1 font-mono text-[12px]"
          />
          <button
            type="button"
            onClick={() => onChange(details.length === 1 ? undefined : details.filter((_, i) => i !== index))}
            className="grid size-8 shrink-0 place-items-center rounded-md text-ink-3 hover:bg-danger-tint hover:text-danger"
            aria-label={`Remove fact ${index + 1}`}
          >
            <Icon icon={Trash2} size={13} />
          </button>
        </div>
      ))}
      <Button variant="ghost" size="sm" iconLeft={Plus} onClick={() => onChange([...details, { label: '', value: '' }])}>
        Add a fact
      </Button>
    </div>
  )
}

/** Editing panel for one automation's blocks. */
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
  const edited = Boolean(seed) && !sameContent(seed!, automation)
  const action = automation.action
  const details = automation.details ?? []

  async function sendTest() {
    if (!testTo.trim()) return
    setSending(true)
    setResult(null)
    // Sent through the same wrapper production mail uses, so a test proves the
    // real thing rather than a bare fragment that only exists in this box.
    const rendered = renderAutomation(automation)
    const outcome = await sendEmail({
      to: testTo.trim(),
      subject: `[Test] ${fillTemplate(automation.subject)}`,
      html: rendered.html,
      text: rendered.text,
    })
    setSending(false)
    setResult(outcome.ok ? `${outcome.status} to ${testTo.trim()}` : `Failed — ${outcome.error ?? 'unknown error'}`)
  }

  return (
    <div className="border-t border-line bg-surface-2/40 px-4 py-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="space-y-3">
          <Field label="Subject">
            <TextInput value={automation.subject} onChange={(event) => onPatch({ subject: event.target.value })} />
          </Field>
          <Field
            label="Preheader"
            hint={`The grey line beside the subject in the inbox. Never repeat the greeting. ${automation.preheader.length}/85`}
          >
            <TextInput value={automation.preheader} onChange={(event) => onPatch({ preheader: event.target.value })} />
          </Field>
          <Field label="Title" hint="The heading above the body. Empty means the subject, which is the norm.">
            <TextInput
              value={automation.title ?? ''}
              onChange={(event) => onPatch({ title: event.target.value || undefined })}
              placeholder={automation.subject}
            />
          </Field>
          <Field label="Body" hint="Simple HTML paragraphs. The button, the facts and the note are their own fields.">
            <Textarea rows={5} value={automation.body} onChange={(event) => onPatch({ body: event.target.value })} className="font-mono text-[12px]" />
          </Field>
          <Field label="Action" hint="One per email, never two. Leave the label empty on mail that asks for nothing.">
            <div className="flex flex-wrap gap-1.5">
              <TextInput
                value={action?.label ?? ''}
                onChange={(event) => onPatch({ action: event.target.value ? { label: event.target.value, url: action?.url ?? '{{actionUrl}}' } : undefined })}
                placeholder="Button label"
                aria-label="Action label"
                className="min-w-0 flex-1"
              />
              <TextInput
                value={action?.url ?? ''}
                onChange={(event) => onPatch({ action: action ? { ...action, url: event.target.value } : undefined })}
                placeholder="{{actionUrl}}"
                aria-label="Action URL"
                disabled={!action}
                className="min-w-0 flex-1 font-mono text-[12px]"
              />
            </div>
          </Field>
          <Field label="Facts" hint="Shown in a tinted panel. Omitted entirely when there are none.">
            <DetailRows details={details} onChange={(next) => onPatch({ details: next?.length ? next : undefined })} />
          </Field>
          <Field label="Note" hint="The quieter last word below a hairline: an expiry, an “if this wasn’t you”.">
            <Textarea rows={2} value={automation.note ?? ''} onChange={(event) => onPatch({ note: event.target.value || undefined })} className="font-mono text-[12px]" />
          </Field>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Preview</p>
            <div className="mt-2 overflow-hidden rounded-lg border border-line bg-surface">
              <p className="border-b border-line px-3 py-2 text-[12.5px] font-semibold text-ink">{fillTemplate(automation.subject)}</p>
              {/* The preheader is the second thing an inbox shows and the one
                  part of the message the reader sees before deciding to open
                  it, so the preview shows it where the inbox would. */}
              <p className="truncate border-b border-line px-3 py-1.5 text-[11.5px] text-ink-3">{fillTemplate(automation.preheader)}</p>
              {/* The real wrapper, in an iframe — the email carries its own document
                  and palette, and letting that loose in the page would inherit the
                  admin's theme and show something the recipient will never see. */}
              {/* Rendered at its true 600px and scaled down, rather than squeezed
                  into the column — a preview of a narrower email would be a
                  preview of an email nobody is going to receive. */}
              <div className="h-[452px] overflow-hidden bg-white">
                <iframe
                  title="Email preview"
                  sandbox=""
                  style={{ width: 600, height: 822, transform: 'scale(0.55)', transformOrigin: 'top left', border: 0 }}
                  srcDoc={renderAutomation(automation).html}
                />
              </div>
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
                  title={`Append ${token} to the body`}
                  className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-2 hover:border-primary-line hover:text-primary-strong"
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
  const [stored, setAutomations] = usePersistentState<Automation[]>(EMAIL_AUTOMATIONS_STORAGE_KEY, initialAutomations)
  const [openId, setOpenId] = useState<string | null>(null)
  // Edits saved against the older single-body shape are read into blocks on the
  // way in, so an admin who rewrote a template last term gets the new layout
  // rather than a message that has lost its button to it.
  const automations = useMemo(() => normaliseAutomations(stored), [stored])
  const configured = emailConfigured()
  const transport = emailTransport()

  const activeCount = useMemo(() => automations.filter((a) => a.enabled).length, [automations])

  const patch = (id: string, next: Partial<Automation>) =>
    setAutomations((current) => current.map((a) => (a.id === id ? { ...a, ...next } : a)))

  const reset = (id: string) => {
    const seed = initialAutomations.find((entry) => entry.id === id)
    if (!seed) return
    const { subject, preheader, title, body, action, details, note } = seed
    patch(id, { subject, preheader, title, body, action, details, note })
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
            ? 'Live sending is on. Mail goes through the Connect Cortex backend to Resend, and every message is recorded in Mail Box.'
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
                            <Icon icon={ChevronRight} size={15} className={cn('chevron-turn')} open={open} />
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
                <Th align="end">Recipients</Th>
                <Th align="end">Open rate</Th>
                <Th align="end" className="pr-4">When</Th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <Tr key={c.id} hover>
                  <Td className="pl-4 font-medium">{c.subject}</Td>
                  <Td><StatusBadge status={c.status} /></Td>
                  <Td align="end" className="tnum font-mono text-ink-2">{c.recipients.toLocaleString()}</Td>
                  <Td align="end" className="tnum font-mono text-ink-2">{c.openRate > 0 ? `${c.openRate}%` : '—'}</Td>
                  <Td align="end" className="whitespace-nowrap pr-4 text-[12.5px] text-ink-2">{c.when}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </PageContainer>
  )
}
