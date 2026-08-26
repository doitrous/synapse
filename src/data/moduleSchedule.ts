import { DEFAULT_REMINDER_POLICY } from './examProgramme.ts'
import type { ExamKind, ExamMarkSplit, ExamReminderPolicy } from './examProgramme.ts'
import type { AcademicProvenance, AcademicSourceRef } from './academicSource.ts'

export type ModuleScheduleBlockType =
  | 'lecture'
  | 'practical'
  | 'review'
  | 'midterm'
  | 'midyear'
  | 'term'
  | 'final'
  | 'logbook'

export interface ModuleScheduleBlock {
  id: string
  type: ModuleScheduleBlockType
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  moduleNumber: string
  subjectId?: string
  topicNodeIds?: string[]
  conceptIds?: string[]
  articleIds?: string[]
  resourceIds?: string[]
  assessmentComponentIds?: string[]
  linkState?: 'verified' | 'inferred' | 'ambiguous' | 'conflicted'
  linkNotes?: string
  provenance?: AcademicProvenance
  carryForward?: {
    sourceDate: string
    sourceCycle: string
    carriedForwardFrom: string
    targetCycle: string
    sourceRefs?: AcademicSourceRef[]
  }
  /** Legacy alias retained for schedules saved before typed content links. */
  topicIds: string[]
  notes: string
  automaticQuestions: boolean
  automaticPracticals: boolean
  automaticQuestionIds: string[]
  automaticPracticalIds: string[]
  manualQuestionIds: string[]
  manualPracticalIds: string[]
  completed: boolean

  /*
   * Exam blocks carry more than a lecture does: which sitting they are, how the
   * paper's marks are split, when to remind a student, and the written and
   * reading material the paper covers. They live here rather than in a parallel
   * store so that "what is on this exam" is edited in the one place the exam is
   * created — see `examProgramme.ts`.
   *
   * All optional: a lecture has none of them, and an exam created before this
   * existed still loads.
   */

  /** What the faculty calls the sitting: end of module, end of year, resit. */
  examKind?: ExamKind
  /** How the paper's marks divide. This decides the revision plan's mix. */
  marks?: ExamMarkSplit
  /** When to remind, and when the day-by-day plan opens. */
  reminders?: ExamReminderPolicy
  /** Written questions the paper covers. */
  manualWrittenIds?: string[]
  automaticWrittenIds?: string[]
  automaticWritten?: boolean
  /** Reading the paper covers. */
  manualArticleIds?: string[]
}

export type ModuleScheduleStore = Record<string, ModuleScheduleBlock[]>

export interface ModuleScheduleLinks {
  subjectId?: string
  topicNodeIds: string[]
  conceptIds: string[]
  articleIds: string[]
  resourceIds: string[]
  assessmentComponentIds: string[]
}

export const MODULE_BLOCK_LABEL: Record<ModuleScheduleBlockType, string> = {
  lecture: 'Lecture',
  practical: 'Practical session',
  review: 'Review session',
  midterm: 'Mid-term exam',
  midyear: 'Mid-year exam',
  term: 'Term exam',
  final: 'Final exam',
  logbook: 'Logbook task',
}

export const MODULE_BLOCK_TYPES = Object.entries(MODULE_BLOCK_LABEL) as Array<
  [ModuleScheduleBlockType, string]
>

export const EXAM_BLOCK_TYPES: ModuleScheduleBlockType[] = [
  'midterm',
  'midyear',
  'term',
  'final',
]

export function emptyModuleScheduleBlock(
  date: string,
  type: ModuleScheduleBlockType = 'lecture',
): ModuleScheduleBlock {
  return {
    id: `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title: '',
    date,
    startTime: type === 'logbook' ? '' : '09:00',
    endTime: type === 'logbook' ? '' : '10:00',
    location: '',
    moduleNumber: '',
    topicIds: [],
    notes: '',
    automaticQuestions: true,
    automaticPracticals: true,
    automaticQuestionIds: [],
    automaticPracticalIds: [],
    manualQuestionIds: [],
    manualPracticalIds: [],
    completed: false,
    // An exam starts with reminders on and a plan three weeks out, because the
    // admin who wanted neither can turn them off far more easily than the one
    // who wanted them can discover they existed.
    ...(EXAM_BLOCK_TYPES.includes(type)
      ? {
        examKind: type === 'final' ? 'eoy' as const : 'eom' as const,
        marks: { questions: 0, written: 0, practical: 0 },
        reminders: { ...DEFAULT_REMINDER_POLICY },
        manualWrittenIds: [],
        automaticWrittenIds: [],
        automaticWritten: true,
        manualArticleIds: [],
      }
      : {}),
  }
}

function cleanIds(values: readonly string[] | undefined): string[] {
  return [...new Set((values ?? []).map((value) => value.trim()).filter(Boolean))]
}

export function scheduleLinks(block: Pick<ModuleScheduleBlock,
  'subjectId' | 'topicIds' | 'topicNodeIds' | 'conceptIds' | 'articleIds' | 'resourceIds' | 'assessmentComponentIds'
>): ModuleScheduleLinks {
  const legacy = cleanIds(block.topicIds)
  return {
    subjectId: block.subjectId,
    topicNodeIds: cleanIds([...(block.topicNodeIds ?? []), ...legacy.filter((id) => !/^ART-/i.test(id) && !/^CON-/i.test(id))]),
    conceptIds: cleanIds([...(block.conceptIds ?? []), ...legacy.filter((id) => /^CON-/i.test(id))]),
    articleIds: cleanIds([...(block.articleIds ?? []), ...legacy.filter((id) => /^ART-/i.test(id))]),
    resourceIds: cleanIds(block.resourceIds),
    assessmentComponentIds: cleanIds(block.assessmentComponentIds),
  }
}

export function withScheduleLinks(block: ModuleScheduleBlock, links: Partial<ModuleScheduleLinks>): ModuleScheduleBlock {
  const topicNodeIds = cleanIds(links.topicNodeIds ?? block.topicNodeIds)
  return {
    ...block,
    subjectId: links.subjectId ?? block.subjectId,
    topicNodeIds,
    conceptIds: cleanIds(links.conceptIds ?? block.conceptIds),
    articleIds: cleanIds(links.articleIds ?? block.articleIds),
    resourceIds: cleanIds(links.resourceIds ?? block.resourceIds),
    assessmentComponentIds: cleanIds(links.assessmentComponentIds ?? block.assessmentComponentIds),
    topicIds: topicNodeIds,
  }
}
