package com.nishany.android.core.adaptive

import kotlinx.serialization.Serializable

/**
 * One concept on the exam blueprint, and how much of the exam it carries.
 *
 * A port of `BlueprintNode` in `src/data/adaptive/blueprint.ts`. The label and
 * group label are carried on the node rather than looked up, so a blueprint
 * reads without the concept graph beside it. Mirrors iOS, which reads
 * `nishany-adaptive-blueprints-v1` as a flat list of these; a document that
 * cannot decode leaves an empty blueprint and the blueprint panels degrade
 * gracefully rather than the screen failing.
 */
@Serializable
data class BlueprintNode(
    val conceptId: String,
    val label: String = conceptId,
    val groupId: String = "",
    val groupLabel: String = "",
    /** Share of the whole blueprint, 0-1. Normalised across the blueprint. */
    val weight: Double = 0.0,
    /** True when an administrator set this weight rather than it being derived. */
    val overridden: Boolean = false,
) {
    companion object {
        /** Admin-authored, so hyphenated and read from the shared catalogue. */
        const val KEY = "nishany-adaptive-blueprints-v1"
    }
}
