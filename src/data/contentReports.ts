export type ReportContentKind = 'question' | 'library article' | 'image'
export type ReportStatus = 'Open' | 'In review' | 'Resolved' | 'Dismissed'
export type ReporterRole = 'Student' | 'Admin'

export interface ContentReport {
  id: string
  contentKind: ReportContentKind
  contentId: string
  contentTitle: string
  reporterRole: ReporterRole
  reporterName: string
  category: string
  note: string
  status: ReportStatus
  createdAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNote?: string
}

export const REPORT_STORAGE_KEY = 'osler-content-reports-v1'

export const reportCategories: Record<ReportContentKind, string[]> = {
  question: ['Incorrect answer', 'Unclear wording', 'Outdated guidance', 'Broken attachment', 'Other'],
  'library article': ['Factual issue', 'Outdated guidance', 'Unclear explanation', 'Broken link', 'Other'],
  image: ['Image does not load', 'Poor image quality', 'Incorrect label or annotation', 'Image does not match the question', 'Other'],
}

export const initialContentReports: ContentReport[] = [
  {
    id: 'report-seed-1',
    contentKind: 'question',
    contentId: 'q3',
    contentTitle: 'Which finding most strongly supports acute pulmonary oedema?',
    reporterRole: 'Student',
    reporterName: 'Maya Chen',
    category: 'Unclear wording',
    note: 'Two options seem plausible unless the question specifies whether the patient has already received oxygen.',
    status: 'Open',
    createdAt: new Date(2026, 7, 3, 9, 20).toISOString(),
  },
]

export function newReportId() {
  return `report-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
