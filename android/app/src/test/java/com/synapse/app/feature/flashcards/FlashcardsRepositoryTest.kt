package com.synapse.app.feature.flashcards

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.flashcards.AnkiDefaults
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DailyDeckCounts
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.Grade
import com.synapse.app.core.flashcards.StoredDeck
import com.synapse.app.core.flashcards.grade
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

private typealias ModelAttemptRecord = com.synapse.app.core.model.AttemptRecord

/**
 * Task 3 (Plan 05 — Flashcards): the flashcards data layer.
 *
 * [FlashcardsRepository] projects the shared content ledger into provided
 * decks, and reads/writes the student's own decks and daily new/review caps
 * over the durable user-state store (Plan 04). A real [SyncEngine] is used
 * against a fake in-memory [LocalStore] so the write-through-then-read
 * round-trip is actually exercised, not assumed.
 */
class FlashcardsRepositoryTest {

    private val json = Json { ignoreUnknownKeys = true }

    private lateinit var localStore: FakeLocalStore
    private lateinit var synapseApi: FakeSynapseApi
    private lateinit var syncEngine: SyncEngine
    private lateinit var repository: FlashcardsRepository

    @Before
    fun setup() {
        localStore = FakeLocalStore()
        synapseApi = FakeSynapseApi()
        syncEngine = SyncEngine(synapseApi, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        repository = FlashcardsRepository(localStore, syncEngine, json)
    }

    // --- providedDecks -------------------------------------------------------

    @Test
    fun providedDecksIsEmptyWhenNoLedgerIsStoredLocally() = runTest {
        assertTrue(repository.providedDecks().isEmpty())
    }

    @Test
    fun providedDecksProjectsAPublishedDeckFromTheStoredStateDoc() = runTest {
        seedLedger(listOf(PUBLISHED_DECK_JSON, UNPUBLISHED_DECK_JSON, EMPTY_DECK_JSON))

        val decks = repository.providedDecks()

        assertEquals(1, decks.size)
        val deck = decks.single()
        assertEquals("deck-1", deck.id)
        assertEquals(1, deck.cards.size)
        assertEquals("c1", deck.cards.single().id)
    }

    // --- ownDecks / updateOwnDecks --------------------------------------------

    @Test
    fun ownDecksIsEmptyWhenNothingStored() = runTest {
        assertTrue(repository.ownDecks().isEmpty())
    }

    @Test
    fun updateOwnDecksThenOwnDecksReflectsTheWriteWithNoRefresh() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        val deck = sampleDeck("d1", now)

        repository.saveDeck(now, deck)

        val decks = repository.ownDecks()
        assertEquals(setOf("d1"), decks.keys)
        assertEquals(deck, decks.getValue("d1"))

        // Write-through: SyncEngine.write hit putUserState synchronously, no
        // network round-trip needed to read it back.
        assertEquals(1, synapseApi.putCalls.size)
    }

    @Test
    fun removeDeckDropsItFromOwnDecks() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        repository.saveDeck(now, sampleDeck("d1", now))
        repository.saveDeck(now, sampleDeck("d2", now))

        repository.removeDeck(now, "d1")

