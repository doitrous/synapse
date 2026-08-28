export type AcademicEvidenceState = 'verified' | 'derived' | 'inferred' | 'conflicted'

export type AcademicSourceCategory =
  | 'official-plan'
  | 'mark-distribution'
  | 'schedule'
  | 'eom-paper'
  | 'eoy-paper'
  | 'resit-paper'
  | 'department-book'
  | 'department-question-bank'
  | 'lecture-file'
  | 'practical-ospe'
  | 'doctor-notes'
  | 'student-notes'
  | 'academy-notes'
  | 'standard-textbook'
  | 'administrative'
  | 'other'

export type AcademicEvidenceRole =
  | 'structure'
  | 'marks'
  | 'schedule'
  | 'exam-signal'
  | 'teaching-truth'
  | 'answer-truth'
  | 'supplement'
  | 'conflict'

export interface AcademicSourceRef {
  id: string
  originalPath: string
  currentPath?: string
  sha256: string
  documentType: string
  locator?: string
  universityId: string
  yearId?: string
  academicCycle?: string
  category: AcademicSourceCategory
  evidenceRole: AcademicEvidenceRole
  evidenceState: AcademicEvidenceState
  confidence: number
}

export interface AcademicProvenance {
  evidenceState: AcademicEvidenceState
  sourceRefs: AcademicSourceRef[]
  notes?: string
}

export function normaliseEvidenceConfidence(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(1, Number(value.toFixed(3))))
}

export function sourceCategoryRank(category: AcademicSourceCategory, role: AcademicEvidenceRole): number {
  if (role === 'structure' || role === 'marks' || role === 'schedule') {
    if (category === 'official-plan' || category === 'mark-distribution' || category === 'schedule') return 100
  }
  if (role === 'exam-signal') {
    if (category === 'eom-paper' || category === 'eoy-paper' || category === 'resit-paper') return 100
  }
  if (role === 'teaching-truth' || role === 'answer-truth') {
    if (category === 'department-book' || category === 'department-question-bank' || category === 'lecture-file') return 90
  }
  if (category === 'doctor-notes' || category === 'student-notes' || category === 'academy-notes') return 30
  if (category === 'standard-textbook') return 20
  return 50
}

export function bestSourceForRole(
  refs: readonly AcademicSourceRef[],
  role: AcademicEvidenceRole,
): AcademicSourceRef | undefined {
  return refs
    .filter((ref) => ref.evidenceRole === role)
    .slice()
    .sort((a, b) => (
      sourceCategoryRank(b.category, role) - sourceCategoryRank(a.category, role)
      || normaliseEvidenceConfidence(b.confidence) - normaliseEvidenceConfidence(a.confidence)
      || a.id.localeCompare(b.id)
    ))[0]
}
