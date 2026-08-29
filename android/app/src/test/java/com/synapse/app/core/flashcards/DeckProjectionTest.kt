package com.synapse.app.core.flashcards

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 2 (Plan 05 — Flashcards): pure-logic ledger projection.
 *
 * The ledger doc's `value` is a JSON array of managed-content items (or an
 * object wrapping one as `{ "items": [...] }`). Only `kind == "deck"` items
 * are projected, and only when they are Published with at least one card —
 * ported from `managedDeckToStudentDeck` in `src/data/decks.ts`.
 *
 * The Draft and empty-cards fixtures below are this file's port of
 * `decks.test.ts`'s two `managedDeckToStudentDeck` null-guard cases ("an
 * unpublished deck is not offered to students" / "a published deck with no
 * cards is not offered either"), expressed as JSON ledger items rather than
 * constructed `ManagedContentItem` objects, since that shared type has no
 * Android equivalent in this package. The dropped/`null` outcome is
 * unchanged.
 */
class DeckProjectionTest {

    // One Published deck item with two cards.
    private val publishedItem = """
        { "id":"D1","kind":"deck","title":"Cardiovascular Basics","subjectId":"SYS_CVS","status":"Published",
          "deckData":{"description":"Core CVS terms","cards":[
            {"id":"c1","front":"Aorta","back":"Largest artery"},
            {"id":"c2","front":"Vein","back":"Carries blood back"}]}}
    """.trimIndent()

    // status != Published -> dropped ("an unpublished deck is not offered to students").
    private val draftItem = """
        { "id":"D2","kind":"deck","title":"Draft deck","subjectId":"SYS_CVS","status":"Draft",
          "deckData":{"description":"","cards":[{"id":"c1","front":"a","back":"b"}]}}
    """.trimIndent()

    // Published but zero cards -> dropped ("a published deck with no cards is not offered either").
    private val emptyCardsItem = """
        { "id":"D3","kind":"deck","title":"Empty deck","subjectId":"SYS_CVS","status":"Published",
          "deckData":{"description":"","cards":[]}}
    """.trimIndent()

    // Published but deckData missing entirely -> dropped.
    private val missingDeckDataItem = """
        { "id":"D4","kind":"deck","title":"No deckData","subjectId":"SYS_CVS","status":"Published"}
    """.trimIndent()

    // kind != "deck" -> ignored entirely, even though otherwise well-formed.
    private val nonDeckItem = """
        { "id":"D5","kind":"question","title":"Not a deck","subjectId":"SYS_CVS","status":"Published",
          "deckData":{"description":"","cards":[{"id":"c1","front":"a","back":"b"}]}}
    """.trimIndent()

    @Test fun projectsOnlyThePublishedNonEmptyDeck() {
        val ledgerJson = "[$publishedItem,$draftItem,$emptyCardsItem,$missingDeckDataItem,$nonDeckItem]"

        val decks = DeckProjection.project(ledgerJson)

        assertEquals(1, decks.size)
        val deck = decks.single()
        assertEquals("D1", deck.id)
        assertEquals("Cardiovascular Basics", deck.title)
        assertEquals("SYS_CVS", deck.subjectId)
        assertEquals("Core CVS terms", deck.description)
        assertEquals(2, deck.cards.size)
        assertEquals(DeckCard("c1", "Aorta", "Largest artery"), deck.cards[0])
        assertEquals(DeckCard("c2", "Vein", "Carries blood back"), deck.cards[1])
    }

    @Test fun anUnpublishedDeckIsNotOfferedToStudents() {
        assertTrue(DeckProjection.project("[$draftItem]").isEmpty())
    }

    @Test fun aPublishedDeckWithNoCardsIsNotOfferedEither() {
        assertTrue(DeckProjection.project("[$emptyCardsItem]").isEmpty())
    }

    @Test fun aDeckMissingDeckDataIsDropped() {
        assertTrue(DeckProjection.project("[$missingDeckDataItem]").isEmpty())
    }

    @Test fun acceptsLedgerWrappedInItemsObject() {
        val ledgerJson = """{ "items": [$publishedItem] }"""

        val decks = DeckProjection.project(ledgerJson)

        assertEquals(1, decks.size)
        assertEquals("D1", decks.single().id)
    }
}
