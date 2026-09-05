import { useMemo } from 'react'
import {
  buildExamProgramme, dueReminder, isExamBlock,
  type ExamBlock, type ExamProgramme, type ProgrammeContent,
} from '@/data/examProgramme'
import { DEFAULT_QUESTION_FORMAT, isWrittenFormat } from '@/data/questionFormat'
import { useStudentSchedule } from './useStudentSchedule'
import { useContentManifest, type ManifestRow } from './content'

/**
 * The exam a student is next sitting, and the plan for getting ready for it.
 *
 * The schedule already knew the exam was coming. What it could not do was say
 * what to do about it, so a student who opened the app three weeks out saw the
 * date and nothing else.
 */

/** Stable empty list, so an exam-free timetable does not re-key the manifest every render. */
const EMPTY_IDS: string[] = []

/** Every content id an exam names, in one list — what the manifest is asked about. */
export function examContentIds(exam: ExamBlock): string[] {
  return [...new Set([
    ...(exam.automaticQuestionIds ?? []), ...(exam.manualQuestionIds ?? []),
    ...(exam.automaticWrittenIds ?? []), ...(exam.manualWrittenIds ?? []),
    ...(exam.automaticPracticalIds ?? []), ...(exam.manualPracticalIds ?? []),
    ...(exam.manualArticleIds ?? []), ...(exam.topicIds ?? []),
  ])]
}

/**
 * What the exam covers, resolved from the IDs the admin chose to the content
 * that actually exists and is published.
 *
 * An ID that no longer resolves is dropped rather than carried: a plan that
 * sends a student to a question that has since been unpublished wastes the one
 * thing they are short of.
 *
 * `published` is a manifest — id → kind and format, for the ids this exam names
 * and no others. It used to be the whole content ledger, which is how the
 * dashboard came to download ~60 MB to render a countdown; being *in* the
 * manifest is the publish check, because the server only answers about
 * published content in this student's audience.
 */
export function programmeContentFor(
  exam: ExamBlock,
  published: ReadonlyMap<string, ManifestRow>,
): ProgrammeContent {
  const resolve = (ids: readonly string[] | undefined) =>
    (ids ?? []).filter((id) => published.has(id))

  const chosenQuestions = [...new Set([...resolve(exam.automaticQuestionIds), ...resolve(exam.manualQuestionIds)])]
  const chosenWritten = [...new Set([...resolve(exam.automaticWrittenIds), ...resolve(exam.manualWrittenIds)])]

  // A written question chosen into the question list belongs in the written
  // half of the plan, wherever the admin happened to tick it.
  const isWritten = (id: string) => isWrittenFormat(published.get(id)?.format ?? DEFAULT_QUESTION_FORMAT)

  return {
    questionIds: chosenQuestions.filter((id) => !isWritten(id)),
    writtenIds: [...new Set([...chosenWritten, ...chosenQuestions.filter(isWritten)])],
    practicalIds: [...new Set([...resolve(exam.automaticPracticalIds), ...resolve(exam.manualPracticalIds)])],
    articleIds: [...new Set([...resolve(exam.manualArticleIds), ...resolve(exam.topicIds)])],
  }
}

export interface NextExam {
  exam: ExamBlock
  programme: ExamProgramme | null
  reminder: ReturnType<typeof dueReminder>
  content: ProgrammeContent
}

/**
 * The next exam on this student's timetable, with its plan.
 *
 * Null when there is no exam ahead, which is most of the year and is not a
 * failure — the surfaces that use this render nothing rather than an empty
 * countdown.
 */
export function useNextExam(now: Date = new Date()): NextExam | null {
  const { sessions } = useStudentSchedule()

  const exam = useMemo(() => sessions
    .filter((session) => isExamBlock(session as unknown as ExamBlock))
    .map((session) => session as unknown as ExamBlock)
    .filter((candidate) => {
      const [year, month, day] = candidate.date.split('-').map(Number)
      if (!year) return false
      return new Date(year, month - 1, day).getTime()
        >= new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    })
    .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null, [sessions, now])

  // Only the ids this one exam names, so the dashboard asks about a few dozen
  // records instead of downloading the catalogue.
  const [published] = useContentManifest(useMemo(() => (exam ? examContentIds(exam) : EMPTY_IDS), [exam]))

  return useMemo(() => {
    if (!exam) return null
    const content = programmeContentFor(exam, published)
    return {
      exam,
      content,
      programme: buildExamProgramme(exam, content, now, { policy: exam.reminders }),
      reminder: dueReminder(exam, now, exam.reminders),
    }
  }, [exam, published, now])
}

