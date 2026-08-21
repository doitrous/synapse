import type { ManagedContentItem } from './contentControl.ts'
import { isWrittenFormat, writtenTotalMarks, type WrittenPart } from './questionFormat.ts'

/**
 * A written question as a student sits it.
 *
 * The bank could only show a question with lettered options, so the written
 * half of a faculty paper — which at Kasr Al Ainy is most of the end-of-year
 * marks — had nowhere to go. This is the student-facing side of the written
 * formats: the parts, their prompts, and the mark scheme each part is marked
 * against.
 *
 * Marking is the student's own, as it already is for essays. Nothing here tries
 * to read prose and decide whether it was right; the mark scheme is shown after
 * an answer is written, and the student ticks what they actually covered. That
 * is what a student does with a past paper and a mark scheme anyway, and it is
 * the only honest thing to do with free text at this point.
 */

export interface WrittenQuestion {
  id: string
  title: string
  subjectId: string
  topic: string
  /** The instruction above the parts — "Answer both parts". */
  stem: string
  parts: WrittenPart[]
  totalMarks: number
  learningObjective?: string
  conceptIds?: string[]
}

/**
 * The student-facing question, or null when it is not one.
 *
 * A written question with no parts is refused for the same reason an essay with
 * no key points is: there would be nothing to mark against, which is the whole
 * of the practice.
 */
export function managedWrittenToStudentWritten(item: ManagedContentItem): WrittenQuestion | null {
  if (item.kind !== 'question' || item.status !== 'Published') return null
  const data = item.questionData
  if (!data?.format || !isWrittenFormat(data.format)) return null
  const parts = data.writtenParts ?? []
  if (!parts.length) return null

  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    topic: data.tags.topic?.trim() || item.fields.Topic?.trim() || 'General',
    stem: item.title,
    parts,
    totalMarks: writtenTotalMarks(parts),
    learningObjective: data.learningObjective?.trim() || undefined,
    // Contextual concepts stay out, as they do for an MCQ: they are mentioned
    // but not assessed, and listing them sends a student to revise something
    // this question never measured.
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
  }
}

/** What the student ticked, per part. */
export type WrittenTicks = Record<string, string[]>

export interface WrittenPartScore {
  partId: string
  label: string
  covered: number
  total: number
  /**
   * Marks earned, apportioned across the part's expected points.
   *
   * A part worth 5 with 4 expected points scores 1.25 per point. Kept
   * fractional rather than rounded per part: rounding each part and then
   * totalling drifts from the paper's own total, and a student comparing their
   * score against the mark on the page needs those to agree.
   */
  marks: number
  outOf: number
}

export interface WrittenScore {
  parts: WrittenPartScore[]
  marks: number
  outOf: number
}

/**
 * Mark a written answer against the scheme, or null when it has not been marked.
 *
 * Null rather than zero, matching essays: a student who has written an answer
 * and not yet marked it has not scored nothing, and "0 of 10" would say they
 * had.
 *
 * Ticks are intersected with the points that currently exist, so editing a
 * question cannot leave an old tick counting toward a point that is gone.
 */
export function markWritten(
  ticks: WrittenTicks | null,
  parts: readonly WrittenPart[],
): WrittenScore | null {
  if (!ticks) return null

  const scored = parts.map((part) => {
    const present = new Set(part.expectedPoints)
    const ticked = (ticks[part.id] ?? []).filter((point) => present.has(point))
    const total = part.expectedPoints.length
    const covered = ticked.length
    // A part with no published mark scheme cannot be marked — it scores
    // nothing rather than full marks, and the total says what was available.
    const marks = total > 0 ? (covered / total) * part.marks : 0
    return { partId: part.id, label: part.label, covered, total, marks, outOf: part.marks }
  })

  return {
    parts: scored,
    marks: scored.reduce((sum, part) => sum + part.marks, 0),
    outOf: scored.reduce((sum, part) => sum + part.outOf, 0),
  }
}

/**
 * Whether every part has been marked.
 *
 * A part with no expected points counts as done — there is nothing to tick, and
 * waiting for a tick that cannot be given would strand the student.
 */
export function writtenFullyMarked(ticks: WrittenTicks | null, parts: readonly WrittenPart[]): boolean {
  if (!ticks) return false
  return parts.every((part) => !part.expectedPoints.length || part.id in ticks)
}

/** Parts in the order they must be answered, given any stated dependencies. */
export function writtenPartsInOrder(parts: readonly WrittenPart[]): WrittenPart[] {
  const byId = new Map(parts.map((part) => [part.id, part]))
  const placed = new Set<string>()
  const out: WrittenPart[] = []

  const place = (part: WrittenPart, seen: Set<string>) => {
    if (placed.has(part.id) || seen.has(part.id)) return
    seen.add(part.id)
    const parent = part.dependsOnPartId ? byId.get(part.dependsOnPartId) : undefined
    if (parent) place(parent, seen)
    if (placed.has(part.id)) return
    placed.add(part.id)
    out.push(part)
  }

  // A dependency cycle would otherwise hang this; `seen` breaks it and the
  // parts fall back to the order the paper listed them in.
  for (const part of parts) place(part, new Set())
  return out
}
