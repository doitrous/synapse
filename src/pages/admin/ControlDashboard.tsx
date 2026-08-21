import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ImagePlus,
  BookOpenText,
  CircleCheck,
  FileQuestion,
  FolderOpen,
  Microscope,
  Pencil,
  PenLine,
  Plus,
  RotateCcw,
  Search,
  Send,
  Stethoscope,
  Trash2,
  Upload,
  Flag,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  FileText,
  Database,
  GraduationCap,
  TriangleAlert,
  Layers,
} from 'lucide-react'
import type { Status } from '@/data/admin'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  CONTENT_KIND_LABEL,
  initialManagedContent,
  type ContentKind,
  type ManagedContentItem,
  itemInScope,
  isUniversitySourced,
  sourceLabel,
} from '@/data/contentControl'
import { getSubject, subjects } from '@/data/subjects'
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
import { Checkbox } from '@/components/ui/Checkbox'
import { partitionByReadiness, publishReadiness } from '@/data/publishReadiness'
import { ContentEditorDialog, ConfirmDeleteDialog } from '@/components/admin/ContentEditorDialog'
import { QuestionEditorDialog } from '@/components/admin/QuestionEditorDialog'
import { LibraryArticleEditorDialog } from '@/components/admin/LibraryArticleEditorDialog'
import { PracticalEditorDialog } from '@/components/admin/PracticalEditorDialog'
import { ResourceEditorDialog } from '@/components/admin/ResourceEditorDialog'
import { DeckEditorDialog } from '@/components/admin/DeckEditorDialog'
import { EssayEditorDialog } from '@/components/admin/EssayEditorDialog'
import { HistologyEditorDialog } from '@/components/admin/HistologyEditorDialog'
import { Segmented } from '@/components/ui/Tabs'
import { initialConceptGraph, CONCEPT_STORAGE_KEY, type ConceptGraph } from '@/data/conceptGraph'
import { useTaxonomyTree, renameTaxonomyNode, addTaxTopic } from '@/data/taxonomyStore'
import { usePersistentState } from '@/lib/usePersistentState'
import { useScopedItems } from '@/lib/useScopedContent'
import { LibraryTreeEditor } from '@/components/admin/LibraryTreeEditor'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { cn } from '@/lib/cn'
import { overlayPortal } from '@/lib/overlayPortal'
import { formatDateTime } from '@/lib/format'
import { removeStoredMedia } from '@/lib/mediaStorage'
import { initialContentReports, REPORT_STORAGE_KEY, type ContentReport } from '@/data/contentReports'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { API_MODE } from '@/lib/api'

const KIND_ICON = {
  question: FileQuestion,
  article: BookOpenText,
  practical: Stethoscope,
  resource: FolderOpen,
  deck: Layers,
  essay: PenLine,
  histology: Microscope,
}

const STATUSES: Array<Status | 'All'> = ['All', 'Draft', 'In review', 'Published', 'Archived']

const PRACTICAL_TYPE_ORDER = ['OSCE station', 'Clinical case', 'Skills checklist', 'Lab interpretation', 'Imaging interpretation']

/** Rows per page. Enough to work through in one pass, few enough to render fast. */
const PAGE_SIZE = 50

interface Subgroup { key: string; label: string; items: ManagedContentItem[] }
interface Group { key: string; label: string; color?: string; icon?: 'video' | 'file'; count: number; subs: Subgroup[] }

function bySubjectSubgroups(items: ManagedContentItem[]): Subgroup[] {
  const map = new Map<string, ManagedContentItem[]>()
  items.forEach((r) => map.set(r.subjectId, [...(map.get(r.subjectId) ?? []), r]))
  return subjects.filter((s) => map.has(s.id)).map((s) => ({ key: s.id, label: s.name, items: map.get(s.id)! }))
}

type ResourceTab = 'Files' | 'Videos'

