package com.synapse.app.core.minigames

import com.synapse.app.core.taxonomy.TaxonomyTerm
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Ported from web's `src/data/termMatch.test.ts`, same fixtures and assertions. */
class TermMatchTest {

    /** Eight fully-populated terms — enough to clear MIN_PAIRS on their own. */
    private val terms = listOf(
        term("anterior", "Anterior", "أمامي", "Toward the front of the body."),
        term("posterior", "Posterior", "خلفي", "Toward the back of the body."),
        term("superior", "Superior", "علوي", "Above, toward the head."),
        term("inferior", "Inferior", "سفلي", "Below, toward the feet."),
        term("medial", "Medial", "إنسي", "Closer to the midline of the body."),
        term("lateral", "Lateral", "وحشي", "Farther from the midline, toward the side."),
        term("proximal", "Proximal", "قريب", "Closer to the point of attachment or trunk."),
        term("distal", "Distal", "بعيد", "Farther from the point of attachment."),
    )

    private val termsWithBlankArabic = terms + term(
        "no-arabic", "Sepsis", "", "A dangerous whole-body response to infection.", category = "Common conditions",
    )

    /** Only five usable terms — below MIN_PAIRS. */
    private val tooFew = terms.take(5)

    private fun term(id: String, name: String, ar: String, def: String, category: String = "Directional & anatomy") =
        TaxonomyTerm(id = id, term = name, arabic = ar, category = category, definition = def, definitionAr = "x", example = null)

    @Test
    fun sameTermsModeAndSeedBuildAnIdenticalBoard() {
        assertEquals(buildMatchBoard(terms, MatchMode.DEFINITION, 42), buildMatchBoard(terms, MatchMode.DEFINITION, 42))
    }

    @Test
    fun aDifferentSeedReordersTheTiles() {
        val a = buildMatchBoard(terms, MatchMode.DEFINITION, 1)
        val b = buildMatchBoard(terms, MatchMode.DEFINITION, 2)
        assertNotEquals(a.tiles, b.tiles)
    }

    @Test
    fun aBoardHasTwoTilesPerPair() {
        val board = buildMatchBoard(terms, MatchMode.DEFINITION, 7)
        assertEquals(terms.size, board.pairs)
        assertEquals(board.pairs * 2, board.tiles.size)
    }

    @Test
    fun everyPairIdAppearsExactlyTwiceOncePerSide() {
        val board = buildMatchBoard(terms, MatchMode.DEFINITION, 7)
        val bySide = board.tiles.groupBy { it.pairId }.mapValues { (_, tiles) -> tiles.map { it.side }.toSet() }
        val counts = board.tiles.groupingBy { it.pairId }.eachCount()
        for ((pairId, sides) in bySide) {
            assertEquals(2, counts.getValue(pairId))
            assertEquals(setOf(MatchSide.TERM, MatchSide.PARTNER), sides)
        }
    }

    @Test
    fun termsStayFixedOnLeftAndPartnersAreShuffledOnRight() {
        val board = buildMatchBoard(terms, MatchMode.DEFINITION, 7)
        assertEquals(board.pairs, board.termTiles.size)
        assertEquals(board.pairs, board.partnerTiles.size)
        assertTrue(board.termTiles.all { it.side == MatchSide.TERM })
        assertTrue(board.partnerTiles.all { it.side == MatchSide.PARTNER })
        assertEquals(board.termTiles + board.partnerTiles, board.tiles)
        assertNotEquals(board.partnerTiles.map { it.pairId }, board.termTiles.map { it.pairId })
    }

    @Test
    fun isPairAcceptsTwoTilesThatShareAPairIdAndDifferInSide() {
        val a = MatchTile("a", "p1", "x", MatchSide.TERM)
        val b = MatchTile("b", "p1", "y", MatchSide.PARTNER)
        assertTrue(isPair(a, b))
        assertTrue(isPair(b, a))
    }

