import { MEDIA_STATE_KEY, isMediaReleased } from './mediaLibrary.js'

/**
 * What a student is allowed to receive of the admin content ledger.
 *
 * The ledger is one document holding every authored item in every state, and it
 * is student-readable because a dozen student surfaces are built from it —
 * library, question bank, practical, decks, essays, slides, adaptive study. It
 * used to be served exactly as stored, and the redaction that makes it fit for
 * a student happened in the browser, in `src/lib/usePublishedQuestions.ts` and
 * its siblings. That is redaction *after* delivery: the whole document had
 * already crossed the wire, so anyone reading the network tab saw the
 * unpublished drafts, the author's private notes, the provenance of every
 * borrowed paper, and the media still being chased.
 *
 * This moves the decision to the server, where it is one function with one test
 * rather than a convention each new hook has to remember.
 *
 * Two rules:
 *
 *   1. Only `Published` items leave. Every student consumer already required it
 *      — `decks.ts:96`, `useLivePracticals`, `useLiveResources`,
 *      `managedQuestionToStudentQuestion` — so nothing student-facing loses
 *      anything by having drafts withheld at the source instead.
 *
 *   2. Named private fields are removed, at any depth.
 *
 * Rule 2 is a deny-list, and that is deliberate. An allow-list is the safer
 * shape in the abstract, and the first version of this file was one — but the
 * fields a student reads are spread across nine projection functions, several
 * of which destructure, so the allow-list could not be derived reliably by
 * reading the code. A wrong allow-list fails silently and in the wrong
 * direction: the student's library simply loses a field and nobody learns why.
 * A deny-list fails loudly, because anything missing is visibly present.
 *
 * What keeps the deny-list honest is `studentLedger.test.js`, which reads the
 * authoring interfaces out of `src/data/contentControl.ts` and fails when a
 * field appears that this file has not classified. Adding a field to an
 * authoring type therefore forces a decision about who may see it, which is the
 * property the allow-list was wanted for.
 *
 * What this deliberately does NOT do: hide the correct answer of a published
 * question. The question bank marks attempts in the browser, so the answer has
 * to be there for it to work at all. Hiding it means marking server-side, which
 * is a separate and much larger change. Nothing here should be read as having
 * solved that.
 */

/**
 * Fields a student must never receive, wherever they appear.
 *
 * Grouped by why they are private, because the reason is what a later reader
 * needs in order to classify the next new field correctly.
 */
export const PRIVATE_FIELDS = new Set([
  // Where an item came from. A student is never told which faculty paper a
  // question was taken out of, and the new source-extraction programme puts
  // considerably more here than the four fields `ContentSource` has today.
  'source', 'sourceCitation', 'sourceProvenance', 'sourceQuestion',
  'sourceOccurrences', 'sourceCandidateIds', 'originalWording',
  // Which source question a derivative came from. Naming it would tell a
  // student which paper the item was lifted out of, which is the disclosure
  // `source` is withheld to prevent.
  'derivedFromFormat', 'derivedFromId',
  // Authors talking to authors.
  'authorNotes', 'fieldNotes', 'notes', 'internalNotes', 'reviewComments', 'owner', 'ownerId',
  // The review pipeline's own bookkeeping.
  'reviewer', 'finalPublisher', 'reviewDue', 'lastReviewed',
  // Work still outstanding: media being chased, and the file-pipeline columns
  // that describe the admin's copy of a resource rather than the student's.
  'mediaRequests', 'mediaRecommendations',
  'collectionId', 'sha256', 'rights', 'processingStatus',
  // A selective retirement's operator, reason, recovery id and grace window.
  'archive',
])

/**
 * Fields that stay. Listed only so the drift guard can tell "considered and
 * public" from "nobody has looked at this yet"; nothing reads this set at
 * runtime.
 */
