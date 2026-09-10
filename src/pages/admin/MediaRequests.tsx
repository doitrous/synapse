import { LoadingRegion, SkeletonTable } from '@/components/loading/SkeletonParts'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, Archive, CircleCheck, Eye, FileAudio, FileVideo, Flag, ImagePlus, Library as LibraryIcon,
  ListChecks, Megaphone, MessageSquare, RefreshCw, ShieldAlert, TriangleAlert, Upload, XCircle,
} from 'lucide-react'
import { NishanyLoader } from '@/components/ui/NishanyLoader'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { Meter } from '@/components/ui/Meter'
import { Toggle } from '@/components/ui/Toggle'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { useScopedItems } from '@/lib/useScopedContent'
import { useIdentity, type Identity } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { useI18n } from '@/lib/i18n'
import { ApiError, apiDelete, apiPost } from '@/lib/api'
import { ROLE_LABEL } from '@/data/adminRoles'
import {
  CONTENT_LEDGER_STORAGE_KEY, initialManagedContent,
  MEDIA_REQUEST_PRIORITIES, MEDIA_REQUEST_STATUSES, MEDIA_REQUEST_MEDIA, MEDIA_REQUEST_OWNER_KINDS,
  ESCALATION_PRIORITIES, mediaRequestsOf,
  type MediaRequest, type MediaRequestStatus, type MediaReviewComment, type ManagedContentItem,
  type PracticalAuthoringData, type EscalationPriority, type MediaEscalationEvent,
} from '@/data/contentControl'
import type { Status } from '@/data/admin'
import { MEDICAL_TAXONOMY_INDEX } from '@/data/medicalLibraryTaxonomy'
import { StudentFaithfulPreview, type PreviewAnchor } from '@/components/review/StudentFaithfulPreview'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { isStoredMediaReference } from '@/lib/mediaStorage'
import {
  MEDIA_STATE_KEY, emptyMediaLibrary, mediaReleaseBlockers, mediaTypeOf, mediaUrl,
  type ManagedMediaType, type MediaLibraryDocument, type MediaPlacement, type MediaRecord,
} from '@/data/mediaLibrary'
import { startMediaUpload, MEDIA_TYPE_MAX_BYTES, type MediaUploadState } from '@/lib/mediaUpload'
import { FilterBar } from '@/components/filters/FilterBar'
import { useFilterState } from '@/components/filters/useFilterState'
import type { SecondaryFilterDef, StatusTabOption } from '@/components/filters/types'
import type { CurriculumScope } from '@/data/curriculumFilters'
import {
  curriculumScopeHasModule,
  mediaRequestCurriculumScope,
  mediaRequestModuleOptions,
  sortMediaRequestRows,
  type MediaRequestCurriculumSort,
  type MediaRequestCurriculumScope,
} from '@/data/mediaRequestCurriculum'

/**
 * The reviewer's Media Requests console.
 *
 * Rebuilt against a server-authoritative contract: this page never marks a
 * request "supplied" itself. Attaching media only ever sets `mediaId`; the
 * server promotes the status once the attached media is independently
 * verified `ready` (see `mediaUpload.ts` and the server's media pipeline). A
 * reviewer here can no longer hand-set `planned`/`declined` either — those
 * remain editor moves — and an escalated request is read-only until an
 * editor returns or resolves it.
 */

interface Row extends MediaRequest {
  ownerId: string
  ownerTitle: string
  ownerStatus: Status
  systemId: string
  systemTitle: string
  curriculum: MediaRequestCurriculumScope
}

