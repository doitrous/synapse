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
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { useScopedItems } from '@/lib/useScopedContent'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent,
  MEDIA_REQUEST_PRIORITIES, MEDIA_REQUEST_STATUSES, MEDIA_REQUEST_MEDIA,
  type MediaRequest, type ManagedContentItem, type PracticalAuthoringData,
} from '@/data/contentControl'
import { MEDICAL_TAXONOMY_INDEX } from '@/data/medicalLibraryTaxonomy'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { isStoredMediaReference } from '@/lib/mediaStorage'
import type { MediaPlacement } from '@/data/mediaLibrary'

interface Row extends MediaRequest {
  ownerId: string
  ownerTitle: string
  systemId: string
  systemTitle: string
}

const PRIORITY_TONE: Record<string, 'danger' | 'warning' | 'neutral'> = {
  required: 'danger',
  'strongly helpful': 'warning',
  optional: 'neutral',
}
/** The colour that lets the backlog be scanned rather than read row by row. */
const STATUS_DOT: Record<string, string> = {
  needed: 'bg-warning',
  planned: 'bg-primary',
  supplied: 'bg-success',
  declined: 'bg-ink-3',
}
const OWNER_LABEL: Record<MediaRequest['ownerKind'], string> = {
  article: 'Article',
  question: 'Question',
  practical: 'Practical',
}

/**
 * The catalogue an owner actually lives in.
 *
 * Every request used to link to Library Setup regardless of what was waiting, so a
 * question's missing diagram sent you to the article catalogue, which does not
 * contain it.
 */
