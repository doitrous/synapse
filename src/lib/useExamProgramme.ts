import { useMemo } from 'react'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, isStudentPublishable, type ManagedContentItem } from '@/data/contentControl'
import {
  buildExamProgramme, dueReminder, isExamBlock,
  type ExamBlock, type ExamProgramme, type ProgrammeContent,
} from '@/data/examProgramme'
import { DEFAULT_QUESTION_FORMAT, isWrittenFormat } from '@/data/questionFormat'
import { useStudentSchedule } from './useStudentSchedule'
import { usePersistentState } from './usePersistentState'

/**
 * The exam a student is next sitting, and the plan for getting ready for it.
 *
 * The schedule already knew the exam was coming. What it could not do was say
 * what to do about it, so a student who opened the app three weeks out saw the
 * date and nothing else.
 */

/**
 * What the exam covers, resolved from the IDs the admin chose to the content
 * that actually exists and is published.
 *
 * An ID that no longer resolves is dropped rather than carried: a plan that
 * sends a student to a question that has since been unpublished wastes the one
 * thing they are short of.
 */
export function programmeContentFor(
  exam: ExamBlock,
  catalogue: readonly ManagedContentItem[],
): ProgrammeContent {
  const published = new Map(
    catalogue.filter(isStudentPublishable).map((item) => [item.id, item]),
  )
  const resolve = (ids: readonly string[] | undefined) =>
    (ids ?? []).filter((id) => published.has(id))

  const chosenQuestions = [...new Set([...resolve(exam.automaticQuestionIds), ...resolve(exam.manualQuestionIds)])]
  const chosenWritten = [...new Set([...resolve(exam.automaticWrittenIds), ...resolve(exam.manualWrittenIds)])]

  // A written question chosen into the question list belongs in the written
  // half of the plan, wherever the admin happened to tick it.
  const isWritten = (id: string) => {
    const format = published.get(id)?.questionData?.format ?? DEFAULT_QUESTION_FORMAT
    return isWrittenFormat(format)
  }

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
  const [catalogue] = usePersistentState<ManagedContentItem[]>(
    CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  return useMemo(() => {
    const upcoming = sessions
      .filter((session) => isExamBlock(session as unknown as ExamBlock))
      .map((session) => session as unknown as ExamBlock)
      .filter((exam) => {
        const [year, month, day] = exam.date.split('-').map(Number)
        if (!year) return false
        return new Date(year, month - 1, day).getTime()
          >= new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      })
      .sort((a, b) => a.date.localeCompare(b.date))

    const exam = upcoming[0]
    if (!exam) return null

    const content = programmeContentFor(exam, catalogue)
    return {
      exam,
      content,
      programme: buildExamProgramme(exam, content, now, { policy: exam.reminders }),
      reminder: dueReminder(exam, now, exam.reminders),
    }
  }, [sessions, catalogue, now])
}
