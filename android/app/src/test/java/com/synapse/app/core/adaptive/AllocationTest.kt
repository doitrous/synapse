package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * No `*.test.ts` exercises `allocation.ts` directly on the web (it is only
 * covered indirectly through `blockBuilder.test.ts`, which is out of scope
 * for this task). These are sanity checks on the ported apportionment math
 * rather than 1:1 vectors.
 */
class AllocationTest {
    private val config = DEFAULT_ADAPTIVE_CONFIG

    @Test
    fun `apportion distributes every slot, none lost or invented`() {
        val shares = AllocationShares(weakness = 0.40, coverage = 0.35, review = 0.15, uncertainty = 0.10)
        val (targets, _) = apportion(22, shares)
        assertEquals(22, targets.values.sum())
        // 0.40 * 22 = 8.8 -> the largest remainder resolves it to 9.
        assertEquals(9, targets.getValue(AllocationNeed.WEAKNESS))
    }

    @Test
    fun `planAllocation repays debt from weakness and uncertainty, never review`() {
        val shares = AllocationShares(weakness = 0.40, coverage = 0.35, review = 0.15, uncertainty = 0.10)
        val debt = CoverageDebt(slots = 3.0, blocks = 1, updatedAt = null)
        val baseline = apportion(20, shares).targets
        val plan = planAllocation(20, shares, debt, config)

        assertEquals(baseline.getValue(AllocationNeed.REVIEW), plan.targets.getValue(AllocationNeed.REVIEW))
        assertTrue(plan.targets.getValue(AllocationNeed.COVERAGE) > baseline.getValue(AllocationNeed.COVERAGE))
        assertTrue(plan.debtRepaid > 0)
    }

    @Test
    fun `clampBlockSize keeps a request inside the configured range`() {
        assertEquals(config.constraints.minBlockSize, clampBlockSize(1, config))
        assertEquals(config.constraints.maxBlockSize, clampBlockSize(1000, config))
        assertEquals(25, clampBlockSize(25, config))
    }

    @Test
    fun `creditNeeds reports every need one question satisfies`() {
        val needs = creditNeeds(NeedSignals(repairsWeakness = true, closesCoverage = false, isDueReview = true, reducesUncertainty = false))
        assertEquals(listOf(AllocationNeed.WEAKNESS, AllocationNeed.REVIEW), needs)
    }

    @Test
    fun `mostConstrainedNeed picks the finite ratio over a candidate-less need`() {
        val remaining = mapOf(AllocationNeed.WEAKNESS to 2, AllocationNeed.COVERAGE to 1, AllocationNeed.REVIEW to 0, AllocationNeed.UNCERTAINTY to 1)
        val candidates = mapOf(AllocationNeed.WEAKNESS to 10, AllocationNeed.COVERAGE to 0, AllocationNeed.UNCERTAINTY to 4)
        // Coverage has open slots but zero candidates: filling it first would
        // achieve nothing, so its infinite scarcity sorts it last rather than
        // first — uncertainty (4 candidates / 1 slot) is more constrained than
        // weakness (10 / 2) and wins.
        assertEquals(AllocationNeed.UNCERTAINTY, mostConstrainedNeed(remaining, candidates))
    }

    @Test
    fun `mostConstrainedNeed still names a candidate-less need when it is the only one open`() {
        val remaining = mapOf(AllocationNeed.WEAKNESS to 0, AllocationNeed.COVERAGE to 1, AllocationNeed.REVIEW to 0, AllocationNeed.UNCERTAINTY to 0)
        val candidates = mapOf(AllocationNeed.COVERAGE to 0)
        assertEquals(AllocationNeed.COVERAGE, mostConstrainedNeed(remaining, candidates))
    }
}
