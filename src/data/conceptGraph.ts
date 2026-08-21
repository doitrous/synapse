import type { ExamSignal } from './examSignal.ts'
export const CONCEPT_RELATIONS = [
  'related_concepts',
  'prerequisite_of',
  'part_of',
  'mechanism_step_before',
  'causes',
  'increases',
  'decreases',
  'presents_as',
  'diagnosed_by',
  'investigated_by',
  'treated_by',
  'contraindicates',
  'differential_of',
  'complication_of',
  'associated_with',
  'contrasts_with',
  'often_confused_with',
  'is_a',
  'located_in',
  'supplies',
  'drains_into',
  'contains',
  'composed_of',
  'accompanies',
  'regulates',
  'connects_to',
] as const

export const STATEMENT_RELATIONS = ['definition_of', ...CONCEPT_RELATIONS] as const

export type ConceptRelationType = (typeof CONCEPT_RELATIONS)[number]
export type StatementRelationType = (typeof STATEMENT_RELATIONS)[number]

export const CONCEPT_STORAGE_KEY = 'synapse-concept-graph-v2'

export type ConceptStatus = 'active' | 'inactive' | 'under review'

/**
 * A concept is the smallest assessable objective. Beyond its definition it
 * carries curriculum placement (system/topic/subtopic IDs), exam-blueprint
 * weighting (overall and per university year), relevance scores, pitfalls, and
 * the resources/articles that cover it.
 */
export interface Concept {
  id: string
  label: string
  aliases: string[]
  canonicalKey?: string
  arabicLabel?: string
  arabicAliases?: string[]
  definition: string
  /** Common mistakes / traps for this concept. */
  pitfalls?: string
  status?: ConceptStatus
  articleIds: string[]
  /** Explicit scope for admin-authored concepts; existing ones derive from articleIds. */
  subjectId?: string
  topicId?: string
  /** Visible curriculum IDs (SYS_*, TPC_*, SUB_*, MIC_*). */
  systemId?: string
  topicTagId?: string
  subtopicId?: string
  microtopicId?: string
  nanotopicId?: string
  /** Canonical placement in the complete medical-library taxonomy. */
  primaryNodeId?: string
  secondaryNodeIds?: string[]
  conceptType?: string
  learnerYears?: number[]
  universityIds?: string[]
  moduleIds?: string[]
  explicitObjective?: string
  /** Overall exam-blueprint weight, 0–1. */
  blueprintWeight?: number
  /** Per-year exam-blueprint weight, keyed by year_ID (e.g. OMS_Y2), each 0–1. */
  examWeightByYear?: Record<string, number>
  clinicalRelevance?: number
  academicRelevance?: number
  /** Related concept IDs (the simple, untyped list; typed relations live in relations[]). */
  relatedConceptIds?: string[]
  /** Article IDs that discuss this concept. */
  relatedArticleIds?: string[]
  /** Resource IDs approved for this concept — auto-maintained as resources are tagged. */
  resourceIds?: string[]
  approvedFileResourceIds?: string[]
  approvedVideoResourceIds?: string[]
  /** Claim-level evidence and reversible canonicalisation lineage. */
  atomicClaimIds?: string[]
  resourceOccurrenceIds?: string[]
  supportMode?: string
  confidence?: number
  conflicts?: string[]
  uncertainty?: string[]
  evidenceGaps?: string[]
  sourceCandidateIds?: string[]
  mergeIds?: string[]
  rejectedMergeCandidateIds?: string[]
  originalWording?: string[]
  owner?: string
  reviewer?: string
  finalPublisher?: string
  lastReviewed?: string
  reviewDue?: string
  publicationStatus?: string
  editorialReviewStatus?: string
  exclusionReason?: string | null
  weightConfidence?: number
  /**
   * Why this concept is weighted the way it is: which papers it appeared on,
   * at what tier, in which year, and how sure the extraction was.
   *
   * `blueprintWeight` is a number with no account of itself, which is fine
   * while weights are set by hand and useless once they come from hundreds of
   * past papers. When this is present the blueprint derives the weight from it
   * instead — see `examSignal.ts` — so the inputs stay reviewable and a weight
   * can be recomputed when the rules change rather than re-gathered.
   */
  examSignal?: ExamSignal
  /** Field-specific reasons for values intentionally left empty. */
  fieldNotes?: Record<string, string>
}

export interface ConceptRelation {
  id: string
  sourceId: string
  type: ConceptRelationType
  targetId: string
  evidenceClaimIds?: string[]
  citationIds?: string[]
  confidence?: number
  verificationStatus?: 'verified' | 'needs_evidence' | 'conflicted'
  qualifiers?: Record<string, string | number | boolean | string[]>
  reviewer?: string
  reviewedAt?: string
}

export interface ConceptGraph {
  concepts: Concept[]
  relations: ConceptRelation[]
}

export interface ConceptAnnotation {
  id: string
  quote: string
  conceptId: string
  relation: StatementRelationType
  block: 'summary' | 'body' | 'hold' | 'trap'
}

export function initialConceptGraph(): ConceptGraph {
  return { concepts: [], relations: [] }
}

export function conceptGraphFromStorage(): ConceptGraph {
  try {
    const stored = localStorage.getItem(CONCEPT_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as ConceptGraph
  } catch {
    // Fall back to the built-in graph when storage is unavailable or malformed.
  }
  return initialConceptGraph()
}
