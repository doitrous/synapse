import { useCallback, useEffect, useRef, useState } from 'react'
import { Mail, Inbox, Send, Plus, Paperclip, Download, X, RefreshCw, AtSign, Info, ChevronLeft, Zap } from 'lucide-react'
import { NishanyLoader } from '@/components/ui/NishanyLoader'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { formatDateTime } from '@/lib/format'
import { cn } from '@/lib/cn'
import { API_MODE, apiGet, apiPost, apiDownload } from '@/lib/api'

interface Mailbox { address: string; label: string }
interface MailRow { id: string; direction: 'inbound' | 'outbound'; mailbox: string; fromAddr: string; toAddr: string; subject: string; status: string; at: string; attachmentCount: number }
interface Attachment { id: string; filename: string; contentType: string; sizeBytes: number }
interface MailFull extends MailRow { cc?: string; bcc?: string; html?: string; text?: string; attachments: Attachment[] }
interface Draft { filename: string; contentType: string; size: number; content_b64: string }

const DEFAULT_FROM = 'info@nishany.com'

function statusTone(s: string): 'success' | 'primary' | 'warning' | 'danger' | 'neutral' {
  if (s === 'Delivered' || s === 'Opened') return 'success'
  if (s === 'Sent' || s === 'Received') return 'primary'
  if (s === 'Queued') return 'neutral'
  if (s === 'Bounced') return 'warning'
  return 'danger'
}
function fmtSize(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)} MB` : n >= 1000 ? `${Math.round(n / 1000)} KB` : `${n} B`
}
function fileToDraft(file: File): Promise<Draft> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ filename: file.name, contentType: file.type || 'application/octet-stream', size: file.size, content_b64: String(reader.result).split(',')[1] ?? '' })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function MailBox() {
  const [folder, setFolder] = useState<'all' | 'inbox' | 'outbox'>('all')
  const [box, setBox] = useState<string>('')
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([])
  const [rows, setRows] = useState<MailRow[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<MailFull | null>(null)
  const [composing, setComposing] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!API_MODE) return
    setLoading(true)
    try {
      const q = new URLSearchParams()
      if (folder !== 'all') q.set('dir', folder)
      if (box) q.set('box', box)
      const list = await apiGet<MailRow[]>(`/mail?${q.toString()}`)
      setRows(list)
    } catch (e) { setNotice(e instanceof Error ? e.message : 'Failed to load mail.') }
    finally { setLoading(false) }
  }, [folder, box])

  useEffect(() => { if (API_MODE) apiGet<Mailbox[]>('/mailboxes').then(setMailboxes).catch(() => {}) }, [])
  useEffect(() => { void load() }, [load])

  async function openMessage(id: string) {
    try { setSelected(await apiGet<MailFull>(`/mail/${id}`)) } catch (e) { setNotice(e instanceof Error ? e.message : 'Failed to open message.') }
  }

  if (!API_MODE) {
    return (
      <PageContainer>
        <PageHeader title="Mail Box" description="Send and receive email from your Nishany addresses." />
        <Panel className="p-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-warning-tint text-warning"><Icon icon={Info} size={22} /></span>
          <h2 className="mt-4 font-serif text-[19px] font-semibold text-ink">The Mail Box needs the backend</h2>
          <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-2">
            Mail sending, the inbox, and attachments run through the Maristana API (Resend + database). Set <code className="rounded bg-inset px-1 font-mono text-[12px]">VITE_API_BASE</code> and deploy <code className="rounded bg-inset px-1 font-mono text-[12px]">server/</code> — see <b>DEPLOY-STEPS.md</b> — then this page goes live.
          </p>
          <p className="mt-3 font-mono text-[11px] text-ink-3">RESEND_API_KEY → server · VITE_API_BASE → app</p>
        </Panel>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="max-w-[92rem]">
      <PageHeader
        title="Mail Box"
        description="Every message sent and received — automations, campaigns and replies — with attachments."
        actions={<><ButtonLink to="/admin/email" variant="secondary" size="md" iconLeft={Zap}>Automations</ButtonLink><Button variant="secondary" size="md" iconLeft={RefreshCw} onClick={() => void load()}>Refresh</Button><Button variant="primary" size="md" iconLeft={Plus} onClick={() => { setComposing(true); setSelected(null) }}>Compose</Button></>}
      />

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 px-4 py-2.5 text-[13px] text-ink">
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      <div className="grid items-start gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
        {/* Left: folders + addresses */}
        <div className="space-y-4">
          <Panel className="p-2">
            {([['all', 'All mail', Mail], ['inbox', 'Inbox', Inbox], ['outbox', 'Outbox', Send]] as const).map(([val, label, icon]) => (
              <button key={val} type="button" onClick={() => setFolder(val)} className={cn('flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-[13.5px] font-medium', folder === val ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset')}>
                <Icon icon={icon} size={16} />{label}
              </button>
            ))}
          </Panel>
          <MailboxPanel box={box} mailboxes={mailboxes} onSelect={setBox} onCreated={(m) => { setMailboxes((cur) => [...cur, m]); setNotice(`Address ${m.address} added.`) }} onError={setNotice} />
        </div>

        {/* Right: list + reader/compose */}
        <div className="min-w-0">
          {composing ? (
            <Compose mailboxes={mailboxes} onClose={() => setComposing(false)} onSent={() => { setComposing(false); setFolder('outbox'); void load(); setNotice('Message sent.') }} onError={setNotice} />
          ) : selected ? (
            <Reader mail={selected} onBack={() => setSelected(null)} />
          ) : (
            <Panel className="overflow-hidden">
              <PanelHeader title={folder === 'inbox' ? 'Inbox' : folder === 'outbox' ? 'Outbox' : 'All mail'} icon={folder === 'inbox' ? Inbox : folder === 'outbox' ? Send : Mail} hint={`${rows.length} messages${box ? ` · ${box}` : ''}`} />
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-ink-3"><NishanyLoader size={20} label="Loading…" />Loading…</div>
              ) : rows.length === 0 ? (
                <div className="px-5 py-16 text-center"><Icon icon={Mail} size={22} className="mx-auto text-ink-3" /><p className="mt-2 text-[13px] font-medium text-ink">No messages</p><p className="mt-1 text-[12px] text-ink-3">Compose one, or wait for inbound mail.</p></div>
              ) : (
                <ul className="divide-y divide-line">
                  {rows.map((m) => (
                    <li key={m.id}>
                      <button type="button" onClick={() => void openMessage(m.id)} className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset/60">
                        <Icon icon={m.direction === 'inbound' ? Inbox : Send} size={15} className="shrink-0 text-ink-3" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-[13px] font-medium text-ink">{m.subject || '(no subject)'}</span>
                            {m.attachmentCount > 0 && <Icon icon={Paperclip} size={12} className="shrink-0 text-ink-3" />}
                          </div>
                          <p className="mt-0.5 truncate text-[11.5px] text-ink-3">{m.direction === 'inbound' ? m.fromAddr : `To: ${m.toAddr}`}</p>
                        </div>
                        <Badge tone={statusTone(m.status)}>{m.status}</Badge>
                        <span className="hidden shrink-0 whitespace-nowrap text-[11px] text-ink-3 sm:block">{m.at ? formatDateTime(new Date(m.at)) : ''}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

function MailboxPanel({ box, mailboxes, onSelect, onCreated, onError }: { box: string; mailboxes: Mailbox[]; onSelect: (b: string) => void; onCreated: (m: Mailbox) => void; onError: (s: string) => void }) {
  const [adding, setAdding] = useState(false)
  const [local, setLocal] = useState('')
  const create = async () => {
    const l = local.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')
    if (!l) return
    const address = `${l}@nishany.com`
    try { await apiPost('/mailboxes', { address, label: address }); onCreated({ address, label: address }); setLocal(''); setAdding(false) }
    catch (e) { onError(e instanceof Error ? e.message : 'Failed to create address.') }
  }
  return (
    <Panel className="overflow-hidden">
      <PanelHeader title="Addresses" icon={AtSign} action={<IconButton icon={Plus} label="New address" size="sm" onClick={() => setAdding((v) => !v)} />} />
      <div className="p-2">
        <button type="button" onClick={() => onSelect('')} className={cn('flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-start text-[12.5px]', box === '' ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset')}>All addresses</button>
        <button type="button" onClick={() => onSelect(DEFAULT_FROM)} className={cn('flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-start text-[12.5px]', box === DEFAULT_FROM ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset')}>{DEFAULT_FROM}</button>
        {mailboxes.filter((m) => m.address !== DEFAULT_FROM).map((m) => (
          <button key={m.address} type="button" onClick={() => onSelect(m.address)} className={cn('flex w-full items-center gap-2 truncate rounded-md px-2.5 py-1.5 text-start text-[12.5px]', box === m.address ? 'bg-primary-tint font-medium text-primary-strong' : 'text-ink-2 hover:bg-inset')}>{m.address}</button>
        ))}
        {adding && (
          <form className="mt-2 flex items-center gap-1.5 border-t border-line pt-2" onSubmit={(e) => { e.preventDefault(); void create() }}>
            <TextInput value={local} onChange={(e) => setLocal(e.target.value)} placeholder="name" className="h-8 text-[12px]" autoFocus />
            <span className="whitespace-nowrap text-[11px] text-ink-3">@nishany.com</span>
            <Button type="submit" variant="primary" size="sm">Add</Button>
          </form>
        )}
      </div>
    </Panel>
  )
}

function Reader({ mail, onBack }: { mail: MailFull; onBack: () => void }) {
  const download = async (a: Attachment) => { try { await apiDownload(`/mail/attachment/${a.id}`, a.filename) } catch { /* ignore */ } }
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <Button variant="ghost" size="sm" iconLeft={ChevronLeft} onClick={onBack}>Back</Button>
        <Badge tone={statusTone(mail.status)}>{mail.status}</Badge>
      </div>
      <div className="border-b border-line p-5">
        <h2 className="font-serif text-[20px] font-semibold text-ink">{mail.subject || '(no subject)'}</h2>
        <dl className="mt-3 grid grid-cols-[4rem_1fr] gap-y-1 text-[12.5px]">
          <dt className="text-ink-3">From</dt><dd className="font-mono text-ink-2">{mail.fromAddr}</dd>
          <dt className="text-ink-3">To</dt><dd className="font-mono text-ink-2">{mail.toAddr}</dd>
          {mail.cc && <><dt className="text-ink-3">Cc</dt><dd className="font-mono text-ink-2">{mail.cc}</dd></>}
          <dt className="text-ink-3">When</dt><dd className="text-ink-2">{mail.at ? formatDateTime(new Date(mail.at)) : '—'}</dd>
        </dl>
      </div>
      {mail.attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-line bg-surface-2/40 p-4">
          {mail.attachments.map((a) => (
            <button key={a.id} type="button" onClick={() => void download(a)} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12px] text-ink-2 transition-colors hover:border-primary-line hover:text-primary-strong">
              <Icon icon={Paperclip} size={13} /><span className="max-w-[12rem] truncate">{a.filename}</span><span className="text-ink-3">{fmtSize(a.sizeBytes)}</span><Icon icon={Download} size={13} />
            </button>
          ))}
        </div>
      )}
      <div className="p-5">
        {mail.html ? (
          // Inbound HTML is attacker-controllable (it's whatever the sender's
          // mail client emitted), so it never touches innerHTML. A sandboxed
          // iframe with neither allow-scripts nor allow-same-origin renders it
          // in an opaque, scriptless origin that can't reach the parent page —
          // stronger than sanitizing, and needs no dependency.
          <iframe
            title="Message body"
            sandbox=""
            srcDoc={mail.html}
            className="h-[70vh] min-h-[320px] w-full rounded-md border border-line bg-white"
          />
        ) : (
          <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-ink">{mail.text || '(empty message)'}</pre>
        )}
      </div>
    </Panel>
  )
}

function Compose({ mailboxes, onClose, onSent, onError }: { mailboxes: Mailbox[]; onClose: () => void; onSent: () => void; onError: (s: string) => void }) {
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [atts, setAtts] = useState<Draft[]>([])
  const [sending, setSending] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const froms = [DEFAULT_FROM, ...mailboxes.map((m) => m.address).filter((a) => a !== DEFAULT_FROM)]

  async function addFiles(files: FileList | null) {
    if (!files) return
    const drafts = await Promise.all([...files].map(fileToDraft))
    setAtts((cur) => [...cur, ...drafts])
  }
  async function send() {
    if (!to.trim() || !subject.trim()) { onError('A recipient and subject are required.'); return }
    setSending(true)
    try {
      await apiPost('/mail/send', { from, to: to.split(',').map((s) => s.trim()).filter(Boolean), cc: cc.trim() || undefined, subject, text: body, attachments: atts })
      onSent()
    } catch (e) { onError(e instanceof Error ? e.message : 'Send failed.') }
    finally { setSending(false) }
  }
  return (
    <Panel className="overflow-hidden">
      <PanelHeader title="New message" icon={Send} action={<IconButton icon={X} label="Close" size="sm" onClick={onClose} />} />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="From"><Select value={from} onChange={(e) => setFrom(e.target.value)}>{froms.map((f) => <option key={f} value={f}>{f}</option>)}</Select></Field>
          <Field label="To" hint="Comma-separated for multiple"><TextInput value={to} onChange={(e) => setTo(e.target.value)} placeholder="student@example.com" /></Field>
        </div>
        <Field label="Cc"><TextInput value={cc} onChange={(e) => setCc(e.target.value)} placeholder="Optional" /></Field>
        <Field label="Subject"><TextInput value={subject} onChange={(e) => setSubject(e.target.value)} /></Field>
        <Field label="Message"><Textarea value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[12rem]" placeholder="Write your message…" /></Field>
        {atts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {atts.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12px] text-ink-2">
                <Icon icon={Paperclip} size={12} /><span className="max-w-[10rem] truncate">{a.filename}</span><span className="text-ink-3">{fmtSize(a.size)}</span>
                <button type="button" onClick={() => setAtts((cur) => cur.filter((_, j) => j !== i))} aria-label="Remove" className="text-ink-3 hover:text-danger"><Icon icon={X} size={12} /></button>
              </span>
            ))}
          </div>
        )}
        <input ref={fileRef} type="file" multiple className="sr-only" onChange={(e) => { void addFiles(e.target.files); e.target.value = '' }} />
        <div className="flex items-center justify-between gap-2 border-t border-line pt-3">
          <Button variant="secondary" size="sm" iconLeft={Paperclip} onClick={() => fileRef.current?.click()}>Attach</Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" iconLeft={Send} onClick={() => void send()} disabled={sending} loading={sending}>Send</Button>
          </div>
        </div>
      </div>
    </Panel>
  )
}
