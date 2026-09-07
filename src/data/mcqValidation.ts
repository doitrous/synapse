export type AssignmentStatus = 'assigned' | 'started' | 'completed'
export type CurriculumRelevance = 'taught' | 'not_taught' | 'uncertain'
export type IssueCategory = 'unclear_wording' | 'multiple_plausible_answers' | 'incorrect_answer_key' | 'wrong_curriculum_placement' | 'outdated_or_incomplete'
export type SourceType = 'curriculum_map' | 'schedule' | 'supporting_source'

export const ISSUE_LABEL: Record<IssueCategory, string> = {
  unclear_wording: 'Unclear wording',
  multiple_plausible_answers: 'Multiple plausible answers',
  incorrect_answer_key: 'Incorrect answer key',
  wrong_curriculum_placement: 'Wrong curriculum placement',
  outdated_or_incomplete: 'Outdated or incomplete',
}

export const RELEVANCE_LABEL: Record<CurriculumRelevance, string> = {
  taught: 'Taught',
  not_taught: 'Not taught',
  uncertain: 'Uncertain',
}

export interface ValidationAssignment {
  assignmentId: string
  batchId: string
  title: string
  universityId: string
  academicYear: string | null
  yearId: string | null
  term: string | null
  moduleId: string | null
  moduleName: string | null
  subjectId: string | null
  subjectName: string | null
  status: AssignmentStatus
  assignedAt: string
  startedAt: string | null
  completedAt: string | null
  dueAt: string | null
  questionCount: number
  submittedCount: number
}

export interface ValidationSubmission {
  id: string
  assignmentId: string
  batchId: string
  questionId: string
  selectedAnswer: string
  confidence: number
  timeSeconds: number
  curriculumRelevance: CurriculumRelevance
  issueCategory: IssueCategory | null
  suggestedCorrection: string | null
  evidenceText: string | null
  evidenceUrl: string | null
  sourceId: string | null
  submittedAt: string
}

export interface ValidationSource {
  id: string
  assignmentId: string | null
  sourceType: SourceType
  title: string
  fileName: string | null
  mimeType: string | null
  sizeBytes: number
  sourceUrl: string | null
  uploadedAt: string
}

export interface ValidatorWorkspaceData {
  totals: { assigned: number; started: number; completed: number; questions: number; submitted: number }
  assignments: ValidationAssignment[]
  submissions: ValidationSubmission[]
  sources: ValidationSource[]
}

export interface BlindQuestion {
  id: string
  stem: string | null
  vignette: string | null
  leadIn: string | null
  subjectId: string | null
  topic: string | null
  format: string
  attachedImage: string | null
  attachments: Array<{ id: string; type: 'image' | 'audio' | 'video'; name: string; url: string; mimeType?: string; size?: number }>
  media: Array<{ id: string; mediaId: string; slot: string; answerLabel?: string | null; caption?: string | null }>
  mediaRecords: Array<{ id: string; type: 'image' | 'audio' | 'video'; name: string; url: string; mimeType?: string; size?: number; altText?: string }>
  answers: Array<{ label: string; text: string }>
}

export interface ValidatorBatchData {
  assignment: ValidationAssignment
  questions: Array<{ questionId: string; ordinalNo: number; question: BlindQuestion; submitted: boolean; submittedAt: string | null }>
}

export interface ValidationSetup {
  validators: Array<{ id: string; name: string; email: string | null; universityId: string | null; year: string | null; yearId: string | null }>
  batches: Array<Record<string, string | number | null>>
}

export interface MetricRow {
  id: string
  label: string
  attempted: number
  accuracy: number
  averageConfidence: number
  averageTimeSeconds: number
}

export interface CompletionRow { id: string; label: string; assigned: number; completed: number; completionRate: number }

export interface ValidationAnalyticsData {
  summary: {
    totalValidators: number
    validatorsByUniversity: Array<{ universityId: string; validators: number }>
    batches: Record<AssignmentStatus, number>
    completionRate: number
    questionsAttempted: number
    uniqueQuestionsAttempted: number
    accuracy: number
    averageConfidence: number
    averageTimeSeconds: number
    relevance: Record<CurriculumRelevance, number>
    flags: Record<IssueCategory, number>
  }
  completion: { byValidator: CompletionRow[]; byUniversity: CompletionRow[] }
  accuracy: {
    byValidator: MetricRow[]; byUniversity: MetricRow[]; byYear: MetricRow[]
    byTerm: MetricRow[]; byModule: MetricRow[]; bySubject: MetricRow[]
  }
  agreement: Array<{
    universityId: string; questionId: string; validatorCount: number; answerAgreement: number
    disagreement: boolean; answerDistribution: Record<string, number>; relevanceDistribution: Record<string, number>
  }>
  reviewQueue: Array<{
    id: string; questionId: string; batchId: string; batchTitle: string; validatorId: string; validatorName: string
    universityId: string; academicYear: string | null; term: string | null; moduleName: string | null; subjectName: string | null
    selectedAnswer: string; isCorrect: boolean; confidence: number; timeSeconds: number
    curriculumRelevance: CurriculumRelevance; issueCategory: IssueCategory
    suggestedCorrection: string | null; evidenceText: string | null; evidenceUrl: string | null; sourceId: string | null; submittedAt: string
  }>
}
