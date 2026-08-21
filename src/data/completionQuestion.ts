import type { ManagedContentItem } from './contentControl.ts'
import { matchesAnswer } from './answerMatching.ts'

/**
 * A completion question: a sentence with words taken out of it.
 *
 * The department books set these constantly — "the SA node is supplied by the
 * ______ artery in 60% of hearts" — and they are not MCQs with the options
 * hidden. A blank asks a student to produce the term; the same item as four
 * lettered options asks them to recognise it, which is a different and much
 * easier thing.
 *
 * The blanks are written inline, in the sentence, rather than as a separate
 * numbered list beneath it. A list is one more thing to keep in step: renumber
 * the sentence and the answers stop lining up, silently, and every blank after
 * the mistake is marked against the wrong word.
 */

export interface CompletionBlank {
  id: string
  /** The answer as the mark scheme words it. */
  answer: string
  /** Other wordings that count as right. */
  accepts: string[]
}

/** A sentence as alternating prose and blanks, in the order they are read. */
export type CompletionSegment =
  | { kind: 'text'; text: string }
  | { kind: 'blank'; blank: CompletionBlank }

export interface CompletionPayload {
  segments: CompletionSegment[]
  blanks: CompletionBlank[]
}

export interface CompletionQuestionView {
  id: string
  title: string
  subjectId: string
  stem: string
  completion: CompletionPayload
  learningObjective?: string
  conceptIds?: string[]
}

/** `[[right coronary|RCA]]` — the answer, then anything else that counts. */
const BLANK = /\[\[([^\]]+)\]\]/g

/**
 * Read a sentence with `[[answers]]` in it.
 *
 * The prose between blanks is kept as written, including its spacing, because
 * it is the sentence the student reads and re-flowing it would change where the
 * gaps fall.
 */
export function parseCompletion(raw: string | undefined): CompletionPayload {
  const segments: CompletionSegment[] = []
  const blanks: CompletionBlank[] = []
  if (!raw?.trim()) return { segments, blanks }

  let cursor = 0
  let index = 0
  for (const match of raw.matchAll(BLANK)) {
    const at = match.index ?? 0
    if (at > cursor) segments.push({ kind: 'text', text: raw.slice(cursor, at) })
    const [answer, ...accepts] = match[1].split('|').map((part) => part.trim()).filter(Boolean)
    if (answer) {
      const blank: CompletionBlank = { id: `cb-${index}`, answer, accepts }
      blanks.push(blank)
      segments.push({ kind: 'blank', blank })
      index += 1
    }
    cursor = at + match[0].length
  }
  if (cursor < raw.length) segments.push({ kind: 'text', text: raw.slice(cursor) })
  return { segments, blanks }
}

export function completionErrors(payload: CompletionPayload, raw?: string): string[] {
  const errors: string[] = []
  if (!payload.blanks.length) {
    errors.push('A completion question needs at least one blank, written as [[the answer]]')
  }
  if (!payload.segments.some((segment) => segment.kind === 'text' && segment.text.trim())) {
    errors.push('A completion question needs a sentence around its blanks — a blank on its own asks nothing')
  }
  // An unclosed bracket would swallow the rest of the sentence into prose and
  // quietly lose every blank after it.
  const opens = (raw?.match(/\[\[/g) ?? []).length
  const closes = (raw?.match(/\]\]/g) ?? []).length
  if (opens !== closes) {
    errors.push(`${opens} "[[" and ${closes} "]]" — every blank needs both, or the rest of the sentence is read as prose`)
  }
  const empty = (raw?.match(/\[\[\s*\]\]/g) ?? []).length
  if (empty) errors.push(`${empty} blank${empty === 1 ? ' has' : 's have'} no answer inside the brackets`)
  return errors
}

export function managedCompletionToStudentCompletion(item: ManagedContentItem): CompletionQuestionView | null {
  if (item.kind !== 'question' || item.status !== 'Published') return null
  const data = item.questionData
  if (data?.format !== 'completion') return null
  const completion = data.completion
  if (!completion?.blanks.length) return null

  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    stem: item.fields.Vignette?.trim() || item.title,
    completion,
    learningObjective: data.learningObjective?.trim() || undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
  }
}

export type CompletionResponse = Record<string, string>

export interface CompletionResult {
  correct: number
  total: number
  byBlank: Record<string, boolean>
  allCorrect: boolean
}

/** Marked with the same leniency as a labelled plate — see `answerMatching.ts`. */
export function markCompletion(
  response: CompletionResponse,
  blanks: readonly CompletionBlank[],
): CompletionResult {
  const byBlank: Record<string, boolean> = {}
  let correct = 0
  for (const blank of blanks) {
    const right = matchesAnswer(response[blank.id] ?? '', [blank.answer, ...blank.accepts])
    byBlank[blank.id] = right
    if (right) correct += 1
  }
  return { correct, total: blanks.length, byBlank, allCorrect: blanks.length > 0 && correct === blanks.length }
}

export function completionComplete(response: CompletionResponse, blanks: readonly CompletionBlank[]): boolean {
  return blanks.every((blank) => (response[blank.id] ?? '').trim())
}
