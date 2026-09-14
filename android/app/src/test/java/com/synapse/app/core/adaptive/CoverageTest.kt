package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * `coverage.ts` has no dedicated `*.test.ts` on the web either — these are
 * sanity checks on the ported weight/debt arithmetic.
 */
class CoverageTest {
    private val config = DEFAULT_ADAPTIVE_CONFIG

    private val nodes = listOf(
        BlueprintNode("CON-A", "A", "GRP-0", "Group 0", 0.5, false),
        BlueprintNode("CON-B", "B", "GRP-0", "Group 0", 0.25, false),
        BlueprintNode("CON-C", "C", "GRP-1", "Group 1", 0.25, false),
    )

    @Test
    fun `coverageState counts only the weight of touched concepts`() {
        val state = coverageState(nodes, mapOf("CON-A" to 2))
        assertEquals(0.5, state.coveredWeight, 1e-9)
        assertEquals(0.5, state.uncoveredWeight, 1e-9)
        assertEquals(setOf("CON-B", "CON-C"), state.uncoveredConcepts.map { it.conceptId }.toSet())
    }

    @Test
    fun `debtAfterBlock grows when a block is under-served and decays over the window`() {
        val debt = debtAfterBlock(EMPTY_COVERAGE_DEBT, targeted = 8.0, served = 5.0, config = config, at = AT)
        // Outstanding 3, decayed by the 4-block rolling window: 3 * (1 - 1/4) = 2.25.
        assertEquals(2.25, debt.slots, 1e-9)
        assertEquals(1, debt.blocks)
    }

    @Test
    fun `maxDebtRepayment spreads a debt across the rolling window rather than one block`() {
        assertEquals(5, maxDebtRepayment(20, config)) // 20 / 4-block window
    }

    @Test
    fun `blueprintDeficit falls off as a concept gets more items`() {
        val weights = mapOf("CON-A" to 0.5, "CON-B" to 0.25)
        val untouched = blueprintDeficit(listOf("CON-A"), weights, emptyMap())
        val onceTouched = blueprintDeficit(listOf("CON-A"), weights, mapOf("CON-A" to 1))
        assertTrue(untouched > onceTouched)
        assertEquals(0.0, blueprintDeficit(listOf("CON-X"), weights, emptyMap()), 1e-9)
    }

    @Test
    fun `groupGap ignores the concept's own weight and only reports the rest of the group`() {
        val nodeByConcept = nodes.associateBy { it.conceptId }
        val state = coverageState(nodes, mapOf("CON-A" to 1))
        // CON-A's own group (GRP-0) has an untouched sibling, CON-B.
        val gap = groupGap(listOf("CON-A"), nodeByConcept, state)
        assertTrue(gap > 0)
        // A concept alone in its group has no siblings to report a gap for.
        assertEquals(0.0, groupGap(listOf("CON-C"), nodeByConcept, state), 1e-9)
    }
}
