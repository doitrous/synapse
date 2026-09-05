package com.nishany.android.core.adaptive

import kotlin.math.floor
import kotlinx.serialization.Serializable

/**
 * What a slot in a block is for. These are allocation *targets*, not separate
 * pools: a question that repairs a weakness and closes coverage satisfies both
 * needs and consumes one slot.
 */
enum class AllocationNeed(val label: String) {
    WEAKNESS("Confirmed weak concepts"),
    COVERAGE("Exam-blueprint coverage and rolling debt"),
    REVIEW("Spaced review"),
    UNCERTAINTY("Unmeasured or uncertain concepts"),
}

/** How a block divides, as fractions summing to 1. */
@Serializable
data class AllocationShares(
    val weakness: Double = 0.0,
    val coverage: Double = 0.0,
    val review: Double = 0.0,
    val uncertainty: Double = 0.0,
) {
    operator fun get(need: AllocationNeed): Double = when (need) {
        AllocationNeed.WEAKNESS -> weakness
        AllocationNeed.COVERAGE -> coverage
        AllocationNeed.REVIEW -> review
        AllocationNeed.UNCERTAINTY -> uncertainty
    }

    /** Rescaled to sum to 1, ignoring anything negative. */
    fun normalised(fallback: AllocationShares): AllocationShares {
        val total = AllocationNeed.entries.sumOf { maxOf(0.0, this[it]) }
        if (total <= 0) return fallback
        return AllocationShares(
            weakness = maxOf(0.0, weakness) / total,
            coverage = maxOf(0.0, coverage) / total,
            review = maxOf(0.0, review) / total,
            uncertainty = maxOf(0.0, uncertainty) / total,
        )
    }
}

/** Slots per need. */
class SlotTargets(private val values: MutableMap<AllocationNeed, Int> = mutableMapOf()) {
    operator fun get(need: AllocationNeed): Int = values[need] ?: 0
    operator fun set(need: AllocationNeed, value: Int) { values[need] = value }
    val total: Int get() = AllocationNeed.entries.sumOf { this[it] }

    fun asMap(): Map<AllocationNeed, Int> = AllocationNeed.entries.associateWith { this[it] }

    override fun equals(other: Any?): Boolean = other is SlotTargets && other.asMap() == asMap()
    override fun hashCode(): Int = asMap().hashCode()
}

data class AllocationPlan(
    val size: Int,
    val shares: AllocationShares,
    val targets: SlotTargets,
    /** Slots moved into coverage to repay debt from earlier blocks. */
    val debtRepaid: Int,
    val remainders: Map<AllocationNeed, Double>,
)

/**
 * Turning shares into slots. A port of `src/data/adaptive/allocation.ts`.
 * Largest-remainder apportionment, so a stated "35% coverage" does not quietly
 * become 30% over a term.
 */
object Allocation {

    fun apportion(size: Int, shares: AllocationShares): Pair<SlotTargets, MutableMap<AllocationNeed, Double>> {
        val targets = SlotTargets()
        val remainders = mutableMapOf<AllocationNeed, Double>()
        var assigned = 0

        for (need in AllocationNeed.entries) {
            val exact = size * shares[need]
            val floorValue = floor(exact).toInt()
            targets[need] = floorValue
            remainders[need] = exact - floorValue
            assigned += floorValue
        }

        val spare = size - assigned
        if (spare <= 0) return Pair(targets, remainders)

        val ranked = AllocationNeed.entries.sortedWith(
            compareByDescending<AllocationNeed> { remainders[it] ?: 0.0 }
                .thenBy { AllocationNeed.entries.indexOf(it) },
        )

        for (index in 0 until spare) {
            val need = ranked[index % ranked.size]
            targets[need] += 1
            remainders[need] = maxOf(0.0, (remainders[need] ?: 0.0) - 1)
        }

        return Pair(targets, remainders)
    }

    /**
     * The slot plan for one block. Coverage debt is repaid out of the needs that
     * can most afford it -- weakness first, then uncertainty -- and never out of
     * spaced review, because a review that slips is a review that decays.
     */
    fun plan(size: Int, shares: AllocationShares, debt: CoverageDebt, config: AdaptiveConfig): AllocationPlan {
        val (targets, remainders) = apportion(size, shares)

        val owed = minOf(
            Math.round(debt.slots).toInt(),
            Coverage.maxDebtRepayment(size, config),
        )
        var repaid = 0

        for (donor in listOf(AllocationNeed.WEAKNESS, AllocationNeed.UNCERTAINTY)) {
            while (repaid < owed && targets[donor] > 0) {
                targets[donor] -= 1
                targets[AllocationNeed.COVERAGE] += 1
                repaid += 1
            }
        }

        return AllocationPlan(size, shares, targets, repaid, remainders)
    }

    /** Clamp a requested block size into the configured range. */
    fun clampBlockSize(size: Int, config: AdaptiveConfig): Int =
        maxOf(config.constraints.minBlockSize, minOf(config.constraints.maxBlockSize, size))
}
