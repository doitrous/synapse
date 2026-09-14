import type { Status } from './admin.ts'
import { yearScopeMatches } from './universities.ts'
import type { ConceptAnnotation } from './conceptGraph.ts'
import type { Difficulty } from './qbank.ts'
import type { QuestionSource } from './questionSource.ts'
import type { AnswerLetter, MediaPlacement, MediaSlot } from './mediaLibrary.ts'
import type { ArticleSection } from './userLibrary.ts'
import type { DeckAuthoringData } from './decks.ts'
import type { EssayAuthoringData } from './essay.ts'
import type { HistologyAuthoringData } from './histology.ts'

export type ArticleArchetype = 'condition' | 'presentation' | 'concept' | 'anatomy' | 'drug' | 'skill' | 'investigation' | 'organism' | 'emergency' | 'public-health'
export type PublicationGate = 'publishable' | 'needs_evidence' | 'faculty_review' | 'conflicted' | 'excluded'

export type ContentKind = 'question' | 'article' | 'practical' | 'resource' | 'deck' | 'essay' | 'histology'

import type { QuestionFormat, WrittenPart } from './questionFormat.ts'
import type { MatchingPayload } from './matchingQuestion.ts'
import type { MultiResponsePayload } from './multiResponseQuestion.ts'
import type { LabelingPayload } from './labelingQuestion.ts'
import type { CompletionPayload } from './completionQuestion.ts'

export const CONTENT_LEDGER_STORAGE_KEY = 'nishany-admin-content-ledger-v4'

export type AnswerLabel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface QuestionAnswerDraft {
  label: AnswerLabel
  text: string
  explanation: string
}

export interface MediaAttachment {
  id: string
  type: 'image' | 'audio' | 'video'
  name: string
  url: string
  mimeType?: string
  size?: number
}

/**
 * Ties a media item to the exact words it illustrates.
 *
 * The reader marks that text as pressable; pressing it opens the media. The
 * quote must appear verbatim in the article, so a reflow of the surrounding
 * prose cannot silently detach the media from what it explains.
 */
export interface ArticleMediaAnchor {
  /** Verbatim text from the article — a word, a phrase, or a whole sentence. */
  quote: string
  /** Which part of the article the quote sits in. Defaults to the body. */
  block?: 'summary' | 'body' | 'hold' | 'trap'
}

/** Rights-checked media embedded in a library article. */
export interface ArticleMediaRecord {
  id: string
  type: 'image' | 'audio' | 'video'
  sourceId?: string
  exactSource?: string
  locator?: string
  url?: string
  caption: string
  altText: string
  rights: string
  necessity: string
  /**
   * When set, this media belongs to a specific phrase and is revealed by
   * pressing it. When absent, it belongs to the article as a whole and shows
   * in the article's media section. Either way it appears in the media list.
   */
  anchor?: ArticleMediaAnchor
  /**
   * Publish this item even though its rights or alt text are still blank.
   *
   * Incomplete media is held back by default, but that is a default and not a
   * rule: the admin decides what ships. The editor always states which items
   * are held back and why, so nothing is withheld silently.
   */
  releaseWithoutReview?: boolean
}

/** Why a media item would not currently reach a student. */
export function mediaReleaseBlockers(item: ArticleMediaRecord): string[] {
  const blockers: string[] = []
  if (!item.url?.trim()) blockers.push('no URL to display')
  if (!item.rights?.trim()) blockers.push('no cleared rights')
  if (!item.altText?.trim()) blockers.push('no alt text')
  return blockers
}

/**
 * Whether a student sees this item.
 *
 * A missing URL is the one thing an override cannot fix — there is nothing to
 * render. Everything else is the admin's call.
 */
export function isMediaReleased(item: ArticleMediaRecord): boolean {
  if (!item.url?.trim()) return false
  return item.releaseWithoutReview === true || mediaReleaseBlockers(item).length === 0
}

/* ---- Admin-only media requests ------------------------------------------ */