/** Group filtered rows for the active kind: subject→topic, type, or Files/Videos→module. */
function buildGroups(kind: ContentKind, rows: ManagedContentItem[], resourceTab: ResourceTab = 'Files'): Group[] {
  if (kind === 'question' || kind === 'article') {
    return subjects
      .map((subj) => {
        const subjRows = rows.filter((r) => r.subjectId === subj.id)
        if (!subjRows.length) return null
        const topics = new Map<string, ManagedContentItem[]>()
        subjRows.forEach((r) => {
          const topic = r.fields.Topic || 'Other'
          topics.set(topic, [...(topics.get(topic) ?? []), r])
        })
        return {
          key: subj.id,
          label: subj.name,
          color: subj.color,
          count: subjRows.length,
          subs: [...topics.entries()].map(([label, items]) => ({ key: label, label, items })),
        } as Group
      })
      .filter((g): g is Group => g !== null)
  }
  if (kind === 'practical') {
    const types = new Map<string, ManagedContentItem[]>()
    rows.forEach((r) => {
      const type = r.fields.Type || 'Other'
      types.set(type, [...(types.get(type) ?? []), r])
    })
    return [...types.keys()]
      .sort((a, b) => (PRACTICAL_TYPE_ORDER.indexOf(a) + 1 || 99) - (PRACTICAL_TYPE_ORDER.indexOf(b) + 1 || 99))
      .map((type) => ({ key: type, label: type, count: types.get(type)!.length, subs: bySubjectSubgroups(types.get(type)!) }))
  }
  // resource → the active Files/Videos tab, grouped by subject → chapter (topic)
  const bucketItems = rows.filter((r) => (resourceTab === 'Videos' ? r.fields.Type === 'Video' : r.fields.Type !== 'Video'))
  return bySubjectSubgroups(bucketItems).map((sub) => {
    const byChapter = new Map<string, ManagedContentItem[]>()
    sub.items.forEach((r) => {
      const ch = r.fields.Chapter?.trim() || r.resourceData?.chapters?.[0] || 'General'
      byChapter.set(ch, [...(byChapter.get(ch) ?? []), r])
    })
    return {
      key: sub.key,
      label: sub.label,
      color: getSubject(sub.key).color,
      count: sub.items.length,
      subs: [...byChapter.entries()].map(([label, items]) => ({ key: `${sub.key}::${label}`, label, items })),
    }
  })
}

