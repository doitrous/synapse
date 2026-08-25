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

/** The student's view of one item, or `null` when they may not see it at all. */
export function redactItem(item, releasedMediaIds = null) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null
  if (item.status !== 'Published') return null
  if (hasUnresolvedRequiredMedia(item, new Set(), releasedMediaIds)) return null
  if (hasUnreleasedManagedMedia(item, releasedMediaIds)) return null
  return strip(item)
}

/**
 * The student's view of the whole ledger.
 *
 * A malformed stored value yields an empty ledger rather than a thrown request,
 * matching how `publishedQuestions.js` treats the same document.
 */
export function redactLedgerForStudent(ledger, releasedMediaIds = null) {
  if (!Array.isArray(ledger)) return []
  return ledger.map((item) => redactItem(item, releasedMediaIds)).filter((item) => item !== null)
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
