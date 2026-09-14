package com.synapse.app.core.resources

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into catalogue entries, minus [MedicalResource.hasFile]/[MedicalResource.mediaType]/etc,
 * which [ResourceFileProjection] supplies from the evidence registry. Ported
 * from the `resource` branch of `ManagedContentItem`/`overlayResource` in
 * `src/data/contentControl.ts`/`src/lib/stateOwnership.ts`.
 *
 * Only `kind == "resource"` items are considered; everything else is
 * ignored. An item is dropped when it is not Published or has a blank title —
 * the same MVP publish gate `LibraryProjection`/`QuestionProjection` use; the
 * web's fuller `isStudentPublishable` (no blocking *required* media requests)
 * is deferred for the same reason it is there: no media-request modeling
 * exists on Android yet.
 *
 * Defines its own minimal `@Serializable` ledger shape locally, the same way
 * `LibraryProjection` does — this file has no dependency on the Library or
 * QBank packages.
 */
object ResourceProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<CatalogueEntry> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items.mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<ResourceLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(ResourceLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: ResourceLedgerItem): CatalogueEntry? {
        if (item.kind != "resource") return null
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.resourceData
        val authoredChapters = data?.chapters.orEmpty()
        val chapters = authoredChapters.ifEmpty {
            item.fields["Chapter"]?.trim()?.takeIf { it.isNotEmpty() }?.let { listOf(it) }.orEmpty()
        }

        return CatalogueEntry(
            id = item.id,
            title = item.title,
            type = asResourceType(item.fields["Type"]),
            subjectId = item.subjectId,
            source = item.fields["Source"]?.trim()?.takeIf { it.isNotEmpty() } ?: "—",
            meta = item.fields["Location"]?.trim().orEmpty(),
            year = item.fields["Year"]?.toIntOrNull(),
            chapters = chapters,
            universityIds = data?.universityIds.orEmpty(),
            yearIds = data?.yearIds.orEmpty(),
        )
    }
}

/** A projected resource, before [ResourceFileProjection] fills in whether it can actually be opened. */
data class CatalogueEntry(
    val id: String,
    val title: String,
    val type: String,
    val subjectId: String,
    val source: String,
    val meta: String,
    val year: Int?,
    val chapters: List<String>,
    val universityIds: List<String>,
    val yearIds: List<String>,
)

// --- Local wire shapes for the ledger (kept separate from Library/QBank's
// own ledger DTOs so this file has no dependency on those packages) --------

@Serializable
private data class ResourceLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val fields: Map<String, String> = emptyMap(),
    val resourceData: ResourceAuthoringDataDto? = null,
)

/** Wire shape of `ResourceAuthoringData` (`contentControl.ts`), reduced to the student-facing scope fields. */
@Serializable
private data class ResourceAuthoringDataDto(
    val universityIds: List<String> = emptyList(),
    val yearIds: List<String> = emptyList(),
    val chapters: List<String> = emptyList(),
)
