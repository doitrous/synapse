/**
 * Term Match — pairs-board rules over the medical glossary.
 *
 * Sharing a board is a link carrying a seed, not a row in a table: the friend
 * who opens the link runs this same generator over the same terms and must
 * get the same board, tile for tile. So `buildBoard` is a function in the
 * strict sense — same inputs, same output, every time — and there is
 * deliberately no `Math.random()` anywhere in this file. Both the choice of
 * which terms make the board and the shuffle of the tiles draw from the
 * `seed` argument through `seededRandom`. A single stray random call would
 * break sharing silently: two people would see different boards and nothing
 * would report an error.
 *
 * Pure module: no React, no storage, no clock.
 */

import { seededRandom, shuffle } from './seededRandom.ts'
import type { MedicalTerm } from './glossary.ts'

/** What the right-hand tile shows. */
export type MatchMode = 'arabic' | 'definition'

export interface MatchTile {
  id: string
  /** The pair this tile belongs to — two tiles share one pairId. */
  pairId: string
  text: string
  side: 'term' | 'partner'
  /** Set on Arabic tiles so the UI can mark them `lang="ar" dir="rtl"`. */
  arabic?: boolean
}

export interface MatchBoard {
  mode: MatchMode
  /** Fixed left column: the selected authored terms. */
  termTiles: MatchTile[]
  /** Shuffled right column: the Arabic translation or definition tiles. */
  partnerTiles: MatchTile[]
  /** Legacy/full-board view, always left column followed by right column. */
  tiles: MatchTile[]
  pairs: number
  /** Why there is no board, when there are no tiles. */
  refusal: 'too_few_terms' | null
}

/**
 * Below this, refuse. A five-pair board is not a smaller Term Match, it is a
 * round that ends before it starts — better to say there is not enough
 * material than to hand a student a board that reads as a bug.
 */
export const MIN_PAIRS = 6

/** The default board size: enough tiles for a round without sprawling. */
export const DEFAULT_PAIRS = 8

/** What the partner tile shows the term against, for this mode. */
function partnerText(term: MedicalTerm, mode: MatchMode): string {
  return mode === 'arabic' ? term.ar : term.def
}

/**
 * Build the board.
 *
 * @param terms  candidate terms
 * @param mode   whether the partner tile is the Arabic translation or the
 *               plain-English definition
 * @param seed   the number carried in the shared link; both which terms are
 *               chosen and how the tiles are shuffled follow from it
 * @param pairs  ceiling on how many pairs end up on the board, defaulting to
 *               `DEFAULT_PAIRS`. Below `MIN_PAIRS` usable terms, the board is
 *               refused regardless of this ceiling.
 */
export function buildBoard(
  terms: MedicalTerm[],
  mode: MatchMode,
  seed: number,
  pairs: number = DEFAULT_PAIRS,
): MatchBoard {
  // A term with no Arabic (or, in principle, no definition) cannot be
  // matched in this mode — skip it rather than render a tile with nothing on
  // the other side of it.
  const usable = terms.filter((term) => partnerText(term, mode).trim() !== '')

  if (usable.length < MIN_PAIRS) {
    return { mode, termTiles: [], partnerTiles: [], tiles: [], pairs: 0, refusal: 'too_few_terms' }
  }

  const random = seededRandom(seed)
  const chosen = shuffle(usable, random).slice(0, Math.min(pairs, usable.length))

  const tiles: MatchTile[] = []
  const termTiles: MatchTile[] = []
  const partnerTiles: MatchTile[] = []
  for (const term of chosen) {
    const termTile: MatchTile = { id: `${term.id}-term`, pairId: term.id, text: term.term, side: 'term' }
    const partnerTile: MatchTile = {
      id: `${term.id}-partner`,
      pairId: term.id,
      text: partnerText(term, mode),
      side: 'partner',
    }
    // Only the Arabic side ever needs lang="ar" dir="rtl" — an English
    // definition rendered right-to-left would be as unreadable as Arabic
    // rendered left-to-right.
    if (mode === 'arabic') partnerTile.arabic = true
    termTiles.push(termTile)
    partnerTiles.push(partnerTile)
  }

  // Drawing from the same `random` again (rather than a fresh seed) keeps the
  // whole board a single deterministic sequence: which terms were chosen and
  // how the answer column lands are both consequences of one seed, not two.
  const shuffledPartners = shuffle(partnerTiles, random)
  tiles.push(...termTiles, ...shuffledPartners)
  return { mode, termTiles, partnerTiles: shuffledPartners, tiles, pairs: chosen.length, refusal: null }
}

/** True only for two tiles that share a pairId and sit on opposite sides. */
export function isPair(a: MatchTile, b: MatchTile): boolean {
  return a.pairId === b.pairId && a.side !== b.side
}
