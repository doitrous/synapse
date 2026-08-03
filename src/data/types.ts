export interface Subject {
  id: string
  name: string
  short: string
  color: string
}

export type SessionKind = 'Lecture' | 'Seminar' | 'Lab' | 'OSCE' | 'Placement' | 'Self-study'

export interface Session {
  id: string
  title: string
  subjectId: string
  kind: SessionKind
  start: Date
  end: Date
  location: string
  online?: boolean
}

export type ReviewKind = 'Cards' | 'Questions'

export interface ReviewItem {
  id: string
  topic: string
  subjectId: string
  kind: ReviewKind
  count: number
  /** Negative = overdue by N days, 0 = due today. */
  dueInDays: number
  /** Estimated retention strength, 0–100. */
  retention: number
}

export type PlanKind = 'Review' | 'Read' | 'Qbank' | 'Practical'

export interface PlanBlock {
  id: string
  time: string
  title: string
  subjectId: string
  kind: PlanKind
  minutes: number
  done: boolean
}

export type ResourceType = 'Book' | 'Video' | 'Guideline' | 'Deck' | 'Article'

export interface ResourceRef {
  id: string
  title: string
  type: ResourceType
  subjectId: string
  meta: string
  openedLabel: string
}

export interface HeatCell {
  date: Date
  minutes: number
}

export interface Progress {
  examReadiness: number
  examLabel: string
  daysToExam: number
  qbankAnswered: number
  qbankTotal: number
  practicalSigned: number
  practicalTotal: number
}