    @Test
    fun isPairRejectsTwoTilesOnTheSameSide() {
        val a = MatchTile("a", "p1", "x", MatchSide.TERM)
        val b = MatchTile("b", "p1", "y", MatchSide.TERM)
        assertTrue(!isPair(a, b))
    }

    @Test
    fun isPairRejectsTilesFromDifferentPairs() {
        val a = MatchTile("a", "p1", "x", MatchSide.TERM)
        val b = MatchTile("b", "p2", "y", MatchSide.PARTNER)
        assertTrue(!isPair(a, b))
    }

    @Test
    fun isPairRejectsATilePairedWithItself() {
        val a = MatchTile("a", "p1", "x", MatchSide.TERM)
        assertTrue(!isPair(a, a))
    }

    @Test
    fun buildsABoardInArabicMode() {
        val board = buildMatchBoard(terms, MatchMode.ARABIC, 3)
        assertEquals(null, board.refusal)
        assertEquals(MatchMode.ARABIC, board.mode)
        assertEquals(terms.size * 2, board.tiles.size)
    }

    @Test
    fun buildsABoardInDefinitionMode() {
        val board = buildMatchBoard(terms, MatchMode.DEFINITION, 3)
        assertEquals(null, board.refusal)
        assertEquals(MatchMode.DEFINITION, board.mode)
        assertEquals(terms.size * 2, board.tiles.size)
    }

    @Test
    fun aTermWithABlankArabicTranslationIsSkippedInArabicMode() {
        val board = buildMatchBoard(termsWithBlankArabic, MatchMode.ARABIC, 9)
        assertEquals(null, board.refusal)
        assertTrue(board.tiles.none { it.pairId == "no-arabic" })
        assertEquals(terms.size, board.pairs)
    }

    @Test
    fun thatSameTermIsNotSkippedInDefinitionModeSinceItsDefIsPresent() {
        val board = buildMatchBoard(termsWithBlankArabic, MatchMode.DEFINITION, 9)
        assertTrue(board.tiles.any { it.pairId == "no-arabic" })
    }

    @Test
    fun fewerThanMinPairsUsableTermsProducesARefusalAndNoTiles() {
        assertTrue(tooFew.size < MIN_PAIRS)
        val board = buildMatchBoard(tooFew, MatchMode.DEFINITION, 9)
        assertEquals(MatchRefusal.TOO_FEW_TERMS, board.refusal)
        assertEquals(0, board.tiles.size)
        assertEquals(0, board.pairs)
    }

    @Test
    fun arabicTilesAreFlaggedInArabicModeOnly() {
        val arabicBoard = buildMatchBoard(terms, MatchMode.ARABIC, 5)
        val partnerTiles = arabicBoard.tiles.filter { it.side == MatchSide.PARTNER }
        assertTrue(partnerTiles.isNotEmpty())
        assertTrue(partnerTiles.all { it.arabic })
        val termTiles = arabicBoard.tiles.filter { it.side == MatchSide.TERM }
        assertTrue(termTiles.none { it.arabic })

        val definitionBoard = buildMatchBoard(terms, MatchMode.DEFINITION, 5)
        assertTrue(definitionBoard.tiles.none { it.arabic })
    }

    @Test
    fun defaultPairsCapsTheBoardSizeWhenMoreTermsAreOffered() {
        val extra = terms + listOf(
            term("extra-1", "Extra1", "شيء", "An extra term.", category = "Word parts"),
            term("extra-2", "Extra2", "شيء آخر", "Another extra term.", category = "Word parts"),
            term("extra-3", "Extra3", "شيء ثالث", "A third extra term.", category = "Word parts"),
        )
        val board = buildMatchBoard(extra, MatchMode.DEFINITION, 5)
        assertEquals(DEFAULT_PAIRS, board.pairs)
        assertEquals(DEFAULT_PAIRS * 2, board.tiles.size)
    }
}
