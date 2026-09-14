package com.synapse.app.core.adaptive

import kotlin.math.roundToInt

/**
 * Turning shares into slots.
 *
 * Port of `src/data/adaptive/allocation.ts`. 40% of a 22-item block is 8.8
 * items. Rounding each share independently either loses a slot or invents
 * one, and doing that every block is how a stated "35% blueprint coverage"
 * quietly becomes 30% over a term. Largest-remainder apportionment
 * distributes the slots exactly, and the leftover fractions are carried in
 * the coverage debt rather than discarded.
 *
 * These are allocation targets, not separate pools. A question that repairs a
 * weakness *and* closes blueprint coverage satisfies both needs and consumes
 * one slot; [creditNeeds] is what records that so the block's diagnostics do
 * not double-count it.
 */

/** Slots per need. */
typealias SlotTargets = Map<AllocationNeed, Int>

fun emptyTargets(): SlotTargets = AllocationNeed.entries.associateWith { 0 }

data class AllocationPlan(
    val size: Int,
    val shares: AllocationShares,
    val targets: SlotTargets,
    /** Slots moved into coverage to repay debt from earlier blocks. */
    val debtRepaid: Int,
    /** Fractional remainders per need, carried so short blocks stay honest. */
    val remainders: Map<AllocationNeed, Double>,
)

data class Apportionment(val targets: MutableMap<AllocationNeed, Int>, val remainders: MutableMap<AllocationNeed, Double>)

/**
 * Largest-remainder apportionment.
 *
 * Every need gets its floor, then the slots left over go to whoever was
 * closest to earning another one. Ties break in the fixed [AllocationNeed]
 * declaration order rather than by map-iteration order, so the same inputs
 * always produce the same block — which is what makes a stored seed enough to
 * reproduce a session.
 */
fun apportion(size: Int, shares: AllocationShares): Apportionment {
    val needs = AllocationNeed.entries
    val exact = needs.associateWith { size * shares[it] }
    val targets = mutableMapOf<AllocationNeed, Int>()
    val remainders = mutableMapOf<AllocationNeed, Double>()

    var assigned = 0
    for (need in needs) {
        val value = exact.getValue(need)
        val floor = kotlin.math.floor(value).toInt()
        targets[need] = floor
        remainders[need] = value - floor
        assigned += floor
    }

    val spare = size - assigned
    val ranked = needs.sortedWith(
        compareByDescending<AllocationNeed> { remainders.getValue(it) }.thenBy { needs.indexOf(it) },
    )

    for (i in 0 until spare) {
        val need = ranked[i % ranked.size]
        targets[need] = targets.getValue(need) + 1
        // The remainder has been spent — recording that keeps `remainders` a
        // true statement of what is still owed rather than what was owed
        // before.
        remainders[need] = maxOf(0.0, remainders.getValue(need) - 1)
    }

    return Apportionment(targets, remainders)
}

/**
 * The slot plan for one block.
 *
 * Coverage debt is repaid out of the needs that can most afford it —
 * weakness first, then uncertainty — and never out of spaced review, because
 * a review that slips is a review that decays. Repayment is capped so a
 * large debt is spread across the rolling window instead of eating one whole
 * block.
 */
fun planAllocation(size: Int, shares: AllocationShares, debt: CoverageDebt, config: AdaptiveConfig): AllocationPlan {
    val (targets, remainders) = apportion(size, shares)

    val owed = minOf(debt.slots.roundToInt(), maxDebtRepayment(size, config))
    var repaid = 0
    // Weakness before uncertainty: a student with a real weakness is better
    // served by one fewer repair item than by one fewer exploratory item,
    // because the exploratory item is the only thing measuring concepts
    // nothing has touched.
    for (donor in listOf(AllocationNeed.WEAKNESS, AllocationNeed.UNCERTAINTY)) {
        while (repaid < owed && targets.getValue(donor) > 0) {
            targets[donor] = targets.getValue(donor) - 1
            targets[AllocationNeed.COVERAGE] = targets.getValue(AllocationNeed.COVERAGE) + 1
            repaid += 1
        }
    }

    return AllocationPlan(size = size, shares = shares, targets = targets.toMap(), debtRepaid = repaid, remainders = remainders.toMap())
}

/**
 * Which needs a question would satisfy.
 *
 * One question, several needs, one slot. The builder fills the most
 * constrained quota first and credits every need the chosen item happens to
 * serve, so a block's diagnostics report what it actually delivered rather
 * than what its slot was nominally labelled.
 */
data class NeedSignals(
    val repairsWeakness: Boolean,
    val closesCoverage: Boolean,
    val isDueReview: Boolean,
    val reducesUncertainty: Boolean,
)

fun creditNeeds(signals: NeedSignals): List<AllocationNeed> = buildList {
    if (signals.repairsWeakness) add(AllocationNeed.WEAKNESS)
    if (signals.closesCoverage) add(AllocationNeed.COVERAGE)
    if (signals.isDueReview) add(AllocationNeed.REVIEW)
    if (signals.reducesUncertainty) add(AllocationNeed.UNCERTAINTY)
}

/** Remaining slots per need, given what has been filled so far. */
fun remainingTargets(targets: SlotTargets, filled: SlotTargets): SlotTargets =
    AllocationNeed.entries.associateWith { need -> maxOf(0, (targets[need] ?: 0) - (filled[need] ?: 0)) }

/**
 * The need with the fewest eligible candidates per remaining slot.
 *
 * Filling the most constrained quota first is what stops the builder spending
 * its last slots on a need nothing can satisfy. A need with remaining slots
 * but no candidates returns infinite scarcity and is reported as a shortage
 * rather than quietly skipped.
 */
fun mostConstrainedNeed(remaining: SlotTargets, candidateCounts: Map<AllocationNeed, Int>): AllocationNeed? {
    val open = AllocationNeed.entries.filter { (remaining[it] ?: 0) > 0 }
    if (open.isEmpty()) return null
    val needs = AllocationNeed.entries
    return open.minWithOrNull(
        compareBy<AllocationNeed> { need ->
            val count = candidateCounts[need] ?: 0
            if (count == 0) Double.POSITIVE_INFINITY else count.toDouble() / (remaining.getValue(need))
        }.thenBy { needs.indexOf(it) },
    )
}

/** Clamp a requested block size into the configured range. */
fun clampBlockSize(size: Int, config: AdaptiveConfig): Int {
    val (minBlockSize, maxBlockSize) = config.constraints.minBlockSize to config.constraints.maxBlockSize
    return maxOf(minBlockSize, minOf(maxBlockSize, size))
}
