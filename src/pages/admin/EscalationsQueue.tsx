import { useMemo, useState } from 'react'
import { ArrowLeft, Siren, Undo2, UserCog, CircleCheck, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, Textarea } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import { useAdminEscalations } from '@/lib/content/adminContentClient'
import { saveLedgerChanges } from '@/lib/content/adminLedgerWrite'
import { useIdentity } from '@/lib/useIdentity'
import { useI18n } from '@/lib/i18n'
import { ROLE_LABEL, type EffectiveRole } from '@/data/adminRoles'
import {
  mediaRequestsOf,
  type ManagedContentItem, type MediaRequest, type MediaRequestOwnerKind,
  type MediaRequestEscalation, type MediaEscalationEvent, type EscalationStatus,
} from '@/data/contentControl'
import { StudentFaithfulPreview, type PreviewAnchor } from '@/components/review/StudentFaithfulPreview'
import { FilterBar } from '@/components/filters/FilterBar'
import { useFilterState } from '@/components/filters/useFilterState'

/**
 * The editors' and super admins' queue for media requests a reviewer could not
 * complete and handed up. It is a view onto the content ledger — an escalation
 * lives inside its media request — not a store of its own; returning, reassigning
 * and resolving are media-request edits the ledger write path already authorises
 * by rank. A reviewer and an admin never reach this page: the Escalations tab is
 * editor-and-above, enforced at the route and on the server.
 */

interface EscalationRow {
  requestId: string
  ownerId: string
  ownerTitle: string
  ownerKind: MediaRequestOwnerKind
  ownerStatus?: string
  request: MediaRequest
  escalation: MediaRequestEscalation
}

/** Set one media request inside an item, wherever it is nested. */
function patchMediaRequest<T>(value: T, requestId: string, patch: (request: MediaRequest) => MediaRequest): T {
  if (Array.isArray(value)) return value.map((entry) => patchMediaRequest(entry, requestId, patch)) as T
  if (!value || typeof value !== 'object') return value
  const record = value as Record<string, unknown>
  const next: Record<string, unknown> = {}
  for (const [key, inner] of Object.entries(record)) {
    if (key === 'mediaRequests' && Array.isArray(inner)) {
      next[key] = (inner as MediaRequest[]).map((request) => (request.id === requestId ? patch(request) : request))
    } else {
      next[key] = patchMediaRequest(inner, requestId, patch)
    }
  }
  return next as T
}

function ownerTitleOf(item: ManagedContentItem): string {
  const record = item as unknown as { title?: string; questionData?: { title?: string; stem?: string } }
  return record.title || record.questionData?.title || record.questionData?.stem || item.id
}

function anchorOf(request: MediaRequest): PreviewAnchor {
  return { section: request.section, slot: request.slot, answerLabel: request.answerLabel, quote: request.anchorQuote }
}

const STATUS_TONE: Record<EscalationStatus, 'warning' | 'primary' | 'success'> = {
  open: 'warning', returned: 'primary', resolved: 'success',
}

