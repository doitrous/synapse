package com.synapse.app.core.maristanas

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** Direct port of web's `src/data/maristanas.test.ts` — same vectors, same expected numbers. */
class MaristanaTest {

    @Test
    fun architecturalAchievementsEndExactlyWithTheTwentyFifthStage() {
        assertEquals(MARISTANA_STEPS, MARISTANA_MILESTONES.last().stage)
        assertEquals(listOf(1, 5, 10, 15, 20, 25), MARISTANA_MILESTONES.map { it.stage })
    }

    @Test
    fun theBuildRoadmapNamesEveryCommissionedConstructionFrame() {
        assertEquals(MARISTANA_STEPS, MARISTANA_BUILD_STEPS.size)
        assertEquals(MARISTANA_STEPS, MARISTANA_BUILD_STEPS.toSet().size)
    }

    @Test
    fun theDefaultModuleTargetBuildsRoughlyThreeHospitals() {
        val projected = projectedModuleHospitals()
        assertTrue("projected $projected", projected in 2.8..3.3)
    }

    @Test
    fun constructionAlwaysAdvancesInTwentyFiveFixedSteps() {
        val oneHospital = DEFAULT_MARISTANA_CONFIG.creditsPerStep * MARISTANA_STEPS
        val hospitals = maristanaHospitals(oneHospital + 450)
        assertEquals(25, hospitals[0].stage)
        assertEquals(true, hospitals[0].completed)
        assertEquals(4, hospitals[1].stage)
        assertEquals(0.5, hospitals[1].stepProgress, 0.0001)
    }

    @Test
    fun creditSourcesRemainSeparatelyExplainable() {
        val result = maristanaCredits(MaristanaEvidence(studyMinutes = 10, questionsAnswered = 5, correctAnswers = 4, assessmentScores = listOf(80.0)))
        assertEquals(MaristanaCreditBreakdown(study = 20, questions = 10, accuracy = 40, assessments = 120), result.breakdown)
        assertEquals(190, result.total)
    }

    @Test
    fun adminValuesAreBoundedBeforeTheyAffectProgression() {
        val safe = normaliseMaristanaConfig(
            MaristanaConfigInput(creditsPerStep = -5.0, creditsPerStudyMinute = 9999.0, assessmentMinimumQuestions = 2.0),
        )
        assertEquals(20.0, safe.creditsPerStep, 0.0001)
        assertEquals(100.0, safe.creditsPerStudyMinute, 0.0001)
        assertEquals(5, safe.assessmentMinimumQuestions)
    }

    @Test
    fun aProgressAcknowledgementReportsEarnedCreditAndDistanceToTheNextPart() {
        val previous = DEMO_MARISTANA_OVERVIEW.copy(
            totalCredits = 118,
            completedHospitals = 0,
            hospitals = maristanaHospitals(118),
        )
        val next = previous.copy(
            totalCredits = 130,
            hospitals = maristanaHospitals(130),
        )
        assertEquals(
            MaristanaProgressDelta(
                earnedCredits = 12,
                stepsPlaced = 0,
                hospitalName = "Maristana 01",
                stage = 1,
                nextStage = 2,
                creditsToNextStep = 70,
                stepProgress = 0.3,
                hospitalCompleted = false,
            ),
            maristanaProgressDelta(previous, next),
        )
        assertNull(maristanaProgressDelta(next, next))
    }
}
