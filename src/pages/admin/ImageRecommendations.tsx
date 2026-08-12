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
  IMAGE_RECOMMENDATION_PRIORITIES, IMAGE_RECOMMENDATION_STATUSES,
  type ImageRecommendation, type ManagedContentItem,
} from '@/data/contentControl'
import { MEDICAL_TAXONOMY_INDEX } from '@/data/medicalLibraryTaxonomy'

interface Row extends ImageRecommendation {
  articleTitle: string
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

/** The canonical root a recommendation's article sits under, for grouping. */
function rootOf(nodeId: string | undefined): { id: string; title: string } {
  if (!nodeId) return { id: '—', title: 'No canonical placement' }
  const lineage = MEDICAL_TAXONOMY_INDEX.lineage(nodeId)
  const root = lineage[0]
  return root ? { id: root.id, title: root.title } : { id: nodeId, title: nodeId }
}

/**
 * Outstanding visuals, by system, article, priority and status.
 *
 * Recommendations are admin-only by construction: they are a separate type from
 * `ArticleMediaRecord` and the student projection never carries them. This is
 * the only place a person sees the backlog.
 */
export function ImageRecommendations() {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [query, setQuery] = useState('')
  const [system, setSystem] = useState('all')
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('needed,planned')

  const rows = useMemo<Row[]>(() => ledger
    .filter((item) => item.kind === 'article')
    .flatMap((item) => {
      const root = rootOf(item.articleData?.primaryNodeId)
      return (item.articleData?.imageRecommendations ?? []).map((recommendation) => ({
        ...recommendation,
        articleTitle: item.title,
        systemId: root.id,
        systemTitle: root.title,
      }))
    }), [ledger])

  const systems = useMemo(() => [...new Map(rows.map((row) => [row.systemId, row.systemTitle])).entries()].sort((a, b) => a[1].localeCompare(b[1])), [rows])

  const visible = useMemo(() => {
    const wanted = new Set(status.split(','))
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (system !== 'all' && row.systemId !== system) return false
      if (priority !== 'all' && row.priority !== priority) return false
      if (status !== 'all' && !wanted.has(row.status)) return false
      if (!q) return true
      return `${row.brief} ${row.teachingPurpose} ${row.articleTitle} ${row.kind}`.toLowerCase().includes(q)
    })
  }, [priority, query, rows, status, system])

  const outstanding = rows.filter((row) => row.status === 'needed' || row.status === 'planned')
  const requiredOutstanding = outstanding.filter((row) => row.priority === 'required')

  return (
    <PageContainer>
      <Link to="/admin/library" className="mb-3 inline-flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-ink">
        <Icon icon={ArrowLeft} size={14} className="rtl:-scale-x-100" /> Back to Library Setup
      </Link>
      <PageHeader
        title="Image recommendations"
        description="Visuals an article needs but does not yet have. These are editorial instructions for a person — they are a separate record from student media and never appear in a published article, its HTML, its search data, or any student API response."
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
          <p className="mt-0.5 text-[11.5px] text-ink-3">an article is not complete without these</p>
        </Panel>
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Systems affected</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-ink">{new Set(outstanding.map((row) => row.systemId)).size}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">of {systems.length} with any recommendation</p>
        </Panel>
      </div>

      <Panel className="overflow-hidden">
        <PanelHeader title="Backlog" icon={ImagePlus} hint={`${visible.length} shown`} />
        <div className="grid gap-2 border-b border-line p-3 sm:grid-cols-4">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brief, purpose, article" />
          <Select value={system} onChange={(event) => setSystem(event.target.value)}>
            <option value="all">All systems</option>
            {systems.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
          </Select>
          <Select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="all">Any priority</option>
            {IMAGE_RECOMMENDATION_PRIORITIES.map((value) => <option key={value} value={value}>{value}</option>)}
          </Select>
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="needed,planned">Outstanding</option>
            <option value="all">Any status</option>
            {IMAGE_RECOMMENDATION_STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}
          </Select>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            icon={ImagePlus}
            title={rows.length ? 'Nothing matches these filters' : 'No image recommendations yet'}
            description={rows.length
              ? 'Widen the filters to see the rest of the backlog.'
              : 'Add them while authoring, or import them with the article. A recommendation says what a visual must teach and why prose is not enough.'}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <Tr>
                  <Th>Visual</Th>
                  <Th>Article</Th>
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
                      <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-3">{row.kind} · {row.teachingPurpose || <span className="text-warning">no teaching purpose recorded</span>}</span>
                      {(row.sourceDirection || row.rightsNotes) && (
                        <span className="mt-0.5 block text-[11px] text-ink-3">{[row.sourceDirection, row.rightsNotes].filter(Boolean).join(' · ')}</span>
                      )}
                    </Td>
                    <Td>
                      <span className="block text-[12.5px] text-ink-2">{row.articleTitle}</span>
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
              <p className="text-[13px] font-semibold text-ink">{requiredOutstanding.length} required visual{requiredOutstanding.length === 1 ? '' : 's'} still missing</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
                A `required` recommendation means the article cannot be understood reliably without it. Publishing the article before the visual exists ships an article a student cannot use.
              </p>
              <Link to="/admin/library" className="mt-2 inline-block"><Button variant="secondary" size="sm">Open Library Setup</Button></Link>
            </div>
          </div>
        </Panel>
      )}
    </PageContainer>
  )
}
