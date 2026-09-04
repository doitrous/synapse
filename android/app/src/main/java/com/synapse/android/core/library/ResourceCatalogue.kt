package com.synapse.android.core.library

import com.synapse.android.core.model.ContentKind
import com.synapse.android.core.model.LedgerItem
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

/**
 * The resource shelf: published books, decks, guidelines and video a student
 * can browse and (eventually) open.
 *
 * This is the Android port of `src/lib/useLiveResources.ts` and iOS
 * `Core/Library/ResourceModel.swift`. Only the fields the shelf and the detail
 * card show are modelled -- these are admin-written, student-read catalogue
 * records, so there is no round-trip to keep faithful (see the module note in
 * this task's brief).
 *
 * Two documents feed it, exactly as on the other clients:
 *  - the content ledger's `resource` rows carry the metadata (title, type,
 *    source, chapter, year) -- read through [LedgerItem];
 *  - the published-evidence catalogue (`synapse-medical-evidence-published-v1`,
 *    see [EvidenceIndex]) is the register of which resources actually have a
 *    file behind them. The ledger's `storageKey` is only the admin's intent;
 *    the evidence store is what knows a resource can be opened.
 */
enum class ResourceType(val label: String) {
    BOOK("Book"),
    VIDEO("Video"),
    GUIDELINE("Guideline"),
    DECK("Deck"),
    ARTICLE("Article");

    companion object {
        /** Anything unrecognised reads as an article, exactly as the web's `asType`. */
        fun from(raw: String?): ResourceType = entries.firstOrNull { it.label == raw } ?: ARTICLE
    }
}

data class LibraryResource(
    val id: String,
    val title: String,
    val type: ResourceType,
    val subjectId: String,
    val source: String,
    val meta: String,
    val year: Int?,
    val chapters: List<String>,
    /** What the ledger claims (a `storageKey` was recorded). The authoritative answer is [isOpenable]. */
    val hasFile: Boolean,
    /** True once [EvidenceIndex] confirms bytes or a source URI stand behind this. */
    val isOpenable: Boolean = false,
) {
    val chapter: String? get() = chapters.firstOrNull()
}

/**
 * Turns a ledger `resource` row into a [LibraryResource].
 *
 * A verbatim port of `itemToResource` in `useLiveResources.ts` (the API-mode
 * path -- the mobile clients never use the web's local seed list). Tolerant of
 * a malformed record: a row that will not parse contributes nothing rather
 * than failing the shelf, the same rule [com.synapse.android.core.model.LedgerDecoder]
 * follows.
 */
object ResourceProjection {
    fun project(item: LedgerItem): LibraryResource? {
        if (item.kind != ContentKind.RESOURCE) return null
        val record = runCatching { Json.parseToJsonElement(item.raw) }.getOrNull() as? JsonObject ?: return null
        val data = record["resourceData"] as? JsonObject
        val fields = record["fields"] as? JsonObject

        val authored = (data?.get("chapters") as? JsonArray)?.mapNotNull { it.str() }.orEmpty()
        val chapters = if (authored.isNotEmpty()) {
            authored
        } else {
            fields?.get("Chapter")?.str()?.trim()?.takeIf { it.isNotEmpty() }?.let { listOf(it) }.orEmpty()
        }

        return LibraryResource(
            id = item.id,
            title = item.title,
            type = ResourceType.from(fields?.get("Type")?.str()),
            subjectId = item.subjectId,
            source = fields?.get("Source")?.str()?.trim()?.takeIf { it.isNotEmpty() } ?: "—",
            meta = fields?.get("Location")?.str()?.trim().orEmpty(),
            year = fields?.get("Year")?.str()?.trim()?.toIntOrNull(),
            chapters = chapters,
            // A catalogued resource with no uploaded file cannot be opened.
            hasFile = data?.get("storageKey")?.str()?.isNotEmpty() == true,
        )
    }
}

/**
 * The published-evidence catalogue reduced to the one fact the shelf needs:
 * which resource ids have a file (a `storageKey`) or a source URI behind them.
 *
 * A port of the `resources` branch of iOS `EvidenceStore.decode`. The rest of
 * that document -- claims, citations, article spans -- belongs to the Reader,
 * which is a separate later port, so nothing here decodes it.
 */
data class EvidenceIndex(val openableIds: Set<String>) {
    fun applyTo(resources: List<LibraryResource>): List<LibraryResource> =
        resources.map { it.copy(isOpenable = it.id in openableIds) }

    companion object {
        val EMPTY = EvidenceIndex(emptySet())

        fun decode(json: String?): EvidenceIndex {
            if (json.isNullOrBlank()) return EMPTY
            val root = runCatching { Json.parseToJsonElement(json) }.getOrNull() as? JsonObject ?: return EMPTY
            val resources = root["resources"] as? JsonArray ?: return EMPTY
            val ids = resources.mapNotNull { element ->
                val obj = element as? JsonObject ?: return@mapNotNull null
                val id = obj["id"].str() ?: return@mapNotNull null
                val storageKey = obj["storageKey"].str()?.takeIf { it.isNotEmpty() }
                val sourceUri = obj["sourceUri"].str()?.takeIf { it.isNotEmpty() }
                if (storageKey != null || sourceUri != null) id else null
            }.toSet()
            return EvidenceIndex(ids)
        }
    }
}

/** How the shelf is arranged. A device preference on the web (`synapse.resources.groupBy`); not persisted on Android yet -- see TODO in LibraryViewModel. */
enum class ResourceGrouping(val label: String) {
    CHAPTER("By chapter"),
    TYPE("By type"),
}

data class ResourceFolder(val title: String, val resources: List<LibraryResource>)

private const val UNFILED = "Unfiled"

/**
 * Groups the shelf into folders, resources with nothing recorded collecting
 * under "Unfiled" at the end rather than vanishing. A port of iOS
 * `ResourceModel.group`.
 */
fun groupResources(resources: List<LibraryResource>, by: ResourceGrouping): List<ResourceFolder> {
    val folders = LinkedHashMap<String, MutableList<LibraryResource>>()
    for (resource in resources) {
        val title = when (by) {
            ResourceGrouping.CHAPTER -> resource.chapter ?: UNFILED
            ResourceGrouping.TYPE -> resource.type.label
        }
        folders.getOrPut(title) { mutableListOf() }.add(resource)
    }
    return folders.keys
        .sortedWith(compareBy({ it == UNFILED }, { it.lowercase() }))
        .map { key ->
            ResourceFolder(
                title = key,
                resources = folders.getValue(key).sortedBy { it.title.lowercase() },
            )
        }
}

/**
 * Client-side search over the shelf, matching the web's in-memory filter on
 * the Resources page: a case-insensitive match on title, source or chapter.
 * A blank query returns everything.
 */
fun filterResources(resources: List<LibraryResource>, query: String): List<LibraryResource> {
    val trimmed = query.trim()
    if (trimmed.isEmpty()) return resources
    val needle = trimmed.lowercase()
    return resources.filter { resource ->
        resource.title.lowercase().contains(needle) ||
            resource.source.lowercase().contains(needle) ||
            resource.chapters.any { it.lowercase().contains(needle) }
    }
}

private fun JsonElement?.str(): String? = (this as? JsonPrimitive)?.contentOrNull
