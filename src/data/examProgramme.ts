import type { ModuleScheduleBlock } from './moduleSchedule.ts'

/**
 * The block types that are a sitting.
 *
 * Spelled out here rather than imported from `moduleSchedule.ts`, which imports
 * this file for its defaults. A type-only import is erased and harmless; a
 * value import both ways is a real cycle, and the failure it produces —
 * "cannot access before initialisation", from whichever module happens to load
 * second — is a long way from its cause. A test in `examProgramme.test.ts`
 * fails if the two lists ever disagree.
 */
const EXAM_BLOCK_TYPE_NAMES = ['midterm', 'midyear', 'term', 'final'] as const

/**
 * Getting a student ready for a particular exam.
 *
 * The schedule already knew when an exam was and roughly what it covered. What
 * it could not do was turn that into work: a student saw "Final exam, 14 June"
 * on a calendar and was left to decide for themselves what to revise, in what
 * order, and how much of each — which is the part they are worst placed to
 * judge, because it depends on what they already know and on where the marks
 * are.
 *
 * Two things come out of an exam block here. **Reminders**, so the exam does
 * not arrive unannounced. And a **programme**: a day-by-day plan, rebuilt every
 * time it is read, that mixes questions, written answers and practical work in
 * the proportion the paper actually marks them.
 *
 * That last point is the one worth stating plainly. A Kasr Al Ainy module is
 * examined written *and* practical, and the split is not even — `101 ISK`
 * carries different marks for each. A revision plan that is all MCQs because
 * MCQs are what the bank holds most of prepares a student for an exam nobody is
 * setting. The mix follows the marks.
 */

/** What a faculty calls the sitting, in its own words rather than ours. */
export const EXAM_KINDS = ['eom', 'eoy', 'baqoon', 'other'] as const
export type ExamKind = (typeof EXAM_KINDS)[number]

export const EXAM_KIND_LABEL: Record<ExamKind, string> = {
  eom: 'End of module',
  eoy: 'End of year',
  baqoon: 'Resit (Baqoon)',
  other: 'Other',
}

/**
 * How the paper's marks are split.
 *
 * The proportions here decide the proportions of the revision plan, so this is
 * not decoration — it is the instruction. Zero in a column means the paper does
 * not examine that way and the plan should contain none of it.
 */
export interface ExamMarkSplit {
  /** Single-best-answer and the other option formats. */
  questions: number
  /** Written papers: short answer, structured, essay. */
  written: number
  /** Practical: OSCE, specimens, slides, interpretation. */
  practical: number
}

export const EMPTY_MARK_SPLIT: ExamMarkSplit = { questions: 0, written: 0, practical: 0 }

/**
 * When to remind a student, in days before the exam.
 *
 * Defaults chosen so the first one lands while there is still time to change
 * anything — a reminder that arrives the night before is an announcement, not a
 * reminder. Every number is editable by an admin.
 */
export interface ExamReminderPolicy {
  enabled: boolean
  /** Days before the exam on which to send one. */
  leadDays: number[]
  /** When the day-by-day programme starts appearing. */
  programmeStartsDaysBefore: number
  /**
   * Whether to say nothing on the day itself.
   *
   * On by default. A student sitting the paper in three hours cannot act on
   * anything the app says, and telling them what they have not covered is
   * unkind rather than useful.
   */
  quietOnExamDay: boolean
}

export const DEFAULT_REMINDER_POLICY: ExamReminderPolicy = {
  enabled: true,
  leadDays: [21, 14, 7, 3, 1],
  programmeStartsDaysBefore: 21,
  quietOnExamDay: true,
}

/** Everything an exam block adds beyond an ordinary schedule block. */
export interface ExamBlockExtras {
  examKind?: ExamKind
  marks?: ExamMarkSplit
  reminders?: ExamReminderPolicy
  /** Written questions this exam covers, chosen by the admin. */
  manualWrittenIds?: string[]
  automaticWrittenIds?: string[]
  /** Reading this exam covers. */
  manualArticleIds?: string[]
}

export type ExamBlock = ModuleScheduleBlock & ExamBlockExtras

export { EXAM_BLOCK_TYPE_NAMES }

/** Whether a schedule block is an exam at all. */
export function isExamBlock(block: ModuleScheduleBlock): boolean {
  return (EXAM_BLOCK_TYPE_NAMES as readonly string[]).includes(block.type)
}

/** Whole days from `today` to the exam. Negative once it has passed. */
export function daysUntil(examDate: string, today: Date): number {
  const [year, month, day] = examDate.split('-').map(Number)
  if (!year || !month || !day) return Number.NaN
  const exam = new Date(year, month - 1, day)
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((exam.getTime() - now.getTime()) / 86_400_000)
}

