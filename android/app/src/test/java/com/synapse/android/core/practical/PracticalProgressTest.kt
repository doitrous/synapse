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

    /**
     * A `synapse.practical.progress.v1` document as the *web* leaves it --
     * not as Kotlin would encode it. That distinction is the whole test:
     * anything built from [PracticalProgress] can only contain fields Kotlin
     * declares, so round-tripping one proves nothing about the documents
     * this app will actually be handed.
     *
     * `lastScorePct` and `updatedAt` below are real-shaped fields Kotlin does
     * not declare.
     */
    private val webWritten = """
        {
          "version": 1,
          "updatedAt": "2026-08-01T09:12:44.000Z",
          "stations": {},
          "cases": {
            "cc-chest": {"status":"in-progress","lastStep":2,"steps":5,"lastAt":"2026-08-01T00:00:00Z"}
          },
          "labs": {
            "li-abg": {"done":4,"items":20,"lastAt":"2026-08-01T00:00:00Z","lastScorePct":80}
          },
          "skills": {
            "sk-bp": {"status":"ready","lastAt":"2026-08-01T00:00:00Z"}
          }
        }
    """.trimIndent()

    @Test
    fun `a section this app never touches survives a write`() {
        val decoded = json.decodeFromString(PracticalProgress.serializer(), webWritten)

        // Simulate an Android write that only ever touches stations.
        val afterStationWrite = recordStationRun(decoded, "os-cvs", marks = 10, outOf = 24, checkedItems = listOf("m1"), at = "2026-08-02T00:00:00Z")
        val reEncoded = json.encodeToString(PracticalProgress.serializer(), afterStationWrite)
        val final = json.decodeFromString(PracticalProgress.serializer(), reEncoded)

        assertEquals(
            CaseProgress(status = "in-progress", lastStep = 2, steps = 5, lastAt = "2026-08-01T00:00:00Z"),
            final.cases.getValue("cc-chest"),
        )
        assertEquals(LabProgress(done = 4, items = 20, lastAt = "2026-08-01T00:00:00Z"), final.labs.getValue("li-abg"))
        assertEquals(SkillProgress(status = "ready", lastAt = "2026-08-01T00:00:00Z"), final.skills.getValue("sk-bp"))
        assertEquals(10, final.stations.getValue("os-cvs").bestMarks)
    }

    @Test
    fun `what an Android write does not preserve is the document growing`() {
        // The honest limit of ignoreUnknownKeys, pinned so the KDoc on
        // PracticalProgress cannot drift back to overclaiming. A key Kotlin
        // does not declare gets through the decoder and is then dropped,
        // because nothing carries it to the encoder -- and a whole new
        // top-level section a later client adds is such a key. Making this
        // test fail is the point at which Android is ready for one.
        val withNewSection = webWritten.replace(
            """  "skills": {""",
            """  "vivas": {"vv-cvs": {"status":"ready","lastAt":"2026-08-01T00:00:00Z"}},
  "skills": {""",
        )
        val decoded = json.decodeFromString(PracticalProgress.serializer(), withNewSection)
        val reEncoded = json.encodeToString(
            PracticalProgress.serializer(),
            recordStationRun(decoded, "os-cvs", marks = 10, outOf = 24, checkedItems = emptyList(), at = "t1"),
        )

        assertTrue(withNewSection.contains("vivas"))
        assertFalse(reEncoded.contains("vivas"))
        assertFalse(reEncoded.contains("lastScorePct"))
        assertFalse(reEncoded.contains("updatedAt"))
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
    fun `an equal share is the better run, so the newer mark total wins`() {
        var progress = PracticalProgress()
        progress = recordStationRun(progress, "os-cvs", marks = 9, outOf = 10, checkedItems = emptyList(), at = "t1")
        // Re-authored out of 20, sat again, same 90% share. `>=`, not `>`:
        // the student's record should follow the station they actually sat,
        // and "18 / 20" is the honest way to show today's 90%.
        progress = recordStationRun(progress, "os-cvs", marks = 18, outOf = 20, checkedItems = emptyList(), at = "t2")

        val station = progress.stations.getValue("os-cvs")
        assertEquals(18, station.bestMarks)
        assertEquals(20, station.outOf)
        assertEquals(2, station.attempts)
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