const PRIORITY_TONE: Record<string, 'danger' | 'warning' | 'neutral'> = {
  required: 'danger',
  'strongly helpful': 'warning',
  optional: 'neutral',
}
const STATUS_TONE: Record<MediaRequestStatus, 'warning' | 'primary' | 'success' | 'neutral'> = {
  needed: 'warning',
  planned: 'primary',
  supplied: 'success',
  declined: 'neutral',
}
/** The colour that lets the backlog be scanned rather than read row by row. */
const STATUS_DOT: Record<MediaRequestStatus, string> = {
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

const WORKFLOW_STEPS = [
  'Choose a relevant request.',
  'Review the content exactly as a student sees it.',
  'Upload or select suitable media and complete its metadata.',
  'Wait while uploading, processing and playback/render verification finish.',
  'The request becomes supplied automatically only after verification.',
  'Submit a Content Report or escalate when it cannot be completed safely.',
]

const STATUS_TAB_DEFS: { id: string; label: string; match: (status: MediaRequestStatus) => boolean }[] = [
  { id: 'outstanding', label: 'Outstanding', match: (status) => status === 'needed' || status === 'planned' },
  { id: 'needed', label: 'Needed', match: (status) => status === 'needed' },
  { id: 'supplied', label: 'Supplied', match: (status) => status === 'supplied' },
  { id: 'declined', label: 'Declined', match: (status) => status === 'declined' },
  { id: 'all', label: 'All', match: () => true },
]

const FILTER_DEFAULTS = {
  q: '',
  status: 'outstanding',
  universityId: '',
  yearId: '',
  moduleId: '',
  medium: [] as string[],
  priority: [] as string[],
  type: [] as string[],
  sort: 'priority',
  archived: '',
}

/** Rewrite a request wherever the authoring contract anchored it. */
function patchMediaRequest<T>(value: T, requestId: string, patch: (request: MediaRequest) => MediaRequest): T {
  if (Array.isArray(value)) return value.map((entry) => patchMediaRequest(entry, requestId, patch)) as T
  if (!value || typeof value !== 'object') return value
  let changed = false
  const next = Object.fromEntries(Object.entries(value).map(([key, inner]) => {
    if (key === 'mediaRequests' && Array.isArray(inner)) {
      const requests = (inner as MediaRequest[]).map((request) => request.id === requestId ? patch(request) : request)
      changed ||= requests.some((request, index) => request !== inner[index])
      return [key, requests]
    }
    const nested = patchMediaRequest(inner, requestId, patch)
    changed ||= nested !== inner
    return [key, nested]
  }))
  return (changed ? next : value) as T
}

/** The canonical root a request's owner sits under, for grouping. */
function rootOf(nodeId: string | undefined): { id: string; title: string } {
  if (!nodeId) return { id: '—', title: 'No canonical placement' }
  const lineage = MEDICAL_TAXONOMY_INDEX.lineage(nodeId)
  const root = lineage[0]
  return root ? { id: root.id, title: root.title } : { id: nodeId, title: nodeId }
}

/** Where the requested asset belongs, for `StudentFaithfulPreview`'s amber highlight. */
function mediaRequestAnchor(row: Row): PreviewAnchor {
  return { section: row.section, slot: row.slot, answerLabel: row.answerLabel, quote: row.anchorQuote }
}

/**
 * Whether an already-stored media record is safe to attach.
 *
 * Reads `status` defensively through `unknown`: the truthful upload state
 * machine (queued/uploading/.../ready/failed) lands on `MediaRecord` from a
 * parallel change (see the media pipeline notes), and this keeps compiling —
 * and behaving safely — whether or not that field exists yet in this
 * worktree. A record with no `status` at all (every record minted before the
 * pipeline existed) reads as usable; an explicit non-`'ready'` status blocks
 * the attach client-side, ahead of the server's own refusal.
 */
function isMediaUsable(record: Pick<MediaRecord, 'id'> | null | undefined): boolean {
  if (!record) return true
  const status = (record as unknown as { status?: unknown }).status
  return status == null || status === 'ready'
}

function roleLabelFor(identity: Identity): string {
  return identity.role ? (ROLE_LABEL[identity.role] ?? 'Reviewer') : 'Reviewer'
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
  const identity = useIdentity()
  const { t } = useI18n()
  const [universityCatalogue] = useUniversityCatalogue()
  const [ledger, setLedger, ledgerStatus] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [mediaLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  // The backlog shows only what this person may work on. `ledger` stays in
  // scope below for one reason — see `nodeByArticle`.
  const scoped = useScopedItems(ledger)
  const [filters, setFilters] = useFilterState(FILTER_DEFAULTS, { enabled: true, prefix: 'mr.' })
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const allModuleOptions = useMemo(() => mediaRequestModuleOptions(universityCatalogue), [universityCatalogue])
  const moduleOptionByKey = useMemo(() => new Map(allModuleOptions.map((option) => [option.key, option])), [allModuleOptions])

  const canManage = identity.rank >= 2
  const isReviewerTier = identity.rank <= 1
  const hasAccess = identity.loading || identity.tabs.includes('media') || canManage

  const baseRows = useMemo<Row[]>(() => {
    // A question has no canonical placement of its own, so it inherits the one
    // belonging to the article that teaches its answer.
    // Built from the whole ledger, not the scoped view: this only reads an
    // article's placement so a question can inherit it, and the article that
    // places a question a reviewer owns may itself be one they cannot edit.
    const nodeByArticle = new Map(
      ledger.filter((item) => item.kind === 'article').map((item) => [item.id, item.articleData?.primaryNodeId]),
    )
    return scoped.flatMap((item) => {
      const requests = mediaRequestsOf(item)
      if (!requests?.length) return []
      const nodeId =
        item.kind === 'article' ? item.articleData?.primaryNodeId
        : item.kind === 'question' ? nodeByArticle.get(item.questionData?.libraryIds?.[0] ?? '')
        : undefined
      const root = rootOf(nodeId)
      const curriculum = mediaRequestCurriculumScope(item, universityCatalogue)
      return requests.map((request) => ({
        ...request,
        ownerId: item.id,
        ownerTitle: item.title,
        ownerStatus: item.status,
        systemId: root.id,
        systemTitle: root.title,
        curriculum,
      }))
    })
  }, [ledger, scoped, universityCatalogue])

  // Requirement #3: a media request whose owning content is archived never
  // reaches the actionable reviewer queue. Editors/superadmins may opt in via
  // the toggle below (still off by default) to see it for reference.
  const showArchivedOwner = canManage && filters.archived === '1'
  const rows = useMemo(
    () => showArchivedOwner ? baseRows : baseRows.filter((row) => row.ownerStatus !== 'Archived'),
    [baseRows, showArchivedOwner],
  )
  const archivedOwnerCount = useMemo(() => baseRows.filter((row) => row.ownerStatus === 'Archived').length, [baseRows])

  const scope = useMemo<CurriculumScope>(() => ({
    universityId: filters.universityId || undefined,
    yearId: filters.yearId || undefined,
    moduleId: filters.moduleId || undefined,
  }), [filters.universityId, filters.yearId, filters.moduleId])
  const moduleOption = filters.moduleId ? moduleOptionByKey.get(filters.moduleId) : undefined

  const preStatus = useMemo(() => {
    const mediumSet = new Set(filters.medium)
    const prioritySet = new Set(filters.priority)
    const typeSet = new Set(filters.type)
    const q = filters.q.trim().toLowerCase()
    return rows.filter((row) => {
      if (mediumSet.size && !mediumSet.has(row.medium)) return false
      if (prioritySet.size && !prioritySet.has(row.priority)) return false
      if (typeSet.size && !typeSet.has(row.ownerKind)) return false
      if (scope.universityId && !row.curriculum.universityIds.includes(scope.universityId)) return false
      if (scope.yearId && !row.curriculum.yearIds.includes(scope.yearId)) return false
      if (moduleOption && !curriculumScopeHasModule(row.curriculum, moduleOption)) return false
      if (!q) return true
      return `${row.brief} ${row.teachingPurpose} ${row.ownerTitle} ${row.medium} ${row.kind}`.toLowerCase().includes(q)
    })
  }, [rows, filters.medium, filters.priority, filters.type, filters.q, scope, moduleOption])

  const statusTabs = useMemo<StatusTabOption[]>(() => STATUS_TAB_DEFS.map((def) => ({
    id: def.id,
    label: t(def.label),
    count: preStatus.filter((row) => def.match(row.status)).length,
  })), [preStatus, t])

  const visible = useMemo(() => {
    const active = STATUS_TAB_DEFS.find((def) => def.id === filters.status) ?? STATUS_TAB_DEFS[0]
    return preStatus.filter((row) => active.match(row.status))
  }, [preStatus, filters.status])

  const ordered = useMemo(
    () => sortMediaRequestRows(visible, filters.sort as MediaRequestCurriculumSort, universityCatalogue, allModuleOptions),
    [allModuleOptions, filters.sort, universityCatalogue, visible],
  )

  const secondaryFilters = useMemo<SecondaryFilterDef[]>(() => [
    { id: 'medium', label: t('Medium'), type: 'multi', options: MEDIA_REQUEST_MEDIA.map((value) => ({ id: value, label: t(value) })) },
    { id: 'priority', label: t('Priority'), type: 'multi', options: MEDIA_REQUEST_PRIORITIES.map((value) => ({ id: value, label: t(value) })) },
    { id: 'type', label: t('Content type'), type: 'multi', options: MEDIA_REQUEST_OWNER_KINDS.map((value) => ({ id: value, label: t(OWNER_LABEL[value]) })) },
  ], [t])

  const reviewing = rows.find((row) => row.id === reviewingId) ?? null
  const reviewingItem = reviewing ? ledger.find((item) => item.id === reviewing.ownerId) ?? null : null

  /**
   * Move one request along.
   *
   * Reviewers never reach this any more (their status control was removed —
   * see `RequestRow`); editors may still move a request between
   * `needed`/`planned`/`declined`. `supplied` is refused here even for
   * editors — it is a fact the server sets once the attached media verifies,
   * never a label anyone applies by hand.
   */
  function setRequestStatus(row: Row, next: MediaRequestStatus) {
    if (next === 'supplied') return
    setLedger((items) => items.map((item) => item.id === row.ownerId
      ? patchMediaRequest(item, row.id, (request) => ({ ...request, status: next }))
      : item))
  }

  function addReviewComment(row: Row, comment: MediaReviewComment) {
    setLedger((items) => items.map((item) => item.id === row.ownerId
      ? patchMediaRequest(item, row.id, (request) => ({ ...request, reviewComments: [...(request.reviewComments ?? []), comment] }))
      : item))
  }

  /** A reviewer's request for editorial help. Once open, the server refuses this reviewer's further edits to it. */
  function escalate(row: Row, reason: string, priority: EscalationPriority) {
    const at = new Date().toISOString()
    const actorRole = roleLabelFor(identity)
    const event: MediaEscalationEvent = { at, actorId: identity.userId, actorName: identity.displayName, actorRole, action: 'escalated', note: reason }
    setLedger((items) => items.map((item) => item.id === row.ownerId
      ? patchMediaRequest(item, row.id, (request) => ({
        ...request,
        escalation: {
          reason,
          priority,
          byUserId: identity.userId,
          byName: identity.displayName,
          byRole: actorRole,
          at,
          status: 'open',
          history: [...(request.escalation?.history ?? []), event],
        },
      }))
      : item))
  }

  /** "Report a problem" no longer just leaves a local note — it files a real Content Report. */
  async function reportProblem(row: Row, item: ManagedContentItem, note: string): Promise<string | null> {
    try {
      await apiPost('/content-reports', {
        contentKind: row.ownerKind === 'article' ? 'library article' : row.ownerKind === 'question' ? 'question' : 'image',
        contentId: row.ownerId,
        contentTitle: row.ownerTitle,
        field: requestedAnchor(row),
        anchor: row.anchorQuote || requestedAnchor(row),
        snapshot: `Media request: ${row.brief} (${row.medium}${row.medium === 'image' ? ` · ${row.kind}` : ''}, ${row.priority}) for “${item.title}”.`,
        category: 'Media request problem',
        note,
      })
      return null
    } catch (error) {
      const detail = error instanceof ApiError && error.body && typeof error.body === 'object' ? (error.body as { error?: unknown; reason?: unknown }) : null
      const stated = (typeof detail?.reason === 'string' && detail.reason) || (typeof detail?.error === 'string' && detail.error)
      return stated || 'That report could not be sent. Try again.'
    }
  }

  /**
   * Record that a request has been met.
   *
   * The placement and the request's `mediaId` are written in one update. The
   * request's `status` is deliberately left untouched: the server alone moves
   * it to `supplied`, once it has independently verified the attached media
   * is `ready`. If it is not, the save comes back refused (409
   * `media_not_ready`) — see `ledgerStatus.conflict` in the workspace below.
   */
  function fulfil(row: Row, mediaId: string, destination: string, suppliedRecord?: MediaRecord): string | null {
    if (row.escalation?.status === 'open') return 'This request is escalated to the editorial team and is read-only until it is returned or resolved.'
    const ownerItem = ledger.find((item) => item.id === row.ownerId)
    if (!ownerItem) return 'The owning content changed. Reload this page and try again.'
    const record = suppliedRecord ?? mediaLibrary.records.find((candidate) => candidate.id === mediaId)
    if (ownerItem.kind !== 'question' && !record) return 'The stored media record is still saving. Wait a moment and try again.'
    if (record && !isMediaUsable(record)) return 'This media has not finished verification yet. Wait for it to become ready, then attach it.'

    const questionAnswer = /^answer\s+([A-F])$/i.exec(destination.trim())
    const questionExplanation = /^explanation\s+([A-F])$/i.exec(destination.trim())
    if (ownerItem.kind === 'question' && destination.trim().toLowerCase() !== 'question stem' && !questionAnswer && !questionExplanation) {
      return 'Choose the question stem, a specific answer, or a specific answer explanation before supplying the media.'
    }

    let practicalIndex = -1
    if (ownerItem.kind === 'practical' && ownerItem.practicalData && ownerItem.practicalData.format !== 'osce') {
      const target = (destination || row.section || '').trim().toLowerCase()
      if (!target) return 'Choose the exact practical section where this media belongs.'
      practicalIndex = ownerItem.practicalData.format === 'case'
        ? ownerItem.practicalData.decisions.findIndex((decision) => (
          decision.id.toLowerCase() === target || decision.title.toLowerCase() === target || decision.context.toLowerCase().includes(target)
        ))
        : ownerItem.practicalData.questions.findIndex((question) => (
          question.id.toLowerCase() === target || question.context.toLowerCase().includes(target) || question.question.toLowerCase().includes(target)
        ))
      if (practicalIndex < 0) return 'That practical section no longer exists. Choose a current section before supplying the media.'
    }

    setLedger((items) => items.map((item) => {
      if (item.id !== row.ownerId) return item
      let updated: ManagedContentItem = item
      if (item.kind === 'question' && item.questionData) {
        const slot: MediaPlacement['slot'] = questionAnswer
          ? 'answer'
          : questionExplanation
            ? 'explanation'
            : 'stem'
        const answerLabel = (questionAnswer?.[1] ?? questionExplanation?.[1])?.toUpperCase() as MediaPlacement['answerLabel'] | undefined
        const placement: MediaPlacement = {
          id: `plc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
          mediaId,
          slot,
          ...((slot === 'answer' || slot === 'explanation') && (answerLabel ?? row.answerLabel) ? { answerLabel: answerLabel ?? row.answerLabel } : {}),
        }
        updated = {
          ...item,
          questionData: {
            ...item.questionData,
            media: [...(item.questionData.media ?? []).filter((candidate) => candidate.id !== placement.id), placement],
          },
        }
      } else {
        if (!record) return item
        if (item.kind === 'article' && item.articleData) {
          const articleBlock = destination.trim().toLowerCase() === 'article summary' ? 'summary' : 'body'
          updated = {
            ...item,
            articleData: {
              ...item.articleData,
              media: [...(item.articleData.media ?? []), {
                id: `article-media-${Date.now().toString(36)}`,
                type: mediaTypeOf(record),
                sourceId: mediaId,
                url: mediaUrl(mediaId),
                caption: record.title,
                altText: record.altText,
                rights: record.rights,
                necessity: row.teachingPurpose,
                locator: destination,
                ...(row.anchorQuote ? { anchor: { quote: row.anchorQuote, block: articleBlock } } : {}),
              }],
            },
          }
        } else if (item.kind === 'practical' && item.practicalData) {
          const url = mediaUrl(mediaId)
          const mediaType = mediaTypeOf(record)
          const mediaMimeType = record.mimeType
          let practicalData: PracticalAuthoringData
          if (item.practicalData.format === 'osce') {
            practicalData = { ...item.practicalData, mediaUrl: url, mediaType, mediaMimeType }
          } else if (item.practicalData.format === 'case') {
            practicalData = {
              ...item.practicalData,
              decisions: item.practicalData.decisions.map((decision, current) => current === practicalIndex ? { ...decision, mediaUrl: url, mediaType, mediaMimeType } : decision),
            }
          } else {
            practicalData = {
              ...item.practicalData,
              questions: item.practicalData.questions.map((question, current) => current === practicalIndex ? { ...question, mediaUrl: url, mediaType, mediaMimeType } : question),
            }
          }
          updated = { ...item, practicalData }
        }
      }
      // Verified media has been attached, so the request is supplied — reflected
      // here for an immediate queue update rather than only on the next reload.
      // This is not a reviewer hand-marking supplied: it always rides an attach,
      // which is the one way to reach supplied, and the write route still verifies
      // the media is genuinely ready and refuses the whole save (media_not_ready)
      // if it is not — rolling this optimistic status back with it.
      return patchMediaRequest(updated, row.id, (request) => ({ ...request, mediaId, status: 'supplied' }))
    }))
    return null
  }

  const outstanding = rows.filter((row) => row.status === 'needed' || row.status === 'planned')
  const requiredOutstanding = outstanding.filter((row) => row.priority === 'required')

  /** Every image that still lives in one browser and reaches nobody. */
  const stranded = useMemo(() => ledger.filter((item) => {
    const data = item.questionData
    if (isStoredMediaReference(data?.attachedImage ?? '')) return true
    return (data?.attachments ?? []).some((attachment) => isStoredMediaReference(attachment.url))
  }), [ledger])

  /**
   * The backlog, grouped under the item waiting on it.
   *
   * Three images wanted by one question is one job. As loose rows it read as
   * three unrelated ones, scattered through a table sorted by something else.
   */
  const byOwner = useMemo(() => {
    const groups = new Map<string, Row[]>()
    ordered.forEach((row) => {
      const group = groups.get(row.ownerId)
      if (group) group.push(row)
      else groups.set(row.ownerId, [row])
    })
    return [...groups.entries()]
  }, [ordered])

  if (!identity.loading && !hasAccess) {
    return (
      <PageContainer>
        <EmptyState
          icon={ShieldAlert}
          title={t('You do not have access to Media Requests')}
          description={t('Ask an editor to grant the Media Requests tab if you believe this is wrong.')}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <Link to="/admin/library" className="-ms-2 mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-[12.5px] text-ink-3 hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-9">
        <Icon icon={ArrowLeft} size={14} className="rtl:-scale-x-100" /> {t('Back to Library Setup')}
      </Link>
      <PageHeader
        title={t('Media requests')}
        description={t('Images, recordings and clips that an article, question or practical needs but does not yet have. These are editorial instructions for a person — a separate record from student media, never appearing in a published article, its HTML, its search data, or any student API response.')}
      />

      {isReviewerTier && (
        <div className="mb-5 overflow-hidden rounded-2xl border border-primary-line bg-primary-tint/25 shadow-panel">
          <div className="flex items-center gap-2.5 border-b border-primary-line/60 bg-primary-tint/45 px-4 py-3 sm:px-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-on-primary"><Icon icon={ListChecks} size={17} /></span>
            <h2 className="font-serif text-[16px] font-bold text-ink">{t('How to work a media request')}</h2>
          </div>
          <ol className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-xl border border-primary-line/40 bg-surface p-3">
                <span className="tnum grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[13px] font-bold text-on-primary">{index + 1}</span>
                <p className="text-[13px] leading-snug text-ink">{t(step)}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

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
                  ? t('1 question holds an image that only exists in one browser')
                  : t('{count} questions hold an image that only exists in one browser').replace('{count}', String(stranded.length))}
              </p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
                {t('These were attached before images were stored on the server. They render for whoever uploaded them and for nobody else. Open each one and use “Upload to the server” beside the image.')}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {stranded.slice(0, 12).map((item) => (
                  <li key={item.id}>
                    <Link to={`/admin/questions?item=${encodeURIComponent(item.id)}`} className="inline-block max-w-[18rem] truncate rounded border border-line bg-surface px-2 py-1 text-[11.5px] text-ink-2 hover:border-primary-line hover:text-primary-strong">
                      {item.title}
                    </Link>
                  </li>
                ))}
                {stranded.length > 12 && <li className="self-center text-[11.5px] text-ink-3">{t('and {count} more').replace('{count}', String(stranded.length - 12))}</li>}
              </ul>
            </div>
          </div>
        </Panel>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">{t('Outstanding')}</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-ink">{outstanding.length}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{t('of {count} recorded').replace('{count}', String(rows.length))}</p>
        </Panel>
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">{t('Required, still missing')}</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-danger">{requiredOutstanding.length}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{t('the item cannot publish without these')}</p>
        </Panel>
        <Panel className="p-4">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">{t('Systems affected')}</p>
          <p className="tnum mt-1 font-mono text-[22px] font-bold text-ink">{new Set(outstanding.map((row) => row.systemId)).size}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{t('of {count} with any request').replace('{count}', String(new Set(rows.map((row) => row.systemId)).size))}</p>
        </Panel>
      </div>

      {ledgerStatus.error && (
        <Panel className="mb-4 border-danger/30 bg-danger-tint/50 p-3.5">
          <p className="flex items-center gap-2 text-[12.5px] font-medium text-danger">
            <Icon icon={TriangleAlert} size={15} />
            {!ledgerStatus.hydrated
              ? t('The backlog could not be loaded. Check your connection and reload the page.')
              : (ledgerStatus.conflict || t('The last change could not be saved. Reload the page and try again.'))}
          </p>
        </Panel>
      )}

      {reviewing && reviewingItem && (
        <ReviewerWorkspace
          row={reviewing}
          item={reviewingItem}
          identity={identity}
          canManage={canManage}
          ledgerConflict={ledgerStatus.conflict}
          onClose={() => setReviewingId(null)}
          onFulfil={fulfil}
          onComment={addReviewComment}
          onEscalate={escalate}
          onReportProblem={reportProblem}
        />
      )}

      <Panel className="overflow-hidden">
        <PanelHeader
          title={t('Backlog')}
          icon={ImagePlus}
          action={(
            <div className="flex items-center gap-2">
              {canManage && archivedOwnerCount > 0 && (
                <label className="flex items-center gap-2 text-[11.5px] text-ink-2">
                  <Toggle
                    checked={showArchivedOwner}
                    onChange={(next) => setFilters({ archived: next ? '1' : '' })}
                    label={t('Show requests on archived content')}
                  />
                  <span className="hidden items-center gap-1 sm:flex"><Icon icon={Archive} size={12} />{t('Archived owner')} ({archivedOwnerCount})</span>
                </label>
              )}
              <Select
                aria-label={t('Sort media requests')}
                value={filters.sort}
                onChange={(event) => setFilters({ sort: event.target.value })}
                className="h-8 min-w-[9rem] text-[12px]"
              >
                <option value="priority">{t('Sort: Priority')}</option>
                <option value="university">{t('Sort: University')}</option>
                <option value="year">{t('Sort: Year')}</option>
                <option value="module">{t('Sort: Module')}</option>
              </Select>
            </div>
          )}
        />
        <div className="border-b border-line p-3">
          <FilterBar
            searchValue={filters.q}
            onSearchChange={(q) => setFilters({ q })}
            searchLabel={t('Search media requests')}
            searchPlaceholder={t('Search brief, purpose, owner')}
            statusTabs={statusTabs}
            statusValue={filters.status}
            onStatusChange={(status) => setFilters({ status })}
            statusLabel={t('Filter by status')}
            catalogue={universityCatalogue}
            scopeValue={scope}
            onScopeChange={(next) => setFilters({
              universityId: next.universityId ?? '',
              yearId: next.yearId ?? '',
              moduleId: next.moduleId ?? '',
            })}
            secondaryFilters={secondaryFilters}
            secondaryValue={{ medium: filters.medium, priority: filters.priority, type: filters.type }}
            onSecondaryChange={(next) => setFilters({
              medium: next.medium ?? [],
              priority: next.priority ?? [],
              type: next.type ?? [],
            })}
            resultCount={visible.length}
            resultLabel={(count) => t('{count} results').replace('{count}', String(count))}
          />
        </div>

        {!ledgerStatus.hydrated && ledgerStatus.error ? (
          <EmptyState
            icon={TriangleAlert}
            title={t('The backlog could not be loaded')}
            description={t('Check your connection and reload the page.')}
          />
        ) : !ledgerStatus.hydrated ? (
          <div className="flex items-center justify-center gap-2 py-16 text-ink-3">
            <LoadingRegion label={t('Loading the backlog…')} className="w-full"><SkeletonTable rows={6} columns={4} /></LoadingRegion>
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={ImagePlus}
            title={rows.length ? t('Nothing matches these filters') : t('No media requests yet')}
            description={rows.length
              ? t('Widen the filters to see the rest of the backlog.')
              : t('Add them while authoring, or import them alongside the item. A request says what the asset must teach and why prose is not enough.')}
            action={rows.length ? <Button variant="secondary" size="sm" onClick={() => setFilters(FILTER_DEFAULTS)}>{t('Clear filters')}</Button> : undefined}
          />
        ) : (
          <div className="divide-y divide-line">
            {byOwner.map(([ownerId, ownerRows]) => (
              <section key={ownerId} className="p-3">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge tone="outline">{t(OWNER_LABEL[ownerRows[0].ownerKind])}</Badge>
                  {ownerRows[0].ownerStatus === 'Archived' && <Badge tone="neutral">{t('Archived owner')}</Badge>}
                  <Link to={`${OWNER_CATALOGUE[ownerRows[0].ownerKind]}?item=${encodeURIComponent(ownerId)}`} className="text-[13px] font-semibold text-ink underline decoration-line-2 underline-offset-2 hover:text-primary-strong">
                    {ownerRows[0].ownerTitle}
                  </Link>
                  <span className="text-[11.5px] text-ink-3">
                    {t('{count} asset{plural} wanted').replace('{count}', String(ownerRows.length)).replace('{plural}', ownerRows.length === 1 ? '' : 's')} · {ownerRows[0].systemTitle}
                  </span>
                </div>
                <ul className="space-y-2">
                  {ownerRows.map((row) => (
                    <RequestRow
                      key={row.id}
                      row={row}
                      canManage={canManage}
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
              <p className="text-[13px] font-semibold text-ink">{t('{count} required asset{plural} still missing').replace('{count}', String(requiredOutstanding.length)).replace('{plural}', requiredOutstanding.length === 1 ? '' : 's')}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-ink-2">
                {t('A `required` request means the item cannot be understood without it — a question whose diagram is missing has nothing to read, and an article missing its plate cannot carry the relationship it describes. Publishing before the asset exists ships something a student cannot use.')}
              </p>
              <ButtonLink to="/admin/library" variant="secondary" size="sm" className="mt-2">{t('Open Library Setup')}</ButtonLink>
            </div>
          </div>
        </Panel>
      )}
    </PageContainer>
  )
}

/**
 * One wanted asset, and the means to supply it.
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

const ESCALATION_TONE: Record<EscalationPriority, 'danger' | 'warning' | 'neutral'> = {
  urgent: 'danger',
  high: 'warning',
  normal: 'neutral',
}

function ReviewerWorkspace({
  row, item, identity, canManage, ledgerConflict, onClose, onFulfil, onComment, onEscalate, onReportProblem,
}: {
  row: Row
  item: ManagedContentItem
  identity: Identity
  canManage: boolean
  ledgerConflict: string | null
  onClose: () => void
  onFulfil: (row: Row, mediaId: string, destination: string, record?: MediaRecord) => string | null
  onComment: (row: Row, comment: MediaReviewComment) => void
  onEscalate: (row: Row, reason: string, priority: EscalationPriority) => void
  onReportProblem: (row: Row, item: ManagedContentItem, note: string) => Promise<string | null>
}) {
  const { t } = useI18n()
  const anchors = anchorOptions(row, item)
  const [anchor, setAnchor] = useState(requestedAnchor(row))
  const [comment, setComment] = useState('')
  const [attaching, setAttaching] = useState(false)
  const [fulfilError, setFulfilError] = useState('')
  const [escalating, setEscalating] = useState(false)
  const [escalateReason, setEscalateReason] = useState('')
  const [escalatePriority, setEscalatePriority] = useState<EscalationPriority>('normal')
  const [reporting, setReporting] = useState(false)
  const [reportError, setReportError] = useState('')
  const [reportSent, setReportSent] = useState(false)

  const escalated = row.escalation?.status === 'open'
  const readOnly = escalated // Editors resolve/return this from the escalations queue, not from here.

  function saveComment(kind: MediaReviewComment['kind']) {
    const text = comment.trim()
    if (!text) return
    onComment(row, {
      id: `media-comment-${Date.now().toString(36)}`,
      anchor,
      kind,
      text,
      author: identity.displayName,
      createdAt: new Date().toISOString(),
    })
    setComment('')
  }

  async function submitProblem() {
    const text = comment.trim()
    if (!text) return
    setReporting(true)
    setReportError('')
    const error = await onReportProblem(row, item, text)
    setReporting(false)
    if (error) { setReportError(error); return }
    onComment(row, {
      id: `media-comment-${Date.now().toString(36)}`,
      anchor,
      kind: 'problem',
      text,
      author: identity.displayName,
      createdAt: new Date().toISOString(),
    })
    setComment('')
    setReportSent(true)
  }

  function submitEscalation() {
    const reason = escalateReason.trim()
    if (!reason) return
    onEscalate(row, reason, escalatePriority)
    setEscalateReason('')
    setEscalating(false)
  }

  return (
    <Panel className="mb-4 overflow-hidden" aria-label={t('Review media request for {title}').replace('{title}', row.ownerTitle)}>
      <PanelHeader title={t('Reviewer workspace')} icon={Eye} hint={t('Student view and fulfilment')} />
      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]">
        <section className="border-b border-line p-4 lg:border-b-0 lg:border-e" aria-label={t('Student preview')}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-3">{t('Exactly as authored for students')}</p>
              <p className="mt-0.5 text-[12px] text-ink-2">{t('The amber frame marks the slot this request must fulfil.')}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose}>{t('Close')}</Button>
          </div>
          <StudentFaithfulPreview item={item} anchor={mediaRequestAnchor(row)} revealAnswer />
        </section>
        <aside className="space-y-4 bg-surface-2/45 p-4">
          <div>
            <div className="flex flex-wrap gap-1.5">
              <Badge tone={PRIORITY_TONE[row.priority] ?? 'neutral'}>{t(row.priority)}</Badge>
              <Badge tone="outline">{t(row.medium)}{row.medium === 'image' ? ` · ${t(row.kind)}` : ''}</Badge>
              <Badge tone={STATUS_TONE[row.status]} dot>{t(row.status)}</Badge>
            </div>
            <h3 className="mt-2 text-[14px] font-semibold text-ink">{row.brief}</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-2"><span className="font-semibold">{t('Why it is needed')}:</span> {row.teachingPurpose || t('No teaching purpose recorded.')}</p>
            {row.sourceDirection && <p className="mt-1 text-[11.5px] text-ink-3"><span className="font-semibold">{t('Source direction')}:</span> {row.sourceDirection}</p>}
            {row.rightsNotes && <p className="mt-1 text-[11.5px] text-ink-3"><span className="font-semibold">{t('Rights')}:</span> {row.rightsNotes}</p>}
            <Link to={`${OWNER_CATALOGUE[row.ownerKind]}?item=${encodeURIComponent(row.ownerId)}`} className="mt-2 inline-block text-[11.5px] text-primary-strong underline decoration-line-2 underline-offset-2 hover:text-primary">
              {t('Open the full editor for this item')}
            </Link>
          </div>

          {escalated && row.escalation && (
            <div className="rounded-lg border border-warning/40 bg-warning-tint/45 p-3">
              <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-warning-strong">
                <Icon icon={ShieldAlert} size={15} />
                {t('Escalated — with editors')}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">{row.escalation.reason}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-3">
                <Badge tone={ESCALATION_TONE[row.escalation.priority]}>{t(row.escalation.priority)}</Badge>
                <span>{t('by')} {row.escalation.byName} ({row.escalation.byRole}) · {new Date(row.escalation.at).toLocaleString()}</span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink-2">
                {canManage
                  ? t('Read-only here — return, reassign or resolve it from the Escalations queue.')
                  : t('This request cannot be edited until an editor returns or resolves it.')}
              </p>
              {row.escalation.history.length > 1 && (
                <ol className="mt-2 space-y-1 border-t border-warning/30 pt-2">
                  {row.escalation.history.map((entry, index) => (
                    <li key={index} className="text-[10.5px] text-ink-3">
                      <span className="font-semibold text-ink-2">{entry.actorName}</span> ({entry.actorRole}) {t(entry.action)} · {new Date(entry.at).toLocaleString()}
                      {entry.note && <span> — {entry.note}</span>}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {!escalated && row.escalation && row.escalation.status !== 'open' && (
            <p className="rounded-lg border border-line bg-surface p-2.5 text-[11px] leading-relaxed text-ink-3">
              {t('Previously escalated ({status}) — {reason}').replace('{status}', t(row.escalation.status)).replace('{reason}', row.escalation.reason)}
            </p>
          )}

          {ledgerConflict && (
            <p role="alert" className="rounded-lg border border-danger/25 bg-danger-tint p-3 text-[11.5px] leading-relaxed text-danger">{ledgerConflict}</p>
          )}

          {!readOnly && row.status !== 'supplied' && !attaching && (
            <Button size="sm" variant="primary" iconLeft={row.medium === 'audio' ? FileAudio : row.medium === 'video' ? FileVideo : ImagePlus} onClick={() => setAttaching(true)}>
              {t('Upload or choose {medium}').replace('{medium}', t(row.medium))}
            </Button>
          )}
          {!readOnly && attaching && (
            <MediaAttachPanel
              medium={row.medium}
              onAttach={(mediaId, record) => {
                const error = onFulfil(row, mediaId, anchor, record)
                if (error) setFulfilError(error)
                else { setFulfilError(''); setAttaching(false) }
              }}
              onCancel={() => setAttaching(false)}
            />
          )}
          {fulfilError && <p role="alert" className="rounded-lg border border-danger/25 bg-danger-tint p-3 text-[11.5px] leading-relaxed text-danger">{fulfilError}</p>}
          {row.status === 'supplied' && (
            <p className="flex items-center gap-1.5 rounded-lg border border-success/30 bg-success-tint p-3 text-[12px] font-medium text-success">
              <Icon icon={CircleCheck} size={15} />
              {t('Supplied — the server verified the attached media and marked this request fulfilled.')}
            </p>
          )}

          {!readOnly && (
            <div className="border-t border-line pt-4">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink"><Icon icon={MessageSquare} size={14} /> {t('Anchored review notes')}</p>
              <Select className="mt-2" aria-label={t('Media placement and comment anchor')} value={anchor} onChange={(event) => setAnchor(event.target.value)}>
                {[...new Set([requestedAnchor(row), ...anchors])].map((value) => <option key={value} value={value}>{t(value)}</option>)}
              </Select>
              <Textarea aria-label={t('Review note')} className="mt-2 min-h-24" value={comment} onChange={(event) => { setComment(event.target.value); setReportSent(false) }} placeholder={t('Explain the issue or leave guidance for the author…')} />
              <div className="mt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" iconLeft={MessageSquare} disabled={!comment.trim()} onClick={() => saveComment('comment')}>{t('Add comment')}</Button>
                <Button size="sm" variant="ghost" iconLeft={Flag} disabled={!comment.trim() || reporting} loading={reporting} onClick={() => void submitProblem()}>{t('Report a problem')}</Button>
              </div>
              {reportError && <p role="alert" className="mt-2 text-[11.5px] text-danger">{reportError}</p>}
              {reportSent && <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-success"><Icon icon={CircleCheck} size={13} />{t('Reported to the editorial team as a Content Report.')}</p>}
              {(row.reviewComments?.length ?? 0) > 0 && (
                <ol className="mt-3 space-y-2">
                  {row.reviewComments?.map((entry) => (
                    <li key={entry.id} className={cn('rounded-lg border p-2.5', entry.kind === 'problem' ? 'border-danger/30 bg-danger/5' : 'border-line bg-surface')}>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-ink-3">{entry.kind === 'problem' ? t('Problem') : t('Comment')} · {t(entry.anchor)}</p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{entry.text}</p>
                      <p className="mt-1 text-[10.5px] text-ink-3">{entry.author} · {new Date(entry.createdAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ol>
              )}

              <div className="mt-4 border-t border-line pt-3">
                {!escalating ? (
                  <Button size="sm" variant="ghost" iconLeft={Megaphone} onClick={() => setEscalating(true)}>{t('Escalate to editors')}</Button>
                ) : (
                  <div className="space-y-2 rounded-lg border border-line bg-surface p-3">
                    <p className="text-[11.5px] font-semibold text-ink">{t('Escalate this request')}</p>
                    <p className="text-[11px] leading-relaxed text-ink-3">{t('Use this when the request cannot be completed safely — a rights question, an unclear brief, or media you cannot source. It becomes read-only for you until an editor returns or resolves it.')}</p>
                    <Field label={t('Priority')} htmlFor="escalate-priority">
                      <Select id="escalate-priority" value={escalatePriority} onChange={(event) => setEscalatePriority(event.target.value as EscalationPriority)}>
                        {ESCALATION_PRIORITIES.map((value) => <option key={value} value={value}>{t(value)}</option>)}
                      </Select>
                    </Field>
                    <Field label={t('Reason')} htmlFor="escalate-reason">
                      <Textarea id="escalate-reason" className="min-h-20" value={escalateReason} onChange={(event) => setEscalateReason(event.target.value)} placeholder={t('What makes this unsafe to complete as a reviewer?')} />
                    </Field>
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary" iconLeft={Megaphone} disabled={!escalateReason.trim()} onClick={submitEscalation}>{t('Send to editors')}</Button>
                      <Button size="sm" variant="ghost" onClick={() => { setEscalating(false); setEscalateReason('') }}>{t('Cancel')}</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </aside>
      </div>
    </Panel>
  )
}

type AttachMode = 'upload' | 'library'
interface PendingUpload {
  id: string
  measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'mediaType' | 'width' | 'height' | 'durationSeconds'>
  alreadyStored: boolean
}

const PHASE_LABEL: Record<MediaUploadState['phase'], string> = {
  uploading: 'Uploading',
  verifying: 'Verifying — confirming it is stored and plays correctly…',
  ready: 'Ready',
  failed: 'Failed',
  canceled: 'Canceled',
}

/**
 * The reviewer's attach control: upload a new file through the durable
 * Uploading → Verifying → Ready/Failed state machine, or choose an existing,
 * already-described library record. Deliberately self-contained rather than
 * reusing `MediaPicker` (used elsewhere for a simpler upload-or-pick flow) —
 * this is the one surface with the full contract: per-type size display,
 * retry, cancel, and a truthful terminal state that is never shown as
 * "stored" before the server (and this browser's own playback check) confirm it.
 */
function MediaAttachPanel({ medium, onAttach, onCancel }: {
  medium: ManagedMediaType
  onAttach: (mediaId: string, record: MediaRecord) => void
  onCancel: () => void
}) {
  const { t } = useI18n()
  const identity = useIdentity()
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const [mode, setMode] = useState<AttachMode>('upload')
  const [query, setQuery] = useState('')
  const [upload, setUpload] = useState<MediaUploadState | null>(null)
  const [pending, setPending] = useState<PendingUpload | null>(null)
  const [duplicate, setDuplicate] = useState<MediaRecord | null>(null)
  const [fields, setFields] = useState({ title: '', altText: '', rights: '' })
  const cancelRef = useRef<(() => void) | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const records = useMemo(() => (library.records ?? []).filter((record) => mediaTypeOf(record) === medium), [library.records, medium])
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const usable = records.filter((record) => mediaReleaseBlockers(record).length === 0 && isMediaUsable(record))
    if (!q) return usable.slice(0, 24)
    return usable.filter((record) => `${record.title} ${record.altText}`.toLowerCase().includes(q)).slice(0, 24)
  }, [query, records])

  function startFile(file: File) {
    setDuplicate(null)
    setPending(null)
    const { promise, cancel } = startMediaUpload(file, medium, setUpload)
    cancelRef.current = cancel
    promise.then((result) => {
      const twin = result.alreadyStored ? records.find((record) => record.sha256 === result.measured.sha256) : undefined
      if (twin) { setDuplicate(twin); return }
      setPending({ id: result.id, measured: result.measured, alreadyStored: result.alreadyStored })
      setFields({ title: file.name.replace(/\.[^.]+$/, ''), altText: '', rights: '' })
    }).catch(() => { /* `upload` state already carries the failure/cancellation. */ })
  }

  function chooseFile() {
    fileInput.current?.click()
  }

  function commitPending() {
    if (!pending) return
    const record: MediaRecord = {
      id: pending.id,
      ...pending.measured,
      title: fields.title.trim(),
      altText: fields.altText.trim(),
      rights: fields.rights.trim(),
      tags: { moduleIds: [], moduleSubjectPaths: [], conceptIds: [], yearIds: [] },
      uploadedBy: identity.userId ?? 'unknown',
      uploadedAt: new Date().toISOString(),
    }
    setLibrary((current) => ({ ...current, records: [record, ...(current.records ?? [])] }))
    setPending(null)
    onAttach(record.id, record)
  }

  function discardPending() {
    if (!pending) return
    const id = pending.id
    setPending(null)
    // Back to the idle "choose a file" state — `upload` still holds the
    // now-irrelevant terminal `ready` phase from the file just discarded.
    setUpload(null)
    void apiDelete(`/media/${encodeURIComponent(id)}`).catch(() => undefined)
  }

  function discardDuplicate() {
    if (!duplicate) return
    setDuplicate(null)
    setUpload(null)
  }

  /** The panel's own "Cancel" — abandons attaching altogether, discarding whatever is in flight. */
  function cancel() {
    if (pending) {
      void apiDelete(`/media/${encodeURIComponent(pending.id)}`).catch(() => undefined)
    } else if (upload && (upload.phase === 'uploading' || upload.phase === 'verifying')) {
      cancelRef.current?.()
    }
    onCancel()
  }

  const blockers = pending
    ? mediaReleaseBlockers({ ...pending.measured, title: fields.title, altText: fields.altText, rights: fields.rights })
    : []
  const cap = MEDIA_TYPE_MAX_BYTES[medium]
  const capLabel = medium === 'video' ? `${Math.round(cap / (1024 ** 3))} GB` : `${Math.round(cap / (1024 ** 2))} MB`

  return (
    <Panel className="p-3">
      <div className="mb-3 flex gap-1 rounded-lg bg-inset p-0.5" role="tablist" aria-label={t('Attach media')}>
        <button type="button" role="tab" aria-selected={mode === 'upload'} onClick={() => setMode('upload')} className={cn('flex-1 rounded-md px-2 py-1.5 text-[12px] font-medium', mode === 'upload' ? 'bg-surface text-ink shadow-panel' : 'text-ink-2')}>
          <Icon icon={Upload} size={13} className="me-1 inline" />{t('Upload new')}
        </button>
        <button type="button" role="tab" aria-selected={mode === 'library'} onClick={() => setMode('library')} className={cn('flex-1 rounded-md px-2 py-1.5 text-[12px] font-medium', mode === 'library' ? 'bg-surface text-ink shadow-panel' : 'text-ink-2')}>
          <Icon icon={LibraryIcon} size={13} className="me-1 inline" />{t('Choose existing')}
        </button>
      </div>

      {mode === 'upload' && (
        <div className="space-y-3">
          {!upload && !pending && !duplicate && (
            <>
              <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-primary-line bg-primary-tint/25 px-3 text-[12.5px] font-semibold text-primary-strong shadow-sm transition-[background-color,border-color] hover:bg-primary-tint/50 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary active:scale-[0.96]">
                <Icon icon={Upload} size={15} />
                <span>{t('Upload {medium}').replace('{medium}', t(medium))}</span>
                <input
                  ref={fileInput}
                  type="file"
                  accept={medium === 'image' ? 'image/*' : medium === 'audio' ? 'audio/*' : 'video/*'}
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0]
                    event.currentTarget.value = ''
                    if (file) startFile(file)
                  }}
                />
              </label>
              <p className="text-center text-[10.5px] leading-relaxed text-ink-3">
                {t('Up to {cap}').replace('{cap}', capLabel)}
              </p>
            </>
          )}

          {upload && upload.phase === 'uploading' && (
            <div role="status" aria-live="polite" className="space-y-2">
              <p className="flex items-center justify-between text-[12px] text-ink-2">
                <span>{t(PHASE_LABEL.uploading)}…</span>
                <span className="tnum">{Math.round(upload.fraction * 100)}%</span>
              </p>
              <Meter value={upload.fraction * 100} />
              <Button size="sm" variant="ghost" iconLeft={XCircle} onClick={() => cancelRef.current?.()}>{t('Cancel')}</Button>
            </div>
          )}

          {upload && upload.phase === 'verifying' && (
            <div role="status" aria-live="polite" className="space-y-2">
              <p className="flex items-center gap-2 text-[12px] text-ink-2">
                <NishanyLoader mini decorative />
                {t(PHASE_LABEL.verifying)}
              </p>
              <Button size="sm" variant="ghost" iconLeft={XCircle} onClick={() => cancelRef.current?.()}>{t('Cancel')}</Button>
            </div>
          )}

          {upload && upload.phase === 'failed' && (
            <div className="space-y-2 rounded-lg border border-danger/30 bg-danger-tint p-3">
              <p className="flex items-start gap-2 text-[12px] leading-relaxed text-danger">
                <Icon icon={XCircle} size={15} className="mt-0.5 shrink-0" />
                {upload.error || t('That upload could not be completed.')}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" iconLeft={RefreshCw} onClick={() => { setUpload(null); chooseFile() }}>{t('Retry')}</Button>
                <Button size="sm" variant="ghost" onClick={() => setUpload(null)}>{t('Dismiss')}</Button>
              </div>
              <input
                ref={fileInput}
                type="file"
                accept={medium === 'image' ? 'image/*' : medium === 'audio' ? 'audio/*' : 'video/*'}
                className="sr-only"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0]
                  event.currentTarget.value = ''
                  if (file) startFile(file)
                }}
              />
            </div>
          )}

          {upload && upload.phase === 'canceled' && (
            <div className="space-y-2 rounded-lg border border-line bg-surface p-3">
              <p className="text-[12px] text-ink-2">{t('Upload canceled.')}</p>
              <Button size="sm" variant="secondary" iconLeft={Upload} onClick={() => { setUpload(null); chooseFile() }}>{t('Choose a file')}</Button>
              <input
                ref={fileInput}
                type="file"
                accept={medium === 'image' ? 'image/*' : medium === 'audio' ? 'audio/*' : 'video/*'}
                className="sr-only"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0]
                  event.currentTarget.value = ''
                  if (file) startFile(file)
                }}
              />
            </div>
          )}

          {duplicate && (
            <div className="rounded-lg border border-primary-line bg-primary-tint/30 p-3">
              <p className="text-[12.5px] font-semibold text-ink">{t('This exact {medium} is already in the library as “{title}”.').replace('{medium}', t(medium)).replace('{title}', duplicate.title)}</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">{t('Using it keeps one record, so fixing it later fixes it everywhere.')}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="primary" disabled={mediaReleaseBlockers(duplicate).length > 0 || !isMediaUsable(duplicate)} onClick={() => { onAttach(duplicate.id, duplicate); setDuplicate(null) }}>{t('Use that one')}</Button>
                <Button size="sm" variant="ghost" onClick={discardDuplicate}>{t('Cancel')}</Button>
              </div>
              {mediaReleaseBlockers(duplicate).length > 0 && <p className="mt-2 text-[11.5px] text-warning">{t('Complete its accessibility and rights details in Resources & Media before using it.')}</p>}
            </div>
          )}

          {pending && (
            <div className="space-y-3">
              <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-success">
                <Icon icon={CircleCheck} size={15} />
                {medium === 'image'
                  ? t('Ready — {width}×{height}. Describe it before it can reach a student.').replace('{width}', String(pending.measured.width)).replace('{height}', String(pending.measured.height))
                  : pending.measured.durationSeconds
                    ? t('Ready — {seconds} seconds. Describe it before it can reach a student.').replace('{seconds}', String(Math.round(pending.measured.durationSeconds)))
                    : t('Ready. Describe it before it can reach a student.')}
              </p>
              <Field label={t('Title')} htmlFor="attach-title" hint={t('What it is, in the picker')}>
                <TextInput id="attach-title" value={fields.title} onChange={(event) => setFields({ ...fields, title: event.target.value })} />
              </Field>
              <Field label={medium === 'image' ? t('Alt text') : t('Accessibility description or transcript')} htmlFor="attach-alt" hint={t('What a student who cannot access the media needs to know')}>
                <TextInput id="attach-alt" value={fields.altText} onChange={(event) => setFields({ ...fields, altText: event.target.value })} />
              </Field>
              <Field label={t('Rights')} htmlFor="attach-rights" hint={t('Where it came from, and on what licence')}>
                <TextInput id="attach-rights" value={fields.rights} onChange={(event) => setFields({ ...fields, rights: event.target.value })} />
              </Field>
              {blockers.length > 0 && (
                <p className="text-[11.5px] leading-relaxed text-ink-2">{t('Held back from students until it has {blockers}.').replace('{blockers}', blockers.map((value) => t(value)).join(` ${t('and')} `))}</p>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="primary" disabled={blockers.length > 0} onClick={commitPending}>{t('Add to the library & attach')}</Button>
                <Button size="sm" variant="ghost" onClick={discardPending}>{t('Discard')}</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'library' && (
        <div className="space-y-3">
          <TextInput aria-label={t('Search released {medium} media').replace('{medium}', t(medium))} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Search the media library')} />
          {matches.length === 0 ? (
            <p className="flex items-center gap-1.5 text-[11.5px] text-ink-3">
              {records.length ? t('No {medium} matches that.').replace('{medium}', t(medium)) : t('The library is empty. Upload the first {medium}.').replace('{medium}', t(medium))}
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {matches.map((record) => (
                <li key={record.id}>
                  <button type="button" onClick={() => onAttach(record.id, record)} className="w-full rounded-lg border border-line p-1 text-start transition-[background-color,border-color] hover:border-primary-line hover:bg-primary-tint/20 active:scale-[0.96]">
                    {medium === 'image'
                      ? <PlacedImage record={record} className="max-h-24 w-full rounded object-contain" />
                      : <span className="grid h-20 place-items-center rounded bg-inset"><Icon icon={medium === 'audio' ? FileAudio : FileVideo} size={24} className="text-primary" /></span>}
                    <span className="mt-1 block truncate px-1 pb-1 text-[11px] text-ink-2">{record.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Button className="mt-3" size="sm" variant="ghost" onClick={cancel}>{t('Cancel')}</Button>
    </Panel>
  )
}

function RequestRow({ row, canManage, onStatus, onReview }: {
  row: Row
  canManage: boolean
  onStatus: (row: Row, next: MediaRequestStatus) => void
  onReview: () => void
}) {
  const { t } = useI18n()
  const escalated = row.escalation?.status === 'open'
  return (
    <li className="rounded-lg border border-line bg-surface-2/50 p-3">
      <div className="flex flex-wrap items-start gap-2">
        <span aria-hidden className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', STATUS_DOT[row.status])} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
            {row.brief}
            {escalated && <Icon icon={ShieldAlert} size={13} className="shrink-0 text-warning" aria-label={t('Escalated')} />}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-ink-3">
            {t(row.medium)}{row.medium === 'image' && row.kind !== 'other' ? ` · ${t(row.kind)}` : ''}
            {row.slot ? ` · ${row.slot === 'answer' ? `${t('answer')} ${row.answerLabel ?? '?'}` : t(row.slot)}` : ''}
            {' · '}
            {row.teachingPurpose || <span className="text-warning">{t('no teaching purpose recorded')}</span>}
          </p>
          {(row.sourceDirection || row.rightsNotes) && (
            <p className="mt-0.5 text-[11px] text-ink-3">{[row.sourceDirection, row.rightsNotes].filter(Boolean).join(' · ')}</p>
          )}
        </div>
        <Badge tone={PRIORITY_TONE[row.priority] ?? 'neutral'}>{t(row.priority)}</Badge>
        {canManage && (
          <Select
            aria-label={t('Status for {brief}').replace('{brief}', row.brief)}
            value={row.status}
            onChange={(event) => onStatus(row, event.target.value as MediaRequestStatus)}
            className="h-8 min-w-[8.5rem] text-[12px]"
            disabled={escalated}
          >
            {/* `supplied` is not offered: it is a fact the server sets once an
                attached media record verifies `ready`, never a label anyone
                applies by hand. */}
            {MEDIA_REQUEST_STATUSES.map((value) => (
              <option key={value} value={value} disabled={value === 'supplied' && row.status !== 'supplied'}>{t(value)}</option>
            ))}
          </Select>
        )}
        <Button size="sm" variant="secondary" iconLeft={Eye} onClick={onReview}>{escalated ? t('View') : t('Review & supply')}</Button>
      </div>
    </li>
  )
}
