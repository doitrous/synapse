/**
 * Term Grid — building a crossword out of the medical glossary.
 *
 * Sharing a puzzle is a link carrying a seed, not a row in a table: the friend
 * who opens the link runs this same generator over the same terms and must get
 * the same grid, square for square. So `buildGrid` is a function in the strict
 * sense — same inputs, same output, every time — and there is deliberately no
 * `Math.random()` anywhere in this file. The shuffle draws from the `seed`
 * argument through the small xorshift below. A single stray random call would
 * break sharing silently: two people would see different puzzles and nothing
 * would report an error.
 *
 * Pure module: no React, no storage, no clock.
 */

export interface GridTerm {
  /** The answer. Normalised to uppercase letters before it reaches the grid. */
  term: string
  /** The definition, shown to the solver as the clue. */
  clue: string
}

export type GridDirection = 'across' | 'down'

export interface PlacedWord {
  term: string
  clue: string
  /** Row of the word's first letter, 0-based from the top of the cropped grid. */
  row: number
  /** Column of the word's first letter, 0-based from the left. */
  column: number
  direction: GridDirection
  /** The clue number printed in the start square. */
  number: number
}

export interface Grid {
  words: PlacedWord[]
  width: number
  height: number
  /** Terms that never made it in, so the caller can say so rather than hide it. */
  skipped: string[]
}

/**
 * Below this, refuse. A three-word puzzle is not a smaller crossword, it is a
 * broken one — better to tell the caller there is not enough material than to
 * hand a student something that looks like a bug.
 */
export const MIN_TERMS = 8

/** The default ceiling: past this the board stops reading as a quick puzzle. */
const DEFAULT_MAX_TERMS = 15

/** One square of the working grid, before cropping. */
interface Square {
  letter: string
  /** Whether a word already runs through this square in each direction. */
  across: boolean
  down: boolean
}

interface Placement {
  term: string
  clue: string
  row: number
  column: number
  direction: GridDirection
}

const key = (row: number, column: number) => `${row},${column}`

/**
 * Deterministic 0..1 source, seeded from the shared link's seed.
 *
 * The seed is mixed (splitmix-style) before it drives the xorshift because
 * seeds in practice are small and adjacent — 1 and 2, or two puzzles minutes
 * apart. Feeding those into a raw xorshift state produces near-identical early
 * output and therefore near-identical grids; mixing first makes neighbouring
 * seeds diverge from the very first draw.
 */
function seededRandom(seed: number): () => number {
  let state = Math.imul(seed | 0, 0x9e3779b1) ^ 0x85ebca6b
  state = Math.imul(state ^ (state >>> 16), 0x21f0aaad)
  state = Math.imul(state ^ (state >>> 15), 0x735a2d97)
  state = (state ^ (state >>> 15)) >>> 0
  // xorshift32 is dead at zero, so nudge it off that one bad state.
  if (state === 0) state = 0x6d2b79f5
  return () => {
    state ^= state << 13
    state >>>= 0
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / 0x1_0000_0000
  }
}

/** Fisher–Yates, drawing only from the seeded source. */
function shuffle<T>(items: T[], random: () => number): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const letterAt = (placement: Pick<Placement, 'row' | 'column' | 'direction'>, index: number) => ({
  row: placement.direction === 'down' ? placement.row + index : placement.row,
  column: placement.direction === 'across' ? placement.column + index : placement.column,
})

/**
 * Can this word go here?
 *
 * Four rejections, and the last two are the ones that turn a jumble into
 * something readable as a crossword:
 *
 *  1. a crossing whose letters disagree — the shared square cannot be two
 *     letters at once;
 *  2. any square already holding a different letter, including a square a word
 *     in this same direction already runs through (otherwise a word could be
 *     laid straight on top of another);
 *  3. the square immediately before or after the word must be free — otherwise
 *     the new word silently extends its neighbour into a longer word that
 *     nobody wrote a clue for;
 *  4. a square directly alongside the word must be free wherever this word is
 *     not itself crossing there — otherwise two words sit parallel and flush,
 *     and every column they touch spells an unintended two-letter word.
 *
 * Rules 3 and 4 are what make the result readable as a crossword: without them
 * the grid still looks plausible, and is wrong.
 */
function fits(placement: Placement, occupied: Map<string, Square>): boolean {
  const { term, direction } = placement
  const acrossWord = direction === 'across'

  for (let i = 0; i < term.length; i++) {
    const { row, column } = letterAt(placement, i)
    const square = occupied.get(key(row, column))

    if (square) {
      // Rules 1 and 2: the square must already hold exactly this letter, and it
      // must be free in our direction — a square shared with a word running the
      // same way is an overlap, not a crossing.
      if (square.letter !== term[i]) return false
      if (acrossWord ? square.across : square.down) return false
      // It is a genuine crossing, so its side neighbours belong to the word
      // already running through it and rule 4 does not apply here.
      continue
    }

    // Rule 4: nothing may sit flush alongside a square we do not cross at.
    const sideA = acrossWord ? occupied.get(key(row - 1, column)) : occupied.get(key(row, column - 1))
    const sideB = acrossWord ? occupied.get(key(row + 1, column)) : occupied.get(key(row, column + 1))
    if (sideA || sideB) return false
  }

  // Rule 3: keep the ends clear so we do not lengthen the word next door.
  const before = letterAt(placement, -1)
  const after = letterAt(placement, term.length)
  if (occupied.get(key(before.row, before.column))) return false
  if (occupied.get(key(after.row, after.column))) return false

  return true
}

