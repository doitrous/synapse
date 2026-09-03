import { API_MODE } from '@/lib/api'
import { newId } from './userLibrary.ts'

export type ReportContentKind = 'question' | 'library article' | 'image'
export type ReportStatus = 'Open' | 'In review' | 'Resolved' | 'Dismissed' | 'Archived'
/** Stamped by the server from the reporter's effective role, never the client. */
export type ReporterRole = 'Student' | 'Reviewer' | 'Admin' | 'Editor' | 'Superadmin'

/** One entry in a report's append-only audit trail. */
export type ReportEventAction =
  | 'created' | 'note' | 'in-review' | 'resolved' | 'dismissed' | 'reopened' | 'archived' | 'unarchived'

export interface ContentReportEvent {
  at: string
  actorId: string | null
  actorName: string
  actorRole: ReporterRole
  action: ReportEventAction
  note?: string
}

export interface ContentReport {
  id: string
  contentKind: ReportContentKind
  contentId: string
  contentTitle: string
  /** Which part of the content the problem is in — a field name or slot. */
  field?: string
  /** A quote or locator that pins the problem inside that content. */
  anchor?: string
  /** A stable copy of the reported content, taken when the report was filed. */
  snapshot?: string
  reporterRole: ReporterRole
  reporterName: string
  /**
   * The account that filed it. An admin acting on a report often needs to reply
   * to the person, and a display name alone cannot be looked up.
   */
  reporterUserId?: string | null
  category: string
  note: string
  status: ReportStatus
  createdAt: string
  /**
   * Append-only history: who did what, when. The server refuses any save that
   * shortens or rewrites it, so a resolved report can be reopened without the
   * record of who resolved it being lost.
   */
  events?: ContentReportEvent[]
  reviewedAt?: string
  reviewedBy?: string
  reviewNote?: string
  archivedAt?: string
  archivedBy?: string
}

export const REPORT_STORAGE_KEY = 'nishany-content-reports-v1'
export const REPORT_TOMBSTONES_KEY = 'nishany-content-report-tombstones-v1'

/** Statuses a reviewer never sees — archived work belongs to editors and above. */
export const REVIEWER_HIDDEN_STATUSES: ReportStatus[] = ['Archived']

export const reportCategories: Record<ReportContentKind, string[]> = {
  question: ['Incorrect answer', 'Unclear wording', 'Outdated guidance', 'Broken attachment', 'Other'],
  'library article': ['Factual issue', 'Outdated guidance', 'Unclear explanation', 'Broken link', 'Other'],
  image: ['Image does not load', 'Poor image quality', 'Incorrect label or annotation', 'Image does not match the question', 'Other'],
}

export const initialContentReports: ContentReport[] = API_MODE ? [] : [
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
  return newId('report')
}
