import { NOTE_HEIGHT, NOTE_WIDTH, type Point } from '../lib/whiteboardGeometry.ts'

/**
 * What a whiteboard is made of.
 *
 * Kept apart from the board editor so that a shared board can be read by a
 * page that has no business mounting the editor: the public viewer at `/s/:id`
 * draws exactly these shapes and nothing else. The two must agree about the
 * document or a shared board would render differently from the one that was
 * published, so there is one description of it and both read that.
 */

export interface Note { id: string; x: number; y: number; text: string; tone: keyof typeof TONES }
/**
 * A connector between two notes.
 *
 * `c1`/`c2` are optional on purpose: absent means "use the automatic curve",
 * which is what every link on an existing board has, so none of them change.
 * Present means the student bent it, and their bend is what is drawn.
 */
export interface LinkLine { id: string; from: string; to: string; c1?: Point; c2?: Point }
export interface Frame { id: string; x: number; y: number; width: number; height: number; title: string }

/**
 * A picture on the board.
 *
 * Stored as a bounded data URL, the same way a pasted image in a note is: the
 * board is one JSON document, so an unbounded screenshot would either exceed
 * the request limit or be re-uploaded on every later drag. `imageFileToBoundedDataUrl`
 * caps the longest edge and steps quality down until it fits.
 */
export interface BoardImage {
  id: string
  x: number
  y: number
  width: number
  height: number
  /**
   * Managed media/document reference for newly-added images. Legacy boards may
   * still have `src` below; renderers support both so old drawings are not lost.
   */
  documentId?: string
  /** Legacy inline data URL or stored-media reference kept for backward compatibility. */
  src?: string
  alt: string
  sizeBytes?: number
}

/**
 * A file pinned to the board.
 *
 * The bytes go to the student's own document store — the same place the reader
 * reads from, on their own account and against their own quota — and the board
 * keeps only the reference. A PDF opens in the reader; anything else downloads.
 */
export interface BoardFile { id: string; x: number; y: number; documentId: string; name: string; sizeBytes: number; kind: 'pdf' | 'file' }

/** One freehand line, as a flat `x, y, x, y…` list in board coordinates. */
export interface InkStroke { id: string; points: number[]; color: string; width: number }

/**
 * A ready-made item — from the shared icon library in `src/data/readyItems` —
 * placed on the board.
 *
 * Only the item's id is stored, never its markup: the board document stays a
 * small, portable shape, and a later change to the library's icon or label is
 * picked up by every board that already placed it. Ordering within the array
 * is its stacking order among other ready items, last painted last (topmost),
 * the same convention `noteAt` uses for notes.
 */
export interface ReadyElement { id: string; x: number; y: number; width: number; height: number; readyItemId: string }

/**
 * Everything on a board.
 *
 * The collections added after the original three are optional so that every
 * board saved before they existed still reads, and the `...Of()` helpers below
 * are the single place that turns a missing one into an empty list.
 */
export interface BoardState {
  notes: Note[]
  links: LinkLine[]
  frames: Frame[]
  images?: BoardImage[]
  files?: BoardFile[]
  ink?: InkStroke[]
  readyItems?: ReadyElement[]
  /**
   * Whether the freehand drawing paints above the notes/pictures/files or
   * below them. Below — undefined, the original behaviour — is what every
   * board saved before this existed keeps: a diagram is annotated around what
   * is on the board, not over the top of it, unless the student says otherwise.
   */
  inkAbove?: boolean
}

export type WhiteboardPermission = 'owner' | 'view' | 'edit'

export interface WhiteboardCollaborator {
  userId: string
  username: string
  icon?: string
  permission: Exclude<WhiteboardPermission, 'owner'>
}

export interface WhiteboardDocument {
  id: string
  title: string
  state: BoardState
  ownerId: string
  ownerName: string
  universityId: string
  year: string
  permission: WhiteboardPermission
  collaborators: WhiteboardCollaborator[]
  topics: string[]
  stars: string[]
  follows: string[]
  revision: number
  updatedAt: string
}

export interface WhiteboardCollection {
  activeBoardId: string
  boards: WhiteboardDocument[]
  /**
   * API-ready shared board rows. This frontend wave keeps them in the same
   * shape the backend should return; live permissions still need server
   * enforcement before real collaboration is enabled.
   */
  sharedBoards: WhiteboardDocument[]
  migratedFromSingleBoard: boolean
}

