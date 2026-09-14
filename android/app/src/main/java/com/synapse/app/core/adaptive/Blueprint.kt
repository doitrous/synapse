package com.synapse.app.core.adaptive

import kotlinx.serialization.Serializable

/**
 * What has to be learnt to be ready for an exam.
 *
 * Port of the resolution half of `src/data/adaptive/blueprint.ts` (cross
 * checked against `ios/Synapse/Core/Adaptive/Blueprint.swift`, which ports
 * only [BlueprintNode] too). A blueprint is a weighted list of concepts,
 * grouped by the topic they sit under. Adaptive selection may oversample
 * weakness, but it may never silently abandon this list.
 *
 * ponytail: `deriveBlueprint`/`rawConceptWeight`/`conceptInScope` are not
 * ported here — on the web they derive weights from `Concept.blueprintWeight`
 * / `Concept.examSignal`, a concept-graph type this task does not touch (no
 * `blueprintWeight`/`examSignal` port exists yet in `core/taxonomy`, and no
 * `*.test.ts` in `src/data/adaptive/` exercises them). The functions below —
 * resolving admin overrides onto a derived node list, and reading a published
 * blueprint back — need only the already-derived [BlueprintNode] list, so
 * they port cleanly without that dependency. Add the derivation once the
 * concept graph is ported.
 */

@Serializable
data class BlueprintNode(
    val conceptId: String,
    /** Display label, carried so a blueprint reads without the concept graph. */
    val label: String,
    /** The topic this concept is grouped under — a subject id, or a taxonomy node. */
    val groupId: String,
    val groupLabel: String,
    /** Share of the whole blueprint, 0-1. Normalised across the blueprint. */
    val weight: Double,
    /** True when an admin set this weight rather than it being derived. */
    val overridden: Boolean,
)

@Serializable
data class BlueprintChangeNote(val version: Int, val at: String, val author: String, val note: String)

@Serializable
data class Blueprint(
    val id: String,
    val name: String,
    /** Bumped whenever weights change materially. */
    val version: Int,
    /** Scope. Empty means "applies wherever nothing more specific does". */
    val universityId: String,
    /** The scoped year identifier, e.g. `OMS_Y3`. */
    val yearId: String,
    val moduleIds: List<String>,
    val nodes: List<BlueprintNode>,
    /** Set once published; a draft never governs a student's block. */
    val publishedAt: String?,
    val changeNotes: List<BlueprintChangeNote>,
)

/**
 * Apply an admin blueprint's overrides to the derived nodes.
 *
 * The derived set decides *which* concepts are in scope; the stored
 * blueprint decides *how much* each one is worth. That order matters: an
 * admin blueprint written before a concept was authored must not exclude
 * that concept from coverage.
 */
fun resolveBlueprint(derived: List<BlueprintNode>, stored: Blueprint?): List<BlueprintNode> {
    if (stored == null || stored.publishedAt == null) return normaliseNodes(derived)
    val overrides = stored.nodes.associateBy { it.conceptId }
    val merged = derived.map { node ->
        val override = overrides[node.conceptId]
        if (override != null) node.copy(weight = maxOf(0.0, override.weight), overridden = true) else node
    }
    return normaliseNodes(merged)
}

/** Re-normalise so weights sum to 1 after editing. Zero-weight nodes are dropped. */
fun normaliseNodes(nodes: List<BlueprintNode>): List<BlueprintNode> {
    val kept = nodes.filter { it.weight > 0 }
    val total = kept.sumOf { it.weight }
    if (total <= 0) return emptyList()
    return kept.map { it.copy(weight = it.weight / total) }
}

data class BlueprintGroupWeight(val groupId: String, val groupLabel: String, val weight: Double, val concepts: Int)

/** Weight per group, for the coverage bars the student and admin both read. */
fun weightByGroup(nodes: List<BlueprintNode>): List<BlueprintGroupWeight> {
    val order = mutableListOf<String>()
    val groups = mutableMapOf<String, BlueprintGroupWeight>()
    for (node in nodes) {
        val current = groups[node.groupId]
        if (current != null) {
            groups[node.groupId] = current.copy(weight = current.weight + node.weight, concepts = current.concepts + 1)
        } else {
            order.add(node.groupId)
            groups[node.groupId] = BlueprintGroupWeight(node.groupId, node.groupLabel, node.weight, 1)
        }
    }
    return order.map { groups.getValue(it) }.sortedByDescending { it.weight }
}

data class BlueprintScope(val universityId: String, val yearId: String, val moduleIds: List<String> = emptyList())

/**
 * The blueprint that governs a student.
 *
 * Most specific first: a module blueprint beats a year one, which beats a
 * university one. Two blueprints of equal specificity are resolved by
 * version, newest winning, so republishing does not depend on list order.
 */
fun blueprintFor(blueprints: List<Blueprint>, scope: BlueprintScope): Blueprint? {
    val wanted = scope.moduleIds.toSet()
    val candidates = blueprints.filter { blueprint ->
        if (blueprint.publishedAt == null) return@filter false
        if (blueprint.universityId.isNotEmpty() && blueprint.universityId != scope.universityId) return@filter false
        if (blueprint.yearId.isNotEmpty() && blueprint.yearId != scope.yearId) return@filter false
        if (blueprint.moduleIds.isNotEmpty() && wanted.none { blueprint.moduleIds.contains(it) }) return@filter false
        true
    }
    if (candidates.isEmpty()) return null

    fun specificity(blueprint: Blueprint) =
        (if (blueprint.moduleIds.isNotEmpty()) 4 else 0) +
            (if (blueprint.yearId.isNotEmpty()) 2 else 0) +
            (if (blueprint.universityId.isNotEmpty()) 1 else 0)

    return candidates.sortedWith(compareByDescending<Blueprint> { specificity(it) }.thenByDescending { it.version }).firstOrNull()
}

/** A new, empty, unpublished blueprint seeded from the derived weights. */
fun draftBlueprint(name: String, scope: BlueprintScope, derived: List<BlueprintNode>): Blueprint = Blueprint(
    id = "bp-${scope.universityId.ifEmpty { "any" }}-${scope.yearId.ifEmpty { "any" }}-${derived.size}",
    name = name,
    version = 1,
    universityId = scope.universityId,
    yearId = scope.yearId,
    moduleIds = scope.moduleIds,
    nodes = derived.map { it.copy() },
    publishedAt = null,
    changeNotes = emptyList(),
)
