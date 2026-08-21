import type { ManagedContentItem } from './contentControl.ts'
import { matchesAnswer } from './answerMatching.ts'

/**
 * A labelling question: an image, and points on it a student must name.
 *
 * This is how anatomy and histology are actually examined here. The Kasr Al
 * Ainy practical papers are largely "identify the structure at the arrow", and
 * the department histology books are plates with numbered pointers. None of it
 * could be recorded, because the bank had no way to express "name this", only
 * "choose between these".
 *
 * A point carries the answer and the other wordings that count as it. That
 * list is the whole of the marking: a student who writes "biceps brachii" for
 * "Biceps" is right, and a marker that refuses them teaches them to distrust it
 * — after which they stop using it.
 */

export interface LabelingPoint {
  id: string
  /** What the paper prints beside the pointer: `1`, `A`, `iii`. */
  marker: string
  /** Where the pointer sits, as a percentage of the image's width and height. */
  x: number
  y: number
  /** The answer as the mark scheme words it. */
  answer: string
  /** Other wordings that count as right — abbreviations, synonyms, spellings. */
  accepts: string[]
}

export interface LabelingPayload {
  imageUrl: string
  /** What the image shows, for a student who cannot see it. */
  altText: string
  points: LabelingPoint[]
}

export interface LabelingQuestionView {
  id: string
  title: string
  subjectId: string
  stem: string
  labeling: LabelingPayload
  learningObjective?: string
  conceptIds?: string[]
}

/**
 * `1 @ 34,58 = Biceps brachii | Biceps | Biceps m.`
 *
 * The marker, where it sits, the answer, and the wordings that also count.
 * Coordinates are percentages so the same point holds wherever the image is
 * rendered — a pixel offset would be wrong on every screen but the author's.
 */
const POINT_LINE = /^\s*([A-Za-z0-9]+)\s*@\s*(\d{1,3}(?:\.\d+)?)\s*,\s*(\d{1,3}(?:\.\d+)?)\s*=\s*(.+)$/

export function parseLabelingPoints(raw: string | undefined): LabelingPoint[] {
  if (!raw?.trim()) return []
  const out: LabelingPoint[] = []
  const seen = new Set<string>()
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    const match = line.match(POINT_LINE)
    if (!match) continue
    const marker = match[1].trim()
    // A repeated marker would put two pins on one number, and only one of them
    // could ever be answered. Keep the first; the validator reports the rest.
    if (seen.has(marker)) continue
    seen.add(marker)
    const [answer, ...accepts] = match[4].split('|').map((part) => part.trim()).filter(Boolean)
    if (!answer) continue
    out.push({
      id: `lp-${marker.toLowerCase()}`,
      marker,
      x: Number(match[2]),
      y: Number(match[3]),
      answer,
      accepts,
    })
  }
  return out
}

export function parseLabeling(
  imageUrl: string | undefined,
  altText: string | undefined,
  points: string | undefined,
): LabelingPayload {
  return {
    imageUrl: imageUrl?.trim() ?? '',
    altText: altText?.trim() ?? '',
    points: parseLabelingPoints(points),
  }
}

/** Marker letters written more than once — each hides the one before it. */
export function duplicateMarkers(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  const seen = new Set<string>()
  const repeated: string[] = []
  for (const line of raw.split('\n')) {
    const match = line.match(POINT_LINE)
    if (!match) continue
    const marker = match[1].trim()
    if (seen.has(marker)) { if (!repeated.includes(marker)) repeated.push(marker) }
    else seen.add(marker)
  }
  return repeated
}

export function labelingErrors(payload: LabelingPayload, rawPoints?: string): string[] {
  const errors: string[] = []

  if (!payload.imageUrl) {
    errors.push('A labelling question needs an image — there is nothing to label without one')
  }
  if (!payload.altText) {
    // The image is the question. A student using a screen reader is told
    // nothing at all without this, so it is required rather than encouraged.
    errors.push('A labelling question needs alt text saying what the image shows')
  }
  if (!payload.points.length) {
    errors.push('A labelling question needs at least one point, written as "1 @ 34,58 = Answer"')
  }

  const repeated = duplicateMarkers(rawPoints)
  for (const marker of repeated) {
    errors.push(`Point ${marker} is written more than once — only the first is shown`)
  }
  const lines = (rawPoints ?? '').split('\n').filter((line) => line.trim()).length
  const unreadable = lines - payload.points.length - repeated.length
  if (unreadable > 0) {
    errors.push(`${unreadable} point line${unreadable === 1 ? '' : 's'} could not be read — write each as "1 @ 34,58 = Answer | Also accepted"`)
  }

  for (const point of payload.points) {
    if (point.x < 0 || point.x > 100 || point.y < 0 || point.y > 100) {
      errors.push(`Point ${point.marker} sits at ${point.x},${point.y} — coordinates are percentages of the image, so both must be between 0 and 100`)
    }
  }
  return errors
}

export function managedLabelingToStudentLabeling(item: ManagedContentItem): LabelingQuestionView | null {
  if (item.kind !== 'question' || item.status !== 'Published') return null
  const data = item.questionData
  if (data?.format !== 'labeling') return null
  const labeling = data.labeling
  if (!labeling?.imageUrl || !labeling.points.length) return null

  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    stem: item.fields.Vignette?.trim() || item.title,
    labeling,
    learningObjective: data.learningObjective?.trim() || undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
  }
}

/**
 * Compare a written answer with the mark scheme.
 *
 * Case, surrounding space and punctuation are ignored, and the anatomical
 * abbreviations a student actually writes are expanded — `n.` to nerve, `m.` to
 * muscle — so "Median n." and "median nerve" are one answer.
 *
 * What this deliberately does **not** do is discard the class word. An earlier
 * version stripped "nerve", "artery" and "muscle" as noise, which made "median
 * nerve" and "median artery" the same string and would have marked a student
 * right for naming a different structure. The class word is frequently the
 * whole of the difference between two answers, and the point of the mark scheme
 * is to tell them apart.
 */
/** Whether what a student wrote counts as this point's answer. */
export function isLabelCorrect(written: string, point: LabelingPoint): boolean {
  return matchesAnswer(written, [point.answer, ...point.accepts])
}

export type LabelingResponse = Record<string, string>

export interface LabelingResult {
  correct: number
  total: number
  byPoint: Record<string, boolean>
  allCorrect: boolean
}

export function markLabeling(
  response: LabelingResponse,
  points: readonly LabelingPoint[],
): LabelingResult {
  const byPoint: Record<string, boolean> = {}
  let correct = 0
  for (const point of points) {
    const right = isLabelCorrect(response[point.id] ?? '', point)
    byPoint[point.id] = right
    if (right) correct += 1
  }
  return { correct, total: points.length, byPoint, allCorrect: points.length > 0 && correct === points.length }
}

export function labelingComplete(response: LabelingResponse, points: readonly LabelingPoint[]): boolean {
  return points.every((point) => (response[point.id] ?? '').trim())
}
