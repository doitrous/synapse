package com.synapse.android.core.taxonomy

import kotlinx.serialization.Serializable

/**
 * The curriculum taxonomy tree, catalogue-synced under
 * `synapse-taxonomy-tree-v4` (server's `nishany-taxonomy-tree-v4`; either
 * spelling reaches the same row -- see `server/src/stateKeys.js`).
 * Admin-authored, student-read -- this app never writes it, so, like
 * [com.synapse.android.core.calendar.ScheduleBlock], only what a browse
 * screen shows is modelled. A port of `CurriculumSystem`/`CurriculumTopic`/
 * `CurriculumSubtopic` in `src/data/curriculumCatalog.ts`; `micros`/`nanos`
 * (two levels deeper still) are dropped -- no student-facing screen on any
 * client browses that deep, only the authoring tools do.
 */
const val TAXONOMY_TREE_KEY = "synapse-taxonomy-tree-v4"

@Serializable
data class TaxSubtopic(val id: String, val title: String)

@Serializable
data class TaxTopic(val id: String, val title: String, val subs: List<TaxSubtopic> = emptyList())

@Serializable
data class TaxSystem(val id: String, val name: String, val topics: List<TaxTopic> = emptyList())

/** Every title in [systems] whose text contains [query] (case-insensitive), kept in tree order -- a system stays if it or any descendant matches. */
fun filterTaxonomy(systems: List<TaxSystem>, query: String): List<TaxSystem> {
    val needle = query.trim().lowercase()
    if (needle.isEmpty()) return systems
    return systems.mapNotNull { system ->
        val systemMatches = system.name.lowercase().contains(needle)
        val topics = system.topics.mapNotNull { topic ->
            val topicMatches = topic.title.lowercase().contains(needle)
            val subs = topic.subs.filter { it.title.lowercase().contains(needle) }
            if (topicMatches || subs.isNotEmpty()) topic.copy(subs = if (topicMatches) topic.subs else subs) else null
        }
        if (systemMatches || topics.isNotEmpty()) system.copy(topics = if (systemMatches) system.topics else topics) else null
    }
}