/** Write a placed word into the working squares. */
function occupy(placement: Placement, occupied: Map<string, Square>): void {
  for (let i = 0; i < placement.term.length; i++) {
    const { row, column } = letterAt(placement, i)
    const at = key(row, column)
    const square = occupied.get(at) ?? { letter: placement.term[i], across: false, down: false }
    if (placement.direction === 'across') square.across = true
    else square.down = true
    occupied.set(at, square)
  }
}

/**
 * Build the puzzle.
 *
 * @param terms  candidate terms with their definitions as clues
 * @param seed   the number carried in the shared link; the whole arrangement
 *               follows from it
 * @param max    ceiling on how many words end up in the grid
 */
export function buildGrid(terms: GridTerm[], seed: number, max: number = DEFAULT_MAX_TERMS): Grid {
  const skipped: string[] = []
  const usable: GridTerm[] = []

  for (const entry of terms) {
    const raw = entry.term.trim()
    // A multi-word term cannot go in a crossword square, and the space has to be
    // caught before stripping punctuation, or two words would silently fuse.
    if (/\s/.test(raw)) {
      skipped.push(raw.toUpperCase())
      continue
    }
    const word = raw.toUpperCase().replace(/[^A-Z]/g, '')
    if (word.length < 3) {
      // Reported as the caller wrote it, so they can find which term this was.
      skipped.push(raw.toUpperCase())
      continue
    }
    usable.push({ term: word, clue: entry.clue })
  }

  // Refusing is the requirement. Thinning the puzzle down to whatever happens to
  // be available would hand the student a puzzle that reads as broken.
  if (usable.length < MIN_TERMS) {
    return { words: [], width: 0, height: 0, skipped: [...skipped, ...usable.map((t) => t.term)] }
  }

  const random = seededRandom(seed)
  const order = shuffle(usable, random)
  // The longest word anchors the grid: it offers the most letters for the rest
  // to hang off. Ties break on the shuffled order, so the seed still decides.
  let anchorIndex = 0
  for (let i = 1; i < order.length; i++) {
    if (order[i].term.length > order[anchorIndex].term.length) anchorIndex = i
  }
  const [anchor] = order.splice(anchorIndex, 1)

  const occupied = new Map<string, Square>()
  const placements: Placement[] = []

  // The anchor starts at the origin running across; everything else grows out
  // from it in either direction, including into negative coordinates, and the
  // crop at the end brings the whole thing back to (0, 0).
  const first: Placement = { term: anchor.term, clue: anchor.clue, row: 0, column: 0, direction: 'across' }
  placements.push(first)
  occupy(first, occupied)

  for (const candidate of order) {
    if (placements.length >= max) {
      skipped.push(candidate.term)
      continue
    }
    const placement = firstFit(candidate, placements, occupied)
    if (!placement) {
      // Report rather than drop, so the caller can tell the student which terms
      // did not make it into this particular grid.
      skipped.push(candidate.term)
      continue
    }
    placements.push(placement)
    occupy(placement, occupied)
  }

  return crop(placements, skipped)
}

/**
 * Scan every placed word and every letter they share, and take the first
 * placement that fits. A deterministic scan, in placement order — no search
 * heuristics, because the ordering above is the only thing allowed to vary.
 */
function firstFit(
  candidate: GridTerm,
  placements: Placement[],
  occupied: Map<string, Square>,
): Placement | null {
  for (const placed of placements) {
    const direction: GridDirection = placed.direction === 'across' ? 'down' : 'across'
    for (let j = 0; j < placed.term.length; j++) {
      for (let i = 0; i < candidate.term.length; i++) {
        if (candidate.term[i] !== placed.term[j]) continue
        const cross = letterAt(placed, j)
        const attempt: Placement = {
          term: candidate.term,
          clue: candidate.clue,
          row: direction === 'down' ? cross.row - i : cross.row,
          column: direction === 'across' ? cross.column - i : cross.column,
          direction,
        }
        if (fits(attempt, occupied)) return attempt
      }
    }
  }
  return null
}

/**
 * Crop to the squares actually used and number the start squares.
 *
 * Cropping is how "the board should not be huge" is met — by construction
 * rather than by a magic size: eight short terms simply produce a small board,
 * and both minima come out at 0.
 */
function crop(placements: Placement[], skipped: string[]): Grid {
  if (placements.length === 0) return { words: [], width: 0, height: 0, skipped }

  let minRow = Infinity
  let minColumn = Infinity
  let maxRow = -Infinity
  let maxColumn = -Infinity
  for (const placement of placements) {
    const start = letterAt(placement, 0)
    const end = letterAt(placement, placement.term.length - 1)
    minRow = Math.min(minRow, start.row)
    minColumn = Math.min(minColumn, start.column)
    maxRow = Math.max(maxRow, end.row)
    maxColumn = Math.max(maxColumn, end.column)
  }

  const shifted = placements.map((placement) => ({
    ...placement,
    row: placement.row - minRow,
    column: placement.column - minColumn,
  }))

  // Reading order: top to bottom, left to right. A square that starts both an
  // across and a down word carries one number, shared by both clues.
  const reading = [...shifted].sort((a, b) => a.row - b.row || a.column - b.column)
  const numbers = new Map<string, number>()
  let next = 1
  for (const placement of reading) {
    const at = key(placement.row, placement.column)
    if (!numbers.has(at)) numbers.set(at, next++)
  }

  const words: PlacedWord[] = reading.map((placement) => ({
    term: placement.term,
    clue: placement.clue,
    row: placement.row,
    column: placement.column,
    direction: placement.direction,
    number: numbers.get(key(placement.row, placement.column))!,
  }))

  return {
    words,
    width: maxColumn - minColumn + 1,
    height: maxRow - minRow + 1,
    skipped,
  }
}