export const PUBLIC_FIELDS = new Set([
  // Item
  'id', 'kind', 'title', 'subjectId', 'status', 'updatedAt', 'fields',
  'questionData', 'articleData', 'practicalData', 'resourceData', 'deckData',
  'essayData', 'histologyData',
  // Question
  'answers', 'correctAnswer', 'tags', 'libraryIds', 'resourceIds',
  'attachedImage', 'attachments', 'media', 'learningObjective', 'estimatedSeconds',
  'randomiseAnswers',
  // Article
  'arabicTitle', 'aliases', 'templateId', 'archetype', 'language',
  'learnerStage', 'summary', 'body', 'sections', 'publishedSections',
  'publishedSummary', 'holdThese', 'loseTheMark', 'questionIds', 'annotations',
  'universityIds', 'yearIds', 'moduleIds', 'primaryNodeId', 'secondaryNodeIds',
  'subtopicId', 'microtopicId', 'nanotopicId', 'relatedConceptIds',
  'universityNotes', 'highYield', 'timeSensitive', 'publicationGate',
  'evidenceBasis', 'articleLevelSourceIds', 'claimIds', 'spanIds', 'conflicts',
  'evidenceGaps', 'relatedArticleIds', 'media', 'calloutEvidence',
  // Practical
  'references', 'conceptTags', 'format', 'candidateInstructions',
  'actorOpening', 'actorSections', 'actorFlags', 'markSections', 'difficulty',
  'decisions', 'debrief', 'subtype', 'questions',
  // The image a station or a case decision turns on. A student cannot answer
  // "what does this film show" without the film.
  'mediaUrl', 'mediaType', 'mediaMimeType',
  // Resource
  'icon', 'institution', 'storageKey', 'chapters', 'includedConceptIds',
  'includedArticleIds', 'conceptLocations',
  // Where inside a module an item sits. A student navigates by it, so it is
  // theirs to see; it names curriculum structure, not anybody's source.
  'moduleSubjectPaths',
  // What kind of question this is, and — for a written one — its marked parts.
  // A student cannot answer an item without knowing its shape, and the mark
  // scheme in `writtenParts` is what they self-mark against, exactly as an
  // essay's `modelAnswer` already is.
  'format', 'writtenParts',
  // A matching question's option bank and its prompts. The answers are in
  // there, exactly as a single-best-answer question's correct letter already
  // is — the bank marks in the browser, so it cannot work otherwise.
  'matching',
  // A multiple-response question's answer set, and a labelling plate with its
  // points. Both hold the answers, exactly as `correctAnswer` and `matching`
  // already do — the browser marks, so it cannot work otherwise.
  'multiResponse', 'labeling', 'completion',
  // Question tags. Curriculum placement, blueprint weighting and the difficulty
  // signals the adaptive engine runs on — all of which run on the student's own
  // screen, so withholding them would break the feature rather than protect
  // anything. None of it says where a question came from.
  'module', 'topic', 'subtopic', 'conceptIds', 'years', 'cognitiveEffort',
  'setting', 'intendedDifficulty', 'clinicalReasoningLevel', 'inferredDifficulty',
  'examRelevance', 'contextualConceptIds', 'questionType', 'mainConceptIds',
  'clinicalRelevance', 'academicRelevance', 'cognitiveEffortScore',
  'examWeightByYear', 'questionOnlyFor',
])

/** Remove every private key at any depth, leaving the rest untouched. */
function strip(value) {
  if (Array.isArray(value)) return value.map(strip)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [key, inner] of Object.entries(value)) {
      if (PRIVATE_FIELDS.has(key)) continue
      out[key] = strip(inner)
    }
    return out
  }
  return value
}

/**
 * Required media must name the managed asset that supplied it. Requests can be
 * anchored at any depth (stem, answer, explanation, section, or practical
 * block), so the student gate inspects the complete authored item.
 */