export const MEDIA_REQUEST_PRIORITIES = ['required', 'strongly helpful', 'optional'] as const
export const MEDIA_REQUEST_STATUSES = ['needed', 'planned', 'supplied', 'declined'] as const
// A concept can own one too. Anatomy and histology concepts are frequently
// unteachable in prose — "the relations of the brachial plexus" needs the plate,
// not a paragraph — and until now the request had to be hung off whichever
// article or question happened to mention the concept, which meant the same
// plate was requested several times over and no single record said what the
// concept itself needed.
export const MEDIA_REQUEST_OWNER_KINDS = ['article', 'question', 'practical', 'concept'] as const

/**
 * Two axes, kept separate on purpose.
 *
 * `medium` is what to source — an image, a recording, a clip. `kind` is what
 * genre of image it is, and it only means anything when the medium is an image.
 * An earlier design folded `audio` and `video` into the genre list, which made
 * "a histology field" and "a heart-sound recording" look like alternatives on
 * one axis when they answer different questions.
 */
export const MEDIA_REQUEST_MEDIA = ['image', 'audio', 'video'] as const
export const MEDIA_REQUEST_KINDS = [
  'diagram', 'anatomy plate', 'histology', 'flowchart', 'graph',
  'comparison table', 'imaging example', 'algorithm', 'clinical photograph', 'other',
] as const

export type MediaRequestPriority = (typeof MEDIA_REQUEST_PRIORITIES)[number]
export type MediaRequestStatus = (typeof MEDIA_REQUEST_STATUSES)[number]
export type MediaRequestMedium = (typeof MEDIA_REQUEST_MEDIA)[number]
export type MediaRequestKind = (typeof MEDIA_REQUEST_KINDS)[number]
export type MediaRequestOwnerKind = (typeof MEDIA_REQUEST_OWNER_KINDS)[number]

export interface MediaReviewComment {
  id: string
  /** The precise student-visible part the reviewer is discussing. */
  anchor: string
  kind: 'comment' | 'problem'
  text: string
  author: string
  createdAt: string
}

export const ESCALATION_PRIORITIES = ['urgent', 'high', 'normal'] as const
export type EscalationPriority = (typeof ESCALATION_PRIORITIES)[number]
/** open: with editors/super admins. returned: handed back to the reviewer. resolved: closed. */
export type EscalationStatus = 'open' | 'returned' | 'resolved'

export interface MediaEscalationEvent {
  at: string
  actorId: string | null
  actorName: string
  /** Effective-role label of whoever acted: Reviewer, Editor, Superadmin, … */
  actorRole: string
  action: 'escalated' | 'returned' | 'reassigned' | 'resolved' | 'note'
  note?: string
}

/**
 * A reviewer's request for help with a media request they cannot complete safely.
 *
 * While `status` is 'open' the request is the editors' and super admins' to move;
 * the reviewer's own edits to it are refused until it is returned or resolved, so
 * two people are never quietly working the same escalated item. Every transition
 * appends to `history` — who escalated, who returned it, who resolved it — so the
 * queue is auditable end to end.
 */
export interface MediaRequestEscalation {
  reason: string
  priority: EscalationPriority
  byUserId: string | null
  byName: string
  byRole: string
  at: string
  status: EscalationStatus
  history: MediaEscalationEvent[]
  /** Who last returned/resolved it, for the queue and the audit trail. */
  handledBy?: string
  handledAt?: string
}

/**
 * An asset a piece of content needs but does not yet have.
 *
 * One type serves articles, questions and practicals. They had three — an
 * article "image recommendation", a practical "media request" and a proposed
 * question equivalent — which is three names for one editorial instruction and
 * three backlogs to work through.
 *
 * This is deliberately NOT an `ArticleMediaRecord`. That type is a student media
 * record whose release is governed by `isMediaReleased`, so an unfulfilled
 * request stored there would sit one `releaseWithoutReview` flag away from a
 * student. A request is an instruction to a human; it carries no URL and never
 * reaches a published projection. `mediaId` links it to the real media once that
 * media exists.
 */
