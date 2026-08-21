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

import { seededRandom, shuffle } from './seededRandom.ts'

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
 *
 * This is a floor on words *actually interlocked*, not merely on words offered.
 * Gating the candidates and then letting only six of them interlock would
 * produce exactly the thin puzzle the rule exists to prevent.
 */
export const MIN_TERMS = 8

/** The default ceiling: past this the board stops reading as a quick puzzle. */
const DEFAULT_MAX_TERMS = 15

/**
 * How many derived seeds to lay out before picking the best of them.
 *
 * Bounded on purpose, in both directions: a term set that genuinely cannot
 * interlock — a glossary page of words sharing no letters — fails every attempt
 * and should fail fast rather than grind, and the compactness gained past a
 * handful of attempts does not pay for the work.
 */
const SEED_ATTEMPTS = 8

/**
 * The seed for one retry.
 *
 * Not `seed + 1, seed + 2 …`: because the best of the whole window is kept
 * rather than the first that works, counting upward would make the windows of
 * neighbouring seeds overlap — seed 1 would search 1…8 and seed 2 would search
 * 2…9, and both would settle on the same winner. Two friends with different
 * links would then be sent the same puzzle. Striding by a large odd constant
 * keeps each seed's window to itself, while attempt 0 is still the seed itself.
 */
const derivedSeed = (seed: number, attempt: number) => (seed + Math.imul(attempt, 0x9e3779b1)) | 0

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

/** The extent the board covers so far, in working (uncropped) coordinates. */
interface Bounds {
  minRow: number
  minColumn: number
  maxRow: number
  maxColumn: number
}

const key = (row: number, column: number) => `${row},${column}`

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

/** Grow the running extent to include a newly placed word. */
function extend(bounds: Bounds, placement: Placement): Bounds {
  const start = letterAt(placement, 0)
  const end = letterAt(placement, placement.term.length - 1)
  return {
    minRow: Math.min(bounds.minRow, start.row),
    minColumn: Math.min(bounds.minColumn, start.column),
    maxRow: Math.max(bounds.maxRow, end.row),
    maxColumn: Math.max(bounds.maxColumn, end.column),
  }
}

const spanOf = (bounds: Bounds) =>
  Math.max(bounds.maxRow - bounds.minRow + 1, bounds.maxColumn - bounds.minColumn + 1)

const areaOf = (bounds: Bounds) =>
  (bounds.maxRow - bounds.minRow + 1) * (bounds.maxColumn - bounds.minColumn + 1)

/** How many squares of this placement land on letters already on the board. */
function countCrossings(placement: Placement, occupied: Map<string, Square>): number {
  let crossings = 0
  for (let i = 0; i < placement.term.length; i++) {
    const { row, column } = letterAt(placement, i)
    if (occupied.has(key(row, column))) crossings++
  }
  return crossings
}

/**
 * Scan every placed word and every letter they share, and take the *best* legal
 * placement rather than merely the first.
 *
 * Taking the first fit is what makes a generated grid sprawl: a word hangs off
 * whichever letter the scan reached first, and the board grows a limb. The
 * board has to be small enough to solve on a phone, so every legal placement is
 * scored and the lowest wins:
 *
 *  1. smallest resulting bounding box — compactness is the actual requirement;
 *  2. then most crossings — a placement that interlocks twice is what makes a
 *     crossword feel woven rather than merely adjacent;
 *  3. then the topmost, then leftmost, then across before down.
 *
 * That third key exists so the winner never depends on the order the scan
 * happens to visit candidates in: it is a total order over distinct placements
 * (no two differ only beyond direction), so the result stays reproducible even
 * if the scan is ever reordered.
 */
function bestFit(
  candidate: GridTerm,
  placements: Placement[],
  occupied: Map<string, Square>,
  bounds: Bounds,
): Placement | null {
  let best: Placement | null = null
  let bestSpan = Infinity
  let bestArea = Infinity
  let bestCrossings = -1

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
        if (!fits(attempt, occupied)) continue

        const grown = extend(bounds, attempt)
        const span = spanOf(grown)
        const area = areaOf(grown)
        const crossings = countCrossings(attempt, occupied)
        if (best === null || beats(attempt, span, area, crossings, best, bestSpan, bestArea, bestCrossings)) {
          best = attempt
          bestSpan = span
          bestArea = area
          bestCrossings = crossings
        }
      }
    }
  }
  return best
}

/** The scoring order described on `bestFit`. */
function beats(
  attempt: Placement,
  span: number,
  area: number,
  crossings: number,
  best: Placement,
  bestSpan: number,
  bestArea: number,
  bestCrossings: number,
): boolean {
  if (span !== bestSpan) return span < bestSpan
  if (area !== bestArea) return area < bestArea
  if (crossings !== bestCrossings) return crossings > bestCrossings
  if (attempt.row !== best.row) return attempt.row < best.row
  if (attempt.column !== best.column) return attempt.column < best.column
  return attempt.direction === 'across' && best.direction === 'down'
}

