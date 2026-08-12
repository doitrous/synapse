import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput, Select } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent,
  MEDIA_REQUEST_PRIORITIES, MEDIA_REQUEST_STATUSES, MEDIA_REQUEST_MEDIA,
  type MediaRequest, type ManagedContentItem,
} from '@/data/contentControl'
import { MEDICAL_TAXONOMY_INDEX } from '@/data/medicalLibraryTaxonomy'

interface Row extends MediaRequest {
  ownerTitle: string
  systemId: string
  systemTitle: string
}

const PRIORITY_TONE: Record<string, 'danger' | 'warning' | 'neutral'> = {
  required: 'danger',
  'strongly helpful': 'warning',
  optional: 'neutral',
}
const STATUS_TONE: Record<string, 'neutral' | 'accent' | 'success' | 'warning'> = {
  needed: 'warning',
  planned: 'accent',
  supplied: 'success',
  declined: 'neutral',
}
const OWNER_LABEL: Record<MediaRequest['ownerKind'], string> = {
  article: 'Article',
  question: 'Question',
  practical: 'Practical',
}

/** The canonical root a request's owner sits under, for grouping. */
function rootOf(nodeId: string | undefined): { id: string; title: string } {
  if (!nodeId) return { id: '—', title: 'No canonical placement' }
  const lineage = MEDICAL_TAXONOMY_INDEX.lineage(nodeId)
  const root = lineage[0]
  return root ? { id: root.id, title: root.title } : { id: nodeId, title: nodeId }
}

/**
 * Every asset the library still needs, across articles, questions and practicals.
 *
 * Requests are admin-only by construction: they are a separate type from
 * `ArticleMediaRecord` and no student projection carries them. This is the only
 * place a person sees the backlog, and it deliberately shows all three surfaces
 * together — the work of sourcing a histology field is the same work whether an
 * article or a question is waiting on it.
 */
