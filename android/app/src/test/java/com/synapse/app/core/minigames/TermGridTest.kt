package com.synapse.app.core.minigames

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Ported from web's `src/data/crossword.test.ts`, same fixtures and assertions. */
class TermGridTest {

    private val terms = listOf(
        GridTerm("ANTERIOR", "Toward the front"),
        GridTerm("POSTERIOR", "Toward the back"),
        GridTerm("SUPERIOR", "Above"),
        GridTerm("INFERIOR", "Below"),
        GridTerm("MEDIAL", "Toward the midline"),
        GridTerm("LATERAL", "Away from the midline"),
        GridTerm("PROXIMAL", "Nearer the trunk"),
        GridTerm("DISTAL", "Further from the trunk"),
        GridTerm("SUPINE", "Lying face up"),
        GridTerm("PRONE", "Lying face down"),
    )

    private fun wordRow(word: PlacedWord, i: Int) = if (word.direction == GridDirection.DOWN) word.row + i else word.row
    private fun wordColumn(word: PlacedWord, i: Int) = if (word.direction == GridDirection.ACROSS) word.column + i else word.column

    /** Every square a grid actually uses, as "row,column" -> letter. */
    private fun squares(grid: Grid): Map<String, Char> {
        val used = mutableMapOf<String, Char>()
        for (word in grid.words) {
            for (i in word.term.indices) {
                used["${wordRow(word, i)},${wordColumn(word, i)}"] = word.term[i]
            }
        }
        return used
    }

    private fun coversSquare(word: PlacedWord, row: Int, column: Int): Boolean {
        for (i in word.term.indices) {
            if (wordRow(word, i) == row && wordColumn(word, i) == column) return true
        }
        return false
    }

    @Test
    fun theSameSeedAndTermsBuildTheIdenticalGrid() {
        assertEquals(buildGrid(terms, 42), buildGrid(terms, 42))
    }

    @Test
    fun aDifferentSeedArrangesThemDifferently() {
        assertNotEquals(buildGrid(terms, 1).words, buildGrid(terms, 2).words)
    }

    @Test
    fun lettersAgreeWhereverTwoWordsCross() {
        val grid = buildGrid(terms, 7)
        val used = mutableMapOf<String, Char>()
        for (word in grid.words) {
            for (i in word.term.indices) {
                val key = "${wordRow(word, i)},${wordColumn(word, i)}"
                val existing = used[key]
                if (existing != null) assertEquals("disagreement at $key", existing, word.term[i])
                used[key] = word.term[i]
            }
        }
    }

    @Test
    fun everyWordAfterTheFirstCrossesAnother() {
        val grid = buildGrid(terms, 7)
        assertTrue(grid.words.size >= MIN_TERMS)
        val used = squares(grid)
        for (word in grid.words.drop(1)) {
            val crossings = word.term.indices.filter { i ->
                val row = wordRow(word, i)
                val column = wordColumn(word, i)
                grid.words.any { other -> other !== word && other.direction != word.direction && coversSquare(other, row, column) }
            }
            assertTrue("${word.term} crosses nothing", crossings.isNotEmpty())
        }
        assertTrue(used.isNotEmpty())
    }

    @Test
    fun theGridIsCroppedToTheSquaresItUses() {
        val grid = buildGrid(terms, 3)
        val used = squares(grid)
        val rows = used.keys.map { it.split(",")[0].toInt() }
        val columns = used.keys.map { it.split(",")[1].toInt() }
        assertEquals(0, rows.min())
        assertEquals(0, columns.min())
        assertEquals(rows.max() + 1, grid.height)
        assertEquals(columns.max() + 1, grid.width)
    }

    @Test
    fun noMoreThanTheMaximumArePlaced() {
        val many = (0 until 40).map { GridTerm("TERM$it", "Clue $it") }
        assertTrue(buildGrid(many, 5, 12).words.size <= 12)
    }

    @Test
    fun aTermThatCannotBeInterlockedIsReportedNotDroppedInSilence() {
        val grid = buildGrid(terms + GridTerm("XYZQW", "Shares no letter"), 9)
        val placed = grid.words.map { it.term }.toSet()
        if ("XYZQW" !in placed) assertTrue(grid.skipped.contains("XYZQW"))
    }

    @Test
    fun tooFewUsableTermsIsRefusedRatherThanMadeIntoAThinPuzzle() {
        val grid = buildGrid(terms.take(3), 4)
        assertEquals(0, grid.words.size)
        assertEquals(3, grid.skipped.size)
    }

    @Test
    fun numberingRunsTopToBottomLeftToRight() {
        val grid = buildGrid(terms, 11)
        val ordered = grid.words.sortedWith(compareBy({ it.row }, { it.column }))
        var previous = 0
        for (word in ordered) {
            assertTrue("numbers must not go backwards in reading order", word.number >= previous)
            previous = word.number
        }
    }

