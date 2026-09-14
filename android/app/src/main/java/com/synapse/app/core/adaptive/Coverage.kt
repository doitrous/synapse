package com.synapse.app.core.adaptive

import kotlinx.serialization.Serializable
import kotlin.math.roundToInt

/**
 * How much of the blueprint has actually been practised, and what is owed.
 *
 * Port of `src/data/adaptive/coverage.ts`. Coverage is measured in blueprint
 * weight, not in questions answered. A student who has answered two hundred
 * questions on one topic has covered that topic's weight and nothing else,
 * and a count would flatter them into thinking otherwise.
 *
 * Debt is what makes the coverage share survive a short block. A 20-item
 * block cannot represent every percentage exactly, so the shortfall is
 * carried forward and repaid across the rolling window rather than rounded
 * away each time.
 */

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

data class CoverageGroup(
    val groupId: String,
    val groupLabel: String,
    val weight: Double,
    val coveredWeight: Double,
    val uncovered: Int,
)

data class CoverageState(
    /** Blueprint weight with at least one piece of evidence behind it, 0-1. */
    val coveredWeight: Double,
    /** Blueprint weight never practised, 0-1. */
    val uncoveredWeight: Double,
    /** Concepts on the blueprint that have no evidence. */
    val uncoveredConcepts: List<ConceptCoverage>,
    /** Per group, for the bars both portals render. */
    val groups: List<CoverageGroup>,
    /** Every concept, so a table can show the whole blueprint. */
    val concepts: List<ConceptCoverage>,
)

/**
 * Coverage as it stands.
 *
 * `distinctItemsByConcept` comes from the evidence ledger. A concept counts
 * as covered on its first piece of evidence — covered means "practised at
 * all", not "mastered". Mastery is a separate measurement and conflating them
 * would let a single wrong answer report an area as done.
 */
fun coverageState(nodes: List<BlueprintNode>, distinctItemsByConcept: Map<String, Int>): CoverageState {
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

    val groupOrder = mutableListOf<String>()
    val groupMap = mutableMapOf<String, CoverageGroup>()
    for (entry in concepts) {
        val current = groupMap[entry.groupId] ?: CoverageGroup(entry.groupId, entry.groupLabel, 0.0, 0.0, 0).also {
            groupOrder.add(entry.groupId)
        }
        groupMap[entry.groupId] = current.copy(
            weight = current.weight + entry.weight,
            coveredWeight = current.coveredWeight + if (entry.touched) entry.weight else 0.0,
            uncovered = current.uncovered + if (entry.touched) 0 else 1,
        )
    }

    return CoverageState(
        coveredWeight = coveredWeight,
        uncoveredWeight = maxOf(0.0, 1 - coveredWeight),
        uncoveredConcepts = concepts.filter { !it.touched }.sortedByDescending { it.weight },
        groups = groupOrder.map { groupMap.getValue(it) }.sortedByDescending { it.weight },
        concepts = concepts,
    )
}

/**
 * Slots owed to coverage from previous blocks.
 *
 * Positive means the last blocks under-served coverage and this one should
 * serve more. Clamped so a long absence cannot produce a block that is
 * nothing but coverage — repaying every owed slot at once is how an adaptive
 * session turns into a syllabus march and a student stops opening it.
 */
@Serializable
data class CoverageDebt(
    /** Fractional slots owed, carried across blocks. */
    val slots: Double,
    /** Blocks the debt has accumulated over, for the rolling window. */
    val blocks: Int,
    val updatedAt: String?,
)

val EMPTY_COVERAGE_DEBT = CoverageDebt(slots = 0.0, blocks = 0, updatedAt = null)

/**
 * The most a single block will repay, so no one block becomes all coverage.
 *
 * Spread over the rolling window: a debt of six slots against a four-block
 * window is repaid a slot or two at a time, which is the difference between
 * adaptive study and a syllabus march.
 */
fun maxDebtRepayment(blockSize: Int, config: AdaptiveConfig): Int {
    val window = maxOf(1, config.constraints.rollingDebtWindowBlocks)
    return maxOf(1, (blockSize.toDouble() / window).roundToInt())
}

/**
 * Fold a finished block into the debt.
 *
 * `targeted` is what the allocation asked for; `served` is what the builder
 * actually managed. The difference is the debt — which is why a pool
 * shortage that forces a block off-target is repaid later rather than
 * forgotten.
 */
fun debtAfterBlock(debt: CoverageDebt, targeted: Double, served: Double, config: AdaptiveConfig, at: String): CoverageDebt {
    val window = maxOf(1, config.constraints.rollingDebtWindowBlocks)
    val blocks = minOf(debt.blocks + 1, config.constraints.rollingDebtWindowBlocks)
    val outstanding = debt.slots + (targeted - served)
    // The window is what stops an old shortfall haunting a student forever:
    // debt decays toward zero as blocks pass, so a bad week does not distort
    // a month.
    val decayed = outstanding * (1 - 1.0 / window)
    return CoverageDebt(
        slots = maxOf(0.0, minOf(decayed, config.constraints.maxBlockSize.toDouble())),
        blocks = blocks,
        updatedAt = at,
    )
}

/**
 * How much a question would contribute to closing coverage.
 *
 * Highest for a concept with real blueprint weight and no evidence at all;
 * zero for one already covered. Used as the `exam_blueprint_deficit` term, so
 * a question that reaches an untouched, heavily-weighted area outranks one
 * that revisits ground already walked.
 */
fun blueprintDeficit(conceptIds: List<String>, weights: Map<String, Double>, distinctItemsByConcept: Map<String, Int>): Double {
    var best = 0.0
    for (conceptId in conceptIds) {
        val weight = weights[conceptId] ?: continue
        val items = distinctItemsByConcept[conceptId] ?: 0
        // Falls off quickly: the second question on a concept closes far less
        // coverage than the first, and the tenth closes none worth naming.
        val deficit = weight * (1.0 / (1 + items))
        if (deficit > best) best = deficit
    }
    // Scaled against the largest single-concept weight so the term stays 0-1
    // whatever the blueprint's size.
    var maxWeight = 0.0
    for (weight in weights.values) if (weight > maxWeight) maxWeight = weight
    return if (maxWeight > 0) minOf(1.0, best / maxWeight) else 0.0
}

/**
 * Breadth not already explained by the concept itself.
 *
 * Concept weakness is scored directly from the concept's own state; this
 * term only reports how much of the *rest* of the group is untouched, so a
 * weak concept in a well-covered topic does not collect a second penalty for
 * the topic it happens to sit in.
 */
fun groupGap(conceptIds: List<String>, nodeByConcept: Map<String, BlueprintNode>, coverage: CoverageState): Double {
    val groups = coverage.groups.associateBy { it.groupId }
    val touched = coverage.concepts.filter { it.touched }.map { it.conceptId }.toSet()
    var worst = 0.0
    for (conceptId in conceptIds) {
        val node = nodeByConcept[conceptId] ?: continue
        val group = groups[node.groupId] ?: continue
        if (group.weight <= 0) continue
        // Remove this concept's own weight from both sides, so what is left
        // is genuinely the breadth around it rather than the concept counted
        // twice.
        val siblingWeight = group.weight - node.weight
        if (siblingWeight <= 0) continue
        val siblingCovered = group.coveredWeight - (if (touched.contains(conceptId)) node.weight else 0.0)
        val gap = maxOf(0.0, (siblingWeight - siblingCovered) / siblingWeight)
        if (gap > worst) worst = gap
    }
    return minOf(1.0, worst)
}