/** The ink colours, as tokens so both themes stay legible. */
export const INK_COLOURS = [
  { id: 'ink', value: 'var(--color-ink)' },
  { id: 'primary', value: 'var(--color-primary)' },
  { id: 'danger', value: 'var(--color-danger)' },
  { id: 'success', value: 'var(--color-success)' },
  { id: 'warning', value: 'var(--color-warning)' },
] as const

export const INK_WIDTHS = [2, 4, 8] as const

/** Default size for a placed picture, in board units. */
export const IMAGE_W = 260
export const FILE_W = 210
export const FILE_H = 78
/** A ready-made item is placed as a square icon this many board units wide. */
export const READY_ITEM_SIZE = 72

export type Tool = 'select' | 'pen' | 'eraser'

/**
 * Eight light note colours.
 *
 * Tints rather than fills, so a note reads as paper with a wash over it and the
 * ink on top stays legible — including in the dark theme, where each of these
 * tokens is redefined. The original four keys are kept exactly as they were, so
 * notes already on a board keep the colour they were given.
 */
export const TONES = {
  paper: 'bg-surface border-line',
  teal: 'bg-primary-tint border-primary-line',
  amber: 'bg-warning-tint border-warning/30',
  rose: 'bg-danger-tint border-danger/25',
  sage: 'bg-success-tint border-success/30',
  slate: 'bg-surface-2 border-line-2',
  sand: 'bg-inset border-line-2',
  clay: 'bg-primary-tint/55 border-primary-line/70',
} as const

export const TONE_ORDER = ['paper', 'teal', 'amber', 'rose', 'sage', 'sand', 'slate', 'clay'] as const

/** What each colour is called, for the picker's labels. */
export const TONE_LABEL: Record<keyof typeof TONES, string> = {
  paper: 'Paper', teal: 'Teal', amber: 'Amber', rose: 'Rose',
  sage: 'Sage', slate: 'Slate', sand: 'Sand', clay: 'Clay',
}
export const NOTE_W = NOTE_WIDTH
export const NOTE_H = NOTE_HEIGHT
/**
 * A new whiteboard is empty.
 *
 * It used to be seeded with seven sticky notes, eight connectors and a frame
 * titled "Heart failure · mechanism to treatment" — someone else's diagram,
 * written into a real student's account the first time they dragged anything.
 */
export const INITIAL_BOARD: BoardState = { notes: [], links: [], frames: [] }
export const WHITEBOARD_COLLECTION_KEY = 'nishany.whiteboard.boards.v1'
export const LEGACY_WHITEBOARD_KEY = 'nishany.whiteboard.board'

/** A board's collection, whether or not it was saved before the field existed. */
export const imagesOf = (board: BoardState) => board.images ?? []
export const filesOf = (board: BoardState) => board.files ?? []
export const inkOf = (board: BoardState) => board.ink ?? []
export const readyItemsOf = (board: BoardState) => board.readyItems ?? []

export function createWhiteboardDocument({
  id,
  title,
  state = INITIAL_BOARD,
  ownerId,
  ownerName,
  universityId,
  year,
  now = new Date().toISOString(),
}: {
  id: string
  title: string
  state?: BoardState
  ownerId: string
  ownerName: string
  universityId: string
  year: string
  now?: string
}): WhiteboardDocument {
  return {
    id,
    title,
    state,
    ownerId,
    ownerName,
    universityId,
    year,
    permission: 'owner',
    collaborators: [],
    topics: [],
    stars: [],
    follows: [],
    revision: 1,
    updatedAt: now,
  }
}

export function emptyWhiteboardCollection(ownerId = 'local-student', ownerName = 'Student', universityId = '', year = ''): WhiteboardCollection {
  const board = createWhiteboardDocument({
    id: 'default',
    title: 'Default board',
    state: INITIAL_BOARD,
    ownerId,
    ownerName,
    universityId,
    year,
  })
  return { activeBoardId: board.id, boards: [board], sharedBoards: [], migratedFromSingleBoard: false }
}

