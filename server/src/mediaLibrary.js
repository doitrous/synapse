/**
 * Where a media file is stored, whether it may be shown, and who is using it.
 *
 * No database and no Express: the same split every rule module here makes, so
 * these can be tested without a driver loaded. `src/data/mediaLibrary.ts`
 * mirrors it and a parity test holds the two together.
 */

import { MEDIA_MIME_EXTENSION } from './imageMeta.js'

export const MEDIA_STATE_KEY = 'synapse-media-library-v1'

/**
 * The path a file with this digest is stored at.
 *
 * Content-addressed, so the path is also the integrity check: a file that
 * hashes to its own name cannot have been corrupted in place unnoticed. The
 * first four hex characters fan the tree out, so no directory ends up holding
 * every image in the product.
 *
 * Returns null rather than a best effort for anything that is not a real digest
 * and an accepted type — which is also what makes traversal impossible here:
 * sixty-four lowercase hex characters cannot contain a slash or a dot.
 */
export function storageKeyFor(sha256, mimeType) {
  const extension = MEDIA_MIME_EXTENSION[mimeType]
  if (!extension) return null
  if (typeof sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(sha256)) return null
  return `media/${sha256.slice(0, 2)}/${sha256.slice(2, 4)}/${sha256}.${extension}`
}

/**
 * Why this image would not currently reach a student.
 *
 * The same three-part rule `isMediaReleased` applies to article media, for the
 * same reasons: something with no file cannot render, something with no alt
 * text cannot be read aloud, and something with uncleared rights should not be
 * published at all.
 */
export function mediaReleaseBlockers(record) {
  const blockers = []
  if (!record?.storageKey?.trim()) blockers.push('no stored file')
  if (!record?.altText?.trim()) blockers.push('no alt text')
  if (!record?.rights?.trim()) blockers.push('no cleared rights')
  return blockers
}

export function isMediaReleased(record) {
  return mediaReleaseBlockers(record).length === 0
}

/** Where question content keeps reusable slot placements. */
function placementsOf(item) {
  return item?.questionData?.media ?? []
}

function idFromUrl(value) {
  if (typeof value !== 'string') return null
  const match = /^\/media\/([^/?#]+)$/.exec(value)
  if (!match) return null
  try { return decodeURIComponent(match[1]) } catch { return null }
}

/** How a placement reads on screen, so a usage list is scannable. */
function whereOf(placement) {
  if (placement.slot === 'answer') return `answer ${placement.answerLabel ?? '?'}`
  return placement.slot ?? 'stem'
}

/**
 * Every item pointing at this image.
 *
 * This is what makes reuse safe rather than merely possible: before an image is
 * replaced or removed, the person doing it can see exactly what they are about
 * to change, and pick which of those they meant.
 */
export function usageOf(mediaId, ledger, concepts) {
  const usage = []
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
    for (const media of item?.articleData?.media ?? []) {
      if (media?.sourceId !== mediaId && idFromUrl(media?.url) !== mediaId) continue
      usage.push({
        ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title,
        placementId: null, where: media?.anchor?.quote ? 'article anchor' : 'article media',
      })
    }
    const practical = item?.practicalData
    if (idFromUrl(practical?.mediaUrl) === mediaId) {
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: 'station media' })
    }
    for (const decision of practical?.decisions ?? []) {
      if (idFromUrl(decision?.mediaUrl) !== mediaId) continue
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: `decision ${decision.title || decision.id || ''}`.trim() })
    }
    for (const question of practical?.questions ?? []) {
      if (idFromUrl(question?.mediaUrl) !== mediaId) continue
      usage.push({ ownerId: item.id, ownerKind: item.kind, ownerTitle: item.title, placementId: null, where: `interpretation ${question.id || ''}`.trim() })
    }
    for (const view of item?.histologyData?.views ?? []) {
      if (idFromUrl(view?.image) !== mediaId) continue
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

/**
 * Why this image cannot be deleted, or null when it can.
 *
 * An image is never removed out from under content that renders it. The refusal
 * names what is using it, because "cannot delete" without a reason is an
 * obstacle rather than an answer.
 */
export function deleteRefusal(mediaId, ledger, concepts) {
  const usage = usageOf(mediaId, ledger, concepts)
  if (!usage.length) return null
  const names = usage.slice(0, 5).map((entry) => entry.ownerTitle).join(', ')
  const rest = usage.length > 5 ? `, and ${usage.length - 5} more` : ''
  return `${usage.length} item${usage.length === 1 ? '' : 's'} still use this media: ${names}${rest}`
}
