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
  'authorNotes', 'fieldNotes', 'notes', 'internalNotes', 'owner', 'ownerId',
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
  'attachedImage', 'attachments', 'learningObjective', 'estimatedSeconds',
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
  'mediaUrl',
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

/** The student's view of one item, or `null` when they may not see it at all. */
export function redactItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null
  if (item.status !== 'Published') return null
  return strip(item)
}

/**
 * The student's view of the whole ledger.
 *
 * A malformed stored value yields an empty ledger rather than a thrown request,
 * matching how `publishedQuestions.js` treats the same document.
 */
export function redactLedgerForStudent(ledger) {
  if (!Array.isArray(ledger)) return []
  return ledger.map(redactItem).filter((item) => item !== null)
}

/** The keys that need redacting on the way out, by key name. */
export const REDACTED_STATE_KEYS = new Map([
  ['synapse-admin-content-ledger-v4', redactLedgerForStudent],
])
