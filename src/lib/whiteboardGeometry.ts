/**
 * Where things sit on the board, and how the board itself is bounded.
 *
 * All of this is arithmetic over plain numbers, kept out of the component so it
 * can be tested — the board is the one surface in the app where a student can
 * lose their place entirely, and "panned into empty space forever" is a bug you
 * only find by trying it.
 */

export interface Point {
  x: number
  y: number
}

export interface NoteBox {
  id: string
  x: number
  y: number
  text?: string
}

export interface View {
  x: number
  y: number
  scale: number
}

export interface Size {
  width: number
  height: number
}

/**
 * The board has edges.
 *
 * An unbounded canvas sounds generous and is the opposite: pan far enough and
 * everything you made is somewhere behind you with no way back but a control
 * you have to know about. This is large enough that nobody reaches the edge by
 * accident, and small enough that the minimap means something.
 */
export const BOARD: { width: number; height: number } = { width: 8000, height: 5000 }

export const NOTE_WIDTH = 176
export const NOTE_HEIGHT = 74

/** Keep a point inside the board, allowing for the size of what is being placed. */
export function clampToBoard(point: Point, size: Size = { width: 0, height: 0 }): Point {
  return {
    x: Math.min(Math.max(point.x, 0), Math.max(0, BOARD.width - size.width)),
    y: Math.min(Math.max(point.y, 0), Math.max(0, BOARD.height - size.height)),
  }
}

/**
 * Keep the viewport over the board.
 *
 * When the board is wider than the viewport the edges are hard stops. When it
 * is not — zoomed far out, or a narrow phone — the board is centred instead,
 * because clamping something smaller than its window puts it in a corner.
 */
export function clampView(view: View, viewport: Size): View {
  const worldWidth = BOARD.width * view.scale
  const worldHeight = BOARD.height * view.scale
  const x = worldWidth <= viewport.width
    ? (viewport.width - worldWidth) / 2
    : Math.min(0, Math.max(viewport.width - worldWidth, view.x))
  const y = worldHeight <= viewport.height
    ? (viewport.height - worldHeight) / 2
    : Math.min(0, Math.max(viewport.height - worldHeight, view.y))
  return { ...view, x, y }
}

/** Screen pixels within the canvas → board coordinates. */
export function toBoard(point: Point, view: View): Point {
  return { x: (point.x - view.x) / view.scale, y: (point.y - view.y) / view.scale }
}

export type Side = 'start' | 'end'

/** Where a connector meets a note — the middle of its start or end edge. */
export function anchorOf(note: NoteBox, side: Side): Point {
  return {
    x: side === 'start' ? note.x : note.x + NOTE_WIDTH,
    y: note.y + NOTE_HEIGHT / 2,
  }
}

/**
 * Which sides two notes should be joined by.
 *
 * A connector that leaves the right edge and arrives at the right edge doubles
 * back over the note it came from; picking by relative position is what makes
 * a link read as a direction rather than a knot.
 */
export function sidesBetween(from: NoteBox, to: NoteBox): { from: Side; to: Side } {
  return to.x + NOTE_WIDTH / 2 >= from.x + NOTE_WIDTH / 2
    ? { from: 'end', to: 'start' }
    : { from: 'start', to: 'end' }
}

/** The default bend: a horizontal ease out of each edge, half the gap wide. */
export function defaultControls(a: Point, b: Point): [Point, Point] {
  const reach = Math.max(40, Math.abs(b.x - a.x) / 2)
  const direction = b.x >= a.x ? 1 : -1
  return [
    { x: a.x + reach * direction, y: a.y },
    { x: b.x - reach * direction, y: b.y },
  ]
}

/** A cubic path through the given (or default) control points. */
export function linkPath(a: Point, b: Point, controls?: [Point, Point] | null): {
  d: string
  controls: [Point, Point]
} {
  const [c1, c2] = controls ?? defaultControls(a, b)
  return {
    d: `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`,
    controls: [c1, c2],
  }
}

/** The note under a board point, topmost last — matching paint order. */
export function noteAt(notes: readonly NoteBox[], point: Point): NoteBox | null {
  for (let index = notes.length - 1; index >= 0; index--) {
    const note = notes[index]
    if (point.x >= note.x && point.x <= note.x + NOTE_WIDTH && point.y >= note.y && point.y <= note.y + NOTE_HEIGHT) {
      return note
    }
  }
  return null
}

/**
 * Notes whose text contains the query, in reading order.
 *
 * Reading order rather than creation order, because stepping through hits
 * should follow the diagram as it looks, not as it was built. Rows are banded
 * so two notes side by side are not reordered by a few pixels of drift.
 */
export function matchNotes(notes: readonly NoteBox[], query: string): NoteBox[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return []
  const band = NOTE_HEIGHT
  return notes
    .filter((note) => (note.text ?? '').toLowerCase().includes(needle))
    .sort((a, b) => Math.floor(a.y / band) - Math.floor(b.y / band) || a.x - b.x || a.id.localeCompare(b.id))
}

/** The view that puts a board point in the middle of the viewport. */
export function viewCentredOn(point: Point, viewport: Size, scale: number): View {
  return clampView(
    { x: viewport.width / 2 - point.x * scale, y: viewport.height / 2 - point.y * scale, scale },
    viewport,
  )
}