        assertEquals(setOf("d2"), repository.ownDecks().keys)
    }

    @Test
    fun aGradeUpdatedScheduleRoundTripsThroughOwnDecks() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")
        val deck = sampleDeck("d1", now)
        repository.saveDeck(now, deck)

        val cardId = deck.cards.single().id
        // Easy grades a New card straight to Review (see Srs.kt's gradeSteps), so this
        // also confirms the round trip preserves a state change, not just the field values.
        val newSchedule = grade(deck.schedules.getValue(cardId), Grade.Easy, now, AnkiDefaults)

        repository.updateOwnDecks(now) { decks ->
            val current = decks.getValue("d1")
            decks + (current.id to current.copy(schedules = current.schedules + (cardId to newSchedule)))
        }

        val roundTripped = repository.ownDecks().getValue("d1").schedules.getValue(cardId)
        assertEquals(newSchedule, roundTripped)
        assertEquals(CardState.Review, roundTripped.state)
    }

    // --- dailyCounts / updateDailyCounts --------------------------------------

    @Test
    fun dailyCountsIsZeroedForTodayWhenAbsent() = runTest {
        val now = Instant.parse("2026-08-29T12:00:00Z")

        val counts = repository.dailyCounts(now)

        assertEquals(DailyDeckCounts("2026-08-29", 0, 0), counts)
    }

    @Test
    fun dailyCountsResetsWhenTheStoredDayDiffersFromToday() = runTest {
        val yesterday = Instant.parse("2026-08-28T12:00:00Z")
        repository.updateDailyCounts(yesterday) { DailyDeckCounts("2026-08-28", 15, 120) }

        val today = Instant.parse("2026-08-29T09:00:00Z")
        val counts = repository.dailyCounts(today)

        assertEquals(DailyDeckCounts("2026-08-29", 0, 0), counts)
    }

    @Test
    fun dailyCountsReturnsStoredCountsWhenTheDayMatches() = runTest {
        val now = Instant.parse("2026-08-29T09:00:00Z")
        repository.updateDailyCounts(now) { DailyDeckCounts("2026-08-29", 3, 10) }

        val counts = repository.dailyCounts(Instant.parse("2026-08-29T20:00:00Z"))

        assertEquals(DailyDeckCounts("2026-08-29", 3, 10), counts)
    }

    @Test
    fun updateDailyCountsIncrementsCorrectly() = runTest {
        val now = Instant.parse("2026-08-29T09:00:00Z")

        repository.updateDailyCounts(now) { it.copy(newSeen = it.newSeen + 1) }
        repository.updateDailyCounts(now) { it.copy(newSeen = it.newSeen + 1, reviewsSeen = it.reviewsSeen + 5) }

        val counts = repository.dailyCounts(now)
        assertEquals(DailyDeckCounts("2026-08-29", 2, 5), counts)
    }

    // --- fixtures --------------------------------------------------------------

    private suspend fun seedLedger(items: List<String>) {
        val ledgerJson = items.joinToString(prefix = "[", postfix = "]")
        val value = json.parseToJsonElement(ledgerJson)
        val doc = StateDoc(value = value, updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(
            CONTENT_LEDGER_KEY,
            "2026-08-29T00:00:00Z",
            json.encodeToString(StateDoc.serializer(), doc),
        )
    }

    private fun sampleDeck(id: String, now: Instant): StoredDeck {
        val card = DeckCard(id = "card-$id", front = "Front", back = "Back")
        val schedule = CardSchedule(
            state = CardState.New,
            step = 0,
            interval = 0,
            ease = AnkiDefaults.startingEase,
            lapses = 0,
            reps = 0,
            due = now.toString(),
        )
        return StoredDeck(
            id = id,
            name = "Deck $id",
            cards = listOf(card),
            schedules = mapOf(card.id to schedule),
            createdAt = now.toString(),
        )
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_DECK_JSON = """
            { "id":"deck-1","kind":"deck","title":"Heart failure basics","subjectId":"SYS_CVS","status":"Published",
              "deckData":{"description":"HF essentials","cards":[{"id":"c1","front":"Preload","back":"Volume before contraction"}]}}
        """.trimIndent()

        val UNPUBLISHED_DECK_JSON = """
            { "id":"deck-2","kind":"deck","title":"Draft deck","subjectId":"SYS_CVS","status":"Draft",
              "deckData":{"description":"Not ready","cards":[{"id":"c2","front":"F","back":"B"}]}}
        """.trimIndent()

        val EMPTY_DECK_JSON = """
            { "id":"deck-3","kind":"deck","title":"Empty deck","subjectId":"SYS_CVS","status":"Published",
              "deckData":{"description":"Nothing here","cards":[]}}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class FakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>() // json, savedAt, serverUpdatedAt

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {
        catalogue[key] = updatedAt to json
    }

    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> =
        attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second

    override suspend fun clearAll() {
        catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear()
    }
}

private class FakeSynapseApi : SynapseApi {
    val putCalls = mutableListOf<String>()
    val putBodies = mutableMapOf<String, StateDoc>()

    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {
        putCalls += key
        putBodies[key] = doc
    }
}