export interface DueReminder {
  examId: string
  title: string
  daysAway: number
  /** The lead day this fired for, so the same one cannot fire twice. */
  leadDay: number
}

/**
 * The reminder due today for one exam, if any.
 *
 * Exactly one, not a backlog. A student who opens the app after a week away
 * should be told the exam is in seven days, not handed the fourteen-day and
 * twenty-one-day reminders as well — those were true and are not now.
 */
export function dueReminder(
  exam: ExamBlock,
  today: Date,
  policy: ExamReminderPolicy = DEFAULT_REMINDER_POLICY,
): DueReminder | null {
  if (!policy.enabled) return null
  if (!isExamBlock(exam)) return null
  const away = daysUntil(exam.date, today)
  if (!Number.isFinite(away) || away < 0) return null
  if (away === 0 && policy.quietOnExamDay) return null

  // The tightest lead day that has been reached. Passing 14 with no reminder
  // sent still means "14 days" is the right thing to say at 13.
  const reached = policy.leadDays.filter((day) => away <= day).sort((a, b) => a - b)[0]
  if (reached === undefined) return null
  return { examId: exam.id, title: exam.title || EXAM_KIND_LABEL[exam.examKind ?? 'other'], daysAway: away, leadDay: reached }
}

/** Whether the day-by-day programme should be offered yet. */
export function programmeIsOpen(
  exam: ExamBlock,
  today: Date,
  policy: ExamReminderPolicy = DEFAULT_REMINDER_POLICY,
): boolean {
  const away = daysUntil(exam.date, today)
  if (!Number.isFinite(away) || away < 0) return false
  return away <= policy.programmeStartsDaysBefore
}

/* ---- the programme ------------------------------------------------------ */

export type StudyKind = 'questions' | 'written' | 'practical' | 'reading'

export interface ProgrammeItem {
  kind: StudyKind
  /** Content IDs to work through, in the order they should be met. */
  itemIds: string[]
  minutes: number
}

export interface ProgrammeDay {
  /** `YYYY-MM-DD`. */
  date: string
  daysBefore: number
  items: ProgrammeItem[]
  /** The last days before a paper are for going back over, not meeting new work. */
  isConsolidation: boolean
}

export interface ExamProgramme {
  examId: string
  examTitle: string
  examDate: string
  daysAway: number
  days: ProgrammeDay[]
  /** What share of the plan each kind takes, after the marks decided it. */
  mix: Record<StudyKind, number>
}

export interface ProgrammeContent {
  questionIds: string[]
  writtenIds: string[]
  practicalIds: string[]
  articleIds: string[]
}

/**
 * What proportion of the plan each kind of work should take.
 *
 * Derived from the marks, so a paper marked 60 written and 20 practical gets a
 * plan that is three parts written to one part practical. A kind the paper does
 * not examine gets none, however much content exists for it — content the
 * student is not being examined on is not revision, it is a distraction with a
 * deadline.
 *
 * Reading is not marked, so it takes a fixed small share out of the total: a
 * student who has never read the material cannot answer questions on it, and a
 * plan that is all questions from day one teaches them only that they do not
 * know it yet.
 */
export const READING_SHARE = 0.2

export function programmeMix(marks: ExamMarkSplit, available: ProgrammeContent): Record<StudyKind, number> {
  const examined: Array<[StudyKind, number]> = [
    ['questions', available.questionIds.length ? marks.questions : 0],
    ['written', available.writtenIds.length ? marks.written : 0],
    ['practical', available.practicalIds.length ? marks.practical : 0],
  ]
  const total = examined.reduce((sum, [, value]) => sum + value, 0)
  const reading = available.articleIds.length ? READING_SHARE : 0

  if (total <= 0) {
    // Nothing says how this paper is marked. An even split across whatever
    // content exists is a guess, but it is a legible one and it beats showing
    // only whichever kind happens to be most numerous.
    const kinds = examined.filter(([kind]) => available[`${kind === 'questions' ? 'question' : kind}Ids` as keyof ProgrammeContent]?.length)
    const share = kinds.length ? (1 - reading) / kinds.length : 0
    return {
      questions: kinds.some(([k]) => k === 'questions') ? share : 0,
      written: kinds.some(([k]) => k === 'written') ? share : 0,
      practical: kinds.some(([k]) => k === 'practical') ? share : 0,
      reading,
    }
  }

  const scale = 1 - reading
  return {
    questions: (examined[0][1] / total) * scale,
    written: (examined[1][1] / total) * scale,
    practical: (examined[2][1] / total) * scale,
    reading,
  }
}

