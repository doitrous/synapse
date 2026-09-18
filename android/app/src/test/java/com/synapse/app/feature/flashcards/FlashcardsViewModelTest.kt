package com.synapse.app.feature.flashcards

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.flashcards.AnkiDefaults
import com.synapse.app.core.flashcards.CardSchedule
import com.synapse.app.core.flashcards.CardState
import com.synapse.app.core.flashcards.DeckCard
import com.synapse.app.core.flashcards.StoredDeck
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * Task 4 (Plan 05 — Flashcards): [FlashcardsViewModel] built against a real
 * [FlashcardsRepository] + [SyncEngine], the latter wired to hand-written fakes — the same
 * convention as [com.synapse.app.feature.dashboard.DashboardViewModelTest] and
 * [FlashcardsRepositoryTest].
 */
@OptIn(ExperimentalCoroutinesApi::class)
class FlashcardsViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): FlashcardsRepository =
        FlashcardsRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: FlashcardsRepository): FlashcardsViewModel =
        FlashcardsViewModel(repository).apply { now = { this@FlashcardsViewModelTest.now } }

    // --- load / counts ---------------------------------------------------------

    @Test
    fun initLoadsAnEmptyDeckListWhenNothingIsStoredAnywhere() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is FlashcardsUiState.Content)
        state as FlashcardsUiState.Content
        assertTrue(state.ownDecks.isEmpty())
        assertTrue(state.providedDecks.isEmpty())
    }

    @Test
    fun anOwnDeckWithADueCardAndANewCardReportsBothCounts() = runTest {
        val localStore = VmFakeLocalStore()
        val repo = repository(localStore)
        val dueCard = DeckCard("c-due", "F1", "B1")
        val newCardEntry = DeckCard("c-new", "F2", "B2")
        val dueSchedule = reviewSchedule(dueOffsetMs = -60_000)
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-own",
                name = "My Deck",
                cards = listOf(dueCard, newCardEntry),
                schedules = mapOf("c-due" to dueSchedule),
                createdAt = now.toString(),
            ),
        )

        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        val content = viewModel.uiState.value as FlashcardsUiState.Content
        val deck = content.ownDecks.single()
        assertEquals(1, deck.dueCount)
        assertEquals(1, deck.freshCount)
        assertTrue(deck.canStudy)
        assertFalse(deck.provided)
    }

    @Test
    fun aCardNotYetDueDoesNotCountAsDue() = runTest {
        val repo = repository()
        val notYetDue = DeckCard("c1", "F", "B")
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-own",
                name = "My Deck",
                cards = listOf(notYetDue),
                schedules = mapOf("c1" to reviewSchedule(dueOffsetMs = 86_400_000)),
                createdAt = now.toString(),
            ),
        )

        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        val deck = (viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.single()
        assertEquals(0, deck.dueCount)
        assertEquals(0, deck.freshCount)
        assertFalse(deck.canStudy)
    }

    @Test
    fun aProvidedDeckWithNoMirrorCountsEveryCardAsFresh() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_DECK_JSON)
        val repo = repository(localStore)

        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        val content = viewModel.uiState.value as FlashcardsUiState.Content
        val deck = content.providedDecks.single()
        assertEquals("deck-provided", deck.id)
        assertTrue(deck.provided)
        assertEquals(0, deck.dueCount)
        assertEquals(1, deck.freshCount)
    }

    @Test
    fun aProvidedDeckWithAMirrorUsesTheMirroredSchedulesForItsCounts() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_DECK_JSON)
        val repo = repository(localStore)
        // A mirror whose schedule marks the deck's one card due.
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-provided",
                name = "Heart failure basics",
                sourceId = "deck-provided",
                cards = listOf(DeckCard("c1", "Preload", "Volume before contraction")),
                schedules = mapOf("c1" to reviewSchedule(dueOffsetMs = -1000)),
                createdAt = now.toString(),
            ),
        )

        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        val deck = (viewModel.uiState.value as FlashcardsUiState.Content).providedDecks.single()
        assertEquals(1, deck.dueCount)
        assertEquals(0, deck.freshCount)
    }

    // --- create / delete deck ---------------------------------------------------

    @Test
    fun createDeckAddsAnEmptyOwnDeckAndReloadsTheList() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.createDeck("Cranial nerves")
        dispatcher.scheduler.advanceUntilIdle()

        val decks = (viewModel.uiState.value as FlashcardsUiState.Content).ownDecks
        assertEquals(1, decks.size)
        assertEquals("Cranial nerves", decks.single().title)
        assertTrue(decks.single().cards.isEmpty())
    }

    @Test
    fun createDeckIsANoOpForABlankName() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.createDeck("   ")
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.isEmpty())
    }

    @Test
    fun removeDeckDropsItFromTheOwnList() = runTest {
        val repo = repository()
        val viewModel = viewModel(repo)
        viewModel.createDeck("Deck A")
        dispatcher.scheduler.advanceUntilIdle()
        val deckId = (viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.single().id

        viewModel.removeDeck(deckId)
        dispatcher.scheduler.advanceUntilIdle()

        assertTrue((viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.isEmpty())
    }

    // --- card CRUD ---------------------------------------------------------------

    @Test
    fun addCardAppendsACardToAnOwnDeckAndIsANoOpWhenEitherSideIsBlank() = runTest {
        val repo = repository()
        val viewModel = viewModel(repo)
        viewModel.createDeck("Deck A")
        dispatcher.scheduler.advanceUntilIdle()
        val deckId = (viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.single().id

        viewModel.addCard(deckId, "  ", "Back")
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue((viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.single().cards.isEmpty())

        viewModel.addCard(deckId, "Front", "Back")
        dispatcher.scheduler.advanceUntilIdle()

        val card = (viewModel.uiState.value as FlashcardsUiState.Content).ownDecks.single().cards.single()
        assertEquals("Front", card.front)
        assertEquals("Back", card.back)
    }

    @Test
    fun removeCardDropsTheCardAndItsSchedule() = runTest {
        val repo = repository()
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-own",
                name = "Deck A",
                cards = listOf(DeckCard("c1", "F", "B")),
                schedules = mapOf("c1" to reviewSchedule(dueOffsetMs = -1000)),
                createdAt = now.toString(),
            ),
        )
        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.removeCard("deck-own", "c1")
        dispatcher.scheduler.advanceUntilIdle()

        val stored = repo.ownDecks().getValue("deck-own")
        assertTrue(stored.cards.isEmpty())
        assertTrue(stored.schedules.isEmpty())
    }

    // --- startStudy: provided -> own mirror ---------------------------------------

    @Test
    fun startStudyOnAnOwnDeckRunsDirectlyWithNoMirrorCreated() = runTest {
        val repo = repository()
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-own",
                name = "Deck A",
                cards = listOf(DeckCard("c1", "F", "B")),
                createdAt = now.toString(),
            ),
        )
        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.startStudy("deck-own")
        dispatcher.scheduler.advanceUntilIdle()

        val start = viewModel.studyStart.value
        assertTrue(start != null)
        assertEquals("deck-own", start!!.session.deckId)
        assertEquals(1, start.session.queue.size)
        assertNull(repo.ownDecks().getValue("deck-own").sourceId)
    }

    @Test
    fun startStudyOnAProvidedDeckWithNoExistingMirrorCreatesOneAndPreservesNoSchedules() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_DECK_JSON)
        val repo = repository(localStore)
        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.startStudy("deck-provided")
        dispatcher.scheduler.advanceUntilIdle()

        val mirror = repo.ownDecks().getValue("deck-provided")
        assertEquals("deck-provided", mirror.sourceId)
        assertEquals(1, mirror.cards.size)
        assertTrue(mirror.schedules.isEmpty())

        val start = viewModel.studyStart.value
        assertTrue(start != null)
        assertEquals(1, start!!.session.queue.size)
    }

    @Test
    fun startStudyOnAProvidedDeckWithAnExistingMirrorRefreshesCardsButKeepsSchedules() = runTest {
        val localStore = VmFakeLocalStore()
        seedLedger(localStore, PUBLISHED_DECK_JSON)
        val repo = repository(localStore)
        val existingSchedule = reviewSchedule(dueOffsetMs = -1000)
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-provided",
                name = "stale title",
                sourceId = "deck-provided",
                cards = listOf(DeckCard("c1", "stale front", "stale back")),
                schedules = mapOf("c1" to existingSchedule),
                createdAt = "2026-01-01T00:00:00Z",
            ),
        )

        val viewModel = viewModel(repo)
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.startStudy("deck-provided")
        dispatcher.scheduler.advanceUntilIdle()

        val mirror = repo.ownDecks().getValue("deck-provided")
        // Cards refreshed from the catalogue (the ledger's current title/content, not the stale mirror's).
        assertEquals("Preload", mirror.cards.single().front)
        // But the existing schedule survived the refresh.
        assertEquals(existingSchedule, mirror.schedules.getValue("c1"))
        // createdAt is preserved from the existing mirror, not reset.
        assertEquals("2026-01-01T00:00:00Z", mirror.createdAt)
    }

    @Test
    fun startStudyOnAnUnknownDeckIdPublishesNoStudyStart() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.startStudy("does-not-exist")
        dispatcher.scheduler.advanceUntilIdle()

        assertNull(viewModel.studyStart.value)
    }

    // --- fixtures ----------------------------------------------------------------

    private fun reviewSchedule(dueOffsetMs: Long) = CardSchedule(
        state = CardState.Review,
        step = 0,
        interval = 3,
        ease = AnkiDefaults.startingEase,
        lapses = 0,
        reps = 1,
        due = now.plusMillis(dueOffsetMs).toString(),
    )

    private suspend fun seedLedger(localStore: VmFakeLocalStore, itemJson: String) {
        val ledgerJson = "[$itemJson]"
        val value = json.parseToJsonElement(ledgerJson)
        val doc = StateDoc(value = value, updatedAt = "2026-08-29T00:00:00Z")
        localStore.putCatalogue(CONTENT_LEDGER_KEY, "2026-08-29T00:00:00Z", json.encodeToString(StateDoc.serializer(), doc))
    }

    private companion object {
        const val CONTENT_LEDGER_KEY = "synapse-admin-content-ledger-v4"

        val PUBLISHED_DECK_JSON = """
            { "id":"deck-provided","kind":"deck","title":"Heart failure basics","subjectId":"SYS_CVS","status":"Published",
              "deckData":{"description":"HF essentials","cards":[{"id":"c1","front":"Preload","back":"Volume before contraction"}]}}
        """.trimIndent()
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) { catalogue[key] = updatedAt to json }
    override suspend fun catalogueUpdatedAt(key: String): String? = catalogue[key]?.first
    override suspend fun getCatalogue(key: String): String? = catalogue[key]?.second
    override suspend fun enqueue(key: String, json: String) { outbox[key] = json }
    override suspend fun pendingOutbox(): List<OutboxEntry> = outbox.map { OutboxEntry(it.key, it.value) }
    override suspend fun clearOutbox(key: String) { outbox.remove(key) }
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) { items.forEach { attemptsById[it.id] = it } }
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = attemptsById.values.filter { it.month == month }
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { catalogue.clear(); outbox.clear(); attemptsById.clear(); userState.clear() }
}

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* write-through only; not asserted here */ }
}
