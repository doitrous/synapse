package com.synapse.app.core.taxonomy

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.decodeFromJsonElement

/**
 * Projects the raw `synapse-medical-glossary-v1` catalogue value (a
 * `StateDoc.value` JSON string) into [TaxonomyCatalogue]. Ported from
 * `GlossaryDoc` in `src/data/glossary.ts` and iOS `GlossaryView.load`.
 *
 * The visibility gate: a term is dropped when its `id` or `term` (the
 * English headword) is blank after trimming — everything else (Arabic
 * translation, category, definitions, example) defaults to blank/absent
 * rather than failing the whole entry, since a glossary entry missing its
 * Arabic side is still worth surfacing rather than silently disappearing.
 * A malformed individual array element (wrong types, or not an object at all)
 * is dropped rather than failing the whole catalogue — `categories`/`terms`
 * are decoded element-by-element, the same per-item tolerance
 * `LibraryProjection`/`LibraryTreeProjection` use for their own arrays.
 *
 * Defines its own minimal `@Serializable` wire shapes locally rather than
 * reusing [TaxonomyCategory]/[TaxonomyTerm] directly, the same way
 * `LibraryProjection` keeps its ledger DTOs private to itself.
 */
object TaxonomyProjection {

    private val json = Json { ignoreUnknownKeys = true }

    private val empty = TaxonomyCatalogue(categories = emptyList(), terms = emptyList())

    fun project(catalogueJson: String): TaxonomyCatalogue {
        val root = runCatching { json.parseToJsonElement(catalogueJson) }.getOrNull() as? JsonObject ?: return empty

        val categories = decodeArray<CategoryDto>(root["categories"])
            .map { TaxonomyCategory(key = it.key, arabic = it.ar) }
        val terms = decodeArray<TermDto>(root["terms"]).mapNotNull(::projectTerm)
        return TaxonomyCatalogue(categories, terms)
    }

    private inline fun <reified T> decodeArray(element: JsonElement?): List<T> {
        val array = element as? JsonArray ?: return emptyList()
        return array.mapNotNull { item ->
            runCatching { json.decodeFromJsonElement<T>(item) }.getOrNull()
        }
    }

    private fun projectTerm(dto: TermDto): TaxonomyTerm? {
        val id = dto.id.trim()
        val term = dto.term.trim()
        if (id.isEmpty() || term.isEmpty()) return null

        return TaxonomyTerm(
            id = id,
            term = term,
            arabic = dto.ar.trim(),
            category = dto.category.trim(),
            definition = dto.def.trim(),
            definitionAr = dto.defAr.trim(),
            example = dto.example?.trim()?.takeIf { it.isNotEmpty() },
        )
    }
}

// --- Local wire shapes for the catalogue document (kept separate from the
// domain model, the same way LibraryProjection's ledger DTOs are) ----------

@Serializable
private data class CategoryDto(val key: String = "", val ar: String = "")

@Serializable
private data class TermDto(
    val id: String = "",
    val term: String = "",
    val ar: String = "",
    val category: String = "",
    val def: String = "",
    val defAr: String = "",
    val example: String? = null,
)
