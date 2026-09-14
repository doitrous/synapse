package com.synapse.app.core.adaptive

/**
 * A question as the adaptive engine sees it.
 *
 * Port of the type and pure predicates in `src/data/adaptive/item.ts`
 * (cross-checked against `ios/Synapse/Core/Adaptive/AdaptiveItem.swift`, which
 * ports the same trimmed shape). The full student-facing question — stem,
 * options, explanation — is a separate rendering concern
 * ([com.synapse.app.core.qbank.Question]); this is only what selection and
 * scoring read.
 *
 * ponytail: the TS type also carries `question: Question` so the selector and
 * the renderer can never drift apart. Nothing ported this task reads that
 * field (no UI, no block builder yet), and iOS's own port drops it too — so
 * it is left out here rather than coupled to `core.qbank.Question`'s
 * different shape. Whichever later task wires a repository around this type
 * decides how an [AdaptiveItem] joins back to its renderable question.
 */
data class AdaptiveItem(
    val id: String,
    /** A stable fingerprint of the answerable content, so a replay can tell a question was edited after it was answered. */
    val version: String,
    val subjectId: String,
    val topic: String,
    val difficulty: String,
    /** Concepts the item is *for*. Weighted at full relevance. */
    val mainConceptIds: List<String>,
    /** Concepts it also assesses. Weighted lower. */
    val secondaryConceptIds: List<String>,
    /** Both, in the order the mastery model should prefer. */
    val conceptIds: List<String>,
    val moduleIds: List<String> = emptyList(),
    val universityIds: List<String> = emptyList(),
    val years: List<String> = emptyList(),
    /** When set, the item applies *only* to these year/university IDs. */
    val onlyFor: List<String> = emptyList(),
    /** 0-1. */
    val cognitiveEffort: Double = 0.5,
    /** Author's estimate, used to judge whether an answer arrived impossibly fast. */
    val estimatedSeconds: Double? = null,
    /** True when the difficulty band is one most students are expected to miss. */
    val demanding: Boolean = false,
)

/**
 * The role a concept plays for this item.
 *
 * Returns null when the item does not assess the concept at all, so a caller
 * cannot accidentally record full-relevance evidence for a concept the
 * question merely mentions.
 */
fun conceptRole(item: AdaptiveItem, conceptId: String): ConceptRole? = when {
    item.mainConceptIds.contains(conceptId) -> ConceptRole.MAIN
    item.secondaryConceptIds.contains(conceptId) -> ConceptRole.SECONDARY
    else -> null
}

/**
 * Every concept an item is chiefly about.
 *
 * Falls back to the first assessed concept when nothing was marked as main.
 */
fun primaryConcepts(item: AdaptiveItem): List<String> {
    if (item.mainConceptIds.isNotEmpty()) return item.mainConceptIds
    val fallback = item.secondaryConceptIds.firstOrNull()
    return if (fallback != null) listOf(fallback) else emptyList()
}

/** The one concept to name when only one can be named — a diagnostics label, not a rule. */
fun primaryConcept(item: AdaptiveItem): String? = primaryConcepts(item).firstOrNull()

data class ItemScope(val universityId: String, val yearId: String, val moduleIds: List<String>? = null)

/**
 * Whether this item is in scope for this student.
 *
 * A hard gate, evaluated before any scoring: an out-of-scope item must be
 * impossible to select, not merely unlikely to win. Empty means unrestricted;
 * `onlyFor` is the exception — when an author sets it, it is an allow-list
 * and nothing outside it qualifies.
 */
fun itemInScope(item: AdaptiveItem, scope: ItemScope): Boolean {
    if (item.onlyFor.isNotEmpty()) {
        val allowed = item.onlyFor.toSet()
        if (!allowed.contains(scope.yearId) && !allowed.contains(scope.universityId)) return false
    }
    if (scope.universityId.isNotEmpty() && item.universityIds.isNotEmpty() && !item.universityIds.contains(scope.universityId)) {
        return false
    }
    if (scope.yearId.isNotEmpty() && item.years.isNotEmpty() && !item.years.contains(scope.yearId)) return false
    if (!scope.moduleIds.isNullOrEmpty() && item.moduleIds.isNotEmpty()) {
        val wanted = scope.moduleIds.toSet()
        if (item.moduleIds.none { wanted.contains(it) }) return false
    }
    return true
}