export interface MediaRequest {
  id: string
  /** The article, question or practical that needs the asset. */
  ownerId: string
  ownerKind: MediaRequestOwnerKind
  medium: MediaRequestMedium
  /** Genre of image. Carried for every request but only meaningful for images. */
  kind: MediaRequestKind
  /** What to draw or source, in one line. */
  brief: string
  /** What a student should be able to do after seeing it, and why prose cannot carry it. */
  teachingPurpose: string
  /** Where within the owner this belongs — an article section, or a practical's `###` block. */
  section?: string
  block?: 'summary' | 'body' | 'hold' | 'trap'
  /** Verbatim owner text this asset illustrates, when it belongs to one phrase. */
  anchorQuote?: string
  priority: MediaRequestPriority
  status: MediaRequestStatus
  notes?: string
  /** Where a fulfiller should look, e.g. "openly licensed anatomy atlas". */
  sourceDirection?: string
  rightsNotes?: string
  /**
   * Where in the owner this asset goes, when the requester knows.
   *
   * A request that names one saves the fulfiller a guess — "answer C needs a
   * chest X-ray" rather than "this question needs a chest X-ray somewhere".
   * Requests that name none still work; the slot is chosen at upload time.
   */
  slot?: MediaSlot
  /** Only meaningful when slot is 'answer'. */
  answerLabel?: AnswerLetter
  /** Set once a real media record fulfils this request. */
  mediaId?: string
  /** Private, anchored reviewer discussion. Never enters a student projection. */
  reviewComments?: MediaReviewComment[]
  /**
   * Present once a reviewer has escalated this request to editors/super admins.
   * Its `status` governs who may edit the request — see MediaRequestEscalation.
   */
  escalation?: MediaRequestEscalation
}

/**
 * Evidence backing one "Hold these" or "Where people lose the mark" line.
 *
 * Keyed by the callout's exact text rather than its index, so reordering or
 * inserting a line cannot silently re-point evidence at a different claim.
 */
export interface CalloutEvidence {
  claimIds?: string[]
  citationIds?: string[]
  spanId?: string
  reviewedBy?: string
  reviewedAt?: string
}

export interface QuestionTags {
  module: string
  topic: string
  subtopic: string
  conceptIds: string[]
  years: string[]
  universityIds: string[]
  cognitiveEffort: 'Low' | 'Medium' | 'High'
  setting: 'Academic' | 'Clinical' | 'Both'
  intendedDifficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging'
  clinicalReasoningLevel: number
  inferredDifficulty: number
  examRelevance: number
  contextualConceptIds: string[]
  // ---- Extended blueprint tagging ----
  questionType?: string
  /** The concept ID(s) this question primarily assesses. */
  mainConceptIds?: string[]
  /** Every module ID this question applies to. */
  moduleIds?: string[]
  /**
   * Where inside each module this belongs, as written:
   * `101 ISK > Anatomy > Upper Limb`.
   *
   * A module ID alone is too coarse to revise by — a module runs a term and
   * covers several disciplines. Kept as written rather than as a resolved ID,
   * because the subject tree is reorganised as department books change and a
   * path that stops resolving can be reported and repaired, where a stale ID
   * just points at nothing. See `moduleSubjectPath.ts`.
   */
  moduleSubjectPaths?: string[]
  clinicalRelevance?: number
  academicRelevance?: number
  /** Cognitive effort on a 0–1 scale (finer than the Low/Medium/High band). */
  cognitiveEffortScore?: number
  /** Per-year exam-blueprint weight, keyed by year_ID, each 0–1. */
  examWeightByYear?: Record<string, number>
  /** If set, the question applies ONLY to these year/university IDs. */
  questionOnlyFor?: string[]
  /** The student-facing MCQ source bucket. The single source of truth, copied to `Question.source`. */
  sourceCategory?: QuestionSource
}

