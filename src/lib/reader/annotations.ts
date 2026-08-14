/**
 * What a student writes on a document, and where it lives on the page.
 *
 * **Coordinates.** Everything is stored in *page space*: both axes divided by
 * the page's width in points. `x` runs 0..1; `y` runs 0..(height/width), about
 * 1.414 on A4. Dividing both by the same number is what keeps a circle round
 * and lets one divisor convert stroke widths too — so a mark survives zooming,
 * resizing the window, a different screen, and a device with a different pixel
 * ratio, without any of them being recorded. That is what "exact mapping"
 * has to mean: not pixels, which are a property of the moment.
 */

export type ObjectKind = 'ink' | 'highlighter' | 'tape' | 'note' | 'textbox' | 'marker'

export type PenTool = 'ball' | 'fountain' | 'brush' | 'pencil'

/**
 * Widget colours are theme tokens, not literal ink.
 *
 * A sticky note is chrome — it has to stay readable on porcelain and on
 * charcoal — while a red pen has to stay red in both. Same eight tones as the
 * whiteboard, so a student meets one palette in this app rather than two.
 */
export const NOTE_TONES = ['paper', 'teal', 'amber', 'rose', 'sage', 'slate', 'sand', 'clay'] as const
export type NoteTone = (typeof NOTE_TONES)[number]

/** `[x0, y0, x1, y1]` in page space. */
export type Rect = [number, number, number, number]

export interface BaseObject {
  /** Short and random: a UUID is 36 bytes, and a book holds thousands. */
  id: string
  kind: ObjectKind
  /** 1-based, matching everything else the reader says about pages. */
  page: number
  /** Fractional, so inserting between two marks never renumbers a page. */
  z: number
  /** `[x0, y0, x1, y1]` in page space, cached so culling and hit-testing
   *  can reject a mark without decoding its points. */
  bbox: [number, number, number, number]
  /** Updated-at, ms since epoch. */
  t: number
}

export interface InkObject extends BaseObject {
  kind: 'ink' | 'highlighter'
  tool: PenTool | 'highlighter'
  /** Literal sRGB: a red pen is red in every theme. */
  color: string
  /** Base stroke width, in page-space units. */
  w: number
  /** 0..1; the highlighter is translucent, ink is not. */
  a?: number
  /** Quantised, delta-encoded points. See `strokeCodec`. */
  p: number[]
}

/**
 * An opaque block over the page, so a student can test themselves.
 *
 * Peeling is deliberately *not* stored: reopening the document has to put every
 * piece back, or the tool works exactly once.
 */
export interface TapeObject extends BaseObject {
  kind: 'tape'
  r: Rect
  tone: NoteTone
}

export interface NoteObject extends BaseObject {
  kind: 'note'
  r: Rect
  tone: NoteTone
  text: string
}

export interface TextBoxObject extends BaseObject {
  kind: 'textbox'
  r: Rect
  text: string
  color: string
  /** Page-space units, like a stroke width — so it scales with the page. */
  size: number
}

/** A student's own bookmark, shown in the outline beside the document's. */
export interface MarkerObject extends BaseObject {
  kind: 'marker'
  title: string
}

export type AnnotationObject =
  | InkObject
  | TapeObject
  | NoteObject
  | TextBoxObject
  | MarkerObject

export function isInk(object: AnnotationObject): object is InkObject {
  return object.kind === 'ink' || object.kind === 'highlighter'
}

/** Everything with a rectangle — the widgets the DOM layer draws. */
export function isBoxed(object: AnnotationObject): object is TapeObject | NoteObject | TextBoxObject {
  return object.kind === 'tape' || object.kind === 'note' || object.kind === 'textbox'
}

/** The text a student typed, for search to find alongside the document's. */
export function annotationText(object: AnnotationObject): string {
  if (object.kind === 'note' || object.kind === 'textbox') return object.text
  if (object.kind === 'marker') return object.title
  return ''
}

export interface Point {
  x: number
  y: number
  /** 0..1 where the device reports it; 0.5 stands in for a mouse. */
  pressure?: number
}

/** A page's own dimensions, needed to convert to and from page space. */
export interface PageMetrics {
  /** Unscaled width in points. */
  width: number
  height: number
}

const ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'

export function newObjectId(): string {
  const bytes = new Uint8Array(10)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(bytes)
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
  let id = ''
  for (const byte of bytes) id += ID_ALPHABET[byte % ID_ALPHABET.length]
  return id
}

/** Screen pixels within a rendered page → page space. */
export function toPageSpace(x: number, y: number, metrics: PageMetrics, scale: number): Point {
  const divisor = metrics.width * scale
  return { x: x / divisor, y: y / divisor }
}

/** Page space → pixels within a page rendered at `scale`. */
export function fromPageSpace(point: Point, metrics: PageMetrics, scale: number): { x: number; y: number } {
  const divisor = metrics.width * scale
  return { x: point.x * divisor, y: point.y * divisor }
}

/** A stroke width in page space, at the given scale, in pixels. */
export function widthInPixels(width: number, metrics: PageMetrics, scale: number): number {
  return width * metrics.width * scale
}

export function boundsOf(points: readonly Point[], padding = 0): [number, number, number, number] {
  if (!points.length) return [0, 0, 0, 0]
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const point of points) {
    if (point.x < minX) minX = point.x
    if (point.x > maxX) maxX = point.x
    if (point.y < minY) minY = point.y
    if (point.y > maxY) maxY = point.y
  }
  return [minX - padding, minY - padding, maxX + padding, maxY + padding]
}

export function bboxIntersects(
  a: readonly [number, number, number, number],
  b: readonly [number, number, number, number],
): boolean {
  return !(a[2] < b[0] || a[0] > b[2] || a[3] < b[1] || a[1] > b[3])
}

/** The next z above everything already on a page. */
export function nextZ(objects: readonly AnnotationObject[]): number {
  return objects.reduce((max, object) => Math.max(max, object.z), 0) + 1
}

/** One box around several marks — what a selection occupies. */
export function boundsOfObjects(objects: readonly AnnotationObject[]): [number, number, number, number] {
  if (!objects.length) return [0, 0, 0, 0]
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const object of objects) {
    if (object.bbox[0] < minX) minX = object.bbox[0]
    if (object.bbox[1] < minY) minY = object.bbox[1]
    if (object.bbox[2] > maxX) maxX = object.bbox[2]
    if (object.bbox[3] > maxY) maxY = object.bbox[3]
  }
  return [minX, minY, maxX, maxY]
}

/**
 * Move a mark, whatever kind it is.
 *
 * Ink carries encoded points, so the caller has to hand back the shifted array;
 * everything else is a rectangle this can shift on its own. Keeping that split
 * here means no call site has to know which kinds have geometry.
 */
export function translateObject(
  object: AnnotationObject,
  dx: number,
  dy: number,
  shiftPoints: (points: number[], dx: number, dy: number) => number[],
): AnnotationObject {
  const bbox: [number, number, number, number] = [
    object.bbox[0] + dx, object.bbox[1] + dy, object.bbox[2] + dx, object.bbox[3] + dy,
  ]
  if (isInk(object)) return { ...object, bbox, p: shiftPoints(object.p, dx, dy), t: Date.now() }
  if (isBoxed(object)) {
    const r: Rect = [object.r[0] + dx, object.r[1] + dy, object.r[2] + dx, object.r[3] + dy]
    return { ...object, bbox, r, t: Date.now() }
  }
  return { ...object, bbox, t: Date.now() }
}