function itemSummary(item: ManagedContentItem) {
  if (item.kind === 'question') return `${item.fields.Topic} · ${item.fields.Difficulty}`
  if (item.kind === 'article') return `${item.fields.Topic} · ${item.fields['Reading time']} min read`
  if (item.kind === 'practical') {
    const unit = item.fields.Type === 'Clinical case' ? 'decisions' : item.fields.Type?.includes('interpretation') ? 'questions' : 'marks'
    return `${item.fields.Type} · ${item.fields.Duration} min · ${item.fields.Marks} ${unit}`
  }
  if (item.kind === 'deck') {
    // Without this a deck fell through to the resource line below and rendered
    // "undefined · undefined" — a deck has neither a Type nor a Source field.
    const count = item.deckData?.cards.length ?? 0
    return `${count} ${count === 1 ? 'card' : 'cards'}`
  }
  if (item.kind === 'essay') {
    const points = item.essayData?.keyPoints.length ?? 0
    return `${points} key point${points === 1 ? '' : 's'}`
  }
  if (item.kind === 'histology') {
    // Without this a slide fell through to the resource line below and rendered
    // "undefined · undefined" — a slide has neither a Type nor a Source field.
    const data = item.histologyData
    const objectives = (data?.views ?? []).map((view) => `${view.objective}×`).join(' · ')
    return [data?.tissue, data?.stain, objectives].filter(Boolean).join(' · ')
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

/** Click-to-rename inline label used for editable topic subheaders. */
function EditableLabel({ value, onSave, className }: { value: string; onSave: (v: string) => void; className?: string }) {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState(value)
  if (editing) {
    return (
      <input
        autoFocus value={v}
        onChange={(e) => setV(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onBlur={() => { setEditing(false); if (v.trim() && v !== value) onSave(v.trim()) }}
        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setV(value); setEditing(false) } }}
        className="rounded border border-primary bg-surface px-1 py-0.5 text-[11px] uppercase text-ink outline-none"
      />
    )
  }
  return <button type="button" onClick={(e) => { e.stopPropagation(); setV(value); setEditing(true) }} title="Rename topic" className={cn('rounded px-1 hover:bg-inset', className)}>{value}</button>
}

export interface QuestionScope { universityId?: string; year?: string }
/** Alias kept for readability at resource call sites. */
export type ContentScope = QuestionScope

export function ControlDashboard({ initialKind = 'question', lockedKind = false, questionScope, scope }: { initialKind?: ContentKind; lockedKind?: boolean; questionScope?: QuestionScope; scope?: ContentScope }) {
  const activeScope = scope ?? questionScope
  const [ledger, setItems] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  /**
   * What this person may actually work on.
   *
   * Only the read is narrowed. Every write below takes the functional form —
   * `setItems((current) => …)` — so it operates on the stored document rather
   * than on this view, and a scoped reviewer saving a change cannot delete the
   * content they were never shown.
   */
  const items = useScopedItems(ledger)
  const { contentScope } = useIdentity()
  const [conceptGraph, setConceptGraph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [taxonomy, setTaxonomy] = useTaxonomyTree()
  const [catalogue] = useUniversityCatalogue()
  const [addingTopicFor, setAddingTopicFor] = useState<string | null>(null)
  const [newTopicName, setNewTopicName] = useState('')
  const [kind, setKind] = useState<ContentKind>(initialKind)
  const [status, setStatus] = useState<Status | 'All'>('All')
  const [query, setQuery] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<ManagedContentItem | null>(null)
  const [deleting, setDeleting] = useState<ManagedContentItem | null>(null)
  const [notice, setNotice] = useState<{ text: string; tone: 'success' | 'warning' } | null>(null)
  /** A thing that happened. */
  const say = (text: string) => setNotice({ text, tone: 'success' })
  /** A thing that did not happen, and why. */
  const warn = (text: string) => setNotice({ text, tone: 'warning' })
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [forcePublish, setForcePublish] = useState(false)
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
    deck: items.filter((item) => item.kind === 'deck').length,
    essay: items.filter((item) => item.kind === 'essay').length,
    histology: items.filter((item) => item.kind === 'histology').length,
  }), [items])

  const matching = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return items
      .filter((item) => item.kind === activeKind)
      .filter((item) => status === 'All' || item.status === status)
      // Navigator scope (Master → university → year) for question & resource catalogues.
      .filter((item) => {
        if (!activeScope || (activeKind !== 'question' && activeKind !== 'resource' && activeKind !== 'practical' && activeKind !== 'deck' && activeKind !== 'essay' && activeKind !== 'histology')) return true
        // Authored scope, not a hash of the item's id.
        return itemInScope(item, activeScope.universityId, activeScope.year)
      })
      .filter((item) => !normalized || `${item.title} ${item.owner} ${Object.values(item.fields).join(' ')}`.toLowerCase().includes(normalized))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }, [activeKind, items, query, status, activeScope])

  /**
   * Questions and practicals taken from a faculty's own papers are reviewed,
   * retired, and re-licensed as the batch they arrived in, so the catalogue can be
   * held to one origin at a time. Admin-only: no student view reads this.
   */
  const [sourceTab, setSourceTab] = useState<'all' | 'university' | 'internal'>('all')
  const universityName = (id?: string) => catalogue.find((university) => university.id === id)?.short ?? id ?? 'University'
  const showsSourceTabs = activeKind === 'question' || activeKind === 'practical'
  const sourceCounts = useMemo(() => ({
    all: matching.length,
    university: matching.filter(isUniversitySourced).length,
    internal: matching.filter((item) => !isUniversitySourced(item)).length,
  }), [matching])

  const rows = useMemo(() => {
    if (!showsSourceTabs || sourceTab === 'all') return matching
    return matching.filter((item) => (sourceTab === 'university' ? isUniversitySourced(item) : !isUniversitySourced(item)))
  }, [matching, showsSourceTabs, sourceTab])

  /**
   * One page of rows.
   *
   * The catalogue used to render every match — 219 questions is 219 rows and every
   * editor button on all of them. Grouping happens after the slice, so a group shows
   * what this page holds rather than reaching across pages.
   */
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const [page, setPage] = useState(1)
  const currentPage = Math.min(page, pageCount)
  const pageRows = useMemo(() => rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE), [rows, currentPage])
  useEffect(() => { setPage(1) }, [activeKind, status, query, sourceTab, activeScope])

  /**
   * Open the item a link asked for.
   *
   * Media Requests has always linked here with `?item=<id>`, and this page has
   * always ignored it — so "go to the item" landed on the unfiltered catalogue and
   * left you to find it. The id is consumed once and cleared, so a refresh or a
   * back-navigation does not reopen the editor.
   */
  const [searchParams, setSearchParams] = useSearchParams()
  const handledItemParam = useRef<string | null>(null)
  useEffect(() => {
    const wanted = searchParams.get('item')
    if (!wanted || handledItemParam.current === wanted) return
    const target = items.find((item) => item.id === wanted)
    if (!target) {
      // Items load asynchronously; only give up once there is a catalogue to miss in.
      if (!items.length) return
      handledItemParam.current = wanted
      warn('That item is no longer in this catalogue.')
    } else {
      handledItemParam.current = wanted
      setQuery(target.title)
      setEditing(target)
      setEditorOpen(true)
    }
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('item')
      return next
    }, { replace: true })
  }, [items, searchParams, setSearchParams])

  const [resourceTab, setResourceTab] = useState<ResourceTab>('Files')
  const resourceCounts = useMemo(() => ({
    Files: rows.filter((r) => r.fields.Type !== 'Video').length,
    Videos: rows.filter((r) => r.fields.Type === 'Video').length,
  }), [rows])
  const groups = useMemo(() => buildGroups(activeKind, pageRows, resourceTab), [activeKind, pageRows, resourceTab])
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const toggleGroup = (key: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

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
    // Auto-link: a resource tagged with concepts adds itself to those concepts'
    // approved file/video resource lists (so concepts only reference vetted media).
    if (next.kind === 'resource') {
      const conceptIds = next.resourceData?.includedConceptIds?.length
        ? next.resourceData.includedConceptIds
        : (next.fields['Included concepts'] ?? '').split(/[\n,;|]/).map((s) => s.trim()).filter(Boolean)
      if (conceptIds.length) {
        const isVideo = next.fields.Type === 'Video'
        setConceptGraph((g) => ({
          ...g,
          concepts: g.concepts.map((c) => conceptIds.includes(c.id) ? {
            ...c,
            approvedVideoResourceIds: isVideo ? [...new Set([...(c.approvedVideoResourceIds ?? []), next.id])] : c.approvedVideoResourceIds,
            approvedFileResourceIds: isVideo ? c.approvedFileResourceIds : [...new Set([...(c.approvedFileResourceIds ?? []), next.id])],
          } : c),
        }))
      }
    }
    setEditorOpen(false)
    setEditing(null)
    say(exists ? `${CONTENT_KIND_LABEL[next.kind].singular} updated.` : `${CONTENT_KIND_LABEL[next.kind].singular} added as ${next.status.toLowerCase()}.`)
  }

  const isTaxonomyKind = activeKind === 'question' || activeKind === 'article' || activeKind === 'resource'
  // The field a group's topic label maps to: chapter for resources, Topic otherwise.
  const topicField = activeKind === 'resource' ? 'Chapter' : 'Topic'

  /** Rename a topic/chapter group: retag every item in it and rename the taxonomy node. */
  function renameTopic(subjectId: string, oldLabel: string, newLabel: string) {
    if (!newLabel.trim() || newLabel === oldLabel) return
    setItems((cur) => cur.map((it) => {
      if (it.kind !== activeKind || it.subjectId !== subjectId) return it
      const current = it.fields[topicField]?.trim() || (activeKind === 'resource' ? it.resourceData?.chapters?.[0] : '') || (activeKind === 'resource' ? 'General' : 'Other')
      if (current !== oldLabel) return it
      const nextFields = { ...it.fields, [topicField]: newLabel }
      if (activeKind === 'resource' && it.resourceData) {
        const chapters = (it.resourceData.chapters ?? []).map((c) => (c === oldLabel ? newLabel : c))
        return { ...it, fields: nextFields, resourceData: { ...it.resourceData, chapters: chapters.length ? chapters : [newLabel] } }
      }
      return { ...it, fields: nextFields }
    }))
    const topic = taxonomy.find((s) => s.id === subjectId)?.topics.find((t) => t.title === oldLabel)
    if (topic) setTaxonomy((tree) => renameTaxonomyNode(tree, 'topic', topic.id, newLabel))
    say(`${activeKind === 'resource' ? 'Chapter' : 'Topic'} renamed to “${newLabel}”.`)
  }

  /** Add a topic to a subject in the single-source taxonomy. */
  function addTopic(subjectId: string) {
    const name = newTopicName.trim()
    if (!name) return
    setTaxonomy((tree) => addTaxTopic(tree, subjectId, name))
    setAddingTopicFor(null); setNewTopicName('')
    say(`Topic “${name}” added to Subjects & Topics.`)
  }

  function sendForReview(item: ManagedContentItem) {
    if (item.status === 'In review') return
    setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: 'In review', updatedAt: new Date().toISOString() } : candidate))
    say(`“${item.title}” sent for review.`)
  }

  /* ---- Bulk selection ---------------------------------------------------- */

  // Selection spans the whole filtered set, so working through page by page and
  // publishing once at the end does what it looks like it does. Select-all only
  // ever claims the page in front of you.
  const selectedItems = useMemo(() => rows.filter((item) => selected.has(item.id)), [rows, selected])
  const readiness = useMemo(() => partitionByReadiness(selectedItems), [selectedItems])
  const someShownSelected = selectedItems.length > 0
  const allPageSelected = pageRows.length > 0 && pageRows.every((item) => selected.has(item.id))
  const somePageSelected = pageRows.some((item) => selected.has(item.id))

  /** Selection only ever refers to rows the current filters actually show. */
  const setSelection = (ids: string[], on: boolean) =>
    setSelected((current) => {
      const next = new Set(current)
      ids.forEach((id) => (on ? next.add(id) : next.delete(id)))
      return next
    })

  /**
   * Apply a status to every selected item in one write.
   *
   * An empty target list used to return in silence, leaving the selection sitting
   * there and the admin with no idea whether anything had happened. It now says so.
   */
  function applyStatus(targets: ManagedContentItem[], status: Status, verb: string, nothingToDo: string) {
    if (!targets.length) { warn(nothingToDo); return }
    const ids = new Set(targets.map((item) => item.id))
    const at = new Date().toISOString()
    setItems((current) => current.map((item) => (ids.has(item.id) ? { ...item, status, updatedAt: at } : item)))
    setSelected(new Set())
    say(`${targets.length} ${targets.length === 1 ? 'item' : 'items'} ${verb}.`)
  }

  function publishSelected(includeBlocked: boolean) {
    const targets = includeBlocked ? [...readiness.ready, ...readiness.blocked.map((entry) => entry.item)] : readiness.ready
    applyStatus(targets, 'Published', 'published', 'Nothing to publish in this selection.')
    setForcePublish(false)
  }

  /**
   * Publishing what is already published is not an error and not a no-op to be
   * swallowed — it is a selection that has nothing left to do, and saying that is
   * the whole job. A mixed selection still publishes the rest.
   */
  function onPublishPressed() {
    if (readiness.ready.length > 0) { publishSelected(false); return }
    if (readiness.blocked.length > 0) { setForcePublish(true); return }
    warn(readiness.live.length === 1
      ? 'Nothing to publish — that item is already published. Nothing was changed.'
      : `Nothing to publish — all ${readiness.live.length} selected items are already published. Nothing was changed.`)
  }

  function deleteItem() {
    if (!deleting) return
    const deleted = deleting
    for (const attachment of deleted.questionData?.attachments ?? []) {
      void removeStoredMedia(attachment.url)
    }
    setItems((current) => current.filter((item) => item.id !== deleted.id))
    setDeleting(null)
    say(`${CONTENT_KIND_LABEL[deleted.kind].singular} deleted.`)
  }

  return (
    <PageContainer>
      <PageHeader
        title={lockedKind ? `${CONTENT_KIND_LABEL[activeKind].plural} setup` : 'Content control'}
        description={lockedKind ? `Create, revise, review, and import ${CONTENT_KIND_LABEL[activeKind].plural.toLowerCase()} without leaving this catalogue.` : 'Create, revise, review, and remove everything students can open in the question bank, library, practical area, and resources.'}
        actions={<>{lockedKind && activeKind === 'article' && API_MODE && <Link to="/admin/library/coverage"><Button variant="secondary" size="md" iconLeft={Database}>Evidence review</Button></Link>}{activeKind !== 'resource' && <Link to="/admin/library/media"><Button variant="secondary" size="md" iconLeft={ImagePlus}>Media requests</Button></Link>}<Link to={`/admin/import/${activeKind}`}><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link><Button variant="primary" size="md" iconLeft={Plus} onClick={openNew}>Add {CONTENT_KIND_LABEL[activeKind].singular}</Button></>}
      />

      {notice && (
        <div role="status" className={cn('mb-4 flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] text-ink', notice.tone === 'warning' ? 'border-warning/30 bg-warning-tint/70' : 'border-success/25 bg-success-tint/70')}>
          <Icon icon={notice.tone === 'warning' ? TriangleAlert : CircleCheck} size={16} className={notice.tone === 'warning' ? 'text-warning' : 'text-success'} />
          <span className="flex-1">{notice.text}</span>
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
                ['deck', 'Flashcard decks'],
                ['essay', 'Written questions'],
                ['histology', 'Histology'],
              ] as const).map(([value, label]) => ({ value, label, icon: KIND_ICON[value], count: kindCounts[value] }))}
            />
          </div>}

          {activeKind === 'resource' && (
            <div className="border-b border-line px-4 pt-3">
              <Segmented
                value={resourceTab}
                onChange={(value) => setResourceTab(value as ResourceTab)}
                items={[
                  { value: 'Files', label: `Files (${resourceCounts.Files})` },
                  { value: 'Videos', label: `Videos (${resourceCounts.Videos})` },
                ]}
              />
            </div>
          )}

          {/* Where the item came from. Its own division, so a faculty's papers can be
              worked as one batch instead of being hunted for across the catalogue. */}
          {showsSourceTabs && (
            <div className="border-b border-line px-4 pt-3">
              <Segmented
                value={sourceTab}
                onChange={(next) => { setSourceTab(next as typeof sourceTab); setSelected(new Set()) }}
                items={[
                  { value: 'all', label: `All (${sourceCounts.all})` },
                  { value: 'university', label: `University & college sources (${sourceCounts.university})` },
                  { value: 'internal', label: `Written here (${sourceCounts.internal})` },
                ]}
              />
              {sourceTab === 'university' && (
                <p className="mb-3 mt-2 flex items-center gap-1.5 text-[11.5px] text-ink-3">
                  <Icon icon={GraduationCap} size={13} className="text-primary" />
                  Every {CONTENT_KIND_LABEL[activeKind].singular} here came from a university or college paper. Select all to act on the batch.
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
            <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${CONTENT_KIND_LABEL[activeKind].plural.toLowerCase()}…`} className="w-72" />
            <Select value={status} onChange={(event) => setStatus(event.target.value as Status | 'All')} className="w-40">
              {STATUSES.map((option) => <option key={option}>{option}</option>)}
            </Select>
            <span className="ml-auto tnum font-mono text-[11.5px] text-ink-3">
              {rows.length === 0 ? '0 shown' : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, rows.length)} of ${rows.length}`}
            </span>
          </div>

          {/* An empty table has two very different causes for a scoped reviewer,
              and "there is nothing here" is the wrong reading of the other one.
              Said once, at the top, rather than in every empty state below. */}
          {/* Library Setup only: the faculty's own by-module and by-year
              structures, which are independent of the generated taxonomy. */}
          {lockedKind && activeKind === 'article' && <LibraryTreeEditor />}

          {contentScope && ledger.length > items.length && (
            <p className="border-b border-line bg-inset px-4 py-2 text-[11.5px] leading-relaxed text-ink-2">
              You are seeing the {CONTENT_KIND_LABEL[activeKind].plural.toLowerCase()} in the modules and years assigned
              to your account. {ledger.length - items.length} other item{ledger.length - items.length === 1 ? ' is' : 's are'} hidden.
              Ask a super admin or an editor to widen your scope.
            </p>
          )}

          {/* Bulk actions. Sticky so the selection stays actionable while scrolling
              a long review queue, which is the case this exists for. */}
          {someShownSelected && (
            <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-primary-line bg-primary-tint/70 px-4 py-2.5 backdrop-blur">
              <span className="text-[12.5px] font-semibold text-primary-strong">
                {selectedItems.length} selected
              </span>
              <span className="text-[12px] text-ink-2">
                {readiness.ready.length} of {selectedItems.length} can publish
                {readiness.live.length > 0 && ` · ${readiness.live.length} already published`}
                {readiness.blocked.length > 0 && ` · ${readiness.blocked.length} blocked`}
              </span>
              <div className="ms-auto flex flex-wrap items-center gap-2">
                {/* The label says what pressing it will do. It used to read "Publish…"
                    for both "some are held back" and "these are all already live". */}
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={CircleCheck}
                  onClick={onPublishPressed}
                >
                  {readiness.ready.length > 0
                    ? `Publish ${readiness.ready.length}`
                    : readiness.blocked.length > 0
                      ? `Review ${readiness.blocked.length} blocked`
                      : 'Already published'}
                </Button>
                <Button variant="secondary" size="sm" iconLeft={Send} onClick={() => applyStatus(selectedItems.filter((item) => item.status !== 'In review'), 'In review', 'sent for review', 'Every selected item is already in review.')}>Send for review</Button>
                <Button variant="secondary" size="sm" iconLeft={RotateCcw} onClick={() => applyStatus(selectedItems.filter((item) => item.status !== 'Archived'), 'Archived', 'archived', 'Every selected item is already archived.')}>Archive</Button>
                <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Clear</Button>
              </div>
            </div>
          )}

          {/* A minimum width so the columns keep their shape, and an Actions column
              pinned to the right edge — it used to be pushed past the panel's clip by
              the 19rem rail, reachable only by scrolling sideways inside the table. */}
          <Table className="min-w-[52rem]">
            <thead>
              <tr>
                <Th className="w-10 pl-4">
                  <Checkbox
                    label={allPageSelected ? 'Clear selection on this page' : `Select all ${pageRows.length} on this page`}
                    checked={allPageSelected}
                    indeterminate={somePageSelected && !allPageSelected}
                    onChange={(on) => setSelection(pageRows.map((item) => item.id), on)}
                  />
                </Th>
                <Th>Content</Th>
                <Th>Subject</Th>
                <Th>Owner & updated</Th>
                <Th>Status</Th>
                <Th align="end" className="sticky right-0 bg-surface pr-4">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => {
                const groupCollapsed = collapsed.has(group.key)
                return (
                  <Fragment key={group.key}>
                    <tr className="border-t border-line bg-surface-2/70">
                      <td colSpan={6} className="px-2 py-0">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.key)}
                          aria-expanded={!groupCollapsed}
                          className="flex w-full items-center gap-2 px-2 py-2 text-start"
                        >
                          <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!groupCollapsed} />
                          {group.color && <SubjectDot id={group.key} />}
                          {group.icon && <Icon icon={group.icon === 'video' ? PlayCircle : FileText} size={15} className="text-primary" />}
                          <span className="text-[13px] font-semibold text-ink">{group.label}</span>
                          <span className="tnum font-mono text-[11px] text-ink-3">{group.count}</span>
                          {isTaxonomyKind && group.color && (
                            <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setAddingTopicFor(addingTopicFor === group.key ? null : group.key); setNewTopicName('') }} className="ms-auto inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-ink-3 hover:bg-inset hover:text-primary-strong"><Icon icon={Plus} size={12} />Add topic</span>
                          )}
                        </button>
                      </td>
                    </tr>
                    {isTaxonomyKind && addingTopicFor === group.key && (
                      <tr><td colSpan={6} className="px-4 py-2 ps-10">
                        <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); addTopic(group.key) }}>
                          <SearchInput value={newTopicName} onChange={(e) => setNewTopicName(e.target.value)} placeholder="New topic name…" className="w-64" />
                          <Button type="submit" variant="primary" size="sm">Add</Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setAddingTopicFor(null)}>Cancel</Button>
                        </form>
                      </td></tr>
                    )}
                    {!groupCollapsed && group.subs.map((sub) => (
                      <Fragment key={sub.key}>
                        <tr className="bg-surface-2/25">
                          <td className="py-1.5 pl-4">
                            <Checkbox
                              label={`Select all in ${sub.label}`}
                              checked={sub.items.every((item) => selected.has(item.id))}
                              indeterminate={sub.items.some((item) => selected.has(item.id)) && !sub.items.every((item) => selected.has(item.id))}
                              onChange={(on) => setSelection(sub.items.map((item) => item.id), on)}
                            />
                          </td>
                          <td colSpan={5} className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                            {isTaxonomyKind
                              ? <EditableLabel value={sub.label} onSave={(v) => renameTopic(group.key, sub.label, v)} className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3" />
                              : sub.label}
                            <span className="tnum ms-1 font-mono text-ink-3/70">{sub.items.length}</span>
                          </td>
                        </tr>
                        {sub.items.map((item) => {
                          const subject = getSubject(item.subjectId)
                          const verdict = publishReadiness(item)
                          return (
                            // One concrete background per state, never two competing
                            // ones — the pinned Actions cell inherits it, so the row
                            // reads as one row across the seam.
                            <Tr key={item.id} hover className={selected.has(item.id) ? 'bg-primary-tint/25' : 'bg-surface'}>
                              <Td className="pl-4">
                                <Checkbox
                                  label={`Select “${item.title}”`}
                                  checked={selected.has(item.id)}
                                  onChange={(on) => setSelection([item.id], on)}
                                />
                              </Td>
                              <Td className="max-w-md">
                                <p className="line-clamp-2 font-medium leading-snug text-ink">{item.title}</p>
                                <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-ink-3">
                                  {itemSummary(item)}
                                  {/* Admin-only. Students are never told where an item came from. */}
                                  {isUniversitySourced(item) && (
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded border border-primary-line bg-primary-tint/60 px-1.5 py-px text-[10.5px] font-medium text-primary-strong" title={sourceLabel(item.source, universityName(item.source?.universityId))}>
                                      <Icon icon={GraduationCap} size={10} />
                                      {item.source?.universityId ? universityName(item.source.universityId) : item.source?.institution || 'University source'}
                                    </span>
                                  )}
                                  {/* Why this one cannot go live, shown where the decision is made. */}
                                  {item.status !== 'Published' && !verdict.ready && (
                                    <span className="inline-flex shrink-0 items-center rounded border border-warning/30 bg-warning-tint/60 px-1.5 py-px text-[10.5px] font-medium text-warning">
                                      {verdict.reason}
                                    </span>
                                  )}
                                </p>
                              </Td>
                              <Td>
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-ink-2" title={subject.name}><SubjectDot id={subject.id} /></span>
                              </Td>
                              <Td className="whitespace-nowrap">
                                <p className="text-[12px] text-ink-2">{item.owner}</p>
                                <p className="text-[10.5px] text-ink-3" title={formatDateTime(new Date(item.updatedAt))}>{relativeUpdated(item.updatedAt)}</p>
                              </Td>
                              <Td><StatusBadge status={item.status} /></Td>
                              <Td align="end" className="sticky right-0 bg-inherit pr-4">
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
                      </Fragment>
                    ))}
                  </Fragment>
                )
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center">
                    <Icon icon={Search} size={20} className="mx-auto text-ink-3" />
                    <p className="mt-2 text-[13px] font-medium text-ink">No matching content</p>
                    <p className="mt-1 text-[12px] text-ink-3">Change the search or status filter, or add a new item.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {pageCount > 1 && (
            <div className="flex flex-wrap items-center gap-3 border-t border-line bg-surface-2/45 px-4 py-2.5">
              <span className="tnum font-mono text-[11.5px] text-ink-3">
                Page {currentPage} of {pageCount}
              </span>
              {someShownSelected && (
                <span className="text-[11.5px] text-primary-strong">{selectedItems.length} selected across all pages</span>
              )}
              <div className="ms-auto flex items-center gap-1.5">
                <Button variant="secondary" size="sm" iconLeft={ChevronLeft} disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>Previous</Button>
                <Button variant="secondary" size="sm" iconRight={ChevronRight} disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>Next</Button>
              </div>
            </div>
          )}
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
                      <button type="button" className="text-[11.5px] font-semibold text-primary-strong hover:text-primary" onClick={() => { setKind(item.kind); setEditing(item); setEditorOpen(true) }}>Open</button>
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

          {!API_MODE && <Panel className="p-4">
            <div className="flex items-center gap-2"><Icon icon={RotateCcw} size={15} className="text-ink-3" /><p className="text-[12.5px] font-medium text-ink">Prototype data</p></div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">Content changes persist in this browser. Reset only when you want to restore the original student catalogue.</p>
            <Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => { setItems(initialManagedContent()); say('Original content catalogue restored.') }}>Restore original catalogue</Button>
          </Panel>}
        </div>
      </div>

      {activeKind === 'question' ? (
        <QuestionEditorDialog open={editorOpen} item={editing} concepts={conceptGraph} contentItems={items} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'article' ? (
        <LibraryArticleEditorDialog open={editorOpen} item={editing} contentItems={items} graph={conceptGraph} onGraphChange={setConceptGraph} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'practical' && editing?.fields.Type !== 'Skills checklist' ? (
        <PracticalEditorDialog open={editorOpen} item={editing} concepts={conceptGraph} contentItems={items} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'resource' ? (
        <ResourceEditorDialog open={editorOpen} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'deck' ? (
        <DeckEditorDialog open={editorOpen} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'essay' ? (
        <EssayEditorDialog open={editorOpen} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : activeKind === 'histology' ? (
        <HistologyEditorDialog open={editorOpen} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      ) : (
        <ContentEditorDialog open={editorOpen} kind={activeKind} item={editing} onClose={() => { setEditorOpen(false); setEditing(null) }} onSave={saveItem} />
      )}
      {/* Publishing past the gate is allowed, but not quietly: the dialog names
          the count and says what a student will actually see. */}
      {forcePublish && overlayPortal(
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="force-publish-title">
          <button type="button" className="absolute inset-0 bg-ink/30" aria-label="Cancel" onClick={() => setForcePublish(false)} />
          <Panel className="animate-pop relative w-full max-w-lg p-5 shadow-pop">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-warning-tint text-warning"><Icon icon={Flag} size={17} /></span>
              <div className="min-w-0">
                <h2 id="force-publish-title" className="font-serif text-[18px] font-semibold text-ink">Publish without student-visible content?</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                  {readiness.blocked.length} of the {selectedItems.length} selected {selectedItems.length === 1 ? 'item has' : 'items have'} no
                  verified content to show. Published now, {readiness.blocked.length === 1 ? 'it' : 'they'} will appear in the student library as a
                  title and summary with an empty body.
                </p>
                <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto rounded-lg border border-line bg-surface-2/50 p-2.5">
                  {readiness.blocked.slice(0, 8).map(({ item, reason }) => (
                    <li key={item.id} className="flex items-center gap-2 text-[12px] text-ink-2">
                      <span className="min-w-0 flex-1 truncate">{item.title}</span>
                      <span className="shrink-0 font-medium text-warning">{reason}</span>
                    </li>
                  ))}
                  {readiness.blocked.length > 8 && <li className="text-[11.5px] text-ink-3">…and {readiness.blocked.length - 8} more</li>}
                </ul>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" size="md" onClick={() => setForcePublish(false)}>Cancel</Button>
              <Button variant="primary" size="md" onClick={() => publishSelected(true)}>Publish anyway</Button>
            </div>
          </Panel>
        </div>
      )}

      <ConfirmDeleteDialog item={deleting} onClose={() => setDeleting(null)} onConfirm={deleteItem} />
      <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} reporterRole="Admin" onClose={() => setReportTarget(null)} onSubmitted={() => say('Question reported for editorial review.')} />
    </PageContainer>
  )
}
