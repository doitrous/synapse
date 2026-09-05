package com.nishany.android.core.adaptive

import java.time.Instant
import kotlin.math.min
import kotlin.math.roundToInt
import kotlinx.serialization.Serializable

/** How much of one concept has been practised. */
data class ConceptCoverage(
    val conceptId: String,
    val groupId: String,
    val groupLabel: String,
    /** Share of the blueprint this concept carries. */
    val weight: Double,
    /** Distinct questions answered on it. */
    val items: Int,
    /** True once it has any evidence at all. */
    val touched: Boolean,
)

/** A topic's worth of coverage, for the bars both platforms render. */
data class CoverageGroup(
    val groupId: String,
    val groupLabel: String,
    val weight: Double,
    val coveredWeight: Double,
    val uncovered: Int,
)

data class CoverageState(
    /** Blueprint weight with at least one piece of evidence behind it, 0-1. */
    val coveredWeight: Double = 0.0,
    val uncoveredWeight: Double = 1.0,
    /** Concepts on the blueprint that have no evidence, heaviest first. */
    val uncoveredConcepts: List<ConceptCoverage> = emptyList(),
    val groups: List<CoverageGroup> = emptyList(),
    /** Every concept, so a table can show the whole blueprint. */
    val concepts: List<ConceptCoverage> = emptyList(),
)

/**
 * Slots owed to coverage from previous blocks. Positive means the last blocks
 * under-served coverage and this one should serve more.
 */
@Serializable
data class CoverageDebt(
    val slots: Double = 0.0,
    val blocks: Int = 0,
    val updatedAt: String? = null,
) {
    companion object {
        val EMPTY = CoverageDebt()
        const val KEY = "nishany.progress.adaptive.coverageDebt.v1"
    }
}

/**
 * How much of the blueprint has actually been practised, and what is owed.
 *
 * A port of `src/data/adaptive/coverage.ts`. Coverage is measured in blueprint
 * **weight**, not in questions answered.
 */
object Coverage {

    /**
     * Coverage as it stands. A concept counts as covered on its first piece of
     * evidence -- covered means "practised at all", not "mastered".
     */
    fun state(nodes: List<BlueprintNode>, distinctItemsByConcept: Map<String, Int>): CoverageState {
        val concepts = nodes.map { node ->
            val items = distinctItemsByConcept[node.conceptId] ?: 0
            ConceptCoverage(
                conceptId = node.conceptId,
                groupId = node.groupId,
                groupLabel = node.groupLabel,
                weight = node.weight,
                items = items,
                touched = items > 0,
            )
        }

        val coveredWeight = concepts.sumOf { if (it.touched) it.weight else 0.0 }

        val order = mutableListOf<String>()
        data class Acc(var label: String, var weight: Double, var covered: Double, var uncovered: Int)
        val byGroup = mutableMapOf<String, Acc>()
        for (entry in concepts) {
            val acc = byGroup.getOrPut(entry.groupId) {
                order.add(entry.groupId); Acc(entry.groupLabel, 0.0, 0.0, 0)
            }
            acc.weight += entry.weight
            if (entry.touched) acc.covered += entry.weight else acc.uncovered += 1
        }

        val groups = order.mapNotNull { id ->
            byGroup[id]?.let {
                CoverageGroup(id, it.label, it.weight, it.covered, it.uncovered)
            }
        }.sortedByDescending { it.weight }

        return CoverageState(
            coveredWeight = coveredWeight,
            uncoveredWeight = maxOf(0.0, 1 - coveredWeight),
            uncoveredConcepts = concepts.filter { !it.touched }.sortedByDescending { it.weight },
            groups = groups,
            concepts = concepts,
        )
    }

    /** The most a single block will repay, so no one block becomes all coverage. */
    fun maxDebtRepayment(blockSize: Int, config: AdaptiveConfig): Int {
        val window = maxOf(1, config.constraints.rollingDebtWindowBlocks)
        return maxOf(1, (blockSize.toDouble() / window).roundToInt())
    }

    /**
     * Fold a finished block into the debt. `targeted` is what the allocation
     * asked for; `served` is what the builder managed. The difference is the
     * debt, decayed toward zero over the rolling window.
     */
    fun debtAfterBlock(
        debt: CoverageDebt, targeted: Double, served: Double, config: AdaptiveConfig,
        at: String = Instant.now().toString(),
    ): CoverageDebt {
        val window = maxOf(1, config.constraints.rollingDebtWindowBlocks)
        val blocks = min(debt.blocks + 1, config.constraints.rollingDebtWindowBlocks)
        val outstanding = debt.slots + (targeted - served)
        val decayed = outstanding * (1 - 1.0 / window)
        return CoverageDebt(
            slots = maxOf(0.0, min(decayed, config.constraints.maxBlockSize.toDouble())),
            blocks = blocks,
            updatedAt = at,
        )
    }

    /**
     * How much a question would contribute to closing coverage. Highest for a
     * concept with real blueprint weight and no evidence at all; zero for one
     * already covered.
     */
    fun blueprintDeficit(
        conceptIds: List<String>, weights: Map<String, Double>, distinctItemsByConcept: Map<String, Int>,
    ): Double {
        var best = 0.0
        for (conceptId in conceptIds) {
            val weight = weights[conceptId] ?: continue
            val items = distinctItemsByConcept[conceptId] ?: 0
            val deficit = weight * (1.0 / (1 + items))
            if (deficit > best) best = deficit
        }
        val maxWeight = weights.values.maxOrNull() ?: 0.0
        return if (maxWeight > 0) min(1.0, best / maxWeight) else 0.0
    }

    /**
     * Breadth not already explained by the concept itself. Parent and child
     * weakness must not both be charged.
     */
    fun groupGap(
        conceptIds: List<String>, nodeByConcept: Map<String, BlueprintNode>, coverage: CoverageState,
    ): Double {
        val groups = coverage.groups.associateBy { it.groupId }
        val touched = coverage.concepts.filter { it.touched }.map { it.conceptId }.toSet()

        var worst = 0.0
        for (conceptId in conceptIds) {
            val node = nodeByConcept[conceptId] ?: continue
            val group = groups[node.groupId] ?: continue
            if (group.weight <= 0) continue
            val siblingWeight = group.weight - node.weight
            if (siblingWeight <= 0) continue
            val siblingCovered = group.coveredWeight - (if (touched.contains(conceptId)) node.weight else 0.0)
            val gap = maxOf(0.0, (siblingWeight - siblingCovered) / siblingWeight)
            if (gap > worst) worst = gap
        }
        return min(1.0, worst)
    }
}
