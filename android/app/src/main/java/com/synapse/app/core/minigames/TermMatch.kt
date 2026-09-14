package com.synapse.app.core.minigames

import com.synapse.app.core.taxonomy.TaxonomyTerm

/**
 * Term Match — pairs-board rules over the medical glossary, ported 1:1 from
 * web's `src/data/termMatch.ts`.
 *
 * A board is a pure function of (terms, mode, seed): both which terms are
 * chosen and how the tiles are shuffled draw only from [seededRandom] over
 * [seed], so the same three inputs always produce the same board, tile for
 * tile — matching web's own reasoning that a stray non-seeded random call
 * here would break sharing/reproducibility silently.
 *
 * Pure module: no Android framework, no storage, no clock.
 */
enum class MatchMode { ARABIC, DEFINITION }

enum class MatchSide { TERM, PARTNER }

data class MatchTile(
    val id: String,
    /** The pair this tile belongs to — two tiles share one pairId. */
    val pairId: String,
    val text: String,
    val side: MatchSide,
    /** True for an Arabic tile, so the UI can mark it right-to-left. */
    val arabic: Boolean = false,
)

data class MatchBoard(
    val mode: MatchMode,
    /** Fixed left column: the selected authored terms. */
    val termTiles: List<MatchTile>,
    /** Shuffled right column: the Arabic translation or definition tiles. */
    val partnerTiles: List<MatchTile>,
    /** Full-board view, always left column followed by right column. */
    val tiles: List<MatchTile>,
    val pairs: Int,
    /** Why there is no board, when there are no tiles. */
    val refusal: MatchRefusal?,
)

enum class MatchRefusal { TOO_FEW_TERMS }

/** Below this, refuse — a five-pair board reads as broken, not as a smaller Term Match. */
const val MIN_PAIRS = 6

/** The default board size: enough tiles for a round without sprawling. */
const val DEFAULT_PAIRS = 8

private fun partnerText(term: TaxonomyTerm, mode: MatchMode): String =
    if (mode == MatchMode.ARABIC) term.arabic else term.definition

/**
 * Build the board.
 *
 * @param terms candidate terms
 * @param mode whether the partner tile is the Arabic translation or the plain-English definition
 * @param seed the seed carried in a shared link; both which terms are chosen and how the tiles are shuffled follow from it
 * @param pairs ceiling on how many pairs end up on the board, defaulting to [DEFAULT_PAIRS]. Below [MIN_PAIRS] usable terms, the board is refused regardless of this ceiling.
 */
fun buildMatchBoard(
    terms: List<TaxonomyTerm>,
    mode: MatchMode,
    seed: Int,
    pairs: Int = DEFAULT_PAIRS,
): MatchBoard {
    // A term with no Arabic (or, in principle, no definition) cannot be
    // matched in this mode — skip it rather than render a tile with nothing
    // on the other side of it.
    val usable = terms.filter { partnerText(it, mode).isNotBlank() }

    if (usable.size < MIN_PAIRS) {
        return MatchBoard(mode, emptyList(), emptyList(), emptyList(), 0, MatchRefusal.TOO_FEW_TERMS)
    }

    val random = seededRandom(seed)
    val chosen = shuffle(usable, random).take(minOf(pairs, usable.size))

    val termTiles = mutableListOf<MatchTile>()
    val partnerTiles = mutableListOf<MatchTile>()
    for (term in chosen) {
        termTiles += MatchTile(id = "${term.id}-term", pairId = term.id, text = term.term, side = MatchSide.TERM)
        partnerTiles += MatchTile(
            id = "${term.id}-partner",
            pairId = term.id,
            text = partnerText(term, mode),
            side = MatchSide.PARTNER,
            arabic = mode == MatchMode.ARABIC,
        )
    }

    // Drawing from the same `random` again (rather than a fresh seed) keeps
    // the whole board a single deterministic sequence: which terms were
    // chosen and how the answer column lands are both consequences of one
    // seed, not two.
    val shuffledPartners = shuffle(partnerTiles, random)
    val tiles = termTiles + shuffledPartners
    return MatchBoard(mode, termTiles, shuffledPartners, tiles, chosen.size, refusal = null)
}

/** True only for two tiles that share a pairId and sit on opposite sides. */
fun isPair(a: MatchTile, b: MatchTile): Boolean = a.pairId == b.pairId && a.side != b.side