export interface QuestionAuthoringData {
  /**
   * What kind of question this is. Absent means `mcq_single_best`, so every
   * question authored before formats existed keeps working untouched.
   */
  format?: QuestionFormat
  /**
   * The marked subparts of a written question — present only on the written
   * formats, where the marks and expected components *are* the question.
   */
  writtenParts?: WrittenPart[]
  /**
   * The option bank and prompts of a matching question. Present only on
   * `format: 'matching'`.
   */
  matching?: MatchingPayload
  /**
   * Which options are correct on a multiple-response question. Present only on
   * `format: 'mcq_multi'`, because `correctAnswer` holds one letter and cannot.
   */
  multiResponse?: MultiResponsePayload
  /** The image and its labelled points. Present only on `format: 'labeling'`. */
  labeling?: LabelingPayload
  /** The sentence and its blanks. Present only on `format: 'completion'`. */
  completion?: CompletionPayload
  /**
   * What this was derived from, when it was derived rather than transcribed.
   * A written question may only be derived from another written question; the
   * validator enforces that against this. See `questionFormat.ts`.
   */
  derivedFromFormat?: QuestionFormat | 'concept' | 'practical'
  /** The question this was derived from, when there is one. */
  derivedFromId?: string
  attachments: MediaAttachment[]
  /**
   * Images placed in this question, by slot.
   *
   * Separate from `attachedImage` and `attachments`, which predate the media
   * library and still render — live content is not broken to tidy a data model.
   *
   * Questions alone carry placements. An article already has
   * `ArticleMediaRecord[]`, with anchors tying an image to the exact words it
   * illustrates; a second list beside it would be two ways to put a picture in
   * one article, free to disagree about which renders. Slots were only ever
   * missing here, where an option can itself be a picture.
   */
  media?: MediaPlacement[]
  correctAnswer: AnswerLabel
  answers: QuestionAnswerDraft[]
  attachedImage: string
  libraryIds: string[]
  resourceIds: string[]
  tags: QuestionTags
  /** Admin-only. Assets this question needs before it can publish — see `MediaRequest`. */
  mediaRequests?: MediaRequest[]
  learningObjective: string
  authorNotes: string
  sourceCitation: string
  estimatedSeconds: number
  randomiseAnswers: boolean
}

export interface ArticleAuthoringData {
  /** Canonical identity and article-template fields. */
  arabicTitle?: string
  aliases?: string[]
  templateId?: string
  archetype?: ArticleArchetype
  language?: string
  learnerStage?: string
  summary: string
  /** Legacy single-body text; superseded by named `sections` but kept for imports. */
  body: string
  /** Named clinical sections (Definition, Incidence, Pathophysiology, …). */
  sections: ArticleSection[]
  /** Evidence-gated student projection; `sections` remains the complete admin draft. */
  publishedSections?: ArticleSection[]
  /**
   * Admin list-index projection only (server `toIndexItem`): whether `sections`
   * holds any body, and the kinds of `publishedSections` — so `publishReadiness`
   * works on a list row without shipping the ~35 MB of article bodies. Absent on
   * a full item (which carries `sections`/`publishedSections` instead).
   */
  hasBody?: boolean
  publishedSectionKinds?: string[]
  /** Student summary for the evidence-gated projection. */
  publishedSummary?: string
  holdThese: string[]
  loseTheMark: string[]
  questionIds: string[]
  resourceIds: string[]
  annotations: ConceptAnnotation[]
  // ---- Scoping & concept tags ----
  /** University IDs this article applies to. */
  universityIds?: string[]
  /** Year IDs this article applies to. */
  yearIds?: string[]
  moduleIds?: string[]
  /**
   * Where inside each module this belongs, as written:
   * `101 ISK > Anatomy > Upper Limb`.
   *
   * A module ID alone is too coarse to revise by — a module runs a term and
   * covers several disciplines. Kept as written rather than as a resolved ID,
   * because the subject tree is reorganised as department books change and a
   * path that stops resolving can be reported and repaired, where a stale ID
   * just points at nothing. See `moduleSubjectPath.ts`.
   */
  moduleSubjectPaths?: string[]
  /** Canonical placement in the complete medical-library taxonomy. */
  primaryNodeId?: string
  /** Additional valid placements across systems, disciplines, skills, and knowledge. */
  secondaryNodeIds?: string[]
  subtopicId?: string
  microtopicId?: string
  nanotopicId?: string
  /** Concept IDs related to this article (from here, or auto-caught from a concept). */
  relatedConceptIds?: string[]
  /** University-specific notes (e.g. "Ain Shams only"), rendered as distinct callouts. */
  universityNotes?: Array<{ id: string; universityId: string; text: string }>
  /** Field-specific reasons for values intentionally left empty. */
  fieldNotes?: Record<string, string>
  /** Article and evidence governance. */
  reviewer?: string
  finalPublisher?: string
  reviewDue?: string
  lastReviewed?: string
  highYield?: 'Core' | 'High' | 'Supplementary'
  timeSensitive?: 'stable' | 'time_sensitive'
  publicationGate?: PublicationGate
  evidenceBasis?: string[]
  articleLevelSourceIds?: string[]
  claimIds?: string[]
  spanIds?: string[]
  conflicts?: string[]
  evidenceGaps?: string[]
  relatedArticleIds?: string[]
  media?: ArticleMediaRecord[]
  /** Admin-only. Never projected to a student — see `MediaRequest`. */
  mediaRequests?: MediaRequest[]
  /** Evidence for individual `holdThese` / `loseTheMark` lines, keyed by exact text. */
  calloutEvidence?: Record<string, CalloutEvidence>
  notes?: string
}