/** One arrangement attempt: shuffle from this seed, then lay the words out. */
function arrange(
  usable: GridTerm[],
  seed: number,
  max: number,
): { placements: Placement[]; unplaced: string[] } {
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
  const unplaced: string[] = []

  // The anchor starts at the origin running across; everything else grows out
  // from it in either direction, including into negative coordinates, and the
  // crop at the end brings the whole thing back to (0, 0).
  const first: Placement = { term: anchor.term, clue: anchor.clue, row: 0, column: 0, direction: 'across' }
  placements.push(first)
  occupy(first, occupied)
  let bounds = extend(
    { minRow: 0, minColumn: 0, maxRow: 0, maxColumn: 0 },
    first,
  )

  for (const candidate of order) {
    if (placements.length >= max) {
      unplaced.push(candidate.term)
      continue
    }
    const placement = bestFit(candidate, placements, occupied, bounds)
    if (!placement) {
      // Report rather than drop, so the caller can tell the student which terms
      // did not make it into this particular grid.
      unplaced.push(candidate.term)
      continue
    }
    placements.push(placement)
    occupy(placement, occupied)
    bounds = extend(bounds, placement)
  }

  return { placements, unplaced }
}

/**
 * Build the puzzle.
 *
 * @param terms  candidate terms with their definitions as clues
 * @param seed   the number carried in the shared link; the whole arrangement
 *               follows from it
 * @param max    ceiling on how many words end up in the grid. Below `MIN_TERMS`
 *               nothing can satisfy the floor, so the grid is refused.
 */
export function buildGrid(terms: GridTerm[], seed: number, max: number = DEFAULT_MAX_TERMS): Grid {
  const rejected: string[] = []
  const usable: GridTerm[] = []

  for (const entry of terms) {
    const raw = entry.term.trim()
    // A multi-word term cannot go in a crossword square, and the space has to be
    // caught before stripping punctuation, or two words would silently fuse.
    if (/\s/.test(raw)) {
      rejected.push(raw.toUpperCase())
      continue
    }
    const word = raw.toUpperCase().replace(/[^A-Z]/g, '')
    if (word.length < 3) {
      // Reported as the caller wrote it, so they can find which term this was.
      rejected.push(raw.toUpperCase())
      continue
    }
    usable.push({ term: word, clue: entry.clue })
  }

  const refuse = (): Grid => ({
    words: [],
    width: 0,
    height: 0,
    skipped: [...rejected, ...usable.map((t) => t.term)],
  })

  // Refusing is the requirement. Thinning the puzzle down to whatever happens to
  // be available would hand the student a puzzle that reads as broken.
  if (usable.length < MIN_TERMS) return refuse()

  // Two problems, one answer. An unlucky shuffle can strand words it cannot
  // interlock and land under the floor; and placement is greedy, so a shuffle
  // that starts well can still paint itself into a corner and fling the last
  // word out to one side. So lay the words out several times, from seeds
  // derived from this one, and keep the best arrangement rather than the first
  // one that happens to work.
  //
  // This looks like nondeterminism at a glance and is not: the derived seeds
  // are walked in a fixed order and compared on a total order, so the whole
  // thing is still a pure function of (terms, seed, max) — two friends opening
  // the same link get the same grid, retries and all.
  let best: { placements: Placement[]; unplaced: string[] } | null = null
  let bestSpan = Infinity
  let bestArea = Infinity

  for (let attempt = 0; attempt < SEED_ATTEMPTS; attempt++) {
    const candidate = arrange(usable, derivedSeed(seed, attempt), max)
    // Under the floor is not a candidate at all, however compact it looks.
    if (candidate.placements.length < MIN_TERMS) continue

    let bounds: Bounds = { minRow: Infinity, minColumn: Infinity, maxRow: -Infinity, maxColumn: -Infinity }
    for (const placement of candidate.placements) bounds = extend(bounds, placement)
    const span = spanOf(bounds)
    const area = areaOf(bounds)

    // More words first: a fuller puzzle is worth more than a slightly tighter
    // one, and shrinking the board by dropping a clue is not a trade worth
    // making. Then the shorter long side, then the smaller board. Earlier
    // attempts win ties, which is what keeps the choice total.
    const fuller = best === null || candidate.placements.length > best.placements.length
    const sameSize = best !== null && candidate.placements.length === best.placements.length
    if (fuller || (sameSize && (span < bestSpan || (span === bestSpan && area < bestArea)))) {
      best = candidate
      bestSpan = span
      bestArea = area
    }
  }

  // No arrangement of these terms interlocks enough of them. Refuse.
  if (!best) return refuse()
  return crop(best.placements, [...rejected, ...best.unplaced])
}

/**
 * Crop to the squares actually used and number the start squares.
 *
 * Cropping is what keeps the board honest — nothing unused is included — but it
 * is the scoring in `bestFit` that keeps it small in the first place.
 */
function crop(placements: Placement[], skipped: string[]): Grid {
  if (placements.length === 0) return { words: [], width: 0, height: 0, skipped }

  let bounds: Bounds = {
    minRow: Infinity,
    minColumn: Infinity,
    maxRow: -Infinity,
    maxColumn: -Infinity,
  }
  for (const placement of placements) bounds = extend(bounds, placement)

  const shifted = placements.map((placement) => ({
    ...placement,
    row: placement.row - bounds.minRow,
    column: placement.column - bounds.minColumn,
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
    width: bounds.maxColumn - bounds.minColumn + 1,
    height: bounds.maxRow - bounds.minRow + 1,
    skipped,
  }
}
