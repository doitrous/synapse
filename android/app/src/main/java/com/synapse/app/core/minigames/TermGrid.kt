package com.synapse.app.core.minigames

import java.text.Normalizer

/**
 * Term Grid — building a crossword out of the medical glossary, ported 1:1
 * (data and generation algorithm alike) from web's `src/data/crossword.ts`.
 *
 * Sharing a puzzle is a seed, not a row in a table: `buildGrid` is a pure
 * function of its inputs — same terms and seed, same grid, square for
 * square — with every draw coming from [seededRandom]. This port keeps that
 * property exactly, including the retry-and-keep-the-best-arrangement step,
 * which looks like nondeterminism at a glance and is not: the derived seeds
 * are walked in a fixed order and compared on a total order (see
 * [buildGrid]'s KDoc).
 *
 * The UI half of web's Term Grid (`TermGridBoard.tsx`) is a large,
 * highly-interactive typing grid; this port ships the full generation and
 * scoring logic below plus a functional (if visually simpler) native board
 * in `feature/minigames/TermGridScreen.kt`, per this surface's scope
 * guidance — no crossword rule or scoring behaviour is skipped, only board
 * polish (per-cell focus wrapping, cursor-follow typing) is deferred.
 *
 * Pure module: no Android framework, no storage, no clock.
 */

data class GridTerm(
    /** The answer as authored; normalised to uppercase letters before it reaches the grid. */
    val term: String,
    /** The definition, shown to the solver as the clue. */
    val clue: String,
)

enum class GridDirection { ACROSS, DOWN }

data class PlacedWord(
    val term: String,
    val clue: String,
    /** Row of the word's first letter, 0-based from the top of the cropped grid. */
    val row: Int,
    /** Column of the word's first letter, 0-based from the left. */
    val column: Int,
    val direction: GridDirection,
    /** The clue number printed in the start square. */
    val number: Int,
)

data class Grid(
    val words: List<PlacedWord>,
    val width: Int,
    val height: Int,
    /** Terms that never made it in, so the caller can say so rather than hide it. */
    val skipped: List<String>,
)

/**
 * Below this, refuse. A three-word puzzle is not a smaller crossword, it is a
 * broken one. This is a floor on words *actually interlocked*, not merely on
 * words offered.
 */
const val MIN_TERMS = 8

/** The default ceiling: past this the board stops reading as a quick puzzle. */
private const val DEFAULT_MAX_TERMS = 15

/** How many derived seeds to lay out before picking the best of them. */
private const val SEED_ATTEMPTS = 8

/**
 * The seed for one retry — strides by [SEED_GOLDEN_GAMMA] rather than
 * counting upward, so neighbouring seeds' retry windows never overlap (see
 * web's `derivedSeed` KDoc for why that matters for sharing).
 */
private fun derivedSeed(seed: Int, attempt: Int): Int = seed + (attempt * SEED_GOLDEN_GAMMA)

/** One square of the working grid, before cropping. Mutable to mirror web's in-place `Square` mutation during placement. */
private class Square(var letter: Char, var across: Boolean, var down: Boolean)

private data class Placement(
    val term: String,
    val clue: String,
    val row: Int,
    val column: Int,
    val direction: GridDirection,
)

/** The extent the board covers so far, in working (uncropped) coordinates. */
private data class Bounds(val minRow: Int, val minColumn: Int, val maxRow: Int, val maxColumn: Int)

private fun key(row: Int, column: Int): String = "$row,$column"

private val DIACRITICS_REGEX = Regex("[̀-ͯ]")
private val NON_LETTER_REGEX = Regex("[^A-Z]")

/**
 * The answer form Term Grid uses everywhere: built terms, typed cells, pasted
 * text and completion checks. Ignores presentation characters students
 * commonly copy from articles — spaces, punctuation, apostrophes, hyphens and
 * accents — while keeping the crossword itself one Latin letter per square.
 */
fun normalizeTermGridAnswer(input: String): String {
    val decomposed = Normalizer.normalize(input, Normalizer.Form.NFKD)
    val withoutDiacritics = decomposed.replace(DIACRITICS_REGEX, "")
    return withoutDiacritics.uppercase().replace(NON_LETTER_REGEX, "")
}

