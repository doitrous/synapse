import { useMemo, useState } from 'react'
import { Check, CircleAlert, CircleCheck, Flag, MessageSquareText, X } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, SearchInput, Select, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { formatDateTime } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  initialContentReports,
  REPORT_STORAGE_KEY,
  type ContentReport,
  type ReportStatus,
} from '@/data/contentReports'
import { cn } from '@/lib/cn'

const statuses: Array<ReportStatus | 'All'> = ['All', 'Open', 'In review', 'Resolved', 'Dismissed']

function statusTone(status: ReportStatus): 'danger' | 'warning' | 'success' | 'neutral' {
  if (status === 'Open') return 'danger'
  if (status === 'In review') return 'warning'
  if (status === 'Resolved') return 'success'
  return 'neutral'
}

export function ReportsReview() {
  const [reports, setReports] = usePersistentState<ContentReport[]>(REPORT_STORAGE_KEY, initialContentReports)
  const [status, setStatus] = useState<ReportStatus | 'All'>('All')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(reports[0]?.id ?? '')
  const selected = reports.find((report) => report.id === selectedId) ?? reports[0]
  const [reviewNote, setReviewNote] = useState(selected?.reviewNote ?? '')

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return reports
      .filter((report) => status === 'All' || report.status === status)
      .filter((report) => !normalized || `${report.contentTitle} ${report.note} ${report.category} ${report.reporterName}`.toLowerCase().includes(normalized))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [query, reports, status])

  const openCount = reports.filter((report) => report.status === 'Open' || report.status === 'In review').length

  function updateReport(nextStatus: ReportStatus) {
    if (!selected) return
    const now = new Date().toISOString()
    setReports((current) => current.map((report) => report.id === selected.id ? {
      ...report,
      status: nextStatus,
      reviewNote: reviewNote.trim(),
      reviewedAt: now,
      reviewedBy: 'Curriculum admin',
    } : report))
  }

  function openReport(report: ContentReport) {
    setSelectedId(report.id)
    setReviewNote(report.reviewNote ?? '')
    if (report.status === 'Open') {
      setReports((current) => current.map((item) => item.id === report.id ? { ...item, status: 'In review' } : item))
    }
  }

  return (
    <PageContainer>
      <PageHeader title="Content reports" description="Review notes submitted against questions, library articles, and teaching images. Every report stays attached to the exact content students saw." actions={<Badge tone={openCount ? 'warning' : 'success'}>{openCount} need attention</Badge>} />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(20rem,0.9fr)_minmax(26rem,1.1fr)]">
        <Panel className="overflow-hidden">
          <PanelHeader title="Review queue" icon={Flag} hint={`${rows.length} shown`} />
          <div className="grid gap-2 border-b border-line bg-surface-2/45 p-3 sm:grid-cols-[1fr_10rem]">
            <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reports…" />
            <Select value={status} onChange={(event) => setStatus(event.target.value as ReportStatus | 'All')}>{statuses.map((option) => <option key={option}>{option}</option>)}</Select>
          </div>
          <div className="max-h-[42rem] overflow-y-auto">
            {rows.map((report) => (
              <button key={report.id} type="button" onClick={() => openReport(report)} className={cn('flex w-full items-start gap-3 border-b border-line px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-inset/60', selected?.id === report.id && 'bg-accent-tint/45')}>
                <span className={cn('mt-0.5 grid size-8 shrink-0 place-items-center rounded-md', report.status === 'Open' ? 'bg-danger-tint text-danger' : 'bg-inset text-ink-2')}><Icon icon={report.contentKind === 'image' ? CircleAlert : MessageSquareText} size={15} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2"><strong className="line-clamp-1 text-[13px] text-ink">{report.contentTitle}</strong><Badge tone={statusTone(report.status)}>{report.status}</Badge></span>
                  <span className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-2">{report.note}</span>
                  <span className="mt-1.5 block font-mono text-[10.5px] text-ink-3">{report.reporterRole} · {formatDateTime(new Date(report.createdAt))}</span>
                </span>
              </button>
            ))}
            {rows.length === 0 && <div className="px-5 py-12 text-center"><Icon icon={CircleCheck} size={22} className="mx-auto text-success" /><p className="mt-2 text-[13px] font-semibold text-ink">No matching reports</p><p className="mt-1 text-[12px] text-ink-3">The selected queue is clear.</p></div>}
          </div>
        </Panel>

        <Panel className="overflow-hidden xl:sticky xl:top-20">
          {selected ? (
            <>
              <PanelHeader title="Review report" hint={selected.id} icon={MessageSquareText} action={<Badge tone={statusTone(selected.status)}>{selected.status}</Badge>} />
              <div className="space-y-5 p-4 sm:p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Reported content</p>
                  <h2 className="mt-1 text-[17px] font-bold leading-snug text-ink">{selected.contentTitle}</h2>
                  <p className="mt-1 text-[12px] text-ink-3">{selected.contentKind} · {selected.contentId}</p>
                </div>
                <div className="grid gap-3 rounded-lg border border-line bg-surface-2 p-4 sm:grid-cols-2">
                  <div><p className="text-[11px] text-ink-3">Reason</p><p className="mt-0.5 text-[13px] font-semibold text-ink">{selected.category}</p></div>
                  <div><p className="text-[11px] text-ink-3">Reported by</p><p className="mt-0.5 text-[13px] font-semibold text-ink">{selected.reporterName} · {selected.reporterRole}</p></div>
                </div>
                <div className="rounded-lg border border-accent-line bg-accent-tint/35 p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent-strong">Reporter note</p><p className="mt-2 text-[14px] leading-relaxed text-ink">{selected.note}</p></div>
                <Field label="Reviewer note" htmlFor="review-note" hint="Record what was checked or changed. This remains in the review history.">
                  <Textarea id="review-note" value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} className="min-h-28" placeholder="Checked against guidance; answer key updated…" />
                </Field>
                <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
                  <Button variant="ghost" iconLeft={X} onClick={() => updateReport('Dismissed')}>Dismiss</Button>
                  <Button variant="secondary" onClick={() => updateReport('In review')}>Save review note</Button>
                  <Button variant="primary" iconLeft={Check} onClick={() => updateReport('Resolved')} disabled={!reviewNote.trim()}>Resolve report</Button>
                </div>
              </div>
            </>
          ) : <div className="px-5 py-16 text-center text-[13px] text-ink-3">Select a report to review it.</div>}
        </Panel>
      </div>
    </PageContainer>
  )
}
