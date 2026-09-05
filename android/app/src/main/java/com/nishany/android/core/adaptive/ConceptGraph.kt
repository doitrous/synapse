package com.nishany.android.core.adaptive

import kotlinx.serialization.Serializable

/**
 * The shared concept graph, decoded for just the two things Adaptive Study
 * needs from it: prerequisite edges (for crash-course ordering) and concept
 * labels (so a repair row can name what it is showing). Everything else the
 * ~60-field authored concept carries is ignored -- `CortexJson` tolerates the
 * unknown keys, and each concept is decoded leniently so one malformed entry
 * cannot take the whole graph down.
 *
 * Read under the key the catalogue already stores it as (`synapse-concept-graph-v2`,
 * canonicalised server-side to `nishany-concept-graph-v2`).
 */
@Serializable
data class ConceptGraphDoc(
    val relations: List<ConceptRelation> = emptyList(),
    val concepts: List<GraphConcept> = emptyList(),
) {
    /**
     * `source prerequisite_of target` means the source must come first, so it is
     * the target that carries the dependency.
     */
    fun prerequisites(): Map<String, List<String>> {
        val edges = mutableMapOf<String, MutableList<String>>()
        for (relation in relations) {
            if (relation.type != "prerequisite_of") continue
            edges.getOrPut(relation.targetId) { mutableListOf() }.add(relation.sourceId)
        }
        return edges
    }

    fun labels(): Map<String, String> = concepts.associate { it.id to it.label }

    companion object {
        /** The Android catalogue spelling; the server canonicalises it. */
        const val KEY = "synapse-concept-graph-v2"
    }
}

@Serializable
data class ConceptRelation(
    val sourceId: String = "",
    val type: String = "",
    val targetId: String = "",
)

@Serializable
data class GraphConcept(
    val id: String,
    val label: String = id,
)
