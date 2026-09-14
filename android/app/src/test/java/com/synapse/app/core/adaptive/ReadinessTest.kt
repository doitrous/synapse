package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant
import kotlin.math.abs

/**
 * 1:1 port of `src/data/adaptive/readiness.test.ts` — every test vector, same
 * inputs, same expected numbers.
 */
class ReadinessTest {
    private val config = DEFAULT_ADAPTIVE_CONFIG

    private val nodes: List<BlueprintNode> = listOf("CON-0", "CON-1", "CON-2", "CON-3").mapIndexed { index, conceptId ->
        BlueprintNode(conceptId, conceptId, "GRP-${index % 2}", "Group ${index % 2}", 0.25, false)
    }
    private val nodeByConcept = nodes.associateBy { it.conceptId }

    private fun readinessPool(count: Int): List<AdaptiveItem> =
        (0 until count).map { index -> testItem(id = "r-$index", topic = "Topic ${index % 4}", mainConceptIds = listOf("CON-${index % 4}")) }

    private fun assemble(
        items: List<AdaptiveItem> = readinessPool(400),
        heldOut: Set<String> = items.map { it.id }.toSet(),
        lastPracticedAt: Map<String, String> = emptyMap(),
    ): ReadinessAssembly = assembleReadiness(
        items = items,
        heldOut = heldOut,
        nodes = nodes,
        nodeByConcept = nodeByConcept,
        scope = ItemScope(universityId = "UNI-1", yearId = "OMS_Y3"),
        lastPracticedAt = lastPracticedAt,
        config = config,
        assessmentId = "ra-1",
        now = Instant.parse(AT),
    )

    // ---- reservation --------------------------------------------------

    @Test
    fun `an admin flag reserves an item outright`() {
        val registry = EMPTY_HELD_OUT.copy(itemIds = listOf("r-1"), autoReserveEnabled = false)
        assertTrue(isHeldOut(testItem(id = "r-1"), registry, 100, config))
        assertFalse(isHeldOut(testItem(id = "r-2"), registry, 100, config))
    }

    @Test
    fun `auto-reserve is deterministic — the same item is reserved on every rebuild`() {
        val items = readinessPool(200)
        val first = heldOutIds(items, EMPTY_HELD_OUT, config)
        val second = heldOutIds(items, EMPTY_HELD_OUT, config)
        assertEquals(first.sorted(), second.sorted())
    }

    @Test
    fun `auto-reserve leaves small pools alone`() {
        // Reserving from a concept with three questions would leave a
        // blueprint node with nothing left to practise.
        val tiny = (0 until 3).map { index -> testItem(id = "t-$index", mainConceptIds = listOf("CON-0")) }
        assertEquals(0, heldOutIds(tiny, EMPTY_HELD_OUT, config).size)
    }

    @Test
    fun `auto-reserve can be turned off entirely`() {
        val items = readinessPool(200)
        val off = EMPTY_HELD_OUT.copy(autoReserveEnabled = false)
        assertEquals(0, heldOutIds(items, off, config).size)
    }

    @Test
    fun `auto-reserve holds back roughly the configured share`() {
        val items = readinessPool(400)
        val share = heldOutIds(items, EMPTY_HELD_OUT, config).size.toDouble() / items.size
        assertTrue("reserved $share", abs(share - config.readiness.autoReserveShare) < 0.08)
    }

    // ---- assembly -------------------------------------------------------

    @Test
    fun `an assessment draws only from held-out items`() {
        val items = readinessPool(400)
        val heldOut = items.take(100).map { it.id }.toSet()
        val assembly = assemble(items, heldOut)
        for (entry in assembly.items) assertTrue(heldOut.contains(entry.item.id))
    }

    @Test
    fun `an assessment is balanced across blueprint groups`() {
        val assembly = assemble()
        val counts = mutableMapOf<String, Int>()
        for (entry in assembly.items) counts[entry.groupId] = (counts[entry.groupId] ?: 0) + 1

        val expected = config.readiness.assessmentSize / 2.0
        for ((groupId, count) in counts) {
            assertTrue("$groupId got $count of an expected $expected", abs(count - expected) <= 1)
        }
    }

    @Test
    fun `consecutive items come from different blueprint groups where possible`() {
        val assembly = assemble()
        var runs = 0
        for (i in 1 until assembly.items.size) {
            if (assembly.items[i].groupId == assembly.items[i - 1].groupId) runs += 1
        }
        assertTrue("blocked topics let a student settle into one mode of thinking ($runs adjacencies)", runs <= 2)
    }

    @Test
    fun `recently practised items are excluded from measurement`() {
        val items = readinessPool(400)
        val lastPracticedAt = items.associate { it.id to AT }
        val assembly = assemble(items, lastPracticedAt = lastPracticedAt)
        assertEquals(0, assembly.items.size)

        val old = items.associate { it.id to daysAfter(-90.0) }
        assertTrue(assemble(items, lastPracticedAt = old).items.isNotEmpty())
    }

    @Test
    fun `an assessment reports what it could not represent rather than backfilling`() {
        // Every item sits in one blueprint group; the other has nothing to offer.
        val lopsided = (0 until 60).map { index -> testItem(id = "l-$index", mainConceptIds = listOf("CON-0")) }
        val assembly = assemble(items = lopsided, heldOut = lopsided.map { it.id }.toSet())

        val missing = assembly.underRepresented.find { it.groupId == "GRP-1" }
        assertTrue(missing != null)
        assertEquals(0, missing?.supplied)
        assertTrue((missing?.wanted ?: 0) > 0)

        // The critical part: the empty group's slots are NOT quietly handed
        // to the group that had plenty.
        assertTrue(
            "an assessment must come up short rather than pretend to be balanced",
            assembly.items.size < config.readiness.assessmentSize,
        )
        assertTrue(assembly.items.all { it.groupId == "GRP-0" })
    }