export interface PracticalAnswerDraft {
  id: string
  text: string
  /** Why this option is right, or which misconception picks it when it is wrong. */
  explanation: string
  correct: boolean
}

/**
 * The same four bands the question bank uses.
 *
 * Aliased rather than redeclared: a practical and an MCQ marked `Hard` must mean
 * the same thing to a student, and two parallel scales would drift.
 */
export type PracticalDifficulty = Difficulty

/**
 * What a practical assesses, using the same distinction `QuestionTags` draws.
 *
 * `mainConceptIds` is what the item is *for*; `conceptIds` is what it also
 * assesses along the way; `contextualConceptIds` is everything the scenario
 * needs but does not test. Keeping the third bucket separate is what stops a
 * mentioned concept from collecting mastery evidence it never earned.
 */
export interface PracticalConceptTags {
  mainConceptIds: string[]
  conceptIds: string[]
  contextualConceptIds: string[]
}

/** What all three practical formats carry, whatever their shape. */
export interface PracticalCommon {
  /**
   * Where inside each module this belongs, as written:
   * `101 ISK > Anatomy > Upper Limb`. See `moduleSubjectPath.ts`.
   */
  moduleSubjectPaths?: string[]
  references: string[]
  conceptTags: PracticalConceptTags
  /**
   * Assets the station still needs. Stored apart from `LabQuestionDraft.mediaUrl`
   * on purpose — the runner renders any non-empty `mediaUrl` as an `<img>`, so a
   * placeholder written there would show a student a broken image. `section`
   * names the `###` block the asset belongs to, or `station` for the item.
   */
  mediaRequests: MediaRequest[]
  /** What a student who passes this item has demonstrated. */
  learningObjective?: string
  /**
   * Curriculum placement, matching the blocks articles and resources already
   * carry. A station used to record its references, its concepts and the assets
   * it still needed, and nothing at all about where in the curriculum it sits —
   * so it could not be assigned to a reviewer even in principle.
   *
   * Absent until somebody tags it, and that absence is what keeps an untagged
   * station with the editors rather than handing it to whichever reviewer asked
   * first. See `itemWritableBy` in server/src/contentScope.js.
   */
  universityIds?: string[]
  yearIds?: string[]
  moduleIds?: string[]
}

/** The shared blocks of a practical that has not been tagged yet. */
export function emptyPracticalCommon(): PracticalCommon {
  return {
    references: [],
    conceptTags: { mainConceptIds: [], conceptIds: [], contextualConceptIds: [] },
    mediaRequests: [],
  }
}

export interface ActorBriefSectionDraft {
  id: string
  label: string
  content: string
  group?: string
}

export interface PracticalMarkSectionDraft {
  id: string
  title: string
  marks: number
  items: Array<{ id: string; text: string }>
}

export interface OsceAuthoringData extends PracticalCommon {
  format: 'osce'
  /** Managed media a station is built around — image, recording or clip. */
  mediaUrl?: string
  mediaType?: MediaAttachment['type']
  mediaMimeType?: string
  candidateInstructions: string
  actorOpening: string
  actorSections: ActorBriefSectionDraft[]
  actorFlags: string[]
  markSections: PracticalMarkSectionDraft[]
  difficulty?: PracticalDifficulty
}