export function MediaRequests() {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [query, setQuery] = useState('')
  const [system, setSystem] = useState('all')
  const [medium, setMedium] = useState('all')
  const [owner, setOwner] = useState('all')
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('needed,planned')

  const rows = useMemo<Row[]>(() => {
    // A question has no canonical placement of its own, so it inherits the one
    // belonging to the article that teaches its answer.
    const nodeByArticle = new Map(
      ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item.articleData?.primaryNodeId]),
    )
    return ledger.flatMap((item) => {
      const requests =
        item.kind === 'article' ? item.articleData?.mediaRequests
        : item.kind === 'question' ? item.questionData?.mediaRequests
        : item.kind === 'practical' ? item.practicalData?.mediaRequests
        : undefined
      if (!requests?.length) return []
      const nodeId =
        item.kind === 'article' ? item.articleData?.primaryNodeId
        : item.kind === 'question' ? nodeByArticle.get(item.questionData?.libraryIds?.[0] ?? '')
        : undefined
      const root = rootOf(nodeId)
      return requests.map((request) => ({
        ...request,
        ownerTitle: item.title,
        systemId: root.id,
        systemTitle: root.title,
      }))
    })
  }, [ledger])

  const systems = useMemo(() => [...new Map(rows.map((row) => [row.systemId, row.systemTitle])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [rows])

  const visible = useMemo(() => {
    const wanted = new Set(status.split(','))
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (system !== 'all' && row.systemId !== system) return false
      if (medium !== 'all' && row.medium !== medium) return false
      if (owner !== 'all' && row.ownerKind !== owner) return false
      if (priority !== 'all' && row.priority !== priority) return false
      if (status !== 'all' && !wanted.has(row.status)) return false
      if (!q) return true
      return `${row.brief} ${row.teachingPurpose} ${row.ownerTitle} ${row.medium} ${row.kind}`.toLowerCase().includes(q)
    })
  }, [medium, owner, priority, query, rows, status, system])

  const outstanding = rows.filter((row) => row.status === 'needed' || row.status === 'planned')
  const requiredOutstanding = outstanding.filter((row) => row.priority === 'required')

  return (
    <PageContainer>
      <Link to="/admin/library" className="mb-3 inline-flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-ink">
        <Icon icon={ArrowLeft} size={14} className="rtl:-scale-x-100" /> Back to Library Setup
      </Link>
      <PageHeader
        title="Media requests"
        description="Images, recordings and clips that an article, question or practical needs but does not yet have. These are editorial instructions for a person — a separate record from student media, never appearing in a published article, its HTML, its search data, or any student API response."
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Outstanding</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-ink">{outstanding.length}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">of {rows.length} recorded</p>
        </Panel>
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Required, still missing</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-danger">{requiredOutstanding.length}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">the item cannot publish without these</p>
        </Panel>
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Systems affected</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-ink">{new Set(outstanding.map((row) => row.systemId)).size}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">of {systems.length} with any request</p>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <PanelHeader title="Backlog" icon={ImagePlus} hint={`${visible.length} shown`} />
        <div className="grid gap-2 border-b border-line p-3 sm:grid-cols-3 lg:grid-cols-5">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brief, purpose, owner" className="sm:col-span-3 lg:col-span-1" />
          <Select value={system} onChange={(event) => setSystem(event.target.value)}>
            <option value="all">All systems</option>
            {systems.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
          </Select>
          <Select value={owner} onChange={(event) => setOwner(event.target.value)}>
            <option value="all">Any content type</option>
            {Object.entries(OWNER_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </Select>
          <Select value={medium} onChange={(event) => setMedium(event.target.value)}>
            <option value="all">Any medium</option>
            {MEDIA_REQUEST_MEDIA.map((value) => <option key={value} value={value}>{value}</option>)}
          </Select>
          <Select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="all">Any priority</option>
            {MEDIA_REQUEST_PRIORITIES.map((value) => <option key={value} value={value}>{value}</option>)}
          </Select>
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="needed,planned">Outstanding</option>
            <option value="all">Any status</option>
            {MEDIA_REQUEST_STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}
          </Select>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon={ImagePlus}
            title={rows.length ? 'Nothing matches these filters' : 'No media requests yet'}
            description={rows.length
              ? 'Widen the filters to see the rest of the backlog.'
              : 'Add them while authoring, or import them alongside the item. A request says what the asset must teach and why prose is not enough.'}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <Tr>
                  <Th>Asset</Th>
                  <Th>Needed by</Th>
                  <Th>System</Th>
                  <Th>Priority</Th>
                  <Th>Status</Th>
                </Tr>
              </thead>
              <tbody>
                {visible.map((row) => (
                  <Tr key={row.id}>
                    <Td>
                      <span className="block text-[12.5px] font-medium text-ink">{row.brief}</span>
                      <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-3">
                        {row.medium}{row.medium === 'image' && row.kind !== 'other' ? ` · ${row.kind}` : ''} · {row.teachingPurpose || <span className="text-warning">no teaching purpose recorded</span>}
                      </span>
                      {(row.sourceDirection || row.rightsNotes) && (
                        <span className="mt-0.5 block text-[11px] text-ink-3">{[row.sourceDirection, row.rightsNotes].filter(Boolean).join(' · ')}</span>
                      )}
                    </Td>
                    <Td>
                      <span className="flex items-center gap-1.5">
                        <Badge tone="outline">{OWNER_LABEL[row.ownerKind]}</Badge>
                        <span className="text-[12.5px] text-ink-2">{row.ownerTitle}</span>
                      </span>
                      {row.section && <span className="mt-0.5 block text-[11px] text-ink-3">{row.section}</span>}
                    </Td>
                    <Td><span className="text-[12px] text-ink-2">{row.systemTitle}</span></Td>
                    <Td><Badge tone={PRIORITY_TONE[row.priority] ?? 'neutral'}>{row.priority}</Badge></Td>
                    <Td><Badge tone={STATUS_TONE[row.status] ?? 'neutral'}>{row.status}</Badge></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Panel>

      {requiredOutstanding.length > 0 && (
        <Panel className="mt-4 p-4">
          <div className="flex items-start gap-2.5">
            <Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0 text-danger" />
            <div>
              <p className="text-[13px] font-semibold text-ink">{requiredOutstanding.length} required asset{requiredOutstanding.length === 1 ? '' : 's'} still missing</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
                A `required` request means the item cannot be understood without it — a question whose diagram is missing has nothing to read, and an article missing its plate cannot carry the relationship it describes. Publishing before the asset exists ships something a student cannot use.
              </p>
              <Link to="/admin/library" className="mt-2 inline-block"><Button variant="secondary" size="sm">Open Library Setup</Button></Link>
            </div>
          </div>
        </Panel>
      )}
    </PageContainer>
  )
}
