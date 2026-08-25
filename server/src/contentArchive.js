import { createHash } from 'node:crypto'

export const CONTENT_ARCHIVE_TTL_MINUTES = 20

const TARGET_KINDS = new Set(['article', 'question'])

export function contentDigest(value) {
  return createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex')
}

function list(value) {
  return Array.isArray(value) ? [...value] : []
}

function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? { ...value } : {}
}

function hasValues(value) {
  return Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? '').trim())
}

/** Curriculum targeting that must be removed even from older Archived rows. */
export function hasContentArchiveScope(item) {
  if (item?.kind === 'question') {
    const tags = item.questionData?.tags ?? {}
    return hasValues(tags.module)
      || hasValues(tags.moduleIds)
      || hasValues(tags.moduleSubjectPaths)
      || hasValues(tags.universityIds)
      || hasValues(tags.years)
      || hasValues(tags.questionOnlyFor)
      || Object.keys(object(tags.examWeightByYear)).length > 0
  }
  if (item?.kind === 'article') {
    const data = item.articleData ?? {}
    return hasValues(data.moduleIds)
      || hasValues(data.moduleSubjectPaths)
      || hasValues(data.universityIds)
      || hasValues(data.yearIds)
  }
  return false
}

export function archiveConfirmation(counts) {
  return `ARCHIVE ${counts.articles} ARTICLES AND ${counts.questions} QUESTIONS`
}

/**
 * Freeze the exact records an operator saw during preflight.
 *
 * There is deliberately no "looks generated" predicate. Owner names, source
 * fields, IDs and dates are authoring conventions rather than durable lineage,
 * so a later import must never become an accidental target of an earlier
 * retirement decision.
 */
export function contentArchiveManifest(ledger) {
  if (!Array.isArray(ledger)) {
    const error = new Error('content ledger is not a list')
    error.code = 'invalid_ledger'
    throw error
  }
  const idCounts = new Map()
  for (const item of ledger) {
    const id = typeof item?.id === 'string' ? item.id.trim() : ''
    if (id) idCounts.set(id, (idCounts.get(id) ?? 0) + 1)
  }
  for (const item of ledger) {
    if (!TARGET_KINDS.has(item?.kind)) continue
    const id = typeof item.id === 'string' ? item.id.trim() : ''
    if (!id || idCounts.get(id) !== 1) {
      const error = new Error(!id ? 'content contains an article or question without an ID' : `content contains a duplicate ID: ${id}`)
      error.code = 'invalid_ledger'
      throw error
    }
  }
  const targets = ledger
    .filter((item) => TARGET_KINDS.has(item?.kind))
    // A completed retirement is an idempotent no-op. Older Archived records
    // with targeting still need one pass so "all universities/years/modules"
    // means exactly that, regardless of which version created them.
    .filter((item) => item.status !== 'Archived' || hasContentArchiveScope(item))
    .map((item) => ({
      id: item.id,
      kind: item.kind,
      fingerprint: contentDigest(item),
      before: item,
    }))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
  const counts = {
    articles: targets.filter((target) => target.kind === 'article').length,
    questions: targets.filter((target) => target.kind === 'question').length,
  }
  const statusCounts = {}
  const sourceCounts = {}
  for (const target of targets) {
    const status = String(target.before?.status ?? 'Unknown')
    statusCounts[status] = (statusCounts[status] ?? 0) + 1
    const source = String(target.before?.source?.type ?? target.before?.source?.origin ?? target.before?.owner ?? 'Unlabelled')
    sourceCounts[source] = (sourceCounts[source] ?? 0) + 1
  }
  return { targets, counts: { ...counts, total: counts.articles + counts.questions }, statusCounts, sourceCounts }
}

function detachedQuestion(item, archive) {
  const data = object(item.questionData)
  const tags = object(data.tags)
  return {
    ...item,
    status: 'Archived',
    updatedAt: archive.archivedAt,
    archive,
    questionData: {
      ...data,
      tags: {
        ...tags,
        module: '',
        moduleIds: [],
        moduleSubjectPaths: [],
        universityIds: [],
        years: [],
        questionOnlyFor: [],
        examWeightByYear: {},
      },
    },
  }
}

function detachedArticle(item, archive) {
  const data = object(item.articleData)
  return {
    ...item,
    status: 'Archived',
    updatedAt: archive.archivedAt,
    archive,
    articleData: {
      ...data,
      moduleIds: [],
      moduleSubjectPaths: [],
      universityIds: [],
      yearIds: [],
    },
  }
}

/** Apply one reviewed manifest or refuse the complete operation. */
export function applyContentArchive(ledger, manifest, {
  operationId,
  actorId,
  reason,
  archivedAt,
}) {
  const current = Array.isArray(ledger) ? ledger : []
  const byId = new Map(current.map((item) => [item?.id, item]))
  const targets = Array.isArray(manifest?.targets) ? manifest.targets : []

  for (const target of targets) {
    const item = byId.get(target.id)
    if (!item || item.kind !== target.kind || contentDigest(item) !== target.fingerprint) {
      const error = new Error(`content changed after preflight: ${target.id}`)
      error.code = 'stale_manifest'
      throw error
    }
  }

  const targetIds = new Set(targets.map((target) => target.id))
  const value = current.map((item) => {
    if (!targetIds.has(item?.id)) return item
    const previouslyDetached = item.status === 'Archived' && item.archive?.detached
    const archive = previouslyDetached
      ? {
          ...item.archive,
          detached: true,
          lastDetachment: { operationId, actorId, reason, archivedAt },
        }
      : {
          operationId,
          actorId,
          reason,
          archivedAt,
          detached: true,
          originalStatus: item.status,
        }
    return item.kind === 'question' ? detachedQuestion(item, archive) : detachedArticle(item, archive)
  })

  return { value, counts: manifest.counts }
}

export function activeArchiveBlockers(activity) {
  return Number(activity?.studyRooms ?? 0)
    + Number(activity?.challenges ?? 0)
    + Number(activity?.partyQuestionSessions ?? 0)
}

export function originalScopeFor(target) {
  const item = target?.before
  if (item?.kind === 'question') {
    const tags = item.questionData?.tags ?? {}
    return {
      module: tags.module ?? '',
      moduleIds: list(tags.moduleIds),
      moduleSubjectPaths: list(tags.moduleSubjectPaths),
      universityIds: list(tags.universityIds),
      years: list(tags.years),
      questionOnlyFor: list(tags.questionOnlyFor),
      examWeightByYear: object(tags.examWeightByYear),
    }
  }
  if (item?.kind === 'article') {
    const data = item.articleData ?? {}
    return {
      moduleIds: list(data.moduleIds),
      moduleSubjectPaths: list(data.moduleSubjectPaths),
      universityIds: list(data.universityIds),
      yearIds: list(data.yearIds),
    }
  }
  return {}
}
