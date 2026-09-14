package com.synapse.app.core.minigames

import com.synapse.app.core.taxonomy.TaxonomyTerm
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [buildSpotterGame] is an Android-specific adaptation (see its KDoc for
 * why), so these are original tests rather than a web port — but they mirror
 * the same guarantees web's `spotter.test.ts` checks for the histology
 * version: determinism, a floor before refusing, and options that never
 * duplicate or omit the answer.
 */
class SpotterTest {

    private fun term(id: String, name: String, category: String, def: String = "Definition of $name.") =
        TaxonomyTerm(id = id, term = name, arabic = "", category = category, definition = def, definitionAr = "", example = null)

    /** Eight distinct terms across two categories — enough to clear the floor with same-category distractors available. */
    private val terms = listOf(
        term("anterior", "Anterior", "Directional"),
        term("posterior", "Posterior", "Directional"),
        term("superior", "Superior", "Directional"),
        term("inferior", "Inferior", "Directional"),
        term("medial", "Medial", "Directional"),
        term("lateral", "Lateral", "Directional"),
        term("sepsis", "Sepsis", "Conditions"),
        term("pneumonia", "Pneumonia", "Conditions"),
    )

    @Test
    fun sameTermsAndSeedBuildAnIdenticalGame() {
        assertEquals(buildSpotterGame(terms, 42), buildSpotterGame(terms, 42))
    }

    @Test
    fun aDifferentSeedReordersTheRounds() {
        val a = buildSpotterGame(terms, 1)
        val b = buildSpotterGame(terms, 2)
        assertNotEquals(a.rounds, b.rounds)
    }

    @Test
    fun everyRoundOffersExactlyFourDistinctOptionsIncludingTheAnswer() {
        val game = buildSpotterGame(terms, 7)
        assertTrue(game.rounds.isNotEmpty())
        for (round in game.rounds) {
            assertEquals(SPOTTER_OPTIONS_PER_ROUND, round.options.size)
            assertEquals(round.options.toSet().size, round.options.size)
            assertTrue(round.options.contains(round.answer))
        }
    }

    @Test
    fun roundsNeverExceedTheRequestedCeiling() {
        val game = buildSpotterGame(terms, 5, rounds = 3)
        assertTrue(game.rounds.size <= 3)
    }

    @Test
    fun everyTermAskedIsAskedAtMostOnce() {
        val game = buildSpotterGame(terms, 9, rounds = SPOTTER_ROUNDS)
        val askedIds = game.rounds.map { it.termId }
        assertEquals(askedIds.toSet().size, askedIds.size)
    }

    @Test
    fun fewerThanTheFloorOfDistinctTermsIsRefused() {
        val tooFew = terms.take(3)
        val game = buildSpotterGame(tooFew, 3)
        assertEquals(SpotterRefusal.TOO_FEW_TERMS, game.refusal)
        assertTrue(game.rounds.isEmpty())
    }

    @Test
    fun aTermWithNoDefinitionIsNeverAskedAsAPrompt() {
        val withBlank = terms + term("blank", "Blank", "Directional", def = "")
        val game = buildSpotterGame(withBlank, 4, rounds = SPOTTER_ROUNDS)
        assertTrue(game.rounds.none { it.termId == "blank" })
    }
}