const OWNER_CATALOGUE: Record<MediaRequest['ownerKind'], string> = {
  article: '/admin/library',
  question: '/admin/questions',
  practical: '/admin/practical',
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
  const [ledger, setLedger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  // The backlog shows only what this person may work on. `ledger` stays in
  // scope below for one reason — see `nodeByArticle`.
  const scoped = useScopedItems(ledger)
  const [query, setQuery] = useState('')
  const [system, setSystem] = useState('all')
  const [medium, setMedium] = useState('all')
  const [owner, setOwner] = useState('all')
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('needed,planned')

  const rows = useMemo<Row[]>(() => {
    // A question has no canonical placement of its own, so it inherits the one
    // belonging to the article that teaches its answer.
    // Built from the whole ledger, not the scoped view: this only reads an
    // article's placement so a question can inherit it, and the article that
    // places a question a reviewer owns may itself be one they cannot edit.
    const nodeByArticle = new Map(
      ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item.articleData?.primaryNodeId]),
    )
    return scoped.flatMap((item) => {
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
        ownerId: item.id,
        ownerTitle: item.title,
        systemId: root.id,
        systemTitle: root.title,
      }))
    })
  }, [ledger, scoped])

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

  /**
   * Move one request along.
   *
   * The backlog is only useful if it can be worked, and working it means
   * recording that an asset has been commissioned or has arrived. The request
   * lives inside whichever of the three authoring records owns it, so the update
   * rewrites that record's own list rather than keeping a parallel status table
   * that could disagree with it.
   */
  function setRequestStatus(row: Row, next: MediaRequest['status']) {
    setLedger((items) => items.map((item) => {
      if (item.id !== row.ownerId) return item
      const patch = (list: MediaRequest[] | undefined) =>
        list?.map((request) => (request.id === row.id ? { ...request, status: next } : request))
      if (item.kind === 'article' && item.articleData) return { ...item, articleData: { ...item.articleData, mediaRequests: patch(item.articleData.mediaRequests) } }
      if (item.kind === 'question' && item.questionData) return { ...item, questionData: { ...item.questionData, mediaRequests: patch(item.questionData.mediaRequests) } }
      if (item.kind === 'practical' && item.practicalData) {
        const practicalData = { ...item.practicalData, mediaRequests: patch(item.practicalData.mediaRequests) } as PracticalAuthoringData
        return { ...item, practicalData }
      }
      return item
    }))
  }

  /**
   * The backlog, grouped under the item waiting on it.
   *
   * Three images wanted by one question is one job. As loose rows it read as
   * three unrelated ones, scattered through a table sorted by something else.
   */
  const byOwner = useMemo(() => {
    const groups = new Map<string, Row[]>()
    visible.forEach((row) => {
      const group = groups.get(row.ownerId)
      if (group) group.push(row)
      else groups.set(row.ownerId, [row])
    })
    return [...groups.entries()]
  }, [visible])

  /** Every image that still lives in one browser and reaches nobody. */
  const stranded = useMemo(() => ledger.filter((item) => {
    const data = item.questionData
    if (isStoredMediaReference(data?.attachedImage ?? '')) return true
    return (data?.attachments ?? []).some((attachment) => isStoredMediaReference(attachment.url))
  }), [ledger])

  /**
   * Record that a request has been met.
   *
   * The placement and the request's status are written in one update, so a
   * fulfilled request and the image it refers to can never disagree — and
   * `supplied` becomes a fact set by the thing that made it true rather than a
   * label somebody applied.
   */
  function fulfil(row: Row, mediaId: string) {
    setLedger((items) => items.map((item) => {
      if (item.id !== row.ownerId || item.kind !== 'question' || !item.questionData) return item
      const placement: MediaPlacement = {
        id: `plc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        mediaId,
        slot: row.slot ?? 'stem',
        ...(row.slot === 'answer' && row.answerLabel ? { answerLabel: row.answerLabel } : {}),
      }
      return {
        ...item,
        questionData: {
          ...item.questionData,
          media: [...(item.questionData.media ?? []), placement],
          mediaRequests: item.questionData.mediaRequests?.map((request) =>
            request.id === row.id ? { ...request, status: 'supplied' as const, mediaId } : request),
        },
      }
    }))
  }

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

      {/* A backlog nobody can see is a backlog nobody works. These images were
          uploaded, confirmed, and reach no student — and until now nothing
          anywhere said so. */}
      {stranded.length > 0 && (
        <Panel className="mb-4 p-4">
          <div className="flex items-start gap-2.5">
            <Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0 text-warning" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-ink">
                {stranded.length} question{stranded.length === 1 ? '' : 's'} hold an image that only exists in one browser
              </p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
                These were attached before images were stored on the server. They render for whoever uploaded them and for
                nobody else. Open each one and use “Upload to the server” beside the image.
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {stranded.slice(0, 12).map((item) => (
                  <li key={item.id}>
                    <Link to={`/admin/questions?item=${encodeURIComponent(item.id)}`} className="inline-block max-w-[18rem] truncate rounded border border-line bg-surface px-2 py-1 text-[11.5px] text-ink-2 hover:border-primary-line hover:text-primary-strong">
                      {item.title}
                    </Link>
                  </li>
                ))}
                {stranded.length > 12 && <li className="self-center text-[11.5px] text-ink-3">and {stranded.length - 12} more</li>}
              </ul>
            </div>
          </div>
        </Panel>
      )}

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
          <div className="divide-y divide-line">
            {byOwner.map(([ownerId, ownerRows]) => (
              <section key={ownerId} className="p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge tone="outline">{OWNER_LABEL[ownerRows[0].ownerKind]}</Badge>
                  <Link to={`${OWNER_CATALOGUE[ownerRows[0].ownerKind]}?item=${encodeURIComponent(ownerId)}`} className="text-[13px] font-semibold text-ink underline decoration-line-2 underline-offset-2 hover:text-primary-strong">
                    {ownerRows[0].ownerTitle}
                  </Link>
                  <span className="text-[11.5px] text-ink-3">
                    {ownerRows.length} asset{ownerRows.length === 1 ? '' : 's'} wanted · {ownerRows[0].systemTitle}
                  </span>
                </div>
                <ul className="space-y-2">
                  {ownerRows.map((row) => <RequestRow key={row.id} row={row} onStatus={setRequestStatus} onFulfil={fulfil} />)}
                </ul>
              </section>
            ))}
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

/**
 * One wanted asset, and the means to supply it.
 *
 * The page could previously only re-label a status by hand, which is why
 * "supplied" meant that somebody typed it. Here the upload happens where the
 * request is, and the status follows from it.
 */
function RequestRow({ row, onStatus, onFulfil }: {
  row: Row
  onStatus: (row: Row, next: MediaRequest['status']) => void
  onFulfil: (row: Row, mediaId: string) => void
}) {
  const [picking, setPicking] = useState(false)
  const fulfillable = row.ownerKind === 'question' && row.medium === 'image'

  return (
    <li className="rounded-lg border border-line bg-surface-2/50 p-3">
      <div className="flex flex-wrap items-start gap-2">
        <span aria-hidden className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', STATUS_DOT[row.status] ?? 'bg-ink-3')} />
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-medium text-ink">{row.brief}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-ink-3">
            {row.medium}{row.medium === 'image' && row.kind !== 'other' ? ` · ${row.kind}` : ''}
            {row.slot ? ` · ${row.slot === 'answer' ? `answer ${row.answerLabel ?? '?'}` : row.slot}` : ''}
            {' · '}
            {row.teachingPurpose || <span className="text-warning">no teaching purpose recorded</span>}
          </p>
          {(row.sourceDirection || row.rightsNotes) && (
            <p className="mt-0.5 text-[11px] text-ink-3">{[row.sourceDirection, row.rightsNotes].filter(Boolean).join(' · ')}</p>
          )}
        </div>
        <Badge tone={PRIORITY_TONE[row.priority] ?? 'neutral'}>{row.priority}</Badge>
        <Select
          aria-label={`Status for ${row.brief}`}
          value={row.status}
          onChange={(event) => onStatus(row, event.target.value as MediaRequest['status'])}
          className="h-8 min-w-[8.5rem] text-[12px]"
        >
          {/* `supplied` is not offered: it is now a fact set by attaching an
              image that came back and rendered, not a label anyone applies. */}
          {MEDIA_REQUEST_STATUSES.map((value) => (
            <option key={value} value={value} disabled={value === 'supplied' && row.status !== 'supplied'}>{value}</option>
          ))}
        </Select>
        {fulfillable && row.status !== 'supplied' && !picking && (
          <Button size="sm" variant="secondary" iconLeft={ImagePlus} onClick={() => setPicking(true)}>Supply it</Button>
        )}
      </div>
      {picking && (
        <div className="mt-2">
          <MediaPicker onPick={(mediaId) => { setPicking(false); onFulfil(row, mediaId) }} onCancel={() => setPicking(false)} />
        </div>
      )}
      {!fulfillable && row.status !== 'supplied' && (
        <p className="mt-1.5 text-[11px] text-ink-3">
          {row.medium === 'image'
            ? 'Only questions can be supplied from here so far. Attach this one in its own editor.'
            : `${row.medium} is not held in the media library yet. Attach it in the item's own editor.`}
        </p>
      )}
    </li>
  )
}
