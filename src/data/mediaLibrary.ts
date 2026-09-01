/**
 * Where a media file is stored, whether it may be shown, and who is using it —
 * the client's twin of `server/src/mediaLibrary.js`.
 *
 * Declared rather than imported: the server module is untyped JavaScript
 * outside `src`, so importing it into app code would put an unchecked file into
 * the Vite bundle and fail `tsc -b`. `mediaLibrary.test.ts` imports both and
 * compares them, which is why this is a transliteration rather than a tidier
 * rewrite. Same arrangement as `adminRoles.ts` and `contentScope.ts`.
 */

export const MEDIA_STATE_KEY = 'nishany-media-library-v1'

export const MEDIA_MIME_EXTENSION: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/ogg': 'ogg',
  'audio/mp4': 'm4a',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
}

export type AnswerLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
export type MediaSlot = 'stem' | 'answer' | 'explanation'
export type ManagedMediaType = 'image' | 'audio' | 'video'

export interface MediaRecord {
  id: string
  storageKey: string
  sha256: string
  mimeType: string
  sizeBytes: number
  /** Present on every new asset; inferred from MIME for legacy image records. */
  mediaType?: ManagedMediaType
  /** Images carry dimensions; recordings and clips use zero when unavailable. */
  width: number
  height: number
  durationSeconds?: number
  /** What it is, in the picker. */
  title: string
  /** Required before it can reach a student. */
  altText: string
  /** Required before it can reach a student. */
  rights: string
  tags: { moduleIds: string[]; moduleSubjectPaths: string[]; conceptIds: string[]; yearIds: string[] }
  uploadedBy: string
  uploadedAt: string
}

export interface MediaPlacement {
  id: string
  mediaId: string
  slot: MediaSlot
  /** Names the answer when the asset belongs to that answer or its explanation. */
  answerLabel?: AnswerLetter
  /** A caption for this use alone. The record's own `title` is untouched. */
  caption?: string
}

export interface MediaLibraryDocument { records: MediaRecord[] }

export interface MediaUsage {
  ownerId: string
  ownerKind: string
  ownerTitle: string
  placementId: string | null
  where: string
}

export function mediaTypeOf(record: Pick<MediaRecord, 'mediaType' | 'mimeType'>): ManagedMediaType {
  if (record.mediaType) return record.mediaType
  if (record.mimeType.startsWith('audio/')) return 'audio'
  if (record.mimeType.startsWith('video/')) return 'video'
  return 'image'
}

/** An empty library, for a key that has never been written. */
export function emptyMediaLibrary(): MediaLibraryDocument {
  return { records: [] }
}

/** Where a stored image is fetched from. The one place that knows the shape. */
export function mediaUrl(id: string): string {
  return `/media/${encodeURIComponent(id)}`
}

export function storageKeyFor(sha256: string, mimeType: string): string | null {
  const extension = MEDIA_MIME_EXTENSION[mimeType]
  if (!extension) return null
  if (typeof sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(sha256)) return null
  return `media/${sha256.slice(0, 2)}/${sha256.slice(2, 4)}/${sha256}.${extension}`
}

export function mediaReleaseBlockers(record: Partial<MediaRecord> | null | undefined): string[] {
  const blockers: string[] = []
  if (!record?.storageKey?.trim()) blockers.push('no stored file')
  if (!record?.altText?.trim()) blockers.push('no alt text')
  if (!record?.rights?.trim()) blockers.push('no cleared rights')
  return blockers
}

export function isMediaReleased(record: Partial<MediaRecord> | null | undefined): boolean {
  return mediaReleaseBlockers(record).length === 0
}

interface UsageItem {
  id: string
  kind: string
  title: string
  questionData?: { media?: MediaPlacement[] }
  articleData?: { media?: Array<{ sourceId?: string; url?: string; anchor?: { quote?: string } }> }
  practicalData?: {
    mediaUrl?: string
    decisions?: Array<{ id?: string; title?: string; mediaUrl?: string }>
    questions?: Array<{ id?: string; mediaUrl?: string }>
  }
  histologyData?: { views?: Array<{ objective?: number; image?: string }> }
}

interface UsageConcept { id: string; label: string; mediaIds?: string[] }

function placementsOf(item: UsageItem | null | undefined): MediaPlacement[] {
  return item?.questionData?.media ?? []
}

function idFromUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const match = /^\/media\/([^/?#]+)$/.exec(value)
  if (!match) return null
  try { return decodeURIComponent(match[1]) } catch { return null }
}

function whereOf(placement: MediaPlacement): string {
  if (placement.slot === 'answer') return `answer ${placement.answerLabel ?? '?'}`
  return placement.slot ?? 'stem'
}

export function usageOf(mediaId: string, ledger: UsageItem[], concepts: UsageConcept[]): MediaUsage[] {
  const usage: MediaUsage[] = []
  for (const item of Array.isArray(ledger) ? ledger : []) {
    for (const placement of placementsOf(item)) {
      if (placement?.mediaId !== mediaId) continue
      usage.push({
        ownerId: item.id,
        ownerKind: item.kind,
        ownerTitle: item.title,
        placementId: placement.id,
        where: whereOf(placement),
      })
    }
    for (const media of item.articleData?.media ?? []) {
      if (media.sourceId !== mediaId && idFromUrl(media.url) !== mediaId) continue
      usage.push({
        ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title,
        placementId: null, where: media.anchor?.quote ? 'article anchor' : 'article media',
      })
    }
    const practical = item.practicalData
    if (idFromUrl(practical?.mediaUrl) === mediaId) {
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: 'station media' })
    }
    for (const decision of practical?.decisions ?? []) {
      if (idFromUrl(decision.mediaUrl) !== mediaId) continue
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: `decision ${decision.title || decision.id || ''}`.trim() })
    }
    for (const question of practical?.questions ?? []) {
      if (idFromUrl(question.mediaUrl) !== mediaId) continue
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: `interpretation ${question.id || ''}`.trim() })
    }
    for (const view of item.histologyData?.views ?? []) {
      if (idFromUrl(view.image) !== mediaId) continue
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: `${view.objective || '?'}× field` })
    }
  }
  for (const concept of Array.isArray(concepts) ? concepts : []) {
    if (!concept?.mediaIds?.includes(mediaId)) continue
    usage.push({
      ownerId: concept.id,
      ownerKind: 'concept',
      ownerTitle: concept.label,
      placementId: null,
      where: 'concept media',
    })
  }
  return usage
}

export function deleteRefusal(mediaId: string, ledger: UsageItem[], concepts: UsageConcept[]): string | null {
  const usage = usageOf(mediaId, ledger, concepts)
  if (!usage.length) return null
  const names = usage.slice(0, 5).map((entry) => entry.ownerTitle).join(', ')
  const rest = usage.length > 5 ? `, and ${usage.length - 5} more` : ''
  return `${usage.length} item${usage.length === 1 ? '' : 's'} still use this media: ${names}${rest}`
}
