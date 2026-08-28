import { useEffect, useMemo, useState } from 'react'
import {
  Archive, ArchiveRestore, Check, ChevronRight, CircleAlert, Eye, Flag, ListChecks,
  MessageSquareText, RotateCcw, Trash2, X,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Collapse } from '@/components/ui/Collapse'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { catalogueAvailability } from '@/lib/catalogueAvailability'
import { formatDateTime } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'
import { API_MODE, apiPost, ApiError, errorKind } from '@/lib/api'
import { invalidateEntry } from '@/lib/stateStore'
import { cn } from '@/lib/cn'
import {
  initialContentReports,
  REPORT_STORAGE_KEY,
  REVIEWER_HIDDEN_STATUSES,
  type ContentReport,
  type ContentReportEvent,
  type ReportEventAction,
  type ReportContentKind,
  type ReportStatus,
} from '@/data/contentReports'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent,
  type ManagedContentItem,
} from '@/data/contentControl'
import { StudentFaithfulPreview } from '@/components/review/StudentFaithfulPreview'
import { reporterRoleLabel } from '@/components/reports/reportRoleLabel'
import { deletionConfirmed } from '@/components/reports/reportDeleteConfirmation'
import { reportPreviewAnchor } from '@/components/reports/reportPreviewAnchor'
import { FilterBar } from '@/components/filters/FilterBar'
import { useFilterState } from '@/components/filters/useFilterState'
import type { SecondaryFilterDef, StatusTabOption } from '@/components/filters/types'

/** Every status a report can be filtered to, in display order. Archived is appended only for a super admin — see `visibleReports` below. */
const CORE_STATUSES: ReportStatus[] = ['Open', 'In review', 'Resolved', 'Dismissed']

const CONTENT_KINDS: ReportContentKind[] = ['question', 'library article', 'image']

function statusTone(status: ReportStatus): 'danger' | 'warning' | 'success' | 'neutral' {
  if (status === 'Open') return 'danger'
  if (status === 'In review') return 'warning'
  if (status === 'Resolved') return 'success'
  return 'neutral'
}

const EVENT_LABEL: Record<ReportEventAction, string> = {
  created: 'Filed',
  note: 'Follow-up note',
  'in-review': 'Put in review',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
  reopened: 'Reopened',
  archived: 'Archived',
  unarchived: 'Unarchived',
}

const EVENT_TONE: Record<ReportEventAction, 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline'> = {
  created: 'primary',
  note: 'neutral',
  'in-review': 'warning',
  resolved: 'success',
  dismissed: 'neutral',
  reopened: 'warning',
  archived: 'danger',
  unarchived: 'accent',
}

/**
 * The status a report was in immediately before it was archived, replayed
 * from its own history rather than stored on the report itself. There is no
 * separate "status before archiving" field — the append-only event log is
 * already the record of that, so unarchiving reads it from there instead of
 * guessing "Open" for a report that was actually mid-review.
 */
function statusBeforeArchive(report: ContentReport): ReportStatus {
  const events = report.events ?? []
  const lastArchive = events.map((event) => event.action).lastIndexOf('archived')
  const scope = lastArchive === -1 ? events : events.slice(0, lastArchive)
  let status: ReportStatus = 'Open'
  for (const event of scope) {
    if (event.action === 'in-review') status = 'In review'
    else if (event.action === 'resolved') status = 'Resolved'
    else if (event.action === 'dismissed') status = 'Dismissed'
    else if (event.action === 'reopened' || event.action === 'created') status = 'Open'
  }
  return status
}

/**
 * Content Reports — the reviewer/editor/superadmin queue.
 *
 * Every write here goes through `usePersistentState`'s own setter, which is
 * what makes the role ladder real rather than decorative: the server re-runs
 * the same check this page uses to decide what to show (`authoriseReportChange`
 * in `server/src/contentReports.js`) and refuses anything that disagrees, so a
 * control that should not exist for this role is hidden here for clarity, not
 * for security. Creation is the one exception — it goes through
 * `POST /api/content-reports` inside `ReportContentDialog`, which is what lets
 * a student file one at all.
 */
