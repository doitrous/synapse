import { useCallback, useEffect, useRef, useState } from 'react'
import { Archive, CircleCheck, Clock3, RefreshCw, ShieldAlert, TriangleAlert } from 'lucide-react'
import { API_MODE, apiPost } from '@/lib/api'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Dialog } from '@/components/ui/Dialog'
import { Field, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'

interface ArchivePreview {
  operationId: string
  selection: 'unassigned-modules-v1'
  expiresAt: string
  ledgerVersion: number | null
  ledgerDigest: string
  counts: { articles: number; questions: number; total: number }
  confirmationPhrase: string
  active: { studyRooms: number; challenges: number; partyQuestionSessions: number }
  blocked: boolean
  statusCounts?: Record<string, number>
  targets?: ArchiveTarget[]
}

interface ArchiveTarget {
  id: string
  title: string
  kind: 'article' | 'question'
  status: string
  source?: string | {
    origin?: string
    universityId?: string
    institution?: string
    reference?: string
  } | null
}

interface ArchiveReceipt {
  ok: true
  operationId: string
  counts: ArchivePreview['counts']
  archivedAt: string
  version: number
}

function errorText(error: unknown) {
  return error instanceof Error && error.message ? error.message : 'The archive could not be applied. Nothing was changed.'
}

const STATUS_ORDER = ['Published', 'In review', 'Draft', 'Archived']
const TARGET_PREVIEW_LIMIT = 60

function statusEntries(preview: ArchivePreview): Array<[string, number]> {
  const counts = preview.statusCounts ?? (preview.targets ?? []).reduce<Record<string, number>>((current, target) => {
    current[target.status] = (current[target.status] ?? 0) + 1
    return current
  }, {})
  return Object.entries(counts).sort(([left], [right]) => {
    const leftIndex = STATUS_ORDER.indexOf(left)
    const rightIndex = STATUS_ORDER.indexOf(right)
    if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right)
    if (leftIndex === -1) return 1
    if (rightIndex === -1) return -1
    return leftIndex - rightIndex
  })
}

function sourceText(source: ArchiveTarget['source']): string {
  if (!source) return 'Written here'
  if (typeof source === 'string') return source
  if (source.origin !== 'university') return source.institution || source.reference || 'Written here'
  return [source.universityId || source.institution || 'University source', source.reference].filter(Boolean).join(' · ')
}

function TargetPreview({ preview }: { preview: ArchivePreview }) {
  const targets = preview.targets ?? []
  if (!targets.length) return null
  const visible = targets.slice(0, TARGET_PREVIEW_LIMIT)

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-inset/35 px-3 py-2">
        <p className="text-[11.5px] font-semibold text-ink">Exact target preview</p>
        <p className="font-mono text-[10.5px] text-ink-3">
          {targets.length > visible.length ? `First ${visible.length} of ${targets.length}` : `${targets.length} records`}
        </p>
      </div>
      <ul className="max-h-52 divide-y divide-line overflow-y-auto overscroll-contain" aria-label="Content included in this archive snapshot">
        {visible.map((target) => (
          <li key={`${target.kind}-${target.id}`} className="grid gap-1 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-3">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-ink" title={target.title}>{target.title}</p>
              <p className="mt-0.5 truncate text-[10.5px] text-ink-3">
                <span className="capitalize">{target.kind}</span> · {sourceText(target.source)} · <span className="font-mono">{target.id}</span>
              </p>
            </div>
            <StatusBadge status={target.status} />
          </li>
        ))}
      </ul>
      {targets.length > visible.length && (
        <p className="border-t border-line bg-inset/25 px-3 py-2 text-[10.5px] text-ink-3">
          {targets.length - visible.length} additional records are retained in the exact server-side snapshot and included in the confirmation total.
        </p>
      )}
    </div>
  )
}

