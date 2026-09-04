package com.synapse.android.core.taxonomy

import kotlinx.serialization.Serializable

/**
 * The bilingual medical glossary, catalogue-synced under
 * `synapse-medical-glossary-v1` (server's `nishany-medical-glossary-v1`).
 * Admin-authored (Glossary Setup), student-read -- a port of `MedicalTerm`/
 * `GlossaryDoc` in `src/data/glossary.ts`, dropping nothing: every field a
 * term has is small and worth showing.
 */
const val GLOSSARY_KEY = "synapse-medical-glossary-v1"

@Serializable
data class GlossaryCategory(val key: String, val ar: String = "")

@Serializable
data class MedicalTerm(
    val id: String,
    val term: String,
    val ar: String = "",
    val category: String,
    val def: String,
    val defAr: String = "",
    val example: String? = null,
)

@Serializable
data class GlossaryDoc(
    val version: Int = 1,
    val categories: List<GlossaryCategory> = emptyList(),
    val terms: List<MedicalTerm> = emptyList(),
)

val EMPTY_GLOSSARY = GlossaryDoc()

/** Terms in [category] (or every term, when null) whose term/translation/definition contains [query]. */
fun filterGlossary(terms: List<MedicalTerm>, category: String?, query: String): List<MedicalTerm> {
    val needle = query.trim().lowercase()
    return terms.filter { term ->
        (category == null || term.category == category) &&
            (needle.isEmpty() || "${term.term} ${term.ar} ${term.def} ${term.defAr}".lowercase().contains(needle))
    }
}