    @Test
    fun aSquareStartingBothAnAcrossAndADownWordCarriesOneNumber() {
        val grid = buildGrid(terms, 13)
        val starts = mutableMapOf<String, MutableList<Int>>()
        for (word in grid.words) {
            starts.getOrPut("${word.row},${word.column}") { mutableListOf() }.add(word.number)
        }
        for (numbers in starts.values) {
            assertEquals("one square, one number", 1, numbers.toSet().size)
        }
    }

    @Test
    fun theMinimumIsAFloorOnWordsActuallyPlacedNotJustWordsOffered() {
        // One seed proves nothing here: it was a rare unlucky shuffle that
        // stranded words and fell under the floor, so sweep a spread of seeds.
        for (seed in 0 until 100) {
            val grid = buildGrid(terms, seed)
            assertTrue("seed $seed placed only ${grid.words.size}", grid.words.size >= MIN_TERMS)
        }
    }

    @Test
    fun retryingFromADerivedSeedCostsNoDeterminism() {
        // Seeds whose first arrangement falls short, so the retry path is the
        // one being compared — a shared link must still open the same puzzle.
        for (seed in listOf(129, 743, 784, 967, 999)) {
            assertEquals(buildGrid(terms, seed), buildGrid(terms, seed))
        }
    }

    @Test
    fun neighbouringSeedsDoNotCollideOnceRetriesAreInPlay() {
        val seen = mutableSetOf<List<PlacedWord>>()
        for (seed in 0 until 40) seen += buildGrid(terms, seed).words
        assertTrue("only ${seen.size} distinct arrangements across 40 seeds", seen.size > 35)
    }

    @Test
    fun termsThatCanNeverInterlockEnoughAreRefusedNotMadeIntoAStub() {
        // Nine usable terms, so the count gate passes, but they share no
        // letter and no arrangement can interlock a second one.
        val isolated = listOf("AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III")
            .map { GridTerm(it, "Clue for $it") }
        val grid = buildGrid(isolated, 6)
        assertEquals(0, grid.words.size)
        assertEquals(0, grid.width)
        assertEquals(0, grid.height)
        assertEquals(9, grid.skipped.size)
    }

    @Test
    fun answerNormalizationIgnoresCopyPastePresentationMarksConsistently() {
        assertEquals("NAIVETCELLSLOCK", normalizeTermGridAnswer("  naïve T-cell's β-lock  "))
        assertEquals("COTEDIVOIRE", normalizeTermGridAnswer("cóte d'ivoire"))
        assertEquals("E", normalizeTermGridLetter(" -é "))
    }

    @Test
    fun gridBuildingUsesTheSameNormalizationAsTypedAnswers() {
        val noisy = listOf(
            GridTerm("Anterior", "Toward the front"),
            GridTerm("post-erior", "Toward the back"),
            GridTerm("supérior", "Above"),
            GridTerm("in ferior", "Below"),
            GridTerm("medi'al", "Toward the midline"),
            GridTerm("late ral", "Away from the midline"),
            GridTerm("proximal", "Nearer the trunk"),
            GridTerm("distal", "Further from the trunk"),
            GridTerm("supine", "Lying face up"),
            GridTerm("prone", "Lying face down"),
        )
        val grid = buildGrid(noisy, 12)
        val reported = (grid.words.map { it.term } + grid.skipped).toSet()
        assertTrue(reported.contains("SUPERIOR"))
        assertTrue(reported.contains("INFERIOR"))
        assertTrue(grid.words.all { it.term.matches(Regex("^[A-Z]+$")) })
    }

    @Test
    fun exactlyTwoGivensAreSelectedDeterministicallyWhenAGridHasEnoughWords() {
        val grid = buildGrid(terms, 21)
        val givens = givenTermsForGrid(grid, 21)
        assertEquals(2, givens.size)
        assertEquals(givens, givenTermsForGrid(grid, 21))
        assertTrue(givens.all { term -> grid.words.any { it.term == term } })
    }

    @Test
    fun theBoardStaysSmallEnoughToSolveOnAPhone() {
        // A guard against sprawl regressing, not a magic number — matches
        // web's measured worst case (18 on the longest side, 255 squares
        // total across seeds 0-1999) with headroom.
        for (seed in 0 until 100) {
            val grid = buildGrid(terms, seed)
            assertTrue("seed $seed built ${grid.width}x${grid.height}", grid.width <= 22 && grid.height <= 22)
            assertTrue("seed $seed covers ${grid.width * grid.height} squares", grid.width * grid.height <= 320)
        }
    }
}
