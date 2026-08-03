import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpenText,
  CircleCheck,
  FileQuestion,
  FolderOpen,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Send,
  Stethoscope,
  Trash2,
  Upload,
  Flag,
} from 'lucide-react'
import type { Status } from '@/data/admin'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  CONTENT_KIND_LABEL,
  initialManagedContent,
  type ContentKind,
  type ManagedContentItem,
} from '@/data/contentControl'
import { getSubject } from '@/data/student'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Tabs } from '@/components/ui/Tabs'
import { SearchInput, Select } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { SubjectDot } from '@/components/ui/Subject'
import { Icon } from '@/components/ui/Icon'
import { ContentEditorDialog, ConfirmDeleteDialog } from '@/components/admin/ContentEditorDialog'
import { QuestionEditorDialog } from '@/components/admin/QuestionEditorDialog'
import { LibraryArticleEditorDialog } from '@/components/admin/LibraryArticleEditorDialog'
import { PracticalEditorDialog } from '@/components/admin/PracticalEditorDialog'
import { initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatDateTime } from '@/lib/format'
import { removeStoredMedia } from '@/lib/mediaStorage'
import { initialContentReports, REPORT_STORAGE_KEY, type ContentReport } from '@/data/contentReports'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'

const KIND_ICON = {
  question: FileQuestion,
  article: BookOpenText,
  practical: Stethoscope,
  resource: FolderOpen,
}

const STATUSES: Array<Status | 'All'> = ['All', 'Draft', 'In review', 'Published', 'Archived']

function itemSummary(item: ManagedContentItem) {
  if (item.kind === 'question') return `${item.fields.Topic} · ${item.fields.Difficulty}`
  if (item.kind === 'article') return `${item.fields.Topic} · ${item.fields['Reading time']} min read`
  if (item.kind === 'practical') {
    const unit = item.fields.Type === 'Clinical case' ? 'decisions' : item.fields.Type?.includes('interpretation') ? 'questions' : 'marks'
    return `${item.fields.Type} · ${item.fields.Duration} min · ${item.fields.Marks} ${unit}`
  }
  return `${item.fields.Type} · ${item.fields.Source}`
}

