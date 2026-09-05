package com.nishany.android.core.adaptive

import com.nishany.android.core.adaptive.AdaptiveTestData.node
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class CoverageTest {

    private val config = AdaptiveConfig.DEFAULT

    private val nodes = listOf(
        node("c1", 0.5, "gA", "Group A"),
        node("c2", 0.3, "gA", "Group A"),
        node("c3", 0.2, "gB", "Group B"),
    )

    @Test
    fun `covered weight sums the weight of touched concepts only`() {
        val state = Coverage.state(nodes, mapOf("c1" to 2, "c3" to 0))
        assertEquals(0.5, state.coveredWeight, 1e-9)
        assertEquals(0.5, state.uncoveredWeight, 1e-9)
    }

    @Test
    fun `uncovered concepts are listed heaviest first`() {
        val state = Coverage.state(nodes, emptyMap())
        assertEquals(listOf("c1", "c2", "c3"), state.uncoveredConcepts.map { it.conceptId })
    }

    @Test
    fun `groups aggregate weight and sort by weight descending`() {
        val state = Coverage.state(nodes, mapOf("c1" to 1))
        assertEquals(listOf("gA", "gB"), state.groups.map { it.groupId })
        val gA = state.groups.first { it.groupId == "gA" }
        assertEquals(0.8, gA.weight, 1e-9)
        assertEquals(0.5, gA.coveredWeight, 1e-9)
        assertEquals(1, gA.uncovered) // c2 untouched
    }

    @Test
    fun `max debt repayment spreads over the rolling window`() {
        // 40-item block over a 4-block window -> ~10 per block.
        assertEquals(10, Coverage.maxDebtRepayment(40, config))
        assertTrue(Coverage.maxDebtRepayment(1, config) >= 1)
    }

    @Test
    fun `debt decays toward zero as blocks pass`() {
        val start = CoverageDebt(slots = 8.0, blocks = 0)
        val after = Coverage.debtAfterBlock(start, targeted = 0.0, served = 0.0, config = config, at = "t")
        // Window is 4, so outstanding * (1 - 1/4) = 8 * 0.75.
        assertEquals(6.0, after.slots, 1e-9)
        assertEquals(1, after.blocks)
    }

    @Test
    fun `debt grows when a block under-serves coverage`() {
        val after = Coverage.debtAfterBlock(CoverageDebt.EMPTY, targeted = 10.0, served = 4.0, config = config, at = "t")
        assertTrue(after.slots > 0)
    }

    @Test
    fun `blueprint deficit falls off as a concept gets more evidence`() {
        val weights = mapOf("c1" to 0.5)
        val fresh = Coverage.blueprintDeficit(listOf("c1"), weights, emptyMap())
        val seen = Coverage.blueprintDeficit(listOf("c1"), weights, mapOf("c1" to 5))
        assertTrue(fresh > seen)
    }
}