    @Test
    fun `assembly is reproducible from its id`() {
        assertEquals(assemble().items.map { it.item.id }, assemble().items.map { it.item.id })
    }

    @Test
    fun `an out-of-scope item never enters an assessment`() {
        val items = listOf(testItem(id = "r-wrong", years = listOf("OMS_Y1"), mainConceptIds = listOf("CON-0"))) + readinessPool(100)
        val assembly = assemble(items = items, heldOut = items.map { it.id }.toSet())
        assertFalse(assembly.items.any { it.item.id == "r-wrong" })
    }

    // ---- scoring ----------------------------------------------------------

    @Test
    fun `the Wilson interval stays inside the unit interval at the extremes`() {
        val perfect = wilsonInterval(20, 20, 0.9)
        assertTrue(perfect.upper <= 1)
        assertTrue(perfect.lower < 1)

        val none = wilsonInterval(0, 20, 0.9)
        assertTrue(none.lower >= 0)
        assertTrue(none.upper > 0)
    }

    @Test
    fun `the interval narrows as more questions are answered`() {
        val few = wilsonInterval(8, 10, 0.9)
        val many = wilsonInterval(80, 100, 0.9)
        assertTrue(many.upper - many.lower < few.upper - few.lower)
    }

    @Test
    fun `no answers at all yields the widest possible range, not a score of zero`() {
        val interval = wilsonInterval(0, 0, 0.9)
        assertEquals(Interval(0.0, 1.0), interval)
    }

    private fun answers(correct: Int, total: Int, groupId: String = "GRP-0"): List<ReadinessAnswer> =
        (0 until total).map { index -> ReadinessAnswer("r-$index", groupId, index < correct, 60.0, false) }

    @Test
    fun `a result is reported as a range, never a point score`() {
        val assembly = assemble()
        val result = scoreReadiness(assembly, answers(30, 40), emptyMap(), config, 1, AT)
        assertTrue(result.upper > result.lower)
        assertTrue(readinessSentence(result).contains("between"))
    }

    @Test
    fun `an omission is excluded from accuracy but reported separately`() {
        val assembly = assemble()
        val withBlanks = answers(10, 20) + (0 until 10).map { index -> ReadinessAnswer("blank-$index", "GRP-0", false, null, true) }
        val result = scoreReadiness(assembly, withBlanks, emptyMap(), config, 1, AT)
        assertEquals(20, result.answered)
        assertEquals(10, result.omitted)

        val asWrong = scoreReadiness(assembly, answers(10, 30), emptyMap(), config, 1, AT)
        assertTrue("counting blanks as wrong would fold pacing into knowledge", result.lower > asWrong.lower)
    }

    @Test
    fun `a topic with too few answers reports no interval rather than a meaningless one`() {
        val assembly = assemble()
        val sparse = answers(15, 20, "GRP-0") + answers(1, 2, "GRP-1")
        val result = scoreReadiness(assembly, sparse, mapOf("GRP-1" to "Group 1"), config, 1, AT)
        val thin = result.groups.find { it.groupId == "GRP-1" }
        assertNull(thin?.lower)
        assertTrue(thin?.insufficient == true)

        val solid = result.groups.find { it.groupId == "GRP-0" }
        assertTrue(solid?.lower != null && solid.upper != null)
    }

    @Test
    fun `a result carries the config and blueprint versions it was produced under`() {
        val result = scoreReadiness(assemble(), answers(30, 40), emptyMap(), config, 7, AT)
        assertEquals(config.version, result.configVersion)
        assertEquals(7, result.blueprintVersion)
    }

    @Test
    fun `with no assessment, the sentence refuses to substitute practice accuracy`() {
        val sentence = readinessSentence(null)
        assertTrue(sentence.contains("not a substitute"))
        assertTrue(sentence.lowercase().contains("oversample"))
    }

    @Test
    fun `calibration needs both confident and unconfident answers to mean anything`() {
        assertNull(calibrationError(emptyList()))
        assertNull(calibrationError(listOf(CalibrationAnswer(correct = true, confident = true, omitted = false))))

        val wellCalibrated = calibrationError(
            listOf(
                CalibrationAnswer(true, true, false),
                CalibrationAnswer(true, true, false),
                CalibrationAnswer(false, false, false),
                CalibrationAnswer(false, false, false),
            ),
        )
        val confidentlyWrong = calibrationError(
            listOf(
                CalibrationAnswer(false, true, false),
                CalibrationAnswer(false, true, false),
                CalibrationAnswer(true, false, false),
                CalibrationAnswer(true, false, false),
            ),
        )
        assertTrue("being sure and wrong is the worse calibration", (wellCalibrated ?: 1.0) < (confidentlyWrong ?: 0.0))
    }

    @Test
    fun `a readiness assembly and an adaptive pool never overlap`() {
        // The separation the whole product rests on, stated as a test.
        val items = readinessPool(200) + testPool(100)
        val held = heldOutIds(items, EMPTY_HELD_OUT, config)
        val assembly = assemble(items = items, heldOut = held)
        for (entry in assembly.items) {
            assertTrue("every assessed item is reserved, so practice can never have used it", held.contains(entry.item.id))
        }
    }
}