/** The single square value to store after typing or pasting into one cell. */
fun normalizeTermGridLetter(input: String): String = normalizeTermGridAnswer(input).takeLast(1)

/**
 * Deterministic givens for the finished grid — the same two prefilled
 * answers for everyone opening the same seed.
 */
fun givenTermsForGrid(grid: Grid, seed: Int, count: Int = 2): List<String> {
    if (grid.words.isEmpty() || count <= 0) return emptyList()
    val unique = grid.words.map { it.term }.distinct()
    return shuffle(unique, seededRandom(seed xor SEED_FALLBACK_STATE)).take(minOf(count, unique.size))
}

private fun letterAt(placement: Placement, index: Int): Pair<Int, Int> {
    val row = if (placement.direction == GridDirection.DOWN) placement.row + index else placement.row
    val column = if (placement.direction == GridDirection.ACROSS) placement.column + index else placement.column
    return row to column
}

/**
 * Can this word go here?
 *
 * Four rejections, ported verbatim from web's `fits`:
 *  1. a crossing whose letters disagree;
 *  2. any square already holding a different letter, including one a word in
 *     this same direction already runs through;
 *  3. the square immediately before or after the word must be free;
 *  4. a square directly alongside the word must be free wherever this word
 *     does not itself cross there.
 */
private fun fits(placement: Placement, occupied: Map<String, Square>): Boolean {
    val acrossWord = placement.direction == GridDirection.ACROSS

    for (i in placement.term.indices) {
        val (row, column) = letterAt(placement, i)
        val square = occupied[key(row, column)]

        if (square != null) {
            if (square.letter != placement.term[i]) return false
            if (if (acrossWord) square.across else square.down) return false
            continue
        }

        val sideA = if (acrossWord) occupied[key(row - 1, column)] else occupied[key(row, column - 1)]
        val sideB = if (acrossWord) occupied[key(row + 1, column)] else occupied[key(row, column + 1)]
        if (sideA != null || sideB != null) return false
    }

    val (beforeRow, beforeColumn) = letterAt(placement, -1)
    val (afterRow, afterColumn) = letterAt(placement, placement.term.length)
    if (occupied.containsKey(key(beforeRow, beforeColumn))) return false
    if (occupied.containsKey(key(afterRow, afterColumn))) return false

    return true
}

/** Write a placed word into the working squares. */
private fun occupy(placement: Placement, occupied: MutableMap<String, Square>) {
    for (i in placement.term.indices) {
        val (row, column) = letterAt(placement, i)
        val at = key(row, column)
        val square = occupied.getOrPut(at) { Square(placement.term[i], across = false, down = false) }
        if (placement.direction == GridDirection.ACROSS) square.across = true else square.down = true
    }
}

/** Grow the running extent to include a newly placed word. */
private fun extend(bounds: Bounds, placement: Placement): Bounds {
    val (startRow, startColumn) = letterAt(placement, 0)
    val (endRow, endColumn) = letterAt(placement, placement.term.length - 1)
    return Bounds(
        minRow = minOf(bounds.minRow, startRow),
        minColumn = minOf(bounds.minColumn, startColumn),
        maxRow = maxOf(bounds.maxRow, endRow),
        maxColumn = maxOf(bounds.maxColumn, endColumn),
    )
}

private fun spanOf(bounds: Bounds): Int = maxOf(bounds.maxRow - bounds.minRow + 1, bounds.maxColumn - bounds.minColumn + 1)

private fun areaOf(bounds: Bounds): Int = (bounds.maxRow - bounds.minRow + 1) * (bounds.maxColumn - bounds.minColumn + 1)

/** How many squares of this placement land on letters already on the board. */
private fun countCrossings(placement: Placement, occupied: Map<String, Square>): Int {
    var crossings = 0
    for (i in placement.term.indices) {
        val (row, column) = letterAt(placement, i)
        if (occupied.containsKey(key(row, column))) crossings++
    }
    return crossings
}

