package com.synapse.app.core.flashcards

import java.time.Instant
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 2 (Plan 05 — Flashcards): the deck model + ledger projection.
 *
 * A verbatim port of the non-ledger cases in `src/data/decks.test.ts` —
 * `dueQueue`, `parseCardLines`, `deckFromTerms` — same fixture timestamp
 * (`2026-08-20T09:00:00.000Z`), same expected numbers. The two
 * `managedDeckToStudentDeck` null-guard cases from that file are ported in
 * [DeckProjectionTest] instead, against JSON ledger fixtures, since Android
 * has no shared `ManagedContentItem` object to construct directly here — see
 * that file for why the expected outcome (`null`/dropped) is unchanged.
 */
class DeckTest {

    private val isoFormatter: DateTimeFormatter =
        DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").withZone(ZoneOffset.UTC)

    private val at: Instant = Instant.parse("2026-08-20T09:00:00.000Z")

    private fun noCounts(newSeen: Int = 0, reviewsSeen: Int = 0) =
        DailyDeckCounts(day = "2026-08-20", newSeen = newSeen, reviewsSeen = reviewsSeen)

    @Test
    fun `the queue offers due cards before new ones`() {
        val queue = dueQueue(
            listOf(
                StudyCard("n", newCard(at)),
                StudyCard(
                    "d",
                    newCard(at).copy(state = CardState.Review, due = isoFormatter.format(at.minusMillis(1000))),
                ),
            ),
            at,
            AnkiDefaults,
            noCounts(),
        )
        assertEquals("d", queue[0].id)
    }

    @Test
    fun `a card that is not yet due is not in the queue`() {
        val queue = dueQueue(
            listOf(
                StudyCard(
                    "later",
                    newCard(at).copy(state = CardState.Review, due = isoFormatter.format(at.plusMillis(86_400_000))),
                ),
            ),
            at,
            AnkiDefaults,
            noCounts(),
        )
        assertEquals(emptyList<StudyCard>(), queue)
    }

    @Test
    fun `the daily new cap bounds how many new cards are offered`() {
        val cards = (0 until 30).map { i -> StudyCard("n$i", newCard(at)) }
        val queue = dueQueue(cards, at, AnkiDefaults, noCounts())
        assertEquals(AnkiDefaults.newPerDay, queue.size)
    }

    @Test
    fun `cards already seen today count against the cap`() {
        val cards = (0 until 30).map { i -> StudyCard("n$i", newCard(at)) }
        val queue = dueQueue(cards, at, AnkiDefaults, noCounts(newSeen = 18))
        assertEquals(2, queue.size)
    }

    @Test
    fun `cards parse one per line, front and back split on a pipe`() {
        val cards = parseCardLines("Aorta | Largest artery\nVein | Carries blood back")
        assertEquals(2, cards.size)
        assertEquals("Aorta", cards[0].front)
        assertEquals("Largest artery", cards[0].back)
    }

    @Test
    fun `a line with no separator is not a card`() {
        assertEquals(1, parseCardLines("Aorta\n\nVein | Back").size)
    }

    @Test
    fun `a deck built from taxonomy terms is stable across two runs`() {
        val terms = listOf(TaxonomyTerm(id = "t1", term = "Aorta", def = "Largest artery"))
        val first = deckFromTerms("Anatomy", terms)
        val second = deckFromTerms("Anatomy", terms)
        assertEquals(first.id, second.id)
        assertEquals(first.cards.map { it.id }, second.cards.map { it.id })
        assertEquals("Aorta", first.cards[0].front)
        assertTrue(first.id.startsWith("deck-taxonomy-"))
    }
}
