package com.synapse.android.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class AllocationTest {

    private val config = AdaptiveConfig.DEFAULT

    @Test
    fun `apportion always distributes exactly the block size`() {
        val shares = AllocationShares(0.40, 0.35, 0.15, 0.10)
        for (size in listOf(20, 22, 31, 40)) {
            val (targets, _) = Allocation.apportion(size, shares)
            assertEquals("size $size", size, targets.total)
        }
    }

    @Test
    fun `largest-remainder gives the spare slot to the closest need`() {
        // size 10, shares .34/.33/.33/0 -> floors 3/3/3/0 = 9, spare 1 to weakness (.4 remainder).
        val (targets, _) = Allocation.apportion(10, AllocationShares(0.34, 0.33, 0.33, 0.0))
        assertEquals(10, targets.total)
        assertEquals(4, targets[AllocationNeed.WEAKNESS])
    }

    @Test
    fun `debt is repaid into coverage from weakness first, then uncertainty`() {
        val shares = AllocationShares(0.40, 0.20, 0.20, 0.20)
        val plan = Allocation.plan(
            size = 20,
            shares = shares,
            debt = CoverageDebt(slots = 3.0),
            config = config,
        )
        assertTrue("some debt repaid", plan.debtRepaid > 0)
        val base = Allocation.apportion(20, shares).first
        // Coverage rose by exactly what was repaid; review never donated.
        assertEquals(base[AllocationNeed.COVERAGE] + plan.debtRepaid, plan.targets[AllocationNeed.COVERAGE])
        assertEquals(base[AllocationNeed.REVIEW], plan.targets[AllocationNeed.REVIEW])
        assertEquals(20, plan.targets.total)
    }

    @Test
    fun `block size is clamped into the configured range`() {
        assertEquals(config.constraints.minBlockSize, Allocation.clampBlockSize(5, config))
        assertEquals(config.constraints.maxBlockSize, Allocation.clampBlockSize(999, config))
        assertEquals(30, Allocation.clampBlockSize(30, config))
    }

    @Test
    fun `shares pick the imminent band inside 14 days and the open band with no exam`() {
        val imminent = config.shares(daysToExam = 7)
        val far = config.shares(daysToExam = null)
        // Imminent weights coverage over depth; the open band does the reverse.
        assertTrue(imminent.coverage > imminent.weakness)
        assertTrue(far.weakness > far.coverage)
    }

    @Test
    fun `shares always normalise to one`() {
        val s = config.shares(daysToExam = 30)
        val total = s.weakness + s.coverage + s.review + s.uncertainty
        assertEquals(1.0, total, 1e-9)
    }
}
