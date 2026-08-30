package com.synapse.app.feature.flashcards

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsEnabled
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
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
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.time.Instant

/**
 * Exercises [DeckListScreen] built directly against a plain [FlashcardsViewModel] (no Hilt),
 * backed by a real [FlashcardsRepository] over a fake [LocalStore] — the same convention as
 * [com.synapse.app.feature.shell.AppScaffoldTest] and [CardRunnerScreenTest].
 */
@RunWith(RobolectricTestRunner::class)
class DeckListScreenTest {

    @get:Rule
    val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    private fun repository(localStore: ScreenFakeLocalStore = ScreenFakeLocalStore()): FlashcardsRepository =
        FlashcardsRepository(localStore, SyncEngine(ScreenFakeApi(), localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    @Test
    fun aDeckWithDueCardsShowsAnEnabledStudyButton() = runTest {
        val repo = repository()
        repo.saveDeck(
            now,
            StoredDeck(
                id = "deck-1",
                name = "Cardio",
                cards = listOf(DeckCard("c1", "F", "B")),
                schedules = mapOf(
                    "c1" to CardSchedule(
                        state = CardState.Review, step = 0, interval = 3, ease = AnkiDefaults.startingEase,
                        lapses = 0, reps = 1, due = now.minusSeconds(60).toString(),
                    ),
                ),
                createdAt = now.toString(),
            ),
        )
        val viewModel = FlashcardsViewModel(repo).apply { this.now = { this@DeckListScreenTest.now }; load() }

        rule.setContent { DeckListScreen(viewModel = viewModel) }
        rule.waitForIdle()

        rule.onNodeWithTag(deckStudyButtonTag("deck-1")).assertIsEnabled()
    }

    @Test
    fun aDeckWithNothingDueOrNewShowsADisabledStudyButton() = runTest {
        val repo = repository()
        repo.saveDeck(now, StoredDeck(id = "deck-empty", name = "Empty", cards = emptyList(), createdAt = now.toString()))
        val viewModel = FlashcardsViewModel(repo).apply { this.now = { this@DeckListScreenTest.now }; load() }

        rule.setContent { DeckListScreen(viewModel = viewModel) }
        rule.waitForIdle()

        rule.onNodeWithTag(deckStudyButtonTag("deck-empty")).assertIsNotEnabled()
    }

    @Test
    fun creatingADeckThroughTheDialogAddsItToYourDecks() = runTest {
        val repo = repository()
        val viewModel = FlashcardsViewModel(repo).apply { this.now = { this@DeckListScreenTest.now }; load() }

        rule.setContent { DeckListScreen(viewModel = viewModel) }
        rule.waitForIdle()

        rule.onNodeWithTag(FLASHCARDS_NEW_DECK_BUTTON_TAG).performClick()
        rule.onNodeWithTag(CREATE_DECK_NAME_FIELD_TAG).performTextInput("Cranial nerves")
        rule.onNodeWithTag(CREATE_DECK_CONFIRM_BUTTON_TAG).assertIsEnabled()
        rule.onNodeWithTag(CREATE_DECK_CONFIRM_BUTTON_TAG).performClick()
        rule.waitForIdle()

        val decks = repo.ownDecks()
        assertTrue(
            "expected the created deck to round-trip through the repository",
            decks.values.any { it.name == "Cranial nerves" },
        )
    }

    // NOTE (review follow-up): the CRUD-dialog-stays-open regression (a post-mutation reload must
    // not flash FlashcardsUiState.Loading and unmount the open ManageDeckDialog) cannot be faithfully
    // reproduced here — the intermediate Loading only becomes a real, composed frame when the repo
    // read genuinely hops dispatchers (real Room DAO), whereas this suite's synchronous fake
    // LocalStore conflates it away in StateFlow before Compose observes it. The fix itself lives in
    // FlashcardsViewModel.load() (emit Loading only when there is no Content yet) + hoisting the
    // dialog-open state above the loading gate in DeckListScreen. Faithful coverage needs an
    // instrumented (real-Room) test — tracked alongside the nav-drawer's emulator-smoke follow-up.
}

// --- Fakes --------------------------------------------------------------------

private class ScreenFakeLocalStore : LocalStore {
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

private class ScreenFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}