export interface ClinicalDecisionDraft {
  id: string
  title: string
  context: string
  /** Managed image, recording or clip the decision turns on. */
  mediaUrl?: string
  mediaType?: MediaAttachment['type']
  mediaMimeType?: string
  question: string
  answers: PracticalAnswerDraft[]
  rationale: string
  /** The single concept this decision teaches. */
  conceptId?: string
  /** Concepts it also assesses. */
  secondaryConceptIds?: string[]
  difficulty?: PracticalDifficulty
}

/**
 * Presenting observations for a case, shown as a compact strip beside the
 * decisions. All fields optional; a case with no `vitals` renders no strip.
 * Units are fixed by convention (HR bpm, BP mmHg, RR /min, SpO₂ %, Temp °C,
 * GCS /15, Glucose mmol/L) rather than stored, to keep authoring terse.
 * `abnormal` is the author's clinical call *in context* (a normal range is
 * age/sex/comorbidity dependent), listing which keys to flag.
 */
export interface Vitals {
  hr?: number
  bp?: string
  rr?: number
  spo2?: number
  temp?: number
  gcs?: number
  glucose?: number
  abnormal?: Array<'hr' | 'bp' | 'rr' | 'spo2' | 'temp' | 'gcs' | 'glucose'>
  note?: string
}

export interface CaseAuthoringData extends PracticalCommon {
  format: 'case'
  decisions: ClinicalDecisionDraft[]
  debrief: string
  vitals?: Vitals
}

export interface LabQuestionDraft {
  id: string
  context: string
  question: string
  /** Managed image, recording or clip for this interpretation question. */
  mediaUrl: string
  mediaType?: MediaAttachment['type']
  mediaMimeType?: string
  answers: PracticalAnswerDraft[]
  explanation: string
  /** The single concept this question teaches. */
  conceptId?: string
  /** Concepts it also assesses. */
  secondaryConceptIds?: string[]
  difficulty?: PracticalDifficulty
}

export interface LabAuthoringData extends PracticalCommon {
  format: 'lab'
  subtype: 'Lab' | 'Imaging'
  questions: LabQuestionDraft[]
}

export type PracticalAuthoringData = OsceAuthoringData | CaseAuthoringData | LabAuthoringData

/**
 * Pins a concept to a precise place inside a resource so the app can deep-link
 * a concept straight to "where it is explained". `locator` is free text but
 * interpreted by `kind`: a page number, a slide number, a line number, or a
 * `mm:ss` video timestamp. The player/reader jumps there when a student opens
 * the concept's "see it in context" link.
 */
export interface ResourceConceptLocation {
  id: string
  conceptId: string
  kind: 'page' | 'line' | 'slide' | 'timestamp'
  /** e.g. "142", "142–148", "3:20" for a timestamp, or "L. 12". */
  locator: string
  note?: string
}

export interface ResourceAuthoringData {
  universityIds?: string[]
  yearIds?: string[]
  /** A name from `RESOURCE_ICONS`; absent means the glyph for the type. */
  icon?: string
  institution?: string
  collectionId?: string
  storageKey?: string
  sha256?: string
  rights?: string
  processingStatus?: string
  reviewer?: string
  finalPublisher?: string
  /** Every chapter this resource covers (multi-select). */
  chapters: string[]
  /** Every module ID this resource is attached to (multi-select). */
  moduleIds: string[]
  /**
   * Where inside each module this belongs, as written:
   * `101 ISK > Anatomy > Upper Limb`.
   *
   * A module ID alone is too coarse to revise by — a module runs a term and
   * covers several disciplines. Kept as written rather than as a resolved ID,
   * because the subject tree is reorganised as department books change and a
   * path that stops resolving can be reported and repaired, where a stale ID
   * just points at nothing. See `moduleSubjectPath.ts`.
   */
  moduleSubjectPaths?: string[]
  /** Concept IDs whose material appears in this resource. */
  includedConceptIds: string[]
  /** Library article IDs bundled with this resource. */
  includedArticleIds: string[]
  /** Concept → page/line/slide/timestamp deep-link map. */
  conceptLocations: ResourceConceptLocation[]
}

