package com.synapse.android.core.model

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

/**
 * The four kinds of thing an admin authors.
 *
 * Mirrors `ContentKind` in `src/data/contentControl.ts`. Everything a student
 * reads is one of these, which is what lets the app render new content
 * without a new release: the app ships four renderers, not a screen per
 * article.
 */
enum class ContentKind {
    QUESTION, ARTICLE, PRACTICAL, RESOURCE;

    val wire: String
        get() = when (this) {
            QUESTION -> "question"
            ARTICLE -> "article"
            PRACTICAL -> "practical"
            RESOURCE -> "resource"
        }

    companion object {
        fun fromWire(value: String): ContentKind? = entries.firstOrNull { it.wire == value }
    }
}

/**
 * Where an item is in its editorial life.
 *
 * Mirrors `Status` in `src/data/admin.ts`. Only `PUBLISHED` is student-visible
 * in live mode — see `LedgerItem.isStudentVisible`.
 */
enum class ContentStatus(val wire: String) {
    PUBLISHED("Published"),
    DRAFT("Draft"),
    IN_REVIEW("In review"),
    ARCHIVED("Archived");

    companion object {
        fun fromWire(value: String): ContentStatus? = entries.firstOrNull { it.wire == value }
    }
}

/**
 * One row of the content ledger.
 *
 * Only the fields the app indexes or filters on are modelled. The rest of the
 * record — the authoring blocks, which are large and still growing — is kept
 * as raw JSON in [raw] and decoded on demand by whichever projection needs
 * it.
 *
 * That is deliberate. The authoring types in `src/data/contentControl.ts`
 * gain fields as the content pipeline matures, and a Kotlin mirror of all of
 * them would need a Room migration and a full re-sync every time one
 * appeared. Storing the bytes makes a new field cost a decode, not a
 * release.
 */
data class LedgerItem(
    val id: String,
    val kind: ContentKind,
    val title: String,
    val subjectId: String,
    val status: ContentStatus,
    val updatedAt: String?,
    /** The complete original record, kept verbatim. */
    val raw: String,
    /** Universities this item is restricted to. Empty means unrestricted. */
    val universityIds: List<String>,
    /** Year IDs this item is restricted to. Empty means unrestricted. */
    val yearIds: List<String>,
    /** What the Library and Question Bank search over. */
    val searchText: String,
) {
    /** Whether a student may see this at all. Only a published item is study material. */
    val isStudentVisible: Boolean get() = status == ContentStatus.PUBLISHED
}

/** The result of decoding a ledger document: the usable items, and how many rows were dropped. */
data class DecodeResult(val items: List<LedgerItem>, val skipped: Int)

/**
 * Reads the ledger document into [LedgerItem]s.
 *
 * Written against the raw JSON rather than a generated `@Serializable`
 * mirror, because the scope fields live in different places depending on the
 * kind — see `itemScope` in `src/data/contentControl.ts`, which this
 * reproduces:
 *
 * - a question keeps them under `questionData.tags`, and names the year
 *   field `years`;
 * - an article or resource keeps them at the top of its own block, and names
 *   the year field `yearIds`.
 *
 * Getting that wrong does not throw. It silently scopes every question to
 * nobody, and the question bank comes up empty for a reason no error
 * explains.
 */
object LedgerDecoder {

    /**
     * Items that could not be read are skipped rather than failing the
     * batch. One malformed record authored upstream must not cost a student
     * their whole library. A document that is not a JSON array yields zero
     * items rather than an exception.
     */
    fun decode(json: String): DecodeResult {
        val root = try {
            Json.parseToJsonElement(json)
        } catch (e: Exception) {
            return DecodeResult(emptyList(), 0)
        }
        val array = root as? JsonArray ?: return DecodeResult(emptyList(), 0)

        val items = mutableListOf<LedgerItem>()
        var skipped = 0
        for (element in array) {
            val record = element as? JsonObject
            val item = record?.let(::decodeOne)
            if (item != null) {
                items.add(item)
            } else {
                skipped++
            }
        }
        return DecodeResult(items, skipped)
    }

    private fun decodeOne(record: JsonObject): LedgerItem? {
        val id = record["id"]?.stringOrNull() ?: return null
        val kindWire = record["kind"]?.stringOrNull() ?: return null
        val kind = ContentKind.fromWire(kindWire) ?: return null
        val statusWire = record["status"]?.stringOrNull() ?: return null
        val status = ContentStatus.fromWire(statusWire) ?: return null

        val (universityIds, yearIds) = scopeOf(record)

        return LedgerItem(
            id = id,
            kind = kind,
            title = record["title"]?.stringOrNull() ?: "",
            subjectId = record["subjectId"]?.stringOrNull() ?: "",
            status = status,
            updatedAt = record["updatedAt"]?.stringOrNull(),
            raw = record.toString(),
            universityIds = universityIds,
            yearIds = yearIds,
            searchText = searchTextOf(record),
        )
    }

    /** Reproduces `itemScope` in `src/data/contentControl.ts`. */
    private fun scopeOf(record: JsonObject): Pair<List<String>, List<String>> {
        val questionTags = record["questionData"]?.jsonObjectOrNull()?.get("tags")?.jsonObjectOrNull()
        val block = record["articleData"]?.jsonObjectOrNull() ?: record["resourceData"]?.jsonObjectOrNull()
        val source = questionTags ?: block ?: record["practicalData"]?.jsonObjectOrNull()
        val universities = source?.get("universityIds")?.stringList().orEmpty()
        // A question names the year field `years`; an article or resource
        // names it `yearIds`. Reading only one of the two scopes half the
        // catalogue to nobody.
        val years = source?.get("years")?.stringList() ?: source?.get("yearIds")?.stringList().orEmpty()
        return universities to years
    }

    /**
     * What the student can find this item by: the title, every value in
     * `fields`, and every option's text, lowercased for the FTS index.
     * Deliberately not the whole record — indexing every governance and
     * provenance field would make searches match on reviewer names and
     * internal notes.
     */
    private fun searchTextOf(record: JsonObject): String {
        val parts = mutableListOf<String>()
        record["title"]?.stringOrNull()?.let(parts::add)

        record["fields"]?.jsonObjectOrNull()?.values?.forEach { value ->
            value.stringOrNull()?.let(parts::add)
        }

        val answers = record["questionData"]?.jsonObjectOrNull()?.get("answers") as? JsonArray
        answers?.forEach { entry ->
            entry.jsonObjectOrNull()?.get("text")?.stringOrNull()?.let(parts::add)
        }

        return parts.joinToString(" ").lowercase()
    }
}

private fun JsonElement.jsonObjectOrNull(): JsonObject? = this as? JsonObject

private fun JsonElement.stringOrNull(): String? = (this as? JsonPrimitive)?.contentOrNull

private fun JsonElement.stringList(): List<String>? =
    (this as? JsonArray)?.mapNotNull { it.stringOrNull() }
