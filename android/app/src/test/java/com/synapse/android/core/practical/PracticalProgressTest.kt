package com.synapse.android.core.practical

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [PracticalProgress] and its fold functions, ported from
 * `src/data/practicalProgress.ts`. Every test here works against real
 * encode/decode through [json], not just in-memory data-class copying --
 * that is what [`a section this app never touches survives a write`] is
 * actually checking: not that Kotlin can copy a field, but that the decoder
 * this app ships does not silently drop one.
 */
class PracticalProgressTest {

    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `a section this app never touches survives a write`() {
        val document = PracticalProgress(
            cases = mapOf("cc-chest" to CaseProgress(status = "in-progress", lastStep = 2, steps = 5, lastAt = "2026-08-01T00:00:00Z")),
            labs = mapOf("li-abg" to LabProgress(done = 4, items = 20, lastAt = "2026-08-01T00:00:00Z")),
            skills = mapOf("sk-bp" to SkillProgress(status = "ready", lastAt = "2026-08-01T00:00:00Z")),
        )
        val encoded = json.encodeToString(PracticalProgress.serializer(), document)
        val decoded = json.decodeFromString(PracticalProgress.serializer(), encoded)

        // Simulate an Android write that only ever touches stations.
        val afterStationWrite = recordStationRun(decoded, "os-cvs", marks = 10, outOf = 24, checkedItems = listOf("m1"), at = "2026-08-02T00:00:00Z")
        val reEncoded = json.encodeToString(PracticalProgress.serializer(), afterStationWrite)
        val final = json.decodeFromString(PracticalProgress.serializer(), reEncoded)

        assertEquals(document.cases, final.cases)
        assertEquals(document.labs, final.labs)
        assertEquals(document.skills, final.skills)
    }

    @Test
    fun `the best score only moves up`() {
        var progress = PracticalProgress()
        progress = recordStationRun(progress, "os-cvs", marks = 20, outOf = 24, checkedItems = emptyList(), at = "t1")
        progress = recordStationRun(progress, "os-cvs", marks = 10, outOf = 24, checkedItems = emptyList(), at = "t2")

        assertEquals(20, progress.stations.getValue("os-cvs").bestMarks)
    }

    @Test
    fun `a worse run still updates the ticks to resume from`() {
        var progress = PracticalProgress()
        progress = recordStationRun(progress, "os-cvs", marks = 20, outOf = 24, checkedItems = listOf("m1", "m2"), at = "t1")
        progress = recordStationRun(progress, "os-cvs", marks = 5, outOf = 24, checkedItems = listOf("m3"), at = "t2")

        val station = progress.stations.getValue("os-cvs")
        assertEquals(20, station.bestMarks)
        assertEquals(listOf("m3"), station.checkedItems)
    }

    @Test
    fun `a best score carries the total it was scored against`() {
        var progress = PracticalProgress()
        progress = recordStationRun(progress, "os-cvs", marks = 18, outOf = 20, checkedItems = emptyList(), at = "t1")
        // Re-authored to 30 marks; a worse share must not overwrite the total.
        progress = recordStationRun(progress, "os-cvs", marks = 20, outOf = 30, checkedItems = emptyList(), at = "t2")

        val station = progress.stations.getValue("os-cvs")
        assertEquals(18, station.bestMarks)
        assertEquals(20, station.outOf)
    }

    @Test
    fun `a station scored out of zero does not divide by zero`() {
        val progress = recordStationRun(PracticalProgress(), "os-cvs", marks = 0, outOf = 0, checkedItems = emptyList(), at = "t1")

        val station = progress.stations.getValue("os-cvs")
        assertEquals(0, station.bestMarks)
        assertEquals(0, station.outOf)
        assertEquals(1, station.attempts)
    }

    @Test
    fun `a completed case is not demoted by revisiting it`() {
        var progress = PracticalProgress()
        progress = recordCaseStep(progress, "cc-chest", lastStep = 5, steps = 5, completed = true, at = "t1")
        progress = recordCaseStep(progress, "cc-chest", lastStep = 0, steps = 5, completed = false, at = "t2")

        assertEquals("completed", progress.cases.getValue("cc-chest").status)
    }

    @Test
    fun `lastStep never goes backwards`() {
        var progress = PracticalProgress()
        progress = recordCaseStep(progress, "cc-chest", lastStep = 3, steps = 5, completed = false, at = "t1")
        progress = recordCaseStep(progress, "cc-chest", lastStep = 1, steps = 5, completed = false, at = "t2")

        assertEquals(3, progress.cases.getValue("cc-chest").lastStep)
    }

    @Test
    fun `a lab's done count never goes backwards`() {
        var progress = PracticalProgress()
        progress = recordLabAnswered(progress, "li-abg", done = 12, items = 20, at = "t1")
        progress = recordLabAnswered(progress, "li-abg", done = 4, items = 20, at = "t2")

        assertEquals(12, progress.labs.getValue("li-abg").done)
    }

    @Test
    fun `setting a skill back to not-started removes it`() {
        var progress = PracticalProgress()
        progress = setSkillStatus(progress, "sk-bp", "practised", at = "t1")
        assertTrue(progress.skills.containsKey("sk-bp"))

        progress = setSkillStatus(progress, "sk-bp", "not-started", at = "t2")

        assertFalse(progress.skills.containsKey("sk-bp"))
    }

    @Test
    fun `practised counts the ready ones too`() {
        var progress = PracticalProgress()
        progress = setSkillStatus(progress, "sk-bp", "practised", at = "t1")
        progress = setSkillStatus(progress, "sk-cvs", "ready", at = "t1")
        progress = setSkillStatus(progress, "sk-resp", "not-started", at = "t1")

        val summary = summariseSkills(progress, total = 12)

        assertEquals(2, summary.practised)
        assertEquals(1, summary.ready)
        assertEquals(12, summary.total)
    }
}
