package com.synapse.app.core.practical

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** Fold-function + wire-shape tests for [PracticalProgress], mirroring `SynapseTests/PracticalProgressTests.swift`. */
class PracticalProgressTest {

    private val json = Json { ignoreUnknownKeys = true }

    // --- recordStation ---------------------------------------------------------

    @Test
    fun recordStationStartsAtOneAttemptWithTheGivenScore() {
        val next = PracticalProgress().recordStation("os-cvs", marks = 18, outOf = 24, checkedItems = listOf("a", "b"), at = "t1")

        val station = next.stations.getValue("os-cvs")
        assertEquals(1, station.attempts)
        assertEquals(18, station.bestMarks)
        assertEquals(24, station.outOf)
        assertEquals(listOf("a", "b"), station.checkedItems)
    }

    @Test
    fun recordStationKeepsTheBetterOfTwoRunsButAlwaysBumpsAttempts() {
        val first = PracticalProgress().recordStation("os-cvs", marks = 18, outOf = 24, checkedItems = listOf("a"), at = "t1")

        val worse = first.recordStation("os-cvs", marks = 10, outOf = 24, checkedItems = listOf("b"), at = "t2")
        assertEquals(2, worse.stations.getValue("os-cvs").attempts)
        assertEquals(18, worse.stations.getValue("os-cvs").bestMarks)

        val better = first.recordStation("os-cvs", marks = 22, outOf = 24, checkedItems = listOf("c"), at = "t3")
        assertEquals(22, better.stations.getValue("os-cvs").bestMarks)
    }

    @Test
    fun recordStationDoesNotLetAReAuthoredLowerTotalInflateAnOldPercentage() {
        // 18/20 (90%) stands; a fresh 10/12 (83%) run must not overwrite it as "better".
        val withHistory = PracticalProgress().recordStation("os-cvs", marks = 18, outOf = 20, checkedItems = emptyList(), at = "t1")

        val next = withHistory.recordStation("os-cvs", marks = 10, outOf = 12, checkedItems = emptyList(), at = "t2")

        assertEquals(18, next.stations.getValue("os-cvs").bestMarks)
        assertEquals(20, next.stations.getValue("os-cvs").outOf)
    }

    // --- recordCase --------------------------------------------------------------

    @Test
    fun recordCaseIsInProgressUntilCompletedIsTrue() {
        val next = PracticalProgress().recordCase("cc-chest", lastStep = 2, steps = 5, completed = false, at = "t1")

        assertEquals(PracticalProgress.CaseStatus.IN_PROGRESS, next.cases.getValue("cc-chest").status)
        assertEquals(2, next.cases.getValue("cc-chest").lastStep)
    }

    @Test
    fun recordCaseNeverDemotesACompletedCaseBackToInProgress() {
        val completed = PracticalProgress().recordCase("cc-chest", lastStep = 5, steps = 5, completed = true, at = "t1")

        val revisited = completed.recordCase("cc-chest", lastStep = 1, steps = 5, completed = false, at = "t2")

        assertEquals(PracticalProgress.CaseStatus.COMPLETED, revisited.cases.getValue("cc-chest").status)
        // lastStep only moves forward.
        assertEquals(5, revisited.cases.getValue("cc-chest").lastStep)
    }

    // --- setSkillStatus / statusOfSkill -------------------------------------------

    @Test
    fun setSkillStatusCyclesThroughTheThreeStates() {
        assertEquals(PracticalProgress.SkillStatus.PRACTISED, PracticalProgress.SkillStatus.NOT_STARTED.next)
        assertEquals(PracticalProgress.SkillStatus.READY, PracticalProgress.SkillStatus.PRACTISED.next)
        assertEquals(PracticalProgress.SkillStatus.NOT_STARTED, PracticalProgress.SkillStatus.READY.next)
    }

    @Test
    fun settingASkillBackToNotStartedRemovesItsRecordRatherThanStoringIt() {
        val practised = PracticalProgress().setSkillStatus("sk-bp", PracticalProgress.SkillStatus.PRACTISED, at = "t1")
        assertEquals(PracticalProgress.SkillStatus.PRACTISED, practised.statusOfSkill("sk-bp"))

        val reset = practised.setSkillStatus("sk-bp", PracticalProgress.SkillStatus.NOT_STARTED, at = "t2")

        assertTrue(reset.skills.isEmpty())
        assertEquals(PracticalProgress.SkillStatus.NOT_STARTED, reset.statusOfSkill("sk-bp"))
    }

    // --- wire round-trip -----------------------------------------------------------

    @Test
    fun decodesTheWebIosWireShapeVerbatim() {
        val wire = """{
            "version":1,
            "stations":{"os-cvs":{"attempts":2,"bestMarks":18,"outOf":24,"lastAt":"t","checkedItems":["a"]}},
            "cases":{"cc-chest":{"status":"in-progress","lastStep":2,"steps":5,"lastAt":"t"}},
            "labs":{},
            "skills":{"sk-bp":{"status":"ready","lastAt":"t"}}
        }"""

        val decoded = json.decodeFromString(PracticalProgress.serializer(), wire)

        assertEquals(18, decoded.stations.getValue("os-cvs").bestMarks)
        assertEquals(PracticalProgress.CaseStatus.IN_PROGRESS, decoded.cases.getValue("cc-chest").status)
        assertEquals(PracticalProgress.SkillStatus.READY, decoded.skills.getValue("sk-bp").status)
    }
}