export function EscalationsQueue() {
  const { t } = useI18n()
  const identity = useIdentity()
  const canManage = identity.rank >= 2
  const actorRole = ROLE_LABEL[(identity.role ?? 'editor') as EffectiveRole]

  const { items: ledger, setItems: setLedger, loading, error: loadError } = useAdminEscalations()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [filters, setFilters] = useFilterState(
    { status: 'open', q: '', priority: [] as string[] },
    { enabled: true, prefix: 'esc.' },
  )

  const rows = useMemo<EscalationRow[]>(() => {
    const out: EscalationRow[] = []
    for (const item of ledger) {
      for (const request of mediaRequestsOf(item)) {
        if (!request.escalation) continue
        out.push({
          requestId: request.id, ownerId: item.id, ownerTitle: ownerTitleOf(item),
          ownerKind: request.ownerKind, ownerStatus: (item as { status?: string }).status,
          request, escalation: request.escalation,
        })
      }
    }
    return out.sort((a, b) => String(b.escalation.at).localeCompare(String(a.escalation.at)))
  }, [ledger])

  const counts = useMemo(() => ({
    open: rows.filter((row) => row.escalation.status === 'open').length,
    returned: rows.filter((row) => row.escalation.status === 'returned').length,
    resolved: rows.filter((row) => row.escalation.status === 'resolved').length,
    all: rows.length,
  }), [rows])

  const visible = useMemo(() => {
    const query = filters.q.trim().toLowerCase()
    const priorities = new Set(filters.priority)
    return rows.filter((row) => {
      if (filters.status !== 'all' && row.escalation.status !== filters.status) return false
      if (priorities.size && !priorities.has(row.escalation.priority)) return false
      if (query) {
        const haystack = `${row.ownerTitle} ${row.request.brief} ${row.escalation.reason} ${row.escalation.byName}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [rows, filters])

  const selected = visible.find((row) => row.requestId === selectedId) ?? null

  async function act(row: EscalationRow, nextStatus: EscalationStatus, action: MediaEscalationEvent['action']) {
    setError('')
    if (saving) return
    if (!canManage) { setError(t('Only an editor or super admin may act on an escalation.')); return }
    if (note.trim().length < 4) { setError(t('Add a short note explaining this decision.')); return }
    // `before` is the exact stored owner item (this slice ships full items), so
    // the delta applies rather than conflicts; `after` differs only in this one
    // request's escalation. The save names only this id — every other item in the
    // ledger is untouched.
    const before = ledger.find((item) => item.id === row.ownerId) ?? null
    if (!before) { setError(t('The owning content is no longer in the ledger.')); return }
    const event: MediaEscalationEvent = {
      at: new Date().toISOString(), actorId: identity.userId, actorName: identity.displayName,
      actorRole, action, note: note.trim(),
    }
    const after = patchMediaRequest(before, row.requestId, (request) => (
      request.escalation
        ? {
            ...request,
            escalation: {
              ...request.escalation,
              status: nextStatus,
              history: [...(request.escalation.history ?? []), event],
              handledBy: identity.displayName,
              handledAt: event.at,
            },
          }
        : request
    ))
    setSaving(true)
    try {
      await saveLedgerChanges([{ id: row.ownerId, before, after }])
      setLedger((items) => items.map((item) => (item.id === row.ownerId ? after : item)))
      setNote('')
    } catch {
      setError(t('That change could not be saved — somebody may have edited it first. Reload and try again.'))
    } finally {
      setSaving(false)
    }
  }

  const ownerItem = selected ? ledger.find((item) => item.id === selected.ownerId) ?? null : null

  return (
    <PageContainer>
      <PageHeader
        title={t('Escalations')}
        description={t('Media requests reviewers handed up because they could not complete them safely.')}
      />

      <FilterBar
        className="mt-4"
        searchValue={filters.q}
        onSearchChange={(value) => setFilters({ q: value })}
        searchLabel={t('Search escalations')}
        searchPlaceholder={t('Search by content, brief, reason or reviewer')}
        statusValue={filters.status}
        onStatusChange={(id) => setFilters({ status: id })}
        statusLabel={t('Filter by status')}
        statusTabs={[
          { id: 'open', label: t('Open'), count: counts.open },
          { id: 'returned', label: t('Returned'), count: counts.returned },
          { id: 'resolved', label: t('Resolved'), count: counts.resolved },
          { id: 'all', label: t('All'), count: counts.all },
        ]}
        secondaryFilters={[{
          id: 'priority', label: t('Priority'), type: 'multi',
          options: [
            { id: 'urgent', label: t('urgent') },
            { id: 'high', label: t('high') },
            { id: 'normal', label: t('normal') },
          ],
        }]}
        secondaryValue={{ priority: filters.priority }}
        onSecondaryChange={(value) => setFilters({ priority: value.priority ?? [] })}
        resultCount={visible.length}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <Panel>
          <PanelHeader title={t('Queue')} />
          {visible.length === 0 ? (
            <EmptyState
              icon={loadError ? TriangleAlert : Siren}
              title={loadError
                ? t('Could not load escalations')
                : loading
                  ? t('Loading escalations…')
                  : counts.all === 0 ? t('No escalations') : t('Nothing matches these filters')}
              description={loadError
                ? t('Reload the page to try again.')
                : loading
                  ? t('Fetching the escalation queue.')
                  : counts.all === 0
                    ? t('When a reviewer escalates a media request, it appears here for you to return or resolve.')
                    : t('Widen the filters to see the rest of the queue.')}
            />
          ) : (
            <ul className="divide-y divide-line">
              {visible.map((row) => (
                <li key={row.requestId}>
                  <button
                    type="button"
                    onClick={() => { setSelectedId(row.requestId); setNote(''); setError('') }}
                    className={cn(
                      'flex w-full flex-col gap-1 px-3 py-2.5 text-start transition-colors hover:bg-inset',
                      selectedId === row.requestId && 'bg-inset',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Badge tone={STATUS_TONE[row.escalation.status]}>{t(row.escalation.status)}</Badge>
                      <Badge tone={row.escalation.priority === 'urgent' ? 'danger' : row.escalation.priority === 'high' ? 'warning' : 'neutral'}>
                        {t(row.escalation.priority)}
                      </Badge>
                      {row.ownerStatus === 'Archived' && <Badge tone="neutral">{t('Archived owner')}</Badge>}
                    </span>
                    <span className="text-[13px] font-medium text-ink line-clamp-2">{row.ownerTitle}</span>
                    <span className="text-[11.5px] text-ink-3 line-clamp-1">{row.request.brief}</span>
                    <span className="text-[11px] text-ink-3">{t('by')} {row.escalation.byName}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {selected ? (
          <Panel>
            <PanelHeader
              title={selected.ownerTitle}
              action={<Button size="sm" variant="ghost" iconLeft={ArrowLeft} onClick={() => setSelectedId(null)}>{t('Close')}</Button>}
            />
            <div className="grid gap-4 p-4 xl:grid-cols-2">
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Reported content')}</p>
                {ownerItem
                  ? <StudentFaithfulPreview item={ownerItem} anchor={anchorOf(selected.request)} revealAnswer />
                  : <EmptyState icon={TriangleAlert} title={t('Content not found')} description={t('The owning content is no longer in the ledger.')} />}
              </div>

              <div className="min-w-0 space-y-4">
                <div className="rounded-lg border border-warning-line bg-warning-tint p-3">
                  <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-warning">
                    <Icon icon={Siren} size={15} />{t('Escalation')} · {t(selected.escalation.status)} · {t(selected.escalation.priority)}
                  </p>
                  <p className="mt-1 text-[12.5px] text-ink">{selected.escalation.reason}</p>
                  <p className="mt-1 text-[11px] text-ink-3">
                    {t('Raised by')} {selected.escalation.byName} ({selected.escalation.byRole}) · {new Date(selected.escalation.at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Request')}</p>
                  <p className="text-[12.5px] text-ink">{selected.request.brief}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3">{selected.request.teachingPurpose}</p>
                </div>

                {(selected.escalation.history ?? []).length > 0 && (
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('History')}</p>
                    <ol className="space-y-1.5">
                      {selected.escalation.history.map((entry, index) => (
                        <li key={index} className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-[11.5px]">
                          <span className="font-medium text-ink">{t(entry.action)}</span>
                          <span className="text-ink-3"> · {entry.actorName} ({entry.actorRole}) · {new Date(entry.at).toLocaleString()}</span>
                          {entry.note && <p className="mt-0.5 text-ink-2">{entry.note}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {canManage && selected.escalation.status !== 'resolved' && (
                  <div className="space-y-2">
                    <Field label={t('Decision note')} hint={t('Recorded in the escalation history.')}>
                      <Textarea className="min-h-16" value={note} onChange={(event) => setNote(event.target.value)} placeholder={t('Why are you returning, reassigning or resolving this?')} />
                    </Field>
                    {error && <p role="alert" className="text-[12px] text-danger">{error}</p>}
                    <div className="flex flex-wrap gap-1.5">
                      <Button size="sm" variant="secondary" iconLeft={Undo2} loading={saving} onClick={() => void act(selected, 'returned', 'returned')}>{t('Return to reviewer')}</Button>
                      <Button size="sm" variant="ghost" iconLeft={UserCog} disabled={saving} onClick={() => void act(selected, 'open', 'reassigned')}>{t('Reassign')}</Button>
                      <Button size="sm" variant="primary" iconLeft={CircleCheck} disabled={saving} onClick={() => void act(selected, 'resolved', 'resolved')}>{t('Resolve')}</Button>
                    </div>
                  </div>
                )}
                {selected.escalation.status === 'resolved' && (
                  <p className="rounded-md border border-success-line bg-success-tint px-2.5 py-1.5 text-[12px] text-success">
                    {t('Resolved by')} {selected.escalation.handledBy ?? '—'}
                  </p>
                )}
              </div>
            </div>
          </Panel>
        ) : (
          <Panel className="grid place-items-center p-10">
            <EmptyState icon={Siren} title={t('Select an escalation')} description={t('Choose one from the queue to review and act on it.')} />
          </Panel>
        )}
      </div>
    </PageContainer>
  )
}

export default EscalationsQueue
