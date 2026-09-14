package com.synapse.app.feature.taxonomy

import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.taxonomy.TaxonomyCatalogue
import com.synapse.app.core.taxonomy.TaxonomyProjection
import kotlinx.serialization.json.Json
import javax.inject.Inject

/** The shared, admin-authored bilingual glossary every student reads. Read-only: no per-user data. */
private const val GLOSSARY_KEY = "synapse-medical-glossary-v1"

/**
 * The Medical Taxonomy data layer: projects the shared glossary catalogue
 * into student-facing terms and categories ([catalogue]). No writes — this
 * surface holds no user data, matching iOS `GlossaryView`/web
 * `MedicalTaxonomy.tsx`, both plain readers of the same document.
 */
class TaxonomyRepository @Inject constructor(
    private val localStore: LocalStore,
    private val json: Json,
) {

    /** The published glossary, projected. Empty catalogue if absent/unparseable. */
    suspend fun catalogue(): TaxonomyCatalogue =
        TaxonomyProjection.project(catalogueJsonOrEmpty())

    /** The catalogue's raw `value` JSON, stringified for [TaxonomyProjection]. */
    private suspend fun catalogueJsonOrEmpty(): String {
        val stored = localStore.getCatalogue(GLOSSARY_KEY) ?: return "{}"
        return runCatching {
            val doc = json.decodeFromString(StateDoc.serializer(), stored)
            doc.value.toString()
        }.getOrDefault("{}")
    }
}
