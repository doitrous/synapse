package com.synapse.app.core.flashcards

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Projects the raw managed-content authoring ledger (a `StateDoc.value` JSON
 * string) into student-facing [StudentDeck]s. Ported from
 * `managedDeckToStudentDeck` in `src/data/decks.ts`.
 *
 * Defines its own minimal `@Serializable` ledger shapes locally (rather than
 * reusing QBank's `ManagedContentItem`), the same way `MultiResponseProjection`
 * does — this file has no dependency on the QBank package, and a deck's
 * ledger slot (`deckData`) has nothing in common with a question's.
 *
 * Only `kind == "deck"` items are considered; everything else is ignored. An
 * item is dropped — rather than surfaced half-broken — when it is not
 * Published, has no `deckData`, or that `deckData` has no cards: a draft
 * deck isn't released yet, and a published deck with no cards has nothing in
 * it regardless of status.
 *
 * This matches QBank's `QuestionProjection` MVP publish gate (`status ==
 * "Published"` alone). The web's `isStudentPublishable(item)` also requires
 * no blocking *required* media requests (`contentControl.ts`'s
 * `blockingMediaRequests`); that check is deferred here, exactly as it was
 * deferred in `QuestionProjection`, until media-request modeling exists on
 * Android. Decks are also not university/year scoped on web, so no scope
 * filter is applied here either.
 */
object DeckProjection {

    private val json = Json { ignoreUnknownKeys = true }

    fun project(ledgerJson: String): List<StudentDeck> {
        val items = when (val element = json.parseToJsonElement(ledgerJson)) {
            is JsonArray -> decodeItems(element)
            is JsonObject -> {
                val itemsElement = element["items"]
                if (itemsElement is JsonArray) decodeItems(itemsElement) else emptyList()
            }
            else -> emptyList()
        }
        return items
            .filter { it.kind == "deck" }
            .mapNotNull(::projectOne)
    }

    private fun decodeItems(array: JsonArray): List<DeckLedgerItem> =
        array.mapNotNull { element ->
            runCatching { json.decodeFromJsonElement(DeckLedgerItem.serializer(), element) }.getOrNull()
        }

    private fun projectOne(item: DeckLedgerItem): StudentDeck? {
        if (item.status != "Published") return null

        val data = item.deckData ?: return null
        if (data.cards.isEmpty()) return null

        return StudentDeck(
            id = item.id,
            title = item.title,
            subjectId = item.subjectId,
            description = data.description,
            cards = data.cards.map { DeckCard(it.id, it.front, it.back) },
        )
    }
}

// --- Local wire shapes for the ledger (kept separate from QBank's
// ManagedContentItem/QuestionAuthoringData so this file has no dependency on
// that package) --------------------------------------------------------------

@Serializable
private data class DeckLedgerItem(
    val id: String,
    val kind: String,
    val title: String = "",
    val subjectId: String = "",
    val status: String = "",
    val deckData: DeckAuthoringDataDto? = null,
)

/** Wire shape of `DeckAuthoringData` (`decks.ts`): `{ description, cards }`. */
@Serializable
private data class DeckAuthoringDataDto(
    val description: String = "",
    val cards: List<DeckCardDto> = emptyList(),
)

@Serializable
private data class DeckCardDto(
    val id: String = "",
    val front: String = "",
    val back: String = "",
)
