import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, Flag, ImagePlus, MessageSquare, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { SearchInput, Select, Textarea } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { useScopedItems } from '@/lib/useScopedContent'
import { useIdentity } from '@/lib/useIdentity'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent,
  MEDIA_REQUEST_PRIORITIES, MEDIA_REQUEST_STATUSES, MEDIA_REQUEST_MEDIA,
  type MediaRequest, type MediaReviewComment, type ManagedContentItem, type PracticalAuthoringData,
} from '@/data/contentControl'
import { MEDICAL_TAXONOMY_INDEX } from '@/data/medicalLibraryTaxonomy'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { isStoredMediaReference } from '@/lib/mediaStorage'
import {
  MEDIA_STATE_KEY, emptyMediaLibrary, mediaUrl,
  type MediaLibraryDocument, type MediaPlacement,
} from '@/data/mediaLibrary'

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
  concept: 'Concept',
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
  // A concept's request is fulfilled from the concept, not from whichever
  // article happens to mention it.
  concept: '/admin/concepts',
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
  const [mediaLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const identity = useIdentity()
  // The backlog shows only what this person may work on. `ledger` stays in
  // scope below for one reason — see `nodeByArticle`.
  const scoped = useScopedItems(ledger)
  const [query, setQuery] = useState('')
  const [system, setSystem] = useState('all')
  const [medium, setMedium] = useState('all')
  const [owner, setOwner] = useState('all')
  const [priority, setPriority] = useState('all')
  const [status, setStatus] = useState('needed,planned')
  const [reviewingId, setReviewingId] = useState<string | null>(null)

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

  const reviewing = rows.find((row) => row.id === reviewingId) ?? null
  const reviewingItem = reviewing ? ledger.find((item) => item.id === reviewing.ownerId) ?? null : null

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

  function addReviewComment(row: Row, comment: MediaReviewComment) {
    setLedger((items) => items.map((item) => {
      if (item.id !== row.ownerId) return item
      const patch = (list: MediaRequest[] | undefined) => list?.map((request) => (
        request.id === row.id
          ? { ...request, reviewComments: [...(request.reviewComments ?? []), comment] }
          : request
      ))
      if (item.kind === 'article' && item.articleData) return { ...item, articleData: { ...item.articleData, mediaRequests: patch(item.articleData.mediaRequests) } }
      if (item.kind === 'question' && item.questionData) return { ...item, questionData: { ...item.questionData, mediaRequests: patch(item.questionData.mediaRequests) } }
      if (item.kind === 'practical' && item.practicalData) return { ...item, practicalData: { ...item.practicalData, mediaRequests: patch(item.practicalData.mediaRequests) } as PracticalAuthoringData }
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
      if (item.id !== row.ownerId) return item
      const supplied = (requests: MediaRequest[] | undefined) => requests?.map((request) => (
        request.id === row.id ? { ...request, status: 'supplied' as const, mediaId } : request
      ))
      if (item.kind === 'question' && item.questionData) {
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
            media: [...(item.questionData.media ?? []).filter((candidate) => candidate.id !== placement.id), placement],
            mediaRequests: supplied(item.questionData.mediaRequests),
          },
        }
      }
      const record = mediaLibrary.records.find((candidate) => candidate.id === mediaId)
      if (!record) return item
      if (item.kind === 'article' && item.articleData) {
        return {
          ...item,
          articleData: {
            ...item.articleData,
            media: [...(item.articleData.media ?? []), {
              id: `article-media-${Date.now().toString(36)}`,
              type: 'image' as const,
              sourceId: mediaId,
              url: mediaUrl(mediaId),
              caption: record.title,
              altText: record.altText,
              rights: record.rights,
              necessity: row.teachingPurpose,
              ...(row.anchorQuote ? { anchor: { quote: row.anchorQuote, ...(row.block ? { block: row.block } : {}) } } : {}),
            }],
            mediaRequests: supplied(item.articleData.mediaRequests),
          },
        }
      }
      if (item.kind === 'practical' && item.practicalData) {
        const url = mediaUrl(mediaId)
        let practicalData: PracticalAuthoringData
        if (item.practicalData.format === 'osce') {
          practicalData = { ...item.practicalData, mediaUrl: url, mediaRequests: supplied(item.practicalData.mediaRequests) ?? [] }
        } else if (item.practicalData.format === 'case') {
          const target = row.section?.toLowerCase()
          const index = Math.max(0, item.practicalData.decisions.findIndex((decision) => (
            !target || decision.id.toLowerCase() === target || decision.title.toLowerCase() === target || decision.context.toLowerCase().includes(target)
          )))
          practicalData = {
            ...item.practicalData,
            decisions: item.practicalData.decisions.map((decision, current) => current === index ? { ...decision, mediaUrl: url } : decision),
            mediaRequests: supplied(item.practicalData.mediaRequests) ?? [],
          }
        } else {
          const target = row.section?.toLowerCase()
          const index = Math.max(0, item.practicalData.questions.findIndex((question) => (
            !target || question.id.toLowerCase() === target || question.context.toLowerCase().includes(target) || question.question.toLowerCase().includes(target)
          )))
          practicalData = {
            ...item.practicalData,
            questions: item.practicalData.questions.map((question, current) => current === index ? { ...question, mediaUrl: url } : question),
            mediaRequests: supplied(item.practicalData.mediaRequests) ?? [],
          }
        }
        return { ...item, practicalData }
      }
      return item
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
                {stranded.length === 1
                  ? '1 question holds an image that only exists in one browser'
                  : `${stranded.length} questions hold an image that only exists in one browser`}
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

      {reviewing && reviewingItem && (
        <ReviewerWorkspace
          row={reviewing}
          item={reviewingItem}
          reviewer={identity.displayName}
          onClose={() => setReviewingId(null)}
          onFulfil={fulfil}
          onComment={addReviewComment}
        />
      )}

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
                  {ownerRows.map((row) => (
                    <RequestRow
                      key={row.id}
                      row={row}
                      onStatus={setRequestStatus}
                      onReview={() => setReviewingId(row.id)}
                    />
                  ))}
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
function anchorOptions(row: Row, item: ManagedContentItem): string[] {
  if (item.kind === 'question') {
    return [
      'Question stem',
      ...(item.questionData?.answers ?? []).flatMap((answer) => [`Answer ${answer.label}`, `Explanation ${answer.label}`]),
    ]
  }
  if (item.kind === 'article') return ['Article summary', ...(item.articleData?.sections ?? []).map((section) => section.heading)]
  if (item.practicalData?.format === 'osce') return ['Candidate instructions', 'Station media', 'Mark scheme']
  if (item.practicalData?.format === 'case') return item.practicalData.decisions.map((decision) => decision.title || decision.id)
  if (item.practicalData?.format === 'lab') return item.practicalData.questions.map((question) => question.id)
  return [row.section || 'Content']
}

function requestedAnchor(row: Row): string {
  if (row.slot === 'answer') return `Answer ${row.answerLabel ?? ''}`.trim()
  if (row.slot === 'explanation') return row.answerLabel ? `Explanation ${row.answerLabel}` : 'Explanation'
  if (row.slot === 'stem') return 'Question stem'
  return row.section || (row.block === 'summary' ? 'Article summary' : 'Content')
}

function Target({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-lg border p-3', active ? 'border-warning bg-warning/10 ring-2 ring-warning/20' : 'border-line bg-surface')}>
      {active && <p className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-warning-strong">Requested media goes here</p>}
      {children}
    </div>
  )
}

function StudentContentPreview({ row, item }: { row: Row; item: ManagedContentItem }) {
  const anchor = requestedAnchor(row).toLowerCase()
  if (item.kind === 'question' && item.questionData) {
    return (
      <div className="space-y-3">
        <Target active={anchor === 'question stem'}><p className="text-[14px] font-semibold leading-relaxed text-ink">{item.title}</p></Target>
        <ol className="space-y-2" aria-label="Answer choices">
          {item.questionData.answers.map((answer) => (
            <li key={answer.label} className="space-y-1.5">
              <Target active={anchor === `answer ${answer.label}`.toLowerCase()}>
                <p className="text-[12.5px] text-ink"><span className="me-2 font-bold">{answer.label}.</span>{answer.text}</p>
              </Target>
              {answer.explanation && (
                <Target active={anchor === `explanation ${answer.label}`.toLowerCase() || (anchor === 'explanation' && answer.label === item.questionData?.correctAnswer)}>
                  <p className="text-[11.5px] leading-relaxed text-ink-2"><span className="font-semibold">Explanation:</span> {answer.explanation}</p>
                </Target>
              )}
            </li>
          ))}
        </ol>
      </div>
    )
  }
  if (item.kind === 'article' && item.articleData) {
    return (
      <article className="space-y-3">
        <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
        <Target active={anchor === 'article summary' || row.block === 'summary'}><p className="text-[12.5px] leading-relaxed text-ink-2">{item.articleData.summary || 'No summary written yet.'}</p></Target>
        {item.articleData.sections.map((section) => (
          <Target key={section.id} active={anchor === section.heading.toLowerCase() || row.section === section.id || (row.anchorQuote ? `${section.body} ${section.narrative ?? ''}`.includes(row.anchorQuote) : false)}>
            <h4 className="text-[13px] font-semibold text-ink">{section.heading}</h4>
            <p className="mt-1 whitespace-pre-wrap text-[12px] leading-relaxed text-ink-2">{section.narrative || section.body || 'This section is empty.'}</p>
          </Target>
        ))}
      </article>
    )
  }
  const practical = item.practicalData
  if (!practical) return <p className="text-[12px] text-ink-3">This content has no previewable student payload.</p>
  if (practical.format === 'osce') {
    return (
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
        <Target active={anchor === 'candidate instructions' || anchor === 'station media'}><p className="whitespace-pre-wrap text-[12.5px] leading-relaxed text-ink">{practical.candidateInstructions}</p></Target>
      </div>
    )
  }
  if (practical.format === 'case') {
    return (
      <div className="space-y-3">
        <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
        {practical.decisions.map((decision) => (
          <Target key={decision.id} active={anchor === decision.title.toLowerCase() || row.section === decision.id}>
            <h4 className="text-[13px] font-semibold text-ink">{decision.title}</h4>
            <p className="mt-1 text-[12px] text-ink-2">{decision.context}</p>
            <p className="mt-2 text-[12.5px] font-medium text-ink">{decision.question}</p>
          </Target>
        ))}
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
      {practical.questions.map((question) => (
        <Target key={question.id} active={anchor === question.id.toLowerCase() || row.section === question.id}>
          <p className="text-[12px] text-ink-2">{question.context}</p>
          <p className="mt-2 text-[12.5px] font-medium text-ink">{question.question}</p>
        </Target>
      ))}
    </div>
  )
}

function ReviewerWorkspace({ row, item, reviewer, onClose, onFulfil, onComment }: {
  row: Row
  item: ManagedContentItem
  reviewer: string
  onClose: () => void
  onFulfil: (row: Row, mediaId: string) => void
  onComment: (row: Row, comment: MediaReviewComment) => void
}) {
  const anchors = anchorOptions(row, item)
  const [anchor, setAnchor] = useState(requestedAnchor(row))
  const [comment, setComment] = useState('')
  const [picking, setPicking] = useState(false)

  function saveComment(kind: MediaReviewComment['kind']) {
    const text = comment.trim()
    if (!text) return
    onComment(row, {
      id: `media-comment-${Date.now().toString(36)}`,
      anchor,
      kind,
      text,
      author: reviewer,
      createdAt: new Date().toISOString(),
    })
    setComment('')
  }

  return (
    <Panel className="mb-4 overflow-hidden" aria-label={`Review media request for ${row.ownerTitle}`}>
      <PanelHeader title="Reviewer workspace" icon={Eye} hint="Student view and fulfilment" />
      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <section className="border-b border-line p-4 lg:border-b-0 lg:border-e" aria-label="Student preview">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-3">Exactly as authored for students</p>
              <p className="mt-0.5 text-[12px] text-ink-2">The amber frame marks the slot this request must fulfil.</p>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
          </div>
          <StudentContentPreview row={row} item={item} />
        </section>
        <aside className="space-y-4 bg-surface-2/45 p-4">
          <div>
            <div className="flex flex-wrap gap-1.5">
              <Badge tone={PRIORITY_TONE[row.priority] ?? 'neutral'}>{row.priority}</Badge>
              <Badge tone="outline">{row.medium}{row.medium === 'image' ? ` · ${row.kind}` : ''}</Badge>
              <Badge tone={row.status === 'supplied' ? 'success' : 'warning'}>{row.status}</Badge>
            </div>
            <h3 className="mt-2 text-[14px] font-semibold text-ink">{row.brief}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-2"><span className="font-semibold">Why it is needed:</span> {row.teachingPurpose || 'No teaching purpose recorded.'}</p>
            {row.sourceDirection && <p className="mt-1 text-[11.5px] text-ink-3"><span className="font-semibold">Source direction:</span> {row.sourceDirection}</p>}
            {row.rightsNotes && <p className="mt-1 text-[11.5px] text-ink-3"><span className="font-semibold">Rights:</span> {row.rightsNotes}</p>}
          </div>

          {row.status !== 'supplied' && row.medium === 'image' && !picking && (
            <Button size="sm" variant="primary" iconLeft={ImagePlus} onClick={() => setPicking(true)}>Upload or choose image</Button>
          )}
          {picking && <MediaPicker onPick={(mediaId) => { setPicking(false); onFulfil(row, mediaId) }} onCancel={() => setPicking(false)} />}
          {row.status !== 'supplied' && row.medium !== 'image' && (
            <p className="rounded-lg border border-line bg-surface p-3 text-[11.5px] leading-relaxed text-ink-2">Audio and video requests remain publication-blocking until the managed media service accepts those formats.</p>
          )}

          <div className="border-t border-line pt-4">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink"><Icon icon={MessageSquare} size={14} /> Anchored review notes</p>
            <Select className="mt-2" aria-label="Comment anchor" value={anchor} onChange={(event) => setAnchor(event.target.value)}>
              {[...new Set([requestedAnchor(row), ...anchors])].map((value) => <option key={value} value={value}>{value}</option>)}
            </Select>
            <Textarea className="mt-2 min-h-24" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Explain the issue or leave guidance for the author…" />
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" iconLeft={MessageSquare} disabled={!comment.trim()} onClick={() => saveComment('comment')}>Add comment</Button>
              <Button size="sm" variant="ghost" iconLeft={Flag} disabled={!comment.trim()} onClick={() => saveComment('problem')}>Report a problem</Button>
            </div>
            {(row.reviewComments?.length ?? 0) > 0 && (
              <ol className="mt-3 space-y-2">
                {row.reviewComments?.map((entry) => (
                  <li key={entry.id} className={cn('rounded-lg border p-2.5', entry.kind === 'problem' ? 'border-danger/30 bg-danger/5' : 'border-line bg-surface')}>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">{entry.kind === 'problem' ? 'Problem' : 'Comment'} · {entry.anchor}</p>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{entry.text}</p>
                    <p className="mt-1 text-[10.5px] text-ink-3">{entry.author} · {new Date(entry.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </aside>
      </div>
    </Panel>
  )
}

function RequestRow({ row, onStatus, onReview }: {
  row: Row
  onStatus: (row: Row, next: MediaRequest['status']) => void
  onReview: () => void
}) {
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
        <Button size="sm" variant="secondary" iconLeft={Eye} onClick={onReview}>Review &amp; supply</Button>
      </div>
    </li>
  )
}
