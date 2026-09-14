package com.synapse.app.core.library

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [LibraryArticle]s. Ported from
 * `visibleLibraryArticles`/the article branch of `ManagedContentItem` in
 * `src/data/contentControl.ts` and `libraryOutline.ts`.
 *
 * Only `kind == "article"` items are considered; everything else is ignored.
 * An item is dropped when it is not Published, has a blank title, or has no
 * `articleData` at all. This matches QBank's `QuestionProjection` MVP publish
 * gate (`status == "Published"` alone) — the web's `isStudentPublishable`
 * also requires no blocking *required* media requests
 * (`contentControl.ts`'s `blockingMediaRequests`); that check is deferred
 * here for the same reason it is deferred in `QuestionProjection`: no
 * media-request modeling exists on Android yet.
 *
 * Defines its own minimal `@Serializable` ledger shapes locally, the same way
 * `DeckProjection`/`MultiResponseProjection` do — this file has no dependency
 * on the QBank package.
 */
object LibraryProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<LibraryArticle> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items
            .filter { it.kind == "article" }
            .mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<ArticleLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(ArticleLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: ArticleLedgerItem): LibraryArticle? {
        if (item.status != "Published") return null
        if (item.title.isBlank()) return null

        val data = item.articleData ?: return null
        val chapter = item.fields["Topic"]?.trim().orEmpty().ifBlank { "New articles" }
        val sections = (data.publishedSections?.takeIf { it.isNotEmpty() } ?: data.sections).map {
            LibrarySection(id = it.id, heading = it.heading, body = it.narrative?.takeIf { n -> n.isNotBlank() } ?: it.body)
        }
        val summary = data.publishedSummary?.takeIf { it.isNotBlank() } ?: data.summary

        return LibraryArticle(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            chapter = chapter,
            summary = summary,
            sections = sections,
            keyPoints = data.holdThese,
            traps = data.loseTheMark,
            questionIds = data.questionIds,
            resourceIds = data.resourceIds,
            updatedAt = item.updatedAt,
        )
    }
}

// --- Local wire shapes for the ledger (kept separate from QBank's
// ManagedContentItem so this file has no dependency on that package) -------

@Serializable
private data class ArticleLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val updatedAt: String = "",
    val fields: Map<String, String> = emptyMap(),
    val articleData: ArticleAuthoringDataDto? = null,
)

/** Wire shape of `ArticleAuthoringData` (`contentControl.ts`), reduced to the student-facing fields. */
@Serializable
private data class ArticleAuthoringDataDto(
    val summary: String = "",
    val body: String = "",
    val sections: List<ArticleSectionDto> = emptyList(),
    val publishedSections: List<ArticleSectionDto>? = null,
    val publishedSummary: String? = null,
    val holdThese: List<String> = emptyList(),
    val loseTheMark: List<String> = emptyList(),
    val questionIds: List<String> = emptyList(),
    val resourceIds: List<String> = emptyList(),
)

@Serializable
private data class ArticleSectionDto(
    val id: String = "",
    val heading: String = "",
    val body: String = "",
    val narrative: String? = null,
)