/**
 * Where an item came from.
 *
 * Purely an admin record. A student is never told whether a question was written
 * here or lifted from a faculty paper, and nothing student-facing reads this — it
 * exists so a batch taken from one college can be found, reviewed, and acted on as
 * the batch it is, rather than dissolving into the catalogue on import.
 */
export interface ContentSource {
  origin: 'internal' | 'university'
  /** A university in the catalogue, when the source is one of them. */
  universityId?: string
  /** Free text for a college or faculty that is not in the catalogue. */
  institution?: string
  /** Which paper, exam, or year this came out of. */
  reference?: string
}

/** Private receipt for an administrator's selective catalogue retirement. */
export interface ContentArchiveRecord {
  operationId: string
  actorId: string
  reason: string
  archivedAt: string
  detached: true
  originalStatus: Status
  /** Existing solo attempts may finish scoring until this instant. */
}

export interface ManagedContentItem {
  id: string
  kind: ContentKind
  title: string
  subjectId: string
  status: Status
  owner: string
  updatedAt: string
  fields: Record<string, string>
  /**
   * Admin-managed catalogue labels shared by every content type.
   *
   * These are deliberately separate from question blueprint tags and concept
   * links: an editorial label such as `Generated - No Module` describes the
   * record's workflow/provenance, not what a student is expected to master.
   */
  editorialTags?: string[]
  /** Admin-only provenance. Absent means internally authored. */
  source?: ContentSource
  /** Admin-only recovery and audit metadata. */
  archive?: ContentArchiveRecord
  questionData?: QuestionAuthoringData
  articleData?: ArticleAuthoringData
  practicalData?: PracticalAuthoringData
  resourceData?: ResourceAuthoringData
  deckData?: DeckAuthoringData
  essayData?: EssayAuthoringData
  histologyData?: HistologyAuthoringData
}

/**
 * Required media still outstanding anywhere inside an authored item.
 *
 * Requests may sit on the owner or on an anchored section/answer payload. A
 * recursive read keeps the publication rule independent of content type and
 * slot. `supplied` alone is not enough: it must name the managed asset that
 * fulfilled it, so a manually changed status cannot release broken content.
 */
export function mediaRequestsOf(item: ManagedContentItem): MediaRequest[] {
  const found: MediaRequest[] = []
  const seen = new Set<unknown>()
  const requestIds = new Set<string>()
  const requestObjects = new Set<object>()
  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object' || seen.has(value)) return
    seen.add(value)
    if (Array.isArray(value)) { value.forEach(visit); return }
    for (const [key, inner] of Object.entries(value)) {
      if (key === 'mediaRequests' && Array.isArray(inner)) {
        for (const request of inner as MediaRequest[]) {
          if (!request || typeof request !== 'object' || requestObjects.has(request)) continue
          requestObjects.add(request)
          const id = typeof request.id === 'string' ? request.id.trim() : ''
          if (id && requestIds.has(id)) continue
          if (id) requestIds.add(id)
          found.push(request)
        }
      } else visit(inner)
    }
  }
  visit(item)
  return found
}

export function blockingMediaRequests(item: ManagedContentItem): MediaRequest[] {
  return mediaRequestsOf(item).filter((request) => (
    request.priority === 'required'
    && (request.status !== 'supplied' || !request.mediaId?.trim())
  ))
}

export type MediaRequestFilter = 'all' | 'any' | 'outstanding' | 'blocking' | 'none'

/** Match a catalogue item against the reviewer-facing media-request states. */
export function matchesMediaRequestFilter(item: ManagedContentItem, filter: MediaRequestFilter): boolean {
  if (filter === 'all') return true
  const requests = mediaRequestsOf(item)
  if (filter === 'none') return requests.length === 0
  if (filter === 'any') return requests.length > 0
  if (filter === 'blocking') return blockingMediaRequests(item).length > 0
  return requests.some((request) => request.status === 'needed' || request.status === 'planned')
    || blockingMediaRequests(item).length > 0
}

/** The one student-projection gate every content surface can share. */
export function isStudentPublishable(item: ManagedContentItem): boolean {
  return item.status === 'Published' && blockingMediaRequests(item).length === 0
}