/** The scoring order [bestFit] uses to pick among legal placements, ported verbatim from web's `beats`. */
private fun beats(
    attempt: Placement,
    span: Int,
    area: Int,
    crossings: Int,
    best: Placement,
    bestSpan: Int,
    bestArea: Int,
    bestCrossings: Int,
): Boolean {
    if (span != bestSpan) return span < bestSpan
    if (area != bestArea) return area < bestArea
    if (crossings != bestCrossings) return crossings > bestCrossings
    if (attempt.row != best.row) return attempt.row < best.row
    if (attempt.column != best.column) return attempt.column < best.column
    return attempt.direction == GridDirection.ACROSS && best.direction == GridDirection.DOWN
}

/**
 * Scan every placed word and every letter they share, and take the *best*
 * legal placement rather than merely the first — see web's `bestFit` KDoc for
 * why (this is what keeps a generated grid compact rather than sprawling).
 */
private fun bestFit(candidate: GridTerm, placements: List<Placement>, occupied: Map<String, Square>, bounds: Bounds): Placement? {
    var best: Placement? = null
    var bestSpan = Int.MAX_VALUE
    var bestArea = Int.MAX_VALUE
    var bestCrossings = -1

    for (placed in placements) {
        val direction = if (placed.direction == GridDirection.ACROSS) GridDirection.DOWN else GridDirection.ACROSS
        for (j in placed.term.indices) {
            for (i in candidate.term.indices) {
                if (candidate.term[i] != placed.term[j]) continue
                val (crossRow, crossColumn) = letterAt(placed, j)
                val attempt = Placement(
                    term = candidate.term,
                    clue = candidate.clue,
                    row = if (direction == GridDirection.DOWN) crossRow - i else crossRow,
                    column = if (direction == GridDirection.ACROSS) crossColumn - i else crossColumn,
                    direction = direction,
                )
                if (!fits(attempt, occupied)) continue

                val grown = extend(bounds, attempt)
                val span = spanOf(grown)
                val area = areaOf(grown)
                val crossings = countCrossings(attempt, occupied)
                if (best == null || beats(attempt, span, area, crossings, best, bestSpan, bestArea, bestCrossings)) {
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

private class ArrangeResult(val placements: List<Placement>, val unplaced: List<String>)

/** One arrangement attempt: shuffle from this seed, then lay the words out. */
private fun arrange(usable: List<GridTerm>, seed: Int, max: Int): ArrangeResult {
    val random = seededRandom(seed)
    val order = shuffle(usable, random).toMutableList()
    // The longest word anchors the grid: it offers the most letters for the
    // rest to hang off. Ties break on the shuffled order, so the seed still decides.
    var anchorIndex = 0
    for (i in 1 until order.size) {
        if (order[i].term.length > order[anchorIndex].term.length) anchorIndex = i
    }
    val anchor = order.removeAt(anchorIndex)

    val occupied = mutableMapOf<String, Square>()
    val placements = mutableListOf<Placement>()
    val unplaced = mutableListOf<String>()

    // The anchor starts at the origin running across; everything else grows
    // out from it in either direction, including into negative coordinates,
    // and the crop at the end brings the whole thing back to (0, 0).
    val first = Placement(anchor.term, anchor.clue, row = 0, column = 0, direction = GridDirection.ACROSS)
    placements += first
    occupy(first, occupied)
    var bounds = extend(Bounds(0, 0, 0, 0), first)

    for (candidate in order) {
        if (placements.size >= max) {
            unplaced += candidate.term
            continue
        }
        val placement = bestFit(candidate, placements, occupied, bounds)
        if (placement == null) {
            unplaced += candidate.term
            continue
        }
        placements += placement
        occupy(placement, occupied)
        bounds = extend(bounds, placement)
    }

    return ArrangeResult(placements, unplaced)
}

/**
 * Crop to the squares actually used and number the start squares. Reading
 * order: top to bottom, left to right. A square that starts both an across
 * and a down word carries one number, shared by both clues.
 */
private fun crop(placements: List<Placement>, skipped: List<String>): Grid {
    if (placements.isEmpty()) return Grid(emptyList(), 0, 0, skipped)

    var bounds = Bounds(Int.MAX_VALUE, Int.MAX_VALUE, Int.MIN_VALUE, Int.MIN_VALUE)
    for (placement in placements) bounds = extend(bounds, placement)

    val shifted = placements.map { it.copy(row = it.row - bounds.minRow, column = it.column - bounds.minColumn) }
    val reading = shifted.sortedWith(compareBy({ it.row }, { it.column }))

    val numbers = mutableMapOf<String, Int>()
    var next = 1
    for (placement in reading) {
        val at = key(placement.row, placement.column)
        if (!numbers.containsKey(at)) {
            numbers[at] = next
            next++
        }
    }

    val words = reading.map { placement ->
        PlacedWord(
            term = placement.term,
            clue = placement.clue,
            row = placement.row,
            column = placement.column,
            direction = placement.direction,
            number = numbers.getValue(key(placement.row, placement.column)),
        )
    }

    return Grid(
        words = words,
        width = bounds.maxColumn - bounds.minColumn + 1,
        height = bounds.maxRow - bounds.minRow + 1,
        skipped = skipped,
    )
}

/**
 * Build the puzzle.
 *
 * @param terms candidate terms with their definitions as clues
 * @param seed the seed carried in a shared link; the whole arrangement follows from it
 * @param max ceiling on how many words end up in the grid. Below [MIN_TERMS] nothing can satisfy the floor, so the grid is refused.
 *
 * Two problems, one answer, ported verbatim from web: an unlucky shuffle can
 * strand words it cannot interlock and land under the floor, and placement is
 * greedy, so a shuffle that starts well can still paint itself into a corner.
 * So the words are laid out [SEED_ATTEMPTS] times, from seeds derived from
 * this one via [derivedSeed], and the best arrangement is kept rather than
 * the first that happens to work — a fixed, total-ordered comparison, so the
 * whole function stays a pure function of (terms, seed, max): two clients
 * opening the same seed get the same grid, retries and all.
 */
fun buildGrid(terms: List<GridTerm>, seed: Int, max: Int = DEFAULT_MAX_TERMS): Grid {
    val rejected = mutableListOf<String>()
    val usable = mutableListOf<GridTerm>()

    for (entry in terms) {
        val raw = entry.term.trim()
        val word = normalizeTermGridAnswer(raw)
        if (word.length < 3) {
            rejected += raw.uppercase()
            continue
        }
        usable += GridTerm(word, entry.clue)
    }

    fun refuse(): Grid = Grid(emptyList(), 0, 0, rejected + usable.map { it.term })

    // Refusing is the requirement — thinning the puzzle down to whatever
    // happens to be available would hand the student a puzzle that reads as broken.
    if (usable.size < MIN_TERMS) return refuse()

    var best: ArrangeResult? = null
    var bestSpan = Int.MAX_VALUE
    var bestArea = Int.MAX_VALUE

    for (attempt in 0 until SEED_ATTEMPTS) {
        val candidate = arrange(usable, derivedSeed(seed, attempt), max)
        // Under the floor is not a candidate at all, however compact it looks.
        if (candidate.placements.size < MIN_TERMS) continue

        var bounds = Bounds(Int.MAX_VALUE, Int.MAX_VALUE, Int.MIN_VALUE, Int.MIN_VALUE)
        for (placement in candidate.placements) bounds = extend(bounds, placement)
        val span = spanOf(bounds)
        val area = areaOf(bounds)

        // More words first: a fuller puzzle is worth more than a slightly
        // tighter one. Then the shorter long side, then the smaller board.
        // Earlier attempts win ties, which is what keeps the choice total.
        val current = best
        val fuller = current == null || candidate.placements.size > current.placements.size
        val sameSize = current != null && candidate.placements.size == current.placements.size
        if (fuller || (sameSize && (span < bestSpan || (span == bestSpan && area < bestArea)))) {
            best = candidate
            bestSpan = span
            bestArea = area
        }
    }

    // No arrangement of these terms interlocks enough of them. Refuse.
    val winner = best ?: return refuse()
    return crop(winner.placements, rejected + winner.unplaced)
}
