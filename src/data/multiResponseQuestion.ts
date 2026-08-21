import type { AnswerLabel, ManagedContentItem } from './contentControl.ts'

/**
 * A multiple-response question: several options, more than one of them right.
 *
 * The bank could not hold one. Its stored answer is a single option index, and
 * every number built on it — a session's score, the per-subject accuracy, the
 * history of previous tests — assumes exactly one choice per question. A
 * question with three correct options went through that path marked as though
 * only the first counted, so a student who answered it perfectly was told they
 * were wrong. That is why the format was refused at import rather than shown.
 *
 * It gets its own runner instead of widening the bank's answer shape. The
 * bank's single-answer contract is load-bearing for its statistics and for
 * manifests already stored in students' accounts; changing it to support one
 * format would mean migrating all of that. This keeps the bank honest and
 * gives the format somewhere real to live.
 */

export interface MultiResponsePayload {
  /** Labels that are correct. Two or more, or it is a single-best-answer question. */
  correctAnswers: AnswerLabel[]
}

export interface MultiResponseOption {
  label: AnswerLabel
  text: string
  explanation: string
}

export interface MultiResponseQuestionView {
  id: string
  title: string
  subjectId: string
  topic: string
  stem: string
  options: MultiResponseOption[]
  correctAnswers: AnswerLabel[]
  learningObjective?: string
  conceptIds?: string[]
}

const LABELS: AnswerLabel[] = ['A', 'B', 'C', 'D', 'E', 'F']

/**
 * Read the correct answers from a cell.
 *
 * `A | C`, `A, C`, `A C` and `AC` all appear in the corpus, so all four read.
 * Anything that is not a label is ignored rather than guessed at, and the
 * validator reports when fewer survived than were written.
 */
export function parseCorrectAnswers(raw: string | undefined): AnswerLabel[] {
  if (!raw?.trim()) return []
  const out: AnswerLabel[] = []
  for (const character of raw.toUpperCase()) {
    const label = character as AnswerLabel
    if (LABELS.includes(label) && !out.includes(label)) out.push(label)
  }
  return out
}

export function multiResponseErrors(
  correctAnswers: readonly AnswerLabel[],
  answers: readonly { label: AnswerLabel; text: string }[],
): string[] {
  const errors: string[] = []
  const filled = answers.filter((answer) => answer.text.trim())

  if (correctAnswers.length < 2) {
    errors.push('A multiple response question needs at least two correct answers, written as "A | C". With one, it is a single best answer question.')
  }
  if (correctAnswers.length && correctAnswers.length === filled.length) {
    errors.push('Every option is marked correct, so there is nothing to tell apart')
  }
  for (const label of correctAnswers) {
    if (!filled.some((answer) => answer.label === label)) {
      errors.push(`Answer ${label} is marked correct but has no text`)
    }
  }
  return errors
}

export function managedMultiToStudentMulti(item: ManagedContentItem): MultiResponseQuestionView | null {
  if (item.kind !== 'question' || item.status !== 'Published') return null
  const data = item.questionData
  if (data?.format !== 'mcq_multi') return null
  const correctAnswers = data.multiResponse?.correctAnswers ?? []
  const options = data.answers.filter((answer) => answer.text.trim())
  if (correctAnswers.length < 2 || options.length < 2) return null

  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    topic: data.tags.topic?.trim() || item.fields.Topic?.trim() || 'General',
    stem: item.fields.Vignette?.trim() || item.title,
    options: options.map((option) => ({
      label: option.label, text: option.text, explanation: option.explanation,
    })),
    correctAnswers,
    learningObjective: data.learningObjective?.trim() || undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
  }
}

export interface MultiResponseResult {
  /** Right options the student chose. */
  hit: AnswerLabel[]
  /** Wrong options the student chose. */
  falsePositive: AnswerLabel[]
  /** Right options the student left out. */
  missed: AnswerLabel[]
  /** Only when every right option was chosen and no wrong one was. */
  allCorrect: boolean
}

/**
 * Mark a multiple-response attempt.
 *
 * Reported as three lists rather than one score. "Select all that apply" fails
 * in two different ways — choosing something wrong, and leaving something out —
 * and a student who did one needs to know which, because they are different
 * mistakes. A single fraction hides that.
 *
 * `allCorrect` is the exam's own verdict, for the surfaces that need one.
 */
export function markMultiResponse(
  chosen: readonly AnswerLabel[],
  correctAnswers: readonly AnswerLabel[],
): MultiResponseResult {
  const right = new Set(correctAnswers)
  const picked = new Set(chosen)
  const hit = [...picked].filter((label) => right.has(label))
  const falsePositive = [...picked].filter((label) => !right.has(label))
  const missed = [...right].filter((label) => !picked.has(label))
  return {
    hit, falsePositive, missed,
    allCorrect: falsePositive.length === 0 && missed.length === 0 && right.size > 0,
  }
}