/** True when an item was taken from a university or college rather than authored here. */
export function isUniversitySourced(item: ManagedContentItem): boolean {
  return item.source?.origin === 'university'
}

/** How the source reads in one line, for a chip or a group heading. */
export function sourceLabel(source: ContentSource | undefined, universityName?: string): string {
  if (source?.origin !== 'university') return 'Written here'
  const where = universityName ?? source.institution ?? 'University source'
  return source.reference ? `${where} · ${source.reference}` : where
}

/** Production content is hydrated from the backend; never seed demo records. */
export function initialManagedContent(): ManagedContentItem[] {
  return []
}

/**
 * The university and year scope an author recorded on an item.
 *
 * Each kind keeps it in its own authoring block, so this is the one place that
 * knows where to look. An item with nothing recorded applies to everyone — the
 * same "empty means unrestricted" rule vouchers and campaigns use.
 */
export function itemScope(item: ManagedContentItem): { universityIds: string[]; yearIds: string[] } {
  const questionTags = item.questionData?.tags
  const scope = item.articleData ?? item.practicalData ?? item.resourceData
  return {
    universityIds: questionTags?.universityIds ?? scope?.universityIds ?? [],
    yearIds: questionTags?.years ?? scope?.yearIds ?? [],
  }
}

/** True when an item is in scope for the given university and/or year. */
export function itemInScope(item: ManagedContentItem, universityId?: string, yearId?: string): boolean {
  const scope = itemScope(item)
  if (universityId && scope.universityIds.length > 0 && !scope.universityIds.includes(universityId)) return false
  if (!yearScopeMatches(scope.yearIds, yearId)) return false
  return true
}

export const CONTENT_KIND_LABEL: Record<ContentKind, { singular: string; plural: string }> = {
  question: { singular: 'question', plural: 'Questions' },
  article: { singular: 'article', plural: 'Library articles' },
  practical: { singular: 'practical item', plural: 'Practical items' },
  resource: { singular: 'resource', plural: 'Resources' },
  deck: { singular: 'deck', plural: 'Flashcard decks' },
  essay: { singular: 'written question', plural: 'Written questions' },
  histology: { singular: 'slide', plural: 'Histology slides' },
}

export const CONTENT_FIELDS: Record<ContentKind, Array<{ key: string; label: string; multiline?: boolean }>> = {
  question: [
    { key: 'Topic', label: 'Topic' },
    { key: 'Difficulty', label: 'Difficulty' },
    { key: 'Vignette', label: 'Clinical vignette', multiline: true },
    { key: 'Explanation', label: 'Worked explanation', multiline: true },
  ],
  article: [
    { key: 'Topic', label: 'Chapter' },
    { key: 'Summary', label: 'Article summary', multiline: true },
    { key: 'Reading time', label: 'Reading time (minutes)' },
    { key: 'Key point', label: 'Essential key point', multiline: true },
  ],
  practical: [
    { key: 'Type', label: 'Practical format' },
    { key: 'Duration', label: 'Duration (minutes)' },
    { key: 'Marks', label: 'Available marks' },
    { key: 'Difficulty', label: 'Difficulty' },
  ],
  resource: [
    { key: 'Type', label: 'Resource type' },
    { key: 'Source', label: 'Source or publisher' },
    { key: 'Location', label: 'Exact page, slide, chapter, or timestamp' },
    { key: 'Year', label: 'Publication year' },
    { key: 'Topics', label: 'Tagged topics (IDs/titles)', multiline: true },
    { key: 'Chapter', label: 'Chapter / module' },
    { key: 'Included concepts', label: 'Included concept IDs (one per line)', multiline: true },
    { key: 'Included articles', label: 'Included library article IDs', multiline: true },
  ],
  deck: [
    { key: 'Description', label: 'What this deck covers', multiline: true },
  ],
  essay: [
    { key: 'Prompt', label: 'The question', multiline: true },
    { key: 'ExaminerNote', label: 'What the examiner scans for', multiline: true },
  ],
  histology: [
    { key: 'Tissue', label: 'Tissue' },
    { key: 'Stain', label: 'Stain' },
    { key: 'Description', label: 'What to look for', multiline: true },
  ],
}
