import type { ManagedContentItem } from './contentControl.ts'

/** A point that carries a mark. */
export interface EssayKeyPoint {
  id: string
  text: string
  /**
   * One of the words an examiner scans for — a diagnosis, an enzyme, an
   * organism. Flagged on the point rather than kept as a separate list,
   * because it is always one of the points that carries a mark, and two
   * fields saying the same thing eventually disagree.
   */
  legible?: boolean
}

export interface EssayAuthoringData {
  prompt: string
  keyPoints: EssayKeyPoint[]
  examinerNote: string
  modelAnswer: string
}

export interface EssayQuestion {
  id: string
  title: string
  subjectId: string
  prompt: string
  keyPoints: EssayKeyPoint[]
  examinerNote: string
  modelAnswer: string
}

/** A leading `!` marks a point to write legibly. */
const LEGIBLE_MARKER = '!'

/** One point per line, because that is how an author lists them. */
export function parseKeyPoints(value = ''): EssayKeyPoint[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const legible = line.startsWith(LEGIBLE_MARKER)
      return {
        id: `kp-${index}-${line.slice(0, 24).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`,
        text: legible ? line.slice(LEGIBLE_MARKER.length).trim() : line,
        ...(legible ? { legible: true } : {}),
      }
    })
}

/**
 * How much of the answer was there, or null when it has not been marked.
 *
 * Null rather than zero: a student who has written an answer and not yet
 * marked it has not scored nothing, and showing "0 of 6" would say they did.
 *
 * Ticks are intersected with the points that currently exist, so editing a
 * question cannot leave an old tick counting toward a point that is gone.
 */
export function coveredCount(
  ticked: string[] | null,
  pointIds: string[],
): { covered: number; total: number } | null {
  if (!ticked) return null
  const present = new Set(pointIds)
  return { covered: ticked.filter((id) => present.has(id)).length, total: pointIds.length }
}

/**
 * The student-facing question, or null when it is not one.
 *
 * An essay with no key points is refused: there would be nothing to mark
 * yourself against, which is the whole of the practice.
 */
export function managedEssayToStudentEssay(item: ManagedContentItem): EssayQuestion | null {
  if (item.kind !== 'essay' || item.status !== 'Published') return null
  const data = item.essayData
  if (!data || !data.prompt.trim() || !data.keyPoints.length) return null
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    prompt: data.prompt,
    keyPoints: data.keyPoints,
    examinerNote: data.examinerNote,
    modelAnswer: data.modelAnswer,
  }
}

/** What a saved answer says about where the student had got to. */
export interface SavedProgress {
  ticked?: string[] | null
  revealed?: boolean
}

/**
 * Which stage a question reopens on.
 *
 * The one decision that guards the reveal rule, so it is stated here where it
 * can be tested rather than inline in the component. Getting it wrong in the
 * permissive direction shows a student the model answer to a question they
 * have not attempted, which is the whole thing this surface exists to prevent.
 *
 * `revealed` is the fact; the fallback to `ticked != null` is only for answers
 * written before that field existed, and it errs the same way — a student who
 * has ticked something has certainly already seen the helpers.
 */
export function initialStage(saved: SavedProgress | undefined): 'write' | 'revealed' {
  if (!saved) return 'write'
  if (saved.revealed !== undefined) return saved.revealed ? 'revealed' : 'write'
  return saved.ticked != null ? 'revealed' : 'write'
}