export function hasUnresolvedRequiredMedia(value, seen = new Set(), releasedMediaIds = null) {
  if (!value || typeof value !== 'object' || seen.has(value)) return false
  seen.add(value)
  if (Array.isArray(value)) return value.some((entry) => hasUnresolvedRequiredMedia(entry, seen, releasedMediaIds))
  for (const [key, inner] of Object.entries(value)) {
    if (key === 'mediaRequests' && Array.isArray(inner)) {
      const unresolved = inner.some((request) => {
        const mediaId = typeof request?.mediaId === 'string' ? request.mediaId.trim() : ''
        return request?.priority === 'required'
          && (request.status !== 'supplied' || !mediaId || (releasedMediaIds && !releasedMediaIds.has(mediaId)))
      })
      if (unresolved) return true
      continue
    }
    if (hasUnresolvedRequiredMedia(inner, seen, releasedMediaIds)) return true
  }
  return false
}

/** Any managed asset directly rendered by this item must be released too. */
export function hasUnreleasedManagedMedia(value, releasedMediaIds, seen = new Set()) {
  if (!releasedMediaIds || !value || typeof value !== 'object' || seen.has(value)) return false
  seen.add(value)
  if (Array.isArray(value)) return value.some((entry) => hasUnreleasedManagedMedia(entry, releasedMediaIds, seen))
  for (const [key, inner] of Object.entries(value)) {
    if ((key === 'mediaId' || key === 'sourceId') && typeof inner === 'string' && inner.startsWith('med-') && !releasedMediaIds.has(inner)) return true
    if (typeof inner === 'string') {
      const match = /^\/media\/([^/?#]+)$/.exec(inner)
      if (match) {
        let id = match[1]
        try { id = decodeURIComponent(id) } catch { return true }
        if (!releasedMediaIds.has(id)) return true
      }
    }
    if (hasUnreleasedManagedMedia(inner, releasedMediaIds, seen)) return true
  }
  return false
}

/** The released managed ids in the authoritative descriptive media document. */
export function releasedMediaIdsFromDocument(document) {
  return new Set(
    (Array.isArray(document?.records) ? document.records : [])
      .filter(isMediaReleased)
      .map((record) => record.id)
      .filter((id) => typeof id === 'string' && id.trim()),
  )
}

/** Why a nominally published item still cannot enter any student surface. */
export function publicationMediaBlockers(item, releasedMediaIds = null) {
  const blockers = []
  if (hasUnresolvedRequiredMedia(item, new Set(), releasedMediaIds)) blockers.push('required media is unresolved')
  if (hasUnreleasedManagedMedia(item, releasedMediaIds)) blockers.push('managed media is not released')
  return blockers
}

/** Published items that a server write must refuse until their media is ready. */
export function mediaBlockedPublishedItems(ledger, releasedMediaIds = null) {
  if (!Array.isArray(ledger)) return []
  return ledger
    .filter((item) => item?.status === 'Published')
    .map((item) => ({ id: item.id, title: item.title, blockers: publicationMediaBlockers(item, releasedMediaIds) }))
    .filter((item) => item.blockers.length > 0)
}

/** Blocks introduced by this write; legacy blocks remain editable so staff can repair them. */
export function newlyMediaBlockedPublishedItems(beforeLedger, beforeReleasedMediaIds, afterLedger, afterReleasedMediaIds) {
  const beforeIds = new Set(mediaBlockedPublishedItems(beforeLedger, beforeReleasedMediaIds).map((item) => item.id))
  return mediaBlockedPublishedItems(afterLedger, afterReleasedMediaIds).filter((item) => !beforeIds.has(item.id))
}

/** Non-empty, trimmed identifiers without duplicates. */
function identifiers(value) {
  if (!Array.isArray(value)) return []
  return [...new Set(value
    .filter((entry) => typeof entry === 'string')
    .map((entry) => entry.trim())
    .filter(Boolean))]
}

/** Keep the server's derived module IDs identical to the academic editor. */
function defaultModuleId(name, index) {
  const code = String(name ?? '').replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'MOD'
  return `${code} ${String(index).padStart(2, '0')}`
}

/** The module identifier at the head of `101 ISK > Anatomy > Thorax`. */
function modulePathHead(value) {
  return typeof value === 'string' ? value.split('>')[0].trim() : ''
}

/**
 * The IDs the academic catalogue authoritatively defines, plus their ownership.
 *
 * Module IDs are university-scoped. Keeping the owner maps means a real module
 * from University A cannot be used to make an archived item look assigned to
 * University B merely because both IDs exist somewhere in the catalogue.
 */
function academicIds(catalogue) {
  const universityIds = new Set()
  const yearIds = new Set()
  const yearUniversity = new Map()
  const moduleIds = new Set()
  const moduleUniversities = new Map()
  const moduleYears = new Map()

  for (const university of Array.isArray(catalogue) ? catalogue : []) {
    const universityId = typeof university?.id === 'string' ? university.id.trim() : ''
    if (!universityId) continue
    universityIds.add(universityId)
    for (const year of Array.isArray(university.years) ? university.years : []) {
      const yearId = typeof year?.id === 'string' ? year.id.trim() : ''
      if (yearId) {
        yearIds.add(yearId)
        yearUniversity.set(yearId, universityId)
      }
      for (const [index, course] of (Array.isArray(year?.courses) ? year.courses : []).entries()) {
        const explicit = typeof course?.moduleId === 'string' ? course.moduleId.trim() : ''
        const moduleId = explicit || defaultModuleId(course?.name, index + 1)
        if (!moduleId) continue
        moduleIds.add(moduleId)
        moduleUniversities.set(moduleId, new Set([...(moduleUniversities.get(moduleId) ?? []), universityId]))
        if (yearId) moduleYears.set(moduleId, new Set([...(moduleYears.get(moduleId) ?? []), yearId]))
      }
    }
  }
  return { universityIds, yearIds, yearUniversity, moduleIds, moduleUniversities, moduleYears }
}

function detachedArchiveScope(item) {
  if (item?.kind === 'question') {
    const tags = item.questionData?.tags ?? {}
    return {
      moduleIds: [...new Set([
        ...identifiers(tags.moduleIds),
        ...identifiers(tags.moduleSubjectPaths).map(modulePathHead).filter(Boolean),
      ])],
      universityIds: identifiers(tags.universityIds),
      yearIds: identifiers(tags.years),
      onlyForIds: identifiers(tags.questionOnlyFor),
    }
  }
  if (item?.kind === 'article') {
    const data = item.articleData ?? {}
    return {
      moduleIds: [...new Set([
        ...identifiers(data.moduleIds),
        ...identifiers(data.moduleSubjectPaths).map(modulePathHead).filter(Boolean),
      ])],
      universityIds: identifiers(data.universityIds),
      yearIds: identifiers(data.yearIds),
      onlyForIds: [],
    }
  }
  return { moduleIds: [], universityIds: [], yearIds: [], onlyForIds: [] }
}

function unknown(values, known) {
  return values.filter((value) => !known.has(value))
}

/**
 * Why a detached article/question is unsafe to publish against this catalogue.
 *
 * This is intentionally server-shaped and pure. The browser has a matching
 * usability check, but publication is an invariant and therefore belongs on
 * the authoritative write path too. Non-archive content is outside this rule.
 */
export function publicationArchiveScopeBlockers(item, catalogue) {
  if (item?.status !== 'Published' || item?.archive?.detached !== true
      || (item.kind !== 'question' && item.kind !== 'article')) return []

  const known = academicIds(catalogue)
  const scope = detachedArchiveScope(item)
  const blockers = []

  if (!scope.moduleIds.length) blockers.push('module assignment is required')
  const unknownModules = unknown(scope.moduleIds, known.moduleIds)
  if (unknownModules.length) blockers.push(`unknown module IDs: ${unknownModules.join(', ')}`)

  const audienceIds = [...scope.universityIds, ...scope.yearIds, ...scope.onlyForIds]
  if (!audienceIds.length) blockers.push('audience assignment is required')
  const unknownUniversities = unknown(scope.universityIds, known.universityIds)
  const unknownYears = unknown(scope.yearIds, known.yearIds)
  const knownAudienceIds = new Set([...known.universityIds, ...known.yearIds])
  const unknownOnlyFor = unknown(scope.onlyForIds, knownAudienceIds)
  if (unknownUniversities.length) blockers.push(`unknown university IDs: ${unknownUniversities.join(', ')}`)
  if (unknownYears.length) blockers.push(`unknown year IDs: ${unknownYears.join(', ')}`)
  if (unknownOnlyFor.length) blockers.push(`unknown question-only audience IDs: ${unknownOnlyFor.join(', ')}`)

  const selectedUniversities = new Set(scope.universityIds.filter((id) => known.universityIds.has(id)))
  const selectedYears = new Set(scope.yearIds.filter((id) => known.yearIds.has(id)))
  for (const id of scope.onlyForIds) {
    if (known.universityIds.has(id)) selectedUniversities.add(id)
    if (known.yearIds.has(id)) selectedYears.add(id)
  }
  for (const yearId of selectedYears) {
    const universityId = known.yearUniversity.get(yearId)
    if (universityId) selectedUniversities.add(universityId)
  }

  if (scope.universityIds.length && selectedYears.size) {
    const explicitlyAssigned = new Set(scope.universityIds.filter((id) => known.universityIds.has(id)))
    const mismatchedYears = [...selectedYears].filter((yearId) => !explicitlyAssigned.has(known.yearUniversity.get(yearId)))
    if (explicitlyAssigned.size && mismatchedYears.length) {
      blockers.push(`year IDs outside assigned universities: ${mismatchedYears.join(', ')}`)
    }
  }

  const knownModules = scope.moduleIds.filter((id) => known.moduleIds.has(id))
  const outsideAudience = knownModules.filter((moduleId) => {
    const universities = known.moduleUniversities.get(moduleId) ?? new Set()
    const years = known.moduleYears.get(moduleId) ?? new Set()
    // A selected year is the narrower, authoritative audience. Do not accept a
    // module from another year merely because both years share a university.
    if (selectedYears.size) return ![...years].some((id) => selectedYears.has(id))
    return ![...universities].some((id) => selectedUniversities.has(id))
  })
  if (outsideAudience.length && selectedUniversities.size) {
    blockers.push(`module IDs outside assigned audience: ${outsideAudience.join(', ')}`)
  }

  return blockers
}

/** Detached archived records that are nominally published but not safely assigned. */
export function archiveScopeBlockedPublishedItems(ledger, catalogue) {
  if (!Array.isArray(ledger)) return []
  return ledger
    .filter((item) => item?.status === 'Published' && item?.archive?.detached === true)
    .map((item) => ({ id: item.id, title: item.title, blockers: publicationArchiveScopeBlockers(item, catalogue) }))
    .filter((item) => item.blockers.length > 0)
}

/**
 * Invalid archive publications introduced by this write.
 *
 * Existing invalid rows remain editable so an administrator can repair them;
 * transitioning an archive to Published or making a valid publication invalid
 * is refused atomically by the caller.
 */
export function newlyArchiveScopeBlockedPublishedItems(beforeLedger, afterLedger, catalogue) {
  const beforeById = new Map((Array.isArray(beforeLedger) ? beforeLedger : [])
    .filter((item) => item?.id)
    .map((item) => [item.id, item]))
  const existingInvalidIds = new Set(archiveScopeBlockedPublishedItems(beforeLedger, catalogue).map((item) => item.id))
  const blocked = []

  for (const item of Array.isArray(afterLedger) ? afterLedger : []) {
    const before = beforeById.get(item?.id)
    const wasDetached = before?.archive?.detached === true
    if (wasDetached && item?.archive?.detached !== true) {
      blocked.push({
        id: item.id,
        title: item.title,
        blockers: ['archive detachment metadata cannot be removed'],
      })
      continue
    }
    if (item?.status !== 'Published' || (!wasDetached && item?.archive?.detached !== true)) continue

    // Validate against the server-held archive marker even if a replacement
    // document tried to omit it. Existing invalid publications stay editable
    // for remediation, but cannot erase their provenance or become less safe.
    const effective = wasDetached
      ? { ...item, archive: { ...(before.archive ?? {}), ...(item.archive ?? {}), detached: true } }
      : item
    const blockers = publicationArchiveScopeBlockers(effective, catalogue)
    if (blockers.length && !existingInvalidIds.has(item.id)) {
      blocked.push({ id: item.id, title: item.title, blockers })
    }
  }
  return blocked
}

/** The student's view of one item, or `null` when they may not see it at all. */
export function redactItem(item, releasedMediaIds = null, catalogue = null) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null
  if (item.status !== 'Published') return null
  if (publicationMediaBlockers(item, releasedMediaIds).length) return null
  if (catalogue !== null && publicationArchiveScopeBlockers(item, catalogue).length) return null
  return strip(item)
}

/**
 * The student's view of the whole ledger.
 *
 * A malformed stored value yields an empty ledger rather than a thrown request,
 * matching how `publishedQuestions.js` treats the same document.
 */
export function redactLedgerForStudent(ledger, releasedMediaIds = null, catalogue = null) {
  if (!Array.isArray(ledger)) return []
  return ledger.map((item) => redactItem(item, releasedMediaIds, catalogue)).filter((item) => item !== null)
}

/**
 * What a student is allowed to receive of the media library.
 *
 * The whole document was student-readable, on the reasoning that a student
 * needs alt text and dimensions for every image they may be shown. True of the
 * images they may be shown; the document also holds every image they may not.
 * A student received the title of every asset in the library — including a
 * scan of a faculty exam paper uploaded for authoring, which names the paper in
 * the one field the picker shows — plus `storageKey`, `sha256`, `uploadedBy`
 * and the rights negotiation on assets attached to nothing at all.
 *
 * Two rules, matching the ledger's:
 *
 *   1. Only released records leave. `isMediaReleased` is the gate the product
 *      already applies before an image reaches a student, so nothing renders
 *      that did not render before; it was simply never applied on the way out.
 *
 *   2. Only the fields a student renders. This one IS an allow-list, unlike the
 *      ledger's deny-list, because a media record is one flat shape read by one
 *      component — `PlacedImage` uses `id`, `mimeType`, `altText` and `title`,
 *      and layout uses the dimensions. There is no spread of projections here to
 *      make an allow-list guesswork.
 */
export const MEDIA_STUDENT_FIELDS = ['id', 'mediaType', 'mimeType', 'width', 'height', 'durationSeconds', 'altText', 'title']

/** Withheld: internal storage identity, provenance, and the rights negotiation. */
export const MEDIA_PRIVATE_FIELDS = ['storageKey', 'sha256', 'sizeBytes', 'rights', 'tags', 'uploadedBy', 'uploadedAt']

export function redactMediaForStudent(document) {
  const records = Array.isArray(document?.records) ? document.records : []
  return {
    records: records.filter(isMediaReleased).map((record) => {
      const out = {}
      for (const field of MEDIA_STUDENT_FIELDS) {
        if (record[field] !== undefined) out[field] = record[field]
      }
      return out
    }),
  }
}

/** The keys that need redacting on the way out, by key name. */
export const REDACTED_STATE_KEYS = new Map([
  ['synapse-admin-content-ledger-v4', redactLedgerForStudent],
  [MEDIA_STATE_KEY, redactMediaForStudent],
])