function relativeUpdated(value: string) {
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime())
  const minutes = Math.floor(elapsed / 60_000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function ControlDashboard({ initialKind = 'question', lockedKind = false }: { initialKind?: ContentKind; lockedKind?: boolean }) {
  const [items, setItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [conceptGraph, setConceptGraph] = usePersistentState<ConceptGraph>('osler-concept-graph-v1', initialConceptGraph)
  const [kind, setKind] = useState<ContentKind>(initialKind)
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [query, setQuery] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<ManagedContentItem | null>(null)
  const [deleting, setDeleting] = useState<ManagedContentItem | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [reports] = usePersistentState<ContentReport[]>(REPORT_STORAGE_KEY, initialContentReports)
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  // Locked catalogue routes must be driven by the route prop, not by the
  // dashboard's internal tab state. React Router can reuse this component
  // between sibling routes, so relying on useState(initialKind) leaks the
  // previously visited catalogue into the next page.
  const activeKind = lockedKind ? initialKind : kind
  const scopedItems = useMemo(
    () => lockedKind ? items.filter((item) => item.kind === activeKind) : items,
    [activeKind, items, lockedKind],
  )

  const counts = useMemo(() => ({
    total: scopedItems.length,
    published: scopedItems.filter((item) => item.status === 'Published').length,
    review: scopedItems.filter((item) => item.status === 'In review').length,
    drafts: scopedItems.filter((item) => item.status === 'Draft').length,
  }), [scopedItems])

  const kindCounts = useMemo(() => ({
    question: items.filter((item) => item.kind === 'question').length,
    article: items.filter((item) => item.kind === 'article').length,
    practical: items.filter((item) => item.kind === 'practical').length,
    resource: items.filter((item) => item.kind === 'resource').length,
  }), [items])

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return items
      .filter((item) => item.kind === activeKind)
      .filter((item) => status === 'All' || item.status === status)
      .filter((item) => !normalized || `${item.title} ${item.owner} ${Object.values(item.fields).join(' ')}`.toLowerCase().includes(normalized))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }, [activeKind, items, query, status])

  const reviewQueue = useMemo(
    () => scopedItems.filter((item) => item.status === 'In review').sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 7),
    [scopedItems],
  )

  function openNew() {
    setEditing(null)
    setEditorOpen(true)
  }

  function saveItem(next: ManagedContentItem) {
    const exists = items.some((item) => item.id === next.id)
    setItems((current) => exists ? current.map((item) => item.id === next.id ? next : item) : [next, ...current])
    setEditorOpen(false)
    setEditing(null)
    setNotice(exists ? `${CONTENT_KIND_LABEL[next.kind].singular} updated.` : `${CONTENT_KIND_LABEL[next.kind].singular} added as ${next.status.toLowerCase()}.`)
  }

  function sendForReview(item: ManagedContentItem) {
    if (item.status === 'In review') return
    setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: 'In review', updatedAt: new Date().toISOString() } : candidate))
    setNotice(`“${item.title}” sent for review.`)
  }

  function deleteItem() {
    if (!deleting) return
    const deleted = deleting
    for (const attachment of deleted.questionData?.attachments ?? []) {
      void removeStoredMedia(attachment.url)
    }
    setItems((current) => current.filter((item) => item.id !== deleted.id))
    setDeleting(null)
    setNotice(`${CONTENT_KIND_LABEL[deleted.kind].singular} deleted.`)
  }

  return (
    <PageContainer>
      <PageHeader
        title={lockedKind ? `${CONTENT_KIND_LABEL[activeKind].plural} setup` : 'Content control'}
        description={lockedKind ? `Create, revise, review, and import ${CONTENT_KIND_LABEL[activeKind].plural.toLowerCase()} without leaving this catalogue.` : 'Create, revise, review, and remove everything students can open in the question bank, library, practical area, and resources.'}
        actions={<><Link to={`/admin/import/${activeKind}`}><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link><Button variant="primary" size="md" iconLeft={Plus} onClick={openNew}>Add {CONTENT_KIND_LABEL[activeKind].singular}</Button></>}
      />

      {notice && (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success-tint/70 px-4 py-2.5 text-[13px] text-ink">
          <Icon icon={CircleCheck} size={16} className="text-success" />
          <span className="flex-1">{notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-[12px] font-medium text-ink-3 hover:text-ink">Dismiss</button>
        </div>
      )}

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['All content', counts.total, 'Every managed student item'],
          ['Published', counts.published, 'Visible to students'],
          ['Awaiting review', counts.review, 'Needs faculty sign-off'],
          ['Drafts', counts.drafts, 'Not yet student-visible'],
        ].map(([label, value, hint], index) => (
          <Panel key={String(label)} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-medium text-ink-2">{label}</p>
              {index === 2 && Number(value) > 0 && <Badge tone="warning">Action needed</Badge>}
            </div>
            <p className="tnum mt-2 font-mono text-[27px] font-semibold leading-none text-ink">{value}</p>
            <p className="mt-1.5 text-[11.5px] text-ink-3">{hint}</p>
          </Panel>
        ))}
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <Panel className="min-w-0 overflow-hidden">
          {!lockedKind && <div className="border-b border-line px-4 pt-3">
            <Tabs
              value={activeKind}
              onChange={(value) => { setKind(value as ContentKind); setStatus('All') }}
              items={([
                ['question', 'Questions'],
                ['article', 'Library articles'],
                ['practical', 'Practical'],
                ['resource', 'Resources'],
              ] as const).map(([value, label]) => ({ value, label, icon: KIND_ICON[value], count: kindCounts[value] }))}
            />
          </div>}

          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
            <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${CONTENT_KIND_LABEL[activeKind].plural.toLowerCase()}…`} className="w-72" />
            <Select value={status} onChange={(event) => setStatus(event.target.value as Status | 'All')} className="w-40">
              {STATUSES.map((option) => <option key={option}>{option}</option>)}
            </Select>
            <span className="ml-auto tnum font-mono text-[11.5px] text-ink-3">{rows.length} shown</span>
          </div>

          <Table>
            <thead>
              <tr>
                <Th className="pl-4">Content</Th>
                <Th>Subject</Th>
                <Th>Owner & updated</Th>
                <Th>Status</Th>
                <Th align="right" className="pr-4">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => {
                const subject = getSubject(item.subjectId)
                return (
                  <Tr key={item.id} hover>
                    <Td className="max-w-md pl-4">
                      <p className="line-clamp-2 font-medium leading-snug text-ink">{item.title}</p>
                      <p className="mt-0.5 truncate text-[11.5px] text-ink-3">{itemSummary(item)}</p>
                    </Td>
                    <Td>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-ink-2"><SubjectDot id={subject.id} />{subject.short}</span>
                    </Td>
                    <Td className="whitespace-nowrap">
                      <p className="text-[12px] text-ink-2">{item.owner}</p>
                      <p className="text-[10.5px] text-ink-3" title={formatDateTime(new Date(item.updatedAt))}>{relativeUpdated(item.updatedAt)}</p>
                    </Td>
                    <Td><StatusBadge status={item.status} /></Td>
                    <Td align="right" className="pr-4">
                      <div className="inline-flex items-center justify-end gap-1">
                        <IconButton icon={Pencil} label={`Edit ${CONTENT_KIND_LABEL[item.kind].singular}`} size="sm" className="size-10" onClick={() => { setEditing(item); setEditorOpen(true) }} />
                        {item.kind === 'question' && <IconButton icon={Flag} label={`Report “${item.title}” for editorial review`} size="sm" className="size-10" onClick={() => setReportTarget({ kind: 'question', id: item.id, title: item.title })} />}
                        <IconButton icon={item.status === 'In review' ? CircleCheck : Send} label={item.status === 'In review' ? 'Awaiting review' : 'Send for review'} size="sm" className="size-10" disabled={item.status === 'In review'} onClick={() => sendForReview(item)} />
                        <IconButton icon={Trash2} label={`Delete ${CONTENT_KIND_LABEL[item.kind].singular}`} size="sm" className="size-10 text-danger hover:border-danger/20 hover:bg-danger-tint hover:text-danger" onClick={() => setDeleting(item)} />
                      </div>
                    </Td>
                  </Tr>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-14 text-center">
                    <Icon icon={Search} size={20} className="mx-auto text-ink-3" />
                    <p className="mt-2 text-[13px] font-medium text-ink">No matching content</p>
                    <p className="mt-1 text-[12px] text-ink-3">Change the search or status filter, or add a new item.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Panel>

        <div className="space-y-4 xl:sticky xl:top-20">
          <Panel className="overflow-hidden">
            <PanelHeader title="Review queue" hint={`${counts.review} waiting`} icon={Send} />
            {reviewQueue.length > 0 ? (
              <ul className="divide-y divide-line">
                {reviewQueue.map((item) => (
                  <li key={item.id} className="px-4 py-3">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-warning-tint text-warning"><Icon icon={KIND_ICON[item.kind]} size={14} /></span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink">{item.title}</p>
                        <p className="mt-1 text-[10.5px] text-ink-3">{CONTENT_KIND_LABEL[item.kind].singular} · {relativeUpdated(item.updatedAt)}</p>
                      </div>
                      <button type="button" className="text-[11.5px] font-semibold text-accent-strong hover:text-accent" onClick={() => { setKind(item.kind); setEditing(item); setEditorOpen(true) }}>Open</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center"><Icon icon={CircleCheck} size={22} className="mx-auto text-success" /><p className="mt-2 text-[12.5px] font-medium text-ink">Review queue clear</p></div>
            )}
          </Panel>

          <Panel className="p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-danger-tint text-danger"><Icon icon={Flag} size={15} /></span>
              <div className="min-w-0 flex-1"><p className="text-[12.5px] font-semibold text-ink">Student content reports</p><p className="mt-0.5 text-[11.5px] leading-snug text-ink-3">{reports.filter((report) => report.status === 'Open' || report.status === 'In review').length} reports need editorial attention.</p></div>
            </div>
            <Link to="/admin/reports" className="mt-3 block"><Button variant="secondary" size="sm" className="w-full">Open report queue</Button></Link>
          </Panel>

          <Panel className="p-4">
            <div className="flex items-center gap-2"><Icon icon={RotateCcw} size={15} className="text-ink-3" /><p className="text-[12.5px] font-medium text-ink">Prototype data</p></div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">Content changes persist in this browser. Reset only when you want to restore the original student catalogue.</p>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => { setItems(initialManagedContent()); setNotice('Original content catalogue restored.') }}>Restore original catalogue</Button>
          </Panel>
        </div>
      </div>

      {activeKind === 'question' ? (
        <QuestionEditorDialog open={editorOpen} item={editing} concepts={conceptGraph} contentItems={items} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'article' ? (
        <LibraryArticleEditorDialog open={editorOpen} item={editing} contentItems={items} graph={conceptGraph} onGraphChange={setConceptGraph} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'practical' && editing?.fields.Type !== 'Skills checklist' ? (
        <PracticalEditorDialog open={editorOpen} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : (
        <ContentEditorDialog open={editorOpen} kind={activeKind} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      )}
      <ConfirmDeleteDialog item={deleting} onClose={() => setDeleting(null)} onConfirm={deleteItem} />
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} reporterRole="Admin" onClose={() => setReportTarget(null)} onSubmitted={() => setNotice('Question reported for editorial review.')} />
    </PageContainer>
  )
}