/** `YYYY-MM-DD` for a date offset from another, in local time. */
function isoDate(from: Date, addDays: number): string {
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + addDays)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Spread a list across `slots` buckets, keeping order and losing nothing. */
function deal<T>(items: readonly T[], slots: number): T[][] {
  const out: T[][] = Array.from({ length: Math.max(1, slots) }, () => [])
  items.forEach((item, index) => { out[index % out.length].push(item) })
  return out
}

export interface ProgrammeOptions {
  minutesPerDay?: number
  /** Days at the end kept for going back over what is still weak. */
  consolidationDays?: number
  /** Concepts the student is weak on, so their content is met earlier. */
  weakConceptIds?: readonly string[]
  policy?: ExamReminderPolicy
}

/**
 * Build the day-by-day plan for one exam.
 *
 * Rebuilt on every read rather than stored. A plan is a function of the time
 * left and what the student has done since, and a stored one is out of date the
 * first time they answer anything — the commonest way a revision planner loses
 * a student's trust is by still telling them to do work they finished
 * yesterday.
 */
export function buildExamProgramme(
  exam: ExamBlock,
  content: ProgrammeContent,
  today: Date,
  options: ProgrammeOptions = {},
): ExamProgramme | null {
  const {
    minutesPerDay = 90,
    consolidationDays = 2,
    policy = exam.reminders ?? DEFAULT_REMINDER_POLICY,
  } = options

  if (!isExamBlock(exam)) return null
  const away = daysUntil(exam.date, today)
  if (!Number.isFinite(away) || away < 0) return null
  if (!programmeIsOpen(exam, today, policy)) return null

  const mix = programmeMix(exam.marks ?? EMPTY_MARK_SPLIT, content)
  // The exam day itself is not a study day, so a paper tomorrow leaves one.
  const studyDays = Math.max(1, away)
  const consolidation = Math.min(consolidationDays, Math.max(0, studyDays - 1))
  const newWorkDays = Math.max(1, studyDays - consolidation)

  const byKind: Record<StudyKind, string[]> = {
    questions: content.questionIds,
    written: content.writtenIds,
    practical: content.practicalIds,
    reading: content.articleIds,
  }

  // Reading first within a day, then questions, then written, then practical —
  // read it, then check you know it, then write it out, then do it.
  const ORDER: StudyKind[] = ['reading', 'questions', 'written', 'practical']
  const dealt: Partial<Record<StudyKind, string[][]>> = {}
  for (const kind of ORDER) dealt[kind] = deal(byKind[kind], newWorkDays)

  const days: ProgrammeDay[] = []
  for (let offset = 0; offset < studyDays; offset++) {
    const daysBefore = studyDays - offset
    const isConsolidation = offset >= newWorkDays
    const items: ProgrammeItem[] = []

    for (const kind of ORDER) {
      const share = mix[kind]
      if (share <= 0) continue
      const minutes = Math.round(minutesPerDay * share)
      if (minutes <= 0) continue
      const itemIds = isConsolidation
        // Consolidation revisits everything of that kind rather than dealing
        // out new work there is no longer time to meet.
        ? byKind[kind]
        : (dealt[kind]?.[offset] ?? [])
      if (!itemIds.length) continue
      items.push({ kind, itemIds, minutes })
    }

    days.push({ date: isoDate(today, offset), daysBefore, items, isConsolidation })
  }

  return {
    examId: exam.id,
    examTitle: exam.title || EXAM_KIND_LABEL[exam.examKind ?? 'other'],
    examDate: exam.date,
    daysAway: away,
    days,
    mix,
  }
}

/**
 * Content the exam covers that nothing has been authored for.
 *
 * For the admin, not the student. An exam block that names five topics and has
 * no written questions against any of them will produce a plan with no written
 * work in it, however the marks are split — and the admin needs to know that is
 * why, rather than discovering it from a student.
 */
export function programmeGaps(exam: ExamBlock, content: ProgrammeContent): string[] {
  const gaps: string[] = []
  const marks = exam.marks ?? EMPTY_MARK_SPLIT
  if (marks.questions > 0 && !content.questionIds.length) {
    gaps.push(`${marks.questions} marks of questions, and no question is attached to this exam`)
  }
  if (marks.written > 0 && !content.writtenIds.length) {
    gaps.push(`${marks.written} marks of written, and no written question is attached to this exam`)
  }
  if (marks.practical > 0 && !content.practicalIds.length) {
    gaps.push(`${marks.practical} marks of practical, and no practical is attached to this exam`)
  }
  if (!content.articleIds.length) {
    gaps.push('no reading is attached, so the plan can only test, never teach')
  }
  return gaps
}
