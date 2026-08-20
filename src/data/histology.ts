import type { ManagedContentItem } from './contentControl.ts'

/**
 * The objectives a teaching microscope actually carries.
 *
 * Fixed rather than free-form because the turret is a control with one button
 * per objective, and because "find it at low power, confirm at high power" is
 * the method being taught — an arbitrary magnification would not mean anything
 * to a student sitting a spotter exam.
 */
export const OBJECTIVES = [4, 10, 40] as const
export type Objective = (typeof OBJECTIVES)[number]

export interface SlideView {
  objective: Objective
  /** A stored media reference, resolved exactly as question attachments are. */
  image: string
}

export interface SlideStructure {
  id: string
  label: string
  /**
   * Where the pin sits, per objective, as a fraction of the image.
   *
   * Fractions because a pixel offset breaks the moment the image is rendered at
   * any other size. Per objective because 4× and 40× are different fields, not
   * the same picture scaled — a structure is usually somewhere else entirely,
   * if it is on screen at all.
   */
  at: Partial<Record<Objective, { x: number; y: number }>>
  note?: string
}

export interface HistologySlide {
  id: string
  title: string
  subjectId: string
  tissue: string
  stain: string
  views: SlideView[]
  structures: SlideStructure[]
  description?: string
}

/** What the admin editor stores on the ledger item. */
export interface HistologyAuthoringData {
  tissue: string
  stain: string
  views: SlideView[]
  structures: SlideStructure[]
}

/** A pin dropped outside the image would render off the field of view. */
export function clampPin(point: { x: number; y: number }): { x: number; y: number } {
  return { x: Math.min(1, Math.max(0, point.x)), y: Math.min(1, Math.max(0, point.y)) }
}

/** The objectives this slide actually has an image for, low power first. */
export function objectivesOf(slide: Pick<HistologySlide, 'views'>): Objective[] {
  return OBJECTIVES.filter((objective) => slide.views.some((view) => view.objective === objective))
}

/**
 * Where a slide opens.
 *
 * The lowest power it has, because that is where you orient yourself. Opening
 * at 40× drops the student into a field with no landmarks.
 */
export function openingObjective(slide: Pick<HistologySlide, 'views'>): Objective | null {
  return objectivesOf(slide)[0] ?? null
}

/** The structures pinned at this objective — the others are not on this field. */
export function structuresAt(
  slide: Pick<HistologySlide, 'structures'>,
  objective: Objective,
): SlideStructure[] {
  return slide.structures.filter((structure) => Boolean(structure.at[objective]))
}

/**
 * The student-facing slide, or null when it is not one.
 *
 * A slide with no image cannot be looked at, so it is refused here rather than
 * reaching the viewer and rendering an empty eyepiece.
 */
export function managedSlideToStudentSlide(item: ManagedContentItem): HistologySlide | null {
  if (item.kind !== 'histology' || item.status !== 'Published') return null
  const data = item.histologyData
  if (!data) return null
  const views = OBJECTIVES
    .map((objective) => data.views.find((view) => view.objective === objective && view.image.trim()))
    .filter((view): view is SlideView => Boolean(view))
  if (!views.length) return null
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    tissue: data.tissue,
    stain: data.stain,
    views,
    structures: data.structures ?? [],
    description: item.fields.Description?.trim() || undefined,
  }
}

/**
 * Where one cell of a sprite grid sits, as a background-position.
 *
 * Percentages rather than pixels because the grid is sized as a multiple of the
 * element it fills, so the frames stay registered whatever size that element is
 * drawn at. With a grid `columns` wide, cell `c` sits `c / (columns - 1)` of the
 * way across — the ratio alignment CSS uses for percentage positions, not a
 * plain offset, which is the thing that catches people out here.
 *
 * The index is clamped rather than wrapped: a clock that overruns by a frame
 * should hold on the last one, and holding is what the end of this animation is
 * supposed to do.
 */
export function spriteCell(
  index: number,
  columns: number,
  rows: number,
): { x: number; y: number } {
  const clamped = Math.min(columns * rows - 1, Math.max(0, Math.round(index)))
  return {
    x: (clamped % columns) / (columns - 1) * 100,
    y: Math.floor(clamped / columns) / (rows - 1) * 100,
  }
}