export function LegacyContentArchivePanel() {
  const [preview, setPreview] = useState<ArchivePreview | null>(null)
  const [receipt, setReceipt] = useState<ArchiveReceipt | null>(null)
  const [loading, setLoading] = useState(false)
  const [applying, setApplying] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const applyingRef = useRef(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (receipt) receiptRef.current?.focus()
  }, [receipt])

  // Dialog owns focus trapping in an effect keyed by onClose. Keeping this
  // callback stable prevents each keystroke from re-running that effect and
  // moving focus back to the first field.
  const closeDialog = useCallback(() => {
    if (!applyingRef.current) setDialogOpen(false)
  }, [])

  if (!API_MODE) return null

  async function loadPreview() {
    setLoading(true)
    setError('')
    setReceipt(null)
    try {
      setPreview(await apiPost<ArchivePreview>('/admin/content-archive/preview'))
      setConfirmation('')
    } catch (nextError) {
      setError(errorText(nextError))
    } finally {
      setLoading(false)
    }
  }

  async function applyArchive() {
    if (!preview) return
    applyingRef.current = true
    setApplying(true)
    setError('')
    try {
      const next = await apiPost<ArchiveReceipt>('/admin/content-archive/apply', {
        operationId: preview.operationId,
        confirmation,
        reason,
      })
      setReceipt(next)
      setDialogOpen(false)
    } catch (nextError) {
      setError(errorText(nextError))
    } finally {
      applyingRef.current = false
      setApplying(false)
    }
  }

  const activeTotal = preview
    ? preview.active.studyRooms + preview.active.challenges + preview.active.partyQuestionSessions
    : 0
  const ready = Boolean(preview && !preview.blocked && preview.counts.total > 0)
  const confirmed = Boolean(preview && confirmation === preview.confirmationPhrase && reason.trim().length >= 10)
  const workflowCounts = preview ? statusEntries(preview) : []

  return (
    <Panel className="mb-4 overflow-hidden border-line-2">
      <PanelHeader
        title="Unassigned content retirement"
        icon={Archive}
        hint="Exact snapshot · immutable audit receipt"
        action={
          <Button variant="secondary" size="sm" iconLeft={RefreshCw} loading={loading} onClick={() => void loadPreview()}>
            {preview ? 'Refresh preflight' : 'Run preflight'}
          </Button>
        }
      />
      <div className="space-y-4 p-4">
        <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
          Archive only questions and library articles with no module assignment in the exact snapshot reviewed here.
          Authored content remains recoverable, receives the Generated - No Module tag, and is retained in an immutable administrator audit record.
        </p>

        {error && (
          <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] text-danger">
            <Icon icon={TriangleAlert} size={15} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        {!preview && !receipt && (
          <div className="rounded-lg border border-dashed border-line-2 bg-inset/35 px-4 py-4 text-[12px] text-ink-3">
            Run the preflight to freeze the current item IDs, verify live study activity, and receive the exact confirmation phrase.
          </div>
        )}

        {preview && !receipt && (
          <div className="space-y-3">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ['Questions', preview.counts.questions],
                  ['Articles', preview.counts.articles],
                  ['Total records', preview.counts.total],
                  ['Affected group sessions', activeTotal],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-lg border border-line bg-inset/35 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-ink-3">{label}</p>
                    <p className="mt-1 font-mono text-[19px] font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
              <Button variant={ready ? 'danger' : 'secondary'} size="md" iconLeft={ShieldAlert} disabled={!ready} onClick={() => { setError(''); setDialogOpen(true) }}>
                Review archive
              </Button>
            </div>

            {workflowCounts.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-inset/25 px-3 py-2" aria-label="Workflow states included in this archive snapshot">
                <span className="me-1 text-[11px] font-semibold text-ink-2">Included states</span>
                {workflowCounts.map(([status, count]) => (
                  <span key={status} className="inline-flex items-center gap-1.5">
                    <StatusBadge status={status} />
                    <span className="font-mono text-[11px] font-semibold text-ink-2">{count}</span>
                  </span>
                ))}
              </div>
            )}

            <TargetPreview preview={preview} />
          </div>
        )}

        {preview && preview.counts.total === 0 && !receipt && (
          <div className="flex items-start gap-2 rounded-lg border border-success/25 bg-success-tint/55 px-3 py-2.5 text-[12px] leading-relaxed text-ink-2">
            <Icon icon={CircleCheck} size={15} className="mt-0.5 shrink-0 text-success" />
            <span><strong className="text-ink">Nothing to archive.</strong> Every current question and library article has a module assignment, or is already retired.</span>
          </div>
        )}

        {preview?.blocked && preview.counts.total > 0 && !receipt && (
          <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-tint/65 px-3 py-2.5 text-[12px] leading-relaxed text-ink-2">
            <Icon icon={Clock3} size={15} className="mt-0.5 shrink-0 text-warning" />
            <span><strong className="text-ink">Archive paused.</strong> A room, challenge, or party session contains one of these unassigned questions. Finish it, then refresh the preflight.</span>
          </div>
        )}

        {preview && !receipt && (
          <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-3">
            {preview.counts.total === 0 ? (
              <>
                <Badge tone="neutral">No archive targets</Badge>
                <span>No content will be changed by this snapshot.</span>
              </>
            ) : (
              <>
                <Badge tone={preview.blocked ? 'warning' : 'success'}>{preview.blocked ? 'Affected live activity found' : 'No affected group sessions'}</Badge>
                <span>Archived questions leave every student question bank immediately and are not served to new blocks.</span>
              </>
            )}
          </div>
        )}

        {receipt && (
          <div ref={receiptRef} role="status" tabIndex={-1} className="flex flex-col gap-3 rounded-lg border border-success/25 bg-success-tint/55 p-4 outline-none focus-visible:ring-2 focus-visible:ring-primary/35 sm:flex-row sm:items-center">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-success"><Icon icon={CircleCheck} size={18} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">Unassigned content archived</p>
              <p className="mt-0.5 text-[11.5px] text-ink-2">{receipt.counts.questions} questions and {receipt.counts.articles} articles · receipt {receipt.operationId}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>Reload archive</Button>
          </div>
        )}
      </div>

      {dialogOpen && preview && (
        <Dialog label="Confirm legacy content retirement" size="lg" onClose={closeDialog}>
          <div className="border-b border-line px-5 py-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-danger-tint text-danger"><Icon icon={Archive} size={19} /></span>
              <div>
                <h2 className="font-serif text-[20px] font-semibold text-ink">Archive this unassigned snapshot?</h2>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">
                  This retires {preview.counts.questions} questions and {preview.counts.articles} articles that have no module assignment. It removes any remaining university/year audience and does not delete authored content.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-5">
            {error && (
              <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] text-danger">
                <Icon icon={TriangleAlert} size={15} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}
            {workflowCounts.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-inset/30 px-3 py-2">
                <span className="text-[11px] font-semibold text-ink-2">This includes</span>
                {workflowCounts.map(([status, count]) => <Badge key={status} tone="outline">{count} {status}</Badge>)}
              </div>
            )}
            <Field label="Reason" htmlFor="legacy-archive-reason" hint="Stored with the immutable super-admin audit receipt.">
              <Textarea id="legacy-archive-reason" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why this unassigned content is being retired…" />
            </Field>
            <Field label="Type the exact confirmation phrase" htmlFor="legacy-archive-confirmation">
              <p className="mb-2 select-all rounded-md border border-line bg-inset px-3 py-2 font-mono text-[11.5px] font-semibold text-ink">{preview.confirmationPhrase}</p>
              <TextInput id="legacy-archive-confirmation" autoComplete="off" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
            </Field>
            <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
              <Button variant="secondary" size="md" disabled={applying} onClick={closeDialog}>Cancel</Button>
              <Button variant="danger" size="md" iconLeft={Archive} loading={applying} disabled={!confirmed} onClick={() => void applyArchive()}>
                Archive {preview.counts.total} records
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </Panel>
  )
}
