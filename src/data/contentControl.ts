import type { Status } from './admin'
import type { ConceptAnnotation } from './conceptGraph'
import type { ArticleSection } from './userLibrary'

export type ArticleArchetype = 'condition' | 'presentation' | 'concept' | 'anatomy' | 'drug' | 'skill' | 'investigation' | 'organism' | 'emergency' | 'public-health'
export type PublicationGate = 'publishable' | 'needs_evidence' | 'faculty_review' | 'conflicted' | 'excluded'

export type ContentKind = 'question' | 'article' | 'practical' | 'resource'

export const CONTENT_LEDGER_STORAGE_KEY = 'synapse-admin-content-ledger-v4'

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
  intendedDifficulty: 'Easy' | 'Moderate' | 'Hard'
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
  clinicalRelevance?: number
  academicRelevance?: number
  /** Cognitive effort on a 0–1 scale (finer than the Low/Medium/High band). */
  cognitiveEffortScore?: number
  /** Per-year exam-blueprint weight, keyed by year_ID, each 0–1. */
  examWeightByYear?: Record<string, number>
  /** If set, the question applies ONLY to these year/university IDs. */
  questionOnlyFor?: string[]
}

export interface QuestionAuthoringData {
  attachments: MediaAttachment[]
  correctAnswer: AnswerLabel
  answers: QuestionAnswerDraft[]
  attachedImage: string
  libraryIds: string[]
  resourceIds: string[]
  tags: QuestionTags
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
  notes?: string
}

export interface PracticalAnswerDraft {
  id: string
  text: string
  explanation: string
  correct: boolean
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

export interface OsceAuthoringData {
  format: 'osce'
  candidateInstructions: string
  actorOpening: string
  actorSections: ActorBriefSectionDraft[]
  actorFlags: string[]
  markSections: PracticalMarkSectionDraft[]
  references: string[]
}

export interface ClinicalDecisionDraft {
  id: string
  title: string
  context: string
  question: string
  answers: PracticalAnswerDraft[]
  rationale: string
}

export interface CaseAuthoringData {
  format: 'case'
  decisions: ClinicalDecisionDraft[]
  debrief: string
  references: string[]
}

export interface LabQuestionDraft {
  id: string
  context: string
  question: string
  mediaUrl: string
  answers: PracticalAnswerDraft[]
  explanation: string
}

export interface LabAuthoringData {
  format: 'lab'
  subtype: 'Lab' | 'Imaging'
  questions: LabQuestionDraft[]
  references: string[]
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
  /** Concept IDs whose material appears in this resource. */
  includedConceptIds: string[]
  /** Library article IDs bundled with this resource. */
  includedArticleIds: string[]
  /** Concept → page/line/slide/timestamp deep-link map. */
  conceptLocations: ResourceConceptLocation[]
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
  questionData?: QuestionAuthoringData
  articleData?: ArticleAuthoringData
  practicalData?: PracticalAuthoringData
  resourceData?: ResourceAuthoringData
}

/** Production content is hydrated from the backend; never seed demo records. */
export function initialManagedContent(): ManagedContentItem[] {
  return []
}

export const CONTENT_KIND_LABEL: Record<ContentKind, { singular: string; plural: string }> = {
  question: { singular: 'question', plural: 'Questions' },
  article: { singular: 'article', plural: 'Library articles' },
  practical: { singular: 'practical item', plural: 'Practical items' },
  resource: { singular: 'resource', plural: 'Resources' },
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
}
