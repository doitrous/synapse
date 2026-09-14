package com.synapse.app.feature.notebook

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.notebook.NoteBlock
import com.synapse.app.core.notebook.NoteBlockType
import com.synapse.app.core.notebook.editorJsonToPlainText
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [NotebookViewModel] built against a real [NotebookRepository] + [SyncEngine],
 * the latter wired to hand-written fakes — same convention as
 * `EssaysViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class NotebookViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun repository(localStore: VmFakeLocalStore = VmFakeLocalStore(), api: VmFakeApi = VmFakeApi()): NotebookRepository =
        NotebookRepository(localStore, SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList()), json)

    private fun viewModel(repository: NotebookRepository): NotebookViewModel =
        NotebookViewModel(repository).apply { now = { this@NotebookViewModelTest.now } }

    @Test
    fun initLoadsAnEmptyListWhenNothingIsStored() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value
        assertTrue(state is NotebookUiState.Content)
        assertTrue((state as NotebookUiState.Content).notes.isEmpty())
        assertNull(state.selectedId)
    }

    @Test
    fun newNoteAddsAndSelectsABlankNoteAndPersistsImmediately() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as NotebookUiState.Content
        assertEquals(1, state.notes.size)
        assertEquals(state.notes.single().id, state.selectedId)
        assertTrue(localStore.userState.containsKey("synapse.notebook.notes"))
    }

    @Test
    fun updateTitleUpdatesUiStateImmediatelyButDoesNotPersistBeforeTheDebounceElapses() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!
        val storedBeforeEdit = localStore.userState.getValue("synapse.notebook.notes").first

        viewModel.updateTitle(id, "My title")

        assertEquals("My title", (viewModel.uiState.value as NotebookUiState.Content).notes.single().title)
        assertEquals(storedBeforeEdit, localStore.userState.getValue("synapse.notebook.notes").first)
    }

    @Test
    fun updateTitlePersistsOnceTheDebounceElapses() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.updateTitle(id, "My title")
        dispatcher.scheduler.advanceUntilIdle()

        val persisted = localStore.userState.getValue("synapse.notebook.notes").first
        assertTrue(persisted.contains("My title"))
    }

    @Test
    fun retypingTheTitleWithinTheDebounceWindowCoalescesIntoOneWrite() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.updateTitle(id, "My")
        dispatcher.scheduler.advanceTimeBy(200)
        viewModel.updateTitle(id, "My title")
        dispatcher.scheduler.advanceUntilIdle()

        val persisted = localStore.userState.getValue("synapse.notebook.notes").first
        assertTrue(persisted.contains("My title"))
        assertTrue(!persisted.contains("\"My\""))
    }

    @Test
    fun updateBlocksReEncodesTheBodyAndPlainTextTogether() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.updateBlocks(id, listOf(NoteBlock("b1", NoteBlockType.Heading(1), "Heart failure")))
        dispatcher.scheduler.advanceUntilIdle()

        val note = (viewModel.uiState.value as NotebookUiState.Content).notes.single()
        assertEquals("Heart failure", note.plainText)
        val firstChild = note.editorJson!!["root"]!!.jsonObject["children"]!!.jsonArray.single().jsonObject
        assertEquals("heading", firstChild["type"]!!.jsonPrimitive.content)
    }

    @Test
    fun addTagThenRemoveTagRoundTrips() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.addTag(id, "Cardiology")
        dispatcher.scheduler.advanceUntilIdle()
        assertEquals(listOf("Cardiology"), (viewModel.uiState.value as NotebookUiState.Content).notes.single().tags)

        viewModel.removeTag(id, "Cardiology")
        dispatcher.scheduler.advanceUntilIdle()
        assertTrue((viewModel.uiState.value as NotebookUiState.Content).notes.single().tags.isEmpty())
    }

    @Test
    fun addingTheSameTagTwiceCaseInsensitivelyIsANoOp() = runTest {
        val viewModel = viewModel(repository())
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.addTag(id, "Cardiology")
        viewModel.addTag(id, "cardiology")
        dispatcher.scheduler.advanceUntilIdle()

        assertEquals(listOf("Cardiology"), (viewModel.uiState.value as NotebookUiState.Content).notes.single().tags)
    }

    @Test
    fun deleteNoteRemovesItAndClearsSelectionWhenItWasSelected() = runTest {
        val localStore = VmFakeLocalStore()
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()
        viewModel.newNote()
        dispatcher.scheduler.advanceUntilIdle()
        val id = (viewModel.uiState.value as NotebookUiState.Content).selectedId!!

        viewModel.deleteNote(id)
        dispatcher.scheduler.advanceUntilIdle()

        val state = viewModel.uiState.value as NotebookUiState.Content
        assertTrue(state.notes.isEmpty())
        assertNull(state.selectedId)
    }

    @Test
    fun loadMigratesANoteThatHasNoEditorJsonBeforeItIsDisplayed() = runTest {
        // Simulates a note synced from iOS, whose `Note` struct never writes
        // `editorJson`/`plainText` at all.
        val localStore = VmFakeLocalStore()
        localStore.putUserState(
            "synapse.notebook.notes",
            """[{"id":"ios1","title":"From iPhone","body":"Ward round findings","updatedAt":"2026-08-29T00:00:00Z"}]""",
            savedAt = null,
            serverUpdatedAt = null,
        )
        val viewModel = viewModel(repository(localStore))
        dispatcher.scheduler.advanceUntilIdle()

        val note = (viewModel.uiState.value as NotebookUiState.Content).notes.single()
        assertEquals("Ward round findings", note.plainText)
        assertEquals("Ward round findings", editorJsonToPlainText(note.editorJson))
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val catalogue = linkedMapOf<String, Pair<String, String>>()
    val outbox = linkedMapOf<String, String>()
    val attemptsById = linkedMapOf<String, ModelAttemptRecord>()
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()

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

private class VmFakeApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) { /* unused */ }
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) { /* unused */ }
}