export function ReportsReview() {
  const t = useT()
  const identity = useIdentity()
  const isSuperAdmin = identity.role === 'super_admin'
  const canNote = identity.rank >= 1
  const canDecide = identity.rank >= 2

  const [reports, setReports, reportsStatus] = usePersistentState<ContentReport[]>(REPORT_STORAGE_KEY, initialContentReports)
  const [ledger, , ledgerStatus] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  const [selectedId, setSelectedId] = useState('')
  const [noteDraft, setNoteDraft] = useState('')
  const [previewOpen, setPreviewOpen] = useState(true)
  // Deleted through the dedicated endpoint, ahead of the forced re-hydrate
  // landing — a live delete removes the row here so it does not sit visible
  // for the length of one round trip.
  const [pendingRemovals, setPendingRemovals] = useState<Set<string>>(new Set())

  const [filters, setFilters] = useFilterState(
    { q: '', status: 'all', kind: [] as string[] },
    { enabled: true, prefix: 'r.' },
  )

  // A reviewer's queue never carries archived work — the server already drops
  // it before the document reaches one (see index.js). Editors and admins hold
  // the tab that would otherwise show it too, but the archive shelf is reserved
  // for whoever can act on it: a super admin.
  const visibleReports = useMemo(
    () => reports.filter((report) => !pendingRemovals.has(report.id) && (isSuperAdmin || !REVIEWER_HIDDEN_STATUSES.includes(report.status))),
    [reports, pendingRemovals, isSuperAdmin],
  )

  const statusTabs: StatusTabOption[] = useMemo(() => {
    const statuses: ReportStatus[] = isSuperAdmin ? [...CORE_STATUSES, 'Archived'] : CORE_STATUSES
    return [
      { id: 'all', label: t('All'), count: visibleReports.length },
      ...statuses.map((status) => ({ id: status, label: t(status), count: visibleReports.filter((report) => report.status === status).length })),
    ]
  }, [visibleReports, isSuperAdmin, t])

  const kindFilter: SecondaryFilterDef = useMemo(() => ({
    id: 'kind',
    label: t('Content type'),
    type: 'multi',
    options: CONTENT_KINDS.map((kind) => ({ id: kind, label: t(kind) })),
  }), [t])

  const rows = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return visibleReports
      .filter((report) => filters.status === 'all' || report.status === filters.status)
      .filter((report) => filters.kind.length === 0 || filters.kind.includes(report.contentKind))
      .filter((report) => !q || `${report.contentTitle} ${report.note} ${report.category} ${report.reporterName} ${report.contentId}`.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [visibleReports, filters])

  const openCount = visibleReports.filter((report) => report.status === 'Open' || report.status === 'In review').length

  // Kept findable by id even when a status change or search moves it out of
  // `rows` — the detail panel should not go blank just because the report
  // just acted on no longer matches the tab that was open when it was clicked.
  const selected = useMemo(() => visibleReports.find((report) => report.id === selectedId) ?? null, [visibleReports, selectedId])

  useEffect(() => { setNoteDraft('') }, [selected?.id])

  const previewItem = useMemo(
    () => (selected ? ledger.find((item) => item.id === selected.contentId) ?? null : null),
    [ledger, selected],
  )
  const previewAvailability = catalogueAvailability({
    statuses: [{ hydrated: ledgerStatus.hydrated, error: ledgerStatus.error }],
    itemCount: previewItem ? 1 : 0,
  })

  const listAvailability = catalogueAvailability({
    statuses: [{ hydrated: reportsStatus.hydrated, error: reportsStatus.error }],
    itemCount: rows.length,
  })

  function actorEvent(action: ReportEventAction, note?: string): ContentReportEvent {
    return {
      at: new Date().toISOString(),
      actorId: identity.userId,
      actorName: identity.displayName,
      actorRole: reporterRoleLabel(identity.role),
      action,
      note: note?.trim() || undefined,
    }
  }

  function addNote() {
    if (!selected || !noteDraft.trim()) return
    const event = actorEvent('note', noteDraft)
    setReports((current) => current.map((report) => report.id === selected.id
      ? { ...report, events: [...(report.events ?? []), event] }
      : report))
    setNoteDraft('')
  }

  function decide(action: 'in-review' | 'resolved' | 'dismissed' | 'reopened', nextStatus: ReportStatus) {
    if (!selected) return
    const event = actorEvent(action, noteDraft)
    const isDecision = action === 'resolved' || action === 'dismissed'
    setReports((current) => current.map((report) => report.id === selected.id
      ? {
        ...report,
        status: nextStatus,
        ...(isDecision ? { reviewedAt: event.at, reviewedBy: identity.displayName, reviewNote: noteDraft.trim() || undefined } : {}),
        events: [...(report.events ?? []), event],
      }
      : report))
    setNoteDraft('')
  }

  function archive() {
    if (!selected) return
    const event = actorEvent('archived', noteDraft)
    setReports((current) => current.map((report) => report.id === selected.id
      ? { ...report, status: 'Archived', archivedAt: event.at, archivedBy: identity.displayName, events: [...(report.events ?? []), event] }
      : report))
    setNoteDraft('')
  }

  function unarchive() {
    if (!selected) return
    const restored = statusBeforeArchive(selected)
    const event = actorEvent('unarchived', noteDraft)
    setReports((current) => current.map((report) => report.id === selected.id
      ? { ...report, status: restored, events: [...(report.events ?? []), event] }
      : report))
    setNoteDraft('')
  }

  async function performDelete(report: ContentReport, confirmation: string, reason: string): Promise<void> {
    if (API_MODE) {
      await apiPost(`/content-reports/${encodeURIComponent(report.id)}/delete`, { confirmation, reason: reason.trim() || undefined })
      // The delete endpoint writes straight to the row this document lives in,
      // bypassing this hook's own setter entirely — nothing else would tell
      // this cache the report is gone.
      invalidateEntry(REPORT_STORAGE_KEY)
      setPendingRemovals((current) => new Set(current).add(report.id))
    } else {
      if (!deletionConfirmed(report, confirmation)) throw new Error('confirmation_mismatch')
      setReports((current) => current.filter((candidate) => candidate.id !== report.id))
    }
    if (selectedId === report.id) setSelectedId('')
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Content reports')}
        description={t('Review notes submitted against questions, library articles, and teaching images. Every report stays attached to the exact content students saw.')}
        actions={<Badge tone={openCount ? 'warning' : 'success'}>{openCount} {t('need attention')}</Badge>}
      />

      <Panel className="mb-5 overflow-hidden border-primary-line bg-primary-tint/25">
        <div className="p-4 sm:p-5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">
            <Icon icon={ListChecks} size={13} />{t('Reviewer workflow')}
          </p>
          <ol className="mt-3 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              t('Open the affected content in its student-faithful view.'),
              t('Identify the exact incorrect or problematic area.'),
              t('Submit a clear report with the right anchor and evidence.'),
              t('Add follow-up information if requested.'),
            ].map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-[15px] font-bold text-on-primary">{index + 1}</span>
                <p className="pt-1 text-[14px] font-medium leading-snug text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      {reportsStatus.conflict && (
        <p role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2.5 text-[12.5px] leading-relaxed text-danger">
          <Icon icon={CircleAlert} size={15} className="mt-0.5 shrink-0" />
          {reportsStatus.conflict}
        </p>
      )}

      <FilterBar
        className="mb-4"
        searchValue={filters.q}
        onSearchChange={(q) => setFilters({ q })}
        searchPlaceholder={t('Search title, note, category, reporter')}
        statusTabs={statusTabs}
        statusValue={filters.status}
        onStatusChange={(status) => setFilters({ status })}
        secondaryFilters={[kindFilter]}
        secondaryValue={{ kind: filters.kind }}
        onSecondaryChange={(next) => setFilters({ kind: next.kind ?? [] })}
        resultCount={rows.length}
      />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(20rem,0.9fr)_minmax(28rem,1.2fr)]">
        <Panel className="overflow-hidden">
          <PanelHeader title={t('Review queue')} icon={Flag} hint={`${rows.length} ${t('shown')}`} />
          {listAvailability.kind !== 'ready' ? (
            <CatalogueUnavailable
              availability={listAvailability}
              empty={{
                title: reports.length ? t('Nothing matches these filters') : t('No reports yet'),
                description: reports.length
                  ? t('Widen the filters to see the rest of the queue.')
                  : t('Reports filed by students and reviewers will appear here.'),
              }}
            />
          ) : (
            <div className="max-h-[42rem] overflow-y-auto">
              {rows.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setSelectedId(report.id)}
                  className={cn(
                    'flex w-full items-start gap-3 border-b border-line px-4 py-3 text-start transition-colors last:border-b-0 hover:bg-inset/60',
                    selected?.id === report.id && 'bg-primary-tint/45',
                  )}
                >
                  <span className={cn('mt-0.5 grid size-8 shrink-0 place-items-center rounded-md', report.status === 'Open' ? 'bg-danger-tint text-danger' : 'bg-inset text-ink-2')}>
                    <Icon icon={report.contentKind === 'image' ? CircleAlert : MessageSquareText} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <strong className="line-clamp-1 text-[13px] text-ink">{report.contentTitle}</strong>
                      <Badge tone={statusTone(report.status)}>{t(report.status)}</Badge>
                    </span>
                    <span className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-2">{report.note}</span>
                    <span className="mt-1.5 block font-mono text-[10.5px] text-ink-3">{report.reporterRole} · {formatDateTime(new Date(report.createdAt))}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </Panel>

        <Panel className="overflow-hidden xl:sticky xl:top-20">
          {selected ? (
            <ReportDetail
              key={selected.id}
              report={selected}
              t={t}
              canNote={canNote}
              canDecide={canDecide}
              isSuperAdmin={isSuperAdmin}
              noteDraft={noteDraft}
              onNoteDraftChange={setNoteDraft}
              onAddNote={addNote}
              onDecide={decide}
              onArchive={archive}
              onUnarchive={unarchive}
              onDelete={performDelete}
              previewOpen={previewOpen}
              onTogglePreview={() => setPreviewOpen((value) => !value)}
              previewItem={previewItem}
              previewAvailability={previewAvailability}
            />
          ) : (
            <div className="px-5 py-16 text-center text-[13px] text-ink-3">{t('Select a report to review it.')}</div>
          )}
        </Panel>
      </div>
    </PageContainer>
  )
}

