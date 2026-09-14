package com.synapse.app.core.minigames

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Ported from web's `src/data/minigamePacks.test.ts`, same assertions, same fixtures. */
class MinigamePacksTest {

    @Test
    fun everyLocalPackIsExplicitlyReviewedAndValid() {
        assertTrue(MINI_GAME_PACKS.size >= 3)
        for (pack in MINI_GAME_PACKS) {
            assertEquals(emptyList<String>(), validateMiniGamePack(pack))
            assertTrue(pack.source.label.isNotBlank())
            assertTrue(pack.source.reviewedBy.isNotBlank())
        }
    }

    @Test
    fun eachRequestedAuthoredMedicineGameHasAValidLocalPack() {
        assertTrue(validMiniGamePacks(MiniGameKind.CLINICAL_SEQUENCE).isNotEmpty())
        assertTrue(validMiniGamePacks(MiniGameKind.MECHANISM_CHAIN).isNotEmpty())
        assertTrue(validMiniGamePacks(MiniGameKind.RED_FLAG_SORT).isNotEmpty())
    }

    @Test
    fun orderedGamesShuffleDeterministicallyWithoutChangingAuthoredAnswers() {
        val pack = validMiniGamePacks(MiniGameKind.CLINICAL_SEQUENCE).first() as OrderedMiniGamePack
        val a = shuffledStepIds(pack, 12)
        val b = shuffledStepIds(pack, 12)
        assertEquals(a, b)
        assertEquals(pack.steps.map { it.id }.sorted(), a.sorted())
        assertEquals(
            OrderedStepScore(
                exactPositions = pack.steps.size,
                total = pack.steps.size,
                complete = true,
                correct = pack.steps.map { it.id },
            ),
            scoreOrderedSteps(pack, pack.steps.map { it.id }),
        )
    }

    /**
     * Exact shuffle output for seed 12 over the clinical-sequence pack,
     * cross-checked against web's `seededRandom`/`shuffle` run on the same
     * pack and seed via Node — pins the Kotlin port to the identical
     * bit-for-bit sequence, not merely "a" deterministic one.
     */
    @Test
    fun shuffledStepIdsMatchesTheWebReferenceSequenceForSeedTwelve() {
        val pack = validMiniGamePacks(MiniGameKind.CLINICAL_SEQUENCE).first() as OrderedMiniGamePack
        assertEquals(
            listOf("danger", "compressions", "response", "breathing", "airway", "aed"),
            shuffledStepIds(pack, 12),
        )
    }

    @Test
    fun orderedScoringReportsExactPositionMatchesOnly() {
        val pack = validMiniGamePacks(MiniGameKind.MECHANISM_CHAIN).first() as OrderedMiniGamePack
        val submitted = pack.steps.map { it.id }.reversed()
        val score = scoreOrderedSteps(pack, submitted)
        assertEquals(pack.steps.size, score.total)
        assertTrue(score.exactPositions < pack.steps.size)
        assertTrue(score.complete)
    }

    @Test
    fun redFlagSortScoringUsesAuthoredLanesAndRationales() {
        val pack = validMiniGamePacks(MiniGameKind.RED_FLAG_SORT).first() as RedFlagSortPack
        val placements = pack.findings.associate { it.id to it.lane }
        val score = scoreRedFlagSort(pack, placements)
        assertEquals(pack.findings.size, score.correct)
        assertEquals(pack.findings.size, score.total)
        assertTrue(score.results.all { it.correct && it.finding.rationale.isNotEmpty() })
    }

    @Test
    fun invalidPacksAreRefusedByValidationBeforeTheUiCanUseThem() {
        val pack = OrderedMiniGamePack(
            id = "bad",
            kind = MiniGameKind.CLINICAL_SEQUENCE,
            title = "",
            subjectId = "",
            topic = "Nowhere",
            summary = "Broken fixture",
            prompt = "Broken",
            source = MiniGameSource(label = "", reviewedBy = ""),
            steps = listOf(OrderedStep("x", "")),
            explanation = "",
        )
        val errors = validateMiniGamePack(pack)
        assertTrue(errors.size >= 4)
    }
}