export function migrateSingleBoardToCollection(
  legacy: BoardState,
  collection: WhiteboardCollection,
  owner: { ownerId: string; ownerName: string; universityId: string; year: string },
  now = new Date().toISOString(),
): WhiteboardCollection {
  if (collection.migratedFromSingleBoard) return collection
  const defaultBoard = createWhiteboardDocument({
    id: 'default',
    title: 'Default board',
    state: legacy,
    ownerId: owner.ownerId,
    ownerName: owner.ownerName,
    universityId: owner.universityId,
    year: owner.year,
    now,
  })
  return {
    ...collection,
    boards: collection.boards.length === 0 ? [defaultBoard] : collection.boards.map((board, index) => index === 0 ? { ...defaultBoard, id: board.id, title: board.title || defaultBoard.title } : board),
    activeBoardId: collection.activeBoardId || defaultBoard.id,
    migratedFromSingleBoard: true,
  }
}

export function activeWhiteboard(collection: WhiteboardCollection): WhiteboardDocument {
  return collection.boards.find((board) => board.id === collection.activeBoardId)
    ?? collection.boards[0]
    ?? createWhiteboardDocument({
      id: 'default',
      title: 'Default board',
      ownerId: 'local-student',
      ownerName: 'Student',
      universityId: '',
      year: '',
    })
}

export function updateWhiteboardState(collection: WhiteboardCollection, id: string, next: BoardState, now = new Date().toISOString()): WhiteboardCollection {
  return {
    ...collection,
    boards: collection.boards.map((board) => board.id === id ? { ...board, state: next, revision: board.revision + 1, updatedAt: now } : board),
  }
}

export function addWhiteboard(collection: WhiteboardCollection, board: WhiteboardDocument): WhiteboardCollection {
  return { ...collection, boards: [...collection.boards, board], activeBoardId: board.id }
}

export function renameWhiteboard(collection: WhiteboardCollection, id: string, title: string): WhiteboardCollection {
  const cleaned = title.trim() || 'Untitled board'
  return { ...collection, boards: collection.boards.map((board) => board.id === id ? { ...board, title: cleaned, revision: board.revision + 1, updatedAt: new Date().toISOString() } : board) }
}

export function removeWhiteboard(collection: WhiteboardCollection, id: string): WhiteboardCollection {
  if (collection.boards.length <= 1) return collection
  const boards = collection.boards.filter((board) => board.id !== id)
  return { ...collection, boards, activeBoardId: collection.activeBoardId === id ? boards[0].id : collection.activeBoardId }
}

export function toggleWhiteboardStar(board: WhiteboardDocument, studentId: string): WhiteboardDocument {
  const stars = board.stars.includes(studentId) ? board.stars.filter((id) => id !== studentId) : [...board.stars, studentId]
  return { ...board, stars }
}

export function toggleWhiteboardFollow(board: WhiteboardDocument, studentId: string): WhiteboardDocument {
  const follows = board.follows.includes(studentId) ? board.follows.filter((id) => id !== studentId) : [...board.follows, studentId]
  return { ...board, follows }
}

export function sameAudienceSharedBoards(
  collection: WhiteboardCollection,
  audience: { universityId: string; year: string },
): WhiteboardDocument[] {
  return collection.sharedBoards.filter((board) => board.universityId === audience.universityId && board.year === audience.year)
}

export function groupWhiteboardsByTopic(boards: readonly WhiteboardDocument[]): Array<{ topic: string; boards: WhiteboardDocument[] }> {
  const buckets = new Map<string, WhiteboardDocument[]>()
  for (const board of boards) {
    const topics = board.topics.length ? board.topics : ['Unfiled']
    for (const topic of topics) {
      const bucket = buckets.get(topic)
      if (bucket) bucket.push(board)
      else buckets.set(topic, [board])
    }
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([topic, boards]) => ({
      topic,
      boards: [...boards].sort((a, b) => b.stars.length - a.stars.length || Date.parse(b.updatedAt) - Date.parse(a.updatedAt)),
    }))
}

/** A freehand line as an SVG path. Quadratic through midpoints, so it is smooth. */
export function inkPath(points: readonly number[]): string {
  if (points.length < 4) return points.length === 2 ? `M ${points[0]} ${points[1]} l 0.01 0.01` : ''
  let d = `M ${points[0]} ${points[1]}`
  for (let i = 2; i + 3 < points.length; i += 2) {
    const mx = (points[i] + points[i + 2]) / 2
    const my = (points[i + 1] + points[i + 3]) / 2
    d += ` Q ${points[i]} ${points[i + 1]} ${mx} ${my}`
  }
  d += ` L ${points[points.length - 2]} ${points[points.length - 1]}`
  return d
}