function ReportDetail({
  report, t, canNote, canDecide, isSuperAdmin,
  noteDraft, onNoteDraftChange, onAddNote, onDecide, onArchive, onUnarchive, onDelete,
  previewOpen, onTogglePreview, previewItem, previewAvailability,
}: {
  report: ContentReport
  t: (value: string) => string
  canNote: boolean
  canDecide: boolean
  isSuperAdmin: boolean
  noteDraft: string
  onNoteDraftChange: (value: string) => void
  onAddNote: () => void
  onDecide: (action: 'in-review' | 'resolved' | 'dismissed' | 'reopened', nextStatus: ReportStatus) => void
  onArchive: () => void
  onUnarchive: () => void
  onDelete: (report: ContentReport, confirmation: string, reason: string) => Promise<void>
  previewOpen: boolean
  onTogglePreview: () => void
  previewItem: ManagedContentItem | null
  previewAvailability: ReturnType<typeof catalogueAvailability>
}) {
  const events = [...(report.events ?? [])].reverse()
  const canArchiveNow = isSuperAdmin && report.status !== 'Archived'
  const canUnarchiveNow = isSuperAdmin && report.status === 'Archived'
  const canDecideNow = canDecide && report.status !== 'Archived'

  return (
    <>
      <PanelHeader title={t('Review report')} hint={report.id} icon={MessageSquareText} action={<Badge tone={statusTone(report.status)}>{t(report.status)}</Badge>} />
      <div className="space-y-5 p-4 sm:p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Reported content')}</p>
          <h2 className="mt-1 text-[17px] font-bold leading-snug text-ink">{report.contentTitle}</h2>
          <p className="mt-1 text-[12px] text-ink-3">
            {t(report.contentKind)} · {report.contentId}
            {report.field && <> · {t('Field')}: {report.field}</>}
            {report.anchor && <> · {t('Anchor')}: “{report.anchor}”</>}
          </p>
        </div>

        <div className="grid gap-3 rounded-lg border border-line bg-surface-2 p-4 sm:grid-cols-2">
          <div><p className="text-[11px] text-ink-3">{t('Reason')}</p><p className="mt-0.5 text-[13px] font-semibold text-ink">{report.category}</p></div>
          <div><p className="text-[11px] text-ink-3">{t('Reported by')}</p><p className="mt-0.5 text-[13px] font-semibold text-ink">{report.reporterName} · {report.reporterRole}</p></div>
        </div>

        <div className="rounded-lg border border-primary-line bg-primary-tint/35 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">{t('Reporter note')}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-ink">{report.note}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface-2/30">
          <button type="button" onClick={onTogglePreview} className="flex w-full items-center justify-between gap-2 px-4 py-3 text-start" aria-expanded={previewOpen}>
            <span className="flex items-center gap-2 text-[12.5px] font-semibold text-ink"><Icon icon={Eye} size={15} />{t('Exactly as authored for students')}</span>
            <Icon icon={ChevronRight} size={15} open={previewOpen} className="chevron-turn text-ink-3" />
          </button>
          <Collapse open={previewOpen}>
            <div className="border-t border-line p-4">
              {previewAvailability.kind === 'ready' && previewItem ? (
                <StudentFaithfulPreview item={previewItem} anchor={reportPreviewAnchor(report)} />
              ) : (
                <CatalogueUnavailable
                  availability={previewAvailability}
                  empty={{
                    title: t('Content not found'),
                    description: t('This may have been removed from the ledger, or the report’s content id no longer matches a ledger item.'),
                  }}
                />
              )}
            </div>
          </Collapse>
        </div>

        {canNote && (
          <div className="space-y-2.5 border-t border-line pt-4">
            <Field
              label={t('Follow-up note')}
              htmlFor="report-followup"
              hint={t('Added to this report’s history and can never be edited or removed afterward.')}
            >
              <Textarea
                id="report-followup"
                value={noteDraft}
                onChange={(event) => onNoteDraftChange(event.target.value)}
                className="min-h-24"
                placeholder={t('Checked against guidance; answer key updated…')}
              />
            </Field>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm" iconLeft={MessageSquareText} disabled={!noteDraft.trim()} onClick={onAddNote}>{t('Add note')}</Button>
              {canDecideNow && report.status === 'Open' && (
                <Button variant="secondary" size="sm" onClick={() => onDecide('in-review', 'In review')}>{t('Put in review')}</Button>
              )}
              {canDecideNow && (report.status === 'Open' || report.status === 'In review') && (
                <>
                  <Button variant="primary" size="sm" iconLeft={Check} onClick={() => onDecide('resolved', 'Resolved')}>{t('Resolve')}</Button>
                  <Button variant="ghost" size="sm" iconLeft={X} onClick={() => onDecide('dismissed', 'Dismissed')}>{t('Dismiss')}</Button>
                </>
              )}
              {canDecideNow && (report.status === 'Resolved' || report.status === 'Dismissed') && (
                <Button variant="secondary" size="sm" iconLeft={RotateCcw} onClick={() => onDecide('reopened', 'Open')}>{t('Reopen')}</Button>
              )}
              {canArchiveNow && (
                <Button variant="ghost" size="sm" iconLeft={Archive} onClick={onArchive}>{t('Archive')}</Button>
              )}
              {canUnarchiveNow && (
                <Button variant="secondary" size="sm" iconLeft={ArchiveRestore} onClick={onUnarchive}>{t('Unarchive')}</Button>
              )}
            </div>
          </div>
        )}

        {events.length > 0 && (
          <div className="border-t border-line pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('History')}</p>
            <ol className="mt-2 space-y-2">
              {events.map((event, index) => (
                <li key={index} className="rounded-lg border border-line bg-surface-2/40 p-2.5">
                  <p className="flex flex-wrap items-center gap-1.5">
                    <Badge tone={EVENT_TONE[event.action]}>{t(EVENT_LABEL[event.action])}</Badge>
                    <span className="text-[11.5px] text-ink-3">{event.actorName} · {event.actorRole}</span>
                  </p>
                  {event.note && <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{event.note}</p>}
                  <p className="mt-1 text-[10.5px] text-ink-3">{formatDateTime(new Date(event.at))}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {isSuperAdmin && <DeleteReportControl report={report} t={t} onDelete={onDelete} />}

        {!canNote && (
          <p className="flex items-start gap-2 rounded-lg border border-line bg-surface-2/50 px-3 py-2.5 text-[12px] leading-relaxed text-ink-3">
            <Icon icon={CircleAlert} size={14} className="mt-0.5 shrink-0" />
            {t('Your account cannot act on reports. Console access is needed to add notes or change status.')}
          </p>
        )}
      </div>
    </>
  )
}

function DeleteReportControl({ report, t, onDelete }: {
  report: ContentReport
  t: (value: string) => string
  onDelete: (report: ContentReport, confirmation: string, reason: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = deletionConfirmed(report, confirmation)

  function reset() {
    setOpen(false)
    setConfirmation('')
    setReason('')
    setError('')
  }

  async function confirm() {
    if (!canSubmit || busy) return
    setBusy(true)
    setError('')
    try {
      await onDelete(report, confirmation.trim(), reason)
      reset()
    } catch (deleteError) {
      const kind = errorKind(deleteError)
      const body = deleteError instanceof ApiError && deleteError.body && typeof deleteError.body === 'object'
        ? (deleteError.body as { reason?: string }).reason
        : undefined
      const messages: Record<string, string> = {
        unauthorized: t('Sign in again to delete this report.'),
        forbidden: t('Only a super admin may delete a report.'),
        notfound: t('This report was already deleted.'),
        network: t('Could not reach the server. Check your connection and try again.'),
        server: t('The server could not delete this report. Try again.'),
      }
      setError(body || messages[kind] || t('Type the report id or its exact title to confirm.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-danger/30 bg-danger-tint/20 p-4">
      <p className="flex items-center gap-1.5 text-[12.5px] font-bold text-danger"><Icon icon={Trash2} size={14} />{t('Delete this report permanently')}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-2">{t('This removes the report from the record. A tombstone of who deleted it and when is kept, but the report itself cannot be recovered.')}</p>
      {!open ? (
        <Button variant="danger" size="sm" className="mt-3" iconLeft={Trash2} onClick={() => setOpen(true)}>{t('Delete permanently')}</Button>
      ) : (
        <div className="mt-3 space-y-2.5">
          <Field label={t('Type the report id or its exact title to confirm')} htmlFor="delete-confirmation" hint={report.id}>
            <TextInput id="delete-confirmation" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder={report.contentTitle} autoComplete="off" />
          </Field>
          <Field label={t('Reason (optional)')} htmlFor="delete-reason">
            <Textarea id="delete-reason" value={reason} onChange={(event) => setReason(event.target.value)} className="min-h-16" />
          </Field>
          {error && <p role="alert" className="text-[12px] text-danger">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={reset}>{t('Cancel')}</Button>
            <Button variant="danger" size="sm" iconLeft={Trash2} loading={busy} disabled={!canSubmit || busy} onClick={confirm}>{t('Confirm permanent delete')}</Button>
          </div>
        </div>
      )}
    </div>
  )
}
