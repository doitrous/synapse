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
  topicIds: string[]
  notes: string
  automaticQuestions: boolean
  automaticPracticals: boolean
  automaticQuestionIds: string[]
  automaticPracticalIds: string[]
  manualQuestionIds: string[]
  manualPracticalIds: string[]
  completed: boolean
}

export type ModuleScheduleStore = Record<string, ModuleScheduleBlock[]>

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
  }
}
