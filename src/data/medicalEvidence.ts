/**
 * Canonical evidence records shared by articles, concepts and relationships.
 * Stable IDs and text hashes survive Markdown reflow; visible line numbers are
 * only a convenience and are never treated as durable evidence locators.
 */
export const MEDICAL_EVIDENCE_STORAGE_KEY = 'nishany-medical-evidence-v1'
export const MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY = 'nishany-medical-evidence-published-v1'

export type VerificationState = 'verified' | 'needs_evidence' | 'conflicted' | 'excluded'
export type MedicalRiskClass = 'foundational' | 'clinical' | 'time_sensitive' | 'treatment' | 'procedure' | 'emergency'

export interface EvidenceClaim {
  id: string
  conceptId: string
  subject: string
  predicate: string
  object: string
  qualifiers: Record<string, string | number | boolean | string[]>
  displayText: string
  riskClass: MedicalRiskClass | string
  verificationStatus: VerificationState
  conflictStatus: string
  confidence: number
  freshness: string
  timeSensitive: boolean
  reviewDue?: string | null
  citationIds: string[]
}

export interface EvidenceLocator {
  type?: 'page' | 'printed_page' | 'section' | 'line' | 'span' | 'bounding_box' | 'timestamp' | string
  page?: number | string
  printed_page?: number | string
  section?: string
  line?: string
  span?: string
  bounding_box?: number[]
  timestamp?: string
  [key: string]: unknown
}

export interface CitationLink {
  id: string
  claimId: string
  resourceId: string
  evidenceRole: string
  locator: EvidenceLocator | string
  supportSpan: string
  contextNote?: string
  confidence: number
  countsAsClaimEvidence: boolean
}

export interface ResourceRecord {
  id: string
  institution: string
  collectionId?: string
  collectionPriority?: number
  title: string
  /** Authenticated storage key. Never an absolute path from the authoring machine. */
  storageKey?: string
  sourceRelativePath?: string
  sourceUri?: string
  mediaType?: string
  languages: string[]
  publicationDate?: string | null
  pageCount?: number | null
  sha256?: string
  processingStatus: string
  rights?: Record<string, unknown> | string
  validation?: Record<string, unknown>
  confidence: number
  isAssessment?: boolean
  qualification?: string
  accessedAt?: string | null
}

export interface ArticleSpan {
  id: string
  articleId: string
  sectionId: string
  textHash: string
  currentLine?: number | null
  text?: string
  claimIds: string[]
  citationIds: string[]
}

export interface MergeRecord {
  id: string
  retainedConceptId: string
  mergedCandidateIds: string[]
  rule: string
  timestamp: string
  reversible: boolean
  lineage: unknown[]
}

export interface CoverageRecord {
  sourceId: string
  candidateId: string
  canonicalConceptId?: string | null
  decision: string
  reason: string
}

export interface MedicalEvidenceStore {
  schemaVersion: string
  generatedAt: string
  claims: EvidenceClaim[]
  citations: CitationLink[]
  resources: ResourceRecord[]
  articleSpans: ArticleSpan[]
  merges: MergeRecord[]
  coverage: CoverageRecord[]
}

export const emptyMedicalEvidenceStore = (): MedicalEvidenceStore => ({
  schemaVersion: '1.0.0',
  generatedAt: new Date(0).toISOString(),
  claims: [],
  citations: [],
  resources: [],
  articleSpans: [],
  merges: [],
  coverage: [],
})
